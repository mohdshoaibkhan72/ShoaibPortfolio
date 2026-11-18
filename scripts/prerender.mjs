/**
 * Post-build step: turns the single-page app into real HTML pages.
 *
 *   npm run build  =  vite build  →  vite build --ssr  →  node scripts/prerender.mjs
 *
 * For every route in src/seo/meta.js it renders the React app to HTML and writes it with that
 * page's own <title>, description, canonical, Open Graph tags and JSON-LD. Search engines,
 * AI crawlers and link previews (WhatsApp, LinkedIn…) then see complete pages without running JS.
 *
 * Output layout (served by the rewrite rules in public/.htaccess):
 *   dist/index.html                → /
 *   dist/_pages/about.html         → /about
 *   dist/_pages/projects/<id>.html → /projects/<id>
 *   dist/404.html                  → any unknown URL (served with a real 404 status)
 * Also generates dist/sitemap.xml and dist/llms.txt from the same data.
 */
import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.env.NODE_ENV = "production"; // use React's production server renderer

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const ssr = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);
const { render, ROUTES, getRouteMeta, renderHeadTags, SITE_URL, projectsData, CATEGORIES, profile, heroPortrait, experience, services, servicePages, socials, faqs, whatsapp } = ssr;

const template = await readFile(join(dist, "index.html"), "utf8");
if (!template.includes("<!--seo-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--seo-head--> / <!--app-html--> markers (see index.html).");
}

function buildPage(meta, appHtml) {
  return template.replace("<!--seo-head-->", renderHeadTags(meta)).replace("<!--app-html-->", appHtml);
}

const outFile = (path) => (path === "/" ? join(dist, "index.html") : join(dist, "_pages", `${path.slice(1)}.html`));

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

/* ------------------------------------------------------------ pages */

const problems = [];
for (const path of ROUTES) {
  const meta = getRouteMeta(path);
  if (meta.noindex) throw new Error(`Route ${path} resolved to the 404 page — check src/seo/meta.js`);
  const appHtml = await render(path);
  const h1s = appHtml.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) problems.push(`${path}: ${h1s} <h1> elements`);
  if (meta.title.length > 65) problems.push(`${path}: title is ${meta.title.length} chars`);
  if (meta.description.length > 160) problems.push(`${path}: description is ${meta.description.length} chars`);
  await write(outFile(path), buildPage(meta, appHtml));
}

const notFoundMeta = getRouteMeta("/__not-found__");
await write(join(dist, "404.html"), buildPage(notFoundMeta, await render("/__not-found__")));

/* ------------------------------------------------------------ sitemap.xml */

const today = new Date().toISOString().slice(0, 10);

/** Last commit date touching any of `paths` — or today if they have uncommitted changes / git is unavailable. */
function lastModified(paths) {
  try {
    const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
    if (git("status", "--porcelain", "--", ...paths)) return today;
    return git("log", "-1", "--format=%cs", "--", ...paths) || today;
  } catch {
    return today;
  }
}

const SHARED = ["src/data/site.js", "src/seo/meta.js", "src/components/layout", "src/components/ui", "index.html"];
const routeSources = (path) => {
  if (path === "/") return [...SHARED, "src/pages/HomePage.jsx", "src/components/home", "src/data/projects.js"];
  if (path.startsWith("/projects/")) {
    const project = projectsData.find((p) => `/projects/${p.id}` === path);
    const images = [...new Set(project.gallery.map((g) => `public${dirname(g.src)}`))];
    return [...SHARED, "src/pages/ProjectDetailPage.jsx", "src/components/project", "src/data/projects.js", ...images];
  }
  if (path.startsWith("/services/")) {
    return [...SHARED, "src/pages/ServicePage.jsx", "src/data/services.js", "src/data/projects.js", "src/components/home/Process.jsx"];
  }
  const page = { "/about": "AboutPage", "/services": "ServicesPage", "/projects": "ProjectsPage", "/experience": "ExperiencePage", "/contact": "ContactPage" }[path];
  const extra = { "/projects": ["src/data/projects.js", "src/components/project"], "/services": ["src/data/services.js", "src/components/home"] }[path] || [];
  return [...SHARED, `src/pages/${page}.jsx`, ...extra];
};

const routeImages = (path) => {
  if (path === "/") return [heroPortrait.src, profile.portrait];
  if (path === "/about") return [profile.portrait];
  const project = projectsData.find((p) => `/projects/${p.id}` === path);
  if (!project) return [];
  const cover = project.cover.type === "image" ? [project.cover.src] : project.cover.images;
  return [...new Set([...cover, ...project.gallery.map((g) => g.src)])];
};

const xmlEsc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${ROUTES.map((path) => {
  const images = routeImages(path)
    .map((src) => `\n    <image:image><image:loc>${xmlEsc(SITE_URL + encodeURI(src))}</image:loc></image:image>`)
    .join("");
  return `  <url>
    <loc>${xmlEsc(getRouteMeta(path).url)}</loc>
    <lastmod>${lastModified(routeSources(path))}</lastmod>${images}
  </url>`;
}).join("\n")}
</urlset>
`;
await write(join(dist, "sitemap.xml"), sitemap);

/* ------------------------------------------------------------ llms.txt (https://llmstxt.org) */

const loanyfy = experience.find((e) => e.id === "loanyfy");
const byCategory = Object.entries(CATEGORIES)
  .map(([key, c]) => {
    const items = projectsData.filter((p) => p.category === key);
    if (!items.length) return "";
    const lines = items.map((p) => {
      const stack = p.stack.length ? ` Stack: ${p.stack.join(", ")}.` : "";
      const live = p.links.length ? ` Live: ${p.links.map((l) => l.href).join(", ")}` : "";
      return `- [${p.title}](${SITE_URL}/projects/${p.id}): ${p.tagline}.${stack}${live}`;
    });
    return `### ${c.plural}\n\n${lines.join("\n")}`;
  })
  .filter(Boolean)
  .join("\n\n");

const llms = `# ${profile.name}

> ${profile.role} based in India with ${profile.careerYears}+ years of experience. Senior App & Full-Stack Developer at ${loanyfy.company} (fintech) since January 2024, and a freelance developer since 2023 who has shipped ${projectsData.length} production apps and platforms for clients in India and the Middle East. Specialises in React Native (Android & iOS), the MERN stack, SaaS dashboards, e-commerce and fintech integrations. Open to freelance projects.

## Key facts

- Name: ${profile.name} (also written "${profile.shortName}" or "Mohd Shoaib Khan")
- Role: ${profile.role}
- Current job: ${loanyfy.role} at ${loanyfy.company} (${loanyfy.legalName}), ${loanyfy.period}
- Education: B.Tech in Computer Science & Engineering, United Institute of Technology, Prayagraj (2020–2024)
- Location: India (works remotely with clients worldwide)
- Availability: open to freelance work; replies within 24 hours
- Contact: ${profile.email} · WhatsApp ${whatsapp.number} · ${SITE_URL}/contact
- Profiles: ${socials.map((s) => `${s.label} ${s.href}`).join(" · ")}
- CV (PDF): ${SITE_URL}${profile.cv}

## Services

${services.map((s) => `- ${s.page ? `[${s.title}](${SITE_URL}${s.page})` : s.title}: ${s.desc}`).join("\n")}

## Pages

- [Home](${SITE_URL}/): overview, selected work, services and testimonials
- [About](${SITE_URL}/about): background, toolbox, process and quick facts
- [Services](${SITE_URL}/services): website & mobile app development — what I offer and how I work
${servicePages.map((sp) => `- [${sp.metaTitle.split(" | ")[0]}](${SITE_URL}/services/${sp.slug}): ${sp.intro}`).join("\n")}
- [Projects](${SITE_URL}/projects): all ${projectsData.length} projects with case studies
- [Experience](${SITE_URL}/experience): roles, responsibilities and achievements
- [Contact](${SITE_URL}/contact): contact form, email, WhatsApp and FAQ

## Projects

${byCategory}

## FAQ

${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}
`;
await write(join(dist, "llms.txt"), llms);

await rm(ssrDir, { recursive: true, force: true });

console.log(`\nPrerendered ${ROUTES.length} pages + 404.html, sitemap.xml (${ROUTES.length} URLs) and llms.txt.`);
if (problems.length) {
  console.warn(`SEO warnings:\n  ${problems.join("\n  ")}`);
}

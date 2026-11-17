/**
 * Single source of truth for every page's SEO: title, description, canonical URL,
 * social-card image and JSON-LD. Used in two places:
 *   - at build time, by scripts/prerender.mjs, to write real <head> tags into each page's HTML
 *   - in the browser, by <SEOHead />, to keep the head in sync during client-side navigation
 * Keep this file free of React and browser APIs.
 */
import { education, experience, faqs, profile, socials, toolbox } from "../data/site";
import { CATEGORIES, getProject, projectChips, projectsData } from "../data/projects";

export const SITE_URL = "https://mohammadshoaibkhan.com";
export const SITE_NAME = profile.name;
const DEFAULT_IMAGE = { src: "/og/default.jpg", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` };

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const loanyfy = experience.find((e) => e.id === "loanyfy");

/** Top-level pages. When adding one, also add it to the rewrite rule in public/.htaccess. */
export const STATIC_PATHS = ["/", "/about", "/projects", "/experience", "/contact"];

/** Every URL that is prerendered and listed in the sitemap. */
export const ROUTES = [...STATIC_PATHS, ...projectsData.map((p) => `/projects/${p.id}`)];

export const absoluteUrl = (path) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`);
const canonicalFor = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** Trim at a word boundary so descriptions never end mid-word. */
function clip(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—–-]+$/, "")}…`;
}

const listJoin = (items) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/* ---------------------------------------------------------------- JSON-LD nodes */

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  alternateName: [profile.shortName, "Mohd Shoaib Khan", "Mohd. Shoaib Khan"],
  url: `${SITE_URL}/`,
  image: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#portrait`,
    url: `${SITE_URL}${profile.portrait}`,
    width: 864,
    height: 741,
    caption: profile.name,
  },
  jobTitle: profile.role,
  description: `${profile.role} with ${profile.careerYears}+ years of experience building React Native mobile apps, MERN web platforms and SaaS products. Senior developer at Loanyfy (fintech) and freelance developer for clients in India and the Middle East.`,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  worksFor: {
    "@type": "Organization",
    name: loanyfy.company,
    legalName: loanyfy.legalName,
    url: loanyfy.href,
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
    address: { "@type": "PostalAddress", addressLocality: "Prayagraj", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  })),
  knowsAbout: [
    "Full-Stack Development",
    "Mobile App Development",
    "MERN Stack",
    "Fintech",
    "E-commerce",
    "SaaS",
    ...new Set(toolbox.flatMap((g) => g.items)),
  ],
  sameAs: socials.map((s) => s.href),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: ["Shoaib Khan — Portfolio", "mohammadshoaibkhan.com"],
  description: `Portfolio of ${profile.name}, ${profile.role}.`,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
};

function breadcrumb(url, trail) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalFor(c.path),
    })),
  };
}

function webPage(type, url, meta, extra = {}) {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(meta.image.src) },
    ...extra,
  };
}

/* ---------------------------------------------------------------- per-route meta */

const PAGES = {
  "/": {
    title: `${profile.name} | Full-Stack & Mobile App Developer`,
    description: `Senior full-stack & React Native developer in India — ${profile.careerYears}+ years building mobile apps, MERN platforms and SaaS. 16+ apps shipped. Open to freelance.`,
    schema: (url, meta) => [
      webPage("ProfilePage", url, meta, { mainEntity: { "@id": PERSON_ID }, about: { "@id": PERSON_ID } }),
    ],
  },
  "/about": {
    title: `About ${profile.name} | React Native & MERN Developer`,
    description: `${profile.name} — senior developer at Loanyfy and freelancer building React Native apps, MERN platforms and SaaS for clients in India and the Middle East.`,
    type: "profile",
    crumbs: [{ name: "About", path: "/about" }],
    schema: (url, meta) => [webPage("AboutPage", url, meta, { mainEntity: { "@id": PERSON_ID }, about: { "@id": PERSON_ID } })],
  },
  "/projects": {
    title: `Projects — Mobile Apps, SaaS & Web | ${profile.name}`,
    description: `${projectsData.length} projects shipped to production: React Native apps, SaaS, e-commerce and websites — PLP Bazar, KLIMB School ERP, Alras Cars, Fugen Health Care and more.`,
    crumbs: [{ name: "Projects", path: "/projects" }],
    schema: (url, meta) => [
      webPage("CollectionPage", url, meta, {
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          "@id": `${url}#list`,
          numberOfItems: projectsData.length,
          itemListElement: projectsData.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: `${SITE_URL}/projects/${p.id}`,
          })),
        },
      }),
    ],
  },
  "/experience": {
    title: `Experience — Senior Developer at Loanyfy | ${profile.name}`,
    description: `Senior App & Full-Stack Developer at Loanyfy (fintech) since Jan 2024, freelancing since 2023 — React Native, MERN, AWS, KYC and payment integrations.`,
    crumbs: [{ name: "Experience", path: "/experience" }],
    schema: (url, meta) => [
      webPage("WebPage", url, meta, {
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          "@id": `${url}#roles`,
          itemListElement: experience.map((role, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Occupation",
              name: role.role,
              description: role.summary,
              occupationLocation: { "@type": "Country", name: "India" },
              skills: role.stack.join(", "),
            },
          })),
        },
      }),
    ],
  },
  "/contact": {
    title: `Hire a React Native & MERN Developer | ${profile.name}`,
    description: `Hire ${profile.name} for a React Native app, MERN web platform, SaaS or e-commerce build. Replies within 24 hours by email, WhatsApp or the contact form.`,
    crumbs: [{ name: "Contact", path: "/contact" }],
    schema: (url, meta) => [
      webPage("ContactPage", url, meta, { mainEntity: { "@id": PERSON_ID }, about: { "@id": PERSON_ID } }),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  },
};

function projectMeta(project) {
  const path = `/projects/${project.id}`;
  const category = CATEGORIES[project.category];
  const chips = projectChips(project);
  const builtWith = project.stack.length ? ` Built with ${listJoin(project.stack.slice(0, 3))}.` : "";
  const builtAt = project.studio ? ` Built at ${project.studio}.` : "";

  const suffix = ` | ${profile.name}`;
  const title = `${project.title}${suffix}`.length <= 65 ? `${project.title}${suffix}` : `${project.title} | ${profile.shortName}`;

  return {
    path,
    title,
    description: clip(`${project.tagline}. A ${category.label.toLowerCase()} case study by ${profile.name}.${builtWith}${builtAt}`),
    type: "article",
    image: { src: `/og/projects/${project.id}.jpg`, width: 1200, height: 630, alt: `${project.name} — ${project.tagline}` },
    crumbs: [
      { name: "Projects", path: "/projects" },
      { name: project.name, path },
    ],
    schema: (url, meta) => [
      webPage("WebPage", url, meta, {
        about: { "@id": `${url}#project` },
        mainEntity: { "@id": `${url}#project` },
      }),
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        headline: project.title,
        abstract: project.tagline,
        description: project.description,
        url,
        genre: category.label,
        keywords: chips.join(", "),
        image: project.gallery.map((g) => absoluteUrl(g.src)),
        creator: { "@id": PERSON_ID },
        ...(project.links.length ? { sameAs: project.links.map((l) => l.href) } : {}),
      },
    ],
  };
}

const NOT_FOUND = {
  title: `Page not found | ${profile.name}`,
  description: "The page you were looking for doesn't exist or has moved.",
  noindex: true,
};

/** Normalise a pathname: no trailing slash (except "/"), no query/hash. */
export function normalizePath(pathname) {
  const p = (pathname || "/").split(/[?#]/)[0].replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/**
 * Everything the <head> needs for a path. Unknown paths get the 404 meta (noindex).
 * @returns {{ path, url, title, description, image, type, noindex, jsonLd, preload? }}
 */
export function getRouteMeta(pathname) {
  const path = normalizePath(pathname);
  const projectMatch = /^\/projects\/([^/]+)$/.exec(path);
  const project = projectMatch && getProject(projectMatch[1]);

  const page = project ? projectMeta(project) : PAGES[path] ? { path, ...PAGES[path] } : null;

  if (!page) {
    return { path, url: null, ...NOT_FOUND, image: DEFAULT_IMAGE, type: "website", jsonLd: null };
  }

  const url = canonicalFor(page.path);
  const meta = {
    path: page.path,
    url,
    title: page.title,
    description: page.description,
    image: page.image || DEFAULT_IMAGE,
    type: page.type || "website",
    noindex: false,
    // The hero portrait is the largest image on the home page — fetch it early there only.
    preload: page.path === "/" ? "/img/shoaib-hero.webp" : null,
  };

  meta.jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      ...page.schema(url, meta).map((node) =>
        page.crumbs && node["@id"] === `${url}#webpage` ? { ...node, breadcrumb: { "@id": `${url}#breadcrumb` } } : node
      ),
      ...(page.crumbs ? [breadcrumb(url, page.crumbs)] : []),
    ],
  };

  return meta;
}

/* ---------------------------------------------------------------- <head> markup (build time) */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON for a <script> tag — "<" escaped so content can never close the tag. */
export const jsonForScript = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

/** The route-specific <head> tags, as an HTML string (used by the prerender step). */
export function renderHeadTags(meta) {
  const image = absoluteUrl(meta.image.src);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />`,
  ];
  if (meta.url) tags.push(`<link rel="canonical" href="${esc(meta.url)}" />`);
  if (meta.preload) tags.push(`<link rel="preload" as="image" href="${meta.preload}" type="image/webp" fetchpriority="high" />`);
  tags.push(
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    ...(meta.url ? [`<meta property="og:url" content="${esc(meta.url)}" />`] : []),
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${meta.image.width}" />`,
    `<meta property="og:image:height" content="${meta.image.height}" />`,
    `<meta property="og:image:alt" content="${esc(meta.image.alt)}" />`,
    ...(meta.type === "profile"
      ? [
          `<meta property="profile:first_name" content="Mohammad Shoaib" />`,
          `<meta property="profile:last_name" content="Khan" />`,
        ]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(meta.image.alt)}" />`
  );
  if (meta.jsonLd) tags.push(`<script type="application/ld+json" id="seo-jsonld">${jsonForScript(meta.jsonLd)}</script>`);
  return tags.join("\n    ");
}

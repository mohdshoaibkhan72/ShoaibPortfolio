import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { SEOHead } from "../components/SEOHead";
import { MaskLines, Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import ProjectVisual from "../components/project/ProjectVisual";
import CodeSpec from "../components/project/CodeSpec";
import Gallery from "../components/project/Gallery";
import Lightbox from "../components/project/Lightbox";
import NotFoundPage from "./NotFoundPage";
import { CATEGORIES, getProject, nextProject, projectChips } from "../data/projects";
import { EASE } from "../lib/utils";

function Meta({ label, children }) {
  return (
    <div className="border-t border-fg/10 py-5 pr-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-3 text-[15px] leading-snug">{children}</dd>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = getProject(id);
  const [lightbox, setLightbox] = useState(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  if (!project) return <NotFoundPage />;

  const category = CATEGORIES[project.category];
  const next = nextProject(project.id);
  const chips = projectChips(project);
  const firstShot = project.gallery[0]?.src;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.links[0]?.href || `https://mohammadshoaibkhan.com/projects/${project.id}`,
    author: { "@type": "Person", name: "Mohammad Shoaib Khan", url: "https://mohammadshoaibkhan.com" },
    applicationCategory: project.category === "app" ? "MobileApplication" : "WebApplication",
    operatingSystem: project.category === "app" ? "Android, iOS" : "Web",
    keywords: chips.join(", "),
    image: firstShot ? `https://mohammadshoaibkhan.com${firstShot}` : undefined,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mohammadshoaibkhan.com" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://mohammadshoaibkhan.com/projects" },
        { "@type": "ListItem", position: 3, name: project.title, item: `https://mohammadshoaibkhan.com/projects/${project.id}` },
      ],
    },
  };

  return (
    <>
      <SEOHead
        title={`${project.title} | Mohammad Shoaib Khan`}
        description={`${project.tagline}. ${project.description.slice(0, 120)}...`}
        keywords={`${project.title}, ${chips.join(", ")}, Mohammad Shoaib Khan`}
        canonicalPath={`/projects/${project.id}`}
        ogImage={firstShot ? `https://mohammadshoaibkhan.com${firstShot}` : undefined}
        structuredData={structuredData}
      />

      <article>
        <header className="container-x pt-28 md:pt-40">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Link to="/projects" className="eyebrow group inline-flex items-center gap-2 transition-colors hover:text-fg">
              <FiArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              All work
            </Link>
          </motion.div>

          <MaskLines
            as="h1"
            onMount
            delay={0.25}
            lines={[project.name]}
            className="display mt-8 text-[clamp(3.2rem,10vw,10rem)] md:mt-12"
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.p
              className="text-[clamp(1.35rem,2.4vw,2.2rem)] leading-[1.15] tracking-[-0.025em] text-balance lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            >
              {project.tagline}
            </motion.p>
            {project.links[0] && (
              <motion.div
                className="lg:col-span-4 lg:justify-self-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
              >
                <Button href={project.links[0].href} target="_blank" rel="noreferrer">
                  {project.category === "app" && project.links[0].label === "Google Play" ? "Get it on Google Play" : "Visit live site"}
                </Button>
              </motion.div>
            )}
          </div>

          <motion.dl
            className="mt-12 grid grid-cols-2 md:mt-16 md:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Meta label="Category">{category.label}</Meta>
            <Meta label="Platform">{category.platform}</Meta>
            <Meta label={project.studio ? "Built at" : "Stack"}>
              {project.studio ? `${project.studio} agency` : chips.slice(0, 3).join(" · ")}
            </Meta>
            <Meta label="Live">
              {project.links.length ? (
                <span className="flex flex-col gap-1">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 underline decoration-fg/25 underline-offset-4 hover:decoration-fg"
                    >
                      {l.label}
                      <FiArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </span>
              ) : (
                <span className="text-muted">Private client build</span>
              )}
            </Meta>
          </motion.dl>
        </header>

        <motion.div
          className="container-x mt-6 md:mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
        >
          <ProjectVisual project={project} eager className="group aspect-[4/3] rounded-[22px] md:aspect-[16/9] md:rounded-[36px]" />
        </motion.div>

        {/* Overview */}
        <section className="container-x grid gap-10 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">(Overview)</span>
          </div>
          <div className="lg:col-span-8">
            <Reveal as="p" className="text-[clamp(1.4rem,2.5vw,2.3rem)] leading-[1.22] tracking-[-0.025em] text-pretty">
              {project.description}
            </Reveal>

            {project.stats && (
              <Reveal className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10">
                {project.stats.map((s) => (
                  <div key={s.label} className="bg-bg p-5 md:p-8">
                    <div className="display text-[clamp(2rem,4.5vw,3.75rem)]">{s.value}</div>
                    <div className="mt-3 text-sm text-muted">{s.label}</div>
                  </div>
                ))}
              </Reveal>
            )}

            <div className="mt-16 md:mt-20">
              <h2 className="eyebrow mb-5">Key features</h2>
              <ol className="grid gap-x-10 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <Reveal as="li" key={f} delay={(i % 2) * 0.06} className="flex gap-5 border-t border-fg/10 py-5">
                    <span className="font-mono text-xs leading-6 text-muted">0{i + 1}</span>
                    <span className="leading-6">{f}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Under the hood */}
        <section className="container-x grid gap-10 pb-24 md:pb-36 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">(Under the hood)</span>
            <div className="mt-6 flex max-w-xs flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-8">
            <CodeSpec spec={project.spec} />
          </Reveal>
        </section>

        {/* Screens */}
        <section className="container-x pb-24 md:pb-36">
          <div className="mb-10 flex items-center justify-between border-t border-fg/10 pt-5 md:mb-14">
            <span className="eyebrow">(Screens)</span>
            <span className="eyebrow">{String(project.gallery.length).padStart(2, "0")} images</span>
          </div>
          <Gallery project={project} onOpen={setLightbox} />
        </section>

        {/* Next project */}
        <Link to={`/projects/${next.id}`} className="group block border-t border-fg/10" data-cursor="Next">
          <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
            <div className="md:col-span-7">
              <span className="eyebrow">Next project</span>
              <h2 className="display mt-6 text-[clamp(3rem,8.5vw,8.5rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {next.name}
              </h2>
              <p className="mt-5 max-w-md text-muted">{next.tagline}</p>
            </div>
            <ProjectVisual project={next} className="aspect-[4/3] rounded-[22px] md:col-span-5 md:rounded-[28px]" />
          </div>
        </Link>
      </article>

      <Lightbox items={project.gallery} index={lightbox} onChange={setLightbox} onClose={closeLightbox} />
    </>
  );
}

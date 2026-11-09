import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { FiArrowUpRight, FiGrid, FiList } from "react-icons/fi";
import { SEOHead } from "../components/SEOHead";
import PageHeader from "../components/ui/PageHeader";
import ProjectCard from "../components/project/ProjectCard";
import ProjectVisual from "../components/project/ProjectVisual";
import { CATEGORIES, projectChips, projectsData } from "../data/projects";
import { EASE, cn, useMediaQuery } from "../lib/utils";

const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mohammad Shoaib Khan — Projects Portfolio",
  description: "16+ production projects including mobile apps, SaaS products, e-commerce platforms and business websites",
  url: "https://mohammadshoaibkhan.com/projects",
  numberOfItems: projectsData.length,
  itemListElement: projectsData.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    description: p.tagline,
    url: `https://mohammadshoaibkhan.com/projects/${p.id}`,
  })),
};

const FILTERS = [
  { key: "all", label: "All", count: projectsData.length },
  ...Object.entries(CATEGORIES).map(([key, c]) => ({
    key,
    label: c.plural,
    count: projectsData.filter((p) => p.category === key).length,
  })),
];

/** Floating preview that follows the cursor over the list view. */
function HoverPreview({ project }) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-30" style={{ x, y }} aria-hidden="true">
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ProjectVisual project={project} className="aspect-[4/3] w-[360px] rounded-2xl shadow-2xl" eager />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("filter");
  const filter = FILTERS.some((f) => f.key === requested) ? requested : "all";
  const [view, setView] = useState("grid");
  const [hovered, setHovered] = useState(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const list = filter === "all" ? projectsData : projectsData.filter((p) => p.category === filter);

  const setFilter = (key) => {
    const next = new URLSearchParams(params);
    if (key === "all") next.delete("filter");
    else next.set("filter", key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <SEOHead
        title="Projects | Mobile Apps, SaaS, E-Commerce & Web — Mohammad Shoaib Khan"
        description="16+ production projects: React Native apps (PLP Bazar, Fugen Health Care, Taleem-e-Ummat), SaaS products (KLIMB School ERP, HR CRM), e-commerce platforms and business websites built with the MERN stack."
        keywords="React Native projects, MERN Stack projects, mobile app developer portfolio, SaaS development, e-commerce development, full-stack projects India"
        canonicalPath="/projects"
        structuredData={projectsStructuredData}
      />

      <PageHeader
        eyebrow="(Work)"
        title={[
          <span key="w">
            Work
            <sup className="ml-2 align-super font-mono text-[max(0.16em,13px)] font-normal tracking-normal text-muted">
              ({projectsData.length})
            </sup>
          </span>,
        ]}
        intro="Mobile apps, SaaS products, web platforms and websites I've designed, built and shipped to production."
      />

      <section className="container-x pb-28 pt-14 md:pb-40 md:pt-20">
        <div className="mb-10 flex items-center justify-between gap-4 border-y border-fg/10 py-4 md:mb-14">
          <div
            className="no-scrollbar -mx-1 flex min-w-0 gap-1.5 overflow-x-auto px-1 pr-8 [mask-image:linear-gradient(90deg,#000_85%,transparent)] md:pr-1 md:[mask-image:none]"
            role="tablist"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => {
              const active = f.key === filter;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active ? "text-bg" : "text-fg/70 hover:text-fg"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <sup className="ml-1 font-mono text-[11px] opacity-60">{f.count}</sup>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-1 rounded-full border border-fg/10 p-1 md:flex" aria-label="Layout">
            {[
              ["grid", FiGrid, "Grid view"],
              ["list", FiList, "List view"],
            ].map(([key, Icon, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                aria-label={label}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-colors duration-300",
                  view === key ? "bg-fg text-bg" : "text-fg/60 hover:text-fg"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <motion.div layout className="grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <>
            <ul className="border-b border-fg/10" onPointerLeave={() => setHovered(null)}>
              {list.map((project, i) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    onPointerEnter={() => setHovered(project)}
                    className="group grid grid-cols-12 items-center gap-4 border-t border-fg/10 py-6 md:py-8"
                  >
                    <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="col-span-9 text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:col-span-5 md:text-[2.6rem] md:leading-none">
                      {project.name}
                    </h3>
                    <span className="hidden text-sm text-muted md:col-span-2 md:block">{CATEGORIES[project.category].label}</span>
                    <span className="hidden truncate text-sm text-muted md:col-span-3 md:block">
                      {projectChips(project).slice(0, 3).join(" · ")}
                    </span>
                    <FiArrowUpRight className="col-span-1 h-5 w-5 justify-self-end transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                  </Link>
                </li>
              ))}
            </ul>
            {finePointer && <HoverPreview project={hovered} />}
          </>
        )}
      </section>
    </>
  );
}

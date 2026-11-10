import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { ArrowLink } from "../ui/Button";
import ProjectVisual from "../project/ProjectVisual";
import { CATEGORIES, featuredProjects, projectChips, projectsData } from "../../data/projects";
import { cn, useMediaQuery } from "../../lib/utils";

const pad = (n) => String(n).padStart(2, "0");

function StackCard({ project, index, total, progress, stacked }) {
  // Earlier cards shrink slightly as later ones slide over them.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const category = CATEGORIES[project.category];

  return (
    <div className={cn(stacked && "sticky top-0 flex h-screen items-center")}>
      <motion.article
        style={stacked ? { scale, top: index * 22 - 10 } : undefined}
        className={cn("relative w-full origin-top", stacked && "will-change-transform")}
      >
        <Link
          to={`/projects/${project.id}`}
          data-cursor="View"
          className="group grid overflow-hidden rounded-[22px] border border-fg/[0.08] bg-surface md:rounded-[32px] lg:h-[min(76vh,700px)] lg:grid-cols-12"
        >
          <div className="order-2 flex flex-col gap-8 p-6 sm:p-8 lg:order-1 lg:col-span-5 lg:justify-between lg:p-10 xl:p-12">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-muted">
                {pad(index + 1)} / {pad(total)}
              </span>
              <span className="chip">{category.label}</span>
            </div>

            <div>
              <h3 className="display text-[clamp(2.5rem,4.8vw,4.8rem)]">{project.name}</h3>
              <p className="mt-5 max-w-md text-lg leading-snug text-muted text-pretty">{project.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {projectChips(project)
                  .slice(0, 5)
                  .map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-fg/10 pt-5">
              <span className="text-sm font-medium">View case study</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <FiArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </span>
            </div>
          </div>

          <ProjectVisual
            project={project}
            className="order-1 aspect-[4/3] lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-full"
          />
        </Link>
      </motion.article>
    </div>
  );
}

export default function SelectedWork() {
  const stacked = useMediaQuery("(min-width: 1024px)");
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="container-x pb-16 md:pb-24">
      <SectionHeader
        index="02"
        label="Selected work"
        title={[<span key="w">Selected <span className="serif-em">work</span></span>]}
        aside={<ArrowLink to="/projects">All {projectsData.length} projects</ArrowLink>}
      />
      <div ref={listRef} className="relative flex flex-col gap-6 lg:gap-0">
        {featuredProjects.map((project, i) => (
          <StackCard
            key={project.id}
            project={project}
            index={i}
            total={featuredProjects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}

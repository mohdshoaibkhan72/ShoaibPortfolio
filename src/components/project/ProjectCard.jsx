import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectVisual from "./ProjectVisual";
import { CATEGORIES } from "../../data/projects";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="group block" data-cursor="View">
      <ProjectVisual project={project} className="aspect-[4/3] rounded-[20px] sm:rounded-[28px]" />
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-xl font-medium tracking-tight sm:text-2xl">
            {project.name}
            <FiArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
            />
          </h3>
          <p className="mt-1.5 text-[15px] text-muted text-pretty">{project.tagline}</p>
        </div>
        <span className="eyebrow mt-2 shrink-0">{CATEGORIES[project.category].label}</span>
      </div>
    </Link>
  );
}

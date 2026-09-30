// Re-exports the shared Projects page component with centralized data
// Used on the home page's dedicated projects route
import Projects from "./ProjectsSection";
import { projectsData } from "../data/projectsData";

export default function ProjectsPage() {
  return <Projects items={projectsData} />;
}

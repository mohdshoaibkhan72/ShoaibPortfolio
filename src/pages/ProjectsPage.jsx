import { useSearchParams } from "react-router-dom";
import Projects from "../components/ProjectsSection";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { projectsData } from "../data/projectsData";

const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mohammad Shoaib Khan — Projects Portfolio",
  description: "16+ production projects including mobile apps, e-commerce platforms, and business websites",
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

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const defaultFilter = searchParams.get("filter") || "all";

  return (
    <>
      <SEOHead
        title="Projects | Mobile Apps, E-Commerce & Web Development — Mohammad Shoaib Khan"
        description="16+ production projects: React Native mobile apps (PLP Bazar, Dr Attendance, Masjid Finder, Ppokket Loan), e-commerce platforms, and business websites built with MERN stack."
        keywords="React Native projects, MERN Stack projects, mobile app developer portfolio, e-commerce development, full-stack projects India"
        canonicalPath="/projects"
        structuredData={projectsStructuredData}
      />
      <div className="pt-20">
        <Projects items={projectsData} defaultFilter={defaultFilter} />
      </div>
      <Footer />
    </>
  );
}

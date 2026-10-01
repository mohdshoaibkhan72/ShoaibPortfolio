import Tilt3D from "../components/Tilt3D";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LandingPage from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import SkillsAndTools from "../components/Skills";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { AppCard, WebAppCard, WebsiteCard } from "../components/ProjectsSection";
import { projectsData } from "../data/projectsData";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mohammadshoaibkhan.com/#person",
      name: "Mohammad Shoaib Khan",
      url: "https://mohammadshoaibkhan.com",
      image: "https://res.cloudinary.com/dt7qppfbh/image/upload/v1762139970/aiimg1_jlasiv.png",
      sameAs: [
        "https://github.com/mohdshoaibkhan72",
        "https://www.linkedin.com/in/shoaibkhan72/",
      ],
      jobTitle: "Senior Full-Stack & Mobile App Developer",
      worksFor: { "@type": "Organization", name: "Loanyfy", url: "https://www.loanyfy.com" },
      email: "info@mohammadshoaibkhan.com",
      telephone: "+917310249234",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      knowsAbout: [
        "React Native", "React.js", "Node.js", "MongoDB", "Express.js",
        "JavaScript", "Full-Stack Development", "Mobile App Development",
        "MERN Stack", "AWS", "Fintech Development",
      ],
      description:
        "Senior Full-Stack & Mobile App Developer with 3+ years experience. Currently working full-time at Loanyfy (fintech). Expert in React Native, MERN Stack. 16+ production apps delivered.",
    },
    {
      "@type": "WebSite",
      "@id": "https://mohammadshoaibkhan.com/#website",
      url: "https://mohammadshoaibkhan.com",
      name: "Mohammad Shoaib Khan — Portfolio",
      description: "Portfolio of Mohammad Shoaib Khan, Senior Full-Stack & Mobile App Developer",
      author: { "@id": "https://mohammadshoaibkhan.com/#person" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Mohammad Shoaib Khan | Senior Full-Stack & Mobile App Developer"
        description="Senior Full-Stack & Mobile App Developer. Full-time at Loanyfy (fintech). Expert in React Native, MERN Stack, AWS. 16+ production apps including PLP Bazar, Ppokket Loan, Dr Attendance, Masjid Finder."
        keywords="Mohammad Shoaib Khan, Full-Stack Developer, React Native Developer, MERN Stack, Mobile App Developer, Loanyfy Developer, Freelance Developer India"
        canonicalPath="/"
        structuredData={homeStructuredData}
      />

      {/* Hero */}
      <LandingPage />

      {/* Quick Stats */}
      <section className="relative bg-slate-900/50 py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "3+", label: "Years Experience" },
            { value: "2 yrs", label: "Full-Time at Loanyfy" },
            { value: "16+", label: "Projects Delivered" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Tilt3D max={18} scale={1.06} className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
              <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <About />

      {/* Skills Preview */}
      <SkillsAndTools />

      {/* Featured Projects */}
      <section className="py-24 bg-page-deep">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Selected Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 max-w-xl mx-auto">A curated selection of my best work across mobile apps and web platforms.</p>
          </div>

          {/* Mobile Apps — 3 */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(37,99,235,0.15))", border: "1px solid rgba(14,165,233,0.25)" }}>📱</div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#38bdf8" }}>Mobile Development</p>
                  <h3 className="text-xl font-bold text-white">Applications</h3>
                </div>
              </div>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(14,165,233,0.4), transparent)" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {projectsData.filter(p => p.category === "app").slice(0, 3).map(project => (
                <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><AppCard project={project} /></Tilt3D>
              ))}
            </div>
          </div>

          {/* Web Projects — 3 */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.15))", border: "1px solid rgba(139,92,246,0.25)" }}>🌐</div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#a78bfa" }}>Web Development</p>
                  <h3 className="text-xl font-bold text-white">Websites</h3>
                </div>
              </div>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.4), transparent)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.filter(p => p.category === "webapp" || p.category === "website").slice(0, 3).map(project =>
                project.category === "webapp"
                  ? <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><WebAppCard project={project} /></Tilt3D>
                  : <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><WebsiteCard project={project} /></Tilt3D>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Experience />

      <Testimonials />

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-500/15 via-slate-900 to-purple-500/15">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Available for freelance work
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
              Let's build something <span className="text-indigo-400">great together</span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how I can help bring your idea to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/30"
              >
                Get In Touch
              </Link>
              <a
                href="/MohdShoaib_CV.pdf"
                download
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

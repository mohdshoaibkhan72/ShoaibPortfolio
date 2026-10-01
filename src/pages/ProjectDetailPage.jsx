import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { projectsData } from "../data/projectsData";

const CATEGORY_COLOR = {
  app:     { badge: "bg-sky-500/15 border-sky-500/30 text-sky-300",           label: "📱 Mobile App" },
  webapp:  { badge: "bg-violet-500/15 border-violet-500/30 text-violet-300",  label: "🌐 Web App"    },
  website: { badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300", label: "🏢 Website"  },
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-indigo-400 hover:text-indigo-300">← Back to Projects</Link>
      </div>
    );
  }

  const cat = CATEGORY_COLOR[project.category] || CATEGORY_COLOR.website;
  const shots = project.shotsPanel.shots;
  const related = projectsData.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 3);

  const detailStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.live && project.live !== "#" ? project.live : `https://mohammadshoaibkhan.com/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: "Mohammad Shoaib Khan",
      url: "https://mohammadshoaibkhan.com",
    },
    applicationCategory: project.category === "app" ? "MobileApplication" : "WebApplication",
    operatingSystem: project.category === "app" ? "Android, iOS" : "Web",
    keywords: project.codePanel.chips.join(", "),
    image: shots[0]?.src,
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
        keywords={`${project.title}, ${project.codePanel.chips.join(", ")}, Mohammad Shoaib Khan`}
        canonicalPath={`/projects/${project.id}`}
        ogImage={shots[0]?.src}
        structuredData={detailStructuredData}
      />

      <div className="min-h-screen bg-slate-950 text-white pt-24 pb-0">
        <div className="max-w-6xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-slate-300 transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-slate-300 truncate max-w-[200px]">{project.title}</span>
          </nav>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${cat.badge}`}>
                    {cat.label}
                  </span>
                  {project.live && project.live !== "#" && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  {project.storeBadge && project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(34,197,94,0.12)",
                        border: "1px solid rgba(34,197,94,0.4)",
                        color: "#4ade80",
                        textDecoration: "none",
                        boxShadow: "0 0 0 0 rgba(74,222,128,0)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.22)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(74,222,128,0.35)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.12)"; e.currentTarget.style.boxShadow = "0 0 0 0 rgba(74,222,128,0)"; }}
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                        <path d="M3.18 23.5c.3.17.64.22.98.14l13.2-7.62-2.8-2.8L3.18 23.5zM20.5 10.5l-3.22-1.86-3.14 3.14 3.14 3.14 3.24-1.87c.92-.53.92-1.95-.02-2.55zM3 .5C2.7.68 2.5 1 2.5 1.4v21.2c0 .4.2.72.5.9l.1.06 11.89-11.9v-.28L3 .5zm9.89 9.1L3 .5l.18.1 11.07 6.4-3.14 3.14-.22-.54z"/>
                      </svg>
                      Google Play
                    </a>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-3">{project.title}</h1>
                <p className="text-slate-400 text-lg">{project.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.storeBadge && project.live && project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <img src={project.storeBadge} alt="Get it on Google Play"
                      className="h-11 object-contain hover:opacity-90 transition-opacity rounded-xl" />
                  </a>
                )}
                {project.live && project.live !== "#" && !project.storeBadge && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FiExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" /> All Projects
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: Screenshots */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main image */}
              {project.category === "app" ? (
                /* App: professional screenshot gallery */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#060d1a", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex gap-4 p-5 overflow-x-auto"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}>
                    {shots.map((shot, i) => (
                      <button
                        key={i}
                        onClick={() => { setActiveImage(i); setModalOpen(true); }}
                        className="flex-shrink-0 relative group/img"
                      >
                        {/* Blur glow behind active */}
                        <div className="absolute -inset-2 rounded-2xl pointer-events-none transition-all duration-500"
                          style={{
                            background: "#6366f1",
                            opacity: i === activeImage ? 0.2 : 0,
                            filter: "blur(14px)",
                          }} />
                        <div
                          className="relative rounded-2xl overflow-hidden transition-all duration-300"
                          style={{
                            width: 190,
                            height: 338,
                            border: i === activeImage
                              ? "2px solid #6366f1"
                              : "2px solid rgba(255,255,255,0.09)",
                            transform: i === activeImage ? "scale(1.04)" : "scale(1)",
                            boxShadow: i === activeImage
                              ? "0 10px 40px rgba(99,102,241,0.45)"
                              : "0 4px 20px rgba(0,0,0,0.5)",
                          }}
                        >
                          <img src={shot.src} alt={shot.caption} className="w-full h-full object-contain"
                            style={{ background: "#050a12" }} />
                          {/* Caption overlay inside */}
                          <div className="absolute bottom-0 inset-x-0 pt-8 pb-2.5 px-2"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }}>
                            <p className="text-white text-[9px] font-semibold text-center leading-tight truncate">
                              {shot.caption}
                            </p>
                          </div>
                          {/* Expand icon on hover */}
                          <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                          </div>
                          {/* Hover shine */}
                          <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)" }} />
                        </div>
                      </button>
                    ))}

                    {/* Play Store card */}
                    {project.storeBadge && project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 relative group/store"
                      >
                        <div className="absolute -inset-2 rounded-2xl pointer-events-none"
                          style={{ background: "#22c55e", opacity: 0.12, filter: "blur(14px)" }} />
                        <div
                          className="relative rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-[1.04]"
                          style={{
                            width: 190, height: 338,
                            background: "linear-gradient(160deg, #071a0e 0%, #040d06 100%)",
                            border: "2px solid rgba(74,222,128,0.45)",
                            boxShadow: "0 10px 40px rgba(74,222,128,0.2)",
                          }}
                        >
                          <div className="flex flex-col items-center gap-4 px-5">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                              style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}>
                              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#4ade80">
                                <path d="M3.18 23.5c.3.17.64.22.98.14l13.2-7.62-2.8-2.8L3.18 23.5zM20.5 10.5l-3.22-1.86-3.14 3.14 3.14 3.14 3.24-1.87c.92-.53.92-1.95-.02-2.55zM3 .5C2.7.68 2.5 1 2.5 1.4v21.2c0 .4.2.72.5.9l.1.06 11.89-11.9v-.28L3 .5zm9.89 9.1L3 .5l.18.1 11.07 6.4-3.14 3.14-.22-.54z"/>
                              </svg>
                            </div>
                            <p className="text-white font-semibold text-sm text-center">Available on</p>
                            <img src={project.storeBadge} alt="Get it on Google Play"
                              className="w-full object-contain rounded-xl group-hover/store:opacity-90 transition-opacity" />
                            <p className="text-[10px] text-green-400 text-center leading-tight font-medium">Tap to download<br/>from Play Store</p>
                          </div>
                          {/* Bottom caption */}
                          <div className="absolute bottom-0 inset-x-0 pt-8 pb-2.5 px-2"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }}>
                            <p className="text-green-400 text-[9px] font-semibold text-center">Google Play Store</p>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* Web/Website: landscape with object-contain */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-950 cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  <img
                    src={shots[activeImage]?.src}
                    alt={shots[activeImage]?.caption}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <p className="absolute bottom-4 left-4 text-white text-sm font-medium">{shots[activeImage]?.caption}</p>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur border border-white/10 text-xs text-white">
                    Click to expand
                  </div>
                </motion.div>
              )}

              {/* Thumbnails — only for web/website */}
              {shots.length > 1 && project.category !== "app" && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {shots.map((shot, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImage ? "border-indigo-500" : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img src={shot.src} alt={shot.caption} className="w-full h-full object-contain bg-slate-950" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">About This Project</h2>
                <p className="text-slate-300 leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-5">
              {/* Tech Stack */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.codePanel.chips.map((chip) => (
                    <span key={chip} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code preview */}
              <div className="force-dark p-4 rounded-2xl bg-[#0B1020] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto">
                  <code>
                    {project.codePanel.lines.map((ln, i) => (
                      <div key={i} className="whitespace-nowrap">{ln}</div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FiExternalLink className="w-4 h-4" /> View Live Project
                  </a>
                )}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Hire Me for Similar Work
                </Link>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="mt-20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-8">More {cat.label.slice(2)} Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/projects/${rel.id}`}
                    className="group block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-indigo-500/40 transition-all overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.shotsPanel.shots[0]?.src}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold group-hover:text-indigo-400 transition-colors">{rel.title}</h3>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-1">{rel.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
              onClick={() => setModalOpen(false)}
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                <img src={shots[activeImage]?.src} alt={shots[activeImage]?.caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
                <p className="text-center text-white mt-4">{shots[activeImage]?.caption}</p>
                {shots.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {shots.map((_, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} className={`h-1.5 rounded-full transition-all ${i === activeImage ? "bg-indigo-500 w-6" : "bg-white/20 w-1.5"}`} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

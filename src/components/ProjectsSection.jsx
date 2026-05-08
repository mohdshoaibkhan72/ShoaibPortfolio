import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* Project Card Component */
const ProjectCard = React.memo(({ project, onImageClick }) => {
  return (
    <div className="relative group h-full">
      {/* Background Glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full rounded-2xl border border-white/10 bg-[#0B1020]/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            <span className="ml-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate max-w-[120px]">
              {project.codePanel.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 transition-all border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-400 transition-all border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Preview Grid */}
        <div className="px-4 pt-4 pb-2">
          <div className="grid grid-cols-3 gap-2">
            {project.shotsPanel.shots.slice(0, 3).map((shot, i) => (
              <button
                key={i}
                onClick={() => onImageClick(project, i)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all group/img"
              >
                <img
                  src={shot.src}
                  alt={shot.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
          {project.shotsPanel.shots.length > 3 && (
            <div className="mt-2 text-[10px] text-slate-500 font-medium px-1">
              +{project.shotsPanel.shots.length - 3} more screenshots
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <div className="mb-4 overflow-hidden">
            <pre className="text-[12px] leading-relaxed font-mono">
              <code className="block scrollbar-hide overflow-x-auto">
                {project.codePanel.lines.slice(0, 10).map((ln, idx) => (
                  <div key={idx} className="whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
                    {ln}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.codePanel.chips?.slice(0, 6).map((c, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-medium text-indigo-300/90"
                >
                  {c}
                </span>
              ))}
              {project.codePanel.chips?.length > 6 && (
                <span className="text-[10px] text-slate-500 self-center ml-1">
                  +{project.codePanel.chips.length - 6} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Badge Overlay */}
      <div className="absolute -right-2 -top-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold text-white shadow-lg shadow-indigo-500/20 transform rotate-3">
        {project.codePanel.badge}
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

/* Image Viewer Modal */
const ImageViewerModal = ({ project, initialIndex = 0, onClose }) => {
  const [imageIndex, setImageIndex] = useState(initialIndex);
  const screenshots = project.shotsPanel.shots || [];

  const nextImage = () => setImageIndex((i) => (i + 1) % screenshots.length);
  const prevImage = () => setImageIndex((i) => (i - 1 + screenshots.length) % screenshots.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      <div className="relative max-w-6xl w-full flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src={screenshots[imageIndex]?.src}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
          
          {screenshots.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/5 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/5 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col items-center text-center max-w-2xl px-6">
          <p className="text-white text-lg font-medium mb-1">{screenshots[imageIndex]?.caption}</p>
          <div className="flex gap-2 text-slate-400 text-sm">
            <span>{project.codePanel.title}</span>
            <span>•</span>
            <span>{imageIndex + 1} / {screenshots.length}</span>
          </div>
        </div>

        <div className="flex gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setImageIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imageIndex ? "bg-indigo-500 w-6" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const projectsData = [
  // --- PROJECT 1: BALLOON DEKOR ---
  {
    id: "balloon-dekor",
    live: "https://balloon-dekor-client.vercel.app/",
    codePanel: {
      title: "Balloon Dekor — Details",
      subtitle: "live • e-commerce • colorful",
      badge: "MERN • Vercel",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">balloonDekor</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Party supplies • Event decoration • E-commerce"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-amber-300">"React","Node.js","Express","MongoDB"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"Multi-category product catalog", "Shopping cart & wishlist"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-8"><span className="text-slate-200">"Dynamic coupon system", "Order tracking & management"</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-8"><span className="text-slate-200">"Admin analytics dashboard"</span><span className="text-cyan-300">,</span></span>,
        <span key="8" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="9" className="pl-4"><span className="text-slate-400">auth</span><span className="text-slate-300">:</span> <span className="text-amber-300">"JWT • Google OAuth • Email OTP"</span><span className="text-cyan-300">,</span></span>,
        <span key="10"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    },
    shotsPanel: {
      badge: "Design (5)",
      subtitle: "Click to view",
      title: "Balloon Dekor UI",
      shots: [
        { src: "/balone.png", caption: "Home — events & featured decor" },
        { src: "/balone2.png", caption: "All Product — bundles & add‑ons" },
        { src: "/balone3.png", caption: "Admin — orders & inventory" },
        { src: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000", caption: "Cart & Checkout Flow" },
        { src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000", caption: "Category Management" },
      ],
    },
  },

  // --- PROJECT 2: LOANYFY CRM ---
  {
    id: "loanyfy-crm",
    live: "",
    codePanel: {
      title: "Loanyfy CRM",
      subtitle: "internal • business tool",
      badge: "MERN • Internal",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">crmSystem</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">purpose</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Lead & customer relationship management"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="4" className="pl-8"><span className="text-slate-200">"Lead tracking & pipeline", "Customer profile & history"</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"Activity timeline & notes", "Analytics & performance"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-8"><span className="text-slate-200">"Team collaboration", "Automated reminders"</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="8" className="pl-4"><span className="text-slate-400">access</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Role-based permissions (Admin/Manager/Agent)"</span><span className="text-cyan-300">,</span></span>,
        <span key="9"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Charts.js", "RBAC"],
    },
    shotsPanel: {
      badge: "Design (5)",
      subtitle: "Click to view",
      title: "Loanyfy CRM UI",
      shots: [
        { src: "loanyfy/dashbored.png", caption: "Dashboard — Overview & metrics" },
        { src: "loanyfy/leadsdetails.png", caption: "Leads — Pipeline management" },
        { src: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?q=80&w=1000", caption: "Analytics — Team performance" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000", caption: "Customer Profile View" },
        { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000", caption: "Team Collaboration Panel" },
      ],
    },
  },

  // --- PROJECT 3: ALRAS CARS ---
  {
    id: "alras-cars",
    live: "https://alrascars.com/",
    codePanel: {
      title: "Alras Cars — Rental Platform",
      subtitle: "live • e-commerce • rental",
      badge: "MERN • Vercel",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">alrasCars</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Vehicle rental • Car bookings"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-amber-300">"React", "Node.js", "Express", "MongoDB"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"Car catalog with search & filters", "Booking & payment"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-8"><span className="text-slate-200">"User profiles & history", "Fleet management admin"</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="8" className="pl-4"><span className="text-slate-400">auth</span><span className="text-slate-300">:</span> <span className="text-amber-300">"JWT • Email verification"</span><span className="text-cyan-300">,</span></span>,
        <span key="9" className="pl-4"><span className="text-slate-400">hosting</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Vercel • Render"</span><span className="text-cyan-300">,</span></span>,
        <span key="10"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    },
    shotsPanel: {
      badge: "Design (5)",
      subtitle: "Click to view",
      title: "Alras Cars UI",
      shots: [
        { src: "Alras/alras-home.png", caption: "Home - Car listings" },
        { src: "Alras/alras-booking.png", caption: "Booking form" },
        { src: "https://images.unsplash.com/photo-1556742049-04ff43610046?q=80&w=1000", caption: "Admin dashboard" },
        { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000", caption: "Vehicle Details" },
        { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000", caption: "User Profile Dashboard" },
      ],
    },
  },

  // --- PROJECT 4: MARBLE & TILES ---
  {
    id: "marble-tiles",
    live: "https://theluxurytiles.com/",
    codePanel: {
      title: "Marble & Tiles Co.",
      subtitle: "live • b2b • catalog",
      badge: "MERN • WhatsApp",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">marbleTiles</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Marble • Tiles • B2B catalog"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="4" className="pl-8"><span className="text-slate-200">"Product catalog with specs", "High-res galleries"</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"WhatsApp inquiry integration", "Quote request system"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-8"><span className="text-slate-200">"Mobile-first responsive design"</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="8" className="pl-4"><span className="text-slate-400">integration</span><span className="text-slate-300">:</span> <span className="text-amber-300">"WhatsApp Business API"</span><span className="text-cyan-300">,</span></span>,
        <span key="9"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Tailwind", "Node.js", "MongoDB", "WhatsApp API"],
    },
    shotsPanel: {
      badge: "Design (3)",
      subtitle: "Click to view",
      title: "Tiles Gallery UI",
      shots: [
        { src: "theluxary/home.png", caption: "Home — Product showcase" },
        { src: "theluxary/image.png", caption: "Catalog — Browse tiles" },
        { src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1000", caption: "Details — Specifications" },
      ],
    },
  },

  // --- PROJECT 5: LOANYFY PLATFORM ---
  {
    id: "loanyfy",
    live: "https://www.loanyfy.com/",
    codePanel: {
      title: "Loanyfy — Loan Platform",
      subtitle: "live • fintech • business",
      badge: "MERN • Production",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">loanyfy</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">company</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Full-time role at Loanyfy"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Business loans • Fintech"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"Multi-step application forms", "Document upload"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-8"><span className="text-slate-200">"Admin review workflow", "AI-powered chatbot"</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-8"><span className="text-slate-200">"Real-time application tracking"</span><span className="text-cyan-300">,</span></span>,
        <span key="8" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="9" className="pl-4"><span className="text-slate-400">security</span><span className="text-slate-300">:</span> <span className="text-amber-300">"JWT • RBAC • Document encryption"</span><span className="text-cyan-300">,</span></span>,
        <span key="10"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "AWS S3", "JWT"],
    },
    shotsPanel: {
      badge: "Design (3)",
      subtitle: "Click to view",
      title: "Loanyfy UI",
      shots: [
        { src: "/loanyfy.png", caption: "Home — Landing & loan products" },
        { src: "/loanyfprodcut.png", caption: "Products — Loan options" },
        { src: "/Loanyfychatbot.png", caption: "Support — AI Chatbot" },
      ],
    },
  },

  // --- PROJECT 6: NOKRYFY ---
  {
    id: "nokryfy",
    live: "https://nokryfyclients2.vercel.app/",
    codePanel: {
      title: "Nokryfy.com — Job Portal",
      subtitle: "live • business • recruitment",
      badge: "MERN • Vercel",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">Nokryfy</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Job portal • Recruitment"</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span></span>,
        <span key="4" className="pl-8"><span className="text-slate-200">"Job search & filtering", "Employer job posting"</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-8"><span className="text-slate-200">"Candidate applications", "Resume builder & upload"</span><span className="text-cyan-300">,</span></span>,
        <span key="6" className="pl-4"><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="7" className="pl-4"><span className="text-slate-400">role</span><span className="text-slate-300">:</span> <span className="text-amber-300">"Full-stack development & API integration"</span><span className="text-cyan-300">,</span></span>,
        <span key="8"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    },
    shotsPanel: {
      badge: "Design (5)",
      subtitle: "Click to view",
      title: "Nokryfy UI",
      shots: [
        { src: "nokryfy/home.png", caption: "Dashbored- company panel" },
        { src: "nokryfy/image.png", caption: "Home — Job search" },
        { src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000", caption: "Jobs — Total Applicants" },
        { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000", caption: "Candidate Management" },
        { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000", caption: "Employer Analytics" },
      ],
    },
  },

  // --- PROJECT 7: MADIHA PERFUME ---
  {
    id: "madiha-perfume",
    live: "#",
    codePanel: {
      title: "Madiha Perfume — Details",
      subtitle: "live • e-commerce • luxury",
      badge: "Next.js • Tailwind",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">store</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">brand</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Madiha Perfume'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">tech</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Next.js 14 • Tailwind CSS"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">highlights</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"SSR", "SEO", "Responsive"</span><span className="text-cyan-300">]</span></span>,
        <span key="5"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["Next.js", "React", "Tailwind", "Production-Ready", "E-commerce"],
    },
    shotsPanel: {
      badge: "Design (2)",
      subtitle: "desktop interface",
      title: "Madiha Perfume UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000", caption: "Elegant Product Listing" },
        { src: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=1000", caption: "Luxury Brand Experience" },
      ],
    },
  },

  // --- PROJECT 8: CHAND KABADI WALA ---
  {
    id: "chand-kabadi-wala",
    live: "#",
    codePanel: {
      title: "Chand Kabadi Wala — Details",
      subtitle: "live • mobile app • recycling",
      badge: "React Native • Expo",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">app</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">name</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Chand Kabadi Wala'</span><span className="text-cyan-300">,</span></span>,
        <span key="3"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Expo", "Moti", "Lucide", "Animations"],
    },
    shotsPanel: {
      badge: "App UI",
      subtitle: "mobile interface",
      title: "Chand Kabadi UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000", caption: "Premium Onboarding Screen" },
        { src: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1000", caption: "Service Selection Interface" },
      ],
    },
  },

  // --- PROJECT 9: KROEASY ---
  {
    id: "kroeasy",
    live: "#",
    codePanel: {
      title: "KroEasy — Details",
      subtitle: "live • mobile app • services",
      badge: "React Native • Razorpay",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">platform</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">service</span><span className="text-slate-300">:</span> <span className="text-amber-300">'KroEasy'</span><span className="text-cyan-300">,</span></span>,
        <span key="3"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Node.js", "Razorpay", "Batch Booking"],
    },
    shotsPanel: {
      badge: "Service UI",
      subtitle: "worker app",
      title: "KroEasy UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1000", caption: "Worker Dashboard" },
        { src: "https://images.unsplash.com/photo-1556742049-04ff43610046?q=80&w=1000", caption: "Payment QR Flow" },
      ],
    },
  },

  // --- PROJECT 10: MASJID APP ---
  {
    id: "masjid-app",
    live: "#",
    codePanel: {
      title: "Masjid App — Details",
      subtitle: "live • mobile app • community",
      badge: "React Native • PDF",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">app</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">purpose</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Masjid Community'</span><span className="text-cyan-300">,</span></span>,
        <span key="3"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Expo", "PDF-Lib", "Firebase"],
    },
    shotsPanel: {
      badge: "Community UI",
      subtitle: "utility app",
      title: "Masjid UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000", caption: "Quran Reading View" },
        { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000", caption: "Prayer Timings" },
      ],
    },
  },

  // --- PROJECT 11: PLP BAZAR ---
  {
    id: "plp-bazar",
    live: "#",
    codePanel: {
      title: "PLP Bazar — Details",
      subtitle: "live • e-commerce • marketplace",
      badge: "MERN • Scalable",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">marketplace</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">name</span><span className="text-slate-300">:</span> <span className="text-amber-300">'PLP Bazar'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"MERN Stack Architecture"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">modules</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Admin", "Vendor", "Customer"</span><span className="text-cyan-300">]</span></span>,
        <span key="5"><span>{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Redux", "Marketplace"],
    },
    shotsPanel: {
      badge: "Platform UI",
      subtitle: "full-stack",
      title: "PLP Bazar UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000", caption: "Marketplace Overview" },
        { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000", caption: "Vendor Management" },
      ],
    },
  },
];

/* Main Projects Component */
const Projects = ({ items = projectsData }) => {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (project, imageIndex) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${items.length * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Rows for the stacking effect
      const projectRows = [];
      for (let i = 0; i < items.length; i += 3) {
        projectRows.push(items.slice(i, i + 3));
      }

      // Stagger rows into view
      const rows = gsap.utils.toArray(".project-row");
      const dots = gsap.utils.toArray(".row-dot");
      
      rows.forEach((row, i) => {
        const rowTl = gsap.timeline();
        
        if (i === 0) {
          rowTl.fromTo(row, 
            { y: 100, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
          );
        } else {
          rowTl.fromTo(row,
            { y: "120%", opacity: 0, scale: 0.9, rotateX: -10, x: i % 2 === 0 ? 20 : -20 },
            { y: 0, opacity: 1, scale: 1, rotateX: 0, x: 0, duration: 1.5, ease: "expo.out" }
          );

          const rowsUnder = rows.slice(0, i);
          rowTl.to(rowsUnder, {
            scale: (idx) => 0.95 - (i - idx) * 0.04,
            opacity: (idx) => 0.5 - (i - idx) * 0.1,
            y: (idx) => -40 * (i - idx),
            filter: "blur(2px)",
            duration: 1,
            ease: "power2.inOut",
          }, "<");
        }

        // Dot animation
        if (dots[i]) {
          rowTl.to(dots[i], {
            backgroundColor: "#6366f1",
            scale: 1.5,
            duration: 0.5
          }, "<");
          
          if (i > 0 && dots[i-1]) {
            rowTl.to(dots[i-1], {
              backgroundColor: "rgba(255,255,255,0.2)",
              scale: 1,
              duration: 0.5
            }, "<");
          }
        }
        
        tl.add(rowTl);
        tl.to({}, { duration: 0.5 });
      });

      gsap.to(".bg-orb", {
        y: (i) => (i === 0 ? 200 : -200),
        scale: 1.2,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: containerRef, dependencies: [items] }
  );

  const projectRows = [];
  for (let i = 0; i < items.length; i += 3) {
    projectRows.push(items.slice(i, i + 3));
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full text-white bg-[#030712] py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", perspective: "2000px" }}
    >
      <div className="bg-orb absolute top-20 left-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] z-0" />
      <div className="bg-orb absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col h-full">
        <div className="text-center mb-16 shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
          >
            THE WORK
          </motion.h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6 rounded-full" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            A curated selection of professional applications bridging technology and human experience.
          </p>
        </div>

        <div className="relative flex-1 min-h-[650px] w-full">
          {/* Vertical Progress Indicator */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
            {projectRows.map((_, i) => (
              <div key={i} className="row-dot w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-300" />
            ))}
          </div>

          {projectRows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="project-row absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
              style={{ zIndex: rowIndex + 10, transformStyle: "preserve-3d" }}
            >
              {row.map((project) => (
                <ProjectCard key={project.id} project={project} onImageClick={handleImageClick} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center shrink-0">
          <a
            href="https://github.com/mohdshoaibkhan72"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">EXPLORE GITHUB</span>
            <svg viewBox="0 0 24 24" className="absolute right-6 w-5 h-5 transition-all opacity-0 group-hover:opacity-100 group-hover:right-8" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ImageViewerModal
            project={selectedProject}
            initialIndex={selectedImageIndex}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

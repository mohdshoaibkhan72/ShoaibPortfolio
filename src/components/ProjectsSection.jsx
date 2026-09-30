import Tilt3D from "./Tilt3D";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Phone Mockup ──────────────────────────────────────────── */
const PhoneMockup = ({ src, size = "lg", onClick }) => {
  const d =
    size === "lg"
      ? { w: 100, h: 205, border: 4, r: 24, nw: 38, nh: 10 }
      : { w: 68,  h: 138, border: 3, r: 17, nw: 26, nh: 7  };

  return (
    <button
      onClick={onClick}
      style={{ width: d.w, height: d.h }}
      className="relative flex-shrink-0 group/ph cursor-zoom-in"
    >
      {/* Outer glow */}
      <div className="absolute -inset-3 rounded-[36px] bg-sky-500/20 blur-xl opacity-0 group-hover/ph:opacity-100 transition-opacity duration-500" />
      {/* Frame */}
      <div
        className="absolute inset-0 shadow-2xl"
        style={{
          borderRadius: d.r,
          background: "linear-gradient(160deg, #4a5568 0%, #2d3748 40%, #1a202c 100%)",
        }}
      />
      {/* Screen bezel */}
      <div
        className="absolute overflow-hidden bg-[#080c18]"
        style={{ top: d.border, left: d.border, right: d.border, bottom: d.border, borderRadius: d.r - 2 }}
      >
        {/* Dynamic island */}
        <div
          className="absolute top-[7px] left-1/2 -translate-x-1/2 bg-black z-10"
          style={{ width: d.nw, height: d.nh, borderRadius: d.nh }}
        />
        {src && (
          <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-sky-900/40 opacity-0 group-hover/ph:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute right-[-4px] rounded-r-sm"
        style={{ top: 55, width: 4, height: 26, background: "linear-gradient(to bottom, #4a5568, #2d3748)" }} />
      <div className="absolute left-[-4px] rounded-l-sm"
        style={{ top: 45, width: 4, height: 18, background: "linear-gradient(to bottom, #4a5568, #2d3748)" }} />
      <div className="absolute left-[-4px] rounded-l-sm"
        style={{ top: 70, width: 4, height: 18, background: "linear-gradient(to bottom, #4a5568, #2d3748)" }} />
    </button>
  );
};

/* ─── App Card ──────────────────────────────────────────────── */
export const AppCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const shot0 = project.shotsPanel.shots[0]?.src;
  const shot1 = project.shotsPanel.shots[1]?.src;
  const hasStore = project.storeBadge && project.live && project.live !== "#";

  return (
    <>
      <div className="app-card-item relative group h-full">
        {/* Ambient hover glow */}
        <div className="absolute -inset-1 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.22) 0%, transparent 70%)" }} />

        <div className="relative h-full rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            background: "linear-gradient(175deg, #1e3a5f 0%, #0f1f3d 40%, #0a1020 100%)",
            border: "1px solid rgba(56,189,248,0.18)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}>

          {/* Top gradient band */}
          <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, transparent)" }} />

          {/* App icon + name header */}
          <div className="flex items-center gap-2.5 px-3 pt-3 pb-2.5">
            {/* Icon */}
            <div className="w-10 h-10 rounded-2xl flex-shrink-0 overflow-hidden shadow-lg ring-1"
              style={{ ringColor: "rgba(56,189,248,0.3)", boxShadow: "0 0 0 1px rgba(56,189,248,0.25), 0 4px 12px rgba(0,0,0,0.5)" }}>
              {project.logo
                ? <img src={project.logo} alt={project.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-lg"
                    style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}>📱</div>
              }
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-[12px] leading-snug truncate">
                {project.title.split(" — ")[0]}
              </p>
              <p className="text-[10px] mt-0.5 truncate" style={{ color: "#7dd3fc" }}>
                {project.codePanel.badge}
              </p>
            </div>
            {project.live && project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:text-sky-300"
                style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", color: "#94a3b8" }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
          </div>

          {/* Phone mockup stage */}
          <div className="relative flex justify-center items-end gap-2 px-3 pt-2 pb-3">
            {/* Stage bg glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />
            <PhoneMockup src={shot0} size="lg" onClick={() => { setModalIdx(0); setModalOpen(true); }} />
            {shot1 && (
              <div className="mb-2 opacity-55 group-hover:opacity-85 transition-all duration-500 flex-shrink-0"
                style={{ transform: "rotate(-9deg)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
                <PhoneMockup src={shot1} size="sm" onClick={() => { setModalIdx(1); setModalOpen(true); }} />
              </div>
            )}
          </div>

          {/* Tagline + chips */}
          <div className="px-3 pb-3 flex-1 flex flex-col">
            <p className="text-[10px] leading-relaxed mb-2.5 line-clamp-2" style={{ color: "#94a3b8" }}>
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.codePanel.chips.slice(0, 3).map((c) => (
                <span key={c} className="px-1.5 py-0.5 rounded-md text-[9px] font-medium"
                  style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.22)", color: "#bae6fd" }}>
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => setDetailOpen(true)}
              className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.22)", color: "#7dd3fc" }}
            >
              View More
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <MiniModal project={project} initialIndex={modalIdx} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {detailOpen && (
          <ProjectDetailModal project={project} onClose={() => setDetailOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Web App Card — Browser chrome ────────────────────────── */
export const WebAppCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const shot = project.shotsPanel.shots[0]?.src;
  const urlDisplay = project.live && project.live !== "#"
    ? project.live.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : "webapp.dev";

  return (
    <>
      <div className="web-card-item relative group h-full">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/25 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        <div className="relative h-full rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "linear-gradient(160deg, #110d2e 0%, #080c18 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>

          <div className="h-[1.5px] w-full bg-gradient-to-r from-violet-500 via-purple-500 to-transparent" />

          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(10,6,30,0.6)" }}>
            <div className="flex gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex-1 flex items-center gap-1.5 mx-2 px-2.5 py-[3px] rounded-md min-w-0"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <svg viewBox="0 0 24 24" className="w-2 h-2 flex-shrink-0" style={{ color: "#64748b" }} fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[9px] truncate font-mono" style={{ color: "#e2e8f0" }}>{urlDisplay}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[8px] font-semibold"
                style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd" }}>
                Web App
              </span>
              {project.live && project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded text-slate-400 hover:text-violet-400 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Screenshot */}
          <button onClick={() => setModalOpen(true)}
            className="relative aspect-[16/9] overflow-hidden block w-full flex-shrink-0 group/img">
            {shot && (
              <img src={shot} alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" loading="lazy" />
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #080c18 0%, transparent 60%)" }} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <div className="p-2.5 rounded-full backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-white font-semibold text-sm mb-1 leading-tight">{project.title}</p>
            <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.codePanel.chips.slice(0, 5).map((c) => (
                <span key={c} className="px-2 py-0.5 rounded text-[10px] font-medium"
                  style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd" }}>
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => setDetailOpen(true)}
              className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#c4b5fd" }}
            >
              View More
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <MiniModal project={project} initialIndex={0} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {detailOpen && <ProjectDetailModal project={project} onClose={() => setDetailOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

/* ─── Website Card ──────────────────────────────────────────── */
export const WebsiteCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const shot = project.shotsPanel.shots[0]?.src;

  return (
    <>
      <div className="web-card-item relative group h-full">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/20 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        <div className="relative h-full rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "linear-gradient(160deg, #0a1d16 0%, #080c18 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>

          <div className="h-[1.5px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent" />

          {/* Screenshot */}
          <button onClick={() => setModalOpen(true)}
            className="relative aspect-[16/9] overflow-hidden block w-full flex-shrink-0 group/img">
            {shot && (
              <img src={shot} alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" loading="lazy" />
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #080c18 0%, transparent 50%)" }} />
            {/* Badges */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full text-[9px] font-semibold backdrop-blur-sm"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(52,211,153,0.3)", color: "#6ee7b7" }}>
                🏢 Website
              </span>
            </div>
            {project.live && project.live !== "#" && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold backdrop-blur-sm"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(52,211,153,0.4)", color: "#34d399" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <div className="p-2.5 rounded-full backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-white font-semibold text-sm leading-tight">{project.title}</p>
              {project.live && project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0 p-1.5 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.codePanel.chips.slice(0, 5).map((c) => (
                <span key={c} className="px-2 py-0.5 rounded text-[10px] font-medium"
                  style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.18)", color: "#6ee7b7" }}>
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => setDetailOpen(true)}
              className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", color: "#6ee7b7" }}
            >
              View More
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <MiniModal project={project} initialIndex={0} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {detailOpen && <ProjectDetailModal project={project} onClose={() => setDetailOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

/* ─── Image viewer modal ────────────────────────────────────── */
const MiniModal = ({ project, initialIndex = 0, onClose }) => {
  const [idx, setIdx] = useState(initialIndex);
  const shots = project.shotsPanel.shots || [];
  const next = () => setIdx((i) => (i + 1) % shots.length);
  const prev = () => setIdx((i) => (i - 1 + shots.length) % shots.length);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 force-dark"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)" }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              src={shots[idx]?.src}
              alt={shots[idx]?.caption}
              className="w-full max-h-[75vh] object-contain bg-slate-950"
            />
          </AnimatePresence>
        </div>

        {shots.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div className="mt-4 text-center">
          <p className="text-white text-sm font-medium">{shots[idx]?.caption}</p>
          <p className="text-slate-500 text-xs mt-1">{project.title} · {idx + 1} / {shots.length}</p>
          {shots.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {shots.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-indigo-500" : "w-1.5 bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ─── Project Detail Modal ──────────────────────────────────── */
const CATEGORY_CONFIG = {
  app:     { label: "Mobile App", color: "#38bdf8",  bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.3)"  },
  webapp:  { label: "Web App",    color: "#a78bfa",  bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  website: { label: "Website",    color: "#34d399",  bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)"  },
};

const ProjectDetailModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const shots = project.shotsPanel.shots || [];
  const cat = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.website;
  const isApp = project.category === "app";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-6 force-dark"
      style={{ background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative w-full sm:max-w-4xl max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        style={{ background: "linear-gradient(160deg,#0f172a 0%,#0b1221 100%)", border: "1px solid rgba(255,255,255,0.1)", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky Header ── */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5"
          style={{ background: "rgba(11,18,33,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3 min-w-0">
            {project.logo ? (
              <img src={project.logo} alt={project.title}
                className="w-10 h-10 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                style={{ boxShadow: `0 0 0 1.5px ${cat.border}, 0 4px 12px rgba(0,0,0,0.4)` }} />
            ) : (
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cat.bg}, ${cat.bg})`, boxShadow: `0 0 0 1.5px ${cat.border}` }}>
                {isApp ? "📱" : "🌐"}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-white font-bold text-sm sm:text-base leading-tight truncate">{project.title}</h2>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}>
                  {cat.label}
                </span>
                {project.live && project.live !== "#" && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
                {project.storeBadge && project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.4)",
                      color: "#4ade80",
                      cursor: "pointer",
                      boxShadow: "0 0 0 0 rgba(74,222,128,0)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.22)"; e.currentTarget.style.boxShadow = "0 0 10px rgba(74,222,128,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.12)"; e.currentTarget.style.boxShadow = "0 0 0 0 rgba(74,222,128,0)"; }}
                  >
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="currentColor">
                      <path d="M3.18 23.5c.3.17.64.22.98.14l13.2-7.62-2.8-2.8L3.18 23.5zM20.5 10.5l-3.22-1.86-3.14 3.14 3.14 3.14 3.24-1.87c.92-.53.92-1.95-.02-2.55zM3 .5C2.7.68 2.5 1 2.5 1.4v21.2c0 .4.2.72.5.9l.1.06 11.89-11.9v-.28L3 .5zm9.89 9.1L3 .5l.18.1 11.07 6.4-3.14 3.14-.22-.54z"/>
                    </svg>
                    Google Play
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {project.storeBadge && project.live && project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                <img src={project.storeBadge} alt="Get it on Google Play"
                  className="h-9 object-contain hover:opacity-90 transition-opacity rounded-lg" />
              </a>
            )}
            <button onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", transition: "all 0.2s" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* ── Screenshots ── */}
          {shots.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase mb-4 flex items-center gap-2"
                style={{ color: cat.color }}>
                <span className="w-3 h-[1.5px] rounded-full inline-block" style={{ background: cat.color }} />
                Screenshots
              </p>

              {isApp ? (
                /* ── App: professional screenshot gallery ── */
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: "#060d1a", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex gap-4 p-5 overflow-x-auto"
                    style={{ scrollbarWidth: "thin", scrollbarColor: `${cat.color}30 transparent` }}>
                    {shots.map((shot, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className="flex-shrink-0 relative group/img"
                      >
                        {/* Blur glow behind active */}
                        <div className="absolute -inset-2 rounded-2xl pointer-events-none transition-all duration-500"
                          style={{
                            background: cat.color,
                            opacity: i === activeImg ? 0.18 : 0,
                            filter: "blur(14px)",
                          }} />
                        <div
                          className="relative rounded-2xl overflow-hidden transition-all duration-300"
                          style={{
                            width: 178,
                            height: 316,
                            border: i === activeImg
                              ? `2px solid ${cat.color}`
                              : "2px solid rgba(255,255,255,0.09)",
                            transform: i === activeImg ? "scale(1.04)" : "scale(1)",
                            boxShadow: i === activeImg
                              ? `0 10px 36px ${cat.color}44`
                              : "0 4px 18px rgba(0,0,0,0.5)",
                          }}
                        >
                          <img
                            src={shot.src}
                            alt={shot.caption}
                            className="w-full h-full object-contain"
                            style={{ background: "#050a12" }}
                            loading="lazy"
                          />
                          {/* Caption overlay inside */}
                          <div className="absolute bottom-0 inset-x-0 pt-8 pb-2.5 px-2"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }}>
                            <p className="text-white text-[9px] font-semibold text-center leading-tight truncate">
                              {shot.caption}
                            </p>
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
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 relative group/store"
                      >
                        <div className="absolute -inset-2 rounded-2xl pointer-events-none"
                          style={{ background: "#22c55e", opacity: 0.12, filter: "blur(14px)" }} />
                        <div
                          className="relative rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-[1.04]"
                          style={{
                            width: 178, height: 316,
                            background: "linear-gradient(160deg, #071a0e 0%, #040d06 100%)",
                            border: "2px solid rgba(74,222,128,0.45)",
                            boxShadow: "0 10px 36px rgba(74,222,128,0.2)",
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
                </div>
              ) : (
                /* ── Web/Website: landscape gallery ── */
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-3"
                    style={{ background: "#050b17", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {/* 16:9 container */}
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImg}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          src={shots[activeImg]?.src}
                          alt={shots[activeImg]?.caption}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </AnimatePresence>
                    </div>
                    {shots.length > 1 && (
                      <>
                        <button onClick={() => setActiveImg((i) => (i - 1 + shots.length) % shots.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
                          style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button onClick={() => setActiveImg((i) => (i + 1) % shots.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
                          style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                      </>
                    )}
                    {shots[activeImg]?.caption && (
                      <div className="absolute bottom-0 inset-x-0 px-4 py-3"
                        style={{ background: "linear-gradient(to top,rgba(5,11,23,0.95),transparent)" }}>
                        <p className="text-white text-xs font-medium">{shots[activeImg].caption}</p>
                      </div>
                    )}
                  </div>
                  {shots.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {shots.map((shot, i) => (
                        <button key={i} onClick={() => setActiveImg(i)}
                          className="flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden transition-all duration-200"
                          style={{
                            border: i === activeImg ? `2px solid ${cat.color}` : "2px solid rgba(255,255,255,0.07)",
                            opacity: i === activeImg ? 1 : 0.5,
                          }}>
                          <img src={shot.src} alt={shot.caption} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── About ── */}
          <div className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 flex items-center gap-2"
              style={{ color: cat.color }}>
              <span className="w-3 h-[1.5px] rounded-full inline-block" style={{ background: cat.color }} />
              About This Project
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* ── Features + Tech ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features?.length > 0 && (
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 flex items-center gap-2"
                  style={{ color: cat.color }}>
                  <span className="w-3 h-[1.5px] rounded-full inline-block" style={{ background: cat.color }} />
                  Key Features
                </p>
                <ul className="space-y-2.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}>✓</span>
                      <span className="text-slate-300 text-xs leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.codePanel.chips?.length > 0 && (
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 flex items-center gap-2"
                  style={{ color: cat.color }}>
                  <span className="w-3 h-[1.5px] rounded-full inline-block" style={{ background: cat.color }} />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.codePanel.chips.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                      style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Links ── */}
          <div className="flex flex-wrap gap-3 pt-1 pb-2">
            {project.live && project.live !== "#" && !project.storeBadge && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ background: `linear-gradient(135deg,${cat.color}22,${cat.color}0d)`, border: `1px solid ${cat.border}`, color: cat.color }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Visit Live Site
              </a>
            )}
            {project.storeBadge && project.live && project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center">
                <img src={project.storeBadge} alt="Google Play" className="h-11 object-contain hover:opacity-90 transition-opacity rounded-lg" />
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ─── Main Projects Component ───────────────────────────────── */
const Projects = ({ items = [] }) => {
  const sectionRef = useRef(null);

  const apps     = items.filter((p) => p.category === "app");
  const webApps  = items.filter((p) => p.category === "webapp");
  const websites = items.filter((p) => p.category === "website");

  useGSAP(
    () => {
      // ── Page header ──
      gsap.from(".pj-header-badge", {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-header-badge", start: "top 90%" },
      });
      gsap.from(".pj-header-title", {
        y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-header-title", start: "top 90%" },
      });
      gsap.from(".pj-header-line", {
        scaleX: 0, transformOrigin: "center", duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-header-line", start: "top 90%" },
      });
      gsap.from(".pj-header-sub", {
        y: 15, opacity: 0, duration: 0.7, delay: 0.25, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-header-sub", start: "top 90%" },
      });

      // ── Applications section header ──
      gsap.from(".apps-section-row", {
        x: -30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".apps-section-row", start: "top 88%" },
      });
      gsap.from(".apps-divider-line", {
        scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".apps-divider-line", start: "top 88%" },
      });

      // ── App cards stagger ──
      gsap.from(".app-card-item", {
        y: 50, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: ".apps-cards-grid", start: "top 88%" },
      });

      // ── Websites section header ──
      gsap.from(".web-section-row", {
        x: -30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".web-section-row", start: "top 88%" },
      });
      gsap.from(".web-divider-line", {
        scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".web-divider-line", start: "top 88%" },
      });

      // ── Sub-labels ──
      gsap.from(".sub-label-dynamic", {
        x: -20, opacity: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".sub-label-dynamic", start: "top 90%" },
      });
      gsap.from(".sub-label-static", {
        x: -20, opacity: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".sub-label-static", start: "top 90%" },
      });

      // ── Web App cards ──
      gsap.from(".web-card-item", {
        y: 45, opacity: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".web-cards-grid", start: "top 88%" },
      });

      // ── Background orb parallax ──
      gsap.to(".bg-orb-a", {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2,
        },
      });
      gsap.to(".bg-orb-b", {
        y: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2,
        },
      });

      // ── CTA ──
      gsap.from(".pj-cta", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-cta", start: "top 92%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full text-white py-28 overflow-hidden"
      style={{ background: "rgb(var(--page-deep))" }}
    >
      {/* Background orbs */}
      <div className="bg-orb-a absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)" }} />
      <div className="bg-orb-b absolute bottom-0 right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Page header ── */}
        <div className="text-center mb-24">
          <div className="pj-header-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Portfolio
          </div>
          <h1 className="pj-header-title text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">My Work</h1>
          <div className="pj-header-line w-16 h-0.5 mx-auto mb-5 rounded-full"
            style={{ background: "linear-gradient(to right, #6366f1, #a855f7)" }} />
          <p className="pj-header-sub text-slate-400 text-sm max-w-md mx-auto">
            {apps.length} mobile apps &middot; {webApps.length + websites.length} web projects
          </p>
        </div>

        {/* ══ SECTION 1: APPLICATIONS ══════════════════════════ */}
        <div className="mb-28">

          {/* Section header */}
          <div className="apps-section-row flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(37,99,235,0.15))", border: "1px solid rgba(14,165,233,0.25)" }}>
                📱
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#38bdf8" }}>
                  Mobile Development
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Applications</h2>
              </div>
            </div>
            <div className="apps-divider-line flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(14,165,233,0.4), transparent)" }} />
            <span className="text-5xl font-bold tabular-nums flex-shrink-0" style={{ color: "rgba(14,165,233,0.08)" }}>
              {String(apps.length).padStart(2, "0")}
            </span>
          </div>

          {/* App cards grid — 3 per row */}
          <div className="apps-cards-grid grid grid-cols-2 md:grid-cols-3 gap-5">
            {apps.map((project) => (
              <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><AppCard project={project} /></Tilt3D>
            ))}
          </div>
        </div>

        {/* ══ SECTION 2: WEBSITES ══════════════════════════════ */}
        <div>

          {/* Section header */}
          <div className="web-section-row flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.15))", border: "1px solid rgba(139,92,246,0.25)" }}>
                🌐
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#a78bfa" }}>
                  Web Development
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Websites</h2>
              </div>
            </div>
            <div className="web-divider-line flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.4), transparent)" }} />
            <span className="text-5xl font-bold tabular-nums flex-shrink-0" style={{ color: "rgba(139,92,246,0.08)" }}>
              {String(webApps.length + websites.length).padStart(2, "0")}
            </span>
          </div>

          {/* Web Apps + Corporate Sites */}
          <div className="web-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webApps.map((project) => (
              <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><WebAppCard project={project} /></Tilt3D>
            ))}
            {websites.map((project) => (
              <Tilt3D key={project.id} max={6} className="force-dark rounded-2xl"><WebsiteCard project={project} /></Tilt3D>
            ))}
          </div>
        </div>

        {/* ── GitHub CTA ── */}
        <div className="pj-cta mt-24 text-center">
          <p className="text-slate-500 text-sm mb-6">Want to see more?</p>
          <a
            href="https://github.com/mohdshoaibkhan72"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Explore GitHub</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {/* Hover fill */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))" }} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;

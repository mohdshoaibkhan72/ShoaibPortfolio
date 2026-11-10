import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { IntroContext } from "./context/IntroContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Cursor from "./components/layout/Cursor";
import Curtain from "./components/layout/Curtain";
import Preloader from "./components/layout/Preloader";
import { WhatsAppFab } from "./components/ui/WhatsApp";
import HomePage from "./pages/HomePage";
import { initSmoothScroll, scrollToTarget } from "./lib/smoothScroll";
import { PLAY_INTRO } from "./lib/intro";
import { featuredProjects } from "./data/projects";

// Featured project images — downloaded and decoded ahead of time so scrolling to them never stalls.
const featuredImages = featuredProjects.flatMap((p) => (p.cover.type === "image" ? [p.cover.src] : p.cover.images));

// Inner pages are split into their own chunks and prefetched once the browser is idle.
const loaders = {
  about: () => import("./pages/AboutPage"),
  projects: () => import("./pages/ProjectsPage"),
  project: () => import("./pages/ProjectDetailPage"),
  experience: () => import("./pages/ExperiencePage"),
  contact: () => import("./pages/ContactPage"),
  notFound: () => import("./pages/NotFoundPage"),
};
const AboutPage = lazy(loaders.about);
const ProjectsPage = lazy(loaders.projects);
const ProjectDetailPage = lazy(loaders.project);
const ExperiencePage = lazy(loaders.experience);
const ContactPage = lazy(loaders.contact);
const NotFoundPage = lazy(loaders.notFound);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToTarget(0, { immediate: true })}>
      <motion.div key={location.pathname} initial="initial" animate="enter" exit="exit">
        <Curtain />
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          <main id="main">
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer compact={location.pathname === "/contact"} />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  // First visit in a session: show the loading screen, and hold the hero animations until it lifts.
  // Lifting happens in two steps (panels first, hero a moment later) so no single frame does all the work.
  const [loaderVisible, setLoaderVisible] = useState(PLAY_INTRO);
  const [introDone, setIntroDone] = useState(!PLAY_INTRO);
  const finishIntro = useCallback(() => {
    setLoaderVisible(false);
    setTimeout(() => setIntroDone(true), 140);
  }, []);

  useEffect(() => initSmoothScroll(), []);

  // Prefetch the other pages (and warm the featured images) once the browser is idle —
  // never while the loading screen animates.
  useEffect(() => {
    if (!introDone) return;
    const prefetch = () => {
      Object.values(loaders).forEach((load) => load().catch(() => {}));
      featuredImages.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.decode?.().catch(() => {});
      });
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2500);
    return () => clearTimeout(id);
  }, [introDone]);

  return (
    <ThemeProvider>
      <IntroContext.Provider value={introDone}>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <a
              href="#main"
              className="sr-only z-[200] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              Skip to content
            </a>
            <Navbar />
            <AnimatedRoutes />
            <WhatsAppFab />
            <Cursor />
            <AnimatePresence>{loaderVisible && <Preloader key="preloader" onFinish={finishIntro} />}</AnimatePresence>
            <div className="grain" aria-hidden="true" />
          </BrowserRouter>
        </MotionConfig>
      </IntroContext.Provider>
    </ThemeProvider>
  );
}

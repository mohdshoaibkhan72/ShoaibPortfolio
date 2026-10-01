import React, { useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const PhotoCard3D = lazy(() => import("./three/PhotoCard3D"));
const HeroScene = lazy(() => import("./three/HeroScene"));

/* GSAP helps for smooth entrance */
const ANIM_DURATION = 0.8;
const STAGGER_AMOUNT = 0.12;

const skillsColors = [
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
  "from-cyan-500 to-sky-500",
  "from-lime-500 to-green-500",
  "from-red-500 to-orange-500",
  "from-violet-500 to-indigo-500",
];

const coder = {
  name: "Mohammad Shoaib Khan",
  skills: [
    "React",
    "NextJS",
    "React Native",
    "App Dev",
    "Express",
    "Node.js",
    "MongoDB",
    "Docker",
    "AWS",
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function () {
    return this.hardWorker && this.problemSolver && this.skills.length >= 5;
  },
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const terminalRef = useRef(null);

  useGSAP(
    () => {
      // Entrance animations
      const tl = gsap.timeline();
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: ANIM_DURATION,
        stagger: STAGGER_AMOUNT,
        ease: "power3.out",
      }).from(".hero-name-part", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.6").from(".hero-title-part", {
        x: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.8").from(
        ".hero-terminal",
        {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Floating animation for skill chips
      gsap.to(".gsap-float-hero", {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 1,
          from: "random",
        },
      });

    },
    { scope: heroRef }
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-screen text-white overflow-hidden"
        id="home"
      >
        {/* 3D backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[140px]" />
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT: content */}
            <div className="text-left hero-content">
              <div className="hero-reveal mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1 text-sm font-medium text-indigo-700 rounded-full border border-indigo-300/60 bg-indigo-50 dark:text-indigo-300 dark:border-indigo-500/30 dark:bg-indigo-900/20">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                  Empowering Digital Growth
                </span>
              </div>

              <h1 className="hero-reveal mb-4 text-[34px] leading-tight sm:text-[46px] md:text-[56px] md:leading-[1.1] font-semibold tracking-tight">
                <span className="hero-name-part inline-block mb-1">I’m Shoaib Khan 👋</span>
                <br className="hidden sm:block" />
                <span className="hero-title-part inline-block bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  App & Full‑Stack Developer
                </span>
              </h1>

              <p className="hero-reveal mb-8 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-slate-200/90">
                Specializing in building premium mobile apps and scalable full‑stack
                solutions. From conceptual UI to production‑ready code, I bring
                your ideas to life.
              </p>

              <div
                className="hero-reveal mb-8 flex flex-wrap items-center gap-4"
              >
                <a href="#contact" aria-label="Book a call">
                  <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring ring-indigo-500">
                    Book a call
                  </button>
                </a>
                <a href="#projects" aria-label="View projects">
                  <button className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400 focus:outline-none focus-visible:ring ring-indigo-500 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500">
                    View projects
                  </button>
                </a>
                <a
                  href="/MohdShoaib_CV.pdf"
                  download
                  aria-label="Download resume PDF"
                  className="rounded-md border border-transparent px-6 py-3 text-sm font-semibold text-indigo-200 hover:text-slate-50 focus:outline-none focus-visible:ring ring-indigo-500"
                >
                  Download résumé
                </a>
              </div>

              <div
                className="group relative inline-flex items-center gap-3 rounded-xl border border-slate-300/70 bg-white/5 p-2 
             transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] 
             hover:bg-white/10 hover:shadow-[0_10px_35px_-10px_rgba(99,102,241,0.45)] 
             focus-within:ring-2 ring-indigo-500/50"
              >
                {/* gradient border shimmer via ::before */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl 
               before:absolute before:inset-[-2px] before:rounded-[14px] 
               before:bg-[conic-gradient(from_180deg_at_50%_50%,_#6366f1_0deg,_#22d3ee_120deg,_#f472b6_240deg,_#6366f1_360deg)]
               before:opacity-0 before:transition-opacity before:duration-300 
               group-hover:before:opacity-60"
                />

                {/* GitHub */}
                <a
                  href="https://github.com/mohdshoaibkhan72"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300/60 
               bg-slate-900/40 text-slate-200 transition-all duration-200 
               group-hover:text-white hover:bg-white/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.41-3.9-1.41-.53-1.33-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.26 3.4.97.11-.76.41-1.26.75-1.55-2.57-.29-5.28-1.29-5.28-5.76 0-1.27.46-2.31 1.21-3.13-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.28 1.2a11.36 11.36 0 0 1 5.98 0c2.28-1.52 3.28-1.2 3.28-1.2.65 1.65.24 2.87.12 3.17.76.82 1.21 1.86 1.21 3.13 0 4.48-2.71 5.46-5.3 5.75.43.38.81 1.11.81 2.24v3.32c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/shoaibkhan72/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300/60 
               bg-slate-900/40 text-slate-200 transition-all duration-200 
               group-hover:text-white hover:bg-white/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5Zm.02 6H2v11h3V9.5Zm4 0H6v11h3v-6.1c0-1.62.44-2.72 2.02-2.72 1.17 0 1.66.83 1.66 2.58V20.5h3v-6.68c0-3.58-1.91-5.25-4.46-5.25-2.06 0-2.97 1.14-3.47 1.93h-.04V9.5Z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@mohammadshoaibkhan.com"
                  aria-label="Email"
                  title="Email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300/60 
               bg-slate-900/40 text-slate-200 transition-all duration-200 
               group-hover:text-white hover:bg-white/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.24l7.4 5.55a1 1 0 0 0 1.2 0L20 8.24V18H4Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT: real 3D photo card (Three.js) */}
            <div className="relative h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px] hero-terminal" ref={terminalRef}>
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/25 blur-3xl" />
              <Suspense fallback={<img src="/aiimg1.png" alt="Mohammad Shoaib Khan" className="relative mx-auto mt-16 w-4/5 rounded-3xl shadow-2xl" />}>
                <PhotoCard3D src="/aiimg1.png" alt="Mohammad Shoaib Khan coding at his workstation" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

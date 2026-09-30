import { motion } from "framer-motion";
import { FiDownload, FiCheckCircle } from "react-icons/fi";

export function About() {
  const highlights = [
    "3+ Years Professional Experience",
    "Full-Time at Loanyfy · Fintech",
    "16+ Production Apps Delivered",
    "React Native & MERN Expert",
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-4xl font-bold">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Professional Image with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/20 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 shadow-2xl">
              <img
                src="/aiimg1.png"
                alt="Mohammad Shoaib Khan - App Developer"
                className="w-full h-auto rounded-3xl transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-purple-900/20 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-900/30 rounded-3xl"></div>

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
            </div>

            {/* Floating Info Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-4 left-6 right-6 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-90">
                    App & Web Developer
                  </p>
                  <p className="text-xs opacity-70 mt-0.5">
                    Freelance Specialist
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Decorative glassmorphism elements - enhanced */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl backdrop-blur-2xl border border-white/10 -z-10 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"></div>

            <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full backdrop-blur-2xl border border-white/10 -z-10 transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"></div>

            {/* Animated glow effect */}
            <div className="absolute inset-0 -z-20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl rounded-3xl"></div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h3 className="mb-6 text-white text-3xl font-semibold">
              Full-Stack & Mobile App Developer
            </h3>
            <p className="mb-6 text-slate-300 text-base leading-relaxed">
              I'm a Full-Stack & Mobile App Developer with 3+ years of hands-on
              experience building production-grade digital products. Currently
              working full-time at{" "}
              <span className="text-indigo-400 font-medium">Loanyfy</span> — a
              fintech platform — where I lead mobile-first product development
              using React Native and architect scalable MERN stack backends.
            </p>
            <p className="mb-8 text-slate-300 text-base leading-relaxed">
              Alongside my full-time role, I've delivered 16+ freelance projects
              — from multi-vendor marketplaces and luxury e-commerce to
              community apps and B2B platforms. I bring clean code, premium
              UI/UX, and reliable deployment expertise to every project I take
              on.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <FiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-200 text-sm">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Download CV Button - Fixed */}
            <a href="/MohdShoaib_CV.pdf" download className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300"
              >
                <FiDownload className="w-4 h-4" />
                Download CV
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

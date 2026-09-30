import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BsBriefcase,
  BsBuilding,
  BsCalendar3,
  BsLightning,
} from "react-icons/bs";
import { FiCheckCircle, FiAward, FiTrendingUp } from "react-icons/fi";
import { experiences } from "../data/mockData";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.from(".exp-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 90%",
        },
      });

      // Stats card entrance
      gsap.from(".exp-stats", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-stats",
          start: "top 85%",
        },
      });

      // Experience items entrance
      gsap.from(".exp-item", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-item",
          start: "top 85%",
        },
      });

      // Parallax for orbs
      gsap.to(".bg-orb-exp", {
        y: (i) => (i === 0 ? 100 : -100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  // Calculate total years of experience
  const totalYears = experiences.length > 0 ? "3+" : "0";

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 overflow-hidden"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 " />

      {/* Animated gradient orbs */}
      <div className="bg-orb-exp absolute top-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="bg-orb-exp absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 exp-header">
          <h2 className="mb-4 text-white text-4xl font-bold">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base">
            My professional journey and contributions to different organizations
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Sticky */}
            <div className="lg:col-span-4 exp-stats">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Stats Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
                  <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                    <FiAward className="text-indigo-400" />
                    Career Highlights
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
                      <div className="p-3 bg-indigo-600 rounded-lg">
                        <BsCalendar3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {totalYears}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Years Experience
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <BsBuilding className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">Loanyfy</p>
                        <p className="text-slate-400 text-sm">Full-Time · 2 yrs</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                      <div className="p-3 bg-emerald-600 rounded-lg">
                        <FiTrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">16+</p>
                        <p className="text-slate-400 text-sm">Projects Delivered</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Freelance Availability Badge */}
                <div
                  className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-6 shadow-xl exp-stats"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
                    <h3 className="text-white text-lg font-semibold">
                      Available for Freelance
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Open to exciting freelance opportunities and project
                    collaborations. Let's build something amazing together!
                  </p>
                  <button
                    className="mt-4 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <BsLightning className="w-4 h-4" />{" "}
                    <a href="#contact"> Hire Me</a>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Experience Timeline */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500"></div>

                <div className="space-y-8">
                  {/* Full-Time Experiences */}
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="relative pl-8 exp-item"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute left-0 top-8 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-slate-900 shadow-lg shadow-indigo-500/50 transform -translate-x-1/2"
                      />

                      {/* Experience Card */}
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-xl overflow-hidden">
                        {/* Card Header */}
                        <div className="p-6 border-b border-white/10">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex items-start gap-4 flex-grow">
                              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/50 flex-shrink-0">
                                <BsBriefcase className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-white text-xl font-semibold">
                                    {exp.title}
                                  </h3>
                                  {exp.type && (
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${exp.type === "Full-Time" ? "bg-indigo-500/25 text-indigo-300 border border-indigo-500/40" : "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"}`}>
                                      {exp.type}
                                    </span>
                                  )}
                                </div>
                                <p className="text-indigo-400 mt-1 font-medium">
                                  {exp.company}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full border border-indigo-500/30">
                                <BsCalendar3 className="w-3 h-3" />
                                {exp.duration}
                              </span>
                              {exp.durationLabel && (
                                <p className="text-slate-400 text-xs mt-1 text-right">{exp.durationLabel}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <ul className="space-y-3">
                            {exp.responsibilities.map(
                              (responsibility, respIndex) => (
                                <li
                                  key={respIndex}
                                  className="flex items-start gap-3"
                                >
                                  <FiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-slate-300 text-sm leading-relaxed">
                                    {responsibility}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

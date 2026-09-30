import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Footer() {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: footerRef }
  );

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      link: "https://github.com/mohdshoaibkhan72",
      color: "hover:bg-gray-700",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/shoaibkhan72/",
      color: "hover:bg-blue-600",
    },

    {
      icon: HiMail,
      label: "Email",
      link: "mailto:info@mohammadshoaibkhan.com",
      color: "hover:bg-red-500",
    },
  ];

  const quickLinks = [
    { label: "Home",       path: "/"           },
    { label: "About",      path: "/about"      },
    { label: "Projects",   path: "/projects"   },
    { label: "Experience", path: "/experience" },
    { label: "Contact",    path: "/contact"    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 overflow-hidden border-t border-white/5"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="footer-reveal">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <span className="text-white font-semibold">MK</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Mohammad Khan
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Full-stack Senior App developer passionate about building
              exceptional web experiences and turning ideas into reality.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Available for freelance work</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h4 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <span className="w-0 h-px bg-indigo-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-reveal">
            <h4 className="text-white font-semibold text-lg mb-4">
              Connect With Me
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Let's connect and create something amazing together!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 ${social.color} hover:border-transparent transition-all shadow-lg group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8 footer-reveal">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2 footer-reveal">
          <p className="text-slate-400 text-sm">
            © {currentYear} Mohammad Shoaib Khan. All Rights Reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="w-4 h-4 text-red-400 inline" />
            </motion.span>
            <span>using React, Tailwind CSS & GSAP</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Designed & Developed by Mohammad Shoaib Khan
          </p>
        </div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-8 right-8 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all group"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 text-white group-hover:translate-y-[-2px] transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}

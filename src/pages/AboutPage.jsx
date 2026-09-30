import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiDownload } from "react-icons/fi";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    jobTitle: "Senior Full-Stack & Mobile App Developer",
    description:
      "Senior Full-Stack & Mobile App Developer with 3+ years experience. Full-time at Loanyfy (fintech). Expert in React Native, MERN Stack. 16+ production apps delivered including PLP Bazar, Dr Attendance, Masjid Finder, Ppokket Loan.",
    url: "https://mohammadshoaibkhan.com",
    email: "info@mohammadshoaibkhan.com",
    telephone: "+917310249234",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    knowsAbout: ["React Native", "React.js", "Node.js", "MongoDB", "Express.js", "AWS", "Fintech Development", "Mobile App Development"],
    sameAs: ["https://github.com/mohdshoaibkhan72", "https://www.linkedin.com/in/shoaibkhan72/"],
  },
};

const services = [
  { icon: "📱", title: "Mobile App Development", desc: "Cross-platform iOS & Android apps with React Native & Expo. Smooth animations, native performance, and production-ready code." },
  { icon: "🌐", title: "Full-Stack Web Development", desc: "End-to-end MERN stack applications — from React frontends to Node.js APIs and MongoDB databases." },
  { icon: "🛒", title: "E-Commerce Solutions", desc: "Multi-vendor marketplaces, luxury stores, and B2B catalogs with secure payments and admin dashboards." },
  { icon: "🏦", title: "Fintech Development", desc: "High-security loan platforms, KYC flows, payment integrations (Razorpay), and CRM systems." },
  { icon: "☁️", title: "Cloud Deployment", desc: "Production deployments on AWS EC2/S3, Vercel, Render, and Hostinger with CI/CD pipelines." },
  { icon: "🎨", title: "UI/UX Implementation", desc: "Premium interfaces with GSAP animations, Framer Motion, and Tailwind CSS for polished user experiences." },
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Mohammad Shoaib Khan | Senior Full-Stack & React Native Developer"
        description="Learn about Mohammad Shoaib Khan — Senior Full-Stack & Mobile App Developer. 3+ years experience. Full-time at Loanyfy. Expert in React Native, MERN Stack. Available for freelance."
        keywords="About Mohammad Shoaib Khan, React Native developer, MERN Stack expert, full-stack developer India, mobile app developer, freelance developer"
        canonicalPath="/about"
        structuredData={aboutStructuredData}
      />

      <div className="min-h-screen bg-slate-950 text-white pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10">
              <Link to="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <span className="text-slate-300">About</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative group"
              >
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                  <img src="/aiimg1.png" alt="Mohammad Shoaib Khan — App & Full-Stack Developer" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-purple-900/20 to-transparent" />
                </div>
                <div className="absolute -bottom-4 left-6 right-6 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="font-semibold">Mohammad Shoaib Khan</p>
                      <p className="text-xs opacity-70 mt-0.5">Senior Developer · Loanyfy · Freelancer</p>
                    </div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">About Me</p>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">
                  Full-Stack & Mobile <span className="text-indigo-400">App Developer</span>
                </h1>
                <p className="text-slate-300 leading-relaxed mb-5">
                  I'm a passionate Full-Stack & Mobile App Developer with 3+ years of hands-on experience building production-grade digital products. Currently working full-time at{" "}
                  <a href="https://www.loanyfy.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                    Loanyfy
                  </a>{" "}
                  — a fintech platform — where I lead mobile-first development using React Native and architect scalable MERN backends.
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Alongside my full-time role, I've delivered 16+ freelance projects — from multi-vendor marketplaces and personal loan apps to community tools and B2B platforms. Every project I take on gets clean code, premium UI/UX, and reliable deployment.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    "3+ Years Professional Experience",
                    "Full-Time at Loanyfy · Fintech",
                    "16+ Production Projects Delivered",
                    "React Native & MERN Expert",
                    "AWS, Vercel & Render Deployments",
                    "Available for Freelance Work",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/MohdShoaib_CV.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                  >
                    <FiDownload className="w-4 h-4" /> Download CV
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Hire Me
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Personal Info */}
        <section className="py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Quick Info</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Name", value: "Mohammad Shoaib Khan" },
                { label: "Location", value: "India (Remote-Friendly)" },
                { label: "Experience", value: "3+ Years" },
                { label: "Availability", value: "Open to Freelance" },
                { label: "Current Role", value: "Sr. Developer @ Loanyfy" },
                { label: "Specialization", value: "React Native & MERN" },
                { label: "Projects Done", value: "16+ Production Apps" },
                { label: "Response Time", value: "Within 24 Hours" },
              ].map((info) => (
                <div key={info.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">What I Do</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Services & Expertise</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-indigo-500/30 transition-all group"
                >
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Technologies I Work With</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React Native","React.js","Node.js","Express.js","MongoDB","Next.js",
                "JavaScript","TypeScript","Tailwind CSS","Redux","AWS S3","AWS EC2",
                "Firebase","Razorpay","WhatsApp API","Cloudinary","JWT","GSAP",
                "Framer Motion","Docker","Vercel","Render","Hostinger","Git",
                "Expo","Moti","PDF-Lib","Chart.js","Postman",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-indigo-500/50 hover:text-indigo-300 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to work together?</h2>
            <p className="text-slate-400 mb-8">Let's talk about your project and see how I can help.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                Get In Touch
              </Link>
              <Link to="/projects" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                View My Work
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

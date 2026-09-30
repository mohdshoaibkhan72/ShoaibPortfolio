import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";
import { BsBriefcase, BsCalendar3 } from "react-icons/bs";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";

const expStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Work Experience — Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/experience",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Senior App & Full-Stack Developer",
        occupationLocation: { "@type": "Country", name: "India" },
        description: "Leading mobile-first fintech development at Loanyfy using React Native and MERN stack",
        estimatedSalary: { "@type": "MonetaryAmountDistribution", currency: "INR" },
      },
    ],
  },
};

const loanyfy = {
  title: "Senior App & Full-Stack Developer",
  company: "Loanyfy",
  type: "Full-Time",
  duration: "June 2024 – Present",
  durationLabel: "2 yrs · Ongoing",
  link: "https://www.loanyfy.com",
  gradient: "from-indigo-500/10 to-purple-500/10",
  border: "border-indigo-500/20",
  badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
  dot: "bg-indigo-400",
  responsibilities: [
    "Leading mobile-first fintech product development with React Native for Android & iOS",
    "Architecting high-security loan management modules, REST APIs, and MERN stack backends",
    "Integrating third-party services — SMS OTP, KYC verification, Razorpay payment gateway",
    "Delivering premium UI/UX with smooth animations and optimizing app performance at scale",
    "Managing production deployments on AWS EC2 & S3 and driving code quality across the team",
    "Building and maintaining the Loanyfy CRM — an internal lead & loan management system",
    "Developing the company AI chatbot for real-time customer support on the platform",
  ],
  techUsed: ["React Native", "React.js", "Node.js", "Express.js", "MongoDB", "AWS S3", "AWS EC2", "JWT", "KYC API", "Razorpay", "Chart.js"],
  achievements: [
    "Reduced loan application processing time by 40% through optimized workflows",
    "Delivered mobile app used by 1000+ users within first 3 months",
    "Built full CRM system from scratch, now managing 500+ daily leads",
  ],
};

const freelance = {
  title: "Freelance App & Web Specialist",
  company: "Self-Employed",
  type: "Freelance",
  duration: "2023 – Present",
  durationLabel: "3+ yrs · Ongoing",
  gradient: "from-emerald-500/10 to-teal-500/10",
  border: "border-emerald-500/20",
  badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  dot: "bg-emerald-400",
  responsibilities: [
    "Delivered 16+ production projects: PLP Bazar, Dr Attendance, Masjid Finder, Ppokket Loan, KroEasy & more",
    "Built end-to-end mobile apps (React Native / Expo) and web platforms (MERN, Next.js) for diverse clients",
    "Handled complete project lifecycle — requirements, UI design, backend APIs, deployment & ongoing support",
    "Integrated Razorpay, WhatsApp API, Cloudinary, Firebase, and PDF rendering across multiple projects",
    "Served clients across India and the Middle East, scaling their digital presence with modern tech stacks",
    "Consistently delivered on-time with clean code, thorough documentation, and post-launch support",
  ],
  techUsed: ["React Native", "Expo", "Next.js", "MERN Stack", "Firebase", "Razorpay", "WhatsApp API", "Cloudinary", "Tailwind CSS", "Vercel"],
  projects: [
    { name: "PLP Bazar App", type: "Multi-vendor marketplace app" },
    { name: "Dr Attendance", type: "Healthcare attendance management" },
    { name: "Masjid Finder", type: "GPS-based masjid locator" },
    { name: "Ppokket Loan", type: "Personal loan fintech app" },
    { name: "Chand Kabadi Wala", type: "Scrap pickup app & website" },
    { name: "Kasim Energy", type: "Corporate energy website" },
    { name: "Balloon Dekor", type: "Party supplies e-commerce" },
    { name: "Alras Cars", type: "Car rental platform (live)" },
  ],
};

export default function ExperiencePage() {
  return (
    <>
      <SEOHead
        title="Work Experience | Senior Developer at Loanyfy — Mohammad Shoaib Khan"
        description="2 years full-time at Loanyfy (fintech) as Senior App & Full-Stack Developer. 3+ years freelance delivering 16+ production apps. React Native, MERN Stack expert."
        keywords="Mohammad Shoaib Khan experience, Loanyfy developer, React Native developer experience, freelance developer portfolio, full-stack developer career"
        canonicalPath="/experience"
        structuredData={expStructuredData}
      />

      <div className="min-h-screen bg-slate-950 text-white pt-24 pb-0">
        <div className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-6xl mx-auto px-6 py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10">
              <Link to="/" className="hover:text-slate-300">Home</Link>
              <span>/</span>
              <span className="text-slate-300">Experience</span>
            </nav>

            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Career</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full" />
              <p className="text-slate-400 max-w-2xl mx-auto">
                3+ years of professional development experience — building production fintech products full-time and delivering 16+ freelance projects.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {[
                { value: "3+", label: "Years Total Experience" },
                { value: "2 yrs", label: "Full-Time at Loanyfy" },
                { value: "16+", label: "Projects Delivered" },
                { value: "2", label: "Concurrent Roles" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Experience Cards */}
            <div className="space-y-8">
              {[loanyfy, freelance].map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`rounded-2xl bg-gradient-to-br ${exp.gradient} border ${exp.border} overflow-hidden`}
                >
                  {/* Card header */}
                  <div className="p-6 sm:p-8 border-b border-white/10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                          <BsBriefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold text-white">{exp.title}</h2>
                            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${exp.badgeColor}`}>{exp.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-indigo-400 font-medium text-lg">{exp.company}</p>
                            {exp.link && (
                              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <FiExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-slate-300 text-sm font-medium rounded-full border border-white/10">
                          <BsCalendar3 className="w-3.5 h-3.5" /> {exp.duration}
                        </span>
                        <p className="text-slate-500 text-xs mt-1.5 text-right">{exp.durationLabel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 sm:p-8 grid lg:grid-cols-2 gap-8">
                    {/* Responsibilities */}
                    <div>
                      <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Responsibilities</h3>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-3">
                            <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech & extras */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {exp.techUsed.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-300 text-xs font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {exp.achievements && (
                        <div>
                          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Key Achievements</h3>
                          <ul className="space-y-2">
                            {exp.achievements.map((a) => (
                              <li key={a} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-amber-400 mt-0.5">★</span> {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.projects && (
                        <div>
                          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Notable Projects</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {exp.projects.map((p) => (
                              <div key={p.name} className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white text-xs font-semibold">{p.name}</p>
                                <p className="text-slate-500 text-[10px] mt-0.5">{p.type}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="text-slate-400 mb-6">Interested in working together?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                  Hire Me
                </Link>
                <a href="/MohdShoaib_CV.pdf" download className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

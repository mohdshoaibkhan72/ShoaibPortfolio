import { yearsSince } from "../lib/utils";

const careerYears = yearsSince("2023-01");
const loanyfyYears = yearsSince("2024-01");

export const profile = {
  name: "Mohammad Shoaib Khan",
  shortName: "Shoaib Khan",
  role: "Senior Full-Stack & Mobile App Developer",
  email: "mohdshoaibkhan7211@gmail.com",
  phone: "+91 73102 49234",
  phoneHref: "tel:+917310249234",
  cv: "/Mohd%20Shoaib%20Khan.pdf",
  portrait: "/img/shoaib-portrait.webp",
  careerYears,
  loanyfyYears,
};

/** WhatsApp opens with a ready-made first message, so a client only has to press send. */
export const whatsapp = {
  number: "+91 73102 49234",
  href: `https://wa.me/917310249234?text=${encodeURIComponent(
    "Hi Shoaib! I saw your portfolio and I'd like to discuss a project."
  )}`,
};

/** Profile links, in the order they're shown. */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shoaibkhan72/" },
  { label: "Instagram", href: "https://www.instagram.com/shoaib.devs/" },
  { label: "GitHub", href: "https://github.com/mohdshoaibkhan72" },
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

/** Cut-out portrait used in the hero (the loading screen preloads it). */
export const heroPortrait = { src: "/img/shoaib-hero.webp", width: 822, height: 1217 };

export const heroStats = [
  { value: careerYears, suffix: "+", label: "Years building\nproduction software" },
  { value: 16, suffix: "+", label: "Apps & platforms\nshipped to production" },
  { value: 24, suffix: "h", label: "Typical reply time\non new enquiries" },
];

export const services = [
  {
    title: "Mobile apps",
    desc: "Cross-platform iOS & Android apps with React Native and Expo — smooth animations, native feel and store-ready builds.",
    tags: ["React Native", "Expo", "Redux", "Firebase"],
  },
  {
    title: "Full-stack web apps",
    desc: "End-to-end MERN products: React and Next.js frontends, Node.js APIs and MongoDB or MySQL databases.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    title: "E-commerce & marketplaces",
    desc: "Multi-vendor marketplaces, quick-commerce and luxury stores with secure checkout, coupons and admin dashboards.",
    tags: ["Razorpay", "Multi-vendor", "Admin panels"],
  },
  {
    title: "SaaS, CRM & fintech",
    desc: "Role-based dashboards, CRMs, ERPs and loan platforms — KYC flows, OTP auth and payment gateways done securely.",
    tags: ["KYC", "SMS OTP", "JWT", "RBAC"],
  },
  {
    title: "Cloud & deployment",
    desc: "Production deployments on AWS EC2/S3, Vercel, Render and Hostinger, with proper environments and CI/CD.",
    tags: ["AWS", "Vercel", "Render", "Docker"],
  },
];

export const workProcess = [
  { title: "Discover", desc: "We pin down the goal, the users and what “done” looks like before any code is written." },
  { title: "Design", desc: "Flows and screens are shaped early, so feedback is cheap and the build has a clear target." },
  { title: "Build", desc: "Clean, typed-where-it-matters code shipped in small increments you can test as we go." },
  { title: "Launch & support", desc: "Store submissions, deployments, monitoring — and support after launch, not a hand-off." },
];

export const toolbox = [
  { group: "Mobile", items: ["React Native", "Expo", "Moti", "Redux Toolkit", "Push notifications"] },
  { group: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"] },
  { group: "Backend & data", items: ["Node.js", "Express", "MongoDB", "MySQL", "Redis", "Firebase", "REST APIs", "JWT · OAuth · RBAC"] },
  { group: "Cloud & DevOps", items: ["AWS EC2", "AWS S3", "Vercel", "Render", "Hostinger", "Docker", "Git"] },
  { group: "Integrations", items: ["Razorpay", "KYC APIs", "SMS OTP", "WhatsApp API", "Cloudinary", "Google Maps", "Chart.js"] },
];

export const quickFacts = [
  { label: "Based in", value: "India · remote-friendly" },
  { label: "Experience", value: `${careerYears}+ years` },
  { label: "Current role", value: "Sr. Developer @ Loanyfy" },
  { label: "Focus", value: "React Native & MERN" },
  { label: "Education", value: "B.Tech CSE · 2024" },
  { label: "Clients", value: "India & Middle East" },
  { label: "Availability", value: "Open to freelance" },
  { label: "Reply time", value: "Within 24 hours" },
];

export const experience = [
  {
    id: "loanyfy",
    role: "Senior App & Full-Stack Developer",
    company: "Loanyfy",
    legalName: "Fly Digi Loanyfytech and Solution Pvt. Ltd.",
    href: "https://www.loanyfy.com",
    type: "Full-time",
    period: "Jan 2024 — Present",
    summary:
      "Leading mobile-first product development at a fintech lending platform — from the React Native app to the CRM and the APIs behind them.",
    responsibilities: [
      "Leading mobile-first fintech product development with React Native for Android & iOS",
      "Architecting high-security loan management modules, REST APIs and MERN stack backends",
      "Integrating PAN, CIBIL, payroll and KYC verification APIs for credit assessment, plus SMS OTP and Razorpay",
      "Building secure REST APIs with JWT auth and role-based access control across web and mobile",
      "Building and maintaining the Loanyfy CRM — an internal lead & loan management system",
      "Developing the company AI chatbot for real-time customer support on the platform",
      "Managing production deployments on AWS EC2 & S3 and driving code quality across the team",
    ],
    achievements: [
      { value: "40%", label: "faster loan application processing through optimised workflows" },
      { value: "1,000+", label: "users on the mobile app within its first 3 months" },
      { value: "500+", label: "daily leads managed in the CRM built from scratch" },
    ],
    stack: ["React Native", "React", "Node.js", "Express", "MongoDB", "MySQL", "AWS S3", "AWS EC2", "JWT", "RBAC", "PAN / CIBIL APIs", "Razorpay", "Chart.js"],
  },
  {
    id: "freelance",
    role: "Freelance App & Web Developer",
    company: "Independent",
    type: "Freelance",
    period: "2023 — Present",
    summary:
      "Designing, building and shipping apps and platforms for founders and businesses across India and the Middle East.",
    responsibilities: [
      "Delivered 16+ production projects — marketplaces, healthcare tools, community apps, SaaS products and e-commerce",
      "Built end-to-end mobile apps (React Native / Expo) and web platforms (MERN, Next.js) for diverse clients",
      "Owned the full lifecycle — requirements, UI, backend APIs, deployment and ongoing support",
      "Integrated Razorpay, WhatsApp API, Cloudinary, Firebase and PDF rendering across projects",
      "Consistently delivered on time with clean code, documentation and post-launch support",
    ],
    projects: [
      { name: "PLP Bazar", id: "plp-bazar-app" },
      { name: "KLIMB School ERP", id: "klimb-school-erp" },
      { name: "KLIMB HR CRM", id: "klimb-hr-crm" },
      { name: "Fugen Health Care", id: "dr-attendance" },
      { name: "Taleem-e-Ummat", id: "taleem-e-ummat" },
      { name: "KroEasy", id: "kroeasy" },
      { name: "Alras Cars", id: "alras-cars" },
      { name: "Madiha Perfume", id: "madiha-perfume" },
      { name: "Chand Kabadi Wala", id: "chand-kabadi-app" },
      { name: "Kasim Energy", id: "kasim-energy" },
      { name: "Ppokket Loan" },
      { name: "Balloon Dekor" },
    ],
    stack: ["React Native", "Expo", "Next.js", "MERN", "Firebase", "Razorpay", "WhatsApp API", "Cloudinary", "Tailwind CSS", "Vercel"],
  },
];

export const testimonials = [
  {
    quote:
      "Shoaib built our entire multi-vendor marketplace — both the React Native app and the web platform. The performance, UI and delivery were outstanding. Highly recommended.",
    name: "Founder & CEO",
    company: "PLP Bazar",
    initials: "PB",
    color: "#1fb86a",
  },
  {
    quote:
      "The scrap pickup app Shoaib built for us completely transformed our business. Clean UI, a smooth booking flow, and deployed perfectly on the Play Store. Excellent work!",
    name: "Founder",
    company: "Chand Kabadi Wala",
    initials: "CK",
    color: "#2fbf71",
  },
  {
    quote:
      "Our e-commerce website looks stunning and runs smoothly. Shoaib understood our brand vision perfectly and delivered a premium experience within the deadline.",
    name: "Owner",
    company: "Madiha Perfume",
    initials: "MP",
    color: "#c38a3a",
  },
];

export const faqs = [
  { q: "How quickly do you respond?", a: "Usually within 24 hours on business days — often much sooner." },
  {
    q: "Are you available for freelance work?",
    a: "Yes. I take on a small number of freelance projects alongside my full-time role at Loanyfy, so each one gets proper attention.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes — I've shipped projects for clients across India and the Middle East and I'm used to working remotely across time zones.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of the idea, who it's for and any deadline. I'll come back with questions, a rough plan and an estimate.",
  },
];

export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "United Institute of Technology",
    place: "Prayagraj, Uttar Pradesh",
    period: "2020 — 2024",
  },
];

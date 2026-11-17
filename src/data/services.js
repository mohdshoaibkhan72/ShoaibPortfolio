// Service landing pages — each one targets a search phrase people actually use
// ("React Native developer", "MERN stack developer"). Facts here come from site.js / projects.js;
// keep them true when editing.
import { faqs, profile } from "./site";
import { projectsData } from "./projects";

const names = (list) => {
  const n = list.map((p) => p.name);
  return n.length > 1 ? `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}` : n.join("");
};

const reactNativeProjects = projectsData.filter((p) => p.stack.includes("React Native"));
const webProjects = projectsData.filter((p) => p.category !== "app");
const faq = (q) => faqs.find((f) => f.q === q);

export const servicePages = [
  {
    slug: "react-native-app-development",
    label: "React Native app development",
    serviceType: "React Native app development",
    metaTitle: "React Native App Developer in India | Mohammad Shoaib Khan",
    metaDescription:
      "Hire a React Native developer in India for Android & iOS apps — one codebase, backend and admin panel included. Marketplace, fintech & healthcare apps shipped.",
    eyebrow: "(Services — Mobile apps)",
    heading: ["React Native", { em: "app developer" }],
    intro: "Android & iOS apps from one codebase — designed, built, launched and supported by one developer.",
    lead: `I'm ${profile.name}, a React Native developer in India. I build Android and iOS apps from a single codebase — and the APIs, admin panels and deployments behind them.`,
    body: [
      "At Loanyfy I lead mobile-first development of a fintech lending app in React Native — KYC, PAN and CIBIL checks, SMS OTP and Razorpay — which reached 1,000+ users in its first three months.",
      "As a freelance app developer I've shipped React Native apps for multi-vendor marketplaces, medical camps, Islamic education and quick-commerce, several of them live on Google Play.",
      "Every app ships with what it needs in production: secure sign-in, a Node.js backend, push notifications, an admin dashboard and store-ready builds.",
    ],
    offers: [
      { title: "Android & iOS, one codebase", desc: "React Native and Expo — one codebase that feels native on both platforms, so you build and maintain one app, not two." },
      { title: "Smooth, polished UI", desc: "Thoughtful screens, onboarding flows and spring animations with Moti — apps that feel fast and look finished." },
      { title: "Secure sign-in & roles", desc: "SMS OTP and social login, JWT sessions and role-based access for customers, vendors and admins." },
      { title: "Payments & integrations", desc: "Razorpay, KYC and credit-check APIs, Google Maps and GPS, push notifications and the WhatsApp API." },
      { title: "The backend, too", desc: "Node.js and Express APIs with MongoDB, MySQL or Firebase, plus a web admin panel to run the app." },
      { title: "Launch & support", desc: "Play Store and App Store submissions, release builds and support after launch — not a hand-off." },
    ],
    stack: ["React Native", "Expo", "Moti", "Redux Toolkit", "Firebase", "Push notifications", "Google Maps", "Razorpay", "Node.js", "MongoDB"],
    workHeading: ["Apps built with", { em: "React Native" }],
    projects: reactNativeProjects,
    projectsFilter: "app",
    faqs: [
      {
        q: "Do you build for both Android and iOS?",
        a: "Yes. React Native ships one codebase to both platforms, so you build and maintain one app instead of two — with store-ready builds for Google Play and the App Store.",
      },
      {
        q: "Can you build the backend and admin panel as well?",
        a: "Yes. Most of my apps come with a Node.js / Express API, a MongoDB, MySQL or Firebase database and a web admin dashboard — the whole product from one developer.",
      },
      {
        q: "Which React Native apps have you built?",
        a: `${names(reactNativeProjects)} — and, full-time, the Loanyfy fintech lending app.`,
      },
      faq("Are you available for freelance work?"),
      faq("What do you need from me to get started?"),
    ],
  },
  {
    slug: "mern-stack-development",
    label: "MERN stack development",
    serviceType: "MERN stack web development",
    metaTitle: "MERN Stack Developer in India | Mohammad Shoaib Khan",
    metaDescription:
      "Hire a MERN stack developer in India — MongoDB, Express, React & Node.js web apps, SaaS dashboards and e-commerce, from database schema to production deploy.",
    eyebrow: "(Services — Web apps)",
    heading: ["MERN stack", { em: "developer" }],
    intro: "Full-stack web apps with MongoDB, Express, React and Node.js — from the database schema to the production deploy.",
    lead: `I'm ${profile.name}, a MERN stack developer in India. I build full-stack web apps with MongoDB, Express, React and Node.js — and I stay with them from the first schema to the production deploy.`,
    body: [
      "At Loanyfy I architect the MERN backends and REST APIs behind a fintech platform, including an internal CRM that handles 500+ leads a day, secured with JWT and role-based access control.",
      "For clients I've built a car-rental platform, multi-vendor e-commerce, a luxury perfume store, corporate websites and SaaS products such as a school ERP and an HR CRM.",
      "When search traffic matters I use Next.js and server-side rendering; when the data is relational, MySQL. Either way the goal is the same: fast pages, clean APIs and a codebase your team can keep building on.",
    ],
    offers: [
      { title: "React & Next.js frontends", desc: "Fast, responsive interfaces in React or Next.js, with server-side rendering where SEO matters." },
      { title: "REST APIs in Node.js", desc: "Express APIs with JWT, OAuth and role-based access control, ready for both web and mobile clients." },
      { title: "Data that scales", desc: "MongoDB or MySQL schemas designed around the product, with Redis where speed counts." },
      { title: "Admin panels & dashboards", desc: "Role-based dashboards, CRMs and reports with Chart.js — the tools that run the business." },
      { title: "Payments & integrations", desc: "Razorpay, KYC APIs, SMS OTP, WhatsApp API, Cloudinary and Google Maps." },
      { title: "Deployment & DevOps", desc: "Production deployments on AWS EC2 & S3, Vercel, Render or Hostinger, with proper environments and CI/CD." },
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Next.js", "MySQL", "Redis", "Tailwind CSS", "JWT", "AWS"],
    workHeading: ["Web platforms", { em: "I've built" }],
    projects: webProjects,
    projectsFilter: "webapp",
    faqs: [
      {
        q: "What is the MERN stack?",
        a: "MongoDB, Express, React and Node.js — JavaScript from the database to the browser, which keeps products quick to build and easy to maintain.",
      },
      {
        q: "Do you also work with Next.js and MySQL?",
        a: "Yes — Next.js when SEO and server rendering matter (Madiha Perfume runs on Next.js 14), and MySQL when the data is relational (the PLP Bazar app's backend runs on MySQL).",
      },
      {
        q: "Which web platforms have you built?",
        a: `${names(webProjects)} — plus the CRM and APIs I build full-time at Loanyfy.`,
      },
      faq("Do you work with clients outside India?"),
      faq("What do you need from me to get started?"),
    ],
  },
];

export const getServicePage = (slug) => servicePages.find((s) => s.slug === slug);

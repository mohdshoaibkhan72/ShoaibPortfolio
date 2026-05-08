//src/components/AlternatingProjectsPinned.jsx
import AlternatingProjectsPinned from "./ProjectsSection";

const items = [
  // --- E-COMMERCE ---
  {
    id: "madiha-perfume",
    live: "#",
    codePanel: {
      title: "Madiha Perfume — Details",
      subtitle: "live • e-commerce • luxury",
      badge: "Next.js • Tailwind",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">store</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">brand</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Madiha Perfume'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3" className="pl-2">
          <span className="text-slate-400">tech</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-slate-200">"Next.js 14 • Tailwind CSS"</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="4" className="pl-2">
          <span className="text-slate-400">highlights</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-cyan-300">[</span>
          <span className="text-slate-200">"SSR", "SEO Optimized", "Responsive"</span>
          <span className="text-cyan-300">]</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="5">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["Next.js", "React", "Tailwind", "Production-Ready", "E-commerce"],
    },
    shotsPanel: {
      badge: "Web UI",
      subtitle: "desktop interface",
      title: "Madiha Perfume UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000", caption: "Elegant Product Listing" },
        { src: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=1000", caption: "Luxury Brand Experience" },
      ],
    },
  },
  {
    id: "plp-bazar",
    live: "#",
    codePanel: {
      title: "PLP Bazar — Details",
      subtitle: "live • e-commerce • marketplace",
      badge: "MERN • Scalable",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">marketplace</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">name</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'PLP Bazar'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3" className="pl-2">
          <span className="text-slate-400">stack</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-slate-200">"MERN Stack Architecture"</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="4" className="pl-2">
          <span className="text-slate-400">modules</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-cyan-300">[</span>
          <span className="text-slate-200">"Admin", "Vendor", "Customer"</span>
          <span className="text-cyan-300">]</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="5">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Redux", "Marketplace"],
    },
    shotsPanel: {
      badge: "Platform UI",
      subtitle: "full-stack",
      title: "PLP Bazar UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000", caption: "Marketplace Overview" },
        { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000", caption: "Vendor Management" },
      ],
    },
  },
  {
    id: "balloon-dekor",
    live: "https://balloon-dekor-client.vercel.app/",
    codePanel: {
      title: "Balloon Dekor — Details",
      subtitle: "live • e-commerce • colorful",
      badge: "MERN • Hostinger+Render",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">project</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">name</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Balloon Dekor'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3" className="pl-2">
          <span className="text-slate-400">domain</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-slate-200">"Party balloons • Event decor"</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="4">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "Cloudinary"],
    },
    shotsPanel: {
      badge: "Screens",
      subtitle: "images only",
      title: "Balloon Dekor UI",
      shots: [
        { src: "/balone.png", caption: "Home — events & featured decor" },
        { src: "/balone2.png", caption: "All Product — bundles & add‑ons" },
        { src: "/balone3.png", caption: "Admin — orders & inventory" },
      ],
    },
  },
  {
    id: "alras-cars",
    live: "https://alrascars.com/",
    codePanel: {
      title: "Alras Cars — Vehicle Rental",
      subtitle: "live • e-commerce • rental",
      badge: "MERN • Vercel",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">alras</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">service</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Car Rentals'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Vercel"],
    },
    shotsPanel: {
      badge: "Rental UI",
      subtitle: "fleet management",
      title: "Alras Cars UI",
      shots: [
        { src: "Alras/alras-home.png", caption: "Home — Car listings" },
        { src: "Alras/alras-booking.png", caption: "Booking form" },
      ],
    },
  },

  // --- MOBILE APPS ---
  {
    id: "chand-kabadi-wala",
    live: "#",
    codePanel: {
      title: "Chand Kabadi Wala — Details",
      subtitle: "live • mobile app • recycling",
      badge: "React Native • Expo",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">app</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">name</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Chand Kabadi Wala'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React Native", "Expo", "Moti", "Lucide", "Animations"],
    },
    shotsPanel: {
      badge: "App UI",
      subtitle: "mobile interface",
      title: "Chand Kabadi UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000", caption: "Premium Onboarding Screen" },
        { src: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1000", caption: "Service Selection Interface" },
      ],
    },
  },
  {
    id: "kroeasy",
    live: "#",
    codePanel: {
      title: "KroEasy — Details",
      subtitle: "live • mobile app • services",
      badge: "React Native • Razorpay",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">platform</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">service</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'KroEasy'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React Native", "Node.js", "Razorpay", "Batch Booking"],
    },
    shotsPanel: {
      badge: "Service UI",
      subtitle: "worker app",
      title: "KroEasy UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1000", caption: "Worker Dashboard" },
        { src: "https://images.unsplash.com/photo-1556742049-04ff43610046?q=80&w=1000", caption: "Payment QR Flow" },
      ],
    },
  },
  {
    id: "masjid-app",
    live: "#",
    codePanel: {
      title: "Masjid App — Details",
      subtitle: "live • mobile app • community",
      badge: "React Native • PDF",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">app</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">purpose</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Masjid Community'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React Native", "Expo", "PDF-Lib", "Firebase"],
    },
    shotsPanel: {
      badge: "Community UI",
      subtitle: "utility app",
      title: "Masjid UI",
      shots: [
        { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000", caption: "Quran Reading View" },
        { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000", caption: "Prayer Timings" },
      ],
    },
  },

  // --- FINTECH & BUSINESS ---
  {
    id: "loanyfy",
    live: "https://www.loanyfy.com/",
    codePanel: {
      title: "Loanyfy — Details",
      subtitle: "live • fintech • business",
      badge: "MERN • Production",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">project</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">domain</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Fintech'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "S3", "Fintech"],
    },
    shotsPanel: {
      badge: "Fintech UI",
      subtitle: "loan platform",
      title: "Loanyfy UI",
      shots: [
        { src: "/loanyfy.png", caption: "Home — Landing" },
        { src: "/loanyfprodcut.png", caption: "Loans — Product list" },
        { src: "/Loanyfychatbot.png", caption: "Support — Chatbot" },
      ],
    },
  },
  {
    id: "nokryfy",
    live: "https://nokryfyclients2.vercel.app/",
    codePanel: {
      title: "Nokryfy.com — Job Portal",
      subtitle: "live • business • recruitment",
      badge: "MERN • Client",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">jobPortal</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">name</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Nokryfy'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Recruitment"],
    },
    shotsPanel: {
      badge: "Recruitment UI",
      subtitle: "job board",
      title: "Nokryfy UI",
      shots: [
        { src: "nokryfy/home.png", caption: "Home — Job search" },
        { src: "nokryfy/image.png", caption: "Employer Dashboard" },
      ],
    },
  },
  {
    id: "marble-tiles",
    live: "https://theluxurytiles.com/",
    codePanel: {
      title: "Marble & Tiles Co.",
      subtitle: "live • b2b • catalog",
      badge: "MERN • WhatsApp",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">catalog</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">industry</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'B2B Construction'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "WhatsApp API"],
    },
    shotsPanel: {
      badge: "B2B UI",
      subtitle: "product gallery",
      title: "Tiles Gallery UI",
      shots: [
        { src: "theluxary/home.png", caption: "Home — Product showcase" },
        { src: "theluxary/image.png", caption: "Catalog — Browse tiles" },
      ],
    },
  },
  {
    id: "loanyfy-crm",
    live: "",
    codePanel: {
      title: "Loanyfy CRM",
      subtitle: "internal • business tool",
      badge: "MERN • Internal",
      lines: [
        <span key="1">
          <span className="text-fuchsia-400">const</span>{" "}
          <span className="text-emerald-300">crm</span>{" "}
          <span className="text-slate-300">=</span>{" "}
          <span className="text-cyan-300">{"{"}</span>
        </span>,
        <span key="2" className="pl-2">
          <span className="text-slate-400">type</span>
          <span className="text-slate-300">:</span>{" "}
          <span className="text-amber-300">'Lead Management'</span>
          <span className="text-cyan-300">,</span>
        </span>,
        <span key="3">
          <span className="text-cyan-300">{"}"}</span>
          <span className="text-slate-300">;</span>
        </span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "Analytics"],
    },
    shotsPanel: {
      badge: "CRM UI",
      subtitle: "admin panel",
      title: "CRM Dashboard UI",
      shots: [
        { src: "loanyfy/dashbored.png", caption: "Dashboard Overview" },
        { src: "loanyfy/leadsdetails.png", caption: "Lead Pipeline" },
      ],
    },
  },
];

export default function ProjectsPage() {
  return <AlternatingProjectsPinned items={items} />;
}

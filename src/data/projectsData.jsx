// Centralized project data — imported by Projects page, Detail page, and Home featured section

export const projectsData = [
  // ─── MOBILE APPS ─────────────────────────────────────────────────────────────
  {
    id: "plp-bazar-app",
    category: "app",
    title: "PLP Bazar — Mobile App",
    tagline: "Multi-Vendor Marketplace App for Android & iOS",
    description:
      "PLP Bazar is a full-featured multi-vendor marketplace mobile application built with React Native and a MERN stack backend. It supports three user roles — Customer, Vendor, and Admin — each with a dedicated dashboard. Customers can browse categories, add to cart, track orders in real-time, and pay via Razorpay. Vendors manage products, inventory, and orders from a clean dashboard. Admins get analytics and platform controls.",
    features: [
      "Multi-role system: Customer, Vendor, Admin",
      "Real-time order tracking & push notifications",
      "Razorpay payment gateway integration",
      "Product search, filters & category browse",
      "Vendor inventory & order management",
      "Redux-powered state management",
    ],
    live: "https://play.google.com/store/apps/details?id=com.plpbazar.app&hl=en_IN",
    logo: "/plpbazar/logo.jpeg",
    storeBadge: "/plpbazar/plastoress.jpeg",
    featured: true,
    codePanel: {
      title: "PLP Bazar — Mobile App",
      subtitle: "mobile app • multi-vendor • marketplace",
      badge: "React Native • MERN",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">plpBazarApp</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">type</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Multi-Vendor Marketplace App'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">platform</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React Native • Expo • Node.js • MySQL"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">modules</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Customer", "Vendor", "Admin Panel"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">infra</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Razorpay • Redux • Hostinger"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Node.js", "MySQL", "Razorpay", "Redux", "Expo", "Hostinger"],
    },
    shotsPanel: {
      badge: "Mobile App",
      subtitle: "multi-vendor marketplace",
      title: "PLP Bazar App",
      shots: [
        { src: "/plpbazar/homepage.jpeg",       caption: "Home — Category Browse" },
        { src: "/plpbazar/resturent.jpeg",       caption: "Restaurant & Vendor Section" },
        { src: "/plpbazar/palystore1.png",       caption: "App Interface" },
        { src: "/plpbazar/playstore 1.png",      caption: "Play Store — Screen 1" },
        { src: "/plpbazar/playstore 2.png",      caption: "Play Store — Screen 2" },
        { src: "/plpbazar/playstore 3.png",      caption: "Play Store — Screen 3" },
      ],
    },
  },

  {
    id: "shopit",
    category: "app",
    title: "Shopit — Shopping App",
    tagline: "Full-Featured React Native Shopping Application",
    description:
      "Shopit is a polished e-commerce shopping app built with React Native. It offers a seamless browsing and purchasing experience with product search, wishlist, cart management, and secure checkout. The backend is built with Express and MongoDB, with JWT authentication and optional OTP/social login.",
    features: [
      "Product listing, search & smart filters",
      "Wishlist & persistent cart",
      "JWT + OTP + Social login authentication",
      "Order history & real-time status",
      "Admin product & order management",
      "Smooth Framer Motion animations",
    ],
    live: "https://play.google.com/store/apps/details?id=com.shopitonline.app",
    logo: "/Shopit/latesicons.png",
    storeBadge: "/Shopit/palstoer3.webp",
    featured: false,
    codePanel: {
      title: "Shopit — Shopping App",
      subtitle: "mobile app • e-commerce • react native",
      badge: "React Native • MERN",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">shopit</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">concept</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Full-featured Shopping App'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React Native • Express • MongoDB"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Cart", "Wishlist", "Product Search", "Orders"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">auth</span><span className="text-slate-300">:</span> <span className="text-slate-200">"JWT • Social Login • OTP"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Node.js", "Express", "MongoDB", "JWT", "Expo"],
    },
    shotsPanel: {
      badge: "Mobile App",
      subtitle: "e-commerce shopping",
      title: "Shopit",
      shots: [
        { src: "/Shopit/home1.webp",      caption: "Home — Browse Products" },
        { src: "/Shopit/3.webp",           caption: "App Screen" },
        { src: "/Shopit/palystore2.webp",  caption: "Play Store — Featured" },
        { src: "/Shopit/palstoer3.webp",   caption: "Play Store — Banner" },
      ],
    },
  },

  {
    id: "chand-kabadi-app",
    category: "app",
    title: "Chand Kabadi Wala — App",
    tagline: "Doorstep Scrap & Recycling Pickup Mobile App",
    description:
      "Chand Kabadi Wala is a premium mobile app for doorstep scrap collection and recycling. Users can book pickups, calculate estimated weight/value, and track their collector in real-time. The app features spring animations built with Moti, smooth onboarding, and a clean themed UI using Lucide icons.",
    features: [
      "Pickup booking with date & time selection",
      "Weight calculator & price estimator",
      "Real-time collector tracking",
      "Spring & fade animations with Moti",
      "Smooth onboarding flow",
      "Order history & earnings summary",
    ],
    live: "https://play.google.com/store/apps/details?id=com.chandkabadiwala.main",
    logo: "/chandkabadiwala/icon.png",
    featured: false,
    codePanel: {
      title: "Chand Kabadi Wala — App",
      subtitle: "mobile app • recycling • doorstep pickup",
      badge: "React Native • Expo",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">chandKabadi</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">concept</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Doorstep Scrap & Recycling Pickup'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">platform</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React Native • Expo • Moti"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Pickup Booking", "Weight Calc", "Live Tracking"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">animations</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Spring • Fade • Slide transitions"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Expo", "Moti", "Node.js", "MongoDB", "Lucide"],
    },
    shotsPanel: {
      badge: "Mobile App",
      subtitle: "scrap & recycling",
      title: "Chand Kabadi Wala",
      shots: [
        { src: "/chandkabadiwala/chand1.jpeg", caption: "Home Screen" },
        { src: "/chandkabadiwala/chand2.jpeg", caption: "Pickup Booking" },
        { src: "/chandkabadiwala/chand3.jpeg", caption: "Weight Calculator" },
        { src: "/chandkabadiwala/chand4.jpeg", caption: "Order Tracking" },
        { src: "/chandkabadiwala/chand5.jpeg", caption: "Order History" },
      ],
    },
  },

  {
    id: "dr-attendance",
    category: "app",
    title: "Fugen Health Care",
    tagline: "Digital Health Card & Doctor Consultation Tracking App",
    description:
      "Fugen Health Care is a mobile app deployed at medical camps, colleges, and healthcare events. On registration, each patient or student gets a unique digital health card that they carry and present at every visit. Doctors log consultations and mark attendance per visit, building a complete medical history for each user. Admins can see which doctor attended which patient, at which camp or hospital, and on what date — giving full visibility across all roles.",
    features: [
      "Digital health card generated per patient / student",
      "Used at medical camps, colleges & health events",
      "Doctor marks consultation & attendance per visit",
      "Full visit history — doctor, date & location",
      "Admin dashboard with cross-role visibility",
      "Patient can show card to any doctor or staff",
    ],
    live: "#",
    logo: "/fugen healthcare/FuGenEd Logo.jpeg",
    featured: true,
    codePanel: {
      title: "Fugen Health Care",
      subtitle: "mobile app • healthcare • digital health card",
      badge: "React Native • Firebase",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">fugenHealthCare</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Digital Health Card System'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React Native • Firebase • Expo"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">roles</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Admin", "Doctor", "Patient / Student"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">use</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Camps • Colleges • Hospitals"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Firebase", "Expo", "Healthcare", "Role-Based"],
    },
    shotsPanel: {
      badge: "Mobile App",
      subtitle: "digital health card system",
      title: "Fugen Health Care",
      shots: [
        { src: "/fugen healthcare/home.png",           caption: "Home Dashboard" },
        { src: "/fugen healthcare/dr login.png",        caption: "Doctor Login" },
        { src: "/fugen healthcare/patient login .png",  caption: "Patient Login" },
        { src: "/fugen healthcare/prfile.png",          caption: "Patient Profile & Health Card" },
      ],
    },
  },

  {
    id: "masjid-finder",
    category: "app",
    title: "Masjid Finder — Locator App",
    tagline: "GPS-Based Nearest Masjid Finder with Prayer Times",
    description:
      "Masjid Finder is a community mobile app that uses GPS to find the nearest masjids, show their prayer times, facilities, and directions. Built with React Native and the Google Maps API, it allows users to review and rate masjids, filter by facilities (parking, wudu area, etc.), and get accurate prayer times based on location.",
    features: [
      "GPS-powered nearest masjid detection",
      "Google Maps integration with directions",
      "Location-based accurate prayer times",
      "Masjid profiles with facilities info",
      "User reviews and ratings",
      "Offline prayer times caching",
    ],
    live: "#",
    logo: "/masjidfinder/icon.jpg",
    featured: true,
    codePanel: {
      title: "Masjid Finder — Locator App",
      subtitle: "mobile app • islamic • maps",
      badge: "React Native • Maps API",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">masjidFinder</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">concept</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Nearest Masjid Locator'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React Native • Google Maps API • Expo"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"GPS Location", "Nearby Masjids", "Prayer Times"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">extra</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Directions • Reviews • Facilities Info"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React Native", "Google Maps", "Expo", "GPS", "Prayer Times API"],
    },
    shotsPanel: {
      badge: "Mobile App",
      subtitle: "masjid locator",
      title: "Masjid Finder",
      shots: [
        { src: "/masjidfinder/masjid1.jpeg", caption: "Home — Nearby Masjids" },
        { src: "/masjidfinder/masjid2.jpeg", caption: "Map View & Directions" },
        { src: "/masjidfinder/masjid3.jpeg", caption: "Prayer Times" },
        { src: "/masjidfinder/masjid4.jpeg", caption: "Masjid Details & Facilities" },
      ],
    },
  },

  // ─── E-COMMERCE ──────────────────────────────────────────────────────────────

  {
    id: "plp-bazar-web",
    category: "webapp",
    title: "PLP Bazar — E-Commerce Website",
    tagline: "Scalable Multi-Vendor MERN E-Commerce Platform",
    description:
      "PLP Bazar Web is the web version of the PLP Bazar marketplace. Built on the MERN stack, it supports multiple vendors, comprehensive admin controls, and a smooth customer shopping experience. Features include Razorpay checkout, COD, dynamic coupons, and a full analytics dashboard for admins.",
    features: [
      "Multi-vendor product management",
      "Razorpay + COD + Wallet payments",
      "Dynamic coupon & discount system",
      "Real-time order management",
      "Admin analytics & revenue dashboard",
      "SEO-optimized product pages",
    ],
    live: "https://plpbazar.com/",
    featured: true,
    codePanel: {
      title: "PLP Bazar — Website",
      subtitle: "e-commerce • marketplace • web",
      badge: "MERN • Full-Stack",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">plpBazarWeb</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">type</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Multi-Vendor E-Commerce Website'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React • Node.js • Express • MongoDB"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">modules</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Admin", "Vendor", "Customer", "Analytics"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">payment</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Razorpay • COD • Wallet"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "MongoDB", "Razorpay", "Redux", "Tailwind"],
    },
    shotsPanel: {
      badge: "Web",
      subtitle: "e-commerce marketplace",
      title: "PLP Bazar Web",
      shots: [
        { src: "/plpbazar/web1.png",       caption: "PLP Bazar — Website" },
        { src: "/plpbazar/homepage.jpeg",  caption: "Homepage — Product Categories" },
        { src: "/plpbazar/resturent.jpeg", caption: "Restaurant & Vendor Section" },
      ],
    },
  },

  {
    id: "madiha-perfume",
    category: "webapp",
    title: "Madiha Perfume — Luxury Store",
    tagline: "Next.js Luxury Fragrance E-Commerce with SSR & SEO",
    description:
      "Madiha Perfume is a high-end fragrance e-commerce store built with Next.js 14 and Tailwind CSS. It leverages server-side rendering for blazing-fast load times and top-tier SEO. Features include an elegant product catalog, advanced filtering, secure checkout, and a premium brand aesthetic.",
    features: [
      "Next.js 14 SSR for fast load & SEO",
      "Luxury product catalog with zoom gallery",
      "Advanced category & price filters",
      "Secure checkout & order management",
      "Mobile-first responsive design",
      "Cloudinary for optimized image delivery",
    ],
    live: "https://madihaperfume.com/",
    featured: false,
    codePanel: {
      title: "Madiha Perfume — Store",
      subtitle: "e-commerce • luxury • next.js",
      badge: "Next.js • Tailwind",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">madiha</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">brand</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Luxury Fragrance E-Commerce'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">tech</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Next.js 14 • Tailwind CSS • Node.js"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">highlights</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"SSR", "SEO Optimized", "Responsive", "Fast"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["Next.js", "React", "Tailwind", "Node.js", "SSR", "SEO"],
    },
    shotsPanel: {
      badge: "E-Commerce",
      subtitle: "luxury perfume store",
      title: "Madiha Perfume",
      shots: [
        { src: "/madihaperfume.png", caption: "Madiha Perfume — Website" },
      ],
    },
  },

  {
    id: "party-puffers",
    category: "webapp",
    title: "Party Puffers",
    tagline: "Party Supplies & Event Decoration Website",
    description:
      "Party Puffers is a vibrant party supplies and event decoration website. Customers can browse and shop a wide range of party products, decorations, and bundles for every occasion. The site is fully live at partypuffers.com with a clean, colourful UI built for a smooth shopping experience.",
    features: [
      "Full product catalog for party supplies",
      "Event decoration bundles & add-ons",
      "Shopping cart & checkout flow",
      "Order tracking & management",
      "Mobile-first responsive design",
      "Admin product & inventory control",
    ],
    live: "https://www.partypuffers.com/",
    featured: false,
    codePanel: {
      title: "Party Puffers",
      subtitle: "website • party supplies • event decor",
      badge: "React • Node.js",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">partyPuffers</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Party Supplies & Event Decoration'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React • Node.js • MongoDB"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Cart", "Bundles", "Admin Panel", "Live"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">url</span><span className="text-slate-300">:</span> <span className="text-slate-200">"partypuffers.com"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "MongoDB", "Tailwind", "E-Commerce"],
    },
    shotsPanel: {
      badge: "Website",
      subtitle: "party & event shop",
      title: "Party Puffers",
      shots: [
        { src: "/partypuffer.png", caption: "Party Puffers — Website" },
      ],
    },
  },

  // ─── WEBSITES ────────────────────────────────────────────────────────────────

  {
    id: "kasim-energy",
    category: "website",
    title: "Kasim Energy — Corporate Site",
    tagline: "Premium Energy Services Corporate Website with SEO",
    description:
      "Kasim Energy is a corporate website for an energy services company. It showcases the company's services with a premium animated UI, a contact/inquiry form, and strong SEO implementation. Built with React and Tailwind CSS, it is fully mobile-first and optimized for page speed.",
    features: [
      "Premium animated homepage with GSAP",
      "Services showcase with detail pages",
      "Inquiry/contact form with email integration",
      "Mobile-first fully responsive",
      "Core Web Vitals optimized",
      "Google Analytics integration",
    ],
    live: "https://www.kasimenergy.com/",
    featured: false,
    codePanel: {
      title: "Kasim Energy — Business Site",
      subtitle: "website • energy • corporate",
      badge: "MERN • Corporate",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">kasimEnergy</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">industry</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Energy Services — Corporate Website'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React • Tailwind • Node.js"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Services Showcase", "Contact Form", "SEO Optimized"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">design</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Premium UI • GSAP Animations • Mobile-First"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Tailwind", "Node.js", "GSAP", "SEO", "Responsive"],
    },
    shotsPanel: {
      badge: "Live Website",
      subtitle: "energy corporate site",
      title: "Kasim Energy",
      shots: [
        { src: "/kasimenergy.png", caption: "Kasim Energy — Website" },
      ],
    },
  },

  {
    id: "chand-kabadi-web",
    category: "website",
    title: "Chand Kabadi Wala — Website",
    tagline: "Scrap & Recycling Business Website with Booking",
    description:
      "The Chand Kabadi Wala website is the web presence for the scrap recycling business. It lists services, allows users to book pickups via a contact form, and integrates WhatsApp CTA for instant inquiries. Built with React and Tailwind, it is fast, SEO-friendly, and mobile-optimized.",
    features: [
      "Service listing with category pages",
      "Pickup booking form",
      "WhatsApp CTA integration",
      "SEO-optimized content",
      "Mobile-first design",
      "Fast page load (under 2s)",
    ],
    live: "https://chandkabadiwala.com/",
    featured: false,
    codePanel: {
      title: "Chand Kabadi — Website",
      subtitle: "website • recycling • business",
      badge: "MERN • Responsive",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">chandKabadiWeb</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">concept</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Scrap & Recycling Business Website'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-slate-200">"React • Node.js • MongoDB"</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Service Listing", "Booking Form", "WhatsApp CTA"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Tailwind", "Node.js", "MongoDB", "WhatsApp API"],
    },
    shotsPanel: {
      badge: "Website",
      subtitle: "recycling business",
      title: "Chand Kabadi Web",
      shots: [
        { src: "/chandkabadiwala/web.png", caption: "Chand Kabadi Wala — Website" },
      ],
    },
  },

  {
    id: "alras-cars",
    category: "webapp",
    title: "Alras Cars — Rental Platform",
    tagline: "Vehicle Rental & Car Booking Website (Live)",
    description:
      "Alras Cars is a live vehicle rental platform serving the UAE market. Customers can browse the fleet, filter by type, and complete bookings online. The admin panel allows full fleet management, booking approval, and customer history. Hosted on Vercel + Render.",
    features: [
      "Car catalog with search & type filters",
      "Online booking with date selection",
      "Fleet management admin panel",
      "Customer profile & booking history",
      "Email notification on booking confirmation",
      "JWT authentication",
    ],
    live: "https://alrascars.com/",
    featured: true,
    codePanel: {
      title: "Alras Cars — Rental Platform",
      subtitle: "website • vehicle rental • mern",
      badge: "MERN • Vercel",
      lines: [
        <span key="1"><span className="text-fuchsia-400">const</span> <span className="text-emerald-300">alrasCars</span> <span className="text-slate-300">=</span> <span className="text-cyan-300">{"{"}</span></span>,
        <span key="2" className="pl-4"><span className="text-slate-400">domain</span><span className="text-slate-300">:</span> <span className="text-amber-300">'Vehicle Rental & Car Bookings'</span><span className="text-cyan-300">,</span></span>,
        <span key="3" className="pl-4"><span className="text-slate-400">stack</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-amber-300">"React", "Node.js", "Express", "MongoDB"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="4" className="pl-4"><span className="text-slate-400">features</span><span className="text-slate-300">:</span> <span className="text-cyan-300">[</span><span className="text-slate-200">"Car Catalog", "Booking System", "Fleet Admin"</span><span className="text-cyan-300">]</span><span className="text-cyan-300">,</span></span>,
        <span key="5" className="pl-4"><span className="text-slate-400">hosting</span><span className="text-slate-300">:</span> <span className="text-slate-200">"Vercel • Render"</span><span className="text-cyan-300">,</span></span>,
        <span key="6"><span className="text-cyan-300">{"}"}</span><span className="text-slate-300">;</span></span>,
      ],
      chips: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel"],
    },
    shotsPanel: {
      badge: "Live Website",
      subtitle: "car rental platform",
      title: "Alras Cars",
      shots: [
        { src: "Alras/alras-home.png", caption: "Home — Car Listings" },
        { src: "Alras/alras-booking.png", caption: "Booking Form" },
      ],
    },
  },

];

export const featuredProjects = projectsData.filter((p) => p.featured);

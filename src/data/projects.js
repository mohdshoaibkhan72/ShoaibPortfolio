// All projects — used by the home page, the Work page and each case-study page.
//
// cover:   how the card visual is drawn
//          { type: "image", src, bg: [top, bottom] }  a ready-made mockup (bg = its edge colours)
//          { type: "phones", images: [...] }           1–3 screenshots in phone frames
//          { type: "browser", images: [...] }          1–2 screenshots in browser windows
// gallery: kind is "phone" | "desktop" | "poster" | "mockup"
// featured: position on the home page (0 = not featured)

const playStore = (id) => `https://play.google.com/store/apps/details?id=${id}`;

export const CATEGORIES = {
  app: { label: "Mobile app", plural: "Mobile apps", platform: "Android & iOS" },
  saas: { label: "SaaS product", plural: "SaaS", platform: "Web · Cloud" },
  webapp: { label: "Web app", plural: "Web apps", platform: "Web" },
  website: { label: "Website", plural: "Websites", platform: "Web" },
};

export const projectsData = [
  {
    id: "plp-bazar-app",
    category: "app",
    name: "PLP Bazar",
    title: "PLP Bazar — Mobile App",
    tagline: "Multi-vendor grocery & food delivery marketplace for Android & iOS",
    description:
      "PLP Bazar is a full-featured multi-vendor marketplace app built with React Native and a MERN backend. It supports three roles — Customer, Vendor and Admin — each with a dedicated dashboard. Customers browse categories, add to cart, track orders in real time and pay via Razorpay. Vendors manage products, inventory and orders from a clean dashboard, while admins get analytics and platform controls.",
    features: [
      "Multi-role system: Customer, Vendor, Admin",
      "Real-time order tracking & push notifications",
      "Razorpay payment gateway integration",
      "Product search, filters & category browse",
      "Vendor inventory & order management",
      "Redux-powered state management",
    ],
    stack: ["React Native", "Node.js", "MySQL", "Razorpay", "Redux", "Expo", "Hostinger"],
    links: [
      { label: "Google Play", href: playStore("com.plpbazar.app") },
      { label: "plpbazar.com", href: "https://plpbazar.com/" },
    ],
    color: "#1fb86a",
    featured: 1,
    cover: { type: "image", src: "/img/klimb/plp-bazar.webp", bg: ["#edf7f1", "#e2f4e9"] },
    gallery: [
      { src: "/img/plp-bazar/app-home.webp", caption: "Home — category browse", kind: "phone" },
      { src: "/img/plp-bazar/app-food.webp", caption: "Restaurants & food ordering", kind: "phone" },
      { src: "/img/plp-bazar/promo-1.webp", caption: "Play Store listing", kind: "poster" },
      { src: "/img/plp-bazar/promo-2.webp", caption: "Grocery delivery", kind: "poster" },
      { src: "/img/plp-bazar/promo-3.webp", caption: "Food from local restaurants", kind: "poster" },
      { src: "/img/plp-bazar/promo-4.webp", caption: "30-minute delivery", kind: "poster" },
    ],
    spec: {
      name: "plpBazarApp",
      fields: {
        type: "Multi-Vendor Marketplace App",
        platform: "React Native • Expo • Node.js • MySQL",
        modules: ["Customer", "Vendor", "Admin Panel"],
        infra: "Razorpay • Redux • Hostinger",
      },
    },
  },

  {
    id: "klimb-school-erp",
    category: "saas",
    name: "KLIMB School ERP",
    title: "KLIMB School ERP — School Management Software",
    tagline: "Cloud school management software — run the whole school from one place",
    description:
      "KLIMB School ERP is a school management SaaS built at KLIMB. Admissions, attendance, fees, exams, payroll, library, transport and parent communication live in one secure cloud app, with a personalised dashboard for every role. Schools can explore a live demo and start on a 14-day free trial.",
    features: [
      "Admissions, student records & ID cards",
      "Fees, expenses & staff payroll",
      "Attendance, timetable, homework & exams",
      "Library, transport & parent notices",
      "A personalised dashboard for every role",
      "Secure cloud app with a live demo",
    ],
    stack: [],
    tags: ["SaaS", "Role-based dashboards", "Cloud"],
    stats: [
      { value: "20+", label: "Modules" },
      { value: "16", label: "Ready roles" },
      { value: "14-day", label: "Free trial" },
    ],
    studio: "KLIMB",
    links: [{ label: "Live demo", href: "https://school.klimb.agency/" }],
    color: "#6d4cff",
    featured: 2,
    cover: { type: "image", src: "/img/klimb/school-erp.webp", bg: ["#f0edff", "#e8e2fb"], ratio: 4 / 3 },
    gallery: [{ src: "/img/klimb/school-erp.webp", caption: "Product site & dashboard", kind: "mockup" }],
    spec: {
      name: "klimbSchoolErp",
      fields: {
        product: "School Management SaaS",
        modules: ["Admissions", "Attendance", "Fees", "Exams", "Payroll", "Library", "Transport"],
        roles: "16 ready-made roles",
        trial: "14-day free trial",
      },
    },
  },

  {
    id: "alras-cars",
    category: "webapp",
    name: "Alras Cars",
    title: "Alras Cars — Rental Platform",
    tagline: "Vehicle rental & car booking platform for the UAE",
    description:
      "Alras Cars is a live vehicle rental platform serving the UAE market. Customers browse the fleet, filter by type and complete bookings online. The admin panel handles fleet management, booking approvals and customer history. Hosted on Vercel and Render.",
    features: [
      "Car catalogue with search & type filters",
      "Online booking with date selection",
      "Fleet management admin panel",
      "Customer profile & booking history",
      "Email notification on booking confirmation",
      "JWT authentication",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel"],
    links: [{ label: "alrascars.com", href: "https://alrascars.com/" }],
    color: "#e0a800",
    featured: 3,
    cover: { type: "browser", images: ["/img/alras/home.webp", "/img/alras/admin-1.webp"], url: "alrascars.com" },
    gallery: [
      { src: "/img/alras/home.webp", caption: "Home — booking search", kind: "desktop" },
      { src: "/img/alras/fleet.webp", caption: "Fleet listing", kind: "desktop" },
      { src: "/img/alras/booking.webp", caption: "Car details & booking", kind: "desktop" },
      { src: "/img/alras/admin-1.webp", caption: "Admin — bookings dashboard", kind: "desktop" },
      { src: "/img/alras/admin-2.webp", caption: "Admin — fleet management", kind: "desktop" },
    ],
    spec: {
      name: "alrasCars",
      fields: {
        domain: "Vehicle Rental & Car Bookings",
        stack: ["React", "Node.js", "Express", "MongoDB"],
        features: ["Car Catalog", "Booking System", "Fleet Admin"],
        hosting: "Vercel • Render",
      },
    },
  },

  {
    id: "dr-attendance",
    category: "app",
    name: "Fugen Health Care",
    title: "Fugen Health Care — Digital Health Card App",
    tagline: "Digital health cards & doctor consultation tracking for medical camps",
    description:
      "Fugen Health Care is a mobile app used at medical camps, colleges and healthcare events. On registration, every patient or student gets a unique digital health card they present at each visit. Doctors log consultations and mark attendance per visit, building a complete medical history for each person. Admins can see which doctor attended which patient, at which camp or hospital and on what date — full visibility across every role.",
    features: [
      "Digital health card generated per patient / student",
      "Used at medical camps, colleges & health events",
      "Doctor marks consultation & attendance per visit",
      "Full visit history — doctor, date & location",
      "Admin dashboard with cross-role visibility",
      "Patients can show their card to any doctor or staff",
    ],
    stack: ["React Native", "Firebase", "Expo", "Role-based access"],
    links: [],
    color: "#2f6bff",
    featured: 4,
    cover: {
      type: "phones",
      images: ["/img/fugen/doctor-login.webp", "/img/fugen/home.webp", "/img/fugen/profile.webp"],
    },
    gallery: [
      { src: "/img/fugen/home.webp", caption: "Home — choose your portal", kind: "phone" },
      { src: "/img/fugen/doctor-login.webp", caption: "Doctor login", kind: "phone" },
      { src: "/img/fugen/patient-login.webp", caption: "Patient login", kind: "phone" },
      { src: "/img/fugen/profile.webp", caption: "Profile & health card", kind: "phone" },
    ],
    spec: {
      name: "fugenHealthCare",
      fields: {
        domain: "Digital Health Card System",
        stack: "React Native • Firebase • Expo",
        roles: ["Admin", "Doctor", "Patient / Student"],
        use: "Camps • Colleges • Hospitals",
      },
    },
  },

  {
    id: "madiha-perfume",
    category: "webapp",
    name: "Madiha Perfume",
    title: "Madiha Perfume — Luxury Store",
    tagline: "Luxury fragrance e-commerce built with Next.js, SSR & SEO",
    description:
      "Madiha Perfume is a high-end fragrance store built with Next.js 14 and Tailwind CSS. Server-side rendering keeps pages fast and search-friendly, while an elegant catalogue, advanced filtering and a secure checkout deliver a premium brand experience.",
    features: [
      "Next.js 14 SSR for fast loads & SEO",
      "Luxury product catalogue with zoom gallery",
      "Advanced category & price filters",
      "Secure checkout & order management",
      "Mobile-first responsive design",
      "Cloudinary for optimised image delivery",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "SSR", "SEO"],
    links: [{ label: "madihaperfume.com", href: "https://madihaperfume.com/" }],
    color: "#c38a3a",
    featured: 5,
    cover: { type: "image", src: "/img/klimb/madiha.webp", bg: ["#f8f2ed", "#f2eae1"] },
    gallery: [
      { src: "/img/madiha/home.webp", caption: "Storefront", kind: "desktop" },
      { src: "/img/klimb/madiha.webp", caption: "Homepage mockup", kind: "mockup" },
    ],
    spec: {
      name: "madiha",
      fields: {
        brand: "Luxury Fragrance E-Commerce",
        tech: "Next.js 14 • Tailwind CSS • Node.js",
        highlights: ["SSR", "SEO Optimized", "Responsive", "Fast"],
      },
    },
  },

  {
    id: "klimb-hr-crm",
    category: "saas",
    name: "KLIMB HR CRM",
    title: "KLIMB HR CRM — CRM & HRMS in One",
    tagline: "CRM and HRMS in one product — sales and staffing in total sync",
    description:
      "KLIMB HR CRM combines a sales CRM and an HR system in a single product, built at KLIMB. Leads, calls, pipelines and targets sit on one side; attendance, shifts, leave and payroll on the other. Every company gets its own isolated workspace, with granular role permissions and reporting built in.",
    features: [
      "Custom lead forms, bulk import & visual pipeline",
      "Click-to-call dialer with automatic call logs",
      "Shifts, attendance & leave management",
      "Payroll, payslips & employee records",
      "An isolated workspace for every company",
      "33 role permissions & 24+ reports",
    ],
    stack: [],
    tags: ["SaaS", "Multi-tenant", "CRM + HRMS"],
    stats: [
      { value: "33", label: "Role permissions" },
      { value: "24+", label: "Reports" },
      { value: "100%", label: "Data isolation" },
    ],
    studio: "KLIMB",
    links: [{ label: "Visit product", href: "https://hrcrm.klimb.agency/" }],
    color: "#6d4cff",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/hr-crm.webp", bg: ["#f0edff", "#e8e2fb"], ratio: 4 / 3 },
    gallery: [{ src: "/img/klimb/hr-crm.webp", caption: "Product site & CRM dashboard", kind: "mockup" }],
    spec: {
      name: "klimbHrCrm",
      fields: {
        product: "CRM + HRMS SaaS",
        sales: ["Leads", "Pipeline", "Dialer", "Targets"],
        people: ["Attendance", "Shifts", "Leave", "Payroll"],
        tenancy: "Isolated workspace per company",
      },
    },
  },

  {
    id: "taleem-e-ummat",
    category: "app",
    name: "Taleem-e-Ummat",
    title: "Taleem-e-Ummat — Islamic Education App",
    tagline: "Islamic education, masjid finder & donations — app + website",
    description:
      "Taleem-e-Ummat is a community platform for Islamic education. The app brings together a Quran reading experience with zoomable PDF pages, a masjid finder with location-based prayer timings and donations that support education, plus admin tools for mosques. It's live on Google Play with a companion website.",
    features: [
      "Quran reading with zoomable PDF pages",
      "Masjid finder with location-based prayer times",
      "Donations that support education",
      "Admin tools for mosques",
      "Companion website",
      "Live on Google Play",
    ],
    stack: ["React Native", "Expo", "PDF-Lib", "Firebase"],
    links: [
      { label: "Google Play", href: playStore("com.taleemeummat.app") },
      { label: "taleemeummat.com", href: "https://taleemeummat.com/" },
    ],
    color: "#1f8a4c",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/taleem-e-ummat.webp", bg: ["#ecf6f0", "#e5efe7"] },
    gallery: [{ src: "/img/klimb/taleem-e-ummat.webp", caption: "Website & app screens", kind: "mockup" }],
    spec: {
      name: "taleemEUmmat",
      fields: {
        domain: "Islamic Education & Community",
        stack: "React Native • Expo • PDF-Lib • Firebase",
        modules: ["Quran", "Masjid Finder", "Prayer Times", "Donations"],
        platforms: "Android • Web",
      },
    },
  },

  {
    id: "kroeasy",
    category: "webapp",
    name: "KroEasy",
    title: "KroEasy — Home Services Platform",
    tagline: "Home services booking — website + app",
    description:
      "KroEasy is a home-services platform where customers book skilled professionals at their doorstep — from cleaning to AC repair and more. It features atomic batch booking, worker payments through dynamic QR codes and real-time order tracking. The website is live and the Android app is in testing.",
    features: [
      "Service catalogue with doorstep booking",
      "Atomic batch booking for multiple services",
      "Worker payments via dynamic QR codes",
      "Real-time order tracking",
      "Razorpay payments",
      "Android app in testing",
    ],
    stack: ["React Native", "Node.js", "Razorpay", "MongoDB"],
    links: [{ label: "kroeasy.com", href: "https://kroeasy.com/" }],
    color: "#6b3fe0",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/kroeasy.webp", bg: ["#f3eefd", "#ece6fa"] },
    gallery: [{ src: "/img/klimb/kroeasy.webp", caption: "Website & app screens", kind: "mockup" }],
    spec: {
      name: "kroEasy",
      fields: {
        domain: "Home Services Marketplace",
        stack: "React Native • Node.js • MongoDB",
        features: ["Batch Booking", "QR Payouts", "Live Tracking"],
        payments: "Razorpay • Dynamic QR",
      },
    },
  },

  {
    id: "shopit",
    category: "app",
    name: "Shopit",
    title: "Shopit — Shopping App",
    tagline: "Quick-commerce grocery delivery app + website",
    description:
      "Shopit is a polished quick-commerce shopping app built with React Native. It offers a seamless browsing and buying experience with product search, wishlist, cart management and secure checkout. The backend runs on Express and MongoDB with JWT authentication and OTP / social login.",
    features: [
      "Product listing, search & smart filters",
      "Wishlist & persistent cart",
      "JWT + OTP + social login",
      "Order history & real-time status",
      "Admin product & order management",
      "Smooth, animated UI",
    ],
    stack: ["React Native", "Node.js", "Express", "MongoDB", "JWT", "Expo"],
    links: [
      { label: "Google Play", href: playStore("com.shopitonline.app") },
      { label: "shopitonline.in", href: "https://shopitonline.in/" },
    ],
    color: "#14a37f",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/shopit-app.webp", bg: ["#f1f7f0", "#ebf4e8"] },
    gallery: [
      { src: "/img/klimb/shopit.webp", caption: "Website & app", kind: "mockup" },
      { src: "/img/shopit/home.webp", caption: "Home — browse products", kind: "phone" },
      { src: "/img/shopit/screen.webp", caption: "Category listing", kind: "phone" },
      { src: "/img/shopit/store-1.webp", caption: "Product grid", kind: "phone" },
      { src: "/img/shopit/store-2.webp", caption: "My account", kind: "phone" },
    ],
    spec: {
      name: "shopit",
      fields: {
        concept: "Full-featured Shopping App",
        stack: "React Native • Express • MongoDB",
        features: ["Cart", "Wishlist", "Product Search", "Orders"],
        auth: "JWT • Social Login • OTP",
      },
    },
  },

  {
    id: "plp-bazar-web",
    category: "webapp",
    name: "PLP Bazar Web",
    title: "PLP Bazar — E-Commerce Website",
    tagline: "Scalable multi-vendor MERN e-commerce platform",
    description:
      "PLP Bazar Web is the web version of the PLP Bazar marketplace. Built on the MERN stack, it supports multiple vendors, comprehensive admin controls and a smooth customer shopping experience — with Razorpay checkout, COD, dynamic coupons and a full analytics dashboard for admins.",
    features: [
      "Multi-vendor product management",
      "Razorpay + COD + wallet payments",
      "Dynamic coupon & discount system",
      "Real-time order management",
      "Admin analytics & revenue dashboard",
      "SEO-optimised product pages",
    ],
    stack: ["React", "Node.js", "MongoDB", "Razorpay", "Redux", "Tailwind CSS"],
    links: [{ label: "plpbazar.com", href: "https://plpbazar.com/" }],
    color: "#f97316",
    featured: 0,
    cover: { type: "browser", images: ["/img/plp-bazar/web-home.webp"], url: "plpbazar.com" },
    gallery: [
      { src: "/img/plp-bazar/web-home.webp", caption: "Homepage", kind: "desktop" },
      { src: "/img/plp-bazar/app-home.webp", caption: "Mobile — category browse", kind: "phone" },
      { src: "/img/plp-bazar/app-food.webp", caption: "Mobile — restaurants", kind: "phone" },
    ],
    spec: {
      name: "plpBazarWeb",
      fields: {
        type: "Multi-Vendor E-Commerce Website",
        stack: "React • Node.js • Express • MongoDB",
        modules: ["Admin", "Vendor", "Customer", "Analytics"],
        payment: "Razorpay • COD • Wallet",
      },
    },
  },

  {
    id: "masjid-finder",
    category: "app",
    name: "Masjid Finder",
    title: "Masjid Finder — Locator App",
    tagline: "GPS-based nearest masjid finder with prayer times",
    description:
      "Masjid Finder is a community app that uses GPS to find the nearest masjids and show their prayer times, facilities and directions. Built with React Native and the Google Maps API, it lets users review and rate masjids, filter by facilities (parking, wudu area and more) and get accurate prayer times for their location.",
    features: [
      "GPS-powered nearest masjid detection",
      "Google Maps integration with directions",
      "Location-based accurate prayer times",
      "Masjid profiles with facilities info",
      "User reviews and ratings",
      "Offline prayer times caching",
    ],
    stack: ["React Native", "Google Maps", "Expo", "GPS", "Prayer Times API"],
    links: [],
    color: "#13795b",
    featured: 0,
    cover: {
      type: "phones",
      images: ["/img/masjid-finder/app-2.webp", "/img/masjid-finder/app-1.webp", "/img/masjid-finder/app-3.webp"],
    },
    gallery: [
      { src: "/img/masjid-finder/app-1.webp", caption: "Home — nearby masjids", kind: "phone" },
      { src: "/img/masjid-finder/app-2.webp", caption: "Map view & directions", kind: "phone" },
      { src: "/img/masjid-finder/app-3.webp", caption: "Prayer times", kind: "phone" },
      { src: "/img/masjid-finder/app-4.webp", caption: "Masjid details & facilities", kind: "phone" },
    ],
    spec: {
      name: "masjidFinder",
      fields: {
        concept: "Nearest Masjid Locator",
        stack: "React Native • Google Maps API • Expo",
        features: ["GPS Location", "Nearby Masjids", "Prayer Times"],
        extra: "Directions • Reviews • Facilities Info",
      },
    },
  },

  {
    id: "chand-kabadi-app",
    category: "app",
    name: "Chand Kabadi Wala",
    title: "Chand Kabadi Wala — App",
    tagline: "Doorstep scrap & recycling pickup app",
    description:
      "Chand Kabadi Wala is a mobile app for doorstep scrap collection and recycling. Users book pickups, estimate weight and value, and track their collector in real time. Spring animations built with Moti, a smooth onboarding flow and a clean themed UI make it feel premium.",
    features: [
      "Pickup booking with date & time selection",
      "Weight calculator & price estimator",
      "Real-time collector tracking",
      "Spring & fade animations with Moti",
      "Smooth onboarding flow",
      "Order history & earnings summary",
    ],
    stack: ["React Native", "Expo", "Moti", "Node.js", "MongoDB", "Lucide"],
    links: [{ label: "Google Play", href: playStore("com.chandkabadiwala.main") }],
    color: "#2fbf71",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/chand-kabadi.webp", bg: ["#f0f7f5", "#e6f5f0"] },
    gallery: [
      { src: "/img/chand-kabadi/app-5.webp", caption: "Welcome & OTP login", kind: "phone" },
      { src: "/img/chand-kabadi/app-1.webp", caption: "Home", kind: "phone" },
      { src: "/img/chand-kabadi/app-2.webp", caption: "Schedule a pickup", kind: "phone" },
      { src: "/img/chand-kabadi/app-3.webp", caption: "Profile", kind: "phone" },
      { src: "/img/chand-kabadi/app-4.webp", caption: "Certificates", kind: "phone" },
    ],
    spec: {
      name: "chandKabadi",
      fields: {
        concept: "Doorstep Scrap & Recycling Pickup",
        platform: "React Native • Expo • Moti",
        features: ["Pickup Booking", "Weight Calc", "Live Tracking"],
        animations: "Spring • Fade • Slide transitions",
      },
    },
  },

  {
    id: "partyorra",
    category: "webapp",
    name: "PartyOrra",
    title: "PartyOrra — Event Decoration Booking",
    tagline: "Balloon & event decoration booking + shop",
    description:
      "PartyOrra is a booking and shopping platform for balloon and event decoration. Customers browse themes — birthdays, kids' parties, car-boot surprises, retirements and more — then book a decoration service for their date or buy decoration products online.",
    features: [
      "Decoration service booking by date",
      "Online shop for decoration products",
      "Themed categories — birthday, kids, car boot & more",
      "Mobile-first responsive design",
    ],
    stack: [],
    tags: ["Booking", "E-commerce", "Events"],
    links: [{ label: "partyorra.com", href: "https://partyorra.com/" }],
    color: "#8a3fa8",
    featured: 0,
    cover: { type: "image", src: "/img/klimb/partyorra.webp", bg: ["#f8f3e9", "#f4ebde"] },
    gallery: [{ src: "/img/klimb/partyorra.webp", caption: "Homepage", kind: "mockup" }],
    spec: {
      name: "partyOrra",
      fields: {
        domain: "Event Decoration Booking + Shop",
        flows: ["Book a Service", "Buy Products"],
        themes: ["Birthday", "Kids", "Car Boot", "Love"],
      },
    },
  },

  {
    id: "party-puffers",
    category: "webapp",
    name: "Party Puffers",
    title: "Party Puffers",
    tagline: "Party supplies & event decoration website",
    description:
      "Party Puffers is a vibrant party supplies and event decoration website. Customers browse and shop a wide range of party products, decorations and bundles for every occasion, with a clean, colourful UI built for a smooth shopping experience.",
    features: [
      "Full product catalogue for party supplies",
      "Event decoration bundles & add-ons",
      "Shopping cart & checkout flow",
      "Order tracking & management",
      "Mobile-first responsive design",
      "Admin product & inventory control",
    ],
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "E-commerce"],
    links: [{ label: "partypuffers.com", href: "https://www.partypuffers.com/" }],
    color: "#e64980",
    featured: 0,
    cover: { type: "browser", images: ["/img/party-puffers/home.webp"], url: "partypuffers.com" },
    gallery: [{ src: "/img/party-puffers/home.webp", caption: "Categories & car-boot collection", kind: "desktop" }],
    spec: {
      name: "partyPuffers",
      fields: {
        domain: "Party Supplies & Event Decoration",
        stack: "React • Node.js • MongoDB",
        features: ["Cart", "Bundles", "Admin Panel", "Live"],
        url: "partypuffers.com",
      },
    },
  },

  {
    id: "kasim-energy",
    category: "website",
    name: "Kasim Energy",
    title: "Kasim Energy — Corporate Site",
    tagline: "Premium corporate website for an energy services company",
    description:
      "Kasim Energy is a corporate website for an energy services company. It showcases the company's services with a premium animated UI, an inquiry form and strong SEO. Built with React and Tailwind CSS, it's mobile-first and tuned for page speed.",
    features: [
      "Premium animated homepage with GSAP",
      "Services showcase with detail pages",
      "Inquiry form with email integration",
      "Mobile-first, fully responsive",
      "Core Web Vitals optimised",
      "Google Analytics integration",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "GSAP", "SEO"],
    links: [{ label: "kasimenergy.com", href: "https://www.kasimenergy.com/" }],
    color: "#1677c9",
    featured: 0,
    cover: { type: "browser", images: ["/img/kasim-energy/home.webp"], url: "kasimenergy.com" },
    gallery: [{ src: "/img/kasim-energy/home.webp", caption: "Homepage hero", kind: "desktop" }],
    spec: {
      name: "kasimEnergy",
      fields: {
        industry: "Energy Services — Corporate Website",
        stack: "React • Tailwind • Node.js",
        features: ["Services Showcase", "Contact Form", "SEO Optimized"],
        design: "Premium UI • GSAP Animations • Mobile-First",
      },
    },
  },

  {
    id: "chand-kabadi-web",
    category: "website",
    name: "Chand Kabadi Wala Web",
    title: "Chand Kabadi Wala — Website",
    tagline: "Scrap & recycling business website with pickup booking",
    description:
      "The Chand Kabadi Wala website is the web presence for the scrap recycling business. It lists services, lets users book pickups through a form and offers a WhatsApp CTA for instant enquiries. Built with React and Tailwind — fast, SEO-friendly and mobile-optimised.",
    features: [
      "Service listing with category pages",
      "Pickup booking form",
      "WhatsApp CTA integration",
      "SEO-optimised content",
      "Mobile-first design",
      "Fast page load (under 2s)",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "MongoDB", "WhatsApp API"],
    links: [{ label: "chandkabadiwala.com", href: "https://chandkabadiwala.com/" }],
    color: "#16a34a",
    featured: 0,
    cover: { type: "browser", images: ["/img/chand-kabadi/web-home.webp"], url: "chandkabadiwala.com" },
    gallery: [{ src: "/img/chand-kabadi/web-home.webp", caption: "Homepage", kind: "desktop" }],
    spec: {
      name: "chandKabadiWeb",
      fields: {
        concept: "Scrap & Recycling Business Website",
        stack: "React • Node.js • MongoDB",
        features: ["Service Listing", "Booking Form", "WhatsApp CTA"],
      },
    },
  },
];

export const featuredProjects = projectsData
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured);

/** Tech chips if known, otherwise descriptive tags. */
export const projectChips = (p) => (p.stack.length ? p.stack : p.tags || []);

export const getProject = (id) => projectsData.find((p) => p.id === id);

export const nextProject = (id) => {
  const i = projectsData.findIndex((p) => p.id === id);
  return projectsData[(i + 1) % projectsData.length];
};

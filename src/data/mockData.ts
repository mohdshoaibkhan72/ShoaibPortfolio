export const skills = {
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "HTML5", icon: "🌐" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "📜" },
    { name: "Bootstrap", icon: "🅱️" },
    { name: "Tailwind CSS", icon: "💨" }
  ],
  backend: [
    { name: "Node.js", icon: "🟢" },
    { name: "Express.js", icon: "⚡" },
    { name: "REST APIs", icon: "🔌" }
  ],
  database: [
    { name: "MongoDB", icon: "🍃" },
    { name: "Mongoose", icon: "📊" }
  ],
  tools: [
    { name: "Git", icon: "📂" },
    { name: "GitHub", icon: "🐙" },
    { name: "VS Code", icon: "💻" },
    { name: "Postman", icon: "📮" }
  ]
};

export const experiences = [
  {
    id: 1,
    title: "Senior App & Full-Stack Developer",
    company: "Loanyfy",
    type: "Full-Time",
    duration: "June 2024 – Present",
    durationLabel: "2 yrs · Ongoing",
    responsibilities: [
      "Leading mobile-first fintech product development with React Native for Android & iOS",
      "Architecting high-security loan management modules, REST APIs, and MERN stack backends",
      "Integrating third-party services — SMS OTP, KYC verification, Razorpay payment gateway",
      "Delivering premium UI/UX with smooth animations and optimizing app performance at scale",
      "Managing production deployments on AWS EC2 & S3 and driving code quality across the team"
    ]
  },
];

export const projects = [
  {
    id: 1,
    title: "Chand Kabadi Wala",
    description: "A premium mobile application for scrap management and recycling. Features smooth spring animations, themed iconography, and a streamlined onboarding flow built with React Native.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000",
    techStack: ["React Native", "Expo", "Moti", "Lucide"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Madiha Perfume",
    description: "A high-end fragrance e-commerce platform. Fully optimized for production with Next.js, featuring advanced filtering, secure checkout, and a professional aesthetic.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000",
    techStack: ["Next.js", "React", "Tailwind", "Node.js"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "PLP Bazar",
    description: "A comprehensive multi-category e-commerce marketplace. Built on the MERN stack with a focus on scalable architecture, user-friendly navigation, and robust backend services.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "KroEasy",
    description: "A service-based platform featuring atomic batch booking, worker payment integration via dynamic QR codes, and real-time order tracking.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1000",
    techStack: ["React Native", "Node.js", "Razorpay", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Masjid App",
    description: "A community-focused mobile app featuring a Quran reading interface with PDF zoom controls, location-based prayer timings, and mosque admin tools.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
    techStack: ["React Native", "Expo", "PDF-Lib", "Firebase"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Organyfy",
    description: "A team productivity mobile app with Kanban task boards, role-based access, push notifications, and real-time collaboration — built for small business teams.",
    image: "/Organyfy.png",
    techStack: ["React Native", "Expo", "Firebase", "Push Notifications"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "PLP Bazar Owner",
    position: "Founder & CEO",
    company: "PLP Bazar",
    comment: "Shoaib built our entire multi-vendor marketplace — both the React Native app and the web platform. The performance, UI, and delivery were outstanding. Highly recommended.",
    avatar: "PB"
  },
  {
    id: 2,
    name: "Chand Kabadi Wala",
    position: "Founder",
    company: "Chand Kabadi Wala",
    comment: "The scrap pickup app Shoaib built for us completely transformed our business. Clean UI, smooth booking flow, and deployed perfectly on Play Store. Excellent work!",
    avatar: "CK"
  },
  {
    id: 3,
    name: "Madiha Perfume",
    position: "Owner",
    company: "Madiha Perfume",
    comment: "Our e-commerce website looks stunning and runs smoothly. Shoaib understood our brand vision perfectly and delivered a premium experience within the deadline.",
    avatar: "MP"
  }
];

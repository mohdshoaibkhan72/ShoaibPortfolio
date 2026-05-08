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

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with shopping cart, payment integration, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc2MjA2NzA0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Collaborative task manager with real-time updates, user authentication, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1651129522359-ce483a8263a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGFwcHxlbnwxfHx8fDE3NjE5OTAxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["React", "Express", "MongoDB", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Modern analytics dashboard with interactive charts, data visualization, and export functionality.",
    image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIwMDc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const experiences = [

  {
    id: 1,
    title: "Full Stack Developer",
    company: "Loanyfy.com",
    duration: "June 2024 - Now ",
    responsibilities: [
      "Developed and maintained responsive web applications using the MERN stack",
      "Collaborated with cross-functional teams to design and deliver new features",
      "Implemented user authentication, API integrations, and data management modules",
      "Contributed to enhancing UI/UX for improved user engagement"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "Tech Solutions Inc.",
    comment: "Mohammad is an exceptional developer who delivers high-quality work on time. His expertise in the MERN stack is impressive.",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Ahmed Ali",
    position: "Team Lead",
    company: "Digital Ventures",
    comment: "Working with Mohammad was a great experience. He's professional, skilled, and always willing to go the extra mile.",
    avatar: "AA"
  },
  {
    id: 3,
    name: "Emily Chen",
    position: "CEO",
    company: "StartupHub",
    comment: "Mohammad built our entire web platform from scratch. The result exceeded our expectations in every way.",
    avatar: "EC"
  }
];

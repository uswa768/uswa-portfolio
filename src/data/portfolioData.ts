export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  link: string;
  github: string;
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export const personalInfo: PersonalInfo = {
  name: "Uswa",
  title: "Frontend Developer & Student",
  subtitle: "Building modern, high-performance, and visually immersive user experiences.",
  bio: "I am a passionate frontend developer and student focusing on creating highly responsive, interactive, and beautiful websites. By blending modern UI/UX trends with clean code architectures, I aim to build products that deliver exceptional performance and stunning aesthetics.",
  email: "uswaasif768@gmail.com",
  github: "https://github.com/uswa768",
  linkedin: "https://linkedin.com/in/uswa-dev",
  twitter: "https://x.com/uswasif",
};

export const stats = [
  { value: "15+", label: "Projects Completed" },
  { value: "2+", label: "Years Self-Learning" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "500+", label: "Git Commits" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Frontend",
    skills: [
      { name: "React / Vite", level: 90, iconName: "SiReact" },
      { name: "TypeScript", level: 85, iconName: "SiTypescript" },
      { name: "JavaScript (ES6+)", level: 92, iconName: "SiJavascript" },
      { name: "HTML5 / CSS3", level: 95, iconName: "SiHtml5" },
    ],
  },
  {
    title: "Libraries & Styling",
    skills: [
      { name: "Vanilla CSS & Variables", level: 95, iconName: "SiCss3" },
      { name: "GSAP (Animations)", level: 75, iconName: "SiGsap" },
      { name: "Tailwind CSS", level: 88, iconName: "SiTailwindcss" },
      { name: "Three.js / Fiber", level: 60, iconName: "SiThreedotjs" },
    ],
  },
  {
    title: "Workflow & Design",
    skills: [
      { name: "Git & GitHub", level: 88, iconName: "SiGithub" },
      { name: "Figma (UI Design)", level: 80, iconName: "SiFigma" },
      { name: "Command Line", level: 82, iconName: "SiTerminal" },
      { name: "Responsive Layouts", level: 95, iconName: "SiResponsive" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "crm-portal",
    title: "CRM SaaS",
    description: "A modern, high-performance CRM SaaS platform with comprehensive customer relationship management, task scaling, and real-time WebSocket integration for seamless team collaboration.",
    tags: ["Internship Project", "Engineering", "CRM Portal"],
    tech: ["React", "JavaScript", "TailwindCSS", "GSAP", "Framer Motion"],
    link: "https://crm-saas-flame.vercel.app/",
    github: "https://github.com/raheelanjum786/crm-saas",
    color: "#10b981",
  },
  {
    id: "dashboard-project",
    title: "Project Workspace Kanban",
    description: "An interactive project management interface modeled after task boards, supporting drag-and-drop workspace cards and status sorting.",
    tags: ["Practice Project", "Kanban", "Workspace"],
    tech: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    link: "dashboard-one-dusky-one.vercel.app",
    github: "https://github.com/uswa768/Dashboard-One",
    color: "#8b5cf6",
  },
  {
    id: "our-blooms",
    title: "Our Blooms",
    description: "A beautiful floral boutique website showcasing curated collections of flowers, custom customer stories, and responsive navigation paths.",
    tags: ["Practice Project", "Boutique", "Landing Page"],
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://our-blooms-bupr.vercel.app/",
    github: "https://github.com/uswa768/Our-Blooms",
    color: "#ec4899",
  },
  {
    id: "doist-todo",
    title: "Doist Tasks Dashboard",
    description: "A sleek task management dashboard featuring daily productivity logging, status categorized list boards, and responsive sidebar navigation.",
    tags: ["Practice Project", "Todo App", "Dashboard"],
    tech: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    link: "https://todo-app-self-tau-96.vercel.app/",
    github: "https://github.com/uswa768/todo-app",
    color: "#6366f1",
  },
  {
    id: "dashboard-sales",
    title: "Sales Analytics Dashboard",
    description: "A premium dark-themed sales monitoring dashboard displaying dynamic metrics, product popularity rankings, and graphical customer statistics.",
    tags: ["Practice Project", "Data Vis", "Dashboard"],
    tech: ["React", "JavaScript", "TailwindCSS", "ChartJS"],
    link: "dashboard-two-nine.vercel.app",
    github: "https://github.com/uswa768/dashboard-two",
    color: "#06b6d4",
  },
];

export const educationTimeline: TimelineItem[] = [
  {
    year: "2024 - Present",
    title: "BS Computer Science (BSCS)",
    subtitle: "Punjab University — Continue",
    description: "Deepening my knowledge of computational theory, algorithms, software architectures, and modern web systems.",
  },
  {
    year: "2022 - 2024",
    title: "F.Sc. (Intermediate)",
    subtitle: "A Grade",
    description: "Completed college pre-engineering credentials focusing on Mathematics, Physics, and Computer Sciences.",
  },
  {
    year: "2020 - 2022",
    title: "Matriculation",
    subtitle: "A+ Grade",
    description: "Acquired secondary school certificate with top grades in core science and mathematics curriculums.",
  },
];

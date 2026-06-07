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
  title: "Frontend Developer",
  subtitle: "I build clean, fast, and visually sharp web interfaces.",
  bio: "I'm a Computer Science undergrad at Punjab University with a genuine interest in frontend development. I started learning on my own before it became part of my degree, and somewhere along the way, building interfaces became less of a hobby and more of a direction.",
  email: "uswaasif768@gmail.com",
  github: "https://github.com/uswa768",
  linkedin: "https://linkedin.com/in/uswa-dev",
  twitter: "https://x.com/uswasif",
};

export const stats = [
  { value: "15+", label: "Projects Built" },
  { value: "2+", label: "Years of Self-Learning" },
  { value: "1", label: "Internship" },
  { value: "500+", label: "Commits on GitHub" },
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
    description: "A CRM platform built during an internship that handles customer management, task tracking, and team collaboration with real-time WebSocket updates. Worked on the frontend using React, JavaScript, TailwindCSS, GSAP, and Framer Motion for performance and smooth interactions.",
    tags: ["Internship Project", "2026"],
    tech: ["React", "JavaScript", "TailwindCSS", "GSAP", "Framer Motion"],
    link: "https://crm-saas-flame.vercel.app/",
    github: "https://github.com/raheelanjum786/crm-saas",
    color: "#10b981",
  },
  {
    id: "dashboard-project",
    title: "Project Workspace Kanban",
    description: "A Kanban-style task board I built to get hands-on with drag-and-drop interactions and state management. Clean UI, status-based card sorting, and smooth transitions throughout.",
    tags: ["Practice Project", "2026"],
    tech: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    link: "https://dashboard-one-dusky-one.vercel.app/",
    github: "https://github.com/uswa768/Dashboard-One",
    color: "#8b5cf6",
  },
  {
    id: "our-blooms",
    title: "Our Blooms",
    description: "A beautiful floral boutique website showcasing curated collections of flowers, custom customer stories, and responsive navigation paths.",
    tags: ["Practice Purpose Project", "Boutique", "Landing Page"],
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://our-blooms-bupr.vercel.app/",
    github: "https://github.com/uswa768/Our-Blooms",
    color: "#ec4899",
  },
  {
    id: "doist-todo",
    title: "Doist Tasks Dashboard",
    description: "A sleek task management dashboard featuring daily productivity logging, status categorized list boards, and responsive sidebar navigation.",
    tags: ["Practice Purpose Project", "Todo App", "Dashboard"],
    tech: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    link: "https://todo-app-self-tau-96.vercel.app/",
    github: "https://github.com/uswa768/todo-app",
    color: "#6366f1",
  },
  {
    id: "wedding-site",
    title: "Jenny and Jason Wedding Invitation",
    description: "A gorgeous, fully responsive wedding invitation site featuring interactive RSVP forms, venue location routes, and a personal couples timeline.",
    tags: ["Practice Purpose Project", "Invitation", "Responsive"],
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://wedding-site-orcin-alpha.vercel.app/",
    github: "https://github.com/uswa768/Wedding-site",
    color: "#84a98c",
  },
  {
    id: "dashboard-sales",
    title: "Sales Analytics Dashboard",
    description: "A premium dark-themed sales monitoring dashboard displaying dynamic metrics, product popularity rankings, and graphical customer statistics.",
    tags: ["Practice Purpose Project", "Data Vis", "Dashboard"],
    tech: ["React", "JavaScript", "TailwindCSS", "ChartJS"],
    link: "https://dashboard-two-nine.vercel.app/",
    github: "https://github.com/uswa768/dashboard-two",
    color: "#06b6d4",
  },
];

export const educationTimeline: TimelineItem[] = [
  {
    year: "2024 to Present",
    title: "BS Computer Science",
    subtitle: "Punjab University",
    description: "Studying algorithms, data structures, software architecture, and web systems. Applying coursework directly through personal and collaborative projects.",
  },
  {
    year: "2022 to 2024",
    title: "F.Sc. Pre-Medical",
    subtitle: "A Grade",
    description: "Completed intermediate with focus on Biology, Chemistry, and Physics, then pivoted to Computer Science and never looked back.",
  },
  {
    year: "2020 to 2022",
    title: "Matriculation",
    subtitle: "A+ Grade",
    description: "Strong foundation in science and mathematics, marking the start of a pattern of taking academics seriously.",
  },
];

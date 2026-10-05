import profileImage from "../assets/salem.jpeg";
import portfolioProjectImage from "../assets/project-portfolio.png";
import alAmiahCleaningImage from "../assets/project-alamiah-cleaning-mecca.png";
import alimanRouhImage from "../assets/project-aliman-rouh.jpg";
import alimanRouhGoldenImage from "../assets/project-aliman-rouh-golden.jpg";

export const site = {
  name: "Salem Ebrahim",
  title: "Frontend Developer",
  /** Primary hero headline (role + focus). */
  heroHeadline: "Frontend Developer building modern React applications",
  /** Supporting line under headline. */
  heroSubline:
    "I build responsive, scalable web applications and business dashboards using React, TypeScript, and modern frontend technologies.",
  /** Low-emphasis line under hero CTAs. */
  heroCtaSupportLine:
    "Focused on clean architecture, performance, usability, and maintainable code.",
  /** Eyebrow above headline. */
  heroKicker: "React • TypeScript • Modern Web Applications",
  tagline:
    "Frontend Developer specializing in React and TypeScript, focused on building responsive, scalable, and user-friendly web applications with clean code and modern UI.",
  email: "salemebrahim165@gmail.com",
  location: "Riyadh, Saudi Arabia",
  phone: "+966 56 050 6289",
  /** International format, no + (for https://wa.me/...) */
  whatsappUrl: "https://wa.me/966560506289",
  linkedinUrl: "https://www.linkedin.com/in/salemebrahim",
  githubUrl: "https://github.com/salemebrahimzidan",
  /** Add `public/cv.pdf` and set to `/cv.pdf` for download */
  cvUrl: null as string | null,
  /** Site origin for Open Graph, canonical, and sitemap (keep trailing slash). */
  canonicalBase: "https://salemebrahim.com/",
};

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "qualification", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];

export const about = {
  bio: "I'm a Frontend Developer specializing in React and TypeScript, focused on building responsive web applications, dashboards, and business systems. I enjoy turning complex workflows into clear, usable interfaces and working with APIs, authentication, data management, and role-based applications.",
  intro: "About Me",
  whatIDoHeading: "What I Actually Do",
  whatIDoLead:
    "Recent work includes customer-facing websites, admin panels, and an operations dashboard that is live in production.",
  whatIDoFocusLabel: "Practical work includes:",
  whatIDoBullets: [
    "React and TypeScript applications",
    "Business dashboards",
    "Admin panels",
    "REST API integration",
    "Authentication and authorization flows",
    "Role-based interfaces",
    "Customer, transaction, and reporting screens",
    "Responsive web applications",
    "Production deployment",
  ],
  whatIDoClosing:
    "I focus on interfaces that stay clear as the workflow gets more detailed.",
};

/** Shown under the Tech Stack heading — how that stack is applied in practice. */
export const skillsEnterpriseIntro =
  "The tools I use to build responsive React applications, dashboards, and business interfaces.";

/** Credibility strip under the skills section. */
export const trust = {
  statement:
    "Building reliable frontend experiences for business applications, from responsive interfaces and API integrations to role-based dashboards and data-driven workflows.",
  /** Shorter chips for the trust band (subset of full stack). */
  highlightStack: [
    "React",
    "TypeScript",
    "Vite",
    "Supabase",
    "TanStack Query",
    "Zod",
    "React Hook Form",
    "REST APIs",
    "Tailwind CSS",
  ] as const,
};

/** Kept on the skill data. The Tech Stack section does not display it. */
export type SkillLevel = "Advanced" | "Strong" | "Good";

export type SkillEntry = {
  /** Stable key for icons and React `key`. */
  id: string;
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: SkillEntry[];
};

/** Grouped skills for the Tech Stack section. */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: "react", name: "React", level: "Advanced" },
      { id: "typescript", name: "TypeScript", level: "Advanced" },
      { id: "javascript", name: "JavaScript", level: "Strong" },
      { id: "html5", name: "HTML5", level: "Strong" },
      { id: "css3", name: "CSS3", level: "Strong" },
      { id: "tailwind", name: "Tailwind CSS", level: "Advanced" },
    ],
  },
  {
    id: "state-data",
    label: "State & Data",
    skills: [
      { id: "react-query", name: "TanStack Query", level: "Strong" },
      { id: "zustand", name: "Zustand", level: "Strong" },
      { id: "rest", name: "REST APIs", level: "Strong" },
      { id: "supabase", name: "Supabase", level: "Strong" },
      { id: "postgresql", name: "PostgreSQL", level: "Good" },
    ],
  },
  {
    id: "forms-validation",
    label: "Forms & Validation",
    skills: [
      { id: "rhf", name: "React Hook Form", level: "Strong" },
      { id: "zod", name: "Zod", level: "Good" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { id: "vite", name: "Vite", level: "Strong" },
      { id: "git", name: "Git", level: "Strong" },
      { id: "github", name: "GitHub", level: "Strong" },
      { id: "gitlab", name: "GitLab", level: "Strong" },
    ],
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  /** Compact stack shown on the project card. */
  technologies?: string[];
  image: string;
  /** Opens in a new tab when http(s). */
  demoUrl?: string;
  demoLabel?: string;
  liveUrl: string;
  liveLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "aliman-rouh-golden",
    title: "Al-Iman Rouh Golden — Client & Operations Management System",
    description:
      "A business operations management system built to manage customers, service transactions, profits, user permissions, and operational reporting through a centralized responsive dashboard.",
    highlights: [
      "Customer management",
      "Multiple service transactions per customer",
      "Profit tracking",
      "Daily and monthly reporting",
      "Filtering by customer, nationality, and city",
      "Admin and standard user roles",
      "Role-based permissions",
      "Authentication and protected application areas",
      "Supabase Row Level Security",
      "Responsive dashboard for business operations",
    ],
    technologies: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL"],
    image: alimanRouhGoldenImage,
    demoUrl: "https://work-sage-chi.vercel.app/",
    demoLabel: "Live App",
    liveUrl: "#contact",
    liveLabel: "Get in touch",
  },
  {
    id: "aliman-rouh",
    title: "Al-Iman Rouh — Travel Management Platform",
    description:
      "A full travel and tourism web platform consisting of a customer-facing website and a dedicated admin dashboard for managing travel content, packages, and operational data.",
    highlights: [
      "Customer-facing responsive travel website",
      "Dedicated Admin Dashboard",
      "Dynamic content and package management",
      "Admin-controlled data management",
      "Frontend integration with backend APIs",
      "Travel and Umrah service workflows",
      "Responsive interfaces for desktop and mobile",
      "Production deployment across multiple applications",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
    ],
    image: alimanRouhImage,
    demoUrl: "https://alimanrouh.com/",
    demoLabel: "Live Website",
    liveUrl: "https://alimanrouh-admin.vercel.app/",
    liveLabel: "Admin Dashboard",
  },
  {
    id: "p2",
    title: "Regional Services — Marketing Web App",
    description:
      "A responsive multi-page marketing site for a local services business, with service pages, an Arabic and English switch, and direct WhatsApp and phone contact actions.",
    highlights: [
      "Multi-page layout for services, about, FAQ, and contact",
      "Arabic and English language switch",
      "Responsive layout with mobile navigation",
      "WhatsApp and phone as the main contact actions",
    ],
    technologies: ["React", "Vite", "Framer Motion"],
    image: alAmiahCleaningImage,
    demoUrl: "https://www.alamiahcleaningmecca.com",
    demoLabel: "Demo",
    liveUrl: "#contact",
    liveLabel: "Get in touch",
  },
  {
    id: "p1",
    title: "Personal Portfolio — React SPA",
    description:
      "A responsive single-page portfolio built with reusable React and TypeScript components.",
    highlights: [
      "Reusable React component structure",
      "TypeScript across the app",
      "Responsive layout for desktop and mobile",
      "Lazy-loaded images and a Vite production build",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    image: portfolioProjectImage,
    demoUrl: "https://salemebrahim.com/",
    demoLabel: "Demo",
    liveUrl: "#projects",
    liveLabel: "View details",
  },
];

/** @deprecated Use `caseStudies` — kept for any external imports. */
export const projects = caseStudies;

export type QualificationKind = "education" | "experience";

export const qualificationTabs: { id: QualificationKind; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
];

export const educationItems = [
  {
    title: "General Secondary School",
    organization: "West Tira Joint Secondary School",
    date: "2015 – 2018",
    note: "National-level academic competition; first place at Al-Hamul Center.",
  },
  {
    title: "Bachelor's — Software Engineering",
    organization: "Kafr El-Sheikh University, Computers and Information",
    date: "2018 – 2022",
    note: "Focus on software engineering fundamentals and modern web development.",
  },
];

export const experienceItems = [
  {
    title: "Frontend Developer",
    organization:
      "BITS — Binary Integrated Technology Solutions | Saudi Arabia",
    date: "12/2025 – 10/2026",
    note: "Built and optimized enterprise-grade React/TypeScript applications for asset and operations management domains.",
  },
  {
    title: "Social Media Marketing",
    organization: "Marketing Online | Riseoo | Egypt",
    date: "2022 – 2023",
    note: "Content and campaigns across Instagram, TikTok, and Snapchat.",
  },
];

export { profileImage };

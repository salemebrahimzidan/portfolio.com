import profileImage from "../assets/salem.jpeg";
import portfolioProjectImage from "../assets/project-portfolio.png";
import alAmiahCleaningImage from "../assets/project-alamiah-cleaning-mecca.png";

export const site = {
  name: "Salem Ebrahim",
  title: "Frontend Developer",
  /** Primary hero headline (role + focus). */
  heroHeadline: "Frontend React Developer specialized in Enterprise SaaS Systems",
  /** Supporting line under headline. */
  heroSubline: "I build scalable, secure, high-performance dashboards.",
  /** Low-emphasis line under hero CTAs. */
  heroCtaSupportLine: "Focused on performance, scalability, and enterprise-grade UX.",
  /** Eyebrow above headline. */
  heroKicker: "Enterprise SaaS • Dashboards • Scalable Systems",
  tagline:
    "Frontend Developer specializing in React and TypeScript, focused on building responsive, scalable, and user-friendly web applications with clean code and modern UI.",
  email: "salemebrahim165@gmail.com",
  location: "Saudi Arabia",
  phone: "+966 56 050 6289",
  /** International format, no + (for https://wa.me/...) */
  whatsappUrl: "https://wa.me/966560506289",
  linkedinUrl: "https://www.linkedin.com/in/salemebrahim",
  githubUrl: "https://github.com/",
  /** Add `public/cv.pdf` and set to `/cv.pdf` for download */
  cvUrl: null as string | null,
  /** Site origin for Open Graph and sitemap (no trailing issues — keep trailing slash). */
  canonicalBase: "https://salemebrahimzidan.github.io/portfolio/",
};

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Tech Stack" },
  { id: "trust", label: "Trust" },
  { id: "projects", label: "Case Studies" },
  { id: "qualification", label: "Qualification" },
  { id: "contact", label: "Contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];

export const about = {
  bio: `I am a front-end developer who loves sharing experience with others. I studied software engineering at university and keep sharpening my craft with modern tools like React and Tailwind CSS. I care about clear UI, solid structure, and thoughtful details.`,
  intro: "About Me",
  whatIDoHeading: "What I Actually Do",
  whatIDoLead:
    "I build and improve enterprise SaaS systems used to manage assets, operations, and service workflows.",
  whatIDoFocusLabel: "My work focuses on:",
  whatIDoBullets: [
    "Developing scalable frontend architectures using React and TypeScript",
    "Building high-performance dashboards handling large datasets",
    "Designing clean, intuitive UX for complex workflows",
    "Improving system performance, validation, and security",
    "Working with modern tools like TanStack Query, Zod, and modular UI systems",
  ],
  whatIDoClosing:
    "I specialize in turning complex systems into simple, usable, and high-performing interfaces.",
};

/** Shown under the Tech Stack heading — how that stack is applied in practice. */
export const skillsEnterpriseIntro =
  "Experienced in building enterprise-level systems with complex workflows, real-time data handling, and high performance requirements using modern frontend technologies.";

/** Credibility strip (enterprise positioning). */
export const trust = {
  statement:
    "I ship interfaces for demanding product teams: role-based access, audit-friendly flows, and data-heavy screens that stay fast as the domain model grows.",
  /** Shorter chips for the trust band (subset of full stack). */
  highlightStack: [
    "React",
    "TypeScript",
    "TanStack Query",
    "Zod",
    "React Hook Form",
    "REST APIs",
    "Tailwind CSS",
  ] as const,
};

/** Proficiency tier shown in the Tech Stack section (no arbitrary percentages). */
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
  image: string;
  /** Opens in a new tab when http(s). */
  demoUrl?: string;
  demoLabel?: string;
  liveUrl: string;
  liveLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "p1",
    title: "Personal Portfolio — React SPA",
    description:
      "A clean, high-performance single-page portfolio built to showcase technical work and case studies.",
    highlights: [
      "Reusable React components",
      "Smooth navigation and scroll animations",
      "Structured content without exposing sensitive data",
    ],
    image: portfolioProjectImage,
    demoUrl: "https://salemebrahim.com/",
    demoLabel: "Demo",
    liveUrl: "#projects",
    liveLabel: "View details",
  },
  {
    id: "p2",
    title: "Regional Services — Marketing Web App",
    description:
      "A multi-page marketing website designed to drive leads and improve trust on mobile.",
    highlights: [
      "Responsive, content-first layout",
      "Conversion-focused sections",
      "Optimized performance for mobile users",
    ],
    image: alAmiahCleaningImage,
    demoUrl: "https://www.alamiahcleaningmecca.com",
    demoLabel: "Demo",
    liveUrl: "#contact",
    liveLabel: "Get in touch",
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
    organization: "West Tira Secondary School",
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
    date: "12/2025 – Present",
    note: "Building and optimizing enterprise-grade React/TypeScript applications for asset and operations management domains.",
  },
  {
    title: "Junior Frontend Developer",
    organization: "Nile Delta Tech",
    date: "2023 – 2024",
    bullets: [
      "Developed responsive web apps using React.",
      "Built clean UI components and improved user experience.",
      "Integrated APIs and handled basic frontend logic.",
    ],
  },
  {
    title: "Social Media Marketing",
    organization: "Marketing Online | Riseoo | Egypt",
    date: "2022 – 2023",
    note: "Content and campaigns across Instagram, TikTok, and Snapchat.",
  },
];

export { profileImage };

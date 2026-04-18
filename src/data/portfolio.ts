import profileImage from '../assets/salem.jpeg'
import portfolioProjectImage from '../assets/project-portfolio.png'
import alAmiahCleaningImage from '../assets/project-alamiah-cleaning-mecca.png'

export const site = {
  name: 'Salem Ebrahim',
  title: 'Frontend Developer',
  tagline:
    'I build clean, responsive web interfaces and enjoy learning something new every day.',
  email: 'salem@example.com',
  location: 'Saudi Arabia',
  phone: '+966 56 050 6289',
  /** International format, no + (for https://wa.me/...) */
  whatsappUrl: 'https://wa.me/966560506289',
  linkedinUrl: 'https://www.linkedin.com/in/salemebrahim',
  githubUrl: 'https://github.com/',
  /** Add `public/cv.pdf` and set to `/cv.pdf` for download */
  cvUrl: null as string | null,
}

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'qualification', label: 'Qualification' },
  { id: 'contact', label: 'Contact' },
] as const

export type NavSectionId = (typeof navSections)[number]['id']

export const about = {
  bio: `I am a front-end developer who loves sharing experience with others. I studied software engineering at university and keep sharpening my craft with modern tools like React and Tailwind CSS. I care about clear UI, solid structure, and thoughtful details.`,
  intro: 'About Me',
}

/** Proficiency tier shown in the Tech Stack section (no arbitrary percentages). */
export type SkillLevel = 'Advanced' | 'Strong' | 'Good'

export type SkillEntry = {
  /** Stable key for icons and React `key`. */
  id: string
  name: string
  level: SkillLevel
}

export type SkillCategory = {
  id: string
  label: string
  skills: SkillEntry[]
}

/** Grouped skills for the Tech Stack section. */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { id: 'react', name: 'React', level: 'Advanced' },
      { id: 'typescript', name: 'TypeScript', level: 'Advanced' },
      { id: 'javascript', name: 'JavaScript', level: 'Strong' },
      { id: 'html5', name: 'HTML5', level: 'Strong' },
      { id: 'css3', name: 'CSS3', level: 'Strong' },
      { id: 'tailwind', name: 'Tailwind CSS', level: 'Advanced' },
    ],
  },
  {
    id: 'state-data',
    label: 'State & Data',
    skills: [
      { id: 'react-query', name: 'React Query', level: 'Strong' },
      { id: 'zustand', name: 'Zustand', level: 'Strong' },
      { id: 'rest', name: 'REST APIs', level: 'Strong' },
    ],
  },
  {
    id: 'forms-validation',
    label: 'Forms & Validation',
    skills: [
      { id: 'rhf', name: 'React Hook Form', level: 'Strong' },
      { id: 'zod', name: 'Zod', level: 'Good' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { id: 'git', name: 'Git', level: 'Strong' },
      { id: 'github', name: 'GitHub', level: 'Strong' },
      { id: 'gitlab', name: 'GitLab', level: 'Strong' },
    ],
  },
]

export type ProjectFilterId = 'all' | 'react' | 'typescript' | 'vite'

export const projectFilters: { id: ProjectFilterId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vite', label: 'Vite' },
]

export type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  /** Taller preview on small screens (e.g. main portfolio screenshot). */
  largeMobilePreview?: boolean
}

const projectFilterTag: Record<Exclude<ProjectFilterId, 'all'>, string> = {
  react: 'React',
  typescript: 'TypeScript',
  vite: 'Vite',
}

export function projectMatchesFilter(project: Project, filter: ProjectFilterId): boolean {
  if (filter === 'all') return true
  return project.tags.includes(projectFilterTag[filter])
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Portfolio',
    description:
      'A personal portfolio highlighting skills, journey, and contact—built with performance and accessibility in mind.',
    image: portfolioProjectImage,
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    liveUrl: '#projects',
    largeMobilePreview: true,
  },
  {
    id: 'p2',
    title: 'Al Amiah Cleaning — Mecca',
    description:
      'Mecca cleaning company site in React and TypeScript—services, coverage, and contact.',
    image: alAmiahCleaningImage,
    tags: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://www.alamiahcleaningmecca.com',
  },
]

export type QualificationKind = 'education' | 'experience'

export const qualificationTabs: { id: QualificationKind; label: string }[] = [
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
]

export const educationItems = [
  {
    title: 'General Secondary School',
    organization: 'West Tira Secondary School',
    date: '2015 – 2018',
    note: 'National-level academic competition; first place at Al-Hamul Center.',
  },
  {
    title: "Bachelor's — Software Engineering",
    organization: 'Kafr El-Sheikh University, Computers and Information',
    date: '2018 – 2022',
    note: 'Focus on software engineering fundamentals and modern web development.',
  },
]

export const experienceItems = [
  {
    title: 'Social Media Marketing',
    organization: 'Marketing Online | Riseoo | Egypt',
    date: '2022 – 2024',
    note: 'Content and campaigns across Instagram, TikTok, and Snapchat.',
  },
  {
    title: 'Customer Support',
    organization: 'Call Center | AlAhli Bank | Egypt',
    date: 'Nov 2024 – Apr 2025',
    note: 'Banking inquiries, cards, digital channels, and CRM documentation.',
  },
  {
    title: 'E‑Government Services',
    organization: 'Public Services | Thiqah Al-Injaz Office | Saudi Arabia',
    date: '2025 – Present',
    note: 'Absher, Qiwa, Muqeem, Balady — applications, renewals, and client guidance.',
  },
]

export { profileImage }

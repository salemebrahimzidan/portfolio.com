export type SkillEntry = {
  label: string
  value: number
}

export type StatItem = {
  icon: 'users' | 'gear' | 'trophy'
  title: string
  /** Shown when `valueFrom` is not used */
  value: string
  /** Override: compute years of experience from a fixed start year (see App.tsx) */
  valueFrom?: 'yearsSince2022'
}

export type ProjectItem = {
  title: string
  description: string
  href: string
  preview: 'a' | 'b' | 'c'
}

export type ServiceItem = {
  icon: 'web' | 'responsive' | 'ui' | 'seo'
  title: string
  description: string
}

export type SocialLink = {
  id: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'
  href: string
  label: string
}

export type JourneyEntry = {
  period: string
  title: string
  subtitle?: string
  bullets: string[]
}

export type LocaleMessages = {
  nav: {
    home: string
    about: string
    journey: string
    projects: string
    services: string
    contact: string
  }
  a11y: {
    goHome: string
    primaryNav: string
    switchLanguage: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    kicker: string
    title: string
    lead: string
    hireMe: string
    letsTalk: string
  }
  about: {
    title: string
    subtitle: string
    cardTitle: string
    cardBody: string
    skillsIntro: string
    codingSkillsTitle: string
    professionalSkillsTitle: string
  }
  stats: StatItem[]
  projects: {
    title: string
    subtitle: string
    viewProject: string
  }
  projectsList: ProjectItem[]
  services: {
    title: string
    subtitle: string
  }
  servicesList: ServiceItem[]
  codingSkills: SkillEntry[]
  professionalSkills: SkillEntry[]
  journey: {
    title: string
    subtitle: string
    educationTitle: string
    experienceTitle: string
    education: JourneyEntry[]
    experience: JourneyEntry[]
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    submit: string
    sentHint: string
    emailSubject: string
    emailBody: string
    phoneLabel: string
    phoneValue: string
    emailLabel: string
    emailDisplay: string
    connectTitle: string
  }
  socials: SocialLink[]
  footer: {
    copyright: string
  }
}

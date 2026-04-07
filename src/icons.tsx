import type { ProjectItem, ServiceItem, SocialLink, StatItem } from './providers/localeTypes'

const common = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function StatIcon({ kind }: { kind: StatItem['icon'] }) {
  if (kind === 'users') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (kind === 'gear') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export function ServiceIcon({ kind }: { kind: ServiceItem['icon'] }) {
  if (kind === 'web') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
  if (kind === 'responsive') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    )
  }
  if (kind === 'ui') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7M5 3H3v18h2M9 3h6" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}

export function SocialIcon({ id }: { id: SocialLink['id'] }) {
  if (id === 'instagram') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
      </svg>
    )
  }
  if (id === 'facebook') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  if (id === 'linkedin') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" rx="1" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
  if (id === 'whatsapp') {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24" aria-hidden>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )
}

export function projectPreviewClass(preview: ProjectItem['preview']): string {
  if (preview === 'b') return 'project-card__preview project-card__preview--b'
  if (preview === 'c') return 'project-card__preview project-card__preview--c'
  return 'project-card__preview project-card__preview--a'
}

import type { IconType } from 'react-icons/lib'
import { MdAccountTree } from 'react-icons/md'
import {
  SiCss,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

type SkillIconProps = {
  skillId: string
  /** Pixel size for the icon (width & height). */
  size?: number
  className?: string
}

type BrandIcon = {
  Icon: IconType
  color: string
  /** Optional glow tint (rgba) for hover ring on wrapper — set in SkillsSection; here for drop-shadow on icon */
  glow?: string
}

const BRAND: Record<string, BrandIcon> = {
  react: { Icon: SiReact, color: '#61DAFB', glow: 'rgba(97,218,251,0.45)' },
  typescript: { Icon: SiTypescript, color: '#3178C6', glow: 'rgba(49,120,198,0.45)' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E', glow: 'rgba(247,223,30,0.35)' },
  html5: { Icon: SiHtml5, color: '#E34F26', glow: 'rgba(227,79,38,0.4)' },
  css3: { Icon: SiCss, color: '#1572B6', glow: 'rgba(21,114,182,0.4)' },
  tailwind: { Icon: SiTailwindcss, color: '#06B6D4', glow: 'rgba(6,182,212,0.45)' },
  'react-query': { Icon: SiReactquery, color: '#FF4154', glow: 'rgba(255,65,84,0.4)' },
  /** No Simple Icon for Zustand — state-tree metaphor, warm accent. */
  zustand: { Icon: MdAccountTree, color: '#C08457', glow: 'rgba(192,132,87,0.35)' },
  rhf: { Icon: SiReacthookform, color: '#EC5990', glow: 'rgba(236,89,144,0.35)' },
  zod: { Icon: SiZod, color: '#3068B7', glow: 'rgba(48,104,183,0.4)' },
  rest: { Icon: TbApi, color: '#38BDF8', glow: 'rgba(56,189,248,0.4)' },
  git: { Icon: SiGit, color: '#F05032', glow: 'rgba(240,80,50,0.4)' },
  github: { Icon: SiGithub, color: '#E6EDF3', glow: 'rgba(230,237,243,0.35)' },
  gitlab: { Icon: SiGitlab, color: '#FC6D26', glow: 'rgba(252,109,38,0.4)' },
}

const DEFAULT: BrandIcon = {
  Icon: SiReact,
  color: '#94a3b8',
  glow: 'rgba(148,163,184,0.25)',
}

/**
 * Official / widely used marks from `react-icons` (Simple Icons, Tabler, MDI).
 * Brand hex on each icon; size is consistent across the Tech Stack grid.
 */
export function SkillIcon({ skillId, size = 44, className = '' }: SkillIconProps) {
  const { Icon, color, glow } = BRAND[skillId] ?? DEFAULT

  return (
    <Icon
      className={`shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 ${className}`}
      size={size}
      style={{
        color,
        filter: glow ? `drop-shadow(0 0 10px ${glow})` : undefined,
      }}
      aria-hidden
    />
  )
}


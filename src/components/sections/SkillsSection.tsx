import { memo } from 'react'
import type { SkillEntry, SkillLevel } from '../../data/portfolio'
import { skillCategories, skillsEnterpriseIntro } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SkillIcon } from './SkillIcon'

function tierFilled(level: SkillLevel): number {
  switch (level) {
    case 'Advanced':
      return 3
    case 'Strong':
      return 2
    default:
      return 1
  }
}

function levelBadgeClass(level: SkillLevel): string {
  switch (level) {
    case 'Advanced':
      return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
    case 'Strong':
      return 'border-sky-500/40 bg-sky-500/10 text-sky-100'
    default:
      return 'border-zinc-500/45 bg-zinc-700/50 text-zinc-200'
  }
}

const SkillCard = memo(function SkillCard({ skill, delay }: { skill: SkillEntry; delay: number }) {
  const filled = tierFilled(skill.level)

  return (
    <Reveal delayMs={delay}>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/40 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/35 hover:bg-zinc-900/70 hover:shadow-xl sm:p-6"
        aria-label={`${skill.name}, ${skill.level}`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />

        <span
          className={`absolute right-4 top-4 shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider sm:text-xs ${levelBadgeClass(skill.level)}`}
        >
          {skill.level}
        </span>

        <div className="flex flex-col items-center px-1 pt-2 text-center">
          <div className="mb-4 flex h-19 w-19 shrink-0 items-center justify-center rounded-2xl bg-zinc-950/70 ring-1 ring-zinc-700/90 transition-all duration-300 ease-out group-hover:scale-[1.06] group-hover:shadow-[0_0_28px_rgba(99,102,241,0.22)] group-hover:ring-white/15">
            <SkillIcon skillId={skill.id} size={46} />
          </div>
          <h3 className="max-w-[16rem] text-base font-semibold leading-snug tracking-tight text-zinc-50 sm:text-lg">
            {skill.name}
          </h3>
        </div>

        <div className="mt-6">
          <span className="sr-only">Proficiency tier: {skill.level}</span>
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i < filled ? 'bg-linear-to-r from-primary to-ref-cyan' : 'bg-zinc-700/90 group-hover:bg-zinc-600/90'
                }`}
              />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
})

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 bg-linear-to-b from-zinc-950 to-zinc-900 py-20 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <h2
              id="skills-heading"
              className="mb-4 bg-linear-to-r from-primary via-blue-500 to-ref-cyan bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
              Tech Stack
            </h2>
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              {skillsEnterpriseIntro}
            </p>
          </div>
        </Reveal>

        <div className="space-y-14 sm:space-y-16">
          {skillCategories.map((category, catIndex) => (
            <div key={category.id}>
              <Reveal delayMs={Math.min(catIndex * 45, 120)}>
                <div className="mb-6 flex items-center gap-3 sm:mb-8">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-ref-cyan shadow-[0_0_14px_rgba(95,219,250,0.45)]"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">{category.label}</h3>
                  <span className="h-px min-w-8 flex-1 bg-linear-to-r from-zinc-600 to-transparent" aria-hidden />
                </div>
              </Reveal>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    delay={Math.min(catIndex * 50 + skillIndex * 40, 220)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

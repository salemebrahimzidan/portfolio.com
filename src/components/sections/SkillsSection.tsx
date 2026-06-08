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
      return 'border-primary/20 bg-primary/5 text-primary'
    case 'Strong':
      return 'border-accent/20 bg-accent/5 text-accent'
    default:
      return 'border-border bg-secondary text-muted-foreground'
  }
}

const SkillCard = memo(function SkillCard({ skill, delay }: { skill: SkillEntry; delay: number }) {
  const filled = tierFilled(skill.level)

  return (
    <Reveal delayMs={delay}>
      <article
        className="surface-card flex h-full flex-col p-5 transition-shadow hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] sm:p-6"
        aria-label={`${skill.name}, ${skill.level}`}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex size-19 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary">
            <SkillIcon skillId={skill.id} size={42} />
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider sm:text-xs ${levelBadgeClass(skill.level)}`}
          >
            {skill.level}
          </span>
        </div>

        <h3 className="mb-6 text-base font-semibold leading-snug tracking-tight text-primary sm:text-lg">
          {skill.name}
        </h3>

        <div className="mt-auto">
          <span className="sr-only">Proficiency tier: {skill.level}</span>
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < filled ? 'bg-primary' : 'bg-border'
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
      className="section-shell rounded-3xl bg-secondary/60"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <div className="mb-14 max-w-3xl sm:mb-16 md:mx-auto md:text-center">
          <h2 id="skills-heading" className="section-title mb-4">
            Tech Stack
          </h2>
          <p className="section-lead md:mx-auto">{skillsEnterpriseIntro}</p>
        </div>
      </Reveal>

      <div className="space-y-14 sm:space-y-16">
        {skillCategories.map((category, catIndex) => (
          <div key={category.id}>
            <Reveal delayMs={Math.min(catIndex * 45, 120)}>
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <h3 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                  {category.label}
                </h3>
                <span className="h-px min-w-8 flex-1 bg-border" aria-hidden />
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
    </section>
  )
}

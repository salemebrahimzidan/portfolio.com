import type { SkillEntry } from '../../data/portfolio'
import { skillCategories } from '../../data/portfolio'
import type { SkillCategoryId } from '../../providers/localeTypes'
import { useI18n } from '../../providers/i18n-context'
import { Reveal } from '../ui/Reveal'
import { SkillIcon } from './SkillIcon'

function TechTile({ skill }: { skill: SkillEntry }) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 rounded-lg border border-border bg-white px-2.5 py-2 transition-colors hover:border-primary/20 hover:bg-secondary sm:gap-3 sm:px-3 sm:py-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center">
        <SkillIcon skillId={skill.id} />
      </span>
      <span dir="ltr" className="min-w-0 text-sm font-semibold leading-snug tracking-tight text-primary">
        {skill.name}
      </span>
    </li>
  )
}

function isSkillCategoryId(id: string): id is SkillCategoryId {
  return id === 'frontend' || id === 'state-data' || id === 'forms-validation' || id === 'tools'
}

export function SkillsSection() {
  const { t, messages } = useI18n()

  return (
    <section
      id="skills"
      className="section-shell rounded-3xl bg-secondary/60 px-4 sm:px-6 lg:px-8"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <div className="mb-8 max-w-3xl sm:mb-10 md:mx-auto md:text-center">
          <h2 id="skills-heading" className="section-title mb-4">
            {t('skills.title')}
          </h2>
          <p className="section-lead md:mx-auto">{t('skills.intro')}</p>
        </div>
      </Reveal>

      <div className="space-y-6 sm:space-y-8">
        {skillCategories.map((category, catIndex) => (
          <Reveal key={category.id} delayMs={Math.min(catIndex * 45, 120)}>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <h3 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                {isSkillCategoryId(category.id) ? messages.skills.categories[category.id] : category.label}
              </h3>
              <span className="h-px min-w-8 flex-1 bg-border" aria-hidden />
            </div>
            <div className="rounded-xl border border-border bg-white p-3 sm:p-4 md:p-5">
              <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
                {category.skills.map((skill) => (
                  <TechTile key={skill.id} skill={skill} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { memo } from 'react'
import { caseStudies } from '../../data/portfolio'
import type { ProjectCopyId } from '../../providers/localeTypes'
import { useI18n } from '../../providers/i18n-context'
import { Reveal } from '../ui/Reveal'

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  highlights,
  technologies,
  image,
  demoUrl,
  demoLabel,
  liveUrl,
  liveLabel,
}: (typeof caseStudies)[number]) {
  const { t } = useI18n()
  const liveExternal = liveUrl.startsWith('http')
  const demoExternal = demoUrl?.startsWith('http') ?? false

  return (
    <article className="surface-card group flex h-full w-full flex-col overflow-hidden transition-shadow hover:shadow-[0_16px_48px_rgba(15,23,42,0.14)]">
      <div className="relative h-48 shrink-0 overflow-hidden bg-secondary sm:h-52">
        <img
          src={image}
          alt={t('projects.previewAlt', { title })}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <h3 className="mb-3 text-lg font-bold tracking-tight text-primary sm:text-xl">{title}</h3>
        {technologies && technologies.length > 0 ? (
          <ul className="mb-4 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <li key={tech}>
                <span dir="ltr" className="inline-flex rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {description}
        </p>

        <p className="section-eyebrow mb-3">{t('projects.highlightsLabel')}</p>
        <ul className="mb-6 flex-1 space-y-2.5 text-sm leading-snug text-muted-foreground sm:text-[0.9375rem]">
          {highlights.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="list-dot" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:flex-wrap sm:items-center">
          {demoUrl ? (
            <a
              href={demoUrl}
              {...(demoExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="btn-primary w-full px-4 py-2.5 text-center sm:w-auto"
            >
              {demoLabel}
              {demoExternal ? <span className="sr-only">{t('projects.opensInNewTab')}</span> : null}
            </a>
          ) : null}
          <a
            href={liveUrl}
            {...(liveExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="btn-outline w-full px-4 py-2.5 text-center sm:w-auto"
          >
            {liveLabel}
            {liveExternal ? <span className="sr-only">{t('projects.opensInNewTab')}</span> : null}
          </a>
        </div>
      </div>
    </article>
  )
})

function isProjectCopyId(id: string): id is ProjectCopyId {
  return id in {
    'aliman-rouh-golden': true,
    'aliman-rouh': true,
    p2: true,
    p1: true,
  }
}

export function ProjectsSection() {
  const { t, messages } = useI18n()

  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-heading">
      <Reveal>
        <div className="mb-12 max-w-3xl md:mx-auto md:text-center">
          <p className="section-eyebrow md:mx-auto">{t('projects.eyebrow')}</p>
          <h2 id="projects-heading" className="section-title mb-4">
            {t('projects.title')}
          </h2>
          <p className="section-lead md:mx-auto">{t('projects.subtitle')}</p>
        </div>
      </Reveal>

      <div className="grid max-w-5xl grid-cols-1 items-stretch gap-6 sm:gap-8 md:mx-auto lg:grid-cols-2">
        {caseStudies.map((project, i) => {
          const copy = isProjectCopyId(project.id) ? messages.projects.items[project.id] : undefined
          return (
            <Reveal key={project.id} delayMs={Math.min(i * 70, 140)} className="h-full min-h-0">
              <ProjectCard
                {...project}
                title={copy?.title ?? project.title}
                description={copy?.description ?? project.description}
                highlights={copy?.highlights ?? project.highlights}
                demoLabel={copy?.demoLabel ?? project.demoLabel}
                liveLabel={copy?.liveLabel ?? project.liveLabel}
              />
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

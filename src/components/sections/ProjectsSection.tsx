import { memo } from 'react'
import { caseStudies } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  highlights,
  image,
  demoUrl,
  demoLabel,
  liveUrl,
  liveLabel,
}: (typeof caseStudies)[number]) {
  const liveExternal = liveUrl.startsWith('http')
  const demoExternal = demoUrl?.startsWith('http') ?? false

  return (
    <article className="surface-card group flex h-full w-full flex-col overflow-hidden transition-shadow hover:shadow-[0_16px_48px_rgba(15,23,42,0.14)]">
      <div className="relative h-48 shrink-0 overflow-hidden bg-secondary sm:h-52">
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-bold tracking-tight text-primary sm:text-xl">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {description}
        </p>

        <p className="section-eyebrow mb-3">Highlights</p>
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
              className="btn-primary px-4 py-2.5 text-center"
            >
              {demoLabel ?? 'Demo'}
            </a>
          ) : null}
          <a
            href={liveUrl}
            {...(liveExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`btn-outline px-4 py-2.5 ${demoUrl ? '' : 'w-full sm:w-auto'}`}
          >
            {liveLabel ?? 'Learn more'}
          </a>
        </div>
      </div>
    </article>
  )
})

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-heading">
      <Reveal>
        <div className="mb-12 max-w-3xl md:mx-auto md:text-center">
          <p className="section-eyebrow md:mx-auto">Selected work</p>
          <h2 id="projects-heading" className="section-title mb-4">
            Case studies
          </h2>
          <p className="section-lead md:mx-auto">
            Two shipped interfaces—concise takeaways, same attention to performance and UX you&apos;d
            expect in product work.
          </p>
        </div>
      </Reveal>

      <div className="grid max-w-5xl grid-cols-1 items-stretch gap-6 sm:gap-8 md:mx-auto lg:grid-cols-2">
        {caseStudies.map((p, i) => (
          <Reveal key={p.id} delayMs={Math.min(i * 70, 140)} className="h-full min-h-0">
            <ProjectCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

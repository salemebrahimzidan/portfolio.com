import { memo, useMemo, useState } from 'react'
import {
  type ProjectFilterId,
  projectFilters,
  projectMatchesFilter,
  projects,
} from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  largeMobilePreview,
}: (typeof projects)[number]) {
  const liveExternal = liveUrl.startsWith('http')
  const imageFrame = largeMobilePreview
    ? 'h-64 min-h-[16rem] w-full sm:min-h-0 sm:h-56 md:h-52 lg:h-48'
    : 'h-48'
  const objectPosition = largeMobilePreview ? 'object-top sm:object-center' : 'object-center'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-600 bg-gray-800 shadow-lg transition-shadow hover:shadow-xl">
      <div className={`${imageFrame} shrink-0 overflow-hidden bg-gray-900`}>
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${objectPosition}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 shrink-0 text-xl font-bold">{title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">{description}</p>
        <div className="mb-4 flex shrink-0 flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-md bg-gray-700 px-2 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
        <div className="shrink-0">
          <a
            href={liveUrl}
            {...(liveExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-block rounded border border-gray-200 bg-gray-200 px-3 py-2 text-sm font-medium text-[#143D95]"
          >
            Live Demo
          </a>
        </div>
      </div>
    </article>
  )
})

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilterId>('all')

  const list = useMemo(() => {
    return projects.filter((p) => projectMatchesFilter(p, filter))
  }, [filter])

  return (
    <section id="projects" className="scroll-mt-20 py-20" aria-labelledby="projects-heading">
      <Reveal>
        <div className="text-center">
          <h2 id="projects-heading" className="mb-6 text-3xl font-bold text-[#143D95]">
            Featured Projects
          </h2>
        </div>
      </Reveal>

      <Reveal delayMs={40}>
        <div className="mb-12 flex flex-wrap justify-center gap-4" role="tablist" aria-label="Project filters">
          {projectFilters.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border border-gray-900 bg-[#143D95] text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-stretch gap-8 sm:grid-cols-2">
        {list.length === 0 ? (
          <p className="col-span-full py-12 text-center text-gray-400">No projects in this category yet.</p>
        ) : (
          list.map((p, i) => (
            <Reveal
              key={p.id}
              className={`h-full min-w-0${list.length === 1 ? ' w-full sm:col-span-2 sm:mx-auto sm:max-w-2xl' : ''}`}
              delayMs={Math.min(i * 50, 200)}
            >
              <ProjectCard {...p} />
            </Reveal>
          ))
        )}
      </div>
    </section>
  )
}

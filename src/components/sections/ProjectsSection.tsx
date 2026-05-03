import { memo } from 'react'
import { motion } from 'framer-motion'
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
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/50 shadow-lg shadow-black/25 ring-1 ring-white/5 transition-shadow duration-300 hover:border-zinc-700/90 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="relative h-44 shrink-0 overflow-hidden bg-zinc-950 sm:h-48">
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 to-transparent opacity-80"
          aria-hidden
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">{description}</p>

        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-zinc-500">
          Highlights
        </p>
        <ul className="mb-6 flex-1 space-y-2 text-sm leading-snug text-zinc-300 sm:text-[0.9375rem]">
          {highlights.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-indigo-400/90" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 border-t border-zinc-800/80 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
          {demoUrl ? (
            <motion.a
              href={demoUrl}
              {...(demoExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            >
              {demoLabel ?? 'Demo'}
            </motion.a>
          ) : null}
          <motion.a
            href={liveUrl}
            {...(liveExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/60 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800/80 ${
              demoUrl ? '' : 'w-full sm:w-auto'
            }`}
          >
            {liveLabel ?? 'Learn more'}
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
})

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 py-20 md:py-24"
      aria-labelledby="projects-heading"
    >
      <Reveal>
        <div className="mx-auto mb-10 w-full max-w-2xl text-start md:mb-12 md:max-w-3xl md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Case studies
          </h2>
          <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
            Two shipped interfaces—concise takeaways, same attention to performance and UX you&apos;d
            expect in product work.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2">
        {caseStudies.map((p, i) => (
          <Reveal key={p.id} delayMs={Math.min(i * 70, 140)} className="h-full min-h-0">
            <ProjectCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

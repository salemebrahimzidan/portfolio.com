import { motion } from 'framer-motion'
import { site } from '../../data/portfolio'

type HeroSectionProps = {
  onViewProjects: () => void
  onContact: () => void
  onDownloadCv: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HeroSection({ onViewProjects, onContact, onDownloadCv }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="scroll-mt-20 px-4 pt-8 pb-14 sm:px-6 sm:pt-10 md:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-4xl text-start lg:text-center">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90 sm:text-sm"
        >
          {site.heroKicker}
        </motion.p>

        <motion.h1
          id="hero-heading"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-5 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-[2.65rem]"
        >
          {site.heroHeadline}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg md:mb-12 lg:mx-auto"
        >
          {site.heroSubline}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-center">
            <motion.button
              type="button"
              onClick={onViewProjects}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400"
            >
              View My Work
            </motion.button>
            <motion.button
              type="button"
              onClick={onContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/60 px-7 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:bg-zinc-800/80"
            >
              Hire Me
            </motion.button>
          </div>
          <p className="max-w-xl text-sm font-normal leading-relaxed text-zinc-500 sm:text-[0.9375rem] lg:mx-auto">
            {site.heroCtaSupportLine}
          </p>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 lg:justify-center"
        >
          {site.cvUrl ? (
            <a
              href={site.cvUrl}
              download
              className="font-medium text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
            >
              Download CV
            </a>
          ) : (
            <button
              type="button"
              onClick={onDownloadCv}
              className="font-medium text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
            >
              Download CV
            </button>
          )}
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="text-zinc-500">React &amp; TypeScript · Enterprise UI delivery</span>
        </motion.div>
      </div>
    </section>
  )
}

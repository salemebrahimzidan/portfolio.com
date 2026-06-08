import { motion } from 'framer-motion'
import { site } from '../../data/portfolio'

type HeroSectionProps = {
  onViewProjects: () => void
  onContact: () => void
  onDownloadCv: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HeroSection({ onViewProjects, onContact, onDownloadCv }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="scroll-mt-24 pb-16 pt-4 md:pb-24 md:pt-8"
      aria-labelledby="hero-heading"
    >
      <div className="section-panel relative overflow-hidden px-6 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-accent-warm/5 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-start lg:text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="section-eyebrow lg:mx-auto"
          >
            {site.heroKicker}
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="section-title mb-5"
          >
            {site.heroHeadline}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="section-lead mb-10 md:mb-12 lg:mx-auto"
          >
            {site.heroSubline}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-center">
              <button type="button" onClick={onViewProjects} className="btn-primary">
                View My Work
              </button>
              <button type="button" onClick={onContact} className="btn-outline">
                Hire Me
              </button>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:mx-auto">
              {site.heroCtaSupportLine}
            </p>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-8 text-sm text-muted-foreground lg:justify-center"
          >
            {site.cvUrl ? (
              <a href={site.cvUrl} download className="font-semibold text-accent hover:underline">
                Download CV
              </a>
            ) : (
              <button
                type="button"
                onClick={onDownloadCv}
                className="font-semibold text-accent hover:underline"
              >
                Download CV
              </button>
            )}
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>React &amp; TypeScript · Enterprise UI delivery</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

type FinalCtaSectionProps = {
  onContact: () => void
}

export function FinalCtaSection({ onContact }: FinalCtaSectionProps) {
  return (
    <section
      id="cta"
      className="scroll-mt-20 py-16 md:py-20"
      aria-labelledby="cta-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-linear-to-br from-indigo-950/50 via-zinc-900/80 to-zinc-950 p-8 shadow-2xl shadow-indigo-950/30 ring-1 ring-indigo-500/10 sm:p-10 md:p-12"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-indigo-500/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-violet-500/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="mb-6 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-[1.75rem] md:leading-snug"
          >
            Need a scalable frontend for your system? I can help you build it professionally.
          </h2>
          <motion.button
            type="button"
            onClick={onContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg transition-colors hover:bg-zinc-100"
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

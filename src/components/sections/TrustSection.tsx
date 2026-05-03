import { motion } from 'framer-motion'
import { trust } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

export function TrustSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-20 border-y border-zinc-800/80 bg-zinc-950/80 py-16 md:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto w-full max-w-4xl px-4 text-start sm:px-6 md:text-center lg:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
            Enterprise SaaS
          </p>
          <h2
            id="trust-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Trust &amp; credibility
          </h2>
          <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 sm:text-xl md:mx-auto">
            {trust.statement}
          </p>
        </Reveal>

        <Reveal delayMs={60}>
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Core stack
          </p>
          <ul className="flex max-w-2xl flex-wrap justify-start gap-2 sm:gap-3 md:mx-auto md:max-w-none md:justify-center">
            {trust.highlightStack.map((tech, i) => (
              <motion.li
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i, duration: 0.35 }}
              >
                <span className="inline-flex rounded-full border border-zinc-700/90 bg-zinc-900/70 px-3.5 py-1.5 text-sm font-medium text-zinc-200 shadow-sm transition-colors hover:border-indigo-500/40 hover:text-white">
                  {tech}
                </span>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

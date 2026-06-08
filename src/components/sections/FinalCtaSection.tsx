import { Reveal } from '../ui/Reveal'

type FinalCtaSectionProps = {
  onContact: () => void
}

export function FinalCtaSection({ onContact }: FinalCtaSectionProps) {
  return (
    <section id="cta" className="scroll-mt-24 py-12 md:py-16" aria-labelledby="cta-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-center shadow-[0_18px_55px_rgba(13,33,73,0.25)] sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/5 blur-2xl"
            aria-hidden
          />
          <h2
            id="cta-heading"
            className="relative mb-8 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Need a scalable frontend for your system? I can help you build it professionally.
          </h2>
          <button type="button" onClick={onContact} className="btn-accent relative px-8">
            Contact Me
          </button>
        </div>
      </Reveal>
    </section>
  )
}

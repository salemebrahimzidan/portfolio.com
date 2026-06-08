import { trust } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

export function TrustSection() {
  return (
    <section
      id="trust"
      className="section-shell border-y border-border bg-white"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-3xl md:text-center">
        <Reveal>
          <p className="section-eyebrow md:mx-auto">Enterprise SaaS</p>
          <h2 id="trust-heading" className="section-title mb-6">
            Trust &amp; credibility
          </h2>
          <p className="section-lead mb-10 md:mx-auto">{trust.statement}</p>
        </Reveal>

        <Reveal delayMs={60}>
          <p className="section-eyebrow mb-4 md:mx-auto">Core stack</p>
          <ul className="flex flex-wrap justify-start gap-2 sm:gap-3 md:justify-center">
            {trust.highlightStack.map((tech) => (
              <li key={tech}>
                <span className="pill">{tech}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

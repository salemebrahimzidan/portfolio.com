import { trust } from '../../data/portfolio'
import { useI18n } from '../../providers/i18n-context'
import { Reveal } from '../ui/Reveal'

export function TrustSection() {
  const { t } = useI18n()

  return (
    <section
      id="trust"
      className="section-shell border-y border-border bg-white"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-3xl md:text-center">
        <Reveal>
          <p className="section-eyebrow md:mx-auto">{t('trust.eyebrow')}</p>
          <h2 id="trust-heading" className="section-title mb-6">
            {t('trust.title')}
          </h2>
          <p className="section-lead mb-10 md:mx-auto">{t('trust.statement')}</p>
        </Reveal>

        <Reveal delayMs={60}>
          <p className="section-eyebrow mb-4 md:mx-auto">{t('trust.coreStack')}</p>
          <ul className="flex flex-wrap justify-start gap-2 sm:gap-3 md:justify-center">
            {trust.highlightStack.map((tech) => (
              <li key={tech}>
                <span dir="ltr" className="pill">{tech}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

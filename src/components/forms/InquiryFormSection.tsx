import { type FormEvent, useState } from 'react'
import { site } from '../../data/portfolio'
import { useI18n } from '../../providers/i18n-context'
import { Reveal } from '../ui/Reveal'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'

const labelClass = 'locale-label mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent'

export function ContactSection() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    setStatus(null)
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string)
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: formData })
      const data = (await response.json()) as { success?: boolean }
      if (response.ok && data.success) {
        setStatus('success')
        form.reset()
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="section-shell" aria-labelledby="contact-heading">
      <Reveal>
        <div className="mb-14 text-center md:mb-16">
          <h2 id="contact-heading" className="section-title mb-4">
            {t('contact.title')}
          </h2>
          <p className="section-lead mx-auto">{t('contact.subtitle')}</p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="surface-card space-y-6 p-6 md:p-8">
            <div>
              <h3 className={labelClass}>{t('contact.location')}</h3>
              <p className="text-base font-medium text-primary">{t('contact.locationValue')}</p>
            </div>
            <div>
              <h3 className={labelClass}>{t('contact.email')}</h3>
              <p dir="ltr" className="text-base font-medium text-primary rtl:text-right">
                {site.email}
              </p>
            </div>
            {site.phone ? (
              <div>
                <h3 className={labelClass}>{t('contact.phone')}</h3>
                <p dir="ltr" className="text-base font-medium text-primary rtl:text-right">
                  {site.phone}
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <form className="surface-card space-y-5 p-6 md:p-8" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="New Contact Message" />
            <input type="hidden" name="from_name" value="Website Contact Form" />
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-primary">
                {t('contact.name')}
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                dir="auto"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-primary">
                {t('contact.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="input-field rtl:text-right"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-primary">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                dir="auto"
                className="input-field resize-none"
              />
            </div>
            <button type="submit" disabled={isSending} className="btn-primary w-full disabled:opacity-50">
              {isSending ? t('contact.sending') : t('contact.submit')}
            </button>
            {status ? (
              <p
                className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-accent-warm'}`}
                role="status"
              >
                {status === 'success' ? t('contact.success') : t('contact.error')}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

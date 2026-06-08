import { type FormEvent, useState } from 'react'
import { site } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

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
        setStatusMessage('Message sent successfully.')
        form.reset()
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setStatusMessage('Failed to send message. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMessage('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="section-shell" aria-labelledby="contact-heading">
      <Reveal>
        <div className="mb-14 text-center md:mb-16">
          <h2 id="contact-heading" className="section-title mb-4">
            Get In Touch
          </h2>
          <p className="section-lead mx-auto">
            Send a message and I will get back to you as soon as I can.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="surface-card space-y-6 p-6 md:p-8">
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Location
              </h3>
              <p className="text-base font-medium text-primary">{site.location}</p>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Email
              </h3>
              <p className="text-base font-medium text-primary">{site.email}</p>
            </div>
            {site.phone ? (
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Phone
                </h3>
                <p className="text-base font-medium text-primary">{site.phone}</p>
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
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-primary">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field resize-none"
              />
            </div>
            <button type="submit" disabled={isSending} className="btn-primary w-full disabled:opacity-50">
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            {status ? (
              <p
                className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-accent-warm'}`}
                role="status"
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

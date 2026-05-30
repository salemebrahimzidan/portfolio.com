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
      const data = await response.json() as { success?: boolean }
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
    <section id="contact" className="scroll-mt-20 py-20 md:py-24" aria-labelledby="contact-heading">
      <Reveal>
        <div className="mb-16 text-center">
          <h2 id="contact-heading" className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Get In Touch</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">Send a message and I will get back to you as soon as I can.</p>
        </div>
      </Reveal>
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal className="space-y-6">
          <div><h3 className="mb-1 text-xl font-bold">Location</h3><p className="text-zinc-400">{site.location}</p></div>
          <div><h3 className="mb-1 text-xl font-bold">Email</h3><p className="text-zinc-400">{site.email}</p></div>
          {site.phone ? <div><h3 className="mb-1 text-xl font-bold">Phone</h3><p className="text-zinc-400">{site.phone}</p></div> : null}
        </Reveal>
        <Reveal delayMs={80}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="New Contact Message" />
            <input type="hidden" name="from_name" value="Website Contact Form" />
            <div><label htmlFor="name" className="mb-2 block font-medium">Name</label><input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-zinc-700 bg-zinc-900/30 px-4 py-3 text-zinc-100" /></div>
            <div><label htmlFor="email" className="mb-2 block font-medium">Email</label><input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-zinc-700 bg-zinc-900/30 px-4 py-3 text-zinc-100" /></div>
            <div><label htmlFor="message" className="mb-2 block font-medium">Message</label><textarea id="message" name="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900/30 px-4 py-3 text-zinc-100" /></div>
            <button type="submit" disabled={isSending} className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">{isSending ? 'Sending...' : 'Send Message'}</button>
            {status ? <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`} role="status">{statusMessage}</p> : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

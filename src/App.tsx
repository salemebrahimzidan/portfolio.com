import './App.css'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import salemPhoto from './assets/salem.jpeg'
import {
  projectPreviewClass,
  ServiceIcon,
  SocialIcon,
  StatIcon,
} from './icons'
import { useI18n } from './providers/I18nProvider'
import type { JourneyEntry, SkillEntry, StatItem } from './providers/localeTypes'

const CAREER_START_YEAR = 2022

function statValueDisplay(s: StatItem, locale: 'en' | 'ar'): string {
  if (s.valueFrom === 'yearsSince2022') {
    const years = Math.max(0, new Date().getFullYear() - CAREER_START_YEAR)
    return locale === 'ar' ? `+${years}` : `${years}+`
  }
  return s.value
}

type NavItem = { id: string; label: string }

function App() {
  const { locale, setLocale, t, messages } = useI18n()

  const nav = useMemo<NavItem[]>(
    () => [
      { id: 'home', label: messages.nav.home },
      { id: 'about', label: messages.nav.about },
      { id: 'journey', label: messages.nav.journey },
      { id: 'projects', label: messages.nav.projects },
      { id: 'services', label: messages.nav.services },
      { id: 'contact', label: messages.nav.contact },
    ],
    [messages],
  )

  const [activeId, setActiveId] = useState('home')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 })
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const heroPhotoRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const ids = nav.map((n) => n.id)
    sectionsRef.current = Object.fromEntries(
      ids.map((id) => [id, document.getElementById(id)]),
    )

    const els = ids
      .map((id) => sectionsRef.current[id])
      .filter((el): el is HTMLElement => Boolean(el))

    if (els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (!visible?.target) return
        setActiveId((visible.target as HTMLElement).id)
      },
      { root: null, threshold: [0.15, 0.3, 0.45], rootMargin: '-18% 0px -58% 0px' },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [nav])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const root = heroPhotoRef.current
    if (!root) return

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const nx = (e.clientX - cx) / (r.width / 2)
      const ny = (e.clientY - cy) / (r.height / 2)
      setPhotoTilt({
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      })
    }
    const onLeave = () => setPhotoTilt({ x: 0, y: 0 })

    root.addEventListener('mousemove', onMove)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
    }
  }, [reduceMotion])

  const scrollToId = (id: string) => {
    const el = sectionsRef.current[id] ?? document.getElementById(id)
    if (!el) return
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }

  const goToSection = (id: string) => {
    scrollToId(id)
    setMobileNavOpen(false)
  }

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileNavOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 881px)')
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 880px)')
    if (!mq.matches || !mobileNavOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen])

  const onHireMe = () => scrollToId('contact')
  const onLetsTalk = () => scrollToId('contact')

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'sent'>('idle')

  const submitContact = (e: FormEvent) => {
    e.preventDefault()
    const name = contactName.trim()
    const email = contactEmail.trim()
    const message = contactMessage.trim()
    if (!name || !email || !message) return

    const subject = t('contact.emailSubject', { name })
    const body = t('contact.emailBody', { name, email, message })
    window.location.href = `mailto:${messages.contact.emailDisplay}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setContactStatus('sent')
  }

  const year = String(new Date().getFullYear())

  const journeyEntryEl = (e: JourneyEntry, idx: number, keyPrefix: string) => (
    <div className="journey__entry" key={`${keyPrefix}-${idx}`}>
      <div className="journey__period muted" dir="ltr">
        {e.period}
      </div>
      <div className="journey__body">
        <h4 className="journey__entryTitle">{e.title}</h4>
        {e.subtitle ? <p className="journey__subtitle muted">{e.subtitle}</p> : null}
        <ul className="journey__bullets">
          {e.bullets.map((line, bi) => (
            <li key={`${keyPrefix}-${idx}-b-${bi}`}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  const skillRows = (items: SkillEntry[]) =>
    items.map((s) => (
      <div className="skill" key={s.label}>
        <div className="skill__row">
          <span className="skill__label" dir="ltr">
            {s.label}
          </span>
          <span className="skill__value" dir="ltr">
            {s.value}%
          </span>
        </div>
        <div
          className="skill__bar"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          aria-hidden="true"
        >
          <div className="skill__fill" style={{ width: `${s.value}%` }} />
        </div>
      </div>
    ))

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar__inner">
          <button
            className="brand"
            type="button"
            onClick={() => goToSection('home')}
            aria-label={t('a11y.goHome')}
          >
            <span className="brand__dot" aria-hidden="true" />
            Salem
          </button>

          <div className="topbar__end">
            <button
              type="button"
              className="nav-menu-btn"
              aria-expanded={mobileNavOpen}
              aria-controls="primary-nav"
              aria-label={mobileNavOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span className="nav-menu-btn__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <nav
              id="primary-nav"
              className={`nav ${mobileNavOpen ? 'is-open' : ''}`}
              aria-label={t('a11y.primaryNav')}
            >
              {nav.map((item) => (
                <button
                  key={item.id}
                  className={`nav__link ${activeId === item.id ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => goToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="topbar__tools">
              <button
                className="toolbar-btn toolbar-btn--locale"
                type="button"
                onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
                aria-label={t('a11y.switchLanguage')}
              >
                <span className="toolbar-btn__lang">
                  {locale === 'en' ? 'عربي' : 'EN'}
                </span>
              </button>
            </div>
          </div>
        </div>
        {mobileNavOpen ? (
          <button
            type="button"
            className="nav-backdrop"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}
      </header>

      <main>
        <section id="home" className="section section--dark hero">
          <div className="container hero__grid">
            <div className="hero__intro">
              <p className="kicker">{messages.hero.kicker}</p>
              <h1 className="hero__title hero__title--gradient">{messages.hero.title}</h1>
            </div>

            <div className="hero__visual" ref={heroPhotoRef} aria-hidden="true">
              <div className="hero__photoStage">
                <div className="glow" />
                <div
                  className="hero__photoTilt"
                  style={
                    reduceMotion
                      ? undefined
                      : {
                          transform: `perspective(960px) rotateX(${-photoTilt.y * 8}deg) rotateY(${photoTilt.x * 8}deg)`,
                        }
                  }
                >
                  <div className="portrait">
                    <span className="portrait__orbit" aria-hidden="true" />
                    <div className="portrait__inner">
                      <img src={salemPhoto} alt="" loading="eager" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__rest">
              <p className="hero__lead">{messages.hero.lead}</p>
              <div className="hero__actions">
                <button className="btn btn--primary" type="button" onClick={onHireMe}>
                  {messages.hero.hireMe}
                </button>
                <button className="btn btn--ghost" type="button" onClick={onLetsTalk}>
                  {messages.hero.letsTalk}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section section--dark">
          <div className="container">
            <div className="section__head section__head--center">
              <h2>{messages.about.title}</h2>
              <p className="muted">{messages.about.subtitle}</p>
            </div>

            <div className="about__layout">
              <div className="about__main">
                <h3 className="about__heading">{messages.about.cardTitle}</h3>
                <p className="about__text">{messages.about.cardBody}</p>

                <ul className="stats">
                  {messages.stats.map((s) => (
                    <li className="stat-card" key={s.title}>
                      <div className="stat-card__icon" aria-hidden>
                        <StatIcon kind={s.icon} />
                      </div>
                      <div className="stat-card__meta">
                        <div className="stat-card__value" dir="ltr">
                          {statValueDisplay(s, locale)}
                        </div>
                        <div className="stat-card__title">{s.title}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="about__skills">
                  <p className="about__skillsIntro muted">{messages.about.skillsIntro}</p>
                  <div className="about__skillsGrid">
                    <div className="about__skillsPanel">
                      <h4 className="about__skillsCardTitle">{messages.about.codingSkillsTitle}</h4>
                      <div className="skills skills--compact">{skillRows(messages.codingSkills)}</div>
                    </div>
                    <div className="about__skillsPanel">
                      <h4 className="about__skillsCardTitle">
                        {messages.about.professionalSkillsTitle}
                      </h4>
                      <div className="skills skills--compact">
                        {skillRows(messages.professionalSkills)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section section--dark">
          <div className="container">
            <div className="section__head section__head--center">
              <h2>{messages.journey.title}</h2>
              <p className="muted">{messages.journey.subtitle}</p>
            </div>
            <div className="journey__grid">
              <div className="journey__column">
                <h3 className="journey__columnTitle">{messages.journey.educationTitle}</h3>
                <div className="journey__entries">
                  {messages.journey.education.map((e, i) => journeyEntryEl(e, i, 'ed'))}
                </div>
              </div>
              <div className="journey__column">
                <h3 className="journey__columnTitle">{messages.journey.experienceTitle}</h3>
                <div className="journey__entries">
                  {messages.journey.experience.map((e, i) => journeyEntryEl(e, i, 'ex'))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section--dark">
          <div className="container">
            <div className="section__head section__head--center">
              <h2>{messages.projects.title}</h2>
              <p className="muted">{messages.projects.subtitle}</p>
            </div>

            <div className="projects-grid">
              {messages.projectsList.map((p) => (
                <article className="project-card" key={p.title}>
                  <div className={projectPreviewClass(p.preview)} />
                  <div className="project-card__body">
                    <h3 className="project-card__title">{p.title}</h3>
                    <p className="project-card__desc">{p.description}</p>
                    <a className="btn btn--primary btn--sm" href={p.href}>
                      {messages.projects.viewProject}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section section--dark">
          <div className="container">
            <div className="section__head section__head--center">
              <h2>{messages.services.title}</h2>
              <p className="muted">{messages.services.subtitle}</p>
            </div>

            <div className="services-grid">
              {messages.servicesList.map((s) => (
                <article className="service-card" key={s.title}>
                  <div className="service-card__icon" aria-hidden>
                    <ServiceIcon kind={s.icon} />
                  </div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section--dark contact-section">
          <div className="container">
            <div className="section__head section__head--center">
              <h2>{messages.contact.title}</h2>
              <p className="muted">{messages.contact.subtitle}</p>
            </div>

            <div className="contact__layout">
              <form className="contact__form card card--elevated" onSubmit={submitContact}>
                <div className="fields fields--stack">
                  <label className="field field--full">
                    <span className="field__label">{messages.contact.name}</span>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={messages.contact.namePlaceholder}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="field field--full">
                    <span className="field__label">{messages.contact.email}</span>
                    <input
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder={messages.contact.emailPlaceholder}
                      autoComplete="email"
                      type="email"
                      dir="ltr"
                      required
                    />
                  </label>

                  <label className="field field--full">
                    <span className="field__label">{messages.contact.message}</span>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={messages.contact.messagePlaceholder}
                      rows={5}
                      required
                    />
                  </label>
                </div>

                <div className="contact__actions">
                  <button className="btn btn--primary" type="submit">
                    {messages.contact.submit}
                  </button>
                  {contactStatus === 'sent' ? (
                    <span className="pill" role="status">
                      {messages.contact.sentHint}
                    </span>
                  ) : null}
                </div>
              </form>

              <aside className="contact__aside">
                <div className="contact__block">
                  <div className="contact__blockLabel">{messages.contact.emailLabel}</div>
                  <a
                    className="contact__link"
                    dir="ltr"
                    href={`mailto:${messages.contact.emailDisplay}`}
                  >
                    {messages.contact.emailDisplay}
                  </a>
                </div>
                <div className="contact__block">
                  <div className="contact__blockLabel">{messages.contact.phoneLabel}</div>
                  <a
                    className="contact__link"
                    dir="ltr"
                    href={`tel:${messages.contact.phoneValue.replace(/[^\d+]/g, '')}`}
                  >
                    {messages.contact.phoneValue}
                  </a>
                </div>

                <div className="contact__socialHead">{messages.contact.connectTitle}</div>
                <div className="contact__socials">
                  {messages.socials.map((s) => (
                    <a
                      key={s.id}
                      className="social-btn"
                      data-social={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                    >
                      <SocialIcon id={s.id} />
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section--dark">
        <div className="container footer__inner">
          <p className="muted">{t('footer.copyright', { year })}</p>
        </div>
      </footer>
    </div>
  )
}

export default App

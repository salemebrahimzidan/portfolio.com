import './App.css'

import { useEffect, useMemo, useRef, useState } from 'react'
import salemPhoto from './assets/salem.jpeg'

type NavItem = { id: string; label: string }
type TimelineItem = { range: string; title: string; place: string; bullets: string[] }
type Skill = { label: string; value: number }

function App() {
  const nav = useMemo<NavItem[]>(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'journey', label: 'Education' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const education = useMemo<TimelineItem[]>(
    () => [
      {
        range: '2015 - 2018',
        title: 'General Secondary School',
        place: 'West Tira Secondary School',
        bullets: [
          'Represented my school in a national-level competition for top students.',
          'Achieved first place at Al-Hamul Center in academic excellence and teamwork.',
          'Demonstrated leadership, communication, and problem-solving skills.',
        ],
      },
      {
        range: '2018 - 2022',
        title: "Bachelor’s Degree - KAFR EL-SHEIKH UNIVERSITY",
        place: 'Computers and Information (Software Engineering)',
        bullets: [
          'Graduated with a focus on software engineering fundamentals.',
          'Passionate about building modern, interactive, responsive web experiences.',
        ],
      },
    ],
    [],
  )

  const experience = useMemo<TimelineItem[]>(
    () => [
      {
        range: '2022 - 2024',
        title: 'Marketing Online | Riseoo | Egypt',
        place: 'Social Media Marketing',
        bullets: [
          'Promoted skincare and haircare products across Instagram, TikTok, and Snapchat.',
          'Created engaging content to attract target audiences.',
          'Supported growth in online sales and brand awareness through creative campaigns.',
        ],
      },
      {
        range: 'NOV 2024 – April 2025',
        title: 'Call Center | AlAhli Bank | Egypt',
        place: 'Customer Support',
        bullets: [
          'Handled incoming customer calls and provided accurate banking information.',
          'Assisted clients with account inquiries, card issues, and digital banking services.',
          'Resolved complaints efficiently and recorded details in CRM.',
        ],
      },
      {
        range: '2025 - Now',
        title: 'Public Services | Thiqah Al-Injaz Office | Saudi Arabia',
        place: 'E-Government Services',
        bullets: [
          'Managed and promoted electronic government services (Absher, Qiwa, Muqeem, Balady).',
          'Assisted clients with online applications and renewals efficiently.',
          'Contributed to improving satisfaction and increasing office service reach.',
        ],
      },
    ],
    [],
  )

  const codingSkills = useMemo<Skill[]>(
    () => [
      { label: 'HTML', value: 90 },
      { label: 'CSS', value: 80 },
      { label: 'JavaScript', value: 65 },
      { label: 'React.js', value: 70 },
      { label: 'Tailwind CSS', value: 70 },
      { label: 'Call API (REST)', value: 60 },
      { label: 'Github', value: 75 },
      { label: 'GitLab', value: 70 },
    ],
    [],
  )

  const professionalSkills = useMemo<Skill[]>(
    () => [
      { label: 'Excel', value: 95 },
      { label: 'Word', value: 67 },
      { label: 'Marketing', value: 85 },
      { label: 'CV ATS', value: 80 },
    ],
    [],
  )

  const [activeId, setActiveId] = useState('home')
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
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: '-20% 0px -65% 0px' },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [nav])

  const scrollToId = (id: string) => {
    const el = sectionsRef.current[id] ?? document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onHireMe = () => scrollToId('contact')
  const onLetsTalk = () => scrollToId('contact')

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'sent'>('idle')

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault()
    const name = contactName.trim()
    const email = contactEmail.trim()
    const message = contactMessage.trim()
    if (!name || !email || !message) return

    const subject = `Portfolio message from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}\n`
    window.location.href = `mailto:salem@example.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setContactStatus('sent')
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar__inner">
          <button
            className="brand"
            type="button"
            onClick={() => scrollToId('home')}
            aria-label="Go to home"
          >
            <span className="brand__dot" aria-hidden="true" />
            Salem
          </button>

          <nav className="nav" aria-label="Primary">
            {nav.map((item) => (
              <button
                key={item.id}
                className={`nav__link ${activeId === item.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => scrollToId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="kicker">Hi , I’m Salem Ebrahim</p>
              <h1 className="hero__title">Frontend Developer</h1>
              <p className="hero__lead">
                I am front end Developer, I love sharing my experience with others, I
                learned software engineering in faculty, and I also love to learn
                something new every single day.
              </p>

              <div className="hero__actions">
                <button className="btn btn--primary" type="button" onClick={onHireMe}>
                  Hire Me
                </button>
                <button className="btn btn--ghost" type="button" onClick={onLetsTalk}>
                  Let’s Talk
                </button>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="portrait">
                <img src={salemPhoto} alt="" loading="eager" />
              </div>
              <div className="glow" />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <div className="section__head">
              <h2>About Me</h2>
              <p className="muted">
                Frontend Developer building clean, responsive, interactive experiences.
              </p>
            </div>

            <div className="card about">
              <div className="about__content">
                <h3>Frontend Developer!</h3>
                <p>
                  I am front end Developer, I love sharing my experience with others, I
                  learned software engineering in faculty, and I also love to learn
                  something new every single day.
                </p>
                <div className="about__actions">
                  <button className="btn btn--primary" type="button" onClick={() => scrollToId('journey')}>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section">
          <div className="container">
            <div className="section__head">
              <h2>My Journey</h2>
              <p className="muted">Education and experience over the years.</p>
            </div>

            <div className="grid2">
              <div className="panel">
                <h3 className="panel__title">Education</h3>
                <ol className="timeline">
                  {education.map((item) => (
                    <li className="timeline__item" key={item.title}>
                      <div className="timeline__meta">{item.range}</div>
                      <div className="timeline__card">
                        <div className="timeline__title">{item.title}</div>
                        <div className="timeline__place">{item.place}</div>
                        <ul className="timeline__bullets">
                          {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="panel">
                <h3 className="panel__title">Experience</h3>
                <ol className="timeline">
                  {experience.map((item) => (
                    <li className="timeline__item" key={item.title}>
                      <div className="timeline__meta">{item.range}</div>
                      <div className="timeline__card">
                        <div className="timeline__title">{item.title}</div>
                        <div className="timeline__place">{item.place}</div>
                        <ul className="timeline__bullets">
                          {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="section__head">
              <h2>My Skills</h2>
              <p className="muted">A quick overview of what I’m strongest at.</p>
            </div>

            <div className="grid2">
              <div className="panel">
                <h3 className="panel__title">Coding Skills</h3>
                <div className="skills">
                  {codingSkills.map((s) => (
                    <div className="skill" key={s.label}>
                      <div className="skill__row">
                        <span>{s.label}</span>
                        <span className="muted">{s.value}%</span>
                      </div>
                      <div className="skill__bar" aria-hidden="true">
                        <div className="skill__fill" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <h3 className="panel__title">Professional Skills</h3>
                <div className="skills">
                  {professionalSkills.map((s) => (
                    <div className="skill" key={s.label}>
                      <div className="skill__row">
                        <span>{s.label}</span>
                        <span className="muted">{s.value}%</span>
                      </div>
                      <div className="skill__bar" aria-hidden="true">
                        <div className="skill__fill" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="section__head">
              <h2>Contact Me!</h2>
              <p className="muted">
                Send a message and I’ll get back to you as soon as possible.
              </p>
            </div>

            <div className="card contact">
              <form className="contact__form" onSubmit={submitContact}>
                <div className="fields">
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="field">
                    <span className="field__label">Email</span>
                    <input
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@email.com"
                      autoComplete="email"
                      type="email"
                      required
                    />
                  </label>

                  <label className="field field--full">
                    <span className="field__label">Message</span>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your message..."
                      rows={5}
                      required
                    />
                  </label>
                </div>

                <div className="contact__actions">
                  <button className="btn btn--primary" type="submit">
                    Submit
                  </button>
                  {contactStatus === 'sent' ? (
                    <span className="pill" role="status">
                      Ready to send via email client
                    </span>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p className="muted">Copyright © 2024 by Salem Ebrahim | All Right Reserved .</p>
        </div>
      </footer>
    </div>
  )
}

export default App

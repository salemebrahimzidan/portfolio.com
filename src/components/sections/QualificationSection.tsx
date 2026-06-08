import { useState } from 'react'
import { HiBriefcase } from 'react-icons/hi'
import {
  educationItems,
  experienceItems,
  qualificationTabs,
  type QualificationKind,
} from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

const itemsByKind = {
  education: educationItems,
  experience: experienceItems,
} as const

function GradCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" aria-hidden>
      <path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z" />
    </svg>
  )
}

export function QualificationSection() {
  const [tab, setTab] = useState<QualificationKind>('education')
  const items = itemsByKind[tab]

  return (
    <section id="qualification" className="section-shell" aria-labelledby="qual-heading">
      <Reveal>
        <div className="mb-14 text-center md:mb-16">
          <h2 id="qual-heading" className="section-title mb-4">
            My Qualification
          </h2>
          <p className="section-lead mx-auto">
            Where I studied and the roles that shaped how I work today.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto max-w-2xl">
        <Reveal delayMs={40}>
          <div className="mb-12 flex justify-center">
            <div
              className="flex rounded-xl border border-border bg-secondary p-1 shadow-sm"
              role="tablist"
              aria-label="Qualification type"
            >
              {qualificationTabs.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`cursor-pointer rounded-lg px-6 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="space-y-5">
            {items.map((item, idx) => (
              <div key={`${tab}-${idx}`} className="surface-card p-6 md:p-7">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                    {tab === 'experience' ? (
                      <HiBriefcase className="h-4 w-4" aria-hidden />
                    ) : (
                      <GradCapIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.organization} · {item.date}
                    </p>
                  </div>
                </div>
                {'bullets' in item && item.bullets?.length ? (
                  <ul className="space-y-2 pl-14 text-sm leading-relaxed text-muted-foreground">
                    {item.bullets.map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span className="list-dot" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'note' in item &&
                  item.note != null && (
                    <p className="pl-14 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                  )
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

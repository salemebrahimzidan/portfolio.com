import { useState } from 'react'
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
    <section id="qualification" className="scroll-mt-20 py-20" aria-labelledby="qual-heading">
      <Reveal>
        <div className="mb-16 text-center">
          <h2 id="qual-heading" className="mb-4 text-3xl font-bold text-[#143D95]">
            My Qualification
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Where I studied and the roles that shaped how I work today.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto max-w-2xl">
        <Reveal delayMs={40}>
          <div className="mb-12 flex justify-center">
            <div className="flex rounded-lg bg-gray-800 p-1" role="tablist" aria-label="Qualification type">
              {qualificationTabs.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`cursor-pointer rounded-md px-6 py-2 transition-colors ${
                      active ? 'bg-gray-100 text-gray-700' : 'text-gray-300 hover:bg-gray-700'
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
          <div className="space-y-8">
            {items.map((item, idx) => (
              <div
                key={`${tab}-${idx}`}
                className="relative border-l-2 border-[#143D95] pb-8 pl-12 last:pb-0"
              >
                <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <GradCapIcon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
                <p className="mb-2 text-gray-400">
                  {item.organization} • {item.date}
                </p>
                <p className="text-gray-300">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

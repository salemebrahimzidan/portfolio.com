import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import type { NavSectionId } from '../../data/portfolio'
import { site } from '../../data/portfolio'

type NavItem = { id: NavSectionId; label: string }

type NavbarProps = {
  items: readonly NavItem[]
  activeId: string
}

function brandParts(fullName: string) {
  const i = fullName.indexOf(' ')
  if (i === -1) return { first: fullName, rest: '' }
  return { first: fullName.slice(0, i), rest: fullName.slice(i) }
}

export function Navbar({ items, activeId }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const { first, rest } = useMemo(() => brandParts(site.name), [site.name])

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-gray-900/80 backdrop-blur-md transition-all duration-300">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6" aria-label="Primary">
          <div className="flex h-20 items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="text-2xl font-bold transition-transform hover:scale-105"
              aria-label="Go to home"
            >
              <span className="bg-linear-to-r from-ref-blue to-ref-cyan bg-clip-text text-transparent">
                {first}
              </span>
              {rest ? <span className="text-white">{rest}</span> : null}
            </button>

            <ul className="hidden items-center space-x-3 md:flex">
              {items.map((item) => {
                const active = activeId === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        active ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {active ? (
                        <span
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-blue-600 to-ref-cyan"
                          aria-hidden
                        />
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        id={panelId}
        className={`fixed inset-y-0 right-0 z-50 w-[min(100%,320px)] transform border-l border-gray-800 bg-gray-900 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-300 hover:bg-gray-800"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col p-2">
          {items.map((item) => {
            const active = activeId === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    active ? 'bg-[#143D95] text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}

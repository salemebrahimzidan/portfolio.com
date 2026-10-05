import { useCallback, useEffect, useId, useState } from 'react'
import type { NavSectionId } from '../../data/portfolio'
import { useI18n } from '../../providers/i18n-context'

type NavItem = { id: NavSectionId; label: string }

type NavbarProps = {
  items: readonly NavItem[]
  activeId: string
}

const navLinkClass =
  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25'

function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()
  const next = locale === 'en' ? 'ar' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t('a11y.switchLanguage')}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-white px-2 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:px-2.5"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
        <path
          strokeWidth="1.75"
          strokeLinecap="round"
          d="M3 12h18M12 3c2.6 2.7 3.9 5.8 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.8-3.9-9s1.3-6.3 3.9-9z"
        />
      </svg>
      <span className="hidden sm:inline" lang={next}>
        {t('a11y.otherLanguage')}
      </span>
    </button>
  )
}

function brandParts(fullName: string) {
  const i = fullName.indexOf(' ')
  if (i === -1) return { first: fullName, rest: '' }
  return { first: fullName.slice(0, i), rest: fullName.slice(i) }
}

export function Navbar({ items, activeId }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const { t } = useI18n()
  const { first, rest } = brandParts(t('brand.name'))
  const labelFor = (id: NavSectionId) => t(`nav.${id}`)

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
      <header className="fixed top-0 left-0 z-50 w-full border-b border-border bg-navbar/95 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label={t('a11y.primaryNav')}>
          <div className="flex h-16 items-center justify-between md:h-18">
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="min-w-0 truncate rounded-md text-lg font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
              aria-label={t('a11y.goHome')}
            >
              {first}
              {rest ? <span className="font-semibold text-muted-foreground">{rest}</span> : null}
            </button>

            <div className="hidden items-center gap-1 md:flex">
              <ul className="flex items-center gap-0.5">
                {items.map((item) => {
                  const active = activeId === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToId(item.id)}
                        aria-current={active ? 'true' : undefined}
                        className={`${navLinkClass} ${
                          active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        {labelFor(item.id)}
                        {active ? (
                          <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent-warm" aria-hidden />
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="btn-accent px-4 py-2 text-xs"
              >
                {t('nav.contact')}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-primary/20 transition-opacity md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        id={panelId}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? t('a11y.primaryNav') : undefined}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed inset-y-0 z-50 w-[min(100%,320px)] border-border bg-navbar transition-transform duration-300 ease-out ltr:right-0 ltr:border-l rtl:left-0 rtl:border-r md:hidden ${
          open ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold text-primary">{t('a11y.menu')}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-primary"
            aria-label={t('a11y.closeMenu')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  aria-current={active ? 'true' : undefined}
                  className={`w-full rounded-md px-4 py-3 text-start text-sm font-medium transition-colors ${
                    active
                      ? 'bg-secondary text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-primary'
                  }`}
                >
                  {labelFor(item.id)}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}

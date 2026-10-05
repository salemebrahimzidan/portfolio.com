import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import ar from '../locales/ar.json'
import en from '../locales/en.json'
import { I18nContext, type Locale } from './i18n-context'
import type { LocaleMessages } from './localeTypes'

const STORAGE_KEY = 'portfolio-locale'

const catalog: Record<Locale, LocaleMessages> = { en, ar }

function readStoredLocale(): Locale {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'ar' || s === 'en') return s
  } catch {
    /* ignore */
  }
  return 'en'
}

function getNested(obj: unknown, path: string): string {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      return path
    }
  }
  return typeof cur === 'string' ? cur : path
}

function interpolate(template: string, vars?: Record<string, string>): string {
  if (!vars) return template
  let out = template
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v)
  }
  return out
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const messages = catalog[locale]

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      const raw = getNested(messages, key)
      return interpolate(raw, vars)
    },
    [messages],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, messages }),
    [locale, setLocale, t, messages],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

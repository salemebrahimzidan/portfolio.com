import { useEffect } from 'react'
import { site } from '../../data/portfolio'
import { useI18n } from '../../providers/I18nProvider'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Syncs document title and meta tags from i18n + site config (SPA SEO baseline). */
export function DocumentMeta() {
  const { locale, t } = useI18n()

  useEffect(() => {
    document.title = t('seo.title')

    const description = t('seo.description')
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', t('seo.title'))
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    if (site.canonicalBase) {
      upsertMeta('property', 'og:url', site.canonicalBase.replace(/\/$/, '') + '/')
    }
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', t('seo.title'))
    upsertMeta('name', 'twitter:description', description)
  }, [locale, t])

  return null
}

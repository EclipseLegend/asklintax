/**
 * AskLinTax i18n System
 *
 * Architecture:
 *   /           → English (default, master language)
 *   /zh-tw/     → Traditional Chinese wrapper pages (home, start, library, categories)
 *
 * How it works:
 *   - English pages live in /pages/*.js (no prefix)
 *   - Traditional Chinese pages live in /pages/zh-tw/*.js and reuse the same components
 *   - Which paths have a /zh-tw/ version is listed in lib/locale-routes.js
 *   - Translations loaded at build time via getStaticProps
 *   - No runtime language detection — user switches via the Header EN | 繁中 control
 *   - Legacy /zh/* URLs 301-redirect to /zh-tw/* (netlify.toml)
 */

export const DEFAULT_LOCALE = 'en'

/**
 * Load translation JSON files at build time.
 * Falls back to English if a locale file doesn't exist.
 */
export function loadTranslations(locale = 'en', namespaces = ['common']) {
  const result = {}
  for (const ns of namespaces) {
    try {
      result[ns] = require(`../locales/${locale}/${ns}.json`)
    } catch {
      // Fallback to English
      result[ns] = require(`../locales/en/${ns}.json`)
    }
  }
  return result
}

/**
 * useTranslation — access translation strings in components.
 * Usage: const { t } = useTranslation(translations.common)
 */
export function useTranslation(translations = {}) {
  function t(key) {
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      if (value == null) return key
      value = value[k]
    }
    return value ?? key
  }
  return { t }
}

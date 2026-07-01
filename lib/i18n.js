/**
 * AskLinTax i18n System
 *
 * Architecture:
 *   /           → English (default)
 *   /zh/        → Traditional Chinese (future)
 *
 * How it works:
 *   - English pages live in /pages/*.js (no prefix)
 *   - Chinese pages live in /pages/zh/*.js
 *   - Both use the same components; only content differs
 *   - Translations loaded at build time via getStaticProps
 *   - No runtime language detection — user switches via Header button
 *
 * Status:
 *   EN  — Active (Foundation 20 in progress)
 *   ZH  — Architecture ready, content pending (post-Foundation 20)
 */

export const LOCALES = {
  en: { code: 'en', label: 'English', path: '',    flag: '🇺🇸' },
  zh: { code: 'zh', label: '中文',    path: '/zh', flag: '🇹🇼' },
}

export const DEFAULT_LOCALE = 'en'

/**
 * Given a pathname like /library/irs/irs-notice,
 * return the Chinese equivalent path: /zh/library/irs/irs-notice
 */
export function getZhPath(enPath) {
  if (enPath === '/') return '/zh/'
  return `/zh${enPath}`
}

/**
 * Given a /zh/ path, return the English equivalent
 */
export function getEnPath(zhPath) {
  if (zhPath === '/zh/' || zhPath === '/zh') return '/'
  return zhPath.replace(/^\/zh/, '') || '/'
}

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

/**
 * AskLinTax — locale routes
 *
 * English is the master language and lives at the site root.
 * Traditional Chinese lives under /zh-tw/ for an explicit set of pages: home, Start Here,
 * the Library and its categories, and every published Knowledge Library guide (each guide
 * at /zh-tw/library/<category>/<slug>/ is a translation of its English master).
 * Everything else (/updates/, /about/) is English-only: Chinese pages link to the English
 * page and label it as English. Never invent a /zh-tw/ URL for a page that is not in ZH_TW_PAGES.
 */

const { ARTICLES } = require('./articles')
const { CATEGORIES } = require('./categories')

const ZH_TW = 'zh-tw'
const ZH_TW_PREFIX = '/zh-tw'

// English pathnames (no trailing slash; '/' for home) that have a real /zh-tw/ version.
const ZH_TW_PAGES = [
  '/',
  '/start',
  '/library',
  ...CATEGORIES.map(c => c.path.replace(/\/$/, '')),
  ...ARTICLES.map(a => a.path.replace(/\/$/, '')),
]

function splitPath(path) {
  const m = /^([^?#]*)([?#].*)?$/.exec(path)
  return { base: m[1] || '/', suffix: m[2] || '' }
}
const trim = base => (base.length > 1 ? base.replace(/\/$/, '') : base)

/** True if this English path has a Traditional Chinese page. */
function hasZhTw(path) {
  return ZH_TW_PAGES.includes(trim(splitPath(path).base))
}

/**
 * Localize an internal English path. For 'zh-tw', returns the /zh-tw/ version only if it
 * exists; otherwise the English path is returned unchanged (English-only destination).
 * Trailing-slash style, query, and hash are preserved.
 */
function localePath(path, locale) {
  if (locale !== ZH_TW || !path.startsWith('/') || !hasZhTw(path)) return path
  const { base, suffix } = splitPath(path)
  if (base === '/') return `${ZH_TW_PREFIX}/${suffix}`
  return `${ZH_TW_PREFIX}${base}${suffix}`
}

/** Locale of a router pathname. */
function localeOfPath(pathname) {
  return pathname === ZH_TW_PREFIX || pathname.startsWith(`${ZH_TW_PREFIX}/`) ? ZH_TW : 'en'
}

/**
 * Language-switch targets for the current router pathname.
 * English page → its Chinese page if one exists, else the Chinese homepage.
 * Chinese page → the matching English page.
 */
function alternates(pathname) {
  if (localeOfPath(pathname) === ZH_TW) {
    const en = pathname.slice(ZH_TW_PREFIX.length) || '/'
    return { en: en === '/' ? '/' : `${en}/`, zhTw: pathname === ZH_TW_PREFIX ? '/zh-tw/' : `${pathname}/` }
  }
  const en = pathname === '/' ? '/' : `${pathname}/`
  return { en, zhTw: hasZhTw(pathname) ? localePath(en, ZH_TW) : '/zh-tw/' }
}

module.exports = { ZH_TW, ZH_TW_PREFIX, ZH_TW_PAGES, hasZhTw, localePath, localeOfPath, alternates }

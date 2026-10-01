/**
 * Locale-aware views of the Knowledge Library index.
 *
 * English ('en') returns the original objects unchanged. For 'zh-tw', display fields are
 * overlaid from lib/library-zh-tw.js and internal paths are localized via lib/locale-routes.js.
 * Article paths are NEVER localized — every guide is English-only and is flagged `englishOnly`.
 */

const { ARTICLES } = require('./articles')
const { CATEGORIES } = require('./categories')
const { ARTICLES_ZH_TW, CATEGORIES_ZH_TW } = require('./library-zh-tw')
const { ZH_TW, localePath } = require('./locale-routes')

const articleById = new Map(ARTICLES.map(a => [a.id, a]))
const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]))

function localizeArticle(article, locale) {
  if (!article || locale !== ZH_TW) return article
  const zh = ARTICLES_ZH_TW[article.id] || {}
  return {
    ...article,
    title: zh.title || article.title,
    summary: zh.summary || article.summary,
    keywords: zh.keywords || article.keywords,
    englishOnly: true,
  }
}

function localizeCategory(category, locale) {
  if (!category || locale !== ZH_TW) return category
  const zh = CATEGORIES_ZH_TW[category.key] || {}
  return {
    ...category,
    name: zh.name || category.name,
    summary: zh.summary || category.summary,
    intro: zh.intro || category.intro,
    seoTitle: zh.seoTitle || category.seoTitle,
    seoDescription: zh.seoDescription || category.seoDescription,
    startHereNote: zh.startHereNote || category.startHereNote,
    questions: zh.questions || category.questions,
    path: localePath(category.path, locale),
  }
}

const getArticle = (id, locale = 'en') => localizeArticle(articleById.get(id), locale)
const getCategory = (key, locale = 'en') => localizeCategory(categoryByKey.get(key), locale)
const getCategories = (locale = 'en') => CATEGORIES.map(c => localizeCategory(c, locale))

/** 'June 2026' → '2026 年 6 月' for zh-tw; unchanged for English. */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function formatMonthYear(text, locale) {
  if (locale !== ZH_TW) return text
  const m = /^([A-Za-z]+)\s+(\d{4})$/.exec(String(text).trim())
  const i = m ? MONTHS.indexOf(m[1]) : -1
  return i >= 0 ? `${m[2]} 年 ${i + 1} 月` : text
}

module.exports = { localizeArticle, localizeCategory, getArticle, getCategory, getCategories, formatMonthYear }

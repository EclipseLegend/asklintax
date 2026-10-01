/**
 * AskLinTax — Knowledge Library search (V1, client-side)
 *
 * Searches ONLY the published article index (lib/articles.js) plus category names.
 * No article body text, no external service. Deterministic and easy to reason about.
 *
 * Matching:
 *   - Text is lowercased, accents/punctuation removed, whitespace collapsed.
 *   - Hyphenated terms are indexed both split and joined ("S-Corp" → "s corp" + "scorp",
 *     "W-2" → "w 2" + "w2"), so "s corp", "s-corp", "scorp", "w2" and "w-2" all work.
 *   - Common filler words ("do", "I", "to", "what", "vs"…) are ignored.
 *   - A query term matches a word that STARTS with it, or with its simple singular
 *     form ("deductions" → "deduction", "taxes" → "tax").
 *   - EVERY meaningful query term must match somewhere in the article.
 *
 * Ranking (each term counts at its best field, +1 for each other field it also matches):
 *   title 10 · keywords 6 · category 4 · summary 2
 *   + 100 if the whole query appears in the title
 *   + 40  if the whole query equals one of the article's keywords
 *   Ties keep the index order (Foundation order).
 */

const { ARTICLES } = require('./articles')
const { CATEGORIES } = require('./categories')

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'i', 'im', 'me', 'my', 'we', 'our', 'you', 'your',
  'do', 'does', 'did', 'is', 'are', 'am', 'was', 'be', 'it', 'its', 'this', 'that',
  'to', 'of', 'for', 'in', 'on', 'at', 'by', 'and', 'or', 'with', 'from', 'about', 'if',
  'what', 'whats', 'how', 'when', 'where', 'who', 'why', 'which', 'can', 'should',
  'vs', 'versus',
])

const WEIGHTS = { title: 10, keywords: 6, category: 4, summary: 2 }

// Lowercase, strip accents and apostrophes, turn other punctuation into spaces.
function clean(text) {
  return String(text)
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
}

// Words for the index: hyphenated words appear both split and joined.
function indexWords(text) {
  const words = []
  for (const word of clean(text).split(/\s+/)) {
    if (!word) continue
    const parts = word.split('-').filter(Boolean)
    words.push(...parts)
    if (parts.length > 1) words.push(parts.join(''))
  }
  return words
}

// Normalized phrase (hyphens joined) for whole-query comparisons.
function phrase(text) {
  return clean(text).replace(/-/g, '').replace(/\s+/g, ' ').trim()
}

// Meaningful query terms: hyphens joined, filler words and single letters dropped.
function queryTerms(query) {
  const terms = clean(query).replace(/-/g, '').split(/\s+/)
    .filter(t => t && !STOP_WORDS.has(t) && (t.length > 1 || /\d/.test(t)))
  return [...new Set(terms)]
}

// The term plus a simple singular form, used as word prefixes.
function variants(term) {
  const forms = [term]
  if (term.length > 4 && term.endsWith('ies')) forms.push(term.slice(0, -3) + 'y')
  else if (term.length > 4 && term.endsWith('es')) forms.push(term.slice(0, -2))
  if (term.length > 3 && term.endsWith('s') && !term.endsWith('ss')) forms.push(term.slice(0, -1))
  return forms
}

const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]))

// Built once: searchable words for every published article.
const DOCUMENTS = ARTICLES.map(article => {
  const category = categoryByKey.get(article.category)
  return {
    article,
    titlePhrase: phrase(article.title),
    keywordPhrases: article.keywords.map(phrase),
    fields: {
      title: indexWords(article.title),
      keywords: indexWords(article.keywords.join(' ')),
      category: indexWords(`${article.category} ${category ? category.name : ''}`),
      summary: indexWords(article.summary),
    },
  }
})

function fieldMatches(words, forms) {
  return words.some(word => forms.some(form => word.startsWith(form)))
}

/**
 * English search (unchanged V1 behavior). Returns matching published articles, best first.
 * Empty array for an empty or filler-only query, or when nothing matches.
 */
function searchArticlesEn(query) {
  const terms = queryTerms(query)
  if (terms.length === 0) return []
  const queryPhrase = phrase(query)

  const results = []
  DOCUMENTS.forEach((doc, order) => {
    let score = 0
    for (const term of terms) {
      const forms = variants(term)
      let best = 0
      let matchedFields = 0
      for (const [field, weight] of Object.entries(WEIGHTS)) {
        if (fieldMatches(doc.fields[field], forms)) {
          matchedFields += 1
          best = Math.max(best, weight)
        }
      }
      if (best === 0) return // every term must match somewhere
      score += best + (matchedFields - 1)
    }
    if (queryPhrase && doc.titlePhrase.includes(queryPhrase)) score += 100
    if (doc.keywordPhrases.includes(queryPhrase)) score += 40
    results.push({ article: doc.article, score, order })
  })

  return results
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(r => r.article)
}

// ─────────────────────────────────────────────────────────────
// Traditional Chinese search (zh-tw) — same 20 published articles.
//
// Fields: Chinese title / summary / keywords (lib/library-zh-tw.js), the Chinese and English
// category names, plus the English title and keywords (so "FBAR", "LLC", "S-Corp" work).
// The query is split into Latin terms (matched exactly like English search) and Chinese
// segments. A Chinese segment matches when it appears as a substring of a field; a segment
// longer than 2 characters that appears nowhere falls back to requiring each of its 2-character
// pieces. Every term/segment must match somewhere. Deterministic; ties keep index order.
// ─────────────────────────────────────────────────────────────

const { ARTICLES_ZH_TW, CATEGORIES_ZH_TW } = require('./library-zh-tw')

const CJK = /[㐀-鿿豈-﫿]/
// Common filler words in Chinese questions ("我需要報稅嗎？" → "報稅").
const ZH_STOP = ['怎麼辦', '怎麼', '如何', '什麼', '需要', '是否', '我的', '可以', '嗎', '呢', '吗', '我']
const ZH_WEIGHTS = { title: 10, keywords: 6, category: 4, summary: 2, enTitle: 3, enKeywords: 3 }

// Lowercase, full-width → half-width (NFKC), punctuation → space; keeps CJK and hyphens.
// 僱 → 雇 so "自雇" (Taiwan) and "自僱" (variant) find the same guides.
function cleanZh(text) {
  return String(text).normalize('NFKC').toLowerCase()
    .replace(/僱/g, '雇')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9㐀-鿿豈-﫿\s-]/g, ' ')
}
const compact = text => cleanZh(text).replace(/[\s-]+/g, '')

function zhQueryParts(query) {
  let text = cleanZh(query)
  // Separate Chinese runs from Latin runs ("irs通知" → "irs 通知")
  text = text.replace(/([㐀-鿿豈-﫿]+)/g, ' $1 ')
  const latin = []
  const cjk = []
  for (const token of text.split(/\s+/).filter(Boolean)) {
    if (CJK.test(token)) {
      let rest = token
      for (const stop of ZH_STOP) rest = rest.split(stop).join(' ')
      cjk.push(...rest.split(/\s+/).filter(Boolean))
    } else {
      latin.push(...queryTerms(token))
    }
  }
  return { latin: [...new Set(latin)], cjk: [...new Set(cjk)] }
}

const ZH_DOCUMENTS = ARTICLES.map(article => {
  const zh = ARTICLES_ZH_TW[article.id] || {}
  const category = categoryByKey.get(article.category)
  const zhCategory = CATEGORIES_ZH_TW[article.category] || {}
  const text = {
    title: zh.title || '',
    keywords: (zh.keywords || []).join(' '),
    category: `${zhCategory.name || ''} ${category ? category.name : ''} ${article.category}`,
    summary: zh.summary || '',
    enTitle: article.title,
    enKeywords: article.keywords.join(' '),
  }
  return {
    article,
    compactTitle: compact(text.title),
    compactKeywords: (zh.keywords || []).map(compact),
    cjk: Object.fromEntries(Object.entries(text).map(([k, v]) => [k, compact(v)])),
    words: Object.fromEntries(Object.entries(text).map(([k, v]) => [k, indexWords(v)])),
  }
})

function cjkFieldMatches(fieldText, segment) {
  if (fieldText.includes(segment)) return 'full'
  return null
}

function searchArticlesZh(query) {
  const { latin, cjk } = zhQueryParts(query)
  if (latin.length === 0 && cjk.length === 0) return []
  const queryCompact = compact(query)

  const results = []
  ZH_DOCUMENTS.forEach((doc, order) => {
    let score = 0
    const scoreTerm = matchField => {
      let best = 0
      let matchedFields = 0
      for (const [field, weight] of Object.entries(ZH_WEIGHTS)) {
        if (matchField(field)) {
          matchedFields += 1
          best = Math.max(best, weight)
        }
      }
      return best ? best + (matchedFields - 1) : 0
    }
    for (const term of latin) {
      const forms = variants(term)
      const s = scoreTerm(field => fieldMatches(doc.words[field], forms))
      if (!s) return
      score += s
    }
    for (const segment of cjk) {
      let s = scoreTerm(field => cjkFieldMatches(doc.cjk[field], segment))
      if (!s && segment.length > 2) {
        // Fallback: every 2-character piece must appear somewhere (lower confidence → half score)
        const pieces = []
        for (let i = 0; i < segment.length - 1; i++) pieces.push(segment.slice(i, i + 2))
        const all = Object.values(doc.cjk).join('|')
        if (pieces.every(p => all.includes(p))) s = 1
      }
      if (!s) return
      score += s
    }
    if (queryCompact && doc.compactTitle.includes(queryCompact)) score += 100
    // A whole keyword phrase equals the query, or (3+ chars) appears inside it: "我需要報稅嗎" ⊃ "需要報稅嗎"
    if (doc.compactKeywords.some(kw => kw === queryCompact || (kw.length >= 3 && queryCompact.includes(kw)))) score += 40
    results.push({ article: doc.article, score, order })
  })

  return results
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(r => r.article)
}

/**
 * Search the published article index.
 *   searchArticles(query)                      → English (default, unchanged)
 *   searchArticles(query, { locale: 'zh-tw' }) → Traditional Chinese
 */
function searchArticles(query, { locale = 'en' } = {}) {
  return locale === 'zh-tw' ? searchArticlesZh(query) : searchArticlesEn(query)
}

module.exports = { searchArticles, queryTerms }

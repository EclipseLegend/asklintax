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
 * Returns matching published articles, best first. Empty array for an empty or
 * filler-only query, or when nothing matches.
 */
function searchArticles(query) {
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

module.exports = { searchArticles, queryTerms }

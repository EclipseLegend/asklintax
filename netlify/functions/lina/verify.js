/**
 * Lina v2 — deterministic checks on the model's structured answer.
 *
 * What these checks guarantee: every cited source was supplied by the server for this request; every quote
 * is really in that source; every number shown is declared, and legal figures come from a cited source,
 * user figures from the question, and calculations recompute correctly; tax years line up with the
 * sources. What they cannot guarantee: that the model's wording faithfully represents the quoted rule.
 * Semantic accuracy still needs real-model evaluation and human review.
 *
 * Any failure returns a reason code; the caller then shows the fixed "insufficient" reply (fail closed).
 */

const CJK = /[㐀-鿿豈-﫿]/
const EXAMPLE_MARKER = /\b(for example|for instance|e\.g\.|example|illustrative|suppose|say you)\b|舉例|例如|假設|比方/i

// ── Text normalization ───────────────────────────────────

function normText(s) {
  return String(s).normalize('NFKC').toLowerCase()
    .replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"').replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ').trim()
}

// A quote must be a real, non-trivial excerpt of the source (whitespace/quote/dash differences ignored).
function quoteInSource(quote, sourceText) {
  const q = normText(quote).replace(/^["'.…\s]+|["'.…\s]+$/g, '')
  return q.length >= 15 && q.length <= 400 && q.split(' ').length >= 3 && normText(sourceText).includes(q)
}

// ── Numbers ──────────────────────────────────────────────

// Identifiers are labels, not amounts (specific patterns first, so a list like "Form 8949, W-2" is not split):
// Form 8949, Schedule B, line 1a, Box 1b, Step 2, W-4, 1099-K, CP2000, 401(k), 529 plan …
const IDENTIFIERS = [
  /\bw-?\d\b|\bcp\s?\d{2,4}\b|\b\d{3}-\d{2}-\d{4}\b/gi,
  /\b(?:401|403|457)\s?\(?[a-z]\)?(?:\s?\(\d+\))?/gi,
  /\b529(?=\s*(?:plans?|accounts?|savings|計畫|帳戶|教育))/gi,
  /\b(?:1099|1098|1040|1065|1120|8938|3520|8949|2848|4868|5471|8606|8829|8833|1116|2555|941|940|ss)-?[a-z]{0,4}\b(?:-[a-z]+)?/gi,
  /\b(?:forms?|publications?|pubs?\.?|topic(?:\s+no\.?)?|schedules?|sections?|sec\.|§|lines?|boxes|box|parts?|steps?|notices?|letters?|chapters?|pages?|rev\.?\s*proc\.?|revenue\s+procedure|rev\.?\s*rul\.?|irc)\s*[a-z0-9][\w.()-]*(?:\s*(?:,|and|or|&)\s*(?:\d[\w.()-]*|[a-z]\b))*/gi,
]

function stripIdentifiers(text) {
  let t = String(text).normalize('NFKC')
  for (const r of IDENTIFIERS) t = t.replace(r, ' ')
  return t
}

// Chinese numerals: 一萬 = 10,000; 十五萬 = 150,000; 一百五十萬 = 1,500,000; 1.5萬 = 15,000; 1億2000萬.
const CN_DIGIT = { '〇': 0, '零': 0, '一': 1, '二': 2, '兩': 2, '两': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 }
const CN_UNIT = { '十': 10, '百': 100, '千': 1000 }
const CN_BIG = { '萬': 1e4, '万': 1e4, '億': 1e8, '亿': 1e8 }
const CN_CHARS = '〇零一二兩两三四五六七八九十百千萬万億亿'

// Returns the value, or null if the numeral is malformed.
function parseChineseNumeral(s) {
  let total = 0, section = 0, current = null, lastBig = Infinity
  for (let i = 0; i < s.length;) {
    const ch = s[i]
    if (/\d/.test(ch)) {
      const m = /^\d+(?:\.\d+)?/.exec(s.slice(i))
      if (current !== null) return null
      current = parseFloat(m[0]); i += m[0].length; continue
    }
    if (ch in CN_DIGIT) {
      if (CN_DIGIT[ch] === 0) current = null
      else { if (current !== null) return null; current = CN_DIGIT[ch] }
      i++; continue
    }
    if (ch in CN_UNIT) {
      let n = current
      if (n === null) { if (ch !== '十' || section) return null; n = 1 }
      section += n * CN_UNIT[ch]; current = null; i++; continue
    }
    if (ch in CN_BIG) {
      const sec = section + (current ?? 0)
      if (!sec || CN_BIG[ch] >= lastBig) return null
      total += sec * CN_BIG[ch]; lastBig = CN_BIG[ch]; section = 0; current = null; i++; continue
    }
    return null
  }
  const rest = section + (current ?? 0)
  if (rest >= lastBig) return null
  return total + rest
}

const USD_AFTER = /^\s?(?:dollars?\b|usd\b|美元|美金)/i
const TWD_AFTER = /^\s?(?:新?台幣|ntd\b|twd\b)/i

/**
 * Amounts as written, in English or Traditional Chinese. Returns [{ raw, value, percent, currency, valid }].
 * "$1 million" → 1,000,000; "$150k" → 150,000; "1萬"/"一萬" → 10,000; "十五萬" → 150,000; "22%" / "百分之二十二" → 22%.
 * Ambiguous or malformed amounts are returned with valid:false (never re-read as a smaller number):
 * "一萬五" / "兩千五" (colloquial), "數萬" (vague), "1,00,000", "1.2.3", "3x".
 */
function extractNumbers(text) {
  const out = []
  // Chinese punctuation is a separator, not a thousands comma ("$10,000，一般" is two tokens).
  let t = stripIdentifiers(String(text).replace(/[，、；]/g, ', '))
  const currencyOf = (prefix, after) => (/NT\$/i.test(prefix) || TWD_AFTER.test(after) ? 'TWD' : /\$|USD/i.test(prefix) || USD_AFTER.test(after) ? 'USD' : null)

  // 百分之X → X%
  t = t.replace(new RegExp(`百分之([0-9.]+|[${CN_CHARS}]+)`, 'g'), (m, x) => {
    const v = /\d/.test(x) ? parseFloat(x) : parseChineseNumeral(x)
    out.push({ raw: m, value: v === null ? NaN : v, percent: true, currency: null, valid: v !== null && Number.isFinite(v) })
    return ' '
  })

  // Chinese-numeral runs (may mix Arabic digits with Chinese units: 1.5萬, 1萬5000).
  t = t.replace(new RegExp(`(NT\\$|US\\$|\\$)?((?:\\d+(?:[.,]\\d+)*|[${CN_CHARS}])*[${CN_CHARS}](?:\\d+(?:[.,]\\d+)*|[${CN_CHARS}])*)`, 'g'), (m, prefix = '', run, offset, whole) => {
    const before = whole.slice(Math.max(0, offset - 2), offset)
    const after = whole.slice(offset + m.length)
    const hasUnit = /[十百千萬万億亿]/.test(run)
    const currencyWord = /^\s?(?:元|塊|美元|美金|新?台幣)/.test(after)
    // Vague amounts ("數萬", "幾千", "上萬") cannot be validated: keep them, marked invalid.
    const vague = hasUnit && /[數几幾上近成]$/.test(before)
    // Words, not amounts: 一般, 萬一, 千萬不要, 十分, 百分百, 三個月 (a count without a magnitude unit).
    if (!vague && !hasUnit && !currencyWord && !prefix) return m
    if (!vague && /^[百千萬万億亿]/.test(run) ) return m
    if (run === '十' && /^分/.test(after)) return m
    const colloquial = /[百千萬万億亿]([一二兩两三四五六七八九]|\d)$/.test(run) // 一萬五, 兩千五, 1萬5
    const v = vague || colloquial ? null : parseChineseNumeral(run.replace(/,/g, ''))
    out.push({ raw: m, value: v === null ? NaN : v, percent: false, currency: currencyOf(prefix, after), valid: v !== null && Number.isFinite(v) })
    return ' '.repeat(m.length)
  })

  // Arabic numbers with optional currency prefix, percent, or English multiplier.
  const re = /(US\$|USD ?|NT\$|\$)?(\d[\d,.]*\d|\d)/g
  let m
  while ((m = re.exec(t))) {
    const prefix = m[1] || ''
    if (!prefix && m.index > 0 && /[\w.]/.test(t[m.index - 1])) continue // part of a label or a longer token
    const digits = m[2]
    const rest = t.slice(m.index + m[0].length)
    let mult = 1, percent = false, suffix = '', valid = true, mm
    if ((mm = /^\s?(?:%|percent\b|per cent\b)/i.exec(rest))) { percent = true; suffix = mm[0] }
    else if ((mm = /^\s?(thousand|million|billion|trillion)\b/i.exec(rest))) { mult = { thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12 }[mm[1].toLowerCase()]; suffix = mm[0] }
    else if ((mm = /^[kK](?![A-Za-z0-9])/.exec(rest))) { mult = 1e3; suffix = mm[0] }
    else if ((mm = /^(?:mm|MM|bn|BN|[mMbB])(?![A-Za-z0-9])/.exec(rest)) && prefix) { mult = /^[bB]/.test(mm[0]) ? 1e9 : 1e6; suffix = mm[0] }
    else if ((mm = /^(?:st|nd|rd|th)(?![A-Za-z])/.exec(rest))) { suffix = mm[0] } // ordinal: "April 15th"
    else if (/^[A-Za-z]/.test(rest)) valid = false // unrecognized unit ("3x", "1M" without $): fail safe
    if ((digits.match(/\./g) || []).length > 1) valid = false
    if (digits.includes(',') && !/^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(digits)) valid = false
    const value = valid ? parseFloat(digits.replace(/,/g, '')) * mult : NaN
    out.push({ raw: m[0] + suffix, value, percent, currency: currencyOf(prefix, rest.slice(suffix.length)), valid: valid && Number.isFinite(value) })
    re.lastIndex = m.index + m[0].length + suffix.length
  }
  return out
}

const isYear = n => n.valid && !n.percent && !n.currency && Number.isInteger(n.value) && n.value >= 1990 && n.value <= 2099 && /^\d{4}$/.test(n.raw)
const sameValue = (a, b) => Math.abs(a - b) < 1e-9
const sameCurrency = (a, b) => !a || !b || a === b
const hasValue = (list, v, currency = null) => list.some(n => n.valid && sameValue(n.value, v) && sameCurrency(n.currency, currency))

// Tiny arithmetic evaluator (no eval): numbers, + - * / ( ), "%" meaning /100. Returns { value, literals }.
function evaluate(expression) {
  const src = String(expression).replace(/[$,\s]/g, '').replace(/×/g, '*').replace(/÷/g, '/')
  if (!/^[\d.+\-*/()%]+$/.test(src)) return null
  let i = 0
  const literals = []
  const peek = () => src[i]
  function number() {
    const m = /^\d+(?:\.\d+)?/.exec(src.slice(i))
    if (!m) throw new Error('number')
    i += m[0].length
    let v = parseFloat(m[0])
    literals.push(v)
    if (peek() === '%') { i++; v /= 100 }
    return v
  }
  function factor() {
    if (peek() === '-') { i++; return -factor() }
    if (peek() === '(') { i++; const v = expr(); if (peek() !== ')') throw new Error('paren'); i++; return v }
    return number()
  }
  function term() {
    let v = factor()
    while (peek() === '*' || peek() === '/') { const op = src[i++]; const r = factor(); v = op === '*' ? v * r : v / r }
    return v
  }
  function expr() {
    let v = term()
    while (peek() === '+' || peek() === '-') { const op = src[i++]; const r = term(); v = op === '+' ? v + r : v - r }
    return v
  }
  try {
    const value = expr()
    if (i !== src.length || !Number.isFinite(value)) return null
    return { value, literals }
  } catch { return null }
}

// ── Answer validation ────────────────────────────────────

const SMALL_CONSTANTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 100])

/**
 * @param parsed   the model's JSON (already schema-shaped)
 * @param ctx      { question, evidence: Map(id → { kind: 'library'|'official', text, taxYear, articleId?, url?, title }) }
 * @returns        { ok: true, paragraphs, guides, officialSources } | { ok: false, reason }
 */
function validateAnswer(parsed, ctx) {
  const fail = reason => ({ ok: false, reason })
  const paragraphs = (parsed.paragraphs || []).filter(p => typeof p === 'string').map(p => p.trim()).filter(Boolean)
  if (!paragraphs.length || paragraphs.length > 4 || paragraphs.some(p => p.length > 1200)) return fail('bad_paragraphs')
  if (paragraphs.some(p => /https?:\/\/|www\./i.test(p))) return fail('url_in_text') // links come only from server-held sources

  // Claims: the cited source must be one the server supplied, and the quote must be in it.
  const claims = Array.isArray(parsed.claims) ? parsed.claims : []
  if (!claims.length) return fail('no_claims')
  if (claims.length > 12) return fail('too_many_claims')
  const questionNumbers = extractNumbers(ctx.question)
  const questionYears = questionNumbers.filter(isYear).map(n => n.value)
  for (const c of claims) {
    const src = ctx.evidence.get(c.source_id)
    if (!src) return fail('unknown_source')
    if (!quoteInSource(c.quote, src.text)) return fail('quote_not_in_source')
    const year = String(c.tax_year || '').trim()
    if (year) {
      if (!/^(19|20)\d\d$/.test(year)) return fail('bad_tax_year')
      // A claim's year must be the source's year, or be stated in the quoted text itself.
      if (src.taxYear && src.taxYear !== year && !normText(c.quote).includes(year)) return fail('tax_year_mismatch')
    }
  }
  const citedIds = new Set(claims.map(c => c.source_id))
  // A question about a specific year must be answered from sources for that year.
  if (questionYears.length) {
    const yearOk = [...citedIds].some(id => {
      const s = ctx.evidence.get(id)
      return questionYears.some(y => s.taxYear === String(y) || s.text.includes(String(y)))
    })
    if (!yearOk) return fail('tax_year_mismatch')
  }

  // Numbers: every number shown must be declared with a category, and each category has its own check.
  //   legal      → in a quote from the cited source (a threshold or rate needs authority)
  //   user       → in the user's own words (same currency when both say)
  //   arithmetic → recomputed here from user numbers, legal numbers, small constants or earlier results;
  //                the result itself does not have to appear in any source
  //   example    → only inside a sentence marked as an example
  //   tax years  → from the question or the cited sources
  const declared = (Array.isArray(parsed.numbers) ? parsed.numbers : []).slice(0, 40)
  const decl = declared.map(d => ({ ...d, parsed: extractNumbers(String(d.value || ''))[0] })).filter(d => d.parsed && d.parsed.valid)
  const quotesFor = id => claims.filter(c => c.source_id === id).map(c => extractNumbers(c.quote))
  for (const d of decl) {
    const { value, currency } = d.parsed
    if (d.category === 'legal') d.ok = citedIds.has(d.source_id) && quotesFor(d.source_id).some(list => hasValue(list, value, currency))
    else if (d.category === 'user') d.ok = hasValue(questionNumbers, value, currency)
  }
  const legal = decl.filter(d => d.category === 'legal' && d.ok)
  let progress = true
  while (progress) {
    progress = false
    for (const d of decl.filter(x => x.category === 'arithmetic' && !x.ok)) {
      const r = evaluate(d.expression)
      if (!r) continue
      const known = v => SMALL_CONSTANTS.has(v) || hasValue(questionNumbers, v) || legal.some(x => sameValue(x.parsed.value, v)) ||
        decl.some(x => x.category === 'arithmetic' && x.ok && sameValue(x.parsed.value, v))
      const target = d.parsed.percent ? d.parsed.value / 100 : d.parsed.value
      const tolerance = Math.max(0.01, Math.abs(target) * 0.005, Number.isInteger(d.parsed.value) ? 0.5 : 0)
      if (r.literals.every(known) && Math.abs(r.value - target) <= tolerance) { d.ok = true; progress = true }
    }
  }
  const citedYears = new Set([...citedIds].map(id => ctx.evidence.get(id).taxYear).filter(Boolean))
  const yearAllowed = v => questionYears.includes(v) || citedYears.has(String(v)) ||
    [...citedIds].some(id => ctx.evidence.get(id).text.includes(String(v)))

  for (const p of paragraphs) {
    for (const n of extractNumbers(p)) {
      if (!n.valid) return fail('unrecognized_amount') // ambiguous or malformed amount: never guess
      if (isYear(n)) {
        if (!yearAllowed(n.value)) return fail('unsupported_year')
        continue
      }
      const matches = decl.filter(x => sameValue(x.parsed.value, n.value) && x.parsed.percent === n.percent && sameCurrency(x.parsed.currency, n.currency))
      if (!matches.length) return fail('undeclared_number')
      if (matches.some(x => x.ok)) continue
      if (matches.some(x => x.category === 'example') && EXAMPLE_MARKER.test(p)) continue // illustrative, labelled as an example
      const cat = matches[0].category
      return fail(cat === 'legal' ? 'legal_number_not_in_source' : cat === 'user' ? 'user_number_not_in_question' : cat === 'arithmetic' ? 'arithmetic_invalid' : 'unsupported_number')
    }
  }

  const guides = [...new Set([...citedIds].map(id => ctx.evidence.get(id)).filter(s => s.kind === 'library').map(s => s.articleId))].slice(0, 3)
  const officialSources = [...new Set([...citedIds])].map(id => ctx.evidence.get(id)).filter(s => s.kind === 'official')
    .map(s => ({ url: s.url, title: s.title, taxYear: s.taxYear })).slice(0, 4)
  return { ok: true, paragraphs: paragraphs.slice(0, 3).map(p => p.slice(0, 900)), guides, officialSources }
}

// A clarifying question may ask about a year ("Did you sell in 2025?") and repeat the asker's own numbers,
// but must not state rules or amounts.
function validateClarifyingQuestion(text, question) {
  const q = String(text || '').trim()
  if (!q || q.length > 400 || /https?:\/\//i.test(q)) return false
  const allowed = extractNumbers(question)
  return extractNumbers(q).every(n => n.valid && (isYear(n) || hasValue(allowed, n.value, n.currency)))
}

module.exports = { normText, quoteInSource, extractNumbers, evaluate, validateAnswer, validateClarifyingQuestion, CJK }

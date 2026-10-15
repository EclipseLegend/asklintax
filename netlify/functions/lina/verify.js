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

// Durations: "8 months", "1 year", "1 年", "8 個月" carry a unit, so 1 year never matches 1 month. A four-digit
// calendar year followed by 年 ("2025年") is a year, not a duration.
const UNIT_EN = /^\s?(day|week|month|year)s?\b/i
const UNIT_ZH = /^\s?(個月|个月|年|天|週|周|星期)/
const ZH_UNIT = { '個月': 'month', '个月': 'month', '年': 'year', '天': 'day', '週': 'week', '周': 'week', '星期': 'week' }
function unitAfter(rest) {
  let m
  if ((m = UNIT_EN.exec(rest))) return m[1].toLowerCase()
  if ((m = UNIT_ZH.exec(rest))) return ZH_UNIT[m[1]]
  return null
}
// Spelled-out durations ("one year", "eight months", 一年, 八個月). Read only on the EVIDENCE side (the user's
// words and cited quotes), so "1 year" in an answer can be supported by "more than one year" in a guide.
const EN_WORD_NUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, eighteen: 18, twenty: 20, thirty: 30, sixty: 60, ninety: 90 }
const EN_WORD_DURATION = new RegExp(`\\b(${Object.keys(EN_WORD_NUM).join('|')})[\\s-]+(day|week|month|year)s?\\b`, 'gi')

const USD_AFTER = /^\s?(?:dollars?\b|usd\b|美元|美金)/i
const TWD_AFTER = /^\s?(?:新?台幣|ntd\b|twd\b)/i

/**
 * Amounts as written, in English or Traditional Chinese. Returns [{ raw, value, percent, currency, valid }].
 * "$1 million" → 1,000,000; "$150k" → 150,000; "1萬"/"一萬" → 10,000; "十五萬" → 150,000; "22%" / "百分之二十二" → 22%.
 * Ambiguous or malformed amounts are returned with valid:false (never re-read as a smaller number):
 * "一萬五" / "兩千五" (colloquial), "數萬" (vague), "1,00,000", "1.2.3", "3x".
 * Durations get unit 'day' | 'week' | 'month' | 'year' ("8 months", "1 年"); other numbers have unit null.
 * { words: true } also reads spelled-out durations ("one year", 八個月) — used for the user's text and quotes.
 */
function extractNumbers(text, { words = false } = {}) {
  const out = []
  // Chinese punctuation is a separator, not a thousands comma ("$10,000，一般" is two tokens).
  let t = stripIdentifiers(String(text).replace(/[，、；]/g, ', '))
  if (words) {
    t = t.replace(EN_WORD_DURATION, (m, w, u) => { out.push({ raw: m, value: EN_WORD_NUM[w.toLowerCase()], percent: false, currency: null, unit: u.toLowerCase(), valid: true }); return ' ' })
    t = t.replace(new RegExp(`([${CN_CHARS}]+)\\s?(個月|个月|年|天|週|周|星期)`, 'g'), (m, run, u) => {
      const v = /[萬万億亿]/.test(run) ? null : parseChineseNumeral(run)
      if (v === null || !Number.isFinite(v) || v === 0) return m
      out.push({ raw: m, value: v, percent: false, currency: null, unit: ZH_UNIT[u], valid: true })
      return ' '
    })
  }
  const currencyOf = (prefix, after) => (/NT\$/i.test(prefix) || TWD_AFTER.test(after) ? 'TWD' : /\$|USD/i.test(prefix) || USD_AFTER.test(after) ? 'USD' : null)

  // 百分之X → X%
  t = t.replace(new RegExp(`百分之([0-9.]+|[${CN_CHARS}]+)`, 'g'), (m, x) => {
    const v = /\d/.test(x) ? parseFloat(x) : parseChineseNumeral(x)
    out.push({ raw: m, value: v === null ? NaN : v, percent: true, currency: null, unit: null, valid: v !== null && Number.isFinite(v) })
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
    out.push({ raw: m, value: v === null ? NaN : v, percent: false, currency: currencyOf(prefix, after), unit: null, valid: v !== null && Number.isFinite(v) })
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
    let unit = !percent && !prefix && mult === 1 ? unitAfter(rest.slice(suffix.length)) : null
    if (unit === 'year' && /^(19|20)\d\d$/.test(digits)) unit = null // "2025年" is a calendar year
    out.push({ raw: m[0] + suffix, value, percent, currency: currencyOf(prefix, rest.slice(suffix.length)), unit, valid: valid && Number.isFinite(value) })
    re.lastIndex = m.index + m[0].length + suffix.length
  }
  return out
}

const isYear = n => n.valid && !n.percent && !n.currency && Number.isInteger(n.value) && n.value >= 1990 && n.value <= 2099 && /^\d{4}$/.test(n.raw)
const sameValue = (a, b) => Math.abs(a - b) < 1e-9
const sameCurrency = (a, b) => !a || !b || a === b
const sameUnit = (a, b) => !a || !b || a === b
const hasValue = (list, v, currency = null, unit = null) => list.some(n => n.valid && sameValue(n.value, v) && sameCurrency(n.currency, currency) && sameUnit(n.unit, unit))
// A sentence that states a rule. A number the user typed is not trusted inside such a sentence unless the model
// declared it (an injected "the standard deduction is $50,000" must not pass as the user's own figure).
const RULE_CONTEXT = /\b(thresholds?|limits?|deductions?|exemptions?|exclusions?|brackets?|rates?|caps?|maximum|minimum|ceiling|phase[- ]?outs?|standard|allowances?|irs|law|rules?|required|must)\b|門檻|上限|下限|扣除額|免稅額|稅率|標準|國稅局|規定|必須/i
// Sentence split for that check: after . ! ? only before a capital or quote ("U.S. tax" stays one sentence).
const sentences = p => String(p).split(/(?<=[.!?])\s+(?=[A-Z"“(])|(?<=[。！？])/).filter(s => s.trim())

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

// ── Grounding helpers (lexical; see validateAnswer) ──────

// Identifiers that name a specific form, schedule or regime. An answer may only name one that a cited quote or the
// user's question also names ("you also need Form 8938" needs a source that mentions 8938).
// "Form" must be followed by a form number and "Schedule" by a 1–2 letter id, so "form an LLC" and "schedule rules"
// are ordinary words, not references.
const ANCHOR_RE = /\bforms?\s+(\d{3,5}(?:-?[a-z]{1,4})?|w-?\d|ss-?\d|i-?\d{2,3})\b|\bschedules?\s+([a-z]{1,2}(?:-\d)?)\b|\b(w-?\d)\b|\b(1099|1098|1040|1065|1120|8938|3520|8949|2553|4868|5471|8606|8829|8833|1116|2555|941|940|114a?)(?:-?([a-z]{1,4}))?\b|\b(fbar|fincen|niit|itin|qbi|hsa|ira|s-?corp|c-?corp)\b/gi
function anchorsOf(text) {
  const out = new Set()
  const t = String(text).normalize('NFKC').toLowerCase()
  let m
  ANCHOR_RE.lastIndex = 0
  while ((m = ANCHOR_RE.exec(t))) {
    // "Form W-4" = "W-4" = w4; "Form 1099-B" = "1099-B" = 1099b; "Schedule D" = sched-d.
    if (m[1]) out.add(m[1].replace(/-/g, ''))
    else if (m[2]) out.add(`sched-${m[2].replace(/-/g, '')}`)
    else if (m[3]) out.add(m[3].replace('-', ''))
    else if (m[4]) out.add(m[4] + (m[5] || ''))
    else if (m[6]) out.add(m[6].replace('-', ''))
  }
  return out
}

// Words that carry no topic on their own (and would make every sentence "overlap" every quote).
const GENERIC_WORDS = new Set(('the and for are was were with that this from your you have has had not but can may will would should could ' +
  'also than then they them their there these those such into about over under more most less only other some any each what when where ' +
  'which while who how its our out all per get got just very much many been being does did make made use used using like even both either ' +
  'tax taxes taxed irs asklintax guide guides generally usually general year years rule rules apply applies applied amount amounts ' +
  'say says said note notes based depend depends whether same different example case cases thing things way ways need needs still').split(' '))
const lightStem = w => w.length > 5 && w.endsWith('ing') ? w.slice(0, -3) : w.length > 4 && w.endsWith('ed') ? w.slice(0, -2) : w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w
function contentWords(text) {
  return new Set((normText(text).replace(ANCHOR_RE, ' ').match(/[a-z][a-z'-]{2,}/g) || [])
    .map(w => lightStem(w.replace(/'s$|'/g, ''))).filter(w => w.length >= 3 && !GENERIC_WORDS.has(w)))
}
const overlap = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n }

// A sentence that states tax content and therefore needs a cited source.
const TAX_TERMS = /\b(tax\w*|deduct\w*|credits?|income|gains?|loss(es)?|withh\w*|refunds?|penalt\w*|thresholds?|filing|file[sd]?|report\w*|forms?|schedules?|fbar|fincen|basis|exempt\w*|brackets?|rates?|wages?|dividends?|interest|returns?|owe[sd]?|payroll|gifts?|estates?|inherit\w*|resident|nonresident|aliens?|accounts?|salary|distribution\w*|contribution\w*)\b|稅|申報|扣除|所得|收入|利得|表格|國稅局|門檻|罰|預扣|扣繳|退稅|報|贈與|帳戶|居民|薪資/i
// Offers, sign-offs and referrals are not tax statements and need no citation.
const CONVERSATIONAL = /^(if you (want|like)\s*,?\s*i (can|could)|i can (also )?(help|explain|walk)|let me know|feel free|hope this helps|如果你(需要|想要?|願意)[^。]{0,12}我可以|我可以(再)?(幫|協助|說明)|歡迎(再)?(詢問|提問))/i
// "I can't calculate the exact tax yet; I'd need your filing status and taxable income." — a statement that facts
// are MISSING is not a tax statement and needs no citation (Phase 3.1 final). It qualifies only if it says so
// explicitly, names no form/program, has no figure except the user's own tax year, and asserts no rule: words such
// as must, required, taxed, taxable, deductible, eligible, threshold, rate, because are disqualifying. Phrases that
// merely NAME the missing fact (filing status, taxable income …) are removed before that test.
const MISSING_INFO = /\b(?:i|we)\s+(?:can(?:no|')t|cannot|am unable to|'m unable to|could not|couldn't)\s+(?:yet\s+)?(?:calculate|compute|figure(?: out)?|determine|estimate|give|tell)\b|\b(?:i|we)(?:\s+would|'d|\s+will)?\s+(?:still\s+)?need\s+(?:to know\s+)?(?:your|a few|more|the following)\b|\bto (?:calculate|compute|figure(?: out)?|determine|estimate)\s+(?:the|your)\s+(?:exact|precise|actual|specific)\b|還需要(?:知道|你的)?|無法(?:算出|計算|確定)|不能算出|才能(?:算出|計算|套用|確定)/i
const MISSING_FACT_NAMES = /\b(?:filing status|taxable income|gross income|adjusted gross income|tax year|cost basis|holding period|other income|deductions? (?:you (?:take|claim)|or adjustments)|exact (?:tax|amount))\b|報稅身分|應稅所得|總收入|稅務年度|成本基礎|持有期間|精確稅額|實際稅額/gi
const RULE_ASSERTION = /\b(?:must|required?|requires|have to|has to|need to (?:file|report|pay)|taxed|taxable|tax-free|deductible|deduct|eligible|eligibility|qualif\w*|exempt\w*|thresholds?|limits?|rates?|brackets?|credits?|penalt\w*|owe[sd]?|because|since|therefore|so you)\b|必須|要申報|需要申報|課稅|免稅|可以扣除|扣除額|符合|資格|門檻|稅率|罰|因為|所以/i
function missingInfoOnly(sentence, questionYears) {
  if (!MISSING_INFO.test(sentence)) return false
  if (anchorsOf(sentence).size) return false
  if (extractNumbers(sentence).some(n => !(n.valid && isYear(n) && questionYears.includes(n.value)))) return false
  return !RULE_ASSERTION.test(sentence.replace(MISSING_FACT_NAMES, ' '))
}
const REFERRAL = /\b(tax professional|cpa|enrolled agent|tax advisor)s?\b|專業人士|會計師|稅務顧問/i

// A legal-looking noun right before (or just after) an amount: "the standard deduction is $50,000", "a $10,000 limit".
const LEGAL_NOUN = /\b(thresholds?|limits?|deductions?|exemptions?|exclusions?|brackets?|caps?|maximum|minimum|ceilings?|phase[- ]?outs?|credits?|allowances?|filing requirements?)\b|門檻|上限|下限|扣除額|免稅額|額度|抵稅額/i
// Only the figure's own clause counts (cut at , ; : ( ) and their Chinese forms), and a window edge never splits a
// word ("capital" cut to "cap" is not the noun "cap").
const CLAUSE_BREAK = /[,;:()，；：（）。]/
function legalNear(sentence, raw) {
  const i = sentence.indexOf(raw)
  if (i < 0) return LEGAL_NOUN.test(sentence)
  let before = sentence.slice(Math.max(0, i - 60), i)
  let after = sentence.slice(i + raw.length, i + raw.length + 25)
  const cut = before.search(/[,;:()，；：（）。][^,;:()，；：（）。]*$/)
  if (cut >= 0) before = before.slice(cut + 1)
  else if (i > 60) before = before.replace(/^\S*/, '')
  const end = after.search(CLAUSE_BREAK)
  if (end >= 0) after = after.slice(0, end)
  else if (i + raw.length + 25 < sentence.length) after = after.replace(/\S*$/, '')
  return LEGAL_NOUN.test(before) || LEGAL_NOUN.test(after)
}
const EXAMPLE_START = /^\s*(for example|for instance|example|suppose|say you|舉例|例如|假設|比方)/i

// ── Tax-year attachment (Phase 3.1) ──────────────────────
// A "Tax year 2026 — filing status | …" line heads the table rows directly below it. A quoted row inherits the
// year of the NEAREST header above it, reached through table rows only; a header of another table, or a year in
// prose elsewhere in the passage, never applies.
// A standalone "Tax Year 2025" caption line (card layouts) applies only to the figure line right above or below it.
const TABLE_HEADER = /^\s*(?:tax\s+year\s+((?:19|20)\d\d)|((?:19|20)\d\d)\s*(?:稅務)?年度)\b.*\|/i
const CAPTION = /^\s*(?:tax\s+year\s+((?:19|20)\d\d)|((?:19|20)\d\d)\s*(?:稅務)?年度)\s*$/i
// Passage lines [start, end) that contain the quote, or null.
function quoteSpan(lines, quote) {
  const nq = normText(quote).replace(/^["'.…\s]+|["'.…\s]+$/g, '')
  let start = -1
  for (let i = 0; i < lines.length; i++) if (normText(lines.slice(i).join(' ')).includes(nq)) start = i; else break
  if (start < 0) return null
  let end = start + 1
  while (end < lines.length && !normText(lines.slice(start, end).join(' ')).includes(nq)) end++
  return [start, end]
}
// Tax years that directly apply to the quoted lines (optionally only the lines that contain `figure`).
function headerYearsForQuote(sourceText, quote, figure = null) {
  const lines = String(sourceText).split('\n')
  const span = quoteSpan(lines, quote)
  if (!span) return []
  const years = new Set()
  for (let i = span[0]; i < span[1]; i++) {
    if (figure && !hasValue(extractNumbers(lines[i], { words: true }), figure.value, figure.currency, figure.unit)) continue
    if (lines[i].includes('|')) {
      for (let j = i; j >= 0 && lines[j].includes('|'); j--) {
        const m = TABLE_HEADER.exec(lines[j])
        if (m) { years.add(Number(m[1] || m[2])); break }
      }
    }
    for (const k of [i - 1, i + 1]) {
      const m = k >= 0 && k < lines.length ? CAPTION.exec(lines[k]) : null
      if (m) years.add(Number(m[1] || m[2]))
    }
  }
  return [...years]
}

// ── Rate tables (Phase 3.1 final) ────────────────────────
// A quoted row of a rate table inherits its column headers ONLY when the structure is unambiguous:
//   header  "Tax year 2026 — filing status | 0% rate up to | 15% rate up to | 20% rate above"
//   row     "Single | $49,450 | $545,500 | $545,500"
// i.e. the header names a tax year, every other header cell holds exactly one rate (no rate twice), the row has the
// same number of cells, its first cell is exactly one filing status and every other cell exactly one amount.
// Anything else (no year, extra/missing cells, two rates in a cell, a non-status row label) inherits nothing.
const FILING_STATUS = [
  ['single', /\bsingle\b|單身/i],
  ['mfj', /\bmarried (?:couples? )?filing jointly\b|\bmfj\b|合併申報/i],
  ['mfs', /\bmarried filing separately\b|\bmfs\b|分開申報|分別申報/i],
  ['hoh', /\bhead of household\b|\bhoh\b|戶長/i],
  ['qss', /\bqualifying (?:surviving spouse|widow\(?er\)?)\b/i],
]
const statusesIn = text => FILING_STATUS.filter(([, re]) => re.test(text)).map(([k]) => k)
// Filing-status mentions with their positions in a text.
function statusMentions(text) {
  const out = []
  for (const [k, re] of FILING_STATUS) {
    const g = new RegExp(re.source, 'gi')
    let m
    while ((m = g.exec(text))) out.push({ status: k, index: m.index })
  }
  return out
}
// Rows of a cited rate table covered by the quote: [{ year, status, columns: [{ rate, value, currency }] }] or [].
function rateTableRows(sourceText, quote) {
  const lines = String(sourceText).split('\n')
  const span = quoteSpan(lines, quote)
  if (!span) return []
  const rows = []
  for (let i = span[0]; i < span[1]; i++) {
    if (!lines[i].includes('|') || TABLE_HEADER.test(lines[i])) continue
    let h = i - 1
    while (h >= 0 && lines[h].includes('|') && !TABLE_HEADER.test(lines[h])) h--
    if (h < 0 || !lines[h].includes('|')) continue // no year header directly above, through table rows only
    const head = lines[h].split('|').map(c => c.trim())
    const cells = lines[i].split('|').map(c => c.trim())
    if (head.length < 2 || cells.length !== head.length) continue // malformed: cells do not line up
    const year = Number((TABLE_HEADER.exec(lines[h]) || [])[1] || (TABLE_HEADER.exec(lines[h]) || [])[2])
    const status = statusesIn(cells[0])
    if (!year || status.length !== 1 || cells[0].replace(FILING_STATUS.find(([k]) => k === status[0])[1], '').trim()) continue
    const rates = head.slice(1).map(c => extractNumbers(c).filter(n => n.valid && n.percent))
    const values = cells.slice(1).map(c => extractNumbers(c).filter(n => n.valid && !n.percent && !isYear(n)))
    const rateList = rates.map(r => (r.length === 1 ? r[0].value : null))
    const columns = rateList.map((rate, k) => ({
      rate: rate !== null && rateList.filter(x => x === rate).length === 1 && values[k].length === 1 ? rate : null, // unique rate, one amount
      value: values[k].length === 1 ? values[k][0].value : null,
      currency: values[k].length === 1 ? values[k][0].currency : null,
    }))
    rows.push({ year, status: status[0], columns })
  }
  return rows
}

// Non-monetary eligibility condition next to a number ("under 65", "age 65 or older", 「65 歲以上」).
const CONDITION_BEFORE = /\b(under|over|below|above|at least|ages?|aged|older than|younger than)\s*$/i
const CONDITION_AFTER = /^\s*(or older|or over|or younger|and older|and over|years? old|歲)/i
function conditionAround(sentence, raw) {
  const i = sentence.indexOf(raw)
  if (i < 0) return null
  const before = CONDITION_BEFORE.exec(sentence.slice(Math.max(0, i - 20), i))
  if (before) return { side: 'before', word: before[1].toLowerCase() }
  const after = CONDITION_AFTER.exec(sentence.slice(i + raw.length, i + raw.length + 15))
  if (after) return { side: 'after', word: after[1].toLowerCase() }
  return null
}
// A line of arithmetic ("$80,000 + $5,000 - $15,750 = $69,250", "85,000 minus 15,750").
const CALCULATION = /\d\s*[-−–+×*÷/=]\s*\$?\d|\b(minus|plus|subtract\w*|times|equals)\b|減去|加上|等於/i

// ── Answer validation ────────────────────────────────────

const SMALL_CONSTANTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 100])

/**
 * @param parsed   the model's JSON (already schema-shaped)
 * @param ctx      { question, evidence: Map(id → { kind: 'library'|'official', text, taxYear, articleId?, url?, title }) }
 * @returns        { ok: true, paragraphs, guides, officialSources } | { ok: false, reason }
 */
// Applicability of an official passage to a tax year (year-specific vs. verified continuing rule); see official.js.
const appliesToYear = (...a) => require('./official.js').appliesToYear(...a)

// ── Reviewed figure conditions (Phase 4.1 curated official excerpts) ──
const sameFigure = (a, b) => !!a && !!b && a.valid && b.valid && Math.abs(a.value - b.value) < 1e-9 && !!a.percent === !!b.percent
function notCitableIn(src, n) {
  return !!src && Array.isArray(src.notCitable) && src.notCitable.some(raw => sameFigure(extractNumbers(raw)[0], n))
}
// The clause of the sentence that holds the figure: split at ";", "but", "however", "whereas", "while" (and Chinese
// equivalents), never at commas (they are inside amounts and too weak a boundary to exclude a case).
const FIGURE_CLAUSE_BREAK = /[;；]|\b(?:but|however|whereas|while|unlike)\b|但是|但|然而|不過/i
function clauseOf(sentence, raw) {
  const at = Math.max(0, sentence.indexOf(raw))
  let start = 0
  for (const part of sentence.split(FIGURE_CLAUSE_BREAK)) {
    const i = sentence.indexOf(part, start)
    if (at >= i && at < i + part.length) return part
    start = i + part.length
  }
  return sentence
}
function conditionProblem(src, n, sentence, paragraph) {
  const conds = (src && Array.isArray(src.figureConditions) ? src.figureConditions : []).filter(c => sameFigure(extractNumbers(c.figure)[0], n))
  if (!conds.length) return null
  const para = normText(paragraph)
  const clause = normText(clauseOf(sentence, n.raw))
  for (const c of conds) {
    // A term inside a longer term of the same condition does not count ("與配偶同住" inside "未與配偶同住").
    const all = [...(c.anyOf || []), ...(c.noneOf || []), ...(c.exclusiveWith || [])].map(normText)
    const has = (text, t) => occurrences(text, normText(t), all).length > 0
    if ((c.noneOf || []).some(t => has(clause, t))) return 'figure_condition_violated'
    if ((c.anyOf || []).length && !c.anyOf.some(t => has(para, t))) return 'figure_condition_missing'
    // Table row/column labels ("self-only" vs "family", one filing status vs another): when the figure's clause names
    // any label of the set, the one nearest to the figure must be this figure's own label (ties fail).
    if ((c.exclusiveWith || []).length && nearestLabel(clause, normText(n.raw), c.anyOf || [], c.exclusiveWith, all) === false) return 'figure_condition_mismatch'
  }
  return null
}
// true / false when the nearest label is / is not one of `own`; null when the sentence names no label.
// Start positions of `term` in `text`, leaving out those inside an occurrence of a longer term from `all`.
function occurrences(text, term, all) {
  const out = []
  if (!term) return out
  const longer = all.filter(t => t.length > term.length && t.includes(term))
  for (let i = text.indexOf(term); i >= 0; i = text.indexOf(term, i + 1)) {
    const inside = longer.some(l => { for (let j = text.indexOf(l); j >= 0; j = text.indexOf(l, j + 1)) if (j <= i && i + term.length <= j + l.length) return true; return false })
    if (!inside) out.push(i)
  }
  return out
}
function nearestLabel(sentence, raw, own, others, all = []) {
  const at = sentence.indexOf(raw)
  if (at < 0) return null
  const end = at + raw.length
  const spans = []
  for (const [list, mine] of [[own, true], [others, false]]) {
    for (const t of list) {
      const term = normText(t)
      for (const i of occurrences(sentence, term, all)) spans.push({ i, j: i + term.length, mine })
    }
  }
  if (!spans.length) return null
  const dist = s => (s.j <= at ? at - s.j : s.i >= end ? s.i - end : 0)
  const best = Math.min(...spans.map(dist))
  const nearest = spans.filter(s => dist(s) === best)
  return nearest.every(s => s.mine)
}

function validateAnswer(parsed, ctx) {
  // detail (the offending number, if any) is for offline debugging and evaluation; callers log only reason.
  const fail = (reason, detail) => ({ ok: false, reason, ...(detail ? { detail: String(detail).slice(0, 40) } : {}) })
  const paragraphs = (parsed.paragraphs || []).filter(p => typeof p === 'string').map(p => p.trim()).filter(Boolean)
  if (!paragraphs.length || paragraphs.length > 4 || paragraphs.some(p => p.length > 1200)) return fail('bad_paragraphs')
  if (paragraphs.some(p => /https?:\/\/|www\./i.test(p))) return fail('url_in_text') // links come only from server-held sources

  // Claims: the cited source must be one the server supplied, and the quote must be in it.
  const claims = Array.isArray(parsed.claims) ? parsed.claims : []
  if (!claims.length) return fail('no_claims')
  if (claims.length > 12) return fail('too_many_claims')
  const questionNumbers = extractNumbers(ctx.question, { words: true })
  const questionYears = questionNumbers.filter(isYear).map(n => n.value)
  for (const c of claims) {
    const src = ctx.evidence.get(c.source_id)
    if (!src) return fail('unknown_source')
    if (!quoteInSource(c.quote, src.text)) return fail('quote_not_in_source')
    const year = String(c.tax_year || '').trim()
    if (year) {
      if (!/^(19|20)\d\d$/.test(year)) return fail('bad_tax_year')
      // A quoted table row takes the year of its directly applicable header; then the claim must carry exactly
      // that year (a 2026 row cannot be labelled 2025 just because the guide's review year is 2025). Otherwise the
      // claim's year must be the source's year, or be stated in the quoted text itself.
      const headers = headerYearsForQuote(src.text, c.quote)
      if (headers.length) { if (!headers.includes(Number(year)) && !normText(c.quote).includes(year)) return fail('tax_year_mismatch', year) }
      else if (src.taxYear && src.taxYear !== year && !normText(c.quote).includes(year)) return fail('tax_year_mismatch', year)
    }
  }
  const citedIds = new Set(claims.map(c => c.source_id))
  // A question about a specific year must be answered from sources for that year.
  if (questionYears.length) {
    const yearOk = [...citedIds].some(id => {
      const s = ctx.evidence.get(id)
      // An official source also fits when its reviewed applicability covers the year (continuing rule / effective period).
      return questionYears.some(y => s.taxYear === String(y) || s.text.includes(String(y)) || String(s.location || '').includes(String(y)) ||
        (s.kind === 'official' && appliesToYear(s, y)))
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
  // Durations carry a unit ("1 year" ≠ "1 month"); a spelled-out duration in the question or a quote ("more than
  // one year") supports the same duration written with digits. A number the user typed that the model forgot to
  // declare is accepted as the user's — same value, currency, percent and unit — except inside a sentence that
  // states a rule. Legal figures, rates and calculations still have to be declared and pass their checks.
  //
  // Tax years (Phase 3). A legal figure whose quote states a tax year is YEAR-SPECIFIC: it may be used only when
  // the user named that year (no year given → 'tax_year_needed', which the caller turns into a question about the
  // year; another year → 'tax_year_mismatch'), and the paragraph must name the year. A year may appear in an
  // answer only if the user gave it or a cited quote states it — the guide's review-year metadata is not enough,
  // so a stable rule is never dressed up with an assumed year.
  // Examples (Phase 3): an "example" figure must sit in a sentence labelled as an example, and is checked like a
  // legal figure when it is a rate or sits next to a legal noun (threshold, limit, deduction …): a fabricated
  // threshold cannot pass as an illustration. Hypothetical arithmetic may use example figures only inside a
  // labelled example.
  const declared = (Array.isArray(parsed.numbers) ? parsed.numbers : []).slice(0, 40)
  const decl = declared.map(d => ({ ...d, parsed: extractNumbers(String(d.value || ''))[0] })).filter(d => d.parsed && d.parsed.valid)
  // A year is ATTACHED to a figure when it is in the same sentence or table row of the quote, or in the table
  // header that directly applies to the quoted row in the cited passage (quoting only "Single | $15,750" from a
  // "Tax Year 2025" table does not make it a stable rule). A year in another sentence, or the header of another
  // table in the same passage, is not attached (Phase 3.1: a 2026 row can no longer pass as a 2025 figure).
  const quoteInfo = claims.map(c => {
    const srcText = ctx.evidence.get(c.source_id).text
    const segments = String(c.quote).split(/(?<=[.!?])\s+|\n/).map(seg => ({ nums: extractNumbers(seg, { words: true }), years: extractNumbers(seg).filter(isYear).map(n => n.value) }))
    // An official source published for ONE tax year (e.g. "Publication 969 (2025)") makes every figure in it a figure
    // for that year, unless the text attaches another year to it ("For 2026, … $4,400"). Phase 4.1.
    const src = ctx.evidence.get(c.source_id)
    // A section heading that names exactly one year ("What's New for 2026") outranks the edition year for its text.
    const sectionYears = src.kind === 'official' ? [...new Set((String(src.location || '').match(/\b(?:19|20)\d\d\b/g) || []).map(Number))] : []
    const editionYear = sectionYears.length === 1 ? sectionYears[0]
      : src.kind === 'official' && src.yearScope === 'tax_year' && /^(19|20)\d\d$/.test(String(src.taxYear || '')) && !sectionYears.length ? Number(src.taxYear) : null
    return {
      claim: c, srcText, nums: extractNumbers(c.quote, { words: true }), words: contentWords(c.quote), rows: rateTableRows(srcText, c.quote),
      years: [...extractNumbers(c.quote).filter(isYear).map(n => n.value), ...headerYearsForQuote(srcText, c.quote), ...(editionYear ? [editionYear] : [])],
      yearsFor: (value, currency, unit) => {
        const inSeg = segments.filter(seg => hasValue(seg.nums, value, currency, unit))
        const attached = [...new Set([...inSeg.flatMap(seg => seg.years), ...(inSeg.length ? headerYearsForQuote(srcText, c.quote, { value, currency, unit }) : [])])]
        return attached.length || !editionYear || !inSeg.length ? attached : [editionYear]
      },
    }
  })
  const quoteYears = new Set(quoteInfo.flatMap(q => q.years))
  // Legal figures already validated in context earlier in this answer (value/currency/unit → their tax years).
  const established = []
  const establishedFor = n => established.find(e => sameValue(e.value, n.value) && sameCurrency(e.currency, n.currency) && sameUnit(e.unit, n.unit))
  // The filing status the sentence attaches to the figure: the mention nearest to it in the sentence, else the
  // paragraph's only status. null when none or ambiguous.
  const statusFor = (sentence, paragraph, raw) => {
    const at = Math.max(0, sentence.indexOf(raw))
    const inSentence = statusMentions(sentence)
    if (inSentence.length) return inSentence.sort((a, b) => Math.abs(a.index - at) - Math.abs(b.index - at))[0].status
    const inParagraph = [...new Set(statusMentions(paragraph).map(m => m.status))]
    return inParagraph.length === 1 ? inParagraph[0] : null
  }
  // Rate-table rows (of quotes from one source) that contain this amount.
  const rowsWith = (sourceId, n) => quoteInfo.filter(q => q.claim.source_id === sourceId)
    .flatMap(q => q.rows).filter(r => r.columns.some(c => c.value !== null && sameValue(c.value, n.value) && sameCurrency(c.currency, n.currency)))
  // A rate inherited from the column header of a quoted row: same table, same column, same filing status, same
  // tax year. The amount nearest to the rate in the sentence (if the sentence names any amount of that row) must
  // be the one in the rate's column; otherwise the paragraph must already state an amount of that row.
  // Returns { ok: true } or { ok: false, reason } — the reason of the closest candidate, for debugging.
  const inheritedRate = (d, n, sentence, paragraph, paragraphYears) => {
    const at = sentence.indexOf(n.raw)
    const amounts = extractNumbers(sentence).filter(m => m.valid && !m.percent && !isYear(m)).map(m => ({ m, i: sentence.indexOf(m.raw) }))
    let reason = null
    for (const q of quoteInfo.filter(x => x.claim.source_id === d.source_id)) {
      for (const row of q.rows) {
        const k = row.columns.findIndex(c => c.rate !== null && sameValue(c.rate, n.value))
        if (k < 0) continue
        if (statusFor(sentence, paragraph, n.raw) !== row.status) { reason = reason || 'table_status_mismatch'; continue }
        if (!questionYears.length) { reason = 'tax_year_needed'; continue }
        if (!questionYears.includes(row.year)) { reason = 'tax_year_mismatch'; continue }
        if (!paragraphYears.includes(row.year)) { reason = 'tax_year_not_stated'; continue }
        const rowAmounts = amounts.filter(a => row.columns.some(c => c.value !== null && sameValue(c.value, a.m.value)))
        if (rowAmounts.length) {
          const nearest = rowAmounts.sort((a, b) => Math.abs(a.i - at) - Math.abs(b.i - at))[0]
          if (sameValue(nearest.m.value, row.columns[k].value)) return { ok: true }
          reason = 'table_column_mismatch'
        } else if (extractNumbers(paragraph).some(m => m.valid && !m.percent && row.columns.some(c => c.value !== null && sameValue(c.value, m.value)))) {
          return { ok: true }
        }
      }
    }
    return { ok: false, reason }
  }
  const inheritedRates = [] // sentences whose rates were verified through a rate table (for the citation check)
  // Quotes that contain this figure (from one cited source, or from any cited source).
  const quotesWith = (value, currency, unit, sourceId = null) => quoteInfo.filter(q => (sourceId === null || q.claim.source_id === sourceId) && hasValue(q.nums, value, currency, unit))
  // The sentence must talk about what the quote talks about (English only; a Chinese sentence cannot be compared
  // word-for-word with an English quote, so it relies on the number and year checks alone).
  const inContext = (q, sentence) => sentence === null || CJK.test(sentence) || overlap(contentWords(sentence), q.words) >= 1
  const supported = (d, currency, unit, sentence = null) => {
    const { value } = d.parsed
    if (d.category === 'legal') return citedIds.has(d.source_id) && quotesWith(value, currency, unit, d.source_id).some(q => inContext(q, sentence))
    if (d.category === 'user') return hasValue(questionNumbers, value, currency, unit)
    return !!d.ok
  }
  for (const d of decl) if (d.category === 'legal' || d.category === 'user') d.ok = supported(d, d.parsed.currency, d.parsed.unit)
  const legal = decl.filter(d => d.category === 'legal' && d.ok)
  const examples = decl.filter(d => d.category === 'example')
  let progress = true
  while (progress) {
    progress = false
    for (const d of decl.filter(x => x.category === 'arithmetic' && !x.ok)) {
      const r = evaluate(d.expression)
      if (!r) continue
      const strict = v => SMALL_CONSTANTS.has(v) || hasValue(questionNumbers, v) || legal.some(x => sameValue(x.parsed.value, v)) ||
        decl.some(x => x.category === 'arithmetic' && x.ok && !x.viaExample && sameValue(x.parsed.value, v))
      const viaExample = v => examples.some(x => sameValue(x.parsed.value, v)) || decl.some(x => x.category === 'arithmetic' && x.ok && x.viaExample && sameValue(x.parsed.value, v))
      const target = d.parsed.percent ? d.parsed.value / 100 : d.parsed.value
      // Sums and differences must be exact (a whole-dollar result may round half a dollar); only a product or quotient
      // may round, within 0.5% (Phase 3.1: "$80,000 + $5,000 − $15,750 = $69,000" is no longer accepted).
      const additive = !/[*/%×÷]/.test(String(d.expression))
      const tolerance = additive ? (Number.isInteger(d.parsed.value) ? 0.5 : 0.01) : Math.max(0.01, Math.abs(target) * 0.005, Number.isInteger(d.parsed.value) ? 0.5 : 0)
      if (r.literals.every(v => strict(v) || viaExample(v)) && Math.abs(r.value - target) <= tolerance) {
        d.ok = true; d.viaExample = !r.literals.every(strict); progress = true
      }
    }
  }
  const yearAllowed = v => questionYears.includes(v) || quoteYears.has(v)

  for (const p of paragraphs) {
    const paragraphYears = extractNumbers(p).filter(isYear).map(n => n.value)
    for (const sentence of sentences(p)) {
      const exampleSentence = EXAMPLE_MARKER.test(sentence) || EXAMPLE_START.test(p)
      for (const n of extractNumbers(sentence)) {
        if (!n.valid) return fail('unrecognized_amount', n.raw) // ambiguous or malformed amount: never guess
        if (isYear(n)) {
          if (!yearAllowed(n.value)) return fail('unsupported_year', n.raw)
          continue
        }
        const matches = decl.filter(x => sameValue(x.parsed.value, n.value) && x.parsed.percent === n.percent && sameCurrency(x.parsed.currency, n.currency) && sameUnit(x.parsed.unit, n.unit))
        const currency = x => n.currency || x.parsed.currency
        const unit = x => n.unit || x.parsed.unit
        if (!matches.length) {
          // Undeclared, but typed by the user (not a rate, not inside a rule statement): the user's own figure.
          if (!n.percent && hasValue(questionNumbers, n.value, n.currency, n.unit) && !RULE_CONTEXT.test(sentence)) continue
          // Narrow exception (Phase 3.1): an undeclared NON-MONETARY eligibility condition ("under 65") is accepted
          // only when a cited quote on the same subject states the exact same condition, and that quote's tax year
          // fits the user's. Money, rates, periods and every other number still have to be declared and verified.
          const cond = !n.percent && !n.currency && !n.unit && Number.isInteger(n.value) && n.value >= 10 && n.value <= 120 ? conditionAround(sentence, n.raw) : null
          if (cond) {
            const phrase = cond.side === 'before' ? `${cond.word} ${n.value}` : `${n.value} ${cond.word}`
            const ok = quoteInfo.some(q => normText(q.claim.quote).replace(/\s+(?=歲)/g, ' ').includes(phrase) && inContext(q, sentence) &&
              (!questionYears.length || !q.years.length || q.years.some(y => questionYears.includes(y))))
            if (ok) continue
          }
          return fail('undeclared_number', n.raw)
        }
        // Phase 4.1: a reviewed official excerpt can mark a figure as not citable from it (the prior-year FROM value of
        // "increased from $7,000 to $7,500"); a declaration citing only such a source does not support the figure.
        const citable = x => !notCitableIn(ctx.evidence.get(x.source_id), n)
        const legalCandidates = matches.filter(x => x.category === 'legal' && x.ok && supported(x, currency(x), unit(x), sentence))
        const legalMatch = legalCandidates.find(citable)
        if (!legalMatch && legalCandidates.length) return fail('figure_not_citable', n.raw)
        if (legalMatch && !n.percent) {
          // An amount quoted from a rate-table row belongs to that row's filing status (and only then is it used).
          const rows = rowsWith(legalMatch.source_id, n)
          const proseSupport = quotesWith(n.value, currency(legalMatch), unit(legalMatch), legalMatch.source_id).some(q => !q.rows.length && inContext(q, sentence))
          if (rows.length && !proseSupport && !rows.some(r => r.status === statusFor(sentence, p, n.raw))) return fail('table_status_mismatch', n.raw)
        }
        if (legalMatch) {
          // Reviewed applicability conditions (Phase 4.1): the paragraph must state one of the figure's conditions
          // ("self-only", "nonresident alien …"), and the figure's own clause must not apply it to an excluded case
          // ("foreign corporation"). A correct number without its conditions is not verified evidence.
          const cond = conditionProblem(ctx.evidence.get(legalMatch.source_id), n, sentence, p)
          if (cond) return fail(cond, n.raw)
          // Year-specific figure: the quotes that state it also state a tax year.
          const qs = quotesWith(legalMatch.parsed.value, currency(legalMatch), unit(legalMatch), legalMatch.source_id).filter(q => inContext(q, sentence))
          const yearsOf = q => q.yearsFor(legalMatch.parsed.value, currency(legalMatch), unit(legalMatch))
          if (qs.length && qs.every(q => yearsOf(q).length)) {
            if (!questionYears.length) return fail('tax_year_needed', n.raw)
            const fitting = qs.filter(q => yearsOf(q).some(y => questionYears.includes(y)))
            if (!fitting.length) return fail('tax_year_mismatch', n.raw)
            if (!fitting.some(q => yearsOf(q).some(y => paragraphYears.includes(y)))) return fail('tax_year_not_stated', n.raw)
            established.push({ value: n.value, currency: currency(legalMatch), unit: unit(legalMatch), years: [...new Set(fitting.flatMap(yearsOf))] })
          } else {
            established.push({ value: n.value, currency: currency(legalMatch), unit: unit(legalMatch), years: [] })
          }
          continue
        }
        // In a cited quote, but that quote is about something else than this sentence.
        if (matches.some(x => x.category === 'legal' && x.ok && supported(x, currency(x), unit(x)))) {
          // Exception (Phase 3.1): a calculation line may reuse a legal figure already validated in context earlier in
          // this answer — same value, currency and unit; every other figure in the line verified; no tax year in
          // the paragraph other than the one the figure was validated for.
          const prior = establishedFor({ value: n.value, currency: n.currency, unit: n.unit })
          const others = extractNumbers(sentence).filter(m => m.valid && !isYear(m) && !sameValue(m.value, n.value))
          // A declared calculation result counts here; its own arithmetic is checked when the loop reaches it.
          const verified = m => hasValue(questionNumbers, m.value, m.currency, m.unit) || established.some(e => sameValue(e.value, m.value)) ||
            decl.some(x => !x.viaExample && ((x.category === 'arithmetic') || (x.category === 'user' && x.ok)) && sameValue(x.parsed.value, m.value))
          const yearsConsistent = !prior || !prior.years.length || paragraphYears.every(y => prior.years.includes(y))
          if (prior && CALCULATION.test(sentence) && others.every(verified) && yearsConsistent) continue
          return fail('legal_number_context_mismatch', n.raw)
        }
        const other = matches.find(x => (x.category === 'user' || x.category === 'arithmetic') && x.ok)
        // The user's own figure stated as a threshold, limit or deduction ("the standard deduction is $50,000"):
        // that is a legal claim, so it needs a cited quote no matter who typed the number.
        if (other && other.category === 'user' && legalNear(sentence, n.raw) && !quotesWith(n.value, n.currency, n.unit).some(q => inContext(q, sentence))) {
          return fail('user_number_as_rule', n.raw)
        }
        if (other) {
          if (other.viaExample && !exampleSentence) return fail('unsupported_number', n.raw) // hypothetical result outside an example
          // A result computed from example figures and presented as a threshold, limit or deduction is a legal claim.
          if (other.viaExample && legalNear(sentence, n.raw) && !quotesWith(n.value, n.currency, n.unit).some(q => inContext(q, sentence))) return fail('example_used_as_rule', n.raw)
          continue
        }
        if (matches.some(x => x.category === 'example') && exampleSentence) {
          // A rate, or an amount next to a legal noun, is a legal figure even inside an example: it needs a source.
          const needsSource = n.percent || legalNear(sentence, n.raw)
          if (!needsSource || quotesWith(n.value, n.currency, n.unit).some(q => inContext(q, sentence))) continue
          return fail(n.percent ? 'example_rate_unsupported' : 'example_used_as_rule', n.raw)
        }
        // A rate stated in a quoted rate-table row's column header (Phase 3.1 final).
        const rateDecl = n.percent && matches.find(x => x.category === 'legal' && citedIds.has(x.source_id))
        if (rateDecl) {
          const inh = inheritedRate(rateDecl, n, sentence, p, paragraphYears)
          if (inh.ok) { inheritedRates.push({ sentence, value: n.value }); continue }
          if (inh.reason) return fail(inh.reason, n.raw)
        }
        const cat = matches[0].category
        return fail(cat === 'legal' ? 'legal_number_not_in_source' : cat === 'user' ? 'user_number_not_in_question' : cat === 'arithmetic' ? 'arithmetic_invalid' : 'unsupported_number', n.raw)
      }
    }
  }

  // Citation integrity (Phase 3). This is a LEXICAL check — it cannot prove that a quote means what the sentence
  // says. It guarantees that every English sentence stating tax content shares at least one topic word with some
  // cited quote, and that any form, schedule or regime the answer names appears in a cited quote or in the user's
  // question. Offers, sign-offs and referrals need no source; neither does a sentence that only applies the
  // user's own figures ("Your $30,000 in wages is above that") without naming a rule.
  const quoteText = quoteInfo.map(q => q.claim.quote).join(' \n ')
  const knownAnchors = new Set([...anchorsOf(quoteText), ...anchorsOf(ctx.question)])
  // Phase 3.1: a form or agency the quote omits may still be named when a CITED passage names it in a sentence
  // about the same subject (sharing a topic word, or another form/program, with the answer's sentence). A
  // mention in an unrelated sentence, or only in an uncited passage, does not count.
  const citedSentences = [...new Set(quoteInfo.map(q => q.srcText))].flatMap(t => String(t).split(/(?<=[.!?])\s+|\n/))
  const passageSupports = (anchor, sentence) => {
    const words = contentWords(sentence)
    const others = [...anchorsOf(sentence)].filter(a => a !== anchor)
    return citedSentences.some(seg => {
      const segAnchors = anchorsOf(seg)
      return segAnchors.has(anchor) && (overlap(words, contentWords(seg)) >= 1 || others.some(a => segAnchors.has(a)))
    })
  }
  for (const p of paragraphs) for (const sentence of sentences(p)) {
    const s = sentence.trim()
    if (CONVERSATIONAL.test(s)) continue
    if (missingInfoOnly(s, questionYears)) continue
    const anchors = anchorsOf(s)
    for (const a of anchors) if (!knownAnchors.has(a) && !passageSupports(a, s)) return fail('unsupported_reference', a)
    const hasFigure = extractNumbers(s).some(n => n.valid && !isYear(n))
    if (!TAX_TERMS.test(s) && !hasFigure && !anchors.size) continue
    if (REFERRAL.test(s) && !hasFigure && !anchors.size) continue
    if (CJK.test(s)) continue // Chinese: covered by the number, year and reference checks above
    const figures = extractNumbers(s).filter(n => n.valid && !isYear(n))
    const appliesUserFacts = figures.length > 0 && !anchors.size && !LEGAL_NOUN.test(s) &&
      figures.every(n => hasValue(questionNumbers, n.value, n.currency, n.unit) || decl.some(x => x.category === 'arithmetic' && x.ok && !x.viaExample && sameValue(x.parsed.value, n.value)))
    if (appliesUserFacts) continue
    // A calculation line built only from the user's figures, verified results and legal figures already validated
    // earlier in this answer restates what was cited; it needs no new source (Phase 3.1).
    const calculationOfVerified = CALCULATION.test(s) && figures.length > 0 && !anchors.size && figures.every(n =>
      hasValue(questionNumbers, n.value, n.currency, n.unit) || establishedFor(n) ||
      decl.some(x => x.category === 'arithmetic' && x.ok && !x.viaExample && sameValue(x.parsed.value, n.value)))
    if (calculationOfVerified) continue
    // A sentence stating rates verified through a quoted rate-table row (and otherwise only verified figures) is
    // grounded by that table.
    const tableFacts = figures.length > 0 && !anchors.size && figures.some(n => n.percent && inheritedRates.some(r => r.sentence === sentence && sameValue(r.value, n.value))) &&
      figures.every(n => (n.percent && inheritedRates.some(r => r.sentence === sentence && sameValue(r.value, n.value))) || establishedFor(n) || hasValue(questionNumbers, n.value, n.currency, n.unit))
    if (tableFacts) continue
    const words = contentWords(s)
    if (!words.size) continue
    const grounded = quoteInfo.some(q => overlap(words, q.words) >= 1) || [...anchors].some(a => anchorsOf(quoteText).has(a))
    if (!grounded) return fail('uncited_statement', s.slice(0, 40))
  }

  const guides = [...new Set([...citedIds].map(id => ctx.evidence.get(id)).filter(s => s.kind === 'library').map(s => s.articleId))].slice(0, 3)
  const officialSources = [...new Set([...citedIds])].map(id => ctx.evidence.get(id)).filter(s => s.kind === 'official')
    .map(s => ({ url: s.url, title: s.title, taxYear: s.taxYear })).slice(0, 4)
  return { ok: true, paragraphs: paragraphs.slice(0, 3).map(p => p.slice(0, 900)), guides, officialSources }
}

// A clarifying question may ask about a year ("Did you sell in 2025?"), a holding or residence period ("Did you
// hold it for more than 1 year?", 「持有超過 1 年嗎？」) and repeat the asker's own numbers, but must not state
// money amounts or rates.
function validateClarifyingQuestion(text, question) {
  const q = String(text || '').trim()
  if (!q || q.length > 400 || /https?:\/\//i.test(q)) return false
  const allowed = extractNumbers(question, { words: true })
  const duration = n => !!n.unit && !n.currency && !n.percent
  return extractNumbers(q).every(n => n.valid && (isYear(n) || duration(n) || hasValue(allowed, n.value, n.currency, n.unit)))
}

module.exports = { normText, quoteInSource, extractNumbers, evaluate, validateAnswer, validateClarifyingQuestion, CJK }

/**
 * Lina retrieval — server-side ranking over passages from the 20 published guides
 * (knowledge.json, generated at build time by scripts/build-lina-knowledge.js).
 *
 * Natural-language questions: BM25 over passage text (+ heading), so not every word has to
 * match. Chinese questions are mapped to English search terms through a small glossary, and
 * articles whose Traditional Chinese title/keywords (lib/library-zh-tw.js) match the question
 * get a boost. A confidence gate decides whether the guides cover the question at all.
 */

const KNOWLEDGE = require('./knowledge.json')
const { ARTICLES } = require('../../../lib/articles')
const { ARTICLES_ZH_TW } = require('../../../lib/library-zh-tw')

const CJK = /[㐀-鿿豈-﫿]/

const STOP = new Set(('a an the and or but if then so of to in on at by for from with about as into over under than ' +
  'is are was were be been being am do does did done have has had having i me my mine we us our you your he she it its ' +
  'they them their this that these those there here what which who whom whose when where why how can could should would ' +
  'will shall may might must need needs want get got any some all each every no not yes just also too very more most ' +
  'much many one ones own same other such only please tell explain know question questions thing things really ' +
  'u.s us. dont doesnt im ive id youre whats').split(/\s+/))

// Light stemming applied identically to passages and queries.
function stem(w) {
  if (w.length > 5 && w.endsWith('ies')) return w.slice(0, -3) + 'y'
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3)
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1)
  return w
}

// Keep tax identifiers together: "S-Corp" → scorp, "1099-K" → 1099k, "W-2" → w2.
function normalizeEn(text) {
  return String(text).normalize('NFKC').toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\b([sc])[\s-]?corp(oration)?s?\b/g, '$1corp')
    .replace(/\b(1099|1098)-([a-z]+)\b/g, '$1$2')
    .replace(/\bw-([0-9])\b/g, 'w$1')
    .replace(/\bcp\s?(\d{3,4})\b/g, 'cp$1')
    .replace(/\$?(\d{1,3}(,\d{3})+)/g, m => m.replace(/[$,]/g, ''))
}

function tokens(text) {
  return normalizeEn(text).split(/[^a-z0-9]+/).filter(t => t && !STOP.has(t)).map(stem)
}

// Small English synonym expansion (query side only).
// Informal words readers use that the guides spell differently (query side only). Applied before the
// unknown-word check, so "mom" is understood as "mother" instead of signalling an uncovered topic.
const QUERY_ALIASES = {
  mom: 'mother', mum: 'mother', mommy: 'mother', mama: 'mother', momma: 'mother',
  dad: 'father', daddy: 'father', papa: 'father',
  grandma: 'grandparents', grandpa: 'grandparents', granny: 'grandparents',
}

const EN_SYNONYMS = {
  parent: ['gift'], sent: ['gift'], send: ['gift'], wire: ['gift'], wir: ['gift'], transfer: ['gift'],
  mother: ['parent', 'gift'], father: ['parent', 'gift'], gave: ['gift'], give: ['gift'],
  spouse: ['married', 'joint'], wife: ['spouse', 'married'], husband: ['spouse', 'married'], married: ['spouse', 'joint'],
  owe: ['taxable'], taxable: ['income'],
  abroad: ['foreign'], overseas: ['foreign'], offshore: ['foreign'],
  freelance: ['self-employment', '1099'], freelancer: ['self-employment', '1099'], contractor: ['1099', 'self-employment'],
  letter: ['notice'], notice: ['letter'], audit: ['notice'],
  kid: ['child'], children: ['child'], son: ['child'], daughter: ['child'],
  bitcoin: ['crypto'], cryptocurrency: ['crypto'],
  landlord: ['rental'], rent: ['rental'],
}

// Traditional Chinese → English search terms. Only terms the published guides actually cover.
const ZH_GLOSSARY = [
  ['父母', 'parents gift'], ['爸媽', 'parents gift'], ['家人', 'family gift'], ['匯錢', 'gift money sent'], ['匯款', 'gift money sent'],
  ['贈與', 'gift'], ['禮金', 'gift'], ['台灣', 'taiwan'], ['臺灣', 'taiwan'], ['中國', 'china'], ['大陸', 'china'],
  ['銀行帳戶', 'bank account'], ['帳戶', 'account'], ['海外', 'foreign'], ['境外', 'foreign'], ['國外', 'foreign'], ['外國', 'foreign'],
  ['申報', 'file report'], ['報稅', 'file return'], ['繳稅', 'tax owe'], ['欠稅', 'owe tax'], ['退稅', 'refund'],
  ['配偶', 'spouse married'], ['夫妻', 'married joint spouse'], ['已婚', 'married'], ['結婚', 'married'], ['先生', 'spouse'], ['太太', 'spouse'],
  ['合併申報', 'jointly married'], ['分開申報', 'separately married'], ['戶長', 'head household'],
  ['稅務居民', 'resident alien'], ['居民', 'resident'], ['非居民', 'nonresident'], ['綠卡', 'green card'], ['新移民', 'immigrant new'], ['移民', 'immigrant'],
  ['學生', 'student'], ['簽證', 'visa'], ['雙重身分', 'dual status'],
  ['自雇', 'self-employment'], ['自僱', 'self-employment'], ['接案', 'freelance 1099'], ['自由業', 'freelance self-employment'],
  ['預估稅', 'estimated tax'], ['季', 'quarterly'], ['扣除', 'deduction deduct'], ['扣除額', 'deduction'], ['抵稅額', 'credit'],
  ['兒童', 'child'], ['孩子', 'child'], ['小孩', 'child'], ['子女', 'child'], ['受扶養', 'dependent'],
  ['公司', 'business company'], ['創業', 'business start'], ['成立', 'form start'], ['有限責任公司', 'llc'], ['選擇', 'choose election'], ['薪資', 'salary wages'], ['薪水', 'salary wages'],
  ['加密貨幣', 'crypto'], ['虛擬貨幣', 'crypto'], ['比特幣', 'bitcoin crypto'], ['股票', 'stock capital gains'], ['資本利得', 'capital gains'],
  ['出租', 'rental rent'], ['租金', 'rental rent'], ['房東', 'host rental'], ['短租', 'short-term rental'],
  ['國稅局', 'irs'], ['通知', 'notice letter'], ['信', 'letter notice'], ['查帳', 'audit'], ['罰款', 'penalty'], ['罰金', 'penalty'],
  ['截止', 'deadline'], ['期限', 'deadline'], ['延期', 'extension'], ['雇主', 'employer'], ['員工', 'employee'],
  ['第一次', 'first time'], ['首次', 'first time'], ['門檻', 'threshold'], ['收入', 'income'], ['所得', 'income'],
  // Foreign gift / Form 3520 deep-dive guides
  ['學費', 'tuition'], ['醫療費', 'medical'], ['頭期款', 'down payment home'], ['買房', 'home purchase'],
  ['遺產', 'inheritance bequest'], ['繼承', 'inherited inheritance'], ['信託', 'trust'], ['受益人', 'beneficiary trust'],
  ['晚報', 'late'], ['逾期', 'late'], ['補報', 'late file'], ['漏報', 'missed late'], ['忘記', 'missed late'], ['合理原因', 'reasonable cause'],
  ['賣房', 'sold sell property'], ['出售', 'sell sale'], ['房產', 'property'], ['房子', 'home property'],
  ['分多次', 'multiple transfers'], ['多次', 'multiple'], ['分批', 'multiple transfers'],
  ['媽媽', 'mother'], ['母親', 'mother'], ['爸爸', 'father'], ['父親', 'father'],
  ['匯給', 'gift money sent'],
  ['自己的錢', 'own money'], ['自己', 'own'], ['匯到美國', 'transfer money'], ['匯回美國', 'transfer money'], ['存款', 'savings'], ['聯名', 'joint account'], ['公婆', 'spouse parents'], ['岳父母', 'spouse parents'],
]

// ── Index (built once per function instance) ──────────────

const PUBLISHED = new Set(ARTICLES.map(a => a.id))
const PASSAGES = KNOWLEDGE.passages.filter(p => PUBLISHED.has(p.articleId))
// Guides published as "Official Sources Verified" (status recorded at build time from the page).
const VERIFIED = new Set(PASSAGES.filter(p => p.status === 'official-sources-verified').map(p => p.articleId))
const DOCS = PASSAGES.map(p => {
  const toks = [...tokens(p.text), ...tokens(p.heading), ...tokens(p.heading), ...tokens(p.title)]
  const tf = new Map()
  for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1)
  return { passage: p, tf, len: toks.length }
})
const AVG_LEN = DOCS.reduce((s, d) => s + d.len, 0) / DOCS.length
const DF = new Map()
for (const d of DOCS) for (const t of d.tf.keys()) DF.set(t, (DF.get(t) || 0) + 1)
const N = DOCS.length
const idf = t => Math.log(1 + (N - (DF.get(t) || 0) + 0.5) / ((DF.get(t) || 0) + 0.5))

function bm25(doc, terms) {
  const k1 = 1.2, b = 0.75
  let score = 0
  const matched = new Set()
  for (const [t, w] of terms) {
    const f = doc.tf.get(t)
    if (!f) continue
    matched.add(t)
    score += w * idf(t) * (f * (k1 + 1)) / (f + k1 * (1 - b + b * doc.len / AVG_LEN))
  }
  return { score, matched }
}

// ── Query analysis ────────────────────────────────────────

function queryTerms(question) {
  const terms = new Map()
  const add = (t, w) => terms.set(t, Math.max(terms.get(t) || 0, w))
  const text = String(question)
  const unknown = [] // question words that appear in no published guide

  // Latin parts (English questions, or "FBAR"/"IRS"/"LLC" inside a Chinese question)
  // Chinese amounts: "20萬" → 200000, so they match "$200,000" in the guides instead of a bare "20".
  const latinText = text.normalize('NFKC').replace(/(\d+(?:\.\d+)?)\s*萬/g, (_, n) => ` ${Math.round(parseFloat(n) * 10000)} `)
  for (const raw of tokens(latinText.replace(/[㐀-鿿豈-﫿]+/g, ' '))) {
    const t = QUERY_ALIASES[raw] ? stem(QUERY_ALIASES[raw]) : raw
    add(t, 1)
    if (!DF.has(t) && t.length >= 3 && !isAmountOrYear(t)) unknown.push(t)
    for (const s of EN_SYNONYMS[t] || []) for (const st of tokens(s)) add(st, 0.5)
  }
  // Chinese parts → glossary (longest phrases first; a matched phrase is consumed)
  if (CJK.test(text)) {
    let rest = text.normalize('NFKC').replace(/僱/g, '雇')
    for (const [zh, en] of [...ZH_GLOSSARY].sort((a, b) => b[0].length - a[0].length)) {
      if (rest.includes(zh)) {
        for (const t of tokens(en)) add(t, 0.9)
        rest = rest.split(zh).join(' ')
      }
    }
  }
  return { terms, unknown }
}

// Dollar amounts (5+ digits) and years don't signal an uncovered topic; form numbers (1031) do.
const isAmountOrYear = t => /^\d{5,}$/.test(t) || /^(19|20)\d\d$/.test(t)

// Articles whose Chinese display title/keywords appear in a Chinese question.
function zhArticleBoosts(question) {
  const boosts = new Map()
  if (!CJK.test(question)) return boosts
  const q = String(question).normalize('NFKC').replace(/僱/g, '雇').replace(/\s+/g, '').toLowerCase()
  for (const [id, zh] of Object.entries(ARTICLES_ZH_TW)) {
    if (!PUBLISHED.has(id)) continue
    const hits = (zh.keywords || []).filter(k => {
      const kw = k.normalize('NFKC').replace(/\s+/g, '').toLowerCase()
      return kw.length >= 2 && q.includes(kw)
    })
    if (hits.length) boosts.set(id, Math.min(hits.length, 3))
  }
  return boosts
}

// ── Retrieve ──────────────────────────────────────────────

// Confidence gate (calibrated on supported / unsupported / off-topic questions):
const MIN_TOP_SCORE = 6.0       // BM25 score of the best passage
const MIN_COVERAGE = 0.5        // share of the question's idf-weighted terms found in that best passage
// A question word that appears in none of the guides (e.g. "1031", "Texas") means the topic is
// not covered. Topics whose words appear but are not actually answered are caught by the model's
// required "insufficient" status and the server's citation check (see index.mjs).

function retrieve(question, { maxPassages = 5, maxArticles = 3 } = {}) {
  const { terms, unknown } = queryTerms(question)
  const boosts = zhArticleBoosts(question)
  if (terms.size === 0 && boosts.size === 0) return { confident: false, passages: [], articleIds: [], stats: { topScore: 0, coverage: 0 } }

  const scored = DOCS.map(doc => {
    const { score, matched } = bm25(doc, terms)
    const boost = boosts.get(doc.passage.articleId) || 0
    return { doc, score: score * (1 + 0.35 * boost) + (score > 0 ? boost : 0), matched }
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score)

  const top = scored[0]
  if (!top) return { confident: false, passages: [], articleIds: [], stats: { topScore: 0, coverage: 0 } }
  // Coverage: how much of the question (idf-weighted) the single best passage explains.
  // Dollar amounts and years are facts about the asker, not topic words: a guide is not expected to contain
  // the asker's exact amount, so an amount/year counts toward coverage only when the best passage has it.
  const topical = [...terms].filter(([t]) => !isAmountOrYear(t) || top.matched.has(t))
  const totalW = topical.reduce((sum, [t, w]) => sum + w * idf(t), 0) || 1
  const coveredW = topical.filter(([t]) => top.matched.has(t)).reduce((sum, [t, w]) => sum + w * idf(t), 0)
  const coverage = coveredW / totalW
  const confident = unknown.length === 0 && top.score >= MIN_TOP_SCORE && (coverage >= MIN_COVERAGE || boosts.size > 0)

  // Pick the best passages: at most 2 per article, at most `maxArticles` articles.
  const picked = []
  const perArticle = new Map()
  for (const s of scored) {
    if (picked.length >= maxPassages) break
    if (s.score < top.score * 0.35) break
    const id = s.doc.passage.articleId
    if (!perArticle.has(id) && perArticle.size >= maxArticles) continue
    if ((perArticle.get(id) || 0) >= 2) continue
    perArticle.set(id, (perArticle.get(id) || 0) + 1)
    picked.push(s.doc.passage)
  }

  return {
    confident,
    passages: picked,
    articleIds: [...perArticle.keys()],
    // Diagnostics for tests only (never contains the question text)
    stats: { topScore: top ? +top.score.toFixed(2) : 0, coverage: +coverage.toFixed(2) },
  }
}

module.exports = { retrieve, PUBLISHED, VERIFIED }

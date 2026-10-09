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
  stuff: 'items', belongings: 'items',
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
// An optional third element is a retrieval HINT: a related topic the guides discuss (爸媽 → gift) that is
// not in the question itself. Hints help ranking but never count as evidence that the question is covered.
// No single-character entries: 信 / 季 alone also occur in 相信, 信用卡, 四季 …
const ZH_GLOSSARY = [
  ['父母', 'parents', 'gift'], ['爸媽', 'parents', 'gift'], ['家人', 'family', 'gift'], ['匯錢', 'money sent', 'gift'], ['匯款', 'money sent', 'gift'],
  ['贈與', 'gift'], ['禮金', 'gift'], ['台灣', 'taiwan'], ['臺灣', 'taiwan'], ['中國', 'china'], ['大陸', 'china'],
  ['銀行帳戶', 'bank account'], ['帳戶', 'account'], ['海外', 'foreign'], ['境外', 'foreign'], ['國外', 'foreign'], ['外國', 'foreign'],
  ['申報', 'file report'], ['報稅', 'file return'], ['繳稅', 'tax owe'], ['欠稅', 'owe tax'], ['退稅', 'refund'],
  ['配偶', 'spouse married'], ['夫妻', 'married joint spouse'], ['已婚', 'married'], ['結婚', 'married'], ['先生', 'spouse'], ['太太', 'spouse'],
  ['合併申報', 'jointly married'], ['分開申報', 'separately married'], ['戶長', 'head household'],
  ['稅務居民', 'resident alien'], ['居民', 'resident'], ['非居民', 'nonresident'], ['綠卡', 'green card'], ['新移民', 'immigrant new'], ['移民', 'immigrant'],
  ['學生', 'student'], ['簽證', 'visa'], ['雙重身分', 'dual status'],
  ['自雇', 'self-employment'], ['自僱', 'self-employment'], ['接案', 'freelance 1099'], ['自由業', 'freelance self-employment'],
  ['預估稅', 'estimated tax'], ['每季', 'quarterly'], ['季度', 'quarterly'], ['按季', 'quarterly'], ['扣除', 'deduction deduct'], ['扣除額', 'deduction'], ['抵稅額', 'credit'],
  ['兒童', 'child'], ['孩子', 'child'], ['小孩', 'child'], ['子女', 'child'], ['受扶養', 'dependent'],
  ['公司', 'business company'], ['創業', 'business start'], ['成立', 'form start'], ['有限責任公司', 'llc'], ['選擇', 'choose', 'election'], ['薪資', 'salary wages'], ['薪水', 'salary wages'],
  ['加密貨幣', 'crypto'], ['虛擬貨幣', 'crypto'], ['比特幣', 'bitcoin crypto'], ['股票', 'stock', 'capital gains'], ['資本利得', 'capital gains'],
  ['出租', 'rental rent'], ['租金', 'rental rent'], ['房東', 'host rental'], ['短租', 'short-term rental'],
  ['國稅局', 'irs'], ['通知', 'notice letter'], ['收到信', 'letter notice'], ['的信', 'letter notice'], ['信件', 'letter notice'], ['來信', 'letter notice'], ['寄信', 'letter notice'], ['查帳', 'audit'], ['罰款', 'penalty'], ['罰金', 'penalty'],
  ['截止', 'deadline'], ['期限', 'deadline'], ['延期', 'extension'], ['雇主', 'employer'], ['員工', 'employee'],
  ['第一次', 'first time'], ['首次', 'first time'], ['門檻', 'threshold'], ['收入', 'income'], ['所得', 'income'],
  // Foreign gift / Form 3520 deep-dive guides
  ['學費', 'tuition'], ['醫療費', 'medical'], ['頭期款', 'down payment home'], ['買房', 'home purchase'],
  ['遺產', 'inheritance bequest'], ['繼承', 'inherited inheritance'], ['信託', 'trust'], ['受益人', 'beneficiary trust'],
  ['晚報', 'late'], ['逾期', 'late'], ['補報', 'late file'], ['漏報', 'missed late'], ['忘記', 'missed late'], ['合理原因', 'reasonable cause'],
  ['賣房', 'sold sell property'], ['出售', 'sell sale'], ['房產', 'property'], ['房子', 'home property'],
  ['分多次', 'multiple transfers'], ['多次', 'multiple'], ['分批', 'multiple transfers'],
  ['媽媽', 'mother'], ['母親', 'mother'], ['爸爸', 'father'], ['父親', 'father'],
  ['匯給', 'money sent', 'gift'],
  // FBAR / foreign-account guides
  ['銀行', 'bank'], ['利息', 'interest'], ['沒有利息', 'no interest'], ['以前', 'before'], ['之前', 'before'],
  ['共同', 'joint'], ['移民以前', 'before moving savings'], ['移民前', 'before moving savings'], ['定存', 'time deposit'], ['儲蓄險', 'insurance cash value'],
  // Batch 3 guides
  ['在家辦公', 'home office'], ['居家辦公', 'home office'], ['抵稅', 'credit'],
  ['自己的錢', 'own money'], ['自己', 'own'], ['匯到美國', 'transfer money'], ['匯回美國', 'transfer money'], ['存款', 'savings'], ['聯名', 'joint account'], ['公婆', 'spouse parents'], ['岳父母', 'spouse parents'],
  // Foundation 61–65 guides
  ['補稅', 'owe tax'], ['少報', 'unreported income'],
]

// ── Index (built once per function instance) ──────────────

const PUBLISHED = new Set(ARTICLES.map(a => a.id))
const PASSAGES = KNOWLEDGE.passages.filter(p => PUBLISHED.has(p.articleId))
// Guides published as "Official Sources Verified" (status recorded at build time from the page).
const VERIFIED = new Set(PASSAGES.filter(p => p.status === 'official-sources-verified').map(p => p.articleId))
const DOCS = PASSAGES.map(p => {
  // The guide title states its primary intent, so it is weighted like a field boost (3×).
  const toks = [...tokens(p.text), ...tokens(p.heading), ...tokens(p.heading), ...tokens(p.title), ...tokens(p.title), ...tokens(p.title)]
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

// Names of companies, brokers, banks and platforms ("Apple stock", "1099-DIV from Fidelity", "AAPL") are not
// topic words: the tax rule is the same whatever the company. A word counts as a name only by its POSITION
// next to a financial word — never by capitalization alone and never from a list of companies. Any other word
// that appears in no guide still marks the question as not covered.
const HOLDING_NOUN = /^(stock|share|option|rsu|etf|fund|bond|coin|token|account|saving|checking|brokerage|bank|card|shop|store|busines|company|llc|dividend|paycheck|1099\w*)$/
const SOURCE_PREP = /^(from|at|with|through|via|by)$/
const WORK_VERB = /^(drive|drove|driving|work|worked|working|deliver|delivered|delivering|sell|sold|selling)$/
const SALE_CONTEXT = /\b(sale|sold|sell|selling|bought|buy|shares?|stocks?|dividends?|options?|position)\b/i
const FINANCIAL_CONTEXT = /\b(1099|1098|w-?2|dividends?|interest|accounts?|savings|shares?|stocks?|paycheck|bonus|wages|income|gain|loss|sale|sold)/i

function entityNames(text) {
  const names = new Set()
  let injectStock = false
  const words = String(text).normalize('NFKC').replace(/[㐀-鿿豈-﫿]+/g, ' ')
    .split(/[^A-Za-z0-9&'’-]+/).map(w => w.replace(/^['’-]+|['’-]+$/g, '')).filter(Boolean)
  const tok = w => tokens(w.replace(/-/g, ''))                 // "Coca-Cola" is one unit
  const oov = w => { const t = tok(w); return t.length === 1 && !DF.has(t[0]) && !/^\d+$/.test(t[0]) ? t[0] : null }
  const low = w => (w ? tok(w)[0] || w.toLowerCase() : '')
  const isCap = w => /^[A-Z]/.test(w)
  const financial = FINANCIAL_CONTEXT.test(text)
  for (let i = 0; i < words.length; i++) {
    if (!oov(words[i])) continue
    // Ticker-like: an all-caps unknown word in a question about a sale or holding.
    if (/^[A-Z]{2,5}$/.test(words[i]) && SALE_CONTEXT.test(text)) { names.add(oov(words[i])); injectStock = true; continue }
    // A name run: unknown words, plus capitalized words joined to them ("Wells Fargo", "Cathay United").
    let a = i, b = i
    while (a > 0 && isCap(words[a - 1]) && isCap(words[a]) && !HOLDING_NOUN.test(low(words[a - 1])) && a - 1 > 0) a--
    while (b + 1 < words.length && (oov(words[b + 1]) || (isCap(words[b + 1]) && !HOLDING_NOUN.test(low(words[b + 1]))))) b++
    const next = low(words[b + 1]), prevWord = (words[a - 1] || '').toLowerCase()
    const prev2 = (words[a - 2] || '').toLowerCase(), prev3 = (words[a - 3] || '').toLowerCase()
    const slot =
      HOLDING_NOUN.test(next) ||                                            // "Apple stock", "Chase savings"
      (financial && (SOURCE_PREP.test(prevWord) || (prevWord === 'my' && SOURCE_PREP.test(prev2)))) || // "1099-DIV from Fidelity"
      (WORK_VERB.test(prev2) && /^(for|at|on|with)$/.test(prevWord)) ||   // "drive for Uber"
      (WORK_VERB.test(prev3) && /^(for|at|on|with)$/.test(prev2) && prevWord === 'my')
    if (slot) for (let k = a; k <= b; k++) { const t = tok(words[k]); if (t.length === 1 && !DF.has(t[0])) names.add(t[0]) }
    i = b
  }
  return { names, injectStock }
}

function queryTerms(question) {
  const terms = new Map()
  const add = (t, w) => terms.set(t, Math.max(terms.get(t) || 0, w))
  // Expansions added by us (EN synonyms, glossary hints) help ranking, but are not the reader's words:
  // they never count as evidence that a passage covers the question.
  const hints = new Set()
  const direct = new Set()
  const text = String(question).normalize('NFKC').replace(/\bwrite[- ]?offs?\b|\bwritten off\b/gi, 'deduct')
  const unknown = [] // question words that appear in no published guide
  const { names, injectStock } = entityNames(text)

  // Latin parts (English questions, or "FBAR"/"IRS"/"LLC" inside a Chinese question)
  // Chinese amounts: "20萬" → 200000, so they match "$200,000" in the guides instead of a bare "20".
  const latinText = text.replace(/(\d+(?:\.\d+)?)\s*萬/g, (_, n) => ` ${Math.round(parseFloat(n) * 10000)} `)
  // A hyphenated name ("Coca-Cola") is dropped as one unit; other hyphenated words are left alone.
  const joined = latinText.replace(/[A-Za-z]+(?:-[A-Za-z]+)+/g, w => (names.has(tokens(w.replace(/-/g, ''))[0]) ? w.replace(/-/g, '') : w))
  for (const raw of tokens(joined.replace(/[㐀-鿿豈-﫿]+/g, ' '))) {
    if (names.has(raw)) continue
    const t = QUERY_ALIASES[raw] ? stem(QUERY_ALIASES[raw]) : raw
    add(t, 1); direct.add(t)
    if (!DF.has(t) && t.length >= 3 && !isAmountOrYear(t)) unknown.push(t)
    for (const s of EN_SYNONYMS[t] || []) for (const st of tokens(s)) if (!terms.has(st)) { add(st, 0.5); hints.add(st) }
  }
  if (injectStock) add('stock', 0.5)
  // Chinese parts → glossary (longest phrases first; a matched phrase is consumed)
  if (CJK.test(text)) {
    let rest = text.replace(/僱/g, '雇')
    for (const [zh, en, hint] of [...ZH_GLOSSARY].sort((a, b) => b[0].length - a[0].length)) {
      if (rest.includes(zh)) {
        for (const t of tokens(en)) { add(t, 0.9); direct.add(t) }
        for (const t of tokens(hint || '')) if (!terms.has(t)) { add(t, 0.45); hints.add(t) }
        rest = rest.split(zh).join(' ')
      }
    }
  }
  for (const t of [...hints]) if (direct.has(t)) hints.delete(t) // also asked directly
  return { terms, unknown, hints }
}

// Dollar amounts (5+ digits) and years don't signal an uncovered topic; form numbers (1031) do.
const isAmountOrYear = t => /^\d{5,}$/.test(t) || /^(19|20)\d\d$/.test(t)

// Articles whose Chinese display title/keywords appear in a Chinese question.
function zhArticleBoosts(question) {
  const boosts = new Map()
  if (!CJK.test(question)) return boosts
  // "可以" ("can") is filler between keyword parts: "學費可以抵稅" should match the keyword "學費抵稅".
  const q = String(question).normalize('NFKC').replace(/僱/g, '雇').replace(/\s+/g, '').replace(/可以/g, '').toLowerCase()
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

// Narrow guard: a question about a bank's deposit or interest RATE ("台灣定存利率多少", "best CD rate")
// is shopping for a bank product, not asking about U.S. tax or reporting — unless it also mentions
// tax/reporting, in which case it is scored normally.
const RATE_QUESTION = /利率|\b(interest|cd|deposit|savings|bank)\s+rates?\b|\bbest\s+(cd\s+)?rates?\b/i
const TAX_INTENT = /報|稅|\b(tax\w*|report\w*|fil(e|ing)|fbar|8938|irs|income|deduct\w*)\b/i
// Same idea for other everyday banking/app questions (bank hours, passwords, locked accounts, how to send
// money, which bank to choose, an account number) — refused unless the question also asks about tax.
const NON_TAX_ACTION = /幾點|開門|關門|營業時間|密碼|帳號被鎖|怎麼轉帳|哪家銀行|\baccount number\b|\bopening hours\b|\bpassword\b/i

// ── Intent ────────────────────────────────────────────────
// Relevance scores measure word overlap, not what the reader wants: "Which stock should I buy?" shares words
// with the stock-sale guide. So the question's intent is classified separately, by CLASS of request.
//
// A tax ACTION or tax document (owe, report, file, deduct, taxed, withholding, Form 1099, FBAR, 補稅 …)
// marks a tax question. The bare word "tax" does not: "the best tax software" is a product recommendation.
const TAX_ACTION_EN = new RegExp([
  /\b(owe[sd]?|owing|report(s|ed|ing|able)?|declare[sd]?|disclos\w*|amend\w*|deduct\w*|deductions?|write[- ]?offs?|written\s+off|withh[eo]ld\w*|refunds?|audit(s|ed|ing)?|penalt(y|ies)|dependents?)\b/,
  /\b(fil(e|es|ed|ing))\b(?!\s+(cabinet|folder|format|size|name|manager)s?\b)/,
  /\b(tax(ed|able|-free)|pay\s+(\w+\s+)?tax(es)?|tax(es)?\s+(on|due|bill|return|refund|liability|rate|bracket|credit|deduction|treatment|year|purposes|resident)|exempt\w*|capital\s+gains?|wash\s+sales?|cost\s+basis|claim\s+(\w+\s+){0,3}(as\s+)?(a\s+)?(dependent|credit|deduction|loss))\b/,
  /\b(irs|fbar|fincen|8938|3520\w*|1099\w*|1098\w*|1040\w*|w-?[2489]s?|itin|cp\s?\d{3,4}|schedule\s+[a-z0-9]{1,2}|form\s+\d+\w*)\b/,
].map(r => r.source).join('|'), 'i')
const TAX_ACTION_ZH = /稅(?!務所|務師|軟體)|申報|要報|報嗎|補報|晚報|漏報|少報|扣除|可以抵|抵嗎|國稅局|查帳|罰|預扣|受扶養|FBAR|IRS|Form|表格/i
const NON_TAX_INTENT = [
  // investment / product recommendations and stock picks
  /\bshould\s+i\s+(buy|invest|sell|open|get|choose|pick|travel)\b|\bwhich\s+(\w+\s+)?(stock|share|fund|etf|bank|broker\w*|card|laptop|car|phone|one|app)s?\b|\b(best|good|top|great)\s+(\w+\s+)?(stock|investment|fund|etf|bank|broker\w*|account|card|laptop|car|phone|app|software|accountant|place|restaurant|mortgage|loan|rate|time\s+to\s+buy)s?\b|\brecommend\w*|\bis\s+\w+\s+a\s+good\s+(stock|investment|buy)\b|\ba\s+(good\s+|strong\s+)?buy\b|推薦|哪支|哪檔|會漲|可以買嗎|值得買|比較好|哪一(台|個|間|家|支)/i,
  // pricing advice
  /\bhow\s+much\s+(\w+\s+){0,2}should\s+i\s+charge\b|\bwhat\s+price\b|\bstock\s+price\b|\bprice\s+of\b|收多少|多少錢|股價/i,
  // banking and account services
  /\bhow\s+(do|can)\s+i\s+(open|close|apply\s+for)\b|\bopen\s+(a|an)\s+(\w+\s+)?account\b|\bopening\s+hours\b|\bwhat\s+time\s+(does|do|is)\b|開戶|開\S{0,4}帳戶|轉帳/i,
  // jobs
  /\b(find|get|look\s+for|apply\s+for|search\s+for)\s+(a\s+)?(new\s+)?job\b|\bhiring\b|\bresume\b|找工作|應徵|面試|工作機會/i,
  // travel and leisure
  /\btravel\b|\bvacation\b|\btrip\b|\bwhat\s+should\s+(they|i|we)\s+bring\b|\bwhere\s+should\s+(i|we)\s+(go|visit|travel)\b|\b(is|are)\s+visiting\b|好玩|旅遊|旅行|觀光|帶什麼|來美國玩|去玩/i,
  // personal scheduling
  /\bwhen\s+(is|are|will)\s+(my|our|his|her|their)\b|\bwhere\s+is\s+(my|our|his|her|their)\b|\bappointment\b|什麼時候(來|去|回|到)|幾號|在哪裡/i,
  // shopping
  /\bhow\s+(do|can)\s+i\s+(buy|sell)\s+(a|my)\s+(house|home|car)\b|\b(buy|purchase)\s+(a|an)\s+(new\s+)?(car|laptop|phone)\b|怎麼買|裝潢|筆電/i,
  // personal small talk
  /\b(favorite|weather|birthday)\b|喜歡|天氣|身體|顏色|生日|相信/i,
]
const hasTaxAction = q => TAX_ACTION_EN.test(q) || TAX_ACTION_ZH.test(q)
const hasNonTaxIntent = q => NON_TAX_INTENT.some(r => r.test(q))

// Topic words of the published guides (titles and keywords in lib/articles.js and lib/library-zh-tw.js).
// A question with no tax action must still be about one of these topics. Generated from article metadata,
// so each new guide adds its own topics.
const GENERIC = new Set(tokens('tax taxes taxed need report file do does how what when why guide explained basics rules work works pay owe year money get'))
const TOPIC_WORDS = new Set(ARTICLES.flatMap(a => tokens([a.title, ...(a.keywords || [])].join(' '))).filter(t => t.length >= 2 && !GENERIC.has(t)))
const TOPIC_WORDS_ZH = [...new Set(Object.values(ARTICLES_ZH_TW).flatMap(z => z.keywords || []).map(k => k.normalize('NFKC').replace(/\s+/g, '')).filter(k => CJK.test(k) && k.length >= 2))]

function retrieve(question, { maxPassages = 5, maxArticles = 3 } = {}) {
  if ((RATE_QUESTION.test(question) || NON_TAX_ACTION.test(question)) && !TAX_INTENT.test(question)) {
    return { confident: false, passages: [], articleIds: [], stats: { topScore: 0, coverage: 0 } }
  }
  // A clear non-tax request (stock pick, pricing, banking service, job, travel, scheduling, shopping) is
  // refused unless the question also asks about a tax action.
  const taxAction = hasTaxAction(question)
  if (!taxAction && hasNonTaxIntent(question)) return { confident: false, passages: [], articleIds: [], stats: { topScore: 0, coverage: 0 } }
  const { terms, unknown, hints } = queryTerms(question)
  const boosts = zhArticleBoosts(question)
  // A Chinese keyword of a guide matched but the glossary had no translation for the rest: search with that
  // guide's English keywords (as weak terms) instead of nothing.
  if (boosts.size && ![...terms.keys()].some(t => !hints.has(t))) {
    for (const id of boosts.keys()) for (const t of tokens((ARTICLES.find(a => a.id === id).keywords || []).join(' '))) if (!terms.has(t)) terms.set(t, 0.5)
  }
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
  // Expansions (synonyms, glossary hints) are not the reader's words, so they never count toward coverage.
  const topical = [...terms].filter(([t]) => !hints.has(t) && (!isAmountOrYear(t) || top.matched.has(t)))
  const totalW = topical.reduce((sum, [t, w]) => sum + w * idf(t), 0) || 1
  const coveredW = topical.filter(([t]) => top.matched.has(t)).reduce((sum, [t, w]) => sum + w * idf(t), 0)
  const coverage = coveredW / totalW
  // Without a tax action, the match must rest on a guide topic word the reader actually used.
  const onTopic = taxAction || [...top.matched].some(t => TOPIC_WORDS.has(t) && !hints.has(t)) ||
    TOPIC_WORDS_ZH.some(k => String(question).normalize('NFKC').replace(/\s+/g, '').includes(k))
  const confident = unknown.length === 0 && onTopic && top.score >= MIN_TOP_SCORE && (coverage >= MIN_COVERAGE || boosts.size > 0)

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

// Lina v2: evidence only. Ranks guide passages for a question with NO verdict — no intent guards, no
// unknown-word veto, no score threshold. The model decides whether the question is a tax question and
// whether the evidence answers it; this function only supplies the best library passages it can find.
//
// Concept expansions (v2 only; v1's retrieve() does not use them): readers describe a situation in their own
// words ("after 8 months", "change my W-4") while the guide section that answers it uses the rule's words
// ("short-term or long-term", "fix it for next year"). Each entry needs BOTH patterns, so a single word never
// pulls in a topic; the added terms are weak (ranking help only, like synonyms).
const CONCEPTS = [
  { // holding period of a sale of securities → the short-term / long-term section (not homes: own guide)
    when: [/\b(sold|sell|selling|sale)\b|賣|出售/i, /\b(stocks?|shares?|etfs?|funds?|securities|options?|rsus?|crypto\w*|bitcoin|coins?)\b|股票|股份|基金|加密/i,
      /\b(held|hold|holding|kept|owned)\b|\b(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|few|several)\s+(days?|weeks?|months?|years?)\b|持有|個月|多久|幾年/i],
    add: 'short-term long-term held',
  },
  { // changing withholding → how to fix it with a new W-4
    when: [/\bw-?4\b|withh[eo]ld\w*|預扣|扣繳/i, /\b(change|changing|adjust\w*|update\w*|fix\w*|increase|too little|not enough|underwithh\w*)\b|改|調整|不夠|太少/i],
    add: 'fix new form w-4 estimator',
  },
]
const CONCEPT_WEIGHT = 0.6

function rankPassages(question, { maxPassages = 6, maxArticles = 4, maxFromTopArticle = 3 } = {}) {
  const { terms } = queryTerms(question)
  for (const c of CONCEPTS) {
    if (c.when.every(r => r.test(question))) for (const t of tokens(c.add)) if (!terms.has(t)) terms.set(t, CONCEPT_WEIGHT)
  }
  const boosts = zhArticleBoosts(question)
  if (terms.size === 0 && boosts.size === 0) return { passages: [], topScore: 0 }
  const scored = DOCS.map(doc => {
    const { score } = bm25(doc, terms)
    const boost = boosts.get(doc.passage.articleId) || 0
    return { doc, score: score * (1 + 0.35 * boost) + (score > 0 ? boost : 0) }
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score)
  if (!scored.length) return { passages: [], topScore: 0 }
  // The best-matching guide may contribute one more passage than the others: the answer is usually spread
  // over its sections (rule, table, example), and other guides only add context.
  const topArticle = scored[0].doc.passage.articleId
  const picked = []
  const perArticle = new Map()
  for (const s of scored) {
    if (picked.length >= maxPassages) break
    if (s.score < scored[0].score * 0.35) break
    const id = s.doc.passage.articleId
    if (!perArticle.has(id) && perArticle.size >= maxArticles) continue
    if ((perArticle.get(id) || 0) >= (id === topArticle ? maxFromTopArticle : 2)) continue
    perArticle.set(id, (perArticle.get(id) || 0) + 1)
    picked.push(s.doc.passage)
  }
  return { passages: picked, topScore: +scored[0].score.toFixed(2) }
}

module.exports = { retrieve, rankPassages, PUBLISHED, VERIFIED }

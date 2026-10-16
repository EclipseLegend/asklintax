/**
 * Lina v2 — official-source research interface (Layer 3: on-demand official US tax guidance).
 *
 * Phase 1: research is OFF. There is a mock provider for offline tests; the OpenAI web_search provider is
 * declared here so the interface is fixed, but it is deliberately not implemented and cannot be turned on
 * from the environment.
 *
 * Contract for every provider: research(question, { lang }) resolves to
 *   { status: 'ok' | 'disabled' | 'not_enabled' | 'no_results' | 'error', sources: OfficialSource[] }
 * where OfficialSource = { url, title, publisher, taxYear, retrievedAt, text }.
 * The SERVER supplies the source text (Phase 3: fetched from the allowlisted URL). The model may only cite a
 * source by the id the server gives it, and every quote it uses is checked against `text` — an allowlisted
 * domain alone never makes a citation valid.
 */

// Official US government tax sources (subdomains included, e.g. apps.irs.gov, taxpayeradvocate.irs.gov).
const OFFICIAL_DOMAINS = [
  'irs.gov', 'treasury.gov', 'fincen.gov', 'ssa.gov', 'ftb.ca.gov',
  'ecfr.gov', 'govinfo.gov', 'congress.gov', 'federalregister.gov', 'uscode.house.gov',
]

function isOfficialUrl(url) {
  let u
  try { u = new URL(String(url)) } catch { return false }
  if (u.protocol !== 'https:' || u.username || u.password || u.port) return false
  const host = u.hostname.toLowerCase()
  return OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d))
}

// Keep only well-formed sources from allowlisted official domains, with bounded text.
function normalizeOfficialSources(list, { maxSources = 4, maxChars = 4000 } = {}) {
  if (!Array.isArray(list)) return []
  return list
    .filter(s => s && isOfficialUrl(s.url) && typeof s.title === 'string' && s.title.trim() && typeof s.text === 'string' && s.text.trim())
    .slice(0, maxSources)
    .map(s => ({
      url: String(s.url),
      title: s.title.trim().slice(0, 200),
      publisher: typeof s.publisher === 'string' ? s.publisher.slice(0, 80) : '',
      taxYear: /^(19|20)\d\d$/.test(String(s.taxYear || '')) ? String(s.taxYear) : '',
      retrievedAt: typeof s.retrievedAt === 'string' ? s.retrievedAt.slice(0, 40) : '',
      text: s.text.trim().slice(0, maxChars),
    }))
}

// Phase 3 (not used yet): the Responses API tool definition for official-domain web search.
function webSearchToolConfig() {
  return { type: 'web_search', filters: { allowed_domains: OFFICIAL_DOMAINS } }
}

/**
 * @param {object} opts
 *   mode: 'off' (default) | 'mock' | 'openai_web_search' (declared, not enabled in Phase 1)
 *   fixtures (mock only): [{ match: RegExp | (question) => boolean, sources: OfficialSource[] }]
 */
function createOfficialResearch({ mode = 'off', fixtures = [] } = {}) {
  if (mode === 'mock') {
    return {
      mode, enabled: true,
      async research(question) {
        const hit = fixtures.find(f => (typeof f.match === 'function' ? f.match(question) : f.match.test(question)))
        if (!hit) return { status: 'no_results', sources: [] }
        const sources = normalizeOfficialSources(hit.sources)
        return { status: sources.length ? 'ok' : 'no_results', sources }
      },
    }
  }
  if (mode === 'openai_web_search') {
    // Intentionally inert until Phase 3 is approved: no API call, no fetch.
    return { mode, enabled: false, async research() { return { status: 'not_enabled', sources: [] } } }
  }
  return { mode: 'off', enabled: false, async research() { return { status: 'disabled', sources: [] } } }
}

// ── Layer 2: curated official sources (Phase 4.1 pilot) ──
// Reads ONLY official-knowledge.json, which scripts/build-lina-official.js builds from sources a person approved
// (exact content hash; pending, changed, superseded and malformed sources are left out at build time). No network
// access at runtime. Passages are ranked with the same BM25 terms as the library and must pass a relevance gate,
// so unrelated questions get no official evidence.
// Relevance gate (independent of index size): the passage must contain at least half of the question's
// idf-weighted topic terms, and at least 2 distinct topic terms (or the only one the question has).
const CURATED_MIN_COVERAGE = 0.5
const CURATED_MAX = 3              // passages per question (at most 2 per source)

const terms = x => x === undefined || (Array.isArray(x) && x.every(t => typeof t === 'string' && t.trim()))
const validCondition = c => !!c && typeof c.figure === 'string' && c.figure.trim() && terms(c.anyOf) && terms(c.noneOf) && terms(c.exclusiveWith)
const YEAR = /^(19|20)\d\d$/

// ── Applicability (Phase 4.1 retrieval/applicability round) ──
// A. Year-specific: a "tax_year" passage applies to its own tax year only.
// B. Continuing: a passage applies to other years only through explicit, reviewed metadata —
//    - an "effective_period" source with a verified first year (effectiveFrom) and optional last year (effectiveThrough),
//      e.g. a continuous-use IRS revision ("tax year 2025 and subsequent years until a superseding revision");
//    - a tax-year excerpt whose reviewed selection lists continuingYears (rule text only: the build refuses a continuing
//      excerpt that contains a dollar amount or a rate, so a year-specific figure can never ride on it).
// A 2025 publication is therefore never assumed valid for 2026, and a verified continuing rule is not rejected just
// because its source was published earlier.
function appliesToYear(p, year) {
  const y = String(year)
  if (!p) return false
  if (p.yearScope === 'stable') return true
  if (p.yearScope === 'effective_period') {
    if (!YEAR.test(String(p.effectiveFrom || ''))) return false
    return Number(y) >= Number(p.effectiveFrom) && (!p.effectiveThrough || Number(y) <= Number(p.effectiveThrough))
  }
  return String(p.taxYear) === y || (Array.isArray(p.continuingYears) && p.continuingYears.map(String).includes(y))
}

// ── Concept matching for the curated index (deterministic; no model call, no translation service) ──
// Readers ask the same thing many ways ("put in my HSA", "HSA 最多可以存多少", "parents in Taiwan sent me money"), and
// the IRS excerpts themselves differ ("modified AGI" in Pub 590-A, "adjusted gross income … phase-out range" in Notice
// 2025-67). Each concept has a QUESTION pattern (English synonyms and Traditional Chinese terms) and a PASSAGE pattern
// (the IRS wordings). A question phrase becomes one concept term, and a passage contains that term when it uses any of
// the IRS wordings — so a concept counts once for coverage, whichever words were used.
// Only the curated official index uses this; the AskLinTax library retrieval (and Lina v1) is unchanged.
// Order matters: specific phrases come before the general ones they contain.
const CONCEPTS = [
  ['hsa', /health savings accounts?|健康儲蓄帳戶|健康儲蓄賬戶|\bhsas?\b/gi, /health savings accounts?|\bhsas?\b/g],
  ['hdhp', /high[- ]deductible(?: health)?(?: plans?)?|高自付額(?:健保|保險|計畫|方案)?|高免賠額(?:健保|保險|計畫)?|\bhdhps?\b/gi, /high deductible health plan|\bhdhps?\b/g],
  ['selfonly', /self[- ]only(?: coverage| plan)?|individual coverage|single coverage|(?:covers |for )?just me|only me|(?:只有|只|僅)(?:我)?(?:自己|一個人|一人)(?:投保)?|我自己投保|個人醫療保險(?:保障)?|僅限本人|僅本人|只有本人|只保本人|本人保障|個人保障|單人保障|個人投保|單人投保/gi, /self-only/g],
  ['family', /family (?:hdhp )?(?:coverage|plan)|家庭醫療保險(?:保障)?|家庭(?:保障|投保|方案|計畫)|全家(?:投保|保障)?/gi, /family (?:hdhp )?coverage/g],
  ['catchup', /catch[- ]?up(?: contributions?)?|extra contributions?|additional contributions?|extra (?:money|amount|cash|savings)|(?:put|contribute|save|add) (?:in )?(?:more|extra)|contribute more|額外(?:存入|存款|提撥|供款)?|追加(?:存入|提撥)?|多存|加存|補存/gi, /additional contribution/g],
  ['age55', /\b(?:turning|turned|turn|over|aged?|i am|i'm|im|be|i'll be|will be|hit|reach(?:ed)?)\s*(?:5[5-9]|6[0-4])\b|\b(?:5[5-9]|6[0-4])\s*(?:years? old|or older|\+)|(?:5[5-9]|6[0-4])\s*歲(?:以上)?/gi, /\bage 55\b|\b55 or older\b/g],
  ['age50', /\b(?:turning|turned|turn|over|aged?|i am|i'm|im|be|i'll be|will be)\s*5[0-4]\b|\b5[0-4]\s*(?:years? old|or older|\+)|5[0-4]\s*歲(?:以上)?/gi, /\bage 50\b|\b50 or older\b/g],
  ['medicare', /medicare|聯邦醫療保險|聯邦醫保/gi, /medicare/g],
  // Any other age (e.g. "I'm 72", 「我72歲」, "too old"): matches rules stated "regardless of your age".
  ['age', /\b(?:i am|i'm|im|aged?|turning|turned)\s*\d{2}\b|\b\d{2}\s*years? old\b|too old|age limit|\d{2}\s*歲|年齡|幾歲|年紀/gi, /\bage\b/g],
  // Distinguishing concepts the reviewed Roth/HSA excerpts do not cover: a question about a traditional-IRA
  // deduction or a 401(k)/403(b) plan must not be answered from a Roth or HSA passage that lacks them.
  ['traditional', /traditional\s*iras?|傳統\s*IRA|傳統個人退休帳戶/gi, /traditional ira/g],
  ['employerplan', /\b40[13]\s*\(?[kb]\)?|\b457\b|\bsimple ira\b|\bsep(?:-| )ira\b|\btsp\b/gi, /401\(k\)|403\(b\)|simple ira|sep ira/g],
  ['deduction', /\bdeduct(?:ion|ions|ible|ing)?\b|write[- ]?offs?|扣除|抵扣|抵稅/gi, /\bdeduct/g],
  ['roth', /roth(?:\s*iras?)?/gi, /\broth\b/g],
  ['ira', /個人退休帳戶|個人退休金帳戶|\biras?\b/gi, /\biras?\b/g],
  ['incomelimit', /modified adjusted gross income|\bmagi\b|income (?:limits?|caps?|thresholds?|ranges?)|\b(?:made|make|earn(?:ed)?|earning)\s+(?:about |around |roughly |over |more than )?\$|phase[- ]?outs?|phased out|phasing out|too much income|earn too much|收入(?:上限|限制|門檻|範圍)|所得(?:上限|限制|門檻)|逐步(?:遞減|減少|取消)|遞減範圍|淘汰範圍|修正後調整總所得/gi, /modified agi|adjusted gross income|phase-out|phased out/g],
  ['compensation', /taxable compensation|earned income|no (?:job|wages|earned income)|not working|unemployed|don['’]?t work|only (?:have )?investment income|investment income only|符合\s*IRA\s*供款規定的應稅工作所得|應稅工作所得|應稅報酬|應稅工作收入|沒有工作(?:收入)?|沒工作|沒有薪資|只有(?:股票)?投資收益|工作收入|薪資收入|薪資/gi, /compensation/g],
  // Investment choices inside an account (funds, stocks) are not covered by any reviewed excerpt (after the
  // compensation concept, so "only investment income" stays a compensation question).
  ['investing', /\binvest(?:ing|ments?)?\b|index funds?|mutual funds?|\betfs?\b|\bs&p\b|\bstocks?\b|\bbonds?\b|\bcrypto\w*|投資(?!收益)|股票|基金|指數/gi, /\binvest/g],
  ['mfs', /married filing separately|filing separately|file separately|separate returns?|\bmfs\b|夫妻分開申報|已婚分開申報|分開申報|分別申報/gi, /married filing separately|separate return/g],
  ['mfj', /married filing jointly|filing jointly|file jointly|joint returns?|\bmfj\b|夫妻合併申報|已婚合併申報|合併申報/gi, /married filing jointly|married couples? filing jointly|joint return/g],
  ['qss', /qualifying surviving spouse|qualifying widow\(?er\)?|符合資格的尚存配偶|符合資格的未亡配偶/gi, /qualifying surviving spouse|qualifying widow/g],
  ['hoh', /heads? of household|\bhoh\b|戶長/gi, /heads? of household/g],
  ['single', /\bsingles?\b|單身/gi, /\bsingles?\b/g],
  ['notlived', /(?:did ?n['’]?t|did not|not|never) live(?:d)? with (?:my |our |their )?(?:spouse|wife|husband)|未與配偶同住|未和配偶同住|沒有(?:與|和|跟)配偶同住|不(?:與|和|跟)配偶同住/gi, /didn['’]t live with your spouse|did not live with/g],
  ['lived', /(?:lived|live) with (?:my |our |their )?(?:spouse|wife|husband)|(?:與|和|跟)配偶同住/gi, /(?<!n['’]t )lived with your spouse/g],
  ['form3520', /form\s*3520(?!-a)|3520\s*(?:表格|表)?(?!-a)/gi, /form 3520(?!-a)/g],
  ['nra', /nonresident aliens?(?: individuals?)?|non-resident aliens?|(?:is ?n['’]?t|is not|not) a (?:us|u\.s\.) (?:person|citizen|resident)|非居民外國人|非美國居民|非稅務居民|不是美國人/gi, /nonresident alien/g],
  ['foreigncorp', /foreign (?:company|companies|corporations?|businesses|business|employer|firm)|(?:taiwanese|chinese|japanese|korean|indian|canadian|british|german|overseas|non-us|non-u\.s\.)\s+(?:company|companies|corporation|business|employer|firm)|(?:外國|海外|國外|台灣|臺灣|日本|中國|香港)(?:的)?(?:公司|企業)/gi, /foreign corporations?/g],
  // Employer contributions (after the foreign-company concept, so "a foreign company" stays a donor type).
  ['employer', /\bemployers?\b|\bcompany(?:['’]s)?\b|\bmy job\b|\bworkplace\b|雇主|僱主|公司(?:給|幫|存|提撥)/gi, /\bemployer/g],
  ['foreignpartnership', /foreign partnerships?|外國合夥(?:企業)?|海外合夥(?:企業)?/gi, /foreign partnerships?/g],
  ['foreigntrust', /foreign trusts?|offshore trusts?|外國信託|海外信託|國外信託/gi, /foreign trusts?/g],
  ['foreignestate', /foreign estates?|外國遺產/gi, /foreign estates?/g],
  ['bequest', /inheritances?|inherited|bequests?|遺產|繼承|遺贈/gi, /bequests?/g],
  ['gift', /gifts?|gave me|sent me|wired me|transferred (?:it )?to me|(?:給|送|匯)(?:我)?的錢|給了我|送了我|匯了(?:一筆錢)?給我|贈與|贈送|送給我|給我|匯給我|匯款給我|轉給我|匯款|匯錢/gi, /\bgifts?\b/g],
  ['distribution', /distributions?|分配/gi, /distributions?/g],
  ['foreign', /taiwan|台灣|臺灣|japan|日本|china|中國|大陸|hong kong|香港|korea|韓國|singapore|新加坡|india|印度|canada|加拿大|the uk|united kingdom|英國|germany|德國|france|法國|australia|澳洲|vietnam|越南|philippines|菲律賓|mexico|墨西哥|abroad|overseas|\bforeign\b|海外|國外|境外|外國/gi, /\bforeign\b/g],
  ['parent', /\b(?:parents?|mom|mum|dad|mother|father|grand(?:ma|pa|mother|father|parents?)|relatives?)\b|爸媽|父母|爸爸|媽媽|祖父母|親戚/gi, null],
  ['paytax', /繳稅|納稅|交稅|付稅|pay (?:any )?tax(?:es)?|owe (?:any )?tax(?:es)?|\btaxed\b|taxable/gi, /\btax\b/g],
  ['report', /\breport(?:s|ed|ing)?\b|\bdeclare\b|\bdisclose\b|\bfile\b|\bfiling\b|申報|報告|揭露/gi, /\breport|\bfile\b/g],
  ['duedate', /due date|deadline|\bdue\b|截止(?:日期|日)?|期限|什麼時候(?:要)?(?:交|申報|提交)|何時(?:要)?(?:交|申報|提交)/gi, /\bdue\b/g],
  ['penalty', /\blate\b|penalt(?:y|ies)|\bfined?\b|forgot to (?:file|report)|(?:did ?n['’]?t|did not|failed to|never) (?:file|report)|忘(?:記|了)?(?:申報|報)|沒有申報|沒申報|罰款|罰金|罰鍰|被罰|晚交|逾期|遲交/gi, /penalt/g],
  ['contribute', /contribut\w*|puts? (?:\$?[\d,]+ (?:a year )?)?(?:in|into)|deposit|save (?:in|into)|存入|存款|存錢|提撥|供款|放進|放入|存/gi, /contribut/g],
  ['limit', /how much|maximum|\bmax\b|\bcap\b|ceiling|\blimits?\b|上限|最多|額度|多少/gi, /\blimit|maximum|up to\b/g],
]
const conceptToken = id => ` cx${id}x `
// Filler words that carry no topic in these questions (curated retrieval only).
const CURATED_FILLER = /\b(?:make|people|person|qualif(?:y|ies)|covers?|still|appl(?:y|ies)|happens?|money|someone|is there|there an?|signed|sign|up|keep|continue|allowed|count|counts|toward|towards|forgot|lives?|used|work|worked|about|around|roughly|that year|year)\b/gi
// Concepts that identify a topic of the curated sources. A question with none of them (e.g. a personal income-tax
// calculation that only says "how much" and "tax") gets no official evidence, and a passage must share at least one
// of the question's topic concepts. Generic concepts (limit, contribute, report, due date, penalty, filing status,
// age, income …) only rank passages within a topic.
const TOPIC_CONCEPTS = new Set(['hsa', 'hdhp', 'selfonly', 'family', 'catchup', 'medicare', 'roth', 'ira', 'form3520', 'nra', 'foreigncorp', 'foreignpartnership', 'foreigntrust', 'foreignestate', 'gift', 'bequest'])
// Topic groups (Phase 4.2 step 1.2). The question's concepts decide which source topics may answer it; a passage
// from another topic is never offered (HSA, Roth IRA and Form 3520 evidence stay separate). Gift/bequest words count
// for Form 3520 only together with a foreign or Form 3520 signal ("a gift card from my employer" is not a
// foreign-gift question). Generic concepts (limit, contribute, report, due date, age, filing status …) open no topic.
const TOPIC_GROUPS = {
  hsa: q => ['hsa', 'hdhp', 'selfonly', 'family', 'medicare'].some(c => q.has(c)),
  'roth-ira': q => ['roth', 'ira'].some(c => q.has(c)),
  'foreign-gift': q => ['form3520', 'nra', 'foreigncorp', 'foreignpartnership', 'foreigntrust', 'foreignestate'].some(c => q.has(c)) || (['gift', 'bequest'].some(c => q.has(c)) && q.has('foreign')),
}
// Concept-weighted relevance: a tax concept counts fully; any other word counts a quarter, so filler and sentence
// length cannot sink a question whose tax concepts a passage covers (and cannot make an off-topic passage relevant,
// because the topic group and the topic concept are required first).
const OTHER_WORD_WEIGHT = 0.25

function normalizeCuratedQuestion(question) {
  let q = ` ${String(question).normalize('NFKC')} `
  for (const [id, re] of CONCEPTS) q = q.replace(re, conceptToken(id))
  // Dollar amounts the user typed are facts about them, not topic words (they never make a passage relevant).
  q = q.replace(/\$\s?[\d,]+(?:\.\d+)?(?:\s?(?:k|million|萬))?|\d+(?:\.\d+)?\s*萬(?:美元|美金|元)?|[\d一二三四五六七八九十百千]+萬(?:美元|美金|元)?/gi, ' ')
  // A gift from abroad by a person (not a company, partnership or trust) is the nonresident-alien / foreign-estate rule.
  // Retrieval only: the answer must still establish who the donor is, and the validator enforces the donor type.
  if (/cxforeignx/.test(q) && /cx(gift|bequest)x/.test(q) && !/cx(foreigncorp|foreignpartnership|foreigntrust)x/.test(q)) {
    q = q.replace(/cxparentx/g, ' ') + conceptToken('nra')
  }
  return q.replace(/cxparentx/g, ' ').replace(CURATED_FILLER, ' ').replace(/\s+/g, ' ').trim()
}
// Concept terms a passage contains (by the IRS wordings).
function passageConcepts(text) {
  const t = ` ${String(text).normalize('NFKC').toLowerCase().replace(/’/g, "'")} `
  const out = new Map()
  for (const [id, , doc] of CONCEPTS) {
    if (!doc) continue
    const n = (t.match(doc) || []).length
    if (n) out.set(`cx${id}x`, n)
  }
  return out
}

// Which index this runtime may load. Production (default) reads only official-knowledge.json, built from full
// approvals. The staging index (sources "Approved for staging evaluation only") is read only when explicitly asked
// for with LINA_OFFICIAL_INDEX=staging outside a Netlify production context — and it is a separate, unbundled file.
function curatedTarget(env = process.env) {
  return env.LINA_OFFICIAL_INDEX === 'staging' && env.CONTEXT !== 'production' ? 'staging' : 'production'
}

function loadCuratedIndex({ env = process.env } = {}) {
  const target = curatedTarget(env)
  try {
    if (target === 'staging') {
      const idx = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'official-knowledge.staging.json'), 'utf8'))
      return idx && idx.target === 'staging' ? idx : { target, passages: [] }
    }
    const idx = require('./official-knowledge.json')
    return idx && idx.target !== 'staging' ? { ...idx, target: 'production' } : { target, passages: [] }
  } catch { return { target, passages: [] } }
}

const validApplicability = p => (p.yearScope !== 'effective_period' || YEAR.test(String(p.effectiveFrom || ''))) &&
  (!p.effectiveThrough || (YEAR.test(String(p.effectiveThrough)) && Number(p.effectiveThrough) >= Number(p.effectiveFrom))) &&
  (p.continuingYears === undefined || (Array.isArray(p.continuingYears) && p.continuingYears.every(y => YEAR.test(String(y))) && p.yearScope === 'tax_year'))

function createCuratedSources({ index = loadCuratedIndex() } = {}) {
  const { tokens, queryTerms } = require('./retrieval')
  const passages = (index && Array.isArray(index.passages) ? index.passages : [])
    .filter(p => p && isOfficialUrl(p.url) && typeof p.text === 'string' && p.text.trim() && typeof p.title === 'string' &&
      ['tax_year', 'effective_period', 'stable'].includes(p.yearScope) && (p.yearScope !== 'tax_year' || YEAR.test(String(p.taxYear || ''))) &&
      // Reviewed figure conditions must be well formed; a malformed passage is dropped rather than served unconditioned.
      (p.figureConditions === undefined || (Array.isArray(p.figureConditions) && p.figureConditions.every(validCondition))) &&
      (p.notCitable === undefined || (Array.isArray(p.notCitable) && p.notCitable.every(x => typeof x === 'string'))) &&
      validApplicability(p) &&
      // Approval scope: a staging-only passage is served only from an index built for staging.
      (p.approvalScope === 'production' || (p.approvalScope === 'staging' && index.target === 'staging')))
  const docs = passages.map(p => {
    const toks = [...tokens(p.text), ...tokens(p.location || ''), ...tokens(p.title), ...tokens(p.title)]
    const tf = new Map()
    for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1)
    for (const [c, n] of passageConcepts(`${p.text} ${p.location || ''} ${p.title}`)) tf.set(c, n)
    return { p, tf, len: toks.length }
  })
  const N = docs.length
  const avg = N ? docs.reduce((a, d) => a + d.len, 0) / N : 1
  const df = new Map()
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1)
  const idf = t => Math.log(1 + (N - (df.get(t) || 0) + 0.5) / ((df.get(t) || 0) + 0.5))
  return {
    enabled: N > 0,
    size: N,
    target: index && index.target === 'staging' ? 'staging' : 'production',
    evidence(question) {
      if (!N) return []
      const { terms, hints } = queryTerms(normalizeCuratedQuestion(question))
      const isConcept = t => /^cx\w+x$/.test(t)
      const asked = new Set([...terms.keys()].filter(isConcept).map(t => t.slice(2, -1)))
      const groups = Object.keys(TOPIC_GROUPS).filter(g => TOPIC_GROUPS[g](asked))
      const topics = [...asked].filter(c => TOPIC_CONCEPTS.has(c)).map(c => `cx${c}x`)
      if (!topics.length || !groups.length) return []
      // A tax year in the question matches a passage that APPLIES to that year (its year is metadata, not text);
      // a passage that does not apply to any year the question names is not offered at all (no wrong-year evidence).
      // A dollar amount the user typed is a fact about them and only counts when the passage contains it.
      const isYear = t => YEAR.test(t)
      const isAmount = t => /^\d{5,}$/.test(t)
      const askedYears = [...terms.keys()].filter(isYear)
      const has = (d, t) => d.tf.get(t) || (isYear(t) && appliesToYear(d.p, t) ? 1 : 0)
      const scored = docs.filter(d => groups.includes(d.p.topic) && (!askedYears.length || askedYears.some(y => appliesToYear(d.p, y))) && topics.some(t => d.tf.get(t))).map(d => {
        // Years are a filter (above), not a topic: a passage is never relevant just because it is for the asked year.
        // A plain word that no reviewed excerpt contains cannot be covered by any passage and does not tell passages
        // apart ("honestly", "July"), so it is left out of coverage; topic relevance comes from the gates above.
        const topical = [...terms].filter(([t]) => !hints.has(t) && (!isAmount(t) || d.tf.get(t)) && !isYear(t) && (isConcept(t) || df.has(t)))
        const weight = t => (isConcept(t) ? 1 : OTHER_WORD_WEIGHT) * idf(t)
        const totalW = topical.reduce((a, [t, w]) => a + w * weight(t), 0) || 1
        const askedConcepts = topical.filter(([t]) => isConcept(t)).length
        let score = 0, covered = 0, matchedConcepts = 0
        for (const [t, w] of terms) {
          const f = has(d, t)
          if (!f) continue
          score += w * idf(t) * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * d.len / avg))
          if (!hints.has(t) && (!isAmount(t) || d.tf.get(t)) && !isYear(t)) { covered += w * weight(t); if (isConcept(t)) matchedConcepts++ }
        }
        // At least two of the question's concepts (or its only one) must be in the passage.
        return { d, score, matchedConcepts, needConcepts: Math.min(2, askedConcepts), coverage: covered / totalW }
      }).filter(s => s.needConcepts > 0 && s.matchedConcepts >= s.needConcepts && s.coverage >= CURATED_MIN_COVERAGE)
        .sort((a, b) => (b.coverage - a.coverage) || (b.score - a.score))
      const picked = []
      const per = new Map()
      for (const s of scored) {
        if (picked.length >= CURATED_MAX) break
        if ((per.get(s.d.p.sourceId) || 0) >= 2) continue
        per.set(s.d.p.sourceId, (per.get(s.d.p.sourceId) || 0) + 1)
        picked.push(s.d.p)
      }
      // Slots no other source could use go to the next relevant passages of the same source.
      const sources = new Set(picked.map(p => p.sourceId))
      for (const s of scored) if (picked.length < CURATED_MAX && !picked.includes(s.d.p) && sources.has(s.d.p.sourceId)) picked.push(s.d.p)
      return picked
    },
  }
}

module.exports = { OFFICIAL_DOMAINS, isOfficialUrl, normalizeOfficialSources, webSearchToolConfig, createOfficialResearch, createCuratedSources, loadCuratedIndex, curatedTarget, appliesToYear, normalizeCuratedQuestion }

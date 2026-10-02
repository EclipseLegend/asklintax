/**
 * Knowledge Library index validator (runs automatically in `postbuild`, before the sitemap).
 *
 * Protects the Library, category pages, and search from drifting away from the real
 * article pages. Checks lib/articles.js and lib/categories.js against the static export
 * in out/ and the article source files in pages/library/.
 *
 * Any ERROR fails the build (so Netlify never deploys broken Library links).
 * WARNINGS are printed but do not fail the build.
 */

const fs = require('fs')
const path = require('path')
const { ARTICLES } = require('../lib/articles')
const { CATEGORIES, LIBRARY_ESSENTIALS, LIBRARY_SITUATIONS } = require('../lib/categories')
const { ARTICLES_ZH_TW, CATEGORIES_ZH_TW } = require('../lib/library-zh-tw')
const { ZH_TW_PAGES, localePath } = require('../lib/locale-routes')

const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'out')
const PAGES_LIBRARY = path.join(ROOT, 'pages', 'library')
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

const errors = []
const warnings = []
const error = msg => errors.push(msg)
const warn = msg => warnings.push(msg)

// ── Helpers ───────────────────────────────────────────────

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

// Visible text only: ignores tags, attributes, scripts, and React's <!-- --> text separators.
function toText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim()
}

const normalize = s => s.replace(/\s+/g, ' ').trim()
const exportedFile = urlPath => path.join(OUT_DIR, ...urlPath.split('/').filter(Boolean), 'index.html')
const label = a => `article "${a && a.id}"`

function findDuplicates(values) {
  const seen = new Set()
  const dupes = new Set()
  for (const v of values) (seen.has(v) ? dupes : seen).add(v)
  return [...dupes]
}

// ── 1. Article index: shape, uniqueness, categories ───────

const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]))
const articleById = new Map(ARTICLES.map(a => [a.id, a]))

for (const id of findDuplicates(ARTICLES.map(a => a.id))) error(`Duplicate article id "${id}" in lib/articles.js.`)
for (const p of findDuplicates(ARTICLES.map(a => a.path))) error(`Duplicate article path "${p}" in lib/articles.js.`)
for (const n of findDuplicates(ARTICLES.map(a => a.foundation).filter(n => n != null))) {
  error(`Foundation number ${n} is used by more than one article in lib/articles.js.`)
}

for (const a of ARTICLES) {
  for (const field of ['id', 'path', 'category', 'title', 'summary', 'difficulty']) {
    if (typeof a[field] !== 'string' || !a[field].trim()) error(`${label(a)}: missing or empty "${field}".`)
  }
  if (typeof a.id === 'string' && !/^[a-z0-9-]+$/.test(a.id)) error(`${label(a)}: id must use lowercase letters, numbers, and hyphens only.`)
  if (typeof a.path === 'string' && !/^\/library\/[a-z0-9-]+\/[a-z0-9-]+\/$/.test(a.path)) {
    error(`${label(a)}: path "${a.path}" must look like /library/<category>/<slug>/ (with trailing slash).`)
  }

  const category = categoryByKey.get(a.category)
  if (!category) {
    error(`${label(a)}: category "${a.category}" does not exist in lib/categories.js.`)
  } else if (typeof a.path === 'string' && !a.path.startsWith(category.path)) {
    error(`${label(a)}: path "${a.path}" is not inside its category path "${category.path}".`)
  }

  if (a.difficulty && !DIFFICULTIES.includes(a.difficulty)) {
    error(`${label(a)}: difficulty "${a.difficulty}" must be one of ${DIFFICULTIES.join(', ')}.`)
  }
  if (!Number.isInteger(a.readMinutes) || a.readMinutes <= 0) error(`${label(a)}: readMinutes must be a positive whole number.`)
  if (a.foundation != null && (!Number.isInteger(a.foundation) || a.foundation <= 0)) {
    error(`${label(a)}: foundation must be a positive whole number or null.`)
  }
  if (!Array.isArray(a.keywords) || a.keywords.length === 0 || a.keywords.some(k => typeof k !== 'string' || !k.trim())) {
    error(`${label(a)}: keywords must be a non-empty list of words or phrases.`)
  }
  if (typeof a.summary === 'string' && (a.summary.length < 60 || a.summary.length > 160)) {
    warn(`${label(a)}: summary is ${a.summary.length} characters (aim for about 100–140).`)
  }
}

// ── 2. Category index: shape and article references ───────

for (const k of findDuplicates(CATEGORIES.map(c => c.key))) error(`Duplicate category key "${k}" in lib/categories.js.`)
for (const p of findDuplicates(CATEGORIES.map(c => c.path))) error(`Duplicate category path "${p}" in lib/categories.js.`)

function checkRefs(ids, where, { sameCategory } = {}) {
  if (!Array.isArray(ids)) return error(`${where} must be a list of article ids.`)
  for (const id of findDuplicates(ids)) error(`${where} lists "${id}" more than once.`)
  for (const id of ids) {
    const article = articleById.get(id)
    if (!article) error(`${where} refers to "${id}", which is not a published article in lib/articles.js.`)
    else if (sameCategory && article.category !== sameCategory) {
      error(`${where} refers to "${id}", which belongs to category "${article.category}", not "${sameCategory}".`)
    }
  }
}

for (const c of CATEGORIES) {
  const where = `category "${c.key}"`
  for (const field of ['key', 'path', 'name', 'summary', 'seoTitle', 'seoDescription', 'intro']) {
    if (typeof c[field] !== 'string' || !c[field].trim()) error(`${where}: missing or empty "${field}".`)
  }
  if (typeof c.path === 'string' && !/^\/library\/[a-z0-9-]+\/$/.test(c.path)) {
    error(`${where}: path "${c.path}" must look like /library/<category>/ (with trailing slash).`)
  }
  if (!ARTICLES.some(a => a.category === c.key)) error(`${where} has no published articles.`)

  checkRefs(c.startHere, `${where} startHere`, { sameCategory: c.key })
  checkRefs(c.related || [], `${where} related`)
  if (!Array.isArray(c.questions)) {
    error(`${where}: questions must be a list.`)
  } else {
    c.questions.forEach((item, i) => {
      if (!item || typeof item.q !== 'string' || !item.q.trim()) error(`${where} question #${i + 1} has no question text.`)
      checkRefs([item && item.id], `${where} question #${i + 1}`)
    })
  }
}

checkRefs(LIBRARY_ESSENTIALS, 'LIBRARY_ESSENTIALS')

// ── 3. Source files: every article page must be registered ─

const indexedPaths = new Set(ARTICLES.map(a => a.path))

if (fs.existsSync(PAGES_LIBRARY)) {
  for (const dir of fs.readdirSync(PAGES_LIBRARY, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of fs.readdirSync(path.join(PAGES_LIBRARY, dir.name), { withFileTypes: true })) {
      if (!file.isFile()) continue
      const rel = `pages/library/${dir.name}/${file.name}`
      const ext = path.extname(file.name)
      if (ext === '') {
        error(`${rel} has no file extension, so Next.js will not publish it. Rename it to ${file.name}.js.`)
        continue
      }
      if (!['.js', '.jsx'].includes(ext)) continue
      const slug = path.basename(file.name, ext)
      if (slug === 'index') continue // category landing pages are not articles
      const urlPath = `/library/${dir.name}/${slug}/`
      if (!indexedPaths.has(urlPath)) error(`${rel} (${urlPath}) is not registered in lib/articles.js.`)
    }
  }
}

// ── 4. Static export: pages exist and match the index ─────

if (!fs.existsSync(OUT_DIR)) {
  error('out/ was not found. Run `next build` before validating.')
} else {
  // Every exported article page (out/library/<category>/<slug>/index.html) must be registered.
  const libraryOut = path.join(OUT_DIR, 'library')
  if (fs.existsSync(libraryOut)) {
    for (const cat of fs.readdirSync(libraryOut, { withFileTypes: true })) {
      if (!cat.isDirectory()) continue
      for (const slug of fs.readdirSync(path.join(libraryOut, cat.name), { withFileTypes: true })) {
        const urlPath = `/library/${cat.name}/${slug.name}/`
        if (slug.isDirectory() && fs.existsSync(exportedFile(urlPath)) && !indexedPaths.has(urlPath)) {
          error(`Exported page ${urlPath} is not registered in lib/articles.js.`)
        }
      }
    }
  }

  // The Library homepage must exist.
  if (!fs.existsSync(exportedFile('/library/'))) error('/library/ was not exported. Create pages/library/index.js.')

  // Every "Popular situations" id must be a real section anchor on the Start Here page.
  const startFile = exportedFile('/start/')
  const startHtml = fs.existsSync(startFile) ? fs.readFileSync(startFile, 'utf8') : ''
  for (const id of findDuplicates(LIBRARY_SITUATIONS)) error(`LIBRARY_SITUATIONS lists "${id}" more than once.`)
  for (const id of LIBRARY_SITUATIONS) {
    if (!new RegExp(`\\sid="${id}"`).test(startHtml)) {
      error(`LIBRARY_SITUATIONS "${id}" has no matching section (id="${id}") on /start/, so /start/#${id} would not work.`)
    }
  }

  // Every category must have a real exported category page.
  for (const c of CATEGORIES) {
    if (typeof c.path === 'string' && !fs.existsSync(exportedFile(c.path))) {
      error(`category "${c.key}": ${c.path} was not exported. Create pages/library/${c.key}/index.js.`)
    }
  }

  // Every indexed article must be a real exported page whose content matches the index.
  for (const a of ARTICLES) {
    if (typeof a.path !== 'string') continue
    const file = exportedFile(a.path)
    if (!fs.existsSync(file)) {
      error(`${label(a)}: ${a.path} was not exported. The page does not exist, so it must not be in lib/articles.js.`)
      continue
    }
    const html = fs.readFileSync(file, 'utf8')
    const text = toText(html)

    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (!h1) {
      error(`${label(a)}: no <h1> found on ${a.path}.`)
    } else if (normalize(toText(h1[1])) !== normalize(a.title)) {
      error(`${label(a)}: title does not match the page.\n      index: "${a.title}"\n      page:  "${normalize(toText(h1[1]))}"`)
    }

    // "Foundation 20 · Intermediate" line rendered by KnowledgePage
    const hero = text.match(/Foundation (\S+) · (Beginner|Intermediate|Advanced)\b/)
    if (!hero) {
      warn(`${label(a)}: could not find the "Foundation NN · Difficulty" line on ${a.path}; difficulty not verified.`)
    } else {
      if (hero[2] !== a.difficulty) error(`${label(a)}: difficulty is "${a.difficulty}" in the index but "${hero[2]}" on the page.`)
      if (a.foundation != null && Number(hero[1]) !== a.foundation) {
        error(`${label(a)}: foundation is ${a.foundation} in the index but "${hero[1]}" on the page.`)
      }
    }

    const read = text.match(/(\d+) min read/)
    if (!read) warn(`${label(a)}: could not find "N min read" on ${a.path}; read time not verified.`)
    else if (Number(read[1]) !== a.readMinutes) {
      error(`${label(a)}: readMinutes is ${a.readMinutes} in the index but the page says "${read[0]}".`)
    }
  }
}

// ── 5. Traditional Chinese (/zh-tw/) display metadata and pages ─

// Chinese titles/summaries are display overlays only: every id must be a real article,
// and every article/category should have one (missing metadata falls back to English).
for (const id of Object.keys(ARTICLES_ZH_TW)) {
  if (!articleById.has(id)) error(`lib/library-zh-tw.js has metadata for "${id}", which is not a published article in lib/articles.js.`)
}
for (const a of ARTICLES) {
  const zh = ARTICLES_ZH_TW[a.id]
  if (!zh) { warn(`${label(a)}: no Traditional Chinese metadata in lib/library-zh-tw.js (English title shown on /zh-tw/).`); continue }
  for (const field of ['title', 'summary']) {
    if (typeof zh[field] !== 'string' || !zh[field].trim()) warn(`${label(a)}: Traditional Chinese "${field}" is missing.`)
  }
  if (!Array.isArray(zh.keywords) || zh.keywords.length === 0) warn(`${label(a)}: no Traditional Chinese search keywords.`)
}
for (const key of Object.keys(CATEGORIES_ZH_TW)) {
  if (!categoryByKey.has(key)) error(`lib/library-zh-tw.js has metadata for category "${key}", which does not exist in lib/categories.js.`)
}
for (const c of CATEGORIES) {
  const zh = CATEGORIES_ZH_TW[c.key]
  const where = `category "${c.key}" (zh-tw)`
  if (!zh) { error(`${where}: no Traditional Chinese metadata in lib/library-zh-tw.js.`); continue }
  for (const field of ['name', 'summary', 'intro', 'seoTitle', 'seoDescription']) {
    if (typeof zh[field] !== 'string' || !zh[field].trim()) error(`${where}: missing or empty "${field}".`)
  }
  if (zh.questions) {
    zh.questions.forEach((item, i) => {
      if (!item || typeof item.q !== 'string' || !item.q.trim()) error(`${where} question #${i + 1} has no question text.`)
      checkRefs([item && item.id], `${where} question #${i + 1}`)
    })
  }
  if (!ZH_TW_PAGES.includes(c.path.replace(/\/$/, ''))) error(`${where}: ${c.path} is not listed in ZH_TW_PAGES (lib/locale-routes.js).`)
}

if (fs.existsSync(OUT_DIR)) {
  // Every path declared in ZH_TW_PAGES must be a real exported page, or the language switch would 404.
  for (const p of ZH_TW_PAGES) {
    const zhPath = localePath(p === '/' ? '/' : `${p}/`, 'zh-tw')
    if (!fs.existsSync(exportedFile(zhPath))) error(`${zhPath} is listed in ZH_TW_PAGES but was not exported. Create pages${zhPath}index.js.`)
  }
  // /zh-tw/library/ situation links point at /zh-tw/start/#<id>.
  const zhStartFile = exportedFile('/zh-tw/start/')
  const zhStartHtml = fs.existsSync(zhStartFile) ? fs.readFileSync(zhStartFile, 'utf8') : ''
  for (const id of LIBRARY_SITUATIONS) {
    if (!new RegExp(`\\sid="${id}"`).test(zhStartHtml)) error(`LIBRARY_SITUATIONS "${id}" has no matching section on /zh-tw/start/.`)
  }
  // The legacy /zh/ placeholder is replaced by a redirect; it must not be exported again.
  if (fs.existsSync(path.join(OUT_DIR, 'zh'))) error('out/zh/ exists. /zh/* now 301-redirects to /zh-tw/ (netlify.toml); remove pages/zh/.')
}

// ── 6. Ask Lin example questions exist in both languages ─
// (Lina's citations are validated server-side against published articles — netlify/functions/lina/core.js.)

const { EXAMPLE_QUESTIONS } = require('../lib/ask-lin/examples')
for (const ex of EXAMPLE_QUESTIONS) {
  for (const lang of ['en', 'zh-tw']) {
    if (typeof ex[lang] !== 'string' || !ex[lang].trim()) error(`Ask Lin example "${ex.id}" is missing its ${lang} question.`)
  }
}

// ── 8. Publication policy ─
// Standard: DRAFT → official primary-source verification → OFFICIAL-SOURCE VERIFIED → PUBLISHED.
// Every guide in lib/articles.js must have status 'official-sources-verified': its page shows
// "Official Sources Verified" and lists its official sources. CPA review is not part of this gate
// (it is reserved for individualized professional services), and no other status is publishable.
// Draft guides (lib/drafts.js, page files in drafts/library/) must not be exported, listed, curated,
// searchable, or linked from any public page.

const { DRAFT_ARTICLES, DRAFT_ARTICLES_ZH_TW } = require('../lib/drafts')
const DRAFTS_DIR = path.join(ROOT, 'drafts', 'library')
const PUBLISHED_STATUS = 'official-sources-verified'

for (const a of ARTICLES) {
  if (a.status !== PUBLISHED_STATUS) {
    error(`${label(a)}: status "${a.status}" is not publishable. A guide is published only after it receives status '${PUBLISHED_STATUS}' — until then keep it in lib/drafts.js.`)
  }
}
const draftIds = new Set(DRAFT_ARTICLES.map(d => d.id))
const curatedIds = [
  ...LIBRARY_ESSENTIALS,
  ...CATEGORIES.flatMap(c => [...(c.startHere || []), ...(c.related || []), ...(c.questions || []).map(q => q.id)]),
  ...Object.values(CATEGORIES_ZH_TW).flatMap(c => (c.questions || []).map(q => q.id)),
]

for (const d of DRAFT_ARTICLES) {
  const where = `draft "${d.id}"`
  if (articleById.has(d.id)) error(`${where} is in lib/articles.js. A draft is published only after it receives Official-Source Verified status.`)
  if (ARTICLES_ZH_TW[d.id]) error(`${where} has public Traditional Chinese metadata in lib/library-zh-tw.js. Keep it in lib/drafts.js until publication.`)
  if (curatedIds.includes(d.id)) error(`${where} is curated in lib/categories.js or lib/library-zh-tw.js.`)
  if (!DRAFT_ARTICLES_ZH_TW[d.id]) warn(`${where}: no Traditional Chinese draft metadata in lib/drafts.js.`)
  if (d.status !== 'draft') error(`${where}: status must be 'draft' while it is in lib/drafts.js.`)
  const file = path.join(ROOT, ...String(d.draftFile).split('/'))
  if (!fs.existsSync(file)) error(`${where}: draft file ${d.draftFile} is missing.`)
  const routeFile = path.join(ROOT, 'pages', ...d.path.split('/').filter(Boolean)) + '.js'
  if (fs.existsSync(routeFile)) error(`${where}: a public page exists at ${path.relative(ROOT, routeFile)}. Drafts must stay in drafts/library/.`)
}
for (const id of findDuplicates(DRAFT_ARTICLES.map(d => d.id))) error(`Duplicate draft id "${id}" in lib/drafts.js.`)

// Every file in drafts/library/ must be registered in lib/drafts.js.
if (fs.existsSync(DRAFTS_DIR)) {
  const registered = new Set(DRAFT_ARTICLES.map(d => d.draftFile))
  for (const cat of fs.readdirSync(DRAFTS_DIR, { withFileTypes: true }).filter(e => e.isDirectory())) {
    for (const f of fs.readdirSync(path.join(DRAFTS_DIR, cat.name)).filter(f => f.endsWith('.js'))) {
      const rel = `drafts/library/${cat.name}/${f}`
      if (!registered.has(rel)) error(`${rel} is not registered in lib/drafts.js.`)
    }
  }
}

if (fs.existsSync(OUT_DIR)) {
  // Every published guide must render the status recorded in lib/articles.js.
  for (const a of ARTICLES) {
    const file = exportedFile(a.path)
    if (!fs.existsSync(file)) continue
    const text = toText(fs.readFileSync(file, 'utf8'))
    const shows = {
      verified: /Official Sources Verified/.test(text),
      cpa: /CPA[- ]Reviewed|CPA review pending/i.test(text),
      draft: /not yet verified against official sources/.test(text),
    }
    if (!shows.verified || shows.cpa || shows.draft) {
      error(`${label(a)}: ${a.path} must show "Official Sources Verified" and no other review status (set META.verification = 'official-sources-verified').`)
    }
  }
  // No draft may be exported or linked from any public page.
  const htmlFiles = []
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) { if (e.name !== '_next') walk(p) } else if (e.name.endsWith('.html')) htmlFiles.push(p)
    }
  }
  walk(OUT_DIR)
  for (const d of DRAFT_ARTICLES) {
    if (fs.existsSync(exportedFile(d.path))) error(`draft "${d.id}": ${d.path} was exported. Drafts must not be published.`)
    const bare = d.path.replace(/\/$/, '')
    for (const f of htmlFiles) {
      const html = fs.readFileSync(f, 'utf8')
      if (html.includes(`href="${bare}"`) || html.includes(`href="${bare}/`)) {
        error(`draft "${d.id}" is linked from public page ${path.relative(OUT_DIR, f)}.`)
      }
    }
  }
  const sitemap = path.join(OUT_DIR, 'sitemap.xml')
  if (fs.existsSync(sitemap)) {
    const xml = fs.readFileSync(sitemap, 'utf8')
    for (const d of DRAFT_ARTICLES) if (xml.includes(d.path)) error(`draft "${d.id}" is in the sitemap.`)
  }
}

// ── 7. Official sources on guides (KnowledgePage meta.sources) ─
// Official Sources Verified guides must list their official sources, and every listed source
// must be an official government domain (never blogs or competitors).

const OFFICIAL_SOURCE_HOSTS = ['irs.gov', 'fincen.gov', 'fincen.treas.gov', 'treasury.gov', 'congress.gov', 'ecfr.gov', 'federalregister.gov', 'ssa.gov', 'uscis.gov', 'ftb.ca.gov', 'sos.wyo.gov']
const isOfficialHost = host => OFFICIAL_SOURCE_HOSTS.some(d => host === d || host.endsWith(`.${d}`))

if (fs.existsSync(OUT_DIR)) {
  for (const a of ARTICLES) {
    const file = typeof a.path === 'string' && exportedFile(a.path)
    if (!file || !fs.existsSync(file)) continue
    const html = fs.readFileSync(file, 'utf8')
    const section = (html.match(/<section[^>]*data-official-sources[^>]*>([\s\S]*?)<\/section>/i) || [])[1]
    if (!section) {
      if (a.status === 'official-sources-verified') error(`${label(a)}: no "Official sources" section. An Official Sources Verified guide must list its official sources (META.sources).`)
      continue
    }
    const links = [...section.matchAll(/href="([^"]+)"/g)].map(m => decodeEntities(m[1]))
    if (!links.length) error(`${label(a)}: the "Official sources" section has no links.`)
    for (const href of links) {
      let host = ''
      try { host = new URL(href).hostname.replace(/^www\./, '') } catch { /* invalid URL */ }
      if (!host || !isOfficialHost(host)) error(`${label(a)}: source "${href}" is not an official government domain.`)
    }
  }
}

// ── 9. Traditional Chinese translations (pages/zh-tw/library/) ─
// Every published guide has a Traditional Chinese translation at /zh-tw/library/<category>/<slug>/.
// English is the master. Each translation's META records:
//   locale: 'zh-tw', sourceArticleId: '<id>', sourceHash: '<first 12 hex of sha256 of the English
//   page file, CRLF normalized to LF>', titleEn: '<English META.title>'.
// When an English master changes, its hash changes and the build FAILS until the translation is
// brought back in sync. This is a permanent publication rule, not a warning: review the English
// change, update the Chinese page so it says the same thing (no Chinese-only tax facts), and only
// then set sourceHash to the value printed below. Never re-record a hash without updating the
// translation — the hash certifies that the Chinese text matches that exact English version.

const crypto = require('crypto')
const ZH_PAGES_LIBRARY = path.join(ROOT, 'pages', 'zh-tw', 'library')
const SITE = 'https://asklintax.com'
const sourceFile = (dir, articlePath) => path.join(dir, ...articlePath.split('/').filter(Boolean).slice(1)) + '.js'
const masterHash = file => crypto.createHash('sha256').update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).digest('hex').slice(0, 12)
const metaString = (src, field) => {
  const m = new RegExp(`\\n\\s*${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(src)
  return m ? m[1].replace(/\\'/g, "'") : null
}
const sourceUrls = src => [...((/\n\s*sources:\s*\[([\s\S]*?)\n\s*\],/.exec(src) || [])[1] || '').matchAll(/url:\s*'([^']+)'/g)].map(m => m[1])

for (const a of ARTICLES) {
  if (typeof a.path !== 'string') continue
  const enFile = sourceFile(PAGES_LIBRARY, a.path)
  const zhFile = sourceFile(ZH_PAGES_LIBRARY, a.path)
  const where = `${label(a)} (zh-tw)`
  if (!fs.existsSync(zhFile)) { error(`${where}: missing Traditional Chinese translation pages/zh-tw${a.path.replace(/\/$/, '')}.js.`); continue }
  if (!fs.existsSync(enFile)) continue
  const en = fs.readFileSync(enFile, 'utf8')
  const zh = fs.readFileSync(zhFile, 'utf8')
  if (metaString(zh, 'locale') !== 'zh-tw') error(`${where}: META.locale must be 'zh-tw'.`)
  const sourceId = metaString(zh, 'sourceArticleId')
  if (sourceId !== a.id) error(`${where}: META.sourceArticleId is "${sourceId}" but this page translates "${a.id}".`)
  const current = masterHash(enFile)
  const recorded = metaString(zh, 'sourceHash')
  if (recorded !== current) {
    error(`${where}: translation may be stale — the English master changed since it was translated (sourceHash '${recorded}', current '${current}'). Review the English change and update the Chinese translation to match it first; only then set sourceHash to '${current}'. Do not re-record the hash without updating the translation.`)
  }
  if (metaString(zh, 'titleEn') !== a.title) error(`${where}: META.titleEn must equal the English title "${a.title}".`)
  const zhMeta = ARTICLES_ZH_TW[a.id] || {}
  if (zhMeta.title && metaString(zh, 'title') !== zhMeta.title) error(`${where}: META.title must equal the Traditional Chinese title in lib/library-zh-tw.js ("${zhMeta.title}").`)
  for (const field of ['id', 'difficulty', 'readTime', 'verification', 'categoryHref']) {
    if (metaString(zh, field) !== metaString(en, field)) error(`${where}: META.${field} must match the English master ("${metaString(en, field)}").`)
  }
  if (JSON.stringify(sourceUrls(zh)) !== JSON.stringify(sourceUrls(en))) error(`${where}: META.sources must list the same official source URLs, in the same order, as the English master.`)
}

// Orphans: every translation must correspond to a published guide.
if (fs.existsSync(ZH_PAGES_LIBRARY)) {
  for (const cat of fs.readdirSync(ZH_PAGES_LIBRARY, { withFileTypes: true }).filter(e => e.isDirectory())) {
    for (const f of fs.readdirSync(path.join(ZH_PAGES_LIBRARY, cat.name)).filter(f => f.endsWith('.js') && f !== 'index.js')) {
      const p = `/library/${cat.name}/${f.replace(/\.js$/, '')}/`
      if (!ARTICLES.some(a => a.path === p)) error(`pages/zh-tw${p.replace(/\/$/, '')}.js is a Traditional Chinese translation with no published English guide at ${p}.`)
    }
  }
}

if (fs.existsSync(OUT_DIR)) {
  const linkTag = (html, rel, extra = '') => new RegExp(`<link rel="${rel}"${extra} href="([^"]+)"`).exec(html)
  const englishArticlePaths = new Set(ARTICLES.map(a => a.path).filter(p => typeof p === 'string'))
  for (const a of ARTICLES) {
    if (typeof a.path !== 'string') continue
    const zhPath = `/zh-tw${a.path}`
    const enFile = exportedFile(a.path)
    const zhFile = exportedFile(zhPath)
    const where = `${label(a)} (zh-tw)`
    if (!fs.existsSync(zhFile)) { error(`${where}: ${zhPath} was not exported.`); continue }
    if (!fs.existsSync(enFile)) continue
    const en = fs.readFileSync(enFile, 'utf8')
    const zh = fs.readFileSync(zhFile, 'utf8')
    const zhText = toText(zh)
    if (!/官方來源查核/.test(zhText)) error(`${where}: ${zhPath} must show 官方來源查核.`)
    if (/英文指南/.test(zhText)) error(`${where}: ${zhPath} still labels a guide as 英文指南.`)
    if (!/data-official-sources/.test(zh)) error(`${where}: ${zhPath} has no 官方來源 section.`)
    // Self-canonical pages with reciprocal en / zh-TW hreflang.
    const pairs = [[a.path, en, 'English'], [zhPath, zh, 'Chinese']]
    for (const [p, html, lang] of pairs) {
      const canonical = (linkTag(html, 'canonical') || [])[1]
      if (canonical !== `${SITE}${p}`) error(`${label(a)}: ${lang} page canonical is ${canonical}, expected ${SITE}${p}.`)
      if ((linkTag(html, 'alternate', ' hrefLang="en"') || [])[1] !== `${SITE}${a.path}`) error(`${label(a)}: ${lang} page is missing hreflang="en" → ${SITE}${a.path}.`)
      if ((linkTag(html, 'alternate', ' hrefLang="zh-TW"') || [])[1] !== `${SITE}${zhPath}`) error(`${label(a)}: ${lang} page is missing hreflang="zh-TW" → ${SITE}${zhPath}.`)
    }
    // Chinese guides keep readers in Chinese: the only link to an English guide is the EN switch.
    for (const m of zh.matchAll(/<a\b[^>]*href="([^"#?]*)[^"]*"[^>]*>/g)) {
      if (englishArticlePaths.has(m[1]) && !/aria-label="English"/.test(m[0])) error(`${where}: ${zhPath} links to the English guide ${m[1]}; link to /zh-tw${m[1]} instead.`)
    }
    const section = (zh.match(/<section[^>]*data-official-sources[^>]*>([\s\S]*?)<\/section>/i) || [])[1] || ''
    for (const href of [...section.matchAll(/href="([^"]+)"/g)].map(m => decodeEntities(m[1]))) {
      let host = ''
      try { host = new URL(href).hostname.replace(/^www\./, '') } catch { /* invalid URL */ }
      if (!host || !isOfficialHost(host)) error(`${where}: source "${href}" is not an official government domain.`)
    }
  }
}

// ── Report ────────────────────────────────────────────────

for (const w of warnings) console.warn(`validate-articles: WARNING ${w}`)

if (errors.length) {
  console.error(`\nvalidate-articles: FAILED with ${errors.length} error(s):\n`)
  errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`))
  console.error('\nFix lib/articles.js or lib/categories.js (or the article page) and rebuild.\n')
  process.exit(1)
}

console.log(
  `validate-articles: OK — ${ARTICLES.length} articles, ${CATEGORIES.length} categories, ` +
  `${LIBRARY_ESSENTIALS.length} essentials, ${LIBRARY_SITUATIONS.length} situations` +
  `${warnings.length ? `, ${warnings.length} warning(s)` : ''}`
)

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
const { CATEGORIES, LIBRARY_ESSENTIALS } = require('../lib/categories')

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
  for (const field of ['key', 'path', 'name', 'seoTitle', 'seoDescription', 'intro']) {
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
  `${LIBRARY_ESSENTIALS.length} essentials${warnings.length ? `, ${warnings.length} warning(s)` : ''}`
)

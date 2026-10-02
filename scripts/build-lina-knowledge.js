/**
 * Builds the server-side knowledge file for the Lina Netlify Function (runs in `postbuild`,
 * after validate-articles.js). Source of truth = the exported HTML of the published guides in
 * lib/articles.js — nothing unpublished can enter the index.
 *
 * Each guide is split into passages: every <h2> section of the article body (long sections are
 * split on paragraph boundaries), the "After reading this" / "When to consult a CPA" sidebar
 * boxes, and each FAQ. Writes netlify/functions/lina/knowledge.json (generated; gitignored).
 */

const fs = require('fs')
const path = require('path')
const { ARTICLES } = require('../lib/articles')

const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'out')
const DEST = path.join(ROOT, 'netlify', 'functions', 'lina', 'knowledge.json')
const MAX_PASSAGE = 1100

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
}

// Block-level tags become line breaks; table cells become " | " so rows stay readable.
function toText(html) {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\/(td|th)>/gi, ' | ')
      .replace(/<\/(p|li|tr|h[1-6]|div|dt|dd|table)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  ).split('\n').map(l => l.replace(/\s+/g, ' ').replace(/\s*\|\s*$/, '').trim()).filter(Boolean).join('\n')
}

function splitLong(text) {
  if (text.length <= MAX_PASSAGE) return [text]
  const parts = []
  let current = ''
  for (const line of text.split('\n')) {
    if (current && current.length + line.length + 1 > MAX_PASSAGE) { parts.push(current); current = '' }
    current = current ? `${current}\n${line}` : line
  }
  if (current) parts.push(current)
  return parts
}

const exported = p => path.join(OUT_DIR, ...p.split('/').filter(Boolean), 'index.html')
const passages = []

for (const article of ARTICLES) {
  const file = exported(article.path)
  if (!fs.existsSync(file)) {
    console.error(`build-lina-knowledge: ${article.path} was not exported.`)
    process.exit(1)
  }
  const html = fs.readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, '')
  const taxYear = (html.match(/Applies to (\d{4}) tax year/) || html.match(/Tax Year (?:<!-- -->)?(\d{4})/) || [])[1] || null
  // Publication status as shown on the published page (KnowledgePage trust footer) — it must match
  // lib/articles.js. Lina ingests only published guides with the publication status
  // 'official-sources-verified'.
  const shown = />\s*Official Sources Verified\b/.test(html) ? 'official-sources-verified' : null
  if (!shown || shown !== article.status) {
    console.error(`build-lina-knowledge: ${article.path} shows status "${shown}" but lib/articles.js says "${article.status}". Only published, verified guides may enter Lina's knowledge index.`)
    process.exit(1)
  }
  const status = shown
  const add = (heading, text) => {
    for (const chunk of splitLong(text)) {
      if (chunk.length < 40) continue
      passages.push({ id: `${article.id}#${passages.filter(p => p.articleId === article.id).length + 1}`, articleId: article.id, title: article.title, path: article.path, taxYear, status, heading, text: chunk })
    }
  }

  // Article body: <h2> sections. Callout boxes ("💡 When in doubt, file") are general tips, so
  // they become their own passages instead of reading as part of the section they sit in.
  let body = (html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) || [])[1] || ''
  const callouts = []
  body = body.replace(/<div class="callout[^"]*"><div class="callout-title">([\s\S]*?)<\/div>([\s\S]*?)<\/div>/gi, (_, title, content) => {
    callouts.push([toText(title).replace(/^[^\p{L}\p{N}]+/u, ''), toText(content)])
    return ''
  })
  const sections = body.split(/(?=<h2[^>]*>)/i)
  for (const section of sections) {
    const h = section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)
    const heading = h ? toText(h[1]) : 'Overview'
    add(heading, toText(h ? section.replace(h[0], '') : section))
  }
  for (const [title, text] of callouts) add(`Tip: ${title}`, `${title}. ${text}`)

  // Sidebar boxes with guidance (skip "Quick facts" metadata and "Life situation" tags)
  const aside = (html.match(/<aside[^>]*>([\s\S]*?)<\/aside>/i) || [])[1] || ''
  for (const box of aside.split(/(?=<h3[^>]*>)/i)) {
    const h = box.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
    if (!h) continue
    const heading = toText(h[1])
    if (/after reading this|when to consult a cpa/i.test(heading)) add(heading, toText(box.replace(h[0], '')))
  }

  // FAQs
  for (const m of html.matchAll(/<button class="faq-q"[^>]*>([\s\S]*?)<\/button>\s*<div class="faq-a">([\s\S]*?)<\/div>/gi)) {
    const q = toText(m[1].replace(/<span[\s\S]*?<\/span>/gi, ''))
    add(`FAQ: ${q}`, toText(m[2]))
  }
}

const perArticle = new Map()
for (const p of passages) perArticle.set(p.articleId, (perArticle.get(p.articleId) || 0) + 1)
const missing = ARTICLES.filter(a => !perArticle.get(a.id))
if (missing.length) {
  console.error(`build-lina-knowledge: no passages extracted for ${missing.map(a => a.id).join(', ')}.`)
  process.exit(1)
}

fs.mkdirSync(path.dirname(DEST), { recursive: true })
fs.writeFileSync(DEST, JSON.stringify({ generated: 'build', articles: ARTICLES.length, passages }))
console.log(`build-lina-knowledge: wrote ${passages.length} passages from ${ARTICLES.length} guides`)

/**
 * Build-time sitemap generator (runs automatically as `postbuild`).
 *
 * Scans the static export in out/ for every exported page (…/index.html),
 * so only pages that actually exist can appear. Writes out/sitemap.xml.
 *
 * Excluded:
 *   - 404 pages
 *   - any path under EXCLUDED_PREFIXES (legacy /zh/ redirects to /zh-tw/ and must never be listed)
 *   - any page whose HTML contains <meta name="robots" content="noindex…">
 */

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://asklintax.com'
const OUT_DIR = path.join(__dirname, '..', 'out')
const EXCLUDED_PREFIXES = ['/zh/', '/404/']

function findPages(dir) {
  const pages = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_next') continue
      pages.push(...findPages(full))
    } else if (entry.name === 'index.html') {
      pages.push(full)
    }
  }
  return pages
}

function toUrlPath(file) {
  const rel = path.relative(OUT_DIR, path.dirname(file)).split(path.sep).join('/')
  return rel ? `/${rel}/` : '/' // trailing slash matches next.config.js
}

function isNoindex(file) {
  const html = fs.readFileSync(file, 'utf8')
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)
}

if (!fs.existsSync(OUT_DIR)) {
  console.error('generate-sitemap: out/ not found — run `next build` first.')
  process.exit(1)
}

const urls = findPages(OUT_DIR)
  .filter(file => !isNoindex(file))
  .map(toUrlPath)
  .filter(p => !EXCLUDED_PREFIXES.some(prefix => p.startsWith(prefix)))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(p => `  <url><loc>${SITE_URL}${p}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml)
console.log(`generate-sitemap: wrote ${urls.length} URLs to out/sitemap.xml`)

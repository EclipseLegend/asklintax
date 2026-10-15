#!/usr/bin/env node
/**
 * Lina v2 Layer 2 — fetch (or re-check) curated official sources. OFFLINE development workflow only.
 *
 *   node scripts/lina-official/fetch.js            fetch every manifest source marked urlApproved:true
 *   node scripts/lina-official/fetch.js --only ID  fetch one source
 *   node scripts/lina-official/fetch.js --check    same, for the monthly change check (writes the change report)
 *
 * New content → review status "pending"; content that differs from the approved snapshot → "changed".
 * Neither is served to Lina until a person approves it with review.js. Writes:
 *   data/lina-official/snapshots/<id>/<sha256>.json   extracted passages + metadata (untrusted data)
 *   data/lina-official/review.json                    review state
 *   data/lina-official/last-check.md                  human-readable change report
 */
const fs = require('fs')
const path = require('path')
const lib = require('./lib')

const DIR = path.join(__dirname, '../../data/lina-official')
const argv = process.argv.slice(2)
const only = argv.includes('--only') ? argv[argv.indexOf('--only') + 1] : null
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d)

;(async () => {
  const manifest = readJson(path.join(DIR, 'sources.json'), { sources: [] })
  const reviewFile = path.join(DIR, 'review.json')
  const review = readJson(reviewFile, { sources: {} })
  const at = new Date().toISOString()
  const lines = [`# Official source check — ${at}`, '', '| source | result | status | detail |', '|---|---|---|---|']
  for (const entry of manifest.sources) {
    if (only && entry.id !== only) continue
    const problems = lib.validateManifestEntry(entry)
    if (problems.length) { lines.push(`| ${entry.id} | skipped | — | invalid manifest entry: ${problems.join(', ')} |`); continue }
    if (entry.urlApproved !== true) { lines.push(`| ${entry.id} | skipped | — | URL not approved for fetching |`); continue }
    try {
      const res = await lib.safeFetch(entry.url, { format: entry.format })
      const extracted = entry.format === 'pdf' ? await lib.extractPdf(res.body) : lib.extractHtml(res.body.toString('utf8'))
      if (!extracted.passages.length) throw new Error('no_text_extracted')
      const snap = {
        sourceId: entry.id, url: entry.url, finalUrl: res.finalUrl, redirects: res.redirects, retrievedAt: at,
        httpLastModified: res.lastModified, pageTitle: extracted.title, reviewedDate: extracted.reviewedDate,
        yearsMentioned: [...new Set((extracted.passages.map(p => p.text).join(' ').match(/\b20[1-3]\d\b/g) || []))].sort(),
        passages: extracted.passages,
      }
      snap.contentHash = lib.contentHash(snap.passages)
      // Never record a snapshot the build would reject (it could be approved but never served).
      const bad = lib.validateSnapshot(snap, entry)
      if (bad.length) throw new Error(`invalid_snapshot:${bad.join(',')}`)
      const sdir = path.join(DIR, 'snapshots', entry.id)
      fs.mkdirSync(sdir, { recursive: true })
      const file = path.join(sdir, `${snap.contentHash}.json`)
      if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(snap, null, 1) + '\n')
      const before = (review.sources[entry.id] || {}).latestHash
      const r = lib.recordFetch(review, entry.id, snap.contentHash, at)
      lines.push(`| ${entry.id} | ${before === snap.contentHash ? 'unchanged' : before ? 'CHANGED' : 'new'} | ${r.status} | ${snap.passages.length} passages; hash ${snap.contentHash.slice(0, 12)}; reviewed-on-page ${snap.reviewedDate || '—'}; years ${snap.yearsMentioned.join(' ') || '—'} |`)
    } catch (err) {
      lines.push(`| ${entry.id} | ERROR | ${(review.sources[entry.id] || {}).status || 'not_fetched'} | ${String(err.message).slice(0, 60)} (served content, if any, is unchanged) |`)
    }
  }
  fs.writeFileSync(reviewFile, JSON.stringify(review, null, 1) + '\n')
  fs.writeFileSync(path.join(DIR, 'last-check.md'), lines.join('\n') + '\n')
  console.log(lines.join('\n'))
  console.log('\nNothing new is served until approved: node scripts/lina-official/review.js --list')
})().catch(err => { console.error(err.message); process.exit(1) })

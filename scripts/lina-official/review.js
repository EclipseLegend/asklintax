#!/usr/bin/env node
/**
 * Lina v2 Layer 2 — human review of fetched official sources (OFFLINE workflow).
 *
 *   --list                                        status of every source
 *   --show ID                                     latest snapshot's passages, and a diff against the approved one
 *   --approve ID --hash SHA --reviewer NAME [--note TEXT]   approve exactly this fetched content (production)
 *   --approve-staging ID --hash SHA --reviewer NAME [--note TEXT]
 *                                                 "Approved for staging evaluation only": records the snapshot hash and
 *                                                 the sha256 of every reviewed (non-held) excerpt; never reaches a
 *                                                 production build; not professional tax verification
 *   --reject ID --reviewer NAME [--note TEXT]
 *   --supersede ID --by NEW_ID --reviewer NAME [--note TEXT] (an older edition replaced by a newer one)
 *
 * Approval is per content hash: if the page changes again, the source is withheld until re-approved.
 * Then rebuild: node scripts/build-lina-official.js (also runs in `npm run build`).
 */
const fs = require('fs')
const path = require('path')
const lib = require('./lib')

const DIR = path.join(__dirname, '../../data/lina-official')
const argv = process.argv.slice(2)
const opt = n => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : undefined)
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d)
const reviewFile = path.join(DIR, 'review.json')
const review = readJson(reviewFile, { sources: {} })
const manifest = readJson(path.join(DIR, 'sources.json'), { sources: [] })
const snapshot = (id, hash) => readJson(path.join(DIR, 'snapshots', id, `${hash}.json`), null)
const at = new Date().toISOString()

if (argv.includes('--list')) {
  for (const e of manifest.sources) {
    const r = review.sources[e.id] || {}
    console.log(`${e.id.padEnd(34)} ${(r.status || 'not_fetched').padEnd(16)} url ${e.urlApproved ? 'approved' : 'NOT approved'}  latest ${(r.latestHash || '—').slice(0, 12)}  approved ${(r.approvedHash || '—').slice(0, 12)}  staging ${(r.stagingApprovedHash || '—').slice(0, 12)}  ${e.yearScope}${e.taxYear ? ' ' + e.taxYear : ''}`)
  }
} else if (opt('--show')) {
  const id = opt('--show'), r = review.sources[id]
  if (!r) { console.error('unknown or never fetched'); process.exit(2) }
  const latest = snapshot(id, r.latestHash), approved = r.approvedHash ? snapshot(id, r.approvedHash) : null
  console.log(`${id}: status ${r.status}; final URL ${latest.finalUrl}; retrieved ${latest.retrievedAt}; page reviewed ${latest.reviewedDate || '—'}; years mentioned ${latest.yearsMentioned.join(' ')}`)
  console.log(`latest hash ${r.latestHash}${approved ? `\napproved hash ${r.approvedHash}` : ''}\n`)
  const old = new Set((approved ? approved.passages : []).map(p => `${p.location}\n${p.text}`))
  for (const p of latest.passages) {
    const mark = !approved ? '' : old.has(`${p.location}\n${p.text}`) ? '  (unchanged)' : '  ** NEW OR CHANGED **'
    console.log(`── ${p.location}${mark}\n${p.text}\n`)
  }
  if (approved) { const now = new Set(latest.passages.map(p => `${p.location}\n${p.text}`)); for (const k of old) if (!now.has(k)) console.log(`── REMOVED: ${k.split('\n')[0]}\n`) }
} else {
  const action = argv.includes('--approve-staging') ? 'approve_staging' : argv.includes('--approve') ? 'approve' : argv.includes('--reject') ? 'reject' : argv.includes('--supersede') ? 'supersede' : null
  if (!action) { console.error('Use --list, --show, --approve, --reject or --supersede.'); process.exit(2) }
  const id = opt(action === 'approve_staging' ? '--approve-staging' : `--${action}`)
  try {
    let excerpts
    if (action === 'approve_staging') {
      // Resolve every reviewed excerpt against the exact snapshot being approved; any failure aborts the approval.
      const entry = manifest.sources.find(e => e.id === id)
      const snap = entry && snapshot(id, opt('--hash'))
      if (!entry || !snap || lib.validateSnapshot(snap, entry).length || snap.contentHash !== opt('--hash')) throw new Error('snapshot_missing_or_invalid')
      if (!Array.isArray(entry.selections) || !entry.selections.length) throw new Error('staging_requires_selections')
      excerpts = {}
      for (const sel of entry.selections) {
        if (sel.hold) { console.log(`  held (not approved): ${sel.id} — ${sel.hold.reason}`); continue }
        const r2 = lib.applySelection(entry, snap, sel)
        if (!r2.passage) throw new Error(`excerpt_failed:${sel.id}:${r2.reason}`)
        excerpts[sel.id] = lib.excerptHash(r2.passage.text)
        console.log(`  ${sel.id.padEnd(30)} ${excerpts[sel.id].slice(0, 12)}  ${r2.passage.text.length} ch  "${r2.passage.text.slice(0, 60).replace(/\n/g, ' ')}…"`)
      }
    }
    const r = lib.applyReview(review, id, { action, hash: opt('--hash'), reviewer: opt('--reviewer'), note: opt('--note'), supersededBy: opt('--by'), at, excerpts })
    fs.writeFileSync(reviewFile, JSON.stringify(review, null, 1) + '\n')
    console.log(`${id}: ${r.status}. Rebuild with: node scripts/build-lina-official.js`)
  } catch (err) { console.error(err.message); process.exit(2) }
}

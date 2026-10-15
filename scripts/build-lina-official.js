/**
 * Builds the curated official-source index for Lina v2 Layer 2 (generated files; gitignored). Runs in `postbuild`.
 *
 *   production (default)  → netlify/functions/lina/official-knowledge.json
 *       only sources with a full approval ("approved"). Staging-only approvals are never included.
 *   staging (explicit)    → netlify/functions/lina/official-knowledge.staging.json
 *       also sources "Approved for staging evaluation only" (approved_staging), reviewed excerpts only.
 *       Requested with LINA_OFFICIAL_INDEX=staging (or --staging). Refused in a Netlify production build
 *       (CONTEXT=production): that build gets the production index instead.
 *
 * Pending, changed, rejected, superseded, held or malformed sources/excerpts are left out and listed.
 */
const fs = require('fs')
const path = require('path')
const { buildIndex } = require('./lina-official/lib')

const ROOT = path.join(__dirname, '..')
const DIR = path.join(ROOT, 'data', 'lina-official')
const LINA = path.join(ROOT, 'netlify', 'functions', 'lina')
const DEST = { production: path.join(LINA, 'official-knowledge.json'), staging: path.join(LINA, 'official-knowledge.staging.json') }
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d)

function chooseTarget(env = process.env, argv = process.argv.slice(2)) {
  const wanted = argv.includes('--staging') || env.LINA_OFFICIAL_INDEX === 'staging'
  if (!wanted) return { target: 'production' }
  if (env.CONTEXT === 'production') return { target: 'production', refused: 'staging index refused in a production build (CONTEXT=production)' }
  return { target: 'staging' }
}

if (require.main === module) {
  const { target, refused } = chooseTarget()
  if (refused) console.warn(`build-lina-official: ${refused}`)
  const manifest = readJson(path.join(DIR, 'sources.json'), { sources: [] })
  const review = readJson(path.join(DIR, 'review.json'), { sources: {} })
  const { passages, report } = buildIndex(manifest, review, (id, hash) => readJson(path.join(DIR, 'snapshots', id, `${hash}.json`), null), { target })
  fs.writeFileSync(DEST[target], JSON.stringify({ generated: new Date().toISOString(), target, passages }) + '\n')
  const sources = report.filter(r => r.served && !String(r.id).includes('#'))
  const withheld = report.filter(r => !r.served)
  console.log(`build-lina-official [${target}]: ${passages.length} passages from ${sources.length} source(s) → ${path.relative(ROOT, DEST[target])}` +
    (withheld.length ? `; withheld: ${withheld.map(r => `${r.id} (${r.reason})`).join(', ')}` : ''))
}

module.exports = { chooseTarget, DEST }

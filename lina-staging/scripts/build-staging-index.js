/**
 * Builds the staging-only official index for the Lina v2 staging site → lina-staging/generated/ (gitignored).
 * Runs only in the staging site's build (lina-staging/netlify.toml), after `npm run build`.
 *
 * Fails the build (exit 1) unless ALL of these hold — never CONTEXT alone:
 *   * SITE_ID equals config.EXPECTED_SITE_ID (non-empty)
 *   * the build-time deploy context CONTEXT is "production" (a Deploy Preview or branch deploy of the staging
 *     site never gets a staging index; CONTEXT is documented for builds)
 *   * OPENAI_API_KEY (the production key name) is not visible to this build
 *   * the committed review record still approves exactly the expected staging excerpt set (digest + count)
 *   * the built index is exactly that set (text hashes), with no held excerpt
 *
 * Like every check in code, this guards against misconfiguration, not against code pushed from another branch;
 * the staging site's Netlify settings carry that (lina-staging/DEPLOYMENT.md).
 *
 * It reuses the shared index builder (scripts/lina-official/lib.js → buildIndex) unchanged. It does not touch
 * netlify/functions/lina/ or the production index.
 */
const fs = require('fs')
const path = require('path')
const CONFIG = require('../config')
const { approvedLinesFromReview, digestLines, verifyIndex } = require('../lib/identity')

const ROOT = path.join(__dirname, '..', '..')
const DIR = path.join(ROOT, 'data', 'lina-official')
const OUT = path.join(__dirname, '..', 'generated', 'official-knowledge.staging.json')
const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'))

function buildStagingIndex({ env = process.env, cfg = CONFIG, dir = DIR } = {}) {
  const fail = code => ({ ok: false, code })
  if (!cfg.EXPECTED_SITE_ID || env.SITE_ID !== cfg.EXPECTED_SITE_ID) return fail('wrong_site')
  if (!cfg.REQUIRED_DEPLOY_CONTEXT || env.CONTEXT !== cfg.REQUIRED_DEPLOY_CONTEXT) return fail('wrong_deploy_context')
  if (typeof env.OPENAI_API_KEY === 'string' && env.OPENAI_API_KEY.trim() !== '') return fail('production_key_present')
  const review = readJson(path.join(dir, 'review.json'))
  const approved = approvedLinesFromReview(review)
  if (approved.length !== cfg.APPROVED_EXCERPT_COUNT || digestLines(approved) !== cfg.APPROVED_SET_DIGEST) return fail('approved_set_changed')
  const { buildIndex } = require(path.join(ROOT, 'scripts', 'lina-official', 'lib'))
  const manifest = readJson(path.join(dir, 'sources.json'))
  const snapshot = (id, hash) => { const f = path.join(dir, 'snapshots', id, `${hash}.json`); return fs.existsSync(f) ? readJson(f) : null }
  const { passages } = buildIndex(manifest, review, snapshot, { target: 'staging' })
  const index = { generated: new Date().toISOString(), target: 'staging', passages }
  const v = verifyIndex(index, cfg)
  if (!v.ok) return fail(v.code)
  return { ok: true, index }
}

if (require.main === module) {
  const r = buildStagingIndex()
  if (!r.ok) {
    console.error(`build-staging-index: REFUSED (${r.code}) — the staging site will not be built`)
    process.exit(1)
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(r.index) + '\n')
  console.log(`build-staging-index: ${r.index.passages.length} approved staging excerpts → ${path.relative(ROOT, OUT)}`)
}

module.exports = { buildStagingIndex, OUT }

/**
 * Fail-closed environment identity for the Lina v2 staging site.
 *
 * Nothing here relies on Netlify's CONTEXT (a build-time variable that is not documented for functions).
 * A request may reach Lina only when ALL of these hold:
 *   1. SITE_ID equals config.EXPECTED_SITE_ID (non-empty)        → else 404 (route looks absent)
 *   1b. the runtime deploy context (Netlify context.deploy.context) is exactly "production" — a Deploy
 *      Preview or branch deploy of the staging site never serves; a missing value also fails → else 404
 *   2. LINA_STAGING_ENABLED is exactly "true"                     → else 404
 *   3. OPENAI_API_KEY (the production key name) is NOT present     → else 503 (never fall back to it)
 *   4. LINA_STAGING_OPENAI_API_KEY is present and well-formed      → else 503
 *   5. the staging Supabase URL (https) and publishable key exist  → else 503
 *   6. the bundled index is exactly the approved staging excerpts  → else 503
 */
const crypto = require('crypto')

const sha256 = s => crypto.createHash('sha256').update(s).digest('hex')
const digestLines = lines => sha256([...lines].sort().join('\n'))

// The approved set from the committed review record: "sourceId#excerpt:sha256(text)".
function approvedLinesFromReview(review) {
  const lines = []
  for (const [sid, s] of Object.entries((review && review.sources) || {})) {
    if (!s || s.status !== 'approved_staging') continue
    for (const [ex, h] of Object.entries(s.stagingExcerpts || {})) lines.push(`${sid}#${ex}:${h}`)
  }
  return lines.sort()
}

// The same lines computed from an index's passage TEXT (not from any recorded hash).
const indexLines = index => ((index && index.passages) || []).map(p => `${p.id}:${sha256(String(p.text || ''))}`).sort()

function verifyIndex(index, cfg) {
  if (!index || index.target !== 'staging' || !Array.isArray(index.passages)) return { ok: false, code: 'index_missing' }
  const ps = index.passages
  if (ps.length !== cfg.APPROVED_EXCERPT_COUNT) return { ok: false, code: 'index_count' }
  if (ps.some(p => cfg.HELD_IDS.includes(p.id))) return { ok: false, code: 'index_held_excerpt' }
  if (ps.some(p => p.approvalScope !== 'staging')) return { ok: false, code: 'index_scope' }
  if (new Set(ps.map(p => p.id)).size !== ps.length) return { ok: false, code: 'index_duplicate' }
  if (digestLines(indexLines(index)) !== cfg.APPROVED_SET_DIGEST) return { ok: false, code: 'index_hash_mismatch' }
  return { ok: true }
}

const present = v => typeof v === 'string' && v.trim() !== ''
const WELL_FORMED_KEY = /^[A-Za-z0-9_\-]{20,300}$/

/**
 * @param vars   environment variable values by name (read by the caller from Netlify.env)
 * @param siteId the runtime site id (context.site.id or SITE_ID)
 * @param deployContext the runtime deploy context (context.deploy.context)
 * @param index  the bundled staging index
 * @param cfg    lina-staging/config.js (tests override fields)
 *
 * These checks guard against MISCONFIGURATION. They cannot protect against malicious code deployed from
 * another branch (that code could remove them); that is what the staging site's Netlify settings are for —
 * Deploy Previews and branch deploys off, staging secrets scoped to production, restricted pushes (see
 * lina-staging/DEPLOYMENT.md).
 */
function checkEnvironment({ vars = {}, siteId = '', deployContext = '', index = null, cfg }) {
  const fail = (status, code) => ({ ok: false, status, code })
  if (!present(cfg.EXPECTED_SITE_ID) || siteId !== cfg.EXPECTED_SITE_ID) return fail(404, 'wrong_site')
  if (!present(cfg.REQUIRED_DEPLOY_CONTEXT) || deployContext !== cfg.REQUIRED_DEPLOY_CONTEXT) return fail(404, 'wrong_deploy_context')
  if (vars.LINA_STAGING_ENABLED !== 'true') return fail(404, 'disabled')
  if (present(vars.OPENAI_API_KEY)) return fail(503, 'production_key_present')
  const key = vars.LINA_STAGING_OPENAI_API_KEY
  if (!present(key) || !WELL_FORMED_KEY.test(key)) return fail(503, 'staging_key_missing')
  let supabaseUrl
  try { supabaseUrl = new URL(vars.LINA_STAGING_SUPABASE_URL || '') } catch { return fail(503, 'auth_not_configured') }
  if (supabaseUrl.protocol !== 'https:' || supabaseUrl.username || supabaseUrl.password || supabaseUrl.pathname !== '/' || supabaseUrl.search) return fail(503, 'auth_not_configured')
  const publishableKey = vars.LINA_STAGING_SUPABASE_PUBLISHABLE_KEY
  if (!present(publishableKey) || !/^[A-Za-z0-9_.\-]{20,1000}$/.test(publishableKey)) return fail(503, 'auth_not_configured')
  const idx = verifyIndex(index, cfg)
  if (!idx.ok) return fail(503, idx.code)
  return { ok: true, stagingKey: key, supabaseUrl: supabaseUrl.origin, publishableKey }
}

// Model calls additionally need pricing the owner has confirmed for exactly the configured model and tier.
function pricingConfirmed(cfg) {
  const p = cfg.PRICING
  return !!(p && p.OWNER_CONFIRMED === true && p.model === cfg.MODEL && p.serviceTier === cfg.SERVICE_TIER &&
    p.inPerM === cfg.PRICE_IN_PER_M && p.outPerM === cfg.PRICE_OUT_PER_M && p.inPerM > 0 && p.outPerM > 0)
}

module.exports = { sha256, digestLines, approvedLinesFromReview, indexLines, verifyIndex, checkEnvironment, pricingConfirmed }

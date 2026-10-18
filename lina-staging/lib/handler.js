/**
 * Lina v2 private staging function — request handling (pure; every dependency is injectable for tests).
 *
 * Order of checks for every request (fail closed at the first failure):
 *   1. environment identity (identity.js): expected SITE_ID, production deploy context, LINA_STAGING_ENABLED,
 *      no production key, staging key present, staging Supabase configured, bundled index == approved excerpts
 *   2. same-origin JSON POST, size limit
 *   3. a bearer access token (shape only; the database verifies it)
 *   4. ask only: owner-confirmed pricing, and a token that does not expire within MIN_TOKEN_TTL_S
 *   5. ledger.authorize / startSession: valid JWT, aal2 from TOTP, tester allowlist, the tester's approved
 *      authenticator, disabled flag, own session
 *   6. per model call (metered fetch): strict outbound request check, time budget, ledger.reserve BEFORE the
 *      call, model / service tier / usage checks on the response, ledger.settle after it
 *
 * Lina itself is the unchanged shared runtime (netlify/functions/lina/core-v2.js → handleLinaV2): the same
 * validator, citation checks, follow-up handling and fixed replies as Lina v2 everywhere else. This file only
 * passes it the staging index, the staging key and a metered fetch.
 *
 * Privacy: nothing here stores or logs question or answer text. Logs carry reason codes and usage numbers.
 * Diagnostics are returned only in the response to an authorized tester who asked for them.
 */
const path = require('path')
const coreV2 = require('../../netlify/functions/lina/core-v2.js')
const { createOfficialResearch, createCuratedSources } = require('../../netlify/functions/lina/official.js')
const { ARTICLES } = require('../../lib/articles')
const { ARTICLES_ZH_TW } = require('../../lib/library-zh-tw')
const CONFIG = require('../config')
const { checkEnvironment, pricingConfirmed } = require('./identity')
const { createSupabaseLedger } = require('./ledger')

const MAX_BODY = 8000
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const BEARER = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/
const SITE = 'https://asklintax.com'

const HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' }
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: HEADERS })

// Public error codes. Unauthorized callers learn nothing beyond "who you are is not enough".
const ERRORS = {
  unauthenticated: [401, 'unauthenticated'], token_expiring: [401, 'token_expiring'],
  mfa_required: [403, 'mfa_required'], not_tester: [403, 'forbidden'], factor_not_approved: [403, 'factor_not_approved'],
  disabled: [503, 'disabled'], bad_session: [409, 'bad_session'], session_closed: [409, 'bad_session'],
  session_calls: [429, 'session_calls'], session_cost: [429, 'session_cost'], total_cost: [429, 'total_cost'],
  bad_request: [400, 'bad_request'], ledger_unavailable: [503, 'ledger_unavailable'],
  pricing_unconfirmed: [503, 'pricing_unconfirmed'], model_anomaly: [503, 'model_anomaly'], time_budget: [503, 'time_budget'],
  request_not_allowed: [500, 'internal'], blocked_destination: [500, 'internal'], request_call_limit: [500, 'internal'],
}
const errorResponse = (code, extra = {}) => { const [status, error] = ERRORS[code] || [500, 'internal']; return json(status, { error, ...extra }) }

function loadBundledIndex() {
  try { return require('../generated/official-knowledge.staging.json') } catch { return null }
}

// exp of a JWT, read WITHOUT verifying it — used only to refuse early; the database checks the verified claim.
function tokenExp(token) {
  try { const exp = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8')).exp; return Number.isInteger(exp) ? exp : null } catch { return null }
}

function guideLinks(ids, locale) {
  return (ids || []).map(id => {
    const a = ARTICLES.find(x => x.id === id)
    if (!a) return null
    const zh = locale === 'zh-tw' && ARTICLES_ZH_TW[id]
    return { id, title: zh ? zh.title : a.title, href: SITE + a.path }
  }).filter(Boolean)
}

// ── Outbound request: exactly what the shared runtime builds, nothing else ──
const BODY_KEYS = ['input', 'instructions', 'max_output_tokens', 'model', 'reasoning', 'store', 'text']
const sameKeys = (o, keys) => !!o && typeof o === 'object' && !Array.isArray(o) && Object.keys(o).sort().join() === [...keys].sort().join()
function checkOutbound(url, opts, cfg, stagingKey) {
  if (url !== cfg.OPENAI_URL) return { code: 'blocked_destination' }
  if (!opts || typeof opts !== 'object' || Object.keys(opts).some(k => !['method', 'headers', 'body', 'signal'].includes(k))) return { code: 'request_not_allowed' }
  if (opts.method !== 'POST' || !sameKeys(opts.headers, ['Authorization', 'Content-Type'])) return { code: 'request_not_allowed' }
  if (opts.headers.Authorization !== `Bearer ${stagingKey}` || opts.headers['Content-Type'] !== 'application/json') return { code: 'request_not_allowed' }
  let b
  try { b = JSON.parse(opts.body) } catch { return { code: 'request_not_allowed' } }
  const ok = sameKeys(b, BODY_KEYS) &&
    b.model === cfg.MODEL && b.store === false && b.max_output_tokens === cfg.MAX_OUTPUT_TOKENS &&
    sameKeys(b.reasoning, ['effort']) && b.reasoning.effort === 'low' &&
    typeof b.instructions === 'string' && b.instructions.length > 0 &&
    Array.isArray(b.input) && b.input.length === 2 &&
    sameKeys(b.input[0], ['role', 'content']) && b.input[0].role === 'developer' && typeof b.input[0].content === 'string' &&
    sameKeys(b.input[1], ['role', 'content']) && b.input[1].role === 'user' && typeof b.input[1].content === 'string' &&
    sameKeys(b.text, ['format']) && sameKeys(b.text.format, ['type', 'name', 'strict', 'schema']) &&
    b.text.format.type === 'json_schema' && b.text.format.name === 'lina_v2_answer' && b.text.format.strict === true
  return ok ? { body: b } : { code: 'request_not_allowed' }
}

// Response checks: the approved model (alias or dated snapshot), the approved service tier, plausible usage.
function checkResponse(data, bytes, cfg) {
  const u = data && data.usage
  const usage = u && Number.isInteger(u.input_tokens) && Number.isInteger(u.output_tokens) && u.input_tokens >= 0 && u.output_tokens >= 0
    ? { inputTokens: u.input_tokens, outputTokens: u.output_tokens } : null
  const anomalies = []
  if (!data || typeof data !== 'object') anomalies.push('response_not_json')
  else {
    if (typeof data.model !== 'string' || !cfg.RESPONSE_MODEL.test(data.model)) anomalies.push('response_model')
    if (typeof data.service_tier !== 'string' || data.service_tier.toLowerCase() !== cfg.SERVICE_TIER) anomalies.push('response_service_tier')
    if (!usage) anomalies.push('response_usage_missing')
    else {
      if (usage.outputTokens > cfg.MAX_OUTPUT_TOKENS) anomalies.push('response_output_over_cap')
      if (usage.inputTokens > bytes + cfg.INPUT_OVERHEAD_TOKENS) anomalies.push('response_input_over_bound')
    }
  }
  return { usage, anomalies }
}

/**
 * Wraps the OpenAI fetch: one model call per request; a strictly validated request (plus service_tier
 * "default"); a successful reservation BEFORE the call; settlement after it. No retries anywhere.
 * A failed or timed-out settlement leaves the reservation counted (never refunded).
 */
function createMeter({ ledger, token, session, cfg, stagingKey, openaiFetch, log, clock, startedAt }) {
  const m = { calls: 0, denied: null, budget: null, usage: null, chargedUsd: null, draft: null, settleError: null, anomalies: [], bytes: 0 }
  m.fetch = async (url, opts = {}) => {
    const refuse = code => { m.denied = m.denied || code; throw new Error(`lina-staging: ${code}`) }
    if (m.calls >= 1) refuse('request_call_limit')
    const out = checkOutbound(url, opts, cfg, stagingKey)
    if (out.code) refuse(out.code)
    const outgoing = JSON.stringify({ ...out.body, service_tier: cfg.SERVICE_TIER })
    const bytes = Buffer.byteLength(outgoing, 'utf8')
    m.bytes = bytes
    if (bytes > cfg.MAX_INPUT_BYTES) refuse('bad_request')
    if (clock() - startedAt > cfg.MAX_MS_BEFORE_RESERVE) refuse('time_budget')

    const r = await ledger.reserve(token, session, bytes)
    if (!r.ok) refuse(r.code)
    m.calls++
    m.budget = r.budget

    let res
    let text
    try {
      res = await openaiFetch(url, { method: 'POST', headers: opts.headers, body: outgoing, signal: opts.signal })
      text = await res.text() // read once: a later abort of the shared runtime's timer cannot break the body
    } catch (err) {
      await settle(null, false) // usage unknown (network error / timeout): the whole reservation is charged
      throw err
    }
    let data = null
    try { data = JSON.parse(text) } catch { data = null }
    if (!res.ok) {
      await settle(null, false) // conservative: error responses are charged the full reservation
      return new Response(text, { status: res.status, headers: { 'Content-Type': 'application/json' } })
    }
    const c = checkResponse(data, bytes, cfg)
    m.usage = c.usage
    m.anomalies = c.anomalies
    if (c.anomalies.length) {
      log(`model_anomaly ${c.anomalies.join(',')}`)
      await settle(c.usage, true) // charged at least the full reservation; the database switches the budget off
      refuse('model_anomaly')
    }
    m.draft = draftOf(data)
    await settle(c.usage, false)
    return new Response(text, { status: res.status, headers: { 'Content-Type': 'application/json' } })

    async function settle(usage, anomaly) {
      const s = await ledger.settle(token, r.reservation, usage, { anomaly })
      if (s.ok) { m.budget = s.budget || m.budget; m.chargedUsd = s.chargedUsd; log(`usage in=${usage ? usage.inputTokens : '?'} out=${usage ? usage.outputTokens : '?'} usd=${s.chargedUsd}${anomaly ? ' anomaly' : ''}`) } else { m.settleError = s.code; log(`settle_failed ${s.code} (reservation stays counted)`) }
    }
  }
  return m
}

// The model's structured draft (for authorized diagnostics only; never logged or stored).
function draftOf(data) {
  try {
    for (const item of (data && data.output) || []) {
      for (const c of (item && item.content) || []) {
        if (c.type === 'output_text' && typeof c.text === 'string') {
          const p = JSON.parse(c.text)
          return { intent: p.intent, decision: p.decision, paragraphs: p.paragraphs, clarifying_question: p.clarifying_question,
            claims: (p.claims || []).map(x => ({ source_id: x.source_id, quote: x.quote, tax_year: x.tax_year })), numbers: p.numbers, conflicts: p.conflicts }
        }
        if (c.type === 'refusal') return { refusal: true }
      }
    }
  } catch { /* malformed draft: diagnostics show none */ }
  return null
}

function createStagingHandler({ cfg = CONFIG, loadIndex = loadBundledIndex, ledgerFactory = createSupabaseLedger, openaiFetch = (...a) => fetch(...a), log = s => console.error(`lina-staging: ${s}`), clock = () => Date.now() } = {}) {
  let curatedFor = null
  let curated = null

  return async function handle(request, { vars = {}, siteId = '', deployContext = '', ip = '' } = {}) {
    const startedAt = clock()
    const index = loadIndex()
    const env = checkEnvironment({ vars, siteId, deployContext, index, cfg })
    if (!env.ok) { log(`env_${env.code}`); return env.status === 404 ? json(404, { error: 'not_found' }) : json(503, { error: 'unavailable' }) }
    if (curatedFor !== index) { curated = createCuratedSources({ index }); curatedFor = index }

    if (request.method === 'GET') {
      // Public configuration for the page (all values are public by design).
      return json(200, { supabaseUrl: env.supabaseUrl, publishableKey: env.publishableKey,
        caps: { sessionMaxCalls: cfg.SESSION_MAX_CALLS, sessionMaxUsd: cfg.SESSION_MAX_USD, totalMaxUsd: cfg.TOTAL_MAX_USD } })
    }
    if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' })

    const selfOrigin = new URL(request.url).origin
    const site = request.headers.get('sec-fetch-site')
    if (request.headers.get('origin') !== selfOrigin || (site && site !== 'same-origin')) return json(403, { error: 'forbidden' })
    if (!/^application\/json\b/i.test(request.headers.get('content-type') || '')) return json(415, { error: 'unsupported_media_type' })
    const raw = await request.text()
    if (raw.length > MAX_BODY) return json(413, { error: 'too_large' })
    let body
    try { body = JSON.parse(raw) } catch { return json(400, { error: 'bad_request' }) }
    if (!body || typeof body !== 'object') return json(400, { error: 'bad_request' })

    const authz = request.headers.get('authorization') || ''
    const t = authz.length <= 8192 ? BEARER.exec(authz) : null
    if (!t) return errorResponse('unauthenticated')
    const token = t[1]
    const ledger = ledgerFactory({ supabaseUrl: env.supabaseUrl, publishableKey: env.publishableKey, timeoutMs: cfg.LEDGER_TIMEOUT_MS })

    if (body.action === 'start') {
      const r = await ledger.startSession(token)
      if (!r.ok) { log(`auth_${r.code}`); return errorResponse(r.code) }
      return json(200, { session: r.session, budget: r.budget })
    }
    if (typeof body.session !== 'string' || !UUID.test(body.session)) return json(400, { error: 'bad_request' })
    if (body.action === 'status') {
      const r = await ledger.authorize(token, body.session)
      if (!r.ok) { log(`auth_${r.code}`); return errorResponse(r.code) }
      return json(200, { budget: r.budget })
    }
    if (body.action !== 'ask') return json(400, { error: 'bad_request' })

    // No model call without owner-confirmed pricing, or with a token about to expire (settlement needs it).
    if (!pricingConfirmed(cfg)) { log('pricing_unconfirmed'); return errorResponse('pricing_unconfirmed') }
    const exp = tokenExp(token)
    if (exp === null || exp * 1000 - clock() < cfg.MIN_TOKEN_TTL_S * 1000) return errorResponse('token_expiring')

    const auth = await ledger.authorize(token, body.session)
    if (!auth.ok) { log(`auth_${auth.code}`); return errorResponse(auth.code) }

    // From here the caller is an authorized tester (aal2, approved authenticator) with a live session.
    const question = typeof body.question === 'string' ? body.question : ''
    const locale = body.locale === 'zh-tw' ? 'zh-tw' : 'en'
    const inner = new Request(request.url, {
      method: 'POST',
      headers: { origin: selfOrigin, 'content-type': 'application/json', 'sec-fetch-site': 'same-origin' },
      body: JSON.stringify(body.followUp ? { question, locale, followUp: body.followUp } : { question, locale }),
    })
    const codes = []
    const meter = createMeter({ ledger, token, session: body.session, cfg, stagingKey: env.stagingKey, openaiFetch, log, clock, startedAt })
    const out = await coreV2.handleLinaV2(inner, {
      env: { OPENAI_API_KEY: env.stagingKey, LINA_ALLOWED_ORIGINS: selfOrigin },
      fetchImpl: meter.fetch, ip, now: clock(), official: createOfficialResearch(), curated, log: c => codes.push(c),
    })
    for (const c of codes) log(`v2 ${c}`)
    if (meter.denied) { log(`reserve_${meter.denied}`); return errorResponse(meter.denied, { budget: meter.budget || auth.budget }) }

    const res = { budget: meter.budget || auth.budget }
    if (out.status === 200) res.reply = { ...out.body, guideLinks: guideLinks(out.body.guides, out.body.locale) }
    else res.error = out.body && out.body.error
    if (body.diagnostics === true) {
      // Same inputs the shared runtime used (trimmed question, parsed follow-up).
      const fu = coreV2.parseFollowUp(body.followUp)
      const q = question.trim()
      const evidenceQuestion = fu && fu !== 'bad' ? `${fu.previousQuestion} ${q}` : q
      let evidence = []
      try {
        evidence = [...coreV2.buildEvidence(evidenceQuestion, curated)].map(([id, s]) => ({
          id, kind: s.kind, layer: s.layer || 'library',
          source: s.kind === 'official' ? `${s.sourceId}#${s.selectionId}` : `${s.articleId || ''}${s.heading ? ` › ${s.heading}` : ''}`,
          title: s.title || '', taxYear: s.taxYear || '', approvalScope: s.approvalScope || '',
        }))
      } catch { evidence = [] }
      res.diagnostics = {
        reasonCodes: codes,
        shownKind: res.reply ? res.reply.kind : null,
        draft: meter.draft,
        evidence,
        usage: meter.usage ? { ...meter.usage, chargedUsd: meter.chargedUsd } : (meter.calls ? { chargedUsd: meter.chargedUsd } : null),
        requestBytes: meter.bytes || null,
        modelCalls: meter.calls,
        settleError: meter.settleError,
      }
    }
    return json(out.status, res)
  }
}

module.exports = { createStagingHandler, createMeter, checkOutbound, checkResponse, guideLinks, draftOf, tokenExp, ERRORS, loadBundledIndex, ROOT: path.join(__dirname, '..') }

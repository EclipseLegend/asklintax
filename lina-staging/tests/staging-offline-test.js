#!/usr/bin/env node
/**
 * Offline tests for the Lina v2 private staging site. No network: OpenAI, Supabase and Netlify are mocked.
 *   node lina-staging/tests/staging-offline-test.js
 * Any attempt to reach a real host fails the run (global fetch is replaced).
 */
const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')

const realFetch = globalThis.fetch
const networkAttempts = []
globalThis.fetch = async url => { networkAttempts.push(String(url)); throw new Error(`network blocked in offline tests: ${url}`) }

const ROOT = path.join(__dirname, '..', '..')
const STAGING = path.join(__dirname, '..')
const CFG0 = require('../config')
const { createStagingHandler, createMeter, checkOutbound, checkResponse } = require('../lib/handler')
const { createSupabaseLedger } = require('../lib/ledger')
const { checkEnvironment, pricingConfirmed, approvedLinesFromReview, digestLines } = require('../lib/identity')
const { buildStagingIndex } = require('../scripts/build-staging-index')
const { createMemoryLedger, mockPostgrest, makeToken, worstUsd, costUsd } = require('./mock-supabase')
const coreV2 = require(path.join(ROOT, 'netlify/functions/lina/core-v2.js'))
const { createCuratedSources } = require(path.join(ROOT, 'netlify/functions/lina/official.js'))

let pass = 0
let fail = 0
const groups = {}
function check(group, name, ok, detail = '') {
  groups[group] = groups[group] || { pass: 0, total: 0 }
  groups[group].total++
  if (ok) { pass++; groups[group].pass++ } else { fail++; console.log(`FAIL [${group}] ${name}${detail ? `\n      ${String(detail).slice(0, 500)}` : ''}`) }
}

// ── Fixtures ────────────────────────────────────────────────
const SITE_ID = 'site-staging-offline-test'
// Tests that exercise model calls use a copy with pricing marked confirmed; the committed config is unconfirmed.
const CFG = { ...CFG0, EXPECTED_SITE_ID: SITE_ID, PRICING: { ...CFG0.PRICING, OWNER_CONFIRMED: true } }
const STAGING_KEY = 'sk-proj-OFFLINE-TEST-KEY-not-a-real-key-000000'
const PROD_KEY = 'sk-proj-PRODUCTION-NAME-PRESENT-not-real-000000'
const SUPA = 'https://staging-test.supabase.co'
const VARS = {
  LINA_STAGING_ENABLED: 'true', LINA_STAGING_OPENAI_API_KEY: STAGING_KEY,
  LINA_STAGING_SUPABASE_URL: SUPA, LINA_STAGING_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_OFFLINE_TEST_not_real_0000',
}
const ORIGIN = 'https://lina-staging-test.netlify.app'
const built = buildStagingIndex({ env: { SITE_ID, CONTEXT: 'production' }, cfg: CFG })
const INDEX = built.index
const CURATED = createCuratedSources({ index: INDEX })

const TESTER = 'aaaaaaaa-0000-4000-8000-000000000001'
const OTHER = 'bbbbbbbb-0000-4000-8000-000000000002'
const tokens = new Map()
const nowS = () => Math.floor(Date.now() / 1000)
const tok = (sub, aal, { amr = [{ method: aal === 'aal2' ? 'totp' : 'password' }], ttl = 3600 } = {}) => { const c = { sub, aal, amr, exp: nowS() + ttl, role: 'authenticated' }; const t = makeToken(c); tokens.set(t, c); return t }
const T_OK = tok(TESTER, 'aal2')
const T_AAL1 = tok(TESTER, 'aal1')
const T_OTHER = tok(OTHER, 'aal2')
const T_FORGED = makeToken({ sub: TESTER, aal: 'aal2', amr: [{ method: 'totp' }], exp: nowS() + 3600, role: 'authenticated' }) // well-formed, never issued

const allBodies = []
let ipn = 0
const nextIp = () => `10.88.${Math.floor(ipn / 250)}.${ipn++ % 250}`

// Mock model: reply(sentBody) → the model's JSON; usage per call.
function mockModel(reply, { usage = { input_tokens: 4200, output_tokens: 600 }, status = 200, throwNetwork = false, model = 'gpt-5.4-mini-2026-03-17', tier = 'default' } = {}) {
  const calls = []
  const fetchImpl = async (url, opts) => {
    const sent = JSON.parse(opts.body)
    calls.push({ url, sent, auth: opts.headers.Authorization })
    if (throwNetwork) throw new TypeError('fetch failed')
    if (status !== 200) return new Response('{}', { status })
    const text = JSON.stringify(reply(sent, calls.length - 1))
    // usage may depend on the request size: real input tokens are never more than the request's bytes.
    const u = typeof usage === 'function' ? usage(Buffer.byteLength(opts.body, 'utf8')) : usage
    const resp = { status: 'completed', model, output: [{ type: 'message', content: [{ type: 'output_text', text }] }], usage: u }
    if (tier !== null) resp.service_tier = tier
    return new Response(JSON.stringify(resp), { status: 200 })
  }
  return { fetchImpl, calls }
}
// The most a call can really cost: every request byte a token, plus the full output cap.
const MAXUSE = bytes => ({ input_tokens: bytes, output_tokens: CFG0.MAX_OUTPUT_TOKENS })
const base = over => ({ intent: 'us_tax', decision: 'answer', clarifying_question: '', paragraphs: [], claims: [], numbers: [], conflicts: [], handoff_needed: false, ...over })
const gid = (q, sel) => { for (const [id, s] of coreV2.buildEvidence(q, CURATED)) if (s.kind === 'official' && s.selectionId === sel) return id; return null }

function harness({ vars = VARS, siteId = SITE_ID, deployContext = 'production', cfg = CFG, index = INDEX, ledger = null, pgFail = null, clock, model = mockModel(() => base({ decision: 'insufficient' })) } = {}) {
  const led = ledger || createMemoryLedger({ testers: [TESTER], tokens })
  const pg = mockPostgrest(led, { baseUrl: SUPA, fail: pgFail })
  const logs = []
  const handle = createStagingHandler({
    cfg, loadIndex: () => index, openaiFetch: model.fetchImpl, log: s => logs.push(s),
    ledgerFactory: o => createSupabaseLedger({ ...o, fetchImpl: pg.fetchImpl }),
    ...(clock ? { clock } : {}),
  })
  async function call(body, { token = T_OK, method = 'POST', origin = ORIGIN, auth } = {}) {
    const headers = { origin, 'content-type': 'application/json', 'sec-fetch-site': 'same-origin' }
    if (auth !== undefined) headers.authorization = auth
    else if (token) headers.authorization = `Bearer ${token}`
    const req = new Request(`${ORIGIN}/api/lina-staging`, method === 'GET' ? { method } : { method, headers, body: JSON.stringify(body) })
    const res = await handle(req, { vars, siteId, deployContext, ip: nextIp() })
    const text = await res.text()
    allBodies.push(text)
    let data = null
    try { data = JSON.parse(text) } catch { data = null }
    return { status: res.status, data, text, headers: res.headers }
  }
  async function session(token = T_OK) { const r = await call({ action: 'start' }, { token }); return r.data && r.data.session }
  return { call, session, led, pg, model, logs }
}

;(async () => {
  // ── Build script (staging index) ──────────────────────────
  {
    const G = 'build'
    check(G, 'staging index builds: exactly the 22 approved excerpts, held 2026 IRA excerpt absent', built.ok && INDEX.passages.length === 22 && !INDEX.passages.some(p => CFG.HELD_IDS.includes(p.id)), JSON.stringify(built.code))
    const P = { SITE_ID, CONTEXT: 'production' }
    check(G, 'build refused: EXPECTED_SITE_ID empty (the committed config) → nothing builds', buildStagingIndex({ env: P }).code === 'wrong_site')
    check(G, 'build refused: wrong SITE_ID', buildStagingIndex({ env: { ...P, SITE_ID: 'site-production' }, cfg: CFG }).code === 'wrong_site')
    for (const ctx of ['deploy-preview', 'branch-deploy', 'dev', undefined]) check(G, `build refused in deploy context ${ctx || '(missing)'}: previews/branch deploys never get a staging index`, buildStagingIndex({ env: { SITE_ID, CONTEXT: ctx }, cfg: CFG }).code === 'wrong_deploy_context')
    check(G, 'build refused: OPENAI_API_KEY visible to the staging build', buildStagingIndex({ env: { ...P, OPENAI_API_KEY: PROD_KEY }, cfg: CFG }).code === 'production_key_present')
    check(G, 'build refused: the review record no longer matches the pinned approved set', buildStagingIndex({ env: P, cfg: { ...CFG, APPROVED_SET_DIGEST: '0'.repeat(64) } }).code === 'approved_set_changed')
    const review = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/lina-official/review.json'), 'utf8'))
    check(G, 'pinned digest equals the committed review record (22 approved staging excerpts)', digestLines(approvedLinesFromReview(review)) === CFG0.APPROVED_SET_DIGEST && approvedLinesFromReview(review).length === 22)
  }

  // ── 1–5. Environment identity (fail closed, no ledger or model call) ──
  {
    const G = 'identity'
    const cases = [
      ['1 wrong SITE_ID → 404', { siteId: 'site-production' }, 404],
      ['1b empty EXPECTED_SITE_ID (committed config) → 404', { cfg: CFG0 }, 404],
      ['1c missing SITE_ID → 404', { siteId: '' }, 404],
      ['H1 Deploy Preview of the staging site → 404', { deployContext: 'deploy-preview' }, 404],
      ['H1 branch deploy of the staging site → 404', { deployContext: 'branch-deploy' }, 404],
      ['H1 deploy context missing at runtime → 404 (fail closed)', { deployContext: '' }, 404],
      ['2 staging disabled (flag absent) → 404', { vars: { ...VARS, LINA_STAGING_ENABLED: undefined } }, 404],
      ['2b staging disabled ("false") → 404', { vars: { ...VARS, LINA_STAGING_ENABLED: 'false' } }, 404],
      ['2c "TRUE"/"1" are not "true" → 404', { vars: { ...VARS, LINA_STAGING_ENABLED: '1' } }, 404],
      ['3 production key (OPENAI_API_KEY) present → 503, never used', { vars: { ...VARS, OPENAI_API_KEY: PROD_KEY } }, 503],
      ['4 missing staging key → 503', { vars: { ...VARS, LINA_STAGING_OPENAI_API_KEY: undefined } }, 503],
      ['4b malformed staging key → 503', { vars: { ...VARS, LINA_STAGING_OPENAI_API_KEY: 'short key' } }, 503],
      ['4c staging Supabase URL not https → 503', { vars: { ...VARS, LINA_STAGING_SUPABASE_URL: 'http://staging-test.supabase.co' } }, 503],
      ['5 index hash mismatch (one excerpt text altered) → 503', { index: { ...INDEX, passages: INDEX.passages.map((p, i) => (i === 3 ? { ...p, text: p.text.replace('$4,300', '$4,400') } : p)) } }, 503],
      ['5b held excerpt added → 503', { index: { ...INDEX, passages: [...INDEX.passages.slice(1), { ...INDEX.passages[0], id: 'irs-n-2025-67#ira-limit-2026' }] } }, 503],
      ['5c index missing → 503', { index: null }, 503],
      ['5d production-target index → 503', { index: { ...INDEX, target: 'production' } }, 503],
      ['5e a passage scoped for production → 503', { index: { ...INDEX, passages: INDEX.passages.map((p, i) => (i === 0 ? { ...p, approvalScope: 'production' } : p)) } }, 503],
    ]
    for (const [name, over, want] of cases) {
      const h = harness(over)
      const r = await h.call({ action: 'ask', session: '00000000-0000-4000-8000-000000000000', question: 'test', diagnostics: true })
      const g = await h.call(null, { method: 'GET' })
      check(G, name, r.status === want && g.status === want && h.pg.calls.length === 0 && h.model.calls.length === 0 && !('diagnostics' in (r.data || {})), `${r.status} ${g.status} ${r.text}`)
    }
    const ok = checkEnvironment({ vars: VARS, siteId: SITE_ID, deployContext: 'production', index: INDEX, cfg: CFG })
    check(G, 'all conditions met → environment ok, staging key selected', ok.ok && ok.stagingKey === STAGING_KEY)
    check(G, 'identity never reads CONTEXT', !fs.readFileSync(path.join(STAGING, 'lib/identity.js'), 'utf8').includes('vars.CONTEXT') && !fs.readFileSync(path.join(STAGING, 'lib/handler.js'), 'utf8').includes('CONTEXT'))
    const h = harness()
    const g = await h.call(null, { method: 'GET' })
    check(G, 'GET returns only public config (Supabase URL + publishable key + caps), no secret', g.status === 200 && g.data.supabaseUrl === SUPA && !g.text.includes(STAGING_KEY) && Object.keys(g.data).sort().join() === 'caps,publishableKey,supabaseUrl')
    check(G, 'responses are no-store and noindex', g.headers.get('cache-control') === 'no-store' && /noindex/.test(g.headers.get('x-robots-tag')))
  }

  // ── 6–8, 16. Authentication, allowlist, MFA, diagnostics access ──
  {
    const G = 'auth'
    const h = harness({ model: mockModel(() => base({ decision: 'insufficient' })) })
    const s = await h.session()
    const ask = (opts, extra = {}) => h.call({ action: 'ask', session: s, question: 'What is the 2025 HSA limit?', diagnostics: true, ...extra }, opts)
    let r = await ask({ token: null })
    check(G, '6 unauthenticated (no Authorization header) → 401, no ledger/model call, no diagnostics', r.status === 401 && Object.keys(r.data).join() === 'error' && h.model.calls.length === 0, r.text)
    r = await ask({ auth: 'Bearer not-a-jwt' })
    check(G, '6b malformed bearer token → 401', r.status === 401 && Object.keys(r.data).join() === 'error')
    r = await ask({ token: T_FORGED })
    check(G, '6c well-formed but unverifiable token (PostgREST 401) → 401', r.status === 401 && Object.keys(r.data).join() === 'error' && h.model.calls.length === 0, r.text)
    r = await ask({ token: T_OTHER })
    check(G, '7 signed-in user not on the tester allowlist → 403 forbidden, no diagnostics', r.status === 403 && r.data.error === 'forbidden' && Object.keys(r.data).join() === 'error' && h.model.calls.length === 0, r.text)
    r = await h.call({ action: 'start' }, { token: T_OTHER })
    check(G, '7b non-tester cannot start a session', r.status === 403 && r.data.error === 'forbidden')
    r = await ask({ token: T_AAL1 })
    check(G, '8 tester without MFA (aal1) → 403 mfa_required, no diagnostics', r.status === 403 && r.data.error === 'mfa_required' && Object.keys(r.data).join() === 'error' && h.model.calls.length === 0, r.text)
    r = await h.call({ action: 'start' }, { token: T_AAL1 })
    check(G, '8b aal1 cannot start a session', r.status === 403 && r.data.error === 'mfa_required')
    r = await ask({}, { session: '11111111-1111-4111-8111-111111111111' })
    check(G, 'unknown session id → 409 bad_session, no model call', r.status === 409 && h.model.calls.length === 0)
    r = await ask({ origin: 'https://evil.example' })
    check(G, 'cross-origin POST → 403 before any auth call', r.status === 403 && r.data.error === 'forbidden')
    const before = h.pg.calls.length
    r = await ask({ token: null })
    check(G, '16 unauthorized diagnostics request never reaches the ledger or model', h.pg.calls.length === before && !r.text.includes('reasonCodes') && !r.text.includes('draft'))
    r = await ask({}, { diagnostics: false })
    check(G, '16b authorized tester without the diagnostics flag gets no diagnostics', r.status === 200 && !('diagnostics' in r.data))
    r = await ask({})
    check(G, '16c authorized tester (aal2, allowlisted, own session) with the flag gets diagnostics', r.status === 200 && r.data.diagnostics && Array.isArray(r.data.diagnostics.reasonCodes) && r.data.diagnostics.modelCalls === 1)
    const s2 = await h.session()
    const t2 = tok(OTHER, 'aal2')
    r = await h.call({ action: 'ask', session: s2, question: 'x' }, { token: t2 })
    check(G, 'another user cannot use the tester\'s session', r.status === 403)
  }

  // ── 9–11. Session call, session cost and total cost limits ──
  {
    const G = 'budget'
    let h = harness({ model: mockModel(() => base({ decision: 'insufficient' }), { usage: { input_tokens: 3000, output_tokens: 300 } }) })
    const s = await h.session()
    let last
    for (let i = 0; i < 20; i++) last = await h.call({ action: 'ask', session: s, question: `Synthetic question ${i}` })
    check(G, '9 twenty calls in one session succeed', last.status === 200 && h.model.calls.length === 20 && last.data.budget.sessionCalls === 20, last.text)
    let r = await h.call({ action: 'ask', session: s, question: 'Call 21' })
    check(G, '9 call 21 → 429 session_calls, model NOT called', r.status === 429 && r.data.error === 'session_calls' && h.model.calls.length === 20, r.text)
    const s2 = await h.session()
    r = await h.call({ action: 'ask', session: s2, question: 'New session' })
    check(G, '9b a new session starts again at call 1', r.status === 200 && r.data.budget.sessionCalls === 1)

    h = harness({ model: mockModel(() => base({ decision: 'insufficient' }), { usage: MAXUSE }) })
    const sc = await h.session()
    const results = []
    for (let i = 0; i < 16; i++) results.push(await h.call({ action: 'ask', session: sc, question: 'Expensive synthetic question' }))
    const okN = results.filter(x => x.status === 200).length
    const denied = results.find(x => x.status === 429)
    const sess = [...h.led.db.sessions.values()].find(x => x.id === sc)
    const bytes10 = Buffer.byteLength(JSON.stringify(h.model.calls[0].sent), 'utf8')
    const W = worstUsd(bytes10)
    const C = costUsd(bytes10, 1600)
    let expectN = 0
    for (let spent = 0; Math.round((spent + W) * 1e6) / 1e6 <= 0.25; spent = Math.round((spent + C) * 1e6) / 1e6) expectN++
    check(G, '10 session cost: each call reserves its worst case first; refused once spent + worst case would pass $0.25; model not called when refused', denied && denied.data.error === 'session_cost' && h.model.calls.length === okN && okN === expectN && sess.spentUsd + W > 0.25 && sess.spentUsd <= 0.25 && results.slice(okN).every(x => x.status === 429), `ok=${okN} expected=${expectN} spent=${sess.spentUsd} worst=${W} ${results.map(x => x.status)}`)
    check(G, '10b settlement charged the actual usage (every byte a token + full output), below the reservation', Math.abs(sess.spentUsd - okN * C) < 1e-6 && C < W && !h.led.db.budget.disabled, `${sess.spentUsd} ${okN * C}`)
    h = harness({ model: mockModel(() => base({ decision: 'insufficient' }), { usage: bytes => ({ input_tokens: bytes * 3, output_tokens: 1600 }) }) })
    const so = await h.session()
    const ra = await h.call({ action: 'ask', session: so, question: 'Anomalous usage', diagnostics: true })
    const ro = await h.call({ action: 'ask', session: so, question: 'Next' })
    const resA = [...h.led.db.reservations.values()][0]
    check(G, '10c reported input tokens above the byte bound → anomaly: no reply shown, charged at least the reservation, whole budget off', ra.status === 503 && ra.data.error === 'model_anomaly' && !ra.data.reply && h.led.db.budget.disabled && /anomaly/.test(h.led.db.budget.disabledReason) && resA.chargedUsd >= resA.reservedUsd && ro.status === 503 && ro.data.error === 'disabled' && h.model.calls.length === 1, ra.text)

    const led = createMemoryLedger({ testers: [TESTER], tokens, spentUsd: 4.995 })
    h = harness({ ledger: led })
    const st = await h.session()
    r = await h.call({ action: 'ask', session: st, question: 'Over the total' })
    check(G, '11 total cost: $4.995 spent + worst case > $5 → 429 total_cost, model NOT called', r.status === 429 && r.data.error === 'total_cost' && h.model.calls.length === 0, r.text)
    const led2 = createMemoryLedger({ testers: [TESTER], tokens, spentUsd: Math.round((5 - W) * 1e6) / 1e6 })
    h = harness({ ledger: led2, model: mockModel(() => base({ decision: 'insufficient' }), { usage: MAXUSE }) })
    const st2 = await h.session()
    r = await h.call({ action: 'ask', session: st2, question: 'Expensive synthetic question' })
    const r2 = await h.call({ action: 'ask', session: st2, question: 'Expensive synthetic question' })
    check(G, '11b the last call whose worst case fits under $5 runs; the next is refused (total_cost) without a model call', r.status === 200 && r2.status === 429 && r2.data.error === 'total_cost' && h.model.calls.length === 1 && led2.db.budget.spentUsd <= 5, `${r.status} ${r2.text}`)
    const led3 = createMemoryLedger({ testers: [TESTER], tokens, spentUsd: Math.round((5 - W) * 1e6) / 1e6 })
    h = harness({ ledger: led3, model: mockModel(() => base(), { throwNetwork: true }) })
    const st3 = await h.session()
    await h.call({ action: 'ask', session: st3, question: 'Expensive synthetic question' })
    check(G, '11c a call charged its full reservation that reaches exactly $5 switches the budget off automatically', led3.db.budget.disabled && led3.db.budget.disabledReason === 'total budget reached' && Math.abs(led3.db.budget.spentUsd - 5) < 1e-6, JSON.stringify(led3.db.budget))
    r = await h.call({ action: 'ask', session: st3, question: 'After the total' })
    check(G, '11d after that, every request → 503 disabled', r.status === 503 && r.data.error === 'disabled')
    check(G, 'worst case per call = ((bytes + 1,000) × $0.75 + 1,600 × $4.50) × 1.25 per 1M — above any usage within the bounds', Math.abs(worstUsd(10000) - Math.ceil(((10000 + 1000) * 0.75 + 1600 * 4.5) * 1.25) / 1e6) < 1e-9 && worstUsd(10000) > costUsd(10000 + 1000, 1600))
  }

  // ── 12. Concurrency ────────────────────────────────────────
  {
    const G = 'concurrency'
    const bytes = 20000
    const per = worstUsd(bytes)
    const fitSession = Math.floor(CFG.SESSION_MAX_USD / per + 1e-9)
    async function burst(led, n, sessions) {
      return Promise.all(Array.from({ length: n }, (_, i) => led.fns.lina_staging_reserve(T_OK, { p_session: sessions[i % sessions.length], p_input_bytes: bytes }).then(() => 1, e => e.code)))
    }
    let led = createMemoryLedger({ testers: [TESTER], tokens })
    let sid = led.fns.lina_staging_start_session(T_OK).session
    let out = await burst(led, 50, [sid])
    let s = led.db.sessions.get(sid)
    check(G, `12 fifty concurrent reservations on one session: exactly ${fitSession} fit under $0.25, the rest refused`, out.filter(x => x === 1).length === fitSession && s.reservedUsd <= CFG.SESSION_MAX_USD && out.filter(x => x === 'session_cost').length === 50 - fitSession, `${out.filter(x => x === 1).length} ${s.reservedUsd}`)
    led = createMemoryLedger({ testers: [TESTER], tokens, noLock: true })
    sid = led.fns.lina_staging_start_session(T_OK).session
    out = await burst(led, 50, [sid])
    s = led.db.sessions.get(sid)
    check(G, '12 control: the same burst WITHOUT the lock oversubscribes (proves the test detects races)', out.filter(x => x === 1).length > fitSession && s.reservedUsd > CFG.SESSION_MAX_USD, `${out.filter(x => x === 1).length} ${s.reservedUsd}`)

    const big = 200000
    const perBig = worstUsd(big)
    led = createMemoryLedger({ testers: [TESTER], tokens })
    const sids = Array.from({ length: 40 }, () => led.fns.lina_staging_start_session(T_OK).session)
    out = await Promise.all(sids.map(x => led.fns.lina_staging_reserve(T_OK, { p_session: x, p_input_bytes: big }).then(() => 1, e => e.code)))
    const fitTotal = Math.floor(CFG.TOTAL_MAX_USD / perBig + 1e-9)
    check(G, `12b forty concurrent sessions against the $5 total: exactly ${fitTotal} fit, total reserved ≤ $5`, out.filter(x => x === 1).length === fitTotal && led.db.budget.reservedUsd <= CFG.TOTAL_MAX_USD && out.filter(x => x === 'total_cost').length === 40 - fitTotal, `${out.filter(x => x === 1).length} ${led.db.budget.reservedUsd}`)

    led = createMemoryLedger({ testers: [TESTER], tokens })
    sid = led.fns.lina_staging_start_session(T_OK).session
    const res = await led.fns.lina_staging_reserve(T_OK, { p_session: sid, p_input_bytes: bytes })
    const settles = await Promise.all(Array.from({ length: 5 }, () => led.fns.lina_staging_settle(T_OK, { p_reservation: res.reservation, p_usage_known: true, p_input_tokens: 1000, p_output_tokens: 100, p_anomaly: false }).then(() => 1, e => e.code)))
    check(G, '12c five concurrent settlements of one reservation: exactly one succeeds, charged once', settles.filter(x => x === 1).length === 1 && settles.filter(x => x === 'already_settled').length === 4 && Math.abs(led.db.budget.spentUsd - costUsd(1000, 100)) < 1e-9 && led.db.budget.reservedUsd === 0)

    // Concurrency through the full handler path (ledger.js → mock PostgREST → memory ledger).
    const h = harness({ model: mockModel(() => base({ decision: 'insufficient' }), { usage: MAXUSE }) })
    const hs = await h.session()
    const rs = await Promise.all(Array.from({ length: 16 }, () => h.call({ action: 'ask', session: hs, question: 'Expensive synthetic question' })))
    const okCount = rs.filter(x => x.status === 200).length
    const sess = h.led.db.sessions.get(hs)
    check(G, '12d sixteen concurrent asks through the handler: model calls == successful reservations, some refused, session spend ≤ $0.25', h.model.calls.length === okCount && okCount < 16 && sess.spentUsd + sess.reservedUsd <= CFG.SESSION_MAX_USD + 1e-9 && rs.every(x => x.status === 200 || (x.status === 429 && x.data.error === 'session_cost')), `${okCount} ${sess.spentUsd} ${rs.map(x => x.status)}`)
  }

  // ── 13. Database failures (fail closed) ────────────────────
  {
    const G = 'db-failure'
    for (const mode of ['network', 'http500', 'badjson']) {
      const h = harness({ pgFail: { fn: 'lina_staging_start_session', mode } })
      const r = await h.call({ action: 'start' })
      check(G, `13 start_session ${mode} → 503 ledger_unavailable`, r.status === 503 && r.data.error === 'ledger_unavailable', r.text)
    }
    let h = harness()
    let s = await h.session()
    h = harness({ ledger: h.led, pgFail: { fn: 'lina_staging_authorize', mode: 'network' } })
    let r = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    check(G, '13 authorize unreachable → 503, model NOT called, no diagnostics', r.status === 503 && r.data.error === 'ledger_unavailable' && h.model.calls.length === 0 && !('diagnostics' in r.data), r.text)
    h = harness({ ledger: h.led, pgFail: { fn: 'lina_staging_reserve', mode: 'http500' } })
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, '13 reserve fails → 503, model NOT called (a reservation is required before any model call)', r.status === 503 && r.data.error === 'ledger_unavailable' && h.model.calls.length === 0, r.text)
    const led = createMemoryLedger({ testers: [TESTER], tokens })
    h = harness({ ledger: led, pgFail: { fn: 'lina_staging_settle', mode: 'network' } })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    const sess = led.db.sessions.get(s)
    check(G, '13 settle fails after the call → reply returned, reservation stays counted (conservative), error logged', r.status === 200 && r.data.diagnostics.settleError === 'ledger_unavailable' && sess.reservedUsd > 0 && led.db.budget.reservedUsd > 0 && h.logs.some(l => l.startsWith('settle_failed')), r.text)
    h = harness({ model: mockModel(() => base(), { throwNetwork: true }) })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    const sess2 = h.led.db.sessions.get(s)
    check(G, 'model network error: no retry (1 call), the whole reservation is charged', h.model.calls.length === 1 && sess2.reservedUsd === 0 && sess2.spentUsd > 0 && r.status === 503, `${r.status} ${JSON.stringify(sess2)}`)
    h = harness({ model: mockModel(() => base(), { status: 500 }) })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, 'model HTTP 500: no retry (exactly 1 model call)', h.model.calls.length === 1 && r.status === 503)
  }

  // ── 14. Emergency disabled flag ────────────────────────────
  {
    const G = 'disabled'
    const led = createMemoryLedger({ testers: [TESTER], tokens })
    const h = harness({ ledger: led })
    const s = await h.session()
    led.db.budget.disabled = true
    let r = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    check(G, '14 disabled flag set in the database → ask 503 disabled, model NOT called, no diagnostics', r.status === 503 && r.data.error === 'disabled' && h.model.calls.length === 0 && !('diagnostics' in r.data), r.text)
    r = await h.call({ action: 'start' })
    check(G, '14 disabled → new sessions refused', r.status === 503 && r.data.error === 'disabled')
    await assertReject(G, '14 disabled → direct reserve refused', () => led.fns.lina_staging_reserve(T_OK, { p_session: s, p_input_bytes: 100 }), 'disabled')
    const fresh = createMemoryLedger({ testers: [TESTER], tokens, disabled: true })
    await assertReject(G, 'the migration default (disabled until the owner enables it) refuses everything', async () => fresh.fns.lina_staging_start_session(T_OK), 'disabled')
  }

  // ── 15. Reservations cannot be forged, replayed or settled by another user ──
  {
    const G = 'reservations'
    const led = createMemoryLedger({ testers: [TESTER], tokens })
    const sid = led.fns.lina_staging_start_session(T_OK).session
    const r = await led.fns.lina_staging_reserve(T_OK, { p_session: sid, p_input_bytes: 5000 })
    await assertReject(G, '15 forged reservation id → bad_reservation', () => led.fns.lina_staging_settle(T_OK, { p_reservation: '22222222-2222-4222-8222-222222222222', p_usage_known: true, p_input_tokens: 0, p_output_tokens: 0 }), 'bad_reservation')
    await assertReject(G, '15 another user settling the tester\'s reservation → bad_reservation', () => led.fns.lina_staging_settle(T_OTHER, { p_reservation: r.reservation, p_usage_known: true, p_input_tokens: 0, p_output_tokens: 0 }), 'bad_reservation')
    await led.fns.lina_staging_settle(T_OK, { p_reservation: r.reservation, p_usage_known: true, p_input_tokens: 1000, p_output_tokens: 100, p_anomaly: false })
    await assertReject(G, '15 replayed settlement → already_settled (charged once)', () => led.fns.lina_staging_settle(T_OK, { p_reservation: r.reservation, p_usage_known: true, p_input_tokens: 0, p_output_tokens: 0 }), 'already_settled')
    await assertReject(G, '15 negative usage → bad_request', async () => { const x = await led.fns.lina_staging_reserve(T_OK, { p_session: sid, p_input_bytes: 10 }); return led.fns.lina_staging_settle(T_OK, { p_reservation: x.reservation, p_usage_known: true, p_input_tokens: -5, p_output_tokens: 0 }) }, 'bad_request')
    await assertReject(G, 'reserve with an out-of-range byte count (to shrink the worst case) → bad_request', () => led.fns.lina_staging_reserve(T_OK, { p_session: sid, p_input_bytes: 0 }), 'bad_request')
    await assertReject(G, 'reserve on another user\'s session → not_tester / bad_session', () => led.fns.lina_staging_reserve(T_OTHER, { p_session: sid, p_input_bytes: 10 }), 'not_tester')
    const over = await led.fns.lina_staging_reserve(T_OK, { p_session: sid, p_input_bytes: 10 })
    await led.fns.lina_staging_settle(T_OK, { p_reservation: over.reservation, p_usage_known: true, p_input_tokens: 10, p_output_tokens: 5000, p_anomaly: false })
    check(G, 'output above the 1,600-token cap is an anomaly: charged at least the reservation, budget off', led.db.budget.disabled && /anomaly/.test(led.db.budget.disabledReason) && led.db.reservations.get(over.reservation).chargedUsd >= led.db.reservations.get(over.reservation).reservedUsd)
    // Through the adapter: reservation ids never leave the server.
    const h = harness()
    const s = await h.session()
    const res = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    const ids = [...h.led.db.reservations.keys()]
    check(G, 'reservation ids never appear in any response (cannot be replayed by the browser)', ids.length === 1 && !res.text.includes(ids[0]))
  }

  // ── 17–20. Lina behaviour through the staging function ─────
  {
    const G = 'lina'
    const q25 = 'What is the 2025 HSA contribution limit for self-only coverage?'
    const qt25 = 'For 2025, if you have self-only HDHP coverage, you can contribute up to $4,300.'
    const answer25 = (q, para) => () => { const id = gid(q, 'limit-2025'); return base({ paragraphs: [para], claims: [{ text: 'x', source_id: id, quote: qt25, tax_year: '2025' }], numbers: [{ value: '2025', category: 'tax_year', source_id: '', expression: '' }, { value: '$4,300', category: 'legal', source_id: id, expression: '' }] }) }

    // 19. Citation preservation: identical reply to the shared runtime, plus IRS + guide links.
    const m1 = mockModel(answer25(q25, 'For 2025, if you have self-only HDHP coverage, you can contribute up to $4,300 to your HSA.'))
    let h = harness({ model: m1 })
    let s = await h.session()
    let r = await h.call({ action: 'ask', session: s, question: q25, diagnostics: true })
    const direct = await coreV2.handleLinaV2({ method: 'POST', url: `${ORIGIN}/api/lina-staging`, headers: { get: n => ({ origin: ORIGIN, 'content-type': 'application/json', 'sec-fetch-site': 'same-origin' })[n.toLowerCase()] }, text: async () => JSON.stringify({ question: q25, locale: 'en' }) },
      { env: { OPENAI_API_KEY: STAGING_KEY, LINA_ALLOWED_ORIGINS: ORIGIN }, fetchImpl: mockModel(answer25(q25, 'For 2025, if you have self-only HDHP coverage, you can contribute up to $4,300 to your HSA.')).fetchImpl, ip: nextIp(), curated: CURATED, log: () => {} })
    const { guideLinks, ...shown } = r.data.reply || {}
    check(G, '19 citations preserved: the staging reply is identical to the shared Lina v2 runtime\'s reply', r.status === 200 && JSON.stringify(shown) === JSON.stringify(direct.body), `${r.text.slice(0, 300)}\n${JSON.stringify(direct.body).slice(0, 300)}`)
    check(G, '19 the official IRS citation (Pub 969) is shown', r.data.reply.kind === 'answer' && r.data.reply.officialSources.some(x => x.url === 'https://www.irs.gov/publications/p969'), JSON.stringify(r.data.reply.officialSources))
    check(G, '19 guide citations resolve to published asklintax.com articles', r.data.reply.guides.length === guideLinks.length && guideLinks.every(g => /^https:\/\/asklintax\.com\/library\//.test(g.href) && g.title))
    check(G, '19 the model was called with the staging key and the pinned model only', m1.calls.length === 1 && m1.calls[0].auth === `Bearer ${STAGING_KEY}` && m1.calls[0].sent.model === CFG.MODEL && m1.calls[0].url === CFG.OPENAI_URL)
    check(G, '19 diagnostics list the retrieved approved excerpt and accepted draft', r.data.diagnostics.evidence.some(e => e.kind === 'official' && e.source === 'irs-p969-2025#limit-2025' && e.approvalScope === 'staging') && r.data.diagnostics.draft.decision === 'answer' && r.data.diagnostics.reasonCodes.length === 0)

    // 20. Validator rejection: a fabricated quote is refused exactly as in Lina v2.
    const bad = mockModel(() => { const id = gid(q25, 'limit-2025'); return base({ paragraphs: ['For 2025, you can contribute up to $4,300 to your HSA with self-only coverage.'], claims: [{ text: 'x', source_id: id, quote: 'For 2025 you may always contribute up to $4,300 no matter what.', tax_year: '2025' }], numbers: [{ value: '2025', category: 'tax_year', source_id: '', expression: '' }, { value: '$4,300', category: 'legal', source_id: id, expression: '' }] }) })
    h = harness({ model: bad })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: q25, diagnostics: true })
    check(G, '20 validator rejection: fabricated quote → safe abstention shown (insufficient)', r.status === 200 && r.data.reply.kind === 'insufficient' && r.data.reply.officialSources.length === 0, r.text.slice(0, 300))
    check(G, '20 diagnostics show the rejected draft and the reason code', r.data.diagnostics.draft.decision === 'answer' && r.data.diagnostics.reasonCodes.includes('quote_not_in_source'), JSON.stringify(r.data.diagnostics.reasonCodes))
    check(G, '20 the rejected call was still metered and settled', r.data.budget.sessionCalls === 1 && r.data.budget.sessionSpentUsd > 0 && r.data.budget.sessionReservedUsd === 0)

    // 17. English follow-up.
    const qE = 'What is the HSA contribution limit for self-only coverage?'
    const clarE = 'Which tax year are you asking about?'
    const mE = mockModel((sent, i) => (i === 0 ? base({ decision: 'clarify', clarifying_question: clarE })
      : answer25(`${qE} 2025`, 'For 2025, if you have self-only HDHP coverage, you can contribute up to $4,300 to your HSA.')()))
    h = harness({ model: mE })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: qE, locale: 'en' })
    const ok1 = r.status === 200 && r.data.reply.kind === 'clarify'
    const r2 = await h.call({ action: 'ask', session: s, question: '2025', locale: 'en', followUp: { previousQuestion: qE, clarifyingQuestion: r.data.reply.paragraphs[0], round: 1 } })
    const userSent = mE.calls[1] && JSON.stringify(mE.calls[1].sent.input)
    check(G, '17 English follow-up: clarifying question, then an answer using the earlier question', ok1 && r2.status === 200 && r2.data.reply.kind === 'answer' && userSent.includes(qE) && r2.data.budget.sessionCalls === 2, `${r.text.slice(0, 200)}\n${r2.text.slice(0, 300)}`)

    // 18. Traditional Chinese follow-up.
    const qZ = '我的 HSA 個人醫療保險保障可以存多少錢？'
    const clarZ = '你問的是哪一個稅務年度？'
    const mZ = mockModel((sent, i) => (i === 0 ? base({ decision: 'clarify', clarifying_question: clarZ })
      : answer25(`${qZ} 2025`, '2025 年，如果你有個人醫療保險保障的 HDHP，你最多可以存入 $4,300 到 HSA。')()))
    h = harness({ model: mZ })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: qZ, locale: 'zh-tw' })
    const okZ1 = r.status === 200 && r.data.reply.kind === 'clarify' && r.data.reply.locale === 'zh-tw'
    const rz2 = await h.call({ action: 'ask', session: s, question: '2025 年', locale: 'zh-tw', followUp: { previousQuestion: qZ, clarifyingQuestion: r.data.reply.paragraphs[0], round: 1 }, diagnostics: true })
    check(G, '18 Chinese follow-up: 繁中 clarifying question, then a 繁中 answer with the IRS citation', okZ1 && rz2.status === 200 && rz2.data.reply.kind === 'answer' && rz2.data.reply.locale === 'zh-tw' && rz2.data.reply.officialSources.length > 0 && JSON.stringify(mZ.calls[1].sent.input).includes(qZ), `${r.text.slice(0, 200)}\n${rz2.text.slice(0, 400)}`)
    check(G, '18 Chinese guide links use the Chinese titles when they exist', (rz2.data.reply.guideLinks || []).every(g => g.title))

    // Other Lina safety behaviour is unchanged.
    h = harness()
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'My SSN is 123-45-6789, what is my HSA limit?' })
    check(G, 'sensitive data (SSN) is refused by Lina before any model call or reservation', r.status === 422 && h.model.calls.length === 0 && h.led.db.reservations.size === 0)
    const mN = mockModel(() => base({ intent: 'non_tax', decision: 'not_tax' }))
    h = harness({ model: mN })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'What is a good pasta recipe?' })
    check(G, 'not-tax questions get the fixed not-tax reply', r.status === 200 && r.data.reply.kind === 'not_tax')
    const mT = mockModel(() => base({ decision: 'answer', paragraphs: ['ok'] }))
    const h2 = harness({ model: mT })
    const s2 = await h2.session()
    await h2.call({ action: 'ask', session: s2, question: 'q' })
    check(G, 'the model request carries no tools (no web search)', mT.calls.every(c => !c.sent.tools || c.sent.tools.length === 0))
  }

  // ── SQL migration ↔ config consistency and security shape ──
  {
    const G = 'sql'
    const sql = fs.readFileSync(path.join(STAGING, 'supabase/migrations/20261018000000_lina_staging_ledger.sql'), 'utf8')
    const code = sql.split('\n').filter(l => !l.trim().startsWith('--')).join('\n')
    check(G, 'no BEGIN/COMMIT wrapper (the Supabase CLI wraps each migration in its own transaction)', !/^\s*(begin|commit)\s*;/im.test(code))
    check(G, 'prices, overhead, margin and caps in SQL match config.js', code.includes('((p_input_bytes + 1000) * 0.75 + 1600 * 4.50) * 1.25') && code.includes('p_input_tokens * 0.75 + p_output_tokens * 4.50') &&
      CFG0.INPUT_OVERHEAD_TOKENS === 1000 && CFG0.COST_SAFETY_FACTOR === 1.25 && code.includes('p_output_tokens > 1600 or p_input_tokens > r.input_bytes + 1000') &&
      (code.match(/calls >= 20/g) || []).length >= 2 && code.includes('+ w > 0.25') && code.includes('default 5.00') && code.includes('<= 400000') &&
      CFG0.PRICE_IN_PER_M === 0.75 && CFG0.PRICE_OUT_PER_M === 4.5 && CFG0.MAX_OUTPUT_TOKENS === 1600 && CFG0.SESSION_MAX_CALLS === 20 && CFG0.SESSION_MAX_USD === 0.25 && CFG0.TOTAL_MAX_USD === 5 && CFG0.MAX_INPUT_BYTES === 400000)
    const publicFns = [...code.matchAll(/create function public\.(\w+)\(([^)]*)\)[\s\S]*?\$\$;/g)]
    check(G, 'exactly four public API functions', publicFns.length === 4 && publicFns.map(m => m[1]).sort().join() === 'lina_staging_authorize,lina_staging_reserve,lina_staging_settle,lina_staging_start_session')
    check(G, 'every function is SECURITY DEFINER-safe: search_path = \'\'', [...code.matchAll(/create function [\s\S]*?as \$\$/g)].every(m => m[0].includes("set search_path = ''")))
    check(G, 'public functions: execute revoked from public and anon, granted only to authenticated', publicFns.every(m => code.includes(`revoke all on function public.${m[1]}(`) && code.includes(`grant execute on function public.${m[1]}(`)) && !/to anon/.test(code) && !/grant[^;]*public\b(?!\.)/i.test(code.replace(/revoke[^;]*;/g, '')))
    check(G, 'tables are private: own schema, RLS on, all privileges revoked, no policies', ['testers', 'budget', 'sessions', 'reservations'].every(t => code.includes(`create table lina_staging_private.${t}`) && code.includes(`alter table lina_staging_private.${t} enable row level security`)) && code.includes('revoke all on all tables in schema lina_staging_private from public, anon, authenticated') && !/create policy/i.test(code))
    check(G, 'reserve and settle lock the budget row first (FOR UPDATE)', /lina_staging_reserve[\s\S]*?budget where id = true for update[\s\S]*?sessions where id = p_session and user_id = uid for update/.test(code) && /lina_staging_settle[\s\S]*?budget where id = true for update[\s\S]*?reservations where id = p_reservation for update/.test(code))
    check(G, 'every caller check goes through require_tester (uid, aal2, allowlist)', /auth\.uid\(\)/.test(code) && code.includes("auth.jwt() ->> 'aal'") && code.includes("<> 'aal2'") && (code.match(/require_tester\(\)/g) || []).length >= 4)
    check(G, 'settlement is owner-only and one-time', code.includes("r.user_id <> uid then raise exception 'lina_staging:bad_reservation'") && code.includes("r.status <> 'reserved' then raise exception 'lina_staging:already_settled'"))
    check(G, 'one tester only; budget starts disabled', code.includes('create unique index testers_single_tester on lina_staging_private.testers ((true))') && code.includes('disabled boolean not null default true'))
    check(G, 'require_tester: aal2 AND amr includes totp AND exactly one verified factor equal to the approved one', code.includes("e ->> 'method' = 'totp'") && code.includes("from auth.mfa_factors f") && code.includes("f.status::text = 'verified'") && code.includes("if n <> 1 or not match then raise exception 'lina_staging:factor_not_approved'"))
    check(G, 'reserve refuses a verified token expiring within 90 s', code.includes("(auth.jwt() ->> 'exp')::bigint, 0) - extract(epoch from now()) < 90 then") && code.includes("'lina_staging:token_expiring'"))
    check(G, 'settlement: null anomaly flag = anomaly; anomaly charges at least the reservation and disables the budget', code.includes('anomalous := coalesce(p_anomaly, true)') && code.includes('cost := greatest(cost, r.reserved_usd)') && code.includes('disabled = disabled or anomalous'))
    check(G, 'admin procedures exist only in the private schema and are revoked from every API role', /create function lina_staging_private\.admin_approve_tester/.test(code) && /create function lina_staging_private\.admin_charge_stale_reservations/.test(code) &&
      code.indexOf('revoke all on all functions in schema lina_staging_private from public, anon, authenticated') > code.indexOf('admin_charge_stale_reservations(p_older_than interval)') && !/create function public\.\w*admin/.test(code))
    check(G, 'stale recovery charges in full (reserved → spent), never refunds, only after ≥ 15 minutes', code.includes("status = 'expired_charged', charged_usd = r.reserved_usd") && code.includes('spent_usd = spent_usd + r.reserved_usd') && code.includes("p_older_than < interval '15 minutes'"))
    check(G, 'admin approval requires a verified TOTP factor of that user, exactly one verified factor, and never removes another tester implicitly', code.includes("lina_staging:factor_not_verified_totp_of_user") && code.includes('lina_staging:user_must_have_exactly_one_verified_factor') && code.includes('lina_staging:another_tester_exists') && !/delete from lina_staging_private\.testers/.test(code))
    check(G, 'accounting history is never cascade-deleted (sessions/reservations restrict)', (code.match(/on delete restrict/g) || []).length === 2)
    check(G, 'no service-role key or secret is needed anywhere in lina-staging/', !fs.readdirSync(path.join(STAGING, 'lib')).some(f => /service_role|SERVICE_ROLE/.test(fs.readFileSync(path.join(STAGING, 'lib', f), 'utf8'))))
  }

  // ── Netlify entry point (committed config fails closed) ──
  {
    const G = 'entry'
    const env = {}
    globalThis.Netlify = { env: { get: k => env[k] } }
    Object.assign(env, VARS, { SITE_ID })
    const entry = await import(pathToFileURL(path.join(STAGING, 'netlify/functions/lina-staging.mjs')).href)
    let res = await entry.default(new Request(`${ORIGIN}/api/lina-staging`), { site: { id: SITE_ID }, ip: nextIp() })
    check(G, 'the committed config (EXPECTED_SITE_ID empty) → 404 for every request, even with all variables set', res.status === 404)
    res = await entry.default(new Request(`${ORIGIN}/api/lina-staging`, { method: 'POST', headers: { origin: ORIGIN, 'content-type': 'application/json' }, body: '{}' }), { site: { id: SITE_ID } })
    check(G, 'POST through the entry point is also 404', res.status === 404)
    check(G, 'entry config: path /api/lina-staging only, GET/POST, rate limited', entry.config.path === '/api/lina-staging' && entry.config.method.join() === 'GET,POST' && entry.config.rateLimit.windowLimit === 10)
    const src = fs.readFileSync(path.join(STAGING, 'netlify/functions/lina-staging.mjs'), 'utf8')
    check(G, 'a disagreeing context.site.id and SITE_ID yield no site id (fail closed)', src.includes("fromContext !== vars.SITE_ID ? ''"))
    check(G, 'the entry passes the runtime deploy context (context.deploy.context) and nothing else as deploy identity', src.includes('context.deploy && typeof context.deploy.context === \'string\'') && !/process\.env\.CONTEXT|Netlify\.env\.get\('CONTEXT'\)/.test(src))
    delete globalThis.Netlify
  }


  // ── H2. Pricing, model, service tier, strict outbound request ──
  {
    const G = 'cost-safety'
    let h = harness({ cfg: { ...CFG, PRICING: { ...CFG.PRICING, OWNER_CONFIRMED: false } } })
    let s = await h.session()
    let r = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    check(G, 'pricing not confirmed by the owner (the committed config) → 503 pricing_unconfirmed, no reservation, no model call', r.status === 503 && r.data.error === 'pricing_unconfirmed' && h.model.calls.length === 0 && h.led.db.reservations.size === 0 && !('diagnostics' in r.data), r.text)
    check(G, 'the committed config has pricing unconfirmed (no hard-dollar claim until the owner confirms)', pricingConfirmed(CFG0) === false && CFG0.PRICING.OWNER_CONFIRMED === false)
    check(G, 'pricing for a different model or tier does not count as confirmed', !pricingConfirmed({ ...CFG, PRICING: { ...CFG.PRICING, model: 'gpt-5.4' } }) && !pricingConfirmed({ ...CFG, PRICING: { ...CFG.PRICING, serviceTier: 'priority' } }) && !pricingConfirmed({ ...CFG, PRICING: { ...CFG.PRICING, inPerM: 0.5 } }))
    const answered = mockModel(() => base({ decision: 'insufficient' }))
    h = harness({ model: answered })
    s = await h.session()
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, 'the meter sends service_tier "default" and the pinned model, store:false, the 1,600 cap', r.status === 200 && answered.calls[0].sent.service_tier === 'default' && answered.calls[0].sent.model === 'gpt-5.4-mini' && answered.calls[0].sent.store === false && answered.calls[0].sent.max_output_tokens === 1600)
    const anomalyCases = [
      ['wrong response model (gpt-5.4)', { model: 'gpt-5.4' }],
      ['wrong response model (a different mini)', { model: 'gpt-5.4-mini-fast' }],
      ['service tier "priority"', { tier: 'priority' }],
      ['service tier "flex"', { tier: 'flex' }],
      ['service tier missing', { tier: null }],
      ['usage missing', { usage: null }],
      ['output above the 1,600 cap', { usage: { input_tokens: 100, output_tokens: 1700 } }],
    ]
    for (const [name, opt] of anomalyCases) {
      const m = mockModel(() => base({ decision: 'insufficient' }), opt)
      const hh = harness({ model: m })
      const ss = await hh.session()
      const rr = await hh.call({ action: 'ask', session: ss, question: 'q' })
      const res = [...hh.led.db.reservations.values()][0]
      check(G, `${name} → model_anomaly: no reply, charged ≥ the full reservation, whole budget off`, rr.status === 503 && rr.data.error === 'model_anomaly' && !rr.data.reply && res.chargedUsd >= res.reservedUsd && hh.led.db.budget.disabled, rr.text)
    }
    check(G, 'dated snapshots of the approved model are accepted', checkResponse({ model: 'gpt-5.4-mini-2026-03-17', service_tier: 'default', usage: { input_tokens: 10, output_tokens: 10 } }, 100, CFG).anomalies.length === 0 && checkResponse({ model: 'gpt-5.4-mini', service_tier: 'DEFAULT', usage: { input_tokens: 10, output_tokens: 10 } }, 100, CFG).anomalies.length === 0)

    // Strict outbound request (L1): build the exact body the shared runtime sends, then mutate it.
    const ev = coreV2.buildEvidence('What is the 2025 HSA limit?', CURATED)
    const goodBody = { model: 'gpt-5.4-mini', store: false, max_output_tokens: 1600, reasoning: { effort: 'low' }, instructions: coreV2.INSTRUCTIONS_V2,
      input: [{ role: 'developer', content: coreV2.evidenceBlock(ev, 'en', 'unavailable', 0) }, { role: 'user', content: 'What is the 2025 HSA limit?' }],
      text: { format: { type: 'json_schema', name: 'lina_v2_answer', strict: true, schema: coreV2.answerSchema([...ev.keys()]) } } }
    const goodOpts = b => ({ method: 'POST', headers: { Authorization: `Bearer ${STAGING_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(b) })
    check(G, 'the shared runtime\'s exact request passes the strict check', !checkOutbound(CFG.OPENAI_URL, goodOpts(goodBody), CFG, STAGING_KEY).code)
    const bad = [
      ['store: true', { ...goodBody, store: true }], ['store missing', (({ store, ...b }) => b)(goodBody)],
      ['tools present', { ...goodBody, tools: [{ type: 'web_search' }] }], ['tools (non-array) present', { ...goodBody, tools: {} }],
      ['background: true', { ...goodBody, background: true }], ['previous_response_id', { ...goodBody, previous_response_id: 'resp_x' }],
      ['service_tier from the runtime (priority)', { ...goodBody, service_tier: 'priority' }], ['an unknown extra field', { ...goodBody, metadata: { a: 1 } }],
      ['wrong model', { ...goodBody, model: 'gpt-5.4' }], ['larger output limit', { ...goodBody, max_output_tokens: 4000 }],
      ['other reasoning effort', { ...goodBody, reasoning: { effort: 'high' } }], ['extra input message', { ...goodBody, input: [...goodBody.input, { role: 'user', content: 'x' }] }],
      ['non-strict schema', { ...goodBody, text: { format: { ...goodBody.text.format, strict: false } } }],
    ]
    for (const [name, b] of bad) check(G, `strict request check rejects: ${name}`, checkOutbound(CFG.OPENAI_URL, goodOpts(b), CFG, STAGING_KEY).code === 'request_not_allowed')
    check(G, 'strict request check rejects: another endpoint', checkOutbound('https://api.openai.com/v1/chat/completions', goodOpts(goodBody), CFG, STAGING_KEY).code === 'blocked_destination')
    check(G, 'strict request check rejects: the production key', checkOutbound(CFG.OPENAI_URL, { ...goodOpts(goodBody), headers: { Authorization: `Bearer ${PROD_KEY}`, 'Content-Type': 'application/json' } }, CFG, STAGING_KEY).code === 'request_not_allowed')
    check(G, 'strict request check rejects: an extra header', checkOutbound(CFG.OPENAI_URL, { ...goodOpts(goodBody), headers: { Authorization: `Bearer ${STAGING_KEY}`, 'Content-Type': 'application/json', 'OpenAI-Project': 'x' } }, CFG, STAGING_KEY).code === 'request_not_allowed')

    // The meter itself: refusal happens before any reservation; a second call is refused.
    const led = createMemoryLedger({ testers: [TESTER], tokens })
    const sid = led.fns.lina_staging_start_session(T_OK).session
    const pg = mockPostgrest(led, { baseUrl: SUPA })
    const ledger = createSupabaseLedger({ supabaseUrl: SUPA, publishableKey: 'x', fetchImpl: pg.fetchImpl })
    const mm = mockModel(() => base({ decision: 'insufficient' }))
    let meter = createMeter({ ledger, token: T_OK, session: sid, cfg: CFG, stagingKey: STAGING_KEY, openaiFetch: mm.fetchImpl, log: () => {}, clock: Date.now, startedAt: Date.now() })
    let threw = false
    try { await meter.fetch(CFG.OPENAI_URL, goodOpts({ ...goodBody, store: true })) } catch { threw = true }
    check(G, 'a rejected request never reaches the ledger or the model', threw && meter.denied === 'request_not_allowed' && pg.calls.length === 0 && mm.calls.length === 0)
    meter = createMeter({ ledger, token: T_OK, session: sid, cfg: CFG, stagingKey: STAGING_KEY, openaiFetch: mm.fetchImpl, log: () => {}, clock: Date.now, startedAt: Date.now() })
    const first = await meter.fetch(CFG.OPENAI_URL, goodOpts(goodBody))
    threw = false
    try { await meter.fetch(CFG.OPENAI_URL, goodOpts(goodBody)) } catch { threw = true }
    check(G, 'an unexpected second model call in one request is refused before reserving', first.status === 200 && threw && meter.denied === 'request_call_limit' && mm.calls.length === 1 && led.db.reservations.size === 1)
    const ac = new AbortController()
    meter = createMeter({ ledger, token: T_OK, session: sid, cfg: CFG, stagingKey: STAGING_KEY, openaiFetch: mm.fetchImpl, log: () => {}, clock: Date.now, startedAt: Date.now() })
    const resp = await meter.fetch(CFG.OPENAI_URL, { ...goodOpts(goodBody), signal: ac.signal })
    ac.abort()
    let readable = false
    try { readable = !!(await resp.json()).output } catch { readable = false }
    check(G, 'the response body is read once inside the meter: a later abort of the runtime\'s timer cannot break it', readable)
  }

  // ── M1. MFA: only the owner-approved authenticator works ──
  {
    const G = 'mfa'
    const F1 = 'factor-original-0001'
    const F2 = 'factor-attacker-0002'
    const mk = factors => createMemoryLedger({ testers: { [TESTER]: F1 }, factors: { [TESTER]: factors }, tokens })
    let led = mk([{ id: F1, type: 'totp', status: 'verified' }])
    let h = harness({ ledger: led })
    let r = await h.call({ action: 'start' })
    check(G, 'tester with exactly the approved, verified TOTP factor at aal2 → allowed', r.status === 200 && r.data.session)
    r = await h.call({ action: 'start' }, { token: tok(TESTER, 'aal2', { amr: [{ method: 'password' }] }) })
    check(G, 'aal2 claim without a TOTP amr entry → 403 mfa_required', r.status === 403 && r.data.error === 'mfa_required')
    r = await h.call({ action: 'start' }, { token: T_AAL1 })
    check(G, 'password-only (aal1) → 403 mfa_required: cannot start, ask or see budget', r.status === 403 && r.data.error === 'mfa_required')
    // Password-only enrollment abuse: an attacker with the password enrolls and verifies their own authenticator.
    led = mk([{ id: F1, type: 'totp', status: 'verified' }, { id: F2, type: 'totp', status: 'verified' }])
    h = harness({ ledger: led })
    r = await h.call({ action: 'start' })
    check(G, 'abuse: a second verified authenticator (attacker-enrolled) → 403 factor_not_approved, even at aal2', r.status === 403 && r.data.error === 'factor_not_approved')
    led = mk([{ id: F2, type: 'totp', status: 'verified' }])
    h = harness({ ledger: led })
    r = await h.call({ action: 'start' })
    check(G, 'abuse: the attacker also removed the original → their factor is not the approved one → 403', r.status === 403 && r.data.error === 'factor_not_approved')
    led = mk([{ id: F1, type: 'totp', status: 'verified' }, { id: F2, type: 'totp', status: 'unverified' }])
    h = harness({ ledger: led })
    r = await h.call({ action: 'start' })
    check(G, 'an unverified extra enrollment does not change anything (still allowed)', r.status === 200)
    await assertReject(G, 'the tester cannot approve their own new factor: admin approval requires exactly one verified factor', async () => mk([{ id: F1, type: 'totp', status: 'verified' }, { id: F2, type: 'totp', status: 'verified' }]).admin.approveTester(TESTER, F2), 'user_must_have_exactly_one_verified_factor')
    await assertReject(G, 'admin approval refuses an unverified factor', async () => mk([{ id: F2, type: 'totp', status: 'unverified' }]).admin.approveTester(TESTER, F2), 'factor_not_verified_totp_of_user')
    await assertReject(G, 'admin approval refuses another user\'s factor', async () => mk([{ id: F1, type: 'totp', status: 'verified' }]).admin.approveTester(TESTER, 'factor-of-someone-else'), 'factor_not_verified_totp_of_user')
    await assertReject(G, 'admin approval never replaces a different tester implicitly', async () => createMemoryLedger({ testers: { [OTHER]: 'f-other' }, factors: { [TESTER]: [{ id: F1, type: 'totp', status: 'verified' }] }, tokens }).admin.approveTester(TESTER, F1), 'another_tester_exists')
    // Owner-approved replacement: old factor removed by the owner, tester enrolls a new one, owner approves it.
    led = mk([{ id: F2, type: 'totp', status: 'verified' }])
    led.admin.approveTester(TESTER, F2)
    h = harness({ ledger: led })
    r = await h.call({ action: 'start' })
    check(G, 'owner-approved replacement: after admin_approve_tester(new factor) access works again', r.status === 200)
  }

  // ── M2. Expiring tokens and stale-reservation recovery ──
  {
    const G = 'expiry-recovery'
    const h = harness()
    const s = await h.session()
    const before = h.pg.calls.length
    let r = await h.call({ action: 'ask', session: s, question: 'q' }, { token: tok(TESTER, 'aal2', { ttl: 60 }) })
    check(G, 'token expiring in 60 s → 401 token_expiring before any ledger or model call', r.status === 401 && r.data.error === 'token_expiring' && h.pg.calls.length === before && h.model.calls.length === 0, r.text)
    const noExp = makeToken({ sub: TESTER, aal: 'aal2', amr: [{ method: 'totp' }] }); tokens.set(noExp, { sub: TESTER, aal: 'aal2', amr: [{ method: 'totp' }] })
    r = await h.call({ action: 'ask', session: s, question: 'q' }, { token: noExp })
    check(G, 'token without exp → 401 token_expiring', r.status === 401 && r.data.error === 'token_expiring')
    r = await h.call({ action: 'ask', session: s, question: 'q' }, { token: tok(TESTER, 'aal2', { ttl: 600 }) })
    check(G, 'token valid for 10 minutes → allowed', r.status === 200, r.text)
    const led = createMemoryLedger({ testers: [TESTER], tokens })
    const sid = led.fns.lina_staging_start_session(T_OK).session
    await assertReject(G, 'database side: reserve with a verified token expiring in 80 s → token_expiring', () => led.fns.lina_staging_reserve(tok(TESTER, 'aal2', { ttl: 80 }), { p_session: sid, p_input_bytes: 100 }), 'token_expiring')

    let now = Date.now()
    const led2 = createMemoryLedger({ testers: [TESTER], tokens, nowMs: () => now })
    const sid2 = led2.fns.lina_staging_start_session(T_OK).session
    const held = await led2.fns.lina_staging_reserve(T_OK, { p_session: sid2, p_input_bytes: 20000 })
    const totalBefore = led2.db.budget.spentUsd + led2.db.budget.reservedUsd
    now += 20 * 60 * 1000
    await assertReject(G, 'recovery refuses a window under 15 minutes', () => led2.admin.chargeStale(10 * 60 * 1000), 'older_than_must_be_at_least_15_minutes')
    const fresh = await led2.fns.lina_staging_reserve(T_OK, { p_session: sid2, p_input_bytes: 20000 })
    const n = await led2.admin.chargeStale(15 * 60 * 1000)
    const rHeld = led2.db.reservations.get(held.reservation)
    check(G, 'stale reservation (20 min) charged in full: reserved → spent; the recent one untouched', n === 1 && rHeld.status === 'expired_charged' && rHeld.chargedUsd === rHeld.reservedUsd && led2.db.reservations.get(fresh.reservation).status === 'reserved')
    check(G, 'recovery never refunds: spent + reserved is unchanged by recovery', Math.abs((led2.db.budget.spentUsd + led2.db.budget.reservedUsd) - (totalBefore + held.reserved_usd * 0 + fresh.reserved_usd)) < 1e-9 && led2.db.budget.spentUsd >= held.reserved_usd)
    check(G, 'running recovery again charges nothing twice', (await led2.admin.chargeStale(15 * 60 * 1000)) === 0)
    await assertReject(G, 'a recovered reservation cannot be settled afterwards', () => led2.fns.lina_staging_settle(T_OK, { p_reservation: held.reservation, p_usage_known: true, p_input_tokens: 0, p_output_tokens: 0, p_anomaly: false }), 'already_settled')
  }

  // ── M3. Timeouts ───────────────────────────────────────────
  {
    const G = 'timeouts'
    const fast = { ...CFG, LEDGER_TIMEOUT_MS: 150 }
    let h = harness({ cfg: fast })
    let s = await h.session()
    const led = h.led
    h = harness({ cfg: fast, ledger: led, pgFail: { fn: 'lina_staging_settle', mode: 'hang' } })
    let t0 = Date.now()
    let r = await h.call({ action: 'ask', session: s, question: 'q', diagnostics: true })
    const sess = led.db.sessions.get(s)
    check(G, 'settlement hangs → gives up after the ledger timeout; reply returned; reservation stays counted', r.status === 200 && Date.now() - t0 < 3000 && r.data.diagnostics.settleError === 'ledger_unavailable' && sess.reservedUsd > 0, `${Date.now() - t0}ms ${r.text.slice(0, 200)}`)
    h = harness({ cfg: fast, ledger: led, pgFail: { fn: 'lina_staging_reserve', mode: 'hang' } })
    t0 = Date.now()
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, 'reservation hangs → 503 ledger_unavailable within the timeout, model NOT called', r.status === 503 && r.data.error === 'ledger_unavailable' && h.model.calls.length === 0 && Date.now() - t0 < 3000)
    h = harness({ cfg: fast, ledger: led, pgFail: { fn: 'lina_staging_authorize', mode: 'hang' } })
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, 'authorization hangs → 503, model NOT called', r.status === 503 && h.model.calls.length === 0)
    let t = Date.now()
    const slow = () => (t += 5000) // every clock read advances 5 s: the reservation would start > 8 s after the request
    h = harness({ clock: slow })
    s = await h.session()
    const reservesBefore = h.led.db.reservations.size
    r = await h.call({ action: 'ask', session: s, question: 'q' })
    check(G, 'more than 8 s already spent before the reservation → 503 time_budget, no reservation, no model call', r.status === 503 && r.data.error === 'time_budget' && h.led.db.reservations.size === reservesBefore && h.model.calls.length === 0, r.text)
    check(G, 'configured timeline: ledger 3 s each, reserve must start by 8 s, model 20 s (shared runtime) → ≈ 34 s worst case', CFG0.LEDGER_TIMEOUT_MS === 3000 && CFG0.MAX_MS_BEFORE_RESERVE === 8000 && CFG0.MIN_TOKEN_TTL_S === 120)
  }

  // ── Production isolation (static checks; build and bundle checks run separately) ──
  {
    const G = 'isolation'
    const rootToml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8')
    check(G, 'root netlify.toml never mentions the staging site and keeps the default functions folder', !/lina-staging|LINA_STAGING/.test(rootToml) && !/^\s*directory\s*=/m.test(rootToml))
    const prodFns = fs.readdirSync(path.join(ROOT, 'netlify/functions'))
    check(G, 'production functions folder contains only lina', prodFns.join() === 'lina')
    const shared = ['core.js', 'core-v2.js', 'official.js', 'verify.js', 'retrieval.js', 'index.mjs', 'mode.js'].map(f => fs.readFileSync(path.join(ROOT, 'netlify/functions/lina', f), 'utf8')).join('\n')
    check(G, 'no shared Lina file references the staging site', !/lina-staging|LINA_STAGING/.test(shared))
    const pages = []
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => (e.isDirectory() ? walk(path.join(d, e.name)) : pages.push(path.join(d, e.name))))
    ;['pages', 'components', 'lib'].forEach(d => walk(path.join(ROOT, d)))
    check(G, 'no production page, component or library file references the staging site', !pages.some(f => /lina-staging|LINA_STAGING/.test(fs.readFileSync(f, 'utf8'))))
    check(G, 'staging netlify.toml publishes only lina-staging/public and uses only its own functions folder', /publish\s*=\s*"lina-staging\/public"/.test(fs.readFileSync(path.join(STAGING, 'netlify.toml'), 'utf8')) && /directory\s*=\s*"lina-staging\/netlify\/functions"/.test(fs.readFileSync(path.join(STAGING, 'netlify.toml'), 'utf8')))
  }

  // ── Privacy and secret hygiene across every response ──
  {
    const G = 'privacy'
    const joined = allBodies.join('\n')
    check(G, 'no response body ever contains the staging key, the production key name\'s value, or a reservation id', !joined.includes(STAGING_KEY) && !joined.includes(PROD_KEY) && !/"reservation"/.test(joined))
    check(G, 'no response contains the system prompt', !joined.includes(coreV2.INSTRUCTIONS_V2.slice(0, 60)))
    const h = harness()
    const s = await h.session()
    await h.call({ action: 'ask', session: s, question: 'My unique synthetic question QX-7731 about HSA limits' })
    check(G, 'logs carry codes and usage numbers only — never the question text', h.logs.length > 0 && !h.logs.some(l => l.includes('QX-7731')), JSON.stringify(h.logs))
    const led = h.led.db
    check(G, 'the ledger stores no question or answer text', !JSON.stringify([...led.sessions.values(), ...led.reservations.values()]).includes('QX-7731'))
    check(G, 'no real network request was attempted', networkAttempts.length === 0, networkAttempts.join(', '))
  }

  console.log(`\nBY GROUP: ${Object.entries(groups).map(([g, v]) => `${g} ${v.pass}/${v.total}`).join(' · ')}`)
  console.log(`\n${pass} passed, ${fail} failed`)
  globalThis.fetch = realFetch
  process.exit(fail ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })

async function assertReject(G, name, fn, code) {
  try { await fn(); check(G, name, false, 'did not reject') } catch (e) { check(G, name, e.code === code, `${e.code || e.message}`) }
}

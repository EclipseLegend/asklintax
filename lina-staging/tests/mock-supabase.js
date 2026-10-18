/**
 * OFFLINE TEST DOUBLE of the staging Supabase project (never used at runtime).
 *
 * createMemoryLedger mirrors supabase/migrations/20261018000000_lina_staging_ledger.sql rule for rule:
 * caller checks (valid token → uid, aal2, amr totp, allowlist, exactly one verified authenticator = the approved
 * one), the disabled flag, token expiry at reservation, per-session and total caps, worst-case reservations with
 * overhead and margin, one-time owner-only settlement with anomaly handling, and the owner's admin procedures.
 * A single async lock stands in for the budget row lock (SELECT … FOR UPDATE); `noLock: true` removes it so
 * tests can show the race the lock prevents.
 *
 * mockPostgrest wraps it as PostgREST would: POST /rest/v1/rpc/<fn> → 200 JSON, or 400
 * { message: 'lina_staging:<code>' } for a raised exception, or 401 for a token PostgREST cannot verify.
 *
 * It is a model of the SQL, not the SQL: real PostgreSQL verification is still pending.
 */
const crypto = require('crypto')
const CFG = require('../config')

const b64u = o => Buffer.from(JSON.stringify(o)).toString('base64url')
// A JWT-shaped test token. The "signature" is random; validity is decided by the mock's token table.
const makeToken = claims => `${b64u({ alg: 'HS256', typ: 'JWT' })}.${b64u(claims)}.${crypto.randomBytes(16).toString('base64url')}`

const micro = x => Math.round(x * 1e6) / 1e6
const worstUsd = bytes => Math.ceil(((bytes + CFG.INPUT_OVERHEAD_TOKENS) * CFG.PRICE_IN_PER_M + CFG.MAX_OUTPUT_TOKENS * CFG.PRICE_OUT_PER_M) * CFG.COST_SAFETY_FACTOR) / 1e6
const costUsd = (inT, outT) => Math.ceil(inT * CFG.PRICE_IN_PER_M + outT * CFG.PRICE_OUT_PER_M) / 1e6

class Raise extends Error { constructor(code) { super(`lina_staging:${code}`); this.code = code } }

/**
 * @param testers  { userId: approvedFactorId }   (an array of user ids means factor `factor-<uid>`)
 * @param factors  { userId: [{ id, type, status }] }  auth.mfa_factors; defaults to the approved factor, verified
 * @param tokens   Map token → claims { sub, aal, amr, exp }
 */
function createMemoryLedger({ testers = {}, factors = null, tokens = new Map(), totalMaxUsd = CFG.TOTAL_MAX_USD, disabled = false, spentUsd = 0, noLock = false, nowMs = () => Date.now() } = {}) {
  const testerMap = new Map(Array.isArray(testers) ? testers.map(u => [u, `factor-${u}`]) : Object.entries(testers))
  const factorMap = new Map(factors ? Object.entries(factors) : [...testerMap].map(([u, f]) => [u, [{ id: f, type: 'totp', status: 'verified' }]]))
  const db = {
    budget: { totalMaxUsd, spentUsd, reservedUsd: 0, disabled, disabledReason: disabled ? 'manual' : '' },
    sessions: new Map(), reservations: new Map(), testers: testerMap, factors: factorMap, tokens,
  }
  let chain = Promise.resolve()
  const tick = () => new Promise(r => setImmediate(r)) // a yield inside the critical section exposes races
  function locked(fn) {
    if (noLock) return (async () => { await tick(); return fn() })()
    const run = chain.then(async () => { await tick(); return fn() })
    chain = run.catch(() => {})
    return run
  }
  const claimsOf = token => db.tokens.get(token) || null
  function requireTester(token) {
    const c = claimsOf(token)
    if (!c) throw new Raise('unauthenticated')
    if (c.aal !== 'aal2') throw new Raise('mfa_required')
    if (!(c.amr || []).some(a => a && a.method === 'totp')) throw new Raise('mfa_required')
    if (!db.testers.has(c.sub)) throw new Raise('not_tester')
    const approved = db.testers.get(c.sub)
    const verified = (db.factors.get(c.sub) || []).filter(f => f.status === 'verified')
    if (verified.length !== 1 || verified[0].id !== approved || verified[0].type !== 'totp') throw new Raise('factor_not_approved')
    return c.sub
  }
  const budgetJson = s => ({
    session_calls: s.calls, session_max_calls: CFG.SESSION_MAX_CALLS, session_spent_usd: s.spentUsd, session_reserved_usd: s.reservedUsd,
    session_max_usd: CFG.SESSION_MAX_USD, total_spent_usd: db.budget.spentUsd, total_reserved_usd: db.budget.reservedUsd, total_max_usd: db.budget.totalMaxUsd,
  })

  const fns = {
    lina_staging_start_session(token) {
      const uid = requireTester(token)
      if (db.budget.disabled) throw new Raise('disabled')
      const s = { id: crypto.randomUUID(), userId: uid, calls: 0, spentUsd: 0, reservedUsd: 0 }
      db.sessions.set(s.id, s)
      return { session: s.id, budget: budgetJson(s) }
    },
    lina_staging_authorize(token, { p_session }) {
      const uid = requireTester(token)
      if (db.budget.disabled) throw new Raise('disabled')
      const s = db.sessions.get(p_session)
      if (!s || s.userId !== uid) throw new Raise('bad_session')
      if (s.calls >= CFG.SESSION_MAX_CALLS) throw new Raise('session_calls')
      return { budget: budgetJson(s) }
    },
    async lina_staging_reserve(token, { p_session, p_input_bytes }) {
      const uid = requireTester(token)
      const c = claimsOf(token)
      if ((c.exp || 0) - nowMs() / 1000 < 90) throw new Raise('token_expiring')
      if (!Number.isInteger(p_input_bytes) || p_input_bytes < 1 || p_input_bytes > CFG.MAX_INPUT_BYTES) throw new Raise('bad_request')
      const w = worstUsd(p_input_bytes)
      return locked(async () => {
        const b = db.budget
        if (b.disabled) throw new Raise('disabled')
        const s = db.sessions.get(p_session)
        if (!s || s.userId !== uid) throw new Raise('bad_session')
        if (s.calls >= CFG.SESSION_MAX_CALLS) throw new Raise('session_calls')
        if (micro(s.spentUsd + s.reservedUsd + w) > CFG.SESSION_MAX_USD) throw new Raise('session_cost')
        if (micro(b.spentUsd + b.reservedUsd + w) > b.totalMaxUsd) throw new Raise('total_cost')
        await tick() // between check and write: without the lock, concurrent reservations interleave here
        s.calls += 1; s.reservedUsd = micro(s.reservedUsd + w)
        b.reservedUsd = micro(b.reservedUsd + w)
        const r = { id: crypto.randomUUID(), sessionId: s.id, userId: uid, inputBytes: p_input_bytes, reservedUsd: w, status: 'reserved', createdAt: nowMs() }
        db.reservations.set(r.id, r)
        return { reservation: r.id, reserved_usd: w, budget: budgetJson(s) }
      })
    },
    async lina_staging_settle(token, { p_reservation, p_usage_known, p_input_tokens, p_output_tokens, p_anomaly }) {
      const c = claimsOf(token)
      if (!c) throw new Raise('unauthenticated')
      return locked(async () => {
        const r = db.reservations.get(p_reservation)
        if (!r || r.userId !== c.sub) throw new Raise('bad_reservation')
        if (r.status !== 'reserved') throw new Raise('already_settled')
        await tick()
        let anomalous = p_anomaly === undefined || p_anomaly === null ? true : !!p_anomaly
        let cost
        if (p_usage_known) {
          if (!Number.isInteger(p_input_tokens) || !Number.isInteger(p_output_tokens) || p_input_tokens < 0 || p_output_tokens < 0) throw new Raise('bad_request')
          if (p_output_tokens > CFG.MAX_OUTPUT_TOKENS || p_input_tokens > r.inputBytes + CFG.INPUT_OVERHEAD_TOKENS) anomalous = true
          cost = costUsd(p_input_tokens, p_output_tokens)
        } else cost = r.reservedUsd
        if (anomalous || cost > r.reservedUsd) { anomalous = true; cost = Math.max(cost, r.reservedUsd) }
        r.status = 'settled'; r.chargedUsd = cost; r.anomaly = anomalous
        const s = db.sessions.get(r.sessionId)
        s.reservedUsd = micro(s.reservedUsd - r.reservedUsd); s.spentUsd = micro(s.spentUsd + cost)
        const b = db.budget
        const reached = micro(b.spentUsd + cost) >= b.totalMaxUsd
        if (!b.disabled && (anomalous || reached)) { b.disabled = true; b.disabledReason = anomalous ? 'model, service tier or usage anomaly' : 'total budget reached' }
        b.reservedUsd = micro(b.reservedUsd - r.reservedUsd); b.spentUsd = micro(b.spentUsd + cost)
        return { charged_usd: cost, budget: budgetJson(s) }
      })
    },
  }

  // Owner-only procedures (SQL editor). Not reachable through mockPostgrest, as in the real project.
  const admin = {
    approveTester(user, factor) {
      const fs = db.factors.get(user) || []
      if (!fs.some(f => f.id === factor && f.status === 'verified' && f.type === 'totp')) throw new Raise('factor_not_verified_totp_of_user')
      if (fs.filter(f => f.status === 'verified').length !== 1) throw new Raise('user_must_have_exactly_one_verified_factor')
      if ([...db.testers.keys()].some(u => u !== user)) throw new Raise('another_tester_exists')
      db.testers.set(user, factor)
    },
    async chargeStale(olderThanMs) {
      if (!(olderThanMs >= 15 * 60 * 1000)) throw new Raise('older_than_must_be_at_least_15_minutes')
      return locked(async () => {
        let n = 0
        for (const r of db.reservations.values()) {
          if (r.status !== 'reserved' || r.createdAt >= nowMs() - olderThanMs) continue
          r.status = 'expired_charged'; r.chargedUsd = r.reservedUsd
          const s = db.sessions.get(r.sessionId)
          s.reservedUsd = micro(s.reservedUsd - r.reservedUsd); s.spentUsd = micro(s.spentUsd + r.reservedUsd)
          db.budget.reservedUsd = micro(db.budget.reservedUsd - r.reservedUsd); db.budget.spentUsd = micro(db.budget.spentUsd + r.reservedUsd)
          n++
        }
        return n
      })
    },
  }
  return { db, fns, admin }
}

// PostgREST-shaped fetch over a memory ledger. `fail` injects infrastructure failures (incl. a hang).
function mockPostgrest(ledger, { baseUrl = 'https://staging-test.supabase.co', fail = null } = {}) {
  const calls = []
  const fetchImpl = async (url, opts) => {
    const name = String(url).replace(`${baseUrl}/rest/v1/rpc/`, '')
    calls.push(name)
    if (fail && (fail.fn === '*' || fail.fn === name)) {
      if (fail.mode === 'network') throw new TypeError('fetch failed')
      if (fail.mode === 'http500') return new Response('{"message":"internal"}', { status: 500 })
      if (fail.mode === 'badjson') return new Response('<html>', { status: 200 })
      if (fail.mode === 'hang') {
        return new Promise((_, reject) => {
          const t = setTimeout(() => reject(new Error('hang test: timeout not enforced')), 15000)
          opts.signal && opts.signal.addEventListener('abort', () => { clearTimeout(t); reject(Object.assign(new Error('aborted'), { name: 'AbortError' })) })
        })
      }
    }
    const token = String((opts.headers && opts.headers.Authorization) || '').replace(/^Bearer /, '')
    if (!ledger.db.tokens.has(token)) return new Response(JSON.stringify({ code: 'PGRST301', message: 'JWT invalid' }), { status: 401 })
    const fn = ledger.fns[name]
    if (!fn) return new Response(JSON.stringify({ code: 'PGRST202', message: 'not found' }), { status: 404 })
    try {
      const data = await fn(token, JSON.parse(opts.body || '{}'))
      return new Response(JSON.stringify(data), { status: 200 })
    } catch (e) {
      if (e instanceof Raise) return new Response(JSON.stringify({ code: 'P0001', message: e.message }), { status: 400 })
      throw e
    }
  }
  return { fetchImpl, calls }
}

module.exports = { createMemoryLedger, mockPostgrest, makeToken, worstUsd, costUsd }

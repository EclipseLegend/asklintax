/**
 * Budget ledger client: calls the staging Supabase project's database functions (PostgREST RPC) WITH THE
 * TESTER'S OWN ACCESS TOKEN. No service-role key exists anywhere in the staging site.
 *
 * The database is the authority for everything below (see supabase/migrations/*.sql):
 *   signed-in user (valid JWT) · MFA level aal2 from TOTP · tester allowlist · the tester's ONE approved,
 *   verified authenticator · emergency disabled flag · token not about to expire (at reservation) ·
 *   20 calls / $0.25 per session · $5 in total · atomic reservations · one-time settlement by the same tester.
 *
 * Every function returns { ok: true, ... } or { ok: false, code }. Anything unexpected (network error,
 * timeout, non-JSON, unknown error) is { ok: false, code: 'ledger_unavailable' } — callers fail closed.
 */
const KNOWN = new Set(['unauthenticated', 'mfa_required', 'not_tester', 'factor_not_approved', 'token_expiring', 'disabled',
  'bad_session', 'session_closed', 'session_calls', 'session_cost', 'total_cost', 'bad_request', 'bad_reservation', 'already_settled'])
const TIMEOUT_MS = 3000 // short on purpose: a slow ledger refuses the request instead of eating the model's time

const num = v => (typeof v === 'number' ? v : Number(v))
function budgetOf(b) {
  if (!b || typeof b !== 'object') return null
  return {
    sessionCalls: num(b.session_calls), sessionMaxCalls: num(b.session_max_calls),
    sessionSpentUsd: num(b.session_spent_usd), sessionReservedUsd: num(b.session_reserved_usd), sessionMaxUsd: num(b.session_max_usd),
    totalSpentUsd: num(b.total_spent_usd), totalReservedUsd: num(b.total_reserved_usd), totalMaxUsd: num(b.total_max_usd),
  }
}

function createSupabaseLedger({ supabaseUrl, publishableKey, fetchImpl = fetch, timeoutMs = TIMEOUT_MS }) {
  async function rpc(name, token, args) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let res
    try {
      res = await fetchImpl(`${supabaseUrl}/rest/v1/rpc/${name}`, {
        method: 'POST',
        headers: { apikey: publishableKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(args),
        signal: controller.signal,
      })
    } catch {
      return { ok: false, code: 'ledger_unavailable' }
    } finally {
      clearTimeout(timer)
    }
    let data = null
    try { data = await res.json() } catch { data = null }
    if (res.ok) return data && typeof data === 'object' ? { ok: true, data } : { ok: false, code: 'ledger_unavailable' }
    // Our database functions raise 'lina_staging:<code>'; PostgREST rejects a bad/expired JWT with 401.
    const m = data && typeof data.message === 'string' ? /^lina_staging:([a-z_]+)$/.exec(data.message) : null
    if (m && KNOWN.has(m[1])) return { ok: false, code: m[1] }
    if (res.status === 401) return { ok: false, code: 'unauthenticated' }
    return { ok: false, code: 'ledger_unavailable' }
  }

  return {
    async startSession(token) {
      const r = await rpc('lina_staging_start_session', token, {})
      if (!r.ok) return r
      return typeof r.data.session === 'string' ? { ok: true, session: r.data.session, budget: budgetOf(r.data.budget) } : { ok: false, code: 'ledger_unavailable' }
    },
    async authorize(token, session) {
      const r = await rpc('lina_staging_authorize', token, { p_session: session })
      return r.ok ? { ok: true, budget: budgetOf(r.data.budget) } : r
    },
    async reserve(token, session, inputBytes) {
      const r = await rpc('lina_staging_reserve', token, { p_session: session, p_input_bytes: inputBytes })
      if (!r.ok) return r
      return typeof r.data.reservation === 'string'
        ? { ok: true, reservation: r.data.reservation, reservedUsd: num(r.data.reserved_usd), budget: budgetOf(r.data.budget) }
        : { ok: false, code: 'ledger_unavailable' }
    },
    // usage = { inputTokens, outputTokens } from the model response, or null when unknown (then the full
    // reservation is charged). anomaly = the response's model, service tier or usage was not what was approved:
    // the database charges at least the full reservation and switches the whole budget off.
    async settle(token, reservation, usage, { anomaly = false } = {}) {
      const r = await rpc('lina_staging_settle', token, {
        p_reservation: reservation,
        p_usage_known: !!usage,
        p_input_tokens: usage ? usage.inputTokens : 0,
        p_output_tokens: usage ? usage.outputTokens : 0,
        p_anomaly: !!anomaly,
      })
      return r.ok ? { ok: true, chargedUsd: num(r.data.charged_usd), budget: budgetOf(r.data.budget) } : r
    },
  }
}

module.exports = { createSupabaseLedger, budgetOf, KNOWN }

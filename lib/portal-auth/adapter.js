/**
 * AskLinTax Client Portal — Phase 2B-4 browser auth adapter (official @supabase/supabase-js).
 *
 * Every portal page talks to authentication only through this interface. Token storage, refresh,
 * auth-link processing and MFA are done by the official library — never re-implemented here.
 *
 * BOUNDARY: this adapter establishes a browser session (who signed in, at which AAL). It is NOT an
 * authorization authority. Client / staff identity, organization, assignment and every data
 * decision belong to the database (auth.uid(), AAL2 checks, RLS, client_get_* / command functions).
 * Nothing here reads user_metadata / app_metadata for any decision.
 *
 * Interface (all async unless noted):
 *   getSnapshot()                        → { available, session: null | { aal, nextAal, factors, email } }
 *   signInWithPassword(email, password)  → { error }
 *   signOut()                            → { error }   (scope 'local': this browser's session only)
 *   requestPasswordReset(email, redirectTo) → { error }
 *   updatePassword(password)             → { error }   (only inside a recovery / invite context)
 *   exchangeCallback(location)           → { params: { type: 'recovery' | 'invite' }, error }
 *   passwordContext()                    → 'recovery' | 'invite' | null (set by the callback, this tab only)
 *   completePasswordSetup()              → { error }   (ends the context and signs out locally)
 *   enrollTotp()                         → { factorId, qrSvg, secret, error }
 *   verifyTotp(factorId, code)           → { error }   (challenge + verify → session upgraded to aal2)
 *   onChange(callback)  (sync)           → unsubscribe()
 *
 * Browser-visible configuration (public values only):
 *   NEXT_PUBLIC_SUPABASE_URL              — https project URL
 *   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  — must be a publishable key (sb_publishable_…)
 * Anything else (missing values, a secret key, a legacy JWT key, a non-https URL) → fail closed.
 *
 * EMAIL LINKS. The library never processes URLs by itself (detectSessionInUrl: false). The callback
 * page passes the URL to exchangeCallback(), which accepts exactly one of two shapes:
 *   PASSWORD RECOVERY → PKCE:      ?code=<uuid>  → official exchangeCodeForSession(code), using the code
 *                                  verifier stored in this browser when the user requested the reset.
 *   ADMIN INVITE      → TokenHash: ?token_hash=<hash>&type=invite → official
 *                                  verifyOtp({ token_hash, type: 'invite' }). (Supabase admin / dashboard
 *                                  invites do not support PKCE; this is NOT a PKCE flow.)
 * Implicit-flow links (access / refresh tokens in the URL) and every other shape are refused.
 */
const { createClient } = require('@supabase/supabase-js')
const { ROUTES, validateCallbackUrl } = require('./flow')

const NOT_CONFIGURED = Object.freeze({ error: 'not_configured' })
const STORAGE_KEY = 'asklintax-portal-auth'
const CONTEXT_MARKER = 'asklintax-portal-password-context'
const CONTEXT_KINDS = ['recovery', 'invite']

/** Official client options for the portal (exported for tests). */
function clientOptions() {
  return {
    flowType: 'pkce',            // email links carry a one-time code, never access / refresh tokens
    detectSessionInUrl: false,   // only the callback page exchanges a code, explicitly
    persistSession: true,        // browser-only session (no server in 2B-4)
    autoRefreshToken: true,
    storageKey: STORAGE_KEY,
  }
}

/** Per-tab marker of the password-setting context the callback just created (sessionStorage). */
function browserMarkerStore() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const ss = window.sessionStorage
      return { get: () => ss.getItem(CONTEXT_MARKER), set: v => ss.setItem(CONTEXT_MARKER, v), clear: () => ss.removeItem(CONTEXT_MARKER) }
    }
  } catch (e) { /* storage blocked → in-memory */ }
  let v = null
  return { get: () => v, set: x => { v = x }, clear: () => { v = null } }
}

/** Validate the public browser configuration. Returns { url, key } or null (fail closed). */
function validatePublicConfig(url, key) {
  if (typeof url !== 'string' || typeof key !== 'string') return null
  let u
  try { u = new URL(url) } catch (e) { return null }
  if (u.protocol !== 'https:' || u.username || u.password || u.search || u.hash) return null
  // Only the publishable-key model is accepted. Secret keys and legacy JWT keys are refused.
  if (!/^sb_publishable_[A-Za-z0-9_\-]{8,}$/.test(key)) return null
  return { url: u.origin, key }
}

function publicConfig() {
  // Literal references so Next.js can inline the public values at build time.
  const cfg = validatePublicConfig(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  return { configured: Boolean(cfg), url: cfg ? cfg.url : '' }
}

function createUnavailableAdapter() {
  return Object.freeze({
    kind: 'unavailable',
    getSnapshot: async () => ({ available: false, session: null }),
    signInWithPassword: async () => NOT_CONFIGURED,
    signOut: async () => ({ error: null }),
    requestPasswordReset: async () => NOT_CONFIGURED,
    updatePassword: async () => NOT_CONFIGURED,
    exchangeCallback: async () => ({ params: null, error: 'not_configured' }),
    passwordContext: () => null,
    completePasswordSetup: async () => ({ error: null }),
    enrollTotp: async () => NOT_CONFIGURED,
    verifyTotp: async () => NOT_CONFIGURED,
    onChange: () => () => {},
  })
}

/** Library errors → { status, code, name } only (no free-text messages reach the UI). */
function slimError(error) {
  if (!error) return null
  return { status: error.status || 0, code: error.code || '', name: error.name || '' }
}

/** Adapter around a supabase-js client (created with clientOptions()). */
function createSupabaseAdapter(client, markers = browserMarkerStore()) {
  const auth = client.auth
  const context = () => { const v = markers.get(); return CONTEXT_KINDS.includes(v) ? v : null }

  async function getSnapshot() {
    const { data, error } = await auth.getSession()
    const session = data && data.session
    if (error || !session) return { available: true, session: null }
    // Assurance level from the official helper; any failure is treated as aal1 (fail closed).
    let aal = 'aal1', nextAal = 'aal1', factors = []
    try {
      const r = await auth.mfa.getAuthenticatorAssuranceLevel()
      if (!r.error && r.data) {
        aal = r.data.currentLevel === 'aal2' ? 'aal2' : 'aal1'
        nextAal = r.data.nextLevel === 'aal2' ? 'aal2' : 'aal1'
      }
      const f = await auth.mfa.listFactors()
      if (!f.error && f.data && Array.isArray(f.data.all)) {
        factors = f.data.all.map(x => ({ id: x.id, factorType: x.factor_type, status: x.status }))
      }
    } catch (e) {
      aal = 'aal1'; nextAal = 'aal1'; factors = []
    }
    return { available: true, session: { aal, nextAal, factors, email: (session.user && session.user.email) || null } }
  }

  return Object.freeze({
    kind: 'supabase',
    getSnapshot,
    async signInWithPassword(email, password) {
      const { error } = await auth.signInWithPassword({ email, password })
      return { error: slimError(error) }
    },
    async signOut() {
      const { error } = await auth.signOut({ scope: 'local' })
      return { error: slimError(error) }
    },
    async requestPasswordReset(email, redirectTo) {
      // redirectTo is always the fixed portal callback; the remote allow-list must contain it.
      const { error } = await auth.resetPasswordForEmail(email, { redirectTo })
      return { error: slimError(error) }
    },
    async updatePassword(password) {
      // Only inside a recovery / invite context created by the callback — never on an ordinary session.
      if (!context()) return { error: { status: 0, code: 'not_in_password_context', name: '' } }
      const { error } = await auth.updateUser({ password })
      return { error: slimError(error) }
    },
    async exchangeCallback(location) {
      markers.clear()
      const v = validateCallbackUrl(location)
      if (!v.ok) return { params: null, error: v.reason } // nothing sent anywhere

      if (v.kind === 'invite') {
        // ADMIN INVITE → TokenHash verification by the official library (single use, server-checked).
        let r
        try { r = await auth.verifyOtp({ token_hash: v.tokenHash, type: 'invite' }) } catch (e) { r = { data: null, error: e } }
        if (r.error || !r.data || !r.data.session) {
          if (r.data && r.data.session) await auth.signOut({ scope: 'local' })
          return { params: null, error: 'invite_failed' } // generic: never reveals why
        }
        markers.set('invite')
        return { params: { type: 'invite' }, error: null }
      }

      // PASSWORD RECOVERY → PKCE code exchange.
      let result
      try { result = await auth.exchangeCodeForSession(v.code) } catch (e) { result = { data: null, error: e } }
      const { data, error } = result || {}
      if (error) {
        const missingVerifier = /CodeVerifierMissing/i.test(String(error.name || '')) || /code verifier/i.test(String(error.message || ''))
        return { params: null, error: missingVerifier ? 'missing_verifier' : 'exchange_failed' }
      }
      if (!data || !data.session) return { params: null, error: 'exchange_failed' }
      if (data.redirectType !== 'recovery') {
        // A PKCE code that is not password recovery (e.g. a magic link) is not accepted: drop the session.
        await auth.signOut({ scope: 'local' })
        return { params: null, error: 'unexpected_link' }
      }
      markers.set('recovery')
      return { params: { type: 'recovery' }, error: null }
    },
    passwordContext() { return context() },
    async completePasswordSetup() {
      markers.clear()
      const { error } = await auth.signOut({ scope: 'local' })
      return { error: slimError(error) }
    },
    async enrollTotp() {
      // Remove abandoned, never-verified TOTP factors first (allowed at aal1), then enroll a fresh one.
      const list = await auth.mfa.listFactors()
      if (!list.error && list.data && Array.isArray(list.data.all)) {
        for (const f of list.data.all) {
          if (f.factor_type === 'totp' && f.status === 'unverified') await auth.mfa.unenroll({ factorId: f.id })
        }
      }
      const { data, error } = await auth.mfa.enroll({ factorType: 'totp', friendlyName: 'AskLinTax staff authenticator' })
      if (error || !data || !data.totp) return { error: slimError(error) || { status: 0, code: 'enroll_failed', name: '' } }
      return { factorId: data.id, qrSvg: data.totp.qr_code, secret: data.totp.secret, error: null }
    },
    async verifyTotp(factorId, code) {
      if (!factorId) return { error: { status: 0, code: 'mfa_no_factor', name: '' } }
      const { error } = await auth.mfa.challengeAndVerify({ factorId, code })
      return { error: slimError(error) }
    },
    onChange(callbackFn) {
      // Never call the library inside its own listener (documented deadlock risk) — defer.
      const { data } = auth.onAuthStateChange(() => { setTimeout(callbackFn, 0) })
      return () => data.subscription.unsubscribe()
    },
  })
}

let instance = null
/**
 * One adapter per page load. Server-side (static export pre-render) and missing / unsafe public
 * configuration → the fail-closed unavailable adapter.
 */
function createPortalAuth() {
  if (instance) return instance
  if (typeof window === 'undefined') return createUnavailableAdapter()
  const cfg = validatePublicConfig(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  if (!cfg) { instance = createUnavailableAdapter(); return instance }
  const client = createClient(cfg.url, cfg.key, { auth: clientOptions() })
  instance = createSupabaseAdapter(client)
  return instance
}

module.exports = {
  createPortalAuth, createSupabaseAdapter, createUnavailableAdapter, clientOptions,
  validatePublicConfig, publicConfig, STORAGE_KEY, CONTEXT_MARKER,
}

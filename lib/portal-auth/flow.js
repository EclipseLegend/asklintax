/**
 * AskLinTax Client Portal — Phase 2B-4 browser auth flow (pure logic, no network).
 *
 * This module decides WHICH SCREEN to show from a browser session snapshot. It is UI routing
 * and defense in depth only. It never decides data access: the database (auth.uid(), AAL2 checks,
 * RLS and the client_get_* / command functions) remains the only authorization authority.
 *
 * Snapshot shape (produced by the auth adapter, see adapter.js):
 *   { available: boolean,                     // false until the Supabase client is configured
 *     session: null | {
 *       aal: 'aal1' | 'aal2',                 // current authenticator assurance level
 *       nextAal: 'aal1' | 'aal2',             // level reachable with enrolled factors
 *       factors: [{ id, factorType, status }] // MFA factors ('totp', 'verified' | 'unverified')
 *     } }
 *
 * Staff vs client: the browser cannot (and must not) decide whether an account is staff — that is
 * staff_profiles in the database, reached only through a future server review. The STAFF AREA is
 * therefore a separate entry point that always requires AAL2; a non-staff account that completes MFA
 * there still receives nothing from the database.
 */

const ROUTES = Object.freeze({
  clientLogin: '/portal/login/',
  clientHome: '/portal/',
  staffLogin: '/portal/staff/login/',
  staffMfa: '/portal/staff/mfa/',
  staffHome: '/portal/staff/',
  forgotPassword: '/portal/forgot-password/',
  resetPassword: '/portal/reset-password/',
  callback: '/portal/auth/callback/',
})

// Product password policy (the remote Supabase minimum must be set to match — see architecture doc).
const PASSWORD_MIN = 12
const PASSWORD_MAX = 128

/** Client area: signed out → login; signed in → client home (identity check happens server-side later). */
function decideClient(snapshot) {
  if (!snapshot || !snapshot.available) return { screen: 'unavailable' }
  if (!snapshot.session) return { screen: 'login', redirect: ROUTES.clientLogin }
  return { screen: 'client-home' }
}

function hasVerifiedTotp(session) {
  return Boolean(session && Array.isArray(session.factors) &&
    session.factors.some(f => f && f.factorType === 'totp' && f.status === 'verified'))
}

/**
 * Staff area: AAL2 is mandatory.
 *   no session                              → staff login
 *   aal2                                    → staff home
 *   aal1 + verified TOTP factor             → MFA challenge
 *   aal1 + no verified factor               → MFA enrollment
 */
function decideStaff(snapshot) {
  if (!snapshot || !snapshot.available) return { screen: 'unavailable' }
  const s = snapshot.session
  if (!s) return { screen: 'staff-login', redirect: ROUTES.staffLogin }
  if (s.aal === 'aal2') return { screen: 'staff-home' }
  if (hasVerifiedTotp(s)) return { screen: 'mfa-challenge', redirect: ROUTES.staffMfa }
  return { screen: 'mfa-enroll', redirect: ROUTES.staffMfa }
}

/** Whether staff UI may render at all. Anything below AAL2 is blocked (fail closed). */
function staffUiAllowed(snapshot) {
  return decideStaff(snapshot).screen === 'staff-home'
}

/**
 * Callback URL check (before anything is sent anywhere). Exactly TWO mutually exclusive shapes:
 *   RECOVERY (PKCE):       /portal/auth/callback/?code=<uuid>
 *   INVITE   (TokenHash):  /portal/auth/callback/?token_hash=<56 hex>&type=invite
 * Everything else fails closed, with no network call:
 *   access / refresh / provider / id tokens anywhere → 'token_in_url'
 *   Supabase error parameters → 'link_error'
 *   any fragment, code + token_hash together, wrong or missing type, extra or repeated parameters
 *   (redirect_to, next, role, organization, ids, …) → 'unexpected_state'
 *   missing or malformed code / token hash → 'malformed'
 * Destinations, roles and identities are never read from the URL.
 */
const CODE_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const TOKEN_HASH_RE = /^[0-9a-f]{56}$/ // Supabase email token hash: hex(SHA-224)
const TOKEN_KEYS = ['access_token', 'refresh_token', 'provider_token', 'provider_refresh_token', 'token', 'id_token']
const ERROR_KEYS = ['error', 'error_code', 'error_description']

function validateCallbackUrl(loc) {
  const search = new URLSearchParams((loc && loc.search) || '')
  const hash = new URLSearchParams(((loc && loc.hash) || '').replace(/^#/, ''))
  const keys = [...search.keys()], hashKeys = [...hash.keys()]
  const once = k => search.getAll(k).length === 1
  if (TOKEN_KEYS.some(k => search.has(k) || hash.has(k))) return { ok: false, reason: 'token_in_url' }
  if (ERROR_KEYS.some(k => search.has(k) || hash.has(k))) return { ok: false, reason: 'link_error' }
  if (hashKeys.length > 0 || (loc && loc.hash && loc.hash !== '#' && loc.hash.length > 0)) return { ok: false, reason: 'unexpected_state' }
  const hasCode = search.has('code'), hasHash = search.has('token_hash')
  if (hasCode && hasHash) return { ok: false, reason: 'unexpected_state' }
  if (hasCode) {
    if (keys.length !== 1 || !once('code')) return { ok: false, reason: 'unexpected_state' }
    const code = search.get('code')
    return CODE_RE.test(code) ? { ok: true, kind: 'recovery', code } : { ok: false, reason: 'malformed' }
  }
  if (hasHash) {
    if (keys.length !== 2 || !once('token_hash') || !once('type') || search.get('type') !== 'invite') {
      return { ok: false, reason: 'unexpected_state' }
    }
    const tokenHash = search.get('token_hash')
    return TOKEN_HASH_RE.test(tokenHash) ? { ok: true, kind: 'invite', tokenHash } : { ok: false, reason: 'malformed' }
  }
  return { ok: false, reason: keys.length ? 'unexpected_state' : 'malformed' }
}

/**
 * Where a verified auth link leads. Two kinds only, both into the password-setting screen:
 *   'recovery' (PKCE exchangeCodeForSession)  and  'invite' (TokenHash verifyOtp).
 * Everything else fails closed. Nothing but the kind is read — never role, organization or identity.
 */
function decideCallback(result) {
  const r = result || {}
  if (r.error || r.error_code) return { screen: 'callback-error' }
  if (r.type === 'recovery') return { screen: 'reset-password', redirect: ROUTES.resetPassword }
  if (r.type === 'invite') return { screen: 'reset-password', redirect: ROUTES.resetPassword, invite: true }
  return { screen: 'callback-error' }
}

/**
 * Open-redirect protection: only same-site portal paths are accepted as a post-login target.
 * Anything else (absolute URLs, protocol-relative, backslashes, encoded tricks) falls back.
 */
function sanitizeNext(next, fallback) {
  const fb = fallback || ROUTES.clientHome
  if (typeof next !== 'string' || next.length === 0 || next.length > 200) return fb
  let decoded
  try { decoded = decodeURIComponent(next) } catch (e) { return fb }
  if (!/^\/portal\/[A-Za-z0-9/_\-]*$/.test(decoded)) return fb
  if (decoded.includes('//') || decoded.includes('..')) return fb
  return decoded
}

function validateEmail(email) {
  if (typeof email !== 'string') return 'email_invalid'
  const v = email.trim()
  if (v.length < 3 || v.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'email_invalid'
  return null
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < PASSWORD_MIN) return 'password_too_short'
  if (password.length > PASSWORD_MAX) return 'password_too_long'
  return null
}

function validateNewPassword(password, confirm) {
  return validatePassword(password) || (password !== confirm ? 'password_mismatch' : null)
}

function validateTotp(code) {
  return typeof code === 'string' && /^\d{6}$/.test(code.trim()) ? null : 'totp_invalid_format'
}

/**
 * Map library / network errors to message keys. Sign-in failures are always the same generic key,
 * so the UI never reveals whether an email address has an account (no account enumeration).
 */
function authErrorKey(error, context) {
  if (!error) return null
  if (error === 'not_configured' || error.code === 'not_configured') return 'not_configured'
  const status = error.status || 0
  const code = String(error.code || error.name || '').toLowerCase()
  if (status === 429 || code.includes('rate_limit') || code.includes('over_')) return 'rate_limited'
  if (code.includes('fetch') || code.includes('network') || status === 0 && error.name === 'TypeError') return 'network'
  if (context === 'mfa') return 'totp_rejected'
  if (context === 'signin') return 'signin_failed'
  if (context === 'reset' && (code.includes('weak') || code.includes('password'))) return 'password_rejected'
  if (context === 'reset' && (code.includes('expired') || code.includes('session') || status === 401 || status === 403)) return 'link_expired'
  return 'generic'
}

module.exports = {
  ROUTES, PASSWORD_MIN, PASSWORD_MAX,
  decideClient, decideStaff, staffUiAllowed, hasVerifiedTotp, decideCallback,
  sanitizeNext, validateEmail, validatePassword, validateNewPassword, validateTotp, authErrorKey, validateCallbackUrl,
}

/**
 * Lina v2 private staging site — fixed configuration (no secrets).
 *
 * Everything here is public and committed on purpose. Secrets (the staging OpenAI key) live only in the
 * staging Netlify site's environment variables and are never read from this file.
 *
 * EXPECTED_SITE_ID is the Netlify site ID of the separate staging site. It is EMPTY until that site
 * exists and Effie supplies the ID; while it is empty every build and every request fails closed.
 */
module.exports = {
  // Netlify site ID of the staging site (not a secret). Empty → nothing runs.
  EXPECTED_SITE_ID: '',
  // The only Netlify deploy context allowed to serve or build the staging site (Deploy Previews and branch
  // deploys must be off in the staging site's settings; this is a second, fail-closed layer).
  REQUIRED_DEPLOY_CONTEXT: 'production',

  // Approved staging excerpts: data/lina-official/review.json → sources with status "approved_staging",
  // their stagingExcerpts. Digest = sha256 over the sorted lines "sourceId#excerpt:sha256(text)".
  // Changing an approval changes this digest, so it must be updated here deliberately.
  APPROVED_EXCERPT_COUNT: 22,
  APPROVED_SET_DIGEST: '630be1b3e881f445b33637a40fb1143d2ca8a8c8c59a506fed9c92de4f4d8d0d',
  // Held excerpts that must never be served (Phase 4.1: needs supporting authority).
  HELD_IDS: ['irs-n-2025-67#ira-limit-2026'],

  // ── Model, pricing and request shape ─────────────────────────────────────
  // The only model the staging site may call (the shared runtime's default) and the only accepted response
  // model ids (the alias or a dated snapshot of it).
  MODEL: 'gpt-5.4-mini',
  RESPONSE_MODEL: /^gpt-5\.4-mini(-\d{4}-\d{2}-\d{2})?$/,
  // Standard processing only. The staging meter sends service_tier "default" and requires it back; any other
  // tier (flex, priority/fast, auto-upgraded) has a different price and is treated as an anomaly.
  SERVICE_TIER: 'default',
  // Pricing used for the ledger (USD per 1M tokens, standard tier, global endpoint).
  // Evidence (2026-10-18): OpenAI's GPT-5.4 mini model page and launch announcement, as quoted by search
  // results: $0.75 input / $4.50 output per 1M tokens (cached input $0.075; regional endpoints +10%; Fast mode
  // $1.50 / $9.00). The pages could not be opened directly from the build environment, so the price is NOT yet
  // confirmed by the owner. While OWNER_CONFIRMED is false every model call is refused (fail closed).
  PRICING: {
    model: 'gpt-5.4-mini',
    inPerM: 0.75,
    outPerM: 4.50,
    serviceTier: 'default',
    sources: ['https://developers.openai.com/api/docs/models/gpt-5.4-mini', 'https://openai.com/index/introducing-gpt-5-4-mini-and-nano/'],
    checkedOn: '2026-10-18',
    OWNER_CONFIRMED: false,
  },
  PRICE_IN_PER_M: 0.75,
  PRICE_OUT_PER_M: 4.50,
  MAX_OUTPUT_TOKENS: 1600, // core-v2.js cap (reasoning tokens included); the worst case uses it
  // Worst case of one call = ((request bytes + INPUT_OVERHEAD_TOKENS) × input price + MAX_OUTPUT_TOKENS × output
  // price) × COST_SAFETY_FACTOR. A token covers at least one byte, so bytes bound the text; the overhead and the
  // factor cover message framing, schema rendering and the regional-endpoint uplift (+10%).
  INPUT_OVERHEAD_TOKENS: 1000,
  COST_SAFETY_FACTOR: 1.25,

  // ── Budget caps (mirrored in supabase/migrations/*.sql; a test checks they agree) ──
  SESSION_MAX_CALLS: 20,
  SESSION_MAX_USD: 0.25,
  TOTAL_MAX_USD: 5.00,
  MAX_INPUT_BYTES: 400000,

  // ── Timing (the whole request must stay well under Netlify's synchronous limit) ──
  // authorize ≤ 3 s · reservation must START ≤ 8 s after the request began (authorize included) · reserve ≤ 3 s ·
  // model ≤ 20 s (shared runtime's own abort) · settle ≤ 3 s  →  about 34 s worst case. Netlify documents a 60 s
  // synchronous limit (its pages are not fully consistent): to be confirmed on the switched-off first deploy.
  LEDGER_TIMEOUT_MS: 3000,
  MAX_MS_BEFORE_RESERVE: 8000,
  // A model call is not started with a sign-in token that expires within this many seconds (the database
  // enforces 90 s on the verified claim; the page refreshes 300 s before expiry).
  MIN_TOKEN_TTL_S: 120,

  OPENAI_URL: 'https://api.openai.com/v1/responses',
}

# Lina v2 private staging site — deployment and operations runbook

Status: **offline implementation only.** Nothing here has been deployed, and no Supabase project, OpenAI
project, Netlify site or key exists yet. Every step below is performed by the owner, in order, only after
approval. The code fails closed until each step is done: an empty `EXPECTED_SITE_ID` means 404 everywhere,
the budget starts disabled, and `PRICING.OWNER_CONFIRMED: false` means no model call.

What this site is: a separate Netlify site that serves `lina-staging/public` and one function,
`/api/lina-staging`. That function calls the unchanged shared Lina v2 runtime
(`netlify/functions/lina/core-v2.js`) with the 22 approved staging IRS excerpts. The production site
(asklintax.com) never builds or serves anything in this folder.

## 1. Netlify (staging site only; production settings stay as they are)

Code checks protect against misconfiguration. They **cannot** protect against code pushed from another branch,
because that code could delete them. That protection comes from these settings (finding H1):

| Setting | Value |
|---|---|
| New site | from the same repository, separate from the production site |
| Base directory | *(empty: repository root)* |
| Package directory | `lina-staging` |
| Production branch | `lina-v2-staging` |
| Branch deploys | **Off** ("Deploy only the production branch") |
| Deploy Previews | **Off** |
| Environment variables (this site only) | `LINA_STAGING_ENABLED`, `LINA_STAGING_OPENAI_API_KEY`, `LINA_STAGING_SUPABASE_URL`, `LINA_STAGING_SUPABASE_PUBLISHABLE_KEY` |
| Variable scope / context | Functions (and Builds) scope. Production deploy context only, where the plan allows context-specific values |
| Never set on this site | `OPENAI_API_KEY`, `LINA_MODE` (the function refuses to run if `OPENAI_API_KEY` is visible) |
| Production site | confirm `OPENAI_API_KEY` there is a **site** variable, not a team-shared one |

GitHub: protect `lina-v2-staging` (restrict who can push; require review). Anything pushed there is
deployed by the staging site with the staging key.

Fail-closed layers in code (they do not replace the settings above):
- build: `SITE_ID` must equal `config.EXPECTED_SITE_ID`, and the build-time `CONTEXT` must be `production`.
  No staging index is built for a Deploy Preview or branch deploy, and the build fails;
- runtime: `context.site.id` / `SITE_ID` must equal `EXPECTED_SITE_ID`, and the runtime deploy context
  (`context.deploy.context`, documented in Netlify's Functions API) must be exactly `production`. A missing
  value counts as a failure (404);
- `LINA_STAGING_ENABLED` must be exactly `true`; the production key name must be absent; the bundled index
  must match the approved set exactly.

## 2. Order of operations

1. **OpenAI and Supabase not connected yet.** Create the Netlify staging site with the settings above and
   `LINA_STAGING_ENABLED=false`, and **no OpenAI key at all**. The first build fails (`wrong_site`), as
   intended.
2. Send the site ID. After review, it is committed as `EXPECTED_SITE_ID` and pushed to `lina-v2-staging`.
3. **Switched-off verification deploy** (section 6). Confirm `/api/lina-staging` returns 404, and check every
   item in section 6.
4. Supabase staging project (section 3) and SQL verification (section 5), with the budget still disabled.
5. OpenAI staging project (section 4), with pricing confirmed and committed.
6. Add the staging key and Supabase values to the staging site, keep `LINA_STAGING_ENABLED=false`, redeploy,
   and re-check.
7. Set `LINA_STAGING_ENABLED=true` and redeploy. Then enable the budget in the database for one session
   ($0.25, 20 calls).

## 3. Supabase: separate staging project (never the Client Portal project)

1. Create a new project. Authentication: **disable sign-ups**, disable anonymous sign-ins, keep TOTP MFA
   enabled, turn on leaked-password protection and rate limits if offered, shorten the refresh-token lifetime.
2. Run the migration (section 5) with the budget disabled (its default).
3. Create the one tester user (Dashboard → Add user, with email and password).

**Initial authenticator enrollment and approval** (finding M1). An authenticator works only after the owner
approves it:

4. The tester signs in on the staging page and scans the QR code. This creates and verifies their TOTP factor.
   The site still refuses with `factor_not_approved`.
5. The owner checks that the user has exactly one verified factor and approves it:
   ```sql
   select id, factor_type, status, created_at from auth.mfa_factors where user_id = '<user uuid>';
   select lina_staging_private.admin_approve_tester('<user uuid>', '<that factor id>');
   ```
   Approval is refused unless the factor is a verified TOTP factor of that user **and** the user has exactly
   one verified factor. It never replaces a different tester implicitly.

Why a password alone is not enough: anyone who knows the password can sign in at aal1 and may be able to enroll
and verify a new authenticator. Every check requires aal2 via TOTP **and** exactly one verified factor that is
the approved one. A second authenticator, or a replacement that the owner did not approve, is refused.

**Replacing an authenticator** (lost phone): the owner removes the old factor in the Supabase dashboard
(Authentication → user → MFA factors). The tester enrolls a new one (step 4), and the owner approves it
(step 5).

## 4. OpenAI: separate staging project

- A dedicated project; allow only the model `gpt-5.4-mini`; a project budget of $5 with alerts; one project key.
  It goes into `LINA_STAGING_OPENAI_API_KEY` on the staging site only.
- **Pricing confirmation** (finding H2). Open OpenAI's pricing page and the GPT-5.4 mini model page and confirm
  the standard-tier prices in `config.js` (`PRICING`: $0.75 input / $4.50 output per 1M tokens, recorded
  2026-10-18 from official pages quoted by search, not opened directly). If they match, set
  `PRICING.OWNER_CONFIRMED: true` in a reviewed commit. If they differ, update `config.js` **and** the
  migration's `worst_usd` / `cost_usd` constants together; an offline test checks they agree.
- What the $5 means: the ledger stops at $5 of **estimated** cost at the confirmed prices. Each call reserves
  `((request bytes + 1000) × input price + 1600 × output price) × 1.25` before it is made. Every call must come
  back with the approved model, service tier `default` and usage within those bounds; anything else is charged
  at least the reservation and switches the budget off. The OpenAI project limit is the outer backstop, but
  OpenAI states it is not enforced instantly.

## 5. SQL verification (pending: nothing has been run on PostgreSQL)

Apply `supabase/migrations/20261018000000_lina_staging_ledger.sql`, either in the SQL editor or with the
Supabase CLI. The file has no BEGIN/COMMIT. Then verify, with the budget disabled, then enabled for the probes:

- The migration runs without errors. `auth.mfa_factors` columns `status` and `factor_type` compare as text.
  `auth.jwt()` carries `aal`, `amr` and `exp`.
- As **anon** (publishable key, no user token): every `lina_staging_*` RPC fails with permission denied. No
  `lina_staging_private` table or function is reachable through the REST or GraphQL APIs.
- As the tester at **aal1**: `mfa_required`. As another signed-in user: `not_tester`. As the tester with a
  second verified factor: `factor_not_approved`.
- Direct `lina_staging_reserve` / `lina_staging_settle` calls follow the caps. A forged or foreign reservation
  is refused, a replay is refused, and a null anomaly flag is treated as an anomaly.
- A concurrent burst of reservations (for example 30 in parallel on one session) never exceeds $0.25 per
  session or $5 in total.
- PostgREST error shapes match `lib/ledger.js`: 400 with `message: 'lina_staging:<code>'`, and 401 for a bad JWT.

## 6. Switched-off first deploy: what to confirm

- The deploy log shows the build used `lina-staging/netlify.toml`, published `lina-staging/public`, and bundled
  exactly one function, `lina-staging`. It did not include production's `lina` function and did not add the
  Next.js plugin's output.
- `GET /api/lina-staging` returns 404 (`LINA_STAGING_ENABLED=false`). The static page shows "not available".
- Runtime identity values exist: `context.site.id` / `SITE_ID`, and `context.deploy.context === 'production'`.
  This needs a temporary owner-approved check of names and values only, never secrets.
- Response headers (CSP, noindex, no-store, frame denial) are present. The `rateLimit` and `method` function
  config are accepted on the plan. The synchronous function limit is at least 40 s (the worst-case timeline is
  about 34 s).
- Production asklintax.com is unchanged: `/api/lina` still serves v1, and `/api/lina-staging` does not exist.

## 7. Operations

| Action | How | Effect |
|---|---|---|
| Enable testing | `update lina_staging_private.budget set disabled = false, disabled_reason = '' where id;` | immediate |
| **Emergency stop** | `update lina_staging_private.budget set disabled = true, disabled_reason = 'manual' where id;` | immediate |
| Emergency stop (OpenAI) | revoke the staging key, or set the project limit to $0 | immediate |
| Switch the site off | `LINA_STAGING_ENABLED=false` then redeploy | next deploy |
| Review spend | `select * from lina_staging_private.budget;` and the `reservations` table | — |
| Stale reservations | `select lina_staging_private.admin_charge_stale_reservations(interval '30 minutes');` | charges each stale hold in full (moved from reserved to spent); never refunds; only holds older than ≥ 15 min |

A reservation becomes stale if the function was killed, the sign-in token expired, or settlement timed out
after the model call. It is never released automatically.

## 8. Known limitations

- The per-call worst case relies on "input tokens ≤ request bytes + 1000". This is strong in practice
  (about 4 bytes per token measured), but OpenAI does not document it. Usage outside it is treated as an
  anomaly and switches the budget off.
- The dollar figures are only as correct as the confirmed prices.
- All database behavior has been tested only against a JavaScript model of the SQL (`tests/mock-supabase.js`).

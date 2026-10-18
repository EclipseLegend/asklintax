-- Lina v2 private staging site: tester allowlist (with an approved authenticator) + budget ledger.
--
-- FOR THE SEPARATE *STAGING* SUPABASE PROJECT ONLY. Never apply this to the Client Portal project.
-- Status: proposed (Phase 4.3 Step 2D, offline). NOT applied anywhere. Real PostgreSQL / Supabase
-- verification is still pending (see lina-staging/DEPLOYMENT.md, "SQL verification").
--
-- How to apply (later, by the owner): paste into the staging project's SQL editor and run once, or run it with
-- the Supabase CLI. There is deliberately no BEGIN/COMMIT here: the CLI wraps each migration file in its own
-- transaction, and an inner COMMIT would end that early.
--
-- Security model
--   * Tables live in schema lina_staging_private: not exposed through the API, RLS on, no policies, and all
--     privileges revoked from public / anon / authenticated. Clients can never read or write them directly.
--   * The only client entry points are four SECURITY DEFINER functions in public (search_path = ''),
--     executable by the authenticated role only. Each one re-checks everything itself, so calling them directly
--     grants nothing beyond what the staging site could do. Every check except settlement requires:
--       auth.uid() · JWT aal = aal2 · amr includes totp · the caller is the allowlisted tester ·
--       the tester has EXACTLY ONE verified authenticator and it is the one the owner approved.
--     A password-only attacker who enrolls (and verifies) a new authenticator therefore gains nothing: two
--     verified factors, or a factor that is not the approved one, are refused. Only the owner approves or
--     replaces a factor (admin_approve_tester, below).
--   * Reservations are created by the database (random uuid) and owned by the caller. A reservation can be
--     settled exactly once, only by the same user; unknown, foreign or already-settled ids are refused.
--     Reservation ids are never sent to the browser by the staging function.
--   * Concurrency: every reserve/settle/recovery locks the single budget row first (then the session /
--     reservation rows), so concurrent requests are serialised and the caps hold.
--   * Worst case reserved BEFORE a model call:
--       ceil(((request bytes + 1000) × $0.75 + 1600 × $4.50) × 1.25) per 1M
--     (a token covers at least one byte; +1000 tokens framing; ×1.25 margin). Settlement charges actual usage.
--     A settlement flagged as an anomaly (unexpected model / service tier / usage) or whose usage exceeds the
--     approved bounds charges at least the full reservation and switches the whole budget off.
--   * Prices are the standard-tier gpt-5.4-mini prices in lina-staging/config.js. They must be confirmed by the
--     owner before use (config PRICING.OWNER_CONFIRMED). If OpenAI's prices differ, these numbers are wrong;
--     the OpenAI project's own budget limit is the outer backstop.
--
-- Prices and caps here must match lina-staging/config.js (an offline test compares them).

create schema lina_staging_private;
revoke all on schema lina_staging_private from public;
revoke all on schema lina_staging_private from anon, authenticated;

-- One authorized tester at this stage (the unique index on a constant allows a single row).
-- factor_id = the tester's approved, verified TOTP factor (auth.mfa_factors.id), set only by the owner.
create table lina_staging_private.testers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  factor_id uuid not null,
  approved_at timestamptz not null default now()
);
create unique index testers_single_tester on lina_staging_private.testers ((true));

-- Single budget row. Starts DISABLED; testing is enabled by the owner after setup.
create table lina_staging_private.budget (
  id boolean primary key default true check (id),
  total_max_usd numeric(12, 6) not null default 5.00 check (total_max_usd >= 0 and total_max_usd <= 5.00),
  spent_usd numeric(12, 6) not null default 0 check (spent_usd >= 0),
  reserved_usd numeric(12, 6) not null default 0 check (reserved_usd >= 0),
  disabled boolean not null default true,
  disabled_reason text not null default 'not yet enabled',
  updated_at timestamptz not null default now()
);
insert into lina_staging_private.budget (id) values (true);

create table lina_staging_private.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references lina_staging_private.testers (user_id) on delete restrict, -- keep accounting history
  created_at timestamptz not null default now(),
  calls integer not null default 0 check (calls >= 0 and calls <= 20),
  spent_usd numeric(12, 6) not null default 0 check (spent_usd >= 0),
  reserved_usd numeric(12, 6) not null default 0 check (reserved_usd >= 0)
);

create table lina_staging_private.reservations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references lina_staging_private.sessions (id) on delete restrict,
  user_id uuid not null,
  input_bytes integer not null check (input_bytes >= 1 and input_bytes <= 400000),
  reserved_usd numeric(12, 6) not null check (reserved_usd > 0),
  status text not null default 'reserved' check (status in ('reserved', 'settled', 'expired_charged')),
  input_tokens integer,
  output_tokens integer,
  charged_usd numeric(12, 6),
  anomaly boolean not null default false,
  created_at timestamptz not null default now(),
  settled_at timestamptz
);
create index reservations_open on lina_staging_private.reservations (created_at) where status = 'reserved';

alter table lina_staging_private.testers enable row level security;
alter table lina_staging_private.budget enable row level security;
alter table lina_staging_private.sessions enable row level security;
alter table lina_staging_private.reservations enable row level security;
revoke all on all tables in schema lina_staging_private from public, anon, authenticated;

-- ── Internal helpers (not callable by clients) ─────────────────────────────

-- Worst case of one model call, with framing overhead and a 1.25 margin, rounded UP to a micro-dollar.
create function lina_staging_private.worst_usd(p_input_bytes integer) returns numeric
language sql immutable set search_path = '' as $$
  select ceil(((p_input_bytes + 1000) * 0.75 + 1600 * 4.50) * 1.25) / 1000000.0
$$;

-- Actual cost from reported usage (standard tier), rounded UP to a micro-dollar.
create function lina_staging_private.cost_usd(p_input_tokens integer, p_output_tokens integer) returns numeric
language sql immutable set search_path = '' as $$
  select ceil(p_input_tokens * 0.75 + p_output_tokens * 4.50) / 1000000.0
$$;

-- The caller must be signed in at aal2 via TOTP, be the allowlisted tester, and hold exactly one verified
-- authenticator: the one the owner approved.
create function lina_staging_private.require_tester() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  approved uuid;
  n integer;
  match boolean;
begin
  if uid is null then raise exception 'lina_staging:unauthenticated'; end if;
  if coalesce(auth.jwt() ->> 'aal', '') <> 'aal2' then raise exception 'lina_staging:mfa_required'; end if;
  if not exists (
    select 1 from jsonb_array_elements(coalesce(auth.jwt() -> 'amr', '[]'::jsonb)) e where e ->> 'method' = 'totp'
  ) then
    raise exception 'lina_staging:mfa_required';
  end if;
  select t.factor_id into approved from lina_staging_private.testers t where t.user_id = uid;
  if not found then raise exception 'lina_staging:not_tester'; end if;
  select count(*), coalesce(bool_and(f.id = approved and f.factor_type::text = 'totp'), false)
    into n, match
    from auth.mfa_factors f
    where f.user_id = uid and f.status::text = 'verified';
  if n <> 1 or not match then raise exception 'lina_staging:factor_not_approved'; end if;
  return uid;
end
$$;

create function lina_staging_private.budget_json(s lina_staging_private.sessions, b lina_staging_private.budget) returns jsonb
language sql immutable set search_path = '' as $$
  select jsonb_build_object(
    'session_calls', s.calls, 'session_max_calls', 20,
    'session_spent_usd', s.spent_usd, 'session_reserved_usd', s.reserved_usd, 'session_max_usd', 0.25,
    'total_spent_usd', b.spent_usd, 'total_reserved_usd', b.reserved_usd, 'total_max_usd', b.total_max_usd)
$$;

-- ── Owner-only administration (run in the SQL editor; never exposed to the API) ──

-- Approve (or, after the old factor was removed, replace) the single tester and their authenticator.
-- The factor must belong to the user, be a verified TOTP factor, and be the user's ONLY verified factor.
create function lina_staging_private.admin_approve_tester(p_user uuid, p_factor uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  n integer;
begin
  if not exists (
    select 1 from auth.mfa_factors f
    where f.id = p_factor and f.user_id = p_user and f.status::text = 'verified' and f.factor_type::text = 'totp'
  ) then
    raise exception 'lina_staging:factor_not_verified_totp_of_user';
  end if;
  select count(*) into n from auth.mfa_factors f where f.user_id = p_user and f.status::text = 'verified';
  if n <> 1 then raise exception 'lina_staging:user_must_have_exactly_one_verified_factor'; end if;
  -- One tester at this stage. Another tester is never removed implicitly (that would cascade-delete their
  -- sessions and reservation history); the owner must remove them deliberately first.
  if exists (select 1 from lina_staging_private.testers t where t.user_id <> p_user) then
    raise exception 'lina_staging:another_tester_exists';
  end if;
  insert into lina_staging_private.testers (user_id, factor_id) values (p_user, p_factor)
    on conflict (user_id) do update set factor_id = excluded.factor_id, approved_at = now();
end
$$;

-- Stale reservations (never settled: function killed, token expired, ledger timeout). They are CHARGED in
-- full — moved from reserved to spent — never refunded, because the model call may have been billed.
-- Only reservations older than p_older_than (at least 15 minutes) are touched. Returns how many were closed.
create function lina_staging_private.admin_charge_stale_reservations(p_older_than interval) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  r record;
  n integer := 0;
begin
  if p_older_than is null or p_older_than < interval '15 minutes' then
    raise exception 'lina_staging:older_than_must_be_at_least_15_minutes';
  end if;
  perform 1 from lina_staging_private.budget where id = true for update;
  for r in
    select * from lina_staging_private.reservations
    where status = 'reserved' and created_at < now() - p_older_than
    order by created_at
    for update
  loop
    update lina_staging_private.reservations
      set status = 'expired_charged', charged_usd = r.reserved_usd, settled_at = now()
      where id = r.id;
    update lina_staging_private.sessions
      set reserved_usd = reserved_usd - r.reserved_usd, spent_usd = spent_usd + r.reserved_usd
      where id = r.session_id;
    update lina_staging_private.budget
      set reserved_usd = reserved_usd - r.reserved_usd, spent_usd = spent_usd + r.reserved_usd, updated_at = now()
      where id = true;
    n := n + 1;
  end loop;
  return n;
end
$$;

revoke all on all functions in schema lina_staging_private from public, anon, authenticated;

-- ── API: four functions, authenticated role only ────────────────────────────

create function public.lina_staging_start_session() returns jsonb
language plpgsql volatile security definer set search_path = '' as $$
declare
  uid uuid;
  b lina_staging_private.budget;
  s lina_staging_private.sessions;
begin
  uid := lina_staging_private.require_tester();
  select * into b from lina_staging_private.budget where id = true;
  if b.disabled then raise exception 'lina_staging:disabled'; end if;
  insert into lina_staging_private.sessions (user_id) values (uid) returning * into s;
  return jsonb_build_object('session', s.id, 'budget', lina_staging_private.budget_json(s, b));
end
$$;

create function public.lina_staging_authorize(p_session uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  uid uuid;
  b lina_staging_private.budget;
  s lina_staging_private.sessions;
begin
  uid := lina_staging_private.require_tester();
  select * into b from lina_staging_private.budget where id = true;
  if b.disabled then raise exception 'lina_staging:disabled'; end if;
  select * into s from lina_staging_private.sessions where id = p_session and user_id = uid;
  if not found then raise exception 'lina_staging:bad_session'; end if;
  if s.calls >= 20 then raise exception 'lina_staging:session_calls'; end if;
  return jsonb_build_object('budget', lina_staging_private.budget_json(s, b));
end
$$;

create function public.lina_staging_reserve(p_session uuid, p_input_bytes integer) returns jsonb
language plpgsql volatile security definer set search_path = '' as $$
declare
  uid uuid;
  w numeric;
  b lina_staging_private.budget;
  s lina_staging_private.sessions;
  rid uuid;
begin
  uid := lina_staging_private.require_tester();
  -- The verified token must stay valid long enough to settle this call.
  if coalesce((auth.jwt() ->> 'exp')::bigint, 0) - extract(epoch from now()) < 90 then
    raise exception 'lina_staging:token_expiring';
  end if;
  if p_input_bytes is null or p_input_bytes < 1 or p_input_bytes > 400000 then
    raise exception 'lina_staging:bad_request';
  end if;
  w := lina_staging_private.worst_usd(p_input_bytes);
  -- Lock order everywhere: budget row first, then the session / reservation row.
  select * into b from lina_staging_private.budget where id = true for update;
  if b.disabled then raise exception 'lina_staging:disabled'; end if;
  select * into s from lina_staging_private.sessions where id = p_session and user_id = uid for update;
  if not found then raise exception 'lina_staging:bad_session'; end if;
  if s.calls >= 20 then raise exception 'lina_staging:session_calls'; end if;
  if s.spent_usd + s.reserved_usd + w > 0.25 then raise exception 'lina_staging:session_cost'; end if;
  if b.spent_usd + b.reserved_usd + w > b.total_max_usd then raise exception 'lina_staging:total_cost'; end if;
  update lina_staging_private.sessions set calls = calls + 1, reserved_usd = reserved_usd + w
    where id = s.id returning * into s;
  update lina_staging_private.budget set reserved_usd = reserved_usd + w, updated_at = now()
    where id = true returning * into b;
  insert into lina_staging_private.reservations (session_id, user_id, input_bytes, reserved_usd)
    values (s.id, uid, p_input_bytes, w) returning id into rid;
  return jsonb_build_object('reservation', rid, 'reserved_usd', w, 'budget', lina_staging_private.budget_json(s, b));
end
$$;

-- Settlement deliberately needs only the SAME signed-in user (not the allowlist or aal2), so a reservation
-- can always be released even if the tester is removed mid-call. Unknown, foreign or settled ids fail.
-- p_anomaly (or usage outside the approved bounds) charges at least the reservation and disables the budget.
create function public.lina_staging_settle(p_reservation uuid, p_usage_known boolean, p_input_tokens integer, p_output_tokens integer, p_anomaly boolean) returns jsonb
language plpgsql volatile security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  b lina_staging_private.budget;
  s lina_staging_private.sessions;
  r lina_staging_private.reservations;
  cost numeric;
  anomalous boolean;
begin
  if uid is null then raise exception 'lina_staging:unauthenticated'; end if;
  select * into b from lina_staging_private.budget where id = true for update;
  select * into r from lina_staging_private.reservations where id = p_reservation for update;
  if not found or r.user_id <> uid then raise exception 'lina_staging:bad_reservation'; end if;
  if r.status <> 'reserved' then raise exception 'lina_staging:already_settled'; end if;
  anomalous := coalesce(p_anomaly, true);
  if coalesce(p_usage_known, false) then
    if p_input_tokens is null or p_output_tokens is null or p_input_tokens < 0 or p_output_tokens < 0 then
      raise exception 'lina_staging:bad_request';
    end if;
    if p_output_tokens > 1600 or p_input_tokens > r.input_bytes + 1000 then anomalous := true; end if;
    cost := lina_staging_private.cost_usd(p_input_tokens, p_output_tokens);
  else
    cost := r.reserved_usd; -- usage unknown (network error, timeout, error response): charge the whole reservation
  end if;
  if anomalous or cost > r.reserved_usd then
    anomalous := true;
    cost := greatest(cost, r.reserved_usd);
  end if;
  update lina_staging_private.reservations
    set status = 'settled', input_tokens = p_input_tokens, output_tokens = p_output_tokens, charged_usd = cost,
        anomaly = anomalous, settled_at = now()
    where id = r.id;
  update lina_staging_private.sessions
    set reserved_usd = reserved_usd - r.reserved_usd, spent_usd = spent_usd + cost
    where id = r.session_id returning * into s;
  update lina_staging_private.budget
    set reserved_usd = reserved_usd - r.reserved_usd,
        spent_usd = spent_usd + cost,
        disabled = disabled or anomalous or (spent_usd + cost >= total_max_usd),
        disabled_reason = case
          when disabled then disabled_reason
          when anomalous then 'model, service tier or usage anomaly'
          when spent_usd + cost >= total_max_usd then 'total budget reached'
          else disabled_reason end,
        updated_at = now()
    where id = true returning * into b;
  return jsonb_build_object('charged_usd', cost, 'budget', lina_staging_private.budget_json(s, b));
end
$$;

revoke all on function public.lina_staging_start_session() from public, anon;
revoke all on function public.lina_staging_authorize(uuid) from public, anon;
revoke all on function public.lina_staging_reserve(uuid, integer) from public, anon;
revoke all on function public.lina_staging_settle(uuid, boolean, integer, integer, boolean) from public, anon;
grant execute on function public.lina_staging_start_session() to authenticated;
grant execute on function public.lina_staging_authorize(uuid) to authenticated;
grant execute on function public.lina_staging_reserve(uuid, integer) to authenticated;
grant execute on function public.lina_staging_settle(uuid, boolean, integer, integer, boolean) to authenticated;

-- ── Owner runbook (SQL editor) ──────────────────────────────────────────────
--   approve the tester:     select lina_staging_private.admin_approve_tester('<auth user uuid>', '<verified totp factor uuid>');
--                           (factor id: select id, status, factor_type from auth.mfa_factors where user_id = '<uuid>';)
--   enable testing:         update lina_staging_private.budget set disabled = false, disabled_reason = '' where id;
--   EMERGENCY DISABLE:      update lina_staging_private.budget set disabled = true, disabled_reason = 'manual' where id;
--   charge stale holds:     select lina_staging_private.admin_charge_stale_reservations(interval '30 minutes');
--   review spend:           select * from lina_staging_private.budget;
--                           select * from lina_staging_private.reservations order by created_at desc limit 50;

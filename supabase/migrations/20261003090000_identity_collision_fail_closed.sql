-- =====================================================================
-- AskLinTax Client Portal — Phase 2B-4: identity collision fails closed
-- (DEVELOPMENT DESIGN — local draft, not applied to any project)
--
-- Supersedes decision D10. A person who is both AskLinTax staff and an
-- AskLinTax client must use SEPARATE login identities. One auth.uid()
-- linked to both a client profile and a staff profile now resolves to
-- NEITHER identity (runtime fail-closed), and new links that would create
-- such a collision are rejected (provisioning guard).
--
-- The two frozen migrations (20261002120000 / 20261002130000) are NOT
-- modified. This migration only:
--   1. CREATE OR REPLACE the two identity helpers with one extra condition
--      each. Same names, signatures, return types, SECURITY DEFINER,
--      search_path = '' and owner; CREATE OR REPLACE keeps existing grants.
--   2. Adds an owner-only trigger function + two triggers that reject a
--      collision on INSERT or on UPDATE OF user_id.
-- No table, column, policy, role or grant changes.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Runtime fail-closed
-- ---------------------------------------------------------------------
create or replace function portal_private.current_client_profile_id()
returns uuid language sql stable security definer set search_path = '' as $$
  select c.id
  from portal_private.client_profiles c
  where portal_private.session_claims_ok()
    and c.user_id is not null
    and c.user_id = auth.uid()
    -- 2B-4: an identity that is also linked to staff resolves to no client
    and not exists (select 1 from portal_private.staff_profiles s where s.user_id = c.user_id)
$$;

create or replace function portal_private.current_staff_scope()
returns table (staff_id uuid, organization_id uuid, role text)
language sql stable security definer set search_path = '' as $$
  select s.id, s.organization_id, s.role
  from portal_private.staff_profiles s
  where portal_private.session_claims_ok()
    and s.user_id = auth.uid()
    and s.active
    and (auth.jwt() ->> 'aal') = 'aal2'
    -- 2B-4: an identity that is also linked to a client resolves to no staff scope
    and not exists (select 1 from portal_private.client_profiles c where c.user_id = s.user_id)
$$;

-- ---------------------------------------------------------------------
-- 2. Provisioning guard
-- Rejects linking an auth user to a client profile when it is already a
-- staff identity, and vice versa — on INSERT and on re-link (UPDATE OF
-- user_id). user_id NULL (invited, not yet linked) stays allowed.
-- Concurrency: a transaction-scoped advisory lock keyed on the auth user
-- serializes concurrent links of the SAME user. Under READ COMMITTED (the
-- Postgres / Supabase default) the existence check runs after the lock is
-- held, so it sees the other transaction's committed link. The runtime
-- fail-closed above remains the backstop in every isolation level.
-- ---------------------------------------------------------------------
create function portal_private._reject_identity_collision()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.user_id is null then
    return new;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('portal_identity:' || new.user_id::text, 0));
  if tg_table_name = 'client_profiles'
     and exists (select 1 from portal_private.staff_profiles s where s.user_id = new.user_id) then
    raise exception 'auth user is already linked to a staff profile' using errcode = '23505';
  elsif tg_table_name = 'staff_profiles'
     and exists (select 1 from portal_private.client_profiles c where c.user_id = new.user_id) then
    raise exception 'auth user is already linked to a client profile' using errcode = '23505';
  end if;
  return new;
end;
$$;

revoke all on function portal_private._reject_identity_collision() from public, anon, authenticated, service_role;

create trigger client_profiles_reject_identity_collision
  before insert or update of user_id on portal_private.client_profiles
  for each row execute function portal_private._reject_identity_collision();

create trigger staff_profiles_reject_identity_collision
  before insert or update of user_id on portal_private.staff_profiles
  for each row execute function portal_private._reject_identity_collision();

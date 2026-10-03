-- =====================================================================
-- AskLinTax Client Portal — Phase 2B-3.5 authorization, Supabase-native
-- (DEVELOPMENT DESIGN — local draft, not applied to any project)
--
-- Request path (unchanged boundary):
--   Browser → AskLinTax server/API → Postgres (portal_private)
--
-- Interactive identity is Supabase Auth, exactly as PostgREST does it:
--   the server verifies the user's Supabase JWT, then in ONE transaction
--     SET LOCAL ROLE authenticated;
--     SELECT set_config('request.jwt.claims', <verified claims>, true);
--   and the database derives everything from auth.uid() / auth.jwt():
--     auth.uid() → client_profiles.user_id → own returns (client)
--     auth.uid() → staff_profiles.user_id  → role / org / assignment, aal2 (staff)
--   Nothing about identity is ever taken from a function argument.
--
-- * No change to the frozen 2B-2 tables, columns or constraints.
-- * portal_private stays OUT of the Data API exposed schemas.
-- * Nothing for anon, service_role or PUBLIC. service_role is not part of
--   portal authorization (it has no USAGE on portal_private).
-- * Reads:
--     staff  → base tables, RLS (assignment / organization, aal2 required)
--     client → eight narrow SECURITY DEFINER client_get_* read functions
--              returning only client-safe columns, filtered by auth.uid();
--              clients match no base-table policy (0 rows from base tables).
-- * Writes: no INSERT / UPDATE / DELETE grant or policy for anyone. Every
--   change is a narrow SECURITY DEFINER command function.
-- * Document processing is NOT interactive Auth: a separate no-login role
--   reachable only through a separate worker login.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Roles
--   portal_server     — future AskLinTax server login (LOGIN + secret are a
--                       deployment step). NOINHERIT member of authenticated
--                       only: it holds no privileges until it runs
--                       SET LOCAL ROLE authenticated for a request, the same
--                       way Supabase's authenticator role works.
--   portal_processor  — document-processing job commands only; no reads.
--   portal_worker     — future processing-worker login; NOINHERIT member of
--                       portal_processor only.
-- Removed since 2B-3: portal_api, portal_client, portal_staff.
-- ---------------------------------------------------------------------
create role portal_server nologin noinherit;
grant authenticated to portal_server;

create role portal_processor nologin;
create role portal_worker nologin noinherit;
grant portal_processor to portal_worker;

grant usage on schema portal_private to authenticated, portal_processor;

-- ---------------------------------------------------------------------
-- Identity helpers (built on Supabase auth.uid() / auth.jwt())
-- ---------------------------------------------------------------------

-- Claims must look like a live Supabase user session: role 'authenticated'
-- and an unexpired exp. Stale or non-user claims yield no identity.
create function portal_private.session_claims_ok()
returns boolean language sql stable security invoker set search_path = '' as $$
  select coalesce(auth.jwt() ->> 'role', '') = 'authenticated'
     and coalesce((auth.jwt() ->> 'exp')::bigint, 0) > extract(epoch from now())::bigint
$$;

-- ELEVATED: reads client_profiles past RLS (avoids self-referencing
-- policies). No arguments; returns only the caller's own profile id.
create function portal_private.current_client_profile_id()
returns uuid language sql stable security definer set search_path = '' as $$
  select c.id
  from portal_private.client_profiles c
  where portal_private.session_claims_ok()
    and c.user_id is not null
    and c.user_id = auth.uid()
$$;

-- ELEVATED: same reason. Returns the caller's staff scope only for an ACTIVE
-- staff profile in a session whose verified JWT says aal = 'aal2'.
-- Only the top-level aal claim counts (never user_metadata / app_metadata).
create function portal_private.current_staff_scope()
returns table (staff_id uuid, organization_id uuid, role text)
language sql stable security definer set search_path = '' as $$
  select s.id, s.organization_id, s.role
  from portal_private.staff_profiles s
  where portal_private.session_claims_ok()
    and s.user_id = auth.uid()
    and s.active
    and (auth.jwt() ->> 'aal') = 'aal2'
$$;

-- Staff scope for one return:
--   PREPARER  → assigned_preparer_id is me AND same organization
--   CPA_ADMIN → same organization
create function portal_private.staff_scope_ok(p_organization_id uuid, p_assigned_preparer_id uuid)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists (
    select 1 from portal_private.current_staff_scope() s
    where s.organization_id = p_organization_id
      and (s.role = 'CPA_ADMIN' or (s.role = 'PREPARER' and s.staff_id = p_assigned_preparer_id))
  )
$$;

-- ---------------------------------------------------------------------
-- STAFF reads: RLS on base tables (role authenticated). A client matches
-- none of these policies, so base tables return no rows to clients.
-- Children inherit visibility from their RLS-filtered parent.
-- DESIGN CONSTRAINT: never add a client policy to a base table without
-- reviewing every child-table staff policy below — the "parent row is
-- visible" pattern would silently extend child rows (hidden fields, jobs,
-- notes, review history) to clients.
-- ---------------------------------------------------------------------
create policy staff_scoped_returns on portal_private.tax_returns
  for select to authenticated
  using (portal_private.staff_scope_ok(organization_id, assigned_preparer_id));

create policy staff_clients_in_scope on portal_private.client_profiles
  for select to authenticated
  using (exists (select 1 from portal_private.tax_returns r where r.client_id = client_profiles.id));

-- myself; my org's staff if CPA_ADMIN; staff assigned to returns I can see
create policy staff_visible_colleagues on portal_private.staff_profiles
  for select to authenticated
  using (
    exists (select 1 from portal_private.current_staff_scope() s
            where s.staff_id = staff_profiles.id
               or (s.role = 'CPA_ADMIN' and s.organization_id = staff_profiles.organization_id))
    or exists (select 1 from portal_private.tax_returns r
               where r.assigned_preparer_id = staff_profiles.id or r.reviewer_id = staff_profiles.id)
  );

create policy staff_own_organization on portal_private.organizations
  for select to authenticated
  using (exists (select 1 from portal_private.current_staff_scope() s where s.organization_id = organizations.id));

create policy staff_scoped_household on portal_private.household_members
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = household_members.tax_return_id));
create policy staff_scoped_situations on portal_private.tax_situations
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = tax_situations.tax_return_id));
create policy staff_scoped_checklist on portal_private.checklist_items
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = checklist_items.tax_return_id));
create policy staff_scoped_documents on portal_private.documents
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = documents.tax_return_id));
create policy staff_scoped_review_actions on portal_private.review_actions
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = review_actions.tax_return_id));
create policy staff_scoped_internal_notes on portal_private.internal_notes
  for select to authenticated using (exists (select 1 from portal_private.tax_returns r where r.id = internal_notes.tax_return_id));
create policy staff_scoped_jobs on portal_private.document_processing_jobs
  for select to authenticated using (exists (select 1 from portal_private.documents d where d.id = document_processing_jobs.document_id));
create policy staff_scoped_fields on portal_private.extracted_fields
  for select to authenticated using (exists (select 1 from portal_private.documents d where d.id = extracted_fields.document_id));
create policy staff_scoped_exceptions on portal_private.document_exceptions
  for select to authenticated using (exists (select 1 from portal_private.documents d where d.id = document_exceptions.document_id));

-- No INSERT / UPDATE / DELETE policies: a mistaken future write grant is
-- still denied by RLS.

-- Staff column set (assigned preparers may see client contact details;
-- auth user ids are never exposed).
grant select (id, display_name, preferred_language, contact_email, contact_phone, city, created_at, updated_at)
  on portal_private.client_profiles to authenticated;
grant select (id, organization_id, display_name, role, active, created_at, updated_at)
  on portal_private.staff_profiles to authenticated;
grant select on
  portal_private.organizations, portal_private.tax_returns, portal_private.household_members,
  portal_private.tax_situations, portal_private.checklist_items, portal_private.documents,
  portal_private.document_processing_jobs, portal_private.extracted_fields, portal_private.document_exceptions,
  portal_private.review_actions, portal_private.internal_notes
  to authenticated;

-- ---------------------------------------------------------------------
-- CLIENT reads: eight narrow SECURITY DEFINER read functions = the
-- complete client data surface (approved Option B, Phase 2B-3.6).
--
-- Why functions and not security_invoker views: there is one shared
-- interactive role (authenticated). Staff need broad base-table column
-- access; clients need a restricted column set. A security_invoker view
-- would need client RLS policies on the base tables, and those would let
-- clients read every column of their own rows directly (confidence,
-- storage keys, assignment…) and would widen the staff child policies that
-- rely on parent visibility. So clients get NO base-table policy and read
-- only through these functions.
--
-- Every client_get_* function:
--   * SECURITY DEFINER, search_path = '', every relation schema-qualified,
--     no dynamic SQL; owner rights are used only inside the function;
--   * identity = portal_private.current_client_profile_id() (auth.uid() +
--     live-session claim checks); no identity arguments;
--   * optional resource selector (p_tax_return_id / p_document_id) only
--     NARROWS the caller's own rows — a foreign or unknown id returns
--     zero rows (no existence information);
--   * returns an explicit client-safe column list (never SELECT *);
--   * cannot be inlined (DEFINER + SET), so caller predicates only ever see
--     rows the function already returned.
-- ---------------------------------------------------------------------
create function portal_private.client_get_profile()
returns table (id uuid, display_name text, preferred_language text, contact_email text, contact_phone text,
               city text, created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select c.id, c.display_name, c.preferred_language, c.contact_email, c.contact_phone, c.city, c.created_at, c.updated_at
  from portal_private.client_profiles c
  where c.id = portal_private.current_client_profile_id()
$$;

create function portal_private.client_get_returns()
returns table (id uuid, tax_year smallint, jurisdictions text[], filing_status text, workflow_status text, return_type text,
               amends_return_id uuid, submitted_at timestamptz, created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select r.id, r.tax_year, r.jurisdictions, r.filing_status, r.workflow_status, r.return_type,
         r.amends_return_id, r.submitted_at, r.created_at, r.updated_at
  from portal_private.tax_returns r
  where r.client_id = portal_private.current_client_profile_id()
  order by r.tax_year desc, r.created_at
$$;

create function portal_private.client_get_household(p_tax_return_id uuid default null)
returns table (id uuid, tax_return_id uuid, relationship text, display_name text, birth_year smallint,
               is_dependent_candidate boolean, created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select h.id, h.tax_return_id, h.relationship, h.display_name, h.birth_year, h.is_dependent_candidate, h.created_at, h.updated_at
  from portal_private.household_members h
  join portal_private.tax_returns r on r.id = h.tax_return_id
  where r.client_id = portal_private.current_client_profile_id()
    and (p_tax_return_id is null or r.id = p_tax_return_id)
  order by h.created_at
$$;

create function portal_private.client_get_situations(p_tax_return_id uuid default null)
returns table (id uuid, tax_return_id uuid, situation_key text, applies boolean, label_en text, label_zh_tw text,
               created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select s.id, s.tax_return_id, s.situation_key, s.applies, s.label_en, s.label_zh_tw, s.created_at, s.updated_at
  from portal_private.tax_situations s
  join portal_private.tax_returns r on r.id = s.tax_return_id
  where r.client_id = portal_private.current_client_profile_id()
    and (p_tax_return_id is null or r.id = p_tax_return_id)
  order by s.created_at
$$;

create function portal_private.client_get_checklist(p_tax_return_id uuid default null)
returns table (id uuid, tax_return_id uuid, type text, label_en text, label_zh_tw text, reason_en text, reason_zh_tw text,
               status text, required_state text, document_type text, situation_key text, related_document_id uuid,
               client_actions text[], created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select i.id, i.tax_return_id, i.type, i.label_en, i.label_zh_tw, i.reason_en, i.reason_zh_tw,
         i.status, i.required_state, i.document_type, i.situation_key, i.related_document_id,
         i.client_actions, i.created_at, i.updated_at
  from portal_private.checklist_items i
  join portal_private.tax_returns r on r.id = i.tax_return_id
  where r.client_id = portal_private.current_client_profile_id()
    and (p_tax_return_id is null or r.id = p_tax_return_id)
  order by i.created_at
$$;

create function portal_private.client_get_documents(p_tax_return_id uuid default null)
returns table (id uuid, tax_return_id uuid, checklist_item_id uuid, document_type text, display_name_en text,
               display_name_zh_tw text, issuer_en text, issuer_zh_tw text, upload_status text, review_status text,
               supersedes_document_id uuid, uploaded_at timestamptz, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select d.id, d.tax_return_id, d.checklist_item_id, d.document_type, d.display_name_en,
         d.display_name_zh_tw, d.issuer_en, d.issuer_zh_tw, d.upload_status, d.review_status,
         d.supersedes_document_id, d.uploaded_at, d.created_at
  from portal_private.documents d
  join portal_private.tax_returns r on r.id = d.tax_return_id
  where r.client_id = portal_private.current_client_profile_id()
    and (p_tax_return_id is null or r.id = p_tax_return_id)
  order by d.created_at
$$;

-- client_visible = true is mandatory here.
create function portal_private.client_get_fields(p_document_id uuid default null)
returns table (id uuid, document_id uuid, field_key text, client_label_en text, client_label_zh_tw text, value_type text,
               value_amount numeric, value_text text, value_date date, value_boolean boolean)
language sql stable security definer set search_path = '' as $$
  select f.id, f.document_id, f.field_key, f.client_label_en, f.client_label_zh_tw, f.value_type,
         f.value_amount, f.value_text, f.value_date, f.value_boolean
  from portal_private.extracted_fields f
  join portal_private.documents d on d.id = f.document_id
  join portal_private.tax_returns r on r.id = d.tax_return_id
  where f.client_visible
    and r.client_id = portal_private.current_client_profile_id()
    and (p_document_id is null or d.id = p_document_id)
  order by f.document_id, f.field_key
$$;

-- exception TYPE + STATUS only; the server maps them to generic client wording
create function portal_private.client_get_document_issues(p_document_id uuid default null)
returns table (document_id uuid, type text, status text)
language sql stable security definer set search_path = '' as $$
  select e.document_id, e.type, e.status
  from portal_private.document_exceptions e
  join portal_private.documents d on d.id = e.document_id
  join portal_private.tax_returns r on r.id = d.tax_return_id
  where r.client_id = portal_private.current_client_profile_id()
    and (p_document_id is null or d.id = p_document_id)
  order by e.document_id, e.created_at
$$;

-- ---------------------------------------------------------------------
-- Internal helpers (owner-only; called from inside command functions)
-- ---------------------------------------------------------------------
create function portal_private._deny()
returns void language plpgsql security invoker set search_path = '' as $$
begin
  -- one message for "missing" and "not yours": no existence oracle
  raise exception 'not found or not authorized' using errcode = '42501';
end;
$$;

create function portal_private._staff_can_access_return(p_return_id uuid)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists (
    select 1 from portal_private.tax_returns r
    where r.id = p_return_id and portal_private.staff_scope_ok(r.organization_id, r.assigned_preparer_id)
  )
$$;

create function portal_private._field_value(f portal_private.extracted_fields)
returns jsonb language sql immutable security invoker set search_path = '' as $$
  select jsonb_build_object('type', f.value_type, 'value',
    coalesce(to_jsonb(f.value_amount), to_jsonb(f.value_text), to_jsonb(f.value_date), to_jsonb(f.value_boolean)))
$$;

-- Recompute a processed document's review_status (mirrors syncDocuments).
create function portal_private._sync_document(p_document_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  v_waiting boolean;
  v_open boolean;
begin
  if not exists (select 1 from portal_private.document_processing_jobs j
                 where j.document_id = p_document_id and j.status = 'COMPLETED') then
    return;
  end if;
  select exists (select 1 from portal_private.document_exceptions e
                 join portal_private.checklist_items c on c.related_exception_id = e.id
                 where e.document_id = p_document_id and e.status = 'OPEN' and c.status = 'NEEDED'),
         exists (select 1 from portal_private.document_exceptions e
                 where e.document_id = p_document_id and e.status = 'OPEN')
    into v_waiting, v_open;
  update portal_private.documents d
     set review_status = case when v_waiting then 'WAITING_ON_CLIENT' when v_open then 'NEEDS_REVIEW' else 'ACCEPTED' end
   where d.id = p_document_id;
end;
$$;

-- Recompute a submitted return's workflow status (mirrors syncWorkflow).
create function portal_private._sync_return(p_return_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  v_ret record;
  v_owes boolean;
  v_open boolean;
begin
  select r.submitted_at, r.workflow_status into v_ret from portal_private.tax_returns r where r.id = p_return_id;
  if v_ret.submitted_at is null
     or v_ret.workflow_status not in ('DOCUMENT_COLLECTION', 'DOCUMENT_REVIEW', 'READY_FOR_PREPARATION') then
    return;
  end if;
  v_owes := exists (select 1 from portal_private.checklist_items c where c.tax_return_id = p_return_id and c.status = 'NEEDED');
  v_open := exists (select 1 from portal_private.document_exceptions e
                    join portal_private.documents d on d.id = e.document_id
                    where d.tax_return_id = p_return_id and e.status = 'OPEN');
  update portal_private.tax_returns r
     set workflow_status = case when v_owes then 'DOCUMENT_COLLECTION' when v_open then 'DOCUMENT_REVIEW' else 'READY_FOR_PREPARATION' end,
         submitted_at    = case when v_owes then null else r.submitted_at end
   where r.id = p_return_id;
end;
$$;

create function portal_private._open_exception_for_staff(
  p_exception_id uuid,
  out id uuid, out document_id uuid, out field_id uuid, out type text, out tax_return_id uuid)
language plpgsql security invoker set search_path = '' as $$
declare
  v_status text;
begin
  select e.id, e.document_id, e.field_id, e.type, e.status, d.tax_return_id
    into id, document_id, field_id, type, v_status, tax_return_id
    from portal_private.document_exceptions e
    join portal_private.documents d on d.id = e.document_id
   where e.id = p_exception_id
   for update of e;
  if not found or not portal_private._staff_can_access_return(tax_return_id) then
    perform portal_private._deny();
  end if;
  if v_status <> 'OPEN' then
    raise exception 'exception is not open' using errcode = '55000';
  end if;
end;
$$;

-- ---------------------------------------------------------------------
-- CLIENT commands (ELEVATED: no write privileges exist)
-- Approved: "provided / received" comes ONLY from the future upload /
-- structured-data pipeline. A client may only say an offered item does
-- not apply, or undo that.
-- ---------------------------------------------------------------------
create function portal_private.client_respond_to_item(p_item_id uuid, p_response text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  v_client uuid := portal_private.current_client_profile_id();
  v_item record;
  v_new text;
begin
  if v_client is null then perform portal_private._deny(); end if;
  select i.id, i.tax_return_id, i.status, i.client_actions, r.client_id, r.workflow_status
    into v_item
    from portal_private.checklist_items i
    join portal_private.tax_returns r on r.id = i.tax_return_id
   where i.id = p_item_id
   for update of i;
  if not found or v_item.client_id <> v_client or cardinality(v_item.client_actions) = 0 then
    perform portal_private._deny();
  end if;
  if v_item.workflow_status not in ('INTAKE', 'DOCUMENT_COLLECTION', 'DOCUMENT_REVIEW', 'READY_FOR_PREPARATION') then
    raise exception 'this return can no longer be changed' using errcode = '55000';
  end if;
  v_new := case
    when p_response = 'NOT_APPLICABLE' and v_item.status = 'NEEDED'
         and v_item.client_actions && array['dontHave', 'notApplicable']::text[] then 'NOT_APPLICABLE'
    when p_response = 'UNDO' and v_item.status = 'NOT_APPLICABLE' then 'NEEDED'
  end;
  if v_new is null then
    raise exception 'response not allowed for this item' using errcode = '22023';
  end if;
  update portal_private.checklist_items set status = v_new where id = v_item.id;
  if v_new = 'NEEDED' then
    update portal_private.tax_returns
       set submitted_at = null,
           workflow_status = case when workflow_status = 'INTAKE' then 'INTAKE' else 'DOCUMENT_COLLECTION' end
     where id = v_item.tax_return_id;
  else
    perform portal_private._sync_return(v_item.tax_return_id);
  end if;
  return v_new;
end;
$$;

create function portal_private.client_submit_return(p_return_id uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare
  v_client uuid := portal_private.current_client_profile_id();
  v_ret record;
  v_status text;
begin
  if v_client is null then perform portal_private._deny(); end if;
  select r.id, r.client_id, r.workflow_status into v_ret from portal_private.tax_returns r where r.id = p_return_id for update;
  if not found or v_ret.client_id <> v_client then perform portal_private._deny(); end if;
  if v_ret.workflow_status not in ('INTAKE', 'DOCUMENT_COLLECTION') then
    raise exception 'return already submitted' using errcode = '55000';
  end if;
  if exists (select 1 from portal_private.checklist_items c where c.tax_return_id = p_return_id and c.status = 'NEEDED') then
    raise exception 'items are still needed' using errcode = '55000';
  end if;
  update portal_private.tax_returns set submitted_at = now(), workflow_status = 'DOCUMENT_COLLECTION' where id = p_return_id;
  perform portal_private._sync_return(p_return_id);
  select workflow_status into v_status from portal_private.tax_returns where id = p_return_id;
  return v_status;
end;
$$;

-- ---------------------------------------------------------------------
-- STAFF commands (ELEVATED). Each: caller from auth.uid() (active staff,
-- aal2) → return in caller's scope → change + ReviewAction with the caller
-- as actor (no actor argument exists).
-- ---------------------------------------------------------------------
create function portal_private.staff_confirm_field(p_exception_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v record;
  s record;
  f portal_private.extracted_fields;
  v_action uuid;
begin
  select * into v from portal_private._open_exception_for_staff(p_exception_id);
  select * into s from portal_private.current_staff_scope();
  if v.field_id is null then raise exception 'not a field-level exception' using errcode = '22023'; end if;
  update portal_private.extracted_fields set review_status = 'HUMAN_CONFIRMED' where id = v.field_id returning * into f;
  update portal_private.document_exceptions set status = 'RESOLVED', resolved_at = now(), resolved_by = s.staff_id where id = v.id;
  insert into portal_private.review_actions (tax_return_id, document_id, exception_id, actor_staff_id, actor_role, action, previous_value, new_value)
  values (v.tax_return_id, v.document_id, v.id, s.staff_id, s.role, 'CONFIRM_VALUE', portal_private._field_value(f), portal_private._field_value(f))
  returning id into v_action;
  perform portal_private._sync_document(v.document_id);
  perform portal_private._sync_return(v.tax_return_id);
  return v_action;
end;
$$;

create function portal_private.staff_correct_field(
  p_exception_id uuid, p_amount numeric default null, p_text text default null,
  p_date date default null, p_boolean boolean default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v record;
  s record;
  before_f portal_private.extracted_fields;
  after_f portal_private.extracted_fields;
  v_action uuid;
begin
  select * into v from portal_private._open_exception_for_staff(p_exception_id);
  select * into s from portal_private.current_staff_scope();
  if v.field_id is null then raise exception 'not a field-level exception' using errcode = '22023'; end if;
  select * into before_f from portal_private.extracted_fields where id = v.field_id for update;
  if num_nonnulls(p_amount, p_text, p_date, p_boolean) <> 1
     or (before_f.value_type = 'USD' and p_amount is null)
     or (before_f.value_type = 'TEXT' and p_text is null)
     or (before_f.value_type = 'DATE' and p_date is null)
     or (before_f.value_type = 'BOOLEAN' and p_boolean is null) then
    raise exception 'correction must be one value of type %', before_f.value_type using errcode = '22023';
  end if;
  update portal_private.extracted_fields
     set value_amount = p_amount, value_text = p_text, value_date = p_date, value_boolean = p_boolean,
         original_value_amount  = coalesce(original_value_amount,  before_f.value_amount),
         original_value_text    = coalesce(original_value_text,    before_f.value_text),
         original_value_date    = coalesce(original_value_date,    before_f.value_date),
         original_value_boolean = coalesce(original_value_boolean, before_f.value_boolean),
         review_status = 'HUMAN_CORRECTED'
   where id = v.field_id
   returning * into after_f;
  update portal_private.document_exceptions set status = 'RESOLVED', resolved_at = now(), resolved_by = s.staff_id where id = v.id;
  insert into portal_private.review_actions (tax_return_id, document_id, exception_id, actor_staff_id, actor_role, action, previous_value, new_value)
  values (v.tax_return_id, v.document_id, v.id, s.staff_id, s.role, 'CORRECT_VALUE', portal_private._field_value(before_f), portal_private._field_value(after_f))
  returning id into v_action;
  perform portal_private._sync_document(v.document_id);
  perform portal_private._sync_return(v.tax_return_id);
  return v_action;
end;
$$;

create function portal_private.staff_request_document(
  p_exception_id uuid, p_label_en text, p_reason_en text, p_label_zh_tw text default null, p_reason_zh_tw text default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v record;
  s record;
  v_item uuid;
begin
  select * into v from portal_private._open_exception_for_staff(p_exception_id);
  select * into s from portal_private.current_staff_scope();
  if exists (select 1 from portal_private.checklist_items c where c.related_exception_id = v.id and c.status = 'NEEDED') then
    raise exception 'a request is already waiting on the client' using errcode = '55000';
  end if;
  insert into portal_private.checklist_items (tax_return_id, type, label_en, label_zh_tw, reason_en, reason_zh_tw, status,
                                              required_state, source, document_type, related_document_id, related_exception_id, client_actions)
  select v.tax_return_id, 'FOLLOW_UP', p_label_en, p_label_zh_tw, p_reason_en, p_reason_zh_tw, 'NEEDED',
         'REQUIRED', 'PREPARER', d.document_type, v.document_id, v.id, array['upload', 'ask']
    from portal_private.documents d where d.id = v.document_id
  returning id into v_item;
  insert into portal_private.review_actions (tax_return_id, document_id, exception_id, actor_staff_id, actor_role, action, new_value)
  values (v.tax_return_id, v.document_id, v.id, s.staff_id, s.role,
          case when v.type = 'MISSING_PAGE' then 'REQUEST_MISSING_PAGES' else 'REQUEST_CLEARER_DOCUMENT' end,
          jsonb_build_object('checklistItemId', v_item));
  perform portal_private._sync_document(v.document_id);
  perform portal_private._sync_return(v.tax_return_id);
  return v_item;
end;
$$;

create function portal_private.staff_dismiss_exception(p_exception_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v record;
  s record;
  v_action uuid;
begin
  select * into v from portal_private._open_exception_for_staff(p_exception_id);
  select * into s from portal_private.current_staff_scope();
  update portal_private.document_exceptions set status = 'DISMISSED', resolved_at = now(), resolved_by = s.staff_id where id = v.id;
  insert into portal_private.review_actions (tax_return_id, document_id, exception_id, actor_staff_id, actor_role, action, previous_value)
  values (v.tax_return_id, v.document_id, v.id, s.staff_id, s.role, 'DISMISS_EXCEPTION', jsonb_build_object('type', v.type))
  returning id into v_action;
  perform portal_private._sync_document(v.document_id);
  perform portal_private._sync_return(v.tax_return_id);
  return v_action;
end;
$$;

create function portal_private.staff_add_internal_note(p_return_id uuid, p_body text, p_document_id uuid default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  s record;
  v_note uuid;
begin
  if not portal_private._staff_can_access_return(p_return_id) then perform portal_private._deny(); end if;
  if p_document_id is not null and not exists (
       select 1 from portal_private.documents d where d.id = p_document_id and d.tax_return_id = p_return_id) then
    perform portal_private._deny();
  end if;
  select * into s from portal_private.current_staff_scope();
  insert into portal_private.internal_notes (tax_return_id, document_id, author_staff_id, body)
  values (p_return_id, p_document_id, s.staff_id, p_body)
  returning id into v_note;
  return v_note;
end;
$$;

-- CPA_ADMIN only, own organization only. The 2B-2 composite FKs also
-- enforce assignee role + organization.
create function portal_private.admin_assign_return(p_return_id uuid, p_preparer_id uuid, p_reviewer_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  s record;
  v_org uuid;
begin
  select * into s from portal_private.current_staff_scope();
  select r.organization_id into v_org from portal_private.tax_returns r where r.id = p_return_id for update;
  if s.staff_id is null or s.role <> 'CPA_ADMIN' or v_org is null or v_org <> s.organization_id then
    perform portal_private._deny();
  end if;
  if (p_preparer_id is not null and not exists (select 1 from portal_private.staff_profiles p
        where p.id = p_preparer_id and p.organization_id = s.organization_id and p.role = 'PREPARER' and p.active))
     or (p_reviewer_id is not null and not exists (select 1 from portal_private.staff_profiles p
        where p.id = p_reviewer_id and p.organization_id = s.organization_id and p.role = 'CPA_ADMIN' and p.active)) then
    raise exception 'assignee must be an active % in your organization', 'PREPARER / CPA_ADMIN' using errcode = '22023';
  end if;
  update portal_private.tax_returns set assigned_preparer_id = p_preparer_id, reviewer_id = p_reviewer_id where id = p_return_id;
end;
$$;

-- ---------------------------------------------------------------------
-- DOCUMENT PROCESSOR commands (ELEVATED; not interactive Auth).
-- Capability = (job id, document id) of a live job. QUEUED to start
-- (single use); PROCESSING and within the processing window to report.
-- The 15-minute window is PROVISIONAL (approved as provisional).
-- The processor never decides Ready / auto-accept: fields are stored
-- NEEDS_REVIEW and not client-visible, whatever the payload says.
-- ---------------------------------------------------------------------
create function portal_private.processor_start_job(p_job_id uuid, p_document_id uuid)
returns table (storage_object_id text, document_type text)
language plpgsql security definer set search_path = '' as $$
declare
  v record;
begin
  select j.id, j.status, d.upload_status, d.storage_object_id, d.document_type
    into v
    from portal_private.document_processing_jobs j
    join portal_private.documents d on d.id = j.document_id
   where j.id = p_job_id and j.document_id = p_document_id
   for update of j;
  if not found or v.status <> 'QUEUED' or v.upload_status <> 'UPLOADED' then
    raise exception 'job not available for this document' using errcode = '42501';
  end if;
  update portal_private.document_processing_jobs set status = 'PROCESSING', started_at = now() where id = p_job_id;
  update portal_private.documents set processing_status = 'PROCESSING' where id = p_document_id;
  return query select v.storage_object_id, v.document_type;
end;
$$;

-- p_fields:   [{field_key, label_en, label_zh_tw?, value_type, value, confidence?, source_page?}, ...]
-- p_findings: [{type, severity, message, field_key?}, ...]   (provider-neutral)
create function portal_private.processor_complete_job(
  p_job_id uuid, p_document_id uuid, p_overall_confidence numeric, p_validation_status text,
  p_fields jsonb default '[]'::jsonb, p_findings jsonb default '[]'::jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  v record;
  v_count integer;
begin
  select j.id, j.status, j.started_at into v
    from portal_private.document_processing_jobs j
   where j.id = p_job_id and j.document_id = p_document_id
   for update;
  if not found or v.status <> 'PROCESSING' or v.started_at < now() - interval '15 minutes' then
    raise exception 'job not available for this document' using errcode = '42501';
  end if;
  if jsonb_typeof(p_fields) <> 'array' or jsonb_typeof(p_findings) <> 'array' then
    raise exception 'fields and findings must be arrays' using errcode = '22023';
  end if;

  insert into portal_private.extracted_fields (
    document_id, processing_job_id, field_key, label_en, label_zh_tw, value_type,
    value_amount, value_text, value_date, value_boolean,
    original_value_amount, original_value_text, original_value_date, original_value_boolean,
    confidence, review_status, client_visible, source_page)
  select p_document_id, p_job_id, f ->> 'field_key', f ->> 'label_en', f ->> 'label_zh_tw', f ->> 'value_type',
         case when f ->> 'value_type' = 'USD' then (f ->> 'value')::numeric(14, 2) end,
         case when f ->> 'value_type' = 'TEXT' then f ->> 'value' end,
         case when f ->> 'value_type' = 'DATE' then (f ->> 'value')::date end,
         case when f ->> 'value_type' = 'BOOLEAN' then (f ->> 'value')::boolean end,
         case when f ->> 'value_type' = 'USD' then (f ->> 'value')::numeric(14, 2) end,
         case when f ->> 'value_type' = 'TEXT' then f ->> 'value' end,
         case when f ->> 'value_type' = 'DATE' then (f ->> 'value')::date end,
         case when f ->> 'value_type' = 'BOOLEAN' then (f ->> 'value')::boolean end,
         (f ->> 'confidence')::numeric(5, 4),
         'NEEDS_REVIEW',
         false,
         (f ->> 'source_page')::integer
    from jsonb_array_elements(p_fields) f;
  get diagnostics v_count = row_count;

  insert into portal_private.document_exceptions (document_id, field_id, type, severity, message)
  select p_document_id, ef.id, x ->> 'type', x ->> 'severity', x ->> 'message'
    from jsonb_array_elements(p_findings) x
    left join portal_private.extracted_fields ef
      on ef.processing_job_id = p_job_id and ef.field_key = x ->> 'field_key';

  update portal_private.document_processing_jobs
     set status = 'COMPLETED', completed_at = now(), overall_confidence = p_overall_confidence,
         validation_status = p_validation_status, requires_human_review = true
   where id = p_job_id;
  update portal_private.documents set processing_status = 'COMPLETED', review_status = 'NEEDS_REVIEW' where id = p_document_id;
  return v_count;
end;
$$;

create function portal_private.processor_fail_job(p_job_id uuid, p_document_id uuid, p_failure_code text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update portal_private.document_processing_jobs j
     set status = 'FAILED', failure_code = p_failure_code, completed_at = now()
   where j.id = p_job_id and j.document_id = p_document_id and j.status in ('QUEUED', 'PROCESSING');
  if not found then
    raise exception 'job not available for this document' using errcode = '42501';
  end if;
  update portal_private.documents set processing_status = 'FAILED' where id = p_document_id;
end;
$$;

-- ---------------------------------------------------------------------
-- Function privileges: nothing for PUBLIC / anon / service_role.
-- authenticated: interactive commands + the helpers its RLS policies call.
-- Command functions re-check identity themselves, so being authenticated
-- is never enough (a client calling a staff command is rejected inside).
-- portal_processor: processor commands only.
-- ---------------------------------------------------------------------
revoke all on all functions in schema portal_private from public, anon, authenticated, service_role;

grant execute on function
  portal_private.client_get_profile(),
  portal_private.client_get_returns(),
  portal_private.client_get_household(uuid),
  portal_private.client_get_situations(uuid),
  portal_private.client_get_checklist(uuid),
  portal_private.client_get_documents(uuid),
  portal_private.client_get_fields(uuid),
  portal_private.client_get_document_issues(uuid),
  portal_private.current_staff_scope(),
  portal_private.staff_scope_ok(uuid, uuid),
  portal_private.client_respond_to_item(uuid, text),
  portal_private.client_submit_return(uuid),
  portal_private.staff_confirm_field(uuid),
  portal_private.staff_correct_field(uuid, numeric, text, date, boolean),
  portal_private.staff_request_document(uuid, text, text, text, text),
  portal_private.staff_dismiss_exception(uuid),
  portal_private.staff_add_internal_note(uuid, text, uuid),
  portal_private.admin_assign_return(uuid, uuid, uuid)
  to authenticated;
grant execute on function
  portal_private.processor_start_job(uuid, uuid),
  portal_private.processor_complete_job(uuid, uuid, numeric, text, jsonb, jsonb),
  portal_private.processor_fail_job(uuid, uuid, text)
  to portal_processor;

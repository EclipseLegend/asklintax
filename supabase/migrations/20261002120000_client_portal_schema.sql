-- =====================================================================
-- AskLinTax Client Portal — Phase 2B-2 schema (DEVELOPMENT DESIGN)
--
-- Relational implementation of the approved Phase 2A domain model
-- (lib/portal-model.js, docs/client-portal-architecture.md).
--
-- * Schema only. No rows, no users, no seed data, no storage bucket.
-- * All portal tables live in the PRIVATE schema portal_private, which
--   is not exposed through the Data API and has no grants to API roles.
--   Any future API access must be designed explicitly (Phase 2B-3+).
-- * Row Level Security is ENABLED on every table with NO policies, so
--   client (anon / authenticated) access fails closed. Policies arrive
--   in Phase 2B-3 together with their tests.
-- * No privileges are granted to anon or authenticated.
-- * No SSN / ITIN / passport / driver's license / bank account columns.
--   Those require a separate security design.
-- * No document bytes, no public URLs, no raw processor responses.
-- * Delete behaviour is RESTRICT everywhere until a retention and
--   deletion policy is approved.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Private application schema. Not listed in the Data API's exposed
-- schemas; no usage for public / anon / authenticated.
-- ---------------------------------------------------------------------
create schema portal_private;
revoke all on schema portal_private from public, anon, authenticated, service_role;
alter default privileges in schema portal_private revoke all on tables from public, anon, authenticated;
alter default privileges in schema portal_private revoke all on functions from public, anon, authenticated;
alter default privileges in schema portal_private revoke all on sequences from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- Shared: updated_at maintenance
-- ---------------------------------------------------------------------
create function portal_private.portal_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- organizations — the CPA firm boundary used by CPA_ADMIN scope.
-- (Phase 2A carried organizationId as a bare value; a table is needed
--  so the scope is a real foreign key, not an unchecked string.)
-- ---------------------------------------------------------------------
create table portal_private.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 200),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- client_profiles — one taxpayer. Identity lives in auth.users.
-- user_id is nullable so a profile can exist before the client accepts
-- an invitation; once set it is unique (one profile per login).
-- ---------------------------------------------------------------------
create table portal_private.client_profiles (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid unique references auth.users (id) on delete restrict,
  display_name        text not null check (char_length(display_name) between 1 and 200),
  preferred_language  text not null default 'en' check (preferred_language in ('en', 'zh-tw')),
  contact_email       text check (contact_email is null or contact_email ~ '^[^@\s]+@[^@\s]+$'),
  contact_phone       text check (contact_phone is null or char_length(contact_phone) <= 40),
  city                text check (city is null or char_length(city) <= 200),
  -- Household members live in portal_private.household_members (per return).
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- staff_profiles — PREPARER or CPA_ADMIN, member of exactly one org.
-- DOCUMENT_PROCESSOR is deliberately NOT a row here: it is a
-- server-side job identity, never a login (see architecture doc).
-- ---------------------------------------------------------------------
create table portal_private.staff_profiles (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null unique references auth.users (id) on delete restrict,
  organization_id  uuid not null references portal_private.organizations (id) on delete restrict,
  display_name     text not null check (char_length(display_name) between 1 and 200),
  role             text not null check (role in ('PREPARER', 'CPA_ADMIN')),
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  -- target for composite FKs that keep assignments inside one org AND role
  unique (id, organization_id),
  unique (id, organization_id, role)
);

-- ---------------------------------------------------------------------
-- tax_returns — one client, one tax year, one organization.
--
-- Staff assignment (D6) is enforced by constraints alone, no trigger:
-- each assignment FK includes a generated constant role column, so
--   assigned_preparer_id must be a PREPARER in the same organization,
--   reviewer_id          must be a CPA_ADMIN in the same organization,
-- and a later role or organization change on an assigned staff profile
-- is rejected by the same FKs (ON UPDATE RESTRICT).
--
-- Lineage (D9): ORIGINAL or AMENDED. An AMENDED return points at the
-- ORIGINAL return of the same client and tax year (composite FK through
-- a generated constant 'ORIGINAL'). Because the target must be an
-- ORIGINAL — which itself points nowhere — lineage is one level deep
-- and loops are impossible. Several amendments of one original are
-- allowed; their order is created_at.
-- ---------------------------------------------------------------------
create table portal_private.tax_returns (
  id                   uuid primary key default gen_random_uuid(),
  client_id            uuid not null references portal_private.client_profiles (id) on delete restrict,
  organization_id      uuid not null references portal_private.organizations (id) on delete restrict,
  tax_year             smallint not null check (tax_year between 2000 and 2100),
  return_type          text not null default 'ORIGINAL' check (return_type in ('ORIGINAL', 'AMENDED')),
  amends_return_id     uuid,
  jurisdictions        text[] not null check (
                         cardinality(jurisdictions) between 1 and 60
                         and array_to_string(jurisdictions, ',') ~ '^US-(FEDERAL|[A-Z]{2})(,US-(FEDERAL|[A-Z]{2}))*$'
                       ),
  -- Format-checked only; the official value list is decision D7.
  filing_status        text check (filing_status is null or filing_status ~ '^[A-Z][A-Z_]{1,60}$'),
  workflow_status      text not null default 'INTAKE' check (workflow_status in (
                         'INTAKE', 'DOCUMENT_COLLECTION', 'DOCUMENT_REVIEW', 'READY_FOR_PREPARATION',
                         'IN_PREPARATION', 'READY_FOR_REVIEW', 'UNDER_REVIEW', 'READY_FOR_CLIENT', 'COMPLETED')),
  assigned_preparer_id uuid,
  reviewer_id          uuid,
  -- constants used only by the composite FKs below
  preparer_role        text not null generated always as ('PREPARER') stored,
  reviewer_role        text not null generated always as ('CPA_ADMIN') stored,
  amends_target_type   text not null generated always as ('ORIGINAL') stored,
  submitted_at         timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  foreign key (assigned_preparer_id, organization_id, preparer_role)
    references portal_private.staff_profiles (id, organization_id, role) on update restrict on delete restrict,
  foreign key (reviewer_id, organization_id, reviewer_role)
    references portal_private.staff_profiles (id, organization_id, role) on update restrict on delete restrict,
  unique (id, organization_id),
  unique (id, client_id, tax_year, return_type),
  foreign key (amends_return_id, client_id, tax_year, amends_target_type)
    references portal_private.tax_returns (id, client_id, tax_year, return_type) on update restrict on delete restrict,
  check ((return_type = 'ORIGINAL') = (amends_return_id is null)),
  check (amends_return_id is null or amends_return_id <> id)
);

-- ---------------------------------------------------------------------
-- household_members — people in the taxpayer's household for one
-- return (spouse, children, other relatives). Display and workflow data
-- only: no SSN / ITIN / full date of birth / passport / bank data / any
-- government identifier. is_dependent_candidate is a workflow flag
-- ("ask about this person"), NOT a legal dependency determination.
-- ---------------------------------------------------------------------
create table portal_private.household_members (
  id                      uuid primary key default gen_random_uuid(),
  tax_return_id           uuid not null references portal_private.tax_returns (id) on delete restrict,
  relationship            text not null check (relationship in ('SPOUSE', 'CHILD', 'OTHER_RELATIVE', 'OTHER')),
  display_name            text not null check (char_length(display_name) between 1 and 200),
  birth_year              smallint check (birth_year is null or birth_year between 1900 and 2100),
  is_dependent_candidate  boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique (id, tax_return_id)
);
-- at most one spouse per return
create unique index household_members_one_spouse_idx on portal_private.household_members (tax_return_id) where relationship = 'SPOUSE';

-- ---------------------------------------------------------------------
-- tax_situations — intake answers that drive the checklist.
-- ---------------------------------------------------------------------
create table portal_private.tax_situations (
  id             uuid primary key default gen_random_uuid(),
  tax_return_id  uuid not null references portal_private.tax_returns (id) on delete restrict,
  situation_key  text not null check (situation_key ~ '^[a-z][a-z0-9_]{0,63}$'),
  applies        boolean not null,
  label_en       text not null check (char_length(label_en) between 1 and 300),
  label_zh_tw    text check (label_zh_tw is null or char_length(label_zh_tw) between 1 and 300),
  source         text not null default 'INTAKE' check (source in ('INTAKE', 'PREPARER', 'AI', 'SYSTEM')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (tax_return_id, situation_key)
);

-- ---------------------------------------------------------------------
-- checklist_items — what has been requested from the client.
-- A FOLLOW_UP item (clearer copy, missing pages) points at the
-- exception that caused it and that exception's document. Which
-- document FULFILS an item is recorded on documents.checklist_item_id
-- (one direction only — see decision D1).
-- ---------------------------------------------------------------------
create table portal_private.checklist_items (
  id                    uuid primary key default gen_random_uuid(),
  tax_return_id         uuid not null references portal_private.tax_returns (id) on delete restrict,
  type                  text not null check (type in ('DOCUMENT', 'INFORMATION', 'FOLLOW_UP')),
  label_en              text not null check (char_length(label_en) between 1 and 300),
  label_zh_tw           text check (label_zh_tw is null or char_length(label_zh_tw) between 1 and 300),
  reason_en             text check (reason_en is null or char_length(reason_en) <= 1000),
  reason_zh_tw          text check (reason_zh_tw is null or char_length(reason_zh_tw) <= 1000),
  status                text not null default 'NEEDED' check (status in ('NEEDED', 'RECEIVED', 'NEEDS_REVIEW', 'RESOLVED', 'NOT_APPLICABLE')),
  required_state        text not null default 'REQUIRED' check (required_state in ('REQUIRED', 'IF_APPLICABLE')),
  source                text not null check (source in ('INTAKE', 'PREPARER', 'AI', 'SYSTEM')),
  document_type         text check (document_type is null or document_type ~ '^[A-Z0-9][A-Z0-9_-]{0,63}$'),
  situation_key         text check (situation_key is null or situation_key ~ '^[a-z][a-z0-9_]{0,63}$'),
  related_document_id   uuid,
  related_exception_id  uuid,
  client_actions        text[] not null default '{}' check (
                          client_actions <@ array['upload', 'dontHave', 'ask', 'addInfo', 'notApplicable']::text[]),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (id, tax_return_id),
  -- an exception link only makes sense on a FOLLOW_UP that names its document
  check (related_exception_id is null or (type = 'FOLLOW_UP' and related_document_id is not null))
);

-- ---------------------------------------------------------------------
-- documents — METADATA ONLY. Bytes live in a future PRIVATE storage
-- bucket; storage_object_id is an opaque key, never a URL.
-- Versioning: a replacement upload is a NEW row whose
-- supersedes_document_id points at the row it replaces. The original
-- row is never overwritten or deleted. A version chain is linear
-- (unique) and cannot cross returns (composite FK).
-- ---------------------------------------------------------------------
create table portal_private.documents (
  id                      uuid primary key default gen_random_uuid(),
  tax_return_id           uuid not null references portal_private.tax_returns (id) on delete restrict,
  checklist_item_id       uuid,
  document_type           text not null check (document_type ~ '^[A-Z0-9][A-Z0-9_-]{0,63}$'),
  display_name_en         text not null check (char_length(display_name_en) between 1 and 300),
  display_name_zh_tw      text check (display_name_zh_tw is null or char_length(display_name_zh_tw) between 1 and 300),
  issuer_en               text check (issuer_en is null or char_length(issuer_en) <= 300),
  issuer_zh_tw            text check (issuer_zh_tw is null or char_length(issuer_zh_tw) <= 300),
  storage_object_id       text unique check (
                            storage_object_id is null or (
                              char_length(storage_object_id) between 1 and 512
                              and storage_object_id !~ '://'
                              and storage_object_id !~ '^//'
                              and storage_object_id !~* '^(https?|ftp|data|blob):')),
  upload_status           text not null default 'PENDING' check (upload_status in ('PENDING', 'UPLOADED', 'FAILED')),
  processing_status       text not null default 'NOT_STARTED' check (processing_status in ('NOT_STARTED', 'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED')),
  review_status           text not null default 'PENDING' check (review_status in ('PENDING', 'NEEDS_REVIEW', 'WAITING_ON_CLIENT', 'ACCEPTED', 'REJECTED')),
  supersedes_document_id  uuid unique,
  uploaded_at             timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique (id, tax_return_id),
  foreign key (checklist_item_id, tax_return_id) references portal_private.checklist_items (id, tax_return_id) on delete restrict,
  foreign key (supersedes_document_id, tax_return_id) references portal_private.documents (id, tax_return_id) on delete restrict,
  check (supersedes_document_id is null or supersedes_document_id <> id),
  check (upload_status <> 'UPLOADED' or (storage_object_id is not null and uploaded_at is not null))
);

-- ---------------------------------------------------------------------
-- document_processing_jobs — provider-neutral. No vendor columns and no
-- raw processor response.
-- ---------------------------------------------------------------------
create table portal_private.document_processing_jobs (
  id                     uuid primary key default gen_random_uuid(),
  document_id            uuid not null references portal_private.documents (id) on delete restrict,
  processor              text not null check (processor ~ '^[a-z0-9][a-z0-9._-]{0,63}$'),
  processor_version      text not null check (char_length(processor_version) between 1 and 64),
  status                 text not null default 'QUEUED' check (status in ('NOT_STARTED', 'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED')),
  validation_status      text not null default 'NOT_RUN' check (validation_status in ('NOT_RUN', 'PASSED', 'FAILED')),
  overall_confidence     numeric(5, 4) check (overall_confidence is null or overall_confidence between 0 and 1),
  requires_human_review  boolean not null default false,
  failure_code           text check (failure_code is null or failure_code ~ '^[A-Z][A-Z0-9_]{0,63}$'),
  started_at             timestamptz,
  completed_at           timestamptz,
  created_at             timestamptz not null default now(),
  unique (id, document_id),
  check (completed_at is null or started_at is null or completed_at >= started_at),
  check (status <> 'COMPLETED' or completed_at is not null),
  check (status <> 'FAILED' or failure_code is not null)
);

-- ---------------------------------------------------------------------
-- extracted_fields — one typed value per row, field-level confidence.
-- Exactly one typed column is used, chosen by value_type; the value may
-- be absent (NULL) when it could not be read. original_* keeps the
-- processor's value when staff correct it. document_id is kept (and
-- forced to match the job's document) so exceptions can reference a
-- field of the SAME document.
-- ---------------------------------------------------------------------
create table portal_private.extracted_fields (
  id                      uuid primary key default gen_random_uuid(),
  document_id             uuid not null,
  processing_job_id       uuid not null,
  field_key               text not null check (field_key ~ '^[a-z][A-Za-z0-9_]{0,63}$'),
  label_en                text not null check (char_length(label_en) between 1 and 300),
  label_zh_tw             text check (label_zh_tw is null or char_length(label_zh_tw) between 1 and 300),
  client_label_en         text check (client_label_en is null or char_length(client_label_en) between 1 and 300),
  client_label_zh_tw      text check (client_label_zh_tw is null or char_length(client_label_zh_tw) between 1 and 300),
  value_type              text not null check (value_type in ('USD', 'TEXT', 'DATE', 'BOOLEAN')),
  value_amount            numeric(14, 2),
  value_text              text check (value_text is null or char_length(value_text) <= 2000),
  value_date              date,
  value_boolean           boolean,
  original_value_amount   numeric(14, 2),
  original_value_text     text check (original_value_text is null or char_length(original_value_text) <= 2000),
  original_value_date     date,
  original_value_boolean  boolean,
  confidence              numeric(5, 4) check (confidence is null or confidence between 0 and 1),
  review_status           text not null default 'NEEDS_REVIEW' check (review_status in (
                            'AUTO_ACCEPTED', 'NEEDS_REVIEW', 'HUMAN_CONFIRMED', 'HUMAN_CORRECTED', 'REJECTED')),
  client_visible          boolean not null default false,
  source_page             integer check (source_page is null or source_page between 1 and 10000),
  source_ref              text check (source_ref is null or char_length(source_ref) <= 200),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique (id, document_id),
  unique (processing_job_id, field_key),
  foreign key (processing_job_id, document_id) references portal_private.document_processing_jobs (id, document_id) on delete restrict,
  -- only the column matching value_type may hold a value
  check (
    (value_type = 'USD'     or (value_amount  is null and original_value_amount  is null)) and
    (value_type = 'TEXT'    or (value_text    is null and original_value_text    is null)) and
    (value_type = 'DATE'    or (value_date    is null and original_value_date    is null)) and
    (value_type = 'BOOLEAN' or (value_boolean is null and original_value_boolean is null))
  ),
  -- a client-visible field must carry a client label
  check (not client_visible or client_label_en is not null)
);

-- ---------------------------------------------------------------------
-- document_exceptions — why a person must look. Document-level when
-- field_id is NULL, field-level otherwise (field must belong to the
-- same document). message is STAFF-ONLY text.
-- ---------------------------------------------------------------------
create table portal_private.document_exceptions (
  id           uuid primary key default gen_random_uuid(),
  document_id  uuid not null references portal_private.documents (id) on delete restrict,
  field_id     uuid,
  type         text not null check (type in (
                 'LOW_CONFIDENCE', 'UNREADABLE', 'MISSING_PAGE', 'DOCUMENT_TYPE_UNCERTAIN', 'DUPLICATE_DOCUMENT',
                 'CONFLICTING_VALUE', 'CHECKLIST_MISMATCH', 'UNEXPECTED_DOCUMENT', 'MANUAL_REVIEW_REQUESTED')),
  severity     text not null check (severity in ('LOW', 'MEDIUM', 'HIGH')),
  message      text not null check (char_length(message) between 1 and 2000),
  status       text not null default 'OPEN' check (status in ('OPEN', 'RESOLVED', 'DISMISSED')),
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  resolved_by  uuid references portal_private.staff_profiles (id) on delete restrict,
  unique (id, document_id),
  foreign key (field_id, document_id) references portal_private.extracted_fields (id, document_id) on delete restrict,
  check ((status = 'OPEN') = (resolved_at is null)),
  check (status <> 'OPEN' or resolved_by is null)
);

-- checklist_items → documents / document_exceptions (added after both tables exist)
alter table portal_private.checklist_items
  add foreign key (related_document_id, tax_return_id) references portal_private.documents (id, tax_return_id) on delete restrict,
  add foreign key (related_exception_id, related_document_id) references portal_private.document_exceptions (id, document_id) on delete restrict;

-- ---------------------------------------------------------------------
-- review_actions — BUSINESS review history (not a security audit log;
-- no immutability is claimed). tax_return_id is kept intentionally for
-- history-by-return queries and is forced consistent with the document.
-- previous_value / new_value are display snapshots of heterogeneous
-- values (amount, text, request reference) — JSON on purpose.
-- ---------------------------------------------------------------------
create table portal_private.review_actions (
  id              uuid primary key default gen_random_uuid(),
  tax_return_id   uuid not null references portal_private.tax_returns (id) on delete restrict,
  document_id     uuid not null,
  exception_id    uuid,
  actor_staff_id  uuid not null references portal_private.staff_profiles (id) on delete restrict,
  actor_role      text not null check (actor_role in ('PREPARER', 'CPA_ADMIN')),
  action          text not null check (action in (
                    'CONFIRM_VALUE', 'CORRECT_VALUE', 'REQUEST_CLEARER_DOCUMENT', 'REQUEST_MISSING_PAGES', 'DISMISS_EXCEPTION')),
  previous_value  jsonb,
  new_value       jsonb,
  occurred_at     timestamptz not null default now(),
  foreign key (document_id, tax_return_id) references portal_private.documents (id, tax_return_id) on delete restrict,
  foreign key (exception_id, document_id) references portal_private.document_exceptions (id, document_id) on delete restrict
);

-- ---------------------------------------------------------------------
-- internal_notes — STAFF-ONLY. Kept in its own table so no client view
-- or client policy ever has to filter it out of client data.
-- ---------------------------------------------------------------------
create table portal_private.internal_notes (
  id               uuid primary key default gen_random_uuid(),
  tax_return_id    uuid not null references portal_private.tax_returns (id) on delete restrict,
  document_id      uuid,
  author_staff_id  uuid not null references portal_private.staff_profiles (id) on delete restrict,
  body             text not null check (char_length(body) between 1 and 10000),
  created_at       timestamptz not null default now(),
  foreign key (document_id, tax_return_id) references portal_private.documents (id, tax_return_id) on delete restrict
);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
create trigger organizations_set_updated_at    before update on portal_private.organizations    for each row execute function portal_private.portal_set_updated_at();
create trigger client_profiles_set_updated_at  before update on portal_private.client_profiles  for each row execute function portal_private.portal_set_updated_at();
create trigger staff_profiles_set_updated_at   before update on portal_private.staff_profiles   for each row execute function portal_private.portal_set_updated_at();
create trigger tax_returns_set_updated_at      before update on portal_private.tax_returns      for each row execute function portal_private.portal_set_updated_at();
create trigger household_members_set_updated_at before update on portal_private.household_members for each row execute function portal_private.portal_set_updated_at();
create trigger tax_situations_set_updated_at   before update on portal_private.tax_situations   for each row execute function portal_private.portal_set_updated_at();
create trigger checklist_items_set_updated_at  before update on portal_private.checklist_items  for each row execute function portal_private.portal_set_updated_at();
create trigger documents_set_updated_at        before update on portal_private.documents        for each row execute function portal_private.portal_set_updated_at();
create trigger extracted_fields_set_updated_at before update on portal_private.extracted_fields for each row execute function portal_private.portal_set_updated_at();

-- ---------------------------------------------------------------------
-- Indexes — authorization and workflow paths only.
-- (Unique constraints above already index: *_profiles.user_id,
--  tax_situations(tax_return_id, situation_key), documents.storage_object_id,
--  documents.supersedes_document_id, extracted_fields(processing_job_id, field_key).)
-- ---------------------------------------------------------------------
create index tax_returns_client_id_idx            on portal_private.tax_returns (client_id);
create index tax_returns_assigned_preparer_id_idx on portal_private.tax_returns (assigned_preparer_id) where assigned_preparer_id is not null;
create index tax_returns_organization_id_idx      on portal_private.tax_returns (organization_id);
create index household_members_tax_return_id_idx on portal_private.household_members (tax_return_id);
create index tax_returns_amends_return_id_idx    on portal_private.tax_returns (amends_return_id) where amends_return_id is not null;
create index checklist_items_tax_return_id_idx    on portal_private.checklist_items (tax_return_id);
create index checklist_items_open_followup_idx    on portal_private.checklist_items (related_exception_id) where related_exception_id is not null;
create index documents_tax_return_id_idx          on portal_private.documents (tax_return_id);
create index documents_checklist_item_id_idx      on portal_private.documents (checklist_item_id) where checklist_item_id is not null;
create index processing_jobs_document_id_idx      on portal_private.document_processing_jobs (document_id);
create index extracted_fields_document_id_idx     on portal_private.extracted_fields (document_id);
create index document_exceptions_document_id_idx  on portal_private.document_exceptions (document_id);
create index document_exceptions_open_idx         on portal_private.document_exceptions (document_id) where status = 'OPEN';
create index review_actions_tax_return_id_idx     on portal_private.review_actions (tax_return_id);
create index internal_notes_tax_return_id_idx     on portal_private.internal_notes (tax_return_id);

-- ---------------------------------------------------------------------
-- Row Level Security: ENABLED, NO POLICIES (fail closed).
-- Phase 2B-3 adds and tests the real policies. Do not add placeholder
-- or "authenticated can read everything" policies.
-- ---------------------------------------------------------------------
alter table portal_private.organizations            enable row level security;
alter table portal_private.client_profiles          enable row level security;
alter table portal_private.staff_profiles           enable row level security;
alter table portal_private.tax_returns              enable row level security;
alter table portal_private.household_members        enable row level security;
alter table portal_private.tax_situations           enable row level security;
alter table portal_private.checklist_items          enable row level security;
alter table portal_private.documents                enable row level security;
alter table portal_private.document_processing_jobs enable row level security;
alter table portal_private.extracted_fields         enable row level security;
alter table portal_private.document_exceptions      enable row level security;
alter table portal_private.review_actions           enable row level security;
alter table portal_private.internal_notes           enable row level security;

-- ---------------------------------------------------------------------
-- Privileges: explicit, nothing for anon / authenticated / service_role.
-- Revoked explicitly in case project default privileges would grant
-- them. Server-side access is not a casual RLS bypass: any grant to
-- authenticated (behind RLS) or to a server-side role is designed and
-- tested in Phase 2B-3.
-- ---------------------------------------------------------------------
revoke all on table
  portal_private.organizations, portal_private.client_profiles, portal_private.staff_profiles, portal_private.tax_returns,
  portal_private.household_members, portal_private.tax_situations, portal_private.checklist_items, portal_private.documents, portal_private.document_processing_jobs,
  portal_private.extracted_fields, portal_private.document_exceptions, portal_private.review_actions, portal_private.internal_notes
from public, anon, authenticated, service_role;

revoke all on function portal_private.portal_set_updated_at() from public, anon, authenticated, service_role;

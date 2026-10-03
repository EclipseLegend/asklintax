# AskLinTax Client Portal — Architecture (Phase 2A design)

Status: **design only.** Today the portal is the static prototype at `/portal-demo/`
(noindex, fictional data). There is no connected database, no authentication, no file
storage, no document processor and no network call carrying portal data. This document
describes the domain model the prototype already uses (`lib/portal-model.js`, sections 1–9)
and its PostgreSQL implementation, drafted as a local migration that has not been applied
anywhere (section 10). Nothing here is a compliance claim.

## 1. Trust boundaries

```
┌──────────────────────────── PUBLIC SITE ────────────────────────────┐
│ Knowledge Library · public Lina (answers from lib/articles.js only) │
│ No access to any client record, document, field or note.            │
└──────────────────────────────────────────────────────────────────────┘
                 (no data path between these two zones)
┌──────────────────────────── CLIENT PORTAL ──────────────────────────┐
│ Authenticated clients and staff · tax-return workflow · checklist   │
│ Private document storage · document processing · exception review   │
│                                                                      │
│   Browser ──(session, RLS)──► Portal API / DB ──► private storage    │
│                                     │                                │
│                                     └─(job-scoped, short-lived)──►   │
│                                          Document processor          │
└──────────────────────────────────────────────────────────────────────┘
```

**Public Lina must never gain access to:** client documents, extracted taxpayer fields,
portal records (returns, checklists, statuses), review history, or internal notes. Its
knowledge index is built only from published Knowledge Library guides. A future
client-aware Portal Assistant would be a **separate** service inside the portal boundary,
with its own authorization, never an extension of the public Lina backend.

## 2. Roles

| Role | Who | Can | Cannot |
|---|---|---|---|
| `CLIENT` | Taxpayer login | Own profile, own returns, own checklist, own documents, client-visible extraction summary; respond to checklist; submit | See internal notes, exception detail, confidence scores; approve AI exceptions |
| `PREPARER` | Staff | Assigned returns only: documents, extracted fields, exceptions, internal notes; resolve exceptions; request documents | Access unassigned clients |
| `CPA_ADMIN` | Staff | Authorized organizational scope; staff oversight; final professional review; role administration (later) | Act outside its organization |
| `DOCUMENT_PROCESSOR` | **Not a human account** — a server-side job identity | Read the one document of a live job; write classification / extraction / confidence for that job | Browse clients or documents, read notes, keep standing storage access |

Permission verbs and scope checks live in `PERMISSIONS` / `can()` in `lib/portal-model.js`
and mirror the intended RLS policies (section 9).

## 3. Entities

| Entity | Purpose | Key fields |
|---|---|---|
| User | Login identity | id, email, role, mfaEnrolled |
| ClientProfile | Taxpayer profile | id, userId, displayName, preferredLanguage, contact, household |
| StaffProfile | Staff member | id, userId, displayName, role, organizationId, active |
| TaxReturn | One client, one year | id, clientId, organizationId, taxYear, jurisdictions, filingStatus, workflowStatus, assignedPreparerId, reviewerId, submittedAt, createdAt, updatedAt |
| TaxSituation | Intake answers | id, taxReturnId, situationKey, applies, label, source |
| ChecklistItem | Something requested | id, taxReturnId, type (DOCUMENT/INFORMATION/FOLLOW_UP), label, reason, status, requiredState, source, documentType, documentId, relatedExceptionId, clientActions |
| Document | File **metadata** | id, taxReturnId, clientId, checklistItemId, documentType, displayName, issuer, storageObjectId, uploadStatus, processingStatus, reviewStatus, uploadedAt |
| DocumentProcessingJob | One processing run | id, documentId, processor, processorVersion, status, startedAt, completedAt, overallConfidence, validationStatus, requiresHumanReview, failureCode |
| ExtractedField | One extracted value | id, documentId, processingJobId, fieldKey, label, clientLabel, valueType, value, originalValue, confidence, reviewStatus, clientVisible, sourcePage, sourceRef |
| DocumentException | Why a person must look | id, documentId, fieldId?, type, severity, message (staff-only), status, followUpItemId, createdAt, resolvedAt, resolvedBy |
| ReviewAction | Business review history | id, taxReturnId, documentId, exceptionId, actorId, actorRole, action, previousValue, newValue, timestamp |
| InternalNote | Staff note | id, taxReturnId, documentId?, authorId, body, createdAt |

Deliberately **absent**: SSN/ITIN, bank account, driver's license and passport numbers,
dates of birth, document bytes, public URLs. Adding any identifier requires its own
reviewed design.

```
User 1─1 ClientProfile 1─* TaxReturn 1─* TaxSituation
User 1─1 StaffProfile ─(assignedPreparerId / reviewerId)─► TaxReturn
TaxReturn 1─* ChecklistItem 0..1─1 Document
TaxReturn 1─* Document 1─* DocumentProcessingJob 1─* ExtractedField
Document 1─* DocumentException 0..1─1 ExtractedField
DocumentException 0..1─1 ChecklistItem (FOLLOW_UP request)
TaxReturn 1─* ReviewAction ─► DocumentException
TaxReturn 1─* InternalNote
```

## 4. Tax return workflow

`INTAKE → DOCUMENT_COLLECTION → DOCUMENT_REVIEW → READY_FOR_PREPARATION → IN_PREPARATION
→ READY_FOR_REVIEW → UNDER_REVIEW → READY_FOR_CLIENT → COMPLETED`

The prototype implements only the first transitions. A client submit moves the return to
`DOCUMENT_REVIEW` (open exceptions) or `READY_FOR_PREPARATION` (none). A new staff request
to the client moves it back to `DOCUMENT_COLLECTION`. Return preparation itself is out of scope.

## 5. Checklist

Items come from intake answers (`INTAKE`), staff (`PREPARER`), processing (`AI`, e.g. the
charitable-receipts item added when those receipts arrived) or the system (`SYSTEM`).
Statuses: `NEEDED`, `RECEIVED`, `NEEDS_REVIEW`, `RESOLVED`, `NOT_APPLICABLE`. The checklist
is not fixed: staff requests (clearer copy, missing pages) add `FOLLOW_UP` items that appear
in the client's Missing Items.

## 6. Document lifecycle

1. Checklist item requests a document.
2. Client uploads → bytes go to the **private** `tax-documents` bucket; a `Document` row
   stores only metadata and an opaque `storageObjectId` (never a public URL).
3. A `DocumentProcessingJob` is queued.
4. Processing results are normalised into `ExtractedField`s plus detected findings.
5. The decision policy (section 7) creates `DocumentException`s and sets the route.
6. Ready → `ACCEPTED`; otherwise `NEEDS_REVIEW`, or `WAITING_ON_CLIENT` when staff asked the
   client for something.
7. Staff resolve each exception; every action is a `ReviewAction`.
8. Retention / deletion per a policy that must be decided before production.

## 7. AI processing and decision policy

The processor is replaceable: the app depends only on `DocumentProcessingJob` and
`ExtractedField`. Provider-specific raw responses are not business records; if kept at all
for debugging, they need their own retention rule and must not contain more than necessary.

Confidence bands in the prototype (**illustrative only, not production thresholds**):
HIGH ≥ 0.90, MEDIUM ≥ 0.75, LOW below.

| Band | Outcome |
|---|---|
| HIGH | Ready **only if** structural validation passes and no exception is open |
| MEDIUM | Only the questionable fields go to review (`FIELD_REVIEW`) |
| LOW | The whole document goes to review (`DOCUMENT_REVIEW`) |

**Confidence alone never approves a document.** These always override a high score and send
the whole document to a person: missing page, unreadable, duplicate, document type
uncertain, checklist mismatch, unexpected document, manual review requested, or failed
structural validation. Conflicting values on a field send at least that field to review.
Policy = confidence + validation + exception rules (`applyDecisionPolicy`, `decideDocument`).

## 8. Exception review

Exception types: `LOW_CONFIDENCE`, `UNREADABLE`, `MISSING_PAGE`, `DOCUMENT_TYPE_UNCERTAIN`,
`DUPLICATE_DOCUMENT`, `CONFLICTING_VALUE`, `CHECKLIST_MISMATCH`, `UNEXPECTED_DOCUMENT`,
`MANUAL_REVIEW_REQUESTED`. Severity `LOW/MEDIUM/HIGH`; status `OPEN/RESOLVED/DISMISSED`.

Staff actions: **Confirm** (field → `HUMAN_CONFIRMED`), **Correct** (new value,
`originalValue` kept, field → `HUMAN_CORRECTED`), **Request clearer document / missing pages**
(adds a client follow-up), **Dismiss**. Each writes a `ReviewAction` with actor, role,
previous and new value. This is a business review history, **not** a tamper-proof audit
log; an immutable audit log is a separate future decision.

## 9. Client vs staff visibility

| Data | Client | Preparer / CPA_ADMIN | Processor |
|---|---|---|---|
| Plain status (Received · Needs attention · Ready) | ✓ | ✓ | – |
| Client-visible extraction summary | ✓ (selected fields) | ✓ | – |
| Confidence band word (High/Medium/Low) | – (approved: confidence stays internal) | ✓ | – |
| Numeric confidence, processor + version | – | ✓ | writes its own job |
| Exception type, severity, staff message | – (generic reason only) | ✓ | – |
| Review history | – | ✓ | – |
| Internal notes | – | ✓ | – |

In the prototype the client screens receive only `toClientView(model)`. **In production this
projection must be enforced server-side** (RLS + API); the prototype bundles all fictional
demo data in the page, which is acceptable only because it is fictional.

## 10. PostgreSQL / Supabase mapping

Four layers, kept distinct:

| Layer | State |
|---|---|
| Approved domain model | `lib/portal-model.js` + sections 1–9 (unchanged) |
| PostgreSQL implementation | `supabase/migrations/20261002120000_client_portal_schema.sql` — local draft in private schema `portal_private`, **not applied** to any project |
| Authorization (grants, RLS, command functions) | `supabase/migrations/20261002130000_client_portal_authorization.sql` — local draft, **not applied** (section 12) |
| Auth / Storage | **Not implemented.** Tables reference `auth.users`; no users, no `tax-documents` bucket |

| Entity | Table |
|---|---|
| User | `auth.users` (Supabase Auth — no application users table, no passwords or MFA data copied) |
| *(organization)* | `organizations` |
| ClientProfile | `client_profiles` |
| ClientProfile.household | `household_members` (per return) |
| StaffProfile | `staff_profiles` |
| TaxReturn | `tax_returns` |
| TaxSituation | `tax_situations` |
| ChecklistItem | `checklist_items` |
| Document | `documents` |
| DocumentProcessingJob | `document_processing_jobs` |
| ExtractedField | `extracted_fields` |
| DocumentException | `document_exceptions` |
| ReviewAction | `review_actions` |
| InternalNote | `internal_notes` |

All tables are in schema `portal_private` (section 10.2).

Private Storage bucket: `tax-documents` (no public access; objects addressed by
`storageObjectId`; short-lived signed access issued server-side per authorized request).

RLS intentions:

- **CLIENT** — own rows only (`client_profiles.user_id = auth.uid()`, and child rows through
  `tax_returns.client_id`). No rows from `document_exceptions` (beyond a server-built generic
  reason), `review_actions` or `internal_notes`.
- **PREPARER** — rows whose `tax_returns.assigned_preparer_id` is the caller's staff profile.
- **CPA_ADMIN** — rows within the caller's authorized organizational scope.
- **DOCUMENT_PROCESSOR** — no user session and no browse permission; a server-side job
  receives a short-lived grant for one document and may write results for that job only.

### 10.1 Relational implementation notes (Phase 2B-2)

**Organizations.** CPA_ADMIN scope needs a real boundary, so `organizations` is a table and
`staff_profiles.organization_id` / `tax_returns.organization_id` are foreign keys. In V1 each
staff member belongs to exactly one organization (approved; no membership table). Multi-
organization staff would need an `organization_memberships` table later.

**Staff assignment.** Enforced by constraints alone, no trigger. `tax_returns` carries generated
constant columns (`preparer_role` = `PREPARER`, `reviewer_role` = `CPA_ADMIN`) that are part of
composite foreign keys to `staff_profiles (id, organization_id, role)`. So the assigned preparer
must be a PREPARER and the reviewer a CPA_ADMIN, both in the return's organization; changing
the role or organization of a staff member who is assigned somewhere is rejected too.

**Identities.** One `auth.users` identity may have both a client profile and a staff profile
(approved). Client and staff authorization are evaluated independently (section 12).

**Household.** `household_members` (per return): `relationship` (`SPOUSE`, `CHILD`,
`OTHER_RELATIVE`, `OTHER`), `display_name`, optional `birth_year`, `is_dependent_candidate`.
At most one spouse per return. No SSN/ITIN, full date of birth, passport, bank data or other
government identifier. `is_dependent_candidate` is workflow metadata ("ask about this person"),
not a legal determination that anyone qualifies as a dependent.

**Return lineage.** `return_type` is `ORIGINAL` or `AMENDED`. An amended return must set
`amends_return_id` to the ORIGINAL return of the same client and tax year (composite FK);
an original must not set it; self-reference is rejected. Because the target must be an
original, lineage is one level deep and loops are impossible; several amendments of one
original are allowed and ordered by `created_at`. There is no uniqueness on (client, year).

**Deltas from the domain model** (mapping only; `lib/portal-model.js` is unchanged):

| Domain model | PostgreSQL | Why |
|---|---|---|
| `Document.checklistItemId` **and** `ChecklistItem.documentId` | only `documents.checklist_item_id` | Two-way links form a cycle and can disagree; the fulfilling document is derived |
| `DocumentException.followUpItemId` **and** `ChecklistItem.relatedExceptionId` | only `checklist_items.related_exception_id` (+ `related_document_id`) | Same cycle; one exception may have several follow-ups over time |
| `Document.clientId` | dropped | Derived through `tax_returns.client_id` |
| `User.mfaEnrolled`, `User.email` | not stored | Owned by Supabase Auth |
| `ClientProfile.household` (object) | `household_members` table | Normalized, minimal, no identifiers |
| *(not in model)* | `tax_returns.return_type`, `amends_return_id` | Original / amended lineage |
| `ReviewAction.actorId` (user id) | `actor_staff_id` → `staff_profiles` | Actions are staff-only; stable staff identity |
| `ExtractedField.value` / `originalValue` | typed columns (below) | Queryable, no floating point |
| bilingual `{en, zh-tw}` labels | `*_en` / `*_zh_tw` columns | Explicit columns instead of JSON |
| value types `USD/TEXT/DATE` | adds `BOOLEAN` | Requested for future forms |

**Intentional denormalization**, always guarded by composite foreign keys so it cannot disagree:
`documents.tax_return_id` (the authorization path), `extracted_fields.document_id` (lets a
field-level exception be forced onto the same document), `review_actions.tax_return_id`
(history by return).

**Same-return integrity.** Composite FKs `(id, tax_return_id)` stop any row from linking to a
checklist item, document, replacement version or review history row of a *different* return —
a cross-client link is rejected by the database, not just by application code.

**Statuses** are `text` columns with `CHECK` lists instead of PostgreSQL enums: values can be
added or removed in a normal migration, and the strings match `lib/portal-model.js` exactly.

**Document versions.** A clearer or replacement upload is a new `documents` row with
`supersedes_document_id` pointing at the version it replaces. The original row is never
overwritten. The chain is linear (unique), cannot cross returns, and is never
self-referencing. `storage_object_id` is an opaque key; URLs are rejected by a CHECK.

**Extracted values.** One row per field with `value_type` (`USD`, `TEXT`, `DATE`, `BOOLEAN`)
and exactly one matching column in use: `value_amount numeric(14,2)`, `value_text`,
`value_date`, `value_boolean`, with the same set of `original_*` columns. Confidence is
`numeric(5,4)` in [0, 1]. A client-visible field must have a client label. Raw processor
output is not stored.

**Deletes** are `RESTRICT` everywhere until a retention and deletion policy is approved.

**RLS state.** Enabled on all 13 tables, **no policies**. With no policy, every client query
returns nothing.

### 10.2 Access layers

| Layer | What it is | State |
|---|---|---|
| Private database schema | `portal_private` holds every portal table. Not in the Data API's exposed schemas; no `usage` for `anon`, `authenticated` or `service_role`; table, function and default privileges revoked for all three | In the migration |
| Controlled API / server access | Server verifies the Supabase JWT, then per transaction `SET LOCAL ROLE authenticated` + transaction-local verified claims; `auth.uid()` drives authorization; no Data API exposure, no `service_role` bypass | Designed and tested locally (section 12) |
| RLS | Mandatory on every table; staff SELECT policies `TO authenticated`; clients read only through `client_get_*` SECURITY DEFINER functions; no write policies | Designed and tested locally (section 12) |
| Storage | Private `tax-documents` bucket; `documents.storage_object_id` is an opaque key, never a URL | Not created |
| Public Lina | Built only from published Knowledge Library guides. **No access** to `portal_private`, Storage or any portal API — no credentials, no grants, no code path | Unchanged |

## 12. Authorization (Phases 2B-3.5 / 2B-3.6 — Supabase-native design, local only)

Status: written as a local migration
(`supabase/migrations/20261002130000_client_portal_authorization.sql`) and attack-tested
against a throwaway local Postgres with Supabase-equivalent `auth.uid()` / `auth.jwt()` and
synthetic identities. It has not been applied to any Supabase project, and no Auth, Storage or
server code exists yet. This is a tested design, not a production-security claim.

### 12.0 Summary of interactive and non-interactive paths

```
CLIENT reads   Supabase Auth JWT → authenticated → narrow SECURITY DEFINER client_get_* function
                 → auth.uid() → explicit client-safe result set
STAFF reads    Supabase Auth JWT + AAL2 → authenticated → base-table RLS
                 → assigned-return (PREPARER) / organization (CPA_ADMIN) scope
Writes         → narrow SECURITY DEFINER command functions (identity from auth.uid())
Processor      → isolated worker functions (portal_worker → portal_processor), not interactive Auth
Public Lina    → zero portal access
```

### 12.1 Boundary and two independent layers

```
Browser ──HTTPS──► AskLinTax server/API ──► Postgres (portal_private)
  (no DB access)    A. server authorization      B. database authorization
                       - verify Supabase JWT        - auth.uid() / auth.jwt()
                       - check the operation        - RLS (staff), client read functions
                       - validate input             - narrow command functions
```

- **A. Server.** Verifies the user's Supabase JWT (signature, expiry). Per request it opens
  ONE transaction and runs:
  ```sql
  SET LOCAL ROLE authenticated;
  SELECT set_config('request.jwt.claims', '<verified claims>', true);  -- true = transaction-local
  ```
  This is the same mechanism Supabase's own Data API (PostgREST) uses.
- **B. Database.** Identity comes only from `auth.uid()` / `auth.jwt()` over those verified
  claims, never from a function argument:
  - client: `auth.uid()` → `client_profiles.user_id` → own returns;
  - staff: `auth.uid()` → `staff_profiles.user_id` → role / organization / assignment, plus
    `aal = 'aal2'`.
- Claims are accepted only if `role = 'authenticated'` and `exp` has not passed. Organization,
  role or AAL values inside `app_metadata` / `user_metadata` are never used.
- `portal_private` stays out of the Data API exposed schemas, so the browser cannot query it
  even though it holds a JWT for the same `authenticated` role. The browser → server → database
  boundary is kept.
- `service_role` has no USAGE on `portal_private` and is not part of portal authorization.
- Trust assumption: the server places only verified claims. Layer B protects against server
  *logic* bugs (wrong IDs, missing checks), not against a compromised server.

### 12.2 Database roles

| Role | Status | Purpose |
|---|---|---|
| `authenticated` (Supabase) | used | The only interactive role. Staff RLS, client read functions, command functions |
| `portal_server` | new (future LOGIN, NOINHERIT) | Server connection role. Holds nothing; may only `SET LOCAL ROLE authenticated` (like Supabase's `authenticator`) |
| `portal_processor` | kept | Document-processing job commands only; no reads |
| `portal_worker` | kept (future LOGIN, NOINHERIT) | May only switch to `portal_processor` |
| `portal_api`, `portal_client`, `portal_staff` | **removed** | Replaced by Supabase `authenticated` + `auth.uid()` |

### 12.3 Reads

- **Staff:** base tables, RLS `TO authenticated` (13 SELECT policies, none `USING (true)`):
  - **PREPARER:** active, same organization, and `assigned_preparer_id` = me. There is no
    organization-wide preparer policy.
  - **CPA_ADMIN:** active, same organization. There is no cross-organization access.
  - Children inherit visibility through their RLS-filtered parent.
  - Staff may see assigned clients' email and phone (approved). Auth user IDs are never
    granted.
- **Clients:** eight narrow `SECURITY DEFINER` read functions are the whole client read surface:
  `client_get_profile()`, `client_get_returns()`, `client_get_household(p_tax_return_id)`,
  `client_get_situations(p_tax_return_id)`, `client_get_checklist(p_tax_return_id)`,
  `client_get_documents(p_tax_return_id)`, `client_get_fields(p_document_id)`,
  `client_get_document_issues(p_document_id)`.
  - Identity comes only from `current_client_profile_id()` (`auth.uid()` plus the live-session
    claim checks). No function takes a client, user, staff, organization, role or AAL argument.
  - The optional return or document id is only a *resource selector*. It narrows the caller's
    own rows, so a foreign or unknown id returns 0 rows with no error: there is no existence
    information.
  - Each function has `search_path = ''`, schema-qualifies every relation, uses no dynamic SQL
    and no `SELECT *`, and returns an explicit client-safe column list. Never returned:
    confidence, staff labels, auth user ids, organization or assignment ids, storage keys,
    processing job or status, original values, and exception message, severity or links.
  - `client_get_fields` requires `client_visible = true`.
  - Definer functions with `SET` cannot be inlined, so a caller's own WHERE predicates only see
    rows the function already returned.
  - EXECUTE goes to `authenticated` only (not PUBLIC, anon or service_role).
  - Clients match no base-table policy: base tables return 0 rows to them, even if a base-table
    grant were added by mistake. They have no read path to internal notes, review history or
    processing jobs.
- **Why functions, not `security_invoker` views (Option B, approved).** The shared
  `authenticated` role cannot give staff their broader base-table column access and clients
  their restricted column access at the same time without weakening client isolation.
  `security_invoker` views would need client RLS policies on the base tables. A local
  experiment showed what that does: clients could then read `confidence`, `storage_object_id`
  and assignment columns of their own rows directly, and, through the staff child policies that
  rely on parent visibility, hidden fields and processing jobs as well.
- **Design constraint.** Never add a client policy to a base table without reviewing every
  child-table staff policy. Several staff child policies grant access because "the parent row is
  visible to me", so any client visibility on a parent would silently extend to those children.
- **Dual-profile users (D10):** client data comes only from the `client_get_*` functions,
  staff data only from staff RLS. A preparer who is also a client sees their own return as a
  client, never as staff, unless they are assigned to it.

### 12.4 Writes: command functions only

No role has INSERT, UPDATE or DELETE on any portal table, and there are no write policies. A
mistaken future grant is still blocked by RLS (tested). Changes go through `SECURITY DEFINER`
functions that are executable by `authenticated`. Each one re-checks identity inside, so being
authenticated is never enough. Each function also:

- has `search_path = ''` and fully qualified names;
- answers "not found or not authorized" for both missing and foreign IDs (no existence
  oracle);
- records the caller as the review actor (there is no actor argument to forge).

| Function | Who | What |
|---|---|---|
| `client_respond_to_item` | client | `NOT_APPLICABLE` on an offered item of the caller's own return, or `UNDO` that. "Provided / received" comes **only** from the future upload / structured-data pipeline (approved) |
| `client_submit_return` | client | Own return, when nothing is NEEDED |
| `staff_confirm_field`, `staff_correct_field` | staff in scope, aal2 | Typed correction; original value kept |
| `staff_request_document` | staff in scope, aal2 | Adds a FOLLOW_UP the client sees but cannot mark N/A |
| `staff_dismiss_exception`, `staff_add_internal_note` | staff in scope, aal2 | — |
| `admin_assign_return` | CPA_ADMIN, own org, aal2 | Active PREPARER / CPA_ADMIN of the same organization |
| `client_get_*` (8) | client | Read functions described in 12.3 |
| `current_client_profile_id`, `current_staff_scope` | internal / staff policies | No arguments; return only the caller's own identity (`current_client_profile_id` is not directly executable by `authenticated`) |

### 12.5 Staff MFA (AAL2)

`current_staff_scope()` returns nothing unless the verified JWT's top-level `aal` claim is
`aal2`. So a staff session without MFA reads no staff rows and every staff command is rejected
in the database, not only in the UI. `aal2` placed in `user_metadata` / `app_metadata` is
ignored. The server must also require AAL2 before routing staff requests. Client MFA remains a
product decision.

### 12.6 Processor isolation (not interactive Auth)

- `portal_processor` has no table privileges and is reachable only through
  `portal_worker`.
- Its capability is the (job id, document id) pair of a live job:
  - start: QUEUED only, single use, returns only that document's storage key and type;
  - complete: PROCESSING only, within a **provisional** 15-minute window.
- Fields are always stored `NEEDS_REVIEW` and not client-visible. The processor never decides
  Ready or auto-accept (approved).

### 12.7 Transaction pooling

- Role and claims are transaction-local (`SET LOCAL`, `set_config(..., true)`), so they end
  at COMMIT / ROLLBACK. This is safe with a transaction-mode pooler.
- Tested on one reused connection:
  - nothing carries over after commit or rollback;
  - client A then client B sees only B;
  - staff then client gets no staff rows.
- The server must **never** set claims or role at session level. A demonstrated session-level
  claim would persist; the `exp` check limits but does not remove that risk.

### 12.8 Public Lina

Public Lina has no database role, grant, credential or code path to `portal_private`, Storage
or the portal API.

### 12.9 Attack-test philosophy

Tests are written from the attacker's side, and every rule is tested allowed and denied. The
suite covers:

- anon and service_role on every table and function;
- authenticated without claims;
- expired, role-forged and metadata-forged claims;
- pooled-connection reuse;
- client A ↔ B isolation and UUID substitution;
- the dual-profile user;
- unassigned and other-organization staff access, missing AAL2, inactive staff;
- forged actors and mistaken grants;
- leaky-function, temp-table, temp-operator and public-function hijacking attempts;
- client read-function selectors with foreign / unknown ids;
- processor mismatch, replay and expiry.

The suite is mutation-checked. Each of these weakenings makes tests fail:

- dropping `client_visible` or the identity filter from a client function;
- trusting the selector instead of identity;
- making a client function `SECURITY INVOKER`;
- unpinning its search_path;
- widening preparer scope;
- dropping the AAL2 or `exp` checks.

Structural checks also fail if a view reappears, a client base-table policy is added, a
forbidden column is returned, or `authenticated` gains base-table privileges beyond the
approved staff model.

The security audit log is a separate future design. `review_actions` remains business review
history only.

## 11. Security design notes

- Least privilege for every role and service.
- MFA for all staff / production access.
- Private document storage; short-lived, authorized document access; no permanent public
  document URLs.
- No sensitive document data in browser logs, analytics or error reports.
- No raw tax PDFs or extracted values in automation logs.
- Minimize third-party processors; vendor/security review before connecting any real
  document processor.
- Retention and deletion policy required before production.
- Production logging must avoid unnecessary taxpayer data.
- No compliance or certification claims until verified.

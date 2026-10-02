# AskLinTax Client Portal — Architecture (Phase 2A design)

Status: **design only.** Today the portal is the static prototype at `/portal-demo/`
(noindex, fictional data). There is no database, no authentication, no file storage,
no document processor and no network call carrying portal data. This document describes
the domain model the prototype already uses (`lib/portal-model.js`) and how it is intended
to map to a real backend later. Nothing here is a compliance claim.

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
| Confidence band word (High/Medium/Low) | ✓ | ✓ | – |
| Numeric confidence, processor + version | – | ✓ | writes its own job |
| Exception type, severity, staff message | – (generic reason only) | ✓ | – |
| Review history | – | ✓ | – |
| Internal notes | – | ✓ | – |

In the prototype the client screens receive only `toClientView(model)`. **In production this
projection must be enforced server-side** (RLS + API); the prototype bundles all fictional
demo data in the page, which is acceptable only because it is fictional.

## 10. Future Supabase mapping (not created)

| Entity | Table |
|---|---|
| User | `auth.users` (+ role claim / `staff_profiles`) |
| ClientProfile | `client_profiles` |
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

No migrations, SQL or Supabase project exist yet.

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

/**
 * AskLinTax Client Portal — Phase 2A domain model.
 *
 * Provider-neutral, storage-neutral description of the portal workflow, shared by the
 * /portal-demo/ prototype and (later) the real backend. No database, no network, no
 * document processor. See docs/client-portal-architecture.md.
 *
 * The functions here are pure: they take plain records and return new records. In
 * production the same rules run server-side, behind authentication and row-level security.
 * In the prototype they run in the browser on fictional data only.
 */

// ── ENUMS ──────────────────────────────────────────────────

const ROLES = Object.freeze({
  CLIENT: 'CLIENT',
  PREPARER: 'PREPARER',
  CPA_ADMIN: 'CPA_ADMIN',
  DOCUMENT_PROCESSOR: 'DOCUMENT_PROCESSOR', // a scoped server-side job identity, never a human login
})

const WORKFLOW_STATUS = Object.freeze({
  INTAKE: 'INTAKE',
  DOCUMENT_COLLECTION: 'DOCUMENT_COLLECTION',
  DOCUMENT_REVIEW: 'DOCUMENT_REVIEW',
  READY_FOR_PREPARATION: 'READY_FOR_PREPARATION',
  IN_PREPARATION: 'IN_PREPARATION',
  READY_FOR_REVIEW: 'READY_FOR_REVIEW',
  UNDER_REVIEW: 'UNDER_REVIEW',
  READY_FOR_CLIENT: 'READY_FOR_CLIENT',
  COMPLETED: 'COMPLETED',
})

const CHECKLIST_TYPE = Object.freeze({ DOCUMENT: 'DOCUMENT', INFORMATION: 'INFORMATION', FOLLOW_UP: 'FOLLOW_UP' })
const CHECKLIST_STATUS = Object.freeze({
  NEEDED: 'NEEDED', RECEIVED: 'RECEIVED', NEEDS_REVIEW: 'NEEDS_REVIEW', RESOLVED: 'RESOLVED', NOT_APPLICABLE: 'NOT_APPLICABLE',
})
const REQUIRED_STATE = Object.freeze({ REQUIRED: 'REQUIRED', IF_APPLICABLE: 'IF_APPLICABLE' })
const CHECKLIST_SOURCE = Object.freeze({ INTAKE: 'INTAKE', PREPARER: 'PREPARER', AI: 'AI', SYSTEM: 'SYSTEM' })

const UPLOAD_STATUS = Object.freeze({ PENDING: 'PENDING', UPLOADED: 'UPLOADED', FAILED: 'FAILED' })
const PROCESSING_STATUS = Object.freeze({ NOT_STARTED: 'NOT_STARTED', QUEUED: 'QUEUED', PROCESSING: 'PROCESSING', COMPLETED: 'COMPLETED', FAILED: 'FAILED' })
const DOCUMENT_REVIEW_STATUS = Object.freeze({
  PENDING: 'PENDING', NEEDS_REVIEW: 'NEEDS_REVIEW', WAITING_ON_CLIENT: 'WAITING_ON_CLIENT', ACCEPTED: 'ACCEPTED', REJECTED: 'REJECTED',
})
const VALIDATION_STATUS = Object.freeze({ NOT_RUN: 'NOT_RUN', PASSED: 'PASSED', FAILED: 'FAILED' })

const FIELD_REVIEW_STATUS = Object.freeze({
  AUTO_ACCEPTED: 'AUTO_ACCEPTED', NEEDS_REVIEW: 'NEEDS_REVIEW', HUMAN_CONFIRMED: 'HUMAN_CONFIRMED', HUMAN_CORRECTED: 'HUMAN_CORRECTED', REJECTED: 'REJECTED',
})

const EXCEPTION_TYPE = Object.freeze({
  LOW_CONFIDENCE: 'LOW_CONFIDENCE',
  UNREADABLE: 'UNREADABLE',
  MISSING_PAGE: 'MISSING_PAGE',
  DOCUMENT_TYPE_UNCERTAIN: 'DOCUMENT_TYPE_UNCERTAIN',
  DUPLICATE_DOCUMENT: 'DUPLICATE_DOCUMENT',
  CONFLICTING_VALUE: 'CONFLICTING_VALUE',
  CHECKLIST_MISMATCH: 'CHECKLIST_MISMATCH',
  UNEXPECTED_DOCUMENT: 'UNEXPECTED_DOCUMENT',
  MANUAL_REVIEW_REQUESTED: 'MANUAL_REVIEW_REQUESTED',
})
const EXCEPTION_SEVERITY = Object.freeze({ LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH' })
const EXCEPTION_STATUS = Object.freeze({ OPEN: 'OPEN', RESOLVED: 'RESOLVED', DISMISSED: 'DISMISSED' })

// Exception types that always send the WHOLE document to a person, whatever the confidence.
const DOCUMENT_LEVEL_EXCEPTIONS = Object.freeze([
  EXCEPTION_TYPE.UNREADABLE,
  EXCEPTION_TYPE.MISSING_PAGE,
  EXCEPTION_TYPE.DOCUMENT_TYPE_UNCERTAIN,
  EXCEPTION_TYPE.DUPLICATE_DOCUMENT,
  EXCEPTION_TYPE.CHECKLIST_MISMATCH,
  EXCEPTION_TYPE.UNEXPECTED_DOCUMENT,
  EXCEPTION_TYPE.MANUAL_REVIEW_REQUESTED,
])

const REVIEW_ACTION = Object.freeze({
  CONFIRM_VALUE: 'CONFIRM_VALUE',
  CORRECT_VALUE: 'CORRECT_VALUE',
  REQUEST_CLEARER_DOCUMENT: 'REQUEST_CLEARER_DOCUMENT',
  REQUEST_MISSING_PAGES: 'REQUEST_MISSING_PAGES',
  DISMISS_EXCEPTION: 'DISMISS_EXCEPTION',
})

// ── ENTITIES (documentation types — no database in this phase) ──
/**
 * @typedef {{ id: string, email: string, role: keyof ROLES, mfaEnrolled: boolean, createdAt: string }} User
 *   Production: Supabase auth.users + a role claim. Staff accounts require MFA.
 * @typedef {{ id: string, userId: string, displayName: string, preferredLanguage: 'en'|'zh-tw',
 *   contactEmail: string, contactPhone: string, city: string|object, household: object, createdAt: string }} ClientProfile
 *   No SSN/ITIN, bank, license or passport numbers. Identifiers needed for filing are out of scope
 *   until a separate, reviewed design exists.
 * @typedef {{ id: string, userId: string, displayName: string, role: 'PREPARER'|'CPA_ADMIN', organizationId: string, active: boolean }} StaffProfile
 * @typedef {{ id: string, clientId: string, organizationId: string, taxYear: number, jurisdictions: string[],
 *   filingStatus: string, workflowStatus: keyof WORKFLOW_STATUS, assignedPreparerId: string|null,
 *   reviewerId: string|null, createdAt: string, updatedAt: string }} TaxReturn
 * @typedef {{ id: string, taxReturnId: string, situationKey: string, applies: boolean, label: object, source: string }} TaxSituation
 * @typedef {{ id: string, taxReturnId: string, type: keyof CHECKLIST_TYPE, label: object, reason: object,
 *   status: keyof CHECKLIST_STATUS, requiredState: keyof REQUIRED_STATE, source: keyof CHECKLIST_SOURCE,
 *   documentType: string|null, documentId: string|null, situationKey: string|null,
 *   relatedExceptionId: string|null, clientActions: string[] }} ChecklistItem
 * @typedef {{ id: string, taxReturnId: string, clientId: string, checklistItemId: string|null, documentType: string,
 *   displayName: string|object, issuer: string|object, storageObjectId: string,
 *   uploadStatus: keyof UPLOAD_STATUS, processingStatus: keyof PROCESSING_STATUS,
 *   reviewStatus: keyof DOCUMENT_REVIEW_STATUS, uploadedAt: string }} Document
 *   storageObjectId is an opaque key to a PRIVATE storage object — never a public URL. No bytes here.
 * @typedef {{ id: string, documentId: string, processor: string, processorVersion: string,
 *   status: keyof PROCESSING_STATUS, startedAt: string, completedAt: string|null,
 *   overallConfidence: number|null, validationStatus: keyof VALIDATION_STATUS,
 *   requiresHumanReview: boolean, failureCode: string|null }} DocumentProcessingJob
 *   Provider responses are normalised into this shape; raw provider output is not a business record.
 * @typedef {{ id: string, documentId: string, processingJobId: string, fieldKey: string, label: object, clientLabel: object|null,
 *   valueType: 'USD'|'TEXT'|'DATE', value: any, originalValue: any, confidence: number,
 *   reviewStatus: keyof FIELD_REVIEW_STATUS, clientVisible: boolean,
 *   sourcePage: number|null, sourceRef: string|null }} ExtractedField
 * @typedef {{ id: string, documentId: string, fieldId: string|null, type: keyof EXCEPTION_TYPE,
 *   severity: keyof EXCEPTION_SEVERITY, message: string, status: keyof EXCEPTION_STATUS,
 *   followUpItemId: string|null, createdAt: string, resolvedAt: string|null, resolvedBy: string|null }} DocumentException
 *   message is STAFF-ONLY text. Clients see a generic reason derived from `type`.
 * @typedef {{ id: string, taxReturnId: string, documentId: string, exceptionId: string|null, actorId: string,
 *   actorRole: string, action: keyof REVIEW_ACTION, previousValue: any, newValue: any, timestamp: string }} ReviewAction
 *   Business review history — not a tamper-proof security audit log.
 * @typedef {{ id: string, taxReturnId: string, documentId: string|null, authorId: string, body: string, createdAt: string }} InternalNote
 *   Staff-only. Never shown to clients, document processors or the public Lina assistant.
 */

// ── PERMISSIONS ────────────────────────────────────────────

const PERMISSIONS = Object.freeze({
  CLIENT: [
    'view_own_profile', 'view_own_return', 'view_own_checklist', 'view_own_documents',
    'view_client_extraction_summary', 'respond_to_checklist', 'upload_own_document', 'submit_own_return',
  ],
  PREPARER: [
    'view_assigned_return', 'view_documents', 'view_extracted_fields', 'view_exceptions',
    'view_internal_notes', 'add_internal_note', 'resolve_exception', 'request_client_document',
  ],
  CPA_ADMIN: [
    'view_assigned_return', 'view_documents', 'view_extracted_fields', 'view_exceptions',
    'view_internal_notes', 'add_internal_note', 'resolve_exception', 'request_client_document',
    'view_staff_activity', 'final_professional_review', 'manage_roles',
  ],
  DOCUMENT_PROCESSOR: ['read_job_document', 'write_job_results'],
})

/**
 * Can `actor` perform `permission` on the record described by `ctx`?
 * Role grants the verb; scope decides which rows. Mirrors the intended RLS policies.
 *   actor: { role, userId, clientProfileId?, staffProfileId?, organizationId?, jobId? }
 *   ctx:   { taxReturn?, clientId?, job?, documentId? }
 */
function can(actor, permission, ctx = {}) {
  if (!actor || !(PERMISSIONS[actor.role] || []).includes(permission)) return false
  const ret = ctx.taxReturn
  switch (actor.role) {
    case ROLES.CLIENT:
      return Boolean(actor.clientProfileId) && (ctx.clientId || (ret && ret.clientId)) === actor.clientProfileId
    case ROLES.PREPARER:
      return Boolean(ret) && ret.assignedPreparerId === actor.staffProfileId
    case ROLES.CPA_ADMIN:
      return Boolean(ret) && ret.organizationId === actor.organizationId
    case ROLES.DOCUMENT_PROCESSOR: {
      // Job-scoped only: one document, while the job is live. No browsing, no notes.
      const job = ctx.job
      return Boolean(job) && job.id === actor.jobId && ctx.documentId === job.documentId &&
        (job.status === PROCESSING_STATUS.QUEUED || job.status === PROCESSING_STATUS.PROCESSING)
    }
    default:
      return false
  }
}

// ── AI DECISION POLICY ─────────────────────────────────────

/**
 * ILLUSTRATIVE bands for the prototype only. The production thresholds are an open decision and
 * must be set from measured processor accuracy — do not treat these numbers as policy.
 */
const DEMO_CONFIDENCE_BANDS = Object.freeze({ HIGH: 0.9, MEDIUM: 0.75 })

function confidenceBand(score) {
  if (typeof score !== 'number') return 'LOW'
  if (score >= DEMO_CONFIDENCE_BANDS.HIGH) return 'HIGH'
  if (score >= DEMO_CONFIDENCE_BANDS.MEDIUM) return 'MEDIUM'
  return 'LOW'
}

/**
 * Turn a normalised processing result into reviewed fields + exceptions.
 *   detected: provider-neutral findings from processing/validation, e.g. { type: 'MISSING_PAGE', message, severity }
 * Confidence alone never approves anything: every detected finding and every failed validation becomes
 * an exception, and the document is only Ready when no exception is open.
 */
function applyDecisionPolicy({ document, job, fields, detected = [], now }) {
  const exceptions = []
  const add = (type, severity, message, fieldId = null) => exceptions.push({
    id: `exc-${document.id}-${exceptions.length + 1}`, documentId: document.id, fieldId, type, severity, message,
    status: EXCEPTION_STATUS.OPEN, followUpItemId: null, createdAt: now, resolvedAt: null, resolvedBy: null,
  })

  const reviewed = fields.map(f => {
    const band = confidenceBand(f.confidence)
    if (band === 'HIGH') return { ...f, reviewStatus: FIELD_REVIEW_STATUS.AUTO_ACCEPTED }
    add(EXCEPTION_TYPE.LOW_CONFIDENCE, band === 'LOW' ? EXCEPTION_SEVERITY.HIGH : EXCEPTION_SEVERITY.MEDIUM,
      `${f.label.en}: confidence ${Math.round(f.confidence * 100)}% (${band.toLowerCase()} band).`, f.id)
    return { ...f, reviewStatus: FIELD_REVIEW_STATUS.NEEDS_REVIEW }
  })

  detected.forEach(d => add(d.type, d.severity || EXCEPTION_SEVERITY.HIGH, d.message, d.fieldId || null))

  if (job.validationStatus === VALIDATION_STATUS.FAILED && !detected.length) {
    add(EXCEPTION_TYPE.MANUAL_REVIEW_REQUESTED, EXCEPTION_SEVERITY.HIGH, 'Structural validation failed.')
  }
  if (confidenceBand(job.overallConfidence) === 'LOW' && !exceptions.length) {
    add(EXCEPTION_TYPE.LOW_CONFIDENCE, EXCEPTION_SEVERITY.HIGH, 'Overall document confidence is low.')
  }

  return {
    fields: reviewed,
    exceptions,
    job: { ...job, requiresHumanReview: exceptions.length > 0 },
  }
}

/**
 * Where does a document go now?
 *   READY            — validation passed and no open exceptions (high confidence is not enough on its own)
 *   FIELD_REVIEW     — only specific fields are questionable (typical MEDIUM band)
 *   DOCUMENT_REVIEW  — low overall confidence or any document-level exception (missing page, duplicate, …)
 */
function decideDocument(job, exceptions) {
  const open = exceptions.filter(e => e.status === EXCEPTION_STATUS.OPEN)
  const band = confidenceBand(job.overallConfidence)
  if (!open.length && job.validationStatus !== VALIDATION_STATUS.FAILED) return { route: 'READY', band, open }
  if (band === 'LOW' || open.some(e => DOCUMENT_LEVEL_EXCEPTIONS.includes(e.type) || !e.fieldId)) return { route: 'DOCUMENT_REVIEW', band, open }
  return { route: 'FIELD_REVIEW', band, open }
}

// ── DERIVED STATE ──────────────────────────────────────────

const byDoc = (list, documentId) => list.filter(x => x.documentId === documentId)

/** Recompute each document's reviewStatus from its exceptions and outstanding client requests. */
function syncDocuments(state) {
  const documents = state.documents.map(doc => {
    const job = state.jobs.find(j => j.documentId === doc.id)
    const excs = byDoc(state.exceptions, doc.id)
    const waiting = excs.some(e => e.status === EXCEPTION_STATUS.OPEN && e.followUpItemId &&
      (state.checklist.find(c => c.id === e.followUpItemId) || {}).status === CHECKLIST_STATUS.NEEDED)
    const { route } = decideDocument(job, excs)
    const reviewStatus = waiting ? DOCUMENT_REVIEW_STATUS.WAITING_ON_CLIENT
      : route === 'READY' ? DOCUMENT_REVIEW_STATUS.ACCEPTED : DOCUMENT_REVIEW_STATUS.NEEDS_REVIEW
    return reviewStatus === doc.reviewStatus ? doc : { ...doc, reviewStatus }
  })
  return { ...state, documents }
}

/** Plain-language client status: 'ready' | 'received' (team is checking) | 'attention' (client asked for something). */
function clientDocumentStatus(doc) {
  if (doc.reviewStatus === DOCUMENT_REVIEW_STATUS.WAITING_ON_CLIENT) return 'attention'
  if (doc.reviewStatus === DOCUMENT_REVIEW_STATUS.ACCEPTED) return 'ready'
  return 'received'
}

// Clients get a generic reason, never the staff exception message, confidence numbers or notes.
const CLIENT_REASON = Object.freeze({
  LOW_CONFIDENCE: 'hardToRead', UNREADABLE: 'hardToRead', MISSING_PAGE: 'missingPage',
})

/**
 * The ONLY data the client screens receive. Staff fields (confidence numbers, exception messages,
 * processor details, review history, internal notes) are left out here, so they never reach client UI.
 * In production this projection is enforced server-side (RLS + API), not in the browser.
 */
function toClientView(state) {
  const documents = state.documents.map(doc => {
    const job = state.jobs.find(j => j.documentId === doc.id)
    const excs = byDoc(state.exceptions, doc.id)
    const open = excs.filter(e => e.status === EXCEPTION_STATUS.OPEN)
    const status = clientDocumentStatus(doc)
    const reason = status === 'ready' ? null
      : status === 'attention' ? 'requested'
      : decideDocument(job, excs).route === 'FIELD_REVIEW' ? 'oneValue'
      : (open.length && CLIENT_REASON[open[0].type]) || 'teamCheck'
    return {
      id: doc.id,
      displayName: doc.displayName,
      issuer: doc.issuer,
      matched: (state.checklist.find(c => c.id === doc.checklistItemId) || {}).label || null,
      status,
      reason, // a key for generic client wording — never the staff exception message
      summary: byDoc(state.fields, doc.id)
        .filter(f => f.clientVisible)
        .map(f => ({ key: f.fieldKey, label: f.clientLabel || f.label, value: formatValue(f) })),
    }
  })
  const items = state.checklist.map(({ id, type, label, reason, status, requiredState, clientActions, documentId }) =>
    ({ id, type, label, reason, status, requiredState, clientActions, documentId }))
  const ret = state.taxReturn
  return {
    taxReturn: { taxYear: ret.taxYear, jurisdictions: ret.jurisdictions, filingStatus: ret.filingStatus, workflowStatus: ret.workflowStatus },
    documents,
    checklist: items,
  }
}

function formatValue(field) {
  if (field.valueType === 'USD' && typeof field.value === 'number') return '$' + field.value.toLocaleString('en-US')
  return String(field.value)
}

// ── COMMANDS (stand-ins for future server endpoints) ───────

const newId = (prefix, list) => `${prefix}-${list.length + 1}`

function recordAction(state, actor, exc, action, previousValue, newValue, now) {
  return [...state.reviewActions, {
    id: newId('ra', state.reviewActions), taxReturnId: state.taxReturn.id, documentId: exc.documentId,
    exceptionId: exc.id, actorId: actor.userId, actorRole: actor.role, action, previousValue, newValue, timestamp: now,
  }]
}

const closeExc = (state, excId, status, actor, now) =>
  state.exceptions.map(e => e.id === excId ? { ...e, status, resolvedAt: now, resolvedBy: actor.userId } : e)

/** Return status follows the work: back to collection while the client owes something. */
function syncWorkflow(state) {
  const ret = state.taxReturn
  const clientOwes = state.checklist.some(c => c.status === CHECKLIST_STATUS.NEEDED)
  const staffOpen = state.exceptions.some(e => e.status === EXCEPTION_STATUS.OPEN)
  let workflowStatus = ret.workflowStatus
  if (ret.submittedAt) {
    workflowStatus = clientOwes ? WORKFLOW_STATUS.DOCUMENT_COLLECTION
      : staffOpen ? WORKFLOW_STATUS.DOCUMENT_REVIEW : WORKFLOW_STATUS.READY_FOR_PREPARATION
  }
  const submittedAt = clientOwes ? null : ret.submittedAt
  return workflowStatus === ret.workflowStatus && submittedAt === ret.submittedAt
    ? state : { ...state, taxReturn: { ...ret, workflowStatus, submittedAt } }
}

/**
 * Apply one command and return the next state. Staff commands are permission-checked and recorded
 * as ReviewActions. Unknown or unauthorised commands leave the state unchanged.
 */
function reduce(state, cmd) {
  const { actor, now } = cmd
  const exc = cmd.exceptionId && state.exceptions.find(e => e.id === cmd.exceptionId)
  const staffCmd = cmd.type.startsWith('STAFF_')
  if (staffCmd && (!exc || exc.status !== EXCEPTION_STATUS.OPEN || !can(actor, 'resolve_exception', { taxReturn: state.taxReturn }))) return state
  let next = state

  switch (cmd.type) {
    case 'CLIENT_SET_ITEM': {
      if (!can(actor, 'respond_to_checklist', { taxReturn: state.taxReturn })) return state
      // A provided follow-up (e.g. a clearer copy) leaves the staff exception open: the new copy still
      // needs processing and review, which is a later phase.
      next = {
        ...state,
        checklist: state.checklist.map(c => c.id === cmd.itemId ? { ...c, status: cmd.status } : c),
        taxReturn: { ...state.taxReturn, updatedAt: now },
      }
      break
    }
    case 'CLIENT_SUBMIT': {
      if (!can(actor, 'submit_own_return', { taxReturn: state.taxReturn })) return state
      if (state.checklist.some(c => c.status === CHECKLIST_STATUS.NEEDED)) return state
      next = { ...state, taxReturn: { ...state.taxReturn, submittedAt: now, updatedAt: now } }
      break
    }
    case 'STAFF_CONFIRM': {
      const field = state.fields.find(f => f.id === exc.fieldId)
      next = {
        ...state,
        fields: field ? state.fields.map(f => f.id === field.id ? { ...f, reviewStatus: FIELD_REVIEW_STATUS.HUMAN_CONFIRMED } : f) : state.fields,
        exceptions: closeExc(state, exc.id, EXCEPTION_STATUS.RESOLVED, actor, now),
        reviewActions: recordAction(state, actor, exc, REVIEW_ACTION.CONFIRM_VALUE, field ? field.value : null, field ? field.value : null, now),
      }
      break
    }
    case 'STAFF_CORRECT': {
      const field = state.fields.find(f => f.id === exc.fieldId)
      if (!field || cmd.value === undefined || cmd.value === null || cmd.value === '') return state
      next = {
        ...state,
        fields: state.fields.map(f => f.id === field.id ? { ...f, value: cmd.value, reviewStatus: FIELD_REVIEW_STATUS.HUMAN_CORRECTED } : f),
        exceptions: closeExc(state, exc.id, EXCEPTION_STATUS.RESOLVED, actor, now),
        reviewActions: recordAction(state, actor, exc, REVIEW_ACTION.CORRECT_VALUE, field.value, cmd.value, now),
      }
      break
    }
    case 'STAFF_REQUEST_DOCUMENT': {
      if (exc.followUpItemId && (state.checklist.find(c => c.id === exc.followUpItemId) || {}).status === CHECKLIST_STATUS.NEEDED) return state
      const doc = state.documents.find(d => d.id === exc.documentId)
      const missingPages = exc.type === EXCEPTION_TYPE.MISSING_PAGE
      if (!cmd.text) return state
      const item = {
        id: `chk-followup-${state.checklist.length + 1}`, taxReturnId: state.taxReturn.id, type: CHECKLIST_TYPE.FOLLOW_UP,
        label: cmd.text.label, reason: cmd.text.reason, // client-safe wording supplied by the caller
        status: CHECKLIST_STATUS.NEEDED, requiredState: REQUIRED_STATE.REQUIRED, source: CHECKLIST_SOURCE.PREPARER,
        documentType: doc.documentType, documentId: doc.id, situationKey: null, relatedExceptionId: exc.id,
        clientActions: ['upload', 'ask'],
      }
      next = {
        ...state,
        checklist: [...state.checklist, item],
        exceptions: state.exceptions.map(e => e.id === exc.id ? { ...e, followUpItemId: item.id } : e),
        reviewActions: recordAction(state, actor, exc, missingPages ? REVIEW_ACTION.REQUEST_MISSING_PAGES : REVIEW_ACTION.REQUEST_CLEARER_DOCUMENT, null, item.id, now),
      }
      break
    }
    case 'STAFF_DISMISS': {
      next = {
        ...state,
        exceptions: closeExc(state, exc.id, EXCEPTION_STATUS.DISMISSED, actor, now),
        reviewActions: recordAction(state, actor, exc, REVIEW_ACTION.DISMISS_EXCEPTION, exc.type, null, now),
      }
      break
    }
    default:
      return state
  }
  return syncWorkflow(syncDocuments(next))
}

module.exports = {
  ROLES, WORKFLOW_STATUS, CHECKLIST_TYPE, CHECKLIST_STATUS, REQUIRED_STATE, CHECKLIST_SOURCE,
  UPLOAD_STATUS, PROCESSING_STATUS, DOCUMENT_REVIEW_STATUS, VALIDATION_STATUS, FIELD_REVIEW_STATUS,
  EXCEPTION_TYPE, EXCEPTION_SEVERITY, EXCEPTION_STATUS, DOCUMENT_LEVEL_EXCEPTIONS, REVIEW_ACTION,
  PERMISSIONS, can, DEMO_CONFIDENCE_BANDS, confidenceBand, applyDecisionPolicy, decideDocument,
  syncDocuments, syncWorkflow, clientDocumentStatus, toClientView, formatValue, reduce,
}

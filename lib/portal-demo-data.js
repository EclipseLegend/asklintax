/**
 * AskLinTax Client Portal — demo data for /portal-demo/ (Phase 1 UX, Phase 2A domain model).
 *
 * EVERYTHING HERE IS FICTIONAL DEMO DATA. No real taxpayer information, no identifiers
 * (SSN, ITIN, bank, license or passport numbers), no network calls, no uploads, no document
 * processor. Records follow the entity shapes in lib/portal-model.js.
 * Kept separate from the Knowledge Library (lib/articles.js) and from Lina's knowledge index.
 *
 * Tax form names (Form W-2, Form 1098, …) are never translated.
 */

const M = require('./portal-model')

const SEED_TIME = '2026-02-16T18:00:00.000Z'
const ORG = 'org-demo'

// ── USERS & PROFILES ───────────────────────────────────────
const USERS = [
  { id: 'user-demo-client', email: 'emily.chen@example.com', role: M.ROLES.CLIENT, mfaEnrolled: false, createdAt: '2026-01-20T17:00:00.000Z' },
  { id: 'user-demo-preparer', email: 'preparer@example.com', role: M.ROLES.PREPARER, mfaEnrolled: true, createdAt: '2025-11-03T17:00:00.000Z' },
  { id: 'user-demo-cpa', email: 'cpa-admin@example.com', role: M.ROLES.CPA_ADMIN, mfaEnrolled: true, createdAt: '2025-11-03T17:00:00.000Z' },
]

const CLIENT_PROFILE = {
  id: 'client-demo-emily',
  userId: 'user-demo-client',
  displayName: 'Emily Chen',
  preferredLanguage: 'en',
  contactEmail: 'emily.chen@example.com',
  contactPhone: '(555) 010-0142',
  city: { en: 'San Jose, California', 'zh-tw': '加州 San Jose' },
  household: {
    spouse: 'Daniel Chen',
    dependents: [
      { name: 'Olivia Chen', age: 8 },
      { name: 'Ethan Chen', age: 5 },
    ],
  },
  createdAt: '2026-01-20T17:00:00.000Z',
}

const STAFF_PROFILES = [
  { id: 'staff-demo-preparer', userId: 'user-demo-preparer', displayName: 'Demo Preparer', role: M.ROLES.PREPARER, organizationId: ORG, active: true },
  { id: 'staff-demo-cpa', userId: 'user-demo-cpa', displayName: 'Demo CPA Reviewer', role: M.ROLES.CPA_ADMIN, organizationId: ORG, active: true },
]

// Demo "sessions". In production these come from authentication, never from the browser.
const ACTORS = {
  client: { role: M.ROLES.CLIENT, userId: 'user-demo-client', clientProfileId: CLIENT_PROFILE.id },
  preparer: { role: M.ROLES.PREPARER, userId: 'user-demo-preparer', staffProfileId: 'staff-demo-preparer', organizationId: ORG },
}

// ── TAX RETURN ─────────────────────────────────────────────
const RET = 'ret-demo-2025'
const TAX_RETURN = {
  id: RET,
  clientId: CLIENT_PROFILE.id,
  organizationId: ORG,
  taxYear: 2025,
  jurisdictions: ['US-FEDERAL', 'US-CA'],
  filingStatus: 'MARRIED_FILING_JOINTLY',
  workflowStatus: M.WORKFLOW_STATUS.DOCUMENT_COLLECTION,
  assignedPreparerId: 'staff-demo-preparer',
  reviewerId: 'staff-demo-cpa',
  submittedAt: null,
  createdAt: '2026-01-20T17:00:00.000Z',
  updatedAt: SEED_TIME,
}

// Situations that drive the document checklist.
const TAX_SITUATIONS = [
  ['w2', true, 'I work as an employee (Form W-2)', '我是受雇員工（Form W-2）'],
  ['home', true, 'I own a home', '我有自住房屋'],
  ['invest', true, 'I have investment income (interest, dividends, sales)', '我有投資收入（利息、股利、出售）'],
  ['kids', true, 'I have children or other dependents', '我有子女或其他受扶養人'],
  ['self', false, 'I am self-employed or freelance', '我是自雇或接案'],
  ['rental', false, 'I own rental property', '我有出租房產'],
  ['foreign', false, 'I have financial accounts outside the U.S.', '我在美國境外有金融帳戶'],
  ['crypto', false, 'I bought or sold cryptocurrency', '我買賣過加密貨幣'],
].map(([key, applies, en, zh]) => ({ id: `sit-${key}`, taxReturnId: RET, situationKey: key, applies, label: { en, 'zh-tw': zh }, source: M.CHECKLIST_SOURCE.INTAKE }))

// ── CHECKLIST ──────────────────────────────────────────────
const item = (id, fields) => ({
  id, taxReturnId: RET, type: M.CHECKLIST_TYPE.DOCUMENT, status: M.CHECKLIST_STATUS.RECEIVED,
  requiredState: M.REQUIRED_STATE.REQUIRED, source: M.CHECKLIST_SOURCE.INTAKE,
  documentType: null, documentId: null, situationKey: null, relatedExceptionId: null, clientActions: [], ...fields,
})
const CHECKLIST = [
  item('chk-w2-abc', { label: { en: 'Employment income', 'zh-tw': '受雇薪資收入' }, reason: { en: 'You work as an employee.', 'zh-tw': '你是受雇員工。' }, documentType: 'W-2', documentId: 'doc-w2-abc', situationKey: 'w2' }),
  item('chk-w2-xyz', { label: { en: 'Employment income (spouse)', 'zh-tw': '受雇薪資收入（配偶）' }, reason: { en: 'Your spouse works as an employee.', 'zh-tw': '你的配偶是受雇員工。' }, documentType: 'W-2', documentId: 'doc-w2-xyz', situationKey: 'w2' }),
  item('chk-int', { label: { en: 'Interest income', 'zh-tw': '利息收入' }, reason: { en: 'You have investment income.', 'zh-tw': '你有投資收入。' }, documentType: '1099-INT', documentId: 'doc-int-chase', situationKey: 'invest' }),
  item('chk-div', { label: { en: 'Dividend income', 'zh-tw': '股利收入' }, reason: { en: 'You have investment income.', 'zh-tw': '你有投資收入。' }, documentType: '1099-DIV', documentId: 'doc-div-fidelity', situationKey: 'invest' }),
  item('chk-b', { label: { en: 'Investment sales', 'zh-tw': '投資出售' }, reason: { en: 'You sold investments.', 'zh-tw': '你出售過投資。' }, documentType: '1099-B', documentId: 'doc-b-fidelity', situationKey: 'invest' }),
  item('chk-property-tax', { label: { en: 'Home ownership', 'zh-tw': '自有房屋' }, reason: { en: 'You own a home.', 'zh-tw': '你有自住房屋。' }, documentType: 'PROPERTY_TAX_STATEMENT', documentId: 'doc-property-tax', situationKey: 'home' }),
  // Not from intake: added when the donation receipts arrived — the checklist grows with new facts.
  item('chk-charity', { label: { en: 'Charitable donations', 'zh-tw': '慈善捐款' }, reason: { en: 'Added when your donation receipts arrived.', 'zh-tw': '收到你的捐款收據後加入。' }, requiredState: M.REQUIRED_STATE.IF_APPLICABLE, source: M.CHECKLIST_SOURCE.AI, documentType: 'CHARITABLE_RECEIPTS', documentId: 'doc-charity' }),
  item('chk-1098', {
    label: { en: 'Form 1098 — Mortgage Interest', 'zh-tw': 'Form 1098 — 房貸利息' },
    reason: {
      en: 'If you paid mortgage interest during 2025, your lender may issue Form 1098.',
      'zh-tw': '如果你在 2025 年支付了房貸利息，你的貸款機構可能會寄給你 Form 1098。',
    },
    status: M.CHECKLIST_STATUS.NEEDED, requiredState: M.REQUIRED_STATE.IF_APPLICABLE, documentType: '1098', situationKey: 'home',
    clientActions: ['upload', 'dontHave', 'ask'],
  }),
  item('chk-childcare', {
    type: M.CHECKLIST_TYPE.INFORMATION,
    label: { en: 'Childcare Provider Information', 'zh-tw': '托育服務提供者資料' },
    reason: {
      en: 'Needed if claiming the Child and Dependent Care Credit.',
      'zh-tw': '如果要申請兒童與受扶養人照顧抵稅額（Child and Dependent Care Credit），就需要這項資料。',
    },
    status: M.CHECKLIST_STATUS.NEEDED, requiredState: M.REQUIRED_STATE.IF_APPLICABLE, situationKey: 'kids',
    clientActions: ['addInfo', 'notApplicable', 'ask'],
  }),
]

// ── DOCUMENTS (metadata only — no bytes, no URLs) ──────────
const doc = (id, checklistItemId, documentType, displayName, issuer, n) => ({
  id, taxReturnId: RET, clientId: CLIENT_PROFILE.id, checklistItemId, documentType, displayName, issuer,
  storageObjectId: `obj_demo_${String(n).padStart(4, '0')}`, // opaque private-object key (fictional)
  uploadStatus: M.UPLOAD_STATUS.UPLOADED, processingStatus: M.PROCESSING_STATUS.COMPLETED,
  reviewStatus: M.DOCUMENT_REVIEW_STATUS.PENDING, uploadedAt: '2026-02-14T19:05:00.000Z',
})
const DOCUMENTS = [
  doc('doc-w2-abc', 'chk-w2-abc', 'W-2', 'Form W-2', 'ABC Technology', 1),
  doc('doc-w2-xyz', 'chk-w2-xyz', 'W-2', 'Form W-2', 'XYZ Health', 2),
  doc('doc-int-chase', 'chk-int', '1099-INT', 'Form 1099-INT', 'Chase', 3),
  doc('doc-div-fidelity', 'chk-div', '1099-DIV', 'Form 1099-DIV', 'Fidelity', 4),
  doc('doc-b-fidelity', 'chk-b', '1099-B', 'Form 1099-B', 'Fidelity', 5),
  doc('doc-property-tax', 'chk-property-tax', 'PROPERTY_TAX_STATEMENT',
    { en: 'Property Tax Statement', 'zh-tw': '房屋稅單（Property Tax Statement）' }, { en: 'County tax collector', 'zh-tw': '郡稅務機關' }, 6),
  doc('doc-charity', 'chk-charity', 'CHARITABLE_RECEIPTS',
    { en: 'Charitable Donation Records', 'zh-tw': '慈善捐款紀錄（Charitable Donation Records）' }, { en: '3 receipts', 'zh-tw': '3 張收據' }, 7),
]

// ── SIMULATED PROCESSING RESULTS (provider-neutral; nothing was read or analysed) ──
// Demonstrates the three demo bands and a high-confidence override:
//   HIGH   — W-2s, 1099-DIV, property tax statement → Ready
//   MEDIUM — 1099-INT: only the one questionable field goes to review
//   LOW    — charity receipts: whole document goes to review
//   HIGH but MISSING_PAGE — 1099-B: confidence alone does not make it Ready
const fld = (key, label, clientLabel, valueType, value, confidence, sourcePage = 1) =>
  ({ key, label, clientLabel, valueType, value, confidence, sourcePage })
const PROCESSING = {
  'doc-w2-abc': {
    confidence: 0.98, validation: M.VALIDATION_STATUS.PASSED,
    fields: [
      fld('employerName', { en: 'Employer name', 'zh-tw': '雇主名稱' }, { en: 'Employer', 'zh-tw': '雇主' }, 'TEXT', 'ABC Technology', 0.99),
      fld('wages', { en: 'Box 1 — Wages', 'zh-tw': 'Box 1 — 薪資' }, { en: 'Wages', 'zh-tw': '薪資' }, 'USD', 82450, 0.99),
      fld('federalWithholding', { en: 'Federal income tax withheld', 'zh-tw': '已預扣聯邦所得稅' }, { en: 'Federal withholding', 'zh-tw': '已預扣聯邦稅' }, 'USD', 10200, 0.98),
    ],
  },
  'doc-w2-xyz': { confidence: 0.97, validation: M.VALIDATION_STATUS.PASSED, fields: [] },
  'doc-int-chase': {
    confidence: 0.86, validation: M.VALIDATION_STATUS.PASSED,
    fields: [
      fld('interestIncome', { en: 'Interest income', 'zh-tw': '利息收入' }, null, 'USD', 1284, 0.97),
      fld('taxExemptInterest', { en: 'Tax-exempt interest', 'zh-tw': '免稅利息' }, null, 'USD', 96, 0.81),
    ],
  },
  'doc-div-fidelity': { confidence: 0.96, validation: M.VALIDATION_STATUS.PASSED, fields: [] },
  'doc-b-fidelity': {
    confidence: 0.95, validation: M.VALIDATION_STATUS.FAILED,
    fields: [fld('totalProceeds', { en: 'Total proceeds', 'zh-tw': '出售總收入' }, null, 'USD', 24600, 0.96)],
    detected: [{
      type: M.EXCEPTION_TYPE.MISSING_PAGE, severity: M.EXCEPTION_SEVERITY.HIGH,
      message: 'Page-sequence check failed: the consolidated statement is numbered 1–5, but page 4 was not in the upload.',
    }],
  },
  'doc-property-tax': { confidence: 0.95, validation: M.VALIDATION_STATUS.PASSED, fields: [] },
  'doc-charity': {
    confidence: 0.63, validation: M.VALIDATION_STATUS.PASSED,
    fields: [fld('charitableAmount', { en: 'Donation amount (handwritten receipt)', 'zh-tw': '捐款金額（手寫收據）' }, null, 'USD', 1250, 0.63, 2)],
  },
}

const INTERNAL_NOTES = [
  {
    id: 'note-1', taxReturnId: RET, documentId: 'doc-charity', authorId: 'user-demo-preparer', createdAt: SEED_TIME,
    body: 'Demo note: client mentioned all three receipts are from the same food bank. Check the handwritten one against the other two.',
  },
]

/** Fresh demo state (a new copy every call, so "Reset demo" really resets). */
function buildSeedState() {
  const jobs = []
  let fields = []
  let exceptions = []
  DOCUMENTS.forEach(d => {
    const p = PROCESSING[d.id]
    const job = {
      id: `job-${d.id.slice(4)}`, documentId: d.id, processor: 'demo-simulated', processorVersion: 'demo-1',
      status: M.PROCESSING_STATUS.COMPLETED, startedAt: '2026-02-14T19:06:00.000Z', completedAt: '2026-02-14T19:06:40.000Z',
      overallConfidence: p.confidence, validationStatus: p.validation, requiresHumanReview: false, failureCode: null,
    }
    const raw = p.fields.map(f => ({
      id: `fld-${d.id.slice(4)}-${f.key}`, documentId: d.id, processingJobId: job.id, fieldKey: f.key,
      label: f.label, clientLabel: f.clientLabel, valueType: f.valueType, value: f.value, originalValue: f.value,
      confidence: f.confidence, reviewStatus: M.FIELD_REVIEW_STATUS.NEEDS_REVIEW, clientVisible: Boolean(f.clientLabel),
      sourcePage: f.sourcePage, sourceRef: null,
    }))
    const out = M.applyDecisionPolicy({ document: d, job, fields: raw, detected: p.detected, now: SEED_TIME })
    jobs.push(out.job)
    fields = fields.concat(out.fields)
    exceptions = exceptions.concat(out.exceptions)
  })
  const state = {
    taxReturn: { ...TAX_RETURN },
    checklist: CHECKLIST.map(c => ({ ...c })),
    documents: DOCUMENTS.map(d => ({ ...d })),
    jobs, fields, exceptions,
    reviewActions: [],
    notes: INTERNAL_NOTES.map(n => ({ ...n })),
  }
  return M.syncWorkflow(M.syncDocuments(state))
}

/** Client-safe wording for a staff follow-up request (becomes a new checklist item). */
function followUpText(document, missingPages) {
  const name = { en: typeof document.displayName === 'object' ? document.displayName.en : document.displayName, 'zh-tw': typeof document.displayName === 'object' ? document.displayName['zh-tw'] : document.displayName }
  return missingPages
    ? {
        label: { en: `Missing pages — ${name.en}`, 'zh-tw': `缺少的頁面 — ${name['zh-tw']}` },
        reason: { en: 'Some pages of this statement didn’t come through. Please upload the complete statement.', 'zh-tw': '這份對帳單有部分頁面沒有收到。請上傳完整的對帳單。' },
      }
    : {
        label: { en: `Clearer copy — ${name.en}`, 'zh-tw': `較清楚的副本 — ${name['zh-tw']}` },
        reason: { en: 'Part of this document was hard to read. Please upload a clearer photo or scan.', 'zh-tw': '這份文件有部分內容不易辨識。請上傳較清楚的照片或掃描檔。' },
      }
}

const UI = {
  en: {
    demoBanner: 'Demo prototype — all names, documents and amounts are fictional. Please don’t enter or upload real tax information.',
    exitDemo: 'Exit demo',
    returnTitle: '2025 Tax Return',
    returnType: 'Individual Federal + California',
    nav: { overview: 'Overview', about: 'About You', situation: 'Tax Situation', documents: 'Documents', missing: 'Missing Items', review: 'Review' },
    status: { complete: 'Complete', received: 'Received', missing: 'Missing', review: 'Needs attention', checking: 'Being checked', notReady: 'Not ready', ready: 'Ready', resolvedNotHave: 'You don’t have this', resolvedNA: 'Not applicable', provided: 'Provided (demo)' },
    demoView: { label: 'Demo view', client: 'Client', staff: 'Staff Review Demo' },
    progress: 'Overall progress',
    overview: {
      heading: '2025 Individual Tax Return',
      where: 'You’re collecting your tax information for 2025.',
      steps: 'Your steps',
      docsOf: (n, t) => `${n} of ${t}`,
      nextLabel: 'Next step',
      nextMissing: n => `${n} document${n === 1 ? '' : 's'} still needed`,
      nextMissingSub: 'Add these items, or tell us they don’t apply, so your information is complete.',
      nextReview: 'Everything is in — review and submit',
      nextReviewSub: 'Check your summary, then submit your tax information for preparation.',
      nextDone: 'Submitted (demo)',
      nextDoneSub: 'Your tax information has moved to preparation in this demo.',
      ctaMissing: 'View Missing Items',
      ctaReview: 'Go to Review',
      reassure: 'Once your documents are complete, your return can move to preparation.',
    },
    about: {
      heading: 'About You',
      intro: 'This is the information you gave us at intake. Contact us if anything has changed.',
      personal: 'Personal information', name: 'Name', filingStatus: 'Filing status', filingStatusValue: 'Married Filing Jointly', residency: 'State residency', residencyValue: 'California resident, full year', city: 'City',
      spouse: 'Spouse', dependents: 'Dependents', dependentsCount: n => `${n} dependents`, age: a => `age ${a}`,
      contact: 'Contact information', email: 'Email', phone: 'Phone',
      noIds: 'For your protection, identification numbers are never shown on this screen.',
    },
    situation: {
      heading: 'Tax Situation',
      intro: 'Your answers tell us which documents to ask for. You don’t need to know tax rules — just tell us what applies to you.',
      applies: 'Applies to you', notApplies: 'Doesn’t apply',
      drives: 'Based on these answers, we requested 9 document items.',
    },
    documents: {
      heading: 'Documents',
      intro: 'Here’s everything we asked for, and where each item stands.',
      receivedGroup: 'Received', missingGroup: 'Still needed',
      countLine: (n, t) => `${n} of ${t} items received`,
      open: 'View details',
      identified: 'Document identified', type: 'Type', statusLabel: 'Status',
      demoTag: 'Demo data',
    },
    detail: {
      back: 'Back to documents', close: 'Close',
      status: 'Status', docType: 'Document type', matched: 'Matched checklist item', from: 'From',
      futureFlow: 'Future review workflow',
      flowIdentified: 'AI identified', flowHigh: 'High confidence', flowMedium: 'Medium confidence', flowLow: 'Low confidence', flowReady: 'Ready', flowHuman: 'Human review needed', flowAttention: 'Your action needed',
      previewTitle: 'Demo extraction preview',
      previewNote: 'Fictional values for this prototype. No file was read and no AI analyzed this document.',
      confidence: 'Confidence', high: 'High', medium: 'Medium', low: 'Low',
      noPreview: 'An extraction preview for this document type will come in a future phase.',
      reviewWhy: 'Why we’re checking it',
      reasons: {
        hardToRead: 'Part of this document is hard to read, so a team member will check it.',
        missingPage: 'A page may be missing, so a team member will check it.',
        oneValue: 'A team member will double-check one value on this document.',
        teamCheck: 'A team member will take a quick look at this document.',
        requested: 'We’ve asked you for something on this document — see Missing Items.',
      },
    },
    missing: {
      heading: n => n === 0 ? 'Nothing else needed' : `${n} item${n === 1 ? '' : 's'} still needed`,
      intro: 'For each item, upload it, tell us it doesn’t apply, or ask us a question.',
      allDone: 'You’ve responded to every requested item. Head to Review to submit.',
      actions: { upload: 'Upload document', dontHave: 'I don’t have this', ask: 'Ask a question', addInfo: 'Add information', notApplicable: 'Not applicable' },
      undo: 'Undo',
      uploadNotice: 'Demo only — secure document upload will be available in a future phase.',
      addInfoNotice: 'Demo only — a secure form for provider details will be available in a future phase.',
    },
    review: {
      heading: 'Review',
      intro: 'A quick check that everything is ready.',
      rows: { personal: 'Personal information', situation: 'Tax situation', documents: 'Documents', missing: 'Missing items', ready: 'Ready for preparation' },
      yes: 'Yes', no: 'No',
      incomplete: 'Complete the remaining items before submitting your tax information for preparation.',
      complete: 'Everything is in. You can submit your tax information for preparation.',
      submit: 'Submit for Preparation',
      submitted: 'Demo confirmation — nothing was sent. In the real portal, this is where your tax information would move to preparation.',
      demoControls: 'Demo controls',
      demoComplete: n => n ? `Simulate completing the ${n} missing item${n === 1 ? '' : 's'}` : 'Simulate completing the missing items',
      demoReset: 'Reset demo',
    },
    staff: {
      title: 'Staff Review Demo',
      intro: 'A preview of a future staff screen. Clients never see this view. Actions here change only this page’s demo data — nothing is saved or sent.',
      actingAs: 'Signed in as (demo)', actor: 'Demo Preparer · Preparer, assigned to this return',
      summary: 'Return', client: 'Client', taxYear: 'Tax year', workflow: 'Workflow status', preparer: 'Assigned preparer', reviewer: 'Reviewer',
      workflowStatus: {
        INTAKE: 'Intake', DOCUMENT_COLLECTION: 'Document collection', DOCUMENT_REVIEW: 'Document review', READY_FOR_PREPARATION: 'Ready for preparation',
        IN_PREPARATION: 'In preparation', READY_FOR_REVIEW: 'Ready for review', UNDER_REVIEW: 'Under review', READY_FOR_CLIENT: 'Ready for client', COMPLETED: 'Completed',
      },
      queue: 'Needs Review queue', queueEmpty: 'No open exceptions — every document is Ready.',
      route: { DOCUMENT_REVIEW: 'Whole-document review', FIELD_REVIEW: 'Field review only' },
      overall: 'Overall confidence', band: { HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' }, processor: 'Processor', validation: 'Validation',
      validationStatus: { PASSED: 'Passed', FAILED: 'Failed', NOT_RUN: 'Not run' },
      exceptionType: {
        LOW_CONFIDENCE: 'Low confidence', UNREADABLE: 'Unreadable', MISSING_PAGE: 'Missing page', DOCUMENT_TYPE_UNCERTAIN: 'Document type uncertain',
        DUPLICATE_DOCUMENT: 'Duplicate document', CONFLICTING_VALUE: 'Conflicting value', CHECKLIST_MISMATCH: 'Checklist mismatch',
        UNEXPECTED_DOCUMENT: 'Unexpected document', MANUAL_REVIEW_REQUESTED: 'Manual review requested',
      },
      severity: { LOW: 'Low severity', MEDIUM: 'Medium severity', HIGH: 'High severity' },
      field: 'Questionable field', aiValue: 'AI value', confidence: 'Confidence', page: 'Page', reason: 'Reason',
      actions: {
        confirm: 'Confirm', correct: 'Correct', save: 'Save correction', cancel: 'Cancel',
        requestClearer: 'Request clearer document', requestPages: 'Request missing pages', dismiss: 'Dismiss — not needed',
      },
      correctLabel: 'Corrected amount (USD)', invalid: 'Enter a whole-dollar amount.',
      waiting: 'Waiting on client — request added to the client’s Missing Items.',
      clientResponded: 'Client marked the request as provided (demo). Re-processing a new copy comes in a later phase.',
      ready: 'Ready documents', readyHint: 'No open exceptions. Validation passed.',
      fieldStatus: { AUTO_ACCEPTED: 'Auto-accepted', NEEDS_REVIEW: 'Needs review', HUMAN_CONFIRMED: 'Confirmed by staff', HUMAN_CORRECTED: 'Corrected by staff', REJECTED: 'Rejected' },
      history: 'Review history', historyEmpty: 'No review actions yet.',
      historyHint: 'Business review history kept in this page’s memory only — not a security audit log.',
      action: {
        CONFIRM_VALUE: 'Confirmed value', CORRECT_VALUE: 'Corrected value', REQUEST_CLEARER_DOCUMENT: 'Requested clearer document',
        REQUEST_MISSING_PAGES: 'Requested missing pages', DISMISS_EXCEPTION: 'Dismissed exception',
      },
      notes: 'Internal notes', notesHint: 'Staff only — never shown to the client, document processors or the public Lina assistant.',
      policy: 'Decision policy (demo)',
      policyText: 'Illustrative bands: High ≥ 90%, Medium ≥ 75%, Low below that. A document is Ready only when validation passes and no exception is open — high confidence alone never approves a document. Production thresholds are not set yet.',
      back: 'Back to client view',
    },
    assistant: {
      title: 'Portal help (preview)',
      sub: 'A future assistant for questions about your checklist. In this prototype, answers are pre-written examples — not tax advice, and nothing is sent anywhere.',
      chips: { missing: 'What am I missing?', why1098: 'Why do you need Form 1098?', next: 'What happens next?' },
      answers: {
        missingSome: items => `You still need: ${items.join('; ')}. You can upload each one, tell us it doesn’t apply, or ask a question from the Missing Items page.`,
        missingNone: 'Nothing is missing. Go to Review to submit your tax information for preparation.',
        why1098: 'You told us you own a home. If you paid mortgage interest during 2025, your lender may issue Form 1098, so we ask for it. If you don’t have a mortgage, choose “I don’t have this.”',
        next: 'Once your documents are complete, you can submit from the Review page and your return can move to preparation.',
      },
    },
    security: 'Your tax documents will be handled through a secure document workflow.',
    langLabel: 'Language',
  },
  'zh-tw': {
    demoBanner: '示範原型 — 所有姓名、文件與金額皆為虛構。請不要輸入或上傳真實的稅務資料。',
    exitDemo: '離開示範',
    returnTitle: '2025 年稅表',
    returnType: '個人聯邦 + 加州稅表',
    nav: { overview: '總覽', about: '基本資料', situation: '稅務情況', documents: '稅務文件', missing: '待補資料', review: '確認與提交' },
    status: { complete: '已完成', received: '已收到', missing: '待補', review: '需要確認', checking: '確認中', notReady: '尚未就緒', ready: '已就緒', resolvedNotHave: '你沒有這份文件', resolvedNA: '不適用', provided: '已提供（示範）' },
    demoView: { label: '示範檢視', client: '客戶', staff: '員工審核示範' },
    progress: '整體進度',
    overview: {
      heading: '2025 年個人稅表',
      where: '你正在整理 2025 年的稅務資料。',
      steps: '你的步驟',
      docsOf: (n, t) => `${t} 項中已收到 ${n} 項`,
      nextLabel: '下一步',
      nextMissing: n => `還需要 ${n} 項資料`,
      nextMissingSub: '補上這些資料，或告訴我們不適用，你的資料就完整了。',
      nextReview: '資料都齊了 — 確認後提交',
      nextReviewSub: '檢查你的摘要，然後提交稅務資料，進入報稅準備。',
      nextDone: '已提交（示範）',
      nextDoneSub: '在這個示範中，你的稅務資料已進入報稅準備。',
      ctaMissing: '查看待補資料',
      ctaReview: '前往確認與提交',
      reassure: '文件齊全後，你的稅表就可以進入報稅準備。',
    },
    about: {
      heading: '基本資料',
      intro: '這是你在填寫資料時提供給我們的資訊。如果有任何變更，請與我們聯絡。',
      personal: '個人資料', name: '姓名', filingStatus: '報稅身分', filingStatusValue: '夫妻合併申報（Married Filing Jointly）', residency: '州居民身分', residencyValue: '全年加州居民', city: '城市',
      spouse: '配偶', dependents: '受扶養人', dependentsCount: n => `${n} 位受扶養人`, age: a => `${a} 歲`,
      contact: '聯絡資料', email: '電子郵件', phone: '電話',
      noIds: '為了保護你，這個畫面絕不會顯示任何身分識別號碼。',
    },
    situation: {
      heading: '稅務情況',
      intro: '你的回答決定我們需要向你索取哪些文件。你不需要懂稅務規則 — 只要告訴我們哪些情況適用於你。',
      applies: '適用', notApplies: '不適用',
      drives: '根據這些回答，我們向你索取了 9 項文件。',
    },
    documents: {
      heading: '稅務文件',
      intro: '以下是我們向你索取的所有項目，以及每一項目前的狀態。',
      receivedGroup: '已收到', missingGroup: '仍需提供',
      countLine: (n, t) => `${t} 項中已收到 ${n} 項`,
      open: '查看詳情',
      identified: '已辨識文件', type: '類型', statusLabel: '狀態',
      demoTag: '示範資料',
    },
    detail: {
      back: '返回稅務文件', close: '關閉',
      status: '狀態', docType: '文件類型', matched: '對應的清單項目', from: '來源',
      futureFlow: '未來的確認流程',
      flowIdentified: 'AI 辨識', flowHigh: '高信心度', flowMedium: '中信心度', flowLow: '低信心度', flowReady: '已就緒', flowHuman: '需要專人確認', flowAttention: '需要你處理',
      previewTitle: '示範擷取預覽',
      previewNote: '此原型中的數值皆為虛構。沒有讀取任何檔案，也沒有 AI 分析這份文件。',
      confidence: '信心度', high: '高', medium: '中', low: '低',
      noPreview: '這類文件的擷取預覽將在未來階段推出。',
      reviewWhy: '為什麼需要確認',
      reasons: {
        hardToRead: '這份文件有部分內容不易辨識，因此會由專人確認。',
        missingPage: '這份文件可能缺少頁面，因此會由專人確認。',
        oneValue: '專人會再確認這份文件上的一個數值。',
        teamCheck: '專人會快速檢查這份文件。',
        requested: '我們需要你針對這份文件補充資料 — 請查看「待補資料」。',
      },
    },
    missing: {
      heading: n => n === 0 ? '沒有需要補的資料了' : `還需要 ${n} 項資料`,
      intro: '每一項都可以上傳、告訴我們不適用，或向我們提問。',
      allDone: '你已回覆所有索取的項目。請前往「確認與提交」。',
      actions: { upload: '上傳文件', dontHave: '我沒有這份文件', ask: '提出問題', addInfo: '填寫資料', notApplicable: '不適用' },
      undo: '復原',
      uploadNotice: '僅為示範 — 安全的文件上傳功能將在未來階段推出。',
      addInfoNotice: '僅為示範 — 填寫托育服務提供者資料的安全表單將在未來階段推出。',
    },
    review: {
      heading: '確認與提交',
      intro: '快速確認所有資料是否已就緒。',
      rows: { personal: '個人資料', situation: '稅務情況', documents: '稅務文件', missing: '待補資料', ready: '可進入報稅準備' },
      yes: '是', no: '否',
      incomplete: '請先完成剩下的項目，再提交稅務資料進入報稅準備。',
      complete: '資料都齊了。你可以提交稅務資料，進入報稅準備。',
      submit: '提交，進入報稅準備',
      submitted: '示範確認 — 沒有傳送任何資料。在正式的客戶入口中，你的稅務資料會在這一步進入報稅準備。',
      demoControls: '示範控制',
      demoComplete: n => n ? `模擬完成 ${n} 項待補資料` : '模擬完成待補資料',
      demoReset: '重設示範',
    },
    staff: {
      title: '員工審核示範',
      intro: '未來員工畫面的預覽。客戶永遠看不到這個畫面。這裡的操作只會改變本頁的示範資料，不會儲存或傳送任何資料。',
      actingAs: '示範登入身分', actor: 'Demo Preparer · 報稅準備人員，負責這份稅表',
      summary: '稅表', client: '客戶', taxYear: '稅務年度', workflow: '流程狀態', preparer: '負責準備人員', reviewer: '審核人員',
      workflowStatus: {
        INTAKE: '資料填寫', DOCUMENT_COLLECTION: '收集文件', DOCUMENT_REVIEW: '文件審核', READY_FOR_PREPARATION: '可進入報稅準備',
        IN_PREPARATION: '報稅準備中', READY_FOR_REVIEW: '待審核', UNDER_REVIEW: '審核中', READY_FOR_CLIENT: '待客戶確認', COMPLETED: '已完成',
      },
      queue: '待審核佇列', queueEmpty: '沒有未處理的例外 — 所有文件都已就緒。',
      route: { DOCUMENT_REVIEW: '整份文件審核', FIELD_REVIEW: '僅審核特定欄位' },
      overall: '整體信心度', band: { HIGH: '高', MEDIUM: '中', LOW: '低' }, processor: '處理程式', validation: '結構驗證',
      validationStatus: { PASSED: '通過', FAILED: '未通過', NOT_RUN: '未執行' },
      exceptionType: {
        LOW_CONFIDENCE: '信心度低', UNREADABLE: '無法辨識', MISSING_PAGE: '缺少頁面', DOCUMENT_TYPE_UNCERTAIN: '文件類型不確定',
        DUPLICATE_DOCUMENT: '重複文件', CONFLICTING_VALUE: '數值互相矛盾', CHECKLIST_MISMATCH: '與清單不符',
        UNEXPECTED_DOCUMENT: '非預期文件', MANUAL_REVIEW_REQUESTED: '要求人工審核',
      },
      severity: { LOW: '低嚴重度', MEDIUM: '中嚴重度', HIGH: '高嚴重度' },
      field: '待確認欄位', aiValue: 'AI 擷取值', confidence: '信心度', page: '頁', reason: '原因',
      actions: {
        confirm: '確認', correct: '更正', save: '儲存更正', cancel: '取消',
        requestClearer: '要求較清楚的文件', requestPages: '要求補上缺少的頁面', dismiss: '略過 — 不需要',
      },
      correctLabel: '更正後金額（美元）', invalid: '請輸入整數金額。',
      waiting: '等待客戶 — 已將要求加入客戶的「待補資料」。',
      clientResponded: '客戶已標示提供（示範）。重新處理新副本將在未來階段推出。',
      ready: '已就緒文件', readyHint: '沒有未處理的例外，結構驗證通過。',
      fieldStatus: { AUTO_ACCEPTED: '自動接受', NEEDS_REVIEW: '需要審核', HUMAN_CONFIRMED: '員工已確認', HUMAN_CORRECTED: '員工已更正', REJECTED: '已拒絕' },
      history: '審核紀錄', historyEmpty: '尚無審核動作。',
      historyHint: '業務審核紀錄，只保存在本頁記憶體中 — 不是安全稽核紀錄。',
      action: {
        CONFIRM_VALUE: '確認數值', CORRECT_VALUE: '更正數值', REQUEST_CLEARER_DOCUMENT: '要求較清楚的文件',
        REQUEST_MISSING_PAGES: '要求補上缺少的頁面', DISMISS_EXCEPTION: '略過例外',
      },
      notes: '內部備註', notesHint: '僅限員工 — 絕不會顯示給客戶、文件處理程式或公開的 Lina 助理。',
      policy: '判斷規則（示範）',
      policyText: '示範用分級：高 ≥ 90%、中 ≥ 75%、低於此為低。只有在結構驗證通過且沒有未處理例外時，文件才會就緒 — 單靠高信心度絕不會自動核准文件。正式門檻尚未決定。',
      back: '返回客戶畫面',
    },
    assistant: {
      title: '入口協助（預覽）',
      sub: '未來可以回答清單相關問題的助理。在這個原型中，回答都是預先寫好的範例 — 不構成稅務建議，也不會傳送任何資料。',
      chips: { missing: '我還缺什麼？', why1098: '為什麼需要 Form 1098？', next: '接下來會怎樣？' },
      answers: {
        missingSome: items => `你還需要：${items.join('；')}。你可以在「待補資料」頁面上傳每一項、告訴我們不適用，或提出問題。`,
        missingNone: '沒有缺少任何資料了。請前往「確認與提交」，提交你的稅務資料進入報稅準備。',
        why1098: '你告訴我們你有自住房屋。如果你在 2025 年支付了房貸利息，你的貸款機構可能會寄給你 Form 1098，所以我們向你索取。如果你沒有房貸，請選擇「我沒有這份文件」。',
        next: '文件齊全後，你可以在「確認與提交」頁面提交，你的稅表就可以進入報稅準備。',
      },
    },
    security: '你的稅務文件將透過安全的文件流程處理。',
    langLabel: '語言',
  },
}

module.exports = { USERS, CLIENT_PROFILE, STAFF_PROFILES, ACTORS, TAX_SITUATIONS, buildSeedState, followUpText, UI }

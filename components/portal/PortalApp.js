import { useEffect, useMemo, useState } from 'react'
import { CLIENT_PROFILE, ACTORS, buildSeedState, followUpText, UI } from '../../lib/portal-demo-data'
import { CHECKLIST_STATUS, CHECKLIST_TYPE, WORKFLOW_STATUS, reduce, toClientView } from '../../lib/portal-model'
import { Overview, AboutYou, TaxSituation, Documents, MissingItems, Review } from './PortalSections'
import StaffReview from './StaffReview'
import styles from './portal.module.css'

/**
 * AskLinTax Client Portal — static workflow prototype (Phase 1 UX on the Phase 2A domain model).
 *
 * Front end only: fictional demo data (lib/portal-demo-data.js), local React state,
 * no authentication, no storage, no uploads, no network calls, no Lina backend.
 * Client screens receive only toClientView(model); staff detail is rendered only in the
 * separate Staff Review Demo.
 */

const VIEWS = ['overview', 'about', 'situation', 'documents', 'missing', 'review']
const TO_STATUS = { provided: CHECKLIST_STATUS.RECEIVED, notNeeded: CHECKLIST_STATUS.NOT_APPLICABLE }
const FROM_STATUS = { NEEDED: null, RECEIVED: 'provided', RESOLVED: 'provided', NOT_APPLICABLE: 'notNeeded' }

export default function PortalApp() {
  const [lang, setLang] = useState('en')
  const [mode, setMode] = useState('client') // 'client' | 'staff' (demo switch)
  const [view, setView] = useState('overview')
  const [docId, setDocId] = useState(null)
  const [model, setModel] = useState(buildSeedState)
  const t = UI[lang]

  // ?lang=zh-tw opens the Traditional Chinese version, ?mode=staff the staff demo; keep <html lang> in sync.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.get('lang') === 'zh-tw') setLang('zh-tw')
    if (q.get('mode') === 'staff') setMode('staff')
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === 'zh-tw' ? 'zh-Hant' : 'en'
  }, [lang])

  function dispatch(actor, cmds) {
    const now = new Date().toISOString()
    setModel(s => [].concat(cmds).reduce((acc, cmd) => reduce(acc, { ...cmd, actor, now }), s))
  }

  // ── client projection ──
  const client = useMemo(() => toClientView(model), [model])
  const missingItems = client.checklist.filter(c => !c.documentId || c.type === CHECKLIST_TYPE.FOLLOW_UP)
  const missing = Object.fromEntries(missingItems.map(c => [c.id, FROM_STATUS[c.status] ?? null]))

  const state = useMemo(() => {
    const base = client.checklist.filter(c => c.type !== CHECKLIST_TYPE.FOLLOW_UP)
    const notNeeded = base.filter(c => c.status === CHECKLIST_STATUS.NOT_APPLICABLE).length
    const received = base.filter(c => c.status === CHECKLIST_STATUS.RECEIVED || c.status === CHECKLIST_STATUS.RESOLVED).length
    const remaining = missingItems.filter(c => c.status === CHECKLIST_STATUS.NEEDED)
    const resolvedShare = client.checklist.filter(c => c.status !== CHECKLIST_STATUS.NEEDED).length / client.checklist.length
    const submitted = client.taxReturn.workflowStatus !== WORKFLOW_STATUS.DOCUMENT_COLLECTION
    const ready = remaining.length === 0
    // Weights: About You 20 · Tax Situation 20 · Documents 50 · Review 10
    const progress = Math.round(20 + 20 + 50 * resolvedShare + (submitted ? 10 : 0))
    return { received, total: base.length - notNeeded, remaining, ready, progress, submitted }
  }, [client]) // eslint-disable-line react-hooks/exhaustive-deps

  function go(next) {
    setView(next)
    setDocId(null)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function setItem(id, value) {
    const item = missingItems.find(c => c.id === id)
    const status = value === null ? CHECKLIST_STATUS.NEEDED
      : item && item.type === CHECKLIST_TYPE.FOLLOW_UP && value === 'provided' ? CHECKLIST_STATUS.RESOLVED : TO_STATUS[value]
    dispatch(ACTORS.client, { type: 'CLIENT_SET_ITEM', itemId: id, status })
  }
  function completeAll() {
    dispatch(ACTORS.client, state.remaining.map(c => ({
      type: 'CLIENT_SET_ITEM', itemId: c.id, status: c.type === CHECKLIST_TYPE.FOLLOW_UP ? CHECKLIST_STATUS.RESOLVED : CHECKLIST_STATUS.RECEIVED,
    })))
  }
  function submit() { dispatch(ACTORS.client, { type: 'CLIENT_SUBMIT' }) }
  function resetDemo() { setModel(buildSeedState()); setDocId(null) }
  function staffDispatch(cmd) {
    if (cmd.type === 'STAFF_REQUEST_DOCUMENT') {
      const exc = model.exceptions.find(e => e.id === cmd.exceptionId)
      const doc = exc && model.documents.find(d => d.id === exc.documentId)
      if (!doc) return
      cmd = { ...cmd, text: followUpText(doc, exc.type === 'MISSING_PAGE') }
    }
    dispatch(ACTORS.preparer, cmd)
  }
  function switchMode(next) {
    setMode(next)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

  const navStatus = {
    overview: null,
    about: { tone: 'done', text: t.status.complete },
    situation: { tone: 'done', text: t.status.complete },
    documents: { tone: state.ready ? 'done' : 'todo', text: t.overview.docsOf(state.received, state.total) },
    missing: { tone: state.ready ? 'done' : 'todo', text: state.ready ? t.status.complete : String(state.remaining.length) },
    review: { tone: state.submitted ? 'done' : state.ready ? 'ready' : 'muted', text: state.submitted ? t.status.complete : state.ready ? t.status.ready : t.status.notReady },
  }

  const props = {
    t, lang, state, missing, missingItems, documents: client.documents, go, setItem, docId, setDocId, completeAll, resetDemo, submit,
  }

  return (
    <div className={styles.portal} lang={lang === 'zh-tw' ? 'zh-Hant' : 'en'}>
      <div className={styles.demoBanner} role="note">
        <span>{t.demoBanner}</span>
        <span className={styles.modeSwitch} role="group" aria-label={t.demoView.label}>
          <span className={styles.modeLabel}>{t.demoView.label}:</span>
          <button type="button" aria-pressed={mode === 'client'} onClick={() => switchMode('client')}>{t.demoView.client}</button>
          <button type="button" aria-pressed={mode === 'staff'} onClick={() => switchMode('staff')}>{t.demoView.staff}</button>
        </span>
      </div>

      <header className={styles.topbar}>
        <a href="/" className={styles.brand}>Ask <span>Lin</span> Tax</a>
        <span className={styles.portalLabel}>{mode === 'staff' ? t.staff.title : lang === 'zh-tw' ? '客戶入口' : 'Client Portal'}</span>
        <div className={styles.topActions}>
          <div className={styles.langSwitch} role="group" aria-label={t.langLabel}>
            <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'} lang="en">EN</button>
            <button type="button" onClick={() => setLang('zh-tw')} aria-pressed={lang === 'zh-tw'} lang="zh-Hant">繁中</button>
          </div>
          <a href="/" className={styles.exit}>{t.exitDemo}</a>
        </div>
      </header>

      {mode === 'staff' ? (
        <StaffReview t={t} lang={lang} model={model} dispatch={staffDispatch} onBack={() => switchMode('client')} />
      ) : (
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.returnCard}>
              <div className={styles.returnTitle}>{t.returnTitle}</div>
              <div className={styles.returnName}>{CLIENT_PROFILE.displayName}</div>
              <div className={styles.returnType}>{t.returnType}</div>
              <div className={styles.progressLabel}>
                <span>{t.progress}</span><strong>{state.progress}%</strong>
              </div>
              <div className={styles.progressTrack} role="progressbar" aria-valuenow={state.progress} aria-valuemin={0} aria-valuemax={100} aria-label={t.progress}>
                <div className={styles.progressFill} style={{ width: `${state.progress}%` }} />
              </div>
            </div>

            <nav className={styles.nav} aria-label={lang === 'zh-tw' ? '入口導覽' : 'Portal'}>
              {VIEWS.map(v => (
                <button key={v} type="button" className={`${styles.navItem} ${view === v ? styles.navActive : ''}`} aria-current={view === v ? 'page' : undefined} onClick={() => go(v)}>
                  <span className={styles.navText}>{t.nav[v]}</span>
                  {navStatus[v] && <span className={`${styles.navStatus} ${styles['tone_' + navStatus[v].tone]}`}>{navStatus[v].text}</span>}
                </button>
              ))}
            </nav>

            <p className={styles.securityNote}>{t.security}</p>
          </aside>

          <main className={styles.main}>
            {view === 'overview' && <Overview {...props} />}
            {view === 'about' && <AboutYou {...props} />}
            {view === 'situation' && <TaxSituation {...props} />}
            {view === 'documents' && <Documents {...props} />}
            {view === 'missing' && <MissingItems {...props} />}
            {view === 'review' && <Review {...props} />}
          </main>
        </div>
      )}
    </div>
  )
}

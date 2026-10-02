import { useState } from 'react'
import { CLIENT_PROFILE, STAFF_PROFILES } from '../../lib/portal-demo-data'
import { CHECKLIST_STATUS, EXCEPTION_STATUS, confidenceBand, decideDocument, formatValue } from '../../lib/portal-model'
import styles from './portal.module.css'

/**
 * Staff Review Demo — a preview of the future staff exception-review screen.
 * Rendered only when the demo switch is set to "Staff". Every action dispatches a local command
 * (lib/portal-model.js reduce) and records a ReviewAction in memory. Nothing is saved or sent.
 */

const L = (value, lang) => (value && typeof value === 'object' ? value[lang] : value)
const pct = n => `${Math.round(n * 100)}%`
const usd = n => (typeof n === 'number' ? '$' + n.toLocaleString('en-US') : String(n))
const staffName = id => (STAFF_PROFILES.find(p => p.id === id) || {}).displayName || '—'

function Pill({ tone, children }) {
  return <span className={`${styles.pill} ${styles['pill_' + tone]}`}>{children}</span>
}

export default function StaffReview({ t, lang, model, dispatch, onBack }) {
  const s = t.staff
  const ret = model.taxReturn
  const rows = model.documents.map(doc => {
    const job = model.jobs.find(j => j.documentId === doc.id)
    const excs = model.exceptions.filter(e => e.documentId === doc.id)
    return { doc, job, excs, fields: model.fields.filter(f => f.documentId === doc.id), decision: decideDocument(job, excs) }
  })
  const queue = rows.filter(r => r.decision.route !== 'READY')
  const ready = rows.filter(r => r.decision.route === 'READY')
  const docName = id => {
    const d = model.documents.find(x => x.id === id)
    return d ? `${L(d.displayName, lang)} — ${L(d.issuer, lang)}` : id
  }

  return (
    <div className={styles.staffLayout}>
      <div className={styles.staffMain}>
        <div className={styles.pageHead}>
          <div className={styles.statusLine}><span className={styles.demoTag}>{s.title}</span></div>
          <h1 className={styles.h1}>{s.queue}</h1>
          <p className={styles.intro}>{s.intro}</p>
        </div>

        {queue.length === 0 && <p className={styles.notice} role="status">{s.queueEmpty}</p>}

        {queue.map(({ doc, job, excs, fields, decision }) => (
          <section key={doc.id} className={styles.staffCard} aria-label={docName(doc.id)}>
            <div className={styles.staffCardHead}>
              <h2 className={styles.h2}>{docName(doc.id)}</h2>
              <Pill tone="warn">{s.route[decision.route]}</Pill>
            </div>
            <p className={styles.staffMeta}>
              {s.overall}: <strong>{pct(job.overallConfidence)}</strong> ({s.band[confidenceBand(job.overallConfidence)]})
              {' · '}{s.validation}: {s.validationStatus[job.validationStatus]}
              {' · '}{s.processor}: {job.processor} ({job.processorVersion})
            </p>

            {fields.length > 0 && (
              <ul className={styles.fieldTable}>
                {fields.map(f => (
                  <li key={f.id}>
                    <span className={styles.fieldLabel}>{L(f.label, lang)}</span>
                    <span>{formatValue(f)}</span>
                    <span className={styles.fieldConf}>{pct(f.confidence)}</span>
                    <Pill tone={f.reviewStatus === 'NEEDS_REVIEW' ? 'warn' : 'done'}>{s.fieldStatus[f.reviewStatus]}</Pill>
                  </li>
                ))}
              </ul>
            )}

            {excs.filter(e => e.status === EXCEPTION_STATUS.OPEN).map(exc => (
              <ExceptionCard key={exc.id} s={s} lang={lang} exc={exc} model={model}
                field={exc.fieldId ? fields.find(f => f.id === exc.fieldId) : null} dispatch={dispatch} />
            ))}
          </section>
        ))}

        <section className={styles.card}>
          <h2 className={styles.h3}>{s.ready}</h2>
          <p className={styles.fineNote}>{s.readyHint}</p>
          <ul className={styles.readyList}>
            {ready.map(({ doc, job, fields }) => {
              const reviewed = fields.filter(f => f.reviewStatus === 'HUMAN_CONFIRMED' || f.reviewStatus === 'HUMAN_CORRECTED')
              return (
                <li key={doc.id}>
                  <span className={styles.fieldLabel}>{docName(doc.id)}</span>
                  <span className={styles.fieldConf}>{pct(job.overallConfidence)}</span>
                  <Pill tone="done">{reviewed.length ? s.fieldStatus[reviewed[0].reviewStatus] : t.status.ready}</Pill>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <aside className={styles.staffSide}>
        <section className={styles.card}>
          <h2 className={styles.h3}>{s.summary}</h2>
          <dl className={styles.dl}>
            <div className={styles.dlRow}><dt>{s.actingAs}</dt><dd>{s.actor}</dd></div>
            <div className={styles.dlRow}><dt>{s.client}</dt><dd>{CLIENT_PROFILE.displayName}</dd></div>
            <div className={styles.dlRow}><dt>{s.taxYear}</dt><dd>{ret.taxYear}</dd></div>
            <div className={styles.dlRow}><dt>{s.workflow}</dt><dd>{s.workflowStatus[ret.workflowStatus]}</dd></div>
            <div className={styles.dlRow}><dt>{s.preparer}</dt><dd>{staffName(ret.assignedPreparerId)}</dd></div>
            <div className={styles.dlRow}><dt>{s.reviewer}</dt><dd>{staffName(ret.reviewerId)}</dd></div>
          </dl>
        </section>

        <section className={styles.card}>
          <h2 className={styles.h3}>{s.policy}</h2>
          <p className={styles.fineNote}>{s.policyText}</p>
        </section>

        <section className={styles.card} aria-live="polite">
          <h2 className={styles.h3}>{s.history}</h2>
          {model.reviewActions.length === 0 ? <p className={styles.fineNote}>{s.historyEmpty}</p> : (
            <ol className={styles.historyList}>
              {[...model.reviewActions].reverse().map(a => (
                <li key={a.id}>
                  <strong>{s.action[a.action]}</strong>
                  <span>{docName(a.documentId)}</span>
                  {a.action === 'CORRECT_VALUE' && <span>{usd(a.previousValue)} → {usd(a.newValue)}</span>}
                  {a.action === 'CONFIRM_VALUE' && <span>{usd(a.newValue)}</span>}
                  <span className={styles.fineNote}>
                    {(STAFF_PROFILES.find(p => p.userId === a.actorId) || {}).displayName || a.actorId} ({a.actorRole}) · {new Date(a.timestamp).toLocaleTimeString(lang === 'zh-tw' ? 'zh-TW' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ol>
          )}
          <p className={styles.fineNote}>{s.historyHint}</p>
        </section>

        <section className={`${styles.card} ${styles.notesCard}`}>
          <h2 className={styles.h3}>{s.notes}</h2>
          {model.notes.map(n => (
            <p key={n.id} className={styles.noteBody}><span className={styles.fineNote}>{docName(n.documentId)}</span><br />{n.body}</p>
          ))}
          <p className={styles.fineNote}>{s.notesHint}</p>
        </section>

        <button type="button" className={styles.secondaryBtn} onClick={onBack}>← {s.back}</button>
      </aside>
    </div>
  )
}

function ExceptionCard({ s, lang, exc, field, model, dispatch }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState(false)
  const followUp = exc.followUpItemId && model.checklist.find(c => c.id === exc.followUpItemId)
  const waiting = followUp && followUp.status === CHECKLIST_STATUS.NEEDED
  const run = type => dispatch({ type, exceptionId: exc.id })

  function save() {
    const clean = draft.replace(/[$,\s]/g, '')
    if (!/^\d{1,9}$/.test(clean)) { setError(true); return }
    dispatch({ type: 'STAFF_CORRECT', exceptionId: exc.id, value: Number(clean) })
    setEditing(false)
  }

  return (
    <div className={styles.excCard}>
      <div className={styles.excHead}>
        <Pill tone="todo">{s.exceptionType[exc.type]}</Pill>
        <span className={styles.fineNote}>{s.severity[exc.severity]}</span>
      </div>
      <p className={styles.excMsg}><strong>{s.reason}:</strong> {exc.message}</p>

      {field && (
        <dl className={styles.dl}>
          <div className={styles.dlRow}><dt>{s.field}</dt><dd>{L(field.label, lang)}</dd></div>
          <div className={styles.dlRow}><dt>{s.aiValue}</dt><dd>{formatValue(field)}</dd></div>
          <div className={styles.dlRow}><dt>{s.confidence}</dt><dd>{pct(field.confidence)}</dd></div>
          {field.sourcePage && <div className={styles.dlRow}><dt>{s.page}</dt><dd>{field.sourcePage}</dd></div>}
        </dl>
      )}

      {waiting && <p className={styles.notice} role="status">{s.waiting}</p>}
      {followUp && !waiting && <p className={styles.notice} role="status">{s.clientResponded}</p>}

      {editing ? (
        <div className={styles.correctRow}>
          <label className={styles.correctLabel}>
            {s.correctLabel}
            <input className={styles.input} inputMode="numeric" autoComplete="off" value={draft}
              onChange={e => { setDraft(e.target.value); setError(false) }} aria-invalid={error} />
          </label>
          {error && <p className={styles.inputError} role="alert">{s.invalid}</p>}
          <div className={styles.actionRow}>
            <button type="button" className={styles.primaryBtn} onClick={save}>{s.actions.save}</button>
            <button type="button" className={styles.secondaryBtn} onClick={() => { setEditing(false); setError(false) }}>{s.actions.cancel}</button>
          </div>
        </div>
      ) : (
        <div className={styles.actionRow}>
          {field && <button type="button" className={styles.primaryBtn} onClick={() => run('STAFF_CONFIRM')}>{s.actions.confirm}</button>}
          {field && <button type="button" className={styles.secondaryBtn} onClick={() => { setDraft(String(field.value)); setEditing(true) }}>{s.actions.correct}</button>}
          {!waiting && (
            <button type="button" className={styles.secondaryBtn} onClick={() => run('STAFF_REQUEST_DOCUMENT')}>
              {exc.type === 'MISSING_PAGE' ? s.actions.requestPages : s.actions.requestClearer}
            </button>
          )}
          {!field && <button type="button" className={styles.secondaryBtn} onClick={() => run('STAFF_DISMISS')}>{s.actions.dismiss}</button>}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { CLIENT_PROFILE, TAX_SITUATIONS } from '../../lib/portal-demo-data'
import PortalAssistant from './PortalAssistant'
import styles from './portal.module.css'

// Bilingual field helper: plain strings (form names, company names) are shown as-is.
const L = (value, lang) => (value && typeof value === 'object' ? value[lang] : value)

function StatusPill({ tone, children }) {
  return <span className={`${styles.pill} ${styles['pill_' + tone]}`}>{children}</span>
}

function PageHead({ title, intro }) {
  return (
    <div className={styles.pageHead}>
      <h1 className={styles.h1}>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}

// ── OVERVIEW ───────────────────────────────────────────────
export function Overview({ t, lang, state, go, missing }) {
  const o = t.overview
  const remaining = state.remaining.length
  const steps = [
    { key: 'about', label: t.nav.about, tone: 'done', text: t.status.complete },
    { key: 'situation', label: t.nav.situation, tone: 'done', text: t.status.complete },
    { key: 'documents', label: t.nav.documents, tone: state.ready ? 'done' : 'todo', text: state.ready ? t.status.complete : o.docsOf(state.received, state.total) },
    { key: 'review', label: t.nav.review, tone: state.submitted ? 'done' : state.ready ? 'ready' : 'muted', text: state.submitted ? t.status.complete : state.ready ? t.status.ready : t.status.notReady },
  ]
  const next = state.submitted
    ? { title: o.nextDone, sub: o.nextDoneSub }
    : remaining > 0
      ? { title: o.nextMissing(remaining), sub: o.nextMissingSub, cta: o.ctaMissing, to: 'missing' }
      : { title: o.nextReview, sub: o.nextReviewSub, cta: o.ctaReview, to: 'review' }

  return (
    <>
      <PageHead title={o.heading} intro={o.where} />

      <section className={styles.nextCard} aria-labelledby="next-step">
        <div className={styles.nextLabel}>{o.nextLabel}</div>
        <h2 id="next-step" className={styles.nextTitle}>{next.title}</h2>
        <p className={styles.nextSub}>{next.sub}</p>
        {remaining > 0 && !state.submitted && (
          <ul className={styles.nextList}>
            {state.remaining.map(m => <li key={m.id}>{L(m.label, lang)}</li>)}
          </ul>
        )}
        {next.cta && <button type="button" className={styles.primaryBtn} onClick={() => go(next.to)}>{next.cta} →</button>}
      </section>

      <section className={styles.card}>
        <div className={styles.progressRow}>
          <h2 className={styles.h2}>{o.steps}</h2>
          <strong className={styles.bigPercent}>{state.progress}%</strong>
        </div>
        <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${state.progress}%` }} /></div>
        <ol className={styles.stepList}>
          {steps.map((s, i) => (
            <li key={s.key}>
              <button type="button" className={styles.stepRow} onClick={() => go(s.key)}>
                <span className={`${styles.stepDot} ${styles['tone_' + s.tone]}`} aria-hidden="true">{s.tone === 'done' ? '✓' : i + 1}</span>
                <span className={styles.stepName}>{s.label}</span>
                <StatusPill tone={s.tone}>{s.text}</StatusPill>
              </button>
            </li>
          ))}
        </ol>
        <p className={styles.reassure}>{o.reassure}</p>
      </section>

      <PortalAssistant t={t} lang={lang} state={state} />
    </>
  )
}

// ── ABOUT YOU ──────────────────────────────────────────────
export function AboutYou({ t, lang }) {
  const a = t.about
  const groups = [
    { title: a.personal, rows: [[a.name, CLIENT_PROFILE.displayName], [a.filingStatus, a.filingStatusValue], [a.residency, a.residencyValue], [a.city, L(CLIENT_PROFILE.city, lang)]] },
    { title: a.spouse, rows: [[a.name, CLIENT_PROFILE.household.spouse]] },
    { title: `${a.dependents} · ${a.dependentsCount(CLIENT_PROFILE.household.dependents.length)}`, rows: CLIENT_PROFILE.household.dependents.map(d => [d.name, a.age(d.age)]) },
    { title: a.contact, rows: [[a.email, CLIENT_PROFILE.contactEmail], [a.phone, CLIENT_PROFILE.contactPhone]] },
  ]
  return (
    <>
      <PageHead title={a.heading} intro={a.intro} />
      <div className={styles.statusLine}><StatusPill tone="done">{t.status.complete}</StatusPill></div>
      <div className={styles.infoGrid}>
        {groups.map(g => (
          <section key={g.title} className={styles.card}>
            <h2 className={styles.h3}>{g.title}</h2>
            <dl className={styles.dl}>
              {g.rows.map(([k, v]) => (
                <div key={k} className={styles.dlRow}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className={styles.fineNote}>{a.noIds}</p>
    </>
  )
}

// ── TAX SITUATION ──────────────────────────────────────────
export function TaxSituation({ t, lang }) {
  const s = t.situation
  return (
    <>
      <PageHead title={s.heading} intro={s.intro} />
      <div className={styles.statusLine}><StatusPill tone="done">{t.status.complete}</StatusPill></div>
      <ul className={styles.situationGrid}>
        {TAX_SITUATIONS.map(item => (
          <li key={item.id} className={`${styles.situation} ${item.applies ? styles.situationOn : ''}`}>
            <span className={styles.situationMark} aria-hidden="true">{item.applies ? '✓' : ''}</span>
            <span className={styles.situationText}>{L(item.label, lang)}</span>
            <span className={styles.srOnly}>{item.applies ? s.applies : s.notApplies}</span>
          </li>
        ))}
      </ul>
      <p className={styles.fineNote}>{s.drives}</p>
    </>
  )
}

// ── DOCUMENTS ──────────────────────────────────────────────
// Client-facing document status: Received (team may still be checking) · Needs attention · Ready.
const DOC_PILL = { ready: ['done', 'received'], received: ['ready', 'received'], attention: ['warn', 'review'] }
const DOC_META = { ready: 'ready', received: 'checking', attention: 'review' }

export function Documents({ t, lang, state, missing, missingItems, documents, go, docId, setDocId }) {
  const d = t.documents
  const open = docId && documents.find(x => x.id === docId)
  if (open) return <DocumentDetail t={t} lang={lang} doc={open} onBack={() => setDocId(null)} />

  const provided = missingItems.filter(m => missing[m.id] === 'provided')
  const stillNeeded = missingItems.filter(m => missing[m.id] !== 'provided')

  return (
    <>
      <PageHead title={d.heading} intro={d.intro} />
      <div className={styles.statusLine}>
        <strong>{d.countLine(state.received, state.total)}</strong>
        <span className={styles.demoTag}>{d.demoTag}</span>
      </div>

      <h2 className={styles.groupTitle}>{d.receivedGroup}</h2>
      <ul className={styles.docList}>
        {documents.map(doc => {
          const [tone, label] = DOC_PILL[doc.status]
          return (
            <li key={doc.id}>
              <button type="button" className={styles.docCard} onClick={() => setDocId(doc.id)}>
                <span className={styles.docMain}>
                  <span className={styles.docName}>{L(doc.displayName, lang)}</span>
                  <span className={styles.docSource}>{L(doc.issuer, lang)}</span>
                  <span className={styles.docMeta}>
                    {d.identified} · {d.type}: {L(doc.displayName, lang)} · {d.statusLabel}: {t.status[DOC_META[doc.status]]}
                  </span>
                </span>
                <span className={styles.docSide}>
                  <StatusPill tone={tone}>{t.status[label]}</StatusPill>
                  <span className={styles.docOpen}>{d.open} →</span>
                </span>
              </button>
            </li>
          )
        })}
        {provided.map(m => (
          <li key={m.id}>
            <div className={`${styles.docCard} ${styles.docStatic}`}>
              <span className={styles.docMain}>
                <span className={styles.docName}>{L(m.label, lang)}</span>
              </span>
              <span className={styles.docSide}><StatusPill tone="done">{t.status.provided}</StatusPill></span>
            </div>
          </li>
        ))}
      </ul>

      {stillNeeded.length > 0 && (
        <>
          <h2 className={styles.groupTitle}>{d.missingGroup}</h2>
          <ul className={styles.docList}>
            {stillNeeded.map(m => {
              const resolved = missing[m.id] === 'notNeeded'
              return (
                <li key={m.id}>
                  <button type="button" className={`${styles.docCard} ${resolved ? '' : styles.docMissing}`} onClick={() => go('missing')}>
                    <span className={styles.docMain}>
                      <span className={styles.docName}>{L(m.label, lang)}</span>
                      <span className={styles.docSource}>{L(m.reason, lang)}</span>
                    </span>
                    <span className={styles.docSide}>
                      <StatusPill tone={resolved ? 'muted' : 'todo'}>{resolved ? notNeededLabel(m, t) : t.status.missing}</StatusPill>
                      <span className={styles.docOpen}>{t.nav.missing} →</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
      <p className={styles.fineNote}>{t.security}</p>
    </>
  )
}

function DocumentDetail({ t, lang, doc, onBack }) {
  const x = t.detail
  const [tone, label] = DOC_PILL[doc.status]
  const outcome = { ready: x.flowReady, received: x.flowHuman, attention: x.flowAttention }[doc.status]
  // Confidence stays internal (approved decision): clients see only received → outcome.
  const flow = [x.flowIdentified, outcome]
  return (
    <>
      <button type="button" className={styles.backLink} onClick={onBack}>← {x.back}</button>
      <PageHead title={`${L(doc.displayName, lang)} — ${L(doc.issuer, lang)}`} />
      <div className={styles.statusLine}><span className={styles.demoTag}>{t.documents.demoTag}</span></div>

      <section className={styles.card}>
        <dl className={styles.dl}>
          <div className={styles.dlRow}><dt>{x.status}</dt><dd><StatusPill tone={tone}>{t.status[label]}</StatusPill></dd></div>
          <div className={styles.dlRow}><dt>{x.docType}</dt><dd>{L(doc.displayName, lang)}</dd></div>
          <div className={styles.dlRow}><dt>{x.from}</dt><dd>{L(doc.issuer, lang)}</dd></div>
          <div className={styles.dlRow}><dt>{x.matched}</dt><dd>{L(doc.matched, lang)}</dd></div>
        </dl>
      </section>

      <section className={styles.card}>
        <h2 className={styles.h3}>{x.futureFlow}</h2>
        <ol className={styles.flow}>
          {flow.map((f, i) => (
            <li key={f} className={`${styles.flowStep} ${i === flow.length - 1 ? (doc.status === 'ready' ? styles.flowOk : styles.flowWarn) : ''}`}>{f}</li>
          ))}
        </ol>
        {doc.reason && (
          <p className={styles.reviewWhy}><strong>{x.reviewWhy}:</strong> {x.reasons[doc.reason]}</p>
        )}
      </section>

      <section className={`${styles.card} ${styles.previewCard}`}>
        <div className={styles.previewHead}>
          <h2 className={styles.h3}>{x.previewTitle}</h2>
          <span className={styles.demoTag}>{t.documents.demoTag}</span>
        </div>
        {doc.summary.length ? (
          <dl className={styles.dl}>
            {doc.summary.map(p => (
              <div key={p.key} className={styles.dlRow}><dt>{L(p.label, lang)}</dt><dd>{p.value}</dd></div>
            ))}
          </dl>
        ) : (
          <p className={styles.fineNote}>{x.noPreview}</p>
        )}
        <p className={styles.previewNote}>{x.previewNote}</p>
      </section>
    </>
  )
}

// ── MISSING ITEMS ──────────────────────────────────────────
const notNeededLabel = (item, t) => (item.clientActions.includes('dontHave') ? t.status.resolvedNotHave : t.status.resolvedNA)

export function MissingItems({ t, lang, state, missing, missingItems, setItem, go }) {
  const m = t.missing
  const [notice, setNotice] = useState({})
  const [asked, setAsked] = useState(false)
  const remaining = state.remaining.length

  function act(item, action) {
    if (action === 'upload') setNotice(n => ({ ...n, [item.id]: m.uploadNotice }))
    else if (action === 'addInfo') setNotice(n => ({ ...n, [item.id]: m.addInfoNotice }))
    else if (action === 'dontHave' || action === 'notApplicable') { setItem(item.id, 'notNeeded'); setNotice(n => ({ ...n, [item.id]: null })) }
    else if (action === 'ask') setAsked(true)
  }

  return (
    <>
      <PageHead title={m.heading(remaining)} intro={remaining ? m.intro : m.allDone} />
      <ol className={styles.missingList}>
        {missingItems.map((item, i) => {
          const value = missing[item.id]
          return (
            <li key={item.id} className={`${styles.missingCard} ${value ? styles.missingDone : ''}`}>
              <div className={styles.missingHead}>
                <span className={styles.missingNum} aria-hidden="true">{value ? '✓' : i + 1}</span>
                <h2 className={styles.missingTitle}>{L(item.label, lang)}</h2>
                {value
                  ? <StatusPill tone={value === 'provided' ? 'done' : 'muted'}>{value === 'provided' ? t.status.provided : notNeededLabel(item, t)}</StatusPill>
                  : <StatusPill tone="todo">{t.status.missing}</StatusPill>}
              </div>
              <p className={styles.missingExplain}>{L(item.reason, lang)}</p>
              {value ? (
                <button type="button" className={styles.linkBtn} onClick={() => setItem(item.id, null)}>{m.undo}</button>
              ) : (
                <div className={styles.actionRow}>
                  {item.clientActions.map((a, ai) => (
                    <button key={a} type="button" className={ai === 0 ? styles.primaryBtn : styles.secondaryBtn} onClick={() => act(item, a)}>{m.actions[a]}</button>
                  ))}
                </div>
              )}
              {notice[item.id] && !value && <p className={styles.notice} role="status">{notice[item.id]}</p>}
            </li>
          )
        })}
      </ol>
      {remaining === 0 && <button type="button" className={styles.primaryBtn} onClick={() => go('review')}>{t.overview.ctaReview} →</button>}
      <PortalAssistant t={t} lang={lang} state={state} open={asked} />
      <p className={styles.fineNote}>{t.security}</p>
    </>
  )
}

// ── REVIEW ─────────────────────────────────────────────────
export function Review({ t, lang, state, submit, completeAll, resetDemo }) {
  const r = t.review
  const rows = [
    [r.rows.personal, t.status.complete, 'done'],
    [r.rows.situation, t.status.complete, 'done'],
    [r.rows.documents, t.overview.docsOf(state.received, state.total), state.ready ? 'done' : 'todo'],
    [r.rows.missing, String(state.remaining.length), state.ready ? 'done' : 'todo'],
    [r.rows.ready, state.ready ? r.yes : r.no, state.ready ? 'done' : 'muted'],
  ]
  return (
    <>
      <PageHead title={r.heading} intro={r.intro} />
      <section className={styles.card}>
        <dl className={styles.dl}>
          {rows.map(([k, v, tone]) => (
            <div key={k} className={styles.dlRow}><dt>{k}</dt><dd><StatusPill tone={tone}>{v}</StatusPill></dd></div>
          ))}
        </dl>
        <p className={styles.reviewMsg}>{state.ready ? r.complete : r.incomplete}</p>
        <button type="button" className={styles.submitBtn} disabled={!state.ready || state.submitted} onClick={submit}>{r.submit}</button>
        {state.submitted && <p className={styles.notice} role="status">{r.submitted}</p>}
      </section>

      <section className={styles.demoControls} aria-label={r.demoControls}>
        <div className={styles.demoControlsTitle}>{r.demoControls}</div>
        <div className={styles.actionRow}>
          <button type="button" className={styles.secondaryBtn} onClick={completeAll} disabled={state.ready}>{r.demoComplete(state.remaining.length)}</button>
          <button type="button" className={styles.linkBtn} onClick={resetDemo}>{r.demoReset}</button>
        </div>
      </section>
    </>
  )
}

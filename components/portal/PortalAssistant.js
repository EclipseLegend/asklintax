import { useEffect, useState } from 'react'
import styles from './portal.module.css'

/**
 * Portal help — Phase 1 visual concept only.
 * Answers are pre-written and built from local demo state. Nothing is sent to the public
 * Lina backend or any other service.
 */
export default function PortalAssistant({ t, lang, state, open = false }) {
  const a = t.assistant
  const [question, setQuestion] = useState(open ? 'missing' : null)
  useEffect(() => { if (open) setQuestion('missing') }, [open])

  const answer = {
    missing: state.remaining.length
      ? a.answers.missingSome(state.remaining.map(m => m.label[lang]))
      : a.answers.missingNone,
    why1098: a.answers.why1098,
    next: a.answers.next,
  }[question]

  return (
    <section className={styles.assistant} aria-label={a.title}>
      <div className={styles.assistantHead}>
        <span className={styles.assistantIcon} aria-hidden="true">✦</span>
        <div>
          <h2 className={styles.assistantTitle}>{a.title}</h2>
          <p className={styles.assistantSub}>{a.sub}</p>
        </div>
      </div>
      <div className={styles.chips}>
        {Object.entries(a.chips).map(([key, label]) => (
          <button key={key} type="button" className={`${styles.chip} ${question === key ? styles.chipOn : ''}`} aria-pressed={question === key} onClick={() => setQuestion(key)}>{label}</button>
        ))}
      </div>
      {answer && <p className={styles.assistantAnswer} role="status">{answer}</p>}
    </section>
  )
}

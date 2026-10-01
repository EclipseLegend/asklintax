import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { askLin } from '../lib/ask-lin/client'
import { EXAMPLE_QUESTIONS } from '../lib/ask-lin/examples'
import { getArticle } from '../lib/library-i18n'
import { localePath } from '../lib/locale-routes'
import styles from './AskLin.module.css'

// Both languages are bundled: a reply can be in a different language from the page
// (e.g. a Chinese question asked on an English page).
const UI = {
  en: {
    open: 'Ask Lin',
    openLabel: 'Open Ask Lin, the tax question assistant',
    close: 'Close Ask Lin',
    title: 'Ask Lin',
    subtitle: 'U.S. tax questions, in English or 中文',
    preview: 'Preview',
    greeting: 'Hi, I’m Lina 👋 Ask a U.S. tax question in English or Chinese, or try an example below.',
    examplesLabel: 'Try an example',
    placeholder: 'Ask a tax question…',
    send: 'Send',
    inputLabel: 'Your question',
    thinking: 'Lina is typing…',
    guidesLabel: 'Related guides',
    englishGuide: 'English guide',
    footer: 'Preview only. General education, not tax advice. For your situation, consult a qualified tax professional.',
    privacy: 'Please don’t enter Social Security numbers, bank or account numbers, or other sensitive personal information.',
    library: 'Browse the Knowledge Library →',
    answerBadge: 'AI answer',
    answerNote: 'Generated only from AskLinTax’s published guides. General education, not tax advice.',
    handoff: 'Your situation may need personal advice — consider talking with a qualified tax professional.',
  },
  'zh-tw': {
    open: 'Ask Lin',
    openLabel: '開啟 Ask Lin 稅務問答',
    close: '關閉 Ask Lin',
    title: 'Ask Lin',
    subtitle: '美國稅務問題，中文或英文都可以問',
    preview: '預覽版',
    greeting: '嗨，我是 Lina 👋 可以用中文或英文問美國稅務問題，也可以先試試下面的示範問題。',
    examplesLabel: '示範問題',
    placeholder: '輸入你的稅務問題…',
    send: '送出',
    inputLabel: '你的問題',
    thinking: 'Lina 正在輸入…',
    guidesLabel: '相關指南',
    englishGuide: '英文指南',
    footer: '預覽版，僅供一般教育用途，不構成稅務建議。具體情況請諮詢合格的稅務專業人士。',
    privacy: '請勿輸入社會安全號碼（SSN）、銀行或帳戶號碼等敏感個人資料。',
    library: '瀏覽稅務知識庫 →',
    answerBadge: 'AI 回答',
    answerNote: '僅依據 AskLinTax 已發布的英文指南生成；中文為 AI 翻譯，未經 CPA 審核。僅供一般教育用途，不構成稅務建議。',
    handoff: '你的情況可能需要個人化建議，建議諮詢合格的稅務專業人士。',
  },
}

export default function AskLin({ locale = 'en' }) {
  const ui = UI[locale] || UI.en
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Return focus to the launcher after the panel closes (it re-renders only once closed).
  const wasOpen = useRef(false)
  useEffect(() => {
    if (!open && wasOpen.current) buttonRef.current?.focus()
    wasOpen.current = open
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  function close() {
    setOpen(false)
  }

  async function send(text) {
    const question = text.trim()
    if (!question || busy) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: question }])
    setBusy(true)
    try {
      const reply = await askLin({ question, locale })
      setMessages(m => [...m, { role: 'lin', ...reply }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {!open && (
        <button ref={buttonRef} type="button" className={styles.launcher} onClick={() => setOpen(true)}
          aria-label={ui.openLabel} aria-expanded="false" aria-controls="ask-lin-panel">
          <span className={styles.launcherIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </span>
          {ui.open}
        </button>
      )}

      {open && (
        <section id="ask-lin-panel" className={styles.panel} role="dialog" aria-label={ui.title} lang={locale === 'zh-tw' ? 'zh-Hant' : 'en'}>
          <header className={styles.head}>
            <div className={styles.avatar} aria-hidden="true">L</div>
            <div className={styles.headText}>
              <p className={styles.headTitle}>{ui.title} <span className={styles.previewTag}>{ui.preview}</span></p>
              <p className={styles.headSub}>{ui.subtitle}</p>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label={ui.close}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </header>

          <div className={styles.body} ref={listRef} aria-live="polite">
            <div className={`${styles.msg} ${styles.lin}`}>
              <p>{ui.greeting}</p>
            </div>

            {messages.length === 0 && (
              <div className={styles.examples}>
                <p className={styles.examplesLabel}>{ui.examplesLabel}</p>
                {EXAMPLE_QUESTIONS.map(f => (
                  <button key={f.id} type="button" className={styles.example} onClick={() => send(f[locale] || f.en)}>
                    {f[locale] || f.en}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => m.role === 'user'
              ? <div key={i} className={`${styles.msg} ${styles.user}`}><p>{m.text}</p></div>
              : <LinReply key={i} reply={m} />
            )}

            {busy && <div className={`${styles.msg} ${styles.lin} ${styles.typing}`}><span /><span /><span /><span className={styles.srOnly}>{ui.thinking}</span></div>}
          </div>

          <form className={styles.inputRow} onSubmit={e => { e.preventDefault(); send(input) }}>
            <label htmlFor="ask-lin-input" className={styles.srOnly}>{ui.inputLabel}</label>
            <input id="ask-lin-input" ref={inputRef} className={styles.input} value={input} onChange={e => setInput(e.target.value)}
              placeholder={ui.placeholder} autoComplete="off" maxLength={500} />
            <button type="submit" className={styles.send} disabled={!input.trim() || busy} aria-label={ui.send}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
          <p className={styles.foot}><strong className={styles.privacy}>{ui.privacy}</strong> {ui.footer}</p>
        </section>
      )}
    </>
  )
}

function LinReply({ reply }) {
  const ui = UI[reply.locale] || UI.en
  const zh = reply.locale === 'zh-tw'
  const answered = reply.kind === 'answer'
  return (
    <div className={`${styles.msg} ${styles.lin}`} lang={zh ? 'zh-Hant' : 'en'}>
      {reply.kind === 'answer' && <span className={styles.demoBadge}>{ui.answerBadge}</span>}
      {reply.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      {reply.guides.length > 0 && (
        <div className={styles.guides}>
          {answered && <p className={styles.guidesLabel}>{ui.guidesLabel}</p>}
          {reply.guides.map(id => {
            const a = getArticle(id, reply.locale)
            return (
              <Link key={id} href={a.path} className={styles.guide} {...(zh ? { hrefLang: 'en' } : {})}>
                <span>{a.title}</span>
                {zh && <span className={styles.guideTag}>{ui.englishGuide}</span>}
              </Link>
            )
          })}
        </div>
      )}
      {reply.handoff && reply.kind === 'answer' && <p className={styles.handoff}>{ui.handoff}</p>}
      {['unavailable', 'insufficient', 'error'].includes(reply.kind) && reply.guides.length === 0 && (
        <Link href={localePath('/library/', reply.locale)} className={styles.libraryLink}>{ui.library}</Link>
      )}
      {reply.kind === 'answer' && <p className={styles.demoNote}>{ui.answerNote}</p>}
    </div>
  )
}

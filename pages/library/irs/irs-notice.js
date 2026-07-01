import { useState } from 'react'
import Layout from '../../../components/Layout'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import styles from './irs-notice.module.css'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const FAQS = [
  { q: 'Does an IRS letter mean I did something wrong?', a: 'Not necessarily. The IRS sends letters for many routine reasons — confirming your identity, asking for a missing document, notifying you of a calculation adjustment, or reminding you of an upcoming deadline. Most letters are not a sign of serious trouble.' },
  { q: 'How long do I have to respond?', a: 'Most notices give you 30–60 days to respond. The deadline is printed clearly on the letter — look for phrases like "You must respond by" or a specific date. Mark it on your calendar immediately. Missing the deadline can result in additional penalties and interest.' },
  { q: 'What if I can\'t pay the amount the IRS says I owe?', a: 'Don\'t ignore the notice. If you can\'t pay in full, you can request a payment plan (installment agreement) directly with the IRS. You can apply online at IRS.gov or call the number on your notice. Acting quickly reduces penalties and shows good faith.' },
  { q: 'Can I handle this myself, or do I need a CPA?', a: 'It depends on the situation. Simple notices — like a CP2000 with a small discrepancy you agree with, or a CP14 with a balance you can pay — can often be handled yourself. Complex situations involving audits, large amounts, multiple years, or legal action warrant professional help.' },
  { q: 'What if the letter looks suspicious? Could it be a scam?', a: 'Real IRS letters always arrive by postal mail, not email or text. They include your tax ID (usually partially redacted), a notice number in the top right corner, and a return address in the U.S. The IRS will never demand immediate payment by gift card, wire transfer, or cryptocurrency, and they won\'t threaten arrest over the phone.' },
  { q: 'I received this notice but I don\'t understand English well. What should I do?', a: 'The IRS offers some materials in languages other than English, but most notices are in English. You can call the number on the notice and request an interpreter at no charge. You can also bring the letter to a trusted bilingual tax professional who can help you understand it before you respond.' },
]

const NOTICE_TYPES = [
  { code: 'CP2000', color: '#F59E0B', urgency: 'Review Required', title: 'Income Discrepancy Notice', desc: 'The IRS found a difference between what you reported and what your employer or bank reported. This is one of the most common notices — it\'s not an audit.', action: 'Review the discrepancy. If you agree, follow the instructions to pay or adjust. If you disagree, respond in writing with documentation.' },
  { code: 'CP14',   color: '#DC2626', urgency: 'Balance Due',      title: 'You Have a Balance Due', desc: 'You owe taxes that haven\'t been paid. Interest and penalties are accruing.', action: 'Pay the balance online at IRS.gov/payments, or call to set up a payment plan. Don\'t ignore this — penalties grow quickly.' },
  { code: 'CP501',  color: '#DC2626', urgency: 'Reminder',         title: 'Reminder of Balance Due', desc: 'A reminder that you have an outstanding balance. Usually sent after a CP14.', action: 'Same as CP14 — pay or arrange a payment plan immediately.' },
  { code: 'CP503',  color: '#7C3AED', urgency: '2nd Reminder',     title: 'Second Balance Due Notice', desc: 'A second reminder. The IRS may be preparing to take collection action.', action: 'Act now. Contact the IRS to pay or arrange a payment plan before they escalate to a lien or levy.' },
  { code: 'CP504',  color: '#7C3AED', urgency: 'Urgent',           title: 'Intent to Levy Notice', desc: 'The IRS intends to levy (seize) your assets including wages, bank accounts, or property. This is serious.', action: 'Respond immediately. Pay in full, set up a payment plan, or contact a tax professional. You have limited time to act.' },
  { code: 'CP12',   color: '#16A34A', urgency: 'Good News',        title: 'Math Error — Refund Changed', desc: 'The IRS corrected a math error on your return and your refund amount changed (usually increased).', action: 'Review the changes. If you agree, no action needed — your corrected refund is on the way. If you disagree, call within 60 days.' },
]

export default function IRSNoticePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})

  function toggleFaq(i) {
    setOpenFaq(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <Layout
      t={t}
      meta={{
        title: 'I Received an IRS Letter — What Do I Do? | AskLinTax',
        description: 'Most IRS notices are routine. Don\'t panic — here\'s how to read the letter, identify what type it is, and decide your next step. Plain language guide for Chinese families.',
      }}
    >

      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <div className={styles.breadcrumb}>
            <a href="/">Home</a>
            <span>›</span>
            <a href="/library">Knowledge Library</a>
            <span>›</span>
            <a href="/library/irs">IRS & Tax Issues</a>
            <span>›</span>
            <span>IRS Notice</span>
          </div>
          <div className={styles.heroMeta}>
            <span className="tag tag-gold">IRS & Tax Issues</span>
            <span className={styles.emotion}>😨 For anxious readers</span>
          </div>
          <h1 className={styles.pageHeroTitle}>
            I received an IRS letter.<br /><em>What do I do?</em>
          </h1>
          <p className={styles.pageHeroSub}>
            Most IRS notices are routine. Don't panic — here's how to read the letter, understand what the IRS wants, and decide whether you need help.
          </p>
          <div className={styles.heroStats}>
            <span>⏱ 4 min read</span>
            <span>·</span>
            <span className={styles.cpaBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              CPA-Reviewed Content
            </span>
            <span>·</span>
            <span>Updated June 2026</span>
          </div>
        </div>
      </section>

      {/* ACTION REQUIRED — shown first for anxious users */}
      <div className={styles.actionBanner}>
        <div className="container">
          <div className={styles.actionBannerInner}>
            <div className={styles.actionBannerIcon}>⚡</div>
            <div>
              <strong>The most important thing right now:</strong>
              <span> Find the deadline printed on your letter and mark it on your calendar. Most notices give you 30–60 days. Then come back and read this guide.</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.articleWrap}>
        <div className="container">
          <div className={styles.articleLayout}>

            {/* ARTICLE BODY */}
            <article className={`${styles.article} article-body`}>

              <h2>First: Don't panic. Here's why.</h2>
              <p>
                The IRS sends out hundreds of millions of letters every year. Most of them are not emergency situations — they're routine adjustments, reminders, requests for missing information, or confirmations. Getting a letter doesn't mean you're in serious trouble or being investigated.
              </p>
              <p>
                That said, you should never ignore an IRS letter. Even a routine notice has a response deadline, and missing it can turn a small issue into a larger one.
              </p>

              <div className="callout callout-action">
                <div className="callout-title">✅ Your immediate checklist</div>
                <p>Before you do anything else, do these three things:</p>
                <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                  <li><strong>Step 1:</strong> Find the notice number (top right corner of the letter — looks like "CP2000" or "LTR 4883C")</li>
                  <li><strong>Step 2:</strong> Find the response deadline (printed on the first page — mark it on your calendar now)</li>
                  <li><strong>Step 3:</strong> Don't call anyone yet. Read the letter completely first.</li>
                </ul>
              </div>

              <h2>How to read an IRS notice</h2>
              <p>
                Every IRS letter has the same basic structure. Once you know what to look for, it becomes much less intimidating.
              </p>

              <div className={styles.letterDiagram}>
                <div className={styles.letterBox}>
                  <div className={styles.letterRow}>
                    <div className={styles.letterLeft}>
                      <div className={styles.letterIRS}>Internal Revenue Service</div>
                      <div className={styles.letterAddr}>Department of the Treasury</div>
                    </div>
                    <div className={styles.letterRight}>
                      <div className={styles.letterItem}><span className={styles.letterLabel}>Notice:</span> <span className={styles.letterHighlight}>CP2000</span> ← Notice number</div>
                      <div className={styles.letterItem}><span className={styles.letterLabel}>Tax Year:</span> 2024</div>
                      <div className={styles.letterItem}><span className={styles.letterLabel}>Notice Date:</span> April 1, 2026</div>
                      <div className={styles.letterItem}><span className={styles.letterLabel}>SSN/EIN:</span> XXX-XX-1234</div>
                      <div className={styles.letterItem}><span className={styles.letterLabel}>Respond by:</span> <span className={styles.letterHighlight}>May 15, 2026</span> ← Deadline</div>
                    </div>
                  </div>
                  <div className={styles.letterBody}>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: 0 }}>
                      <strong>Dear Taxpayer,</strong><br />
                      We have information that doesn't match what you reported on your tax return for the tax year shown above. The changes we are proposing to your return are shown below...
                    </p>
                  </div>
                </div>
                <p className={styles.letterCaption}>Every IRS letter follows this structure. The notice number and deadline are always in the upper right corner.</p>
              </div>

              <h2>The most common IRS notices — and what they mean</h2>
              <p>
                The notice number (like CP2000 or CP14) tells you exactly why the IRS is writing to you. Here are the notices Chinese families receive most often:
              </p>

              <div className={styles.noticeGrid}>
                {NOTICE_TYPES.map(notice => (
                  <div key={notice.code} className={styles.noticeCard}>
                    <div className={styles.noticeTop} style={{ borderLeftColor: notice.color }}>
                      <div className={styles.noticeCode} style={{ color: notice.color }}>{notice.code}</div>
                      <div className={styles.noticeUrgency} style={{ background: notice.color + '18', color: notice.color }}>{notice.urgency}</div>
                    </div>
                    <h4 className={styles.noticeTitle}>{notice.title}</h4>
                    <p className={styles.noticeDesc}>{notice.desc}</p>
                    <div className={styles.noticeAction}>
                      <strong>What to do:</strong> {notice.action}
                    </div>
                  </div>
                ))}
              </div>

              <h2>Should you handle this yourself, or get professional help?</h2>
              <p>
                This is the most important decision you'll make. Here's a simple framework:
              </p>

              <table className={styles.decisionTable}>
                <thead>
                  <tr>
                    <th>Your situation</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Small discrepancy (&lt;$1,000) and you understand why</td>
                    <td>✅ Handle it yourself — follow the instructions on the notice</td>
                  </tr>
                  <tr>
                    <td>You agree with what the IRS says and just need to pay</td>
                    <td>✅ Pay online at IRS.gov/payments or set up a payment plan</td>
                  </tr>
                  <tr>
                    <td>You don't understand the notice or can't read the English</td>
                    <td>🤝 Get a bilingual tax professional to review before responding</td>
                  </tr>
                  <tr>
                    <td>You disagree with the IRS and want to dispute the amount</td>
                    <td>🤝 Consult a CPA — disputing incorrectly can make things worse</td>
                  </tr>
                  <tr>
                    <td>The notice involves an audit, lien, levy, or legal action</td>
                    <td>⚠️ Consult a tax professional immediately — don't wait</td>
                  </tr>
                  <tr>
                    <td>The amount owed is more than $10,000</td>
                    <td>⚠️ Professional help is strongly recommended</td>
                  </tr>
                </tbody>
              </table>

              <h2>What to do if you think it's a scam</h2>
              <p>
                Tax scams targeting Chinese-speaking communities are unfortunately common. Here's how to tell the difference between a real IRS notice and a scam:
              </p>

              <div className="callout callout-warning">
                <div className="callout-title">🚨 Warning: These are scam signs</div>
                <p>The IRS will NEVER:</p>
                <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                  <li>Contact you by email, text, or social media about taxes owed</li>
                  <li>Demand immediate payment by gift card, wire transfer, or cryptocurrency</li>
                  <li>Threaten to call the police or immigration authorities if you don't pay immediately</li>
                  <li>Call you without first mailing a notice</li>
                  <li>Ask for your credit card information over the phone</li>
                </ul>
              </div>

              <div className="callout callout-tip">
                <div className="callout-title">✅ How to verify a real IRS letter</div>
                <p>Real IRS letters always arrive by postal mail. They include a notice number (top right corner), your tax ID number (partially redacted), and a return address in the United States. You can verify any notice by calling the IRS directly at <strong>1-800-829-1040</strong> or visiting IRS.gov and searching for the notice number.</p>
              </div>

              <h2>The biggest mistake people make</h2>
              <p>
                It's not responding incorrectly. It's not even paying the wrong amount.
              </p>
              <p>
                <strong>The biggest mistake is ignoring the notice entirely.</strong>
              </p>
              <p>
                Many people — especially those who feel uncomfortable with English or the tax system — see an IRS letter and feel paralyzed. They put it aside, hoping it will go away. It won't. What starts as a $500 discrepancy can become a $2,000 problem with penalties and interest after a few months of inaction.
              </p>
              <p>
                Even if you don't know what to do, the first step is always the same: read the notice, find the deadline, and either respond or get help before that date passes.
              </p>

            </article>

            {/* SIDEBAR */}
            <aside className={styles.sidebar}>

              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Your action checklist</h3>
                <ul className={styles.checklistItems}>
                  {[
                    'Find the notice number (top right)',
                    'Find and mark the response deadline',
                    'Read the full letter carefully',
                    'Determine the notice type using the guide above',
                    'Decide: handle yourself or get help?',
                    'Respond before the deadline',
                  ].map((item, i) => (
                    <li key={i} className={styles.checklistItem}>
                      <span className={styles.checkDot}>{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Documents to gather</h3>
                <ul className={styles.gatherList}>
                  {[
                    'The IRS letter itself (keep the envelope too)',
                    'Your tax return for the year mentioned',
                    'W-2s, 1099s, and other income documents',
                    'Any receipts or records related to the issue',
                    'Prior year tax returns (if relevant)',
                  ].map((item, i) => (
                    <li key={i} className={styles.gatherItem}>
                      <span className={styles.gatherDot} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCardNav}>
                <h3 className={styles.sidebarTitle}>Helpful IRS resources</h3>
                <div className={styles.resourceList}>
                  <a href="https://www.irs.gov/payments" target="_blank" rel="noreferrer" className={styles.resourceLink}>Pay taxes online at IRS.gov →</a>
                  <a href="https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter" target="_blank" rel="noreferrer" className={styles.resourceLink}>IRS notice lookup tool →</a>
                  <a href="https://www.irs.gov/taxpayer-advocate" target="_blank" rel="noreferrer" className={styles.resourceLink}>Free Taxpayer Advocate help →</a>
                </div>
              </div>

            </aside>

          </div>

          {/* FAQ SECTION */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently asked questions</h2>
            <div className="faq-list">
              {FAQS.map((faq, i) => {
                const isOpen = !!openFaq[i]
                return (
                  <div key={i} className="faq-item" data-open={isOpen}>
                    <button className="faq-q" onClick={() => toggleFaq(i)}>
                      {faq.q}
                      <span style={{ fontSize: '20px', color: isOpen ? '#fff' : 'var(--navy)', background: isOpen ? 'var(--navy)' : 'var(--slate)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                        {isOpen ? '×' : '+'}
                      </span>
                    </button>
                    <div className="faq-a">{faq.a}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RELATED ARTICLES */}
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related guides</h2>
            <div className={styles.relatedGrid}>
              {[
                { href: '/library/irs/cp2000', cat: 'IRS & Tax Issues', title: 'CP2000 Notice: What It Means and How to Respond', desc: 'The CP2000 is one of the most common IRS notices. Here\'s a step-by-step guide to understanding and responding.' },
                { href: '/library/irs/payment-plans', cat: 'IRS & Tax Issues', title: 'Can\'t Pay What You Owe? IRS Payment Plans Explained', desc: 'If you can\'t pay your tax bill in full, the IRS has options. Learn how to set up an installment agreement.' },
                { href: '/library/irs/audit', cat: 'IRS & Tax Issues', title: 'What to Do If You\'re Being Audited', desc: 'An audit is a review of your tax return. Learn what triggers audits, what to expect, and when you need professional help.' },
              ].map(card => (
                <a key={card.href} href={card.href} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{card.cat}</span>
                  <h4 className={styles.relatedCardTitle}>{card.title}</h4>
                  <p className={styles.relatedCardDesc}>{card.desc}</p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

    </Layout>
  )
}

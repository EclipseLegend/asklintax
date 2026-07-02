import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

// ── KNOWLEDGE OBJECT METADATA ──────────────────────────────
const META = {
  id:            '01',
  title:         'I received an IRS letter. What do I do?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the most common notice types. Audits, liens, levies, and legal action require case-by-case professional assessment.',
  persona:       ['Anyone who received an IRS letter', 'New immigrant unfamiliar with IRS process', 'Small business owner'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'Find the response deadline printed on your letter and mark it on your calendar right now. Most notices give you 30–60 days. Then read this guide to understand what the IRS is asking.',
}

// ── NOTICE TYPES ──────────────────────────────────────────
const NOTICE_TYPES = [
  { code: 'CP2000', color: '#F59E0B', urgency: 'Review Required', title: 'Income Discrepancy Notice',    desc: "The IRS found a difference between what you reported and what your employer or bank reported. This is one of the most common notices — it's not an audit.", action: 'Review the discrepancy. If you agree, follow the instructions to pay or adjust. If you disagree, respond in writing with documentation.' },
  { code: 'CP14',   color: '#DC2626', urgency: 'Balance Due',      title: 'You Have a Balance Due',       desc: "You owe taxes that haven't been paid. Interest and penalties are accruing.", action: 'Pay the balance online at IRS.gov/payments, or call to set up a payment plan. Don\'t ignore this — penalties grow quickly.' },
  { code: 'CP501',  color: '#DC2626', urgency: 'Reminder',         title: 'Reminder of Balance Due',      desc: 'A reminder that you have an outstanding balance. Usually sent after a CP14.', action: 'Same as CP14 — pay or arrange a payment plan immediately.' },
  { code: 'CP503',  color: '#7C3AED', urgency: '2nd Reminder',     title: 'Second Balance Due Notice',    desc: 'A second reminder. The IRS may be preparing to take collection action.', action: 'Act now. Contact the IRS to pay or arrange a payment plan before they escalate to a lien or levy.' },
  { code: 'CP504',  color: '#7C3AED', urgency: 'Urgent',           title: 'Intent to Levy Notice',        desc: 'The IRS intends to levy (seize) your assets including wages, bank accounts, or property. This is serious.', action: 'Respond immediately. Pay in full, set up a payment plan, or contact a tax professional. You have limited time to act.' },
  { code: 'CP12',   color: '#16A34A', urgency: 'Good News',        title: 'Math Error — Refund Changed',  desc: 'The IRS corrected a math error on your return and your refund amount changed (usually increased).', action: 'Review the changes. If you agree, no action needed — your corrected refund is on the way. If you disagree, call within 60 days.' },
]

// ── FAQS ──────────────────────────────────────────────────
const FAQS = [
  { q: 'Does an IRS letter mean I did something wrong?', a: "Not necessarily. The IRS sends letters for many routine reasons — confirming your identity, asking for a missing document, notifying you of a calculation adjustment, or reminding you of an upcoming deadline. Most letters are not a sign of serious trouble." },
  { q: 'How long do I have to respond?', a: 'Most notices give you 30–60 days to respond. The deadline is printed clearly on the letter — look for phrases like "You must respond by" or a specific date. Mark it on your calendar immediately. Missing the deadline can result in additional penalties and interest.' },
  { q: "What if I can't pay the amount the IRS says I owe?", a: "Don't ignore the notice. If you can't pay in full, you can request a payment plan (installment agreement) directly with the IRS. You can apply online at IRS.gov or call the number on your notice. Acting quickly reduces penalties and shows good faith." },
  { q: 'Can I handle this myself, or do I need a CPA?', a: "It depends on the situation. Simple notices — like a CP2000 with a small discrepancy you agree with, or a CP14 with a balance you can pay — can often be handled yourself. Complex situations involving audits, large amounts, multiple years, or legal action warrant professional help." },
  { q: 'What if the letter looks suspicious? Could it be a scam?', a: 'Real IRS letters always arrive by postal mail, not email or text. They include your tax ID (usually partially redacted), a notice number in the top right corner, and a return address in the U.S. The IRS will never demand immediate payment by gift card, wire transfer, or cryptocurrency, and they won\'t threaten arrest over the phone.' },
  { q: "I received this notice but I don't understand English well. What should I do?", a: "The IRS offers some materials in languages other than English, but most notices are in English. You can call the number on the notice and request an interpreter at no charge. You can also bring the letter to a trusted bilingual tax professional who can help you understand it before you respond." },
]

// ── RELATED ARTICLES (Knowledge Graph) ────────────────────
const RELATED = [
  {
    href:  '/library/irs/cp2000',
    cat:   'IRS & Tax Issues',
    title: 'CP2000 Notice: What It Means and How to Respond',
    desc:  "The CP2000 is one of the most common IRS notices. Here's a step-by-step guide to understanding and responding to it.",
  },
  {
    href:  '/library/individual/new-immigrant',
    cat:   'Individuals & Families',
    title: 'New to the U.S.? A complete tax guide for new immigrants',
    desc:  'IRS letters can be especially stressful when you\'re new to the U.S. tax system. This guide covers everything you need to know in your first years.',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Understanding your tax residency status helps you know what the IRS expects from you — and why you may have received a notice.',
  },
]

// ── PAGE ──────────────────────────────────────────────────
export default function IRSNoticePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout
      t={t}
      meta={{
        title: 'I Received an IRS Letter — What Do I Do? | AskLinTax',
        description: "Most IRS notices are routine. Don't panic — here's how to read the letter, identify what type it is, and decide your next step. Plain language guide for Chinese families.",
      }}
    >
      <KnowledgePage
        meta={META}
        faqs={FAQS}
        openFaq={openFaq}
        toggleFaq={toggleFaq}
        relatedArticles={RELATED}
      >

        <h2>First: don't panic. Here's why.</h2>
        <p>
          The IRS sends out hundreds of millions of letters every year. Most of them are not emergency situations — they're routine adjustments, reminders, requests for missing information, or confirmations. Getting a letter doesn't mean you're in serious trouble or being investigated.
        </p>
        <p>
          That said, you should never ignore an IRS letter. Even a routine notice has a response deadline, and missing it can turn a small issue into a larger one.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ Your immediate three-step checklist</div>
          <p>Before you do anything else:</p>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li><strong>Step 1:</strong> Find the notice number — top right corner of the letter. Looks like "CP2000" or "LTR 4883C".</li>
            <li><strong>Step 2:</strong> Find the response deadline — printed on the first page. Mark it on your calendar right now.</li>
            <li><strong>Step 3:</strong> Don't call anyone yet. Read the letter completely first.</li>
          </ul>
        </div>

        <h2>How to read an IRS notice</h2>
        <p>
          Every IRS letter has the same basic structure. Once you know what to look for, it becomes much less intimidating.
        </p>

        {/* Letter Diagram */}
        <div style={{ margin: '28px 0' }}>
          <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(27,45,79,.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px 24px 16px', borderBottom: '1px solid var(--border-l)', background: 'var(--cream)' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--navy)' }}>Internal Revenue Service</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Department of the Treasury</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {[
                  ['Notice:', 'CP2000', true, '← Notice number'],
                  ['Tax Year:', '2024', false, ''],
                  ['Notice Date:', 'April 1, 2026', false, ''],
                  ['SSN/EIN:', 'XXX-XX-1234', false, ''],
                  ['Respond by:', 'May 15, 2026', true, '← Deadline'],
                ].map(([label, value, highlight, note], i) => (
                  <div key={i} style={{ fontSize: '13px', color: 'var(--mid)', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--muted)' }}>{label}</span>{' '}
                    <span style={highlight ? { fontWeight: '600', color: 'var(--navy)', background: 'rgba(201,150,58,.12)', padding: '1px 6px', borderRadius: '4px' } : {}}>{value}</span>
                    {note && <span style={{ color: 'var(--gold)', fontSize: '11.5px', marginLeft: '6px' }}>{note}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: 0 }}>
                <strong>Dear Taxpayer,</strong><br />
                We have information that doesn't match what you reported on your tax return for the tax year shown above. The changes we are proposing to your return are shown below...
              </p>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
            Every IRS letter follows this structure. The notice number and deadline are always in the upper right corner.
          </p>
        </div>

        <h2>The most common IRS notices — and what they mean</h2>
        <p>
          The notice number (like CP2000 or CP14) tells you exactly why the IRS is writing to you. Here are the notices Chinese families receive most often:
        </p>

        {/* Notice Type Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', margin: '24px 0' }}>
          {NOTICE_TYPES.map(notice => (
            <div key={notice.code} style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '18px 18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--border-l)', borderLeft: `4px solid ${notice.color}`, paddingLeft: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'monospace', color: notice.color }}>{notice.code}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', padding: '3px 9px', borderRadius: '100px', background: notice.color + '18', color: notice.color }}>{notice.urgency}</div>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{notice.title}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '10px' }}>{notice.desc}</p>
              <div style={{ fontSize: '13px', color: 'var(--mid)', lineHeight: '1.6', background: 'var(--cream)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--navy)' }}>What to do:</strong> {notice.action}
              </div>
            </div>
          ))}
        </div>

        <h2>Should you handle this yourself, or get professional help?</h2>
        <p>
          This is the most important decision you'll make after reading the notice. Here's a simple framework:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Your situation</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Small discrepancy (<$1,000) and you understand why', '✅ Handle it yourself — follow the instructions on the notice'],
                ['You agree with what the IRS says and just need to pay', '✅ Pay online at IRS.gov/payments or set up a payment plan'],
                ["You don't understand the notice or can't read the English", '🤝 Get a bilingual tax professional to review before responding'],
                ['You disagree with the IRS and want to dispute the amount', '🤝 Consult a CPA — disputing incorrectly can make things worse'],
                ['The notice involves an audit, lien, levy, or legal action', '⚠️ Consult a tax professional immediately — don\'t wait'],
                ['The amount owed is more than $10,000', '⚠️ Professional help is strongly recommended'],
              ].map(([situation, rec], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>What to do if you think it's a scam</h2>
        <p>
          Tax scams targeting Chinese-speaking communities are unfortunately common. Here's how to tell the difference between a real IRS notice and a scam:
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">🚨 Warning: these are scam signs</div>
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

      </KnowledgePage>
    </Layout>
  )
}

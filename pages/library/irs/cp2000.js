import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '16',
  title:         'CP2000 notice: what it means and how to respond',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the standard CP2000 response process. If the proposed amount is large (over $5,000), if you disagree with the IRS position, or if this involves multiple years, consult a CPA before responding.',
  persona:       ['Anyone who received a CP2000 notice', 'Freelancer who forgot a 1099', 'Investor with unreported income', 'New immigrant unfamiliar with IRS notices'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'Find the response deadline on your CP2000 (typically 60 days from the notice date). Do not miss it. Read the notice carefully to identify which income the IRS believes was underreported, then gather documentation to either confirm or dispute the discrepancy.',
}

const FAQS = [
  {
    q: 'Is a CP2000 the same as an audit?',
    a: 'No. A CP2000 is an Automated Underreporter (AUR) notice — a computer-generated mismatch between what you reported and what third parties (employers, banks, clients) reported to the IRS. It is not an audit. An audit involves a human examiner reviewing your entire return. A CP2000 is much more common, more routine, and much easier to resolve. Most CP2000 cases are resolved entirely by correspondence.',
  },
  {
    q: 'What if I agree with the CP2000 — do I owe all of it?',
    a: 'You may owe less than the proposed amount. The CP2000 calculates additional tax based on the unreported income, but it may not account for deductions or credits you\'re entitled to. For example, if you forgot to report $5,000 in freelance income, the CP2000 might propose tax based on the full $5,000 — but if you also had $2,000 in business expenses you can deduct, your actual additional tax would be on only $3,000. When you respond, you can include adjustments.',
  },
  {
    q: 'What if I don\'t respond by the deadline?',
    a: 'If you don\'t respond, the IRS assumes you agree with their proposed changes and issues a Statutory Notice of Deficiency (sometimes called a 90-day letter). At that point, you have 90 days to file a petition with the U.S. Tax Court — or pay the assessment. Missing the CP2000 deadline significantly escalates the situation. Mark the deadline immediately.',
  },
  {
    q: 'I received a CP2000 for income that isn\'t mine. What do I do?',
    a: 'This can happen if: your SSN was reported incorrectly by a payer, someone used your SSN, or there was a data entry error. Respond in writing explaining the error and include any supporting documentation (e.g., proof the income belongs to someone else, proof of identity theft). If it\'s identity-related, also file Form 14039 (Identity Theft Affidavit) and consider placing a fraud alert on your credit.',
  },
  {
    q: 'Can I request more time to respond?',
    a: 'Yes. If you need more time, call the IRS at the number on your CP2000 and request a 30-day extension. Do this before the deadline — the IRS is generally willing to grant one extension for CP2000 responses. Get the representative\'s name and note the date and time of the call.',
  },
  {
    q: 'Will a CP2000 affect my credit score?',
    a: 'A CP2000 notice itself does not affect your credit score. However, if the IRS ultimately assesses a tax liability that you don\'t pay, and they file a federal tax lien, that lien can appear in public records and may affect your ability to get loans or credit. Responding and resolving the CP2000 promptly prevents it from escalating to a lien.',
  },
  {
    q: 'I received a CP2000 for a year I filed with a CPA. Should I contact them?',
    a: 'Yes, immediately. Your CPA should be the first call you make. If your CPA prepared the return, they need to know about the notice and may have records that help resolve the discrepancy. If there was an error in their preparation, they should be involved in the response. If you no longer work with that CPA, find the return and documentation yourself and consider consulting a new tax professional.',
  },
]

const RELATED = [
  {
    href:  '/library/irs/irs-notice',
    cat:   'IRS & Tax Issues',
    title: 'I received an IRS letter — what do I do?',
    desc:  'A broader guide to all IRS notices — how to read them, identify the type, and decide your next step.',
  },
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference?',
    desc:  'Most CP2000 notices involve missing 1099 income. Understanding 1099s helps you prevent future notices.',
  },
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: 'First-time filer complete guide',
    desc:  'Many CP2000 notices result from first-year filing mistakes. This guide helps you get it right.',
  },
]

const RESPONSE_OPTIONS = [
  {
    option:  'You agree — and you agree with the amount',
    action:  'Sign and return the response form included with the CP2000. Pay the amount owed (or arrange a payment plan). No further correspondence needed unless you hear back.',
    color:   'var(--green)',
    icon:    '✅',
    complexity: 'Easy',
  },
  {
    option:  'You agree the income was unreported — but you have deductions that reduce what you owe',
    action:  'Sign the response form indicating partial agreement. Include a statement explaining the deductions or adjustments you\'re claiming, with supporting documentation. The IRS will recalculate.',
    color:   '#F59E0B',
    icon:    '⚡',
    complexity: 'Moderate',
  },
  {
    option:  'You disagree — the income was already reported or doesn\'t belong to you',
    action:  'Do not sign the response form. Write a clear explanation of why you disagree. Include documentation: your original return, the payer\'s 1099, or proof the income belongs to someone else. Send via certified mail and keep copies.',
    color:   'var(--blue)',
    icon:    '📝',
    complexity: 'Moderate',
  },
  {
    option:  'You disagree — and the amount is large or the situation is complex',
    action:  'Consult a CPA or tax attorney before responding. At this level, professional representation is worth the cost. A professional may identify arguments or procedural options you\'d miss on your own.',
    color:   '#7C3AED',
    icon:    '🤝',
    complexity: 'Get help',
  },
]

export default function CP2000Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'CP2000 Notice: What It Means and How to Respond | AskLinTax',
      description: 'Received a CP2000 from the IRS? It\'s not an audit — it\'s a mismatch notice. This guide explains what the IRS found, your three response options, and how to resolve it step by step.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is a CP2000?</h2>
        <p>
          A CP2000 is an automated notice the IRS sends when the income on your tax return doesn't match the income reported to the IRS by third parties — your employer, your bank, a client, a brokerage, or a payment processor like Venmo or PayPal.
        </p>
        <p>
          Every year, employers, banks, and other payers send the IRS copies of every W-2, 1099, and other income form they issue. The IRS's computer system compares those amounts to what you reported on your return. If the numbers don't match, a CP2000 is generated automatically.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ First: find the deadline and mark it</div>
          <p>The response deadline is printed on the first page of your CP2000 — look for "Please respond by" followed by a date. It's typically 60 days from the notice date. Mark it in your calendar immediately. Missing this deadline significantly escalates the situation — the IRS will proceed as if you agree with their assessment.</p>
        </div>

        <h2>CP2000 is not an audit — here's the difference</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>CP2000</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Audit</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['What triggers it', 'Automated computer mismatch between your return and third-party reports', 'IRS selects return for detailed human review (random, red flags, or specific issues)'],
                ['Who reviews it', 'Automated system initially; then correspondence-based', 'Assigned IRS examiner'],
                ['Scope', 'Specific income items that don\'t match', 'Your entire return, or specific items'],
                ['How common', 'Very common — millions issued annually', 'Much less common'],
                ['How it\'s resolved', 'Usually by mail — respond with agreement or explanation', 'By correspondence, in-person meeting, or appeals process'],
                ['Should you panic?', '❌ No — most resolve simply', '⚠️ Take seriously but don\'t panic'],
              ].map(([feature, cp, audit], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feature}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{cp}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Why did you receive a CP2000?</h2>
        <p>
          The most common reasons:
        </p>
        <ul>
          <li><strong>Missing 1099 income</strong> — A freelance client paid you and filed a 1099-NEC with the IRS, but you didn't include that income on your return. This is the most common cause.</li>
          <li><strong>Unreported investment activity</strong> — You sold stocks, crypto, or funds and received a 1099-B, but didn't report the sales on Schedule D.</li>
          <li><strong>Missing bank interest</strong> — A bank sent a 1099-INT for interest you earned, which you didn't report.</li>
          <li><strong>1099-K from payment platforms</strong> — You received payments through Venmo, PayPal, Stripe, or Airbnb above the reporting threshold, and the platform filed a 1099-K the IRS has but you didn't report.</li>
          <li><strong>Employer reported more than you did</strong> — A W-2 discrepancy, often due to amended documents or multiple jobs.</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ The CP2000 may not tell the full story</div>
          <p>The IRS's proposed assessment is based on the gross income reported by the payer — it doesn't know about any deductions or expenses you might have against that income. For example, if a client filed a 1099-NEC for $8,000 you earned doing freelance work, the IRS might propose tax on the full $8,000 — but if you had $3,000 in business expenses, your actual taxable income from that work is only $5,000. When you respond, you can include those adjustments.</p>
        </div>

        <h2>Your three response options</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '28px 0' }}>
          {RESPONSE_OPTIONS.map((opt, i) => (
            <div key={i} style={{ border: `1.5px solid ${opt.color}30`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: opt.color + '12', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${opt.color}20` }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15.5px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.35' }}>{opt.option}</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px', background: opt.color + '20', color: opt.color, flexShrink: 0 }}>{opt.complexity}</span>
              </div>
              <div style={{ padding: '14px 20px', background: 'var(--white)' }}>
                <p style={{ fontSize: '15px', color: 'var(--mid)', lineHeight: '1.72', marginBottom: 0 }}>{opt.action}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Step-by-step: how to respond</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '28px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          {[
            { step: '01', title: 'Read the notice completely', detail: 'Before doing anything else, read the entire CP2000. Identify: which income item triggered the notice, the proposed additional tax amount, the response deadline, and the payer who reported the discrepancy.' },
            { step: '02', title: 'Pull your original tax return', detail: 'Find your tax return for the year in question. Check whether you actually reported the income the IRS is asking about. Sometimes the income was reported but in a different place — for example, on Schedule C instead of where the IRS expected it.' },
            { step: '03', title: 'Gather documentation', detail: 'Collect: the 1099 or other income document in question, your original return, any documentation of deductions or expenses against the income, and any proof that the income belongs to someone else (if applicable).' },
            { step: '04', title: 'Determine your position', detail: 'Do you agree with the IRS? Partially agree? Disagree? The response form included with the CP2000 has options for each position. Choose based on your documentation.' },
            { step: '05', title: 'Complete and send the response form', detail: 'Fill out the response form included with the notice. If agreeing with adjustments, include a signed statement. If disagreeing, include a written explanation and supporting documents. Send by the deadline.' },
            { step: '06', title: 'Send via certified mail — keep copies', detail: 'Mail your response via USPS Certified Mail with Return Receipt so you have proof of delivery. Keep copies of everything you sent: the response form, your letter, and all attachments.' },
            { step: '07', title: 'Wait for the IRS response', detail: 'The IRS typically responds within 60 days of receiving your reply. They will either accept your response and close the matter, ask for additional information, or issue a formal assessment if they don\'t accept your position.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px', borderRight: '1px solid var(--border-l)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{s.step}</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2>What happens if you owe money</h2>
        <p>
          If after reviewing the notice you agree that additional taxes are owed:
        </p>
        <ul>
          <li><strong>Pay in full</strong> — Pay at IRS.gov/payments to stop interest from accruing. Interest runs from the original due date of the return, not the CP2000 notice date.</li>
          <li><strong>Can't pay in full</strong> — Request an installment agreement (payment plan) at IRS.gov/opa or by calling the IRS. Acting promptly reduces penalties.</li>
          <li><strong>Pay the undisputed portion</strong> — If you partially agree, pay what you agree you owe now. This stops interest on that portion while the dispute on the remainder continues.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Interest runs from the original return due date</div>
          <p>
            The additional taxes proposed in a CP2000 aren't new — they apply to the original tax year. Interest accrues from the original April 15 deadline for that year, not from the date of the CP2000. This means the longer a CP2000 goes unresolved, the more interest accumulates. Resolving it promptly — even if you need a payment plan — minimizes the total amount owed.
          </p>
        </div>

        <h2>How to prevent CP2000 notices in the future</h2>
        <ul>
          <li><strong>Report all 1099 income</strong> — Every client, bank, broker, and platform that pays you reports to the IRS. If you receive a 1099, report the income. Even if you don't receive a 1099, the income is still taxable.</li>
          <li><strong>Check for 1099s before filing</strong> — Wait until mid-February to file, when most 1099s have been issued. Rushing to file in January often means missing late-arriving forms.</li>
          <li><strong>Report investment sales on Schedule D</strong> — Every stock sale, crypto sale, and fund redemption generates a 1099-B. All of them must be reported, even if the result is a loss.</li>
          <li><strong>Report all payment platform income</strong> — If you received business income through PayPal, Venmo, Stripe, or Airbnb above $600, expect a 1099-K. Report it.</li>
          <li><strong>Keep copies of all tax documents</strong> — If a payer sends an incorrect 1099, you'll need documentation to dispute the CP2000 that results.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

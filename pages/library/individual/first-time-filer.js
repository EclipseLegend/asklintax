import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '07',
  title:         'First-time filer in the U.S.: a complete step-by-step guide',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the standard filing process for resident aliens and U.S. citizens. Nonresident aliens (F-1, J-1) use Form 1040-NR — the steps are similar but the form and some rules differ.',
  persona:       ['First-time filer', 'New immigrant filing for the first time', 'College student with first job', 'Anyone who has never filed a U.S. tax return'],
  relatedJourney: ['First-time filer', 'New to the U.S.'],
  actionRequired: 'Start by gathering your documents (Step 1 below) before doing anything else. Most first-time filers who get stuck do so because they try to start filing before they have everything they need.',
}

const FAQS = [
  {
    q: 'How long does it take to file a tax return for the first time?',
    a: 'For a straightforward return — one job, one W-2, standard deduction — expect 1–3 hours using tax software. Your first year always takes longer because you\'re learning the process. In subsequent years, the same return might take 30–60 minutes because you\'ll know what to expect and the software carries over your prior year information.',
  },
  {
    q: 'Do I need to hire a CPA or can I do it myself?',
    a: 'Many first-time filers with simple situations — one W-2, no self-employment income, no complex investments — can file successfully using tax software like TurboTax, H&R Block, or IRS Free File. However, if you have a complicated situation (self-employment income, multiple states, stock options, foreign income, or a dual-status year), a CPA is worth the cost. A mistake in your first year can create problems in future years.',
  },
  {
    q: 'What is the standard deduction and should I take it?',
    a: 'The standard deduction is a fixed amount you can subtract from your income without having to itemize individual expenses. For Tax Year 2025, it\'s $14,600 for single filers. Most first-time filers should take the standard deduction — it\'s simpler and often larger than the sum of itemized deductions for people just starting out. You only benefit from itemizing if your qualifying expenses (mortgage interest, state taxes, charitable donations, etc.) exceed the standard deduction amount.',
  },
  {
    q: 'What if I make a mistake on my tax return?',
    a: 'Mistakes are fixable. If you realize you made an error after filing, you can file an amended return using Form 1040-X. There\'s no penalty for amending — the IRS actually expects some amendments each year. Common reasons to amend: forgot to include income, claimed the wrong filing status, or missed a credit you qualified for. You generally have 3 years from the original due date to file an amendment.',
  },
  {
    q: 'When will I get my refund?',
    a: 'If you file electronically and choose direct deposit, most refunds arrive within 21 days. Paper returns and paper checks take longer — typically 6–8 weeks. You can track your refund status at IRS.gov/refunds using your Social Security Number, filing status, and the exact refund amount from your return. The IRS updates the tracker daily.',
  },
  {
    q: 'What if I can\'t pay what I owe by the deadline?',
    a: 'File your return on time even if you can\'t pay. The failure-to-file penalty (5% per month) is much larger than the failure-to-pay penalty (0.5% per month). Filing on time and paying what you can reduces your total penalty significantly. You can then set up a payment plan with the IRS online — it\'s called an installment agreement and takes about 10 minutes to apply for at IRS.gov.',
  },
  {
    q: 'I have income from multiple sources — a job, some freelance work, and a little interest income. Is my return still simple?',
    a: 'It\'s more complex than a pure W-2 return, but still manageable with software. Freelance or self-employment income (1099-NEC or no form at all) requires Schedule C, and you\'ll owe self-employment tax on net profits. Interest income is reported on a 1099-INT. Tax software handles all of this — you just answer the questions. If your self-employment income is significant (over $10,000), consider consulting a CPA to make sure you\'re claiming all available deductions.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Not sure if you\'re required to file? Check the income thresholds for your filing status before you start.',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Your residency status determines which form you file. Confirm this before starting your return.',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Understanding the difference helps you spot opportunities to reduce what you owe on your first return.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Gather your documents',
    color: 'var(--navy)',
    items: [
      { label: 'W-2', desc: 'From every employer you worked for this year. Should arrive by January 31.' },
      { label: '1099-NEC', desc: 'If you did freelance or contract work. From any client who paid you $600+.' },
      { label: '1099-INT', desc: 'From your bank if you earned interest. Even small amounts need to be reported.' },
      { label: '1099-DIV', desc: 'If you received dividends from investments.' },
      { label: '1099-B', desc: 'If you sold stocks, crypto, or other investments.' },
      { label: 'Social Security Number or ITIN', desc: 'Required for every person on your return, including dependents.' },
      { label: 'Bank account info', desc: 'Routing and account number for direct deposit of your refund.' },
      { label: 'Prior year return (if any)', desc: 'Helpful for reference; some software asks for your prior year AGI.' },
    ],
  },
  {
    num: '02',
    title: 'Choose your filing status',
    color: '#7C3AED',
    items: [
      { label: 'Single', desc: 'Unmarried as of December 31 of the tax year.' },
      { label: 'Married Filing Jointly', desc: 'Most common for married couples — usually results in the lowest tax.' },
      { label: 'Married Filing Separately', desc: 'Sometimes beneficial but usually results in higher tax.' },
      { label: 'Head of Household', desc: 'Unmarried, paid more than half of home costs, and have a qualifying dependent.' },
    ],
  },
  {
    num: '03',
    title: 'Choose how to file',
    color: 'var(--gold)',
    items: [
      { label: 'IRS Free File', desc: 'Free for taxpayers with AGI ≤ $84,000. Use software from IRS-partnered providers at IRS.gov/freefile.' },
      { label: 'Tax software (TurboTax, H&R Block, etc.)', desc: 'Paid but guided — asks you questions and fills in the forms. Good for most situations.' },
      { label: 'CPA or tax professional', desc: 'Best for complex situations: self-employment, foreign income, multiple states, or dual-status year.' },
      { label: 'IRS Direct File', desc: 'Free tool from the IRS itself. Available in select states for simple returns. Check IRS.gov for eligibility.' },
    ],
  },
  {
    num: '04',
    title: 'Complete your return',
    color: 'var(--green)',
    items: [
      { label: 'Report all income', desc: 'Enter every W-2, 1099, and any other income — including cash income and tips.' },
      { label: 'Choose standard or itemized deduction', desc: 'Most first-time filers take the standard deduction ($14,600 single in 2025).' },
      { label: 'Claim your credits', desc: 'Common credits: Child Tax Credit, Earned Income Credit, education credits. Software will ask.' },
      { label: 'Review before submitting', desc: 'Double-check your name, SSN, bank info, and income totals. Errors on these are the most common.' },
    ],
  },
  {
    num: '05',
    title: 'File and follow up',
    color: '#16A34A',
    items: [
      { label: 'E-file for fastest processing', desc: 'Electronic filing is faster and more accurate than paper. Most software includes e-file.' },
      { label: 'Save a copy of your return', desc: 'Download and keep your return (as a PDF) and your filing confirmation. You\'ll need it next year.' },
      { label: 'Track your refund', desc: 'Use IRS.gov/refunds or the IRS2Go app. Updates daily. Most e-filed refunds arrive within 21 days.' },
      { label: 'Pay any amount owed', desc: 'Pay by April 15 at IRS.gov/payments to avoid penalties. If you can\'t pay in full, set up a payment plan.' },
    ],
  },
]

export default function FirstTimeFillerPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'First-Time Filer Guide: How to File Your U.S. Tax Return | AskLinTax',
      description: 'A complete step-by-step guide for filing your first U.S. tax return. Covers what documents to gather, how to choose a filing method, what to do with a W-2, and how to track your refund.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Before you start: two things to confirm</h2>
        <p>
          If you haven't already, confirm these two things before you begin filing:
        </p>
        <ul>
          <li><strong>Are you required to file?</strong> Check the income thresholds in our <a href="/library/individual/do-i-need-to-file">Do I Need to File guide</a>. If your income is below the threshold for your filing status, you may not need to file — though you often should anyway if taxes were withheld.</li>
          <li><strong>What form do you file?</strong> If you are a resident alien or U.S. citizen, you file Form 1040 (covered in this guide). If you are a nonresident alien (most F-1 students, J-1 visitors), you file Form 1040-NR instead. Check our <a href="/library/individual/tax-residency">Tax Residency guide</a> if you're not sure.</li>
        </ul>

        <div className="callout callout-action">
          <div className="callout-title">✅ The most important first step</div>
          <p>Gather your documents before you open any tax software. The most common reason people get stuck mid-filing is that they're missing a W-2 or don't have their bank routing number handy. Do Step 1 first — everything else goes faster once you have everything in front of you.</p>
        </div>

        <h2>The five steps to filing your first return</h2>

        {STEPS.map((step, si) => (
          <div key={si} style={{ margin: '32px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
            {/* Step header */}
            <div style={{ background: step.color, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '400', color: 'rgba(255,255,255,0.5)', lineHeight: '1' }}>{step.num}</span>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: '500', color: '#fff', margin: 0 }}>{step.title}</h3>
            </div>
            {/* Step items */}
            <div style={{ padding: '8px 0' }}>
              {step.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 24px', borderBottom: ii < step.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <div style={{ width: '8px', height: '8px', minWidth: '8px', borderRadius: '50%', background: step.color, marginTop: '9px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '16px', color: 'var(--navy)', display: 'block', marginBottom: '3px' }}>{item.label}</strong>
                    <span style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.65' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2>Understanding your W-2</h2>
        <p>
          The W-2 is the most important document for most first-time filers. Your employer sends it by January 31 and reports your total wages and the taxes withheld throughout the year.
        </p>
        <p>
          The key boxes to know:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', width: '80px' }}>Box</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>What it means</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Box 1', 'Total taxable wages — this is your gross income for employment purposes'],
                ['Box 2', 'Federal income tax withheld — this is what your employer already sent to the IRS on your behalf'],
                ['Box 3', 'Social Security wages'],
                ['Box 4', 'Social Security tax withheld (6.2% of Box 3)'],
                ['Box 5', 'Medicare wages'],
                ['Box 6', 'Medicare tax withheld (1.45% of Box 5)'],
                ['Box 12', 'Various codes — may include 401(k) contributions, health insurance premiums, and other benefits'],
                ['Box 16–17', 'State wages and state income tax withheld (for state return)'],
              ].map(([box, meaning], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{box}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Box 2 is why most people get a refund</div>
          <p>Your employer withholds tax from every paycheck based on an estimate of what you'll owe. Box 2 shows the total withheld for the year. If too much was withheld (common for people with one job and no complex deductions), you get the excess back as a refund. If too little was withheld, you owe the difference.</p>
        </div>

        <h2>Standard deduction vs. itemizing: which to choose</h2>
        <p>
          Every filer gets to reduce their taxable income by either the <strong>standard deduction</strong> or their <strong>actual itemized deductions</strong> — whichever is larger.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Standard Deduction</h4>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--gold)', marginBottom: '12px' }}>$14,600</div>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>Fixed amount for single filers in Tax Year 2025. No receipts needed. Just choose it.</p>
            <p style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>✓ Best for most first-time filers</p>
          </div>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Itemized Deductions</h4>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--navy)', marginBottom: '12px' }}>Your actual expenses</div>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>Add up qualifying expenses: mortgage interest, state taxes (up to $10,000), charitable donations, and more.</p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Only beneficial if total exceeds $14,600</p>
          </div>
        </div>

        <h2>Key deadlines to know</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>What happens</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['January 31, 2026', 'Employers must send your W-2. Check your email and mailbox.'],
                ['April 15, 2026', 'Federal tax return due. Pay any taxes owed by this date even if you file an extension.'],
                ['April 15, 2026', 'Deadline to file Form 4868 for a 6-month extension (moves filing deadline to October 15).'],
                ['October 15, 2026', 'Extended filing deadline (if you filed Form 4868 by April 15).'],
              ].map(([date, what], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', whiteSpace: 'nowrap', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{date}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Extension to file ≠ extension to pay</div>
          <p>Filing Form 4868 gives you more time to submit your return — but it does NOT give you more time to pay taxes owed. If you expect to owe money, you must still pay an estimate by April 15 to avoid penalties and interest. You can pay at IRS.gov/payments even before you've completed your return.</p>
        </div>

        <h2>The most common first-time filer mistakes</h2>
        <ul>
          <li><strong>Not filing at all because it feels overwhelming</strong> — This is the costliest mistake. Even an imperfect return is better than no return. File something and amend later if needed.</li>
          <li><strong>Forgetting to include all income</strong> — Every W-2, every 1099, even income without a form (tips, cash payments, Venmo income). The IRS receives copies of all your 1099s and W-2s and will notice if something is missing.</li>
          <li><strong>Wrong bank account number for direct deposit</strong> — Double-check every digit. If the number is wrong, your refund goes to someone else's account and recovery is difficult.</li>
          <li><strong>Not saving a copy</strong> — Download your completed return as a PDF and keep it. You'll need your prior year's Adjusted Gross Income (AGI) to e-file next year, and tax returns are often required for loans, visa applications, and more.</li>
          <li><strong>Missing refundable credits</strong> — Many first-time filers don't know they qualify for the Earned Income Tax Credit or education credits. Tax software asks about these automatically, but you need to answer the questions carefully.</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Your first return is the hardest</div>
          <p>Every first-time filer feels overwhelmed. The good news: the second year is dramatically easier. By then you know what forms to expect, where to enter things, and what to watch for. The investment of time in your first return pays off in every return that follows.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

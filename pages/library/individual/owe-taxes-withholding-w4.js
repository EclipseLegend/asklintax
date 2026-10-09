import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import ArticleTable from '../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '65',
  title:         'Why do I owe taxes this year? Understanding your W-4 and withholding',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers W-2 employees whose federal income tax withholding fell short. It explains common causes and how Form W-4 works; it does not cover state withholding, pension withholding (Form W-4P), or the detailed rules for the new deductions shown on the 2026 Form W-4',
  persona:       ['W-2 employees who owed at filing time', 'Two-income couples', 'People with two jobs or a mid-year job change', 'Employees who received a bonus or have side income'],
  relatedJourney: ['First-time filer', 'Money & Benefits'],
  actionRequired: 'Find out why your withholding fell short, then use the IRS Tax Withholding Estimator and give your employer a new Form W-4. If you have income with no withholding, consider estimated tax payments too.',
  sources: [
    { label: 'IRS — Topic no. 753, Form W-4, Employee\'s Withholding Certificate', url: 'https://www.irs.gov/taxtopics/tc753' },
    { label: 'IRS — Form W-4 (2026), Employee\'s Withholding Certificate', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — Publication 505 (2026), Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/publications/p505' },
    { label: 'IRS — Publication 15 (2026), (Circular E), Employer\'s Tax Guide', url: 'https://www.irs.gov/publications/p15' },
    { label: 'IRS — Updated Tax Withholding Estimator reflects One, Big, Beautiful Bill changes', url: 'https://www.irs.gov/newsroom/updated-tax-withholding-estimator-lets-millions-of-taxpayers-take-one-big-beautiful-bill-changes-into-account-when-calculating-their-withholding' },
  ],
}

const FAQS = [
  {
    q: 'I got a raise. Why do I owe now?',
    a: 'More income can push part of it into a higher bracket, and if your W-4 or other information is out of date, withholding may not keep pace. A raise alone does not always cause a balance due — check your withholding with the IRS Tax Withholding Estimator.',
  },
  {
    q: 'My spouse and I both work. Why didn\'t our jobs withhold enough?',
    a: 'Each employer withholds as if that job were the only income unless the W-4 says otherwise. Combined, your income may be taxed at a higher rate than each job assumes. Form W-4 Step 2 is for multiple jobs or a working spouse.',
  },
  {
    q: 'Why was so much (or so little) withheld from my bonus?',
    a: 'Employers often withhold federal income tax on bonuses and other supplemental wages at a flat 22% (37% on supplemental wages over $1 million in a year). That is a withholding rate, not your actual tax rate, so the result can be too much or too little.',
  },
  {
    q: 'Can I just claim exempt so nothing is withheld?',
    a: 'Only if you had no federal income tax liability last year and expect none this year. Exempt status covers income tax only, not Social Security or Medicare, and must be renewed each year with a new Form W-4.',
  },
  {
    q: 'Does submitting a new W-4 guarantee I won\'t owe next year?',
    a: 'No. It only changes withholding on future paychecks. Your final tax depends on your actual income, deductions, and credits for the year, so review your withholding again when something changes.',
  },
]

const RELATED = [
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'Box 2 shows the federal income tax withheld.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'For income that has no withholding, like freelance work.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'If this year\'s balance is more than you can pay now.',
  },
]

export default function OweTaxesWithholdingW4Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Why Do I Owe Taxes This Year? Form W-4 and Withholding Explained | AskLinTax',
      description: 'Owe federal tax even though taxes come out of your paycheck? Common reasons withholding falls short — two jobs, a working spouse, bonuses, side income — and how to fix it with the Tax Withholding Estimator and a new Form W-4.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Federal income tax taken out of your paychecks is <strong>withholding</strong> — a prepayment of your tax. You owe at filing time when your withholding (plus any credits and payments) is less than your actual tax for the year. That usually means your <strong>Form W-4</strong> no longer matches your situation, or you had income with no withholding. You can fix it for the future by checking your withholding with the IRS Tax Withholding Estimator and giving your employer a new Form W-4.
        </p>
        <p>
          If you need to pay this year's balance, see <a href="/library/irs/cant-pay-tax-bill/">I can't pay my tax bill</a>.
        </p>

        <h2>How withholding works</h2>
        <ul>
          <li>Your employer figures withholding from the <strong>Form W-4</strong> you gave it. Box 2 of your <a href="/library/individual/what-is-w2/">W-2</a> shows the total federal income tax withheld for the year.</li>
          <li>You give the W-4 to your <strong>employer</strong>, not the IRS.</li>
          <li>If you never gave your employer a W-4, it generally withholds as if you were single (or married filing separately) with no other adjustments.</li>
        </ul>

        <h2>Common reasons you owe</h2>
        <ArticleTable
          head={['Reason', 'Why withholding falls short', 'Where the W-4 addresses it']}
          rows={[
            ['Two jobs, or both spouses work', 'Each employer withholds as if its job were your only income', 'Step 2'],
            ['Dependents or credits changed', 'A child aged out or a credit no longer applies', 'Step 3'],
            ['Income with no withholding', 'Interest, dividends, investment gains, or freelance work', 'Step 4(a), or estimated payments'],
            ['Deductions changed', 'You stopped itemizing or expected deductions did not happen', 'Step 4(b)'],
            ['Bonus or supplemental pay', 'Often withheld at a flat 22%, which may not match your rate', 'Step 4(c) extra withholding'],
            ['Raise or mid-year job change', 'Old W-4 information no longer fits your income', 'A new W-4'],
          ]}
        />

        <h2>Bonuses and the flat 22%</h2>
        <p>
          Employers often withhold federal income tax on bonuses and other supplemental wages at a flat <strong>22%</strong>, or <strong>37%</strong> on supplemental wages over $1 million in a year. Publication 15 (2026) says these rates remain in place. This is a withholding rate, not the tax rate on your bonus — your actual tax is figured on your total income when you file.
        </p>

        <h2>How to fix it for next year</h2>
        <ol>
          <li><strong>Use the IRS Tax Withholding Estimator</strong> on IRS.gov with a recent pay stub and your latest tax return. The IRS updated it in 2026 to reflect the 2025 tax law changes.</li>
          <li><strong>Complete a new Form W-4</strong> based on the results and give it to your employer's payroll department.</li>
          <li><strong>Check again</strong> after big changes: marriage or divorce, a new child, a second job, a spouse starting work, or new side income.</li>
        </ol>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ The 2026 Form W-4</div>
          <p>The 2026 Form W-4 was updated so employees can account for new federal deductions under the 2025 tax law — such as those for qualified tips, overtime pay, and passenger vehicle loan interest — through the Step 4(b) Deductions Worksheet. Each deduction has its own eligibility rules and limits; this guide does not cover them.</p>
        </div>

        <h2>Withholding vs. estimated tax</h2>
        <p>
          If you have significant income with no withholding — freelance, rental, or investment income — you can raise your W-4 withholding (Step 4(a) or 4(c)) or make <strong>estimated tax payments</strong>. Publication 505 explains when estimated tax is required. See <a href="/library/small-business/quarterly-taxes/">Quarterly estimated taxes</a>.
        </p>

        <h2>Example (illustrative)</h2>
        <p>
          Ana and Leo each earn about $70,000 at separate jobs and file jointly. In this example, both completed their W-4s as married filing jointly and neither accounted for the other job in Step 2. Each employer therefore withholds as if that salary were the household's only income, so together they are under-withheld and owe at filing time. Not every married couple with two jobs will owe — the result depends on how each W-4 is completed and on the household's actual income, deductions, and credits. Using the Tax Withholding Estimator, they complete new W-4s that account for both jobs (Step 2), and their withholding rises for the following year.
        </p>

        <h2>Common myths</h2>
        <ul>
          <li><strong>"A refund means I paid less tax."</strong> A refund only means you overpaid during the year.</li>
          <li><strong>"Owing means I made a mistake on my return."</strong> Usually it means withholding was too low, not that the return is wrong.</li>
          <li><strong>"A new W-4 guarantees I won't owe."</strong> It only changes future withholding; your actual income and credits decide the result.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '125',
  title:         'Inherited IRAs: The 10-Year Rule and Beneficiary Distributions',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the distribution rules for beneficiaries of traditional and Roth IRAs when the owner died after 2019, based on Publication 590-B (2025), the latest final IRS publication available. The underlying final regulations could not be read directly for this guide. It does not cover trusts as beneficiaries in detail, employer plan terms, state taxes, or foreign beneficiaries\' withholding',
  persona:       ['Adult children who inherited a parent\'s IRA', 'Surviving spouses', 'Beneficiaries of an inherited Roth IRA', 'Families settling an estate'],
  relatedJourney: ['Money & Benefits', 'Preparing to file'],
  actionRequired: 'Find out three things: whether you are an eligible designated beneficiary, whether the owner died before or after their required beginning date, and whether the account is traditional or Roth. Those answers decide whether you must take yearly distributions and when the account must be emptied. Missing a required distribution can bring a 25% excise tax.',
  sources: [
    { label: 'IRS — Publication 590-B (2025), Distributions from Individual Retirement Arrangements (IRAs)', url: 'https://www.irs.gov/pub/irs-pdf/p590b.pdf' },
    { label: 'IRS — Instructions for Form 5329 (additional taxes on qualified plans and IRAs)', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the 10-year rule?',
    a: 'For most beneficiaries of an owner who died after 2019, the entire inherited IRA must be distributed by December 31 of the year containing the 10th anniversary of the owner\'s death. If the owner died in 2025, the deadline is December 31, 2035.',
  },
  {
    q: 'Do I have to take money out every year during the 10 years?',
    a: 'It depends on when the owner died. If the owner died before their required beginning date and the 10-year rule applies, Publication 590-B says no distribution is required for any year before the 10th year. If the owner died on or after their required beginning date, required minimum distributions apply for the years after the year of death, and the account must still be emptied by the end of the 10th year.',
  },
  {
    q: 'Who is an eligible designated beneficiary?',
    a: 'The owner\'s surviving spouse, the owner\'s minor child, a disabled individual, a chronically ill individual, or any other individual who is not more than 10 years younger than the owner. These beneficiaries can generally use life expectancy payments instead of the 10-year rule.',
  },
  {
    q: 'Is the 10% early withdrawal tax a problem for an inherited IRA?',
    a: 'No. The 10% additional tax does not apply to distributions to a beneficiary because of the owner\'s death. Distributions from an inherited traditional IRA are still generally taxable income, except for any basis from nondeductible contributions.',
  },
  {
    q: 'Are inherited Roth IRA distributions taxable?',
    a: 'Often not. For required distribution purposes, a Roth IRA owner is treated as having died before the required beginning date, so under the 10-year rule no yearly distribution is required before the 10th year. Distributions are tax free if they are qualified; if the Roth\'s 5-year period was not yet met, the earnings part can be taxable.',
  },
  {
    q: 'What if I miss a required distribution?',
    a: 'You may owe a 25% excise tax on the amount not distributed, reported on Form 5329. The tax drops to 10% if you take the missed amount and file a return reflecting the tax within the correction window. You can also ask the IRS to waive the tax for reasonable cause.',
  },
]

const RELATED = [
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'RMD and withdrawal rules for account owners.',
  },
  {
    href: '/library/individual/estate-tax-inheritance-basics',
    cat:  'Individuals & Families',
    title: 'Estate Tax and Inheritance Basics: 2025 and 2026 Exclusions, Form 706, and Nonresidents',
    desc:  'Estate tax is separate from income tax on the IRA.',
  },
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: 'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules',
    desc:  'How traditional and Roth IRAs differ.',
  },
  {
    href: '/library/investment/foreign-pension-retirement-accounts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign Pensions and Retirement Accounts: What U.S. Taxpayers Must Report',
    desc:  'If the inherited account is outside the U.S.',
  },
]

export default function InheritedIraRulesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Inherited IRAs: The 10-Year Rule and Beneficiary Distributions | AskLinTax',
      description: 'Rules for inheriting a traditional or Roth IRA: eligible designated beneficiaries, the 10-year rule, when yearly RMDs are required, surviving spouse options, minor children, the 5-year rule, taxation, and the 25% excise tax for missed distributions.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you inherit an IRA from someone who died after 2019, you generally must empty it by <strong>December 31 of the 10th year after the death</strong> — unless you are an <strong>eligible designated beneficiary</strong>, such as a surviving spouse. Whether you also need <strong>yearly distributions</strong> during those 10 years depends on whether the owner died before or after their <strong>required beginning date</strong>. Distributions are not subject to the 10% early withdrawal tax, but traditional IRA distributions are generally taxable.
        </p>

        <h2>Which rule applies to you</h2>
        <ArticleTable
          head={['Beneficiary', 'Main rule', 'Notes']}
          rows={[
            ['Surviving spouse', 'Life expectancy payments, or treat the IRA as their own, or roll it over', 'Only a sole beneficiary spouse can treat the IRA as their own'],
            ['Other eligible designated beneficiary (owner\'s minor child, disabled, chronically ill, or not more than 10 years younger)', 'Life expectancy payments, generally; may elect the 10-year rule if the owner died before the required beginning date', 'A minor child switches to the 10-year rule on reaching the age of majority'],
            ['Other individual (for example, an adult child or grandchild)', '10-year rule', 'Yearly distributions may also be required — see below'],
            ['Not an individual (for example, the estate)', 'Owner died before the required beginning date: 5-year rule. On or after: payments over the owner\'s remaining life expectancy', 'Some trusts have special rules'],
          ]}
        />

        <h2>The required beginning date matters</h2>
        <ul>
          <li><strong>Required beginning date:</strong> for owners who reached age 72 after December 31, 2022, April 1 of the year after the year they reach age 73 (earlier birth years used earlier ages).</li>
          <li><strong>Owner died before that date, 10-year rule applies:</strong> no distribution is required for any year before the 10th year; the account must be fully distributed by the end of the 10th year.</li>
          <li><strong>Owner died on or after that date:</strong> for a designated beneficiary, required minimum distributions for years after the year of death are based on the longer of the beneficiary's single life expectancy or the owner's remaining life expectancy — and a beneficiary who is not an eligible designated beneficiary must still empty the account within 10 years.</li>
        </ul>

        <h2>Surviving spouses</h2>
        <ul>
          <li><strong>Treat it as your own</strong> (sole beneficiary only), or <strong>roll it over</strong> into your own IRA — then your own RMD rules apply.</li>
          <li><strong>Remain a beneficiary</strong> — life expectancy payments, or the 10-year rule if available.</li>
          <li>A spouse is treated as having chosen to treat the IRA as their own if they make contributions to it or skip a required beneficiary distribution, if they are the sole beneficiary.</li>
        </ul>

        <h2>Inherited Roth IRAs</h2>
        <ul>
          <li>For required distribution purposes, the Roth owner is treated as having died before the required beginning date.</li>
          <li>Under the 10-year rule, no yearly distribution is required before the 10th year, but the account must be emptied by the end of the 10th year.</li>
          <li>Qualified distributions are tax free. If the 5-year period has not been met, the earnings part of a distribution can be taxable, though the 10% additional tax does not apply.</li>
        </ul>

        <h2>Taxes and penalties</h2>
        <ArticleTable
          head={['Item', 'Rule']}
          rows={[
            ['Income tax', 'Traditional IRA distributions are generally taxable in the year received, except for any nondeductible basis'],
            ['10% additional tax', 'Does not apply to distributions to a beneficiary after the owner\'s death'],
            ['Missed required distribution', '25% excise tax on the shortfall; 10% if corrected within the correction window; reported on Form 5329; a waiver for reasonable cause can be requested'],
            ['Amount left after the 10-year (or 5-year) deadline', 'Subject to the same excise tax'],
          ]}
        />

        <h2>Examples (owner died in 2025)</h2>
        <ArticleTable
          head={['', 'Kevin', 'Amy', 'Rosa']}
          rows={[
            ['Facts', 'Inherits his father\'s traditional IRA; father died at 78, after his required beginning date', 'Inherits her mother\'s traditional IRA; mother died at 65, before her required beginning date', 'Inherits her husband\'s IRA as sole beneficiary'],
            ['Rule', 'Yearly RMDs starting in 2026, and the account must be empty by December 31, 2035', 'No yearly distribution required; the account must be empty by December 31, 2035', 'Can treat it as her own or roll it over, or remain a beneficiary and use life expectancy payments'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Plan the withdrawals</div>
          <p>Taking the whole balance in one year can push you into a higher bracket. Spreading withdrawals over the 10 years may lower the total tax. Check the IRA custodian's documents and consider a tax professional, especially for trusts, multiple beneficiaries, or a spouse's options.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

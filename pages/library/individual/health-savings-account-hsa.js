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
  id:            '102',
  title:         'Health Savings Accounts (HSA): 2025 and 2026 Limits and the New 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains health savings accounts for tax years 2025 and 2026, based on Publication 969 (2025), Rev. Proc. 2024-25 (2025 limits), Rev. Proc. 2025-19 (2026 limits), IRS Notice 2026-5 on the 2025 tax law changes, and Rev. Procs. 2024-40 and 2025-32 for health FSA limits. It does not cover Archer MSAs, HSA investment choices, employer plan design, or state tax',
  persona:       ['Employees choosing a high deductible health plan', 'People buying a bronze or catastrophic plan for 2026', 'Families comparing an HSA and an FSA', 'People approaching Medicare'],
  relatedJourney: ['Money & Benefits', 'Understanding new tax rules'],
  actionRequired: 'Confirm you are covered by an HSA-qualifying plan and have no disqualifying coverage, keep total contributions (yours plus your employer\'s) within your limit, contribute by the return due date, and file Form 8889 for any year with HSA activity.',
  sources: [
    { label: 'IRS — Publication 969 (2025), Health Savings Accounts and Other Tax-Favored Health Plans', url: 'https://www.irs.gov/publications/p969' },
    { label: 'IRS — Rev. Proc. 2024-25 (2025 HSA limits)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-25.pdf' },
    { label: 'IRS — Rev. Proc. 2025-19 (2026 HSA limits)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-19.pdf' },
    { label: 'IRS — Notice 2026-5, Expanded Availability of Health Savings Accounts', url: 'https://www.irs.gov/pub/irs-drop/n-26-05.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 health FSA limit)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 health FSA limit)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do my employer\'s contributions count toward my limit?',
    a: 'Yes. Publication 969 says you must reduce the amount you or anyone else can contribute by your employer\'s excludable contributions, including amounts contributed through a cafeteria plan. They appear on your Form W-2 in box 12 with code W.',
  },
  {
    q: 'When is the deadline to contribute?',
    a: 'You can make contributions for a year until the due date of that year\'s return, without extensions. For 2025, Publication 969 says contributions can be made through April 15, 2026.',
  },
  {
    q: 'Can I keep using my HSA after I stop being eligible?',
    a: 'Yes. You cannot make new contributions once you are no longer eligible, for example after enrolling in Medicare, but the account is yours. You can keep using it for qualified medical expenses tax-free, and it stays with you if you change employers.',
  },
  {
    q: 'What happens if I use HSA money for something other than medical care?',
    a: 'The amount is included in income, and an additional 20% tax applies unless the distribution is made after you become disabled, reach age 65, or die. After 65, nonmedical withdrawals are taxed as income but without the 20% additional tax.',
  },
  {
    q: 'Can I use HSA money to pay health insurance premiums?',
    a: 'Generally no. Exceptions include long-term care insurance (within limits), COBRA continuation coverage, coverage while receiving unemployment compensation, and, if you are 65 or older, Medicare and other health coverage other than a Medicare supplemental (Medigap) policy.',
  },
  {
    q: 'I contributed too much. What now?',
    a: 'Excess contributions are subject to a 6% excise tax each year they remain, figured on Form 5329. You can avoid it by withdrawing the excess and its earnings by the due date, including extensions, of your return; the earnings are taxable.',
  },
]

const RELATED = [
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'Box 12, code W shows employer HSA contributions.',
  },
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: 'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules',
    desc:  'Another tax-advantaged account with separate limits.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'How retirement account withdrawals differ from HSA distributions.',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'Other changes under the 2025 tax law.',
  },
]

export default function HealthSavingsAccountPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Health Savings Accounts (HSA): 2025 and 2026 Limits and the New 2026 Rules | AskLinTax',
      description: 'HSAs explained: who is eligible, HDHP rules, 2025 and 2026 contribution limits, the age-55 catch-up, employer contributions, the last-month rule, Form 8889, the 20% tax, HSA vs. FSA, Medicare, and 2026 bronze, catastrophic, and direct primary care rules.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>health savings account (HSA)</strong> is an account you own for medical expenses. If you are covered by a <strong>high deductible health plan (HDHP)</strong> and meet the other rules, contributions are deductible (or excluded from income if made through your employer), the account grows tax-free, and withdrawals for qualified medical expenses are tax-free. For <strong>2025</strong> you can contribute up to <strong>$4,300</strong> (self-only) or <strong>$8,550</strong> (family); for <strong>2026</strong>, <strong>$4,400</strong> or <strong>$8,750</strong>. Starting in 2026, <strong>bronze and catastrophic</strong> plans available through an Exchange count as HDHPs.
        </p>

        <h2>Who can contribute</h2>
        <p>Under Publication 969, you are an eligible individual for a month if:</p>
        <ul>
          <li>you are covered by an HDHP on the first day of the month;</li>
          <li>you have no other health coverage, except permitted coverage (such as dental, vision, accident, disability, long-term care, or specific-disease insurance);</li>
          <li>you are <strong>not enrolled in Medicare</strong>; and</li>
          <li>no one can claim you as a dependent.</li>
        </ul>
        <p>
          Eligibility decides whether you can <strong>contribute</strong>. Spending the money tax-free depends on a separate test: whether the expense is a <strong>qualified medical expense</strong>.
        </p>
        <ArticleTable
          head={['Question', 'What decides it', 'Example']}
          rows={[
            ['Can I contribute this month?', 'Eligibility: HDHP (or, from 2026, a qualifying bronze or catastrophic plan) on the first day of the month, no disqualifying coverage, no Medicare, not a dependent', 'Enrolling in Medicare ends eligibility to contribute'],
            ['How much can I contribute?', 'The annual limit for self-only or family coverage — figured month by month on the Form 8889 worksheet if you were not eligible all year, unless the last-month rule applies — minus employer contributions, plus the age-55 amount', 'Self-only 2026: $4,400'],
            ['Is a withdrawal tax-free?', 'Whether it pays a qualified medical expense incurred after the HSA was established — not whether you are still eligible to contribute', 'After enrolling in Medicare, you can still use the HSA tax-free for qualified expenses'],
          ]}
        />

        <h2>2025 and 2026 limits</h2>
        <ArticleTable
          head={['Item', '2025', '2026']}
          rows={[
            ['Contribution limit, self-only coverage', '$4,300', '$4,400'],
            ['Contribution limit, family coverage', '$8,550', '$8,750'],
            ['Additional contribution, age 55 or older', '$1,000', '$1,000'],
            ['HDHP minimum deductible, self-only / family', '$1,650 / $3,300', '$1,700 / $3,400'],
            ['HDHP out-of-pocket maximum, self-only / family', '$8,300 / $16,600', '$8,500 / $17,000'],
          ]}
        />
        <p>
          The limits include your employer's contributions. The age-55 additional contribution goes into your own HSA; if both spouses are 55 or older, each must use their own account. Notice 2026-5 notes that, for 2026, these deductible and out-of-pocket figures do not apply to bronze and catastrophic plans, which are covered by the new rule below.
        </p>

        <h2>Married couples and family coverage</h2>
        <ul>
          <li>If either spouse has family HDHP coverage, both are treated as having family coverage.</li>
          <li>The family limit is split between the spouses equally unless they agree otherwise; there are no joint HSAs.</li>
          <li>For 2025, if both spouses are 55 or older and eligible, the total can be up to <strong>$10,550</strong> ($8,550 plus $1,000 each, with each $1,000 going to that spouse's own HSA).</li>
        </ul>

        <h2>Partial years: the last-month rule and testing period</h2>
        <p>
          If you are eligible on <strong>December 1</strong>, the last-month rule lets you contribute the full annual amount for that year. But you must stay eligible through the <strong>testing period</strong>, which runs through December 31 of the following year. If you do not (other than because of death or disability), the extra amount you contributed only because of this rule is included in income for the year you lose eligibility and is subject to a <strong>10% additional tax</strong>, figured on Form 8889, Part III.
        </p>

        <h2>Medicare</h2>
        <p>
          Your contribution limit is <strong>zero</strong> starting with the first month you are enrolled in Medicare, including months of retroactive Medicare coverage. In the year you enroll, the limit is prorated for the months before enrollment. You can still use the money in your HSA afterward.
        </p>

        <h2>Spending HSA money</h2>
        <ul>
          <li><strong>Qualified medical expenses:</strong> medical care for you, your spouse, and your dependents, not reimbursed by insurance, incurred after the HSA was established.</li>
          <li><strong>Insurance premiums:</strong> generally not qualified, except long-term care insurance, COBRA, coverage while receiving unemployment compensation, and (at 65 or older) Medicare and other coverage other than Medigap.</li>
          <li><strong>Other withdrawals:</strong> taxable, plus a <strong>20% additional tax</strong> unless after disability, age 65, or death.</li>
          <li><strong>No deadline:</strong> you do not have to take distributions each year.</li>
        </ul>

        <h2>Examples (illustrative)</h2>
        <ArticleTable
          head={['Situation', 'Result']}
          rows={[
            ['Maya, 40, self-only HDHP all of 2026; employer contributes $1,000 (W-2 code W)', 'She can add up to $3,400 ($4,400 − $1,000) for 2026'],
            ['Ken, 50, starts family HDHP coverage on December 1, 2025, and contributes $8,550 for 2025', 'Allowed under the last-month rule if he stays eligible through December 31, 2026'],
            ['Ken switches to a non-HDHP plan in June 2026', 'The part of his 2025 contribution allowed only by the last-month rule is income for 2026, plus a 10% additional tax'],
            ['Ana, 45, withdraws $1,000 for a vacation', '$1,000 is taxable income, plus a $200 additional tax (20%)'],
          ]}
        />

        <h2>Reporting: Form 8889 and Form W-2</h2>
        <ul>
          <li><strong>Form 8889</strong> reports contributions, figures your deduction, and reports distributions. File it with Form 1040 for any year you, your employer, or someone else contributed, your HSA made a distribution, you failed the testing period, or you acquired an interest in an HSA because of the account holder's death.</li>
          <li><strong>Form W-2, box 12, code W</strong> shows employer contributions, including your pre-tax cafeteria plan contributions.</li>
          <li><strong>Form 5498-SA</strong> (contributions) and <strong>Form 1099-SA</strong> (distributions) come from the HSA trustee.</li>
        </ul>

        <h2>New for 2026 under the 2025 tax law</h2>
        <ArticleTable
          head={['Change', 'What it does', 'Effective']}
          rows={[
            ['Telehealth', 'An HDHP can cover telehealth and other remote care before the deductible without making you ineligible', 'Permanent, for plan years beginning after December 31, 2024'],
            ['Bronze and catastrophic plans', 'Treated as HDHPs if available as individual coverage through an Exchange — including the same plan bought off-Exchange — even if they do not meet the HDHP deductible or out-of-pocket rules', 'Months beginning after December 31, 2025'],
            ['Direct primary care (DPC)', 'Enrolling in a qualifying DPC arrangement no longer makes you ineligible, and its fees can be paid from your HSA', 'Months beginning after December 31, 2025'],
          ]}
        />
        <p>
          <strong>Direct primary care limits (Notice 2026-5).</strong> The arrangement must provide only primary care services from primary care practitioners for a fixed periodic fee, with no separate billing. Total DPC fees cannot exceed <strong>$150 a month</strong> for one person, or <strong>$300 a month</strong> for an arrangement covering more than one person; the amounts are indexed after 2026. DPC fees paid by an employer, including through salary reduction, cannot also be reimbursed from your HSA.
        </p>
        <p>
          The contribution limits themselves did not change: people newly eligible through a bronze or catastrophic plan use the same 2026 limits shown above.
        </p>

        <h2>HSA vs. health FSA</h2>
        <ArticleTable
          head={['', 'HSA', 'Health FSA']}
          rows={[
            ['Who owns it', 'You', 'Employer plan'],
            ['Requires an HDHP', 'Yes (or a 2026 bronze or catastrophic plan)', 'No'],
            ['Annual limit', '$4,300 / $8,550 (2025); $4,400 / $8,750 (2026)', '$3,300 salary reduction (2025); $3,400 (2026)'],
            ['Unused money', 'Stays in the account', 'Generally forfeited, unless the plan allows a carryover (up to $660 for 2025, $680 for 2026) or a grace period'],
          ]}
        />
        <p>
          Being covered by a health FSA or HRA that pays or reimburses your qualified medical expenses generally makes you ineligible to contribute to an HSA; Publication 969 describes exceptions, such as limited-purpose health FSAs and HRAs.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Forgetting employer contributions</strong> when figuring your own limit.</li>
          <li><strong>Contributing after enrolling in Medicare</strong>, including retroactive coverage.</li>
          <li><strong>Losing eligibility during the testing period</strong> after a December 1 start.</li>
          <li><strong>Paying expenses from before the HSA was opened.</strong></li>
          <li><strong>Assuming any 2026 marketplace plan qualifies</strong> — only bronze and catastrophic plans get the new treatment.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Mid-year changes in coverage, other health coverage such as an FSA or HRA, Indian Health Service care, rollovers and IRA funding distributions, and HSAs inherited by someone other than a spouse can be complex. State tax treatment of HSAs varies and is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

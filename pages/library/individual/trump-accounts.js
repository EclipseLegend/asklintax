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
  id:            '73',
  title:         'Trump Accounts: Who Can Open One, the $1,000 Contribution, and the Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains Trump accounts (a new type of individual retirement account for children under the 2025 tax law) based on IRS Notice 2025-68, Form 4547 and its instructions, Revenue Procedure 2026-25, the draft 2026 Form 5329 and instructions, and IRS news releases describing proposed regulations. Much of the detailed guidance is still proposed, not final, and may change. It does not cover employer plan design, investment selection, or state law',
  persona:       ['Parents of a child born in 2025 through 2028', 'Parents and grandparents of children under 18', 'Families comparing Trump accounts with 529 plans', 'Employees whose employer offers Trump account contributions'],
  relatedJourney: ['Planning for a child', 'Understanding new tax rules'],
  actionRequired: 'If your child qualifies, an authorized adult can make the election on Form 4547 (on paper, through an IRS online account, or with a tax return). Check the box for the $1,000 pilot program contribution only if the child was born in 2025 through 2028, is a U.S. citizen, and has a Social Security number.',
  sources: [
    { label: 'IRS — Trump accounts', url: 'https://www.irs.gov/trumpaccounts' },
    { label: 'IRS — Notice 2025-68, Trump accounts (guidance and intent to propose regulations)', url: 'https://www.irs.gov/pub/irs-drop/n-25-68.pdf' },
    { label: 'IRS — Instructions for Form 4547 (Rev. December 2025), Trump Account Election(s)', url: 'https://www.irs.gov/pub/irs-pdf/i4547.pdf' },
    { label: 'IRS — Form 4547, Trump Account Election(s)', url: 'https://www.irs.gov/pub/irs-pdf/f4547.pdf' },
    { label: 'IRS — IR-2025-117, Guidance on Trump accounts', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-guidance-on-trump-accounts-established-under-the-working-families-tax-cuts-notice-announces-upcoming-regulations' },
    { label: 'IRS — IR-2026-31, Proposed regulations for the $1,000 pilot program contribution', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-for-trump-accounts-contribution-pilot-program-treasury-department-to-deposit-1000-into-the-account-of-each-eligible-child' },
    { label: 'IRS — IR-2026-33, Proposed regulations on opening initial Trump accounts', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-how-to-open-initial-trump-accounts-under-the-one-big-beautiful-bill' },
    { label: 'IRS — IR-2026-96, Proposed regulations on eligible investments', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-eligible-investments-for-trump-accounts-under-the-working-families-tax-cuts' },
    { label: 'IRS — IR-2026-90, Proposed regulations on employer contributions', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-employer-contributions-to-trump-accounts-under-the-working-families-tax-cuts' },
    { label: 'IRS — Revenue Procedure 2026-25 (gift tax safe harbor for contributions)', url: 'https://www.irs.gov/pub/irs-drop/rp-26-25.pdf' },
    { label: 'IRS — General Instructions for Forms W-2 and W-3 (2026)', url: 'https://www.irs.gov/instructions/iw2w3' },
    { label: 'IRS — Draft 2026 Instructions for Form 5329 (September 2026, not final)', url: 'https://www.irs.gov/pub/irs-dft/i5329--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does every child get $1,000?',
    a: 'No. The $1,000 pilot program contribution is only for a child born in 2025, 2026, 2027, or 2028 who is a U.S. citizen and has a Social Security number, and an eligible adult must elect it (on Form 4547 or online). Older children can still have a Trump account, but without the $1,000.',
  },
  {
    q: 'Are contributions tax-deductible?',
    a: 'No. According to IRS Notice 2025-68, no deduction is allowed for contributions to a Trump account. Earnings grow without current tax, and amounts withdrawn later are taxed under traditional IRA rules, except for the part that is your own after-tax contributions (basis).',
  },
  {
    q: 'Does the $1,000 count toward the $5,000 annual limit?',
    a: 'No. The pilot program contribution, qualified general contributions from governments or charities, and rollovers are not subject to the annual limit. Contributions from parents, relatives, and employers are.',
  },
  {
    q: 'Can my child withdraw money before age 18?',
    a: 'Generally no. During the growth period — which ends December 31 of the year the child turns 17 — distributions are not allowed except for rollovers to another Trump account, a rollover of the entire balance to the child\'s ABLE account in the year the child turns 17, distributions of excess contributions, and death. After that, the account follows traditional IRA rules.',
  },
  {
    q: 'Do grandparents need to file a gift tax return to contribute?',
    a: 'Not always. Under Revenue Procedure 2026-25, an individual\'s contributions can be treated as annual-exclusion gifts without filing Form 709 if all the safe-harbor conditions are met — including that total gifts to the child are no more than $19,000 for 2026 and the donor has no other taxable gifts that year.',
  },
  {
    q: 'Are these rules final?',
    a: 'Not all of them. The basic rules come from the 2025 tax law as described by the IRS. Many details are in Notice 2025-68 and proposed regulations issued in 2026, which may change before they are finalized.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 Plans: Expanded K-12 and Credential Expenses Explained',
    desc:  'The education savings account, compared.',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'Where employer Trump account contributions appear (code TA).',
  },
]

export default function TrumpAccountsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Trump Accounts: Eligibility, the $1,000 Contribution & Rules | AskLinTax',
      description: 'Trump accounts for children: who can open one, who gets the $1,000 pilot contribution, the $5,000 limit, investment and withdrawal rules, and what is still proposed.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>Trump account</strong> is a new type of traditional individual retirement account (IRA) for a child, created by the 2025 tax law. The rules apply for tax years beginning after December 31, 2025, and <strong>contributions could not be made before July 4, 2026</strong>.
        </p>
        <ul>
          <li><strong>Who can have one:</strong> a child under 18 at the end of the year the election is made, with a Social Security number.</li>
          <li><strong>$1,000 from the government:</strong> only for an eligible U.S.-citizen child born in <strong>2025 through 2028</strong>, if an adult elects it.</li>
          <li><strong>Contributions:</strong> up to <strong>$5,000</strong> a year from family, others, and employers for 2026 and 2027, with inflation adjustments after that. Contributions are not tax-deductible.</li>
          <li><strong>Investments:</strong> limited to low-cost funds that track a U.S. stock index.</li>
          <li><strong>Withdrawals:</strong> generally not allowed until the year the child turns 18; after that, traditional IRA rules apply.</li>
        </ul>

        <h2>Who can have a Trump account</h2>
        <p>
          An eligible child is one for whom an election is made, who has <strong>not reached age 18 by the end of the calendar year</strong> of the election, and who has a <strong>Social Security number</strong> (valid for employment) issued before the election. For an election made in 2026, the child must have been born after December 31, 2008. Only one initial account can be elected for each child. There is no U.S.-citizenship requirement to open the account — citizenship matters only for the $1,000 contribution.
        </p>
        <p>
          The election is made on <strong>Form 4547</strong>, which can be filed on paper, submitted through an IRS Individual Online Account, or filed with an income tax return (it should not be attached to Form 1040-X). Under the IRS notice and proposed regulations, the person who may make the election is, in order of priority, the child's legal guardian, parent, adult sibling, or grandparent; when the $1,000 election is made at the same time, the person making that election opens the account. The deadline to open an account is December 31 of the year the child turns 17.
        </p>

        <h2>The $1,000 pilot program contribution</h2>
        <ArticleTable
          head={['Requirement', 'Details']}
          rows={[
            ['Birth year', 'Born in 2025, 2026, 2027, or 2028'],
            ['Citizenship', 'U.S. citizen'],
            ['Social Security number', 'Issued to the child before the election'],
            ['Election', 'Made by an adult who expects the child to be his or her qualifying child for the year (Form 4547, Part III); the same person must also elect to open the account'],
            ['One per child', 'Not available if a pilot election was already made and processed for the child'],
            ['Timing', 'Deposited by the Treasury no earlier than July 4, 2026, after the account is opened'],
          ]}
        />
        <p>
          The $1,000 does <strong>not</strong> count toward the $5,000 annual limit, and it does not create basis — so it is taxed when eventually withdrawn. A state, territorial, or tribal child welfare agency that is a child's legal guardian may open an account for the child but cannot elect the $1,000; a foster parent who expects the child to be his or her qualifying child may make that election.
        </p>

        <h2>Contributions and limits</h2>
        <ArticleTable
          head={['Type of contribution', 'Counts toward the $5,000 annual limit?', 'Notes']}
          rows={[
            ['Parents, relatives, friends, the child', 'Yes', 'Not deductible; creates basis (after-tax money)'],
            ['Employer (section 128 program)', 'Yes', 'Up to $2,500 per employee per year, excluded from the employee\'s income; reported on Form W-2, box 12, code TA'],
            ['$1,000 pilot program contribution', 'No', 'Only for eligible children born 2025–2028'],
            ['Qualified general contributions (governments, charities)', 'No', 'Made to a defined group of children, not to one child'],
            ['Rollovers from another Trump account', 'No', 'Basis carries over'],
          ]}
        />
        <p>
          The $5,000 limit applies for 2026 and 2027 and is adjusted for inflation after 2027. Contributions can be made only until <strong>December 31 of the year the child turns 17</strong>, and a contribution made in a calendar year counts for that year — there is no option to treat an early-next-year contribution as made for the prior year. No earned income is required.
        </p>

        <h2>Excess contributions (2026)</h2>
        <p>
          Contributions for 2026 above the <strong>$5,000</strong> limit — not counting exempt contributions such as the $1,000 pilot contribution, qualified general contributions, and rollovers — are excess contributions and <strong>may have tax consequences</strong>. Notice 2025-68 allows distributions of excess contributions from the account, even during the growth period.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Details still subject to official guidance</div>
          <p>The IRS has released only <strong>draft</strong> 2026 forms and instructions (Form 5329) for reporting excess contributions to Trump accounts. The specific tax treatment and how to correct an excess are not final and may change. If contributions to a child's account may have gone over the limit, contact the account trustee and check IRS.gov/TrumpAccounts.</p>
        </div>

        <h2>Investment rules</h2>
        <p>
          Until the end of the year the child turns 17, the account may be invested only in mutual funds or exchange-traded funds that <strong>track an index of primarily U.S. companies</strong> (such as the S&P 500), <strong>do not use leverage</strong>, and have annual fees and expenses of <strong>no more than 0.1%</strong>. Industry- or sector-specific indexes do not qualify. If no investment is chosen, the trustee's default eligible investment is used. These details are in proposed regulations issued in August 2026.
        </p>

        <h2>Withdrawals and taxes</h2>
        <ul>
          <li><strong>Before the year the child turns 18:</strong> distributions are generally not allowed — no hardship withdrawals and no closing the account — except for rollovers to another Trump account, a rollover of the entire balance to the child's ABLE account in the year the child turns 17, distributions of excess contributions, and death.</li>
          <li><strong>Starting January 1 of the year the child turns 18:</strong> the account follows traditional IRA rules. Earnings and amounts that are not basis are taxable when withdrawn, and a 10% additional tax may apply to early distributions unless an exception applies (for example, qualified higher education expenses or a first home purchase).</li>
          <li><strong>Basis:</strong> after-tax contributions from family and others are basis and are not taxed again; the $1,000 pilot contribution, employer contributions, and general contributions are not basis.</li>
        </ul>

        <h2>Examples (illustrative, 2026)</h2>
        <p>
          <strong>Emma</strong> was born in March 2026. She is a U.S. citizen with a Social Security number. Her mother files Form 4547 to open a Trump account and elect the pilot program contribution, so the Treasury deposits <strong>$1,000</strong> after the account is opened. In 2026 her grandparents contribute $3,000 and her parents $2,000 — <strong>$5,000</strong>, the annual limit. The $1,000 pilot contribution does not count toward that limit.
        </p>
        <p>
          <strong>Kevin</strong> was born in 2016. His parents can open a Trump account for him in 2026 because he is under 18 and has a Social Security number, but he does <strong>not</strong> qualify for the $1,000 because he was born before 2025.
        </p>
        <p>
          <strong>Sophia's</strong> father's employer contributes $2,500 to her Trump account in 2026 under a section 128 program. Because employer contributions count toward the $5,000 limit, the family can contribute up to <strong>$2,500</strong> more for 2026.
        </p>

        <h2>Which rules are final?</h2>
        <ArticleTable
          head={['Source', 'Status']}
          rows={[
            ['The 2025 tax law (sections 530A, 6434, and 128 of the Internal Revenue Code)', 'Enacted; applies for tax years beginning after December 31, 2025'],
            ['Notice 2025-68 (December 2025)', 'Interim guidance the IRS intends to propose as regulations'],
            ['Opening accounts and the $1,000 pilot program (March 2026)', 'Proposed regulations'],
            ['Employer contributions (August 2026) and eligible investments (August 2026)', 'Proposed regulations'],
            ['Form 4547 and instructions; Revenue Procedure 2026-25 (gift tax)', 'Final forms and guidance'],
            ['Excess-contribution tax reporting (2026 Form 5329 and instructions)', 'Draft forms only — not final'],
            ['Annual trustee reporting forms, sample account documents, and some other items', 'Not yet issued'],
          ]}
        />

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"Every child gets $1,000."</strong> Only eligible U.S.-citizen children born in 2025 through 2028, if an adult elects it.</li>
          <li><strong>"Contributions are tax-deductible like a regular IRA."</strong> They are not deductible.</li>
          <li><strong>"My child can use the money any time."</strong> Withdrawals are generally not allowed until the year the child turns 18.</li>
          <li><strong>"Going over $5,000 just means the extra is ignored."</strong> Excess contributions may have tax consequences; the details are still subject to official IRS guidance.</li>
          <li><strong>"Employer money is extra on top of the $5,000."</strong> Employer contributions count toward the $5,000 limit.</li>
          <li><strong>"It is tax-free like a Roth IRA."</strong> A Trump account is a traditional IRA, not a Roth; earnings are taxed when withdrawn.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Guidance is still developing</div>
          <p>Several rules in this guide come from proposed regulations and IRS notices that may change. State tax treatment may differ from federal rules. Check IRS.gov/TrumpAccounts before acting.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

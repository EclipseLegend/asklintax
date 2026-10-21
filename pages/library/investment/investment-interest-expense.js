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
  id:            '88',
  title:         'Margin and Investment Loan Interest: The Form 4952 Deduction',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal deduction for investment interest expense for individuals for tax years 2025 and 2026, based on Form 4952 and its instructions (2025), Publication 550 (2025), IRS Topic no. 505, Rev. Proc. 2025-32, and the 2026 draft Instructions for Form 8960 describing section 70111 of P.L. 119-21. The 2026 section 68 limitation is described from draft instructions only. Interest tracing rules, passive activities, estates and trusts, and state tax are not covered',
  persona:       ['Investors who borrow on margin', 'People who took a loan to buy stocks or other investments', 'Itemizers with investment income', 'High-income investors planning for 2026'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'If you itemize and paid interest on money borrowed to buy investments, figure your deduction on Form 4952: it is limited to your net investment income, and any excess carries forward. Decide carefully whether to elect to treat qualified dividends or capital gains as investment income.',
  sources: [
    { label: 'IRS — Form 4952, Investment Interest Expense Deduction (2025), including instructions', url: 'https://www.irs.gov/pub/irs-pdf/f4952.pdf' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Topic no. 505, Interest expense', url: 'https://www.irs.gov/taxtopics/tc505' },
    { label: 'IRS — 2026 Instructions for Form 8960 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is margin interest deductible?',
    a: 'Generally yes, as investment interest, if you itemize deductions. The deduction is limited to your net investment income for the year, and you claim it on Schedule A (Form 1040), line 9, usually after completing Form 4952.',
  },
  {
    q: 'Can I deduct investment interest if I take the standard deduction?',
    a: 'No. Investment interest is an itemized deduction, so it helps only if you itemize.',
  },
  {
    q: 'What happens to interest I could not deduct?',
    a: 'It carries forward to the next tax year and is treated as investment interest paid in that year. Publication 550 says you can carry it forward even if it is more than your taxable income in the year you paid it.',
  },
  {
    q: 'Do my qualified dividends count as investment income?',
    a: 'Not automatically. Qualified dividends and net capital gain from investment property are excluded from investment income unless you elect to include them on Form 4952, line 4g. If you elect, those amounts are taxed at ordinary rates instead of the lower capital gain rates, and the election can be revoked only with IRS consent.',
  },
  {
    q: 'Can I deduct my investment advisory fees?',
    a: 'No. Advisory and brokerage fees are miscellaneous itemized deductions, which are not deductible. P.L. 119-21 made this disallowance permanent for tax years beginning after 2017.',
  },
  {
    q: 'Is interest on a loan to buy municipal bonds deductible?',
    a: 'No. Interest on money borrowed to buy or carry investments that produce tax-exempt income is not deductible.',
  },
]

const RELATED = [
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I have to report bank interest and dividends?',
    desc:  'The interest and dividends that make up investment income.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'How investment interest reduces net investment income for the NIIT.',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'The capital gain rates you give up by making the election.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'How itemized deductions reduce taxable income.',
  },
]

export default function InvestmentInterestExpensePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Margin and Investment Loan Interest: The Form 4952 Deduction | AskLinTax',
      description: 'Investment interest expense explained: margin interest, the net investment income limit, Form 4952, Schedule A, carryforwards, the qualified dividend and capital gain election, and 2025 vs. 2026 rules.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Interest on money you borrow to buy investments — such as <strong>margin interest</strong> or an investment loan — is <strong>investment interest</strong>. If you itemize, you can deduct it on <strong>Schedule A</strong>, but only up to your <strong>net investment income</strong> for the year. You figure the limit on <strong>Form 4952</strong>, and any amount you cannot deduct <strong>carries forward</strong>.
        </p>

        <h2>What counts as investment interest</h2>
        <p>
          Investment interest is interest paid or accrued on a loan, or part of a loan, that is allocable to property held for investment — property that produces interest, dividends, annuities, or royalties, or that you hold for gain, outside a trade or business. It does <strong>not</strong> include:
        </p>
        <ul>
          <li>home mortgage interest (qualified residence interest) or other personal interest;</li>
          <li>interest allocable to a passive activity, such as most rental activities;</li>
          <li>interest that is capitalized;</li>
          <li>interest on debt used to buy or carry tax-exempt investments.</li>
        </ul>
        <p>
          What matters is how the borrowed money was used. If a loan was used for more than one purpose, the interest may have to be allocated.
        </p>

        <h2>The net investment income limit</h2>
        <p>
          Your deduction is limited to <strong>net investment income</strong>: investment income minus investment expenses other than interest. On Form 4952:
        </p>
        <ul>
          <li><strong>Investment income</strong> includes taxable interest and ordinary dividends from investment property, but <strong>not</strong> qualified dividends or net capital gain unless you elect to include them.</li>
          <li><strong>Investment expenses</strong> are deductible expenses directly connected with producing investment income. Most expenses such as advisory fees are miscellaneous itemized deductions, which are not deductible.</li>
        </ul>

        <h2>The qualified dividend and capital gain election</h2>
        <p>
          You can elect to include part or all of your qualified dividends and net capital gain in investment income (Form 4952, line 4g). This raises your deduction limit, but the elected amount is <strong>no longer eligible</strong> for the 0%, 15%, or 20% capital gain rates and is taxed at ordinary rates. The election can be revoked only with IRS consent, so compare the tax both ways first. If you make it, use the Schedule D Tax Worksheet to figure your tax.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Ana and Ben</strong> file jointly and itemize. They paid <strong>$8,000</strong> of margin interest. Their investment income was $2,000 of taxable interest and $5,000 of ordinary dividends, of which $4,000 were qualified dividends, plus a $10,000 long-term capital gain. They have no other investment expenses and no carryover.
        </p>
        <ArticleTable
          head={['Form 4952 line', 'No election', 'Elect $5,000']}
          rows={[
            ['3 — total investment interest expense', '$8,000', '$8,000'],
            ['4a — interest and ordinary dividends', '$7,000', '$7,000'],
            ['4b — qualified dividends included on line 4a', '$4,000', '$4,000'],
            ['4c — line 4a minus line 4b', '$3,000', '$3,000'],
            ['4d and 4e — net gain and net capital gain', '$10,000', '$10,000'],
            ['4f — line 4d minus line 4e', '$0', '$0'],
            ['4g — amount elected', '$0', '$5,000'],
            ['4h and 6 — net investment income', '$3,000', '$8,000'],
            ['8 — deduction (smaller of line 3 or line 6)', '$3,000', '$8,000'],
            ['7 — carried forward to 2026', '$5,000', '$0'],
          ]}
        />
        <p>
          Without the election they deduct $3,000 and carry $5,000 forward. With the election they deduct all $8,000 now, but $5,000 of qualified dividends or capital gain is taxed at ordinary rates instead of the lower rates. Which is better depends on their tax brackets and whether they expect investment income in later years.
        </p>

        <h2>When you don't need Form 4952</h2>
        <p>
          You don't have to file Form 4952 if <strong>all</strong> of these apply:
        </p>
        <ul>
          <li>your investment income from interest and ordinary dividends, minus qualified dividends, is more than your investment interest expense;</li>
          <li>you have no other deductible investment expenses; and</li>
          <li>you have no carryover of disallowed investment interest from the prior year.</li>
        </ul>

        <h2>2025 vs. 2026</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['Form 4952 limit and carryforward', 'Apply', 'Apply (no change identified)'],
            ['Miscellaneous investment expenses (advisory fees)', 'Not deductible', 'Not deductible — made permanent by P.L. 119-21, section 70110'],
            ['Section 68 overall limit on itemized deductions', 'Not applicable to investment interest', 'Enacted law (P.L. 119-21, section 70111): investment interest is no longer exempt from the section 68 limit'],
          ]}
        />
        <p>
          <strong>What is enacted and what is draft:</strong> the change for 2026 is enacted law. How to apply it on the return comes from the <strong>2026 draft</strong> Instructions for Form 8960, which describe a new section 68 worksheet and say the limitation generally applies to people in the highest tax bracket. For 2026, Rev. Proc. 2025-32 says the 37% bracket begins at taxable income over $640,600 for single filers and heads of household, $768,700 for married couples filing jointly, and $384,350 for married filing separately. Check the final 2026 forms and instructions before filing; this guide does not compute the 2026 limitation.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Deducting home mortgage interest as investment interest</strong>, or the reverse.</li>
          <li><strong>Counting qualified dividends as investment income</strong> without making the election.</li>
          <li><strong>Making the election without comparing</strong> the tax with and without it.</li>
          <li><strong>Losing track of the carryforward</strong> from Form 4952, line 7.</li>
          <li><strong>Deducting advisory fees</strong> as investment expenses.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Tracing and 2026 rules</div>
          <p>Allocating interest when borrowed money is used for several purposes follows detailed tracing rules that this guide does not cover. The 2026 section 68 worksheet is described only in draft instructions. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

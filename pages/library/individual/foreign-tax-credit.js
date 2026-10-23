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
  id:            '91',
  title:         'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the foreign tax credit for individuals for tax years 2025 and 2026, based on Publication 514 (2025), the 2025 Instructions for Form 1116, the 2026 draft Instructions for Form 1116, the 2025 Instructions for Form 1040, the IRS foreign tax credit pages, and the IRS list of U.S. income tax treaties. It does not decide whether a particular foreign tax is creditable, and it does not cover businesses, controlled foreign corporations, or state tax',
  persona:       ['U.S. residents who pay Taiwan tax on interest, dividends, or rent', 'People with foreign wages who do not use the exclusion', 'Investors with foreign tax shown on Form 1099-DIV or 1099-INT', 'Anyone who sold property abroad and paid foreign tax'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Confirm that each foreign tax is an income tax imposed on you, decide each year whether to credit or deduct all qualified foreign taxes, and figure the credit limit on Form 1116 by income category, unless you qualify to claim the credit directly on Schedule 3.',
  sources: [
    { label: 'IRS — Publication 514 (2025), Foreign Tax Credit for Individuals', url: 'https://www.irs.gov/publications/p514' },
    { label: 'IRS — 2025 Instructions for Form 1116', url: 'https://www.irs.gov/pub/irs-pdf/i1116.pdf' },
    { label: 'IRS — 2026 Instructions for Form 1116 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i1116--dft.pdf' },
    { label: 'IRS — Foreign taxes that qualify for the foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-taxes-that-qualify-for-the-foreign-tax-credit' },
    { label: 'IRS — Foreign tax credit: how to figure the credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit-how-to-figure-the-credit' },
    { label: 'IRS — 2025 Instructions for Form 1040', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — United States income tax treaties A to Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: 'Do all Taiwan taxes qualify for the credit?',
    a: 'No. Generally only a foreign income tax (or a tax in lieu of an income tax) that is imposed on you and is your legal and actual liability qualifies. Publication 514 says other taxes, such as foreign real and personal property taxes, do not qualify. Whether a specific Taiwan tax qualifies depends on the tax, so check it before claiming a credit.',
  },
  {
    q: 'Should I take the credit or the deduction?',
    a: 'Publication 514 suggests figuring your tax both ways. The credit reduces your U.S. tax dollar for dollar, up to a limit; the deduction reduces taxable income and requires itemizing. Each year the choice applies to all of your qualified foreign taxes.',
  },
  {
    q: 'When can I skip Form 1116?',
    a: 'Under the 2025 Form 1040 instructions, you can claim the credit directly on Schedule 3, line 1, if all of your foreign income was interest and dividends reported on a 1099 or Schedule K-3, your foreign taxes were not more than $300 ($600 if married filing jointly), and the other listed conditions are met. If you use this exception, you cannot carry unused foreign tax to another year.',
  },
  {
    q: 'What happens to foreign tax I cannot use this year?',
    a: 'Foreign tax above the limit for a category can generally be carried back 1 year and then forward 10 years, applied to the earliest year first, and only up to the unused limit in the same category in each of those years. Once an amount is used in a carryback or carryover year, it cannot be used again, so the same tax is never credited twice.',
  },
  {
    q: 'Can I take the credit on income I excluded with the foreign earned income exclusion?',
    a: 'No. You cannot take a credit or deduction for foreign taxes on income you excluded. If only part of your income is excluded, the taxes allocable to the excluded part are not creditable.',
  },
  {
    q: 'Does the foreign tax credit reduce the net investment income tax?',
    a: 'No. The IRS says credits allowed only against the regular income tax, such as the foreign tax credit, cannot reduce the 3.8% net investment income tax.',
  },
]

const RELATED = [
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Why foreign income is reported in the first place.',
  },
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: 'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules',
    desc:  'The other main way to avoid double tax on foreign wages.',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Foreign rental property and U.S. taxes',
    desc:  'Reporting rent from property abroad.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'A tax the foreign tax credit cannot reduce.',
  },
]

export default function ForeignTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income | AskLinTax',
      description: 'The foreign tax credit explained: which foreign taxes qualify, credit vs. deduction, the Form 1116 limit and income categories, carryovers, the $300/$600 exception, rent and investment income, and the FEIE and NIIT.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you are a U.S. citizen or resident, you report your worldwide income, so income from Taiwan or another country can be taxed by both countries. The <strong>foreign tax credit</strong> lets you reduce your U.S. tax by qualifying foreign <strong>income</strong> taxes you paid, up to a limit. You usually figure it on <strong>Form 1116</strong>. Instead of the credit, you can choose to deduct the taxes as an itemized deduction.
        </p>

        <h2>Which foreign taxes qualify</h2>
        <p>
          The IRS lists four tests. Generally, the tax must be:
        </p>
        <ul>
          <li><strong>imposed on you</strong> — for example, tax withheld from your wages or interest;</li>
          <li><strong>paid or accrued</strong> by you;</li>
          <li>your <strong>legal and actual</strong> foreign tax liability — not an amount you could get refunded, and not necessarily the amount withheld;</li>
          <li>an <strong>income tax</strong>, or a tax in lieu of an income tax.</li>
        </ul>
        <p>
          Publication 514 says other taxes, such as <strong>foreign real and personal property taxes, do not qualify</strong>, although they may be deductible if they are expenses of a business or of producing income (such as rental property). Do not assume every tax you pay in Taiwan is creditable — check what kind of tax it is.
        </p>

        <h2>Credit or deduction</h2>
        <ul>
          <li><strong>Credit:</strong> reduces your U.S. tax directly, subject to the limit below.</li>
          <li><strong>Deduction:</strong> an itemized deduction on Schedule A, so it helps only if you itemize.</li>
          <li><strong>All or nothing each year:</strong> if you credit any qualified foreign taxes for a year, you must credit all of them; if you deduct, you deduct all of them. You can make a different choice in another year.</li>
        </ul>

        <h2>Foreign-source income and the limit</h2>
        <p>
          The credit cannot be more than your <strong>U.S. tax multiplied by a fraction</strong>: your taxable income from sources outside the United States divided by your total taxable income. The limit is figured separately for each <strong>income category</strong>.
        </p>
        <ArticleTable
          head={['Income', 'Source generally determined by', 'Usual category']}
          rows={[
            ['Wages', 'Where the services were performed', 'General'],
            ['Interest', 'Residence of the payer', 'Passive'],
            ['Dividends', 'Whether the corporation is U.S. or foreign', 'Passive'],
            ['Rents', 'Location of the property', 'Passive, unless active business rents'],
            ['Gain on selling real property', 'Location of the property', 'Passive (investment property)'],
            ['Gain on selling personal property, such as stock', 'The seller\'s tax home, with exceptions', 'Depends on the facts'],
          ]}
        />
        <p>
          Two points matter for many readers. First, because gain on selling stock is generally sourced by your tax home, a U.S. resident's gain on foreign shares may be U.S.-source income even if the other country taxes it — which can limit the credit. Publication 514 describes exceptions. Second, passive income that is taxed abroad at more than the highest U.S. rate can be treated as high-taxed income and moved out of the passive category.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Lin</strong> is a single U.S. resident. Lin's taxable income is $80,000, and Lin's U.S. income tax before credits is $12,000. Of the taxable income, $10,000 is foreign-source passive income — Taiwan interest and net rent, after allocable expenses — on which Lin paid $2,000 of Taiwan income tax that meets the four tests.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Limit: $12,000 × ($10,000 ÷ $80,000)', '$1,500'],
            ['Qualified Taiwan income tax paid', '$2,000'],
            ['Foreign tax credit (the smaller amount)', '$1,500'],
            ['Unused 2025 foreign tax (may be carried back or forward if unused limit is available)', '$500'],
          ]}
        />
        <p>
          The example is simplified: on Form 1116, foreign-source taxable income is figured after allocating and apportioning deductions, and the actual return may involve more than one category. The Taiwan tax here is 20% of the income, below the highest U.S. rate, so the income stays in the passive category rather than being treated as high-taxed.
        </p>
        <p>
          <strong>What happens to the $500.</strong> This unused foreign tax arises in 2025. Publication 514 and the 2025 Form 1116 instructions let you treat it as though it were paid in other years, but only up to the <strong>excess limit</strong> (the amount by which the limit is more than the qualified foreign taxes for that year) in the <strong>same category</strong> — here, passive — and in this order:
        </p>
        <ul>
          <li><strong>2024 first</strong> (the 1 carryback year), up to Lin's unused passive-category limit for 2024, claimed by amending 2024 with Form 1040-X and a revised Form 1116;</li>
          <li><strong>then 2026 through 2035</strong>, earliest year first — only the part not absorbed in 2024 carries forward, and each year can absorb only its own unused passive-category limit;</li>
          <li><strong>once absorbed, it is gone</strong> — the same tax cannot be credited in more than one year, and the carryback-carryforward period cannot be extended.</li>
        </ul>
        <p>
          <strong>Not guaranteed.</strong> If Lin has no unused passive-category limit in those years, some or all of the $500 may never be used and expires after 2035.
        </p>
        <p>
          <strong>Years in which you deduct instead of credit:</strong>
        </p>
        <ul>
          <li>If Lin had chosen to deduct foreign taxes for 2025, there would be no carryover from 2025.</li>
          <li>In a carryover year in which Lin deducts foreign taxes, the carryover cannot be deducted or credited. Lin must still figure that year's limit as if crediting, and the carryover is treated as used up to that year's excess limit — reducing what remains for later years even though Lin gets no benefit from it that year.</li>
          <li>A carryover can be credited only in a year in which Lin also credits that year's foreign taxes.</li>
        </ul>
        <p>
          No carryback or carryover is allowed to or from a year in which you use the $300/$600 Schedule 3 election.
        </p>

        <h2>When you don't need Form 1116</h2>
        <p>
          Under the 2025 Form 1040 instructions, you can claim the credit directly on <strong>Schedule 3, line 1</strong>, without Form 1116, if all of these apply:
        </p>
        <ul>
          <li>all of your foreign-source gross income was interest and dividends, and that income and the foreign tax were reported to you on Form 1099-INT, Form 1099-DIV, or Schedule K-3;</li>
          <li>your total foreign taxes were not more than <strong>$300</strong> (<strong>$600</strong> if married filing jointly);</li>
          <li>you held the stock or bonds for at least 16 days and were not obligated to pay the amounts to someone else;</li>
          <li>you are not filing Form 4563 or excluding income from sources within Puerto Rico; and</li>
          <li>the foreign taxes were legally owed, not eligible for a refund or reduced treaty rate, and paid to countries the United States recognizes and that do not support terrorism.</li>
        </ul>

        <h2>Rental and investment income from abroad</h2>
        <ul>
          <li><strong>Foreign rent:</strong> report all rent and expenses in U.S. dollars; foreign income tax on the rent may be creditable in the passive category. See <a href="/library/rental/foreign-rental-property/">Foreign rental property and U.S. taxes</a>.</li>
          <li><strong>Foreign interest and dividends:</strong> foreign tax withheld may be creditable; tax shown on Form 1099-INT box 6 or Form 1099-DIV box 7 can qualify for the Schedule 3 exception. See <a href="/library/investment/form-1099-div-1099-int-boxes/">Form 1099-DIV and 1099-INT explained box by box</a>.</li>
          <li><strong>Sale of foreign property:</strong> see <a href="/library/investment/sold-foreign-property-transfer/">I sold property overseas and moved the money to the U.S.</a></li>
        </ul>

        <h2>The exclusion and the NIIT</h2>
        <ul>
          <li><strong>Foreign earned income exclusion:</strong> you cannot take a credit or deduction for foreign taxes on income you exclude. See <a href="/library/individual/foreign-earned-income-exclusion/">the FEIE guide</a>.</li>
          <li><strong>Net investment income tax:</strong> the foreign tax credit cannot reduce the 3.8% NIIT. See <a href="/library/investment/net-investment-income-tax/">the NIIT guide</a>.</li>
        </ul>

        <h2>Taiwan: no income tax treaty on the IRS list</h2>
        <p>
          As of this guide's October 2026 review, Taiwan does not appear on the IRS list of U.S. income tax treaties. We could not confirm from the U.S. government sources available for this review whether any U.S.–Taiwan double tax relief legislation has been enacted, so this guide does not rely on any. For now, double tax relief for U.S. taxpayers generally comes from U.S. rules such as the foreign tax credit and the foreign earned income exclusion.
        </p>

        <h2>2025 and 2026 notes</h2>
        <ul>
          <li><strong>2025 (final instructions):</strong> P.L. 119-21 added a $6,000 deduction for people 65 or older for 2025 through 2028; the Form 1116 instructions say it must be removed from taxable income when figuring the credit limit.</li>
          <li><strong>2026 (draft instructions):</strong> the draft Form 1116 instructions say P.L. 119-21's limit on itemized deductions may reduce the deductions used on Form 1116. Check the final 2026 instructions before filing.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Crediting property or other non-income taxes.</strong></li>
          <li><strong>Claiming the amount withheld</strong> when part of it is refundable.</li>
          <li><strong>Crediting some foreign taxes and deducting others</strong> in the same year.</li>
          <li><strong>Ignoring the limit and categories</strong>, or losing track of carryovers.</li>
          <li><strong>Claiming a credit on income excluded</strong> with the FEIE.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Whether a particular foreign tax is creditable, sourcing of gains on foreign stock, allocation of deductions, and foreign taxes on business or controlled foreign corporation income can be complex. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

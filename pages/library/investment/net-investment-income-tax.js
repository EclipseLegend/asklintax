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
  id:            '86',
  title:         'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the 3.8% net investment income tax for individuals for tax years 2025 and 2026, based on section 1411, IRS Topic no. 559, the IRS questions and answers on the NIIT, the 2025 Instructions for Form 8960, and the 2026 draft Instructions for Form 8960 (posted October 15, 2026). Estates and trusts, controlled foreign corporations and PFICs, the trader and real estate professional rules, and state tax are not covered in detail',
  persona:       ['Higher-income investors', 'Landlords with rental income', 'People with a large one-time gain from selling stock, a business, or property', 'Couples whose income is near the thresholds'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'Compare your modified adjusted gross income (MAGI) with the threshold for your filing status. If it is higher and you have investment income, figure the 3.8% tax on Form 8960 and consider increasing withholding or estimated payments.',
  sources: [
    { label: 'IRS — Topic no. 559, Net investment income tax', url: 'https://www.irs.gov/taxtopics/tc559' },
    { label: 'IRS — Questions and answers on the net investment income tax', url: 'https://www.irs.gov/newsroom/questions-and-answers-on-the-net-investment-income-tax' },
    { label: 'IRS — 2025 Instructions for Form 8960', url: 'https://www.irs.gov/pub/irs-pdf/i8960.pdf' },
    { label: 'IRS — Form 8960, Net Investment Income Tax—Individuals, Estates, and Trusts (2025)', url: 'https://www.irs.gov/pub/irs-pdf/f8960.pdf' },
    { label: 'IRS — 2026 Instructions for Form 8960 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
    { label: 'IRS — Publication 505, Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/publications/p505' },
  ],
}

const FAQS = [
  {
    q: 'Is the 3.8% tax charged on all of my investment income?',
    a: 'Not necessarily. The tax is 3.8% of the smaller of your net investment income or the amount by which your MAGI exceeds your threshold. If only part of your MAGI is over the threshold, only that part is taxed, even if your investment income is larger.',
  },
  {
    q: 'Are the NIIT thresholds adjusted for inflation?',
    a: 'No. The IRS says the threshold amounts are not indexed for inflation. They are the same for 2025 and 2026: $250,000 for married filing jointly or qualifying surviving spouse, $125,000 for married filing separately, and $200,000 for single or head of household.',
  },
  {
    q: 'Do IRA or 401(k) withdrawals count as net investment income?',
    a: 'No. Distributions from qualified plans and IRAs (those described in sections 401(a), 403(a), 403(b), 408, 408A, and 457(b)) are not net investment income. But taxable distributions are part of your adjusted gross income, so they can raise your MAGI and push other investment income over the threshold.',
  },
  {
    q: 'I sold my home. Will I owe the NIIT?',
    a: 'Gain you exclude under the main-home exclusion is not subject to the NIIT. Only the taxable part of the gain counts as net investment income, and the tax applies only if your MAGI is also over the threshold.',
  },
  {
    q: 'Does every rental property sale trigger the NIIT?',
    a: 'No. Rental income and gains are generally net investment income unless they come from a trade or business that is not a passive activity (and is not trading in financial instruments or commodities). Even when the gain is investment income, the tax applies only if your MAGI exceeds your threshold.',
  },
  {
    q: 'Can the foreign tax credit reduce the NIIT?',
    a: 'The IRS Q&A says credits that are allowed only against the regular income tax, such as the foreign tax credit, cannot reduce the NIIT.',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'The capital gain rates that apply before the NIIT.',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Selling a Rental Property: Depreciation Recapture and the 25% Rate',
    desc:  'How a rental sale is taxed, including the NIIT.',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: 'I sold my house — do I have to pay tax on the profit?',
    desc:  'The main-home exclusion, which also protects excluded gain from the NIIT.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Paying the NIIT during the year to avoid penalties.',
  },
]

export default function NetInvestmentIncomeTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026 | AskLinTax',
      description: 'The 3.8% net investment income tax explained: MAGI thresholds by filing status, what income is included or excluded, home sales, rental income, retirement distributions, and Form 8960.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>net investment income tax (NIIT)</strong> is a separate <strong>3.8%</strong> federal tax on investment income for people with higher incomes. It applies only when your <strong>modified adjusted gross income (MAGI)</strong> is over a threshold for your filing status <strong>and</strong> you have net investment income. You figure it on <strong>Form 8960</strong> and pay it with your Form 1040.
        </p>

        <h2>How the 3.8% is calculated</h2>
        <p>
          For an individual, the NIIT is <strong>3.8% of the smaller of</strong>:
        </p>
        <ul>
          <li>your <strong>net investment income</strong>, or</li>
          <li>the amount by which your <strong>MAGI exceeds</strong> your threshold.</li>
        </ul>
        <p>
          MAGI is generally your adjusted gross income (AGI). It is higher than AGI only if you exclude foreign earned income (or have certain foreign corporation investments), in which case special rules add those amounts back.
        </p>

        <h2>Thresholds for 2025 and 2026</h2>
        <ArticleTable
          head={['Filing status', 'MAGI threshold (2025 and 2026)']}
          rows={[
            ['Married filing jointly', '$250,000'],
            ['Qualifying surviving spouse', '$250,000'],
            ['Married filing separately', '$125,000'],
            ['Single', '$200,000'],
            ['Head of household', '$200,000'],
          ]}
        />
        <p>
          These amounts are set by law and, as the IRS notes, are not indexed for inflation. The 2025 Instructions for Form 8960 and the 2026 draft instructions list the same amounts.
        </p>

        <h2>What counts as net investment income</h2>
        <ArticleTable
          head={['Generally included', 'Generally excluded']}
          rows={[
            ['Interest and dividends', 'Wages and self-employment income'],
            ['Capital gains from stocks, bonds, and mutual funds, and capital gain distributions', 'Operating income from a business that is not a passive activity'],
            ['Rental and royalty income (unless from a non-passive trade or business)', 'Social Security benefits and unemployment compensation'],
            ['Gain from selling investment real estate, including a second home', 'Tax-exempt interest, such as municipal bond interest'],
            ['Non-qualified annuities', 'Distributions from qualified plans and IRAs (sections 401(a), 403(a), 403(b), 408, 408A, 457(b))'],
            ['Income from passive businesses and from trading financial instruments or commodities', 'Home-sale gain excluded under the main-home exclusion'],
          ]}
        />
        <p>
          Net investment income is gross investment income minus deductions properly allocable to it, such as investment interest. Investment advisory and brokerage fees are miscellaneous itemized deductions, which are not deductible, so they cannot reduce net investment income either.
        </p>

        <h2>Capital gains, rental income, and home sales</h2>
        <ul>
          <li><strong>Capital gains:</strong> gains from selling stocks, bonds, and funds are investment income to the extent they are not offset by capital losses.</li>
          <li><strong>Rental income:</strong> rents are generally investment income unless they come from a trade or business that is not a passive activity for you. Whether a rental is passive depends on facts such as your participation, so a rental sale does not automatically trigger the NIIT.</li>
          <li><strong>Home sales:</strong> gain you exclude under the main-home exclusion (up to $250,000, or $500,000 for many married couples) is not subject to the NIIT. Any taxable gain above the exclusion is investment income.</li>
        </ul>

        <h2>Retirement distributions and MAGI</h2>
        <p>
          IRA and retirement plan distributions are <strong>not</strong> net investment income. However, taxable distributions are included in AGI, so they can increase your MAGI. A large IRA withdrawal can therefore cause your other investment income to become subject to the NIIT.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Sam, single, 2025:</strong> wages of $180,000, interest and dividends of $15,000, and a $40,000 long-term gain from selling stock. Sam has no adjustments, so MAGI equals AGI.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['MAGI ($180,000 + $15,000 + $40,000)', '$235,000'],
            ['Net investment income ($15,000 + $40,000)', '$55,000'],
            ['MAGI over the $200,000 threshold', '$35,000'],
            ['NIIT: 3.8% × the smaller amount ($35,000)', '$1,330'],
          ]}
        />
        <p>
          <strong>Rosa and Tom, married filing jointly, 2026:</strong> wages of $190,000 and $40,000 of net investment income give a MAGI of $230,000, below the $250,000 threshold, so no NIIT. If they also take a $50,000 taxable IRA distribution, their MAGI becomes $280,000. Their net investment income is still $40,000, because the IRA distribution is not investment income, and their MAGI is $30,000 over the threshold. Their NIIT is 3.8% × $30,000 = <strong>$1,140</strong>.
        </p>
        <p>
          <strong>Home sale (from the IRS Q&amp;A):</strong> a married couple filing jointly sells their main home for a $600,000 gain and excludes $500,000, leaving $100,000 of taxable gain. With $125,000 of other investment income, their net investment income is $225,000. Their MAGI of $300,000 is $50,000 over the threshold, so their NIIT is 3.8% × $50,000 = $1,900.
        </p>

        <h2>Form 8960 and paying the tax</h2>
        <ul>
          <li>Figure the tax on <strong>Form 8960</strong> and attach it to your Form 1040. The NIIT is reported on Schedule 2 (Form 1040).</li>
          <li>The NIIT is subject to the estimated tax rules. If you expect to owe it, consider increasing your withholding or making <a href="/library/small-business/quarterly-taxes/">estimated tax payments</a> to avoid an underpayment penalty.</li>
          <li><strong>Married to a nonresident:</strong> if you are a U.S. citizen or resident married to a nonresident alien, you are treated as married filing separately for the NIIT unless you make a special election. Nonresident aliens themselves are not subject to the NIIT.</li>
        </ul>

        <h2>Changes for 2026</h2>
        <p>
          The 2026 draft Instructions for Form 8960 say that, under section 70111 of P.L. 119-21 (enacted July 4, 2025), certain itemized deductions — including investment interest — are no longer exempt from the section 68 overall limitation starting in 2026. The draft adds a new worksheet for lines 9 and 10 of Form 8960 and says the limitation generally affects people in the highest tax bracket. Because these instructions are still a draft, check the final 2026 Form 8960 instructions before filing. See <a href="/library/investment/investment-interest-expense/">investment interest expense</a>.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Applying 3.8% to all investment income</strong> instead of to the smaller of the two amounts.</li>
          <li><strong>Using an inflation-adjusted threshold</strong> — the thresholds do not change each year.</li>
          <li><strong>Forgetting the qualifying surviving spouse threshold</strong> of $250,000.</li>
          <li><strong>Counting IRA distributions as investment income</strong>, or forgetting that they raise MAGI.</li>
          <li><strong>Assuming every rental sale is subject to the NIIT</strong> without checking whether the activity is passive and whether MAGI exceeds the threshold.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Complex situations</div>
          <p>Whether rental or business income is passive, the real estate professional and trader rules, controlled foreign corporations and PFICs, and estates and trusts all have special NIIT rules that this guide does not cover. State tax treatment is also not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '89',
  title:         'Selling Gold, Silver, Coins, or Art: The 28% Collectibles Rate',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal income tax on selling collectibles held outside retirement accounts for tax years 2025 and 2026, based on Publication 550 (2025), Publication 544, the 2025 Instructions for Schedule D, the 2025 Instructions for Form 8949, and the Instructions for Form 1099-DIV. Exchange-traded products that hold metals, collectibles in IRAs and retirement plans, dealers and businesses, NFTs, and state tax are not covered',
  persona:       ['People selling gold or silver coins or bullion', 'Collectors of art, stamps, antiques, or wine', 'Heirs selling an inherited collection', 'Anyone deciding whether a loss on a collectible is deductible'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'Find your basis and holding period for each item. Report the sale on Form 8949 Part I or II with code C, carry it to Schedule D, and if you have long-term collectibles gain, complete the 28% Rate Gain Worksheet.',
  sources: [
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Publication 544, Sales and Other Dispositions of Assets', url: 'https://www.irs.gov/publications/p544' },
    { label: 'IRS — 2025 Instructions for Schedule D (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — Instructions for Form 1099-DIV', url: 'https://www.irs.gov/pub/irs-pdf/i1099div.pdf' },
    { label: 'IRS — Topic no. 409, Capital gains and losses', url: 'https://www.irs.gov/taxtopics/tc409' },
  ],
}

const FAQS = [
  {
    q: 'Is gold taxed at a flat 28%?',
    a: 'No. 28% is a maximum rate for long-term collectibles gain. Publication 550 explains that if you would otherwise be taxed at a lower rate, the 28% rate does not apply. A collectible held one year or less is taxed at ordinary rates.',
  },
  {
    q: 'What counts as a collectible?',
    a: 'The Schedule D instructions list works of art, rugs, antiques, metals (such as gold, silver, and platinum bullion), gems, stamps, coins, alcoholic beverages, and certain other tangible property.',
  },
  {
    q: 'I sold my old jewelry for less than I paid. Can I deduct the loss?',
    a: 'Not if you held it for personal use. A loss on personal-use property is not deductible, although a gain on personal-use property is taxable. A loss on a collectible held for investment can be a deductible capital loss.',
  },
  {
    q: 'Can I skip Form 8949 for a collectible sale?',
    a: 'No. The exception that lets you report totals directly on Schedule D does not apply to collectibles. Report the sale on Form 8949 and enter code C in column (f).',
  },
  {
    q: 'How are gold or silver ETFs taxed?',
    a: 'This guide does not cover them. Exchange-traded products that hold metals are structured in different ways, and their tax treatment depends on that structure. Check the fund\'s tax information and the forms it sends you, and get professional advice.',
  },
  {
    q: 'My mutual fund reported an amount in box 2d of Form 1099-DIV. What is it?',
    a: 'Box 2d shows collectibles (28%) gain included in the fund\'s capital gain distributions. Include it on line 4 of the 28% Rate Gain Worksheet in the Schedule D instructions.',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'Holding periods and the 0%, 15%, and 20% rates.',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: 'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
    desc:  'Gift and inheritance basis rules and Form 8949 boxes.',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Crypto taxes explained: when is crypto taxable?',
    desc:  'How NFTs can be treated as collectibles.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'The separate 3.8% tax on investment gains at higher incomes.',
  },
]

export default function CollectiblesTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Selling Gold, Silver, Coins, or Art: The 28% Collectibles Rate | AskLinTax',
      description: 'How collectibles are taxed: gold, silver, coins, art, and jewelry, short-term vs. long-term gains, the 28% maximum rate, Form 8949 code C, the 28% Rate Gain Worksheet, personal-use losses, gifts, and inheritances.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Gold, silver, coins, art, and other <strong>collectibles</strong> are capital assets. If you sell one at a gain after holding it <strong>more than one year</strong>, the gain is <strong>collectibles gain</strong>, taxed at your regular rate but <strong>no more than 28%</strong>. It does not get the 0%, 15%, or 20% rates that apply to stocks. If you held it one year or less, the gain is short-term and taxed at ordinary rates.
        </p>

        <h2>What counts as a collectible</h2>
        <ul>
          <li>Works of art, rugs, and antiques</li>
          <li>Metals, such as gold, silver, and platinum bullion</li>
          <li>Gems, stamps, and coins</li>
          <li>Alcoholic beverages, such as collectible wine</li>
          <li>Certain other tangible property</li>
        </ul>
        <p>
          <strong>Jewelry</strong> is not listed separately, but the list includes gems and metals. Whether a piece of jewelry is a collectible held for investment or personal-use property matters for both the rate and whether a loss is deductible.
        </p>

        <h2>Short-term vs. long-term</h2>
        <ArticleTable
          head={['Held for', 'Type', 'How a gain is generally taxed']}
          rows={[
            ['One year or less', 'Short-term', 'At ordinary income tax rates'],
            ['More than one year', 'Long-term collectibles gain', 'At your regular rate, but no more than 28%'],
          ]}
        />
        <p>
          The 28% figure is a <strong>maximum</strong>, not a flat rate. Publication 550 gives the example of someone whose net capital gain is all from collectibles: if they are otherwise subject to a rate lower than 28%, the 28% rate does not apply. The separate 3.8% <a href="/library/investment/net-investment-income-tax/">net investment income tax</a> can also apply at higher incomes.
        </p>

        <h2>Reporting: Form 8949, Schedule D, and the 28% worksheet</h2>
        <ul>
          <li><strong>Form 8949:</strong> report each sale in Part I (short-term) or Part II (long-term). Enter <strong>code C</strong> in column (f) and -0- in column (g). If you did not receive a Form 1099-B, use box C or box F.</li>
          <li><strong>No Schedule D shortcut:</strong> the exception for reporting totals directly on Schedule D line 1a or 8a does not apply to collectibles.</li>
          <li><strong>28% Rate Gain Worksheet:</strong> if Schedule D line 17 is "Yes" and you have long-term collectibles gain or loss, complete the worksheet in the Schedule D instructions and enter the result on Schedule D, line 18.</li>
          <li><strong>Funds:</strong> collectibles gain from a mutual fund is shown in Form 1099-DIV box 2d (or Form 2439 box 1d for undistributed gain) and goes on the worksheet too.</li>
        </ul>

        <h2>Personal-use losses</h2>
        <p>
          Property you hold for personal use — such as jewelry you wear or a collection you keep for enjoyment — is a capital asset. A <strong>gain</strong> on it is taxable, but a <strong>loss is not deductible</strong>. A loss on a collectible you held for investment can be a deductible capital loss, subject to the usual <a href="/library/investment/capital-losses/">capital loss limits</a>.
        </p>

        <h2>Gifted and inherited collectibles</h2>
        <ul>
          <li><strong>Gift:</strong> your basis is generally the donor's adjusted basis. If the item was worth less than the donor's basis at the time of the gift, your basis for figuring a loss is that lower value. When you use the donor's basis, your holding period includes the donor's.</li>
          <li><strong>Inheritance:</strong> your basis is generally the fair market value on the date of death, and the gain or loss is treated as long-term however long you held it.</li>
        </ul>

        <h2>Examples (illustrative, 2025)</h2>
        <ArticleTable
          head={['Situation', 'Result']}
          rows={[
            ['Mia bought gold coins in 2019 for $12,000 as an investment and sells them in 2025 for $20,000', '$8,000 long-term collectibles gain, taxed at her regular rate but no more than 28%'],
            ['Jordan buys silver bars in March 2025 for $5,000 and sells them in November 2025 for $6,000', '$1,000 short-term gain, taxed at ordinary rates'],
            ['Pat inherits a painting worth $50,000 at the date of death (the parent paid $10,000) and sells it in 2025 for $55,000', 'Basis $50,000; $5,000 long-term collectibles gain'],
            ['Lin sells a ring she wore for years for $1,500; she paid $3,000', '$1,500 loss on personal-use property, not deductible'],
          ]}
        />

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Applying the 15% stock rate</strong> to long-term collectibles gain.</li>
          <li><strong>Assuming everything is taxed at 28%</strong>, even short-term gains or gains for people in lower brackets.</li>
          <li><strong>Deducting a loss</strong> on personal-use jewelry or collections.</li>
          <li><strong>Reporting totals directly on Schedule D</strong> instead of using Form 8949 with code C.</li>
          <li><strong>Using the original purchase price</strong> for an inherited item instead of its value at the date of death.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Not covered</div>
          <p>Exchange-traded products and trusts that hold metals, collectibles bought through an IRA or retirement plan, dealers and collectors in business, and NFTs have their own rules. State tax treatment is also not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '54',
  title:         'I sold my house — do I have to pay tax on the profit?',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the sale of a U.S. main home (principal residence) by individuals. Homes that were also rented or used for business, partial exclusions, and nonqualified-use periods need individual review; property abroad has its own guide',
  persona:       ['Homeowners who just sold or are about to sell', 'Married couples selling a home they lived in', 'People who received Form 1099-S at closing', 'Sellers who once rented out part of the home'],
  relatedJourney: ['Selling a home', 'Side income from property'],
  actionRequired: 'Figure your gain (amount realized minus adjusted basis), then check whether you meet the ownership and use tests for the main-home exclusion. Keep your closing statements and improvement records, and report the sale if you received Form 1099-S or if any gain is taxable.',
  sources: [
    { label: 'IRS — Publication 523, Selling Your Home', url: 'https://www.irs.gov/publications/p523' },
    { label: 'IRS — Topic no. 701, Sale of your home', url: 'https://www.irs.gov/taxtopics/tc701' },
    { label: 'IRS — Sale of residence: Real estate tax tips', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/sale-of-residence-real-estate-tax-tips' },
  ],
}

const FAQS = [
  {
    q: 'I sold my house for $700,000. Is all of that taxable?',
    a: 'No. Tax is based on your gain, not the selling price. Your gain is generally what you received from the sale minus your adjusted basis (what you paid plus certain costs and improvements). And if you qualify, the main-home exclusion can exclude up to $250,000 of that gain, or up to $500,000 on many joint returns.',
  },
  {
    q: 'I only lived there for a year and a half. Do I lose the exclusion completely?',
    a: 'Not necessarily. You generally need at least 2 years of ownership and 2 years of use as your main home during the 5 years before the sale for the full exclusion. A partial exclusion may be available in certain qualifying circumstances — check Publication 523 or have it reviewed.',
  },
  {
    q: 'I sold at a loss. Can I deduct it?',
    a: 'Generally no. A loss on the sale of your personal main home is not deductible.',
  },
  {
    q: 'I got a Form 1099-S but my whole gain is excluded. Do I report anything?',
    a: 'Possibly. If you received Form 1099-S, you may still need to report the sale on your return even if the gain is fully excludable. Publication 523 explains when and how.',
  },
  {
    q: 'I rented out the house for a few years before I sold it. Does that change anything?',
    a: 'It can change the calculation materially. Depreciation allowed or allowable for business or rental use after May 6, 1997 generally cannot be excluded under the main-home exclusion, and periods of rental use can affect how much gain qualifies. Have that sale reviewed.',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: 'Renting out a house or apartment — how is rental income taxed?',
    desc:  'If you rented the home before selling, depreciation matters.',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold property overseas and moved the money to the U.S. — what must I report?',
    desc:  'Selling a home or apartment abroad has its own guide.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Why an exclusion, a deduction, and a credit are different things.',
  },
]

export default function SellingYourHomePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Selling Your Home: Do You Pay Tax on the Profit? | AskLinTax',
      description: 'Sold your main home? How the gain is figured, the $250,000 / $500,000 home-sale exclusion and its 2-out-of-5-year tests, Form 1099-S, losses, and when prior rental use changes the answer.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Often, no — or not all of it. Tax on a home sale is based on your <strong>gain</strong>, not the selling price. And if the house was your <strong>main home</strong> and you meet the ownership and use tests, you can generally exclude up to <strong>$250,000</strong> of gain, or up to <strong>$500,000</strong> on many married-filing-jointly returns. Gain above the exclusion, or gain that does not qualify, is taxable.
        </p>
        <p>
          This guide covers an ordinary U.S. main home. For a home or apartment abroad, see <a href="/library/investment/sold-foreign-property-transfer/">I sold property overseas</a>.
        </p>

        <h2>Step 1: figure your gain</h2>
        <p>
          Your gain is generally the <strong>amount realized</strong> from the sale (the selling price minus selling costs) minus your <strong>adjusted basis</strong>. Adjusted basis generally starts with what you paid for the home and is increased by certain costs, such as improvements, and decreased by certain items, such as depreciation if you ever rented the home or used it for business. Publication 523 has the worksheets.
        </p>
        <ArticleTable
          head={['Illustrative figures', 'Amount']}
          rows={[
            ['Selling price', '$700,000'],
            ['Minus selling costs (illustrative)', '− $40,000'],
            ['Amount realized', '$660,000'],
            ['Minus adjusted basis (purchase price plus improvements)', '− $420,000'],
            ['Gain', '$240,000'],
          ]}
        />

        <h2>Step 2: check the main-home exclusion</h2>
        <p>
          You can generally exclude gain from the sale of your main home if, during the <strong>5-year period</strong> ending on the date of sale:
        </p>
        <ul>
          <li><strong>Ownership test:</strong> you owned the home for at least <strong>2 years</strong>, and</li>
          <li><strong>Use test:</strong> you lived in it as your main home for at least <strong>2 years</strong>.</li>
        </ul>
        <p>
          You generally cannot use the exclusion if you excluded gain from the sale of another home during the <strong>2 years</strong> before this sale.
        </p>

        <ArticleTable
          head={['Situation', 'Maximum exclusion (if all tests are met)']}
          rows={[
            ['Eligible individual', 'Up to $250,000 of gain'],
            ['Many eligible married couples filing jointly', 'Up to $500,000 of gain'],
            ['Tests not fully met', 'A partial exclusion may be available in certain qualifying circumstances'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Missing the 2-year test is not automatically zero</div>
          <p>If you do not meet the full 2-year tests, you may still qualify for a partial exclusion in certain circumstances described in Publication 523. Check those rules before assuming the whole gain is taxable.</p>
        </div>

        <h2>Losses are not deductible</h2>
        <p>
          If you sell your personal main home for less than your adjusted basis, the loss generally is <strong>not deductible</strong>.
        </p>

        <h2>Form 1099-S and reporting</h2>
        <p>
          The closing agent may send you <strong>Form 1099-S</strong>. If you receive one, you may need to report the sale on your return even when the entire gain is excludable. If part of the gain is taxable, it is reported on your return. Keep your closing statements and records of improvements to support your basis.
        </p>

        <h2>When the home was also a rental or business</h2>
        <p>
          Prior rental or business use can change the calculation materially. In particular, <strong>depreciation</strong> allowed or allowable for business or rental use after May 6, 1997 generally cannot simply be sheltered by the home-sale exclusion. Periods when the home was not used as your main home can also affect how much gain qualifies. These calculations are beyond this guide — have the sale reviewed. For how rental depreciation works, see <a href="/library/rental/rental-property-income/">Renting out a house or apartment</a>.
        </p>

        <h2>Example</h2>
        <p>
          Using the illustrative figures above, May and her spouse owned and lived in their home for six years and file jointly. Their gain is $240,000. They meet the ownership and use tests and have not excluded gain on another home in the past 2 years, so their gain is within the exclusion. If they received Form 1099-S, they check Publication 523 to see whether they still need to report the sale.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

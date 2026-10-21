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
  id:            '87',
  title:         'Selling a Rental Property: Depreciation Recapture and the 25% Rate',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal income tax treatment of selling U.S. residential rental real estate held more than one year, for tax years 2025 and 2026, based on Publications 544, 527, 550, and 551, the 2025 Instructions for Form 4797, and the 2025 Instructions for Schedule D. It does not cover installment sales, like-kind (section 1031) exchanges, passive activity loss rules, a former main home, correcting depreciation that was never claimed, property abroad, or state tax',
  persona:       ['Landlords selling a rental house or condo', 'People who inherited or kept a former rental', 'Owners comparing their sale price with what they paid', 'Anyone who received Form 1099-S for a rental sale'],
  relatedJourney: ['Airbnb & rental income', 'Side income from property'],
  actionRequired: 'Figure your adjusted basis (cost plus improvements, minus depreciation allowed or allowable), subtract it from the sale price less selling expenses, and report the sale on Form 4797. Carry the gain to Schedule D and use the Unrecaptured Section 1250 Gain Worksheet for the part due to depreciation.',
  sources: [
    { label: 'IRS — Publication 544, Sales and Other Dispositions of Assets', url: 'https://www.irs.gov/publications/p544' },
    { label: 'IRS — Publication 527, Residential Rental Property', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Publication 551, Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — 2025 Instructions for Form 4797, Sales of Business Property', url: 'https://www.irs.gov/pub/irs-pdf/i4797.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule D (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Topic no. 559, Net investment income tax', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: 'Is the gain on my rental property taxed at a flat 25%?',
    a: 'No. 25% is a maximum rate that applies only to the part of the gain that comes from depreciation (unrecaptured section 1250 gain). That part is taxed at your regular rate if it is lower, but not more than 25%. The rest of a long-term gain is generally taxed at the 0%, 15%, or 20% capital gain rates.',
  },
  {
    q: 'I never claimed depreciation. Does that help me?',
    a: 'Generally no. Your basis is reduced by the depreciation you deducted or could have deducted. If you did not deduct it, Publication 551 says to reduce basis by the full amount you could have taken. Have the sale and your depreciation history reviewed before you file.',
  },
  {
    q: 'What is the difference between depreciation recapture and unrecaptured section 1250 gain?',
    a: 'Section 1250 ordinary recapture taxes "additional depreciation" — depreciation above the straight-line amount — as ordinary income. Unrecaptured section 1250 gain is the remaining gain due to depreciation; it stays capital gain but has a 25% maximum rate. For residential rental property depreciated over 27.5 years under MACRS, the Form 4797 instructions say section 1250 ordinary recapture does not apply.',
  },
  {
    q: 'Do I report a rental sale on Form 8949?',
    a: 'Generally no. Rental real estate held more than one year is section 1231 property, which is reported on Form 4797. A net section 1231 gain then generally flows to Schedule D as long-term capital gain.',
  },
  {
    q: 'Will I owe the 3.8% net investment income tax?',
    a: 'Possibly. Gain from selling rental property is generally net investment income unless the property was held in a trade or business that is not a passive activity. The tax applies only if your modified adjusted gross income is also over your threshold.',
  },
  {
    q: 'What if I lived in the property before renting it?',
    a: 'The main-home exclusion may apply to part of the gain, but depreciation after May 6, 1997 generally cannot be excluded. See the home sale guide and Publication 523.',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: 'Renting out a house or apartment — how is rental income taxed?',
    desc:  'Depreciation and expenses while you own the rental.',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: 'I sold my house — do I have to pay tax on the profit?',
    desc:  'The main-home exclusion and how prior rental use affects it.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'When a rental gain is also subject to the 3.8% tax.',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'The 0%, 15%, and 20% rates for 2025 and 2026.',
  },
]

export default function SellingRentalPropertyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Selling a Rental Property: Depreciation Recapture and the 25% Rate | AskLinTax',
      description: 'Selling a rental property: adjusted basis, depreciation allowed or allowable, section 1231, section 1250 recapture vs. unrecaptured section 1250 gain, the 25% maximum rate, Form 4797, and the NIIT.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When you sell a rental property you have held for more than a year, your gain is the sale price minus selling expenses and your <strong>adjusted basis</strong>. Because depreciation lowers your basis, it increases your gain. The part of a long-term gain that comes from depreciation is <strong>unrecaptured section 1250 gain</strong>, taxed at your regular rate but <strong>no more than 25%</strong>. The rest is generally taxed at the 0%, 15%, or 20% capital gain rates. You report the sale on <strong>Form 4797</strong>.
        </p>

        <h2>Step 1: adjusted basis</h2>
        <p>
          Your basis generally starts with what you paid for the property, plus certain purchase costs and the cost of improvements. It is then reduced, most importantly by depreciation.
        </p>
        <ul>
          <li><strong>Land is not depreciated.</strong> Only the building and improvements are.</li>
          <li><strong>Allowed or allowable:</strong> you reduce basis by the depreciation you deducted or could have deducted under your method. If you took no depreciation, Publication 551 says to reduce basis by the full amount you could have taken.</li>
        </ul>

        <h2>Step 2: amount realized and gain</h2>
        <p>
          On Form 4797, the gross sales price includes money and any mortgage the buyer assumes, and your selling expenses (such as commissions) are added to your basis. Your gain is the sales price minus that total, after subtracting depreciation from basis.
        </p>

        <h2>Step 3: section 1231</h2>
        <p>
          Real property used as rental property is not a capital asset; when held more than one year it is <strong>section 1231 property</strong>. You combine all of your section 1231 gains and losses for the year:
        </p>
        <ul>
          <li>A <strong>net section 1231 loss</strong> is an ordinary loss.</li>
          <li>A <strong>net section 1231 gain</strong> is ordinary income up to your nonrecaptured section 1231 losses from the 5 preceding years. The rest is long-term capital gain.</li>
        </ul>

        <h2>Step 4: recapture vs. unrecaptured section 1250 gain</h2>
        <ArticleTable
          head={['', 'Section 1250 ordinary recapture', 'Unrecaptured section 1250 gain']}
          rows={[
            ['What it is', 'Additional depreciation: depreciation above the straight-line amount', 'The rest of the long-term gain that comes from depreciation'],
            ['How it is taxed', 'As ordinary income', 'As capital gain, at your regular rate but no more than 25%'],
            ['Typical U.S. residential rental (27.5-year MACRS, straight-line)', 'Does not apply, per the Form 4797 instructions', 'Generally equals the depreciation, limited to your net section 1231 gain'],
            ['Where it is figured', 'Form 4797, line 26', 'Unrecaptured Section 1250 Gain Worksheet, Schedule D line 19'],
          ]}
        />
        <p>
          Section 1250 ordinary recapture can apply if accelerated depreciation, a special depreciation allowance, or the commercial revitalization deduction was claimed, or if the property was held one year or less.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Lee</strong> bought a rental house in 2016 for $300,000 ($60,000 for the land and $240,000 for the building) and depreciated the building over 27.5 years on a straight-line basis, with no special depreciation allowance. Through the sale, the depreciation allowed or allowable totals $80,000. In 2025 Lee sells the house for $520,000 and pays $30,000 in selling expenses.
        </p>
        <p>
          <strong>Assumptions:</strong> based on fair market values at the sale, $104,000 of the price is allocated to the land and $416,000 to the building, and the selling expenses are split the same way ($6,000 and $24,000). Lee has no other section 1231 transactions, no nonrecaptured section 1231 losses from the 5 preceding years, and no collectibles losses or capital loss carryovers.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Whole property: $520,000 price − ($300,000 cost + $30,000 selling expenses − $80,000 depreciation)', '$270,000 total gain'],
            ['Building, Form 4797 Part III line 20 — gross sales price', '$416,000'],
            ['Building, line 21 — cost ($240,000) plus expense of sale ($24,000)', '$264,000'],
            ['Building, line 22 — depreciation allowed or allowable', '$80,000'],
            ['Building, line 23 — adjusted basis ($264,000 − $80,000)', '$184,000'],
            ['Building, line 24 — gain ($416,000 − $184,000)', '$232,000'],
            ['Building, line 26 — section 1250 ordinary recapture (27.5-year residential rental)', '$0'],
            ['Land, Form 4797 Part I — $104,000 − ($60,000 + $6,000)', '$38,000'],
            ['Net section 1231 gain ($232,000 + $38,000), carried to Schedule D as long-term capital gain', '$270,000'],
            ['Unrecaptured section 1250 gain (smaller of line 22, $80,000, or line 24, $232,000)', '$80,000'],
            ['Remaining long-term gain at the 0%, 15%, or 20% rates', '$190,000'],
          ]}
        />
        <p>
          The $80,000 is not taxed at a flat 25%: it is taxed at Lee's regular rates, capped at 25%. If Lee had nonrecaptured section 1231 losses from the 5 preceding years, part of the $270,000 would instead be ordinary income. If accelerated depreciation or a special depreciation allowance had been claimed, line 26 could show ordinary recapture.
        </p>

        <h2>Step 5: forms</h2>
        <ul>
          <li><strong>Form 4797:</strong> for a rental held more than one year, allocate the amount realized between the building and the land based on their fair market values. Report the building in Part III, with the gain carried to Part I, and the land in Part I. Property held one year or less goes in Part II.</li>
          <li><strong>Schedule D:</strong> a net section 1231 gain from Form 4797 is reported as long-term capital gain. Complete the Unrecaptured Section 1250 Gain Worksheet and enter the result on Schedule D, line 19.</li>
          <li><strong>Form 1099-S:</strong> the closing agent may report the sale to you and the IRS.</li>
        </ul>

        <h2>The net investment income tax</h2>
        <p>
          Gain from selling rental property is generally <strong>net investment income</strong> unless the property was held in a trade or business that is not a passive activity for you. Even then, the 3.8% tax applies only if your modified adjusted gross income exceeds your threshold ($200,000 single or head of household; $250,000 married filing jointly or qualifying surviving spouse; $125,000 married filing separately). See the <a href="/library/investment/net-investment-income-tax/">NIIT guide</a>.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Forgetting to subtract depreciation</strong> from basis, or subtracting only what was claimed when more was allowable.</li>
          <li><strong>Treating 25% as a flat rate</strong> on the whole gain.</li>
          <li><strong>Calling unrecaptured section 1250 gain "recapture"</strong> and taxing it as ordinary income.</li>
          <li><strong>Reporting the sale on Form 8949</strong> instead of Form 4797.</li>
          <li><strong>Depreciating the land.</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Have the sale reviewed</div>
          <p>Installment sales, like-kind exchanges, suspended passive losses, a property that was once your main home, depreciation that was never claimed, and property abroad all change the calculation and are not covered here. State tax treatment is also not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

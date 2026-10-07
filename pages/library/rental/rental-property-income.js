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
  id:            '56',
  title:         'Renting out a house or apartment — how is rental income taxed?',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who rent out a U.S. house or apartment long-term. Short-term rentals such as Airbnb, property you also use personally, and property abroad have their own rules and guides; passive-loss limits and depreciation calculations need individual review',
  persona:       ['First-time landlords', 'People renting out a former home', 'Owners of a condo or single-family rental', 'Families renting a unit to a tenant'],
  relatedJourney: ['Airbnb & rental income', 'Side income from property'],
  actionRequired: 'Report the rent you receive, deduct the ordinary and necessary rental expenses the rules allow, and begin depreciating the building (not the land) once it is ready and available for rent. Keep repair and improvement records separate.',
  sources: [
    { label: 'IRS — Publication 527 (2025), Residential Rental Property', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Instructions for Schedule E (Form 1040)', url: 'https://www.irs.gov/instructions/i1040se' },
    { label: 'IRS — Publication 946, How To Depreciate Property', url: 'https://www.irs.gov/publications/p946' },
  ],
}

const FAQS = [
  {
    q: 'Is the security deposit rental income?',
    a: 'It depends on what it is for. Publication 527 explains that a deposit you plan to return to the tenant is generally not income when you receive it, but a deposit used as the final month\'s rent, or one you keep, is treated as rent. Rental income is broader than monthly rent alone.',
  },
  {
    q: 'Can I deduct my mortgage payment?',
    a: 'Not the whole payment. The mortgage interest can be a rental expense, but the principal you pay down is not a current rental deduction. The cost of the building is recovered through depreciation instead.',
  },
  {
    q: 'I replaced the roof. Is that a repair I can deduct right away?',
    a: 'Not necessarily. Repairs and improvements are treated differently. Repairs that keep the property in good working condition are generally deductible, while improvements are generally added to basis and depreciated. Publication 527 explains the difference.',
  },
  {
    q: 'My rental shows a loss. Can I deduct all of it?',
    a: 'Maybe not this year. Rental activities are generally subject to the passive activity rules, which can limit how much of a loss you can deduct currently. Have a rental loss reviewed.',
  },
  {
    q: 'Does depreciation matter when I sell?',
    a: 'Yes. Depreciation reduces your basis in the property, which affects your gain when you sell. If the property was once your main home, see "I sold my house — do I have to pay tax on the profit?"',
  },
]

const RELATED = [
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb host tax guide: what to report and what to deduct',
    desc:  'Short-term rentals follow different rules — start here instead.',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: 'I sold my house — do I have to pay tax on the profit?',
    desc:  'Renting out a former home can change the home-sale exclusion.',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Foreign rental property and U.S. taxes',
    desc:  'Renting out an apartment in Taiwan or elsewhere abroad.',
  },
]

export default function RentalPropertyIncomePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Rental Property Income: How Is It Taxed? A Landlord Guide | AskLinTax',
      description: 'Renting out a house or apartment long-term: what counts as rental income, common deductible expenses, repairs vs. improvements, 27.5-year depreciation, Schedule E, and passive loss limits.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          In most cases, rent you receive from a house or apartment is <strong>taxable income that you must report</strong>. You can generally reduce it with the rental expenses the rules allow — such as mortgage interest, property taxes, insurance, repairs, and <strong>depreciation</strong> of the building. Individual owners commonly report this on <strong>Schedule E</strong>.
        </p>
        <p>
          This guide is about ordinary long-term rentals. For short-term rentals like Airbnb, see the <a href="/library/rental/airbnb-tax-guide/">Airbnb host tax guide</a> and <a href="/library/rental/14-day-rule/">the 14-day rule</a>. For property abroad, see <a href="/library/rental/foreign-rental-property/">Foreign rental property</a>.
        </p>

        <h2>What counts as rental income</h2>
        <p>
          Rental income is broader than monthly rent. Depending on the facts, it can also include items such as advance rent, certain security deposits you keep or apply to rent, and expenses a tenant pays on your behalf. Publication 527 lists what counts.
        </p>

        <h2>Common deductible expenses</h2>
        <p>
          Subject to the applicable rules, common rental expense categories can include:
        </p>
        <ArticleTable
          head={['Expense', 'Note']}
          rows={[
            ['Mortgage interest', 'The interest — not the principal you pay down'],
            ['Property taxes', 'For the rental property'],
            ['Insurance', 'Policies covering the rental'],
            ['Repairs and maintenance', 'Keeping the property in working condition; improvements are treated differently'],
            ['Management fees', 'Fees paid to a property manager'],
            ['Utilities you pay as owner', 'Not utilities the tenant pays'],
            ['Depreciation', 'Recovering the cost of the building over time'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Repairs vs. improvements</div>
          <p>A repair keeps the property in good working condition and is generally deductible. An improvement — something that betters, restores, or adapts the property — is generally added to basis and depreciated instead. They are not automatically treated the same.</p>
        </div>

        <h2>Depreciation: the expense people miss</h2>
        <ul>
          <li>A residential rental building is generally depreciated over <strong>27.5 years</strong> under the normal General Depreciation System (GDS) rules.</li>
          <li><strong>Land is not depreciated.</strong> Only the building (and certain improvements) can be depreciated, so the cost has to be split between land and building.</li>
          <li>Depreciation generally begins when the property is <strong>placed in service</strong> — when it is ready and available for rent.</li>
          <li>Depreciation reduces your basis, which affects your gain when you eventually sell.</li>
        </ul>
        <p>
          Publication 946 and Publication 527 explain how to figure it.
        </p>

        <h2>Where it is reported</h2>
        <p>
          Individual owners commonly report rental income and expenses on <strong>Schedule E</strong> (Form 1040). Some facts can change how a rental is reported, so check the Schedule E instructions if your situation is unusual.
        </p>

        <h2>Two rules that can change the answer</h2>
        <ul>
          <li><strong>Personal use.</strong> If you or your family also use the property, the rules for dividing expenses — and for how much you can deduct — can change.</li>
          <li><strong>Passive activity limits.</strong> Rental activities are generally passive, and the passive activity rules can limit how much of a rental loss you can deduct currently.</li>
        </ul>

        <h2>Example</h2>
        <p>
          Kevin rents out a condo for $2,000 a month. In 2025 he receives $24,000 in rent. He pays mortgage interest, property taxes, insurance, and a repair to a leaking faucet, and he depreciates the building portion of his cost over 27.5 years, starting when it was ready and available for rent. He reports the rent and these expenses on Schedule E. When he later replaces the roof, he treats it as an improvement and depreciates it rather than deducting it all at once.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

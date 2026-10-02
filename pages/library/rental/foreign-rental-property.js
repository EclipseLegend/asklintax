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
  id:            '26',
  title:         'Foreign rental property and U.S. taxes',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers residential property abroad that a U.S. citizen or resident alien owns directly and rents out. Property held through a foreign company, foreign property tax treatment, and passive-loss limits need professional review',
  persona:       ['Owners renting out an apartment in Taiwan or China', 'New immigrants who kept a rental property abroad', 'People who inherited a rental home overseas', 'Green card holders'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Report the rent on Schedule E of your 2025 return, converted to U.S. dollars, with the property\'s foreign address. Deduct ordinary rental expenses, depreciate the building (not the land) using the 30-year ADS schedule if you placed it in service after 2017, and consider a foreign tax credit for Taiwan income tax on the rent.',
  sources: [
    { label: 'IRS Publication 527 — Residential Rental Property', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS Publication 946 — How To Depreciate Property (ADS)', url: 'https://www.irs.gov/publications/p946' },
    { label: 'IRS — Instructions for Schedule E (Form 1040)', url: 'https://www.irs.gov/instructions/i1040se' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — Yearly average currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: 'My tenant in Taiwan pays rent into my Taiwan bank account. Do I still report it?',
    a: 'Yes. U.S. citizens and resident aliens are taxed on worldwide income, so rent from property abroad is reportable on your U.S. return wherever it is paid. The account it lands in may also count toward your FBAR and Form 8938 thresholds.',
  },
  {
    q: 'Which form do I use for foreign rental income?',
    a: 'Schedule E (Form 1040), the same schedule used for U.S. rental property. The Schedule E instructions say that for property located in a foreign country, you enter the city, province or state, country, and postal code as the address.',
  },
  {
    q: 'How fast can I depreciate a foreign rental?',
    a: 'Property used predominantly outside the United States must use the Alternative Depreciation System (ADS), which is straight-line. For residential rental property placed in service after 2017, the ADS recovery period is 30 years (40 years for property placed in service before 2018). Land is never depreciable.',
  },
  {
    q: 'Which exchange rate do I use for 12 months of rent?',
    a: 'The IRS\'s general rule is to use the exchange rate in effect when you receive or pay each amount. The IRS also publishes yearly average rates (31.167 Taiwan dollars per U.S. dollar for 2025) and generally accepts any posted exchange rate that you use consistently.',
  },
  {
    q: 'I pay income tax in Taiwan on the rent. Will I be taxed twice?',
    a: 'You may be able to claim a foreign tax credit on Form 1116 (or an itemized deduction) for qualifying foreign income taxes paid on income that is also taxed by the U.S. A credit usually helps more than a deduction.',
  },
  {
    q: 'Can I deduct the property tax I pay in Taiwan on the rental?',
    a: 'Taxes are one of the common rental expenses listed in Publication 527, but the treatment of foreign real property taxes has specific rules. Confirm with a tax professional before deducting them.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Owning, inheriting, and selling property abroad — and what is not reported on the FBAR or Form 8938.',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb host tax guide: what to report and what to deduct',
    desc:  'The rental expense and Schedule E basics apply to property abroad too.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'If rent is paid into an account abroad, check your FBAR and Form 8938 obligations.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Foreign rent is one part of a U.S. resident\'s worldwide income.',
  },
]

export default function ForeignRentalPropertyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Renting Out Property in Taiwan or Abroad: U.S. Tax Guide | AskLinTax',
      description: 'How U.S. residents report foreign rental income: Schedule E, deductible expenses, 30-year ADS depreciation, converting Taiwan dollars, and the foreign tax credit for 2025.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Foreign rent is U.S. taxable income for U.S. residents</h2>
        <p>
          If you are a U.S. citizen or U.S. tax resident and you rent out an apartment in Taiwan, China, or anywhere else, the rent is part of your <strong>worldwide income</strong>. You report it on your U.S. return even if it is paid in Taiwan dollars, deposited in a Taiwan bank, and also taxed in Taiwan.
        </p>
        <p>
          The good news: the same rental rules that apply to U.S. property generally apply here too. You report rent, deduct expenses, and depreciate the building — with a few international differences.
        </p>

        <ArticleTable
          head={['Topic', 'U.S. rental', 'Foreign rental']}
          rows={[
            ['Form', 'Schedule E', 'Schedule E (enter the foreign address)'],
            ['Currency', 'U.S. dollars', 'Convert every amount to U.S. dollars'],
            ['Depreciation of residential building', '27.5 years (GDS) in most cases', 'ADS required: 30 years if placed in service after 2017'],
            ['Tax paid to another country', 'Not applicable', 'Possible foreign tax credit (Form 1116)'],
            ['Bank account for rent', 'U.S. account', 'Foreign account may trigger FBAR / Form 8938'],
          ]}
        />

        <h2>Step 1: Report all rent</h2>
        <p>
          In most cases you must include in income all amounts you receive as rent. If your tenant pays an expense for you (for example, a repair bill), that payment is rental income too — and you can deduct it if it is a deductible rental expense. Report the property on <strong>Schedule E</strong>; for a property in a foreign country, enter the city, province or state, country, and postal code as the address.
        </p>

        <h2>Step 2: Deduct ordinary rental expenses</h2>
        <p>
          Publication 527 lists the most common rental expenses, including advertising, cleaning and maintenance, commissions, depreciation, insurance, legal and other professional fees, management fees, mortgage interest paid to banks, repairs, taxes, and utilities. Foreign property managers and agents' fees fall into the same categories. Keep receipts — in any currency — and convert them to U.S. dollars.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Property taxes paid abroad</div>
          <p>Taxes are a listed rental expense, but foreign real property taxes have their own rules, and they are not deductible as an itemized deduction on a personal home. Confirm the treatment of Taiwan property taxes on a rental with a tax professional.</p>
        </div>

        <h2>Step 3: Depreciate the building — on the ADS schedule</h2>
        <p>
          You can't depreciate land, so first split your cost between land and building. Then, because the property is used predominantly <strong>outside the United States</strong>, IRS Publication 946 requires the <strong>Alternative Depreciation System (ADS)</strong> — straight-line over a longer period than U.S. rentals:
        </p>
        <ArticleTable
          head={['Residential rental property placed in service', 'ADS recovery period']}
          rows={[
            ['After 2017', '30 years'],
            ['Before January 1, 2018', '40 years'],
          ]}
        />
        <p>
          Your depreciable basis is generally the building's cost in U.S. dollars when you bought it. If you lived in it before renting it out, the basis for depreciation is the lesser of its adjusted basis or its fair market value on the date you converted it to a rental — get help with that calculation.
        </p>

        <h2>Step 4: Convert to U.S. dollars</h2>
        <p>
          Every amount on your return must be in U.S. dollars. The IRS's general rule is to use the exchange rate in effect when you receive or pay each item. The IRS also publishes yearly average rates — for 2025 it lists <strong>31.167 Taiwan dollars per U.S. dollar</strong> — and it generally accepts any posted exchange rate that you use consistently.
        </p>
        <h3>A worked example</h3>
        <p>Grace, a U.S. resident, rents out her apartment in Taichung for NT$30,000 a month during 2025:</p>
        <ArticleTable
          head={['Item', 'Taiwan dollars', 'U.S. dollars (÷ 31.167)']}
          rows={[
            ['Rent (12 months)', 'NT$360,000', '≈ $11,551'],
            ['Management fee', 'NT$36,000', '≈ $1,155'],
            ['Repairs', 'NT$20,000', '≈ $642'],
          ]}
        />
        <p>
          She reports about $11,551 of rent on Schedule E, deducts her expenses and ADS depreciation, and then looks at whether a foreign tax credit applies for the Taiwan income tax she paid on the rent.
        </p>

        <h2>Step 5: Avoid double tax with the foreign tax credit</h2>
        <p>
          If you paid qualifying foreign <strong>income</strong> taxes on the rental income, you can generally choose either a <strong>foreign tax credit</strong> (Form 1116), which reduces your U.S. tax, or an itemized deduction, which reduces your taxable income. In most cases the credit is more valuable. Only income-type taxes qualify for the credit.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>Get help if the property is owned through a foreign company, you have a rental loss, you converted a former home into a rental, the property is jointly owned with relatives abroad, or you are selling. These situations involve rules this guide only touches on.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

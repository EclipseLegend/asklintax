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
  id:            '25',
  title:         'Foreign property: what U.S. taxpayers need to know',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers real estate abroad owned directly by U.S. citizens and resident aliens. Property held through a foreign company, foreign-currency mortgages, and the sale of a foreign main home need professional review',
  persona:       ['Owners of a home or apartment in Taiwan or China', 'People inheriting property from parents abroad', 'New immigrants who kept property in their home country', 'Green card holders'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Owning property abroad is not taxable by itself, and real estate held directly is not reported on the FBAR or Form 8938. What you must report is the income it produces (such as rent) and any gain when you sell. If you inherited it from a nonresident, check whether Form 3520 applies.',
  sources: [
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — Instructions for Schedule A (Form 1040), line 5b', url: 'https://www.irs.gov/instructions/i1040sca' },
    { label: 'IRS — Gifts from foreign person (bequests and Form 3520)', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Foreign currency and currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS Publication 523 — Selling Your Home', url: 'https://www.irs.gov/publications/p523' },
  ],
}

const FAQS = [
  {
    q: 'Do I have to tell the IRS that I own an apartment in Taiwan?',
    a: 'Not just for owning it. Foreign real estate held directly is not reported on the FBAR or on Form 8938. You report the income it produces (such as rent) and any gain when you sell it. If you hold it through a foreign company, the company may need to be reported instead.',
  },
  {
    q: 'Can I deduct the property tax I pay in Taiwan on my own home?',
    a: 'Not as a state and local real estate tax. The Schedule A instructions for 2025 say not to include foreign taxes you paid on real estate on line 5b. If the property is rented out, see our foreign rental property guide and confirm the treatment with a tax professional.',
  },
  {
    q: 'I inherited my parents\' house in Taiwan. Do I owe U.S. tax?',
    a: 'An inheritance is generally not income to you. But if bequests and gifts from your nonresident parents (or their foreign estate) total more than $100,000 for the year, you must report them on Form 3520. Any rent the property earns afterward, and any gain when you sell, is reportable.',
  },
  {
    q: 'I sold my apartment in Taiwan. How do I calculate the gain in dollars?',
    a: 'Amounts on your U.S. return must be in U.S. dollars, and the IRS\'s general rule is to translate each item at the exchange rate in effect when you pay or receive it. That usually means converting your purchase cost at the purchase-date rate and your sale price at the sale-date rate. Currency movements can make the U.S. gain very different from the gain in Taiwan dollars, so have a professional review a sale.',
  },
  {
    q: 'I paid tax in Taiwan when I sold. Will I be taxed twice?',
    a: 'Possibly not. If you paid qualifying foreign income taxes on income that is also taxed by the U.S., you may be able to claim a foreign tax credit (Form 1116) or deduct them. Not every foreign tax qualifies, so check the rules or ask a professional.',
  },
  {
    q: 'Does bringing the sale money to the U.S. create more tax?',
    a: 'No. Moving your own money is not income. While the proceeds sit in a foreign bank account, however, they count toward the FBAR $10,000 test and your Form 8938 threshold.',
  },
]

const RELATED = [
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Foreign rental property and U.S. taxes',
    desc:  'If you rent out property abroad: reporting rent, expenses, depreciation, and currency conversion.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Why a foreign bank account is reported but a foreign house usually is not.',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'Inherited property from a nonresident parent can trigger Form 3520.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Rent and gains from property abroad are part of a U.S. resident\'s worldwide income.',
  },
]

export default function ForeignPropertyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Owning Property in Taiwan or Abroad: U.S. Tax Rules | AskLinTax',
      description: 'Do you have to report a house in Taiwan to the IRS? Foreign real estate held directly is not on the FBAR or Form 8938, but rent, sale gains, and large inheritances have U.S. reporting rules.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Owning property abroad: what is and isn't reportable</h2>
        <p>
          Many families own a home or apartment in Taiwan, China, or elsewhere — bought before moving, or inherited from parents. For a U.S. citizen or resident, the key is to separate <strong>owning</strong> the property from the <strong>money it produces</strong>.
        </p>

        <ArticleTable
          head={['Event', 'U.S. treatment (citizens and resident aliens)']}
          rows={[
            ['Simply owning the property', 'Not a taxable event'],
            ['Property held directly — FBAR', 'Not reported'],
            ['Property held directly — Form 8938', 'Not reported'],
            ['Property held through a foreign company', 'The company interest may be a specified foreign financial asset on Form 8938; other forms may apply'],
            ['Renting it out', 'Rental income is reportable (worldwide income)'],
            ['Selling it', 'Any gain is reportable; foreign tax paid may be creditable'],
            ['Inheriting it from a nonresident', 'Generally not income; Form 3520 if gifts and bequests from related foreign persons exceed $100,000 in the year'],
          ]}
        />

        <h2>Why a house is treated differently from a bank account</h2>
        <p>
          The FBAR covers <strong>financial accounts</strong>, and Form 8938 covers <strong>specified foreign financial assets</strong>. Real estate you own directly is neither, so the IRS comparison of the two forms lists "foreign real estate held directly" as not reportable on either one.
        </p>
        <p>
          Two important exceptions:
        </p>
        <ul>
          <li><strong>Held through a foreign entity:</strong> if the property is owned by a foreign company you have an interest in, the company itself is a specified foreign financial asset for Form 8938, and its value includes the real estate. Foreign entities can also trigger other U.S. filings — get professional help.</li>
          <li><strong>The money around the property:</strong> rent collected into a Taiwan bank account, or sale proceeds held there, count toward the FBAR $10,000 test and your Form 8938 threshold.</li>
        </ul>

        <h2>Property taxes on a foreign home</h2>
        <p>
          The 2025 Schedule A instructions say <strong>not</strong> to include foreign taxes you paid on real estate as state and local real estate taxes. So property tax on your personal home in Taiwan is generally not deductible as an itemized deduction. If the property is a rental, expenses are handled on the rental side — see <a href="/library/rental/foreign-rental-property/">Foreign rental property and U.S. taxes</a>.
        </p>

        <h2>Inheriting property from parents abroad</h2>
        <p>
          A bequest is generally not income to the person who receives it. But inheritances from a nonresident alien or a foreign estate are part of the Form 3520 reporting rules: if gifts and bequests from related foreign persons total <strong>more than $100,000</strong> for the year, you must report them on Form 3520 Part IV. A house is reported at its fair market value. See <a href="/library/investment/form-3520/">Form 3520: reporting large foreign gifts</a>.
        </p>

        <h2>Selling foreign property</h2>
        <p>
          U.S. citizens and resident aliens are taxed on <strong>worldwide income</strong>, so a gain on selling property abroad is reportable on your U.S. return — even if the sale was taxed in the other country, and even if you never move the money to the U.S. For a step-by-step look at the sale and the later transfer, see <a href="/library/investment/sold-foreign-property-transfer/">I sold property overseas and moved the money to the U.S. — what must I report?</a>
        </p>
        <h3>Currency matters</h3>
        <p>
          Everything on a U.S. return must be in U.S. dollars, and the IRS's general rule is to translate each item at the exchange rate in effect when you pay or receive it. That usually means:
        </p>
        <ul>
          <li>Your <strong>cost</strong> (purchase price and improvements) at the exchange rates when you paid them</li>
          <li>Your <strong>sale price</strong> at the exchange rate when you sold</li>
        </ul>
        <p>
          If the Taiwan dollar moved a lot between purchase and sale, your gain in U.S. dollars can be very different from your gain in Taiwan dollars — larger or smaller. A foreign-currency mortgage adds another layer: repaying it can create a separate currency gain or loss. Both situations deserve professional review.
        </p>
        <h3>Foreign tax and the foreign tax credit</h3>
        <p>
          If you paid qualifying foreign <strong>income</strong> taxes on the gain, you may be able to claim a foreign tax credit on Form 1116 (or deduct them) so the same gain is not fully taxed twice.
        </p>
        <h3>Was it your main home?</h3>
        <p>
          IRS Publication 523 explains the exclusion of up to $250,000 of gain ($500,000 for most married couples filing jointly) when you sell a home that meets its ownership and use tests. If you lived in the foreign home as your main home, ask a tax professional whether your sale qualifies before you file.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Records to keep for property abroad</div>
          <p>Purchase contract and price, dates and costs of major improvements, inheritance documents and the property's value at the date of death, sale contract, closing costs, foreign taxes paid, and the exchange rates you used. Selling years later is much easier with these in one place.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

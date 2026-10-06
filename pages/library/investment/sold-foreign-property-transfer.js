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
  id:            '36',
  title:         'I sold property overseas and moved the money to the U.S. — what must I report?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens who sell real estate they own directly abroad and then move the proceeds to the U.S. Property held through a foreign company, foreign-currency mortgages, depreciation on former rentals, and treaty positions need professional review',
  persona:       ['People who sold a home or apartment in Taiwan or China', 'Heirs selling a parent\'s property abroad', 'New immigrants selling property left behind', 'Green card holders with real estate overseas'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Treat the sale and the transfer as two separate events. The sale is reported on your U.S. return for the year it happened, in U.S. dollars, whether or not you move the money. The transfer is not income, but any foreign account that held the proceeds counts for the FBAR and Form 8938.',
  sources: [
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 551 — Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS Publication 523 — Selling Your Home', url: 'https://www.irs.gov/publications/p523' },
    { label: 'IRS — Foreign currency and currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Gifts from foreign person (bequests and Form 3520)', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
  ],
}

const FAQS = [
  {
    q: 'If I leave the sale money in Taiwan, do I avoid U.S. tax on the gain?',
    a: 'No. U.S. citizens and resident aliens are taxed on worldwide income. A gain on selling property abroad is reportable for the year of the sale, whether the money stays abroad or comes to the U.S.',
  },
  {
    q: 'Does wiring the proceeds to the U.S. create more tax?',
    a: 'No. Moving your own money is not income. But while the proceeds sit in a foreign account, they count toward the FBAR $10,000 test and your Form 8938 threshold for that year.',
  },
  {
    q: 'I already paid tax in Taiwan on the sale. Will I be taxed twice?',
    a: 'Possibly not fully. If you paid qualifying foreign income taxes on the gain, you may be able to claim a foreign tax credit on Form 1116 (or deduct the taxes). Not every foreign tax qualifies — for example, some taxes on property transfers may not be income taxes — so have the specific tax reviewed.',
  },
  {
    q: 'I inherited the apartment from my mother. What is my basis?',
    a: 'Generally, the basis of inherited property is its fair market value on the date of death (or the alternate valuation date, if the estate uses it). Get a reliable valuation and keep it. If the inheritance came from a nonresident and was over $100,000 in that year, it should also have been reported on Form 3520 for the year you received it.',
  },
  {
    q: 'My parents gave me the apartment while they were alive. What is my basis?',
    a: 'Property received as a gift usually takes the donor\'s adjusted basis (with a special rule for figuring a loss when the value was below their basis). That is very different from an inheritance, and finding your parents\' original cost may take some work.',
  },
  {
    q: 'The apartment was my main home before I moved. Can I exclude the gain?',
    a: 'IRS Publication 523 explains the exclusion of up to $250,000 of gain ($500,000 for most married couples filing jointly) for a home that meets its ownership and use tests. Whether your foreign home and your timing qualify depends on your facts — have it reviewed before you file.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Owning, renting, inheriting, and selling property abroad — the overview.',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Foreign rental property and U.S. taxes',
    desc:  'If the property was rented out, depreciation and rental reporting affect the sale.',
  },
  {
    href: '/library/investment/transfer-own-money-to-us',
    cat:  'Investments & Foreign Accounts',
    title: 'I transferred my own money from overseas to the U.S. — is it taxable?',
    desc:  'Why the transfer and the source of the money are separate questions.',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gift vs. foreign inheritance: what U.S. taxpayers need to report',
    desc:  'Inherited vs. gifted property abroad: different basis, different reporting.',
  },
]

export default function SoldForeignPropertyTransferPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Sold Property Abroad and Moved the Money to the U.S.: What to Report | AskLinTax',
      description: 'Sold a home or apartment in Taiwan or abroad? The sale and the transfer are separate. How U.S. residents report the gain, figure basis in dollars, use the foreign tax credit, and handle FBAR and Form 8938.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          There are two events here, and they are taxed very differently:
        </p>
        <ul>
          <li><strong>The sale.</strong> As a U.S. citizen or resident, you report the sale of foreign property on your U.S. return for the year of the sale. If there is a gain, it may be taxable — even if you paid tax abroad and even if the money never leaves the other country.</li>
          <li><strong>The transfer.</strong> Moving the proceeds to your U.S. account is not income. It does not add tax, and it does not remove tax.</li>
        </ul>
        <p>
          The proceeds can also affect <strong>foreign account reporting</strong> while they sit in a bank account abroad.
        </p>

        <ArticleTable
          head={['Step', 'What to look at']}
          rows={[
            ['1. How did you acquire it?', 'Bought, inherited, or received as a gift — this sets your starting basis'],
            ['2. What did it cost, in U.S. dollars?', 'Purchase price and improvements, generally at the exchange rates when you paid them'],
            ['3. What did you receive, in U.S. dollars?', 'Sale price less selling costs, generally at the exchange rate when you sold'],
            ['4. Is there a gain?', 'Amount received minus basis — reported for the year of the sale'],
            ['5. Any exclusion or credit?', 'Main home exclusion (if you qualify) and the foreign tax credit for qualifying foreign income taxes'],
            ['6. Where did the money sit?', 'Foreign accounts holding proceeds count for the FBAR and Form 8938'],
          ]}
        />

        <h2>Basis: how you got the property matters</h2>
        <ul>
          <li><strong>You bought it:</strong> your basis generally starts with what you paid, plus major improvements.</li>
          <li><strong>You inherited it:</strong> your basis is generally the property's fair market value on the date of death (or the alternate valuation date, if chosen for the estate).</li>
          <li><strong>It was a gift during the giver's lifetime:</strong> your basis is generally the giver's adjusted basis, with a special rule for figuring a loss if the value at the time of the gift was lower than their basis.</li>
        </ul>
        <p>
          The difference can be large. An apartment your parents bought decades ago has a low basis if they <strong>gave</strong> it to you, but a basis near market value if you <strong>inherited</strong> it. See <a href="/library/investment/foreign-gift-vs-inheritance/">Foreign gift vs. foreign inheritance</a>.
        </p>

        <h2>Currency: your gain is measured in dollars</h2>
        <p>
          Amounts on your U.S. return must be in U.S. dollars, and the IRS's general rule is to translate each item at the exchange rate in effect when you pay or receive it. Because your cost and your sale price are often translated at rates years apart, your U.S. gain can be larger or smaller than your gain in the local currency.
        </p>
        <h3>Example</h3>
        <p>
          Wei, a U.S. resident, bought an apartment in Taipei for NT$10,000,000 when NT$1 = US$0.030 (cost: US$300,000). She sells it in 2025 for NT$12,000,000 when NT$1 = US$0.033 (sale: US$396,000), with no improvements and ignoring selling costs for simplicity. Her gain in Taiwan dollars is 20%, but her U.S.-dollar gain is US$96,000 — 32% — because the Taiwan dollar strengthened. If the exchange rate had moved the other way, the U.S. gain could be smaller than the Taiwan-dollar gain, or even a loss. (Illustrative rates, not actual historical rates.)
        </p>
        <p>
          A mortgage in a foreign currency can create a separate currency gain or loss when it is repaid. That deserves professional review.
        </p>

        <h2>Foreign tax and the foreign tax credit</h2>
        <p>
          If the other country taxed your gain and that tax is a qualifying foreign <strong>income</strong> tax, you may be able to claim a foreign tax credit (Form 1116) or take a deduction, so the same gain is not fully taxed twice. Some taxes connected with property — for example, transfer or registration taxes — may not qualify as income taxes. Have the specific foreign tax reviewed.
        </p>

        <h2>Was it your main home?</h2>
        <p>
          IRS Publication 523 explains the exclusion of up to $250,000 of gain ($500,000 for most married couples filing jointly) when you sell a home that meets its ownership and use tests. If you lived in the foreign property as your main home, ask a tax professional whether your sale qualifies. If the property was ever rented out, depreciation and rental history also affect the result — see <a href="/library/rental/foreign-rental-property/">Foreign rental property and U.S. taxes</a>.
        </p>

        <h2>The transfer: what it does and doesn't trigger</h2>
        <ul>
          <li><strong>Not income:</strong> wiring your own proceeds to the U.S. is not a taxable event. See <a href="/library/investment/transfer-own-money-to-us/">I transferred my own money from overseas to the U.S.</a></li>
          <li><strong>FBAR:</strong> if the proceeds (plus your other foreign accounts) exceeded $10,000 at any time during the year, an FBAR is required for that year — even if the account is now empty.</li>
          <li><strong>Form 8938:</strong> foreign accounts holding the proceeds count toward your specified foreign financial assets. Real estate held directly is not itself reported on the FBAR or Form 8938. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
          <li><strong>Not a gift:</strong> your own sale proceeds are not reported on Form 3520. But if the property was inherited from a nonresident, the inheritance may have required Form 3520 in the year you received it.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ There is no universal answer</div>
          <p>Two people selling similar apartments can owe very different U.S. tax depending on how they acquired the property, when they became U.S. residents, exchange rates, foreign taxes paid, and whether it was their home or a rental. Use this guide to organize the facts, not to skip the calculation.</p>
        </div>

        <h2>Records to keep</h2>
        <ul>
          <li>Purchase contract and price (or inheritance documents and a date-of-death valuation, or gift documents and the giver's cost)</li>
          <li>Records of major improvements, with dates and amounts</li>
          <li>Sale contract, closing statement, and selling costs</li>
          <li>Foreign tax assessments and proof of payment</li>
          <li>Exchange rates used for each amount, and their source</li>
          <li>Statements for any foreign account that held the proceeds</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Almost always for a sale of foreign real estate — especially if the property was inherited or gifted, was ever rented out, had a foreign-currency mortgage, was held through a company, or was taxed abroad. A professional can also check whether an income tax treaty affects the result.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

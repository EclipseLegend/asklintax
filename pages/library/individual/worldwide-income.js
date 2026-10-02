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
  id:            '30',
  title:         'Foreign income: do U.S. tax residents report worldwide income?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the worldwide income rule for U.S. citizens and resident aliens, the foreign tax credit, the foreign earned income exclusion, and currency conversion. Treaty positions, foreign pensions, and foreign companies need case-by-case review',
  persona:       ['Green card holders and H-1B workers with income in Taiwan or China', 'New immigrants', 'Anyone with foreign rent, interest, or investments', 'People who spend part of the year abroad'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'List every source of income you received anywhere in the world while you were a U.S. tax resident in 2025, convert it to U.S. dollars, and report it on your Form 1040. Then check whether a foreign tax credit (or, if you lived abroad, the foreign earned income exclusion) reduces double tax.',
  sources: [
    { label: 'IRS — Resident aliens', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 54 — Tax Guide for U.S. Citizens and Resident Aliens Abroad', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS — Foreign earned income exclusion', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 foreign earned income exclusion amount', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Foreign currency and currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — United States income tax treaties A to Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: 'I\'m a green card holder. Do I report rent from my apartment in Taiwan?',
    a: 'Yes. A U.S. resident is taxed on worldwide income the same way as a U.S. citizen, so rent from property abroad belongs on your U.S. return (on Schedule E), even if it is also taxed in Taiwan and stays in Taiwan.',
  },
  {
    q: 'Do I pay tax twice on income that Taiwan already taxed?',
    a: 'Not necessarily. If you paid qualifying foreign income taxes on income that the U.S. also taxes, you can generally choose a foreign tax credit (Form 1116), which reduces your U.S. tax, or an itemized deduction. Only income-type taxes qualify for the credit.',
  },
  {
    q: 'Can I use the foreign earned income exclusion while living in the U.S.?',
    a: 'Generally no. The exclusion requires foreign earned income, a tax home in a foreign country, and meeting the bona fide residence or physical presence test (at least 330 full days in a foreign country during 12 consecutive months). Someone who lives and works in the U.S. usually does not qualify.',
  },
  {
    q: 'Is money my parents send me from Taiwan part of my worldwide income?',
    a: 'No. Gifts and inheritances are generally not income to the person who receives them. Large gifts from foreign persons may need to be reported on Form 3520, but they are not taxed as income.',
  },
  {
    q: 'I moved to the U.S. in the middle of 2025. Do I report my Taiwan salary from before I moved?',
    a: 'Usually not. In your year of arrival you are typically a dual-status taxpayer: worldwide income is taxed only for the part of the year you were a U.S. resident. Foreign income received while you were still a nonresident is generally not taxable unless it is connected with a U.S. business.',
  },
  {
    q: 'Does the U.S. have a tax treaty with Taiwan?',
    a: 'Taiwan does not appear on the IRS\'s list of countries with U.S. income tax treaties. If you are relying on any treaty benefit, have a tax professional confirm it first.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Worldwide income applies to residents. Confirm your status with the green card and substantial presence tests.',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Foreign rental property and U.S. taxes',
    desc:  'How to report rent from property abroad: Schedule E, depreciation, and currency.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'Interest is income; the account itself may need an FBAR or Form 8938.',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: 'Dual-status tax returns: your year of arrival or departure',
    desc:  'In your year of arrival, worldwide income applies only to the resident part of the year.',
  },
]

export default function WorldwideIncomePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Do U.S. Residents Report Foreign Income? Worldwide Income Explained | AskLinTax',
      description: 'U.S. citizens and resident aliens are taxed on worldwide income — including salary, rent, interest, and gains from Taiwan or China. What counts, what does not, and how the foreign tax credit and FEIE work for 2025.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The rule: U.S. residents are taxed on income from everywhere</h2>
        <p>
          If you are a U.S. <strong>citizen</strong> or a U.S. <strong>resident alien</strong> — a green card holder, or someone who meets the substantial presence test — your <strong>worldwide income</strong> is subject to U.S. income tax, the same way as a U.S. citizen's. Where the income was earned, which currency it was paid in, and whether you ever bring it to the U.S. do not change that.
        </p>
        <p>
          Nonresident aliens are different: they are generally taxed only on U.S.-source income and income connected with a U.S. business. That is why your residency status is the first question to answer — see <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a>
        </p>

        <h2>What counts as foreign income — and what doesn't</h2>
        <ArticleTable
          head={['Item', 'Reportable for a U.S. resident?', 'Notes']}
          rows={[
            ['Salary or business income earned abroad', 'Yes', 'Foreign tax credit or (if you live abroad) foreign earned income exclusion may apply'],
            ['Interest from a Taiwan or China bank account', 'Yes', 'Report even without a 1099'],
            ['Dividends and gains on foreign stocks', 'Yes', 'Convert to U.S. dollars'],
            ['Rent from property abroad', 'Yes', 'Reported on Schedule E'],
            ['Gain from selling property abroad', 'Yes', 'Currency changes affect the gain in dollars'],
            ['Gifts and inheritances from family abroad', 'Not income', 'Large foreign gifts may require Form 3520'],
            ['Moving your own savings between countries', 'Not income', 'Accounts abroad may require FBAR / Form 8938'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Income vs. disclosure</div>
          <p>Reporting <em>income</em> on your Form 1040 is separate from <em>disclosing</em> foreign accounts and assets on the FBAR, Form 8938, or Form 3520. Disclosure forms report what you have or what you received; income tax applies to what you earn. You may need both. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</p>
        </div>

        <h2>Reporting in U.S. dollars</h2>
        <p>
          Every amount on your U.S. return must be in U.S. dollars. The IRS's general rule is to translate each item at the exchange rate in effect when you receive or pay it. The IRS has no single official rate; it publishes yearly average rates and generally accepts any posted exchange rate that you use consistently. For 2025, its yearly average for the Taiwan dollar is 31.167 per U.S. dollar.
        </p>

        <h2>Avoiding double tax</h2>
        <h3>1. The foreign tax credit</h3>
        <p>
          If you paid or accrued <strong>foreign income taxes</strong> on income that the U.S. also taxes, you can generally take either a <strong>credit</strong> (Form 1116), which reduces your U.S. tax liability (subject to limits), or an <strong>itemized deduction</strong>. In most cases the credit is worth more. Only income-type taxes qualify — and you cannot take a credit for tax on income you exclude.
        </p>
        <h3>2. The foreign earned income exclusion (for people living abroad)</h3>
        <p>
          The foreign earned income exclusion lets qualifying people exclude foreign <strong>earned</strong> income — up to <strong>$130,000 for 2025</strong>. To qualify you need foreign earned income, a tax home in a foreign country, and one of:
        </p>
        <ul>
          <li>Bona fide residence in a foreign country for an uninterrupted period that includes a full tax year (for resident aliens, this route requires being a citizen or national of a country with which the U.S. has an income tax treaty in effect), or</li>
          <li>Physical presence in a foreign country for at least <strong>330 full days</strong> during any 12-month period.</li>
        </ul>
        <p>
          It does not cover investment income such as interest, dividends, or rent, and people who live and work in the U.S. generally do not qualify.
        </p>
        <h3>3. Tax treaties</h3>
        <p>
          Income tax treaties can reduce or eliminate tax on some kinds of income. Taiwan does not appear on the IRS's list of U.S. income tax treaty countries, so check carefully — with a professional — before relying on any treaty position.
        </p>

        <h2>A worked example</h2>
        <p>Mei is a green card holder living in California all of 2025. Besides her U.S. salary, she has:</p>
        <ArticleTable
          head={['Foreign item', 'Reported on her 2025 return?', 'Where']}
          rows={[
            ['NT$360,000 rent from an apartment in Taipei', 'Yes (≈ $11,551)', 'Schedule E, with expenses and depreciation'],
            ['Interest on a Taiwan savings account', 'Yes', 'Interest income; Schedule B foreign account question'],
            ['Dividends from Taiwan stocks', 'Yes', 'Dividend income'],
            ['US$50,000 gift from her mother in Taiwan', 'No — not income', 'Under the $100,000 Form 3520 threshold'],
            ['Taiwan income tax paid on the rent', '—', 'May support a foreign tax credit on Form 1116'],
          ]}
        />
        <p>
          Her Taiwan accounts also need to be checked for <a href="/library/investment/foreign-bank-account/">FBAR and Form 8938</a>.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>Get help if you have foreign pensions or retirement accounts, own part of a foreign company, have foreign mutual funds or insurance products, or have not reported foreign income in past years. These carry rules beyond this overview.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

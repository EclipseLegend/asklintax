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
  id:            '95',
  title:         'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'A federal filing checklist for U.S. citizens and resident aliens living outside the United States for tax years 2025 and 2026, based on Publication 54 (Rev. December 2025), the 2025 Instructions for Form 1040, the 2025 Instructions for Form 2555, the Instructions for Form 8938, the IRS FBAR page, the IRS yearly average currency exchange rates, and the IRS list of U.S. income tax treaties. It links to detailed guides rather than repeating them. It does not cover U.S. state tax, renouncing citizenship, or Taiwan tax law',
  persona:       ['U.S. citizens living in Taiwan', 'Green card holders working abroad', 'Americans who recently moved overseas', 'Families with income or accounts in more than one country'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Check whether you must file a U.S. return, note the June 15 automatic extension (interest still runs from April 15), choose between the foreign earned income exclusion and the foreign tax credit for each type of income, and check the FBAR and Form 8938 thresholds that apply to people abroad.',
  sources: [
    { label: 'IRS — Publication 54, Tax Guide for U.S. Citizens and Resident Aliens Abroad', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — 2025 Instructions for Form 1040', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 Instructions for Form 2555', url: 'https://www.irs.gov/pub/irs-pdf/i2555.pdf' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Yearly average currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — United States income tax treaties A to Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: 'I live in Taiwan and earn everything there. Do I still file a U.S. return?',
    a: 'If you are a U.S. citizen or resident alien and your gross income is at or above the filing threshold, generally yes. Publication 54 says that, for this test, gross income includes income you can exclude as foreign earned income or foreign housing. You also must file to claim the exclusion.',
  },
  {
    q: 'When is my return due if I live abroad?',
    a: 'If on April 15 you live outside the United States and Puerto Rico and your tax home is outside them, you get an automatic 2-month extension to June 15 to file and pay, but interest runs on unpaid tax from April 15. You can request 4 more months, to October 15, on Form 4868 by June 15; that is an extension to file, not to pay.',
  },
  {
    q: 'Is there a U.S.–Taiwan tax treaty?',
    a: 'As of this guide\'s October 2026 review, Taiwan does not appear on the IRS list of U.S. income tax treaties (a page the IRS last updated January 3, 2026). We could not confirm from the U.S. government sources available for this review whether any U.S.–Taiwan double tax relief legislation has been enacted, so this guide does not rely on any. Not having a treaty does not remove other relief: U.S. rules such as the foreign tax credit and the foreign earned income exclusion still apply. Check current IRS guidance before filing.',
  },
  {
    q: 'Should I use the foreign earned income exclusion or the foreign tax credit?',
    a: 'It depends on your income and the foreign tax rate. The exclusion applies only to earned income, and you cannot credit foreign tax on excluded income. Many people compare both. See the FEIE and foreign tax credit guides.',
  },
  {
    q: 'Which exchange rate do I use for Taiwan dollars?',
    a: 'The IRS generally accepts any posted exchange rate used consistently, and it publishes yearly averages — 31.167 Taiwan dollars per U.S. dollar for 2025. For the FBAR, the maximum account value is converted using the Treasury rate for the last day of the year.',
  },
]

const RELATED = [
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: 'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules',
    desc:  'Excluding foreign wages and housing costs.',
  },
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: 'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income',
    desc:  'Crediting foreign income tax against U.S. tax.',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'The $10,000 FBAR rule and how to file.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Comparing the two foreign asset reports.',
  },
]

export default function UsTaxpayerLivingAbroadPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist | AskLinTax',
      description: 'A U.S. tax checklist for citizens and green card holders abroad: filing thresholds, the June 15 and October 15 extensions, FEIE vs. foreign tax credit, FBAR, Form 8938, PFICs, foreign pensions, currency, and Taiwan.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Moving abroad does not end U.S. tax filing. U.S. citizens and resident aliens (including green card holders) generally report <strong>worldwide income</strong> and file a U.S. return if their income is at or above the filing threshold — even if they live and work in Taiwan. Special rules give you more time to file and ways to reduce double tax, and separate reports may be required for foreign accounts and assets. Use this checklist, then follow the links for details.
        </p>

        <h2>1. Do you need to file?</h2>
        <ArticleTable
          head={['2025 filing status (under 65)', 'File if gross income is at least']}
          rows={[
            ['Single', '$15,750'],
            ['Married filing jointly (both under 65)', '$31,500'],
            ['Married filing separately (any age)', '$5'],
            ['Head of household', '$23,625'],
            ['Qualifying surviving spouse', '$31,500'],
          ]}
        />
        <p>
          These are the 2025 amounts from the Form 1040 instructions; higher amounts apply at 65 or older, and the 2026 amounts will be in the 2026 instructions. For this test, gross income includes foreign earned income and housing amounts you can exclude. You must also file if you have net self-employment earnings of $400 or more. Worldwide income is explained in <a href="/library/individual/worldwide-income/">Foreign income: do U.S. tax residents report worldwide income?</a>
        </p>

        <h2>2. Deadlines and payment</h2>
        <ArticleTable
          head={['Item', 'Date for a 2025 return', 'Notes']}
          rows={[
            ['Regular due date', 'April 15, 2026', 'Interest on unpaid tax runs from this date even with an extension'],
            ['Automatic 2-month extension', 'June 15, 2026', 'If you live outside the U.S. and Puerto Rico and your tax home is abroad on April 15; attach a statement'],
            ['Additional 4 months (Form 4868, filed by June 15)', 'October 15, 2026', 'Extension of time to file, not to pay'],
            ['FBAR (FinCEN Form 114)', 'April 15, automatically extended to October 15', 'Filed separately from the tax return'],
          ]}
        />
        <p>
          If you are waiting to qualify for the foreign earned income exclusion, Form 2350 can extend the time to file; see <a href="/library/individual/foreign-earned-income-exclusion/">the FEIE guide</a>.
        </p>

        <h2>3. Avoiding double tax: FEIE or foreign tax credit</h2>
        <ul>
          <li><strong>Foreign earned income exclusion:</strong> excludes foreign wages and self-employment income up to $130,000 for 2025 and $132,900 for 2026, plus a housing amount, if you meet the tax home and residence or presence tests. It does not apply to investment income. See <a href="/library/individual/foreign-earned-income-exclusion/">the FEIE guide</a>.</li>
          <li><strong>Foreign tax credit:</strong> reduces U.S. tax by qualifying foreign income taxes, within limits. You cannot credit foreign tax on income you exclude. See <a href="/library/individual/foreign-tax-credit/">the foreign tax credit guide</a>.</li>
        </ul>

        <h2>4. Foreign accounts and assets</h2>
        <ul>
          <li><strong>FBAR:</strong> required if the combined value of your foreign financial accounts exceeded $10,000 at any time during the year. See <a href="/library/investment/fbar/">the FBAR guide</a>.</li>
          <li><strong>Form 8938:</strong> if your tax home is abroad and you meet a presence-abroad test, the thresholds are higher — more than $200,000 at year end or $300,000 at any time (single or married filing separately), or $400,000 / $600,000 for a joint return. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
          <li><strong>Foreign funds and ETFs:</strong> may be PFICs with their own rules and Form 8621. See <a href="/library/investment/pfic-form-8621/">the PFIC guide</a>.</li>
          <li><strong>Foreign pensions:</strong> may raise Form 8938, FBAR, and Form 3520 questions. See <a href="/library/investment/foreign-pension-retirement-accounts/">the foreign pension guide</a>.</li>
        </ul>

        <h2>5. Currency conversion</h2>
        <p>
          Report every amount in U.S. dollars. The IRS generally accepts any posted exchange rate used consistently, and its yearly average for the Taiwan dollar is <strong>31.167 per U.S. dollar for 2025</strong>. To convert, divide the Taiwan dollar amount by the rate. The FBAR uses a different rule: the Treasury exchange rate for the last day of the year. See <a href="/library/investment/fbar-maximum-account-value/">the FBAR maximum value guide</a>.
        </p>

        <h2>6. Taiwan-related considerations</h2>
        <ul>
          <li><strong>No treaty on the IRS list (as of October 2026):</strong> Taiwan does not appear on the IRS list of U.S. income tax treaties. We could not confirm from available U.S. government sources whether any U.S.–Taiwan double tax relief legislation has been enacted, so this guide does not rely on any; check current IRS guidance before filing. Even without a treaty, the foreign tax credit and the foreign earned income exclusion remain available if you qualify.</li>
          <li><strong>Bona fide residence test:</strong> Publication 54 limits this test to U.S. citizens and to resident aliens who are citizens or nationals of a country with a U.S. income tax treaty in effect; the physical presence test applies to all resident aliens. For a green card holder, citizenship or nationality — not birthplace or U.S. tax residency — decides this. See <a href="/library/individual/foreign-earned-income-exclusion/">the FEIE guide</a>.</li>
          <li><strong>Which Taiwan taxes are creditable:</strong> only foreign income taxes (or taxes in lieu of them) generally qualify for the credit; property taxes do not.</li>
        </ul>

        <h2>Checklist</h2>
        <ul>
          <li>Confirm your filing requirement (gross income includes excludable foreign income).</li>
          <li>Decide whether to use the June 15 extension and, if needed, Form 4868; pay by April 15 to avoid interest.</li>
          <li>Compare the foreign earned income exclusion and the foreign tax credit.</li>
          <li>Total your foreign account balances for the FBAR and Form 8938.</li>
          <li>Identify foreign funds, pensions, and other assets that may need Form 8621, 8938, or 3520.</li>
          <li>Convert all amounts to U.S. dollars consistently.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Beyond this checklist</div>
          <p>U.S. state tax obligations after a move, renouncing citizenship, Taiwan tax law, and businesses abroad are not covered. Rules for 2026 should be checked against the final 2026 forms and instructions.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

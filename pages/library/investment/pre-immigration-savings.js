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
  id:            '50',
  title:         'I had this money before moving to America — does that change FBAR or Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Separates the income tax treatment of savings accumulated before becoming a U.S. resident from the FBAR and Form 8938 reporting of the accounts that hold them. Arrival-year reporting periods and treaty positions need individual review',
  persona:       ['New immigrants with savings left in Taiwan, China, or Hong Kong', 'Green card holders who kept home-country accounts', 'People planning to move savings to the U.S.', 'Families helping a newly arrived relative'],
  relatedJourney: ['New to the U.S.', 'Cross-border finances'],
  actionRequired: 'Keep two answers apart: savings you earned before becoming a U.S. resident are generally not taxed again just because they exist or move — but the foreign accounts holding them can still be reportable on the FBAR or Form 8938 for periods when you are subject to those rules.',
  sources: [
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Instructions for Form 8938 (specified individual and reporting period)', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 519 — U.S. Tax Guide for Aliens (residency starting date)', url: 'https://www.irs.gov/publications/p519' },
  ],
}

const FAQS = [
  {
    q: 'The money was earned before I became a U.S. taxpayer. Do I still report the account?',
    a: 'The account can still be reportable. The FBAR and Form 8938 look at the accounts and their values during periods when you are a U.S. person or specified individual — not at when the money was originally earned.',
  },
  {
    q: 'Is my old savings taxable now that I live in the U.S.?',
    a: 'Generally, savings you earned before becoming a U.S. resident are not taxed again just because they sit in an account or because you move them to the U.S. What is taxable is income earned while you are a resident — such as interest on those savings.',
  },
  {
    q: 'I plan to move the money to the U.S. Is the transfer taxable?',
    a: 'Generally no. Moving your own money is not income. Converting a large amount of foreign currency, or selling an investment to raise the money, can raise separate questions — see the transfer guide linked below. The transfer does not change the FBAR or Form 8938 answer for the year the account existed.',
  },
  {
    q: 'I arrived in the middle of the year. Which balances count?',
    a: 'For Form 8938, the instructions say the reporting period begins on your residency starting date. For the FBAR, the official guidance reviewed for this guide does not spell out how pre-arrival balances in your arrival year are treated, so have that year reviewed.',
  },
]

const RELATED = [
  {
    href: '/library/investment/transfer-own-money-to-us',
    cat:  'Investments & Foreign Accounts',
    title: 'I transferred my own money from overseas to the U.S. — is it taxable?',
    desc:  'Why moving your own savings is not income.',
  },
  {
    href: '/library/investment/new-us-resident-foreign-accounts',
    cat:  'Investments & Foreign Accounts',
    title: 'I just moved to the U.S. — do I need to report my foreign bank accounts?',
    desc:  'Your arrival year, step by step.',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'The aggregate test for the accounts that hold your savings.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Interest your savings earn after you become a resident is income.',
  },
]

export default function PreImmigrationSavingsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Savings From Before You Moved to the U.S.: FBAR and Form 8938 | AskLinTax',
      description: 'Money you saved before immigrating is generally not taxed again — but the foreign accounts holding it can still be reportable on the FBAR or Form 8938. Four separate questions, explained.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          "I had this money before I came to America" answers <strong>one</strong> question — whether the money itself is taxed again — but not the others. Savings you earned before becoming a U.S. resident are generally not taxed again just because they exist or because you move them. But the <strong>foreign accounts</strong> that hold those savings can still be <strong>reportable</strong> on the FBAR or Form 8938 for the periods when you are subject to those rules.
        </p>

        <h2>Four separate questions</h2>
        <ArticleTable
          head={['Question', 'Short answer']}
          rows={[
            ['1. Is the original savings taxable now because it existed before U.S. residency?', 'Generally no — it is not taxed again just because it exists or is moved'],
            ['2. Is the foreign account reportable on the FBAR or Form 8938?', 'It can be, for periods when you are a U.S. person (FBAR) or a specified individual (Form 8938) and the thresholds are met'],
            ['3. Is income the account earns taxable?', 'Interest and other income earned while you are a U.S. resident is reported on your tax return'],
            ['4. When did your U.S. residency (and reporting) begin?', 'Decided by the green card or substantial presence test and your residency starting date'],
          ]}
        />

        <h2>1. The money itself</h2>
        <p>
          U.S. residents are taxed on worldwide income — income earned while they are residents. Savings built up from salary or other income earned before you became a resident are not income again simply because they sit in an account in Taiwan, or because you wire them to the U.S. Moving your own money is not income. See <a href="/library/investment/transfer-own-money-to-us/">I transferred my own money from overseas to the U.S. — is it taxable?</a>
        </p>

        <h2>2. The accounts that hold it</h2>
        <p>
          The FBAR asks whether a U.S. person had foreign financial accounts whose aggregate value exceeded $10,000 at any time during the calendar year. Form 8938 asks whether a specified individual's foreign financial assets exceeded the Form 8938 threshold. Neither form asks when the money was earned. So "it's old money" is not an exception to account reporting.
        </p>

        <h2>3. Income the savings earn now</h2>
        <p>
          Once you are a resident, interest, dividends, and gains on those foreign accounts are part of your worldwide income, reported in U.S. dollars on your tax return.
        </p>

        <h2>4. When it starts</h2>
        <p>
          Your U.S. residency generally starts on your residency starting date under the green card test or the substantial presence test. For Form 8938, the instructions say the reporting period for a part-year specified individual begins on that date. For the FBAR in your arrival year, the official guidance reviewed for this guide does not spell out how pre-arrival balances are treated — see <a href="/library/investment/new-us-resident-foreign-accounts/">I just moved to the U.S.</a> and have that year reviewed.
        </p>

        <h2>Example</h2>
        <p>
          Chen worked in Taipei for 15 years and saved the equivalent of $80,000 in a Taiwan account before moving to the U.S. on a green card in 2024. In 2025, a full resident year, the $80,000 is not taxed again. But the account exceeded $10,000, so Chen files an FBAR for 2025, checks Form 8938 against the threshold for her filing status, and reports the account's 2025 interest on her tax return. Wiring $50,000 of it to the U.S. later in 2025 does not change any of those answers.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Two opposite mistakes</div>
          <p>Some people think their old savings become taxable income once they move. Others think old savings make the account exempt from reporting. Both are wrong. The savings are generally not taxed again; the account can still be reportable.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

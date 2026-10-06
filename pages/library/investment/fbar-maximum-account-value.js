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
  id:            '42',
  title:         'What is the maximum value of a foreign account for FBAR?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers how individuals determine the maximum account value reported on the FBAR (FinCEN Form 114). Form 8938 uses its own valuation rules, and accounts whose value cannot be determined need separate review',
  persona:       ['Anyone who has already determined they must file an FBAR', 'People with several foreign accounts in different currencies', 'Families filing their first FBAR', 'Tax preparers checking FBAR values'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'For each foreign account, find a reasonable approximation of its highest value during the calendar year (periodic statements can be used if they fairly reflect it), convert it to U.S. dollars at the Treasury exchange rate for the last day of the year, and round up to the next whole dollar.',
  sources: [
    { label: 'FinCEN — Reporting Maximum Account Value', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'U.S. Treasury, Bureau of the Fiscal Service — Treasury Reporting Rates of Exchange', url: 'https://fiscaldata.treasury.gov/datasets/treasury-reporting-rates-exchange/' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
  ],
}

const FAQS = [
  {
    q: 'Can I just report my December 31 balance?',
    a: 'Only if that really was the account\'s highest value during the year. The maximum value is a reasonable approximation of the greatest value in the account during the calendar year — which is often a different day.',
  },
  {
    q: 'Do I need to check every daily balance?',
    a: 'Not necessarily. FinCEN says periodic account statements may be relied on to determine the maximum value, provided the statements fairly reflect the maximum account value during the year. If a large deposit came in and left between statement dates, the statements may not fairly reflect it.',
  },
  {
    q: 'Which exchange rate do I use?',
    a: 'Convert foreign currency using the Treasury\'s reporting rate of exchange for the last day of the calendar year. If no Treasury rate is available, use another verifiable exchange rate and provide its source.',
  },
  {
    q: 'My account had an overdraft and the value is negative. What do I enter?',
    a: 'FinCEN\'s filing instructions say that if the value of the account is negative, you enter zero as the maximum account value.',
  },
  {
    q: 'Is the maximum value the same thing as the $10,000 test?',
    a: 'They are related but different. You first add up the maximum values of all your foreign accounts to see whether the total exceeded $10,000. If it did, you report each account\'s own maximum value on the FBAR.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'Start here if you have not yet decided whether you must file.',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'Who files, what counts, deadlines, and how to file through BSA E-Filing.',
  },
  {
    href: '/library/investment/foreign-time-deposit-cd',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign CDs and time deposits: do they go on FBAR or Form 8938?',
    desc:  'Time deposits that mature and roll over are a common maximum-value puzzle.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Form 8938 asks for maximum values too, under its own rules.',
  },
]

export default function FbarMaximumAccountValuePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'FBAR Maximum Account Value: How to Calculate It | AskLinTax',
      description: 'How to figure the maximum account value for each foreign account on your FBAR: highest balance during the year, using statements, the Treasury year-end exchange rate, rounding, and examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          For each foreign account on your FBAR, the <strong>maximum account value</strong> is a reasonable approximation of the <strong>greatest value</strong> of currency or other assets in the account at any point during the calendar year. It is not simply the year-end balance. You convert it to U.S. dollars using the <strong>Treasury exchange rate for the last day of the calendar year</strong>, and record it in whole dollars, rounded up.
        </p>
        <p>
          This guide assumes you already know an FBAR is required. If you are still deciding, start with <a href="/library/investment/fbar-10000-rule/">How the $10,000 rule really works</a>.
        </p>

        <h2>Step by step</h2>
        <ol>
          <li><strong>Find the highest value in the account's own currency.</strong> Periodic statements (for example, monthly) may be relied on if they fairly reflect the maximum value during the year.</li>
          <li><strong>Convert to U.S. dollars</strong> at the Treasury Reporting Rate of Exchange for the last day of the calendar year — for 2025, the rate as of December 31, 2025. If no Treasury rate is available for the currency, use another verifiable exchange rate and provide the source.</li>
          <li><strong>Round up</strong> to the next whole dollar. FinCEN's example: $15,265.25 is recorded as $15,266.</li>
          <li><strong>If the value is negative</strong>, enter zero.</li>
        </ol>

        <h2>Why the December 31 balance is often wrong</h2>
        <p>
          Many people look only at their year-end statement. But if you moved money out during the year — for example, you wired savings to the U.S. in June and the account was nearly empty by December — the maximum value is the June peak, not the December balance.
        </p>

        <h2>When statements don't tell the whole story</h2>
        <p>
          Periodic statements are acceptable only if they fairly reflect the maximum value. They may not, for example, when a large deposit arrived and left between two statement dates. When the statements do not fairly reflect the maximum value, the requirement is still a reasonable approximation of the greatest value in the account during the year. FinCEN's guidance does not prescribe a particular method for that. As a practical step (not an official rule), keep whatever records you relied on.
        </p>

        <h2>Example: several accounts with peaks on different dates</h2>
        <p>
          Kai, a U.S. resident, has three accounts in Taiwan during 2025. Each account's highest balance came on a different date. Using an illustrative year-end rate of NT$1 = US$0.031 (not an actual published rate):
        </p>
        <ArticleTable
          head={['Account', 'Highest balance (NT$)', 'Date of peak', 'Maximum value (US$, rounded up)']}
          rows={[
            ['Checking, Bank A', 'NT$180,000', 'March 2025', '$5,580'],
            ['Savings, Bank B', 'NT$210,000', 'August 2025', '$6,510'],
            ['Time deposit, Bank B', 'NT$300,000', 'All year', '$9,300'],
            ['Aggregate of maximum values', '', '', '$21,390'],
          ]}
        />
        <p>
          Two separate questions come out of this table:
        </p>
        <ul>
          <li><strong>Filing threshold:</strong> the aggregate of the maximum values ($21,390) is more than $10,000, so an FBAR is required — even though the three peaks happened at different times and the accounts never held $21,390 on the same day.</li>
          <li><strong>What Kai reports:</strong> each account's own maximum value ($5,580, $6,510, and $9,300), not the aggregate.</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ One rate for the whole year</div>
          <p>For the FBAR, the conversion uses the rate for the last day of the calendar year, even if the account peaked in March. Use the same Treasury rate table for every account in the same currency.</p>
        </div>

        <h2>Records to keep</h2>
        <p>
          For each reported account, keep the name on the account, the account number, the name and address of the foreign bank, the type of account, and the maximum value during the year — generally for five years from the FBAR due date. As a practical step, also keep the statements or other records you used and note the exchange rate source.
        </p>

        <h2>Form 8938 is valued separately</h2>
        <p>
          Form 8938 also asks for maximum values, but it has its own thresholds and instructions. Don't assume your FBAR numbers automatically answer the Form 8938 question. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '41',
  title:         'Do I need to file an FBAR? How the $10,000 rule really works',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the FBAR filing threshold for individual U.S. persons with foreign financial accounts. Business accounts, trusts, and signature authority held through an employer need separate review',
  persona:       ['Anyone with more than one bank account in Taiwan, China, or elsewhere abroad', 'New immigrants and green card holders', 'Students who have become U.S. tax residents', 'Adult children named on parents\' accounts'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Add up the maximum values of all your foreign financial accounts for the calendar year. If the total is more than $10,000 at any time during the year, file an FBAR (FinCEN Form 114) reporting your foreign financial accounts — separately from your tax return. Reporting an account does not by itself make its balance taxable.',
  sources: [
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'FinCEN — Reporting Maximum Account Value', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'eCFR — 31 CFR 1010.350, Reports of foreign financial accounts', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
  ],
}

const FAQS = [
  {
    q: 'None of my accounts ever had more than $10,000. Do I still need an FBAR?',
    a: 'Possibly. The test is the aggregate: if the maximum values of all your foreign financial accounts add up to more than $10,000, an FBAR is required, even if no single account ever reached $10,000.',
  },
  {
    q: 'My total went over $10,000 for only one week. Does that count?',
    a: 'Yes. The FBAR threshold is met if the aggregate value exceeded $10,000 at any time during the calendar year. It is not based on your year-end balance.',
  },
  {
    q: 'Once I am over $10,000, which accounts do I list?',
    a: 'Your reportable foreign financial accounts — not just the account that pushed the total over the line. The FBAR asks for information about each account, including its maximum value for the year.',
  },
  {
    q: 'Does reporting my account on an FBAR mean I owe tax on the balance?',
    a: 'No. The FBAR is a report, not a tax. The balance itself is not income. What the account earns — such as interest — is reported separately on your income tax return.',
  },
  {
    q: 'Do I attach the FBAR to my Form 1040?',
    a: 'No. The FBAR is filed electronically with FinCEN through the BSA E-Filing System, not with your federal tax return.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'What is the maximum value of a foreign account for FBAR?',
    desc:  'Once you know you must file, how to figure the number you report for each account.',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'The full FBAR guide: who files, what counts, deadlines, and how to file.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Form 8938 has different thresholds and is filed with your tax return.',
  },
  {
    href: '/library/investment/foreign-account-no-interest',
    cat:  'Investments & Foreign Accounts',
    title: 'My foreign bank account earned no interest — do I still need to report it?',
    desc:  'Why the FBAR depends on account value, not on income.',
  },
]

export default function Fbar10000RulePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'FBAR $10,000 Rule: Is It Per Account or Combined? | AskLinTax',
      description: 'The FBAR $10,000 threshold is an aggregate test across all your foreign financial accounts at any time during the year — not per account and not your year-end balance. Examples with Taiwan accounts.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          You need to file an FBAR (FinCEN Form 114) if you are a <strong>U.S. person</strong>, you have a financial interest in or signature or other authority over one or more <strong>foreign financial accounts</strong>, and the <strong>aggregate</strong> value of those accounts exceeded <strong>$10,000 at any time</strong> during the calendar year.
        </p>
        <p>
          Three words in that sentence trip people up: <strong>aggregate</strong> (all accounts added together), <strong>at any time</strong> (not the December 31 balance), and <strong>accounts</strong> (financial accounts — not every kind of foreign asset).
        </p>

        <ArticleTable
          head={['Common belief', 'What the rule actually says']}
          rows={[
            ['"Each account has to be over $10,000"', 'No — the test adds up the maximum values of all your foreign financial accounts'],
            ['"I only check my December 31 balance"', 'No — the question is whether the total exceeded $10,000 at any time during the year'],
            ['"I only report the account that was large"', 'No — once you must file, you report your foreign financial accounts on the FBAR'],
            ['"Reporting means I owe tax on the money"', 'No — the FBAR is a report; the balance itself is not income'],
          ]}
        />

        <h2>Who is a U.S. person for the FBAR</h2>
        <p>
          U.S. citizens, U.S. residents, and U.S. entities are U.S. persons for FBAR purposes. For individuals who are not citizens, residency is determined under the tax law's residency tests (the green card test and the substantial presence test). See <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a> If you just arrived this year, read <a href="/library/investment/new-us-resident-foreign-accounts/">I just moved to the U.S. — do I need to report my foreign bank accounts?</a>
        </p>

        <h2>Financial interest and signature authority, briefly</h2>
        <ul>
          <li><strong>Financial interest:</strong> generally, you are the owner of record or hold legal title to the account — including an account you own jointly with someone else.</li>
          <li><strong>Signature or other authority:</strong> you can control the disposition of money in the account by direct communication with the bank, alone or together with someone else — for example, being able to instruct a parent's bank to move money.</li>
        </ul>
        <p>
          Either one can bring an account into your FBAR count. Signature authority held as an employee has its own exceptions; that is outside this guide.
        </p>

        <h2>How the $10,000 aggregate test works</h2>
        <p>
          FinCEN's guidance states the rule this way: if the maximum account value of a single account, or the <strong>aggregate of the maximum account values of multiple accounts</strong>, exceeds $10,000, an FBAR must be filed.
        </p>
        <h3>Example: two Taiwan accounts</h3>
        <p>Mei, a U.S. resident, has two accounts in Taiwan during 2025 (amounts converted to U.S. dollars):</p>
        <ArticleTable
          head={['Account', 'Maximum value during 2025']}
          rows={[
            ['Checking account, Bank A', '$6,000'],
            ['Savings account, Bank B', '$5,500'],
            ['Aggregate of maximum values', '$11,500'],
          ]}
        />
        <p>
          Neither account ever reached $10,000, but the aggregate of their maximum values is <strong>$11,500</strong> — more than $10,000. Mei files an FBAR for 2025 and reports <strong>both</strong> accounts, each with its own maximum value.
        </p>
        <p>
          If the two maximums had been $4,000 and $5,500 ($9,500 in total), no FBAR would be required for those accounts.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Maximum value, converted to dollars</div>
          <p>Each account's maximum value is a reasonable approximation of the greatest value in the account during the year. Foreign currency is converted to U.S. dollars using the Treasury's exchange rate for the last day of the calendar year. The details are in <a href="/library/investment/fbar-maximum-account-value/">What is the maximum value of a foreign account for FBAR?</a></p>
        </div>

        <h2>"Foreign account" does not mean every foreign asset</h2>
        <p>
          The FBAR covers foreign <strong>financial accounts</strong> — for example bank accounts (savings, checking, time deposits), securities and brokerage accounts, and certain other financial accounts such as insurance or annuity policies with a cash value. It does not cover everything you own abroad. For example, the IRS comparison of the two forms lists foreign real estate held directly as not reported on the FBAR, and foreign stock held directly outside a financial account is not an FBAR item. See <a href="/library/investment/foreign-property/">Foreign property</a> and <a href="/library/investment/foreign-brokerage-account/">Foreign brokerage accounts and stocks</a>.
        </p>

        <h2>Filing basics</h2>
        <ul>
          <li>The FBAR is filed electronically with FinCEN through the BSA E-Filing System — <strong>not</strong> attached to your Form 1040.</li>
          <li>It is due April 15 of the following year, with an automatic extension to October 15.</li>
          <li>Form 8938 is a separate requirement with different thresholds. Filing one does not satisfy the other. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
        </ul>

        <h2>Reporting is not the same as tax</h2>
        <p>
          The money in your foreign account is not income just because it is reported. Income tax applies to what the account earns — interest, dividends, gains — which a U.S. citizen or resident reports on the tax return. See <a href="/library/investment/foreign-bank-account/">Do I need to report a Taiwan or foreign bank account?</a>
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Keep a simple year-end worksheet</div>
          <p>List every foreign account, its highest balance in the local currency, the year-end Treasury exchange rate, and the converted maximum. Add the column. That one page answers the FBAR question and gives you the numbers to file.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '24',
  title:         'Do I need to report a Taiwan or foreign bank account?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individual U.S. citizens and resident aliens with ordinary bank accounts abroad. Business accounts, trusts, retirement accounts, and treaty positions need case-by-case review',
  persona:       ['Anyone with a bank account in Taiwan, China, or elsewhere abroad', 'New immigrants who kept their home-country accounts', 'Adult children named on parents\' accounts', 'Green card holders'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Answer three separate questions for 2025: (1) did the account earn interest you must report on your tax return, (2) did all your foreign accounts together exceed $10,000 at any time (FBAR), and (3) did your foreign financial assets exceed your Form 8938 threshold?',
  sources: [
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Schedule B (Form 1040), Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — Yearly average currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: 'Is the money sitting in my Taiwan account taxable?',
    a: 'No — the balance itself is not income, and moving your own money between your own accounts is not income. What can be taxable is what the account earns, such as interest, which a U.S. citizen or resident must report on the U.S. tax return.',
  },
  {
    q: 'The Taiwan bank didn\'t send me a 1099. Do I still report the interest?',
    a: 'Yes. U.S. citizens and resident aliens are taxed on worldwide income, whether or not a U.S. tax form is issued. Convert the interest to U.S. dollars and report it like other interest income.',
  },
  {
    q: 'My name is on my parents\' account in Taiwan for convenience. Do I report it?',
    a: 'Possibly. The FBAR covers accounts in which you have a financial interest or signature or other authority. If you can direct the bank to move the money, that is signature authority. If the combined value of all accounts you must count exceeds $10,000 at any time during the year, you must report the account on your FBAR.',
  },
  {
    q: 'My spouse and I own a joint account in Taiwan. Do we each file an FBAR?',
    a: 'Generally each U.S. person must file, but there is an exception: if all of your foreign accounts are jointly owned with your spouse, you can sign FinCEN Form 114a authorizing your spouse to file, and your spouse reports the joint accounts on a timely FBAR. Your income tax filing status does not affect this exception.',
  },
  {
    q: 'Do I need to check the foreign account box on Schedule B?',
    a: 'If at any time in 2025 you had a financial interest in or signature authority over a financial account in a foreign country, check "Yes" in Part III of Schedule B — even if you are not required to file an FBAR.',
  },
  {
    q: 'How long should I keep records for my foreign accounts?',
    a: 'For FBAR purposes, keep the name on the account, the account number, the bank\'s name and address, the type of account, and the maximum value during the year — generally for five years from the FBAR due date.',
  },
  {
    q: 'Taiwan withheld tax on my interest. Can I get credit for it?',
    a: 'You may be able to claim a foreign tax credit (Form 1116) or an itemized deduction for qualifying foreign income taxes on income that is also taxed by the U.S. The credit is limited to qualifying taxes, so check the rules or ask a professional.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'Everything about FinCEN Form 114: the $10,000 test, what accounts count, and how to file.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Thresholds, deadlines, and what counts for each form, side by side.',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'If money in your account came from family abroad, check whether Form 3520 applies.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Interest from your Taiwan account is just one kind of foreign income U.S. residents report.',
  },
]

export default function ForeignBankAccountPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Do I Need to Report My Taiwan Bank Account to the IRS? | AskLinTax',
      description: 'A Taiwan or other foreign bank account raises three separate questions: income tax on interest, the FBAR, and Form 8938. A step-by-step check for U.S. citizens and residents for 2025.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Having a foreign account is legal — reporting it is required</h2>
        <p>
          Many people who move to the U.S. keep their bank accounts in Taiwan, China, or elsewhere. That is perfectly legal. But if you are a U.S. citizen or U.S. tax resident, the account can create up to <strong>three separate obligations</strong>. Each one has its own rule, and meeting one does not satisfy the others.
        </p>

        <ArticleTable
          head={['Question', 'What it is about', 'Where it is reported']}
          rows={[
            ['1. Income tax', 'Interest or other income the account earned', 'Your Form 1040 (and Schedule B)'],
            ['2. FBAR', 'All your foreign accounts together exceeded $10,000 at any time', 'FinCEN Form 114, e-filed with FinCEN'],
            ['3. Form 8938', 'Your foreign financial assets exceeded the Form 8938 threshold', 'Attached to your Form 1040'],
          ]}
        />

        <h2>Question 1: Do I owe tax on what the account earns?</h2>
        <p>
          U.S. citizens and resident aliens are taxed on their <strong>worldwide income</strong>. Interest your Taiwan account earned while you were a U.S. tax resident is reportable income, even though no 1099 is issued and even if the money never leaves Taiwan.
        </p>
        <p>
          The account <strong>balance</strong> is not income. Money you saved before moving, transfers between your own accounts, and true gifts from family are not income just because they sit in the account.
        </p>
        <h3>Converting to U.S. dollars</h3>
        <p>
          Amounts on your U.S. return must be in U.S. dollars. The IRS's general rule is to use the exchange rate in effect when you receive the income. The IRS also publishes yearly average rates; for 2025 it lists <strong>31.167 Taiwan dollars per U.S. dollar</strong>, and it generally accepts any posted exchange rate that you use consistently.
        </p>
        <p>
          Example: NT$15,000 of interest during 2025 ÷ 31.167 ≈ <strong>$481</strong> of interest income.
        </p>
        <p>
          If Taiwan withheld income tax on that interest, you may be able to claim a <strong>foreign tax credit</strong> on Form 1116, or deduct qualifying foreign income taxes as an itemized deduction.
        </p>

        <h2>Question 2: Do I need to file an FBAR?</h2>
        <p>
          You must file an FBAR (FinCEN Form 114) if you are a U.S. person with a <strong>financial interest in, or signature or other authority over</strong>, at least one financial account outside the U.S., and the <strong>combined value</strong> of those accounts exceeded <strong>$10,000 at any time</strong> during the calendar year.
        </p>
        <ul>
          <li>"Combined" means you add all your foreign accounts together. Two accounts of $6,000 each at the same moment total $12,000 — both must be reported.</li>
          <li>Whether the account earned income has no effect.</li>
          <li>An account in your parents' name can still count if you have signature authority over it.</li>
        </ul>
        <p>
          The FBAR is due <strong>April 15</strong> with an automatic extension to <strong>October 15</strong>. It is filed electronically through FinCEN's <strong>BSA E-Filing System</strong> — not with your tax return. The full rules are in <a href="/library/investment/fbar/">FBAR: do I need to report my foreign bank accounts?</a>
        </p>

        <h2>Question 3: Do I need Form 8938?</h2>
        <p>
          Form 8938 has much higher thresholds. For someone living in the U.S., it is required if specified foreign financial assets are worth more than <strong>$50,000 on the last day of the year or $75,000 at any time</strong> (single or married filing separately), or more than <strong>$100,000 / $150,000</strong> if married filing jointly. If you do not have to file an income tax return, you do not have to file Form 8938. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a> for the full comparison.
        </p>

        <h2>A worked example</h2>
        <p>Jason moved to the U.S. on an H-1B visa and is a U.S. tax resident for all of 2025. He kept two accounts in Taiwan:</p>
        <ArticleTable
          head={['Account', 'Highest balance in 2025', 'Interest earned']}
          rows={[
            ['Savings account', 'about $22,000', 'NT$15,000 (≈ $481)'],
            ['Checking account', 'about $3,000', 'None'],
          ]}
        />
        <ul>
          <li><strong>Income tax:</strong> report about $481 of interest on his 2025 Form 1040.</li>
          <li><strong>Schedule B:</strong> check "Yes" for a financial interest in a foreign account.</li>
          <li><strong>FBAR:</strong> required — the accounts together exceeded $10,000. He reports both accounts, including the small checking account.</li>
          <li><strong>Form 8938:</strong> not required if he is single and his foreign assets stayed under $50,000 at year end and $75,000 at all times.</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Keep these records for each account</div>
          <p>Name on the account, account number, bank name and address, type of account, and the maximum value during the year. Keep them for five years from the FBAR due date. Year-end statements from your Taiwan bank usually cover most of this.</p>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Missed it in past years?</div>
          <p>Filing late is better than not filing. If the IRS has not contacted you and you are not under investigation, the IRS says to file late FBARs as soon as possible to keep potential penalties to a minimum. If you also missed reporting interest income, talk to a tax professional about the right way to correct prior years.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '45',
  title:         'Foreign CDs and time deposits: do they go on FBAR or Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers time deposits and certificates of deposit held by individuals at foreign banks. Structured deposits, deposits held through a foreign company, and accounts at a foreign branch of a U.S. bank need separate review',
  persona:       ['People with a 定存 (time deposit) in Taiwan', 'Families with fixed deposits in Hong Kong or China', 'New immigrants who kept savings in CDs abroad', 'Retirees with foreign deposits'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Count a foreign time deposit or CD as a foreign financial account: include its maximum value in your FBAR aggregate test, check the Form 8938 threshold separately, and report the interest it earns on your tax return.',
  sources: [
    { label: 'eCFR — 31 CFR 1010.350, Reports of foreign financial accounts (definition of bank account)', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Internal Revenue Manual 4.26.16, Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'FinCEN — Reporting Maximum Account Value', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: 'Is a Taiwan time deposit (定存) a "foreign financial account" for the FBAR?',
    a: 'Yes. Time deposits maintained with a foreign bank are bank accounts for FBAR purposes. The official guidance reviewed for this guide gives no special exception for CDs or time deposits.',
  },
  {
    q: 'My time deposit is linked to my savings account at the same bank. One account or two?',
    a: 'The official guidance reviewed for this guide does not specifically address time deposits linked to another account. Banks set up time deposits in different ways, and whether a linked deposit is treated as its own account may depend on how the foreign bank legally and operationally maintains it. There is no special time-deposit exemption, so the deposit is not simply left out. Keep the bank statements that show how it is set up, and if the treatment is unclear, have it reviewed.',
  },
  {
    q: 'My time deposit rolled over three times during the year. Which value do I use?',
    a: 'The maximum value during the calendar year — a reasonable approximation of the greatest value in the account at any time. That may be just after a rollover when interest was added. Convert using the Treasury rate for the last day of the year.',
  },
  {
    q: 'Is the interest on a foreign CD taxable?',
    a: 'For a U.S. citizen or resident, yes — interest earned on a foreign deposit is reportable income. Report it in U.S. dollars on your tax return. A foreign tax credit may be available for qualifying foreign tax withheld.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'What is the maximum value of a foreign account for FBAR?',
    desc:  'How to value a deposit that rolled over during the year.',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'Add your time deposits to all your other foreign accounts.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'Interest, FBAR, and Form 8938 for an ordinary foreign account.',
  },
]

export default function ForeignTimeDepositCdPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign CDs and Time Deposits (定存): FBAR and Form 8938 | AskLinTax',
      description: 'A time deposit or CD at a foreign bank is a foreign financial account. How Taiwan 定存 and fixed deposits count for the FBAR $10,000 test, Form 8938, maximum value, and interest income.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A time deposit or certificate of deposit (CD) at a foreign bank — what many people call a <strong>定存</strong>, 定期存款, or fixed deposit — is a <strong>foreign financial account</strong>. It counts toward the FBAR $10,000 aggregate test like any other foreign bank account, and it can be a specified foreign financial asset for Form 8938. There is no special "CD exemption" in the official guidance reviewed for this guide.
        </p>
        <p>
          The interest it earns is a separate matter: it is income reported on your tax return.
        </p>

        <h2>Why a time deposit is an "account"</h2>
        <p>
          The FBAR regulation defines a bank account broadly, as a savings deposit, demand deposit, checking, or any other account maintained with a person engaged in the business of banking. IRS guidance lists time deposits (CDs) among reportable bank accounts. The IRS comparison of the two forms treats financial (deposit and custodial) accounts held at foreign financial institutions as reportable on both the FBAR and Form 8938, subject to each form's thresholds.
        </p>

        <ArticleTable
          head={['Question', 'FBAR', 'Form 8938']}
          rows={[
            ['Is a foreign time deposit covered?', 'Yes — a bank account', 'Yes — a deposit account at a foreign financial institution'],
            ['Threshold', 'Aggregate of all foreign accounts over $10,000 at any time', 'Your Form 8938 threshold (much higher; depends on filing status and where you live)'],
            ['Value reported', 'Maximum value during the calendar year', 'Maximum value during the tax year (Form 8938 rules)'],
            ['Where filed', 'FinCEN, through BSA E-Filing', 'Attached to your income tax return'],
          ]}
        />

        <h2>Valuing a time deposit</h2>
        <p>
          Use the account's <strong>maximum value</strong> during the year — a reasonable approximation of the greatest value at any time. For a deposit that renews, the maximum may come right after interest is added at a rollover. Convert to U.S. dollars at the Treasury rate for the last day of the calendar year. See <a href="/library/investment/fbar-maximum-account-value/">What is the maximum value of a foreign account for FBAR?</a>
        </p>

        <h2>Example</h2>
        <p>
          Grace, a U.S. resident, keeps a savings account in Taiwan with a maximum value of $4,000 and a one-year time deposit worth $8,200 at its peak (both converted at the year-end Treasury rate). Neither account reaches $10,000, but together they total <strong>$12,200</strong>, so she files an FBAR reporting both. Her foreign assets are far below the Form 8938 threshold. Separately, she reports the time deposit's interest, in U.S. dollars, on her tax return.
        </p>

        <h2>The interest is income</h2>
        <p>
          U.S. citizens and residents are taxed on worldwide income, so time-deposit interest is reportable income. If the foreign bank withheld tax, you may be able to claim a foreign tax credit for qualifying foreign income taxes. See <a href="/library/investment/foreign-bank-account/">Do I need to report a Taiwan or foreign bank account?</a>
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Keep the deposit certificates</div>
          <p>Time-deposit slips, renewal notices, and interest statements show the principal, rollover dates, and interest — exactly what you need for both the maximum value and the interest you report.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

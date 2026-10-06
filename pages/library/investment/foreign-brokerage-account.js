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
  id:            '46',
  title:         'Foreign brokerage accounts and stocks: what goes on FBAR and Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers how foreign brokerage accounts and foreign stock are treated for FBAR and Form 8938 reporting by individuals. It does not explain the income tax rules for foreign investments; foreign mutual funds and similar pooled funds may raise separate PFIC issues',
  persona:       ['People with a securities account in Taiwan, Hong Kong, or China', 'Employees holding shares of a foreign employer', 'Heirs who received foreign shares', 'New immigrants with investment accounts abroad'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Sort your foreign investments into two groups: (A) investments held inside a foreign brokerage or custodial account, where the account is what gets reported; and (B) foreign stock you hold directly outside any account, which can be a Form 8938 item but is not an FBAR item.',
  sources: [
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'eCFR — 31 CFR 1010.350, Reports of foreign financial accounts (securities account)', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'FinCEN — Reporting Maximum Account Value', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
  ],
}

const FAQS = [
  {
    q: 'Do I list every stock in my Taiwan brokerage account on the FBAR?',
    a: 'No. According to the IRS comparison, for foreign stock or securities held in a financial account, the account itself is reported, but the contents of the account do not have to be separately reported. The same is true for Form 8938.',
  },
  {
    q: 'I hold paper share certificates of a Taiwan company, not in any account. Do they go on the FBAR?',
    a: 'No. The IRS comparison says foreign stock or securities not held in a financial account are not FBAR items. They can be reportable on Form 8938 if you meet its requirements.',
  },
  {
    q: 'How do I value a brokerage account for the FBAR?',
    a: 'Use a reasonable approximation of the greatest value of the account — cash and securities together — during the calendar year, converted at the Treasury rate for the last day of the year.',
  },
  {
    q: 'I own a foreign mutual fund. Is that just another stock?',
    a: 'Not necessarily. Foreign mutual funds and similar pooled funds can be treated as passive foreign investment companies (PFICs) for income tax purposes, which has its own reporting (Form 8621). That is outside this guide — get professional help.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'The full side-by-side comparison of the two forms.',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'What is the maximum value of a foreign account for FBAR?',
    desc:  'How to value an account whose holdings rise and fall.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Dividends and gains on foreign stock are income, reported separately.',
  },
]

export default function ForeignBrokerageAccountPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Brokerage Accounts and Stocks: FBAR vs. Form 8938 | AskLinTax',
      description: 'Do you report a Taiwan or foreign brokerage account, or each stock in it? How foreign securities accounts and directly held foreign stock are treated on the FBAR and Form 8938.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          It depends on <strong>how</strong> you hold the investments:
        </p>
        <ul>
          <li><strong>Inside a foreign brokerage or custodial account:</strong> the <strong>account</strong> is what gets reported — on the FBAR (it is a foreign financial account) and, if you meet its threshold, on Form 8938. You do not separately list each stock in it.</li>
          <li><strong>Foreign stock held directly, outside any account:</strong> it can be reportable on <strong>Form 8938</strong>, but it is <strong>not</strong> reported on the FBAR.</li>
        </ul>

        <ArticleTable
          head={['What you have (per the IRS comparison)', 'FBAR', 'Form 8938']}
          rows={[
            ['Foreign stock or securities held in a financial account at a foreign financial institution', 'The account is reported; contents not separately reported', 'The account is reported; contents not separately reported'],
            ['Foreign stock or securities not held in a financial account', 'Not reported', 'Reported (if Form 8938 requirements are met)'],
          ]}
        />

        <h2>A. Securities inside a foreign brokerage account</h2>
        <p>
          The FBAR regulation counts a <strong>securities account</strong> — an account with a person in the business of buying, selling, holding, or trading stock or other securities — as a financial account. So a brokerage account in Taiwan or Hong Kong counts toward your FBAR $10,000 aggregate like a bank account. Its maximum value is the greatest value of everything in the account (cash and securities) during the year, as a reasonable approximation. See <a href="/library/investment/fbar-maximum-account-value/">maximum account value</a>.
        </p>

        <h2>B. Foreign stock you hold directly</h2>
        <p>
          Some people hold shares of a foreign company directly — for example, registered in their own name with the company, not through a broker. The IRS comparison says this foreign stock is <strong>not</strong> an FBAR item, but it <strong>is</strong> a specified foreign financial asset for Form 8938, subject to the Form 8938 thresholds and the requirement that you file an income tax return.
        </p>

        <h2>Example</h2>
        <p>
          Hui, a U.S. resident filing as single and living in the U.S., has a Taiwan brokerage account whose maximum value in 2025 was $42,000 (shares plus cash), and she directly holds shares in a Taiwan family company worth $15,000 that are not in any account. For the FBAR, she reports the brokerage account (over $10,000), but not the directly held shares. For Form 8938, both items count, so her specified foreign financial assets reached $57,000. As a single filer living in the U.S., she must file Form 8938 if their total was more than $50,000 on the last day of the year or more than $75,000 at any time during the year — so she checks her year-end values. If required, the brokerage account is reported as an account and the directly held shares are reported as a separate asset.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Reporting is separate from income tax</div>
          <p>Dividends and gains from foreign investments are taxable income for U.S. citizens and residents, reported on your tax return. Foreign mutual funds and similar pooled funds may be passive foreign investment companies (PFICs) with their own complex rules and Form 8621. This guide does not cover those rules — get professional help if you hold foreign funds.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '44',
  title:         'My foreign bank account earned no interest — do I still need to report it?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individual U.S. citizens and resident aliens with foreign accounts that earned little or no income. It separates account reporting (FBAR, Form 8938) from income reporting on the tax return',
  persona:       ['People with checking accounts abroad that pay no interest', 'Anyone keeping a dormant account in Taiwan or China', 'New immigrants who kept a home-country account', 'Parents\' accounts that list an adult child'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Treat two questions separately. Account reporting (FBAR, and possibly Form 8938) depends on account values and thresholds — not on whether the account earned interest. Income reporting depends on whether the account actually produced income.',
  sources: [
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Schedule B (Form 1040), Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: 'My Taiwan checking account pays zero interest. Do I still need an FBAR?',
    a: 'Possibly. The FBAR depends on whether the aggregate value of your foreign financial accounts exceeded $10,000 at any time during the year — not on whether they earned interest.',
  },
  {
    q: 'If there is no income, is there anything to put on my tax return?',
    a: 'Possibly. Schedule B, Part III asks whether you had a financial interest in or signature authority over a foreign financial account at any time during the year. The Schedule B instructions say to answer that question even if you are not required to file an FBAR.',
  },
  {
    q: 'Can Form 8938 apply to an account that produces no income?',
    a: 'Yes, if its requirements are otherwise met. Form 8938 depends on the value of your specified foreign financial assets compared with your threshold, and on whether you must file an income tax return — not on whether the assets produced income that year.',
  },
  {
    q: 'My account earned a tiny amount of interest. Does it matter?',
    a: 'Yes. U.S. citizens and residents report worldwide income, including small amounts of foreign interest, converted to U.S. dollars. That is separate from the FBAR.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'The aggregate test that actually decides whether you file.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'Income tax, FBAR, and Form 8938 for one account, step by step.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Two separate tests with different thresholds.',
  },
]

export default function ForeignAccountNoInterestPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Account With No Interest: Do I Still File an FBAR? | AskLinTax',
      description: 'No interest does not mean no FBAR. Account reporting (FBAR, Form 8938) depends on account value; income reporting depends on what the account earned. How the two differ, with examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Yes, you may still need to report it. <strong>"No income" does not mean "no FBAR."</strong> The FBAR depends on the <strong>value</strong> of your foreign financial accounts — whether their aggregate value exceeded $10,000 at any time during the year — not on whether they earned interest.
        </p>
        <p>
          It helps to separate two kinds of reporting that people often mix up:
        </p>

        <ArticleTable
          head={['', 'Account reporting', 'Income reporting']}
          rows={[
            ['What it covers', 'The existence and value of foreign accounts', 'Income the accounts earned (interest, dividends, gains)'],
            ['Where', 'FBAR (with FinCEN); Form 8938 (with the tax return); Schedule B, Part III question', 'Your income tax return'],
            ['Triggered by', 'Account values and thresholds', 'Actual income earned while you were a U.S. citizen or resident'],
            ['Zero-interest account', 'Can still be required', 'Nothing to report as interest if none was earned'],
          ]}
        />

        <h2>Account reporting: FBAR</h2>
        <p>
          If the maximum values of all your foreign financial accounts add up to more than $10,000 at any time during the calendar year, you file an FBAR — including accounts that paid no interest at all. See <a href="/library/investment/fbar-10000-rule/">How the $10,000 rule really works</a>.
        </p>

        <h2>Account reporting: Form 8938</h2>
        <p>
          Form 8938 can also apply to assets that produced no income that year, if your specified foreign financial assets exceed your threshold and you are required to file an income tax return. Its thresholds are much higher than the FBAR's. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.
        </p>

        <h2>The Schedule B question</h2>
        <p>
          If you file Schedule B, Part III asks whether you had a financial interest in or signature authority over a foreign financial account at any time during the year. Answer it based on the account — the Schedule B instructions say to answer "Yes" even if you are not required to file an FBAR.
        </p>

        <h2>Income reporting: only what was actually earned</h2>
        <p>
          U.S. citizens and residents are taxed on worldwide income. If the account earned interest — even a small amount — you report it in U.S. dollars on your tax return. If it truly earned nothing, there is no interest to report. Either way, that answer does not change the FBAR question.
        </p>

        <h2>Example</h2>
        <p>
          Ben keeps a Taiwan checking account that pays no interest. It peaked at the equivalent of $14,000 in 2025. He has no other foreign accounts. Result: no foreign interest to report on his tax return, but the account exceeded $10,000, so he files an FBAR and answers "Yes" to the Schedule B foreign-account question. His foreign assets are well below the Form 8938 threshold.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A common misconception</div>
          <p>"My account didn't make any money, so the IRS doesn't care about it" is one of the most common reasons people miss FBARs. If you have already missed one, see <a href="/library/investment/late-fbar/">I forgot to file an FBAR — what should I do?</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

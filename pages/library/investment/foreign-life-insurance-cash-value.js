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
  id:            '47',
  title:         'Foreign life insurance with cash value: is it reportable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers whether foreign-issued life insurance and annuity contracts with a cash value are reported on the FBAR and Form 8938. It does not cover how such policies are taxed, policies without a cash value, or the treatment of premiums, surrender, or death benefits',
  persona:       ['People with a savings-type life insurance policy (儲蓄險) from Taiwan, Hong Kong, or China', 'Owners of foreign annuity contracts', 'New immigrants who kept policies bought before moving', 'Parents who bought policies for their children abroad'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Check whether your foreign policy has a cash value (a value you could receive by surrendering it). If it does, treat it as a foreign financial account for the FBAR aggregate test and as a possible Form 8938 asset. Keep the insurer\'s statements showing the cash value.',
  sources: [
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'eCFR — 31 CFR 1010.350, Reports of foreign financial accounts (other financial account)', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Internal Revenue Manual 4.26.16, Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/instructions/i8938' },
  ],
}

const FAQS = [
  {
    q: 'My Taiwan savings insurance (儲蓄險) has a surrender value. Does it count for the FBAR?',
    a: 'A foreign insurance or annuity policy with a cash value is a reportable "other financial account" under the FBAR regulation. If it has a cash value, include it in your FBAR aggregate test.',
  },
  {
    q: 'What value do I use for the policy?',
    a: 'IRS guidance treats the cash value of the policy as the account value. For the FBAR, use the maximum value during the year as a reasonable approximation, converted at the Treasury rate for the last day of the year.',
  },
  {
    q: 'The policy hasn\'t paid me anything yet. Do I still report it?',
    a: 'IRS guidance says there need be no current payment of an income stream to trigger reporting of a policy with a cash value. Reporting depends on the cash value, not on payments to you.',
  },
  {
    q: 'What about term insurance with no cash value?',
    a: 'The official guidance reviewed for this guide describes reportable policies as those with a cash value. It does not address every kind of policy, so if you are unsure whether yours has a cash value, ask the insurer or a tax professional rather than assuming either way.',
  },
  {
    q: 'Is the policy\'s growth taxable?',
    a: 'This guide covers reporting only. How a foreign policy is taxed depends on the contract and the tax rules for insurance and annuities — get professional advice.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'Add the policy\'s cash value to your other foreign accounts.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Form 8938 has its own thresholds for the same policy.',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'What is the maximum value of a foreign account for FBAR?',
    desc:  'Valuing the policy and converting it to U.S. dollars.',
  },
]

export default function ForeignLifeInsuranceCashValuePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Life Insurance With Cash Value (儲蓄險): FBAR and Form 8938 | AskLinTax',
      description: 'Foreign-issued life insurance or annuity contracts with a cash value are reportable on both the FBAR and Form 8938. What counts, how the cash value is used, and what this guide does not cover.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you own a <strong>foreign-issued life insurance or annuity contract with a cash value</strong>, it is reportable for U.S. purposes. The IRS comparison of the two forms lists it as reported on <strong>both</strong> the FBAR and Form 8938, subject to each form's threshold. This often surprises people with savings-type policies (儲蓄險) bought in Taiwan, Hong Kong, or China.
        </p>
        <p>
          The key words are <strong>"with a cash value."</strong> This guide does not treat every foreign insurance policy as reportable.
        </p>

        <ArticleTable
          head={['Foreign policy', 'FBAR', 'Form 8938']}
          rows={[
            ['Life insurance or annuity contract with a cash value, issued by a foreign company', 'Reportable — an "other financial account"', 'Reportable — a specified foreign financial asset'],
            ['Policy without a cash value', 'Not addressed in the official guidance reviewed here', 'Not addressed in the official guidance reviewed here'],
          ]}
        />

        <h2>Why a policy can be an "account"</h2>
        <p>
          The FBAR regulation includes in "other financial account" an account that is an <strong>insurance or annuity policy with a cash value</strong>. IRS guidance adds two practical points:
        </p>
        <ul>
          <li>The <strong>cash value</strong> of the policy is considered the account value.</li>
          <li>There need be <strong>no current payment</strong> of an income stream to trigger reporting.</li>
        </ul>

        <h2>How it fits into your FBAR</h2>
        <p>
          Add the policy's maximum value for the year to your other foreign accounts for the $10,000 aggregate test. If you must file, report the policy as one of your foreign financial accounts. See <a href="/library/investment/fbar-10000-rule/">How the $10,000 rule really works</a> and <a href="/library/investment/fbar-maximum-account-value/">maximum account value</a>.
        </p>

        <h2>Example</h2>
        <p>
          Wen, a U.S. resident, has a Taiwan bank account with a maximum value of $7,000 and a savings-type life insurance policy from a Taiwan insurer whose cash value was $9,000 during the year. The two together are $16,000, so Wen files an FBAR that includes both the bank account and the policy. Her foreign assets are below the Form 8938 threshold for her filing status.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ What this guide does not decide</div>
          <p>This guide covers <strong>reporting</strong>. It does not cover how a foreign policy is taxed, how premiums, policy loans, surrender, or death benefits are treated, or whether a particular contract qualifies as life insurance under U.S. tax rules. Those questions depend on the specific contract — get professional advice, especially before surrendering or changing a policy.</p>
        </div>

        <h2>Records to keep</h2>
        <ul>
          <li>The policy contract and the insurer's name and address</li>
          <li>Annual statements showing the cash (surrender) value</li>
          <li>The exchange rate used to convert the value to U.S. dollars</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

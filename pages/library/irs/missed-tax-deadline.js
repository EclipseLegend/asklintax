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
  id:            '53',
  title:         'I missed the tax deadline — what happens now?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers a required federal individual income tax return that was not filed by its deadline. Late FBARs and late Form 3520 have separate rules and their own guides; state returns and business returns are outside this guide',
  persona:       ['People who missed the April deadline', 'Taxpayers with one or more past years not filed', 'People who filed an extension but did not pay', 'Anyone who thinks they are owed a refund for an unfiled year'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'File the past-due return as soon as you can, even if you cannot pay the full amount, and pay what you can. Then deal with any balance through an IRS payment option.',
  sources: [
    { label: 'IRS — Filing past due tax returns', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/filing-past-due-tax-returns' },
    { label: 'IRS — Failure to file penalty', url: 'https://www.irs.gov/payments/failure-to-file-penalty' },
    { label: 'IRS — Failure to pay penalty', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
    { label: 'IRS — Collection process for taxpayers filing and or paying late', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/collection-process-for-taxpayers-filing-and-or-paying-late' },
    { label: 'IRS — Automatic Exemption from Penalty: What taxpayers should know', url: 'https://www.irs.gov/newsroom/automatic-exemption-from-penalty-what-taxpayers-should-know' },
    { label: 'IRS — Administrative penalty relief', url: 'https://www.irs.gov/payments/administrative-penalty-relief' },
  ],
}

const FAQS = [
  {
    q: 'I filed an extension. Do I still owe a penalty?',
    a: 'An extension gives you more time to file, not more time to pay. If you did not pay the tax you owed by the original due date, a failure-to-pay penalty and interest can still apply, even though your return is not late.',
  },
  {
    q: 'I can\'t pay what I owe. Should I wait to file?',
    a: 'No. File as soon as you can and pay what you can. The failure-to-file penalty is generally larger than the failure-to-pay penalty, so filing stops the larger one from growing. Then see "I can\'t pay my tax bill — what are my options?"',
  },
  {
    q: 'I think I\'m owed a refund for a year I never filed. Is it too late?',
    a: 'Possibly not, but there is a limit. IRS guidance generally gives you a 3-year window to claim a refund on a past-due return. After that, the refund can be lost.',
  },
  {
    q: 'If I don\'t owe any tax, is there any problem with filing late?',
    a: 'The percentage-based failure-to-file penalty is figured on unpaid tax, so it works differently when there is no balance. But that does not mean there can be no consequence — for example, a refund you are owed can expire if you wait too long, and a required return still needs to be filed.',
  },
  {
    q: 'What is the Automatic Exemption from Penalty?',
    a: 'The IRS began phasing in the Automatic Exemption from Penalty (AEP) in 2026. It applies to eligible original returns beginning with tax year 2025 (and eligible 2026 quarterly returns), for taxpayers who meet the IRS eligibility requirements, including a history of timely filing and payment. During the transition, First Time Abate may still apply to certain returns; for eligible original returns with original due dates on or after January 1, 2027, AEP replaces First Time Abate. AEP is penalty relief only — it does not remove the tax you owe, and not every penalty or taxpayer qualifies.',
  },
]

const RELATED = [
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'Payment plans and other options once your return is filed.',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Check whether a return was actually required for that year.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'If the IRS has already written to you about an unfiled return.',
  },
]

export default function MissedTaxDeadlinePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Missed the Tax Deadline? Late Filing Penalties and Next Steps | AskLinTax',
      description: 'Did not file your federal tax return on time? How the failure-to-file and failure-to-pay penalties work, why you should file now even if you cannot pay, refunds for past years, and IRS penalty relief.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you missed the deadline for a required federal income tax return — this year's, or one from last year or earlier that you didn't file — <strong>file it as soon as you can — even if you cannot pay the full amount</strong>. Penalties and interest are generally based on what you owe and how long it stays unfiled or unpaid, so acting sooner limits them. If you are owed a refund instead, filing late can still matter, because refund claims expire.
        </p>
        <p>
          This guide covers federal income tax returns. A late FBAR or a late Form 3520 has its own rules — see <a href="/library/investment/late-fbar/">I forgot to file an FBAR</a> and <a href="/library/investment/late-form-3520/">I filed Form 3520 late</a>.
        </p>

        <h2>Filing late and paying late are different penalties</h2>
        <ArticleTable
          head={['', 'Failure-to-file penalty', 'Failure-to-pay penalty']}
          rows={[
            ['When it applies', 'The return was not filed by its due date (including extensions)', 'The tax was not paid by the due date'],
            ['General rate', '5% of the unpaid tax for each month or part of a month the return is late', '0.5% of the unpaid tax for each month or part of a month it remains unpaid'],
            ['General maximum', '25%', '25%'],
          ]}
        />
        <p>
          When both penalties apply in the same month, IRS rules reduce the combined monthly amount — you do not simply add 5% and 0.5% together. <strong>Interest</strong> can also accrue on unpaid tax, separately from the penalties.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ An extension to file is not an extension to pay</div>
          <p>An extension moves the filing deadline, not the payment deadline. Tax that is not paid by the original due date can still be charged the failure-to-pay penalty and interest.</p>
        </div>

        <h2>Why filing now matters even if you cannot pay</h2>
        <p>
          The failure-to-file penalty is generally much larger per month than the failure-to-pay penalty. Filing stops the larger penalty from growing; you can then deal with the balance through an IRS payment option. See <a href="/library/irs/cant-pay-tax-bill/">I can't pay my tax bill — what are my options?</a>
        </p>

        <h2>If you do not owe anything</h2>
        <p>
          The percentage-based failure-to-file penalty is figured on <strong>unpaid tax</strong>, so it works differently when there is no balance due. That does not mean there can never be a consequence. If you are owed a refund, IRS guidance generally gives you a <strong>3-year window</strong> to claim it from a past-due return; after that, the refund can be lost. A return that was required still needs to be filed.
        </p>

        <h2>If you do not file at all</h2>
        <p>
          The IRS may eventually prepare a <strong>substitute return</strong> for you and propose an assessment based on the information it has. A substitute return may not include deductions or credits you are entitled to. Even then, the IRS says it is in your best interest to file your own return.
        </p>

        <h2>Penalty relief: what changed in 2026</h2>
        <p>
          For years, the main administrative relief for a first penalty was <strong>First Time Abate</strong>, which taxpayers with a good compliance history could request. The IRS began phasing in the <strong>Automatic Exemption from Penalty (AEP)</strong> in 2026. AEP applies to eligible original returns beginning with tax year 2025 and to eligible 2026 quarterly returns, and the IRS applies it automatically — without a separate request — when the taxpayer meets its eligibility requirements, including a history of timely filing and payment in prior years. During the transition, First Time Abate may still apply to certain returns. For eligible original returns with original due dates on or after <strong>January 1, 2027</strong>, AEP replaces First Time Abate.
        </p>
        <p>
          Keep its limits in mind: not every taxpayer, return, or penalty qualifies; AEP is relief from certain penalties, not from the tax itself; and interest on unpaid tax can still apply. Check the IRS AEP and administrative penalty relief pages for how it applies to your return.
        </p>
        <p>
          Separately, the IRS penalty pages describe relief when you can show <strong>reasonable cause</strong> for filing or paying late.
        </p>

        <h2>Example</h2>
        <p>
          Sam did not file his return by the deadline and owes $3,000. Each month he waits, the failure-to-file penalty grows on the unpaid tax, along with the failure-to-pay penalty and interest. He files as soon as he can, pays $1,000 with the return, and sets up a payment option for the rest — which stops the failure-to-file penalty from growing further while the remaining balance is paid down.
        </p>

        <h2>Before you file</h2>
        <ul>
          <li>Confirm the return was actually required — see <a href="/library/individual/do-i-need-to-file/">Do I need to file a U.S. tax return?</a></li>
          <li>Gather your W-2s, 1099s, and other records for that year. If you are missing them, the IRS can provide wage and income information.</li>
          <li>Use the tax forms and instructions for the year you are filing, not the current year.</li>
          <li>If you have received IRS letters about the unfiled return, respond to them — see <a href="/library/irs/irs-notice/">I received an IRS letter</a>.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

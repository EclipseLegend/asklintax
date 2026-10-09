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
  id:            '64',
  title:         'I\'m being audited by the IRS — what happens next?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'A general overview of IRS examinations of individual and small-business income tax returns. It does not predict outcomes or replace professional representation; employment tax, estate, criminal, and collection matters are outside this guide. Always follow the dates and instructions in your own letter',
  persona:       ['Taxpayers who received an IRS examination letter', 'Small business owners asked for records', 'People unsure whether a letter or call is really from the IRS', 'Anyone deciding whether to get representation'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'Confirm the letter is genuine, note the response date printed on it, gather the records it asks for, and respond on time. If you disagree with proposed changes, use the appeal options described in your letter.',
  sources: [
    { label: 'IRS — IRS audits', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/irs-audits' },
    { label: 'IRS — Publication 3498 (Rev. May 2025), The Examination Process', url: 'https://www.irs.gov/pub/irs-pdf/p3498.pdf' },
    { label: 'IRS — Publication 3498-A (Rev. May 2021), The Examination Process (Audits by Mail)', url: 'https://www.irs.gov/pub/irs-pdf/p3498a.pdf' },
    { label: 'IRS — Time IRS can assess tax', url: 'https://www.irs.gov/filing/time-irs-can-assess-tax' },
    { label: 'IRS — Publication 5, Your Appeal Rights and How to Prepare a Protest', url: 'https://www.irs.gov/pub/irs-pdf/p5.pdf' },
    { label: 'IRS — Publication 1, Your Rights as a Taxpayer', url: 'https://www.irs.gov/pub/irs-pdf/p1.pdf' },
    { label: 'IRS — Topic no. 311, Power of attorney information', url: 'https://www.irs.gov/taxtopics/tc311' },
    { label: 'IRS — How to know it\'s the IRS', url: 'https://www.irs.gov/help/how-to-know-its-the-irs' },
    { label: 'IRS — Understanding your CP2000 series notice', url: 'https://www.irs.gov/individuals/understanding-your-cp2000-series-notice' },
    { label: 'IRS — Publication 556, Examination of Returns, Appeal Rights, and Claims for Refund (supplementary)', url: 'https://www.irs.gov/publications/p556' },
  ],
}

const FAQS = [
  {
    q: 'Does being audited mean I did something wrong?',
    a: 'No. The IRS says being selected for examination does not suggest you are dishonest. Returns can be selected by computer screening, by random sample, or because of related returns or documents, and many audits end with no change.',
  },
  {
    q: 'Someone called and said I\'m being audited. Is it real?',
    a: 'Be careful. The IRS notifies you of an audit by mail; it does not start an audit by phone. After you have received a letter, an examiner may call about an audit already under way. If you are unsure, contact the IRS using the information on IRS.gov, not a number given by the caller.',
  },
  {
    q: 'How far back can the IRS audit?',
    a: 'Generally, the IRS includes returns filed within the last three years. If it finds a substantial error, it may add more years, but it usually does not go back more than the last six years.',
  },
  {
    q: 'Can someone else deal with the IRS for me?',
    a: 'Yes. You have the right to representation. An eligible representative, such as a CPA, enrolled agent, or attorney, can act for you with a signed Form 2848. Low Income Taxpayer Clinics can help eligible taxpayers.',
  },
  {
    q: 'Is my CP2000 notice an audit?',
    a: 'No. A CP2000 proposes changes based on information that did not match your return; it is not an audit. It has its own response process — see the CP2000 guide.',
  },
]

const RELATED = [
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 notice: what it means and how to respond',
    desc:  'The mismatch notice that is often mistaken for an audit.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read any IRS letter and spot a scam.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'If an audit ends with tax you cannot pay at once.',
  },
]

export default function IrsAuditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Being Audited by the IRS? What Happens Next | AskLinTax',
      description: 'Received an IRS audit letter? How to confirm it is real, mail vs. in-person audits, what records to gather, how to respond, possible outcomes, appeal rights, and representation.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          An IRS <strong>audit</strong> (also called an examination) is a review of your return to check that income, deductions, and credits are reported correctly. Most audits are handled by mail and focus on a few items. Read the letter carefully, <strong>respond by the date printed on it</strong>, and send copies of the records it asks for. Many audits end with no change; if the IRS proposes changes you disagree with, you have appeal rights.
        </p>
        <p>
          A <strong>CP2000</strong> notice is not an audit — it is a proposed adjustment based on mismatched information. See <a href="/library/irs/cp2000/">CP2000 notice: what it means and how to respond</a>.
        </p>

        <h2>First: is it really the IRS?</h2>
        <ul>
          <li>The IRS notifies you of an audit <strong>by mail</strong>. It does not start an audit by phone, and it does not start contact by email, text, or social media.</li>
          <li>An examiner may call or visit about an audit <strong>after</strong> you have received a letter.</li>
          <li>Threats of immediate arrest, demands for gift cards, or pressure to pay on the spot are signs of a scam.</li>
        </ul>
        <p>
          If in doubt, use the contact information on IRS.gov — see <a href="/library/irs/irs-notice/">I received an IRS letter</a>.
        </p>

        <h2>Types of audits</h2>
        <ArticleTable
          head={['Type', 'How it works']}
          rows={[
            ['Correspondence audit', 'Handled by mail; usually limited to one or two items on the return'],
            ['Office audit', 'An in-person interview at an IRS office'],
            ['Field audit', 'An in-person review at your home, business, or representative\'s office; usually the broadest type'],
          ]}
        />

        <h2>What the IRS may ask for</h2>
        <p>
          The letter lists the items under review and the records to send — for example receipts, bills, canceled checks, statements, or other documents that support income, deductions, or credits. Send <strong>copies</strong>, not originals, and keep a record of what you sent. Generally you should keep the records used to prepare a return for at least three years from when it was filed.
        </p>

        <h2>How far back an audit can go</h2>
        <p>
          Generally, the IRS can include returns filed within the last three years. If it identifies a substantial error, it may add years, but it usually does not go back more than the last six. Separately, the IRS generally has three years from when you filed to assess additional tax, and it may ask you to agree to extend that period while an audit is open.
        </p>

        <h2>How an audit can end</h2>
        <ArticleTable
          head={['Outcome', 'What it generally means']}
          rows={[
            ['No change', 'The IRS accepts the return as filed after reviewing the items'],
            ['Agreed', 'You agree with the proposed changes and sign; any tax due is billed'],
            ['Disagreed', 'You do not agree; you can request a conference with a manager or use your appeal rights'],
          ]}
        />
        <p>
          Some audits even result in a refund. If you owe tax you cannot pay at once, see <a href="/library/irs/cant-pay-tax-bill/">I can't pay my tax bill</a>.
        </p>

        <h2>If you disagree</h2>
        <p>
          The IRS letter that proposes changes explains your options and deadlines. Generally, you can ask for an independent review by the <strong>IRS Independent Office of Appeals</strong>, which is separate from the examiner. If the IRS issues a <strong>notice of deficiency</strong>, that notice explains the time limit for petitioning the U.S. Tax Court. Use the dates in your own letters — Publication 3498 (and Publication 3498-A for audits by mail) and Publication 5 describe the process.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Your rights during an audit</div>
          <p>Publication 1 explains the Taxpayer Bill of Rights, including the right to be informed, the right to challenge the IRS's position, and the right to retain representation. An eligible representative — such as a CPA, enrolled agent, or attorney — can act for you with Form 2848. Low Income Taxpayer Clinics and the Taxpayer Advocate Service can help in some situations.</p>
        </div>

        <h2>When to get professional help</h2>
        <p>
          Consider professional help if the audit is in person, covers a business or several years, involves large amounts, or if you disagree with the proposed changes. This guide explains the general process; it cannot predict how your audit will end.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

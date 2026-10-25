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
  id:            '111',
  title:         'IRS Power of Attorney: Form 2848 vs. Form 8821',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains IRS third-party authorizations for individuals, based on Form 2848 (Rev. January 2021) and its instructions (Rev. September 2021), Form 8821 (Rev. January 2021) and its instructions (Rev. September 2021), Topic No. 311, and the IRS pages on submitting authorizations online and Tax Pro Account reviewed in 2026. It does not cover business entity signers in detail, Form 56 fiduciary notices, or state tax powers of attorney',
  persona:       ['Taxpayers hiring a CPA, enrolled agent, or attorney', 'Families helping a parent or relative with the IRS', 'Taxpayers living abroad', 'People whose lender or adviser needs IRS records'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'Use Form 2848 if you want someone to represent you before the IRS, and Form 8821 if you only want someone to see your tax information. List specific tax forms and years, sign it, and have it submitted online, by fax, or by mail — or approve your representative\'s request in your IRS online account.',
  sources: [
    { label: 'IRS — Instructions for Form 2848 (Rev. September 2021)', url: 'https://www.irs.gov/pub/irs-pdf/i2848.pdf' },
    { label: 'IRS — Instructions for Form 8821 (Rev. September 2021)', url: 'https://www.irs.gov/pub/irs-pdf/i8821.pdf' },
    { label: 'IRS — Topic no. 311, Power of attorney information', url: 'https://www.irs.gov/taxtopics/tc311' },
    { label: 'IRS — Submit Forms 2848 and 8821 online', url: 'https://www.irs.gov/tax-professionals/submit-forms-2848-and-8821-online' },
    { label: 'IRS — Tax Pro Account', url: 'https://www.irs.gov/tax-professionals/tax-pro-account' },
    { label: 'IRS — About Form 2848', url: 'https://www.irs.gov/forms-pubs/about-form-2848' },
  ],
}

const FAQS = [
  {
    q: 'Can a family member represent me before the IRS?',
    a: 'Yes, in many cases. Form 2848 lists "family member" as an eligible designation: a spouse, parent, child, brother, sister, grandparent, grandchild, step-parent, step-child, step-brother, or step-sister. If you only want a relative to see your information or call about it, Form 8821 is enough.',
  },
  {
    q: 'My spouse and I filed jointly. Can we use one Form 2848?',
    a: 'No. Each spouse must submit a separate Form 2848, even if you name the same representative. The IRS online submission page also says to submit one form at a time, even for married couples filing jointly.',
  },
  {
    q: 'Can I write "all years" on the form?',
    a: 'No. You must list the specific tax form and years or periods. The IRS returns forms with general references such as "All years" or "All taxes." You can list past years, the current year, and future years, but the IRS will not record future years more than 3 years after December 31 of the year it receives the form.',
  },
  {
    q: 'Will a new Form 2848 cancel my old one?',
    a: 'Generally, yes, for the same matters. When the IRS records a new power of attorney on the CAF, it generally revokes earlier ones for the same matters. To keep a prior authorization, check the retention box on line 6 and attach a copy of the one you want to keep. The same rule applies to Form 8821.',
  },
  {
    q: 'Can my representative sign my tax return?',
    a: 'Only in limited situations: disease or injury, continuous absence from the United States for at least 60 days before the filing deadline, or specific IRS permission for other good cause. You must check the box on line 5a and add the required statement.',
  },
  {
    q: 'Can someone with Form 8821 get my refund?',
    a: 'No. The Form 8821 instructions say a designee can never endorse or negotiate your refund check or receive your refund by direct deposit.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'When it may help to have a representative respond.',
  },
  {
    href: '/library/irs/irs-audit',
    cat:  'IRS & Tax Issues',
    title: 'I\'m being audited by the IRS — what happens next?',
    desc:  'Representation during an examination.',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy',
    desc:  'Another way to share your IRS records.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'A representative can apply for a payment plan for you.',
  },
]

export default function IrsPowerOfAttorneyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Power of Attorney: Form 2848 vs. Form 8821 | AskLinTax',
      description: 'Form 2848 lets someone represent you before the IRS; Form 8821 only lets them see your tax information. Who can represent you, limited rights for return preparers, joint returns, online submission, Tax Pro Account, and revoking an authorization.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The IRS will not discuss your tax account with someone else unless you authorize it. <strong>Form 2848, Power of Attorney and Declaration of Representative</strong>, lets an eligible person <strong>represent</strong> you — speak for you, argue your position, and act on your behalf. <strong>Form 8821, Tax Information Authorization</strong>, only lets a person or organization <strong>see and receive</strong> your tax information. If you want help resolving a problem, you usually need Form 2848; if someone only needs your records, Form 8821 is enough.
        </p>

        <h2>Representation vs. information access</h2>
        <ArticleTable
          head={['', 'Form 2848 (power of attorney)', 'Form 8821 (tax information authorization)']}
          rows={[
            ['What it allows', 'Represent you before the IRS, including inspecting and receiving your tax information', 'Inspect and receive your tax information only'],
            ['Who can be named', 'Only individuals eligible to practice before the IRS', 'Any individual, corporation, firm, organization, or partnership'],
            ['Speak for you or argue your case', 'Yes', 'No'],
            ['Sign agreements, waivers, or consents', 'Yes, within the authority granted', 'No'],
            ['Add or substitute another person', 'Only if you authorize it on line 5a', 'No'],
            ['Receive your refund', 'No', 'No'],
          ]}
        />

        <h2>Who can represent you on Form 2848</h2>
        <ul>
          <li><strong>Full representation:</strong> attorneys, certified public accountants (CPAs), and enrolled agents, as well as enrolled actuaries and enrolled retirement plan agents within their areas.</li>
          <li><strong>Family members:</strong> a spouse, parent, child, brother, sister, grandparent, grandchild, step-parent, step-child, step-brother, or step-sister.</li>
          <li><strong>Qualifying students and law graduates</strong> working in a Low Income Taxpayer Clinic or Student Tax Clinic Program, with Taxpayer Advocate Service permission.</li>
          <li><strong>Unenrolled return preparers — limited rights only:</strong> they may represent you only during an examination of a return they prepared and signed, and only before revenue agents, customer service staff, and similar employees (including the Taxpayer Advocate Service). They cannot represent you before Appeals, revenue officers, or IRS Chief Counsel, and cannot sign agreements, waivers, or refund claims for you. For returns prepared after 2015, they also need an Annual Filing Season Program Record of Completion.</li>
        </ul>
        <p>
          If a preparer does not meet these requirements, you can still use Form 8821 so the preparer can see your information — but that does not let them represent you.
        </p>

        <h2>How to fill it out correctly</h2>
        <ul>
          <li><strong>Your information:</strong> name, SSN or ITIN, and address. The address on the form does not change your address with the IRS; use Form 8822 for that.</li>
          <li><strong>Specific matters:</strong> list the type of tax (for example, income), the form number (for example, 1040), and each year. General references like "All years" are rejected.</li>
          <li><strong>Future years:</strong> allowed, but the IRS will not record years more than 3 years after December 31 of the year it receives the form.</li>
          <li><strong>Copies of notices:</strong> check the box under a representative's name if you want them to get copies; no more than two representatives or designees can receive copies for the same matter.</li>
          <li><strong>Signatures:</strong> you sign Part I; each representative signs the Part II declaration. A Form 2848 with an electronic signature may only be submitted online, and the submitter must authenticate your identity if you signed remotely.</li>
          <li><strong>Joint returns:</strong> each spouse files a separate form.</li>
        </ul>

        <h2>How it gets to the IRS</h2>
        <ArticleTable
          head={['Method', 'What to know']}
          rows={[
            ['Tax Pro Account (representative starts it)', 'Real-time processing for individuals. An attorney, CPA, enrolled agent, enrolled actuary, or enrolled retirement plan agent can request a power of attorney; anyone can request a tax information authorization. You approve the request in your IRS online account.'],
            ['Online upload', 'The form is uploaded at IRS.gov/Submit2848 or IRS.gov/Submit8821. Submit one form at a time; do not also fax or mail it.'],
            ['Fax or mail', 'Send it to the CAF unit listed in the instructions, or to the IRS office handling a specific matter if you checked line 4.'],
          ]}
        />
        <p>
          Most authorizations are recorded on the IRS <strong>Centralized Authorization File (CAF)</strong>, which lets IRS employees confirm who can act for you. A representative gets a nine-digit CAF number with their first authorization. Tax Pro Account requests to individuals require an address in a U.S. state or D.C. that matches IRS records. A Form 8821 used for a purpose other than resolving a tax matter, such as income verification for a lender, must reach the IRS within 120 days of your signature.
        </p>

        <h2>Revoking or withdrawing</h2>
        <ul>
          <li><strong>New authorization:</strong> filing a new form for the same matters generally revokes the earlier one on the CAF, unless you check the retention box and attach a copy of the authorization you want to keep.</li>
          <li><strong>Revoking without naming someone new:</strong> write "REVOKE" across the top of the first page of a copy, sign and date it, and send it where the original went. Without a copy, send a signed statement listing the matters, years, and each representative being revoked.</li>
          <li><strong>Representative withdrawing:</strong> the representative writes "WITHDRAW" on a copy, signs and dates it, and sends it the same way. Tax Pro Account also lets representatives withdraw.</li>
        </ul>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Mei', 'David', 'Ana']}
          rows={[
            ['Situation', 'Received a CP2000 notice and hired an enrolled agent to respond', 'Lives abroad; wants his sister in the U.S. to call the IRS about a missing refund', 'Mortgage lender wants her IRS records'],
            ['Form', 'Form 2848 naming the enrolled agent for income tax, Form 1040, for the year of the notice', 'Form 2848 naming his sister as a family member — or Form 8821 if she only needs information', 'Form 8821 naming the lender or its verification service, received within 120 days of signing'],
            ['Joint return?', 'Yes — her husband files his own Form 2848', 'No', 'No'],
          ]}
        />

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Using Form 8821</strong> when you need someone to negotiate or argue for you.</li>
          <li><strong>Writing "all years"</strong> or leaving out the form number.</li>
          <li><strong>One form for both spouses</strong> on a joint return.</li>
          <li><strong>Accidentally revoking</strong> an existing representative by filing a new form without the retention box.</li>
          <li><strong>Sending the same form</strong> online and by fax or mail.</li>
          <li><strong>Giving your IRS online account login</strong> to someone instead of authorizing them properly.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Authorizing someone does not end your responsibility</div>
          <p>You remain responsible for your tax obligations even with a representative. Check that the person you authorize is eligible, and keep copies of every form you sign.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

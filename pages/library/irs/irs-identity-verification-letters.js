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
  id:            '132',
  title:         'IRS Identity Verification Letters: CP5071, 4883C, 5747C, and Held Refunds',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains IRS identity and tax return verification notices, based on the IRS pages Understanding your CP5071 series notice (updated March 2026), Understanding your letter 4883C (updated July 2026), Understanding your letter 5747C (updated May 2026), Understanding your CP5447 series notice (updated June 2026), and Verify your return (updated August 2026). Letter names and verification methods change; always follow the specific notice you received. It does not cover business identity theft, Form 14039 procedures in detail, or state tax agency verification',
  persona:       ['Anyone who received an IRS letter asking them to verify their identity', 'People whose refund is on hold', 'Taxpayers who think someone filed a return in their name', 'Family members and preparers helping someone respond'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'Find the notice number in the corner of your letter and follow that notice\'s instructions — online verification only for the notices that offer it, the Taxpayer Protection Program hotline for Letter 4883C, and an in-person appointment for Letter 5747C. Have the return for the year on the letter, a prior-year return if available, and supporting documents ready. If you did not file the return, say so.',
  sources: [
    { label: 'IRS — Understanding your CP5071 series notice', url: 'https://www.irs.gov/individuals/understanding-your-cp5071-series-notice' },
    { label: 'IRS — Understanding your letter 4883C', url: 'https://www.irs.gov/individuals/understanding-your-letter-4883c' },
    { label: 'IRS — Understanding your letter 5747C', url: 'https://www.irs.gov/individuals/understanding-your-letter-5747c' },
    { label: 'IRS — Understanding your CP5447 series notice', url: 'https://www.irs.gov/individuals/understanding-your-cp5447-series-notice' },
    { label: 'IRS — Verify your return', url: 'https://www.irs.gov/identity-theft-fraud-scams/identity-and-tax-return-verification-service' },
  ],
}

const FAQS = [
  {
    q: 'Why did the IRS send me a letter asking me to verify my identity?',
    a: 'A Form 1040-series return was filed under your Social Security number or ITIN, and the IRS wants to confirm that you are the person who filed it before it continues processing. If you did not file a return, the letter is how you tell the IRS — you may be a victim of identity theft.',
  },
  {
    q: 'Is Letter 5071C still used?',
    a: 'The IRS now groups it in the CP5071 series, which includes CP5071, 5071C, and CP5071F. Its separate 5071C information page now leads to the CP5071 series page. Follow whatever your notice tells you to do.',
  },
  {
    q: 'Can I verify online?',
    a: 'Only if your notice allows it. The IRS Verify your return service says to use it only if you received a CP5071 series notice or Letter 5447C. Letter 4883C asks you to call the Taxpayer Protection Program hotline on your letter, and Letter 5747C asks you to schedule an in-person appointment.',
  },
  {
    q: 'How long until I get my refund after I verify?',
    a: 'The IRS gives estimates, not guarantees. After using the online Verify your return service, it says to wait 2 to 3 weeks before checking your refund and that processing may take up to 9 weeks. For Letters 4883C and 5747C it says processing may take up to 9 weeks. If the IRS finds other problems, it will contact you again, which can add more time.',
  },
  {
    q: 'Can my tax preparer or a family member verify for me?',
    a: 'Partly. For Letter 4883C, an authorized representative can call for you only if the IRS has a completed Form 2848 on file; without one, you and the helper must call together and you must take part. For Letter 5747C, a representative can come, but you must be present at the appointment to verify your identity. A fiduciary uses Form 56.',
  },
  {
    q: 'Do I also need to file Form 14039 or get an IP PIN?',
    a: 'The IRS says that if you verify your return, you do not need to file Form 14039, Identity Theft Affidavit, unless it tells you to. An Identity Protection PIN is a separate, optional step that helps prevent someone else from filing with your number in the future.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-identity-theft-ip-pin',
    cat:  'IRS & Tax Issues',
    title: 'IRS Identity Theft and the IP PIN: How to Protect Your Tax Return',
    desc:  'How to get an IP PIN and what to do about identity theft.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to find the notice number and confirm a letter is real.',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS Power of Attorney: Form 2848 vs. Form 8821',
    desc:  'When a representative needs Form 2848.',
  },
  {
    href: '/library/irs/refund-offsets',
    cat:  'IRS & Tax Issues',
    title: 'Refund Offsets: When the IRS or Treasury Takes Your Refund',
    desc:  'If your refund arrives but is smaller than expected.',
  },
]

export default function IrsIdentityVerificationLettersPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Identity Verification Letters: CP5071, 4883C, 5747C, and Held Refunds | AskLinTax',
      description: 'What IRS identity verification letters mean — the CP5071 series, Letters 4883C and 5747C, and the CP5447 series — how each one asks you to verify (online, by phone, or in person), what to have ready, what to do if you did not file, representatives, and refund timing.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When a return filed under your Social Security number or ITIN looks like it could be identity theft, the IRS <strong>holds the return</strong> and mails a letter asking you to <strong>verify your identity and the return</strong>. Until you respond, the IRS says it cannot process the return or issue the refund. Each letter type tells you <strong>how</strong> to verify — online, by phone, or in person — so follow the notice you actually received.
        </p>

        <h2>Which letter did you get?</h2>
        <ArticleTable
          head={['Notice', 'How the IRS asks you to verify', 'Notes']}
          rows={[
            ['CP5071 series (CP5071, 5071C, CP5071F)', 'Follow the notice. If it offers online verification, start at irs.gov/verifyreturn', 'The IRS renamed its 5071C page to the CP5071 series'],
            ['CP5447 series (CP5447, 5447C, CP5447F)', 'Follow the notice. Online verification is available for Letter 5447C; if you cannot verify online, the IRS says you can verify by phone, by mail, or with the Document Upload Tool as your notice instructs', 'The Verify your return service names Letter 5447C, not the other CP5447 notices'],
            ['Letter 4883C', 'Call the Taxpayer Protection Program hotline shown on the letter', 'If you cannot verify by phone, the IRS will ask you to verify in person at a local IRS office'],
            ['Letter 5747C', 'Call the number on the letter to schedule an in-person appointment at a Taxpayer Assistance Center', 'If you did not file, call the Taxpayer Protection Program hotline on the letter instead'],
          ]}
        />
        <p>
          The phone numbers on these letters are for identity and return verification only. The IRS says other account information, such as refund status, may not be available there.
        </p>

        <h2>Four different things — do not mix them up</h2>
        <ul>
          <li><strong>Verifying your identity</strong> proves you are the person whose number is on the return.</li>
          <li><strong>Verifying the return</strong> confirms that the return the IRS received is the one you filed, so it can be processed.</li>
          <li><strong>Reporting an unrecognized return:</strong> if you did not file, use the same notice to tell the IRS. You may be a victim of identity theft.</li>
          <li><strong>Getting an IP PIN</strong> is a separate, optional step that helps prevent future fraudulent returns; see <a href="/library/irs/irs-identity-theft-ip-pin/">identity theft and the IP PIN</a>.</li>
        </ul>

        <h2>What to have ready</h2>
        <ul>
          <li>The letter itself.</li>
          <li>The Form 1040-series return for the year on the letter. Forms W-2 and 1099 are not tax returns. If you do not have a copy, check your tax software or ask your preparer.</li>
          <li>A prior-year return, if you filed one and have it.</li>
          <li>Supporting documents for each return, such as Forms W-2 and 1099 and Schedules C or F.</li>
          <li><strong>For a Letter 5747C appointment:</strong> a valid government-issued photo ID, plus at least one more document from the IRS list — for example a second government ID, a Social Security card, a mortgage statement or lease with your current address, a car title, a voter registration card, a utility bill matching the address on your ID, a birth certificate, or current school records.</li>
        </ul>

        <h2>Representatives and special situations</h2>
        <ul>
          <li><strong>Letter 4883C:</strong> a representative can call on your behalf only with a completed Form 2848 on file. Otherwise, you and the helper must call together and you must take part. See <a href="/library/irs/irs-power-of-attorney-2848-8821/">Form 2848 vs. Form 8821</a>.</li>
          <li><strong>Letter 5747C:</strong> a representative can attend, but you must be present to verify your identity.</li>
          <li><strong>Fiduciaries</strong> acting for an individual, a decedent's estate, or a trust file Form 56.</li>
          <li><strong>Under age 18:</strong> the online service tells you to contact the IRS instead.</li>
        </ul>

        <h2>After you verify</h2>
        <p>
          The IRS gives estimates, not promises. After the online Verify your return service, it says to wait <strong>2 to 3 weeks</strong> before checking your refund and that it may take <strong>up to 9 weeks</strong> to process the return. For Letters 4883C and 5747C, it also says processing may take up to 9 weeks. If the IRS finds other problems with the return, it will contact you again, and that can delay the refund further. If you do not respond, the IRS says it cannot process the return, issue a refund, or credit an overpayment.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Only use official IRS channels</div>
          <p>Scammers imitate these letters. Use the phone number printed on your notice, the IRS Verify your return service on IRS.gov, or an appointment you schedule through the number on the letter. Do not use links or phone numbers from unsolicited emails, texts, or social media messages. See <a href="/library/irs/irs-notice/">how to check that an IRS letter is real</a>.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

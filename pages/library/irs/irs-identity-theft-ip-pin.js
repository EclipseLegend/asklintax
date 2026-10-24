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
  id:            '105',
  title:         'IRS Identity Theft and the IP PIN: How to Protect Your Tax Return',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains tax-related identity theft and the IRS Identity Protection PIN (IP PIN) program, based on the IRS IP PIN page and IP PIN FAQs, the IRS identity theft guide for individuals, and IRS pages on scams and on how the IRS contacts taxpayers, as reviewed in 2026. IRS procedures, phone numbers, and income limits change; check the IRS pages before acting. It does not cover business identity theft, credit freezes, or state tax agencies',
  persona:       ['Anyone who wants to stop others from filing a return in their name', 'People whose e-filed return was rejected', 'Parents worried about a child\'s SSN being misused', 'People who received a suspicious call, text, or letter about taxes'],
  relatedJourney: ['Got an IRS letter', 'New to the U.S.'],
  actionRequired: 'Get an IP PIN through your IRS online account (or Form 15227 or an in-person visit), enter it on every federal Form 1040-series return you file that year, and if you suspect tax-related identity theft, follow the instructions in any IRS letter before filing Form 14039.',
  sources: [
    { label: 'IRS — Get an identity protection PIN', url: 'https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin' },
    { label: 'IRS — Frequently asked questions about the IP PIN', url: 'https://www.irs.gov/identity-theft-fraud-scams/frequently-asked-questions-about-the-identity-protection-personal-identification-number-ip-pin' },
    { label: 'IRS — Identity theft guide for individuals', url: 'https://www.irs.gov/identity-theft-central/identity-theft-guide-for-individuals' },
    { label: 'IRS — How to know it\'s the IRS', url: 'https://www.irs.gov/help/how-to-know-its-the-irs' },
    { label: 'IRS — Recognize tax scams and fraud', url: 'https://www.irs.gov/help/tax-scams/recognize-tax-scams-and-fraud' },
    { label: 'IRS — Form 14039 (Rev. 2-2026), Identity Theft Affidavit', url: 'https://www.irs.gov/pub/irs-pdf/f14039.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does an IP PIN stop all identity theft?',
    a: 'No. The IRS says an IP PIN keeps someone else from filing a federal return with your SSN or ITIN. It does not protect your bank or credit accounts, your IRS online account password, your state tax return, or your information in a data breach. Keep securing those separately.',
  },
  {
    q: 'Do I need a new IP PIN every year?',
    a: 'Yes. The IRS generates a new IP PIN each year. If you opted in online, you will not get a CP01A notice in the mail; you retrieve the new IP PIN from your online account starting in early January.',
  },
  {
    q: 'We file jointly. Whose IP PIN do we use?',
    a: 'Each taxpayer who has an IP PIN must enter it on the return. If only one spouse has one, only that spouse enters it.',
  },
  {
    q: 'I lost my IP PIN. What do I do?',
    a: 'Retrieve it in your IRS online account. If you cannot, the IRS FAQ says you can call 800-908-4490; after verifying your identity, the IRS mails the IP PIN to your address of record within 21 days. You need it before you can e-file.',
  },
  {
    q: 'Can I give my IP PIN to my tax preparer?',
    a: 'Yes, if they are preparing your return; they need it to file. Otherwise keep it private. The IRS FAQ also says your IP PIN is not accepted as proof of identity when you call or visit the IRS.',
  },
  {
    q: 'Can I leave the program after joining?',
    a: 'If you joined voluntarily and have not been a victim of tax-related identity theft, you may be able to opt out in your online account. If you chose one-time enrollment, you are opted out automatically at the end of that calendar year.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read a real IRS notice and verify it.',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 notice: what it means and how to respond',
    desc:  'An unexpected income notice can be a sign of identity theft.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'ITIN holders can get an IP PIN too.',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: 'First-time filer in the U.S.: a complete step-by-step guide',
    desc:  'Filing your first U.S. return safely.',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy',
    desc:  'Check what the IRS has on file with a free transcript.',
  },
]

export default function IrsIdentityTheftIpPinPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Identity Theft and the IP PIN: How to Protect Your Tax Return | AskLinTax',
      description: 'Tax-related identity theft and the IRS Identity Protection PIN: who can get one, the online account, Form 15227 and in-person options, dependents, joint returns, lost IP PINs, rejected returns, Form 14039, IRS letters, and scams.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          <strong>Tax-related identity theft</strong> happens when someone uses your Social Security number or ITIN to file a fake return and claim a refund, or to claim your dependents. The IRS <strong>Identity Protection PIN (IP PIN)</strong> is a <strong>six-digit</strong> number, known only to you and the IRS, that must be on any federal return filed with your SSN or ITIN — so a thief without it cannot file in your name. Anyone with an SSN or ITIN who can verify their identity can get one, even if not required to file. It protects your tax return, not every account you have.
        </p>

        <h2>Warning signs</h2>
        <p>The IRS lists signs such as:</p>
        <ul>
          <li>your e-filed return is rejected because a return with your SSN was already filed;</li>
          <li>a Form W-2 or 1099 from an employer you did not work for, or a Form 1099-G for unemployment benefits you did not apply for;</li>
          <li>an EIN you did not request, or an unreported-income notice such as a CP2000 for income that is not yours;</li>
          <li>IRS online account activity, password resets, or log-in alerts you did not start; and</li>
          <li>a Social Security record showing wages you did not earn.</li>
        </ul>
        <p>
          These do not always mean identity theft, but act on them.
        </p>

        <h2>How to get an IP PIN</h2>
        <ArticleTable
          head={['Method', 'Who can use it', 'How you receive the IP PIN']}
          rows={[
            ['IRS online account (fastest)', 'Anyone who can verify their identity online', 'Shown in the IP PIN section of your profile'],
            ['Form 15227 (online application)', 'If your AGI on your last return was below $84,000 (single) or $168,000 (married filing jointly) and you cannot use an online account; you need a valid SSN or ITIN and a phone', 'The IRS calls to verify you, then mails the IP PIN, usually within 4 to 6 weeks'],
            ['In person at a Taxpayer Assistance Center', 'If you cannot use the other two methods; bring one photo ID and one more ID document', 'By mail, usually within three weeks, and then each year by mail'],
          ]}
        />
        <p>
          When enrolling online you can choose <strong>continuous</strong> enrollment (this year and future years) or <strong>one-time</strong> enrollment (this calendar year only). If IRS records show you were a victim of tax-related identity theft, the IRS enrolls you automatically.
        </p>

        <h2>Dependents and children</h2>
        <ul>
          <li>A dependent <strong>18 or older</strong> can request an IP PIN through their own online account.</li>
          <li>For a dependent <strong>under 18</strong>, or one who cannot verify online, you can use Form 15227 or make an in-person appointment; in person, bring your own ID and two documents for the dependent, such as a birth certificate, Social Security card, or passport.</li>
          <li>On an <strong>e-filed</strong> return, enter each dependent's IP PIN on Form 1040, Form 2441, and Schedule EIC where required; on a <strong>paper</strong> return, you do not enter dependents' IP PINs.</li>
          <li>If someone already claimed your dependent, the IRS says it now accepts e-filed returns with a duplicate dependent if the primary taxpayer includes a valid IP PIN.</li>
        </ul>

        <h2>Filing with an IP PIN</h2>
        <ul>
          <li><strong>Where it is used:</strong> only on federal Forms 1040, 1040-NR, 1040-PR, 1040-SR, 1040-SS, and 1040-X — including prior-year and amended returns filed during that calendar year. Not on Form 4868 or a state return.</li>
          <li><strong>Joint returns:</strong> each spouse who has an IP PIN enters their own.</li>
          <li><strong>Wrong or missing IP PIN:</strong> an e-filed return is rejected until you enter the correct one; a paper return takes longer to process.</li>
          <li><strong>Rejected because an IP PIN is required:</strong> check the reject code to see whose IP PIN is needed, retrieve it, and resubmit.</li>
          <li><strong>No faster refund:</strong> the IRS says returns with an IP PIN go through the same checks as other returns.</li>
        </ul>

        <h2>If you got an IRS letter about your identity</h2>
        <ul>
          <li><strong>Verify it is really from the IRS</strong> and follow its instructions. If the letter tells you to, use the IRS <strong>Identity and Tax Return Verification Service</strong>.</li>
          <li><strong>Do not file Form 14039</strong> if you use that service, if the IRS already sent you a letter about the issue, or if the identity theft is not tax-related.</li>
          <li><strong>File Form 14039, Identity Theft Affidavit,</strong> only if the IRS tells you to, you cannot use the verification service, or you want to report possible tax-related identity theft the IRS does not know about, such as a data breach. You can file it for yourself, a dependent, or a deceased person, but not again for an incident you already reported. If you cannot e-file because your (or your spouse's or dependent's) SSN or ITIN was misused, the form's instructions say to attach it to the back of your paper return and mail it where you normally file.</li>
          <li><strong>Keep filing and paying</strong> as usual while the issue is resolved.</li>
        </ul>

        <h2>Example (illustrative)</h2>
        <p>
          <strong>Mina</strong> tries to e-file her 2025 return in March 2026, and it is rejected because a return was already filed with her SSN. She has not received an IRS letter. Because the IRS has not contacted her and she has not reported this before, she completes Form 14039, attaches it to the back of a paper return, and mails it to the IRS location where she normally files, as the Form 14039 instructions say. She keeps copies of everything. If an IRS letter had arrived first, she would follow its instructions instead — for example, using the Identity and Tax Return Verification Service rather than filing Form 14039. After the case is resolved, she sets up an IRS online account with a strong, unique password and enrolls in continuous IP PIN protection so future returns need her IP PIN.
        </p>

        <h2>IRS impersonation scams</h2>
        <ArticleTable
          head={['The real IRS', 'Signs of a scam']}
          rows={[
            ['Normally contacts you first by U.S. mail', 'An unexpected call, email, or text'],
            ['Emails only if you opted in; never by social media direct message', 'Pressure to act now, or threats of arrest or deportation'],
            ['Explains how to question or appeal what you owe', 'Demands immediate payment, gift cards, or personal and financial information'],
          ]}
        />
        <p>
          Some legitimate letters come from IRS-contracted private collection agencies. To check a notice, search the IRS notices and letters page, and report suspicious contacts to the IRS.
        </p>

        <h2>Identity protection vs. account security</h2>
        <ul>
          <li><strong>IP PIN:</strong> blocks returns filed with your SSN or ITIN without the PIN.</li>
          <li><strong>Online account security:</strong> a complex, unique password protects your IRS account, where your IP PIN and tax records are.</li>
          <li><strong>Everything else:</strong> credit reports, bank accounts, and state tax agencies need their own protections; the IRS points victims to IdentityTheft.gov for recovery steps.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Using last year's IP PIN.</strong> It changes every year.</li>
          <li><strong>Filing Form 14039</strong> when an IRS letter already told you to use the verification service.</li>
          <li><strong>Giving personal details to a caller</strong> who claims to be from the IRS.</li>
          <li><strong>Forgetting a dependent's IP PIN</strong> on an e-filed return.</li>
          <li><strong>Assuming the IP PIN protects state returns</strong> or bank accounts.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Identity theft involving employment, a deceased person, several tax years, or a business can take longer to resolve. The IRS Taxpayer Advocate Service can help if a case causes financial hardship. Credit freezes and state tax agencies are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

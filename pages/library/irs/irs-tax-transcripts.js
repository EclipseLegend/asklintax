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
  id:            '108',
  title:         'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the IRS transcript types for individuals and the ways to order them, based on IRS transcript pages reviewed in 2026, the Transcript Services FAQs, and the April 2025 revisions of Form 4506-T and Form 4506. Processing times and online availability are IRS estimates that can change. It does not explain individual transaction codes on account transcripts, business transcripts, or the IVES program for lenders',
  persona:       ['Mortgage and loan applicants', 'Students applying for financial aid', 'People who lost a copy of their return', 'Taxpayers checking what the IRS has on file', 'New residents who need a non-filing letter'],
  relatedJourney: ['Dealing with a tax problem', 'Preparing to file'],
  actionRequired: 'Use your IRS Individual Online Account for the fastest transcript, use Get Transcript by Mail or 800-908-9946 if you cannot verify your identity online, and file Form 4506 only if you need an actual copy of your return.',
  sources: [
    { label: 'IRS — Transcript types for individuals and ways to order them', url: 'https://www.irs.gov/individuals/transcript-types-for-individuals-and-ways-to-order-them' },
    { label: 'IRS — Get your tax records and transcripts', url: 'https://www.irs.gov/individuals/get-transcript' },
    { label: 'IRS — Transcript availability', url: 'https://www.irs.gov/individuals/transcript-availability' },
    { label: 'IRS — Transcript services for individuals FAQs', url: 'https://www.irs.gov/individuals/transcript-services-for-individuals-faqs' },
    { label: 'IRS — Form 4506-T, Request for Transcript of Tax Return (Rev. April 2025)', url: 'https://www.irs.gov/pub/irs-pdf/f4506t.pdf' },
    { label: 'IRS — Form 4506, Request for Copy of Tax Return (Rev. April 2025)', url: 'https://www.irs.gov/pub/irs-pdf/f4506.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does a transcript cost anything?',
    a: 'No. All transcript types are free, whether you get them online, by mail, by phone, or with Form 4506-T. Only an actual copy of your return, requested on Form 4506, has a fee: $30 for each return.',
  },
  {
    q: 'Will a transcript tell me when my refund is coming?',
    a: 'Not reliably. The IRS says transcripts are mainly used to confirm past income and filing status for loans and to help with tax preparation. Use Where\'s My Refund? to check a refund.',
  },
  {
    q: 'Can the IRS mail my transcript to my lender?',
    a: 'No. Form 4506-T says the IRS stopped all third-party mailings of transcripts in July 2019; transcripts are mailed only to your address of record. You can download one from your online account and give it to the lender, or the lender can use the IRS Income Verification Express Service.',
  },
  {
    q: 'I moved. Why did my mailed transcript not arrive?',
    a: 'Mailed transcripts go to the address the IRS has on file and are not forwarded. File Form 8822 to change your address — the IRS says it generally takes four to six weeks to process — and then request the transcript.',
  },
  {
    q: 'My wage and income transcript says "No record of return filed." What does that mean?',
    a: 'For the current year, it usually means the information returns have not reached the transcript yet. The IRS says to check back in early February. The transcript shows only documents filed with the IRS, so it may not list every form you received.',
  },
  {
    q: 'What do the codes on my account transcript mean?',
    a: 'Account transcripts list transactions with codes, dates, and amounts. This guide does not interpret individual codes. If a transaction is unclear, or the transcript shows information you do not recognize, call the IRS at 800-829-1040 or ask a tax professional.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'A transcript can help you check a notice.',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 notice: what it means and how to respond',
    desc:  'Compare it with your wage and income transcript.',
  },
  {
    href: '/library/irs/irs-identity-theft-ip-pin',
    cat:  'IRS & Tax Issues',
    title: 'IRS Identity Theft and the IP PIN: How to Protect Your Tax Return',
    desc:  'What to do if a transcript shows a return you did not file.',
  },
  {
    href: '/library/irs/amend-tax-return',
    cat:  'IRS & Tax Issues',
    title: 'I made a mistake on my tax return — how do I amend it?',
    desc:  'Fix the return after you check the transcript.',
  },
]

export default function IrsTaxTranscriptsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy | AskLinTax',
      description: 'IRS tax transcripts explained: the five transcript types, what each shows, how to get one online, by mail, by phone, or with Form 4506-T, when they become available, and how a transcript differs from a copy of your return on Form 4506.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          An <strong>IRS transcript</strong> is a free summary of your tax information from IRS records. There are five types for individuals. The fastest way to get one is your <strong>IRS Individual Online Account</strong>. If you cannot verify your identity online, you can get a tax return or tax account transcript by mail or by calling <strong>800-908-9946</strong>, or request any type with <strong>Form 4506-T</strong>. A transcript is <strong>not a photocopy</strong> of your return; for an actual copy, file <strong>Form 4506</strong> and pay <strong>$30</strong> per return.
        </p>

        <h2>The five transcript types</h2>
        <ArticleTable
          head={['Transcript', 'What it shows', 'Years available']}
          rows={[
            ['Tax return transcript', 'Most line items from your original Form 1040 as filed, with forms and schedules; not later changes', 'Current and 3 prior years'],
            ['Tax account transcript', 'Basic data such as filing status, taxable income, and payments, plus changes made after you filed', 'Current and 9 prior years online; current and 3 prior by mail or phone'],
            ['Record of account transcript', 'The tax return and tax account transcripts combined', 'Current and 3 prior years'],
            ['Wage and income transcript', 'Data from information returns such as Forms W-2, 1098, 1099, and 5498', 'Current and 9 prior years'],
            ['Verification of non-filing letter', 'That the IRS has no record of a processed Form 1040 return as of the request date', 'Current year after June 15; prior 3 years any time'],
          ]}
        />
        <p>
          A tax return transcript usually meets mortgage lenders' needs. If you amended your return or the IRS adjusted it, ask for a record of account transcript, because the tax return transcript shows only the original return. Older years can be requested with Form 4506-T.
        </p>

        <h2>Common uses</h2>
        <ul>
          <li><strong>Loans and mortgages:</strong> proving income and filing status.</li>
          <li><strong>Financial aid:</strong> the IRS has a separate page on tax information for student aid applications.</li>
          <li><strong>Preparing a return:</strong> finding last year's AGI or checking which W-2s and 1099s were reported.</li>
          <li><strong>Checking a notice:</strong> comparing an IRS letter with what the IRS has on file.</li>
          <li><strong>Proving you did not file:</strong> a verification of non-filing letter. It does not say whether you were required to file.</li>
        </ul>

        <h2>How to get a transcript</h2>
        <ArticleTable
          head={['Method', 'Transcript types', 'Delivery']}
          rows={[
            ['Individual Online Account', 'All five types', 'View, print, or download right away'],
            ['Get Transcript by Mail (online form)', 'Tax return or tax account transcript', '5 to 10 calendar days to your address of record'],
            ['Automated phone service, 800-908-9946', 'Tax return or tax account transcript', '5 to 10 calendar days to your address of record'],
            ['Form 4506-T', 'Any type, including older years', 'Most requests processed within 10 business days'],
          ]}
        />
        <ul>
          <li><strong>Identity verification:</strong> to use the online account you register through ID.me; the IRS says new users should have photo identification ready. If you cannot verify, use the mail, phone, or Form 4506-T options.</li>
          <li><strong>Address must match:</strong> for mail and phone requests, use the exact address from your latest return.</li>
          <li><strong>Form 4506-T</strong> must be signed and received by the IRS within 120 days of the signature date. On a joint return, one spouse's signature is enough.</li>
          <li><strong>Living abroad:</strong> you can still use the online account or order by mail or phone.</li>
          <li><strong>Joint filers:</strong> the spouse listed second can also request any available transcript.</li>
        </ul>

        <h2>When this year's transcript becomes available</h2>
        <ArticleTable
          head={['Your original return', 'Filed electronically', 'Filed on paper']}
          rows={[
            ['Refund or no balance due', '2–3 weeks after you submit it', '6–8 weeks after you mail it'],
            ['Balance due, paid in full with the return', '2–3 weeks after you submit it', 'Processed in June; request in mid to late June'],
            ['Balance due, paid in full later', '3–4 weeks after full payment', 'Processed in June; request in mid to late June'],
            ['Balance due, not paid in full', 'Processed in mid-May; request by late May', 'Processed in June; request in mid to late June'],
          ]}
        />
        <p>
          These are IRS estimates for returns filed by the April due date. Wage and income information for the prior year generally appears in the first week of February.
        </p>

        <h2>Transcript vs. copy of your return</h2>
        <ArticleTable
          head={['', 'Transcript', 'Copy of return (Form 4506)']}
          rows={[
            ['What you get', 'A computer summary of IRS data', 'A photocopy of the return you filed, with attachments such as W-2s'],
            ['Cost', 'Free', '$30 per return'],
            ['Processing time', 'Instant online; days by mail', 'Up to 75 calendar days'],
            ['How far back', 'Generally 3 or 9 prior years, depending on type', 'Generally 7 years from filing'],
            ['Personal information', 'Partially masked; financial data fully visible', 'Shown as filed'],
          ]}
        />

        <h2>Limitations to know</h2>
        <ul>
          <li><strong>Masking:</strong> transcripts partially hide your personally identifiable information. Financial figures stay fully visible.</li>
          <li><strong>Wage and income transcripts</strong> show only forms filed with the IRS and are limited to about 85 documents; above that they will not generate online, and you need Form 4506-T.</li>
          <li><strong>"Per return" and "per computer":</strong> if the IRS corrected figures while processing, the tax return transcript shows both.</li>
          <li><strong>Identity theft:</strong> you can still use transcript services. If a request cannot be processed because of identity theft, the IRS sends instructions.</li>
          <li><strong>Language:</strong> transcripts are in English, except that Spanish transcripts have been available through the online account since April 30, 2025.</li>
        </ul>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Priya', 'Marcus', 'Sofia']}
          rows={[
            ['Need', 'Mortgage lender wants 2024 and 2025 income', 'Lost her 2022 return and needs the full copy for an immigration case', 'Arrived in 2025, did not have to file for 2024; school asks for proof'],
            ['Best option', 'Tax return transcripts from her online account', 'Form 4506 for the 2022 return, with $30', 'Verification of non-filing letter for 2024'],
            ['Timing', 'Immediately, once each return is processed', 'Up to 75 calendar days', 'Available now for a prior year'],
          ]}
        />
        <p>
          If Priya had amended her 2024 return, her lender would need a record of account transcript to see the change. Sofia's letter shows only that no return was processed, not whether one was required.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Watch for scams</div>
          <p>The IRS does not start contact by email, text, or social media to ask for personal or financial information. Get transcripts only from IRS.gov, by mail from the IRS, or through the official phone line.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

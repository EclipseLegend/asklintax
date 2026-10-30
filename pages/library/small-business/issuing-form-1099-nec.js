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
  id:            '127',
  title:         'Issuing Forms 1099-NEC and 1099-MISC: Thresholds, Deadlines, and Penalties',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'reminder',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains when a business must issue Forms 1099-NEC and 1099-MISC, based on the Instructions for Forms 1099-MISC and 1099-NEC (Rev. April 2025) for 2025 payments, the continuous-use Instructions (Rev. December 2026, dated June 25, 2026, and posted on IRS.gov as a final revision) for 2026 payments, Publication 1099 (2026), and the IRS information return penalties page (reviewed October 2026). A revision date identifies the version of the instructions, not the date they were published. It does not cover Form 1099-K reporting by payment processors, Forms 1099-INT, -DIV, or -B, or state 1099 filing in detail',
  persona:       ['Small business owners who pay contractors', 'Landlords and property managers paying vendors', 'Freelancers who hire other freelancers', 'Bookkeepers preparing year-end filings'],
  relatedJourney: ['Running a small business', 'Understanding new tax rules'],
  actionRequired: 'Collect a Form W-9 before you pay a contractor, track payments by the year you actually pay them, and check the threshold for that payment year — $600 for most 2025 payments and $2,000 for most 2026 payments. File Form 1099-NEC with the IRS and give the recipient a copy by January 31, and e-file if you have 10 or more information returns.',
  sources: [
    { label: 'IRS — Instructions for Forms 1099-MISC and 1099-NEC (Rev. December 2026)', url: 'https://www.irs.gov/pub/irs-pdf/i1099mec.pdf' },
    { label: 'IRS — Instructions for Forms 1099-MISC and 1099-NEC (Rev. April 2025)', url: 'https://www.irs.gov/pub/irs-prior/i1099mec--2025.pdf' },
    { label: 'IRS — Publication 1099 (2026), General Instructions for Certain Information Returns', url: 'https://www.irs.gov/pub/irs-pdf/p1099.pdf' },
    { label: 'IRS — Information return penalties', url: 'https://www.irs.gov/payments/information-return-penalties' },
  ],
}

const FAQS = [
  {
    q: 'Is the threshold $600 or $2,000?',
    a: 'It depends on the year you made the payment. For payments made in 2025 (reported in early 2026), the threshold for nonemployee compensation and most Form 1099-MISC boxes is $600. For tax years beginning after 2025, it is $2,000, so payments made in 2026 (reported in early 2027) use $2,000. Not every category changed: royalties stay at $10 and gross proceeds paid to attorneys stay at $600. The IRS says the $2,000 amount is subject to inflation adjustment beginning in 2027, so check the current instructions for later years.',
  },
  {
    q: 'If I paid a contractor less than the threshold, is that money tax-free to them?',
    a: 'No. The threshold only decides whether you must file the form. The recipient must still report all of their income on their own return, whether or not they receive a Form 1099.',
  },
  {
    q: 'Do I need to send a 1099 to a corporation or an LLC?',
    a: 'Generally not to a corporation, including an LLC taxed as a C or S corporation. But there are exceptions: you must still report attorneys\' fees, gross proceeds paid to an attorney, and medical and health care payments, among others, even when the payee is a corporation. An LLC that is a disregarded entity or a partnership is not a corporation for this purpose; Form W-9 tells you how it is classified.',
  },
  {
    q: 'I paid a contractor through a payment app or by credit card. Do I issue a 1099-NEC?',
    a: 'Generally no. The instructions say payments made by credit card or payment card, and certain other payments including third party network transactions, are reported on Form 1099-K by the payment settlement entity and are not subject to reporting on Form 1099-MISC or Form 1099-NEC.',
  },
  {
    q: 'Do I issue 1099s for personal payments, like a contractor who remodeled my home?',
    a: 'No. Forms 1099-MISC and 1099-NEC are required only for payments made in the course of your trade or business. Personal payments are not reportable.',
  },
  {
    q: 'What if the contractor will not give me a Form W-9?',
    a: 'If a payee does not provide a taxpayer identification number, you generally must begin backup withholding at 24% on reportable payments. Any payment from which you backup withheld must be reported on Form 1099-NEC or 1099-MISC regardless of the amount.',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference and why it matters',
    desc:  'Whether a worker is an employee or a contractor.',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'How contractor payments show up as business expenses.',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
    desc:  'If you were charged a late-filing penalty.',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: 'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty',
    desc:  'What changes if the worker is an employee.',
  },
]

export default function IssuingForm1099NecPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Issuing Forms 1099-NEC and 1099-MISC: Thresholds, Deadlines, and Penalties | AskLinTax',
      description: 'When a business must file Forms 1099-NEC and 1099-MISC: the $600 threshold for 2025 payments and $2,000 for 2026 payments, attorney and royalty rules, Form W-9 and backup withholding, January 31 deadlines, e-filing, corrections, and penalties.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you pay someone who is not your employee for services in the course of your <strong>trade or business</strong>, you may have to file <strong>Form 1099-NEC</strong> with the IRS and give the recipient a copy. Other business payments, such as rents and royalties, go on <strong>Form 1099-MISC</strong>. The dollar threshold depends on the <strong>year you made the payment</strong>: for most payment types, <strong>$600 for 2025 payments</strong> and <strong>$2,000 for 2026 payments</strong>. Some categories use other amounts in both years, such as $10 for royalties and $600 for gross proceeds paid to attorneys.
        </p>

        <h2>Thresholds by payment year</h2>
        <ArticleTable
          head={['Payment', 'Form and box', 'Paid in 2025 (filed in 2026)', 'Paid in 2026 (filed in 2027)']}
          rows={[
            ['Services by a nonemployee (including parts and materials)', '1099-NEC, box 1a', '$600 or more', '$2,000 or more'],
            ['Attorneys\' fees for legal services', '1099-NEC, box 1a', '$600 or more', '$2,000 or more'],
            ['Gross proceeds paid to an attorney (for example, a settlement)', '1099-MISC, box 10', '$600 or more', '$600 or more'],
            ['Royalties', '1099-MISC, box 2', '$10 or more', '$10 or more'],
            ['Rents; prizes and awards; other income; medical and health care payments', '1099-MISC, boxes 1, 3, and 6', '$600 or more', '$2,000 or more'],
            ['Any payment with backup withholding', '1099-NEC or 1099-MISC, box 4', 'Any amount', 'Any amount'],
          ]}
        />
        <p>
          The $2,000 threshold applies for tax years beginning after 2025. Publication 1099 (2026) says it will be adjusted for inflation beginning in calendar year 2027. For payments made after 2026, check the current instructions before relying on a specific amount. The $10 royalty threshold and the $600 threshold for gross proceeds paid to attorneys did not change.
        </p>

        <h2>Who must file</h2>
        <ul>
          <li><strong>Business payments only.</strong> Report only payments made in the course of your trade or business. Nonprofits and government agencies are also subject to these rules. Personal payments are not reportable.</li>
          <li><strong>Nonemployees.</strong> Form 1099-NEC is for nonemployee compensation. Wages paid to employees go on Form W-2, not Form 1099.</li>
          <li><strong>Payments to corporations</strong> are generally exempt — but attorneys' fees, gross proceeds paid to attorneys, and medical and health care payments must be reported even when the payee is a corporation.</li>
          <li><strong>Card and app payments.</strong> Payments by credit card, payment card, and third party network transactions are reported by the payment settlement entity on Form 1099-K, not by you on Form 1099-NEC or 1099-MISC.</li>
          <li><strong>Other exceptions</strong> include payments for merchandise, telephone, freight, storage, and similar items, and rent paid to real estate agents or property managers (who then report the rent they pay to the owner).</li>
        </ul>

        <h2>Form W-9 and backup withholding</h2>
        <p>
          Ask each payee to complete <strong>Form W-9</strong> before you pay them, so you have their name, taxpayer identification number, and entity classification. If a payee does not give you a TIN, or the IRS notifies you that a TIN is incorrect, you generally must withhold <strong>24%</strong> of reportable payments as backup withholding, deposit it, and report it. You must then file a Form 1099 for that payee regardless of the amount. The IRS says the higher threshold for 2026 payments also applies to backup withholding on the affected payments.
        </p>

        <h2>Deadlines</h2>
        <ArticleTable
          head={['Form', 'File with the IRS', 'Give the recipient a copy']}
          rows={[
            ['1099-NEC', 'January 31 (paper or electronic)', 'January 31'],
            ['1099-MISC', 'February 28 on paper, or March 31 electronically', 'January 31; February 15 if you report amounts in box 8 or box 10'],
          ]}
        />
        <p>
          If a due date falls on a Saturday, Sunday, or legal holiday, it moves to the next business day. Deadlines are tied to the year after the payment year: 2025 payments were reported in early 2026, and 2026 payments are reported in early 2027.
        </p>

        <h2>E-filing and corrections</h2>
        <ul>
          <li><strong>E-file threshold:</strong> if you must file <strong>10 or more information returns</strong> in total for the year (the IRS counts all types of information returns together, not each form type separately), you must file them electronically. The IRS offers the Information Returns Intake System (IRIS) for this.</li>
          <li><strong>Corrections:</strong> for paper forms, follow Publication 1099. For electronic corrections, see Publication 5718 (IRIS application-to-application) or Publication 5717 (IRIS portal). Do not check the VOID box on a paper correction.</li>
        </ul>

        <h2>Penalties</h2>
        <p>
          Separate penalties apply for failing to file a correct return with the IRS and for failing to give a correct statement to the recipient. For information returns and payee statements <strong>due in 2026</strong> (2025 payments), the IRS lists these amounts per return:
        </p>
        <ArticleTable
          head={['When corrected or filed', 'Penalty per return (due in 2026)']}
          rows={[
            ['Up to 30 days late', '$60'],
            ['31 days late through August 1', '$130'],
            ['After August 1, or not filed', '$340'],
            ['Intentional disregard', '$680 minimum, with no maximum'],
          ]}
        />
        <p>
          Annual maximums are lower for small businesses with average annual gross receipts of $5 million or less. The penalty may not apply if you can show reasonable cause. Check the IRS information return penalties page for the amounts that apply to returns due in later years.
        </p>

        <h2>What changed on the 2026 forms</h2>
        <p>
          Besides the higher threshold, the December 2026 revisions of Forms 1099-NEC and 1099-MISC add boxes for reporting cash tips and the Treasury Tipped Occupation Code, and for reporting overtime compensation, and they split the address fields into separate boxes. These revisions are continuous-use: use them to report 2026 payments in early 2027 and later years until the IRS issues a new revision, but not for earlier years.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Use the payment year, not the filing year</div>
          <p>A contractor you paid $1,500 in December 2025 still needs a Form 1099-NEC, because 2025 payments use the $600 threshold — even though you file the form in 2026. The same $1,500 paid in 2026 would not require a Form 1099-NEC, unless you backup withheld from it.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

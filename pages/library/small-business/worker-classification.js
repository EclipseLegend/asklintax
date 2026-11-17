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
  id:            '134',
  title:         'Employee or Independent Contractor? How Businesses Classify Workers',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how a business decides whether a worker is an employee or an independent contractor for federal employment tax purposes, based on Publication 15-A (2026), Publication 15 (2026), the Instructions for Form SS-8 (Rev. January 2024), the IRS Independent contractor (self-employed) or employee? page (updated May 2026), the IRS Voluntary Classification Settlement Program page (updated September 2026), and Rev. Proc. 2025-10 (Section 530 relief). It covers the federal tax test only; Department of Labor and state rules, including California\'s, can differ and are not analyzed here',
  persona:       ['Small business owners hiring their first helpers', 'Businesses that pay freelancers regularly', 'Employers who think a worker may be misclassified', 'Startups deciding how to engage workers'],
  relatedJourney: ['Running a small business', 'Starting a small business'],
  actionRequired: 'Before you pay a worker, look at the whole relationship: who controls how the work is done, who controls the business side of the job, and how the parties treat the relationship. If the worker is an employee, run payroll and issue Form W-2. If you are unsure, the IRS can make a determination through Form SS-8, and businesses that want to reclassify workers going forward may qualify for the VCSP.',
  sources: [
    { label: 'IRS — Publication 15-A (2026), Employer\'s Supplemental Tax Guide', url: 'https://www.irs.gov/pub/irs-pdf/p15a.pdf' },
    { label: 'IRS — Publication 15 (2026), (Circular E), Employer\'s Tax Guide', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Independent contractor (self-employed) or employee?', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee' },
    { label: 'IRS — Instructions for Form SS-8 (Rev. January 2024)', url: 'https://www.irs.gov/pub/irs-pdf/iss8.pdf' },
    { label: 'IRS — Voluntary Classification Settlement Program', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/voluntary-classification-settlement-program' },
    { label: 'IRS — Rev. Proc. 2025-10, Section 530 relief', url: 'https://www.irs.gov/pub/irs-drop/rp-25-10.pdf' },
  ],
}

const FAQS = [
  {
    q: 'If the worker signs an independent contractor agreement, is that enough?',
    a: 'No. Publication 15-A lists written contracts as one fact showing the relationship the parties intended, but it is only one factor. All the evidence of control and independence must be considered. A contract that calls someone a contractor does not override how the work is actually controlled.',
  },
  {
    q: 'Does sending a Form 1099-NEC make someone a contractor?',
    a: 'No. The form you issue follows the worker\'s status; it does not create it. If the facts show an employee relationship, the worker is an employee, and the wages belong on Form W-2 with payroll taxes withheld and paid.',
  },
  {
    q: 'Is there one factor that decides the answer?',
    a: 'No. The IRS looks at the facts in three categories — behavioral control, financial control, and the type of relationship — and weighs them together. Some factors point one way and some the other; the amount of instruction needed also varies by job.',
  },
  {
    q: 'What is Form SS-8?',
    a: 'Form SS-8 asks the IRS to determine a worker\'s status for federal employment taxes and income tax withholding. The business or the worker can file it. The IRS generally issues a determination to the business and sends a copy to the worker. A determination applies only to the worker or class of workers who requested it and binds the IRS if the facts and law do not change. It is not an audit, so examination appeal rights do not apply.',
  },
  {
    q: 'What happens if I treated an employee as a contractor?',
    a: 'Publication 15-A says that if you classify an employee as an independent contractor without a reasonable basis, you are liable for employment taxes for that worker. Relief may be available under the Section 530 relief provision if you meet its requirements, and the VCSP offers a voluntary path to reclassify workers going forward.',
  },
  {
    q: 'Does the IRS test also decide minimum wage and state rules?',
    a: 'No. This guide covers the federal tax test. The U.S. Department of Labor and state agencies apply their own rules for wage-and-hour laws, unemployment insurance, and other purposes, and they can reach a different answer. California, for example, has its own classification framework; check with the relevant state agency.',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference and why it matters',
    desc:  'The same question from the worker\'s side.',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: 'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty',
    desc:  'What you must do once a worker is an employee.',
  },
  {
    href: '/library/small-business/issuing-form-1099-nec',
    cat:  'Small Business & Self-Employment',
    title: 'Issuing Forms 1099-NEC and 1099-MISC: Thresholds, Deadlines, and Penalties',
    desc:  'Reporting payments to true contractors.',
  },
  {
    href: '/library/individual/household-employees-schedule-h',
    cat:  'Individuals & Families',
    title: 'Paying a Nanny or Caregiver: Household Employment Taxes and Schedule H',
    desc:  'Household workers follow their own rules.',
  },
]

export default function WorkerClassificationPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Employee or Independent Contractor? How Businesses Classify Workers | AskLinTax',
      description: 'How a business decides whether a worker is an employee or an independent contractor for federal tax purposes: the IRS common-law test (behavioral control, financial control, relationship), Form SS-8, payroll consequences, Form W-2 vs. Form 1099-NEC, the VCSP and Form 8952, and Section 530 relief.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A worker's status depends on the <strong>actual relationship</strong>, not on a job title, a contract label, or the tax form you send. Under the IRS <strong>common-law rules</strong>, the question is whether the business has the right to direct and control how the work is done. If it does, the worker is generally an <strong>employee</strong>: you withhold income tax, withhold and pay Social Security and Medicare taxes, pay federal unemployment tax, and issue <strong>Form W-2</strong>. A true <strong>independent contractor</strong> handles their own taxes, and you report qualifying payments on <strong>Form 1099-NEC</strong>.
        </p>

        <h2>The three categories of evidence</h2>
        <ArticleTable
          head={['Category', 'What the IRS looks at', 'Points toward employee when…']}
          rows={[
            ['Behavioral control', 'Instructions about when, where, and how to work; what tools to use; who assists; what order to follow; training in the business\'s methods', 'The business has kept the right to control the details of the work, even if it does not use that right'],
            ['Financial control', 'Unreimbursed business expenses, the worker\'s investment, whether the worker offers services to the market, how the worker is paid, and the chance of profit or loss', 'The worker is paid a regular wage for a period of time and has little investment, few unreimbursed expenses, and no real chance of profit or loss'],
            ['Type of relationship', 'Written contracts, employee-type benefits, how permanent the relationship is, and whether the services are a key part of the regular business', 'The relationship is expected to continue indefinitely, includes benefits such as insurance or paid leave, or covers the core work of the business'],
          ]}
        />
        <p>
          No single fact decides the answer. Publication 15-A says all information showing the degree of control and independence must be considered. A significant investment is not required to be a contractor, and some professions pay contractors by the hour.
        </p>

        <h2>Myths to avoid</h2>
        <ul>
          <li><strong>"We signed a contractor agreement."</strong> A written contract is one factor, not the answer.</li>
          <li><strong>"I'll send a 1099, so they're a contractor."</strong> The form follows the status; it does not create it.</li>
          <li><strong>"They only work part-time."</strong> Publication 15 says it does not matter whether the employee works full or part time.</li>
          <li><strong>"We call them consultants."</strong> Publication 15 says that if an employer-employee relationship exists, it does not matter what the parties call it.</li>
        </ul>

        <h2>Employee or contractor: what changes</h2>
        <ArticleTable
          head={['', 'Employee', 'Independent contractor']}
          rows={[
            ['Federal income tax', 'You withhold it from wages', 'Not withheld (unless backup withholding applies)'],
            ['Social Security and Medicare', 'You withhold the employee share and pay the employer share', 'The contractor pays self-employment tax'],
            ['Federal unemployment (FUTA)', 'You pay it', 'Not owed by you'],
            ['Year-end form', 'Form W-2', 'Form 1099-NEC if payments meet the threshold for that payment year'],
            ['Returns you file', 'Forms 941 and 940', 'Form 1099-NEC with the IRS'],
          ]}
        />
        <p>
          The Form 1099-NEC threshold depends on the year you paid the worker — generally $600 for 2025 payments and $2,000 for 2026 payments; see <a href="/library/small-business/issuing-form-1099-nec/">issuing Forms 1099-NEC and 1099-MISC</a>. For employee payroll duties, see <a href="/library/small-business/payroll-taxes-941-940/">payroll taxes for employers</a>.
        </p>

        <h2>Getting an IRS determination: Form SS-8</h2>
        <ul>
          <li>The business or the worker can file Form SS-8 to ask the IRS to determine the worker's status for federal employment taxes and income tax withholding.</li>
          <li>The IRS may ask all parties for information, and some information may be shared with the other parties.</li>
          <li>A formal determination applies only to the worker, or class of workers, it covers, and binds the IRS if the facts and law do not change. In some cases the IRS issues a non-binding information letter instead.</li>
          <li>The process is not an audit, so the appeal rights available in an examination do not apply.</li>
        </ul>

        <h2>If workers were misclassified</h2>
        <ArticleTable
          head={['Option', 'What it is', 'Key requirements (not automatic)']}
          rows={[
            ['Section 530 relief provision', 'Possible relief from federal employment taxes for a worker you did not treat as an employee', 'All three requirements must be met: (1) reporting consistency — you filed all required federal information returns, such as Forms 1099, consistently with nonemployee treatment; (2) substantive consistency — you, or a predecessor, did not treat the worker or anyone in a substantially similar position as an employee for any period beginning after December 31, 1977 (this limits the look-back period; the business does not need to have existed since 1977); and (3) reasonable basis — for example, reasonable reliance on judicial precedent or published rulings, a prior IRS audit, or long-standing industry practice. It does not apply to certain technical service specialists provided to another business'],
            ['Voluntary Classification Settlement Program (VCSP)', 'A voluntary program to treat workers as employees going forward, with partial relief for past years', 'You consistently treated the workers as nonemployees and filed all required Forms 1099 for them for the previous 3 years; you are not under an IRS employment tax audit or a Department of Labor or state audit on their classification; you apply on Form 8952, ideally at least 120 days before the start date, and sign a closing agreement'],
          ]}
        />
        <p>
          Under the VCSP, the business pays <strong>10% of the employment tax liability</strong> that would have been due on the workers' compensation for the most recent tax year, figured at the reduced rates of section 3509(a), with no interest or penalties on that amount and no employment tax audit of those workers' classification for prior years. The taxpayer — not a representative — must sign Form 8952.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal, Department of Labor, and state tests are separate</div>
          <p>This guide covers the IRS test for federal employment taxes. Wage-and-hour laws, state unemployment insurance, workers' compensation, and state income tax withholding can use different tests and reach different answers. California's rules, for example, can differ from the federal common-law test; check with the relevant state agency or an adviser before deciding.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

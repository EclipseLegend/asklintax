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
  id:            '126',
  title:         'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal payroll tax duties for employers, based on Publication 15 (2026), the Instructions for Form 941 (Rev. March 2026), the Instructions for Form 940 (2025), and Schedule A (Form 940) for 2025. The final 2026 FUTA credit reduction states had not been announced when this guide was reviewed; the IRS draft 2026 Schedule A (Form 940) says the Department of Labor will announce them in November 2026. It does not cover state payroll taxes, household employers, agricultural employers (Form 943), or Form 945 nonpayroll withholding in detail',
  persona:       ['First-time employers', 'S corporation owners paying themselves a salary', 'Small business owners using a payroll service', 'Anyone who received an IRS notice about late payroll deposits'],
  relatedJourney: ['Running a small business', 'Dealing with a tax problem'],
  actionRequired: 'Confirm your deposit schedule (monthly or semiweekly) from your lookback period, deposit withheld and employer taxes electronically by each due date, file Form 941 every quarter and Form 940 every year, and keep payroll records for at least 4 years. If you use a payroll service, check that deposits are actually being made in your EIN.',
  sources: [
    { label: 'IRS — Publication 15 (2026), (Circular E), Employer\'s Tax Guide', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Instructions for Form 941 (Rev. March 2026)', url: 'https://www.irs.gov/pub/irs-pdf/i941.pdf' },
    { label: 'IRS — Instructions for Form 940 (2025)', url: 'https://www.irs.gov/pub/irs-pdf/i940.pdf' },
    { label: 'IRS — Schedule A (Form 940) for 2025, Multi-State Employer and Credit Reduction Information', url: 'https://www.irs.gov/pub/irs-pdf/f940sa.pdf' },
    { label: 'IRS — Depositing and reporting employment taxes', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes' },
  ],
}

const FAQS = [
  {
    q: 'Does the number of employees decide whether I deposit monthly or semiweekly?',
    a: 'No. Your deposit schedule depends on the total taxes you reported during a lookback period — for a Form 941 filer, the four quarters from July 1 through June 30 before the current year. If those taxes were $50,000 or less, you are a monthly schedule depositor; if more, you are a semiweekly schedule depositor. A new employer is a monthly schedule depositor for its first calendar year, subject to the $100,000 next-day deposit rule.',
  },
  {
    q: 'What is the difference between filing Form 941 and making deposits?',
    a: 'They are separate duties. Deposits are the electronic payments of withheld and employer taxes, due on your monthly or semiweekly schedule. Form 941 is the quarterly return that reports wages and taxes and reconciles them with your deposits. Filing Form 941 on time does not make up for late deposits, and making deposits does not replace filing the return.',
  },
  {
    q: 'Does the employer pay the Additional Medicare Tax?',
    a: 'No. The 0.9% Additional Medicare Tax is an employee tax. The employer must withhold it from wages paid to an employee in excess of $200,000 in a calendar year, regardless of the employee\'s filing status, but there is no employer share.',
  },
  {
    q: 'Can the Trust Fund Recovery Penalty apply to me personally?',
    a: 'It can, but not automatically to every owner. If trust fund taxes are not paid and cannot be immediately collected from the business, the IRS may assess the penalty — 100% of the unpaid trust fund tax — against each person it determines was responsible for collecting, accounting for, or paying over the taxes and who acted willfully. A responsible person can include officers, partners, employees, and others with authority over business funds. Willfully means voluntarily, consciously, and intentionally.',
  },
  {
    q: 'Does the 2025 California FUTA credit reduction also apply for 2026?',
    a: 'Not automatically. Credit reductions are determined for each year by the U.S. Department of Labor. For 2025, California\'s credit reduction is 1.2%. When this guide was reviewed in October 2026, the final 2026 credit reduction states had not been announced; the IRS draft 2026 Schedule A (Form 940) says the Department of Labor will announce them in November 2026. Check the final Schedule A (Form 940) for 2026 when it is released.',
  },
  {
    q: 'I use a payroll service. Am I still responsible?',
    a: 'Generally yes. Publication 15 states that an employer who outsources payroll and related tax duties to a third-party payer, such as a payroll service provider, generally remains responsible for those duties, including liability for the taxes (certified professional employer organizations are treated differently). Enrolling in EFTPS lets you see the deposits made under your EIN.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: 'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
    desc:  'Why S corporation owners who work in the business run payroll.',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: "W-2 vs 1099: what's the difference and why it matters",
    desc:  'Whether a worker is an employee in the first place.',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation & Structure',
    title: 'How to apply for an EIN: a step-by-step guide',
    desc:  'Employers need an EIN before running payroll.',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
    desc:  'Options if you were charged a deposit penalty.',
  },
]

export default function PayrollTaxes941940Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty | AskLinTax',
      description: 'Federal payroll taxes for employers: income tax withholding, Social Security and Medicare, the 2026 wage base, Forms 941 and 940, FUTA and the 2025 California credit reduction, monthly and semiweekly deposits, deposit penalties, and the Trust Fund Recovery Penalty.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When you have employees, you take on four separate federal duties: <strong>withholding</strong> taxes from employees' pay, <strong>paying</strong> the employer's share, <strong>depositing</strong> those taxes electronically on a set schedule, and <strong>filing</strong> returns — usually <strong>Form 941</strong> every quarter and <strong>Form 940</strong> every year. Withheld income, Social Security, and Medicare taxes are held in trust for the government; if they are not paid over, certain individuals can be held personally liable under the <strong>Trust Fund Recovery Penalty</strong>.
        </p>

        <h2>Which taxes are involved</h2>
        <ArticleTable
          head={['Tax', 'Employee', 'Employer', 'Reported on']}
          rows={[
            ['Federal income tax withholding', 'Withheld from wages based on Form W-4', 'No employer share', 'Form 941'],
            ['Social Security', '6.2% withheld', '6.2% paid by the employer', 'Form 941'],
            ['Medicare', '1.45% withheld', '1.45% paid by the employer', 'Form 941'],
            ['Additional Medicare Tax', '0.9% withheld on wages over $200,000 in the year', 'No employer share', 'Form 941'],
            ['FUTA (federal unemployment)', 'Not withheld — never taken from employee pay', '6.0% on the first $7,000 per employee, generally reduced by a credit of up to 5.4%', 'Form 940'],
          ]}
        />
        <p>
          For 2026, the Social Security wage base is <strong>$184,500</strong>: Social Security tax stops once an employee's wages for the year reach that amount. Medicare tax has no wage base limit.
        </p>

        <h2>Form 941 and Form 940</h2>
        <ul>
          <li><strong>Form 941</strong> reports wages, withheld income tax, and both shares of Social Security and Medicare for each quarter. It is due by the last day of the month after the quarter ends — <strong>April 30, July 31, October 31, and January 31</strong>. If you deposited all taxes for the quarter on time and in full, you may file by the 10th day of the second month after the quarter (for example, May 10).</li>
          <li><strong>Form 944</strong> is an annual return used instead of Form 941 only by small employers the IRS has notified to file it.</li>
          <li><strong>Form 940</strong> reports FUTA tax for the calendar year. The 2025 Form 940 is due <strong>February 2, 2026</strong>, or February 10, 2026, if you deposited all FUTA tax when due.</li>
        </ul>

        <h2>Deposits: monthly or semiweekly</h2>
        <p>
          Your deposit schedule is <strong>not determined by how many employees you have or how often you pay them</strong>. For a Form 941 filer, it depends on the taxes reported on Form 941, line 12, during the lookback period. For 2026, the lookback period is <strong>July 1, 2024, through June 30, 2025</strong>.
        </p>
        <ArticleTable
          head={['Rule', 'When it applies', 'Deposit due']}
          rows={[
            ['Monthly schedule', 'Lookback-period taxes of $50,000 or less (and new employers in their first calendar year)', 'By the 15th day of the following month'],
            ['Semiweekly schedule', 'Lookback-period taxes of more than $50,000', 'Wages paid Wednesday, Thursday, or Friday: by the following Wednesday. Wages paid Saturday through Tuesday: by the following Friday'],
            ['$100,000 next-day rule', 'You accumulate $100,000 or more of taxes on any day during a deposit period', 'By the next business day; you then become a semiweekly depositor for the rest of the year and the next year'],
            ['$2,500 de minimis rule', 'Your taxes for the current or prior quarter are less than $2,500 and you did not trigger the $100,000 rule', 'You may pay with a timely filed return instead of depositing'],
          ]}
        />
        <p>
          Deposits must be made by electronic funds transfer, generally through EFTPS. FUTA tax is deposited separately: deposit it by the last day of the month after a quarter once your undeposited FUTA tax is more than $500; if it is $500 or less, carry it to the next quarter.
        </p>

        <h2>Deposit penalties</h2>
        <ArticleTable
          head={['Penalty', 'When it applies']}
          rows={[
            ['2%', 'Deposit made 1 to 5 days late'],
            ['5%', 'Deposit made 6 to 15 days late'],
            ['10%', 'Deposit made 16 or more days late; also amounts paid directly to the IRS or with the return instead of deposited'],
            ['15%', 'Amounts still unpaid more than 10 days after the first IRS notice asking for the tax, or the day you receive a notice and demand for immediate payment, whichever is earlier'],
          ]}
        />
        <p>
          Days are counted as calendar days. The IRS may waive deposit penalties for reasonable cause, and first-time abatement may be available; see <a href="/library/irs/irs-penalty-relief/">IRS penalty relief</a>.
        </p>

        <h2>The Trust Fund Recovery Penalty</h2>
        <ul>
          <li><strong>What it covers:</strong> trust fund taxes — withheld federal income tax and the employee share of Social Security and Medicare. The penalty is <strong>100% of the unpaid trust fund tax</strong>.</li>
          <li><strong>When it is used:</strong> if the unpaid taxes cannot be immediately collected from the employer or business.</li>
          <li><strong>Who can be liable:</strong> each person the IRS determines was <strong>responsible</strong> for collecting, accounting for, or paying over the taxes <strong>and</strong> acted <strong>willfully</strong>. A responsible person can be an officer or employee of a corporation, a partner or employee of a partnership, an accountant, a volunteer director or trustee, or anyone with authority to decide how business funds are spent.</li>
          <li><strong>Willfully</strong> means voluntarily, consciously, and intentionally. A responsible person acts willfully if the person knows the required actions of collecting, accounting for, or paying over trust fund taxes are not taking place, or recklessly disregards obvious and known risks to the government's right to receive them.</li>
        </ul>
        <p>
          Owning part of a business does not by itself make someone liable; the IRS must determine that both the responsibility and willfulness standards are met.
        </p>

        <h2>FUTA example: California, 2025</h2>
        <p>
          A California employer pays one employee $40,000 in 2025 and pays its California unemployment tax on time. California is a <strong>credit reduction state for 2025</strong> at <strong>1.2%</strong> (the U.S. Virgin Islands is the other 2025 credit reduction jurisdiction, at 4.5%).
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['FUTA wages (first $7,000 only)', '$7,000'],
            ['FUTA tax before credit (6.0%)', '$420'],
            ['Credit for state unemployment tax (5.4%)', '−$378'],
            ['FUTA tax after full credit (0.6%)', '$42'],
            ['California credit reduction (1.2% × $7,000), figured on Schedule A (Form 940)', '+$84'],
            ['Total 2025 FUTA tax for this employee', '$126'],
          ]}
        />
        <p>
          The credit reduction is treated as a fourth-quarter liability. Because this employer's total FUTA tax is $500 or less, it could either deposit it or pay it with Form 940 by February 2, 2026; employers with more than $500 of fourth-quarter FUTA tax must include the credit reduction in their fourth-quarter deposit. This example applies to <strong>2025 wages only</strong>. Credit reduction states and rates are determined separately each year; the final 2026 list had not been announced when this guide was reviewed.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Do not use withheld taxes as working capital</div>
          <p>Taxes withheld from employees' pay belong to the government. Paying rent or suppliers with that money instead of depositing it can lead to deposit penalties for the business and, if the taxes remain unpaid, to the Trust Fund Recovery Penalty against responsible individuals. If you cannot make a deposit, contact the IRS promptly rather than waiting.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '103',
  title:         'Paying a Nanny or Caregiver: Household Employment Taxes and Schedule H',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal household employment taxes for tax years 2025 and 2026, based on Publication 926 (2026), Publication 926 (2025), and the 2025 Instructions for Schedule H (Form 1040). It covers federal requirements only; state employment taxes, state unemployment insurance, workers\' compensation, and labor law are not covered',
  persona:       ['Families who pay a nanny or babysitter', 'Adult children paying a caregiver for a parent', 'Households with a housekeeper or private nurse', 'Families paying a relative to provide care'],
  relatedJourney: ['Filing with dependents', 'Preparing to file'],
  actionRequired: 'Decide whether the worker is your employee, check the cash-wage and FUTA tests for the year, get an EIN, withhold the employee\'s Social Security and Medicare taxes, give a Form W-2, file Schedule H with your Form 1040, and check your state\'s rules separately.',
  sources: [
    { label: 'IRS — Publication 926 (2026), Household Employer\'s Tax Guide', url: 'https://www.irs.gov/publications/p926' },
    { label: 'IRS — Publication 926 (2025), Household Employer\'s Tax Guide', url: 'https://www.irs.gov/pub/irs-prior/p926--2025.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule H (Form 1040), Household Employment Taxes', url: 'https://www.irs.gov/pub/irs-pdf/i1040sh.pdf' },
    { label: 'IRS — Recognize tax scams and fraud', url: 'https://www.irs.gov/help/tax-scams/recognize-tax-scams-and-fraud' },
  ],
}

const FAQS = [
  {
    q: 'Is a babysitter who comes a few times a month my employee?',
    a: 'If you control what work is done and how it is done, the worker is generally your employee, whether full-time or part-time. But you owe federal household employment taxes only if you meet the cash-wage test ($2,800 for 2025, $3,000 for 2026, per employee) or the $1,000-per-quarter FUTA test.',
  },
  {
    q: 'What if I hire through an agency?',
    a: 'Publication 926 says that if an agency provides the worker and controls what work is done and how it is done, the worker is not your employee. Hiring someone from a list provided by an agency does not by itself change that the worker is your employee.',
  },
  {
    q: 'Do I have to withhold federal income tax?',
    a: 'No. You are not required to withhold federal income tax from a household employee\'s wages. You should withhold it only if the employee asks and you agree, based on the employee\'s Form W-4.',
  },
  {
    q: 'I pay my mother to watch my children. Do I owe these taxes?',
    a: 'Wages paid to your parent generally are not counted for Social Security and Medicare, and never for FUTA. The exception: they are counted for Social Security and Medicare if your parent cares for your child who is under 18 (or needs adult care for a condition), and you are divorced and not remarried, widowed, or living with a spouse who cannot care for the child because of a physical or mental condition.',
  },
  {
    q: 'I do not have to file a tax return. Do I still file Schedule H?',
    a: 'Yes. If you owe household employment taxes but are not required to file Form 1040, Publication 926 says you file Schedule H by itself.',
  },
  {
    q: 'Can I get the child care credit for what I pay a nanny?',
    a: 'If the nanny cares for your dependent under 13 (or a spouse or dependent who cannot care for themselves) so you can work or look for work, the wages and your share of federal and state employment taxes can count as care expenses for the child and dependent care credit.',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-dependent-care-credit',
    cat:  'Individuals & Families',
    title: 'Child and Dependent Care Credit: 2025 and 2026 Rules and Examples',
    desc:  'Nanny wages and employment taxes can count as care expenses.',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference and why it matters',
    desc:  'Employee or independent contractor.',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation',
    title: 'How to apply for an EIN: a step-by-step guide',
    desc:  'Household employers need an EIN for Form W-2 and Schedule H.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Paying household employment taxes during the year.',
  },
]

export default function HouseholdEmployeesScheduleHPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Paying a Nanny or Caregiver: Household Employment Taxes and Schedule H | AskLinTax',
      description: 'Household employment taxes explained: who is a household employee, the 2025 $2,800 and 2026 $3,000 cash-wage thresholds, Social Security and Medicare, the $1,000 FUTA test, family exceptions, EIN, Form W-2, Schedule H, deadlines, and the child care credit.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you pay someone to work in or around your home — a nanny, caregiver, or housekeeper — and you control how the work is done, that person is generally your <strong>household employee</strong>. You owe federal employment taxes if you pay one employee <strong>$2,800 or more</strong> in cash wages in <strong>2025</strong> (<strong>$3,000</strong> in <strong>2026</strong>), or pay <strong>$1,000 or more</strong> in total cash wages in any calendar quarter. You report these taxes on <strong>Schedule H</strong> with your Form 1040 and give the employee a <strong>Form W-2</strong>. State rules are separate.
        </p>

        <h2>Who is a household employee</h2>
        <ul>
          <li><strong>Household work:</strong> work in or around your private home, such as babysitters, nannies, caretakers, health aides, private nurses, housekeepers, cooks, drivers, and yard workers.</li>
          <li><strong>Control test:</strong> the worker is your employee if you can control not only what work is done but how it is done. Full-time or part-time, hourly or by the job, makes no difference.</li>
          <li><strong>Not your employee:</strong> a self-employed worker who controls how the work is done, usually provides their own tools, and offers services to the public; a worker an agency provides and controls; or someone who cares for your child in their own home.</li>
          <li><strong>Not household work:</strong> services such as a private secretary, tutor, or librarian, even if done in your home.</li>
        </ul>
        <p>
          It is unlawful to knowingly hire or keep employing a person who cannot legally work in the United States; Publication 926 explains Form I-9 verification.
        </p>

        <h2>The federal tests</h2>
        <ArticleTable
          head={['Test', '2025', '2026', 'What you owe if you meet it']}
          rows={[
            ['Cash wages to any one household employee', '$2,800 or more', '$3,000 or more', 'Social Security and Medicare taxes on all of that employee\'s cash wages'],
            ['Total cash wages to all household employees in any calendar quarter', '$1,000 or more', '$1,000 or more', 'FUTA (federal unemployment) tax'],
            ['Social Security wage base', '$176,100', '$184,500', 'No Social Security tax on wages above this'],
          ]}
        />
        <p>
          If neither test applies, you owe no federal employment taxes — but you may still owe state employment taxes.
        </p>

        <h2>Social Security and Medicare taxes</h2>
        <ul>
          <li><strong>Rates:</strong> 6.2% Social Security and 1.45% Medicare from the employee, and the same amounts from you — 7.65% each, 15.3% in total.</li>
          <li><strong>Withholding:</strong> you withhold the employee's 7.65% from their pay. You may instead pay the employee's share from your own funds; Publication 926 says that amount is then included in the employee's wages for income tax purposes (box 1 of Form W-2), but not as Social Security, Medicare, or FUTA wages.</li>
          <li><strong>Additional Medicare Tax:</strong> withhold 0.9% on wages above $200,000 in a year (employee only).</li>
        </ul>

        <h2>Wages that are not counted</h2>
        <ArticleTable
          head={['Paid to', 'Social Security and Medicare', 'FUTA']}
          rows={[
            ['Your spouse', 'Not counted', 'Not counted'],
            ['Your child under 21', 'Not counted', 'Not counted'],
            ['Your parent', 'Not counted, unless the parent-caregiver exception applies', 'Not counted'],
            ['An employee under 18 at any time during the year', 'Not counted, unless household work is their principal occupation (it is not for a student)', 'Counted'],
          ]}
        />

        <h2>FUTA tax</h2>
        <p>
          If you meet the $1,000-per-quarter test, FUTA tax is <strong>6.0%</strong> of the first <strong>$7,000</strong> of cash wages to each employee for the year. You may get a credit of up to <strong>5.4%</strong> for state unemployment contributions, making the net rate <strong>0.6%</strong>; the credit is limited to 90% for state contributions paid after April 15 of the following year, and is reduced for wages paid in a credit reduction state.
        </p>

        <h2>Federal income tax withholding</h2>
        <p>
          You do <strong>not</strong> have to withhold federal income tax. Withhold it only if the employee asks and you agree, using the employee's Form W-4.
        </p>

        <h2>Example (illustrative, 2026)</h2>
        <p>
          <strong>Emily</strong> pays her nanny, who is not a relative and is over 18, $600 a week for 50 weeks in 2026 — <strong>$30,000</strong> in cash wages. Both tests are met. Assumptions: all wages are cash; Emily withholds the employee's share from each paycheck; she does not withhold federal income tax (the nanny did not ask); the wages are below the $184,500 Social Security wage base and the $200,000 Additional Medicare Tax threshold; and Emily pays all state unemployment contributions by April 15, 2027, in a state that is not a credit reduction state, so she gets the full 5.4% FUTA credit.
        </p>
        <ArticleTable
          head={['Item', 'Amount']}
          rows={[
            ['Employee Social Security tax withheld: 6.2% × $30,000', '$1,860'],
            ['Employee Medicare tax withheld: 1.45% × $30,000', '$435'],
            ['Emily\'s own Social Security tax: 6.2% × $30,000', '$1,860'],
            ['Emily\'s own Medicare tax: 1.45% × $30,000', '$435'],
            ['Emily\'s FUTA tax: 0.6% × $7,000', '$42'],
            ['Total federal household employment taxes on Schedule H', '$4,632'],
            ['Of which withheld from the nanny\'s pay', '$2,295'],
            ['Of which Emily\'s own cost', '$2,337'],
          ]}
        />
        <p>
          Emily gives the nanny a Form W-2 by <strong>February 1, 2027</strong> and files Schedule H with her 2026 Form 1040 by <strong>April 15, 2027</strong>. To avoid an underpayment penalty, she can raise her own withholding at work or make estimated tax payments during 2026.
        </p>

        <h2>What to file and when</h2>
        <ArticleTable
          head={['Step', 'For 2025 wages', 'For 2026 wages']}
          rows={[
            ['Get an employer identification number (EIN)', 'Before filing Form W-2', 'Before filing Form W-2'],
            ['Give the employee Form W-2; send Copy A with Form W-3 to the SSA', 'By February 2, 2026', 'By February 1, 2027'],
            ['File Schedule H with Form 1040 (or by itself if you do not have to file)', 'By April 15, 2026', 'By April 15, 2027'],
          ]}
        />
        <p>
          Publication 926 says you do not send Form W-2 to the SSA if you did not withhold federal income tax and the employee's Social Security and Medicare wages were below the threshold for the year. You must include your EIN on the forms you file for your household employee; if you already have one, for example as a sole proprietor, use it.
        </p>

        <h2>Paying the tax during the year</h2>
        <p>
          Household employment taxes are added to your income tax on Form 1040. Publication 926 suggests paying during the year by asking your employer to withhold more from your wages, asking a pension payer to withhold more, or making or increasing estimated tax payments. Otherwise, you may owe an estimated tax penalty.
        </p>

        <h2>State requirements are separate</h2>
        <p>
          Publication 926 tells household employers to contact their state about state unemployment tax and other state employment taxes. States may have different thresholds, registration, wage, and insurance rules. This guide covers only federal requirements.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Treating a nanny as an independent contractor</strong> and issuing a Form 1099 instead of a W-2.</li>
          <li><strong>Using the wrong year's threshold</strong> — $2,800 for 2025, $3,000 for 2026.</li>
          <li><strong>Forgetting FUTA</strong> when quarterly wages reach $1,000.</li>
          <li><strong>Assuming family members are always exempt</strong> — a parent caring for your child can be covered, and an adult sibling is not exempt.</li>
          <li><strong>Ignoring state requirements.</strong></li>
          <li><strong>Falling for refund schemes:</strong> the IRS has warned about misleading social media advice promoting false household employment tax claims.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Live-in employees, noncash wages, workers shared with another family, agency arrangements, correcting past years, and caregivers paid through government programs can be complex. State payroll, unemployment, and labor law requirements are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

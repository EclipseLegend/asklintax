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
  id:            '77',
  title:         'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal rules for owner-employees of an S corporation for tax years 2025 and 2026, based on IRS guidance on S corporation compensation, the 2025 Instructions for Form 1120-S, the Instructions for Forms 2553, 7004, and 7203, Publication 15 (2026), and IRS guidance on the qualified business income deduction. The 2026 Form 1120-S instructions were not yet final when this guide was written. The IRS does not set a fixed reasonable salary amount, and state S corporation taxes are not covered',
  persona:       ['Owners whose LLC or corporation elected S-Corp status', 'Business owners deciding how much salary to take', 'First-time Form 1120-S filers', 'S-Corp shareholders reading a Schedule K-1'],
  relatedJourney: ['Running a small business', 'Understanding new tax rules'],
  actionRequired: 'If you work in your S corporation, pay yourself reasonable wages through payroll before taking non-wage distributions. File Form 1120-S by the 15th day of the 3rd month after year-end (or request an extension on Form 7004), give each shareholder a Schedule K-1, and track your stock basis.',
  sources: [
    { label: 'IRS — S corporation compensation and medical insurance issues', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues' },
    { label: 'IRS — S corporations', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations' },
    { label: 'IRS — 2025 Instructions for Form 1120-S', url: 'https://www.irs.gov/pub/irs-pdf/i1120s.pdf' },
    { label: 'IRS — Revenue Procedure 2024-40 (2025 adjusted items; S corporation late-filing penalty, section 2.57)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32 (2026 adjusted items; S corporation late-filing penalty, section 4.56)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Instructions for Form 2553 (Rev. December 2020), including relief for late elections', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Instructions for Form 7004', url: 'https://www.irs.gov/instructions/i7004' },
    { label: 'IRS — Instructions for Form 7203, S Corporation Shareholder Stock and Debt Basis Limitations', url: 'https://www.irs.gov/instructions/i7203' },
    { label: 'IRS — Publication 15 (2026), Employer\'s Tax Guide', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Qualified business income deduction', url: 'https://www.irs.gov/newsroom/qualified-business-income-deduction' },
  ],
}

const FAQS = [
  {
    q: 'Is there an IRS formula for a reasonable salary?',
    a: 'No. The IRS does not publish a fixed amount or percentage. It looks at the facts, including the owner\'s training and experience, duties, time spent on the business, and what comparable businesses pay for similar services.',
  },
  {
    q: 'Can I take only distributions and no salary?',
    a: 'Not if you provide services to the corporation. The IRS says an S corporation must pay reasonable compensation to a shareholder-employee for services before non-wage distributions are made, and it can reclassify distributions as wages subject to employment taxes.',
  },
  {
    q: 'When is Form 1120-S due?',
    a: 'By the 15th day of the 3rd month after the tax year ends. For calendar-year 2025 returns, that was March 16, 2026, because March 15 fell on a Sunday. For calendar-year 2026, it is March 15, 2027. Form 7004 generally gives an automatic 6-month extension of time to file — not to pay.',
  },
  {
    q: 'Do I pay tax on S-Corp profit I leave in the business?',
    a: 'Generally yes. An S corporation\'s income is generally taxed to its shareholders rather than to the corporation. Your share appears on Schedule K-1 and is reported on your own return whether or not it is distributed to you.',
  },
  {
    q: 'Does my S-Corp salary count for the QBI deduction?',
    a: 'No. The IRS says amounts received as reasonable compensation from an S corporation are not qualified business income. Your share of the S corporation\'s business income on Schedule K-1 can be QBI if the other requirements are met.',
  },
  {
    q: 'I missed the Form 2553 deadline. Is there relief?',
    a: 'Possibly. Under Rev. Proc. 2013-30, as described in the Form 2553 instructions, relief is generally available if the corporation intended to be an S corporation, failed only because Form 2553 was late, had reasonable cause and acted diligently, files within 3 years and 75 days of the intended effective date, and all affected shareholders reported consistently.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'Whether the S-Corp election is worth it in the first place.',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business',
    title: 'The QBI Deduction: 2025 and 2026 Rules',
    desc:  'How S-Corp income and wages fit into the 20% deduction.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'K-1 income may still require estimated payments.',
  },
]

export default function SCorpReasonableSalaryPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Running an S-Corp: Reasonable Salary, Form 1120-S & K-1 | AskLinTax',
      description: 'S-Corp owner rules for 2025 and 2026: reasonable salary vs. distributions, payroll, Form 1120-S deadlines and penalties, Schedule K-1, stock basis, health insurance, and QBI.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Once your business is an <strong>S corporation</strong>, you wear two hats. If you work in the business, you are an <strong>employee</strong> who must be paid a <strong>reasonable salary</strong> through payroll, with Social Security and Medicare taxes withheld and paid. You are also a <strong>shareholder</strong>: the corporation files <strong>Form 1120-S</strong>, and your share of its income, deductions, and credits is reported to you on <strong>Schedule K-1</strong> and taxed on your own return. Profit you receive beyond your salary can be paid as distributions, which are not wages.
        </p>

        <h2>Reasonable salary: what the IRS looks at</h2>
        <p>
          The IRS says an S corporation must pay <strong>reasonable compensation</strong> to a shareholder-employee for services before making non-wage distributions to that shareholder, and it can reclassify distributions as wages. The IRS lists these factors, among others:
        </p>
        <ul>
          <li>Training and experience</li>
          <li>Duties and responsibilities</li>
          <li>Time and effort devoted to the business</li>
          <li>Dividend history</li>
          <li>Payments to non-shareholder employees</li>
          <li>Timing and manner of paying bonuses to key people</li>
          <li>What comparable businesses pay for similar services</li>
          <li>Compensation agreements</li>
          <li>The use of a formula to determine compensation</li>
        </ul>
        <p>
          The IRS also explains that the key is the source of the business's gross receipts: to the extent they come from the work of other employees or from capital and equipment, payments to the owner can properly be distributions. Reasonable compensation will never be more than the amount the shareholder actually receives.
        </p>

        <h2>Salary vs. distributions</h2>
        <ArticleTable
          head={['', 'Salary (wages)', 'Distributions']}
          rows={[
            ['How it is paid', 'Through payroll, reported on Form W-2', 'Paid out of the corporation\'s profits, not through payroll'],
            ['Social Security and Medicare taxes', 'Yes — 6.2% each from employee and employer for Social Security (up to the wage base: $176,100 for 2025, $184,500 for 2026) and 1.45% each for Medicare, plus Additional Medicare Tax withheld on wages over $200,000', 'No'],
            ['Income tax', 'Yes, withheld from pay', 'The income is already taxed through Schedule K-1; distributions are generally not taxed again up to your stock basis'],
            ['Counts as qualified business income (QBI)?', 'No', 'Distributions are not the measure — your K-1 share of business income is what can be QBI'],
          ]}
        />

        <h2>Form 1120-S and Schedule K-1</h2>
        <ArticleTable
          head={['Item', 'Rule']}
          rows={[
            ['Due date', '15th day of the 3rd month after the tax year ends — March 16, 2026 for calendar-year 2025 (March 15 was a Sunday); March 15, 2027 for calendar-year 2026'],
            ['Extension', 'Form 7004 — generally an automatic 6-month extension of time to file, not to pay'],
            ['Late-filing penalty', 'For each month or part of a month (up to 12 months) the return is late, multiplied by the number of shareholders: $255 for returns required to be filed in 2026 (calendar-year 2025 returns; Rev. Proc. 2024-40 and the 2025 instructions) and $260 for returns required to be filed in 2027 (calendar-year 2026 returns; Rev. Proc. 2025-32). More applies if tax is due'],
            ['Schedule K-1', 'Shows each shareholder\'s share of income, deductions, and credits; an individual generally reports it on Schedule E (Form 1040), Part II'],
            ['Officer pay', 'Reported on Form 1120-S, line 7 (from Form 1125-E when required)'],
          ]}
        />

        <h2>Health insurance for more-than-2% shareholders</h2>
        <p>
          Under the 2025 Form 1120-S instructions, health insurance the corporation pays for a <strong>more-than-2% shareholder</strong> (including the shareholder's spouse, dependents, and children under age 27) is treated as wages: it is included in box 1 of the shareholder's Form W-2 and shown as an information item in box 14. The shareholder may then be allowed to deduct it on Schedule 1 (Form 1040), line 17, if the self-employed health insurance requirements are met.
        </p>

        <h2>Stock basis and Form 7203</h2>
        <p>
          Your stock basis limits the losses you can deduct and determines whether a distribution is tax-free. You must file <strong>Form 7203</strong> with your return if you claim a deduction for your share of an S corporation loss, receive a non-dividend distribution, dispose of S corporation stock, or receive a loan repayment from the S corporation.
        </p>

        <h2>Example (illustrative, 2026)</h2>
        <p>
          <strong>Ana</strong> is the only shareholder of an S corporation and works in it full time. Before her pay, the business earns <strong>$120,000</strong>. Based on what similar businesses pay for her role, she sets her salary at <strong>$70,000</strong>.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Salary, run through payroll', '$70,000'],
            ['Social Security and Medicare on the salary (employee + employer, 15.3%)', '$10,710'],
            ['Employer share of those taxes (deducted by the corporation)', '$5,355'],
            ['Business income on her Schedule K-1 ($120,000 − $70,000 − $5,355)', '$44,645'],
          ]}
        />
        <p>
          Ana pays income tax on her wages and on the $44,645 from her K-1. If the same $120,000 were Schedule C profit, self-employment tax would be about $16,955 ($120,000 × 92.35% × 15.3%). This comparison is simplified: it ignores unemployment taxes, payroll and tax-preparation costs, state taxes, retirement contributions, and the QBI deduction — which can be smaller because her wages are not QBI.
        </p>

        <h2>Making or fixing the election</h2>
        <ul>
          <li><strong>Timing:</strong> to take effect for the current tax year, Form 2553 generally must be filed no more than 2 months and 15 days after the beginning of that tax year (or at any time during the prior tax year).</li>
          <li><strong>An LLC electing S status</strong> files Form 2553; under the Form 2553 instructions it does not also need to file Form 8832.</li>
          <li><strong>Late elections:</strong> relief under Rev. Proc. 2013-30 is generally available within 3 years and 75 days of the intended effective date if the conditions in the Form 2553 instructions are met, including reasonable cause and consistent reporting by all affected shareholders.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Taking no salary</strong> while working in the business and taking only distributions.</li>
          <li><strong>Missing the Form 1120-S deadline</strong> — the penalty is figured per shareholder, per month.</li>
          <li><strong>Leaving owner health insurance off the W-2</strong> for a more-than-2% shareholder.</li>
          <li><strong>Not tracking stock basis</strong> or skipping Form 7203 when it is required.</li>
          <li><strong>Assuming K-1 income needs no estimated tax.</strong> Payroll withholding covers your wages, but you may still owe <a href="/library/small-business/quarterly-taxes/">estimated tax</a> on K-1 income.</li>
          <li><strong>Mixing personal and business money,</strong> which makes it hard to separate wages, distributions, and expenses.</li>
        </ul>

        <h2>IRS forms you may need</h2>
        <ArticleTable
          head={['Form', 'What it is for']}
          rows={[
            ['Form 2553', 'Elect S corporation status'],
            ['Form 1120-S and Schedule K-1', 'The corporation\'s annual return and each shareholder\'s share'],
            ['Form 7004', 'Extension of time to file Form 1120-S'],
            ['Forms 941, 940, W-2, and W-3', 'Payroll tax returns and wage statements for the owner\'s salary'],
            ['Form 1125-E', 'Compensation of officers, when required'],
            ['Schedule E (Form 1040)', 'Where an individual shareholder reports K-1 income'],
            ['Form 7203', 'Stock and debt basis, when required'],
            ['Form 8995 or 8995-A', 'The qualified business income deduction'],
          ]}
        />

        <h2>California considerations</h2>
        <p>
          California and other states may tax S corporations and their shareholders differently from the federal rules. AskLinTax has not verified California's current S corporation tax rates, minimum taxes, or filing requirements against Franchise Tax Board sources for this guide, so this guide does not state them. Check the California Franchise Tax Board before relying on any specific amount.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help setting your salary</div>
          <p>There is no IRS safe-harbor salary amount. A reasonable salary depends on your facts, and the IRS can reclassify distributions as wages. A tax professional can help you document how you set your pay.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

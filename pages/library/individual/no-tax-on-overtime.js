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
  id:            '68',
  title:         'No Tax on Overtime: How the Deduction Really Works',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal income tax deduction for qualified overtime compensation for tax years 2025 and 2026, based on IRS forms and instructions, Notice 2025-69, and the IRS overtime FAQs (FS-2026-13). IRS FAQs are guidance, not regulations. It does not cover state income tax, employer payroll obligations, or every special overtime arrangement, such as rules for federal employees',
  persona:       ['Hourly workers who are paid overtime', 'Married couples who both work overtime', 'Workers checking their 2026 Form W-2', 'Anyone unsure whether their overtime qualifies'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Confirm you are overtime-eligible under the federal Fair Labor Standards Act, identify only the overtime premium (generally the "half" in time-and-a-half), and claim it on Schedule 1-A. For 2026, check Form W-2, box 12, code TT, and ask your employer for a corrected W-2 if it is wrong.',
  sources: [
    { label: 'IRS — What to know about the No Tax on Overtime deduction', url: 'https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction' },
    { label: 'IRS — FS-2026-13, Questions and answers about the deduction for qualified overtime compensation (August 2026)', url: 'https://www.irs.gov/pub/taxpros/fs-2026-13.pdf' },
    { label: 'IRS — Working Families Tax Cuts: provisions for individuals and workers', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A (Form 1040) (2025), Additional Deductions', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (including Schedule 1-A instructions)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — Notice 2025-69, Guidance for individuals who received qualified tips or overtime in 2025', url: 'https://www.irs.gov/pub/irs-drop/n-25-69.pdf' },
    { label: 'IRS — General Instructions for Forms W-2 and W-3 (2026)', url: 'https://www.irs.gov/instructions/iw2w3' },
  ],
}

const FAQS = [
  {
    q: 'Is my overtime pay now tax-free?',
    a: 'No. Overtime pay is still income and is still subject to Social Security and Medicare taxes and income tax withholding. For 2025 through 2028, eligible workers may deduct the qualified part of their overtime — generally the premium above their regular rate — up to $12,500 ($25,000 on a joint return), with a phaseout at higher incomes.',
  },
  {
    q: 'Can I deduct all of my time-and-a-half pay?',
    a: 'No. Only the premium that the federal Fair Labor Standards Act (FLSA) requires above your regular rate counts — generally the "half" in time-and-a-half. If you earn $20 an hour and work 10 overtime hours at $30, the qualified amount is $100, not $300.',
  },
  {
    q: 'I am a salaried manager who is exempt from overtime. Does any extra pay qualify?',
    a: 'Generally no. Only overtime required by the FLSA for an FLSA overtime-eligible employee qualifies. If you are exempt from the FLSA overtime rules, overtime paid under a union contract, a state law, or your employer\'s own policy does not qualify.',
  },
  {
    q: 'My 2026 Form W-2 shows less overtime in box 12, code TT than I was paid. What can I do?',
    a: 'According to the IRS FAQs, ask your employer for a corrected Form W-2 (Form W-2c). For tax years after 2025, the FAQs say you may not use more qualified overtime than your employer reports in box 12, code TT, and you cannot use a substitute Form W-2 (Form 4852) for this purpose.',
  },
  {
    q: 'Do I need to itemize?',
    a: 'No. The deduction is claimed on Schedule 1-A whether you take the standard deduction or itemize. Married couples must file jointly to claim it.',
  },
  {
    q: 'Does my state follow this deduction?',
    a: 'Not necessarily. State income tax rules can differ from federal law. This guide covers federal rules only.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/no-tax-on-tips',
    cat:  'Individuals & Families',
    title: 'No Tax on Tips: Who Qualifies for the Deduction?',
    desc:  'The other new deduction for workers.',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: 'Why do I owe taxes this year? Understanding your W-4 and withholding',
    desc:  'How to adjust withholding for new deductions.',
  },
]

export default function NoTaxOnOvertimePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'No Tax on Overtime: How the Overtime Deduction Works | AskLinTax',
      description: 'The federal overtime deduction: only the FLSA premium counts, the $12,500 limit, the income phaseout, and how 2025 and 2026 reporting differ, with examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          "No tax on overtime" is the popular name for a new <strong>federal income tax deduction</strong> for <strong>qualified overtime compensation</strong>, available for <strong>2025 through 2028</strong>. It is narrower than the name suggests:
        </p>
        <ul>
          <li>Only overtime <strong>required by the federal Fair Labor Standards Act (FLSA)</strong> qualifies.</li>
          <li>Only the <strong>premium above your regular rate</strong> counts — generally the "half" in time-and-a-half, not the whole overtime paycheck.</li>
          <li>The deduction is capped at <strong>$12,500</strong> ($25,000 on a joint return) and shrinks when modified adjusted gross income (MAGI) is over <strong>$150,000</strong> ($300,000 joint).</li>
        </ul>
        <p>
          Overtime pay is still income and is still subject to <strong>Social Security and Medicare taxes</strong>. The deduction lowers only the income subject to federal income tax.
        </p>

        <h2>Who qualifies</h2>
        <ul>
          <li>You (or your spouse, on a joint return) received <strong>qualified overtime compensation</strong> during the year as an <strong>FLSA overtime-eligible employee</strong> — covered by the FLSA and not exempt from its overtime requirement.</li>
          <li>The person who received the overtime has a <strong>Social Security number valid for employment</strong>, issued before the due date of the return (including extensions).</li>
          <li>If you are married, you <strong>file a joint return</strong>.</li>
          <li>You can take the standard deduction or itemize — either way works.</li>
        </ul>
        <p>
          Many workers are <strong>exempt</strong> from FLSA overtime — for example, many executive, administrative, and professional employees, outside sales employees, and certain computer-related, commissioned retail, transportation, seasonal, and agricultural workers. The IRS FAQs also say an employee who owns at least a bona fide 20% equity interest in the business and actively manages it is generally exempt. If you are FLSA-exempt, overtime paid under a union contract, a state law, or your employer's own policy does not qualify.
        </p>

        <h2>Only the overtime premium counts</h2>
        <p>
          Under the FLSA, overtime is generally paid at one and one-half times your regular rate for hours over 40 in a workweek. The qualified amount is the <strong>extra half</strong>, not the full time-and-a-half. A quick way to estimate it: if all your overtime was paid at exactly time-and-a-half, the qualified amount is <strong>one-third</strong> of your total overtime pay.
        </p>
        <ArticleTable
          head={['Situation', 'Qualified overtime compensation']}
          rows={[
            ['10 overtime hours at time-and-a-half; regular rate $20 ($300 of overtime pay)', '$100 (10 hours × the $10 premium)'],
            ['Same 10 hours, but the employer pays double time ($400)', 'Still $100 — only the premium the FLSA requires counts'],
            ['Extra pay for hours over 8 in a day, weekends, or holidays that the FLSA does not require', 'Generally not qualified'],
            ['$15,000 of overtime pay for the year, all at time-and-a-half', '$5,000 ($15,000 ÷ 3)'],
          ]}
        />

        <h2>The limit and the income phaseout</h2>
        <ArticleTable
          head={['Rule', 'Amount']}
          rows={[
            ['Maximum deduction', '$12,500; $25,000 on a joint return (combined, not per spouse)'],
            ['Phaseout starts', 'MAGI over $150,000, or $300,000 if married filing jointly'],
            ['How it phases out', 'The deduction drops by $100 for each full $1,000 of MAGI over the threshold'],
            ['Years', '2025 through 2028'],
          ]}
        />

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Carlos</strong> (single, 2025) is an hourly warehouse worker earning $24 an hour. He received $9,000 of overtime pay during 2025, all at time-and-a-half. His qualified overtime compensation is $9,000 ÷ 3 = <strong>$3,000</strong>. His MAGI is under $150,000, so he can deduct the full $3,000 on Schedule 1-A.
        </p>
        <p>
          <strong>Ana and Leo</strong> (married filing jointly, 2025) have $20,000 of qualified overtime compensation between them and MAGI of $320,000. The starting amount is $20,000 (under the $25,000 joint limit). Their MAGI is $20,000 over $300,000, so the deduction is reduced by 20 × $100 = $2,000. They can deduct <strong>$18,000</strong>.
        </p>
        <p>
          <strong>Priya</strong> (2026) was paid $10,000 of qualified overtime, but her 2026 Form W-2 shows only $5,000 in box 12, code TT. Following the IRS FAQs, she asks her employer for a corrected Form W-2c. If the employer issues one showing $10,000, she can use $10,000. If the employer does not correct it, the FAQs say she can use only the $5,000 reported.
        </p>

        <h2>2025 vs. 2026: how you find the amount</h2>
        <ArticleTable
          head={['Tax year', 'What to expect']}
          rows={[
            ['2025', 'Employers were not required to report qualified overtime separately on Form W-2, 1099-NEC, or 1099-MISC. The Schedule 1-A instructions and Notice 2025-69 explain how to figure it — for example, from an amount your employer shows in Form W-2, box 14, the overtime premium your employer gives you on request, or an employer statement of your overtime pay (time-and-a-half pay divided by 3). Keep the records you relied on.'],
            ['2026 and later', 'Employers report qualified overtime on Form W-2, box 12, code TT (in rare cases, on Form 1099-NEC, box 1d, or Form 1099-MISC, box 14). According to the IRS FAQs, there is no relief for tax years after 2025: you may not use more than the amount reported in box 12, code TT (the FAQs say similar principles apply in the rare Form 1099 cases). If the amount is too low or missing, ask your employer for a Form W-2c; if the employer does not correct it, the FAQs say you cannot use the unreported amount, and a substitute Form W-2 (Form 4852) cannot be used. If the amount is too high, you may use only the overtime actually paid.'],
          ]}
        />
        <p>
          The amount in box 12, code TT is not automatically your deduction. Schedule 1-A applies the $12,500 / $25,000 limit and the income phaseout to figure the deductible amount.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Withholding</div>
          <p>Employers do not reduce income tax withholding on overtime because of this deduction. If you expect a deduction, you can account for it on Form W-4 using the Step 4(b) Deductions Worksheet — see <a href="/library/individual/owe-taxes-withholding-w4/">why you may owe at tax time</a>. To see where wages appear on your form, see <a href="/library/individual/what-is-w2/">how to read a W-2</a>.</p>
        </div>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"All overtime is tax-free."</strong> Overtime remains taxable income subject to Social Security and Medicare taxes; only the qualified premium is deductible, up to the limit.</li>
          <li><strong>"I can deduct my whole overtime paycheck."</strong> Only the FLSA-required premium above your regular rate counts.</li>
          <li><strong>"Any overtime my employer pays qualifies."</strong> Overtime that the FLSA does not require — including for FLSA-exempt employees — does not qualify.</li>
          <li><strong>"The box 12 amount is my deduction."</strong> It is the starting point; the limit and phaseout still apply.</li>
          <li><strong>"Married couples get $25,000 each."</strong> The $25,000 joint limit is combined.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal rules only</div>
          <p>State income tax rules can differ from federal law. Do not assume your state allows this deduction.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

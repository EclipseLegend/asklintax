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
  id:            '69',
  title:         'The New $6,000 Senior Deduction: Eligibility and Income Limits',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal enhanced deduction for seniors for tax years 2025 and 2026 and how it differs from the existing additional standard deduction for age 65 or older, based on IRS forms, instructions, and guidance. It does not cover nonresident aliens, state income tax, or how much of your Social Security benefits are taxable in detail',
  persona:       ['Taxpayers age 65 or older', 'Retirees with Social Security and other income', 'Married couples where one or both spouses are 65 or older', 'Adult children helping parents with their return'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'If you (or your spouse) are 65 or older by the end of the tax year and have a valid Social Security number, figure the deduction on Schedule 1-A, Part V. It is in addition to your standard deduction or itemized deductions. If you are married, you must file jointly.',
  sources: [
    { label: 'IRS — Check your eligibility for the new enhanced deduction for seniors', url: 'https://www.irs.gov/newsroom/check-your-eligibility-for-the-new-enhanced-deduction-for-seniors' },
    { label: 'IRS — Tax Tip 2026-14, 2026 filing season updates and resources for seniors', url: 'https://www.irs.gov/newsroom/2026-filing-season-updates-and-resources-for-seniors' },
    { label: 'IRS — Working Families Tax Cuts: provisions for individuals and workers', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A (Form 1040) (2025), Additional Deductions', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (Schedule 1-A instructions, standard deduction, and Social Security Benefits Worksheet)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — IR-2026-28, New Schedule 1-A and Form 1040 instructions', url: 'https://www.irs.gov/newsroom/irs-published-schedule-taxpayers-will-use-to-claim-deductions-on-no-tax-on-tips-no-tax-on-overtime-no-tax-on-car-loans-no-tax-on-seniors' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is this the same as the extra standard deduction for people over 65?',
    a: 'No. The additional standard deduction for age 65 or older already existed and is part of your standard deduction. The new enhanced deduction for seniors is a separate deduction of up to $6,000 per eligible person, claimed on Schedule 1-A, and it is in addition to the existing amount.',
  },
  {
    q: 'Does this make my Social Security benefits tax-free?',
    a: 'No. How much of your Social Security benefits is taxable is still figured with the Social Security Benefits Worksheet in the Form 1040 instructions, which does not use this deduction. The senior deduction is subtracted later, so it can lower the tax on your total taxable income, but it does not change the taxable portion of your benefits.',
  },
  {
    q: 'Can I claim it if I itemize?',
    a: 'Yes. You can claim it whether you take the standard deduction or itemize.',
  },
  {
    q: 'My spouse is 67 and I am 60. Can we claim it?',
    a: 'Yes, for your spouse only, if you file a joint return and your spouse has a valid Social Security number. The deduction is up to $6,000 per eligible person, so your joint return would claim up to $6,000, subject to the income phaseout.',
  },
  {
    q: 'Does the new deduction change whether I have to file a return?',
    a: 'The filing thresholds in the Form 1040 instructions are based on the standard deduction, including the existing additional amount for age 65 or older. The new senior deduction is not part of the standard deduction, so it does not raise those thresholds.',
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
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Filing thresholds, including for age 65 or older.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'How a deduction lowers your tax.',
  },
]

export default function SeniorDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'The New $6,000 Senior Deduction: Who Qualifies | AskLinTax',
      description: 'The federal enhanced deduction for seniors for 2025–2028: who qualifies, the $6,000 amount, the income phaseout, and how it differs from the extra deduction for 65+.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          For <strong>2025 through 2028</strong>, people age <strong>65 or older</strong> may claim a new federal deduction of up to <strong>$6,000</strong> each ($12,000 if both spouses qualify on a joint return). The IRS calls it the <strong>enhanced deduction for seniors</strong>. It is claimed on Schedule 1-A, Part V, whether you take the standard deduction or itemize.
        </p>
        <p>
          It is <strong>in addition to</strong> the additional standard deduction that people 65 or older already receive. The deduction shrinks when modified adjusted gross income (MAGI) is over <strong>$75,000</strong> ($150,000 on a joint return).
        </p>

        <h2>Who qualifies</h2>
        <ul>
          <li>You (or your spouse, on a joint return) are <strong>age 65 or older by the last day of the tax year</strong>. For 2025, that means born before January 2, 1961.</li>
          <li>Each person claiming it has a <strong>Social Security number valid for employment</strong>.</li>
          <li>If you are married, you <strong>file a joint return</strong>.</li>
          <li>You can take the standard deduction or itemize — either way works.</li>
        </ul>
        <p>
          A taxpayer born before January 2, 1961, who died in 2025 before reaching age 65 does not qualify. The Schedule 1-A instructions treat a person as reaching age 65 on the day before their 65th birthday.
        </p>

        <h2>New senior deduction vs. the existing additional standard deduction</h2>
        <ArticleTable
          head={['', 'Additional standard deduction (existing law)', 'Enhanced deduction for seniors (new)']}
          rows={[
            ['Amount, tax year 2025', '$2,000 if single or head of household; $1,600 per eligible person if married or a qualifying surviving spouse', 'Up to $6,000 per eligible person'],
            ['Amount, tax year 2026', '$2,050 if single or head of household; $1,650 per eligible person if married or a qualifying surviving spouse', 'Up to $6,000 per eligible person'],
            ['Who', 'Age 65 or older, or blind', 'Age 65 or older (not based on blindness)'],
            ['Income limit', 'None', 'Phases out above $75,000 MAGI ($150,000 joint)'],
            ['If you itemize', 'Not available — it is part of the standard deduction', 'Still available'],
            ['Where it is claimed', 'Part of the standard deduction on Form 1040', 'Schedule 1-A, Part V'],
            ['Years', 'Ongoing', '2025 through 2028'],
          ]}
        />

        <h2>How the income phaseout works</h2>
        <p>
          For each eligible person, start with $6,000 and subtract <strong>6%</strong> of the amount by which your MAGI is over $75,000 ($150,000 on a joint return). The deduction reaches zero at MAGI of $175,000 for a single filer, or $250,000 on a joint return.
        </p>

        <h2>Examples (illustrative, tax year 2025)</h2>
        <p>
          <strong>Helen</strong>, age 70 and single, takes the standard deduction and has MAGI of $60,000. Her MAGI is under $75,000, so she gets the full $6,000. Her total deductions are the $15,750 standard deduction, plus the $2,000 additional standard deduction for age 65, plus the $6,000 senior deduction — <strong>$23,750</strong>.
        </p>
        <p>
          <strong>Robert</strong>, age 68 and single, has MAGI of $90,000. His MAGI is $15,000 over $75,000, and 6% of $15,000 is $900. His senior deduction is $6,000 − $900 = <strong>$5,100</strong>.
        </p>
        <p>
          <strong>Mei and Wen</strong>, both 67, file jointly with MAGI of $170,000. Their MAGI is $20,000 over $150,000, and 6% of $20,000 is $1,200. Each spouse's deduction is $6,000 − $1,200 = $4,800, for a total of <strong>$9,600</strong>.
        </p>

        <h2>2025 vs. 2026</h2>
        <ArticleTable
          head={['Tax year', 'What applies']}
          rows={[
            ['2025', 'Up to $6,000 per person born before January 2, 1961; phaseout above $75,000 / $150,000 MAGI; additional standard deduction $2,000 (single or head of household) or $1,600 (married or qualifying surviving spouse, per eligible person)'],
            ['2026', 'The IRS describes the same $6,000 deduction and phaseout for 2025 through 2028 for people 65 or older by the end of the year; the additional standard deduction rises to $2,050 (single or head of household) or $1,650 (married or qualifying surviving spouse, per eligible person)'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Social Security is not automatically tax-free</div>
          <p>The share of your Social Security benefits that is taxable is still figured with the Social Security Benefits Worksheet in the Form 1040 instructions, which does not include this deduction. The senior deduction is subtracted later, on Form 1040, line 13b. It can lower the tax on your total taxable income, but it does not change how much of your benefits is taxable.</p>
        </div>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"It replaces the extra standard deduction for 65+."</strong> It is in addition to that amount.</li>
          <li><strong>"Social Security is no longer taxed."</strong> The taxable part of your benefits is figured the same way as before.</li>
          <li><strong>"I can't use it if I itemize."</strong> It is available whether you itemize or take the standard deduction.</li>
          <li><strong>"Everyone over 65 gets $6,000."</strong> It phases out above $75,000 MAGI ($150,000 joint), requires a valid Social Security number, and married couples must file jointly.</li>
          <li><strong>"It changes my filing requirement."</strong> The filing thresholds are based on the standard deduction and do not include this deduction.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal rules only</div>
          <p>State income tax rules can differ from federal law. Do not assume your state allows this deduction. Nonresident aliens should check the Schedule 1-A instructions and Publication 519.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

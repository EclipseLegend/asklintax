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
  id:            '112',
  title:         'Adoption Tax Credit: 2025 and 2026 Limits and the New Refundable Portion',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal adoption credit and the exclusion for employer adoption benefits for tax years 2025 and 2026, based on the 2025 Instructions for Form 8839, Rev. Proc. 2025-32 (2026 amounts), IRS Topic No. 607, and the IRS questions and answers on the 2025 adoption credit carryforward adjustment. The 2026 Form 8839 and its instructions were not final at the time of this review, so 2026 procedures should be confirmed against them. It does not cover state adoption credits or the details of employer adoption assistance plans',
  persona:       ['Parents adopting a child in the United States', 'Families completing an international adoption', 'Parents adopting a child with special needs from foster care', 'Employees with employer adoption benefits'],
  relatedJourney: ['Planning for a child', 'Filing with dependents'],
  actionRequired: 'Keep records of every adoption expense and the date paid, note whether the adoption is domestic or foreign and when it becomes final, and claim the credit on Form 8839. Get an SSN, ATIN, or ITIN for the child if you can.',
  sources: [
    { label: 'IRS — Instructions for Form 8839 (2025), Qualified Adoption Expenses', url: 'https://www.irs.gov/pub/irs-pdf/i8839.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Topic no. 607, Adoption credit', url: 'https://www.irs.gov/taxtopics/tc607' },
    { label: 'IRS — Questions and answers about adoption tax credit carryforward', url: 'https://www.irs.gov/faqs/questions-and-answers-about-adoption-tax-credit-carryforward' },
  ],
}

const FAQS = [
  {
    q: 'Can I claim the credit if the adoption is not final yet?',
    a: 'For a U.S. child, yes: the credit can be allowed even if the adoption never becomes final, including an unsuccessful attempt. Expenses paid before the year the adoption becomes final are claimed in the year after you pay them. For a foreign child, you cannot claim the credit until the adoption becomes final.',
  },
  {
    q: 'How much of the credit is refundable?',
    a: 'Up to $5,000 per child for 2025 and up to $5,120 per child for 2026. The rest is nonrefundable: it can only reduce your tax, and any unused part carries forward for up to 5 years. For 2025 only, the IRS says carryforwards from 2020–2024 available in 2025 may be included in figuring the refundable part, still limited to $5,000 per child in total. The IRS is adjusting accounts it can identify from 2025 returns; you do not file anything extra for that. For 2026 and later, a carryforward is nonrefundable.',
  },
  {
    q: 'Can I adopt my spouse\'s child and claim the credit?',
    a: 'No. The Form 8839 instructions exclude expenses for adopting your spouse\'s child. Expenses for a surrogate parenting arrangement are also excluded.',
  },
  {
    q: 'My employer paid some adoption costs. Can I also take the credit?',
    a: 'You can use both, but not for the same expenses. Employer benefits under a qualified adoption assistance program (shown in box 12 of Form W-2 with code T) can be excluded from income up to the same per-child limit, and you must complete Part III of Form 8839 before figuring the credit.',
  },
  {
    q: 'The child does not have an SSN yet. What number do I use?',
    a: 'The Form 8839 instructions say to use the child\'s SSN if you will have it in time. If you are adopting a U.S. citizen or resident child and cannot get an SSN in time, apply for an adoption taxpayer identification number (ATIN) with Form W-7A. For a child who is not a U.S. citizen or resident, apply for an ITIN with Form W-7.',
  },
  {
    q: 'We are married but file separately. Can we claim it?',
    a: 'Generally you must file jointly. You may claim it on a separate return only if you lived apart from your spouse for the last 6 months of the year, the child lived in your home more than half the year, and you paid over half the cost of keeping up your home.',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'Another credit for your adopted child once the adoption is complete.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Refundable vs. nonrefundable credits explained.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'For a child adopted from abroad who is not yet a U.S. resident.',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: 'Filing Status and Head of Household: 2025 and 2026 Rules',
    desc:  'Filing status affects who can claim the credit.',
  },
]

export default function AdoptionTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Adoption Tax Credit: 2025 and 2026 Limits and the New Refundable Portion | AskLinTax',
      description: 'The adoption credit explained: $17,280 (2025) and $17,670 (2026) maximums, income phase-outs, the new refundable portion, qualified expenses, domestic vs. foreign adoption timing, special needs adoptions, employer benefits, and Form 8839.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>adoption credit</strong> helps pay qualified adoption expenses for an eligible child. The maximum is <strong>$17,280 per child for 2025</strong> and <strong>$17,670 per child for 2026</strong>, reduced for higher incomes. Starting in 2025, part of the credit is <strong>refundable</strong> — up to $5,000 per child for 2025 and $5,120 for 2026 — so you can receive it even if you owe little or no tax. The rest reduces your tax and can be carried forward for up to 5 years. You claim it on <strong>Form 8839</strong>.
        </p>

        <h2>2025 and 2026 amounts</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['Maximum credit per eligible child', '$17,280', '$17,670'],
            ['Refundable portion per child (maximum)', '$5,000', '$5,120'],
            ['Phase-out begins (modified AGI)', '$259,190', '$265,080'],
            ['No credit at or above (modified AGI)', '$299,190', '$305,080'],
            ['Maximum employer benefit exclusion per child', '$17,280', '$17,670'],
          ]}
        />
        <p>
          The 2025 figures are from the 2025 Instructions for Form 8839; the 2026 figures are from Rev. Proc. 2025-32. The maximum is the total of the refundable and nonrefundable parts, not an extra amount on top.
        </p>

        <h2>Who is an eligible child</h2>
        <ul>
          <li><strong>Under age 18.</strong> A child who turned 18 during the year counts for the part of the year before their birthday.</li>
          <li><strong>Any age</strong> if physically or mentally unable to take care of themselves.</li>
        </ul>

        <h2>Qualified adoption expenses</h2>
        <ArticleTable
          head={['Included', 'Not included']}
          rows={[
            ['Adoption fees', 'Expenses paid with federal, state, or local program funds'],
            ['Attorney fees and court costs', 'Adopting your spouse\'s child'],
            ['Travel, including meals and lodging, while away from home', 'Surrogate parenting arrangements'],
            ['Re-adoption expenses for a foreign child', 'Expenses reimbursed by an employer or anyone else, or that violate the law'],
          ]}
        />

        <h2>When to claim it: domestic vs. foreign adoption</h2>
        <ArticleTable
          head={['When you paid the expenses', 'U.S. child (domestic)', 'Foreign child']}
          rows={[
            ['Any year before the adoption becomes final', 'Claim in the year after the year you paid', 'Claim in the year the adoption becomes final'],
            ['The year the adoption becomes final', 'Claim that year', 'Claim that year'],
            ['Any year after the adoption becomes final', 'Claim in the year you paid', 'Claim in the year you paid'],
          ]}
        />
        <p>
          A child counts as a U.S. child if they were a U.S. citizen or resident (including U.S. territories) when the adoption effort began. For a U.S. child, the credit can be allowed even if the adoption never becomes final.
        </p>

        <h2>Children with special needs</h2>
        <p>
          A child has <strong>special needs</strong> only if all three are true: the child was a U.S. citizen or resident when the adoption effort began; a state or Indian tribal government determined the child cannot or should not return to the parents' home; and it determined the child will not be adopted unless assistance is provided. For a final adoption of a child with special needs, you may claim the full credit for that child even if you paid little or no qualified expenses. Keep evidence of the government's determination.
        </p>

        <h2>Refundable part, nonrefundable part, and carryforward</h2>
        <ul>
          <li><strong>Refundable part:</strong> figured separately for each child, up to the yearly limit, and reported on Form 1040.</li>
          <li><strong>Nonrefundable part:</strong> limited by your tax, reported on Schedule 3.</li>
          <li><strong>Carryforward:</strong> any unused nonrefundable credit carries forward for up to 5 years or until used, oldest first, and is then forfeited. A carryforward is nonrefundable, with one exception below.</li>
          <li><strong>2025 carryforward adjustment:</strong> the IRS says Treasury clarified that, for tax year 2025 only, carryforwards from 2020–2024 available in 2025 may be included in figuring the refundable portion. The refundable portion is still limited to $5,000 per eligible child in total, including the current year's credit. The 2025 forms will not be updated; the IRS is adjusting accounts it can identify from 2025 returns and account records, starting in late September 2026, and sends a notice. Do not file an amended return just to get this adjustment. But it is not automatic for everyone: if your 2025 return did not report the carryforward or lacked enough information, you may need to file Form 1040-X with Form 8839. Any increase reduces the carryforward left for 2026, and it does not make carryforwards refundable in 2026.</li>
          <li><strong>2026 Schedule 3-A (draft):</strong> IRS Topic No. 607 says that for 2026 you must complete Schedule 3-A (Form 1040), Federal Public Benefit, to claim the refundable adoption credit, and the draft 2026 Form 1040 has a line for it. On the draft schedule, the refunded amount is removed only if neither you nor your spouse is a U.S. citizen, U.S. national, or qualified alien. At the time of this review the schedule and the 2026 Form 1040 were drafts, and the related Treasury regulations published in August 2026 (REG-119882-25) were proposed, not final; they would apply only once final. No final regulation or final 2026 form establishing this requirement had been issued; the final 2026 figures in this guide (such as the $5,120 refundable limit) come from Rev. Proc. 2025-32.</li>
        </ul>

        <h2>Who can claim it</h2>
        <ul>
          <li><strong>Filing status:</strong> single, head of household, qualifying surviving spouse, or married filing jointly — with a limited exception for married people who lived apart.</li>
          <li><strong>Income:</strong> modified AGI below the "no credit" amount, unless you are only claiming a carryforward.</li>
          <li><strong>Child information:</strong> report the child's details on Form 8839, Part I.</li>
        </ul>

        <h2>Example (2025, from the Form 8839 instructions)</h2>
        <p>
          In 2025, a family paid <strong>$20,000</strong> of qualified expenses for an eligible child, and the adoption became final in 2025. The credit is limited to <strong>$17,280</strong>. They claim <strong>$5,000</strong> as a refundable credit and, based on their tax, <strong>$10,000</strong> as a nonrefundable credit. The remaining <strong>$2,280</strong> carries forward as a nonrefundable credit for up to 5 years. The other $2,720 of expenses above the $17,280 limit can never be claimed.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Claiming domestic expenses in the year paid</strong> instead of the following year when the adoption is not yet final.</li>
          <li><strong>Claiming a foreign adoption</strong> before it becomes final.</li>
          <li><strong>Double-counting</strong> expenses your employer reimbursed.</li>
          <li><strong>Assuming a carryforward is refundable</strong> in years other than the 2025 adjustment.</li>
          <li><strong>Losing receipts</strong> for travel, legal, and agency fees.</li>
          <li><strong>Missing the special needs rule</strong> for a child adopted from foster care with a state determination.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Unsuccessful adoptions, adoptions spanning several years, multiple children, and employer benefits paid in a year before the adoption is final can make the calculation complex. State adoption credits are separate.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

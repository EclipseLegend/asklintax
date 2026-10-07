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
  id:            '60',
  title:         'Education tax credits: AOTC vs. Lifetime Learning Credit',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Compares the American Opportunity Tax Credit and the Lifetime Learning Credit for tax year 2025. Student loan interest, 529 plans, Coverdell ESAs, and the taxation of scholarships are outside this guide; Publication 970 has the full eligibility rules',
  persona:       ['College students and their parents', 'Graduate students', 'Adults taking courses to improve job skills', 'Families paying for more than one student'],
  relatedJourney: ['Paying for college', 'Money & Benefits'],
  actionRequired: 'Check which credit fits each student: the AOTC for the first four years of postsecondary education toward a degree or credential, at least half-time; the Lifetime Learning Credit for other courses, including job-skills courses. Then check the 2025 income limits.',
  sources: [
    { label: 'IRS — Education credits: AOTC and LLC', url: 'https://www.irs.gov/credits-deductions/individuals/education-credits-aotc-and-llc' },
    { label: 'IRS — Education credits: Questions and answers', url: 'https://www.irs.gov/credits-deductions/individuals/education-credits-questions-and-answers' },
    { label: 'IRS — American Opportunity Tax Credit', url: 'https://www.irs.gov/credits-deductions/individuals/aotc' },
    { label: 'IRS — Lifetime Learning Credit', url: 'https://www.irs.gov/credits-deductions/individuals/llc' },
    { label: 'IRS — Publication 970 (2025), Tax Benefits for Education', url: 'https://www.irs.gov/publications/p970' },
    { label: 'IRS — Instructions for Form 8863 (2025)', url: 'https://www.irs.gov/instructions/i8863' },
  ],
}

const FAQS = [
  {
    q: 'Which credit is bigger?',
    a: 'The American Opportunity Tax Credit can be up to $2,500 per eligible student, and part of it may be refundable. The Lifetime Learning Credit is up to $2,000 per return and is nonrefundable. Which one you can use depends on the student and the courses.',
  },
  {
    q: 'I\'m in my fifth year of college. Can I still use the AOTC?',
    a: 'The AOTC is generally limited to the first four years of postsecondary education. If you no longer qualify for it, the Lifetime Learning Credit has no four-year limit and may apply instead.',
  },
  {
    q: 'I\'m taking one class to improve my job skills. Do I qualify for anything?',
    a: 'Possibly the Lifetime Learning Credit. It can apply to one or more courses, including courses to acquire or improve job skills, and you do not need to be pursuing a degree.',
  },
  {
    q: 'Do textbooks count?',
    a: 'For the AOTC, required course materials such as books, supplies, and equipment can qualify even if they are not bought from the school. For the Lifetime Learning Credit, they generally qualify only if they must be paid directly to the school as a condition of enrollment or attendance.',
  },
  {
    q: 'Is there an income limit?',
    a: 'Yes. For tax year 2025, both credits phase out when modified adjusted gross income (MAGI) is between $80,000 and $90,000 for single, head of household, or qualifying surviving spouse filers, and between $160,000 and $180,000 for married couples filing jointly. They are not available at $90,000 or more, or $180,000 or more for joint filers. Within the phase-out range the credit is reduced, so being below the upper limit does not mean you get the full credit.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'What "refundable" and "nonrefundable" mean in practice.',
  },
  {
    href: '/library/investment/foreign-gift-tuition-paid-directly',
    cat:  'Investments & Foreign Accounts',
    title: 'My parents paid my tuition directly — do I report a foreign gift?',
    desc:  'When parents abroad pay tuition, the gift rules are separate.',
  },
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'Another family credit with its own rules.',
  },
]

export default function EducationTaxCreditsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Education Tax Credits: AOTC vs. Lifetime Learning Credit | AskLinTax',
      description: 'Compare the American Opportunity Tax Credit and the Lifetime Learning Credit: how much each is worth, who qualifies, which expenses count, refundability, and the 2025 income limits.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          There are two main federal education credits. The <strong>American Opportunity Tax Credit (AOTC)</strong> is for the first four years of college or other postsecondary education toward a degree or credential — up to <strong>$2,500 per eligible student</strong>, partly refundable. The <strong>Lifetime Learning Credit (LLC)</strong> is broader — any number of years, including single courses and job-skills classes — but smaller: up to <strong>$2,000 per return</strong>, and nonrefundable.
        </p>

        <h2>Side by side</h2>
        <ArticleTable
          head={['', 'American Opportunity Tax Credit', 'Lifetime Learning Credit']}
          rows={[
            ['Maximum credit', 'Up to $2,500 per eligible student', 'Up to $2,000 per return'],
            ['How it is figured', '100% of the first $2,000 of qualified expenses plus 25% of the next $2,000', '20% of up to $10,000 of qualified expenses'],
            ['Refundable?', 'Up to 40% (up to $1,000) may be refundable, subject to eligibility rules', 'No — nonrefundable'],
            ['Years available', 'Generally only the first four years of postsecondary education, and no more than four tax years per eligible student', 'No four-year limit'],
            ['Program', 'Generally must be pursuing a degree or other recognized credential', 'One or more courses; can include courses to acquire or improve job skills'],
            ['Enrollment', 'Generally at least half-time for at least one academic period', 'One or more courses'],
            ['Books, supplies, equipment', 'Required course materials can qualify even if not bought from the school', 'Generally qualify only if required to be paid directly to the school as a condition of enrollment or attendance'],
          ]}
        />

        <h2>2025 income limits</h2>
        <p>
          For tax year 2025, both credits phase out based on your <strong>modified adjusted gross income (MAGI)</strong>:
        </p>
        <ArticleTable
          head={['Filing status', 'Credit is reduced when MAGI is', 'No credit when MAGI is']}
          rows={[
            ['Single, head of household, or qualifying surviving spouse', '$80,000 – $90,000', '$90,000 or more'],
            ['Married filing jointly', '$160,000 – $180,000', '$180,000 or more'],
          ]}
        />
        <p>
          Within the phase-out range the credit is reduced, so being below the upper limit does not by itself mean you get the full credit. The Form 8863 instructions show the calculation.
        </p>

        <h2>Rules that apply to both credits</h2>
        <ul>
          <li><strong>One credit per student per year.</strong> You cannot claim both the AOTC and the Lifetime Learning Credit for the same student in the same tax year.</li>
          <li><strong>No double benefit.</strong> The same expenses cannot be used for more than one tax benefit.</li>
          <li><strong>Tax-free scholarships and grants</strong> can reduce the qualified expenses you count.</li>
          <li><strong>Expenses that generally do not qualify</strong> include room and board, transportation, insurance, and ordinary personal living expenses.</li>
          <li><strong>Married filing separately</strong> generally cannot claim these education credits.</li>
          <li><strong>If someone else claims you as a dependent</strong>, you cannot claim the education credit on your own return.</li>
        </ul>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>AOTC.</strong> Rina is a second-year university student enrolled full-time in a degree program. Her family pays $4,000 of qualified expenses in 2025. If all the requirements are met and their income is below the phase-out range, the AOTC is 100% of the first $2,000 plus 25% of the next $2,000 — $2,500 — and up to $1,000 of it may be refundable.
        </p>
        <p>
          <strong>Lifetime Learning Credit.</strong> Ken works full-time and takes two evening courses to improve his job skills, paying $5,000 of qualified expenses. He is not pursuing a degree, so the AOTC does not fit, but the Lifetime Learning Credit may: 20% of $5,000 is $1,000, nonrefundable, if he meets the requirements and income limits.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Credits, not deductions</div>
          <p>Both are credits, which reduce your tax directly. "Refundable" means part of the AOTC can be paid to you even if it is more than your tax. See <a href="/library/individual/tax-credit-vs-deduction/">Tax credit vs. tax deduction</a>.</p>
        </div>

        <h2>How to claim</h2>
        <p>
          The credits are claimed on <strong>Form 8863</strong>, Education Credits, filed with your return. <strong>Form 1098-T</strong>, the tuition statement from the school, is generally relevant and required to claim the credits, subject to IRS exceptions. Publication 970 explains the full eligibility rules.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '119',
  title:         'Scholarships and Fellowships: What Is Taxable',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains when scholarships and fellowship grants are tax free, taxable, or compensation for services, and how to report them for 2025, based on Publication 970 (2025), Publication 519 (2025), and the 2025 Form 1040 instructions. Line numbers are for 2025 returns. It does not cover qualified tuition reductions, study abroad rules (Publication 54), or the details of individual tax treaties',
  persona:       ['College and graduate students with scholarships', 'Graduate teaching and research assistants', 'Parents of dependent students', 'International students on F, J, M, or Q visas'],
  relatedJourney: ['Paying for college', 'New to the U.S.'],
  actionRequired: 'Compare your scholarship or fellowship with your tuition, required fees, and required course materials for the year. Any amount used for room, board, travel, or other non-qualified costs — and any payment for teaching or research — is generally taxable. Report it even if you did not receive a Form W-2.',
  sources: [
    { label: 'IRS — Publication 970 (2025), Tax Benefits for Education, Chapter 1', url: 'https://www.irs.gov/pub/irs-pdf/p970.pdf' },
    { label: 'IRS — Publication 519 (2025), U.S. Tax Guide for Aliens', url: 'https://www.irs.gov/pub/irs-pdf/p519.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is my scholarship taxable?',
    a: 'It is tax free only if you are a candidate for a degree at an eligible educational institution, and only to the extent it pays for tuition and required fees, plus books, supplies, and equipment required for your courses. Amounts used for room and board, travel, or other costs are taxable, and so is any part that pays you for teaching, research, or other required services.',
  },
  {
    q: 'I am a graduate teaching assistant. Is my stipend taxable?',
    a: 'Yes, the part that pays for teaching or research required as a condition of the award is generally taxable, even if every degree candidate must do the same work. It is usually reported on Form W-2. Only a few programs are excepted, such as the National Health Service Corps Scholarship Program and the Armed Forces Health Professions Scholarship Program.',
  },
  {
    q: 'Where do I report a taxable scholarship?',
    a: 'On a 2025 Form 1040, include any taxable amount reported in box 1 of Form W-2 on line 1a, and any other taxable amount on Schedule 1, line 8r. On Form 1040-NR, report the taxable amount on Schedule 1, line 8r; generally you report the amount shown in box 2 of Form 1042-S.',
  },
  {
    q: 'Do I need to file a return if my scholarship is completely tax free?',
    a: 'If your only income is a completely tax-free scholarship or fellowship grant, you do not have to file and no reporting is needed. If any part is taxable, check the filing requirements — for a dependent, the taxable part counts as earned income.',
  },
  {
    q: 'Can I include part of my scholarship in income to get a bigger education credit?',
    a: 'Sometimes. Publication 970 explains that a student may choose to include otherwise tax-free scholarships or Pell grants in income so they are treated as paying non-qualified expenses, such as room and board. That can free up tuition for the American opportunity credit, but the extra income can also raise tax or reduce other credits, so compare both ways.',
  },
  {
    q: 'I am an international student. How is my scholarship taxed?',
    a: 'The same degree-candidate and qualified-expense rules apply. For nonresident aliens on F, J, M, or Q visas, the taxable part of a U.S.-source scholarship that is not payment for services is generally withheld at 14% (or a lower treaty rate) and reported on Form 1042-S. Rates differ in other situations — for example, 30% (or a lower treaty rate) for some non-degree grants, and wage withholding for payment for services. Some tax treaties exempt scholarships. Grants for activities performed outside the U.S. are not U.S.-source income.',
  },
]

const RELATED = [
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: 'Education tax credits: AOTC vs. Lifetime Learning Credit',
    desc:  'How scholarships interact with education credits.',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Whether you file as a resident or nonresident alien.',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Filing thresholds for students and dependents.',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: 'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate',
    desc:  'Other tax rules for children and young students.',
  },
]

export default function ScholarshipFellowshipTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Scholarships and Fellowships: What Is Taxable | AskLinTax',
      description: 'When scholarships and fellowship grants are tax free, when they are taxable, and when they are pay for services: qualified expenses, room and board, TA and RA stipends, Forms W-2, 1098-T, and 1042-S, education credits, and international students.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A scholarship or fellowship grant is <strong>tax free</strong> only if you are a <strong>degree candidate</strong> and only up to your <strong>qualified education expenses</strong> — tuition, required fees, and required course materials. Money used for <strong>room, board, or travel</strong> is <strong>taxable scholarship income</strong>. Money paid for <strong>teaching, research, or other required services</strong> is <strong>compensation</strong> and is generally taxable even if your program requires the work.
        </p>

        <h2>Three kinds of scholarship money</h2>
        <ArticleTable
          head={['', 'Tax-free scholarship', 'Taxable scholarship income', 'Compensation for services']}
          rows={[
            ['What it pays for', 'Tuition and fees required to enroll or attend; books, supplies, and equipment required of all students in the course', 'Room and board, travel, research, clerical help, and equipment not required for enrollment or attendance', 'Teaching, research, or other services required as a condition of the award'],
            ['Who can exclude it', 'Degree candidates at an eligible educational institution', 'No one — but non-degree candidates must include the entire scholarship', 'Generally no one, even if all degree candidates must perform the services'],
            ['How it is usually reported to you', 'Form 1098-T from the school', 'Often no Form W-2; you still report it', 'Form W-2 (or Form 1042-S for some nonresidents)'],
          ]}
        />

        <h2>Who is a degree candidate</h2>
        <ul>
          <li>A student at a primary or secondary school, or pursuing a degree at a college or university.</li>
          <li>A student at an accredited institution that offers a program acceptable for full credit toward a bachelor's or higher degree, or training for gainful employment in a recognized occupation.</li>
          <li>If you are <strong>not</strong> a degree candidate, the entire scholarship or fellowship grant is taxable.</li>
        </ul>

        <h2>Other conditions for tax-free treatment</h2>
        <ul>
          <li>The award must not be earmarked for other purposes, such as room and board, and its terms must not prevent you from using it for qualified expenses.</li>
          <li>The payment-for-services rule does not apply to amounts received under the National Health Service Corps Scholarship Program, the Armed Forces Health Professions Scholarship and Financial Assistance Program, and comprehensive student work-learning-service programs at work colleges.</li>
          <li>A scholarship that requires future services under a substantial penalty can be entirely taxable as payment for services in the year received.</li>
          <li>Pell grants and other Title IV need-based grants are treated as scholarships; a Fulbright grant is generally treated as a scholarship or fellowship grant.</li>
          <li>VA education benefits are tax free and are not reported as income.</li>
        </ul>

        <h2>How to report for 2025</h2>
        <ArticleTable
          head={['Return', 'Taxable amount on Form W-2 box 1', 'Other taxable amount']}
          rows={[
            ['Form 1040 or 1040-SR', 'Included in line 1a', 'Schedule 1, line 8r'],
            ['Form 1040-NR', 'Schedule 1, line 8r', 'Schedule 1, line 8r — generally the amount in box 2 of Form 1042-S'],
          ]}
        />
        <ul>
          <li>You must report the taxable amount whether or not you received a Form W-2.</li>
          <li>Form 1098-T shows amounts from the school, which may differ from what you actually paid or can use. Use Worksheet 1-1 in Publication 970 to figure the tax-free and taxable parts.</li>
          <li>For a dependent's filing requirement and standard deduction, taxable scholarship and fellowship grants count as earned income.</li>
        </ul>

        <h2>Education credits and dependent students</h2>
        <ul>
          <li><strong>No double benefit:</strong> tax-free scholarships reduce the expenses you can use for the American opportunity or lifetime learning credit.</li>
          <li><strong>Choosing to include:</strong> a student may include some otherwise tax-free scholarship in income so it is treated as paying room and board. Publication 970 says this may increase the American opportunity credit only if qualified expenses minus scholarships are less than $4,000, and the extra income can also cost more than it saves.</li>
          <li><strong>Who claims the credit:</strong> if a parent claims the student as a dependent, only the parent can claim the American opportunity credit for that student's expenses — but the scholarship income, if any is taxable, belongs to the student.</li>
        </ul>

        <h2>International students and nonresident aliens</h2>
        <ul>
          <li><strong>Same exclusion rules:</strong> degree candidates can exclude qualified scholarships from U.S. sources.</li>
          <li><strong>Withholding:</strong> for F, J, M, or Q visa holders, the taxable part of a U.S.-source scholarship that is not payment for services is generally withheld at 14% (or a lower treaty rate); for non-degree candidates whose grant does not meet certain requirements, at 30% (or a lower treaty rate). Payment for services is withheld like wages.</li>
          <li><strong>Form 1042-S</strong> shows the gross taxable amount, the rate, and the tax withheld. Use it to file Form 1040-NR.</li>
          <li><strong>Source:</strong> scholarships are generally sourced by the payer's residence; grants for activities performed outside the U.S. are not U.S.-source income.</li>
          <li><strong>Treaties</strong> may exempt scholarships or fellowships, with conditions and time limits. See Publication 901 and the IRS tax treaty tables.</li>
          <li><strong>Education credits:</strong> a nonresident alien for any part of the year generally cannot claim them, with limited exceptions such as electing to file jointly with a U.S. citizen or resident spouse.</li>
        </ul>

        <h2>Examples (2025)</h2>
        <ArticleTable
          head={['', 'Maya', 'Daniel', 'Lin']}
          rows={[
            ['Situation', 'Undergraduate degree candidate; $20,000 scholarship; tuition and required fees $14,000, required books $1,000, room and board $5,000', 'Ph.D. candidate; $10,000 for required teaching as a teaching assistant, plus a separate $12,000 living stipend with no service requirement', 'Graduate student on an F-1 visa, a nonresident alien; U.S. university scholarship covers tuition and housing'],
            ['Tax-free', '$15,000', 'None of these amounts (tuition is not part of this example)', 'The part used for tuition and required fees, if Lin is a degree candidate'],
            ['Taxable', '$5,000 used for room and board — Schedule 1, line 8r', '$10,000 as wages (Form W-2, line 1a); $12,000 stipend — Schedule 1, line 8r', 'The housing part, reported from Form 1042-S on Form 1040-NR, unless a treaty exempts it'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Check your own award terms</div>
          <p>Whether an amount is tax free depends on the award's terms and how the money is actually used. Keep your award letter, Form 1098-T, and receipts for required books and supplies, and ask the school or a tax professional if the award mixes services and aid.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

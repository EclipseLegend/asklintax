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
  id:            '34',
  title:         'My parents paid my tuition directly — do I report a foreign gift?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens whose nonresident alien parents pay school costs. Explains how qualified tuition and medical payments are treated for Form 3520 Part IV. It does not cover education tax credits, scholarships, 529 plans, or the foreign donor\'s own country\'s tax rules',
  persona:       ['College and graduate students with parents abroad', 'Students who became U.S. tax residents', 'Parents of U.S.-resident children studying in the U.S.', 'Families paying medical bills for a relative in the U.S.'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Separate what your parents paid directly to the school for tuition from everything else (money sent to you, housing, books, living costs). Only direct tuition payments to a qualifying school are left out of the Form 3520 count. Add everything else to your other gifts for the year and compare the total to $100,000.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Instructions for Form 709 (2025), educational and medical exclusions', url: 'https://www.irs.gov/instructions/i709' },
  ],
}

const FAQS = [
  {
    q: 'The tuition money went to my own bank account first, and I paid the school the same day. Is that excluded?',
    a: 'No. The exception is for amounts paid on your behalf directly to the school. Money sent to you is a gift to you, even if you pay the school right away. It counts toward your $100,000 related total for the year.',
  },
  {
    q: 'My parents also paid my dorm and meal plan directly to the university. Is that excluded too?',
    a: 'No. Only tuition qualifies. Under the educational exclusion that Form 3520 relies on, amounts for books, supplies, room and board, and similar expenses are not covered, even when paid to the school. Those payments are gifts to you.',
  },
  {
    q: 'Does this work for a language school, a high school, or a coding bootcamp?',
    a: 'The payment must go to a qualifying educational organization — one that normally maintains a regular faculty and curriculum and has a regularly enrolled body of students where it carries on its educational activities. Many schools qualify; some programs may not. If in doubt, have it checked.',
  },
  {
    q: 'Do medical bills work the same way?',
    a: 'Yes, in a similar narrow way. Payments made directly to the person or institution providing medical care (and payments for medical insurance) can be qualified transfers. Money sent to you that you use for medical bills is a gift to you. A payment later reimbursed by your insurance is not covered to the extent of the reimbursement.',
  },
  {
    q: 'If tuition is excluded, do I need to report anything about it?',
    a: 'A qualified tuition payment made directly to your school is not a foreign gift for Form 3520, so it is not counted or listed in Part IV. Keep the school\'s payment records anyway — they show why the amount was left out.',
  },
  {
    q: 'I am an international student and a nonresident alien. Does any of this apply?',
    a: 'Form 3520 Part IV is filed by U.S. persons. If you were a nonresident alien for the whole year, Part IV generally does not apply to you. Many students become residents after several years, so check your status each year.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to foreign gifts, taxability, and Form 3520.',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
    desc:  'Living costs, rent money, and other support during the year: how it adds up.',
  },
  {
    href: '/library/individual/substantial-presence-test',
    cat:  'Individuals & Families',
    title: 'Substantial Presence Test explained: how to count your days',
    desc:  'Students and the exempt-individual rules: when do you become a U.S. tax resident?',
  },
  {
    href: '/library/investment/foreign-gift-over-100000',
    cat:  'Investments & Foreign Accounts',
    title: 'Parents overseas sent me more than $100,000 — do I need Form 3520?',
    desc:  'The direct answer when total support crosses $100,000.',
  },
]

export default function ForeignGiftTuitionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Parents Abroad Paid My Tuition Directly: Is It a Foreign Gift? | AskLinTax',
      description: 'Tuition paid directly to a school by parents overseas is not a foreign gift for Form 3520. But money sent to you, room and board, and books are. How the narrow tuition and medical exception works.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          If your nonresident parents pay your <strong>tuition directly to a qualifying school</strong>, that payment is <strong>not a foreign gift</strong> for Form 3520 purposes. You do not count it toward the $100,000 threshold and you do not list it in Part IV.
        </p>
        <p>
          The exception is narrow. It does <strong>not</strong> cover:
        </p>
        <ul>
          <li>money your parents send <strong>to you</strong>, even if you use it for tuition</li>
          <li>books, supplies, room and board, and similar non-tuition expenses — even if paid to the school (applying the same rule, rent and general living costs are not tuition either)</li>
          <li>payments to anyone other than the educational organization itself</li>
        </ul>
        <p>
          Everything outside the exception is a gift to you and is added to your other gifts for the year.
        </p>

        <h2>Where the rule comes from</h2>
        <p>
          The Form 3520 instructions say a gift to a U.S. person does not include amounts paid for <strong>qualified tuition or medical payments made on behalf of</strong> the U.S. person. In the tax code, the foreign gift reporting rule (section 6039F) borrows the definition of a "qualified transfer" from the gift tax rules (section 2503(e)). The IRS's gift tax instructions explain that definition:
        </p>
        <ul>
          <li>The payment must be made <strong>directly to the qualifying educational organization</strong>, and it must be for <strong>tuition</strong>.</li>
          <li>No exclusion applies to amounts for <strong>books, supplies, room and board</strong>, or other similar expenses that are not direct tuition costs.</li>
          <li>A qualifying educational organization is one that normally maintains a regular faculty and curriculum and normally has a regularly enrolled body of students in attendance where its educational activities are regularly carried on.</li>
        </ul>

        <ArticleTable
          head={['What your parents paid', 'Foreign gift for Form 3520?']}
          rows={[
            ['Tuition, wired directly to your U.S. university', 'No — qualified tuition payment'],
            ['Tuition money wired to you, then you paid the school', 'Yes — a gift to you'],
            ['Dormitory and meal plan, paid directly to the university', 'Yes — room and board is not tuition'],
            ['Textbooks and laptop', 'Yes — books and supplies are outside the exclusion (treating a laptop the same way is our application of that rule)'],
            ['Your apartment rent, paid to the landlord', 'Yes — our application of the rule: rent is not tuition and is not paid to a school'],
            ['A hospital bill, paid directly to the hospital', 'No — qualified medical payment (to the extent not reimbursed by insurance)'],
          ]}
        />

        <h2>A worked example</h2>
        <p>
          Chen is a U.S. resident for tax purposes and a graduate student in Boston. During 2025 her parents in Guangzhou:
        </p>
        <ul>
          <li>wire <strong>$55,000</strong> directly to her university for tuition,</li>
          <li>pay <strong>$18,000</strong> to the university for on-campus housing and meals, and</li>
          <li>send <strong>$40,000</strong> to Chen's U.S. account for living costs.</li>
        </ul>
        <p>
          The $55,000 tuition payment is excluded. The housing payment and the money sent to Chen are gifts: $18,000 + $40,000 = <strong>$58,000</strong>. That is not more than $100,000, so Chen does not file Form 3520 for 2025 — unless other gifts from her parents or their relatives push the total over.
        </p>
        <p>
          Now change one fact: her parents send all $113,000 to Chen, and she pays the school herself. Every dollar is a gift to her, the related total is over $100,000, and Form 3520 Part IV is required. Same family, same school, different paperwork — because of <strong>who</strong> was paid.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 If your parents can pay the school directly, the record is cleaner</div>
          <p>Paying tuition straight to the school keeps it outside the Form 3520 count and leaves a clear paper trail. Ask the school's bursar office how international wire payments are credited to your account, and keep the receipts.</p>
        </div>

        <h2>Don't over-extend the exception</h2>
        <p>
          The IRS guidance does not list the situations below by name. They are our applications of the two rules above — direct payment to the school, and tuition only:
        </p>
        <ul>
          <li><strong>Not "education costs" in general.</strong> Only tuition qualifies. Fees billed alongside tuition may need a closer look.</li>
          <li><strong>Not reimbursements.</strong> Paying you back for tuition you already paid is a gift to you.</li>
          <li><strong>Not prepaid accounts you control.</strong> Money placed in your own account, or in an account you can use freely, is a gift to you.</li>
          <li><strong>Medical is narrow too.</strong> Payments must go to the care provider (or be for medical insurance). An amount later reimbursed by insurance is not covered to the extent reimbursed.</li>
        </ul>

        <h2>Tuition doesn't change the tax answer — only the reporting count</h2>
        <p>
          Whether paid directly or sent to you, a true gift from your parents is generally not taxable income to you. The tuition exception matters for <strong>reporting</strong>: it keeps direct tuition payments out of the Form 3520 total. Education tax credits, scholarships, and other school-related tax rules are separate topics.
        </p>

        <h2>Records to keep</h2>
        <ul>
          <li>The school's statement or receipt showing the payment came from your parents and was applied to tuition</li>
          <li>A breakdown separating tuition from housing, meals, and fees</li>
          <li>Wire records for every amount your parents sent to you</li>
          <li>A year-end total of gifts that are not tuition, in U.S. dollars</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Ask a tax professional if your school bills tuition together with other fees, if a program may not be a qualifying educational organization, if payments came from a company or trust, or if you are not sure whether you were a U.S. resident for the year (see <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a>).
        </p>

      </KnowledgePage>
    </Layout>
  )
}

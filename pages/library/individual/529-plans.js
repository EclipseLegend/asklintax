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
  id:            '75',
  title:         '529 Plans: Expanded K-12 and Credential Expenses Explained',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal tax rules for 529 plans (qualified tuition programs) based on IRS Tax Topic 313 (updated September 2026) and Publication 970 (2025), including the expanded K-12 and postsecondary credentialing expenses. Per Tax Topic 313, the K-12 annual limit is $10,000 for 2025 and $20,000 beginning in 2026. The IRS sources reviewed do not state the exact dates the expanded K-12 and credentialing expenses began to apply. State tax rules for 529 plans differ and are not covered',
  persona:       ['Parents saving for K-12 or college costs', 'Adults pursuing a license or professional credential', 'Families coordinating 529 withdrawals with education credits', 'Grandparents who contribute to a 529 plan'],
  relatedJourney: ['Planning for a child', 'Understanding new tax rules'],
  actionRequired: 'Before taking a 529 withdrawal, match it to qualified expenses in the same year, keep receipts, and avoid using the same expenses for an education credit. For K-12 withdrawals, stay within the annual limit — $10,000 for 2025, $20,000 beginning in 2026 — and check your state plan\'s rules.',
  sources: [
    { label: 'IRS — Topic no. 313, Qualified tuition programs (QTPs)', url: 'https://www.irs.gov/taxtopics/tc313' },
    { label: 'IRS — Publication 970 (2025), Tax Benefits for Education (Chapter 7, Qualified Tuition Program)', url: 'https://www.irs.gov/pub/irs-pdf/p970.pdf' },
    { label: 'IRS — Instructions for Form 5329 (additional tax on education accounts)', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
    { label: 'IRS — Working Families Tax Cuts (One, Big, Beautiful Bill provisions)', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
  ],
}

const FAQS = [
  {
    q: 'Can I use a 529 plan for private K-12 school?',
    a: 'Yes, for qualified elementary and secondary school expenses — tuition and several other K-12 expenses. The annual limit is $10,000 per beneficiary for 2025 and $20,000 beginning in 2026, counting all of the beneficiary\'s 529 plans together (IRS Tax Topic 313).',
  },
  {
    q: 'Did the K-12 limit increase for 2026?',
    a: 'Yes. IRS Tax Topic 313 (updated September 2026) says K-12 expenses are limited to a total of $20,000 per year from all of the beneficiary\'s 529 plans, with a $10,000 limit before December 31, 2025. Publication 970 (2025) still shows $10,000 because it covers the 2025 tax year.',
  },
  {
    q: 'Can a 529 plan pay for a professional license or trade credential?',
    a: 'Publication 970 (2025) lists qualified postsecondary credentialing expenses — tuition and fees, books and supplies, required testing fees, and required continuing education — for recognized postsecondary credential programs, such as programs leading to a state or federal occupational or professional license. The IRS sources reviewed do not state the exact date these expenses began to qualify.',
  },
  {
    q: 'Can I take the American Opportunity Credit and a tax-free 529 withdrawal in the same year?',
    a: 'Yes, but not for the same expenses. You must reduce the expenses used for the tax-free 529 withdrawal by the expenses used to figure the credit.',
  },
  {
    q: 'What happens if I use 529 money for something else?',
    a: 'The earnings part of a nonqualified withdrawal is generally taxable, and a 10% additional tax generally applies to that taxable amount unless an exception applies, such as the beneficiary\'s death or disability or a tax-free scholarship.',
  },
  {
    q: 'Are 529 contributions tax-deductible?',
    a: 'Not on your federal return. Some states offer their own deductions or credits; state rules are not covered here.',
  },
]

const RELATED = [
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: 'Education tax credits: AOTC vs. Lifetime Learning Credit',
    desc:  'Coordinate credits with 529 withdrawals.',
  },
  {
    href: '/library/individual/trump-accounts',
    cat:  'Individuals & Families',
    title: 'Trump Accounts: Who Can Open One, the $1,000 Contribution, and the Rules',
    desc:  'A different kind of account for children.',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/gift-tax-form-709',
    cat: 'Individuals & Families',
    title: 'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026',
    desc: 'Gifts to a 529 plan and the 5-year election on Form 709.',
  },
]

export default function Plans529Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: '529 Plans: Expanded K-12 and Credential Expenses | AskLinTax',
      description: '529 plan tax rules: college, K-12, and credentialing expenses, the K-12 limit ($10,000 for 2025, $20,000 from 2026), education credits, and penalties.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>529 plan</strong> (the IRS calls it a qualified tuition program) lets you save for education. Contributions are not deductible on your federal return, but withdrawals are generally <strong>tax-free</strong> when they are used for <strong>qualified education expenses</strong> in the same year.
        </p>
        <p>
          The 2025 tax law expanded what counts. IRS guidance now lists several <strong>K-12 expenses beyond tuition</strong> and a new category of <strong>postsecondary credentialing expenses</strong>. The annual K-12 limit is <strong>$10,000 for 2025</strong> and <strong>$20,000 beginning in 2026</strong>, per beneficiary across all of the beneficiary's 529 plans (IRS Tax Topic 313).
        </p>

        <h2>Qualified higher education expenses</h2>
        <ul>
          <li>Tuition and fees, and books, supplies, and equipment required for enrollment or attendance at an eligible school.</li>
          <li>Room and board for students enrolled at least half-time, up to the school's cost-of-attendance allowance or actual charge.</li>
          <li>Computers, software, and internet access used primarily by the beneficiary while enrolled.</li>
          <li>Expenses for special-needs services, and costs of a registered apprenticeship program.</li>
          <li>Payments of principal or interest on qualified student loans of the beneficiary or a sibling — no more than $10,000 per individual (lifetime).</li>
        </ul>

        <h2>Expanded K-12 expenses</h2>
        <p>
          IRS Tax Topic 313 and Publication 970 (2025) list these as qualified elementary and secondary education expenses at a public, private, or religious school (kindergarten through grade 12):
        </p>
        <ArticleTable
          head={['K-12 expense', 'Notes']}
          rows={[
            ['Tuition', 'Long-standing K-12 expense'],
            ['Curriculum and curricular materials', ''],
            ['Books or other instructional materials', ''],
            ['Online educational materials', ''],
            ['Tutoring or educational classes outside the home', 'Only if the tutor is not related to the student and is a licensed teacher, has taught at an eligible institution, or is a subject-matter expert'],
            ['Standardized achievement tests, Advanced Placement exams, and college admission exams', 'Test fees'],
            ['Dual enrollment in a college or university', 'Fees'],
            ['Educational therapies for students with disabilities', 'Provided by a licensed or accredited practitioner — for example occupational, behavioral, physical, and speech-language therapy'],
          ]}
        />

        <h2>New: postsecondary credentialing expenses</h2>
        <p>
          Publication 970 (2025) also lists expenses for a <strong>recognized postsecondary credential program</strong>: tuition and fees; books, supplies, and equipment; testing fees required to obtain or maintain the credential; and continuing education fees required to maintain it. Recognized credentials include occupational or professional licenses issued or recognized by a state or the federal government, registered apprenticeship certificates, and certain accredited industry-recognized credentials. Programs qualify, for example, if they are on a state workforce (WIOA) eligible-training list or the Veterans Affairs WEAMS directory, or prepare students for a widely recognized credentialing exam.
        </p>

        <h2>2025 vs. 2026: what is confirmed</h2>
        <ArticleTable
          head={['Rule', '2025', '2026 and later']}
          rows={[
            ['K-12 annual limit (all of the beneficiary\'s 529 plans combined)', '$10,000', '$20,000'],
            ['Expanded K-12 expenses (beyond tuition)', 'Listed in Publication 970 (2025); exact start date not stated in the IRS sources reviewed', 'Listed in Tax Topic 313'],
            ['Postsecondary credentialing expenses', 'Listed in Publication 970 (2025); exact start date not stated in the IRS sources reviewed', 'Listed in Tax Topic 313'],
          ]}
        />
        <p>
          Tax Topic 313 states the K-12 limit as "$20,000 per year ($10,000 limit before Dec. 31, 2025)." Publication 970 has not yet been updated for 2026. The IRS sources reviewed for this guide do not state the exact date in 2025 when the expanded K-12 expenses and the credentialing expenses began to qualify, so if you used 529 money for one of these newer expenses in 2025, check with your plan or a tax professional.
        </p>

        <h2>Coordinating with education credits</h2>
        <p>
          You can claim the American Opportunity Credit or Lifetime Learning Credit in the same year you take a tax-free 529 withdrawal, but <strong>not for the same expenses</strong>. Expenses used to figure a credit reduce the expenses that make the 529 withdrawal tax-free. See <a href="/library/individual/education-tax-credits/">education tax credits</a>.
        </p>
        <p>
          <strong>New for 2026:</strong> Publication 970 (2025) says that beginning in 2026, a person claiming either credit must have a Social Security number that is valid for work and issued before the return's due date — and if the person claiming the credit is not the student, the student also needs a valid SSN. This requirement applies to the credits, not to 529 withdrawals.
        </p>

        <h2>Withdrawals that are not qualified</h2>
        <p>
          If withdrawals are more than the beneficiary's adjusted qualified education expenses, the earnings portion is taxable (reported as other income), and a <strong>10% additional tax</strong> generally applies to the taxable amount, figured on Form 5329. Exceptions to the 10% additional tax include the beneficiary's death or disability, a tax-free scholarship or certain other tax-free assistance, attendance at a U.S. military academy, and amounts taxable only because the expenses were used for an education credit.
        </p>

        <h2>Rollovers</h2>
        <ul>
          <li><strong>To another 529 plan or an ABLE account:</strong> generally tax-free if completed within 60 days, with limits on how often for the same beneficiary.</li>
          <li><strong>Changing the beneficiary</strong> to a member of the beneficiary's family is not taxable.</li>
          <li><strong>To a Roth IRA:</strong> allowed for the same beneficiary only as a direct trustee-to-trustee transfer from a 529 account open for more than 15 years, limited to contributions (and their earnings) made more than 5 years earlier, and subject to the annual Roth IRA contribution limit and the other limits in Publication 970.</li>
        </ul>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>K-12 (2025):</strong> Grace uses her daughter's 529 plan to pay $6,000 of private middle school tuition and $1,500 for tutoring by a licensed teacher who is not a relative. Both are listed as qualified K-12 expenses in Publication 970 (2025), and the total stays within the 2025 limit of $10,000.
        </p>
        <p>
          <strong>K-12 (2026):</strong> In 2026, Grace pays $14,000 of private high school tuition and $3,000 for curriculum materials from the 529 plan. The $17,000 total is within the <strong>$20,000</strong> limit for 2026. The same $17,000 in 2025 would have been over that year's $10,000 limit.
        </p>
        <p>
          <strong>Credential:</strong> Marco, age 30, uses his 529 plan to pay tuition and the required exam fee for a program that prepares him for a state-issued occupational license. These are qualified postsecondary credentialing expenses under Publication 970 (2025).
        </p>
        <p>
          <strong>College with a credit:</strong> Amy's college charges $10,000 of tuition. Her parents use $4,000 of it to claim the American Opportunity Credit and pay the other $6,000 from the 529 plan. Only the $6,000 counts for the tax-free withdrawal — the same $4,000 cannot be used twice.
        </p>
        <p>
          <strong>Nonqualified use:</strong> Ben withdraws $5,000 and uses it to buy a car. If $1,000 of the withdrawal is earnings, that $1,000 is taxable and the 10% additional tax is generally $100.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"529 money can only be used for college."</strong> It can also be used for qualified K-12 expenses, registered apprenticeships, certain student loan payments, and — under Publication 970 (2025) — recognized credential programs.</li>
          <li><strong>"Contributions reduce my federal tax."</strong> They are not deductible on the federal return.</li>
          <li><strong>"I can use the same tuition for a credit and a tax-free 529 withdrawal."</strong> The same expenses cannot be used for both.</li>
          <li><strong>"Any K-12 cost is covered without a limit."</strong> K-12 withdrawals are limited to $10,000 for 2025 and $20,000 beginning in 2026, per beneficiary across all 529 plans.</li>
          <li><strong>"The $20,000 K-12 limit already applied in 2025."</strong> It begins in 2026; the 2025 limit is $10,000.</li>
          <li><strong>"My state treats 529 withdrawals the same way."</strong> State rules can differ, including for K-12 and other expanded expenses.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Guidance still catching up</div>
          <p>The $20,000 K-12 limit for 2026 comes from IRS Tax Topic 313 (updated September 2026). Publication 970 and some other IRS pages about 529 plans have not yet been updated for 2026. The IRS sources reviewed do not state the exact dates the expanded K-12 and credentialing expenses began to apply. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

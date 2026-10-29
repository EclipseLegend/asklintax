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
  id:            '124',
  title:         'Medical Expense Deduction: The 7.5% Rule and Whose Expenses Count',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the itemized deduction for medical and dental expenses, based on Publication 502 (2025) and Publication 969 (2025). 2026 long-term care premium limits are from Rev. Proc. 2025-32, and 2026 medical mileage rates are from the IRS standard mileage rates page (reviewed July 2026); a 2026 Publication 502 was not yet available. It does not cover every possible expense, the self-employed health insurance deduction in detail, or state rules',
  persona:       ['Families with large medical or dental bills', 'People paying for a parent\'s care', 'Retirees with long-term care costs', 'Anyone deciding whether to itemize'],
  relatedJourney: ['Filing with dependents', 'Preparing to file'],
  actionRequired: 'Add up the unreimbursed medical and dental expenses you paid during the year for yourself, your spouse, and your dependents. Only the amount above 7.5% of your AGI counts, and only if you itemize on Schedule A. Check whether a parent or other relative meets the citizenship or residency requirement before including their bills.',
  sources: [
    { label: 'IRS — Publication 502 (2025), Medical and Dental Expenses', url: 'https://www.irs.gov/pub/irs-pdf/p502.pdf' },
    { label: 'IRS — Publication 969 (2025), Health Savings Accounts and Other Tax-Favored Health Plans', url: 'https://www.irs.gov/pub/irs-pdf/p969.pdf' },
    { label: 'IRS — Standard mileage rates', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'How much of my medical expenses can I deduct?',
    a: 'Only the part of your unreimbursed medical and dental expenses that is more than 7.5% of your adjusted gross income (AGI), and only if you itemize deductions on Schedule A. If your AGI is $80,000, the first $6,000 of expenses gives no deduction.',
  },
  {
    q: 'Can I include my parents\' medical bills?',
    a: 'Yes, if the parent was your dependent when the care was given or when you paid — and the parent was a U.S. citizen or national, or a resident of the United States, Canada, or Mexico. A qualifying relative generally must have gross income below $5,200 for 2025 ($5,300 for 2026). For the medical deduction only, you can still include the expenses if the parent fails the dependent rules solely because of that gross income test, because they filed a joint return, or because you could be claimed as someone else\'s dependent; the other tests, such as support and citizenship or residency, still apply. A parent living in Taiwan or China who is not a U.S. citizen, national, or resident generally does not qualify.',
  },
  {
    q: 'Are health insurance premiums deductible?',
    a: 'Premiums you pay with after-tax money for medical care coverage generally count. Premiums paid through a pre-tax salary reduction do not. Long-term care insurance premiums count only up to an age-based limit. If you are self-employed, a separate deduction for health insurance may apply instead.',
  },
  {
    q: 'Can I deduct medicine I bought overseas?',
    a: 'Generally you cannot include a prescribed drug brought in or shipped from another country unless it was imported legally. You can include a prescribed drug you buy and use in another country if it is legal in both that country and the United States. Non-prescription drugs, other than insulin, do not count.',
  },
  {
    q: 'What about expenses paid from an HSA or FSA, or reimbursed by insurance?',
    a: 'You cannot deduct expenses equal to a tax-free HSA distribution, expenses reimbursed by a flexible spending arrangement (FSA) you fund with pre-tax salary contributions, or expenses reimbursed by insurance or a health reimbursement arrangement. Only unreimbursed amounts you paid count.',
  },
  {
    q: 'Which year do I deduct the expense in?',
    a: 'Generally the year you pay, not the year you received care. Expenses charged to a credit card count in the year charged, even if you pay the card later.',
  },
]

const RELATED = [
  {
    href: '/library/individual/claim-parent-as-dependent',
    cat:  'Individuals & Families',
    title: 'Can I claim my parents as dependents if they live abroad?',
    desc:  'The dependent and residency tests for parents.',
  },
  {
    href: '/library/individual/health-savings-account-hsa',
    cat:  'Individuals & Families',
    title: 'Health Savings Accounts (HSA): 2025 and 2026 Limits and the New 2026 Rules',
    desc:  'A tax-free way to pay medical costs.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Why an itemized deduction may not help everyone.',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: 'SALT Deduction: Limits, Income Rules, and Examples',
    desc:  'Another itemized deduction to compare.',
  },
]

export default function MedicalExpenseDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Medical Expense Deduction: The 7.5% Rule and Whose Expenses Count | AskLinTax',
      description: 'How the medical expense deduction works: the 7.5% of AGI floor, itemizing on Schedule A, what counts, insurance and long-term care premiums, medical mileage for 2025 and 2026, and whose expenses you can include — including parents living abroad.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          You can deduct unreimbursed medical and dental expenses only to the extent they exceed <strong>7.5% of your AGI</strong>, and only if you <strong>itemize</strong> on Schedule A instead of taking the standard deduction. The expenses can be for you, your spouse, and your <strong>dependents</strong> — but a dependent generally must be a U.S. citizen or national, or a resident of the U.S., Canada, or Mexico.
        </p>

        <h2>How the 7.5% floor works</h2>
        <ArticleTable
          head={['', 'Example']}
          rows={[
            ['AGI', '$80,000'],
            ['7.5% floor', '$6,000'],
            ['Unreimbursed medical and dental expenses paid', '$9,500'],
            ['Amount on Schedule A', '$3,500'],
            ['Does it help?', 'Only if your total itemized deductions are more than your standard deduction'],
          ]}
        />

        <h2>What counts and what does not</h2>
        <ArticleTable
          head={['Generally counts', 'Generally does not count']}
          rows={[
            ['Payments to doctors, dentists, and other medical practitioners; hospital care', 'Cosmetic surgery, unless needed for a deformity from a congenital abnormality, accident, or disfiguring disease'],
            ['Prescription drugs and insulin', 'Non-prescription drugs (other than insulin)'],
            ['Medical insurance premiums paid with after-tax money', 'Premiums paid by pre-tax salary reduction'],
            ['Qualified long-term care premiums, up to an age-based limit', 'Gym, health club, or spa dues (even for general health)'],
            ['Transportation primarily for and essential to medical care', 'Expenses reimbursed by insurance, an HRA, or a pre-tax FSA, or paid with tax-free HSA money'],
          ]}
        />
        <p>
          Medical expenses are the costs of diagnosis, cure, mitigation, treatment, or prevention of disease, and for the purpose of affecting any part or function of the body. Publication 502 lists many specific items.
        </p>

        <h2>2025 and 2026 amounts</h2>
        <ArticleTable
          head={['Item', '2025', '2026']}
          rows={[
            ['Medical mileage rate', '21 cents per mile', '20.5 cents (January 1 – June 30); 23.5 cents (July 1 – December 31)'],
            ['Long-term care premium limit — age 40 or under', '$480', '$500'],
            ['Age 41 to 50', '$900', '$930'],
            ['Age 51 to 60', '$1,800', '$1,860'],
            ['Age 61 to 70', '$4,810', '$4,960'],
            ['Age 71 or over', '$6,020', '$6,200'],
          ]}
        />
        <p>
          The 2025 figures are from Publication 502 (2025). The 2026 long-term care limits are from Rev. Proc. 2025-32, and the 2026 mileage rates are from the IRS standard mileage rates page. Parking fees and tolls can be added to either the mileage rate or actual car expenses.
        </p>

        <h2>Whose expenses you can include</h2>
        <ul>
          <li><strong>You and your spouse.</strong></li>
          <li><strong>Your dependents</strong> — a qualifying child or qualifying relative who was your dependent either when the care was given or when you paid.</li>
          <li><strong>Citizenship or residency:</strong> the person must be a U.S. citizen or national, or a resident of the United States, Canada, or Mexico. An adopted child who lived with a U.S. citizen or national as a member of the household for the year is an exception.</li>
          <li><strong>Gross income test:</strong> to be a qualifying relative in general, a person's gross income must be less than $5,200 for 2025 ($5,300 for 2026, under Rev. Proc. 2025-32).</li>
          <li><strong>Special rule for the medical deduction:</strong> you can still include expenses for someone who would have been your dependent except that their gross income was at or above that amount, they filed a joint return, or you (or your spouse) could be claimed as someone else's dependent. The person must still meet the other dependency tests, such as the relationship or household, support, and citizenship or residency tests.</li>
          <li><strong>Divorced or separated parents:</strong> a child can be treated as the dependent of both parents for this deduction, if certain custody and support conditions are met.</li>
          <li><strong>Multiple support agreements:</strong> if siblings share a parent's support under such an agreement, only the person treated as claiming the parent can include medical expenses, and only the amount they paid and were not repaid for.</li>
        </ul>

        <h2>Example: a parent visiting from abroad</h2>
        <p>
          Lin's mother is a citizen and resident of Taiwan and visits the U.S. for three months in 2025. Lin pays $12,000 for her hospital care. Because Lin's mother is not a U.S. citizen, national, or resident of the U.S., Canada, or Mexico, she does not meet the citizenship or residency requirement, so Lin generally cannot include the $12,000 — even though Lin paid it. If Lin's mother had become a U.S. resident for tax purposes, the result could be different; see <a href="/library/individual/claim-parent-as-dependent/">claiming a parent as a dependent</a>.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep receipts and proof of payment</div>
          <p>Keep bills, receipts, insurance statements showing what was reimbursed, and a mileage log for medical trips. Only expenses you actually paid, and that were not reimbursed, count.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

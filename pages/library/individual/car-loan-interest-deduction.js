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
  id:            '71',
  title:         'Car Loan Interest Deduction: Which Vehicles and Loans Qualify',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal deduction for qualified passenger vehicle loan interest for tax years 2025 through 2028, based on the final regulations (T.D. 10054, Internal Revenue Bulletin 2026-39), the 2025 Schedule 1-A and Form 1040 instructions, Notice 2025-57, and the Form 1098-VLI instructions. 2026 form line numbers come from draft forms. It does not cover business vehicle deductions or state tax rules',
  persona:       ['People who financed a new car, SUV, pickup, or motorcycle after 2024', 'Buyers comparing a loan with a lease', 'Rideshare drivers who mostly use the car personally', 'Borrowers who refinanced a car loan'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Check that the vehicle is new to you, assembled in the United States, and bought with a loan secured by a first lien after 2024. Keep your lender\'s interest statement (Form 1098-VLI for 2026), and enter the vehicle identification number (VIN) on your return when you claim the deduction on Schedule 1-A.',
  sources: [
    { label: 'IRS — T.D. 10054, final regulations on qualified passenger vehicle loan interest (Internal Revenue Bulletin 2026-39)', url: 'https://www.irs.gov/pub/irs-irbs/irb26-39.pdf' },
    { label: 'IRS — Schedule 1-A (Form 1040) (2025), Additional Deductions', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (including Schedule 1-A instructions)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — Working Families Tax Cuts: provisions for individuals and workers', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — IR-2025-129, Guidance on the new deduction for car loan interest', url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-on-the-new-deduction-for-car-loan-interest-under-the-one-big-beautiful-bill' },
    { label: 'IRS — Notice 2025-57, Transition relief for 2025 lender reporting', url: 'https://www.irs.gov/pub/irs-drop/n-25-57.pdf' },
    { label: 'IRS — Instructions for Form 1098-VLI, Vehicle Loan Interest Statement', url: 'https://www.irs.gov/pub/irs-pdf/i1098vli.pdf' },
    { label: 'IRS — Publication 505 (2026), Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does a used car qualify?',
    a: 'No. The original use of the vehicle must begin with you. The IRS instructions state that a used vehicle does not qualify.',
  },
  {
    q: 'I leased my car. Can I deduct the interest?',
    a: 'No. Lease financing does not qualify, and buying the car at the end of a lease does not qualify either, because the original use began with the leasing company.',
  },
  {
    q: 'Do I have to itemize or file jointly?',
    a: 'No. You can claim the deduction whether you itemize or take the standard deduction. The final regulations state that filing status does not affect eligibility; married couples filing jointly use a $200,000 phaseout threshold, and everyone else uses $100,000.',
  },
  {
    q: 'How do I know where my car was assembled?',
    a: 'Under the final regulations, you may rely on the plant of manufacture shown in the vehicle identification number (VIN) or the final assembly point on the label affixed to the vehicle. The IRS also points to the NHTSA VIN Decoder.',
  },
  {
    q: 'I use my car for rideshare driving sometimes. Does it still qualify?',
    a: 'It can, if you expect personal use (by you, your spouse, or certain relatives) for more than 50% of the time. A final-regulation example treats 85% personal and 15% rideshare use as personal use.',
  },
  {
    q: 'Does my state allow this deduction?',
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
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: 'Why do I owe taxes this year? Understanding your W-4 and withholding',
    desc:  'Account for the deduction on Form W-4.',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'Business use of a vehicle is handled differently.',
  },
]

export default function CarLoanInterestDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Car Loan Interest Deduction: Which Vehicles Qualify | AskLinTax',
      description: 'The federal car loan interest deduction for 2025–2028: new U.S.-assembled vehicles, first-lien loans, the $10,000 limit, income phaseout, VIN reporting, and what does not qualify.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          For <strong>2025 through 2028</strong>, you may deduct up to <strong>$10,000</strong> a year of interest on a loan used to buy a <strong>new</strong> car, minivan, van, SUV, pickup truck, or motorcycle for <strong>personal use</strong>, if the vehicle had its <strong>final assembly in the United States</strong> and the loan, taken out after 2024, is secured by a <strong>first lien</strong> on the vehicle. The deduction shrinks when modified adjusted gross income (MAGI) is over <strong>$100,000</strong> ($200,000 on a joint return).
        </p>
        <p>
          You claim it on Schedule 1-A whether you itemize or take the standard deduction, and you must report the vehicle identification number (VIN). Treasury and the IRS issued <strong>final regulations</strong> (T.D. 10054) in September 2026; they apply to tax years 2025 through 2028.
        </p>

        <h2>Who can claim it</h2>
        <ul>
          <li>Individuals (and certain estates and trusts). You do not need to itemize.</li>
          <li><strong>Any filing status:</strong> the final regulations state that filing status does not affect eligibility. Unlike the tips, overtime, and senior deductions, married couples are not required to file jointly. The Schedule 1-A instructions for this deduction do not include the Social Security number requirement that applies to those deductions; instead, the VIN must be reported.</li>
          <li>Nonresident aliens generally cannot deduct this interest, according to the final regulations.</li>
        </ul>

        <h2>Which loans qualify</h2>
        <ArticleTable
          head={['Requirement', 'Details']}
          rows={[
            ['Timing', 'The loan was taken out after December 31, 2024'],
            ['Your loan', 'Originally incurred by you (an exception applies when you take over a loan because the original borrower died)'],
            ['Purpose', 'Used to purchase the vehicle (not to lease it)'],
            ['Security', 'Secured by a first lien on the vehicle — a purchase on a credit card generally does not meet this'],
            ['Lender', 'Not a related person, such as certain family members or related businesses'],
            ['Refinancing', 'A refinanced loan secured by a first lien still qualifies, but only up to the old loan\'s balance at the time of refinancing'],
          ]}
        />
        <p>
          The final regulations also exclude loans to finance <strong>fleet sales</strong>, commercial vehicles not used for personal purposes, vehicles with a <strong>salvage title</strong>, and vehicles bought for scrap or parts.
        </p>

        <h2>Which vehicles qualify</h2>
        <ul>
          <li><strong>New to you:</strong> the original use must begin with you. A used vehicle does not qualify, and buying out a lease does not qualify.</li>
          <li><strong>Type:</strong> a car, minivan, van, sport utility vehicle, pickup truck, or motorcycle made primarily for use on public roads.</li>
          <li><strong>Weight:</strong> a gross vehicle weight rating under 14,000 pounds.</li>
          <li><strong>Final assembly in the United States:</strong> you may rely on the plant of manufacture in the VIN or the final assembly point on the vehicle's label. The IRS also points to the NHTSA VIN Decoder.</li>
          <li><strong>Personal use:</strong> you expect the vehicle to be used for personal purposes (by you, your spouse, or certain relatives) more than 50% of the time.</li>
        </ul>

        <h2>What part of the loan counts</h2>
        <p>
          Interest on amounts financed with the vehicle — such as sales tax, title and registration fees, service plans, extended warranties, GAP coverage, and vehicle accessories — can count. Interest on <strong>negative equity</strong> rolled over from a trade-in, regular collision or liability insurance, unrelated items (such as a trailer or boat), or cash you received from the lender does not. If only part of the loan qualifies, the interest is divided proportionally.
        </p>

        <h2>The limit and the income phaseout</h2>
        <ArticleTable
          head={['Rule', 'Amount']}
          rows={[
            ['Maximum deduction', '$10,000 per return, regardless of filing status (combined if a joint return has two vehicles)'],
            ['Phaseout starts', 'MAGI over $100,000, or over $200,000 on a joint return'],
            ['How it phases out', 'The deduction drops by $200 for each $1,000 — or part of $1,000 — of MAGI over the threshold'],
            ['Years', '2025 through 2028'],
          ]}
        />

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Maria</strong> (single, 2025) bought a new SUV assembled in the United States in March 2025 with a loan secured by a first lien. She paid $3,200 of interest in 2025 and her MAGI was $80,000. She can deduct the full <strong>$3,200</strong> on Schedule 1-A and must enter the VIN.
        </p>
        <p>
          <strong>Phaseout</strong> (the final regulations' example): a single taxpayer with $7,000 of qualifying interest and MAGI of $124,200 is $24,200 over $100,000. That rounds up to 25, so the deduction is reduced by 25 × $200 = $5,000, leaving <strong>$2,000</strong>.
        </p>
        <p>
          <strong>Two cars on a joint return:</strong> a married couple pays $6,000 and $5,000 of qualifying interest on two new vehicles. Their deduction cannot be more than <strong>$10,000</strong>.
        </p>
        <p>
          <strong>Refinancing with cash out:</strong> a borrower refinances a $30,000 loan balance into a new $38,000 loan and takes $8,000 in cash. Only interest on the $30,000 portion can count.
        </p>
        <p>
          <strong>Not qualifying:</strong> a used car bought with a loan, a lease, or a car bought at the end of a lease.
        </p>

        <h2>Reporting and forms</h2>
        <ArticleTable
          head={['Tax year', 'What to expect']}
          rows={[
            ['2025', 'Lenders could meet their reporting duty by making the total 2025 interest available to you — for example, in an online account or an annual statement — by January 31, 2026 (Notice 2025-57). Claim the deduction on Schedule 1-A, Part IV; the total goes to Form 1040, line 13b.'],
            ['2026', 'Lenders report interest of $600 or more on the new Form 1098-VLI (box 1), which also shows whether original use began with you (box 6) and whether final assembly was in the United States (box 7). In the draft 2026 Schedule 1-A and Form 1040, the Schedule 1-A total moves to line 13a; check the final forms.'],
          ]}
        />
        <p>
          You can also account for an expected deduction on Form W-4 (2026 Deductions Worksheet, line 1c) — see <a href="/library/individual/owe-taxes-withholding-w4/">W-4 and withholding</a>.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"Any car loan interest is deductible now."</strong> Only interest on a first-lien loan for a new, U.S.-assembled, personal-use vehicle bought after 2024, up to $10,000, with a phaseout.</li>
          <li><strong>"Leases count."</strong> Lease financing and lease buyouts do not qualify.</li>
          <li><strong>"I have to itemize."</strong> The deduction is available with the standard deduction too.</li>
          <li><strong>"Married couples must file jointly."</strong> Not for this deduction — filing status does not affect eligibility, though the phaseout threshold differs.</li>
          <li><strong>"A U.S. brand means U.S. assembly."</strong> What matters is where the specific vehicle had its final assembly.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal rules only</div>
          <p>State income tax rules can differ from federal law. 2026 line numbers come from draft IRS forms and may change. If you also use the vehicle for business, special rules prevent deducting the same interest twice.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

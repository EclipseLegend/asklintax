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
  id:            '66',
  title:         'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'An overview of the main federal changes for individuals under Public Law 119-21 (enacted July 4, 2025), which the IRS now also calls the Working Families Tax Cuts. It summarizes and links to detailed guides; it does not cover every provision, business provisions, or state tax rules, which can differ from federal law',
  persona:       ['Anyone filing a 2025 return', 'Workers who receive tips or overtime pay', 'Taxpayers age 65 or older', 'Homeowners and people in high-tax states who itemize'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Check which changes apply to you for each tax year. Several new deductions started with 2025 returns and are claimed on the new Schedule 1-A; others first apply in 2026. Use the detailed guides for the rules and limits.',
  sources: [
    { label: 'IRS — Working Families Tax Cuts: provisions for individuals and workers', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Working Families Tax Cuts (One, Big, Beautiful Bill provisions)', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Schedule 1-A (Form 1040) (2025), Additional Deductions', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (including Schedule 1-A instructions)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — IR-2026-28, New Schedule 1-A and Form 1040 instructions', url: 'https://www.irs.gov/newsroom/irs-published-schedule-taxpayers-will-use-to-claim-deductions-on-no-tax-on-tips-no-tax-on-overtime-no-tax-on-car-loans-no-tax-on-seniors' },
    { label: 'IRS — IR-2025-103, Tax year 2026 inflation adjustments', url: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Publication 505 (2026), Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — General Instructions for Forms W-2 and W-3 (2026)', url: 'https://www.irs.gov/instructions/iw2w3' },
    { label: 'IRS — Instructions for Forms 1099-MISC and 1099-NEC', url: 'https://www.irs.gov/instructions/i1099mec' },
  ],
}

const FAQS = [
  {
    q: 'Did the new tax law start in 2025 or in 2026?',
    a: 'Both. The law was enacted on July 4, 2025, and many changes apply to 2025 returns — including the higher standard deduction, the $2,200 Child Tax Credit, the higher SALT limit, and the new deductions for tips, overtime, car loan interest, and seniors. Some changes, such as the charitable deduction for people who do not itemize and the higher Child and Dependent Care Credit rate, first apply in 2026.',
  },
  {
    q: 'Does "no tax on tips" or "no tax on overtime" mean that income is tax-free?',
    a: 'No. These are federal income tax deductions with limits, eligibility rules, and income phaseouts. Tips and overtime are still included in income and are still subject to Social Security and Medicare taxes.',
  },
  {
    q: 'Do I have to itemize to claim the new deductions?',
    a: 'No. The deductions for qualified tips, qualified overtime compensation, qualified passenger vehicle loan interest, and the enhanced deduction for seniors are claimed on Schedule 1-A whether you take the standard deduction or itemize. The SALT deduction is different: it only helps if you itemize on Schedule A.',
  },
  {
    q: 'How long do the new Schedule 1-A deductions last?',
    a: 'The IRS describes the tips, overtime, car loan interest, and senior deductions as effective for 2025 through 2028.',
  },
  {
    q: 'Does my state follow these federal changes?',
    a: 'Not necessarily. State income tax rules can differ from federal law. This guide covers federal rules only; check your state tax agency\'s guidance.',
  },
]

const RELATED = [
  {
    href: '/library/individual/no-tax-on-tips',
    cat:  'Individuals & Families',
    title: 'No Tax on Tips: Who Qualifies for the Deduction?',
    desc:  'Qualified tips, eligible occupations, limits, and phaseouts.',
  },
  {
    href: '/library/individual/no-tax-on-overtime',
    cat:  'Individuals & Families',
    title: 'No Tax on Overtime: How the Deduction Really Works',
    desc:  'Only the overtime premium counts — and how 2026 reporting works.',
  },
  {
    href: '/library/individual/senior-deduction',
    cat:  'Individuals & Families',
    title: 'The New $6,000 Senior Deduction: Eligibility and Income Limits',
    desc:  'A separate deduction for people age 65 or older.',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: 'SALT Deduction: Limits, Income Rules, and Examples',
    desc:  'The $40,000 limit for 2025 and the high-income reduction.',
  },
]

export default function TaxLawChanges20252026Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'The 2025 Tax Law: What Changed for 2025 and 2026 Returns | AskLinTax',
      description: 'What the 2025 federal tax law changed for individuals, year by year: new deductions for tips, overtime, car loans and seniors, the SALT limit, and 2026 changes.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A federal tax law enacted on <strong>July 4, 2025</strong> (Public Law 119-21, which the IRS now also calls the <strong>Working Families Tax Cuts</strong>) changed several rules for individuals. Many changes apply starting with your <strong>2025 return</strong>, not 2026. Others first apply in <strong>2026</strong>. This guide separates the two and links to detailed guides for the biggest changes.
        </p>
        <p>
          Four new deductions — for qualified tips, qualified overtime compensation, car loan interest, and seniors — are claimed on a new form, <strong>Schedule 1-A</strong>. They are available whether you take the standard deduction or itemize, and the IRS describes them as effective for <strong>2025 through 2028</strong>. They are deductions with limits and income phaseouts, not blanket tax exemptions.
        </p>

        <h2>Changes that start with your 2025 return</h2>
        <ArticleTable
          head={['Change', 'What it means for 2025', 'Details']}
          rows={[
            ['Standard deduction', '$15,750 single or married filing separately; $31,500 married filing jointly; $23,625 head of household', 'Do I need to file?'],
            ['Child Tax Credit', 'Up to $2,200 per qualifying child; up to $1,700 refundable; Social Security number requirements apply', 'Child Tax Credit guide'],
            ['Qualified tips deduction', 'Up to $25,000; reduced when modified adjusted gross income (MAGI) is over $150,000 ($300,000 joint)', 'No Tax on Tips'],
            ['Qualified overtime deduction', 'Up to $12,500 ($25,000 joint) of the overtime premium; same MAGI phaseout as tips', 'No Tax on Overtime'],
            ['Enhanced deduction for seniors', 'Up to $6,000 per person age 65 or older; reduced when MAGI is over $75,000 ($150,000 joint)', 'Senior deduction'],
            ['Car loan interest deduction', 'Up to $10,000 of qualified passenger vehicle loan interest; reduced when MAGI is over $100,000 ($200,000 joint)', 'See below'],
            ['State and local tax (SALT) limit', '$40,000 ($20,000 married filing separately) for people who itemize; reduced at higher incomes', 'SALT deduction'],
            ['Form 1099-K reporting', 'Payment apps and online marketplaces report when payments exceed $20,000 and there are more than 200 transactions', 'Form 1099-K guide'],
            ['Adoption credit', 'Up to $5,000 of the credit can be refundable', 'IRS adoption credit information'],
          ]}
        />
        <p>
          Read more: <a href="/library/individual/do-i-need-to-file/">Do I need to file?</a> · <a href="/library/individual/child-tax-credit/">Child Tax Credit</a> · <a href="/library/individual/no-tax-on-tips/">No Tax on Tips</a> · <a href="/library/individual/no-tax-on-overtime/">No Tax on Overtime</a> · <a href="/library/individual/senior-deduction/">The new senior deduction</a> · <a href="/library/individual/salt-deduction/">SALT deduction</a> · <a href="/library/individual/form-1099-k/">Form 1099-K</a>
        </p>

        <h2>Changes that first apply in 2026</h2>
        <ArticleTable
          head={['Change', 'What it means for 2026']}
          rows={[
            ['Inflation adjustments', 'Standard deduction $16,100 single; $32,200 married filing jointly; $24,150 head of household. The Child Tax Credit stays at $2,200 per child, with up to $1,700 refundable. Maximum Earned Income Tax Credit $8,231'],
            ['Charitable deduction if you do not itemize', 'Up to $1,000 of cash contributions to eligible charities ($2,000 married filing jointly). Some gifts, such as contributions to donor-advised funds, do not qualify'],
            ['Child and Dependent Care Credit', 'The maximum credit rate rises from 35% to 50% of qualifying expenses; the expense limits stay at $3,000 (one person) and $6,000 (two or more)'],
            ['State and local tax (SALT) limit', 'For people who itemize: $40,400 ($20,200 married filing separately); reduced when MAGI is over $505,000 ($252,500 married filing separately), but not below $10,000 ($5,000)'],
            ['1099-NEC and 1099-MISC reporting', 'The minimum reporting threshold for many payments rises from $600 to $2,000; some payments, such as royalties, keep other thresholds'],
            ['New Form W-2 codes', 'Employers report cash tips (box 12, code TP), qualified overtime (box 12, code TT), and Trump account contributions (box 12, code TA)'],
            ['Trump Accounts', 'Contributions began July 4, 2026; the IRS describes a one-time $1,000 federal contribution for each eligible child and contributions of up to $5,000 per year'],
          ]}
        />
        <p>
          The new deductions for tips, overtime, car loan interest, and seniors continue for 2026. For 2026 tips and overtime, employers report the amounts on Form W-2, which changes how you find the numbers — see the tips and overtime guides. The IRS has not yet published final 2026 Schedule 1-A instructions. More detail: <a href="/library/individual/charitable-deduction-2026/">charitable donations in 2026</a> · <a href="/library/individual/child-dependent-care-credit/">Child and Dependent Care Credit</a> · <a href="/library/individual/trump-accounts/">Trump accounts</a>
        </p>

        <h2>How the four new deductions work</h2>
        <p>
          All four are figured on <strong>Schedule 1-A</strong> and entered on Form 1040, line 13b. They are taken after adjusted gross income, in addition to your standard deduction or itemized deductions. Each one starts from your modified adjusted gross income (MAGI) in Part I of Schedule 1-A. For the tips, overtime, and senior deductions, married people must file a joint return, and the person who received the tips or overtime, or who is claiming the senior deduction, needs a Social Security number valid for employment. The car loan interest deduction has different requirements — see below.
        </p>
        <ArticleTable
          head={['Deduction', 'Maximum', 'Phaseout starts above (MAGI)', 'Reduction']}
          rows={[
            ['Qualified tips', '$25,000 per return', '$150,000 ($300,000 joint)', '$100 for each full $1,000 over'],
            ['Qualified overtime', '$12,500 ($25,000 joint)', '$150,000 ($300,000 joint)', '$100 for each full $1,000 over'],
            ['Car loan interest', '$10,000', '$100,000 ($200,000 joint)', '$200 for each $1,000 or part of $1,000 over'],
            ['Seniors (age 65+)', '$6,000 per eligible person', '$75,000 ($150,000 joint)', '6% of MAGI over the threshold'],
          ]}
        />

        <h2>The car loan interest deduction</h2>
        <p>
          You may deduct up to <strong>$10,000</strong> a year of interest on a loan used to buy a qualifying vehicle for <strong>personal use</strong>. According to the IRS, the loan must have originated after December 31, 2024, be secured by a first lien on the vehicle, and be used to buy a vehicle whose original use began with you. The vehicle must be a car, minivan, van, SUV, pickup truck, or motorcycle with a gross vehicle weight rating under 14,000 pounds that underwent <strong>final assembly in the United States</strong>. Lease payments do not qualify, and you must include the vehicle identification number (VIN) on your return. See <a href="/library/individual/car-loan-interest-deduction/">the car loan interest deduction guide</a> for details.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal rules only</div>
          <p>This guide covers federal income tax. State tax rules can differ from federal law, so do not assume your state allows the same deductions. Check your state tax agency's guidance.</p>
        </div>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"Everything starts in 2026."</strong> Many changes, including the four Schedule 1-A deductions and the higher SALT limit, apply to 2025 returns.</li>
          <li><strong>"Tips and overtime are now tax-free."</strong> They remain taxable income subject to Social Security and Medicare taxes; the deductions are limited and phase out at higher incomes.</li>
          <li><strong>"I have to itemize to get the new deductions."</strong> The Schedule 1-A deductions are available with the standard deduction too. Only the SALT deduction requires itemizing.</li>
          <li><strong>"The senior deduction replaces the extra standard deduction for age 65."</strong> It is in addition to the existing additional standard deduction.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

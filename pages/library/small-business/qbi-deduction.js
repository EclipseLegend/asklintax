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
  id:            '78',
  title:         'The QBI Deduction: 2025 and 2026 Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal qualified business income (QBI) deduction for tax years 2025 and 2026, based on the 2025 Instructions for Forms 8995 and 8995-A, IRS guidance on the QBI deduction, Revenue Procedure 2025-32, the 2026 Form 1040-ES, and the draft 2026 Instructions for Form 8995. The 2026 thresholds and the $400 minimum deduction come from final IRS guidance; the material participation details for the minimum deduction come from draft 2026 instructions. It does not cover REIT and PTP calculations, aggregation, or trusts and estates in detail',
  persona:       ['Sole proprietors and freelancers', 'Single-member LLC owners', 'S-Corp shareholders and partners', 'Higher-income professionals in service businesses'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'If you have income from a sole proprietorship, partnership, or S corporation, check whether you can claim the QBI deduction on Form 8995 (or Form 8995-A if your taxable income is above the threshold). For 2026, check whether the new $400 minimum deduction applies to you.',
  sources: [
    { label: 'IRS — Qualified business income deduction', url: 'https://www.irs.gov/newsroom/qualified-business-income-deduction' },
    { label: 'IRS — 2025 Instructions for Form 8995, Qualified Business Income Deduction Simplified Computation', url: 'https://www.irs.gov/pub/irs-pdf/i8995.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8995-A, Deduction for Qualified Business Income', url: 'https://www.irs.gov/pub/irs-pdf/i8995a.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments, sections 3.12 and 4.26)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Form 1040-ES (2026), Estimated Tax for Individuals', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' },
    { label: 'IRS — Draft 2026 Instructions for Form 8995 (not final)', url: 'https://www.irs.gov/pub/irs-dft/i8995--dft.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do I need to itemize to take the QBI deduction?',
    a: 'No. The IRS says the deduction is available whether you itemize on Schedule A or take the standard deduction. It is figured on Form 8995 or Form 8995-A.',
  },
  {
    q: 'Does the QBI deduction lower my self-employment tax?',
    a: 'No. It reduces taxable income for income tax only. It does not reduce adjusted gross income or self-employment tax.',
  },
  {
    q: 'Is my W-2 salary from my S corporation QBI?',
    a: 'No. Wages, reasonable compensation from an S corporation, and guaranteed payments from a partnership are not QBI. Your share of the business\'s income on Schedule K-1 can be.',
  },
  {
    q: 'What changes in 2026?',
    a: 'The 2025 tax law made the deduction permanent. For 2026, the income thresholds are $201,750 ($403,500 for joint returns; $201,775 for married filing separately), the phase-in range widens to $75,000 ($150,000 for joint returns), and a new minimum deduction of $400 applies if you have at least $1,000 of qualified business income from businesses in which you materially participate.',
  },
  {
    q: 'I am a consultant. Can I still take the deduction?',
    a: 'Consulting is a specified service trade or business (SSTB). If your taxable income is at or below the threshold, an SSTB can still qualify. Within the phase-in range, only part of it counts, and above the phase-in range, income from an SSTB does not qualify.',
  },
  {
    q: 'Which form do I use?',
    a: 'Use Form 8995 if you have QBI and your taxable income before the QBI deduction is at or below the threshold ($197,300, or $394,600 if married filing jointly, for 2025) and you are not a patron of a specified agricultural or horticultural cooperative. Otherwise, use Form 8995-A.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'Where sole proprietors figure the profit that becomes QBI.',
  },
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation',
    title: 'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
    desc:  'Why S-Corp wages are not QBI.',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
]

export default function QbiDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'The QBI Deduction: 2025 and 2026 Rules | AskLinTax',
      description: 'The 20% qualified business income deduction: who qualifies, what counts as QBI, 2025 and 2026 income thresholds, service businesses, the new 2026 $400 minimum, and Form 8995.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>qualified business income (QBI) deduction</strong>, also called the section 199A deduction, lets many owners of sole proprietorships, partnerships, and S corporations deduct up to <strong>20% of their qualified business income</strong>, plus 20% of qualified REIT dividends and qualified publicly traded partnership income. It is limited to 20% of taxable income (figured before the QBI deduction) minus net capital gain.
        </p>
        <ul>
          <li><strong>2025:</strong> the rules in place since 2018 apply, with 2025 income thresholds.</li>
          <li><strong>2026:</strong> the 2025 tax law made the deduction <strong>permanent</strong>, widened the phase-in ranges, and added a <strong>$400 minimum deduction</strong> for taxpayers with at least $1,000 of active QBI.</li>
        </ul>

        <h2>Who can take it</h2>
        <ul>
          <li>Individuals with income from a sole proprietorship (Schedule C), a single-member LLC taxed as one, a partnership, or an S corporation — and certain trusts and estates.</li>
          <li>You can take it whether you itemize or use the standard deduction.</li>
          <li>It does not apply to income earned through a C corporation, or to wages you earn as an employee.</li>
        </ul>

        <h2>What counts as QBI — and what does not</h2>
        <ArticleTable
          head={['Generally counts', 'Does not count']}
          rows={[
            ['Net income from a qualified U.S. trade or business', 'Wages from a job'],
            ['Your share of business income from a partnership or S corporation (Schedule K-1)', 'Reasonable compensation from an S corporation'],
            ['Reduced by the deductible part of self-employment tax, self-employed health insurance, and retirement plan deductions tied to the business', 'Guaranteed payments from a partnership'],
            ['', 'Capital gains and losses, and most interest and dividends'],
            ['', 'Tips deducted as qualified tips (2025 through 2028) that are excluded from the business\'s net profit'],
          ]}
        />

        <h2>Income thresholds: 2025 vs. 2026</h2>
        <ArticleTable
          head={['Filing status', '2025 threshold', '2025 top of phase-in', '2026 threshold', '2026 top of phase-in']}
          rows={[
            ['Married filing jointly', '$394,600', '$494,600', '$403,500', '$553,500'],
            ['Married filing separately', '$197,300', '$247,300', '$201,775', '$276,775'],
            ['All other filers', '$197,300', '$247,300', '$201,750', '$276,750'],
          ]}
        />
        <p>
          The thresholds are based on taxable income before the QBI deduction. The 2025 amounts are from the 2025 Instructions for Forms 8995 and 8995-A; the 2026 amounts are from Revenue Procedure 2025-32.
        </p>
        <ArticleTable
          head={['Your taxable income', 'What happens']}
          rows={[
            ['At or below the threshold', 'Generally 20% of QBI, subject to the taxable income limit. A specified service business (SSTB) can qualify. You can usually use Form 8995.'],
            ['Within the phase-in range', 'A W-2 wage and property limit is phased in, and only part of an SSTB\'s income counts. Use Form 8995-A.'],
            ['Above the phase-in range', 'For each business, the deduction is limited to the greater of 50% of its W-2 wages, or 25% of its W-2 wages plus 2.5% of the unadjusted basis of its qualified property. Income from an SSTB does not qualify.'],
          ]}
        />

        <h2>Specified service businesses (SSTBs)</h2>
        <p>
          An SSTB is a business providing services in health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage services, investing and investment management, trading or dealing in securities, partnership interests, or commodities, or any business whose principal asset is the reputation or skill of its employees or owners (as defined in the regulations).
        </p>

        <h2>New for 2026: the $400 minimum deduction</h2>
        <ArticleTable
          head={['Rule', 'Source', 'Status']}
          rows={[
            ['Minimum QBI deduction of $400, for tax years beginning after December 31, 2025', 'Revenue Procedure 2025-32, section 3.12 (describing the 2025 tax law)', 'Enacted law, as described in final IRS guidance'],
            ['You must have at least $1,000 of qualified business income', 'Revenue Procedure 2025-32, section 3.12', 'Enacted law, as described in final IRS guidance'],
            ['The $400 and $1,000 amounts are adjusted for inflation after 2026', 'Revenue Procedure 2025-32, section 3.12', 'Enacted law, as described in final IRS guidance'],
            ['The $1,000 must come from businesses in which you materially participate (section 469(h)); passive income does not count', 'Draft 2026 Instructions for Form 8995', 'Draft — may change'],
            ['How the minimum is entered (a new line 17 on Form 8995)', 'Draft 2026 Instructions for Form 8995', 'Draft — may change'],
          ]}
        />
        <p>
          The IRS describes the 2026 rule as the greater of the regular deduction (after the taxable income limit) or the minimum deduction for active qualified business income. Material participation is not required for the regular QBI deduction — only for the minimum deduction.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>2025 — taxable income limit:</strong> Jen is single and a freelance graphic designer. Her Schedule C profit is $80,000, and the deductible part of her self-employment tax is about $5,652, so her QBI is about $74,348 and her AGI is also about $74,348. After the $15,750 standard deduction, her taxable income before the QBI deduction is about $58,598. Her deduction is the smaller of 20% of QBI (about $14,870) or 20% of taxable income (about <strong>$11,720</strong>) — so about $11,720.
        </p>
        <p>
          <strong>2026 — minimum deduction:</strong> Ken materially participates in a small side business with $1,500 of qualified business income. 20% would be $300, but because his active QBI is at least $1,000, the minimum deduction of <strong>$400</strong> may apply, subject to the final 2026 rules.
        </p>
        <p>
          <strong>2026 — service business above the range:</strong> Mia is a single consultant with taxable income of $300,000 before the QBI deduction. That is above $276,750, so her consulting income — an SSTB — does not qualify for the deduction.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Counting S-Corp wages or guaranteed payments as QBI.</strong> They are not QBI.</li>
          <li><strong>Forgetting to reduce QBI</strong> for the deductible part of self-employment tax, self-employed health insurance, and retirement contributions.</li>
          <li><strong>Using Form 8995 when income is over the threshold.</strong> Above the threshold, use Form 8995-A.</li>
          <li><strong>Expecting the deduction to cut self-employment tax.</strong> It does not.</li>
          <li><strong>Applying the 2026 $400 minimum to 2025.</strong> It begins in 2026.</li>
        </ul>

        <h2>Forms and where it goes</h2>
        <ArticleTable
          head={['Form', 'Use']}
          rows={[
            ['Form 8995', 'Simplified computation, when taxable income is at or below the threshold'],
            ['Form 8995-A (and its schedules)', 'When taxable income is above the threshold, or you are a cooperative patron'],
            ['Form 1040', 'The deduction is entered on line 13a for 2025; the draft 2026 Form 1040 moves it to line 13b'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Some 2026 details are from draft instructions</div>
          <p>The 2026 thresholds and the $400 minimum deduction come from final IRS guidance (Revenue Procedure 2025-32). The material participation test and the new form line come from draft 2026 Form 8995 instructions, which may change. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

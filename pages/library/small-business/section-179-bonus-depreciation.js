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
  id:            '80',
  title:         'Section 179 and Bonus Depreciation: 2025 and 2026 Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal section 179 deduction and bonus (special) depreciation for small businesses for tax years 2025 and 2026, based on Publication 946 (2025), the 2025 Instructions for Schedule C, Publication 334 (2025), Revenue Procedure 2025-32, and IRS Notice 2026-11. Notice 2026-11 is interim guidance; proposed regulations are expected. Passenger automobile depreciation caps, real property, and state conformity are not covered in detail',
  persona:       ['Small business owners buying equipment', 'Freelancers buying computers, cameras, or tools', 'Sole proprietors and single-member LLC owners', 'Business owners planning year-end purchases'],
  relatedJourney: ['Running a small business', 'Understanding new tax rules'],
  actionRequired: 'When you buy business equipment, record the purchase date, the date you placed it in service, its cost, and your business-use percentage. Then decide on Form 4562 whether to use section 179, bonus depreciation, or regular depreciation.',
  sources: [
    { label: 'IRS — Publication 946 (2025), How To Depreciate Property', url: 'https://www.irs.gov/publications/p946' },
    { label: 'IRS — Instructions for Schedule C (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments, section 4.24)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Notice 2026-11, Interim Guidance on Additional First Year Depreciation Deduction under § 168(k)', url: 'https://www.irs.gov/pub/irs-drop/n-26-11.pdf' },
    { label: 'IRS — Instructions for Form 4562, Depreciation and Amortization', url: 'https://www.irs.gov/instructions/i4562' },
  ],
}

const FAQS = [
  {
    q: 'What is the difference between section 179 and bonus depreciation?',
    a: 'Both let you deduct some or all of an asset\'s cost in the first year instead of spreading it out. Section 179 is an election you make for specific property, with an annual dollar limit and a limit based on your business income. Bonus (special) depreciation applies automatically to qualified property unless you elect out, and it is not subject to the section 179 dollar limit.',
  },
  {
    q: 'Is bonus depreciation 100% for 2025 and 2026?',
    a: 'For qualified property acquired and placed in service after January 19, 2025, the 2025 tax law provides a permanent 100% special depreciation allowance, as described in Publication 946 and Notice 2026-11. Qualified property acquired before January 20, 2025, and placed in service in 2025 is generally limited to 40%.',
  },
  {
    q: 'What is the section 179 limit?',
    a: 'For tax years beginning in 2025, up to $2,500,000, reduced dollar for dollar when the cost of section 179 property placed in service during the year exceeds $4,000,000. For 2026, the limit is $2,560,000 and the reduction starts above $4,090,000.',
  },
  {
    q: 'Can I use section 179 for a computer I also use personally?',
    a: 'Only if you use it more than 50% for business in the year you place it in service. Then you multiply the cost by your business-use percentage. If business use later drops to 50% or less, you may have to include part of the deduction back in income (recapture).',
  },
  {
    q: 'Can section 179 create a business loss?',
    a: 'No. The section 179 deduction is limited to your taxable income from the active conduct of any trade or business during the year. Any amount you cannot deduct because of this limit can be carried forward to the next year.',
  },
  {
    q: 'Does buying an SUV give me a full write-off?',
    a: 'Not necessarily. The section 179 deduction for a sport utility vehicle is capped at $31,300 for tax years beginning in 2025 and $32,000 for 2026, and passenger automobiles have separate annual depreciation caps described in Publication 946.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business',
    title: 'What can I deduct as a small business owner?',
    desc:  'The everyday business expenses that are not depreciated.',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'Where depreciation and section 179 show up (line 13).',
  },
  {
    href: '/library/small-business/home-office-deduction',
    cat:  'Small Business',
    title: 'Home office deduction — do I qualify?',
    desc:  'Depreciation of a home office follows its own rules.',
  },
  {
    href: '/library/rental/repairs-vs-improvements',
    cat:  'Real Estate & Airbnb',
    title: 'Repairs vs. Improvements: Deducting or Capitalizing Property Costs',
    desc:  'Whether a property cost is deducted now or depreciated.',
  },
]

export default function Section179BonusDepreciationPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Section 179 and Bonus Depreciation: 2025 and 2026 Rules | AskLinTax',
      description: 'Deducting business equipment in year one: 2025 and 2026 section 179 limits, 100% bonus depreciation after January 19, 2025, business-use rules, SUVs, and Form 4562.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When you buy equipment, computers, furniture, or other business property that lasts more than a year, you generally <strong>depreciate</strong> it — deduct the cost over several years. Two rules can let you deduct much or all of the cost in the <strong>first year</strong> instead:
        </p>
        <ul>
          <li><strong>Section 179:</strong> an election to expense qualifying property, up to an annual dollar limit and your business income.</li>
          <li><strong>Bonus (special) depreciation:</strong> an additional first-year deduction for qualified property — <strong>100%</strong> for property acquired and placed in service after <strong>January 19, 2025</strong>.</li>
        </ul>

        <h2>The limits: 2025 vs. 2026</h2>
        <ArticleTable
          head={['Rule', 'Tax years beginning in 2025', 'Tax years beginning in 2026']}
          rows={[
            ['Section 179 maximum deduction', '$2,500,000', '$2,560,000'],
            ['Section 179 phase-out begins when property placed in service exceeds', '$4,000,000', '$4,090,000'],
            ['Section 179 cap for sport utility vehicles', '$31,300', '$32,000'],
            ['Bonus depreciation — qualified property acquired and placed in service after January 19, 2025', '100% (you may elect 40% instead for the first tax year ending after January 19, 2025)', '100%'],
            ['Bonus depreciation — qualified property acquired before January 20, 2025, placed in service in 2025', 'Generally 40%', 'Not applicable'],
          ]}
        />
        <p>
          The 2025 amounts are from Publication 946 (2025); the 2026 section 179 amounts are from Revenue Procedure 2025-32. The 2025 tax law (P.L. 119-21, section 70301) made the 100% special depreciation allowance permanent for property acquired after January 19, 2025, as described in Notice 2026-11. Under that notice, property is not treated as acquired after the date a written binding contract for it was entered into.
        </p>

        <h2>Who and what qualifies</h2>
        <ul>
          <li><strong>Section 179 property</strong> must be acquired for use in your trade or business — for example, machinery and equipment, off-the-shelf computer software, and certain qualified real property. Property held only to produce income, such as investment property, does not qualify.</li>
          <li><strong>More than 50% business use:</strong> for property used for both business and personal purposes, you can elect section 179 only if business use is more than 50% in the year you place it in service, and only for the business percentage.</li>
          <li><strong>Business income limit:</strong> the section 179 deduction cannot exceed your taxable income from the active conduct of any trade or business; any excess carries forward.</li>
          <li><strong>Bonus depreciation</strong> applies to qualified property — generally tangible property with a recovery period of 20 years or less, certain computer software, and other listed categories — and can be new or certain used property. Listed property used 50% or less for business does not qualify.</li>
          <li><strong>Electing out:</strong> bonus depreciation applies unless you elect out for a class of property.</li>
        </ul>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>2025 — full write-off of a computer:</strong> Leo, a sole proprietor, buys a $12,000 computer system in March 2025 and uses it only for his business. Because he acquired and placed it in service after January 19, 2025, it can qualify for <strong>100% bonus depreciation</strong>, and he could also choose section 179. Either way, he can generally deduct the full <strong>$12,000</strong> for 2025.
        </p>
        <p>
          <strong>Partly personal use:</strong> Rosa buys a $5,000 camera and uses it 70% for her business. Because business use is more than 50%, the business part of the cost — <strong>$3,500</strong> ($5,000 × 70%) — can be used for section 179.
        </p>
        <p>
          <strong>2026 — phase-out:</strong> A business places $4,200,000 of section 179 property in service in 2026. That is $110,000 over $4,090,000, so its section 179 limit falls from $2,560,000 to <strong>$2,450,000</strong>.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Using the purchase date alone.</strong> The rules depend on when property was acquired (including written binding contracts) and when it was placed in service.</li>
          <li><strong>Claiming section 179 on property used 50% or less for business.</strong></li>
          <li><strong>Deducting the personal-use share.</strong> Only the business percentage counts.</li>
          <li><strong>Expecting section 179 to create a loss.</strong> It is limited to business taxable income; the rest carries forward.</li>
          <li><strong>Forgetting recapture</strong> if business use later drops to 50% or less.</li>
          <li><strong>Assuming every vehicle is fully deductible.</strong> SUVs and passenger automobiles have special caps.</li>
        </ul>

        <h2>IRS forms and filing</h2>
        <ArticleTable
          head={['Form', 'Use']}
          rows={[
            ['Form 4562', 'Elect section 179 (Part I), claim special depreciation, regular depreciation, and listed property'],
            ['Schedule C, line 13', 'Where a sole proprietor deducts depreciation and section 179 from Form 4562'],
            ['Form 4797', 'Report recapture and sales of business property'],
          ]}
        />

        <h2>California considerations</h2>
        <p>
          States do not always follow federal depreciation rules. AskLinTax has not verified California's current treatment of section 179 and bonus depreciation against Franchise Tax Board sources for this guide, so this guide does not state it. Check the California Franchise Tax Board before relying on federal amounts for a California return.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Interim guidance</div>
          <p>Notice 2026-11 is interim guidance; Treasury and the IRS have said proposed regulations will follow. The 2026 Form 4562 instructions were not final when this guide was written. Check them before filing.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

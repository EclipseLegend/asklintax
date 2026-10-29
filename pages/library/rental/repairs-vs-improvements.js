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
  id:            '122',
  title:         'Repairs vs. Improvements: Deducting or Capitalizing Property Costs',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains when rental and business property costs can be deducted and when they must be capitalized and depreciated, based on Publication 527 (2025), Publication 946 (2025), and the IRS Tangible Property Regulations FAQ (reviewed August 2026), which summarizes the final regulations under section 263(a). It does not cover accounting method changes on Form 3115, inventory, or unit-of-property rules for complex buildings in detail',
  persona:       ['Landlords fixing up a rental', 'Airbnb hosts buying furniture and appliances', 'Small business owners repairing equipment or premises', 'Anyone deciding whether to deduct or depreciate'],
  relatedJourney: ['Side income from property', 'Airbnb & rental income'],
  actionRequired: 'For each property cost, ask whether it keeps the property in ordinary working condition (generally deductible) or betters, restores, or adapts it (generally capitalized and depreciated). Then check whether a safe harbor applies — and attach the required election statements to a timely filed return, including extensions.',
  sources: [
    { label: 'IRS — Publication 527 (2025), Residential Rental Property', url: 'https://www.irs.gov/pub/irs-pdf/p527.pdf' },
    { label: 'IRS — Tangible Property Final Regulations (FAQ)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/tangible-property-final-regulations' },
    { label: 'IRS — Publication 946 (2025), How To Depreciate Property', url: 'https://www.irs.gov/pub/irs-pdf/p946.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the difference between a repair and an improvement?',
    a: 'A repair keeps the property in its ordinary, efficient operating condition and is generally deductible. An improvement results in a betterment, restores the property, or adapts it to a new or different use; it must be capitalized and is generally depreciated.',
  },
  {
    q: 'Is everything under $2,500 automatically deductible?',
    a: 'No. The $2,500 amount applies only if you elect the de minimis safe harbor for the year, the amount is per invoice or item, and you treat the cost as an expense in your books and records under your own policy. It does not apply to land or inventory, and it is not a ceiling on otherwise deductible repairs.',
  },
  {
    q: 'I replaced the whole roof on my rental. Can I deduct it?',
    a: 'Generally no. Replacing a substantial structural part, such as an entire roof, is a restoration — a type of improvement. Publication 527 lists a new roof as an improvement, which is depreciated over the same recovery period as the building (27.5 years for residential rental property). The small taxpayer safe harbor may help only if all the work on that building for the year stays within its limit.',
  },
  {
    q: 'How do I elect the de minimis safe harbor?',
    a: 'Attach a statement titled "Section 1.263(a)-1(f) de minimis safe harbor election" to your timely filed original return, including extensions, with your name, address, taxpayer identification number, and a statement that you are making the election. It is made each year and applies to all qualifying amounts that year. Do not file Form 3115 for it.',
  },
  {
    q: 'Does the routine maintenance safe harbor need an election?',
    a: 'No annual election statement is described for it on the IRS FAQ. It applies to recurring work you expect to do to keep property in its ordinarily efficient condition — for buildings, work you reasonably expect to do more than once in the 10 years after the building is placed in service. It does not apply to betterments. The IRS FAQ says that if you were already following these rules, generally no action is needed; Form 3115 comes into play only if you are not in compliance or otherwise want to change your accounting method to use this safe harbor.',
  },
  {
    q: 'What if I capitalize something?',
    a: 'Add the cost to the property\'s basis and depreciate it. Improvements to a rental building are depreciated over the building\'s recovery period; appliances, carpeting, and furniture used in residential rental property are 5-year property. Keep records — you will need the amounts when you sell.',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: 'Renting out a house or apartment — how is rental income taxed?',
    desc:  'Rental expenses and depreciation basics.',
  },
  {
    href: '/library/small-business/section-179-bonus-depreciation',
    cat:  'Small Business & Self-Employment',
    title: 'Section 179 and Bonus Depreciation: 2025 and 2026 Rules',
    desc:  'Faster write-offs for capitalized property.',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Selling a Rental Property: Depreciation Recapture and the 25% Rate',
    desc:  'Why your basis records matter at sale.',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'Other business expense rules.',
  },
]

export default function RepairsVsImprovementsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Repairs vs. Improvements: Deducting or Capitalizing Property Costs | AskLinTax',
      description: 'When rental and business property costs are deductible repairs or capitalized improvements: betterments, restorations, adaptations, the routine maintenance safe harbor, the $2,500 de minimis safe harbor, and the small taxpayer safe harbor — with rental examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>repair</strong> that keeps property in ordinary working condition is generally deductible in the year you pay it. An <strong>improvement</strong> — a <strong>betterment</strong>, <strong>restoration</strong>, or <strong>adaptation</strong> — must be capitalized and is generally depreciated over several years. Three safe harbors can let you deduct some costs that would otherwise be capitalized, but each has its own conditions, and two require an election attached to your return.
        </p>

        <h2>The three kinds of improvements</h2>
        <ArticleTable
          head={['Type', 'What it means', 'Rental examples']}
          rows={[
            ['Betterment', 'Fixes a pre-existing defect or condition, enlarges or expands the property, or increases its capacity, strength, or quality', 'Adding a bedroom or deck; upgrading to a much higher-quality system'],
            ['Restoration', 'Replaces a substantial structural part, repairs damage after a casualty basis adjustment, or rebuilds the property to like-new condition', 'Replacing the entire roof; replacing the whole heating system'],
            ['Adaptation', 'Alters the property to a use not consistent with its intended ordinary use when you began renting it', 'Converting a residential unit into office space'],
          ]}
        />
        <p>
          Publication 527 lists common improvements, including additions, a new roof, storm windows, landscaping, a fence, central air conditioning, a furnace, a water heater, built-in appliances, kitchen modernization, flooring, and wall-to-wall carpeting.
        </p>

        <h2>Three safe harbors</h2>
        <ArticleTable
          head={['', 'Routine maintenance', 'De minimis safe harbor', 'Small taxpayer safe harbor (buildings)']}
          rows={[
            ['What it covers', 'Recurring work to keep property in ordinarily efficient operating condition', 'Small acquisition or production costs per invoice or item', 'Repairs, maintenance, improvements, and similar work on an eligible building'],
            ['Key limits', 'Work resulting from your use of the property in your trade or business that, for buildings, you reasonably expect to do more than once in the 10 years after the building is placed in service; not for betterments', '$2,500 per invoice or item ($5,000 with an applicable financial statement); you must also expense the cost in your books and records; not for land or inventory', 'Average annual gross receipts of $10 million or less; building unadjusted basis of $1 million or less; total yearly spending on that building no more than the lesser of $10,000 or 2% of its unadjusted basis'],
            ['Election?', 'No annual election statement; Form 3115 only if changing your accounting method to use it', 'Yes — an annual statement attached to a timely filed original return, including extensions', 'Yes — an annual statement attached to the return for that year'],
            ['Applies to', 'All qualifying amounts', 'All qualifying amounts that year once elected', 'All the qualifying work on that building for the year'],
          ]}
        />
        <p>
          These safe harbors are annual elections or rules, not changes in accounting method, so Form 3115 is not filed to use the de minimis or small taxpayer safe harbor for a year. If an amount does not fit a safe harbor, you can still deduct it if it is a repair under the general facts-and-circumstances analysis.
        </p>

        <h2>When you must depreciate</h2>
        <ul>
          <li>Capitalized improvements are added to basis and depreciated, generally as if they were separate property.</li>
          <li>Improvements to a residential rental building, such as a new roof, use the building's recovery period — 27.5 years under the general depreciation system.</li>
          <li>Appliances, carpeting, and furniture used in residential rental property are 5-year property.</li>
          <li>Faster methods, such as bonus depreciation or section 179, may be available for some property; see <a href="/library/small-business/section-179-bonus-depreciation/">Section 179 and bonus depreciation</a>.</li>
        </ul>

        <h2>Examples (2025, residential rental)</h2>
        <ArticleTable
          head={['Cost', 'Treatment']}
          rows={[
            ['$350 to fix a leaking faucet and patch drywall', 'Repair — deductible on Schedule E'],
            ['$1,800 refrigerator, de minimis safe harbor elected, and expensed in the owner\'s records', 'Deductible under the de minimis safe harbor; without the election, it is 5-year property'],
            ['$14,000 to replace the entire roof', 'Restoration — capitalized and depreciated over 27.5 years; too large for the small taxpayer safe harbor, which is capped at $10,000 a year per building'],
            ['Building with $300,000 unadjusted basis; $5,500 total spent on it in the year', 'Within the small taxpayer limit ($6,000 = lesser of $10,000 or 2% × $300,000), so all $5,500 can be deducted if the election is made'],
            ['Same building, but $7,000 total spent', 'Over the limit, so the small taxpayer safe harbor is not available for that building for the year; each cost is analyzed under the general rules'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep invoices and elections</div>
          <p>The de minimis safe harbor is measured per invoice or item, and both elections must be attached to the return. Keep invoices, a written expensing policy, and copies of your election statements, and separate repair costs from improvement costs in your records.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

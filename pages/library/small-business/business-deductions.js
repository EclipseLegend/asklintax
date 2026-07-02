import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '14',
  title:         'What can I deduct as a small business owner?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the most common deductions for sole proprietors and single-member LLCs filing Schedule C. S-Corps, partnerships, and C-Corps have additional or different rules. Always verify with a CPA for your specific situation.',
  persona:       ['Freelancer', 'Self-employed', 'LLC owner', 'Small business owner', 'Side hustle earner'],
  relatedJourney: ['Starting a small business', 'First year of self-employment'],
  actionRequired: 'Start tracking all business expenses now — even expenses you\'re unsure about. It\'s easier to decide later whether something qualifies than to reconstruct records you never kept. Use a dedicated business bank account and credit card to make tracking automatic.',
}

const FAQS = [
  {
    q: 'What is the "ordinary and necessary" standard?',
    a: 'Every business deduction must meet the IRS standard of being "ordinary and necessary." Ordinary means the expense is common and accepted in your industry — something other businesses like yours also incur. Necessary means the expense is helpful and appropriate for your business — not that it\'s absolutely required. A graphic designer buying Adobe Creative Cloud is ordinary and necessary. The same designer buying a boat is not, even if they occasionally meet clients on it.',
  },
  {
    q: 'Can I deduct an expense that is partly personal and partly business?',
    a: 'Yes, but only the business portion. You must allocate the expense based on actual use. For example, if you use your phone 60% for business and 40% personal, you can deduct 60% of your phone bill. For vehicles, you track actual business miles and apply the IRS standard mileage rate (or track actual vehicle expenses and multiply by the business use percentage). Keep records that document the allocation.',
  },
  {
    q: 'What records do I need to keep?',
    a: 'For most expenses, keep the receipt (digital is fine) and a note about the business purpose. For meals and entertainment, you also need to record who you were with and what was discussed. For vehicle use, keep a mileage log with dates, destinations, and business purpose of each trip. The IRS can audit up to 3 years back (6 years if substantial underreporting is suspected), so keep records for at least 4 years.',
  },
  {
    q: 'What\'s the difference between a deduction and depreciation?',
    a: 'When you buy something used up in the current year (supplies, software subscriptions, advertising), you deduct the full cost in the year you paid. When you buy something with a useful life longer than one year (a computer, a vehicle, furniture), you generally must spread the deduction over several years — this is depreciation. However, Section 179 and bonus depreciation rules allow you to deduct the full cost of many assets in the year of purchase, up to certain limits. Your tax software or CPA can determine which assets qualify.',
  },
  {
    q: 'Can I deduct startup costs for a business I\'m just starting?',
    a: 'Yes, with limits. The IRS allows you to deduct up to $5,000 of startup costs and $5,000 of organizational costs in the first year of business. Amounts above $5,000 must be amortized (spread) over 180 months. Startup costs include market research, advertising before opening, employee training, and professional fees paid before the business opened. If total startup costs exceed $50,000, the $5,000 first-year deduction begins to phase out.',
  },
  {
    q: 'Is a business meal 100% deductible?',
    a: 'No. Business meals are generally only 50% deductible. The meal must have a clear business purpose — you must be discussing business with a client, employee, or business partner. Personal meals, even if eaten while working, are not deductible. Meals provided to employees at the employer\'s convenience (like food at the office during a work meeting) may be 50% deductible. The documentation requirement for meals is strict: keep the receipt and record who was there and what business was discussed.',
  },
  {
    q: 'Can I deduct the cost of forming my LLC?',
    a: 'Yes, as organizational costs — up to $5,000 in the first year (amounts above are amortized over 180 months). Organizational costs include state filing fees, legal fees for drafting the operating agreement, and accounting fees related to setup. The filing fee itself (e.g., California\'s $70 LLC filing fee) is deductible. The annual $800 California franchise tax is also deductible as a business expense.',
  },
]

const RELATED = [
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Your deductions reduce net profit, which directly reduces your quarterly estimated tax payments.',
  },
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference?',
    desc:  '1099 income opens up Schedule C deductions. Understand the full tax picture for self-employed income.',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: 'What is an LLC and do I need one?',
    desc:  'An LLC doesn\'t change your available deductions, but it does affect how you file and what records you need.',
  },
]

const DEDUCTION_CATEGORIES = [
  {
    id: 'office',
    icon: '🏠',
    title: 'Home Office',
    color: 'var(--blue)',
    summary: 'Deduct a portion of your home costs if you have a dedicated workspace used regularly and exclusively for business.',
    items: [
      { name: 'Simplified method', detail: '$5 per square foot of dedicated office space, up to 300 sq ft = max $1,500/year. Easy to calculate, no depreciation recapture.' },
      { name: 'Regular method', detail: 'Calculate actual percentage of home used for office (office sq ft ÷ total sq ft), then deduct that percentage of rent/mortgage interest, utilities, insurance, and repairs. More work but potentially higher deduction.' },
      { name: 'Key requirement', detail: 'The space must be used REGULARLY and EXCLUSIVELY for business. A desk in your bedroom that you also use personally doesn\'t qualify. A dedicated room you only use for work does.' },
    ],
    warning: 'Home office deductions can trigger audit scrutiny. Keep photos of the space and documentation of its exclusive business use.',
  },
  {
    id: 'vehicle',
    icon: '🚗',
    title: 'Vehicle & Transportation',
    color: '#7C3AED',
    summary: 'Deduct business driving at the IRS standard mileage rate, or track actual vehicle expenses.',
    items: [
      { name: 'Standard mileage rate (2025)', detail: '70 cents per mile for business driving. Multiply your business miles by $0.70. Keep a mileage log with date, destination, and purpose for every business trip.' },
      { name: 'Actual expense method', detail: 'Track all vehicle costs (gas, insurance, registration, repairs, depreciation) and multiply by business use percentage. May give higher deduction for expensive vehicles with high business use.' },
      { name: 'What counts as business driving', detail: 'Client meetings, going to a secondary work location, business errands, picking up supplies. Commuting from home to your regular office does NOT count.' },
    ],
    warning: 'You must choose standard mileage in the first year you use a vehicle for business. After that, you can switch between methods each year (with some restrictions).',
  },
  {
    id: 'equipment',
    icon: '💻',
    title: 'Equipment & Technology',
    color: 'var(--navy)',
    summary: 'Computers, phones, software, and other tools used in your business.',
    items: [
      { name: 'Computers and peripherals', detail: 'Fully deductible if used 100% for business. If mixed personal/business use, deduct the business percentage only.' },
      { name: 'Software subscriptions', detail: 'Fully deductible as a business expense (e.g., Adobe Creative Cloud, QuickBooks, Zoom, Slack, GitHub). Deducted in the year paid.' },
      { name: 'Phone', detail: 'Deduct the business use percentage of your monthly bill. Typical approach: estimate percentage (e.g., 60% business) and apply consistently.' },
      { name: 'Section 179 / bonus depreciation', detail: 'Instead of depreciating equipment over several years, you may be able to deduct the full purchase price in year one. Applies to computers, cameras, office furniture, and many other assets.' },
    ],
  },
  {
    id: 'professional',
    icon: '📋',
    title: 'Professional Services',
    color: 'var(--green)',
    summary: 'Fees paid to professionals who help you run your business.',
    items: [
      { name: 'Accounting and tax preparation', detail: 'CPA fees, bookkeeper fees, and tax software costs are fully deductible.' },
      { name: 'Legal fees', detail: 'Business-related legal fees (contract review, LLC formation, employment matters) are deductible. Personal legal fees are not.' },
      { name: 'Business consulting', detail: 'Fees paid to business coaches, consultants, or advisors for business purposes are deductible.' },
      { name: 'Professional memberships', detail: 'Trade association dues, professional organization memberships, and industry subscriptions are generally deductible.' },
    ],
  },
  {
    id: 'marketing',
    icon: '📣',
    title: 'Marketing & Advertising',
    color: 'var(--gold)',
    summary: 'All legitimate costs of promoting your business are fully deductible.',
    items: [
      { name: 'Digital advertising', detail: 'Google Ads, Facebook/Instagram ads, LinkedIn ads — 100% deductible.' },
      { name: 'Website costs', detail: 'Domain registration, web hosting, website design, and maintenance are fully deductible.' },
      { name: 'Business cards and print materials', detail: 'Business cards, brochures, flyers — fully deductible.' },
      { name: 'Business gifts', detail: 'Up to $25 per recipient per year. Gifts above $25 per person are not deductible. Keep records of who received the gift and its business purpose.' },
    ],
  },
  {
    id: 'meals',
    icon: '🍽',
    title: 'Meals & Entertainment',
    color: '#DC2626',
    summary: 'Business meals are 50% deductible. Entertainment expenses are generally not deductible.',
    items: [
      { name: 'Business meals (50% deductible)', detail: 'Meals with clients, customers, or employees where business is discussed. Must have a clear business purpose. Keep receipt, note who was there, and what was discussed.' },
      { name: 'Office snacks and meals (50% deductible)', detail: 'Food provided to employees at the office for the employer\'s convenience (e.g., lunch during a working meeting).' },
      { name: 'Entertainment (generally NOT deductible)', detail: 'Concert tickets, sporting events, golf — entertainment costs are no longer deductible under current law (post-2017 Tax Cuts and Jobs Act), even if business is discussed.' },
      { name: 'Travel meals', detail: 'Meals while traveling overnight for business are 50% deductible.' },
    ],
    warning: '50% limit applies to most meal deductions. Entertainment is no longer deductible — a common mistake is treating a client dinner + game tickets as one deductible expense.',
  },
  {
    id: 'insurance',
    icon: '🛡',
    title: 'Insurance & Benefits',
    color: '#0891B2',
    summary: 'Business insurance and self-employed health insurance have favorable deduction rules.',
    items: [
      { name: 'Business insurance', detail: 'General liability, professional liability (E&O), commercial property — fully deductible as business expenses.' },
      { name: 'Self-employed health insurance', detail: 'If you\'re self-employed and not eligible for employer-sponsored coverage, you can deduct 100% of health insurance premiums (for yourself, spouse, and dependents) as an above-the-line deduction. This reduces AGI, not just taxable income.' },
      { name: 'Self-employed retirement contributions', detail: 'Contributions to a SEP-IRA, SIMPLE IRA, or Solo 401(k) are deductible, up to annual limits. SEP-IRA allows contributions up to 25% of net self-employment income.' },
    ],
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Education & Training',
    color: '#B45309',
    summary: 'Education that maintains or improves skills required in your current business is deductible.',
    items: [
      { name: 'Courses and training', detail: 'Online courses, workshops, and certifications that improve skills in your current business are deductible. Education to qualify for a new career is not.' },
      { name: 'Books and subscriptions', detail: 'Business books, industry publications, newsletters, and research subscriptions are deductible.' },
      { name: 'Conferences and seminars', detail: 'Registration fees, travel, and lodging for business conferences are deductible. The travel must be primarily for business (you can add personal days, but those personal portions aren\'t deductible).' },
    ],
  },
]

export default function BusinessDeductionsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq,  setOpenFaq]  = useState({})
  const [openCat,  setOpenCat]  = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }
  function toggleCat(id) { setOpenCat(p => ({ ...p, [id]: !p[id] })) }

  return (
    <Layout t={t} meta={{
      title: 'What Can I Deduct as a Small Business Owner? | AskLinTax',
      description: 'A complete guide to small business deductions on Schedule C — home office, vehicle, equipment, meals, insurance, and more. With the ordinary and necessary standard explained in plain language.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The golden rule of business deductions</h2>
        <p>
          Every business expense you deduct must pass one test: was it <strong>ordinary and necessary</strong> for your business?
        </p>
        <ul>
          <li><strong>Ordinary</strong> — common and accepted in your industry. A photographer buying a camera is ordinary. A photographer buying a yacht is not.</li>
          <li><strong>Necessary</strong> — helpful and appropriate for your business. Not required or essential — just relevant and reasonable.</li>
        </ul>
        <p>
          If you can answer "yes" to both, it's likely deductible. When in doubt, keep the receipt and let your CPA decide.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ Start tracking now — decide eligibility later</div>
          <p>The biggest deduction mistake isn't claiming something you shouldn't — it's <em>missing</em> things you could claim because you didn't keep records. Track every business expense. Keep every receipt. You can always decide later whether something qualifies. You can't reconstruct records you never kept.</p>
        </div>

        <h2>Why deductions matter more than you think</h2>
        <p>
          For self-employed people and LLC owners, deductions reduce your <strong>net profit on Schedule C</strong>. That net profit is subject to both income tax and self-employment tax (15.3%). So every $1,000 you deduct saves you approximately:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '24px 0' }}>
          {[
            { bracket: '12% income tax bracket', saving: '~$275', note: '$1,000 × (12% + 15.3% × 92.35%)' },
            { bracket: '22% income tax bracket', saving: '~$363', note: '$1,000 × (22% + 15.3% × 92.35%)' },
            { bracket: '24% income tax bracket', saving: '~$382', note: '$1,000 × (24% + 15.3% × 92.35%)' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--green)', marginBottom: '6px' }}>{item.saving}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{item.bracket}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <p>
          Because deductions reduce both income tax and self-employment tax simultaneously, their value is higher for self-employed people than for W-2 employees who can only take the standard deduction.
        </p>

        <h2>The major deduction categories</h2>
        <p>
          Click any category to expand the details:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '24px 0' }}>
          {DEDUCTION_CATEGORIES.map((cat) => {
            const isOpen = !!openCat[cat.id]
            return (
              <div key={cat.id} style={{ border: `1.5px solid ${isOpen ? cat.color : 'var(--border)'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border-color .2s' }}>
                {/* Header */}
                <button
                  onClick={() => toggleCat(cat.id)}
                  style={{ width: '100%', background: isOpen ? cat.color + '10' : 'var(--white)', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', transition: 'background .18s' }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '17px', fontWeight: '600', color: isOpen ? cat.color : 'var(--navy)' }}>{cat.title}</div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '2px', lineHeight: '1.5' }}>{cat.summary}</div>
                  </div>
                  <span style={{ fontSize: '22px', color: isOpen ? cat.color : 'var(--light)', flexShrink: 0, fontWeight: '300', lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${cat.color}20` }}>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{ padding: '14px 20px', borderBottom: ii < cat.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{item.name}</div>
                        <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.68' }}>{item.detail}</div>
                      </div>
                    ))}
                    {cat.warning && (
                      <div style={{ padding: '12px 20px', background: 'var(--red-soft)', borderTop: '1px solid rgba(220,38,38,.15)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, fontSize: '16px' }}>⚠️</span>
                        <div style={{ fontSize: '13.5px', color: '#7f1d1d', lineHeight: '1.65' }}>{cat.warning}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <h2>What you cannot deduct</h2>
        <p>
          Just as important as knowing what you can deduct is knowing what you can't:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--red)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Not deductible</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Personal expenses of any kind', 'Must be ordinary and necessary for the business — personal use doesn\'t qualify'],
                ['Commuting from home to your regular office', 'Commuting is personal travel, not business travel'],
                ['Fines and penalties', 'IRS penalties, parking tickets, and legal fines are not deductible'],
                ['Clothing (unless a required uniform)', 'Clothing you can wear outside of work is personal, even if you bought it for business meetings'],
                ['Meals while working alone', 'Solo meals while working — unless traveling away from home overnight for business'],
                ['Entertainment expenses', 'Post-2017, entertainment (concerts, sporting events, golf) is no longer deductible'],
                ['Personal portion of mixed-use expenses', 'Only the business percentage of a partly-personal expense is deductible'],
                ['Capital improvements (in most cases)', 'Must be depreciated over time, not deducted all at once — though Section 179 may allow full first-year deduction'],
              ].map(([what, why], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--red-soft)' : 'white' }}>{what}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--red-soft)' : 'white' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>The record-keeping minimum</h2>
        <p>
          You don't need an elaborate system. The minimum required for each expense:
        </p>
        <ul>
          <li><strong>Receipt</strong> — amount, date, vendor. A photo on your phone is acceptable.</li>
          <li><strong>Business purpose</strong> — a brief note explaining why this was a business expense. For meals: who was there and what was discussed.</li>
          <li><strong>Vehicle mileage</strong> — a log with date, starting point, destination, and business purpose for every business trip.</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The simplest record-keeping system</div>
          <p>
            Use a dedicated business bank account and business credit card for all business expenses. This automatically creates a transaction record for every purchase. At year end, export your statements and categorize transactions — it takes a fraction of the time compared to sorting through personal accounts. Add a brief note to your phone's notes app after any meal or unusual expense while it's fresh in your memory.
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

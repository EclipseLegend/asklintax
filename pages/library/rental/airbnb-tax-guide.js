import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '11',
  title:         'Airbnb host tax guide: what to report and what to deduct',
  category:      'Airbnb & Rental Income',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers standard short-term rental rules for U.S. tax residents. Mixed-use properties, vacation homes, and properties in certain states may have additional rules. Consult a CPA for your specific situation.',
  persona:       ['Airbnb host', 'VRBO host', 'Short-term rental owner', 'Anyone renting a room or property'],
  relatedJourney: ['Airbnb & rental income', 'Side income from property'],
  actionRequired: 'Determine how many days you rented your property in the tax year and how many days you personally used it. These two numbers determine which tax rules apply to you — including whether the 14-day rule exempts your income entirely.',
}

const FAQS = [
  {
    q: 'Does Airbnb report my income to the IRS?',
    a: 'Yes. Airbnb is required to send you a Form 1099-K if you received more than $600 in gross payments during the year. Airbnb also reports this information directly to the IRS. Even if you don\'t receive a 1099-K (because you earned less than $600, or if Airbnb doesn\'t send one for other reasons), you are still required to report the income on your tax return.',
  },
  {
    q: 'What is the 14-day rule and how does it work?',
    a: 'If you rent your property for fewer than 15 days in the year (14 days or less), you don\'t need to report that rental income at all — it\'s completely tax-free. However, you also can\'t deduct any rental expenses. This rule only applies to your primary residence or a property you also personally use. It does not apply to pure investment properties that you never personally occupy.',
  },
  {
    q: 'I rent out just one room in my house. Do the same rules apply?',
    a: 'Yes, but you need to allocate income and expenses between the rented room and the rest of your home. The general method is to allocate based on the percentage of square footage rented. For example, if the rented room is 20% of your home\'s square footage, you can deduct 20% of shared expenses (utilities, internet, insurance) as rental expenses, plus 100% of direct expenses for the room itself.',
  },
  {
    q: 'Can I deduct Airbnb\'s service fees?',
    a: 'Yes. The host service fee that Airbnb charges (typically 3% of the booking subtotal) is a deductible business expense. When you report income, report the gross rental income before fees, then deduct the fees separately on Schedule E (or Schedule C if it\'s your primary business). Your 1099-K from Airbnb will show gross payments — before the Airbnb service fee is deducted.',
  },
  {
    q: 'Do I need to charge guests sales tax or occupancy tax?',
    a: 'In many jurisdictions, Airbnb now collects and remits local occupancy taxes on your behalf. However, in some locations you may still be responsible for registering with local authorities and collecting taxes yourself. This varies significantly by city and state — check your local regulations and Airbnb\'s tax collection page for your specific area. Failure to collect required taxes can result in penalties.',
  },
  {
    q: 'What records should I keep as an Airbnb host?',
    a: 'Keep records of: all rental income (your Airbnb dashboard and 1099-K), all receipts for expenses you plan to deduct, dates the property was rented vs. personally used (critical for mixed-use calculations), photos of the property taken at the start of the rental period (useful if you need to prove property condition), and any capital improvements you make (these affect depreciation calculations).',
  },
  {
    q: 'Do I need to collect a business license to rent on Airbnb?',
    a: 'Many cities now require short-term rental permits or licenses, and some have banned or restricted short-term rentals entirely. This is a local/municipal regulation issue, not a federal tax issue — but operating without required permits can expose you to fines. Check your city\'s website for short-term rental regulations before listing, and renew permits as required each year.',
  },
]

const RELATED = [
  {
    href:  '/library/rental/14-day-rule',
    cat:   'Airbnb & Rental',
    title: 'The 14-day rule explained',
    desc:  'If you rent your property for 14 days or fewer, the income may be completely tax-free. Here\'s exactly how the rule works.',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Understanding deductions helps you maximize what you can write off as an Airbnb host.',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: 'What is an LLC and do I need one?',
    desc:  'Some Airbnb hosts choose to hold their rental in an LLC for liability protection. Here\'s how to decide.',
  },
]

const DEDUCTIONS = [
  {
    category: 'Direct Rental Expenses',
    subtitle: '100% deductible — only apply to the rental',
    color: 'var(--green)',
    items: [
      { name: 'Cleaning and housekeeping', note: 'Professional cleaning between guests' },
      { name: 'Airbnb host service fees', note: 'Typically 3% of booking subtotal' },
      { name: 'Guest supplies', note: 'Toiletries, coffee, welcome items' },
      { name: 'Photography for listing', note: 'Professional photos of the rental' },
      { name: 'Linens and towels', note: 'If used exclusively for guests' },
      { name: 'Locks, keys, and smart entry devices', note: 'Rental-specific only' },
      { name: 'Advertising and listing fees', note: 'Other than Airbnb (e.g., VRBO)' },
    ],
  },
  {
    category: 'Allocated Shared Expenses',
    subtitle: 'Partially deductible — allocated by rental use percentage',
    color: 'var(--blue)',
    items: [
      { name: 'Mortgage interest', note: 'Rental % of total interest paid (Schedule A for personal portion)' },
      { name: 'Property taxes', note: 'Rental % only (personal portion goes on Schedule A)' },
      { name: 'Homeowner\'s insurance', note: 'Rental % — may need separate short-term rental rider' },
      { name: 'Utilities (electric, gas, water)', note: 'Rental % based on time or space' },
      { name: 'Internet and cable', note: 'Rental % — or 100% if primarily for guests' },
      { name: 'HOA fees', note: 'Rental % — check if HOA permits short-term rentals first' },
    ],
  },
  {
    category: 'Capital Expenses (Depreciation)',
    subtitle: 'Deducted over multiple years, not all at once',
    color: '#7C3AED',
    items: [
      { name: 'The property itself', note: 'Residential rental property depreciated over 27.5 years' },
      { name: 'Major appliances', note: 'Refrigerator, washer/dryer — typically 5–7 year depreciation' },
      { name: 'Furniture', note: 'Beds, sofas, tables — typically 5–7 year depreciation' },
      { name: 'Renovations and improvements', note: 'Bathroom remodel, new roof — varies by type' },
    ],
  },
  {
    category: 'Operating Expenses',
    subtitle: 'Deductible in the year paid',
    color: 'var(--gold)',
    items: [
      { name: 'Property management fees', note: 'If you use a local manager' },
      { name: 'Accounting and tax preparation', note: 'CPA fees related to the rental' },
      { name: 'Legal fees', note: 'Rental-related legal costs' },
      { name: 'Repairs and maintenance', note: 'Fixing what\'s broken — not improvements' },
      { name: 'Pest control', note: 'Regular or reactive treatments' },
      { name: 'Landscaping and snow removal', note: 'If rental use is involved' },
    ],
  },
]

export default function AirbnbTaxGuidePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Airbnb Host Tax Guide: What to Report and What to Deduct | AskLinTax',
      description: 'A complete tax guide for Airbnb hosts — what income to report, which expenses to deduct, how the 14-day rule works, and whether to use Schedule E or Schedule C.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The first question: does the 14-day rule apply to you?</h2>
        <p>
          Before anything else, check one number: how many days did you rent your property this year?
        </p>
        <p>
          If the answer is <strong>14 days or fewer</strong>, you may qualify for the 14-day rule — which means your rental income is completely tax-free and doesn't need to be reported. See our <a href="/library/rental/14-day-rule">14-day rule guide</a> for the full details.
        </p>
        <p>
          If you rented for <strong>15 days or more</strong>, the rules in this guide apply to you.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ The two numbers you need to know</div>
          <p><strong>Rental days:</strong> How many days the property (or room) was rented to paying guests.</p>
          <p style={{ marginBottom: 0 }}><strong>Personal use days:</strong> How many days you (or family members at no charge) used the property. These two numbers determine which rules apply and how you allocate expenses.</p>
        </div>

        <h2>Which tax form do you use? Schedule E vs Schedule C</h2>
        <p>
          Most Airbnb hosts report rental income on <strong>Schedule E</strong>. However, some hosts use <strong>Schedule C</strong>. The difference matters because Schedule C income is subject to self-employment tax (15.3%) while Schedule E income is not.
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Your situation</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Form to use</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Self-employment tax?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Renting a room or property with standard host services (cleaning between guests, keys, check-in)', 'Schedule E — Supplemental Income', '❌ No'],
                ['Providing substantial hotel-like services (daily cleaning, meals, concierge, linen service)', 'Schedule C — Business Income', '✅ Yes (15.3%)'],
                ['Short-term rental is your primary business and main source of income', 'Schedule C — Business Income', '✅ Yes (15.3%)'],
              ].map(([situation, form, se], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{form}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{se}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Most Airbnb hosts use Schedule E</div>
          <p>The IRS distinguishes between "rental activity" (Schedule E) and "hotel-like services" (Schedule C). Standard Airbnb hosting — providing a clean space, keys, and basic amenities — is rental activity. Unless you're offering daily maid service, meals, or other hotel-style services, Schedule E is almost certainly the right form for you.</p>
        </div>

        <h2>What counts as rental income?</h2>
        <p>
          Report the <strong>gross amount</strong> you received from guests — before Airbnb deducts its host service fee. Your 1099-K from Airbnb shows gross payments. You then deduct the fees as a business expense.
        </p>
        <p>
          Rental income includes:
        </p>
        <ul>
          <li>Nightly rental payments from guests</li>
          <li>Cleaning fees charged to guests (even if you pay a cleaner — that's a deductible expense)</li>
          <li>Pet fees, extra guest fees, or any other charges to guests</li>
          <li>Security deposits you keep (if the deposit becomes income when applied to damage or not returned)</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The 1099-K shows gross — before Airbnb's fee</div>
          <p>Your 1099-K from Airbnb shows the total amount guests paid — including Airbnb's portion of the cleaning fee and before Airbnb deducts its host service fee. Don't assume the 1099-K matches what you actually received in your bank. Report the gross amount shown on the 1099-K, then deduct Airbnb's host service fee separately as an expense.</p>
        </div>

        <h2>What can you deduct?</h2>
        <p>
          Airbnb hosts can deduct a wide range of expenses. The key rule: expenses must be <em>ordinary and necessary</em> for your rental activity, and they must be <em>allocated between rental use and personal use</em> if you also use the property yourself.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
          {DEDUCTIONS.map((section, si) => (
            <div key={si} style={{ border: `1.5px solid ${section.color}30`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: section.color + '10', padding: '14px 20px', borderBottom: `1px solid ${section.color}20` }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: section.color }}>{section.category}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{section.subtitle}</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 20px', borderBottom: ii < section.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                    <span style={{ color: section.color, fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>·</span>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--navy)' }}>{item.name}</span>
                      <span style={{ fontSize: '13.5px', color: 'var(--muted)', marginLeft: '10px' }}>{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>How to allocate expenses for mixed-use properties</h2>
        <p>
          If you rent out your primary residence or a property you also personally use, you must allocate expenses between rental and personal use. The IRS provides two accepted allocation methods:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Method 1: Time-based allocation</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>
              Divide rental days by total days used (rental days + personal use days).
            </p>
            <div style={{ background: 'var(--white)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', color: 'var(--navy)', fontFamily: 'monospace' }}>
              Rental days: 60<br />
              Personal days: 30<br />
              Total days: 90<br />
              <strong>Rental %: 60/90 = 67%</strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', marginBottom: 0 }}>IRS preferred method for vacation homes</p>
          </div>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Method 2: Days in year</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>
              Divide rental days by total days in the year (365). Generally results in a lower rental percentage.
            </p>
            <div style={{ background: 'var(--white)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', color: 'var(--navy)', fontFamily: 'monospace' }}>
              Rental days: 60<br />
              Total days in year: 365<br />
              <br />
              <strong>Rental %: 60/365 = 16%</strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', marginBottom: 0 }}>Tax Court accepted method — lower allocation but consistent</p>
          </div>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Depreciation: the deduction most Airbnb hosts miss</div>
          <p>
            Depreciation allows you to deduct the cost of your property over time — even though you didn't actually spend that money in the current year. For residential rental property, you can depreciate the building value (not the land) over 27.5 years. On a $400,000 property where the building is worth $350,000, that's about $12,727 in annual depreciation — a significant deduction that many self-managing hosts forget to claim.
          </p>
          <p style={{ marginBottom: 0 }}>
            Important: when you eventually sell the property, the IRS will "recapture" this depreciation and tax it. This is called depreciation recapture. Keep track of what you've depreciated each year.
          </p>
        </div>

        <h2>The most common Airbnb tax mistakes</h2>
        <ul>
          <li><strong>Not tracking personal use days</strong> — If you (or family members) use the property and you don't keep records, you could either over-deduct (an audit risk) or under-deduct (leaving money on the table). Keep a calendar log.</li>
          <li><strong>Reporting net instead of gross income</strong> — Your 1099-K shows gross rental payments. Report the gross amount, then deduct Airbnb's fee separately. Don't just report what hit your bank account.</li>
          <li><strong>Missing depreciation</strong> — Many hosts skip this because it's complex to calculate. A CPA can set up your depreciation schedule correctly in the first year, and then it runs automatically afterward.</li>
          <li><strong>Not separating rental and personal expenses</strong> — Deducting 100% of expenses that should only be partially allocated is a red flag in an audit.</li>
          <li><strong>Forgetting local permits and taxes</strong> — Operating an unpermitted short-term rental can result in fines that aren't deductible and may attract scrutiny of your tax reporting as well.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

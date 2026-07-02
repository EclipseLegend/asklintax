import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '12',
  title:         'The 14-day rule: when Airbnb income is completely tax-free',
  category:      'Airbnb & Rental Income',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'The 14-day rule is clearly defined in IRC Section 280A. The main complexity is correctly counting personal use days — the definition is broader than most people assume.',
  persona:       ['Occasional Airbnb host', 'Homeowner considering short-term rentals', 'Anyone who rents their home for a few weeks a year'],
  relatedJourney: ['Airbnb & rental income', 'Side income from property'],
  actionRequired: 'Count your rental days for the year. If 14 or fewer, verify that you also meet the personal use requirement — and confirm you understand what counts as a "personal use day" before deciding not to report the income.',
}

const FAQS = [
  {
    q: 'Does the 14-day rule apply to a room in my house, or only the whole property?',
    a: 'The 14-day rule applies to your entire home (or dwelling unit), not individual rooms. If you rent out just one room in your house, the days you rented that room count toward the 14-day threshold for your entire home. However, if you rent out a completely separate structure on your property (like a detached guesthouse), that structure is treated as a separate dwelling unit with its own 14-day calculation.',
  },
  {
    q: 'What exactly counts as a "personal use day"?',
    a: 'A personal use day is any day the property is used by: you or your co-owner, your family members (even if they pay fair market rent), anyone who uses it below fair market rent, or anyone under a reciprocal arrangement where you can use their property. Importantly, days you spend at the property doing repairs or maintenance do NOT count as personal use days — even if you sleep there. Days the property sits vacant also don\'t count.',
  },
  {
    q: 'I rented for only 10 days. Do I have to tell the IRS anything at all?',
    a: 'Under the 14-day rule, you are not required to report the rental income. However, if you received a 1099-K from Airbnb (required when gross payments exceed $600), the IRS also received that same form. You should document your decision not to report by keeping records of your rental days, personal use days, and your 1099-K. If the IRS ever asks, you can demonstrate you qualified for the exclusion.',
  },
  {
    q: 'Can I still deduct mortgage interest and property taxes if I use the 14-day rule?',
    a: 'Yes — but only as personal itemized deductions on Schedule A, not as rental expenses. Mortgage interest and property taxes are deductible regardless of whether you rent the property. What you lose under the 14-day rule is the ability to deduct rental-specific expenses like cleaning fees, supplies, or depreciation. The tradeoff: tax-free income in exchange for no rental expense deductions.',
  },
  {
    q: 'What if I go over 14 days? Is it all or nothing?',
    a: 'Yes, it\'s binary. The moment you hit day 15 of rental, the 14-day rule no longer applies for the entire year — you must report all rental income (not just the income from day 15 onward). However, you then also gain the ability to deduct rental expenses proportionally. For most hosts renting 15–30 days, the deductions often significantly offset the income, making the net taxable amount relatively small.',
  },
  {
    q: 'My spouse and I own the property together. Does each of us get 14 days?',
    a: 'No. The 14-day rule applies to the dwelling unit, not to each owner. You count all rental days together across all owners. If you and your spouse rented the property for 8 days each (16 days total), you have exceeded the 14-day threshold even though each of you only arranged 8 days of rentals.',
  },
  {
    q: 'Does the 14-day rule apply to a vacation home or investment property I don\'t live in?',
    a: 'No. The 14-day rule only applies to property that you also personally use for more than the greater of 14 days or 10% of the days it was rented at fair market rates. A pure investment property that you never personally occupy is not eligible for the 14-day tax-free exclusion — all rental income must be reported regardless of how many days it was rented.',
  },
]

const RELATED = [
  {
    href:  '/library/rental/airbnb-tax-guide',
    cat:   'Airbnb & Rental',
    title: 'Airbnb host tax guide: what to report and what to deduct',
    desc:  'If you exceed 14 rental days, this complete guide covers everything you need to report and deduct.',
  },
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Tax-free rental income under the 14-day rule doesn\'t count toward your filing threshold — understand how all your income fits together.',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Understanding how deductions work helps you evaluate the tradeoff when deciding how many days to rent.',
  },
]

export default function FourteenDayRulePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  const SCENARIOS = [
    { days: 0,    type: 'none',    label: 'No rentals',         rule: '14-day rule N/A', income: 'No income',       deduct: 'Mortgage interest & taxes on Schedule A', color: 'var(--muted)' },
    { days: 10,   type: 'safe',    label: '10 rental days',     rule: '✅ 14-day rule applies', income: 'Tax-free — not reported', deduct: 'Mortgage interest & taxes on Schedule A only', color: 'var(--green)' },
    { days: 14,   type: 'safe',    label: '14 rental days',     rule: '✅ 14-day rule applies', income: 'Tax-free — not reported', deduct: 'Mortgage interest & taxes on Schedule A only', color: 'var(--green)' },
    { days: 15,   type: 'crossed', label: '15 rental days ⚠️',  rule: '❌ Must report all income', income: 'All rental income taxable', deduct: 'Rental expenses deductible proportionally (Schedule E)', color: '#F59E0B' },
    { days: 60,   type: 'crossed', label: '60 rental days',     rule: '❌ Must report all income', income: 'All rental income taxable', deduct: 'Rental expenses deductible proportionally (Schedule E)', color: 'var(--navy)' },
  ]

  return (
    <Layout t={t} meta={{
      title: 'The 14-Day Rule: When Airbnb Income Is Tax-Free | AskLinTax',
      description: 'If you rent your home for 14 days or fewer in a year, the income is completely tax-free and doesn\'t need to be reported. Here\'s exactly how the rule works, what counts as a rental day, and the tradeoffs.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The rule in plain language</h2>
        <p>
          Under U.S. tax law (IRC Section 280A), if you rent your home — or a vacation property you also personally use — for <strong>14 days or fewer</strong> in a calendar year, the rental income is completely excluded from your taxable income. You don't report it. You don't pay tax on it.
        </p>
        <p>
          This is sometimes called the "Master's exception" or "Augusta rule" because it was famously used by homeowners in Augusta, Georgia who rented their homes during the Masters golf tournament each spring.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The tradeoff</div>
          <p>Tax-free income comes with a cost: you cannot deduct any rental expenses under the 14-day rule. No cleaning fees, no supplies, no depreciation, no allocation of utilities. The tradeoff is: tax-free income in exchange for no rental deductions. For most short-term landlords, this is still an excellent deal.</p>
        </div>

        <h2>The two conditions that must both be true</h2>
        <p>
          The 14-day rule has two requirements. Both must be met:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--green-soft)', border: '2px solid var(--green)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Condition 1</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px', lineHeight: '1.35' }}>You rented for 14 days or fewer</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>
              The total number of days you rented the property to paying guests at fair market rent must be 14 or fewer during the calendar year. Day 15 breaks the rule — for the entire year.
            </p>
          </div>
          <div style={{ background: 'var(--green-soft)', border: '2px solid var(--green)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Condition 2</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px', lineHeight: '1.35' }}>You also personally use the property</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>
              You must use the property for personal use for more than 14 days OR more than 10% of the days it was rented at fair market rent — whichever is greater. Pure investment properties you never personally use don't qualify.
            </p>
          </div>
        </div>

        <h2>What counts as a rental day?</h2>
        <p>
          A rental day is any day a paying guest occupies the property at fair market rent. Partial days count as full days. Days the property is listed but unoccupied do not count.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Below-market rentals don't count as rental days</div>
          <p>If you rent to a family member or friend at below fair market rent, those days count as <em>personal use days</em>, not rental days. This matters both for the 14-day threshold and for expense allocation. Renting to family at a discount to help them out while thinking it keeps the day count low is a common misunderstanding.</p>
        </div>

        <h2>What counts as a personal use day?</h2>
        <p>
          This is where many people make mistakes. Personal use days include more than just the days you personally sleep there:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Counts as personal use day?</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Situation</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['✅ Yes', 'You use the property for any personal purpose', 'Direct personal use'],
                ['✅ Yes', 'Your spouse, children, parents, or siblings use it (even if they pay full rent)', 'Family member use'],
                ['✅ Yes', 'Any person uses it at below fair market rent', 'Below-market use'],
                ['✅ Yes', 'You use it under a reciprocal arrangement (e.g., swap with another homeowner)', 'Reciprocal exchange'],
                ['❌ No', 'Days you spend there doing repairs or maintenance', 'Maintenance days excluded even if you sleep there'],
                ['❌ No', 'Days the property sits vacant (no guest, no personal use)', 'Neither rental nor personal'],
                ['❌ No', 'Days a family member rents at full fair market rent (arm\'s length)', 'Treated as a paying tenant'],
              ].map(([counts, situation, why], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: counts.startsWith('✅') ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{counts}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How the rule plays out in different scenarios</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '24px 0' }}>
          {SCENARIOS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ minWidth: '140px', padding: '14px 16px', background: s.color + (s.type === 'safe' ? '15' : s.type === 'crossed' ? '10' : '05'), borderRight: '1px solid var(--border-l)' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: s.color }}>{s.label}</div>
                <div style={{ fontSize: '12px', color: s.color, marginTop: '3px', opacity: 0.8 }}>{s.rule}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-l)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>Income</div>
                  <div style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>{s.income}</div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>Deductions</div>
                  <div style={{ fontSize: '14px', color: 'var(--mid)' }}>{s.deduct}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>The strategic decision: stay under 14 or go over?</h2>
        <p>
          For homeowners who have flexibility in how many days they rent, the 14-day threshold is a planning opportunity. Here's how to think about it:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Strategy</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Best when</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Watch out for</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Stay at ≤14 days', 'You can earn significant income in just a few high-demand nights (e.g., during a major event)', 'You sacrifice all rental expense deductions — verify that the tax-free income is worth more than the deductions you\'d get'],
                ['Go over 14 days', 'You have significant rental-related expenses (renovation, cleaning, depreciation) that would generate useful deductions', 'You must report all income from day one, not just income from day 15 onward'],
                ['Stay just under', 'You\'re in a tourist area with very high nightly rates — a few nights can generate substantial tax-free income', 'Track days carefully — a single extra booking can eliminate the entire exemption'],
              ].map(([strategy, best, watch], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{strategy}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{best}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ If you received a 1099-K and are using the 14-day rule</div>
          <p>
            Airbnb is required to send you (and the IRS) a 1099-K if you received more than $600 in gross payments. If you qualify for the 14-day exclusion and don't report the income, the IRS may send a notice asking about the discrepancy. Keep documentation: a calendar log of rental days vs. personal use days, and your 1099-K. This is sufficient to demonstrate you qualified for the exclusion if ever asked.
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '13',
  title:         'Quarterly estimated taxes: who pays and how to calculate',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers federal estimated tax rules. State estimated tax requirements vary — most states follow a similar system but with different thresholds and deadlines. Check your state\'s requirements separately.',
  persona:       ['Freelancer', 'Self-employed', 'LLC owner', 'Contractor with 1099 income', 'Small business owner'],
  relatedJourney: ['Starting a small business', 'First year of self-employment'],
  actionRequired: 'Determine if you expect to owe more than $1,000 in federal taxes this year from non-withheld income. If yes, mark the four quarterly payment deadlines in your calendar and calculate your first payment using the safe harbor method.',
}

const FAQS = [
  {
    q: 'What happens if I miss a quarterly payment?',
    a: 'You\'ll owe an underpayment penalty — even if you pay everything in full by April 15. The penalty is calculated quarterly using the federal short-term interest rate plus 3%, applied to the amount you underpaid for each quarter. It\'s typically a small percentage, but it adds up. The penalty is calculated on Form 2210 and is usually added automatically to your tax bill.',
  },
  {
    q: 'Can I just pay everything in April instead of making quarterly payments?',
    a: 'You can pay everything at once in April, but if you owed more than $1,000 for the year and didn\'t make quarterly payments, you\'ll owe an underpayment penalty for each quarter you missed. The IRS charges this penalty regardless of whether you pay in full by the deadline. The only exception: if your prior year tax liability was zero, or if you qualify for one of the underpayment penalty exceptions.',
  },
  {
    q: 'I have a W-2 job and also some freelance income. Do I need to make quarterly payments?',
    a: 'It depends on the amount. If your freelance income is small enough that increasing your W-2 withholding can cover the additional tax, you may not need separate quarterly payments. Talk to your employer\'s HR about increasing your W-4 withholding. If the freelance income is significant, you may need both increased withholding AND quarterly payments. The test: will you owe more than $1,000 in additional taxes from the freelance income after W-2 withholding?',
  },
  {
    q: 'What is the "safe harbor" method and why do people use it?',
    a: 'The safe harbor method lets you avoid the underpayment penalty by paying 100% of last year\'s tax liability (or 110% if your prior year AGI exceeded $150,000) in quarterly installments — regardless of what you actually owe this year. This is popular because it requires no calculation of current-year income. If your income is variable or hard to predict, the safe harbor gives you certainty that you won\'t be penalized, even if your actual liability ends up being higher.',
  },
  {
    q: 'When is each quarterly payment due?',
    a: 'Q1 (January–March income): due April 15. Q2 (April–May income): due June 16. Q3 (June–August income): due September 15. Q4 (September–December income): due January 15 of the following year. Note: Q2 is only about 2 months, and Q3 is only 3 months — the periods are uneven. If a deadline falls on a weekend or holiday, it shifts to the next business day.',
  },
  {
    q: 'I had a loss in Q1. Do I still need to pay estimated taxes?',
    a: 'No. Estimated tax payments are based on your expected annual net income. If you had a loss in Q1 that reduces your expected annual income below the threshold, you may not need to pay. However, if income picks up later in the year, you\'ll need to recalculate. The annualized income installment method (Form 2210, Schedule AI) allows you to match payments to when you actually earned the income, which can reduce penalties if your income is uneven throughout the year.',
  },
  {
    q: 'How do I actually make the payment?',
    a: 'The easiest method is IRS Direct Pay at IRS.gov/payments — free, instant, and you get immediate confirmation. You can also use the Electronic Federal Tax Payment System (EFTPS) at eftps.gov, which allows you to schedule payments in advance. Other options: pay by debit or credit card (convenience fee applies), or mail a check with Form 1040-ES. IRS Direct Pay is recommended for most people.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference?',
    desc:  '1099 income triggers the quarterly tax requirement. Understand how 1099 income is taxed before calculating your payments.',
  },
  {
    href:  '/library/small-business/business-deductions',
    cat:   'Small Business',
    title: 'What can I deduct as a small business owner?',
    desc:  'Business deductions reduce your net profit — which directly reduces both your income tax and your quarterly estimated tax payments.',
  },
  {
    href:  '/library/business-formation/llc-vs-scorp',
    cat:   'Business Formation',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'S-Corp owners run payroll and may have different quarterly payment requirements. Understand the structure before planning your payments.',
  },
]

// 2026 filing season deadlines for Tax Year 2025
const DEADLINES = [
  { quarter: 'Q1', period: 'Jan 1 – Mar 31, 2025',  due: 'April 15, 2026',    note: 'Same day as annual return deadline' },
  { quarter: 'Q2', period: 'Apr 1 – May 31, 2025',  due: 'June 16, 2026',     note: 'Only ~2 months — comes fast' },
  { quarter: 'Q3', period: 'Jun 1 – Aug 31, 2025',  due: 'September 15, 2026', note: 'Standard 3-month window' },
  { quarter: 'Q4', period: 'Sep 1 – Dec 31, 2025',  due: 'January 15, 2027',  note: 'Or file and pay by Jan 31, 2027' },
]

export default function QuarterlyTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  const [income, setIncome]   = useState('')
  const [expenses, setExpenses] = useState('')

  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  // Simple calculator
  const netProfit   = Math.max(0, (parseFloat(income) || 0) - (parseFloat(expenses) || 0))
  const seBase      = netProfit * 0.9235
  const seTax       = seBase * 0.153
  const seDeduction = seTax / 2
  const taxableIncome = netProfit - seDeduction
  // Simplified income tax at blended 22% for illustration
  const incomeTax   = taxableIncome > 0 ? taxableIncome * 0.22 : 0
  const totalTax    = seTax + incomeTax
  const quarterly   = totalTax / 4
  const monthly     = totalTax / 12

  return (
    <Layout t={t} meta={{
      title: 'Quarterly Estimated Taxes: Who Pays, How to Calculate, and When | AskLinTax',
      description: 'A complete guide to quarterly estimated tax payments for freelancers, contractors, and small business owners — including deadlines, calculation methods, and how to avoid underpayment penalties.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Why quarterly taxes exist</h2>
        <p>
          The U.S. tax system is "pay as you go." When you're an employee, your employer withholds taxes from every paycheck and sends them to the IRS on your behalf throughout the year. You never have to think about it.
        </p>
        <p>
          When you're self-employed, a freelancer, or an LLC owner, no one withholds anything. Every dollar you earn arrives gross. The IRS still expects to receive tax payments throughout the year — which is why the quarterly estimated tax system exists. Instead of withholding, you send payments directly four times a year.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The most common first-year mistake</div>
          <p>Many people new to self-employment spend all their income, then discover in April that they owe a large tax bill — plus penalties for not paying throughout the year. The penalty applies even if you pay everything in full by April 15. Start making quarterly payments from your first quarter of self-employment income.</p>
        </div>

        <h2>Do you need to make quarterly payments?</h2>
        <p>
          You are generally required to make quarterly estimated tax payments if both of these are true:
        </p>
        <ul>
          <li>You expect to owe at least <strong>$1,000</strong> in federal taxes for the year after subtracting withholding and credits</li>
          <li>Your withholding and credits will cover less than <strong>90% of your current year tax liability</strong>, or less than <strong>100% of your prior year tax liability</strong> (110% if prior year AGI exceeded $150,000)</li>
        </ul>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Your situation</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Quarterly payments required?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Freelancer or contractor with no W-2 income', '✅ Almost certainly yes — start from Q1'],
                ['LLC owner taking distributions (not S-Corp)', '✅ Yes — self-employment tax applies to net profit'],
                ['W-2 employee with significant side income', '⚠️ Maybe — depends on amount; consider increasing W-4 withholding first'],
                ['S-Corp owner paying yourself salary', '✅ Payroll handles it — but check if distributions create additional liability'],
                ['Employee with only W-2 income', '❌ No — employer withholding covers it'],
                ['Retiree with pension and investment income', '⚠️ Maybe — if withholding doesn\'t cover 90% of tax owed'],
              ].map(([situation, required], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>The 2026 quarterly payment deadlines</h2>
        <p>
          Quarterly payments for Tax Year 2025 income are due on these dates:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', margin: '24px 0' }}>
          {DEADLINES.map((d, i) => (
            <div key={i} style={{ background: i === 0 ? 'var(--gold-pale)' : 'var(--cream)', border: `1.5px solid ${i === 0 ? 'var(--gold)' : 'var(--border)'}`, borderRadius: '12px', padding: '18px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{d.quarter}</span>
                {i === 0 && <span style={{ fontSize: '11px', background: 'var(--gold)', color: '#fff', padding: '2px 8px', borderRadius: '100px', fontWeight: '600' }}>Coming up</span>}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>{d.due}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>{d.period}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--light)', fontStyle: 'italic' }}>{d.note}</div>
            </div>
          ))}
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Q4 exception: file early and skip the January payment</div>
          <p>For Q4, you can skip the January 15 payment if you file your complete tax return AND pay any remaining balance in full by January 31. This can simplify year-end planning if you're ready to file early.</p>
        </div>

        <h2>How to calculate your payment</h2>
        <p>
          There are two methods. Choose the one that works better for your situation:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Method 1 — Safe Harbor</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Pay based on last year's taxes</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '14px' }}>
              Pay 100% of last year's total tax liability in four equal installments (110% if prior year AGI &gt; $150,000). No calculation needed — just divide last year's tax bill by 4.
            </p>
            <div style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>✓ Guarantees no underpayment penalty</div>
            <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '6px' }}>Best for: variable income, uncertain current-year projections</div>
          </div>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Method 2 — Current Year Estimate</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Pay based on estimated current income</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '14px' }}>
              Estimate your annual net income, calculate income tax + self-employment tax, divide by 4. More accurate if income is lower than last year.
            </p>
            <div style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: '500' }}>✓ May result in lower payments</div>
            <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '6px' }}>Best for: predictable income or income lower than prior year</div>
          </div>
        </div>

        <h2>Quick calculator: estimate your quarterly payment</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '20px' }}>
          Enter your estimated annual figures to get a rough quarterly payment estimate. This uses a simplified 22% income tax rate — actual rates vary by income and filing status.
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '28px', margin: '0 0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>Estimated annual revenue / income</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--white)' }}>
                <span style={{ padding: '11px 14px', background: 'var(--slate)', fontSize: '15px', color: 'var(--muted)', borderRight: '1px solid var(--border)', flexShrink: 0 }}>$</span>
                <input
                  type="number"
                  placeholder="80,000"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                  style={{ flex: 1, padding: '11px 14px', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'DM Sans, sans-serif', background: 'transparent' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>Estimated business expenses</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--white)' }}>
                <span style={{ padding: '11px 14px', background: 'var(--slate)', fontSize: '15px', color: 'var(--muted)', borderRight: '1px solid var(--border)', flexShrink: 0 }}>$</span>
                <input
                  type="number"
                  placeholder="10,000"
                  value={expenses}
                  onChange={e => setExpenses(e.target.value)}
                  style={{ flex: 1, padding: '11px 14px', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'DM Sans, sans-serif', background: 'transparent' }}
                />
              </div>
            </div>
          </div>

          {netProfit > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'Net profit', value: `$${netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                  { label: 'Self-employment tax (est.)', value: `$${seTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                  { label: 'Income tax (est. 22%)', value: `$${incomeTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--white)', borderRadius: '10px', padding: '14px 16px', border: '1px solid var(--border-l)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--light)', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--navy)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--navy)', borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)', marginBottom: '4px' }}>Estimated quarterly payment</div>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--gold-l)' }}>${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginTop: '4px' }}>every 3 months</div>
                </div>
                <div style={{ background: 'var(--slate)', borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>If saving monthly instead</div>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)' }}>${monthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  <div style={{ fontSize: '12px', color: 'var(--light)', marginTop: '4px' }}>per month to set aside</div>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--light)', marginTop: '12px', marginBottom: 0, fontStyle: 'italic' }}>
                Estimates only. Actual tax depends on your total income, filing status, deductions, and credits. Consult a CPA for your specific situation.
              </p>
            </div>
          )}
        </div>

        <h2>How to actually make the payment</h2>
        <p>The IRS offers several ways to pay. In order of convenience:</p>
        <ol>
          <li><strong>IRS Direct Pay</strong> (IRS.gov/payments) — Free, instant, no account needed. Pay directly from your bank account. You get immediate confirmation. This is the recommended method for most people.</li>
          <li><strong>EFTPS</strong> (eftps.gov) — Free, allows you to schedule payments in advance. Requires a one-time enrollment (takes 5–7 business days to activate). Best if you want to automate quarterly payments.</li>
          <li><strong>Debit or credit card</strong> — Available through IRS-authorized processors, but carries a convenience fee (about 1.85–1.99%). Generally not worth it unless you're earning credit card rewards that offset the fee.</li>
          <li><strong>Check by mail</strong> — Mail a check payable to "United States Treasury" with Form 1040-ES payment voucher. Slowest and least recommended — no instant confirmation.</li>
        </ol>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The simplest system for self-employed people</div>
          <p>
            Open a separate savings account and label it "Tax Reserve." Every time you receive a payment, immediately transfer 25–30% into this account. When quarterly payment time comes, the money is already there — no stress, no scramble. Pay from this account, and whatever is left at year-end after your April filing is a bonus.
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

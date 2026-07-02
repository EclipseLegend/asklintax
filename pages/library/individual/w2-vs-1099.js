import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '10',
  title:         'W-2 vs 1099: what\'s the difference and why it matters',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers general principles of employee vs. independent contractor classification. Worker classification disputes are complex — consult a CPA or attorney if your classification is unclear or being challenged.',
  persona:       ['Employee with side freelance income', 'New freelancer or contractor', 'Anyone who received a 1099 for the first time', 'Gig economy worker'],
  relatedJourney: ['First-time filer', 'Starting a small business'],
  actionRequired: 'Identify every income source and which form you received (or should have received) for each. If you have both W-2 and 1099 income, you need to report both — and your 1099 income requires additional calculations for self-employment tax.',
}

const FAQS = [
  {
    q: 'I did some freelance work but didn\'t receive a 1099. Do I still need to report that income?',
    a: 'Yes. You are required to report all income regardless of whether you received a 1099. Clients are only required to send a 1099-NEC if they paid you $600 or more, but your obligation to report income has no minimum. If you earned $200 from a freelance project and received no 1099, you still report that $200 on Schedule C.',
  },
  {
    q: 'What is self-employment tax and why do 1099 workers pay more?',
    a: 'Self-employment tax is 15.3% of net self-employment income — it covers Social Security (12.4%) and Medicare (2.9%). Employees only pay half of this (7.65%) because their employer pays the other half. As a 1099 worker, you are both the employee and the employer, so you pay the full 15.3%. However, you can deduct half of the self-employment tax as an above-the-line deduction on your return, which reduces your income tax (but not the SE tax itself).',
  },
  {
    q: 'Can I deduct business expenses if I receive a 1099?',
    a: 'Yes — this is one of the major advantages of 1099 income. You report your income and expenses on Schedule C. Any ordinary and necessary business expense is deductible: home office, equipment, software, professional fees, marketing costs, business travel, and more. Your taxable income from self-employment is net profit (revenue minus expenses), not gross revenue.',
  },
  {
    q: 'My company says I\'m a contractor but treats me like an employee. Is that legal?',
    a: 'This is called worker misclassification and it\'s a serious issue. The IRS and Department of Labor use specific tests to determine worker status — it\'s not simply a matter of what a company calls you. If you have set hours, use company equipment, work exclusively for one company, and are told how to do your work, you may legally be an employee regardless of what your contract says. Misclassification costs you money in additional taxes and lost benefits. If you suspect misclassification, you can file Form SS-8 asking the IRS to determine your status.',
  },
  {
    q: 'I have both a W-2 from my job and 1099s from freelance work. How does that work?',
    a: 'You report both on the same tax return. Your W-2 income goes on Form 1040 as usual. Your 1099/freelance income goes on Schedule C, where you also deduct business expenses to arrive at net profit. That net profit gets added to your Form 1040 income. You\'ll also complete Schedule SE to calculate self-employment tax on the net profit. Tax software handles all of this automatically — you just enter each form as prompted.',
  },
  {
    q: 'Do I need to make quarterly estimated tax payments if I have 1099 income?',
    a: 'Probably yes. If you expect to owe more than $1,000 in federal taxes from your self-employment income, you\'re generally required to make quarterly estimated tax payments. Unlike employees whose taxes are withheld from each paycheck, 1099 workers must pay taxes proactively four times a year. Missing these payments results in underpayment penalties. Deadlines: April 15, June 16, September 15, and January 15.',
  },
  {
    q: 'What are the different types of 1099 forms?',
    a: 'There are many, but the most common: 1099-NEC (freelance and contractor income, replaces old 1099-MISC for this purpose); 1099-MISC (rent, prizes, legal settlements, and other miscellaneous income); 1099-INT (bank interest); 1099-DIV (dividends); 1099-B (investment and crypto sales); 1099-K (payment processor income — Venmo, PayPal, Stripe — for amounts over $600); 1099-R (retirement account distributions). Each type of 1099 is reported differently on your tax return.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/what-is-w2',
    cat:   'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'A box-by-box guide to understanding your W-2 — the form all employees receive from their employers.',
  },
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  '1099 workers must pay taxes quarterly. Here\'s how to calculate what you owe and avoid penalties.',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: 'What is an LLC and do I need one?',
    desc:  'If you\'re consistently earning 1099 income, forming an LLC may make sense. Here\'s how to decide.',
  },
]

export default function W2vs1099Page({ translations }) {
  const { t }    = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'W-2 vs 1099: What\'s the Difference and Why It Matters | AskLinTax',
      description: 'Understand the difference between a W-2 (employee) and a 1099 (contractor) — including how each is taxed, what you can deduct, and what to do if you have both.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The core difference in one sentence</h2>
        <p>
          A <strong>W-2</strong> means you're an employee — your employer withholds taxes from your paycheck and pays half your Social Security and Medicare taxes.
          A <strong>1099</strong> means you're an independent contractor or self-employed — you're responsible for paying all your own taxes, including the full 15.3% self-employment tax.
        </p>

        {/* Side-by-side visual */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          {/* W-2 card */}
          <div style={{ border: '2px solid var(--navy)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--navy)', padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form W-2</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>Employee</div>
            </div>
            <div style={{ padding: '18px 20px', background: 'var(--white)' }}>
              {[
                ['Employment type', 'Traditional employee'],
                ['Tax withholding', 'Employer withholds automatically'],
                ['Social Security & Medicare', 'You pay 7.65%; employer pays 7.65%'],
                ['Quarterly payments', 'Not required (employer handles it)'],
                ['Business deductions', 'Very limited'],
                ['Benefits', 'Often eligible (health, 401k, PTO)'],
                ['Stability', 'Usually higher'],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13.5px', color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--navy)', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 1099 card */}
          <div style={{ border: '2px solid var(--gold)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--gold)', padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.7)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form 1099-NEC</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>Independent Contractor</div>
            </div>
            <div style={{ padding: '18px 20px', background: 'var(--white)' }}>
              {[
                ['Employment type', 'Self-employed / contractor'],
                ['Tax withholding', 'None — you pay it yourself'],
                ['Social Security & Medicare', 'You pay the full 15.3%'],
                ['Quarterly payments', 'Required if you owe >$1,000'],
                ['Business deductions', 'Extensive (Schedule C)'],
                ['Benefits', 'None from client — pay your own'],
                ['Stability', 'Variable'],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13.5px', color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#7a5515', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2>The tax difference with real numbers</h2>
        <p>
          The biggest practical difference between W-2 and 1099 income is the self-employment tax. Here's what that means in dollars:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Scenario</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>W-2 Employee</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>1099 Contractor</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Gross income', '$80,000', '$80,000'],
                ['Business expenses deductible', 'Very few', 'Yes (reduces taxable income)'],
                ['Net income (assuming $5K expenses for contractor)', '$80,000', '$75,000'],
                ['Social Security & Medicare tax (FICA)', '$6,120 (7.65% employee share)', '$11,475 (15.3% full amount)'],
                ['Deduction for half of SE tax', 'N/A', '−$5,738'],
                ['Federal income tax (est. 22% bracket)', '~$12,100', '~$10,900'],
                ['Total federal tax burden (estimated)', '~$18,220', '~$16,637'],
                ['Take-home (estimated, before state tax)', '~$61,780', '~$58,363'],
              ].map(([label, emp, con], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 7 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{label}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', background: i % 2 === 1 ? 'var(--cream)' : 'white', color: 'var(--navy)', fontWeight: i === 7 ? '600' : '400' }}>{emp}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', background: i % 2 === 1 ? 'var(--gold-pale)' : 'var(--gold-pale)', color: '#7a5515', fontWeight: i === 7 ? '600' : '400' }}>{con}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '-8px' }}>
          Estimates only. Actual tax depends on deductions, credits, filing status, and state taxes. Consult a CPA for your specific situation.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ The 1099 tax surprise — and how to prepare for it</div>
          <p>Many people who switch from employee to contractor are shocked at tax time by the additional self-employment tax. The key is to set aside approximately <strong>25–30% of every 1099 payment</strong> for taxes as soon as you receive it. This covers both income tax and self-employment tax. Treating this money as already spent prevents the painful surprise of owing thousands at filing time.</p>
        </div>

        <h2>What you can deduct as a 1099 worker</h2>
        <p>
          One major advantage of 1099 income is the ability to deduct business expenses on Schedule C. These deductions reduce your net profit — the amount subject to both income tax and self-employment tax.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '24px 0' }}>
          {[
            { category: 'Home Office', items: ['Dedicated workspace (square footage method)', 'Utilities (proportional)', 'Internet (business portion)', 'Rent or mortgage interest (proportional)'], color: 'var(--blue)' },
            { category: 'Equipment & Tech', items: ['Computer and peripherals', 'Phone (business use %)', 'Software subscriptions', 'Office furniture and supplies'], color: 'var(--navy)' },
            { category: 'Professional Costs', items: ['Accounting and tax preparation', 'Legal fees (business related)', 'Professional memberships', 'Business insurance'], color: '#7C3AED' },
            { category: 'Marketing & Growth', items: ['Website and hosting', 'Advertising costs', 'Business cards and materials', 'Client entertainment (50% limit)'], color: 'var(--gold)' },
            { category: 'Travel & Transport', items: ['Business mileage (67 cents/mile in 2024)', 'Flights and hotels for business', 'Parking and tolls', 'Rideshare for business trips'], color: 'var(--green)' },
            { category: 'Education & Training', items: ['Courses related to your business', 'Books and professional development', 'Conferences and seminars', 'Subscriptions to industry publications'], color: '#DC2626' },
          ].map((cat, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: `1.5px solid ${cat.color}30`, borderRadius: '12px', padding: '18px 16px', borderTop: `3px solid ${cat.color}` }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: cat.color, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '12px' }}>{cat.category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.items.map((item, j) => (
                  <li key={j} style={{ fontSize: '13.5px', color: 'var(--mid)', padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                    <span style={{ color: cat.color, flexShrink: 0, marginTop: '2px' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep records for every deduction</div>
          <p>The IRS can audit your Schedule C deductions. Keep receipts, invoices, and records for every business expense you claim. For home office and vehicle deductions specifically, maintain a log showing business use. Cloud storage for receipts (a photo on your phone is fine) is sufficient — you don't need paper.</p>
        </div>

        <h2>The types of 1099 forms</h2>
        <p>
          "1099" is actually a family of forms. The type you receive tells you what kind of income it reports:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Form</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Reports</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Threshold</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Where to report</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1099-NEC',  'Freelance / contractor income',          '$600+',     'Schedule C'],
                ['1099-MISC', 'Rent, prizes, legal settlements',        '$600+',     'Schedule C or other income'],
                ['1099-INT',  'Bank and investment interest',           '$10+',      'Schedule B / Form 1040'],
                ['1099-DIV',  'Dividends from stocks/funds',            '$10+',      'Schedule B / Form 1040'],
                ['1099-B',    'Investment sales (stocks, crypto, etc)', 'All sales', 'Schedule D / Form 8949'],
                ['1099-K',    'Payment processor income (Venmo, Stripe)', '$600+',  'Schedule C (if business)'],
                ['1099-R',    'Retirement account distributions',       '$10+',      'Form 1040'],
                ['1099-G',    'Unemployment compensation, state tax refunds', 'All', 'Form 1040'],
              ].map(([form, reports, threshold, where], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '700', fontFamily: 'monospace', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{form}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{reports}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{threshold}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>What if you have both W-2 and 1099 income?</h2>
        <p>
          Having both is increasingly common — a full-time job plus freelance work, a salary plus rental income, or a W-2 plus investment income. Good news: they're reported on the same tax return.
        </p>
        <ul>
          <li><strong>W-2 income</strong> → enters your return directly from the W-2 form</li>
          <li><strong>1099-NEC / freelance income</strong> → goes on Schedule C, where you also subtract business expenses to get net profit</li>
          <li><strong>Net profit from Schedule C</strong> → flows to Form 1040 and adds to your total income</li>
          <li><strong>Self-employment tax</strong> → calculated on Schedule SE based on your Schedule C net profit</li>
        </ul>
        <p>
          Tax software handles all of this automatically. You just enter each form as you're prompted. The complexity is in the math — not in what you need to do.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The most important thing to know about 1099 income</div>
          <p>No taxes are withheld from 1099 payments. Every dollar comes to you gross. That's why 1099 workers must (1) set aside a portion of every payment for taxes, (2) make quarterly estimated tax payments if they expect to owe more than $1,000, and (3) track all business expenses throughout the year. Starting these habits immediately — not at tax time — is the difference between a smooth filing experience and a stressful one.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

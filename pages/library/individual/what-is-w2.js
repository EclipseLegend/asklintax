import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '09',
  title:         'What is a W-2 and how do I read it?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Box definitions are standard across all employers. Box 12 codes are the most complex area — consult a CPA if you see unusual codes you don\'t recognize.',
  persona:       ['First-time employee', 'New immigrant with first U.S. job', 'Anyone who has never read a W-2 before'],
  relatedJourney: ['First-time filer', 'New to the U.S.'],
  actionRequired: 'When your W-2 arrives (by January 31), check that your name, SSN, and Box 1 wages match your last pay stub. If anything looks wrong, contact your HR department immediately — errors on your W-2 must be corrected before you file.',
}

const FAQS = [
  {
    q: 'When should my W-2 arrive?',
    a: 'Employers are legally required to send W-2s by January 31. If you haven\'t received yours by mid-February, contact your HR or payroll department. Many employers also make W-2s available electronically through payroll portals like ADP or Paychex — check there first if you haven\'t received a paper copy.',
  },
  {
    q: 'I have multiple W-2s. Do I need to file all of them?',
    a: 'Yes. You must report income from every employer on your tax return. Enter each W-2 separately in your tax software — it will add them together automatically. Having multiple W-2s doesn\'t make your return more complex, it just means more data entry.',
  },
  {
    q: 'Box 1 on my W-2 is less than what I actually earned. Why?',
    a: 'Box 1 shows taxable wages — which may be lower than your total compensation. Common reasons: pre-tax 401(k) contributions (Box 12, Code D) reduce Box 1; pre-tax health insurance premiums paid through your employer reduce Box 1; Flexible Spending Account (FSA) contributions reduce Box 1. These benefits reduce your taxable income, which is intentional.',
  },
  {
    q: 'What if there\'s an error on my W-2?',
    a: 'Contact your employer\'s HR or payroll department immediately. They must issue a corrected W-2 (called a W-2c). Do not file your tax return with an incorrect W-2 — errors in your SSN, name, or wages must be corrected first. If you can\'t get a correction before the filing deadline, file Form 4852 as a substitute W-2.',
  },
  {
    q: 'My W-2 shows income in multiple states. What does that mean?',
    a: 'If you worked in more than one state during the year, or if your employer\'s payroll office is in a different state than where you work, you may see multiple state sections on your W-2 (Boxes 15–17 can repeat). You may need to file tax returns in multiple states. This is a situation where professional help is often worth it.',
  },
  {
    q: 'What is Box 12 and why does it have letter codes?',
    a: 'Box 12 reports various types of compensation and benefits using IRS letter codes. The most common codes you\'ll see: Code D = pre-tax 401(k) contributions; Code W = employer contributions to your Health Savings Account (HSA); Code DD = cost of employer-sponsored health coverage (informational only, not taxable); Code AA = Roth 401(k) contributions. Your tax software knows what to do with each code — just enter what\'s on the form.',
  },
  {
    q: 'I\'m on an H-1B visa. Is my W-2 any different?',
    a: 'The W-2 itself looks the same regardless of visa status. However, H-1B holders who are resident aliens for tax purposes file the same Form 1040 as U.S. citizens. If you\'re a nonresident alien (recently arrived H-1B in your first year), you\'d use Form 1040-NR instead. The W-2 data you enter is the same either way.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference?',
    desc:  'Employed or self-employed? The form you receive determines how you\'re taxed and what you can deduct.',
  },
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: 'First-time filer complete guide',
    desc:  'Now that you understand your W-2, this guide walks through exactly how to use it to file your return.',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Understanding credits and deductions helps you know what to look for beyond the basic W-2 numbers.',
  },
]

// W-2 Box definitions
const W2_BOXES = [
  { box: '1',    label: 'Wages, tips, other compensation',          color: 'var(--navy)',  highlight: true,  desc: 'Your total taxable wages for the year. This is what goes on your tax return as employment income. Note: this may be LESS than your total pay if you made pre-tax contributions (401k, health insurance, FSA).', importance: 'Critical' },
  { box: '2',    label: 'Federal income tax withheld',              color: '#DC2626',      highlight: true,  desc: 'The total federal income tax your employer sent to the IRS on your behalf throughout the year. If this number is larger than your actual tax liability, you get the difference back as a refund. This is why most people get refunds.', importance: 'Critical' },
  { box: '3',    label: 'Social Security wages',                    color: 'var(--muted)', highlight: false, desc: 'Wages subject to Social Security tax. Usually equals Box 1 but may differ if you have certain deductions. Social Security tax is 6.2% of this amount (Box 4).', importance: 'Important' },
  { box: '4',    label: 'Social Security tax withheld',             color: 'var(--muted)', highlight: false, desc: '6.2% of Box 3. Should be $0 if Box 3 is $0. Maximum for 2025: $10,918 (6.2% of the $176,100 wage base). If you had multiple employers and this total exceeds the maximum, you may be due a refund of the excess.', importance: 'Important' },
  { box: '5',    label: 'Medicare wages and tips',                  color: 'var(--muted)', highlight: false, desc: 'Wages subject to Medicare tax. Usually equals Box 3. Unlike Social Security, there is no wage cap for Medicare.', importance: 'Standard' },
  { box: '6',    label: 'Medicare tax withheld',                    color: 'var(--muted)', highlight: false, desc: '1.45% of Box 5. High earners (over $200,000 single / $250,000 MFJ) also pay an additional 0.9% Additional Medicare Tax.', importance: 'Standard' },
  { box: '10',   label: 'Dependent care benefits',                  color: 'var(--muted)', highlight: false, desc: 'If your employer provided dependent care benefits (like a Dependent Care FSA), the amount appears here. The first $5,000 is generally tax-free.', importance: 'If applicable' },
  { box: '12',   label: 'Codes (see Box 12 guide below)',           color: '#7C3AED',      highlight: true,  desc: 'Various types of compensation and benefits reported with letter codes. Most common: Code D (401k contributions), Code W (HSA employer contributions), Code DD (health coverage cost). See the Box 12 guide below.', importance: 'Important' },
  { box: '13',   label: 'Checkboxes (Statutory employee, Retirement plan, 3rd-party sick pay)', color: 'var(--muted)', highlight: false, desc: '"Retirement plan" box is important — if checked, it may affect your ability to deduct Traditional IRA contributions depending on your income.', importance: 'Check it' },
  { box: '14',   label: 'Other',                                    color: 'var(--muted)', highlight: false, desc: 'Employer-reported items that don\'t fit elsewhere. Common entries: state disability insurance (SDI), union dues, educational assistance. Informational only in most cases.', importance: 'Informational' },
  { box: '15–17', label: 'State tax information',                   color: 'var(--green)', highlight: false, desc: 'State employer ID (15), state wages (16), and state income tax withheld (17). Used to file your state tax return. If you worked in multiple states, these boxes may repeat.', importance: 'For state return' },
]

const BOX12_CODES = [
  { code: 'D',  desc: 'Pre-tax 401(k) contributions', taxable: 'Not taxable (reduces Box 1)', note: 'Most common code you\'ll see' },
  { code: 'E',  desc: '403(b) contributions (for teachers, non-profits)', taxable: 'Not taxable (reduces Box 1)', note: 'Similar to 401(k) but for different employers' },
  { code: 'W',  desc: 'Employer contributions to your HSA', taxable: 'Not taxable', note: 'Enter on Form 8889' },
  { code: 'DD', desc: 'Cost of employer-sponsored health coverage', taxable: 'Not taxable — informational only', note: 'Do nothing with this number' },
  { code: 'AA', desc: 'Roth 401(k) contributions', taxable: 'Already taxed (does NOT reduce Box 1)', note: 'After-tax contributions to retirement' },
  { code: 'C',  desc: 'Taxable cost of group-term life insurance over $50,000', taxable: 'Taxable (already included in Box 1)', note: 'Informational' },
  { code: 'V',  desc: 'Income from stock option exercises', taxable: 'Already included in Box 1', note: 'Common at tech companies' },
]

export default function WhatIsW2Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq]       = useState({})
  const [activeBox, setActiveBox]   = useState(null)
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'What is a W-2 and How Do I Read It? | AskLinTax',
      description: 'A plain-language guide to understanding your W-2 form — what every box means, why Box 1 may differ from your actual salary, what Box 12 codes mean, and what to do if something looks wrong.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is a W-2?</h2>
        <p>
          A W-2 is the form your employer sends you every January to report how much you earned and how much tax was withheld from your paycheck during the previous year. It's the most important document for most employed people filing a U.S. tax return.
        </p>
        <p>
          Your employer sends copies to both you <em>and</em> the IRS — so the IRS already knows what you earned before you file. If you report different numbers than what's on your W-2, the IRS will notice.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ When your W-2 arrives: do these three things first</div>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li><strong>Check your name and SSN</strong> — even a small error can delay your refund or cause IRS notices</li>
            <li><strong>Compare Box 1 to your last pay stub</strong> — they may differ (see below why), but you should understand why</li>
            <li><strong>Check Box 2 — federal tax withheld</strong> — this is what you've already paid; if it exceeds your tax liability, you get the difference back</li>
          </ul>
        </div>

        <h2>The W-2 box-by-box guide</h2>
        <p>
          A W-2 has many boxes, but most people only need to focus on a few. Here's what each one means — click any box for more detail.
        </p>

        {/* W-2 visual diagram */}
        <div style={{ margin: '28px 0' }}>
          {/* Header bar mimicking W-2 look */}
          <div style={{ background: 'var(--navy)', borderRadius: '12px 12px 0 0', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form W-2</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Wage and Tax Statement</div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)' }}>Tax Year {TAX_CONFIG.currentTaxYear}</div>
          </div>

          {/* Box grid */}
          <div style={{ border: '1.5px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
            {W2_BOXES.map((item, i) => (
              <div
                key={item.box}
                onClick={() => setActiveBox(activeBox === i ? null : i)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0',
                  borderBottom: i < W2_BOXES.length - 1 ? '1px solid var(--border-l)' : 'none',
                  cursor: 'pointer',
                  transition: 'background .15s',
                  background: activeBox === i ? 'var(--gold-pale)' : i % 2 === 0 ? 'var(--white)' : 'var(--cream)',
                }}
              >
                {/* Box number */}
                <div style={{
                  minWidth: '64px', padding: '14px 12px', textAlign: 'center',
                  borderRight: '1px solid var(--border-l)',
                  background: item.highlight ? item.color + '12' : 'transparent',
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', marginBottom: '2px' }}>Box</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: item.highlight ? item.color : 'var(--muted)', fontFamily: 'monospace' }}>{item.box}</div>
                </div>
                {/* Label + importance */}
                <div style={{ flex: 1, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: item.highlight ? '600' : '400', color: item.highlight ? 'var(--navy)' : 'var(--mid)' }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '600', padding: '2px 9px', borderRadius: '100px',
                      background: item.importance === 'Critical' ? 'var(--red-soft)' :
                                  item.importance === 'Important' ? 'rgba(27,45,79,.08)' :
                                  item.importance === 'Check it' ? 'var(--gold-pale)' : 'var(--slate)',
                      color: item.importance === 'Critical' ? 'var(--red)' :
                             item.importance === 'Important' ? 'var(--navy)' :
                             item.importance === 'Check it' ? '#7a5515' : 'var(--muted)',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {item.importance}
                    </span>
                  </div>
                  {activeBox === i && (
                    <div style={{ marginTop: '10px', fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72', borderTop: '1px solid var(--border-l)', paddingTop: '10px' }}>
                      {item.desc}
                    </div>
                  )}
                </div>
                {/* Expand indicator */}
                <div style={{ padding: '14px 14px', color: 'var(--light)', fontSize: '16px', flexShrink: 0 }}>
                  {activeBox === i ? '−' : '+'}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
            Click any row to see a detailed explanation.
          </p>
        </div>

        <h2>Why Box 1 may be less than your actual salary</h2>
        <p>
          This confuses many first-time W-2 readers. Box 1 shows your <em>taxable</em> wages — not your total compensation. Several common benefits reduce Box 1 before the number is calculated:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Benefit</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Reduces Box 1?</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Where it appears</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pre-tax 401(k) contributions', '✅ Yes', 'Box 12, Code D'],
                ['Pre-tax health insurance premiums', '✅ Yes', 'Not separately shown on W-2'],
                ['Health FSA contributions', '✅ Yes', 'Not separately shown on W-2'],
                ['Dependent Care FSA', '✅ Yes', 'Box 10'],
                ['Commuter benefits (pre-tax transit/parking)', '✅ Yes', 'Box 14 (sometimes)'],
                ['Roth 401(k) contributions', '❌ No — already taxed', 'Box 12, Code AA'],
                ['After-tax health insurance premiums', '❌ No', 'Not on W-2'],
              ].map(([benefit, reduces, where], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{benefit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{reduces}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Example: why your W-2 might show less than your salary</div>
          <p>
            You earn $80,000. You contribute $10,000 to your 401(k) and pay $3,000 in pre-tax health insurance premiums.
            Box 1 on your W-2 will show <strong>$67,000</strong> — not $80,000. That's correct. You're only taxed on $67,000, which is the whole point of pre-tax benefits.
          </p>
        </div>

        <h2>Box 12 codes: the most common ones explained</h2>
        <p>
          Box 12 can have up to four entries, each with a letter code. Most people see only one or two. Here are the most common:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: '#7C3AED', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', width: '70px' }}>Code</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>What it means</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Taxable?</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Note</th>
              </tr>
            </thead>
            <tbody>
              {BOX12_CODES.map(({ code, desc, taxable, note }, i) => (
                <tr key={code}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '700', fontFamily: 'monospace', fontSize: '16px', color: '#7C3AED', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{code}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{desc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{taxable}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', fontSize: '13.5px', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Don't panic about Box 12</div>
          <p>If you're using tax software, just enter the code and amount exactly as shown. The software knows what to do with each code. You don't need to memorize what every code means — just enter it accurately.</p>
        </div>

        <h2>What to do if something looks wrong</h2>
        <ul>
          <li><strong>Wrong name or SSN</strong> — Contact HR immediately. This must be corrected before you file. An incorrect SSN can prevent your return from being processed.</li>
          <li><strong>Box 1 seems too high</strong> — Check if pre-tax benefits were properly excluded. Compare to your final pay stub. If the discrepancy is unexplained, contact payroll.</li>
          <li><strong>Box 2 is zero or very low</strong> — You may have claimed too many allowances on your W-4. This isn't wrong, but means you may owe taxes when you file instead of getting a refund.</li>
          <li><strong>Missing W-2 by mid-February</strong> — Contact HR first. If you still can't get it, call the IRS at 1-800-829-1040 — they can contact your employer on your behalf. As a last resort, file Form 4852 (substitute W-2) using your pay stubs.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '08',
  title:         'Tax credit vs. tax deduction: what\'s the difference?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers standard definitions and examples. Specific credit and deduction amounts change annually — always verify current figures before filing.',
  persona:       ['First-time filer', 'Anyone confused by tax terminology', 'New immigrant learning the U.S. tax system'],
  relatedJourney: ['First-time filer', 'Learning the basics'],
  actionRequired: 'After reading this guide, identify which credits and deductions apply to your situation. Credits reduce your tax bill dollar-for-dollar — always claim every credit you qualify for before considering deductions.',
}

const FAQS = [
  {
    q: 'Which is better — a tax credit or a tax deduction?',
    a: 'A tax credit is almost always more valuable than a tax deduction of the same dollar amount. A $1,000 tax credit reduces your tax bill by exactly $1,000. A $1,000 tax deduction reduces your taxable income by $1,000 — which saves you $1,000 × your tax rate. If you\'re in the 22% bracket, that $1,000 deduction saves you $220. The credit saves you $1,000. Credits win.',
  },
  {
    q: 'What does "refundable" mean for a tax credit?',
    a: 'A refundable credit can reduce your tax bill below zero — meaning the government actually pays you the difference as a refund. For example, if you owe $500 in taxes but qualify for a $2,000 refundable credit, you receive a $1,500 refund. A non-refundable credit can only reduce your tax bill to zero — it can\'t generate a refund beyond what you\'ve already paid.',
  },
  {
    q: 'Can I claim both credits and deductions?',
    a: 'Yes. Credits and deductions are independent — you can claim all the deductions you qualify for AND all the credits you qualify for on the same return. They work at different stages: deductions reduce your taxable income first, then your tax is calculated, then credits reduce the resulting tax bill.',
  },
  {
    q: 'What is the standard deduction and who should take it?',
    a: 'The standard deduction is a fixed deduction everyone can claim without tracking individual expenses. For Tax Year 2025, it\'s $14,600 for single filers and $29,200 for married filing jointly. Most people — especially those without a mortgage, high state taxes, or large charitable donations — are better off taking the standard deduction than itemizing. When in doubt, let tax software calculate both options and choose the larger one.',
  },
  {
    q: 'What is the difference between "above-the-line" and "below-the-line" deductions?',
    a: 'Above-the-line deductions (officially called "adjustments to income") reduce your gross income before you calculate your Adjusted Gross Income (AGI). They\'re valuable because a lower AGI can unlock additional credits and deductions. Examples: student loan interest, IRA contributions, self-employed health insurance. Below-the-line deductions come after AGI — these are either the standard deduction or itemized deductions. You claim one or the other, not both.',
  },
  {
    q: 'I heard about the Child Tax Credit. Is that a credit or a deduction?',
    a: 'It\'s a credit — and a partially refundable one. For Tax Year 2025, it\'s worth up to $2,000 per qualifying child under 17. Up to $1,700 of that is refundable as the Additional Child Tax Credit (ACTC), meaning even families who owe no tax can receive up to $1,700 per child as a refund. This is one of the most valuable credits for families with children.',
  },
  {
    q: 'Do deductions help more at higher income levels?',
    a: 'Yes. The value of a deduction depends on your marginal tax rate — the rate you pay on the last dollar of income. If you\'re in the 32% bracket, a $1,000 deduction saves you $320. If you\'re in the 12% bracket, the same deduction saves you $120. Credits, by contrast, have the same dollar value regardless of your tax bracket — a $1,000 credit always saves you $1,000.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: 'First-time filer complete guide',
    desc:  'Now that you understand credits and deductions, this guide walks through the full filing process — including where credits and deductions appear on your return.',
  },
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Refundable tax credits are one of the main reasons to file even when you\'re not required to.',
  },
  {
    href:  '/library/individual/child-tax-credit',
    cat:   'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'One of the most valuable credits for families — and one of the most commonly underclaimed.',
  },
]

export default function TaxCreditVsDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Tax Credit vs. Tax Deduction: What\'s the Difference? | AskLinTax',
      description: 'Finally understand the difference between a tax credit and a tax deduction — with plain-language explanations, real number examples, and a comparison of the most common credits and deductions.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The one-sentence version</h2>
        <p>
          A <strong>tax deduction</strong> reduces the amount of income that gets taxed.
          A <strong>tax credit</strong> reduces the amount of tax you owe.
        </p>
        <p>
          Both save you money — but they work at different points in the calculation, and credits are almost always more valuable dollar-for-dollar.
        </p>

        {/* Visual comparison */}
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '28px', margin: '28px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
            {/* Deduction side */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>Tax Deduction</div>
              <div style={{ background: 'var(--navy)', borderRadius: '10px', padding: '16px 20px', color: '#fff', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', marginBottom: '4px' }}>Reduces</div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>Taxable Income</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>then tax is calculated on the lower income</div>
            </div>
            {/* VS */}
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '400', color: 'var(--gold)', textAlign: 'center' }}>vs</div>
            {/* Credit side */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>Tax Credit</div>
              <div style={{ background: 'var(--green)', borderRadius: '10px', padding: '16px 20px', color: '#fff', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', marginBottom: '4px' }}>Reduces</div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>Tax Owed</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>dollar-for-dollar, after tax is calculated</div>
            </div>
          </div>
        </div>

        <h2>A real example with numbers</h2>
        <p>
          Let's say your taxable income is <strong>$60,000</strong> and you're in the <strong>22% tax bracket</strong>.
          You have two choices: a $1,000 tax deduction or a $1,000 tax credit.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          {/* Deduction example */}
          <div style={{ border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--navy)', padding: '14px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,.6)', letterSpacing: '.06em', textTransform: 'uppercase' }}>$1,000 Tax Deduction</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              {[
                ['Starting income', '$60,000'],
                ['Minus deduction', '− $1,000'],
                ['Taxable income', '$59,000'],
                ['Tax at 22%', '$59,000 × 22%'],
                ['Tax owed', '$12,980'],
                ['Tax without deduction', '$13,200'],
                ['Your savings', '$220'],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none',
                  borderTop: i === 6 ? '2px solid var(--border)' : 'none',
                  marginTop: i === 6 ? '8px' : '0',
                }}>
                  <span style={{ fontSize: '14px', color: i === 6 ? 'var(--navy)' : 'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: i === 6 ? '700' : '500', color: i === 6 ? 'var(--navy)' : 'var(--text)' }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', background: 'rgba(27,45,79,.06)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--muted)' }}>
                A $1,000 deduction saved you <strong style={{ color: 'var(--navy)' }}>$220</strong> — your tax rate × the deduction amount.
              </div>
            </div>
          </div>

          {/* Credit example */}
          <div style={{ border: '1.5px solid var(--green)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--green)', padding: '14px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,.8)', letterSpacing: '.06em', textTransform: 'uppercase' }}>$1,000 Tax Credit</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              {[
                ['Starting income', '$60,000'],
                ['Taxable income', '$60,000'],
                ['Tax at 22%', '$60,000 × 22%'],
                ['Tax before credit', '$13,200'],
                ['Minus credit', '− $1,000'],
                ['Tax owed', '$12,200'],
                ['Your savings', '$1,000'],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none',
                  borderTop: i === 6 ? '2px solid rgba(22,163,74,.3)' : 'none',
                  marginTop: i === 6 ? '8px' : '0',
                }}>
                  <span style={{ fontSize: '14px', color: i === 6 ? 'var(--green)' : 'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: i === 6 ? '700' : '500', color: i === 6 ? 'var(--green)' : 'var(--text)' }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', background: 'rgba(22,163,74,.08)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--muted)' }}>
                A $1,000 credit saved you <strong style={{ color: 'var(--green)' }}>$1,000</strong> — the full dollar amount, regardless of your tax rate.
              </div>
            </div>
          </div>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The rule of thumb</div>
          <p>A tax credit saves you its face value. A tax deduction saves you its face value × your tax rate. In the 22% bracket, a $1,000 deduction saves $220. A $1,000 credit saves $1,000. <strong>Always prioritize credits over deductions.</strong></p>
        </div>

        <h2>The three types of tax credits</h2>
        <p>
          Not all tax credits work the same way. Understanding the three types helps you know what to expect when you file:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', margin: '24px 0' }}>
          {[
            {
              type: 'Refundable',
              color: 'var(--green)',
              bgColor: 'var(--green-soft)',
              desc: 'Can reduce your tax bill below zero. You receive the excess as a cash refund — even if you owed no tax at all.',
              examples: 'Earned Income Tax Credit (EITC), Additional Child Tax Credit',
              star: '⭐ Most valuable',
            },
            {
              type: 'Partially Refundable',
              color: '#D97706',
              bgColor: '#FFFBEB',
              desc: 'Has both a refundable and non-refundable portion. Part of it can generate a refund; the rest only reduces tax to zero.',
              examples: 'Child Tax Credit ($1,700 refundable / $300 non-refundable per child in 2025)',
              star: '✓ Still very valuable',
            },
            {
              type: 'Non-Refundable',
              color: 'var(--blue)',
              bgColor: 'var(--blue-soft)',
              desc: 'Can reduce your tax bill to zero, but cannot generate a refund. Only useful if you actually owe taxes.',
              examples: 'Child and Dependent Care Credit, Lifetime Learning Credit, Foreign Tax Credit',
              star: 'Valuable if you owe taxes',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bgColor, border: `1.5px solid ${item.color}30`, borderRadius: '12px', padding: '20px 18px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.08em', textTransform: 'uppercase', color: item.color, marginBottom: '8px' }}>{item.star}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>{item.type}</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '12px' }}>{item.desc}</p>
              <div style={{ fontSize: '13px', color: item.color, fontWeight: '500' }}>Examples: {item.examples}</div>
            </div>
          ))}
        </div>

        <h2>Common deductions — and what they're actually worth</h2>
        <p>
          Deductions are valuable, but their worth depends on your tax bracket. Here's a quick guide to the most common deductions for Chinese families and what they actually save at common tax rates:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Deduction</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Who qualifies</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Savings at 12%</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>Savings at 22%</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Standard deduction ($14,600 single)', 'Everyone — no tracking needed', '$1,752', '$3,212'],
                ['Student loan interest (up to $2,500)', 'Paid student loan interest, income under limit', '$300', '$550'],
                ['IRA contribution (up to $7,000)', 'Earned income, under age 50, meets income limits', '$840', '$1,540'],
                ['Self-employed health insurance', 'Self-employed, paid your own premiums', 'Varies', 'Varies'],
                ['Home office (if self-employed)', 'Dedicated workspace used for business', 'Varies', 'Varies'],
                ['Business expenses (Schedule C)', 'Self-employed — all ordinary and necessary expenses', 'Varies', 'Varies'],
              ].map(([ded, who, s12, s22], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{ded}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{s12}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', color: 'var(--navy)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{s22}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Common credits — and what they're actually worth</h2>
        <p>
          These are the most commonly claimed tax credits by Chinese families and small business owners in the U.S.:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--green)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Credit</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Maximum value</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Refundable?</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Who qualifies</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Earned Income Tax Credit (EITC)', 'Up to $7,830', '✅ Yes', 'Low-to-moderate income workers with earned income'],
                ['Child Tax Credit', 'Up to $2,000/child', '⚡ Partial ($1,700)', 'Qualifying children under 17 with SSN'],
                ['Child & Dependent Care Credit', 'Up to $1,050 (1 child)', '❌ No', 'Paid for childcare while you worked'],
                ['American Opportunity Credit', 'Up to $2,500', '⚡ Partial ($1,000)', 'First 4 years of college, income limits apply'],
                ['Lifetime Learning Credit', 'Up to $2,000', '❌ No', 'Any post-secondary education, income limits'],
                ['Retirement Savings Credit (Saver\'s Credit)', 'Up to $1,000 ($2,000 MFJ)', '❌ No', 'Low-to-moderate income, contributed to retirement account'],
                ['Foreign Tax Credit', 'Equals taxes paid abroad', '❌ No', 'Paid taxes to a foreign government on foreign income'],
              ].map(([credit, max, refund, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{credit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--green)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{max}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{refund}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How they work together: the full picture</h2>
        <p>
          Credits and deductions don't compete — they work in sequence. Here's the order in which everything happens on your tax return:
        </p>

        <div style={{ margin: '24px 0' }}>
          {[
            { step: '1', label: 'Start with gross income', desc: 'All income from all sources — wages, freelance, investments, rental income.', color: 'var(--navy)' },
            { step: '2', label: 'Subtract above-the-line deductions', desc: 'IRA contributions, student loan interest, self-employed health insurance, etc. These reduce your Adjusted Gross Income (AGI).', color: 'var(--navy)' },
            { step: '3', label: '= Adjusted Gross Income (AGI)', desc: 'A key number — many credits and deductions have income limits based on AGI.', color: 'var(--gold)', isMilestone: true },
            { step: '4', label: 'Subtract standard or itemized deductions', desc: 'The standard deduction ($14,600 single in 2025) or your actual itemized expenses — whichever is larger.', color: 'var(--navy)' },
            { step: '5', label: '= Taxable income', desc: 'Your income after all deductions. This is what your tax is calculated on.', color: 'var(--gold)', isMilestone: true },
            { step: '6', label: 'Calculate tax on taxable income', desc: 'Apply the tax brackets to your taxable income.', color: 'var(--navy)' },
            { step: '7', label: 'Subtract tax credits', desc: 'Non-refundable credits first (can reduce to zero), then refundable credits (can generate a refund).', color: 'var(--green)' },
            { step: '8', label: '= Final tax owed (or refund)', desc: 'If this is negative, you get a refund. If positive, you owe this amount minus any withholding already paid.', color: 'var(--green)', isMilestone: true },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 7 ? '0' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.isMilestone ? item.color : 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: item.isMilestone ? `2px solid ${item.color}` : '2px solid var(--border)' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: item.isMilestone ? '#fff' : 'var(--muted)' }}>{item.step}</span>
                </div>
                {i < 7 && <div style={{ width: '2px', flex: '1', background: 'var(--border)', minHeight: '24px', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: '20px', paddingTop: '6px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: item.isMilestone ? item.color : 'var(--navy)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.65' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ What to do with this knowledge</div>
          <p>Now that you understand the difference, here's how to apply it: <strong>(1)</strong> Always claim every credit you qualify for — they're more valuable than deductions. <strong>(2)</strong> Take above-the-line deductions (IRA, student loan interest) before calculating your AGI — they unlock other benefits. <strong>(3)</strong> Compare standard vs. itemized deduction using tax software — let it calculate both and choose the larger one. <strong>(4)</strong> Don't miss refundable credits just because you don't think you owe taxes — the EITC and Child Tax Credit can generate real cash refunds.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

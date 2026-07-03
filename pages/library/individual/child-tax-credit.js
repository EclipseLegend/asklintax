import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id: '17',
  title: 'Child Tax Credit: who qualifies and how to claim it',
  category: 'Individuals & Families',
  categoryHref: '/library/individual',
  userEmotion: 'learning',
  difficulty: 'Beginner',
  readTime: '5 min read',
  cpaReviewed: true,
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'Covers the standard Child Tax Credit rules for Tax Year 2025. Credit amounts and phase-out thresholds are set by current law and may change in future years.',
  persona: ['Parent with children under 17', 'New immigrant with children', 'Anyone who has never claimed the CTC before'],
  relatedJourney: ['Filing with dependents', 'Money & Benefits'],
  actionRequired: 'Verify each child meets the seven qualifying child tests. If you have a qualifying child with a valid SSN and your income is below the phase-out threshold, claim the credit on your tax return — it reduces your tax bill dollar-for-dollar, and up to $1,700 per child is refundable.',
}

const FAQS = [
  { q: 'Can I claim the Child Tax Credit if my child doesn\'t have a Social Security Number?', a: 'No. A qualifying child must have a valid SSN issued before the due date of your return (including extensions) to claim the Child Tax Credit. Children with ITINs do not qualify for the CTC. However, they may qualify for the Credit for Other Dependents, which is worth up to $500 per dependent.' },
  { q: 'My child turned 17 this year. Can I still claim the credit?', a: 'No. The child must be under 17 at the end of the tax year to qualify for the Child Tax Credit. If your child turned 17 during the year, they do not qualify for the CTC for that year — even if they were 16 for most of it. They may still qualify for the Credit for Other Dependents ($500) if they meet the other dependency tests.' },
  { q: 'What is the Additional Child Tax Credit (ACTC)?', a: 'The ACTC is the refundable portion of the Child Tax Credit. For Tax Year 2025, up to $1,700 per qualifying child is refundable — meaning you can receive it as a refund even if you owe no federal income tax. The ACTC is calculated on Schedule 8812 and is automatically computed by tax software. You don\'t file separately for it.' },
  { q: 'I\'m a new immigrant. Can I claim the Child Tax Credit?', a: 'If you are a U.S. tax resident (resident alien) and your qualifying child has a valid SSN, you can claim the Child Tax Credit. Nonresident aliens generally cannot claim the CTC. Green card holders and those who pass the Substantial Presence Test are resident aliens and may qualify.' },
  { q: 'My child lives with my ex-spouse. Who claims the credit?', a: 'Generally, the custodial parent — the one the child lives with for more nights during the year — claims the CTC. The custodial parent can sign Form 8332 to release the exemption to the noncustodial parent for a specific year. If the child spends equal time with both parents, the parent with the higher AGI claims the credit by default.' },
  { q: 'Does the Child Tax Credit reduce my taxes or increase my refund?', a: 'Both. The non-refundable portion ($300 per child in 2025) reduces your tax bill to zero but cannot create a refund beyond what you\'ve already paid. The refundable portion — Additional Child Tax Credit, up to $1,700 per child — can generate actual cash back even if you owe no taxes. So a family with two qualifying children could receive up to $3,400 in refundable credits even with zero tax liability.' },
  { q: 'Can I claim the credit for a child I\'m supporting financially but who doesn\'t live with me?', a: 'Generally no — the residency test requires the child to live with you for more than half the year. There\'s an exception if the custodial parent signs Form 8332 releasing the credit to you. But simply providing financial support without the child living with you is not sufficient to claim the CTC.' },
]

const RELATED = [
  { href: '/library/individual/tax-credit-vs-deduction', cat: 'Individuals & Families', title: 'Tax credit vs. tax deduction: what\'s the difference?', desc: 'The Child Tax Credit is one of the most valuable credits available. Understand why credits beat deductions dollar-for-dollar.' },
  { href: '/library/individual/do-i-need-to-file', cat: 'Individuals & Families', title: 'Do I need to file a U.S. tax return?', desc: 'The refundable Child Tax Credit is one of the best reasons to file even when you\'re not required to.' },
  { href: '/library/individual/itin', cat: 'Individuals & Families', title: 'What is an ITIN and how do I apply?', desc: 'Children without SSNs need an ITIN for other credits. Understand the difference between SSN and ITIN eligibility.' },
]

const QUALIFYING_TESTS = [
  { test: 'Age', requirement: 'Under 17 at the end of the tax year', note: 'Child who turns 17 during the year does NOT qualify' },
  { test: 'Relationship', requirement: 'Your child, stepchild, foster child, sibling, step-sibling, or descendant of any of these', note: 'Adopted children qualify the same as biological children' },
  { test: 'Residency', requirement: 'Lived with you for more than half the year', note: 'Temporary absences (school, vacation, medical) still count as living with you' },
  { test: 'Dependency', requirement: 'You claim them as a dependent on your return', note: 'Only one person can claim a child as a dependent' },
  { test: 'Support', requirement: 'Child did not provide more than half of their own financial support', note: 'Most children under 17 automatically meet this test' },
  { test: 'Joint return', requirement: 'Child did not file a joint return with a spouse (unless only to claim a refund)', note: 'Rare edge case — most children under 17 don\'t file jointly' },
  { test: 'Social Security Number', requirement: 'Child has a valid SSN issued before the return due date', note: 'ITIN does not qualify for CTC (but may qualify for Credit for Other Dependents)' },
]

export default function ChildTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{ title: 'Child Tax Credit 2025: Who Qualifies and How to Claim It | AskLinTax', description: 'A complete guide to the Child Tax Credit for Tax Year 2025 — worth up to $2,000 per child, with $1,700 refundable. Includes the 7 qualifying tests, income phase-out thresholds, and how new immigrants can claim it.' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is the Child Tax Credit?</h2>
        <p>The Child Tax Credit (CTC) is one of the most valuable tax benefits available to families with children. For Tax Year 2025, it's worth up to <strong>$2,000 per qualifying child</strong> under 17 — and up to <strong>$1,700 of that is refundable</strong>, meaning you can receive it as a cash refund even if you owe no federal taxes.</p>
        <p>Many Chinese immigrant families who qualify for this credit never claim it — either because they don't know it exists, or because they assume it doesn't apply to them as non-citizens. It does apply to resident aliens with qualifying children who have valid SSNs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', margin: '28px 0' }}>
          {[
            { label: 'Credit per qualifying child', value: '$2,000', sub: 'Tax Year 2025', color: 'var(--navy)' },
            { label: 'Refundable portion (ACTC)', value: '$1,700', sub: 'Per child — even with $0 tax owed', color: 'var(--green)' },
            { label: 'Phase-out begins at', value: '$200,000', sub: 'Single / $400,000 MFJ', color: 'var(--gold)' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: `1.5px solid ${item.color}30`, borderRadius: '12px', padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: item.color, marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--light)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <h2>The 7 qualifying child tests</h2>
        <p>To claim the Child Tax Credit, your child must pass all seven tests:</p>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Test</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Requirement</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Key detail</th>
            </tr></thead>
            <tbody>{QUALIFYING_TESTS.map(({ test, requirement, note }, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white', whiteSpace: 'nowrap' }}>{test}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{requirement}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', fontSize: '13.5px', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>Income phase-out: does it affect you?</h2>
        <p>The credit begins to phase out at these Modified AGI thresholds:</p>
        <ul>
          <li><strong>$200,000</strong> for single filers, head of household, and married filing separately</li>
          <li><strong>$400,000</strong> for married filing jointly</li>
        </ul>
        <p>Above these thresholds, the credit is reduced by $50 for each $1,000 of income over the limit. Most families with children are well below these thresholds and receive the full credit.</p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Refundable means you get cash back</div>
          <p>Many families think they can't benefit from the CTC because they don't owe taxes. That's not true for the refundable portion. If you have two qualifying children and owe $0 in taxes, you can still receive up to <strong>$3,400</strong> in refundable Additional Child Tax Credit. File your return — it's the only way to claim it.</p>
        </div>

        <h2>How to claim the credit</h2>
        <ol>
          <li><strong>List your qualifying children</strong> on your Form 1040 (Section for Dependents), including their SSNs.</li>
          <li><strong>Complete Schedule 8812</strong> — Credits for Qualifying Children and Other Dependents. Tax software does this automatically.</li>
          <li><strong>The credit is calculated automatically</strong> — software determines how much of the $2,000 per child reduces your tax (non-refundable portion) and how much becomes a refund (ACTC, up to $1,700).</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ SSN required — ITIN is not enough</div>
          <p>The Child Tax Credit requires a valid Social Security Number for each qualifying child. Children with ITINs do not qualify for the CTC. If your child doesn't yet have an SSN, apply for one — children with work authorization or citizenship can receive an SSN. Children without SSN eligibility may qualify for the Credit for Other Dependents ($500, non-refundable).</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

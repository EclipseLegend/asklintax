import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '06',
  title:         'Do I need to file a U.S. tax return?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers standard filing requirements for resident aliens and U.S. citizens. Nonresident aliens (Form 1040-NR filers) have different thresholds — see the note in the article.',
  persona:       ['First-time filer', 'New immigrant', 'Student with part-time income', 'Anyone unsure if they need to file'],
  relatedJourney: ['First-time filer', 'New to the U.S.'],
  actionRequired: 'Use the income threshold table below to check whether your gross income exceeds the filing requirement for your filing status. If it does, you are required to file. If it doesn\'t, check whether filing anyway could get you a refund.',
}

const FAQS = [
  {
    q: 'What happens if I don\'t file and I was supposed to?',
    a: 'If you owe taxes and don\'t file, the IRS will charge a failure-to-file penalty (5% of unpaid taxes per month, up to 25%) plus interest. If you\'re owed a refund and don\'t file, you simply don\'t get the refund — there\'s no penalty, but you lose the money. The IRS has 3 years from the due date to assess additional taxes, but there\'s no deadline if you never file at all.',
  },
  {
    q: 'I had no income this year. Do I still need to file?',
    a: 'Generally no. If your gross income is below the filing threshold for your status (see the table above), you are not required to file. However, if your employer withheld federal taxes from your paycheck, filing a return is the only way to get that money back as a refund. Even with zero income, filing may be in your interest.',
  },
  {
    q: 'I\'m a student with only a small amount of income. Do I need to file?',
    a: 'It depends on the amount. For Tax Year 2025, single filers under 65 must file if gross income exceeds $14,600 (the standard deduction). If you earned less than that, you\'re not required to file — but you should file anyway if taxes were withheld from your paycheck, since you\'ll likely get a full refund.',
  },
  {
    q: 'I\'m a nonresident alien (F-1 student, J-1 visitor). Do the same rules apply?',
    a: 'No. Nonresident aliens have different filing rules and use Form 1040-NR instead of the standard Form 1040. The income thresholds are different, and even small amounts of U.S.-source income may require filing. F-1 students who had no U.S. income must still file Form 8843 to document their exempt individual status.',
  },
  {
    q: 'Can I file even if I\'m not required to?',
    a: 'Yes — and often you should. Voluntary filing makes sense if: taxes were withheld from your paycheck and you want the refund, you qualify for refundable credits like the Earned Income Tax Credit or Child Tax Credit, or you want to establish a filing history (useful for visa applications, mortgage approvals, and other financial processes).',
  },
  {
    q: 'What is "gross income" and what counts toward the threshold?',
    a: 'Gross income is all income you received before any deductions — wages, tips, freelance income, interest, dividends, rental income, and most other forms of income. It does not include gifts (generally), inheritances, or certain government benefits. Social Security benefits have their own rules and may or may not count depending on your total income.',
  },
  {
    q: 'I received money from my parents in Taiwan. Does that count as income?',
    a: 'Gifts from foreign individuals are generally not taxable income and do not count toward the filing threshold. However, if you received more than $100,000 in gifts from foreign individuals in a single year, you must file Form 3520 to report it — even though no tax is owed. This is a disclosure requirement, not a tax.',
  },
]

const RELATED = [
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: 'First-time filer complete guide',
    desc:  'You\'ve confirmed you need to file — now what? This guide walks through every step of your first U.S. tax return.',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Your filing requirements depend on your residency status. Determine whether you file Form 1040 or Form 1040-NR.',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Once you\'re filing, understanding credits and deductions helps you reduce what you owe.',
  },
]

export default function DoINeedToFilePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  const THRESHOLDS = [
    { status: 'Single',                          age: 'Under 65',         threshold: '$14,600' },
    { status: 'Single',                          age: '65 or older',      threshold: '$16,550' },
    { status: 'Married Filing Jointly',          age: 'Both under 65',    threshold: '$29,200' },
    { status: 'Married Filing Jointly',          age: 'One spouse 65+',   threshold: '$30,750' },
    { status: 'Married Filing Jointly',          age: 'Both 65+',         threshold: '$32,300' },
    { status: 'Married Filing Separately',       age: 'Any age',          threshold: '$5' },
    { status: 'Head of Household',               age: 'Under 65',         threshold: '$21,900' },
    { status: 'Head of Household',               age: '65 or older',      threshold: '$23,850' },
    { status: 'Qualifying Surviving Spouse',     age: 'Under 65',         threshold: '$29,200' },
    { status: 'Qualifying Surviving Spouse',     age: '65 or older',      threshold: '$30,750' },
  ]

  return (
    <Layout t={t} meta={{
      title: 'Do I Need to File a U.S. Tax Return? | AskLinTax',
      description: 'Find out if you\'re required to file a U.S. federal tax return. Includes 2025 income thresholds by filing status, special cases for students and new immigrants, and when to file even if you don\'t have to.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          You are generally required to file a U.S. federal tax return if your <strong>gross income</strong> for the year exceeds the threshold for your filing status. The threshold is based on the standard deduction, which changes slightly each year.
        </p>
        <p>
          But "required to file" and "should file" are two different things. Even if you're not required to file, you may want to — especially if taxes were withheld from your paycheck or if you qualify for refundable tax credits.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ Two questions to answer</div>
          <p><strong>1. Are you required to file?</strong> Check if your gross income exceeds the threshold for your filing status in the table below.</p>
          <p style={{ marginBottom: 0 }}><strong>2. Should you file anyway?</strong> If taxes were withheld from any paycheck or you qualify for refundable credits, the answer is almost always yes — even if your income is below the threshold.</p>
        </div>

        <h2>2025 filing thresholds by status</h2>
        <p>
          These are the gross income thresholds for Tax Year 2025 (the return you file in spring 2026). If your income exceeds the amount for your filing status, you must file.
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Filing status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Age</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>File if income exceeds</th>
              </tr>
            </thead>
            <tbody>
              {THRESHOLDS.map(({ status, age, threshold }, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{age}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '-8px' }}>
          Source: IRS Revenue Procedure 2024-40. Thresholds equal the standard deduction for each filing status and age combination.
          The $5 threshold for Married Filing Separately applies regardless of age.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Nonresident aliens: different rules apply</div>
          <p>If you are a nonresident alien (most F-1 students, J-1 visitors, and others who don't pass the Substantial Presence Test), these thresholds do not apply to you. Nonresident aliens file Form 1040-NR and may be required to file with much lower income amounts. F-1 students with no U.S. income must still file Form 8843 annually. See our <a href="/library/individual/tax-residency">Tax Residency guide</a> to determine which category applies to you.</p>
        </div>

        <h2>Special situations that always require filing</h2>
        <p>
          Regardless of your income level, you must file a tax return if any of these apply:
        </p>
        <ul>
          <li><strong>Self-employment income of $400 or more</strong> — even if it's your only income and it's below the standard threshold</li>
          <li><strong>You owe alternative minimum tax (AMT)</strong></li>
          <li><strong>You received advance premium tax credit payments</strong> (for health insurance purchased through the marketplace)</li>
          <li><strong>You have net earnings from a church or church-controlled organization of $108.28 or more</strong></li>
          <li><strong>You received wages of $108.28 or more from a church exempt from employer Social Security and Medicare taxes</strong></li>
        </ul>

        <h2>When you should file even if you're not required to</h2>
        <p>
          "Not required to file" doesn't mean "shouldn't file." These situations make voluntary filing worth your time:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', margin: '24px 0' }}>
          {[
            {
              icon: '💰',
              title: 'Taxes were withheld from your paycheck',
              desc: 'If your employer withheld federal income tax, the only way to get it back is to file a return. Many people with income below the threshold still get refunds this way.',
            },
            {
              icon: '👶',
              title: 'You qualify for refundable credits',
              desc: 'Credits like the Earned Income Tax Credit (EITC) and Additional Child Tax Credit are refundable — meaning you can receive money back even if you owe no taxes. You must file to claim them.',
            },
            {
              icon: '📋',
              title: 'You want to establish a filing history',
              desc: 'A consistent tax filing history is often required for mortgage applications, visa renewals, and green card applications. Filing voluntarily builds that record.',
            },
            {
              icon: '🏥',
              title: 'You want to contribute to an IRA',
              desc: 'To contribute to a Traditional or Roth IRA based on earned income, you need to have filed a tax return for the year. Filing opens up retirement saving options.',
            },
          ].map((card, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 18px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px', lineHeight: '1.35' }}>{card.title}</h4>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <h2>What counts as gross income?</h2>
        <p>
          Gross income is all income you received before any deductions or adjustments. For most people, this includes:
        </p>
        <ul>
          <li>Wages, salaries, and tips (from W-2s)</li>
          <li>Freelance, contractor, or self-employment income (from 1099s or without a form)</li>
          <li>Interest and dividends from bank accounts and investments</li>
          <li>Rental income</li>
          <li>Alimony received (for agreements made before 2019)</li>
          <li>Business income</li>
          <li>Capital gains from selling stocks, property, or crypto</li>
        </ul>
        <p>
          These generally do <strong>not</strong> count as gross income for filing threshold purposes:
        </p>
        <ul>
          <li>Gifts (but gifts over $100,000 from foreign individuals require Form 3520)</li>
          <li>Inheritances</li>
          <li>Child support received</li>
          <li>Most welfare and government assistance payments</li>
          <li>Qualified scholarships used for tuition and required fees (room and board portions are taxable)</li>
        </ul>

        <h2>What is a filing status and how do I know mine?</h2>
        <p>
          Your filing status determines your tax bracket, standard deduction, and which credits you qualify for. For most people, the determination is straightforward:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Filing status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Who qualifies</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Single', 'Unmarried, or legally separated/divorced as of December 31'],
                ['Married Filing Jointly', 'Married couples who file one return together — usually results in the lowest tax'],
                ['Married Filing Separately', 'Married couples who file separate returns — usually less advantageous, but sometimes required'],
                ['Head of Household', 'Unmarried, paid more than half the cost of keeping up a home, and had a qualifying dependent'],
                ['Qualifying Surviving Spouse', 'Widowed in the past 2 years with a dependent child — uses the same rates as Married Filing Jointly'],
              ].map(([status, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When in doubt, file</div>
          <p>The cost of filing when you didn't have to is minimal — a few hours of your time. The cost of not filing when you were required to can be significant penalties and interest. If you're unsure, file. And if taxes were withheld from any income you earned, always file — it's likely the only way to get that money back.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

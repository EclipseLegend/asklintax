import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '05',
  title:         'Am I a U.S. tax resident?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the two main tests (Green Card and Substantial Presence). Treaty elections, dual-status returns, and exempt individual categories require case-by-case analysis.',
  persona:       ['New immigrant', 'F-1 student', 'H-1B visa holder', 'J-1 visa holder', 'Anyone unsure of their filing status'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Use the flowchart below to determine your tax residency status for the current year. Your answer determines which tax form you file and what income you must report — get this right before doing anything else.',
}

const FAQS = [
  {
    q: 'I have a green card but I live outside the U.S. most of the year. Am I still a U.S. tax resident?',
    a: 'Yes. Green card holders are U.S. tax residents regardless of where they physically live. You are required to file a U.S. tax return and report worldwide income even if you spend most of the year outside the United States. The only way to end this obligation is to formally abandon your green card (Form I-407) or have it administratively revoked.',
  },
  {
    q: 'I\'m on an H-1B visa. Am I a resident alien?',
    a: 'Probably yes, if you\'ve been in the U.S. long enough. H-1B holders are not exempt individuals, so your days in the U.S. count toward the Substantial Presence Test immediately. If you\'ve been in the U.S. for more than roughly half the year and were also here in prior years, you likely pass the test and are a resident alien. Run the calculation with your actual days to confirm.',
  },
  {
    q: 'I\'m on an F-1 visa. Do my days in the U.S. count?',
    a: 'No — for your first 5 calendar years in F-1 status, your days in the U.S. do not count toward the Substantial Presence Test. You are an "exempt individual" during this period. This means most F-1 students file as nonresident aliens on Form 1040-NR. After your 5th calendar year, you lose exempt status and your days start counting.',
  },
  {
    q: 'I arrived in the U.S. in October. Can I still be a resident alien this year?',
    a: 'It depends on your prior years. If you were also in the U.S. in the two prior years, those days (weighted at 1/3 and 1/6) could push you over 183 combined. If this is your first year in the U.S., you likely won\'t pass the Substantial Presence Test. However, you may be able to elect to be treated as a resident alien for part of the year if you meet certain conditions — this is called the "first-year choice" election.',
  },
  {
    q: 'What happens if I\'m a resident alien for part of the year and nonresident for part?',
    a: 'This is called a "dual-status" year. It typically happens in your year of arrival or year of departure. A dual-status return is more complex: you file Form 1040 for the resident period and attach Form 1040-NR for the nonresident period. Dual-status filers face certain restrictions — for example, you generally cannot file jointly with a spouse or claim the standard deduction for the nonresident period. Professional help is strongly recommended.',
  },
  {
    q: 'I passed the Substantial Presence Test but I have closer ties to another country. Can I be treated as a nonresident?',
    a: 'Possibly. There is a "closer connection" exception that allows you to be treated as a nonresident alien even if you pass the Substantial Presence Test — but only if you were present fewer than 183 days in the current year AND you can demonstrate a closer connection to a foreign country (where your family lives, where your bank accounts are, where you vote, etc.). You make this claim on Form 8840.',
  },
  {
    q: 'Does my residency status affect my spouse and children?',
    a: 'Yes, significantly. If you are a resident alien and your spouse is a nonresident alien, you have a choice: file separately (you as resident, spouse as nonresident) or make an election to treat your spouse as a resident alien and file jointly. Filing jointly can lower your overall tax bill but means your spouse\'s worldwide income is also subject to U.S. tax. This election is permanent until revoked.',
  },
]

const RELATED = [
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: 'New to the U.S.? A complete tax guide for new immigrants',
    desc:  'Once you know your residency status, this guide walks through everything else you need to know for your first U.S. tax year.',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: 'First-time filer complete guide',
    desc:  'A step-by-step walkthrough of your first U.S. tax return — forms, documents, deadlines, and common mistakes.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'If you file as a nonresident alien without a Social Security Number, you\'ll need an ITIN.',
  },
]

export default function TaxResidencyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Am I a U.S. Tax Resident? Substantial Presence Test Explained | AskLinTax',
      description: 'Determine your U.S. tax residency status — resident alien or nonresident alien — using the Green Card Test and Substantial Presence Test. Plain-language guide for new immigrants.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Why this question matters so much</h2>
        <p>
          Before you can file a U.S. tax return, you need to know one thing: are you a <strong>resident alien</strong> or a <strong>nonresident alien</strong> for tax purposes?
        </p>
        <p>
          This single determination affects everything else:
        </p>
        <ul>
          <li>Which tax form you file (Form 1040 vs. Form 1040-NR)</li>
          <li>What income you must report (worldwide vs. U.S.-source only)</li>
          <li>Whether you can claim the standard deduction</li>
          <li>Which tax credits you can access</li>
          <li>Whether you can file jointly with a spouse</li>
        </ul>
        <p>
          Getting this wrong — especially filing as a resident when you should be a nonresident, or vice versa — is one of the most consequential errors a new immigrant can make. It affects every other part of your return.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Tax residency ≠ immigration residency</div>
          <p>These are completely separate concepts. You can be a legal permanent resident (green card holder) for immigration purposes and still be treated differently for tax purposes in your first year. Conversely, you can be on a temporary visa and be a full resident alien for tax purposes. The IRS makes its own determination based on physical presence and status — not your visa type.</p>
        </div>

        <h2>The two tests — and which applies to you</h2>
        <p>
          The IRS uses two tests to determine if you are a resident alien. If you meet <em>either</em> test, you are a resident alien.
        </p>

        <h3>Test 1: The Green Card Test</h3>
        <p>
          Simple: if you were a lawful permanent resident (green card holder) at any time during the tax year, you are a resident alien for that entire year.
        </p>
        <p>
          There are no day-count calculations. No exceptions based on where you lived. If you held a green card, you're in — for the entire year, even if you got it on December 30th.
        </p>

        <h3>Test 2: The Substantial Presence Test</h3>
        <p>
          If you don't have a green card, the IRS counts how many days you were physically in the U.S. over a three-year period using this formula:
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '24px 0' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: 'var(--navy)', lineHeight: '2' }}>
            <div><strong>Days in current year</strong> × 1 (all days count)</div>
            <div><strong>Days in year −1</strong> × 1/3</div>
            <div><strong>Days in year −2</strong> × 1/6</div>
            <div style={{ borderTop: '2px solid var(--border)', marginTop: '10px', paddingTop: '10px' }}>
              <strong>Total ≥ 183</strong> AND <strong>at least 31 days in current year</strong>
            </div>
          </div>
          <p style={{ marginTop: '14px', fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
            If both conditions are met → you are a <strong style={{ color: 'var(--navy)' }}>resident alien</strong> for the current year.
          </p>
        </div>

        <h3>A worked example</h3>
        <p>Let's say you arrived on an H-1B visa and were present in the U.S. as follows:</p>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Year</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Days present</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Multiplier</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Weighted days</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Current year (2025)', '210 days', '× 1', '210'],
                ['Prior year (2024)', '180 days', '× 1/3', '60'],
                ['Year before (2023)', '120 days', '× 1/6', '20'],
              ].map(([year, days, mult, weighted], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{year}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{days}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{mult}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{weighted}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--navy)' }}>Total</td>
                <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--green)', fontSize: '17px' }}>290 ≥ 183 ✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Result: <strong>Resident alien</strong> for 2025. Files Form 1040, reports worldwide income.</p>

        <h2>Exempt individuals — days that don't count</h2>
        <p>
          Not all days in the U.S. count toward the Substantial Presence Test. If you are an "exempt individual," your days in the U.S. during that status are excluded from the count.
        </p>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Visa type</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Exempt period</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['F-1 student', 'First 5 calendar years in F-1 status', 'After year 5, days start counting normally'],
                ['J-1 student', 'First 5 calendar years in J-1 status', 'Same as F-1'],
                ['J-1 non-student (teacher, researcher)', 'First 2 calendar years in J-1 status', 'Shorter exemption period'],
                ['Diplomat / government official (A or G visa)', 'Entire period of official status', 'Full exemption while on official assignment'],
                ['Medical condition', 'Days unable to leave due to medical emergency', 'Must have intended to leave; file Form 8843'],
              ].map(([visa, period, notes], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{visa}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{period}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ "Exempt individual" ≠ exempt from taxes</div>
          <p>Being an exempt individual means your days don't count toward the Substantial Presence Test. It does NOT mean you're exempt from paying U.S. taxes. Nonresident aliens still owe U.S. tax on U.S.-source income and must file Form 1040-NR if they have U.S. income above the filing threshold.</p>
        </div>

        <h2>Quick determination flowchart</h2>

        <div style={{ border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden', margin: '24px 0' }}>
          {[
            { q: 'Did you hold a green card at any point this year?', yes: 'Resident alien → File Form 1040', no: null, yesColor: 'var(--green)' },
            { q: 'Are you an exempt individual (F-1, J-1, diplomat, etc.)?', yes: 'Nonresident alien → File Form 1040-NR', no: null, yesColor: 'var(--blue)' },
            { q: 'Do you meet the Substantial Presence Test (≥183 weighted days, ≥31 days this year)?', yes: 'Resident alien → File Form 1040', no: 'Nonresident alien → File Form 1040-NR', yesColor: 'var(--green)' },
          ].map((step, i) => (
            <div key={i} style={{ padding: '18px 22px', borderBottom: i < 2 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Step {i + 1}</div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--navy)', marginBottom: '12px' }}>{step.q}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ background: step.yesColor + '18', border: `1px solid ${step.yesColor}40`, borderRadius: '8px', padding: '8px 14px', fontSize: '14px' }}>
                  <strong style={{ color: step.yesColor }}>YES →</strong> <span style={{ color: 'var(--mid)' }}>{step.yes}</span>
                </div>
                {step.no && (
                  <div style={{ background: 'rgba(156,163,175,.12)', border: '1px solid rgba(156,163,175,.3)', borderRadius: '8px', padding: '8px 14px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--muted)' }}>NO →</strong> <span style={{ color: 'var(--mid)' }}>{step.no}</span>
                  </div>
                )}
                {!step.no && i < 2 && (
                  <div style={{ background: 'rgba(156,163,175,.12)', border: '1px solid rgba(156,163,175,.3)', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', color: 'var(--muted)' }}>
                    <strong>NO →</strong> Continue to Step {i + 2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2>What each status means for your taxes</h2>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Topic</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Resident alien</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Nonresident alien</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Tax form', 'Form 1040', 'Form 1040-NR'],
                ['Income taxed', 'Worldwide income', 'U.S.-source income only'],
                ['Standard deduction', 'Yes ($15,000 single in 2025)', 'No (itemize only)'],
                ['Joint filing with spouse', 'Yes', 'Generally no (unless election made)'],
                ['Most tax credits', 'Yes (Child Tax Credit, EITC, etc.)', 'Limited (some credits not available)'],
                ['Tax treaties', 'May still apply', 'May reduce or eliminate U.S. tax on certain income'],
                ['FBAR requirement', 'Yes (if foreign accounts > $10,000)', 'Yes (if foreign accounts > $10,000)'],
              ].map(([topic, resident, nonresident], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{topic}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{resident}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{nonresident}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Special situations</h2>

        <h3>The "closer connection" exception</h3>
        <p>
          If you pass the Substantial Presence Test but were present fewer than 183 days in the <em>current year</em>, you may still be treated as a nonresident alien if you can show a "closer connection" to a foreign country. You prove this by filing Form 8840 and demonstrating that your primary home, family, bank accounts, and other ties are in another country. This exception is not available if you have applied for a green card.
        </p>

        <h3>The first-year choice election</h3>
        <p>
          If you arrive in the U.S. and don't quite meet the Substantial Presence Test in your first year, but you do meet it the following year, you may be able to elect to be treated as a resident alien for the last part of your first year. This is called the "first-year choice" election and requires meeting specific conditions. It can simplify your filing situation and unlock additional deductions.
        </p>

        <h3>Dual-status year</h3>
        <p>
          In the year you become a U.S. tax resident (or the year you leave), you may be a nonresident for part of the year and a resident for the rest. This is called a "dual-status" year and requires a more complex return — generally a Form 1040 with a 1040-NR attachment. Dual-status filers cannot use the standard deduction or file jointly. Professional help is strongly recommended for dual-status returns.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>If any of these apply to you, consult a CPA before filing: your year of arrival or departure, dual-status year, you qualify for a closer connection exception, you want to make a first-year choice election, or your spouse has a different residency status. These situations involve elections that are difficult or impossible to undo after filing.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

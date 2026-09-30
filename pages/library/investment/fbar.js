import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id: '20',
  title: 'FBAR: do I need to report my foreign bank accounts?',
  category: 'Investments & Foreign Accounts',
  categoryHref: '/library/investments',
  userEmotion: 'learning',
  difficulty: 'Intermediate',
  readTime: '6 min read',
  cpaReviewed: true,
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'FBAR rules are well-established under the Bank Secrecy Act. FATCA (Form 8938) is a separate but related requirement with different thresholds — both may apply simultaneously.',
  persona: ['New immigrant with accounts in Taiwan or China', 'Green card holder', 'U.S. citizen with foreign accounts', 'Anyone with bank accounts outside the United States'],
  relatedJourney: ['New to the U.S.', 'Cross-border finances'],
  actionRequired: 'Check whether your foreign financial accounts exceeded $10,000 in combined value at any point during the calendar year. If yes, you must file FinCEN Form 114 (FBAR) by April 15, with an automatic extension to October 15. File at BSA E-Filing System (bsaefiling.fincen.treas.gov) — it is separate from your tax return.',
}

const FAQS = [
  { q: 'Do I need to file an FBAR if my foreign accounts earned no interest?', a: 'Yes. The FBAR filing requirement is triggered by the account balance alone — not by any income generated. If your combined foreign accounts exceeded $10,000 at any point during the year, you must file regardless of whether the accounts generated any income or return.' },
  { q: 'Is the $10,000 threshold per account or across all accounts combined?', a: 'Combined. You must add the maximum balances of all foreign financial accounts you own or have signature authority over, and if the combined total exceeded $10,000 at any single point during the year, all accounts must be reported — even accounts that individually never exceeded $10,000.' },
  { q: 'My parents in Taiwan put my name on their bank account. Do I have to report it?', a: 'Yes, if you have signature authority or financial interest in the account. Being a named account holder — even as a convenience signer — typically triggers FBAR reporting if the combined threshold is met. You should report the account on your FBAR even if you never used or benefited from it.' },
  { q: 'What is the penalty for not filing FBAR?', a: 'Penalties can be severe. For non-willful violations (you didn\'t know you had to file): up to $10,000 per violation per year, though the IRS often assesses less. For willful violations (you knew and didn\'t file): up to the greater of $100,000 or 50% of the account balance per violation per year. The IRS has Voluntary Disclosure programs for late filers that can significantly reduce penalties — consult a tax professional if you have unfiled FBARs.' },
  { q: 'How is FBAR different from FATCA (Form 8938)?', a: 'Both require reporting foreign accounts, but they\'re different requirements with different thresholds. FBAR (FinCEN 114): $10,000 threshold, filed separately with FinCEN (not IRS). FATCA/Form 8938: higher thresholds ($50,000 for single filers, $100,000 for MFJ), filed with your tax return with the IRS. Many people with foreign accounts must file both. They are not interchangeable — filing one does not satisfy the other.' },
  { q: 'Do I have to report my WeChat Pay or Alipay balances?', a: 'The IRS has provided limited specific guidance on digital payment accounts like WeChat Pay and Alipay. The general principle is that if these are considered "financial accounts" under foreign financial institutions, significant balances may be reportable. Given the evolving guidance, if you maintain substantial balances in these platforms, consult a CPA familiar with international tax reporting.' },
  { q: 'I missed filing FBAR in prior years. What should I do?', a: 'Don\'t ignore it. The IRS has two main programs for late FBAR filers: the Streamlined Filing Procedures (for non-willful violations — reduced penalties or penalty-free for offshore residents) and the Delinquent FBAR Submission Procedures (for late filers with no other issues). Voluntarily coming forward almost always results in better outcomes than being caught. Consult a tax attorney or CPA before filing late FBARs.' },
]

const RELATED = [
  { href: '/library/individual/new-immigrant', cat: 'Individuals & Families', title: 'New immigrant complete tax guide', desc: 'FBAR is one of the most commonly missed obligations for new immigrants from China and Taiwan.' },
  { href: '/library/investments/crypto-tax', cat: 'Investments & Crypto', title: 'Crypto taxes explained', desc: 'Crypto held on foreign exchanges may also be subject to FBAR reporting. Understand both obligations.' },
  { href: '/library/individual/tax-residency', cat: 'Individuals & Families', title: 'Am I a U.S. tax resident?', desc: 'FBAR applies to U.S. persons — citizens, green card holders, and resident aliens who pass the Substantial Presence Test.' },
]

export default function FBARPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{ title: 'FBAR: Do I Need to Report My Foreign Bank Accounts? | AskLinTax', description: 'Everything you need to know about FBAR (Foreign Bank Account Report) — the $10,000 threshold, who must file, how to file FinCEN Form 114, penalties for non-filing, and how FBAR differs from FATCA.' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is FBAR?</h2>
        <p>FBAR stands for <strong>Foreign Bank Account Report</strong> — officially FinCEN Form 114. It's a disclosure requirement under the Bank Secrecy Act that requires U.S. persons to report foreign financial accounts if the combined maximum value exceeded <strong>$10,000 at any point during the calendar year</strong>.</p>
        <p>FBAR is not a tax — you don't pay anything when you file it. It's a disclosure, telling the U.S. government that you have accounts abroad. But the penalties for not filing are severe, and many Chinese immigrant families with accounts in Taiwan or China are unaware this requirement applies to them.</p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ This surprises most new immigrants from China and Taiwan</div>
          <p>If you moved to the U.S. and still have bank accounts, investment accounts, or other financial accounts in Taiwan or China — and those accounts combined exceeded $10,000 at any point in the year — you are required to file an FBAR. This applies even if the accounts generated no income and even if you owe no U.S. tax on them.</p>
        </div>

        <h2>Who must file FBAR?</h2>
        <p>A "U.S. person" with foreign financial accounts exceeding the threshold must file. U.S. persons include:</p>
        <ul>
          <li>U.S. citizens (including dual citizens)</li>
          <li>Green card holders (lawful permanent residents)</li>
          <li>Resident aliens (those who pass the Substantial Presence Test)</li>
          <li>U.S. corporations, partnerships, LLCs, trusts, and estates</li>
        </ul>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Your status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Must file FBAR?</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Note</th>
            </tr></thead>
            <tbody>{[
              ['U.S. citizen', '✅ Yes (if threshold met)', 'Regardless of where you live'],
              ['Green card holder', '✅ Yes (if threshold met)', 'Even if you spent most of the year abroad'],
              ['Resident alien (passed SPT)', '✅ Yes (if threshold met)', 'Includes most H-1B holders after enough time in U.S.'],
              ['Nonresident alien (F-1 first 5 years)', '❌ Generally no', 'Not a U.S. person for FBAR purposes'],
              ['J-1 visitor (first 2 years)', '❌ Generally no', 'Not a U.S. person for FBAR purposes'],
            ].map(([status, must, note], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: must.startsWith('✅') ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{must}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>The $10,000 threshold: how it works</h2>
        <p>The threshold is <strong>$10,000 combined across all foreign accounts</strong> at any single point during the year — not the year-end balance, not the average balance.</p>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px', margin: '24px 0' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '14px' }}>Examples:</div>
          {[
            { example: 'Account A (Taiwan bank): max balance $8,000. Account B (China brokerage): max balance $4,000. Combined max: $12,000.', result: '✅ Must file FBAR — reports BOTH accounts', color: 'var(--red)' },
            { example: 'Single Taiwan bank account. Max balance at any point: $9,500.', result: '❌ No FBAR required — never exceeded $10,000', color: 'var(--green)' },
            { example: 'Account balance was $12,000 in January, then fell to $3,000 for the rest of the year.', result: '✅ Must file FBAR — $12,000 exceeded threshold in January', color: 'var(--red)' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '14px' : '0', padding: '14px 16px', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border-l)' }}>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '8px', lineHeight: '1.65' }}>{item.example}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>{item.result}</div>
            </div>
          ))}
        </div>

        <h2>What accounts must be reported?</h2>
        <p>FBAR covers a broad range of foreign financial accounts:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '24px 0' }}>
          {[
            { title: 'Must report ✅', color: 'var(--red)', items: ['Bank accounts (savings, checking, fixed deposits)', 'Brokerage and investment accounts', 'Mutual fund accounts', 'Pension and retirement accounts', 'Life insurance policies with cash value', 'Accounts where you have signature authority (even if not your money)'] },
            { title: 'Generally not reported ❌', color: 'var(--green)', items: ['Real estate held directly (not through a foreign entity)', 'Precious metals held directly', 'Foreign currency held personally (not in an account)', 'Social insurance programs (like Taiwan\'s labor insurance)', 'Unsecured loans to foreign parties'] },
          ].map((section, i) => (
            <div key={i} style={{ background: i === 0 ? 'var(--red-soft)' : 'var(--green-soft)', border: `1.5px solid ${section.color}25`, borderRadius: '12px', padding: '18px 16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: section.color, marginBottom: '12px' }}>{section.title}</h4>
              {section.items.map((item, j) => (
                <div key={j} style={{ fontSize: '14px', color: 'var(--mid)', padding: '4px 0', display: 'flex', gap: '8px' }}>
                  <span style={{ color: section.color, flexShrink: 0 }}>·</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <h2>How to file FBAR</h2>
        <ol>
          <li><strong>File electronically</strong> at the BSA E-Filing System: <strong>bsaefiling.fincen.treas.gov</strong>. This is separate from IRS.gov — FBAR is not filed with your tax return.</li>
          <li><strong>Deadline:</strong> April 15, with an <strong>automatic extension to October 15</strong>. No need to request the extension — it's automatic.</li>
          <li><strong>What you report:</strong> For each foreign account — the bank name and address, account number, account type, maximum value during the year (converted to USD using the December 31 exchange rate or Treasury rate).</li>
          <li><strong>No tax payment:</strong> FBAR is disclosure only. You pay nothing when you file it.</li>
        </ol>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>FBAR (FinCEN 114)</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>FATCA (Form 8938)</th>
            </tr></thead>
            <tbody>{[
              ['Filed with', 'FinCEN (bsaefiling.fincen.treas.gov)', 'IRS (with your tax return)'],
              ['Threshold — Single', '$10,000 combined at any point', '$50,000 year-end or $75,000 at any point'],
              ['Threshold — MFJ', '$10,000 combined at any point', '$100,000 year-end or $150,000 at any point'],
              ['Deadline', 'April 15 (auto-extended to Oct 15)', 'Tax return due date (April 15 + extensions)'],
              ['If both apply', 'File FBAR', 'Also file Form 8938 — they are not interchangeable'],
            ].map(([feat, fbar, fatca], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{fbar}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{fatca}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ If you have missed FBAR filings from prior years</div>
          <p>Don't ignore it. The IRS Streamlined Filing Procedures allow non-willful late filers to come forward voluntarily with significantly reduced penalties — sometimes penalty-free for taxpayers living abroad. Voluntarily disclosing almost always produces better outcomes than being discovered. Consult a tax attorney or CPA experienced in international tax compliance before filing late FBARs.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

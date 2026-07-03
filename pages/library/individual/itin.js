import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id: '18',
  title: 'What is an ITIN and how do I apply?',
  category: 'Individuals & Families',
  categoryHref: '/library/individual',
  userEmotion: 'learning',
  difficulty: 'Beginner',
  readTime: '5 min read',
  cpaReviewed: true,
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'ITIN application process is well-established. Processing times vary — apply early. Certified Acceptance Agents can verify documents without sending originals to the IRS.',
  persona: ['F-1 student', 'Dependent spouse without work authorization', 'Non-resident alien with U.S. income', 'Anyone without SSN eligibility who has U.S. tax obligations'],
  relatedJourney: ['New to the U.S.', 'First-time filer without SSN'],
  actionRequired: 'If you need to file a U.S. tax return and are not eligible for an SSN, apply for an ITIN using Form W-7. Submit with your tax return and original identity documents (or certified copies through a CAA). Allow 7–11 weeks for processing.',
}

const FAQS = [
  { q: 'Can I use an ITIN instead of an SSN for work?', a: 'No. An ITIN is for tax purposes only. It cannot be used for employment — that requires an SSN with work authorization. An ITIN does not confer work authorization, Social Security benefits, or eligibility for most federal programs. Using an ITIN for employment purposes is not permitted.' },
  { q: 'Does having an ITIN affect my immigration status?', a: 'No. An ITIN does not affect, alter, or improve your immigration status. The IRS issues ITINs solely to ensure individuals can fulfill tax obligations regardless of immigration status. ITIN information is not shared with immigration authorities (USCIS or ICE) for immigration enforcement purposes.' },
  { q: 'My ITIN hasn\'t been used in several years. Is it still valid?', a: 'ITINs that have not been used on a federal tax return in the last 3 consecutive years expire automatically. If your ITIN expired, you must renew it before you can file. Submit a renewal application using Form W-7 (check the "Renew an Existing ITIN" box) with valid identity documentation. You do not need to submit a tax return with a renewal application.' },
  { q: 'Can I get a refund with an ITIN?', a: 'Yes. You can receive a federal tax refund with an ITIN. However, ITIN holders are not eligible for the Earned Income Tax Credit (EITC) or the Child Tax Credit (which requires a qualifying child with an SSN). Some other credits — like the Child and Dependent Care Credit — may be available depending on your situation.' },
  { q: 'What is a Certified Acceptance Agent (CAA)?', a: 'A CAA is an individual or business authorized by the IRS to help taxpayers complete the ITIN application and verify identity documents. The main advantage: a CAA can certify copies of your documents instead of you mailing original documents to the IRS — much safer. Many accounting firms, tax professionals, and some university international student offices are CAAs. Find one at IRS.gov.' },
  { q: 'I have an ITIN but I recently got a Social Security Number. What do I do?', a: 'Once you receive an SSN, you should use it for all tax purposes going forward. Notify the IRS that you received an SSN and want your ITIN rescinded. Write a letter to the IRS including your name, ITIN, SSN, and a statement explaining that you received an SSN. Prior year returns filed with your ITIN remain valid.' },
  { q: 'Can my spouse or child get an ITIN as a dependent?', a: 'Yes, if they are listed as dependents on your U.S. tax return and are not eligible for an SSN. Dependents and spouses of non-resident aliens can apply for ITINs. Include a complete Form W-7 for each person needing an ITIN, along with identity and foreign status documentation for each.' },
]

const RELATED = [
  { href: '/library/individual/new-immigrant', cat: 'Individuals & Families', title: 'New immigrant complete tax guide', desc: 'ITINs are most commonly needed by new immigrants who aren\'t yet eligible for an SSN.' },
  { href: '/library/individual/tax-residency', cat: 'Individuals & Families', title: 'Am I a U.S. tax resident?', desc: 'Your tax residency status determines which form you file — and whether you need an ITIN or an SSN.' },
  { href: '/library/individual/first-time-filer', cat: 'Individuals & Families', title: 'First-time filer complete guide', desc: 'Once you have your ITIN, this guide walks through filing your first U.S. tax return.' },
]

const ITIN_STEPS = [
  { num: '01', title: 'Complete Form W-7', detail: 'Download Form W-7 from IRS.gov. Fill out all required fields including your legal name, foreign address, date and country of birth, and the reason you\'re applying. The most common reason for Chinese immigrants: "Nonresident alien required to get an ITIN to claim tax treaty benefit" or "Resident alien filing a U.S. federal tax return."' },
  { num: '02', title: 'Prepare your tax return (if applicable)', detail: 'Most applicants must attach a completed tax return to Form W-7 as proof that an ITIN is needed. Exceptions: renewing an existing ITIN, or certain dependency situations. Leave the SSN/ITIN field blank on your return — this will be filled in once your ITIN is issued.' },
  { num: '03', title: 'Gather identity documents', detail: 'You must prove both identity and foreign status. A valid passport satisfies both requirements by itself — it\'s the simplest option. If you don\'t have a passport, you\'ll need two documents: one for identity (national ID, driver\'s license) and one for foreign status (visa, foreign birth certificate). All documents must be current (not expired).' },
  { num: '04', title: 'Choose your submission method', detail: 'Option A: Mail originals to the IRS (risky — originals could be delayed or lost). Option B: Visit an IRS Taxpayer Assistance Center in person. Option C: Use a Certified Acceptance Agent (CAA) — they verify your documents on-site and certify copies so you never mail originals. Strongly recommended for valuable documents.' },
  { num: '05', title: 'Submit and wait', detail: 'Processing time is currently 7–11 weeks. Once your ITIN is issued, you\'ll receive a letter (CP565) with your ITIN. If you submitted a tax return with your application, it will be processed after your ITIN is issued.' },
]

export default function ITINPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{ title: 'What Is an ITIN and How Do I Apply? | AskLinTax', description: 'A complete guide to ITINs (Individual Taxpayer Identification Numbers) — who needs one, how to apply with Form W-7, processing times, and what you can and cannot do with an ITIN.' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is an ITIN?</h2>
        <p>An ITIN — Individual Taxpayer Identification Number — is a tax processing number issued by the IRS to people who are required to have a U.S. taxpayer identification number but are not eligible for a Social Security Number.</p>
        <p>ITINs are <strong>for tax purposes only</strong>. They do not confer work authorization, immigration status, or eligibility for Social Security benefits. They exist so the IRS can process tax returns and payments from people who have U.S. tax obligations but cannot get an SSN.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          <div style={{ background: 'var(--green-soft)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--green)', marginBottom: '12px' }}>✅ Who needs an ITIN</h4>
            {['Non-resident aliens with U.S. income required to file', 'F-1 or J-1 students with non-wage U.S. income', 'Resident aliens not eligible for SSN', 'Dependent spouses of U.S. citizens/residents', 'Dependent children without SSN listed on a U.S. return'].map((item, i) => (
              <div key={i} style={{ fontSize: '14.5px', color: 'var(--mid)', padding: '5px 0', display: 'flex', gap: '8px' }}><span style={{ color: 'var(--green)', flexShrink: 0 }}>·</span>{item}</div>
            ))}
          </div>
          <div style={{ background: 'var(--red-soft)', border: '1.5px solid rgba(220,38,38,.2)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--red)', marginBottom: '12px' }}>❌ What an ITIN cannot do</h4>
            {['Authorize you to work in the U.S.', 'Qualify you for Social Security benefits', 'Make you eligible for the Earned Income Tax Credit', 'Allow you to claim the Child Tax Credit for a child', 'Affect or improve your immigration status'].map((item, i) => (
              <div key={i} style={{ fontSize: '14.5px', color: 'var(--mid)', padding: '5px 0', display: 'flex', gap: '8px' }}><span style={{ color: 'var(--red)', flexShrink: 0 }}>·</span>{item}</div>
            ))}
          </div>
        </div>

        <h2>How to apply: 5 steps</h2>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden', margin: '24px 0' }}>
          {ITIN_STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < 4 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px', borderRight: '1px solid var(--border-l)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{s.num}</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Use a Certified Acceptance Agent — don't mail your passport</div>
          <p>A CAA can verify your original documents in person and certify copies for the IRS — so you never have to mail your passport or national ID. This is strongly recommended. Find a CAA at IRS.gov/itin. Many university international student offices are CAAs and provide this service free to students.</p>
        </div>

        <h2>ITIN vs. SSN: key differences</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Feature</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>SSN</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>ITIN</th>
            </tr></thead>
            <tbody>{[
              ['Format', '###-##-####', '9##-##-####  (starts with 9)'],
              ['Who issues it', 'Social Security Administration', 'IRS only'],
              ['Work authorization', '✅ Yes (with eligible status)', '❌ No'],
              ['File tax returns', '✅ Yes', '✅ Yes'],
              ['Receive tax refund', '✅ Yes', '✅ Yes'],
              ['Earned Income Tax Credit', '✅ Yes (if eligible)', '❌ No'],
              ['Child Tax Credit', '✅ Yes (child needs SSN)', '❌ No'],
              ['Open bank account', '✅ Yes', '⚠️ Depends on bank'],
              ['Expiration', 'Does not expire', 'Expires if unused 3+ years'],
            ].map(([feat, ssn, itin], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{ssn}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{itin}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ ITINs expire if unused</div>
          <p>An ITIN that hasn't appeared on a federal tax return for 3 consecutive years expires automatically. If you haven't filed in a few years and need to file now, check whether your ITIN is still valid. Renew it using Form W-7 before filing — you cannot use an expired ITIN.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

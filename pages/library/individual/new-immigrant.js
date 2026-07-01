import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '04',
  title:         'New to the U.S.? A complete tax guide for new immigrants',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'General principles apply to most new immigrants; dual-status years and treaty benefits require case-by-case analysis',
  persona:       ['New immigrant', 'F-1 student', 'H-1B visa holder', 'Green card holder (first year)', 'New U.S. resident'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Determine your tax residency status for the current year using the Substantial Presence Test — this is the single most important first step. Your status determines which forms you file and what income you must report.',
}

const FAQS = [
  {
    q: 'I just arrived in the U.S. this year. Do I need to file a tax return?',
    a: 'It depends on two things: how long you\'ve been in the U.S. (which determines your residency status) and how much income you earned. If you passed the Substantial Presence Test and earned more than the standard deduction ($14,600 for single filers in 2024), you generally need to file. Even if you don\'t owe taxes, filing can result in a refund of withheld taxes.',
  },
  {
    q: 'What\'s the difference between a resident alien and a nonresident alien for tax purposes?',
    a: 'A resident alien is taxed on worldwide income — everything you earned anywhere in the world goes on your U.S. tax return. A nonresident alien is only taxed on U.S.-source income. The distinction is determined by the Green Card Test (do you have a green card?) or the Substantial Presence Test (have you been in the U.S. long enough?). Most new immigrants who have been in the U.S. for most of the year are resident aliens.',
  },
  {
    q: 'I\'m on an F-1 student visa. Am I a resident or nonresident for taxes?',
    a: 'F-1 students are "exempt individuals" for the Substantial Presence Test — your days in the U.S. on an F-1 visa don\'t count toward the 183-day threshold for the first 5 calendar years. This means most F-1 students file as nonresident aliens using Form 1040-NR, not the standard Form 1040. After your 5th year, you may become a resident alien for tax purposes.',
  },
  {
    q: 'Do I need to report my income from Taiwan/China on my U.S. tax return?',
    a: 'If you are a resident alien (including a green card holder or someone who passes the Substantial Presence Test), yes — you must report worldwide income, including income earned in Taiwan or China before moving to the U.S. during your first year. The U.S. has tax treaties with some countries that may affect how this income is taxed, and foreign tax credits may be available to prevent double taxation.',
  },
  {
    q: 'What is a dual-status return and when do I need to file one?',
    a: 'A dual-status return applies to the year you become a U.S. tax resident. For example, if you arrived in the U.S. in June and became a resident alien partway through the year, you were a nonresident alien for the first part and a resident alien for the second part. Dual-status returns are more complex and almost always require a tax professional.',
  },
  {
    q: 'I don\'t have a Social Security Number yet. Can I still file?',
    a: 'Yes. If you\'re not eligible for a Social Security Number, you can apply for an ITIN (Individual Taxpayer Identification Number) by submitting Form W-7 along with your tax return. An ITIN allows you to file your taxes, receive refunds, and claim certain tax credits — even without a Social Security Number.',
  },
  {
    q: 'My parents in Taiwan sent me money to help with expenses. Is that taxable income?',
    a: 'Gifts from foreign individuals are not taxable income in the U.S. However, if you received more than $100,000 in gifts from foreign individuals in a single year, you must report it on Form 3520 — even though you don\'t owe tax on it. This is a reporting requirement, not a tax.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident? (Substantial Presence Test explained)',
    desc:  'Your tax residency status determines everything — which forms you file, what income you report, and what deductions you can claim.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'If you don\'t have a Social Security Number, you\'ll need an ITIN to file taxes and receive refunds.',
  },
  {
    href: '/library/investments/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'If you have more than $10,000 in foreign accounts at any point in the year, you\'re required to file an FBAR — even if you owe no tax.',
  },
]

export default function NewImmigrantPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'New Immigrant Tax Guide: Everything You Need to Know | AskLinTax',
      description: 'A complete U.S. tax guide for new immigrants and first-year residents. Covers residency status, what income to report, ITIN, FBAR, and your first tax return.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Your first U.S. tax year doesn't have to be confusing</h2>
        <p>
          Moving to the United States means navigating a new tax system — one that works very differently from Taiwan, China, or most other countries. The good news is that the core concepts are learnable, and once you understand the fundamentals, most of the complexity resolves itself.
        </p>
        <p>
          This guide walks you through the most important things every new immigrant needs to know about U.S. taxes — in the order that actually matters.
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ The single most important first step</div>
          <p>Before anything else, you need to determine your <strong>tax residency status</strong>. This determines which tax forms you file, what income you must report, and what deductions and credits you can claim. Everything else in this guide flows from this one determination.</p>
        </div>

        <h2>Step 1: Determine your tax residency status</h2>
        <p>
          The U.S. taxes people differently based on whether they are a <strong>resident alien</strong> or a <strong>nonresident alien</strong>. Despite the names, this has nothing to do with your immigration status — it's purely a tax classification.
        </p>

        <h3>Resident alien</h3>
        <p>
          If you are a resident alien, the U.S. taxes you on your <strong>worldwide income</strong> — everything you earned anywhere in the world. You file using Form 1040, the same form U.S. citizens use.
        </p>
        <p>You are a resident alien if either of these is true:</p>
        <ul>
          <li>You have a <strong>green card</strong> (Lawful Permanent Resident status), or</li>
          <li>You pass the <strong>Substantial Presence Test</strong> (see below)</li>
        </ul>

        <h3>Nonresident alien</h3>
        <p>
          If you are a nonresident alien, the U.S. only taxes your <strong>U.S.-source income</strong>. You file using Form 1040-NR, which is a different, more limited return.
        </p>

        <h3>The Substantial Presence Test</h3>
        <p>
          If you don't have a green card, the IRS uses the Substantial Presence Test to determine your status. The test counts the days you were physically present in the U.S.:
        </p>
        <ul>
          <li>All days present in the <strong>current year</strong>, plus</li>
          <li>1/3 of days present in the <strong>prior year</strong>, plus</li>
          <li>1/6 of days present in the <strong>year before that</strong></li>
        </ul>
        <p>
          If this total equals <strong>183 or more</strong>, and you were present at least 31 days in the current year, you are a resident alien.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Important exception: F-1 and J-1 students</div>
          <p>F-1 and J-1 visa holders are "exempt individuals" — their days in the U.S. on those visas don't count toward the Substantial Presence Test for the first 5 calendar years (F-1) or 2 calendar years (J-1). Most international students file as nonresident aliens and use Form 1040-NR.</p>
        </div>

        <h2>Step 2: Understand what income you must report</h2>

        <h3>If you are a resident alien</h3>
        <p>
          You must report <strong>all income from all sources worldwide</strong>. This includes:
        </p>
        <ul>
          <li>Wages and salary from U.S. employers (reported on W-2)</li>
          <li>Freelance or self-employment income</li>
          <li>Investment income (dividends, capital gains)</li>
          <li>Rental income from U.S. or foreign properties</li>
          <li>Income earned in Taiwan, China, or any other country before or after moving to the U.S.</li>
          <li>Business income</li>
        </ul>

        <h3>If you are a nonresident alien</h3>
        <p>
          You must report income that is <strong>effectively connected with a U.S. trade or business</strong>, and certain types of U.S.-source income (like dividends, interest, and rent). You generally do not report foreign-source income.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Your year of arrival may be a "dual-status" year</div>
          <p>If you became a U.S. tax resident partway through the year — for example, you arrived in March and passed the Substantial Presence Test by year-end — you are a "dual-status alien." You were a nonresident for part of the year and a resident for part. Dual-status returns are more complex than standard returns and almost always require a tax professional.</p>
        </div>

        <h2>Step 3: Get your tax identification number</h2>
        <p>
          To file a tax return, you need a tax identification number. There are two options:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>If you have...</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>You need...</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Work authorization (H-1B, green card, EAD)', 'Social Security Number (SSN) — apply at a Social Security Administration office'],
                ['No work authorization (F-1 student, dependent visa, tourist)', 'ITIN (Individual Taxpayer Identification Number) — apply with Form W-7'],
              ].map(([situation, need], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{need}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          An ITIN is not a work permit and does not affect your immigration status. It simply allows you to fulfill your U.S. tax obligations, receive refunds, and claim certain tax credits. See our full <a href="/library/individual/itin">ITIN guide →</a>
        </p>

        <h2>Step 4: Know your foreign account reporting obligations</h2>
        <p>
          This is one of the most commonly missed obligations for new immigrants from China and Taiwan.
        </p>
        <p>
          If you have bank accounts, investment accounts, or other financial accounts outside the U.S. with a combined maximum value exceeding <strong>$10,000 at any point during the year</strong>, you are required to file an <strong>FBAR</strong> (Foreign Bank Account Report) with FinCEN.
        </p>
        <p>
          This is separate from your tax return. It's due April 15 with an automatic extension to October 15. Penalties for failing to file can be severe — up to $10,000 per violation for non-willful failures.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ FBAR applies even if you owe no tax</div>
          <p>Many new immigrants believe they don't need to file FBAR because they don't owe taxes on the foreign accounts. This is incorrect. FBAR is a disclosure requirement, not a tax. The obligation exists regardless of whether the accounts generated taxable income.</p>
        </div>

        <h2>Step 5: Understand the key deadlines</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Deadline</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>What's due</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Who it applies to</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['April 15', 'Federal tax return (Form 1040 or 1040-NR)', 'Most taxpayers'],
                ['April 15', 'FBAR (FinCEN Form 114)', 'Anyone with foreign accounts >$10,000'],
                ['June 15', 'Tax return for U.S. citizens/residents living abroad', 'Special cases'],
                ['October 15', 'Extended deadline (if extension filed by April 15)', 'Anyone who filed Form 4868'],
              ].map(([date, what, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{date}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{what}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Step 6: Tax benefits you may qualify for</h2>
        <p>
          Being a new immigrant doesn't mean you miss out on tax benefits. Depending on your situation, you may qualify for:
        </p>
        <ul>
          <li><strong>Standard deduction</strong> — $14,600 for single filers in 2024 (resident aliens only; nonresident aliens generally cannot claim the standard deduction)</li>
          <li><strong>Child Tax Credit</strong> — up to $2,000 per qualifying child under 17, if you have a Social Security Number or ITIN</li>
          <li><strong>Foreign Tax Credit</strong> — if you paid taxes to another country on income also taxed by the U.S., you may be able to credit those foreign taxes against your U.S. tax bill</li>
          <li><strong>Tax treaty benefits</strong> — the U.S. has tax treaties with many countries (including China, but not Taiwan) that may reduce or eliminate certain types of U.S. tax on treaty country residents</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The U.S.-China tax treaty vs. Taiwan</div>
          <p>The U.S. has a tax treaty with China that provides certain benefits for Chinese nationals — including reduced withholding on dividends and possible exemptions for students and researchers. The U.S. does NOT have a formal tax treaty with Taiwan. However, there is a Taiwan Relations Act that provides some similar protections. If your situation involves income from either China or Taiwan, consult a tax professional who is familiar with both countries' systems.</p>
        </div>

        <h2>The most common mistakes new immigrants make</h2>
        <ul>
          <li><strong>Filing as a resident when you should file as a nonresident (or vice versa)</strong> — Getting residency status wrong is the most consequential error. It affects every other part of your return.</li>
          <li><strong>Not reporting foreign income</strong> — Resident aliens must report worldwide income. Many new immigrants don't know this applies to them.</li>
          <li><strong>Forgetting FBAR</strong> — This is separate from your tax return and has its own filing system. Missing it can result in significant penalties.</li>
          <li><strong>Missing the first-year election</strong> — If you became a resident alien partway through the year, you may be able to elect to be treated as a resident for the entire year, which can simplify your return and unlock additional deductions. This election must be made on your return — you can't change your mind later.</li>
          <li><strong>Assuming your employer handled everything</strong> — Your employer withholds taxes from your paycheck, but they don't file your return. You are responsible for filing, reporting all income, and claiming any additional obligations like FBAR.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

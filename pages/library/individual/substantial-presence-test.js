import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import ArticleTable from '../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '29',
  title:         'Substantial Presence Test explained: how to count your days',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the substantial presence test day count, excluded days, exempt individuals, Form 8843, and the closer connection exception. Tax treaty tie-breaker rules and expatriation are only summarized',
  persona:       ['Visa holders (H-1B, L-1, F-1, J-1)', 'Parents visiting adult children in the U.S.', 'People splitting time between the U.S. and Taiwan or China', 'New arrivals'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Count your days of U.S. presence for 2025, 2024, and 2023, remove any excluded days, and apply the formula: all 2025 days + 1/3 of 2024 days + 1/6 of 2023 days. If the total is 183 or more and you were here at least 31 days in 2025, you are a U.S. tax resident unless an exception applies.',
  sources: [
    { label: 'IRS — Substantial presence test', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
    { label: 'IRS Publication 519 — U.S. Tax Guide for Aliens (chapter 1)', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — Resident aliens', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: 'Does a partial day count as a day of presence?',
    a: 'Yes. You are treated as present in the U.S. on any day you are physically in the country at any time during the day — arrival and departure days count — unless one of the specific exceptions applies.',
  },
  {
    q: 'My parents visit me from Taiwan for about four months every year. Could they become U.S. tax residents?',
    a: 'At 120 days a year, no: 120 + 40 (one-third of 120) + 20 (one-sixth of 120) = 180, which is under 183. At 150 days a year, the total is 150 + 50 + 25 = 225, so they would meet the test — but because they were present fewer than 183 days in the current year, they may qualify for the closer connection exception by filing Form 8840 on time.',
  },
  {
    q: 'I\'m an F-1 student. Do my days count?',
    a: 'Not while you are an exempt student. You will not be an exempt individual as a student if you have been exempt as a teacher, trainee, or student for any part of more than 5 calendar years — unless you show you do not intend to reside permanently in the U.S. and have substantially complied with your visa. While exempt, you must file Form 8843.',
  },
  {
    q: 'What is Form 8843 and do I need it?',
    a: 'Form 8843 is the statement you file to exclude days as an exempt individual (student, teacher, or trainee), a professional athlete in a charitable event, or because a medical condition kept you in the U.S. Attach it to your return, or mail it by itself if you do not have to file a return. If you do not file it on time, you generally cannot exclude those days.',
  },
  {
    q: 'I meet the test but my home, family, and job are in Taiwan. Can I still be a nonresident?',
    a: 'Possibly, under the closer connection exception: you must be present fewer than 183 days in the current year, keep your tax home in Taiwan for the whole year, and have a closer connection to Taiwan than to the U.S. You claim it on Form 8840. It is not available if you applied for, or took steps toward, a green card during the year.',
  },
  {
    q: 'Is the green card test related to this?',
    a: 'It is a separate test. If you were a lawful permanent resident at any time during the year, you are a resident under the green card test regardless of your day count. The substantial presence test matters mainly for people without a green card.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'The overview: green card test, substantial presence test, and what each status means for your taxes.',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: 'Dual-status tax returns: your year of arrival or departure',
    desc:  'If you meet the test partway through your first year, here is how your arrival year is taxed.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Meeting the test makes you a resident — and residents report income from all sources.',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: 'New to the U.S.? A complete tax guide for new immigrants',
    desc:  'Your residency status is step one. This guide covers everything after it.',
  },
]

export default function SubstantialPresenceTestPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Substantial Presence Test Explained: 183-Day Formula & Exceptions | AskLinTax',
      description: 'How the IRS substantial presence test works: the 31-day and 183-day formula, which days count, exempt students and teachers, Form 8843, the closer connection exception, and worked examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The test in one sentence</h2>
        <p>
          If you do not have a green card, you are a U.S. tax resident for a calendar year if you were physically present in the U.S. on <strong>at least 31 days</strong> that year <strong>and</strong> on <strong>183 days or more</strong> over three years, counted with a weighted formula. This guide shows exactly how to count. For the bigger picture of residency, see <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a>
        </p>

        <h2>The formula</h2>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '24px 0' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: 'var(--navy)', lineHeight: '2' }}>
            <div><strong>All</strong> days present in 2025</div>
            <div>+ <strong>1/3</strong> of days present in 2024</div>
            <div>+ <strong>1/6</strong> of days present in 2023</div>
            <div style={{ borderTop: '2px solid var(--border)', marginTop: '10px', paddingTop: '10px' }}>
              <strong>Total ≥ 183</strong> AND <strong>at least 31 days in 2025</strong> → resident for 2025
            </div>
          </div>
        </div>
        <p>
          The IRS's own example: someone present 120 days in each of 2023, 2024, and 2025 counts 120 + 40 + 20 = <strong>180 days</strong> — short of 183, so they are <strong>not</strong> a resident under this test for 2025.
        </p>

        <h2>What counts as a day</h2>
        <p>
          You are present on any day you are physically in the U.S. <strong>at any time during the day</strong>. Arrival and departure days count. "United States" here means the 50 states and the District of Columbia (plus U.S. territorial waters) — not U.S. territories or U.S. airspace.
        </p>
        <h3>Days you do not count</h3>
        <ul>
          <li>Days you <strong>commute to work</strong> in the U.S. from a residence in Canada or Mexico, if you regularly commute</li>
          <li>Days you are in the U.S. for <strong>less than 24 hours</strong> while in transit between two places outside the U.S.</li>
          <li>Days you are in the U.S. as a <strong>crew member of a foreign vessel</strong></li>
          <li>Days you are <strong>unable to leave</strong> because of a medical condition that developed while you were in the U.S.</li>
          <li>Days you are an <strong>exempt individual</strong> (next section)</li>
        </ul>

        <h2>Exempt individuals</h2>
        <p>
          "Exempt individual" does not mean exempt from tax. It means your days in that status are not counted for this test.
        </p>
        <ArticleTable
          head={['Category', 'Visa', 'Limit on being exempt']}
          rows={[
            ['Students', 'F, J, M, or Q (substantially complying with the visa)', 'Not exempt if you were exempt as a teacher, trainee, or student for any part of more than 5 calendar years — unless you show you do not intend to reside permanently and have complied with your visa'],
            ['Teachers and trainees', 'J or Q', 'Not exempt if you were exempt as a teacher, trainee, or student for any part of 2 of the 6 preceding calendar years (a narrower exception applies if a foreign employer paid all your compensation)'],
            ['Foreign government-related individuals', 'A or G (not A-3 or G-5)', 'While in that status'],
            ['Professional athletes', 'Competing in a charitable sports event', 'Only the days you actually competed'],
          ]}
        />
        <p>
          Immediate family members of exempt students, teachers, and trainees are also included.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ File Form 8843 or lose the exclusion</div>
          <p>To exclude days as an exempt student, teacher, trainee, or athlete — or because of a medical condition — you must file Form 8843. Attach it to your income tax return, or if you do not have to file a return, mail it by the due date for filing Form 1040-NR. If you do not file it on time, you generally cannot exclude those days.</p>
        </div>

        <h2>Worked examples</h2>
        <ArticleTable
          head={['Person', 'Days 2025 / 2024 / 2023', 'Calculation', 'Result for 2025']}
          rows={[
            ['H-1B worker who arrived in March 2024', '300 / 250 / 0', '300 + 83.3 + 0 = 383.3', 'Resident'],
            ['Parent visiting from Taiwan each year', '120 / 120 / 120', '120 + 40 + 20 = 180', 'Not resident under this test'],
            ['Parent visiting longer each year', '150 / 150 / 150', '150 + 50 + 25 = 225', 'Meets the test — but may claim the closer connection exception'],
            ['F-1 student in their 4th calendar year', 'Days excluded (exempt)', 'Exempt days are not counted', 'Not resident under this test (Form 8843 required)'],
          ]}
        />

        <h2>The closer connection exception</h2>
        <p>
          Even if you meet the test, you can be treated as a nonresident if <strong>all</strong> of these are true:
        </p>
        <ul>
          <li>You were present in the U.S. <strong>fewer than 183 days</strong> during the current year</li>
          <li>You kept a <strong>tax home</strong> in a foreign country for the entire year</li>
          <li>You had a <strong>closer connection</strong> to that country than to the U.S. — the IRS looks at where your permanent home, family, belongings, bank accounts, business activities, driver's license, and voting are</li>
        </ul>
        <p>
          You claim it by filing <strong>Form 8840</strong> on time. You <strong>cannot</strong> claim it if, during the year, you applied for or took other steps toward becoming a permanent resident, or had an application for adjustment of status pending.
        </p>
        <p>
          This is the exception that matters most for parents who spend long periods each year with their children in the U.S. but whose life is in Taiwan or China.
        </p>

        <h2>When your residency starts — and the first-year choice</h2>
        <p>
          If you meet the test for the first time, your residency generally starts on the <strong>first day you were present</strong> in the U.S. that year, which makes the year a <a href="/library/individual/dual-status/">dual-status year</a>. You may disregard up to 10 days of earlier presence if you can show a closer connection to a foreign country on those days.
        </p>
        <p>
          If you arrive late in the year and only meet the test the <em>following</em> year, the <strong>first-year choice</strong> may let you be treated as a resident for part of your arrival year. You must be present for at least 31 consecutive days in that year and present for at least 75% of the days from the start of that 31-day period through December 31 (up to 5 days of absence can count as presence). The choice is made with a statement attached to Form 1040, and it cannot be revoked without IRS approval.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Tax treaties can override the result</div>
          <p>If you are a resident of both the U.S. and another country under each country's laws, a tax treaty's tie-breaker rule may treat you as a resident of the other country. Claiming this requires filing Form 1040-NR with Form 8833. Treaty positions need professional advice.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

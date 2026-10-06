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
  id:            '43',
  title:         'I just moved to the U.S. — do I need to report my foreign bank accounts?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who became U.S. residents during the year and kept accounts abroad. How FBAR treats account values from before your residency starting date in the year of arrival is not spelled out in the official guidance reviewed for this guide, so arrival-year FBARs need individual review',
  persona:       ['New green card holders', 'Workers on H-1B or L-1 visas in their first U.S. year', 'Students whose exempt years have ended', 'Families who moved from Taiwan or China this year'],
  relatedJourney: ['New to the U.S.', 'Cross-border finances'],
  actionRequired: 'First pin down when you became a U.S. resident for tax purposes. Then check FBAR and Form 8938 separately — they have different thresholds and are not governed by identical period rules — and, separately again, report any income your foreign accounts earned while you were a resident.',
  sources: [
    { label: 'IRS — Instructions for Form 8938 (specified individual and reporting period)', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — International Practice Unit: FinCEN Form 114 (FBAR) (U.S. resident determination)', url: 'https://www.irs.gov/pub/fatca/int_practice_units/fincen-form114-fbar.pdf' },
    { label: 'IRS Publication 519 — U.S. Tax Guide for Aliens (residency starting date)', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: 'I arrived in October. Do I report my Taiwan accounts for this year?',
    a: 'Possibly. If you became a U.S. resident for the year, you can be a U.S. person for FBAR purposes for that calendar year. Whether balances from before your arrival count toward the arrival-year FBAR is not clearly addressed in the official guidance reviewed for this guide, so have that year reviewed. For Form 8938, the instructions say the reporting period begins on your residency starting date.',
  },
  {
    q: 'Is FBAR residency the same as tax residency?',
    a: 'Largely, but not entirely. For the FBAR, residency is determined under the tax law\'s residency tests, but IRS guidance says elections such as choosing to treat a nonresident spouse as a resident, and tax treaty provisions, do not change your status for FBAR purposes.',
  },
  {
    q: 'Does the money I bring from abroad count as income in my first year?',
    a: 'Moving your own money is not income. What matters for income tax is what was earned and when — for example, interest earned while you were a U.S. resident.',
  },
  {
    q: 'I was a student on an F-1 visa for several years. When does this start?',
    a: 'Students are often exempt from counting days under the substantial presence test for a period of years. Reporting generally becomes relevant once you are a resident. See our substantial presence test guide for how the day count works.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'The green card test and the substantial presence test in plain language.',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: 'Dual-status tax returns: your year of arrival or departure',
    desc:  'How your income tax return works in the year you became a resident.',
  },
  {
    href: '/library/investment/pre-immigration-savings',
    cat:  'Investments & Foreign Accounts',
    title: 'I had this money before moving to America — does that change FBAR or Form 8938?',
    desc:  'Why old savings can still be in reportable accounts.',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'The aggregate test, once you know you are a U.S. person.',
  },
]

export default function NewUsResidentForeignAccountsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Just Moved to the U.S.: Do I Report My Foreign Bank Accounts? | AskLinTax',
      description: 'First year in the U.S. with accounts in Taiwan or abroad? Separate four questions: when your U.S. residency starts, the FBAR, Form 8938 and its reporting period, and income your accounts earn.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Possibly — and the year you arrive needs extra care. Moving to the U.S. does not by itself create a reporting duty. What creates it is becoming a <strong>U.S. person</strong> (for the FBAR) or a <strong>specified individual</strong> (for Form 8938) and meeting each form's threshold. Your accounts' <strong>income</strong> is a separate, third question.
        </p>
        <p>Work through four questions in order:</p>

        <ArticleTable
          head={['Question', 'Why it matters']}
          rows={[
            ['A. When did you become a U.S. resident for tax purposes?', 'Reporting obligations depend on your status, and the arrival year can be partial'],
            ['B. Which reporting period applies?', 'FBAR and Form 8938 are separate regimes; do not assume their period rules are identical'],
            ['C. Are the thresholds met?', 'FBAR: aggregate over $10,000 at any time. Form 8938: much higher thresholds that depend on filing status'],
            ['D. Did the accounts earn income while you were a resident?', 'Interest and other income are reported on your tax return, separately from FBAR and Form 8938'],
          ]}
        />

        <h2>A. When does U.S. residency start?</h2>
        <p>
          If you are not a U.S. citizen, you are generally a resident for tax purposes if you meet the <strong>green card test</strong> or the <strong>substantial presence test</strong>. In the year you arrive, the tax law has a <strong>residency starting date</strong> — for example, under the substantial presence test it is generally the first day you are present in the U.S. that year (with limited exceptions). See <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a> and <a href="/library/individual/substantial-presence-test/">the substantial presence test guide</a>.
        </p>

        <h2>B. Form 8938 and FBAR use different rules — check each one</h2>
        <h3>Form 8938: the reporting period starts on your residency starting date</h3>
        <p>
          The Form 8938 instructions say that if you are a specified individual for only part of the tax year, the <strong>reporting period is the part of the year you are a specified individual</strong>. Their example: George, who is not a U.S. citizen, arrives in the U.S. on February 1 and meets the substantial presence test for the year. His Form 8938 reporting period begins on his residency starting date, February 1, and ends on December 31.
        </p>
        <h3>FBAR: a calendar-year report for U.S. persons</h3>
        <p>
          The FBAR is filed for each calendar year in which a U.S. person had a financial interest in or signature authority over foreign financial accounts whose aggregate value exceeded $10,000 at any time during the calendar year. For FBAR purposes, residency is determined under the tax law's residency tests — but IRS guidance notes that elections (such as treating a nonresident spouse as a resident) and tax treaty provisions do <strong>not</strong> change FBAR residency.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Arrival-year FBAR: get it reviewed</div>
          <p>The official guidance reviewed for this guide does not spell out how account values from <strong>before</strong> your residency starting date are treated on the FBAR for your arrival year. Don't assume the Form 8938 rule carries over, and don't assume pre-arrival balances can simply be ignored. If your arrival-year balances were near or above $10,000, have that year reviewed by a tax professional.</p>
        </div>

        <h2>C. Thresholds</h2>
        <ul>
          <li><strong>FBAR:</strong> the aggregate maximum value of your foreign financial accounts exceeded $10,000 at any time. See <a href="/library/investment/fbar-10000-rule/">How the $10,000 rule really works</a>.</li>
          <li><strong>Form 8938:</strong> for taxpayers living in the U.S., more than $50,000 on the last day of the year or more than $75,000 at any time (unmarried); more than $100,000 or $150,000 (married filing jointly). Higher thresholds apply if you live abroad. Form 8938 is required only if you must file an income tax return. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
        </ul>

        <h2>D. Income from the accounts</h2>
        <p>
          As a U.S. resident you are taxed on worldwide income, so interest earned on foreign accounts while you are a resident is reported on your tax return. In your arrival year, the income tax return may be a dual-status return, which has its own rules. See <a href="/library/individual/dual-status/">Dual-status tax returns</a>. Money you earned and saved before you came is not taxed again just because you move it — see <a href="/library/investment/pre-immigration-savings/">I had this money before moving to America</a>.
        </p>

        <h2>Example</h2>
        <p>
          Lin moves from Taipei to Seattle on a green card in August 2025 and keeps two Taiwan accounts. She works through the four questions: (A) she pins down her residency starting date for 2025; (B) for Form 8938, her reporting period starts on that date; (C) her accounts total far less than the Form 8938 threshold, but more than $10,000, so the FBAR is the live question — and because it is her arrival year, she has it reviewed; (D) she reports the Taiwan interest earned while she was a resident on her 2025 return.
        </p>

        <h2>Records to start keeping now</h2>
        <ul>
          <li>Your arrival date and immigration documents (to establish your residency starting date)</li>
          <li>Monthly statements for every foreign account, from January of your arrival year</li>
          <li>Interest statements from foreign banks</li>
          <li>Year-end Treasury exchange rates for the currencies you hold</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

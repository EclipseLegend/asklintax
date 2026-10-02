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
  id:            '28',
  title:         'Dual-status tax returns: your year of arrival or departure',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the general dual-status rules for individuals in their year of arrival or departure. Treaty positions, expatriation, and income effectively connected with a U.S. business during the nonresident period need professional review',
  persona:       ['New arrivals on H-1B, L-1, or other work visas', 'New green card holders', 'Students changing to work status', 'People leaving the U.S. permanently'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Find your residency starting (or ending) date, then split the year: worldwide income for the resident part, U.S.-source income for the nonresident part. If you are married to a U.S. citizen or resident at year end, compare the dual-status return with the election to be treated as a resident for the whole year.',
  sources: [
    { label: 'IRS — Taxation of dual-status individuals', url: 'https://www.irs.gov/individuals/international-taxpayers/taxation-of-dual-status-individuals' },
    { label: 'IRS Publication 519 — U.S. Tax Guide for Aliens (chapters 1 and 6)', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — Nonresident spouse', url: 'https://www.irs.gov/individuals/international-taxpayers/nonresident-spouse' },
    { label: 'IRS — Substantial presence test', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
  ],
}

const FAQS = [
  {
    q: 'I moved to the U.S. on an H-1B in June 2025. Am I dual-status?',
    a: 'Usually yes, if you were not a U.S. resident in 2024 and you meet the substantial presence test for 2025. Your residency generally starts on the first day you were present in the U.S. in 2025, and you are a nonresident for the part of the year before that date.',
  },
  {
    q: 'Do I report my Taiwan salary from before I moved?',
    a: 'Generally no. During the nonresident part of the year you are taxed only on U.S.-source income (and income effectively connected with a U.S. business). Foreign-source income you receive while a nonresident that is not connected with a U.S. business is generally not taxable. Foreign income you receive after your residency starts is taxable.',
  },
  {
    q: 'Can I take the standard deduction?',
    a: 'No. A dual-status return cannot use the standard deduction. You can itemize allowable deductions instead. This is one of the main reasons people married to a U.S. citizen or resident consider the election to be treated as a resident for the full year.',
  },
  {
    q: 'Can I file jointly with my spouse?',
    a: 'Not on a dual-status return. But if you are married to a U.S. citizen or resident at the end of the year (including when you both became residents during the year), you and your spouse can choose to be treated as U.S. residents for the entire year and file jointly. The dual-status restrictions then no longer apply, and both of you report worldwide income for the whole year.',
  },
  {
    q: 'Which form do I file?',
    a: 'It depends on your status on the last day of the year. If you are a resident at year end, file Form 1040 — for 2025, check the "Other" box at the top and write "Dual Status Return" — and attach a statement for the nonresident part (Form 1040-NR can be used, with "Dual Status Stmt" entered the same way). If you are a nonresident at year end, it is the reverse. Dual-status returns for 2025 can\'t be e-filed.',
  },
  {
    q: 'I left the U.S. permanently in 2025. When is my return due?',
    a: 'If you are a nonresident on the last day of the year and received wages subject to U.S. withholding, generally April 15 of the following year. If you did not receive wages subject to withholding, generally June 15.',
  },
]

const RELATED = [
  {
    href: '/library/individual/substantial-presence-test',
    cat:  'Individuals & Families',
    title: 'Substantial Presence Test explained: how to count your days',
    desc:  'Your dual-status year usually starts with the first day you count toward the substantial presence test.',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: 'Nonresident spouse: can we file jointly?',
    desc:  'The elections that let married couples avoid the dual-status restrictions.',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'The overview of the green card test and substantial presence test.',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: 'New to the U.S.? A complete tax guide for new immigrants',
    desc:  'Everything else to handle in your first U.S. tax year.',
  },
]

export default function DualStatusPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Dual-Status Alien Tax Return Explained (Year of Arrival or Departure) | AskLinTax',
      description: 'Resident for part of the year and nonresident for the rest? How dual-status returns work: residency start dates, what income is taxed, restrictions like no standard deduction, and how to file.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What "dual-status" means</h2>
        <p>
          You are a <strong>dual-status</strong> taxpayer when you are both a U.S. resident and a nonresident in the same tax year. It refers only to your <em>tax residency</em>, not your citizenship or visa. The most common dual-status years are the year you <strong>arrive</strong> in the U.S. and the year you <strong>leave</strong>.
        </p>
        <p>
          For a dual-status year, you split the year in two and apply different rules to each part.
        </p>

        <ArticleTable
          head={['Part of the year', 'What U.S. tax applies to']}
          rows={[
            ['While you are a U.S. resident', 'Income from all sources — U.S. and foreign (worldwide income)'],
            ['While you are a nonresident', 'U.S.-source income, and income effectively connected with a U.S. trade or business. Foreign income not connected with a U.S. business is generally not taxable.'],
          ]}
        />

        <h2>When does your residency start?</h2>
        <p>
          If you were not a U.S. resident at any time during the previous year, your residency starts on your <strong>residency starting date</strong>, and you are a nonresident before it:
        </p>
        <ul>
          <li><strong>Substantial presence test:</strong> generally the first day you are present in the U.S. during the year. You may disregard up to 10 days of earlier presence if you can show a closer connection to a foreign country where you had your tax home on those days — this requires a signed statement.</li>
          <li><strong>Green card test:</strong> the first day in the year you are present in the U.S. as a lawful permanent resident.</li>
          <li><strong>Both tests met:</strong> the earlier of the two dates.</li>
        </ul>
        <p>
          If you were a U.S. resident for any part of the previous year and are a resident this year, you are treated as a resident from January 1 — there is no dual-status split for your arrival.
        </p>

        <h3>A worked example</h3>
        <p>
          Lin lived and worked in Taiwan until May 2025, arrived in the U.S. on an H-1B on June 1, 2025, and stayed for the rest of the year. She was not a U.S. resident in 2024 and meets the substantial presence test for 2025.
        </p>
        <ArticleTable
          head={['Period', 'Status', 'Taxed by the U.S.']}
          rows={[
            ['January 1 – May 31, 2025', 'Nonresident', 'Only U.S.-source income — her Taiwan salary for this period is generally not taxable'],
            ['June 1 – December 31, 2025', 'Resident', 'All income, including any Taiwan interest or rent received after June 1'],
          ]}
        />
        <p>
          Because she is a resident on December 31, Lin files <strong>Form 1040</strong> marked "Dual Status Return" (using the new "Other" box at the top of the 2025 form), with a dual-status statement for the nonresident months. She must file it on paper — dual-status returns for 2025 can't be e-filed.
        </p>

        <h2>Restrictions on a dual-status return</h2>
        <ArticleTable
          head={['Rule', 'Dual-status return']}
          rows={[
            ['Standard deduction', 'Not allowed — you can itemize allowable deductions'],
            ['Head of household', 'Cannot use the head of household tax table or worksheet'],
            ['Joint return', 'Not allowed — unless you and your spouse make the full-year resident election'],
            ['Married, nonresident for part of the year, no election', 'Must use the married filing separately tax rates on income effectively connected with a U.S. business'],
            ['Certain credits (married nonresident)', 'No earned income credit, credit for the elderly or disabled, or education credits unless you elect to be taxed as a resident jointly with your spouse'],
            ['Dependents', 'You may be able to claim a dependent'],
          ]}
        />

        <h2>How to file</h2>
        <ArticleTable
          head={['Your status on December 31', 'Main return', 'Attach']}
          rows={[
            ['Resident (usually your year of arrival)', 'Form 1040 — check the "Other" box at the top and write "Dual Status Return"', 'A statement showing income for the nonresident part — Form 1040-NR may be used, with "Dual Status Stmt" entered in its "Other" box'],
            ['Nonresident (usually your year of departure)', 'Form 1040-NR — check the "Other" box at the top and write "Dual Status Return"', 'A statement showing income for the resident part — Form 1040 or 1040-SR may be used, with "Dual Status Stmt" entered in its "Other" box'],
          ]}
        />
        <p>
          The statement must show your name, address, and taxpayer identification number. If you are a resident on December 31, the return is generally due <strong>April 15</strong> of the following year. If you are a nonresident on December 31, it is generally due April 15 if you had wages subject to withholding, or <strong>June 15</strong> if you did not.
        </p>

        <h2>Elections that change the picture</h2>
        <h3>Married? The full-year resident election</h3>
        <p>
          If you were a nonresident at the beginning of the year, are a resident (or citizen) at the end, and are married to a U.S. citizen or resident at year end, you and your spouse can choose to be treated as U.S. residents for the <strong>entire year</strong> and file jointly. The dual-status restrictions no longer apply — but both of you are taxed on worldwide income for the whole year, including the months before you arrived. Single people cannot make this choice. See <a href="/library/individual/nonresident-spouse/">Nonresident spouse: can we file jointly?</a>
        </p>
        <h3>The first-year choice</h3>
        <p>
          If you arrive late in the year and do not meet the substantial presence test until the <em>next</em> year, the first-year choice may let you be treated as a resident for part of your arrival year. It has specific day-count requirements; see <a href="/library/individual/substantial-presence-test/">Substantial Presence Test explained</a>.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>Dual-status returns are among the most complex individual returns. Get help if you have a spouse, investments or rental income abroad, a possible tax treaty position, or you are leaving the U.S. permanently.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

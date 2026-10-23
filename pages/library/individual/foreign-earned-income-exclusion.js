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
  id:            '92',
  title:         'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the foreign earned income exclusion and the foreign housing exclusion and deduction for tax years 2025 and 2026, based on Form 2555 and its 2025 instructions, the 2026 draft Form 2555 and instructions, Publication 54 (Rev. December 2025), Rev. Proc. 2024-40, Rev. Proc. 2025-32, Notice 2025-16, Notice 2026-25, and the 2025 Instructions for Form 1040. It does not cover U.S. government employees, combat zones, self-employment tax planning, or state tax',
  persona:       ['U.S. citizens working in Taiwan or elsewhere abroad', 'Green card holders on a foreign assignment', 'People planning a move overseas', 'Anyone deciding between the exclusion and the foreign tax credit'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Check that your tax home is abroad and that you meet the bona fide residence test or the 330-day physical presence test. If you do, you can elect on Form 2555 to exclude foreign earned income up to $130,000 for 2025 or $132,900 for 2026, plus a housing amount, and you must still file a U.S. return.',
  sources: [
    { label: 'IRS — 2025 Instructions for Form 2555, Foreign Earned Income', url: 'https://www.irs.gov/pub/irs-pdf/i2555.pdf' },
    { label: 'IRS — Form 2555 (2025)', url: 'https://www.irs.gov/pub/irs-pdf/f2555.pdf' },
    { label: 'IRS — 2026 Instructions for Form 2555 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i2555--dft.pdf' },
    { label: 'IRS — Publication 54, Tax Guide for U.S. Citizens and Resident Aliens Abroad', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Notice 2025-16 (2025 housing cost limits by location)', url: 'https://www.irs.gov/pub/irs-drop/n-25-16.pdf' },
    { label: 'IRS — Notice 2026-25 (2026 housing cost limits by location)', url: 'https://www.irs.gov/pub/irs-drop/n-26-25.pdf' },
    { label: 'IRS — Foreign earned income exclusion', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion' },
  ],
}

const FAQS = [
  {
    q: 'Can I exclude interest, dividends, or capital gains from Taiwan?',
    a: 'No. The exclusion applies only to foreign earned income — pay for personal services you perform abroad. The Form 2555 instructions say foreign earned income does not include interest, ordinary dividends, capital gains, pensions, annuities, or social security benefits.',
  },
  {
    q: 'If all my income is excluded, do I still have to file?',
    a: 'Possibly. Publication 54 says that, for deciding whether you must file, gross income includes income you can exclude as foreign earned income or as a foreign housing amount. You must also file a return to claim the exclusion.',
  },
  {
    q: 'What is the exclusion amount?',
    a: 'The maximum is $130,000 for 2025 (Rev. Proc. 2024-40) and $132,900 for 2026 (Rev. Proc. 2025-32). It is reduced if you qualify for only part of the year.',
  },
  {
    q: 'Can I use both the exclusion and the foreign tax credit?',
    a: 'Yes, on different income. You cannot take a credit or deduction for foreign taxes on income you exclude, but you can generally credit foreign taxes on income that is not excluded, such as wages above the exclusion or investment income.',
  },
  {
    q: 'I just moved abroad and don\'t meet the test yet. What do I do?',
    a: 'The Form 2555 instructions give two options: apply on Form 2350 for an extension to a date after you expect to qualify, or file on time without the exclusion and amend after you qualify.',
  },
  {
    q: 'Can I stop using the exclusion?',
    a: 'Yes, by revoking it with a statement attached to your return. But if you revoke, you cannot claim the exclusion again for your next 5 tax years without IRS approval.',
  },
]

const RELATED = [
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: 'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income',
    desc:  'The alternative or companion to the exclusion.',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: 'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist',
    desc:  'Deadlines, FBAR, and other filing steps for people abroad.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Reporting foreign income in U.S. dollars.',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Who counts as a U.S. resident for tax purposes.',
  },
]

export default function ForeignEarnedIncomeExclusionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules | AskLinTax',
      description: 'The foreign earned income exclusion: $130,000 for 2025 and $132,900 for 2026, the tax home, bona fide residence, and 330-day tests, the housing exclusion and Taipei limit, deadlines, and interaction with the foreign tax credit.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you are a U.S. citizen or resident alien, your <strong>tax home is in a foreign country</strong>, and you meet the <strong>bona fide residence test</strong> or the <strong>physical presence test</strong>, you can elect on <strong>Form 2555</strong> to exclude <strong>foreign earned income</strong> up to <strong>$130,000 for 2025</strong> or <strong>$132,900 for 2026</strong>. You may also exclude or deduct part of your foreign housing costs. The exclusion is not automatic: you claim it on your U.S. return.
        </p>

        <h2>Who qualifies</h2>
        <ul>
          <li><strong>Tax home abroad:</strong> your tax home must be in a foreign country. If your abode — where you maintain your family, economic, and personal ties — is in the United States, you do not meet this test.</li>
          <li><strong>Bona fide residence test:</strong> you are a bona fide resident of a foreign country for an uninterrupted period that includes an entire tax year. Publication 54 says U.S. citizens can use this test, but a U.S. resident alien can use it only if the person is a citizen or national of a country with which the United States has an income tax treaty in effect.</li>
          <li><strong>Physical presence test:</strong> a U.S. citizen or resident alien present in foreign countries for at least <strong>330 full days</strong> during any period of 12 consecutive months. Publication 54 says this test applies to all resident aliens.</li>
        </ul>
        <p>
          <strong>Green card holders born in or from Taiwan:</strong> a green card holder is a U.S. resident alien for tax purposes. For the bona fide residence test, what matters is the person's <strong>citizenship or nationality</strong> — not where the person was born, where the person lives, or U.S. tax residency. Taiwan does not appear on the IRS list of U.S. income tax treaties, so a resident alien whose only citizenship or nationality is Taiwan's does not appear to meet the treaty-country condition and would generally need the physical presence test. A resident alien who is also a citizen or national of a treaty country should check that condition for that country.
        </p>

        <h2>What counts as foreign earned income</h2>
        <p>
          Foreign earned income is pay for personal services you perform in a foreign country while you meet the tests — wages, salaries, professional fees, and certain allowances and noncash pay. It does <strong>not</strong> include:
        </p>
        <ul>
          <li>interest, ordinary dividends, capital gains, or alimony;</li>
          <li>pensions, annuities, or social security benefits;</li>
          <li>pay from the U.S. government as its employee;</li>
          <li>amounts received after the end of the tax year following the year you performed the services.</li>
        </ul>

        <h2>Amounts for 2025 and 2026</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['Maximum foreign earned income exclusion', '$130,000', '$132,900'],
            ['Base housing amount (16% of the maximum, full year)', '$20,800', '$21,264'],
            ['General limit on housing expenses (30% of the maximum, full year)', '$39,000', '$39,870'],
            ['Housing expense limit for Taipei, Taiwan (full year)', '$46,188', '$46,188'],
          ]}
        />
        <p>
          Sources: Rev. Proc. 2024-40 and Rev. Proc. 2025-32 (exclusion amounts), Notice 2025-16 and Notice 2026-25 (housing amounts and location limits). The 2026 Form 2555 and its instructions are still drafts. All amounts are reduced if your qualifying period covers only part of the year.
        </p>

        <h2>The foreign housing exclusion or deduction</h2>
        <ul>
          <li><strong>Housing cost amount:</strong> your qualified housing expenses, limited to the general limit or the higher limit for your location, minus the base housing amount.</li>
          <li><strong>Location limits:</strong> the IRS publishes higher limits for specific high-cost cities each year. Taipei is listed at $46,188 for a full year in both Notice 2025-16 and Notice 2026-25. If your city is not listed, the general limit applies.</li>
          <li><strong>Exclusion or deduction:</strong> the part of the housing cost amount attributable to employer-provided amounts (such as your wages) is excluded; if you are self-employed, it is a housing deduction instead. Publication 54 says the deduction cannot be more than your foreign earned income minus your exclusions, and any excess can be carried over 1 year.</li>
        </ul>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Maya</strong>, a U.S. citizen, works in Taipei for all of 2025, has her tax home there, and meets the physical presence test for the full year. Her employer pays her $140,000. Her qualified housing expenses are $40,000.
        </p>
        <ArticleTable
          head={['Form 2555 line', 'Amount']}
          rows={[
            ['27 — foreign earned income', '$140,000'],
            ['28 and 30 — housing expenses (under the $46,188 Taipei limit)', '$40,000'],
            ['32 — base housing amount (full year)', '$20,800'],
            ['33 — housing cost amount ($40,000 − $20,800)', '$19,200'],
            ['35 — employer-provided share ($140,000 ÷ $140,000)', '1.000'],
            ['36 — housing exclusion', '$19,200'],
            ['40 — maximum exclusion for a full year', '$130,000'],
            ['41 — line 27 minus line 36 ($140,000 − $19,200)', '$120,800'],
            ['42 — foreign earned income exclusion (smaller of lines 40 and 41)', '$120,800'],
            ['43 — total excluded ($19,200 + $120,800)', '$140,000'],
          ]}
        />
        <p>
          All of Maya's wages are excluded. Any interest or dividends she earns are still taxable, and when you claim the exclusion, the Form 1040 instructions use a Foreign Earned Income Tax Worksheet that figures the tax on your other income as if the excluded income were included, so that income may be taxed at higher rates.
        </p>

        <h2>Deadlines and extensions</h2>
        <ul>
          <li><strong>Automatic 2-month extension:</strong> if on April 15 you live outside the United States and Puerto Rico and your tax home is outside them, you have until <strong>June 15</strong> to file and pay. Attach a statement explaining that you qualify. Interest still runs on tax not paid by April 15.</li>
          <li><strong>Additional time:</strong> Publication 54 explains that you can request 4 more months, to <strong>October 15</strong>, on Form 4868 by June 15. This is an extension of time to file, not to pay.</li>
          <li><strong>Waiting to qualify:</strong> use Form 2350 to request an extension until after you meet a residence test, or file without the exclusion and amend later.</li>
        </ul>

        <h2>Interaction with other tax benefits</h2>
        <ul>
          <li><strong>Foreign tax credit:</strong> no credit or deduction for foreign taxes on excluded income. You can generally use the credit for foreign taxes on income you do not exclude. See <a href="/library/individual/foreign-tax-credit/">the foreign tax credit guide</a>.</li>
          <li><strong>Child-related credits:</strong> the Form 2555 instructions say you cannot take the additional child tax credit if you claim either exclusion or the housing deduction. See <a href="/library/individual/child-tax-credit/">the Child Tax Credit guide</a>.</li>
          <li><strong>Earned income credit:</strong> not available if you claim either exclusion or the housing deduction.</li>
        </ul>

        <h2>Electing and revoking</h2>
        <p>
          You generally make your first election on a timely filed return (including extensions) or on an amended return for a timely filed return; Publication 54 describes exceptions. The election stays in effect for later years until you revoke it. If you revoke, you cannot claim the exclusion again for the next 5 tax years without IRS approval.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Excluding investment income</strong>, such as Taiwan interest or dividends.</li>
          <li><strong>Assuming the exclusion is automatic</strong> and not filing a return.</li>
          <li><strong>Miscounting the 330 days</strong> — they must be full days in foreign countries.</li>
          <li><strong>Claiming the foreign tax credit on excluded wages.</strong></li>
          <li><strong>Revoking casually</strong> without considering the 5-year rule.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Check the final 2026 forms</div>
          <p>The 2026 Form 2555 and instructions are drafts; check the final versions before filing. Self-employment tax, U.S. government employees, combat zones, and state tax are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

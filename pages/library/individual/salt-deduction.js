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
  id:            '70',
  title:         'SALT Deduction: Limits, Income Rules, and Examples',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal itemized deduction for state and local taxes (SALT) for tax years 2025 and 2026, based on the 2025 Schedule A instructions, IRS Topic 503, and IRS Publication 505 (2026). The step-by-step calculation and examples use the 2025 rules. It does not cover state income tax rules or business-level tax elections',
  persona:       ['Homeowners who pay property tax', 'People in states with high income taxes', 'Taxpayers deciding whether to itemize', 'Higher-income households near the income limit'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Add up the state and local income (or sales) taxes and property taxes you paid, apply the SALT limit for your filing status and income, and compare your total itemized deductions with your standard deduction. The SALT deduction only helps if you itemize.',
  sources: [
    { label: 'IRS — 2025 Instructions for Schedule A (Form 1040), Itemized Deductions', url: 'https://www.irs.gov/pub/irs-pdf/i1040sca.pdf' },
    { label: 'IRS — Topic no. 503, Deductible taxes', url: 'https://www.irs.gov/taxtopics/tc503' },
    { label: 'IRS — Publication 505 (2026), Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — Form W-4 (2026), Step 4(b) Deductions Worksheet', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — 2024 Instructions for Schedule A (Form 1040) (prior-year limit)', url: 'https://www.irs.gov/pub/irs-prior/i1040sca--2024.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (standard deduction)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the SALT limit for 2025?',
    a: 'For 2025, the deduction for state and local income (or sales), real estate, and personal property taxes is limited to $40,000 ($20,000 if married filing separately). The limit is reduced if your modified adjusted gross income is over $500,000 ($250,000 if married filing separately), but not below $10,000 ($5,000 if married filing separately).',
  },
  {
    q: 'What is the SALT limit for 2026?',
    a: 'According to IRS Publication 505 (2026), the limit for 2026 is $40,400 ($20,200 if married filing separately). It is reduced if your modified adjusted gross income is more than $505,000 ($252,500 if married filing separately), but not below $10,000 ($5,000 if married filing separately). The 2026 Form W-4 uses the same amounts.',
  },
  {
    q: 'Do I get the SALT deduction if I take the standard deduction?',
    a: 'No. The SALT deduction is an itemized deduction on Schedule A. It only helps if your total itemized deductions are more than your standard deduction.',
  },
  {
    q: 'Can I deduct property tax I pay on a home in Taiwan?',
    a: 'No. The Schedule A instructions list foreign personal or real property taxes among the taxes you cannot deduct.',
  },
  {
    q: 'Does the limit apply separately to income tax and property tax?',
    a: 'No. It is one combined limit for state and local income (or general sales) taxes, real estate taxes, and personal property taxes.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Standard vs. itemized deductions explained.',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Why foreign property taxes are not SALT.',
  },
]

export default function SaltDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'SALT Deduction: 2025 and 2026 Limits, Income Rules & Examples | AskLinTax',
      description: 'The state and local tax (SALT) deduction: the $40,000 limit for 2025 and $40,400 for 2026, the reduction at higher incomes, the $10,000 floor, and when to itemize.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you <strong>itemize</strong> on Schedule A, you can deduct state and local taxes you paid — <strong>income taxes or general sales taxes</strong>, plus <strong>real estate</strong> and <strong>personal property</strong> taxes. These are often called <strong>SALT</strong>. For <strong>2025</strong>, the combined deduction is limited to <strong>$40,000</strong> ($20,000 if married filing separately), up from $10,000 ($5,000) for 2024. For <strong>2026</strong>, the limit is <strong>$40,400</strong> ($20,200 if married filing separately).
        </p>
        <p>
          At higher incomes the limit shrinks. For 2025, it is reduced by <strong>30%</strong> of your modified adjusted gross income (MAGI) over <strong>$500,000</strong> ($250,000 if married filing separately), but never below <strong>$10,000</strong> ($5,000 if married filing separately). For 2026, the reduction starts at MAGI over <strong>$505,000</strong> ($252,500 if married filing separately), with the same $10,000 ($5,000) floor.
        </p>
        <p>
          If you take the <strong>standard deduction</strong>, the SALT deduction does not help you.
        </p>

        <h2>Which taxes count</h2>
        <ArticleTable
          head={['Schedule A line', 'What it includes']}
          rows={[
            ['5a', 'State and local income taxes — or, instead, general sales taxes (you choose one)'],
            ['5b', 'State and local real estate taxes'],
            ['5c', 'State and local personal property taxes'],
            ['Not deductible', 'Foreign personal or real property taxes, federal income tax, and Social Security and Medicare taxes, among others'],
          ]}
        />
        <p>
          The limit applies to the <strong>total</strong> of lines 5a through 5c, not to each tax separately.
        </p>

        <h2>The 2025 limit, step by step</h2>
        <ArticleTable
          head={['Step', 'Rule']}
          rows={[
            ['1. Start', '$40,000'],
            ['2. Compare income', 'Is your MAGI more than $500,000 ($250,000 if married filing separately)?'],
            ['3. Reduce', 'If yes, subtract 30% of the excess from $40,000'],
            ['4. Floor', 'The result is never less than $10,000'],
            ['5. Married filing separately', 'Use half of the result'],
            ['6. Your deduction', 'The smaller of that limit or the state and local taxes you actually paid'],
          ]}
        />
        <p>
          For this purpose, MAGI is your adjusted gross income plus certain excluded income — including income excluded under the foreign earned income exclusion (Form 2555) or from Puerto Rico or American Samoa.
        </p>

        <h2>Examples (illustrative, tax year 2025)</h2>
        <ArticleTable
          head={['Taxpayer', 'MAGI', 'SALT paid', 'Limit', 'Deduction']}
          rows={[
            ['Single', '$150,000', '$17,000', '$40,000 (no reduction)', '$17,000'],
            ['Married filing jointly', '$550,000', '$50,000', '$40,000 − 30% × $50,000 = $25,000', '$25,000'],
            ['Married filing jointly', '$650,000', '$50,000', '$40,000 − $45,000 is below the floor → $10,000', '$10,000'],
            ['Married filing separately', '$300,000', '$25,000', '$40,000 − 30% × $50,000 = $25,000; half = $12,500', '$12,500'],
          ]}
        />

        <h2>Should you itemize?</h2>
        <p>
          The SALT deduction matters only if your <strong>total itemized deductions</strong> — SALT plus mortgage interest, charitable gifts, and other Schedule A items — are more than your standard deduction. For 2025, the standard deduction is $15,750 if single, $31,500 if married filing jointly, and $23,625 for head of household.
        </p>
        <p>
          <strong>Example:</strong> Jenny is single with $17,000 of state income and property taxes, $6,000 of mortgage interest, and $1,000 of charitable gifts — $24,000 in itemized deductions. That is more than her $15,750 standard deduction, so itemizing saves her more. If her only itemized deduction were $9,000 of state taxes, the standard deduction would be larger. See <a href="/library/individual/tax-credit-vs-deduction/">tax credit vs. tax deduction</a> and <a href="/library/individual/first-time-filer/">the first-time filer guide</a>.
        </p>

        <h2>2025 vs. 2026</h2>
        <ArticleTable
          head={['Rule', 'Tax year 2025', 'Tax year 2026']}
          rows={[
            ['Limit', '$40,000 ($20,000 married filing separately)', '$40,400 ($20,200 married filing separately)'],
            ['Reduction starts when MAGI is over', '$500,000 ($250,000 married filing separately)', '$505,000 ($252,500 married filing separately)'],
            ['Floor', '$10,000 ($5,000 married filing separately)', '$10,000 ($5,000 married filing separately)'],
          ]}
        />
        <p>
          The 2026 amounts come from IRS Publication 505 (2026), and the 2026 Form W-4 uses the same figures. Publication 505 says the 2026 limit is reduced above the income threshold but does not restate the reduction percentage, so this guide's step-by-step calculation and examples use the 2025 rules. Check the 2026 Schedule A instructions when the IRS publishes them before figuring a 2026 reduction.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"Everyone can now deduct $40,000 of state taxes."</strong> Only people who itemize benefit, the deduction cannot exceed what you paid, and the limit is reduced at higher incomes.</li>
          <li><strong>"The limit is per tax."</strong> Income (or sales), real estate, and personal property taxes share one limit.</li>
          <li><strong>"High earners lose the deduction entirely."</strong> The limit does not go below $10,000 ($5,000 if married filing separately).</li>
          <li><strong>"My property tax abroad counts."</strong> Foreign real property taxes are not deductible as SALT. See <a href="/library/investment/foreign-property/">property abroad</a>.</li>
          <li><strong>"Married filing separately doubles the benefit."</strong> Each separate return uses half the limit.</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Federal rules only</div>
          <p>This guide covers the federal deduction. Your state may have its own rules for deducting taxes on your state return; do not assume they match.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

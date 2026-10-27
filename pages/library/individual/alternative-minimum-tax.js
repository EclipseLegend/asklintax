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
  id:            '120',
  title:         'Alternative Minimum Tax (AMT): 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how the individual AMT works, with 2025 and 2026 figures from Rev. Proc. 2024-40 and Rev. Proc. 2025-32 (both final), the 2025 Instructions for Form 6251, and the 2025 Instructions for Form 8801. The 2026 50% phase-out rate is calculated from the final Rev. Proc. 2025-32 thresholds; 2026 Form 6251 line references come from an IRS draft form (created May 2026) that may change. Examples are simplified and ignore capital gains, the AMT foreign tax credit, and other credits',
  persona:       ['Employees who exercised incentive stock options', 'High-income taxpayers in high-tax states', 'People whose tax software added Form 6251', 'Anyone who paid AMT in a prior year'],
  relatedJourney: ['Understanding new tax rules', 'Investments & crypto'],
  actionRequired: 'If you exercised incentive stock options and kept the shares, have large itemized deductions such as state and local taxes, or have income near the 2026 phase-out thresholds ($500,000 unmarried, $1,000,000 married filing jointly), run Form 6251 or check your software before year-end. If you paid AMT in a prior year because of deferral items such as ISOs, check Form 8801 for a credit.',
  sources: [
    { label: 'IRS — Instructions for Form 6251 (2025), Alternative Minimum Tax—Individuals', url: 'https://www.irs.gov/pub/irs-pdf/i6251.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Draft 2026 Form 6251 (created May 26, 2026; not for filing)', url: 'https://www.irs.gov/pub/irs-dft/f6251--dft.pdf' },
    { label: 'IRS — Instructions for Form 8801 (2025), Credit for Prior Year Minimum Tax', url: 'https://www.irs.gov/pub/irs-pdf/i8801.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the alternative minimum tax?',
    a: 'The AMT is a separate tax imposed in addition to your regular tax. You refigure your income without certain tax benefits, subtract an exemption, and apply AMT rates of 26% and 28% to get your tentative minimum tax. If that is higher than your regular tax, the difference is your AMT.',
  },
  {
    q: 'What were the AMT exemptions for 2025 and 2026?',
    a: 'For 2025: $88,100 for unmarried individuals, $137,000 for married filing jointly or qualifying surviving spouses, and $68,500 for married filing separately. For 2026: $90,100, $140,200, and $70,100. These come from Rev. Proc. 2024-40 and Rev. Proc. 2025-32.',
  },
  {
    q: 'What changed for the AMT in 2026?',
    a: 'The income level where the exemption starts to phase out dropped from $626,350 (unmarried) and $1,252,700 (joint) in 2025 to $500,000 and $1,000,000 in 2026. The exemption also phases out faster: 50 cents per dollar over the threshold in 2026, versus 25 cents in 2025. The 50% rate is calculated from the final 2026 complete phase-out amounts in Rev. Proc. 2025-32.',
  },
  {
    q: 'Why do incentive stock options cause AMT?',
    a: 'For the regular tax, exercising an ISO is generally not income. For the AMT, the spread — the stock\'s fair market value over the price you paid — is generally an adjustment on Form 6251, line 2i, unless you sell the shares in the same year. Your AMT basis in the shares increases by the same amount.',
  },
  {
    q: 'Does the SALT deduction count for the AMT?',
    a: 'No. State and local taxes you deducted on Schedule A are added back on Form 6251, line 2a. If you do not itemize, the standard deduction is added back instead.',
  },
  {
    q: 'Can I get AMT back later?',
    a: 'Partly. The credit for prior year minimum tax on Form 8801 is allowed only for AMT caused by deferral items, such as ISO exercises or depreciation — not exclusion items such as state and local taxes or the standard deduction. The credit is limited each year by how much your regular tax exceeds your tentative minimum tax, and unused amounts carry forward.',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-options-iso-nso',
    cat:  'Investments & Foreign Accounts',
    title: 'Stock Options: ISOs vs. NSOs, Form 3921 and the AMT',
    desc:  'ISO exercises are the most common AMT trigger.',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: 'SALT Deduction: Limits, Income Rules, and Examples',
    desc:  'State and local taxes are added back for the AMT.',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'Other changes that affect 2025 and 2026 returns.',
  },
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP Taxes: Qualifying vs. Disqualifying Dispositions and Form 3922',
    desc:  'Another kind of employee stock plan, taxed differently.',
  },
]

export default function AlternativeMinimumTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Alternative Minimum Tax (AMT): 2025 and 2026 Rules | AskLinTax',
      description: 'How the AMT works: Form 6251, adjustments such as ISOs and SALT, 2025 and 2026 exemptions and phase-out thresholds, the 26% and 28% rates, the new 50% phase-out rate for 2026, and the Form 8801 credit — with examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>alternative minimum tax (AMT)</strong> is a second way of figuring tax that limits how much certain tax benefits can reduce your bill. You figure it on <strong>Form 6251</strong>. You pay AMT only if your <strong>tentative minimum tax</strong> is higher than your regular tax. For <strong>2026</strong>, final IRS figures make the exemption phase out at lower incomes and twice as fast as in 2025, so more high-income taxpayers may owe AMT.
        </p>

        <h2>How the AMT is figured</h2>
        <ArticleTable
          head={['Step', 'What happens', 'Form 6251']}
          rows={[
            ['1. Start with taxable income', 'Begin with taxable income from your return (line 1 is split into 1a and 1b starting with 2025)', 'Line 1'],
            ['2. Add adjustments and preferences', 'Add back items the AMT does not allow, such as state and local taxes or the standard deduction, and the ISO spread', 'Lines 2a–3'],
            ['3. Alternative minimum taxable income (AMTI)', 'The result', 'Line 4'],
            ['4. Subtract the exemption', 'Reduced or eliminated at higher AMTI (the phase-out)', 'Line 5'],
            ['5. Apply 26% and 28% rates', '26% up to the 28% threshold; 28% above it (capital gains keep their lower rates)', 'Line 7'],
            ['6. Compare with regular tax', 'AMT is the tentative minimum tax minus your regular tax, if more than zero', 'Lines 9–11'],
          ]}
        />

        <h2>Common adjustments and preference items</h2>
        <ul>
          <li><strong>Taxes (line 2a):</strong> state and local income, sales, and property taxes deducted on Schedule A are added back. If you take the standard deduction, it is added back instead.</li>
          <li><strong>Incentive stock options (line 2i):</strong> the spread at exercise is generally included for the AMT if you keep the shares past the end of the year. If you sell in the same year, no adjustment is needed.</li>
          <li><strong>Enhanced deduction for seniors (2025):</strong> the 2025 Instructions for Form 6251 say this new deduction is treated as a personal exemption and added back for the AMT (handled on lines 1a–1b).</li>
          <li><strong>Others</strong> include certain tax-exempt private activity bond interest, depreciation differences, and the different AMT treatment of net operating losses and passive activities.</li>
        </ul>

        <h2>2025 and 2026 figures</h2>
        <ArticleTable
          head={['Item', '2025 (Rev. Proc. 2024-40)', '2026 (Rev. Proc. 2025-32)']}
          rows={[
            ['Exemption — married filing jointly or qualifying surviving spouse', '$137,000', '$140,200'],
            ['Exemption — unmarried individuals', '$88,100', '$90,100'],
            ['Exemption — married filing separately', '$68,500', '$70,100'],
            ['Phase-out begins — joint / unmarried / separate', '$1,252,700 / $626,350 / $626,350', '$1,000,000 / $500,000 / $500,000'],
            ['Exemption fully phased out — joint / unmarried / separate', '$1,800,700 / $978,750 / $900,350', '$1,280,400 / $680,200 / $640,200'],
            ['Phase-out rate', '25% of AMTI over the threshold (2025 Form 6251 instructions)', '50% of AMTI over the threshold (calculated below)'],
            ['28% rate applies to taxable excess over', '$239,100 ($119,550 if married filing separately)', '$244,500 ($122,250 if married filing separately)'],
          ]}
        />

        <h2>Where the 2026 50% phase-out rate comes from</h2>
        <p>
          Rev. Proc. 2025-32 gives both the threshold and the complete phase-out amount for 2026. The exemption disappears over a band of AMTI equal to exactly twice the exemption, which means it shrinks by 50 cents for each dollar over the threshold:
        </p>
        <ul>
          <li><strong>Joint:</strong> $1,280,400 − $1,000,000 = $280,400 = 2 × $140,200.</li>
          <li><strong>Unmarried:</strong> $680,200 − $500,000 = $180,200 = 2 × $90,100.</li>
          <li><strong>Separate:</strong> $640,200 − $500,000 = $140,200 = 2 × $70,100.</li>
        </ul>
        <p>
          For 2025, the same check gives a 25% rate: $1,800,700 − $1,252,700 = $548,000 = 4 × $137,000, matching the 25% in the 2025 Exemption Worksheet. Do not confuse the phase-out rate with the 26% and 28% AMT tax rates — they are different things. Rev. Proc. 2025-32 also says the 2025 tax law (Public Law 119-21) made permanent the increased exemption and phase-out threshold amounts that first applied for 2018 through 2025 and that the $1,000,000 amount is not adjusted for inflation for years beginning before 2027.
        </p>

        <h2>2026 Form 6251 is still a draft</h2>
        <p>
          An IRS draft of the 2026 Form 6251 (created May 26, 2026) shows the new line 5 thresholds ($500,000 and $1,000,000) and the 2026 28% bracket ($244,500, with $4,890 subtracted). Drafts are not for filing and can change before the final form is released. When this guide was reviewed in October 2026, the IRS had not yet published 2026 Instructions for Form 6251, in draft or final form; the 50% phase-out rate above comes from the final Rev. Proc. 2025-32 amounts, not from those instructions.
        </p>

        <h2>Examples (simplified)</h2>
        <ArticleTable
          head={['', 'Priya (single, 2025)', 'Priya (single, 2026)', 'Tom and Ana (joint, 2026)']}
          rows={[
            ['AMTI', '$600,000', '$600,000', '$1,100,000'],
            ['Exemption', '$88,100 — below the $626,350 threshold, no phase-out', '$90,100 − 50% × ($600,000 − $500,000) = $40,100', '$140,200 − 50% × ($1,100,000 − $1,000,000) = $90,200'],
            ['Taxable excess', '$511,900', '$559,900', '$1,009,800'],
            ['Tentative minimum tax', '$511,900 × 28% − $4,782 = $138,550', '$559,900 × 28% − $4,890 = $151,882', '$1,009,800 × 28% − $4,890 = $277,854'],
            ['AMT', 'Owed only if $138,550 is more than regular tax', 'Owed only if $151,882 is more than regular tax', 'Owed only if $277,854 is more than regular tax'],
          ]}
        />
        <p>
          The examples assume no capital gains, qualified dividends, or AMT foreign tax credit, and they do not compute regular tax. With the same $600,000 of AMTI, Priya's exemption falls by $48,000 from 2025 to 2026 because of the lower threshold and faster phase-out.
        </p>

        <h2>The AMT credit: Form 8801</h2>
        <ul>
          <li><strong>Deferral items only:</strong> AMT caused by deferral items, such as ISO exercises and depreciation, can create a credit for later years. AMT caused by exclusion items — certain itemized deductions such as taxes, the standard deduction, certain tax-exempt interest, depletion, and the section 1202 exclusion — does not.</li>
          <li><strong>Limit:</strong> the credit you can use each year is limited to your regular tax (after certain credits) minus your tentative minimum tax. Unused credit carries forward.</li>
          <li><strong>Timing:</strong> AMT paid for 2025 can generate a credit on the 2026 Form 8801.</li>
        </ul>

        <h2>Who should check</h2>
        <ul>
          <li>Employees who exercised ISOs and held the shares past year-end.</li>
          <li>Taxpayers with AMTI above the 2026 thresholds, especially unmarried filers above $500,000.</li>
          <li>People with large itemized deductions for state and local taxes.</li>
          <li>Parents of a child subject to the kiddie tax: the child's AMT exemption is limited to earned income plus $9,550 for 2025 or $9,750 for 2026.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Plan before you exercise</div>
          <p>An ISO exercise can create a large AMT bill even though you received no cash. Before exercising, model the AMT for the year with tax software or a tax professional, and keep records of your regular and AMT basis in the shares.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

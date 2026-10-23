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
  id:            '82',
  title:         'ESPP Taxes: Qualifying vs. Disqualifying Dispositions and Form 3922',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal income tax treatment of shares bought through a section 423 employee stock purchase plan (ESPP) for tax years 2025 and 2026, based on Publication 525 (2025), IRS Topic no. 427, Form 3922 and the 2025 Instructions for Form 8949. The formulas follow Publication 525. It does not cover non-qualified (non-section 423) purchase plans, plans outside the United States, or state tax',
  persona:       ['Employees who buy company stock through an ESPP', 'People who received Form 3922', 'Employees deciding when to sell ESPP shares', 'Anyone whose ESPP sale shows the wrong basis on Form 1099-B'],
  relatedJourney: ['Preparing to file', 'Money & Benefits'],
  actionRequired: 'Keep each Form 3922. Before you sell ESPP shares, check whether the sale will be a qualifying disposition (after the later of 2 years from the grant date and 1 year from the purchase date). After you sell, make sure the ordinary income is reported and adjust your basis on Form 8949.',
  sources: [
    { label: 'IRS — Publication 525 (2025), Taxable and Nontaxable Income (statutory stock options; employee stock purchase plans)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Topic no. 427, Stock options', url: 'https://www.irs.gov/taxtopics/tc427' },
    { label: 'IRS — Form 3922 (Rev. April 2025), Transfer of Stock Acquired Through an Employee Stock Purchase Plan Under Section 423(c)', url: 'https://www.irs.gov/pub/irs-pdf/f3922.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do I pay tax when I buy ESPP shares at a discount?',
    a: 'Not under a section 423 plan. Publication 525 says you do not include any amount in income when a statutory option is granted or exercised. Tax comes when you sell or otherwise dispose of the shares.',
  },
  {
    q: 'What is a qualifying disposition?',
    a: 'A sale after the end of the later of 2 years after the option was granted (usually the start of the offering period) or 1 year after the shares were transferred to you (usually the purchase date). Selling earlier is a disqualifying disposition.',
  },
  {
    q: 'Is a qualifying disposition completely tax-free?',
    a: 'No. If the option price was less than the stock\'s value at grant (a discount), part of your gain is still ordinary income — the lesser of the discount figured at the grant date or your actual gain. The rest is capital gain.',
  },
  {
    q: 'If I sell at a loss in a disqualifying disposition, do I still have ordinary income?',
    a: 'Yes. In a disqualifying disposition, the ordinary income is the stock\'s value on the purchase date minus the price you paid, and Publication 525 says it is not limited to your gain. You add that amount to your basis, which can produce a capital loss.',
  },
  {
    q: 'Where does the ordinary income go on my return?',
    a: 'Your employer or former employer should include it as wages in box 1 of Form W-2. If it is not included, Publication 525 says to report it on Schedule 1 (Form 1040), line 8k.',
  },
  {
    q: 'Why does my Form 1099-B basis look too low?',
    a: 'For options granted after 2013, the basis on Form 1099-B will not include the ordinary income. Increase your basis by that amount on Form 8949 (code B) so you are not taxed twice.',
  },
]

const RELATED = [
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU Taxes: Vesting, W-2 Income and Cost Basis When You Sell',
    desc:  'How restricted stock units are taxed.',
  },
  {
    href: '/library/investment/stock-options-iso-nso',
    cat:  'Investments & Foreign Accounts',
    title: 'Stock Options: ISOs vs. NSOs, Form 3921 and the AMT',
    desc:  'The other kind of statutory option.',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: 'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
    desc:  'Fixing basis on Form 8949.',
  },
]

export default function EsppTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'ESPP Taxes: Qualifying vs. Disqualifying Dispositions | AskLinTax',
      description: 'How section 423 ESPP shares are taxed: holding periods, qualifying and disqualifying dispositions, ordinary income formulas, capital gain or loss, Form 3922, and basis adjustments.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          An <strong>employee stock purchase plan (ESPP)</strong> under <strong>section 423</strong> lets you buy your employer's stock, often at a discount of up to 15%. You owe <strong>no tax when you buy</strong>. When you <strong>sell</strong>, part of your profit may be <strong>ordinary income</strong> (wages) and the rest a <strong>capital gain or loss</strong>. How it is split depends on whether the sale is a <strong>qualifying</strong> or <strong>disqualifying</strong> disposition.
        </p>

        <h2>Section 423 plans: the basics</h2>
        <ul>
          <li>ESPP options are <strong>statutory stock options</strong>. You must be an employee of the company (or a related company) from the grant date until 3 months before you exercise, and the option must not be transferable except at death.</li>
          <li>The option price can be as low as <strong>85%</strong> of the stock's value. Some plans use the lower of the value at the start of the offering period (grant) or at the purchase date (exercise).</li>
          <li>Your <strong>basis</strong> starts as the price you paid. The timing of payroll deductions does not affect basis, and your holding period begins the day after the purchase.</li>
        </ul>

        <h2>Qualifying vs. disqualifying dispositions</h2>
        <ArticleTable
          head={['', 'Qualifying disposition', 'Disqualifying disposition']}
          rows={[
            ['When', 'After the later of 2 years after the grant date and 1 year after the shares were transferred to you', 'Any earlier sale or other disposition'],
            ['Ordinary income (wages)', 'If the option was granted at a discount: the lesser of (1) the stock\'s value at grant minus the option price, or (2) the sale price minus what you paid', 'The stock\'s value on the purchase date minus the price you paid — not limited to your gain'],
            ['Capital gain or loss', 'Sale price minus (price paid + ordinary income)', 'Sale price minus (price paid + ordinary income)'],
            ['If you sell at a loss', 'Capital loss, and no ordinary income', 'You still have the ordinary income, plus a larger capital loss'],
          ]}
        />
        <p>
          For a qualifying disposition, if the option price was not fixed at the grant date (as in a plan that uses the lower of two prices), Publication 525 says to figure the option price as if the option had been exercised at the grant date.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Facts for both examples:</strong> Ana's offering period starts on January 2, 2024 (the grant date), when the stock is worth <strong>$40</strong>. On June 28, 2024 (the purchase date), the stock is worth <strong>$50</strong>. Her plan price is 85% of the lower of the two values: 85% × $40 = <strong>$34</strong>. She buys 100 shares for $3,400.
        </p>
        <p>
          <strong>Qualifying disposition:</strong> she sells all 100 shares on March 16, 2026, for $60 a share. That is after January 2, 2026 (2 years after grant) and after June 28, 2025 (1 year after purchase).
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Sale proceeds (100 × $60)', '$6,000'],
            ['Total gain ($6,000 − $3,400)', '$2,600'],
            ['Discount at grant: $40 − ($40 × 85% = $34), × 100 shares', '$600'],
            ['Ordinary income: the lesser of $600 or $2,600', '$600'],
            ['Adjusted basis ($3,400 + $600)', '$4,000'],
            ['Long-term capital gain ($6,000 − $4,000)', '$2,000'],
          ]}
        />
        <p>
          <strong>Disqualifying disposition:</strong> instead, she sells all 100 shares on September 15, 2025, for $60 a share — before January 2, 2026.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Ordinary income: ($50 value on purchase date − $34) × 100', '$1,600'],
            ['Adjusted basis ($3,400 + $1,600)', '$5,000'],
            ['Capital gain ($6,000 − $5,000)', '$1,000'],
            ['Holding period: June 28, 2024 to September 15, 2025', 'More than 1 year, so long-term'],
          ]}
        />
        <p>
          <strong>Disqualifying sale at a loss:</strong> if she had sold on September 15, 2025, for $45 a share ($4,500), she would still have $1,600 of ordinary income, and a capital loss of $500 ($4,500 − $5,000).
        </p>

        <h2>Form 3922 and your Form 1099-B</h2>
        <p>
          Your employer should give you <strong>Form 3922</strong>. It shows the grant date (box 1), purchase date (box 2), value per share on the grant date (box 3) and on the purchase date (box 4), the price paid per share (box 5), the number of shares (box 6), the date legal title transferred (box 7), and — when the price was not fixed at grant — the price per share figured as if the option were exercised on the grant date (box 8). For options granted after 2013, the basis on Form 1099-B will not include your ordinary income, so add it on <a href="/library/investment/cost-basis-form-1099-b/">Form 8949</a> with code B.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Reporting the whole gain as capital gain</strong> and leaving out the ordinary income.</li>
          <li><strong>Reporting the ordinary income twice</strong> — once in W-2 wages and again as capital gain because the basis was not adjusted.</li>
          <li><strong>Confusing the two tests:</strong> the qualifying test (2 years from grant and 1 year from purchase) is different from the 1-year test for long-term capital gain.</li>
          <li><strong>Assuming a loss means no ordinary income</strong> in a disqualifying disposition.</li>
          <li><strong>Losing Form 3922.</strong> You need its dates and values to figure the split.</li>
        </ul>

        <h2>Forms you will see</h2>
        <ArticleTable
          head={['Form', 'Use']}
          rows={[
            ['Form 3922', 'Dates, values, and prices for ESPP shares'],
            ['Form W-2', 'Ordinary income from the disposition, usually in box 1'],
            ['Form 1099-B', 'Sale proceeds and the basis the broker reported'],
            ['Form 8949 and Schedule D', 'Capital gain or loss, with a basis adjustment (code B) when needed'],
            ['Schedule 1 (Form 1040), line 8k', 'Ordinary income not included on your W-2'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Section 423 plans only</div>
          <p>These rules apply to employee stock purchase plans that meet section 423. A plan that does not qualify is taxed under the nonstatutory option rules. Check your plan documents. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

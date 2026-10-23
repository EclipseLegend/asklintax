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
  id:            '81',
  title:         'RSU Taxes: Vesting, W-2 Income and Cost Basis When You Sell',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal income tax treatment of restricted stock units (RSUs) settled in stock for tax years 2025 and 2026, based on Publication 525 (2025), the 2025 Instructions for Form 8949, the 2026 Instructions for Form 1099-B, Publication 15 (2026), and the IRS Equity (Stock)-Based Compensation Audit Technique Guide (Publication 5992, June 2024), which the IRS says is not an official pronouncement of the law. It does not cover cash-settled RSUs in detail, deferred-settlement plans, nonresident sourcing, or state tax',
  persona:       ['Employees of public companies who receive RSUs', 'Tech workers selling vested shares', 'People who see a zero or low cost basis on Form 1099-B', 'Employees planning withholding on vesting income'],
  relatedJourney: ['Preparing to file', 'Money & Benefits'],
  actionRequired: 'When your RSUs settle, note the number of shares delivered, the fair market value per share, and the shares withheld for taxes. When you sell, compare the basis on Form 1099-B with the value already included in your W-2 wages, and correct it on Form 8949 if needed.',
  sources: [
    { label: 'IRS — Publication 525 (2025), Taxable and Nontaxable Income (restricted property; qualified equity grants)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Equity (Stock)-Based Compensation Audit Technique Guide (Publication 5992, June 2024)', url: 'https://www.irs.gov/pub/irs-pdf/p5992.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949, Sales and Other Dispositions of Capital Assets', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — 2026 Instructions for Form 1099-B', url: 'https://www.irs.gov/pub/irs-pdf/i1099b.pdf' },
    { label: 'IRS — Publication 15 (2026), Employer\'s Tax Guide (supplemental wage withholding)', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Topic no. 427, Stock options', url: 'https://www.irs.gov/taxtopics/tc427' },
  ],
}

const FAQS = [
  {
    q: 'Are RSUs taxed when they are granted?',
    a: 'Generally no. The IRS audit technique guide explains that RSUs are an unfunded promise to deliver stock or cash later and generally are not taxable at grant if they meet, or are exempt from, the deferred compensation rules. A section 83(b) election is not available for RSUs because no property is transferred at grant.',
  },
  {
    q: 'When do I have income from stock-settled RSUs?',
    a: 'For income tax, stock-settled RSUs are generally taxed when the shares are actually delivered to you. For most public-company plans this happens at or shortly after vesting, but some plans defer delivery, and the timing follows the plan. The value of the shares, minus anything you paid, is compensation that your employer generally includes in your W-2 wages.',
  },
  {
    q: 'My company sold some shares for taxes. Is that a separate sale I report?',
    a: 'Shares withheld or sold to cover taxes are part of how the compensation was paid. Use your W-2 and your broker statements to confirm how it was handled; if the broker issues a Form 1099-B for shares sold to cover taxes, the sale price is usually close to the value already included in your wages, so the gain or loss is usually small.',
  },
  {
    q: 'Why does my Form 1099-B show a cost basis of zero?',
    a: 'For equity compensation granted after 2013, brokers may not add the compensation income to the basis they report. The 2026 Form 1099-B instructions say brokers cannot increase initial basis for income from the vesting or exercise of these arrangements. You correct the basis yourself on Form 8949.',
  },
  {
    q: 'Is the gain when I sell short-term or long-term?',
    a: 'It depends on how long you hold the shares after you receive them. If you sell one year or less after receiving the shares, any gain or loss is short-term; if you hold them more than one year, it is long-term.',
  },
  {
    q: 'What is a section 83(i) election?',
    a: 'It lets certain employees of private companies with broad-based plans defer income from qualified stock received from RSUs or options for up to 5 years. It is not available to everyone — for example, 1% owners, the CEO or CFO, and the four highest compensated officers are excluded — and it is made under Notice 2018-97, not on Form 15620.',
  },
]

const RELATED = [
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: 'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
    desc:  'How to fix a wrong basis on your broker statement.',
  },
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP Taxes: Qualifying vs. Disqualifying Dispositions and Form 3922',
    desc:  'If you also buy shares through an employee stock purchase plan.',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'Short-term and long-term rates for 2025 and 2026.',
  },
]

export default function RsuTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'RSU Taxes: Vesting, W-2 Income and Cost Basis | AskLinTax',
      description: 'How restricted stock units are taxed: grant, vesting and settlement, W-2 income and share withholding, holding period, and fixing a zero cost basis on Form 1099-B with Form 8949.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>restricted stock unit (RSU)</strong> is a promise from your employer to give you shares (or cash) later, usually after you meet a vesting schedule. RSUs are generally <strong>not taxed when granted</strong>. When stock-settled RSUs are <strong>delivered to you</strong>, the value of the shares is <strong>compensation income</strong> — usually included in your <strong>W-2 wages</strong>. That value becomes your <strong>cost basis</strong> in the shares. When you later sell, only the change in value after delivery is a capital gain or loss.
        </p>
        <p>
          The most common mistake is paying tax twice: Form 1099-B often shows a basis of <strong>$0</strong> or too low a basis for RSU shares, and you must correct it on <strong>Form 8949</strong>.
        </p>

        <h2>Grant, vesting, and settlement</h2>
        <ArticleTable
          head={['Stage', 'What happens', 'Federal income tax (stock-settled RSUs)']}
          rows={[
            ['Grant', 'You receive the promise of future shares', 'Generally no income'],
            ['Vesting', 'You meet the service or performance condition', 'Generally the taxable event for typical plans, because shares are usually delivered at or shortly after vesting'],
            ['Settlement (delivery)', 'Shares are actually transferred to you', 'Fair market value of the shares, minus any amount you paid, is compensation income'],
            ['Sale', 'You sell the shares', 'Capital gain or loss: sale price minus your basis'],
          ]}
        />
        <p>
          The IRS audit technique guide says stock-settled RSUs are subject to section 83 only when the stock is actually transferred to you. If your plan delivers shares later than vesting, the timing follows the plan and the deferred compensation rules — check your plan documents and W-2. Social Security and Medicare taxes on RSUs can follow a special timing rule (section 3121(v)(2)), which your employer applies through payroll.
        </p>

        <h2>Withholding: why you may still owe tax</h2>
        <p>
          RSU income is generally treated as <strong>supplemental wages</strong>. Under Publication 15 (2026), employers may withhold federal income tax on supplemental wages at a flat <strong>22%</strong>, and must withhold <strong>37%</strong> on supplemental wages above <strong>$1 million</strong> for the year. If your actual tax rate is higher than 22%, the withholding may not cover your tax. Many employers withhold shares (or sell some shares) to cover the withholding. Consider adjusting your W-4 or making <a href="/library/small-business/quarterly-taxes/">estimated tax payments</a> — see <a href="/library/individual/owe-taxes-withholding-w4/">why you may owe at filing time</a>.
        </p>

        <h2>Cost basis and holding period</h2>
        <ul>
          <li><strong>Basis:</strong> generally the value included in your income when the shares were delivered (plus anything you paid).</li>
          <li><strong>Holding period:</strong> starts when you receive the shares. Selling one year or less after that gives a short-term gain or loss; more than one year gives a long-term gain or loss.</li>
          <li><strong>Broker reporting:</strong> for awards granted after 2013, the basis on Form 1099-B won't include the compensation income. The 2026 Form 1099-B instructions say a broker cannot increase initial basis for income recognized on the vesting or exercise of equity-based compensation.</li>
        </ul>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Lin</strong>'s 100 RSUs vest and are delivered on March 3, 2025, when the stock is worth <strong>$150</strong> a share. Her employer withholds 22% for federal income tax by keeping 22 shares.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Compensation income included in her W-2 wages (100 × $150)', '$15,000'],
            ['Federal income tax withheld (22% × $15,000, paid with 22 shares)', '$3,300'],
            ['Shares delivered to her brokerage account', '78'],
            ['Her basis in those shares (78 × $150)', '$11,700'],
            ['She sells all 78 shares in October 2025 at $160', '$12,480'],
            ['Correct short-term gain ($12,480 − $11,700)', '$780'],
          ]}
        />
        <p>
          Under the Form 1099-B instructions, brokers may not add the wage income from RSUs granted after 2013 to the reported basis, so the basis shown is often $0. If her Form 1099-B shows a $0 basis reported to the IRS (Form 8949 Part I, box A), using it unchanged would report a $12,480 gain — taxing the $11,700 she already paid tax on as wages a second time. She enters $0 in column (e), code <strong>B</strong> in column (f), and an adjustment of <strong>($11,700)</strong> in column (g), using the Worksheet for Basis Adjustments in the Form 8949 instructions, so her reported gain is $780. The ($11,700) figure applies only because the reported basis is $11,700 too low: if the reported basis were a different amount, the adjustment is the difference between that amount and $11,700, and if it already showed $11,700, no adjustment is needed. If the broker did not report the basis to the IRS (box B), she instead enters $11,700 in column (e), code B in column (f), and -0- in column (g).
        </p>

        <h2>Section 83(i): deferral for some private-company employees</h2>
        <p>
          Publication 525 explains that "qualified employees" of private corporations with a written plan that offers RSUs or options to at least 80% of U.S. employees may elect under section 83(i) to defer income on "qualified stock" for up to 5 years after vesting. Excluded employees include 1% owners, current or former CEOs and CFOs and their families, and the four highest compensated officers. The election must be made within 30 days after the stock first becomes transferable or not subject to a substantial risk of forfeiture, follows Notice 2018-97, and cannot be made on Form 15620. Withholding applies at the highest rate. This is rare for public-company employees.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Using a $0 basis from Form 1099-B</strong> and paying tax twice.</li>
          <li><strong>Assuming 22% withholding covers your tax.</strong> It may not if your rate is higher.</li>
          <li><strong>Counting the holding period from the grant date.</strong> It starts when you receive the shares.</li>
          <li><strong>Trying to make a section 83(b) election for RSUs.</strong> It is not available because no property is transferred at grant.</li>
          <li><strong>Assuming every RSU is taxed on the vesting date.</strong> The taxable event is generally delivery of the shares; deferred-settlement plans can differ.</li>
        </ul>

        <h2>Forms you will see</h2>
        <ArticleTable
          head={['Form', 'What it shows']}
          rows={[
            ['Form W-2', 'RSU income included in wages (box 1), with withholding'],
            ['Form 1099-B', 'Sale proceeds and the basis the broker reported (often without the compensation income)'],
            ['Form 8949 and Schedule D', 'Where you report the sale and correct the basis (code B)'],
            ['Supplemental statement from your broker', 'Many brokers provide an adjusted-basis statement for equity compensation'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Plans differ</div>
          <p>The IRS audit technique guide is not an official pronouncement of the law. Deferred-settlement RSUs, cash-settled RSUs, moves between countries, and state taxes can change the result. Check your plan documents and your W-2, and consider professional help for unusual plans.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

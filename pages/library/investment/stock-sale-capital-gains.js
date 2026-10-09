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
  id:            '61',
  title:         'I sold stock — how are capital gains taxed?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who sell stocks or similar securities held in a taxable account. Rate thresholds are shown for tax years 2025 and 2026 separately. Collectibles, small business stock, real estate, crypto, and foreign-account reporting have their own rules or guides',
  persona:       ['First-time investors who sold shares', 'Employees who sold company stock', 'People who received a Form 1099-B', 'Anyone deciding when to sell'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'Figure each sale\'s gain or loss (what you sold for minus your cost basis), sort it into short-term or long-term by how long you held the shares, and report it on Form 8949 and Schedule D using your Form 1099-B.',
  sources: [
    { label: 'IRS — Topic no. 409, Capital gains and losses', url: 'https://www.irs.gov/taxtopics/tc409' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Instructions for Form 8949 (2025)', url: 'https://www.irs.gov/instructions/i8949' },
    { label: 'IRS — Instructions for Schedule D (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sd' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Topic no. 559, Net investment income tax', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: 'My stock went up but I haven\'t sold it. Do I owe tax?',
    a: 'No. A gain is generally taxed when it is realized — when you sell. An increase in value you haven\'t sold is an unrealized gain and is not reported as a capital gain.',
  },
  {
    q: 'I held the shares for exactly one year. Is that long-term?',
    a: 'Not quite. Long-term means held more than one year. You generally count from the day after you bought the shares up to and including the day you sold them.',
  },
  {
    q: 'Can my long-term gain really be taxed at 0%?',
    a: 'It can, depending on your total taxable income. For tax year 2025, the 0% rate applies to long-term gains to the extent taxable income is up to $48,350 for single filers or $96,700 for married couples filing jointly. Gains above that range are taxed at 15% or 20%.',
  },
  {
    q: 'My Form 1099-B doesn\'t show my cost basis. What do I do?',
    a: 'You still need to report the correct basis — generally what you paid, including certain costs. Form 8949 has separate boxes for sales where the broker did not report basis to the IRS. Use your purchase records to fill it in.',
  },
  {
    q: 'I reinvested the money right away. Do I still owe tax on the sale?',
    a: 'Yes. Selling is the taxable event; buying something else with the proceeds does not undo it. (Selling at a loss and buying the same stock back within 30 days is a different problem — see the capital losses guide.)',
  },
]

const RELATED = [
  {
    href: '/library/investment/capital-losses',
    cat:  'Investments & Foreign Accounts',
    title: 'I lost money on stocks — can I deduct it?',
    desc:  'Netting, the $3,000 limit, carryovers, and wash sales.',
  },
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I have to report bank interest and dividends?',
    desc:  'Qualified dividends use the same rates as long-term gains.',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Crypto taxes explained: when is crypto taxable?',
    desc:  'Crypto is also property, with its own reporting details.',
  },
]

export default function StockSaleCapitalGainsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Selling Stock: How Capital Gains Are Taxed (2025 & 2026 Rates) | AskLinTax',
      description: 'Sold stock? How gains are figured, short-term vs. long-term holding periods, the 0%, 15%, and 20% rates for 2025 and 2026, Form 1099-B, Form 8949, and Schedule D.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When you <strong>sell</strong> stock for more than your cost, the profit is a <strong>capital gain</strong> and is generally taxable. How much tax you pay depends mainly on <strong>how long you held the shares</strong>. Shares held one year or less produce a <strong>short-term</strong> gain, taxed at your ordinary income tax rates. Shares held more than one year produce a <strong>long-term</strong> gain, taxed at <strong>0%, 15%, or 20%</strong> depending on your taxable income. There is no single flat rate for all stock gains.
        </p>

        <h2>Realized vs. unrealized</h2>
        <p>
          A gain is generally taxed only when it is <strong>realized</strong> — when you sell. If your shares went up but you still own them, that is an unrealized gain and nothing is reported as a capital gain yet.
        </p>

        <h2>Step 1: figure the gain or loss</h2>
        <p>
          For each sale, your gain or loss is generally the amount you received minus your <strong>cost basis</strong>. Basis usually starts with what you paid for the shares, including certain costs of buying them. If you bought the same stock at different times, each lot can have a different basis and holding period.
        </p>

        <h2>Step 2: short-term or long-term?</h2>
        <ArticleTable
          head={['Held for', 'Type', 'How it is generally taxed']}
          rows={[
            ['One year or less', 'Short-term', 'At your ordinary income tax rates, like wages'],
            ['More than one year', 'Long-term', 'At 0%, 15%, or 20%, depending on your taxable income'],
          ]}
        />
        <p>
          You generally count from the day after you acquired the shares up to and including the day you sold them. Shares you <strong>inherited</strong> are treated as long-term regardless of how long you held them.
        </p>

        <h2>Long-term capital gain rates by tax year</h2>
        <p>
          The rate brackets are based on your <strong>total taxable income</strong>, not on the gain alone. The thresholds are adjusted for inflation every year, so use the table for the year of the sale.
        </p>
        <ArticleTable
          head={['Tax year 2025 — filing status', '0% rate up to', '15% rate up to', '20% rate above']}
          rows={[
            ['Single', '$48,350', '$533,400', '$533,400'],
            ['Married filing jointly', '$96,700', '$600,050', '$600,050'],
            ['Married filing separately', '$48,350', '$300,000', '$300,000'],
            ['Head of household', '$64,750', '$566,700', '$566,700'],
          ]}
        />
        <ArticleTable
          head={['Tax year 2026 — filing status', '0% rate up to', '15% rate up to', '20% rate above']}
          rows={[
            ['Single', '$49,450', '$545,500', '$545,500'],
            ['Married filing jointly', '$98,900', '$613,700', '$613,700'],
            ['Married filing separately', '$49,450', '$306,850', '$306,850'],
            ['Head of household', '$66,200', '$579,600', '$579,600'],
          ]}
        />
        <p>
          Sources: IRS Rev. Proc. 2024-40 (2025) and Rev. Proc. 2025-32 (2026). The Schedule D instructions include the worksheet that applies these rates to your return.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ A separate 3.8% tax at higher incomes</div>
          <p>The net investment income tax is a separate 3.8% tax that can apply to investment income, including capital gains, when modified adjusted gross income exceeds $200,000 (single or head of household), $250,000 (married filing jointly), or $125,000 (married filing separately). These thresholds are not adjusted for inflation.</p>
        </div>

        <h2>Step 3: report it</h2>
        <ol>
          <li><strong>Form 1099-B</strong> from your broker lists your sales, and often your basis and whether each sale is short-term or long-term.</li>
          <li><strong>Form 8949</strong>: short-term sales go in Part I and long-term sales in Part II. The box you check depends on whether the broker reported your basis to the IRS.</li>
          <li><strong>Schedule D</strong> totals your gains and losses and carries the result to your Form 1040.</li>
        </ol>
        <p>
          <strong>Exception:</strong> not every sale has to be listed on Form 8949. If your Form 1099-B shows that basis was reported to the IRS, shows no adjustments, and the sale needs no correction or adjustment (and is not a collectible), the Schedule D and Form 8949 instructions let you report the totals directly on Schedule D line 1a (short-term) or line 8a (long-term). Sales where basis was not reported, or where the basis shown is wrong, still go on Form 8949.
        </p>

        <h2>Example (illustrative)</h2>
        <p>
          In 2023, Mei bought 100 shares for $4,000. In 2025 she sold them for $9,000. She held them more than one year, so she has a <strong>$5,000 long-term gain</strong>. As a single filer, the part of that gain that falls within taxable income up to $48,350 would be taxed at 0%, and the part above it at 15%. If she had sold after only ten months, the same $5,000 would be a short-term gain taxed at her ordinary rates.
        </p>

        <h2>Exceptions to know about</h2>
        <ul>
          <li>Gains on <strong>collectibles</strong> can be taxed at up to 28%, and some gain on real property (unrecaptured section 1250 gain) at up to 25%.</li>
          <li>Qualified small business stock has its own rules.</li>
          <li><strong>Crypto</strong> is also property but has its own reporting details — see <a href="/library/investment/crypto-tax/">Crypto taxes explained</a>.</li>
          <li>A brokerage account <strong>abroad</strong> also raises FBAR and Form 8938 questions — see <a href="/library/investment/foreign-brokerage-account/">Foreign brokerage accounts and stocks</a>.</li>
        </ul>
        <p>
          If you sold at a loss, see <a href="/library/investment/capital-losses/">I lost money on stocks — can I deduct it?</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

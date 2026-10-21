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
  id:            '85',
  title:         'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains cost basis for stock and fund sales reported on Form 1099-B for tax years 2025 and 2026, based on the 2026 Instructions for Form 1099-B, the 2025 Form 8949 and its instructions, the 2025 Instructions for Schedule D, Publication 550 (2025), and Publication 551 (Rev. December 2025). It covers individuals selling securities in taxable accounts; it does not cover dealers, traders with mark-to-market elections, options strategies, or state tax',
  persona:       ['Investors who received Form 1099-B', 'Employees selling company stock', 'People who inherited or were given shares', 'Anyone whose broker shows missing or wrong basis'],
  relatedJourney: ['Preparing to file', 'Money & Benefits'],
  actionRequired: 'For each sale on Form 1099-B, check whether the basis was reported to the IRS and whether it is correct. Keep purchase records, reinvested dividends, gift and inheritance records, and equity compensation statements, and correct any wrong basis on Form 8949.',
  sources: [
    { label: 'IRS — 2026 Instructions for Form 1099-B, Proceeds From Broker and Barter Exchange Transactions', url: 'https://www.irs.gov/pub/irs-pdf/i1099b.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — Form 8949 (2025), Sales and Other Dispositions of Capital Assets', url: 'https://www.irs.gov/pub/irs-pdf/f8949.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule D (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Publication 551 (Rev. December 2025), Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: 'What is a covered security?',
    a: 'A security for which the broker must report your basis to the IRS. For example, stock acquired for cash in an account after 2010, mutual fund and similar shares eligible for average basis acquired after 2011, and certain debt instruments and options acquired after 2013 or 2015. Older or transferred-in shares are often noncovered.',
  },
  {
    q: 'My Form 1099-B has no basis. What do I do?',
    a: 'You still report your correct basis. Report the sale on Form 8949 in the box for transactions whose basis was not reported to the IRS (box B or E), and enter your basis from your own records in column (e).',
  },
  {
    q: 'Do I have to list every sale on Form 8949?',
    a: 'Not always. If your Form 1099-B shows that basis was reported to the IRS, and you need no adjustment or correction (and the sale is not a collectible), you can report the totals directly on Schedule D, line 1a (short-term) or line 8a (long-term).',
  },
  {
    q: 'Which shares did I sell if I bought at different times?',
    a: 'If you adequately identify the shares you sell, your basis is the cost of those shares. If you cannot identify them, Publication 550 says the basis is that of the shares you acquired first (first in, first out). Mutual fund shares may use average basis.',
  },
  {
    q: 'What basis do I use for inherited shares?',
    a: 'Generally the fair market value on the date of death (or the alternate valuation date if the estate elected it). If the estate filed Form 706, you may receive Schedule A (Form 8971) and may be required to use that value. Report the sale as long-term and enter "INHERITED" in column (b) of Form 8949.',
  },
  {
    q: 'What basis do I use for shares I received as a gift?',
    a: 'Generally the donor\'s adjusted basis. If the shares were worth less than the donor\'s basis when you received them, use the donor\'s basis to figure a gain and the value at the time of the gift to figure a loss; if the sale price falls between the two, you have neither gain nor loss.',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'Short-term and long-term rates for 2025 and 2026.',
  },
  {
    href: '/library/investment/capital-losses',
    cat:  'Investments & Foreign Accounts',
    title: 'I lost money on stocks — can I deduct it?',
    desc:  'Loss limits and wash sales.',
  },
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU Taxes: Vesting, W-2 Income and Cost Basis When You Sell',
    desc:  'The most common reason a basis is wrong.',
  },
]

export default function CostBasisForm1099BPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Cost Basis and Form 1099-B: Covered Shares and Form 8949 | AskLinTax',
      description: 'How cost basis works for stock sales: covered vs. noncovered securities, adjusted basis, stock compensation, gifted and inherited shares, Form 8949 boxes and codes, and wash sales.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Your <strong>cost basis</strong> is generally what you paid for an investment, adjusted for certain events. When you sell, your gain or loss is the sale proceeds minus your basis. Your broker reports the sale on <strong>Form 1099-B</strong> and, for <strong>covered securities</strong>, also reports your basis to the IRS. But the basis on the form is not always complete or correct — and <strong>you are responsible</strong> for reporting the right amount on <strong>Form 8949</strong> and <strong>Schedule D</strong>.
        </p>

        <h2>Covered vs. noncovered securities</h2>
        <ArticleTable
          head={['Type of security', 'Covered (basis reported to the IRS) if acquired for cash in an account']}
          rows={[
            ['Stock (other than stock eligible for average basis)', 'After 2010'],
            ['Mutual fund and other stock eligible for the average basis method', 'After 2011'],
            ['Certain debt instruments and options', 'After 2013 (and more complex debt instruments after 2015)'],
            ['Securities futures contracts', 'Entered into after 2013'],
            ['Securities transferred in from another broker', 'Covered if the transfer statement reports them as covered'],
          ]}
        />
        <p>
          Shares bought before those dates, or transferred in without covered-security information, are generally <strong>noncovered</strong>: the broker may leave basis blank or report it to you without reporting it to the IRS. Digital assets are reported on Form 1099-DA, not Form 1099-B — see <a href="/library/investment/form-1099-da/">Form 1099-DA</a>.
        </p>

        <h2>Adjusted basis: what changes it</h2>
        <ul>
          <li><strong>Commissions and fees</strong> paid to buy generally add to basis (and the proceeds are reduced by selling commissions).</li>
          <li><strong>Reinvested dividends</strong> buy new shares with their own basis — and you already reported those dividends as income.</li>
          <li><strong>Stock compensation:</strong> income you reported as wages for RSUs, ESPPs, or options is part of your basis, but for awards granted after 2013 it is not included in the basis on Form 1099-B.</li>
          <li><strong>Wash sales:</strong> a disallowed loss is added to the basis of the replacement shares.</li>
          <li><strong>Stock splits and stock dividends</strong> spread your existing basis over more shares.</li>
        </ul>

        <h2>Gifted and inherited shares</h2>
        <ArticleTable
          head={['How you got the shares', 'Basis', 'Holding period']}
          rows={[
            ['Gift, when the value at the gift was at least the donor\'s basis', 'Donor\'s adjusted basis (increased by some or all gift tax paid, depending on the date of the gift)', 'Includes the donor\'s holding period'],
            ['Gift, when the value at the gift was less than the donor\'s basis', 'Donor\'s basis for figuring a gain; value at the gift for figuring a loss', 'Depends on which basis applies'],
            ['Inheritance', 'Generally the value at the date of death (or alternate valuation date)', 'Generally long-term regardless of how long you held the shares'],
          ]}
        />

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Gift with a built-in loss:</strong> using the rule in Publication 551, Kevin's aunt gives him shares with an adjusted basis of $10,000 when they are worth $8,000. If he sells them for $12,000, he has a $2,000 gain (from the $10,000 basis). If he sells for $7,000, he has a $1,000 loss (from the $8,000 value). If he sells for $9,000, he has neither gain nor loss.
        </p>
        <p>
          <strong>Inheritance:</strong> Jenny's father bought shares for $20,000. They were worth $50,000 on the date he died. Her basis is generally $50,000. If she sells them three months later for $52,000, she has a $2,000 long-term gain, and enters "INHERITED" in column (b) of Form 8949.
        </p>
        <p>
          <strong>Basis reported to the IRS, but wrong:</strong> David sells shares for $6,000. His Form 1099-B shows a basis of $1,000 reported to the IRS, but his correct basis is $4,000 because $3,000 of compensation income was not included. He reports it with box A or D checked, enters $1,000 in column (e), code B in column (f), and an adjustment of ($3,000) in column (g), for a gain of $2,000.
        </p>

        <h2>Form 8949 and Schedule D</h2>
        <ArticleTable
          head={['Form 8949 box', 'Use for']}
          rows={[
            ['A (short-term) / D (long-term)', 'Form 1099-B shows basis was reported to the IRS'],
            ['B (short-term) / E (long-term)', 'Form 1099-B shows basis was not reported to the IRS'],
            ['C (short-term) / F (long-term)', 'Not reported on Form 1099-B (and not a digital asset)'],
            ['G–L', 'Digital asset transactions (new for 2025)'],
          ]}
        />
        <ul>
          <li><strong>Code B</strong> — the basis on the form is incorrect. With box A or D, enter the basis shown on the form and correct it in column (g) using the Worksheet for Basis Adjustments; with box B or E, enter the correct basis in column (e).</li>
          <li><strong>Code W</strong> — a wash sale loss is not deductible. Enter the disallowed loss as a positive amount in column (g). If the wash sale amount in box 1g of Form 1099-B is wrong, correct it.</li>
          <li><strong>Exception 1</strong> — if basis was reported to the IRS and no adjustment is needed, you can report totals directly on Schedule D, line 1a or 8a, instead of listing each sale.</li>
        </ul>

        <h2>Common broker reporting problems</h2>
        <ul>
          <li><strong>Zero or low basis for equity compensation</strong> (RSUs, ESPPs, options).</li>
          <li><strong>Missing basis for transferred-in or older shares</strong> (noncovered securities).</li>
          <li><strong>Wash sales across different accounts or brokers</strong> that one broker cannot see — you still apply the wash sale rules.</li>
          <li><strong>Inherited shares shown with the decedent's original basis</strong> instead of the date-of-death value.</li>
          <li><strong>Short-term vs. long-term errors</strong> for gifted or inherited shares.</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ The broker's form is a starting point</div>
          <p>The IRS matches Form 1099-B to your return, so report the proceeds shown, but correct the basis when it is wrong and keep records that support your correction. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

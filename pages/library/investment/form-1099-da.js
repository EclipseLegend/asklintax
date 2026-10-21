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
  id:            '84',
  title:         'Form 1099-DA: What Crypto Brokers Report for 2025 and 2026',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains broker reporting of digital asset sales on Form 1099-DA for tax years 2025 and 2026, based on the final regulations (T.D. 10000, July 9, 2024), the 2026 Instructions for Form 1099-DA, the IRS digital assets pages, Revenue Procedure 2024-28, and Notices 2024-56, 2024-57, 2025-7, and 2025-33, plus the 2025 Form 8949 and its instructions. It covers custodial brokers; the final regulations do not include reporting requirements for decentralized or non-custodial brokers. It does not cover broker obligations in detail or state tax',
  persona:       ['People who sell crypto on an exchange or app', 'Anyone who received a Form 1099-DA', 'Crypto holders with multiple wallets and accounts', 'People who trade through decentralized platforms or self-custody wallets'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Collect every Form 1099-DA, but keep your own records too: a 2025 Form 1099-DA generally shows gross proceeds without basis, and many transactions are not reported at all. Report every sale or exchange on Form 8949 using the digital asset boxes (G through L), with your own basis where the form shows none.',
  sources: [
    { label: 'IRS — Digital assets', url: 'https://www.irs.gov/filing/digital-assets' },
    { label: 'IRS — Digital assets (businesses): broker reporting and final regulations', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets' },
    { label: 'IRS — 2026 Instructions for Form 1099-DA, Digital Asset Proceeds From Broker Transactions', url: 'https://www.irs.gov/pub/irs-pdf/i1099da.pdf' },
    { label: 'IRS — Frequently asked questions on digital asset transactions', url: 'https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions' },
    { label: 'IRS — Revenue Procedure 2024-28 (allocating basis to wallets and accounts as of January 1, 2025)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-28.pdf' },
    { label: 'IRS — Notice 2025-7 (temporary relief for identifying units held by a broker)', url: 'https://www.irs.gov/pub/irs-drop/n-25-07.pdf' },
    { label: 'IRS — Notice 2024-57 (transactions brokers do not have to report for now)', url: 'https://www.irs.gov/pub/irs-drop/n-24-57.pdf' },
    { label: 'IRS — Notice 2025-33 (backup withholding relief for 2025 and 2026)', url: 'https://www.irs.gov/pub/irs-drop/n-25-33.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: 'I sold crypto in 2025 but did not get a Form 1099-DA. Do I still report it?',
    a: 'Yes. You must report every sale, exchange, or other disposition of digital assets, whether or not you receive a Form 1099-DA. Many transactions — for example, swaps in a self-custody wallet — are not reported to you at all.',
  },
  {
    q: 'Why does my 2025 Form 1099-DA show no cost basis?',
    a: 'For transactions effected in 2025, brokers had to report gross proceeds. Mandatory basis reporting begins with certain transactions effected on or after January 1, 2026, and only for covered digital assets — generally those acquired in the account after 2025. You must figure and report your own basis.',
  },
  {
    q: 'Will my 2026 Form 1099-DA show basis for coins I bought years ago?',
    a: 'Generally no. Basis reporting is mandatory only for covered securities — digital assets acquired after 2025 for cash, stored-value cards, different digital assets, or certain other consideration in the account. Assets bought earlier, or transferred in from another wallet, are generally noncovered, and the broker may leave basis blank.',
  },
  {
    q: 'Does a decentralized exchange send me a Form 1099-DA?',
    a: 'The IRS says the final regulations do not include reporting requirements for brokers commonly known as decentralized or non-custodial brokers that do not take possession of the digital assets being sold. You still report your transactions yourself.',
  },
  {
    q: 'Will my exchange withhold tax from my crypto sales?',
    a: 'Notice 2025-33 says backup withholding is not required on any digital asset sale effected by a broker during calendar year 2025 or 2026. This is relief for brokers; it does not change the tax you owe.',
  },
  {
    q: 'What is the wallet-by-wallet basis rule?',
    a: 'Starting January 1, 2025, basis must be tracked separately for each wallet or account. Revenue Procedure 2024-28 gave a safe harbor for allocating your remaining basis to the units in each wallet or account as of January 1, 2025, with deadlines and recordkeeping requirements.',
  },
]

const RELATED = [
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Crypto taxes explained: when is crypto taxable?',
    desc:  'Which crypto transactions are taxable.',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: 'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
    desc:  'How Form 8949 boxes and adjustments work.',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS Notices',
    title: 'CP2000 notice: what it means and how to respond',
    desc:  'What happens when your return does not match an information return.',
  },
]

export default function Form1099DaPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Form 1099-DA: What Crypto Brokers Report for 2025 and 2026 | AskLinTax',
      description: 'Form 1099-DA explained: gross proceeds for 2025, basis for covered assets from 2026, Form 8949 boxes G–L, wallet-by-wallet basis, stablecoins and NFTs, and what is not reported.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          <strong>Form 1099-DA</strong> is a new information return that brokers use to report sales of <strong>digital assets</strong>, such as crypto. It came from changes to section 6045 made by the Infrastructure Investment and Jobs Act and the final regulations issued July 9, 2024 (T.D. 10000).
        </p>
        <ul>
          <li><strong>Transactions in 2025:</strong> brokers report <strong>gross proceeds</strong>. Basis is generally not reported.</li>
          <li><strong>Transactions from January 1, 2026:</strong> brokers must also report <strong>basis</strong> for <strong>covered</strong> digital assets — generally those acquired in the account after 2025.</li>
          <li>You must report all of your digital asset sales and exchanges <strong>whether or not</strong> you receive a Form 1099-DA.</li>
        </ul>

        <h2>Who sends Form 1099-DA</h2>
        <p>
          The final regulations apply to brokers that take possession of the digital assets their customers sell — including custodial trading platforms, certain hosted wallet providers, digital asset kiosks, and certain processors of digital asset payments. Generally only U.S. digital asset brokers file Form 1099-DA. The IRS says the final regulations <strong>do not include</strong> reporting requirements for brokers commonly known as decentralized or non-custodial brokers that do not take possession of the assets.
        </p>

        <h2>What is reported, by year</h2>
        <ArticleTable
          head={['', 'Transactions in 2025', 'Transactions in 2026 and later']}
          rows={[
            ['Gross proceeds', 'Reported', 'Reported for all digital assets'],
            ['Cost basis', 'Generally not reported', 'Required for covered securities (acquired in the account after 2025); optional for noncovered securities'],
            ['Penalty relief for brokers', 'No penalties for good-faith efforts to file and furnish correctly and on time', 'Ordinary rules, with transition relief described in the notices'],
            ['Backup withholding', 'Not required (Notice 2025-33)', 'Not required for sales in calendar year 2026 (Notice 2025-33)'],
          ]}
        />

        <h2>Stablecoins, NFTs, and payment processors</h2>
        <ul>
          <li><strong>Qualifying stablecoins:</strong> brokers using the optional method do not report non-designated sales, and report designated sales only if a customer's total gross proceeds from them exceed <strong>$10,000</strong> for the year (then on an aggregate basis for each stablecoin).</li>
          <li><strong>Specified NFTs:</strong> brokers may use an optional aggregate reporting method, with a separate de minimis threshold.</li>
          <li><strong>Processors of digital asset payments:</strong> sales of $600 or less for the year are not reported; above $600, all of that customer's sales are reported.</li>
          <li>These thresholds limit what <strong>brokers report</strong>. They are not exemptions from tax.</li>
        </ul>

        <h2>Transactions brokers do not report for now</h2>
        <p>
          Under <strong>Notice 2024-57</strong>, brokers are not required to report certain transactions until further guidance: wrapping and unwrapping, liquidity provider transactions, staking, transactions described as lending or short sales of digital assets, and notional principal contracts. The notice says this does not reflect how the transactions are taxed, and the exception does not apply to rewards or other compensation earned from them. You still determine and report your own tax results.
        </p>

        <h2>Wallet-by-wallet basis (from January 1, 2025)</h2>
        <ul>
          <li>Since January 1, 2025, basis and holding period must be identified <strong>separately for each wallet or account</strong>, not across all of your holdings.</li>
          <li><strong>Revenue Procedure 2024-28</strong> gave a safe harbor to allocate remaining (unused) basis to the units in each wallet or account <strong>as of January 1, 2025</strong>. A specific-unit allocation had to be completed before the earlier of your first sale, disposition, or transfer of that digital asset on or after January 1, 2025, or the due date (with extensions) of your 2025 return; a global allocation method had to be recorded before January 1, 2025. Allocations are irrevocable.</li>
          <li><strong>Units held by a broker:</strong> you can choose which units are sold by telling the broker no later than the time of sale. <strong>Notice 2025-7</strong> let eligible taxpayers instead identify units in their own books and records for sales from January 1 through December 31, 2025. If you do not identify units, the broker generally uses first in, first out (FIFO) for that account.</li>
        </ul>

        <h2>Reporting on Form 8949 (2025)</h2>
        <ArticleTable
          head={['Box', 'Use for']}
          rows={[
            ['G', 'Short-term — Form 1099-DA showing basis was reported to the IRS'],
            ['H', 'Short-term — Form 1099-DA showing basis was not reported to the IRS'],
            ['I', 'Short-term digital asset transactions not reported on Form 1099-DA or 1099-B'],
            ['J', 'Long-term — Form 1099-DA showing basis was reported to the IRS'],
            ['K', 'Long-term — Form 1099-DA showing basis was not reported to the IRS'],
            ['L', 'Long-term digital asset transactions not reported on Form 1099-DA or 1099-B'],
          ]}
        />
        <p>
          Do not use boxes C or F for digital asset transactions. Totals flow to Schedule D. If basis shown on a Form 1099-DA is wrong, report it and correct it with an adjustment, as explained in the Form 8949 instructions.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>2025, no basis on the form:</strong> Maya sold 0.5 bitcoin on an exchange in 2025 for $40,000. Her 2025 Form 1099-DA shows gross proceeds of $40,000 and no basis. She bought it in 2023 for $15,000. She reports the sale on Form 8949, Part II, box K, with her $15,000 basis, for a <strong>$25,000 long-term gain</strong>.
        </p>
        <p>
          <strong>2026, covered asset:</strong> Raj buys a digital asset on an exchange in February 2026 for $3,000 and sells it there in September 2026 for $3,600. Because it was acquired in the account after 2025, it is a covered security, and his Form 1099-DA should show the $3,000 basis. The sale is short-term (box G), with a $600 gain.
        </p>
        <p>
          <strong>No form at all:</strong> Chen swaps tokens in her own self-custody wallet. No broker sends a Form 1099-DA, but the swap is still a taxable exchange. She reports it in box I or L, depending on how long she held the tokens.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming no form means no tax.</strong></li>
          <li><strong>Reporting a 2025 sale with $0 basis</strong> because the form showed none.</li>
          <li><strong>Pooling basis across wallets</strong> after January 1, 2025.</li>
          <li><strong>Using boxes C or F</strong> instead of the digital asset boxes.</li>
          <li><strong>Treating de minimis reporting thresholds</strong> as tax exemptions.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Rules still developing</div>
          <p>Several rules here come from IRS notices and transition relief, and Notice 2024-57 leaves some transactions for future guidance. Check the current Form 1099-DA and Form 8949 instructions before filing. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id: '19',
  title: 'Crypto taxes explained: when is crypto taxable?',
  category: 'Investments & Crypto',
  categoryHref: '/library/investments',
  userEmotion: 'learning',
  difficulty: 'Intermediate',
  readTime: '6 min read',
  cpaReviewed: true,
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'Covers the IRS\'s current position on cryptocurrency taxation as of Tax Year 2025. This is a rapidly evolving area — rules for DeFi, NFTs, and staking rewards continue to develop.',
  persona: ['Crypto investor', 'Bitcoin holder', 'NFT buyer or seller', 'DeFi participant', 'Anyone who bought or sold cryptocurrency'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'If you bought, sold, traded, or earned any cryptocurrency this year, you have a tax reporting obligation. Pull your complete transaction history from every exchange and wallet before filing. Every taxable event must be reported on Form 8949.',
}

const FAQS = [
  { q: 'Do I owe taxes if I just held crypto and didn\'t sell?', a: 'No. Simply holding cryptocurrency — even if its value increased significantly — is not a taxable event. You only owe taxes when you have a "realization event": selling, trading, spending, or otherwise disposing of crypto. The tax is triggered by the act of disposing, not the act of holding. However, you must still answer the crypto question on Form 1040 honestly.' },
  { q: 'I traded one cryptocurrency for another. Is that taxable?', a: 'Yes. Trading one cryptocurrency for another — Bitcoin for Ethereum, for example — is treated as a taxable sale. You are deemed to have sold the first currency at its fair market value at the time of the trade, and any gain or loss from your original purchase price is taxable. This surprises many crypto investors who assume swapping between coins is not a taxable event.' },
  { q: 'What records do I need to keep for crypto taxes?', a: 'For every crypto transaction, you need: the date of acquisition, the amount purchased and the cost basis (what you paid, in USD at time of purchase), the date of disposal, the amount received and the fair market value at time of disposal, and the type of transaction (purchase, sale, trade, gift, etc.). Most exchanges provide transaction history exports. Use crypto tax software (Koinly, TaxBit, CoinTracker) to aggregate across multiple exchanges and wallets.' },
  { q: 'I lost money on crypto. Can I use those losses?', a: 'Yes. Capital losses from crypto can offset capital gains from crypto and other investments. If your net capital losses exceed your gains, you can deduct up to $3,000 of net losses against ordinary income per year. Excess losses carry forward to future years. This is called tax-loss harvesting, and it\'s one of the few silver linings of a crypto downturn.' },
  { q: 'Are staking rewards and mining income taxable?', a: 'Yes. Staking rewards and mining income are treated as ordinary income at the fair market value of the crypto when received. You then have a cost basis equal to that value for when you later sell. So you pay ordinary income tax when you receive the reward, and capital gains tax (or loss) when you eventually sell it.' },
  { q: 'What about NFTs — are they taxed the same as crypto?', a: 'The IRS treats NFTs similarly to other capital assets. Selling an NFT for more than you paid is a taxable capital gain. Buying an NFT with cryptocurrency is also a taxable event — you\'re selling the crypto. Creating and selling NFTs as a business activity may generate self-employment income rather than capital gains. The NFT space is still evolving from a tax perspective.' },
  { q: 'I used crypto to buy something. Is that taxable?', a: 'Yes. Using cryptocurrency to purchase goods or services is treated as a sale of that crypto at its fair market value at the time of purchase. If the crypto appreciated since you acquired it, you have a capital gain. If it declined, you have a capital loss. Every crypto purchase — even buying a coffee with Bitcoin — is potentially a taxable event.' },
]

const RELATED = [
  { href: '/library/investments/fbar', cat: 'Investments & Foreign Accounts', title: 'FBAR: do I need to report my foreign crypto accounts?', desc: 'If you hold crypto on foreign exchanges, you may have FBAR reporting obligations in addition to tax reporting.' },
  { href: '/library/individual/tax-credit-vs-deduction', cat: 'Individuals & Families', title: 'Tax credit vs. tax deduction: what\'s the difference?', desc: 'Capital loss deductions work differently from income deductions — understand the mechanics before filing.' },
  { href: '/library/individual/w2-vs-1099', cat: 'Individuals & Families', title: 'W-2 vs 1099: what\'s the difference?', desc: 'Crypto exchanges issue 1099s. Understand how 1099 income fits into your overall tax picture.' },
]

const TAXABLE_EVENTS = [
  { event: 'Selling crypto for USD or fiat', taxable: true, type: 'Capital gain or loss' },
  { event: 'Trading one crypto for another', taxable: true, type: 'Capital gain or loss' },
  { event: 'Buying goods or services with crypto', taxable: true, type: 'Capital gain or loss' },
  { event: 'Receiving staking rewards', taxable: true, type: 'Ordinary income (at receipt)' },
  { event: 'Mining income', taxable: true, type: 'Ordinary income (at receipt)' },
  { event: 'Airdrops received', taxable: true, type: 'Ordinary income (at receipt)' },
  { event: 'Receiving crypto as payment for work', taxable: true, type: 'Ordinary income' },
  { event: 'Holding crypto (even with unrealized gains)', taxable: false, type: 'Not taxable — no realization event' },
  { event: 'Transferring crypto between your own wallets', taxable: false, type: 'Not taxable — same owner' },
  { event: 'Buying crypto with USD', taxable: false, type: 'Not taxable — establishes cost basis' },
  { event: 'Gifting crypto (under annual gift limit)', taxable: false, type: 'Not taxable for giver; recipient takes your basis' },
]

export default function CryptoTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{ title: 'Crypto Taxes Explained: When Is Crypto Taxable? | AskLinTax', description: 'A complete guide to cryptocurrency taxation — which events are taxable, how to calculate gains and losses, short-term vs long-term rates, and what records to keep. Updated for Tax Year 2025.' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The IRS treats crypto as property, not currency</h2>
        <p>The foundational rule: the IRS classifies cryptocurrency as <strong>property</strong>, not as foreign currency. This means every time you dispose of crypto — sell it, trade it, spend it, or exchange it — you have a potential capital gain or loss, just like selling a stock or piece of real estate.</p>
        <p>This classification has significant implications. Unlike foreign currency transactions, which have specific exemptions, crypto has no de minimis exception. Every taxable event must be reported, regardless of the amount.</p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The IRS crypto question on Form 1040</div>
          <p>Every Form 1040 asks: "At any time during {TAX_CONFIG.currentTaxYear}, did you receive, sell, exchange, or otherwise dispose of any digital asset (including any virtual currency)?" You must answer this honestly. Checking "No" when you had crypto activity — even activity that resulted in losses — is a misrepresentation on your return.</p>
        </div>

        <h2>Taxable vs. non-taxable crypto events</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Event</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Taxable?</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Tax type</th>
            </tr></thead>
            <tbody>{TAXABLE_EVENTS.map(({ event, taxable, type }, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{event}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', fontWeight: '600', color: taxable ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{taxable ? '✅ Yes' : '❌ No'}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{type}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>Short-term vs. long-term capital gains</h2>
        <p>How long you held the crypto before selling determines your tax rate:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--red-soft)', border: '1.5px solid rgba(220,38,38,.25)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--red)', marginBottom: '10px' }}>Short-term (held ≤ 1 year)</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.7', marginBottom: '12px' }}>Taxed as ordinary income — the same rate as your W-2 salary. Depending on your bracket: 10%, 12%, 22%, 24%, 32%, 35%, or 37%.</p>
            <div style={{ fontSize: '14px', color: 'var(--red)', fontWeight: '500' }}>Higher rate — same as your income tax bracket</div>
          </div>
          <div style={{ background: 'var(--green-soft)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--green)', marginBottom: '10px' }}>Long-term (held &gt; 1 year)</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.7', marginBottom: '12px' }}>Taxed at preferential capital gains rates: 0%, 15%, or 20% depending on your income. Most taxpayers pay 15%.</p>
            <div style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>Lower rate — strong incentive to hold over 1 year</div>
          </div>
        </div>

        <h2>How to calculate your gain or loss</h2>
        <p>For each crypto disposal: <strong>Proceeds − Cost Basis = Gain or Loss</strong></p>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '24px', margin: '24px 0', fontFamily: 'monospace', fontSize: '15px' }}>
          <div style={{ color: 'var(--muted)', marginBottom: '12px' }}>Example: You bought 1 ETH for $2,000 and sold it 14 months later for $3,500</div>
          <div style={{ color: 'var(--navy)' }}>Proceeds: $3,500<br />Cost basis: $2,000<br />Gain: <strong style={{ color: 'var(--green)' }}>$1,500</strong><br />Holding period: 14 months → <strong style={{ color: 'var(--green)' }}>Long-term rate (0/15/20%)</strong></div>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ How to report crypto on your return</div>
          <p>Report every sale, trade, and disposal on <strong>Form 8949</strong> (Sales and Other Dispositions of Capital Assets). Totals flow to <strong>Schedule D</strong>. Most tax software imports crypto transaction history directly from major exchanges. For complex situations (multiple wallets, DeFi activity), dedicated crypto tax software (Koinly, TaxBit, CoinTracker) aggregates transactions across platforms and generates the necessary forms.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

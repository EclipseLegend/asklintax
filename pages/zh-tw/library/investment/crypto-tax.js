import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/crypto-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'crypto-tax',
  sourceHash:      '422497bf0cea',
  id: '19',
  title: '加密貨幣稅務說明：什麼時候要繳稅？',
  titleEn: 'Crypto taxes explained: when is crypto taxable?',
  category: 'Investments & Crypto',
  categoryHref: '/library/investment',
  userEmotion: 'learning',
  difficulty: 'Intermediate',
  readTime: '6 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 數位資產（Digital assets）', url: 'https://www.irs.gov/filing/digital-assets' },
    { label: 'IRS — Topic no. 409，資本利得與損失（Capital gains and losses）', url: 'https://www.irs.gov/taxtopics/tc409' },
  ],
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: '涵蓋截至 2025 稅務年度 IRS 對加密貨幣課稅的現行立場。這是變化很快的領域 — DeFi、NFT 與質押（Staking）獎勵的規則仍在發展中。',
  persona: ['加密貨幣投資人', '比特幣持有人', 'NFT 買家或賣家', 'DeFi 參與者', '買賣過加密貨幣的人'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '如果你今年買入、賣出、交易或賺取了任何加密貨幣，你就有稅務申報義務。報稅前，從每一個交易所與錢包匯出完整的交易紀錄。出售、交換與其他處分在 Form 8949 上申報；質押或挖礦獎勵等一般所得，則在 Schedule 1 上申報（如果是在營業中收到，則在 Schedule C 上申報）。',
}

const FAQS = [
  { q: '如果我只是持有加密貨幣、沒有賣出，要繳稅嗎？', a: '不用。單純持有加密貨幣 — 即使價值大幅上漲 — 不是應稅事件。只有在發生「實現事件」（Realization Event）時才要繳稅：賣出、交易、花用，或以其他方式處分加密貨幣。課稅是因為處分，而不是因為持有。不過，你仍然必須誠實回答 Form 1040 上的加密貨幣問題。' },
  { q: '我把一種加密貨幣換成另一種，要繳稅嗎？', a: '要。把一種加密貨幣換成另一種 — 例如用比特幣換以太幣 — 會被視為應稅的出售。你被視為以交易當時的公平市價賣出第一種貨幣，與你原始購買價格之間的任何利得或損失都要課稅。許多加密貨幣投資人以為幣與幣之間的交換不是應稅事件，這讓他們很意外。' },
  { q: '加密貨幣報稅需要保留哪些紀錄？', a: '每一筆加密貨幣交易，你都需要：取得日期、購買數量與成本基礎（Cost Basis，購買當時以美元計算的支付金額）、處分日期、收到的金額與處分當時的公平市價，以及交易類型（買入、賣出、交易、贈與等）。多數交易所都能匯出交易紀錄。可以使用加密貨幣報稅軟體（Koinly、TaxBit、CoinTracker）彙整多個交易所與錢包的資料。' },
  { q: '我在加密貨幣上虧了錢，這些損失可以用嗎？', a: '可以。加密貨幣的資本損失可以抵銷加密貨幣與其他投資的資本利得。如果你的淨資本損失超過利得，每年最多可以用 $3,000 的淨損失抵減一般所得，超過的部分可以結轉到以後年度。這叫做稅損收割（Tax-Loss Harvesting），是加密貨幣下跌時少數的好處之一。' },
  { q: '質押獎勵與挖礦收入要繳稅嗎？', a: '要。質押獎勵與挖礦收入，以收到時加密貨幣的公平市價，視為一般所得（Ordinary Income）。之後你出售時，成本基礎就等於這個價值。所以你在收到獎勵時繳一般所得稅，最後出售時再繳資本利得稅（或認列損失）。' },
  { q: 'NFT 呢？和加密貨幣的課稅方式一樣嗎？', a: 'IRS 對 NFT 的處理方式與其他資本資產類似。以高於購買價格的金額出售 NFT，是應稅的資本利得。用加密貨幣購買 NFT 也是應稅事件 — 因為你等於賣出了加密貨幣。以營業活動的方式創作與出售 NFT，可能產生自雇收入，而不是資本利得。從稅務角度來看，NFT 領域仍在發展中。' },
  { q: '我用加密貨幣買東西，要繳稅嗎？', a: '要。用加密貨幣購買商品或服務，會被視為以購買當時的公平市價出售這筆加密貨幣。如果加密貨幣在你取得之後升值，你就有資本利得；如果下跌，你就有資本損失。每一筆用加密貨幣的消費 — 即使是用比特幣買一杯咖啡 — 都可能是應稅事件。' },
]

const RELATED = [
  { href: '/library/investment/fbar', cat: 'Investments & Foreign Accounts', title: 'FBAR：我需要申報海外加密貨幣帳戶嗎？', desc: '如果你在海外交易所持有加密貨幣，除了報稅之外，你可能還有 FBAR 申報義務。' },
  { href: '/library/individual/tax-credit-vs-deduction', cat: 'Individuals & Families', title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？', desc: '資本損失扣除與所得扣除的運作方式不同 — 報稅前先了解其中的機制。' },
  { href: '/library/individual/w2-vs-1099', cat: 'Individuals & Families', title: 'W-2 與 1099：有什麼差別？為什麼重要？', desc: '加密貨幣交易所會開立 1099。了解 1099 收入在你整體稅務中的位置。' },
]

const TAXABLE_EVENTS = [
  { event: '把加密貨幣賣成美元或法定貨幣', taxable: true, type: '資本利得或損失' },
  { event: '把一種加密貨幣換成另一種', taxable: true, type: '資本利得或損失' },
  { event: '用加密貨幣購買商品或服務', taxable: true, type: '資本利得或損失' },
  { event: '收到質押獎勵', taxable: true, type: '一般所得（收到時）' },
  { event: '挖礦收入', taxable: true, type: '一般所得（收到時）' },
  { event: '收到空投（Airdrop）', taxable: true, type: '一般所得（收到時）' },
  { event: '以加密貨幣收取工作報酬', taxable: true, type: '一般所得' },
  { event: '持有加密貨幣（即使有未實現利得）', taxable: false, type: '不用繳稅 — 沒有實現事件' },
  { event: '在你自己的錢包之間轉移加密貨幣', taxable: false, type: '不用繳稅 — 同一個擁有人' },
  { event: '用美元購買加密貨幣', taxable: false, type: '不用繳稅 — 建立成本基礎' },
  { event: '贈送加密貨幣（在年度贈與免稅額以內）', taxable: false, type: '贈與人不用繳稅；受贈人沿用你的成本基礎' },
]

export default function CryptoTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{ title: '加密貨幣稅務說明：什麼時候要繳稅？ | AskLinTax 繁體中文', description: '加密貨幣課稅完整指南 — 哪些事件要繳稅、如何計算利得與損失、短期與長期稅率，以及要保留哪些紀錄。已更新至 2025 稅務年度。' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>IRS 把加密貨幣視為財產，而不是貨幣</h2>
        <p>基本規則：IRS 把加密貨幣歸類為<strong>財產</strong>（Property），而不是外幣。這代表每次你處分加密貨幣 — 賣出、交易、花用或交換 — 都可能產生資本利得或損失，就像賣出股票或不動產一樣。</p>
        <p>這種分類影響很大。外幣交易有特定的豁免規定，加密貨幣卻沒有最低金額豁免（De Minimis Exception）。每一筆應稅事件，不論金額多小，都必須申報。</p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Form 1040 上的 IRS 加密貨幣問題</div>
          <p>每一份 Form 1040 都會問你，在 {TAX_CONFIG.currentTaxYear} 年任何時候，是否 (a) 收到數位資產（作為獎勵、獎品，或財產與服務的報酬），或 (b) 賣出、交換或以其他方式處分數位資產（或數位資產的財務權益）。你必須誠實回答。如果你收到、賣出、交易或花用了加密貨幣 — 即使是虧損 — 請回答「Yes」。如果你只是持有加密貨幣、只用美元購買，或只在自己的錢包之間轉移（而且沒有用加密貨幣支付手續費），IRS 說明應回答「No」。</p>
        </div>

        <h2>應稅與非應稅的加密貨幣事件</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>事件</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>要繳稅嗎？</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>稅別</th>
            </tr></thead>
            <tbody>{TAXABLE_EVENTS.map(({ event, taxable, type }, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{event}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', fontWeight: '600', color: taxable ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{taxable ? '✅ 要' : '❌ 不用'}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{type}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>短期與長期資本利得</h2>
        <p>你在出售前持有加密貨幣多久，決定了你的稅率：</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--red-soft)', border: '1.5px solid rgba(220,38,38,.25)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--red)', marginBottom: '10px' }}>短期（持有 ≤ 1 年）</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.7', marginBottom: '12px' }}>以一般所得課稅 — 與你的 W-2 薪資適用相同稅率。依你的級距：10%、12%、22%、24%、32%、35% 或 37%。</p>
            <div style={{ fontSize: '14px', color: 'var(--red)', fontWeight: '500' }}>稅率較高 — 與你的所得稅級距相同</div>
          </div>
          <div style={{ background: 'var(--green-soft)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--green)', marginBottom: '10px' }}>長期（持有 &gt; 1 年）</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.7', marginBottom: '12px' }}>適用優惠的資本利得稅率：依你的所得為 0%、15% 或 20%。</p>
            <div style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>稅率較低 — 持有超過 1 年的強烈誘因</div>
          </div>
        </div>

        <h2>如何計算你的利得或損失</h2>
        <p>每一筆加密貨幣處分：<strong>出售所得 − 成本基礎 = 利得或損失</strong></p>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '24px', margin: '24px 0', fontFamily: 'monospace', fontSize: '15px' }}>
          <div style={{ color: 'var(--muted)', marginBottom: '12px' }}>例子：你以 $2,000 買入 1 ETH，14 個月後以 $3,500 賣出</div>
          <div style={{ color: 'var(--navy)' }}>出售所得：$3,500<br />成本基礎：$2,000<br />利得：<strong style={{ color: 'var(--green)' }}>$1,500</strong><br />持有期間：14 個月 → <strong style={{ color: 'var(--green)' }}>長期稅率（0/15/20%）</strong></div>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ 如何在稅表上申報加密貨幣</div>
          <p>每一筆出售、交易與處分都要在 <strong>Form 8949</strong>（Sales and Other Dispositions of Capital Assets）上申報，合計數字再轉到 <strong>Schedule D</strong>。多數報稅軟體可以直接從主要交易所匯入加密貨幣交易紀錄。比較複雜的情況（多個錢包、DeFi 活動），可以用專門的加密貨幣報稅軟體（Koinly、TaxBit、CoinTracker）彙整各平台的交易，並產生所需的表格。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/cant-pay-tax-bill.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'cant-pay-tax-bill',
  sourceHash:      '5ba27db1a85d',
  id:            '51',
  title:         '繳不出稅款怎麼辦？有哪些選擇？',
  titleEn:       'I can\'t pay my tax bill — what are my options?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋欠聯邦所得稅、無法一次繳清的個人。資格門檻與費用是審閱時 IRS 線上分期付款的數字，可能會變動；公司欠稅、薪資稅與州稅不在本文範圍內',
  persona:       ['截止日前繳不出全部稅款的人', '應繳稅款比預期多的自由工作者', '收到 IRS 欠稅通知的人', '正在比較分期付款與其他選擇的人'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '即使繳不出全部稅款，也要準時報稅，並盡量多繳一些，再選擇付款方式。申請前，請先到 IRS 分期付款網頁確認最新的資格與費用。',
  sources: [
    { label: 'IRS — 分期付款計畫（Payment plans; installment agreements）', url: 'https://www.irs.gov/payments/payment-plans-installment-agreements' },
    { label: 'IRS — 已報稅但還沒繳稅（If you\'ve filed but haven\'t paid）', url: 'https://www.irs.gov/newsroom/if-youve-filed-but-havent-paid' },
    { label: 'IRS — Topic no. 202，繳稅方式（Tax payment options）', url: 'https://www.irs.gov/taxtopics/tc202' },
    { label: 'IRS — 線上分期付款申請（Online payment agreement application）', url: 'https://www.irs.gov/payments/online-payment-agreement-application' },
    { label: 'IRS — 和解方案（Offer in compromise）', url: 'https://www.irs.gov/payments/offer-in-compromise' },
    { label: 'IRS — 暫緩催收（Temporarily delay the collection process）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/temporarily-delay-the-collection-process' },
  ],
}

const FAQS = [
  {
    q: '我應該等有錢了再報稅嗎？',
    a: '不應該。報稅和繳稅是兩項不同的義務。IRS 建議即使繳不出全部稅款，也要準時報稅，因為逾期報稅的罰款通常比逾期繳稅的罰款高很多。如果你的稅表已經逾期，請看「錯過報稅截止日，現在該怎麼辦？」',
  },
  {
    q: '申請分期付款，利息和罰款就會停止嗎？',
    a: '不會。即使在分期付款期間，未繳餘額的利息和適用的罰款通常會持續累積，直到全部繳清。越早多繳，累積的金額就越少。',
  },
  {
    q: '我符合線上分期付款的資格嗎？',
    a: '依 IRS 目前對個人的線上指引，如果稅款、罰款與利息合計不到 $100,000，且能在 180 天內繳清，一般可以申請短期付款計畫。如果合計在 $50,000 以下，且所有應申報的稅表都已申報，一般可以線上申請長期分期付款協議（installment agreement）。不是每個人都符合，門檻也可能變動 — 請查看 IRS 的分期付款網頁。',
  },
  {
    q: 'IRS 可以直接減少我欠的稅嗎？',
    a: '和解方案（Offer in Compromise）讓部分納稅人以低於全額的金額結清欠稅，但並不是自動適用，很多申請人並不符合。IRS 會看你的繳款能力、收入、支出與資產。依賴這個選項之前，請仔細閱讀 IRS 的規定。',
  },
  {
    q: '分期付款要付手續費嗎？',
    a: '設定費依付款計畫的類型、申請方式與繳款方式而不同，而且 IRS 會調整。請查看 IRS 分期付款網頁上最新的費用表，不要依賴固定的數字。',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: '錯過報稅截止日，現在該怎麼辦？',
    desc:  '如果稅表本身還沒申報，請先看這篇。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '看懂欠稅通知，決定下一步。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '在年中先繳稅，避免明年又欠一大筆。',
  },
]

export default function CantPayTaxBillZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '繳不出稅款怎麼辦？IRS 分期付款與其他選擇 | AskLinTax 繁體中文',
      description: '欠 IRS 的稅繳不出來？為什麼還是要準時報稅、短期與長期分期付款怎麼運作，以及哪些情況可能適用其他 IRS 選項。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你無法一次繳清聯邦稅款，還是有辦法處理 — 但順序很重要：<strong>照樣準時報稅</strong>、<strong>盡量多繳一些</strong>，再安排剩下的金額怎麼繳。IRS 提供分期付款計畫，某些情況下也有其他催收替代方案。未繳的餘額通常會持續產生利息與罰款，所以越早降低餘額，增加得越少。
        </p>
        <p>
          本文針對的是你已經知道金額的欠稅 — 通常是已經申報的稅表。如果稅表本身還沒申報，請先看<a href="/zh-tw/library/irs/missed-tax-deadline/">錯過報稅截止日，現在該怎麼辦？</a>
        </p>

        <h2>報稅和繳稅是兩項不同的義務</h2>
        <p>
          繳不出錢，不是不報稅的理由。這兩者各有罰款：一個針對逾期報稅，一個針對逾期繳稅。IRS 一般建議即使繳不出來也要準時報稅，因為逾期報稅罰款（failure-to-file penalty）通常比逾期繳稅罰款（failure-to-pay penalty）高很多。準時報稅，問題就只限於未繳的餘額。
        </p>

        <h2>第一步：現在能繳多少就繳多少</h2>
        <p>
          在截止日前繳的任何金額，都會減少計算利息與罰款的餘額。即使只繳一部分也有幫助。你可以透過 IRS 的線上繳稅方式繳款，例如從銀行帳戶直接扣款。
        </p>

        <h2>第二步：選擇剩餘金額的付款方式</h2>
        <ArticleTable
          head={['選項', '可能適合誰', '要知道的事']}
          rows={[
            ['一次繳清', '現在就能繳清全部餘額的人', '這筆餘額就不會再產生利息與罰款'],
            ['短期付款計畫', '稅款、罰款與利息合計不到 $100,000 的個人（IRS 目前的線上指引）', '在 180 天內繳清；繳清前利息與罰款會持續累積'],
            ['長期分期付款協議', '稅款、罰款與利息合計在 $50,000 以下，且所有應申報稅表都已申報的個人（IRS 目前的線上指引）', '按月繳款；可能有設定費；繳清前利息與罰款會持續累積'],
            ['其他催收替代方案', '無法透過付款計畫繳清的人', '例如和解方案（Offer in Compromise）或暫緩催收 — 各有自己的條件'],
          ]}
        />
        <p>
          上表的金額門檻，是 IRS 目前對<strong>線上</strong>申請的資格指引。如果你欠得更多，或不符合線上申請資格，仍可能透過其他方式申請付款計畫 — 請見 IRS 分期付款網頁。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 費用和門檻會變動</div>
          <p>分期付款的設定費依計畫類型、申請方式與繳款方式而不同，IRS 也會調整。申請前，請到 IRS 分期付款網頁查看最新數字。</p>
        </div>

        <h2>在適當情況下的其他選項</h2>
        <ul>
          <li><strong>和解方案（Offer in Compromise）。</strong>以低於全額的金額結清欠稅的協議。這不是自動適用的：IRS 會考量你的繳款能力、收入、支出與資產淨值，很多申請都不會被接受。</li>
          <li><strong>暫緩催收。</strong>如果繳稅會造成經濟困難，IRS 可能暫時延後催收。欠稅並不會被免除，罰款與利息也會持續累積。</li>
        </ul>

        <h2>分期付款不會做到的事</h2>
        <ul>
          <li>它<strong>不會</strong>停止利息。利息與適用的罰款通常會持續累積，直到餘額繳清。</li>
          <li>它<strong>不代表</strong>每個人都符合資格。資格取決於欠款金額、過去的申報紀錄與其他條件。</li>
          <li>它<strong>不能</strong>取代報稅。以後的稅表仍然要準時申報、準時繳稅。</li>
        </ul>

        <h2>例子</h2>
        <p>
          Dana 在 4 月準時報稅，欠了 $6,000，無法一次繳清。她隨稅表先繳 $1,500，剩下的 $4,500 在線上申請付款計畫。因為她的餘額低於線上門檻，如果也符合其他條件，就可能可以在線上設定付款計畫；未繳部分在繳清前，利息與逾期繳稅罰款會持續累積，所以她在預算許可下盡快繳清。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 預防明年又欠稅</div>
          <p>如果你欠稅是因為收入沒有預扣稅款 — 例如自由工作或 1099 收入 — 在年中繳預估稅可以避免餘額越積越多。請見<a href="/zh-tw/library/small-business/quarterly-taxes/">季度預估稅</a>。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

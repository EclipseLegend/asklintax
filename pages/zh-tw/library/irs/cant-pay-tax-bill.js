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
  sourceHash:      'ed8488565c17',
  id:            '51',
  title:         '繳不出稅款怎麼辦？有哪些選擇？',
  titleEn:       'I can\'t pay my tax bill — what are my options?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋欠聯邦所得稅、無法一次繳清的個人。資格門檻、設定費與和解方案申請費，是 2026 年 10 月審閱 IRS 分期付款、線上分期付款申請與和解方案網頁時的數字；IRS 可能會調整。公司欠稅、薪資稅與州稅不在本文範圍內',
  persona:       ['截止日前繳不出全部稅款的人', '應繳稅款比預期多的自由工作者', '收到 IRS 欠稅通知的人', '正在比較分期付款與其他選擇的人'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '即使繳不出全部稅款，也要準時報稅，並盡量多繳一些，再申請分期付款 — 符合資格就線上申請，因為線上設定費比較低。長期付款計畫選擇自動扣款，費用最低。',
  sources: [
    { label: 'IRS — 分期付款計畫（Payment plans; installment agreements）', url: 'https://www.irs.gov/payments/payment-plans-installment-agreements' },
    { label: 'IRS — 已報稅但還沒繳稅（If you\'ve filed but haven\'t paid）', url: 'https://www.irs.gov/newsroom/if-youve-filed-but-havent-paid' },
    { label: 'IRS — Topic no. 202，繳稅方式（Tax payment options）', url: 'https://www.irs.gov/taxtopics/tc202' },
    { label: 'IRS — 線上分期付款申請（Online payment agreement application）', url: 'https://www.irs.gov/payments/online-payment-agreement-application' },
    { label: 'IRS — 和解方案（Offer in compromise）', url: 'https://www.irs.gov/payments/offer-in-compromise' },
    { label: 'IRS — 暫緩催收（Temporarily delay the collection process）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/temporarily-delay-the-collection-process' },
    { label: 'IRS — 逾期繳稅罰款（Failure to pay penalty）', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
  ],
}

const FAQS = [
  {
    q: '我應該等有錢了再報稅嗎？',
    a: '不應該。報稅和繳稅是兩項不同的義務。IRS 建議即使繳不出全部稅款，也要準時報稅，因為逾期報稅的罰款通常比逾期繳稅的罰款高很多。如果你的稅表已經逾期，請看「錯過報稅截止日，現在該怎麼辦？」',
  },
  {
    q: '申請分期付款，利息和罰款就會停止嗎？',
    a: '不會。未繳餘額的利息和逾期繳稅罰款會持續累積，直到全部繳清。不過罰款比例會降低：IRS 逾期繳稅罰款網頁指出，如果你準時報稅，並且有核准的分期付款計畫，計畫有效期間罰款會從每月 0.5% 降為 0.25%。',
  },
  {
    q: '我符合線上分期付款的資格嗎？',
    a: 'IRS 線上分期付款申請網頁指出，如果稅款、罰款與利息合計不到 $100,000，可能可以線上申請短期付款計畫（180 天以內）；如果合計在 $50,000 以下，而且所有應申報的稅表都已申報，可能可以線上申請長期付款計畫。如果欠得更多或無法線上申請，仍可以透過電話、郵寄 Form 9465 或親自申請。',
  },
  {
    q: 'IRS 可以直接減少我欠的稅嗎？',
    a: '和解方案（Offer in Compromise）讓部分納稅人以低於全額的金額結清欠稅，但如果你可以透過分期付款或資產淨值全額繳清，IRS 通常不會接受。除非符合低收入資格，每份申請都要付 $205 申請費和第一筆款項。申請前請先使用 IRS 的資格預查工具（Pre-Qualifier）。',
  },
  {
    q: '分期付款要付手續費嗎？',
    a: '短期付款計畫沒有設定費。長期付款計畫如果用自動扣款，線上申請 $29，電話、郵寄或親自申請 $107；其他繳款方式線上 $69，其他方式 $178。低收入納稅人自動扣款免設定費，其他方式 $43，可能可以退還。這些是審閱時 IRS 的數字。',
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
  {
    href: '/library/irs/irs-penalty-relief',
    cat: 'IRS & Tax Issues',
    title: 'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因',
    desc: '逾期申報與繳稅罰款的減免。',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS 授權書：Form 2848 與 Form 8821 的差別',
    desc:  '授權代理人，或分享你的 IRS 資料。',
  },
  {
    href: '/library/individual/cancellation-of-debt-1099c',
    cat:  'Individuals & Families',
    title: '債務免除與 Form 1099-C：被免除的債務何時要課稅',
    desc:  '被免除的債務何時會變成應稅所得。',
  },
]

export default function CantPayTaxBillZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '繳不出稅款怎麼辦？IRS 分期付款與其他選擇 | AskLinTax 繁體中文',
      description: '欠 IRS 的稅繳不出來？為什麼還是要準時報稅、IRS 分期付款資格與設定費、分期期間降低的逾期繳稅罰款、和解方案，以及暫停催收（Currently Not Collectible）狀態。',
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
          head={['選項', '線上申請資格（個人）', '要知道的事']}
          rows={[
            ['一次繳清', '任何人', '沒有設定費；這筆餘額就不會再產生利息與罰款'],
            ['短期付款計畫', '稅款、罰款與利息合計不到 $100,000', '在 180 天以內繳清；沒有設定費；繳清前利息與罰款會持續累積'],
            ['長期付款計畫（分期付款協議）', '稅款、罰款與利息合計在 $50,000 以下，且所有應申報稅表都已申報', '按月繳款；有設定費（見下表）；繳清前利息與罰款會持續累積'],
            ['其他催收替代方案', '無法透過付款計畫繳清的人', '和解方案（Offer in Compromise）或暫停催收（Currently Not Collectible）狀態 — 各有自己的條件'],
          ]}
        />
        <p>
          這些是 IRS 線上分期付款申請網頁上<strong>線上</strong>申請的門檻。如果你欠得更多，或無法線上申請，仍可以透過電話、郵寄 Form 9465 或親自申請。持有授權書（power of attorney）的代理人也可以代你申請。
        </p>

        <h2>設定費</h2>
        <ArticleTable
          head={['計畫', '線上申請', '電話、郵寄或親自申請', '低收入納稅人']}
          rows={[
            ['短期付款計畫（180 天以內）', '$0', '$0', '$0'],
            ['長期付款計畫，自動扣款', '$29', '$107', '免設定費'],
            ['長期付款計畫，其他繳款方式', '$69', '$178', '$43（可能可以退還）'],
            ['修改計畫或違約後恢復', '$6', '$89', '線上 $6，其他方式 $43（可能可以退還）'],
          ]}
        />
        <p>
          計畫核准後，設定費會加到你的餘額中。修改現有的自動扣款計畫不收費。用信用卡或簽帳卡付款會有處理商的手續費。這些數字來自 2026 年 10 月審閱的 IRS 分期付款網頁；IRS 可能會調整，申請前請再確認。
        </p>

        <h2>繳款期間的罰款與利息</h2>
        <ul>
          <li><strong>逾期繳稅罰款：</strong>未繳稅款每月或不足一個月按 0.5% 計算，最高 25%。</li>
          <li><strong>分期期間降低：</strong>如果你準時報稅，並且有核准的分期付款計畫，計畫有效期間每月降為 0.25%。</li>
          <li><strong>收到扣押通知後提高：</strong>如果你在收到 IRS 擬扣押通知後 10 天內沒有繳款，每月提高為 1%。</li>
          <li><strong>利息：</strong>未繳稅款與罰款都會計息，直到全部繳清。</li>
          <li><strong>申請審核期間的催收：</strong>IRS 分期付款網頁指出，分期付款申請審核期間，除少數例外，IRS 通常不得扣押，而且 IRS 可催收的期間會暫停或延長。</li>
        </ul>

        <h2>在適當情況下的其他選項</h2>
        <ul>
          <li><strong>和解方案（Offer in Compromise）。</strong>以低於全額的金額結清欠稅的協議。IRS 會考量你的收入、支出與資產淨值；如果你可以透過分期付款或資產淨值全額繳清，IRS 通常不會接受。你必須已申報所有應申報的稅表、繳納應繳的預估稅，而且沒有進行中的破產程序。除非符合低收入資格，每份申請都要付 $205 申請費和第一筆款項（一次付清方案為和解金額的 20%）。</li>
          <li><strong>暫停催收（Currently Not Collectible）狀態。</strong>如果你因經濟困難無法繳款，IRS 可能暫時停止大部分催收。你仍然欠全部金額，罰款與利息會持續累積，IRS 仍可能申報聯邦稅務留置權通知（Notice of Federal Tax Lien），也會把以後的退稅用來抵欠稅。你可能需要提供 Form 433-F 或 Form 433-A 等催收資訊表。</li>
        </ul>

        <h2>分期付款不會做到的事</h2>
        <ul>
          <li>它<strong>不會</strong>停止利息。利息與逾期繳稅罰款會持續累積，直到餘額繳清，不過核准計畫期間的罰款比例比較低。</li>
          <li>它<strong>不代表</strong>每個人都符合資格。資格取決於欠款金額、過去的申報紀錄與其他條件。</li>
          <li>它<strong>不能</strong>取代報稅。以後的稅表仍然要準時申報、準時繳稅；漏繳款項可能讓計畫違約。</li>
        </ul>

        <h2>例子</h2>
        <p>
          Dana 在 4 月準時報稅，欠了 $6,000，無法一次繳清。她隨稅表先繳 $1,500，剩下的 $4,500 在線上申請長期付款計畫，並選擇自動扣款。她欠的金額低於 $50,000，而且所有稅表都已申報，所以可以線上申請，設定費是 $29。因為她準時報稅，計畫也已核准，計畫有效期間未繳餘額的逾期繳稅罰款是每月 0.25%，而不是 0.5%；利息仍會累積，所以她在預算許可下盡快繳清。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 預防明年又欠稅</div>
          <p>如果你欠稅是因為收入沒有預扣稅款 — 例如自由工作或 1099 收入 — 在年中繳預估稅可以避免餘額越積越多。請見<a href="/zh-tw/library/small-business/quarterly-taxes/">季度預估稅</a>。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

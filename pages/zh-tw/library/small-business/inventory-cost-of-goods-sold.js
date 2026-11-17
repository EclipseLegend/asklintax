import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/inventory-cost-of-goods-sold.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'inventory-cost-of-goods-sold',
  sourceHash:      '4709f3e616fd',
  id:            '133',
  title:         '存貨與銷貨成本：Schedule C 與小型企業例外規定',
  titleEn:       'Inventory and Cost of Goods Sold: Schedule C and Small Business Exceptions',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Schedule C 說明、T.D. 9942 的最終法規（Treas. Reg. 1.471-1(b)(4)，刊載於 Internal Revenue Bulletin 2021-03）、Publication 334（2025）、Publication 538（2022 年 1 月修訂版，用於存貨成本的定義）、Rev. Proc. 2024-40（2025 年總收入金額）、Rev. Proc. 2025-32（2026 年總收入金額），以及 IRS 第 448(c)(2) 條合併規定常見問題（2025 年 12 月更新），說明獨資經營者的存貨與銷貨成本。本文審閱時，2026 年 Schedule C 說明尚未定稿。本文不詳細說明 LIFO 等存貨評價方法、統一資本化規則的計算，或會計方法變更程序',
  persona:       ['網路賣家與轉售商', '零售店老闆', '販售自製商品的創作者', '第一次填寫 Schedule C 第 III 部分的人'],
  relatedJourney: ['經營小型企業', '創業或經營小型企業'],
  actionRequired: '決定你的企業使用哪一種存貨方法，並持續一致地使用。如果你保留存貨，每年年初與年底都要盤點並評價存貨。如果你是使用非附帶性材料與用品方法的小型企業納稅人，存貨成本要在你把商品提供給顧客的那一年，或你支付或發生該成本的那一年（以較晚者為準）扣除 — 而不是自動在購買的那一年扣除。',
  sources: [
    { label: 'IRS — 2025 年 Schedule C（Form 1040）說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sc.pdf' },
    { label: 'IRS — Publication 334（2025），小型企業稅務指南', url: 'https://www.irs.gov/pub/irs-pdf/p334.pdf' },
    { label: 'IRS — Publication 538（2022 年 1 月修訂版），會計期間與方法', url: 'https://www.irs.gov/pub/irs-pdf/p538.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2021-03，T.D. 9942（最終法規，包括 Treas. Reg. 1.471-1(b)(4)）', url: 'https://www.irs.gov/irb/2021-03_IRB' },
    { label: 'IRS — 第 448(c)(2) 條合併規定常見問題', url: 'https://www.irs.gov/newsroom/faqs-regarding-the-aggregation-rules-under-section-448c2-that-apply-to-the-section-163j-small-business-exemption' },
  ],
}

const FAQS = [
  {
    q: '我可以在買進存貨的那一年扣除嗎？',
    a: '不會自動可以。如果你保留存貨，商品的成本是在賣出時透過銷貨成本扣除。小型企業納稅人可以改為把存貨當作非附帶性材料與用品（non-incidental materials and supplies）處理，但法規規定，這些成本只能在品項被使用或消耗的那一年 — 也就是你把存貨提供給顧客的那一年 — 或你支付或發生該成本的那一年回收，以較晚者為準。不會只因為你付了款就可以扣除。',
  },
  {
    q: '誰是小型企業納稅人？',
    a: '前 3 個課稅年度的平均年度總收入不超過依通膨調整的上限，而且不是第 448(d)(3) 條定義的避稅組織（tax shelter）的納稅人。上限為 2025 年 3,100 萬美元（$31 million）、2026 年 3,200 萬美元（$32 million）。如果企業存在不到 3 年，就以實際存在的期間計算；並要計入前身實體的總收入。',
  },
  {
    q: '有存貨就一定要用權責發生制嗎？',
    a: '一般來說，如果你必須處理存貨，商品的進貨與銷貨必須使用權責發生制（accrual method）。小型企業納稅人是例外：只要存貨方法能清楚反映所得，就可以使用現金收付制，也可以選擇不保留存貨。',
  },
  {
    q: '存貨和營業費用一樣嗎？',
    a: '不一樣。存貨成本是透過 Schedule C 第 III 部分的銷貨成本回收。廣告、租金、軟體等一般營運費用列在第 II 部分。設備及其他使用年限超過一年的財產，一般要資本化並折舊，或在符合資格時依第 179 條或加速折舊扣除。',
  },
  {
    q: '我需要 Form 3115 嗎？',
    a: 'Form 3115 用於變更會計方法，包括存貨方法。你是在第一次申報包含該企業 Schedule C 的稅表時選擇會計方法。之後要變更，一般需要 IRS 核准。',
  },
  {
    q: '買進商品的成本包括哪些？',
    a: '對於當年購買的商品，Publication 538 說明，成本是發票價格減去適當的折扣，再加上取得商品所發生的運費或其他費用。要減去進貨退回與折讓，並扣除你從存貨中取出供個人使用的成本。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '第 III 部分在 Schedule C 中的位置。',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '不屬於存貨的營運費用。',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: '收到 PayPal、Venmo 或 eBay 的 1099-K，要繳稅嗎？',
    desc:  'Form 1099-K 上的總銷售額不等於利潤。',
  },
  {
    href: '/library/small-business/section-179-bonus-depreciation',
    cat:  'Small Business & Self-Employment',
    title: '第 179 條與加速折舊：2025 與 2026 年規定',
    desc:  '設備要資本化，不是存貨。',
  },
]

export default function InventoryCostOfGoodsSoldPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '存貨與銷貨成本：Schedule C 與小型企業例外規定 | AskLinTax 繁體中文',
      description: 'Schedule C 第 III 部分的存貨與銷貨成本怎麼算：期初與期末存貨、進貨、退回、進貨運費、小型企業納稅人例外（2025 年 3,100 萬美元（$31 million）、2026 年 3,200 萬美元（$32 million））、三種允許的存貨方法，以及 Form 3115 — 附實際計算範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你販售商品，購買這些商品的支出不能當作一般費用扣除。你要在 Schedule C 上從銷售額中減去<strong>銷貨成本（cost of goods sold，COGS）</strong>。銷貨成本一般是<strong>期初存貨</strong>，加上當年<strong>購買或生產</strong>的成本，再減去<strong>期末存貨</strong>。<strong>小型企業納稅人</strong>可以使用較簡化的存貨方法，但這並不會自動讓存貨在購買的那一年就能扣除。
        </p>

        <h2>銷貨成本怎麼算（Schedule C 第 III 部分）</h2>
        <ArticleTable
          head={['Schedule C 行次', '填寫內容']}
          rows={[
            ['第 35 行', '年初存貨 — 通常與去年的期末存貨相同；如有差異要說明'],
            ['第 36 行', '進貨，減去進貨退回與折讓，以及取出供個人使用的品項成本'],
            ['第 37 行', '人工成本（不包括付給你自己的金額）'],
            ['第 38 行', '材料與用品'],
            ['第 39 行', '其他成本'],
            ['第 40 行', '第 35 至 39 行的合計'],
            ['第 41 行', '年底存貨'],
            ['第 42 行', '銷貨成本：第 40 行減第 41 行，轉填到第 4 行'],
          ]}
        />
        <p>
          對於你購買的商品，Publication 538 說明，成本是發票價格減去適當的折扣，再加上<strong>取得商品所發生的運費或其他費用</strong>（進貨運費，freight-in）。請使用扣除商業折扣後實際支付的價格。
        </p>

        <h2>範例</h2>
        <p>
          美美經營一家網路商店。她保留存貨，2025 年的銷售淨額為 <strong>$60,000</strong>。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['期初存貨（1 月 1 日）', '$8,000'],
            ['購買商品', '+$40,000'],
            ['退回給供應商的進貨', '−$2,000'],
            ['收貨支付的進貨運費', '+$1,000'],
            ['取出供個人使用的品項', '−$500'],
            ['可供銷售的商品', '$46,500'],
            ['期末存貨（12 月 31 日）', '−$10,000'],
            ['銷貨成本', '$36,500'],
            ['毛利（$60,000 − $36,500）', '$23,500'],
          ]}
        />
        <p>
          雖然美美花了 $40,000 購買商品，但只有已售出商品的成本會減少她 2025 年的所得。仍在手上的 $10,000 會成為她 2026 年的期初存貨。廣告費與平台手續費等其他營業費用，則另外在第 II 部分扣除。
        </p>

        <h2>小型企業納稅人例外</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['平均年度總收入上限（前 3 個課稅年度）', '3,100 萬美元（$31 million）', '3,200 萬美元（$32 million）'],
            ['來源', 'Rev. Proc. 2024-40；2025 年 Schedule C 說明', 'Rev. Proc. 2025-32（第 448(c) 條金額）'],
          ]}
        />
        <p>
          如果你前 3 個課稅年度的平均年度總收入不超過上限，<strong>而且</strong>不是第 448(d)(3) 條定義的<strong>避稅組織</strong>，你就是小型企業納稅人。避稅組織無論規模多小都不符合資格。如果企業存在不到 3 年，就以實際存在的期間計算，要計入前身實體的總收入，並把短期課稅年度換算為全年。
        </p>
        <p>
          這項測試看的是過去，而不是今年的銷售額。以曆年制的企業為例，2026 年是否符合資格，取決於 2023、2024 與 2025 年總收入的<strong>平均值</strong> — 所以 2026 年營收低於 3,200 萬美元（$32 million），本身並不能證明你符合資格，而且某一年收入特別高，也可能拉高平均值。相關企業也可能要合併計算：依第 448(c)(2) 條的合併規定，依第 52(a) 或 52(b) 條受控集團規定，或第 414(m) 或 414(o) 條關係服務集團規定被視為單一雇主的企業，其總收入要合併計算。如果你擁有不只一家企業，請先確認這些規定，再依賴這項例外。
        </p>

        <h2>小型企業納稅人可用的三種方法</h2>
        <ArticleTable
          head={['方法', '存貨成本何時扣除']}
          rows={[
            ['保留存貨', '在商品賣出時透過銷貨成本扣除；一般必須對進貨與銷貨使用權責發生制，並每年評價存貨'],
            ['把存貨當作非附帶性材料與用品', '只在品項被使用或消耗的那一年 — 也就是你把存貨提供給顧客的那一年 — 或你依會計方法支付或發生該成本的那一年，以較晚者為準'],
            ['依照你的財務會計處理', '依照你適用財務報表所使用的方法；如果沒有，則依照你按自身會計程序編製的帳冊與紀錄'],
          ]}
        />
        <p>
          兩種簡化方法只適用於小型企業納稅人，而且你的方法仍必須<strong>清楚反映所得</strong>。在材料與用品方法下，存貨成本是在商品提供給顧客的那一年，或支付或發生成本的那一年回收，以較晚者為準，所以購買存貨本身並不會產生扣除額。財務會計方法是依照你的適用財務報表或帳冊如何處理存貨，所以扣除時點取決於這些紀錄；在依賴它取得較早的扣除之前，請先尋求專業意見。小型企業納稅人也不適用統一資本化規則（uniform capitalization rules）；該規則原本要求把部分直接與間接成本計入存貨。
        </p>
        <p>
          <strong>範例：</strong>一位使用非附帶性材料與用品方法的賣家，在 2025 年 12 月支付 $5,000 購買商品，並在 2026 年 2 月出貨給顧客。這筆成本在 2026 年，也就是把商品提供給顧客的那一年扣除。如果改為這位使用現金收付制的賣家在 2025 年 12 月就把商品出貨給顧客，但到 2026 年 1 月才付款，這筆成本同樣在 2026 年扣除 — 也就是兩個年度中較晚的那一年。
        </p>

        <h2>存貨、營運費用與資本支出</h2>
        <ArticleTable
          head={['成本類型', '例子', '如何回收']}
          rows={[
            ['存貨', '為轉售而購買的商品、原料、為銷售而生產的品項', '依你的存貨方法，透過銷貨成本（第 III 部分）回收'],
            ['一般營運費用', '廣告、租金、平台手續費、軟體訂閱', '在第 II 部分扣除'],
            ['資本支出', '設備、車輛、使用年限超過一年的家具', '折舊，或在符合資格時依第 179 條或加速折舊扣除'],
          ]}
        />

        <h2>會計方法與 Form 3115</h2>
        <ul>
          <li>你是在第一次申報包含該企業 Schedule C 的稅表時選擇會計方法；第一次選擇不需要 Form 3115。</li>
          <li>之後要變更方法 — 包括存貨方法 — 一般需要 IRS 核准，通常是申報 <strong>Form 3115</strong>。</li>
          <li>如果你的總收入成長超過上限，可能就不再符合小型企業例外，這可能需要變更方法。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 年底大量進貨不會產生扣除額</div>
          <p>12 月多買庫存，如果商品仍在手上，並不會降低那一年的稅。如果你保留存貨或使用材料與用品方法，年底仍在手上的商品一般要等到賣出或提供給顧客時才扣除。請仔細盤點期末存貨並保留進貨紀錄。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

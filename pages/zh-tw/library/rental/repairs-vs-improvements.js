import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/repairs-vs-improvements.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'repairs-vs-improvements',
  sourceHash:      'd82c6df30c92',
  id:            '122',
  title:         '修繕還是改良：財產支出何時可扣除、何時要資本化',
  titleEn:       'Repairs vs. Improvements: Deducting or Capitalizing Property Costs',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 527（2025）、Publication 946（2025），以及 IRS 有形財產規定常見問題（2026 年 8 月審閱；摘要說明第 263(a) 條的正式規定），說明出租與營業財產的支出何時可以扣除、何時必須資本化並折舊。本文不詳細說明 Form 3115 的會計方法變更、存貨，或複雜建築物的財產單位規定',
  persona:       ['整修出租房產的房東', '購買家具與家電的 Airbnb 房東', '修理設備或營業場所的小企業老闆', '正在決定要扣除還是折舊的人'],
  relatedJourney: ['房產帶來的副業收入', 'Airbnb 與租金收入'],
  actionRequired: '針對每一筆財產支出，問自己：它是讓財產維持一般正常的運作狀態（通常可扣除），還是讓財產變得更好、恢復或改作他用（通常要資本化並折舊）？接著確認是否適用安全港規定 — 並把必要的選擇聲明附在如期申報（含延期）的稅表上。',
  sources: [
    { label: 'IRS — Publication 527（2025），住宅出租房產', url: 'https://www.irs.gov/pub/irs-pdf/p527.pdf' },
    { label: 'IRS — 有形財產正式規定（常見問題）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/tangible-property-final-regulations' },
    { label: 'IRS — Publication 946（2025），如何折舊財產', url: 'https://www.irs.gov/pub/irs-pdf/p946.pdf' },
  ],
}

const FAQS = [
  {
    q: '修繕和改良有什麼不同？',
    a: '修繕（repair）是讓財產維持一般、有效率的運作狀態，通常可以扣除。改良（improvement）是讓財產變得更好（betterment）、恢復財產（restoration），或改作新的或不同的用途（adaptation）；必須資本化，通常要折舊。',
  },
  {
    q: '$2,500 以下的支出都可以自動扣除嗎？',
    a: '不是。只有在你當年選擇適用最低金額安全港（de minimis safe harbor）、金額是以每張發票或每個項目計算，而且你依自己的政策在帳冊與紀錄中把這筆費用列為費用時，才適用 $2,500。它不適用於土地或存貨，也不是其他可扣除修繕的上限。',
  },
  {
    q: '我把出租房子的整個屋頂換掉了，可以扣除嗎？',
    a: '通常不行。更換主要的結構部分，例如整個屋頂，屬於恢復 — 是改良的一種。Publication 527 把新屋頂列為改良，要以和建築物相同的回收期間折舊（住宅出租房產為 27.5 年）。只有當當年該建築物的所有工程都在限額內時，小型納稅人安全港才可能有幫助。',
  },
  {
    q: '如何選擇適用最低金額安全港？',
    a: '在如期申報（含延期）的原始稅表上，附上一份標題為「Section 1.263(a)-1(f) de minimis safe harbor election」的聲明，寫明你的姓名、地址、納稅人識別號碼，並說明你選擇適用。這項選擇每年做一次，適用於當年所有符合條件的金額。不需要申報 Form 3115。',
  },
  {
    q: '例行維護安全港需要選擇嗎？',
    a: 'IRS 常見問題中沒有描述需要每年的選擇聲明。它適用於你預期會重複進行、讓財產維持一般有效率狀態的工作 — 就建築物而言，是你合理預期在建築物開始使用後 10 年內會做超過一次的工作。它不適用於讓財產變得更好的支出。IRS 常見問題說明，如果你本來就遵守這些規定，通常不需要採取任何行動；只有在你沒有遵守，或想要變更會計方法以使用這個安全港時，才涉及 Form 3115。',
  },
  {
    q: '如果我把支出資本化了呢？',
    a: '把成本加到財產的成本基礎並折舊。出租建築物的改良，以建築物的回收期間折舊；住宅出租房產使用的家電、地毯與家具屬於 5 年期財產。請保留紀錄 — 出售時會用到這些金額。',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: '出租房子或公寓，租金收入怎麼課稅？',
    desc:  '出租費用與折舊的基本概念。',
  },
  {
    href: '/library/small-business/section-179-bonus-depreciation',
    cat:  'Small Business & Self-Employment',
    title: '第 179 條與加速折舊：2025 與 2026 年規定',
    desc:  '資本化財產更快的扣除方式。',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '出售出租房產：折舊回收與 25% 稅率',
    desc:  '為什麼出售時成本基礎紀錄很重要。',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '其他營業費用規定。',
  },
]

export default function RepairsVsImprovementsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '修繕還是改良：財產支出何時可扣除、何時要資本化 | AskLinTax 繁體中文',
      description: '出租與營業財產的支出，何時是可扣除的修繕、何時是要資本化的改良：改善、恢復、改作他用、例行維護安全港、$2,500 最低金額安全港與小型納稅人安全港 — 附出租房產範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          讓財產維持一般運作狀態的<strong>修繕</strong>，通常可以在支付當年扣除。<strong>改良</strong> — 包括<strong>改善（betterment）</strong>、<strong>恢復（restoration）</strong>或<strong>改作他用（adaptation）</strong> — 必須資本化，通常要分好幾年折舊。有三個安全港規定可以讓你扣除某些原本要資本化的支出，但每個都有自己的條件，其中兩個需要在稅表上附選擇聲明。
        </p>

        <h2>三種改良</h2>
        <ArticleTable
          head={['類型', '意思', '出租房產例子']}
          rows={[
            ['改善（Betterment）', '修正既有的缺陷或狀況、擴大或擴充財產，或提高其容量、強度或品質', '增加一間臥室或露台；升級為品質高很多的系統'],
            ['恢復（Restoration）', '更換主要的結構部分、在依災害損失調整成本基礎後修復損壞，或把財產重建到如新的狀態', '更換整個屋頂；更換整套暖氣系統'],
            ['改作他用（Adaptation）', '把財產改成與你開始出租時預定的一般用途不一致的用途', '把住宅單位改成辦公空間'],
          ]}
        />
        <p>
          Publication 527 列出常見的改良，包括增建、新屋頂、防風窗、景觀美化、圍籬、中央空調、暖爐、熱水器、嵌入式家電、廚房現代化、地板，以及全室地毯。
        </p>

        <h2>三個安全港</h2>
        <ArticleTable
          head={['', '例行維護', '最低金額安全港', '小型納稅人安全港（建築物）']}
          rows={[
            ['涵蓋什麼', '讓財產維持一般有效率運作狀態的重複性工作', '每張發票或每個項目的小額取得或製作成本', '合格建築物的修繕、維護、改良與類似工程'],
            ['主要限制', '因你在營業中使用該財產而產生，且就建築物而言，你合理預期在開始使用後 10 年內會做超過一次的工作；不適用於改善', '每張發票或每個項目 $2,500（有合格財務報表者 $5,000）；你也必須在帳冊與紀錄中把成本列為費用；不適用於土地或存貨', '平均年度總收入 1,000 萬美元（$10 million）以下；建築物未調整成本基礎 100 萬美元（$1 million）以下；當年在該建築物的總支出不超過 $10,000 或其未調整成本基礎 2%（取較小者）'],
            ['需要選擇嗎？', '不需要每年的選擇聲明；只有為使用它而變更會計方法時才需要 Form 3115', '需要 — 每年在如期申報（含延期）的原始稅表上附聲明', '需要 — 每年在該年度稅表上附聲明'],
            ['適用範圍', '所有符合條件的金額', '選擇後，當年所有符合條件的金額', '當年該建築物所有符合條件的工程'],
          ]}
        />
        <p>
          這些安全港是每年的選擇或規定，不是會計方法變更，所以使用某一年的最低金額或小型納稅人安全港時，不需要申報 Form 3115。如果某筆金額不符合任何安全港，只要依一般的事實與情況分析屬於修繕，仍然可以扣除。
        </p>

        <h2>什麼時候必須折舊</h2>
        <ul>
          <li>資本化的改良要加到成本基礎並折舊，通常視為個別的財產處理。</li>
          <li>住宅出租建築物的改良，例如新屋頂，使用建築物的回收期間 — 一般折舊制度下為 27.5 年。</li>
          <li>住宅出租房產使用的家電、地毯與家具屬於 5 年期財產。</li>
          <li>某些財產可能可以使用加速折舊或第 179 條等較快的方法；請見<a href="/zh-tw/library/small-business/section-179-bonus-depreciation/">第 179 條與加速折舊</a>。</li>
        </ul>

        <h2>範例（2025 年，住宅出租）</h2>
        <ArticleTable
          head={['支出', '處理方式']}
          rows={[
            ['$350 修理漏水的水龍頭並補牆', '修繕 — 在 Schedule E 上扣除'],
            ['$1,800 的冰箱，已選擇最低金額安全港，且在屋主的紀錄中列為費用', '依最低金額安全港可以扣除；沒有選擇時，屬於 5 年期財產'],
            ['$14,000 更換整個屋頂', '恢復 — 資本化並以 27.5 年折舊；金額超過小型納稅人安全港每棟建築物每年 $10,000 的上限'],
            ['未調整成本基礎 $300,000 的建築物；當年在其上的總支出 $5,500', '在小型納稅人限額內（$6,000 = $10,000 與 2% × $300,000 取較小者），做出選擇後 $5,500 全部可以扣除'],
            ['同一棟建築物，但總支出 $7,000', '超過限額，所以該建築物當年不能使用小型納稅人安全港；每筆支出依一般規定分析'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 保留發票與選擇聲明</div>
          <p>最低金額安全港是以每張發票或每個項目計算，兩種選擇都必須附在稅表上。請保留發票、書面的費用化政策與選擇聲明的副本，並在紀錄中把修繕費用和改良費用分開。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

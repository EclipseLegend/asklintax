import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/owe-taxes-withholding-w4.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'owe-taxes-withholding-w4',
  sourceHash:      'f7592e9fe5d3',
  id:            '65',
  title:         '為什麼今年要補稅？看懂 W-4 與預扣稅',
  titleEn:       'Why do I owe taxes this year? Understanding your W-4 and withholding',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋聯邦所得稅預扣不足的 W-2 員工，說明常見原因與 Form W-4 如何運作；不涵蓋州稅預扣、退休金預扣（Form W-4P），以及 2026 年 Form W-4 上新扣除額的詳細規定',
  persona:       ['報稅時要補稅的 W-2 員工', '雙薪家庭', '有兩份工作或年中換工作的人', '領到獎金或有副業收入的員工'],
  relatedJourney: ['第一次報稅', '金錢與福利'],
  actionRequired: '先找出預扣不足的原因，再使用 IRS 的預扣稅估算工具（Tax Withholding Estimator），並把新的 Form W-4 交給雇主。如果你有沒有預扣稅的收入，也可以考慮繳預估稅。',
  sources: [
    { label: 'IRS — Topic no. 753，Form W-4 員工預扣稅證明（Employee\'s Withholding Certificate）', url: 'https://www.irs.gov/taxtopics/tc753' },
    { label: 'IRS — Form W-4（2026），員工預扣稅證明', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — Publication 505（2026），預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/publications/p505' },
    { label: 'IRS — Publication 15（2026），（Circular E）雇主稅務指南（Employer\'s Tax Guide）', url: 'https://www.irs.gov/publications/p15' },
    { label: 'IRS — 更新後的預扣稅估算工具反映 One, Big, Beautiful Bill 的變更', url: 'https://www.irs.gov/newsroom/updated-tax-withholding-estimator-lets-millions-of-taxpayers-take-one-big-beautiful-bill-changes-into-account-when-calculating-their-withholding' },
  ],
}

const FAQS = [
  {
    q: '我加薪了，為什麼反而要補稅？',
    a: '收入增加可能讓部分收入進到較高的級距；如果你的 W-4 或其他資訊已經過時，預扣可能跟不上。加薪本身不一定會造成要補稅 — 請用 IRS 的預扣稅估算工具檢查你的預扣。',
  },
  {
    q: '我和配偶都有工作，為什麼兩份工作預扣得不夠？',
    a: '除非 W-4 另有說明，每個雇主都把這份工作當成你唯一的收入來預扣。合起來後，你們的收入可能適用比各自工作假設的更高稅率。Form W-4 的 Step 2 就是給有多份工作或配偶也工作的人使用。',
  },
  {
    q: '為什麼我的獎金被扣這麼多（或這麼少）？',
    a: '雇主對獎金與其他補充工資（supplemental wages），常用固定 22% 預扣聯邦所得稅（一年中超過 $1 million 的補充工資為 37%）。這是預扣率，不是你實際的稅率，所以結果可能扣太多，也可能扣太少。',
  },
  {
    q: '我可以直接申報免扣繳（exempt），什麼都不扣嗎？',
    a: '只有在你去年沒有聯邦所得稅負擔、今年也預期沒有時才可以。免扣繳只適用於所得稅，不包括社會安全稅或聯邦醫療保險稅，而且每年都要用新的 Form W-4 重新申請。',
  },
  {
    q: '交了新的 W-4，就保證明年不用補稅嗎？',
    a: '不保證。它只會改變之後薪水的預扣。你最後的稅取決於那一年實際的收入、扣除額與抵稅額，所以情況有變時請再檢查預扣。',
  },
]

const RELATED = [
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  'Box 2 顯示預扣的聯邦所得稅。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '給沒有預扣稅的收入，例如自由工作。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '如果今年要補的稅一次繳不出來。',
  },
]

export default function OweTaxesWithholdingW4ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '為什麼今年要補稅？Form W-4 與預扣稅說明 | AskLinTax 繁體中文',
      description: '薪水明明有扣稅，報稅時還要補？預扣不足的常見原因 — 兩份工作、配偶也工作、獎金、副業收入 — 以及如何用預扣稅估算工具與新的 Form W-4 調整。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          從薪水中扣掉的聯邦所得稅叫做<strong>預扣稅</strong>（withholding），是你預先繳的稅。當你的預扣稅（加上抵稅額與其他已繳款項）少於這一年實際的稅，報稅時就要補稅。這通常代表你的 <strong>Form W-4</strong> 已經不符合你的情況，或你有沒有預扣稅的收入。你可以用 IRS 的預扣稅估算工具檢查，再把新的 Form W-4 交給雇主，修正之後的預扣。
        </p>
        <p>
          如果你需要繳清今年的餘額，請見<a href="/zh-tw/library/irs/cant-pay-tax-bill/">繳不出稅款怎麼辦？有哪些選擇？</a>
        </p>

        <h2>預扣稅怎麼運作</h2>
        <ul>
          <li>雇主依你交給他的 <strong>Form W-4</strong> 計算預扣。<a href="/zh-tw/library/individual/what-is-w2/">W-2</a> 的 Box 2 顯示這一年預扣的聯邦所得稅總額。</li>
          <li>W-4 是交給<strong>雇主</strong>，不是交給 IRS。</li>
          <li>如果你從來沒有交 W-4 給雇主，雇主一般會把你當作單身（或夫妻分開申報）、沒有其他調整來預扣。</li>
        </ul>

        <h2>要補稅的常見原因</h2>
        <ArticleTable
          head={['原因', '為什麼預扣不足', 'W-4 的哪一步處理']}
          rows={[
            ['兩份工作，或夫妻都工作', '每個雇主都把自己這份工作當成你唯一的收入來預扣', 'Step 2'],
            ['受扶養人或抵稅額改變', '孩子超過年齡，或某項抵稅額不再適用', 'Step 3'],
            ['沒有預扣稅的收入', '利息、股利、投資獲利或自由工作收入', 'Step 4(a)，或繳預估稅'],
            ['扣除額改變', '不再逐項扣除，或預期的扣除額沒有發生', 'Step 4(b)'],
            ['獎金或補充工資', '常用固定 22% 預扣，不一定符合你的稅率', 'Step 4(c) 額外預扣'],
            ['加薪或年中換工作', '舊的 W-4 資訊已經不符合你的收入', '新的 W-4'],
          ]}
        />

        <h2>獎金與固定 22%</h2>
        <p>
          雇主對獎金與其他補充工資，常用固定 <strong>22%</strong> 預扣聯邦所得稅；一年中超過 $1 million 的補充工資則為 <strong>37%</strong>。Publication 15（2026）表示這些稅率維持不變。這是預扣率，不是獎金的稅率 — 你實際的稅是報稅時依總收入計算。
        </p>

        <h2>怎麼修正明年的預扣</h2>
        <ol>
          <li><strong>使用 IRS 的預扣稅估算工具</strong>（Tax Withholding Estimator），準備最近的薪資單與最新的稅表。IRS 在 2026 年更新了這個工具，以反映 2025 年稅法的變更。</li>
          <li>依結果<strong>填寫新的 Form W-4</strong>，交給雇主的薪資部門。</li>
          <li>重大變化後<strong>再檢查一次</strong>：結婚或離婚、新生兒、第二份工作、配偶開始工作，或有新的副業收入。</li>
        </ol>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 2026 年的 Form W-4</div>
          <p>2026 年的 Form W-4 已經更新，員工可以透過 Step 4(b) 的扣除額計算表（Deductions Worksheet），把 2025 年稅法下的新聯邦扣除額 — 例如合格小費、加班費與乘用車貸款利息的扣除 — 納入考量。每一項扣除都有自己的資格與上限；本文不說明這些細節。</p>
        </div>

        <h2>預扣稅與預估稅</h2>
        <p>
          如果你有不少沒有預扣的收入 — 自由工作、出租或投資收入 — 可以提高 W-4 的預扣（Step 4(a) 或 4(c)），或繳<strong>預估稅</strong>（estimated tax）。Publication 505 說明什麼時候必須繳預估稅。請見<a href="/zh-tw/library/small-business/quarterly-taxes/">季度預估稅</a>。
        </p>

        <h2>例子（舉例用）</h2>
        <p>
          Ana 和 Leo 各自在不同工作年收入約 $70,000，夫妻合併申報。在這個例子中，兩人的 W-4 都填夫妻合併申報，而且都沒有在 Step 2 考慮另一份工作。因此每個雇主都把那份薪水當成全家唯一的收入來預扣，所以兩人加起來預扣不足，報稅時要補稅。不是每一對雙薪夫妻都會要補稅 — 結果取決於每份 W-4 怎麼填，以及家庭實際的收入、扣除額與抵稅額。他們用預扣稅估算工具，填寫了把兩份工作都考慮進去的新 W-4（Step 2），隔年的預扣因此提高。
        </p>

        <h2>常見迷思</h2>
        <ul>
          <li><strong>「有退稅代表我繳的稅比較少。」</strong>退稅只代表你這一年多繳了。</li>
          <li><strong>「要補稅代表我稅表報錯了。」</strong>通常只是預扣太少，而不是稅表有錯。</li>
          <li><strong>「交新的 W-4 就保證不用補稅。」</strong>它只改變之後的預扣；結果由你實際的收入與抵稅額決定。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

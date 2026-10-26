import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/salt-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'salt-deduction',
  sourceHash:      'e7ae5d877b37',
  id:            '70',
  title:         '州稅與地方稅（SALT）扣除額：上限、收入限制與實例',
  titleEn:       'SALT Deduction: Limits, Income Rules, and Examples',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Schedule A 填寫說明、IRS Topic 503 與 IRS Publication 505（2026），說明 2025 與 2026 稅務年度聯邦分項扣除中的州稅與地方稅（SALT）扣除額。計算步驟與範例使用 2025 年的規定。本文不涵蓋州所得稅規定或企業層級的稅務選擇',
  persona:       ['繳房屋稅（地產稅）的屋主', '住在州所得稅較高的州的人', '正在考慮是否分項扣除的納稅人', '收入接近門檻的較高收入家庭'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '把你繳的州與地方所得稅（或銷售稅）和房地產稅加總，依你的報稅身分與收入套用 SALT 上限，再把分項扣除總額和標準扣除額比較。只有分項扣除時，SALT 扣除額才有幫助。',
  sources: [
    { label: 'IRS — 2025 年 Schedule A（Form 1040）填寫說明，分項扣除（Itemized Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/i1040sca.pdf' },
    { label: 'IRS — Topic no. 503，可扣除的稅（Deductible taxes）', url: 'https://www.irs.gov/taxtopics/tc503' },
    { label: 'IRS — Publication 505（2026），預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — Form W-4（2026），Step 4(b) 扣除額工作表（Deductions Worksheet）', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — 2024 年 Schedule A（Form 1040）填寫說明（前一年度上限）', url: 'https://www.irs.gov/pub/irs-prior/i1040sca--2024.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（標準扣除額）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: '2025 年的 SALT 上限是多少？',
    a: '2025 年，州與地方所得稅（或銷售稅）、房地產稅與個人財產稅的扣除額上限為 $40,000（夫妻分開申報 $20,000）。修正後調整總收入超過 $500,000（夫妻分開申報 $250,000）時上限會減少，但不會低於 $10,000（夫妻分開申報 $5,000）。',
  },
  {
    q: '2026 年的 SALT 上限是多少？',
    a: '依據 IRS Publication 505（2026），2026 年的上限為 $40,400（夫妻分開申報 $20,200）。修正後調整總收入超過 $505,000（夫妻分開申報 $252,500）時上限會減少，但不會低於 $10,000（夫妻分開申報 $5,000）。2026 年 Form W-4 也使用相同金額。',
  },
  {
    q: '使用標準扣除額的話，可以享有 SALT 扣除嗎？',
    a: '不行。SALT 扣除額是 Schedule A 上的分項扣除項目，只有在你的分項扣除總額高於標準扣除額時才有幫助。',
  },
  {
    q: '我在台灣的房屋稅可以扣除嗎？',
    a: '不行。Schedule A 填寫說明把外國的個人財產稅或不動產稅列為不能扣除的稅。',
  },
  {
    q: '上限是所得稅和房屋稅分開計算嗎？',
    a: '不是。州與地方所得稅（或一般銷售稅）、房地產稅與個人財產稅共用一個合計上限。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '標準扣除額與分項扣除的說明。',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '為什麼外國房屋稅不算 SALT。',
  },
  {
    href: '/library/individual/alternative-minimum-tax',
    cat:  'Individuals & Families',
    title: '替代性最低稅（AMT）：2025 與 2026 年規定',
    desc:  'AMT 如何計算，附 2025 與 2026 年數字。',
  },
]

export default function SaltDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '州稅與地方稅（SALT）扣除額：2025 與 2026 年上限與實例 | AskLinTax 繁體中文',
      description: '州稅與地方稅（SALT）扣除額：2025 年 $40,000 與 2026 年 $40,400 上限、收入較高時的遞減、$10,000 下限，以及什麼時候分項扣除比較有利。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你在 Schedule A 上<strong>分項扣除</strong>，就可以扣除你繳的州稅與地方稅 — <strong>所得稅或一般銷售稅</strong>，加上<strong>房地產稅</strong>與<strong>個人財產稅</strong>。這些通常合稱 <strong>SALT</strong>。<strong>2025 年</strong>的合計扣除額上限為 <strong>$40,000</strong>（夫妻分開申報 $20,000），2024 年則是 $10,000（$5,000）。<strong>2026 年</strong>的上限為 <strong>$40,400</strong>（夫妻分開申報 $20,200）。
        </p>
        <p>
          收入較高時上限會縮小。2025 年，修正後調整總收入（MAGI）超過 <strong>$500,000</strong>（夫妻分開申報 $250,000）的部分，要減去其 <strong>30%</strong>，但上限絕不會低於 <strong>$10,000</strong>（夫妻分開申報 $5,000）。2026 年，MAGI 超過 <strong>$505,000</strong>（夫妻分開申報 $252,500）時開始遞減，下限同樣是 $10,000（$5,000）。
        </p>
        <p>
          如果你使用<strong>標準扣除額</strong>，SALT 扣除額對你沒有幫助。
        </p>

        <h2>哪些稅可以算</h2>
        <ArticleTable
          head={['Schedule A 行次', '包括哪些稅']}
          rows={[
            ['5a', '州與地方所得稅 — 或改用一般銷售稅（兩者擇一）'],
            ['5b', '州與地方房地產稅'],
            ['5c', '州與地方個人財產稅'],
            ['不能扣除', '外國的個人財產稅或不動產稅、聯邦所得稅、社會安全稅與聯邦醫療保險稅等'],
          ]}
        />
        <p>
          上限適用於 5a 到 5c 行的<strong>合計</strong>，不是每種稅分開計算。
        </p>

        <h2>2025 年上限的計算步驟</h2>
        <ArticleTable
          head={['步驟', '規定']}
          rows={[
            ['1. 起點', '$40,000'],
            ['2. 比較收入', '你的 MAGI 是否超過 $500,000（夫妻分開申報 $250,000）？'],
            ['3. 遞減', '如果超過，從 $40,000 減去超過部分的 30%'],
            ['4. 下限', '結果絕不低於 $10,000'],
            ['5. 夫妻分開申報', '使用結果的一半'],
            ['6. 你的扣除額', '這個上限與你實際繳的州稅與地方稅，兩者中較小的金額'],
          ]}
        />
        <p>
          這裡的 MAGI 是你的調整後總收入，加上某些被排除的收入 — 包括依海外所得排除（Form 2555）排除的收入，或來自波多黎各、美屬薩摩亞的收入。
        </p>

        <h2>範例（示意，2025 稅務年度）</h2>
        <ArticleTable
          head={['納稅人', 'MAGI', '已繳 SALT', '上限', '扣除額']}
          rows={[
            ['單身', '$150,000', '$17,000', '$40,000（不遞減）', '$17,000'],
            ['夫妻合併申報', '$550,000', '$50,000', '$40,000 − 30% × $50,000 = $25,000', '$25,000'],
            ['夫妻合併申報', '$650,000', '$50,000', '$40,000 − $45,000 低於下限 → $10,000', '$10,000'],
            ['夫妻分開申報', '$300,000', '$25,000', '$40,000 − 30% × $50,000 = $25,000；一半為 $12,500', '$12,500'],
          ]}
        />

        <h2>要不要分項扣除？</h2>
        <p>
          只有在你的<strong>分項扣除總額</strong> — SALT 加上房貸利息、慈善捐款與其他 Schedule A 項目 — 高於標準扣除額時，SALT 扣除額才有意義。2025 年的標準扣除額為單身 $15,750、夫妻合併申報 $31,500、戶長 $23,625。
        </p>
        <p>
          <strong>範例：</strong>Jenny 是單身，州所得稅與房地產稅共 $17,000，房貸利息 $6,000，慈善捐款 $1,000 — 分項扣除共 $24,000。這高於她 $15,750 的標準扣除額，所以分項扣除比較划算。如果她唯一的分項扣除只有 $9,000 的州稅，標準扣除額就比較高。請見<a href="/zh-tw/library/individual/tax-credit-vs-deduction/">抵稅額與扣除額的差別</a>與<a href="/zh-tw/library/individual/first-time-filer/">第一次報稅指南</a>。
        </p>

        <h2>2025 年與 2026 年</h2>
        <ArticleTable
          head={['規定', '2025 稅務年度', '2026 稅務年度']}
          rows={[
            ['上限', '$40,000（夫妻分開申報 $20,000）', '$40,400（夫妻分開申報 $20,200）'],
            ['MAGI 超過多少開始遞減', '$500,000（夫妻分開申報 $250,000）', '$505,000（夫妻分開申報 $252,500）'],
            ['下限', '$10,000（夫妻分開申報 $5,000）', '$10,000（夫妻分開申報 $5,000）'],
          ]}
        />
        <p>
          2026 年的金額來自 IRS Publication 505（2026），2026 年 Form W-4 也使用相同數字。Publication 505 說明 2026 年上限在超過收入門檻時會遞減，但沒有重述遞減比率，因此本文的計算步驟與範例使用 2025 年的規定。計算 2026 年的遞減之前，請在 IRS 公布 2026 年 Schedule A 填寫說明後再確認。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「現在每個人都可以扣除 $40,000 的州稅。」</strong>只有分項扣除的人受惠，扣除額不能超過你實際繳的金額，收入較高時上限也會減少。</li>
          <li><strong>「上限是每種稅分開算。」</strong>所得稅（或銷售稅）、房地產稅與個人財產稅共用一個上限。</li>
          <li><strong>「高收入者完全不能扣。」</strong>上限不會低於 $10,000（夫妻分開申報 $5,000）。</li>
          <li><strong>「我在國外的房屋稅也算。」</strong>外國不動產稅不能作為 SALT 扣除。請見<a href="/zh-tw/library/investment/foreign-property/">海外房產</a>。</li>
          <li><strong>「夫妻分開申報可以加倍。」</strong>每份分開申報的稅表只能使用一半的上限。</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 只說明聯邦規定</div>
          <p>本文說明的是聯邦扣除額。你所在的州對州稅表上扣除稅款可能有自己的規定；請不要假設兩者相同。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

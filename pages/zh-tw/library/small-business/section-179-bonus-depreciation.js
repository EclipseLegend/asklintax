import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/section-179-bonus-depreciation.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'section-179-bonus-depreciation',
  sourceHash:      '53afb4180548',
  id:            '80',
  title:         '第 179 條與加速折舊：2025 與 2026 年規定',
  titleEn:       'Section 179 and Bonus Depreciation: 2025 and 2026 Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 946（2025）、2025 年 Schedule C 填寫說明、Publication 334（2025）、Revenue Procedure 2025-32，以及 IRS Notice 2026-11，說明 2025 與 2026 稅務年度小型企業適用的聯邦第 179 條扣除額與加速（特別）折舊。Notice 2026-11 是過渡指引，之後預計會發布擬議法規。本文不詳細涵蓋小客車折舊上限、不動產，以及州是否跟進聯邦規定',
  persona:       ['購買設備的小型企業老闆', '購買電腦、相機或工具的自由業者', '獨資經營者與單一成員 LLC 擁有人', '規劃年底採購的企業主'],
  relatedJourney: ['經營小型企業', '了解新稅務規定'],
  actionRequired: '購買事業設備時，記錄購買日期、開始使用日期、成本，以及事業使用比例。然後在 Form 4562 上決定要使用第 179 條、加速折舊或一般折舊。',
  sources: [
    { label: 'IRS — Publication 946（2025），財產如何折舊（How To Depreciate Property）', url: 'https://www.irs.gov/publications/p946' },
    { label: 'IRS — Schedule C（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Publication 334（2025），小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整，第 4.24 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Notice 2026-11，第 168(k) 條首年額外折舊扣除額過渡指引', url: 'https://www.irs.gov/pub/irs-drop/n-26-11.pdf' },
    { label: 'IRS — Form 4562 填寫說明，折舊與攤銷', url: 'https://www.irs.gov/instructions/i4562' },
  ],
}

const FAQS = [
  {
    q: '第 179 條和加速折舊有什麼不同？',
    a: '兩者都讓你在第一年扣除資產的部分或全部成本，而不是分好幾年扣除。第 179 條是你針對特定財產做的選擇，有每年的金額上限，也有以事業所得為基礎的限制。加速（特別）折舊（bonus depreciation）會自動適用於合格財產，除非你選擇不適用，而且不受第 179 條的金額上限限制。',
  },
  {
    q: '2025 與 2026 年的加速折舊是 100% 嗎？',
    a: '依 Publication 946 與 Notice 2026-11 的說明，2025 年 1 月 19 日之後取得並開始使用的合格財產，2025 年稅法提供永久性的 100% 特別折舊。2025 年 1 月 20 日之前取得、在 2025 年開始使用的合格財產，一般以 40% 為限。',
  },
  {
    q: '第 179 條的上限是多少？',
    a: '2025 年開始的稅務年度最多 $2,500,000；當年度開始使用的第 179 條財產成本超過 $4,000,000 時，上限按超過的金額等額減少。2026 年的上限是 $2,560,000，超過 $4,090,000 開始減少。',
  },
  {
    q: '我也拿來私用的電腦可以用第 179 條嗎？',
    a: '只有在開始使用那一年的事業使用比例超過 50% 時才可以。然後用成本乘以你的事業使用比例。如果之後事業使用比例降到 50% 以下（含），你可能要把部分扣除額加回收入（回收，recapture）。',
  },
  {
    q: '第 179 條可以造成事業虧損嗎？',
    a: '不行。第 179 條扣除額以你當年度從積極經營任何事業所得到的應稅所得為上限。因為這項限制而不能扣除的金額，可以結轉到下一年。',
  },
  {
    q: '買 SUV 可以全部扣除嗎？',
    a: '不一定。運動型多用途車（SUV）的第 179 條扣除額，2025 年開始的稅務年度上限是 $31,300，2026 年是 $32,000，而且小客車另有 Publication 946 說明的每年折舊上限。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '不需要折舊的日常事業費用。',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '折舊與第 179 條出現的地方（第 13 行）。',
  },
  {
    href: '/library/small-business/home-office-deduction',
    cat:  'Small Business',
    title: '家庭辦公室扣除額：我符合資格嗎？',
    desc:  '家庭辦公室的折舊有自己的規定。',
  },
  {
    href: '/library/rental/repairs-vs-improvements',
    cat:  'Real Estate & Airbnb',
    title: '修繕還是改良：財產支出何時可扣除、何時要資本化',
    desc:  '財產支出是現在扣除還是要折舊。',
  },
]

export default function Section179BonusDepreciationZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '第 179 條與加速折舊：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: '第一年就扣除事業設備：2025 與 2026 年第 179 條上限、2025 年 1 月 19 日之後的 100% 加速折舊、事業使用規定、SUV，以及 Form 4562。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          購買可以使用超過一年的設備、電腦、家具或其他事業財產時，你一般要<strong>折舊</strong> — 也就是分好幾年扣除成本。有兩項規定可以讓你改在<strong>第一年</strong>扣除大部分或全部成本：
        </p>
        <ul>
          <li><strong>第 179 條：</strong>選擇把合格財產的成本直接列為費用，以每年的金額上限與你的事業所得為限。</li>
          <li><strong>加速（特別）折舊：</strong>合格財產的首年額外扣除額 — <strong>2025 年 1 月 19 日</strong>之後取得並開始使用的財產為 <strong>100%</strong>。</li>
        </ul>

        <h2>上限：2025 與 2026 年</h2>
        <ArticleTable
          head={['規定', '2025 年開始的稅務年度', '2026 年開始的稅務年度']}
          rows={[
            ['第 179 條最高扣除額', '$2,500,000', '$2,560,000'],
            ['當年度開始使用的財產超過下列金額時，第 179 條上限開始減少', '$4,000,000', '$4,090,000'],
            ['運動型多用途車（SUV）的第 179 條上限', '$31,300', '$32,000'],
            ['加速折舊 — 2025 年 1 月 19 日之後取得並開始使用的合格財產', '100%（2025 年 1 月 19 日之後結束的第一個稅務年度，可以改選 40%）', '100%'],
            ['加速折舊 — 2025 年 1 月 20 日之前取得、2025 年開始使用的合格財產', '一般為 40%', '不適用'],
          ]}
        />
        <p>
          2025 年的金額來自 Publication 946（2025）；2026 年的第 179 條金額來自 Revenue Procedure 2025-32。依 Notice 2026-11 的說明，2025 年稅法（P.L. 119-21 第 70301 條）讓 2025 年 1 月 19 日之後取得的財產的 100% 特別折舊成為永久性。依該通知，如果已經簽訂書面具約束力的取得合約，財產的取得日期不會被視為晚於簽約日。
        </p>

        <h2>誰和哪些財產符合資格</h2>
        <ul>
          <li><strong>第 179 條財產</strong>必須是為了用於你的事業而取得 — 例如機器與設備、現成的電腦軟體，以及某些合格不動產。只為了產生收入而持有的財產（例如投資財產）不符合資格。</li>
          <li><strong>事業使用超過 50%：</strong>同時用於事業與私人用途的財產，只有在開始使用那一年事業使用超過 50% 時，才能選擇第 179 條，而且只限事業使用的比例。</li>
          <li><strong>事業所得限制：</strong>第 179 條扣除額不能超過你從積極經營任何事業所得到的應稅所得；超過的部分結轉。</li>
          <li><strong>加速折舊</strong>適用於合格財產 — 一般是回收期間 20 年以下的有形財產、某些電腦軟體與其他列出的類別 — 可以是新的或某些二手財產。事業使用 50% 以下（含）的列舉財產（listed property）不符合資格。</li>
          <li><strong>選擇不適用：</strong>除非你針對某一類財產選擇不適用，否則加速折舊會自動適用。</li>
        </ul>

        <h2>範例（示意）</h2>
        <p>
          <strong>2025 年 — 電腦全額扣除：</strong>Leo 是獨資經營者，2025 年 3 月購買了一套 $12,000 的電腦系統，只用於事業。因為他是在 2025 年 1 月 19 日之後取得並開始使用，所以可以適用 <strong>100% 加速折舊</strong>，他也可以選擇第 179 條。不論哪一種，他一般都可以在 2025 年扣除全額 <strong>$12,000</strong>。
        </p>
        <p>
          <strong>部分私用：</strong>Rosa 買了一台 $5,000 的相機，70% 用於事業。因為事業使用超過 50%，成本中屬於事業的部分 — <strong>$3,500</strong>（$5,000 × 70%）— 可以用於第 179 條。
        </p>
        <p>
          <strong>2026 年 — 上限減少：</strong>一家企業在 2026 年開始使用 $4,200,000 的第 179 條財產。這比 $4,090,000 多了 $110,000，所以它的第 179 條上限從 $2,560,000 降為 <strong>$2,450,000</strong>。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>只看購買日期。</strong>規定取決於財產何時取得（包括書面具約束力的合約）以及何時開始使用。</li>
          <li><strong>對事業使用 50% 以下（含）的財產申請第 179 條。</strong></li>
          <li><strong>扣除私人使用的部分。</strong>只有事業使用的比例可以算。</li>
          <li><strong>以為第 179 條可以造成虧損。</strong>它以事業應稅所得為限；其餘的結轉。</li>
          <li><strong>忘了回收（recapture）：</strong>之後事業使用比例降到 50% 以下（含）時要注意。</li>
          <li><strong>以為所有車輛都可以全額扣除。</strong>SUV 與小客車有特別的上限。</li>
        </ul>

        <h2>IRS 表格與申報</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Form 4562', '選擇第 179 條（Part I），申請特別折舊、一般折舊與列舉財產'],
            ['Schedule C 第 13 行', '獨資經營者扣除 Form 4562 上的折舊與第 179 條的地方'],
            ['Form 4797', '申報回收與事業財產的出售'],
          ]}
        />

        <h2>加州注意事項</h2>
        <p>
          各州不一定跟進聯邦的折舊規定。AskLinTax 撰寫本文時，沒有依加州稅務局（Franchise Tax Board）的資料查證加州目前對第 179 條與加速折舊的處理方式，因此本文不列出。在加州稅表上使用聯邦金額之前，請先查看加州稅務局的資料。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 過渡指引</div>
          <p>Notice 2026-11 是過渡指引；財政部與 IRS 表示之後會發布擬議法規。撰寫本文時，2026 年 Form 4562 填寫說明尚未定案。申報前請先確認。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

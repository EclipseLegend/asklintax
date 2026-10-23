import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/child-dependent-care-credit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'child-dependent-care-credit',
  sourceHash:      'b43c01c31db0',
  id:            '74',
  title:         '兒童與受扶養人照顧抵稅額：2025 與 2026 年規定與範例',
  titleEn:       'Child and Dependent Care Credit: 2025 and 2026 Rules and Examples',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 2441 與填寫說明、Publication 503（2025）、Publication 15-B（2026）以及 IRS Working Families Tax Cuts 頁面，說明 2025 與 2026 稅務年度的聯邦兒童與受扶養人照顧抵稅額（Form 2441）。2026 年詳細的比率表來自 2026 年 Form 2441 填寫說明草稿（2026 年 8 月），可能會改變。本文不涵蓋州抵稅額',
  persona:       ['支付托育費用的上班父母', '照顧失能配偶或受扶養人的家庭', '有受扶養人照顧 FSA 的員工', '比較 2025 與 2026 年規定的父母'],
  relatedJourney: ['準備報稅', '為孩子做規劃'],
  actionRequired: '保留照顧費用紀錄，以及每位照顧者的姓名、地址與納稅人識別號碼。在 Form 2441 上計算抵稅額。如果雇主提供受扶養人照顧 FSA，請和抵稅額一起規劃 — 排除的福利會減少你可以使用的費用。',
  sources: [
    { label: 'IRS — Publication 503（2025），兒童與受扶養人照顧費用（Child and Dependent Care Expenses）', url: 'https://www.irs.gov/pub/irs-pdf/p503.pdf' },
    { label: 'IRS — 2025 年 Form 2441 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i2441.pdf' },
    { label: 'IRS — Form 2441（2025），兒童與受扶養人照顧費用', url: 'https://www.irs.gov/pub/irs-pdf/f2441.pdf' },
    { label: 'IRS — 2026 年 Form 2441 填寫說明草稿（2026 年 8 月，非正式版本）', url: 'https://www.irs.gov/pub/irs-dft/i2441--dft.pdf' },
    { label: 'IRS — Working Families Tax Cuts（兒童與受扶養人照顧抵稅額的加強）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Publication 15-B（2026），雇主附加福利稅務指南（Employer\'s Tax Guide to Fringe Benefits）', url: 'https://www.irs.gov/pub/irs-pdf/p15b.pdf' },
    { label: 'IRS — Topic no. 602，兒童與受扶養人照顧抵稅額', url: 'https://www.irs.gov/taxtopics/tc602' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '這項抵稅額可以退還嗎？',
    a: '不可以。兒童與受扶養人照顧抵稅額可以把你的聯邦所得稅減到零，但超過你稅額的部分不會退還。',
  },
  {
    q: '2026 年有什麼改變？',
    a: '從 2026 年起，最高抵稅比率從合格費用的 35% 提高到 50%，而比率開始下降的收入水準也提高了。費用上限仍為一位合格受照顧者 $3,000、兩位以上 $6,000。2026 年詳細的比率表在 IRS 填寫說明草稿中，可能會改變。',
  },
  {
    q: '夏令營算嗎？',
    a: '日間營隊可以算是照顧費用，即使是專注於足球或電腦等活動的營隊也可以。過夜營隊不算。',
  },
  {
    q: '我付錢請媽媽幫忙帶小孩，可以申請抵稅額嗎？',
    a: '有可能。付給親屬的費用可以符合資格，但付給你的配偶、孩子的父母、你可以申報為受扶養人的人，或年底未滿 19 歲的你自己的孩子，則不符合。你必須申報照顧者的身分資料。',
  },
  {
    q: '我用了受扶養人照顧 FSA，還能申請抵稅額嗎？',
    a: '只能用 FSA 福利沒有用掉的那部分費用上限。排除的雇主福利會減少 $3,000 或 $6,000 的上限。2026 年如果你排除了全部 $7,500，一般就不能為 2026 年的費用申請抵稅額。',
  },
  {
    q: '夫妻分開申報可以申請嗎？',
    a: '一般不行 — 已婚者必須夫妻合併申報。分開申報的配偶只有在有限情況下才能被視為未婚，例如這一年最後六個月與另一位配偶分居，並符合住所相關條件。',
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
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '另一項給 17 歲以下孩子的抵稅額。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '可退還與不可退還抵稅額的說明。',
  },
  {
    href: '/library/individual/household-employees-schedule-h',
    cat: 'Individuals & Families',
    title: '聘請保母或看護：家庭雇員稅與 Schedule H',
    desc: '付錢請保母或看護時的稅。',
  },
]

export default function ChildDependentCareCreditZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '兒童與受扶養人照顧抵稅額：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: '兒童與受扶養人照顧抵稅額：誰符合資格、哪些照顧費用算、$3,000 與 $6,000 上限、2025 與 2026 年抵稅比率、FSA 的影響，以及範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你為了工作或找工作，支付 13 歲以下孩子（或無法自理的配偶或受扶養人）的照顧費用，你可能可以在 <strong>Form 2441</strong> 上申請<strong>兒童與受扶養人照顧抵稅額</strong>（Child and Dependent Care Credit）。抵稅額是照顧費用的一定比例，費用上限為一位合格受照顧者 <strong>$3,000</strong>，兩位以上 <strong>$6,000</strong>。
        </p>
        <ul>
          <li><strong>2025 年：</strong>收入較低時比率為 <strong>35%</strong>，調整後總收入（AGI）超過 $43,000 後降為 <strong>20%</strong>。</li>
          <li><strong>2026 年：</strong>最高比率提高到 <strong>50%</strong>（IRS 已確認）。依 2026 年 Form 2441 填寫說明<strong>草稿</strong>，較高比率也延伸到更高的收入，比率最低仍是 20%。</li>
          <li>這項抵稅額<strong>不可退還</strong>：它可以把你的稅減到零，但不會產生退稅。</li>
        </ul>

        <h2>誰符合資格</h2>
        <ul>
          <li><strong>合格受照顧者：</strong>你可以申報為受扶養人、未滿 13 歲的合格子女；身體或心理上無法自理、並和你同住超過半年的配偶；或無法自理、和你同住超過半年、你可以申報為受扶養人的人（或除了總收入在 2025 年達 $5,200 以上、2026 年達 $5,300 以上之外，原本可以申報的人）。</li>
          <li><strong>與工作相關：</strong>照顧必須是為了讓你（已婚者還有你的配偶）可以工作或找工作。</li>
          <li><strong>勞動所得：</strong>你的費用不能超過你的勞動所得 — 已婚者則不能超過你和配偶中較低的勞動所得。全職學生或無法自理的配偶，視為每月有 $250 勞動所得（兩位以上合格受照顧者時為 $500）。</li>
          <li><strong>報稅身分：</strong>單身、戶長、符合資格的未亡配偶，或夫妻合併申報。已婚者一般必須合併申報。</li>
          <li><strong>照顧者：</strong>不能是你的配偶、孩子的父母、你可以申報為受扶養人的人，或年底未滿 19 歲的你自己的孩子。你必須申報照顧者的姓名、地址與納稅人識別號碼（可以用 Form W-10 索取）。</li>
        </ul>

        <h2>哪些費用算</h2>
        <ArticleTable
          head={['一般符合資格', '一般不符合資格']}
          rows={[
            ['托兒所、保母與奶媽', '幼稚園或更高年級的學費'],
            ['幼稚園之前的學前班或托兒班', '過夜營隊'],
            ['課前與課後照顧', '暑期學校與家教課程'],
            ['日間營隊，包括專門活動的日間營隊', '餐費、衣服、教育或娛樂費用'],
            ['部分是為了照顧合格受照顧者的家務服務', '司機、調酒師或園丁；子女撫養費'],
          ]}
        />

        <h2>抵稅比率：2025 年與 2026 年</h2>
        <ArticleTable
          head={['調整後總收入', '2025 年（所有報稅身分）', '2026 年（草稿比率表）']}
          rows={[
            ['$15,000 以下', '35%', '50%'],
            ['超過 $15,000', '每 $2,000（不足 $2,000 也算）降 1 個百分點', '每 $2,000（不足 $2,000 也算）降 1 個百分點，超過 $43,000 時降到 35%'],
            ['超過 $43,000', '20%', '35%，直到 $150,000（夫妻合併申報）或 $75,000（其他報稅身分）'],
            ['更高收入', '20%', '超過上述水準後，每 $4,000（合併申報）或 $2,000（其他報稅身分）降 1 個百分點'],
            ['最低比率', '20%（AGI 超過 $43,000）', '20%（合併申報 AGI 超過 $206,000，或其他報稅身分超過 $103,000）'],
          ]}
        />
        <p>
          2026 年 50% 的最高比率，以及維持不變的 $3,000 / $6,000 費用上限，已在 IRS Working Families Tax Cuts 頁面上確認。上表 2026 年的逐級比率來自 2026 年 Form 2441 填寫說明<strong>草稿</strong>（2026 年 8 月），正式版本可能會改變。2026 年 Form 2441 草稿不再在表格上列出比率表，而是要你在填寫說明中查詢比率。
        </p>

        <h2>受扶養人照顧 FSA 與雇主福利</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['可以從收入中排除的雇主受扶養人照顧福利上限', '$5,000（夫妻分開申報 $2,500）', '$7,500（夫妻分開申報 $3,750）'],
          ]}
        />
        <p>
          你透過雇主受扶養人照顧協助計畫（通常是受扶養人照顧 FSA）排除的福利，會<strong>減少</strong>抵稅額的 $3,000 或 $6,000 上限。2026 年 Form 2441 填寫說明草稿指出，$7,500 的上限只有在雇主的計畫允許時才適用；如果計畫仍然只允許 $5,000，就使用 $5,000。如果你排除了全部 $7,500，一般就不能為 2026 年的費用申請抵稅額，因為 $7,500 超過兩種上限。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>2025 年 — 兩個孩子：</strong>Lin 和 David 夫妻合併申報，AGI 為 $100,000，為兩個 13 歲以下的孩子支付 $8,000 課後照顧費用。他們的費用上限是 $6,000，比率是 20%，所以抵稅額是 <strong>$1,200</strong>（前提是他們至少有這麼多稅額）。
        </p>
        <p>
          <strong>同一家人在 2026 年：</strong>合併申報 AGI 為 $100,000，依 2026 年草稿比率表，比率是 35%。他們的抵稅額會是 $6,000 × 35% = <strong>$2,100</strong>。
        </p>
        <p>
          <strong>2026 年較高收入：</strong>一對夫妻合併申報，AGI 為 $250,000，費用相同，超過 $206,000，所以依 2026 年草稿比率表，比率是 20%，抵稅額是 <strong>$1,200</strong> — 和 2025 年相同。
        </p>
        <p>
          <strong>FSA 加上抵稅額（2026 年）：</strong>一位有兩個 13 歲以下孩子的單親家長，透過受扶養人照顧 FSA 排除了 $5,000，並支付 $10,000 照顧費用。$6,000 上限要減去 $5,000，所以只剩 <strong>$1,000</strong> 的費用可以用來計算抵稅額。
        </p>
        <p>
          <strong>低收入：</strong>一位以戶長身分申報、2025 年 AGI 為 $14,000 的家長，比率是 35%，但如果標準扣除額讓應稅所得變成零，就沒有稅額可以讓這項不可退還的抵稅額來減少。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「它和兒童抵稅額一樣。」</strong>兩者是規定不同的不同抵稅額；你可能兩種都符合資格。</li>
          <li><strong>「即使不欠稅也可以退稅。」</strong>這項抵稅額不可退還。</li>
          <li><strong>「學費也算。」</strong>幼稚園與更高年級的學費不算照顧費用。</li>
          <li><strong>「可以用 FSA 的錢，又拿全額抵稅額。」</strong>排除的福利會減少抵稅額的費用上限。</li>
          <li><strong>「2025 年就適用 50% 的比率。」</strong>較高的比率從 2026 年開始；2025 年使用 35% 到 20% 的比率表。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 2026 年細節來自填寫說明草稿</div>
          <p>2026 年 50% 的最高比率、$7,500 的排除額，以及 $5,300 的總所得金額，已在正式 IRS 資料中確認（Working Families Tax Cuts 頁面、Publication 15-B 與 Revenue Procedure 2025-32）。2026 年詳細的比率表來自 Form 2441 填寫說明草稿，可能會改變。本文不涵蓋州抵稅額。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

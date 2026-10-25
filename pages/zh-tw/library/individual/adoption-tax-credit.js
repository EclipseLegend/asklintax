import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/adoption-tax-credit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'adoption-tax-credit',
  sourceHash:      'ac4e5de7ba0b',
  id:            '112',
  title:         '收養抵稅額：2025 與 2026 年上限與新的可退還部分',
  titleEn:       'Adoption Tax Credit: 2025 and 2026 Limits and the New Refundable Portion',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 8839 說明、Rev. Proc. 2025-32（2026 年金額）、IRS Topic No. 607，以及 IRS 關於 2025 年收養抵稅額結轉調整的問答，說明 2025 與 2026 稅務年度的聯邦收養抵稅額，以及雇主收養福利的免稅規定。本次審閱時，2026 年 Form 8839 及其說明尚未定案，因此 2026 年的申報程序應以正式版本確認。本文不涵蓋州的收養抵稅額，也不詳細說明雇主收養協助計畫',
  persona:       ['在美國收養孩子的父母', '完成跨國收養的家庭', '從寄養體系收養特殊需求兒童的父母', '有雇主收養福利的員工'],
  relatedJourney: ['為孩子做規劃', '有受扶養人的報稅'],
  actionRequired: '保留每一筆收養費用與付款日期的紀錄，記下是國內還是跨國收養、何時完成收養，並用 Form 8839 申請抵稅額。盡可能為孩子取得 SSN、ATIN 或 ITIN。',
  sources: [
    { label: 'IRS — Form 8839 說明（2025），合格收養費用', url: 'https://www.irs.gov/pub/irs-pdf/i8839.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Topic no. 607，收養抵稅額', url: 'https://www.irs.gov/taxtopics/tc607' },
    { label: 'IRS — 收養抵稅額結轉問答', url: 'https://www.irs.gov/faqs/questions-and-answers-about-adoption-tax-credit-carryforward' },
  ],
}

const FAQS = [
  {
    q: '收養還沒完成，可以申請抵稅額嗎？',
    a: '如果是美國孩子，可以：即使收養從未完成，包括嘗試收養失敗，也可能可以申請。在收養完成那年之前支付的費用，要在付款的下一年申請。如果是外國孩子，必須等收養完成才能申請。',
  },
  {
    q: '抵稅額有多少可以退還？',
    a: '2025 年每個孩子最多 $5,000，2026 年每個孩子最多 $5,120。其餘部分不可退還：只能減少你的稅，沒用完的部分可以結轉最多 5 年。IRS 表示，僅限 2025 年，2020–2024 年可在 2025 年使用的結轉金額可以計入可退還部分的計算，但每個孩子合計仍以 $5,000 為限。IRS 正在調整它能從 2025 年稅表辨識出的帳戶；你不需要為此另外申報任何表格。2026 年及以後，結轉金額不可退還。',
  },
  {
    q: '收養配偶的孩子可以申請抵稅額嗎？',
    a: '不行。Form 8839 說明把收養配偶孩子的費用排除在外。代理孕母安排的費用也不包括在內。',
  },
  {
    q: '雇主支付了部分收養費用，我還能申請抵稅額嗎？',
    a: '兩者都可以使用，但不能用於同一筆費用。合格收養協助計畫下的雇主福利（顯示在 Form W-2 第 12 欄，代碼 T）可以在相同的每童上限內免計入所得，而且你必須先填 Form 8839 第三部分，再計算抵稅額。',
  },
  {
    q: '孩子還沒有 SSN，要用什麼號碼？',
    a: 'Form 8839 說明指出，如果能及時取得，請用孩子的 SSN。如果你正在收養美國公民或居民的孩子，但無法及時取得 SSN，請用 Form W-7A 申請收養納稅人識別號碼（ATIN）。如果孩子不是美國公民或居民，請用 Form W-7 申請 ITIN。',
  },
  {
    q: '我們已婚但分開申報，可以申請嗎？',
    a: '通常必須合併申報。只有在你年度最後 6 個月與配偶分開居住、孩子和你同住超過半年，而且你支付了住所一半以上的費用時，才可以在單獨申報的稅表上申請。',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '收養完成後，你的孩子可能適用的另一項抵稅額。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '可退還與不可退還抵稅額的說明。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '適用於從海外收養、尚未成為美國居民的孩子。',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: '報稅身分與戶長身分：2025 與 2026 年規定',
    desc:  '報稅身分會影響誰可以申請抵稅額。',
  },
]

export default function AdoptionTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '收養抵稅額：2025 與 2026 年上限與新的可退還部分 | AskLinTax 繁體中文',
      description: '收養抵稅額說明：$17,280（2025）與 $17,670（2026）上限、收入逐步減少、新的可退還部分、合格費用、國內與跨國收養的申報時間、特殊需求收養、雇主福利，以及 Form 8839。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>收養抵稅額</strong>幫助支付收養合格兒童的合格費用。上限是 <strong>2025 年每個孩子 $17,280</strong>、<strong>2026 年每個孩子 $17,670</strong>，收入較高時會減少。從 2025 年開始，部分抵稅額是<strong>可退還的</strong> — 2025 年每個孩子最多 $5,000，2026 年最多 $5,120 — 所以即使你只欠一點稅或不用繳稅，也可能拿到。其餘部分用來減少你的稅，可以結轉最多 5 年。你要用 <strong>Form 8839</strong> 申請。
        </p>

        <h2>2025 與 2026 年金額</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['每個合格兒童的抵稅額上限', '$17,280', '$17,670'],
            ['每個孩子的可退還部分（上限）', '$5,000', '$5,120'],
            ['開始逐步減少（修正後 AGI）', '$259,190', '$265,080'],
            ['達到或超過此金額即無抵稅額（修正後 AGI）', '$299,190', '$305,080'],
            ['每個孩子的雇主福利免稅上限', '$17,280', '$17,670'],
          ]}
        />
        <p>
          2025 年數字來自 2025 年 Form 8839 說明；2026 年數字來自 Rev. Proc. 2025-32。上限是可退還與不可退還部分的合計，不是另外再加的金額。
        </p>

        <h2>誰是合格兒童</h2>
        <ul>
          <li><strong>未滿 18 歲。</strong>年度中滿 18 歲的孩子，在生日之前的那段期間算合格兒童。</li>
          <li><strong>任何年齡</strong>，如果身體或心智上無法照顧自己。</li>
        </ul>

        <h2>合格收養費用</h2>
        <ArticleTable
          head={['包括', '不包括']}
          rows={[
            ['收養費', '用聯邦、州或地方計畫資金支付的費用'],
            ['律師費與法院費用', '收養配偶的孩子'],
            ['離家期間的旅費，包括餐飲與住宿', '代理孕母安排'],
            ['外國孩子的再收養費用', '雇主或其他人補償的費用，或違法的費用'],
          ]}
        />

        <h2>何時申請：國內與跨國收養</h2>
        <ArticleTable
          head={['支付費用的時間', '美國孩子（國內）', '外國孩子']}
          rows={[
            ['收養完成那年之前的任何一年', '在付款的下一年申請', '在收養完成那年申請'],
            ['收養完成那年', '當年申請', '當年申請'],
            ['收養完成之後的任何一年', '在付款那年申請', '在付款那年申請'],
          ]}
        />
        <p>
          如果孩子在開始收養時是美國公民或居民（包括美國屬地），就算美國孩子。美國孩子的收養即使從未完成，也可能可以申請抵稅額。
        </p>

        <h2>特殊需求兒童</h2>
        <p>
          只有以下三項都成立時，孩子才算<strong>特殊需求兒童</strong>：開始收養時孩子是美國公民或居民；州政府或印第安部落政府認定孩子不能或不應回到父母家中；而且認定若沒有提供協助，孩子不會被收養。收養特殊需求兒童並完成時，即使你只支付很少或沒有支付合格費用，也可能可以就該孩子申請全額抵稅額。請保留政府認定的證明。
        </p>

        <h2>可退還部分、不可退還部分與結轉</h2>
        <ul>
          <li><strong>可退還部分：</strong>每個孩子分別計算，以每年上限為限，申報在 Form 1040。</li>
          <li><strong>不可退還部分：</strong>以你的稅額為限，申報在 Schedule 3。</li>
          <li><strong>結轉：</strong>沒用完的不可退還抵稅額可以結轉最多 5 年或直到用完，先用最早的部分，之後就作廢。結轉金額不可退還，但有以下一項例外。</li>
          <li><strong>2025 年結轉調整：</strong>IRS 表示，財政部已釐清，僅限 2025 稅務年度，2020–2024 年可在 2025 年使用的結轉金額可以計入可退還部分的計算。可退還部分每個合格兒童合計（包括當年度的抵稅額）仍以 $5,000 為限。2025 年的表格不會更新；IRS 從 2026 年 9 月下旬開始，調整它能從 2025 年稅表與帳戶紀錄辨識出的帳戶，並會寄出通知。不要只為了這項調整而申報修正稅表。但這並不是對每個人都自動適用：如果你的 2025 年稅表沒有申報結轉金額或資料不足，你可能需要附上 Form 8839 申報 Form 1040-X。增加的金額會減少可結轉到 2026 年的金額，而且不會讓 2026 年的結轉金額變成可退還。</li>
          <li><strong>2026 年 Schedule 3-A（草稿）：</strong>IRS Topic No. 607 指出，2026 年要申請可退還的收養抵稅額，必須填寫 Schedule 3-A（Form 1040）「Federal Public Benefit」，2026 年 Form 1040 草稿也有對應的欄位。依草稿附表，只有在你和你的配偶都不是美國公民、美國國民或合格外國人時，才會扣除退還的金額。本次審閱時，這份附表與 2026 年 Form 1040 都是草稿，而財政部 2026 年 8 月公布的相關法規（REG-119882-25）是擬議法規，尚未定案；只有在定案後才會適用。目前尚未發布確立這項要求的正式法規或 2026 年正式表格；本文中已定案的 2026 年數字（例如 $5,120 的可退還上限）來自 Rev. Proc. 2025-32。</li>
        </ul>

        <h2>誰可以申請</h2>
        <ul>
          <li><strong>報稅身分：</strong>單身、戶長、合格喪偶者或已婚合併申報 — 分居的已婚者有少數例外。</li>
          <li><strong>收入：</strong>修正後 AGI 低於「無抵稅額」的金額，除非你只是申請結轉金額。</li>
          <li><strong>孩子資料：</strong>在 Form 8839 第一部分填寫孩子的資料。</li>
        </ul>

        <h2>範例（2025，取自 Form 8839 說明）</h2>
        <p>
          2025 年，一個家庭為一名合格兒童支付了 <strong>$20,000</strong> 的合格費用，收養在 2025 年完成。抵稅額上限是 <strong>$17,280</strong>。他們申請 <strong>$5,000</strong> 的可退還抵稅額，並依他們的稅額申請 <strong>$10,000</strong> 的不可退還抵稅額。剩下的 <strong>$2,280</strong> 作為不可退還抵稅額，結轉最多 5 年。超過 $17,280 上限的另外 $2,720 費用永遠不能申請。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>收養還沒完成時，在付款那年就申請國內收養費用</strong>，而不是下一年。</li>
          <li><strong>跨國收養還沒完成就申請。</strong></li>
          <li><strong>重複計算</strong>雇主已補償的費用。</li>
          <li><strong>以為結轉金額可以退還</strong> — 2025 年的調整以外並不行。</li>
          <li><strong>遺失收據</strong>，例如旅費、律師費與機構費用。</li>
          <li><strong>忽略特殊需求規定</strong>，例如從寄養體系收養、有州政府認定的孩子。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>收養失敗、跨越多年的收養、多個孩子，以及在收養完成前的年度支付的雇主福利，都可能讓計算變得複雜。州的收養抵稅額是另外的制度。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

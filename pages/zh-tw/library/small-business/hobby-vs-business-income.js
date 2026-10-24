import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/hobby-vs-business-income.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'hobby-vs-business-income',
  sourceHash:      'fb5f87eb8e6a',
  id:            '110',
  title:         '是興趣還是事業？2025 與 2026 年副業收入如何課稅',
  titleEn:       'Hobby or Business? How Side Income Is Taxed in 2025 and 2026',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 334（2025）、Publication 525（2025）、Publication 529（2020 年 12 月版）、Publication 535（2022，最新版）、2025 年 Form 1040 與 Schedule A 說明、Form 5213，以及 IRS Tax Tip 2023-61，說明 2025 與 2026 稅務年度的聯邦興趣活動虧損規定。「2026 年興趣活動費用仍不可扣除」這一點，來自引用 P.L. 119-21 第 70110 條的 IRS 2026 年說明草稿；請以 2026 年正式說明確認。本次無法直接審閱法條全文（第 67 條、第 183 條與 P.L. 119-21），本文依據適用這些條文的 IRS 出版品。本文不涵蓋州的規定、農業的細節，也不涵蓋推定規則以外的馬匹活動規定',
  persona:       ['手作者與網路賣家', '內容創作者與零工工作者', '出售收藏品的收藏家', '副業活動虧錢的人'],
  relatedJourney: ['副業收入', '自雇第一年'],
  actionRequired: '誠實判斷你從事這項活動是否為了賺錢，不論如何都像經營事業一樣保留紀錄，並申報所有收入 — 是事業就申報在 Schedule C，是興趣就申報在 Schedule 1。',
  sources: [
    { label: 'IRS — Publication 334（2025），小型企業稅務指南', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Publication 525（2025），應稅與不課稅所得', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Publication 529（2020 年 12 月版），雜項扣除額', url: 'https://www.irs.gov/pub/irs-pdf/p529.pdf' },
    { label: 'IRS — Publication 535（2022），企業費用：非營利活動', url: 'https://www.irs.gov/pub/irs-prior/p535--2022.pdf' },
    { label: 'IRS — 2025 年 Form 1040 與 Schedule 1 說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 年 Schedule A（Form 1040）說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sca.pdf' },
    { label: 'IRS — Form 5213，選擇延後判定（2006 年 2 月版）', url: 'https://www.irs.gov/pub/irs-pdf/f5213.pdf' },
    { label: 'IRS — Tax Tip 2023-61，是興趣還是事業：關於副業你需要知道的事', url: 'https://www.irs.gov/newsroom/hobby-or-business-heres-what-to-know-about-that-side-hustle' },
    { label: 'IRS — 2026 年 Form 8960 說明草稿（不可用於申報）', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: '興趣活動的收入要課稅嗎？',
    a: '要。Publication 525 指出，即使你不期待從某項活動獲利，也必須申報它的收入。2025 年要申報在 Schedule 1（Form 1040）第 8j 行「Activity not engaged in for profit income」。',
  },
  {
    q: '我可以扣除興趣活動的費用嗎？',
    a: '大部分不行。2025 年，興趣活動的一般費用屬於雜項逐項扣除額，目前暫停適用（Publication 529），而且不在 2025 年 Schedule A 說明第 16 行允許扣除的清單中。但有兩點仍然有效：如果你出售商品，可以用總收款減去銷貨成本來計算興趣活動的總所得；而原本就可以扣除的項目 — 例如房貸利息、稅款與符合資格的災害損失 — 仍然可以在 Schedule A 扣除（Publication 535）。至於 2026 年，IRS 的說明草稿表示 P.L. 119-21 讓這項暫停變成永久。Publication 525（2025）仍寫著，如果逐項扣除，興趣活動費用可以在興趣收入範圍內扣除；這句話描述的是 2018 年以前的規定，和其他 IRS 資料互相矛盾。',
  },
  {
    q: '興趣活動的收入要繳自雇稅嗎？',
    a: '如果這項活動真的是興趣，就不用：2025 年 Form 1040 說明把興趣收入視為不屬於自雇所得的收入。但名稱並不能決定。如果這項活動實際上是事業，即使你把收入申報在 Schedule 1，或收到的是 Form 1099-K 而不是 1099-NEC，它的淨收入仍然要繳自雇稅。',
  },
  {
    q: '我在網路上賠錢賣掉自己的東西，這算興趣收入嗎？',
    a: '不算。以低於買價的價格賣掉個人物品不是所得，也不是興趣活動。個人物品的損失不能扣除。如果你出售興趣收藏品有利得，Publication 525 指出這筆利得要以資本利得課稅。',
  },
  {
    q: '我的興趣活動會收到 Form 1099-K 嗎？',
    a: '有可能。付款 App 或網路平台在你的商品或服務收款超過 $20,000 且交易超過 200 筆時，通常必須寄出 1099-K，金額較低時也可能寄出。這份表格申報的是總收款；你仍然要自己判斷這項活動是興趣還是事業。（IRS Tax Tip 2023-61 提到 $600 的門檻；那個數字已經過時。）',
  },
  {
    q: '我應該申報 Form 5213 嗎？',
    a: '請先想清楚。Form 5213 會把 IRS 對獲利推定的判定延後到第五年底（馬匹活動為第七年），可以幫助初期虧損的新活動。但申報後，IRS 對這項活動相關稅款的核定期限通常也會延長，一直到推定期間最後一年報稅截止日後 2 年。',
  },
]

const RELATED = [
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: '收到 PayPal、Venmo 或 eBay 的 1099-K，要繳稅嗎？',
    desc:  '這份表格申報什麼，以及目前的門檻。',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '事業如何申報收入與費用。',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: '什麼是自雇稅？怎麼計算？',
    desc:  '真正的事業要繳的 15.3% 稅。',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '成為事業之後可以使用的扣除額。',
  },
]

export default function HobbyVsBusinessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '是興趣還是事業？2025 與 2026 年副業收入如何課稅 | AskLinTax 繁體中文',
      description: '興趣與事業的稅務差別：獲利動機的判斷因素、五年中三年的推定與馬匹規定、Form 5213、Schedule C 與 Schedule 1、自雇稅、為什麼 2025 與 2026 年大部分興趣活動費用不能扣除、銷貨成本，以及 Form 1099-K。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你從事一項活動是為了<strong>獲利</strong>，它就是<strong>事業</strong>：你申報在 <strong>Schedule C</strong>，扣除一般且必要的費用，虧損可以抵銷其他收入，而且淨收入在 $400 以上時通常要繳<strong>自雇稅</strong>。如果它是<strong>興趣</strong>，你仍然要申報全部收入 — 申報在 <strong>Schedule 1</strong> — 而 <strong>2025</strong> 年活動的一般費用不能扣除，不過銷貨成本可以減少總所得，原本就可以扣除的項目也仍然可以扣除。IRS 說明草稿表示同樣的規定會延續到 <strong>2026</strong> 年。決定關鍵是你的獲利動機，而不是你收到哪一種表格或申報在哪一行。
        </p>

        <h2>IRS 如何區分興趣和事業</h2>
        <p>沒有單一因素可以決定。IRS Tax Tip 2023-61 列出這些問題：</p>
        <ul>
          <li>你是否像經營事業一樣進行這項活動，並保留完整且正確的帳簿與紀錄？</li>
          <li>你投入的時間和精力是否顯示你打算獲利？</li>
          <li>這項活動是否在某些年度有獲利，獲利多少？</li>
          <li>你能否期待活動中使用的資產增值而帶來未來獲利？</li>
          <li>你是否靠這項收入維生？</li>
          <li>虧損是因為無法控制的情況，還是屬於創業階段的正常虧損？</li>
          <li>你是否為了提高獲利而改變做法？</li>
          <li>你和你的顧問是否具備把它經營成成功事業的知識？</li>
        </ul>
        <p>
          Publication 334 補充，當作興趣、或主要為了運動或娛樂而進行的活動，適用非營利活動的限制。
        </p>

        <h2>獲利推定與 Form 5213</h2>
        <ArticleTable
          head={['活動', '在以下情況推定為營利', 'Form 5213 把判定延後到']}
          rows={[
            ['大多數活動', '連續 5 年中有 3 年以上總收入超過扣除額', '第一年之後第 4 年的年底'],
            ['主要是育種、訓練、展示或賽馬', '連續 7 年中有 2 年以上總收入超過扣除額', '第一年之後第 6 年的年底'],
          ]}
        />
        <ul>
          <li><strong>推定有幫助，但不是必要條件。</strong>不符合推定的活動，仍然可能依上述因素被認定為事業。</li>
          <li><strong>何時申報 Form 5213：</strong>在活動第一年報稅表的截止日（不含延期）後 3 年內，或在收到 IRS 擬駁回扣除額的通知後 60 天內，視情況適用。如果你從事這項活動已超過 5 年（馬匹為 7 年），就不能使用。</li>
          <li><strong>合併申報：</strong>即使只有一位配偶從事這項活動，雙方都必須簽署選擇。</li>
          <li><strong>取捨：</strong>申報這項選擇後，IRS 對這項活動相關稅款的核定期限通常會延長，一直到推定期間最後一年報稅截止日後 2 年。</li>
        </ul>

        <h2>事業與興趣：各自如何申報</h2>
        <ArticleTable
          head={['', '事業', '興趣']}
          rows={[
            ['收入申報在哪裡', 'Schedule C（Form 1040）', '2025 年為 Schedule 1（Form 1040）第 8j 行'],
            ['銷貨成本', '在 Schedule C 扣除', '可以從總收款中減去以計算總所得，但必須一致適用'],
            ['其他費用', '一般且必要的事業費用在 Schedule C 扣除', '2025 年不能扣除；IRS 草稿指引表示 2026 年也不能扣除'],
            ['虧損', '通常可以抵銷其他收入', '不允許；你要就該活動的總所得課稅'],
            ['自雇稅', '淨收入 $400 以上時通常要繳', '如果真的是興趣，就不是自雇所得'],
          ]}
        />

        <h2>2025 與 2026 年的興趣活動費用：IRS 資料怎麼說</h2>
        <ul>
          <li><strong>2025：</strong>Publication 529 指出，興趣活動費用屬於雜項逐項扣除額，「已不能再扣除」。2025 年 Schedule A 說明表示，第 16 行只能扣除列出的費用，而興趣活動費用不在清單上。</li>
          <li><strong>2026 年及以後：</strong>IRS 2026 年 Form 8960 說明草稿指出，P.L. 119-21 第 70110 條無限期暫停雜項逐項扣除額。由於興趣活動費用屬於雜項逐項扣除額，仍然不能扣除。這段說明來自草稿，請以 2026 年正式說明確認。</li>
          <li><strong>仍然允許的項目：</strong>Publication 535 指出，非營利活動的總所得，可以依一般公認會計方法並一致適用，從總收款中減去銷貨成本來計算。它也指出，個人與事業活動都可以扣除的項目 — 例如房貸利息、稅款與災害損失 — 可以在 Schedule A 全額扣除，但仍受各自的限制。</li>
          <li><strong>互相矛盾的那一句：</strong>Publication 525（2025）寫著興趣活動的扣除額「不能超過你從該活動申報的收入，而且只有在逐項扣除時才能扣除」。那是 2018 年以前的規定。它和 Publication 529 及 Schedule A 說明互相矛盾，本文依照這些較具體的資料。</li>
        </ul>

        <h2>自雇稅：名稱不能決定</h2>
        <p>
          2025 年 Form 1040 說明指出，不要把自雇所得申報在 Schedule 1 第 8a–8z 行，並把興趣收入視為不屬於自雇所得的收入。但把活動稱為興趣，或把收入申報在 Schedule 1，並不會讓它變成興趣。如果事實顯示有獲利動機，這項活動就是事業，它的淨收入要繳自雇稅。你收到哪一種表格 — 1099-K、1099-NEC 或沒有任何表格 — 也不會改變這一點。
        </p>

        <h2>範例（2025）</h2>
        <ArticleTable
          head={['', 'Nina', 'Omar', 'Jae']}
          rows={[
            ['活動', '為了興趣織圍巾，在手作市集賣了幾條', '在網路上賣整修過的自行車，記帳、打廣告，每週工作 20 小時', '搬家前賣掉自己的二手家具'],
            ['收入與費用', '銷售 $1,200；賣出的圍巾所用的毛線 $400；攤位費和其他用品 $1,100', '銷售 $30,000；成本 $18,000', '收到 $900；當初買價 $4,000'],
            ['處理方式', '興趣：$800（$1,200 − $400 銷貨成本）申報在 Schedule 1 第 8j 行；$1,100 不能扣除', '事業：Schedule C 淨利 $12,000；要繳自雇稅', '個人物品賠錢出售：沒有所得要申報，損失不能扣除'],
          ]}
        />
        <p>
          即使 Nina 花的比賺的多，她仍然要就 $800 繳稅。減去 $400 的前提是她依自己的紀錄一致地計算銷貨成本。如果她開始像經營事業一樣進行這項活動，保留紀錄並計畫獲利，答案可能會改變。Omar 的自雇稅在 Schedule SE 上計算。三個範例都已簡化。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>因為活動虧錢就不申報</strong>興趣收入。</li>
          <li><strong>依照 2018 年以前的舊規定</strong>在 Schedule A 扣除興趣活動費用 — 或是相反的錯誤：忘了銷貨成本和原本就可以扣除的項目。</li>
          <li><strong>把事業稱為興趣</strong>來避開自雇稅。</li>
          <li><strong>把興趣稱為事業</strong>，在沒有真正獲利動機下扣除多年虧損。</li>
          <li><strong>把 Form 1099-K 當成所得的證明</strong> — 它申報的是總收款，包括個人物品的銷售。</li>
          <li><strong>依賴提到 $600 Form 1099-K 門檻</strong>的舊 IRS 提示。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 界線模糊的情況請尋求協助</div>
          <p>長期反覆虧損的活動、馬匹和農業活動，以及開始賺錢的創作工作，通常需要仔細檢視實際情況。州的規定可能不同。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

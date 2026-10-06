import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/form-3520-married-couples.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-3520-married-couples',
  sourceHash:      'a24c27ad1890',
  id:            '38',
  title:         '夫妻收到海外父母贈與，Form 3520 怎麼判斷？',
  titleEn:       'My spouse and I received money from overseas parents — how does Form 3520 work?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '說明已婚夫妻收到非居民父母贈與時，Form 3520 Part IV 如何適用。對於合併申報所得稅的已婚美國人，IRS 發布的擬議法規指出，$100,000 門檻是由每位配偶分別計算。某筆贈與是哪一位配偶收到的 — 特別是給兩人或匯進聯名帳戶的贈與 — 取決於事實，可能需要個別檢視',
  persona:       ['收到任何一方海外父母資助的夫妻', '一方配偶是非居民外國人的夫妻', '用海外家人的錢買房的夫妻', '處理合併申報的報稅人員'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '$100,000 門檻要由每一位美國配偶分別計算 — 合併報稅不會讓你們變成共用一個門檻。每一筆匯款都寫下：誰匯的、哪一位配偶（或聯名帳戶）收到，以及這筆贈與實際上是給誰的。自己的合計超過 $100,000 的配偶，就有 Form 3520 Part IV 的問題。如果匯款給了兩人或匯進聯名帳戶，請找專業人士檢視事實。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），申報義務人、Part IV 與合併申報', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520（Rev. December 2023）', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Internal Revenue Bulletin 2024-24，擬議法規（proposed regulations）：proposed §1.6039F-1(c)(2)(iv)「Joint returns」', url: 'https://www.irs.gov/pub/irs-irbs/irb24-24.pdf' },
  ],
}

const FAQS = [
  {
    q: '我們夫妻合併報稅。這樣我們的贈與是不是就合併計算 $100,000 門檻？',
    a: '不會。對於合併申報所得稅的已婚美國人，IRS 發布的擬議法規（proposed §1.6039F-1(c)(2)(iv)「Joint returns」，刊載於 Internal Revenue Bulletin 2024-24）指出，$100,000 申報門檻由每位配偶分別計算。合併報稅不會讓你們變成共用一個 $100,000 門檻。仍然要依事實判斷的是：每一筆贈與實際上是哪一位配偶收到的，以及其中一位配偶是否其實是在替另一位收錢。',
  },
  {
    q: '我們可以一起申報一份 Form 3520 嗎？',
    a: '這和門檻是兩個不同的問題。即使每位配偶的門檻是分別計算的，你可能還是想知道夫妻能不能只交一份表格。Form 3520 填寫說明描述了合併申報所得稅的夫妻可以一起申報一份 Form 3520，要勾選第 1i 行的方框，並說明姓名與納稅人識別號碼（TIN）的填寫順序 — 但它是以夫妻兩人都與同一個海外信託有關的情境來說明。我們沒有找到現行填寫說明直接談到只涉及贈與時能否一起申報一份 Form 3520，所以在兩人只交一份表格之前，請先向稅務專業人士確認。',
  },
  {
    q: '我的配偶是非居民外國人，他收到自己父母的贈與，要申報 Form 3520 嗎？',
    a: 'Part IV 由美國人申報。當年是非居民外國人的配偶，通常不申報 Part IV。如果夫妻選擇在該年度把非居民配偶視為美國居民，他那一年的身分就會改變 — 這種組合請找人檢視。',
  },
  {
    q: '一筆 $80,000 匯給我、另一筆 $80,000 匯給我先生，兩筆都來自我父母。我們是不是各自都沒超過 $100,000？',
    a: '有可能，但不要直接這樣假設。如果匯給你先生的錢其實是要給你的 — 例如他是代為轉交（nominee 或 intermediary）— 可能就要算在你身上。如果真的是給他的贈與，就計入他的合計。由事實與你的紀錄決定。',
  },
  {
    q: '我的父母和我的公婆（或岳父母），算是「有親屬關係」嗎？',
    a: '$100,000 的計算，是把彼此有親屬關係或互相代為轉交的贈與人所給的贈與合併。你的爸爸和媽媽彼此有親屬關係，你配偶的父母也是。至於兩邊父母的贈與是否要為同一位受贈人合併計算，取決於那些贈與人彼此是否有親屬關係或一起行動 — 這需要個別檢視。',
  },
  {
    q: '這筆贈與要讓我們任何一方繳稅嗎？',
    a: '真正的贈與，通常不是受贈人的應稅收入。這筆錢之後產生的收入 — 利息、股利、租金 — 要繳稅，合併申報時會一起申報。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於海外贈與與 Form 3520 的基礎指南。',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    desc:  '有親屬關係的贈與人、代為轉交者，以及年度總額如何計算。',
  },
  {
    href: '/library/investment/foreign-gift-home-down-payment',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母幫我付美國房屋頭期款，要申報嗎？',
    desc:  '夫妻收到海外大額贈與最常見的原因。',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: '非居民配偶：我們可以合併報稅嗎？',
    desc:  '如果一方配偶不是美國居民，先從報稅身分開始。',
  },
]

export default function Form3520MarriedCouplesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '夫妻收到海外父母贈與：Form 3520 怎麼判斷 | AskLinTax 繁體中文',
      description: '已婚夫妻收到海外父母的錢，Form 3520 取決於誰收到每一筆贈與、贈與人是誰，以及一方是否替另一方收錢。情境說明、合併申報，以及什麼時候該尋求建議。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          先從規則開始：對於合併申報所得稅的已婚美國人，IRS 發布的海外贈與申報擬議法規 — proposed §1.6039F-1(c)(2)(iv)「Joint returns」，刊載於 Internal Revenue Bulletin 2024-24 — 指出 <strong>$100,000 申報門檻由每位配偶分別計算</strong>。這項說明出自該擬議法規，而不是現行的 Form 3520 填寫說明。合併報稅<strong>不會</strong>讓你們變成共用一個 $100,000 門檻。每一位美國配偶，看的是<strong>自己</strong>這一年從非居民外國人或海外遺產收到的贈與與遺產（連同與他們有親屬關係的外國人給的部分）。
        </p>
        <p>
          仍然需要判斷的，是某一筆贈與到底是哪一位配偶收到的。這取決於四個事實：
        </p>
        <ol>
          <li><strong>每一筆贈與是誰收到的</strong> — 你、你的配偶，還是你們兩人（例如透過聯名帳戶）？</li>
          <li><strong>這筆贈與實際上是給誰的</strong> — 其中一位配偶是不是只是在替另一位收錢？</li>
          <li><strong>贈與人是誰</strong> — 以及他們彼此是否有親屬關係或一起行動。</li>
          <li><strong>每位配偶的身分</strong> — 美國公民或居民要申報 Part IV；非居民外國人配偶通常不用。</li>
        </ol>
        <p>
          夫妻合併申報所得稅，不會把兩個門檻合併，也不能決定某一筆贈與是哪一位配偶收到的。
        </p>

        <h2>各種情境</h2>
        <p>以下金額都是同一個稅務年度、來自身為非居民外國人的父母。除非另外說明，夫妻兩人都是美國公民。</p>

        <ArticleTable
          head={['發生了什麼', '可能的起點', '為什麼可能需要檢視']}
          rows={[
            ['你父母匯 $150,000 到你自己的帳戶', '是你的贈與；你的親屬合計超過 $100,000；你要申報 Part IV', '通常很單純'],
            ['你父母匯 $60,000 給你、$60,000 給你的配偶，分別是給兩人的真正贈與', '每位配偶各有 $60,000 來自有親屬關係的贈與人；兩人都沒有因此超過 $100,000', '匯給配偶的錢，是否其實是要給你的'],
            ['你父母匯 $120,000 到聯名帳戶，說是「給你們兩個」', '關鍵問題是誰收到了什麼', '本指南查閱的 IRS 資料中沒有 50/50 或其他分配規則 — 請尋求個別檢視'],
            ['你父母匯 $120,000 給你的配偶，但其實是給你的贈與', '如果配偶是代為轉交，可能要算在你身上', '取決於有紀錄的意圖與事實'],
            ['你父母給你 $70,000；配偶的父母給你配偶 $70,000', '每位配偶各有 $70,000 來自自己的父母', '是否有贈與人彼此有親屬關係或一起行動'],
            ['你的配偶是非居民外國人，從他的父母收到 $200,000', '非居民外國人通常不申報 Part IV', '如果配偶在該年度被視為美國居民，情況就會改變'],
          ]}
        />

        <h2>為什麼「誰收到」這麼重要</h2>
        <p>
          因為門檻是由每位配偶分別計算，關鍵問題是每一筆贈與是哪一位配偶收到的。匯給你配偶的錢，不會自動變成你的贈與 — 你收到的錢，也不會自動變成兩人共有。
        </p>
        <p>
          同時，這些規定會看穿安排的形式。當某人是在替另一人<strong>代為轉交</strong>（nominee 或 intermediary）時，贈與要合併計算；Form 3520 第 56 行也會問你是否有理由相信某位贈與人是代為轉交者。如果錢經過你的配偶，只是因為你父母想讓錢到你手上，請把它當作需要分析的問題，而不是拆分總額的方法。
        </p>

        <h2>聯名帳戶與「給你們兩個」的贈與</h2>
        <p>
          很多父母會把錢匯進夫妻的聯名帳戶，或說這是給兩人的贈與。本指南查閱的 IRS 資料，並沒有提供在 Part IV 上把這種贈與分配給夫妻的規則 — 所以不要假設自動五五分，也不要假設全部屬於其中一人。請把這些情況當作需要個別檢視。值得記錄的事實包括：
        </p>
        <ul>
          <li>你父母以書面說明這筆贈與是給誰的</li>
          <li>哪個帳戶收到這筆錢，以及帳戶屬於誰</li>
          <li>這筆錢怎麼使用（例如登記在兩人名下的房子）</li>
          <li>是否也有分別給每一位配偶的類似贈與</li>
        </ul>

        <h2>兩個不同的問題：分別計算的門檻 vs. 一起申報一份 Form 3520</h2>
        <p>
          請把兩個問題分開。<strong>(a) 門檻：</strong>合併報稅的夫妻，IRS 發布的擬議法規指出門檻由每位配偶分別計算，如上所述。<strong>(b) 表格：</strong>夫妻能不能一起交一份 Form 3520，是另一個問題。Form 3520 填寫說明描述了合併申報所得稅的夫妻可以一起申報一份 Form 3520，要勾選第 1i 行，並依照 Form 1040 上的順序填寫兩人的姓名與 TIN。填寫說明是在夫妻兩人都是同一個海外信託的移轉人、委託人或受益人的情境下說明這一點。我們沒有找到現行填寫說明直接談到只涉及贈與（Part IV）時能否一起申報，所以本指南不假設可以這樣做。請向稅務專業人士確認，依你的情況適合一起申報一份 Form 3520，還是由收到贈與的配偶各自申報。不論哪一種，Form 3520 都與你的 Form 1040 分開申報。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 再說一次：繳稅與申報是兩回事</div>
          <p>不論是哪一位配偶收到，真正的贈與通常都不是應稅收入。本指南討論的是<strong>申報</strong>。這筆錢之後產生的收入 — 利息、股利、租金 — 要繳稅，照常列在你們的稅表上。</p>
        </div>

        <h2>實際例子</h2>
        <p>
          Anna 和 Ben 是合併申報的美國公民。2025 年，Anna 住在台北、身為非居民外國人的父母，3 月匯了 $90,000 到 Anna 自己的帳戶，10 月又匯了 $30,000 到夫妻的聯名帳戶，附上一句話：「給你們買新房子用，給你們兩個的。」Ben 住在首爾的父母匯了 $20,000 給 Ben。
        </p>
        <ul>
          <li>Anna 和 Ben 的門檻分別計算。Anna 自己帳戶收到的贈與是 $90,000。聯名帳戶那 $30,000 有多少（或是否全部）算 Anna 的，決定了 Anna 是否超過 $100,000。</li>
          <li>Ben 從父母收到的 $20,000，單獨來看遠低於門檻。</li>
          <li>因為聯名帳戶的贈與會改變答案，Anna 和 Ben 請專業人士檢視事實。如果有疑問，專業人士可能會建議申報，而不是冒著依贈與金額計算的罰款風險。</li>
        </ul>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>顯示匯款人、收款帳戶與帳戶所有人的電匯紀錄</li>
          <li>贈與人以書面說明每筆贈與是給誰的訊息</li>
          <li>每位配偶當年的美國稅務身分</li>
          <li>每位配偶一張年度表格：日期、贈與人、美元金額、帳戶</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          只要贈與匯進聯名帳戶或是「給你們兩個」、一方配偶可能收到要給另一方的錢、一方配偶是非居民外國人（請見<a href="/zh-tw/library/individual/nonresident-spouse/">非居民配偶：我們可以合併報稅嗎？</a>），或任何一方的合計接近 $100,000 時，都值得找專業人士。如果期限已經過了，請見<a href="/zh-tw/library/investment/late-form-3520/">Form 3520 忘記報或晚報，現在怎麼辦？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

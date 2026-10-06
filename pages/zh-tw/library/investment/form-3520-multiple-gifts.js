import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/form-3520-multiple-gifts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-3520-multiple-gifts',
  sourceHash:      'a8dfe2006a9c',
  id:            '32',
  title:         '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
  titleEn:       'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '說明美國公民與居民外國人如何加總來自非居民外國人個人與海外遺產的贈與與遺產，以判斷 Form 3520 Part IV 門檻。來自外國公司或外國合夥事業的贈與有另一個較低的門檻，海外信託分配則在表格的其他部分申報',
  persona:       ['一年內多次收到海外家人匯款的人', '同時收到父母、祖父母或海外兄弟姊妹匯款的人', '父母透過親戚或公司匯款的人', '協助客戶判斷 Form 3520 申報義務的報稅人員'],
  relatedJourney: ['跨境財務'],
  actionRequired: '列出今年從外國人收到的每一筆贈與與遺產，把彼此有親屬關係（或互相代為轉交）的贈與人歸為一組，再分別加總。只要任何一組合計超過 $100,000，就需要申報 Form 3520 Part IV。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part IV 與 $100,000 合併計算規則', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520（Rev. December 2023）', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2024-24，擬議法規（proposed regulations）：proposed §1.6039F-1(c)(2)(i)(B)（有親屬關係者贈與的合併計算）', url: 'https://www.irs.gov/pub/irs-irbs/irb24-24.pdf' },
  ],
}

const FAQS = [
  {
    q: '我父母每個月匯 $9,000 給我，每一筆都不大，還需要報 Form 3520 嗎？',
    a: '如果這些匯款來自同一位家長，或來自你知道彼此有親屬關係的父母，就需要：12 × $9,000 = $108,000 — 一年內超過 $100,000。每一筆匯款的大小與門檻無關。而且每一筆 $9,000 都超過 $5,000，所以每一筆都要在第 54 行分別列出。',
  },
  {
    q: '如果請父母今年匯 $99,000，剩下的明年再匯，可以嗎？',
    a: '贈與是按你收到的年度計算，所以真的在兩個不同年度收到的錢，就分別算在兩個年度。行不通的是把同一年的錢分給親戚或中間人來匯：來自有親屬關係者、以及替他人代為轉交者的贈與，都要合併計算。請依照真實的時間安排，而不是掩飾贈與到底來自誰。',
  },
  {
    q: '我奶奶和我叔叔各匯了 $60,000 給我，要合併計算嗎？',
    a: 'IRS 的規則問的是：你是否知道、或有理由知道這些贈與人彼此有親屬關係（或其中一人在替另一人轉交）。如果你知道叔叔是奶奶的兒子，謹慎的做法是把他們當作有親屬關係的贈與人，合併計算（$120,000）。如果你不確定某些親人在這條規則下是否算有親屬關係，請找專業人士確認。',
  },
  {
    q: '兩位彼此沒有親屬關係的海外世交各給我 $70,000，我要申報嗎？',
    a: '彼此沒有親屬關係、也沒有互相代為轉交的外國人，他們的贈與不合併計算。如果兩位各自的合計都沒有超過 $100,000，這些贈與就不會觸發 Part IV。請保留紀錄，說明你為什麼認為他們彼此無關、各自獨立。',
  },
  {
    q: '我爸爸有一部分錢是透過他在台灣的公司匯的，這要怎麼算？',
    a: '來自外國公司或外國合夥事業的所謂「贈與」，有自己的、低很多的年度門檻，要在第 55 行申報，不是第 54 行。IRS 也可能把這種「贈與」視為應稅收入。你對公司由誰持有的了解，也會影響贈與怎麼計算。只要贈與來自企業，就請尋求專業建議。',
  },
  {
    q: '珠寶或股票這類實物贈與，也要算進 $100,000 嗎？',
    a: '要。財產贈與以公平市價（fair market value）計算。第 54 行要求列出每一筆超過 $5,000 的贈與的說明與公平市價。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於海外贈與、是否要繳稅與 Form 3520 的基礎指南。',
  },
  {
    href: '/library/investment/foreign-gift-over-100000',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母匯超過 10 萬美元給我，要報 Form 3520 嗎？',
    desc:  '父母一次匯大筆錢時的直接答案。',
  },
  {
    href: '/library/investment/form-3520-married-couples',
    cat:  'Investments & Foreign Accounts',
    title: '夫妻收到海外父母贈與，Form 3520 怎麼判斷？',
    desc:  '贈與給已婚夫妻時，到底算誰的？',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '如何填寫 Part IV、截止日與申報方式。',
  },
]

export default function Form3520MultipleGiftsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '分多次收到海外贈與：Form 3520 的 $100,000 門檻怎麼算 | AskLinTax 繁體中文',
      description: '父母、祖父母或海外親人分多次匯款？說明 Form 3520 Part IV 如何加總：年度合計、有親屬關係的贈與人、代為轉交的中間人，以及為什麼拆開匯款無法避免申報。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          Form 3520 的 $100,000 門檻是<strong>一年的合計</strong>，不是每筆匯款的上限。每個稅務年度，你要把從某位非居民外國人個人或海外遺產收到的所有贈與與遺產，<strong>連同</strong>與他們有親屬關係的外國人給的贈與一起加總。只要合計超過 $100,000，就要申報 Form 3520 Part IV。
        </p>
        <p>
          也就是說，很多筆小額匯款加起來，也可能產生申報義務；而把錢分給彼此有親屬關係的贈與人各匯一部分，或透過替他們轉匯的其他親戚匯款，本身並不會讓你停留在門檻以下。
        </p>

        <h2>三條計算規則</h2>
        <ArticleTable
          head={['規則', '實際上代表什麼']}
          rows={[
            ['1. 以稅務年度計算', '把 1 月 1 日到 12 月 31 日（日曆年度的個人）收到的每一筆贈與加總。每筆匯款算在你收到的那一年。'],
            ['2. 有親屬關係的贈與人合併計算', '把你知道、或有理由知道彼此有親屬關係的非居民外國人與海外遺產所給的贈與加總。IRS 的例子：一位非居民外國人給 $75,000，加上另一位有親屬關係的非居民外國人給 $40,000，合計 $115,000，兩筆都要申報。'],
            ['3. 代為轉交者合併計算', '如果某人是替另一人代為轉交（nominee 或 intermediary），不論有沒有親屬關係，他們的贈與都要合併。'],
          ]}
        />

        <h3>IRS 的原文說法</h3>
        <p>
          Form 3520 填寫說明指出，計算 $100,000 門檻時，如果你知道、或有理由知道不同的非居民外國人與海外遺產<strong>彼此有親屬關係</strong>，或其中一人是在替另一人代為轉交（nominee 或 intermediary），就要把他們的贈與合併計算。問題在於<strong>贈與人</strong>彼此之間的關係。IRS 發布的海外贈與申報擬議法規（proposed §1.6039F-1(c)(2)(i)(B)，刊載於 Internal Revenue Bulletin 2024-24）在描述這項合併計算時，使用的是援引 §1.643(i)-1(d)(9) 的有親屬關係者標準。Form 3520 填寫說明另外有一個與<em>你</em>有親屬關係者的定義；本指南不把那個定義當作判斷兩位贈與人是否彼此有親屬關係的完整標準。如果你不確定某些親人在這條規則下是否算有親屬關係，請找專業人士確認，而不是直接假設他們的贈與可以分開計算。
        </p>

        <h3>「知道，或有理由知道」</h3>
        <p>
          當你知道贈與人彼此有親屬關係或互相代為轉交，或從事實來看你有理由知道時，就應該合併計算。填寫說明舉例：一位受贈人同時收到一家外國公司和一位非居民外國人的贈與，並且知道這家公司由那個人全資持有 — 這項認知會影響贈與怎麼計算。對明顯的家庭或持股關係視而不見，並沒有幫助。
        </p>

        <h2>實際例子（2025 稅務年度）</h2>

        <h3>例一：每月生活費</h3>
        <p>
          Jia 在上海的父母 2025 年每個月匯 $9,000 給她，總共 $108,000。Jia 知道她的父母彼此有親屬關係，所以兩人的匯款要合併計算。每一筆都不大，但有親屬關係者的合計超過 $100,000。Jia 要申報 Form 3520 Part IV，而且因為每一筆都超過 $5,000，每一筆都要列出。
        </p>

        <h3>例二：兩位家長、兩個帳戶</h3>
        <p>
          Kevin 的媽媽從她的帳戶匯 $60,000，爸爸從另一個帳戶匯 $45,000。Kevin 知道他的媽媽和爸爸彼此有親屬關係，所以合計 $105,000，需要申報 Part IV。用不同帳戶匯款，不會改變任何事。
        </p>

        <h3>例三：跨兩個年度</h3>
        <p>
          Amy 在 2025 年 11 月從父母收到 $70,000，2026 年 2 月又收到 $70,000。每一年有親屬關係者的合計都是 $70,000，所以兩個年度都沒有超過門檻 — 前提是這兩年沒有其他來自有親屬關係外國人的贈與。
        </p>

        <h3>例四：透過親戚轉匯</h3>
        <p>
          David 的父母想給他 $150,000。他們自己匯了 $90,000，另外請他的姑姑用父母的錢匯 $60,000。姑姑匯的是他父母的錢 — 也就是在替他們代為轉交 — 所以全部 $150,000 要合併計算，需要申報 Part IV。第 56 行也會問你是否有理由相信某位贈與人是代為轉交者。
        </p>

        <h3>例五：彼此無關的贈與人</h3>
        <p>
          Grace 從父母收到 $80,000，另外從一位住在新加坡的世交收到 $40,000 畢業禮金。這位世交與她父母沒有親屬關係，也是自己決定送的。兩組的合計分別是 $80,000 和 $40,000，都沒有超過 $100,000，所以這些贈與不需要申報 Part IV。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 拆開匯款不是辦法</div>
          <p>把一筆贈與拆成很多次電匯、用好幾個家人的帳戶，或透過親戚轉匯，只要贈與人彼此有親屬關係或互相代為轉交，應申報的總額並不會減少。而漏報 Form 3520 的罰款，可能是每未申報一個月罰贈與金額的 5%，最高 25%，除非有合理原因（reasonable cause）。請如實申報。</p>
        </div>

        <h2>超過門檻後要列出什麼</h2>
        <ul>
          <li><strong>第 54 行</strong>（非居民外國人個人與海外遺產）：列出每一筆超過 $5,000 的贈與或遺產 — 日期、說明與公平市價。</li>
          <li>如果沒有任何一筆超過 $5,000，就寫上「No gifts or bequests exceed $5,000」，不必逐筆列出。</li>
          <li><strong>第 55 行</strong>是另一個問題，針對來自外國公司與外國合夥事業的所謂贈與，年度門檻低很多。請見<a href="/zh-tw/library/investment/form-3520/">Form 3520：申報大額海外贈與</a>。</li>
          <li><strong>第 56 行</strong>問你是否有理由相信某位贈與人是代為轉交者。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li>拿每一筆電匯去跟 $100,000 比較，而不是加總全年</li>
          <li>明明知道、或有理由知道贈與人彼此有親屬關係，卻把每位贈與人分開計算</li>
          <li>因為沒有匯款，就忘了財產贈與（珠寶、股票、車子）</li>
          <li>同一年有父母生前的贈與、又有父母海外遺產的遺贈時，漏算遺產 — 遺產要和贈與一起計算</li>
          <li>把直接付給學校的學費算進去，但那不算海外贈與（請見<a href="/zh-tw/library/investment/foreign-gift-tuition-paid-directly/">直接支付的學費</a>）</li>
          <li>把從自己海外帳戶匯過來的自己的錢算進去，但那根本不是贈與</li>
        </ul>

        <h2>簡單的追蹤方法</h2>
        <p>
          每年用一張表記錄這些欄位：收到日期、匯款人、匯款人與其他匯款人的關係、用途、外幣金額、匯率、美元金額。到年底，把有親屬關係或互相代為轉交的匯款人歸為一組，各自加總。只要任何一組超過 $100,000，你的 Form 3520 清單也已經準備好了。
        </p>

        <h2>什麼時候該找專業人士</h2>
        <p>
          如果錢是透過公司、信託，或可能在替你家人轉交的無親屬關係者匯來；如果你收到的是財產而不是現金；或如果合計接近 $100,000，而你不確定某筆匯款該怎麼估價或算在哪一年，請諮詢稅務專業人士。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

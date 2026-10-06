import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gift-over-100000.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gift-over-100000',
  sourceHash:      'fadf8d52ad77',
  id:            '31',
  title:         '海外父母匯超過 10 萬美元給我，要報 Form 3520 嗎？',
  titleEn:       'Parents overseas sent me more than $100,000 — do I need Form 3520?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人（Resident Alien）從身為非居民外國人（Nonresident Alien）的父母或其他親人、或從海外遺產收到的贈與與遺產。來自外國公司、海外信託（Foreign Trust）、適用對象放棄國籍者（Covered Expatriate）的款項，以及其實是借款或報酬的錢，適用不同規則',
  persona:       ['父母住在台灣、中國或香港的子女', '接受家人經濟支援的綠卡持有人', '準備買第一間房的年輕上班族', '父母在海外過世的繼承人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '把這一個日曆年度從每一位非居民外國人或海外遺產收到的所有贈與和遺產加總；你知道、或有理由知道彼此有親屬關係（或互相代為轉交）的贈與人，要合併計算。如果合併後的金額超過 $100,000，就要另外申報 Form 3520 Part IV（不附在稅表裡）。申報這份表格本身，不代表你要為這筆贈與繳稅。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520（Rev. December 2023）', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
  ],
}

const FAQS = [
  {
    q: '父母剛好匯了 $100,000，要報 Form 3520 嗎？',
    a: '門檻是「超過 $100,000」。有親屬關係者的合計剛好 $100,000，並沒有超過。但請仔細算：你知道、或有理由知道彼此有親屬關係（或互相代為轉交）的贈與人所給的贈與，要加進同一個年度總額，多一筆小額匯款就可能超過門檻。',
  },
  {
    q: '$100,000 是一年算一次，還是每一筆匯款分開算？',
    a: '以稅務年度計算。對大多數個人來說就是日曆年度，1 月 1 日到 12 月 31 日。不同年度收到的匯款，各自算在收到的那一年。',
  },
  {
    q: '申報了 Form 3520，是不是就要繳所得稅？',
    a: '不是。Form 3520 是資訊申報表（information return）。真正的贈與或遺產，不論你有沒有申報這份表格，通常都不計入你的所得。這份表格保護你的，是避免因為漏報而被罰款。',
  },
  {
    q: '我父母是美國綠卡持有人，但大部分時間住在台灣。他們給的錢算海外贈與嗎？',
    a: '大概不算。Part IV 處理的是來自外國人（例如非居民外國人個人）的贈與。合法永久居民在稅務上通常是美國居民，所以他們給的贈與通常不是海外贈與。如果他們的綠卡身分或稅務居民身分有疑問，請找專業人士確認。',
  },
  {
    q: '我持 F-1 簽證，目前還是非居民外國人。我要報 Form 3520 嗎？',
    a: 'Part IV 由美國人（U.S. person）申報，也就是美國公民與居民外國人。如果你整年都是非居民外國人，Part IV 通常不適用於你。你的身分可能每年不同，所以每年都要確認。',
  },
  {
    q: '如果其中一部分其實是要還的借款呢？',
    a: '借款不是贈與，所以不會在 Form 3520 Part IV 當作贈與申報。但光是把匯款「叫做」借款，不會讓它真的變成借款。如果實際上沒有還款的預期，它可能就是贈與。混合或不清楚的安排，請由稅務專業人士檢視。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '基礎指南：什麼是海外贈與、什麼時候要繳稅、什麼時候要申報。',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    desc:  '多筆匯款、父母各自匯款、祖父母或家族公司匯款：哪些要加在一起。',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '逐行說明 Part IV、截止日與延期，以及寄送地址。',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520 忘記報或晚報，現在怎麼辦？',
    desc:  '如果你最近才知道有 Form 3520，從這裡開始。',
  },
]

export default function ForeignGiftOver100000ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外父母匯超過 10 萬美元，要報 Form 3520 嗎？ | AskLinTax 繁體中文',
      description: '從海外父母收到超過 $100,000？說明 Form 3520 Part IV 門檻怎麼算、為什麼「要申報」不等於「要繳稅」、要列出什麼，以及常見誤解。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          如果你是美國公民或美國稅務居民，而這筆錢是身為<strong>非居民外國人</strong>的父母給你的贈與（或遺產），那麼很可能要報。當你在這個稅務年度從某位非居民外國人個人或海外遺產收到的贈與與遺產，<strong>加上</strong>與他們有親屬關係的外國人給的部分，合計<strong>超過 $100,000</strong>，你就必須申報 <strong>Form 3520 Part IV</strong>。
        </p>
        <p>
          以下兩件事同時成立：
        </p>
        <ul>
          <li><strong>繳稅：</strong>真正的贈與或遺產，不論金額多大，通常<strong>不是</strong>你的應稅收入。</li>
          <li><strong>申報：</strong>大額海外贈與仍然必須<strong>申報</strong>。Form 3520 與你的 Form 1040 分開申報，漏報的罰款是依贈與金額計算。</li>
        </ul>

        <ArticleTable
          head={['你的情況（2025 稅務年度）', '要報 Form 3520 Part IV 嗎？']}
          rows={[
            ['父母（非居民外國人）總共給了 $80,000', '不用 — 沒有超過 $100,000'],
            ['父母總共給了 $120,000', '要'],
            ['媽媽給 $60,000、爸爸給 $50,000，而你知道兩人彼此有親屬關係', '要 — 有親屬關係的贈與人所給的贈與要合併計算（$110,000）'],
            ['父母是住在台灣的美國公民，給了 $150,000', '不用 — 不是來自外國人的贈與'],
            ['你整年都是非居民外國人', '通常不用 — Part IV 由美國人申報'],
          ]}
        />

        <h2>這適用於誰</h2>
        <p>
          以下三個事實決定這條規則是否適用於你：
        </p>
        <ol>
          <li><strong>你是美國人（U.S. person）。</strong>美國公民與居民外國人（綠卡持有人，以及符合實質居住測試的人）要申報 Part IV。請見<a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a></li>
          <li><strong>給錢的人是外國人。</strong>就這個門檻而言，指的是非居民外國人個人或海外遺產。父母如果是美國公民或綠卡持有人，即使住在海外，也不是外國人。</li>
          <li><strong>這筆錢真的是贈與或遺產。</strong>必須償還的借款、工作報酬或企業分配款都不是贈與，適用不同規則。</li>
        </ol>

        <h2>$100,000 怎麼算</h2>
        <p>
          這個門檻不是「每個人」或「每一筆匯款」分開算。在同一個稅務年度內，你要把以下金額加總：
        </p>
        <ul>
          <li>同一位非居民外國人或同一個海外遺產給你的每一筆贈與與遺產，以及</li>
          <li>其他你知道、或有理由知道與該人<strong>有親屬關係</strong>的非居民外國人與海外遺產給你的贈與 — 或其中一人是在替另一人代為轉交（nominee 或 intermediary）。</li>
        </ul>
        <p>
          Form 3520 填寫說明的說法是：計算 $100,000 門檻時，如果你知道、或有理由知道不同的非居民外國人與海外遺產彼此有親屬關係，或其中一人是在替另一人代為轉交（nominee 或 intermediary），就要把他們的贈與合併計算。填寫說明本身的例子是：一位非居民外國人給 $75,000，另一位有親屬關係的非居民外國人給 $40,000，合計 $115,000，兩筆都要申報。如果你不確定某些親人在這條規則下是否算彼此有親屬關係，請找專業人士確認，而不是直接假設他們的贈與可以分開計算。關於多筆匯款與多位贈與人，請見<a href="/zh-tw/library/investment/form-3520-multiple-gifts/">父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？</a>
        </p>

        <h3>哪些不計入 $100,000</h3>
        <ul>
          <li>代你支付的<strong>合格學費或醫療費用</strong> — 例如直接付給大學的學費。請見<a href="/zh-tw/library/investment/foreign-gift-tuition-paid-directly/">海外父母直接付我的學費，要報 Form 3520 嗎？</a></li>
          <li><strong>來自美國公民或美國稅務居民的贈與</strong>，即使對方住在海外。</li>
          <li><strong>海外信託的分配款。</strong>這些在 Form 3520 的 Part III 申報，不在 Part IV。請見<a href="/zh-tw/library/investment/foreign-gift-vs-foreign-trust/">海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？</a></li>
          <li>從你自己的海外帳戶匯過來的<strong>你自己的錢</strong>。那根本不是贈與。請見<a href="/zh-tw/library/investment/transfer-own-money-to-us/">把自己海外帳戶的錢匯到美國，要繳稅嗎？</a></li>
        </ul>

        <h2>實際例子</h2>
        <p>
          Ming 是住在加州的美國公民。他的父母是住在台北的台灣公民，從未在美國居住過。2025 年：
        </p>
        <ArticleTable
          head={['日期', '來自', '用途', '金額（美元）']}
          rows={[
            ['2025 年 3 月', '父親', '幫忙生活費', '$30,000'],
            ['2025 年 7 月', '母親', '結婚禮金', '$50,000'],
            ['2025 年 12 月', '父親', '年終贈與', '$25,000'],
            ['有親屬關係者合計', '', '', '$105,000'],
          ]}
        />
        <p>
          結果：這些錢都不是 Ming 的應稅收入。Ming 知道他的爸爸和媽媽彼此有親屬關係，所以依照合併計算規則，他把兩人的贈與加總。有親屬關係者的合計超過 $100,000，所以他必須申報 2025 年的 <strong>Form 3520 Part IV</strong>。他要在第 54 行（line 54）列出每一筆超過 $5,000 的贈與，包括日期、說明，以及以美元計算的公平市價（fair market value）。如果他的父母總共只給了 $95,000，就什麼都不用申報。
        </p>

        <h2>申報大致是什麼樣子</h2>
        <ul>
          <li><strong>表格：</strong>Form 3520 第 1 頁的身分資料，以及 Part IV（非居民外國人個人與海外遺產填第 54 行）。</li>
          <li><strong>要列出什麼：</strong>每一筆超過 $5,000 的贈與或遺產。如果每一筆都沒有超過 $5,000，但合計超過 $100,000，仍然要回答「Yes」，並寫上「No gifts or bequests exceed $5,000」，不必逐筆列出。</li>
          <li><strong>不附在 Form 1040 裡。</strong>它是另外申報的。2025 年收到的贈與，截止日是你的所得稅申報截止日（含延期），而日曆年度申報人最晚不能延到 2026 年 10 月 15 日之後。</li>
        </ul>
        <p>
          截止日、延期勾選欄與寄送地址，請見<a href="/zh-tw/library/investment/form-3520/">Form 3520：申報大額海外贈與</a>。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「既然不用繳稅，就不用申報。」</strong>「不用繳稅」和「不用申報」是兩個不同的問題。一筆 $300,000 的贈與可以免稅，但仍然需要申報 Form 3520。</li>
          <li><strong>「會計師幫我報了 1040，所以應該有處理。」</strong>Form 3520 是分開的。請直接問你的報稅人員有沒有申報這份表格。</li>
          <li><strong>「爸媽各自給的都不到 $100,000。」</strong>你知道、或有理由知道彼此有親屬關係的贈與人，他們的贈與要合併計算 — 不是一位贈與人一位贈與人分開看。</li>
          <li><strong>「錢已經匯進我的美國帳戶，IRS 應該知道了。」</strong>銀行收到匯款，不等於你已經申報 Form 3520。</li>
          <li><strong>「金額這麼大，贈與本身一定要繳稅。」</strong>通常不用。真正要繳稅的，是這筆錢之後產生的收益 — 利息、股利、租金與資本利得。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 漏報的代價</div>
          <p>如果應申報的海外贈與沒有按時申報，罰款可能是每未申報一個月罰贈與金額的 5%，最高 25%，除非未申報是出於合理原因（reasonable cause）而非故意疏忽。IRS 也可能自行判定這筆錢本身的所得稅後果。如果期限已經過了，請看<a href="/zh-tw/library/investment/late-form-3520/">Form 3520 忘記報或晚報，現在怎麼辦？</a></p>
        </div>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>每一筆匯款的電匯確認單或銀行對帳單，顯示日期、金額與匯款人</li>
          <li>把每筆匯款換算成美元時使用的匯率</li>
          <li>父母說明這筆錢是贈與（不是借款）的訊息、字條或信件</li>
          <li>必要時，父母身分的證明（例如他們不是美國公民或綠卡持有人）</li>
          <li>你申報的 Form 3520 副本與郵寄證明</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          如果這筆錢可能是借款或報酬而不是贈與、有一部分來自家族公司或信託、父母曾放棄美國國籍或綠卡、贈與的是財產而不是現金，或你漏報了以前年度的 Form 3520，請向 CPA 或稅務律師尋求協助。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

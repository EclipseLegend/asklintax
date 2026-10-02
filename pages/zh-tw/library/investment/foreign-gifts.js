import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gifts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gifts',
  sourceHash:      'fd8661a6c81b',
  id:            '21',
  title:         '海外贈與：父母從海外匯來的錢要繳稅嗎？',
  titleEn:       'Foreign gifts: is money from parents overseas taxable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人（Resident Alien）從非居民外國人（Nonresident Alien）個人、海外遺產與外國公司收到的贈與與遺產。借款、工作報酬、海外信託，以及來自「適用對象放棄國籍者」（Covered Expatriate）的贈與，適用不同規則',
  persona:       ['父母住在台灣或中國的子女', '接受家人經濟支援的新移民', '學生與年輕上班族', '收到海外親人匯款的人'],
  relatedJourney: ['剛到美國', '跨境財務'],
  actionRequired: '把這一年從非居民父母及其他有親屬關係的海外親人收到的所有款項加總。真正的贈與通常不算你的應稅收入 — 但如果有親屬關係者的合計金額超過 $100,000，你必須在 Form 3520 上申報；Form 3520 要與稅表分開申報。',
  sources: [
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 填寫說明（Part IV）', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（Taxable and Nontaxable Income：贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 年通膨調整（section 6039F 門檻）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
  ],
}

const FAQS = [
  {
    q: '我台灣的父母今年匯給我 $80,000，我要繳美國的稅嗎？',
    a: '如果是真正的贈與，通常不用。收到的贈與和遺產一般不計入受贈人的所得。而且因為 $80,000 沒有超過 $100,000，你不需要為這筆錢申報 Form 3520 — 前提是你沒有從父母或其他有親屬關係的非居民外國人收到其他贈與，使這一年有親屬關係者的合計金額超過 $100,000。',
  },
  {
    q: '我媽媽匯了 $60,000，爸爸匯了 $50,000，要分開計算嗎？',
    a: '不是。計算 Form 3520 的 $100,000 門檻時，你必須把你知道（或有理由知道）彼此有親屬關係的非居民外國人所給的贈與加總。你的父母彼此有親屬關係，所以合計是 $110,000 — 超過 $100,000 — 你必須申報 Form 3520 Part IV。贈與本身通常仍然不是應稅收入。',
  },
  {
    q: '我把贈與的錢存進儲蓄帳戶，利息要繳稅嗎？',
    a: '要。贈與本身通常不算收入，但這筆錢之後產生的收益 — 利息、股利、租金或資本利得 — 就像其他投資收入一樣，你要繳稅。',
  },
  {
    q: '我父母直接把我的大學學費付給學校，這算我要申報的海外贈與嗎？',
    a: '代你支付的合格學費或醫療費用，在 Form 3520 上不視為海外贈與。但如果錢是匯給你、你再拿去繳學費，情況就不同 — 那是給你的贈與，要計入門檻。',
  },
  {
    q: '我爸爸是住在台灣的美國綠卡持有人，他給的錢算「海外贈與」嗎？',
    a: '不算。海外贈與是指來自外國人（例如非居民外國人個人）的贈與。永久居民（Lawful Permanent Resident）在稅務上通常是美國居民，所以他給的贈與不需要在 Form 3520 Part IV 申報。他自己是否需要申報贈與稅，則要看他的情況。',
  },
  {
    q: '我從海外收到的錢會影響我的 FBAR 嗎？',
    a: '收到贈與本身不會產生 FBAR 申報義務。但如果這筆錢存在美國境外的銀行帳戶，而你所有海外帳戶在這一年中任何時候合計超過 $10,000，就必須為這些帳戶申報 FBAR。',
  },
  {
    q: '我不知道有 Form 3520，兩年前收到一大筆贈與，現在該怎麼辦？',
    a: '不要置之不理。未申報海外贈與的罰款，可能是每未申報一個月罰贈與金額的 5%，最高 25%，除非你能證明有合理原因（Reasonable Cause）。稅務專業人士可以協助你補報這份表格，並附上合理原因的說明。',
  },
]

const RELATED = [
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '如何填寫 Part IV、何時到期、寄到哪裡，以及如何避免逾期申報罰款。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '如果贈與的錢留在海外帳戶，即使贈與不用繳稅，FBAR 與 Form 8938 仍可能適用。',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: '剛來美國？新移民完整報稅指南',
    desc:  '剛到美國的頭幾年，接受海外家人的經濟支援很常見 — 這裡整理其他你需要知道的事。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '贈與不是收入，但海外的利息、租金與薪資是。看看美國居民需要申報什麼。',
  },
]

export default function ForeignGiftsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '父母從海外匯來的錢要繳稅嗎？海外贈與說明 | AskLinTax 繁體中文',
      description: '台灣或中國父母匯來的錢通常不是應稅收入 — 但超過 $100,000 的贈與必須申報 Form 3520。2025 年海外贈與白話指南。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你住在美國境外的父母（或其他親人）以<strong>贈與</strong>的方式匯錢給你，這筆錢通常<strong>不是你的應稅收入</strong>。IRS 將你收到的贈與和遺產排除在你的所得之外。
        </p>
        <p>
          但「不用繳稅」不等於「不用申報」。來自外國人的大額贈與另有<strong>申報</strong>義務 — 漏報的代價可能很高。
        </p>

        <ArticleTable
          head={['問題', '來自非居民父母的真正贈與']}
          rows={[
            ['這筆贈與是我的應稅收入嗎？', '通常不是'],
            ['贈與的錢之後產生的收入要繳稅嗎？', '要 — 利息、股利、租金與資本利得都要繳稅'],
            ['我要在 Form 3520 上申報嗎？', '只有在這一年來自有親屬關係的非居民外國人的贈與合計超過 $100,000 時'],
            ['Form 3520 是稅表的一部分嗎？', '不是 — 要另外寄給 IRS'],
          ]}
        />

        <h2>什麼算是「海外贈與」？</h2>
        <p>
          在 IRS 的規定中，海外贈與（Foreign Gift）是指你從<strong>外國人</strong>（Foreign Person）收到、並當作贈與（或遺產）而排除在所得之外的金錢或財產。外國人包括：
        </p>
        <ul>
          <li>非居民外國人個人 — 例如住在台灣、不是美國公民也不是美國稅務居民的父母</li>
          <li>海外遺產（例如住在海外的父母過世後留下的遺產）</li>
          <li>外國公司或外國合夥事業</li>
        </ul>
        <p>
          來自美國公民或美國稅務居民的贈與 — 即使對方住在海外 — <strong>不算</strong>這些規則下的海外贈與。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 贈與必須真的是贈與</div>
          <p>這些規則適用於真正的贈與。如果這筆錢其實是你必須償還的借款、你工作的報酬，或是企業的分配款，就不是贈與，適用不同的稅務規則。如果無法清楚判斷這筆錢是不是贈與，在決定怎麼處理之前，請先諮詢稅務專業人士。</p>
        </div>

        <h2>申報規則：Form 3520 與 $100,000 門檻</h2>
        <p>
          如果這個稅務年度收到的海外贈與超過以下門檻，你必須在 <strong>Form 3520 Part IV</strong> 申報：
        </p>

        <ArticleTable
          head={['贈與來源', '這一年合計超過多少要申報 Form 3520', '需要列出什麼']}
          rows={[
            ['非居民外國人個人或海外遺產', '超過 $100,000（有親屬關係者的贈與要合併計算）', '每一筆超過 $5,000 的贈與'],
            ['外國公司或外國合夥事業', '2025 年超過 $20,116（2026 年為 $20,573）— 每年依通膨調整', '每一筆贈與與贈與人的身分'],
          ]}
        />

        <p>
          對家庭來說最重要的細節：你必須把你知道（或有理由知道）彼此有親屬關係的人所給的贈與<strong>加總</strong>。媽媽和爸爸給的贈與要合併成一個總額計算，而不是分開兩筆。
        </p>

        <h3>實際例子</h3>
        <p>2025 年，美國居民 Wen 從台灣的父母收到以下匯款：</p>
        <ArticleTable
          head={['日期', '來自', '金額（美元）']}
          rows={[
            ['2025 年 2 月', '母親', '$40,000'],
            ['2025 年 6 月', '父親', '$35,000'],
            ['2025 年 11 月', '母親', '$30,000'],
            ['來自有親屬關係的非居民外國人合計', '', '$105,000'],
          ]}
        />
        <p>
          結果：這些贈與通常<strong>不是 Wen 的應稅收入</strong>，但有親屬關係者的合計超過 $100,000，所以她必須申報 2025 年的 <strong>Form 3520 Part IV</strong>，並列出每一筆超過 $5,000 的贈與。如果她的父母總共只匯了 $95,000，就不需要申報 Form 3520。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 直接支付的學費與醫療費</div>
          <p>外國人代你支付的合格學費或醫療費用，在 Form 3520 上不視為海外贈與。這只適用於代你支付的款項 — 匯給你、之後你再拿去繳學費的錢，是給你的贈與。</p>
        </div>

        <h2>當贈與的錢開始產生收入</h2>
        <p>
          贈與本身不是收入，但你收到之後它所產生的收益就是。如果你把錢存進儲蓄帳戶、買股票或買出租房產，產生的利息、股利、租金與資本利得，你身為美國稅務居民都要繳稅 — 不論帳戶或房產在美國還是海外。
        </p>

        <h2>如果沒有申報，會怎樣？</h2>
        <p>
          如果你沒有為應申報的海外贈與按時申報 Form 3520 — 或申報的資料不完整或不正確 — 可能發生兩件事：
        </p>
        <ul>
          <li><strong>罰款</strong>：每未申報一個月，罰贈與價值的 5%，最高為贈與金額的 25%，除非未申報是出於合理原因。</li>
          <li>IRS 可能自行<strong>判定這筆錢的所得稅後果</strong> — 換句話說，IRS 可能不接受這筆錢是贈與。</li>
        </ul>
        <p>
          因為罰款是依贈與金額計算，即使這筆贈與本身不用繳所得稅，大額匯款漏報 Form 3520 的代價也可能非常高。
        </p>

        <h2>特殊情況</h2>
        <h3>來自「適用對象放棄國籍者」的贈與</h3>
        <p>
          如果贈與人是被視為「適用對象放棄國籍者」（Covered Expatriate）的前美國公民或前長期綠卡持有人，適用的規則不同：美國的受贈人可能要繳一種特別的移轉稅。這種情況很少見，但如果你的親人放棄了美國國籍或綠卡，在認定贈與免稅之前，請先諮詢稅務專業人士。
        </p>
        <h3>來自海外信託的分配</h3>
        <p>
          你從海外信託收到的錢，不是在 Part IV 當作贈與申報，而是在 Form 3520 的另一部分當作信託分配申報，而且可能要繳稅。信託相關的情況需要專業協助。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 保留簡單的贈與紀錄</div>
          <p>每一筆來自海外家人的匯款，都記下日期、美元金額、匯款人，以及一段說明這是贈與的簡短紀錄（例如父母的訊息或信件）。有了這些紀錄，申報 Form 3520 會簡單很多，如果 IRS 詢問，也能幫助證明這筆錢是贈與。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

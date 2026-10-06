import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/form-3520.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-3520',
  sourceHash:      'ad26f584e3d4',
  id:            '22',
  title:         'Form 3520：申報大額海外贈與',
  titleEn:       'Form 3520: reporting large foreign gifts',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'reminder',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人個人申報的 Form 3520 Part IV（來自外國人的贈與與遺產）。海外信託申報（Parts I–III）不在本指南範圍內',
  persona:       ['從海外家人收到超過 $100,000 的人', '父母住在美國境外的繼承人', '新移民', '協助家人報稅的報稅人員'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '如果 2025 年來自有親屬關係的非居民外國人的贈與或遺產合計超過 $100,000，請填寫 Form 3520 Part IV，並在 2026 年 4 月 15 日前寄到 IRS 位於猶他州 Ogden 的地址 — 如果你的所得稅表已申請延期，則為 2026 年 10 月 15 日前。這份表格不附在稅表裡。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Instructions for Form 3520，Rev. 12/2025）', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Form 3520（Rev. December 2023），Part IV', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 年通膨調整（section 6039F 門檻）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
  ],
}

const FAQS = [
  {
    q: '為贈與申報 Form 3520，我需要繳稅嗎？',
    a: '為贈與申報 Part IV 本身不會產生稅。收到的贈與和遺產，對受贈人來說通常不是應稅收入。Form 3520 是一份資訊申報表（Information Return），用來讓 IRS 知道這筆贈與。',
  },
  {
    q: '我可以把 Form 3520 附在 Form 1040 裡一起寄嗎？',
    a: '不行。Form 3520 要與所得稅表分開申報。依目前的填寫說明，請寄到 Internal Revenue Service Center, P.O. Box 409101, Ogden, UT 84409。',
  },
  {
    q: '我的稅表申請了延期，Form 3520 也會跟著延期嗎？',
    a: '會，但以曆年制申報人來說，最晚只到 10 月 15 日。如果你的所得稅表申請了延期，請勾選 Form 3520 的 box 1k，並填入你延期的稅表表號，IRS 才不會把 Form 3520 視為逾期。即使你住在海外、所得稅表獲得額外的裁量延期到 12 月 15 日，Form 3520 仍然要在 10 月 15 日前申報。',
  },
  {
    q: '我繼承了住在台灣的母親留下的錢，要在 Form 3520 申報嗎？',
    a: '要，如果這一年的金額超過 $100,000（來自有親屬關係的外國人的贈與與遺產合併計算）。來自非居民外國人或海外遺產的遺贈，和贈與一樣在 Part IV 申報。',
  },
  {
    q: '我收到的每一筆贈與都不到 $5,000，但合計超過 $100,000，要列出什麼？',
    a: '你仍然要在 line 54 回答「Yes」，但不需要填寫個別贈與的欄位。改為在第一行的 column (b) 填入「No gifts or bequests exceed $5,000」。',
  },
  {
    q: 'Form 3520 逾期申報的罰款是多少？',
    a: '未申報的海外贈與，罰款為每未申報一個月罰贈與價值的 5%，最高 25%。如果你能證明未申報是出於合理原因、而非故意疏忽（Willful Neglect），就不會被罰。IRS 也可能自行判定這筆錢的所得稅處理方式。',
  },
  {
    q: '可以用電子方式申報 Form 3520 嗎？',
    a: '目前的 IRS 填寫說明要求個人把 Form 3520 寄到猶他州 Ogden 的 IRS 服務中心。申報前請先到 IRS.gov/Form3520 查看是否有更新，並保留郵寄證明。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '如果你不確定收到的錢是贈與、要繳稅，還是要申報，從這裡開始。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  'Form 3520 是好幾種國際資訊申報表之一。看看 FBAR 與 Form 8938 有什麼不同。',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '繼承海外房屋可能需要申報 Form 3520 — 之後出租或出售時還有其他申報。',
  },
]

export default function Form3520ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外贈與的 Form 3520：門檻、截止日與罰款 | AskLinTax 繁體中文',
      description: '誰必須申報 Form 3520 Part IV、$100,000 海外贈與門檻、2025 年外國公司門檻、截止日、寄送地址，以及逾期申報罰款。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>Form 3520 是做什麼用的</h2>
        <p>
          Form 3520（<em>Annual Return to Report Transactions with Foreign Trusts and Receipt of Certain Foreign Gifts</em>）是 IRS 的<strong>資訊申報表</strong>。美國人用它申報三類事項：與海外信託的特定交易、擁有海外信託，以及收到<strong>來自外國人的大額贈與或遺產</strong>。
        </p>
        <p>
          本指南說明多數家庭需要的部分：<strong>Part IV</strong>，用來申報從外國人收到的贈與與遺產。如果你涉及海外信託，請尋求專業協助 — 表格的那些部分複雜得多。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 申報 ≠ 欠稅</div>
          <p>來自海外家人的贈與通常不是你的應稅收入。Form 3520 的目的是讓 IRS 知道來自外國人的大額移轉。出錯的代價來自罰款，而不是贈與本身的稅。請參閱 <a href="/zh-tw/library/investment/foreign-gifts/">海外贈與：父母從海外匯來的錢要繳稅嗎？</a></p>
        </div>

        <h2>誰必須申報 Part IV</h2>
        <p>如果你是美國人 — 美國公民或美國稅務居民（請參閱 <a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>）— 而且在這個稅務年度收到以下款項，就必須填寫 Part IV：</p>

        <ArticleTable
          head={['來自', '這一年的門檻', 'Form 3520 欄位']}
          rows={[
            ['非居民外國人個人或海外遺產（贈與或遺贈）', '合計超過 $100,000，包括與他們有親屬關係的外國人所給的贈與', 'Line 54'],
            ['外國公司或外國合夥事業（名義上的贈與）', '2025 年超過 $20,116（2026 年為 $20,573）', 'Line 55'],
          ]}
        />

        <h3>合併計算規則</h3>
        <p>
          判斷是否超過 $100,000 時，如果你知道 — 或有理由知道 — 不同的非居民外國人與海外遺產彼此有親屬關係，或其中一方代表另一方，就要把他們的贈與加總。IRS 填寫說明舉了這個例子：一位非居民外國人贈與 $75,000，另一位有親屬關係的非居民外國人贈與 $40,000，合計 $115,000，所以兩筆都必須申報。
        </p>

        <h3>哪些不算海外贈與</h3>
        <ul>
          <li>代你支付的<strong>合格學費或醫療費用</strong></li>
          <li>來自美國公民或美國稅務居民的贈與</li>
          <li>來自<strong>海外信託</strong>的分配 — 這些在 Part III 申報，不在 Part IV（請見<a href="/zh-tw/library/investment/foreign-gift-vs-foreign-trust/">海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？</a>）</li>
        </ul>

        <h2>如何填寫 Part IV</h2>
        <ArticleTable
          head={['欄位', '問的是什麼', '怎麼填']}
          rows={[
            ['Line 54', '你是否從非居民外國人或海外遺產收到超過 $100,000？', '勾選「Yes」，並列出每一筆超過 $5,000 的贈與或遺贈：日期、說明，以及公平市價（Fair Market Value）。如果沒有任何一筆超過 $5,000，就在第一行的 column (b) 寫上「No gifts or bequests exceed $5,000」。'],
            ['Line 55', '你是否從外國公司或合夥事業收到超過 section 6039F 門檻的金額？', '勾選「Yes」，並列出每一筆贈與與贈與人的身分。IRS 可能把這些「贈與」重新認定為應稅收入。'],
            ['Line 56', '外國贈與人是否是代替他人的名義人（Nominee）或中間人？', '如果你有理由這麼認為，勾選「Yes」並說明。'],
          ]}
        />
        <p>
          你也要填寫第 1 頁的身分資料（姓名、地址與納稅人識別號碼）。贈與以美元申報；以其他貨幣匯款的部分，請保留你使用的匯率紀錄。
        </p>

        <h2>什麼時候、寄到哪裡</h2>
        <ArticleTable
          head={['你的情況（曆年制個人）', '2025 年贈與的 Form 3520 截止日']}
          rows={[
            ['一般情況', '2026 年 4 月 15 日'],
            ['在稅表截止日當天住在並工作於美國與波多黎各以外（或在海外服兵役）的美國公民或居民', '2026 年 6 月 15 日 — 附上證明你符合資格的說明'],
            ['你的所得稅表申請了延期（Form 4868）', '2026 年 10 月 15 日 — 勾選 box 1k 並填入延期稅表的表號'],
          ]}
        />
        <p>
          Form 3520 <strong>不</strong>附在你的 Form 1040 裡。依目前的填寫說明，請寄到：
        </p>
        <p style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '16px 20px', fontFamily: 'monospace', fontSize: '15px', lineHeight: '1.7' }}>
          Internal Revenue Service Center<br />P.O. Box 409101<br />Ogden, UT 84409
        </p>
        <p>
          只有<strong>完整</strong>的 Form 3520（包括必要的附件）才算按時申報。如果截止日遇到週末或法定假日，可以在下一個工作日前申報。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 10 月 15 日是最後期限</div>
          <p>曆年制申報人的 Form 3520 無法延期超過 10 月 15 日。住在海外的美國公民與居民，即使所得稅表獲得額外的裁量延期到 12 月 15 日，仍必須在 10 月 15 日前申報 Form 3520。</p>
        </div>

        <h2>罰款</h2>
        <p>
          如果你沒有按時申報海外贈與，或申報資料不完整或不正確：
        </p>
        <ul>
          <li>罰款為<strong>每未申報一個月，罰海外贈與金額的 5%</strong>，最高 <strong>25%</strong>。</li>
          <li>IRS 可能自行判定這筆錢的<strong>所得稅後果</strong> — IRS 可能不接受這筆錢是贈與。</li>
          <li>如果你能證明未申報是出於<strong>合理原因</strong>、而非故意疏忽，就不會被罰。</li>
        </ul>
        <p>
          例子：一筆 $200,000 的贈與如果逾期超過五個月才申報，罰款最高可能達 $50,000（25%）— 即使這筆贈與本身從來不需要繳稅。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>如果你的 Form 3520 已經逾期、「贈與」來自公司或可能其實是借款或報酬、涉及海外信託，或贈與人是前美國公民或前綠卡持有人，請向 CPA 或稅務律師尋求協助。逾期申報應附上合理原因的說明 — 請見<a href="/zh-tw/library/investment/late-form-3520/">Form 3520 忘記報或晚報，現在怎麼辦？</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-power-of-attorney-2848-8821.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-power-of-attorney-2848-8821',
  sourceHash:      'f662fa42aba5',
  id:            '111',
  title:         'IRS 授權書：Form 2848 與 Form 8821 的差別',
  titleEn:       'IRS Power of Attorney: Form 2848 vs. Form 8821',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 2848（2021 年 1 月版）及其說明（2021 年 9 月版）、Form 8821（2021 年 1 月版）及其說明（2021 年 9 月版）、Topic No. 311，以及 2026 年審閱的 IRS 線上提交授權與 Tax Pro Account 網頁，說明個人適用的 IRS 第三方授權。本文不詳細說明企業簽署人、Form 56 受託人通知，也不涵蓋州稅授權書',
  persona:       ['委託 CPA、註冊稅務代理人（EA）或律師的納稅人', '幫父母或親人處理 IRS 事務的家人', '住在海外的納稅人', '貸款機構或顧問需要 IRS 紀錄的人'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '如果你要別人在 IRS 面前代表你，用 Form 2848；如果只要讓別人看你的稅務資料，用 Form 8821。列出具體的稅表與年度，簽名後以線上、傳真或郵寄提交 — 或在你的 IRS 線上帳戶核准代理人的申請。',
  sources: [
    { label: 'IRS — Form 2848 說明（2021 年 9 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i2848.pdf' },
    { label: 'IRS — Form 8821 說明（2021 年 9 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i8821.pdf' },
    { label: 'IRS — Topic no. 311，授權書資訊', url: 'https://www.irs.gov/taxtopics/tc311' },
    { label: 'IRS — 線上提交 Form 2848 與 8821', url: 'https://www.irs.gov/tax-professionals/submit-forms-2848-and-8821-online' },
    { label: 'IRS — Tax Pro Account', url: 'https://www.irs.gov/tax-professionals/tax-pro-account' },
    { label: 'IRS — 關於 Form 2848', url: 'https://www.irs.gov/forms-pubs/about-form-2848' },
  ],
}

const FAQS = [
  {
    q: '家人可以在 IRS 面前代表我嗎？',
    a: '很多情況下可以。Form 2848 把「家庭成員」列為合格的身分類別：配偶、父母、子女、兄弟、姊妹、祖父母、孫子女、繼父母、繼子女、繼兄弟或繼姊妹。如果你只想讓親人看你的資料或打電話詢問，用 Form 8821 就夠了。',
  },
  {
    q: '我和配偶合併申報，可以只用一份 Form 2848 嗎？',
    a: '不行。即使委託同一位代理人，每位配偶都必須各自提交一份 Form 2848。IRS 線上提交網頁也指出，即使是合併申報的夫妻，也要一次提交一份表格。',
  },
  {
    q: '表格上可以寫「所有年度」嗎？',
    a: '不行。你必須列出具體的稅表與年度或期間。寫「All years」或「All taxes」這類籠統說法的表格會被退回。你可以列過去的年度、當年度與未來年度，但 IRS 不會登錄超過其收到表格當年 12 月 31 日起 3 年以後的未來年度。',
  },
  {
    q: '新的 Form 2848 會取消舊的嗎？',
    a: '同一事項通常會。IRS 把新的授權書登錄到 CAF 時，通常會撤銷同一事項先前的授權書。如果要保留先前的授權，請勾選第 6 行的保留方框，並附上要保留的那份授權書副本。Form 8821 也適用同樣的規則。',
  },
  {
    q: '代理人可以幫我簽報稅表嗎？',
    a: '只有少數情況可以：疾病或受傷、在報稅截止日前連續離開美國至少 60 天，或因其他正當理由取得 IRS 的特別許可。你必須勾選第 5a 行的方框，並加上規定的聲明。',
  },
  {
    q: '持有 Form 8821 的人可以拿到我的退稅嗎？',
    a: '不行。Form 8821 說明指出，被授權人絕對不可以背書或兌現你的退稅支票，也不可以透過直接存款收取你的退稅。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '什麼時候請代理人回覆可能有幫助。',
  },
  {
    href: '/library/irs/irs-audit',
    cat:  'IRS & Tax Issues',
    title: '被 IRS 查帳（audit），接下來會怎樣？',
    desc:  '查帳期間的代理。',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS 稅務記錄（transcript）：種類、如何取得，以及和報稅表副本的差別',
    desc:  '分享 IRS 紀錄的另一種方式。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '代理人可以代你申請分期付款。',
  },
]

export default function IrsPowerOfAttorneyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 授權書：Form 2848 與 Form 8821 的差別 | AskLinTax 繁體中文',
      description: 'Form 2848 讓別人在 IRS 面前代表你；Form 8821 只讓別人看你的稅務資料。誰可以代表你、報稅代理人的有限權利、合併申報、線上提交、Tax Pro Account，以及撤銷授權。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          除非你授權，否則 IRS 不會和別人討論你的稅務帳戶。<strong>Form 2848（授權書與代理人聲明）</strong>讓合格的人<strong>代表</strong>你 — 替你發言、主張你的立場，並代你處理事務。<strong>Form 8821（稅務資料授權）</strong>只讓個人或機構<strong>查看並取得</strong>你的稅務資料。如果你需要別人幫你解決問題，通常需要 Form 2848；如果對方只需要你的紀錄，用 Form 8821 就夠了。
        </p>

        <h2>代表你 vs. 查看資料</h2>
        <ArticleTable
          head={['', 'Form 2848（授權書）', 'Form 8821（稅務資料授權）']}
          rows={[
            ['允許做什麼', '在 IRS 面前代表你，包括查看並取得你的稅務資料', '只能查看並取得你的稅務資料'],
            ['可以指定誰', '只能是有資格在 IRS 執業的個人', '任何個人、公司、事務所、機構或合夥'],
            ['替你發言或主張立場', '可以', '不可以'],
            ['簽署協議、棄權書或同意書', '可以，在授權範圍內', '不可以'],
            ['增加或替換其他人', '只有你在第 5a 行授權時才可以', '不可以'],
            ['收取你的退稅', '不可以', '不可以'],
          ]}
        />

        <h2>誰可以用 Form 2848 代表你</h2>
        <ul>
          <li><strong>完整代理：</strong>律師、執業會計師（CPA）與註冊稅務代理人（enrolled agent），以及在其專業範圍內的註冊精算師與註冊退休計畫代理人。</li>
          <li><strong>家庭成員：</strong>配偶、父母、子女、兄弟、姊妹、祖父母、孫子女、繼父母、繼子女、繼兄弟或繼姊妹。</li>
          <li><strong>符合資格的學生與法律畢業生：</strong>在低收入納稅人診所（LITC）或學生稅務診所計畫（STCP）工作，並取得納稅人權益服務（Taxpayer Advocate Service）許可的人。</li>
          <li><strong>未註冊的報稅代理人 — 只有有限權利：</strong>只能在 IRS 審查他們準備並簽名的報稅表時代表你，而且只能面對稅務稽查員、客服人員及類似員工（包括納稅人權益服務）。他們不能在上訴部門、稅收官或 IRS 首席法律顧問辦公室面前代表你，也不能替你簽署協議、棄權書或退稅申請。對 2015 年以後準備的報稅表，他們還必須有年度報稅季計畫（Annual Filing Season Program）完成紀錄。</li>
        </ul>
        <p>
          如果報稅代理人不符合這些條件，你仍可以用 Form 8821 讓他查看你的資料 — 但這不會讓他代表你。
        </p>

        <h2>如何正確填寫</h2>
        <ul>
          <li><strong>你的資料：</strong>姓名、SSN 或 ITIN，以及地址。表格上的地址不會變更你在 IRS 的地址；變更地址請用 Form 8822。</li>
          <li><strong>具體事項：</strong>列出稅種（例如所得稅）、表格編號（例如 1040）與每個年度。「All years」這類籠統的寫法會被退回。</li>
          <li><strong>未來年度：</strong>可以列，但 IRS 不會登錄超過其收到表格當年 12 月 31 日起 3 年以後的年度。</li>
          <li><strong>通知副本：</strong>如果要代理人收到副本，請勾選代理人姓名下方的方框；同一事項最多只能有兩位代理人或被授權人收到副本。</li>
          <li><strong>簽名：</strong>你簽第一部分；每位代理人簽第二部分的聲明。使用電子簽名的 Form 2848 只能線上提交，而且如果你是遠端簽名，提交人必須驗證你的身分。</li>
          <li><strong>合併申報：</strong>每位配偶各提交一份表格。</li>
        </ul>

        <h2>如何送交 IRS</h2>
        <ArticleTable
          head={['方式', '要知道的事']}
          rows={[
            ['Tax Pro Account（由代理人發起）', '個人授權可即時處理。律師、CPA、註冊稅務代理人、註冊精算師或註冊退休計畫代理人可以申請授權書；任何人都可以申請稅務資料授權。你在自己的 IRS 線上帳戶核准申請。'],
            ['線上上傳', '在 IRS.gov/Submit2848 或 IRS.gov/Submit8821 上傳表格。一次提交一份；不要再傳真或郵寄同一份。'],
            ['傳真或郵寄', '寄到說明中列出的 CAF 單位；如果勾選了第 4 行，則寄到處理該事項的 IRS 辦公室。'],
          ]}
        />
        <p>
          大多數授權會登錄在 IRS 的<strong>集中授權檔案（Centralized Authorization File, CAF）</strong>，讓 IRS 員工確認誰可以代表你。代理人第一次取得授權時會拿到九位數的 CAF 號碼。透過 Tax Pro Account 對個人提出的申請，納稅人必須有美國州或華盛頓特區的地址，而且要和 IRS 紀錄相符。如果 Form 8821 的用途不是解決稅務問題，例如貸款機構的收入驗證，IRS 必須在你簽名後 120 天內收到。
        </p>

        <h2>撤銷或退出</h2>
        <ul>
          <li><strong>新的授權：</strong>同一事項提交新表格，通常會撤銷 CAF 上先前的授權，除非你勾選保留方框並附上要保留的授權書副本。</li>
          <li><strong>撤銷但不指定新的人：</strong>在副本第一頁上方寫「REVOKE」，簽名並寫上日期，寄到原本送交的地方。如果沒有副本，寄一份簽名的聲明，列出事項、年度與每位被撤銷的代理人。</li>
          <li><strong>代理人退出：</strong>代理人在副本上寫「WITHDRAW」，簽名並寫上日期，以相同方式寄送。代理人也可以透過 Tax Pro Account 退出。</li>
        </ul>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Mei', 'David', 'Ana']}
          rows={[
            ['情況', '收到 CP2000 通知，委託註冊稅務代理人回覆', '住在海外；想請在美國的姊姊打電話問 IRS 退稅沒收到的事', '房貸機構要她的 IRS 紀錄'],
            ['表格', 'Form 2848，指定該註冊稅務代理人處理通知年度的所得稅、Form 1040', 'Form 2848，以家庭成員身分指定姊姊 — 如果姊姊只需要資料，則用 Form 8821', 'Form 8821，指定貸款機構或其驗證服務，並在簽名後 120 天內送達'],
            ['合併申報？', '是 — 她的先生另外提交自己的 Form 2848', '否', '否'],
          ]}
        />

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>需要別人替你協商或主張立場時，卻用 Form 8821。</strong></li>
          <li><strong>寫「所有年度」</strong>或漏寫表格編號。</li>
          <li><strong>合併申報時夫妻只用一份表格。</strong></li>
          <li><strong>提交新表格時沒有勾選保留方框</strong>，不小心撤銷了現有的代理人。</li>
          <li><strong>同一份表格既線上提交</strong>又傳真或郵寄。</li>
          <li><strong>把 IRS 線上帳戶的登入資訊給別人</strong>，而不是正式授權。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 授權別人不代表你不用負責</div>
          <p>即使有代理人，你仍然要對自己的稅務義務負責。請確認你授權的人有資格，並保留你簽署的每份表格副本。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/late-fbar.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'late-fbar',
  sourceHash:      '667be682f899',
  id:            '48',
  title:         '忘記報 FBAR 怎麼辦？',
  titleEn:       'I forgot to file an FBAR — what should I do?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '概要說明 IRS 對漏報 FBAR 的個人提供的處理方式。本文不預測罰款，也不決定哪一種方式適合個別情況；是否故意、是否有未申報收入，以及是否正在接受 IRS 查核，都會改變分析，需要專業建議',
  persona:       ['剛知道有 FBAR 的人', '以前年度漏報 FBAR 的新移民', '名字在父母海外帳戶上、從未申報的人', '收到 IRS 關於海外帳戶信件的納稅人'],
  relatedJourney: ['跨境財務'],
  actionRequired: '不要忽視漏報的 FBAR。先釐清兩件事：IRS 是否已經聯絡過你，以及海外帳戶的所有收入是否都已申報並繳稅。這兩件事決定哪一種 IRS 程序可能適用。如果有未申報的收入，或 IRS 已經聯絡你，申報前請先尋求專業建議。',
  sources: [
    { label: 'IRS — 逾期 FBAR 補交程序（Delinquent FBAR submission procedures）', url: 'https://www.irs.gov/individuals/international-taxpayers/delinquent-fbar-submission-procedures' },
    { label: 'IRS — 未揭露海外金融資產的美國納稅人可用的選項', url: 'https://www.irs.gov/individuals/international-taxpayers/options-available-for-us-taxpayers-with-undisclosed-foreign-financial-assets' },
    { label: 'IRS — Streamlined filing compliance procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures' },
    { label: 'IRS — Criminal Investigation Voluntary Disclosure Practice（自願揭露）', url: 'https://www.irs.gov/compliance/criminal-investigation/irs-criminal-investigation-voluntary-disclosure-practice' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
  ],
}

const FAQS = [
  {
    q: '我現在把 FBAR 補報上去，就全部解決了嗎？',
    a: '不一定。補報 FBAR 只是其中一部分。會不會被罰款、哪一種 IRS 程序適用，取決於一些事實，例如帳戶的所有收入是否都已申報並繳稅，以及 IRS 是否已經聯絡過你。',
  },
  {
    q: '我台灣帳戶的利息每年都有報在稅表上，只是沒報 FBAR。適用什麼？',
    a: 'IRS 的逾期 FBAR 補交程序就是針對這種情況：你沒有在接受民事查核或刑事調查、IRS 沒有就這些逾期 FBAR 聯絡過你，而且帳戶的收入都已正確申報並繳稅。IRS 表示在這種情況下，不會因未申報而處以罰款，但有它列出的條件 — 請仔細閱讀，或請專業人士確認你是否符合。',
  },
  {
    q: '如果我連利息也沒報呢？',
    a: '那麼光靠逾期 FBAR 補交程序就不適合，因為還有未申報的收入。IRS 描述了其他選項，例如針對非故意行為的 streamlined filing compliance procedures，以及針對故意行為的 Criminal Investigation Voluntary Disclosure Practice。要選哪一個是很重要的決定 — 請找稅務專業人士討論。',
  },
  {
    q: '逾期的 FBAR 要怎麼申報？',
    a: '和一般 FBAR 一樣，透過 FinCEN 的 BSA E-Filing System 以電子方式申報。IRS 的逾期程序表示要附上說明為什麼逾期申報，而電子申報表也可以選擇逾期的原因。',
  },
  {
    q: '補報之後，我的 FBAR 會被查嗎？',
    a: 'IRS 表示，依逾期程序補報的 FBAR 不會自動被查，但仍可能透過現有的查核選案程序被選中。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '誰要申報、哪些算，以及如何透過 BSA E-Filing 申報。',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '補報之前，先確認哪些年度真的需要申報。',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520 忘記報或晚報，現在怎麼辦？',
    desc:  '也漏報了海外贈與？那是另一個程序。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如果 IRS 已經聯絡你，從這裡開始。',
  },
]

export default function LateFbarZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '忘記報 FBAR 怎麼辦？補報 FBAR 的 IRS 選項 | AskLinTax 繁體中文',
      description: '漏報海外帳戶的 FBAR？IRS 逾期 FBAR 補交程序、streamlined 程序與自願揭露有什麼不同，為什麼未申報的收入與 IRS 是否聯絡過你很重要，以及什麼時候該找專業協助。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          不要置之不理，也不要以為同一種做法適合每個人。IRS 針對漏報 FBAR 的人，描述了<strong>不同的選項</strong>，適用哪一種主要取決於兩件事：
        </p>
        <ol>
          <li><strong>IRS 是否已經聯絡過你</strong> — 或你是否正在接受民事查核或刑事調查？</li>
          <li><strong>海外帳戶的所有收入</strong>，是否都已申報在美國稅表上並繳稅？</li>
        </ol>
        <p>
          FBAR 的罰款可能很重，而且取決於事實 — 包括是否為故意（willful）。沒有人能事先保證「不會被罰」。除了最單純的情況之外，請尋求個別的專業建議。
        </p>

        <h2>依你的情況對照 IRS 的選項</h2>
        <ArticleTable
          head={['你的情況', 'IRS 描述的選項', '說明']}
          rows={[
            ['沒有接受查核或調查、IRS 沒有就 FBAR 聯絡過你，而且帳戶收入都已申報並繳稅', '逾期 FBAR 補交程序（Delinquent FBAR submission procedures）', '補報逾期的 FBAR，並附上說明逾期原因'],
            ['帳戶收入沒有完整申報，而且行為是非故意的', 'Streamlined filing compliance procedures', '需要在偽證罰則下簽署非故意行為的聲明；需申報的稅表與 FBAR 請見 IRS 網頁'],
            ['行為是故意的，可能有刑事責任', 'IRS Criminal Investigation Voluntary Disclosure Practice（自願揭露）', '採取任何步驟之前，先找稅務律師'],
            ['已經在接受查核，或 IRS 已經聯絡你', '上述程序可能無法使用', '請在專業協助下回覆 IRS'],
          ]}
        />

        <h2>逾期 FBAR 補交程序</h2>
        <p>
          IRS 表示，沒有申報應報的 FBAR、<strong>沒有</strong>在接受民事查核或刑事調查，而且 IRS <strong>尚未</strong>就這些逾期 FBAR 聯絡過的納稅人，應依 FBAR 的說明補報逾期的 FBAR，並附上說明為什麼逾期。FBAR 透過 FinCEN 的 BSA E-Filing System 以電子方式申報，可以在表上選擇逾期的原因。
        </p>
        <p>
          IRS 表示，如果你已在美國稅表上正確申報這些逾期 FBAR 所列海外金融帳戶的收入並繳清稅款，而且你在那些年度沒有被聯絡過所得稅查核或要求補交稅表，IRS 不會因未申報這些 FBAR 而處以罰款。請仔細閱讀 IRS 的條件 — 規定得很具體。
        </p>

        <h2>如果有未申報的收入</h2>
        <p>
          如果海外帳戶的利息、股利或其他收入沒有申報，光是補報 FBAR 並不能處理稅的部分。IRS 針對非故意的情況描述了 <strong>streamlined filing compliance procedures</strong>，針對故意行為、可能有刑事責任的情況描述了 <strong>Criminal Investigation Voluntary Disclosure Practice</strong>。兩者之間怎麼選，需要依你的事實判斷 — 請尋求專業協助。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 不要這樣做</div>
          <p>不要只是從今年開始報 FBAR，然後希望以前的年度不會被注意到；也不要在逾期說明中誇大或編造事實。如果 IRS 已經聯絡你，不要自己選擇程序 — 請在專業協助下回覆。</p>
        </div>

        <h2>例子</h2>
        <p>
          Jun 從 2021 年起是美國居民，他的台灣帳戶每年都超過 $10,000，利息每年都有申報在稅表上，但從來沒有報過 FBAR。IRS 也沒有聯絡過他。他的情況符合逾期 FBAR 補交程序，所以 — 在確認條件之後 — 他透過 BSA E-Filing 補報漏掉的 FBAR，並附上逾期原因的說明。如果他連利息也沒有報，就需要和專業人士一起看其他選項。
        </p>

        <h2>申報任何東西之前</h2>
        <ul>
          <li>確認哪些年度真的需要申報 FBAR — 請見<a href="/zh-tw/library/investment/fbar-10000-rule/">海外帳戶超過 $10,000 就要報 FBAR 嗎？</a></li>
          <li>整理對帳單，找出每個帳戶的最高餘額 — 請見<a href="/zh-tw/library/investment/fbar-maximum-account-value/">最高餘額怎麼算</a>。</li>
          <li>檢查每一年的稅表是否都有申報帳戶收入。</li>
          <li>檢查那些年度是否也需要申報 Form 8938。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

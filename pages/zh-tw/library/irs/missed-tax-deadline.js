import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/missed-tax-deadline.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'missed-tax-deadline',
  sourceHash:      '62bb754eeacf',
  id:            '53',
  title:         '錯過報稅截止日，現在該怎麼辦？',
  titleEn:       'I missed the tax deadline — what happens now?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋應申報、但沒有在截止日前申報的聯邦個人所得稅表。逾期 FBAR 與逾期 Form 3520 有各自的規定與指南；州稅表與公司稅表不在本文範圍內',
  persona:       ['錯過 4 月截止日的人', '有一年或多年沒報稅的納稅人', '申請了延期但沒有繳稅的人', '認為某個沒報稅的年度有退稅可拿的人'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '即使繳不出全部稅款，也請盡快補報逾期的稅表，並盡量多繳一些。之後再用 IRS 的付款方式處理剩下的餘額。',
  sources: [
    { label: 'IRS — 補報逾期稅表（Filing past due tax returns）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/filing-past-due-tax-returns' },
    { label: 'IRS — 逾期報稅罰款（Failure to file penalty）', url: 'https://www.irs.gov/payments/failure-to-file-penalty' },
    { label: 'IRS — 逾期繳稅罰款（Failure to pay penalty）', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
    { label: 'IRS — 逾期報稅或繳稅的催收程序（Collection process for taxpayers filing and or paying late）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/collection-process-for-taxpayers-filing-and-or-paying-late' },
    { label: 'IRS — 自動罰款豁免：納稅人須知（Automatic Exemption from Penalty: What taxpayers should know）', url: 'https://www.irs.gov/newsroom/automatic-exemption-from-penalty-what-taxpayers-should-know' },
    { label: 'IRS — 行政性罰款減免（Administrative penalty relief）', url: 'https://www.irs.gov/payments/administrative-penalty-relief' },
  ],
}

const FAQS = [
  {
    q: '我申請了延期，還會被罰款嗎？',
    a: '延期給你的是更多報稅時間，不是更多繳稅時間。如果應繳的稅沒有在原始截止日前繳清，即使你的稅表沒有逾期，仍可能有逾期繳稅罰款與利息。',
  },
  {
    q: '我繳不出欠的稅，應該等一等再報嗎？',
    a: '不應該。請盡快報稅，並盡量多繳一些。逾期報稅罰款通常比逾期繳稅罰款高，報了稅，就能阻止較高的那一項繼續增加。接著請看「繳不出稅款怎麼辦？有哪些選擇？」',
  },
  {
    q: '我覺得某個沒報稅的年度有退稅，現在還來得及嗎？',
    a: '可能還來得及，但有期限。依 IRS 指引，一般有 3 年的時間可以透過補報逾期稅表申請退稅。超過期限，退稅就可能拿不回來。',
  },
  {
    q: '如果我不欠稅，晚報稅會有問題嗎？',
    a: '依百分比計算的逾期報稅罰款是以未繳稅款為基礎，所以沒有餘額時，計算方式不同。但這不代表一定不會有任何後果 — 例如，你應得的退稅如果拖太久可能會過期，而應申報的稅表仍然需要申報。',
  },
  {
    q: '什麼是「自動罰款豁免」（Automatic Exemption from Penalty）？',
    a: 'IRS 在 2026 年開始分階段實施自動罰款豁免（AEP）。它適用於從 2025 稅務年度開始的合格原始稅表（以及合格的 2026 年季度稅表），前提是納稅人符合 IRS 的資格條件，包括準時報稅與繳稅的紀錄。過渡期間，First Time Abate 仍可能適用於某些稅表；原始截止日在 2027 年 1 月 1 日或之後的合格原始稅表，則由 AEP 取代 First Time Abate。AEP 只是罰款減免 — 不會免除你欠的稅，也不是每一項罰款或每位納稅人都符合。',
  },
]

const RELATED = [
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '稅表申報後的分期付款與其他選擇。',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '先確認那一年是否真的需要報稅。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如果 IRS 已經就未申報的稅表寫信給你。',
  },
]

export default function MissedTaxDeadlineZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '錯過報稅截止日怎麼辦？逾期報稅罰款與下一步 | AskLinTax 繁體中文',
      description: '沒有準時申報聯邦稅表？逾期報稅與逾期繳稅罰款怎麼算、為什麼繳不出來也要現在報、過去年度的退稅，以及 IRS 的罰款減免。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你錯過了應申報的聯邦所得稅表截止日 — 不論是今年的，或是去年、更早之前沒有申報的 — <strong>請盡快補報 — 即使你繳不出全部稅款</strong>。罰款與利息一般取決於你欠多少，以及拖了多久沒報、沒繳，所以越早處理，金額越少。如果你其實有退稅可拿，晚報稅一樣有影響，因為申請退稅有期限。
        </p>
        <p>
          本文談的是聯邦所得稅表。逾期 FBAR 或逾期 Form 3520 有各自的規定 — 請見<a href="/zh-tw/library/investment/late-fbar/">忘記報 FBAR 怎麼辦？</a>與<a href="/zh-tw/library/investment/late-form-3520/">Form 3520 忘記報或晚報，現在怎麼辦？</a>
        </p>

        <h2>逾期報稅和逾期繳稅是不同的罰款</h2>
        <ArticleTable
          head={['', '逾期報稅罰款（failure-to-file）', '逾期繳稅罰款（failure-to-pay）']}
          rows={[
            ['什麼時候適用', '稅表沒有在截止日（含延期）前申報', '稅款沒有在截止日前繳清'],
            ['一般費率', '稅表每逾期一個月或不足一個月，按未繳稅款的 5% 計算', '未繳稅款每一個月或不足一個月，按 0.5% 計算'],
            ['一般上限', '25%', '25%'],
          ]}
        />
        <p>
          兩種罰款在同一個月都適用時，IRS 的規定會降低合計的月罰款 — 不是單純把 5% 和 0.5% 相加。另外，未繳稅款也可能產生<strong>利息</strong>，和罰款分開計算。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 延期報稅不等於延期繳稅</div>
          <p>延期改變的是報稅截止日，不是繳稅截止日。沒有在原始截止日前繳清的稅款，仍可能被收取逾期繳稅罰款與利息。</p>
        </div>

        <h2>為什麼繳不出來也要現在報</h2>
        <p>
          逾期報稅罰款每個月通常比逾期繳稅罰款高很多。報了稅，就能阻止較高的罰款繼續增加；接著再用 IRS 的付款方式處理餘額。請見<a href="/zh-tw/library/irs/cant-pay-tax-bill/">繳不出稅款怎麼辦？有哪些選擇？</a>
        </p>

        <h2>如果你不欠稅</h2>
        <p>
          依百分比計算的逾期報稅罰款是以<strong>未繳稅款</strong>為基礎，所以沒有應繳餘額時，計算方式不同。但這不代表一定不會有任何後果。如果你有退稅可拿，依 IRS 指引，一般有 <strong>3 年</strong>的時間可以透過補報逾期稅表申請；超過期限，退稅就可能拿不回來。應該申報的稅表，仍然需要申報。
        </p>

        <h2>如果完全不報</h2>
        <p>
          IRS 最後可能會替你準備一份<strong>替代稅表</strong>（substitute return），並依手上的資料提出稅額核定。替代稅表可能不包含你有權享有的扣除額或抵稅額。即使如此，IRS 表示自行申報稅表仍然對你最有利。
        </p>

        <h2>罰款減免：2026 年的改變</h2>
        <p>
          多年來，第一次被罰款時主要的行政減免是 <strong>First Time Abate</strong>，過去申報紀錄良好的納稅人可以提出申請。IRS 在 2026 年開始分階段實施<strong>自動罰款豁免（Automatic Exemption from Penalty，AEP）</strong>。AEP 適用於從 2025 稅務年度開始的合格原始稅表，以及合格的 2026 年季度稅表；當納稅人符合資格條件（包括過去幾年準時報稅與繳稅的紀錄）時，IRS 會自動套用 — 不需要另外申請。過渡期間，First Time Abate 仍可能適用於某些稅表。原始截止日在 <strong>2027 年 1 月 1 日</strong>或之後的合格原始稅表，則由 AEP 取代 First Time Abate。
        </p>
        <p>
          請注意它的限制：不是每位納稅人、每份稅表或每一項罰款都符合；AEP 減免的是某些罰款，不是稅款本身；未繳稅款的利息仍可能產生。它如何適用於你的稅表，請查看 IRS 的 AEP 與行政性罰款減免網頁。
        </p>
        <p>
          另外，IRS 的罰款網頁也說明，如果你能證明逾期報稅或繳稅有<strong>合理原因</strong>（reasonable cause），可以申請減免。
        </p>

        <h2>例子</h2>
        <p>
          Sam 沒有在截止日前報稅，欠了 $3,000。他每多拖一個月，逾期報稅罰款就以未繳稅款為基礎繼續增加，同時還有逾期繳稅罰款與利息。他盡快補報，隨稅表先繳 $1,000，剩下的部分安排付款方式 — 這樣逾期報稅罰款就不會再增加，剩餘的餘額則逐步繳清。
        </p>

        <h2>補報之前</h2>
        <ul>
          <li>確認那一年是否真的需要報稅 — 請見<a href="/zh-tw/library/individual/do-i-need-to-file/">我需要申報美國聯邦稅表嗎？</a></li>
          <li>準備那一年的 W-2、1099 與其他紀錄。如果找不到，IRS 可以提供薪資與收入資料。</li>
          <li>使用你要補報那一年的稅表與填寫說明，而不是今年的版本。</li>
          <li>如果你已經收到 IRS 關於未報稅的來信，請回覆 — 請見<a href="/zh-tw/library/irs/irs-notice/">我收到 IRS 的信，該怎麼辦？</a></li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

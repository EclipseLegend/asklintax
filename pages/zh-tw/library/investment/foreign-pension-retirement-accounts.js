import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-pension-retirement-accounts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-pension-retirement-accounts',
  sourceHash:      '4ea36f19bc4e',
  id:            '94',
  title:         '海外退休金與退休帳戶：美國納稅人要申報什麼',
  titleEn:       'Foreign Pensions and Retirement Accounts: What U.S. Taxpayers Must Report',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Advanced',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 8938 填寫說明、Form 3520 填寫說明（2025 年 12 月修訂版）、Rev. Proc. 2020-17、IRS FBAR 網頁，以及 Internal Revenue Manual 4.26.16，說明 2025 與 2026 稅務年度海外退休金與退休安排權益的美國資訊申報。本次檢視無法取得 FinCEN 的法規。本文不判定任何特定台灣計畫是否為金融帳戶、外國信託或稅務優惠外國退休信託，也不判定提撥、收益或分配的美國所得稅處理',
  persona:       ['有台灣雇主退休金或勞工退休金帳戶的美國居民', '帶著海外退休儲蓄搬來美國的人', '在海外工作並加入外國計畫的美國公民', '不確定海外退休金要不要申報 FBAR 或 Form 8938 的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '收集每一個海外退休金或退休安排的計畫文件與對帳單。分別確認 Form 8938、FBAR，以及 Form 3520 與 3520-A，每一項都有各自的規定，並請專業人士協助判斷計畫的分類與課稅方式。',
  sources: [
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Internal Revenue Manual 4.26.16，海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'IRS — Form 3520 填寫說明（2025 年 12 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i3520.pdf' },
    { label: 'IRS — Rev. Proc. 2020-17（稅務優惠外國信託）', url: 'https://www.irs.gov/pub/irs-drop/rp-20-17.pdf' },
    { label: 'IRS — Form 8938 與 FBAR 要求比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — 美國所得稅協定 A 到 Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: '我的台灣退休金要申報在 Form 8938 上嗎？',
    a: '如果你必須申報 Form 8938，填寫說明要求申報你在外國退休金計畫或外國遞延報酬計畫中的權益（不是計畫本身持有的資產）。填寫說明也指出，外國的社會安全、社會保險或類似的政府計畫不需要申報。某一項台灣安排屬於哪一類，取決於該計畫。',
  },
  {
    q: '我的台灣退休金要申報在 FBAR 上嗎？',
    a: '要看安排的性質。FBAR 的退休計畫例外適用於 IRA 與美國稅務合格計畫；Internal Revenue Manual 指出，外國計畫如果屬於海外金融帳戶，通常需要申報。某一個台灣計畫是不是你有金融權益的海外金融帳戶，要依計畫個別判斷。',
  },
  {
    q: 'Rev. Proc. 2020-17 代表我的海外退休金永遠不需要 Form 3520 嗎？',
    a: '不是。它只豁免符合資格的個人，而且只限依該計畫所在國法律符合所有條件的稅務優惠外國退休信託。不要以為台灣計畫一定符合。它也不會改變 FBAR 或 Form 8938 的要求。',
  },
  {
    q: '我的海外退休金在領取前就要繳美國稅嗎？',
    a: '有可能。身為美國居民，你要就全球所得課稅，美國對提撥、收益與分配的處理可能和另一個國家不同。我們沒有找到專門針對台灣計畫的 IRS 指引，而且台灣不在 IRS 所得稅協定清單上，所以請尋求專業建議。',
  },
  {
    q: '如果我之前沒有申報海外退休金怎麼辦？',
    a: '漏報 Form 8938、FBAR 或 Form 3520 都可能被罰款。Rev. Proc. 2020-17 也說明符合資格的個人如何就已繳納的某些 Form 3520 罰款申請救濟。補報前請先尋求專業協助。請參考「忘記報 FBAR 怎麼辦？」',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '兩種申報的門檻與截止日。',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '誰必須申報 FinCEN Form 114。',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '這份表格也用於外國信託。',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: '住在台灣或海外：美國報稅清單',
    desc:  '與海外有連結的人的其他申報步驟。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat: 'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc: '美國 IRA 與 401(k) 提領怎麼課稅。',
  },
]

export default function ForeignPensionRetirementAccountsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外退休金與退休帳戶：美國納稅人要申報什麼 | AskLinTax 繁體中文',
      description: '海外退休金與美國申報：Form 8938、FBAR、Form 3520 與 3520-A、Rev. Proc. 2020-17、外國社會安全計畫、台灣勞工退休金的問題，以及尚未解決的所得稅問題。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          在台灣或其他國家的退休金或退休帳戶，可能引發<strong>三個不同的美國申報問題</strong>：Form 8938、FBAR，以及 Form 3520 與 3520-A；另外還有一個<strong>美國所得稅</strong>問題。每一項都有各自的規定，答案也可能因計畫而不同。本文說明美國規定確認了什麼、哪些問題要看個別計畫，以及台灣計畫的處理有哪些仍未解決。
        </p>

        <h2>已確認的規定、要看計畫的問題與尚未解決的問題</h2>
        <ArticleTable
          head={['問題', '官方來源確認的內容', '要看計畫或尚未解決的部分']}
          rows={[
            ['Form 8938', '申報你在外國退休金或遞延報酬計畫中的權益；外國社會安全與類似政府計畫不需申報', '某一項台灣計畫是退休金計畫，還是社會安全類計畫'],
            ['FBAR', '退休計畫例外只涵蓋 IRA 與美國稅務合格計畫；外國計畫通常需要申報（IRM 4.26.16.3.3）', '某一個計畫是否為你有金融權益的海外金融帳戶'],
            ['Form 3520 與 3520-A', '外國退休安排可能是外國信託；Rev. Proc. 2020-17 豁免某些稅務優惠外國退休信託', '該計畫是否為外國信託，以及是否符合 Rev. Proc. 2020-17 的每一項條件'],
            ['美國所得稅', '美國公民與居民要申報全球所得', '台灣計畫的提撥、收益與分配如何課稅，沒有找到專門針對台灣計畫的 IRS 指引'],
          ]}
        />

        <h2>Form 8938</h2>
        <ul>
          <li><strong>申報什麼：</strong>如果你必須申報 Form 8938，要在 Part VI 申報你在外國退休金計畫或外國遞延報酬計畫中的<strong>權益</strong>。不要另外申報計畫持有的資產。</li>
          <li><strong>價值：</strong>一般是你的受益權益在年底的公平市價。如果你不知道、也無法輕易查到，填寫說明使用當年分配給你的現金與財產價值。</li>
          <li><strong>不需申報：</strong>美國社會安全、社會保險給付，或外國政府的類似計畫。填寫說明補充，這不包括外國退休金計畫的權益。</li>
          <li><strong>罰款：</strong>未申報必須申報的 Form 8938，罰款 $10,000；與未揭露資產有關的少繳稅額，罰款 40%。填寫說明的例子包括漏報外國退休金的分配。</li>
          <li><strong>門檻：</strong>請參考 <a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
        </ul>

        <h2>FBAR</h2>
        <p>
          IRS 的 FBAR 網頁列出一項例外：在 IRA 中持有，或在你是參與者或受益人的退休計畫中持有的帳戶。Internal Revenue Manual（IRM 4.26.16.3.3）說明，這項例外適用於<strong>美國</strong>稅務合格退休計畫與 IRA 的參與者，並提醒：「這項例外只適用於美國計畫。外國計畫，例如加拿大的 Registered Retirement Savings Plan（RRSP）與墨西哥退休基金管理機構（AFORES）管理的帳戶，通常需要在 FBAR 上申報。」
        </p>
        <p>
          這並沒有回答某一項台灣安排是否必須申報。FBAR 適用於你有金融權益或簽名權的海外<strong>金融帳戶</strong>。IRM（4.26.16.2.2）把需要申報的金融帳戶描述為銀行帳戶、證券帳戶，以及「其他金融帳戶」，例如有現金價值的保險或年金保單，或向大眾公開的集合基金。它列出不需申報的帳戶，指的是美國聯邦、州、原住民部落與屬地政府及其機構的帳戶，所以不要因為某項安排由外國政府管理，就認定它因此被排除。某一個計畫是不是金融帳戶、你在其中是否有金融權益，取決於它的結構與持有方式。本文無法取得 FinCEN 的法規，所以請查看 FinCEN 的指引，或就你的計畫尋求專業建議。
        </p>

        <h2>Form 3520 與 3520-A，以及 Rev. Proc. 2020-17</h2>
        <p>
          有些外國退休安排在美國稅法上屬於外國信託，可能需要申報 Form 3520 與 Form 3520-A。Rev. Proc. 2020-17 豁免<strong>符合資格的個人</strong>（一般是遵守美國申報與該計畫所得申報義務的美國公民與居民），對於依其所在國法律符合下列所有條件的<strong>稅務優惠外國退休信託</strong>，不必申報這些表格：
        </p>
        <ul>
          <li>一般免繳所得稅，或有其他稅務優惠；</li>
          <li>有向該國稅務機關提供或可取得的年度資訊申報；</li>
          <li>只允許來自提供個人勞務所得的提撥；</li>
          <li>提撥受到限制：以勞動所得的一定比例為限、每年 $50,000 以下，或終身 $1,000,000 以下；</li>
          <li>提領以達到退休年齡、身心障礙或死亡為條件，或提前提領要受罰；而且</li>
          <li>雇主維持的計畫要符合不歧視規定。</li>
        </ul>
        <p>
          Form 3520 填寫說明（2025 年 12 月修訂版）另外說明了某些加拿大計畫的例外，並允許某些稅務優惠外國信託依賴擬議法規。Rev. Proc. 2020-17 不會改變 FBAR 或 Form 8938 的義務。不要以為台灣計畫一定符合這些條件。
        </p>

        <h2>外國社會安全與雇主計畫</h2>
        <ul>
          <li><strong>政府社會保險計畫：</strong>如上所述，不需要申報在 Form 8938 上。它的給付也不是海外工作所得排除額所說的海外工作所得。</li>
          <li><strong>雇主提供的外國計畫：</strong>如果你必須申報 Form 8938，一般要以外國退休金計畫權益申報；FBAR 與 Form 3520 的處理則要看計畫。</li>
        </ul>

        <h2>台灣的例子：需要回答的問題</h2>
        <p>
          讀者常問到下列台灣安排。本文不為它們分類；以下是每一項都需要依計畫文件並與專業人士一起釐清的問題。
        </p>
        <ArticleTable
          head={['安排', '需要回答的問題']}
          rows={[
            ['勞工退休金條例的個人專戶（勞工退休金個人專戶）', '它在 Form 8938 上是退休金計畫權益嗎？在 FBAR 上是海外金融帳戶嗎？它是外國信託嗎？是否符合 Rev. Proc. 2020-17？'],
            ['勞保老年給付', '它是外國政府的社會保險計畫（不需申報 Form 8938），還是其他類型？'],
            ['雇主提供或私人的退休計畫', '計畫的結構如何？資產由誰持有？是否符合 Rev. Proc. 2020-17？'],
          ]}
        />

        <h2>美國所得稅問題</h2>
        <p>
          身為美國公民或居民，你要申報全球所得。美國對外國計畫的提撥、投資成長或分配，課稅方式可能和另一個國家不同。台灣不在 IRS 的美國所得稅協定清單上，我們也沒有找到專門針對台灣計畫的 IRS 指引。分配時繳納的外國所得稅，可能可以申請<a href="/zh-tw/library/individual/foreign-tax-credit/">外國稅額抵免</a>。因為答案取決於計畫，報稅前請尋求專業建議。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為 FBAR 的 IRA 例外涵蓋外國計畫。</strong></li>
          <li><strong>以為每個外國計畫都符合</strong> Rev. Proc. 2020-17。</li>
          <li><strong>必須申報 Form 8938 時漏報外國退休金。</strong></li>
          <li><strong>把申報和課稅當成同一個問題。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 本文的限制</div>
          <p>本次檢視無法取得 FinCEN 的法規，也沒有找到專門針對台灣退休金計畫的 IRS 指引。本文不為任何特定計畫分類，也不判定其所得稅處理。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

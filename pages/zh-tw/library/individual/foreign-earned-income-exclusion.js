import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/foreign-earned-income-exclusion.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-earned-income-exclusion',
  sourceHash:      'bd66589515b4',
  id:            '92',
  title:         '海外工作所得排除額（Form 2555）：2025 與 2026 年規定',
  titleEn:       'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 2555 及其 2025 年填寫說明、2026 年 Form 2555 與填寫說明草案、Publication 54（2025 年 12 月修訂版）、Rev. Proc. 2024-40、Rev. Proc. 2025-32、Notice 2025-16、Notice 2026-25，以及 2025 年 Form 1040 填寫說明，說明 2025 與 2026 稅務年度的海外工作所得排除額，以及海外住房排除額與扣除額。本文不涵蓋美國政府員工、戰區、自僱稅規劃，也不涵蓋州稅',
  persona:       ['在台灣或其他海外地區工作的美國公民', '外派海外的綠卡持有人', '計畫搬到海外的人', '在排除額與外國稅額抵免之間做選擇的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '確認你的稅務住所在海外，並符合真實居住測試或 330 天實際停留測試。如果符合，你可以在 Form 2555 上選擇排除海外工作所得，2025 年最高 $130,000、2026 年最高 $132,900，另加住房金額，而且你仍然必須申報美國稅表。',
  sources: [
    { label: 'IRS — 2025 年 Form 2555 填寫說明，海外工作所得', url: 'https://www.irs.gov/pub/irs-pdf/i2555.pdf' },
    { label: 'IRS — Form 2555（2025）', url: 'https://www.irs.gov/pub/irs-pdf/f2555.pdf' },
    { label: 'IRS — 2026 年 Form 2555 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i2555--dft.pdf' },
    { label: 'IRS — Publication 54，美國公民與居民外國人在海外的稅務指南', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Notice 2025-16（2025 年各地住房費用上限）', url: 'https://www.irs.gov/pub/irs-drop/n-25-16.pdf' },
    { label: 'IRS — Notice 2026-25（2026 年各地住房費用上限）', url: 'https://www.irs.gov/pub/irs-drop/n-26-25.pdf' },
    { label: 'IRS — 海外工作所得排除額（Foreign earned income exclusion）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion' },
  ],
}

const FAQS = [
  {
    q: '我可以排除台灣的利息、股利或資本利得嗎？',
    a: '不可以。排除額只適用於海外工作所得，也就是你在海外提供個人勞務的報酬。Form 2555 填寫說明指出，海外工作所得不包括利息、一般股利、資本利得、退休金、年金或社會安全福利。',
  },
  {
    q: '如果我的所得全部被排除，還需要報稅嗎？',
    a: '有可能。Publication 54 說，判斷你是否必須報稅時，總所得包括你可以排除的海外工作所得或海外住房金額。而且你必須申報稅表才能申請排除額。',
  },
  {
    q: '排除額是多少？',
    a: '2025 年最高為 $130,000（Rev. Proc. 2024-40），2026 年最高為 $132,900（Rev. Proc. 2025-32）。如果你只有部分年度符合資格，金額會減少。',
  },
  {
    q: '我可以同時使用排除額與外國稅額抵免嗎？',
    a: '可以，但用在不同的所得上。你不能對已排除所得的外國稅申請抵免或扣除，但一般可以對未排除所得（例如超過排除額的工資或投資所得）的外國稅申請抵免。',
  },
  {
    q: '我剛搬到海外，還沒符合測試，該怎麼辦？',
    a: 'Form 2555 填寫說明提供兩種做法：用 Form 2350 申請延長到你預期符合資格之後，或者先按時申報、不申請排除額，等符合資格後再修正稅表。',
  },
  {
    q: '我可以停止使用排除額嗎？',
    a: '可以，方法是在稅表上附一份聲明撤銷。但如果撤銷，接下來 5 個稅務年度內，未經 IRS 核准不能再申請排除額。',
  },
]

const RELATED = [
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: '外國稅額抵免（Form 1116）：避免台灣與其他海外所得被雙重課稅',
    desc:  '排除額的替代方案或搭配方式。',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: '住在台灣或海外：美國報稅清單',
    desc:  '住在海外的人的截止日、FBAR 與其他申報步驟。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '以美元申報海外所得。',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '誰在稅務上算是美國居民。',
  },
]

export default function ForeignEarnedIncomeExclusionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外工作所得排除額（Form 2555）：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: '海外工作所得排除額：2025 年 $130,000、2026 年 $132,900，稅務住所、真實居住與 330 天測試、住房排除額與台北上限、截止日，以及與外國稅額抵免的關係。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你是美國公民或居民外國人，<strong>稅務住所在外國</strong>，並且符合<strong>真實居住測試</strong>或<strong>實際停留測試</strong>，你可以在 <strong>Form 2555</strong> 上選擇排除<strong>海外工作所得</strong>，<strong>2025 年最高 $130,000</strong>、<strong>2026 年最高 $132,900</strong>。你也可能可以排除或扣除部分海外住房費用。排除額不是自動適用的：你要在美國稅表上申請。
        </p>

        <h2>誰符合資格</h2>
        <ul>
          <li><strong>稅務住所在海外：</strong>你的稅務住所必須在外國。如果你的住處（abode），也就是你維持家庭、經濟與個人連結的地方，在美國，你就不符合這項測試。</li>
          <li><strong>真實居住測試：</strong>你在一段包含整個稅務年度、沒有中斷的期間內，是某個外國的真實居民。Publication 54 說，美國公民可以使用這項測試，但美國居民外國人只有在具有與美國有生效中所得稅協定國家的公民或國民身分時，才能使用。</li>
          <li><strong>實際停留測試：</strong>美國公民或居民外國人在任何連續 12 個月期間內，在外國停留至少 <strong>330 個整天</strong>。Publication 54 說，這項測試適用於所有居民外國人。</li>
        </ul>
        <p>
          <strong>在台灣出生或來自台灣的綠卡持有人：</strong>綠卡持有人在稅務上是美國居民外國人。就真實居住測試而言，重要的是這個人的<strong>公民或國民身分</strong>，而不是出生地、居住地或美國稅務居民身分。台灣沒有出現在 IRS 的美國所得稅協定清單上，所以只具有台灣公民或國民身分的居民外國人，看起來不符合協定國家的條件，一般需要使用實際停留測試。同時具有某個協定國家公民或國民身分的居民外國人，應就該國確認這項條件。
        </p>

        <h2>什麼算海外工作所得</h2>
        <p>
          海外工作所得是你在符合測試期間、在外國提供個人勞務所得的報酬，例如工資、薪水、專業服務費，以及某些津貼與非現金報酬。它<strong>不</strong>包括：
        </p>
        <ul>
          <li>利息、一般股利、資本利得或贍養費；</li>
          <li>退休金、年金或社會安全福利；</li>
          <li>以美國政府員工身分領取的報酬；</li>
          <li>在提供勞務那年的下一個稅務年度結束後才收到的金額。</li>
        </ul>

        <h2>2025 與 2026 年的金額</h2>
        <ArticleTable
          head={['', '2025 年', '2026 年']}
          rows={[
            ['海外工作所得排除額上限', '$130,000', '$132,900'],
            ['住房基本金額（上限的 16%，全年）', '$20,800', '$21,264'],
            ['住房費用一般上限（上限的 30%，全年）', '$39,000', '$39,870'],
            ['台灣台北的住房費用上限（全年）', '$46,188', '$46,188'],
          ]}
        />
        <p>
          資料來源：Rev. Proc. 2024-40 與 Rev. Proc. 2025-32（排除額），Notice 2025-16 與 Notice 2026-25（住房金額與各地上限）。2026 年 Form 2555 及其填寫說明仍是草案。如果你的符合資格期間只涵蓋部分年度，所有金額都會減少。
        </p>

        <h2>海外住房排除額或扣除額</h2>
        <ul>
          <li><strong>住房費用金額：</strong>你的合格住房費用（以一般上限或你所在地較高的上限為限），減去住房基本金額。</li>
          <li><strong>各地上限：</strong>IRS 每年公布特定高成本城市的較高上限。台北在 Notice 2025-16 與 Notice 2026-25 中的全年上限都是 $46,188。如果你的城市沒有列出，就適用一般上限。</li>
          <li><strong>排除或扣除：</strong>住房費用金額中可歸屬於雇主提供金額（例如你的工資）的部分可以排除；如果你是自僱者，則改為住房扣除額。Publication 54 說，這項扣除額不能超過你的海外工作所得減去你的排除額，超過的部分可以結轉 1 年。</li>
        </ul>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Maya</strong> 是美國公民，2025 年全年在台北工作，稅務住所在那裡，全年符合實際停留測試。她的雇主付給她 $140,000。她的合格住房費用是 $40,000。
        </p>
        <ArticleTable
          head={['Form 2555 欄位', '金額']}
          rows={[
            ['27：海外工作所得', '$140,000'],
            ['28 與 30：住房費用（低於台北上限 $46,188）', '$40,000'],
            ['32：住房基本金額（全年）', '$20,800'],
            ['33：住房費用金額（$40,000 − $20,800）', '$19,200'],
            ['35：雇主提供的比例（$140,000 ÷ $140,000）', '1.000'],
            ['36：住房排除額', '$19,200'],
            ['40：全年的排除額上限', '$130,000'],
            ['41：第 27 行減第 36 行（$140,000 − $19,200）', '$120,800'],
            ['42：海外工作所得排除額（第 40 行與第 41 行中較小者）', '$120,800'],
            ['43：排除總額（$19,200 + $120,800）', '$140,000'],
          ]}
        />
        <p>
          Maya 的工資全部被排除。她賺的利息或股利仍然要課稅；而且申請排除額時，Form 1040 填寫說明會使用 Foreign Earned Income Tax Worksheet，在計算其他所得的稅額時，把被排除的所得當作仍包括在內，所以其他所得可能適用較高的稅率。
        </p>

        <h2>截止日與延期</h2>
        <ul>
          <li><strong>自動延期 2 個月：</strong>如果 4 月 15 日當天你住在美國與波多黎各以外，而且稅務住所也在這些地方以外，你可以在 <strong>6 月 15 日</strong>前申報並繳稅。請附一份說明你符合資格的聲明。4 月 15 日前沒有繳的稅仍會計利息。</li>
          <li><strong>更多時間：</strong>Publication 54 說明，你可以在 6 月 15 日前用 Form 4868 再申請 4 個月，延到 <strong>10 月 15 日</strong>。這是延長申報期限，不是延長繳稅期限。</li>
          <li><strong>等待符合資格：</strong>用 Form 2350 申請延長到你符合居住測試之後，或先申報不申請排除額，之後再修正。</li>
        </ul>

        <h2>與其他稅務優惠的關係</h2>
        <ul>
          <li><strong>外國稅額抵免：</strong>已排除所得的外國稅不能抵免或扣除。你一般可以對沒有排除的所得的外國稅申請抵免。請參考<a href="/zh-tw/library/individual/foreign-tax-credit/">外國稅額抵免指南</a>。</li>
          <li><strong>與子女相關的抵稅額：</strong>Form 2555 填寫說明指出，如果你申請任一排除額或住房扣除額，就不能申請額外兒童抵稅額（additional child tax credit）。請參考<a href="/zh-tw/library/individual/child-tax-credit/">兒童抵稅額指南</a>。</li>
          <li><strong>勞動所得抵免（EIC）：</strong>如果你申請任一排除額或住房扣除額，就不能使用。</li>
        </ul>

        <h2>選擇與撤銷</h2>
        <p>
          你一般要在按時申報的稅表（包括延期）上，或在修正按時申報稅表的稅表上，做第一次選擇；Publication 54 說明了例外情況。這項選擇會持續適用到之後的年度，直到你撤銷。如果撤銷，接下來 5 個稅務年度內，未經 IRS 核准不能再申請排除額。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>排除投資所得</strong>，例如台灣的利息或股利。</li>
          <li><strong>以為排除額是自動適用</strong>，因而沒有報稅。</li>
          <li><strong>算錯 330 天</strong>：必須是在外國的整天。</li>
          <li><strong>對已排除的工資申請外國稅額抵免。</strong></li>
          <li><strong>隨意撤銷</strong>，沒有考慮 5 年規定。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請查看正式的 2026 年表格</div>
          <p>2026 年 Form 2555 與填寫說明是草案，報稅前請查看正式版本。本文不涵蓋自僱稅、美國政府員工、戰區與州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/foreign-rental-property.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-rental-property',
  sourceHash:      '5474860e46dd',
  id:            '26',
  title:         '海外出租房產與美國稅務',
  titleEn:       'Foreign rental property and U.S. taxes',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民或居民外國人直接持有並出租的海外住宅房產。透過外國公司持有的房產、海外房屋稅的處理方式，以及被動損失限制（Passive-Loss Limits），需要專業檢視',
  persona:       ['出租台灣或中國公寓的屋主', '保留海外出租房產的新移民', '繼承海外出租房屋的人', '綠卡持有人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '把租金換算成美元，連同房產的海外地址，在你 2025 年稅表的 Schedule E 上申報。扣除一般出租費用；如果房產是 2017 年以後開始出租使用，建築物（不含土地）要依 30 年的 ADS 折舊表折舊；並考慮就租金所繳的台灣所得稅申請外國稅額抵免。',
  sources: [
    { label: 'IRS Publication 527 — 住宅出租房產（Residential Rental Property）', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS Publication 946 — 財產折舊方法（How To Depreciate Property：ADS）', url: 'https://www.irs.gov/publications/p946' },
    { label: 'IRS — Schedule E（Form 1040）填寫說明', url: 'https://www.irs.gov/instructions/i1040se' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — 年平均匯率（Yearly average currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: '我台灣的房客把租金匯進我的台灣銀行帳戶，還需要申報嗎？',
    a: '需要。美國公民與居民外國人要就全球所得繳稅，所以海外房產的租金不論在哪裡支付，都要在美國稅表上申報。收租的帳戶也可能計入你的 FBAR 與 Form 8938 門檻。',
  },
  {
    q: '海外租金收入要用哪一份表格？',
    a: 'Schedule E（Form 1040），與美國出租房產使用的是同一份附表。Schedule E 填寫說明指出，位於外國的房產，地址要填城市、省或州、國家與郵遞區號。',
  },
  {
    q: '海外出租房產可以多快折舊完？',
    a: '主要在美國境外使用的房產，必須使用替代折舊制度（Alternative Depreciation System, ADS），也就是直線法。2017 年以後開始使用的住宅出租房產，ADS 的回收期間是 30 年（2018 年以前開始使用的為 40 年）。土地永遠不能折舊。',
  },
  {
    q: '12 個月的租金要用哪個匯率？',
    a: 'IRS 的一般規則是每一筆收款或付款都用當時的匯率。IRS 也公布年平均匯率（2025 年為每 1 美元兌 31.167 新台幣），而且只要你一致地使用，IRS 通常接受任何公開的匯率。',
  },
  {
    q: '我在台灣就租金繳了所得稅，會被重複課稅嗎？',
    a: '對於同時被美國課稅的所得，你可能可以就繳納的符合資格外國所得稅，用 Form 1116 申請外國稅額抵免（或列為分項扣除額）。抵免通常比扣除更有幫助。',
  },
  {
    q: '出租房產在台灣繳的房屋稅可以扣除嗎？',
    a: '稅款是 Publication 527 列出的常見出租費用之一，但外國不動產稅的處理方式有特定規則。扣除之前請先向稅務專業人士確認。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '擁有、繼承與出售海外房產 — 以及哪些不用在 FBAR 或 Form 8938 上申報。',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    desc:  '出租費用與 Schedule E 的基本規則，也適用於海外房產。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '如果租金匯入海外帳戶，請確認你的 FBAR 與 Form 8938 義務。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '海外租金是美國居民全球所得的一部分。',
  },
]

export default function ForeignRentalPropertyZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '出租台灣或海外房產：美國稅務指南 | AskLinTax 繁體中文',
      description: '美國居民如何申報海外租金收入：Schedule E、可扣除的費用、30 年 ADS 折舊、新台幣換算，以及 2025 年的外國稅額抵免。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>對美國居民來說，海外租金是美國的應稅收入</h2>
        <p>
          如果你是美國公民或美國稅務居民，在台灣、中國或任何其他地方出租公寓，租金就是你<strong>全球所得</strong>的一部分。即使租金以新台幣支付、存在台灣的銀行，而且在台灣也已經課稅，你仍然要在美國稅表上申報。
        </p>
        <p>
          好消息是：適用於美國房產的出租規則，一般也適用於這裡。你申報租金、扣除費用、為建築物折舊 — 只是有一些國際上的差異。
        </p>

        <ArticleTable
          head={['項目', '美國出租房產', '海外出租房產']}
          rows={[
            ['表格', 'Schedule E', 'Schedule E（填寫海外地址）'],
            ['幣別', '美元', '每一筆金額都要換算成美元'],
            ['住宅建築物折舊', '多數情況為 27.5 年（GDS）', '必須使用 ADS：2017 年以後開始使用的為 30 年'],
            ['在其他國家繳的稅', '不適用', '可能可以申請外國稅額抵免（Form 1116）'],
            ['收租的銀行帳戶', '美國帳戶', '海外帳戶可能需要申報 FBAR／Form 8938'],
          ]}
        />

        <h2>步驟 1：申報所有租金</h2>
        <p>
          多數情況下，你必須把收到的所有租金都計入收入。如果房客幫你支付了一筆費用（例如修繕帳單），這筆付款也是租金收入 — 如果它屬於可扣除的出租費用，你也可以扣除。在 <strong>Schedule E</strong> 上申報這筆房產；位於外國的房產，地址要填城市、省或州、國家與郵遞區號。
        </p>

        <h2>步驟 2：扣除一般出租費用</h2>
        <p>
          Publication 527 列出最常見的出租費用，包括廣告、清潔與維護、佣金、折舊、保險、法律與其他專業費用、管理費、付給銀行的房貸利息、修繕、稅款與水電費。海外物業管理人與仲介的費用，也屬於同樣的類別。保留收據 — 任何幣別都可以 — 並換算成美元。
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 在海外繳的房屋稅</div>
          <p>稅款是列出的出租費用之一，但外國不動產稅有自己的規則，而且自住房屋的外國不動產稅不能列為分項扣除額。出租房產的台灣房屋稅要怎麼處理，請向稅務專業人士確認。</p>
        </div>

        <h2>步驟 3：建築物折舊 — 依 ADS 折舊表</h2>
        <p>
          土地不能折舊，所以首先要把成本分成土地與建築物兩部分。接著，因為房產主要在<strong>美國境外</strong>使用，IRS Publication 946 要求使用<strong>替代折舊制度（ADS）</strong>— 以直線法、在比美國出租房產更長的期間內折舊：
        </p>
        <ArticleTable
          head={['住宅出租房產開始使用的時間', 'ADS 回收期間']}
          rows={[
            ['2017 年以後', '30 年'],
            ['2018 年 1 月 1 日以前', '40 年'],
          ]}
        />
        <p>
          你的折舊基礎（Depreciable Basis）一般是你購買建築物時以美元計算的成本。如果你在出租前自己住過，折舊基礎是你改為出租當天的調整後基礎與公平市價兩者中較低者 — 這項計算請尋求協助。
        </p>

        <h2>步驟 4：換算成美元</h2>
        <p>
          稅表上的每一筆金額都必須以美元表示。IRS 的一般規則是每一筆收款或付款都用當時的匯率。IRS 也公布年平均匯率 — 2025 年列出的是<strong>每 1 美元兌 31.167 新台幣</strong> — 而且只要你一致地使用，IRS 通常接受任何公開的匯率。
        </p>
        <h3>實際例子</h3>
        <p>美國居民 Grace 在 2025 年以每月 NT$30,000 出租她在台中的公寓：</p>
        <ArticleTable
          head={['項目', '新台幣', '美元（÷ 31.167）']}
          rows={[
            ['租金（12 個月）', 'NT$360,000', '≈ $11,551'],
            ['管理費', 'NT$36,000', '≈ $1,155'],
            ['修繕', 'NT$20,000', '≈ $642'],
          ]}
        />
        <p>
          她在 Schedule E 上申報約 $11,551 的租金，扣除費用與 ADS 折舊，然後看看她就租金繳納的台灣所得稅是否適用外國稅額抵免。
        </p>

        <h2>步驟 5：用外國稅額抵免避免重複課稅</h2>
        <p>
          如果你就租金收入繳納了符合資格的外國<strong>所得</strong>稅，一般可以選擇<strong>外國稅額抵免</strong>（Foreign Tax Credit，Form 1116）來減少美國稅額，或列為分項扣除額來減少應稅所得。多數情況下，抵免比較划算。只有所得稅類的稅款才符合抵免資格。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>如果房產是透過外國公司持有、你有出租虧損、你把以前的自住房屋改為出租、房產與海外親人共同持有，或你正要出售，請尋求協助。這些情況涉及本指南只簡單提到的規則。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

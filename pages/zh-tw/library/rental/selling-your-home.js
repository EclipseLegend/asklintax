import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/selling-your-home.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'selling-your-home',
  sourceHash:      'eeff20b8efc2',
  id:            '54',
  title:         '我賣了房子，獲利要繳稅嗎？',
  titleEn:       'I sold my house — do I have to pay tax on the profit?',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人出售美國自住主要住宅（main home / principal residence）。曾經出租或作營業用的房子、部分排除，以及非合格使用期間，需要個別檢視；海外房產另有指南',
  persona:       ['剛賣房或準備賣房的屋主', '出售自住房子的夫妻', '過戶時收到 Form 1099-S 的人', '曾經把部分房子出租的賣方'],
  relatedJourney: ['賣房子', '房產帶來的副業收入'],
  actionRequired: '先算出你的獲利（出售所得減去調整後成本），再確認是否符合主要住宅排除額的持有與居住測試。保留過戶文件與裝修紀錄；如果收到 Form 1099-S，或有任何獲利需要課稅，就要申報這筆出售。',
  sources: [
    { label: 'IRS — Publication 523，出售你的住宅（Selling Your Home）', url: 'https://www.irs.gov/publications/p523' },
    { label: 'IRS — Topic no. 701，出售你的住宅（Sale of your home）', url: 'https://www.irs.gov/taxtopics/tc701' },
    { label: 'IRS — 出售住宅：不動產稅務提示（Sale of residence: Real estate tax tips）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/sale-of-residence-real-estate-tax-tips' },
  ],
}

const FAQS = [
  {
    q: '我的房子賣了 $700,000，全部都要繳稅嗎？',
    a: '不是。課稅的是獲利，不是售價。獲利一般是你從出售得到的金額，減去調整後成本（購買價格加上某些費用與裝修）。如果你符合資格，主要住宅排除額可以排除最多 $250,000 的獲利，許多夫妻合併申報的情況最多可排除 $500,000。',
  },
  {
    q: '我只住了一年半，排除額就完全沒有了嗎？',
    a: '不一定。要享有全額排除，一般需要在出售前 5 年內持有至少 2 年、並作為主要住宅居住至少 2 年。在某些符合條件的情況下，可能可以享有部分排除 — 請查看 Publication 523，或請人檢視。',
  },
  {
    q: '我賣房虧錢，可以扣除嗎？',
    a: '一般不行。出售個人主要住宅的虧損不能扣除。',
  },
  {
    q: '我收到 Form 1099-S，但獲利全部可以排除，還要申報什麼嗎？',
    a: '可能要。如果你收到 Form 1099-S，即使獲利可以全部排除，仍可能需要在稅表上申報這筆出售。Publication 523 說明了什麼時候要報、怎麼報。',
  },
  {
    q: '我賣房前出租了幾年，會有影響嗎？',
    a: '可能會大幅改變計算結果。1997 年 5 月 6 日之後因出租或營業使用而允許或可提列（allowed or allowable）的折舊，一般不能用主要住宅排除額來排除；出租期間也可能影響可排除的獲利。這種出售請找人檢視。',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: '出租房子或公寓，租金收入怎麼課稅？',
    desc:  '如果賣房前曾經出租，折舊就很重要。',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: '海外賣房後把錢匯到美國，要申報什麼？',
    desc:  '出售海外的房子或公寓，另有指南。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '排除額、扣除額與抵稅額為什麼不一樣。',
  },
]

export default function SellingYourHomeZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '賣房子的獲利要繳稅嗎？主要住宅排除額說明 | AskLinTax 繁體中文',
      description: '賣了自住的房子？獲利怎麼算、$250,000 / $500,000 主要住宅排除額與「5 年內 2 年」的測試、Form 1099-S、虧損，以及曾經出租時答案為什麼會不同。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          很多時候不用繳 — 或至少不是全部都要繳。賣房課稅看的是<strong>獲利</strong>，不是售價。如果這是你的<strong>主要住宅</strong>，而且符合持有與居住測試，一般可以排除最多 <strong>$250,000</strong> 的獲利，許多夫妻合併申報的稅表最多可排除 <strong>$500,000</strong>。超過排除額、或不符合資格的獲利，就要課稅。
        </p>
        <p>
          本文談的是一般的美國主要住宅。海外的房子或公寓，請見<a href="/zh-tw/library/investment/sold-foreign-property-transfer/">海外賣房後把錢匯到美國，要申報什麼？</a>
        </p>

        <h2>第一步：算出獲利</h2>
        <p>
          獲利一般是出售的<strong>實現金額</strong>（amount realized，售價減去出售費用），減去你的<strong>調整後成本</strong>（adjusted basis）。調整後成本一般從你買房的價格開始，加上某些費用（例如裝修改良），並減去某些項目（例如曾經出租或營業使用時提列的折舊）。Publication 523 有計算表。
        </p>
        <ArticleTable
          head={['舉例用的數字', '金額']}
          rows={[
            ['售價', '$700,000'],
            ['減：出售費用（舉例）', '− $40,000'],
            ['實現金額', '$660,000'],
            ['減：調整後成本（購買價格加裝修）', '− $420,000'],
            ['獲利', '$240,000'],
          ]}
        />

        <h2>第二步：確認主要住宅排除額</h2>
        <p>
          在出售日之前的 <strong>5 年</strong>期間內，如果符合以下條件，一般可以排除出售主要住宅的獲利：
        </p>
        <ul>
          <li><strong>持有測試：</strong>你持有這棟房子至少 <strong>2 年</strong>，而且</li>
          <li><strong>居住測試：</strong>你把它當作主要住宅居住至少 <strong>2 年</strong>。</li>
        </ul>
        <p>
          如果你在這次出售前的 <strong>2 年</strong>內，已經用排除額排除過另一棟房子的獲利，一般就不能再使用。
        </p>

        <ArticleTable
          head={['情況', '最高排除額（符合所有測試時）']}
          rows={[
            ['符合資格的個人', '最多 $250,000 的獲利'],
            ['許多符合資格、合併申報的夫妻', '最多 $500,000 的獲利'],
            ['沒有完全符合測試', '在某些符合條件的情況下，可能可以部分排除'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 沒有滿 2 年不代表一定是零</div>
          <p>如果你沒有完全符合 2 年的測試，在 Publication 523 說明的某些情況下，仍可能符合部分排除。在假設全部獲利都要課稅之前，請先查看這些規定。</p>
        </div>

        <h2>虧損不能扣除</h2>
        <p>
          如果你出售個人主要住宅的價格低於調整後成本，這筆虧損一般<strong>不能扣除</strong>。
        </p>

        <h2>Form 1099-S 與申報</h2>
        <p>
          過戶代理人可能會寄 <strong>Form 1099-S</strong> 給你。如果你收到，即使獲利全部可以排除，仍可能需要在稅表上申報這筆出售。如果有部分獲利需要課稅，就要在稅表上申報。請保留過戶文件與裝修紀錄，作為成本的依據。
        </p>

        <h2>房子曾經出租或作營業用時</h2>
        <p>
          曾經出租或營業使用，可能會大幅改變計算結果。特別是，1997 年 5 月 6 日之後因營業或出租使用而允許或可提列的<strong>折舊</strong>，一般不能單純用主要住宅排除額來排除。房子沒有作為主要住宅的期間，也可能影響可排除的獲利。這些計算超出本文範圍 — 請找人檢視這筆出售。出租折舊怎麼運作，請見<a href="/zh-tw/library/rental/rental-property-income/">出租房子或公寓，租金收入怎麼課稅？</a>
        </p>

        <h2>例子</h2>
        <p>
          以上面的舉例數字來說，May 和配偶持有並居住這棟房子六年，合併申報。他們的獲利是 $240,000。他們符合持有與居住測試，過去 2 年內也沒有排除過其他房子的獲利，所以獲利在排除額範圍內。如果他們收到 Form 1099-S，就要查看 Publication 523，確認是否仍需要申報這筆出售。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

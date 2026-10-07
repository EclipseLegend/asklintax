import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/rental-property-income.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'rental-property-income',
  sourceHash:      '939ccf1d4397',
  id:            '56',
  title:         '出租房子或公寓，租金收入怎麼課稅？',
  titleEn:       'Renting out a house or apartment — how is rental income taxed?',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋長期出租美國房子或公寓的個人。Airbnb 等短期出租、自己也會使用的房產，以及海外房產，有各自的規定與指南；被動損失限制與折舊計算需要個別檢視',
  persona:       ['第一次當房東的人', '把以前自住的房子出租的人', '出租公寓或獨棟房屋的屋主', '把一個單位租給房客的家庭'],
  relatedJourney: ['Airbnb 與租金收入', '房產帶來的副業收入'],
  actionRequired: '申報你收到的租金，扣除規定允許的一般且必要的出租費用；房子準備好、可以出租時，開始提列建築物（不含土地）的折舊。修繕與改良的紀錄要分開保存。',
  sources: [
    { label: 'IRS — Publication 527（2025），住宅出租房產（Residential Rental Property）', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Schedule E（Form 1040）填寫說明', url: 'https://www.irs.gov/instructions/i1040se' },
    { label: 'IRS — Publication 946，如何提列折舊（How To Depreciate Property）', url: 'https://www.irs.gov/publications/p946' },
  ],
}

const FAQS = [
  {
    q: '押金算租金收入嗎？',
    a: '要看押金的用途。Publication 527 說明，打算退還給房客的押金，收到時一般不算收入；但用來抵最後一個月房租的押金，或你沒有退還的押金，就要當作租金。租金收入的範圍不只每個月的房租。',
  },
  {
    q: '房貸可以全部扣除嗎？',
    a: '不是整筆房貸都能扣。房貸利息可以是出租費用，但償還的本金不是當期的出租扣除額。建築物的成本是透過折舊來回收。',
  },
  {
    q: '我換了屋頂，這是可以馬上扣除的修繕嗎？',
    a: '不一定。修繕和改良的處理方式不同。讓房子維持正常運作的修繕一般可以扣除；改良則一般要加入成本、再提列折舊。Publication 527 說明了兩者的差別。',
  },
  {
    q: '我的出租是虧損，可以全部扣除嗎？',
    a: '今年不一定可以。出租活動一般受被動活動（passive activity）規定約束，可能限制你當年可扣除的虧損。出租虧損請找人檢視。',
  },
  {
    q: '折舊在賣房時有影響嗎？',
    a: '有。折舊會降低你的房產成本，進而影響賣房時的獲利。如果這個房產曾經是你的主要住宅，請見「我賣了房子，獲利要繳稅嗎？」',
  },
]

const RELATED = [
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    desc:  '短期出租的規定不同 — 請改看這篇。',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: '我賣了房子，獲利要繳稅嗎？',
    desc:  '把以前的自住房出租，可能影響賣房排除額。',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '海外出租房產與美國稅務',
    desc:  '出租台灣或其他國家的公寓。',
  },
]

export default function RentalPropertyIncomeZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '出租房產的租金收入怎麼課稅？房東指南 | AskLinTax 繁體中文',
      description: '長期出租房子或公寓：哪些算租金收入、常見的可扣除費用、修繕與改良的差別、27.5 年折舊、Schedule E，以及被動損失限制。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          在大多數情況下，出租房子或公寓收到的租金是<strong>必須申報的應稅收入</strong>。你一般可以用規定允許的出租費用來減少它 — 例如房貸利息、房屋稅、保險、修繕，以及建築物的<strong>折舊</strong>。個人屋主通常在 <strong>Schedule E</strong> 上申報。
        </p>
        <p>
          本文談的是一般的長期出租。Airbnb 等短期出租，請見<a href="/zh-tw/library/rental/airbnb-tax-guide/">Airbnb 房東報稅指南</a>與<a href="/zh-tw/library/rental/14-day-rule/">14 天規則</a>。海外房產請見<a href="/zh-tw/library/rental/foreign-rental-property/">海外出租房產與美國稅務</a>。
        </p>

        <h2>哪些算租金收入</h2>
        <p>
          租金收入的範圍比每個月的房租更廣。依情況而定，也可能包括預收的租金、你沒有退還或用來抵房租的押金，以及房客替你支付的費用。Publication 527 列出了哪些算在內。
        </p>

        <h2>常見的可扣除費用</h2>
        <p>
          在符合相關規定的前提下，常見的出租費用類別可能包括：
        </p>
        <ArticleTable
          head={['費用', '說明']}
          rows={[
            ['房貸利息', '是利息 — 不是償還的本金'],
            ['房屋稅（property taxes）', '出租房產的房屋稅'],
            ['保險', '承保出租房產的保單'],
            ['修繕與維護', '讓房子維持正常運作；改良的處理方式不同'],
            ['管理費', '付給物業管理公司的費用'],
            ['屋主支付的水電瓦斯等費用', '不包括房客自己付的費用'],
            ['折舊', '逐年回收建築物的成本'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 修繕與改良的差別</div>
          <p>修繕是讓房子維持正常運作，一般可以扣除。改良 — 讓房產變得更好、恢復原狀或改作他用 — 一般要加入成本、再提列折舊。兩者的處理方式並不會自動相同。</p>
        </div>

        <h2>折舊：最常被忽略的費用</h2>
        <ul>
          <li>依一般的 General Depreciation System（GDS）規定，住宅出租建築物一般分 <strong>27.5 年</strong>提列折舊。</li>
          <li><strong>土地不能提列折舊。</strong>只有建築物（以及某些改良）可以提列折舊，所以成本要拆分成土地與建築物。</li>
          <li>折舊一般從房產<strong>開始使用（placed in service）</strong>時開始 — 也就是準備好、可以出租的時候。</li>
          <li>折舊會降低你的成本，影響之後賣房時的獲利。</li>
        </ul>
        <p>
          Publication 946 與 Publication 527 說明了怎麼計算。
        </p>

        <h2>在哪裡申報</h2>
        <p>
          個人屋主通常在 <strong>Schedule E</strong>（Form 1040）上申報租金收入與費用。某些情況會改變出租的申報方式，所以如果你的情況比較特殊，請查看 Schedule E 的填寫說明。
        </p>

        <h2>兩個可能改變答案的規定</h2>
        <ul>
          <li><strong>個人使用。</strong>如果你或家人也會使用這個房產，費用怎麼分攤、可以扣除多少的規定都可能改變。</li>
          <li><strong>被動活動限制。</strong>出租活動一般屬於被動活動，被動活動規定可能限制你當年可扣除的出租虧損。</li>
        </ul>

        <h2>例子</h2>
        <p>
          Kevin 出租一間公寓，月租 $2,000，2025 年收到 $24,000 租金。他支付房貸利息、房屋稅、保險，以及修理漏水水龍頭的費用，並從房子準備好、可以出租時開始，將成本中建築物的部分分 27.5 年提列折舊。他在 Schedule E 上申報租金與這些費用。之後他換了屋頂，就把它當作改良提列折舊，而不是一次全部扣除。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/home-office-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'home-office-deduction',
  sourceHash:      '150c2744c93c',
  id:            '58',
  title:         '家庭辦公室扣除額：我符合資格嗎？',
  titleEn:       'Home office deduction — do I qualify?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋自雇者與其他把住家一部分作營業用的人，在聯邦稅上的家庭辦公室扣除額。不涵蓋在家遠距工作的 W-2 員工、州稅規定，以及 Form 8829 上詳細的實際費用與折舊計算',
  persona:       ['在家工作的自由工作者', '以住家為營業據點的獨資經營者', '在家存放庫存的賣家', '在家經營托育的人'],
  relatedJourney: ['創業或經營小型企業', '自雇第一年'],
  actionRequired: '確認住家的某個空間是否經常 — 而且一般是專門 — 用於你的營業，以及它是否是你的主要營業地點，或符合其他合格的營業使用規定。如果符合，再選擇簡化法或實際費用法。',
  sources: [
    { label: 'IRS — Publication 587（2025），住家的營業使用（Business Use of Your Home）', url: 'https://www.irs.gov/publications/p587' },
    { label: 'IRS — 家庭辦公室扣除額簡化法（Simplified option for home office deduction）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/simplified-option-for-home-office-deduction' },
    { label: 'IRS — Form 8829 填寫說明（Instructions for Form 8829）', url: 'https://www.irs.gov/instructions/i8829' },
  ],
}

const FAQS = [
  {
    q: '我是在家遠距工作的 W-2 員工，可以申報家庭辦公室扣除額嗎？',
    a: '本文不把這項扣除額套用在一般在家工作的 W-2 員工身上。依目前的聯邦規定，它主要適用於自雇與營業使用 — 不要假設以員工身分遠距工作，就能產生聯邦稅的扣除額。',
  },
  {
    q: '我需要一個獨立的房間嗎？',
    a: '不一定。如果符合規定，一個房間中專用、可以明確區分的一部分空間，也可能符合資格。重點是經常而且一般是專門的營業使用，再加上主要營業地點或其他合格的測試。',
  },
  {
    q: '我的辦公室我自己工作用，小孩也會在那裡寫功課，這樣算嗎？',
    a: '一般不算。這個空間通常必須專門用於營業。有一些特定例外 — 例如某些庫存或產品樣品的存放、某些托育使用，以及某些出租使用 — 但家人一起使用這個空間，一般就不符合專門使用的測試。',
  },
  {
    q: '用簡化法最多可以扣多少？',
    a: '簡化法是合格空間每平方英尺 $5，最多 300 平方英尺 — 所以簡化法的計算上限是 $1,500。',
  },
  {
    q: '用簡化法，資格會比較容易符合嗎？',
    a: '不會。它只是讓計算變簡單。兩種方法的資格條件都一樣。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '營業扣除額的整體說明。',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: '什麼是自雇稅？怎麼計算？',
    desc:  '扣除額降低利潤，也降低自雇淨收入。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '在年中預先繳納家庭事業收入的稅。',
  },
]

export default function HomeOfficeDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '家庭辦公室扣除額：符合資格嗎？簡化法與實際費用法 | AskLinTax 繁體中文',
      description: '誰符合家庭辦公室扣除額：經常與專門的營業使用、主要營業地點、例外情況，以及每平方英尺 $5 的簡化法和實際費用法的比較。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你<strong>經常</strong>使用住家的一部分，而且一般是<strong>專門</strong>用於營業，同時這個空間是你的<strong>主要營業地點</strong>（principal place of business）或符合其他合格的營業使用規定，你就可能符合資格。符合的話，可以用<strong>簡化法</strong>（simplified option）或<strong>實際費用法</strong>（actual-expense method）來計算扣除額。
        </p>
        <p>
          本文談的是自雇與其他營業使用。本文不代表 W-2 員工在家遠距工作，就能產生聯邦稅的家庭辦公室扣除額。
        </p>

        <h2>資格測試</h2>
        <ArticleTable
          head={['測試', '一般的意思']}
          rows={[
            ['經常使用', '持續把這個空間用於營業，而不是偶爾使用'],
            ['專門使用（一般）', '這個空間只用於營業 — 有特定例外'],
            ['主要營業地點，或其他合格規定', '例如這裡是你經營事業的地方，或符合 Publication 587 中其他營業使用規定'],
          ]}
        />

        <h2>不一定需要獨立的房間</h2>
        <p>
          常見的誤解是一定要有一整個房間。如果符合規定，<strong>一個房間中專用、可以明確區分的一部分空間</strong>也可能符合資格。重點是這個空間怎麼使用，而不是它有沒有牆和門。
        </p>

        <h2>專門使用規定的例外</h2>
        <p>
          Publication 587 說明了專門使用規定不以一般方式適用的情況，包括某些：
        </p>
        <ul>
          <li><strong>庫存或產品樣品的存放</strong></li>
          <li><strong>托育</strong>使用</li>
          <li><strong>出租</strong>使用</li>
        </ul>
        <p>
          每個例外都有自己的條件 — 依賴之前，請先查看 Publication 587。
        </p>

        <h2>兩種計算方式</h2>
        <ArticleTable
          head={['', '簡化法', '實際費用法（一般方法）']}
          rows={[
            ['怎麼算', '合格空間每平方英尺 $5', '把住家的實際費用分攤到營業使用的部分'],
            ['上限', '最多 300 平方英尺 — 所以最多 $1,500', '取決於你的實際費用與 Publication 587 中的限制'],
            ['住家折舊', '這個方法下，家庭辦公室不提列住家折舊', '可以包括營業使用部分的折舊'],
            ['之後的折舊回收（recapture）', '這個方法沒有提列折舊，所以不會因此產生折舊回收', '提列的折舊在賣房時可能有影響'],
            ['資格', '條件相同', '條件相同'],
          ]}
        />
        <p>
          許多自雇申報者在實際費用法下使用 Form 8829。簡化法<strong>不會</strong>改變誰符合資格 — 它只改變計算方式。
        </p>

        <h2>例子</h2>
        <p>
          Wei 是自雇的翻譯。她把客廳中 150 平方英尺的區域只用於工作，每個工作天都使用，這裡也是她經營事業的地方，家人不會使用這個區域。用簡化法計算，她的扣除額是 150 × $5 = $750。如果她週末把這個區域當作客房使用，一般就不符合專門使用的測試。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 放在整體中來看</div>
          <p>家庭辦公室扣除額只是營業扣除額的一部分。完整的說明請見<a href="/zh-tw/library/small-business/business-deductions/">小型企業老闆可以扣除哪些費用？</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/form-1099-k.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-1099-k',
  sourceHash:      '4ddde2b9dfaa',
  id:            '55',
  title:         '收到 PayPal、Venmo 或 eBay 的 1099-K，要繳稅嗎？',
  titleEn:       'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋從支付 App 或網路平台收到 Form 1099-K 的個人。說明申報門檻與這份表格代表什麼；不是申報營業收入或出售投資的完整指南',
  persona:       ['在網路上賣二手物品的人', '透過 App 收款的副業賣家與服務提供者', '收到意料之外 1099-K 的人', '用支付 App 分攤費用的朋友與家人'],
  relatedJourney: ['副業收入', '第一次報稅'],
  actionRequired: '不要假設 1099-K 上的全部金額都要課稅 — 也不要以為沒收到 1099-K 的收入就不用繳稅。把款項分成營業或服務收入、虧本賣出的個人物品、賺錢賣出的個人物品，以及贈與或分攤費用的還款，再分別正確申報。',
  sources: [
    { label: 'IRS — 了解你的 Form 1099-K（Understanding your Form 1099-K）', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
    { label: 'IRS — Form 1099-K 常見問題：一般資訊（Form 1099-K FAQs: General information）', url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-general-information' },
    { label: 'IRS — Form 1099-K 常見問題：收到 Form 1099-K 該怎麼辦（Form 1099-K FAQs: What to do if you receive a Form 1099-K）', url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-what-to-do-if-you-receive-a-form-1099-k' },
    { label: 'IRS — One, Big, Beautiful Bill 下的 Form 1099-K 門檻常見問題；金額門檻恢復為 $20,000', url: 'https://www.irs.gov/newsroom/irs-issues-faqs-on-form-1099-k-threshold-under-the-one-big-beautiful-bill-dollar-limit-reverts-to-20000' },
    { label: 'IRS — Form 8949 填寫說明（Instructions for Form 8949）', url: 'https://www.irs.gov/instructions/i8949' },
  ],
}

const FAQS = [
  {
    q: '支付 App 什麼時候要寄 1099-K 給我？',
    a: '依 IRS 目前的指引，如果你因商品或服務收到的款項超過 $20,000，而且交易超過 200 筆，支付 App 或網路平台一般必須寄 Form 1099-K 給你。金額較低時，它仍可能寄給你。',
  },
  {
    q: '我沒收到 1099-K，副業收入就不用繳稅嗎？',
    a: '不是。1099-K 的門檻是平台的申報規定，不是你的課稅門檻。如果收入需要課稅，不論有沒有收到表格，你都必須申報。',
  },
  {
    q: '我把舊沙發用比買價低的價格賣掉，1099-K 上的金額要繳稅嗎？',
    a: '一般不用。以低於成本的價格賣出個人物品，不會產生應稅獲利，而個人的虧損一般也不能扣除。但你不應該直接把 1099-K 上的總額當作應稅收入 — IRS 有說明怎麼申報這類出售，讓這筆金額被正確處理。',
  },
  {
    q: '室友用 Venmo 還我房租，這算收入嗎？',
    a: '不算。贈與，以及分攤個人費用的還款，不會只因為透過 App 轉帳就變成商品或服務的款項。這些不是應稅收入，也不應該列在 Form 1099-K 上。',
  },
  {
    q: '我收到的 1099-K 有錯，該怎麼辦？',
    a: '請聯絡表格上列出的付款方 — 也就是支付 App 或網路平台 — 要求更正。如果報稅前無法拿到更正的表格，IRS 也說明了如何處理錯誤的表格。',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '如果 App 收到的是自由工作收入，1099 工作怎麼課稅。',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: '什麼是自雇稅？怎麼計算？',
    desc:  '透過 App 收到的營業收入，也可能要繳自雇稅。',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    desc:  '從出租平台收到 1099-K 的房東。',
  },
]

export default function Form1099KZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '收到 PayPal、Venmo 或 eBay 的 1099-K 要繳稅嗎？ | AskLinTax 繁體中文',
      description: '1099-K 申報的是收款總額，不是利潤。目前 $20,000 / 200 筆交易的申報門檻、虧本賣出個人物品為什麼不是應稅收入、贈與與分攤費用，以及表格有錯時怎麼辦。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          不一定。<strong>Form 1099-K</strong> 申報的是你透過支付 App、網路平台或支付卡收到的<strong>款項總額</strong> — 不是你的利潤，也不代表這筆錢一定要課稅。要不要繳稅，取決於<strong>這些款項是為了什麼</strong>：營業或服務收入、賺錢賣出的個人物品、虧本賣出的個人物品，或根本不是收入的錢。
        </p>

        <h2>目前的申報門檻</h2>
        <p>
          對支付 App 與網路平台（第三方結算機構，third-party settlement organizations）來說，依 IRS 目前的指引，如果你因商品或服務收到的款項超過 <strong>$20,000</strong>，<em>而且</em>交易<strong>超過 200 筆</strong>，一般就必須寄 Form 1099-K。這個門檻是在立法改變先前的制度後，追溯恢復的；所以你可能看過的 $600 門檻舊資訊，並不是目前的聯邦規定。即使低於門檻，平台仍可能寄 1099-K 給你。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 申報門檻不是課稅門檻</div>
          <p>$20,000 / 200 筆的測試，決定的是平台是否必須寄出表格，而不是你要不要繳稅。收到 1099-K 不代表全部金額都要課稅；沒收到也不代表應稅收入就免稅。</p>
        </div>

        <h2>依款項的用途分類</h2>
        <ArticleTable
          head={['這些款項是什麼', '一般來說']}
          rows={[
            ['營業或服務收入（賣自己做或進貨轉賣的商品、自由工作）', '應稅收入；可扣除的營業費用另外處理'],
            ['以高於買價賣出的個人物品', '獲利一般要課稅'],
            ['以低於買價賣出的個人物品', '沒有應稅獲利；個人虧損一般不能扣除'],
            ['贈與，或朋友還你分攤的個人費用', '不是商品或服務的款項，也不是應稅收入'],
          ]}
        />

        <h2>營業或服務收入</h2>
        <p>
          如果這些款項是來自營業或你提供的服務，就要申報收入。因為 1099-K 顯示的是收款總額，可扣除的營業費用要另外申報，才能算出利潤 — 表格本身不會幫你扣掉。這類收入也可能要繳自雇稅；請見<a href="/zh-tw/library/small-business/self-employment-tax/">什麼是自雇稅？怎麼計算？</a>
        </p>

        <h2>賣掉自己的個人物品</h2>
        <p>
          大多數人賣二手衣服、家具或電子產品，價格都比當初買的低。這不會產生應稅獲利，個人虧損一般也不能扣除 — 但你不應該直接把 1099-K 的總額申報成收入。如果你賣出個人物品的價格<strong>高於</strong>買價，獲利一般要課稅。IRS 的 Form 1099-K 常見問題與 Form 8949 填寫說明，說明了這類出售怎麼申報。
        </p>

        <h2>贈與與分攤費用</h2>
        <p>
          朋友給你的禮金，或室友還你房租、聚餐的分攤費用，不會只因為透過 App 轉帳就變成商品或服務的款項。這些金額不是應稅收入，也不應該列在 Form 1099-K 上。
        </p>

        <h2>如果表格有錯</h2>
        <p>
          如果你的 1099-K 包含了不該列入的款項 — 例如個人的還款 — 或金額錯誤，請聯絡表格上列出的付款方，要求更正。請保留能說明每筆款項用途的紀錄。
        </p>

        <h2>例子</h2>
        <p>
          Ana 收到一份網路平台的 1099-K，金額是 $24,000。其中 $20,000 來自她的副業手工飾品，$4,000 則是她用低於買價的價格賣掉自己的二手家具。她申報飾品生意的收入與可扣除的費用，並依 IRS 對虧本賣出個人物品的指引處理家具的出售，讓這部分不會被當作收入課稅。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

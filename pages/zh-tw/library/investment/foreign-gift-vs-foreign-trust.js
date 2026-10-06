import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gift-vs-foreign-trust.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gift-vs-foreign-trust',
  sourceHash:      '7d55ad3e9ed8',
  id:            '40',
  title:         '海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？',
  titleEn:       'Foreign gift from your parents vs. foreign trust distribution — why the difference matters',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Advanced',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '以概要方式說明，對美國公民與居民外國人而言，為什麼來自非居民個人的贈與與來自海外信託的分配，在 Form 3520 上是不同的申報類別。本指南不說明如何計算海外信託分配的稅，也不說明信託本身的申報 — 海外信託的情況需要專業人士檢視',
  persona:       ['海外家族信託的受益人', '從父母在海外的信託、基金會或類似安排收到錢的人', '遺產透過信託給付的繼承人', '確認 Form 3520 該填哪一部分的報稅人員'],
  relatedJourney: ['跨境財務'],
  actionRequired: '先弄清楚錢到底是誰匯的：你的父母個人，還是海外的信託（或類似信託的安排）。海外信託分配在 Form 3520 的 Part III 申報，不是 Part IV；漏報的罰款高得多，而且可能要繳稅。只要涉及海外信託，申報前請先尋求專業協助。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part III 與 Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520（Rev. December 2023）', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — Form 3520-A 填寫說明（Rev. December 2025）', url: 'https://www.irs.gov/instructions/i3520a' },
  ],
}

const FAQS = [
  {
    q: '我爸爸說這筆錢是贈與，但它是從他的家族信託匯出來的。這算贈與嗎？',
    a: '在 Form 3520 上，你從海外信託收到的款項，要在 Part III 當作分配（distribution）申報 — 不是在 Part IV 當作贈與 — 即使家人把它當作贈與。IRS 表示，如果一筆款項同時符合 Part III 與 Part IV 的申報條件，只在 Part III 申報。',
  },
  {
    q: '海外信託分配要繳稅嗎？',
    a: '可能要。這取決於信託的類型，以及分配帶出了什麼。例如，如果你收到完整的 Foreign Grantor Trust Beneficiary Statement（海外委託人信託受益人聲明），填寫說明表示要把這筆分配視為直接來自信託的所有人 — 所以如果這筆分配是所有人的贈與，就不計入你的總所得。其他分配可能要繳稅，有時適用特別規則。這需要專業分析。',
  },
  {
    q: '信託分配也有像贈與那樣的 $100,000 門檻嗎？',
    a: '沒有。超過 $100,000 的測試，是 Part IV 針對來自非居民外國人與海外遺產的贈與與遺產的規定。Part III 由這一年從海外信託收到分配的美國人填寫 — 贈與門檻不適用。',
  },
  {
    q: '沒有申報海外信託分配，罰款是多少？',
    a: '依照 Form 3520 填寫說明，未申報海外信託分配的初始罰款，是 $10,000 或分配總價值的 35%，取較高者。合理原因（reasonable cause）可以避免罰款，但要依事實判斷。',
  },
  {
    q: '我父母是透過海外的銀行或投資公司匯錢給我的，這樣就算信託嗎？',
    a: '光是這樣不算。銀行或證券公司單純替你父母匯錢，通常不是信託。但被稱為信託、基金會或為受益人持有資產的類似結構，就可能是。如果你不確定那是什麼安排，請索取相關文件並找人檢視。',
  },
  {
    q: '美國的信託，在贈與上也可能被視為「外國人」嗎？',
    a: '有一種情況會：IRS 在贈與申報的外國人清單中，包括被視為由外國人所有的美國國內信託。信託的分類很技術性 — 這也是信託情況需要專業人士檢視的另一個原因。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於來自家人的一般海外贈與的基礎指南。',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與和海外遺產，在美國申報有什麼不同？',
    desc:  '來自個人與遺產的贈與和遺贈 — Part IV 這一邊。',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  'Part IV 的申報方式、截止日與申報地點。',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520 忘記報或晚報，現在怎麼辦？',
    desc:  '漏報表格的罰款與合理原因。',
  },
]

export default function ForeignGiftVsForeignTrustZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '父母贈與 vs. 海外信託分配：Form 3520 Part III 與 Part IV 的差別 | AskLinTax 繁體中文',
      description: '來自海外父母的贈與與海外信託的分配，在 Form 3520 上是不同的類別：Part IV 與 Part III、不同的門檻、不同的罰款，以及不同的課稅結果。為什麼很重要，以及什麼時候該尋求協助。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          「父母給的錢」可能以兩種非常不同的方式到你手上，而 Form 3520 把它們當作不同的類別：
        </p>
        <ul>
          <li><strong>父母個人給的贈與</strong>（父母是非居民外國人個人）是海外贈與（Foreign Gift），只有在你當年的親屬合計超過 $100,000 時，才在 <strong>Part IV</strong> 申報。它通常不是應稅收入。</li>
          <li><strong>海外信託的分配</strong>（Foreign Trust Distribution）— 即使是你父母設立的家族信託 — 要在 <strong>Part III</strong> 申報，沒有 $100,000 門檻，漏報的罰款高得多，而且<strong>可能要繳稅</strong>。</li>
        </ul>
        <p>
          把信託分配叫做「贈與」，並不會讓它移到 Part IV。只要涉及海外信託，<strong>請尋求專業協助</strong>。
        </p>

        <ArticleTable
          head={['', '來自非居民個人的贈與', '來自海外信託的分配']}
          rows={[
            ['Form 3520 的哪一部分', 'Part IV', 'Part III'],
            ['申報門檻', '當年來自有親屬關係外國人的合計超過 $100,000', '沒有贈與門檻 — Part III 適用於收到的分配'],
            ['所得稅', '通常不是你的收入', '可能要繳稅，取決於信託與分配的性質'],
            ['未申報的罰款（依填寫說明）', '每月罰贈與金額的 5%，最高 25%', '$10,000 或分配總價值的 35%，取較高者'],
            ['複雜度', '通常可以處理', '很高 — 強烈建議專業人士檢視'],
          ]}
        />

        <h2>為什麼 IRS 要把它們分開</h2>
        <p>
          贈與是來自一個人的移轉。信託則是為受益人持有資產的安排，它的分配可能帶出信託賺到的收入 — 有時是累積了很多年的收入。稅法有特別規定，讓美國受益人不能只因為信託把收入以「贈與」的名義付出來，就免稅取得這些收入。所以：
        </p>
        <ul>
          <li>IRS 的海外贈與指引指出，海外信託的分配在 Part III 申報；如果一筆款項同時符合 Part III 與 Part IV 的申報條件，只在 Part III 申報。</li>
          <li>稅法對海外贈與的定義，排除了已妥善申報為海外信託分配的款項。</li>
          <li>Part III 要求更多資訊 — 對某些信託，還包括以前年度分配的數字。</li>
        </ul>

        <h2>課稅結果為什麼可能不同</h2>
        <p>
          本指南不說明如何計算海外信託分配的稅。概要來說，Form 3520 填寫說明顯示，答案取決於信託的類型，以及信託提供的資訊：
        </p>
        <ul>
          <li><strong>海外委託人信託（foreign grantor trust）：</strong>如果你收到完整的 <em>Foreign Grantor Trust Beneficiary Statement</em>（Form 3520-A 的一部分），填寫說明表示，在所得稅上要把這筆分配視為直接來自信託的所有人。例如，如果這筆分配是所有人的贈與，就不計入你的總所得。你要把這份聲明附上。</li>
          <li><strong>海外非委託人信託（foreign nongrantor trust）：</strong>Part III 會問你是否收到 <em>Foreign Nongrantor Trust Beneficiary Statement</em>。如果信託沒有提供足夠資訊，可能適用以前年度分配為基礎的預設計算方式，而且分配中的一部分可能被視為累積分配（accumulation distribution），有特別的稅務後果。</li>
        </ul>
        <p>
          這些正是應該由熟悉海外信託的稅務專業人士來回答的問題。
        </p>

        <h2>如何判斷你遇到的是哪一種</h2>
        <ul>
          <li><strong>錢是從誰的帳戶匯出的？</strong>父母的個人帳戶，指向贈與。以信託、基金會、受託人或類似結構名義開立的帳戶，指向信託分配。</li>
          <li><strong>有沒有信託文件？</strong>信託契約、受益人名單，或受託人（通常是銀行或信託公司），都是明顯的跡象。</li>
          <li><strong>有沒有人寄受益人聲明給你？</strong>那清楚表示你面對的是海外信託。</li>
          <li><strong>錢是在某人過世後，透過遺產或信託給你的嗎？</strong>來自海外遺產的遺贈在 Part IV；來自信託的分配在 Part III。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 強烈建議：請專業人士檢視</div>
          <p>海外信託申報涉及分類問題、必須向信託取得的資訊、分配可能要繳的稅，以及從 $10,000 起跳的罰款。沒有熟悉海外信託的 CPA 或稅務律師協助，請不要自行申報 Part III — 也不要自行認定信託付款可以用 Part IV 處理。</p>
        </div>

        <h2>實際例子</h2>
        <p>
          美國公民 Sophia 在 2025 年收到兩筆匯款：
        </p>
        <ul>
          <li><strong>從她媽媽在香港的個人帳戶匯來的 $60,000。</strong>她媽媽是非居民外國人。這是海外贈與。因為沒有超過 $100,000（而且沒有其他有親屬關係者的贈與），這筆錢不需要申報 Part IV，通常也不算收入。</li>
          <li><strong>從她祖父在新加坡設立的家族信託匯來的 $60,000</strong>，由受託人支付。這是海外信託分配。不論 $100,000 的贈與門檻，都要在 Form 3520 的 <strong>Part III</strong> 申報，而其中是否有應稅部分，取決於這個信託。Sophia 尋求了專業協助。</li>
        </ul>
        <p>
          同樣的金額、同一個家庭，兩個完全不同的答案。
        </p>

        <h2>要索取與保留的紀錄</h2>
        <ul>
          <li>每一筆匯款的來源帳戶名稱</li>
          <li>信託文件與受託人的聯絡資訊</li>
          <li>任何 Foreign Grantor 或 Nongrantor Trust Beneficiary Statement</li>
          <li>你以前年度收到的分配紀錄</li>
          <li>對於一般贈與，證明錢來自個人本人的紀錄</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

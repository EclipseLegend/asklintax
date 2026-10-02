import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/worldwide-income.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'worldwide-income',
  sourceHash:      'dc4047528b0e',
  id:            '30',
  title:         '海外收入：美國稅務居民要申報全球所得嗎？',
  titleEn:       'Foreign income: do U.S. tax residents report worldwide income?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人的全球所得規則、外國稅額抵免、海外工作所得排除額（Foreign Earned Income Exclusion），以及匯率換算。租稅協定主張、海外退休金與外國公司，需要個別檢視',
  persona:       ['在台灣或中國有收入的綠卡持有人與 H-1B 工作者', '新移民', '有海外租金、利息或投資的人', '一年中有部分時間在海外的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '列出你在 2025 年身為美國稅務居民期間，在世界任何地方收到的每一筆收入來源，換算成美元，並在你的 Form 1040 上申報。接著確認外國稅額抵免（或者如果你住在海外，海外工作所得排除額）是否能減少重複課稅。',
  sources: [
    { label: 'IRS — 居民外國人（Resident aliens）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 54 — 海外美國公民與居民外國人稅務指南（Tax Guide for U.S. Citizens and Resident Aliens Abroad）', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS — 海外工作所得排除額（Foreign earned income exclusion）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 年海外工作所得排除額金額', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — 外幣與匯率（Foreign currency and currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（Taxable and Nontaxable Income：贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — 美國所得稅協定一覽（United States income tax treaties A to Z）', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: '我是綠卡持有人，台灣公寓的租金要申報嗎？',
    a: '要。美國居民和美國公民一樣，要就全球所得繳稅，所以海外房產的租金要列入你的美國稅表（Schedule E）— 即使在台灣也已經課稅，而且錢一直留在台灣。',
  },
  {
    q: '台灣已經課過稅的收入，我要繳兩次稅嗎？',
    a: '不一定。如果你就同時被美國課稅的所得繳納了符合資格的外國所得稅，一般可以選擇外國稅額抵免（Form 1116）來減少美國稅額，或列為分項扣除額。只有所得稅類的稅款才符合抵免資格。',
  },
  {
    q: '我住在美國，可以使用海外工作所得排除額嗎？',
    a: '一般不行。這項排除額要求你有海外工作所得、稅務住所在外國，並且符合真實居住測試（Bona Fide Residence Test）或實際停留測試（Physical Presence Test，在連續 12 個月內至少有 330 個整天在外國）。在美國生活和工作的人，通常不符合資格。',
  },
  {
    q: '我父母從台灣匯給我的錢，算是我的全球所得嗎？',
    a: '不算。收到的贈與和遺產，對受領人來說一般不是收入。來自外國人的大額贈與可能需要在 Form 3520 上申報，但不會被當作收入課稅。',
  },
  {
    q: '我在 2025 年年中搬到美國，搬來之前的台灣薪資要申報嗎？',
    a: '通常不用。抵達美國的那一年，你通常是雙重身分（Dual-Status）納稅人：只有你身為美國居民的期間，才要就全球所得課稅。你還是非居民時收到的外國所得，除非與美國業務有關，一般不用繳稅。',
  },
  {
    q: '美國和台灣有租稅協定嗎？',
    a: '台灣沒有出現在 IRS 與美國簽有所得稅協定的國家名單上。如果你要依賴任何協定優惠，請先請稅務專業人士確認。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '全球所得適用於居民。用綠卡測試與實質居留測試確認你的身分。',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '海外出租房產與美國稅務',
    desc:  '如何申報海外房產的租金：Schedule E、折舊與匯率。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '利息是收入；帳戶本身可能需要申報 FBAR 或 Form 8938。',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: '雙重身分報稅：抵達或離開美國的那一年',
    desc:  '抵達美國的那一年，全球所得只適用於你身為居民的期間。',
  },
]

export default function WorldwideIncomeZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '美國居民要申報海外收入嗎？全球所得說明 | AskLinTax 繁體中文',
      description: '美國公民與居民外國人要就全球所得繳稅 — 包括來自台灣或中國的薪資、租金、利息與利得。2025 年哪些要算、哪些不算，以及外國稅額抵免與 FEIE 怎麼運作。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>規則：美國居民要就來自各地的收入繳稅</h2>
        <p>
          如果你是美國<strong>公民</strong>或美國<strong>居民外國人</strong>（Resident Alien）— 綠卡持有人，或符合實質居留測試的人 — 你的<strong>全球所得</strong>（Worldwide Income）都要繳美國所得稅，和美國公民一樣。收入在哪裡賺到、以什麼貨幣支付、你是否把錢帶回美國，都不會改變這一點。
        </p>
        <p>
          非居民外國人（Nonresident Alien）不同：他們一般只就美國來源所得，以及與美國業務有關的所得繳稅。這就是為什麼你的居民身分是第一個要回答的問題 — 請參閱 <a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>
        </p>

        <h2>哪些算是海外收入 — 哪些不算</h2>
        <ArticleTable
          head={['項目', '美國居民要申報嗎？', '說明']}
          rows={[
            ['在海外賺到的薪資或營業收入', '要', '可能適用外國稅額抵免，或（如果你住在海外）海外工作所得排除額'],
            ['台灣或中國銀行帳戶的利息', '要', '即使沒有 1099 也要申報'],
            ['外國股票的股利與利得', '要', '換算成美元'],
            ['海外房產的租金', '要', '在 Schedule E 上申報'],
            ['出售海外房產的利得', '要', '匯率變動會影響以美元計算的利得'],
            ['海外家人的贈與與遺產', '不是收入', '大額海外贈與可能需要申報 Form 3520'],
            ['在不同國家之間移轉自己的存款', '不是收入', '海外帳戶可能需要申報 FBAR／Form 8938'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 收入與揭露是兩回事</div>
          <p>在 Form 1040 上申報<em>收入</em>，和在 FBAR、Form 8938 或 Form 3520 上<em>揭露</em>海外帳戶與資產，是分開的兩件事。揭露表格申報的是你擁有或收到什麼；所得稅課的是你賺到什麼。你可能兩者都需要。請參閱 <a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938</a>。</p>
        </div>

        <h2>以美元申報</h2>
        <p>
          美國稅表上的每一筆金額都必須以美元表示。IRS 的一般規則是每一筆都用收款或付款當時的匯率換算。IRS 沒有單一的官方匯率；它公布年平均匯率，而且只要你一致地使用，通常接受任何公開的匯率。2025 年新台幣的年平均匯率為每 1 美元兌 31.167 新台幣。
        </p>

        <h2>避免重複課稅</h2>
        <h3>1. 外國稅額抵免</h3>
        <p>
          如果你就同時被美國課稅的所得，繳納或應計了<strong>外國所得稅</strong>，一般可以選擇<strong>抵免</strong>（Form 1116）來減少你的美國應納稅額（有上限），或列為<strong>分項扣除額</strong>。多數情況下，抵免比較划算。只有所得稅類的稅款才符合資格 — 而且已經排除的所得，不能再就其稅款申請抵免。
        </p>
        <h3>2. 海外工作所得排除額（適用住在海外的人）</h3>
        <p>
          海外工作所得排除額（Foreign Earned Income Exclusion, FEIE）讓符合資格的人排除海外<strong>工作</strong>所得 — <strong>2025 年最高 $130,000</strong>。要符合資格，你需要有海外工作所得、稅務住所在外國，並符合以下其中一項：
        </p>
        <ul>
          <li>在外國有包含一整個稅務年度的不間斷真實居住（對居民外國人來說，這個方式要求你是與美國簽有有效所得稅協定國家的公民或國民），或</li>
          <li>在任何連續 12 個月期間內，實際在外國至少 <strong>330 個整天</strong>。</li>
        </ul>
        <p>
          它不涵蓋利息、股利或租金等投資收入，而且在美國生活和工作的人一般不符合資格。
        </p>
        <h3>3. 租稅協定</h3>
        <p>
          所得稅協定可以減少或免除某些所得的稅。台灣沒有出現在 IRS 的美國所得稅協定國家名單上，所以在依賴任何協定主張之前，請仔細確認 — 並諮詢專業人士。
        </p>

        <h2>實際例子</h2>
        <p>Mei 是綠卡持有人，2025 年全年住在加州。除了美國薪資之外，她還有：</p>
        <ArticleTable
          head={['海外項目', '要在她 2025 年的稅表上申報嗎？', '在哪裡申報']}
          rows={[
            ['台北公寓的租金 NT$360,000', '要（≈ $11,551）', 'Schedule E，連同費用與折舊'],
            ['台灣儲蓄帳戶的利息', '要', '利息收入；Schedule B 的海外帳戶問題'],
            ['台灣股票的股利', '要', '股利收入'],
            ['台灣的母親贈與 US$50,000', '不用 — 不是收入', '低於 Form 3520 的 $100,000 門檻'],
            ['就租金繳納的台灣所得稅', '—', '可能可以在 Form 1116 上申請外國稅額抵免'],
          ]}
        />
        <p>
          她的台灣帳戶也需要確認是否要申報 <a href="/zh-tw/library/investment/foreign-bank-account/">FBAR 與 Form 8938</a>。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>如果你有海外退休金或退休帳戶、擁有外國公司的部分股權、持有外國共同基金或保險商品，或過去幾年沒有申報海外收入，請尋求協助。這些情況涉及本總覽以外的規則。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

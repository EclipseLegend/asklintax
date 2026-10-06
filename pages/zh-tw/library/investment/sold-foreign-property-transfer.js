import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/sold-foreign-property-transfer.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'sold-foreign-property-transfer',
  sourceHash:      '5352f0f92078',
  id:            '36',
  title:         '海外賣房後把錢匯到美國，要申報什麼？',
  titleEn:       'I sold property overseas and moved the money to the U.S. — what must I report?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋出售自己直接持有的海外不動產、再把款項匯到美國的美國公民與居民外國人。透過外國公司持有的房產、外幣房貸、曾出租房產的折舊，以及租稅協定的主張，需要專業人士檢視',
  persona:       ['在台灣或中國賣掉房子或公寓的人', '出售父母海外房產的繼承人', '出售留在原居住國房產的新移民', '在海外有不動產的綠卡持有人'],
  relatedJourney: ['跨境財務'],
  actionRequired: '把出售與匯款當作兩件事。出售要在發生的那一年，以美元在美國稅表上申報，不論你有沒有把錢匯過來。匯款本身不是收入，但任何存放售屋款的海外帳戶，都要計入 FBAR 與 Form 8938。',
  sources: [
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 551 — 資產的成本基礎（Basis of Assets）', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS Publication 523 — 出售自住房屋（Selling Your Home）', url: 'https://www.irs.gov/publications/p523' },
    { label: 'IRS — 外幣與匯率（Foreign currency and currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person：遺產與 Form 3520）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
  ],
}

const FAQS = [
  {
    q: '如果我把賣房的錢留在台灣，是不是就不用繳美國的稅？',
    a: '不是。美國公民與居民外國人要就全球所得繳稅。出售海外房產的利得，要在出售的那一年申報，不論錢留在海外還是匯到美國。',
  },
  {
    q: '把售屋款匯到美國，會多繳稅嗎？',
    a: '不會。移動自己的錢不是收入。但售屋款放在海外帳戶期間，會計入那一年的 FBAR $10,000 測試與你的 Form 8938 門檻。',
  },
  {
    q: '我出售時已經在台灣繳過稅，會被課兩次稅嗎？',
    a: '可能不會全部重複。如果你就這筆利得繳了合格的外國所得稅，或許可以申請外國稅額抵免（Form 1116），或把這些稅列為扣除。不是每一種外國稅都符合資格 — 例如某些與不動產移轉相關的稅，可能不屬於所得稅 — 所以請找人檢視具體是哪一種稅。',
  },
  {
    q: '這間公寓是我從媽媽那裡繼承的，我的成本基礎是多少？',
    a: '一般來說，繼承財產的成本基礎是死亡日的公平市價（如果遺產選擇替代評價日，則用替代評價日的價值）。請取得可靠的估價並保留。如果這筆遺產來自非居民，且你收到的那一年超過 $100,000，也應該在收到的那一年申報 Form 3520。',
  },
  {
    q: '這間公寓是父母生前送我的，我的成本基礎是多少？',
    a: '收到贈與的財產，通常沿用贈與人的調整後成本基礎（如果贈與時的價值低於他們的成本，計算損失時有特別規則）。這和繼承差很多，要找出父母當初的購買成本，可能需要花一些功夫。',
  },
  {
    q: '這間公寓是我搬家前的自住房屋，可以排除利得嗎？',
    a: 'IRS Publication 523 說明，出售符合所有權與使用測試的房屋，最多可排除 $250,000 的利得（大多數合併申報的夫妻為 $500,000）。你的海外房屋與時間點是否符合，取決於你的情況 — 申報前請先找人檢視。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '持有、出租、繼承與出售海外房產 — 整體說明。',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '海外出租房產與美國稅務',
    desc:  '如果房子曾經出租，折舊與租金申報會影響出售的結果。',
  },
  {
    href: '/library/investment/transfer-own-money-to-us',
    cat:  'Investments & Foreign Accounts',
    title: '把自己海外帳戶的錢匯到美國，要繳稅嗎？',
    desc:  '為什麼匯款與錢的來源是兩個不同的問題。',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與和海外遺產，在美國申報有什麼不同？',
    desc:  '繼承與受贈的海外房產：成本基礎不同，申報也不同。',
  },
]

export default function SoldForeignPropertyTransferZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外賣房後把錢匯到美國：要申報什麼？ | AskLinTax 繁體中文',
      description: '在台灣或海外賣了房子？出售與匯款是兩件事。說明美國居民如何申報利得、以美元計算成本基礎、使用外國稅額抵免，以及 FBAR 與 Form 8938。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          這裡有兩件事，稅務處理非常不同：
        </p>
        <ul>
          <li><strong>出售。</strong>身為美國公民或居民，出售海外房產要在出售那一年的美國稅表上申報。如果有利得，可能要繳稅 — 即使你已經在當地繳過稅，即使錢從未離開那個國家。</li>
          <li><strong>匯款。</strong>把售屋款匯到你的美國帳戶，不是收入。它不會增加稅，也不會減少稅。</li>
        </ul>
        <p>
          售屋款放在海外銀行帳戶期間，也可能影響<strong>海外帳戶申報</strong>。
        </p>

        <ArticleTable
          head={['步驟', '要看什麼']}
          rows={[
            ['1. 你怎麼取得這個房產？', '自己買的、繼承的，還是受贈的 — 這決定你的起始成本基礎'],
            ['2. 以美元計算，它花了多少錢？', '購買價格與重大改良，通常以付款時的匯率換算'],
            ['3. 以美元計算，你收到多少錢？', '售價減去出售費用，通常以出售時的匯率換算'],
            ['4. 有沒有利得？', '收到的金額減去成本基礎 — 在出售那一年申報'],
            ['5. 有沒有排除或抵免？', '自住房屋排除（如果符合資格），以及合格外國所得稅的外國稅額抵免'],
            ['6. 錢放在哪裡？', '存放售屋款的海外帳戶，要計入 FBAR 與 Form 8938'],
          ]}
        />

        <h2>成本基礎：你怎麼取得房產很重要</h2>
        <ul>
          <li><strong>自己買的：</strong>成本基礎通常從你支付的價格開始，加上重大改良。</li>
          <li><strong>繼承的：</strong>成本基礎通常是死亡日的公平市價（或遺產選擇的替代評價日的價值）。</li>
          <li><strong>贈與人生前送的：</strong>成本基礎通常是贈與人的調整後成本基礎；如果贈與時的價值低於他們的成本，計算損失時有特別規則。</li>
        </ul>
        <p>
          差別可能很大。父母幾十年前買的公寓，如果是<strong>送給</strong>你，成本基礎很低；如果是你<strong>繼承</strong>的，成本基礎接近市價。請見<a href="/zh-tw/library/investment/foreign-gift-vs-inheritance/">海外贈與和海外遺產，在美國申報有什麼不同？</a>
        </p>

        <h2>匯率：你的利得以美元衡量</h2>
        <p>
          美國稅表上的金額必須以美元表示，而 IRS 的一般規則是，每個項目依你付款或收款當時的匯率換算。因為成本與售價常常是用相隔多年的匯率換算，你在美國的利得可能比當地貨幣計算的利得更大，也可能更小。
        </p>
        <h3>例子</h3>
        <p>
          美國居民 Wei 當年以新台幣 1,000 萬元買了台北的一間公寓，當時新台幣 1 元 = 0.030 美元（成本：30 萬美元）。2025 年她以新台幣 1,200 萬元出售，當時新台幣 1 元 = 0.033 美元（售價：39.6 萬美元）。假設沒有改良，為簡化也不計出售費用。她以新台幣計算的利得是 20%，但以美元計算的利得是 9.6 萬美元 — 32% — 因為新台幣升值了。如果匯率往另一個方向走，美國的利得可能比新台幣利得小，甚至變成損失。（匯率為舉例用，不是實際歷史匯率。）
        </p>
        <p>
          外幣房貸在償還時，可能另外產生匯兌損益。這需要專業人士檢視。
        </p>

        <h2>外國稅與外國稅額抵免</h2>
        <p>
          如果當地國家對你的利得課稅，而且那是合格的外國<strong>所得</strong>稅，你或許可以申請外國稅額抵免（Form 1116）或列為扣除，避免同一筆利得被完整課兩次稅。某些與房產相關的稅 — 例如移轉稅或登記稅 — 可能不屬於所得稅。請找人檢視具體是哪一種外國稅。
        </p>

        <h2>是你的自住房屋嗎？</h2>
        <p>
          IRS Publication 523 說明，出售符合所有權與使用測試的房屋，最多可排除 $250,000 的利得（大多數合併申報的夫妻為 $500,000）。如果你曾把這個海外房產當作主要住所，請問稅務專業人士你的出售是否符合資格。如果這個房產曾經出租，折舊與出租紀錄也會影響結果 — 請見<a href="/zh-tw/library/rental/foreign-rental-property/">海外出租房產與美國稅務</a>。
        </p>

        <h2>匯款：會觸發什麼、不會觸發什麼</h2>
        <ul>
          <li><strong>不是收入：</strong>把自己的售屋款匯到美國，不是應稅事件。請見<a href="/zh-tw/library/investment/transfer-own-money-to-us/">把自己海外帳戶的錢匯到美國，要繳稅嗎？</a></li>
          <li><strong>FBAR：</strong>如果售屋款（加上你其他海外帳戶）在這一年中任何時候超過 $10,000，那一年就需要申報 FBAR — 即使帳戶現在已經清空。</li>
          <li><strong>Form 8938：</strong>存放售屋款的海外帳戶，會計入你的特定海外金融資產。直接持有的不動產本身，不在 FBAR 或 Form 8938 上申報。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
          <li><strong>不是贈與：</strong>你自己的售屋款不需要申報 Form 3520。但如果這個房產是從非居民繼承的，收到遺產的那一年可能需要申報 Form 3520。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 沒有一體適用的答案</div>
          <p>兩個人賣出類似的公寓，美國的稅可能差很多，取決於他們如何取得房產、何時成為美國居民、匯率、在海外繳的稅，以及那是自住還是出租。請用本指南整理事實，而不是用來省略計算。</p>
        </div>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>買賣契約與價格（或遺產文件與死亡日的估價，或贈與文件與贈與人的成本）</li>
          <li>重大改良的紀錄，包括日期與金額</li>
          <li>出售契約、結算單與出售費用</li>
          <li>外國稅的核定與繳納證明</li>
          <li>每個金額使用的匯率及其來源</li>
          <li>任何存放過售屋款的海外帳戶對帳單</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          出售海外不動產幾乎都值得找專業人士 — 特別是房產是繼承或受贈的、曾經出租、有外幣房貸、透過公司持有，或已在當地課稅。專業人士也可以確認所得稅協定是否會影響結果。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

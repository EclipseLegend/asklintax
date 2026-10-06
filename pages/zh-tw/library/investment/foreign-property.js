import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-property.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-property',
  sourceHash:      '28946d7fd2a1',
  id:            '25',
  title:         '海外房產：美國納稅人需要知道的事',
  titleEn:       'Foreign property: what U.S. taxpayers need to know',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人直接持有的海外不動產。透過外國公司持有的房產、外幣房貸，以及出售海外主要住所，需要專業檢視',
  persona:       ['在台灣或中國擁有房屋或公寓的人', '繼承海外父母房產的人', '保留母國房產的新移民', '綠卡持有人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '擁有海外房產本身不需要繳稅，直接持有的不動產也不需要在 FBAR 或 Form 8938 上申報。你必須申報的是它產生的收入（例如租金），以及出售時的任何利得。如果房產是從非居民繼承來的，請確認是否需要申報 Form 3520。',
  sources: [
    { label: 'IRS — Form 8938 與 FBAR 申報要求比較（Comparison of Form 8938 and FBAR requirements）', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — Schedule A（Form 1040）填寫說明，line 5b', url: 'https://www.irs.gov/instructions/i1040sca' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person：遺贈與 Form 3520）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — 外幣與匯率（Foreign currency and currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
    { label: 'IRS Publication 523 — 出售自住房屋（Selling Your Home）', url: 'https://www.irs.gov/publications/p523' },
  ],
}

const FAQS = [
  {
    q: '我在台灣有一間公寓，需要告訴 IRS 嗎？',
    a: '光是擁有它，不需要。直接持有的海外不動產，不需要在 FBAR 或 Form 8938 上申報。你要申報的是它產生的收入（例如租金），以及出售時的任何利得。如果你是透過外國公司持有，可能改為需要申報這家公司。',
  },
  {
    q: '我自住的台灣房屋所繳的房屋稅，可以扣除嗎？',
    a: '不能當作州與地方不動產稅扣除。2025 年的 Schedule A 填寫說明指出，你在不動產上繳納的外國稅款不要填入 line 5b。如果房產有出租，請參閱我們的海外出租房產指南，並向稅務專業人士確認處理方式。',
  },
  {
    q: '我繼承了父母在台灣的房子，需要繳美國的稅嗎？',
    a: '遺產對你來說通常不是收入。但如果這一年來自非居民父母（或他們的海外遺產）的遺贈與贈與合計超過 $100,000，你就必須在 Form 3520 上申報。房產之後產生的租金，以及出售時的任何利得，都要申報。',
  },
  {
    q: '我賣了台灣的公寓，利得要怎麼用美元計算？',
    a: '美國稅表上的金額必須以美元表示，IRS 的一般規則是每一筆都用付款或收款當時的匯率換算。這通常代表購買成本用購買日的匯率換算，出售價格用出售日的匯率換算。匯率變動可能讓以美元計算的利得與以新台幣計算的利得差很多，所以出售時最好請專業人士檢視。',
  },
  {
    q: '我出售時已經在台灣繳了稅，會被重複課稅嗎？',
    a: '不一定。如果你就同時被美國課稅的所得繳納了符合資格的外國所得稅，你可能可以申請外國稅額抵免（Form 1116）或列為扣除。並不是每一種外國稅都符合資格，請查看相關規則或諮詢專業人士。',
  },
  {
    q: '把出售所得的錢匯回美國，會產生更多稅嗎？',
    a: '不會。移轉你自己的錢不是收入。不過，這筆款項放在海外銀行帳戶期間，會計入 FBAR 的 $10,000 測試與你的 Form 8938 門檻。',
  },
]

const RELATED = [
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '海外出租房產與美國稅務',
    desc:  '如果你出租海外房產：申報租金、費用、折舊與匯率換算。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '為什麼海外銀行帳戶要申報，而海外房屋通常不用。',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '從非居民父母繼承的房產，可能需要申報 Form 3520。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '海外房產的租金與利得，都是美國居民全球所得的一部分。',
  },
]

export default function ForeignPropertyZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '在台灣或海外擁有房產：美國稅務規則 | AskLinTax 繁體中文',
      description: '台灣的房子要向 IRS 申報嗎？直接持有的海外不動產不用申報 FBAR 或 Form 8938，但租金、出售利得與大額遺產都有美國申報規則。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>擁有海外房產：哪些要申報、哪些不用</h2>
        <p>
          許多家庭在台灣、中國或其他地方擁有房屋或公寓 — 有的是搬來美國前買的，有的是從父母繼承的。對美國公民或居民來說，關鍵是把<strong>擁有</strong>房產，和房產<strong>產生的錢</strong>分開來看。
        </p>

        <ArticleTable
          head={['情況', '美國的處理方式（公民與居民外國人）']}
          rows={[
            ['單純擁有房產', '不是應稅事件'],
            ['直接持有的房產 — FBAR', '不用申報'],
            ['直接持有的房產 — Form 8938', '不用申報'],
            ['透過外國公司持有的房產', '公司權益可能是 Form 8938 上的特定海外金融資產；也可能適用其他表格'],
            ['出租', '租金收入要申報（全球所得）'],
            ['出售', '任何利得都要申報；已繳的外國稅可能可以抵免'],
            ['從非居民繼承', '通常不是收入；如果這一年來自有親屬關係的外國人的贈與與遺贈超過 $100,000，要申報 Form 3520'],
          ]}
        />

        <h2>為什麼房屋與銀行帳戶的處理方式不同</h2>
        <p>
          FBAR 涵蓋<strong>金融帳戶</strong>，Form 8938 涵蓋<strong>特定海外金融資產</strong>。你直接持有的不動產兩者都不是，所以 IRS 對這兩份表格的比較，把「直接持有的海外不動產」列為兩份表格都不用申報。
        </p>
        <p>
          兩個重要的例外：
        </p>
        <ul>
          <li><strong>透過外國實體持有：</strong>如果房產是由你擁有權益的外國公司持有，這家公司本身就是 Form 8938 上的特定海外金融資產，而它的價值包含這筆不動產。外國實體也可能帶來其他美國申報 — 請尋求專業協助。</li>
          <li><strong>與房產相關的資金：</strong>收進台灣銀行帳戶的租金，或存放在那裡的出售所得，都會計入 FBAR 的 $10,000 測試與你的 Form 8938 門檻。</li>
        </ul>

        <h2>海外房屋的房屋稅</h2>
        <p>
          2025 年的 Schedule A 填寫說明指出，你在不動產上繳納的外國稅款，<strong>不要</strong>當作州與地方不動產稅填入。所以你在台灣自住房屋的房屋稅，通常不能列為分項扣除額。如果房產是出租用的，費用就在出租的部分處理 — 請參閱 <a href="/zh-tw/library/rental/foreign-rental-property/">海外出租房產與美國稅務</a>。
        </p>

        <h2>繼承海外父母的房產</h2>
        <p>
          遺贈對受領人來說通常不是收入。但來自非居民外國人或海外遺產的遺產，屬於 Form 3520 申報規則的範圍：如果這一年來自有親屬關係的外國人的贈與與遺贈合計<strong>超過 $100,000</strong>，你必須在 Form 3520 Part IV 申報。房屋以公平市價申報。請參閱 <a href="/zh-tw/library/investment/form-3520/">Form 3520：申報大額海外贈與</a>。
        </p>

        <h2>出售海外房產</h2>
        <p>
          美國公民與居民外國人要就<strong>全球所得</strong>繳稅，所以出售海外房產的利得要在美國稅表上申報 — 即使這筆交易在當地已經課稅，即使你從未把錢匯回美國。想一步步了解出售與之後匯款各要申報什麼，請見<a href="/zh-tw/library/investment/sold-foreign-property-transfer/">海外賣房後把錢匯到美國，要申報什麼？</a>
        </p>
        <h3>匯率很重要</h3>
        <p>
          美國稅表上的一切都必須以美元表示，IRS 的一般規則是每一筆都用付款或收款當時的匯率換算。這通常代表：
        </p>
        <ul>
          <li>你的<strong>成本</strong>（購買價格與改良費用）用你付款當時的匯率換算</li>
          <li>你的<strong>出售價格</strong>用出售當時的匯率換算</li>
        </ul>
        <p>
          如果新台幣在購買與出售之間變動很大，以美元計算的利得可能和以新台幣計算的利得差很多 — 可能更大，也可能更小。外幣房貸又多了一層複雜度：償還房貸可能產生另一筆匯兌損益。這兩種情況都值得請專業人士檢視。
        </p>
        <h3>外國稅與外國稅額抵免</h3>
        <p>
          如果你就這筆利得繳納了符合資格的外國<strong>所得</strong>稅，你可能可以用 Form 1116 申請外國稅額抵免（或列為扣除），讓同一筆利得不會被完全重複課稅。
        </p>
        <h3>那是你的主要住所嗎？</h3>
        <p>
          IRS Publication 523 說明，出售符合擁有與居住測試的房屋時，最多可以排除 $250,000 的利得（多數夫妻合併申報為 $500,000）。如果你曾把這間海外房屋當作主要住所，申報前請先請稅務專業人士確認你的出售是否符合資格。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 海外房產要保留的紀錄</div>
          <p>購買合約與價格、重大改良的日期與費用、繼承文件與房產在過世當日的價值、出售合約、成交費用、已繳的外國稅，以及你使用的匯率。有了這些集中保存的資料，多年後出售會容易得多。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

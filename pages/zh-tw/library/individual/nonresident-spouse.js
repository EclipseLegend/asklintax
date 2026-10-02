import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/nonresident-spouse.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'nonresident-spouse',
  sourceHash:      'f7052de5b1e3',
  id:            '27',
  title:         '非居民配偶：我們可以合併報稅嗎？',
  titleEn:       'Nonresident spouse: can we file jointly?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋將非居民配偶視為美國居民的選擇，以及主要的替代方案。租稅協定主張、社會安全稅與聯邦醫療保險稅（Social Security and Medicare Tax），以及州稅表，不在本指南範圍內',
  persona:       ['配偶住在台灣或中國的美國公民或居民', '配偶尚未搬來的 H-1B 與綠卡持有人', '新婚夫妻', '年中才抵達美國的配偶'],
  relatedJourney: ['剛到美國', '第一次報稅'],
  actionRequired: '報稅前，用兩種方式比較你的美國稅額：夫妻分開申報（Married Filing Separately，或在符合資格時以戶長〔Head of Household〕申報），以及選擇將配偶視為美國居民後合併申報。這項選擇會把配偶的全球所得納入美國稅表，而且一旦終止，一輩子只能做一次。',
  sources: [
    { label: 'IRS — 非居民配偶（Nonresident spouse）', url: 'https://www.irs.gov/individuals/international-taxpayers/nonresident-spouse' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens：Nonresident Spouse Treated as a Resident；Choosing Resident Alien Status）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 雙重身分者的課稅（Taxation of dual-status individuals）', url: 'https://www.irs.gov/individuals/international-taxpayers/taxation-of-dual-status-individuals' },
    { label: 'IRS — Form 8938 填寫說明（特定個人，specified individuals）', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: '我太太住在台灣，從來沒來過美國。我們可以合併報稅嗎？',
    a: '可以，如果在稅務年度結束時，一方是美國公民或居民，另一方不是，你們可以選擇把非居民配偶視為美國居民，並合併申報。作為交換，她的全球所得 — 包括她在台灣的薪資 — 要在合併的美國稅表上申報。',
  },
  {
    q: '我的非居民配偶需要 SSN 或 ITIN 嗎？',
    a: '需要。如果你的配偶是非居民，不論你合併申報還是分開申報，配偶都必須有社會安全號碼（SSN）或個人納稅識別號碼（ITIN）。如果配偶不符合申請 SSN 的資格，請用 Form W-7 申請 ITIN。',
  },
  {
    q: '我可以改用戶長身分申報嗎？',
    a: '可能可以。如果你不做這項選擇，而且你為某些受扶養人或親屬支付了維持住所一半以上的費用，你可能可以用戶長（Head of Household）身分申報 — 你的非居民配偶不算符合資格的人。',
  },
  {
    q: '做了這項選擇之後，每年都必須合併申報嗎？',
    a: '不用。選擇的第一年必須合併申報。之後幾年可以合併或分開申報 — 但在選擇被暫停或終止之前，你們兩人都會繼續被視為美國居民，並申報全球所得。',
  },
  {
    q: '我們可以撤銷這項選擇嗎？',
    a: '任何一方都可以在選擇應終止那一年的稅表截止日前，附上簽名的撤銷聲明來撤銷。但選擇一旦終止 — 不論是因為撤銷、死亡、合法分居，或 IRS 因紀錄不足而終止 — 你們兩人以後任何一年都不能再做這項選擇，即使是與其他人結婚也一樣。',
  },
  {
    q: '我們報稅時漏了做這項選擇，還能補做嗎？',
    a: '可以在合併的修正稅表（Form 1040-X）上補做，期限是原稅表申報日起 3 年內，或該年度繳稅日起 2 年內，以較晚者為準。如果補做，之後年度已申報的稅表也都必須修正。',
  },
  {
    q: '這項選擇會影響我們的海外帳戶申報嗎？',
    a: '可能會。Form 8938 填寫說明把為了合併申報而選擇被視為居民的非居民外國人，列為「特定個人」（Specified Individual），所以你配偶的海外金融資產可能要納入 Form 8938 申報。FBAR 規則如何適用於你的配偶，請諮詢專業人士。',
  },
]

const RELATED = [
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: '雙重身分報稅：抵達或離開美國的那一年',
    desc:  '如果你的配偶在年中搬到美國，就會涉及雙重身分規則與另一項選擇。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '做這項選擇代表你配偶的海外收入要在美國申報 — 這裡說明怎麼運作。',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '先確認你自己的居民身分 — 這項選擇要求一方是公民或居民。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '無法取得 SSN 的非居民配偶，不論合併或分開申報，都需要 ITIN。',
  },
]

export default function NonresidentSpouseZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '非居民外國人配偶：可以合併報稅嗎？選擇居民身分 | AskLinTax 繁體中文',
      description: '配偶不是美國居民？比較夫妻分開申報、戶長，以及將配偶視為居民的選擇 — 包括全球所得、ITIN，以及如何做出或終止這項選擇。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>你的情況</h2>
        <p>
          你是美國公民或美國稅務居民 — 也許持 H-1B，也許是綠卡持有人 — 而你的配偶住在台灣、中國或其他地方，<strong>不是</strong>美國稅務居民。已婚夫妻通常在合併申報與分開申報之間選擇，但非居民配偶會改變你的選項。
        </p>
        <p>
          IRS 讓你選擇：在稅務上把配偶視為<strong>美國居民</strong>並合併申報，或者不這麼做 — 自己單獨申報。
        </p>

        <h2>三個主要選項</h2>
        <ArticleTable
          head={['選項', '怎麼運作', '主要取捨']}
          rows={[
            ['夫妻分開申報', '你申報自己的稅表；不包括你的配偶', '適用夫妻分開申報的稅率與規則；配偶的海外收入不會出現在你的美國稅表上'],
            ['戶長', '如果你為符合資格的受扶養人或親屬（不是你的配偶）支付了維持住所一半以上的費用，可能可以使用', '稅率比分開申報好，但前提是你有符合資格的人'],
            ['做出選擇後合併申報', '你選擇把非居民配偶視為美國居民並合併申報', '適用合併申報的稅率與扣除額，但配偶的全球所得要被美國課稅'],
          ]}
        />

        <h2>這項選擇：把配偶視為美國居民</h2>
        <p>
          如果在稅務年度結束時，一方是美國公民或居民，另一方不是，你們可以選擇把非居民配偶視為美國居民。本指南稱之為<strong>這項選擇</strong>。如果你們做出選擇：
        </p>
        <ul>
          <li>在選擇有效的每一年，你們兩人在聯邦所得稅上都被視為美國居民。</li>
          <li>做出選擇的那一年，你們<strong>必須合併申報</strong>。之後幾年可以合併或分開申報。</li>
          <li>除非選擇被暫停或終止，<strong>每一方都要申報自己在該年度及之後所有年度的全部全球所得</strong>。</li>
          <li>選擇有效期間，你們兩人一般都不能以外國居民的身分主張租稅協定優惠。</li>
          <li>在社會安全稅與聯邦醫療保險稅的預扣上，非居民配偶仍可能被視為非居民。</li>
        </ul>

        <h3>如何做出選擇</h3>
        <p>在第一年的合併稅表上，附上一份由<strong>夫妻雙方</strong>簽名的聲明，內容必須包括：</p>
        <ul>
          <li>一份聲明，表示在稅務年度最後一天，一方不是美國公民或居民，另一方是，而且你們選擇整年都被視為美國居民</li>
          <li>每一方的姓名、地址與識別號碼（SSN 或 ITIN）</li>
        </ul>
        <p>
          你們也可以之後在<strong>合併的修正稅表</strong>（Form 1040-X）上做出選擇，期限是原稅表申報日起 3 年內，或繳稅日起 2 年內，以較晚者為準。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 這是一輩子只有一次的選擇</div>
          <p>這項選擇會持續到被暫停或終止為止。如果任何一方撤銷、任何一方過世、你們合法分居，或 IRS 因紀錄不足而終止，選擇就會結束。一旦結束，你們兩人都不能再做這項選擇 — 即使與其他人結婚也一樣。</p>
        </div>

        <h3>選擇被暫停的情況</h3>
        <p>
          如果之後某一年，你們<strong>兩人</strong>在任何時候都不是美國公民或居民 — 例如你們整年都住在美國境外 — 這項選擇就不適用於那一年。如果你們之中有人再度成為美國居民，選擇會恢復生效。
        </p>

        <h2>應該做這項選擇嗎？實際比較</h2>
        <p>
          Kevin 持 H-1B 簽證，是美國居民，領美國薪資。他的太太 Amy 住在台灣，是非居民外國人，領台灣薪資。
        </p>
        <ArticleTable
          head={['', 'Kevin 以夫妻分開申報', '做出選擇後合併申報']}
          rows={[
            ['Amy 的台灣薪資是否列入美國稅表', '否', '是 — 換算成美元'],
            ['稅率與標準扣除額', '夫妻分開申報', '夫妻合併申報'],
            ['Amy 繳的台灣所得稅', '無關', '可能符合外國稅額抵免'],
            ['Amy 的台灣帳戶', '不列入 Kevin 的 Form 8938', 'Amy 成為 Form 8938 的特定個人'],
            ['Amy 需要 SSN 或 ITIN', '需要', '需要'],
          ]}
        />
        <p>
          哪個選項比較省，要看夫妻雙方的收入、扣除額與任何外國稅額抵免 — 合併申報可以適用合併的稅率與扣除額，但也會把 Amy 的全球所得加進美國稅表。唯一的方法是在報稅前<strong>兩種方式都算一次</strong>。
        </p>

        <h2>如果你的配偶在年中搬到美國</h2>
        <p>
          年中抵達、年底是美國居民的配偶，那一年通常是<strong>雙重身分</strong>（Dual-Status）納稅人。另有一項相關的選擇，讓年底與美國公民或居民結婚的雙重身分配偶，<strong>整年</strong>都被視為居民並合併申報。請參閱 <a href="/zh-tw/library/individual/dual-status/">雙重身分報稅</a>。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>因為這項選擇影響長遠，而且一旦終止只能做一次，如果你的配偶有可觀的海外收入、投資或帳戶 — 或你們任何一方可能要依賴租稅協定 — 請稅務專業人士幫你試算。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

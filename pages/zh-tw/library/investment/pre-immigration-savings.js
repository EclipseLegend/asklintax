import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/pre-immigration-savings.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'pre-immigration-savings',
  sourceHash:      'f5f9d3114e58',
  id:            '50',
  title:         '搬來美國以前就有的海外存款，需要申報嗎？',
  titleEn:       'I had this money before moving to America — does that change FBAR or Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '把成為美國居民之前累積的存款在所得稅上的處理，和存放這些存款的帳戶在 FBAR 與 Form 8938 上的申報分開說明。抵美那一年的申報期間與租稅協定主張，需要個別檢視',
  persona:       ['存款還留在台灣、中國或香港的新移民', '保留原居住國帳戶的綠卡持有人', '打算把存款移到美國的人', '協助剛抵美親人的家庭'],
  relatedJourney: ['剛到美國', '跨境財務'],
  actionRequired: '把兩個答案分開：成為美國居民之前賺到的存款，一般不會因為它存在或被移動就再被課稅 — 但存放這些存款的海外帳戶，在你受這些規定約束的期間，仍可能要申報 FBAR 或 Form 8938。',
  sources: [
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Form 8938 填寫說明（specified individual 與申報期間）', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（居民身分開始日）', url: 'https://www.irs.gov/publications/p519' },
  ],
}

const FAQS = [
  {
    q: '這些錢是我成為美國納稅人之前賺的，帳戶還要申報嗎？',
    a: '帳戶仍然可能要申報。FBAR 和 Form 8938 看的是你身為美國人（U.S. person）或 specified individual 期間的帳戶與金額 — 不是錢當初什麼時候賺到的。',
  },
  {
    q: '我搬來美國後，舊存款現在要繳稅嗎？',
    a: '一般來說，成為美國居民之前賺到的存款，不會因為放在帳戶裡、或你把它移到美國，就再被課稅。要繳稅的是你成為居民期間賺到的收入 — 例如這些存款的利息。',
  },
  {
    q: '我打算把錢匯到美國，匯款要繳稅嗎？',
    a: '一般不用。移動自己的錢不是收入。換匯金額很大，或為了籌錢而賣出投資，可能另有問題 — 請見下方連結的匯款指南。匯款也不會改變帳戶存在的那一年 FBAR 或 Form 8938 的答案。',
  },
  {
    q: '我是年中才抵達的，哪些餘額要算？',
    a: 'Form 8938 的填寫說明表示，申報期間從你的居民身分開始日起算。FBAR 方面，本指南查閱的官方資料，並沒有說明抵美那一年抵達前的餘額怎麼處理，所以那一年請找專業人士檢視。',
  },
]

const RELATED = [
  {
    href: '/library/investment/transfer-own-money-to-us',
    cat:  'Investments & Foreign Accounts',
    title: '把自己海外帳戶的錢匯到美國，要繳稅嗎？',
    desc:  '為什麼移動自己的存款不是收入。',
  },
  {
    href: '/library/investment/new-us-resident-foreign-accounts',
    cat:  'Investments & Foreign Accounts',
    title: '剛搬來美國，原本的台灣／海外帳戶要申報嗎？',
    desc:  '抵美那一年，一步步說明。',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '存放存款的帳戶，合計門檻怎麼算。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '成為居民後存款賺到的利息是收入。',
  },
]

export default function PreImmigrationSavingsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '移民前存款要申報嗎？搬來美國以前的海外存款與 FBAR | AskLinTax 繁體中文',
      description: '移民前存下的錢一般不會再被課稅 — 但存放這些錢的海外帳戶，仍可能要申報 FBAR 或 Form 8938。四個分開的問題，一次說清楚。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          「這些錢是我來美國以前就有的」只回答了<strong>一個</strong>問題 — 這筆錢本身會不會再被課稅 — 但沒有回答其他問題。成為美國居民之前賺到的存款，一般不會因為存在或被移動就再被課稅。但存放這些存款的<strong>海外帳戶</strong>，在你受這些規定約束的期間，仍可能要在 FBAR 或 Form 8938 上<strong>申報</strong>。
        </p>

        <h2>四個分開的問題</h2>
        <ArticleTable
          head={['問題', '簡短答案']}
          rows={[
            ['1. 原本的存款，會因為在成為美國居民前就存在而現在要繳稅嗎？', '一般不會 — 不會因為存在或被移動就再被課稅'],
            ['2. 海外帳戶要申報 FBAR 或 Form 8938 嗎？', '可能要，在你是美國人（FBAR）或 specified individual（Form 8938）、且達到門檻的期間'],
            ['3. 帳戶賺到的收入要繳稅嗎？', '你身為美國居民期間賺到的利息等收入，要在稅表上申報'],
            ['4. 你的美國居民身分（與申報義務）從什麼時候開始？', '依綠卡測試或實質居住測試，以及你的居民身分開始日決定'],
          ]}
        />

        <h2>1. 這筆錢本身</h2>
        <p>
          美國居民要就全球所得繳稅 — 也就是身為居民期間賺到的收入。你成為居民之前，用薪水或其他收入存下的錢，不會只因為放在台灣的帳戶裡、或你把它匯到美國，就再算一次收入。移動自己的錢不是收入。請見<a href="/zh-tw/library/investment/transfer-own-money-to-us/">把自己海外帳戶的錢匯到美國，要繳稅嗎？</a>
        </p>

        <h2>2. 存放這筆錢的帳戶</h2>
        <p>
          FBAR 問的是：美國人的海外金融帳戶合計金額，是否在這個日曆年度中任何時候超過 $10,000。Form 8938 問的是：specified individual 的海外金融資產是否超過 Form 8938 的門檻。兩者都不問錢是什麼時候賺的。所以「這是以前的錢」並不是帳戶申報的例外。
        </p>

        <h2>3. 存款現在賺到的收入</h2>
        <p>
          你成為居民之後，這些海外帳戶的利息、股利與資本利得，都是你全球所得的一部分，要換算成美元在稅表上申報。
        </p>

        <h2>4. 從什麼時候開始</h2>
        <p>
          你的美國居民身分，一般從依綠卡測試或實質居住測試決定的居民身分開始日起算。Form 8938 的填寫說明表示，部分年度的 specified individual，申報期間從那天開始。至於抵美那一年的 FBAR，本指南查閱的官方資料，並沒有說明抵達前的餘額怎麼處理 — 請見<a href="/zh-tw/library/investment/new-us-resident-foreign-accounts/">剛搬來美國，原本的台灣／海外帳戶要申報嗎？</a>，並請專業人士檢視那一年。
        </p>

        <h2>例子</h2>
        <p>
          Chen 在台北工作了 15 年，在 2024 年持綠卡搬到美國之前，在台灣帳戶存了相當於 $80,000。2025 年是她完整的居民年度，這 $80,000 不會再被課稅。但這個帳戶超過 $10,000，所以 Chen 要申報 2025 年的 FBAR，依她的報稅身分檢查 Form 8938 門檻，並在稅表上申報這個帳戶 2025 年的利息。她在 2025 年稍晚把其中 $50,000 匯到美國，並不會改變上述任何答案。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 兩種相反的錯誤</div>
          <p>有些人以為舊存款搬來美國後就變成應稅收入；也有些人以為舊存款可以讓帳戶免於申報。兩種都不對。存款一般不會再被課稅；帳戶仍然可能要申報。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

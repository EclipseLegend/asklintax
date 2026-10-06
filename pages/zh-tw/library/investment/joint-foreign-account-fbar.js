import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/joint-foreign-account-fbar.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'joint-foreign-account-fbar',
  sourceHash:      '4d6126d7326f',
  id:            '49',
  title:         '夫妻共同海外帳戶，FBAR 怎麼報？',
  titleEn:       'Joint foreign accounts: how do married couples file FBAR?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋已婚美國人共同持有的海外帳戶如何申報 FBAR，包括配偶代報的例外。Form 8938 有自己的夫妻規定，本文不把它套用到 FBAR',
  persona:       ['在台灣、中國或其他國家有夫妻共同帳戶的人', '只有一方配偶是美國人的夫妻', '其中一方另有個人海外帳戶的夫妻', '對彼此帳戶有簽署權的配偶'],
  relatedJourney: ['跨境財務'],
  actionRequired: '對共同海外帳戶有財務利益的每一位美國人配偶，一般都要申報帳戶的全額。如果一方配偶所有應申報的帳戶都是和另一方共同持有，夫妻可以使用配偶代報的例外 — 由一方申報，雙方簽署 FinCEN Form 114a 並自行保存，不需要送出。',
  sources: [
    { label: 'FinCEN — 共同持有帳戶的申報（Reporting Jointly Held Accounts）', url: 'https://www.fincen.gov/reporting-jointly-held-accounts' },
    { label: 'FinCEN — 為配偶申報（Filing for Spouse）', url: 'https://www.fincen.gov/filing-spouse' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — International Practice Unit：FinCEN Form 114（FBAR）（美國居民的判定）', url: 'https://www.irs.gov/pub/fatca/int_practice_units/fincen-form114-fbar.pdf' },
    { label: 'FinCEN — 帳戶最高餘額的申報（Reporting Maximum Account Value）', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
  ],
}

const FAQS = [
  {
    q: '我們的台灣共同帳戶有 $16,000，是不是各報 $8,000？',
    a: '不是。FinCEN 的指引是，每一位共同持有人都要申報帳戶的全額。FBAR 沒有五五分這回事。',
  },
  {
    q: '可以只由我們其中一人申報嗎？',
    a: '可以，前提是符合配偶代報的例外：未申報那一方所有應申報的海外金融帳戶，都和申報的一方共同持有；申報的一方在按時申報的 FBAR 上列出所有這些共同帳戶；而且雙方都填寫並簽署 FinCEN Form 114a。Form 114a 自行保存，不隨 FBAR 送出。',
  },
  {
    q: '我自己另外有一個台灣帳戶，配偶不在上面。我們還能只報一份 FBAR 嗎？',
    a: '你不能用配偶例外，因為你應申報的帳戶不全是和配偶共同持有。這種情況下，夫妻各自申報 FBAR，而且每個人都要申報共同帳戶的全額。',
  },
  {
    q: '我們所得稅是合併申報，這樣可以只報一份 FBAR 嗎？',
    a: '所得稅的報稅身分不是判斷標準。配偶代報的例外看的是上面說的帳戶持有條件。也不要假設 Form 8938 的夫妻規定可以套用到 FBAR。',
  },
  {
    q: '我先生是非居民外國人，但我們選擇了合併報稅。他在 FBAR 上算美國人嗎？',
    a: 'IRS 指引表示，選擇把非居民配偶視為居民，並不會讓這位配偶在 FBAR 上成為居民。他有沒有 FBAR 申報義務，取決於他自己的身分 — 請找人檢視。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '每位配偶都要把共同帳戶的全額算進 $10,000 門檻。',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    desc:  '要申報的共同帳戶怎麼估值。',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: '非居民配偶：我們可以合併報稅嗎？',
    desc:  '一方配偶不是美國居民時的報稅身分選擇。',
  },
]

export default function JointForeignAccountFbarZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '夫妻共同海外帳戶，FBAR 怎麼報？ | AskLinTax 繁體中文',
      description: '夫妻在台灣或海外有共同帳戶：每位共同持有人都要申報帳戶全額、什麼情況下可由一方用 FinCEN Form 114a 代報，以及常見錯誤。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          兩個人共同持有一個海外金融帳戶時，<strong>每個人</strong>對它都有財務利益，每一位身為美國人的共同持有人，都要在 FBAR 上申報帳戶的<strong>全額</strong>。已婚夫妻有一個簡化方式：<strong>配偶代報的例外</strong>，可以由一方配偶為兩人申報一份 FBAR — 但必須符合它的條件。
        </p>

        <h2>規則一：每位共同持有人都算全額</h2>
        <p>
          FinCEN 的指引是，如果兩個人共同持有一個海外金融帳戶，兩人對帳戶都有財務利益，各自都必須申報帳戶的全額。這個全額也要算進每位配偶自己的 $10,000 合計門檻。FBAR 上不要把共同帳戶五五分。
        </p>

        <h2>規則二：配偶代報的例外</h2>
        <p>
          符合以下條件時，夫妻不需要各自申報 FBAR：
        </p>
        <ol>
          <li>未申報那一方<strong>所有</strong>應申報的海外金融帳戶，都和申報的一方共同持有；</li>
          <li>申報的一方在<strong>按時</strong>申報的 FBAR 上，列出所有和未申報一方共同持有的帳戶；而且</li>
          <li>雙方都填寫並簽署 <strong>FinCEN Form 114a</strong>（Record of Authorization to Electronically File FBARs）。</li>
        </ol>
        <p>
          Form 114a 要和你的紀錄一起保存 — 不隨 FBAR 送出。如果不符合例外，夫妻各自申報 FBAR，每個人都要申報共同帳戶的全額。
        </p>

        <ArticleTable
          head={['情況（夫妻都是美國人）', 'FBAR 怎麼報']}
          rows={[
            ['所有海外帳戶都是夫妻共同帳戶', '可依配偶例外由一方為兩人申報，並簽署 Form 114a'],
            ['其中一方另有對方不在上面的帳戶', '那一方不能用例外；夫妻各自申報，並各自申報共同帳戶的全額'],
            ['其中一方只對另一方的個人帳戶有簽署權', '簽署權本身就是 FBAR 申報的依據之一；請仔細檢查每位配偶的帳戶'],
          ]}
        />

        <h2>例子</h2>
        <p>
          Ming 和 Yu 都是美國居民，他們有一個台灣共同儲蓄帳戶，2025 年最高餘額 $16,000，沒有其他海外帳戶。兩人都有財務利益，各自都會申報 $16,000。因為兩人所有的帳戶都是共同帳戶，他們使用配偶代報的例外：Ming 按時申報一份 FBAR，列出這個共同帳戶，兩人簽署 Form 114a 並自行保存。
        </p>
        <p>
          如果 Yu 另外還有自己的台灣帳戶，例外就不再適用於她：他們要申報兩份 FBAR，每份都以全額 $16,000 申報共同帳戶，Yu 也要申報她自己的帳戶。
        </p>

        <h2>不要套用其他規定</h2>
        <ul>
          <li><strong>所得稅的報稅身分不是標準。</strong>合併申報所得稅，本身並不代表可以只報一份 FBAR。</li>
          <li><strong>Form 8938 不一樣。</strong>它有自己的夫妻門檻與規定，不要假設可以套用到 FBAR。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
          <li><strong>沒有五五分。</strong>不論是夫妻共同財產的觀念，或是假設各持一半，都不會改變 FBAR「每位共同持有人申報全額」的規則。</li>
          <li><strong>非居民配偶。</strong>IRS 指引表示，選擇把非居民配偶視為居民，不會改變 FBAR 上的居民身分。不是美國人的配偶，不會因為這個選擇而在 FBAR 上變成美國人。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

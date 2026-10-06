import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/transfer-own-money-to-us.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'transfer-own-money-to-us',
  sourceHash:      '00307718afb2',
  id:            '35',
  title:         '把自己海外帳戶的錢匯到美國，要繳稅嗎？',
  titleEn:       'I transferred my own money from overseas to the U.S. — is it taxable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋把自己的資金從海外帳戶移到美國的美國公民與居民外國人。說明哪些問題取決於匯款本身、哪些取決於錢的來源。透過外國公司或信託持有的資金、外幣債務，以及有未申報收入的年度，需要專業人士檢視',
  persona:       ['把存款帶到美國的新移民', '正在結清台灣或中國銀行帳戶的人', '在海外有存款的綠卡持有人', '在海外出售資產、正在移轉款項的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '把自己的錢匯過來，本身不是收入。真正要問的是：這筆錢從哪裡來、當初賺到時有沒有申報，以及在帳戶存在的每一年，你的海外帳戶是否需要申報 FBAR 或 Form 8938。',
  sources: [
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Schedule B（Form 1040）填寫說明，Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — 外幣與匯率（Foreign currency and currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
  ],
}

const FAQS = [
  {
    q: '我把台灣的存款匯到美國，需要告訴 IRS 嗎？',
    a: '稅表上沒有一欄是申報匯款本身的。你要申報的是本來就存在的東西：這筆錢產生的收入、你的海外帳戶（FBAR，可能還有 Form 8938，以及 Schedule B 上關於海外帳戶的問題），以及如果你為了籌這筆錢賣了東西，所產生的利得。',
  },
  {
    q: '把自己的錢匯過來，算是要報 Form 3520 的贈與嗎？',
    a: '不算。你不能贈與給自己。Form 3520 Part IV 申報的是從外國人收到的贈與與遺產。在你自己的帳戶之間移動你自己的存款，不在那裡申報。',
  },
  {
    q: '這筆錢是我搬來美國之前，在台灣上班存下來的薪水。現在要繳稅嗎？',
    a: '匯過來並不會讓它變成應稅。這筆薪水當初是否要繳美國稅，取決於你賺到它時在美國的稅務身分 — 例如，在你成為美國居民之前賺的收入，通常與你身為居民期間賺的收入處理方式不同。你抵達美國的那一年，可能是雙重身分（dual-status）年度。',
  },
  {
    q: '匯完錢後我把海外帳戶關了，還需要申報 FBAR 嗎？',
    a: 'FBAR 看的是整個日曆年度。如果你的海外帳戶合計在這一年中任何時候超過 $10,000 — 包括你清空並關閉帳戶之前 — 那一年就需要申報 FBAR。',
  },
  {
    q: '把錢匯到美國，可以補救以前應該繳的稅嗎？',
    a: '不行。匯款不會改變收入在賺到時是否應稅，也不能取代漏報的 FBAR 或其他申報。如果以前年度有未申報的收入或漏報的表格，請找稅務專業人士討論如何更正。',
  },
  {
    q: '我的美國銀行問我這筆錢從哪裡來。這是 IRS 在問嗎？',
    a: '不是。銀行可能基於自身的法規遵循理由，詢問大額或跨國匯款的來源。請如實回答，並保留你自己關於資金來源的紀錄 — 這些紀錄在稅務上也用得到。',
  },
]

const RELATED = [
  {
    href: '/library/investment/pre-immigration-savings',
    cat:  'Investments & Foreign Accounts',
    title: '搬來美國以前就有的海外存款，需要申報嗎？',
    desc:  '舊存款一般不會再被課稅，但存放它們的帳戶仍可能要申報。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '每個海外帳戶都會帶出三個問題：利息、FBAR 與 Form 8938。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '為什麼錢的來源比錢放在哪裡更重要。',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: '海外賣房後把錢匯到美國，要申報什麼？',
    desc:  '如果這筆錢來自出售海外的房子或公寓。',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '如果這筆錢其實是家人的贈與，適用不同規則。',
  },
]

export default function TransferOwnMoneyZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '把自己的錢從海外匯到美國，要繳稅嗎？ | AskLinTax 繁體中文',
      description: '把自己在台灣、中國或海外的存款匯到美國，本身不是收入。真正重要的是：錢從哪裡來、海外帳戶申報（FBAR、Form 8938），以及要保留的紀錄。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          把<strong>你自己的錢</strong>從海外帳戶匯到你在美國的帳戶，<strong>本身不是收入</strong>，也不是贈與。決定你美國稅務的，不是這筆電匯。
        </p>
        <p>
          真正決定的是<strong>這筆錢的來歷</strong>：你怎麼賺到它、它放在海外時賺了什麼，以及它所在的帳戶是否需要申報。匯款既不會憑空產生原本沒有的稅，也無法補救以前漏掉的稅或申報。
        </p>

        <ArticleTable
          head={['問題', '取決於匯款嗎？', '實際上取決於什麼']}
          rows={[
            ['匯款本身是收入嗎？', '—', '不是。移動自己的資金不是收入。'],
            ['原本那筆錢要繳稅嗎？', '不是', '賺到時你在美國的稅務身分，以及收入的類型'],
            ['海外賺的利息要繳稅嗎？', '不是', '美國公民與居民要申報全球所得，包括海外利息'],
            ['我需要申報 FBAR 嗎？', '不是', '你的海外帳戶合計是否在這一年中任何時候超過 $10,000'],
            ['我需要申報 Form 8938 嗎？', '不是', '你的特定海外金融資產是否超過你的申報門檻'],
            ['我有沒有為了籌錢賣東西？', '不是', '出售可能產生要申報的利得，不論錢何時、在哪裡移動'],
          ]}
        />

        <h2>把匯款和資金來源分開</h2>
        <p>
          可以把這筆錢想成好幾層，每一層有自己的規則：
        </p>
        <ol>
          <li><strong>本金從哪裡來。</strong>薪水、事業收入、遺產、贈與或出售所得。如果這是你身為美國公民或居民時的收入，就應該在賺到的那一年申報。如果是在你成為美國居民之前賺的，通常處理方式不同 — 請見<a href="/zh-tw/library/individual/dual-status/">雙重身分報稅：抵達或離開美國的那一年</a>。</li>
          <li><strong>它在海外時賺了什麼。</strong>海外帳戶的利息、股利與利得，都是美國居民全球所得的一部分，在賺到的那一年申報 — 不論你有沒有把錢帶回來。</li>
          <li><strong>它放在哪裡。</strong>海外金融帳戶有自己的申報規定：FBAR（FinCEN Form 114）、可能還有 Form 8938，以及 Schedule B Part III 上關於海外帳戶的問題。</li>
          <li><strong>匯款本身。</strong>移動這筆錢是最不重要的一層。它不會產生收入。</li>
        </ol>

        <h2>帳戶存在的那一年，海外帳戶申報仍然適用</h2>
        <p>
          把海外帳戶清空並關閉，不會讓那一年的申報消失。FBAR 問的是你的海外帳戶合計是否在這個日曆年度中<strong>任何時候超過 $10,000</strong>。如果你 6 月從台灣匯了 $60,000 到美國並關閉帳戶，這個帳戶在那年稍早仍然超過 $10,000，所以那一年需要申報 FBAR。Form 8938 有另外、較高的門檻。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a>
        </p>

        <h2>實際例子</h2>
        <h3>搬來之前的存款</h3>
        <p>
          Hao 在台北工作了十年，2024 年持綠卡搬到美國。2025 年他把新台幣 300 萬元的存款匯到美國帳戶，並關閉台灣的帳戶。這筆匯款不是收入。2025 年，他要申報台灣帳戶在 2025 年產生的利息（換算成美元）、回答 Schedule B 上的海外帳戶問題，並因為帳戶在這一年中超過 $10,000 而申報 FBAR。他 2024 年的稅表是否也需要申報海外利息或帳戶，取決於他 2024 年的身分，可能是雙重身分。
        </p>
        <h3>出售所得</h3>
        <p>
          Mei 賣掉台灣證券帳戶裡的股票，把現金匯到美國。匯款不用繳稅，但出售可能要：身為美國居民，她要在出售的那一年以美元申報損益。如果這筆錢來自出售房子或公寓，請見<a href="/zh-tw/library/investment/sold-foreign-property-transfer/">海外賣房後把錢匯到美國，要申報什麼？</a>
        </p>
        <h3>其實是父母的錢</h3>
        <p>
          如果你的父母把錢存在他們名下的帳戶，再匯給你，那就不是你自己的錢 — 而是他們給你的贈與，適用 Form 3520 關於海外贈與的規定。請見<a href="/zh-tw/library/investment/foreign-gifts/">海外贈與：父母從海外匯來的錢要繳稅嗎？</a>
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 匯款無法修正過去</div>
          <p>把錢帶到美國，不會讓以前未申報的收入消失，也不能代替漏報的 FBAR 或 Form 8938。如果你發現以前年度申報不完整，請尋求專業建議來更正，而不是期待這筆匯款不被注意。</p>
        </div>

        <h2>匯率與美元金額</h2>
        <p>
          美國稅表上的所有金額都以美元表示。海外的利息與其他收入，依照 IRS 的外幣規定換算；出售的成本與售價，通常依照你付款與收款時的匯率換算。在某些情況下，把外幣兌換成美元本身也可能產生匯兌損益，而外幣貸款又會多一層複雜度。如果你要兌換大筆金額，或正在償還或持有外幣債務，請找人檢視匯率這一部分。
        </p>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>帳戶存在期間每一年的海外帳戶對帳單，包括最高餘額</li>
          <li>電匯確認單，顯示這是在你自己的帳戶之間轉帳</li>
          <li>顯示資金來源的紀錄（薪資單、買賣契約、遺產文件）</li>
          <li>你使用的匯率</li>
          <li>相關年度的 FBAR 與稅表副本</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          如果這筆錢是透過外國公司、信託或保險商品持有；以前年度可能有未申報的海外收入或漏報的 FBAR；你不確定自己何時成為美國居民；或大筆金額來自出售海外的房產或投資，請尋求協助。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

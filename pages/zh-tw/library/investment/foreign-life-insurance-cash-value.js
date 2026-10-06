import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-life-insurance-cash-value.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-life-insurance-cash-value',
  sourceHash:      'f6e1d249a1ff',
  id:            '47',
  title:         '海外儲蓄險／有現金價值的人壽保險要申報嗎？',
  titleEn:       'Foreign life insurance with cash value: is it reportable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋海外發行、有現金價值的人壽保險與年金契約，是否要在 FBAR 與 Form 8938 上申報。不涵蓋這類保單如何課稅、沒有現金價值的保單，以及保費、解約或身故給付的處理',
  persona:       ['有台灣、香港或中國儲蓄險的人', '持有海外年金契約的人', '保留移民前所買保單的新移民', '在海外替子女買保單的父母'],
  relatedJourney: ['跨境財務'],
  actionRequired: '確認你的海外保單有沒有現金價值（解約時可以拿回的金額）。如果有，就把它當作海外金融帳戶，算進 FBAR 的合計門檻，也可能是 Form 8938 的資產。保留保險公司顯示現金價值的對帳單。',
  sources: [
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'eCFR — 31 CFR 1010.350，海外金融帳戶申報規定（其他金融帳戶）', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Internal Revenue Manual 4.26.16，海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/instructions/i8938' },
  ],
}

const FAQS = [
  {
    q: '我在台灣的儲蓄險有解約金，FBAR 要算嗎？',
    a: '在 FBAR 的法規下，有現金價值的海外保險或年金保單，是應申報的「其他金融帳戶」。如果它有現金價值，就要算進你的 FBAR 合計門檻。',
  },
  {
    q: '保單要用什麼金額？',
    a: 'IRS 指引把保單的現金價值視為帳戶價值。FBAR 上，用這一年最高價值的合理估計，並用該年度最後一天的財政部匯率換算。',
  },
  {
    q: '這張保單還沒有付過我任何錢，也要申報嗎？',
    a: 'IRS 指引表示，有現金價值的保單不需要目前有收入給付，也會觸發申報。申報看的是現金價值，不是有沒有付錢給你。',
  },
  {
    q: '那沒有現金價值的定期壽險呢？',
    a: '本指南查閱的官方資料，描述的應申報保單是有現金價值的保單，並沒有逐一說明每種保單。如果你不確定自己的保單有沒有現金價值，請向保險公司或稅務專業人士確認，不要直接假設要報或不用報。',
  },
  {
    q: '保單的增值要繳稅嗎？',
    a: '本文只談申報。海外保單如何課稅，取決於契約內容以及保險與年金的稅務規定 — 請尋求專業建議。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '把保單的現金價值和其他海外帳戶加在一起。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '同一張保單，Form 8938 有自己的門檻。',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    desc:  '保單的估值與換算成美元。',
  },
]

export default function ForeignLifeInsuranceCashValueZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外儲蓄險／有現金價值的壽險要申報嗎？FBAR 與 Form 8938 | AskLinTax 繁體中文',
      description: '海外發行、有現金價值的人壽保險或年金契約，FBAR 和 Form 8938 都要申報。哪些算、現金價值怎麼用，以及本文不涵蓋的部分。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你持有<strong>海外發行、有現金價值的人壽保險或年金契約</strong>，它在美國是要申報的。IRS 對兩份表格的比較表，把它列為 FBAR 和 Form 8938 <strong>都</strong>要申報，各依自己的門檻。很多在台灣、香港或中國買了儲蓄險的人，對這點都很意外。
        </p>
        <p>
          關鍵字是<strong>「有現金價值」</strong>。本文不會把所有海外保單都當作要申報。
        </p>

        <ArticleTable
          head={['海外保單', 'FBAR', 'Form 8938']}
          rows={[
            ['外國公司發行、有現金價值的人壽保險或年金契約', '要申報 — 屬於「其他金融帳戶」', '要申報 — 屬於 specified foreign financial asset'],
            ['沒有現金價值的保單', '本文查閱的官方資料未說明', '本文查閱的官方資料未說明'],
          ]}
        />

        <h2>為什麼保單可以是「帳戶」</h2>
        <p>
          FBAR 的法規在「其他金融帳戶」中，納入了<strong>有現金價值的保險或年金保單</strong>。IRS 指引另外補充兩點：
        </p>
        <ul>
          <li>保單的<strong>現金價值</strong>，視為帳戶價值。</li>
          <li>不需要<strong>目前有收入給付</strong>，也會觸發申報。</li>
        </ul>

        <h2>它在 FBAR 上的位置</h2>
        <p>
          把保單這一年的最高價值，加進你其他海外帳戶，一起判斷 $10,000 合計門檻。如果需要申報，就把這張保單列為你的海外金融帳戶之一。請見<a href="/zh-tw/library/investment/fbar-10000-rule/">海外帳戶超過 $10,000 就要報 FBAR 嗎？</a>以及<a href="/zh-tw/library/investment/fbar-maximum-account-value/">最高餘額怎麼算</a>。
        </p>

        <h2>例子</h2>
        <p>
          美國居民 Wen 有一個最高餘額 $7,000 的台灣銀行帳戶，還有一張台灣保險公司的儲蓄型壽險，這一年的現金價值是 $9,000。兩者合計 $16,000，所以 Wen 要申報 FBAR，銀行帳戶和保單都要列出。她的海外資產低於她報稅身分適用的 Form 8938 門檻。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 本文沒有決定的事</div>
          <p>本文談的是<strong>申報</strong>。它不涵蓋海外保單如何課稅、保費、保單借款、解約或身故給付怎麼處理，也不判斷某張契約在美國稅法下是否算人壽保險。這些問題取決於個別契約 — 請尋求專業建議，特別是在解約或變更保單之前。</p>
        </div>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>保單契約，以及保險公司的名稱與地址</li>
          <li>顯示現金價值（解約金）的年度對帳單</li>
          <li>把價值換算成美元時使用的匯率</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

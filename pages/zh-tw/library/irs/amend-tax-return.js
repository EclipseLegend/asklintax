import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/amend-tax-return.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'amend-tax-return',
  sourceHash:      'a10b51f3cdc0',
  id:            '52',
  title:         '報稅表填錯了，要怎麼修改？',
  titleEn:       'I made a mistake on my tax return — how do I amend it?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋用 Form 1040-X 更正已申報的聯邦個人稅表（Form 1040、1040-SR 或 1040-NR）。退稅申請的特殊規定、州稅表，以及因 IRS 查核而做的更正，不在本文範圍內',
  persona:       ['報稅後才發現錯誤的人', '收到更正或遲來的 W-2、1099 的納稅人', '忘了申請抵稅額或受扶養人的人', '選錯報稅身分的人'],
  relatedJourney: ['處理稅務問題', '第一次報稅'],
  actionRequired: '先判斷這個錯誤是否真的會改變你的稅表。如果它改變了報稅身分、收入、扣除額、抵稅額、受扶養人或稅額，就要申報 Form 1040-X — 每個要更正的稅務年度各一份；如果是申請退稅，請注意期限。',
  sources: [
    { label: 'IRS — Form 1040-X 填寫說明（Instructions for Form 1040-X）', url: 'https://www.irs.gov/instructions/i1040x' },
    { label: 'IRS — 申報修正稅表（File an amended return）', url: 'https://www.irs.gov/filing/file-an-amended-return' },
    { label: 'IRS — 修正稅表常見問題（Amended return frequently asked questions）', url: 'https://www.irs.gov/filing/amended-return-frequently-asked-questions' },
    { label: 'IRS — 關於 Form 1040-X（About Form 1040-X）', url: 'https://www.irs.gov/forms-pubs/about-form-1040x' },
    { label: 'IRS — 查詢修正稅表進度（Where\'s My Amended Return?）', url: 'https://www.irs.gov/filing/wheres-my-amended-return' },
  ],
}

const FAQS = [
  {
    q: '我算錯數字，需要修正稅表嗎？',
    a: '通常不需要。IRS 在處理稅表時可能會更正計算錯誤；如果缺了必要的表格或附表，IRS 也可能另外向你索取。修正稅表是用來處理報稅身分、收入、扣除額、抵稅額、受扶養人或稅額等變動。',
  },
  {
    q: '我要更正兩個不同的年度，可以用同一份表格嗎？',
    a: '不行。每個要修正的稅務年度，都要各申報一份 Form 1040-X。',
  },
  {
    q: '要申請退稅的話，修正稅表的期限是多久？',
    a: '要申請抵免或退稅，一般必須在原始稅表申報日起 3 年內，或繳稅日起 2 年內申報 Form 1040-X，以較晚者為準。某些情況有特殊規定與例外，請查看 Form 1040-X 的填寫說明。',
  },
  {
    q: '修正稅表會讓我多繳稅嗎？',
    a: '要看更正的內容。修正稅表可能帶來額外退稅、需要補繳稅款，或稅額沒有變化。如果要補繳，盡快繳清可以減少之後的利息與罰款。',
  },
  {
    q: '我收到 CP2000 通知，應該改報 1040-X 而不是回覆通知嗎？',
    a: 'CP2000 有自己的回覆程序。請依通知上的說明處理，不要直接假設修正稅表才是正確做法。請見「CP2000 通知：代表什麼？該如何回覆？」',
  },
]

const RELATED = [
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  '如果 IRS 已經發現資料不符，請回覆通知。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '決定要申報什麼之前，先看懂 IRS 的來信。',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '收到更正或遲來的 W-2，是常見的修正原因。',
  },
]

export default function AmendTaxReturnZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '報稅表填錯了怎麼辦？Form 1040-X 修正稅表說明 | AskLinTax 繁體中文',
      description: '報稅後才發現錯誤？什麼時候需要 Form 1040-X、哪些錯誤 IRS 可能自行更正、申請退稅的期限，以及之後會發生什麼。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你已經申報了聯邦稅表，之後才發現會影響稅表內容的錯誤，一般是用 <strong>Form 1040-X</strong>（Amended U.S. Individual Income Tax Return，修正稅表）來更正。Form 1040-X 用來修正已申報的 Form 1040、1040-SR 或 1040-NR。不是每個錯誤都需要修正稅表；修正的結果可能是多退稅、要補稅，或完全沒有變化。
        </p>

        <h2>通常需要修正稅表的情況</h2>
        <p>
          申報 Form 1040-X 的常見原因，是以下項目有變動：
        </p>
        <ul>
          <li><strong>報稅身分</strong> — 例如你以單身申報，但其實符合另一種身分</li>
          <li><strong>收入</strong> — 例如報稅後才收到更正或遲來的 W-2 或 1099</li>
          <li>申報了或漏報的<strong>扣除額</strong></li>
          <li><strong>抵稅額</strong> — 例如忘了申請的抵稅額</li>
          <li>新增或移除的<strong>受扶養人</strong></li>
          <li>整體的<strong>稅額</strong></li>
        </ul>

        <h2>可能不需要修正的情況</h2>
        <p>
          有些錯誤 IRS 可能會自行更正。單純的<strong>計算錯誤</strong>通常會在處理稅表時被更正；如果漏附了必要的表格或附表，IRS 可能會聯絡你索取。這些情況請等 IRS 處理，不要為了同一件事另外申報修正稅表。
        </p>

        <ArticleTable
          head={['情況', '一般的下一步']}
          rows={[
            ['加總或其他計算錯誤', 'IRS 可能在處理時更正'],
            ['漏附附表或表格', 'IRS 可能另外向你索取'],
            ['報稅身分錯誤，或漏報收入、扣除額、抵稅額、受扶養人', '申報 Form 1040-X'],
            ['收到 IRS 提議更改的通知', '先依通知上的說明處理'],
          ]}
        />

        <h2>怎麼修正</h2>
        <ol>
          <li><strong>準備原始稅表</strong>，以及支持這次更正的文件。</li>
          <li><strong>填寫 Form 1040-X</strong>，列出原始金額、變動金額與更正後金額，並說明每項變動。依填寫說明附上必要的表格或附表。</li>
          <li><strong>一年一份。</strong>如果要更正不只一個稅務年度，每一年各申報一份 Form 1040-X。</li>
          <li><strong>申報</strong>：可以的話用報稅軟體電子申報，或依填寫說明以紙本申報。</li>
          <li><strong>補繳稅款</strong>：如果要補稅，請盡快繳納，以減少利息與罰款。</li>
          <li><strong>追蹤進度</strong>：使用 IRS 的 Where's My Amended Return? 工具。</li>
        </ol>

        <h2>申請退稅的期限</h2>
        <p>
          如果修正稅表是要申請<strong>抵免或退稅</strong>，就有期限。一般來說，你必須在原始稅表申報日起 <strong>3 年內</strong>，或繳稅日起 <strong>2 年內</strong>申報 Form 1040-X，<strong>以較晚者為準</strong>。某些情況有特殊規定與例外 — 請查看 Form 1040-X 的填寫說明。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 要補稅就別拖</div>
          <p>如果更正後稅額增加，上面的期限不是拖延的理由。未繳稅款可能會產生利息，所以越早修正、越早繳清，成本就越低。</p>
        </div>

        <h2>例子</h2>
        <p>
          Leo 申報 2025 年稅表後，才收到另一份 1099，上面有他忘了申報的 $1,200 自由工作收入。這改變了他的收入，所以他為 2025 年申報一份 Form 1040-X，列出增加的收入與因此改變的稅額，並補繳差額。如果他也發現 2024 年的稅表有錯，就要為 2024 年另外申報一份 Form 1040-X。
        </p>

        <h2>修正稅表不等於回覆 IRS</h2>
        <p>
          如果 IRS 已經就同一件事寄通知給你 — 例如 <a href="/zh-tw/library/irs/cp2000/">CP2000</a> — 請依通知上的說明處理。其他的來信，請先看<a href="/zh-tw/library/irs/irs-notice/">我收到 IRS 的信，該怎麼辦？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

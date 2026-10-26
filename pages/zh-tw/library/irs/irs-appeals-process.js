import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-appeals-process.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-appeals-process',
  sourceHash:      'd0ce10d22d7e',
  id:            '116',
  title:         'IRS 上訴：如何對查帳或 IRS 決定提出異議',
  titleEn:       'IRS Appeals: How to Dispute an Audit or IRS Decision',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 5（2021 年 4 月版）與 Form 12203（2022 年 8 月版），說明對查帳調整提出行政上訴的方式，以及它和向美國稅務法院提出申請（petition）有何不同。本文只簡介催收上訴。僱傭稅、免稅組織、退休計畫與合夥企業（BBA）的上訴適用特殊程序，本文不涵蓋',
  persona:       ['不同意查帳調整的納稅人', '收到 30 天信或欠稅通知的人', '罰款減免或其他申請被拒的人', '正在 Appeals 與稅務法院之間做選擇的人'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '先看清楚你收到的信給了你哪一種上訴權利，以及期限。行政上訴必須在信上載明的期限內提出。向稅務法院提出申請，則必須在欠稅通知（notice of deficiency）載明的期間內完成 — 通常是 90 天，如果通知寄給在美國境外的人則是 150 天 — 而且這個期間不能延長。',
  sources: [
    { label: 'IRS — Publication 5（2021 年 4 月版），你的上訴權利與不同意時如何準備抗辯書', url: 'https://www.irs.gov/pub/irs-pdf/p5.pdf' },
    { label: 'IRS — Form 12203（2022 年 8 月版），申請上訴審查', url: 'https://www.irs.gov/pub/irs-pdf/f12203.pdf' },
    { label: 'IRS — Publication 1660（2020 年 1 月版），催收上訴權利', url: 'https://www.irs.gov/pub/irs-pdf/p1660.pdf' },
  ],
}

const FAQS = [
  {
    q: '什麼是 IRS 獨立上訴辦公室（Independent Office of Appeals）？',
    a: 'Appeals 是 IRS 內部的一個單位，獨立於提出調整的部門，例如查你稅表的查帳員。它是 IRS 內部唯一的行政上訴層級。上訴會議以非正式的方式進行，Publication 5 說大多數爭議都能在 Appeals 階段和解，不必上法院。',
  },
  {
    q: '我需要正式書面抗辯，還是小額案件申請就夠了？',
    a: '如果信上每個稅務期間的稅款加罰款合計在 $25,000 以下，你可以提出小額案件申請 — 一份簡短的書面說明、信中附的上訴表格，或 Form 12203。只要任何一個期間超過 $25,000，所有期間都必須提出正式書面抗辯。合夥企業、S 公司、員工退休計畫與免稅組織的案件，不論金額都需要正式抗辯。',
  },
  {
    q: '我有多久時間可以提出上訴？',
    a: '依信件而定。行政上訴必須在你收到的信上載明的期限內寄出。向稅務法院提出申請則有另一個由法律規定、寫在欠稅通知上的期限 — 通常是 90 天，如果通知寄給在美國境外的人則是 150 天。不要以為每一種上訴都適用同一個期限。',
  },
  {
    q: '和 Appeals 溝通會延長我向稅務法院申請的期限嗎？',
    a: '不會。Publication 5 說，即使你還在和 IRS 查帳員或 Appeals 溝通，向稅務法院申請的時間也只有通知上載明的期間。IRS 和稅務法院都不能更改這個期間。',
  },
  {
    q: '上法院之前一定要先繳稅嗎？',
    a: '美國稅務法院不用，它通常是「先不繳稅」的審理機關：你可以在繳稅前提出申請，但前提是你收到了給你這項權利的通知。美國地方法院或美國聯邦求償法院通常要求你先全額繳稅，並及時申請退稅。',
  },
  {
    q: '可以請人代表我參加上訴嗎？',
    a: '可以。你可以自己出面，或委任律師、會計師（CPA）或註冊稅務代理人（enrolled agent）。如果代理人要在你不在場時和 Appeals 溝通，請申報 Form 2848。如果你符合資格，低收入納稅人診所（LITC）可能可以代表你。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-audit',
    cat:  'IRS & Tax Issues',
    title: '被 IRS 查帳（audit），接下來會怎樣？',
    desc:  '進入 Appeals 之前，查帳如何進行。',
  },
  {
    href: '/library/irs/irs-tax-liens-levies',
    cat:  'IRS & Tax Issues',
    title: 'IRS 稅務留置權、扣押與催收上訴',
    desc:  '催收正當程序聽證與催收上訴計畫。',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS 授權書：Form 2848 與 Form 8821 的差別',
    desc:  '授權代理人處理你的上訴。',
  },
  {
    href: '/library/irs/taxpayer-advocate-service',
    cat:  'IRS & Tax Issues',
    title: '納稅人權益服務（TAS）：何時與如何求助',
    desc:  'IRS 問題造成困難時的免費協助。',
  },
]

export default function IrsAppealsProcessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 上訴：如何對查帳或 IRS 決定提出異議 | AskLinTax 繁體中文',
      description: '如何對 IRS 查帳調整提出上訴：獨立上訴辦公室、小額案件申請與 Form 12203、正式書面抗辯、上訴期限，以及收到欠稅通知後向稅務法院提出申請有何不同。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你不同意 IRS 在查帳後提出的調整，通常有兩條不同的路。你可以在信上的期限內，向 IRS 獨立上訴辦公室提出<strong>行政上訴</strong>。而 IRS 一旦發出<strong>欠稅通知（notice of deficiency）</strong>，你可以在通知載明的期間內向<strong>美國稅務法院</strong>提出申請 — 通常是 90 天，如果通知寄給在美國境外的人則是 150 天。這是兩個不同的步驟，期限也不同。
        </p>

        <h2>上訴之前</h2>
        <ul>
          <li><strong>把要求的資料交齊。</strong>在期限內把負責你案件的 IRS 人員要求的所有文件和說明交給他們。到了 Appeals 才第一次提出的新資料，可能會被退回給查帳員，拖慢你的案件。</li>
          <li><strong>先和查帳員談，再找主管。</strong>如果你仍然不同意，案件符合資格的話可以申請快速和解（Fast Track Settlement），或提出行政上訴。</li>
          <li><strong>看清楚你的信。</strong>信上會說你有哪些上訴權利、如何申請上訴，以及如果你什麼都不做會發生什麼事。</li>
        </ul>

        <h2>小額案件申請或正式書面抗辯</h2>
        <ArticleTable
          head={['', '小額案件申請', '正式書面抗辯']}
          rows={[
            ['何時可以使用', '信上每個稅務期間的稅款加罰款合計在 $25,000 以下', '任何一個稅務期間超過 $25,000 時必須提出 — 而且所有期間都要；合夥企業、S 公司、員工退休計畫與免稅組織案件不論金額也都需要'],
            ['如何提出', '簡短的書面說明，列出有爭議的項目與你不同意的理由；或信中附的上訴表格；或 Form 12203', '一份表明你要上訴的書面抗辯，並包含下列必要內容'],
            ['寄到哪裡', '在信上的期限內寄到信上的地址', '在信上的期限內寄到信上的地址'],
          ]}
        />
        <p>正式書面抗辯必須包含：</p>
        <ul>
          <li>表明你要對 IRS 提出的調整上訴，以及你的姓名、地址與白天的電話號碼。</li>
          <li>所有有爭議的項目、相關的稅務期間或年度、提出的調整，以及你不同意每一項的理由。</li>
          <li>支持你在每個爭議項目上立場的事實，以及任何法律或依據。</li>
          <li>簽名的偽證罰則聲明（penalties of perjury statement）。代理人提交抗辯時，要依是否親自知道相關事實，使用不同的聲明。</li>
        </ul>

        <h2>Appeals 的流程</h2>
        <ul>
          <li><strong>非正式的會議。</strong>Appeals 會聯絡你或你的代理人安排時間。</li>
          <li><strong>只考慮稅法上的論點。</strong>如果論點只是基於道德、宗教、政治、憲法、良心或類似的反對理由，Appeals 不能考慮。</li>
          <li><strong>核定稅額的期限。</strong>IRS 可能會請你同意延長它核定稅額的時間。Publication 5 說，如果需要更多時間而你選擇不延長，Appeals 不會受理案件。</li>
          <li><strong>沒有達成協議。</strong>所得稅案件中，Appeals 會發出欠稅通知，讓你有權向稅務法院提出申請。</li>
        </ul>

        <h2>行政上訴與向稅務法院提出申請</h2>
        <ArticleTable
          head={['', '行政上訴（IRS Appeals）', '向美國稅務法院提出申請']}
          rows={[
            ['由什麼開始', '提出調整的信，例如查帳報告', '欠稅通知（也稱為 90 天信）或其他給你稅務法院權利的通知'],
            ['期限', '信上載明的期限', '通知上的期間：通常是 90 天，寄給美國境外的人則是 150 天；由法律規定，不能延長'],
            ['由誰決定', 'Appeals 人員，獨立於查帳員', '獨立於 IRS 的法院'],
            ['要先繳稅嗎？', '不用', '不用 — 稅務法院通常是先不繳稅的審理機關；需要繳申請費，但符合資格可以免除'],
          ]}
        />
        <p>
          如果你沒有先經過 Appeals 就向稅務法院提出申請，通常在等待審理期間仍有機會和 Appeals 和解。其他法院 — 美國地方法院或美國聯邦求償法院 — 通常要求你先全額繳稅，並及時申請退稅。
        </p>

        <h2>催收上訴不一樣</h2>
        <p>
          對留置權、扣押、查封或分期付款的爭議，有自己的程序 — 主要是催收正當程序聽證（Form 12153）與催收上訴計畫（Form 9423）— 期限短得多。請參閱 <a href="/zh-tw/library/irs/irs-tax-liens-levies/">IRS 稅務留置權、扣押與催收上訴</a>。
        </p>

        <h2>代理</h2>
        <ul>
          <li>你可以自己出面，或委任律師、會計師或註冊稅務代理人。</li>
          <li>如果代理人要在你不在場時和 Appeals 溝通，請申報 <strong>Form 2848</strong>。沒有執業資格的人可以以證人身分出席，但不能代表你。</li>
          <li>如果你符合資格，<strong>低收入納稅人診所</strong>可能可以代表你。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>一直等 Appeals</strong>，結果 90 天（或 150 天）的稅務法院期間過了。</li>
          <li><strong>以為每一種上訴的期限都一樣</strong> — 行政上訴看信上的期限，向稅務法院申請看欠稅通知上的期間。</li>
          <li><strong>某個期間超過 $25,000</strong>，卻只提出小額案件申請。</li>
          <li><strong>把文件留到 Appeals 才交</strong>，結果案件被退回給查帳員。</li>
          <li><strong>只主張某項稅不公平或違憲</strong>，這是 Appeals 不能考慮的。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 期限很嚴格</div>
          <p>沒有人能延長稅務法院的期間。如果你沒有及時提出申請，IRS 會寄帳單給你，而其他法院通常要求你先繳稅。如果期限快到了或金額很大，請考慮找合格的稅務專業人士或低收入納稅人診所協助。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

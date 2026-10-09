import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-audit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-audit',
  sourceHash:      'd56bf115dab1',
  id:            '64',
  title:         '被 IRS 查帳（audit），接下來會怎樣？',
  titleEn:       'I\'m being audited by the IRS — what happens next?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '概要說明 IRS 對個人與小型企業所得稅表的查核（examination）。本文不預測結果，也不能取代專業代理；薪資稅、遺產稅、刑事與催收事項不在本文範圍內。請一律依你收到的信件上的日期與說明處理',
  persona:       ['收到 IRS 查核信的納稅人', '被要求提供紀錄的小型企業老闆', '不確定信件或電話是否真的來自 IRS 的人', '正在考慮是否請人代理的人'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '先確認信件是真的，記下信上印的回覆日期，準備信中要求的紀錄，並按時回覆。如果你不同意提議的更改，請依信中說明使用申訴管道。',
  sources: [
    { label: 'IRS — IRS 查帳（IRS audits）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/irs-audits' },
    { label: 'IRS — Publication 3498（Rev. May 2025），查核程序（The Examination Process）', url: 'https://www.irs.gov/pub/irs-pdf/p3498.pdf' },
    { label: 'IRS — Publication 3498-A（Rev. May 2021），郵寄查帳的查核程序（The Examination Process (Audits by Mail)）', url: 'https://www.irs.gov/pub/irs-pdf/p3498a.pdf' },
    { label: 'IRS — IRS 可以核定稅額的期限（Time IRS can assess tax）', url: 'https://www.irs.gov/filing/time-irs-can-assess-tax' },
    { label: 'IRS — Publication 5，你的申訴權利與如何準備異議書（Your Appeal Rights and How to Prepare a Protest）', url: 'https://www.irs.gov/pub/irs-pdf/p5.pdf' },
    { label: 'IRS — Publication 1，納稅人的權利（Your Rights as a Taxpayer）', url: 'https://www.irs.gov/pub/irs-pdf/p1.pdf' },
    { label: 'IRS — Topic no. 311，授權書資訊（Power of attorney information）', url: 'https://www.irs.gov/taxtopics/tc311' },
    { label: 'IRS — 如何確認是 IRS（How to know it\'s the IRS）', url: 'https://www.irs.gov/help/how-to-know-its-the-irs' },
    { label: 'IRS — 了解你的 CP2000 系列通知（Understanding your CP2000 series notice）', url: 'https://www.irs.gov/individuals/understanding-your-cp2000-series-notice' },
    { label: 'IRS — Publication 556，稅表查核、申訴權利與退稅申請（Examination of Returns, Appeal Rights, and Claims for Refund）（補充參考）', url: 'https://www.irs.gov/publications/p556' },
  ],
}

const FAQS = [
  {
    q: '被查帳是不是代表我做錯了什麼？',
    a: '不是。IRS 表示，被選中查核並不代表你不誠實。稅表可能是經由電腦篩選、隨機抽樣，或因相關稅表或文件而被選中，而且很多查帳最後都沒有任何更改。',
  },
  {
    q: '有人打電話說我被查帳了，是真的嗎？',
    a: '請小心。IRS 會用郵寄方式通知你被查帳；它不會用電話開始一項查帳。在你收到信之後，查帳人員可能會打電話討論進行中的查帳。如果不確定，請用 IRS.gov 上的聯絡資訊聯絡 IRS，不要打來電者給的號碼。',
  },
  {
    q: 'IRS 可以查到多久以前？',
    a: '一般來說，IRS 會查過去三年內申報的稅表。如果發現重大錯誤，可能會增加年度，但通常不會超過過去六年。',
  },
  {
    q: '可以請別人幫我和 IRS 打交道嗎？',
    a: '可以。你有權請人代理。符合資格的代理人，例如 CPA、enrolled agent 或律師，可以憑你簽署的 Form 2848 代表你。低收入納稅人診所（Low Income Taxpayer Clinics）可以協助符合資格的納稅人。',
  },
  {
    q: '我收到的 CP2000 通知是查帳嗎？',
    a: '不是。CP2000 是根據和你稅表不符的資料提出的更改建議，不是查帳。它有自己的回覆程序 — 請見 CP2000 的指南。',
  },
]

const RELATED = [
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  '常被誤以為是查帳的資料不符通知。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '看懂任何 IRS 來信，並辨識詐騙。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '如果查帳後要補的稅一次繳不出來。',
  },
]

export default function IrsAuditZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '被 IRS 查帳了？接下來會怎樣 | AskLinTax 繁體中文',
      description: '收到 IRS 查帳信？如何確認是真的、郵寄與面談查帳的差別、要準備哪些紀錄、怎麼回覆、可能的結果、申訴權利，以及請人代理。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          IRS <strong>查帳</strong>（audit，也稱為查核 examination）是檢查你的稅表，確認收入、扣除額與抵稅額都申報正確。大多數查帳是用郵寄方式處理，只針對少數幾個項目。請仔細閱讀信件，<strong>在信上印的日期前回覆</strong>，並寄出信中要求的紀錄影本。很多查帳最後沒有任何更改；如果 IRS 提出你不同意的更改，你有申訴的權利。
        </p>
        <p>
          <strong>CP2000</strong> 通知不是查帳 — 它是根據資料不符提出的調整建議。請見<a href="/zh-tw/library/irs/cp2000/">CP2000 通知：代表什麼？該如何回覆？</a>
        </p>

        <h2>首先：真的是 IRS 嗎？</h2>
        <ul>
          <li>IRS 會<strong>用郵寄方式</strong>通知你被查帳。它不會用電話開始一項查帳，也不會用電子郵件、簡訊或社群媒體主動聯絡你。</li>
          <li>在你<strong>收到信之後</strong>，查帳人員可能會打電話或到訪，討論進行中的查帳。</li>
          <li>威脅要立即逮捕、要求用禮物卡付款，或逼你當場付錢，都是詐騙的跡象。</li>
        </ul>
        <p>
          如果有疑問，請使用 IRS.gov 上的聯絡資訊 — 請見<a href="/zh-tw/library/irs/irs-notice/">我收到 IRS 的信，該怎麼辦？</a>
        </p>

        <h2>查帳的類型</h2>
        <ArticleTable
          head={['類型', '怎麼進行']}
          rows={[
            ['郵寄查帳（correspondence audit）', '用郵寄處理；通常只針對稅表上的一兩個項目'],
            ['辦公室查帳（office audit）', '在 IRS 辦公室面談'],
            ['實地查帳（field audit）', '在你的住家、營業場所或代理人辦公室進行面談審查；通常範圍最廣'],
          ]}
        />

        <h2>IRS 可能要求什麼</h2>
        <p>
          信中會列出要審查的項目與要寄的紀錄 — 例如收據、帳單、已兌現的支票、對帳單，或其他能支持收入、扣除額或抵稅額的文件。請寄<strong>影本</strong>，不要寄正本，並記錄你寄了什麼。一般來說，用來準備稅表的紀錄，應該從申報日起至少保留三年。
        </p>

        <h2>查帳可以追溯多久</h2>
        <p>
          一般來說，IRS 可以查過去三年內申報的稅表。如果發現重大錯誤，可能會增加年度，但通常不會超過過去六年。另外，IRS 一般有從你申報起算三年的時間核定額外稅款，查帳進行中時，IRS 可能會請你同意延長這個期限。
        </p>

        <h2>查帳可能的結果</h2>
        <ArticleTable
          head={['結果', '一般代表什麼']}
          rows={[
            ['沒有更改（No change）', 'IRS 審查這些項目後，接受原本申報的稅表'],
            ['同意（Agreed）', '你同意提議的更改並簽署；應補的稅會寄帳單'],
            ['不同意（Disagreed）', '你不同意；可以要求和主管會談，或使用申訴權利'],
          ]}
        />
        <p>
          有些查帳甚至會帶來退稅。如果要補的稅一次繳不出來，請見<a href="/zh-tw/library/irs/cant-pay-tax-bill/">繳不出稅款怎麼辦？有哪些選擇？</a>
        </p>

        <h2>如果你不同意</h2>
        <p>
          IRS 提出更改的信件會說明你的選擇與期限。一般來說，你可以要求由 <strong>IRS 獨立申訴辦公室</strong>（IRS Independent Office of Appeals）審查，它和查帳人員是分開的。如果 IRS 發出<strong>欠稅通知</strong>（notice of deficiency），通知中會說明向美國稅務法院（U.S. Tax Court）提出申請的期限。請依你自己收到的信件上的日期處理 — Publication 3498（郵寄查帳另見 Publication 3498-A）與 Publication 5 有說明流程。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 查帳期間你的權利</div>
          <p>Publication 1 說明了納稅人權利法案（Taxpayer Bill of Rights），包括知情的權利、對 IRS 的立場提出異議的權利，以及請人代理的權利。符合資格的代理人 — 例如 CPA、enrolled agent 或律師 — 可以憑 Form 2848 代表你。低收入納稅人診所與納稅人權益服務處（Taxpayer Advocate Service）在某些情況下可以提供協助。</p>
        </div>

        <h2>什麼時候該找專業協助</h2>
        <p>
          如果是面談查帳、牽涉營業或好幾個年度、金額很大，或你不同意提議的更改，可以考慮尋求專業協助。本文說明的是一般流程，無法預測你的查帳會有什麼結果。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

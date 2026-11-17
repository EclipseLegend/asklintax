import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-identity-verification-letters.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-identity-verification-letters',
  sourceHash:      '50bd5b1f4a0c',
  id:            '132',
  title:         'IRS 身分驗證信函：CP5071、4883C、5747C 與退稅延遲',
  titleEn:       'IRS Identity Verification Letters: CP5071, 4883C, 5747C, and Held Refunds',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 網頁「了解你的 CP5071 系列通知」（2026 年 3 月更新）、「了解你的 4883C 信函」（2026 年 7 月更新）、「了解你的 5747C 信函」（2026 年 5 月更新）、「了解你的 CP5447 系列通知」（2026 年 6 月更新），以及「驗證你的申報書」（2026 年 8 月更新），說明 IRS 的身分與稅表驗證通知。信函名稱與驗證方式會改變；請一律依照你實際收到的通知辦理。本文不說明企業身分盜用、Form 14039 的詳細程序，或州稅務機關的驗證',
  persona:       ['收到 IRS 要求驗證身分信函的人', '退稅被暫停處理的人', '認為有人冒用自己名義報稅的納稅人', '協助他人回覆的家人與報稅人員'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '找出信函角落的通知編號，並依照該通知的說明辦理 — 只有通知提供線上驗證時才使用線上驗證；4883C 信函請撥打納稅人保護計畫專線；5747C 信函請預約親自到場驗證。準備好信函所列年度的申報書、前一年度的申報書（如有），以及相關證明文件。如果那份申報書不是你申報的，請明確告知。',
  sources: [
    { label: 'IRS — 了解你的 CP5071 系列通知', url: 'https://www.irs.gov/individuals/understanding-your-cp5071-series-notice' },
    { label: 'IRS — 了解你的 4883C 信函', url: 'https://www.irs.gov/individuals/understanding-your-letter-4883c' },
    { label: 'IRS — 了解你的 5747C 信函', url: 'https://www.irs.gov/individuals/understanding-your-letter-5747c' },
    { label: 'IRS — 了解你的 CP5447 系列通知', url: 'https://www.irs.gov/individuals/understanding-your-cp5447-series-notice' },
    { label: 'IRS — 驗證你的申報書（Verify your return）', url: 'https://www.irs.gov/identity-theft-fraud-scams/identity-and-tax-return-verification-service' },
  ],
}

const FAQS = [
  {
    q: '為什麼 IRS 寄信要我驗證身分？',
    a: '有人以你的社會安全號碼或 ITIN 申報了一份 Form 1040-series（1040 系列）申報書，IRS 想先確認申報的人就是你，再繼續處理。如果那份申報書不是你申報的，這封信就是你通知 IRS 的管道 — 你可能是身分盜用的受害者。',
  },
  {
    q: '5071C 信函還在使用嗎？',
    a: 'IRS 現在把它歸在 CP5071 系列中，這個系列包括 CP5071、5071C 與 CP5071F。原本單獨的 5071C 說明網頁，現在會導向 CP5071 系列網頁。請依照你的通知上的指示辦理。',
  },
  {
    q: '我可以線上驗證嗎？',
    a: '只有在你的通知允許時才可以。IRS「驗證你的申報書」服務說明，只有收到 CP5071 系列通知或 5447C 信函時才使用這項服務。4883C 信函要你撥打信上的納稅人保護計畫專線，5747C 信函則要你預約親自到場。',
  },
  {
    q: '驗證之後多久能拿到退稅？',
    a: 'IRS 提供的是估計，不是保證。使用線上「驗證你的申報書」服務後，IRS 說明請等 2 至 3 週再查詢退稅，處理可能需要最多 9 週。對於 4883C 與 5747C 信函，IRS 說明處理可能需要最多 9 週。如果 IRS 發現其他問題，會再與你聯絡，可能需要更長時間。',
  },
  {
    q: '我的報稅人員或家人可以替我驗證嗎？',
    a: '部分可以。就 4883C 信函而言，只有在 IRS 存有已填妥的 Form 2848 時，授權代表才能替你打電話；沒有的話，你和協助者必須一起打電話，而且你必須參與通話。就 5747C 信函而言，代表可以陪同，但你必須親自出席以驗證身分。受託人（fiduciary）請使用 Form 56。',
  },
  {
    q: '我還需要申報 Form 14039 或申請 IP PIN 嗎？',
    a: 'IRS 表示，如果你已驗證申報書，除非 IRS 要求，否則不需要申報 Form 14039（身分盜用宣誓書）。身分保護 PIN（IP PIN）是另一個可選的步驟，可以幫助防止別人日後冒用你的號碼報稅。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-identity-theft-ip-pin',
    cat:  'IRS & Tax Issues',
    title: 'IRS 身分盜用與 IP PIN：如何保護你的報稅',
    desc:  '如何申請 IP PIN，以及遇到身分盜用該怎麼辦。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如何找到通知編號並確認信函是真的。',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS 授權書：Form 2848 與 Form 8821 的差別',
    desc:  '代表人什麼時候需要 Form 2848。',
  },
  {
    href: '/library/irs/refund-offsets',
    cat:  'IRS & Tax Issues',
    title: '退稅被抵扣：IRS 與財政部為什麼扣除你的退稅？',
    desc:  '如果退稅寄來了，但比預期少。',
  },
]

export default function IrsIdentityVerificationLettersPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 身分驗證信函：CP5071、4883C、5747C 與退稅延遲 | AskLinTax 繁體中文',
      description: 'IRS 身分驗證信函代表什麼 — CP5071 系列、4883C 與 5747C 信函，以及 CP5447 系列 — 每種信函要求的驗證方式（線上、電話或親自到場）、要準備什麼、如果你沒有申報該怎麼辦、代表人，以及退稅時程。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          當以你的社會安全號碼或 ITIN 申報的稅表看起來可能是身分盜用時，IRS 會<strong>暫停處理這份申報書</strong>，並寄信要求你<strong>驗證身分與申報書</strong>。IRS 表示，在你回覆之前，它無法處理申報書或發出退稅。每一種信函都會告訴你<strong>如何</strong>驗證 — 線上、電話或親自到場 — 所以請依照你實際收到的通知辦理。
        </p>

        <h2>你收到的是哪一種信？</h2>
        <ArticleTable
          head={['通知', 'IRS 要求的驗證方式', '說明']}
          rows={[
            ['CP5071 系列（CP5071、5071C、CP5071F）', '依通知辦理。如果通知提供線上驗證，請從 irs.gov/verifyreturn 開始', 'IRS 已把 5071C 的網頁改為 CP5071 系列'],
            ['CP5447 系列（CP5447、5447C、CP5447F）', '依通知辦理。5447C 信函可以線上驗證；IRS 表示，如果無法線上驗證，可以依通知指示以電話、郵寄或文件上傳工具（Document Upload Tool）驗證', '「驗證你的申報書」服務列出的是 5447C 信函，而不是其他 CP5447 通知'],
            ['4883C 信函', '撥打信上的納稅人保護計畫（Taxpayer Protection Program）專線', '如果無法以電話驗證，IRS 會請你到當地 IRS 辦公室親自驗證'],
            ['5747C 信函', '撥打信上的電話，預約到納稅人協助中心（Taxpayer Assistance Center）親自驗證', '如果你沒有申報，請改撥信上的納稅人保護計畫專線'],
          ]}
        />
        <p>
          這些信函上的電話只用於身分與申報書驗證。IRS 表示，其他帳戶資訊（例如退稅狀態）可能無法透過這些電話取得。
        </p>

        <h2>四件不同的事 — 不要混在一起</h2>
        <ul>
          <li><strong>驗證身分</strong>是證明你就是申報書上那個號碼的本人。</li>
          <li><strong>驗證申報書</strong>是確認 IRS 收到的申報書就是你申報的那一份，好讓 IRS 處理。</li>
          <li><strong>回報不認識的申報書：</strong>如果不是你申報的，請用同一份通知告知 IRS。你可能是身分盜用的受害者。</li>
          <li><strong>申請 IP PIN</strong>是另一個可選的步驟，可以幫助防止日後的冒名申報；請見<a href="/zh-tw/library/irs/irs-identity-theft-ip-pin/">身分盜用與 IP PIN</a>。</li>
        </ul>

        <h2>要準備什麼</h2>
        <ul>
          <li>信函本身。</li>
          <li>信函所列年度的 Form 1040-series（1040 系列）申報書。W-2 與 1099 表不是申報書。如果你沒有副本，請查看報稅軟體或詢問報稅人員。</li>
          <li>前一年度的申報書（如果你有申報而且手上有）。</li>
          <li>每份申報書的證明文件，例如 W-2 與 1099 表，以及 Schedule C 或 F。</li>
          <li><strong>5747C 信函的預約：</strong>一份有效的政府核發附照片證件，加上 IRS 清單中至少一份其他文件 — 例如第二份政府證件、社會安全卡、有現址的房貸對帳單或租約、汽車所有權狀、選民登記卡、與證件地址相符的水電帳單、出生證明，或目前的在學紀錄。</li>
        </ul>

        <h2>代表人與特殊情況</h2>
        <ul>
          <li><strong>4883C 信函：</strong>只有在存有已填妥的 Form 2848 時，代表人才能替你打電話。否則，你和協助者必須一起打電話，而且你必須參與。請見 <a href="/zh-tw/library/irs/irs-power-of-attorney-2848-8821/">Form 2848 與 Form 8821</a>。</li>
          <li><strong>5747C 信函：</strong>代表人可以陪同，但你必須親自出席驗證身分。</li>
          <li>代表個人、遺產或信託的<strong>受託人</strong>請申報 Form 56。</li>
          <li><strong>未滿 18 歲：</strong>線上服務會請你改為聯絡 IRS。</li>
        </ul>

        <h2>驗證之後</h2>
        <p>
          IRS 提供的是估計，不是承諾。使用線上「驗證你的申報書」服務後，IRS 說明請等 <strong>2 至 3 週</strong>再查詢退稅，處理申報書可能需要<strong>最多 9 週</strong>。對於 4883C 與 5747C 信函，IRS 也說明處理可能需要最多 9 週。如果 IRS 發現申報書有其他問題，會再與你聯絡，退稅可能進一步延誤。如果你不回覆，IRS 表示它無法處理申報書、發出退稅或抵用溢繳的稅款。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只使用 IRS 官方管道</div>
          <p>詐騙者會模仿這些信函。請使用通知上印的電話、IRS.gov 上的「驗證你的申報書」服務，或透過信上電話預約的面談。不要使用不明電子郵件、簡訊或社群媒體訊息中的連結或電話。請見<a href="/zh-tw/library/irs/irs-notice/">如何確認 IRS 的信是真的</a>。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/taxpayer-advocate-service.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'taxpayer-advocate-service',
  sourceHash:      '81547a48704f',
  id:            '118',
  title:         '納稅人權益服務（TAS）：何時與如何求助',
  titleEn:       'Taxpayer Advocate Service: When and How to Get Help',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 911 及其說明（2026 年 6 月版）、Publication 1546（2022 年 6 月版）、Publication 1（納稅人權利法案）與 IRM 13.1.20（納稅人協助令），說明納稅人權益服務（TAS）幫助哪些人、如何申請協助。本文無法查閱 TAS 網站本身，因此不說明辦公室位置與線上資格檢測工具',
  persona:       ['IRS 問題造成經濟困難的人', '退稅或案件卡住很久的納稅人', '面臨 IRS 立即催收行動的人', '一直聯絡不到 IRS 回覆的人'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '先試著直接和 IRS 解決問題。如果問題造成經濟困難、面臨立即的不利行動，或 IRS 一再延誤，請提交 Form 911 或撥打 TAS 電話 877-777-4778。所有 IRS 期限都要照常遵守 — 提交 Form 911 不會暫停稅務法院或催收正當程序的期限。',
  sources: [
    { label: 'IRS — Form 911（2026 年 6 月版），申請納稅人權益服務協助（及申請納稅人協助令）', url: 'https://www.irs.gov/pub/irs-pdf/f911.pdf' },
    { label: 'IRS — Publication 1546（2022 年 6 月版），納稅人權益服務是你在 IRS 的聲音', url: 'https://www.irs.gov/pub/irs-pdf/p1546.pdf' },
    { label: 'IRS — Publication 1，你身為納稅人的權利', url: 'https://www.irs.gov/pub/irs-pdf/p1.pdf' },
    { label: 'IRS — 內部稅收手冊（IRM）13.1.20，納稅人協助令', url: 'https://www.irs.gov/irm/part13/irm_13-001-020' },
  ],
}

const FAQS = [
  {
    q: '什麼是納稅人權益服務（TAS）？',
    a: 'TAS 是 IRS 內部的獨立組織，幫助納稅人解決自己無法和 IRS 解決的問題、保護納稅人權利，並提出行政與立法上的建議。每個地方辦公室都有自己的電話、傳真與郵寄地址，和其他 IRS 辦公室分開。',
  },
  {
    q: 'TAS 要收費嗎？',
    a: '不用。Form 911 說，如果你符合 TAS 協助的資格，服務永遠免費。',
  },
  {
    q: 'TAS 會受理每一個申請嗎？',
    a: '不會。TAS 通常在以下情況提供協助：問題造成經濟困難、你面臨立即的不利行動、你多次聯絡 IRS 都沒有回應或 IRS 沒有在承諾的日期前回覆，或 IRS 的程序沒有照預期運作。TAS 會通知你申請是否被受理。',
  },
  {
    q: '提交 Form 911 會暫停 IRS 的期限嗎？',
    a: '不會。Form 911 的說明指出，提出申請不會暫停任何適用的期間，例如收到欠稅通知後向稅務法院提出申請的期限，或申請催收正當程序聽證的期限。即使 TAS 正在協助你，這些也都要按時提出。',
  },
  {
    q: '寄出 Form 911 後一直沒有消息怎麼辦？',
    a: '如果 30 天內沒有收到回覆，請寄電子郵件到下方列出的同一個 TAS Form 911 信箱，主旨寫「No Response」。不要為同一個問題重複寄多份 Form 911 — 這可能會拖慢處理。',
  },
  {
    q: 'TAS 可以決定我欠多少稅嗎？',
    a: '不行。TAS 會代表你和 IRS 溝通，但即使是納稅人協助令，也不能對你的稅務責任做實質認定。如果你希望有人在爭議中代表你，可以委任律師、會計師或註冊稅務代理人，符合資格的話也可以找低收入納稅人診所。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '收到任何 IRS 通知後的第一步。',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS 授權書：Form 2848 與 Form 8821 的差別',
    desc:  '讓別人代你和 TAS 或 IRS 溝通。',
  },
  {
    href: '/library/irs/irs-tax-liens-levies',
    cat:  'IRS & Tax Issues',
    title: 'IRS 稅務留置權、扣押與催收上訴',
    desc:  '催收行動與你的上訴權利。',
  },
  {
    href: '/library/irs/irs-appeals-process',
    cat:  'IRS & Tax Issues',
    title: 'IRS 上訴：如何對查帳或 IRS 決定提出異議',
    desc:  '對稅額本身和 IRS 有不同看法時。',
  },
]

export default function TaxpayerAdvocateServicePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '納稅人權益服務（TAS）：何時與如何求助 | AskLinTax 繁體中文',
      description: '納稅人權益服務何時能幫忙：經濟困難、立即的威脅、IRS 延誤與程序失靈。如何提交 Form 911、什麼是納稅人協助令，以及為什麼 TAS 不會暫停 IRS 期限。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>納稅人權益服務（Taxpayer Advocate Service，TAS）</strong>是 IRS 內部的獨立單位，幫助那些透過一般 IRS 管道無法解決稅務問題的人。符合資格的話，協助是免費的。你可以用 <strong>Form 911</strong> 或撥打 <strong>877-777-4778</strong> 申請。TAS 不會受理每一個申請，而且申請協助<strong>不會暫停任何 IRS 期限</strong>。
        </p>

        <h2>TAS 通常幫助誰</h2>
        <ArticleTable
          head={['情況', '例子']}
          rows={[
            ['經濟困難', 'IRS 的問題對你、你的家人或你的企業造成經濟困難'],
            ['面臨立即的不利行動', '你或你的企業即將面臨 IRS 的行動，例如扣押'],
            ['沒有回應或延誤', '你多次聯絡 IRS 都沒有人回應，或 IRS 沒有在承諾的日期前回覆'],
            ['程序沒有正常運作', 'IRS 的程序、系統或作業方式沒有照預期運作，導致 IRS 沒有及時回應或解決你的問題'],
          ]}
        />
        <p>
          TAS 協助個人、企業與免稅組織，也協助他們的代理人。符合其中一種情況，並不保證 TAS 一定會受理你的案件。
        </p>

        <h2>如何用 Form 911 申請協助</h2>
        <ul>
          <li><strong>描述問題</strong>和它造成的困難、IRS 做了或沒做什麼，以及你希望得到的協助。如果 IRS 已經延誤超過 30 天，請寫出你第一次聯絡 IRS 的日期。</li>
          <li><strong>附上可能有幫助的文件</strong> — 這可能加快解決。</li>
          <li><strong>寄出方式</strong>：電子郵件寄到 <span style={{ overflowWrap: 'anywhere' }}>tas.form.911.request.for.assistance@irs.gov</span>、傳真到 (855) 828-2723（從海外傳真 1-304-707-9793），或郵寄到 7940 Kentucky Dr, MS 11 G, Florence, KY 41042。電子郵件提交不會加密。</li>
          <li><strong>夫妻共同申請</strong>必須由雙方簽名。代理人要附上 Form 2848、Form 8821 或其他授權書，並代替納稅人簽名。</li>
          <li><strong>等 30 天</strong>再用電子郵件追蹤，主旨寫「No Response」；不要為同一個問題再寄第二份 Form 911。</li>
        </ul>

        <h2>接下來會怎樣</h2>
        <ul>
          <li>TAS 會通知你申請是否被受理。</li>
          <li>如果受理，案件專員會代表你和 IRS 溝通，告訴你處理時程與進度，並一路協助直到問題解決。</li>
          <li>為了協助你，TAS 可能需要把你的資料提供給 IRS 人員。</li>
        </ul>

        <h2>納稅人協助令</h2>
        <p>
          Form 911 也是<strong>納稅人協助令（Taxpayer Assistance Order，TAO）</strong>的申請書。依據內部稅收手冊，當你因為 IRS 執行稅法的方式而正在或即將遭受重大困難、事實與法律支持給予救濟，而 IRS 拒絕或沒有採取必要行動時，TAS 可以發出 TAO。TAO 可以命令 IRS 採取法律允許的行動、停止或不採取某項行動、加速處理你的案件、重新考慮某項決定，或由更高層級審查。但它不能決定你欠多少稅。
        </p>

        <h2>系統性問題</h2>
        <p>
          如果某個 IRS 問題影響很多納稅人，你可以在 IRS.gov/sams 向 TAS 回報。系統性問題回報中不要寫個人資料 — 這不是為你自己的案件申請協助。
        </p>

        <h2>其他協助</h2>
        <ul>
          <li><strong>低收入納稅人診所（LITC）</strong>獨立於 IRS，如果你符合資格，可能可以在你和 IRS 的爭議中代表你，也協助英語非母語的人。請參閱 Publication 4134。</li>
          <li><strong>納稅人權利法案</strong>（Publication 1）列出十項權利，包括知情權、獲得優質服務的權利、對 IRS 立場提出異議並被聽取的權利，以及在獨立機構對 IRS 決定提出上訴的權利。</li>
        </ul>

        <h2>TAS 做不到的事</h2>
        <ul>
          <li><strong>暫停期限：</strong>提交 Form 911 不會延長向稅務法院提出申請、申請催收正當程序聽證，或任何其他必要步驟的時間。</li>
          <li><strong>保證受理或結果：</strong>由 TAS 決定你是否符合資格，而 IRS 仍然依稅法處理。</li>
          <li><strong>決定你的稅務責任</strong> — 即使是納稅人協助令也做不到。</li>
          <li><strong>考慮無理的主張</strong> — 在 Form 911 上提出這類主張，可能會被罰款 $5,000。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 自己的期限要守住</div>
          <p>如果你收到欠稅通知、扣押通知或留置權通知，即使 TAS 已經在協助你，也要按時向稅務法院提出申請或申請聽證。TAS 的協助是和這些權利並行的，不能取代它們。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

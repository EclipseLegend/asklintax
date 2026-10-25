import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/injured-innocent-spouse-relief.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'injured-innocent-spouse-relief',
  sourceHash:      'ea040a750b6d',
  id:            '115',
  title:         '受損配偶與無辜配偶救濟：Form 8379 與 Form 8857',
  titleEn:       'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 8379 說明（2024 年 11 月版）、Form 8857 說明（2021 年 6 月版）與 Publication 971（2021 年 12 月版），說明受損配偶分配與四種無辜配偶救濟。本文對夫妻共同財產規定只做簡要說明，也不詳細說明稅務法院程序',
  persona:       ['合併申報的退稅被拿去抵另一方債務的配偶', '因合併申報稅表而收到帳單的離婚或分居者', '不知道配偶有未申報收入的人', '住在夫妻共同財產州的已婚夫妻'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '如果你在合併申報退稅中的份額被拿去抵配偶過期未付的債務，請申報 Form 8379。如果你被要求負擔應由配偶或前配偶支付的稅，請盡快申報 Form 8857。期限依救濟類型而定：無辜配偶救濟與責任分離救濟，通常最晚是 IRS 第一次向你催收後 2 年內。',
  sources: [
    { label: 'IRS — Form 8379 說明（2024 年 11 月版），受損配偶分配', url: 'https://www.irs.gov/pub/irs-pdf/i8379.pdf' },
    { label: 'IRS — Form 8857 說明（2021 年 6 月版），申請無辜配偶救濟', url: 'https://www.irs.gov/pub/irs-pdf/i8857.pdf' },
    { label: 'IRS — Publication 971（2021 年 12 月版），無辜配偶救濟', url: 'https://www.irs.gov/pub/irs-pdf/p971.pdf' },
  ],
}

const FAQS = [
  {
    q: '受損配偶和無辜配偶有什麼不同？',
    a: '受損配偶是要拿回自己在合併申報退稅中的份額，這筆退稅被拿去抵另一方個人過期未付的債務，例如子女撫養費或學生貸款。無辜配偶是要免除合併申報稅表上應由另一方支付的稅、利息與罰款。兩者使用不同的表格：Form 8379 與 Form 8857。',
  },
  {
    q: '可以把 Form 8379 和稅表一起申報嗎？',
    a: '可以。你可以附在合併申報的稅表或修正後的合併申報稅表上，也可以之後單獨申報。如果附在稅表上，請在合併申報稅表第 1 頁左上角寫「Injured Spouse」。如果單獨申報，請附上夫妻雙方所有顯示聯邦預扣稅款的 Form W-2、W-2G 與 1099 副本。',
  },
  {
    q: 'Form 8379 要多久？',
    a: '說明估計，和合併申報稅表一起以電子方式申報約 11 週，紙本約 14 週；在合併申報稅表處理完後單獨申報約 8 週。',
  },
  {
    q: '我的前配偶會知道我申請了無辜配偶救濟嗎？',
    a: '會。依法 IRS 必須聯絡你的配偶或前配偶，讓對方參與程序。沒有例外，即使是受虐者也一樣。IRS 不會透露你的新地址或雇主等個人資料，但你提供的其他資料可能會被揭露。',
  },
  {
    q: '我們合併申報的稅表上列的稅一直沒繳。可以申請無辜配偶救濟嗎？',
    a: '只有衡平救濟可以處理未繳的稅 — 也就是稅表上正確列出但沒有繳的金額。無辜配偶救濟與責任分離救濟只適用於少報的稅，也就是 IRS 之後發現正確稅額比較高的情況。',
  },
  {
    q: '什麼時候申請無辜配偶救濟就太晚了？',
    a: '依救濟類型而定。無辜配偶救濟與責任分離救濟，通常是 IRS 第一次向你催收後 2 年內。衡平救濟適用不同的期限：未繳餘額通常適用 IRS 的催收期間（通常是核定後 10 年），已繳金額則適用退稅期限。共同財產所得救濟有自己的期限，與核定稅額的期間有關。',
  },
]

const RELATED = [
  {
    href: '/library/individual/divorce-alimony-taxes',
    cat:  'Individuals & Families',
    title: '離婚與稅務：贍養費、子女撫養費、財產與退休帳戶',
    desc:  '婚姻結束時的其他稅務問題。',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: '報稅身分與戶長身分：2025 與 2026 年規定',
    desc:  '分開申報以避免共同責任。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  'IRS 的通知可能開始計算申請救濟的期限。',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS 授權書：Form 2848 與 Form 8821 的差別',
    desc:  '授權代理人協助你申請。',
  },
]

export default function InjuredInnocentSpousePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '受損配偶與無辜配偶救濟：Form 8379 與 Form 8857 | AskLinTax 繁體中文',
      description: '受損配偶與無辜配偶的差別：用 Form 8379 拿回被拿去抵配偶債務的合併申報退稅份額，用 Form 8857 申請無辜配偶、責任分離、衡平與夫妻共同財產救濟 — 附期限與範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          合併申報時，夫妻雙方通常都要對全部的稅、利息與罰款負責。有兩種不同的協助方式。<strong>受損配偶</strong>申報 <strong>Form 8379</strong>，拿回自己在合併申報退稅中、被拿去償還另一方個人債務的份額。<strong>無辜配偶</strong>申報 <strong>Form 8857</strong>，免除合併申報稅表上只應由另一方負擔的稅。選錯表格會延誤你的案件。
        </p>

        <h2>哪一種適用於你</h2>
        <ArticleTable
          head={['', '受損配偶（Form 8379）', '無辜配偶救濟（Form 8857）']}
          rows={[
            ['問題', '你在合併申報退稅中的份額已經或即將被拿去抵配偶過期未付的債務', '你要為合併申報稅表上應由配偶或前配偶支付的稅負責'],
            ['常見的債務或項目', '配偶過期未付的聯邦稅、州所得稅、州失業給付債務、子女撫養費，或學生貸款等聯邦非稅債務', '配偶未申報的收入或不實的扣除額或抵稅額，或列出但未繳的稅'],
            ['需要的婚姻狀態', '沒有限制 — 你可以仍然是已婚', '依救濟類型而定'],
            ['如何申報', '和合併申報稅表、修正後的合併申報稅表一起申報，或之後單獨申報', '單獨以郵寄或傳真送交 IRS — 不要附在稅表上'],
            ['期限', '原始截止日（含延期）起 3 年內，或繳納被抵扣稅款後 2 年內，以較晚者為準', '依救濟類型而定 — 見下方的期限說明'],
          ]}
        />

        <h2>受損配偶分配：Form 8379</h2>
        <ul>
          <li><strong>誰符合資格：</strong>你申報合併申報稅表，而你在溢繳稅款中的部分或全部份額，已經或即將被拿去抵配偶依法可執行的過期未付債務。</li>
          <li><strong>誰寄出抵扣通知：</strong>聯邦稅債由 IRS 寄出；州稅、失業給付、子女撫養費與聯邦非稅債務，由財政部財政服務局（Bureau of the Fiscal Service）寄出。</li>
          <li><strong>每年申報：</strong>每個你想拿回被抵扣退稅份額的年度，都要申報 Form 8379。</li>
          <li><strong>夫妻共同財產州：</strong>亞利桑那、加州、愛達荷、路易斯安那、內華達、新墨西哥、德州、華盛頓州與威斯康辛有特別的分配規定，IRS 依州法處理。</li>
        </ul>

        <h2>Form 8857 的四種救濟</h2>
        <ArticleTable
          head={['類型', '主要條件']}
          rows={[
            ['無辜配偶救濟', '合併申報稅表因配偶的錯誤項目而少報稅；你在簽名時不知道也沒有理由知道；要你負責並不公平'],
            ['責任分離救濟', '合併申報稅表少報稅；你已離婚、依法分居、喪偶，或在申報 Form 8857 前整整 12 個月都分開居住；少報的稅在你和配偶之間分配'],
            ['衡平救濟', '有少報或未繳的稅，而且考量所有事實後，要你負責並不公平；這是唯一能處理未繳稅款的救濟'],
            ['共同財產所得救濟', '住在夫妻共同財產州、沒有合併申報的已婚者，就某項共同財產所得的稅申請救濟'],
          ]}
        />
        <p>
          <strong>部分救濟：</strong>如果你知道某個錯誤項目，但不知道它的全部範圍，你可能可以就不知道的部分獲得救濟。責任分離救濟不會退還已經繳的金額，也不適用於你在簽名時實際知道的少報部分。
        </p>

        <h2>Form 8857 的期限</h2>
        <ul>
          <li><strong>無辜配偶與責任分離救濟：</strong>最晚在 IRS 第一次向你催收後 2 年內 — 例如 IRS 用你另一個年度的退稅抵債並告知你可以申報 Form 8857，或寄出擬扣押通知。</li>
          <li><strong>衡平救濟：</strong>未繳餘額通常在 IRS 的催收期間內（通常是核定後 10 年）；申請退稅則在稅表申報後 3 年內或繳稅後 2 年內，以較晚者為準。</li>
          <li><strong>共同財產所得救濟：</strong>最晚在對配偶核定稅額的期間屆滿前 6 個月，或如果 IRS 在這 6 個月內開始審查，則在 IRS 第一次聯絡你後 30 天內。</li>
          <li><strong>稅務法院通知：</strong>如果你收到欠稅通知（notice of deficiency），也要在 90 天內向稅務法院提出申請，並在其中主張無辜配偶救濟。</li>
        </ul>

        <h2>什麼情況不要申報 Form 8857</h2>
        <ul>
          <li>法院已在最終判決中處理過這個問題，或你實質參與了可以申請救濟的法院程序。</li>
          <li>你已就同一筆債務簽訂和解方案（offer in compromise）或結案協議（closing agreement）。</li>
        </ul>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Rosa', 'Kevin', 'Hana']}
          rows={[
            ['情況', '$3,000 的合併申報退稅被拿去抵她先生前一段關係中過期未付的子女撫養費；大部分預扣稅款是她的', '已離婚；IRS 後來發現前妻在合併申報稅表上未申報的顧問收入', '合併申報稅表列出 $8,000 的稅，前夫答應要繳卻沒有繳'],
            ['表格', 'Form 8379，拿回她的退稅份額', 'Form 8857 — 無辜配偶或責任分離救濟', 'Form 8857 — 只能申請衡平救濟，因為稅是沒繳，不是少報'],
          ]}
        />

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>需要免除合併申報的稅務責任時卻申報 Form 8379</strong>，或相反。</li>
          <li><strong>等文件都齊全才申報</strong>，結果錯過 2 年期限。</li>
          <li><strong>把 Form 8857 附在稅表上</strong>，而不是單獨郵寄或傳真。</li>
          <li><strong>以為離婚判決</strong>把稅分給前配偶就能約束 IRS — 單憑判決並不行。</li>
          <li><strong>單獨申報 Form 8379 時</strong>漏附另一方的 W-2。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 安全與協助</div>
          <p>IRS 必須通知你的配偶或前配偶你申請了 Form 8857。如果你有安全上的顧慮，申報前可以考慮向低收入納稅人診所或稅務專業人士求助，並把不想被分享的個人資料塗黑。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

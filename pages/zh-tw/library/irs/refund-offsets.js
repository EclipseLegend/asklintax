import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/refund-offsets.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'refund-offsets',
  sourceHash:      'ae75889f9fbf',
  id:            '131',
  title:         '退稅被抵扣：IRS 與財政部為什麼扣除你的退稅？',
  titleEn:       'Refund Offsets: When the IRS or Treasury Takes Your Refund',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS「退稅減少」網頁（2026 年 6 月更新）、IRS「受損配偶救濟」網頁（2025 年 11 月更新）、Form 8379 說明（2024 年 11 月修訂版），以及 IRS 退稅常見問題（2026 年 10 月更新），說明聯邦退稅為什麼可能比預期少。本次審閱無法連上財政部財政服務局（Bureau of the Fiscal Service）的網站，因此財政部抵銷計畫的細節只限於 IRS 指引所說明的內容。本文不說明州稅退稅抵扣、破產，或如何向債權機關爭議特定的非稅務債務',
  persona:       ['退稅比預期少的人', '聯合申報退稅被用來抵償一方配偶債務的夫妻', '有逾期學生貸款、子女撫養費或州稅債務的人', '仍欠以前年度稅款的納稅人'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '閱讀你收到的通知，確認是誰減少了你的退稅：IRS 的通知代表 IRS 調整或以前年度的聯邦稅欠款；財政部財政服務局的通知代表財政部抵銷計畫的債務。若要爭議債務，請聯絡通知上列出的機關。如果是聯合申報中配偶的債務，請考慮 Form 8379。',
  sources: [
    { label: 'IRS — 退稅減少（Reduced refund）', url: 'https://www.irs.gov/refunds/reduced-refund' },
    { label: 'IRS — 受損配偶救濟（Injured spouse relief）', url: 'https://www.irs.gov/individuals/injured-spouse-relief' },
    { label: 'IRS — Form 8379 說明（2024 年 11 月修訂版），受損配偶分配', url: 'https://www.irs.gov/pub/irs-pdf/i8379.pdf' },
    { label: 'IRS — 報稅季退稅常見問題', url: 'https://www.irs.gov/refunds/tax-season-refund-frequently-asked-questions' },
  ],
}

const FAQS = [
  {
    q: '為什麼我的退稅比稅表上的金額少？',
    a: 'IRS 列出兩個主要原因。最常見的是你的稅表被調整，例如計算錯誤、你不符合資格的抵稅額或扣除額、你以前年度的欠款，或預估稅的差額。另一個原因是債務抵銷（debt offset），也就是部分或全部退稅被用來償還逾期債務，例如子女撫養費、聯邦機關的非稅務債務、州所得稅債務，或某些州失業救濟金債務。',
  },
  {
    q: '為了非稅務債務扣我退稅的，是 IRS 還是財政部？',
    a: '子女撫養費、聯邦非稅務債務、州所得稅，以及某些州失業救濟金債務的抵銷，是由財政部財政服務局（BFS）透過財政部抵銷計畫（Treasury Offset Program）執行的。BFS 會寄出通知，上面列出原本的退稅金額、抵銷金額，以及收到款項的機關。IRS 表示它不會收到這些抵銷的細節。',
  },
  {
    q: 'IRS 可以處理財政部抵銷計畫的抵銷嗎？',
    a: '一般不行。如果你不同意這筆債務，請依通知上的說明，聯絡收到款項的機關。IRS 表示，只有在 BFS 通知上的退稅金額與你稅表上的退稅金額不同時，才需要聯絡 IRS。',
  },
  {
    q: '我沒有收到抵銷通知，要聯絡誰？',
    a: 'IRS 表示，請聯絡財政部財政服務局的財政部抵銷計畫客服中心，電話 800-304-3107，週一至週五，中部時間上午 7:30 至下午 5 點。BFS 也可以告訴你，聯邦稅以外的某筆債務是否可以從你的退稅中扣除。',
  },
  {
    q: '我的退稅被拿去抵償配偶的債務，可以拿回我的部分嗎？',
    a: '有可能。如果你是聯合申報、你對這筆債務沒有責任，而且你那部分的退稅被用來抵償配偶逾期的聯邦稅、州所得稅、州失業救濟金債務、子女撫養費或聯邦非稅務債務，你可能是受損配偶（injured spouse）。請申報 Form 8379（受損配偶分配）。共同財產州有特殊的分配規定。',
  },
  {
    q: '受損配偶救濟和無辜配偶救濟一樣嗎？',
    a: '不一樣。受損配偶救濟（Form 8379）是要求拿回你那部分被用來抵償配偶個人債務的聯合退稅。無辜配偶救濟（Form 8857）是要求免除聯合申報中應由配偶或前配偶負擔的稅款、利息與罰款。Form 8379 說明指出，如果你要申請無辜配偶救濟，就不要申報 Form 8379。',
  },
]

const RELATED = [
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: '受損配偶與無辜配偶救濟：Form 8379 與 Form 8857',
    desc:  'Form 8379 與 Form 8857 的詳細說明。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如何閱讀 IRS 通知並確認它是真的。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '抵銷後仍欠稅時的選擇。',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS 稅務記錄（transcript）：種類、如何取得，以及和報稅表副本的差別',
    desc:  '帳戶紀錄會顯示退稅如何被抵用。',
  },
]

export default function RefundOffsetsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '退稅被抵扣：IRS 與財政部為什麼扣除你的退稅？ | AskLinTax 繁體中文',
      description: '為什麼你的聯邦退稅變少了：IRS 調整、聯邦稅欠款的抵銷，以及財政部抵銷計畫對子女撫養費、聯邦非稅務債務與州債務的抵銷 — 另說明要聯絡誰、Form 8379 受損配偶救濟，以及退稅追蹤。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          退稅變少可能有三種不同原因，各由不同的單位處理。IRS 可能<strong>調整你的稅表</strong>；IRS 可能把退稅用來抵償你其他年度<strong>積欠的聯邦稅</strong>；或財政部的<strong>財政服務局（Bureau of the Fiscal Service，BFS）</strong>可能透過<strong>財政部抵銷計畫（Treasury Offset Program，TOP）</strong>，為某些非稅務債務扣走部分退稅。你收到的通知會告訴你是哪一種情況 — 以及你要聯絡誰。
        </p>

        <h2>退稅減少的三種情況</h2>
        <ArticleTable
          head={['發生了什麼', '例子', '誰寄通知', '不同意時要聯絡誰']}
          rows={[
            ['IRS 調整你的稅表', '計算錯誤、你不符合資格的抵稅額或扣除額、預估稅的差額', 'IRS', 'IRS，依通知辦理'],
            ['抵償聯邦稅欠款', '你以前年度仍未繳清的稅款', 'IRS', 'IRS，依通知辦理'],
            ['財政部抵銷計畫的抵銷', '逾期的子女撫養費、聯邦機關的非稅務債務（例如學生貸款）、州所得稅債務、某些州失業救濟金債務', '財政部財政服務局', '通知上列為收到款項的機關'],
          ]}
        />
        <p>
          IRS 表示，BFS 的通知會列出原本的退稅金額、抵銷金額，以及收到款項的機關，而抵銷的細節不會提供給 IRS。只有在 BFS 通知上的退稅金額與你稅表上的退稅金額不同時，才需要就 TOP 抵銷聯絡 IRS。
        </p>

        <h2>你能改變什麼、不能改變什麼</h2>
        <ul>
          <li><strong>如果你同意，</strong>不需要採取任何行動。</li>
          <li><strong>如果你不同意 IRS 的調整，</strong>請依 IRS 通知上的說明辦理。你可能需要寄送文件或申報修正申報書。</li>
          <li><strong>如果你不同意 TOP 的債務，</strong>請依 BFS 通知上的說明，聯絡收到款項的機關。IRS 表示它不會收到這些抵銷的細節，因此要處理債務本身，應找被欠款的機關。</li>
          <li><strong>不是每一種債務都能被扣。</strong>IRS 表示，並非所有債務都可以依法從退稅中扣除；BFS 的 TOP 客服中心（800-304-3107）可以告訴你，聯邦稅以外的某筆債務是否適用抵銷。</li>
          <li><strong>合法的抵銷不會</strong>只因為出乎意料就被撤銷。要拿回款項，一般必須證明債務有誤，或你符合受損配偶的資格。</li>
        </ul>

        <h2>聯合申報：受損配偶救濟（Form 8379）</h2>
        <p>
          在聯合申報中，退稅可能被用來抵償<strong>一方配偶</strong>個人的逾期債務。如果另一方是聯合申報、對該債務沒有責任，而且其那部分的退稅被用來抵償配偶逾期的聯邦稅、州所得稅、州失業救濟金債務、子女撫養費或聯邦非稅務債務，就可能是<strong>受損配偶</strong>。
        </p>
        <ArticleTable
          head={['', 'Form 8379 規定']}
          rows={[
            ['何時申報', '當你知道你的部分已經或將會被用來抵償配偶的債務時 — 可以隨聯合申報書申報、隨要求聯合退稅的聯合修正申報書申報，或之後單獨申報'],
            ['期限', '原始申報書期限（含延期）起 3 年內，或繳納後來被抵銷的稅款之日起 2 年內，以較晚者為準。說明指出，第 6511 條所述的某些情況可能延長這個期間，所以並非每種情況的期限都相同'],
            ['每一年', '每一個你想拿回自己部分的年度，都要分別申報一份 Form 8379'],
            ['處理時間', '隨電子申報的聯合申報書約 11 週，隨紙本聯合申報書約 14 週，申報書處理完後單獨申報約 8 週'],
            ['共同財產州', '亞利桑那、加州、愛達荷、路易斯安那、內華達、新墨西哥、德州、華盛頓與威斯康辛 — IRS 依州法分配退稅'],
          ]}
        />
        <p>
          Form 8379 說明提醒，沒有逾期債務時申報 Form 8379 會延誤你的退稅。受損配偶救濟和<strong>無辜配偶救濟</strong>（Form 8857，免除聯合申報的稅款責任）不同；請見<a href="/zh-tw/library/irs/injured-innocent-spouse-relief/">受損配偶 vs. 無辜配偶救濟</a>。
        </p>

        <h2>是抵銷還是退稅遺失？退稅追蹤是另一回事</h2>
        <p>
          抵銷代表退稅被用來償還債務。<strong>退稅追蹤（refund trace）</strong>是用於已經發出但沒有收到的退稅，或遺失、被偷的支票。IRS 退稅常見問題說明，請先等待完整的處理時間 — 退稅支票應在 IRS 開出後 4 週內寄達 — 再透過退稅查詢工具、電話，或 <strong>Form 3911</strong> 申請追蹤。如果你的通知顯示是抵銷，申請退稅追蹤也拿不回這筆錢。
        </p>

        <h2>範例</h2>
        <ArticleTable
          head={['情況', '代表什麼']}
          rows={[
            ['Lin 預期退稅 $2,400，收到 $1,600，IRS 通知說 $800 被用來抵償她以前年度的欠款', 'IRS 為聯邦稅欠款進行的抵銷。有問題請找 IRS。'],
            ['Marco 預期退稅 $1,500，結果一毛都沒收到；BFS 通知說 $1,500 轉給聯邦學生貸款機關', '財政部抵銷計畫的抵銷。如果他對這筆貸款有異議，要聯絡通知上列出的機關。'],
            ['Ana 和 David 聯合申報，預期退稅 $3,000；其中 $2,000 被拿去抵償 David 婚前逾期的子女撫養費', 'Ana 可能是受損配偶，可以申報 Form 8379 要求拿回她的部分。IRS 會依說明計算她的部分，共同財產州則依州法計算。'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 打電話之前先看清楚通知</div>
          <p>通知是 IRS 還是財政部財政服務局寄的，決定了誰能幫你。打錯單位只會浪費時間 — 而在配偶沒有逾期債務時申報 Form 8379，只會延誤你的退稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

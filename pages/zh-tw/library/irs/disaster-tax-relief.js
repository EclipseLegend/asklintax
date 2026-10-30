import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/disaster-tax-relief.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'disaster-tax-relief',
  sourceHash:      'bcc153d217a6',
  id:            '129',
  title:         '災害稅務減免：申報期限延期與災害損失扣除',
  titleEn:       'Disaster Tax Relief: Postponed Deadlines and Casualty Losses',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 547（2025）、IRS「災害情況下的稅務減免」網頁（2026 年 10 月審閱），以及 IRS 災民常見問題（2026 年 7 月更新；說明《自然災害申報減免法》（P.L. 119-29）與《災害相關期限延長法》（P.L. 119-64）），說明聯邦災害稅務減免。災害損失規定以 2025 課稅年度為準；本文審閱時，2026 年 Form 4684 及其說明只有草稿版本，所以本文不說明 2026 年的災害損失規定。本文不詳細說明州的稅務減免、野火救助款，或營業中斷問題',
  persona:       ['住在遭受颶風、野火、水災或暴風雨地區的人', '紀錄或辦公室位於災區的企業老闆', '災害後即將面臨期限的人', '有未獲保險理賠損害的屋主'],
  relatedJourney: ['處理稅務問題', '準備報稅'],
  actionRequired: '在 IRS.gov/DisasterTaxRelief 查詢你所遇災害的 IRS 減免公告，確認涵蓋地區、事件日期、哪些期限延期，以及新的期限。若是個人財產受損，在 Form 4684 上申報前，請先確認損失是否可歸因於聯邦宣布的災害。',
  sources: [
    { label: 'IRS — Publication 547（2025），災害損失、災難與竊盜', url: 'https://www.irs.gov/pub/irs-pdf/p547.pdf' },
    { label: 'IRS — 災害情況下的稅務減免', url: 'https://www.irs.gov/newsroom/tax-relief-in-disaster-situations' },
    { label: 'IRS — 災民常見問題', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/faqs-for-disaster-victims' },
    { label: 'IRS — Around the nation（各州災害減免）', url: 'https://www.irs.gov/newsroom/around-the-nation' },
  ],
}

const FAQS = [
  {
    q: '我所在的州宣布的每一場災害，都能獲得 IRS 減免嗎？',
    a: '不是。依《自然災害申報減免法》，合格的州宣布災害（qualified state-declared disaster）是指州長（或哥倫比亞特區市長）認定造成的損害嚴重到需要減免的自然災難，或火災、水災或爆炸。IRS 之後可以在州長提出書面請求並與 FEMA 協商後，給予期限減免。只有在 IRS 實際給予減免時才適用，而且只適用於公告中的地區、日期與期限。',
  },
  {
    q: '我要怎麼知道我的期限有沒有延期？',
    a: '前往 IRS.gov/DisasterTaxRelief 與 IRS「Around the nation」網頁，這兩個網頁依州與日期列出每一則災害減免公告。每則公告都會寫明涵蓋的地區、事件日期、延期的期限，以及新的期限。',
  },
  {
    q: '我住在災區外，但我的紀錄或報稅人員在災區內，可以獲得減免嗎？',
    a: '有可能。為了在延期期限內完成申報所需的紀錄位於涵蓋地區內的納稅人，可以屬於受影響納稅人。IRS 常見問題說明，災區外的人應撥打 IRS 災害專線 866-562-5227 自行登記（self-identify），說明他們的紀錄位於涵蓋地區，並提供 FEMA 災害編號。',
  },
  {
    q: '延期是否也讓我有更多時間申請退稅？',
    a: '是的。IRS 表示，如果你因為聯邦宣布的災害而有額外時間申報與繳稅，這段額外時間也會延長你申請退稅的時間。依 2025 年 12 月 26 日制定的《災害相關期限延長法》，災害延期在退稅回溯期間上視為延長申報期限；這適用於 2025 年 12 月 26 日之後提出的申請。',
  },
  {
    q: '保險沒有理賠的房屋損害，可以扣除嗎？',
    a: '就 2025 課稅年度而言，個人使用財產（例如你的房子）的災害損失，一般只有在可歸因於聯邦宣布的災害時才能扣除（如果你有個人災害利得，則有例外）。損失要減去保險及其他補償、每次災害 $100，以及調整後總收入的 10%，除非它是合格災害損失。損失在 Form 4684 上計算。',
  },
  {
    q: '可以把損失申報在去年的稅表上，以便早點拿到錢嗎？',
    a: '如果損失可歸因於聯邦宣布的災害，而且發生在 FEMA 認定可獲得公共或個人援助的地區，你可以選擇把它申報在災害年度前一年的申報書或修正申報書上，使用 Form 4684 第 D 部分。這項選擇必須在災害年度原始申報書的一般期限（不含延期）後 6 個月內做出。',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: '錯過報稅截止日，現在該怎麼辦？',
    desc:  '如果你不適用任何災害延期。',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因',
    desc:  '其他申請免除罰款的方法。',
  },
  {
    href: '/library/irs/amend-tax-return',
    cat:  'IRS & Tax Issues',
    title: '報稅表填錯了，要怎麼修改？',
    desc:  '如何申報 Form 1040-X 來申報前一年的損失。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '從退休帳戶提領的規定。',
  },
]

export default function DisasterTaxReliefPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '災害稅務減免：申報期限延期與災害損失扣除 | AskLinTax 繁體中文',
      description: '聯邦災害稅務減免：聯邦宣布與合格的州宣布災害、強制 120 天延期、如何找到你所遇災害的 IRS 公告、退稅期限，以及 Form 4684 上的 2025 年災害損失規定。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          災害發生後，IRS 可能為涵蓋地區內的個人與企業<strong>延後</strong>某些稅務期限。這和<strong>災害損失扣除</strong>不同，後者讓你可以扣除部分未獲理賠的損害。減免不會自動適用於每一場災害：它取決於<strong>宣布的類型</strong>，以及該災害的<strong>特定 IRS 公告</strong>，公告會列出涵蓋地區、延期的期限與新的期限。
        </p>

        <h2>三種不同的減免</h2>
        <ArticleTable
          head={['減免', '作用', '來源']}
          rows={[
            ['申報延期', '對期限落在延期期間內的申報書，給予更多時間申報', '該災害的 IRS 公告'],
            ['繳稅延期', '對期間內到期的稅款，給予更多時間繳納；IRS 可能在延期期間內減免利息與罰款', '該災害的 IRS 公告'],
            ['災害損失扣除', '讓你在 Form 4684 上扣除符合條件、未獲理賠的損害或損失', '損失發生年度的稅法，而不是期限公告'],
          ]}
        />
        <p>
          延期本身不會給你扣除額，而可扣除的災害損失也不會改變你的期限。
        </p>

        <h2>聯邦宣布與州宣布的災害</h2>
        <ul>
          <li><strong>聯邦宣布的災害。</strong>IRS 可以為受聯邦宣布災害影響的納稅人，把某些期限延後最多 1 年，包括申報與繳納所得稅、消費稅與就業稅的期限，以及傳統 IRA 或 Roth IRA 的提撥期限。</li>
          <li><strong>合格的州宣布災害。</strong>《自然災害申報減免法》允許對州長（或哥倫比亞特區市長）宣布、且州長認定嚴重到需要減免的災害，給予同類型的減免。IRS 是在州長提出書面請求並與 FEMA 協商後採取行動。單憑州的宣布，並不保證會有聯邦稅務減免。這些州宣布災害的規定涉及的是期限延期；就 2025 年而言，個人災害損失扣除仍然要求是聯邦宣布的災害。</li>
          <li><strong>強制 120 天延期。</strong>對 <strong>2025 年 7 月 24 日之後</strong>的聯邦宣布災害與合格的州宣布災害，符合條件的受影響納稅人，某些期限可能適用 <strong>120 天</strong>的強制延期（之前是 60 天）。災害的 IRS 公告可以給予更長的延期，最長 1 年。這段期間從宣布中最早的事件日期開始，到最早事件日期或宣布日期（以較晚者為準）後 120 天結束。</li>
        </ul>

        <h2>如何查詢你所遇災害的減免</h2>
        <ul>
          <li>前往 <strong>IRS.gov/DisasterTaxRelief</strong>（災害情況下的稅務減免）與 IRS <strong>Around the nation</strong> 網頁，這些網頁依州與日期列出公告 — 例如以州與年份編號的公告，像是 TX-2026-05。</li>
          <li>在公告中確認<strong>涵蓋的郡或地區</strong>、<strong>事件日期</strong>、<strong>哪些期限</strong>延期，以及<strong>新的期限</strong>。</li>
          <li>符合資格的納稅人包括主要住所位於涵蓋地區的個人、主要營業地點位於涵蓋地區的企業；在當地協助的救援人員；必要紀錄保存在當地的納稅人；以及與符合資格的納稅人共同申報的配偶。</li>
          <li>如果你在涵蓋地區之外，但你的紀錄或報稅人員在區內，請撥打 IRS 災害專線 <strong>866-562-5227</strong> 自行登記。</li>
        </ul>

        <h2>更多時間申請退稅</h2>
        <p>
          依 2025 年 12 月 26 日制定的《災害相關期限延長法》，就退稅回溯期間而言，災害延期視為延長申報期限。這適用於 2025 年 12 月 26 日之後提出的申請。實際上，因災害而獲得的額外申報與繳稅時間，也會延長申請退稅的時間。
        </p>

        <h2>災害損失（2025 課稅年度）</h2>
        <ArticleTable
          head={['損失', '2025 年的處理方式']}
          rows={[
            ['個人使用財產（你的房子、汽車、物品）', '一般只有在可歸因於聯邦宣布的災害時才能扣除；要減去補償、每次災害 $100，以及調整後總收入的 10%；作為逐項扣除額申報'],
            ['合格災害損失', '減去 $500（而不是 $100），不減去調整後總收入的 10%，而且不必逐項扣除也能扣除'],
            ['營業或產生收入的財產', '不受個人使用財產的聯邦宣布災害限制；在 Form 4684 與其他營業表格上申報'],
          ]}
        />
        <p>
          2025 年的<strong>合格災害損失</strong>包括總統在 <strong>2020 年 1 月 1 日至 2025 年 9 月 2 日</strong>之間宣布的重大災害造成的損失，該災害的事件期間須在 2019 年 12 月 28 日當天或之後、2025 年 7 月 4 日當天或之前開始，並在 2025 年 8 月 3 日之前結束（只因 COVID-19 而宣布的災害除外）。《一個偉大美麗法案》（One Big Beautiful Bill Act）延長了這些規定。
        </p>
        <p>
          如果損失可歸因於聯邦宣布的災害，而且發生在 FEMA 認定可獲得公共或個人援助的地區，你可以選擇把它扣除在災害年度的<strong>前一年</strong>，申報在原始或修正申報書上，使用 Form 4684 第 D 部分。這項選擇必須在災害年度原始申報書的一般期限（不含延期）後 6 個月內做出。請見<a href="/zh-tw/library/irs/amend-tax-return/">如何修正申報書</a>。
        </p>
        <p>
          <strong>2026 年的損失：</strong>本文審閱時，2026 年 Form 4684 及其說明只有草稿版本。申報 2026 年的災害損失前，請查看正式的 2026 年 Form 4684 說明與 Publication 547；本文不說明 2026 年的規定。
        </p>

        <h2>其他協助</h2>
        <ul>
          <li>IRS 災害專線（866-562-5227）可以說明所給予的減免、協助申報災害損失、處理地址變更，以及協助取得稅表副本。</li>
          <li>與合格災害相關的某些退休計畫分配，屬於提早分配 10% 額外稅的例外；請見<a href="/zh-tw/library/individual/retirement-withdrawals-rmd/">退休帳戶提領</a>。</li>
          <li>如果不適用任何延期，仍可能申請罰款減免；請見 <a href="/zh-tw/library/irs/irs-penalty-relief/">IRS 罰款減免</a>。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 看公告，不要只看新聞標題</div>
          <p>每一場災害的延期期間、涵蓋的郡與涵蓋的期限都不一樣。在你決定不依原期限辦理之前，先找到你所遇災害的 IRS 公告，確認你的地區、日期與你的特定期限都包括在內。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

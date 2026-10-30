import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/payroll-taxes-941-940.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'payroll-taxes-941-940',
  sourceHash:      '8c51a102428a',
  id:            '126',
  title:         '雇主薪資稅：Form 941、Form 940、稅款繳存與信託基金追繳罰款',
  titleEn:       'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 15（2026）、Form 941 說明（2026 年 3 月修訂版）、Form 940 說明（2025），以及 2025 年版 Schedule A（Form 940），說明雇主的聯邦薪資稅義務。本文審閱時，2026 年最終的 FUTA 抵免減少州尚未公布；IRS 的 2026 年 Schedule A（Form 940）草稿表示，勞工部將於 2026 年 11 月公布。本文不詳細說明州薪資稅、家庭雇主、農業雇主（Form 943），或 Form 945 的非薪資預扣',
  persona:       ['第一次聘請員工的雇主', '為自己發薪的 S 公司老闆', '使用薪資服務公司的小企業老闆', '收到 IRS 薪資稅繳存延遲通知的人'],
  relatedJourney: ['經營小型企業', '處理稅務問題'],
  actionRequired: '依回溯期間確認你的繳存時程（每月或每半週），在每個期限前以電子方式繳存預扣稅款與雇主稅款，每季申報 Form 941、每年申報 Form 940，並保存薪資紀錄至少 4 年。如果你使用薪資服務公司，請確認稅款確實以你的 EIN 繳存。',
  sources: [
    { label: 'IRS — Publication 15（2026），（Circular E）雇主稅務指南', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Form 941 說明（2026 年 3 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i941.pdf' },
    { label: 'IRS — Form 940 說明（2025）', url: 'https://www.irs.gov/pub/irs-pdf/i940.pdf' },
    { label: 'IRS — 2025 年版 Schedule A（Form 940），多州雇主與抵免減少資訊', url: 'https://www.irs.gov/pub/irs-pdf/f940sa.pdf' },
    { label: 'IRS — 繳存與申報就業稅', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes' },
  ],
}

const FAQS = [
  {
    q: '每月還是每半週繳存，是由員工人數決定的嗎？',
    a: '不是。繳存時程取決於你在回溯期間（lookback period）申報的稅款總額 — 對 Form 941 申報者來說，是當年之前 7 月 1 日至 6 月 30 日的四個季度。如果這段期間的稅款是 $50,000 以下，你是每月繳存者；超過的話，你是每半週繳存者。新雇主在營業的第一個日曆年度是每月繳存者，但仍受 $100,000 次日繳存規則限制。',
  },
  {
    q: '申報 Form 941 和繳存稅款有什麼不同？',
    a: '這是兩個不同的義務。繳存（deposit）是依每月或每半週時程，以電子方式繳付預扣稅款與雇主稅款。Form 941 是每季申報書，報告工資與稅款，並與你的繳存金額核對。如期申報 Form 941 不能彌補延遲的繳存，而繳存稅款也不能取代申報。',
  },
  {
    q: '雇主要負擔額外 Medicare 稅嗎？',
    a: '不用。0.9% 的額外 Medicare 稅（Additional Medicare Tax）是員工的稅。員工在一個日曆年度的工資超過 $200,000 時，不論該員工的申報身分，雇主都必須就超過部分預扣，但雇主沒有對應負擔的部分。',
  },
  {
    q: '信託基金追繳罰款會落到我個人身上嗎？',
    a: '有可能，但不會自動適用於每一位老闆。如果信託基金稅款沒有繳納，而且無法立即向企業收取，IRS 可以對它認定負責收取、核算或繳交這些稅款，並且是故意（willfully）不這樣做的每一個人，課徵這項罰款 — 金額為未繳信託基金稅款的 100%。負責人可能包括高階職員、合夥人、員工，以及其他有權支配企業資金的人。「故意」是指自願、有意識且有意圖地這樣做。',
  },
  {
    q: '加州 2025 年的 FUTA 抵免減少，也會適用於 2026 年嗎？',
    a: '不會自動適用。抵免減少是由美國勞工部逐年決定的。2025 年加州的抵免減少為 1.2%。本文於 2026 年 10 月審閱時，2026 年最終的抵免減少州尚未公布；IRS 的 2026 年 Schedule A（Form 940）草稿表示，勞工部將於 2026 年 11 月公布。請在正式的 2026 年版 Schedule A（Form 940）發布後查看。',
  },
  {
    q: '我使用薪資服務公司，還是要負責嗎？',
    a: '一般來說是的。Publication 15 說明，把薪資及相關稅務工作外包給第三方付款人（例如薪資服務公司）的雇主，一般仍然要對這些工作負責，包括稅款的責任（經認證的專業雇主組織另有不同規定）。註冊 EFTPS 可以讓你查看以你的 EIN 繳存的款項。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: '經營 S 公司：合理薪資、Form 1120-S 與 Schedule K-1',
    desc:  '為什麼在公司工作的 S 公司老闆要跑薪資。',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '工作者到底是不是員工。',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation & Structure',
    title: '如何申請 EIN：逐步指南',
    desc:  '雇主開始發薪前需要 EIN。',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因',
    desc:  '如果你被收取繳存罰款，可以怎麼做。',
  },
]

export default function PayrollTaxes941940Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '雇主薪資稅：Form 941、Form 940、稅款繳存與信託基金追繳罰款 | AskLinTax 繁體中文',
      description: '雇主的聯邦薪資稅：所得稅預扣、社會安全稅與 Medicare 稅、2026 年工資基數、941 與 940 表、FUTA 與加州 2025 年抵免減少、每月與每半週繳存、繳存罰款，以及信託基金追繳罰款。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          聘請員工後，你會承擔四項不同的聯邦義務：從員工薪資中<strong>預扣</strong>稅款、<strong>繳付</strong>雇主應負擔的部分、依固定時程以電子方式<strong>繳存</strong>這些稅款，以及<strong>申報</strong> — 通常是每季的 <strong>Form 941</strong> 與每年的 <strong>Form 940</strong>。預扣的所得稅、社會安全稅與 Medicare 稅是為政府代為保管的款項；如果沒有繳交，某些個人可能要依<strong>信託基金追繳罰款</strong>（Trust Fund Recovery Penalty）負個人責任。
        </p>

        <h2>涉及哪些稅</h2>
        <ArticleTable
          head={['稅目', '員工', '雇主', '申報表']}
          rows={[
            ['聯邦所得稅預扣', '依 Form W-4 從工資中預扣', '雇主不需負擔', 'Form 941'],
            ['社會安全稅', '預扣 6.2%', '雇主負擔 6.2%', 'Form 941'],
            ['Medicare 稅', '預扣 1.45%', '雇主負擔 1.45%', 'Form 941'],
            ['額外 Medicare 稅', '就當年超過 $200,000 的工資預扣 0.9%', '雇主不需負擔', 'Form 941'],
            ['FUTA（聯邦失業稅）', '不預扣 — 絕不從員工薪資中扣除', '每位員工前 $7,000 工資的 6.0%，一般可以減去最高 5.4% 的抵免', 'Form 940'],
          ]}
        />
        <p>
          2026 年的社會安全稅工資基數是 <strong>$184,500</strong>：員工當年工資達到這個金額後，就不再課社會安全稅。Medicare 稅沒有工資基數上限。
        </p>

        <h2>Form 941 與 Form 940</h2>
        <ul>
          <li><strong>Form 941</strong> 申報每季的工資、預扣的所得稅，以及雙方的社會安全稅與 Medicare 稅。期限是季度結束後下一個月的最後一天 — <strong>4 月 30 日、7 月 31 日、10 月 31 日與 1 月 31 日</strong>。如果你已如期足額繳存該季所有稅款，可以在季度結束後第二個月的 10 日前申報（例如 5 月 10 日）。</li>
          <li><strong>Form 944</strong> 是年度申報書，只有收到 IRS 通知要使用它的小型雇主，才會用它代替 Form 941。</li>
          <li><strong>Form 940</strong> 申報日曆年度的 FUTA 稅。2025 年 Form 940 的期限是 <strong>2026 年 2 月 2 日</strong>；如果你已如期繳存所有 FUTA 稅，則為 2026 年 2 月 10 日。</li>
        </ul>

        <h2>繳存：每月或每半週</h2>
        <p>
          你的繳存時程<strong>不是由員工人數或發薪頻率決定的</strong>。對 Form 941 申報者來說，它取決於回溯期間在 Form 941 第 12 行申報的稅款。2026 年的回溯期間是 <strong>2024 年 7 月 1 日至 2025 年 6 月 30 日</strong>。
        </p>
        <ArticleTable
          head={['規則', '適用情況', '繳存期限']}
          rows={[
            ['每月時程', '回溯期間稅款 $50,000 以下（以及營業第一個日曆年度的新雇主）', '次月 15 日前'],
            ['每半週時程', '回溯期間稅款超過 $50,000', '週三、週四或週五發薪：下一個週三前。週六至週二發薪：下一個週五前'],
            ['$100,000 次日規則', '在一個繳存期間內的任何一天累積 $100,000 以上的稅款', '下一個營業日前；之後當年剩餘期間與下一年都成為每半週繳存者'],
            ['$2,500 最低金額規則', '本季或上一季的稅款少於 $2,500，且沒有觸發 $100,000 規則', '可以隨如期申報的申報書繳納，不必繳存'],
          ]}
        />
        <p>
          繳存必須以電子資金轉帳方式進行，一般是透過 EFTPS。FUTA 稅另外繳存：當未繳存的 FUTA 稅超過 $500 時，在該季結束後下一個月的最後一天前繳存；如果是 $500 以下，就累計到下一季。
        </p>

        <h2>繳存罰款</h2>
        <ArticleTable
          head={['罰款', '適用情況']}
          rows={[
            ['2%', '延遲 1 至 5 天繳存'],
            ['5%', '延遲 6 至 15 天繳存'],
            ['10%', '延遲 16 天以上繳存；直接繳給 IRS 或隨申報書繳納、而沒有繳存的金額也適用'],
            ['15%', '在 IRS 第一次要求繳稅的通知後超過 10 天仍未繳納的金額，或在你收到要求立即繳納的通知與要求（notice and demand）當天，以較早者為準'],
          ]}
        />
        <p>
          天數以日曆天計算。若有合理原因，IRS 可能免除繳存罰款，也可能適用首次減免；請見 <a href="/zh-tw/library/irs/irs-penalty-relief/">IRS 罰款減免</a>。
        </p>

        <h2>信託基金追繳罰款</h2>
        <ul>
          <li><strong>涵蓋範圍：</strong>信託基金稅款 — 預扣的聯邦所得稅，以及員工應負擔的社會安全稅與 Medicare 稅。罰款金額是<strong>未繳信託基金稅款的 100%</strong>。</li>
          <li><strong>何時使用：</strong>當未繳稅款無法立即向雇主或企業收取時。</li>
          <li><strong>誰可能要負責：</strong>IRS 認定<strong>負責</strong>收取、核算或繳交這些稅款，<strong>並且</strong>是<strong>故意</strong>這樣做的每一個人。負責人可以是公司的高階職員或員工、合夥企業的合夥人或員工、會計師、志工董事或受託人，或任何有權決定企業資金如何支用的人。</li>
          <li><strong>故意</strong>是指自願、有意識且有意圖地這樣做。如果負責人知道收取、核算或繳交信託基金稅款的必要行為沒有進行，或魯莽地忽視政府收取這些稅款的權利所面臨的明顯且已知的風險，就屬於故意。</li>
        </ul>
        <p>
          擁有企業的部分股權，本身並不會讓人要負責；IRS 必須認定負責與故意這兩項標準都成立。
        </p>

        <h2>FUTA 範例：加州，2025 年</h2>
        <p>
          一位加州雇主在 2025 年付給一位員工 $40,000，並如期繳納加州失業稅。加州是 <strong>2025 年的抵免減少州</strong>，比率為 <strong>1.2%</strong>（美屬維京群島是 2025 年另一個抵免減少地區，比率為 4.5%）。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['FUTA 工資（只計前 $7,000）', '$7,000'],
            ['抵免前的 FUTA 稅（6.0%）', '$420'],
            ['州失業稅抵免（5.4%）', '−$378'],
            ['全額抵免後的 FUTA 稅（0.6%）', '$42'],
            ['加州抵免減少（1.2% × $7,000），在 Schedule A（Form 940）上計算', '+$84'],
            ['這位員工 2025 年的 FUTA 稅合計', '$126'],
          ]}
        />
        <p>
          抵免減少視為第四季的稅款。因為這位雇主的 FUTA 稅合計是 $500 以下，可以在 2026 年 2 月 2 日前繳存，或隨 Form 940 繳納；第四季 FUTA 稅超過 $500 的雇主，必須把抵免減少的金額納入第四季的繳存。這個範例<strong>只適用於 2025 年的工資</strong>。抵免減少州與比率每年分別決定；本文審閱時，2026 年最終的名單尚未公布。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 不要把預扣的稅款當成營運資金</div>
          <p>從員工薪資中預扣的稅款屬於政府。把這筆錢拿去付房租或供應商，而沒有繳存，可能讓企業被收取繳存罰款；如果稅款一直未繳，負責的個人也可能被課徵信託基金追繳罰款。如果你無法繳存，請盡快聯絡 IRS，不要拖延。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

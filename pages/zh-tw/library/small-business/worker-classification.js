import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/worker-classification.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'worker-classification',
  sourceHash:      '12f1c7ab009f',
  id:            '134',
  title:         '員工還是獨立承包商？企業如何正確判斷工作者身分',
  titleEn:       'Employee or Independent Contractor? How Businesses Classify Workers',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 15-A（2026）、Publication 15（2026）、Form SS-8 說明（2024 年 1 月修訂版）、IRS「獨立承包商（自僱）還是員工？」網頁（2026 年 5 月更新），IRS 自願分類和解計畫網頁（2026 年 9 月更新），以及 Rev. Proc. 2025-10（第 530 條救濟），說明企業如何為聯邦就業稅目的判斷工作者是員工還是獨立承包商。本文只涵蓋聯邦稅務判斷標準；美國勞工部與各州（包括加州）的規定可能不同，本文不加以分析',
  persona:       ['第一次聘請幫手的小企業老闆', '經常付款給自由工作者的企業', '認為某位工作者可能被錯誤分類的雇主', '正在決定如何聘用工作者的新創公司'],
  relatedJourney: ['經營小型企業', '創業或經營小型企業'],
  actionRequired: '付款給工作者之前，先檢視整體關係：誰控制工作的完成方式、誰控制這份工作的財務面，以及雙方如何看待這段關係。如果工作者是員工，請跑薪資並開立 Form W-2。如果你不確定，可以透過 Form SS-8 請 IRS 判定；想要從今以後重新分類工作者的企業，可能符合 VCSP 的資格。',
  sources: [
    { label: 'IRS — Publication 15-A（2026），雇主補充稅務指南', url: 'https://www.irs.gov/pub/irs-pdf/p15a.pdf' },
    { label: 'IRS — Publication 15（2026），（Circular E）雇主稅務指南', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — 獨立承包商（自僱）還是員工？', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee' },
    { label: 'IRS — Form SS-8 說明（2024 年 1 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/iss8.pdf' },
    { label: 'IRS — 自願分類和解計畫（VCSP）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/voluntary-classification-settlement-program' },
    { label: 'IRS — Rev. Proc. 2025-10，第 530 條救濟', url: 'https://www.irs.gov/pub/irs-drop/rp-25-10.pdf' },
  ],
}

const FAQS = [
  {
    q: '如果工作者簽了獨立承包商合約，這樣就夠了嗎？',
    a: '不夠。Publication 15-A 把書面合約列為顯示雙方想建立何種關係的一項事實，但它只是其中一個因素。所有顯示控制程度與獨立程度的證據都必須一併考量。把某人稱為承包商的合約，並不能推翻工作實際上如何被控制。',
  },
  {
    q: '寄 Form 1099-NEC 給對方，就會讓對方成為承包商嗎？',
    a: '不會。你開立的表格是依照工作者的身分而定，而不是由表格決定身分。如果事實顯示是雇傭關係，這位工作者就是員工，工資應申報在 Form W-2 上，並預扣及繳納薪資稅。',
  },
  {
    q: '有沒有一個因素就能決定答案？',
    a: '沒有。IRS 會檢視三類事實 — 行為控制、財務控制，以及關係類型 — 並綜合衡量。有些因素指向一方，有些指向另一方；不同工作所需的指示程度也不同。',
  },
  {
    q: 'Form SS-8 是什麼？',
    a: 'Form SS-8 是請 IRS 為聯邦就業稅與所得稅預扣目的，判定工作者身分的表格。企業或工作者都可以申報。IRS 一般會把判定結果發給企業，並寄副本給工作者。判定只適用於提出申請的工作者或那一類工作者，在事實與法律沒有改變時對 IRS 有拘束力。它不是查核，所以不適用查核的申訴權利。',
  },
  {
    q: '如果我把員工當成承包商處理，會怎樣？',
    a: 'Publication 15-A 說明，如果你在沒有合理依據的情況下把員工歸類為獨立承包商，你要為這位工作者負擔就業稅。如果符合條件，可能適用第 530 條救濟規定；VCSP 則提供自願從今以後重新分類工作者的途徑。',
  },
  {
    q: 'IRS 的判斷標準也決定最低工資與州的規定嗎？',
    a: '不是。本文涵蓋的是聯邦稅務判斷標準。美國勞工部與各州機關會為工資工時法、失業保險及其他目的，適用自己的規定，結論可能不同。例如加州就有自己的分類架構；請向相關的州機關確認。',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '從工作者角度看同一個問題。',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: '雇主薪資稅：Form 941、Form 940、稅款繳存與信託基金追繳罰款',
    desc:  '工作者是員工時你必須做的事。',
  },
  {
    href: '/library/small-business/issuing-form-1099-nec',
    cat:  'Small Business & Self-Employment',
    title: '開立 Form 1099-NEC 與 1099-MISC：申報門檻、期限與罰款',
    desc:  '申報付給真正承包商的款項。',
  },
  {
    href: '/library/individual/household-employees-schedule-h',
    cat:  'Individuals & Families',
    title: '聘請保母或看護：家庭雇員稅與 Schedule H',
    desc:  '家庭工作者適用自己的規定。',
  },
]

export default function WorkerClassificationPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '員工還是獨立承包商？企業如何正確判斷工作者身分 | AskLinTax 繁體中文',
      description: '企業如何為聯邦稅務目的判斷工作者是員工還是獨立承包商：IRS 普通法判斷標準（行為控制、財務控制、關係類型）、Form SS-8、薪資稅後果、Form W-2 與 Form 1099-NEC、VCSP 與 Form 8952，以及第 530 條救濟。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          工作者的身分取決於<strong>實際的關係</strong>，而不是職稱、合約上的名稱，或你寄出的稅表。依 IRS 的<strong>普通法規則（common-law rules）</strong>，關鍵在於企業是否有權指示並控制工作如何完成。如果有，這位工作者一般就是<strong>員工</strong>：你要預扣所得稅、預扣並繳納社會安全稅與 Medicare 稅、繳納聯邦失業稅，並開立 <strong>Form W-2</strong>。真正的<strong>獨立承包商</strong>自行處理自己的稅，而你要把符合條件的付款申報在 <strong>Form 1099-NEC</strong> 上。
        </p>

        <h2>三類證據</h2>
        <ArticleTable
          head={['類別', 'IRS 檢視的內容', '何時偏向員工']}
          rows={[
            ['行為控制', '關於何時、何地、如何工作的指示；使用什麼工具；誰來協助；依什麼順序進行；按照企業方法進行的訓練', '企業保留控制工作細節的權利，即使實際上沒有行使'],
            ['財務控制', '未獲補償的營業費用、工作者的投資、工作者是否向市場提供服務、工作者如何被支付報酬，以及獲利或虧損的可能性', '工作者按一段時間領取固定工資，投資很少、未獲補償的費用很少，也沒有實際獲利或虧損的機會'],
            ['關係類型', '書面合約、員工型福利、關係的持續性，以及服務是否為企業日常營業的關鍵部分', '預期關係會無限期持續、包含保險或帶薪假等福利，或涵蓋企業的核心工作'],
          ]}
        />
        <p>
          沒有任何單一事實能決定答案。Publication 15-A 說明，所有顯示控制程度與獨立程度的資訊都必須考量。成為承包商不一定需要大量投資，而且有些行業也以時數支付承包商報酬。
        </p>

        <h2>要避免的迷思</h2>
        <ul>
          <li><strong>「我們簽了承包商合約。」</strong>書面合約只是一個因素，不是答案。</li>
          <li><strong>「我會開 1099，所以他們是承包商。」</strong>表格是依身分而定，不會創造身分。</li>
          <li><strong>「他們只是兼職。」</strong>Publication 15 說明，員工是全職還是兼職並不重要。</li>
          <li><strong>「我們稱他們為顧問。」</strong>Publication 15 說明，如果存在雇主與員工的關係，雙方怎麼稱呼並不重要。</li>
        </ul>

        <h2>員工或承包商：有什麼不同</h2>
        <ArticleTable
          head={['', '員工', '獨立承包商']}
          rows={[
            ['聯邦所得稅', '你從工資中預扣', '不預扣（除非適用備用預扣）'],
            ['社會安全稅與 Medicare 稅', '你預扣員工負擔的部分，並繳納雇主負擔的部分', '承包商自行繳納自僱稅'],
            ['聯邦失業稅（FUTA）', '由你繳納', '你不需要繳納'],
            ['年底表格', 'Form W-2', '如果付款達到該付款年度的門檻，開立 Form 1099-NEC'],
            ['你要申報的稅表', '941 與 940 表', '向 IRS 申報 Form 1099-NEC'],
          ]}
        />
        <p>
          Form 1099-NEC 的門檻取決於你付款給工作者的年度 — 一般來說，2025 年的付款為 $600，2026 年的付款為 $2,000；請見<a href="/zh-tw/library/small-business/issuing-form-1099-nec/">開立 1099-NEC 與 1099-MISC 表</a>。員工的薪資義務請見<a href="/zh-tw/library/small-business/payroll-taxes-941-940/">雇主薪資稅</a>。
        </p>

        <h2>取得 IRS 判定：Form SS-8</h2>
        <ul>
          <li>企業或工作者都可以申報 Form SS-8，請 IRS 為聯邦就業稅與所得稅預扣目的判定工作者的身分。</li>
          <li>IRS 可能向所有相關方索取資訊，部分資訊可能會分享給其他相關方。</li>
          <li>正式判定只適用於它所涵蓋的工作者或那一類工作者，在事實與法律沒有改變時對 IRS 有拘束力。在某些情況下，IRS 會改發不具拘束力的資訊函。</li>
          <li>這個程序不是查核，所以不適用查核程序中的申訴權利。</li>
        </ul>

        <h2>如果工作者被錯誤分類</h2>
        <ArticleTable
          head={['選項', '是什麼', '主要條件（不會自動適用）']}
          rows={[
            ['第 530 條救濟規定', '對你沒有當作員工處理的工作者，可能免除聯邦就業稅', '必須同時符合三項條件：(1) 申報一致性 — 你已依非員工的處理方式，一致地申報所有必要的聯邦資訊申報表（例如 1099 表）；(2) 實質一致性 — 自 1977 年 12 月 31 日之後開始的任何期間，你或前身企業都沒有把這位工作者或任何職位實質類似的人當作員工處理（這是回溯期間的限制，企業不需要自 1977 年就存在）；以及 (3) 合理依據 — 例如合理依賴司法判例或已公布的解釋、先前的 IRS 查核，或長期的產業慣例。它不適用於提供給其他企業的某些技術服務專家'],
            ['自願分類和解計畫（VCSP）', '從今以後把工作者當作員工處理，並對過去年度給予部分減免的自願計畫', '你一直把這些工作者當作非員工處理，並在過去 3 年為他們申報了所有必要的 1099 表；你沒有正接受 IRS 的就業稅查核，也沒有正接受勞工部或州政府對其分類的查核；你以 Form 8952 申請，最好在開始日期前至少 120 天提出，並簽署和解協議'],
          ]}
        />
        <p>
          在 VCSP 下，企業要繳納依第 3509(a) 條減免稅率計算、這些工作者最近一個課稅年度報酬原本應繳<strong>就業稅的 10%</strong>，這筆金額不加計利息或罰款，而且過去年度不會因這些工作者的分類而接受就業稅查核。Form 8952 必須由納稅人本人簽署，而不是代表人。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 聯邦、勞工部與州的判斷標準各自獨立</div>
          <p>本文涵蓋的是 IRS 為聯邦就業稅所用的判斷標準。工資工時法、州失業保險、勞工賠償保險，以及州所得稅預扣，可能使用不同的標準並得出不同的結論。例如加州的規定可能與聯邦普通法標準不同；做決定之前，請向相關的州機關或顧問確認。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

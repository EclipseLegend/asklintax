import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/s-corp-reasonable-salary.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 's-corp-reasonable-salary',
  sourceHash:      'd1c88b31b480',
  id:            '77',
  title:         '經營 S 公司：合理薪資、Form 1120-S 與 Schedule K-1',
  titleEn:       'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 關於 S 公司薪酬的指引、2025 年 Form 1120-S 填寫說明、Form 2553、7004 與 7203 填寫說明、Publication 15（2026），以及 IRS 關於合格事業所得扣除額的指引，說明 2025 與 2026 稅務年度 S 公司股東員工的聯邦規定。撰寫本文時，2026 年 Form 1120-S 填寫說明尚未定案。IRS 沒有規定固定的合理薪資金額，本文也不涵蓋州的 S 公司稅',
  persona:       ['LLC 或公司已選擇 S-Corp 身分的擁有人', '正在決定要領多少薪資的企業主', '第一次申報 Form 1120-S 的人', '正在看 Schedule K-1 的 S-Corp 股東'],
  relatedJourney: ['經營小型企業', '了解新稅務規定'],
  actionRequired: '如果你在自己的 S 公司工作，在領取非薪資分配之前，要先透過薪資系統支付自己合理的薪資。在年度結束後第 3 個月的第 15 天前申報 Form 1120-S（或用 Form 7004 申請延期），給每位股東一份 Schedule K-1，並追蹤你的股票稅基。',
  sources: [
    { label: 'IRS — S 公司薪酬與醫療保險問題（S corporation compensation and medical insurance issues）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues' },
    { label: 'IRS — S 公司（S corporations）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations' },
    { label: 'IRS — 2025 年 Form 1120-S 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1120s.pdf' },
    { label: 'IRS — Revenue Procedure 2024-40（2025 年調整項目；S 公司逾期申報罰款，第 2.57 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 年調整項目；S 公司逾期申報罰款，第 4.56 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Form 2553 填寫說明（2020 年 12 月修訂版），包括逾期選擇的救濟', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Form 7004 填寫說明', url: 'https://www.irs.gov/instructions/i7004' },
    { label: 'IRS — Form 7203 填寫說明，S 公司股東股票與債務稅基限制', url: 'https://www.irs.gov/instructions/i7203' },
    { label: 'IRS — Publication 15（2026），雇主稅務指南（Employer\'s Tax Guide）', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — 合格事業所得扣除額（Qualified business income deduction）', url: 'https://www.irs.gov/newsroom/qualified-business-income-deduction' },
  ],
}

const FAQS = [
  {
    q: 'IRS 有計算合理薪資的公式嗎？',
    a: '沒有。IRS 沒有公布固定的金額或比例，而是看實際情況，包括擁有人的訓練與經驗、職責、投入事業的時間，以及類似企業為類似服務支付多少。',
  },
  {
    q: '我可以只領分配、不領薪資嗎？',
    a: '如果你為公司提供服務，就不行。IRS 表示，S 公司在對股東員工做非薪資分配之前，必須先為其服務支付合理的薪酬，而且 IRS 可以把分配重新歸類為要繳僱傭稅的工資。',
  },
  {
    q: 'Form 1120-S 什麼時候要申報？',
    a: '在稅務年度結束後第 3 個月的第 15 天前。2025 曆年的稅表，截止日是 2026 年 3 月 16 日，因為 3 月 15 日是星期日。2026 曆年的截止日是 2027 年 3 月 15 日。Form 7004 一般可以自動延長 6 個月的申報期限 — 但不是延長繳稅期限。',
  },
  {
    q: '我把 S-Corp 的利潤留在公司裡，也要繳稅嗎？',
    a: '一般要。S 公司的所得一般是對股東課稅，而不是對公司課稅。你的份額會列在 Schedule K-1 上，不論有沒有分配給你，都要申報在你自己的稅表上。',
  },
  {
    q: '我的 S-Corp 薪資算 QBI 扣除額的所得嗎？',
    a: '不算。IRS 表示，從 S 公司領取的合理薪酬不是合格事業所得（QBI）。你在 Schedule K-1 上分到的 S 公司事業所得，如果符合其他條件，可以算 QBI。',
  },
  {
    q: '我錯過了 Form 2553 的截止日，有救濟方法嗎？',
    a: '可能有。依 Form 2553 填寫說明所述的 Rev. Proc. 2013-30，如果公司原本打算成為 S 公司、只因為 Form 2553 逾期而不符合、有合理原因並在發現後積極更正、在預定生效日後 3 年又 75 天內申報，而且所有相關股東都一致申報，一般可以獲得救濟。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  '一開始先評估選擇 S-Corp 是否值得。',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business',
    title: 'QBI 扣除額：2025 與 2026 年規定',
    desc:  'S-Corp 的所得與工資如何計入 20% 扣除額。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  'K-1 所得可能仍然需要繳預估稅。',
  },
]

export default function SCorpReasonableSalaryZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '經營 S 公司：合理薪資、Form 1120-S 與 K-1 | AskLinTax 繁體中文',
      description: '2025 與 2026 年 S-Corp 擁有人規定：合理薪資與分配、薪資作業、Form 1120-S 截止日與罰款、Schedule K-1、股票稅基、醫療保險，以及 QBI。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          你的企業成為 <strong>S 公司</strong>之後，你有兩種身分。如果你在公司裡工作，你是<strong>員工</strong>，必須透過薪資系統領取<strong>合理的薪資</strong>，並預扣與繳納社會安全稅與聯邦醫療保險稅。你也是<strong>股東</strong>：公司要申報 <strong>Form 1120-S</strong>，你分到的所得、扣除額與抵稅額會列在 <strong>Schedule K-1</strong> 上，並在你自己的稅表上課稅。薪資以外的利潤可以用分配（distributions）的方式支付，分配不是工資。
        </p>

        <h2>合理薪資：IRS 看哪些因素</h2>
        <p>
          IRS 表示，S 公司在對股東員工做非薪資分配之前，必須先為其服務支付<strong>合理的薪酬</strong>，而且 IRS 可以把分配重新歸類為工資。IRS 列出的因素包括：
        </p>
        <ul>
          <li>訓練與經驗</li>
          <li>職責</li>
          <li>投入事業的時間與心力</li>
          <li>過去的股利紀錄</li>
          <li>支付給非股東員工的薪資</li>
          <li>發放獎金給關鍵人員的時間與方式</li>
          <li>類似企業為類似服務支付多少</li>
          <li>薪酬協議</li>
          <li>是否用公式決定薪酬</li>
        </ul>
        <p>
          IRS 也說明，關鍵在於公司總收入的來源：如果收入來自其他員工的工作，或來自資本與設備，支付給擁有人的款項就可以適當地作為分配。合理薪酬絕不會超過股東實際領到的金額。
        </p>

        <h2>薪資與分配的差別</h2>
        <ArticleTable
          head={['', '薪資（工資）', '分配']}
          rows={[
            ['支付方式', '透過薪資系統，列在 Form W-2 上', '從公司利潤支付，不透過薪資系統'],
            ['社會安全稅與聯邦醫療保險稅', '要 — 社會安全稅員工與雇主各 6.2%（以工資基數為上限：2025 年 $176,100，2026 年 $184,500），聯邦醫療保險稅各 1.45%，工資超過 $200,000 的部分還要預扣額外聯邦醫療保險稅', '不用'],
            ['所得稅', '要，從薪資預扣', '這筆所得已經透過 Schedule K-1 課稅；在你的股票稅基範圍內，分配一般不會再課稅'],
            ['算合格事業所得（QBI）嗎？', '不算', '分配本身不是計算標準 — 能算 QBI 的是你在 K-1 上分到的事業所得'],
          ]}
        />

        <h2>Form 1120-S 與 Schedule K-1</h2>
        <ArticleTable
          head={['項目', '規定']}
          rows={[
            ['截止日', '稅務年度結束後第 3 個月的第 15 天 — 2025 曆年為 2026 年 3 月 16 日（3 月 15 日是星期日）；2026 曆年為 2027 年 3 月 15 日'],
            ['延期', 'Form 7004 — 一般自動延長 6 個月的申報期限，不延長繳稅期限'],
            ['逾期申報罰款', '每逾期一個月或不足一個月（最多 12 個月），乘以股東人數：2026 年應申報的稅表（2025 曆年稅表；Rev. Proc. 2024-40 與 2025 年填寫說明）為 $255，2027 年應申報的稅表（2026 曆年稅表；Rev. Proc. 2025-32）為 $260。如果有應繳稅款，罰款更多'],
            ['Schedule K-1', '列出每位股東分到的所得、扣除額與抵稅額；個人一般申報在 Schedule E（Form 1040）Part II'],
            ['高階主管薪酬', '申報在 Form 1120-S 第 7 行（需要時來自 Form 1125-E）'],
          ]}
        />

        <h2>持股超過 2% 股東的醫療保險</h2>
        <p>
          依 2025 年 Form 1120-S 填寫說明，公司為<strong>持股超過 2% 的股東</strong>（包括股東的配偶、受扶養人，以及未滿 27 歲的子女）支付的醫療保險，視為工資：要列入股東 Form W-2 的 box 1，並在 box 14 列為資訊項目。如果符合自雇者醫療保險的規定，股東可能可以在 Schedule 1（Form 1040）第 17 行扣除。
        </p>

        <h2>股票稅基與 Form 7203</h2>
        <p>
          你的股票稅基會限制你能扣除的損失，也決定分配是否免稅。如果你扣除你分到的 S 公司損失、收到非股利分配、處分 S 公司股票，或收到 S 公司償還的借款，就必須隨稅表申報 <strong>Form 7203</strong>。
        </p>

        <h2>範例（示意，2026 年）</h2>
        <p>
          <strong>Ana</strong> 是一家 S 公司唯一的股東，全職在公司工作。在支付她的薪資之前，公司賺了 <strong>$120,000</strong>。她參考類似企業對她這個職位支付的薪資，把薪資定為 <strong>$70,000</strong>。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['透過薪資系統支付的薪資', '$70,000'],
            ['薪資的社會安全稅與聯邦醫療保險稅（員工 + 雇主，15.3%）', '$10,710'],
            ['其中雇主負擔的部分（由公司扣除）', '$5,355'],
            ['她 Schedule K-1 上的事業所得（$120,000 − $70,000 − $5,355）', '$44,645'],
          ]}
        />
        <p>
          Ana 要就她的工資，以及 K-1 上的 $44,645 繳所得稅。如果同樣的 $120,000 是 Schedule C 的利潤，自雇稅大約是 $16,955（$120,000 × 92.35% × 15.3%）。這個比較經過簡化：沒有考慮失業稅、薪資作業與報稅費用、州稅、退休金提撥，以及 QBI 扣除額 — 因為她的工資不是 QBI，QBI 扣除額可能會比較少。
        </p>

        <h2>提出或補救選擇</h2>
        <ul>
          <li><strong>時間：</strong>要在本稅務年度生效，一般必須在該稅務年度開始後 2 個月又 15 天內申報 Form 2553（或在前一個稅務年度內任何時間申報）。</li>
          <li><strong>選擇 S 身分的 LLC</strong> 申報 Form 2553；依 Form 2553 填寫說明，不需要另外申報 Form 8832。</li>
          <li><strong>逾期選擇：</strong>如果符合 Form 2553 填寫說明列出的條件（包括有合理原因，以及所有相關股東都一致申報），一般可以在預定生效日後 3 年又 75 天內依 Rev. Proc. 2013-30 獲得救濟。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>在公司工作卻不領薪資</strong>，只領分配。</li>
          <li><strong>錯過 Form 1120-S 的截止日</strong> — 罰款是按每位股東、每個月計算。</li>
          <li><strong>沒有把持股超過 2% 股東的醫療保險列入 W-2。</strong></li>
          <li><strong>沒有追蹤股票稅基</strong>，或在需要時沒有申報 Form 7203。</li>
          <li><strong>以為 K-1 所得不用繳預估稅。</strong>薪資預扣只涵蓋你的工資，你可能仍然要就 K-1 所得繳<a href="/zh-tw/library/small-business/quarterly-taxes/">預估稅</a>。</li>
          <li><strong>個人與公司的錢混在一起，</strong>很難分清楚工資、分配與費用。</li>
        </ul>

        <h2>你可能需要的 IRS 表格</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Form 2553', '選擇 S 公司身分'],
            ['Form 1120-S 與 Schedule K-1', '公司的年度稅表，以及每位股東分到的份額'],
            ['Form 7004', '延長 Form 1120-S 的申報期限'],
            ['Form 941、940、W-2 與 W-3', '擁有人薪資的薪資稅申報與工資單'],
            ['Form 1125-E', '需要時申報高階主管薪酬'],
            ['Schedule E（Form 1040）', '個人股東申報 K-1 所得的地方'],
            ['Form 7203', '需要時申報股票與債務稅基'],
            ['Form 8995 或 8995-A', '合格事業所得扣除額'],
          ]}
        />

        <h2>加州注意事項</h2>
        <p>
          加州與其他州對 S 公司及其股東的課稅方式，可能和聯邦規定不同。AskLinTax 撰寫本文時，沒有依加州稅務局（Franchise Tax Board）的資料查證加州目前的 S 公司稅率、最低稅額或申報規定，因此本文不列出。依賴任何具體金額之前，請先查看加州稅務局的資料。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 決定薪資時請尋求協助</div>
          <p>IRS 沒有安全港薪資金額。合理薪資取決於你的實際情況，而且 IRS 可以把分配重新歸類為工資。稅務專業人士可以幫你記錄你是如何決定薪資的。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

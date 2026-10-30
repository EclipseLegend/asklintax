import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/issuing-form-1099-nec.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'issuing-form-1099-nec',
  sourceHash:      'b137f5475f64',
  id:            '127',
  title:         '開立 Form 1099-NEC 與 1099-MISC：申報門檻、期限與罰款',
  titleEn:       'Issuing Forms 1099-NEC and 1099-MISC: Thresholds, Deadlines, and Penalties',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'reminder',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 1099-MISC 與 1099-NEC 說明（2025 年 4 月修訂版，適用 2025 年的付款）、持續使用的說明（2026 年 12 月修訂版，日期為 2026 年 6 月 25 日，已以正式版本刊登在 IRS.gov，適用 2026 年的付款）、Publication 1099（2026），以及 IRS 資訊申報罰款網頁（2026 年 10 月審閱），說明企業何時必須開立 Form 1099-NEC 與 1099-MISC。修訂日期代表說明的版本，不代表發布日期。本文不詳細說明付款處理機構的 Form 1099-K 申報、Form 1099-INT、-DIV 或 -B，或州的 1099 申報',
  persona:       ['付款給承包商的小企業老闆', '付款給廠商的房東與物業經理', '聘請其他自由工作者的自由工作者', '準備年底申報的記帳人員'],
  relatedJourney: ['經營小型企業', '了解新稅務規定'],
  actionRequired: '付款給承包商之前先取得 Form W-9，依實際付款的年度追蹤付款，並查看該付款年度的門檻 — 2025 年的大多數付款為 $600，2026 年的大多數付款為 $2,000。在 1 月 31 日前向 IRS 申報 Form 1099-NEC 並提供副本給收款人；如果你有 10 份以上的資訊申報表，必須電子申報。',
  sources: [
    { label: 'IRS — Form 1099-MISC 與 1099-NEC 說明（2026 年 12 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i1099mec.pdf' },
    { label: 'IRS — Form 1099-MISC 與 1099-NEC 說明（2025 年 4 月修訂版）', url: 'https://www.irs.gov/pub/irs-prior/i1099mec--2025.pdf' },
    { label: 'IRS — Publication 1099（2026），特定資訊申報表的一般說明', url: 'https://www.irs.gov/pub/irs-pdf/p1099.pdf' },
    { label: 'IRS — 資訊申報罰款', url: 'https://www.irs.gov/payments/information-return-penalties' },
  ],
}

const FAQS = [
  {
    q: '門檻是 $600 還是 $2,000？',
    a: '取決於你付款的年度。2025 年的付款（在 2026 年初申報），非員工報酬與 1099-MISC 大多數欄位的門檻是 $600。自 2025 年之後開始的課稅年度起，門檻是 $2,000，所以 2026 年的付款（在 2027 年初申報）適用 $2,000。並不是每一類都改變了：權利金仍是 $10，付給律師的總收入仍是 $600。IRS 表示，$2,000 這個金額自 2027 年起會依通膨調整，所以之後的年度請查看最新的說明。',
  },
  {
    q: '如果我付給承包商的金額低於門檻，對方就不用繳稅嗎？',
    a: '不是。門檻只決定你是否必須申報這份表格。不論有沒有收到 Form 1099，收款人都必須在自己的稅表上申報所有收入。',
  },
  {
    q: '付款給公司或 LLC 需要開立 1099 嗎？',
    a: '付款給公司（包括選擇以 C 公司或 S 公司課稅的 LLC）一般不需要。但有例外：即使收款人是公司，律師費、付給律師的總收入，以及醫療與保健付款等仍必須申報。被忽略實體或合夥企業性質的 LLC 在這裡不算公司；Form W-9 會告訴你它的分類。',
  },
  {
    q: '我透過付款 App 或信用卡付款給承包商，需要開立 1099-NEC 嗎？',
    a: '一般不需要。說明指出，以信用卡或付款卡支付的款項，以及包括第三方網路交易在內的某些其他付款，由付款結算機構在 Form 1099-K 上申報，不需要在 Form 1099-MISC 或 Form 1099-NEC 上申報。',
  },
  {
    q: '個人付款需要開立 1099 嗎？例如幫我整修自家房子的承包商？',
    a: '不需要。只有在你的營業或業務過程中支付的款項，才需要開立 Form 1099-MISC 與 1099-NEC。個人付款不需要申報。',
  },
  {
    q: '如果承包商不肯給我 Form W-9 怎麼辦？',
    a: '如果收款人沒有提供納稅人識別號碼，你一般必須開始對應申報的付款進行 24% 的備用預扣（backup withholding）。只要有備用預扣，不論金額多少，都必須在 Form 1099-NEC 或 1099-MISC 上申報該筆付款。',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '工作者是員工還是承包商。',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '付給承包商的款項如何列為營業費用。',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因',
    desc:  '如果你被收取逾期申報罰款。',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: '雇主薪資稅：Form 941、Form 940、稅款繳存與信託基金追繳罰款',
    desc:  '如果工作者是員工，會有什麼不同。',
  },
]

export default function IssuingForm1099NecPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '開立 Form 1099-NEC 與 1099-MISC：申報門檻、期限與罰款 | AskLinTax 繁體中文',
      description: '企業何時必須申報 1099-NEC 與 1099-MISC 表：2025 年付款的 $600 門檻與 2026 年付款的 $2,000 門檻、律師與權利金規定、Form W-9 與備用預扣、1 月 31 日期限、電子申報、更正與罰款。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你在<strong>營業或業務</strong>過程中，付款給非員工的人以取得服務，你可能必須向 IRS 申報 <strong>Form 1099-NEC</strong>，並提供副本給收款人。其他營業付款，例如租金與權利金，則申報在 <strong>Form 1099-MISC</strong> 上。金額門檻取決於<strong>你付款的年度</strong>：大多數付款類型，<strong>2025 年的付款為 $600</strong>，<strong>2026 年的付款為 $2,000</strong>。有些類別在這兩年都使用其他金額，例如權利金 $10，以及付給律師的總收入 $600。
        </p>

        <h2>依付款年度區分的門檻</h2>
        <ArticleTable
          head={['付款', '表格與欄位', '2025 年支付（2026 年申報）', '2026 年支付（2027 年申報）']}
          rows={[
            ['非員工提供的服務（包括零件與材料）', '1099-NEC，第 1a 欄', '$600 以上', '$2,000 以上'],
            ['法律服務的律師費', '1099-NEC，第 1a 欄', '$600 以上', '$2,000 以上'],
            ['付給律師的總收入（例如和解金）', '1099-MISC，第 10 欄', '$600 以上', '$600 以上'],
            ['權利金', '1099-MISC，第 2 欄', '$10 以上', '$10 以上'],
            ['租金；獎金與獎品；其他收入；醫療與保健付款', '1099-MISC，第 1、3 與 6 欄', '$600 以上', '$2,000 以上'],
            ['任何有備用預扣的付款', '1099-NEC 或 1099-MISC，第 4 欄', '任何金額', '任何金額'],
          ]}
        />
        <p>
          $2,000 門檻適用於 2025 年之後開始的課稅年度。Publication 1099（2026）表示，它會自 2027 日曆年度起依通膨調整。2026 年之後的付款，請先查看最新的說明，再依據特定金額。$10 的權利金門檻，以及付給律師總收入的 $600 門檻，都沒有改變。
        </p>

        <h2>誰必須申報</h2>
        <ul>
          <li><strong>只限營業付款。</strong>只申報在你的營業或業務過程中支付的款項。非營利組織與政府機關也適用這些規定。個人付款不需要申報。</li>
          <li><strong>非員工。</strong>Form 1099-NEC 用於非員工報酬。付給員工的工資申報在 Form W-2 上，不是 Form 1099。</li>
          <li><strong>付給公司的款項</strong>一般不需要申報 — 但即使收款人是公司，律師費、付給律師的總收入，以及醫療與保健付款仍必須申報。</li>
          <li><strong>信用卡與 App 付款。</strong>以信用卡、付款卡支付的款項與第三方網路交易，由付款結算機構在 Form 1099-K 上申報，不是由你在 Form 1099-NEC 或 1099-MISC 上申報。</li>
          <li><strong>其他例外</strong>包括購買商品、電話、運費、倉儲及類似項目的付款，以及付給房地產經紀人或物業經理的租金（由他們申報轉付給屋主的租金）。</li>
        </ul>

        <h2>Form W-9 與備用預扣</h2>
        <p>
          付款前請每位收款人填寫 <strong>Form W-9</strong>，讓你取得他們的姓名、納稅人識別號碼與實體分類。如果收款人沒有提供 TIN，或 IRS 通知你某個 TIN 不正確，你一般必須就應申報的付款預扣 <strong>24%</strong> 作為備用預扣，並繳存與申報。之後不論金額多少，你都必須為該收款人申報 Form 1099。IRS 表示，2026 年付款的較高門檻，也適用於相關付款的備用預扣。
        </p>

        <h2>期限</h2>
        <ArticleTable
          head={['表格', '向 IRS 申報', '提供副本給收款人']}
          rows={[
            ['1099-NEC', '1 月 31 日（紙本或電子）', '1 月 31 日'],
            ['1099-MISC', '紙本 2 月 28 日，電子 3 月 31 日', '1 月 31 日；若在第 8 欄或第 10 欄申報金額，則為 2 月 15 日'],
          ]}
        />
        <p>
          如果期限落在週六、週日或法定假日，就延到下一個營業日。期限是以付款年度的下一年計算：2025 年的付款在 2026 年初申報，2026 年的付款在 2027 年初申報。
        </p>

        <h2>電子申報與更正</h2>
        <ul>
          <li><strong>電子申報門檻：</strong>如果你當年總共必須申報 <strong>10 份以上的資訊申報表</strong>（IRS 是把所有類型的資訊申報表合併計算，而不是每種表格分開計算），就必須電子申報。IRS 提供資訊申報收件系統（IRIS）供你使用。</li>
          <li><strong>更正：</strong>紙本表格請依照 Publication 1099。電子更正請見 Publication 5718（IRIS 應用程式對應用程式）或 Publication 5717（IRIS 入口網站）。紙本更正時不要勾選 VOID 方框。</li>
        </ul>

        <h2>罰款</h2>
        <p>
          未向 IRS 申報正確的申報表，以及未向收款人提供正確的報表，會分別受罰。對於<strong>在 2026 年到期</strong>的資訊申報表與收款人報表（2025 年的付款），IRS 列出的每份罰款金額如下：
        </p>
        <ArticleTable
          head={['更正或申報的時間', '每份罰款（2026 年到期）']}
          rows={[
            ['延遲 30 天以內', '$60'],
            ['延遲 31 天至 8 月 1 日', '$130'],
            ['8 月 1 日之後，或未申報', '$340'],
            ['故意忽視', '最低 $680，沒有上限'],
          ]}
        />
        <p>
          平均年度總收入在 500 萬美元（$5 million）以下的小型企業，年度罰款上限較低。如果你能證明有合理原因，可能不適用罰款。之後年度到期的申報表適用的金額，請查看 IRS 資訊申報罰款網頁。
        </p>

        <h2>2026 年版表格有什麼改變</h2>
        <p>
          除了門檻提高之外，2026 年 12 月修訂版的 1099-NEC 與 1099-MISC 表新增了申報現金小費與財政部小費職業代碼的欄位，以及申報加班報酬的欄位，並把地址欄位拆成個別的方框。這些修訂版是持續使用版：用於在 2027 年初申報 2026 年的付款，以及之後的年度，直到 IRS 發布新的修訂版為止，但不能用於更早的年度。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 看付款年度，不是申報年度</div>
          <p>你在 2025 年 12 月付給承包商 $1,500，仍然需要開立 Form 1099-NEC，因為 2025 年的付款適用 $600 門檻 — 即使你是在 2026 年申報這份表格。同樣的 $1,500 如果是在 2026 年支付，就不需要開立 Form 1099-NEC，除非你有從中進行備用預扣。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

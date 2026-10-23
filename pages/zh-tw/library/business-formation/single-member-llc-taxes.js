import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/single-member-llc-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'single-member-llc-taxes',
  sourceHash:      'ab464582a464',
  id:            '76',
  title:         '單一成員 LLC 的稅務：被忽略實體、Schedule C、EIN 與 W-9 規定',
  titleEn:       'Single-Member LLC Taxes: Disregarded Entity, Schedule C, EIN and W-9 Rules',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 單一成員 LLC 指引、Publication 334（2025）、Schedule C 與 Schedule SE 填寫說明（2025）、Form W-9 及其說明，以及 Form 2553 與 Form 5472 填寫說明，說明 2025 與 2026 稅務年度 IRS 如何對單一成員 LLC 課稅。本文只涵蓋聯邦規定；州的 LLC 稅與規費未在此查證',
  persona:       ['只有一位擁有人的 LLC', '成立了 LLC 的自由業者', '第一次報稅的新 LLC 擁有人', '共同擁有 LLC 的夫妻'],
  relatedJourney: ['開始經營小型企業', '自雇的第一年'],
  actionRequired: '如果你的 LLC 只有一位擁有人，而且沒有選擇以公司方式課稅，就在你自己的稅表上（通常是 Schedule C）申報事業收入，並在 Schedule SE 上繳自雇稅。如果 LLC 會有員工或要繳某些消費稅，就替 LLC 申請 EIN；給客戶的 Form W-9 要填你自己的納稅人識別號碼。',
  sources: [
    { label: 'IRS — 單一成員有限責任公司（Single member limited liability companies）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies' },
    { label: 'IRS — 有限責任公司（Limited liability company, LLC）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc' },
    { label: 'IRS — Publication 334（2025），小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Schedule C（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Schedule SE（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sse' },
    { label: 'IRS — Form W-9（2024 年 3 月修訂版），納稅人識別號碼申請與證明', url: 'https://www.irs.gov/pub/irs-pdf/fw9.pdf' },
    { label: 'IRS — Form 2553 填寫說明（2020 年 12 月修訂版）', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Form 5472 填寫說明', url: 'https://www.irs.gov/instructions/i5472' },
    { label: 'IRS — Publication 15（2026），雇主稅務指南（Employer\'s Tax Guide）', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
  ],
}

const FAQS = [
  {
    q: '我的單一成員 LLC 要自己報稅嗎？',
    a: '就聯邦所得稅來說不用，除非它選擇以公司方式課稅。單一成員 LLC 預設是「被忽略實體」（disregarded entity），所以它的收入與費用會列在擁有人的稅表上 — 如果擁有人是經營事業的個人，通常是 Schedule C。',
  },
  {
    q: '成立 LLC 會讓我少繳稅嗎？',
    a: '光是成立 LLC 不會。經營事業的單一成員 LLC 的個人擁有人，繳自雇稅的方式和獨資經營者一樣。只有在 LLC 選擇以公司方式課稅（例如 S 公司）時，課稅方式才會改變。',
  },
  {
    q: '我的單一成員 LLC 需要 EIN 嗎？',
    a: 'IRS 表示，被忽略的單一成員 LLC 如果有員工，或必須申報某些消費稅表，就需要自己的 EIN。如果兩者都沒有，就聯邦稅務而言可以使用擁有人的姓名與納稅人識別號碼，但仍然可以申請 EIN — 例如為了開銀行帳戶，或州法要求時。',
  },
  {
    q: '客戶要我填 Form W-9，要填哪個號碼？',
    a: '對於擁有人是美國人的被忽略 LLC，Form W-9 應該填擁有人的社會安全號碼或 EIN — 而不是 LLC 的 EIN。第 1 行填擁有人的姓名，第 2 行填 LLC 的名稱，第 3a 行勾選擁有人的稅務分類（例如個人／獨資經營者）。',
  },
  {
    q: '我和配偶一起擁有這家 LLC，它還算單一成員 LLC 嗎？',
    a: '一般不算。在非共同財產州，夫妻共同擁有的 LLC 應該以合夥方式申報。在共同財產州，如果夫妻以共同財產方式擁有、而且沒有其他擁有人，依 Rev. Proc. 2002-69，IRS 會接受把它當作被忽略實體或合夥事業處理。',
  },
  {
    q: '我不是美國人，擁有一家美國的單一成員 LLC，有額外規定嗎？',
    a: '有。由外國人完全擁有的美國被忽略實體，如果和關係人有應申報的交易，一般必須申報 Form 5472，並附在一份形式上的（pro forma）Form 1120 上；沒有申報時，IRS 可以處以 $25,000 的罰款。這種情況請尋求專業協助。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  'LLC 是什麼，以及它能為你做什麼、不能做什麼。',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '單一成員 LLC 的事業收入通常申報在這裡。',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  '什麼時候替 LLC 選擇 S-Corp 課稅可能划算。',
  },
]

export default function SingleMemberLlcTaxesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '單一成員 LLC 的稅務：被忽略實體、Schedule C 與 EIN | AskLinTax 繁體中文',
      description: 'IRS 如何對單一成員 LLC 課稅：被忽略實體身分、Schedule C 與自雇稅、LLC 什麼時候需要 EIN，以及如何填寫 Form W-9。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>單一成員 LLC</strong> 是只有一位擁有人的 LLC。就聯邦所得稅而言，除非 LLC 選擇以公司方式課稅，IRS 會把它當作<strong>「被忽略實體」</strong>（disregarded entity）— 好像 LLC 和擁有人沒有分開一樣。如果你是個人、LLC 經營事業，一般就在你自己的 Form 1040 的 <strong>Schedule C</strong> 上申報它的收入與費用，並在 <strong>Schedule SE</strong> 上繳<strong>自雇稅</strong>，就跟獨資經營者一樣。
        </p>
        <p>
          不過，LLC 並<strong>不是</strong>在所有方面都被忽略。就<strong>僱傭稅</strong>與某些<strong>消費稅</strong>而言，IRS 把單一成員 LLC 當作獨立的實體，使用它自己的名稱與 EIN。
        </p>

        <h2>IRS 如何分類 LLC</h2>
        <ArticleTable
          head={['LLC', '預設的聯邦所得稅處理方式', '可以選擇']}
          rows={[
            ['一位成員', '被忽略實體 — 列在擁有人的稅表上', '公司（Form 8832）或 S 公司（Form 2553）'],
            ['兩位或以上成員', '合夥事業 — 申報 Form 1065', '公司（Form 8832）或 S 公司（Form 2553）'],
          ]}
        />
        <p>
          可以選擇以公司方式課稅的 LLC，如果及時申報 Form 2553，從 S 選擇生效日起就會被當作公司，不需要另外申報 Form 8832。本文說明維持預設處理方式的單一成員 LLC。
        </p>

        <h2>收入要申報在稅表的哪裡</h2>
        <ArticleTable
          head={['LLC 做什麼', '個人擁有人通常申報在哪裡']}
          rows={[
            ['經營事業（顧問、設計、網路商店）', 'Schedule C，事業損益（Profit or Loss From Business）'],
            ['持有出租不動產', 'Schedule E，補充收入與損失（Supplemental Income and Loss）'],
            ['經營農業', 'Schedule F，農業損益（Profit or Loss From Farming）'],
          ]}
        />
        <p>
          如果擁有人是公司或合夥事業而不是個人，LLC 會在擁有人的稅表上當作擁有人的一個部門申報。
        </p>

        <h2>自雇稅</h2>
        <p>
          IRS 表示，經營事業的單一成員 LLC 的個人擁有人，要和獨資經營者一樣繳自雇稅。自雇淨收入達到 $400 以上時，自雇稅一般以自雇淨收入的 92.35% 計算。社會安全稅部分（12.4%）只適用到每年的工資基數上限 — <strong>2025 年為 $176,100</strong>、<strong>2026 年為 $184,500</strong> — 聯邦醫療保險（Medicare）部分（2.9%）則沒有上限。請見<a href="/zh-tw/library/small-business/self-employment-tax/">自雇稅</a>。
        </p>

        <h2>用 EIN 還是社會安全號碼？</h2>
        <ArticleTable
          head={['用途', '要使用哪個名稱與號碼']}
          rows={[
            ['所得稅申報表與資訊申報表（例如客戶寄給你的 Form 1099）', '擁有人的姓名與 SSN 或 EIN'],
            ['你給客戶的 Form W-9', '第 1 行：擁有人的姓名。第 2 行：LLC 的名稱。第 3a 行：擁有人的分類（例如個人／獨資經營者）。納稅人識別號碼：擁有人的 SSN 或 EIN — 不是 LLC 的 EIN'],
            ['僱傭稅（2009 年 1 月 1 日以後支付的工資）', 'LLC 自己的名稱與 EIN'],
            ['某些消費稅（Form 720、730、2290、11-C，以及 Form 637 登記）', 'LLC 自己的名稱與 EIN'],
          ]}
        />
        <p>
          依 IRS 說明，單一成員 LLC 如果有<strong>員工</strong>，或必須申報某些<strong>消費稅</strong>表，就需要自己的 EIN，而大多數新的單一成員 LLC 都會需要。如果兩者都沒有，可以使用擁有人的姓名與納稅人識別號碼，但如果銀行或州法要求，仍然可以申請 EIN。請見<a href="/zh-tw/library/business-formation/ein/">如何申請 EIN</a>。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>Lily</strong> 擁有一家只有一位成員的設計 LLC，沒有做任何選擇。2025 年 LLC 的淨利是 $60,000。她在自己稅表的 Schedule C 上申報。她的自雇稅大約是 <strong>$8,478</strong>（$60,000 × 92.35% × 15.3%），另外還要就這筆利潤繳一般所得稅。LLC 不需要另外申報聯邦所得稅表。
        </p>
        <p>
          <strong>Omar</strong> 擁有一家單一成員 LLC，2026 年請了第一位員工。即使 Omar 仍然在自己的 Schedule C 上申報 LLC 的利潤，LLC 也必須用自己的名稱與 EIN 申報並繳納這位員工的僱傭稅。
        </p>
        <p>
          <strong>Grace 和 Tom</strong> 是夫妻，在一個非共同財產州共同擁有一家 LLC。IRS 表示，他們的 LLC 應該以合夥事業申報（Form 1065），而不是單一成員 LLC。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>在 Form W-9 上填 LLC 的 EIN。</strong>擁有人是美國人的被忽略 LLC，要填擁有人的納稅人識別號碼。</li>
          <li><strong>以為 LLC 要自己申報 Form 1120 或 1065。</strong>維持預設處理方式的單一成員 LLC 不用 — 它的活動列在擁有人的稅表上。</li>
          <li><strong>請了員工卻忘了僱傭稅規定。</strong>薪資稅要用 LLC 自己的名稱與 EIN 申報。</li>
          <li><strong>以為 LLC 可以減少自雇稅。</strong>預設處理方式下的自雇稅和獨資經營一樣。</li>
          <li><strong>沒有確認共同財產規定，就把夫妻共有的 LLC 當作單一成員 LLC。</strong></li>
          <li><strong>沒有繳預估稅。</strong>LLC 的利潤沒有人幫你預扣稅款。請見<a href="/zh-tw/library/small-business/quarterly-taxes/">季度預估稅</a>。</li>
        </ul>

        <h2>你可能需要的 IRS 表格</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Schedule C（或 E、F）', '在你的 Form 1040 上申報 LLC 的收入與費用'],
            ['Schedule SE', '計算自雇稅'],
            ['Form 1040-ES', '繳季度預估稅'],
            ['Form SS-4', '申請 EIN（也可以線上申請）'],
            ['Form W-9', '把你的納稅人識別號碼提供給客戶'],
            ['Form 941 與 940', '如果 LLC 有員工，申報僱傭稅'],
            ['Form 8832 或 Form 2553', '選擇以公司或 S 公司方式課稅'],
            ['Form 5472 與形式上的 Form 1120', 'LLC 由外國人完全擁有時，很多情況下必須申報'],
          ]}
        />

        <h2>加州注意事項</h2>
        <p>
          各州對 LLC 的課稅方式可能和聯邦規定不同，加州也有自己的 LLC 稅、規費與申報規定。AskLinTax 撰寫本文時，沒有依加州稅務局（Franchise Tax Board）的資料查證加州目前的金額與申報規定，因此本文不列出。依賴任何具體金額之前，請先查看加州稅務局的資料。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 只涵蓋聯邦規定</div>
          <p>本文說明 2025 與 2026 稅務年度的聯邦稅務處理。即使 LLC 在聯邦所得稅上是被忽略實體，你所在的州仍可能要求它申報州稅表、繳稅或繳規費。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

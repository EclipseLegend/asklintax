import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/partnership-llc-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'partnership-llc-taxes',
  sourceHash:      'd7a58e9324ca',
  id:            '123',
  title:         '多成員 LLC 與合夥企業稅務：Form 1065 與 Schedule K-1',
  titleEn:       'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '入門說明以合夥企業課稅的美國國內多成員 LLC 如何課稅，依據 2025 年 Form 1065 說明、2025 年合夥人 Schedule K-1 說明、Publication 541（2025 年 12 月版）、Publication 3402（2020 年 3 月版）、Form 7004 說明（2025 年 12 月版），罰款金額則依據 Rev. Proc. 2024-40 與 2025-32。本文不涵蓋合夥企業查帳、第 754 條等選擇、資本帳戶維護、外國合夥人、Schedule K-2 與 K-3，或州的 LLC 稅費',
  persona:       ['一起創業的朋友或家人', '出租房產 LLC 的共同擁有人', '共同擁有企業的夫妻', '收到 Schedule K-1 的成員'],
  relatedJourney: ['剛成立 LLC', '創業或經營小型企業'],
  actionRequired: '如果你的 LLC 有兩個以上的成員，而且沒有選擇以公司身分課稅，通常必須在稅務年度結束後第 3 個月的 15 日前申報 Form 1065（2025 曆年度為 2026 年 3 月 16 日），並給每位成員一份 Schedule K-1。需要更多時間的話，請在該日期前申報 Form 7004。不論是否實際分配現金，成員都要在自己的稅表上申報各自的份額。',
  sources: [
    { label: 'IRS — Form 1065 說明（2025），美國合夥企業所得申報表', url: 'https://www.irs.gov/pub/irs-pdf/i1065.pdf' },
    { label: 'IRS — 合夥人 Schedule K-1（Form 1065）說明（2025）', url: 'https://www.irs.gov/pub/irs-pdf/i1065sk1.pdf' },
    { label: 'IRS — Publication 541（2025 年 12 月版），合夥企業', url: 'https://www.irs.gov/pub/irs-pdf/p541.pdf' },
    { label: 'IRS — Publication 3402（2020 年 3 月版），有限責任公司的課稅', url: 'https://www.irs.gov/pub/irs-pdf/p3402.pdf' },
    { label: 'IRS — Form 7004 說明（2025 年 12 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i7004.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2026 年申報適用金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2027 年申報適用金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '多成員 LLC 怎麼課稅？',
    a: 'LLC 是依州法成立的法律實體，不是聯邦稅的分類。美國國內至少有兩位成員的 LLC，預設在聯邦稅上歸類為合夥企業，除非它用 Form 8832 選擇以公司身分課稅。作為合夥企業，它要申報 Form 1065，但本身通常不繳聯邦所得稅；由每位成員就自己的份額繳稅。',
  },
  {
    q: '沒有拿到現金的合夥收入也要繳稅嗎？',
    a: '要。Schedule K-1 說明指出，不論是否分配，你都可能要為自己在合夥企業所得中的份額繳稅。分配和應稅所得是兩回事。',
  },
  {
    q: '什麼是保證付款（guaranteed payments）？',
    a: '合夥企業為合夥人提供的服務或資本使用而支付、且不以合夥企業所得決定的款項 — 類似薪水。合夥企業通常可以扣除，合夥人則申報為一般所得。這些款項不預扣所得稅；即使合夥企業有虧損，合夥人也要申報全額。',
  },
  {
    q: 'LLC 成員要繳自雇稅嗎？',
    a: '依成員的角色而定。一般合夥人在一般營業所得中的份額與保證付款，通常都屬於自雇淨收入。有限合夥人通常只有提供服務的保證付款要計入。LLC 成員在這方面是否被視為有限合夥人，取決於第 1402(a)(13) 條，可能需要專業判斷。',
  },
  {
    q: 'Form 1065 什麼時候到期？可以延期嗎？',
    a: '在稅務年度結束後第 3 個月的 15 日前。2025 曆年度的到期日是 2026 年 3 月 16 日，因為 3 月 15 日是週末。在原始到期日前申報 Form 7004，通常可以自動延期 6 個月申報。它不會延長每位合夥人自己的繳稅期限。',
  },
  {
    q: '我和配偶共同擁有一家 LLC，一定要申報 Form 1065 嗎？',
    a: '一般而言，由夫妻共同擁有並經營的企業屬於合夥企業。讓夫妻不必申報 Form 1065 的合格聯營（qualified joint venture）選擇，在企業以 LLC 等州法實體持有時不適用。另有一項規定：夫妻依夫妻共同財產州、外國或美國屬地的法律，以共同財產完全擁有某實體時，可以選擇以合夥企業或被忽略實體處理。依賴其中任何一項之前，請先尋求專業建議。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation & Structure',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  '選擇課稅方式之前先了解 LLC 基本概念。',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation & Structure',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  '什麼時候選擇公司課稅可能合理。',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business & Self-Employment',
    title: 'QBI 扣除額：2025 與 2026 年規定',
    desc:  '合夥人可能符合 QBI 扣除額。',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation & Structure',
    title: '如何申請 EIN：逐步指南',
    desc:  '合夥企業需要自己的 EIN。',
  },
]

export default function PartnershipLlcTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '多成員 LLC 與合夥企業稅務：Form 1065 與 Schedule K-1 | AskLinTax 繁體中文',
      description: '多成員 LLC 如何以合夥企業課稅：預設分類、Form 1065 與 Schedule K-1、分配份額、保證付款、自雇稅、到期日與 Form 7004 延期、2026 與 2027 年罰款、成本基礎限制，以及夫妻擁有的 LLC。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          美國國內有兩位以上成員的 LLC，預設以<strong>合夥企業</strong>課稅。LLC 申報資訊申報表 <strong>Form 1065</strong>，並給每位成員一份 <strong>Schedule K-1</strong>，列出各自的所得、扣除與抵稅額份額。合夥企業本身通常不繳聯邦所得稅；由成員就各自的<strong>分配份額（distributive share）</strong>繳稅，不論是否實際把錢拿出來。
        </p>

        <h2>法律結構與稅務分類</h2>
        <ArticleTable
          head={['層次', '意思']}
          rows={[
            ['LLC（州法）', '依州法成立、可以限制所有人責任的法律實體；它本身不是聯邦稅的分類'],
            ['聯邦預設分類', '兩位以上成員：合夥企業。一位成員：被忽略實體'],
            ['合夥企業課稅', 'Form 1065 與 Schedule K-1；所得轉由成員課稅'],
            ['公司選擇', 'LLC 可以用 Form 8832 選擇以公司身分課稅，之後可以再選擇 S 公司身分'],
          ]}
        />
        <p>
          如果成員減少到一位，合夥企業 LLC 會變成被忽略實體；如果單一成員 LLC 增加一位成員，就會變成合夥企業，除非它已選擇公司課稅。公司課稅的選項請見 <a href="/zh-tw/library/business-formation/llc-vs-scorp/">LLC 與 S-Corp</a>。
        </p>

        <h2>所得如何流向成員</h2>
        <ul>
          <li><strong>分配份額：</strong>每位成員在所得、利得、虧損、扣除與抵稅額中的份額，通常依合夥協議決定，列在 Schedule K-1 上。</li>
          <li><strong>不論是否分配都要課稅：</strong>現金分配和應稅所得不是同一回事。</li>
          <li><strong>分別列示的項目：</strong>租金收入與投資組合收入（例如利息、股利與資本利得）和合夥企業的營業所得分開申報。</li>
          <li><strong>保證付款：</strong>為服務或資本支付、不以合夥企業所得決定的固定款項；合夥企業可以扣除，對成員是一般所得，不預扣所得稅。</li>
        </ul>

        <h2>自雇稅：依成員而定</h2>
        <ArticleTable
          head={['成員', '通常計入自雇淨收入的項目']}
          rows={[
            ['一般合夥人', '一般營業所得的份額加上保證付款'],
            ['有限合夥人', '通常只有提供服務的保證付款'],
            ['LLC 成員', '取決於該成員是否依第 1402(a)(13) 條被視為有限合夥人 — 不能只憑 LLC 身分決定'],
          ]}
        />
        <p>出租不動產的收入通常不屬於自雇淨收入。</p>

        <h2>期限與延期</h2>
        <ArticleTable
          head={['項目', '2025 曆年度的合夥企業']}
          rows={[
            ['Form 1065 到期日', '年度結束後第 3 個月的 15 日：2026 年 3 月 16 日（3 月 15 日是週末）'],
            ['延期', '在原始到期日前申報 Form 7004 — 通常自動延期 6 個月申報'],
            ['Schedule K-1', '附在 Form 1065 上，並在到期時交給每位合夥人'],
            ['合夥人自己的稅表', '個人的期限與繳稅是分開的；合夥企業的延期不會延長它們'],
          ]}
        />

        <h2>罰款：兩種不同的罰款</h2>
        <ArticleTable
          head={['罰款', '2026 年到期的申報表或資料', '2027 年到期']}
          rows={[
            ['Form 1065 逾期或不完整（第 6698 條）', '每位合夥人每月 $255，最多 12 個月', '每位合夥人每月 $260，最多 12 個月'],
            ['未交、逾期交付或錯誤的 Schedule K-1（第 6722 條）', '每份 Schedule K-1 $340，有年度上限', '每份 Schedule K-1 $340，年度上限較高'],
          ]}
        />
        <p>
          申報表罰款會乘以合夥人人數，所以即使是三位成員的小 LLC，2025 年的申報表晚三個月申報，罰款就是 $255 × 3 × 3 = $2,295，除非有合理原因。
        </p>

        <h2>扣除虧損的基本限制</h2>
        <ul>
          <li><strong>先看成本基礎：</strong>合夥人只能在年底對合夥企業的調整後成本基礎範圍內，扣除合夥企業虧損的份額；用不到的虧損往後結轉。</li>
          <li><strong>成本基礎包括</strong>出資、合夥人在所得中的份額，通常還包括合夥企業負債的份額，並減去分配與虧損。</li>
          <li><strong>接著</strong>依序適用風險承擔規定、被動活動規定，以及超額營業虧損限制。</li>
        </ul>

        <h2>夫妻擁有的企業</h2>
        <ul>
          <li><strong>一般規定：</strong>夫妻共同擁有並經營一家非公司的企業、分享盈虧，就是合夥人，必須申報 Form 1065。</li>
          <li><strong>合格聯營：</strong>合併申報且雙方都實質參與的夫妻，可以選擇不以合夥企業處理 — 但企業以 LLC 等州法實體持有時不適用。</li>
          <li><strong>夫妻共同財產：</strong>如果夫妻依某州、外國或美國屬地的法律以共同財產完全擁有某實體、沒有其他所有人，而且它不被視為公司，就可以選擇以合夥企業或被忽略實體處理。申報立場的改變會被視為實體的轉換。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 白紙黑字寫清楚</div>
          <p>一份書面的營運協議，寫明盈虧、分配與保證付款如何分配，會讓 K-1 更容易準備，也更站得住腳。合夥企業稅務很快就會變得複雜 — 第一年的申報表可以考慮請稅務專業人士協助。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

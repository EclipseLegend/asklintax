import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/qbi-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'qbi-deduction',
  sourceHash:      '2762ccce6fc0',
  id:            '78',
  title:         'QBI 扣除額：2025 與 2026 年規定',
  titleEn:       'The QBI Deduction: 2025 and 2026 Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 8995 與 8995-A 填寫說明、IRS 關於 QBI 扣除額的指引、Revenue Procedure 2025-32、2026 年 Form 1040-ES，以及 2026 年 Form 8995 填寫說明草稿，說明 2025 與 2026 稅務年度的聯邦合格事業所得（QBI）扣除額。2026 年的門檻與 $400 最低扣除額來自正式 IRS 指引；最低扣除額的實質參與細節來自 2026 年填寫說明草稿。本文不詳細涵蓋 REIT 與 PTP 的計算、合併計算，以及信託與遺產',
  persona:       ['獨資經營者與自由業者', '單一成員 LLC 擁有人', 'S-Corp 股東與合夥人', '在服務業工作的較高收入專業人士'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '如果你有來自獨資事業、合夥事業或 S 公司的所得，請確認是否可以在 Form 8995（如果應稅所得超過門檻，則是 Form 8995-A）上申請 QBI 扣除額。2026 年請確認新的 $400 最低扣除額是否適用於你。',
  sources: [
    { label: 'IRS — 合格事業所得扣除額（Qualified business income deduction）', url: 'https://www.irs.gov/newsroom/qualified-business-income-deduction' },
    { label: 'IRS — 2025 年 Form 8995 填寫說明，合格事業所得扣除額簡易計算', url: 'https://www.irs.gov/pub/irs-pdf/i8995.pdf' },
    { label: 'IRS — 2025 年 Form 8995-A 填寫說明，合格事業所得扣除額', url: 'https://www.irs.gov/pub/irs-pdf/i8995a.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整，第 3.12 與 4.26 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Form 1040-ES（2026），個人預估稅', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' },
    { label: 'IRS — 2026 年 Form 8995 填寫說明草稿（非正式版本）', url: 'https://www.irs.gov/pub/irs-dft/i8995--dft.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: '要分項扣除才能申請 QBI 扣除額嗎？',
    a: '不用。IRS 表示，不論你在 Schedule A 上分項扣除或使用標準扣除額，都可以申請這項扣除額。它是在 Form 8995 或 Form 8995-A 上計算。',
  },
  {
    q: 'QBI 扣除額會減少我的自雇稅嗎？',
    a: '不會。它只減少所得稅的應稅所得，不會減少調整後總收入（AGI）或自雇稅。',
  },
  {
    q: '我從自己的 S 公司領的 W-2 薪資算 QBI 嗎？',
    a: '不算。工資、從 S 公司領取的合理薪酬，以及合夥事業的保證付款（guaranteed payments）都不是 QBI。你在 Schedule K-1 上分到的事業所得可以算。',
  },
  {
    q: '2026 年有什麼改變？',
    a: '2025 年稅法讓這項扣除額成為永久性。2026 年的所得門檻是 $201,750（合併申報 $403,500；夫妻分開申報 $201,775），逐步適用區間擴大為 $75,000（合併申報 $150,000），而且如果你在有實質參與的事業中有至少 $1,000 的合格事業所得，就適用新的 $400 最低扣除額。',
  },
  {
    q: '我是顧問，還能申請這項扣除額嗎？',
    a: '顧問屬於特定服務行業（SSTB）。如果你的應稅所得在門檻以下，SSTB 仍然可以適用。在逐步適用區間內只有一部分可以算，超過逐步適用區間後，SSTB 的所得就不適用。',
  },
  {
    q: '我要用哪一張表格？',
    a: '如果你有 QBI，而且扣除 QBI 前的應稅所得在門檻以下（2025 年為 $197,300，夫妻合併申報為 $394,600），也不是特定農業或園藝合作社的成員，就用 Form 8995。否則，請用 Form 8995-A。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '獨資經營者計算出會成為 QBI 的利潤的地方。',
  },
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation',
    title: '經營 S 公司：合理薪資、Form 1120-S 與 Schedule K-1',
    desc:  '為什麼 S-Corp 工資不是 QBI。',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
]

export default function QbiDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'QBI 扣除額：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: '20% 合格事業所得扣除額：誰符合資格、哪些算 QBI、2025 與 2026 年所得門檻、服務業、2026 年新的 $400 最低扣除額，以及 Form 8995。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>合格事業所得（QBI）扣除額</strong>，也叫第 199A 條扣除額，讓許多獨資事業、合夥事業與 S 公司的擁有人，可以扣除最多 <strong>20% 的合格事業所得</strong>，再加上合格 REIT 股利與合格公開交易合夥事業（PTP）所得的 20%。扣除額以應稅所得（扣除 QBI 前計算）減去淨資本利得後的 20% 為上限。
        </p>
        <ul>
          <li><strong>2025 年：</strong>適用 2018 年以來的規定，並採用 2025 年的所得門檻。</li>
          <li><strong>2026 年：</strong>2025 年稅法讓扣除額成為<strong>永久性</strong>，擴大了逐步適用區間，並為有至少 $1,000 主動 QBI 的納稅人新增 <strong>$400 最低扣除額</strong>。</li>
        </ul>

        <h2>誰可以申請</h2>
        <ul>
          <li>有來自獨資事業（Schedule C）、以獨資方式課稅的單一成員 LLC、合夥事業或 S 公司所得的個人 — 以及某些信託與遺產。</li>
          <li>不論你分項扣除或使用標準扣除額，都可以申請。</li>
          <li>不適用於透過 C 公司賺的所得，也不適用於你身為員工賺的工資。</li>
        </ul>

        <h2>哪些算 QBI — 哪些不算</h2>
        <ArticleTable
          head={['一般算', '不算']}
          rows={[
            ['合格美國事業的淨所得', '工作的工資'],
            ['你從合夥事業或 S 公司分到的事業所得（Schedule K-1）', '從 S 公司領取的合理薪酬'],
            ['要減去自雇稅可扣除的部分、自雇者醫療保險，以及與事業相關的退休計畫扣除額', '合夥事業的保證付款'],
            ['', '資本利得與損失，以及大部分利息與股利'],
            ['', '以合格小費扣除（2025 至 2028 年）、並從事業淨利中排除的小費'],
          ]}
        />

        <h2>所得門檻：2025 與 2026 年</h2>
        <ArticleTable
          head={['報稅身分', '2025 年門檻', '2025 年逐步適用區間上限', '2026 年門檻', '2026 年逐步適用區間上限']}
          rows={[
            ['夫妻合併申報', '$394,600', '$494,600', '$403,500', '$553,500'],
            ['夫妻分開申報', '$197,300', '$247,300', '$201,775', '$276,775'],
            ['其他所有報稅身分', '$197,300', '$247,300', '$201,750', '$276,750'],
          ]}
        />
        <p>
          門檻是以扣除 QBI 前的應稅所得計算。2025 年的金額來自 2025 年 Form 8995 與 8995-A 填寫說明；2026 年的金額來自 Revenue Procedure 2025-32。
        </p>
        <ArticleTable
          head={['你的應稅所得', '會怎樣']}
          rows={[
            ['在門檻以下', '一般是 QBI 的 20%，並受應稅所得上限限制。特定服務行業（SSTB）也可以適用。通常可以用 Form 8995。'],
            ['在逐步適用區間內', '逐步適用 W-2 工資與財產限制，而且 SSTB 的所得只有一部分可以算。請用 Form 8995-A。'],
            ['超過逐步適用區間', '每個事業的扣除額，以其 W-2 工資的 50%，或其 W-2 工資的 25% 加上合格財產未調整稅基的 2.5%，兩者較高者為上限。SSTB 的所得不適用。'],
          ]}
        />

        <h2>特定服務行業（SSTB）</h2>
        <p>
          SSTB 是指在健康、法律、會計、精算、表演藝術、顧問、運動、金融服務、經紀服務、投資與投資管理、證券／合夥權益／商品的交易或買賣等領域提供服務的事業，或主要資產是其員工或擁有人的聲譽或技能的事業（依法規定義）。
        </p>

        <h2>2026 年新規定：$400 最低扣除額</h2>
        <ArticleTable
          head={['規定', '來源', '狀態']}
          rows={[
            ['QBI 最低扣除額 $400，適用於 2025 年 12 月 31 日之後開始的稅務年度', 'Revenue Procedure 2025-32 第 3.12 節（說明 2025 年稅法）', '已立法，依正式 IRS 指引說明'],
            ['你必須有至少 $1,000 的合格事業所得', 'Revenue Procedure 2025-32 第 3.12 節', '已立法，依正式 IRS 指引說明'],
            ['$400 與 $1,000 從 2026 年以後依通膨調整', 'Revenue Procedure 2025-32 第 3.12 節', '已立法，依正式 IRS 指引說明'],
            ['這 $1,000 必須來自你有實質參與（第 469(h) 條）的事業；被動所得不算', '2026 年 Form 8995 填寫說明草稿', '草稿 — 可能會改變'],
            ['最低扣除額如何填寫（Form 8995 新的第 17 行）', '2026 年 Form 8995 填寫說明草稿', '草稿 — 可能會改變'],
          ]}
        />
        <p>
          IRS 說明，2026 年的規定是取一般扣除額（適用應稅所得上限後）與主動合格事業所得最低扣除額兩者中較高者。一般 QBI 扣除額不需要實質參與 — 只有最低扣除額才需要。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>2025 年 — 應稅所得上限：</strong>Jen 單身，是自由接案的平面設計師。她的 Schedule C 利潤是 $80,000，自雇稅可扣除的部分大約是 $5,652，所以她的 QBI 大約是 $74,348，AGI 也大約是 $74,348。減去 $15,750 的標準扣除額後，她扣除 QBI 前的應稅所得大約是 $58,598。她的扣除額是 QBI 的 20%（大約 $14,870）與應稅所得的 20%（大約 <strong>$11,720</strong>）兩者中較小者 — 所以大約是 $11,720。
        </p>
        <p>
          <strong>2026 年 — 最低扣除額：</strong>Ken 實質參與一個小型副業，合格事業所得是 $1,500。20% 是 $300，但因為他的主動 QBI 至少有 $1,000，所以可能適用 <strong>$400</strong> 的最低扣除額，但仍以 2026 年的正式規定為準。
        </p>
        <p>
          <strong>2026 年 — 超過區間的服務業：</strong>Mia 單身，是顧問，扣除 QBI 前的應稅所得是 $300,000。這超過 $276,750，所以她的顧問所得 — 屬於 SSTB — 不適用這項扣除額。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把 S-Corp 工資或保證付款當作 QBI。</strong>它們不是 QBI。</li>
          <li><strong>忘了從 QBI 中減去</strong>自雇稅可扣除的部分、自雇者醫療保險與退休金提撥。</li>
          <li><strong>所得超過門檻還用 Form 8995。</strong>超過門檻時，請用 Form 8995-A。</li>
          <li><strong>以為這項扣除額可以減少自雇稅。</strong>不會。</li>
          <li><strong>把 2026 年的 $400 最低扣除額用在 2025 年。</strong>它從 2026 年開始。</li>
        </ul>

        <h2>表格與填寫位置</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Form 8995', '應稅所得在門檻以下時的簡易計算'],
            ['Form 8995-A（及其附表）', '應稅所得超過門檻，或你是合作社成員時'],
            ['Form 1040', '2025 年填在第 13a 行；2026 年 Form 1040 草稿改到第 13b 行'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 部分 2026 年細節來自填寫說明草稿</div>
          <p>2026 年的門檻與 $400 最低扣除額來自正式 IRS 指引（Revenue Procedure 2025-32）。實質參與測試與新的表格行次來自 2026 年 Form 8995 填寫說明草稿，可能會改變。本文不涵蓋州的稅務處理。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

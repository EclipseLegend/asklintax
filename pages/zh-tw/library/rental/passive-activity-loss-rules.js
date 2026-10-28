import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/passive-activity-loss-rules.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'passive-activity-loss-rules',
  sourceHash:      '243181d822fb',
  id:            '121',
  title:         '出租虧損與被動活動規定：$25,000 特別扣除額與房地產專業人士',
  titleEn:       'Rental Losses and the Passive Activity Rules: The $25,000 Allowance and Real Estate Professionals',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 925（2025）與 2025 年 Form 8582 說明 — 撰寫本文時可取得的最新正式 IRS 資料 — 說明個人出租房產適用的被動活動虧損規定。這些金額由法律明定，不做通膨調整，因此 2025 與 2026 年相同。本文不詳細說明風險承擔（at-risk）規定、活動合併選擇、抵稅額，或遺產與信託',
  persona:       ['出租房產有虧損的房東', '短期出租（Airbnb）房東', '從事房地產工作的人', '出租虧損被暫停扣除的高收入屋主'],
  relatedJourney: ['房產帶來的副業收入', 'Airbnb 與租金收入'],
  actionRequired: '如果你的出租房產有虧損，在拿來抵扣薪資之前，先確認三件事：這項活動在稅法上是否屬於「出租活動」、你是積極參與還是實質參與，以及你的修正後 AGI。今年用不到的虧損不會消失 — 會在 Form 8582 上往後結轉。',
  sources: [
    { label: 'IRS — Publication 925（2025），被動活動與風險承擔規定', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
    { label: 'IRS — Form 8582 說明（2025），被動活動虧損限制', url: 'https://www.irs.gov/pub/irs-pdf/i8582.pdf' },
    { label: 'IRS — Publication 527（2025），住宅出租房產', url: 'https://www.irs.gov/pub/irs-pdf/p527.pdf' },
  ],
}

const FAQS = [
  {
    q: '我的出租虧損可以抵扣 W-2 薪資嗎？',
    a: '只有在有限的情況下可以。出租活動通常屬於被動活動，而被動虧損通常只能抵扣被動收入。主要的例外是：積極參與的屋主可享有 $25,000 特別扣除額（修正後 AGI 超過 $100,000 時開始減少，到 $150,000 完全取消），以及具備房地產專業人士身分並實質參與該出租活動。',
  },
  {
    q: '積極參與和實質參與有什麼不同？',
    a: '積極參與是比較寬鬆的標準，適用於 $25,000 特別扣除額 — 例如核准房客、決定租金與核准支出，而且至少擁有 10% 的權益。實質參與比較嚴格，必須符合 IRS 七項測試之一，例如一年內在該活動工作超過 500 小時。',
  },
  {
    q: '我的 Airbnb 房客平均住 7 天以下，虧損可以抵扣薪水嗎？',
    a: '不會自動可以。平均住宿期間在 7 天以下時，這項活動在被動規定下不屬於「出租活動」，因此不適用 $25,000 出租特別扣除額。這時除非你符合七項測試之一而實質參與，否則該活動仍是被動活動。只有你實質參與的活動，其虧損才是非被動的。',
  },
  {
    q: '如果我是房地產專業人士，所有出租虧損都是非被動的嗎？',
    a: '不是。具備房地產專業人士資格只是第一步。每一項出租活動，仍然要你也實質參與，才是非被動的。除非你選擇把所有出租不動產權益視為單一活動，否則每一項出租不動產權益通常都是個別的活動。',
  },
  {
    q: '不能扣除的出租虧損會怎樣？',
    a: '會被暫停，並在 Form 8582 上結轉到下一年。暫停的虧損可以抵扣未來的被動收入；當你以完全課稅的交易，把該活動的全部權益處分給沒有關係的人時，通常可以全額扣除。',
  },
  {
    q: '我需要申報 Form 8582 嗎？',
    a: '如果你有被動活動扣除項目，通常需要。符合以下所有條件時不用申報：你唯一的被動活動是積極參與的出租不動產、總虧損不超過 $25,000（夫妻分開申報且全年分居者為 $12,500）、沒有以前年度未獲准的虧損或抵稅額，而且修正後 AGI 不超過 $100,000（夫妻分開申報為 $50,000）。',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: '出租房子或公寓，租金收入怎麼課稅？',
    desc:  '租金收入與扣除項目的基本概念。',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    desc:  '短期出租的申報。',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '出售出租房產：折舊回收與 25% 稅率',
    desc:  '出售可以釋放暫停的虧損。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  '被動的租金收入也可能要繳 NIIT。',
  },
]

export default function PassiveActivityLossRulesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '出租虧損與被動活動規定 | AskLinTax 繁體中文',
      description: '出租虧損何時可以抵扣薪資：出租活動與被動活動、積極參與與實質參與、$25,000 特別扣除額與 $100,000–$150,000 的遞減、房地產專業人士、短期出租，以及在 Form 8582 上暫停的虧損。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          出租房產的虧損通常是<strong>被動虧損</strong>，而被動虧損通常只能抵扣被動收入 — 不能抵扣薪資或營業收入。主要有兩個例外：<strong>積極參與</strong>的屋主可享有 <strong>$25,000 特別扣除額</strong>，在修正後 AGI 介於 $100,000 與 $150,000 之間逐步減少；以及具備<strong>房地產專業人士</strong>身分並<strong>實質參與</strong>。用不到的虧損會往後結轉，不會消失。
        </p>

        <h2>依序回答四個問題</h2>
        <ArticleTable
          head={['問題', '為什麼重要']}
          rows={[
            ['1. 在被動規定下，這是「出租活動」嗎？', '長期出租通常是。平均住宿期間在 7 天以下（或在 30 天以下並提供重要個人服務）不屬於出租活動 — 改以一般營業活動的標準判斷'],
            ['2. 這項活動是被動活動嗎？', '出租活動即使你很投入，仍屬被動，除非你是實質參與的房地產專業人士。非出租活動則除非你實質參與，否則屬被動'],
            ['3. 有沒有例外讓你扣除被動的出租虧損？', '積極參與出租不動產可享有 $25,000 特別扣除額，但受修正後 AGI 遞減限制'],
            ['4. 剩下的虧損怎麼辦？', '暫停並在 Form 8582 上往後結轉'],
          ]}
        />

        <h2>積極參與與實質參與</h2>
        <ArticleTable
          head={['', '積極參與（active participation）', '實質參與（material participation）']}
          rows={[
            ['用途', '出租不動產的 $25,000 特別扣除額', '讓營業活動成為非被動，以及讓房地產專業人士的出租成為非被動'],
            ['標準', '較寬鬆：以重要且真實的方式做管理決策，例如核准房客、決定出租條件與核准支出', '嚴格：必須符合七項測試之一'],
            ['持有比例', '你（連同配偶）全年必須持有該活動價值至少 10% 的權益', '測試中沒有最低持有比例'],
          ]}
        />
        <p>Publication 925 的七項實質參與測試包括：</p>
        <ul>
          <li>一年內參與超過 500 小時。</li>
          <li>你的參與幾乎是所有人（包括非所有人）參與的全部。</li>
          <li>超過 100 小時，而且不少於其他任何人。</li>
          <li>重要參與活動（每項超過 100 小時）合計超過 500 小時。</li>
          <li>在前 10 年中任何 5 年有實質參與。</li>
          <li>個人服務活動，且在以前任何 3 年有實質參與。</li>
          <li>依所有事實判斷，你在一年中規律、持續且大量地參與 — 參與 100 小時以下時不適用，而且管理工作的計入有限制。</li>
        </ul>

        <h2>$25,000 特別扣除額與遞減</h2>
        <ArticleTable
          head={['報稅身分', '最高扣除額', '開始遞減（修正後 AGI）', '完全取消']}
          rows={[
            ['單身、戶長、夫妻合併申報', '$25,000', '超過 $100,000', '$150,000 以上'],
            ['夫妻分開申報，全年分居', '$12,500', '超過 $50,000', '$75,000 以上'],
            ['夫妻分開申報，年度中任何時間同住', '無', '—', '—'],
          ]}
        />
        <ul>
          <li>扣除額會減少修正後 AGI 超過門檻部分的 50%。例如修正後 AGI 為 $120,000 時，最高扣除額是 $15,000。</li>
          <li>這裡的修正後 AGI 計算時不含某些項目，包括應稅的社會安全福利、可扣除的 IRA 存款，以及被動活動收入或虧損。</li>
          <li>這些金額由法律明定，不做通膨調整；2025 與 2026 年相同。</li>
        </ul>

        <h2>房地產專業人士</h2>
        <ul>
          <li><strong>每年兩項測試：</strong>你在所有營業活動中提供的個人服務，超過一半是在你實質參與的不動產營業中提供，而且你在這些不動產營業中提供超過 750 小時的服務。</li>
          <li><strong>受雇員工的工時</strong>在房地產業不計入，除非你持有雇主超過 5% 的權益。</li>
          <li><strong>合併申報：</strong>必須由其中一位配偶單獨符合兩項測試，但另一位配偶的工作可以計入實質參與。</li>
          <li><strong>不是自動的：</strong>即使符合資格，每一項出租也只有在你實質參與時才是非被動的。除非你選擇把所有出租不動產權益視為單一活動（見 Schedule E 說明），否則每一項權益都是個別的活動。</li>
        </ul>

        <h2>短期出租</h2>
        <p>
          如果平均住宿期間在 <strong>7 天以下</strong>，或在 <strong>30 天以下</strong>並提供重要的個人服務，這項活動在被動規定下就不屬於出租活動。這讓它不適用「出租一律被動」的規定，但這本身<strong>並不會</strong>讓虧損變成非被動。除非你符合七項測試之一而實質參與，否則該活動仍是被動的，而且不適用 $25,000 出租特別扣除額。如果你自己使用該房屋的天數超過 14 天或公平租金出租天數的 10%（取較大者），則適用另一套規定 — 請見<a href="/zh-tw/library/rental/14-day-rule/">14 天規則</a>。
        </p>

        <h2>暫停的虧損</h2>
        <ul>
          <li>未獲准的被動虧損會結轉到下一年，可以抵扣當時的被動收入。</li>
          <li>當你以完全課稅的交易，把該活動的<strong>全部權益</strong>處分給沒有關係的人時，該活動暫停的虧損通常可以全額扣除。</li>
          <li>每年保留你的 Form 8582 與工作表，以便追蹤結轉金額。</li>
        </ul>

        <h2>範例（2025 年）</h2>
        <ArticleTable
          head={['', 'Grace', 'David', 'Mei']}
          rows={[
            ['事實', '單身，薪資 $90,000，自己管理的長期出租房產虧損 $12,000', '夫妻合併申報，修正後 AGI $135,000，出租虧損 $20,000，積極參與', '單身，薪資 $180,000，平均住 4 晚的短期出租虧損 $18,000；她工作 60 小時，而物業管理人與清潔人員工作更多'],
            ['結果', '$12,000 全部可扣除 — 在 $25,000 扣除額內且低於遞減門檻', '扣除額減為 $7,500（$25,000 − 50% × $35,000）；$12,500 暫停', '不屬於出租活動，但沒有符合任何實質參與測試，所以虧損是被動的並被暫停'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 保留工時紀錄</div>
          <p>實質參與與房地產專業人士身分取決於你能證明的工時。請保留當時記錄的日期、時數與工作內容。沒有紀錄就主張非被動處理，是常見的查帳問題。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

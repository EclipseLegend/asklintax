import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/stock-sale-capital-gains.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'stock-sale-capital-gains',
  sourceHash:      '309862cddc80',
  id:            '61',
  title:         '賣股票賺錢，資本利得怎麼課稅？',
  titleEn:       'I sold stock — how are capital gains taxed?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人在應稅帳戶中出售股票或類似證券。稅率門檻分別列出 2025 與 2026 稅務年度。收藏品、小型企業股票、不動產、加密貨幣與海外帳戶申報，另有規定或指南',
  persona:       ['第一次賣股票的投資人', '賣出公司股票的員工', '收到 Form 1099-B 的人', '正在考慮什麼時候賣的人'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '算出每筆出售的獲利或虧損（賣出金額減去成本基礎），依持有期間分成短期或長期，再根據 Form 1099-B 在 Form 8949 與 Schedule D 上申報。',
  sources: [
    { label: 'IRS — Topic no. 409，資本利得與損失（Capital gains and losses）', url: 'https://www.irs.gov/taxtopics/tc409' },
    { label: 'IRS — Publication 550（2025），投資收入與費用（Investment Income and Expenses）', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Form 8949 填寫說明（2025）', url: 'https://www.irs.gov/instructions/i8949' },
    { label: 'IRS — Schedule D（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sd' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Topic no. 559，淨投資收入稅（Net investment income tax）', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: '我的股票漲了，但還沒賣，要繳稅嗎？',
    a: '不用。獲利一般是在實現（realized）時才課稅，也就是賣出的時候。還沒賣的增值是未實現獲利，不會當作資本利得申報。',
  },
  {
    q: '我剛好持有一年，算長期嗎？',
    a: '還不算。長期指的是持有超過一年。一般從買進的隔天開始算，算到賣出當天（含）為止。',
  },
  {
    q: '長期資本利得真的可能是 0% 稅率嗎？',
    a: '可能，取決於你的總應稅所得。2025 稅務年度，單身申報者應稅所得在 $48,350 以內、夫妻合併申報在 $96,700 以內的部分，長期資本利得適用 0%。超過的部分適用 15% 或 20%。',
  },
  {
    q: '我的 Form 1099-B 沒有列成本基礎，該怎麼辦？',
    a: '你仍然要申報正確的成本基礎 — 一般是你買進的價格，加上某些費用。Form 8949 對券商沒有向 IRS 申報成本基礎的交易，有另外的勾選欄。請用你的購買紀錄填寫。',
  },
  {
    q: '我賣掉後馬上把錢再投資，還要繳稅嗎？',
    a: '要。賣出就是課稅事件；用賣出的錢買別的東西，並不會取消這件事。（如果是賠錢賣出、30 天內又買回同一檔股票，那是另一個問題 — 請見資本損失的指南。）',
  },
]

const RELATED = [
  {
    href: '/library/investment/capital-losses',
    cat:  'Investments & Foreign Accounts',
    title: '股票賠錢，可以抵稅嗎？',
    desc:  '虧損互抵、$3,000 上限、結轉與洗售。',
  },
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: '銀行利息和股利要申報嗎？',
    desc:  '合格股利和長期資本利得適用相同稅率。',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    desc:  '加密貨幣也是財產，有自己的申報細節。',
  },
]

export default function StockSaleCapitalGainsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '賣股票的資本利得怎麼課稅？（2025 與 2026 稅率） | AskLinTax 繁體中文',
      description: '賣了股票？獲利怎麼算、短期與長期持有期間、2025 與 2026 年 0%、15%、20% 的稅率，以及 Form 1099-B、Form 8949 與 Schedule D。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          當你以高於成本的價格<strong>賣出</strong>股票，這筆獲利就是<strong>資本利得</strong>（capital gain），一般要課稅。稅率主要取決於你<strong>持有股票多久</strong>。持有一年或以下產生<strong>短期</strong>利得，依一般所得稅率課稅；持有超過一年產生<strong>長期</strong>利得，依你的應稅所得適用 <strong>0%、15% 或 20%</strong>。股票獲利並沒有單一固定稅率。
        </p>

        <h2>已實現與未實現</h2>
        <p>
          獲利一般只有在<strong>實現</strong>時才課稅，也就是賣出的時候。如果股票漲了但你還持有，那是未實現獲利，還不需要申報資本利得。
        </p>

        <h2>第一步：算出獲利或虧損</h2>
        <p>
          每一筆出售的獲利或虧損，一般是你收到的金額減去<strong>成本基礎</strong>（cost basis）。成本基礎通常從你買進股票的價格開始，包括某些買進費用。如果你在不同時間買進同一檔股票，每一批都可能有不同的成本基礎與持有期間。
        </p>

        <h2>第二步：短期還是長期？</h2>
        <ArticleTable
          head={['持有期間', '類型', '一般的課稅方式']}
          rows={[
            ['一年或以下', '短期', '依一般所得稅率課稅，和薪資一樣'],
            ['超過一年', '長期', '依應稅所得適用 0%、15% 或 20%'],
          ]}
        />
        <p>
          一般從取得股票的隔天開始算，算到賣出當天（含）為止。<strong>繼承</strong>來的股票，不論持有多久，都視為長期。
        </p>

        <h2>各稅務年度的長期資本利得稅率</h2>
        <p>
          稅率級距是依你的<strong>總應稅所得</strong>決定，不是只看這筆獲利。門檻每年依通膨調整，所以請使用出售那一年的表格。
        </p>
        <ArticleTable
          head={['2025 稅務年度 — 報稅身分', '0% 稅率上限', '15% 稅率上限', '超過此金額適用 20%']}
          rows={[
            ['單身', '$48,350', '$533,400', '$533,400'],
            ['夫妻合併申報', '$96,700', '$600,050', '$600,050'],
            ['夫妻分開申報', '$48,350', '$300,000', '$300,000'],
            ['戶長', '$64,750', '$566,700', '$566,700'],
          ]}
        />
        <ArticleTable
          head={['2026 稅務年度 — 報稅身分', '0% 稅率上限', '15% 稅率上限', '超過此金額適用 20%']}
          rows={[
            ['單身', '$49,450', '$545,500', '$545,500'],
            ['夫妻合併申報', '$98,900', '$613,700', '$613,700'],
            ['夫妻分開申報', '$49,450', '$306,850', '$306,850'],
            ['戶長', '$66,200', '$579,600', '$579,600'],
          ]}
        />
        <p>
          資料來源：IRS Rev. Proc. 2024-40（2025 年）與 Rev. Proc. 2025-32（2026 年）。Schedule D 填寫說明裡有把這些稅率套用到稅表上的計算表。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 高收入時另外的 3.8% 稅</div>
          <p>淨投資收入稅（net investment income tax）是另外的 3.8% 稅，當修正後調整總收入超過 $200,000（單身或戶長）、$250,000（夫妻合併申報）或 $125,000（夫妻分開申報）時，可能適用於包括資本利得在內的投資收入。這些門檻不隨通膨調整。</p>
        </div>

        <h2>第三步：申報</h2>
        <ol>
          <li>券商寄來的 <strong>Form 1099-B</strong> 會列出你的出售交易，通常也有成本基礎，以及每筆是短期還是長期。</li>
          <li><strong>Form 8949</strong>：短期交易填在 Part I，長期交易填在 Part II。要勾哪一格，取決於券商是否已向 IRS 申報你的成本基礎。</li>
          <li><strong>Schedule D</strong> 加總你的獲利與虧損，再把結果帶到 Form 1040。</li>
        </ol>
        <p>
          <strong>例外：</strong>不是每一筆出售都必須逐筆列在 Form 8949 上。如果你的 Form 1099-B 顯示成本基礎已向 IRS 申報、沒有任何調整，而且這筆出售不需要更正或調整（也不是收藏品），依 Schedule D 與 Form 8949 的填寫說明，你可以把總數直接填在 Schedule D 的 line 1a（短期）或 line 8a（長期）。成本基礎沒有申報、或顯示的成本基礎有錯的出售，仍然要填在 Form 8949 上。
        </p>

        <h2>例子（舉例用）</h2>
        <p>
          Mei 在 2023 年以 $4,000 買進 100 股，2025 年以 $9,000 賣出。她持有超過一年，所以有 <strong>$5,000 的長期利得</strong>。以單身申報者來說，這筆獲利落在應稅所得 $48,350 以內的部分適用 0%，超過的部分適用 15%。如果她只持有十個月就賣出，同樣的 $5,000 就是短期利得，依她的一般稅率課稅。
        </p>

        <h2>要注意的例外</h2>
        <ul>
          <li><strong>收藏品</strong>的獲利最高可能適用 28% 稅率；某些不動產獲利（unrecaptured section 1250 gain）最高 25%。</li>
          <li>合格小型企業股票有自己的規定。</li>
          <li><strong>加密貨幣</strong>也是財產，但有自己的申報細節 — 請見<a href="/zh-tw/library/investment/crypto-tax/">加密貨幣稅務說明</a>。</li>
          <li><strong>海外</strong>的證券帳戶還會牽涉 FBAR 與 Form 8938 — 請見<a href="/zh-tw/library/investment/foreign-brokerage-account/">海外股票與證券帳戶怎麼申報？</a></li>
        </ul>
        <p>
          如果你是賠錢賣出，請見<a href="/zh-tw/library/investment/capital-losses/">股票賠錢，可以抵稅嗎？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

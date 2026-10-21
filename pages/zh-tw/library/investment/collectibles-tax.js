import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/collectibles-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'collectibles-tax',
  sourceHash:      '6052a20d38fa',
  id:            '89',
  title:         '出售黃金、白銀、錢幣或藝術品：28% 收藏品稅率',
  titleEn:       'Selling Gold, Silver, Coins, or Art: The 28% Collectibles Rate',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 550（2025）、Publication 544、2025 年 Schedule D 填寫說明、2025 年 Form 8949 填寫說明，以及 Form 1099-DIV 填寫說明，說明 2025 與 2026 稅務年度出售退休帳戶以外收藏品的聯邦所得稅規定。本文不涵蓋持有金屬的交易所交易產品、IRA 與退休計畫中的收藏品、經銷商與事業、NFT，也不涵蓋州稅',
  persona:       ['出售金幣、銀幣或金條、銀條的人', '藝術品、郵票、古董或酒類的收藏者', '出售繼承收藏品的繼承人', '想知道收藏品損失能不能扣除的人'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '找出每一件物品的成本基礎與持有期間。在 Form 8949 Part I 或 II 上申報出售並填代碼 C，帶到 Schedule D；如果有長期收藏品利得，要填 28% Rate Gain Worksheet。',
  sources: [
    { label: 'IRS — Publication 550（2025），投資所得與費用', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Publication 544，資產的出售與其他處分', url: 'https://www.irs.gov/publications/p544' },
    { label: 'IRS — 2025 年 Schedule D（Form 1040）填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — Form 1099-DIV 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1099div.pdf' },
    { label: 'IRS — Topic no. 409，資本利得與損失', url: 'https://www.irs.gov/taxtopics/tc409' },
  ],
}

const FAQS = [
  {
    q: '黃金是統一課 28% 嗎？',
    a: '不是。28% 是長期收藏品利得的最高稅率。Publication 550 說明，如果你原本適用較低的稅率，就不適用 28%。持有一年或以下的收藏品按一般稅率課稅。',
  },
  {
    q: '哪些算收藏品？',
    a: 'Schedule D 填寫說明列出藝術品、地毯、古董、金屬（例如金、銀、鉑金條）、寶石、郵票、錢幣、酒類，以及某些其他有形財產。',
  },
  {
    q: '我賣舊首飾的價格比買價低，可以扣除損失嗎？',
    a: '如果是個人使用的就不行。個人使用財產的損失不能扣除，但個人使用財產的獲利要課稅。為投資而持有的收藏品損失，可以是可扣除的資本損失。',
  },
  {
    q: '出售收藏品可以不填 Form 8949 嗎？',
    a: '不行。可以直接在 Schedule D 上填總額的例外不適用於收藏品。要在 Form 8949 上申報，並在 (f) 欄填代碼 C。',
  },
  {
    q: '黃金或白銀 ETF 怎麼課稅？',
    a: '本文不涵蓋。持有金屬的交易所交易產品有不同的結構，課稅方式取決於結構。請查看基金的稅務資訊與它寄給你的表格，並諮詢專業人士。',
  },
  {
    q: '我的共同基金在 Form 1099-DIV 第 2d 欄填了金額，那是什麼？',
    a: '第 2d 欄顯示基金資本利得分配中屬於收藏品（28%）利得的部分。把它填在 Schedule D 填寫說明中 28% Rate Gain Worksheet 的第 4 行。',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '持有期間與 0%、15%、20% 稅率。',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
    desc:  '受贈與繼承的成本基礎規定，以及 Form 8949 欄位。',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    desc:  'NFT 如何可能被視為收藏品。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  '較高收入時對投資獲利另外課的 3.8% 稅。',
  },
]

export default function CollectiblesTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '出售黃金、白銀、錢幣或藝術品：28% 收藏品稅率 | AskLinTax 繁體中文',
      description: '收藏品怎麼課稅：黃金、白銀、錢幣、藝術品與首飾，短期與長期獲利、28% 最高稅率、Form 8949 代碼 C、28% Rate Gain Worksheet、個人使用損失、受贈與繼承。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          黃金、白銀、錢幣、藝術品與其他<strong>收藏品</strong>都是資本資產。如果你在持有<strong>超過一年</strong>後以獲利出售，這筆獲利就是<strong>收藏品利得</strong>，按你的一般稅率課稅，但<strong>不超過 28%</strong>。它不適用股票的 0%、15% 或 20% 稅率。如果你持有一年或以下，獲利是短期的，按一般稅率課稅。
        </p>

        <h2>哪些算收藏品</h2>
        <ul>
          <li>藝術品、地毯與古董</li>
          <li>金屬，例如金、銀、鉑金條</li>
          <li>寶石、郵票與錢幣</li>
          <li>酒類，例如收藏的葡萄酒</li>
          <li>某些其他有形財產</li>
        </ul>
        <p>
          <strong>首飾</strong>沒有單獨列出，但清單包括寶石與金屬。一件首飾是為投資持有的收藏品還是個人使用財產，會影響稅率以及損失能不能扣除。
        </p>

        <h2>短期與長期</h2>
        <ArticleTable
          head={['持有期間', '類型', '獲利一般怎麼課稅']}
          rows={[
            ['一年或以下', '短期', '按一般所得稅率'],
            ['超過一年', '長期收藏品利得', '按你的一般稅率，但不超過 28%'],
          ]}
        />
        <p>
          28% 是<strong>最高</strong>稅率，不是統一稅率。Publication 550 舉例說明：某人的資本利得淨額全部來自收藏品，如果他原本適用低於 28% 的稅率，就不適用 28%。在較高收入時，另外的 3.8% <a href="/zh-tw/library/investment/net-investment-income-tax/">淨投資所得稅</a>也可能適用。
        </p>

        <h2>申報：Form 8949、Schedule D 與 28% 工作表</h2>
        <ul>
          <li><strong>Form 8949：</strong>每一筆出售申報在 Part I（短期）或 Part II（長期）。在 (f) 欄填<strong>代碼 C</strong>，(g) 欄填 -0-。如果你沒有收到 Form 1099-B，使用 box C 或 box F。</li>
          <li><strong>沒有 Schedule D 捷徑：</strong>直接在 Schedule D 第 1a 或 8a 行填總額的例外不適用於收藏品。</li>
          <li><strong>28% Rate Gain Worksheet：</strong>如果 Schedule D 第 17 行是「Yes」，而且你有長期收藏品利得或損失，就要填 Schedule D 填寫說明中的這份工作表，並把結果填在 Schedule D 第 18 行。</li>
          <li><strong>基金：</strong>共同基金的收藏品利得顯示在 Form 1099-DIV 第 2d 欄（未分配的利得則在 Form 2439 第 1d 欄），也要填進工作表。</li>
        </ul>

        <h2>個人使用的損失</h2>
        <p>
          你為個人使用而持有的財產，例如你戴的首飾或為了欣賞而保存的收藏，屬於資本資產。它的<strong>獲利</strong>要課稅，但<strong>損失不能扣除</strong>。為投資而持有的收藏品損失，可以是可扣除的資本損失，但要受一般的<a href="/zh-tw/library/investment/capital-losses/">資本損失限制</a>。
        </p>

        <h2>受贈與繼承的收藏品</h2>
        <ul>
          <li><strong>受贈：</strong>你的成本基礎一般是贈與者的調整後成本基礎。如果贈與時物品的價值低於贈與者的成本基礎，你計算損失時的成本基礎就是那個較低的價值。使用贈與者的成本基礎時，你的持有期間包括贈與者的持有期間。</li>
          <li><strong>繼承：</strong>你的成本基礎一般是死亡日的公平市價，而且不論你持有多久，獲利或損失都視為長期。</li>
        </ul>

        <h2>範例（說明用，2025 年）</h2>
        <ArticleTable
          head={['情況', '結果']}
          rows={[
            ['Mia 在 2019 年以 $12,000 買了金幣作為投資，2025 年以 $20,000 出售', '$8,000 的長期收藏品利得，按她的一般稅率課稅，但不超過 28%'],
            ['Jordan 在 2025 年 3 月以 $5,000 買了銀條，2025 年 11 月以 $6,000 出售', '$1,000 的短期獲利，按一般稅率課稅'],
            ['Pat 繼承了一幅死亡日價值 $50,000 的畫（父母當初付了 $10,000），2025 年以 $55,000 出售', '成本基礎 $50,000；$5,000 的長期收藏品利得'],
            ['Lin 以 $1,500 賣掉她戴了多年的戒指；當初買價 $3,000', '個人使用財產的 $1,500 損失，不能扣除'],
          ]}
        />

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把股票的 15% 稅率</strong>套用在長期收藏品利得上。</li>
          <li><strong>以為一律課 28%</strong>，連短期獲利或較低稅率級距的人也一樣。</li>
          <li><strong>扣除</strong>個人使用首飾或收藏品的損失。</li>
          <li><strong>直接在 Schedule D 上填總額</strong>，而不是用 Form 8949 並填代碼 C。</li>
          <li><strong>用當初的購買價格</strong>作為繼承物品的成本基礎，而不是死亡日的價值。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 本文不涵蓋</div>
          <p>持有金屬的交易所交易產品與信託、透過 IRA 或退休計畫購買的收藏品、以此為業的經銷商與收藏者，以及 NFT，都有各自的規定。本文也不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

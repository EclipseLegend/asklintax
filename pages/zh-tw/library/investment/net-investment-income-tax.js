import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/net-investment-income-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'net-investment-income-tax',
  sourceHash:      '34ce021ff122',
  id:            '86',
  title:         '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
  titleEn:       'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據第 1411 條、IRS Topic no. 559、IRS 淨投資所得稅問答、2025 年 Form 8960 填寫說明，以及 2026 年 Form 8960 填寫說明草案（2026 年 10 月 15 日公布），說明 2025 與 2026 稅務年度個人的 3.8% 淨投資所得稅。本文不詳細涵蓋遺產與信託、受控外國公司與 PFIC、交易者與房地產專業人士的規定，也不涵蓋州稅',
  persona:       ['高收入投資人', '有租金收入的房東', '因賣股票、事業或房產而有一筆大額一次性獲利的人', '收入接近門檻的夫妻'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '把你的修正後調整總收入（MAGI）和你報稅身分的門檻比較。如果高於門檻又有投資所得，就用 Form 8960 計算 3.8% 的稅，並考慮增加預扣稅或預估稅繳款。',
  sources: [
    { label: 'IRS — Topic no. 559，淨投資所得稅（Net investment income tax）', url: 'https://www.irs.gov/taxtopics/tc559' },
    { label: 'IRS — 淨投資所得稅問答（Questions and answers on the net investment income tax）', url: 'https://www.irs.gov/newsroom/questions-and-answers-on-the-net-investment-income-tax' },
    { label: 'IRS — 2025 年 Form 8960 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8960.pdf' },
    { label: 'IRS — Form 8960，淨投資所得稅：個人、遺產與信託（2025）', url: 'https://www.irs.gov/pub/irs-pdf/f8960.pdf' },
    { label: 'IRS — 2026 年 Form 8960 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
    { label: 'IRS — Publication 505，預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/publications/p505' },
  ],
}

const FAQS = [
  {
    q: '3.8% 是對我所有的投資所得課稅嗎？',
    a: '不一定。這個稅是 3.8% 乘以「淨投資所得」與「MAGI 超過門檻的金額」兩者中較小的那一個。如果你的 MAGI 只有一部分超過門檻，就只有那一部分被課稅，即使你的投資所得比較多。',
  },
  {
    q: 'NIIT 的門檻會隨通膨調整嗎？',
    a: '不會。IRS 表示這些門檻金額沒有隨通膨調整。2025 與 2026 年都一樣：夫妻合併申報或符合資格的喪偶者為 $250,000，夫妻分開申報為 $125,000，單身或戶長為 $200,000。',
  },
  {
    q: 'IRA 或 401(k) 提領算淨投資所得嗎？',
    a: '不算。合格退休計畫與 IRA（第 401(a)、403(a)、403(b)、408、408A 與 457(b) 條所述）的分配不是淨投資所得。但應稅的分配屬於你的調整總收入，所以會提高你的 MAGI，可能讓其他投資所得超過門檻。',
  },
  {
    q: '我賣了房子，會要繳 NIIT 嗎？',
    a: '依自住房屋排除額而排除的獲利，不需要繳 NIIT。只有獲利中要課稅的部分才算淨投資所得，而且只有在你的 MAGI 也超過門檻時才會課稅。',
  },
  {
    q: '每一次出售出租房產都會觸發 NIIT 嗎？',
    a: '不會。租金收入與獲利一般屬於淨投資所得，除非來自非被動活動的營業（而且不是金融工具或商品的交易業務）。即使獲利屬於投資所得，也只有在你的 MAGI 超過門檻時才會課稅。',
  },
  {
    q: '外國稅額抵免可以減少 NIIT 嗎？',
    a: 'IRS 問答指出，只能用來抵減一般所得稅的抵稅額（例如外國稅額抵免）不能用來減少 NIIT。',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '在 NIIT 之前適用的資本利得稅率。',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '出售出租房產：折舊回收與 25% 稅率',
    desc:  '出售出租房產怎麼課稅，包括 NIIT。',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: '我賣了房子，獲利要繳稅嗎？',
    desc:  '自住房屋排除額，被排除的獲利也不用繳 NIIT。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '在年度中先繳 NIIT，避免罰款。',
  },
]

export default function NetInvestmentIncomeTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅 | AskLinTax 繁體中文',
      description: '3.8% 淨投資所得稅說明：各報稅身分的 MAGI 門檻、哪些所得計入或排除、賣房子、租金收入、退休金分配，以及 Form 8960。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>淨投資所得稅（NIIT）</strong>是針對較高收入者的投資所得另外課徵的 <strong>3.8%</strong> 聯邦稅。只有在你的<strong>修正後調整總收入（MAGI）</strong>超過你報稅身分的門檻，<strong>而且</strong>你有淨投資所得時才適用。你在 <strong>Form 8960</strong> 上計算，並隨 Form 1040 一起繳納。
        </p>

        <h2>3.8% 怎麼算</h2>
        <p>
          個人的 NIIT 是 <strong>3.8% 乘以下列兩者中較小者</strong>：
        </p>
        <ul>
          <li>你的<strong>淨投資所得</strong>，或</li>
          <li>你的 <strong>MAGI 超過</strong>門檻的金額。</li>
        </ul>
        <p>
          MAGI 一般就是你的調整總收入（AGI）。只有在你排除了海外工作所得（或持有某些外國公司投資）時，才會依特別規定把那些金額加回，使 MAGI 高於 AGI。
        </p>

        <h2>2025 與 2026 年的門檻</h2>
        <ArticleTable
          head={['報稅身分', 'MAGI 門檻（2025 與 2026 年）']}
          rows={[
            ['夫妻合併申報', '$250,000'],
            ['符合資格的喪偶者', '$250,000'],
            ['夫妻分開申報', '$125,000'],
            ['單身', '$200,000'],
            ['戶長', '$200,000'],
          ]}
        />
        <p>
          這些金額由法律訂定，而且如 IRS 所說，沒有隨通膨調整。2025 年 Form 8960 填寫說明與 2026 年填寫說明草案列出的金額相同。
        </p>

        <h2>哪些算淨投資所得</h2>
        <ArticleTable
          head={['一般計入', '一般排除']}
          rows={[
            ['利息與股利', '工資與自僱所得'],
            ['出售股票、債券與共同基金的資本利得，以及資本利得分配', '非被動活動事業的營業所得'],
            ['租金與權利金收入（除非來自非被動的營業）', '社會安全福利與失業補助'],
            ['出售投資用房地產的獲利，包括第二間房子', '免稅利息，例如市政債券利息'],
            ['非合格年金', '合格退休計畫與 IRA 的分配（第 401(a)、403(a)、403(b)、408、408A、457(b) 條）'],
            ['被動事業以及金融工具或商品交易業務的所得', '依自住房屋排除額而排除的賣屋獲利'],
          ]}
        />
        <p>
          淨投資所得是投資總所得減去可適當分攤的扣除額，例如投資利息。投資顧問費與經紀手續費屬於雜項分項扣除額，不能扣除，所以也不能減少淨投資所得。
        </p>

        <h2>資本利得、租金收入與賣房子</h2>
        <ul>
          <li><strong>資本利得：</strong>出售股票、債券與基金的獲利，在沒有被資本損失抵銷的範圍內屬於投資所得。</li>
          <li><strong>租金收入：</strong>租金一般屬於投資所得，除非來自對你而言不是被動活動的營業。出租是否屬於被動活動取決於你的參與程度等事實，所以出售出租房產不會自動觸發 NIIT。</li>
          <li><strong>賣房子：</strong>依自住房屋排除額排除的獲利（最高 $250,000，許多已婚夫妻為 $500,000）不需要繳 NIIT。超過排除額的應稅獲利屬於投資所得。</li>
        </ul>

        <h2>退休金分配與 MAGI</h2>
        <p>
          IRA 與退休計畫的分配<strong>不是</strong>淨投資所得。但應稅的分配會計入 AGI，所以會提高你的 MAGI。一筆大額的 IRA 提領，可能讓你其他的投資所得因此要繳 NIIT。
        </p>

        <h2>範例（說明用）</h2>
        <p>
          <strong>Sam，單身，2025 年：</strong>工資 $180,000，利息與股利 $15,000，出售股票的長期資本利得 $40,000。Sam 沒有調整項目，所以 MAGI 等於 AGI。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['MAGI（$180,000 + $15,000 + $40,000）', '$235,000'],
            ['淨投資所得（$15,000 + $40,000）', '$55,000'],
            ['MAGI 超過 $200,000 門檻的金額', '$35,000'],
            ['NIIT：3.8% × 較小的金額（$35,000）', '$1,330'],
          ]}
        />
        <p>
          <strong>Rosa 與 Tom，夫妻合併申報，2026 年：</strong>工資 $190,000 加上 $40,000 的淨投資所得，MAGI 為 $230,000，低於 $250,000 的門檻，所以不用繳 NIIT。如果他們另外提領了 $50,000 的應稅 IRA，MAGI 就變成 $280,000。他們的淨投資所得仍是 $40,000，因為 IRA 分配不是投資所得，而 MAGI 超過門檻 $30,000。他們的 NIIT 是 3.8% × $30,000 = <strong>$1,140</strong>。
        </p>
        <p>
          <strong>賣房子（取自 IRS 問答）：</strong>一對夫妻合併申報，出售自住房屋獲利 $600,000，排除 $500,000 後剩下 $100,000 的應稅獲利。加上 $125,000 的其他投資所得，淨投資所得為 $225,000。他們的 MAGI $300,000 超過門檻 $50,000，所以 NIIT 是 3.8% × $50,000 = $1,900。
        </p>

        <h2>Form 8960 與繳稅</h2>
        <ul>
          <li>在 <strong>Form 8960</strong> 上計算這個稅，並附在 Form 1040 上。NIIT 申報在 Schedule 2（Form 1040）。</li>
          <li>NIIT 適用預估稅的規定。如果你預期要繳，考慮增加預扣稅或繳納<a href="/zh-tw/library/small-business/quarterly-taxes/">預估稅</a>，以避免少繳罰款。</li>
          <li><strong>配偶是非居民：</strong>如果你是美國公民或居民，配偶是非居民外國人，除非做特別選擇，否則在 NIIT 上會被視為夫妻分開申報。非居民外國人本身不需要繳 NIIT。</li>
        </ul>

        <h2>2026 年的變化</h2>
        <p>
          2026 年 Form 8960 填寫說明草案指出，依 P.L. 119-21 第 70111 條（2025 年 7 月 4 日立法），從 2026 年起，某些分項扣除額（包括投資利息）不再豁免於第 68 條的整體限制。草案為 Form 8960 第 9 與第 10 行新增了一份工作表，並說明這項限制一般影響適用最高稅率級距的人。由於這些填寫說明仍是草案，報稅前請查看正式的 2026 年 Form 8960 填寫說明。請參考<a href="/zh-tw/library/investment/investment-interest-expense/">投資利息費用</a>。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把 3.8% 套用在所有投資所得上</strong>，而不是兩個金額中較小者。</li>
          <li><strong>使用隨通膨調整的門檻</strong>——這些門檻不會每年改變。</li>
          <li><strong>忘了符合資格的喪偶者門檻</strong>是 $250,000。</li>
          <li><strong>把 IRA 分配算成投資所得</strong>，或忘了它會提高 MAGI。</li>
          <li><strong>認定每次出售出租房產都要繳 NIIT</strong>，卻沒有確認該活動是否屬於被動活動、MAGI 是否超過門檻。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜的情況</div>
          <p>租金或事業所得是否屬於被動、房地產專業人士與交易者的規定、受控外國公司與 PFIC，以及遺產與信託，在 NIIT 上都有本文不涵蓋的特別規定。本文也不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/capital-losses.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'capital-losses',
  sourceHash:      'afc7ec360739',
  id:            '62',
  title:         '股票賠錢，可以抵稅嗎？',
  titleEn:       'I lost money on stocks — can I deduct it?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人在應稅帳戶中賣出股票或類似證券所產生的資本損失。無價值證券、section 1256 合約、退休帳戶內的虧損，以及交易商或專業交易者的規定，不在本文範圍內',
  persona:       ['賠錢賣出股票的投資人', '有以前年度虧損結轉的人', '賣出後又買回同一檔股票的人', '考慮虧損在分開申報時如何適用的夫妻'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '在 Schedule D 上用已實現的虧損抵銷獲利。如果虧損比較多，今年一般最多可以抵減其他收入 $3,000（夫妻分開申報為 $1,500），剩下的結轉到以後年度。計算任何虧損之前，先檢查是否有洗售。',
  sources: [
    { label: 'IRS — Topic no. 409，資本利得與損失（Capital gains and losses）', url: 'https://www.irs.gov/taxtopics/tc409' },
    { label: 'IRS — Publication 550（2025），投資收入與費用（Investment Income and Expenses）', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Schedule D（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sd' },
    { label: 'IRS — Form 8949 填寫說明（2025）', url: 'https://www.irs.gov/instructions/i8949' },
    { label: 'IRS — Rev. Rul. 2008-5，洗售與 IRA（wash sales and IRAs）', url: 'https://www.irs.gov/pub/irs-drop/rr-08-05.pdf' },
    { label: 'IRS — Publication 544（2025），資產的出售與處分（Sales and Other Dispositions of Assets）', url: 'https://www.irs.gov/publications/p544' },
  ],
}

const FAQS = [
  {
    q: '我的股票跌了，但還沒賣，可以扣除虧損嗎？',
    a: '不行。只有已實現的虧損 — 也就是實際賣出或處分 — 才申報。你還持有的股票帳面虧損不能扣除。',
  },
  {
    q: '我今年賠了 $10,000，沒有任何獲利，可以扣多少？',
    a: '一般今年可以抵減其他收入 $3,000（夫妻分開申報為 $1,500）。剩下的 $7,000 是資本損失結轉（capital loss carryover），可以用在以後年度，用 Capital Loss Carryover Worksheet 計算。',
  },
  {
    q: '我賠錢賣出，兩週後又買回同一檔股票，這樣有問題嗎？',
    a: '有 — 這一般就是洗售（wash sale）。在賠錢賣出前後 30 天內買進實質相同的股票，這筆虧損目前不能扣除。在應稅帳戶中，被否認的虧損會加到新股票的成本基礎，所以是延後，而不是消失。',
  },
  {
    q: '如果是我的 IRA 把股票買回來呢？',
    a: '這仍然是洗售，而且結果更不利：依 IRS Rev. Rul. 2008-5，這筆虧損不能扣除，也不會加到你在 IRA 或 Roth IRA 的成本基礎，所以一般之後也無法收回。',
  },
  {
    q: '賣車或賣自住的房子賠錢，可以扣除嗎？',
    a: '不行。個人使用財產（例如你的車或自住的房子）的虧損不能扣除。其中有些出售仍然要申報 — 例如你收到了 Form 1099-S 或 Form 1099-K。',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '短期與長期、稅率，以及 Form 8949。',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    desc:  '加密貨幣的虧損也是資本損失。',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: '我賣了房子，獲利要繳稅嗎？',
    desc:  '為什麼自住房的虧損不能扣除。',
  },
]

export default function CapitalLossesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '股票賠錢可以抵稅嗎？$3,000 上限、虧損結轉與洗售 | AskLinTax 繁體中文',
      description: '賠錢賣出股票？虧損如何抵銷獲利、每年 $3,000（夫妻分開申報 $1,500）的上限、虧損結轉、洗售（包括 IRA 買回），以及個人使用財產的虧損。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          通常可以 — 但不一定一次全部扣，也不是每種情況都可以。<strong>已實現</strong>的資本損失會先抵銷你的資本利得。如果虧損大於獲利，超過的部分一般每年最多可以抵減其他收入 <strong>$3,000</strong>（夫妻分開申報為 <strong>$1,500</strong>），其餘的<strong>結轉</strong>到以後年度。如果屬於<strong>洗售</strong>（wash sale），虧損可能被否認；個人使用財產的虧損則完全不能扣除。
        </p>

        <h2>只有已實現的虧損才算</h2>
        <p>
          虧損是在你賣出或以其他方式處分投資時才申報。如果股票的價值低於你買進的價格，但你還持有，就還沒有可以扣除的虧損。
        </p>

        <h2>虧損怎麼互抵</h2>
        <ol>
          <li>短期虧損先抵銷短期獲利，長期虧損先抵銷長期獲利。</li>
          <li>其中一類的淨虧損，再抵銷另一類的淨獲利。</li>
          <li>如果整體結果仍然是虧損，就適用下面的年度上限。</li>
        </ol>

        <h2>年度上限與結轉</h2>
        <ArticleTable
          head={['報稅身分', '每年可抵減其他收入的資本淨損失']}
          rows={[
            ['大多數申報者（包括夫妻合併申報）', '$3,000 與總淨損失兩者中較低者'],
            ['夫妻分開申報', '$1,500 與總淨損失兩者中較低者'],
          ]}
        />
        <p>
          超過上限的虧損就是<strong>資本損失結轉</strong>，可以用在以後年度。Publication 550 與 Schedule D 填寫說明裡有 Capital Loss Carryover Worksheet；計算時會先用短期虧損。如果夫妻過去合併申報、之後改為分開申報，合併稅表的結轉虧損只能由實際產生虧損的那一方扣除。
        </p>

        <h2>例子（舉例用）</h2>
        <p>
          Jordan 是單身申報者，2025 年有 $2,000 的長期獲利和 $12,000 的短期虧損。虧損先抵掉 $2,000 的獲利，剩下 $10,000 的淨損失。Jordan 在 2025 年抵減其他收入 $3,000，剩下的 $7,000 結轉到以後年度。
        </p>

        <h2>洗售：虧損什麼時候會被否認</h2>
        <p>
          如果你賠錢賣出股票或證券，並在賣出<strong>前後 30 天內</strong>買進實質相同的股票或證券 — 或透過完全課稅的交換取得、取得買進的合約或選擇權，或為你的 <strong>IRA 或 Roth IRA</strong> 取得 — 一般就是<strong>洗售</strong>。你的配偶或你控制的公司買進，也可能構成洗售。
        </p>
        <ArticleTable
          head={['誰買回替代的股票', '虧損會怎樣']}
          rows={[
            ['你自己，在應稅帳戶中', '現在不能扣除，但會加到新股票的成本基礎 — 虧損是延後，不是消失'],
            ['你的 IRA 或 Roth IRA', '不能扣除，也不會加到你在 IRA 或 Roth IRA 的成本基礎 — 虧損一般就永久失去（IRS Rev. Rul. 2008-5）'],
          ]}
        />
        <p>
          即使 Form 1099-B 上沒有顯示，洗售規定仍然適用。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 不能扣除的虧損</div>
          <p><strong>個人使用財產</strong>（例如你的車或自住的房子）的虧損不能扣除。其中有些出售仍然要申報，例如收到 Form 1099-S 或 Form 1099-K 時。請見<a href="/zh-tw/library/rental/selling-your-home/">我賣了房子，獲利要繳稅嗎？</a>與<a href="/zh-tw/library/individual/form-1099-k/">收到 1099-K 要繳稅嗎？</a></p>
        </div>

        <h2>怎麼申報</h2>
        <p>
          每一筆出售都申報在 <strong>Form 8949</strong>（短期在 Part I，長期在 Part II），包括洗售的調整，再把總數帶到 <strong>Schedule D</strong>。獲利本身怎麼課稅，請見<a href="/zh-tw/library/investment/stock-sale-capital-gains/">賣股票賺錢，資本利得怎麼課稅？</a>加密貨幣的虧損也是資本損失，同樣適用互抵與年度上限 — 請見<a href="/zh-tw/library/investment/crypto-tax/">加密貨幣稅務說明</a>。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/s-corp-shareholder-basis.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 's-corp-shareholder-basis',
  sourceHash:      '8f737c55ed35',
  id:            '135',
  title:         'S 公司股東成本基礎：股票基礎、債務基礎與 Form 7203',
  titleEn:       'S Corporation Shareholder Basis: Stock Basis, Debt Basis, and Form 7203',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 7203 說明（2022 年 12 月修訂版，審閱時 IRS.gov 上的最新修訂版；IRS「關於 Form 7203」網頁於 2026 年 6 月更新）、IRS「S 公司股票與債務成本基礎」網頁（2026 年 6 月更新）、Publication 925（2025），以及 2025 年 Form 461 說明，說明 S 公司股東如何追蹤股票與債務成本基礎。本文不說明以第 351 條轉讓並附帶負債取得之股票的成本基礎、第 1.1367-1(g) 條選擇的細節、風險承擔的計算，或償還已減少基礎之債務所產生利得的性質',
  persona:       ['公司有虧損的 S 公司老闆', '借錢給自己 S 公司的股東', '為公司銀行貸款提供個人保證的老闆', '領取分配的股東'],
  relatedJourney: ['經營小型企業', '剛成立 LLC'],
  actionRequired: '每年分別追蹤你的股票成本基礎與債務成本基礎，從你支付或投入的金額開始。當你申報虧損扣除、收到非股利分配、處分股票，或收到公司償還的貸款時，要隨稅表申報 Form 7203。請記住，單憑貸款保證並不會讓你取得債務成本基礎。',
  sources: [
    { label: 'IRS — Form 7203 說明（2022 年 12 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i7203.pdf' },
    { label: 'IRS — 關於 Form 7203，S 公司股東股票與債務成本基礎限制', url: 'https://www.irs.gov/forms-pubs/about-form-7203' },
    { label: 'IRS — S 公司股票與債務成本基礎', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-stock-and-debt-basis' },
    { label: 'IRS — Publication 925（2025），被動活動與風險承擔規定', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
  ],
}

const FAQS = [
  {
    q: '股票成本基礎和債務成本基礎有什麼不同？',
    a: '股票成本基礎從你購買股份或投入公司的金額開始，每年隨你分得的所得、虧損與分配而變動。債務成本基礎只來自你個人直接借給 S 公司的錢。兩者在 Form 7203 上分開計算：虧損先減少股票成本基礎，再減少債務成本基礎；而分配是否免稅，只看股票成本基礎。',
  },
  {
    q: '我為公司的銀行貸款提供個人保證，這樣會產生債務成本基礎嗎？',
    a: '不會。IRS 表示，貸款保證不足以讓股東取得債務成本基礎，股東保證或共同簽署的貸款也不屬於貸款成本基礎。只有在你實際依保證付款時，才會在付款的範圍內從保證取得成本基礎。',
  },
  {
    q: '因成本基礎不足而不能扣除的虧損會怎樣？',
    a: '會被暫停（suspended）。因成本基礎限制而不允許的虧損與扣除項目會保留原本的性質，視為下一個課稅年度發生，並無限期往後結轉，直到你有足夠的股票或債務成本基礎吸收它們 — 或直到你處分全部股票為止。',
  },
  {
    q: '如果我賣掉股份，可以使用被暫停的虧損嗎？',
    a: '因成本基礎而受限的虧損不行。IRS 表示，股東一旦處分全部股票，因成本基礎限制而被暫停的虧損就會消失，不能扣除。已通過成本基礎限制、但被其他規定（例如被動活動規定）暫停的虧損，則依該規定本身的處理方式。',
  },
  {
    q: '什麼時候必須申報 Form 7203？',
    a: '當你申報分得的 S 公司總虧損扣除（包括因成本基礎而從以前年度結轉的虧損）、收到非股利分配、處分 S 公司股票，或收到公司償還的貸款時。IRS 建議即使在不需要申報的年度，也要填寫並保存。',
  },
  {
    q: '超過成本基礎的分配要繳稅嗎？',
    a: '要。非股利分配在你的股票成本基礎範圍內免稅。超過的部分一般以資本利得課稅 — 如果持有股票超過一年，就是長期資本利得。債務成本基礎在這裡不算。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: '經營 S 公司：合理薪資、Form 1120-S 與 Schedule K-1',
    desc:  '薪資、分配與 Schedule K-1。',
  },
  {
    href: '/library/small-business/business-losses-nol',
    cat:  'Small Business & Self-Employment',
    title: '營業虧損：成本基礎、風險承擔、被動活動、超額營業虧損與 NOL 規定',
    desc:  '成本基礎之後適用的限制。',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation & Structure',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  '選擇 S 公司地位。',
  },
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: '多成員 LLC 與合夥企業稅務：Form 1065 與 Schedule K-1',
    desc:  '合夥人成本基礎與 S 公司成本基礎有何不同。',
  },
]

export default function SCorpShareholderBasisPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'S 公司股東成本基礎：股票基礎、債務基礎與 Form 7203 | AskLinTax 繁體中文',
      description: 'S 公司股東如何計算股票成本基礎與債務成本基礎：每年的調整、分配、虧損、被暫停的虧損、股東直接貸款與貸款保證的差別、已減少基礎之債務的償還、Form 7203 的申報條件，以及之後的虧損限制 — 附實際計算範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          身為 S 公司股東，你只能在<strong>成本基礎</strong>範圍內扣除分得的公司虧損，也只能在<strong>股票成本基礎</strong>範圍內免稅領取分配。成本基礎分為兩種：<strong>股票成本基礎</strong>，來自你支付或投入的金額加上分得的所得；以及<strong>債務成本基礎</strong>，來自你<strong>個人直接借給</strong>公司的錢。公司不會替你追蹤 — IRS 表示這是股東自己的責任，而 <strong>Form 7203</strong> 就是你計算它的地方。
        </p>

        <h2>股票成本基礎：每年哪些項目會改變它</h2>
        <ArticleTable
          head={['順序', '調整項目', '對股票成本基礎的影響']}
          rows={[
            ['起點', '你購買股票或投入公司的金額（初始成本基礎），加上之後的投入', '設定起始金額'],
            ['1', '你分得的所有所得，包括免稅所得（以及某些超額耗竭）', '增加'],
            ['2', '非股利分配（包括現金），以成本基礎為限', '減少，但不低於零'],
            ['3', '不可扣除的費用（以及某些石油與天然氣耗竭）', '減少，但不低於零'],
            ['4', '你分得的虧損與扣除項目', '減少，但不低於零'],
          ]}
        />
        <p>
          你可以選擇先套用虧損與扣除項目（第 4 步），再套用不可扣除的費用（第 3 步）；選擇一經做出，就適用於該年度及該 S 公司之後的所有年度，除非 IRS 同意撤銷。股票成本基礎永遠不會低於零。
        </p>

        <h2>債務成本基礎：只限直接貸款</h2>
        <ArticleTable
          head={['安排方式', '會產生債務成本基礎嗎？']}
          rows={[
            ['你直接把自己的錢借給 S 公司', '會 — 一般是公司欠你的餘額，並依減少與恢復的金額調整'],
            ['S 公司向銀行借款', '不會 — 這是公司的債務，不是你提供的貸款'],
            ['你為公司的銀行貸款提供保證或共同簽署', '不會 — 只有在你實際依保證付款時，才在付款範圍內產生'],
          ]}
        />
        <ul>
          <li>超過股票成本基礎的虧損與不可扣除費用，接著會減少你的<strong>債務成本基礎</strong>，但不低於零。</li>
          <li>分配<strong>不會</strong>減少債務成本基礎，而債務成本基礎也不會讓分配免稅。</li>
          <li>如果公司<strong>償還一筆成本基礎已被減少的貸款</strong>，部分或全部償還款可能要對你課稅。收到貸款償還的那一年，必須申報 Form 7203。</li>
          <li>IRS 表示，當股東主張自己投入或借出大筆資金時，可能會考量股東是否有能力這麼做。</li>
        </ul>

        <h2>範例：投入資金、虧損與保證</h2>
        <p>
          Grace 是一家 S 公司唯一的股東。她投入 <strong>$30,000</strong> 取得股票。公司第一年有 <strong>$50,000</strong> 的一般虧損，轉嫁給她。她以個人身分為公司一筆 <strong>$100,000</strong> 的銀行貸款提供保證，但<strong>沒有</strong>依保證付過任何款項。沒有其他項目。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['來自投入資金的股票成本基礎', '$30,000'],
            ['來自 $100,000 保證的債務成本基礎', '$0 — 沒有付過款'],
            ['轉嫁給 Grace 的虧損', '$50,000'],
            ['通過成本基礎限制的虧損（尚非最終扣除額）', '$30,000（股票成本基礎減為 $0）'],
            ['因成本基礎限制而被暫停的虧損', '$20,000，無限期往後結轉，直到 Grace 有足夠的股票或債務成本基礎'],
          ]}
        />
        <p>
          通過成本基礎限制，並不代表 Grace 自動可以在個人稅表上扣除 $30,000。這 $30,000 仍要依序通過<strong>風險承擔</strong>、<strong>被動活動</strong>與<strong>超額營業虧損</strong>規定，她今年實際能扣除的金額可能更少。這筆保證並不會產生 $100,000 的債務成本基礎。
        </p>
        <p>
          <strong>下一年：</strong>如果 Grace 用自己的錢借給公司 <strong>$15,000</strong>，而公司沒有其他項目，她就有 $15,000 的債務成本基礎。她可以使用被暫停虧損中的 $15,000（仍受之後的限制），使債務成本基礎減為 $0；$5,000 仍被暫停。如果她改為依保證向銀行付款 $10,000，一般只會在這 $10,000 付款的範圍內取得債務成本基礎。
        </p>

        <h2>被暫停的虧損與出售股票</h2>
        <ul>
          <li><strong>因成本基礎而受限的虧損</strong>會無限期往後結轉，在股票或債務成本基礎增加或恢復時允許扣除。如果你處分<strong>全部</strong>股票，IRS 表示因成本基礎而被暫停的虧損就會<strong>消失</strong>，而出售股票的利得也不會增加你的成本基礎來釋出這些虧損。</li>
          <li><strong>已通過成本基礎限制</strong>、但被之後的規定暫停的虧損，依該規定處理。例如，被暫停的被動活動虧損，一般在你以完全課稅的交易把全部權益處分給無關係人時允許扣除；而不允許扣除的超額營業虧損會成為淨營業虧損結轉。不要以為每一種被暫停的虧損都用同樣方式處理。</li>
        </ul>

        <h2>Form 7203 與之後的虧損限制</h2>
        <p>
          如果你申報分得的總虧損扣除（包括從以前年度結轉、因成本基礎而受限的虧損）、收到非股利分配、處分股票，或收到公司償還的貸款，就要申報 <strong>Form 7203</strong>。IRS 建議每年都填寫並保存，讓你的成本基礎前後一致。通過成本基礎之後，虧損還必須通過風險承擔規定（Form 6198）、被動活動規定（Form 8582），以及超額營業虧損限制（Form 461）；請見<a href="/zh-tw/library/small-business/business-losses-nol/">營業虧損</a>。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Schedule K-1 上的虧損不會自動可以扣除</div>
          <p>IRS 表示，收到顯示虧損的 K-1，並不代表你有權申報這筆虧損。請從一開始就保存每一筆投入、貸款、償還與分配的紀錄 — 事後要重建多年的成本基礎非常困難。另請見<a href="/zh-tw/library/business-formation/s-corp-reasonable-salary/">經營 S 公司</a>。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

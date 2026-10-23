import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/charitable-deduction-2026.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'charitable-deduction-2026',
  sourceHash:      '08f31bd188e7',
  id:            '72',
  title:         '2026 年慈善捐款：不分項扣除也能扣除的新規定',
  titleEn:       'Charitable Donations in 2026: The New Deduction If You Don\'t Itemize',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS Working Families Tax Cuts 頁面、Publication 505（2026）、Publication 526（2025）與 2026 年 Form W-4，說明 2025 與 2026 稅務年度的聯邦慈善捐款扣除 — 不分項扣除者的新扣除額（2026 年起）與分項扣除者的 2026 年改變。2026 年的表格行次來自草稿表格。本文不涵蓋非現金捐贈的估價、企業捐贈或州法規定',
  persona:       ['使用標準扣除額、也會捐款給慈善機構的人', '有大額慈善捐款的分項扣除者', '規劃年底捐款的家庭', '捐款給宗教團體的人'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '每一筆現金捐款都要保留銀行紀錄或書面收據，$250 以上的捐款要取得書面確認。從 2026 稅務年度起，如果你使用標準扣除額，請記錄捐給合格慈善機構的現金 — 最多可以扣除 $1,000（夫妻合併申報 $2,000）。',
  sources: [
    { label: 'IRS — Working Families Tax Cuts（不分項扣除者的慈善現金捐款扣除額）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Publication 505（2026），預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — Publication 526（2025），慈善捐款（Charitable Contributions）', url: 'https://www.irs.gov/pub/irs-pdf/p526.pdf' },
    { label: 'IRS — Form W-4（2026），Step 4(b) 扣除額工作表（Deductions Worksheet）', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — 2026 年 Form 1040 草稿（非正式版本）', url: 'https://www.irs.gov/pub/irs-dft/f1040--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: '我使用標準扣除額，2025 年的捐款可以扣除嗎？',
    a: '不可以。2025 年一般必須在 Schedule A 上分項扣除，才能扣除慈善捐款。不分項扣除者的新扣除額從 2026 稅務年度開始。',
  },
  {
    q: '2026 年不分項扣除的話，可以扣除多少？',
    a: '捐給合格慈善機構的現金最多 $1,000，夫妻合併申報最多 $2,000。Publication 505 說明，這個金額要加到你的標準扣除額上。',
  },
  {
    q: '捐衣服或股票算嗎？',
    a: '不分項扣除者的扣除額不算。非現金捐贈，例如衣服、股票或其他財產，都不符合資格。分項扣除者仍然可以依一般規定扣除符合資格的非現金捐贈。',
  },
  {
    q: '我捐給自己的捐贈人建議基金，可以用新的扣除額嗎？',
    a: '不可以。IRS 表示，捐給捐贈人建議基金（donor-advised funds）與支援組織（supporting organizations）的款項不適用不分項扣除者的扣除額。',
  },
  {
    q: '如果我分項扣除，2026 年有什麼改變？',
    a: '從 2026 年起，分項扣除者的慈善捐款只有超過調整後總收入 0.5% 的部分才能扣除。此外，應稅所得超過 $640,600（單身或戶長）、$768,700（夫妻合併申報或符合資格的未亡配偶）或 $384,350（夫妻分開申報）的人，分項扣除總額可能會被減少。',
  },
  {
    q: '我住的州也適用這些規定嗎？',
    a: '不一定。州所得稅規定可能和聯邦法律不同。本文只說明聯邦規定。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: '州稅與地方稅（SALT）扣除額：上限、收入限制與實例',
    desc:  '另一項分項扣除 — 以及什麼時候分項扣除比較有利。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '標準扣除額與分項扣除的說明。',
  },
]

export default function CharitableDeduction2026ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '2026 年慈善捐款：不分項扣除也能扣除 | AskLinTax 繁體中文',
      description: '從 2026 年起，不分項扣除的人可以扣除捐給慈善機構的現金最多 $1,000（合併申報 $2,000）。哪些算、哪些不算，以及分項扣除者新的 0.5% 門檻。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <ul>
          <li><strong>2025 年：</strong>一般必須在 Schedule A 上<strong>分項扣除</strong>，才能扣除慈善捐款。</li>
          <li><strong>從 2026 年起：</strong>如果你使用<strong>標準扣除額</strong>，也可以扣除捐給合格慈善機構的<strong>現金</strong>，最多 <strong>$1,000</strong>（夫妻合併申報 <strong>$2,000</strong>）。IRS 表示這是永久性的扣除額。</li>
          <li><strong>2026 年分項扣除者：</strong>慈善捐款只有超過<strong>調整後總收入（AGI）0.5%</strong> 的部分才能扣除，而且收入非常高的人，分項扣除總額可能會被減少。</li>
        </ul>

        <h2>不分項扣除者的新扣除額（2026 年）</h2>
        <ArticleTable
          head={['規定', '說明']}
          rows={[
            ['開始', '2026 稅務年度'],
            ['金額', '最多 $1,000；夫妻合併申報最多 $2,000'],
            ['適用對象', '使用標準扣除額的人'],
            ['哪些算', '這一年捐給合格慈善機構的現金（包括支票）— 一般是宗教、慈善、教育、科學或文學性質的機構'],
            ['哪些不算', '捐給捐贈人建議基金或支援組織的款項；非現金捐贈，例如衣服、股票或其他財產；以前年度的結轉金額'],
            ['如何申報', '加到你的標準扣除額上；2026 年 Form 1040 草稿為它另設一行（12f）— 請以正式表格為準'],
          ]}
        />

        <h2>如果你分項扣除：2025 年與 2026 年</h2>
        <ArticleTable
          head={['規定', '2025', '2026']}
          rows={[
            ['申報位置', 'Schedule A', 'Schedule A'],
            ['0.5% 門檻', '沒有門檻', '只有超過 AGI 0.5% 的捐款可以扣除'],
            ['捐給大多數公共慈善機構的現金', '一般以 AGI 的 60% 為上限', '本文不列出 2026 年的比例上限；請查看 2026 年 Schedule A 填寫說明'],
            ['分項扣除總額的整體限制', '本文不涵蓋', '應稅所得超過 $640,600（單身或戶長）、$768,700（夫妻合併申報或符合資格的未亡配偶）或 $384,350（夫妻分開申報）時，分項扣除總額可能會被減少'],
          ]}
        />
        <p>
          Publication 505（2026）表示，低於 0.5% 門檻的金額在 2026 年不能扣除，但沒有說明是否可以結轉到以後年度。
        </p>

        <h2>你需要的紀錄（兩個年度都適用）</h2>
        <ul>
          <li><strong>任何現金捐款：</strong>保留銀行紀錄（例如已兌現的支票、銀行或信用卡對帳單），或慈善機構出具、載明機構名稱、日期與金額的書面通知。</li>
          <li><strong>$250 以上：</strong>每一筆 $250 以上的捐款，都需要慈善機構出具的即時書面確認（或特定的薪資扣款紀錄）。這項規定不會把分開的捐款加總計算。</li>
        </ul>
        <p>
          這些紀錄規定來自 Publication 526（2025）。在本文查閱的資料中，IRS 尚未針對 2026 年不分項扣除者的扣除額另外公布文件規定。
        </p>

        <h2>範例（示意，2026 年）</h2>
        <p>
          <strong>Anna</strong> 單身，使用標準扣除額。她捐了 $600 現金給教會，並把價值 $300 的舊衣捐給慈善機構經營的二手店。她可以扣除 <strong>$600</strong> — 衣服是非現金捐贈，不適用不分項扣除者的扣除額。
        </p>
        <p>
          <strong>Tom 和 Lisa</strong> 夫妻合併申報，使用標準扣除額，捐了 $3,000 現金給合格慈善機構。他們可以扣除 <strong>$2,000</strong>，也就是合併申報的上限。
        </p>
        <p>
          <strong>Kevin</strong> 使用標準扣除額，把 $1,000 存入他的捐贈人建議基金。這筆捐款<strong>不</strong>適用不分項扣除者的扣除額。
        </p>
        <p>
          <strong>Mei</strong> 分項扣除，AGI 為 $100,000，捐了 $5,000 現金給慈善機構。0.5% 門檻是 $500，所以她可以在 Schedule A 上列入 <strong>$4,500</strong>，並仍適用其他限制。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「2025 年稅表不分項扣除也能扣捐款。」</strong>不分項扣除者的扣除額從 2026 年才開始。</li>
          <li><strong>「所有捐款都算。」</strong>不分項扣除者的扣除額只適用於捐給合格慈善機構的現金 — 不包括捐贈人建議基金、支援組織或財產。</li>
          <li><strong>「2026 年分項扣除者每一塊錢都可以扣。」</strong>從 2026 年起，只有超過 AGI 0.5% 的捐款才算，也可能適用其他限制。</li>
          <li><strong>「小額捐款不需要紀錄。」</strong>每一筆現金捐款都需要銀行紀錄或書面收據。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 2026 年表格仍是草稿</div>
          <p>撰寫本文時，2026 年 Form 1040 與 Schedule A 只有草稿，2026 年 Publication 526 也尚未發布。請以正式表格與填寫說明為準。州所得稅規定可能和聯邦法律不同。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

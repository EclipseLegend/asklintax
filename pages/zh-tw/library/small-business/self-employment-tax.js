import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/self-employment-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'self-employment-tax',
  sourceHash:      '24376c08684c',
  id:            '57',
  title:         '什麼是自雇稅？怎麼計算？',
  titleEn:       'What is self-employment tax and how does it work?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人自由工作者、獨立承包商與獨資經營者的自雇稅如何運作。包括 2025 與 2026 年社會安全稅工資上限、額外聯邦醫療保險稅門檻，以及 W-2 工資與自雇稅的互動。教會員工、選擇性計算方法與非居民外國人的規定不在本文範圍內',
  persona:       ['自由工作者與獨立承包商', '領 1099 的零工工作者', '有副業的獨資經營者', '被 1099 收入的稅單嚇到的人'],
  relatedJourney: ['創業或經營小型企業', '自雇第一年'],
  actionRequired: '如果你的自雇淨收入達到 $400 或以上，除了所得稅之外，還要用 Schedule SE 計算自雇稅。年中就用預估稅款預先規劃。',
  sources: [
    { label: 'IRS — 自雇稅（社會安全稅與聯邦醫療保險稅）（Self-employment tax (Social Security and Medicare taxes)）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
    { label: 'IRS — Topic no. 554，自雇稅（Self-employment tax）', url: 'https://www.irs.gov/taxtopics/tc554' },
    { label: 'IRS — Publication 334（2025），小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Schedule SE（Form 1040）填寫說明', url: 'https://www.irs.gov/instructions/i1040sse' },
    { label: 'IRS — Publication 15（2026），雇主稅務指南（2026 年社會安全稅工資上限）', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
  ],
}

const FAQS = [
  {
    q: '自雇稅和所得稅是一樣的嗎？',
    a: '不一樣。自雇稅主要是自己工作的人要繳的社會安全稅（Social Security）與聯邦醫療保險稅（Medicare）。它在 Schedule SE 上另外計算，是聯邦所得稅之外另外要繳的稅。',
  },
  {
    q: '我做自由工作只賺了一點點，也要繳嗎？',
    a: '如果你的自雇淨收入達到 $400 或以上，一般就要繳自雇稅。',
  },
  {
    q: '15.3% 是套用在我收到的全部款項上嗎？',
    a: '不是。它一般是以自雇淨收入（扣除營業費用後）的 92.35% 來計算，不是以總收入計算。社會安全稅的部分，也只算到每年的工資上限為止 — 2025 年 $176,100，2026 年 $184,500，而且 W-2 的社會安全稅工資會先計入。',
  },
  {
    q: '營業費用可以降低自雇稅嗎？',
    a: '間接可以。可扣除的營業費用會降低你 Schedule C 的利潤，進而降低自雇淨收入。但它們不會改變自雇稅的稅率。',
  },
  {
    q: '自雇稅有一部分可以扣除嗎？',
    a: '可以。你一般可以在計算調整後總收入（AGI）時，扣除自雇稅中相當於雇主負擔的部分（employer-equivalent portion）。它降低的是所得稅，不是自雇稅本身。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '如何在年中預先繳自雇稅。',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '降低利潤 — 也降低自雇淨收入 — 的費用。',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '為什麼員工和承包商繳這些稅的方式不同。',
  },
]

export default function SelfEmploymentTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '自雇稅是什麼？15.3%、Schedule SE 與 $400 規則 | AskLinTax 繁體中文',
      description: '為什麼自由工作者與承包商除了所得稅，還要繳社會安全稅與聯邦醫療保險稅：$400 門檻、15.3% 稅率、92.35% 的計算方式、Schedule SE，以及可以扣除的部分。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>自雇稅</strong>（self-employment tax）是自己工作的人要繳的社會安全稅與聯邦醫療保險稅。如果你是員工，這些稅會從薪水中預扣，雇主也會負擔相同的一份。如果你是自雇者，一般兩份都要自己繳 — 在 <strong>Schedule SE</strong> 上計算，並且是聯邦所得稅<strong>之外</strong>另外要繳的稅。
        </p>

        <h2>誰要繳</h2>
        <p>
          如果你的<strong>自雇淨收入達到 $400 或以上</strong>，一般就要繳自雇稅。這包括自由工作者、獨立承包商與獨資經營者。如果你不確定自己的工作是否算自雇，請見<a href="/zh-tw/library/individual/w2-vs-1099/">W-2 與 1099：有什麼差別？</a>
        </p>

        <h2>怎麼計算</h2>
        <ArticleTable
          head={['項目', '一般規定']}
          rows={[
            ['社會安全稅（Social Security）', '12.4%'],
            ['聯邦醫療保險稅（Medicare）', '2.9%'],
            ['自雇稅合計稅率', '15.3%'],
            ['稅率一般套用的金額', '自雇淨收入的 92.35%'],
            ['社會安全稅上限', '只算到每年的工資上限：2025 年 $176,100，2026 年 $184,500'],
          ]}
        />
        <p>
          收入較高時，也可能要繳<strong>額外聯邦醫療保險稅</strong>（Additional Medicare Tax）— 請見下方說明。
        </p>

        <h2>社會安全稅工資上限與額外聯邦醫療保險稅</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['適用 12.4% 社會安全稅部分的工資與自雇收入合計上限', '$176,100', '$184,500'],
            ['聯邦醫療保險稅部分（2.9%）', '沒有上限', '沒有上限'],
          ]}
        />
        <p>
          2025 年的金額來自 Schedule SE 填寫說明；2026 年的金額來自 Publication 334 與 Publication 15（2026）。
        </p>
        <p>
          <strong>額外聯邦醫療保險稅：</strong>如果你的自雇收入（Schedule SE 第 6 行）超過 <strong>$200,000</strong>（單身、戶長或符合資格的未亡配偶）、<strong>$250,000</strong>（夫妻合併申報）或 <strong>$125,000</strong>（夫妻分開申報），可能要繳 0.9% 的額外聯邦醫療保險稅。如果你也有工資，自雇收入適用的門檻要減去你需繳額外聯邦醫療保險稅的工資（但不會低於零）。這項稅在 Form 8959 上計算。
        </p>

        <h2>如果你也有 W-2 工作</h2>
        <p>
          工作的社會安全稅工資會計入同一個工資上限。在 Schedule SE 上，你的社會安全稅工資與小費（Form W-2 的 box 3 與 box 7）會從上限中減去，所以 12.4% 的社會安全稅部分，只適用於剩餘額度內的自雇收入。2.9% 的聯邦醫療保險稅部分，仍然適用於你所有的自雇淨收入。
        </p>
        <p>
          <strong>例子（舉例用，2025 年）：</strong>Raj 的工作有 $150,000 的社會安全稅工資，Schedule C 利潤是 $60,000。他的自雇淨收入是 $55,410（$60,000 × 92.35%）。工資上限只剩 $26,100（$176,100 − $150,000），所以社會安全稅部分大約是 $3,236（$26,100 × 12.4%），聯邦醫療保險稅部分大約是 $1,607（$55,410 × 2.9%）— 合計大約 <strong>$4,843</strong>，而不是沒有 W-2 工資時的大約 $8,478。因為他的工資加上自雇收入超過 $200,000，他可能也要在 Form 8959 上繳一些額外聯邦醫療保險稅。
        </p>

        <h2>例子（舉例用）</h2>
        <p>
          Mia 是自由接案的設計師，沒有 W-2 工作。她 2025 年的 Schedule C 扣除營業費用後，淨利潤是 $40,000 — 遠低於社會安全稅的工資上限。一般來說：
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['Schedule C 的淨利潤', '$40,000'],
            ['× 92.35%', '$36,940'],
            ['× 15.3% 自雇稅', '約 $5,652'],
          ]}
        />
        <p>
          這是她的利潤要繳的所得稅之外，另外要繳的稅。她也可以在計算調整後總收入時，扣除自雇稅中相當於雇主負擔的部分，降低她的所得稅。
        </p>

        <h2>什麼能降低它 — 什麼不能</h2>
        <ul>
          <li><strong>營業費用</strong>會降低你 Schedule C 的利潤，所以會降低自雇淨收入。但它們不會改變 15.3% 的稅率。請見<a href="/zh-tw/library/small-business/business-deductions/">小型企業老闆可以扣除哪些費用？</a></li>
          <li><strong>自雇稅中可扣除的部分</strong> — 相當於雇主負擔的部分 — 會降低所得稅上的調整後總收入，但不會降低自雇稅本身。</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 年中就先規劃</div>
          <p>沒有人會從 1099 收入中替你預扣自雇稅。年中繳納預估稅款，可以避免報稅時欠一大筆 — 甚至被收取少繳罰款。請見<a href="/zh-tw/library/small-business/quarterly-taxes/">季度預估稅</a>。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

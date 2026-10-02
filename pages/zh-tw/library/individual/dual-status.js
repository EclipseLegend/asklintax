import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/dual-status.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'dual-status',
  sourceHash:      '3d62b3dedd8d',
  id:            '28',
  title:         '雙重身分報稅：抵達或離開美國的那一年',
  titleEn:       'Dual-status tax returns: your year of arrival or departure',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人在抵達或離開美國那一年的一般雙重身分規則。租稅協定主張、放棄國籍（Expatriation），以及非居民期間與美國業務有實質關聯的所得（Effectively Connected Income），需要專業檢視',
  persona:       ['持 H-1B、L-1 或其他工作簽證剛抵達的人', '新的綠卡持有人', '從學生身分轉為工作身分的人', '永久離開美國的人'],
  relatedJourney: ['剛到美國', '第一次報稅'],
  actionRequired: '找出你的居民身分開始（或結束）日期，再把這一年分成兩段：居民期間申報全球所得，非居民期間申報美國來源所得。如果你在年底與美國公民或居民結婚，請把雙重身分稅表和「整年視為居民」的選擇比較一下。',
  sources: [
    { label: 'IRS — 雙重身分者的課稅（Taxation of dual-status individuals）', url: 'https://www.irs.gov/individuals/international-taxpayers/taxation-of-dual-status-individuals' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens，第 1 章與第 6 章）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 非居民配偶（Nonresident spouse）', url: 'https://www.irs.gov/individuals/international-taxpayers/nonresident-spouse' },
    { label: 'IRS — 實質居留測試（Substantial presence test）', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
  ],
}

const FAQS = [
  {
    q: '我在 2025 年 6 月持 H-1B 搬到美國，我是雙重身分嗎？',
    a: '如果你在 2024 年不是美國居民，而且 2025 年符合實質居留測試（Substantial Presence Test），通常是。你的居民身分一般從你 2025 年第一天在美國的日子開始，在那之前的期間你是非居民。',
  },
  {
    q: '我搬來之前的台灣薪資要申報嗎？',
    a: '一般不用。在這一年的非居民期間，你只就美國來源所得（以及與美國業務有實質關聯的所得）繳稅。你在非居民期間收到、且與美國業務無關的外國來源所得，一般不用繳稅。你的居民身分開始之後收到的外國所得，則要繳稅。',
  },
  {
    q: '我可以使用標準扣除額嗎？',
    a: '不行。雙重身分稅表不能使用標準扣除額（Standard Deduction），但你可以改為列舉可扣除的項目。這是與美國公民或居民結婚的人考慮「整年視為居民」選擇的主要原因之一。',
  },
  {
    q: '我可以和配偶合併申報嗎？',
    a: '雙重身分稅表不行。但如果你在年底與美國公民或居民結婚（包括你們兩人都在年中成為居民的情況），你和配偶可以選擇整年都被視為美國居民，並合併申報。這樣雙重身分的限制就不再適用，你們兩人都要申報整年的全球所得。',
  },
  {
    q: '我要申報哪一份表格？',
    a: '取決於你在年度最後一天的身分。如果你在年底是居民，申報 Form 1040 — 2025 年的表格要在上方勾選「Other」並寫上「Dual Status Return」— 並附上一份非居民期間的聲明（可以使用 Form 1040-NR，以同樣方式填入「Dual Status Stmt」）。如果你在年底是非居民，則反過來。2025 年的雙重身分稅表不能電子申報。',
  },
  {
    q: '我在 2025 年永久離開美國，稅表什麼時候到期？',
    a: '如果你在年度最後一天是非居民，而且收到需要美國預扣稅款的薪資，一般是隔年 4 月 15 日。如果你沒有收到需要預扣的薪資，一般是 6 月 15 日。',
  },
]

const RELATED = [
  {
    href: '/library/individual/substantial-presence-test',
    cat:  'Individuals & Families',
    title: '實質居留測試：如何計算你在美國的天數',
    desc:  '你的雙重身分年度，通常從你計入實質居留測試的第一天開始。',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: '非居民配偶：我們可以合併報稅嗎？',
    desc:  '讓已婚夫妻避開雙重身分限制的選擇。',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '綠卡測試與實質居留測試的總覽。',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: '剛來美國？新移民完整報稅指南',
    desc:  '你在美國第一個稅務年度要處理的其他事。',
  },
]

export default function DualStatusZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '雙重身分外國人報稅說明（抵達或離開美國的那一年） | AskLinTax 繁體中文',
      description: '一年中部分時間是居民、其他時間是非居民？雙重身分稅表怎麼運作：居民身分開始日期、哪些所得要課稅、不能使用標準扣除額等限制，以及如何申報。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>「雙重身分」是什麼意思</h2>
        <p>
          如果你在同一個稅務年度中既是美國居民、又是非居民，你就是<strong>雙重身分</strong>（Dual-Status）納稅人。這只和你的<em>稅務居民身分</em>有關，與你的國籍或簽證無關。最常見的雙重身分年度，是你<strong>抵達</strong>美國的那一年，以及你<strong>離開</strong>的那一年。
        </p>
        <p>
          雙重身分年度要把一年分成兩段，每一段適用不同的規則。
        </p>

        <ArticleTable
          head={['一年中的期間', '美國課稅範圍']}
          rows={[
            ['你是美國居民的期間', '所有來源的所得 — 美國與外國（全球所得）'],
            ['你是非居民的期間', '美國來源所得，以及與美國營業或業務有實質關聯的所得。與美國業務無關的外國所得，一般不用繳稅。'],
          ]}
        />

        <h2>你的居民身分什麼時候開始？</h2>
        <p>
          如果你在前一年任何時候都不是美國居民，你的居民身分從你的<strong>居民身分開始日期</strong>（Residency Starting Date）開始，在那之前你是非居民：
        </p>
        <ul>
          <li><strong>實質居留測試：</strong>一般是你這一年第一天在美國的日子。如果你能證明在較早的那幾天，你與當時稅務住所（Tax Home）所在的外國有更密切的關聯，最多可以不計入 10 天較早的停留 — 這需要一份簽名的聲明。</li>
          <li><strong>綠卡測試：</strong>你這一年第一天以永久居民身分在美國的日子。</li>
          <li><strong>兩項測試都符合：</strong>以兩個日期中較早者為準。</li>
        </ul>
        <p>
          如果你在前一年任何一段時間是美國居民，而今年也是居民，你從 1 月 1 日起就被視為居民 — 抵達的那一年不用分成雙重身分。
        </p>

        <h3>實際例子</h3>
        <p>
          Lin 在 2025 年 5 月之前都在台灣生活與工作，2025 年 6 月 1 日持 H-1B 抵達美國，並在美國待到年底。她在 2024 年不是美國居民，2025 年符合實質居留測試。
        </p>
        <ArticleTable
          head={['期間', '身分', '美國課稅範圍']}
          rows={[
            ['2025 年 1 月 1 日 – 5 月 31 日', '非居民', '只有美國來源所得 — 她這段期間的台灣薪資一般不用繳稅'],
            ['2025 年 6 月 1 日 – 12 月 31 日', '居民', '所有所得，包括 6 月 1 日之後收到的任何台灣利息或租金'],
          ]}
        />
        <p>
          因為她在 12 月 31 日是居民，Lin 申報標示為「Dual Status Return」的 <strong>Form 1040</strong>（使用 2025 年表格上方新增的「Other」欄位），並附上非居民月份的雙重身分聲明。她必須以紙本申報 — 2025 年的雙重身分稅表不能電子申報。
        </p>

        <h2>雙重身分稅表的限制</h2>
        <ArticleTable
          head={['規則', '雙重身分稅表']}
          rows={[
            ['標準扣除額', '不允許 — 可以列舉可扣除的項目'],
            ['戶長', '不能使用戶長的稅率表或計算表'],
            ['合併申報', '不允許 — 除非你和配偶做出整年居民的選擇'],
            ['已婚、一年中部分時間是非居民、沒有做出選擇', '與美國業務有實質關聯的所得，必須使用夫妻分開申報的稅率'],
            ['某些抵稅額（已婚非居民）', '不能申請勞動所得抵稅額（Earned Income Credit）、高齡或身心障礙者抵稅額，或教育抵稅額，除非你選擇與配偶合併以居民身分課稅'],
            ['受扶養人', '你可能可以申報受扶養人'],
          ]}
        />

        <h2>如何申報</h2>
        <ArticleTable
          head={['你在 12 月 31 日的身分', '主要稅表', '附件']}
          rows={[
            ['居民（通常是抵達的那一年）', 'Form 1040 — 在上方勾選「Other」並寫上「Dual Status Return」', '一份顯示非居民期間所得的聲明 — 可以使用 Form 1040-NR，在其「Other」欄位填入「Dual Status Stmt」'],
            ['非居民（通常是離開的那一年）', 'Form 1040-NR — 在上方勾選「Other」並寫上「Dual Status Return」', '一份顯示居民期間所得的聲明 — 可以使用 Form 1040 或 1040-SR，在其「Other」欄位填入「Dual Status Stmt」'],
          ]}
        />
        <p>
          聲明必須列出你的姓名、地址與納稅人識別號碼。如果你在 12 月 31 日是居民，稅表一般在隔年 <strong>4 月 15 日</strong>到期。如果你在 12 月 31 日是非居民，有需要預扣的薪資者一般在 4 月 15 日到期，沒有的則在 <strong>6 月 15 日</strong>到期。
        </p>

        <h2>會改變情況的選擇</h2>
        <h3>已婚？整年居民的選擇</h3>
        <p>
          如果你在年初是非居民、年底是居民（或公民），而且在年底與美國公民或居民結婚，你和配偶可以選擇<strong>整年</strong>都被視為美國居民，並合併申報。雙重身分的限制就不再適用 — 但你們兩人都要就整年的全球所得繳稅，包括你抵達之前的月份。單身者不能做這項選擇。請參閱 <a href="/zh-tw/library/individual/nonresident-spouse/">非居民配偶：我們可以合併報稅嗎？</a>
        </p>
        <h3>第一年選擇</h3>
        <p>
          如果你在年底才抵達，要到<em>隔年</em>才符合實質居留測試，第一年選擇（First-Year Choice）可能讓你在抵達那一年的部分期間被視為居民。它有特定的天數要求；請參閱 <a href="/zh-tw/library/individual/substantial-presence-test/">實質居留測試說明</a>。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>雙重身分稅表是最複雜的個人稅表之一。如果你有配偶、在海外有投資或租金收入、可能主張租稅協定，或你要永久離開美國，請尋求協助。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

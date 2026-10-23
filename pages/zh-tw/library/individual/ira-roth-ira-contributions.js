import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/ira-roth-ira-contributions.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'ira-roth-ira-contributions',
  sourceHash:      '13ff07a509f0',
  id:            '96',
  title:         '傳統 IRA 與 Roth IRA 存款：2025 與 2026 年上限與收入規定',
  titleEn:       'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 590-A（2025）、IRS Notice 2024-80（2025 年上限）與 IRS Notice 2025-67（2026 年上限），說明 2025 與 2026 稅務年度傳統 IRA 與 Roth IRA 的存款規定。本文不涵蓋提領、轉存（rollover）、轉換、SEP 或 SIMPLE IRA，也不涵蓋州稅',
  persona:       ['在傳統 IRA 與 Roth IRA 之間做選擇的上班族', '有 401(k)、想知道 IRA 能不能扣除的人', '一方收入很少或沒有收入的夫妻', '排除海外工資的海外美國納稅人'],
  relatedJourney: ['準備報稅', '跨境財務'],
  actionRequired: '確認你有應稅報酬，確認你或配偶是否參加工作單位的退休計畫，把你的修正後 AGI 與該稅務年度、該報稅身分的逐步減少範圍比較，並在報稅截止日（不含延期）之前存入。',
  sources: [
    { label: 'IRS — Publication 590-A（2025），個人退休帳戶（IRA）的存款', url: 'https://www.irs.gov/publications/p590a' },
    { label: 'IRS — Notice 2024-80，2025 年退休計畫與 IRA 上限', url: 'https://www.irs.gov/pub/irs-drop/n-24-80.pdf' },
    { label: 'IRS — Notice 2025-67，2026 年退休計畫與 IRA 上限', url: 'https://www.irs.gov/pub/irs-drop/n-25-67.pdf' },
  ],
}

const FAQS = [
  {
    q: '同一年可以同時存傳統 IRA 和 Roth IRA 嗎？',
    a: '可以，但年度上限是共用的。2025 年你所有傳統與 Roth IRA 合計最多 $7,000（50 歲以上 $8,000）；2026 年為 $7,500（50 歲以上 $8,600），而且不能超過你的應稅報酬。',
  },
  {
    q: '我在公司有 401(k)，還能存 IRA 嗎？',
    a: '可以。參加工作單位的退休計畫不會讓你不能存款，只會影響傳統 IRA 存款能不能扣除，這取決於你的修正後 AGI 與報稅身分。Roth IRA 的資格看的是收入，不是有沒有參加工作單位的計畫。',
  },
  {
    q: '存款有年齡限制嗎？',
    a: '沒有。Publication 590-A 指出，2020 年及以後年度的傳統 IRA 存款沒有年齡限制，Roth IRA 存款則從來沒有年齡限制。你仍然需要有應稅報酬。',
  },
  {
    q: '2025 年 IRA 存款的截止日是什麼時候？',
    a: '2025 年的存款必須在 2025 年報稅截止日之前存入，不含延期——一般是 2026 年 4 月 15 日。申請報稅延期並不會延長存款期限。',
  },
  {
    q: '存太多了怎麼辦？',
    a: '超額存款每年留在帳戶中都要繳 6% 的稅。一般來說，只要在報稅截止日（含延期）之前把超額部分及其收益領出，就可以避免這筆稅。',
  },
  {
    q: '我住在海外，用 Form 2555 排除工資，還能存嗎？',
    a: 'Publication 590-A 指出，IRA 的報酬不包括你從所得中排除的金額，例如海外工作所得與住房費用。如果你所有的工資都被排除、又沒有其他報酬，一般來說那一年就不能存款。',
  },
]

const RELATED = [
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '錢領出來的時候會發生什麼事。',
  },
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: '海外工作所得排除額（Form 2555）：2025 與 2026 年規定',
    desc:  '被排除的工資不算 IRA 報酬。',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '「Retirement plan」方框顯示是否參加工作單位的計畫。',
  },
  {
    href: '/library/investment/foreign-pension-retirement-accounts',
    cat:  'Investments & Foreign Accounts',
    title: '海外退休金與退休帳戶：美國納稅人要申報什麼',
    desc:  '美國以外的退休帳戶。',
  },
]

export default function IraRothIraContributionsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '傳統 IRA 與 Roth IRA 存款：2025 與 2026 年上限與收入規定 | AskLinTax 繁體中文',
      description: 'IRA 存款說明：2025 與 2026 年上限與補繳額、可扣除與 Roth 的收入逐步減少範圍、工作單位退休計畫、配偶 IRA、截止日、超額存款，以及 IRA 與 401(k) 的比較。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          只要你有應稅報酬，<strong>2025</strong> 年一般最多可以存 <strong>$7,000</strong> 到 IRA，<strong>2026</strong> 年為 <strong>$7,500</strong>；50 歲以上還可以加上補繳額（catch-up）。<strong>傳統 IRA</strong> 的存款現在可能可以扣除，領出時再課稅；<strong>Roth IRA</strong> 的存款不能扣除，但合格的提領免稅。收入限制決定傳統 IRA 存款能不能扣除（如果你或配偶參加工作單位的退休計畫），也決定你到底能不能存 Roth IRA。
        </p>

        <h2>傳統 IRA 與 Roth IRA</h2>
        <ArticleTable
          head={['', '傳統 IRA', 'Roth IRA']}
          rows={[
            ['存款可否扣除', '可能可以，視是否參加工作單位計畫與收入而定', '永遠不能扣除'],
            ['誰可以存', '任何有應稅報酬的人', '有應稅報酬、修正後 AGI 低於上限的人'],
            ['提領', '一般要課稅，不可扣除的存款除外', '合格分配免稅'],
            ['最低提領額（RMD）', '要，從規定年齡開始', '原始帳戶持有人在世時不需要'],
          ]}
        />

        <h2>存款上限</h2>
        <ArticleTable
          head={['上限', '2025', '2026']}
          rows={[
            ['IRA 年度上限（傳統與 Roth 合計）', '$7,000', '$7,500'],
            ['50 歲以上補繳額', '$1,000（合計 $8,000）', '$1,100（合計 $8,600）'],
          ]}
        />
        <p>
          上限是上表金額與你當年應稅報酬兩者中<strong>較小</strong>的一個。報酬包括工資、薪水、小費、佣金與自雇淨收入，但不包括利息、股利、租金收入、退休金，也不包括你從所得中排除的金額，例如用 Form 2555 排除的海外工作所得。
        </p>

        <h2>我的傳統 IRA 存款可以扣除嗎？</h2>
        <p>
          如果當年<strong>你和配偶都沒有</strong>參加工作單位的退休計畫，不論收入多少，傳統 IRA 存款都可以全額扣除。如果你或配偶<strong>有</strong>參加，扣除額會在下列修正後 AGI 範圍內逐步減少到零：
        </p>
        <ArticleTable
          head={['情況', '2025 年逐步減少範圍', '2026 年逐步減少範圍']}
          rows={[
            ['單身或戶長，有參加工作單位計畫', '$79,000–$89,000', '$81,000–$91,000'],
            ['夫妻合併申報，存款人有參加', '$126,000–$146,000', '$129,000–$149,000'],
            ['夫妻合併申報，存款人沒參加但配偶有參加', '$236,000–$246,000', '$242,000–$252,000'],
            ['夫妻分開申報（年度中任何時候與配偶同住），任一方有參加', '$0–$10,000', '$0–$10,000'],
          ]}
        />
        <p>
          如果你分開申報，而且年度中任何時候都沒有和配偶同住，Publication 590-A 在這張表中把你視為單身。如果你有參加，Form W-2 上的「Retirement plan」方框應該會勾選。如果存款不能全部扣除，你仍然可以存<strong>不可扣除</strong>的傳統 IRA 存款，並在 <strong>Form 8606</strong> 上申報，這部分在領出時就不會再被課稅。
        </p>

        <h2>我可以存 Roth IRA 嗎？</h2>
        <p>
          Roth IRA 的資格看的是修正後 AGI，與是否參加工作單位計畫無關。可存金額會在下列範圍內逐步減少，超過範圍就是零：
        </p>
        <ArticleTable
          head={['報稅身分', '2025 年逐步減少範圍', '2026 年逐步減少範圍']}
          rows={[
            ['夫妻合併申報', '$236,000–$246,000', '$242,000–$252,000'],
            ['單身或戶長', '$150,000–$165,000', '$153,000–$168,000'],
            ['夫妻分開申報（年度中任何時候與配偶同住）', '$0–$10,000', '$0–$10,000'],
          ]}
        />
        <p>
          你在同一年度存入的傳統 IRA 金額，也會減少 Roth 的上限。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Ana</strong> 40 歲、單身，在公司有參加 401(k)，2025 年修正後 AGI 為 $84,000。她的收入落在 $79,000–$89,000 範圍內，所以傳統 IRA 扣除額會部分減少。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['2025 年範圍上限減去她的修正後 AGI：$89,000 − $84,000', '$5,000'],
            ['可扣除上限：$5,000 × 70%（Publication 590-A 工作表對 $7,000 上限使用的係數）', '$3,500'],
            ['她 $7,000 年度上限的其餘部分', '$3,500'],
          ]}
        />
        <p>
          Ana 可以扣除 $3,500 的傳統 IRA 存款。另外的 $3,500，因為她的收入低於 $150,000 的 Roth 範圍，可以改存 Roth IRA，或作為不可扣除的傳統 IRA 存款並在 Form 8606 上申報。她 2025 年的 IRA 存款合計不能超過 $7,000。
        </p>

        <h2>配偶 IRA</h2>
        <p>
          如果你們<strong>合併申報</strong>，而一方報酬很少或沒有報酬，那一方仍然可以依夫妻合計的報酬存款（Kay Bailey Hutchison 配偶 IRA 規定）。2025 年夫妻合計最多可存 $14,000（一方 50 歲以上 $15,000，兩人都 50 歲以上 $16,000），前提是夫妻合計的應稅報酬足夠。除了這項規定以外，每位配偶都用自己的報酬計算自己的上限，即使住在共同財產州也是如此。
        </p>

        <h2>截止日</h2>
        <ul>
          <li><strong>截止日：</strong>某一年度的存款必須在該年度報稅截止日之前存入，<strong>不含延期</strong>——2025 年的存款為 2026 年 4 月 15 日。</li>
          <li><strong>指定年度：</strong>如果你在 1 月 1 日到 4 月 15 日之間存款，要告訴 IRA 業者這筆存款是哪一年的。否則業者可以把它當作收到當年的存款並向 IRS 申報。</li>
        </ul>

        <h2>超額存款</h2>
        <p>
          存超過上限——或收入太高時存 Roth IRA——就會產生<strong>超額存款</strong>。超額部分每年留在帳戶中都要繳 <strong>6% 的稅</strong>，在 Form 5329 上申報。一般來說，只要在報稅截止日（<strong>含延期</strong>）之前把超額部分及其收益領出，就可以避免這筆稅。收益部分要課稅。
        </p>

        <h2>IRA 與 401(k)</h2>
        <ArticleTable
          head={['上限', '2025', '2026']}
          rows={[
            ['401(k) 選擇性遞延上限', '$23,500', '$24,500'],
            ['401(k) 50 歲以上補繳額', '$7,500', '$8,000'],
            ['401(k) 60 到 63 歲補繳額，取代 50 歲補繳額（計畫有提供時）', '$11,250', '$11,250'],
            ['IRA 上限', '$7,000', '$7,500'],
          ]}
        />
        <p>
          401(k) 與 IRA 的上限是分開的：存其中一個不會用掉另一個的額度。兩者唯一的關聯是，參加 401(k) 可能會限制你傳統 IRA 的<strong>扣除</strong>。401(k) 的金額是你透過雇主遞延的上限；IRA 的補繳額另外計算，為 $1,000（2025）或 $1,100（2026）。2026 年，Notice 2025-67 也訂了 <strong>$150,000</strong> 的 Roth 補繳工資門檻，依 2025 年工資判斷某人 2026 年的 401(k) 補繳是否必須指定為 Roth 存款。
        </p>

        <h2>住在海外</h2>
        <p>
          如果你申請海外工作所得排除額或海外住房排除額，被排除的金額不算 IRA 的報酬。如果你排除了所有工資、又沒有其他報酬，一般那一年就不能存款。沒有排除的工資——例如你改用外國稅額抵免——可以計入。請參考<a href="/zh-tw/library/individual/foreign-earned-income-exclusion/">海外工作所得排除額指南</a>。美國以外的退休帳戶適用不同規定；請參考<a href="/zh-tw/library/investment/foreign-pension-retirement-accounts/">海外退休金與退休帳戶</a>。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為有 401(k) 就不能存 IRA。</strong>它只影響扣除。</li>
          <li><strong>以為上限是每個帳戶各自計算。</strong>你所有的傳統與 Roth IRA 共用一個上限。</li>
          <li><strong>沒有報酬也存款</strong>，或只有投資所得或被排除的海外工資。</li>
          <li><strong>不可扣除的存款沒有申報 Form 8606。</strong></li>
          <li><strong>以為申請延期就可以晚點存。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>Roth 轉換、後門策略、重新定性、繼承的 IRA，以及 IRA 搭配社會安全福利（需要使用 Publication 590-A 的特殊工作表）的情況可能很複雜。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

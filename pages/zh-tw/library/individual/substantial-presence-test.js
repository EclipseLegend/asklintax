import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/substantial-presence-test.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'substantial-presence-test',
  sourceHash:      '60c2a161a546',
  id:            '29',
  title:         '實質居留測試：如何計算你在美國的天數',
  titleEn:       'Substantial Presence Test explained: how to count your days',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋實質居留測試（Substantial Presence Test）的天數計算、不計入的天數、豁免個人（Exempt Individual）、Form 8843，以及更密切關聯例外（Closer Connection Exception）。租稅協定的居民身分判定（Tie-Breaker）規則與放棄國籍只做摘要說明',
  persona:       ['簽證持有人（H-1B、L-1、F-1、J-1）', '來美國探望成年子女的父母', '在美國與台灣或中國兩地生活的人', '剛抵達美國的人'],
  relatedJourney: ['剛到美國', '第一次報稅'],
  actionRequired: '計算你在 2025 年、2024 年與 2023 年待在美國的天數，扣除不計入的天數，再套用公式：2025 年全部天數 + 2024 年天數的 1/3 + 2023 年天數的 1/6。如果合計達到 183 天以上，而且你在 2025 年至少待了 31 天，除非適用例外，否則你就是美國稅務居民。',
  sources: [
    { label: 'IRS — 實質居留測試（Substantial presence test）', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens，第 1 章）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 居民外國人（Resident aliens）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: '只待了一部分的日子，也算一天嗎？',
    a: '算。只要你在某一天的任何時候實際身在美國，那一天就被視為在美國 — 抵達日與離境日都算 — 除非適用特定的例外。',
  },
  {
    q: '我父母每年從台灣來看我，大約待四個月。他們可能變成美國稅務居民嗎？',
    a: '如果每年 120 天，不會：120 + 40（120 的三分之一）+ 20（120 的六分之一）= 180，低於 183。如果每年 150 天，合計是 150 + 50 + 25 = 225，就會符合測試 — 但因為他們當年在美國不到 183 天，只要按時申報 Form 8840，可能可以適用更密切關聯例外。',
  },
  {
    q: '我是 F-1 學生，我的天數要算嗎？',
    a: '在你是豁免學生的期間不算。如果你曾以教師、受訓人員或學生的身分享有豁免，期間涵蓋超過 5 個曆年的任何部分，你就不再是豁免的學生 — 除非你能證明你沒有永久居留美國的意圖，而且大致遵守了簽證規定。在豁免期間，你必須申報 Form 8843。',
  },
  {
    q: 'Form 8843 是什麼？我需要嗎？',
    a: 'Form 8843 是一份聲明，用來排除你以豁免個人（學生、教師或受訓人員）、參加慈善賽事的職業運動員身分，或因健康狀況無法離開美國的天數。把它附在你的稅表中；如果你不需要申報稅表，就單獨寄出。如果沒有按時申報，你一般就不能排除那些天數。',
  },
  {
    q: '我符合測試，但我的住所、家人和工作都在台灣。我還能是非居民嗎？',
    a: '可能可以，依更密切關聯例外：你當年在美國必須少於 183 天，整年都把稅務住所（Tax Home）保留在台灣，而且你與台灣的關聯比與美國更密切。你要用 Form 8840 主張。如果你在這一年申請了綠卡，或為取得綠卡採取了相關步驟，就不能適用。',
  },
  {
    q: '綠卡測試和這個有關嗎？',
    a: '那是另一項測試。如果你在這一年中任何時候是永久居民（Lawful Permanent Resident），不論天數多少，你都依綠卡測試成為居民。實質居留測試主要和沒有綠卡的人有關。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '總覽：綠卡測試、實質居留測試，以及每種身分對你的稅務代表什麼。',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: '雙重身分報稅：抵達或離開美國的那一年',
    desc:  '如果你在第一年的年中才符合測試，這裡說明你抵達那一年怎麼課稅。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '符合測試就代表你是居民 — 而居民要申報所有來源的所得。',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: '剛來美國？新移民完整報稅指南',
    desc:  '居民身分是第一步。這份指南說明之後的一切。',
  },
]

export default function SubstantialPresenceTestZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '實質居留測試說明：183 天公式與例外 | AskLinTax 繁體中文',
      description: 'IRS 實質居留測試怎麼運作：31 天與 183 天公式、哪些天數要算、豁免的學生與教師、Form 8843、更密切關聯例外，以及實際例子。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>一句話說明這項測試</h2>
        <p>
          如果你沒有綠卡，只要你在某一曆年中實際身在美國<strong>至少 31 天</strong>，<strong>而且</strong>以加權公式計算的三年合計達到 <strong>183 天以上</strong>，你在那一年就是美國稅務居民。本指南說明到底要怎麼算。居民身分的完整說明，請參閱 <a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>
        </p>

        <h2>計算公式</h2>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '24px 0' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: 'var(--navy)', lineHeight: '2' }}>
            <div>2025 年在美國的<strong>全部</strong>天數</div>
            <div>+ 2024 年在美國天數的 <strong>1/3</strong></div>
            <div>+ 2023 年在美國天數的 <strong>1/6</strong></div>
            <div style={{ borderTop: '2px solid var(--border)', marginTop: '10px', paddingTop: '10px' }}>
              <strong>合計 ≥ 183</strong>，而且 <strong>2025 年至少 31 天</strong> → 2025 年為居民
            </div>
          </div>
        </div>
        <p>
          IRS 自己舉的例子：某人在 2023、2024、2025 年每年都在美國 120 天，計算結果是 120 + 40 + 20 = <strong>180 天</strong> — 不到 183 天，所以依這項測試，他在 2025 年<strong>不是</strong>居民。
        </p>

        <h2>什麼算是一天</h2>
        <p>
          只要你在某一天的<strong>任何時候</strong>實際身在美國，那一天就算在美國。抵達日與離境日都算。這裡的「美國」是指 50 州與哥倫比亞特區（加上美國領海）— 不包括美國屬地或美國領空。
        </p>
        <h3>不計入的天數</h3>
        <ul>
          <li>你經常從加拿大或墨西哥的住所<strong>通勤</strong>到美國工作的日子</li>
          <li>你在兩個美國境外地點之間轉機、在美國停留<strong>不到 24 小時</strong>的日子</li>
          <li>你以<strong>外國船舶船員</strong>身分在美國的日子</li>
          <li>你因為在美國期間出現的健康狀況而<strong>無法離開</strong>的日子</li>
          <li>你是<strong>豁免個人</strong>的日子（見下一節）</li>
        </ul>

        <h2>豁免個人</h2>
        <p>
          「豁免個人」（Exempt Individual）不是指免稅，而是指你在那個身分下的天數不計入這項測試。
        </p>
        <ArticleTable
          head={['類別', '簽證', '豁免的限制']}
          rows={[
            ['學生', 'F、J、M 或 Q（大致遵守簽證規定）', '如果你曾以教師、受訓人員或學生身分享有豁免，期間涵蓋超過 5 個曆年的任何部分，就不再豁免 — 除非你能證明沒有永久居留的意圖，而且遵守了簽證規定'],
            ['教師與受訓人員', 'J 或 Q', '如果你在前 6 個曆年中有 2 年的任何部分，曾以教師、受訓人員或學生身分享有豁免，就不再豁免（如果你的全部報酬都由外國雇主支付，適用較窄的例外）'],
            ['與外國政府相關的個人', 'A 或 G（不含 A-3 或 G-5）', '在該身分期間'],
            ['職業運動員', '參加慈善運動賽事', '只限實際參賽的日子'],
          ]}
        />
        <p>
          豁免學生、教師與受訓人員的直系親屬也包括在內。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 申報 Form 8843，否則無法排除天數</div>
          <p>要以豁免學生、教師、受訓人員或運動員身分 — 或因健康狀況 — 排除天數，你必須申報 Form 8843。把它附在你的所得稅表中；如果你不需要申報稅表，就在 Form 1040-NR 的申報截止日前單獨寄出。如果沒有按時申報，你一般就不能排除那些天數。</p>
        </div>

        <h2>實際例子</h2>
        <ArticleTable
          head={['人物', '2025／2024／2023 年天數', '計算', '2025 年結果']}
          rows={[
            ['2024 年 3 月抵達的 H-1B 工作者', '300／250／0', '300 + 83.3 + 0 = 383.3', '居民'],
            ['每年從台灣來探親的父母', '120／120／120', '120 + 40 + 20 = 180', '依這項測試不是居民'],
            ['每年待得更久的探親父母', '150／150／150', '150 + 50 + 25 = 225', '符合測試 — 但可能可以主張更密切關聯例外'],
            ['第 4 個曆年的 F-1 學生', '天數排除（豁免）', '豁免的天數不計入', '依這項測試不是居民（需要申報 Form 8843）'],
          ]}
        />

        <h2>更密切關聯例外</h2>
        <p>
          即使你符合測試，如果以下<strong>全部</strong>成立，你仍可以被視為非居民：
        </p>
        <ul>
          <li>你當年在美國<strong>少於 183 天</strong></li>
          <li>你整年都在某個外國保留<strong>稅務住所</strong></li>
          <li>你與那個國家的<strong>關聯比與美國更密切</strong> — IRS 會看你的永久住所、家人、個人物品、銀行帳戶、商業活動、駕照與投票所在地</li>
        </ul>
        <p>
          你要按時申報 <strong>Form 8840</strong> 來主張。如果你在這一年中申請了永久居民身分、為成為永久居民採取了其他步驟，或有身分調整（Adjustment of Status）申請尚在審理中，就<strong>不能</strong>主張。
        </p>
        <p>
          對每年長時間待在美國陪伴子女、但生活重心在台灣或中國的父母來說，這是最重要的例外。
        </p>

        <h2>居民身分什麼時候開始 — 以及第一年選擇</h2>
        <p>
          如果你第一次符合測試，你的居民身分一般從那一年<strong>你第一天在美國</strong>的日子開始，那一年就成為 <a href="/zh-tw/library/individual/dual-status/">雙重身分年度</a>。如果你能證明在較早的那幾天與某個外國有更密切的關聯，最多可以不計入 10 天較早的停留。
        </p>
        <p>
          如果你在年底才抵達，要到<em>隔年</em>才符合測試，<strong>第一年選擇</strong>（First-Year Choice）可能讓你在抵達那一年的部分期間被視為居民。你必須在那一年連續待在美國至少 31 天，而且從這 31 天期間開始到 12 月 31 日之間，至少有 75% 的天數在美國（最多 5 天不在美國的日子可以算作在美國）。這項選擇要附一份聲明在 Form 1040 上，而且沒有 IRS 核准就不能撤銷。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 租稅協定可能改變結果</div>
          <p>如果依各國的法律，你同時是美國與另一個國家的居民，租稅協定的居民身分判定（Tie-Breaker）規則可能把你視為另一個國家的居民。主張這一點需要申報 Form 1040-NR 並附上 Form 8833。租稅協定主張需要專業建議。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

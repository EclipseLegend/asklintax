import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/new-immigrant.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'new-immigrant',
  sourceHash:      '5cf09cbff32a',
  id:            '04',
  title:         '剛來美國？新移民完整報稅指南',
  titleEn:       'New to the U.S.? A complete tax guide for new immigrants',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 實質居留測試（Substantial presence test）', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
    { label: 'IRS — 美國所得稅協定一覽（United States income tax treaties A to Z）', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
    { label: 'IRS — 海外銀行與金融帳戶申報（Report of Foreign Bank and Financial Accounts, FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — 個人納稅識別號碼（Individual Taxpayer Identification Number, ITIN）', url: 'https://www.irs.gov/individuals/individual-taxpayer-identification-number' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '一般原則適用於大多數新移民；雙重身分年度與租稅協定優惠需要個案分析',
  persona:       ['新移民', 'F-1 學生', 'H-1B 簽證持有人', '綠卡持有人（第一年）', '新的美國居民'],
  relatedJourney: ['剛到美國', '第一次報稅'],
  actionRequired: '用實質居留測試（Substantial Presence Test）確認你今年的稅務居民身分 — 這是最重要的第一步。你的身分決定你要申報哪些表格，以及必須申報哪些收入。',
}

const FAQS = [
  {
    q: '我今年剛到美國，需要報稅嗎？',
    a: '取決於兩件事：你在美國待了多久（決定你的居民身分），以及你賺了多少收入。如果你通過了實質居留測試，而且你的總收入至少達到你報稅身分的申報門檻（2025 年未滿 65 歲的單身申報人為 $15,750），一般就需要報稅。即使你不欠稅，報稅也可能讓你拿回預扣的稅款。',
  },
  {
    q: '在稅務上，居民外國人和非居民外國人有什麼不同？',
    a: '居民外國人（Resident Alien）要就全球所得課稅 — 你在世界任何地方賺的錢，都要列入美國稅表。非居民外國人（Nonresident Alien）只就美國來源所得課稅。這個區分由綠卡測試（你有沒有綠卡？）或實質居留測試（你在美國待得夠不夠久？）決定。大多數一年中大部分時間都在美國的新移民，是居民外國人。',
  },
  {
    q: '我持 F-1 學生簽證，在稅務上是居民還是非居民？',
    a: 'F-1 學生在實質居留測試中屬於「豁免個人」（Exempt Individual）— 前 5 個曆年以 F-1 簽證在美國的天數，不計入 183 天門檻。這代表大多數 F-1 學生以非居民外國人身分申報 Form 1040-NR，而不是一般的 Form 1040。第 5 年之後，你在稅務上可能成為居民外國人。',
  },
  {
    q: '我在台灣／中國的收入，需要在美國稅表上申報嗎？',
    a: '如果你是居民外國人（包括綠卡持有人，或通過實質居留測試的人），需要 — 你必須申報全球所得，包括你身為居民期間在台灣或中國賺的收入。在抵達美國的雙重身分年度，居民身分開始日期之前收到的外國所得，一般不用繳稅（除非與美國業務有關）。美國與部分國家簽有租稅協定，可能影響這些收入的課稅方式，也可能可以申請外國稅額抵免以避免重複課稅。',
  },
  {
    q: '什麼是雙重身分稅表？什麼時候需要申報？',
    a: '雙重身分稅表（Dual-Status Return）適用於你成為美國稅務居民的那一年。例如，如果你在 6 月抵達美國，並在年中成為居民外國人，你在前半段是非居民外國人，後半段是居民外國人。雙重身分稅表比較複雜，幾乎都需要稅務專業人士協助。',
  },
  {
    q: '我還沒有社會安全號碼，還能報稅嗎？',
    a: '可以。如果你不符合申請社會安全號碼的資格，可以連同稅表提交 Form W-7 申請 ITIN（個人納稅識別號碼）。即使沒有社會安全號碼，ITIN 也能讓你報稅、收到退稅，並申請某些抵稅額。',
  },
  {
    q: '我台灣的父母匯錢給我幫忙支付開銷，這算應稅收入嗎？',
    a: '來自外國個人的贈與在美國不是應稅收入。不過，如果你在同一年從外國個人收到超過 $100,000 的贈與，即使不用繳稅，也必須在 Form 3520 上申報。這是申報義務，不是稅。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '你的稅務居民身分決定一切 — 你要申報哪些表格、申報哪些收入，以及可以申請哪些扣除。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '如果你沒有社會安全號碼，就需要 ITIN 才能報稅與收到退稅。',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '如果你的海外帳戶在一年中任何時候超過 $10,000，就必須申報 FBAR — 即使你不欠稅。',
  },
]

export default function NewImmigrantZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '新移民報稅指南：你需要知道的一切 | AskLinTax 繁體中文',
      description: '給新移民與第一年居民的完整美國報稅指南。涵蓋居民身分、要申報哪些收入、ITIN、FBAR，以及你的第一份稅表。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>你在美國的第一個稅務年度，不必那麼混亂</h2>
        <p>
          搬到美國代表要面對一套新的稅制 — 它的運作方式和台灣、中國或大多數其他國家都很不一樣。好消息是，核心觀念是學得會的，一旦了解基本原理，大部分複雜的地方就會迎刃而解。
        </p>
        <p>
          本指南依真正重要的順序，帶你了解每一位新移民都需要知道的美國稅務重點。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 最重要的第一步</div>
          <p>在做任何事之前，你需要先確認你的<strong>稅務居民身分</strong>。它決定你要申報哪些稅表、必須申報哪些收入，以及可以申請哪些扣除額與抵稅額。本指南的其他內容，都從這一個判斷延伸出來。</p>
        </div>

        <h2>步驟 1：確認你的稅務居民身分</h2>
        <p>
          美國依你是<strong>居民外國人</strong>還是<strong>非居民外國人</strong>，用不同的方式課稅。雖然名稱很像，但這和你的移民身分完全無關 — 純粹是稅務上的分類。
        </p>

        <h3>居民外國人（Resident Alien）</h3>
        <p>
          如果你是居民外國人，美國會就你的<strong>全球所得</strong>（Worldwide Income）課稅 — 你在世界任何地方賺的錢。你使用 Form 1040 申報，和美國公民使用的表格相同。
        </p>
        <p>只要符合以下任一項，你就是居民外國人：</p>
        <ul>
          <li>你有<strong>綠卡</strong>（永久居民身分），或</li>
          <li>你通過<strong>實質居留測試</strong>（見下方）</li>
        </ul>

        <h3>非居民外國人（Nonresident Alien）</h3>
        <p>
          如果你是非居民外國人，美國只就你的<strong>美國來源所得</strong>課稅。你使用 Form 1040-NR 申報，這是一份不同、範圍較有限的稅表。
        </p>

        <h3>實質居留測試</h3>
        <p>
          如果你沒有綠卡，IRS 用實質居留測試判斷你的身分。這項測試計算你實際在美國的天數：
        </p>
        <ul>
          <li><strong>今年</strong>在美國的所有天數，加上</li>
          <li><strong>前一年</strong>在美國天數的 1/3，加上</li>
          <li><strong>前兩年</strong>在美國天數的 1/6</li>
        </ul>
        <p>
          如果合計達到 <strong>183 天以上</strong>，而且你今年在美國至少 31 天，你就是居民外國人。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 重要例外：F-1 與 J-1 學生</div>
          <p>持 F、J、M 或 Q 簽證的學生，以及持 J 或 Q 簽證的教師與受訓人員，可以是「豁免個人」— 他們在該身分下的天數不計入實質居留測試。學生在以豁免教師、受訓人員或學生身分度過任何部分的 5 個曆年後，一般就不再豁免；如果教師與受訓人員在前 6 個曆年中有 2 年的任何部分曾享有豁免，一般就不再豁免。大多數國際學生以非居民外國人身分申報，使用 Form 1040-NR。</p>
        </div>

        <h2>步驟 2：了解你必須申報哪些收入</h2>

        <h3>如果你是居民外國人</h3>
        <p>
          你必須申報<strong>全球所有來源的所有收入</strong>，包括：
        </p>
        <ul>
          <li>美國雇主支付的薪資（在 W-2 上申報）</li>
          <li>接案或自雇收入</li>
          <li>投資收入（股利、資本利得）</li>
          <li>美國或海外房產的租金收入</li>
          <li>你身為美國稅務居民期間，在台灣、中國或任何其他國家賺的收入（在抵達美國的雙重身分年度，居民身分開始日期之前的外國所得一般不課稅）</li>
          <li>營業收入</li>
        </ul>

        <h3>如果你是非居民外國人</h3>
        <p>
          你必須申報<strong>與美國營業或業務有實質關聯</strong>的所得，以及某些類型的美國來源所得（例如股利、利息與租金）。外國來源所得一般不用申報。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 你抵達的那一年可能是「雙重身分」年度</div>
          <p>如果你在年中成為美國稅務居民 — 例如你 3 月抵達，到年底通過了實質居留測試 — 你就是「雙重身分外國人」（Dual-Status Alien）。你在一部分時間是非居民，另一部分時間是居民。雙重身分稅表比一般稅表複雜，幾乎都需要稅務專業人士協助。</p>
        </div>

        <h2>步驟 3：取得你的稅籍號碼</h2>
        <p>
          要申報稅表，你需要一個稅籍號碼。有兩種選擇：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>如果你有……</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>你需要……</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['工作許可（H-1B、綠卡、EAD）', '社會安全號碼（SSN）— 到社會安全局（Social Security Administration）辦公室申請'],
                ['沒有工作許可（F-1 學生、依親簽證、觀光簽證）', 'ITIN（個人納稅識別號碼）— 用 Form W-7 申請'],
              ].map(([situation, need], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{need}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          ITIN 不是工作許可，也不影響你的移民身分。它只是讓你能履行美國的稅務義務、收到退稅，並申請某些抵稅額。請參閱完整的 <a href="/zh-tw/library/individual/itin/">ITIN 指南 →</a>
        </p>

        <h2>步驟 4：了解你的海外帳戶申報義務</h2>
        <p>
          對來自中國與台灣的新移民來說，這是最常被遺漏的義務之一。
        </p>
        <p>
          如果你在美國境外的銀行帳戶、投資帳戶或其他金融帳戶，合計最高價值在<strong>一年中任何時候超過 $10,000</strong>，你就必須向 FinCEN 申報 <strong>FBAR</strong>（海外銀行帳戶申報）。
        </p>
        <p>
          這與你的稅表是分開的。截止日是 4 月 15 日，並自動延期至 10 月 15 日。未申報的罰款可能很重 — 民事罰款上限由法律規定，每年依通膨調整，也可能有刑事處罰。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 即使你不欠稅，FBAR 仍然適用</div>
          <p>許多新移民以為，海外帳戶不用繳稅，就不需要申報 FBAR。這是錯的。FBAR 是揭露義務，不是稅。不論帳戶是否產生應稅收入，這項義務都存在。</p>
        </div>

        <h2>步驟 5：了解重要截止日</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>截止日</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>要申報什麼</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>適用對象</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['4 月 15 日', '聯邦稅表（Form 1040 或 1040-NR）', '大多數納稅人'],
                ['4 月 15 日', 'FBAR（FinCEN Form 114）', '海外帳戶超過 $10,000 的人'],
                ['6 月 15 日', '住在海外的美國公民／居民的稅表', '特殊情況'],
                ['10 月 15 日', '延期後的截止日（如果在 4 月 15 日前申請延期）', '申報了 Form 4868 的人'],
              ].map(([date, what, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', whiteSpace: 'nowrap', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{date}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{what}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>步驟 6：你可能符合的稅務優惠</h2>
        <p>
          身為新移民，不代表你會錯過稅務優惠。依你的情況，你可能符合：
        </p>
        <ul>
          <li><strong>標準扣除額</strong> — 2025 年單身申報人 $15,750（只限居民外國人；非居民外國人一般不能申請標準扣除額）</li>
          <li><strong>兒童抵稅額</strong> — 每個未滿 17 歲的符合資格子女最高 $2,200（2025 稅務年度），前提是孩子有有效的 SSN，而且你（或合併申報時的配偶）有可用於工作的社會安全號碼 — ITIN 不夠</li>
          <li><strong>外國稅額抵免</strong> — 如果你就同時被美國課稅的所得，向其他國家繳了稅，你可能可以用這些外國稅款抵免你的美國稅額</li>
          <li><strong>租稅協定優惠</strong> — 美國與許多國家（包括中國，但不包括台灣）簽有租稅協定，可能減少或免除協定國居民某些類型的美國稅</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 美中租稅協定與台灣的情況</div>
          <p>美國與中國簽有租稅協定，為中國國民提供某些優惠 — 包括降低股利的預扣稅率，以及學生與研究人員可能適用的免稅。台灣沒有出現在 IRS 與美國簽有所得稅協定的國家名單上，所以不要假設台灣的收入適用協定優惠。如果你的情況涉及中國或台灣的收入，請諮詢熟悉兩地制度的稅務專業人士。</p>
        </div>

        <h2>新移民最常見的錯誤</h2>
        <ul>
          <li><strong>應該以非居民身分申報卻以居民身分申報（或反過來）</strong> — 居民身分判斷錯誤，是影響最大的錯誤。它會影響你稅表的每一個部分。</li>
          <li><strong>沒有申報海外收入</strong> — 居民外國人必須申報全球所得。許多新移民不知道這也適用於自己。</li>
          <li><strong>忘了 FBAR</strong> — 它和你的稅表是分開的，有自己的申報系統。漏報可能導致可觀的罰款。</li>
          <li><strong>錯過可用的居民身分選擇</strong> — 如果你在年中成為居民外國人，而且在年底與美國公民或居民結婚，你和配偶可能可以選擇整年都被視為居民並合併申報，這樣可以避開雙重身分的限制（但你們兩人整年的全球所得都要課稅）。另外，第一年選擇（First-Year Choice）可以讓年底才抵達的人，在那一年的部分期間被視為居民；沒有 IRS 核准就不能撤銷。做出任何一項選擇之前，請先尋求建議。</li>
          <li><strong>以為雇主會處理好一切</strong> — 雇主會從你的薪水中預扣稅款，但不會幫你申報稅表。你要自己負責報稅、申報所有收入，並處理 FBAR 等其他義務。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

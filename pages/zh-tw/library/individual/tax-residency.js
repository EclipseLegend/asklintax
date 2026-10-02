import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/tax-residency.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'tax-residency',
  sourceHash:      'e05c263b3f64',
  id:            '05',
  title:         '我是美國稅務居民嗎？',
  titleEn:       'Am I a U.S. tax resident?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 實質居留測試（Substantial presence test）', url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test' },
    { label: 'IRS — 居民外國人（Resident aliens）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — 非居民配偶（Nonresident spouse）', url: 'https://www.irs.gov/individuals/international-taxpayers/nonresident-spouse' },
    { label: 'IRS — 海外銀行與金融帳戶申報（Report of Foreign Bank and Financial Accounts, FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋兩項主要測試（綠卡測試與實質居留測試）。租稅協定選擇、雙重身分稅表與豁免個人類別，需要個案分析。',
  persona:       ['新移民', 'F-1 學生', 'H-1B 簽證持有人', 'J-1 簽證持有人', '不確定自己報稅身分的人'],
  relatedJourney: ['剛到美國', '第一次報稅'],
  actionRequired: '用下方的判斷流程，確認你今年的稅務居民身分。你的答案決定你要申報哪一份稅表、必須申報哪些收入 — 在做任何事之前，先把這一點弄對。',
}

const FAQS = [
  {
    q: '我有綠卡，但一年中大部分時間住在美國境外。我還是美國稅務居民嗎？',
    a: '是。不論實際住在哪裡，綠卡持有人都是美國稅務居民。即使你一年中大部分時間都在美國境外，你仍然必須申報美國稅表，並申報全球所得。結束這項義務的唯一方法，是正式放棄綠卡（Form I-407），或綠卡被行政撤銷。',
  },
  {
    q: '我持 H-1B 簽證，我是居民外國人嗎？',
    a: '如果你在美國待得夠久，大概是。H-1B 持有人不是豁免個人，所以你在美國的天數會立刻計入實質居留測試。如果你這一年在美國超過大約一半的時間，而且前幾年也在美國，你很可能通過測試，成為居民外國人。請用你實際的天數計算確認。',
  },
  {
    q: '我持 F-1 簽證，我在美國的天數要算嗎？',
    a: '不算 — 在 F-1 身分的前 5 個曆年，你在美國的天數不計入實質居留測試。這段期間你是「豁免個人」（Exempt Individual）。這代表大多數 F-1 學生以非居民外國人身分申報 Form 1040-NR。第 5 個曆年之後，你會失去豁免身分，天數開始計算。',
  },
  {
    q: '我 10 月才到美國，今年還可能是居民外國人嗎？',
    a: '要看你前幾年的情況。如果前兩年你也在美國，那些天數（以 1/3 與 1/6 加權）可能讓合計超過 183 天。如果這是你在美國的第一年，你很可能不會通過實質居留測試。不過，如果符合某些條件，你可能可以選擇在這一年的部分期間被視為居民外國人 — 這叫做「第一年選擇」（First-Year Choice）。',
  },
  {
    q: '如果我一年中有部分時間是居民外國人、部分時間是非居民，會怎樣？',
    a: '這叫做「雙重身分」（Dual-Status）年度，通常發生在你抵達或離開美國的那一年。雙重身分稅表比較複雜：居民期間申報 Form 1040，並附上非居民期間的 Form 1040-NR。雙重身分申報人有某些限制 — 例如不能申請標準扣除額，而且除非你和配偶都選擇整年被視為居民，一般不能與配偶合併申報。強烈建議尋求專業協助。',
  },
  {
    q: '我通過了實質居留測試，但我和另一個國家的關係更密切。可以被視為非居民嗎？',
    a: '可能可以。有一項「更密切關聯」例外（Closer Connection Exception），讓你即使通過實質居留測試，仍可以被視為非居民外國人 — 但前提是你今年在美國少於 183 天，而且你能證明自己與某個外國有更密切的關聯（你的家人住在哪裡、銀行帳戶在哪裡、在哪裡投票等）。你要用 Form 8840 提出主張。',
  },
  {
    q: '我的居民身分會影響我的配偶和孩子嗎？',
    a: '會，影響很大。如果你是居民外國人，而你的配偶是非居民外國人，你有一個選擇：分開申報（你以居民身分、配偶以非居民身分），或選擇把配偶視為居民外國人並合併申報。合併申報可以降低整體稅負，但也代表你配偶的全球所得要繳美國稅。這項選擇在撤銷之前一直有效。',
  },
]

const RELATED = [
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: '剛來美國？新移民完整報稅指南',
    desc:  '知道自己的居民身分之後，這份指南帶你了解在美國第一個稅務年度需要知道的其他一切。',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '逐步帶你完成第一份美國稅表 — 表格、文件、截止日與常見錯誤。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '如果你以非居民外國人身分申報、又沒有社會安全號碼，就需要 ITIN。',
  },
]

export default function TaxResidencyZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '我是美國稅務居民嗎？實質居留測試說明 | AskLinTax 繁體中文',
      description: '用綠卡測試與實質居留測試，確認你在美國的稅務居民身分 — 居民外國人還是非居民外國人。給新移民的白話指南。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>為什麼這個問題這麼重要</h2>
        <p>
          在申報美國稅表之前，你需要知道一件事：在稅務上，你是<strong>居民外國人</strong>（Resident Alien）還是<strong>非居民外國人</strong>（Nonresident Alien）？
        </p>
        <p>
          這一個判斷會影響其他所有事情：
        </p>
        <ul>
          <li>你要申報哪一份稅表（Form 1040 或 Form 1040-NR）</li>
          <li>你必須申報哪些收入（全球所得，或只有美國來源所得）</li>
          <li>你能不能申請標準扣除額</li>
          <li>你可以使用哪些抵稅額</li>
          <li>你能不能與配偶合併申報</li>
        </ul>
        <p>
          判斷錯誤 — 特別是應該以非居民身分申報卻以居民身分申報，或反過來 — 是新移民最嚴重的錯誤之一。它會影響你稅表的每一個部分。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 稅務居民 ≠ 移民身分上的居民</div>
          <p>這是兩個完全不同的概念。你可能在移民身分上是合法永久居民（綠卡持有人），但在第一年的稅務上仍被以不同方式處理。反過來，你也可能持暫時簽證，卻在稅務上是完全的居民外國人。IRS 依實際停留與身分自行判斷 — 而不是看你的簽證類型。</p>
        </div>

        <h2>兩項測試 — 以及哪一項適用於你</h2>
        <p>
          IRS 用兩項測試判斷你是否為居民外國人。只要符合<em>任一</em>項測試，你就是居民外國人。
        </p>

        <h3>測試 1：綠卡測試（Green Card Test）</h3>
        <p>
          很簡單：如果你在稅務年度中任何時候是合法永久居民（綠卡持有人），那一年你就是居民外國人。
        </p>
        <p>
          不需要計算天數，也和你住在哪裡無關。有一個細節：在你第一次拿到綠卡的那一年，你的居民身分一般從你以永久居民身分在美國的第一天開始 — 除非你前一年就是美國居民 — 所以那一年可能是雙重身分年度。
        </p>

        <h3>測試 2：實質居留測試（Substantial Presence Test）</h3>
        <p>
          如果你沒有綠卡，IRS 會用以下公式，計算你在三年期間實際身在美國的天數：
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '24px 0' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: 'var(--navy)', lineHeight: '2' }}>
            <div><strong>今年的天數</strong> × 1（全部計入）</div>
            <div><strong>前一年的天數</strong> × 1/3</div>
            <div><strong>前兩年的天數</strong> × 1/6</div>
            <div style={{ borderTop: '2px solid var(--border)', marginTop: '10px', paddingTop: '10px' }}>
              <strong>合計 ≥ 183</strong>，而且<strong>今年至少 31 天</strong>
            </div>
          </div>
          <p style={{ marginTop: '14px', fontSize: '15px', color: 'var(--muted)', marginBottom: 0 }}>
            如果兩個條件都符合 → 你今年就是<strong style={{ color: 'var(--navy)' }}>居民外國人</strong>。
          </p>
        </div>

        <h3>實際例子</h3>
        <p>假設你持 H-1B 簽證抵達美國，在美國的天數如下：</p>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>年度</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>在美國天數</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>乘數</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>加權天數</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['今年（2025）', '210 天', '× 1', '210'],
                ['前一年（2024）', '180 天', '× 1/3', '60'],
                ['前兩年（2023）', '120 天', '× 1/6', '20'],
              ].map(([year, days, mult, weighted], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{year}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{days}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{mult}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{weighted}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--navy)' }}>合計</td>
                <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--green)', fontSize: '17px' }}>290 ≥ 183 ✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>結果：2025 年為<strong>居民外國人</strong>。申報 Form 1040，申報全球所得。</p>

        <h2>豁免個人 — 不計入的天數</h2>
        <p>
          並不是所有在美國的天數都計入實質居留測試。如果你是「豁免個人」，你在該身分期間於美國的天數不計入。
        </p>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>簽證類型</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>豁免期間</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>說明</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['F-1 學生', 'F-1 身分的前 5 個曆年', '第 5 年之後，天數開始正常計算'],
                ['J-1 學生', 'J-1 身分的前 5 個曆年', '與 F-1 相同'],
                ['J-1 非學生（教師、受訓人員）', '如果在前 6 個曆年中有 2 年的任何部分，曾以教師、受訓人員或學生身分享有豁免，該年就不再豁免', '如果全部報酬都由外國雇主支付，有有限的例外；需申報 Form 8843'],
                ['與外國政府相關的個人（A 或 G 簽證，A-3 與 G-5 除外）', '整個官方身分期間', 'A-3 與 G-5 簽證持有人不是豁免個人'],
                ['健康狀況', '因醫療緊急狀況無法離開的天數', '必須原本有意離開；需申報 Form 8843'],
              ].map(([visa, period, notes], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{visa}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{period}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️「豁免個人」≠ 免稅</div>
          <p>身為豁免個人，代表你的天數不計入實質居留測試，<strong>不</strong>代表你不用繳美國稅。非居民外國人仍然要就美國來源所得繳美國稅；如果在美國從事營業或業務（例如在美國工作），或有其他未經預扣完全繳清稅款的美國來源所得，就必須申報 Form 1040-NR。</p>
        </div>

        <h2>快速判斷流程</h2>

        <div style={{ border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden', margin: '24px 0' }}>
          {[
            { q: '你今年任何時候持有綠卡嗎？', yes: '居民外國人 → 申報 Form 1040', no: null, yesColor: 'var(--green)' },
            { q: '你是豁免個人嗎（F-1、J-1、外交人員等）？', yes: '非居民外國人 → 申報 Form 1040-NR', no: null, yesColor: 'var(--blue)' },
            { q: '你符合實質居留測試嗎（加權天數 ≥183，今年 ≥31 天）？', yes: '居民外國人 → 申報 Form 1040', no: '非居民外國人 → 申報 Form 1040-NR', yesColor: 'var(--green)' },
          ].map((step, i) => (
            <div key={i} style={{ padding: '18px 22px', borderBottom: i < 2 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '8px' }}>步驟 {i + 1}</div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--navy)', marginBottom: '12px' }}>{step.q}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ background: step.yesColor + '18', border: `1px solid ${step.yesColor}40`, borderRadius: '8px', padding: '8px 14px', fontSize: '14px' }}>
                  <strong style={{ color: step.yesColor }}>是 →</strong> <span style={{ color: 'var(--mid)' }}>{step.yes}</span>
                </div>
                {step.no && (
                  <div style={{ background: 'rgba(156,163,175,.12)', border: '1px solid rgba(156,163,175,.3)', borderRadius: '8px', padding: '8px 14px', fontSize: '14px' }}>
                    <strong style={{ color: 'var(--muted)' }}>否 →</strong> <span style={{ color: 'var(--mid)' }}>{step.no}</span>
                  </div>
                )}
                {!step.no && i < 2 && (
                  <div style={{ background: 'rgba(156,163,175,.12)', border: '1px solid rgba(156,163,175,.3)', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', color: 'var(--muted)' }}>
                    <strong>否 →</strong> 繼續到步驟 {i + 2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2>每種身分對你的稅務代表什麼</h2>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>項目</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>居民外國人</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>非居民外國人</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['稅表', 'Form 1040', 'Form 1040-NR'],
                ['課稅所得', '全球所得', '只有美國來源所得'],
                ['標準扣除額', '可以（2025 年單身 $15,750）', '不可以（只能分項扣除）'],
                ['與配偶合併申報', '可以', '一般不可以（除非做出選擇）'],
                ['大多數抵稅額', '可以（兒童抵稅額、EITC 等）', '有限（某些抵稅額不適用）'],
                ['租稅協定', '仍可能適用', '可能減少或免除某些所得的美國稅'],
                ['FBAR 申報要求', '要（如果海外帳戶 > $10,000）', '一般不用 — FBAR 適用於美國人'],
              ].map(([topic, resident, nonresident], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{topic}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{resident}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{nonresident}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>特殊情況</h2>

        <h3>「更密切關聯」例外</h3>
        <p>
          如果你通過了實質居留測試，但<em>今年</em>在美國少於 183 天，只要你能證明與某個外國有「更密切的關聯」，仍可能被視為非居民外國人。你要申報 Form 8840，並證明你的主要住所、家人、銀行帳戶與其他關係都在另一個國家。如果你已經申請綠卡，就不能適用這項例外。
        </p>

        <h3>第一年選擇</h3>
        <p>
          如果你抵達美國的第一年還不太符合實質居留測試，但隔年符合，你可能可以選擇在第一年的後段期間被視為居民外國人。這叫做「第一年選擇」（First-Year Choice），需要符合特定條件。它可以簡化你的申報情況，並讓你使用更多扣除。
        </p>

        <h3>雙重身分年度</h3>
        <p>
          在你成為美國稅務居民的那一年（或你離開的那一年），你可能一部分時間是非居民、其餘時間是居民。這叫做「雙重身分」年度，需要比較複雜的稅表 — 一般是 Form 1040 附上 1040-NR。雙重身分申報人不能使用標準扣除額，也不能合併申報 — 除非他們在年底與美國公民或居民結婚，而且夫妻雙方都選擇整年被視為美國居民；這樣雙重身分規則就不再適用，兩人都要申報全球所得。請參閱 <a href="/zh-tw/library/individual/dual-status/">雙重身分報稅</a>。強烈建議雙重身分稅表尋求專業協助。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 什麼時候該找專業協助</div>
          <p>如果以下任何一項適用於你，報稅前請先諮詢 CPA：你抵達或離開美國的那一年、雙重身分年度、你符合更密切關聯例外、你想做第一年選擇，或你的配偶有不同的居民身分。這些情況涉及申報後很難、甚至無法撤回的選擇。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

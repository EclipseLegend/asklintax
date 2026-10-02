import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/airbnb-tax-guide.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'airbnb-tax-guide',
  sourceHash:      '53dd6d3270f8',
  id:            '11',
  title:         'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
  titleEn:       'Airbnb host tax guide: what to report and what to deduct',
  category:      'Airbnb & Rental Income',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS Publication 527 — 住宅出租房產（Residential Rental Property）', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Topic no. 415，出租住宅與度假房產（Renting residential and vacation property）', url: 'https://www.irs.gov/taxtopics/tc415' },
    { label: 'IRS — 了解你的 Form 1099-K（Understanding your Form 1099-K）', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國稅務居民的一般短租規則。混合用途房產、度假屋，以及某些州的房產可能有額外規則。具體情況請諮詢 CPA。',
  persona:       ['Airbnb 房東', 'VRBO 房東', '短租房產擁有人', '出租房間或房產的人'],
  relatedJourney: ['Airbnb 與租金收入', '房產帶來的副業收入'],
  actionRequired: '確認這個稅務年度你出租房產的天數，以及你自己使用的天數。這兩個數字決定哪些稅務規則適用於你 — 包括 14 天規則是否讓你的收入完全免稅。',
}

const FAQS = [
  {
    q: 'Airbnb 會把我的收入申報給 IRS 嗎？',
    a: '會。Airbnb 這類線上平台一般只有在你這一年的總收款超過 $20,000、而且超過 200 筆交易時，才需要寄 Form 1099-K 給你（以及 IRS）。即使你沒有收到 1099-K（因為低於門檻，或 Airbnb 因其他原因沒有寄），你仍然必須在稅表上申報這筆收入。',
  },
  {
    q: '什麼是 14 天規則？怎麼運作？',
    a: '如果你一年出租房產少於 15 天（14 天以內），這筆租金收入完全不用申報 — 完全免稅。不過，你也不能扣除任何出租費用。這項規則只適用於你的主要住所，或你自己也有使用的房產，不適用於你從來沒有自己住過的純投資房產。',
  },
  {
    q: '我只出租家裡的一個房間，規則一樣嗎？',
    a: '一樣，但你需要把收入與費用在出租的房間和住家其他部分之間分攤。一般方法是依出租面積的比例分攤。例如，如果出租的房間占住家面積的 20%，你可以把共同費用（水電、網路、保險）的 20% 列為出租費用，再加上這個房間本身直接費用的 100%。',
  },
  {
    q: 'Airbnb 的服務費可以扣除嗎？',
    a: '可以。Airbnb 收取的房東服務費是可以扣除的費用。申報收入時，申報扣除服務費前的總租金收入，再另外在 Schedule E（如果你提供實質服務，則為 Schedule C）上扣除這筆費用。Airbnb 寄給你的 1099-K 顯示的是總收款 — 還沒扣除 Airbnb 服務費。',
  },
  {
    q: '我需要向房客收取銷售稅或住宿稅嗎？',
    a: '在許多地區，Airbnb 現在會代你收取並繳納地方住宿稅（Occupancy Tax）。不過在某些地方，你可能仍然要自己向地方政府登記並收稅。各城市與州的規定差異很大 — 請查看你所在地的規定，以及 Airbnb 針對你所在地區的稅務代收頁面。沒有收取應收的稅款可能會被罰款。',
  },
  {
    q: '身為 Airbnb 房東，我應該保留哪些紀錄？',
    a: '保留以下紀錄：所有租金收入（你的 Airbnb 後台與 1099-K）、你打算扣除的所有費用收據、房產出租與自用的日期（對混合用途的計算非常重要）、出租期間開始時拍攝的房產照片（需要證明房產狀況時很有用），以及你做的任何資本改良（會影響折舊計算）。',
  },
  {
    q: '在 Airbnb 出租需要申請營業執照嗎？',
    a: '許多城市現在要求短租許可或執照，有些城市甚至完全禁止或限制短租。這是地方／市政法規的問題，不是聯邦稅務問題 — 但沒有取得必要許可就營業，可能會被罰款。刊登前請先查看你所在城市網站上的短租規定，並依規定每年更新許可。',
  },
]

const RELATED = [
  {
    href:  '/library/rental/14-day-rule',
    cat:   'Airbnb & Rental',
    title: '14 天規則：Airbnb 收入何時完全免稅',
    desc:  '如果你出租房產 14 天以內，收入可能完全免稅。這裡說明規則到底怎麼運作。',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '了解扣除額，可以幫你身為 Airbnb 房東時盡可能多扣一些。',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  '有些 Airbnb 房東選擇用 LLC 持有出租房產，以取得責任保護。這裡說明如何判斷。',
  },
]

const DEDUCTIONS = [
  {
    category: '直接出租費用',
    subtitle: '100% 可扣除 — 只與出租有關',
    color: 'var(--green)',
    items: [
      { name: '清潔與打掃', note: '房客之間的專業清潔' },
      { name: 'Airbnb 房東服務費', note: 'Airbnb 從你的撥款中扣除的費用' },
      { name: '房客用品', note: '盥洗用品、咖啡、迎賓小物' },
      { name: '刊登用的攝影', note: '出租房產的專業照片' },
      { name: '床單與毛巾', note: '如果只給房客使用' },
      { name: '門鎖、鑰匙與智慧門鎖', note: '只限出租專用' },
      { name: '廣告與刊登費', note: 'Airbnb 以外的平台（例如 VRBO）' },
    ],
  },
  {
    category: '分攤的共同費用',
    subtitle: '部分可扣除 — 依出租使用比例分攤',
    color: 'var(--blue)',
    items: [
      { name: '房貸利息', note: '已付利息總額中出租的比例（自用部分列在 Schedule A）' },
      { name: '房屋稅', note: '只限出租的比例（自用部分列在 Schedule A）' },
      { name: '房屋保險', note: '出租的比例 — 可能需要另外加保短租附約' },
      { name: '水電瓦斯', note: '依時間或空間計算的出租比例' },
      { name: '網路與有線電視', note: '出租的比例 — 如果主要給房客使用則為 100%' },
      { name: '管委會費（HOA fees）', note: '出租的比例 — 先確認管委會是否允許短租' },
    ],
  },
  {
    category: '資本支出（折舊）',
    subtitle: '分好幾年扣除，不是一次扣完',
    color: '#7C3AED',
    items: [
      { name: '房產本身', note: '住宅出租房產分 27.5 年折舊' },
      { name: '大型家電', note: '冰箱、洗衣機／烘乾機 — 住宅出租房產一般分 5 年折舊' },
      { name: '家具', note: '床、沙發、桌子 — 住宅出租房產一般分 5 年折舊' },
      { name: '翻修與改良', note: '浴室翻修、新屋頂 — 依類型而定' },
    ],
  },
  {
    category: '營運費用',
    subtitle: '在支付的那一年扣除',
    color: 'var(--gold)',
    items: [
      { name: '物業管理費', note: '如果你請當地的管理人' },
      { name: '會計與報稅', note: '與出租相關的 CPA 費用' },
      { name: '律師費', note: '與出租相關的法律費用' },
      { name: '修繕與維護', note: '修理壞掉的東西 — 不是改良' },
      { name: '除蟲', note: '定期或臨時的處理' },
      { name: '園藝與除雪', note: '如果與出租使用有關' },
    ],
  },
]

export default function AirbnbTaxGuideZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼 | AskLinTax 繁體中文',
      description: 'Airbnb 房東完整報稅指南 — 要申報哪些收入、可以扣除哪些費用、14 天規則怎麼運作，以及該用 Schedule E 還是 Schedule C。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>第一個問題：14 天規則適用於你嗎？</h2>
        <p>
          在做任何事之前，先確認一個數字：你今年出租房產幾天？
        </p>
        <p>
          如果答案是 <strong>14 天以內</strong>，你可能適用 14 天規則 — 代表你的租金收入完全免稅，也不需要申報。完整說明請參閱我們的 <a href="/zh-tw/library/rental/14-day-rule/">14 天規則指南</a>。
        </p>
        <p>
          如果你出租 <strong>15 天以上</strong>，本指南的規則就適用於你。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 你需要知道的兩個數字</div>
          <p><strong>出租天數：</strong>房產（或房間）租給付費房客的天數。</p>
          <p style={{ marginBottom: 0 }}><strong>自用天數：</strong>你（或免費使用的家人）使用房產的天數。這兩個數字決定適用哪些規則，以及費用要怎麼分攤。</p>
        </div>

        <h2>該用哪一份稅表？Schedule E 還是 Schedule C</h2>
        <p>
          租金收入一般在 <strong>Schedule E</strong> 上申報。不過，有些房東必須使用 <strong>Schedule C</strong>。差別很重要，因為 Schedule C 的收入要繳自雇稅（15.3%），Schedule E 的收入則不用。
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>你的情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>使用的表格</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>要繳自雇稅嗎？</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['出租房間或房產，沒有為房客提供實質服務', 'Schedule E — 補充收入（Supplemental Income）', '❌ 不用'],
                ['主要為了房客方便而提供實質服務（例如定期清潔、更換床單或客房清潔服務）', 'Schedule C — 營業收入（Business Income）', '✅ 要（15.3%）'],
                ['出租屬於不動產經銷商（Real Estate Dealer）營業的一部分', 'Schedule C — 營業收入（Business Income）', '✅ 要（15.3%）'],
              ].map(([situation, form, se], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{form}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{se}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Schedule E 還是 Schedule C？</div>
          <p>房客之間例行的退房清潔，本身並不能決定要用 Schedule E 還是 Schedule C。如果你主要為了房客方便而提供實質服務 — 例如定期清潔、更換床單或客房清潔服務 — Publication 527 說明要在 Schedule C 上申報。如果你不確定自己的服務屬於哪一種，請尋求專業建議。</p>
        </div>

        <h2>哪些算是租金收入？</h2>
        <p>
          申報你從房客收到的<strong>總金額</strong> — 在 Airbnb 扣除房東服務費之前的金額。Airbnb 寄給你的 1099-K 顯示的是總收款。接著再把服務費當作營業費用扣除。
        </p>
        <p>
          租金收入包括：
        </p>
        <ul>
          <li>房客支付的每晚租金</li>
          <li>向房客收取的清潔費（即使你另外付錢請清潔人員 — 那是可扣除的費用）</li>
          <li>寵物費、加人費或任何其他向房客收取的費用</li>
          <li>你沒收的押金（押金用於賠償損壞或沒有退還時，就成為收入）</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 1099-K 顯示的是總額 — 扣除 Airbnb 費用之前</div>
          <p>Airbnb 寄給你的 1099-K 顯示的是房客支付的總金額 — 包括 Airbnb 那一部分的清潔費，而且是在 Airbnb 扣除房東服務費之前。不要以為 1099-K 和你銀行實際收到的金額一樣。申報 1099-K 上的總金額，再另外把 Airbnb 的房東服務費列為費用扣除。</p>
        </div>

        <h2>可以扣除哪些費用？</h2>
        <p>
          Airbnb 房東可以扣除的費用範圍很廣。關鍵規則：費用必須是你出租活動<em>一般且必要</em>的支出，而且如果你自己也使用這個房產，必須<em>在出租與自用之間分攤</em>。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
          {DEDUCTIONS.map((section, si) => (
            <div key={si} style={{ border: `1.5px solid ${section.color}30`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: section.color + '10', padding: '14px 20px', borderBottom: `1px solid ${section.color}20` }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: section.color }}>{section.category}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{section.subtitle}</div>
              </div>
              <div style={{ padding: '4px 0' }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 20px', borderBottom: ii < section.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                    <span style={{ color: section.color, fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>·</span>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--navy)' }}>{item.name}</span>
                      <span style={{ fontSize: '13.5px', color: 'var(--muted)', marginLeft: '10px' }}>{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>混合用途房產的費用如何分攤</h2>
        <p>
          如果你出租的是你的主要住所，或你自己也有使用的房產，必須把費用在出租與自用之間分攤。IRS Publication 527 依各用途的使用天數來分攤費用：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>依天數分攤</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>
              出租天數除以總使用天數（出租天數 + 自用天數）。
            </p>
            <div style={{ background: 'var(--white)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', color: 'var(--navy)', fontFamily: 'monospace' }}>
              出租天數：60<br />
              自用天數：30<br />
              總天數：90<br />
              <strong>出租比例：60/90 = 67%</strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', marginBottom: 0 }}>IRS Publication 527 說明的方法</p>
          </div>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 折舊：大多數 Airbnb 房東漏掉的扣除</div>
          <p>
            折舊（Depreciation）讓你可以把房產的成本分年扣除 — 即使你今年並沒有實際花這筆錢。住宅出租房產可以把建築物的價值（不含土地）分 27.5 年折舊。以一間 $400,000、建築物價值 $350,000 的房產來說，每年的折舊約 $12,727 — 這是一筆可觀的扣除，許多自己管理的房東卻忘了申報。
          </p>
          <p style={{ marginBottom: 0 }}>
            重要：將來出售房產時，IRS 會「回收」這些折舊並課稅，這叫做折舊回收（Depreciation Recapture）。請記錄你每年提列的折舊。
          </p>
        </div>

        <h2>最常見的 Airbnb 報稅錯誤</h2>
        <ul>
          <li><strong>沒有記錄自用天數</strong> — 如果你（或家人）使用房產卻沒有保留紀錄，可能扣除過多（有查帳風險），也可能扣除不足（少拿了該省的錢）。請用行事曆記錄。</li>
          <li><strong>申報淨額而不是總額</strong> — 1099-K 顯示的是總租金收款。申報總金額，再另外扣除 Airbnb 的費用。不要只申報進到你銀行帳戶的金額。</li>
          <li><strong>漏掉折舊</strong> — 許多房東因為計算複雜就跳過。CPA 可以在第一年就幫你正確建立折舊表，之後每年都會自動延續。</li>
          <li><strong>沒有分開出租與自用費用</strong> — 把只能部分分攤的費用 100% 扣除，在查帳時是一個警訊。</li>
          <li><strong>忘了地方許可與稅款</strong> — 沒有許可就經營短租，可能被處以不能扣除的罰款，也可能讓你的稅務申報受到檢視。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

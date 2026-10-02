import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/quarterly-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'quarterly-taxes',
  sourceHash:      '808d42d014d0',
  id:            '13',
  title:         '季度預估稅：誰要繳？怎麼算？',
  titleEn:       'Quarterly estimated taxes: who pays and how to calculate',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — Form 1040-ES（個人預估稅，2026 年版）', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' },
    { label: 'IRS Publication 505 — 預扣稅款與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/publications/p505' },
    { label: 'IRS — 以簽帳卡或信用卡繳稅（Pay your taxes by debit or credit card）', url: 'https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card' },
    { label: 'IRS — EFTPS：電子聯邦稅款繳納系統（Electronic Federal Tax Payment System）', url: 'https://www.irs.gov/payments/eftps-the-electronic-federal-tax-payment-system' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋聯邦預估稅規則。各州的預估稅規定不同 — 多數州採用類似制度，但門檻與截止日不同，請另外確認你所在州的規定。',
  persona:       ['接案者', '自雇人士', 'LLC 負責人', '有 1099 收入的承包商', '小型企業老闆'],
  relatedJourney: ['創業或經營小型企業', '自雇第一年'],
  actionRequired: '判斷今年來自未預扣收入的聯邦稅，是否預計會達到 $1,000 以上。如果是，請把四期季度繳款截止日記在行事曆上，並用安全港規則（Safe Harbor Rule）計算第一期要繳的金額。',
}

const FAQS = [
  {
    q: '如果漏繳了一期季度預估稅，會怎樣？',
    a: '你會被收取少繳罰款（Underpayment Penalty）— 即使你在 4 月 15 日前把全部稅款繳清也一樣。罰款按季計算，利率為聯邦短期利率加 3%，套用在每一季少繳的金額上。通常比例不高，但會累積。罰款以 Form 2210 計算，通常會自動加到你的稅單上。',
  },
  {
    q: '可以不分季繳，等到 4 月一次繳清嗎？',
    a: '你可以在 4 月一次繳清，但如果全年應繳稅額達到 $1,000 以上，又沒有按季繳納，你會因每一期漏繳的季度被收取少繳罰款。即使你在截止日前全額繳清，IRS 仍會收取這項罰款。唯一的例外：前一年的應納稅額為零，或你符合某一項少繳罰款的例外規定。',
  },
  {
    q: '我有 W-2 工作，也有一些接案收入。需要按季繳預估稅嗎？',
    a: '要看金額。如果接案收入不多，提高 W-2 薪資的預扣稅款（Withholding）就能涵蓋多出來的稅，你可能不需要另外按季繳納。可以請公司人資協助提高 W-4 的預扣金額。如果接案收入較多，你可能需要同時提高預扣並按季繳納。判斷方式：扣除 W-2 預扣後，接案收入是否會讓你多欠 $1,000 以上的稅？',
  },
  {
    q: '什麼是「安全港」方法？為什麼大家會用？',
    a: '安全港方法（Safe Harbor）是按季繳納前一年應納稅額的 100%（如果前一年的調整後總收入〔Adjusted Gross Income, AGI〕超過 $150,000，則為 110%），不論今年實際欠多少，都可以避免少繳罰款。這種方法很受歡迎，因為不需要計算今年的收入。如果你的收入不穩定或難以預估，安全港讓你確定不會被罰 — 即使今年實際的稅最後比較高。',
  },
  {
    q: '每一期季度預估稅什麼時候到期？',
    a: '第 1 期（1–3 月的收入）：4 月 15 日到期。第 2 期（4–5 月的收入）：6 月 15 日到期。第 3 期（6–8 月的收入）：9 月 15 日到期。第 4 期（9–12 月的收入）：隔年 1 月 15 日到期。注意：第 2 期只有大約 2 個月，第 3 期只有 3 個月 — 各期長短不一。如果截止日遇到週末或假日，會順延到下一個工作日。',
  },
  {
    q: '我第一季虧損，還需要繳預估稅嗎？',
    a: '不一定。預估稅是依你預期的全年淨收入計算。如果第一季的虧損讓你預期的全年收入低於門檻，你可能不需要繳。不過，如果下半年收入增加，你需要重新計算。年化收入分期法（Annualized Income Installment Method，Form 2210 的 Schedule AI）可以讓繳款配合你實際賺到收入的時間，如果全年收入不平均，可能可以降低罰款。',
  },
  {
    q: '實際上要怎麼繳款？',
    a: '最簡單的方式是 IRS Direct Pay（IRS.gov/payments）— 免費、即時，而且會立即收到確認。你也可以透過你的 IRS 線上帳戶（IRS Online Account）繳款。電子聯邦稅款繳納系統（EFTPS）已不再接受個人納稅人新申請，但目前的使用者暫時仍可繼續使用。其他方式：以簽帳卡或信用卡繳款（需支付手續費），或連同 Form 1040-ES 寄支票。多數人建議使用 IRS Direct Pay。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '1099 收入會帶來按季繳納預估稅的要求。計算繳款金額前，先了解 1099 收入如何課稅。',
  },
  {
    href:  '/library/small-business/business-deductions',
    cat:   'Small Business',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '營業扣除額會減少你的淨利 — 直接降低你的所得稅，以及你每季要繳的預估稅。',
  },
  {
    href:  '/library/business-formation/llc-vs-scorp',
    cat:   'Business Formation',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  'S-Corp 負責人要跑薪資（payroll），按季繳款的要求可能不同。規劃繳款前，先了解公司架構。',
  },
]

// 2026 estimated tax payment deadlines for Tax Year 2026 income (source: 2026 Form 1040-ES)
const DEADLINES = [
  { quarter: '第 1 期', period: '2026 年 1 月 1 日 – 3 月 31 日',  due: '2026 年 4 月 15 日',  note: '與年度報稅截止日同一天' },
  { quarter: '第 2 期', period: '2026 年 4 月 1 日 – 5 月 31 日',  due: '2026 年 6 月 15 日',  note: '只有約 2 個月 — 很快就到' },
  { quarter: '第 3 期', period: '2026 年 6 月 1 日 – 8 月 31 日',  due: '2026 年 9 月 15 日',  note: '標準的 3 個月期間' },
  { quarter: '第 4 期', period: '2026 年 9 月 1 日 – 12 月 31 日', due: '2027 年 1 月 15 日',  note: '或在 2027 年 2 月 1 日前報稅並繳清' },
]

export default function QuarterlyTaxesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  const [income, setIncome]   = useState('')
  const [expenses, setExpenses] = useState('')

  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  // Simple calculator (same formula as the English master)
  const netProfit   = Math.max(0, (parseFloat(income) || 0) - (parseFloat(expenses) || 0))
  const seBase      = netProfit * 0.9235
  const seTax       = seBase * 0.153
  const seDeduction = seTax / 2
  const taxableIncome = netProfit - seDeduction
  // Simplified income tax at blended 22% for illustration
  const incomeTax   = taxableIncome > 0 ? taxableIncome * 0.22 : 0
  const totalTax    = seTax + incomeTax
  const quarterly   = totalTax / 4
  const monthly     = totalTax / 12

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '季度預估稅：誰要繳、怎麼算、什麼時候繳 | AskLinTax 繁體中文',
      description: '給接案者、承包商與小型企業老闆的季度預估稅完整指南 — 包括截止日、計算方式，以及如何避免少繳罰款。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>為什麼會有季度預估稅？</h2>
        <p>
          美國的稅制是「賺多少、繳多少」（pay as you go）。如果你是受雇員工，雇主會從每一份薪水中預扣稅款，並在一整年中代你繳給 IRS，你完全不用操心。
        </p>
        <p>
          如果你是自雇人士、接案者或 LLC 負責人，就沒有人幫你預扣。你賺到的每一塊錢都是稅前金額。IRS 仍然希望在一整年中陸續收到稅款 — 這就是季度預估稅（Estimated Tax）制度存在的原因。沒有預扣，你就要自己一年分四次直接繳款。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 自雇第一年最常見的錯誤</div>
          <p>許多剛開始自雇的人把收入全部花掉，到了 4 月才發現欠了一大筆稅 — 還要加上沒有在年中繳稅的罰款。即使你在 4 月 15 日前全部繳清，罰款仍然適用。從你有自雇收入的第一季開始，就要按季繳納。</p>
        </div>

        <h2>你需要按季繳納預估稅嗎？</h2>
        <p>
          如果以下兩項都成立，你通常就必須按季繳納預估稅：
        </p>
        <ul>
          <li>扣除預扣稅款與抵稅額後，你預計今年的聯邦稅至少會欠 <strong>$1,000</strong></li>
          <li>你的預扣稅款與抵稅額，將低於以下兩者中較小的一項：<strong>今年應納稅額的 90%</strong>，或<strong>前一年應納稅額的 100%</strong>（如果前一年 AGI 超過 $150,000 — 夫妻分開申報為 $75,000 — 則為 110%）</li>
        </ul>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>你的情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>需要按季繳納嗎？</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['沒有 W-2 收入的接案者或承包商', '✅ 幾乎一定需要 — 從第 1 期開始'],
                ['領取分配款的 LLC 負責人（非 S-Corp）', '✅ 需要 — 淨利要繳自雇稅'],
                ['有可觀副業收入的 W-2 員工', '⚠️ 可能需要 — 視金額而定；可以先考慮提高 W-4 預扣'],
                ['自己領薪水的 S-Corp 負責人', '✅ 薪資系統會處理 — 但要確認分配款是否帶來額外的稅'],
                ['只有 W-2 收入的員工', '❌ 不需要 — 雇主預扣已涵蓋'],
                ['有退休金與投資收入的退休人士', '⚠️ 可能需要 — 如果預扣不足應納稅額的 90%'],
              ].map(([situation, required], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>2026 年季度預估稅截止日</h2>
        <p>
          2026 稅務年度收入的季度預估稅，截止日如下：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', margin: '24px 0' }}>
          {DEADLINES.map((d, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '18px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{d.quarter}</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>{d.due}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>{d.period}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--light)', fontStyle: 'italic' }}>{d.note}</div>
            </div>
          ))}
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 第 4 期例外：提早報稅，就可以不繳 1 月那一期</div>
          <p>第 4 期的部分，如果你在 1 月 31 日前（2026 年預估稅的日期為 2027 年 2 月 1 日）申報完整的稅表，並且全額繳清剩餘稅款，就可以不繳 1 月 15 日那一期。如果你已經準備好提早報稅，這可以讓年底的規劃更簡單。</p>
        </div>

        <h2>怎麼計算你要繳的金額？</h2>
        <p>
          有兩種方法，選擇比較適合你情況的一種：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '8px' }}>方法 1 — 安全港（Safe Harbor）</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>依去年的稅額繳納</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '14px' }}>
              把去年應納稅額的 100% 分成四期平均繳納（如果前一年 AGI &gt; $150,000，則為 110%）。不需要計算 — 只要把去年的稅額除以 4。
            </p>
            <div style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>✓ 每一期都準時繳納，就能避免少繳罰款</div>
            <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '6px' }}>適合：收入不固定、難以預估今年收入的人</div>
          </div>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--blue)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '8px' }}>方法 2 — 依今年預估</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>依今年預估收入繳納</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '14px' }}>
              預估你的全年淨收入，計算所得稅加上自雇稅（Self-Employment Tax），再除以 4。如果今年收入比去年低，這種方法比較準確。
            </p>
            <div style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: '500' }}>✓ 每期繳款可能比較少</div>
            <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '6px' }}>適合：收入穩定，或收入比前一年低的人</div>
          </div>
        </div>

        <h2>快速試算：估算你每季要繳多少</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '20px' }}>
          輸入你預估的全年數字，就能粗略估算每季要繳的金額。這裡用簡化的 22% 所得稅率 — 實際稅率會依收入與報稅身分而不同。
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '28px', margin: '0 0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>預估全年營收／收入</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--white)' }}>
                <span style={{ padding: '11px 14px', background: 'var(--slate)', fontSize: '15px', color: 'var(--muted)', borderRight: '1px solid var(--border)', flexShrink: 0 }}>$</span>
                <input
                  type="number"
                  placeholder="80,000"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                  style={{ flex: 1, minWidth: 0, width: '100%', padding: '11px 14px', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'DM Sans, sans-serif', background: 'transparent' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>預估營業費用</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--white)' }}>
                <span style={{ padding: '11px 14px', background: 'var(--slate)', fontSize: '15px', color: 'var(--muted)', borderRight: '1px solid var(--border)', flexShrink: 0 }}>$</span>
                <input
                  type="number"
                  placeholder="10,000"
                  value={expenses}
                  onChange={e => setExpenses(e.target.value)}
                  style={{ flex: 1, minWidth: 0, width: '100%', padding: '11px 14px', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'DM Sans, sans-serif', background: 'transparent' }}
                />
              </div>
            </div>
          </div>

          {netProfit > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: '淨利', value: `$${netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                  { label: '自雇稅（估算）', value: `$${seTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                  { label: '所得稅（以 22% 估算）', value: `$${incomeTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--white)', borderRadius: '10px', padding: '14px 16px', border: '1px solid var(--border-l)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--light)', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--navy)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--navy)', borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)', marginBottom: '4px' }}>估算每季繳款</div>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--gold-l)' }}>${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginTop: '4px' }}>每 3 個月</div>
                </div>
                <div style={{ background: 'var(--slate)', borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>如果改成每月存起來</div>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)' }}>${monthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                  <div style={{ fontSize: '12px', color: 'var(--light)', marginTop: '4px' }}>每月要預留的金額</div>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--light)', marginTop: '12px', marginBottom: 0, fontStyle: 'italic' }}>
                僅為估算。實際稅額取決於你的總收入、報稅身分、扣除額與抵稅額。具體情況請諮詢 CPA。
              </p>
            </div>
          )}
        </div>

        <h2>實際上要怎麼繳款？</h2>
        <p>IRS 提供好幾種繳款方式，依方便程度排列：</p>
        <ol>
          <li><strong>IRS Direct Pay</strong>（IRS.gov/payments）— 免費、即時，不需要帳戶，直接從你的銀行帳戶扣款，並立即收到確認。這是多數人建議使用的方式。</li>
          <li><strong>EFTPS</strong>（eftps.gov）— 免費，可以提前排定繳款。IRS 已不再接受個人納稅人新申請 EFTPS；目前的使用者暫時仍可繼續使用。新的個人繳款人可以改用 IRS Direct Pay 或 IRS 線上帳戶。</li>
          <li><strong>簽帳卡或信用卡</strong> — 透過 IRS 授權的處理商繳款，但要支付處理費（信用卡目前為 1.75%–1.85%，最低 $2.50；簽帳卡為約 $2 的固定費用）。除非信用卡回饋足以抵銷手續費，否則通常不划算。</li>
          <li><strong>郵寄支票</strong> — 寄出抬頭為「United States Treasury」的支票，並附上 Form 1040-ES 繳款單（payment voucher）。最慢，也最不建議 — 無法立即確認。</li>
        </ol>

        <div className="callout callout-tip">
          <div className="callout-title">💡 給自雇人士最簡單的做法</div>
          <p>
            另外開一個儲蓄帳戶，命名為「稅款準備金」（Tax Reserve）。每次收到款項，就立刻把固定比例轉進這個帳戶 — 例如 25–30%，這只是預算上的經驗法則，不是 IRS 規定；請依你自己估算的稅額調整。到了季度繳款的時候，錢已經準備好了 — 不必緊張，也不必東湊西湊。從這個帳戶繳款，等到 4 月報完稅後，年底剩下的錢就是額外的收穫。
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

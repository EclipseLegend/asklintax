import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/tax-credit-vs-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'tax-credit-vs-deduction',
  sourceHash:      '4eb3059a3a89',
  id:            '08',
  title:         '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
  titleEn:       'Tax credit vs. tax deduction: what\'s the difference?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 1040 與 1040-SR 填寫說明（2025），稅率表（tax rate schedules）', url: 'https://www.irs.gov/instructions/i1040gi' },
    { label: 'IRS — 兒童抵稅額（Child Tax Credit）', url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit' },
    { label: 'IRS Publication 503 — 兒童與受扶養人照顧費用（Child and Dependent Care Expenses）', url: 'https://www.irs.gov/publications/p503' },
    { label: 'IRS — 退休儲蓄提撥抵稅額（Retirement Savings Contributions Credit, Saver’s Credit）', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-savers-credit' },
    { label: 'IRS Publication 970 — 教育稅務優惠（Tax Benefits for Education）', url: 'https://www.irs.gov/publications/p970' },
    { label: 'IRS Publication 596 — 勞動所得抵稅額（Earned Income Credit）', url: 'https://www.irs.gov/publications/p596' },
    { label: 'IRS — 外國稅額抵免：如何計算（Foreign tax credit: how to figure the credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit-how-to-figure-the-credit' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋標準定義與範例。具體的抵稅額與扣除額金額每年都會改變 — 報稅前請務必確認最新數字。',
  persona:       ['第一次報稅的人', '被稅務術語搞混的人', '正在學習美國稅制的新移民'],
  relatedJourney: ['第一次報稅', '學習基礎知識'],
  actionRequired: '讀完本指南後，找出哪些抵稅額與扣除額適用於你的情況。抵稅額會一元抵一元地減少你的稅額 — 在考慮扣除額之前，一定要先申請所有你符合資格的抵稅額。',
}

const FAQS = [
  {
    q: '抵稅額和扣除額，哪一個比較好？',
    a: '同樣金額的抵稅額（Tax Credit），幾乎都比扣除額（Tax Deduction）更有價值。$1,000 的抵稅額會讓你的稅額剛好減少 $1,000。$1,000 的扣除額會讓你的應稅所得減少 $1,000 — 省下的是 $1,000 × 你的稅率。如果你在 22% 級距，這 $1,000 的扣除額省下 $220，而抵稅額省下 $1,000。抵稅額勝出。',
  },
  {
    q: '抵稅額「可退還」是什麼意思？',
    a: '可退還（Refundable）的抵稅額可以把你的稅額減到零以下 — 也就是政府會把差額當作退稅付給你。例如，如果你欠稅 $500，但符合 $2,000 的可退還抵稅額，你會拿到 $1,500 的退稅。不可退還的抵稅額只能把稅額減到零 — 無法產生超過你已繳金額的退稅。',
  },
  {
    q: '我可以同時申請抵稅額與扣除額嗎？',
    a: '可以。抵稅額與扣除額彼此獨立 — 你可以在同一份稅表上，申請所有你符合資格的扣除額，以及所有你符合資格的抵稅額。它們在不同階段發揮作用：先用扣除額減少應稅所得，再計算稅額，最後用抵稅額減少算出來的稅額。',
  },
  {
    q: '什麼是標準扣除額？誰應該使用？',
    a: '標準扣除額（Standard Deduction）是每個人都可以申請、不需要記錄個別費用的固定扣除額。2025 稅務年度，單身申報為 $15,750，夫妻合併申報為 $31,500。大多數人 — 特別是沒有房貸、州稅不高，或沒有大額捐款的人 — 使用標準扣除額會比列舉扣除（Itemizing）划算。不確定時，讓報稅軟體兩種都算，選金額較大的一個。',
  },
  {
    q: '「線上」與「線下」扣除有什麼不同？',
    a: '線上扣除（Above-the-Line Deductions，正式名稱為「所得調整」，Adjustments to Income）是在計算調整後總收入（Adjusted Gross Income, AGI）之前，從總收入中減除。它們很有價值，因為較低的 AGI 可以讓你符合更多抵稅額與扣除額。例子：學生貸款利息、IRA 提撥、自雇者健康保險。線下扣除則在 AGI 之後 — 也就是標準扣除額或分項扣除額。兩者擇一，不能同時使用。',
  },
  {
    q: '我聽過兒童抵稅額，它是抵稅額還是扣除額？',
    a: '它是抵稅額 — 而且部分可退還。2025 稅務年度，每個未滿 17 歲的符合資格子女最高 $2,200。其中最多 $1,700 可以作為額外兒童抵稅額（ACTC）退還，也就是即使不欠稅的家庭，每個孩子也可以拿到最多 $1,700 的退稅。這是有子女的家庭最有價值的抵稅額之一。',
  },
  {
    q: '收入越高，扣除額的幫助越大嗎？',
    a: '是的。扣除額的價值取決於你的邊際稅率（Marginal Tax Rate）— 也就是你最後一塊錢收入適用的稅率。如果你在 32% 級距，$1,000 的扣除額省下 $320。如果你在 12% 級距，同樣的扣除額只省下 $120。相較之下，抵稅額不論你在哪個級距，價值都一樣 — $1,000 的抵稅額永遠省下 $1,000。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '了解抵稅額與扣除額之後，這份指南帶你走完完整的報稅流程 — 包括它們出現在稅表的哪裡。',
  },
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '可退還的抵稅額，是即使不需要申報也值得報稅的主要原因之一。',
  },
  {
    href:  '/library/individual/child-tax-credit',
    cat:   'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '對家庭來說最有價值的抵稅額之一 — 也是最常被漏申請的之一。',
  },
]

export default function TaxCreditVsDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '抵稅額與扣除額有什麼不同？ | AskLinTax 繁體中文',
      description: '終於搞懂抵稅額與扣除額的差別 — 用白話說明、實際數字範例，並比較最常見的抵稅額與扣除額。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>一句話版本</h2>
        <p>
          <strong>扣除額</strong>（Tax Deduction）減少的是要課稅的收入。
          <strong>抵稅額</strong>（Tax Credit）減少的是你要繳的稅。
        </p>
        <p>
          兩者都能幫你省錢 — 但它們在計算的不同階段發揮作用，而且同樣金額下，抵稅額幾乎都更有價值。
        </p>

        {/* Visual comparison */}
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '28px', margin: '28px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>扣除額（Tax Deduction）</div>
              <div style={{ background: 'var(--navy)', borderRadius: '10px', padding: '16px 20px', color: '#fff', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', marginBottom: '4px' }}>減少</div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>應稅所得</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>再以較低的所得計算稅額</div>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '400', color: 'var(--gold)', textAlign: 'center' }}>vs</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>抵稅額（Tax Credit）</div>
              <div style={{ background: 'var(--green)', borderRadius: '10px', padding: '16px 20px', color: '#fff', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', marginBottom: '4px' }}>減少</div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>應繳稅額</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>在算出稅額之後，一元抵一元</div>
            </div>
          </div>
        </div>

        <h2>實際的數字範例</h2>
        <p>
          假設你是 2025 年單身申報、應稅所得 <strong>$60,000</strong>，你最後那部分收入落在 <strong>22% 的稅率級距</strong>（美國的稅是累進的，只有落在那個級距的收入才適用 22%）。
          你有兩個選擇：$1,000 的扣除額，或 $1,000 的抵稅額。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--navy)', padding: '14px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,.6)', letterSpacing: '.06em', textTransform: 'uppercase' }}>$1,000 扣除額</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              {[
                ['原本的所得', '$60,000'],
                ['減去扣除額', '− $1,000'],
                ['應稅所得', '$59,000'],
                ['最後那部分收入的稅率', '22%'],
                ['應繳稅額（2025 年單身稅率）', '$7,894'],
                ['沒有扣除額時的稅額', '$8,114'],
                ['你省下的金額', '$220'],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none',
                  borderTop: i === 6 ? '2px solid var(--border)' : 'none',
                  marginTop: i === 6 ? '8px' : '0',
                }}>
                  <span style={{ fontSize: '14px', color: i === 6 ? 'var(--navy)' : 'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: i === 6 ? '700' : '500', color: i === 6 ? 'var(--navy)' : 'var(--text)' }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', background: 'rgba(27,45,79,.06)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--muted)' }}>
                $1,000 的扣除額幫你省下 <strong style={{ color: 'var(--navy)' }}>$220</strong> — 也就是你的稅率 × 扣除金額。
              </div>
            </div>
          </div>

          <div style={{ border: '1.5px solid var(--green)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--green)', padding: '14px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,.8)', letterSpacing: '.06em', textTransform: 'uppercase' }}>$1,000 抵稅額</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              {[
                ['原本的所得', '$60,000'],
                ['應稅所得', '$60,000'],
                ['最後那部分收入的稅率', '22%'],
                ['抵稅前的稅額（2025 年單身稅率）', '$8,114'],
                ['減去抵稅額', '− $1,000'],
                ['應繳稅額', '$7,114'],
                ['你省下的金額', '$1,000'],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none',
                  borderTop: i === 6 ? '2px solid rgba(22,163,74,.3)' : 'none',
                  marginTop: i === 6 ? '8px' : '0',
                }}>
                  <span style={{ fontSize: '14px', color: i === 6 ? 'var(--green)' : 'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: i === 6 ? '700' : '500', color: i === 6 ? 'var(--green)' : 'var(--text)' }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', background: 'rgba(22,163,74,.08)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'var(--muted)' }}>
                $1,000 的抵稅額幫你省下 <strong style={{ color: 'var(--green)' }}>$1,000</strong> — 全額，不論你的稅率是多少。
              </div>
            </div>
          </div>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 經驗法則</div>
          <p>抵稅額省下的是它的面額。扣除額省下的是它的面額 × 你的稅率。在 22% 級距，$1,000 的扣除額省下 $220，$1,000 的抵稅額省下 $1,000。<strong>永遠優先考慮抵稅額。</strong></p>
        </div>

        <h2>三種抵稅額</h2>
        <p>
          並不是所有抵稅額的運作方式都一樣。了解這三種類型，可以幫你知道報稅時會發生什麼：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', margin: '24px 0' }}>
          {[
            {
              type: '可退還（Refundable）',
              color: 'var(--green)',
              bgColor: 'var(--green-soft)',
              desc: '可以把你的稅額減到零以下。超過的部分會以現金退稅給你 — 即使你本來完全不欠稅。',
              examples: '勞動所得抵稅額（EITC）、額外兒童抵稅額',
              star: '⭐ 最有價值',
            },
            {
              type: '部分可退還（Partially Refundable）',
              color: '#D97706',
              bgColor: '#FFFBEB',
              desc: '同時有可退還與不可退還的部分。一部分可以產生退稅；其餘部分只能把稅額減到零。',
              examples: '兒童抵稅額（2025 年每個孩子 $1,700 可退還／$500 不可退還）',
              star: '✓ 仍然非常有價值',
            },
            {
              type: '不可退還（Non-Refundable）',
              color: 'var(--blue)',
              bgColor: 'var(--blue-soft)',
              desc: '可以把稅額減到零，但無法產生退稅。只有在你真的欠稅時才有用。',
              examples: '兒童與受扶養人照顧抵稅額、終身學習抵稅額、外國稅額抵免',
              star: '如果你欠稅就很有價值',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bgColor, border: `1.5px solid ${item.color}30`, borderRadius: '12px', padding: '20px 18px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.08em', textTransform: 'uppercase', color: item.color, marginBottom: '8px' }}>{item.star}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>{item.type}</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '12px' }}>{item.desc}</p>
              <div style={{ fontSize: '13px', color: item.color, fontWeight: '500' }}>例子：{item.examples}</div>
            </div>
          ))}
        </div>

        <h2>常見的扣除額 — 以及實際的價值</h2>
        <p>
          扣除額很有價值，但價值取決於你的稅率級距。以下快速整理華人家庭最常見的扣除額，以及在常見稅率下實際能省多少：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>扣除項目</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>誰符合資格</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>12% 時省下</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>22% 時省下</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['標準扣除額（單身 $15,750）', '每個人 — 不需要記錄', '$1,890', '$3,465'],
                ['學生貸款利息（最高 $2,500）', '支付學生貸款利息、收入在限額以下', '$300', '$550'],
                ['IRA 提撥（最高 $7,000）', '有勞動所得、未滿 50 歲、符合收入限制', '$840', '$1,540'],
                ['自雇者健康保險', '自雇、自己支付保費', '不一定', '不一定'],
                ['居家辦公室（自雇者）', '專門用於營業的工作空間', '不一定', '不一定'],
                ['營業費用（Schedule C）', '自雇 — 所有一般且必要的費用', '不一定', '不一定'],
              ].map(([ded, who, s12, s22], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{ded}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{s12}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', color: 'var(--navy)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{s22}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>常見的抵稅額 — 以及實際的價值</h2>
        <p>
          以下是在美國的華人家庭與小型企業老闆最常申請的抵稅額：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--green)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>抵稅額</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>最高金額</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>可退還嗎？</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>誰符合資格</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['勞動所得抵稅額（Earned Income Tax Credit, EITC）', '最高 $8,046', '✅ 是', '有勞動所得的中低收入工作者'],
                ['兒童抵稅額（Child Tax Credit）', '每個孩子最高 $2,200', '⚡ 部分（$1,700）', '未滿 17 歲、有 SSN 的符合資格子女'],
                ['兒童與受扶養人照顧抵稅額（Child & Dependent Care Credit）', '最高 $1,050（1 個孩子）', '❌ 否', '為了工作而支付托育費用'],
                ['美國機會抵稅額（American Opportunity Credit）', '最高 $2,500', '⚡ 部分（$1,000）', '大學前 4 年，有收入限制'],
                ['終身學習抵稅額（Lifetime Learning Credit）', '最高 $2,000', '❌ 否', '任何高中後教育，有收入限制'],
                ['退休儲蓄抵稅額（Saver\'s Credit）', '最高 $1,000（夫妻合併申報 $2,000）', '❌ 否', '中低收入、有提撥退休帳戶'],
                ['外國稅額抵免（Foreign Tax Credit）', '已繳的外國所得稅，以外國稅額抵免上限（Foreign Tax Credit Limit）為限', '❌ 否', '就海外所得向外國政府繳了稅'],
              ].map(([credit, max, refund, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{credit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--green)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{max}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{refund}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--green-soft)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>兩者如何一起運作：完整流程</h2>
        <p>
          抵稅額與扣除額並不互相競爭 — 它們依序發揮作用。以下是稅表上所有計算的順序：
        </p>

        <div style={{ margin: '24px 0' }}>
          {[
            { step: '1', label: '從總收入開始', desc: '所有來源的收入 — 薪資、接案、投資、租金收入。', color: 'var(--navy)' },
            { step: '2', label: '減去線上扣除', desc: 'IRA 提撥、學生貸款利息、自雇者健康保險等。這些會減少你的調整後總收入（AGI）。', color: 'var(--navy)' },
            { step: '3', label: '= 調整後總收入（AGI）', desc: '一個關鍵數字 — 許多抵稅額與扣除額都依 AGI 設有收入限制。', color: 'var(--gold)', isMilestone: true },
            { step: '4', label: '減去標準扣除額或分項扣除額', desc: '標準扣除額（2025 年單身 $15,750）或你實際的分項扣除費用 — 以較大者為準。', color: 'var(--navy)' },
            { step: '5', label: '= 應稅所得', desc: '扣除所有扣除額後的所得。你的稅就是依這個數字計算。', color: 'var(--gold)', isMilestone: true },
            { step: '6', label: '計算應稅所得的稅額', desc: '把稅率級距套用到你的應稅所得。', color: 'var(--navy)' },
            { step: '7', label: '減去抵稅額', desc: '先減不可退還的抵稅額（最多減到零），再減可退還的抵稅額（可以產生退稅）。', color: 'var(--green)' },
            { step: '8', label: '= 最終應繳稅額（或退稅）', desc: '如果是負數，你會拿到退稅。如果是正數，你要繳這個金額減去已預扣的稅款。', color: 'var(--green)', isMilestone: true },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 7 ? '0' : '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.isMilestone ? item.color : 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: item.isMilestone ? `2px solid ${item.color}` : '2px solid var(--border)' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: item.isMilestone ? '#fff' : 'var(--muted)' }}>{item.step}</span>
                </div>
                {i < 7 && <div style={{ width: '2px', flex: '1', background: 'var(--border)', minHeight: '24px', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: '20px', paddingTop: '6px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: item.isMilestone ? item.color : 'var(--navy)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.65' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ 如何運用這些知識</div>
          <p>了解差別之後，可以這樣運用：<strong>(1)</strong> 一定要申請所有你符合資格的抵稅額 — 它們比扣除額更有價值。<strong>(2)</strong> 在計算 AGI 之前，先使用線上扣除（IRA、學生貸款利息）— 它們能讓你符合其他優惠。<strong>(3)</strong> 用報稅軟體比較標準扣除額與分項扣除額 — 讓軟體兩種都算，選金額較大的一個。<strong>(4)</strong> 不要因為覺得自己不欠稅，就錯過可退還的抵稅額 — EITC 與兒童抵稅額可以帶來實際的現金退稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

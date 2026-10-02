import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/what-is-w2.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'what-is-w2',
  sourceHash:      'c54788466b9e',
  id:            '09',
  title:         '什麼是 W-2？該怎麼看？',
  titleEn:       'What is a W-2 and how do I read it?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — Form W-2 與 W-3 一般填寫說明（General Instructions for Forms W-2 and W-3）', url: 'https://www.irs.gov/instructions/iw2w3' },
    { label: 'IRS — Topic no. 154，Form W-2 與 Form 1099-R（資料錯誤或沒有收到時該怎麼辦）', url: 'https://www.irs.gov/taxtopics/tc154' },
    { label: 'IRS Publication 15（2025）— 雇主稅務指南（Employer\'s Tax Guide：社會安全稅薪資上限）', url: 'https://www.irs.gov/pub/irs-prior/p15--2025.pdf' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '各欄位的定義對所有雇主都一樣。Box 12 代碼是最複雜的部分 — 如果看到不認識的特殊代碼，請諮詢 CPA。',
  persona:       ['第一次上班的人', '在美國找到第一份工作的新移民', '從來沒看過 W-2 的人'],
  relatedJourney: ['第一次報稅', '剛到美國'],
  actionRequired: '收到 W-2 時（一般在 1 月 31 日前，或下一個工作日 — 2025 年 W-2 為 2026 年 2 月 2 日），確認你的姓名、SSN 與 Box 1 薪資和你最後一張薪資單相符。如果有任何錯誤，請立刻聯絡人資部門 — W-2 上的錯誤必須在報稅前更正。',
}

const FAQS = [
  {
    q: '我的 W-2 什麼時候會寄到？',
    a: '雇主一般必須在 1 月 31 日前寄出 W-2（遇到週末就順延到下一個工作日 — 2025 年 W-2 的 IRS 日期是 2026 年 2 月 2 日）。如果到那時還沒收到，請聯絡人資或薪資部門。許多雇主也會在 ADP 或 Paychex 這類薪資平台上提供電子版 W-2 — 如果沒有收到紙本，先去那裡看看。',
  },
  {
    q: '我有好幾份 W-2，全部都要申報嗎？',
    a: '要。你必須在稅表上申報每一位雇主支付的收入。在報稅軟體中分別輸入每一份 W-2 — 軟體會自動加總。有多份 W-2 不會讓你的稅表變複雜，只是要多輸入一些資料。',
  },
  {
    q: '我 W-2 上的 Box 1 比我實際賺的少，為什麼？',
    a: 'Box 1 顯示的是應稅薪資 — 可能比你的總薪酬低。常見原因：稅前 401(k) 提撥（Box 12，Code D）會減少 Box 1；透過雇主支付的稅前健康保險保費會減少 Box 1；彈性支出帳戶（Flexible Spending Account, FSA）提撥會減少 Box 1。這些福利會減少你的應稅所得，這是刻意設計的。',
  },
  {
    q: '如果我的 W-2 有錯，怎麼辦？',
    a: '立刻聯絡雇主的人資或薪資部門。他們必須開立更正後的 W-2（稱為 W-2c）。不要用錯誤的 W-2 報稅 — SSN、姓名或薪資的錯誤必須先更正。如果在報稅截止日前無法取得更正，請用 Form 4852 作為替代 W-2 申報。',
  },
  {
    q: '我的 W-2 顯示多個州的收入，這是什麼意思？',
    a: '如果你這一年在不只一個州工作，或你雇主的薪資辦公室與你工作的州不同，你的 W-2 上可能會有多個州的欄位（Box 15–17 可能重複出現）。你可能需要在多個州申報稅表。這種情況通常值得尋求專業協助。',
  },
  {
    q: 'Box 12 是什麼？為什麼有字母代碼？',
    a: 'Box 12 用 IRS 的字母代碼申報各種薪酬與福利。你最常看到的代碼：Code D = 稅前 401(k) 提撥；Code W = 雇主提撥到你的健康儲蓄帳戶（Health Savings Account, HSA）；Code DD = 雇主提供的健康保險成本（僅供參考，不用課稅）；Code AA = Roth 401(k) 提撥。你的報稅軟體知道每個代碼怎麼處理 — 只要照表格上的內容輸入。',
  },
  {
    q: '我持 H-1B 簽證，我的 W-2 有什麼不同嗎？',
    a: '不論簽證身分，W-2 本身看起來都一樣。不過，在稅務上是居民外國人的 H-1B 持有人，和美國公民一樣申報 Form 1040。如果你是非居民外國人（第一年剛抵達的 H-1B），則改用 Form 1040-NR。不論哪一種，你輸入的 W-2 資料都一樣。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '受雇還是自雇？你收到的表格決定了你的課稅方式，以及你可以扣除什麼。',
  },
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '看懂 W-2 之後，這份指南帶你一步步用它申報稅表。',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '了解抵稅額與扣除額，可以幫你知道 W-2 基本數字以外還要注意什麼。',
  },
]

// Display labels for the importance keys used for styling below
const IMPORTANCE_LABELS = {
  'Critical': '非常重要',
  'Important': '重要',
  'Standard': '一般',
  'If applicable': '如適用',
  'Check it': '要確認',
  'Informational': '參考資訊',
  'For state return': '州稅表用',
}

// W-2 Box definitions
const W2_BOXES = [
  { box: '1',    label: '薪資、小費與其他報酬（Wages, tips, other compensation）',          color: 'var(--navy)',  highlight: true,  desc: '你這一年的應稅薪資總額。這是要列入稅表的受雇收入。注意：如果你有稅前提撥（401k、健康保險、FSA），這個金額可能比你的總薪資「少」。', importance: 'Critical' },
  { box: '2',    label: '已預扣的聯邦所得稅（Federal income tax withheld）',              color: '#DC2626',      highlight: true,  desc: '雇主在這一年中代你繳給 IRS 的聯邦所得稅總額。如果這個數字比你實際的應納稅額大，差額就會退還給你。這就是大多數人能拿到退稅的原因。', importance: 'Critical' },
  { box: '3',    label: '社會安全稅薪資（Social Security wages）',                    color: 'var(--muted)', highlight: false, desc: '要繳社會安全稅的薪資。通常與 Box 1 相同，但如果你有某些扣除項目，可能會不同。社會安全稅是這個金額的 6.2%（Box 4）。', importance: 'Important' },
  { box: '4',    label: '已預扣的社會安全稅（Social Security tax withheld）',             color: 'var(--muted)', highlight: false, desc: 'Box 3 的 6.2%。如果 Box 3 是 $0，這裡也應該是 $0。2025 年上限：$10,918（$176,100 薪資上限的 6.2%）。如果你有多位雇主、合計超過上限，超過的部分可能可以退還。', importance: 'Important' },
  { box: '5',    label: '聯邦醫療保險稅薪資與小費（Medicare wages and tips）',                  color: 'var(--muted)', highlight: false, desc: '要繳聯邦醫療保險稅的薪資。通常與 Box 3 相同。和社會安全稅不同，聯邦醫療保險稅沒有薪資上限。', importance: 'Standard' },
  { box: '6',    label: '已預扣的聯邦醫療保險稅（Medicare tax withheld）',                    color: 'var(--muted)', highlight: false, desc: 'Box 5 的 1.45%。高收入者（單身超過 $200,000／夫妻合併申報超過 $250,000）還要繳 0.9% 的額外聯邦醫療保險稅（Additional Medicare Tax）。', importance: 'Standard' },
  { box: '10',   label: '受扶養人照顧福利（Dependent care benefits）',                  color: 'var(--muted)', highlight: false, desc: '如果雇主提供受扶養人照顧福利（例如受扶養人照顧 FSA），金額會顯示在這裡。前 $5,000 一般免稅。', importance: 'If applicable' },
  { box: '12',   label: '代碼（見下方 Box 12 說明）',           color: '#7C3AED',      highlight: true,  desc: '以字母代碼申報的各種薪酬與福利。最常見：Code D（401k 提撥）、Code W（雇主的 HSA 提撥）、Code DD（健康保險成本）。請見下方的 Box 12 說明。', importance: 'Important' },
  { box: '13',   label: '勾選欄（法定員工、退休計畫、第三方病假給付）', color: 'var(--muted)', highlight: false, desc: '「退休計畫」（Retirement plan）勾選欄很重要 — 如果有勾選，依你的收入，可能會影響你扣除傳統 IRA 提撥的能力。', importance: 'Check it' },
  { box: '14',   label: '其他（Other）',                                    color: 'var(--muted)', highlight: false, desc: '雇主申報、不屬於其他欄位的項目。常見內容：州失能保險（SDI）、工會會費、教育補助。多數情況下僅供參考。', importance: 'Informational' },
  { box: '15–17', label: '州稅資訊',                   color: 'var(--green)', highlight: false, desc: '州雇主編號（15）、州薪資（16）與已預扣的州所得稅（17）。用於申報你的州稅表。如果你在多個州工作，這些欄位可能重複出現。', importance: 'For state return' },
]

const BOX12_CODES = [
  { code: 'D',  desc: '稅前 401(k) 提撥', taxable: '不用課稅（減少 Box 1）', note: '你最常看到的代碼' },
  { code: 'E',  desc: '403(b) 提撥（適用教師、非營利組織）', taxable: '不用課稅（減少 Box 1）', note: '類似 401(k)，但適用不同類型的雇主' },
  { code: 'W',  desc: '雇主提撥到你的 HSA', taxable: '不用課稅', note: '填入 Form 8889' },
  { code: 'DD', desc: '雇主提供的健康保險成本', taxable: '不用課稅 — 僅供參考', note: '這個數字不需要做任何處理' },
  { code: 'AA', desc: 'Roth 401(k) 提撥', taxable: '已課稅（「不會」減少 Box 1）', note: '稅後的退休提撥' },
  { code: 'C',  desc: '超過 $50,000 的團體定期壽險應稅成本', taxable: '要課稅（已包含在 Box 1）', note: '參考資訊' },
  { code: 'V',  desc: '執行股票選擇權的所得', taxable: '已包含在 Box 1', note: '科技公司常見' },
]

export default function WhatIsW2ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq]       = useState({})
  const [activeBox, setActiveBox]   = useState(null)
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '什麼是 W-2？該怎麼看？ | AskLinTax 繁體中文',
      description: '用白話看懂你的 W-2 表格 — 每一欄代表什麼、為什麼 Box 1 可能和實際薪資不同、Box 12 代碼的意思，以及看起來有錯時該怎麼辦。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是 W-2？</h2>
        <p>
          W-2 是雇主每年 1 月寄給你的表格，申報你前一年賺了多少，以及從你的薪水中預扣了多少稅。對大多數受雇者來說，這是申報美國稅表最重要的文件。
        </p>
        <p>
          雇主會把副本同時寄給你<em>和</em> IRS — 所以在你報稅之前，IRS 就已經知道你賺了多少。如果你申報的數字和 W-2 上不同，IRS 會發現。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 收到 W-2 時，先做這三件事</div>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li><strong>確認你的姓名與 SSN</strong> — 即使是小錯誤，也可能延誤你的退稅或引來 IRS 通知</li>
            <li><strong>把 Box 1 和你最後一張薪資單比對</strong> — 兩者可能不同（原因見下方），但你應該了解為什麼</li>
            <li><strong>確認 Box 2 — 已預扣的聯邦稅</strong> — 這是你已經繳的稅；如果超過你的應納稅額，差額會退還給你</li>
          </ul>
        </div>

        <h2>W-2 逐欄說明</h2>
        <p>
          W-2 有很多欄位，但大多數人只需要注意其中幾個。以下說明每一欄的意思 — 點選任何一欄可以看到更多細節。
        </p>

        {/* W-2 visual diagram */}
        <div style={{ margin: '28px 0' }}>
          <div style={{ background: 'var(--navy)', borderRadius: '12px 12px 0 0', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form W-2</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Wage and Tax Statement（薪資與稅務明細）</div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)' }}>{TAX_CONFIG.currentTaxYear} 稅務年度</div>
          </div>

          <div style={{ border: '1.5px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
            {W2_BOXES.map((item, i) => (
              <div
                key={item.box}
                onClick={() => setActiveBox(activeBox === i ? null : i)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0',
                  borderBottom: i < W2_BOXES.length - 1 ? '1px solid var(--border-l)' : 'none',
                  cursor: 'pointer',
                  transition: 'background .15s',
                  background: activeBox === i ? 'var(--gold-pale)' : i % 2 === 0 ? 'var(--white)' : 'var(--cream)',
                }}
              >
                <div style={{
                  minWidth: '64px', padding: '14px 12px', textAlign: 'center',
                  borderRight: '1px solid var(--border-l)',
                  background: item.highlight ? item.color + '12' : 'transparent',
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', marginBottom: '2px' }}>Box</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: item.highlight ? item.color : 'var(--muted)', fontFamily: 'monospace' }}>{item.box}</div>
                </div>
                <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: item.highlight ? '600' : '400', color: item.highlight ? 'var(--navy)' : 'var(--mid)' }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '600', padding: '2px 9px', borderRadius: '100px',
                      background: item.importance === 'Critical' ? 'var(--red-soft)' :
                                  item.importance === 'Important' ? 'rgba(27,45,79,.08)' :
                                  item.importance === 'Check it' ? 'var(--gold-pale)' : 'var(--slate)',
                      color: item.importance === 'Critical' ? 'var(--red)' :
                             item.importance === 'Important' ? 'var(--navy)' :
                             item.importance === 'Check it' ? '#7a5515' : 'var(--muted)',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {IMPORTANCE_LABELS[item.importance] || item.importance}
                    </span>
                  </div>
                  {activeBox === i && (
                    <div style={{ marginTop: '10px', fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72', borderTop: '1px solid var(--border-l)', paddingTop: '10px' }}>
                      {item.desc}
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px 14px', color: 'var(--light)', fontSize: '16px', flexShrink: 0 }}>
                  {activeBox === i ? '−' : '+'}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
            點選任何一列，查看詳細說明。
          </p>
        </div>

        <h2>為什麼 Box 1 可能比你的實際薪資少</h2>
        <p>
          許多第一次看 W-2 的人都會被這點搞混。Box 1 顯示的是你的<em>應稅</em>薪資 — 不是你的總薪酬。幾種常見的福利會在計算前減少 Box 1：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>福利</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>會減少 Box 1 嗎？</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>出現在哪裡</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['稅前 401(k) 提撥', '✅ 會', 'Box 12，Code D'],
                ['稅前健康保險保費', '✅ 會', 'W-2 上不會另外列出'],
                ['健康 FSA 提撥', '✅ 會', 'W-2 上不會另外列出'],
                ['受扶養人照顧 FSA', '✅ 會', 'Box 10'],
                ['通勤福利（稅前大眾運輸／停車）', '✅ 會', 'Box 14（有時候）'],
                ['Roth 401(k) 提撥', '❌ 不會 — 已經課稅', 'Box 12，Code AA'],
                ['稅後健康保險保費', '❌ 不會', '不在 W-2 上'],
              ].map(([benefit, reduces, where], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{benefit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{reduces}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 例子：為什麼你的 W-2 可能比薪資少</div>
          <p>
            你年薪 $80,000。你提撥 $10,000 到 401(k)，並支付 $3,000 的稅前健康保險保費。
            你 W-2 上的 Box 1 會顯示 <strong>$67,000</strong> — 而不是 $80,000。這是正確的。你只就 $67,000 繳稅，這正是稅前福利的用意。
          </p>
        </div>

        <h2>Box 12 代碼：最常見的代碼說明</h2>
        <p>
          Box 12 最多可以有四筆，每一筆都有一個字母代碼。大多數人只會看到一兩筆。以下是最常見的代碼：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: '#7C3AED', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', width: '70px' }}>代碼</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>代表什麼</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>要課稅嗎？</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>說明</th>
              </tr>
            </thead>
            <tbody>
              {BOX12_CODES.map(({ code, desc, taxable, note }, i) => (
                <tr key={code}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '700', fontFamily: 'monospace', fontSize: '16px', color: '#7C3AED', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{code}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{desc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{taxable}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', fontSize: '13.5px', background: i % 2 === 1 ? '#F5F3FF' : 'white' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 不用被 Box 12 嚇到</div>
          <p>如果你使用報稅軟體，只要照表格上的代碼與金額輸入。軟體知道每個代碼怎麼處理。你不需要記住每個代碼的意思 — 只要正確輸入就好。</p>
        </div>

        <h2>看起來有錯時該怎麼辦</h2>
        <ul>
          <li><strong>姓名或 SSN 錯誤</strong> — 立刻聯絡人資。這必須在報稅前更正。錯誤的 SSN 可能讓你的稅表無法處理。</li>
          <li><strong>Box 1 看起來太高</strong> — 確認稅前福利是否已正確排除。和你最後一張薪資單比對。如果差異無法解釋，請聯絡薪資部門。</li>
          <li><strong>Box 2 是零或非常低</strong> — 你的 Form W-4 可能沒有設定成足以應付你情況的預扣金額。這不一定是錯誤，但可能代表你報稅時要補稅，而不是拿到退稅。</li>
          <li><strong>沒有收到 W-2</strong> — 先聯絡你的雇主。如果到 2 月底還是沒有收到，請撥打 IRS 電話 1-800-829-1040 — IRS 可以代你聯絡雇主。如果還是無法及時收到，可以用 Form 4852（替代 W-2）申報，依你的薪資單估算薪資與預扣金額。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

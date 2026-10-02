import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/w2-vs-1099.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'w2-vs-1099',
  sourceHash:      '1541604abc69',
  id:            '10',
  title:         'W-2 與 1099：有什麼差別？為什麼重要？',
  titleEn:       'W-2 vs 1099: what\'s the difference and why it matters',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 獨立承包商（自雇）還是員工？（Independent contractor (self-employed) or employee?）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee' },
    { label: 'IRS — 自雇稅（Self-employment tax：社會安全稅與聯邦醫療保險稅）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
    { label: 'IRS Publication 334 — 小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Form 1099-MISC 與 1099-NEC 填寫說明', url: 'https://www.irs.gov/instructions/i1099mec' },
    { label: 'IRS — 了解你的 Form 1099-K（Understanding your Form 1099-K）', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
    { label: 'IRS — 標準里程費率（Standard mileage rates）', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS Publication 463 — 差旅、贈禮與汽車費用（Travel, Gift, and Car Expenses）', url: 'https://www.irs.gov/publications/p463' },
    { label: 'IRS — Form 1040-ES（個人預估稅，2026 年版）', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' },
    { label: 'IRS — 數位資產（Digital assets：Form 1099-DA 申報）', url: 'https://www.irs.gov/filing/digital-assets' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋員工與獨立承包商分類的一般原則。工作者分類的爭議很複雜 — 如果你的分類不明確或受到質疑，請諮詢 CPA 或律師。',
  persona:       ['有接案副業收入的員工', '剛開始接案的自由工作者或承包商', '第一次收到 1099 的人', '零工經濟工作者'],
  relatedJourney: ['第一次報稅', '創業或經營小型企業'],
  actionRequired: '找出每一個收入來源，以及每一個來源你收到（或應該收到）的表格。如果你同時有 W-2 與 1099 收入，兩者都要申報 — 而你的 1099 收入還需要額外計算自雇稅。',
}

const FAQS = [
  {
    q: '我做了一些接案工作，但沒有收到 1099。還需要申報這筆收入嗎？',
    a: '需要。不論是否收到 1099，你都必須申報所有收入。客戶只有在付給你 $600 以上時才需要寄 1099-NEC，但你申報收入的義務沒有最低金額。如果你從一個接案專案賺了 $200、沒有收到 1099，你仍然要在 Schedule C 上申報這 $200。',
  },
  {
    q: '什麼是自雇稅？為什麼 1099 工作者要繳比較多？',
    a: '自雇稅（Self-Employment Tax）是 15.3% — 社會安全稅（12.4%，有年度收入上限）加上聯邦醫療保險稅（2.9%）— 一般適用於你自雇淨利的 92.35%。員工只繳其中一半（7.65%），因為雇主負擔另一半。身為 1099 工作者，你同時是員工也是雇主，所以要繳全部 15.3%。不過，你可以在稅表上把一半的自雇稅列為線上扣除（Above-the-Line Deduction），這會減少你的所得稅（但不會減少自雇稅本身）。',
  },
  {
    q: '收到 1099，可以扣除營業費用嗎？',
    a: '可以 — 這是 1099 收入的一大優勢。你在 Schedule C 上申報收入與費用。任何一般且必要的營業費用都可以扣除：居家辦公室、設備、軟體、專業費用、行銷成本、商務差旅等。你的自雇應稅所得是淨利（營收減費用），而不是總營收。',
  },
  {
    q: '公司說我是承包商，卻把我當員工對待。這樣合法嗎？',
    a: '這叫做工作者分類錯誤（Worker Misclassification），是一個嚴重的問題。IRS 與美國勞工部用特定的測試判斷工作者的身分 — 不只是看公司怎麼稱呼你。如果你有固定工時、使用公司設備、只為一家公司工作，而且被指示如何工作，不論合約怎麼寫，你在法律上可能是員工。分類錯誤會讓你多繳稅並失去福利。如果你懷疑被錯誤分類，可以申報 Form SS-8，請 IRS 判定你的身分。',
  },
  {
    q: '我有工作的 W-2，也有接案的 1099，要怎麼處理？',
    a: '兩者在同一份稅表上申報。你的 W-2 收入照常列在 Form 1040 上。你的 1099／接案收入列在 Schedule C 上，同時扣除營業費用得出淨利。這筆淨利會加到你 Form 1040 的收入中。你也要填寫 Schedule SE，計算淨利的自雇稅。報稅軟體會自動處理 — 你只要依提示輸入每一份表格。',
  },
  {
    q: '有 1099 收入，需要按季繳納預估稅嗎？',
    a: '大概需要。如果你預期自雇收入要繳的聯邦稅達到 $1,000 以上，一般就必須按季繳納預估稅。和每份薪水都會預扣稅款的員工不同，1099 工作者必須一年四次主動繳稅。沒有繳納會產生少繳罰款。2026 年預估稅的到期日是 2026 年 4 月 15 日、6 月 15 日、9 月 15 日，以及 2027 年 1 月 15 日。',
  },
  {
    q: '1099 表格有哪些種類？',
    a: '種類很多，最常見的有：1099-NEC（接案與承包商收入，取代過去用於這類收入的 1099-MISC）；1099-MISC（租金、獎金、法律和解金與其他雜項收入）；1099-INT（銀行利息）；1099-DIV（股利）；1099-B（透過經紀商出售股票與其他證券）；1099-DA（透過經紀商出售數位資產，適用 2025 年 1 月 1 日以後的出售）；1099-K（支付平台收入 — Venmo、PayPal、Stripe — 支付 App 一般在超過 $20,000 且 200 筆交易時開立；信用卡付款不限金額）；1099-R（退休帳戶提領）。每一種 1099 在稅表上的申報方式都不同。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/what-is-w2',
    cat:   'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '逐欄說明如何看懂 W-2 — 所有員工都會從雇主收到的表格。',
  },
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '1099 工作者必須按季繳稅。這裡說明如何計算應繳金額並避免罰款。',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  '如果你持續有 1099 收入，成立 LLC 可能是合理的選擇。這裡說明如何判斷。',
  },
]

export default function W2vs1099ZhTwPage({ translations }) {
  const { t }    = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'W-2 與 1099：有什麼差別？為什麼重要？ | AskLinTax 繁體中文',
      description: '了解 W-2（員工）與 1099（承包商）的差別 — 包括各自怎麼課稅、可以扣除什麼，以及兩者都有時該怎麼辦。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>一句話說明核心差別</h2>
        <p>
          <strong>W-2</strong> 代表你是員工 — 雇主從你的薪水中預扣稅款，並負擔一半的社會安全稅與聯邦醫療保險稅。
          <strong>1099</strong> 代表你是獨立承包商或自雇人士 — 你要自己負責繳納所有稅款，包括全部 15.3% 的自雇稅。
        </p>

        {/* Side-by-side visual */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          {/* W-2 card */}
          <div style={{ border: '2px solid var(--navy)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--navy)', padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form W-2</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>員工</div>
            </div>
            <div style={{ padding: '18px 20px', background: 'var(--white)' }}>
              {[
                ['工作類型', '傳統員工'],
                ['稅款預扣', '雇主自動預扣'],
                ['社會安全稅與聯邦醫療保險稅', '你繳 7.65%；雇主繳 7.65%'],
                ['季度繳款', '不需要（雇主處理）'],
                ['營業扣除', '非常有限'],
                ['福利', '通常符合資格（健保、401k、帶薪休假）'],
                ['穩定性', '通常較高'],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13.5px', color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--navy)', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 1099 card */}
          <div style={{ border: '2px solid var(--gold)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--gold)', padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.7)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Form 1099-NEC</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>獨立承包商</div>
            </div>
            <div style={{ padding: '18px 20px', background: 'var(--white)' }}>
              {[
                ['工作類型', '自雇／承包商'],
                ['稅款預扣', '沒有 — 你自己繳'],
                ['社會安全稅與聯邦醫療保險稅', '你繳全部 15.3%'],
                ['季度繳款', '預期欠稅 $1,000 以上時一般需要'],
                ['營業扣除', '範圍很廣（Schedule C）'],
                ['福利', '客戶不提供 — 自己負擔'],
                ['穩定性', '不固定'],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13.5px', color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#7a5515', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2>用實際數字看稅的差別</h2>
        <p>
          W-2 與 1099 收入最大的實際差別在於自雇稅。換算成金額是這樣：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>情境</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>W-2 員工</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>1099 承包商</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['總收入', '$80,000', '$80,000'],
                ['可扣除的營業費用', '非常少', '可以（減少應稅所得）'],
                ['淨收入（假設承包商有 $5K 費用）', '$80,000', '$75,000'],
                ['社會安全稅與聯邦醫療保險稅（FICA）', '$6,120（員工負擔 7.65%）', '$10,597（淨利 92.35% 的 15.3%）'],
                ['一半自雇稅的扣除', '不適用', '−$5,299'],
                ['聯邦所得稅（2025 年單身稅率、標準扣除額）', '~$9,049', '~$6,783'],
                ['聯邦稅負合計（估算）', '~$15,169', '~$17,380'],
                ['實拿金額（估算，未計州稅）', '~$64,831', '~$57,620'],
              ].map(([label, emp, con], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 7 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{label}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', background: i % 2 === 1 ? 'var(--cream)' : 'white', color: 'var(--navy)', fontWeight: i === 7 ? '600' : '400' }}>{emp}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', textAlign: 'center', background: i % 2 === 1 ? 'var(--gold-pale)' : 'var(--gold-pale)', color: '#7a5515', fontWeight: i === 7 ? '600' : '400' }}>{con}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '-8px' }}>
          僅為估算。假設為 2025 年單身申報、使用 $15,750 標準扣除額，沒有其他收入、抵稅額或扣除額。承包商欄位沒有計入合格營業所得（Qualified Business Income, QBI）扣除，這項扣除可能降低承包商的所得稅。實際稅額取決於扣除額、抵稅額、報稅身分與州稅。具體情況請諮詢 CPA。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 1099 的報稅驚嚇 — 以及如何準備</div>
          <p>許多從員工轉為承包商的人，到了報稅時才被額外的自雇稅嚇到。一個實用的預算做法 — 不是 IRS 規定 — 是每收到一筆 1099 款項，就立刻把固定比例存起來準備繳稅，例如 <strong>25–30%</strong>。適當的比例取決於你的收入與扣除額；這筆錢需要同時涵蓋所得稅與自雇稅。把這筆錢當作已經花掉，可以避免報稅時才發現欠了好幾千元的痛苦驚嚇。</p>
        </div>

        <h2>身為 1099 工作者可以扣除什麼</h2>
        <p>
          1099 收入的一大優勢，是可以在 Schedule C 上扣除營業費用。這些扣除會減少你的淨利 — 也就是同時要繳所得稅與自雇稅的金額。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '24px 0' }}>
          {[
            { category: '居家辦公室', items: ['專用工作空間（面積法）', '水電費（按比例）', '網路（營業部分）', '房租或房貸利息（按比例）'], color: 'var(--blue)' },
            { category: '設備與科技', items: ['電腦與周邊設備', '手機（營業使用比例）', '軟體訂閱', '辦公家具與用品'], color: 'var(--navy)' },
            { category: '專業費用', items: ['會計與報稅', '律師費（與營業相關）', '專業會員資格', '企業保險'], color: '#7C3AED' },
            { category: '行銷與成長', items: ['網站與主機', '廣告費用', '名片與宣傳品', '商務餐費（一般 50%；娛樂費用不能扣除）'], color: 'var(--gold)' },
            { category: '差旅與交通', items: ['營業里程（2025 年每英里 70 美分）', '商務機票與住宿', '停車費與過路費', '商務行程的叫車費用'], color: 'var(--green)' },
            { category: '教育與訓練', items: ['與你事業相關的課程', '書籍與專業進修', '研討會與講座', '產業刊物訂閱'], color: '#DC2626' },
          ].map((cat, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: `1.5px solid ${cat.color}30`, borderRadius: '12px', padding: '18px 16px', borderTop: `3px solid ${cat.color}` }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: cat.color, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '12px' }}>{cat.category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.items.map((item, j) => (
                  <li key={j} style={{ fontSize: '13.5px', color: 'var(--mid)', padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                    <span style={{ color: cat.color, flexShrink: 0, marginTop: '2px' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 每一項扣除都要保留紀錄</div>
          <p>IRS 可以查核你在 Schedule C 上的扣除。你申報的每一項營業費用，都要保留收據、發票與紀錄。特別是居家辦公室與車輛扣除，要保留顯示營業使用的紀錄。用雲端儲存收據（用手機拍照就可以）就足夠了 — 不需要紙本。</p>
        </div>

        <h2>1099 表格的種類</h2>
        <p>
          「1099」其實是一系列的表格。你收到的類型會告訴你它申報的是哪一種收入：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>表格</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>申報內容</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>門檻</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>在哪裡申報</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1099-NEC',  '接案／承包商收入',          '$600 以上',     'Schedule C'],
                ['1099-MISC', '租金、獎金、法律和解金',        '$600 以上',     'Schedule C 或其他收入'],
                ['1099-INT',  '銀行與投資利息',           '$10 以上',      'Schedule B／Form 1040'],
                ['1099-DIV',  '股票／基金股利',            '$10 以上',      'Schedule B／Form 1040'],
                ['1099-B',    '透過經紀商出售證券（股票、基金等）', '所有出售', 'Schedule D／Form 8949'],
                ['1099-DA',   '透過經紀商出售數位資產（2025 年 1 月 1 日以後的出售）', '一般為所有出售（部分穩定幣與 NFT 出售可能合併申報）', 'Schedule D／Form 8949'],
                ['1099-K',    '支付平台收入（Venmo、Stripe）', '超過 $20,000 且超過 200 筆交易（App）；不限金額（信用卡）',  'Schedule C（如果是營業）'],
                ['1099-R',    '退休帳戶提領',       '$10 以上',      'Form 1040'],
                ['1099-G',    '失業給付、州退稅', '全部', 'Form 1040'],
              ].map(([form, reports, threshold, where], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '700', fontFamily: 'monospace', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{form}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{reports}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{threshold}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>如果你同時有 W-2 與 1099 收入？</h2>
        <p>
          兩者都有的情況越來越常見 — 全職工作加接案、薪資加租金收入，或 W-2 加投資收入。好消息是：它們都在同一份稅表上申報。
        </p>
        <ul>
          <li><strong>W-2 收入</strong> → 直接從 W-2 表格填入你的稅表</li>
          <li><strong>1099-NEC／接案收入</strong> → 列在 Schedule C，同時扣除營業費用得出淨利</li>
          <li><strong>Schedule C 的淨利</strong> → 轉到 Form 1040，加入你的總收入</li>
          <li><strong>自雇稅</strong> → 依 Schedule C 的淨利，在 Schedule SE 上計算</li>
        </ul>
        <p>
          報稅軟體會自動處理這一切。你只要依提示輸入每一份表格。複雜的是計算 — 不是你要做的事。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 關於 1099 收入最重要的一件事</div>
          <p>1099 款項不會預扣任何稅。你收到的每一塊錢都是稅前金額。這就是為什麼 1099 工作者必須 (1) 每一筆款項都存一部分準備繳稅，(2) 如果預期欠稅 $1,000 以上，按季繳納預估稅，以及 (3) 整年記錄所有營業費用。立刻養成這些習慣 — 而不是等到報稅時 — 就是報稅順利與壓力重重的差別。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

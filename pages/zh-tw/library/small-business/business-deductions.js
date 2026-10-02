import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/business-deductions.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'business-deductions',
  sourceHash:      '4410fd2aff99',
  id:            '14',
  title:         '小型企業老闆可以扣除哪些費用？',
  titleEn:       'What can I deduct as a small business owner?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS Publication 334 — 小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS Publication 463 — 差旅、贈禮與汽車費用（Travel, Gift, and Car Expenses）', url: 'https://www.irs.gov/publications/p463' },
    { label: 'IRS Publication 15-B — 雇主附加福利稅務指南（Employer\'s Tax Guide to Fringe Benefits）', url: 'https://www.irs.gov/publications/p15b' },
    { label: 'IRS Publication 587 — 住家的營業使用（Business Use of Your Home）', url: 'https://www.irs.gov/publications/p587' },
    { label: 'IRS — 居家辦公室扣除額（Home office deduction）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/home-office-deduction' },
    { label: 'IRS — 標準里程費率（Standard mileage rates）', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS — 自雇稅（Self-employment tax：社會安全稅與聯邦醫療保險稅）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋申報 Schedule C 的獨資經營者與單一成員 LLC 最常見的扣除項目。S-Corp、合夥事業與 C-Corp 另有不同或額外的規則。具體情況請務必向 CPA 確認。',
  persona:       ['接案者', '自雇人士', 'LLC 負責人', '小型企業老闆', '有副業收入的人'],
  relatedJourney: ['創業或經營小型企業', '自雇第一年'],
  actionRequired: '現在就開始記錄所有營業費用 — 包括你不確定能不能扣的費用。事後再判斷某項費用是否符合資格，比重建從來沒保留的紀錄容易得多。使用專用的企業銀行帳戶與信用卡，讓記錄自動完成。',
}

const FAQS = [
  {
    q: '什麼是「一般且必要」標準？',
    a: '每一項營業扣除都必須符合 IRS「一般且必要」（Ordinary and Necessary）的標準。「一般」是指這項費用在你的行業中常見且被接受 — 和你類似的其他企業也會有這項支出。「必要」是指這項費用對你的事業有幫助且適當 — 不是指絕對必需。平面設計師購買 Adobe Creative Cloud 是一般且必要的。同一位設計師買一艘船就不是，即使偶爾在船上和客戶見面。',
  },
  {
    q: '一部分私人用途、一部分營業用途的費用，可以扣除嗎？',
    a: '可以，但只能扣除營業的部分。你必須依實際使用情況分攤。例如，如果你的手機 60% 用於營業、40% 私人使用，就可以扣除手機費的 60%。車輛方面，你要記錄實際的營業里程並套用 IRS 標準里程費率（或記錄實際的車輛費用，再乘以營業使用比例）。請保留能證明分攤方式的紀錄。',
  },
  {
    q: '我需要保留哪些紀錄？',
    a: '大多數費用，保留收據（電子檔也可以）並註記營業目的。餐費與娛樂費，還要記錄你和誰一起、討論了什麼。車輛使用，要保留里程紀錄，記下每趟的日期、目的地與營業目的。IRS 最多可以查核 3 年前的稅表（如果懷疑嚴重少報則為 6 年），所以紀錄至少保留 4 年。',
  },
  {
    q: '扣除與折舊有什麼不同？',
    a: '當年就用完的東西（用品、軟體訂閱、廣告），在支付的那一年扣除全部費用。使用年限超過一年的東西（電腦、車輛、家具），一般必須把扣除分攤到好幾年 — 這就是折舊（Depreciation）。不過，Section 179 與加速折舊（Bonus Depreciation）規則允許你在購買當年就扣除許多資產的全部成本，但有一定的上限。你的報稅軟體或 CPA 可以判斷哪些資產符合資格。',
  },
  {
    q: '剛開始創業的開辦費可以扣除嗎？',
    a: '可以，但有限制。IRS 允許你在營業第一年扣除最多 $5,000 的開辦費（Startup Costs）與 $5,000 的組織費（Organizational Costs）。超過 $5,000 的部分必須在 180 個月內攤銷（Amortize）。開辦費包括市場調查、開業前的廣告、員工訓練，以及開業前支付的專業費用。如果開辦費總額超過 $50,000，第一年 $5,000 的扣除額會開始遞減。',
  },
  {
    q: '商務餐費可以 100% 扣除嗎？',
    a: '不行。商務餐費一般只能扣除 50%。餐敘必須有明確的營業目的 — 你必須和客戶、員工或事業夥伴討論業務。私人餐費，即使是工作時吃的，也不能扣除。2025 年，雇主為了自身需要提供給員工的餐點（例如工作會議時在辦公室提供的餐點）可能可以扣除 50%；2025 年以後支付或發生的金額，雇主就不能再扣除。餐費的紀錄要求很嚴格：保留收據，並記錄誰在場、討論了什麼業務。',
  },
  {
    q: '成立 LLC 的費用可以扣除嗎？',
    a: '可以，作為組織費 — 第一年最多 $5,000（超過的部分在 180 個月內攤銷）。組織費包括州政府申請費、起草營運協議（Operating Agreement）的律師費，以及與設立相關的會計費。州政府申請費本身可以作為組織費扣除。加州每年 $800 的特許經營稅（Franchise Tax）也可以作為營業費用扣除。',
  },
]

const RELATED = [
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '你的扣除額會減少淨利，直接降低你每季要繳的預估稅。',
  },
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '1099 收入讓你可以使用 Schedule C 的扣除。了解自雇收入的完整稅務狀況。',
  },
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  'LLC 不會改變你可以扣除的項目，但會影響你的申報方式與需要保留的紀錄。',
  },
]

const DEDUCTION_CATEGORIES = [
  {
    id: 'office',
    icon: '🏠',
    title: '居家辦公室',
    color: 'var(--blue)',
    summary: '如果你有固定且專門用於營業的工作空間，可以扣除一部分住家費用。',
    items: [
      { name: '簡化法（Simplified Method）', detail: '專用辦公空間每平方英尺 $5，最多 300 平方英尺 = 每年最高 $1,500。計算簡單，沒有折舊回收（Depreciation Recapture）。' },
      { name: '一般法（Regular Method）', detail: '計算住家實際用作辦公室的比例（辦公室面積 ÷ 總面積），再扣除該比例的房租／房貸利息、水電費、保險與修繕費。比較費工，但扣除額可能比較高。' },
      { name: '主要條件', detail: '空間必須「固定」且「專門」用於營業。你臥室裡也拿來私人使用的書桌不符合資格。只用於工作的專用房間才符合。' },
    ],
    warning: '居家辦公室扣除可能引起查核注意。請保留這個空間的照片，以及它專門用於營業的證明。',
  },
  {
    id: 'vehicle',
    icon: '🚗',
    title: '車輛與交通',
    color: '#7C3AED',
    summary: '以 IRS 標準里程費率扣除營業行車，或記錄實際的車輛費用。',
    items: [
      { name: '標準里程費率（2025 年）', detail: '營業行車每英里 70 美分。把你的營業里程乘以 $0.70。每一趟營業行程都要記錄日期、目的地與目的。' },
      { name: '實際費用法', detail: '記錄所有車輛費用（油錢、保險、牌照、修理、折舊），再乘以營業使用比例。如果是營業使用比例高的昂貴車輛，扣除額可能比較高。' },
      { name: '哪些算營業行車', detail: '與客戶會面、前往第二個工作地點、處理營業事務、採購用品。從家裡通勤到你固定的辦公室「不算」。' },
    ],
    warning: '車輛第一年用於營業時，必須選擇標準里程法。之後每年可以在兩種方法之間轉換（有一些限制）。',
  },
  {
    id: 'equipment',
    icon: '💻',
    title: '設備與科技',
    color: 'var(--navy)',
    summary: '用於營業的電腦、手機、軟體與其他工具。',
    items: [
      { name: '電腦與周邊設備', detail: '如果 100% 用於營業，可以全額扣除。如果私人與營業混用，只扣除營業的比例。' },
      { name: '軟體訂閱', detail: '可以作為營業費用全額扣除（例如 Adobe Creative Cloud、QuickBooks、Zoom、Slack、GitHub）。在支付的那一年扣除。' },
      { name: '手機', detail: '扣除每月帳單中營業使用的比例。常見做法：估計一個比例（例如 60% 營業用途），並一致地套用。' },
      { name: 'Section 179／加速折舊', detail: '你可能可以在第一年就扣除設備的全部購買價格，而不必分好幾年折舊。適用於電腦、相機、辦公家具與許多其他資產。' },
    ],
  },
  {
    id: 'professional',
    icon: '📋',
    title: '專業服務',
    color: 'var(--green)',
    summary: '支付給協助你經營事業的專業人士的費用。',
    items: [
      { name: '會計與報稅', detail: 'CPA 費用、記帳費用與報稅軟體費用都可以全額扣除。' },
      { name: '律師費', detail: '與營業相關的律師費（合約審閱、LLC 成立、雇用事務）可以扣除。私人的律師費不行。' },
      { name: '企業顧問', detail: '為了營業目的支付給企業教練、顧問或諮詢人員的費用可以扣除。' },
      { name: '專業會員資格', detail: '同業公會會費、專業組織會員費與產業刊物訂閱費，一般可以扣除。' },
    ],
  },
  {
    id: 'marketing',
    icon: '📣',
    title: '行銷與廣告',
    color: 'var(--gold)',
    summary: '所有正當的推廣事業成本都可以全額扣除。',
    items: [
      { name: '數位廣告', detail: 'Google Ads、Facebook／Instagram 廣告、LinkedIn 廣告 — 100% 可以扣除。' },
      { name: '網站費用', detail: '網域註冊、網站主機、網站設計與維護都可以全額扣除。' },
      { name: '名片與印刷品', detail: '名片、宣傳冊、傳單 — 全額扣除。' },
      { name: '商務贈禮', detail: '每位受贈人每年最多 $25。每人超過 $25 的部分不能扣除。請記錄受贈人與贈禮的營業目的。' },
    ],
  },
  {
    id: 'meals',
    icon: '🍽',
    title: '餐費與娛樂',
    color: '#DC2626',
    summary: '商務餐費可以扣除 50%。娛樂費用一般不能扣除。',
    items: [
      { name: '商務餐費（扣除 50%）', detail: '與客戶、顧客或員工討論業務的餐敘。必須有明確的營業目的。保留收據，記下誰在場、討論了什麼。' },
      { name: '辦公室點心與餐點（2025 年扣除 50%）', detail: '雇主為了自身需要在辦公室提供給員工的餐點（例如工作會議時的午餐）。2025 年以後支付或發生的金額，不能再扣除。' },
      { name: '娛樂（一般不能扣除）', detail: '演唱會門票、運動賽事、高爾夫 — 依現行法律（2017 年後的《減稅與就業法》，Tax Cuts and Jobs Act），即使討論了業務，娛樂費用也不能再扣除。' },
      { name: '出差餐費', detail: '因營業出差過夜期間的餐費，可以扣除 50%。' },
    ],
    warning: '大多數餐費扣除都適用 50% 上限。娛樂已經不能扣除 — 常見的錯誤是把客戶晚餐加球賽門票當成一筆可以扣除的費用。',
  },
  {
    id: 'insurance',
    icon: '🛡',
    title: '保險與福利',
    color: '#0891B2',
    summary: '企業保險與自雇者健康保險有優惠的扣除規則。',
    items: [
      { name: '企業保險', detail: '一般責任險、專業責任險（E&O）、商業財產險 — 可以作為營業費用全額扣除。' },
      { name: '自雇者健康保險', detail: '如果你是自雇人士，而且沒有資格參加雇主提供的保險，可以把健康保險保費（你本人、配偶與受扶養人）100% 作為線上扣除（Above-the-Line Deduction）。這會降低調整後總收入（AGI），而不只是應稅所得。' },
      { name: '自雇者退休提撥', detail: 'SEP-IRA、SIMPLE IRA 或個人 401(k)（Solo 401(k)）的提撥可以扣除，但有年度上限。自雇的擁有人，SEP-IRA 提撥一般以自雇淨收入的 20% 為上限（25% 的上限適用於員工薪資），並受年度金額上限限制。' },
    ],
  },
  {
    id: 'education',
    icon: '📚',
    title: '教育與訓練',
    color: '#B45309',
    summary: '維持或提升你目前事業所需技能的教育費用可以扣除。',
    items: [
      { name: '課程與訓練', detail: '能提升你目前事業技能的線上課程、工作坊與證照可以扣除。為了取得新職業資格的教育費用則不行。' },
      { name: '書籍與訂閱', detail: '商業書籍、產業刊物、電子報與研究訂閱可以扣除。' },
      { name: '研討會與講座', detail: '商業研討會的報名費、交通與住宿可以扣除。行程必須以營業為主（可以加上私人行程的天數，但私人部分不能扣除）。' },
    ],
  },
]

export default function BusinessDeductionsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq,  setOpenFaq]  = useState({})
  const [openCat,  setOpenCat]  = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }
  function toggleCat(id) { setOpenCat(p => ({ ...p, [id]: !p[id] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '小型企業老闆可以扣除哪些費用？ | AskLinTax 繁體中文',
      description: 'Schedule C 小型企業扣除項目完整指南 — 居家辦公室、車輛、設備、餐費、保險等，並用白話說明「一般且必要」標準。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>營業扣除的黃金法則</h2>
        <p>
          你扣除的每一項營業費用，都必須通過一個測試：它對你的事業來說是否<strong>一般且必要</strong>？
        </p>
        <ul>
          <li><strong>一般</strong>（Ordinary）— 在你的行業中常見且被接受。攝影師買相機是一般的。攝影師買遊艇就不是。</li>
          <li><strong>必要</strong>（Necessary）— 對你的事業有幫助且適當。不需要是不可或缺的 — 只要相關且合理。</li>
        </ul>
        <p>
          如果兩個問題的答案都是「是」，很可能就可以扣除。不確定時，先保留收據，讓你的 CPA 判斷。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 現在就開始記錄 — 是否符合資格以後再判斷</div>
          <p>最大的扣除錯誤，不是申報了不該申報的東西 — 而是因為沒有保留紀錄，<em>漏掉</em>了可以申報的東西。記錄每一筆營業費用，保留每一張收據。你隨時可以之後再判斷某項費用是否符合資格，但你無法重建從來沒保留的紀錄。</p>
        </div>

        <h2>扣除額比你想的更重要</h2>
        <p>
          對自雇人士與 LLC 負責人來說，扣除額會減少你在 <strong>Schedule C 上的淨利</strong>。淨利同時要繳所得稅與自雇稅（15.3%）。所以你每扣除 $1,000，大約可以省下：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '24px 0' }}>
          {[
            { bracket: '12% 所得稅級距', saving: '~$261', note: '$1,000 × (12% + 15.3% × 92.35%)' },
            { bracket: '22% 所得稅級距', saving: '~$361', note: '$1,000 × (22% + 15.3% × 92.35%)' },
            { bracket: '24% 所得稅級距', saving: '~$381', note: '$1,000 × (24% + 15.3% × 92.35%)' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--green)', marginBottom: '6px' }}>{item.saving}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{item.bracket}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <p>
          因為扣除額會同時減少所得稅與自雇稅，對自雇人士的價值，高於只能使用標準扣除額的 W-2 員工。
        </p>

        <h2>主要的扣除類別</h2>
        <p>
          點選任何類別即可展開詳細內容：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '24px 0' }}>
          {DEDUCTION_CATEGORIES.map((cat) => {
            const isOpen = !!openCat[cat.id]
            return (
              <div key={cat.id} style={{ border: `1.5px solid ${isOpen ? cat.color : 'var(--border)'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border-color .2s' }}>
                {/* Header */}
                <button
                  onClick={() => toggleCat(cat.id)}
                  style={{ width: '100%', background: isOpen ? cat.color + '10' : 'var(--white)', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', transition: 'background .18s' }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '17px', fontWeight: '600', color: isOpen ? cat.color : 'var(--navy)' }}>{cat.title}</div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '2px', lineHeight: '1.5' }}>{cat.summary}</div>
                  </div>
                  <span style={{ fontSize: '22px', color: isOpen ? cat.color : 'var(--light)', flexShrink: 0, fontWeight: '300', lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${cat.color}20` }}>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{ padding: '14px 20px', borderBottom: ii < cat.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{item.name}</div>
                        <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.68' }}>{item.detail}</div>
                      </div>
                    ))}
                    {cat.warning && (
                      <div style={{ padding: '12px 20px', background: 'var(--red-soft)', borderTop: '1px solid rgba(220,38,38,.15)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, fontSize: '16px' }}>⚠️</span>
                        <div style={{ fontSize: '13.5px', color: '#7f1d1d', lineHeight: '1.65' }}>{cat.warning}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <h2>哪些不能扣除</h2>
        <p>
          知道哪些不能扣除，和知道哪些可以扣除一樣重要：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--red)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>不能扣除</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>原因</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['任何私人費用', '必須是事業一般且必要的費用 — 私人用途不符合資格'],
                ['從家裡通勤到你固定的辦公室', '通勤是私人行程，不是營業行程'],
                ['罰款與罰金', 'IRS 罰款、停車罰單與法律罰金都不能扣除'],
                ['衣服（必要的制服除外）', '可以在工作以外穿的衣服屬於私人物品，即使是為了商務會議而買'],
                ['自己一個人工作時的餐費', '一個人工作時吃的餐 — 除非是因營業出差離家過夜'],
                ['娛樂費用', '2017 年以後，娛樂（演唱會、運動賽事、高爾夫）不能再扣除'],
                ['混合用途費用的私人部分', '部分私人用途的費用，只能扣除營業的比例'],
                ['資本改良（多數情況）', '必須分年折舊，不能一次扣除 — 不過 Section 179 可能允許第一年全額扣除'],
              ].map(([what, why], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--red-soft)' : 'white' }}>{what}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--red-soft)' : 'white' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>紀錄保存的基本要求</h2>
        <p>
          你不需要複雜的系統。每一筆費用最基本需要：
        </p>
        <ul>
          <li><strong>收據</strong> — 金額、日期、商家。用手機拍照就可以。</li>
          <li><strong>營業目的</strong> — 一段簡短的說明，解釋為什麼這是營業費用。餐費要記下誰在場、討論了什麼。</li>
          <li><strong>車輛里程</strong> — 每一趟營業行程的日期、出發地、目的地與營業目的的紀錄。</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 最簡單的記帳方式</div>
          <p>
            所有營業費用都使用專用的企業銀行帳戶與企業信用卡。這樣每一筆消費都會自動留下交易紀錄。年底時匯出對帳單並分類交易 — 和從個人帳戶裡慢慢整理相比，只需要一小部分的時間。每次餐敘或不尋常的費用後，趁記憶猶新，在手機備忘錄裡簡單記一筆。
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

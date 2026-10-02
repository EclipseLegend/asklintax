/**
 * Traditional Chinese homepage content (/zh-tw/).
 * Translated from lib/content/home-en.js (English is the master). Tax figures must stay
 * identical to the English source. Full guides and /updates/ are English-only: links to them
 * keep the English URL and the copy says so. Only /zh-tw/ pages that exist are linked.
 */

const UPDATE_DATA = {
  federal: [
    { title: '2025 稅務年度標準扣除額調高', desc: '依 2025 年聯邦稅法，標準扣除額為：單身 $15,750、夫妻合併申報 $31,500、戶長 $23,625。', tags: [{ text: '聯邦', cls: 'tag-blue' }, { text: '2025 稅務年度', cls: 'tag-navy' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#standard-deduction' },
    { title: '1099-K 門檻恢復為 $20,000 及 200 筆交易', desc: '2025 年聯邦法律追溯恢復支付 App 與線上平台較高的申報門檻。信用卡付款沒有最低門檻；即使沒有收到 1099-K，收入仍需課稅。', tags: [{ text: '聯邦', cls: 'tag-blue' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#form-1099-k' },
    { title: 'IRS Free File（2025 年稅表）：AGI $89,000 以下', desc: '申報 2025 年稅表時，調整後總收入（AGI）在 $89,000 以下的納稅人，可透過 IRS Free File 免費使用引導式報稅軟體。', tags: [{ text: '聯邦', cls: 'tag-blue' }, { text: '2025 稅務年度', cls: 'tag-navy' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#direct-file' },
  ],
  california: [
    { title: 'CalEITC（2025 稅務年度）：最高 $3,756', desc: '加州勞動所得抵稅額（CalEITC）在 2025 稅務年度最高 $3,756，適用於年收入不超過 $32,900 的工作家庭與個人。', tags: [{ text: '加州', cls: 'tag-green' }, { text: '抵稅額', cls: 'tag-gold' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#caleitc' },
  ],
  irs: [
    { title: '檢查你的 ITIN 是否已過期', desc: 'ITIN 若連續 3 個稅務年度沒有用於聯邦稅表，會在第三年後的 12 月 31 日到期。用於報稅前請先更新。', tags: [{ text: 'IRS 通知', cls: 'tag-red' }, { text: '需採取行動', cls: 'tag-gold' }], date: '2026 年 10 月更新 · 英文指南', href: '/library/individual/itin/' },
  ],
  credits: [
    { title: '兒童抵稅額：2025 稅務年度每名子女 $2,200', desc: '2025 年聯邦稅法將兒童抵稅額提高至每名未滿 17 歲的符合資格子女 $2,200，其中最多 $1,700 可退還。申報人（或合併申報的配偶）與每名子女都需要具工作資格的 SSN。', tags: [{ text: '抵稅額', cls: 'tag-gold' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#child-tax-credit' },
    { title: '2025 稅務年度 EITC 最高 $8,046', desc: '勞動所得抵稅額（EITC）上限提高。許多中低收入家庭都符合資格，別錯過這筆錢。', tags: [{ text: '抵稅額', cls: 'tag-gold' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#eitc' },
  ],
  deadlines: [
    { title: '延期的 2025 年稅表：2026 年 10 月 15 日截止', desc: '如果你的 2025 年稅表已取得 6 個月自動延期，請在 2026 年 10 月 15 日前提交 Form 1040 或 1040-SR，並繳清應繳的稅款、利息與罰款。', tags: [{ text: '截止日期', cls: 'tag-red' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#calendar' },
    { title: 'FBAR 延期截止日：2026 年 10 月 15 日', desc: '2025 年的海外金融帳戶申報（FinCEN Form 114）自動延期至 2026 年 10 月 15 日。', tags: [{ text: '截止日期', cls: 'tag-red' }, { text: 'FBAR', cls: 'tag-navy' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#calendar' },
    { title: '2026 年最後一期預估稅：2027 年 1 月 15 日截止', desc: '自雇人士與企業老闆：2026 年第四期預估稅於 2027 年 1 月 15 日到期；或在 2027 年 2 月 1 日前申報 2026 年稅表並全額繳清。', tags: [{ text: '截止日期', cls: 'tag-red' }, { text: '預估稅', cls: 'tag-navy' }], date: '2026 年 10 月更新 · 詳細說明為英文', href: '/updates/#calendar' },
  ],
}

const GUIDE_CARDS = [
  { href: '/library/irs/irs-notice',                cat: 'irs',        topColor: 'gold',   tagCls: 'tag-gold',  tagLabel: 'IRS 與稅務問題',     title: '我收到 IRS 的信，該怎麼辦？',                  desc: '大多數 IRS 通知都是例行公事。教你看懂信件、找出下一步，不必驚慌。', read: '4 分鐘閱讀 · 英文指南', emotion: '😨 感到焦慮？' },
  { href: '/library/business-formation/llc-basics', cat: 'business',   topColor: 'navy',   tagCls: 'tag-navy',  tagLabel: '企業成立與公司架構',  title: '什麼是 LLC？我真的需要嗎？',                    desc: 'LLC 是小型企業稅務最常被搜尋的詞之一。用白話告訴你它的意思。', read: '5 分鐘閱讀 · 英文指南', emotion: '🤔 正在考慮？' },
  { href: '/library/individual/new-immigrant',      cat: 'individual', topColor: 'forest', tagCls: 'tag-green', tagLabel: '個人與家庭',          title: '剛來美國？你需要知道的報稅重點',                desc: '在美國的第一個稅務年度不必一頭霧水。一份完整、白話的指南。', read: '6 分鐘閱讀 · 英文指南', emotion: '📚 剛開始了解' },
  { href: '/library/rental/airbnb-tax-guide',       cat: 'rental',     topColor: 'blue',   tagCls: 'tag-blue',  tagLabel: '房地產與 Airbnb',     title: 'Airbnb 房東？這些是你需要申報的內容',           desc: '短租收入有自己的規則：哪些要算、哪些可以扣除，以及 14 天規則。', read: '5 分鐘閱讀 · 英文指南', emotion: '📋 整理中' },
  { href: '/library/business-formation/llc-vs-scorp', cat: 'business', topColor: 'navy',   tagCls: 'tag-navy',  tagLabel: '企業成立與公司架構',  title: 'LLC vs S-Corp：哪種公司架構適合你？',           desc: '小型企業老闆最重要、也最容易混淆的決定之一。清楚的比較。', read: '7 分鐘閱讀 · 英文指南', emotion: '🤔 比較選項' },
  { href: '/library/investment/fbar',               cat: 'individual', topColor: 'red',    tagCls: 'tag-red',   tagLabel: '投資與海外帳戶',      title: '在美國境外有帳戶？你可能需要申報 FBAR',          desc: '許多華人家庭不知道自己必須申報海外銀行帳戶。', read: '5 分鐘閱讀 · 英文指南', emotion: '⚠️ 確認是否適用' },
]

const START_CARDS = [
  { id: 'first-time', href: '/zh-tw/start/#first-time', icon: 'doc',   title: '我第一次在美國報稅',           desc: '從來沒有申報過美國稅表，不知道從哪裡開始、需要準備哪些文件。', links: [{ href: '/library/individual/first-time-filer', label: '→ 首次報稅完整指南（英文）' }, { href: '/library/individual/tax-residency', label: '→ 我是美國稅務居民嗎？（英文）' }] },
  { id: 'irs',        href: '/zh-tw/start/#irs',        icon: 'mail',  title: '我收到 IRS 的信',             desc: '收到 IRS 寄來的信，不確定是什麼意思、該怎麼處理。', links: [{ href: '/library/irs/irs-notice', label: '→ 收到 IRS 的信該怎麼辦（英文）' }, { href: '/library/irs/cp2000', label: '→ CP2000 通知說明（英文）' }] },
  { id: 'airbnb',     href: '/zh-tw/start/#airbnb',     icon: 'home',  title: '我有 Airbnb 或租金收入',       desc: '在 Airbnb 出租房屋或房間，想知道要申報什麼、哪些可以扣除。', links: [{ href: '/library/rental/airbnb-tax-guide', label: '→ Airbnb 報稅完整指南（英文）' }, { href: '/library/rental/14-day-rule', label: '→ 14 天規則說明（英文）' }] },
  { id: 'llc',        href: '/zh-tw/start/#llc',        icon: 'build', title: '我正在創業或經營小型企業',     desc: '自雇、接案，或正在考慮成立 LLC，不知道從哪裡開始？', links: [{ href: '/library/business-formation/llc-basics', label: '→ 什麼是 LLC？（英文）' }, { href: '/library/business-formation/llc-vs-scorp', label: '→ LLC vs S-Corp：哪個比較好？（英文）' }] },
  { id: 'crypto',     href: '/zh-tw/start/#crypto',     icon: 'chart', title: '我有加密貨幣或投資收入',       desc: '加密貨幣、股票或海外帳戶，不確定資本利得、1099-B 或 FBAR 的規定。', links: [{ href: '/library/investment/crypto-tax', label: '→ 加密貨幣稅務說明（英文）' }, { href: '/library/investment/fbar', label: '→ 我需要申報 FBAR 嗎？（英文）' }] },
  { id: 'immigrant',  href: '/zh-tw/start/#immigrant',  icon: 'globe', title: '我是新移民，或有跨境稅務問題', desc: '新移民、雙重身分，或在美國境外有收入或帳戶，你有特殊的申報義務。', links: [{ href: '/library/individual/new-immigrant', label: '→ 新移民報稅指南（英文）' }, { href: '/library/individual/dual-status', label: '→ 雙重身分報稅說明（英文）' }] },
]

// Mirrors the English roadmap; planned items stay hidden (no links to pages that don't exist).
const LEARN_CARDS = [
  { href: '/learn',     icon: '▶', iconBg: '#FFF0F0', iconColor: '#DC2626', title: 'YouTube 學習中心', desc: '用簡短清楚的影片說明最重要的稅務主題。', cta: '在 YouTube 觀看 →', planned: true },
  { href: '/checklist', icon: '☑', iconBg: 'var(--gold-pale)', iconColor: 'var(--gold)', title: '報稅文件清單', desc: '報稅季前就知道要準備哪些文件。', cta: '取得清單 →', planned: true },
  { href: '/glossary',  icon: '📖', iconBg: 'var(--blue-soft)', iconColor: 'var(--blue)', title: '稅務詞彙表', desc: '先用白話解釋，再提供專業定義。', cta: '瀏覽詞彙表 →', planned: true },
  { href: '/updates/#calendar', icon: '📅', iconBg: 'var(--green-soft)', iconColor: 'var(--green)', title: '美國稅務行事曆（英文）', desc: '個人、企業與季繳納稅人的重要截止日期。', cta: '查看稅務行事曆 →' },
]

const BENEFIT_CARDS = [
  { cat: 'family',    href: '/library/individual/child-tax-credit',          icon: 'people', title: '兒童抵稅額',               desc: '每名未滿 17 歲的符合資格子女最高 $2,200。許多移民家庭即使符合資格也沒有申請。', amount: '每名子女最高 $2,200',          cta: '查看是否符合資格（英文指南）→' },
  { cat: 'business',  href: '/library/small-business/business-deductions/', icon: 'house',  title: '居家辦公室扣除額',         desc: '如果你在家工作並有專用的工作空間，可以扣除部分房租或房貸。',                 amount: '最高扣除 $1,500（簡易計算法）', cta: '了解扣除方式（英文指南）→' },
  { cat: 'immigrant', href: '/library/individual/itin/',                    icon: 'card',   title: 'ITIN 持有人也能拿到退稅',   desc: '許多使用 ITIN 的新移民不知道，自己仍然可以獲得聯邦退稅與部分抵稅額。',     amount: '可能有退稅',                    cta: '了解 ITIN 報稅（英文指南）→' },
]

const HOME_ZH_TW = {
  meta: {
    title: 'AskLinTax 繁體中文 | 美國華人家庭與小型企業的稅務知識',
    description: 'AskLinTax 用白話說明美國稅務，協助華人家庭、小型企業老闆與投資人搜尋稅務問題、了解報稅規定。中文提供導覽與摘要，完整指南目前為英文。',
  },
  searchPath: '/zh-tw/library',
  hero: {
    eyebrow: '北美華人值得信賴的稅務知識平台',
    titleLine1: '美國稅務，',
    titleLine2: '為華人家庭',
    titleEm: '說清楚。',
    sub: '用白話搜尋任何稅務問題，不講艱深術語。專為在美國面對稅務問題的華人家庭與小型企業打造。完整指南目前為英文，中文提供導覽與摘要。',
    placeholder: '搜尋例如「什麼是 LLC？」或「Airbnb 報稅」',
    searchButton: '搜尋',
    pills: [
      { href: '/zh-tw/start/#first-time', label: '🗂 第一次報稅' },
      { href: '/zh-tw/start/#irs',        label: '📬 收到 IRS 的信' },
      { href: '/zh-tw/start/#airbnb',     label: '🏠 Airbnb 收入' },
      { href: '/zh-tw/start/#llc',        label: '🏪 成立 LLC' },
      { href: '/zh-tw/start/#crypto',     label: '📈 加密貨幣稅務' },
      { href: '/zh-tw/start/#immigrant',  label: '✈️ 新移民' },
    ],
  },
  start: {
    label: '從這裡開始',
    title: '今天想了解什麼？',
    sub: '從你的情況出發，我們會帶你找到需要的資訊，不用面對艱深的稅務術語。',
  },
  guides: {
    label: '熱門指南',
    title: '現在最實用的指南',
    sub: '華人家庭與小型企業老闆最常問的問題，清楚解答。完整指南目前為英文。',
    tabs: [
      { key: 'all',        label: '全部主題' },
      { key: 'individual', label: '個人與家庭' },
      { key: 'business',   label: '企業成立與公司架構' },
      { key: 'rental',     label: '房地產與 Airbnb' },
      { key: 'irs',        label: 'IRS 與稅務問題' },
    ],
    browseHref: '/zh-tw/library/',
    browseCta: '瀏覽完整稅務知識庫 →',
  },
  updates: {
    label: '稅務更新',
    title: '最近有哪些變化',
    sub: '稅法每年都在變。我們追蹤對華人家庭與小型企業最重要的更新。',
    tabs: [
      { key: 'federal',    label: '聯邦' },
      { key: 'california', label: '加州' },
      { key: 'irs',        label: 'IRS 通知' },
      { key: 'credits',    label: '抵稅額與退稅' },
      { key: 'deadlines',  label: '截止日期' },
    ],
    seeAllHref: '/updates/',
    seeAllCta: '查看所有稅務更新（英文頁面）→',
  },
  benefits: {
    label: '省錢與福利',
    title: '你可能不知道自己符合資格的福利',
    sub: '許多華人家庭因為語言障礙而錯過抵稅額與政府福利。這可能是你本來就有權領取的錢。',
    tabLabels: { all: '全部', family: '家庭', california: '加州', business: '小型企業', immigrant: '新移民' },
    note: '以上資訊僅供一般教育用途。是否符合資格取決於個人情況，請務必向合格的稅務專業人士確認。',
  },
  learn: {
    label: '持續學習',
    title: '更多學習方式',
    sub: '影片、清單與快速參考資料，專為在美國處理稅務的華人家庭設計。',
  },
  updateData: UPDATE_DATA,
  guideCards: GUIDE_CARDS,
  startCards: START_CARDS,
  learnCards: LEARN_CARDS,
  benefitCards: BENEFIT_CARDS,
}

export default HOME_ZH_TW

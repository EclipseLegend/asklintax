/**
 * Traditional Chinese Start Here content (/zh-tw/start/).
 * Translated from lib/content/start-en.js (English is the master). Tax figures must stay
 * identical to the English source. Guides are English-only: cards link to the existing
 * English URL and say so. Planned (unpublished) guides are omitted.
 */

const SITUATIONS = [
  {
    id: 'first-time',
    emoji: '🗂',
    title: '我第一次在美國報稅',
    subtitle: '首次報稅',
    desc: '你從來沒有申報過美國稅表，或不確定自己是否需要報稅。這是新移民與國際學生最常見的起點。',
    emotion: '📚 學習中',
    guides: [
      { href: '/library/individual/first-time-filer', title: '首次報稅：完整步驟指南', desc: '一步步帶你完成第一份美國稅表：需要哪些表格、會遇到什麼，以及常見錯誤。' },
      { href: '/library/individual/tax-residency', title: '我是美國稅務居民嗎？', desc: '你的稅務身分取決於你在美國停留多久。本指南用白話說明實質居住測試。' },
      { href: '/library/individual/itin', title: '什麼是 ITIN？我需要嗎？', desc: '如果你沒有社會安全號碼（SSN），可能需要 ITIN 才能報稅。說明如何申請。' },
    ],
    faqs: [
      { q: '我剛來美國，需要報稅嗎？', a: '取決於你在美國待了多久，以及賺了哪些收入。一般來說，如果你在美國有收入（工作、接案或投資），很可能需要報稅。可以用實質居住測試判斷你的報稅身分。' },
      { q: '第一次報稅的截止日期是什麼時候？', a: '聯邦稅一般截止日為 4 月 15 日；如果遇到週末或假日，會順延到下一個工作日。你可以提交 Form 4868 申請 6 個月的自動延期，延到 10 月 15 日。' },
      { q: '錯過截止日期會怎樣？', a: '如果你有欠稅，會被收取逾期申報罰款與利息。如果你應該拿到退稅，則沒有罰款，但在你報稅之前都拿不到退稅。晚報總比不報好。' },
    ],
  },
  {
    id: 'irs',
    emoji: '📬',
    title: '我收到 IRS 的信',
    subtitle: 'IRS 通知',
    desc: '收到 IRS 的信很讓人緊張，但大多數通知都是例行公事，不需要馬上驚慌。關鍵是仔細閱讀、了解 IRS 的要求，並在期限內回覆。',
    emotion: '😨 焦慮',
    guides: [
      { href: '/library/irs/irs-notice', title: '我收到 IRS 的信，該怎麼辦？', desc: '別驚慌。大多數 IRS 通知都是例行公事。本指南幫你看懂信件、辨認通知類型，並決定下一步。' },
      { href: '/library/irs/cp2000', title: 'CP2000 通知說明', desc: 'CP2000 是最常見的 IRS 通知之一，代表 IRS 發現你的稅表與雇主或銀行申報的資料不一致。' },
    ],
    faqs: [
      { q: '收到 IRS 的信代表我有麻煩嗎？', a: '不一定。IRS 會因為很多例行原因寄信，例如確認身分、要求補件，或通知小幅調整。在往最壞處想之前，請先仔細閱讀信件。' },
      { q: '收到 IRS 通知後，我有多少時間回覆？', a: '大多數通知給你 30–60 天回覆，截止日期會清楚寫在信上。錯過期限可能會產生額外罰款，所以收到信後請馬上把日期記在行事曆上。' },
      { q: '我應該直接打電話給 IRS 嗎？', a: '可以，但 IRS 的等候時間可能很長。對大多數通知來說，以書面方式（郵寄或線上）提供所需資料會更有效。如果通知涉及大筆金額或法律行動，請先諮詢 CPA 或稅務律師。' },
    ],
  },
  {
    id: 'airbnb',
    emoji: '🏠',
    title: '我有 Airbnb 或租金收入',
    subtitle: '租金收入',
    desc: '租金收入，不論來自 Airbnb、長期房客或出租家中的房間，都是應稅收入。但你也可以扣除許多費用，大幅降低應繳稅額。',
    emotion: '📋 整理中',
    guides: [
      { href: '/library/rental/airbnb-tax-guide', title: 'Airbnb 房東報稅完整指南', desc: '申報 Airbnb 收入需要知道的一切：哪些要算、哪些可以扣除，以及 14 天規則可能帶來的改變。' },
      { href: '/library/rental/14-day-rule', title: '14 天規則說明', desc: '如果一年出租自住房屋少於 15 天，可能完全不需要申報這筆收入。說明規則如何運作。' },
    ],
    faqs: [
      { q: 'Airbnb 收入需要報稅嗎？', a: '幾乎所有情況都需要。Airbnb 一般只有在你一年內透過超過 200 筆交易收到超過 $20,000 時，才會寄 1099-K 給你。但即使沒有收到 1099-K，這筆收入仍然需要課稅，應該申報。' },
      { q: '什麼是 14 天規則？', a: '如果你一年出租自住房屋（或度假屋）少於 15 天，就不需要申報這筆租金收入，但也不能扣除出租相關費用。這項規則只適用於自住的房屋，不適用於投資用房產。' },
      { q: '家具和家電的費用可以扣除嗎？', a: '可以。用於出租的物品一般可以扣除：金額在小額門檻以下可一次扣除，否則需分數年折舊。請保留所有收據。' },
    ],
  },
  {
    id: 'llc',
    emoji: '🏪',
    title: '我正在創業或經營小型企業',
    subtitle: '小型企業與 LLC',
    desc: '在美國創業不只需要好點子。你需要了解公司架構、稅務義務、季度預估稅，以及哪些費用可以扣除。',
    emotion: '🤔 考慮中',
    guides: [
      { href: '/library/business-formation/llc-basics', title: '什麼是 LLC？我需要嗎？', desc: '用白話說明 LLC 是什麼、提供哪些保障，以及是否適合你的情況。' },
      { href: '/library/business-formation/llc-vs-scorp', title: 'LLC vs S-Corp：哪個比較適合你？', desc: '你最重要的公司架構決定。透過實際情境清楚比較，幫助你做決定。' },
      { href: '/library/small-business/quarterly-taxes', title: '季度預估稅說明', desc: '如果你是自雇人士，通常一年要分四次繳稅。說明如何計算與繳納，避免罰款。' },
    ],
    faqs: [
      { q: '創業一定要成立 LLC 嗎？', a: '不一定。你可以不成立 LLC，以獨資經營者的身分營業。但 LLC 提供個人責任保護，也就是當企業面臨法律問題時，你的個人資產（房屋、存款）一般會受到保護。許多小型企業老闆認為這份保障值得。' },
      { q: '成立 LLC 要花多少錢？', a: '各州的申請費不同。例如加州不論收入多少，每年都有 $800 的最低特許經營稅。請務必查詢你所在州的規定。' },
      { q: 'LLC 和 S-Corp 在稅務上有什麼不同？', a: '單一成員 LLC 預設以獨資經營方式課稅，所有利潤都要繳自雇稅。S-Corp 可以把收入分成薪資與分配，在收入較高時可能降低自雇稅，但 S-Corp 的合規要求也比較多。' },
    ],
  },
  {
    id: 'crypto',
    emoji: '📈',
    title: '我有加密貨幣或投資收入',
    subtitle: '投資與加密貨幣',
    desc: '每次賣出加密貨幣、用一種幣換另一種幣，或用加密貨幣購物，都是應稅事件。股票、股息與海外帳戶也都有特定的申報規定。',
    emotion: '⚠️ 請確認',
    guides: [
      { href: '/library/investment/crypto-tax', title: '加密貨幣稅務說明', desc: '加密貨幣什麼時候要繳稅？如何計算損益？哪些算應稅事件？用白話完整說明。' },
      { href: '/library/investment/fbar', title: '我需要申報 FBAR 嗎？', desc: '如果你的海外銀行帳戶在一年中任何時候合計超過 $10,000，就必須申報 FBAR。許多華人家庭不知道這項規定適用於自己。' },
    ],
    faqs: [
      { q: '沒有賣出任何加密貨幣，也需要申報嗎？', a: '如果你只是持有，沒有賣出、交易或使用，一般不構成應稅事件。但你仍然必須誠實回答稅表上的加密貨幣問題。挖礦、質押獎勵與空投即使沒有賣出也需要課稅。' },
      { q: '我在台灣或中國有銀行帳戶，需要申報嗎？', a: '需要。如果合計餘額在一年中任何時候超過 $10,000 美元，你就必須申報 FBAR（FinCEN 114）。即使不欠稅，未申報也可能面臨重大罰款。' },
      { q: '如果加密貨幣賠錢，還需要申報嗎？', a: '需要。所有處分（賣出、交易、用加密貨幣購物）都要申報。但資本損失可以抵銷資本利得，每年最多 $3,000 的淨損失可以抵銷一般收入。請保留每筆交易紀錄。' },
    ],
  },
  {
    id: 'immigrant',
    emoji: '✈️',
    title: '我是新移民，或有跨境稅務問題',
    subtitle: '新移民與跨境',
    desc: '搬到美國會帶來特殊的稅務情況。你的第一年可能是「雙重身分」年度。你可能有海外收入、海外帳戶與海外資產，這些在美國都有申報規定。',
    emotion: '📚 學習中',
    guides: [
      { href: '/library/individual/new-immigrant', title: '新移民報稅指南', desc: '你在美國第一個稅務年度需要知道的一切：報稅身分、哪些收入要申報、ITIN 與 SSN，以及重要截止日期。' },
      { href: '/library/individual/dual-status', title: '雙重身分報稅說明', desc: '抵達美國的那一年，你可能是「雙重身分」：一部分時間是非居民、一部分時間是居民，報稅會比較複雜。' },
      { href: '/library/investment/fbar', title: 'FBAR：申報海外銀行帳戶', desc: '如果你在台灣、中國或美國以外任何地方的帳戶超過 $10,000，每年都必須申報 FBAR。' },
    ],
    faqs: [
      { q: '搬來美國之前賺的收入需要申報嗎？', a: '取決於你的居民身分。如果你在稅務上是「居民外國人」，整年的全球收入都要課稅。如果你是年中抵達，可能是「雙重身分外國人」，在成為居民之前的期間只需就美國來源收入繳稅。' },
      { q: '父母從台灣匯錢給我，需要繳稅嗎？', a: '來自外國個人的贈與，一般不算受贈人的應稅收入。但如果你一年內收到外國個人超過 $100,000 的贈與，即使不需繳稅，也必須用 Form 3520 申報。' },
      { q: '我在中國或台灣的帳戶超過 $10,000，該怎麼辦？', a: '你必須每年在 4 月 15 日前申報 FBAR（FinCEN 114）。這和你的稅表是分開的，直接向 FinCEN 申報。未申報的罰款可能很重，非故意違規最高每次 $10,000。' },
    ],
  },
]

const START_ZH_TW = {
  meta: { title: '從這裡開始 | AskLinTax 繁體中文', description: '找到你的稅務情況，直接帶你找到需要的資訊。中文提供導覽與摘要，完整指南目前為英文。' },
  hero: {
    eyebrow: '從這裡開始',
    title: '今天想了解什麼？',
    sub: '選擇你的情況，我們會用白話告訴你需要知道的事，不講艱深術語。完整指南目前為英文。',
  },
  readGuide: '閱讀英文指南 →',
  faqHeading: '常見問題',
  bottom: {
    title: '準備好瀏覽完整知識庫了嗎？',
    sub: '瀏覽全部 6 個知識類別：從個人稅務到 IRS 通知、Airbnb 收入與企業成立。',
    href: '/zh-tw/library/',
    cta: '瀏覽稅務知識庫 →',
  },
  situations: SITUATIONS,
}

export default START_ZH_TW

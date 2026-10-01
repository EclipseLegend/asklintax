/**
 * AskLinTax — Traditional Chinese (zh-tw) display metadata for the Knowledge Library.
 *
 * DISPLAY ONLY: Chinese titles, summaries, and search keywords for Library cards and search.
 * The articles themselves are English; every card still links to the existing English URL
 * from lib/articles.js and is labeled as an English guide. Keyed by the stable article id.
 *
 * These are translations of the English summaries — they are not separately CPA-reviewed.
 * Keep tax figures identical to the English source. scripts/validate-articles.js checks that
 * every key here matches a published article / category.
 */

const ARTICLES_ZH_TW = {
  'irs-notice': {
    title: '我收到 IRS 的信，該怎麼辦？',
    summary: '大多數 IRS（美國國稅局）通知都是例行公事。教你看懂信件、判斷通知類型，並決定下一步。',
    keywords: ['IRS 信件', 'IRS 通知', '國稅局來信', 'CP 通知', 'IRS 詐騙', '回覆 IRS'],
  },
  'llc-basics': {
    title: '什麼是 LLC？我需要成立嗎？',
    summary: 'LLC 是什麼、實際能提供哪些保障、如何課稅，以及如何判斷你是否需要成立。',
    keywords: ['LLC', '有限責任公司', '成立 LLC', '單一成員 LLC', '獨資經營', '責任保護', '開公司'],
  },
  'llc-vs-scorp': {
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    summary: '用實際數字比較 LLC 與 S-Corp 的課稅方式，以及收入達到多少時選擇 S-Corp 開始划算。',
    keywords: ['S-Corp', 'S 公司', 'LLC vs S-Corp', 'S-Corp 選擇', 'Form 2553', '合理薪資', '自雇稅', '公司架構'],
  },
  'new-immigrant': {
    title: '剛來美國？新移民完整報稅指南',
    summary: '一步步了解你在美國的第一個稅務年度：稅務居民身分、哪些收入要申報、ITIN 或 SSN、FBAR 與重要截止日期。',
    keywords: ['新移民', '綠卡', '移民報稅', '第一年報稅', '雙重身分', '全球收入', '剛來美國'],
  },
  'tax-residency': {
    title: '我是美國稅務居民嗎？',
    summary: '居民外國人還是非居民外國人？用白話解釋綠卡測試與實質居住測試。',
    keywords: ['稅務居民', '居民外國人', '非居民外國人', '實質居住測試', '綠卡測試', '183 天', 'F-1', 'H-1B'],
  },
  'do-i-need-to-file': {
    title: '我需要申報美國聯邦稅表嗎？',
    summary: '依報稅身分區分的申報門檻、一定要報稅的情況，以及即使不需要也值得報稅的時機。',
    keywords: ['需要報稅嗎', '報稅門檻', '申報義務', '總收入', '報稅身分', '學生報稅', '報稅'],
  },
  'first-time-filer': {
    title: '在美國第一次報稅：完整步驟指南',
    summary: '第一次報美國稅：要準備哪些文件、如何選擇報稅方式、看懂 W-2，以及追蹤退稅進度。',
    keywords: ['第一次報稅', '首次報稅', '如何報稅', '標準扣除額', '退稅', '報稅截止日', '報稅'],
  },
  'tax-credit-vs-deduction': {
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    summary: '同樣金額的抵稅額與扣除額，實際省下的稅差很多。用實際數字說明。',
    keywords: ['抵稅額', '扣除額', 'tax credit', 'tax deduction', '可退還抵稅額', '標準扣除額', '逐項扣除'],
  },
  'what-is-w2': {
    title: '什麼是 W-2？該怎麼看？',
    summary: '逐欄解說你的 W-2：為什麼第 1 欄可能低於你的薪水、第 12 欄代碼代表什麼，以及有錯誤時如何處理。',
    keywords: ['W-2', 'W-2 表', '薪資報表', '第 1 欄', '第 12 欄', 'W-2 錯誤'],
  },
  'w2-vs-1099': {
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    summary: '員工還是獨立承包人？W-2 與 1099 收入的課稅方式、1099 工作者可以扣除什麼，以及兩者都有時怎麼辦。',
    keywords: ['1099', '1099-NEC', '獨立承包人', '員工與承包人', '自由業', '接案', '自雇稅', '自雇'],
  },
  'airbnb-tax-guide': {
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    summary: '哪些 Airbnb 收入要申報、哪些費用可以扣除、Schedule E 與 Schedule C 的差別，以及 14 天規則如何適用。',
    keywords: ['Airbnb', 'Airbnb 報稅', 'Airbnb 扣除', '短租', '租金收入', '房東', 'Schedule E', 'Schedule C', '1099-K'],
  },
  '14-day-rule': {
    title: '14 天規則：Airbnb 收入何時完全免稅',
    summary: '一年出租自住房屋 14 天以內，租金收入可以免稅。說明規則怎麼運作、哪些天數要計算，以及其中的取捨。',
    keywords: ['14 天規則', 'Augusta rule', '免稅租金收入', '度假屋', '自用天數', '短租'],
  },
  'quarterly-taxes': {
    title: '季度預估稅：誰要繳？怎麼算？',
    summary: '誰需要繳預估稅、每季截止日期、如何計算每期金額，以及如何避免少繳罰款。',
    keywords: ['預估稅', '季度預估稅', '季繳', 'Form 1040-ES', '少繳罰款', '安全港', '自雇', '自由業'],
  },
  'business-deductions': {
    title: '小型企業老闆可以扣除哪些費用？',
    summary: 'Schedule C 的主要扣除項目，包括居家辦公室、車輛、設備與餐費，以及哪些費用不能扣除。',
    keywords: ['企業費用扣除', '費用扣除', 'Schedule C', '居家辦公室扣除', '里程', '商務餐費', '自雇'],
  },
  'ein': {
    title: '如何申請 EIN：逐步指南',
    summary: '一步步在 IRS 網站免費線上申請 EIN：誰需要、沒有 SSN 時怎麼辦，以及申請後的下一步。',
    keywords: ['EIN', '雇主識別號碼', '公司稅號', '申請 EIN', 'Form SS-4', '沒有 SSN'],
  },
  'cp2000': {
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    summary: 'CP2000 是資料不符通知，不是查帳。說明 IRS 發現了什麼、你的三種回覆方式，以及如何解決。',
    keywords: ['CP2000', 'IRS 通知', '收入不符', '少報收入', '擬議調整', '查帳', '國稅局來信'],
  },
  'child-tax-credit': {
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    summary: '誰算符合資格的子女、收入遞減規定如何運作、可退還的部分，以及移民家庭如何申請。',
    keywords: ['兒童抵稅額', 'Child Tax Credit', 'CTC', '符合資格子女', '額外兒童抵稅額', '受扶養人'],
  },
  'itin': {
    title: '什麼是 ITIN？如何申請？',
    summary: '誰需要 ITIN、如何用 Form W-7 申請、需要多久，以及 ITIN 能用與不能用在哪些地方。',
    keywords: ['ITIN', 'Form W-7', '個人報稅識別號碼', '沒有 SSN', 'ITIN 更新', '認證代理人'],
  },
  'crypto-tax': {
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    summary: '哪些加密貨幣交易需要繳稅、如何計算損益、短期與長期稅率，以及要保留哪些紀錄。',
    keywords: ['加密貨幣', '虛擬貨幣', '比特幣', '資本利得', '質押', 'NFT', 'Form 8949'],
  },
  'fbar': {
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    summary: '誰需要申報 FBAR、$10,000 門檻如何計算、如何提交 FinCEN Form 114，以及與 FATCA 的差異。',
    keywords: ['FBAR', '海外帳戶', '海外銀行帳戶', '境外帳戶', 'FinCEN 114', 'FATCA', 'Form 8938', '台灣銀行帳戶', '中國銀行帳戶'],
  },
}

const CATEGORIES_ZH_TW = {
  'individual': {
    name: '個人與家庭',
    summary: '報稅基本知識、稅務居民身分、W-2 與 1099 表格、ITIN，以及家庭抵稅額。',
    intro: '無論你是第一次報稅、剛來美國，或想看懂手上的稅表，這些指南都會用白話一步步說明你的個人稅務狀況。',
    seoTitle: '個人與家庭稅務：報稅、稅務居民身分與抵稅額 | AskLinTax',
    seoDescription: '以白話說明個人與家庭稅務：是否需要報稅、稅務居民身分、W-2 與 1099 表格、ITIN，以及兒童抵稅額等抵稅項目。',
    questions: [
      { q: '今年我需要報稅嗎？', id: 'do-i-need-to-file' },
      { q: '我是美國稅務居民還是非居民？', id: 'tax-residency' },
      { q: 'W-2 該怎麼看？', id: 'what-is-w2' },
      { q: '沒有 SSN，要怎麼申請 ITIN？', id: 'itin' },
      { q: '我的孩子符合兒童抵稅額資格嗎？', id: 'child-tax-credit' },
    ],
  },
  'small-business': {
    name: '小型企業與自雇人士',
    summary: '預估稅、費用扣除，以及自己當老闆對報稅的影響。',
    intro: '自己經營事業或接案工作，繳稅方式會不一樣。這些指南說明預估稅、費用扣除，以及你需要保留的紀錄。',
    seoTitle: '小型企業與自雇人士稅務 | AskLinTax',
    seoDescription: '給自由業者、承包人與小型企業老闆的指南：季度預估稅、企業費用扣除，以及自雇對報稅的影響。',
    questions: [
      { q: '我需要繳季度預估稅嗎？', id: 'quarterly-taxes' },
      { q: '小型企業老闆可以扣除哪些費用？', id: 'business-deductions' },
      { q: '我是員工還是獨立承包人？', id: 'w2-vs-1099' },
    ],
  },
  'business-formation': {
    name: '企業成立與公司架構',
    summary: '選擇並設立公司架構：LLC、S-Corp 與 EIN。',
    intro: '創業需要選擇合適的公司架構並正確設立。這些指南用白話與實際數字說明 LLC、S-Corp 與 EIN。',
    seoTitle: '企業成立與公司架構：LLC、S-Corp 與 EIN 指南 | AskLinTax',
    seoDescription: '選擇與設立公司架構：LLC 是什麼、何時適合選擇 S-Corp，以及如何向 IRS 申請 EIN。',
    questions: [
      { q: '我需要成立 LLC 嗎？', id: 'llc-basics' },
      { q: '我的公司該選 LLC 還是 S-Corp？', id: 'llc-vs-scorp' },
      { q: '如何申請 EIN？', id: 'ein' },
    ],
  },
  'rental': {
    name: '房地產與 Airbnb',
    summary: 'Airbnb 與租金收入：哪些要申報、哪些可以扣除、哪些免稅。',
    intro: '出租房間、房屋或度假屋都會牽涉稅務問題。這些指南說明要申報什麼、可以扣除什麼，以及租金收入何時免稅。',
    seoTitle: 'Airbnb 與出租房產稅務 | AskLinTax',
    seoDescription: '給 Airbnb 房東與出租房產屋主的報稅指南：要申報哪些收入、可以扣除哪些費用，以及 14 天規則何時讓租金收入免稅。',
    questions: [
      { q: 'Airbnb 收入要怎麼申報？', id: 'airbnb-tax-guide' },
      { q: '租金收入什麼時候免稅？', id: '14-day-rule' },
    ],
  },
  'investment': {
    name: '投資與海外帳戶',
    summary: '加密貨幣稅務，以及美國境外銀行帳戶的申報。',
    intro: '加密貨幣、投資，以及美國境外的銀行帳戶，各有自己的稅務與申報規定。這些指南說明哪些需要繳稅、哪些必須申報。',
    startHereNote: '每篇指南涵蓋投資與海外帳戶申報的不同面向，請選擇符合你情況的一篇。',
    seoTitle: '加密貨幣、投資與海外帳戶稅務（FBAR）| AskLinTax',
    seoDescription: '加密貨幣稅務與海外帳戶申報指南：哪些加密貨幣交易需要繳稅，以及誰必須為美國境外帳戶申報 FBAR。',
    questions: [
      { q: '我在台灣或中國的銀行帳戶需要申報嗎？', id: 'fbar' },
      { q: '賣出或交易加密貨幣需要繳稅嗎？', id: 'crypto-tax' },
    ],
  },
  'irs': {
    name: 'IRS 與稅務問題',
    summary: '看懂 IRS 信件與通知，並在期限內回覆。',
    intro: '收到 IRS（美國國稅局）的信難免緊張，但大多數通知都是例行公事。這些指南幫助你了解 IRS 的要求，並在期限內回覆。',
    seoTitle: 'IRS 信件與通知：代表什麼、如何回覆 | AskLinTax',
    seoDescription: '收到 IRS 的信？教你看懂內容、了解 CP2000 等常見通知的意思，並冷靜、準時地回覆。',
    questions: [
      { q: '我收到 IRS 的信，該怎麼辦？', id: 'irs-notice' },
      { q: 'CP2000 通知代表什麼？', id: 'cp2000' },
    ],
  },
}

module.exports = { ARTICLES_ZH_TW, CATEGORIES_ZH_TW }

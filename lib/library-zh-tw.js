/**
 * AskLinTax — Traditional Chinese (zh-tw) display metadata for the Knowledge Library.
 *
 * DISPLAY ONLY: Chinese titles, summaries, and search keywords for Library cards and search.
 * The articles themselves are English; every card still links to the existing English URL
 * from lib/articles.js and is labeled as an English guide. Keyed by the stable article id.
 *
 * These are translations of the English summaries — they are not separately verified.
 * Keep tax figures identical to the English source. scripts/validate-articles.js checks that
 * every key here matches a published article / category.
 */

const ARTICLES_ZH_TW = {
  'irs-notice': {
    title: '我收到 IRS 的信，該怎麼辦？',
    summary: '大多數 IRS（美國國稅局）通知都是例行公事。教你看懂信件、判斷通知類型，並決定下一步。',
    keywords: ['IRS 信件', 'IRS 通知', '國稅局來信', 'CP 通知', 'IRS 詐騙', '回覆 IRS', '國稅局通知'],
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
    keywords: ['稅務居民', '居民外國人', '非居民外國人', '實質居住測試', '綠卡測試', '183 天', 'F-1', 'H-1B', '非居民配偶', '夫妻合併申報'],
  },
  'do-i-need-to-file': {
    title: '我需要申報美國聯邦稅表嗎？',
    summary: '依報稅身分區分的申報門檻、一定要報稅的情況，以及即使不需要也值得報稅的時機。',
    keywords: ['需要報稅嗎', '報稅門檻', '申報義務', '總收入', '報稅身分', '學生報稅', '報稅', '已婚', '配偶', '夫妻合併申報'],
  },
  'first-time-filer': {
    title: '在美國第一次報稅：完整步驟指南',
    summary: '第一次報美國稅：要準備哪些文件、如何選擇報稅方式、看懂 W-2，以及追蹤退稅進度。',
    keywords: ['第一次報稅', '首次報稅', '如何報稅', '標準扣除額', '退稅', '報稅截止日', '報稅', '已婚', '夫妻合併申報'],
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
    keywords: ['CP2000', 'IRS 通知', '收入不符', '少報收入', '擬議調整', '查帳', '國稅局來信', '國稅局通知'],
  },
  'child-tax-credit': {
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    summary: '誰算符合資格的子女、收入遞減規定如何運作、可退還的部分，以及移民家庭如何申請。',
    keywords: ['兒童抵稅額', 'Child Tax Credit', 'CTC', '符合資格子女', '額外兒童抵稅額', '受扶養人'],
  },
  'itin': {
    title: '什麼是 ITIN？如何申請？',
    summary: '誰需要 ITIN、如何用 Form W-7 申請、需要多久，以及 ITIN 能用與不能用在哪些地方。',
    keywords: ['ITIN', 'Form W-7', '個人報稅識別號碼', '沒有 SSN', 'ITIN 更新', '認證代理人', '配偶 ITIN', '受扶養人'],
  },
  'crypto-tax': {
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    summary: '哪些加密貨幣交易需要繳稅、如何計算損益、短期與長期稅率，以及要保留哪些紀錄。',
    keywords: ['加密貨幣', '虛擬貨幣', '比特幣', '資本利得', '質押', 'NFT', 'Form 8949'],
  },
  'fbar': {
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    summary: '誰需要申報 FBAR、$10,000 門檻如何計算、如何提交 FinCEN Form 114，以及與 FATCA 的差異。',
    keywords: ['FBAR', '海外帳戶', '海外銀行帳戶', '境外帳戶', '國外帳戶', '外國帳戶', '國外銀行帳戶', 'FinCEN 114', 'FATCA', 'Form 8938', '台灣銀行帳戶', '中國銀行帳戶'],
  },

  // ── Batch 1: New to the U.S. & international tax ──
  'foreign-gifts': {
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    summary: '父母從海外匯來的錢一般不算應稅收入；但一年內來自相關外國人的贈與合計超過 $100,000，就必須用 Form 3520 申報。',
    keywords: ['海外贈與', '父母匯款', '台灣匯款', '父母匯錢', '贈與', '外國贈與', '海外匯款', '遺產', 'Form 3520'],
  },
  'form-3520': {
    title: 'Form 3520：申報大額海外贈與',
    summary: '誰需要填 Form 3520 第 IV 部分、$100,000 門檻、截止日期與延期、寄送地址，以及每月 5% 的罰款。',
    keywords: ['Form 3520', '3520', '海外贈與申報', '海外遺產', '大額贈與', '3520 罰款', '父母匯款'],
  },
  'fbar-vs-form-8938': {
    title: 'FBAR 與 Form 8938 有什麼不同？',
    summary: 'FBAR 和 Form 8938 是兩項不同的申報義務。比較門檻、誰要申報、哪些資產要算、截止日期與申報方式。',
    keywords: ['FBAR', 'FATCA', 'Form 8938', '8938', '海外資產', '海外帳戶', '海外金融資產', 'FinCEN 114'],
  },
  'foreign-bank-account': {
    title: '台灣或海外銀行帳戶需要申報嗎？',
    summary: '海外帳戶牽涉三個不同的問題：利息的所得稅、FBAR 與 Form 8938。用實際例子一步步說明。',
    keywords: ['台灣銀行帳戶', '海外帳戶', '海外銀行帳戶', '國外帳戶', '外國帳戶', '海外利息', '帳戶申報', 'FBAR', 'Form 8938'],
  },
  'foreign-property': {
    title: '海外房產：美國納稅人需要知道的事',
    summary: '直接持有的海外房產不需要申報 FBAR 或 Form 8938；但租金、出售獲利與大額繼承各有美國稅務規定。',
    keywords: ['海外房產', '台灣的房子', '海外房地產', '出售海外房產', '繼承房產', '海外房屋稅', '國外房子'],
  },
  'foreign-rental-property': {
    title: '海外出租房產與美國稅務',
    summary: '美國稅務居民如何申報海外房產的租金：Schedule E、費用扣除、30 年 ADS 折舊、匯率換算與外國稅額抵免。',
    keywords: ['海外租金', '海外出租', '台灣房子出租', '海外房產出租', '租金收入', 'ADS 折舊', '外國稅額抵免'],
  },
  'nonresident-spouse': {
    title: '非居民配偶：我們可以合併報稅嗎？',
    summary: '配偶不是美國稅務居民？比較分開申報、戶長身分，以及選擇將配偶視為美國居民後合併報稅。',
    keywords: ['非居民配偶', '外國配偶', '配偶在台灣', '合併報稅', '夫妻合併申報', '配偶'],
  },
  'dual-status': {
    title: '雙重身分報稅：抵達或離開美國的那一年',
    summary: '一年中部分時間是美國居民？說明雙重身分如何報稅：居民身分開始日、哪些收入要課稅、限制與申報方式。',
    keywords: ['雙重身分', '雙重身份', '抵美第一年', '離開美國', '部分年度居民', '雙重身分申報', '1040-NR'],
  },
  'substantial-presence-test': {
    title: '實質居留測試：如何計算你在美國的天數',
    summary: '31 天與 183 天的計算公式、哪些天數要算、豁免的學生與教師、Form 8843，以及更緊密聯繫例外。',
    keywords: ['實質居留測試', '實質居住測試', '183 天', '居留天數', 'Form 8843', 'Form 8840', '父母來美探親'],
  },
  'worldwide-income': {
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    summary: '美國稅務居民須就全球所得課稅。哪些算收入、哪些不算，以及外國稅額抵免與海外所得排除如何運作。',
    keywords: ['全球所得', '海外收入', '台灣收入', '國外收入', '外國稅額抵免', '海外所得排除', 'FEIE'],
  },
  'foreign-gift-over-100000': {
    title: '海外父母匯超過 10 萬美元給我，要報 Form 3520 嗎？',
    summary: '一年內從非居民父母收到超過 $100,000？為什麼通常不用繳稅，但必須在 Form 3520 Part IV 申報。',
    keywords: ['超過 10 萬美元', '10萬美元', '十萬美元', '大額匯款', '要報 3520 嗎', '父母匯超過'],
  },
  'form-3520-multiple-gifts': {
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    summary: '分多次匯款、父母各匯一筆，或其他海外親人匯款：Form 3520 門檻如何加總，以及為什麼拆開匯款沒有用。',
    keywords: ['分多次匯款', '多次匯款', '分批匯款', '拆開匯款', '門檻怎麼算', '合併計算', '每月匯款'],
  },
  'foreign-gift-home-down-payment': {
    title: '海外父母幫我付美國房屋頭期款，要申報嗎？',
    summary: '父母從海外出錢幫你在美國買房：是贈與、借款還是共同持有，何時要報 Form 3520，以及貸款機構與 IRS 需要的紀錄。',
    keywords: ['頭期款', '買房', '房屋頭期款', '贈與證明', 'gift letter', '資金來源', '房貸'],
  },
  'foreign-gift-tuition-paid-directly': {
    title: '海外父母直接付我的學費，要報 Form 3520 嗎？',
    summary: '直接付給學校的學費，在 Form 3520 上不算海外贈與；但匯給你的錢、住宿與書籍費都算。說明這個範圍很窄的例外。',
    keywords: ['學費', '直接付學費', '留學生', '大學學費', '醫療費', '宿舍費', '住宿費'],
  },
  'transfer-own-money-to-us': {
    title: '把自己海外帳戶的錢匯到美國，要繳稅嗎？',
    summary: '把自己的存款匯到美國，本身不是收入。真正重要的是這筆錢的來源，以及海外帳戶的申報。',
    keywords: ['自己的錢', '自己的存款', '存款匯到美國', '自己帳戶的錢', '海外存款', '關閉海外帳戶', '跨國匯款'],
  },
  'sold-foreign-property-transfer': {
    title: '海外賣房後把錢匯到美國，要申報什麼？',
    summary: '出售與匯款是兩件事。美國居民如何申報海外房產出售：成本基礎、匯率、外國稅額抵免與 FBAR。',
    keywords: ['海外賣房', '賣房', '台灣賣房', '賣房子', '房屋出售', '售屋款', '賣房匯款'],
  },
  'late-form-3520': {
    title: 'Form 3520 忘記報或晚報，現在怎麼辦？',
    summary: '漏報海外贈與或遺產的 Form 3520？罰款怎麼算、合理原因（reasonable cause），以及 IRS 補報國際資訊申報表的程序。',
    keywords: ['晚報', '忘記報', '漏報', '補報', '逾期申報', '合理原因', 'reasonable cause'],
  },
  'form-3520-married-couples': {
    title: '夫妻收到海外父母贈與，Form 3520 怎麼判斷？',
    summary: '海外父母贈與給已婚夫妻：為什麼「誰收到」很重要、聯名帳戶、非居民配偶，以及合併申報。',
    keywords: ['夫妻收到贈與', '配偶收到贈與', '公婆', '岳父母', '聯名帳戶', '夫妻贈與', '先生太太'],
  },
  'foreign-gift-vs-inheritance': {
    title: '海外贈與和海外遺產，在美國申報有什麼不同？',
    summary: '比較來自海外家人的贈與與遺產：Form 3520 申報、哪些仍要繳稅，以及日後出售時成本基礎的差別。',
    keywords: ['遺產', '繼承', '海外遺產', '贈與和遺產', '繼承房產', '成本基礎', '父母過世'],
  },
  'foreign-gift-vs-foreign-trust': {
    title: '海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？',
    summary: '海外父母的贈與與海外信託分配是兩回事：Form 3520 Part IV 與 Part III、門檻、罰款與課稅都不同。',
    keywords: ['信託', '海外信託', '信託分配', '家族信託', 'foreign trust', 'Part III', '受益人'],
  },
  'fbar-10000-rule': {
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    summary: 'FBAR 的 $10,000 門檻是把所有海外帳戶合計、一年中任何時候超過就算，不是每個帳戶分開看，也不是看年底餘額。',
    keywords: ['一萬美元', '1萬美金', '合計超過', '兩個帳戶', '多個帳戶', '$10,000 門檻', '海外帳戶合計'],
  },
  'fbar-maximum-account-value': {
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    summary: 'FBAR 每個帳戶要申報的最高餘額怎麼算：一年中的最高金額、對帳單、年底財政部匯率，以及進位。',
    keywords: ['最高餘額', '最高金額', '帳戶最高價值', 'maximum account value', '匯率換算', '財政部匯率', '年底匯率'],
  },
  'new-us-resident-foreign-accounts': {
    title: '剛搬來美國，原本的台灣／海外帳戶要申報嗎？',
    summary: '在美國的第一年還有海外帳戶：居民身分何時開始、FBAR 與 Form 8938 的期間、門檻，以及帳戶收入。',
    keywords: ['剛搬來美國', '今年才搬來', '剛來美國', '第一年', '抵美', '移民第一年', '居民身分開始'],
  },
  'foreign-account-no-interest': {
    title: '海外帳戶沒有利息，也要報 FBAR 嗎？',
    summary: '沒有利息不代表不用報 FBAR。帳戶申報看的是金額；收入申報看的是實際賺到的收入。',
    keywords: ['沒有利息', '沒利息', '零利息', '沒有收入', '活存', '閒置帳戶', '不動的帳戶'],
  },
  'foreign-time-deposit-cd': {
    title: '台灣／海外定存要報 FBAR 或 Form 8938 嗎？',
    summary: '海外銀行的定存（time deposit、CD）就是海外金融帳戶：FBAR、Form 8938、最高餘額與利息收入。',
    keywords: ['定存', '定期存款', '台灣定存', '海外定存', 'CD', 'time deposit', '定存利息'],
  },
  'foreign-brokerage-account': {
    title: '海外股票與證券帳戶怎麼申報？',
    summary: '海外證券帳戶與直接持有的海外股票：哪些報 FBAR、哪些報 Form 8938、哪些不用報。',
    keywords: ['海外股票', '台灣股票', '證券帳戶', '股票帳戶', '海外證券帳戶', '券商帳戶'],
  },
  'foreign-life-insurance-cash-value': {
    title: '海外儲蓄險／有現金價值的人壽保險要申報嗎？',
    summary: '海外保險公司發行、有現金價值的人壽保險或年金，FBAR 與 Form 8938 都要申報。哪些算、哪些不在本文範圍。',
    keywords: ['儲蓄險', '海外保單', '人壽保險', '解約金', '現金價值', '年金險'],
  },
  'late-fbar': {
    title: '忘記報 FBAR 怎麼辦？',
    summary: '漏報 FBAR？IRS 的逾期 FBAR 補交程序、streamlined 程序與自願揭露，以及為什麼未申報的收入很關鍵。',
    keywords: ['忘記報 FBAR', '忘記報FBAR', '補報 FBAR', '補報FBAR', '漏報 FBAR', 'FBAR 罰款', '逾期 FBAR'],
  },
  'joint-foreign-account-fbar': {
    title: '夫妻共同海外帳戶，FBAR 怎麼報？',
    summary: '共同持有的海外帳戶，每位共同持有人都要申報帳戶全額。什麼情況下可由一方配偶用 Form 114a 代報。',
    keywords: ['共同帳戶', '夫妻共同帳戶', '共同海外帳戶', '聯名帳戶', '配偶帳戶', 'Form 114a'],
  },
  'pre-immigration-savings': {
    title: '搬來美國以前就有的海外存款，需要申報嗎？',
    summary: '移民前存下的錢通常不會再被課稅，但存放這些錢的海外帳戶仍可能要申報 FBAR 或 Form 8938。',
    keywords: ['移民前存款', '移民以前', '搬來以前', '來美國以前', '以前存的錢', '舊存款', '移民前的錢'],
  },
}

const CATEGORIES_ZH_TW = {
  'individual': {
    name: '個人與家庭',
    summary: '報稅基本知識、稅務居民身分、W-2 與 1099 表格、ITIN、非居民配偶，以及全球所得。',
    intro: '無論你是第一次報稅、剛來美國，或想看懂手上的稅表，這些指南都會用白話一步步說明你的個人稅務狀況。',
    seoTitle: '個人與家庭稅務：報稅、稅務居民身分與抵稅額 | AskLinTax',
    seoDescription: '以白話說明個人與家庭稅務：是否需要報稅、稅務居民身分與實質居留測試、雙重身分年度、非居民配偶、全球所得、ITIN，以及家庭抵稅額。',
    questions: [
      { q: '今年我需要報稅嗎？', id: 'do-i-need-to-file' },
      { q: '我是美國稅務居民還是非居民？', id: 'tax-residency' },
      { q: '實質居留測試的天數要怎麼算？', id: 'substantial-presence-test' },
      { q: '配偶不是美國居民，我們可以合併報稅嗎？', id: 'nonresident-spouse' },
      { q: '在台灣或中國的收入要在美國申報嗎？', id: 'worldwide-income' },
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
    summary: 'Airbnb 與租金收入（包括海外房產）：哪些要申報、哪些可以扣除、哪些免稅。',
    intro: '出租房間、房屋或度假屋都會牽涉稅務問題。這些指南說明要申報什麼、可以扣除什麼，以及租金收入何時免稅。',
    seoTitle: 'Airbnb 與出租房產稅務 | AskLinTax',
    seoDescription: '給 Airbnb 房東與出租房產屋主的報稅指南（包括海外房產）：要申報哪些收入、可以扣除哪些費用，以及 14 天規則何時讓租金收入免稅。',
    questions: [
      { q: 'Airbnb 收入要怎麼申報？', id: 'airbnb-tax-guide' },
      { q: '租金收入什麼時候免稅？', id: '14-day-rule' },
      { q: '台灣的房子出租，租金要怎麼申報？', id: 'foreign-rental-property' },
    ],
  },
  'investment': {
    name: '投資與海外帳戶',
    summary: '海外銀行帳戶、來自海外的贈與、海外房產與加密貨幣：哪些要繳稅、哪些必須申報。',
    intro: '海外銀行帳戶、家人從海外的贈與、其他國家的房產，以及加密貨幣，各有自己的稅務與申報規定。這些指南幫你分清楚哪些要繳稅、哪些只需要申報。',
    startHereNote: '每篇指南涵蓋投資與海外帳戶申報的不同面向，請選擇符合你情況的一篇。',
    seoTitle: '海外帳戶、海外贈與與加密貨幣稅務（FBAR、Form 3520）| AskLinTax',
    seoDescription: '海外帳戶與海外資產指南：FBAR 與 Form 8938、父母從海外匯款與 Form 3520、海外房產，以及哪些加密貨幣交易需要繳稅。',
    questions: [
      { q: '我在台灣或中國的銀行帳戶需要申報嗎？', id: 'foreign-bank-account' },
      { q: '我需要申報 FBAR 嗎？', id: 'fbar' },
      { q: 'FBAR 和 Form 8938 有什麼不同？', id: 'fbar-vs-form-8938' },
      { q: '父母從海外匯錢給我，需要繳稅嗎？', id: 'foreign-gifts' },
      { q: '什麼時候需要申報 Form 3520？', id: 'form-3520' },
      { q: '父母直接付我的學費，算海外贈與嗎？', id: 'foreign-gift-tuition-paid-directly' },
      { q: 'Form 3520 忘記報了，現在怎麼辦？', id: 'late-form-3520' },
      { q: '海外賣房後把錢匯到美國，要申報什麼？', id: 'sold-foreign-property-transfer' },
      { q: '在海外的房子需要申報嗎？', id: 'foreign-property' },
      { q: '每個海外帳戶都不到 $10,000，還要報 FBAR 嗎？', id: 'fbar-10000-rule' },
      { q: '台灣定存要申報嗎？', id: 'foreign-time-deposit-cd' },
      { q: '忘記報 FBAR 怎麼辦？', id: 'late-fbar' },
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

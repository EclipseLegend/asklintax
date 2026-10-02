import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/cp2000.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'cp2000',
  sourceHash:      'ddfbce79dd41',
  id:            '16',
  title:         'CP2000 通知：代表什麼？該如何回覆？',
  titleEn:       'CP2000 notice: what it means and how to respond',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 了解你的 CP2000 系列通知（Understanding your CP2000 series notice）', url: 'https://www.irs.gov/individuals/understanding-your-cp2000-series-notice' },
    { label: 'IRS Publication 5181 — 郵件稅表審查（Tax Return Reviews by Mail）', url: 'https://www.irs.gov/pub/irs-pdf/p5181.pdf' },
    { label: 'IRS — 了解你的 Form 1099-K（Understanding your Form 1099-K）', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
    { label: 'IRS — 數位資產（Digital assets：Form 1099-DA 申報）', url: 'https://www.irs.gov/filing/digital-assets' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋一般的 CP2000 回覆流程。如果提議的金額很大（超過 $5,000）、你不同意 IRS 的看法，或涉及多個年度，回覆前請先諮詢 CPA。',
  persona:       ['收到 CP2000 通知的人', '漏報 1099 的接案者', '有未申報收入的投資人', '不熟悉 IRS 通知的新移民'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '找到 CP2000 上印的回覆截止日，並依照那個日期處理。不要錯過。仔細閱讀通知，找出 IRS 認為少報的是哪一筆收入，再準備文件來確認或爭議這項差異。',
}

const FAQS = [
  {
    q: 'CP2000 等於查帳嗎？',
    a: '不是。CP2000 是自動少報收入（Automated Underreporter, AUR）通知 — 由電腦比對出你申報的內容與第三方（雇主、銀行、客戶）向 IRS 申報的內容不一致。它不是查帳（Audit）。查帳是由 IRS 審查人員檢視你的整份稅表。CP2000 常見得多、例行得多，也容易解決得多。大多數 CP2000 案件完全透過書信往來就能解決。',
  },
  {
    q: '如果我同意 CP2000 — 就要全部照付嗎？',
    a: '你實際欠的可能比提議的金額少。CP2000 是依未申報的收入計算額外稅額，但可能沒有考慮你有權享有的扣除額或抵稅額。例如，如果你漏報了 $5,000 的接案收入，CP2000 可能以完整的 $5,000 提議稅額 — 但如果你還有 $2,000 可以扣除的營業費用，你實際的額外稅額只會以 $3,000 計算。回覆時可以附上這些調整。',
  },
  {
    q: '如果我沒有在截止日前回覆，會怎樣？',
    a: '如果你沒有回覆，IRS 會假定你同意提議的變更，並發出法定欠稅通知（Statutory Notice of Deficiency，有時稱為「90 天信」）。屆時你有 90 天可以向美國稅務法院（U.S. Tax Court）提出訴願 — 或者繳納核定的稅額。錯過 CP2000 截止日會讓情況明顯升級。請立刻記下截止日。',
  },
  {
    q: '我收到的 CP2000 上的收入不是我的，該怎麼辦？',
    a: '可能的原因包括：付款方把你的 SSN 申報錯誤、有人冒用了你的 SSN，或資料輸入錯誤。請以書面回覆說明錯誤，並附上相關證明文件（例如證明這筆收入屬於別人、身分盜用的證明）。如果與身分有關，也要申報 Form 14039（身分盜用宣誓書，Identity Theft Affidavit），並考慮在你的信用紀錄上設定詐騙警示。',
  },
  {
    q: '可以申請延長回覆時間嗎？',
    a: '可以。如果你需要更多時間，請在截止日前申請延期 — 以郵寄或傳真、用 IRS 文件上傳工具上傳申請，或撥打通知上列出的免付費電話。如果用電話申請，請記下客服人員的姓名，以及通話的日期與時間。',
  },
  {
    q: 'CP2000 會影響我的信用分數嗎？',
    a: 'CP2000 通知本身不會影響你的信用分數。不過，如果 IRS 最後核定了你沒有繳納的稅額，並申報聯邦稅務留置權（Federal Tax Lien），這項留置權可能出現在公開紀錄中，影響你申請貸款或信用的能力。及時回覆並解決 CP2000，可以避免情況升級到留置權。',
  },
  {
    q: '我收到 CP2000 的那一年是請 CPA 報的稅，應該聯絡他們嗎？',
    a: '應該，而且要立刻聯絡。你的 CPA 應該是你第一個打電話的對象。如果稅表是 CPA 準備的，他們需要知道這份通知，而且可能有能幫助解決差異的紀錄。如果是他們準備時出錯，他們應該參與回覆。如果你已經不和那位 CPA 合作，就自己找出稅表與相關文件，並考慮諮詢新的稅務專業人士。',
  },
]

const RELATED = [
  {
    href:  '/library/irs/irs-notice',
    cat:   'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '涵蓋所有 IRS 通知的更完整指南 — 如何閱讀、辨識類型，以及決定下一步。',
  },
  {
    href:  '/library/individual/w2-vs-1099',
    cat:   'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '大多數 CP2000 通知都和漏報的 1099 收入有關。了解 1099 可以幫你避免以後再收到通知。',
  },
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '許多 CP2000 通知來自第一年報稅的錯誤。這份指南幫你一次就做對。',
  },
]

const RESPONSE_OPTIONS = [
  {
    option:  '你同意 — 而且同意這個金額',
    action:  '簽署並寄回 CP2000 附上的回覆表（Response Form）。繳納應付的金額（或安排分期付款）。除非 IRS 再聯絡你，不需要進一步的書信往來。',
    color:   'var(--green)',
    icon:    '✅',
    complexity: '簡單',
  },
  {
    option:  '你同意這筆收入沒有申報 — 但你有可以減少應繳金額的扣除額',
    action:  '在回覆表上簽名，表示部分同意。附上一份說明，解釋你主張的扣除額或調整，並附上證明文件。IRS 會重新計算。',
    color:   '#F59E0B',
    icon:    '⚡',
    complexity: '中等',
  },
  {
    option:  '你不同意 — 這筆收入已經申報過，或不屬於你',
    action:  '不要在回覆表上簽名。寫一份清楚說明你為什麼不同意的解釋，並附上文件：你的原始稅表、付款方的 1099，或證明這筆收入屬於別人的資料。依通知上的說明，以上傳、傳真或郵寄方式回覆，並保留副本。',
    color:   'var(--blue)',
    icon:    '📝',
    complexity: '中等',
  },
  {
    option:  '你不同意 — 而且金額很大或情況複雜',
    action:  '回覆前先諮詢 CPA 或稅務律師。到了這個程度，專業代理值得花這筆錢。專業人士可能找到你自己會遺漏的論點或程序選項。',
    color:   '#7C3AED',
    icon:    '🤝',
    complexity: '尋求協助',
  },
]

export default function CP2000ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'CP2000 通知：代表什麼？該如何回覆？ | AskLinTax 繁體中文',
      description: '收到 IRS 的 CP2000？這不是查帳 — 而是收入比對不符的通知。本指南說明 IRS 發現了什麼、你的三種回覆方式，以及如何一步步解決。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是 CP2000？</h2>
        <p>
          CP2000 是一份自動通知：當你稅表上的收入，與第三方 — 你的雇主、銀行、客戶、券商，或 Venmo、PayPal 這類支付平台 — 向 IRS 申報的收入不一致時，IRS 就會寄出這份通知。
        </p>
        <p>
          每年，雇主、銀行與其他付款方都會把他們開立的每一份 W-2、1099 與其他收入表格副本寄給 IRS。IRS 的電腦系統會把這些金額與你在稅表上申報的金額比對。如果數字對不上，就會自動產生 CP2000。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 第一步：找到截止日並記下來</div>
          <p>回覆截止日印在 CP2000 的第一頁 — 找「Please respond by」後面的日期。請依照通知上印的日期處理，並立刻記在行事曆上。錯過這個截止日會讓情況明顯升級 — IRS 會當作你同意它的核定繼續處理。</p>
        </div>

        <h2>CP2000 不是查帳 — 差別在這裡</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>CP2000</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>查帳（Audit）</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['觸發原因', '電腦自動比對出你的稅表與第三方申報不一致', 'IRS 選出稅表由人員詳細審查（隨機、疑點或特定問題）'],
                ['誰來審查', '一開始是自動系統；之後以書信往來處理', '指派的 IRS 審查人員'],
                ['範圍', '對不上的特定收入項目', '你的整份稅表，或特定項目'],
                ['常見程度', '非常常見 — 每年寄出數百萬份', '少見得多'],
                ['如何解決', '通常透過郵件 — 回覆同意或說明', '透過書信、面談或申訴程序'],
                ['需要恐慌嗎？', '❌ 不需要 — 大多數都能簡單解決', '⚠️ 要認真對待，但不用恐慌'],
              ].map(([feature, cp, audit], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feature}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{cp}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>為什麼你會收到 CP2000？</h2>
        <p>
          最常見的原因：
        </p>
        <ul>
          <li><strong>漏報 1099 收入</strong> — 接案客戶付款給你，並向 IRS 申報了 1099-NEC，但你沒有把這筆收入列入稅表。這是最常見的原因。</li>
          <li><strong>未申報投資交易</strong> — 你賣出了股票、加密貨幣或基金，收到 1099-B（或者，2025 年 1 月 1 日以後透過經紀商出售的數位資產，收到 Form 1099-DA），但沒有在 Schedule D 上申報這些出售。</li>
          <li><strong>漏報銀行利息</strong> — 銀行就你賺到的利息寄了 1099-INT，但你沒有申報。</li>
          <li><strong>支付平台的 1099-K</strong> — 你透過 Venmo、PayPal、Stripe 或 Airbnb 收到超過申報門檻的款項，平台申報了 IRS 有、你卻沒有申報的 1099-K。</li>
          <li><strong>雇主申報的比你多</strong> — W-2 不一致，通常是因為更正過的文件或多份工作。</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ CP2000 不一定反映完整的情況</div>
          <p>IRS 提議的核定，是根據付款方申報的總收入 — 它不知道你針對這筆收入可能有的扣除額或費用。例如，如果客戶為你的接案工作申報了 $8,000 的 1099-NEC，IRS 可能以完整的 $8,000 提議稅額 — 但如果你有 $3,000 的營業費用，這份工作實際的應稅所得只有 $5,000。回覆時可以附上這些調整。</p>
        </div>

        <h2>你的三種回覆方式</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '28px 0' }}>
          {RESPONSE_OPTIONS.map((opt, i) => (
            <div key={i} style={{ border: `1.5px solid ${opt.color}30`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: opt.color + '12', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${opt.color}20` }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15.5px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.35' }}>{opt.option}</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px', background: opt.color + '20', color: opt.color, flexShrink: 0 }}>{opt.complexity}</span>
              </div>
              <div style={{ padding: '14px 20px', background: 'var(--white)' }}>
                <p style={{ fontSize: '15px', color: 'var(--mid)', lineHeight: '1.72', marginBottom: 0 }}>{opt.action}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>逐步說明：如何回覆</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '28px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          {[
            { step: '01', title: '完整閱讀通知', detail: '在做任何事之前，先把整份 CP2000 讀完。找出：觸發通知的是哪一筆收入、提議的額外稅額、回覆截止日，以及申報這項差異的付款方。' },
            { step: '02', title: '找出你的原始稅表', detail: '找出相關年度的稅表，確認你是否真的申報了 IRS 詢問的這筆收入。有時候收入其實已經申報，只是放在不同的地方 — 例如列在 Schedule C，而不是 IRS 預期的位置。' },
            { step: '03', title: '準備文件', detail: '收集：相關的 1099 或其他收入文件、你的原始稅表、這筆收入相關的扣除額或費用證明，以及（如適用）證明這筆收入屬於別人的資料。' },
            { step: '04', title: '決定你的立場', detail: '你同意 IRS 嗎？部分同意？不同意？CP2000 附上的回覆表針對每一種立場都有選項。依你的文件來選擇。' },
            { step: '05', title: '填寫並寄回回覆表', detail: '填寫通知附上的回覆表。如果同意但有調整，請附上簽名的說明。如果不同意，請附上書面解釋與證明文件。在截止日前寄出。' },
            { step: '06', title: '寄出回覆 — 保留副本', detail: 'IRS 接受以下回覆方式：上傳（最快的方式，使用 IRS 文件上傳工具與 IRS CP2000 頁面上的存取碼）、傳真到你通知上 IRS 地點的號碼，或郵寄到通知上的地址。如果用郵寄，USPS 掛號附回執（Certified Mail with Return Receipt）可以提供送達證明。保留你寄出的所有資料副本：回覆表、你的信與所有附件。' },
            { step: '07', title: '等待 IRS 回應', detail: 'IRS 審查你的回覆後會與你聯絡。IRS 可能接受你的回覆並結案、要求更多資料，或者 — 如果無法達成共識 — 寄出法定欠稅通知。' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < 6 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px', borderRight: '1px solid var(--border-l)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{s.step}</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2>如果你需要補稅</h2>
        <p>
          如果檢視通知後，你同意需要補繳稅款：
        </p>
        <ul>
          <li><strong>全額繳清</strong> — 在 IRS.gov/payments 繳款，停止利息累積。利息從稅表原本的截止日開始計算，而不是從 CP2000 通知日開始。</li>
          <li><strong>無法全額繳清</strong> — 在 IRS.gov/opa 或打電話給 IRS 申請分期付款協議（Installment Agreement）。及早處理可以減少罰款。</li>
          <li><strong>先繳沒有爭議的部分</strong> — 如果你部分同意，現在就先繳你同意的金額。這可以停止這部分的利息，其餘有爭議的部分則繼續處理。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 利息從稅表原本的截止日開始計算</div>
          <p>
            CP2000 提議的額外稅額不是新的稅 — 它屬於原本的稅務年度。利息從該年度原本的 4 月 15 日截止日開始累積，而不是從 CP2000 的日期開始。這代表 CP2000 拖得越久，累積的利息就越多。及早解決 — 即使需要分期付款 — 可以把應付的總額降到最低。
          </p>
        </div>

        <h2>如何避免以後再收到 CP2000</h2>
        <ul>
          <li><strong>申報所有 1099 收入</strong> — 每一位付款給你的客戶、銀行、券商與平台都會向 IRS 申報。如果你收到 1099，就要申報這筆收入。即使沒有收到 1099，這筆收入仍然要繳稅。</li>
          <li><strong>報稅前先確認 1099 都到齊了</strong> — 等到 2 月中旬再報稅，那時大多數 1099 都已寄出。1 月急著報稅，常常會漏掉晚到的表格。</li>
          <li><strong>在 Schedule D 上申報投資出售</strong> — 經紀商會在 Form 1099-B 上申報股票與基金的出售；處理數位資產出售的經紀商，則會就 2025 年 1 月 1 日以後的出售，在 Form 1099-DA 上申報總收入。不論你是否收到表格，每一筆出售都必須申報，即使結果是虧損。</li>
          <li><strong>申報所有支付平台收入</strong> — 如果你透過 PayPal、Venmo、Stripe 或 Airbnb 收到營業收入，不論是否收到 1099-K 都要申報。支付 App 與線上平台一般只在超過 $20,000 且超過 200 筆交易時才會開立；信用卡付款沒有最低門檻。</li>
          <li><strong>保留所有稅務文件的副本</strong> — 如果付款方寄來錯誤的 1099，你需要文件來爭議因此產生的 CP2000。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

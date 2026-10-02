import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/ein.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'ein',
  sourceHash:      'f52b61a987eb',
  id:            '15',
  title:         '如何申請 EIN：逐步指南',
  titleEn:       'How to apply for an EIN: a step-by-step guide',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 申請雇主識別號碼（Get an employer identification number）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number' },
    { label: 'IRS — Form SS-4 填寫說明（Instructions for Form SS-4）', url: 'https://www.irs.gov/instructions/iss4' },
    { label: 'IRS — 你需要新的 EIN 嗎？（Do you need a new EIN?）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/do-you-need-a-new-ein' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'IRS 對 EIN 申請流程有清楚的說明，流程也相當簡單。負責人（Responsible Party）沒有 SSN 或 ITIN 的申請人不能線上申請，必須以傳真或郵寄申請（如果企業在美國沒有主要營業地點，也可以電話申請）。',
  persona:       ['新創業的老闆', 'LLC 負責人', '要開立企業帳戶的接案者', '正在創立小型企業的人'],
  relatedJourney: ['創業或經營小型企業', '剛成立 LLC'],
  actionRequired: '如果你需要 EIN，現在就到 IRS.gov/ein 線上申請 — 大約 15 分鐘，EIN 會立即核發。開始前先準備好你的 SSN 或 ITIN，以及你的企業類型。',
}

const FAQS = [
  {
    q: '申請 EIN 要付費嗎？',
    a: '不用。直接透過 IRS 在 IRS.gov/ein 申請 EIN 完全免費。小心那些收費「協助」你申請的第三方網站 — 它們與 IRS 無關，你也不需要它們的服務。IRS 的申請流程很簡單，大約 15 分鐘。',
  },
  {
    q: '沒有社會安全號碼可以申請 EIN 嗎？',
    a: '可以。如果你有 ITIN，只要你的企業是在美國（或美國屬地）成立，而且主要營業地點也在那裡，就可以使用線上申請。如果負責人既沒有 SSN 也沒有 ITIN，就不能線上申請 — 請改用 Form SS-4 以傳真或郵寄申請。如果你的企業在美國或美國屬地沒有法定住所、主要營業地點或主要辦公室，也可以打電話申請：267-941-1099（非免付費電話），週一至週五美東時間上午 6 點至晚上 11 點，通話時就能拿到 EIN。',
  },
  {
    q: '我是沒有員工的獨資經營者，需要 EIN 嗎？',
    a: '不一定。沒有員工、也沒有退休計畫的獨資經營者（Sole Proprietor），可以用自己的 SSN 作為稅籍號碼。不過，許多企業老闆還是偏好申請 EIN，以便：區分企業與個人財務、避免把 SSN 提供給客戶與廠商、開立企業銀行帳戶（有些銀行要求 EIN），以及建立專業的企業形象。EIN 免費，而且只要 15 分鐘 — 沒什麼理由不申請。',
  },
  {
    q: '我弄丟了 EIN，要怎麼找回來？',
    a: '先看看這些地方：IRS 原本寄給你的確認信（CP 575）、以前年度的企業稅表、企業銀行帳戶的文件，或任何顯示你 EIN 的 1099 表格。如果還是找不到，請打電話到 IRS 企業與專業稅務專線（Business & Specialty Tax Line）800-829-4933。他們在驗證你的身分後可以幫你查詢。',
  },
  {
    q: '如果我更改企業名稱或地址，需要新的 EIN 嗎？',
    a: '不需要。更改名稱或地址不需要新的 EIN。你可以在下一份稅表上勾選適當的欄位，或寫信給 IRS 來更新企業名稱。營業地址變更請用 Form 8822-B 申報。一般只有在實體的所有權或結構改變時才需要新的 EIN — 例如獨資經營者成立公司或合夥事業，或合夥事業結束、另成立新的合夥事業。合夥事業的所有權變動如果沒有讓合夥事業結束，就不需要新的 EIN。',
  },
  {
    q: '我可以為還沒開始營業的企業申請 EIN 嗎？',
    a: '可以。你可以為尚未營業的企業申請 EIN。許多人在成立 LLC 時就申請 EIN — 甚至在還沒開始賺錢之前 — 以便開立企業銀行帳戶。申請時會問你企業開始或預計開始的日期；你可以填寫未來的日期。',
  },
  {
    q: '我有好幾個事業，每一個都需要不同的 EIN 嗎？',
    a: '要看結構。每一個獨立的法律實體（每一家 LLC、每一家公司）都需要自己的 EIN。如果你以個人名義、以獨資方式經營多個事業，可能可以使用同一個 EIN。不過，如果你為不同的事業成立了不同的 LLC，每一家 LLC 都需要自己的 EIN。這也是為什麼企業結構的決定從一開始就很重要。',
  },
]

const RELATED = [
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  '成立 LLC 之後，EIN 是你最先需要的東西之一。如果還沒成立 LLC，從這裡開始。',
  },
  {
    href:  '/library/business-formation/llc-vs-scorp',
    cat:   'Business Formation',
    title: 'LLC 與 S-Corp：哪種適合你的企業？',
    desc:  '拿到 EIN 之後，下一個企業結構的決定，是要不要選擇 S-Corp 課稅。',
  },
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '拿到 EIN、開好企業帳戶之後，接著建立你的季度繳稅制度。',
  },
]

const STEPS = [
  {
    num:    '01',
    title:  '前往 IRS 官方 EIN 申請頁面',
    detail: '前往 IRS.gov/ein。這是唯一官方、免費的申請管道。不要使用任何其他網站 — 第三方網站會為 IRS 直接免費提供的服務收費。',
    tip:    '加入書籤：https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
    color:  'var(--navy)',
  },
  {
    num:    '02',
    title:  '點選「Apply Online Now」',
    detail: '線上申請的開放時間為美東時間：週一至週五上午 6 點至隔天凌晨 1 點、週六上午 6 點至晚上 9 點、週日晚上 6 點至午夜。你必須一次完成整份申請 — 無法儲存後再繼續。請預留 15–20 分鐘不受打擾的時間。',
    tip:    '閒置 15 分鐘後連線會逾時，就必須重新開始。',
    color:  'var(--navy)',
  },
  {
    num:    '03',
    title:  '選擇你的企業類型',
    detail: '選擇你要申請的企業類型。最常見的選項：獨資（Sole Proprietor，你個人，沒有 LLC）、LLC（如果你已經成立）、公司（Corporation）、合夥（Partnership）。如果你有 LLC，即使是單一成員 LLC，也要選「Limited Liability Company」。',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '04',
    title:  '回答有關企業的問題',
    detail: '會問你：為什麼申請 EIN（成立新事業、開立銀行帳戶、雇用員工等）、企業所在的州、以前是否有過 EIN，以及企業開始或將要開始的日期。',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '05',
    title:  '輸入你的個人資料',
    detail: '你必須提供負責人的姓名與社會安全號碼或 ITIN。「負責人」是控制這個實體的人 — 單一成員 LLC 通常就是唯一的擁有人。IRS 要求這些資料來驗證身分並防止詐騙。',
    tip:    '如果負責人沒有 SSN 或 ITIN，就不能使用線上申請。請用 Form SS-4 以傳真或郵寄申請 — 或者，如果你的企業在美國沒有主要營業地點，可以打 267-941-1099 電話申請。',
    color:  '#DC2626',
  },
  {
    num:    '06',
    title:  '檢查並送出',
    detail: '仔細檢查你所有的資料。送出之後，有些資料（例如企業類型）不容易更改。確認企業名稱的拼法與你的 LLC 成立文件完全一致。',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '07',
    title:  '立即取得 EIN',
    detail: '送出後，EIN 會立即顯示在畫面上。把確認頁（CP 575）下載並存成 PDF。這是你正式的 EIN 指派通知 — 開立企業銀行帳戶時會需要，客戶、廠商與金融機構也可能要求提供。',
    tip:    '把 CP 575 PDF 存放在安全的地方。如果弄丟了，必須打電話給 IRS 才能補回。',
    color:  'var(--green)',
  },
]

const NEED_EIN = [
  { need: true,  situation: '你成立了 LLC 或公司' },
  { need: true,  situation: '你想開立企業銀行帳戶' },
  { need: true,  situation: '你已經或打算雇用員工' },
  { need: true,  situation: '你有 Keogh 計畫或個人 401(k)（solo 401(k)）' },
  { need: true,  situation: '你不想把 SSN 提供給客戶' },
  { need: true,  situation: '你經營合夥事業（多位擁有人）' },
  { need: false, situation: '沒有員工、沒有退休計畫、不介意使用 SSN 的獨資經營者' },
  { need: false, situation: '為同一個實體申請第二個 EIN（每個實體只需要一個）' },
]

export default function EINZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '如何申請 EIN：逐步指南 | AskLinTax 繁體中文',
      description: '在 IRS.gov 免費申請 EIN（雇主識別號碼），只要 15 分鐘。本指南逐步說明線上申請的每個步驟、誰需要 EIN，以及沒有 SSN 時該怎麼辦。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是 EIN？</h2>
        <p>
          EIN — 雇主識別號碼（Employer Identification Number）— 是 IRS 指派給你的企業、用於稅務識別的九位數號碼。可以把它想成企業的社會安全號碼。
        </p>
        <p>
          雖然名稱裡有「雇主」，但你不需要有員工才能申請 EIN。一人企業、單一成員 LLC 與接案者都很常使用 EIN — 主要是為了開立企業銀行帳戶、避免提供個人 SSN，以及建立獨立的企業身分。
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '28px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', fontWeight: '500' }}>社會安全號碼（SSN）</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'monospace', letterSpacing: '.05em' }}>XXX-XX-1234</div>
              <div style={{ fontSize: '13px', color: 'var(--light)', marginTop: '6px' }}>識別你這個人</div>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'var(--gold)', fontWeight: '400' }}>→</div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', fontWeight: '500' }}>雇主識別號碼（EIN）</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'monospace', letterSpacing: '.05em' }}>XX-XXXXXXX</div>
              <div style={{ fontSize: '13px', color: 'var(--light)', marginTop: '6px' }}>識別你的企業實體</div>
            </div>
          </div>
        </div>

        <h2>你需要 EIN 嗎？</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '24px 0' }}>
          {NEED_EIN.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 18px', background: item.need ? 'var(--green-soft)' : 'var(--cream)', border: `1px solid ${item.need ? 'rgba(22,163,74,.2)' : 'var(--border-l)'}`, borderRadius: '10px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.need ? '✅' : '⏭'}</span>
              <span style={{ fontSize: '15.5px', color: 'var(--mid)' }}>{item.situation}</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '600', color: item.need ? 'var(--green)' : 'var(--muted)', flexShrink: 0 }}>{item.need ? '申請 EIN' : '可選擇'}</span>
            </div>
          ))}
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 不確定的話，就申請一個</div>
          <p>EIN 免費，而且只要 15 分鐘。即使你今天嚴格來說不需要，現在申請 EIN，就不用等到要開銀行帳戶或簽合約時才手忙腳亂。沒有理由不申請。</p>
        </div>

        <h2>逐步說明：如何線上申請</h2>
        <p>
          IRS.gov 的線上申請是最快、最簡單的方式。完成後會立即拿到 EIN。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '28px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0', borderBottom: i < STEPS.length - 1 ? '1px solid var(--border-l)' : 'none', background: i === STEPS.length - 1 ? 'var(--green-soft)' : i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              {/* Number */}
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderRight: '1px solid var(--border-l)', paddingTop: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{step.num}</span>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '18px 20px', flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: step.color === 'var(--green)' ? 'var(--green)' : 'var(--navy)', marginBottom: '6px' }}>{step.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72', marginBottom: step.tip ? '10px' : '0' }}>{step.detail}</div>
                {step.tip && (
                  <div style={{ fontSize: '13.5px', color: step.color === '#DC2626' ? '#991b1b' : 'var(--muted)', background: step.color === '#DC2626' ? 'var(--red-soft)' : 'rgba(27,45,79,.05)', padding: '8px 12px', borderRadius: '8px', borderLeft: `3px solid ${step.color}`, overflowWrap: 'anywhere' }}>
                    {step.color === '#DC2626' ? '⚠️ ' : '💡 '}{step.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2>其他申請方式</h2>
        <p>
          如果你無法使用線上申請（沒有 SSN、瀏覽器問題或個人偏好），還有其他方式：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>方式</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>怎麼申請</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>處理時間</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>適合</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['線上（建議）', 'IRS.gov/ein — 美東時間週一至週五上午 6 點至凌晨 1 點、週六上午 6 點至晚上 9 點、週日晚上 6 點至午夜', '立即', '負責人有 SSN 或 ITIN 的美國企業'],
                ['電話', '撥打 267-941-1099 — 美東時間週一至週五上午 6 點至晚上 11 點', '立即（通話時提供 EIN）', '在美國沒有主要營業地點的企業'],
                ['傳真', '填寫 Form SS-4，傳真到你所在州的 IRS 傳真號碼', '4 個工作天', '偏好紙本的人'],
                ['郵寄', '填寫 Form SS-4，寄到你所在州的 IRS 地址', '約 4 週', '最後的選擇'],
              ].map(([method, how, time, best], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{method}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{how}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 0 ? '600' : '400', color: i === 0 ? 'var(--green)' : 'var(--mid)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{time}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>拿到 EIN 之後要做什麼</h2>
        <ol>
          <li><strong>保存你的 CP 575 信函</strong> — 下載並保存 PDF 確認頁。這是 IRS 正式指派 EIN 的文件。銀行、廠商與政府機關可能會要求查看。</li>
          <li><strong>開立企業銀行帳戶</strong> — 帶著你的 EIN、LLC 成立文件（如適用）與政府核發的身分證件。大多數大型銀行可以當天開立企業帳戶。</li>
          <li><strong>如果你是承包商，更新你的 W-9</strong> — 提供給客戶的 W-9 應該使用 EIN，而不是個人 SSN。這可以避免你的 SSN 被不必要地分享。</li>
          <li><strong>設定會計軟體</strong> — 把你的 EIN 輸入 QuickBooks、FreshBooks 或你使用的任何軟體。它會出現在發票與稅務文件上。</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 小心 EIN 詐騙網站</div>
          <p>許多網站收取 $50–$300 來「協助」你申請 EIN。這些網站與 IRS 無關。IRS 的申請在 IRS.gov/ein 免費，只要 15 分鐘。如果你所在的網站要求你付款才能申請 EIN，那就是錯誤的網站。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

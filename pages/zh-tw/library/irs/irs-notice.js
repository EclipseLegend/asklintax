import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-notice.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-notice',
  sourceHash:      'c221004b9816',
  id:            '01',
  title:         '我收到 IRS 的信，該怎麼辦？',
  titleEn:       'I received an IRS letter. What do I do?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 了解你的 IRS 通知或信函（Understanding your IRS notice or letter）', url: 'https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter' },
    { label: 'IRS — 了解你的 CP14 通知（Understanding your CP14 notice）', url: 'https://www.irs.gov/individuals/understanding-your-cp14-notice' },
    { label: 'IRS — 了解你的 CP504 通知（Understanding your CP504 notice）', url: 'https://www.irs.gov/individuals/understanding-your-cp504-notice' },
    { label: 'IRS — 了解你的 CP12 通知（Understanding your CP12 notice）', url: 'https://www.irs.gov/individuals/understanding-your-cp12-notice' },
    { label: 'IRS — 如何確認真的是 IRS 打電話或上門（How to know it’s really the IRS calling or knocking on your door）', url: 'https://www.irs.gov/newsroom/how-to-know-its-really-the-irs-calling-or-knocking-on-your-door' },
    { label: 'IRS — 檢舉網路釣魚與線上詐騙（Report phishing and online scams）', url: 'https://www.irs.gov/privacy-disclosure/report-phishing' },
    { label: 'IRS — 罰款（Penalties）', url: 'https://www.irs.gov/payments/penalties' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋最常見的通知類型。查帳、留置權、強制執行（Levy）與法律行動，需要專業人士個案評估。',
  persona:       ['收到 IRS 信件的人', '不熟悉 IRS 流程的新移民', '小型企業老闆'],
  relatedJourney: ['收到 IRS 的信', '處理稅務問題'],
  actionRequired: '找到信上印的回覆截止日，現在就記在行事曆上。然後閱讀本指南，了解 IRS 要求你做什麼。',
}

const NOTICE_TYPES = [
  { code: 'CP2000', color: '#F59E0B', urgency: '需要檢視', title: '收入不一致通知',    desc: 'IRS 發現你申報的內容，與你的雇主或銀行申報的內容不同。這是最常見的通知之一 — 不是查帳。', action: '檢視這項差異。如果你同意，依指示繳款或調整。如果你不同意，以書面回覆並附上文件。' },
  { code: 'CP14',   color: '#DC2626', urgency: '有欠稅',      title: '你有應繳餘額',       desc: '你有尚未繳納的稅款。利息與罰款正在累積。', action: '在 IRS.gov/payments 線上繳清餘額，或打電話申請分期付款。不要置之不理 — 罰款增加得很快。' },
  { code: 'CP501',  color: '#DC2626', urgency: '提醒',         title: '應繳餘額提醒',      desc: '提醒你還有未繳餘額。通常在 CP14 之後寄出。', action: '與 CP14 相同 — 立刻繳款或安排分期付款。' },
  { code: 'CP503',  color: '#7C3AED', urgency: '第二次提醒',     title: '第二次應繳餘額通知',    desc: '第二次提醒。IRS 可能正在準備採取催收行動。', action: '現在就處理。在 IRS 升級到留置權或強制執行之前，聯絡 IRS 繳款或安排分期付款。' },
  { code: 'CP504',  color: '#7C3AED', urgency: '緊急',           title: '強制執行意向通知',        desc: '這是 IRS 對你的薪資、銀行帳戶或州退稅進行強制執行（扣押）前的最後提醒。IRS 也可以申報聯邦稅務留置權通知（Notice of Federal Tax Lien）。情況很嚴重。', action: '立刻回應。全額繳清、申請分期付款，或聯絡稅務專業人士。你能採取行動的時間有限。' },
  { code: 'CP12',   color: '#16A34A', urgency: '好消息',        title: '計算錯誤 — 退稅金額變更',  desc: 'IRS 更正了你稅表上的一個或多個錯誤，因此你的退稅金額有所變更。', action: '檢視變更內容。如果你同意，不需要回覆。如果你不同意，請在通知上的日期前，撥打通知上的電話聯絡 IRS。' },
]

const FAQS = [
  { q: '收到 IRS 的信，代表我做錯了什麼嗎？', a: '不一定。IRS 寄信的原因很多都是例行性的 — 確認你的身分、索取缺少的文件、通知你計算上的調整，或提醒你即將到來的截止日。大多數信件並不代表有嚴重的問題。' },
  { q: '我有多久時間可以回覆？', a: '截止日依通知而不同，而且印在信上 — 找「You must respond by」之類的字句或具體日期。立刻記在行事曆上。錯過截止日可能導致額外的罰款與利息。' },
  { q: '如果我付不出 IRS 說我欠的金額，怎麼辦？', a: '不要置之不理。如果無法全額繳清，你可以直接向 IRS 申請分期付款（Installment Agreement）。可以在 IRS.gov 線上申請，或撥打通知上的電話。及早處理可以減少罰款，也展現誠意。' },
  { q: '我可以自己處理，還是需要 CPA？', a: '要看情況。簡單的通知 — 例如你同意的小額 CP2000 差異，或你付得起餘額的 CP14 — 通常可以自己處理。涉及查帳、大額金額、多個年度或法律行動的複雜情況，則需要專業協助。' },
  { q: '如果信看起來很可疑，會不會是詐騙？', a: 'IRS 大多數的聯繫都是從一般郵件開始，而且不會在沒有你同意的情況下寄電子郵件或簡訊給你。在 IRS.gov 上查詢通知編號（印在信的右上角），或撥打 800-829-1040 確認。IRS 不會打電話要求你立刻用禮物卡、預付簽帳卡或電匯付款，也不會威脅要逮捕你或把你驅逐出境。' },
  { q: '我收到這份通知，但英文不太好，該怎麼辦？', a: 'IRS 提供部分非英語的資料，但大多數通知是英文的。IRS 提供電話口譯服務（Over-the-Phone Interpreter），涵蓋的語言包括國語（Mandarin）與粵語（Cantonese）。你也可以把信帶給值得信任、會雙語的稅務專業人士，在回覆前先幫你了解內容。' },
]

const RELATED = [
  {
    href:  '/library/irs/cp2000',
    cat:   'IRS & Tax Issues',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  'CP2000 是最常見的 IRS 通知之一。這是了解與回覆它的逐步指南。',
  },
  {
    href:  '/library/individual/new-immigrant',
    cat:   'Individuals & Families',
    title: '剛來美國？新移民完整報稅指南',
    desc:  '剛接觸美國稅制時，收到 IRS 的信特別讓人緊張。這份指南涵蓋你頭幾年需要知道的一切。',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '了解你的稅務居民身分，可以幫你知道 IRS 對你的期待 — 以及你為什麼可能收到通知。',
  },
]

export default function IRSNoticeZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout
      t={t}
      locale="zh-tw"
      meta={{
        title: '我收到 IRS 的信，該怎麼辦？ | AskLinTax 繁體中文',
        description: '大多數 IRS 通知都是例行性的。不要驚慌 — 這裡說明如何閱讀信件、辨識通知類型，並決定下一步。給華人家庭的白話指南。',
      }}
    >
      <KnowledgePage
        meta={META}
        faqs={FAQS}
        openFaq={openFaq}
        toggleFaq={toggleFaq}
        relatedArticles={RELATED}
        locale="zh-tw"
      >

        <h2>首先：不要驚慌。原因在這裡。</h2>
        <p>
          IRS 寄信的原因很多都是例行性的。大多數都不是緊急狀況 — 而是例行調整、提醒、索取缺少的資料或確認。收到信並不代表你遇上了嚴重的麻煩，也不代表你正在被調查。
        </p>
        <p>
          話雖如此，你絕對不應該忽視 IRS 的信。即使是例行通知也有回覆截止日，錯過了可能讓小問題變成大問題。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 立刻要做的三個步驟</div>
          <p>在做任何事之前：</p>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li><strong>步驟 1：</strong>找到通知編號 — 在信的右上角。看起來像「CP2000」或「LTR 4883C」。</li>
            <li><strong>步驟 2：</strong>找到回覆截止日 — 印在第一頁。現在就記在行事曆上。</li>
            <li><strong>步驟 3：</strong>先不要打電話給任何人。先把信完整讀完。</li>
          </ul>
        </div>

        <h2>如何閱讀 IRS 通知</h2>
        <p>
          每一封 IRS 信件的基本結構都一樣。只要知道要看哪裡，就沒那麼可怕了。
        </p>

        {/* Letter Diagram (IRS letters are in English, so the sample stays in English) */}
        <div style={{ margin: '28px 0' }}>
          <div lang="en" style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(27,45,79,.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px 24px 16px', borderBottom: '1px solid var(--border-l)', background: 'var(--cream)' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--navy)' }}>Internal Revenue Service</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Department of the Treasury</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {[
                  ['Notice:', 'CP2000', true, '← 通知編號'],
                  ['Tax Year:', '2024', false, ''],
                  ['Notice Date:', 'April 1, 2026', false, ''],
                  ['SSN/EIN:', 'XXX-XX-1234', false, ''],
                  ['Respond by:', 'May 15, 2026', true, '← 截止日'],
                ].map(([label, value, highlight, note], i) => (
                  <div key={i} style={{ fontSize: '13px', color: 'var(--mid)', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--muted)' }}>{label}</span>{' '}
                    <span style={highlight ? { fontWeight: '600', color: 'var(--navy)', background: 'rgba(201,150,58,.12)', padding: '1px 6px', borderRadius: '4px' } : {}}>{value}</span>
                    {note && <span lang="zh-Hant" style={{ color: 'var(--gold)', fontSize: '11.5px', marginLeft: '6px' }}>{note}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: 0 }}>
                <strong>Dear Taxpayer,</strong><br />
                We have information that doesn't match what you reported on your tax return for the tax year shown above. The changes we are proposing to your return are shown below...
              </p>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
            每一封 IRS 信件都是這種結構。通知編號印在右上角，回覆日期也會出現在通知上。
          </p>
        </div>

        <h2>最常見的 IRS 通知 — 以及代表的意思</h2>
        <p>
          通知編號（例如 CP2000 或 CP14）會告訴你 IRS 為什麼寫信給你。以下是華人家庭最常收到的通知：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', margin: '24px 0' }}>
          {NOTICE_TYPES.map(notice => (
            <div key={notice.code} style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border)', padding: '18px 18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--border-l)', borderLeft: `4px solid ${notice.color}`, paddingLeft: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'monospace', color: notice.color }}>{notice.code}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', padding: '3px 9px', borderRadius: '100px', background: notice.color + '18', color: notice.color }}>{notice.urgency}</div>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{notice.title}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '10px' }}>{notice.desc}</p>
              <div style={{ fontSize: '13px', color: 'var(--mid)', lineHeight: '1.6', background: 'var(--cream)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--navy)' }}>該怎麼做：</strong>{notice.action}
              </div>
            </div>
          ))}
        </div>

        <h2>自己處理，還是尋求專業協助？</h2>
        <p>
          這是讀完通知後最重要的決定。以下是一個簡單的判斷方式：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>你的情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>建議</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['你了解並同意的簡單差異', '✅ 通常可以自己處理 — 依照通知上的指示'],
                ['你同意 IRS 的說法，只需要繳款', '✅ 在 IRS.gov/payments 線上繳款，或申請分期付款'],
                ['你看不懂通知，或讀不懂英文', '🤝 回覆前請會雙語的稅務專業人士幫你檢視'],
                ['你不同意 IRS，想要爭議金額', '🤝 諮詢 CPA — 爭議方式不對可能讓情況更糟'],
                ['通知涉及查帳、留置權、強制執行或法律行動', '⚠️ 立刻諮詢稅務專業人士 — 不要拖'],
                ['欠稅金額很大，或通知涉及多個年度', '⚠️ 強烈建議尋求專業協助'],
              ].map(([situation, rec], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>如果你懷疑是詐騙</h2>
        <p>
          很遺憾，針對中文社群的稅務詐騙很常見。以下說明如何分辨真的 IRS 通知與詐騙：
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">🚨 警告：這些是詐騙的跡象</div>
          <p>IRS 不會：</p>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>在沒有你同意的情況下寄電子郵件或簡訊給你，或在社群媒體上傳私訊給你</li>
            <li>打電話要求你用特定方式立刻付款，例如禮物卡、預付簽帳卡或電匯</li>
            <li>威脅要找警察或移民官員，因為你沒有繳款就逮捕你</li>
            <li>不給你質疑或申訴欠稅金額的機會，就要求你付款</li>
          </ul>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">✅ 如何確認是真的 IRS 信件</div>
          <p>IRS 大多數的聯繫都是從一般郵件開始，每一份通知或信函的右上角都有 CP 或 LTR 編號。你可以直接撥打 IRS 電話 <strong>1-800-829-1040</strong>，或到 IRS.gov 搜尋通知編號，來確認任何通知。</p>
        </div>

        <h2>大家最常犯的錯誤</h2>
        <p>
          不是回覆錯了，甚至也不是繳錯了金額。
        </p>
        <p>
          <strong>最大的錯誤是完全不理會通知。</strong>
        </p>
        <p>
          許多人 — 特別是對英文或稅制感到不自在的人 — 看到 IRS 的信就不知所措。他們把信放在一旁，希望問題會自己消失。它不會。通知沒有回覆的期間，利息與罰款可能持續累積，錯過截止日也可能讓你失去申訴的權利。
        </p>
        <p>
          即使你不知道該怎麼做，第一步永遠一樣：讀通知、找截止日，並在截止日前回覆或尋求協助。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

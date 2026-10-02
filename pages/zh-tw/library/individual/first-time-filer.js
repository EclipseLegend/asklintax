import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/first-time-filer.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'first-time-filer',
  sourceHash:      'cdbb989e8b62',
  id:            '07',
  title:         '在美國第一次報稅：完整步驟指南',
  titleEn:       'First-time filer in the U.S.: a complete step-by-step guide',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — IRS 免費報稅（IRS Free File）', url: 'https://www.irs.gov/filing/irs-free-file-do-your-taxes-for-free' },
    { label: 'IRS — 申請延期申報稅表（Get an extension to file your tax return）', url: 'https://www.irs.gov/filing/get-an-extension-to-file-your-tax-return' },
    { label: 'IRS — 退稅（Refunds）', url: 'https://www.irs.gov/refunds' },
    { label: 'IRS — 未申報罰款（Failure to file penalty）', url: 'https://www.irs.gov/payments/failure-to-file-penalty' },
    { label: 'IRS Publication 17 — 你的聯邦所得稅（Your Federal Income Tax）', url: 'https://www.irs.gov/publications/p17' },
    { label: 'IRS — Topic no. 154，Form W-2 與 Form 1099-R（資料錯誤或沒有收到時該怎麼辦）', url: 'https://www.irs.gov/taxtopics/tc154' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋居民外國人與美國公民的一般報稅流程。非居民外國人（F-1、J-1）使用 Form 1040-NR — 步驟類似，但表格與部分規則不同。',
  persona:       ['第一次報稅的人', '第一次報稅的新移民', '有第一份工作的大學生', '從來沒有申報過美國稅表的人'],
  relatedJourney: ['第一次報稅', '剛到美國'],
  actionRequired: '在做任何事之前，先準備好你的文件（下方步驟 1）。大多數第一次報稅卡住的人，都是因為還沒準備好需要的東西就開始報稅。',
}

const FAQS = [
  {
    q: '第一次報稅要花多少時間？',
    a: '簡單的稅表 — 一份工作、一份 W-2、標準扣除額 — 用報稅軟體大約要 1–3 小時。第一年一定會比較久，因為你在學習流程。之後幾年，同樣的稅表可能只要 30–60 分鐘，因為你知道會遇到什麼，軟體也會帶入你前一年的資料。',
  },
  {
    q: '我需要請 CPA，還是可以自己報？',
    a: '許多情況簡單的第一次報稅者 — 一份 W-2、沒有自雇收入、沒有複雜的投資 — 都能用 TurboTax、H&R Block 或 IRS Free File 這類報稅軟體順利申報。不過，如果你的情況比較複雜（自雇收入、多個州、股票選擇權、海外收入，或雙重身分年度），請 CPA 是值得的。第一年的錯誤可能在之後幾年造成問題。',
  },
  {
    q: '什麼是標準扣除額？我應該使用嗎？',
    a: '標準扣除額（Standard Deduction）是一個固定金額，你不需要列舉個別費用，就可以從收入中扣除。2025 稅務年度，單身申報人為 $15,750。大多數第一次報稅的人都應該使用標準扣除額 — 比較簡單，而且對剛起步的人來說，通常比分項扣除的總和還高。只有在你符合資格的費用（房貸利息、州稅、慈善捐款等）超過標準扣除額時，分項扣除（Itemizing）才划算。',
  },
  {
    q: '如果我的稅表填錯了，怎麼辦？',
    a: '錯誤是可以修正的。如果你在申報後發現錯誤，可以用 Form 1040-X 申報修正稅表（Amended Return）。修正稅表不會被罰款 — IRS 本來就預期每年都會有一些修正。常見的修正原因：漏報收入、報稅身分選錯，或漏掉了符合資格的抵稅額。要申請退稅，一般必須在原稅表申報後 3 年內，或繳稅後 2 年內（以較晚者為準）申報修正稅表。',
  },
  {
    q: '我什麼時候會拿到退稅？',
    a: '如果你電子申報並選擇直接存款，大多數退稅會在 21 天內入帳。紙本稅表比較久 — 一般在寄出紙本稅表約 4 週後才能查詢退稅狀態。你可以在 IRS.gov/refunds 用你的社會安全號碼、報稅身分與稅表上的確切退稅金額查詢退稅進度。IRS 每天更新查詢系統。',
  },
  {
    q: '如果我在截止日前付不出欠稅，怎麼辦？',
    a: '即使付不出來，也要按時報稅。未申報罰款（每月 5%）比未繳納罰款（每月 0.5%）高得多。按時報稅並盡量繳納，可以大幅減少你的總罰款。接著你可以在網路上向 IRS 申請分期付款 — 這叫做分期付款協議（Installment Agreement），在 IRS.gov 申請大約只要 10 分鐘。',
  },
  {
    q: '我有多個收入來源 — 一份工作、一些接案，還有一點利息收入。我的稅表還算簡單嗎？',
    a: '比單純只有 W-2 的稅表複雜，但用軟體還是可以處理。接案或自雇收入（1099-NEC，或沒有任何表格）需要填 Schedule C，你也要就淨利繳自雇稅。利息收入會在 1099-INT 上申報。報稅軟體會處理這一切 — 你只要回答問題。如果你的自雇收入不少（超過 $10,000），可以考慮諮詢 CPA，確保你申請了所有可用的扣除。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '不確定是否需要報稅？開始之前，先確認你報稅身分的收入門檻。',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '你的居民身分決定你要申報哪一份表格。開始報稅前先確認這一點。',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '了解兩者的差別，可以幫你在第一份稅表上找到減少應繳稅額的機會。',
  },
]

const STEPS = [
  {
    num: '01',
    title: '準備你的文件',
    color: 'var(--navy)',
    items: [
      { label: 'W-2', desc: '今年你工作過的每一位雇主都會寄。應該在 1 月 31 日前寄到。' },
      { label: '1099-NEC', desc: '如果你做了接案或承包工作。任何付給你 $600 以上的客戶都會寄。' },
      { label: '1099-INT', desc: '如果你有利息收入，由你的銀行寄出。即使金額很小也要申報。' },
      { label: '1099-DIV', desc: '如果你有投資股利。' },
      { label: '1099-B', desc: '如果你賣了股票、加密貨幣或其他投資。' },
      { label: '社會安全號碼或 ITIN', desc: '稅表上的每一個人都需要，包括受扶養人。' },
      { label: '銀行帳戶資料', desc: '退稅直接存款用的銀行代碼（Routing Number）與帳號。' },
      { label: '前一年的稅表（如果有）', desc: '可以作為參考；有些軟體會問你前一年的 AGI。' },
    ],
  },
  {
    num: '02',
    title: '選擇你的報稅身分',
    color: '#7C3AED',
    items: [
      { label: '單身（Single）', desc: '在稅務年度的 12 月 31 日時未婚。' },
      { label: '夫妻合併申報（Married Filing Jointly）', desc: '已婚夫妻最常用 — 通常稅最低。' },
      { label: '夫妻分開申報（Married Filing Separately）', desc: '有時有利，但通常稅比較高。' },
      { label: '戶長（Head of Household）', desc: '未婚、支付了住所一半以上的費用，而且有符合資格的受扶養人。' },
    ],
  },
  {
    num: '03',
    title: '選擇報稅方式',
    color: 'var(--gold)',
    items: [
      { label: 'IRS Free File', desc: '如果你的 AGI 在 $89,000 以下，可以免費使用引導式軟體申報 2025 年稅表。在 IRS.gov/freefile 使用 IRS 合作廠商的軟體。' },
      { label: '報稅軟體（TurboTax、H&R Block 等）', desc: '需要付費但有引導 — 會問你問題並幫你填表。適合大多數情況。' },
      { label: 'CPA 或稅務專業人士', desc: '最適合複雜的情況：自雇、海外收入、多個州，或雙重身分年度。' },
      { label: 'IRS Direct File（已暫停）', desc: '美國財政部表示，IRS 將暫停 Direct File，改以 IRS Free File 等計畫提供免費報稅。' },
    ],
  },
  {
    num: '04',
    title: '完成你的稅表',
    color: 'var(--green)',
    items: [
      { label: '申報所有收入', desc: '輸入每一份 W-2、1099 與任何其他收入 — 包括現金收入與小費。' },
      { label: '選擇標準扣除額或分項扣除', desc: '大多數第一次報稅的人使用標準扣除額（2025 年單身 $15,750）。' },
      { label: '申請你的抵稅額', desc: '常見的抵稅額：兒童抵稅額、勞動所得抵稅額、教育抵稅額。軟體會問你。' },
      { label: '送出前檢查', desc: '再確認一次你的姓名、SSN、銀行資料與收入總額。這些地方最常出錯。' },
    ],
  },
  {
    num: '05',
    title: '申報與後續追蹤',
    color: '#16A34A',
    items: [
      { label: '電子申報處理最快', desc: '電子申報比紙本更快、更準確。大多數軟體都包含電子申報。' },
      { label: '保存一份稅表副本', desc: '下載並保存你的稅表（PDF）與申報確認。明年會用到。' },
      { label: '追蹤你的退稅', desc: '使用 IRS.gov/refunds 或 IRS2Go App。每天更新。大多數電子申報的退稅在 21 天內入帳。' },
      { label: '繳納欠稅', desc: '在 4 月 15 日前於 IRS.gov/payments 繳款，以避免罰款。如果無法全額繳清，請申請分期付款。' },
    ],
  },
]

export default function FirstTimeFilerZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '第一次報稅指南：如何申報美國稅表 | AskLinTax 繁體中文',
      description: '第一次申報美國稅表的完整步驟指南。涵蓋要準備哪些文件、如何選擇報稅方式、W-2 怎麼用，以及如何追蹤退稅。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>開始之前：先確認兩件事</h2>
        <p>
          如果你還沒確認，開始報稅前請先確認這兩件事：
        </p>
        <ul>
          <li><strong>你需要報稅嗎？</strong>請在我們的 <a href="/zh-tw/library/individual/do-i-need-to-file/">是否需要報稅指南</a> 中確認收入門檻。如果你的收入低於你報稅身分的門檻，你可能不需要報稅 — 不過如果有預扣稅款，通常還是應該報。</li>
          <li><strong>你要申報哪一份表格？</strong>如果你是居民外國人或美國公民，申報 Form 1040（本指南說明的內容）。如果你是非居民外國人（大多數 F-1 學生、J-1 訪問學者），則改為申報 Form 1040-NR。如果不確定，請參閱我們的 <a href="/zh-tw/library/individual/tax-residency/">稅務居民身分指南</a>。</li>
        </ul>

        <div className="callout callout-action">
          <div className="callout-title">✅ 最重要的第一步</div>
          <p>在打開任何報稅軟體之前，先準備好你的文件。報稅報到一半卡住，最常見的原因是少了一份 W-2，或手邊沒有銀行代碼。先做步驟 1 — 所有東西都在眼前時，其他步驟會快很多。</p>
        </div>

        <h2>申報第一份稅表的五個步驟</h2>

        {STEPS.map((step, si) => (
          <div key={si} style={{ margin: '32px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: step.color, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '400', color: 'rgba(255,255,255,0.5)', lineHeight: '1' }}>{step.num}</span>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#fff', margin: 0 }}>{step.title}</h3>
            </div>
            <div style={{ padding: '8px 0' }}>
              {step.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 24px', borderBottom: ii < step.items.length - 1 ? '1px solid var(--border-l)' : 'none', background: ii % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <div style={{ width: '8px', height: '8px', minWidth: '8px', borderRadius: '50%', background: step.color, marginTop: '9px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '16px', color: 'var(--navy)', display: 'block', marginBottom: '3px' }}>{item.label}</strong>
                    <span style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.65' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2>看懂你的 W-2</h2>
        <p>
          對大多數第一次報稅的人來說，W-2 是最重要的文件。雇主會在 1 月 31 日前寄出，申報你這一年的總薪資與預扣的稅款。
        </p>
        <p>
          需要知道的重要欄位：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0', width: '80px' }}>欄位</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>代表什麼</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Box 1', '應稅薪資總額 — 這是你受雇收入的總收入'],
                ['Box 2', '已預扣的聯邦所得稅 — 這是雇主已經代你繳給 IRS 的金額'],
                ['Box 3', '社會安全稅薪資'],
                ['Box 4', '已預扣的社會安全稅（Box 3 的 6.2%）'],
                ['Box 5', '聯邦醫療保險稅薪資'],
                ['Box 6', '已預扣的聯邦醫療保險稅（Box 5 的 1.45%）'],
                ['Box 12', '各種代碼 — 可能包括 401(k) 提撥、健康保險保費與其他福利'],
                ['Box 16–17', '州薪資與已預扣的州所得稅（用於州稅表）'],
              ].map(([box, meaning], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', whiteSpace: 'nowrap', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{box}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Box 2 是大多數人能拿到退稅的原因</div>
          <p>雇主會依你預估的應繳稅額，從每一份薪水中預扣稅款。Box 2 顯示這一年預扣的總額。如果預扣太多（只有一份工作、沒有複雜扣除的人很常見），超過的部分會退還給你。如果預扣太少，你就要補繳差額。</p>
        </div>

        <h2>標準扣除額與分項扣除：該選哪一個</h2>
        <p>
          每位報稅人都可以用<strong>標準扣除額</strong>或<strong>實際的分項扣除額</strong>來減少應稅所得 — 以較大者為準。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>標準扣除額（Standard Deduction）</h4>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--gold)', marginBottom: '12px' }}>$15,750</div>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>2025 稅務年度單身申報人的固定金額。不需要收據，直接選擇就好。</p>
            <p style={{ fontSize: '14px', color: 'var(--green)', fontWeight: '500' }}>✓ 最適合大多數第一次報稅的人</p>
          </div>
          <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px 20px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>分項扣除額（Itemized Deductions）</h4>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--navy)', marginBottom: '12px' }}>你的實際費用</div>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>加總符合資格的費用：房貸利息、州與地方稅（2025 年最高 $40,000，收入較高者上限較低）、慈善捐款等。</p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>只有總額超過 $15,750 時才划算</p>
          </div>
        </div>

        <h2>需要知道的重要截止日</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>日期</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>會發生什麼</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['2026 年 2 月 2 日', '雇主必須寄出你的 2025 年 W-2（1 月 31 日是星期六，所以截止日順延到下一個工作日）。請留意你的電子郵件與信箱。'],
                ['2026 年 4 月 15 日', '聯邦稅表截止日。即使申請延期，也要在這一天前繳清欠稅。'],
                ['2026 年 4 月 15 日', '申報 Form 4868 申請 6 個月延期的截止日（申報截止日延到 10 月 15 日）。'],
                ['2026 年 10 月 15 日', '延期後的申報截止日（如果你在 4 月 15 日前申報了 Form 4868）。'],
              ].map(([date, what], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', whiteSpace: 'nowrap', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{date}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 延期申報 ≠ 延期繳稅</div>
          <p>申報 Form 4868 讓你有更多時間提交稅表 — 但<strong>不會</strong>延長繳納欠稅的時間。如果你預期要補稅，仍然必須在 4 月 15 日前繳納估計的金額，以避免罰款與利息。即使還沒完成稅表，也可以先在 IRS.gov/payments 繳款。</p>
        </div>

        <h2>第一次報稅最常見的錯誤</h2>
        <ul>
          <li><strong>因為覺得太難而完全不報稅</strong> — 這是代價最高的錯誤。即使稅表不完美，也比沒有報好。先報出去，需要時再修正。</li>
          <li><strong>漏報部分收入</strong> — 每一份 W-2、每一份 1099，甚至沒有表格的收入（小費、現金收入、Venmo 收入）。IRS 會收到你所有 1099 與 W-2 的副本，少了什麼它會發現。</li>
          <li><strong>直接存款的銀行帳號填錯</strong> — 每一個數字都要再確認一次。如果帳號錯了，你的退稅會進到別人的帳戶，很難追回。</li>
          <li><strong>沒有保存副本</strong> — 把完成的稅表下載成 PDF 並保存。明年電子申報需要你前一年的調整後總收入（AGI），而且申請貸款、簽證等時也常需要稅表。</li>
          <li><strong>漏掉可退還的抵稅額</strong> — 許多第一次報稅的人不知道自己符合勞動所得抵稅額或教育抵稅額。報稅軟體會自動問到，但你要仔細回答問題。</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 第一份稅表最難</div>
          <p>每個第一次報稅的人都會覺得不知所措。好消息是：第二年會容易非常多。到那時你知道會收到哪些表格、要在哪裡輸入、要注意什麼。你在第一份稅表上投入的時間，會在之後的每一份稅表上得到回報。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

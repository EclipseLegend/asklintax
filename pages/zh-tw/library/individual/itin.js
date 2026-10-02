import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/itin.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'itin',
  sourceHash:      '9e27312e7c66',
  id: '18',
  title: '什麼是 ITIN？如何申請？',
  titleEn: 'What is an ITIN and how do I apply?',
  category: 'Individuals & Families',
  categoryHref: '/library/individual',
  userEmotion: 'learning',
  difficulty: 'Beginner',
  readTime: '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 個人納稅識別號碼（Individual Taxpayer Identification Number, ITIN）', url: 'https://www.irs.gov/individuals/individual-taxpayer-identification-number' },
    { label: 'IRS — Form W-7 填寫說明（Instructions for Form W-7）', url: 'https://www.irs.gov/instructions/iw7' },
  ],
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'ITIN 的申請流程相當明確。處理時間不一 — 請提早申請。認證接受代理人（Certified Acceptance Agent, CAA）可以查驗文件，你不必把正本寄給 IRS。',
  persona: ['F-1 學生', '沒有工作許可的受扶養配偶', '有美國收入的非居民外國人', '不符合 SSN 資格但有美國稅務義務的人'],
  relatedJourney: ['剛到美國', '沒有 SSN 的第一次報稅'],
  actionRequired: '如果你需要申報美國稅表，又不符合申請 SSN 的資格，請用 Form W-7 申請 ITIN。連同稅表與身分文件正本（或透過 CAA 認證的副本）一起提交。處理時間約 7 週 — 報稅季（1 月 15 日至 4 月 30 日）或從海外申請則為 9–11 週。',
}

const FAQS = [
  { q: '我可以用 ITIN 代替 SSN 工作嗎？', a: '不行。ITIN 只能用於稅務用途，不能用於就業 — 就業需要有工作許可的 SSN。ITIN 不會給你工作許可、社會安全福利，或大多數聯邦計畫的資格。不允許把 ITIN 用於就業用途。' },
  { q: '擁有 ITIN 會影響我的移民身分嗎？', a: '不會。ITIN 不會影響、改變或改善你的移民身分。ITIN 只能用於聯邦稅務用途，而且不論你的移民身分為何，都可以申請。' },
  { q: '我的 ITIN 好幾年沒用了，還有效嗎？', a: '如果 ITIN 在最近連續 3 個稅務年度中，沒有出現在至少一份美國聯邦稅表上，會在第三年的 12 月 31 日到期。過期的 ITIN 必須先更新，才能再用在聯邦稅表上。請用 Form W-7（勾選「Renew an Existing ITIN」）並附上有效的身分文件提出更新申請。除非你符合例外，更新申請必須附上美國聯邦稅表。' },
  { q: '用 ITIN 可以拿到退稅嗎？', a: '可以。你可以用 ITIN 收到聯邦退稅。不過，ITIN 持有人不符合勞動所得抵稅額（Earned Income Tax Credit, EITC）或兒童抵稅額（Child Tax Credit，需要有 SSN 的符合資格子女）的資格。其他某些抵稅額 — 例如兒童與受扶養人照顧抵稅額（Child and Dependent Care Credit）— 視你的情況可能可以申請。' },
  { q: '什麼是認證接受代理人（CAA）？', a: 'CAA 是經 IRS 授權、協助納稅人填寫 ITIN 申請並查驗身分文件的個人或企業。最大的好處是：CAA 可以認證你的文件副本，你不必把正本寄給 IRS — 安全得多。許多會計師事務所、稅務專業人士，以及部分大學的國際學生辦公室都是 CAA。可以在 IRS.gov 上查詢。' },
  { q: '我有 ITIN，但最近拿到了社會安全號碼，該怎麼辦？', a: '拿到 SSN 之後，往後所有稅務用途都應該使用 SSN。通知 IRS 你已取得 SSN，並希望註銷你的 ITIN：寫一封信給 IRS，內容包括你的姓名、ITIN、SSN，以及說明你已取得 SSN 的聲明。以前用 ITIN 申報的稅表仍然有效。' },
  { q: '我的配偶或子女可以以受扶養人身分申請 ITIN 嗎？', a: '可以，如果他們不符合申請 SSN 的資格，而且為了可享有的稅務優惠（Allowable Tax Benefit）列在你的美國稅表上（或自行申報稅表）。除此之外，配偶與受扶養人不符合申請 ITIN 的資格。每一位需要 ITIN 的人都要附上完整的 Form W-7，以及各自的身分與外國身分證明文件。' },
]

const RELATED = [
  { href: '/library/individual/new-immigrant', cat: 'Individuals & Families', title: '剛來美國？新移民完整報稅指南', desc: '最常需要 ITIN 的，是還不符合 SSN 資格的新移民。' },
  { href: '/library/individual/tax-residency', cat: 'Individuals & Families', title: '我是美國稅務居民嗎？', desc: '你的稅務居民身分決定你要申報哪一份表格 — 以及你需要 ITIN 還是 SSN。' },
  { href: '/library/individual/first-time-filer', cat: 'Individuals & Families', title: '在美國第一次報稅：完整步驟指南', desc: '拿到 ITIN 之後，這份指南帶你完成第一份美國稅表。' },
]

const ITIN_STEPS = [
  { num: '01', title: '填寫 Form W-7', detail: '從 IRS.gov 下載 Form W-7。填寫所有必填欄位，包括你的法定姓名、外國地址、出生日期與出生國，以及申請原因。華人移民最常見的申請原因：「Nonresident alien required to get an ITIN to claim tax treaty benefit」或「Resident alien filing a U.S. federal tax return」。' },
  { num: '02', title: '準備你的稅表（如適用）', detail: '多數申請人必須在 Form W-7 後附上已填好的稅表，證明需要 ITIN。更新申請也一樣。只有有限的例外 — 例如 Form W-7 填寫說明中列出的某些租稅協定優惠或第三方預扣情況。稅表上的 SSN／ITIN 欄位請留空 — ITIN 核發後會再填入。' },
  { num: '03', title: '準備身分文件', detail: '你必須同時證明身分與外國身分（Foreign Status）。有效護照本身就能同時滿足兩項要求 — 這是最簡單的選擇。如果你沒有護照，就需要兩份文件：一份證明身分（身分證、駕照），一份證明外國身分（簽證、外國出生證明）。所有文件都必須在有效期內（未過期）。' },
  { num: '04', title: '選擇提交方式', detail: '方式 A：把正本寄給 IRS（有風險 — 正本可能延誤或遺失）。方式 B：親自到 IRS 納稅人協助中心（Taxpayer Assistance Center）辦理。方式 C：透過認證接受代理人（CAA）— 他們當場查驗你的文件並認證副本，你完全不必寄出正本。如果文件很重要，強烈建議使用這種方式。' },
  { num: '05', title: '提交並等待', detail: 'IRS 說明處理時間約 7 週 — 報稅季（1 月 15 日至 4 月 30 日）或從海外申請則為 9–11 週。ITIN 核發後，你會收到一封載有 ITIN 的信（CP565）。如果你連同申請提交了稅表，稅表會在 ITIN 核發後處理。' },
]

export default function ITINZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{ title: '什麼是 ITIN？如何申請？ | AskLinTax 繁體中文', description: 'ITIN（個人納稅識別號碼）完整指南 — 誰需要、如何用 Form W-7 申請、處理時間，以及 ITIN 能做與不能做的事。' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是 ITIN？</h2>
        <p>ITIN — 個人納稅識別號碼（Individual Taxpayer Identification Number）— 是 IRS 核發給必須擁有美國納稅人識別號碼、但不符合申請社會安全號碼（SSN）資格者的稅務處理號碼。</p>
        <p>ITIN <strong>只能用於稅務用途</strong>。它不會給你工作許可、移民身分，或社會安全福利的資格。它的存在，是為了讓 IRS 能處理有美國稅務義務、但無法取得 SSN 的人的稅表與繳款。</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          <div style={{ background: 'var(--green-soft)', border: '1.5px solid rgba(22,163,74,.25)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--green)', marginBottom: '12px' }}>✅ 誰需要 ITIN</h4>
            {['有美國收入、必須申報的非居民外國人', '有非薪資美國收入的 F-1 或 J-1 學生', '不符合 SSN 資格的居民外國人', '美國公民或居民的受扶養配偶', '列在美國稅表上、沒有 SSN 的受扶養子女'].map((item, i) => (
              <div key={i} style={{ fontSize: '14.5px', color: 'var(--mid)', padding: '5px 0', display: 'flex', gap: '8px' }}><span style={{ color: 'var(--green)', flexShrink: 0 }}>·</span>{item}</div>
            ))}
          </div>
          <div style={{ background: 'var(--red-soft)', border: '1.5px solid rgba(220,38,38,.2)', borderRadius: '12px', padding: '20px 18px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--red)', marginBottom: '12px' }}>❌ ITIN 不能做的事</h4>
            {['讓你在美國工作', '讓你符合社會安全福利資格', '讓你符合勞動所得抵稅額的資格', '讓你為子女申請兒童抵稅額', '影響或改善你的移民身分'].map((item, i) => (
              <div key={i} style={{ fontSize: '14.5px', color: 'var(--mid)', padding: '5px 0', display: 'flex', gap: '8px' }}><span style={{ color: 'var(--red)', flexShrink: 0 }}>·</span>{item}</div>
            ))}
          </div>
        </div>

        <h2>如何申請：5 個步驟</h2>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden', margin: '24px 0' }}>
          {ITIN_STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < 4 ? '1px solid var(--border-l)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px', borderRight: '1px solid var(--border-l)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{s.num}</span>
                </div>
              </div>
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 使用認證接受代理人 — 不要寄出你的護照</div>
          <p>CAA 可以當面查驗你的文件正本，並為 IRS 認證副本 — 你完全不必寄出護照或身分證。強烈建議這麼做。可以在 IRS.gov/itin 查詢 CAA。許多大學的國際學生辦公室都是 CAA，並免費為學生提供這項服務。</p>
        </div>

        <h2>ITIN 與 SSN：主要差異</h2>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>項目</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>SSN</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>ITIN</th>
            </tr></thead>
            <tbody>{[
              ['格式', '###-##-####', '9##-##-####（以 9 開頭）'],
              ['核發單位', '社會安全局（Social Security Administration）', '只有 IRS'],
              ['工作許可', '✅ 有（符合資格的身分）', '❌ 沒有'],
              ['申報稅表', '✅ 可以', '✅ 可以'],
              ['收到退稅', '✅ 可以', '✅ 可以'],
              ['勞動所得抵稅額', '✅ 可以（如符合資格）', '❌ 不可以'],
              ['兒童抵稅額', '✅ 可以（子女需要 SSN）', '❌ 不可以'],
              ['開立銀行帳戶', '✅ 可以', '⚠️ 視銀行而定'],
              ['到期', '不會到期', '連續 3 年以上未使用就會到期'],
            ].map(([feat, ssn, itin], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{ssn}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{itin}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ ITIN 沒有使用就會到期</div>
          <p>ITIN 如果連續 3 年沒有出現在聯邦稅表上，會自動到期。如果你好幾年沒有報稅、現在需要申報，請先確認你的 ITIN 是否仍然有效。報稅前用 Form W-7 更新 — 過期的 ITIN 不能使用。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

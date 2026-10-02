import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/child-tax-credit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'child-tax-credit',
  sourceHash:      '98878b59feb9',
  id: '17',
  title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
  titleEn: 'Child Tax Credit: who qualifies and how to claim it',
  category: 'Individuals & Families',
  categoryHref: '/library/individual',
  userEmotion: 'learning',
  difficulty: 'Beginner',
  readTime: '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 兒童抵稅額（Child Tax Credit）', url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit' },
    { label: 'IRS Publication 501 — 受扶養人、標準扣除額與報稅資訊（Dependents, Standard Deduction, and Filing Information）', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — One, Big, Beautiful Bill 相關條款（One, Big, Beautiful Bill provisions）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
  ],
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: '涵蓋 2025 稅務年度的一般兒童抵稅額規則。抵稅額金額與遞減門檻由現行法律規定，未來年度可能改變。',
  persona: ['有未滿 17 歲子女的父母', '有子女的新移民', '從來沒有申請過兒童抵稅額的人'],
  relatedJourney: ['有受扶養人的報稅', '金錢與福利'],
  actionRequired: '確認每個孩子都符合七項符合資格子女（Qualifying Child）測試。如果你有擁有有效 SSN 的符合資格子女、你（或合併申報時的配偶）有可用於工作的 SSN，而且你的收入低於遞減門檻，就在稅表上申請這項抵稅額 — 它會一元抵一元地減少你的稅額，而且每個孩子最多 $1,700 可以退還。',
}

const FAQS = [
  { q: '如果我的孩子沒有社會安全號碼，可以申請兒童抵稅額嗎？', a: '不行。符合資格的子女必須有可用於美國就業、且在你的稅表截止日（含延期）前核發的 SSN，才能申請兒童抵稅額。持有 ITIN 的孩子不符合兒童抵稅額的資格。不過，他們可能符合其他受扶養人抵稅額（Credit for Other Dependents），每位受扶養人最高 $500。' },
  { q: '我的孩子今年滿 17 歲，還能申請嗎？', a: '不能。孩子必須在稅務年度結束時未滿 17 歲，才符合兒童抵稅額的資格。如果你的孩子在這一年中滿 17 歲，那一年就不符合 — 即使這一年大部分時間他還是 16 歲。如果他符合其他受扶養人的條件，仍可能符合其他受扶養人抵稅額（$500）。' },
  { q: '什麼是額外兒童抵稅額（ACTC）？', a: 'ACTC（Additional Child Tax Credit）是兒童抵稅額中可退還的部分。2025 稅務年度，每個符合資格的子女最多 $1,700 可以退還 — 也就是即使你不欠聯邦所得稅，也可以拿到退款。你必須有至少 $2,500 的勞動所得才符合資格，金額依你的收入而定。ACTC 在 Schedule 8812 上計算，報稅軟體會自動算出，不需要另外申報。' },
  { q: '我是新移民，可以申請兒童抵稅額嗎？', a: '如果你是美國稅務居民（居民外國人）、你的符合資格子女有有效 SSN，而且 — 從 2025 稅務年度開始 — 你（或夫妻合併申報時的配偶）有可用於工作的社會安全號碼，就可以申請兒童抵稅額。非居民外國人一般不能申請。綠卡持有人與通過實質居留測試的人是居民外國人，可能符合資格。' },
  { q: '我的孩子和前配偶住在一起，誰來申請抵稅額？', a: '一般是監護父母（Custodial Parent）— 也就是這一年孩子同住較多晚的那一方 — 申請兒童抵稅額。監護父母可以簽署 Form 8332，在特定年度把這項權利讓給非監護父母。如果孩子與父母雙方同住的時間相同，預設由調整後總收入（AGI）較高的一方申請。' },
  { q: '兒童抵稅額是減少我的稅，還是增加我的退稅？', a: '兩者都有。不可退還的部分（2025 年每個孩子 $500）可以把你的稅額減到零，但無法產生超過你已繳金額的退稅。可退還的部分 — 額外兒童抵稅額，每個孩子最多 $1,700 — 即使你不欠稅，也能拿到實際的退款。所以有兩個符合資格子女的家庭，即使應納稅額為零，只要有足夠的勞動所得（至少需要 $2,500 才符合 ACTC 資格），最多可以拿到 $3,400 的可退還抵稅額。' },
  { q: '我在經濟上扶養一個孩子，但他沒有和我住在一起，可以申請嗎？', a: '一般不行 — 居住測試要求孩子和你同住超過半年。例外是監護父母簽署 Form 8332，把抵稅額讓給你。但只是提供經濟支援、孩子沒有和你同住，並不足以申請兒童抵稅額。' },
]

const RELATED = [
  { href: '/library/individual/tax-credit-vs-deduction', cat: 'Individuals & Families', title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？', desc: '兒童抵稅額是最有價值的抵稅額之一。了解為什麼抵稅額一元抵一元，比扣除額更划算。' },
  { href: '/library/individual/do-i-need-to-file', cat: 'Individuals & Families', title: '我需要申報美國聯邦稅表嗎？', desc: '可退還的兒童抵稅額，是即使不需要申報也值得報稅的最好理由之一。' },
  { href: '/library/individual/itin', cat: 'Individuals & Families', title: '什麼是 ITIN？如何申請？', desc: '沒有 SSN 的孩子申請其他抵稅額時需要 ITIN。了解 SSN 與 ITIN 資格的差異。' },
]

const QUALIFYING_TESTS = [
  { test: '年齡', requirement: '稅務年度結束時未滿 17 歲', note: '在這一年中滿 17 歲的孩子不符合' },
  { test: '關係', requirement: '你的子女、繼子女、寄養子女、兄弟姊妹、繼兄弟姊妹，或以上任何人的後代', note: '養子女與親生子女的資格相同' },
  { test: '居住', requirement: '與你同住超過半年', note: '暫時離開（上學、度假、就醫）仍算與你同住' },
  { test: '受扶養', requirement: '你在稅表上把他列為受扶養人', note: '一個孩子只能由一個人列為受扶養人' },
  { test: '扶養', requirement: '孩子自己負擔的生活費不超過一半', note: '大多數未滿 17 歲的孩子自然符合這項測試' },
  { test: '合併申報', requirement: '孩子沒有與配偶合併申報（只為了申請退稅的除外）', note: '很少見 — 大多數未滿 17 歲的孩子不會合併申報' },
  { test: '社會安全號碼', requirement: '孩子有可用於工作、且在稅表截止日前核發的 SSN', note: 'ITIN 不符合兒童抵稅額資格（但可能符合其他受扶養人抵稅額）' },
]

export default function ChildTaxCreditZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{ title: '2025 兒童抵稅額：誰符合資格、如何申請 | AskLinTax 繁體中文', description: '2025 稅務年度兒童抵稅額完整指南 — 每個孩子最高 $2,200，其中 $1,700 可退還。包括 7 項資格測試、收入遞減門檻，以及新移民如何申請。' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是兒童抵稅額？</h2>
        <p>兒童抵稅額（Child Tax Credit, CTC）是有子女的家庭最有價值的稅務優惠之一。2025 稅務年度，每個未滿 17 歲的<strong>符合資格子女最高 $2,200</strong> — 其中<strong>最多 $1,700 可以退還</strong>，也就是即使你不欠聯邦稅，也可以拿到現金退款。</p>
        <p>許多符合資格的華人移民家庭從來沒有申請 — 有的是不知道有這項抵稅額，有的是以為非公民不適用。事實上，只要你（或合併申報時的配偶）也有可用於工作的 SSN，擁有有效 SSN 符合資格子女的居民外國人就適用。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', margin: '28px 0' }}>
          {[
            { label: '每個符合資格子女的抵稅額', value: '$2,200', sub: '2025 稅務年度', color: 'var(--navy)' },
            { label: '可退還部分（ACTC）', value: '$1,700', sub: '每個孩子 — 即使應納稅額為 $0', color: 'var(--green)' },
            { label: '開始遞減的門檻', value: '$200,000', sub: '單身／夫妻合併申報 $400,000', color: 'var(--gold)' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: `1.5px solid ${item.color}30`, borderRadius: '12px', padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: item.color, marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--light)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <h2>符合資格子女的 7 項測試</h2>
        <p>要申請兒童抵稅額，你的孩子必須通過全部七項測試：</p>
        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>測試</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>要求</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>重點</th>
            </tr></thead>
            <tbody>{QUALIFYING_TESTS.map(({ test, requirement, note }, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white', whiteSpace: 'nowrap' }}>{test}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{requirement}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', fontSize: '13.5px', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>收入遞減：會影響你嗎？</h2>
        <p>這項抵稅額在以下修正後調整後總收入（Modified AGI）門檻開始遞減：</p>
        <ul>
          <li>單身、戶長與夫妻分開申報：<strong>$200,000</strong></li>
          <li>夫妻合併申報：<strong>$400,000</strong></li>
        </ul>
        <p>超過這些門檻後，收入每超過 $1,000，抵稅額就減少 $50。大多數有孩子的家庭遠低於這些門檻，可以拿到全額抵稅額。</p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 可退還代表你可以拿到現金</div>
          <p>許多家庭以為自己不欠稅，就用不到兒童抵稅額。對可退還的部分來說，這並不正確。如果你有兩個符合資格的孩子、應納稅額為 $0，你仍然可能拿到最多 <strong>$3,400</strong> 的可退還額外兒童抵稅額 — 金額依你的收入而定，而且你需要至少 $2,500 的勞動所得才符合資格。記得報稅 — 這是申請它的唯一方式。</p>
        </div>

        <h2>如何申請</h2>
        <ol>
          <li><strong>列出你的符合資格子女</strong>：在 Form 1040 的受扶養人（Dependents）欄位填寫，包括他們的 SSN。</li>
          <li><strong>填寫 Schedule 8812</strong> — Credits for Qualifying Children and Other Dependents。報稅軟體會自動處理。</li>
          <li><strong>抵稅額會自動計算</strong> — 軟體會算出每個孩子的 $2,200 中，有多少用來減少你的稅（不可退還部分），有多少變成退款（ACTC，最多 $1,700）。</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 必須有 SSN — ITIN 不夠</div>
          <p>兒童抵稅額要求每個符合資格的子女都有可用於工作的社會安全號碼。持有 ITIN 的孩子不符合兒童抵稅額的資格。從 2025 稅務年度開始，申請人（或夫妻合併申報時的配偶）也必須有可用於工作的 SSN。如果你的孩子還沒有 SSN，請為他申請 — 有工作許可或公民身分的孩子可以取得 SSN。不符合 SSN 資格的孩子，可能符合其他受扶養人抵稅額（$500，不可退還）。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

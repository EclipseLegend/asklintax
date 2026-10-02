import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/do-i-need-to-file.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'do-i-need-to-file',
  sourceHash:      '6634a1e1c2c6',
  id:            '06',
  title:         '我需要申報美國聯邦稅表嗎？',
  titleEn:       'Do I need to file a U.S. tax return?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 1040 與 1040-SR 填寫說明（2025），申報要求（filing requirements）', url: 'https://www.irs.gov/instructions/i1040gi' },
    { label: 'IRS Publication 501 — 受扶養人、標準扣除額與報稅資訊（Dependents, Standard Deduction, and Filing Information）', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — IRS 可以核定稅額的期限（Time IRS can assess tax）', url: 'https://www.irs.gov/filing/time-irs-can-assess-tax' },
    { label: 'IRS Publication 590-A — 個人退休帳戶提撥（Contributions to Individual Retirement Arrangements）', url: 'https://www.irs.gov/publications/p590a' },
    { label: 'IRS — 自雇稅（Self-employment tax：社會安全稅與聯邦醫療保險稅）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋居民外國人與美國公民的一般申報要求。非居民外國人（申報 Form 1040-NR 者）的門檻不同 — 請見文中的說明。',
  persona:       ['第一次報稅的人', '新移民', '有兼職收入的學生', '不確定是否需要報稅的人'],
  relatedJourney: ['第一次報稅', '剛到美國'],
  actionRequired: '用下方的收入門檻表，確認你的總收入（Gross Income）是否至少達到你報稅身分的申報門檻。如果達到，你就必須申報。如果沒有達到，看看主動報稅是否能讓你拿到退稅。',
}

const FAQS = [
  {
    q: '如果我應該報稅卻沒有報，會怎樣？',
    a: '如果你欠稅卻沒有報稅，IRS 會收取未申報罰款（Failure-to-File Penalty，每月未繳稅額的 5%，最高 25%）以及利息。如果你可以拿到退稅卻沒有報稅，不會被罰款，但一般必須在稅表截止日（含延期）起 3 年內申報才能拿回退稅 — 超過之後，退稅就沒了。IRS 通常可以在稅表到期日或申報日（以較晚者為準）後 3 年內核定額外稅額，但如果應申報的稅表從未申報，就沒有期限。',
  },
  {
    q: '我今年沒有收入，還需要報稅嗎？',
    a: '一般不用。如果你的總收入低於你報稅身分的申報門檻（見上表），你就不需要申報。不過，如果雇主從你的薪水中預扣了聯邦稅，報稅是拿回這筆錢的唯一方法。即使收入為零，報稅也可能對你有利。',
  },
  {
    q: '我是學生，只有少量收入，需要報稅嗎？',
    a: '要看金額。2025 稅務年度，未滿 65 歲的單身申報人，總收入達到 $15,750（標準扣除額）一般就必須申報。如果有人（例如父母）可以把你列為受扶養人，適用較低的門檻 — 例如 2025 年，如果你的非勞動所得（例如利息）超過 $1,350，或你的勞動所得超過 $15,750，就必須申報。如果你的收入低於適用於你的門檻，就不需要申報 — 但如果你的薪水有預扣稅款，還是應該報稅，因為你很可能拿回全額退稅。',
  },
  {
    q: '我是非居民外國人（F-1 學生、J-1 訪問學者），規則一樣嗎？',
    a: '不一樣。非居民外國人有不同的申報規則，要使用 Form 1040-NR，而不是一般的 Form 1040。收入門檻不同，即使只有少量的美國來源所得，也可能需要申報。沒有美國收入的 F-1 學生，仍然必須申報 Form 8843，記錄他們豁免個人的身分。',
  },
  {
    q: '即使不需要，我也可以報稅嗎？',
    a: '可以 — 而且通常應該報。以下情況主動報稅是合理的：薪水有預扣稅款而你想拿回退稅、你符合勞動所得抵稅額或兒童抵稅額等可退還抵稅額，或你想建立報稅紀錄（申請簽證、房貸核准與其他財務程序時很有用）。',
  },
  {
    q: '什麼是「總收入」？哪些要計入門檻？',
    a: '總收入是指在任何扣除之前你收到的所有收入 — 薪資、小費、接案收入、利息、股利、租金收入，以及大多數其他形式的收入。它不包括贈與（一般而言）、遺產或某些政府福利。社會安全福利有自己的規則，依你的總收入可能計入、也可能不計入。',
  },
  {
    q: '我收到台灣父母匯來的錢，這算收入嗎？',
    a: '來自外國個人的贈與一般不是應稅收入，也不計入申報門檻。不過，如果你在同一年從外國個人收到超過 $100,000 的贈與，即使不用繳稅，也必須申報 Form 3520 — 這是揭露義務，不是稅。',
  },
]

const RELATED = [
  {
    href:  '/library/individual/first-time-filer',
    cat:   'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '確認你需要報稅了 — 接下來呢？這份指南帶你走完第一份美國稅表的每個步驟。',
  },
  {
    href:  '/library/individual/tax-residency',
    cat:   'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '你的申報要求取決於你的居民身分。確認你要申報 Form 1040 還是 Form 1040-NR。',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '開始報稅之後，了解抵稅額與扣除額可以幫你減少應繳的稅。',
  },
]

export default function DoINeedToFileZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  const THRESHOLDS = [
    { status: '單身（Single）',                          age: '未滿 65 歲',         threshold: '$15,750' },
    { status: '單身（Single）',                          age: '65 歲以上',      threshold: '$17,750' },
    { status: '夫妻合併申報（Married Filing Jointly）',          age: '兩人都未滿 65 歲',    threshold: '$31,500' },
    { status: '夫妻合併申報（Married Filing Jointly）',          age: '一方 65 歲以上',   threshold: '$33,100' },
    { status: '夫妻合併申報（Married Filing Jointly）',          age: '兩人都 65 歲以上',         threshold: '$34,700' },
    { status: '夫妻分開申報（Married Filing Separately）',       age: '不限年齡',          threshold: '$5' },
    { status: '戶長（Head of Household）',               age: '未滿 65 歲',         threshold: '$23,625' },
    { status: '戶長（Head of Household）',               age: '65 歲以上',      threshold: '$25,625' },
    { status: '符合資格的未亡配偶（Qualifying Surviving Spouse）',     age: '未滿 65 歲',         threshold: '$31,500' },
    { status: '符合資格的未亡配偶（Qualifying Surviving Spouse）',     age: '65 歲以上',      threshold: '$33,100' },
  ]

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '我需要申報美國聯邦稅表嗎？ | AskLinTax 繁體中文',
      description: '了解你是否必須申報美國聯邦稅表。包括 2025 年各報稅身分的收入門檻、學生與新移民的特殊情況，以及即使不需要也值得報稅的時機。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你這一年的<strong>總收入</strong>至少達到你報稅身分的門檻，一般就必須申報美國聯邦稅表。這個門檻以標準扣除額為基準，每年會略有調整。
        </p>
        <p>
          但「必須申報」和「應該申報」是兩回事。即使你不需要申報，也可能想要申報 — 特別是如果你的薪水有預扣稅款，或你符合可退還的抵稅額。
        </p>

        <div className="callout callout-action">
          <div className="callout-title">✅ 要回答的兩個問題</div>
          <p><strong>1. 你必須申報嗎？</strong>在下表中確認你的總收入是否至少達到你報稅身分的門檻。</p>
          <p style={{ marginBottom: 0 }}><strong>2. 你還是應該申報嗎？</strong>如果任何一份薪水有預扣稅款，或你符合可退還的抵稅額，答案幾乎都是肯定的 — 即使你的收入低於門檻。</p>
        </div>

        <h2>2025 年各報稅身分的申報門檻</h2>
        <p>
          以下是 2025 稅務年度（也就是你在 2026 年春天申報的稅表）的總收入門檻。如果你的總收入至少達到你報稅身分的金額，你就必須申報。
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>報稅身分</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>年齡</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>總收入至少達到以下金額就要申報</th>
              </tr>
            </thead>
            <tbody>
              {THRESHOLDS.map(({ status, age, threshold }, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{age}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '-8px' }}>
          資料來源：2025 年 Form 1040 填寫說明（Chart A），反映 2025 年修訂後的 2025 年標準扣除額。門檻等於每一種報稅身分與年齡組合的標準扣除額。如果有人可以把你列為受扶養人，適用不同且較低的門檻（Chart B）。
          夫妻分開申報的 $5 門檻不論年齡都適用。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 非居民外國人：適用不同的規則</div>
          <p>如果你是非居民外國人（大多數 F-1 學生、J-1 訪問學者，以及其他沒有通過實質居留測試的人），這些門檻不適用於你。非居民外國人申報 Form 1040-NR，收入低很多時就可能必須申報。沒有美國收入的 F-1 學生，每年仍然必須申報 Form 8843。請參閱我們的 <a href="/zh-tw/library/individual/tax-residency/">稅務居民身分指南</a>，確認你屬於哪一類。</p>
        </div>

        <h2>一定要申報的特殊情況</h2>
        <p>
          不論你的收入多少，只要符合以下任何一項，就必須申報稅表：
        </p>
        <ul>
          <li><strong>自雇收入 $400 以上</strong> — 即使這是你唯一的收入，而且低於一般門檻</li>
          <li><strong>你需要繳替代性最低稅（Alternative Minimum Tax, AMT）</strong></li>
          <li><strong>你收到預付的保費稅額抵免（Advance Premium Tax Credit）</strong>（用於在健保市場購買的健康保險）</li>
          <li><strong>你從免繳雇主社會安全稅與聯邦醫療保險稅的教會領取 $108.28 以上的薪資</strong></li>
        </ul>

        <h2>即使不需要，也應該報稅的時機</h2>
        <p>
          「不需要申報」不代表「不應該申報」。以下情況值得你主動報稅：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', margin: '24px 0' }}>
          {[
            {
              icon: '💰',
              title: '你的薪水有預扣稅款',
              desc: '如果雇主預扣了聯邦所得稅，拿回這筆錢的唯一方法就是報稅。許多收入低於門檻的人，都是這樣拿到退稅的。',
            },
            {
              icon: '👶',
              title: '你符合可退還的抵稅額',
              desc: '勞動所得抵稅額（EITC）與額外兒童抵稅額這類抵稅額是可退還的 — 即使你不欠稅，也可以拿到退款。你必須報稅才能申請。',
            },
            {
              icon: '📋',
              title: '你想建立報稅紀錄',
              desc: '申請房貸、續簽簽證與申請綠卡時，常常需要連續的報稅紀錄。主動報稅可以建立這份紀錄。',
            },
            {
              icon: '🏥',
              title: '你想提撥 IRA',
              desc: '要提撥傳統 IRA，你（或合併申報時的配偶）需要有應稅報酬，例如薪資或自雇收入。報稅可以記錄這筆收入，以及這筆提撥的任何扣除。',
            },
          ].map((card, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 18px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px', lineHeight: '1.35' }}>{card.title}</h4>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <h2>哪些算是總收入？</h2>
        <p>
          總收入是指在任何扣除或調整之前，你收到的所有收入。對大多數人來說，包括：
        </p>
        <ul>
          <li>薪資、工資與小費（來自 W-2）</li>
          <li>接案、承包或自雇收入（來自 1099，或沒有任何表格）</li>
          <li>銀行帳戶與投資的利息與股利</li>
          <li>租金收入</li>
          <li>收到的贍養費（2019 年以前訂立的協議）</li>
          <li>營業收入</li>
          <li>出售股票、房產或加密貨幣的資本利得</li>
        </ul>
        <p>
          以下一般<strong>不</strong>計入申報門檻的總收入：
        </p>
        <ul>
          <li>贈與（但來自外國個人超過 $100,000 的贈與需要申報 Form 3520）</li>
          <li>遺產</li>
          <li>收到的子女撫養費</li>
          <li>大多數福利與政府補助款</li>
          <li>用於學費與必要費用的合格獎學金（食宿部分要課稅）</li>
        </ul>

        <h2>什麼是報稅身分？我怎麼知道自己是哪一種？</h2>
        <p>
          你的報稅身分（Filing Status）決定你的稅率級距、標準扣除額，以及你符合哪些抵稅額。對大多數人來說，判斷很簡單：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>報稅身分</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>誰符合</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['單身（Single）', '12 月 31 日時未婚，或已合法分居／離婚'],
                ['夫妻合併申報（Married Filing Jointly）', '一起申報一份稅表的已婚夫妻 — 通常稅最低'],
                ['夫妻分開申報（Married Filing Separately）', '各自申報稅表的已婚夫妻 — 通常比較不利，但有時是必要的'],
                ['戶長（Head of Household）', '未婚、支付了維持住所一半以上的費用，而且有符合資格的受扶養人'],
                ['符合資格的未亡配偶（Qualifying Surviving Spouse）', '過去 2 年內喪偶、有受扶養子女 — 適用與夫妻合併申報相同的稅率'],
              ].map(([status, who], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 不確定時，就報稅</div>
          <p>不需要報稅卻報了，成本很小 — 只是花你幾個小時。需要報稅卻沒有報，代價可能是可觀的罰款與利息。如果你不確定，就報稅。而如果你賺的任何收入有預扣稅款，一定要報稅 — 這很可能是拿回這筆錢的唯一方法。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

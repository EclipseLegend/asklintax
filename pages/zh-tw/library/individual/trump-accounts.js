import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/trump-accounts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'trump-accounts',
  sourceHash:      'eba01c3231f9',
  id:            '73',
  title:         'Trump 帳戶：誰可以開戶、$1,000 政府提撥與相關規定',
  titleEn:       'Trump Accounts: Who Can Open One, the $1,000 Contribution, and the Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS Notice 2025-68、Form 4547 與填寫說明、Revenue Procedure 2026-25、2026 年 Form 5329 草稿與填寫說明草稿，以及說明擬議法規（proposed regulations）的 IRS 新聞稿，說明 Trump 帳戶（2025 年稅法為兒童設立的新型個人退休帳戶）。許多細節目前仍是擬議、尚未定案，可能會改變。本文不涵蓋雇主計畫設計、投資選擇或州法',
  persona:       ['2025 至 2028 年出生孩子的父母', '未滿 18 歲孩子的父母與祖父母', '比較 Trump 帳戶與 529 計畫的家庭', '雇主提供 Trump 帳戶提撥的員工'],
  relatedJourney: ['為孩子做規劃', '了解新稅務規定'],
  actionRequired: '如果你的孩子符合資格，有權的成年人可以用 Form 4547 申請（紙本、IRS 線上帳戶，或隨所得稅表一起申報）。只有在孩子於 2025 至 2028 年出生、是美國公民，並且有社會安全號碼時，才勾選 $1,000 試辦計畫提撥。',
  sources: [
    { label: 'IRS — Trump 帳戶（Trump accounts）', url: 'https://www.irs.gov/trumpaccounts' },
    { label: 'IRS — Notice 2025-68，Trump 帳戶（指引與擬議法規預告）', url: 'https://www.irs.gov/pub/irs-drop/n-25-68.pdf' },
    { label: 'IRS — Form 4547 填寫說明（Rev. December 2025），Trump 帳戶選擇（Trump Account Election(s)）', url: 'https://www.irs.gov/pub/irs-pdf/i4547.pdf' },
    { label: 'IRS — Form 4547，Trump 帳戶選擇（Trump Account Election(s)）', url: 'https://www.irs.gov/pub/irs-pdf/f4547.pdf' },
    { label: 'IRS — IR-2025-117，Trump 帳戶指引', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-guidance-on-trump-accounts-established-under-the-working-families-tax-cuts-notice-announces-upcoming-regulations' },
    { label: 'IRS — IR-2026-31，$1,000 試辦計畫提撥的擬議法規', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-for-trump-accounts-contribution-pilot-program-treasury-department-to-deposit-1000-into-the-account-of-each-eligible-child' },
    { label: 'IRS — IR-2026-33，開立初始 Trump 帳戶的擬議法規', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-how-to-open-initial-trump-accounts-under-the-one-big-beautiful-bill' },
    { label: 'IRS — IR-2026-96，合格投資的擬議法規', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-eligible-investments-for-trump-accounts-under-the-working-families-tax-cuts' },
    { label: 'IRS — IR-2026-90，雇主提撥的擬議法規', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-proposed-regulations-on-employer-contributions-to-trump-accounts-under-the-working-families-tax-cuts' },
    { label: 'IRS — Revenue Procedure 2026-25（提撥的贈與稅安全港）', url: 'https://www.irs.gov/pub/irs-drop/rp-26-25.pdf' },
    { label: 'IRS — Form W-2 與 W-3 一般填寫說明（2026）（General Instructions for Forms W-2 and W-3）', url: 'https://www.irs.gov/instructions/iw2w3' },
    { label: 'IRS — 2026 年 Form 5329 填寫說明草稿（2026 年 9 月，非正式版本）', url: 'https://www.irs.gov/pub/irs-dft/i5329--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: '每個孩子都可以拿到 $1,000 嗎？',
    a: '不是。$1,000 試辦計畫提撥只適用於 2025、2026、2027 或 2028 年出生、是美國公民並有社會安全號碼的孩子，而且必須由符合資格的成年人申請（用 Form 4547 或線上申請）。年紀較大的孩子仍然可以開 Trump 帳戶，但沒有 $1,000。',
  },
  {
    q: '提撥可以抵稅嗎？',
    a: '不可以。依 IRS Notice 2025-68，提撥到 Trump 帳戶不能扣除。帳戶收益在當下不課稅，日後提領時依傳統 IRA 規定課稅，但屬於你稅後提撥的部分（basis）除外。',
  },
  {
    q: '$1,000 會計入每年 $5,000 的上限嗎？',
    a: '不會。試辦計畫提撥、政府或慈善機構的合格一般提撥（qualified general contributions），以及轉存（rollovers），都不受年度上限限制。父母、親友與雇主的提撥則要計入。',
  },
  {
    q: '孩子 18 歲前可以提領嗎？',
    a: '一般不行。在成長期（growth period）— 到孩子滿 17 歲那一年的 12 月 31 日為止 — 除了轉存到另一個 Trump 帳戶、在孩子滿 17 歲那一年把全部餘額轉存到孩子的 ABLE 帳戶、提領超額提撥，以及死亡以外，不能提領。之後，帳戶依傳統 IRA 規定處理。',
  },
  {
    q: '祖父母提撥需要申報贈與稅表嗎？',
    a: '不一定。依 Revenue Procedure 2026-25，個人的提撥如果符合所有安全港條件，可以視為適用年度免稅額的贈與，不需要申報 Form 709 — 條件包括 2026 年給這個孩子的贈與總額不超過 $19,000，而且贈與人這一年沒有其他應稅贈與。',
  },
  {
    q: '這些規定已經定案了嗎？',
    a: '還沒有全部定案。基本規定來自 IRS 所說明的 2025 年稅法。許多細節在 Notice 2025-68 與 2026 年發布的擬議法規中，定案前可能會改變。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 計畫：擴大的 K-12 與職業證照費用說明',
    desc:  '教育儲蓄帳戶的比較。',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '雇主的 Trump 帳戶提撥出現在哪裡（代碼 TA）。',
  },
]

export default function TrumpAccountsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Trump 帳戶：資格、$1,000 提撥與相關規定 | AskLinTax 繁體中文',
      description: '兒童 Trump 帳戶：誰可以開戶、誰能拿到 $1,000 試辦計畫提撥、$5,000 上限、投資與提領規定，以及哪些仍是擬議規定。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>Trump 帳戶</strong>是 2025 年稅法為兒童設立的新型傳統個人退休帳戶（IRA）。規定適用於 2025 年 12 月 31 日之後開始的稅務年度，而且<strong>2026 年 7 月 4 日之前不能提撥</strong>。
        </p>
        <ul>
          <li><strong>誰可以開戶：</strong>在申請那一年年底未滿 18 歲、並有社會安全號碼的孩子。</li>
          <li><strong>政府的 $1,000：</strong>只適用於 <strong>2025 至 2028 年</strong>出生、符合資格的美國公民孩子，而且要由成年人申請。</li>
          <li><strong>提撥：</strong>2026 與 2027 年，家人、其他人與雇主每年合計最多 <strong>$5,000</strong>，之後依通膨調整。提撥不能抵稅。</li>
          <li><strong>投資：</strong>只能投資追蹤美國股票指數的低成本基金。</li>
          <li><strong>提領：</strong>一般要到孩子滿 18 歲那一年才可以；之後適用傳統 IRA 規定。</li>
        </ul>

        <h2>誰可以開 Trump 帳戶</h2>
        <p>
          符合資格的孩子是：有人為他提出申請、在申請那一年<strong>年底前未滿 18 歲</strong>，而且在申請前已取得<strong>社會安全號碼</strong>（可用於工作）。2026 年申請的話，孩子必須在 2008 年 12 月 31 日之後出生。每個孩子只能申請一個初始帳戶。開戶不需要是美國公民 — 只有 $1,000 提撥才要求公民身分。
        </p>
        <p>
          申請使用 <strong>Form 4547</strong>，可以紙本申報、透過 IRS 個人線上帳戶提交，或隨所得稅表一起申報（不要附在 Form 1040-X 上）。依 IRS 通知與擬議法規，可以提出申請的人依優先順序為：孩子的法定監護人、父母、成年兄弟姊妹或祖父母；如果同時申請 $1,000，就由申請 $1,000 的人開戶。開戶期限是孩子滿 17 歲那一年的 12 月 31 日。
        </p>

        <h2>$1,000 試辦計畫提撥</h2>
        <ArticleTable
          head={['條件', '說明']}
          rows={[
            ['出生年度', '2025、2026、2027 或 2028 年出生'],
            ['公民身分', '美國公民'],
            ['社會安全號碼', '在申請前已發給孩子'],
            ['申請', '由預期孩子會是自己當年度合格子女（qualifying child）的成年人申請（Form 4547 第 III 部分）；同一人也必須申請開戶'],
            ['每個孩子一次', '如果已經有人為這個孩子申請並處理過試辦計畫，就不能再申請'],
            ['時間', '帳戶開立後，由財政部在 2026 年 7 月 4 日或之後存入'],
          ]}
        />
        <p>
          這 $1,000 <strong>不會</strong>計入每年 $5,000 的上限，也不會形成稅基（basis）— 所以日後提領時要課稅。身為孩子法定監護人的州、領地或部落兒童福利機構可以為孩子開戶，但不能申請 $1,000；預期孩子會是自己合格子女的寄養父母，可以提出這項申請。
        </p>

        <h2>提撥與上限</h2>
        <ArticleTable
          head={['提撥類型', '是否計入每年 $5,000 上限？', '說明']}
          rows={[
            ['父母、親友、孩子本人', '是', '不能抵稅；形成稅基（稅後資金）'],
            ['雇主（第 128 條計畫）', '是', '每位員工每年最多 $2,500，不計入員工收入；列在 Form W-2 box 12 代碼 TA'],
            ['$1,000 試辦計畫提撥', '否', '只適用於 2025–2028 年出生的合格孩子'],
            ['合格一般提撥（政府、慈善機構）', '否', '提撥給特定一群孩子，不是單一孩子'],
            ['從另一個 Trump 帳戶轉存', '否', '稅基跟著轉移'],
          ]}
        />
        <p>
          $5,000 上限適用於 2026 與 2027 年，2027 年之後依通膨調整。提撥只能做到<strong>孩子滿 17 歲那一年的 12 月 31 日</strong>為止，而且在某一年度提撥的金額就算在那一年 — 不能把隔年年初的提撥算到前一年。不需要有勞動所得。
        </p>

        <h2>超額提撥（2026 年）</h2>
        <p>
          2026 年超過 <strong>$5,000</strong> 上限的提撥（不包括免計入的提撥，例如 $1,000 試辦計畫提撥、合格一般提撥與轉存）屬於超額提撥，<strong>可能會產生稅務後果</strong>。Notice 2025-68 允許從帳戶中領出超額提撥，即使是在成長期內。
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 細節仍有待 IRS 正式指引</div>
          <p>IRS 目前只發布了申報 Trump 帳戶超額提撥的 2026 年<strong>草稿</strong>表格與填寫說明（Form 5329）。具體的稅務處理與如何更正超額提撥都尚未定案，可能會改變。如果孩子帳戶的提撥可能超過上限，請聯絡帳戶受託人，並查看 IRS.gov/TrumpAccounts。</p>
        </div>

        <h2>投資規定</h2>
        <p>
          在孩子滿 17 歲那一年結束前，帳戶只能投資於<strong>追蹤以美國公司為主的指數</strong>（例如 S&P 500）、<strong>不使用槓桿</strong>，而且每年費用<strong>不超過 0.1%</strong> 的共同基金或 ETF。特定產業或類股指數不符合資格。如果沒有選擇投資，會使用受託人預設的合格投資。這些細節在 2026 年 8 月發布的擬議法規中。
        </p>

        <h2>提領與課稅</h2>
        <ul>
          <li><strong>孩子滿 18 歲那一年之前：</strong>一般不能提領 — 不能困難提領，也不能結清帳戶 — 只有轉存到另一個 Trump 帳戶、在孩子滿 17 歲那一年把全部餘額轉存到孩子的 ABLE 帳戶、提領超額提撥，以及死亡例外。</li>
          <li><strong>從孩子滿 18 歲那一年的 1 月 1 日起：</strong>帳戶依傳統 IRA 規定處理。收益與不屬於稅基的金額在提領時要課稅；提早提領可能要加徵 10% 附加稅，除非適用例外（例如合格高等教育費用或首次購屋）。</li>
          <li><strong>稅基：</strong>家人與其他人的稅後提撥屬於稅基，不會再次課稅；$1,000 試辦計畫提撥、雇主提撥與一般提撥都不屬於稅基。</li>
        </ul>

        <h2>範例（示意，2026 年）</h2>
        <p>
          <strong>Emma</strong> 在 2026 年 3 月出生，是有社會安全號碼的美國公民。她的媽媽申報 Form 4547，為她開立 Trump 帳戶並申請試辦計畫提撥，所以帳戶開立後財政部存入 <strong>$1,000</strong>。2026 年她的祖父母提撥 $3,000、父母提撥 $2,000 — 共 <strong>$5,000</strong>，達到年度上限。$1,000 試辦計畫提撥不計入這個上限。
        </p>
        <p>
          <strong>Kevin</strong> 在 2016 年出生。因為他未滿 18 歲並有社會安全號碼，他的父母可以在 2026 年為他開立 Trump 帳戶，但他<strong>不</strong>符合 $1,000 的資格，因為他是在 2025 年之前出生。
        </p>
        <p>
          <strong>Sophia</strong> 爸爸的雇主在 2026 年依第 128 條計畫提撥 $2,500 到她的 Trump 帳戶。因為雇主提撥要計入 $5,000 上限，家人在 2026 年最多只能再提撥 <strong>$2,500</strong>。
        </p>

        <h2>哪些規定已經定案？</h2>
        <ArticleTable
          head={['來源', '狀態']}
          rows={[
            ['2025 年稅法（國內稅收法第 530A、6434 與 128 條）', '已立法；適用於 2025 年 12 月 31 日之後開始的稅務年度'],
            ['Notice 2025-68（2025 年 12 月）', 'IRS 打算以擬議法規提出的過渡指引'],
            ['開戶與 $1,000 試辦計畫（2026 年 3 月）', '擬議法規'],
            ['雇主提撥（2026 年 8 月）與合格投資（2026 年 8 月）', '擬議法規'],
            ['Form 4547 與填寫說明；Revenue Procedure 2026-25（贈與稅）', '正式表格與指引'],
            ['超額提撥的稅務申報（2026 年 Form 5329 與填寫說明）', '只有草稿表格 — 尚未定案'],
            ['受託人年度申報表格、帳戶範本文件與其他部分項目', '尚未發布'],
          ]}
        />

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「每個孩子都有 $1,000。」</strong>只有 2025 至 2028 年出生、符合資格的美國公民孩子，而且要由成年人申請。</li>
          <li><strong>「提撥可以像一般 IRA 一樣抵稅。」</strong>提撥不能抵稅。</li>
          <li><strong>「孩子隨時都可以用這筆錢。」</strong>一般要到孩子滿 18 歲那一年才可以提領。</li>
          <li><strong>「超過 $5,000 的部分只是不算而已。」</strong>超額提撥可能會產生稅務後果；相關細節仍有待 IRS 正式指引。</li>
          <li><strong>「雇主的錢是 $5,000 以外另外加的。」</strong>雇主提撥要計入 $5,000 上限。</li>
          <li><strong>「它和 Roth IRA 一樣免稅。」</strong>Trump 帳戶是傳統 IRA，不是 Roth；收益在提領時要課稅。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 指引仍在發展中</div>
          <p>本文有幾項規定來自擬議法規與 IRS 通知，之後可能會改變。州稅處理方式可能與聯邦規定不同。採取行動前，請先查看 IRS.gov/TrumpAccounts。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

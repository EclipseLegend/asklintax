import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/no-tax-on-overtime.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'no-tax-on-overtime',
  sourceHash:      '545142988cb6',
  id:            '68',
  title:         '加班費免稅？加班費扣除額如何計算？',
  titleEn:       'No Tax on Overtime: How the Deduction Really Works',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 表格與填寫說明、Notice 2025-69，以及 IRS 加班費常見問題（FS-2026-13），說明 2025 與 2026 稅務年度的聯邦合格加班費所得稅扣除額。IRS 常見問題屬於指引，不是法規。本文不涵蓋州所得稅、雇主的薪資義務，或每一種特殊加班安排，例如聯邦公務員的規定',
  persona:       ['領加班費的時薪工作者', '夫妻都有加班費的家庭', '正在核對 2026 年 Form W-2 的工作者', '不確定自己的加班費是否符合資格的人'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '確認你依聯邦《公平勞動基準法》屬於有權領加班費的員工，只計算加班溢價（一般是 1.5 倍中的「0.5 倍」），並在 Schedule 1-A 上申請。2026 年請核對 Form W-2 box 12 代碼 TT，如果有錯，請向雇主要求更正後的 W-2。',
  sources: [
    { label: 'IRS — 「加班費免稅」扣除額須知（What to know about the No Tax on Overtime deduction）', url: 'https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction' },
    { label: 'IRS — FS-2026-13，合格加班費扣除額問答（2026 年 8 月）', url: 'https://www.irs.gov/pub/taxpros/fs-2026-13.pdf' },
    { label: 'IRS — Working Families Tax Cuts：個人與工作者相關條款（provisions for individuals and workers）', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A（Form 1040）（2025），額外扣除額（Additional Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（含 Schedule 1-A 說明）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — Notice 2025-69，給 2025 年收到合格小費或加班費者的指引', url: 'https://www.irs.gov/pub/irs-drop/n-25-69.pdf' },
    { label: 'IRS — Form W-2 與 W-3 一般填寫說明（2026）（General Instructions for Forms W-2 and W-3）', url: 'https://www.irs.gov/instructions/iw2w3' },
  ],
}

const FAQS = [
  {
    q: '我的加班費現在免稅了嗎？',
    a: '沒有。加班費仍然是收入，也仍然要繳社會安全稅與聯邦醫療保險稅（Medicare），並照常預扣所得稅。2025 年至 2028 年，符合資格的工作者可以扣除加班費中合格的部分 — 一般是高於正常工資率的溢價 — 最高 $12,500（夫妻合併申報 $25,000），收入較高時會遞減。',
  },
  {
    q: '我可以扣除全部的 1.5 倍加班費嗎？',
    a: '不行。只有聯邦《公平勞動基準法》（FLSA）規定、高於你正常工資率的溢價才算 — 一般是 1.5 倍中的「0.5 倍」。如果你時薪 $20，以 $30 加班 10 小時，合格金額是 $100，不是 $300。',
  },
  {
    q: '我是不適用加班規定的月薪主管，額外的薪資算嗎？',
    a: '一般不算。只有 FLSA 對有權領加班費的員工所規定的加班費才符合資格。如果你不適用 FLSA 的加班規定，依工會合約、州法或雇主自己的政策支付的加班費都不符合資格。',
  },
  {
    q: '我的 2026 年 Form W-2 box 12 代碼 TT 的加班費比實際領到的少，怎麼辦？',
    a: '依照 IRS 常見問題，請向雇主要求更正後的 Form W-2（Form W-2c）。常見問題表示，2025 年之後的稅務年度，你使用的合格加班費不能超過雇主在 box 12 代碼 TT 申報的金額，而且不能為此使用替代 Form W-2（Form 4852）。',
  },
  {
    q: '需要分項扣除嗎？',
    a: '不用。不論你使用標準扣除額或分項扣除，都在 Schedule 1-A 上申請。已婚者必須夫妻合併申報才能申請。',
  },
  {
    q: '我住的州也有這項扣除嗎？',
    a: '不一定。州所得稅規定可能和聯邦法律不同。本文只說明聯邦規定。',
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
    href: '/library/individual/no-tax-on-tips',
    cat:  'Individuals & Families',
    title: '小費免稅？誰符合小費扣除資格？',
    desc:  '另一項給工作者的新扣除額。',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: '為什麼今年要補稅？看懂 W-4 與預扣稅',
    desc:  '如何為新的扣除額調整預扣稅。',
  },
]

export default function NoTaxOnOvertimeZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '加班費免稅？加班費扣除額如何計算 | AskLinTax 繁體中文',
      description: '聯邦加班費扣除額：只有 FLSA 加班溢價可以扣除、$12,500 上限、依收入遞減，以及 2025 與 2026 年申報方式的差別，並附範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          「加班費免稅」（no tax on overtime）是一項新的<strong>聯邦所得稅扣除額</strong>的通俗名稱，針對<strong>合格加班費</strong>（qualified overtime compensation），適用於 <strong>2025 年至 2028 年</strong>。它的範圍比名稱聽起來窄：
        </p>
        <ul>
          <li>只有<strong>聯邦《公平勞動基準法》（FLSA）規定</strong>的加班費才符合資格。</li>
          <li>只有<strong>高於你正常工資率的溢價</strong>才算 — 一般是 1.5 倍中的「0.5 倍」，不是整筆加班費。</li>
          <li>扣除額上限為 <strong>$12,500</strong>（夫妻合併申報 $25,000），修正後調整總收入（MAGI）超過 <strong>$150,000</strong>（合併申報 $300,000）時會減少。</li>
        </ul>
        <p>
          加班費仍然是收入，也仍然要繳<strong>社會安全稅與聯邦醫療保險稅（Medicare）</strong>。這項扣除額只會減少要繳聯邦所得稅的收入。
        </p>

        <h2>誰符合資格</h2>
        <ul>
          <li>你（或合併申報時的配偶）在這一年以 <strong>FLSA 有權領加班費的員工</strong>身分 — 受 FLSA 保障、且不屬於加班規定的豁免範圍 — 收到了<strong>合格加班費</strong>。</li>
          <li>收到加班費的人有<strong>可用於工作的社會安全號碼（SSN）</strong>，並且在稅表截止日（含延期）前核發。</li>
          <li>如果你已婚，必須<strong>夫妻合併申報</strong>。</li>
          <li>使用標準扣除額或分項扣除都可以。</li>
        </ul>
        <p>
          許多工作者<strong>不適用</strong> FLSA 的加班規定 — 例如許多主管、行政與專業人員、外勤業務人員，以及部分電腦相關、領佣金的零售業、交通運輸、季節性與農業工作者。IRS 常見問題也表示，擁有企業至少 20% 實質股權並積極參與經營的員工，一般不適用加班規定。如果你不適用 FLSA 的加班規定，依工會合約、州法或雇主自己的政策支付的加班費都不符合資格。
        </p>

        <h2>只有加班溢價可以扣除</h2>
        <p>
          依 FLSA，一般每週工作超過 40 小時的部分，要以正常工資率的 1.5 倍支付加班費。合格金額是<strong>多出來的那 0.5 倍</strong>，不是整個 1.5 倍。快速估算方式：如果你的加班費全部剛好是 1.5 倍，合格金額就是加班費總額的<strong>三分之一</strong>。
        </p>
        <ArticleTable
          head={['情況', '合格加班費']}
          rows={[
            ['以 1.5 倍加班 10 小時；正常工資率 $20（加班費 $300）', '$100（10 小時 × $10 溢價）'],
            ['同樣 10 小時，但雇主支付 2 倍（$400）', '仍然是 $100 — 只有 FLSA 規定的溢價才算'],
            ['FLSA 沒有規定的額外薪資，例如每天超過 8 小時、週末或假日', '一般不符合資格'],
            ['全年加班費 $15,000，全部是 1.5 倍', '$5,000（$15,000 ÷ 3）'],
          ]}
        />

        <h2>上限與依收入遞減</h2>
        <ArticleTable
          head={['規定', '金額']}
          rows={[
            ['最高扣除額', '$12,500；夫妻合併申報 $25,000（合計，不是每人）'],
            ['開始遞減', 'MAGI 超過 $150,000，夫妻合併申報為 $300,000'],
            ['遞減方式', 'MAGI 每超過門檻整數 $1,000，扣除額減少 $100'],
            ['適用年度', '2025 年至 2028 年'],
          ]}
        />

        <h2>範例（示意）</h2>
        <p>
          <strong>Carlos</strong>（單身，2025 年）是時薪 $24 的倉庫工作者。2025 年他領到 $9,000 加班費，全部是 1.5 倍。他的合格加班費是 $9,000 ÷ 3 = <strong>$3,000</strong>。他的 MAGI 低於 $150,000，所以可以在 Schedule 1-A 上扣除全部 $3,000。
        </p>
        <p>
          <strong>Ana 和 Leo</strong>（夫妻合併申報，2025 年）兩人合計有 $20,000 合格加班費，MAGI 為 $320,000。起算金額是 $20,000（低於 $25,000 的合併申報上限）。他們的 MAGI 超過 $300,000 共 $20,000，所以扣除額減少 20 × $100 = $2,000。他們可以扣除 <strong>$18,000</strong>。
        </p>
        <p>
          <strong>Priya</strong>（2026 年）領到 $10,000 合格加班費，但她的 2026 年 Form W-2 box 12 代碼 TT 只列出 $5,000。依照 IRS 常見問題，她向雇主要求更正後的 Form W-2c。如果雇主發出列明 $10,000 的 W-2c，她就可以使用 $10,000。如果雇主沒有更正，常見問題表示她只能使用申報的 $5,000。
        </p>

        <h2>2025 年與 2026 年：如何找到金額</h2>
        <ArticleTable
          head={['稅務年度', '要注意什麼']}
          rows={[
            ['2025', '雇主不需要在 Form W-2、1099-NEC 或 1099-MISC 上分開申報合格加班費。Schedule 1-A 填寫說明與 Notice 2025-69 說明了如何計算 — 例如依雇主在 Form W-2 box 14 列出的金額、你向雇主索取的加班溢價金額，或雇主提供的加班費明細（1.5 倍加班費除以 3）。請保留你所依據的紀錄。'],
            ['2026 年及以後', '雇主在 Form W-2 box 12 以代碼 TT 申報合格加班費（少數情況下在 Form 1099-NEC box 1d 或 Form 1099-MISC box 14）。依照 IRS 常見問題，2025 年之後的稅務年度沒有寬免：你使用的金額不能超過 box 12 代碼 TT 申報的金額（常見問題表示，少數以 Form 1099 申報的情況也適用類似原則）。如果金額太低或沒有申報，請向雇主要求 Form W-2c；如果雇主沒有更正，常見問題表示你不能使用沒有申報的金額，也不能使用替代 Form W-2（Form 4852）。如果金額太高，只能使用實際支付的加班費。'],
          ]}
        />
        <p>
          box 12 代碼 TT 的金額不一定就是你的扣除額。Schedule 1-A 會套用 $12,500 / $25,000 上限與收入遞減，算出可以扣除的金額。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 預扣稅</div>
          <p>雇主不會因為這項扣除額而減少加班費的所得稅預扣。如果你預期會有扣除額，可以在 Form W-4 上用 Step 4(b) 扣除額工作表考慮進去 — 請見<a href="/zh-tw/library/individual/owe-taxes-withholding-w4/">為什麼報稅時要補稅</a>。想知道薪資出現在表格的哪裡，請見<a href="/zh-tw/library/individual/what-is-w2/">如何看懂 W-2</a>。</p>
        </div>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「所有加班費都免稅。」</strong>加班費仍然是應稅收入，也要繳社會安全稅與聯邦醫療保險稅；只有合格的溢價可以扣除，而且有上限。</li>
          <li><strong>「整筆加班費都可以扣除。」</strong>只有 FLSA 規定、高於正常工資率的溢價才算。</li>
          <li><strong>「雇主付的加班費都算。」</strong>FLSA 沒有規定的加班費 — 包括不適用 FLSA 加班規定的員工 — 都不符合資格。</li>
          <li><strong>「box 12 的金額就是我的扣除額。」</strong>那只是起點；上限與收入遞減仍然適用。</li>
          <li><strong>「夫妻每人各有 $25,000。」</strong>$25,000 的合併申報上限是兩人合計。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只說明聯邦規定</div>
          <p>州所得稅規定可能和聯邦法律不同。請不要假設你所在的州也允許這項扣除。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

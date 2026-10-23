import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/car-loan-interest-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'car-loan-interest-deduction',
  sourceHash:      '7bca647a2e90',
  id:            '71',
  title:         '汽車貸款利息扣除額：哪些車輛與貸款符合資格？',
  titleEn:       'Car Loan Interest Deduction: Which Vehicles and Loans Qualify',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據最終法規（T.D. 10054，Internal Revenue Bulletin 2026-39）、2025 年 Schedule 1-A 與 Form 1040 填寫說明、Notice 2025-57，以及 Form 1098-VLI 填寫說明，說明 2025 至 2028 稅務年度的聯邦合格乘用車貸款利息扣除額。2026 年的表格行次來自草稿表格。本文不涵蓋營業用車輛扣除或州稅規定',
  persona:       ['2024 年之後以貸款購買新轎車、SUV、皮卡或機車的人', '比較貸款與租賃的購車者', '主要個人使用、偶爾開共乘的駕駛', '把汽車貸款轉貸的人'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '確認車輛對你來說是新車、在美國組裝，而且是用 2024 年之後成立、以第一順位留置權（first lien）擔保的貸款購買。保留貸款機構的利息明細（2026 年為 Form 1098-VLI），並在 Schedule 1-A 申請扣除時，在稅表上填寫車輛識別號碼（VIN）。',
  sources: [
    { label: 'IRS — T.D. 10054，合格乘用車貸款利息最終法規（Internal Revenue Bulletin 2026-39）', url: 'https://www.irs.gov/pub/irs-irbs/irb26-39.pdf' },
    { label: 'IRS — Schedule 1-A（Form 1040）（2025），額外扣除額（Additional Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（含 Schedule 1-A 說明）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — Working Families Tax Cuts：個人與工作者相關條款（provisions for individuals and workers）', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — IR-2025-129，汽車貸款利息新扣除額的指引', url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-on-the-new-deduction-for-car-loan-interest-under-the-one-big-beautiful-bill' },
    { label: 'IRS — Notice 2025-57，2025 年貸款機構申報的過渡期寬免', url: 'https://www.irs.gov/pub/irs-drop/n-25-57.pdf' },
    { label: 'IRS — Form 1098-VLI 填寫說明，車輛貸款利息明細（Vehicle Loan Interest Statement）', url: 'https://www.irs.gov/pub/irs-pdf/i1098vli.pdf' },
    { label: 'IRS — Publication 505（2026），預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
  ],
}

const FAQS = [
  {
    q: '二手車符合資格嗎？',
    a: '不符合。車輛必須由你首次使用（original use）。IRS 填寫說明明確表示二手車不符合資格。',
  },
  {
    q: '我的車是租的，利息可以扣除嗎？',
    a: '不可以。租賃融資不符合資格，租約到期後買下車輛也不符合，因為首次使用是從租賃公司開始的。',
  },
  {
    q: '需要分項扣除或夫妻合併申報嗎？',
    a: '不需要。不論你分項扣除或使用標準扣除額都可以申請。最終法規表示報稅身分不影響資格；夫妻合併申報使用 $200,000 的遞減門檻，其他人使用 $100,000。',
  },
  {
    q: '我怎麼知道車是在哪裡組裝的？',
    a: '依最終法規，你可以依據車輛識別號碼（VIN）顯示的製造工廠，或車上標籤標示的最終組裝地點。IRS 也建議使用 NHTSA 的 VIN 查詢工具（VIN Decoder）。',
  },
  {
    q: '我偶爾會開共乘，還符合資格嗎？',
    a: '可以，只要你預期這輛車有超過 50% 的時間是個人使用（由你、你的配偶或特定親屬使用）。最終法規的範例把 85% 個人使用、15% 共乘的情況視為個人使用。',
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
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: '為什麼今年要補稅？看懂 W-4 與預扣稅',
    desc:  '在 Form W-4 上考慮這項扣除額。',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '車輛的營業用途有不同的處理方式。',
  },
]

export default function CarLoanInterestDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '汽車貸款利息扣除額：哪些車輛符合資格 | AskLinTax 繁體中文',
      description: '2025–2028 年聯邦汽車貸款利息扣除額：美國組裝的新車、第一順位留置權貸款、$10,000 上限、依收入遞減、填寫 VIN，以及哪些情況不符合資格。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>2025 年至 2028 年</strong>，你每年最多可以扣除 <strong>$10,000</strong> 的貸款利息，條件是貸款用來購買<strong>個人使用</strong>的<strong>新</strong>轎車、廂型休旅車、廂型車、SUV、皮卡或機車，車輛在<strong>美國完成最終組裝</strong>，而且貸款在 2024 年之後成立、以車輛設定<strong>第一順位留置權</strong>（first lien）擔保。修正後調整總收入（MAGI）超過 <strong>$100,000</strong>（夫妻合併申報 $200,000）時，扣除額會減少。
        </p>
        <p>
          不論你分項扣除或使用標準扣除額，都在 Schedule 1-A 上申請，而且必須填寫車輛識別號碼（VIN）。財政部與 IRS 在 2026 年 9 月發布了<strong>最終法規</strong>（T.D. 10054），適用於 2025 至 2028 稅務年度。
        </p>

        <h2>誰可以申請</h2>
        <ul>
          <li>個人（以及特定遺產與信託）。不需要分項扣除。</li>
          <li><strong>任何報稅身分：</strong>最終法規表示報稅身分不影響資格。和小費、加班費與長者扣除額不同，已婚者不必夫妻合併申報。這項扣除額的 Schedule 1-A 填寫說明沒有那些扣除額的社會安全號碼規定；取而代之的是必須填寫 VIN。</li>
          <li>依最終法規，非居民外國人一般不能扣除這項利息。</li>
        </ul>

        <h2>哪些貸款符合資格</h2>
        <ArticleTable
          head={['條件', '說明']}
          rows={[
            ['時間', '貸款在 2024 年 12 月 31 日之後成立'],
            ['你的貸款', '原本就是由你借的（原借款人過世而由你承接貸款時，有例外）'],
            ['用途', '用來購買車輛（不是租賃）'],
            ['擔保', '以車輛設定第一順位留置權擔保 — 用信用卡購買一般不符合'],
            ['貸款人', '不是關係人，例如特定家庭成員或關係企業'],
            ['轉貸', '以第一順位留置權擔保的轉貸仍然符合，但只限轉貸時舊貸款的餘額'],
          ]}
        />
        <p>
          最終法規也排除了用來融資<strong>車隊銷售</strong>、非個人使用的商用車、有<strong>報廢車所有權（salvage title）</strong>的車輛，以及為了報廢或零件而購買的車輛的貸款。
        </p>

        <h2>哪些車輛符合資格</h2>
        <ul>
          <li><strong>對你來說是新車：</strong>首次使用必須從你開始。二手車不符合資格，租約到期買斷也不符合。</li>
          <li><strong>類型：</strong>主要用於公共道路的轎車、廂型休旅車、廂型車、運動型休旅車（SUV）、皮卡或機車。</li>
          <li><strong>重量：</strong>總重量評等低於 14,000 磅。</li>
          <li><strong>在美國完成最終組裝：</strong>你可以依據 VIN 中的製造工廠，或車輛標籤上的最終組裝地點。IRS 也建議使用 NHTSA 的 VIN 查詢工具。</li>
          <li><strong>個人使用：</strong>你預期車輛有超過 50% 的時間是個人用途（由你、你的配偶或特定親屬使用）。</li>
        </ul>

        <h2>貸款中哪些部分算數</h2>
        <p>
          和車輛一起融資的金額 — 例如銷售稅、過戶與登記費、保養計畫、延長保固、GAP 保險與車輛配件 — 的利息可以計入。從舊車抵換轉入的<strong>負資產</strong>（negative equity）、一般碰撞或責任保險、不相關的物品（例如拖車或船），或你從貸款機構拿到的現金，這些部分的利息不算。如果只有部分貸款符合資格，利息要依比例分攤。
        </p>

        <h2>上限與依收入遞減</h2>
        <ArticleTable
          head={['規定', '金額']}
          rows={[
            ['最高扣除額', '每份稅表 $10,000，不論報稅身分（合併申報有兩輛車時合計）'],
            ['開始遞減', 'MAGI 超過 $100,000，夫妻合併申報超過 $200,000'],
            ['遞減方式', 'MAGI 每超過門檻 $1,000 — 不足 $1,000 的部分也算 — 扣除額減少 $200'],
            ['適用年度', '2025 年至 2028 年'],
          ]}
        />

        <h2>範例（示意）</h2>
        <p>
          <strong>Maria</strong>（單身，2025 年）在 2025 年 3 月用以第一順位留置權擔保的貸款，買了一輛在美國組裝的新 SUV。她在 2025 年付了 $3,200 利息，MAGI 為 $80,000。她可以在 Schedule 1-A 上扣除全部 <strong>$3,200</strong>，並且必須填寫 VIN。
        </p>
        <p>
          <strong>遞減</strong>（最終法規的範例）：一位單身納稅人有 $7,000 合格利息，MAGI 為 $124,200，超過 $100,000 共 $24,200。這要無條件進位為 25，所以扣除額減少 25 × $200 = $5,000，剩下 <strong>$2,000</strong>。
        </p>
        <p>
          <strong>合併申報兩輛車：</strong>一對夫妻為兩輛新車分別付了 $6,000 與 $5,000 的合格利息。他們的扣除額不能超過 <strong>$10,000</strong>。
        </p>
        <p>
          <strong>轉貸並領出現金：</strong>一位借款人把 $30,000 的貸款餘額轉貸成 $38,000 的新貸款，並領出 $8,000 現金。只有 $30,000 部分的利息可以計入。
        </p>
        <p>
          <strong>不符合資格：</strong>用貸款購買的二手車、租賃，或租約到期後買下的車輛。
        </p>

        <h2>申報與表格</h2>
        <ArticleTable
          head={['稅務年度', '要注意什麼']}
          rows={[
            ['2025', '貸款機構可以在 2026 年 1 月 31 日前，把 2025 年的利息總額提供給你 — 例如透過線上帳戶或年度明細 — 來履行申報義務（Notice 2025-57）。在 Schedule 1-A 第 IV 部分申請扣除；合計金額填入 Form 1040 第 13b 行。'],
            ['2026', '貸款機構在新的 Form 1098-VLI（box 1）申報 $600 以上的利息，表格也會顯示首次使用是否從你開始（box 6），以及最終組裝是否在美國（box 7）。在 2026 年 Schedule 1-A 與 Form 1040 草稿中，Schedule 1-A 的合計改填到第 13a 行；請以正式表格為準。'],
          ]}
        />
        <p>
          你也可以在 Form W-4 上考慮預期的扣除額（2026 年扣除額工作表第 1c 行）— 請見<a href="/zh-tw/library/individual/owe-taxes-withholding-w4/">W-4 與預扣稅</a>。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「所有汽車貸款利息現在都可以扣除。」</strong>只有 2024 年之後、以第一順位留置權擔保、用來購買美國組裝的個人用新車的貸款利息，最高 $10,000，而且會遞減。</li>
          <li><strong>「租車也算。」</strong>租賃融資與租約買斷都不符合資格。</li>
          <li><strong>「要分項扣除才行。」</strong>使用標準扣除額時也可以申請。</li>
          <li><strong>「已婚者必須夫妻合併申報。」</strong>這項扣除額不必 — 報稅身分不影響資格，只是遞減門檻不同。</li>
          <li><strong>「美國品牌就代表在美國組裝。」</strong>重要的是這輛車本身在哪裡完成最終組裝。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只說明聯邦規定</div>
          <p>州所得稅規定可能和聯邦法律不同。2026 年的行次來自 IRS 草稿表格，可能會改變。如果你也把車輛用於營業，有特別規定避免同一筆利息被扣除兩次。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/alternative-minimum-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'alternative-minimum-tax',
  sourceHash:      'ada96e11d85f',
  id:            '120',
  title:         '替代性最低稅（AMT）：2025 與 2026 年規定',
  titleEn:       'Alternative Minimum Tax (AMT): 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '說明個人 AMT 如何計算，2025 與 2026 年數字來自 Rev. Proc. 2024-40 與 Rev. Proc. 2025-32（皆為正式文件）、2025 年 Form 6251 說明與 2025 年 Form 8801 說明。2026 年 50% 的遞減率是根據正式的 Rev. Proc. 2025-32 門檻計算出來的；2026 年 Form 6251 的行號來自 IRS 草稿表格（2026 年 5 月建立），可能會變動。範例經過簡化，未考慮資本利得、AMT 外國稅額抵免與其他抵稅額',
  persona:       ['行使激勵型股票選擇權的員工', '住在高稅率州的高收入納稅人', '報稅軟體自動加入 Form 6251 的人', '以前年度繳過 AMT 的人'],
  relatedJourney: ['了解新稅務規定', '投資與加密貨幣'],
  actionRequired: '如果你行使了激勵型股票選擇權（ISO）並持有股票、有州及地方稅等大額分項扣除，或收入接近 2026 年遞減門檻（未婚 $500,000、夫妻合併申報 $1,000,000），請在年底前試算 Form 6251 或用報稅軟體確認。如果你以前年度因為 ISO 等遞延項目繳過 AMT，請看看 Form 8801 是否有抵稅額。',
  sources: [
    { label: 'IRS — Form 6251 說明（2025），替代性最低稅 — 個人', url: 'https://www.irs.gov/pub/irs-pdf/i6251.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — 2026 年 Form 6251 草稿（2026 年 5 月 26 日建立；不可用於申報）', url: 'https://www.irs.gov/pub/irs-dft/f6251--dft.pdf' },
    { label: 'IRS — Form 8801 說明（2025），前一年度最低稅抵稅額', url: 'https://www.irs.gov/pub/irs-pdf/i8801.pdf' },
  ],
}

const FAQS = [
  {
    q: '什麼是替代性最低稅？',
    a: 'AMT 是在一般所得稅之外另外課徵的稅。你在不計入某些稅務優惠的情況下重新計算所得，減去免稅額，再套用 26% 與 28% 的 AMT 稅率，得出暫定最低稅（tentative minimum tax）。如果它高於你的一般所得稅，差額就是你的 AMT。',
  },
  {
    q: '2025 與 2026 年的 AMT 免稅額是多少？',
    a: '2025 年：未婚者 $88,100，夫妻合併申報或符合資格的未亡配偶 $137,000，夫妻分開申報 $68,500。2026 年：分別是 $90,100、$140,200 與 $70,100。數字來自 Rev. Proc. 2024-40 與 Rev. Proc. 2025-32。',
  },
  {
    q: '2026 年 AMT 有什麼改變？',
    a: '免稅額開始遞減的所得門檻，從 2025 年的 $626,350（未婚）與 $1,252,700（合併申報），降到 2026 年的 $500,000 與 $1,000,000。免稅額遞減的速度也變快：2026 年超過門檻的每一美元減少 50 美分，2025 年則是 25 美分。50% 的遞減率是根據 Rev. Proc. 2025-32 中正式的 2026 年完全遞減金額計算出來的。',
  },
  {
    q: '為什麼激勵型股票選擇權會產生 AMT？',
    a: '就一般所得稅而言，行使 ISO 通常不算收入。但就 AMT 而言，差價 — 股票的公平市價減去你支付的價格 — 通常是 Form 6251 第 2i 行的調整項目，除非你在同一年賣出股票。你在這些股票上的 AMT 成本基礎也會增加相同的金額。',
  },
  {
    q: '州及地方稅（SALT）扣除在 AMT 中算嗎？',
    a: '不算。你在 Schedule A 上扣除的州及地方稅，要在 Form 6251 第 2a 行加回。如果你沒有分項扣除，則是加回標準扣除額。',
  },
  {
    q: 'AMT 以後拿得回來嗎？',
    a: '部分可以。Form 8801 的前一年度最低稅抵稅額，只適用於遞延項目造成的 AMT，例如行使 ISO 或折舊 — 不適用於排除項目，例如州及地方稅或標準扣除額。每年可用的抵稅額，以一般所得稅超過暫定最低稅的部分為上限，沒用完的可以往後結轉。',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-options-iso-nso',
    cat:  'Investments & Foreign Accounts',
    title: '員工股票選擇權：ISO 與 NSO、Form 3921 與另類最低稅',
    desc:  '行使 ISO 是最常見的 AMT 原因。',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: '州稅與地方稅（SALT）扣除額：上限、收入限制與實例',
    desc:  '州及地方稅在 AMT 中要加回。',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '影響 2025 與 2026 年稅表的其他改變。',
  },
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP 員工購股計畫怎麼課稅：合格與不合格處分及 Form 3922',
    desc:  '另一種員工股票計畫，課稅方式不同。',
  },
]

export default function AlternativeMinimumTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '替代性最低稅（AMT）：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: 'AMT 如何計算：Form 6251、ISO 與 SALT 等調整項目、2025 與 2026 年免稅額與遞減門檻、26% 與 28% 稅率、2026 年新的 50% 遞減率，以及 Form 8801 抵稅額 — 附範例。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>替代性最低稅（AMT）</strong>是另一種計算稅額的方式，用來限制某些稅務優惠能減少多少稅。你要在 <strong>Form 6251</strong> 上計算。只有當你的<strong>暫定最低稅</strong>高於一般所得稅時，才需要繳 AMT。依據 IRS 正式公布的 <strong>2026 年</strong>數字，免稅額會在較低的所得就開始遞減，而且遞減速度是 2025 年的兩倍，因此可能有更多高收入納稅人要繳 AMT。
        </p>

        <h2>AMT 如何計算</h2>
        <ArticleTable
          head={['步驟', '內容', 'Form 6251']}
          rows={[
            ['1. 從應稅所得開始', '從你稅表上的應稅所得開始（從 2025 年起，第 1 行分成 1a 與 1b）', '第 1 行'],
            ['2. 加上調整與優惠項目', '加回 AMT 不允許的項目，例如州及地方稅或標準扣除額，以及 ISO 差價', '第 2a–3 行'],
            ['3. 替代性最低應稅所得（AMTI）', '得出的結果', '第 4 行'],
            ['4. 減去免稅額', 'AMTI 較高時會減少或歸零（遞減）', '第 5 行'],
            ['5. 套用 26% 與 28% 稅率', '28% 門檻以下適用 26%；以上適用 28%（資本利得仍適用較低稅率）', '第 7 行'],
            ['6. 和一般所得稅比較', 'AMT 是暫定最低稅減去一般所得稅，大於零的部分', '第 9–11 行'],
          ]}
        />

        <h2>常見的調整與優惠項目</h2>
        <ul>
          <li><strong>稅款（第 2a 行）：</strong>在 Schedule A 上扣除的州及地方所得稅、銷售稅與財產稅要加回。如果你用標準扣除額，則是加回標準扣除額。</li>
          <li><strong>激勵型股票選擇權（第 2i 行）：</strong>如果你持有股票超過年底，行使時的差價通常要計入 AMT。如果在同一年賣出，就不需要調整。</li>
          <li><strong>高齡者加強扣除額（2025 年）：</strong>2025 年 Form 6251 說明指出，這項新扣除額視為個人免稅額，在 AMT 中要加回（在第 1a–1b 行處理）。</li>
          <li><strong>其他項目</strong>包括某些免稅的私人活動債券利息、折舊差異，以及淨營業虧損與被動活動在 AMT 中的不同處理。</li>
        </ul>

        <h2>2025 與 2026 年數字</h2>
        <ArticleTable
          head={['項目', '2025 年（Rev. Proc. 2024-40）', '2026 年（Rev. Proc. 2025-32）']}
          rows={[
            ['免稅額 — 夫妻合併申報或符合資格的未亡配偶', '$137,000', '$140,200'],
            ['免稅額 — 未婚者', '$88,100', '$90,100'],
            ['免稅額 — 夫妻分開申報', '$68,500', '$70,100'],
            ['開始遞減 — 合併 / 未婚 / 分開', '$1,252,700 / $626,350 / $626,350', '$1,000,000 / $500,000 / $500,000'],
            ['免稅額完全遞減 — 合併 / 未婚 / 分開', '$1,800,700 / $978,750 / $900,350', '$1,280,400 / $680,200 / $640,200'],
            ['遞減率', 'AMTI 超過門檻部分的 25%（2025 年 Form 6251 說明）', 'AMTI 超過門檻部分的 50%（計算方式見下方）'],
            ['適用 28% 稅率的應稅超額門檻', '$239,100（夫妻分開申報 $119,550）', '$244,500（夫妻分開申報 $122,250）'],
          ]}
        />

        <h2>2026 年 50% 遞減率從哪裡來</h2>
        <p>
          Rev. Proc. 2025-32 同時列出 2026 年的門檻與完全遞減金額。免稅額在一段剛好等於免稅額兩倍的 AMTI 區間內遞減完畢，也就是超過門檻的每一美元減少 50 美分：
        </p>
        <ul>
          <li><strong>合併申報：</strong>$1,280,400 − $1,000,000 = $280,400 = 2 × $140,200。</li>
          <li><strong>未婚：</strong>$680,200 − $500,000 = $180,200 = 2 × $90,100。</li>
          <li><strong>分開申報：</strong>$640,200 − $500,000 = $140,200 = 2 × $70,100。</li>
        </ul>
        <p>
          用同樣方式檢查 2025 年，得出 25%：$1,800,700 − $1,252,700 = $548,000 = 4 × $137,000，和 2025 年免稅額工作表中的 25% 一致。不要把遞減率和 26%、28% 的 AMT 稅率搞混 — 它們是不同的東西。Rev. Proc. 2025-32 也指出，2025 年稅法（Public Law 119-21）讓 2018 至 2025 年首次適用的較高免稅額與遞減門檻金額成為永久規定，而且 $1,000,000 這個金額在 2027 年以前開始的年度不做通膨調整。
        </p>

        <h2>2026 年 Form 6251 仍是草稿</h2>
        <p>
          IRS 的 2026 年 Form 6251 草稿（2026 年 5 月 26 日建立）列出新的第 5 行門檻（$500,000 與 $1,000,000）以及 2026 年 28% 級距（$244,500，減去 $4,890）。草稿不可用於申報，正式表格發布前可能會變動。本文於 2026 年 10 月審閱時，IRS 尚未發布 2026 年 Form 6251 說明（草稿或正式版皆無）；上面的 50% 遞減率來自正式的 Rev. Proc. 2025-32 金額，而不是這份說明。
        </p>

        <h2>範例（簡化）</h2>
        <ArticleTable
          head={['', 'Priya（單身，2025 年）', 'Priya（單身，2026 年）', 'Tom 與 Ana（合併申報，2026 年）']}
          rows={[
            ['AMTI', '$600,000', '$600,000', '$1,100,000'],
            ['免稅額', '$88,100 — 低於 $626,350 門檻，不遞減', '$90,100 − 50% × ($600,000 − $500,000) = $40,100', '$140,200 − 50% × ($1,100,000 − $1,000,000) = $90,200'],
            ['應稅超額', '$511,900', '$559,900', '$1,009,800'],
            ['暫定最低稅', '$511,900 × 28% − $4,782 = $138,550', '$559,900 × 28% − $4,890 = $151,882', '$1,009,800 × 28% − $4,890 = $277,854'],
            ['AMT', '只有在 $138,550 高於一般所得稅時才要繳', '只有在 $151,882 高於一般所得稅時才要繳', '只有在 $277,854 高於一般所得稅時才要繳'],
          ]}
        />
        <p>
          範例假設沒有資本利得、合格股利或 AMT 外國稅額抵免，也沒有計算一般所得稅。同樣是 $600,000 的 AMTI，因為門檻降低、遞減加快，Priya 的免稅額從 2025 年到 2026 年少了 $48,000。
        </p>

        <h2>AMT 抵稅額：Form 8801</h2>
        <ul>
          <li><strong>只限遞延項目：</strong>遞延項目造成的 AMT，例如行使 ISO 與折舊，可以在以後年度產生抵稅額。排除項目造成的 AMT — 某些分項扣除（例如稅款）、標準扣除額、某些免稅利息、耗竭扣除與第 1202 條排除 — 則不行。</li>
          <li><strong>上限：</strong>每年可用的抵稅額，以你的一般所得稅（扣除某些抵稅額後）減去暫定最低稅為上限。沒用完的抵稅額可以往後結轉。</li>
          <li><strong>時間：</strong>2025 年繳的 AMT 可以在 2026 年的 Form 8801 上產生抵稅額。</li>
        </ul>

        <h2>誰應該確認</h2>
        <ul>
          <li>行使 ISO 並持有股票超過年底的員工。</li>
          <li>AMTI 超過 2026 年門檻的納稅人，尤其是超過 $500,000 的未婚申報者。</li>
          <li>州及地方稅分項扣除金額很大的人。</li>
          <li>孩子適用兒童稅（kiddie tax）的父母：孩子的 AMT 免稅額上限是勞動所得加 $9,550（2025 年）或 $9,750（2026 年）。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 行使之前先規劃</div>
          <p>行使 ISO 即使沒有拿到任何現金，也可能產生一大筆 AMT。行使之前，請用報稅軟體或請稅務專業人士試算當年的 AMT，並保留股票在一般所得稅與 AMT 下的成本基礎紀錄。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

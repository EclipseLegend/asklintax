import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/business-losses-nol.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'business-losses-nol',
  sourceHash:      '7277ab779a49',
  id:            '130',
  title:         '營業虧損：成本基礎、風險承擔、被動活動、超額營業虧損與 NOL 規定',
  titleEn:       'Business Losses: Basis, At-Risk, Passive Activity, Excess Business Loss, and NOL Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 461 說明（2025）、Form 172 說明（2024 年 12 月修訂版）、Form 1045 說明（2025）、Form 1120 說明（2025）、Form 7203 說明、Publication 925（2025）、Rev. Proc. 2024-40（2025 年金額）與 Rev. Proc. 2025-32（2026 年金額），介紹聯邦對營業虧損扣除的限制。Publication 536 已不再修訂。本文不詳細說明第 382 條限制、合併申報、農業虧損回轉的計算，或合夥人成本基礎的計算',
  persona:       ['有虧損年度的企業老闆', '收到虧損 K-1 的 S 公司股東與 LLC 成員', '投資但不經營企業的投資人', '有大額營業虧損的高收入納稅人'],
  relatedJourney: ['經營小型企業', '了解新稅務規定'],
  actionRequired: '扣除營業虧損之前，依序套用各項限制：成本基礎（合夥人與 S 公司股東）、風險承擔、被動活動，以及 — 對個人、遺產與信託而言 — 超額營業虧損限制。記錄每一筆被暫停或結轉的金額，因為只有保存這些紀錄，之後的年度才能使用它們。',
  sources: [
    { label: 'IRS — Form 461 說明（2025），營業虧損限制', url: 'https://www.irs.gov/pub/irs-pdf/i461.pdf' },
    { label: 'IRS — Form 172 說明（2024 年 12 月修訂版），個人、遺產與信託的淨營業虧損', url: 'https://www.irs.gov/pub/irs-pdf/i172.pdf' },
    { label: 'IRS — Form 1045 說明（2025），暫定退稅申請', url: 'https://www.irs.gov/pub/irs-pdf/i1045.pdf' },
    { label: 'IRS — Form 1120 說明（2025）', url: 'https://www.irs.gov/pub/irs-pdf/i1120.pdf' },
    { label: 'IRS — Form 7203 說明，S 公司股東股票與債務成本基礎限制', url: 'https://www.irs.gov/pub/irs-pdf/i7203.pdf' },
    { label: 'IRS — Publication 925（2025），被動活動與風險承擔規定', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '各項虧損限制的適用順序是什麼？',
    a: '先是成本基礎（合夥人與 S 公司股東），接著是風險承擔規定，再來是被動活動規定，然後是非公司納稅人的超額營業虧損限制。只有經過這些限制後剩下的部分，才可能形成淨營業虧損（NOL）。',
  },
  {
    q: '超額營業虧損限制和 NOL 扣除是一樣的嗎？',
    a: '不一樣。超額營業虧損限制是限制個人、遺產或信託在虧損年度可以扣除多少淨營業虧損 — 2026 年為 $256,000（共同申報 $512,000）。不允許扣除的超額部分，之後視為 NOL 結轉到以後的年度。NOL 扣除是另一項規定，是在之後的年度使用這筆結轉金額，一般限於應稅所得的 80%。',
  },
  {
    q: '我可以把營業虧損往前回轉，拿回以前繳的稅嗎？',
    a: '一般不行。2020 年之後課稅年度產生的 NOL，一般只能往後結轉。主要的例外是農業虧損與某些保險公司的虧損，可以往前回轉 2 年。個人、遺產與信託可以用 Form 1045 申請回轉的快速退稅；公司使用 Form 1139。',
  },
  {
    q: '每一筆營業虧損都會變成 NOL 嗎？',
    a: '不會。被成本基礎、風險承擔或被動活動規定暫停的虧損不是 NOL；它們會一直被暫停，直到這些規定允許扣除為止。計算個人的 NOL 時，超過資本利得的資本損失、超過非營業收入的非營業扣除額、NOL 扣除本身，以及合格營業收入扣除，也都不能計入。',
  },
  {
    q: 'C 公司有超額營業虧損限制嗎？',
    a: '沒有。超額營業虧損限制適用於非公司納稅人。C 公司可以有 NOL，一般往後結轉，並受應稅所得 80% 的限制扣除。某些股權集中的 C 公司（closely held corporation）與個人服務公司，則適用風險承擔或被動活動規定。',
  },
  {
    q: '被暫停的虧損什麼時候會釋出？',
    a: '因成本基礎而受限的虧損會無限期往後結轉，在你有足夠的成本基礎時扣除。因風險承擔規定而受限的虧損，視為下一年度同一活動的扣除額。被暫停的被動虧損，一般在你以完全課稅的交易，把你在該活動的全部權益處分給無關係人時，全額允許扣除。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C 說明：如何申報自雇收入與費用',
    desc:  '獨資經營者的虧損從哪裡開始計算。',
  },
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: '多成員 LLC 與合夥企業稅務：Form 1065 與 Schedule K-1',
    desc:  'K-1 上的合夥人成本基礎與虧損限制。',
  },
  {
    href: '/library/rental/passive-activity-loss-rules',
    cat:  'Real Estate & Airbnb',
    title: '出租虧損與被動活動規定：$25,000 特別扣除額與房地產專業人士',
    desc:  '被動活動規定的詳細說明。',
  },
  {
    href: '/library/individual/alternative-minimum-tax',
    cat:  'Individuals & Families',
    title: '替代性最低稅（AMT）：2025 與 2026 年規定',
    desc:  '回轉 NOL 可能讓較早的年度產生 AMT。',
  },
]

export default function BusinessLossesNolPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '營業虧損：成本基礎、風險承擔、被動活動、超額營業虧損與 NOL 規定 | AskLinTax 繁體中文',
      description: '介紹聯邦對營業虧損的限制：成本基礎、風險承擔與被動活動規定、超額營業虧損限制（2025 年 $313,000，2026 年 $256,000）、淨營業虧損、80% 限制、往後結轉，以及農業虧損回轉的例外。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          營業虧損不一定能在發生當年全額扣除。最多有四項限制要<strong>依序</strong>適用：<strong>成本基礎</strong>、<strong>風險承擔</strong>、<strong>被動活動</strong>，以及 — 對個人、遺產與信託而言 — <strong>超額營業虧損</strong>限制。適用哪幾項，取決於納稅人以及企業的組織方式；並不是每一位企業老闆都適用全部四項。這些限制不允許扣除的金額，會被暫停或往後結轉。另外，當年剩下的淨虧損可能形成<strong>淨營業虧損（NOL）</strong>。NOL 規定不是虧損年度的另一項限制：它規範這筆虧損如何轉到其他年度使用，而在使用的年度，扣除一般限於<strong>應稅所得的 80%</strong>。
        </p>

        <h2>各項限制的順序與 NOL 處理</h2>
        <ArticleTable
          head={['步驟', '規定', '適用對象', '表格', '接下來會怎樣']}
          rows={[
            ['1', '成本基礎', '合夥人與 S 公司股東', 'Form 7203（S 公司股東）', '無限期往後結轉，直到你有足夠的成本基礎'],
            ['2', '風險承擔', '個人、遺產、信託，以及某些股權集中的公司', 'Form 6198', '視為下一年度同一活動的扣除額'],
            ['3', '被動活動', '個人、遺產、信託、個人服務公司，以及股權集中的公司', 'Form 8582', '暫停到你有被動收入，或處分你的全部權益為止'],
            ['4', '超額營業虧損', '只限非公司納稅人', 'Form 461', '視為 NOL 結轉到以後的年度'],
            ['各項限制之後', 'NOL 處理（不是虧損年度的第五項限制）', '個人、遺產、信託與 C 公司；合夥企業與 S 公司一般不能使用 NOL，但其所有人使用各自分得的部分', 'Form 172（個人、遺產與信託）', 'NOL 轉到其他年度並在當年扣除，一般受 80% 限制'],
          ]}
        />
        <p>
          IRS 的 7203 與 461 表說明，以及 Publication 925，列出了這個順序：成本基礎，接著風險承擔，再來被動活動，然後超額營業虧損。
        </p>

        <h2>哪些規定適用於哪種企業</h2>
        <ArticleTable
          head={['企業類型', '成本基礎限制', '風險承擔與被動活動', '超額營業虧損', 'NOL']}
          rows={[
            ['獨資經營（Schedule C）', '沒有另外的合夥人或股東成本基礎限制；所有人直接申報該企業', '適用於所有人', '適用於所有人', '在所有人的個人申報書上計算（Form 172）'],
            ['合夥企業或多成員 LLC', '適用於每位合夥人（合夥權益的成本基礎）', '適用於每位合夥人，不適用於合夥企業本身', '適用於非公司合夥人；營業或業務的認定在合夥企業層級進行', '合夥企業一般不能使用 NOL；合夥人使用各自分得的部分'],
            ['S 公司', '適用於每位股東（股票與債務成本基礎，Form 7203）', '適用於每位股東，不適用於公司本身', '適用於非公司股東；營業或業務的認定在公司層級進行', 'S 公司一般不能使用 NOL；股東使用各自分得的部分'],
            ['C 公司', '不轉嫁給所有人；虧損留在公司內', '風險承擔：只適用於某些股權集中的公司。被動活動：只適用於股權集中的公司與個人服務公司', '不適用', '公司有自己的 NOL（Form 1120），一般受 80% 限制'],
          ]}
        />

        <h2>成本基礎：合夥人與 S 公司股東</h2>
        <ul>
          <li><strong>S 公司股東</strong>只能在其股票成本基礎，以及其直接借給公司的貸款成本基礎範圍內，扣除分得的虧損。Form 7203 用來追蹤這個成本基礎。</li>
          <li>以合夥人身分課稅的<strong>合夥人與 LLC 成員</strong>，只能在其合夥權益的成本基礎範圍內扣除虧損；請見<a href="/zh-tw/library/business-formation/partnership-llc-taxes/">合夥企業與 LLC 稅務</a>。</li>
          <li>因成本基礎而受限的虧損會無限期往後結轉，在之後成本基礎允許的年度扣除。</li>
        </ul>

        <h2>風險承擔與被動活動限制</h2>
        <ul>
          <li><strong>風險承擔：</strong>你一般對投入該活動的金錢與財產調整後成本基礎承擔風險，如果你對為該活動借入的款項負有個人還款責任，也對這些借款承擔風險。特殊規定可以把以不動產擔保的合格無追索權融資視為承擔風險。</li>
          <li><strong>被動活動：</strong>來自你沒有實質參與的營業或業務的虧損，以及一般出租活動的虧損，只能抵銷被動收入。出租房地產有特殊例外；請見<a href="/zh-tw/library/rental/passive-activity-loss-rules/">被動活動虧損規定</a>。</li>
        </ul>

        <h2>超額營業虧損限制</h2>
        <ArticleTable
          head={['課稅年度', '門檻（單身及其他申報身分）', '門檻（共同申報）', '來源']}
          rows={[
            ['2025', '$313,000', '$626,000', 'Rev. Proc. 2024-40'],
            ['2026', '$256,000', '$512,000', 'Rev. Proc. 2025-32'],
          ]}
        />
        <p>
          這項限制適用於個人、遺產與信託 — 不適用於 C 公司。你來自所有營業或業務、經過前面各項限制後的淨虧損，只在門檻內允許扣除；超過的部分就是<strong>超額營業虧損</strong>。以員工身分工作的工資，在這項計算中不算營業收入。《一個偉大美麗法案》（One Big Beautiful Bill Act）讓這項限制成為永久規定。不允許扣除的金額<strong>不會消失</strong>：它視為 NOL 結轉到以後的年度。
        </p>

        <h2>淨營業虧損</h2>
        <ul>
          <li><strong>計算 NOL：</strong>個人、遺產與信託使用 Form 172。不是每一項扣除都能計入 — 例如，計算 NOL 時不能計入超過資本利得的資本損失、超過非營業收入的非營業扣除額，以及合格營業收入扣除。</li>
          <li><strong>往後結轉：</strong>2020 年之後課稅年度產生的 NOL，一般只能往後結轉，而且可以一直結轉到用完為止。</li>
          <li><strong>80% 限制：</strong>對 2020 年之後開始的課稅年度，2017 年之後產生的 NOL 的扣除，一般限於不計 NOL 扣除（以及對個人而言，不計合格營業收入扣除）計算的應稅所得的 80%。2018 年以前開始的課稅年度產生的 NOL，不受 80% 限制。</li>
          <li><strong>回轉的例外：</strong>農業虧損 — 以及壽險公司以外的某些保險公司的虧損 — 可以往前回轉 2 年。你可以在如期申報（含延期）的申報書上附聲明，選擇放棄回轉；這項選擇一般不能撤銷。</li>
          <li><strong>快速退稅：</strong>個人、遺產與信託可以使用 Form 1045（一般在虧損年度結束後 1 年內申報）或 Form 1040-X；公司使用 Form 1139。回轉可能讓較早的年度產生替代性最低稅；請見<a href="/zh-tw/library/individual/alternative-minimum-tax/">AMT</a>。</li>
        </ul>

        <h2>範例（2026 年，共同申報）</h2>
        <p>
          一對共同申報的夫妻有 $900,000 的工資，另有其中一位配偶實質參與的企業虧損 $700,000，成本基礎與風險承擔金額都足夠。這筆虧損不是被動虧損。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['經過成本基礎、風險承擔與被動限制後的淨營業虧損', '$700,000'],
            ['2026 年超額營業虧損門檻（共同申報）', '$512,000'],
            ['2026 年允許扣除的虧損', '$512,000'],
            ['超額營業虧損 — 以 NOL 往後結轉', '$188,000'],
          ]}
        />
        <p>
          到了 2027 年，如果他們不計 NOL 扣除與合格營業收入扣除計算的應稅所得是 $150,000，NOL 扣除一般限於這個金額的 80%，也就是 $120,000。剩下的 $68,000 結轉到 2028 年。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 持續記錄每一筆被暫停的金額</div>
          <p>被暫停的成本基礎、風險承擔與被動虧損，以及 NOL 結轉，各有不同的使用時點規定。請保存每一年的 7203、6198、8582、461 與 172 表 — 或同等的工作表。IRS 表示，產生 NOL 的年度的紀錄，要在你使用完回轉或結轉後保存 3 年，或在結轉期限屆滿後保存 3 年。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

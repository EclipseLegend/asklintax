import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/kiddie-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'kiddie-tax',
  sourceHash:      'b103c66e247f',
  id:            '99',
  title:         '兒童稅（Kiddie Tax）：孩子的投資所得何時按父母稅率課稅',
  titleEn:       'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 8615 填寫說明、2025 年 Form 8814 及其填寫說明、Rev. Proc. 2024-40（2025 年金額）、Rev. Proc. 2025-32（2026 年金額），以及 2026 年 Form 8615 與 8814 草案及其填寫說明草案，說明 2025 與 2026 稅務年度的兒童稅。草案中的 2026 年金額尚未定案，應以正式的 2026 年表格確認。本文不涵蓋信託、替代性最低稅或州稅',
  persona:       ['孩子有股利、利息或資本利得的父母', '把股票送給孫子女的祖父母', '幫孩子開立監護投資帳戶的家庭', '有投資所得的 19 到 23 歲大學生'],
  relatedJourney: ['準備報稅', '投資與加密貨幣'],
  actionRequired: '加總孩子當年的非勞務所得；如果超過 $2,700 而且符合年齡條件，就在 Form 8615 上計算孩子的稅，或確認你是否可以改用 Form 8814，把孩子的利息與股利申報在自己的稅表上。',
  sources: [
    { label: 'IRS — 2025 年 Form 8615 填寫說明，有非勞務所得的特定兒童的稅', url: 'https://www.irs.gov/pub/irs-pdf/i8615.pdf' },
    { label: 'IRS — 2025 年 Form 8814，父母選擇申報子女的利息與股利', url: 'https://www.irs.gov/pub/irs-pdf/f8814.pdf' },
    { label: 'IRS — 2025 年 Form 8814 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8814.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — 2026 年 Form 8615 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i8615--dft.pdf' },
    { label: 'IRS — 2026 年 Form 8814 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i8814--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: '孩子暑假打工的收入適用兒童稅嗎？',
    a: '不適用。兒童稅只適用於非勞務所得，例如利息、股利與資本利得。工資、小費與其他孩子實際工作所得的報酬屬於勞務所得，按孩子自己的稅率課稅。',
  },
  {
    q: '兒童稅到幾歲為止？',
    a: '依 2025 年 Form 8615 填寫說明，適用於年底未滿 18 歲的孩子；18 歲且勞務所得不超過其生活費一半的孩子；以及 19 到 23 歲、勞務所得不超過其生活費一半的全職學生。年底時至少要有一位父母在世，而且孩子沒有合併申報。',
  },
  {
    q: '股票是誰送的有差別嗎？',
    a: '沒有。Form 8615 填寫說明指出，孩子的非勞務所得包括屬於孩子的財產所產生的所有所得，不論財產是何時、由誰移轉。祖父母送給孩子的股票所配發的股利也算在內。',
  },
  {
    q: '我可以直接把孩子的所得放在我的稅表上嗎？',
    a: '有時可以。如果孩子的總所得超過 $1,350 且低於 $13,500，並符合其他條件，符合資格的父母可以用 Form 8814，把孩子的利息與股利（包括資本利得分配）申報在父母的稅表上。這樣孩子就不用報稅。這可能多繳稅，所以要比較兩種方式。',
  },
  {
    q: '稅是孩子繳還是父母繳？',
    a: '使用 Form 8615 時，稅額是用父母的稅率計算，但它是孩子的稅，申報在孩子自己的稅表上。使用 Form 8814 選擇時，所得與稅額都在父母的稅表上。',
  },
]

const RELATED = [
  {
    href: '/library/individual/gift-tax-form-709',
    cat:  'Individuals & Families',
    title: '贈與稅與 Form 709：美國贈與人 2025 與 2026 年何時要申報',
    desc:  '把股票或現金送給子女或孫子女。',
  },
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: '銀行利息和股利要申報嗎？',
    desc:  '利息與股利所得怎麼課稅。',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 計畫：擴大的 K-12 與職業證照費用說明',
    desc:  '家庭為孩子儲蓄的另一種方式。',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '報稅門檻，包括受扶養人。',
  },
]

export default function KiddieTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '兒童稅（Kiddie Tax）：孩子的投資所得何時按父母稅率課稅 | AskLinTax 繁體中文',
      description: '2025 與 2026 年的兒童稅：$2,700 門檻、勞務與非勞務所得、年齡與學生條件、Form 8615 與 Form 8814 父母選擇、贈與的股票、監護帳戶，以及資本利得。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>兒童稅</strong>（kiddie tax）是為了防止家庭把投資所得移轉給孩子，利用孩子較低的稅率。<strong>2025</strong> 年，如果未超過年齡上限的孩子有超過 <strong>$2,700</strong> 的<strong>非勞務所得</strong>——利息、股利、資本利得與類似所得——超過 $2,700 的部分在<strong>父母</strong>稅率較高時按父母的稅率課稅。孩子的稅在 <strong>Form 8615</strong> 上計算。不是孩子所有的所得都受影響：<strong>工資與其他勞務所得</strong>仍按孩子自己的稅率課稅。
        </p>

        <h2>適用對象（2025 年）</h2>
        <p>符合下列<strong>所有</strong>條件的孩子，必須申報 Form 8615：</p>
        <ul>
          <li>孩子有<strong>超過 $2,700</strong> 的非勞務所得；</li>
          <li>孩子<strong>必須報稅</strong>；</li>
          <li>孩子年底<strong>未滿 18 歲</strong>，<strong>或 18 歲</strong>且勞務所得不超過其生活費的一半，<strong>或是 19 到 23 歲的全職學生</strong>且勞務所得不超過其生活費的一半；</li>
          <li>年底時孩子至少有一位父母在世；以及</li>
          <li>孩子沒有合併申報。</li>
        </ul>
        <p>
          不論孩子是否被申報為受扶養人，這些規定都適用；「孩子」也包括領養的孩子與繼子女。
        </p>

        <h2>勞務所得與非勞務所得</h2>
        <ArticleTable
          head={['非勞務所得（可能適用兒童稅）', '勞務所得（按孩子的稅率課稅）']}
          rows={[
            ['應稅利息與股利', '工資與薪水'],
            ['資本利得，包括資本利得分配', '小費'],
            ['租金與權利金', '孩子實際工作所得的其他報酬'],
            ['沒有列在 Form W-2 上的應稅獎學金', '孩子自己提供服務的部分自雇所得'],
            ['失業給付、應稅退休金與信託所得', ''],
          ]}
        />

        <h2>主要金額</h2>
        <ArticleTable
          head={['金額', '2025', '2026']}
          rows={[
            ['超過多少非勞務所得要用 Form 8615', '$2,700', '2026 年 Form 8615 草案及填寫說明為 $2,700（尚未定案）'],
            ['基本金額（Form 8615 門檻是這個金額的兩倍）', '$1,350', '$1,350'],
            ['Form 8814 選擇：孩子的總所得必須', '超過 $1,350 且低於 $13,500', '超過 $1,350 且低於 $13,500'],
          ]}
        />
        <p>
          Rev. Proc. 2025-32 在 2026 年維持 $1,350 的金額與 $13,500 的 Form 8814 上限。$2,700 的 Form 8615 門檻是 $1,350 的兩倍，2026 年 Form 8615 草案及其填寫說明草案也使用 $2,700 與相同的年齡條件。草案可能變動，所以報稅前請以正式的 2026 年表格確認。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Sam</strong> 15 歲，持有祖父母送他的股票。2025 年他收到 $5,000 的合格股利，沒有勞務所得。他被申報為受扶養人，沒有採用分項扣除。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['非勞務所得（Form 8615 第 1 行）', '$5,000'],
            ['不按父母稅率課稅的金額（第 2 行）', '$2,700'],
            ['按父母稅率課稅的淨非勞務所得（第 3 行）', '$2,300'],
          ]}
        />
        <p>
          在這 $2,700 中，前 $1,350 一般由 Sam 作為受扶養人的標準扣除額抵銷，接下來的 $1,350 按 Sam 自己的稅率課稅。其餘 $2,300 按父母的稅率課稅；因為是合格股利，依 Form 8615 填寫說明，要用 Qualified Dividends and Capital Gain Tax Worksheet 計算稅額。Sam 用 Form 8615 申報自己的稅表。如果他還有 $3,000 的暑期打工收入，這筆工資按他自己的稅率課稅，而不是父母的稅率。
        </p>

        <h2>Form 8814：把孩子的所得申報在父母的稅表上</h2>
        <p>
          如果符合下列<strong>所有</strong>條件（2025 年），父母可以選擇把孩子的所得申報在父母的稅表上，孩子就不用報稅：
        </p>
        <ul>
          <li>孩子年底未滿 19 歲（全職學生為未滿 24 歲）；</li>
          <li>孩子<strong>唯一</strong>的所得是利息與股利，包括資本利得分配與 Alaska Permanent Fund 股利；</li>
          <li>孩子的總所得<strong>低於 $13,500</strong>（依 Rev. Proc. 2024-40，並且超過 $1,350）；</li>
          <li>孩子必須報稅、沒有合併申報、沒有繳預估稅，也沒有預扣聯邦所得稅；以及</li>
          <li>父母符合資格——例如與孩子的另一位父母合併申報，或未婚時是有監護權的一方。</li>
        </ul>
        <p>
          <strong>可能多繳稅。</strong>Form 8814 填寫說明指出，這項選擇會對孩子 $1,350 到 $2,700 之間的所得課 10% 的稅。如果孩子有合格股利或資本利得分配，可能比孩子單獨報稅多繳最多 <strong>$135</strong>，因為單獨報稅時這些金額的稅率可能低到 0%。把孩子的所得加到你的稅表上也會提高你的 AGI，可能影響其他扣除額與抵稅額。兩種方式都要算算看。
        </p>

        <h2>贈與的股票與監護帳戶</h2>
        <ul>
          <li><strong>贈與的股票：</strong>屬於孩子的財產所產生的所得，就是孩子的非勞務所得，不論財產是誰、何時送的。</li>
          <li><strong>監護帳戶：</strong>如果帳戶及其投資屬於孩子，利息、股利與收益就是孩子的所得，可能觸發兒童稅。</li>
          <li><strong>出售贈與的股票：</strong>孩子一般沿用贈與人的成本基礎計算收益，所以很大的內含收益可能讓孩子超過 $2,700。成本基礎與 Form 709 請參考<a href="/zh-tw/library/individual/gift-tax-form-709/">贈與稅指南</a>。</li>
        </ul>

        <h2>孩子什麼時候必須報稅</h2>
        <p>
          Form 8615 附在孩子自己的稅表上，而且只有在孩子必須報稅時才需要。受扶養人的報稅門檻取決於孩子的勞務所得、非勞務所得與總所得；請參考<a href="/zh-tw/library/individual/do-i-need-to-file/">我需要申報美國聯邦稅表嗎？</a>
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把兒童稅套用在工資上。</strong>它只涵蓋非勞務所得。</li>
          <li><strong>忘了年紀較大的學生。</strong>19 到 23 歲的全職學生也可能適用。</li>
          <li><strong>以為贈與的股票是贈與人的所得。</strong>一旦屬於孩子，所得就是孩子的。</li>
          <li><strong>沒有比較兩種方式</strong>就選擇 Form 8814。</li>
          <li><strong>把 2026 年草案的金額當成定案</strong>，沒有確認正式的 2026 年表格。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>有信託所得的孩子、需要合併計算父母稅率的多位孩子、離婚或分居的父母、替代性最低稅，以及非美國公民或居民的孩子，都可能讓兒童稅變得複雜。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

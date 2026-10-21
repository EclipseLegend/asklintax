import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/form-1099-div-1099-int-boxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-1099-div-1099-int-boxes',
  sourceHash:      '4f998b0f4c79',
  id:            '90',
  title:         'Form 1099-DIV 與 1099-INT 逐欄解說',
  titleEn:       'Form 1099-DIV and 1099-INT Explained Box by Box',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據表格上的收件人說明、Form 1099-DIV 與 1099-INT 填寫說明、Publication 550（2025），以及 2025 年 Form 1040、Schedule B 與 Schedule D 填寫說明，說明 Form 1099-DIV 與 1099-INT（2024 年 1 月修訂版，用於 2025 與 2026 稅務年度）上的收件人欄位，以及各金額一般填在 2025 年 Form 1040 的哪裡。本文不詳細涵蓋清算分配、外國人的第 897 條金額、市場折價、REMIC，也不涵蓋州稅',
  persona:       ['共同基金與 ETF 投資人', '持有美國國庫券、國庫票據、國庫債券或儲蓄債券的人', '以溢價購買債券的投資人', '表格上除了 1a 與 1b 之外還有其他欄位有金額的人'],
  relatedJourney: ['投資與加密貨幣', '準備報稅'],
  actionRequired: '逐欄檢查每一份 Form 1099-DIV 與 1099-INT。把一般股利與合格股利、資本利得分配，以及應稅與免稅利息填在正確的行；對資本返還的金額減少成本基礎，並申報預扣稅、外國稅與提前解約罰金。',
  sources: [
    { label: 'IRS — Form 1099-DIV（2024 年 1 月修訂版），含收件人說明', url: 'https://www.irs.gov/pub/irs-pdf/f1099div.pdf' },
    { label: 'IRS — Form 1099-INT（2024 年 1 月修訂版），含收件人說明', url: 'https://www.irs.gov/pub/irs-pdf/f1099int.pdf' },
    { label: 'IRS — Form 1099-DIV 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1099div.pdf' },
    { label: 'IRS — Form 1099-INT 與 1099-OID 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1099int.pdf' },
    { label: 'IRS — Publication 550（2025），投資所得與費用', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 年 Schedule B（Form 1040）填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sb.pdf' },
    { label: 'IRS — 2025 年 Schedule D（Form 1040）填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
  ],
}

const FAQS = [
  {
    q: '如果我最近才買基金，資本利得分配是短期的嗎？',
    a: '不是。Publication 550 說，第 2a 欄的資本利得分配要申報為長期資本利得，不論你持有基金股份多久。',
  },
  {
    q: '第 3 欄的資本返還要繳稅嗎？',
    a: '一開始不用。非股利分配會減少你在股份上的成本基礎，在成本基礎減到零之前不課稅。之後收到的金額是資本利得。',
  },
  {
    q: '第 7 欄的外國稅可以不填 Form 1116 就申報抵免嗎？',
    a: '常常可以。Form 1040 填寫說明允許你在不填 Form 1116 的情況下申報抵免，條件包括：你所有的海外所得都是 1099 或 Schedule K-3 上申報的利息與股利，而且外國稅不超過 $300（夫妻合併申報為 $600）等。',
  },
  {
    q: 'Form 1099-INT 第 3 欄的國庫券利息要課稅嗎？',
    a: '美國國庫券、國庫票據與國庫債券的利息要繳聯邦所得稅，但免繳州與地方所得稅。第 3 欄中的儲蓄債券利息不一定全部都要課稅，請參考 Publication 550。',
  },
  {
    q: '我提前解約定存，要申報全部的利息嗎？',
    a: '要。申報第 1 欄的全部利息，再把第 2 欄的提前解約罰金扣除在 Schedule 1（Form 1040）第 18 行。',
  },
  {
    q: '免稅利息會影響我的稅表嗎？',
    a: '它要申報在 Form 1040 第 2a 行，但不課稅。Form 1099-INT 第 9 欄或 Form 1099-DIV 第 13 欄的金額，可能與另類最低稅（AMT）有關。',
  },
]

const RELATED = [
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: '銀行利息和股利要申報嗎？',
    desc:  '入門指南：基本申報，以及什麼時候要填 Schedule B。',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '合格股利與資本利得分配適用的稅率。',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business & Self-Employment',
    title: 'QBI 扣除額：2025 與 2026 年規定',
    desc:  '第 5 欄第 199A 條股利可能適用的扣除額。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '海外所得與外國稅額抵免。',
  },
]

export default function Form1099Div1099IntBoxesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Form 1099-DIV 與 1099-INT 逐欄解說 | AskLinTax 繁體中文',
      description: 'Form 1099-DIV 與 1099-INT 每一欄的說明：合格股利、資本利得分配、資本返還、第 199A 條股利、外國稅、國庫券與儲蓄債券利息、OID 與債券溢價。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>Form 1099-DIV</strong> 申報股利與基金分配；<strong>Form 1099-INT</strong> 申報利息。第 1a 欄與第 1 欄只是開始：其他欄位會改變金額的課稅方式、在稅表上填哪裡，或是否課稅。本文說明目前表格（2024 年 1 月修訂版，用於 2025 與 2026 年）上的每一欄。基本觀念，例如小額要不要申報、什麼時候要填 Schedule B，請參考<a href="/zh-tw/library/investment/interest-and-dividends/">銀行利息和股利要申報嗎？</a>
        </p>

        <h2>Form 1099-DIV 逐欄說明</h2>
        <ArticleTable
          head={['欄位', '顯示什麼', '你一般怎麼處理']}
          rows={[
            ['1a：一般股利總額', '應稅的一般股利', 'Form 1040 第 3b 行；必要時也填 Schedule B'],
            ['1b：合格股利', '第 1a 欄中可能適用 0%、15% 或 20% 稅率的部分', '符合持有期間時填 Form 1040 第 3a 行'],
            ['2a：資本利得分配總額', '基金或 REIT 的資本利得分配', '長期資本利得：Schedule D 第 13 行，或不需要 Schedule D 時填 Form 1040 第 7a 行'],
            ['2b：未回收第 1250 條收益', '第 2a 欄中來自可折舊不動產的部分', '未回收第 1250 條收益工作表（最高稅率 25%）'],
            ['2c：第 1202 條利得', '第 2a 欄中來自小型企業股票的部分', '排除額請參考 Schedule D 填寫說明'],
            ['2d：收藏品（28%）利得', '第 2a 欄中來自收藏品的部分', '28% Rate Gain Worksheet 第 4 行'],
            ['2e 與 2f：第 897 條金額', '來自美國不動產權益的利得', '只適用於外國人與外國實體'],
            ['3：非股利分配', '資本返還', '不課稅；減少成本基礎。超過成本基礎的部分是資本利得'],
            ['4：聯邦所得稅預扣', '備用預扣', '在稅表上申報為已預扣稅款'],
            ['5：第 199A 條股利', '第 1a 欄中的一部分', '可能適用合格營業所得扣除（Form 8995 或 8995-A）'],
            ['6：投資費用', '你分攤的非公開發行基金費用', '已包含在第 1a 欄'],
            ['7：已付外國稅；8：國家', '股利的外國稅', '可以申報為抵免或扣除'],
            ['9 與 10：清算分配', '現金與非現金清算分配', '至少有一部分是資本返還；請參考 Publication 550'],
            ['12：免稅利息股利', '基金的免稅股利', 'Form 1040 第 2a 行（不課稅）'],
            ['13：特定私人活動債券利息股利', '第 12 欄中的一部分', '可能是 AMT 項目；請參考 Form 6251 填寫說明'],
          ]}
        />

        <h2>股利欄位的補充說明</h2>
        <ul>
          <li><strong>合格股利：</strong>普通股一般必須在除息日前 60 天開始的 121 天期間內持有超過 60 天。對於股利所屬期間合計超過 366 天的特別股，條件是在除息日前 90 天開始的 181 天期間內持有超過 90 天。有些股利永遠不是合格股利，即使出現在第 1b 欄。</li>
          <li><strong>不填 Schedule D 申報資本利得分配：</strong>依 Form 1040 填寫說明，如果你沒有資本損失、唯一的資本利得是資本利得分配，而且所有 Form 1099-DIV 的第 2b、2c、2d 欄都沒有金額，就可以把第 2a 欄直接填在第 7a 行，不用填 Form 8949 與 Schedule D。</li>
          <li><strong>資本返還：</strong>如果你分批買進股份，又無法確認非股利分配對應哪些股份，要先減少最早買進那批的成本基礎。</li>
        </ul>

        <h2>Form 1099-INT 逐欄說明</h2>
        <ArticleTable
          head={['欄位', '顯示什麼', '你一般怎麼處理']}
          rows={[
            ['1：利息收入', '應稅利息（不包括第 3 欄）', 'Form 1040 第 2b 行；必要時也填 Schedule B'],
            ['2：提前解約罰金', '提前解約時被沒收的利息或本金', '申報第 1 欄全部金額，再把這筆扣除在 Schedule 1 第 18 行'],
            ['3：美國儲蓄債券與國庫證券', '儲蓄債券與國庫券、國庫票據、國庫債券的利息', '要繳聯邦稅（儲蓄債券利息不一定全部課稅）；免繳州與地方所得稅'],
            ['4：聯邦所得稅預扣', '備用預扣', '在稅表上申報為已預扣稅款'],
            ['5：投資費用', '分攤的單一類別 REMIC 費用', '已包含在第 1 欄；不能扣除'],
            ['6：已付外國稅；7：國家', '利息的外國稅', '可以申報為抵免或扣除'],
            ['8：免稅利息', '免稅利息，例如市政債券', 'Form 1040 第 2a 行（不課稅）'],
            ['9：特定私人活動債券利息', '第 8 欄中的一部分', '一般申報在 Form 6251 第 2g 行'],
            ['10：市場折價', '你做了選擇時應計的市場折價', '請參考 Publication 550'],
            ['11：債券溢價', '應稅債券的溢價攤銷', '如果你選擇攤銷，會減少應稅利息'],
            ['12：國庫證券的債券溢價', '國庫證券的溢價攤銷', '如果你選擇攤銷，會減少第 3 欄利息'],
            ['13：免稅債券的債券溢價', '免稅債券的溢價攤銷', '第 2a 行只申報免稅利息的淨額'],
            ['14：CUSIP 號碼；15–17：州', '識別資料與州預扣', '供你留存與州稅表使用'],
          ]}
        />

        <h2>儲蓄債券、OID 與債券溢價</h2>
        <ul>
          <li><strong>儲蓄債券：</strong>如果你用現金收付制（大多數個人都是），一般在收到時申報儲蓄債券利息，不過 Publication 550 也說明了其他申報方式。如果你兌現了 1989 年以後發行的 EE 或 I 系列債券，並支付了合格的高等教育費用，可能可以用 Form 8815 排除部分利息（Schedule B 第 3 行）。</li>
          <li><strong>原始發行折價（OID）：</strong>OID 是一種利息，即使沒有收到款項，一般也要隨著應計計入所得，並申報在 Form 1099-OID 上。很小的「微量（de minimis）」折價可以視為零。如果你申報的 OID 少於表格上的金額，要依 Schedule B 填寫說明，把差額標示為「OID Adjustment」。</li>
          <li><strong>債券溢價：</strong>應稅債券可以選擇攤銷溢價，攤銷會減少你的應稅利息與成本基礎。免稅債券必須攤銷溢價，但攤銷金額不能扣除。如果表格分別列出總利息與溢價，在 Schedule B 上以「ABP Adjustment」減除。如果付款人已經申報淨利息，就不能再減。</li>
        </ul>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Kai</strong> 是單身。Kai 的基金寄來一份 Form 1099-DIV，銀行與國庫證券帳戶寄來 Form 1099-INT：
        </p>
        <ArticleTable
          head={['表格與欄位', '金額', '填在哪裡']}
          rows={[
            ['1099-DIV 第 1a 欄', '$2,400', 'Form 1040 第 3b 行與 Schedule B（超過 $1,500）'],
            ['1099-DIV 第 1b 欄', '$1,800', 'Form 1040 第 3a 行（符合持有期間）'],
            ['1099-DIV 第 2a 欄', '$600', '長期資本利得（不需要 Schedule D 時填第 7a 行）'],
            ['1099-DIV 第 3 欄', '$300', '不課稅；減少基金股份的成本基礎'],
            ['1099-DIV 第 5 欄', '$200', '屬於 $2,400 的一部分；可能適用 QBI 扣除'],
            ['1099-DIV 第 7 欄', '$45', '如果符合所有條件，不填 Form 1116，在 Schedule 3 申報外國稅額抵免'],
            ['1099-DIV 第 12 欄', '$500', 'Form 1040 第 2a 行（免稅）'],
            ['1099-INT 第 1 欄與第 3 欄', '$1,200 與 $900', '應稅利息 $2,100 填在第 2b 行與 Schedule B；其中 $900 免繳州稅'],
            ['1099-INT 第 2 欄', '$80', '扣除在 Schedule 1 第 18 行'],
          ]}
        />

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把第 1b 欄加到第 1a 欄上</strong>：合格股利已經包含在第 1a 欄。</li>
          <li><strong>把 Form 1099-DIV 第 3 欄當作所得</strong>，而不是減少成本基礎。</li>
          <li><strong>漏掉 Form 1099-INT 第 3 欄</strong>，因為它沒有包含在第 1 欄。</li>
          <li><strong>把提前解約罰金直接和利息相抵</strong>，而不是在 Schedule 1 上扣除。</li>
          <li><strong>對所有股利申報 QBI 扣除</strong>，而不是只對第 5 欄符合的金額。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請確認你的表格版本</div>
          <p>本文的欄位編號依據 Form 1099-DIV 與 1099-INT 的 2024 年 1 月修訂版。行號依據 2025 年 Form 1040，之後年度可能不同。本文不詳細涵蓋清算分配、市場折價、外國人的第 897 條金額，也不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

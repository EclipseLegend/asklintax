import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/investment-interest-expense.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'investment-interest-expense',
  sourceHash:      '811bb114974d',
  id:            '88',
  title:         '融資與投資借款利息：Form 4952 投資利息扣除',
  titleEn:       'Margin and Investment Loan Interest: The Form 4952 Deduction',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 4952 及其填寫說明（2025）、Publication 550（2025）、IRS Topic no. 505、Rev. Proc. 2025-32，以及說明 P.L. 119-21 第 70111 條的 2026 年 Form 8960 填寫說明草案，說明 2025 與 2026 稅務年度個人的投資利息費用扣除。2026 年第 68 條限制只依草案說明。本文不涵蓋利息追蹤規定、被動活動、遺產與信託，也不涵蓋州稅',
  persona:       ['用融資（保證金）借錢的投資人', '借錢買股票或其他投資的人', '有投資所得、採用分項扣除的人', '為 2026 年做規劃的高收入投資人'],
  relatedJourney: ['投資與加密貨幣', '投資帶來的副業收入'],
  actionRequired: '如果你採用分項扣除，並且為了買投資而借錢支付了利息，就用 Form 4952 計算扣除額：扣除額以你的淨投資所得為上限，超過的部分可以結轉。是否選擇把合格股利或資本利得當作投資所得，要謹慎決定。',
  sources: [
    { label: 'IRS — Form 4952，投資利息費用扣除（2025），含填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/f4952.pdf' },
    { label: 'IRS — Publication 550（2025），投資所得與費用', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Topic no. 505，利息費用（Interest expense）', url: 'https://www.irs.gov/taxtopics/tc505' },
    { label: 'IRS — 2026 年 Form 8960 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '融資利息可以扣除嗎？',
    a: '一般可以，如果你採用分項扣除，它屬於投資利息。扣除額以你當年的淨投資所得為上限，申報在 Schedule A（Form 1040）第 9 行，通常要先填 Form 4952。',
  },
  {
    q: '如果我用標準扣除額，還能扣除投資利息嗎？',
    a: '不能。投資利息是分項扣除額，只有在你採用分項扣除時才有幫助。',
  },
  {
    q: '不能扣除的利息怎麼辦？',
    a: '它會結轉到下一個稅務年度，並視為該年度支付的投資利息。Publication 550 說，即使它超過你支付那年的應稅所得，你也可以結轉。',
  },
  {
    q: '我的合格股利算投資所得嗎？',
    a: '不會自動算。投資財產的合格股利與資本利得淨額不算投資所得，除非你在 Form 4952 第 4g 行選擇把它們算進去。如果你做了選擇，這些金額要按一般稅率課稅，而不是較低的資本利得稅率，而且只有經 IRS 同意才能撤銷這項選擇。',
  },
  {
    q: '我的投資顧問費可以扣除嗎？',
    a: '不行。顧問費與經紀手續費屬於雜項分項扣除額，不能扣除。P.L. 119-21 讓 2017 年以後開始的稅務年度永久不得扣除。',
  },
  {
    q: '為了買市政債券而借款的利息可以扣除嗎？',
    a: '不行。為了購買或持有產生免稅所得的投資而借款的利息不能扣除。',
  },
]

const RELATED = [
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: '銀行利息和股利要申報嗎？',
    desc:  '構成投資所得的利息與股利。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  '投資利息如何減少 NIIT 的淨投資所得。',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '做出選擇時你會放棄的資本利得稅率。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '分項扣除額如何減少應稅所得。',
  },
]

export default function InvestmentInterestExpenseZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '融資與投資借款利息：Form 4952 投資利息扣除 | AskLinTax 繁體中文',
      description: '投資利息費用說明：融資利息、淨投資所得上限、Form 4952、Schedule A、結轉、合格股利與資本利得的選擇，以及 2025 與 2026 年規定的差別。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          為了買投資而借款所支付的利息，例如<strong>融資利息</strong>或投資貸款利息，屬於<strong>投資利息</strong>。如果你採用分項扣除，可以在 <strong>Schedule A</strong> 上扣除，但以你當年的<strong>淨投資所得</strong>為上限。你在 <strong>Form 4952</strong> 上計算這個上限，不能扣除的金額可以<strong>結轉</strong>。
        </p>

        <h2>哪些算投資利息</h2>
        <p>
          投資利息是指借款（或部分借款）中可分攤到投資用財產的已付或應計利息；投資用財產是指在營業以外產生利息、股利、年金或權利金，或你為了獲利而持有的財產。它<strong>不</strong>包括：
        </p>
        <ul>
          <li>房屋貸款利息（合格住宅利息）或其他個人利息；</li>
          <li>可分攤到被動活動（例如大多數出租活動）的利息；</li>
          <li>資本化的利息；</li>
          <li>用來購買或持有免稅投資的借款利息。</li>
        </ul>
        <p>
          重點在於借來的錢怎麼使用。如果一筆貸款用於多種用途，利息可能需要分攤。
        </p>

        <h2>淨投資所得上限</h2>
        <p>
          你的扣除額以<strong>淨投資所得</strong>為上限：投資所得減去利息以外的投資費用。在 Form 4952 上：
        </p>
        <ul>
          <li><strong>投資所得</strong>包括投資財產的應稅利息與一般股利，但<strong>不</strong>包括合格股利或資本利得淨額，除非你選擇把它們算進去。</li>
          <li><strong>投資費用</strong>是與產生投資所得直接相關、可扣除的費用。顧問費等大多數費用屬於雜項分項扣除額，不能扣除。</li>
        </ul>

        <h2>合格股利與資本利得的選擇</h2>
        <p>
          你可以選擇把部分或全部合格股利與資本利得淨額算進投資所得（Form 4952 第 4g 行）。這會提高你的扣除上限，但選擇的金額<strong>不再適用</strong> 0%、15% 或 20% 的資本利得稅率，而要按一般稅率課稅。這項選擇只有經 IRS 同意才能撤銷，所以要先比較兩種做法的稅額。如果你做了選擇，要用 Schedule D Tax Worksheet 計算稅額。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Ana 與 Ben</strong> 夫妻合併申報並採用分項扣除。他們支付了 <strong>$8,000</strong> 的融資利息。投資所得包括 $2,000 的應稅利息與 $5,000 的一般股利（其中 $4,000 是合格股利），另有 $10,000 的長期資本利得。他們沒有其他投資費用，也沒有結轉金額。
        </p>
        <ArticleTable
          head={['Form 4952 欄位', '不做選擇', '選擇 $5,000']}
          rows={[
            ['第 3 行：投資利息費用總額', '$8,000', '$8,000'],
            ['第 4a 行：利息與一般股利', '$7,000', '$7,000'],
            ['第 4b 行：第 4a 行中的合格股利', '$4,000', '$4,000'],
            ['第 4c 行：第 4a 行減第 4b 行', '$3,000', '$3,000'],
            ['第 4d 與 4e 行：處分淨利得與資本利得淨額', '$10,000', '$10,000'],
            ['第 4f 行：第 4d 行減第 4e 行', '$0', '$0'],
            ['第 4g 行：選擇的金額', '$0', '$5,000'],
            ['第 4h 與第 6 行：淨投資所得', '$3,000', '$8,000'],
            ['第 8 行：扣除額（第 3 行或第 6 行中較小者）', '$3,000', '$8,000'],
            ['第 7 行：結轉到 2026 年', '$5,000', '$0'],
          ]}
        />
        <p>
          不做選擇時，他們扣除 $3,000，並結轉 $5,000。做了選擇，他們現在就能扣除全部 $8,000，但有 $5,000 的合格股利或資本利得要按一般稅率課稅，而不是較低的稅率。哪一種比較好，取決於他們的稅率級距，以及預期以後年度是否還有投資所得。
        </p>

        <h2>什麼時候不需要 Form 4952</h2>
        <p>
          如果下列<strong>全部</strong>符合，你就不需要填 Form 4952：
        </p>
        <ul>
          <li>你的利息與一般股利投資所得減去合格股利後，大於你的投資利息費用；</li>
          <li>你沒有其他可扣除的投資費用；而且</li>
          <li>你沒有前一年未准扣除的投資利息結轉。</li>
        </ul>

        <h2>2025 與 2026 年的差別</h2>
        <ArticleTable
          head={['', '2025 年', '2026 年']}
          rows={[
            ['Form 4952 上限與結轉', '適用', '適用（未發現變動）'],
            ['雜項投資費用（顧問費）', '不能扣除', '不能扣除，P.L. 119-21 第 70110 條使其永久化'],
            ['第 68 條分項扣除額整體限制', '不適用於投資利息', '已立法（P.L. 119-21 第 70111 條）：投資利息不再豁免於第 68 條的限制'],
          ]}
        />
        <p>
          <strong>哪些已立法、哪些是草案：</strong>2026 年的這項變動是已立法的法律。如何在稅表上適用，則來自 <strong>2026 年 Form 8960 填寫說明草案</strong>，其中說明了新的第 68 條工作表，並指出這項限制一般適用於最高稅率級距的人。依 Rev. Proc. 2025-32，2026 年 37% 級距從應稅所得超過下列金額開始：單身與戶長 $640,600，夫妻合併申報 $768,700，夫妻分開申報 $384,350。報稅前請查看正式的 2026 年表格與填寫說明；本文不計算 2026 年的限制金額。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把房屋貸款利息當作投資利息扣除</strong>，或反過來。</li>
          <li><strong>沒有做選擇卻把合格股利算進投資所得。</strong></li>
          <li><strong>沒有比較</strong>做與不做選擇的稅額就做選擇。</li>
          <li><strong>忘了追蹤</strong> Form 4952 第 7 行的結轉金額。</li>
          <li><strong>把顧問費當作投資費用扣除。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 追蹤規定與 2026 年規定</div>
          <p>借款用於多種用途時，利息的分攤要依照詳細的追蹤規定，本文不涵蓋。2026 年第 68 條工作表只見於填寫說明草案。本文也不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

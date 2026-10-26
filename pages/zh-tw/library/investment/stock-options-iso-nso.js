import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/stock-options-iso-nso.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'stock-options-iso-nso',
  sourceHash:      '1d752a3551f9',
  id:            '83',
  title:         '員工股票選擇權：ISO 與 NSO、Form 3921 與另類最低稅',
  titleEn:       'Stock Options: ISOs vs. NSOs, Form 3921 and the AMT',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 525（2025）、IRS Topic no. 427、Form 3921 填寫說明（2025 年 4 月修訂版）、2025 年 Form 6251 填寫說明，以及 2025 年 Form 8949 填寫說明，說明 2025 與 2026 稅務年度員工股票選擇權 — 激勵型股票選擇權（ISO）與非法定股票選擇權（NSO）— 的聯邦所得稅處理。另類最低稅（AMT）只做概念說明；是否要繳 AMT，必須完成整份 Form 6251 的計算。本文不詳細涵蓋有容易確定價值的選擇權、提前行使，以及州稅',
  persona:       ['持有股票選擇權的新創與科技業員工', '收到 Form 3921 的人', '正在決定何時行使或賣出的員工', '行使 ISO 後意外被課 AMT 的人'],
  relatedJourney: ['準備報稅', '金錢與福利'],
  actionRequired: '先確認你的選擇權是 ISO 還是 NSO。行使 ISO 之前，考慮行使年度的 AMT 影響，以及合格出售所需的持有期間。保留 Form 3921，並同時追蹤一般稅制的成本基礎與 AMT 成本基礎。',
  sources: [
    { label: 'IRS — Publication 525（2025），應稅與免稅所得（股票選擇權）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Topic no. 427，股票選擇權（Stock options）', url: 'https://www.irs.gov/taxtopics/tc427' },
    { label: 'IRS — Form 3921 與 3922 填寫說明（2025 年 4 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i3921.pdf' },
    { label: 'IRS — 2025 年 Form 6251 填寫說明，個人另類最低稅', url: 'https://www.irs.gov/pub/irs-pdf/i6251.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: '選擇權授予時要繳稅嗎？',
    a: '通常不用。ISO 授予時沒有所得。NSO 只有在選擇權本身有容易確定的公平市價時（例如在市場上活躍交易），授予時才有所得，而大多數員工選擇權都不是這樣。',
  },
  {
    q: '行使 NSO 時會怎樣？',
    a: '一般沒有容易確定價值的 NSO，價差 — 股價減去行使價 — 是薪酬所得。雇主應該在 Form W-2 的 box 12 以代碼 V 申報，並計入你的工資。你的股票成本基礎是你支付的價格加上這筆所得。',
  },
  {
    q: '行使 ISO 時會怎樣？',
    a: '就一般所得稅而言，行使時不計入任何所得。就 AMT 而言，在你對股票的權利可以轉讓或不再有重大沒收風險的那一年，價差一般是 Form 6251 第 2i 行的調整項 — 除非你在同一年賣出股票。',
  },
  {
    q: 'ISO 的持有期間是多久？',
    a: '要讓 ISO 的全部獲利都適用資本利得，必須在授予日後 2 年與股票移轉給你後 1 年兩者較晚者之後才出售。提早出售就是不合格處分。',
  },
  {
    q: 'ISO 股票的不合格處分是什麼？',
    a: '如果你在符合持有期間之前出售且有獲利，獲利中最多等於行使時股價減去行使價的部分是一般所得；超過的部分是資本利得。如果賠錢賣出，就是資本損失，沒有一般所得。',
  },
  {
    q: '為什麼我需要兩種成本基礎？',
    a: 'ISO 的一般稅制成本基礎是行使價，但 AMT 成本基礎要加上 AMT 調整項。Publication 525 表示，兩種紀錄都要保留，才能分別計算一般稅制與 AMT 的獲利或損失。',
  },
]

const RELATED = [
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP 員工購股計畫怎麼課稅：合格與不合格處分及 Form 3922',
    desc:  '另一種法定選擇權。',
  },
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU 限制性股票單位怎麼課稅：歸屬、W-2 所得與出售時的成本基礎',
    desc:  '限制性股票單位和選擇權有什麼不同。',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
    desc:  '在 Form 8949 上更正選擇權股票的成本基礎。',
  },
  {
    href: '/library/individual/alternative-minimum-tax',
    cat:  'Individuals & Families',
    title: '替代性最低稅（AMT）：2025 與 2026 年規定',
    desc:  'AMT 如何計算，附 2025 與 2026 年數字。',
  },
]

export default function StockOptionsIsoNsoZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '員工股票選擇權：ISO 與 NSO、Form 3921 與 AMT | AskLinTax 繁體中文',
      description: '員工股票選擇權怎麼課稅：NSO 行使時的所得、ISO 持有期間、合格與不合格處分、AMT 調整、Form 3921，以及一般稅制與 AMT 的成本基礎。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          股票選擇權讓你用固定價格（<strong>行使價</strong>）購買公司股票。課稅方式取決於選擇權的種類：
        </p>
        <ul>
          <li><strong>非法定股票選擇權（NSO，也稱非合格選擇權）：</strong>通常在<strong>行使時以工資課稅</strong>，課稅金額是股價與行使價之間的價差。</li>
          <li><strong>激勵型股票選擇權（ISO）：</strong><strong>行使時不課一般所得稅</strong>，但價差可能觸發<strong>另類最低稅（AMT）</strong>。如果符合持有期間，出售時的全部獲利都是資本利得。</li>
        </ul>

        <h2>ISO 與 NSO 一覽</h2>
        <ArticleTable
          head={['階段', 'NSO（沒有容易確定的價值）', 'ISO']}
          rows={[
            ['授予', '沒有所得', '沒有所得'],
            ['行使 — 一般稅制', '價差是薪酬所得，列在 Form W-2（box 12，代碼 V）', '沒有所得'],
            ['行使 — AMT', '沒有另外的調整項（已經以工資課稅）', '價差一般是 Form 6251 第 2i 行的 AMT 調整項，除非你在同一年賣出'],
            ['一般稅制成本基礎', '行使價 + 計入的所得', '行使價（加上不合格處分產生的一般所得，如果有的話）'],
            ['AMT 成本基礎', '和一般稅制成本基礎相同', '行使價 + AMT 調整項'],
            ['出售', '依成本基礎計算資本利得或損失', '合格：全部是資本利得或損失。不合格：部分可能是一般所得'],
            ['雇主提供的表格', 'Form W-2', 'Form 3921'],
          ]}
        />

        <h2>ISO 持有期間與不合格處分</h2>
        <p>
          如果你在<strong>授予日後 2 年</strong>與<strong>股票移轉給你後 1 年</strong>兩者較晚者之後才出售，就符合 ISO 持有期間。從授予日到行使前 3 個月（如果你失能則為 1 年），你也必須是該公司（或關係企業）的員工。<strong>不合格處分</strong>有獲利時，獲利中最多等於行使時股價減去行使價的部分是一般所得，其餘是資本利得。虧損則是資本損失，沒有一般所得。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>NSO：</strong>Ben 有 1,000 股、行使價 $10 的 NSO。他在 2025 年 4 月股價 $25 時行使，2025 年 W-2 工資中有 <strong>$15,000</strong> 的薪酬所得（$25 − $10，× 1,000）。他的成本基礎是 $25,000（支付 $10,000 + 所得 $15,000）。他在 2026 年 2 月以每股 $30（$30,000）賣出，距離行使不到一年，有 <strong>$5,000 的短期資本利得</strong>。
        </p>
        <p>
          <strong>ISO，合格出售：</strong>Kim 在 2024 年 2 月 1 日獲得 100 股、行使價 $20 的 ISO。她在 2025 年 3 月 3 日股價 $50 時行使，股票可以自由轉讓。她在 2026 年 6 月 1 日以每股 $70 賣出 — 在 2026 年 2 月 1 日（授予後 2 年）與 2026 年 3 月 3 日（移轉後 1 年）之後。
        </p>
        <ArticleTable
          head={['', '一般稅制', 'AMT（概念）']}
          rows={[
            ['2025 年（行使年度）', '沒有所得', 'Form 6251 第 2i 行調整項 $3,000（（$50 − $20）× 100）'],
            ['股票成本基礎', '$2,000', '$5,000（$2,000 + $3,000）'],
            ['2026 年以 $7,000 出售', '長期資本利得 $5,000', '以 $5,000 AMT 成本基礎計算的獲利是 $2,000'],
          ]}
        />
        <p>
          這 $3,000 的調整項是否真的讓 Kim 在 2025 年要繳 AMT，取決於她整份稅表與完整的 Form 6251 計算，本文不做這項計算。
        </p>
        <p>
          <strong>ISO，不合格出售：</strong>如果 Kim 改在 2025 年 12 月 1 日以每股 $70 賣出全部 100 股，她會有 $3,000 的一般所得（行使時股價 $50 減去 $20，× 100），以工資申報，以及從 $5,000 成本基礎計算的 $2,000 短期資本利得。因為她在行使的同一年賣出，這些股票不需要 AMT 調整。
        </p>

        <h2>Form 3921 與 Form 1099-B</h2>
        <p>
          你行使 ISO 之後，雇主應該在隔年 1 月 31 日前給你 <strong>Form 3921</strong>。上面列出授予日（box 1）、行使日（box 2）、每股行使價（box 3）、行使日每股公平市價（box 4）與股數（box 5）。2013 年之後授予的選擇權，Form 1099-B 上的成本基礎不會包含你申報為所得的金額，所以你可能需要在 Form 8949 上用代碼 B 調整。請見<a href="/zh-tw/library/investment/cost-basis-form-1099-b/">成本基礎與 Form 1099-B</a>。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>行使 ISO 並持有股票的那一年忽略 AMT。</strong></li>
          <li><strong>ISO 股票只保留一種成本基礎。</strong>你需要一般稅制成本基礎與 AMT 成本基礎兩種。</li>
          <li><strong>從歸屬日開始計算持有期間</strong>，而不是依授予日與行使日。</li>
          <li><strong>NSO 所得申報兩次</strong> — 一次在 W-2 工資，一次因為沒有調整成本基礎而變成資本利得。</li>
          <li><strong>以為每一種選擇權都是 ISO。</strong>如果不符合僱用或轉讓規定，選擇權就是 NSO。</li>
        </ul>

        <h2>你會看到的表格</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Form W-2', 'NSO 行使所得（box 12，代碼 V）與 ISO 不合格處分所得'],
            ['Form 3921', 'ISO 行使資訊'],
            ['Form 6251', '另類最低稅，包括 ISO 調整項（第 2i 行）'],
            ['Form 1099-B、Form 8949 與 Schedule D', '股票出售與成本基礎更正'],
            ['Schedule 1（Form 1040）第 8k 行', '沒有列在 W-2 上的選擇權所得'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ AMT 很複雜</div>
          <p>上面的 AMT 範例只說明概念。是否要繳 AMT，取決於你整份稅表與 Form 6251 的計算。行使大量 ISO 之前，可以考慮尋求專業協助。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

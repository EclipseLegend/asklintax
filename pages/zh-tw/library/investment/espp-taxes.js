import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/espp-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'espp-taxes',
  sourceHash:      'ea4b93481491',
  id:            '82',
  title:         'ESPP 員工購股計畫怎麼課稅：合格與不合格處分及 Form 3922',
  titleEn:       'ESPP Taxes: Qualifying vs. Disqualifying Dispositions and Form 3922',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 525（2025）、IRS Topic no. 427、Form 3922 與 2025 年 Form 8949 填寫說明，說明 2025 與 2026 稅務年度透過第 423 條員工購股計畫（ESPP）購買的股票的聯邦所得稅處理。公式依照 Publication 525。本文不涵蓋非第 423 條的購股計畫、美國以外的計畫，以及州稅',
  persona:       ['透過 ESPP 購買公司股票的員工', '收到 Form 3922 的人', '正在決定何時賣出 ESPP 股票的員工', 'ESPP 出售在 Form 1099-B 上成本基礎錯誤的人'],
  relatedJourney: ['準備報稅', '金錢與福利'],
  actionRequired: '保留每一份 Form 3922。賣出 ESPP 股票之前，先確認這次出售是否為合格處分（在授予日後 2 年與購買日後 1 年兩者較晚者之後）。賣出之後，確認一般所得有被申報，並在 Form 8949 上調整成本基礎。',
  sources: [
    { label: 'IRS — Publication 525（2025），應稅與免稅所得（法定股票選擇權；員工購股計畫）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Topic no. 427，股票選擇權（Stock options）', url: 'https://www.irs.gov/taxtopics/tc427' },
    { label: 'IRS — Form 3922（2025 年 4 月修訂版），依第 423(c) 條透過員工購股計畫取得股票的移轉', url: 'https://www.irs.gov/pub/irs-pdf/f3922.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: '用折扣價買 ESPP 股票時要繳稅嗎？',
    a: '第 423 條計畫不用。Publication 525 表示，法定股票選擇權在授予或行使時，都不需要把任何金額計入所得。課稅是在你賣出或以其他方式處分股票時。',
  },
  {
    q: '什麼是合格處分？',
    a: '在授予選擇權後 2 年（通常是認購期開始日）與股票移轉給你後 1 年（通常是購買日）兩者較晚者結束之後才出售。提早出售就是不合格處分。',
  },
  {
    q: '合格處分完全免稅嗎？',
    a: '不是。如果選擇權價格低於授予時的股價（有折扣），你的獲利中仍有一部分是一般所得 — 以授予日計算的折扣，與你實際獲利兩者較小者。其餘是資本利得。',
  },
  {
    q: '不合格處分如果是賠錢賣出，還有一般所得嗎？',
    a: '有。不合格處分的一般所得，是購買日的股價減去你支付的價格，Publication 525 表示它不以你的獲利為限。你要把這個金額加到成本基礎上，因此可能產生資本損失。',
  },
  {
    q: '一般所得要申報在稅表的哪裡？',
    a: '你的雇主或前雇主應該把它以工資列在 Form W-2 的 box 1。如果沒有列入，Publication 525 表示要申報在 Schedule 1（Form 1040）第 8k 行。',
  },
  {
    q: '為什麼我的 Form 1099-B 成本基礎看起來太低？',
    a: '2013 年之後授予的選擇權，Form 1099-B 上的成本基礎不會包含一般所得。請在 Form 8949 上用代碼 B 把這筆金額加進成本基礎，以免被課兩次稅。',
  },
]

const RELATED = [
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU 限制性股票單位怎麼課稅：歸屬、W-2 所得與出售時的成本基礎',
    desc:  '限制性股票單位怎麼課稅。',
  },
  {
    href: '/library/investment/stock-options-iso-nso',
    cat:  'Investments & Foreign Accounts',
    title: '員工股票選擇權：ISO 與 NSO、Form 3921 與另類最低稅',
    desc:  '另一種法定選擇權。',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
    desc:  '在 Form 8949 上更正成本基礎。',
  },
]

export default function EsppTaxesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'ESPP 怎麼課稅：合格與不合格處分 | AskLinTax 繁體中文',
      description: '第 423 條 ESPP 股票怎麼課稅：持有期間、合格與不合格處分、一般所得公式、資本利得或損失、Form 3922，以及成本基礎調整。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          依<strong>第 423 條</strong>設立的<strong>員工購股計畫（ESPP）</strong>，讓你購買雇主的股票，通常有最多 15% 的折扣。<strong>買進時不用繳稅</strong>。<strong>賣出</strong>時，你的利潤中可能有一部分是<strong>一般所得</strong>（工資），其餘是<strong>資本利得或損失</strong>。怎麼劃分，取決於這次出售是<strong>合格</strong>還是<strong>不合格</strong>處分。
        </p>

        <h2>第 423 條計畫的基本規定</h2>
        <ul>
          <li>ESPP 選擇權屬於<strong>法定股票選擇權</strong>。從授予日到行使前 3 個月，你都必須是該公司（或關係企業）的員工，而且選擇權除了死亡之外不得轉讓。</li>
          <li>選擇權價格可以低到股價的 <strong>85%</strong>。有些計畫採用認購期開始時（授予）與購買日（行使）兩者較低的股價。</li>
          <li>你的<strong>成本基礎</strong>一開始就是你支付的價格。薪資扣款的時間不影響成本基礎，持有期間從購買日的隔天開始。</li>
        </ul>

        <h2>合格處分與不合格處分</h2>
        <ArticleTable
          head={['', '合格處分', '不合格處分']}
          rows={[
            ['時間', '在授予日後 2 年與股票移轉給你後 1 年兩者較晚者之後', '任何更早的出售或其他處分'],
            ['一般所得（工資）', '如果選擇權有折扣：(1) 授予時股價減去選擇權價格，與 (2) 售價減去你支付的金額，兩者較小者', '購買日股價減去你支付的價格 — 不以你的獲利為限'],
            ['資本利得或損失', '售價減去（支付價格 + 一般所得）', '售價減去（支付價格 + 一般所得）'],
            ['如果賠錢賣出', '資本損失，沒有一般所得', '仍有一般所得，再加上較大的資本損失'],
          ]}
        />
        <p>
          合格處分時，如果選擇權價格在授予日並不固定（例如採用兩個價格中較低者的計畫），Publication 525 表示要把選擇權價格當作在授予日行使來計算。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>兩個範例共同的事實：</strong>Ana 的認購期從 2024 年 1 月 2 日（授予日）開始，當時股價 <strong>$40</strong>。2024 年 6 月 28 日（購買日）股價 <strong>$50</strong>。她的計畫價格是兩個股價中較低者的 85%：85% × $40 = <strong>$34</strong>。她以 $3,400 買進 100 股。
        </p>
        <p>
          <strong>合格處分：</strong>她在 2026 年 3 月 16 日以每股 $60 賣出全部 100 股。這是在 2026 年 1 月 2 日（授予後 2 年）與 2025 年 6 月 28 日（購買後 1 年）之後。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['出售收入（100 × $60）', '$6,000'],
            ['總獲利（$6,000 − $3,400）', '$2,600'],
            ['授予時的折扣：$40 − （$40 × 85% = $34），× 100 股', '$600'],
            ['一般所得：$600 與 $2,600 兩者較小者', '$600'],
            ['調整後成本基礎（$3,400 + $600）', '$4,000'],
            ['長期資本利得（$6,000 − $4,000）', '$2,000'],
          ]}
        />
        <p>
          <strong>不合格處分：</strong>如果她改在 2025 年 9 月 15 日以每股 $60 賣出全部 100 股 — 早於 2026 年 1 月 2 日。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['一般所得：（購買日股價 $50 − $34）× 100', '$1,600'],
            ['調整後成本基礎（$3,400 + $1,600）', '$5,000'],
            ['資本利得（$6,000 − $5,000）', '$1,000'],
            ['持有期間：2024 年 6 月 28 日至 2025 年 9 月 15 日', '超過 1 年，所以是長期'],
          ]}
        />
        <p>
          <strong>不合格處分且賠錢賣出：</strong>如果她在 2025 年 9 月 15 日以每股 $45（$4,500）賣出，她仍然有 $1,600 的一般所得，以及 $500 的資本損失（$4,500 − $5,000）。
        </p>

        <h2>Form 3922 與你的 Form 1099-B</h2>
        <p>
          你的雇主應該給你 <strong>Form 3922</strong>。上面列出授予日（box 1）、購買日（box 2）、授予日每股公平市價（box 3）與購買日每股公平市價（box 4）、每股支付價格（box 5）、股數（box 6）、法定所有權移轉日（box 7），以及 — 價格在授予日不固定時 — 假設在授予日行使所計算的每股價格（box 8）。2013 年之後授予的選擇權，Form 1099-B 上的成本基礎不會包含你的一般所得，所以請在 <a href="/zh-tw/library/investment/cost-basis-form-1099-b/">Form 8949</a> 上用代碼 B 加進去。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把全部獲利都當作資本利得申報</strong>，漏掉一般所得。</li>
          <li><strong>一般所得申報兩次</strong> — 一次在 W-2 工資，一次因為沒有調整成本基礎而變成資本利得。</li>
          <li><strong>把兩種測試搞混：</strong>合格測試（授予後 2 年與購買後 1 年）和長期資本利得的 1 年測試不一樣。</li>
          <li><strong>以為不合格處分賠錢就沒有一般所得。</strong></li>
          <li><strong>弄丟 Form 3922。</strong>你需要上面的日期與價格來計算如何劃分。</li>
        </ul>

        <h2>你會看到的表格</h2>
        <ArticleTable
          head={['表格', '用途']}
          rows={[
            ['Form 3922', 'ESPP 股票的日期、價值與價格'],
            ['Form W-2', '處分產生的一般所得，通常在 box 1'],
            ['Form 1099-B', '出售收入，以及券商申報的成本基礎'],
            ['Form 8949 與 Schedule D', '資本利得或損失，必要時調整成本基礎（代碼 B）'],
            ['Schedule 1（Form 1040）第 8k 行', '沒有列在 W-2 上的一般所得'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 只適用第 423 條計畫</div>
          <p>這些規定適用於符合第 423 條的員工購股計畫。不符合的計畫依非法定選擇權的規定課稅。請查看計畫文件。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

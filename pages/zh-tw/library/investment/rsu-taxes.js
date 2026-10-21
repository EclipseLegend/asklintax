import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/rsu-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'rsu-taxes',
  sourceHash:      'dd8acde38471',
  id:            '81',
  title:         'RSU 限制性股票單位怎麼課稅：歸屬、W-2 所得與出售時的成本基礎',
  titleEn:       'RSU Taxes: Vesting, W-2 Income and Cost Basis When You Sell',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 525（2025）、2025 年 Form 8949 填寫說明、2026 年 Form 1099-B 填寫說明、Publication 15（2026），以及 IRS 股權（股票）薪酬查核技術指南（Publication 5992，2024 年 6 月；IRS 表示它不是官方的法律見解），說明 2025 與 2026 稅務年度以股票交割的限制性股票單位（RSU）的聯邦所得稅處理。本文不詳細涵蓋以現金交割的 RSU、延後交割的計畫、非居民的所得來源，以及州稅',
  persona:       ['領取 RSU 的上市公司員工', '出售已歸屬股票的科技業員工', 'Form 1099-B 上成本基礎為零或偏低的人', '規劃歸屬所得預扣稅的員工'],
  relatedJourney: ['準備報稅', '金錢與福利'],
  actionRequired: 'RSU 交割時，記下交付的股數、每股公平市價，以及為了繳稅而被扣下的股數。出售時，比較 Form 1099-B 上的成本基礎和已經計入你 W-2 工資的價值，必要時在 Form 8949 上更正。',
  sources: [
    { label: 'IRS — Publication 525（2025），應稅與免稅所得（限制性財產；合格股權獎勵）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — 股權（股票）薪酬查核技術指南（Publication 5992，2024 年 6 月）', url: 'https://www.irs.gov/pub/irs-pdf/p5992.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明，資本資產的出售與其他處分', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — 2026 年 Form 1099-B 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1099b.pdf' },
    { label: 'IRS — Publication 15（2026），雇主稅務指南（補充工資預扣）', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
    { label: 'IRS — Topic no. 427，股票選擇權（Stock options）', url: 'https://www.irs.gov/taxtopics/tc427' },
  ],
}

const FAQS = [
  {
    q: 'RSU 在授予時要繳稅嗎？',
    a: '一般不用。IRS 查核技術指南說明，RSU 是未來交付股票或現金的無擔保承諾；如果符合或豁免於遞延薪酬規定，一般在授予時不課稅。因為授予時沒有移轉任何財產，RSU 不能做第 83(b) 條選擇。',
  },
  {
    q: '以股票交割的 RSU 什麼時候產生所得？',
    a: '就所得稅而言，以股票交割的 RSU 一般在股票實際交付給你時課稅。大多數上市公司的計畫是在歸屬時或歸屬後不久交付，但有些計畫會延後交付，時間依計畫而定。股票的價值減去你支付的金額是薪酬，雇主一般會把它計入你的 W-2 工資。',
  },
  {
    q: '公司為了繳稅賣掉一些股票，這是另外要申報的出售嗎？',
    a: '為了繳稅而被扣下或賣出的股票，是薪酬支付方式的一部分。請用你的 W-2 和券商報表確認是怎麼處理的；如果券商為了繳稅而賣出的股票開了 Form 1099-B，售價通常很接近已經計入工資的價值，所以獲利或虧損通常很小。',
  },
  {
    q: '為什麼我的 Form 1099-B 成本基礎是零？',
    a: '2013 年之後授予的股權薪酬，券商不能把薪酬所得加進它申報的成本基礎。2026 年 Form 1099-B 填寫說明表示，券商不能因為這些獎酬在歸屬或行使時認列的所得而增加初始成本基礎。你要自己在 Form 8949 上更正成本基礎。',
  },
  {
    q: '出售時的獲利是短期還是長期？',
    a: '取決於你收到股票之後持有多久。收到股票後一年以內出售，獲利或虧損是短期；持有超過一年，就是長期。',
  },
  {
    q: '什麼是第 83(i) 條選擇？',
    a: '它讓有廣泛性計畫的私人公司的某些員工，可以把從 RSU 或選擇權取得的合格股票所得最多遞延 5 年。不是每個人都適用 — 例如持股 1% 的股東、執行長或財務長，以及薪酬最高的四位高階主管都被排除 — 而且要依 Notice 2018-97 辦理，不能用 Form 15620。',
  },
]

const RELATED = [
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
    desc:  '如何更正券商報表上錯誤的成本基礎。',
  },
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP 員工購股計畫怎麼課稅：合格與不合格處分及 Form 3922',
    desc:  '如果你也透過員工購股計畫買股票。',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '2025 與 2026 年的短期與長期稅率。',
  },
]

export default function RsuTaxesZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'RSU 怎麼課稅：歸屬、W-2 所得與成本基礎 | AskLinTax 繁體中文',
      description: '限制性股票單位怎麼課稅：授予、歸屬與交割、W-2 所得與股票預扣、持有期間，以及如何用 Form 8949 更正 Form 1099-B 上為零的成本基礎。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>限制性股票單位（RSU）</strong>是雇主承諾之後給你股票（或現金），通常要在你符合歸屬時程之後。RSU 一般<strong>在授予時不課稅</strong>。以股票交割的 RSU <strong>交付給你</strong>時，股票的價值是<strong>薪酬所得</strong> — 通常計入你的 <strong>W-2 工資</strong>。這個價值就成為你持股的<strong>成本基礎</strong>。之後出售時，只有交付之後的價格變化才是資本利得或損失。
        </p>
        <p>
          最常見的錯誤是被課兩次稅：RSU 股票的 Form 1099-B 經常顯示成本基礎為 <strong>$0</strong> 或偏低，你必須在 <strong>Form 8949</strong> 上更正。
        </p>

        <h2>授予、歸屬與交割</h2>
        <ArticleTable
          head={['階段', '發生什麼事', '聯邦所得稅（以股票交割的 RSU）']}
          rows={[
            ['授予', '你取得未來股票的承諾', '一般沒有所得'],
            ['歸屬', '你符合服務或績效條件', '一般計畫的課稅時點，因為股票通常在歸屬時或歸屬後不久交付'],
            ['交割（交付）', '股票實際移轉給你', '股票的公平市價減去你支付的金額，是薪酬所得'],
            ['出售', '你賣出股票', '資本利得或損失：售價減去你的成本基礎'],
          ]}
        />
        <p>
          IRS 查核技術指南表示，以股票交割的 RSU 只有在股票實際移轉給你時，才適用第 83 條。如果你的計畫在歸屬之後才交付股票，時間依計畫與遞延薪酬規定而定 — 請查看計畫文件與 W-2。RSU 的社會安全稅與聯邦醫療保險稅可能適用特別的時間規定（第 3121(v)(2) 條），由雇主透過薪資系統處理。
        </p>

        <h2>預扣：為什麼你可能還要補稅</h2>
        <p>
          RSU 所得一般視為<strong>補充工資</strong>。依 Publication 15（2026），雇主可以用 <strong>22%</strong> 的固定稅率預扣補充工資的聯邦所得稅；當年度補充工資超過 <strong>$1 million</strong> 的部分，必須預扣 <strong>37%</strong>。如果你實際的稅率高於 22%，預扣可能不夠。很多雇主會扣下（或賣出）一部分股票來支付預扣稅。可以考慮調整 W-4 或繳<a href="/zh-tw/library/small-business/quarterly-taxes/">預估稅</a> — 請見<a href="/zh-tw/library/individual/owe-taxes-withholding-w4/">為什麼報稅時要補稅</a>。
        </p>

        <h2>成本基礎與持有期間</h2>
        <ul>
          <li><strong>成本基礎：</strong>一般是股票交付時計入你所得的價值（加上你支付的金額）。</li>
          <li><strong>持有期間：</strong>從你收到股票時開始。收到後一年以內出售是短期獲利或虧損；超過一年是長期。</li>
          <li><strong>券商申報：</strong>2013 年之後授予的獎酬，Form 1099-B 上的成本基礎不會包含薪酬所得。2026 年 Form 1099-B 填寫說明表示，券商不能因為股權薪酬在歸屬或行使時認列的所得而增加初始成本基礎。</li>
        </ul>

        <h2>範例（示意，2025 年）</h2>
        <p>
          <strong>Lin</strong> 的 100 股 RSU 在 2025 年 3 月 3 日歸屬並交付，當時股價每股 <strong>$150</strong>。她的雇主扣下 22 股，用來預扣 22% 的聯邦所得稅。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['計入她 W-2 工資的薪酬所得（100 × $150）', '$15,000'],
            ['預扣的聯邦所得稅（22% × $15,000，以 22 股支付）', '$3,300'],
            ['交付到她券商帳戶的股數', '78'],
            ['她在這些股票的成本基礎（78 × $150）', '$11,700'],
            ['她在 2025 年 10 月以每股 $160 賣出全部 78 股', '$12,480'],
            ['正確的短期獲利（$12,480 − $11,700）', '$780'],
          ]}
        />
        <p>
          依 Form 1099-B 的填寫說明，2013 年以後授予的 RSU，券商不得把工資所得加進申報的成本基礎，所以上面顯示的成本基礎常常是 $0。如果她的 Form 1099-B 顯示已向 IRS 申報的成本基礎為 $0（Form 8949 Part I 勾選 box A），直接照用就會申報 $12,480 的獲利 — 把她已經以工資繳過稅的 $11,700 再課一次。她在 (e) 欄填 $0，在 (f) 欄填代碼 <strong>B</strong>，並依 Form 8949 填寫說明中的成本基礎調整工作表（Worksheet for Basis Adjustments），在 (g) 欄填 <strong>($11,700)</strong> 的調整，這樣申報的獲利就是 $780。($11,700) 這個數字只適用於申報的成本基礎少了 $11,700 的情況：如果申報的成本基礎是別的金額，調整額就是該金額與 $11,700 的差額；如果已經顯示 $11,700，就不需要調整。如果券商沒有向 IRS 申報成本基礎（box B），她改在 (e) 欄填 $11,700、(f) 欄填代碼 B、(g) 欄填 -0-。
        </p>

        <h2>第 83(i) 條：部分私人公司員工可以遞延</h2>
        <p>
          Publication 525 說明，私人公司如果有書面計畫，提供 RSU 或選擇權給至少 80% 的美國員工，其「合格員工」可以依第 83(i) 條選擇，把「合格股票」的所得從歸屬後最多遞延 5 年。被排除的員工包括持股 1% 的股東、現任或前任執行長與財務長及其家人，以及薪酬最高的四位高階主管。這項選擇必須在股票首次可以轉讓或不再有重大沒收風險後 30 天內做出，依 Notice 2018-97 辦理，不能用 Form 15620。預扣適用最高稅率。上市公司員工很少會遇到。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>照用 Form 1099-B 上 $0 的成本基礎</strong>，被課兩次稅。</li>
          <li><strong>以為 22% 的預扣就夠了。</strong>如果你的稅率比較高，可能不夠。</li>
          <li><strong>從授予日開始計算持有期間。</strong>應該從你收到股票時開始。</li>
          <li><strong>想對 RSU 做第 83(b) 條選擇。</strong>因為授予時沒有移轉財產，所以不適用。</li>
          <li><strong>以為所有 RSU 都在歸屬日課稅。</strong>課稅時點一般是股票交付時；延後交割的計畫可能不同。</li>
        </ul>

        <h2>你會看到的表格</h2>
        <ArticleTable
          head={['表格', '內容']}
          rows={[
            ['Form W-2', '計入工資的 RSU 所得（box 1）與預扣稅'],
            ['Form 1099-B', '出售收入，以及券商申報的成本基礎（經常不含薪酬所得）'],
            ['Form 8949 與 Schedule D', '申報出售並更正成本基礎（代碼 B）的地方'],
            ['券商提供的補充報表', '很多券商會提供股權薪酬的調整後成本基礎報表'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 各計畫不同</div>
          <p>IRS 查核技術指南不是官方的法律見解。延後交割的 RSU、以現金交割的 RSU、跨國搬遷，以及州稅，都可能改變結果。請查看計畫文件與 W-2，特殊計畫可以考慮尋求專業協助。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

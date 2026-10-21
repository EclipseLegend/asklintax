import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/selling-rental-property.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'selling-rental-property',
  sourceHash:      'ff0417462169',
  id:            '87',
  title:         '出售出租房產：折舊回收與 25% 稅率',
  titleEn:       'Selling a Rental Property: Depreciation Recapture and the 25% Rate',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 544、527、550 與 551、2025 年 Form 4797 填寫說明，以及 2025 年 Schedule D 填寫說明，說明 2025 與 2026 稅務年度出售持有超過一年的美國住宅出租房地產的聯邦所得稅規定。本文不涵蓋分期付款出售、同類交換（第 1031 條）、被動活動損失規定、曾經的自住房屋、更正從未申報的折舊、海外房產，也不涵蓋州稅',
  persona:       ['要出售出租房屋或公寓的房東', '繼承或保留以前出租房產的人', '比較售價與當初買價的屋主', '出售出租房產後收到 Form 1099-S 的人'],
  relatedJourney: ['Airbnb 與租金收入', '房產帶來的副業收入'],
  actionRequired: '算出調整後成本基礎（成本加上改良，減去允許或可允許的折舊），用售價減去出售費用再減去它，並在 Form 4797 上申報出售。把獲利帶到 Schedule D，並用未回收第 1250 條收益工作表計算由折舊產生的部分。',
  sources: [
    { label: 'IRS — Publication 544，資產的出售與其他處分（Sales and Other Dispositions of Assets）', url: 'https://www.irs.gov/publications/p544' },
    { label: 'IRS — Publication 527，住宅出租房產（Residential Rental Property）', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Publication 551，資產的成本基礎（Basis of Assets）', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — 2025 年 Form 4797 填寫說明，營業用財產的出售', url: 'https://www.irs.gov/pub/irs-pdf/i4797.pdf' },
    { label: 'IRS — 2025 年 Schedule D（Form 1040）填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — Publication 550（2025），投資所得與費用', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Topic no. 559，淨投資所得稅', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: '出租房產的獲利是統一課 25% 嗎？',
    a: '不是。25% 是最高稅率，只適用於獲利中由折舊產生的部分（未回收第 1250 條收益）。這部分如果你的一般稅率較低就按一般稅率課稅，但不超過 25%。長期獲利的其餘部分一般按 0%、15% 或 20% 的資本利得稅率課稅。',
  },
  {
    q: '我從來沒有申報折舊，這樣對我有利嗎？',
    a: '一般沒有。你的成本基礎要減去你已扣除或可以扣除的折舊。如果你沒有扣除，Publication 551 說要按你可以扣除的全額減少成本基礎。報稅前請請專業人士檢視這筆出售與你的折舊紀錄。',
  },
  {
    q: '折舊回收和未回收第 1250 條收益有什麼不同？',
    a: '第 1250 條一般所得回收是把「額外折舊」（超過直線法金額的折舊）當作一般所得課稅。未回收第 1250 條收益是其餘由折舊產生的獲利；它仍然是資本利得，但最高稅率為 25%。對依 MACRS 以 27.5 年折舊的住宅出租房產，Form 4797 填寫說明指出第 1250 條一般所得回收不適用。',
  },
  {
    q: '出售出租房產要申報在 Form 8949 上嗎？',
    a: '一般不用。持有超過一年的出租房地產屬於第 1231 條財產，申報在 Form 4797 上。第 1231 條淨利得一般再轉到 Schedule D 當作長期資本利得。',
  },
  {
    q: '我會要繳 3.8% 的淨投資所得稅嗎？',
    a: '有可能。出售出租房產的獲利一般屬於淨投資所得，除非該房產是用於非被動活動的營業。即使如此，也只有在你的修正後調整總收入超過門檻時才會課稅。',
  },
  {
    q: '如果我在出租前曾經住在那裡呢？',
    a: '自住房屋排除額可能適用於部分獲利，但 1997 年 5 月 6 日以後的折舊一般不能排除。請參考賣房子的指南與 Publication 523。',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: '出租房子或公寓，租金收入怎麼課稅？',
    desc:  '持有出租房產期間的折舊與費用。',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: '我賣了房子，獲利要繳稅嗎？',
    desc:  '自住房屋排除額，以及以前出租對它的影響。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  '出租房產的獲利什麼時候也要繳 3.8% 的稅。',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '2025 與 2026 年的 0%、15% 與 20% 稅率。',
  },
]

export default function SellingRentalPropertyZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '出售出租房產：折舊回收與 25% 稅率 | AskLinTax 繁體中文',
      description: '出售出租房產：調整後成本基礎、允許或可允許的折舊、第 1231 條、第 1250 條回收與未回收第 1250 條收益的差別、25% 最高稅率、Form 4797，以及 NIIT。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          出售持有超過一年的出租房產時，你的獲利是售價減去出售費用和<strong>調整後成本基礎</strong>。因為折舊會降低成本基礎，所以會增加獲利。長期獲利中由折舊產生的部分是<strong>未回收第 1250 條收益</strong>，按你的一般稅率課稅，但<strong>不超過 25%</strong>。其餘部分一般按 0%、15% 或 20% 的資本利得稅率課稅。你要在 <strong>Form 4797</strong> 上申報這筆出售。
        </p>

        <h2>第 1 步：調整後成本基礎</h2>
        <p>
          成本基礎一般從你購買房產支付的金額開始，加上某些購買成本與改良的費用，然後再減少，其中最重要的是折舊。
        </p>
        <ul>
          <li><strong>土地不能折舊。</strong>只有建築物與改良可以折舊。</li>
          <li><strong>允許或可允許（allowed or allowable）：</strong>你要按你依所用方法已扣除或可以扣除的折舊減少成本基礎。如果你完全沒有折舊，Publication 551 說要按你可以扣除的全額減少成本基礎。</li>
        </ul>

        <h2>第 2 步：實現金額與獲利</h2>
        <p>
          在 Form 4797 上，總售價包括收到的金錢與買方承擔的任何房貸，出售費用（例如仲介佣金）則加到成本基礎上。從成本基礎減去折舊後，總售價減去這個總額就是你的獲利。
        </p>

        <h2>第 3 步：第 1231 條</h2>
        <p>
          作為出租用的不動產不是資本資產；持有超過一年時屬於<strong>第 1231 條財產</strong>。你要把當年所有的第 1231 條利得與損失合併計算：
        </p>
        <ul>
          <li><strong>第 1231 條淨損失</strong>是一般損失。</li>
          <li><strong>第 1231 條淨利得</strong>在你前 5 年尚未回收的第 1231 條損失範圍內是一般所得，其餘是長期資本利得。</li>
        </ul>

        <h2>第 4 步：回收與未回收第 1250 條收益</h2>
        <ArticleTable
          head={['', '第 1250 條一般所得回收', '未回收第 1250 條收益']}
          rows={[
            ['是什麼', '額外折舊：超過直線法金額的折舊', '長期獲利中其餘由折舊產生的部分'],
            ['怎麼課稅', '當作一般所得', '當作資本利得，按你的一般稅率但不超過 25%'],
            ['典型的美國住宅出租房產（27.5 年 MACRS，直線法）', '依 Form 4797 填寫說明不適用', '一般等於折舊金額，以第 1231 條淨利得為上限'],
            ['在哪裡計算', 'Form 4797 第 26 行', '未回收第 1250 條收益工作表，Schedule D 第 19 行'],
          ]}
        />
        <p>
          如果申報過加速折舊、特別折舊扣除或商業振興扣除，或房產持有一年或以下，第 1250 條一般所得回收就可能適用。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Lee</strong> 在 2016 年以 $300,000（土地 $60,000、建築物 $240,000）買了一間出租房屋，建築物按直線法以 27.5 年折舊，沒有申報特別折舊扣除。到出售為止，允許或可允許的折舊共 $80,000。2025 年 Lee 以 $520,000 出售房屋，支付 $30,000 的出售費用。
        </p>
        <p>
          <strong>假設：</strong>依出售時的公平市價，售價中 $104,000 分攤給土地、$416,000 分攤給建築物，出售費用也按同樣比例分攤（$6,000 與 $24,000）。Lee 沒有其他第 1231 條交易、沒有前 5 年尚未回收的第 1231 條損失，也沒有收藏品損失或資本損失結轉。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['整個房產：$520,000 售價 −（$300,000 成本 + $30,000 出售費用 − $80,000 折舊）', '總獲利 $270,000'],
            ['建築物，Form 4797 Part III 第 20 行：總售價', '$416,000'],
            ['建築物，第 21 行：成本（$240,000）加出售費用（$24,000）', '$264,000'],
            ['建築物，第 22 行：允許或可允許的折舊', '$80,000'],
            ['建築物，第 23 行：調整後成本基礎（$264,000 − $80,000）', '$184,000'],
            ['建築物，第 24 行：獲利（$416,000 − $184,000）', '$232,000'],
            ['建築物，第 26 行：第 1250 條一般所得回收（27.5 年住宅出租房產）', '$0'],
            ['土地，Form 4797 Part I：$104,000 −（$60,000 + $6,000）', '$38,000'],
            ['第 1231 條淨利得（$232,000 + $38,000），轉到 Schedule D 當作長期資本利得', '$270,000'],
            ['未回收第 1250 條收益（第 22 行 $80,000 與第 24 行 $232,000 中較小者）', '$80,000'],
            ['其餘按 0%、15% 或 20% 稅率課稅的長期獲利', '$190,000'],
          ]}
        />
        <p>
          這 $80,000 不是統一課 25%：它按 Lee 的一般稅率課稅，最高 25%。如果 Lee 有前 5 年尚未回收的第 1231 條損失，$270,000 中會有一部分改為一般所得。如果曾申報加速折舊或特別折舊扣除，第 26 行就可能出現一般所得回收。
        </p>

        <h2>第 5 步：表格</h2>
        <ul>
          <li><strong>Form 4797：</strong>持有超過一年的出租房產，要依建築物與土地各自的公平市價分攤實現金額。建築物填在 Part III，獲利再轉到 Part I；土地填在 Part I。持有一年或以下的房產填在 Part II。</li>
          <li><strong>Schedule D：</strong>Form 4797 上的第 1231 條淨利得申報為長期資本利得。填寫未回收第 1250 條收益工作表，並把結果填在 Schedule D 第 19 行。</li>
          <li><strong>Form 1099-S：</strong>過戶代理人可能會向你和 IRS 申報這筆出售。</li>
        </ul>

        <h2>淨投資所得稅</h2>
        <p>
          出售出租房產的獲利一般屬於<strong>淨投資所得</strong>，除非該房產用於對你而言不是被動活動的營業。即使屬於淨投資所得，也只有在你的修正後調整總收入超過門檻時才會課 3.8% 的稅（單身或戶長 $200,000；夫妻合併申報或符合資格的喪偶者 $250,000；夫妻分開申報 $125,000）。請參考 <a href="/zh-tw/library/investment/net-investment-income-tax/">NIIT 指南</a>。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>忘了從成本基礎減去折舊</strong>，或只減去已申報的金額，而可允許的金額更多。</li>
          <li><strong>把 25% 當成</strong>整筆獲利的統一稅率。</li>
          <li><strong>把未回收第 1250 條收益叫作「回收」</strong>並當作一般所得課稅。</li>
          <li><strong>把出售申報在 Form 8949 上</strong>，而不是 Form 4797。</li>
          <li><strong>對土地提列折舊。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請專業人士檢視這筆出售</div>
          <p>分期付款出售、同類交換、暫停的被動損失、曾經是自住房屋的房產、從未申報的折舊，以及海外房產，都會改變計算方式，本文不涵蓋。本文也不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

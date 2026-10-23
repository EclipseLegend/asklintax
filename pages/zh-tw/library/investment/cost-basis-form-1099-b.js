import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/cost-basis-form-1099-b.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'cost-basis-form-1099-b',
  sourceHash:      '4e761b673ae2',
  id:            '85',
  title:         '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
  titleEn:       'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2026 年 Form 1099-B 填寫說明、2025 年 Form 8949 及其填寫說明、2025 年 Schedule D 填寫說明、Publication 550（2025）與 Publication 551（2025 年 12 月修訂版），說明 2025 與 2026 稅務年度在 Form 1099-B 上申報的股票與基金出售的成本基礎。本文涵蓋在應稅帳戶出售證券的個人；不涵蓋交易商、選擇按市價計值的交易者、選擇權策略，以及州稅',
  persona:       ['收到 Form 1099-B 的投資人', '出售公司股票的員工', '繼承或受贈股票的人', '券商成本基礎遺漏或錯誤的人'],
  relatedJourney: ['準備報稅', '金錢與福利'],
  actionRequired: '針對 Form 1099-B 上的每一筆出售，確認成本基礎是否已申報給 IRS、是否正確。保留購買紀錄、再投資股利、贈與與繼承紀錄，以及股權薪酬報表，並在 Form 8949 上更正錯誤的成本基礎。',
  sources: [
    { label: 'IRS — 2026 年 Form 1099-B 填寫說明，經紀商與以物易物交易的收入', url: 'https://www.irs.gov/pub/irs-pdf/i1099b.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
    { label: 'IRS — Form 8949（2025），資本資產的出售與其他處分', url: 'https://www.irs.gov/pub/irs-pdf/f8949.pdf' },
    { label: 'IRS — 2025 年 Schedule D（Form 1040）填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
    { label: 'IRS — Publication 550（2025），投資收入與費用（Investment Income and Expenses）', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Publication 551（2025 年 12 月修訂版），資產的成本基礎（Basis of Assets）', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: '什麼是受涵蓋證券？',
    a: '券商必須向 IRS 申報成本基礎的證券。例如 2010 年之後在帳戶中以現金取得的股票、2011 年之後取得且適用平均成本法的共同基金等股票，以及 2013 年或 2015 年之後取得的某些債務工具與選擇權。較舊或轉入的股票，經常是非受涵蓋證券。',
  },
  {
    q: '我的 Form 1099-B 沒有成本基礎，該怎麼辦？',
    a: '你仍然要申報正確的成本基礎。在 Form 8949 上勾選成本基礎沒有申報給 IRS 的交易欄位（B 或 E 欄）申報這筆出售，並在 (e) 欄填上你自己紀錄中的成本基礎。',
  },
  {
    q: '每一筆出售都要列在 Form 8949 上嗎？',
    a: '不一定。如果你的 Form 1099-B 顯示成本基礎已申報給 IRS，而且不需要任何調整或更正（也不是收藏品），你可以把合計數字直接填在 Schedule D 第 1a 行（短期）或第 8a 行（長期）。',
  },
  {
    q: '如果我在不同時間買進，賣出的是哪些股票？',
    a: '如果你有充分識別賣出的股票，成本基礎就是那些股票的成本。如果無法識別，Publication 550 表示成本基礎是你最早取得的股票（先進先出）。共同基金股份可以使用平均成本。',
  },
  {
    q: '繼承的股票用什麼成本基礎？',
    a: '一般是死亡日的公平市價（如果遺產選擇了替代估價日，則用替代估價日的價值）。如果遺產申報了 Form 706，你可能會收到 Schedule A（Form 8971），而且可能必須使用那個價值。這筆出售以長期申報，並在 Form 8949 的 (b) 欄填上「INHERITED」。',
  },
  {
    q: '受贈的股票用什麼成本基礎？',
    a: '一般是贈與人的調整後成本基礎。如果你受贈時股票的價值低於贈與人的成本基礎，計算獲利時用贈與人的成本基礎，計算損失時用受贈時的價值；如果售價介於兩者之間，就沒有獲利也沒有損失。',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '2025 與 2026 年的短期與長期稅率。',
  },
  {
    href: '/library/investment/capital-losses',
    cat:  'Investments & Foreign Accounts',
    title: '股票賠錢，可以抵稅嗎？',
    desc:  '虧損上限與洗售。',
  },
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU 限制性股票單位怎麼課稅：歸屬、W-2 所得與出售時的成本基礎',
    desc:  '成本基礎錯誤最常見的原因。',
  },
]

export default function CostBasisForm1099BZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '成本基礎與 Form 1099-B：受涵蓋股票與 Form 8949 | AskLinTax 繁體中文',
      description: '股票出售的成本基礎怎麼算：受涵蓋與非受涵蓋證券、調整後成本基礎、股票薪酬、受贈與繼承的股票、Form 8949 欄位與代碼，以及洗售。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          你的<strong>成本基礎</strong>一般是你為投資支付的金額，並依某些事件調整。出售時，獲利或損失是出售收入減去成本基礎。券商會在 <strong>Form 1099-B</strong> 上申報這筆出售；如果是<strong>受涵蓋證券</strong>，也會向 IRS 申報你的成本基礎。但表格上的成本基礎不一定完整或正確 — <strong>你有責任</strong>在 <strong>Form 8949</strong> 與 <strong>Schedule D</strong> 上申報正確的金額。
        </p>

        <h2>受涵蓋與非受涵蓋證券</h2>
        <ArticleTable
          head={['證券種類', '在帳戶中以現金取得的時間，符合下列條件即為受涵蓋（成本基礎申報給 IRS）']}
          rows={[
            ['股票（適用平均成本法的股票除外）', '2010 年之後'],
            ['共同基金及其他適用平均成本法的股票', '2011 年之後'],
            ['某些債務工具與選擇權', '2013 年之後（較複雜的債務工具為 2015 年之後）'],
            ['證券期貨合約', '2013 年之後簽訂'],
            ['從其他券商轉入的證券', '如果移轉報表申報為受涵蓋，就是受涵蓋'],
          ]}
        />
        <p>
          在這些日期之前買進的股票，或轉入時沒有受涵蓋證券資訊的股票，一般是<strong>非受涵蓋</strong>證券：券商可能不填成本基礎，或只告訴你而不申報給 IRS。數位資產是用 Form 1099-DA 申報，不是 Form 1099-B — 請見 <a href="/zh-tw/library/investment/form-1099-da/">Form 1099-DA</a>。
        </p>

        <h2>調整後成本基礎：哪些會改變它</h2>
        <ul>
          <li><strong>買進時支付的佣金與費用</strong>一般會加進成本基礎（出售收入則會扣除賣出時的佣金）。</li>
          <li><strong>再投資的股利</strong>會買進新股，這些新股有自己的成本基礎 — 而且你已經把這些股利申報為所得。</li>
          <li><strong>股票薪酬：</strong>你以工資申報的 RSU、ESPP 或選擇權所得是成本基礎的一部分，但 2013 年之後授予的獎酬，Form 1099-B 上的成本基礎不會包含這筆所得。</li>
          <li><strong>洗售：</strong>被否認的虧損會加到替代股票的成本基礎上。</li>
          <li><strong>股票分割與股票股利</strong>會把原有的成本基礎分攤到更多股數上。</li>
        </ul>

        <h2>受贈與繼承的股票</h2>
        <ArticleTable
          head={['取得股票的方式', '成本基礎', '持有期間']}
          rows={[
            ['受贈，且受贈時的價值至少等於贈與人的成本基礎', '贈與人的調整後成本基礎（依贈與日期，加上全部或部分已繳的贈與稅）', '包括贈與人的持有期間'],
            ['受贈，且受贈時的價值低於贈與人的成本基礎', '計算獲利用贈與人的成本基礎；計算損失用受贈時的價值', '取決於適用哪一個成本基礎'],
            ['繼承', '一般是死亡日（或替代估價日）的價值', '不論你持有多久，一般都是長期'],
          ]}
        />

        <h2>範例（示意）</h2>
        <p>
          <strong>受贈且有潛在損失：</strong>依 Publication 551 的規定，Kevin 的阿姨把調整後成本基礎 $10,000、當時價值 $8,000 的股票送給他。如果他以 $12,000 賣出，獲利 $2,000（以 $10,000 成本基礎計算）。如果以 $7,000 賣出，損失 $1,000（以 $8,000 價值計算）。如果以 $9,000 賣出，就沒有獲利也沒有損失。
        </p>
        <p>
          <strong>繼承：</strong>Jenny 的父親以 $20,000 買進股票，他過世當天股票價值 $50,000。她的成本基礎一般是 $50,000。如果她三個月後以 $52,000 賣出，就有 $2,000 的長期獲利，並在 Form 8949 的 (b) 欄填上「INHERITED」。
        </p>
        <p>
          <strong>成本基礎已申報給 IRS，但有錯：</strong>David 以 $6,000 賣出股票。他的 Form 1099-B 顯示已向 IRS 申報的成本基礎是 $1,000，但因為有 $3,000 的薪酬所得沒有計入，他正確的成本基礎是 $4,000。他勾選 A 或 D 欄申報，在 (e) 欄填 $1,000，在 (f) 欄填代碼 B，在 (g) 欄填 ($3,000) 的調整，獲利為 $2,000。
        </p>

        <h2>Form 8949 與 Schedule D</h2>
        <ArticleTable
          head={['Form 8949 欄位', '用途']}
          rows={[
            ['A（短期）／D（長期）', 'Form 1099-B 顯示成本基礎已申報給 IRS'],
            ['B（短期）／E（長期）', 'Form 1099-B 顯示成本基礎沒有申報給 IRS'],
            ['C（短期）／F（長期）', '沒有在 Form 1099-B 上申報（而且不是數位資產）'],
            ['G–L', '數位資產交易（2025 年新增）'],
          ]}
        />
        <ul>
          <li><strong>代碼 B</strong> — 表格上的成本基礎有誤。勾選 A 或 D 欄時，填上表格上的成本基礎，並用成本基礎調整工作表（Worksheet for Basis Adjustments）在 (g) 欄更正；勾選 B 或 E 欄時，在 (e) 欄直接填正確的成本基礎。</li>
          <li><strong>代碼 W</strong> — 洗售虧損不能扣除。在 (g) 欄以正數填上被否認的虧損。如果 Form 1099-B box 1g 的洗售金額有誤，要更正。</li>
          <li><strong>例外 1</strong> — 如果成本基礎已申報給 IRS，而且不需要調整，你可以把合計數字直接填在 Schedule D 第 1a 或 8a 行，而不用逐筆列出。</li>
        </ul>

        <h2>券商申報常見的問題</h2>
        <ul>
          <li><strong>股權薪酬（RSU、ESPP、選擇權）的成本基礎為零或偏低。</strong></li>
          <li><strong>轉入或較舊的股票（非受涵蓋證券）沒有成本基礎。</strong></li>
          <li><strong>跨帳戶或跨券商的洗售</strong>，單一券商看不到 — 你仍然要適用洗售規定。</li>
          <li><strong>繼承的股票顯示被繼承人原本的成本基礎</strong>，而不是死亡日的價值。</li>
          <li><strong>受贈或繼承股票的短期與長期弄錯。</strong></li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 券商的表格只是起點</div>
          <p>IRS 會把 Form 1099-B 和你的稅表比對，所以要申報表格上的收入金額，但成本基礎有誤時要更正，並保留支持你更正的紀錄。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

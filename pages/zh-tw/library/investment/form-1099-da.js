import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/form-1099-da.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'form-1099-da',
  sourceHash:      '50b1ff76456a',
  id:            '84',
  title:         'Form 1099-DA：加密貨幣經紀商 2025 與 2026 年申報什麼',
  titleEn:       'Form 1099-DA: What Crypto Brokers Report for 2025 and 2026',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據正式法規（T.D. 10000，2024 年 7 月 9 日）、2026 年 Form 1099-DA 填寫說明、IRS 數位資產網頁、Revenue Procedure 2024-28，以及 Notice 2024-56、2024-57、2025-7 與 2025-33，加上 2025 年 Form 8949 及其填寫說明，說明 2025 與 2026 稅務年度經紀商在 Form 1099-DA 上申報數位資產出售的規定。本文涵蓋託管型經紀商；正式法規不包括去中心化或非託管經紀商的申報規定。本文不詳細涵蓋經紀商的義務，也不涵蓋州稅',
  persona:       ['在交易所或 App 上賣出加密貨幣的人', '收到 Form 1099-DA 的人', '有多個錢包與帳戶的加密貨幣持有人', '透過去中心化平台或自託管錢包交易的人'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '收齊每一份 Form 1099-DA，但也要保留自己的紀錄：2025 年的 Form 1099-DA 一般只列出總收入、沒有成本基礎，而且很多交易根本不會被申報。每一筆出售或交換都要用數位資產欄位（G 至 L）申報在 Form 8949 上，表格沒有列出成本基礎時，填上你自己的成本基礎。',
  sources: [
    { label: 'IRS — 數位資產（Digital assets）', url: 'https://www.irs.gov/filing/digital-assets' },
    { label: 'IRS — 數位資產（企業）：經紀商申報與正式法規', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets' },
    { label: 'IRS — 2026 年 Form 1099-DA 填寫說明，經紀商交易的數位資產收入', url: 'https://www.irs.gov/pub/irs-pdf/i1099da.pdf' },
    { label: 'IRS — 數位資產交易常見問題（Frequently asked questions on digital asset transactions）', url: 'https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions' },
    { label: 'IRS — Revenue Procedure 2024-28（截至 2025 年 1 月 1 日將成本基礎分配到錢包與帳戶）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-28.pdf' },
    { label: 'IRS — Notice 2025-7（經紀商託管單位識別的暫時救濟）', url: 'https://www.irs.gov/pub/irs-drop/n-25-07.pdf' },
    { label: 'IRS — Notice 2024-57（經紀商目前不需要申報的交易）', url: 'https://www.irs.gov/pub/irs-drop/n-24-57.pdf' },
    { label: 'IRS — Notice 2025-33（2025 與 2026 年備用預扣救濟）', url: 'https://www.irs.gov/pub/irs-drop/n-25-33.pdf' },
    { label: 'IRS — 2025 年 Form 8949 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: '我 2025 年賣了加密貨幣，但沒收到 Form 1099-DA，還要申報嗎？',
    a: '要。不論有沒有收到 Form 1099-DA，你都必須申報每一筆數位資產的出售、交換或其他處分。很多交易 — 例如在自託管錢包裡兌換代幣 — 根本不會申報給你。',
  },
  {
    q: '為什麼我 2025 年的 Form 1099-DA 沒有成本基礎？',
    a: '2025 年進行的交易，經紀商必須申報總收入。強制申報成本基礎從 2026 年 1 月 1 日起的某些交易開始，而且只限受涵蓋的數位資產 — 一般是 2025 年之後在帳戶中取得的資產。你必須自己計算並申報成本基礎。',
  },
  {
    q: '我 2026 年的 Form 1099-DA 會列出我好幾年前買的幣的成本基礎嗎？',
    a: '一般不會。成本基礎只有受涵蓋證券才必須申報 — 也就是 2025 年之後在帳戶中以現金、儲值卡、其他數位資產或某些其他對價取得的數位資產。更早買的資產，或從其他錢包轉入的資產，一般是非受涵蓋，經紀商可以不填成本基礎。',
  },
  {
    q: '去中心化交易所會寄 Form 1099-DA 給我嗎？',
    a: 'IRS 表示，正式法規不包括一般稱為去中心化或非託管經紀商（不持有被出售的數位資產）的申報規定。你仍然要自己申報交易。',
  },
  {
    q: '交易所會從我的加密貨幣出售中預扣稅款嗎？',
    a: 'Notice 2025-33 表示，經紀商在 2025 或 2026 曆年進行的任何數位資產出售，都不需要備用預扣。這是給經紀商的救濟，並不會改變你應繳的稅。',
  },
  {
    q: '什麼是按錢包計算成本基礎的規定？',
    a: '從 2025 年 1 月 1 日起，成本基礎必須按每個錢包或帳戶分別追蹤。Revenue Procedure 2024-28 提供安全港，讓你把剩餘的成本基礎分配到截至 2025 年 1 月 1 日各錢包或帳戶中的單位，並有截止期限與紀錄規定。',
  },
]

const RELATED = [
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: '加密貨幣稅務說明：什麼時候要繳稅？',
    desc:  '哪些加密貨幣交易要課稅。',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: '成本基礎與 Form 1099-B：受涵蓋股票、調整與 Form 8949',
    desc:  'Form 8949 的欄位與調整怎麼用。',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS Notices',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  '你的稅表和資訊申報表不一致時會怎樣。',
  },
]

export default function Form1099DaZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Form 1099-DA：加密貨幣經紀商 2025 與 2026 年申報什麼 | AskLinTax 繁體中文',
      description: 'Form 1099-DA 說明：2025 年申報總收入、2026 年起申報受涵蓋資產的成本基礎、Form 8949 的 G 至 L 欄、按錢包計算成本基礎、穩定幣與 NFT，以及哪些不會被申報。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>Form 1099-DA</strong> 是新的資訊申報表，經紀商用來申報<strong>數位資產</strong>（例如加密貨幣）的出售。它來自《基礎建設投資與就業法案》（Infrastructure Investment and Jobs Act）對第 6045 條的修正，以及 2024 年 7 月 9 日發布的正式法規（T.D. 10000）。
        </p>
        <ul>
          <li><strong>2025 年的交易：</strong>經紀商申報<strong>總收入</strong>（gross proceeds）。一般不申報成本基礎。</li>
          <li><strong>2026 年 1 月 1 日起的交易：</strong>經紀商還必須申報<strong>受涵蓋</strong>數位資產的<strong>成本基礎</strong> — 一般是 2025 年之後在帳戶中取得的資產。</li>
          <li>不論有沒有收到 Form 1099-DA，你都必須申報所有數位資產的出售與交換。</li>
        </ul>

        <h2>誰會寄 Form 1099-DA</h2>
        <p>
          正式法規適用於持有客戶所出售數位資產的經紀商 — 包括託管型交易平台、某些託管錢包業者、數位資產自助機，以及某些數位資產支付處理商。一般只有美國的數位資產經紀商申報 Form 1099-DA。IRS 表示，正式法規<strong>不包括</strong>一般稱為去中心化或非託管經紀商（不持有資產）的申報規定。
        </p>

        <h2>各年度申報的內容</h2>
        <ArticleTable
          head={['', '2025 年的交易', '2026 年及以後的交易']}
          rows={[
            ['總收入', '申報', '所有數位資產都要申報'],
            ['成本基礎', '一般不申報', '受涵蓋證券（2025 年之後在帳戶中取得）必須申報；非受涵蓋證券可自願申報'],
            ['經紀商的罰款救濟', '只要善意努力正確且準時申報與提供，就不處罰', '一般規定，並適用各項通知說明的過渡救濟'],
            ['備用預扣', '不需要（Notice 2025-33）', '2026 曆年的出售不需要（Notice 2025-33）'],
          ]}
        />

        <h2>穩定幣、NFT 與支付處理商</h2>
        <ul>
          <li><strong>合格穩定幣：</strong>採用選擇性方法的經紀商，不申報非指定出售；指定出售只有在客戶當年度的總收入超過 <strong>$10,000</strong> 時才申報（並按每種穩定幣合併申報）。</li>
          <li><strong>指定 NFT：</strong>經紀商可以採用選擇性的合併申報方法，並有另外的最低門檻。</li>
          <li><strong>數位資產支付處理商：</strong>當年度 $600 以下的出售不申報；超過 $600 時，該客戶的所有出售都要申報。</li>
          <li>這些門檻限制的是<strong>經紀商的申報範圍</strong>，不是免稅。</li>
        </ul>

        <h2>經紀商目前不需要申報的交易</h2>
        <p>
          依 <strong>Notice 2024-57</strong>，在進一步指引發布之前，經紀商不需要申報某些交易：包裝與解包（wrapping 與 unwrapping）、流動性提供者交易、質押、被描述為數位資產借貸或放空的交易，以及名目本金合約。該通知表示，這並不代表這些交易如何課稅，而且這項例外不適用於從這些交易賺到的獎勵或其他報酬。你仍然要自己判斷並申報稅務結果。
        </p>

        <h2>按錢包計算成本基礎（2025 年 1 月 1 日起）</h2>
        <ul>
          <li>從 2025 年 1 月 1 日起，成本基礎與持有期間必須<strong>按每個錢包或帳戶分別</strong>認定，不能把所有持有部位合在一起。</li>
          <li><strong>Revenue Procedure 2024-28</strong> 提供安全港，讓你把剩餘（未使用）的成本基礎分配到<strong>截至 2025 年 1 月 1 日</strong>各錢包或帳戶中的單位。個別單位分配必須在你 2025 年 1 月 1 日以後首次出售、處分或移轉該數位資產，與你 2025 年稅表截止日（含延期）兩者較早者之前完成；整體分配方法必須在 2025 年 1 月 1 日之前記錄。分配不可撤銷。</li>
          <li><strong>經紀商託管的單位：</strong>你可以在出售時之前告訴經紀商要賣出哪些單位。<strong>Notice 2025-7</strong> 讓符合資格的納稅人，在 2025 年 1 月 1 日至 12 月 31 日的出售，改用自己的帳冊紀錄來識別單位。如果你沒有識別單位，經紀商一般會對該帳戶採用先進先出（FIFO）。</li>
        </ul>

        <h2>在 Form 8949 上申報（2025 年）</h2>
        <ArticleTable
          head={['欄位', '用途']}
          rows={[
            ['G', '短期 — Form 1099-DA 顯示成本基礎已申報給 IRS'],
            ['H', '短期 — Form 1099-DA 顯示成本基礎沒有申報給 IRS'],
            ['I', '沒有在 Form 1099-DA 或 1099-B 上申報的短期數位資產交易'],
            ['J', '長期 — Form 1099-DA 顯示成本基礎已申報給 IRS'],
            ['K', '長期 — Form 1099-DA 顯示成本基礎沒有申報給 IRS'],
            ['L', '沒有在 Form 1099-DA 或 1099-B 上申報的長期數位資產交易'],
          ]}
        />
        <p>
          數位資產交易不要使用 C 或 F 欄。合計數字轉到 Schedule D。如果 Form 1099-DA 上的成本基礎有誤，依 Form 8949 填寫說明申報並以調整更正。
        </p>

        <h2>範例（示意）</h2>
        <p>
          <strong>2025 年，表格沒有成本基礎：</strong>Maya 在 2025 年於交易所以 $40,000 賣出 0.5 枚比特幣。她 2025 年的 Form 1099-DA 列出 $40,000 的總收入，沒有成本基礎。她在 2023 年以 $15,000 買進。她在 Form 8949 Part II 的 K 欄申報，填上 $15,000 的成本基礎，得到 <strong>$25,000 的長期獲利</strong>。
        </p>
        <p>
          <strong>2026 年，受涵蓋資產：</strong>Raj 在 2026 年 2 月於交易所以 $3,000 買進一種數位資產，並在 2026 年 9 月於同一交易所以 $3,600 賣出。因為它是 2025 年之後在帳戶中取得，屬於受涵蓋證券，他的 Form 1099-DA 應該會列出 $3,000 的成本基礎。這筆出售是短期（G 欄），獲利 $600。
        </p>
        <p>
          <strong>完全沒有表格：</strong>Chen 在自己的自託管錢包裡兌換代幣。沒有經紀商會寄 Form 1099-DA，但這次兌換仍然是應稅的交換。她依持有期間長短，在 I 或 L 欄申報。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為沒有表格就不用繳稅。</strong></li>
          <li><strong>因為表格沒有列出成本基礎，就用 $0 成本基礎申報 2025 年的出售。</strong></li>
          <li><strong>2025 年 1 月 1 日之後仍把各錢包的成本基礎合併計算。</strong></li>
          <li><strong>使用 C 或 F 欄</strong>，而不是數位資產專用欄位。</li>
          <li><strong>把最低申報門檻當成免稅。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 規定仍在發展中</div>
          <p>這裡的許多規定來自 IRS 通知與過渡救濟，Notice 2024-57 也把部分交易留待未來指引。申報前請查看最新的 Form 1099-DA 與 Form 8949 填寫說明。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

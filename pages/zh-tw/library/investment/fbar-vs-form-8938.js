import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/fbar-vs-form-8938.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'fbar-vs-form-8938',
  sourceHash:      '40f1795b5767',
  id:            '23',
  title:         'FBAR 與 Form 8938 有什麼不同？',
  titleEn:       'FBAR vs. Form 8938: what\'s the difference?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人的 FBAR（FinCEN Form 114）與 Form 8938。特定國內實體（Specified Domestic Entity）、美國屬地，以及依租稅協定具雙重居民身分的申報人，門檻只做摘要說明',
  persona:       ['在美國境外有銀行或投資帳戶的人', '新移民', '綠卡持有人', '在台灣或中國有帳戶的家庭'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '兩項測試要分開檢查：如果你的海外帳戶在 2025 年任何時候合計超過 $10,000，要申報 FBAR；如果你的特定海外金融資產（Specified Foreign Financial Assets）超過你的 Form 8938 門檻，要申報 Form 8938。申報其中一項，永遠不能取代另一項。',
  sources: [
    { label: 'IRS — Form 8938 與 FBAR 申報要求比較（Comparison of Form 8938 and FBAR requirements）', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Form 8938 填寫說明（Instructions for Form 8938）', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — 海外銀行與金融帳戶申報（Report of Foreign Bank and Financial Accounts, FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Schedule B（Form 1040）填寫說明，Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
  ],
}

const FAQS = [
  {
    q: '如果我申報了 Form 8938，還需要申報 FBAR 嗎？',
    a: '需要，如果你符合 FBAR 的申報條件。IRS 說明，Form 8938 的申報要求不會取代或影響你申報 FBAR 的義務。兩者是分開的申報，各有門檻，送交不同的機關。',
  },
  {
    q: '我不需要申報美國所得稅表，還需要 Form 8938 嗎？',
    a: '不需要。如果你這一年不需要申報所得稅表，即使海外資產超過門檻，也不需要申報 Form 8938。FBAR 不同 — 仍然可能需要申報。',
  },
  {
    q: '我在台灣擁有的房子，要算進 FBAR 或 Form 8938 嗎？',
    a: '直接持有的海外不動產，兩種表格都不用申報。如果你是透過外國公司持有，這家公司的權益可能是 Form 8938 上的特定海外金融資產。',
  },
  {
    q: '我的台灣帳戶開在美國銀行的海外分行，適用哪一份表格？',
    a: '依 IRS 的比較表，在美國金融機構海外分行的帳戶要申報 FBAR，但不用申報 Form 8938。',
  },
  {
    q: '要用什麼匯率？',
    a: '兩份表格都一樣，IRS 的比較表說明要先找出最高價值，再用年底的匯率換算成美元。每個帳戶都要一致地使用同樣的方法。',
  },
  {
    q: '罰款有哪些？',
    a: 'Form 8938：未申報最高罰 $10,000，IRS 通知後仍持續未申報的，每 30 天再罰最高 $10,000，上限 $60,000；也可能有刑事處罰。FBAR 的民事罰款上限由 Title 31 規定，每年依通膨調整，也可能有刑事處罰。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '完整的 FBAR 指南：誰必須申報、$10,000 門檻怎麼算，以及如何透過 BSA E-Filing 申報。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '針對一個海外帳戶，逐步檢查所得稅、FBAR 與 Form 8938。',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '為什麼海外不動產的處理方式與海外帳戶不同。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  'FBAR 與 Form 8938 是揭露用的表格。這些帳戶產生的收入要在稅表上申報。',
  },
]

export default function FbarVsForm8938ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'FBAR 與 Form 8938（FATCA）：門檻、截止日與差異 | AskLinTax 繁體中文',
      description: 'FBAR 與 Form 8938 是兩項不同的申報要求。比較門檻、誰要申報、哪些資產要算、截止日與申報管道 — 附台灣與中國帳戶的例子。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>兩份表格、兩個機關、兩種門檻</h2>
        <p>
          如果你在美國境外有資金，會聽到兩項申報要求：<strong>FBAR</strong>（FinCEN Form 114）與 <strong>Form 8938</strong>（Statement of Specified Foreign Financial Assets，依 FATCA 制定的表格）。兩者問的問題很像，所以很多人以為申報一項就可以取代另一項。事實並非如此。
        </p>
        <ul>
          <li><strong>FBAR</strong> 要以電子方式向 FinCEN（美國財政部轄下的機構）申報 — <em>不是</em>向 IRS 申報，也不是隨稅表申報。</li>
          <li><strong>Form 8938</strong> 附在你的所得稅表中，向 IRS 申報。</li>
        </ul>
        <p>
          每一項要求都必須分開檢查。很多有海外帳戶的人兩項都要申報；有些人只需要申報 FBAR；也有些人兩項都不用。
        </p>

        <h2>並列比較</h2>
        <ArticleTable
          head={['', 'FBAR（FinCEN Form 114）', 'Form 8938']}
          rows={[
            ['誰要申報', '美國人（U.S. Person）：公民、居民外國人，以及國內實體、信託與遺產', '特定個人（美國公民、居民外國人與某些非居民外國人）以及特定國內實體'],
            ['門檻', '海外金融帳戶在這一曆年中任何時候合計超過 $10,000', '依報稅身分與居住地而定 — 請見下一張表'],
            ['申報內容', '位於外國的金融機構帳戶的最高價值', '特定海外金融資產的最高價值 — 海外帳戶加上某些非帳戶型投資'],
            ['申報對象', 'FinCEN，透過 BSA E-Filing System', 'IRS，附在你的所得稅表中'],
            ['截止日', '4 月 15 日，自動延期至 10 月 15 日', '你的所得稅表截止日（含延期）'],
            ['如果不需要申報所得稅表', '仍然可能需要申報', '不需要申報'],
          ]}
        />

        <h2>Form 8938 門檻</h2>
        <p>如果你的特定海外金融資產總價值超過你情況適用的門檻，就必須申報 Form 8938：</p>
        <ArticleTable
          head={['你的情況', '稅務年度最後一天 — 超過', '年度中任何時候 — 超過']}
          rows={[
            ['住在美國 — 未婚或夫妻分開申報', '$50,000', '$75,000'],
            ['住在美國 — 夫妻合併申報', '$100,000', '$150,000'],
            ['住在美國境外 — 未婚或夫妻分開申報', '$200,000', '$300,000'],
            ['住在美國境外 — 夫妻合併申報', '$400,000', '$600,000'],
          ]}
        />
        <p>
          只要<em>任一</em>項測試超過，就達到門檻。相較之下，FBAR 門檻只有一項測試：<strong>任何時候合計超過 $10,000</strong>，與報稅身分無關。
        </p>

        <h2>兩份表格各自要算哪些資產</h2>
        <ArticleTable
          head={['海外資產類型', 'FBAR', 'Form 8938']}
          rows={[
            ['外國金融機構的存款與保管帳戶', '要', '要'],
            ['美國金融機構海外分行的帳戶', '要', '不用'],
            ['外國金融機構美國分行的帳戶', '不用', '不用'],
            ['你只有簽名權（Signature Authority）的海外帳戶', '要，但有例外', '不用，除非你在帳戶中也有權益'],
            ['存放在海外金融帳戶中的外國股票或證券', '申報該帳戶', '申報該帳戶'],
            ['沒有存放在帳戶中的外國股票或證券', '不用', '要'],
            ['外國共同基金', '要', '要'],
            ['外國發行、有現金價值的壽險或年金', '要', '要'],
            ['直接持有的海外不動產', '不用', '不用'],
            ['直接持有的外幣或貴金屬', '不用', '不用'],
            ['外國政府的社會安全類給付', '不用', '不用'],
          ]}
        />
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>整理自 IRS 的比較表。完整規則請參閱各表格的填寫說明。</p>

        <h2>四種常見情況</h2>
        <ArticleTable
          head={['情況（住在美國）', 'FBAR？', 'Form 8938？']}
          rows={[
            ['單身；一個台灣儲蓄帳戶；最高餘額 $30,000', '要 — 超過 $10,000', '不用 — 年底低於 $50,000，任何時候也低於 $75,000'],
            ['單身；台灣帳戶年底價值 $120,000', '要', '要 — 年底超過 $50,000'],
            ['夫妻合併申報；海外帳戶合計最高 $90,000', '要', '不用 — 低於合併申報的 $100,000／$150,000 門檻'],
            ['單身；在台灣直接持有一間公寓，沒有海外帳戶', '不用', '不用 — 直接持有的不動產不申報'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 別忘了 Schedule B</div>
          <p>除了這兩份表格之外，Schedule B（Form 1040）的 Part III 會問你在 2025 年任何時候，是否對外國金融帳戶擁有財務權益或簽名權。填寫說明指出，即使你不需要申報 FBAR，也要勾選「Yes」。</p>
        </div>

        <h2>價值與匯率</h2>
        <p>
          兩份表格都申報每個帳戶或資產在這一年中的<strong>最高價值</strong>，以美元表示。IRS 的比較表說明，兩者都用<strong>年度最後一天</strong>的匯率換算。申報 FBAR 時，先用你的定期帳戶對帳單，以帳戶本身的幣別找出最高價值。
        </p>

        <h2>申報不等於繳稅</h2>
        <p>
          這兩份表格都不是稅，而是揭露用的表格。如果你是美國公民或居民，你的海外帳戶所產生的<strong>收入</strong> — 利息、股利、資本利得 — 要另外在所得稅表上申報。請參閱 <a href="/zh-tw/library/individual/worldwide-income/">海外收入：美國稅務居民要申報全球所得嗎？</a>
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 兩者的罰款都很重</div>
          <p>Form 8938：未申報最高罰 $10,000，IRS 通知後仍持續未申報的，每 30 天再罰最高 $10,000（上限 $60,000），也可能有刑事處罰。FBAR：民事罰款上限每年依通膨調整，也可能有刑事處罰。如果你過去幾年漏報了其中任何一項，在補報之前，請先諮詢稅務專業人士。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

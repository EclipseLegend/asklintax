import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-bank-account.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-bank-account',
  sourceHash:      'a48a9c82846d',
  id:            '24',
  title:         '台灣或海外銀行帳戶需要申報嗎？',
  titleEn:       'Do I need to report a Taiwan or foreign bank account?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋在海外有一般銀行帳戶的美國公民與居民外國人個人。企業帳戶、信託、退休帳戶與租稅協定主張，需要個別檢視',
  persona:       ['在台灣、中國或其他海外地區有銀行帳戶的人', '保留母國帳戶的新移民', '名字列在父母帳戶上的成年子女', '綠卡持有人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '針對 2025 年，分別回答三個問題：(1) 這個帳戶是否產生你必須在稅表上申報的利息？(2) 你所有的海外帳戶合計，是否在任何時候超過 $10,000（FBAR）？(3) 你的海外金融資產是否超過你的 Form 8938 門檻？',
  sources: [
    { label: 'IRS — 海外銀行與金融帳戶申報（Report of Foreign Bank and Financial Accounts, FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Form 8938 與 FBAR 申報要求比較（Comparison of Form 8938 and FBAR requirements）', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Schedule B（Form 1040）填寫說明，Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — 年平均匯率（Yearly average currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — 外國稅額抵免（Foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: '放在我台灣帳戶裡的錢要繳稅嗎？',
    a: '不用 — 帳戶餘額本身不是收入，在你自己的帳戶之間轉帳也不是收入。可能要繳稅的是帳戶產生的收益，例如利息；美國公民或居民必須在美國稅表上申報。',
  },
  {
    q: '台灣的銀行沒有寄 1099 給我，利息還要申報嗎？',
    a: '要。美國公民與居民外國人要就全球所得（Worldwide Income）繳稅，不論是否有美國稅表單據。把利息換算成美元，像其他利息收入一樣申報。',
  },
  {
    q: '為了方便，我的名字列在父母的台灣帳戶上，需要申報嗎？',
    a: '可能需要。FBAR 涵蓋你擁有財務權益（Financial Interest）或簽名權等權限的帳戶。如果你可以指示銀行轉出這筆錢，那就是簽名權。如果你必須計入的所有帳戶合計價值在這一年任何時候超過 $10,000，你就必須在 FBAR 上申報這個帳戶。',
  },
  {
    q: '我和配偶在台灣有共同帳戶，我們要各自申報 FBAR 嗎？',
    a: '一般來說每一位美國人都必須申報，但有一個例外：如果你所有的海外帳戶都和配偶共同持有，你可以簽署 FinCEN Form 114a，授權配偶代為申報，由配偶在按時申報的 FBAR 上申報這些共同帳戶。你的所得稅報稅身分不影響這項例外。',
  },
  {
    q: '我需要勾選 Schedule B 上的海外帳戶選項嗎？',
    a: '如果你在 2025 年任何時候，對外國金融帳戶擁有財務權益或簽名權，就要在 Schedule B 的 Part III 勾選「Yes」— 即使你不需要申報 FBAR。',
  },
  {
    q: '海外帳戶的紀錄要保留多久？',
    a: '就 FBAR 而言，請保留帳戶名稱、帳號、銀行名稱與地址、帳戶類型，以及這一年中的最高價值 — 一般自 FBAR 截止日起保留五年。',
  },
  {
    q: '台灣對我的利息預扣了稅款，我可以抵免嗎？',
    a: '對於同時被美國課稅的所得，你可能可以就符合資格的外國所得稅申請外國稅額抵免（Foreign Tax Credit，Form 1116），或列為分項扣除額。抵免只適用於符合資格的稅款，請查看相關規則或諮詢專業人士。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  'FinCEN Form 114 的完整說明：$10,000 測試、哪些帳戶要算，以及如何申報。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '並列比較兩份表格的門檻、截止日與要算的資產。',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '如果你帳戶裡的錢來自海外家人，請確認是否需要申報 Form 3520。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '台灣帳戶的利息，只是美國居民需要申報的一種海外收入。',
  },
]

export default function ForeignBankAccountZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '台灣銀行帳戶需要向 IRS 申報嗎？ | AskLinTax 繁體中文',
      description: '台灣或其他海外銀行帳戶會帶來三個不同的問題：利息的所得稅、FBAR 與 Form 8938。給美國公民與居民的 2025 年逐步檢查。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>擁有海外帳戶是合法的 — 但必須申報</h2>
        <p>
          許多搬到美國的人都保留了在台灣、中國或其他地方的銀行帳戶。這完全合法。但如果你是美國公民或美國稅務居民，這個帳戶最多可能帶來<strong>三項不同的義務</strong>。每一項都有自己的規則，符合其中一項，不代表其他項也已經處理好。
        </p>

        <ArticleTable
          head={['問題', '關於什麼', '在哪裡申報']}
          rows={[
            ['1. 所得稅', '帳戶產生的利息或其他收入', '你的 Form 1040（以及 Schedule B）'],
            ['2. FBAR', '你所有的海外帳戶在任何時候合計超過 $10,000', 'FinCEN Form 114，以電子方式向 FinCEN 申報'],
            ['3. Form 8938', '你的海外金融資產超過 Form 8938 門檻', '附在你的 Form 1040 中'],
          ]}
        />

        <h2>問題 1：帳戶產生的收益要繳稅嗎？</h2>
        <p>
          美國公民與居民外國人要就<strong>全球所得</strong>（Worldwide Income）繳稅。你在身為美國稅務居民期間，台灣帳戶產生的利息就是要申報的收入 — 即使沒有 1099，即使這筆錢從未離開台灣。
        </p>
        <p>
          帳戶<strong>餘額</strong>不是收入。搬來美國之前存下的錢、在自己帳戶之間的轉帳，以及家人的真正贈與，都不會因為放在帳戶裡就變成收入。
        </p>
        <h3>換算成美元</h3>
        <p>
          美國稅表上的金額必須以美元表示。IRS 的一般規則是使用你收到收入時的匯率。IRS 也公布年平均匯率；2025 年列出的是<strong>每 1 美元兌 31.167 新台幣</strong>，而且只要你一致地使用，IRS 通常接受任何公開的匯率。
        </p>
        <p>
          例子：2025 年利息 NT$15,000 ÷ 31.167 ≈ <strong>$481</strong> 的利息收入。
        </p>
        <p>
          如果台灣對這筆利息預扣了所得稅，你可能可以用 Form 1116 申請<strong>外國稅額抵免</strong>，或把符合資格的外國所得稅列為分項扣除額。
        </p>

        <h2>問題 2：我需要申報 FBAR 嗎？</h2>
        <p>
          如果你是美國人，對至少一個美國境外的金融帳戶<strong>擁有財務權益，或擁有簽名權等權限</strong>，而且這些帳戶的<strong>合計價值</strong>在這一曆年中<strong>任何時候超過 $10,000</strong>，你就必須申報 FBAR（FinCEN Form 114）。
        </p>
        <ul>
          <li>「合計」是指把你所有的海外帳戶加總。同一時間兩個各 $6,000 的帳戶，合計 $12,000 — 兩個都必須申報。</li>
          <li>帳戶是否產生收入，沒有影響。</li>
          <li>即使是父母名下的帳戶，如果你有簽名權，仍然可能要計入。</li>
        </ul>
        <p>
          FBAR 的截止日是 <strong>4 月 15 日</strong>，並自動延期至 <strong>10 月 15 日</strong>。要透過 FinCEN 的 <strong>BSA E-Filing System</strong> 以電子方式申報 — 不是隨稅表申報。完整規則請參閱 <a href="/zh-tw/library/investment/fbar/">FBAR：我需要申報海外銀行帳戶嗎？</a>
        </p>

        <h2>問題 3：我需要 Form 8938 嗎？</h2>
        <p>
          Form 8938 的門檻高得多。住在美國的人，如果特定海外金融資產的價值<strong>在年度最後一天超過 $50,000，或在任何時候超過 $75,000</strong>（單身或夫妻分開申報），或夫妻合併申報時超過 <strong>$100,000／$150,000</strong>，就必須申報。如果你不需要申報所得稅表，就不需要申報 Form 8938。完整比較請參閱 <a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938</a>。
        </p>

        <h2>實際例子</h2>
        <p>Jason 持 H-1B 簽證搬到美國，2025 年全年都是美國稅務居民。他保留了兩個台灣帳戶：</p>
        <ArticleTable
          head={['帳戶', '2025 年最高餘額', '利息收入']}
          rows={[
            ['儲蓄帳戶', '約 $22,000', 'NT$15,000（≈ $481）'],
            ['支票帳戶', '約 $3,000', '無'],
          ]}
        />
        <ul>
          <li><strong>所得稅：</strong>在他 2025 年的 Form 1040 上申報約 $481 的利息。</li>
          <li><strong>Schedule B：</strong>就擁有海外帳戶財務權益勾選「Yes」。</li>
          <li><strong>FBAR：</strong>需要 — 帳戶合計超過 $10,000。他要申報兩個帳戶，包括金額較小的支票帳戶。</li>
          <li><strong>Form 8938：</strong>如果他是單身，海外資產年底低於 $50,000，且任何時候都低於 $75,000，就不需要。</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 每個帳戶都要保留這些紀錄</div>
          <p>帳戶名稱、帳號、銀行名稱與地址、帳戶類型，以及這一年中的最高價值。自 FBAR 截止日起保留五年。台灣銀行的年底對帳單通常已涵蓋大部分資訊。</p>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 過去幾年漏報了？</div>
          <p>逾期申報總比不申報好。如果 IRS 還沒有聯絡你，你也沒有被調查，IRS 說明應盡快補報逾期的 FBAR，把可能的罰款降到最低。如果你也漏報了利息收入，請和稅務專業人士討論更正以前年度的正確方式。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

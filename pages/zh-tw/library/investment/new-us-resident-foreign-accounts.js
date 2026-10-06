import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/new-us-resident-foreign-accounts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'new-us-resident-foreign-accounts',
  sourceHash:      '0ed1121bc705',
  id:            '43',
  title:         '剛搬來美國，原本的台灣／海外帳戶要申報嗎？',
  titleEn:       'I just moved to the U.S. — do I need to report my foreign bank accounts?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋在這一年成為美國居民、並保留海外帳戶的個人。抵美那一年，居民身分開始日之前的帳戶金額在 FBAR 上如何處理，本指南查閱的官方資料並沒有明確說明，因此抵美那一年的 FBAR 需要個別檢視',
  persona:       ['新拿到綠卡的人', '第一年在美國的 H-1B 或 L-1 工作者', '豁免年數已結束的學生', '今年從台灣或中國搬來的家庭'],
  relatedJourney: ['剛到美國', '跨境財務'],
  actionRequired: '先確定你在稅務上什麼時候成為美國居民。接著分別檢查 FBAR 和 Form 8938 — 兩者門檻不同，期間規定也不完全相同 — 再另外申報你成為居民期間海外帳戶產生的收入。',
  sources: [
    { label: 'IRS — Form 8938 填寫說明（specified individual 與申報期間）', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — International Practice Unit：FinCEN Form 114（FBAR）（美國居民的判定）', url: 'https://www.irs.gov/pub/fatca/int_practice_units/fincen-form114-fbar.pdf' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（居民身分開始日）', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: '我 10 月才到美國，今年的台灣帳戶要申報嗎？',
    a: '有可能。如果你在這一年成為美國居民，在 FBAR 上就可能是這個日曆年度的美國人。抵美之前的餘額是否要算進抵美那一年的 FBAR，本指南查閱的官方資料並沒有清楚說明，所以這一年請找專業人士檢視。Form 8938 的填寫說明則指出，申報期間從你的居民身分開始日起算。',
  },
  {
    q: 'FBAR 的居民身分，和稅務居民身分一樣嗎？',
    a: '大致相同，但不完全一樣。FBAR 的居民身分是依稅法的居民測試判斷，但 IRS 指引指出，像是選擇把非居民配偶視為居民這類選擇，以及租稅協定的規定，都不會改變你在 FBAR 上的身分。',
  },
  {
    q: '我從海外帶來的錢，第一年要算收入嗎？',
    a: '移動自己的錢不是收入。所得稅重要的是賺了什麼、什麼時候賺的 — 例如你成為居民期間賺到的利息。',
  },
  {
    q: '我持 F-1 簽證念了好幾年書，這些規定什麼時候開始適用？',
    a: '學生在一定年數內，通常可以不計算實質居住測試的天數。一般要等你成為居民後，申報才開始相關。天數怎麼算，請見我們的實質居留測試指南。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '用白話說明綠卡測試與實質居住測試。',
  },
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: '雙重身分報稅：抵達或離開美國的那一年',
    desc:  '成為居民那一年的所得稅表怎麼報。',
  },
  {
    href: '/library/investment/pre-immigration-savings',
    cat:  'Investments & Foreign Accounts',
    title: '搬來美國以前就有的海外存款，需要申報嗎？',
    desc:  '為什麼舊存款所在的帳戶仍可能要申報。',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '確定你是美國人之後，合計門檻怎麼算。',
  },
]

export default function NewUsResidentForeignAccountsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '剛搬來美國，台灣／海外帳戶要申報嗎？ | AskLinTax 繁體中文',
      description: '在美國的第一年，台灣或海外還有帳戶？把四個問題分開：居民身分何時開始、FBAR、Form 8938 與申報期間，以及帳戶產生的收入。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          有可能 — 而且抵美那一年要特別小心。搬到美國本身不會產生申報義務。產生義務的是：成為（FBAR 上的）<strong>美國人</strong>（U.S. person）或（Form 8938 上的）<strong>specified individual</strong>，並且達到各自的門檻。帳戶的<strong>收入</strong>則是另外的第三個問題。
        </p>
        <p>依序回答四個問題：</p>

        <ArticleTable
          head={['問題', '為什麼重要']}
          rows={[
            ['A. 你在稅務上什麼時候成為美國居民？', '申報義務取決於你的身分，而抵美那一年可能只有部分年度'],
            ['B. 適用哪個申報期間？', 'FBAR 和 Form 8938 是兩套不同的制度；不要假設它們的期間規定相同'],
            ['C. 有沒有達到門檻？', 'FBAR：合計在任何時候超過 $10,000。Form 8938：門檻高很多，依報稅身分而定'],
            ['D. 你成為居民期間，帳戶有沒有產生收入？', '利息等收入要在稅表上申報，和 FBAR、Form 8938 分開'],
          ]}
        />

        <h2>A. 美國居民身分從什麼時候開始？</h2>
        <p>
          如果你不是美國公民，符合<strong>綠卡測試</strong>或<strong>實質居住測試</strong>，一般就是稅務上的居民。抵美那一年，稅法有一個<strong>居民身分開始日</strong>（residency starting date）— 例如依實質居住測試，一般是你那一年第一天在美國的日子（有少數例外）。請見<a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>以及<a href="/zh-tw/library/individual/substantial-presence-test/">實質居留測試指南</a>。
        </p>

        <h2>B. Form 8938 和 FBAR 規定不同 — 分別檢查</h2>
        <h3>Form 8938：申報期間從居民身分開始日起算</h3>
        <p>
          Form 8938 填寫說明指出，如果你在這個稅務年度只有部分時間是 specified individual，<strong>申報期間就是你身為 specified individual 的那段期間</strong>。說明中的例子：George 不是美國公民，2 月 1 日抵達美國，並符合當年的實質居住測試。他的 Form 8938 申報期間從居民身分開始日 2 月 1 日起，到 12 月 31 日止。
        </p>
        <h3>FBAR：針對美國人的日曆年度申報</h3>
        <p>
          FBAR 是針對每一個日曆年度申報：在該年度中，美國人對海外金融帳戶有財務利益或簽署權，且這些帳戶的合計金額在該日曆年度中任何時候超過 $10,000。在 FBAR 上，居民身分依稅法的居民測試判斷 — 但 IRS 指引指出，選擇（例如把非居民配偶視為居民）以及租稅協定的規定，<strong>不會</strong>改變 FBAR 上的居民身分。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 抵美那一年的 FBAR：請找專業人士檢視</div>
          <p>本指南查閱的官方資料，並沒有清楚說明抵美那一年、居民身分開始日<strong>之前</strong>的帳戶金額在 FBAR 上怎麼處理。不要假設 Form 8938 的規定可以直接套用，也不要假設抵美前的餘額可以直接忽略。如果你抵美那一年的餘額接近或超過 $10,000，請找稅務專業人士檢視那一年。</p>
        </div>

        <h2>C. 門檻</h2>
        <ul>
          <li><strong>FBAR：</strong>你的海外金融帳戶最高餘額合計，在任何時候超過 $10,000。請見<a href="/zh-tw/library/investment/fbar-10000-rule/">海外帳戶超過 $10,000 就要報 FBAR 嗎？</a></li>
          <li><strong>Form 8938：</strong>住在美國的納稅人，單身者年底超過 $50,000 或一年中任何時候超過 $75,000；夫妻合併申報者為超過 $100,000 或 $150,000。住在海外的門檻更高。只有在你需要申報所得稅表時，才需要申報 Form 8938。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
        </ul>

        <h2>D. 帳戶的收入</h2>
        <p>
          身為美國居民，你要就全球所得繳稅，所以你成為居民期間海外帳戶賺到的利息，要在稅表上申報。抵美那一年的所得稅表可能是雙重身分（dual-status）稅表，有它自己的規定。請見<a href="/zh-tw/library/individual/dual-status/">雙重身分報稅</a>。你來美國之前賺到並存下的錢，不會因為你把它移過來就再被課稅 — 請見<a href="/zh-tw/library/investment/pre-immigration-savings/">搬來美國以前就有的海外存款，需要申報嗎？</a>
        </p>

        <h2>例子</h2>
        <p>
          Lin 在 2025 年 8 月持綠卡從台北搬到西雅圖，保留了兩個台灣帳戶。她依序回答四個問題：(A) 確定她 2025 年的居民身分開始日；(B) Form 8938 的申報期間從那天開始；(C) 她的帳戶合計遠低於 Form 8938 門檻，但超過 $10,000，所以真正要處理的是 FBAR — 又因為是抵美那一年，她請專業人士檢視；(D) 她把成為居民期間台灣帳戶賺到的利息，申報在 2025 年的稅表上。
        </p>

        <h2>現在就開始保留的紀錄</h2>
        <ul>
          <li>你的抵美日期與移民文件（用來確定居民身分開始日）</li>
          <li>每個海外帳戶從抵美那一年 1 月起的月對帳單</li>
          <li>海外銀行的利息明細</li>
          <li>你持有幣別的財政部年底匯率</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

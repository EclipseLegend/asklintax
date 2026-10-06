import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-account-no-interest.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-account-no-interest',
  sourceHash:      '5ffbf9d8d7d5',
  id:            '44',
  title:         '海外帳戶沒有利息，也要報 FBAR 嗎？',
  titleEn:       'My foreign bank account earned no interest — do I still need to report it?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋海外帳戶幾乎沒有或完全沒有收入的美國公民與居民外國人。把帳戶申報（FBAR、Form 8938）與稅表上的收入申報分開說明',
  persona:       ['海外活存帳戶沒有利息的人', '在台灣或中國保留閒置帳戶的人', '保留原居住國帳戶的新移民', '名字在父母帳戶上的成年子女'],
  relatedJourney: ['跨境財務'],
  actionRequired: '把兩個問題分開看。帳戶申報（FBAR，也可能有 Form 8938）取決於帳戶金額與門檻 — 不是看帳戶有沒有利息。收入申報則取決於帳戶實際上有沒有產生收入。',
  sources: [
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Schedule B（Form 1040）填寫說明，Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: '我的台灣活存帳戶完全沒有利息，還需要報 FBAR 嗎？',
    a: '有可能。FBAR 看的是你所有海外金融帳戶的合計金額，在這一年中任何時候是否超過 $10,000 — 不是看帳戶有沒有利息。',
  },
  {
    q: '沒有收入的話，稅表上還有什麼要填的嗎？',
    a: '有可能。Schedule B 的 Part III 會問你這一年中任何時候，是否對海外金融帳戶有財務利益或簽署權。Schedule B 的填寫說明表示，即使你不需要申報 FBAR，也要回答這個問題。',
  },
  {
    q: '沒有產生收入的帳戶，也可能要報 Form 8938 嗎？',
    a: '可能，只要其他條件符合。Form 8938 取決於你的 specified foreign financial asset 價值是否超過你的門檻，以及你是否需要申報所得稅表 — 不是看這些資產當年有沒有產生收入。',
  },
  {
    q: '我的帳戶只有很少的利息，這有關係嗎？',
    a: '有關係。美國公民與居民要申報全球所得，包括很少的海外利息，換算成美元申報。這和 FBAR 是兩回事。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '真正決定要不要申報的合計門檻。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '一個帳戶的所得稅、FBAR 與 Form 8938，一步步說明。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '兩個不同的測試，門檻也不同。',
  },
]

export default function ForeignAccountNoInterestZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外帳戶沒有利息，也要報 FBAR 嗎？ | AskLinTax 繁體中文',
      description: '沒有利息不代表不用報 FBAR。帳戶申報（FBAR、Form 8938）看的是帳戶金額；收入申報看的是實際賺到的錢。兩者的差別與例子。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          要，你可能仍然需要申報。<strong>「沒有收入」不代表「不用報 FBAR」。</strong>FBAR 看的是你海外金融帳戶的<strong>金額</strong> — 合計是否在這一年中任何時候超過 $10,000 — 而不是帳戶有沒有利息。
        </p>
        <p>
          很多人會把兩種申報混在一起，分開來看會清楚很多：
        </p>

        <ArticleTable
          head={['', '帳戶申報', '收入申報']}
          rows={[
            ['涵蓋什麼', '海外帳戶的存在與金額', '帳戶賺到的收入（利息、股利、資本利得）'],
            ['在哪裡申報', 'FBAR（向 FinCEN）；Form 8938（隨稅表）；Schedule B Part III 的問題', '你的所得稅表'],
            ['由什麼觸發', '帳戶金額與門檻', '你身為美國公民或居民期間實際賺到的收入'],
            ['零利息帳戶', '仍然可能需要', '沒有賺到利息，就沒有利息要申報'],
          ]}
        />

        <h2>帳戶申報：FBAR</h2>
        <p>
          只要你所有海外金融帳戶的最高餘額，在這個日曆年度中任何時候合計超過 $10,000，就要申報 FBAR — 包括完全沒有利息的帳戶。請見<a href="/zh-tw/library/investment/fbar-10000-rule/">海外帳戶超過 $10,000 就要報 FBAR 嗎？</a>
        </p>

        <h2>帳戶申報：Form 8938</h2>
        <p>
          如果你的 specified foreign financial asset 超過門檻，而且你需要申報所得稅表，Form 8938 也可能適用於當年沒有收入的資產。它的門檻比 FBAR 高很多。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a>
        </p>

        <h2>Schedule B 的問題</h2>
        <p>
          如果你需要填 Schedule B，Part III 會問你這一年中任何時候，是否對海外金融帳戶有財務利益或簽署權。依帳戶本身回答 — Schedule B 的填寫說明表示，即使你不需要申報 FBAR，也要回答「Yes」。
        </p>

        <h2>收入申報：只報實際賺到的</h2>
        <p>
          美國公民與居民要就全球所得繳稅。如果帳戶有賺到利息 — 即使金額很小 — 你要換算成美元在稅表上申報。如果真的完全沒有收入，就沒有利息要申報。不論哪一種，都不會改變 FBAR 的答案。
        </p>

        <h2>例子</h2>
        <p>
          Ben 有一個沒有利息的台灣活存帳戶，2025 年最高時相當於 $14,000，他沒有其他海外帳戶。結果：他的稅表上沒有海外利息要申報，但這個帳戶超過 $10,000，所以他要申報 FBAR，並在 Schedule B 的海外帳戶問題回答「Yes」。他的海外資產遠低於 Form 8938 的門檻。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 常見的誤解</div>
          <p>「我的帳戶沒賺錢，IRS 不會在意」是漏報 FBAR 最常見的原因之一。如果你已經漏報，請見<a href="/zh-tw/library/investment/late-fbar/">忘記報 FBAR 怎麼辦？</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

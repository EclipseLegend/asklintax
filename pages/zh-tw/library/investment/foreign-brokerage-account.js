import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-brokerage-account.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-brokerage-account',
  sourceHash:      'e740df975cd3',
  id:            '46',
  title:         '海外股票與證券帳戶怎麼申報？',
  titleEn:       'Foreign brokerage accounts and stocks: what goes on FBAR and Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人的海外證券帳戶與海外股票，在 FBAR 與 Form 8938 上如何申報。不說明海外投資的所得稅規定；海外共同基金與類似的集合基金可能另有 PFIC 問題',
  persona:       ['在台灣、香港或中國有證券帳戶的人', '持有外國雇主股票的員工', '繼承海外股票的人', '在海外有投資帳戶的新移民'],
  relatedJourney: ['跨境財務'],
  actionRequired: '把你的海外投資分成兩組：(A) 放在海外證券或保管帳戶裡的投資 — 要申報的是帳戶；(B) 不在任何帳戶裡、你直接持有的海外股票 — 可能要報 Form 8938，但不是 FBAR 項目。',
  sources: [
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'eCFR — 31 CFR 1010.350，海外金融帳戶申報規定（證券帳戶）', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'FinCEN — 帳戶最高餘額的申報（Reporting Maximum Account Value）', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
  ],
}

const FAQS = [
  {
    q: '我台灣證券帳戶裡的每一檔股票，都要列在 FBAR 上嗎？',
    a: '不用。依照 IRS 的比較表，放在金融帳戶裡的海外股票或證券，要申報的是帳戶本身，帳戶內容不需要另外逐項申報。Form 8938 也是一樣。',
  },
  {
    q: '我持有台灣公司的實體股票，不在任何帳戶裡。要報 FBAR 嗎？',
    a: '不用。IRS 的比較表指出，不放在金融帳戶裡的海外股票或證券，不是 FBAR 項目。如果你符合 Form 8938 的條件，它們可能要在 Form 8938 上申報。',
  },
  {
    q: '證券帳戶在 FBAR 上怎麼估值？',
    a: '用這個日曆年度中帳戶最高價值（現金加證券）的合理估計，並用該年度最後一天的財政部匯率換算。',
  },
  {
    q: '我持有海外共同基金，這算一般股票嗎？',
    a: '不一定。海外共同基金與類似的集合基金，在所得稅上可能被視為被動外國投資公司（PFIC），有自己的申報規定（Form 8621）。這不在本文範圍內 — 請尋求專業協助。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '兩份表格完整的對照比較。',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    desc:  '持股市值起伏的帳戶，怎麼估值。',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '海外股票的股利與資本利得是收入，要另外申報。',
  },
]

export default function ForeignBrokerageAccountZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外股票與證券帳戶怎麼申報？FBAR 與 Form 8938 | AskLinTax 繁體中文',
      description: '台灣或海外證券帳戶要報帳戶，還是每一檔股票？海外證券帳戶與直接持有的海外股票，在 FBAR 與 Form 8938 上的處理方式。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          要看你<strong>怎麼</strong>持有這些投資：
        </p>
        <ul>
          <li><strong>放在海外證券或保管帳戶裡：</strong>要申報的是<strong>帳戶</strong> — 在 FBAR 上（它是海外金融帳戶），如果你達到門檻，也在 Form 8938 上。帳戶裡的每一檔股票不需要另外列出。</li>
          <li><strong>不在任何帳戶裡、直接持有的海外股票：</strong>可能要在 <strong>Form 8938</strong> 上申報，但<strong>不</strong>在 FBAR 上申報。</li>
        </ul>

        <ArticleTable
          head={['你持有的東西（依 IRS 比較表）', 'FBAR', 'Form 8938']}
          rows={[
            ['放在海外金融機構金融帳戶裡的海外股票或證券', '申報帳戶；內容不需另外申報', '申報帳戶；內容不需另外申報'],
            ['不放在金融帳戶裡的海外股票或證券', '不申報', '申報（若符合 Form 8938 條件）'],
          ]}
        />

        <h2>A. 海外證券帳戶裡的證券</h2>
        <p>
          FBAR 的法規把<strong>證券帳戶</strong> — 在從事買賣、持有或交易股票或其他證券業務者處開立的帳戶 — 視為金融帳戶。所以台灣或香港的證券帳戶，和銀行帳戶一樣要算進 FBAR 的 $10,000 合計門檻。它的最高餘額，是這一年中帳戶內所有東西（現金加證券）最高價值的合理估計。請見<a href="/zh-tw/library/investment/fbar-maximum-account-value/">最高餘額怎麼算</a>。
        </p>

        <h2>B. 你直接持有的海外股票</h2>
        <p>
          有些人直接持有外國公司的股份 — 例如以自己的名義登記在公司名冊上，而不是透過券商。IRS 的比較表指出，這種海外股票<strong>不是</strong> FBAR 項目，但<strong>是</strong> Form 8938 上的 specified foreign financial asset，依 Form 8938 的門檻，而且以你需要申報所得稅表為前提。
        </p>

        <h2>例子</h2>
        <p>
          Hui 是住在美國、以單身身分報稅的美國居民。她有一個台灣證券帳戶，2025 年最高價值 $42,000（股票加現金），另外直接持有一家台灣家族公司的股份，價值 $15,000，不在任何帳戶裡。FBAR 上，她申報證券帳戶（超過 $10,000），但不申報直接持有的股份。Form 8938 上，兩者都要算，所以她的 specified foreign financial asset 達到 $57,000。住在美國的單身報稅者，如果總價值在年底超過 $50,000，或一年中任何時候超過 $75,000，就要申報 Form 8938 — 所以她要檢查年底的價值。如果需要申報，證券帳戶以帳戶申報，直接持有的股份則另外作為一項資產申報。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 申報和所得稅是兩回事</div>
          <p>對美國公民與居民來說，海外投資的股利與資本利得是應稅收入，要在稅表上申報。海外共同基金與類似的集合基金可能是被動外國投資公司（PFIC），有自己複雜的規定和 Form 8621。本文不涵蓋這些規定 — 如果你持有海外基金，請尋求專業協助。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

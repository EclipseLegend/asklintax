import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/us-taxpayer-living-abroad.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'us-taxpayer-living-abroad',
  sourceHash:      '162ea742b48e',
  id:            '95',
  title:         '住在台灣或海外：美國報稅清單',
  titleEn:       'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 54（2025 年 12 月修訂版）、2025 年 Form 1040 填寫說明、2025 年 Form 2555 填寫說明、Form 8938 填寫說明、IRS FBAR 網頁、IRS 年平均匯率，以及 IRS 美國所得稅協定清單，為 2025 與 2026 稅務年度住在美國境外的美國公民與居民外國人整理的聯邦報稅清單。本文連結到詳細指南，而不重複說明。本文不涵蓋美國州稅、放棄國籍或台灣稅法',
  persona:       ['住在台灣的美國公民', '在海外工作的綠卡持有人', '最近搬到海外的美國人', '在不只一個國家有收入或帳戶的家庭'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '確認你是否必須申報美國稅表，留意 6 月 15 日的自動延期（利息仍從 4 月 15 日起算），按所得類型在海外工作所得排除額與外國稅額抵免之間做選擇，並確認適用於海外居住者的 FBAR 與 Form 8938 門檻。',
  sources: [
    { label: 'IRS — Publication 54，美國公民與居民外國人在海外的稅務指南', url: 'https://www.irs.gov/publications/p54' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 年 Form 2555 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i2555.pdf' },
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — 年平均匯率（Yearly average currency exchange rates）', url: 'https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates' },
    { label: 'IRS — 美國所得稅協定 A 到 Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: '我住在台灣，所有收入都在台灣賺的，還要申報美國稅表嗎？',
    a: '如果你是美國公民或居民外國人，而且總所得達到申報門檻，一般需要。Publication 54 說，做這項判斷時，總所得包括你可以排除的海外工作所得或海外住房金額。而且你必須申報稅表才能申請排除額。',
  },
  {
    q: '我住在海外，稅表什麼時候到期？',
    a: '如果 4 月 15 日當天你住在美國與波多黎各以外，而且稅務住所也在這些地方以外，你可以自動延期 2 個月到 6 月 15 日申報並繳稅，但未繳的稅從 4 月 15 日起計息。你可以在 6 月 15 日前用 Form 4868 再申請 4 個月，延到 10 月 15 日；這是延長申報期限，不是延長繳稅期限。',
  },
  {
    q: '美國和台灣有稅務協定嗎？',
    a: '截至本文 2026 年 10 月的檢視，台灣沒有出現在 IRS 的美國所得稅協定清單上（IRS 最後更新該網頁的日期為 2026 年 1 月 3 日）。我們無法從本次檢視可取得的美國政府來源確認，任何美台雙重課稅救濟立法是否已經通過，所以本文不依賴任何這類救濟。沒有協定並不代表沒有其他救濟：外國稅額抵免與海外工作所得排除額等美國規定仍然適用。報稅前請查看 IRS 的最新指引。',
  },
  {
    q: '我應該用海外工作所得排除額還是外國稅額抵免？',
    a: '要看你的所得與外國稅率。排除額只適用於工作所得，而且已排除所得的外國稅不能抵免。許多人會比較兩種方式。請參考海外工作所得排除額與外國稅額抵免指南。',
  },
  {
    q: '台幣要用哪個匯率換算？',
    a: 'IRS 一般接受一致使用的任何公告匯率，並公布年平均匯率：2025 年為每 1 美元兌 31.167 新台幣。FBAR 的帳戶最高價值則使用年度最後一天的財政部匯率換算。',
  },
]

const RELATED = [
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: '海外工作所得排除額（Form 2555）：2025 與 2026 年規定',
    desc:  '排除海外工資與住房費用。',
  },
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: '外國稅額抵免（Form 1116）：避免台灣與其他海外所得被雙重課稅',
    desc:  '用外國所得稅抵減美國稅。',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  'FBAR 的 $10,000 規定與申報方式。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '比較兩種海外資產申報。',
  },
]

export default function UsTaxpayerLivingAbroadZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '住在台灣或海外：美國報稅清單 | AskLinTax 繁體中文',
      description: '海外美國公民與綠卡持有人的美國報稅清單：申報門檻、6 月 15 日與 10 月 15 日延期、海外工作所得排除額與外國稅額抵免、FBAR、Form 8938、PFIC、海外退休金、匯率與台灣。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          搬到海外並不會結束美國報稅。美國公民與居民外國人（包括綠卡持有人）一般要申報<strong>全球所得</strong>，只要所得達到申報門檻就要申報美國稅表，即使他們住在台灣、在台灣工作也一樣。特別規定讓你有更多時間申報，也有方法減少雙重課稅，而海外帳戶與資產可能需要另外申報。請用這份清單，再依連結查看細節。
        </p>

        <h2>1. 你需要報稅嗎？</h2>
        <ArticleTable
          head={['2025 年報稅身分（65 歲以下）', '總所得達到下列金額就要申報']}
          rows={[
            ['單身', '$15,750'],
            ['夫妻合併申報（兩人都未滿 65 歲）', '$31,500'],
            ['夫妻分開申報（任何年齡）', '$5'],
            ['戶長', '$23,625'],
            ['符合資格的喪偶者', '$31,500'],
          ]}
        />
        <p>
          這些是 Form 1040 填寫說明中 2025 年的金額；65 歲以上適用較高的金額，2026 年的金額會列在 2026 年填寫說明中。做這項判斷時，總所得包括你可以排除的海外工作所得與住房金額。如果你的自僱淨所得達 $400 以上，也必須申報。全球所得的說明請見<a href="/zh-tw/library/individual/worldwide-income/">海外收入：美國稅務居民要申報全球所得嗎？</a>
        </p>

        <h2>2. 截止日與繳稅</h2>
        <ArticleTable
          head={['項目', '2025 年稅表的日期', '說明']}
          rows={[
            ['一般截止日', '2026 年 4 月 15 日', '即使延期，未繳的稅從這一天起計息'],
            ['自動延期 2 個月', '2026 年 6 月 15 日', '4 月 15 日當天你住在美國與波多黎各以外，而且稅務住所在海外；需附聲明'],
            ['再延 4 個月（Form 4868，6 月 15 日前申請）', '2026 年 10 月 15 日', '延長申報期限，不是延長繳稅期限'],
            ['FBAR（FinCEN Form 114）', '4 月 15 日，自動延到 10 月 15 日', '與稅表分開申報'],
          ]}
        />
        <p>
          如果你在等待符合海外工作所得排除額的資格，可以用 Form 2350 延長申報期限；請參考<a href="/zh-tw/library/individual/foreign-earned-income-exclusion/">海外工作所得排除額指南</a>。
        </p>

        <h2>3. 避免雙重課稅：排除額或外國稅額抵免</h2>
        <ul>
          <li><strong>海外工作所得排除額：</strong>如果你符合稅務住所與居住或停留測試，可以排除海外工資與自僱所得，2025 年最高 $130,000、2026 年最高 $132,900，另加住房金額。它不適用於投資所得。請參考<a href="/zh-tw/library/individual/foreign-earned-income-exclusion/">海外工作所得排除額指南</a>。</li>
          <li><strong>外國稅額抵免：</strong>以符合資格的外國所得稅在限額內減少美國稅。已排除所得的外國稅不能抵免。請參考<a href="/zh-tw/library/individual/foreign-tax-credit/">外國稅額抵免指南</a>。</li>
        </ul>

        <h2>4. 海外帳戶與資產</h2>
        <ul>
          <li><strong>FBAR：</strong>如果你所有海外金融帳戶的合計價值在一年中任何時候超過 $10,000，就要申報。請參考 <a href="/zh-tw/library/investment/fbar/">FBAR 指南</a>。</li>
          <li><strong>Form 8938：</strong>如果你的稅務住所在海外並符合海外停留測試，門檻較高：年底超過 $200,000 或一年中任何時候超過 $300,000（單身或夫妻分開申報），合併申報則為 $400,000 / $600,000。請參考 <a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
          <li><strong>海外基金與 ETF：</strong>可能是 PFIC，有各自的規定與 Form 8621。請參考 <a href="/zh-tw/library/investment/pfic-form-8621/">PFIC 指南</a>。</li>
          <li><strong>海外退休金：</strong>可能涉及 Form 8938、FBAR 與 Form 3520 的問題。請參考<a href="/zh-tw/library/investment/foreign-pension-retirement-accounts/">海外退休金指南</a>。</li>
        </ul>

        <h2>5. 匯率換算</h2>
        <p>
          每一筆金額都要以美元申報。IRS 一般接受一致使用的任何公告匯率，它公布的新台幣年平均匯率是 <strong>2025 年每 1 美元兌 31.167 新台幣</strong>。換算時，用新台幣金額除以匯率。FBAR 使用不同的規定：年度最後一天的財政部匯率。請參考 <a href="/zh-tw/library/investment/fbar-maximum-account-value/">FBAR 帳戶最高價值指南</a>。
        </p>

        <h2>6. 與台灣有關的考量</h2>
        <ul>
          <li><strong>IRS 清單上沒有協定（截至 2026 年 10 月）：</strong>台灣沒有出現在 IRS 的美國所得稅協定清單上。我們無法從可取得的美國政府來源確認，任何美台雙重課稅救濟立法是否已經通過，所以本文不依賴任何這類救濟；報稅前請查看 IRS 的最新指引。即使沒有協定，只要符合資格，外國稅額抵免與海外工作所得排除額仍然可以使用。</li>
          <li><strong>真實居住測試：</strong>Publication 54 把這項測試限於美國公民，以及與美國有生效中所得稅協定國家的公民或國民身分的居民外國人；實際停留測試則適用於所有居民外國人。對綠卡持有人而言，決定的是公民或國民身分，而不是出生地或美國稅務居民身分。請參考<a href="/zh-tw/library/individual/foreign-earned-income-exclusion/">海外工作所得排除額指南</a>。</li>
          <li><strong>哪些台灣的稅可以抵免：</strong>一般只有外國所得稅（或代替所得稅的稅）符合抵免資格；不動產稅不符合。</li>
        </ul>

        <h2>清單</h2>
        <ul>
          <li>確認你的申報義務（總所得包括可排除的海外所得）。</li>
          <li>決定是否使用 6 月 15 日延期，必要時申請 Form 4868；在 4 月 15 日前繳稅以避免利息。</li>
          <li>比較海外工作所得排除額與外國稅額抵免。</li>
          <li>加總你的海外帳戶餘額，確認 FBAR 與 Form 8938。</li>
          <li>找出可能需要 Form 8621、8938 或 3520 的海外基金、退休金與其他資產。</li>
          <li>一致地把所有金額換算成美元。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 這份清單以外</div>
          <p>本文不涵蓋搬家後的美國州稅義務、放棄國籍、台灣稅法與海外事業。2026 年的規定請依正式的 2026 年表格與填寫說明確認。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

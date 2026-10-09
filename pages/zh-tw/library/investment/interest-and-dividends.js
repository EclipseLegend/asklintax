import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/interest-and-dividends.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'interest-and-dividends',
  sourceHash:      'e04bfe3ac6f7',
  id:            '63',
  title:         '銀行利息和股利要申報嗎？',
  titleEn:       'Do I have to report bank interest and dividends?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人收到的美國銀行利息與投資股利，以及如何在聯邦所得稅表上申報。海外帳戶申報（FBAR、Form 8938）、儲蓄債券與原始發行折價的細節，以及州稅處理，不在本文範圍內',
  persona:       ['有儲蓄帳戶或定存的人', '收到 Form 1099-INT 或 1099-DIV 的人', '開始領股利的新手投資人', '賺到一點利息卻沒收到表格的人'],
  relatedJourney: ['投資與加密貨幣', '第一次報稅'],
  actionRequired: '所有應稅的利息與股利都要在稅表上申報，即使金額很小、即使沒有收到表格。使用 Form 1099-INT 與 1099-DIV，區分合格股利與一般股利；如果應稅利息或一般股利超過 $1,500，就要附 Schedule B。',
  sources: [
    { label: 'IRS — Topic no. 403，收到的利息（Interest received）', url: 'https://www.irs.gov/taxtopics/tc403' },
    { label: 'IRS — Topic no. 404，股利與其他公司分配（Dividends and other corporate distributions）', url: 'https://www.irs.gov/taxtopics/tc404' },
    { label: 'IRS — Publication 550（2025），投資收入與費用（Investment Income and Expenses）', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Schedule B（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — Form 1099-INT 與 1099-OID 填寫說明', url: 'https://www.irs.gov/instructions/i1099int' },
    { label: 'IRS — Form 1099-DIV 填寫說明', url: 'https://www.irs.gov/instructions/i1099div' },
    { label: 'IRS — Topic no. 559，淨投資收入稅（Net investment income tax）', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: '銀行給我 $6 的利息，沒有寄 1099，要申報嗎？',
    a: '要。利息達到 $10 或以上時，銀行一般會寄 Form 1099-INT，但那是銀行的申報門檻，不是你的。所有應稅利息，即使沒有表格，你都必須申報。',
  },
  {
    q: '為什麼我 1099-DIV 的 Box 1b 比 Box 1a 少？',
    a: 'Box 1a 是你的一般股利總額。Box 1b 是其中屬於合格股利（qualified dividends）的部分，可以適用較低的 0%、15% 或 20% 資本利得稅率。Box 1a 的其餘部分依一般所得稅率課稅。',
  },
  {
    q: '免稅利息（例如市政債券利息）要申報嗎？',
    a: '要，作為資訊申報。免稅利息要在稅表上列出，但申報並不會讓它變成應稅收入。',
  },
  {
    q: '我的股利自動再投資，還要申報嗎？',
    a: '一般要。Publication 550 表示，透過股利再投資計畫（dividend reinvestment plan）用來買更多股份的股利，即使你從來沒有拿到現金，仍然是要申報的股利收入。它們也會計入 Schedule B 的 $1,500 門檻。再投資的金額會成為新股份成本基礎的一部分。',
  },
  {
    q: '我需要附 Schedule B 嗎？',
    a: '如果你的應稅利息或一般股利超過 $1,500，一般就必須附 Schedule B；某些其他情況也需要 — 包括你有海外金融帳戶。',
  },
  {
    q: '我在台灣的銀行帳戶有利息，會不一樣嗎？',
    a: '所得稅的規定相同：美國公民與居民要申報全球的利息。海外帳戶另外可能牽涉 FBAR 與 Form 8938 — 請見「台灣或海外銀行帳戶需要申報嗎？」',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '海外利息，以及 FBAR 與 Form 8938。',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: '賣股票賺錢，資本利得怎麼課稅？',
    desc:  '合格股利也適用的資本利得稅率。',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '利息與股利在第一次報稅時放在哪裡。',
  },
]

export default function InterestAndDividendsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '銀行利息和股利要申報嗎？1099-INT 與 1099-DIV 說明 | AskLinTax 繁體中文',
      description: 'Form 1099-INT 與 1099-DIV 說明：為什麼所有應稅利息都要申報、免稅利息、一般股利與合格股利，以及什麼時候需要 Schedule B。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          要。銀行、定存與類似帳戶的<strong>應稅利息</strong>，以及股票與基金的<strong>股利</strong>，都是要在聯邦稅表上申報的收入 — 即使金額很小、即使從來沒有收到表格。利息一般依一般所得稅率課稅。股利分成<strong>一般股利</strong>（ordinary dividends，一般稅率）與<strong>合格股利</strong>（qualified dividends，較低的資本利得稅率）。不是所有股利的課稅方式都一樣。
        </p>

        <h2>利息與 Form 1099-INT</h2>
        <ul>
          <li>大部分利息在你可以取用的那一年就要課稅。</li>
          <li>利息達到 <strong>$10 或以上</strong>時，付款方一般會寄 <strong>Form 1099-INT</strong>。那是付款方的申報門檻 — 不論有沒有表格，所有應稅利息你都要申報。</li>
          <li><strong>免稅利息</strong>（例如許多市政債券的利息）只作為資訊申報，申報並不會讓它變成應稅收入。</li>
        </ul>

        <h2>股利與 Form 1099-DIV</h2>
        <ArticleTable
          head={['1099-DIV 欄位', '顯示什麼', '一般的課稅方式']}
          rows={[
            ['Box 1a — 一般股利總額', '付給你的所有一般股利', '依一般所得稅率課稅，合格的部分除外'],
            ['Box 1b — 合格股利', 'Box 1a 中符合資格的部分', '依 0%、15% 或 20% 的資本利得稅率課稅'],
          ]}
        />
        <p>
          要成為合格股利，一般你必須在除息日前 60 天開始的 <strong>121 天期間</strong>內，持有股票<strong>超過 60 天</strong>（特別股的測試期間較長）。有些股利無論如何都不符合資格，所以請依 Box 1b，而不是自己假設。各年度的資本利得稅率門檻，請見<a href="/zh-tw/library/investment/stock-sale-capital-gains/">賣股票賺錢，資本利得怎麼課稅？</a>
        </p>

        <p>
          <strong>再投資的股利也要算。</strong>如果你的股利透過股利再投資計畫自動再投資，即使你從來沒有拿到現金，一般仍然是要申報的股利收入。Publication 550 也把再投資的股利計入 Schedule B 的 $1,500 門檻。
        </p>

        <h2>什麼時候需要 Schedule B</h2>
        <p>
          如果你的應稅利息或一般股利<strong>超過 $1,500</strong>，一般就必須附 <strong>Schedule B</strong>。其他情況也需要，例如以名義持有人（nominee）身分收到利息或股利，或在其他國家有金融帳戶（Part III 會問海外帳戶）。
        </p>

        <h2>例子（舉例用）</h2>
        <p>
          Ray 在 2025 年收到一份 1099-INT，列出 $420 的儲蓄利息，以及一份 1099-DIV，Box 1a 為 $900，其中 Box 1b 為 $700。他在另一家銀行還賺了 $8 的利息，但沒有收到表格。Ray 申報 $428 的利息與 $900 的一般股利，其中 $700 的股利依合格股利稅率課稅。因為兩項總額都沒有超過 $1,500，單就這個原因來說不需要附 Schedule B。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 所得稅申報不等於 FBAR 申報</div>
          <p>在稅表上申報利息，和在 FBAR 或 Form 8938 上申報海外帳戶，是兩回事。海外銀行的利息仍然是收入；帳戶本身可能另有申報要求。請見<a href="/zh-tw/library/investment/foreign-bank-account/">台灣或海外銀行帳戶需要申報嗎？</a></p>
        </div>

        <h2>收入較高時</h2>
        <p>
          利息與股利屬於另外 3.8% 淨投資收入稅的投資收入；當修正後調整總收入超過 $200,000（單身或戶長）、$250,000（夫妻合併申報）或 $125,000（夫妻分開申報）時，可能適用。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/fbar-10000-rule.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'fbar-10000-rule',
  sourceHash:      '1d584cf7fee4',
  id:            '41',
  title:         '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
  titleEn:       'Do I need to file an FBAR? How the $10,000 rule really works',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋擁有海外金融帳戶（foreign financial account）的美國人（U.S. person）個人的 FBAR 申報門檻。公司帳戶、信託，以及因工作而有的簽署權，需要另外檢視',
  persona:       ['在台灣、中國或其他國家有不只一個銀行帳戶的人', '新移民與綠卡持有人', '已成為美國稅務居民的學生', '名字在父母帳戶上的成年子女'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '把你所有海外金融帳戶這一個日曆年度的最高餘額加總。只要合計在這一年中任何時候超過 $10,000，就要另外（不附在稅表裡）申報 FBAR（FinCEN Form 114），列出你的海外金融帳戶。申報帳戶本身，不代表帳戶裡的錢要繳稅。',
  sources: [
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'FinCEN — 帳戶最高餘額的申報（Reporting Maximum Account Value）', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'eCFR — 31 CFR 1010.350，海外金融帳戶申報規定', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
  ],
}

const FAQS = [
  {
    q: '我每個帳戶都沒超過 $10,000，還需要報 FBAR 嗎？',
    a: '有可能。看的是合計：只要你所有海外金融帳戶的最高餘額加起來超過 $10,000，就要申報 FBAR，即使沒有任何一個帳戶單獨達到 $10,000。',
  },
  {
    q: '我的合計只有一個星期超過 $10,000，這樣也算嗎？',
    a: '算。只要合計在這個日曆年度中任何時候超過 $10,000，就達到 FBAR 門檻。不是看年底餘額。',
  },
  {
    q: '一旦超過 $10,000，要列出哪些帳戶？',
    a: '列出你應申報的海外金融帳戶 — 不是只報讓總額超過門檻的那一個。FBAR 會要求每個帳戶的資料，包括它這一年的最高餘額。',
  },
  {
    q: '帳戶申報了 FBAR，是不是代表裡面的錢要繳稅？',
    a: '不是。FBAR 是申報，不是稅。帳戶餘額本身不是收入。帳戶產生的收益（例如利息）要另外在所得稅表上申報。',
  },
  {
    q: 'FBAR 要附在 Form 1040 裡嗎？',
    a: '不用。FBAR 是透過 FinCEN 的 BSA E-Filing System 以電子方式申報，不跟聯邦稅表一起交。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    desc:  '確定要申報之後，每個帳戶要報的金額怎麼算。',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '完整的 FBAR 指南：誰要報、哪些算、截止日與申報方式。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  'Form 8938 的門檻不同，而且是跟稅表一起申報。',
  },
  {
    href: '/library/investment/foreign-account-no-interest',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶沒有利息，也要報 FBAR 嗎？',
    desc:  '為什麼 FBAR 看的是帳戶金額，而不是收入。',
  },
]

export default function Fbar10000RuleZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'FBAR $10,000 門檻：每個帳戶分開算還是合計？ | AskLinTax 繁體中文',
      description: 'FBAR 的 $10,000 門檻，是把你所有海外金融帳戶合計、一年中任何時候超過就算 — 不是每個帳戶分開看，也不是看年底餘額。以台灣帳戶舉例說明。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你是<strong>美國人</strong>（U.S. person），對一個或多個<strong>海外金融帳戶</strong>（foreign financial account）有財務利益（financial interest）或簽署權等權限（signature or other authority），而這些帳戶的<strong>合計</strong>金額在這個日曆年度中<strong>任何時候超過 $10,000</strong>，你就要申報 FBAR（FinCEN Form 114）。
        </p>
        <p>
          這句話裡有三個詞最容易讓人誤會：<strong>合計</strong>（所有帳戶加總）、<strong>任何時候</strong>（不是 12 月 31 日的餘額），以及<strong>帳戶</strong>（指金融帳戶 — 不是所有的海外資產）。
        </p>

        <ArticleTable
          head={['常見的想法', '規定實際上怎麼說']}
          rows={[
            ['「每個帳戶都要超過 $10,000 才算」', '不是 — 要把所有海外金融帳戶的最高餘額加總'],
            ['「我只看 12 月 31 日的餘額」', '不是 — 要看合計是否在這一年中任何時候超過 $10,000'],
            ['「我只報金額大的那個帳戶」', '不是 — 一旦需要申報，要在 FBAR 上列出你的海外金融帳戶'],
            ['「申報就代表這筆錢要繳稅」', '不是 — FBAR 是申報；帳戶餘額本身不是收入'],
          ]}
        />

        <h2>FBAR 所說的「美國人」是誰</h2>
        <p>
          美國公民、美國居民，以及美國的實體，在 FBAR 上都是美國人。不是美國公民的個人，是否為居民要依稅法的居民測試（綠卡測試與實質居住測試）判斷。請見<a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>如果你是今年才搬來，請看<a href="/zh-tw/library/investment/new-us-resident-foreign-accounts/">剛搬來美國，原本的台灣／海外帳戶要申報嗎？</a>
        </p>

        <h2>簡單說明財務利益與簽署權</h2>
        <ul>
          <li><strong>財務利益：</strong>一般是指你是帳戶的登記所有人或擁有法定所有權 — 包括你和別人共同持有的帳戶。</li>
          <li><strong>簽署權等權限：</strong>你可以單獨或與他人一起，直接向銀行下指示來處分帳戶裡的錢 — 例如可以指示父母帳戶所在的銀行轉帳。</li>
        </ul>
        <p>
          兩者任一，都可能讓這個帳戶被算進你的 FBAR。因為工作而有的簽署權另有例外規定，不在本文範圍內。
        </p>

        <h2>$10,000 合計門檻怎麼算</h2>
        <p>
          FinCEN 的說明是：如果單一帳戶的最高餘額，或<strong>多個帳戶最高餘額的合計</strong>超過 $10,000，就必須申報 FBAR。
        </p>
        <h3>例子：兩個台灣帳戶</h3>
        <p>美國居民 Mei 在 2025 年有兩個台灣帳戶（已換算成美元）：</p>
        <ArticleTable
          head={['帳戶', '2025 年最高餘額']}
          rows={[
            ['A 銀行活存帳戶', '$6,000'],
            ['B 銀行儲蓄帳戶', '$5,500'],
            ['最高餘額合計', '$11,500'],
          ]}
        />
        <p>
          兩個帳戶都沒有到 $10,000，但最高餘額合計是 <strong>$11,500</strong> — 超過 $10,000。Mei 要申報 2025 年的 FBAR，並把<strong>兩個</strong>帳戶都列出來，各自填上自己的最高餘額。
        </p>
        <p>
          如果兩個帳戶的最高餘額是 $4,000 和 $5,500（合計 $9,500），這兩個帳戶就不需要申報 FBAR。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 最高餘額，換算成美元</div>
          <p>每個帳戶的最高餘額（maximum account value），是這一年中帳戶最高金額的合理估計。外幣要依財政部（Treasury）公布的、該日曆年度最後一天的匯率換算成美元。詳細說明請見<a href="/zh-tw/library/investment/fbar-maximum-account-value/">FBAR 的海外帳戶最高餘額怎麼算？</a></p>
        </div>

        <h2>「海外帳戶」不等於所有海外資產</h2>
        <p>
          FBAR 涵蓋的是海外<strong>金融帳戶</strong> — 例如銀行帳戶（儲蓄、活存、定存）、證券與券商帳戶，以及某些其他金融帳戶，例如有現金價值的保險或年金保單。它不涵蓋你在海外擁有的所有東西。例如，IRS 對兩份表格的比較表指出，直接持有的海外不動產不需要報 FBAR；不放在金融帳戶裡、直接持有的海外股票也不是 FBAR 項目。請見<a href="/zh-tw/library/investment/foreign-property/">海外房產</a>以及<a href="/zh-tw/library/investment/foreign-brokerage-account/">海外股票與證券帳戶怎麼申報？</a>
        </p>

        <h2>申報基本資訊</h2>
        <ul>
          <li>FBAR 透過 FinCEN 的 BSA E-Filing System 以電子方式申報 — <strong>不</strong>附在 Form 1040 裡。</li>
          <li>截止日是次年 4 月 15 日，並自動延期到 10 月 15 日。</li>
          <li>Form 8938 是另一項申報義務，門檻不同。報了其中一個，不代表另一個也完成了。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a></li>
        </ul>

        <h2>申報不等於繳稅</h2>
        <p>
          海外帳戶裡的錢不會因為申報就變成收入。所得稅針對的是帳戶賺到的錢 — 利息、股利、資本利得 — 美國公民或居民要在稅表上申報。請見<a href="/zh-tw/library/investment/foreign-bank-account/">台灣或海外銀行帳戶需要申報嗎？</a>
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 年底做一張簡單的表</div>
          <p>列出每個海外帳戶、以當地貨幣計的最高餘額、財政部年底匯率，以及換算後的最高餘額，再把最後一欄加總。一張表就能回答要不要報 FBAR，也備齊申報要用的數字。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

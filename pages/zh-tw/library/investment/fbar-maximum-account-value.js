import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/fbar-maximum-account-value.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'fbar-maximum-account-value',
  sourceHash:      '13e74e297994',
  id:            '42',
  title:         'FBAR 的海外帳戶最高餘額怎麼算？',
  titleEn:       'What is the maximum value of a foreign account for FBAR?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '說明個人如何決定 FBAR（FinCEN Form 114）上申報的帳戶最高餘額（maximum account value）。Form 8938 有自己的估值規定；無法確定價值的帳戶需要另外檢視',
  persona:       ['已確定需要申報 FBAR 的人', '有好幾個不同幣別海外帳戶的人', '第一次申報 FBAR 的家庭', '核對 FBAR 金額的報稅人員'],
  relatedJourney: ['跨境財務'],
  actionRequired: '每個海外帳戶都要找出這個日曆年度最高金額的合理估計（如果定期對帳單能合理反映最高金額，可以使用對帳單），用財政部公布的年底匯率換算成美元，並無條件進位到整數美元。',
  sources: [
    { label: 'FinCEN — 帳戶最高餘額的申報（Reporting Maximum Account Value）', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: '美國財政部 Bureau of the Fiscal Service — Treasury Reporting Rates of Exchange（財政部申報匯率）', url: 'https://fiscaldata.treasury.gov/datasets/treasury-reporting-rates-exchange/' },
    { label: 'IRS — 海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
  ],
}

const FAQS = [
  {
    q: '可以直接報 12 月 31 日的餘額嗎？',
    a: '只有在那天的餘額真的是全年最高時才可以。最高餘額是這個日曆年度中帳戶最高金額的合理估計 — 通常是在別的日子。',
  },
  {
    q: '我需要逐日檢查餘額嗎？',
    a: '不一定。FinCEN 表示，只要定期對帳單能合理反映這一年的最高帳戶金額，就可以用對帳單來決定最高餘額。如果有一大筆錢在兩次對帳單之間進來又出去，對帳單可能就無法合理反映。',
  },
  {
    q: '要用哪個匯率？',
    a: '用財政部公布的、該日曆年度最後一天的申報匯率（Treasury Reporting Rates of Exchange）把外幣換算成美元。如果沒有財政部匯率，可以使用其他可查證的匯率，並註明來源。',
  },
  {
    q: '我的帳戶透支，金額是負的，要填什麼？',
    a: 'FinCEN 的申報說明表示，如果帳戶價值是負數，最高餘額填 0。',
  },
  {
    q: '最高餘額和 $10,000 門檻是同一件事嗎？',
    a: '有關聯，但不一樣。你先把所有海外帳戶的最高餘額加總，看是否超過 $10,000。如果超過，就在 FBAR 上填每個帳戶各自的最高餘額。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '如果還不確定要不要申報，先從這裡開始。',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR：我需要申報海外銀行帳戶嗎？',
    desc:  '誰要報、哪些算、截止日，以及如何透過 BSA E-Filing 申報。',
  },
  {
    href: '/library/investment/foreign-time-deposit-cd',
    cat:  'Investments & Foreign Accounts',
    title: '台灣／海外定存要報 FBAR 或 Form 8938 嗎？',
    desc:  '到期後自動續存的定存，是常見的最高餘額難題。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  'Form 8938 也要申報最高價值，但依它自己的規定。',
  },
]

export default function FbarMaximumAccountValueZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'FBAR 帳戶最高餘額怎麼算 | AskLinTax 繁體中文',
      description: 'FBAR 上每個海外帳戶的最高餘額怎麼算：一年中的最高金額、使用對帳單、財政部年底匯率、進位方式，以及實際例子。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          FBAR 上每個海外帳戶的<strong>最高餘額</strong>（maximum account value），是這個日曆年度中，帳戶裡現金或其他資產<strong>最高金額</strong>的合理估計 — 不只是年底餘額。你要用<strong>財政部公布的、該日曆年度最後一天的匯率</strong>換算成美元，並以整數美元填寫、無條件進位。
        </p>
        <p>
          本文假設你已經確定需要申報 FBAR。如果還在判斷，請先看<a href="/zh-tw/library/investment/fbar-10000-rule/">海外帳戶超過 $10,000 就要報 FBAR 嗎？</a>
        </p>

        <h2>一步步來</h2>
        <ol>
          <li><strong>先找出帳戶本身幣別的最高金額。</strong>如果定期對帳單（例如月對帳單）能合理反映這一年的最高金額，就可以使用。</li>
          <li><strong>換算成美元：</strong>使用財政部該日曆年度最後一天的申報匯率 — 2025 年就是 2025 年 12 月 31 日的匯率。如果財政部沒有該幣別的匯率，使用其他可查證的匯率，並註明來源。</li>
          <li><strong>無條件進位</strong>到整數美元。FinCEN 的例子：$15,265.25 填 $15,266。</li>
          <li><strong>如果金額是負數</strong>，填 0。</li>
        </ol>

        <h2>為什麼 12 月 31 日的餘額常常不對</h2>
        <p>
          很多人只看年底對帳單。但如果你在年中把錢轉出去 — 例如 6 月把存款匯到美國，到 12 月帳戶幾乎是空的 — 最高餘額是 6 月的高點，不是 12 月的餘額。
        </p>

        <h2>當對帳單無法完整反映時</h2>
        <p>
          只有在定期對帳單能合理反映最高金額時，才可以依賴對帳單。有些情況可能無法反映，例如一大筆存款在兩次對帳單之間進來又轉走。對帳單無法合理反映最高金額時，要求仍然是：這一年帳戶最高金額的合理估計。FinCEN 的指引沒有規定特定的做法。實務上（這不是官方規定），請保留你依據的紀錄。
        </p>

        <h2>例子：好幾個帳戶，高點在不同日期</h2>
        <p>
          美國居民 Kai 在 2025 年有三個台灣帳戶，每個帳戶的最高餘額出現在不同日期。以舉例用的年底匯率新台幣 1 元 = 0.031 美元（不是實際公布的匯率）計算：
        </p>
        <ArticleTable
          head={['帳戶', '最高餘額（新台幣）', '高點日期', '最高餘額（美元，進位後）']}
          rows={[
            ['A 銀行活存', 'NT$180,000', '2025 年 3 月', '$5,580'],
            ['B 銀行儲蓄', 'NT$210,000', '2025 年 8 月', '$6,510'],
            ['B 銀行定存', 'NT$300,000', '全年', '$9,300'],
            ['最高餘額合計', '', '', '$21,390'],
          ]}
        />
        <p>
          這張表回答了兩個不同的問題：
        </p>
        <ul>
          <li><strong>是否達到申報門檻：</strong>最高餘額合計（$21,390）超過 $10,000，所以要申報 FBAR — 即使三個高點發生在不同時間，這些帳戶從來沒有在同一天總共有 $21,390。</li>
          <li><strong>Kai 要填什麼：</strong>每個帳戶各自的最高餘額（$5,580、$6,510 與 $9,300），不是合計數字。</li>
        </ul>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 全年用同一個匯率</div>
          <p>FBAR 的換算用的是該日曆年度最後一天的匯率，即使帳戶的高點出現在 3 月。同一種貨幣的每個帳戶，都使用同一份財政部匯率表。</p>
        </div>

        <h2>要保留的紀錄</h2>
        <p>
          每個申報的帳戶，都要保留帳戶名稱、帳號、海外銀行的名稱與地址、帳戶類型，以及這一年的最高餘額 — 一般要從 FBAR 截止日起保留五年。實務上，也請保留你使用的對帳單或其他紀錄，並註明匯率來源。
        </p>

        <h2>Form 8938 是分開估值的</h2>
        <p>
          Form 8938 也會問最高價值，但它有自己的門檻與填寫說明。不要假設你的 FBAR 數字就能自動回答 Form 8938 的問題。請見<a href="/zh-tw/library/investment/fbar-vs-form-8938/">FBAR 與 Form 8938 有什麼不同？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

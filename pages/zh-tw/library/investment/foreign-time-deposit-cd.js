import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-time-deposit-cd.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-time-deposit-cd',
  sourceHash:      '275ae68f2a61',
  id:            '45',
  title:         '台灣／海外定存要報 FBAR 或 Form 8938 嗎？',
  titleEn:       'Foreign CDs and time deposits: do they go on FBAR or Form 8938?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋個人在海外銀行的定存（time deposit）與存單（CD）。結構型存款、透過外國公司持有的存款，以及美國銀行海外分行的帳戶，需要另外檢視',
  persona:       ['在台灣有定存的人', '在香港或中國有定期存款的家庭', '把存款放在海外定存的新移民', '有海外存款的退休人士'],
  relatedJourney: ['跨境財務'],
  actionRequired: '把海外定存或 CD 當作海外金融帳戶：把它的最高餘額算進 FBAR 的合計門檻，另外檢查 Form 8938 的門檻，並在稅表上申報它賺到的利息。',
  sources: [
    { label: 'eCFR — 31 CFR 1010.350，海外金融帳戶申報規定（銀行帳戶的定義）', url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350' },
    { label: 'IRS — Internal Revenue Manual 4.26.16，海外銀行與金融帳戶申報（FBAR）', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'FinCEN — 帳戶最高餘額的申報（Reporting Maximum Account Value）', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
    { label: 'IRS — Form 8938 與 FBAR 申報規定比較', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — 居民外國人（Resident aliens：全球所得）', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
  ],
}

const FAQS = [
  {
    q: '台灣的定存，在 FBAR 上算「海外金融帳戶」嗎？',
    a: '算。在海外銀行的定存，在 FBAR 上就是銀行帳戶。本指南查閱的官方資料，沒有針對 CD 或定存的特別例外。',
  },
  {
    q: '我的定存和同一家銀行的活存帳戶連在一起，算一個帳戶還是兩個？',
    a: '本指南查閱的官方資料，沒有特別說明和其他帳戶連結的定存。各家銀行設定定存的方式不同，連結的定存是否算作獨立帳戶，可能取決於海外銀行在法律上與實際作業上如何維護它。定存沒有特別的豁免，所以不能直接把它略過。請保留能說明設定方式的銀行對帳單；如果處理方式不清楚，請找人檢視。',
  },
  {
    q: '我的定存一年內續存了三次，要用哪個金額？',
    a: '用這個日曆年度中的最高餘額 — 帳戶在任何時候最高金額的合理估計。這可能出現在續存、利息滾入本金之後。用該年度最後一天的財政部匯率換算。',
  },
  {
    q: '海外定存的利息要繳稅嗎？',
    a: '對美國公民或居民來說，要 — 海外存款賺到的利息是要申報的收入。請換算成美元在稅表上申報。如果海外有扣繳合格的稅款，可能可以申請外國稅額抵免。',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 的海外帳戶最高餘額怎麼算？',
    desc:  '一年內續存的定存，最高餘額怎麼算。',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？',
    desc:  '把定存和你其他所有海外帳戶加在一起。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '一般海外帳戶的利息、FBAR 與 Form 8938。',
  },
]

export default function ForeignTimeDepositCdZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '台灣／海外定存要報 FBAR 或 Form 8938 嗎？ | AskLinTax 繁體中文',
      description: '海外銀行的定存或 CD 就是海外金融帳戶。台灣定存、定期存款如何計入 FBAR 的 $10,000 門檻、Form 8938、最高餘額，以及利息收入。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          在海外銀行的定存（time deposit）或存單（CD）— 也就是很多人說的<strong>定存</strong>、定期存款 — 是<strong>海外金融帳戶</strong>（foreign financial account）。它和其他海外銀行帳戶一樣，要算進 FBAR 的 $10,000 合計門檻，也可能是 Form 8938 上的 specified foreign financial asset。本指南查閱的官方資料，沒有任何「定存豁免」。
        </p>
        <p>
          它賺到的利息是另一回事：那是要在稅表上申報的收入。
        </p>

        <h2>為什麼定存算是「帳戶」</h2>
        <p>
          FBAR 的法規對銀行帳戶的定義很廣：儲蓄存款、活期存款、支票帳戶，或在從事銀行業務者處開立的任何其他帳戶。IRS 指引把定存（CD）列為應申報的銀行帳戶之一。IRS 對兩份表格的比較，把在海外金融機構的金融帳戶（存款與保管帳戶）列為 FBAR 和 Form 8938 都要申報，各依自己的門檻。
        </p>

        <ArticleTable
          head={['問題', 'FBAR', 'Form 8938']}
          rows={[
            ['海外定存在範圍內嗎？', '在 — 屬於銀行帳戶', '在 — 屬於海外金融機構的存款帳戶'],
            ['門檻', '所有海外帳戶合計在任何時候超過 $10,000', '你的 Form 8938 門檻（高很多；依報稅身分與居住地而定）'],
            ['申報的金額', '日曆年度中的最高餘額', '稅務年度中的最高價值（依 Form 8938 規定）'],
            ['在哪裡申報', '透過 BSA E-Filing 向 FinCEN 申報', '附在你的所得稅表裡'],
          ]}
        />

        <h2>定存的估值</h2>
        <p>
          使用帳戶這一年的<strong>最高餘額</strong> — 任何時候最高金額的合理估計。對於會續存的定存，最高金額可能出現在續存、利息滾入本金之後。用該日曆年度最後一天的財政部匯率換算成美元。請見<a href="/zh-tw/library/investment/fbar-maximum-account-value/">FBAR 的海外帳戶最高餘額怎麼算？</a>
        </p>

        <h2>例子</h2>
        <p>
          美國居民 Grace 在台灣有一個最高餘額 $4,000 的儲蓄帳戶，還有一筆一年期定存，最高時值 $8,200（都已用年底財政部匯率換算）。兩個帳戶都沒有到 $10,000，但合計 <strong>$12,200</strong>，所以她要申報 FBAR，兩個帳戶都要列出。她的海外資產遠低於 Form 8938 門檻。另外，她要把定存的利息換算成美元，在稅表上申報。
        </p>

        <h2>利息是收入</h2>
        <p>
          美國公民與居民要就全球所得繳稅，所以定存利息是要申報的收入。如果海外銀行有扣稅，你可能可以就合格的外國所得稅申請外國稅額抵免。請見<a href="/zh-tw/library/investment/foreign-bank-account/">台灣或海外銀行帳戶需要申報嗎？</a>
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 保留定存單</div>
          <p>定存單、續存通知與利息明細會顯示本金、續存日期與利息 — 正是你計算最高餘額和申報利息所需要的資料。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

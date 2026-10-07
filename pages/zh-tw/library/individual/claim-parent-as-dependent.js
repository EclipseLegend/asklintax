import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/claim-parent-as-dependent.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'claim-parent-as-dependent',
  sourceHash:      '9f0176cfa4e4',
  id:            '59',
  title:         '父母住在海外，可以申報為受扶養人嗎？',
  titleEn:       'Can I claim my parents as dependents if they live abroad?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國納稅人能否把父母申報為合格親屬（qualifying relative），重點在住在美國境外的父母。總收入金額是 2025 稅務年度的數字。戶長（head of household）身分與受扶養人相關的抵稅額另有規定，本文不做判斷',
  persona:       ['匯錢給台灣或中國父母的成年子女', '父母一年中有部分時間和自己住在美國的人', '和兄弟姊妹分攤扶養父母費用的人', '扶養海外家人的移民'],
  relatedJourney: ['有受扶養人的報稅', '跨境財務'],
  actionRequired: '先看公民或居民測試。如果父母不是美國公民、美國居民外國人或美國國民 — 也不是加拿大或墨西哥的居民 — 一般就不能申報，不論你提供多少扶養費。只有通過這項測試，扶養、收入等合格親屬測試才有意義。',
  sources: [
    { label: 'IRS — Publication 501（2025），受扶養人、標準扣除額與申報資訊（Dependents, Standard Deduction, and Filing Information）', url: 'https://www.irs.gov/publications/p501' },
  ],
}

const FAQS = [
  {
    q: '我負擔台灣父母一半以上的生活費，可以申報他們嗎？',
    a: '光憑這點不行。扶養只是其中一項測試。受扶養人一般必須是美國公民、美國居民外國人、美國國民，或加拿大、墨西哥的居民。住在台灣、不屬於以上任何一種身分的父母，一般不符合這項測試，不論你匯了多少錢。',
  },
  {
    q: '父母一定要和我住在一起嗎？',
    a: '不用。父母符合關係測試，所以即使沒有住在你家，也可以是合格親屬。但其他每一項測試 — 包括公民或居民測試 — 仍然都要符合。',
  },
  {
    q: '我的父母是持有美國綠卡、和我同住的人，還需要符合什麼？',
    a: '如果父母符合公民或居民測試，仍要適用合格親屬的各項測試。依 Publication 501，2025 稅務年度這個人的總收入一般必須少於 $5,200，而且你一般必須提供他這一年總扶養費的一半以上。其他受扶養人測試也同樣適用。',
  },
  {
    q: '我和兄弟姊妹一起分攤扶養媽媽的費用，誰可以申報她？',
    a: '如果沒有任何一個人提供她一半以上的扶養費，但你們合起來有，在符合 Publication 501 條件的情況下，多人扶養協議（multiple support agreement）可能讓其中一人申報她。',
  },
  {
    q: '如果我可以申報父母，就自動符合戶長身分或可以拿到抵稅額嗎？',
    a: '不會。戶長身分有自己的測試，每一項與受扶養人相關的抵稅額也有各自的資格規定。可以把某人申報為受扶養人，本身並不保證兩者之一。',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '子女的規定 — 是另一套測試。',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '報稅身分與受扶養人都會影響你的稅表。',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '你和海外父母之間的金錢往來，另有規定。',
  },
]

export default function ClaimParentAsDependentZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '父母住在海外，可以申報為受扶養人嗎？ | AskLinTax 繁體中文',
      description: '扶養住在台灣、中國或其他國家的父母？為什麼公民或居民測試通常決定答案，以及符合這項測試時要看的合格親屬測試 — 扶養、總收入等。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你的父母住在海外，而且不是美國公民、美國居民外國人或美國國民，通常<strong>不行</strong>。父母<em>可以</em>是合格親屬（qualifying relative）— 而且不會因為是父母，就一定要和你同住 — 但另外還有一項<strong>公民或居民測試</strong>（citizen or resident test）。扶養住在台灣、中國或其他國家的父母，<strong>本身並不會</strong>讓他們成為你在美國的受扶養人。
        </p>

        <h2>測試一：先看公民或居民測試</h2>
        <p>
          依 Publication 501，除非這個人是以下身分之一，否則你一般不能把他申報為受扶養人：
        </p>
        <ul>
          <li>美國公民，</li>
          <li>美國居民外國人（resident alien），</li>
          <li>美國國民（U.S. national），或</li>
          <li>加拿大或墨西哥的居民，</li>
        </ul>
        <p>
          並依 Publication 501 中的 IRS 規定與例外。住在台灣、不是美國公民、美國居民外國人或美國國民的父母，一般不符合這項測試 — 即使你負擔了他們全部的生活費。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 光有扶養，不會讓人成為受扶養人</div>
          <p>「我負擔父母一半以上的生活費，所以可以申報他們」是很常見的誤解。扶養只是好幾項測試中的一項；如果不符合公民或居民測試，扶養多少都沒有用。</p>
        </div>

        <h2>測試二：符合之後，再看合格親屬測試</h2>
        <ArticleTable
          head={['測試', '就父母而言（2025 稅務年度，依 Publication 501）']}
          rows={[
            ['關係', '父母符合 — 不需要和你同住'],
            ['不是合格子女', '父母不能是你（或其他任何人）的合格子女（qualifying child）'],
            ['總收入', '2025 年一般必須少於 $5,200'],
            ['扶養', '你一般必須提供他這一年總扶養費的一半以上'],
            ['合併申報', '一般來說，這個人不能申報合併稅表，有少數例外'],
          ]}
        />
        <p>
          Publication 501 中其他一般的受扶養人規定也同樣適用。
        </p>

        <h2>好幾個人一起分攤扶養費時</h2>
        <p>
          如果沒有任何一個人提供父母一半以上的扶養費，但一群人 — 例如兄弟姊妹 — 合起來有，在符合 Publication 501 條件的情況下，<strong>多人扶養協議</strong>（multiple support agreement）可能讓其中一人申報這位父母。
        </p>

        <h2>三個不同的問題</h2>
        <ArticleTable
          head={['問題', '為什麼要分開看']}
          rows={[
            ['我可以把父母申報為受扶養人嗎？', '由上面的受扶養人測試決定'],
            ['我符合戶長（head of household）身分嗎？', '戶長有自己的測試；有受扶養的父母不代表自動符合'],
            ['我可以拿到抵稅額嗎？', '每一項與受扶養人相關的抵稅額都有自己的資格規定；符合受扶養人本身不保證可以拿到'],
          ]}
        />

        <h2>例子</h2>
        <p>
          <strong>父母在海外。</strong>Jie 每個月匯錢給住在台北的媽媽，負擔了她大部分的生活費。他的媽媽是台灣公民，從來沒有在美國住過。她不是美國公民、居民外國人或國民，也不是加拿大或墨西哥的居民，所以一般不符合公民或居民測試 — 不論 Jie 提供多少扶養費，他一般都不能申報她。
        </p>
        <p>
          <strong>父母是美國居民。</strong>Lan 的爸爸持有綠卡、住在美國，收入很少。因為他可以符合公民或居民測試，Lan 接著檢查 2025 年的合格親屬測試 — 包括他的總收入是否少於 $5,200，以及她是否提供了他一半以上的扶養費。
        </p>

        <p>
          匯錢給海外家人，和受扶養人是不同的主題。跨國家人之間的贈與，請見<a href="/zh-tw/library/investment/foreign-gifts/">海外贈與：父母從海外匯來的錢要繳稅嗎？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

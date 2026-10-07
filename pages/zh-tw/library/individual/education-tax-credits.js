import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/education-tax-credits.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'education-tax-credits',
  sourceHash:      'f8dbf702a57a',
  id:            '60',
  title:         '教育抵稅額：AOTC 與 Lifetime Learning Credit 怎麼選？',
  titleEn:       'Education tax credits: AOTC vs. Lifetime Learning Credit',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '比較 2025 稅務年度的美國機會抵稅額（American Opportunity Tax Credit）與終身學習抵稅額（Lifetime Learning Credit）。學生貸款利息、529 計畫、Coverdell ESA 與獎學金的課稅不在本文範圍內；完整的資格規定請看 Publication 970',
  persona:       ['大學生與他們的父母', '研究生', '為了提升工作技能而上課的成年人', '要支付不只一位學生費用的家庭'],
  relatedJourney: ['支付大學學費', '金錢與福利'],
  actionRequired: '先確認每位學生適合哪一種抵稅額：AOTC 適用於攻讀學位或認可證書、至少半時就讀的大學前四年；終身學習抵稅額適用於其他課程，包括提升工作技能的課程。接著再確認 2025 年的收入限制。',
  sources: [
    { label: 'IRS — 教育抵稅額：AOTC 與 LLC（Education credits: AOTC and LLC）', url: 'https://www.irs.gov/credits-deductions/individuals/education-credits-aotc-and-llc' },
    { label: 'IRS — 教育抵稅額：問與答（Education credits: Questions and answers）', url: 'https://www.irs.gov/credits-deductions/individuals/education-credits-questions-and-answers' },
    { label: 'IRS — 美國機會抵稅額（American Opportunity Tax Credit）', url: 'https://www.irs.gov/credits-deductions/individuals/aotc' },
    { label: 'IRS — 終身學習抵稅額（Lifetime Learning Credit）', url: 'https://www.irs.gov/credits-deductions/individuals/llc' },
    { label: 'IRS — Publication 970（2025），教育的稅務優惠（Tax Benefits for Education）', url: 'https://www.irs.gov/publications/p970' },
    { label: 'IRS — Form 8863 填寫說明（2025）（Instructions for Form 8863）', url: 'https://www.irs.gov/instructions/i8863' },
  ],
}

const FAQS = [
  {
    q: '哪一種抵稅額比較多？',
    a: '美國機會抵稅額（AOTC）每位合格學生最多 $2,500，其中一部分可能可以退還（refundable）。終身學習抵稅額每份稅表最多 $2,000，而且不能退還。你能用哪一種，取決於學生與課程。',
  },
  {
    q: '我已經大學第五年了，還可以用 AOTC 嗎？',
    a: 'AOTC 一般只限大學（postsecondary）教育的前四年。如果你已經不符合，終身學習抵稅額沒有四年的限制，可能可以改用。',
  },
  {
    q: '我只上一門課來提升工作技能，有符合任何抵稅額嗎？',
    a: '可能符合終身學習抵稅額。它可以適用於一門或多門課程，包括為了取得或提升工作技能的課程，而且不需要攻讀學位。',
  },
  {
    q: '教科書算嗎？',
    a: '就 AOTC 來說，課程需要的教材，例如書籍、用品與設備，即使不是向學校購買，也可能符合。就終身學習抵稅額來說，一般只有在必須直接付給學校、作為入學或上課條件時，才算符合。',
  },
  {
    q: '有收入限制嗎？',
    a: '有。2025 稅務年度，單身、戶長或合格未亡配偶的修正後調整總收入（MAGI）在 $80,000 到 $90,000 之間，或夫妻合併申報在 $160,000 到 $180,000 之間時，兩種抵稅額都會逐步減少；MAGI 達到 $90,000（合併申報為 $180,000）或以上時就不能使用。在減少範圍內抵稅額會被調降，所以低於上限不代表可以拿到全額。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '「可退還」和「不可退還」實際上是什麼意思。',
  },
  {
    href: '/library/investment/foreign-gift-tuition-paid-directly',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母直接付我的學費，要報 Form 3520 嗎？',
    desc:  '海外父母支付學費時，贈與規定是另一回事。',
  },
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '另一項有自己規定的家庭抵稅額。',
  },
]

export default function EducationTaxCreditsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '教育抵稅額：AOTC 與 Lifetime Learning Credit 比較 | AskLinTax 繁體中文',
      description: '比較美國機會抵稅額與終身學習抵稅額：各自可以抵多少、誰符合資格、哪些費用算、能不能退還，以及 2025 年的收入限制。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          聯邦主要有兩種教育抵稅額。<strong>美國機會抵稅額（American Opportunity Tax Credit，AOTC）</strong>適用於攻讀學位或認可證書的大學或其他高等教育前四年 — 每位合格學生最多 <strong>$2,500</strong>，部分可退還。<strong>終身學習抵稅額（Lifetime Learning Credit）</strong>的範圍比較廣 — 沒有年數限制，單一課程與工作技能課程都可以 — 但金額較小：每份稅表最多 <strong>$2,000</strong>，而且不能退還。
        </p>

        <h2>兩者比較</h2>
        <ArticleTable
          head={['', '美國機會抵稅額（AOTC）', '終身學習抵稅額']}
          rows={[
            ['最高抵稅額', '每位合格學生最多 $2,500', '每份稅表最多 $2,000'],
            ['怎麼計算', '合格費用前 $2,000 的 100%，加上接下來 $2,000 的 25%', '最多 $10,000 合格費用的 20%'],
            ['可以退還嗎？', '最多 40%（最多 $1,000）可能可以退還，依資格規定而定', '不行 — 不可退還'],
            ['可用年數', '一般只限高等教育的前四年，而且每位合格學生最多四個稅務年度', '沒有四年的限制'],
            ['課程', '一般必須攻讀學位或其他認可的證書', '一門或多門課程；可以包括取得或提升工作技能的課程'],
            ['就讀狀態', '一般至少一個學期至少半時就讀', '一門或多門課程'],
            ['書籍、用品、設備', '課程需要的教材，即使不是向學校購買也可能符合', '一般只有在必須直接付給學校、作為入學或上課條件時才符合'],
          ]}
        />

        <h2>2025 年的收入限制</h2>
        <p>
          2025 稅務年度，兩種抵稅額都會依你的<strong>修正後調整總收入（MAGI）</strong>逐步減少：
        </p>
        <ArticleTable
          head={['報稅身分', 'MAGI 在此範圍時抵稅額減少', 'MAGI 在此金額以上時不能使用']}
          rows={[
            ['單身、戶長或合格未亡配偶', '$80,000 – $90,000', '$90,000 或以上'],
            ['夫妻合併申報', '$160,000 – $180,000', '$180,000 或以上'],
          ]}
        />
        <p>
          在減少範圍內抵稅額會被調降，所以低於上限本身不代表可以拿到全額。Form 8863 填寫說明有計算方式。
        </p>

        <h2>兩種抵稅額都適用的規定</h2>
        <ul>
          <li><strong>每位學生每年只能用一種。</strong>同一位學生在同一個稅務年度，不能同時申請 AOTC 和終身學習抵稅額。</li>
          <li><strong>不能重複享受。</strong>同一筆費用不能用於一項以上的稅務優惠。</li>
          <li><strong>免稅的獎學金與助學金</strong>可能會減少你能計算的合格費用。</li>
          <li><strong>一般不符合的費用</strong>包括食宿、交通、保險，以及一般個人生活費用。</li>
          <li><strong>夫妻分開申報（married filing separately）</strong>一般不能申請這些教育抵稅額。</li>
          <li><strong>如果有人把你申報為受扶養人</strong>，你就不能在自己的稅表上申請教育抵稅額。</li>
        </ul>

        <h2>例子（舉例用）</h2>
        <p>
          <strong>AOTC。</strong>Rina 是大學二年級、全時就讀學位課程的學生。她的家人在 2025 年支付了 $4,000 的合格費用。如果所有條件都符合，而且收入低於減少範圍，AOTC 就是前 $2,000 的 100% 加上接下來 $2,000 的 25% — 共 $2,500 — 其中最多 $1,000 可能可以退還。
        </p>
        <p>
          <strong>終身學習抵稅額。</strong>Ken 全職工作，晚上修兩門提升工作技能的課，支付了 $5,000 的合格費用。他不是在攻讀學位，所以不適合 AOTC，但如果他符合條件與收入限制，可能可以用終身學習抵稅額：$5,000 的 20% 是 $1,000，不可退還。
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 是抵稅額，不是扣除額</div>
          <p>兩者都是抵稅額，會直接減少你的稅。「可退還」的意思是，即使 AOTC 的部分金額超過你的稅額，也可能退給你。請見<a href="/zh-tw/library/individual/tax-credit-vs-deduction/">抵稅額與扣除額有什麼不同？</a></p>
        </div>

        <h2>如何申請</h2>
        <p>
          這兩種抵稅額都用 <strong>Form 8863</strong>（Education Credits）申請，隨稅表一起申報。學校開立的學費明細 <strong>Form 1098-T</strong>，一般與申請相關，而且是申請所必需，但有 IRS 規定的例外。Publication 970 說明了完整的資格規定。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

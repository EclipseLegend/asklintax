import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/inherited-ira-rules.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'inherited-ira-rules',
  sourceHash:      '43f8f53a10dc',
  id:            '125',
  title:         '繼承的 IRA：10 年規則與受益人提領',
  titleEn:       'Inherited IRAs: The 10-Year Rule and Beneficiary Distributions',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 590-B（2025） — 目前可取得的最新正式 IRS 出版品 — 說明所有人於 2019 年後過世時，傳統 IRA 與 Roth IRA 受益人的提領規定。本文無法直接查閱相關的正式法規。本文不詳細說明以信託為受益人、雇主退休計畫條款、州稅或外國受益人的預扣',
  persona:       ['繼承父母 IRA 的成年子女', '在世配偶', '繼承 Roth IRA 的受益人', '正在處理遺產的家庭'],
  relatedJourney: ['金錢與福利', '準備報稅'],
  actionRequired: '先弄清楚三件事：你是不是合格指定受益人、所有人是在必須開始提領日之前還是之後過世，以及帳戶是傳統還是 Roth。這些答案決定你是否必須每年提領，以及帳戶何時必須提領完畢。漏領必要的提領金額，可能要繳 25% 的消費稅（excise tax）。',
  sources: [
    { label: 'IRS — Publication 590-B（2025），個人退休帳戶（IRA）的提領', url: 'https://www.irs.gov/pub/irs-pdf/p590b.pdf' },
    { label: 'IRS — Form 5329 說明（合格計畫與 IRA 的額外稅）', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
  ],
}

const FAQS = [
  {
    q: '什麼是 10 年規則？',
    a: '對大多數在 2019 年後過世的所有人的受益人來說，繼承的 IRA 必須在所有人過世滿 10 週年那一年的 12 月 31 日前全部提領完畢。如果所有人在 2025 年過世，期限是 2035 年 12 月 31 日。',
  },
  {
    q: '這 10 年內每年都要提領嗎？',
    a: '依所有人過世的時間而定。如果所有人在必須開始提領日之前過世，而且適用 10 年規則，Publication 590-B 說第 10 年之前的任何一年都不需要提領。如果所有人在必須開始提領日當天或之後過世，過世那一年之後的年度要提領最低應提領金額（RMD），而且帳戶仍必須在第 10 年年底前提領完畢。',
  },
  {
    q: '誰是合格指定受益人？',
    a: '所有人的在世配偶、所有人的未成年子女、身心障礙者、慢性病患者，或年齡比所有人小不超過 10 歲的任何其他個人。這些受益人通常可以按預期壽命提領，而不適用 10 年規則。',
  },
  {
    q: '繼承的 IRA 會有 10% 提早提領稅的問題嗎？',
    a: '不會。因所有人過世而支付給受益人的提領，不適用 10% 額外稅。但繼承的傳統 IRA 提領通常仍是應稅所得，不可扣除存款所形成的成本基礎部分除外。',
  },
  {
    q: '繼承的 Roth IRA 提領要課稅嗎？',
    a: '通常不用。就必要提領而言，Roth IRA 所有人被視為在必須開始提領日之前過世，所以在 10 年規則下，第 10 年之前不需要每年提領。合格提領免稅；如果 Roth 的 5 年期間還沒滿，提領中的收益部分可能要課稅。',
  },
  {
    q: '如果漏領了必要的提領金額怎麼辦？',
    a: '你可能要就未提領的金額繳 25% 的消費稅，在 Form 5329 上申報。如果你在更正期間內把漏領的金額提領出來，並申報反映這項稅的稅表，稅率會降為 10%。你也可以以合理原因請 IRS 免除這項稅。',
  },
]

const RELATED = [
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '帳戶所有人的 RMD 與提領規定。',
  },
  {
    href: '/library/individual/estate-tax-inheritance-basics',
    cat:  'Individuals & Families',
    title: '遺產稅與繼承基本概念：2025 與 2026 年免稅額、Form 706 與非居民',
    desc:  '遺產稅和 IRA 的所得稅是分開的。',
  },
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: '傳統 IRA 與 Roth IRA 存款：2025 與 2026 年上限與收入規定',
    desc:  '傳統 IRA 與 Roth IRA 有什麼不同。',
  },
  {
    href: '/library/investment/foreign-pension-retirement-accounts',
    cat:  'Investments & Foreign Accounts',
    title: '海外退休金與退休帳戶：美國納稅人要申報什麼',
    desc:  '如果繼承的帳戶在美國境外。',
  },
]

export default function InheritedIraRulesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '繼承的 IRA：10 年規則與受益人提領 | AskLinTax 繁體中文',
      description: '繼承傳統 IRA 或 Roth IRA 的規定：合格指定受益人、10 年規則、什麼時候需要每年提領 RMD、在世配偶的選項、未成年子女、5 年規則、課稅，以及漏領的 25% 消費稅。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你繼承了在 2019 年後過世者的 IRA，通常必須在<strong>過世後第 10 年的 12 月 31 日前</strong>全部提領完畢 — 除非你是<strong>合格指定受益人（eligible designated beneficiary）</strong>，例如在世配偶。這 10 年內是否也需要<strong>每年提領</strong>，取決於所有人是在<strong>必須開始提領日（required beginning date）</strong>之前還是之後過世。這些提領不適用 10% 提早提領稅，但傳統 IRA 的提領通常要課稅。
        </p>

        <h2>適用哪一種規定</h2>
        <ArticleTable
          head={['受益人', '主要規定', '說明']}
          rows={[
            ['在世配偶', '按預期壽命提領，或把 IRA 視為自己的，或轉存（roll over）', '只有身為唯一受益人的配偶，才能把 IRA 視為自己的'],
            ['其他合格指定受益人（所有人的未成年子女、身心障礙者、慢性病患者，或年齡小不超過 10 歲者）', '通常按預期壽命提領；如果所有人在必須開始提領日之前過世，可以選擇 10 年規則', '未成年子女在成年時改適用 10 年規則'],
            ['其他個人（例如成年子女或孫子女）', '10 年規則', '可能也需要每年提領 — 見下方'],
            ['非個人（例如遺產）', '所有人在必須開始提領日之前過世：5 年規則。當天或之後：按所有人剩餘的預期壽命提領', '某些信託有特別規定'],
          ]}
        />

        <h2>必須開始提領日很重要</h2>
        <ul>
          <li><strong>必須開始提領日：</strong>對於在 2022 年 12 月 31 日之後滿 72 歲的所有人，是滿 73 歲那一年的次年 4 月 1 日（較早出生的人適用較早的年齡）。</li>
          <li><strong>所有人在該日期前過世，且適用 10 年規則：</strong>第 10 年之前的任何一年都不需要提領；帳戶必須在第 10 年年底前全部提領完畢。</li>
          <li><strong>所有人在該日期當天或之後過世：</strong>對指定受益人而言，過世那一年之後各年度的最低應提領金額，依受益人的單一預期壽命或所有人剩餘預期壽命（取較長者）計算 — 而不是合格指定受益人的受益人，仍必須在 10 年內提領完畢。</li>
        </ul>

        <h2>在世配偶</h2>
        <ul>
          <li><strong>把它視為自己的</strong>（限唯一受益人），或<strong>轉存</strong>到自己的 IRA — 之後適用你自己的 RMD 規定。</li>
          <li><strong>維持受益人身分</strong> — 按預期壽命提領，或在可以時適用 10 年規則。</li>
          <li>身為唯一受益人的配偶，如果對該 IRA 存款，或沒有領取身為受益人的必要提領金額，會被視為選擇把 IRA 視為自己的。</li>
        </ul>

        <h2>繼承的 Roth IRA</h2>
        <ul>
          <li>就必要提領而言，Roth 所有人被視為在必須開始提領日之前過世。</li>
          <li>在 10 年規則下，第 10 年之前不需要每年提領，但帳戶必須在第 10 年年底前提領完畢。</li>
          <li>合格提領免稅。如果 5 年期間還沒滿，提領中的收益部分可能要課稅，但不適用 10% 額外稅。</li>
        </ul>

        <h2>稅與罰款</h2>
        <ArticleTable
          head={['項目', '規定']}
          rows={[
            ['所得稅', '傳統 IRA 的提領通常在收到的年度課稅，不可扣除存款所形成的成本基礎部分除外'],
            ['10% 額外稅', '所有人過世後支付給受益人的提領不適用'],
            ['漏領必要提領金額', '就短少的金額繳 25% 消費稅；在更正期間內更正則為 10%；在 Form 5329 上申報；可以合理原因申請免除'],
            ['10 年（或 5 年）期限後仍留在帳戶的金額', '適用同樣的消費稅'],
          ]}
        />

        <h2>範例（所有人於 2025 年過世）</h2>
        <ArticleTable
          head={['', 'Kevin', 'Amy', 'Rosa']}
          rows={[
            ['事實', '繼承父親的傳統 IRA；父親 78 歲過世，在必須開始提領日之後', '繼承母親的傳統 IRA；母親 65 歲過世，在必須開始提領日之前', '以唯一受益人身分繼承丈夫的 IRA'],
            ['規定', '從 2026 年開始每年提領 RMD，而且帳戶必須在 2035 年 12 月 31 日前提領完畢', '不需要每年提領；帳戶必須在 2035 年 12 月 31 日前提領完畢', '可以把它視為自己的或轉存，或維持受益人身分並按預期壽命提領'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 規劃提領時程</div>
          <p>一年內把全部餘額提領出來，可能讓你進入較高的稅率級距。把提領分散在 10 年內，可能降低總稅額。請查看 IRA 保管機構的文件，並考慮請稅務專業人士協助，特別是涉及信託、多位受益人或配偶的選項時。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

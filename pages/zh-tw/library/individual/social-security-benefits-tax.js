import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/social-security-benefits-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'social-security-benefits-tax',
  sourceHash:      'e90611da6032',
  id:            '100',
  title:         '社會安全福利要繳稅嗎？50% 與 85% 規則說明',
  titleEn:       'Is My Social Security Taxable? The 50% and 85% Rules Explained',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 915（2025）與 IRS 關於長者加強扣除額的說明，解釋社會安全的退休、遺屬與身心障礙福利中有多少要繳聯邦所得稅。文中金額來自 Publication 915（2025）；2026 年版發布後請再確認。本文不涵蓋鐵路退休第二級（tier 2）福利、一次給付選擇的計算或州稅',
  persona:       ['領取社會安全福利的退休人士', '領取社會安全身心障礙福利的人', '決定如何報稅的夫妻', '領取美國社會安全福利的非居民外國人'],
  relatedJourney: ['準備報稅'],
  actionRequired: '使用 Form SSA-1099 第 5 欄，以及 Form 1040 填寫說明中的 Social Security Benefits Worksheet（或 Publication 915）計算應稅部分；如果部分福利要課稅，可以考慮用 Form W-4V 預扣或繳預估稅。',
  sources: [
    { label: 'IRS — Publication 915（2025），社會安全與同等鐵路退休福利', url: 'https://www.irs.gov/publications/p915' },
    { label: 'IRS — 確認你是否符合新的長者加強扣除額資格', url: 'https://www.irs.gov/newsroom/check-your-eligibility-for-the-new-enhanced-deduction-for-seniors' },
  ],
}

const FAQS = [
  {
    q: '「85% 應稅」是指要繳 85% 的稅嗎？',
    a: '不是。它的意思是最多 85% 的福利計入應稅所得。這部分金額再和你其他所得一起，按一般所得稅率課稅。很多人的福利完全不計入，或只有一部分計入。',
  },
  {
    q: '社會安全身心障礙福利也是這樣課稅嗎？',
    a: '是的。Publication 915 指出，社會安全福利包括每月的退休、遺屬與身心障礙福利，並使用同一份工作表。補充安全收入（SSI）不是社會安全福利，不用課稅。',
  },
  {
    q: '新的 $6,000 長者扣除額會讓我的社會安全福利免稅嗎？',
    a: '不會。福利的應稅部分仍然用 Social Security Benefits Worksheet 計算，這份工作表不使用長者扣除額。長者扣除額適用於 2025 到 2028 年，是在之後才扣除，可以減少你總應稅所得的稅，但不會改變福利中應稅的金額。',
  },
  {
    q: '免稅利息要算進去嗎？',
    a: '要。免稅利息，例如市政債券利息，在和基本金額比較時要加到你的其他所得中，即使利息本身不課稅。',
  },
  {
    q: '我只有社會安全福利，需要報稅嗎？',
    a: 'Publication 915 指出，如果你唯一的所得是社會安全福利，這些福利一般不用課稅，你可能不需要報稅。如果你有其他所得，即使福利完全不用課稅，你也可能需要報稅。',
  },
  {
    q: '怎麼從福利中預扣稅？',
    a: '向社會安全局提交 Form W-4V（Voluntary Withholding Request）。否則你可能需要增加其他所得的預扣稅，或繳預估稅。',
  },
]

const RELATED = [
  {
    href: '/library/individual/senior-deduction',
    cat:  'Individuals & Families',
    title: '65 歲以上新增 $6,000 扣除額：資格與收入限制',
    desc:  '65 歲以上人士的另一項扣除額。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  'IRA 與 401(k) 提領算其他所得。',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: '為什麼今年要補稅？看懂 W-4 與預扣稅',
    desc:  '預扣稅與預估稅。',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '非居民外國人適用不同的社會安全規定。',
  },
]

export default function SocialSecurityBenefitsTaxZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '社會安全福利要繳稅嗎？50% 與 85% 規則說明 | AskLinTax 繁體中文',
      description: '社會安全福利有多少要課稅：合計所得、$25,000 與 $32,000 基本金額、50% 與 85% 級距、夫妻分開申報、Form SSA-1099、長者扣除額，以及非居民外國人。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          你的社會安全福利可能有一部分要課稅，取決於你的其他所得。把<strong>一半的福利</strong>加上<strong>你所有其他所得（包括免稅利息）</strong>。如果合計不超過 <strong>$25,000</strong>（夫妻合併申報為 <strong>$32,000</strong>），福利完全不用課稅。超過這個金額，一般最多 <strong>50%</strong> 的福利要課稅，所得更高時最多 <strong>85%</strong>。「最多 85% 應稅」是指最多 85% 的福利計入所得——<strong>不是 85% 的稅率</strong>。
        </p>

        <h2>哪些算社會安全福利</h2>
        <ul>
          <li><strong>包括：</strong>每月的退休、遺屬與身心障礙福利，以及鐵路退休第一級（tier 1）福利中相當於社會安全的部分。</li>
          <li><strong>不包括：</strong>補充安全收入（SSI），不用課稅。</li>
          <li><strong>你的表格：</strong>Form SSA-1099。第 3 欄是總福利，第 4 欄是償還金額，<strong>第 5 欄</strong>是淨福利——也就是計算時使用的金額。</li>
          <li><strong>誰被課稅：</strong>依法有權領取福利的人。孩子的福利屬於孩子，即使支票上是父母的名字。</li>
        </ul>

        <h2>第 1 步：合計所得與基本金額比較</h2>
        <p>
          Publication 915 把你的基本金額，與<strong>一半的福利</strong>加上<strong>你所有其他所得（包括免稅利息）</strong>的合計比較。不要用海外工作所得排除額或海外住房排除額等排除項目減少你的其他所得。
        </p>
        <ArticleTable
          head={['報稅身分', '基本金額', '超過多少時最多 85% 可能要課稅']}
          rows={[
            ['單身、戶長或符合資格的喪偶者', '$25,000', '$34,000'],
            ['夫妻分開申報，全年與配偶分居', '$25,000', '$34,000'],
            ['夫妻合併申報', '$32,000', '$44,000'],
            ['夫妻分開申報，年度中任何時候與配偶同住', '$0', '從第一塊錢起，最多 85% 可能要課稅'],
          ]}
        />
        <p>
          合併申報時，即使只有一方領取福利，也要把兩位配偶的所得與福利合計。這些是 Publication 915（2025）中的金額；請確認你所屬稅務年度的版本。
        </p>

        <h2>第 2 步：有多少要課稅</h2>
        <ul>
          <li><strong>不超過基本金額：</strong>福利完全不用課稅。</li>
          <li><strong>介於基本金額與 $34,000（合併申報 $44,000）之間：</strong>應稅金額一般是福利的一半，或超過基本金額部分的一半，兩者取較小者。</li>
          <li><strong>超過 $34,000（合併申報 $44,000）：</strong>超過部分的 85% 要加進來，但應稅金額永遠不會超過<strong>福利的 85%</strong>。</li>
          <li><strong>夫妻分開申報且同住：</strong>工作表跳過基本金額，一般計入合計所得數字的 85%，最多為福利的 85%。</li>
        </ul>
        <p>
          使用 Form 1040 填寫說明中的 Social Security Benefits Worksheet，或 Publication 915 的 Worksheet 1。如果你存了傳統 IRA，而你或配偶有參加工作單位的退休計畫，Publication 915 指出要改用 Publication 590-A 中的特殊工作表。
        </p>

        <h2>範例（說明用，2025 年，單身申報）</h2>
        <ArticleTable
          head={['', 'Grace', 'Henry']}
          rows={[
            ['社會安全福利（SSA-1099 第 5 欄）', '$24,000', '$30,000'],
            ['其他所得（退休金、IRA 提領、利息）', '$20,000', '$40,000'],
            ['免稅利息', '$1,000', '$0'],
            ['一半的福利 + 其他所得 + 免稅利息', '$33,000', '$55,000'],
            ['超過 $25,000 基本金額的部分', '$8,000', '$30,000'],
            ['50% 級距：超過基本金額部分的一半，最多 $9,000 × 50%（$4,500），且不超過福利的一半', '$4,000', '$4,500'],
            ['85% 級距：超過 $34,000 部分的 85%', '$0', '$17,850（85% × $21,000）'],
            ['合計，上限為福利的 85%', '$4,000', '$22,350（上限為 $25,500）'],
            ['福利中應稅的比例', '約 17%', '約 75%'],
          ]}
        />
        <p>
          應稅金額會加到 Grace 與 Henry 的其他所得中，按一般稅率課稅。範例假設沒有所得調整項目；你的工作表結果可能不同。
        </p>

        <h2>其他所得的影響</h2>
        <ul>
          <li><strong>IRA 與 401(k) 提領（包括 RMD）</strong>、退休金、工資、利息、股利與資本利得都算其他所得。一大筆提領可能讓更多福利要課稅。請參考<a href="/zh-tw/library/individual/retirement-withdrawals-rmd/">退休帳戶提領指南</a>。</li>
          <li><strong>免稅利息</strong>要加進來，即使它本身不課稅。</li>
          <li><strong>被排除的海外所得</strong>在這項計算中要加回來。</li>
        </ul>

        <h2>長者扣除額不會讓福利免稅</h2>
        <p>
          2025 到 2028 年，65 歲以上的人每人最多可以申報 $6,000 的長者加強扣除額，並有收入逐步減少的規定。Social Security Benefits Worksheet <strong>不</strong>使用這項扣除額，所以它不會改變福利中應稅的金額。它是在之後才扣除，可以減少你總應稅所得的稅。因為應稅福利是調整後總所得的一部分，也可能影響長者扣除額逐步減少所使用的所得。請參考<a href="/zh-tw/library/individual/senior-deduction/">長者扣除額指南</a>。
        </p>

        <h2>非居民外國人</h2>
        <p>
          如果你是<strong>非居民外國人</strong>，上面的規定不適用。而是<strong>福利的 85% 按 30% 的固定稅率課稅</strong>，除非稅務協定免稅或訂有較低稅率。你會收到 Form SSA-1042S，而不是 Form SSA-1099。Publication 915 列出居民可以免稅的協定國家（加拿大、埃及、德國、愛爾蘭、以色列、義大利、日本、羅馬尼亞與英國）、印度的有限規定，以及瑞士居民適用的 15% 稅率。台灣不在這份清單上。綠卡持有人是居民外國人，不適用 30% 的預扣。要確認你的身分，請參考<a href="/zh-tw/library/individual/tax-residency/">稅務居民身分</a>。
        </p>

        <h2>其他重點</h2>
        <ul>
          <li><strong>補發的福利：</strong>如果你收到以前年度的一次給付，可能可以使用 Publication 915 中的一次給付選擇（lump-sum election）來限制應稅金額。</li>
          <li><strong>申報：</strong>把淨福利填在 Form 1040 第 6a 行，應稅部分填在第 6b 行。如果你夫妻分開申報且全年分居，請勾選第 6d 行的方框。</li>
          <li><strong>預扣稅：</strong>要預扣稅，請向社會安全局提交 Form W-4V。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把「85%」當成稅率。</strong></li>
          <li><strong>漏算免稅利息</strong>或被排除的海外所得。</li>
          <li><strong>同住卻分開申報</strong>，沒注意到基本金額是 $0。</li>
          <li><strong>以為長者扣除額會免除福利的稅。</strong></li>
          <li><strong>把 SSI 當成應稅福利。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>一次補發的福利、償還金額超過福利、鐵路退休福利、IRA 存款搭配福利，以及外國社會安全制度的福利，都可能很複雜。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

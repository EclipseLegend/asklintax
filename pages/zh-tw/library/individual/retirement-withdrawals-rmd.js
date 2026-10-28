import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/retirement-withdrawals-rmd.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'retirement-withdrawals-rmd',
  sourceHash:      '30f056573ab0',
  id:            '98',
  title:         '退休帳戶提領與 RMD：稅、10% 罰款與期限',
  titleEn:       'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 590-B（2025）、Publication 575、2025 年 Form 5329 填寫說明、IRS Tax Topics 557 與 558、IRS 最低提領額常見問題，以及 Internal Revenue Bulletin 2024-33 中 2024 年最低提領額正式法規（T.D. 10001）與擬議法規（REG-103529-23），說明 2025 與 2026 稅務年度從傳統 IRA、Roth IRA 與 401(k) 類計畫提領的課稅方式、10% 附加稅及主要例外，以及最低提領額（RMD）。本文不計算 RMD 金額，也不詳細涵蓋年金、退休金、轉存（rollover）或州稅。1959 年出生者適用的年齡依據的是尚未定案的擬議法規',
  persona:       ['考慮在 59½ 歲前從 IRA 或 401(k) 領錢的人', '即將第一次領取最低提領額的退休人士', '錯過 RMD 的人', '繼承退休帳戶的受益人'],
  relatedJourney: ['準備報稅'],
  actionRequired: '提領前先確認這筆錢是否要課稅、你是否未滿 59½ 歲以及是否適用例外，以及會預扣多少稅；到了規定年齡後，每一筆 RMD 都要在期限前領取，並在適用例外、錯過 RMD 或其他附加稅時申報 Form 5329。',
  sources: [
    { label: 'IRS — Publication 590-B（2025），個人退休帳戶（IRA）的分配', url: 'https://www.irs.gov/publications/p590b' },
    { label: 'IRS — Publication 575，退休金與年金所得', url: 'https://www.irs.gov/publications/p575' },
    { label: 'IRS — 2025 年 Form 5329 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
    { label: 'IRS — Topic no. 557，傳統與 Roth IRA 提前分配的附加稅', url: 'https://www.irs.gov/taxtopics/tc557' },
    { label: 'IRS — Topic no. 558，IRA 以外退休計畫提前分配的附加稅', url: 'https://www.irs.gov/taxtopics/tc558' },
    { label: 'IRS — 退休計畫與 IRA 最低提領額常見問題', url: 'https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs' },
    { label: 'IRS — Internal Revenue Bulletin 2024-33（T.D. 10001 最低提領額正式法規與 REG-103529-23 擬議法規）', url: 'https://www.irs.gov/pub/irs-irbs/irb24-33.pdf' },
  ],
}

const FAQS = [
  {
    q: '提前提領只有 10% 罰款嗎？',
    a: '不是。10% 附加稅是加在一般所得稅之上的。它適用於分配中必須計入所得的部分，所以從傳統 IRA 全額應稅的提前提領，要按一般所得課稅，除非適用例外，否則還要再加 10%。',
  },
  {
    q: '我可以免稅領出 Roth IRA 的存款本金嗎？',
    a: '一般可以。依 Publication 590-B，Roth IRA 的分配有固定順序：先是一般存款，再來是轉換與轉存的存款，最後才是收益。領回一般存款不計入所得。在非合格分配中領出的收益可能要課稅，也可能要加 10% 附加稅。',
  },
  {
    q: '55 歲規定適用於我的 IRA 嗎？',
    a: '不適用。在你滿 55 歲當年或之後離職的例外，IRS 只列在合格的雇主計畫（例如 401(k)）之下，不適用於 IRA。',
  },
  {
    q: '我的第一筆最低提領額什麼時候到期？',
    a: '要看你的出生年份。依 2024 年正式法規，1951 年到 1958 年出生者的適用年齡是 73 歲，1960 年 1 月 1 日或之後出生者是 75 歲。1959 年出生者，法條同時寫了兩個年齡；擬議法規會定為 73 歲，但尚未定案。IRA 的第一筆 RMD 可以延到你達到適用年齡次年的 4 月 1 日；之後每一筆都要在 12 月 31 日前領取，所以延後第一筆代表同一年要領兩筆 RMD。',
  },
  {
    q: '我錯過了 RMD，怎麼辦？',
    a: '盡快把漏領的金額領出。短缺的金額要在 Form 5329 上繳 25% 的附加稅；如果你在更正期間內領出漏領的金額，並提交反映這筆稅的稅表，可降為 10%。更正期間一般在課稅年度之後第二個稅務年度的最後一天結束，如果 IRS 寄出欠稅通知或核定稅額，則會更早結束。如果短缺是合理錯誤造成，而且你正在補正，IRS 可能會免除這筆稅；請在 Form 5329 附上說明。',
  },
  {
    q: '我的 Roth IRA 需要領 RMD 嗎？',
    a: '原始帳戶持有人在世時不需要。IRS 常見問題也指出，401(k) 與 403(b) 中的指定 Roth 帳戶，在持有人在世時也不再需要 RMD。繼承 Roth 帳戶的受益人則有分配規定。',
  },
]

const RELATED = [
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: '傳統 IRA 與 Roth IRA 存款：2025 與 2026 年上限與收入規定',
    desc:  '錢一開始是怎麼存進 IRA 的。',
  },
  {
    href: '/library/individual/social-security-benefits-tax',
    cat:  'Individuals & Families',
    title: '社會安全福利要繳稅嗎？50% 與 85% 規則說明',
    desc:  '退休帳戶提領可能讓更多福利要課稅。',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: '為什麼今年要補稅？看懂 W-4 與預扣稅',
    desc:  '退休所得的預扣稅與預估稅。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  'IRA 與計畫分配不是淨投資所得。',
  },
  {
    href: '/library/individual/health-savings-account-hsa',
    cat: 'Individuals & Families',
    title: '健康儲蓄帳戶（HSA）：2025 與 2026 年上限與 2026 年新規定',
    desc: 'HSA 提領適用不同的規定。',
  },
  {
    href: '/library/individual/estate-tax-inheritance-basics',
    cat:  'Individuals & Families',
    title: '遺產稅與繼承基本概念：2025 與 2026 年免稅額、Form 706 與非居民',
    desc:  '遺產稅、繼承，以及非居民的 Form 706-NA。',
  },
  {
    href: '/library/individual/divorce-alimony-taxes',
    cat:  'Individuals & Families',
    title: '離婚與稅務：贍養費、子女撫養費、財產與退休帳戶',
    desc:  '離婚時的贍養費、子女撫養費與財產分配。',
  },
  {
    href: '/library/individual/inherited-ira-rules',
    cat:  'Individuals & Families',
    title: '繼承的 IRA：10 年規則與受益人提領',
    desc:  '繼承 IRA 後的提領規定。',
  },
]

export default function RetirementWithdrawalsRmdZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '退休帳戶提領與 RMD：稅、10% 罰款與期限 | AskLinTax 繁體中文',
      description: 'IRA 與 401(k) 提領怎麼課稅：傳統與 Roth、59½ 歲前的 10% 附加稅及例外、Form 5329、最低提領額的年齡（依出生年份為 73 或 75 歲）、錯過 RMD，以及繼承的帳戶。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          從<strong>傳統 IRA 或 401(k)</strong> 領出的錢一般按一般所得課稅，稅後（不可扣除）的金額除外。<strong>Roth IRA</strong> 的<strong>合格</strong>分配免稅。如果你<strong>未滿 59½ 歲</strong>，應稅部分除非適用例外，還可能要加 <strong>10% 附加稅</strong>。到了你的<strong>適用年齡</strong>——依出生年份為 <strong>73</strong> 或 <strong>75</strong> 歲——你一般每年都必須從傳統 IRA 與雇主計畫領取<strong>最低提領額（RMD）</strong>。
        </p>

        <h2>提領要課稅嗎？</h2>
        <ArticleTable
          head={['帳戶', '一般要課稅', '一般不課稅']}
          rows={[
            ['傳統 IRA', '可扣除的存款與所有收益', '你不可扣除的存款（成本基礎），在 Form 8606 上計算'],
            ['401(k)、403(b) 與其他雇主計畫（稅前）', '稅前存款、雇主提撥與收益', '稅後存款'],
            ['Roth IRA，合格分配', '無', '整筆分配'],
            ['Roth IRA，非合格分配', '收益（存款與轉換的金額先領出之後）', '領回你的一般存款'],
            ['任何帳戶，正確轉存', '無', '轉存的金額'],
          ]}
        />
        <p>
          Roth IRA 的分配如果是在你第一次為任何 Roth IRA 存款的年度起算 5 年期間之後，<strong>而且</strong>你已滿 59½ 歲、身心障礙、是在你過世後分配給受益人，或是用於首次購屋（終身最多 $10,000），就是<strong>合格</strong>分配。
        </p>

        <h2>59½ 歲前的 10% 附加稅</h2>
        <p>
          59½ 歲前的分配，IRS 會對必須計入所得的部分加收 <strong>10%</strong>。這筆稅在 <strong>Form 5329</strong> 與 Schedule 2 上申報。如果你的 Form 1099-R 第 7 欄顯示<strong>代碼 1</strong>，而且不適用任何例外，可以不填 Form 5329，直接在 Schedule 2 上填寫這筆稅。如果適用例外但第 7 欄沒有顯示，就要申報 Form 5329 來主張例外。
        </p>

        <h2>主要例外</h2>
        <ArticleTable
          head={['例外', 'IRA', '401(k) 或其他合格計畫']}
          rows={[
            ['完全且永久身心障礙，或末期疾病', '是', '是'],
            ['帳戶持有人過世後付給受益人或遺產', '是', '是'],
            ['一系列實質相等的定期給付', '是', '是，需在離職之後'],
            ['超過 AGI 7.5% 的未獲補償醫療費用', '是', '是'],
            ['在滿 55 歲當年或之後離職', '否', '是'],
            ['合格的高等教育費用', '是', '否'],
            ['首次購屋，最多 $10,000', '是', '否'],
            ['失業期間的健康保險費', '是', '否'],
            ['合格的出生或領養，最多 $5,000', '是', '是'],
            ['個人緊急支出、家暴受害者或合格災害', '是', '是'],
            ['IRS 強制執行（levy）；合格後備軍人分配', '是', '是'],
            ['依 QDRO 付給前配偶', '否', '是'],
          ]}
        />
        <p>
          每一項例外都有自己的條件與金額上限，Publication 590-B、Publication 575 與 Form 5329 填寫說明有詳細說明。例外只免除 10% 附加稅——<strong>這筆提領仍然可能是應稅所得</strong>。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Leo</strong> 45 歲，2025 年從傳統 IRA 領出 $20,000 償還信用卡。他過去的存款都已扣除，所以全額應稅，也不適用任何例外。
        </p>
        <ArticleTable
          head={['項目', '金額']}
          rows={[
            ['加入 2025 年應稅所得', '$20,000'],
            ['10% 附加稅（10% × $20,000），在 Schedule 2 上申報', '$2,000'],
            ['$20,000 的一般所得稅', '按 Leo 的一般所得稅率'],
          ]}
        />
        <p>
          如果 Leo 把錢用在合格的高等教育費用上，10% 附加稅可能就不適用——但這 $20,000 仍然是應稅所得。
        </p>

        <h2>預扣稅</h2>
        <ul>
          <li><strong>雇主計畫：</strong>如果計畫中可轉存的分配是付給你、而不是直接轉存，付款人一般必須預扣 <strong>20%</strong> 的所得稅。</li>
          <li><strong>IRA：</strong>除非你選擇不預扣，否則要預扣聯邦所得稅。如果選擇不預扣，你可能需要繳預估稅。</li>
          <li>預扣稅只是預繳，不是最終稅額。10% 附加稅與你實際的稅率會在報稅時結算。</li>
        </ul>

        <h2>最低提領額（RMD）</h2>
        <p>
          RMD 從你達到<strong>適用年齡</strong>的那一年開始。SECURE 2.0 提高了這個年齡，2024 年正式法規（T.D. 10001）依出生日期訂定：
        </p>
        <ArticleTable
          head={['出生日期', '適用年齡', '狀態']}
          rows={[
            ['1949 年 7 月 1 日之前', '70½', '正式法規（舊法）'],
            ['1949 年 7 月 1 日到 1950 年 12 月 31 日', '72', '正式法規（舊法）'],
            ['1951 年到 1958 年', '73', '正式法規'],
            ['1959 年', '依擬議法規為 73', '法條把這一群人同時列在 73 歲與 75 歲之下；擬議法規（REG-103529-23）會定為 73 歲，但尚未定案'],
            ['1960 年 1 月 1 日或之後', '75', '正式法規'],
          ]}
        />
        <ArticleTable
          head={['帳戶', '持有人在世時要領 RMD 嗎？', '第一筆 RMD 期限']}
          rows={[
            ['傳統、SEP 與 SIMPLE IRA', '要，從適用年齡開始，即使你仍在工作', '達到適用年齡次年的 4 月 1 日'],
            ['401(k)、403(b) 與其他雇主計畫', '要，但一般要等你從該雇主退休，除非你是 5% 持有人', '達到適用年齡那一年或退休那一年（取較晚者）次年的 4 月 1 日（5% 持有人：適用年齡那一年）'],
            ['Roth IRA', '不用', '原始持有人在世時沒有'],
            ['401(k) 或 403(b) 中的指定 Roth 帳戶', '不用，依 IRS 常見問題', '持有人在世時沒有'],
            ['繼承的帳戶（傳統或 Roth）', '改為適用受益人規定', '視受益人與 10 年規定而定（見下文）'],
          ]}
        />
        <ul>
          <li><strong>之後的 RMD：</strong>第一筆之後的每一筆 RMD，都要在當年的 <strong>12 月 31 日</strong>前領取。</li>
          <li><strong>多個 IRA：</strong>每個 IRA 的 RMD 要分別計算，但總額可以從其中一個或多個 IRA 領出。401(k) 計畫的 RMD 則必須從每個計畫分別領取。</li>
          <li><strong>責任在你：</strong>帳戶業者可能會幫你計算金額，但領取正確的 RMD 是持有人的責任。</li>
        </ul>
        <p>
          <strong>範例：</strong>如果你在 1952 年出生、持有傳統 IRA，你在 2025 年達到 73 歲的適用年齡。你的第一筆 RMD 是 2025 年的，最晚可以在 2026 年 4 月 1 日領取。你 2026 年的 RMD 則要在 2026 年 12 月 31 日前領取——所以如果你延後，兩筆都會算在 2026 年的應稅所得。
        </p>

        <h2>錯過 RMD</h2>
        <p>
          應該領而沒有領的金額（短缺）要繳 <strong>25%</strong> 的附加稅，在包含 RMD 期限的那個稅務年度用 Form 5329 申報。如果你在<strong>更正期間</strong>內領出漏領的金額，並提交反映這筆稅的稅表，可降為 <strong>10%</strong>。更正期間在下列日期中最早的一天結束：IRS 就這筆稅寄出欠稅通知的日期、核定稅額的日期，或課稅年度之後第二個稅務年度的最後一天。如果短缺是合理錯誤造成，而且你正在採取合理步驟補正，IRS 可能會免除這筆稅；要申請免除，請申報 Form 5329 並附上說明信。
        </p>

        <h2>繼承的帳戶（概要）</h2>
        <ul>
          <li><strong>10% 附加稅</strong>不適用於持有人過世後付給受益人的分配，但傳統帳戶的分配仍然要課稅。</li>
          <li><strong>10 年規定：</strong>對於 2019 年以後過世的持有人，SECURE Act 一般要求整個帳戶在過世 10 週年那一年的 12 月 31 日前分配完畢——2025 年過世者為 2035 年底。</li>
          <li><strong>10 年規定的例外</strong>適用於尚存配偶、持有人未成年的子女、身心障礙或慢性病患者，以及比持有人年輕不超過 10 歲的人。</li>
          <li><strong>10 年期間內：</strong>如果持有人在必須開始提領日之前過世，而且適用 10 年規定，Publication 590-B 指出第 10 年之前不需要分配。其他情況可能需要每年分配。繼承的帳戶很複雜；請參考 Publication 590-B 或諮詢稅務專業人士。</li>
        </ul>

        <h2>其他要知道的事</h2>
        <ul>
          <li><strong>社會安全福利：</strong>應稅的提領與 RMD 會提高用來計算社會安全福利應稅部分的所得。請參考<a href="/zh-tw/library/individual/social-security-benefits-tax/">社會安全福利指南</a>。</li>
          <li><strong>NIIT：</strong>IRA 與合格計畫的分配不是淨投資所得，但可能提高 MAGI。請參考<a href="/zh-tw/library/investment/net-investment-income-tax/">NIIT 指南</a>。</li>
          <li><strong>海外退休帳戶</strong>適用不同規定；請參考<a href="/zh-tw/library/investment/foreign-pension-retirement-accounts/">海外退休金與退休帳戶</a>。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為適用例外就免稅。</strong>例外只免除 10%。</li>
          <li><strong>把 55 歲規定用在 IRA 上。</strong>它只適用於雇主計畫。</li>
          <li><strong>以為預扣稅就夠繳全部稅額。</strong></li>
          <li><strong>以為每個人都從 73 歲開始領 RMD。</strong>1960 年或之後出生的人從 75 歲開始。</li>
          <li><strong>延後第一筆 RMD</strong>，卻沒有規劃同一年有兩筆應稅 RMD。</li>
          <li><strong>對錯過的 RMD 置之不理</strong>，而沒有補領並申報 Form 5329。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>RMD 的計算、繼承的帳戶、實質相等的定期給付、Roth 轉換、超過 60 天期限的轉存，以及計畫貸款都可能很複雜。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

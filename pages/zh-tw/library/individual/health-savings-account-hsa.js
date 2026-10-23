import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/health-savings-account-hsa.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'health-savings-account-hsa',
  sourceHash:      'b30db97ab8ea',
  id:            '102',
  title:         '健康儲蓄帳戶（HSA）：2025 與 2026 年上限與 2026 年新規定',
  titleEn:       'Health Savings Accounts (HSA): 2025 and 2026 Limits and the New 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 969（2025）、Rev. Proc. 2024-25（2025 年上限）、Rev. Proc. 2025-19（2026 年上限）、IRS 關於 2025 年稅法變動的 Notice 2026-5，以及健康 FSA 上限的 Rev. Proc. 2024-40 與 2025-32，說明 2025 與 2026 稅務年度的健康儲蓄帳戶。本文不涵蓋 Archer MSA、HSA 投資選擇、雇主計畫設計或州稅',
  persona:       ['選擇高自付額健保計畫的上班族', '2026 年購買銅級或重大災害計畫的人', '比較 HSA 與 FSA 的家庭', '即將加入 Medicare 的人'],
  relatedJourney: ['金錢與福利', '了解新稅務規定'],
  actionRequired: '確認你參加的是符合 HSA 資格的計畫、沒有會讓你失去資格的其他保障，讓總存款（你加上雇主的）不超過上限，在報稅截止日之前存入，並在有 HSA 活動的年度申報 Form 8889。',
  sources: [
    { label: 'IRS — Publication 969（2025），健康儲蓄帳戶與其他享稅務優惠的健康計畫', url: 'https://www.irs.gov/publications/p969' },
    { label: 'IRS — Rev. Proc. 2024-25（2025 年 HSA 上限）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-25.pdf' },
    { label: 'IRS — Rev. Proc. 2025-19（2026 年 HSA 上限）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-19.pdf' },
    { label: 'IRS — Notice 2026-5，擴大健康儲蓄帳戶的適用範圍', url: 'https://www.irs.gov/pub/irs-drop/n-26-05.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年健康 FSA 上限）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年健康 FSA 上限）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '雇主幫我存的錢會算進我的上限嗎？',
    a: '會。Publication 969 指出，你或任何其他人可以存入的金額，要減去雇主可排除於所得的提撥，包括透過自助式福利計畫（cafeteria plan）存入的金額。這些金額會出現在你的 Form W-2 第 12 欄，代碼 W。',
  },
  {
    q: '存款的截止日是什麼時候？',
    a: '某一年度的存款可以在該年度報稅截止日（不含延期）之前存入。Publication 969 指出，2025 年的存款可以存到 2026 年 4 月 15 日。',
  },
  {
    q: '失去資格後還能繼續使用 HSA 嗎？',
    a: '可以。一旦不再符合資格（例如加入 Medicare 之後），你就不能再存新的錢，但帳戶還是你的。你可以繼續免稅用於合格的醫療費用，換工作時帳戶也會跟著你。',
  },
  {
    q: '把 HSA 的錢用在醫療以外的地方會怎樣？',
    a: '這筆錢要計入所得，而且除非是在你身心障礙、滿 65 歲或過世之後的分配，還要加 20% 的附加稅。65 歲以後的非醫療提領要按所得課稅，但沒有 20% 附加稅。',
  },
  {
    q: '可以用 HSA 的錢付健康保險費嗎？',
    a: '一般不行。例外包括長期照護保險（有上限）、COBRA 延續保障、領取失業給付期間的保障，以及 65 歲以上的 Medicare 和其他保障（Medicare 補充保險 Medigap 除外）。',
  },
  {
    q: '我存太多了，怎麼辦？',
    a: '超額存款每年留在帳戶中都要繳 6% 的消費稅（excise tax），在 Form 5329 上計算。只要在報稅截止日（含延期）之前把超額部分及其收益領出，就可以避免；收益部分要課稅。',
  },
]

const RELATED = [
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '第 12 欄代碼 W 顯示雇主的 HSA 提撥。',
  },
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: '傳統 IRA 與 Roth IRA 存款：2025 與 2026 年上限與收入規定',
    desc:  '另一種有稅務優惠、上限分開計算的帳戶。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '退休帳戶提領與 HSA 分配有什麼不同。',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '2025 年稅法的其他變動。',
  },
]

export default function HealthSavingsAccountZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '健康儲蓄帳戶（HSA）：2025 與 2026 年上限與 2026 年新規定 | AskLinTax 繁體中文',
      description: 'HSA 說明：誰符合資格、HDHP 規定、2025 與 2026 年存款上限、55 歲補繳額、雇主提撥、最後一個月規則、Form 8889、20% 附加稅、HSA 與 FSA、Medicare，以及 2026 年銅級、重大災害與直接初級照護規定。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>健康儲蓄帳戶（HSA）</strong>是你自己擁有、用來支付醫療費用的帳戶。如果你參加<strong>高自付額健保計畫（HDHP）</strong>並符合其他規定，存款可以扣除（透過雇主存入則不計入所得），帳戶免稅成長，用於合格醫療費用的提領也免稅。<strong>2025</strong> 年最多可存 <strong>$4,300</strong>（個人保障）或 <strong>$8,550</strong>（家庭保障）；<strong>2026</strong> 年為 <strong>$4,400</strong> 或 <strong>$8,750</strong>。從 2026 年起，可透過健保交易所（Exchange）購買的<strong>銅級與重大災害</strong>計畫也算 HDHP。
        </p>

        <h2>誰可以存款</h2>
        <p>依 Publication 969，如果符合下列條件，你在該月就是符合資格的個人：</p>
        <ul>
          <li>你在當月第一天參加 HDHP；</li>
          <li>除了允許的保障（例如牙科、視力、意外、失能、長期照護或特定疾病保險）之外，你沒有其他健康保障；</li>
          <li>你<strong>沒有加入 Medicare</strong>；以及</li>
          <li>沒有人可以把你申報為受扶養人。</li>
        </ul>
        <p>
          資格決定你能不能<strong>存款</strong>。花這筆錢能不能免稅，則是另一項測試：這筆費用是否為<strong>合格醫療費用</strong>。
        </p>
        <ArticleTable
          head={['問題', '由什麼決定', '例子']}
          rows={[
            ['我這個月可以存款嗎？', '資格：當月第一天參加 HDHP（或 2026 年起符合條件的銅級或重大災害計畫）、沒有會讓你失去資格的保障、沒有 Medicare、不是受扶養人', '加入 Medicare 後就不能再存款'],
            ['我可以存多少？', '個人或家庭保障的年度上限——如果你不是全年符合資格，除非適用最後一個月規則，否則用 Form 8889 工作表逐月計算——減去雇主提撥，再加上 55 歲的額外金額', '2026 年個人保障：$4,400'],
            ['提領是否免稅？', '取決於是否用於 HSA 開立之後發生的合格醫療費用——而不是你是否仍符合存款資格', '加入 Medicare 之後，仍可免稅用 HSA 支付合格費用'],
          ]}
        />

        <h2>2025 與 2026 年上限</h2>
        <ArticleTable
          head={['項目', '2025', '2026']}
          rows={[
            ['存款上限，個人保障', '$4,300', '$4,400'],
            ['存款上限，家庭保障', '$8,550', '$8,750'],
            ['55 歲以上的額外存款', '$1,000', '$1,000'],
            ['HDHP 最低自付額，個人／家庭', '$1,650 / $3,300', '$1,700 / $3,400'],
            ['HDHP 自付上限，個人／家庭', '$8,300 / $16,600', '$8,500 / $17,000'],
          ]}
        />
        <p>
          上限包括雇主的提撥。55 歲的額外存款要存入你自己的 HSA；如果夫妻兩人都 55 歲以上，各自要使用自己的帳戶。Notice 2026-5 指出，2026 年這些自付額與自付上限的數字不適用於銅級與重大災害計畫，這兩種計畫適用下面的新規定。
        </p>

        <h2>夫妻與家庭保障</h2>
        <ul>
          <li>如果任一方配偶有家庭 HDHP 保障，兩人都視為有家庭保障。</li>
          <li>家庭上限由夫妻平均分配，除非另有約定；沒有聯名的 HSA。</li>
          <li>2025 年，如果夫妻兩人都 55 歲以上且符合資格，總額最多可達 <strong>$10,550</strong>（$8,550 加上每人 $1,000，每筆 $1,000 都存入該配偶自己的 HSA）。</li>
        </ul>

        <h2>部分年度：最後一個月規則與測試期間</h2>
        <p>
          如果你在 <strong>12 月 1 日</strong>符合資格，最後一個月規則讓你可以存入該年度的全年金額。但你必須在<strong>測試期間</strong>（到次年 12 月 31 日為止）內持續符合資格。如果沒有（死亡或身心障礙除外），只因為這項規則才多存的金額，要在你失去資格的那一年計入所得，並加 <strong>10% 附加稅</strong>，在 Form 8889 Part III 上計算。
        </p>

        <h2>Medicare</h2>
        <p>
          從你加入 Medicare 的第一個月起，你的存款上限就是<strong>零</strong>，包括 Medicare 追溯生效的月份。在加入的那一年，上限按加入前的月份比例計算。之後你仍然可以使用 HSA 裡的錢。
        </p>

        <h2>使用 HSA 的錢</h2>
        <ul>
          <li><strong>合格醫療費用：</strong>你、你的配偶與受扶養人的醫療照護費用，沒有獲得保險補償，而且是在 HSA 開立之後發生的。</li>
          <li><strong>保險費：</strong>一般不符合資格，但長期照護保險、COBRA、領取失業給付期間的保障，以及（65 歲以上）Medicare 和 Medigap 以外的其他保障除外。</li>
          <li><strong>其他提領：</strong>要課稅，而且除非是在身心障礙、滿 65 歲或過世之後，還要加 <strong>20% 附加稅</strong>。</li>
          <li><strong>沒有期限：</strong>你不需要每年提領。</li>
        </ul>

        <h2>範例（說明用）</h2>
        <ArticleTable
          head={['情況', '結果']}
          rows={[
            ['Maya 40 歲，2026 年全年參加個人 HDHP；雇主提撥 $1,000（W-2 代碼 W）', '她 2026 年最多可再存 $3,400（$4,400 − $1,000）'],
            ['Ken 50 歲，2025 年 12 月 1 日開始參加家庭 HDHP，存入 2025 年的 $8,550', '只要他到 2026 年 12 月 31 日都符合資格，依最後一個月規則就可以'],
            ['Ken 在 2026 年 6 月改參加非 HDHP 計畫', '他 2025 年存款中只因最後一個月規則而允許的部分，算入 2026 年所得，並加 10% 附加稅'],
            ['Ana 45 歲，提領 $1,000 去度假', '$1,000 是應稅所得，另加 $200 的附加稅（20%）'],
          ]}
        />

        <h2>申報：Form 8889 與 Form W-2</h2>
        <ul>
          <li><strong>Form 8889</strong> 申報存款、計算你的扣除額，並申報分配。只要你、雇主或其他人當年有存款、HSA 有分配、你沒有通過測試期間，或你因帳戶持有人過世而取得 HSA 權益，就要和 Form 1040 一起申報。</li>
          <li><strong>Form W-2 第 12 欄代碼 W</strong> 顯示雇主的提撥，包括你透過自助式福利計畫存入的稅前金額。</li>
          <li><strong>Form 5498-SA</strong>（存款）與 <strong>Form 1099-SA</strong>（分配）由 HSA 受託人寄給你。</li>
        </ul>

        <h2>2025 年稅法帶來的 2026 年新規定</h2>
        <ArticleTable
          head={['變動', '內容', '生效']}
          rows={[
            ['遠距醫療', 'HDHP 可以在自付額之前就給付遠距醫療與其他遠端照護，而不會讓你失去資格', '永久適用，自 2024 年 12 月 31 日之後開始的計畫年度起'],
            ['銅級與重大災害計畫', '只要可透過 Exchange 以個人保障購買——包括在 Exchange 以外購買的相同計畫——即使不符合 HDHP 的自付額或自付上限規定，也視為 HDHP', '2025 年 12 月 31 日之後開始的月份'],
            ['直接初級照護（DPC）', '加入符合資格的 DPC 安排不再讓你失去資格，其費用也可以用 HSA 支付', '2025 年 12 月 31 日之後開始的月份'],
          ]}
        />
        <p>
          <strong>直接初級照護的限制（Notice 2026-5）。</strong>這種安排只能由初級照護醫療人員提供初級照護服務，以固定的定期費用收費，不能另外收費。DPC 費用總額每月不能超過 <strong>$150</strong>（一個人），或 <strong>$300</strong>（涵蓋超過一個人的安排）；2026 年之後會依通膨調整。由雇主支付的 DPC 費用（包括透過減薪方式支付的），不能再從你的 HSA 報銷。
        </p>
        <p>
          存款上限本身沒有改變：透過銅級或重大災害計畫新取得資格的人，適用上面相同的 2026 年上限。
        </p>

        <h2>HSA 與健康 FSA</h2>
        <ArticleTable
          head={['', 'HSA', '健康 FSA']}
          rows={[
            ['誰擁有', '你', '雇主的計畫'],
            ['是否需要 HDHP', '需要（或 2026 年的銅級或重大災害計畫）', '不需要'],
            ['年度上限', '$4,300 / $8,550（2025）；$4,400 / $8,750（2026）', '減薪存入 $3,300（2025）；$3,400（2026）'],
            ['沒用完的錢', '留在帳戶裡', '一般會失效，除非計畫允許結轉（2025 年最多 $660、2026 年 $680）或有寬限期'],
          ]}
        />
        <p>
          如果你參加的健康 FSA 或 HRA 會支付或報銷你的合格醫療費用，你一般就不能存 HSA；Publication 969 說明了例外，例如限定用途的健康 FSA 與 HRA。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>計算自己的上限時忘了雇主的提撥。</strong></li>
          <li><strong>加入 Medicare 之後還存款</strong>，包括追溯生效的保障。</li>
          <li><strong>12 月 1 日開始之後，在測試期間內失去資格。</strong></li>
          <li><strong>支付 HSA 開立之前發生的費用。</strong></li>
          <li><strong>以為 2026 年任何健保交易所計畫都符合資格</strong>——只有銅級與重大災害計畫適用新規定。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>年度中保障變動、FSA 或 HRA 等其他健康保障、印第安衛生服務（IHS）的照護、轉存與 IRA 提撥分配，以及由配偶以外的人繼承的 HSA，都可能很複雜。各州對 HSA 的稅務處理不同，本文不涵蓋。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

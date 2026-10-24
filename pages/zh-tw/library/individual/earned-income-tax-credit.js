import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/earned-income-tax-credit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'earned-income-tax-credit',
  sourceHash:      '3aecfb970601',
  id:            '101',
  title:         '勞動所得抵稅額（EITC）：2025 與 2026 年收入上限與規定',
  titleEn:       'Earned Income Tax Credit (EITC): 2025 and 2026 Income Limits and Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 596（2025）、Rev. Proc. 2024-40（2025 年金額）與 Rev. Proc. 2025-32（2026 年金額），說明 2025 與 2026 稅務年度的聯邦勞動所得抵稅額。本次審閱時尚無 2026 年版 Publication 596，因此 2026 年的資格規定應以該版本確認。本文不涵蓋州的勞動所得抵稅額、美國屬地，也不提供 IRS EIC Table 上的確切抵稅金額',
  persona:       ['中低收入的在職父母', '沒有子女、25 到 64 歲的工作者', '分居的已婚夫妻', '持有 SSN 或 ITIN 的新移民'],
  relatedJourney: ['有受扶養人的報稅', '金錢與福利'],
  actionRequired: '確認你、你的配偶和任何合格子女在報稅截止日之前都有可用於工作的 SSN，確認你的投資所得與 AGI 在該稅務年度的上限以下；如果有合格子女，請附上 Schedule EIC。',
  sources: [
    { label: 'IRS — Publication 596（2025），勞動所得抵稅額（EIC）', url: 'https://www.irs.gov/publications/p596' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '如果我不用繳稅，還能拿到 EITC 嗎？',
    a: '可以。EITC 是可退還的抵稅額：如果它超過你應繳的稅，IRS 會把差額退給你。即使你原本不需要報稅，也必須報稅才能申請。',
  },
  {
    q: '用 ITIN 可以申請 EITC 嗎？',
    a: '不行。Publication 596 指出，你（合併申報時還有你的配偶）必須在報稅截止日（含延期）之前取得有效的 SSN。如果你只有 ITIN 而沒有 SSN，就不能申請 EITC。只為了領取聯邦補助（例如 Medicaid）而核發、不能用於工作的 SSN 也不算。',
  },
  {
    q: '我的孩子沒有 SSN，我還能申請什麼嗎？',
    a: '你不能因為這個孩子申請較高的抵稅額。但如果你其他條件都符合，Publication 596 指出你可能可以申請沒有合格子女的工作者適用的較小抵稅額（「self-only」EITC）。請附上 Schedule EIC，並依照其中對沒有有效 SSN 子女的說明填寫。',
  },
  {
    q: '我已婚但分開申報，可以申請 EITC 嗎？',
    a: '已婚者通常必須合併申報。依分居配偶的特別規定，如果合格子女和你同住超過半年，而且你在年度最後 6 個月與配偶分開居住，或依法分居且年底時不住在同一個家庭中，你不合併申報也可以申請 EITC。',
  },
  {
    q: '我住在海外，用 Form 2555 排除工資，可以申請 EITC 嗎？',
    a: '不行。如果你申報 Form 2555，就不能申請 EITC。另外，你的主要住所必須在美國（50 州與華盛頓特區）超過半年。',
  },
  {
    q: '申請 EITC 為什麼退稅比較晚？',
    a: '依法律規定，申請 EITC 或額外兒童抵稅額的稅表，IRS 不能在 2 月中旬之前發放退稅。這適用於整筆退稅，而不只是抵稅額的部分。',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '有子女家庭的另一項主要抵稅額。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '為什麼可退還的抵稅額很重要。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '持有 ITIN 能申請和不能申請的項目。',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: '兒童稅（Kiddie Tax）：孩子的投資所得何時按父母稅率課稅',
    desc:  '另一項取決於投資所得的規定。',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: '報稅身分與戶長身分：2025 與 2026 年規定',
    desc:  '選擇正確的報稅身分，包括戶長身分。',
  },
]

export default function EarnedIncomeTaxCreditZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '勞動所得抵稅額（EITC）：2025 與 2026 年收入上限與規定 | AskLinTax 繁體中文',
      description: 'EITC 說明：2025 與 2026 年最高抵稅額與收入上限、勞動所得、合格子女、有效的 SSN 與 ITIN、投資所得上限、分居配偶、Form 2555、Schedule EIC，以及退稅時間。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>勞動所得抵稅額（EITC）</strong>是給有工作、中低收入者的聯邦抵稅額。它是<strong>可退還的</strong>，所以即使你不用繳稅，也可能拿到退稅。<strong>2025</strong> 年的最高抵稅額，從沒有合格子女的 <strong>$649</strong>，到三個以上子女的 <strong>$8,046</strong>；<strong>2026</strong> 年則從 <strong>$664</strong> 到 <strong>$8,231</strong>。你需要有勞動所得、有效的 SSN、投資所得在上限以下，而且收入低於你家庭人數適用的逐步減少上限。
        </p>

        <h2>誰可以申請：所有人都要符合的規定</h2>
        <p>Publication 596（2025）列出每位申請人都必須符合的規定：</p>
        <ul>
          <li><strong>有效的 SSN：</strong>你（合併申報時還有你的配偶）必須有可用於工作、且在報稅截止日（含延期）之前核發的 SSN。ITIN 不符合資格。</li>
          <li><strong>報稅身分：</strong>已婚者一般必須合併申報，除非適用分居配偶的特別規定。</li>
          <li><strong>全年是公民或居民：</strong>如果你年度中有任何時間是非居民外國人，只有在與美國公民或居民配偶合併申報、並選擇被視為美國居民時，才能申請。</li>
          <li><strong>不能申報 Form 2555：</strong>如果你排除海外工作所得或海外住房金額，就不能申請。</li>
          <li><strong>投資所得上限：</strong>2025 年不超過 <strong>$11,950</strong>，2026 年不超過 <strong>$12,200</strong>。</li>
          <li><strong>勞動所得：</strong>你必須有勞動所得，而且你的 AGI 與勞動所得都必須低於下列上限。</li>
        </ul>

        <h2>哪些算勞動所得</h2>
        <ArticleTable
          head={['算勞動所得', '不算']}
          rows={[
            ['應稅的工資、薪水與小費', '利息、股利與資本利得'],
            ['自雇淨收入', '社會安全福利與退休金'],
            ['法定員工（statutory employee）的總收入', '失業給付與子女撫養費'],
            ['家庭雇員的工資與未申報的小費', '不課稅的薪酬，例如某些受扶養人照顧福利'],
          ]}
        />
        <p>
          不課稅的戰鬥薪資是例外：你可以選擇把它算進去。投資所得不能幫你符合資格，而且超過上限時會讓你失去資格。
        </p>

        <h2>2025 與 2026 年金額</h2>
        <ArticleTable
          head={['2025', '沒有合格子女', '1 名子女', '2 名子女', '3 名以上']}
          rows={[
            ['最高抵稅額', '$649', '$4,328', '$7,152', '$8,046'],
            ['取得最高額所需的勞動所得', '$8,490', '$12,730', '$17,880', '$17,880'],
            ['開始逐步減少（夫妻合併申報）', '$17,730', '$30,470', '$30,470', '$30,470'],
            ['達到或超過此金額即無抵稅額（夫妻合併申報）', '$26,214', '$57,554', '$64,430', '$68,675'],
            ['開始逐步減少（其他所有申報人）', '$10,620', '$23,350', '$23,350', '$23,350'],
            ['達到或超過此金額即無抵稅額（其他所有申報人）', '$19,104', '$50,434', '$57,310', '$61,555'],
          ]}
        />
        <ArticleTable
          head={['2026', '沒有合格子女', '1 名子女', '2 名子女', '3 名以上']}
          rows={[
            ['最高抵稅額', '$664', '$4,427', '$7,316', '$8,231'],
            ['取得最高額所需的勞動所得', '$8,680', '$13,020', '$18,290', '$18,290'],
            ['開始逐步減少（夫妻合併申報）', '$18,140', '$31,160', '$31,160', '$31,160'],
            ['達到或超過此金額即無抵稅額（夫妻合併申報）', '$26,820', '$58,863', '$65,899', '$70,244'],
            ['開始逐步減少（其他所有申報人）', '$10,860', '$23,890', '$23,890', '$23,890'],
            ['達到或超過此金額即無抵稅額（其他所有申報人）', '$19,540', '$51,593', '$58,629', '$62,974'],
          ]}
        />
        <p>
          這些金額來自 Rev. Proc. 2024-40 與 Rev. Proc. 2025-32。逐步減少是以你的 AGI 計算，如果勞動所得較高，則以勞動所得計算。「其他所有申報人」欄也適用於依分居配偶規定分開申報的已婚者。你確切的抵稅額要查 Form 1040 填寫說明中的 EIC Table。
        </p>

        <h2>合格子女</h2>
        <p>合格子女必須通過四項測試：</p>
        <ul>
          <li><strong>關係：</strong>你的兒子、女兒、繼子女、寄養子女或他們的後代；或你的兄弟姊妹、同父異母或同母異父的兄弟姊妹、繼兄弟姊妹，或他們的後代。</li>
          <li><strong>年齡：</strong>年底未滿 19 歲且比你（合併申報時為你或配偶）年輕；如果是全職學生，未滿 24 歲且比你年輕；或永久且完全身心障礙者，不論年齡。</li>
          <li><strong>居住：</strong>和你在美國同住超過半年。</li>
          <li><strong>合併申報：</strong>子女一般不能在該年度合併申報。</li>
        </ul>
        <p>
          子女也需要在報稅截止日之前取得有效的 SSN，你才能申請較高的抵稅額。同一個孩子只能由一個人申請；由 Publication 596 中的優先順序規定（tie-breaker rules）決定由誰申請。
        </p>

        <h2>沒有合格子女的工作者</h2>
        <ul>
          <li><strong>年齡：</strong>2025 年，年底時至少 25 歲但未滿 65 歲（合併申報時，任一方配偶符合即可）。</li>
          <li><strong>不是受扶養人</strong>，也不是其他人的合格子女。</li>
          <li><strong>住在美國：</strong>你的主要住所在美國超過半年。</li>
        </ul>

        <h2>範例（說明用，2025 年）</h2>
        <ArticleTable
          head={['', 'Rosa', 'Dan', 'Lee 一家']}
          rows={[
            ['報稅身分', '戶長', '單身', '夫妻合併申報'],
            ['合格子女', '2', '無（30 歲）', '1'],
            ['勞動所得與 AGI', '$20,000', '$9,000', '$60,000'],
            ['投資所得', '$0', '$0', '$300'],
            ['收入落在哪裡', '高於 $17,880，且低於開始逐步減少的 $23,350', '高於 $8,490，且低於開始逐步減少的 $10,620', '高於 $57,554 的上限'],
            ['2025 年 EITC', '$7,152（最高額）', '$649（最高額）', '無'],
          ]}
        />
        <p>
          如果 Rosa 還有 <strong>$12,000</strong> 的利息收入，她 2025 年就拿不到 EITC，因為她的投資所得會超過 $11,950——光是這項測試就讓她失去資格，還不用考慮利息會讓她的 AGI 提高到 $32,000。範例假設所有勞動所得都是工資、每個人都有有效的 SSN、Dan 不是任何人的受扶養人且全年住在美國、每個孩子都通過四項合格子女測試，而且其他所有規定都符合。
        </p>

        <h2>Schedule EIC 與申報</h2>
        <ul>
          <li><strong>Schedule EIC：</strong>如果你有符合合格子女條件的孩子，即使孩子沒有有效的 SSN，也要附在 Form 1040 上。</li>
          <li><strong>還沒有 SSN：</strong>如果你在報稅截止日（含延期）之前沒有有效的 SSN，就不能在該年度的原始稅表或修正稅表上申請 EITC。Publication 596 指出，申請 Form 4868 延期可以給你更多時間取得 SSN。</li>
          <li><strong>退稅時間：</strong>申請 EITC 的稅表，退稅不能在 2 月中旬之前發放。</li>
          <li><strong>先前被拒絕：</strong>如果你以前年度的 EITC 因數學或書寫錯誤以外的原因被拒絕或減少，再次申請前可能需要申報 Form 8862。</li>
        </ul>

        <h2>2026 年注意事項</h2>
        <p>
          上面的 2026 年金額已經定案（Rev. Proc. 2025-32）。本文的其他規定來自 2025 年版 Publication 596；2026 年版發布後請再確認。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>因為收入低於報稅門檻就不報稅</strong>——必須報稅才能拿到抵稅額。</li>
          <li><strong>申請沒有和你在美國同住超過半年的孩子。</strong></li>
          <li><strong>兩個人申請同一個孩子。</strong></li>
          <li><strong>漏算投資所得</strong>，例如利息、股利或資本利得。</li>
          <li><strong>同住卻分開申報</strong>——這一般會讓你無法申請。</li>
          <li><strong>用 ITIN</strong> 或不能用於工作的 SSN 申請。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>自雇所得、由多位親屬申請的孩子、被拒絕後的重新認證，以及神職人員、軍人與身心障礙所得的規定都可能很複雜。本文不涵蓋州的勞動所得抵稅額。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

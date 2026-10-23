import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-penalty-relief.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-penalty-relief',
  sourceHash:      '2b8665349a62',
  id:            '104',
  title:         'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因',
  titleEn:       'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 罰款、行政減免、合理原因與罰款上訴網頁，以及 IRS 說明文件 FS-2026-12，說明 IRS 對逾期申報、逾期繳稅與逾期存款罰款的減免，包括 2026 年開始的自動罰款豁免（AEP）、首次罰款減免與合理原因。本文不詳細涵蓋準確性相關罰款、資訊申報罰款、國際資訊申報罰款，也不涵蓋州的罰款',
  persona:       ['逾期申報或繳稅並收到罰款通知的人', '過去申報紀錄良好、只有一年逾期的納稅人', '因生病或災害而逾期申報的人', '逾期存款的家庭與小型企業雇主'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '閱讀通知，確認被收取的是哪一種罰款、哪一個年度；確認自動減免是否已經適用；如果沒有，請撥打通知上的電話申請首次罰款減免或合理原因減免，或寄出 Form 843 並附上說明與文件。',
  sources: [
    { label: 'IRS — 行政罰款減免（First Time Abate 與自動罰款豁免）', url: 'https://www.irs.gov/payments/administrative-penalty-relief' },
    { label: 'IRS — FS-2026-12，自動罰款豁免：納稅人須知', url: 'https://www.irs.gov/newsroom/automatic-exemption-from-penalty-what-taxpayers-should-know' },
    { label: 'IRS — 合理原因的罰款減免（Penalty relief for reasonable cause）', url: 'https://www.irs.gov/payments/penalty-relief-for-reasonable-cause' },
    { label: 'IRS — 逾期申報罰款（Failure to file penalty）', url: 'https://www.irs.gov/payments/failure-to-file-penalty' },
    { label: 'IRS — 逾期繳稅罰款（Failure to pay penalty）', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
    { label: 'IRS — 逾期存款罰款（Failure to deposit penalty）', url: 'https://www.irs.gov/payments/failure-to-deposit-penalty' },
    { label: 'IRS — 罰款上訴（Penalty appeal）', url: 'https://www.irs.gov/appeals/penalty-appeal' },
    { label: 'IRS — 關於 Form 843，退款申請與減免要求', url: 'https://www.irs.gov/forms-pubs/about-form-843' },
  ],
}

const FAQS = [
  {
    q: '自動罰款豁免需要申請嗎？',
    a: '不需要。只要你符合條件，包括前三年（或連續 12 季）都準時遵循，IRS 會在處理符合資格的原始稅表時套用 AEP。如果適用，你會收到通知，說明罰款沒有被核定。如果你認為自己符合資格卻被收取罰款，請聯絡 IRS。',
  },
  {
    q: '首次罰款減免會取消嗎？',
    a: '它正分階段被取代。IRS 指出，在過渡期間，首次罰款減免仍適用於某些稅表；對於截止日在 2027 年 1 月 1 日或之後的原始稅表，將不再提供首次罰款減免，改由 AEP 取代。',
  },
  {
    q: '罰款減免也會取消利息嗎？',
    a: '減免會取消罰款以及對該罰款收取的利息；IRS 指出，當它減少或取消罰款時，會自動減少或取消相關的利息。但它不會取消你應繳的稅，也不會取消這筆稅的利息。',
  },
  {
    q: '是我的報稅代理人逾期申報的，這算合理原因嗎？',
    a: '一般不算。IRS 指出，即使由別人處理你的稅務，你一般仍要自己負責遵守稅法；而且不了解規定、錯誤與缺乏資金，本身一般都不算逾期申報或繳稅的合理原因。',
  },
  {
    q: '預估稅罰款可以減免嗎？',
    a: '不能透過合理原因或這些行政減免。IRS 指出，合理原因不適用於某些罰款，例如預估稅罰款；這項罰款在 Form 2210 上有自己的豁免規定。AEP 也不涵蓋準確性相關罰款或資訊申報罰款。',
  },
  {
    q: 'IRS 拒絕了我的申請，我還能怎麼做？',
    a: '如果你提出了書面申請，並收到附有上訴權利的拒絕信，你一般可以在信件日期起 30 天內，要求 IRS 獨立上訴辦公室（Independent Office of Appeals）舉行會議。請查看信件上的期限。',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: '錯過報稅截止日，現在該怎麼辦？',
    desc:  '如果你還沒報稅，先做什麼。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '分期付款計畫也會降低逾期繳稅罰款的費率。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如何閱讀並確認 IRS 通知。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '預估稅罰款的規定不一樣。',
  },
]

export default function IrsPenaltyReliefZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 罰款減免：自動罰款豁免、首次罰款減免與合理原因 | AskLinTax 繁體中文',
      description: '如何請 IRS 取消罰款：逾期申報、逾期繳稅與逾期存款罰款、2026 年的自動罰款豁免、首次罰款減免、合理原因、Form 843、利息，以及上訴。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          IRS 可以取消——或在新計畫下根本不核定——某些逾期申報、逾期繳稅或逾期存款的罰款。主要有三種方式：2026 年夏天開始、不需申請的<strong>自動罰款豁免（AEP）</strong>；需要你提出申請的<strong>首次罰款減免（First Time Abate，FTA）</strong>；以及取決於個別事實的<strong>合理原因</strong>。減免只針對罰款，不包括稅本身，而且不是每一種罰款都適用。如果你還沒報稅，請先看<a href="/zh-tw/library/irs/missed-tax-deadline/">錯過報稅截止日</a>。
        </p>

        <h2>這些規定涵蓋的罰款</h2>
        <ArticleTable
          head={['罰款', '計算方式']}
          rows={[
            ['逾期申報', '每逾期一個月（或不足一個月）收取未繳稅款的 5%，最高 25%。如果逾期超過 60 天，有最低金額：100% 的應繳稅款，或 $525（截止日在 2025 年 12 月 31 日之後的稅表）或 $510（截止日在 2025 年的稅表），取較小者'],
            ['逾期繳稅', '每月（或不足一個月）收取未繳稅款的 0.5%，最高 25%；如果你準時申報，在核准的分期付款計畫期間為 0.25%；收到強制執行意向通知後 10 天仍未繳，則為 1%'],
            ['同一個月兩者都有', '逾期申報罰款會減去該月的逾期繳稅罰款（例如 4.5% 加 0.5%）'],
            ['逾期存款（雇主）', '2%（逾期 1–5 天）、5%（6–15 天）、10%（超過 15 天），或在某些 IRS 通知之後為 15%'],
          ]}
        />

        <h2>三種減免</h2>
        <ArticleTable
          head={['', '自動罰款豁免（AEP）', '首次罰款減免（FTA）', '合理原因']}
          rows={[
            ['需要申請嗎？', '不需要——在處理原始稅表時套用', '需要——打電話或書面申請', '需要——打電話或書面申請'],
            ['主要條件', '前 3 年（或 12 季）準時遵循', '前 3 年（或 12 季）準時遵循', '你已盡到一般的注意與謹慎，但因生病或災害等情況而無法遵循'],
            ['適用年度', '2025 稅務年度稅表與 2026 年季度稅表起', '較早的期間，以及過渡期間未納入 AEP 考量的稅表；截止日在 2027 年 1 月 1 日或之後的原始稅表不適用', '任何年度，逐案判斷'],
            ['會先核定罰款嗎？', '不會——不核定罰款，逾期繳稅罰款也不會累計', '會——先核定再取消；逾期繳稅罰款在繳清前可能繼續累計', '會——先核定再取消'],
          ]}
        />

        <p>
          <strong>不是每一份逾期稅表都符合資格。</strong>FS-2026-12 指出，AEP 並非適用於每一位逾期申報的人：只有在符合所有條件時，才適用於符合資格的稅表與罰款。如果你不符合資格，罰款仍可能被核定，你仍可以申請首次罰款減免（在仍適用的情況下）或合理原因減免。
        </p>

        <h2>良好的遵循紀錄</h2>
        <p>不論 AEP 或 FTA，IRS 都會看：</p>
        <ul>
          <li><strong>前三年</strong>（季度稅表為連續 12 季）都準時申報同一類稅表；以及</li>
          <li>這段期間<strong>沒有罰款</strong>，預估稅罰款除外——或罰款後來因合理原因或 IRS 錯誤而被取消。</li>
        </ul>
        <p>
          企業還必須在這段期間沒有四次或以上的逾期存款罰款被豁免，也沒有因規避 EFTPS 而被處以存款罰款。
        </p>

        <h2>哪些不適用</h2>
        <ul>
          <li><strong>AEP 與 FTA</strong> 只涵蓋逾期申報、逾期繳稅與逾期存款罰款。適用 AEP 的稅表是 Forms 1040、1065、1120、940、941、943、944、945 與 CT-1。</li>
          <li>它們不適用於只申報一次或不定期申報的稅表（依事件發生而申報）、每日逾期罰款，或取決於另一項申報的資訊申報。FS-2026-12 補充說明，AEP 不適用於準確性相關罰款或資訊申報罰款。</li>
          <li><strong>合理原因</strong>不適用於某些罰款，例如預估稅罰款。</li>
        </ul>

        <h2>合理原因</h2>
        <p>IRS 逐案判斷合理原因。對於逾期申報或繳稅，IRS 舉的例子包括：</p>
        <ul>
          <li>火災、天然災害或社會動亂；</li>
          <li>無法取得紀錄；</li>
          <li>納稅人或直系親屬死亡、重病或無法避免的不在場；以及</li>
          <li>系統問題延誤了準時的電子申報或付款。</li>
        </ul>
        <p>
          一般<strong>不</strong>足以單獨成立的理由：依賴稅務專業人士、不了解規定、錯誤或疏忽，以及缺乏資金。
        </p>

        <h2>如何申請減免</h2>
        <ul>
          <li><strong>打電話：</strong>撥打通知上的免付費電話。準備好通知、你想取消的罰款，以及你的理由。如果你申請合理原因，但符合 FTA，IRS 會套用 FTA。</li>
          <li><strong>書面申請：</strong>如果電話中沒有核准，或你比較喜歡書面，請把 <strong>Form 843</strong> 或書面說明寄到 Form 843 填寫說明中的地址。</li>
          <li><strong>要說明什麼：</strong>發生了什麼事、什麼時候發生、它如何讓你無法申報或繳稅，以及你曾如何努力遵循。</li>
          <li><strong>文件：</strong>例如註明日期的醫院紀錄或醫生證明、災害證明，以及相關信件或收據的副本。</li>
        </ul>

        <h2>範例：回應罰款通知（說明用）</h2>
        <p>
          <strong>Jordan</strong> 在 2026 年 6 月 10 日申報 2025 年 Form 1040——逾期不到兩個月，沒有申請延期——並在申報時繳清 $4,000 的應繳稅款。
        </p>
        <ArticleTable
          head={['情況', '結果']}
          rows={[
            ['Jordan 2022、2023 與 2024 年都準時申報並繳稅，沒有罰款', '處理 2025 年稅表時應該會自動套用 AEP：不核定逾期申報或逾期繳稅罰款，Jordan 會收到說明原因的通知。逾期繳納的稅款仍要計算利息'],
            ['Jordan 2023 年有一筆沒有被取消的逾期申報罰款', 'AEP 與 FTA 都不適用。罰款約為逾期申報 $360（2 個月 × 4.5% × $4,000）與逾期繳稅 $40（2 個月 × 0.5% × $4,000），另加利息'],
            ['Jordan 從 2026 年 3 月到 5 月住院', 'Jordan 撥打通知上的電話申請合理原因減免，並提供註明日期的住院紀錄。如果被拒絕，Jordan 可以寄出 Form 843，並在收到書面拒絕後提出上訴'],
          ]}
        />
        <p>
          這個例子不適用逾期申報的最低罰款，因為稅表逾期沒有超過 60 天。
        </p>

        <h2>如果申請被拒絕</h2>
        <p>
          對於逾期申報或逾期繳稅罰款的<strong>書面</strong>取消申請被拒絕時，你可以向 IRS 獨立上訴辦公室上訴，一般要在拒絕信日期起 <strong>30 天</strong>內提出（請查看信件上的期限）。Publication 4576 有概要說明。你也可以向低收入納稅人診所（Low Income Taxpayer Clinic）或納稅人權益服務處（Taxpayer Advocate Service）尋求協助。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「減免會取消我欠的錢。」</strong>它取消的是罰款，不是稅款或稅款的利息。</li>
          <li><strong>「每一種罰款都可以豁免。」</strong>很多罰款（包括預估稅罰款）有不同的規定。</li>
          <li><strong>「有 AEP 就可以晚點報稅。」</strong>IRS 指出 AEP 並沒有取消法律規定的罰款。</li>
          <li><strong>「我必須指名要首次罰款減免。」</strong>你不需要指定 FTA；IRS 會檢查你是否符合資格。</li>
          <li><strong>「先繳錢會讓申請失效。」</strong>你可以在繳款後申請減免；繳款可以讓逾期繳稅罰款與利息停止增加。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>多個年度的罰款、準確性相關罰款、國際資訊申報罰款（例如 Forms 3520 或 5471）、企業存款罰款與上訴都可能很複雜。本文不涵蓋州的罰款。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

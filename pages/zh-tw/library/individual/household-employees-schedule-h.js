import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/household-employees-schedule-h.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'household-employees-schedule-h',
  sourceHash:      '14b3a32a5d35',
  id:            '103',
  title:         '聘請保母或看護：家庭雇員稅與 Schedule H',
  titleEn:       'Paying a Nanny or Caregiver: Household Employment Taxes and Schedule H',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 926（2026）、Publication 926（2025）與 2025 年 Schedule H（Form 1040）填寫說明，說明 2025 與 2026 稅務年度的聯邦家庭雇傭稅。本文只涵蓋聯邦規定；州雇傭稅、州失業保險、勞工賠償保險與勞動法不在範圍內',
  persona:       ['付錢請保母或臨時保母的家庭', '幫父母付看護費的成年子女', '請管家或私人護士的家庭', '付錢請親戚幫忙照顧的家庭'],
  relatedJourney: ['有受扶養人的報稅', '準備報稅'],
  actionRequired: '判斷這位工作者是不是你的雇員，確認該年度的現金工資測試與 FUTA 測試，申請 EIN，代扣雇員的社會安全稅與聯邦醫療保險稅，提供 Form W-2，和 Form 1040 一起申報 Schedule H，並另外確認你所在州的規定。',
  sources: [
    { label: 'IRS — Publication 926（2026），家庭雇主稅務指南', url: 'https://www.irs.gov/publications/p926' },
    { label: 'IRS — Publication 926（2025），家庭雇主稅務指南', url: 'https://www.irs.gov/pub/irs-prior/p926--2025.pdf' },
    { label: 'IRS — 2025 年 Schedule H（Form 1040）填寫說明，家庭雇傭稅', url: 'https://www.irs.gov/pub/irs-pdf/i1040sh.pdf' },
    { label: 'IRS — 認識稅務詐騙（Recognize tax scams and fraud）', url: 'https://www.irs.gov/help/tax-scams/recognize-tax-scams-and-fraud' },
  ],
}

const FAQS = [
  {
    q: '一個月來幾次的臨時保母算我的雇員嗎？',
    a: '如果你能控制做什麼工作以及怎麼做，這位工作者一般就是你的雇員，不論全職或兼職。但只有在符合現金工資測試（每位雇員 2025 年 $2,800、2026 年 $3,000）或每季 $1,000 的 FUTA 測試時，你才需要繳聯邦家庭雇傭稅。',
  },
  {
    q: '如果是透過仲介聘請的呢？',
    a: 'Publication 926 指出，如果是仲介派人，而且由仲介控制做什麼工作以及怎麼做，這位工作者就不是你的雇員。只是從仲介提供的名單中挑選人選，並不會改變這位工作者是你雇員的事實。',
  },
  {
    q: '我一定要代扣聯邦所得稅嗎？',
    a: '不用。你不需要從家庭雇員的工資中代扣聯邦所得稅。只有在雇員要求、你也同意時，才依雇員的 Form W-4 代扣。',
  },
  {
    q: '我付錢請我媽媽照顧孩子，要繳這些稅嗎？',
    a: '付給父母的工資，一般不計入社會安全稅與聯邦醫療保險稅，也從不計入 FUTA。例外：如果你的父母照顧你未滿 18 歲（或因身心狀況需要成人照顧）的孩子，而且你離婚未再婚、喪偶，或與因身心狀況無法照顧孩子的配偶同住，這些工資就要計入社會安全稅與聯邦醫療保險稅。',
  },
  {
    q: '我不需要報稅，還要申報 Schedule H 嗎？',
    a: '要。如果你需要繳家庭雇傭稅，但不需要申報 Form 1040，Publication 926 指出你要單獨申報 Schedule H。',
  },
  {
    q: '付給保母的錢可以申請托育抵稅額嗎？',
    a: '如果保母照顧你未滿 13 歲的受扶養人（或無法自我照顧的配偶或受扶養人），讓你可以工作或找工作，工資以及你負擔的聯邦與州雇傭稅，可以算進兒童與受扶養人照顧抵稅額的照顧費用。',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-dependent-care-credit',
    cat:  'Individuals & Families',
    title: '兒童與受扶養人照顧抵稅額：2025 與 2026 年規定與範例',
    desc:  '保母工資與雇傭稅可以算進照顧費用。',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 與 1099：有什麼差別？為什麼重要？',
    desc:  '雇員或獨立承包人。',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation',
    title: '如何申請 EIN：逐步指南',
    desc:  '家庭雇主申報 Form W-2 與 Schedule H 需要 EIN。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  '在年度中繳納家庭雇傭稅。',
  },
]

export default function HouseholdEmployeesScheduleHZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '聘請保母或看護：家庭雇員稅與 Schedule H | AskLinTax 繁體中文',
      description: '家庭雇傭稅說明：誰是家庭雇員、2025 年 $2,800 與 2026 年 $3,000 的現金工資門檻、社會安全稅與聯邦醫療保險稅、$1,000 的 FUTA 測試、家人例外、EIN、Form W-2、Schedule H、截止日，以及托育抵稅額。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你付錢請人在你家中或周圍工作——保母、看護或管家——而且由你控制工作怎麼做，這個人一般就是你的<strong>家庭雇員</strong>。如果你在 <strong>2025</strong> 年付給一位雇員 <strong>$2,800 以上</strong>的現金工資（<strong>2026</strong> 年為 <strong>$3,000</strong>），或在任何一季付出的現金工資總額達 <strong>$1,000 以上</strong>，你就要繳聯邦雇傭稅。這些稅和你的 Form 1040 一起在 <strong>Schedule H</strong> 上申報，並要給雇員一份 <strong>Form W-2</strong>。州的規定另外計算。
        </p>

        <h2>誰是家庭雇員</h2>
        <ul>
          <li><strong>家務工作：</strong>在你的私人住所內或周圍的工作，例如臨時保母、保母、看管人、健康助理、私人護士、管家、廚師、司機與庭院工人。</li>
          <li><strong>控制測試：</strong>如果你不只能控制做什麼工作，還能控制怎麼做，這位工作者就是你的雇員。全職或兼職、按小時或按件計酬都沒有差別。</li>
          <li><strong>不是你的雇員：</strong>自己控制工作方式、通常自備工具並對大眾提供服務的自雇工作者；由仲介派遣並控制的工作者；或在他們自己家中照顧你孩子的人。</li>
          <li><strong>不算家務工作：</strong>私人秘書、家教或圖書管理員等服務，即使在你家中進行也不算。</li>
        </ul>
        <p>
          明知對方不能在美國合法工作還聘用或繼續僱用，是違法的；Publication 926 說明了 Form I-9 的驗證方式。
        </p>

        <h2>聯邦測試</h2>
        <ArticleTable
          head={['測試', '2025', '2026', '符合時要繳什麼']}
          rows={[
            ['付給任何一位家庭雇員的現金工資', '$2,800 以上', '$3,000 以上', '對該雇員所有現金工資繳社會安全稅與聯邦醫療保險稅'],
            ['任何一季付給所有家庭雇員的現金工資總額', '$1,000 以上', '$1,000 以上', 'FUTA（聯邦失業）稅'],
            ['社會安全稅工資上限', '$176,100', '$184,500', '超過的工資不課社會安全稅'],
          ]}
        />
        <p>
          如果兩項測試都不符合，你就不用繳聯邦雇傭稅——但仍可能要繳州的雇傭稅。
        </p>

        <h2>社會安全稅與聯邦醫療保險稅</h2>
        <ul>
          <li><strong>稅率：</strong>雇員負擔 6.2% 社會安全稅與 1.45% 聯邦醫療保險稅，你也負擔相同金額——各 7.65%，合計 15.3%。</li>
          <li><strong>代扣：</strong>你從雇員的薪資中代扣雇員的 7.65%。你也可以用自己的錢支付雇員的部分；Publication 926 指出，這筆金額要計入雇員的所得稅工資（Form W-2 第 1 欄），但不算社會安全稅、聯邦醫療保險稅或 FUTA 的工資。</li>
          <li><strong>額外聯邦醫療保險稅：</strong>一年工資超過 $200,000 的部分，要代扣 0.9%（只由雇員負擔）。</li>
        </ul>

        <h2>不計入的工資</h2>
        <ArticleTable
          head={['付給', '社會安全稅與聯邦醫療保險稅', 'FUTA']}
          rows={[
            ['你的配偶', '不計入', '不計入'],
            ['你未滿 21 歲的子女', '不計入', '不計入'],
            ['你的父母', '不計入，除非適用父母照顧者的例外', '不計入'],
            ['年度中任何時候未滿 18 歲的雇員', '不計入，除非家務工作是他們的主要職業（學生不算）', '計入'],
          ]}
        />

        <h2>FUTA 稅</h2>
        <p>
          如果你符合每季 $1,000 的測試，FUTA 稅是每位雇員全年前 <strong>$7,000</strong> 現金工資的 <strong>6.0%</strong>。你可以就州失業保險提撥取得最多 <strong>5.4%</strong> 的抵免，使淨稅率為 <strong>0.6%</strong>；如果州提撥在次年 4 月 15 日之後才繳，抵免以 90% 為限，在抵免減少州（credit reduction state）支付的工資，抵免也會減少。
        </p>

        <h2>聯邦所得稅代扣</h2>
        <p>
          你<strong>不需要</strong>代扣聯邦所得稅。只有在雇員要求、你也同意時，才依雇員的 Form W-4 代扣。
        </p>

        <h2>範例（說明用，2026 年）</h2>
        <p>
          <strong>Emily</strong> 2026 年付給她的保母（不是親戚、已滿 18 歲）每週 $600，共 50 週——現金工資 <strong>$30,000</strong>。兩項測試都符合。假設：所有工資都是現金；Emily 每次發薪時代扣雇員負擔的部分；她沒有代扣聯邦所得稅（保母沒有要求）；工資低於 $184,500 的社會安全稅工資上限與 $200,000 的額外聯邦醫療保險稅門檻；Emily 在 2027 年 4 月 15 日之前繳清所有州失業保險提撥，而且她的州不是抵免減少州，所以可以取得全額 5.4% 的 FUTA 抵免。
        </p>
        <ArticleTable
          head={['項目', '金額']}
          rows={[
            ['代扣雇員的社會安全稅：6.2% × $30,000', '$1,860'],
            ['代扣雇員的聯邦醫療保險稅：1.45% × $30,000', '$435'],
            ['Emily 自己負擔的社會安全稅：6.2% × $30,000', '$1,860'],
            ['Emily 自己負擔的聯邦醫療保險稅：1.45% × $30,000', '$435'],
            ['Emily 的 FUTA 稅：0.6% × $7,000', '$42'],
            ['Schedule H 上的聯邦家庭雇傭稅合計', '$4,632'],
            ['其中從保母薪資代扣', '$2,295'],
            ['其中 Emily 自己的成本', '$2,337'],
          ]}
        />
        <p>
          Emily 要在 <strong>2027 年 2 月 1 日</strong>之前給保母 Form W-2，並在 <strong>2027 年 4 月 15 日</strong>之前和她 2026 年的 Form 1040 一起申報 Schedule H。為了避免少繳稅的罰款，她可以在 2026 年提高自己工作的預扣稅，或繳預估稅。
        </p>

        <h2>要申報什麼、什麼時候</h2>
        <ArticleTable
          head={['步驟', '2025 年工資', '2026 年工資']}
          rows={[
            ['申請雇主識別號碼（EIN）', '申報 Form W-2 之前', '申報 Form W-2 之前'],
            ['給雇員 Form W-2；把 Copy A 與 Form W-3 寄給 SSA', '2026 年 2 月 2 日之前', '2027 年 2 月 1 日之前'],
            ['和 Form 1040 一起申報 Schedule H（不需要報稅時單獨申報）', '2026 年 4 月 15 日之前', '2027 年 4 月 15 日之前'],
          ]}
        />
        <p>
          Publication 926 指出，如果你沒有代扣聯邦所得稅，而且雇員的社會安全稅與聯邦醫療保險稅工資低於該年度的門檻，就不用把 Form W-2 寄給 SSA。你為家庭雇員申報的表格上必須填寫你的 EIN；如果你已經有 EIN（例如作為獨資經營者），就使用它。
        </p>

        <h2>在年度中繳稅</h2>
        <p>
          家庭雇傭稅會加到你 Form 1040 的所得稅上。Publication 926 建議在年度中繳納：請雇主從你的工資多預扣一些、請退休金給付人多預扣，或繳納或增加預估稅。否則你可能要繳預估稅罰款。
        </p>

        <h2>州的規定另外計算</h2>
        <p>
          Publication 926 提醒家庭雇主向所在州查詢州失業稅與其他州雇傭稅。各州的門檻、登記、工資與保險規定可能不同。本文只涵蓋聯邦規定。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>把保母當成獨立承包人</strong>，開 Form 1099 而不是 W-2。</li>
          <li><strong>用錯年度的門檻</strong>——2025 年 $2,800，2026 年 $3,000。</li>
          <li><strong>季度工資達到 $1,000 時忘了 FUTA。</strong></li>
          <li><strong>以為家人一定免稅</strong>——照顧你孩子的父母可能要計入，成年的兄弟姊妹也不免稅。</li>
          <li><strong>忽略州的規定。</strong></li>
          <li><strong>落入退稅騙局：</strong>IRS 已警告社群媒體上誤導人申請不實家庭雇傭稅退稅的說法。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>住家型雇員、非現金工資、與其他家庭共用的工作者、仲介安排、更正過去年度，以及透過政府計畫支付的看護，都可能很複雜。本文不涵蓋州的薪資、失業保險與勞動法規定。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

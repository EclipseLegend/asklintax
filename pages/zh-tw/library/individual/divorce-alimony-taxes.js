import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/divorce-alimony-taxes.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'divorce-alimony-taxes',
  sourceHash:      'c4879960af2a',
  id:            '113',
  title:         '離婚與稅務：贍養費、子女撫養費、財產與退休帳戶',
  titleEn:       'Divorce and Taxes: Alimony, Child Support, Property, and Retirement Accounts',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 504（2025）「Divorced or Separated Individuals」，說明離婚與分居者的聯邦所得稅規定。本文不提供州家庭法、監護權或財產分配的法律建議，對夫妻共同財產規定只做簡要說明；詳情請見 Publication 555',
  persona:       ['正在離婚或分居的人', '共同監護孩子的父母', '支付或收到贍養費的人', '分割退休帳戶或房屋的配偶'],
  relatedJourney: ['有受扶養人的報稅', '準備報稅'],
  actionRequired: '確認你的離婚或分居文件簽立或修改的日期，決定每個孩子的監護方父母是誰，並確保分割退休帳戶時使用 QDRO 或因離婚而進行的移轉。',
  sources: [
    { label: 'IRS — Publication 504（2025），離婚或分居者', url: 'https://www.irs.gov/publications/p504' },
    { label: 'IRS — Publication 501（2025），受扶養人、標準扣除額與報稅資訊', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — Form 8332，監護方父母放棄或撤銷子女申報權', url: 'https://www.irs.gov/forms-pubs/about-form-8332' },
    { label: 'IRS — Publication 555，夫妻共同財產', url: 'https://www.irs.gov/publications/p555' },
  ],
}

const FAQS = [
  {
    q: '我收到的贍養費要課稅嗎？',
    a: '取決於你的離婚或分居文件何時簽立。2018 年以後簽立的文件，贍養費對你不課稅，支付方也不能扣除。2019 年以前簽立的文件，通常對你課稅、支付方可以扣除 — 除非文件在 2018 年以後修改，而且修改內容明確表示適用新規定。',
  },
  {
    q: '子女撫養費要課稅或可以扣除嗎？',
    a: '都不行。離婚或分居文件中明確指定為子女撫養費的款項不是贍養費。支付方不能扣除，收受方也不用課稅。如果支付方付的金額少於兩者合計應付的金額，款項會先算作子女撫養費，再算作贍養費。',
  },
  {
    q: '誰可以申報孩子？',
    a: '通常是監護方父母 — 孩子在當年度和他同住夜數較多的一方。監護方父母可以簽署 Form 8332（或類似聲明），讓非監護方父母申請兒童抵稅額、額外兒童抵稅額與其他受扶養人抵稅額。Form 8332 不會移轉戶長身分、勞動所得抵稅額或兒童與受扶養人照顧抵稅額。',
  },
  {
    q: '我的離婚在 12 月 30 日確定。那一年還可以合併申報嗎？',
    a: '不行。如果在年度最後一天之前已依最終判決離婚，整年都被視為未婚。你要以單身申報，符合條件的話可以用戶長身分。',
  },
  {
    q: '前配偶把房子移轉給我，我要繳稅嗎？',
    a: '通常不用。配偶之間的移轉，或因離婚而在前配偶之間的移轉，不認列利得或損失。你會承接移轉方的成本基礎，這在你日後出售時很重要。如果你的配偶或前配偶是非居民外國人，這項規定不適用。',
  },
  {
    q: '我還能扣除為前配偶存入的 IRA 嗎？',
    a: '不行。如果你在稅務年度結束前已取得離婚或分居扶養的最終判決，就不能扣除存入前配偶傳統 IRA 的金額。',
  },
]

const RELATED = [
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: '報稅身分與戶長身分：2025 與 2026 年規定',
    desc:  '離婚或分居後的報稅身分。',
  },
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: '兒童抵稅額（Child Tax Credit）：誰符合資格、如何申請',
    desc:  '申報孩子那一方父母適用的規定。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '退休帳戶分割後的提領。',
  },
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: '受損配偶與無辜配偶救濟：Form 8379 與 Form 8857',
    desc:  '合併申報時，免除前配偶稅務債務的救濟。',
  },
]

export default function DivorceAlimonyTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '離婚與稅務：贍養費、子女撫養費、財產與退休帳戶 | AskLinTax 繁體中文',
      description: '離婚如何影響你的聯邦稅：2019 年以前與 2018 年以後協議的贍養費、子女撫養費、報稅身分、哪一方父母申報孩子與 Form 8332、財產移轉、QDRO，以及 IRA。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          離婚會從幾個方面改變你的稅。<strong>贍養費</strong>的處理方式，取決於你的離婚或分居文件是在 <strong>2019 年以前還是 2018 年以後</strong>簽立。<strong>子女撫養費</strong>永遠不能扣除，也不用課稅。你的<strong>報稅身分</strong>取決於 12 月 31 日時是否已經離婚。<strong>監護方父母</strong>通常可以申報孩子。因離婚而在配偶之間移轉的財產通常<strong>不用課稅</strong>，退休帳戶如果正確處理，也可以免稅分割。
        </p>

        <h2>聯邦稅法 vs. 州家庭法</h2>
        <p>
          你是已婚、離婚還是依法分居，以及財產與扶養費如何分配，由州法決定。接著由聯邦稅法決定這些款項與移轉如何課稅。本文只說明聯邦稅務的部分。
        </p>

        <h2>贍養費：文件簽立的日期很重要</h2>
        <ArticleTable
          head={['離婚或分居文件', '支付方', '收受方']}
          rows={[
            ['2018 年以後簽立', '不能扣除', '不課稅'],
            ['2019 年以前簽立且未修改（或修改時未採用新規定）', '通常可以扣除', '通常要課稅'],
            ['2019 年以前簽立、2018 年以後修改，且修改內容明確表示適用新規定', '不能扣除', '不課稅'],
          ]}
        />
        <p>
          贍養費是依離婚或分居文件支付給配偶或前配偶，或為其支付的款項；文件以外的自願付款不是贍養費。單純修改 2019 年以前的文件 — 例如提高金額 — 並不會改適用新規定，除非修改內容明確這樣表示。依 2019 年以前文件收到的應稅贍養費，在 IRA 存款方面也算作報酬。
        </p>

        <h2>子女撫養費</h2>
        <ul>
          <li>明確指定為子女撫養費，或被視為指定的款項，不是贍養費。</li>
          <li>支付方不能扣除，也不計入收受方的所得。</li>
          <li>如果兩者都要付，而支付方付的少於合計金額，款項會先算作子女撫養費。</li>
        </ul>

        <h2>離婚或分居後的報稅身分</h2>
        <ul>
          <li><strong>12 月 31 日前已離婚：</strong>整年視為未婚 — 以單身或戶長身分申報。</li>
          <li><strong>12 月 31 日時仍已婚：</strong>已婚合併申報或已婚分開申報，除非你符合戶長身分「視為未婚」的全部條件。</li>
          <li><strong>年底前依分居扶養判決依法分居：</strong>視為未婚。</li>
        </ul>

        <h2>誰可以申報孩子</h2>
        <ul>
          <li><strong>監護方父母：</strong>孩子在當年度和他同住夜數較多的一方。</li>
          <li><strong>Form 8332：</strong>監護方父母可以把申報權放棄給非監護方父母，期間可以是 1 年、指定的年度或所有未來年度。非監護方父母每年都要附上。這讓非監護方父母可以申請兒童抵稅額、額外兒童抵稅額與其他受扶養人抵稅額。</li>
          <li><strong>不能移轉的項目：</strong>戶長身分、勞動所得抵稅額與兒童與受扶養人照顧抵稅額，仍屬於監護方父母。</li>
          <li><strong>撤銷：</strong>監護方父母可以用 Form 8332 第三部分撤銷放棄。</li>
        </ul>

        <h2>財產、房屋與退休帳戶</h2>
        <ArticleTable
          head={['移轉', '聯邦稅務處理']}
          rows={[
            ['移轉財產給配偶，或因離婚而移轉給前配偶', '不認列利得或損失；收受方承接移轉方的成本基礎。如果收受方是非居民外國人則不適用。'],
            ['依離婚判決或其附帶書面文件移轉 IRA', '不是應稅移轉；從移轉日起成為收受方的 IRA'],
            ['依 QDRO 把雇主退休計畫福利支付給配偶或前配偶', '對收受的配偶或前配偶課稅，對方可能可以免稅轉存'],
            ['依 QDRO 支付給子女或其他受扶養人的福利', '視為支付給計畫參與者'],
          ]}
        />
        <p>
          <strong>合格家事關係命令（QDRO）</strong>是依州家事法作出的法院命令，賦予配偶、前配偶、子女或其他受扶養人從合格退休計畫領取福利的權利。如果不是依判決移轉 IRA，而是直接提領，可能會產生稅與罰款。
        </p>

        <h2>夫妻共同財產州</h2>
        <p>
          如果你住在夫妻共同財產州 — 亞利桑那、加州、愛達荷、路易斯安那、內華達、新墨西哥、德州、華盛頓州或威斯康辛 — 離婚前配偶之間的收入如何分配，可能適用特別規定。請見 Publication 555。
        </p>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Kim', 'Jordan', 'Priya 與 Sam']}
          rows={[
            ['情況', '離婚判決於 2016 年簽立；每月支付 $2,000 贍養費；判決在 2025 年修改以提高金額，但沒有提到新規定', '離婚判決於 2020 年簽立；每月收到 $1,500 贍養費與 $800 子女撫養費', '2025 年離婚；兒子和 Priya 住 220 晚，和 Sam 住 145 晚'],
            ['結果', 'Kim 仍可扣除贍養費；收受方要申報為所得', 'Jordan 收到的款項都不用課稅，支付方也不能扣除', 'Priya 是監護方父母。她可以簽 Form 8332 讓 Sam 申請兒童抵稅額，但符合條件的話，戶長身分與勞動所得抵稅額仍屬於 Priya'],
          ]}
        />

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>依 2018 年以後簽立的協議扣除贍養費。</strong></li>
          <li><strong>把子女撫養費當成贍養費。</strong></li>
          <li><strong>父母雙方都申報同一個孩子</strong>，或非監護方父母申報戶長身分。</li>
          <li><strong>忘記每年附上 Form 8332。</strong></li>
          <li><strong>把配偶應得的退休帳戶份額直接提領</strong>，而不是使用 QDRO 或直接移轉。</li>
          <li><strong>離婚確定後仍合併申報。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請尋求專業協助</div>
          <p>離婚協議同時涉及州家庭法與聯邦稅法。簽署前，請由家事律師與稅務專業人士審閱扶養條款、財產分配與退休帳戶命令。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

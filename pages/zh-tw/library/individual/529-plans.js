import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/529-plans.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: '529-plans',
  sourceHash:      '152313251eb4',
  id:            '75',
  title:         '529 計畫：擴大的 K-12 與職業證照費用說明',
  titleEn:       '529 Plans: Expanded K-12 and Credential Expenses Explained',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS Tax Topic 313（2026 年 9 月更新）與 Publication 970（2025），說明 529 計畫（合格學費計畫，qualified tuition programs）的聯邦稅務規定，包括擴大的 K-12 費用與高等教育後職業證照費用。依 Tax Topic 313，K-12 每年上限 2025 年為 $10,000，2026 年起為 $20,000。本文查閱的 IRS 資料沒有說明擴大的 K-12 費用與證照費用從哪一天開始適用。各州的 529 計畫稅務規定不同，本文不涵蓋',
  persona:       ['為 K-12 或大學費用儲蓄的父母', '正在考取執照或專業證照的成年人', '要協調 529 提領與教育抵稅額的家庭', '提撥到 529 計畫的祖父母'],
  relatedJourney: ['為孩子做規劃', '了解新稅務規定'],
  actionRequired: '從 529 提領之前，先對應同一年度的合格費用、保留收據，並避免把同一筆費用也用在教育抵稅額上。K-12 提領請不要超過每年上限 — 2025 年 $10,000，2026 年起 $20,000 — 並確認你所在州計畫的規定。',
  sources: [
    { label: 'IRS — Topic no. 313，合格學費計畫（Qualified tuition programs, QTPs）', url: 'https://www.irs.gov/taxtopics/tc313' },
    { label: 'IRS — Publication 970（2025），教育稅務優惠（Tax Benefits for Education）（第 7 章，合格學費計畫）', url: 'https://www.irs.gov/pub/irs-pdf/p970.pdf' },
    { label: 'IRS — Form 5329 填寫說明（教育帳戶的附加稅）', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
    { label: 'IRS — Working Families Tax Cuts（One, Big, Beautiful Bill 相關條款）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
  ],
}

const FAQS = [
  {
    q: '529 計畫可以用來付私立 K-12 學校的費用嗎？',
    a: '可以，限合格的中小學教育費用 — 學費與其他幾項 K-12 費用。每位受益人的每年上限，2025 年為 $10,000，2026 年起為 $20,000，受益人所有的 529 計畫合併計算（IRS Tax Topic 313）。',
  },
  {
    q: '2026 年 K-12 上限有提高嗎？',
    a: '有。IRS Tax Topic 313（2026 年 9 月更新）表示，K-12 費用從受益人所有 529 計畫合計每年最多 $20,000，2025 年 12 月 31 日之前的上限為 $10,000。Publication 970（2025）仍寫 $10,000，因為它適用於 2025 稅務年度。',
  },
  {
    q: '529 計畫可以支付專業執照或技術證照的費用嗎？',
    a: 'Publication 970（2025）列出合格的高等教育後證照費用（postsecondary credentialing expenses）— 學費與雜費、書籍與用品、必要的考試費，以及維持證照所需的繼續教育 — 適用於受認可的證照課程，例如取得州或聯邦職業或專業執照的課程。本文查閱的 IRS 資料沒有說明這些費用從哪一天開始符合資格。',
  },
  {
    q: '同一年可以申請美國機會抵稅額（AOTC），又從 529 免稅提領嗎？',
    a: '可以，但不能用同一筆費用。用來計算抵稅額的費用，必須從使 529 提領免稅的費用中扣除。',
  },
  {
    q: '把 529 的錢用在其他地方會怎樣？',
    a: '非合格提領中屬於收益的部分一般要課稅，而且應稅金額一般要加徵 10% 附加稅，除非適用例外，例如受益人過世或失能，或有免稅獎學金。',
  },
  {
    q: '529 提撥可以抵稅嗎？',
    a: '聯邦稅表上不行。有些州提供自己的扣除或抵稅；本文不涵蓋州的規定。',
  },
]

const RELATED = [
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: '教育抵稅額：AOTC 與 Lifetime Learning Credit 怎麼選？',
    desc:  '協調抵稅額與 529 提領。',
  },
  {
    href: '/library/individual/trump-accounts',
    cat:  'Individuals & Families',
    title: 'Trump 帳戶：誰可以開戶、$1,000 政府提撥與相關規定',
    desc:  '另一種給孩子的帳戶。',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
  {
    href: '/library/individual/gift-tax-form-709',
    cat: 'Individuals & Families',
    title: '贈與稅與 Form 709：美國贈與人 2025 與 2026 年何時要申報',
    desc: '存入 529 計畫的贈與與 Form 709 的 5 年選擇。',
  },
]

export default function Plans529ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '529 計畫：擴大的 K-12 與職業證照費用 | AskLinTax 繁體中文',
      description: '529 計畫稅務規定：大學、K-12 與證照費用、K-12 上限（2025 年 $10,000，2026 年起 $20,000）、教育抵稅額，以及罰則。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>529 計畫</strong>（IRS 稱為合格學費計畫）讓你為教育儲蓄。提撥在聯邦稅表上不能扣除，但提領金額用於同一年度的<strong>合格教育費用</strong>時，一般是<strong>免稅</strong>的。
        </p>
        <p>
          2025 年稅法擴大了合格費用的範圍。IRS 指引現在列出學費以外的幾項 <strong>K-12 費用</strong>，以及新的<strong>高等教育後證照費用</strong>。K-12 每年上限 <strong>2025 年為 $10,000</strong>，<strong>2026 年起為 $20,000</strong>，以每位受益人所有的 529 計畫合併計算（IRS Tax Topic 313）。
        </p>

        <h2>合格的高等教育費用</h2>
        <ul>
          <li>在合格學校註冊或就讀所需的學費與雜費，以及書籍、用品與設備。</li>
          <li>至少半職註冊學生的食宿費，以學校的就學費用額度或實際收費為上限。</li>
          <li>受益人就學期間主要使用的電腦、軟體與網路。</li>
          <li>特殊需求服務費用，以及註冊學徒計畫的費用。</li>
          <li>償還受益人或其兄弟姊妹的合格學生貸款本金或利息 — 每人終身不超過 $10,000。</li>
        </ul>

        <h2>擴大的 K-12 費用</h2>
        <p>
          IRS Tax Topic 313 與 Publication 970（2025）把下列項目列為公立、私立或宗教學校（幼稚園到 12 年級）的合格中小學教育費用：
        </p>
        <ArticleTable
          head={['K-12 費用', '說明']}
          rows={[
            ['學費', '原本就有的 K-12 費用'],
            ['課程與課程教材', ''],
            ['書籍或其他教學材料', ''],
            ['線上教育教材', ''],
            ['家庭以外的家教或教育課程', '限家教與學生無親屬關係，且具教師執照、曾在合格教育機構任教，或是該科目的專家'],
            ['標準化成就測驗、AP 考試與大學入學考試', '考試費用'],
            ['在大學或學院的雙重註冊（dual enrollment）', '費用'],
            ['身心障礙學生的教育治療', '由有執照或受認證的專業人員提供 — 例如職能、行為、物理與語言治療'],
          ]}
        />

        <h2>新增：高等教育後證照費用</h2>
        <p>
          Publication 970（2025）也列出<strong>受認可的高等教育後證照課程</strong>的費用：學費與雜費；書籍、用品與設備；取得或維持證照所需的考試費；以及維持證照所需的繼續教育費用。受認可的證照包括州或聯邦政府核發或認可的職業或專業執照、註冊學徒證書，以及某些經認證的產業認可證照。課程如果列在州勞動力（WIOA）合格培訓清單或退伍軍人事務部 WEAMS 名錄上，或是為廣受認可的證照考試做準備，就可能符合資格。
        </p>

        <h2>2025 與 2026 年：哪些已確認</h2>
        <ArticleTable
          head={['規定', '2025', '2026 年及以後']}
          rows={[
            ['K-12 每年上限（受益人所有 529 計畫合併計算）', '$10,000', '$20,000'],
            ['擴大的 K-12 費用（學費以外）', '列在 Publication 970（2025）；本文查閱的 IRS 資料沒有說明確切的開始日期', '列在 Tax Topic 313'],
            ['高等教育後證照費用', '列在 Publication 970（2025）；本文查閱的 IRS 資料沒有說明確切的開始日期', '列在 Tax Topic 313'],
          ]}
        />
        <p>
          Tax Topic 313 對 K-12 上限的說明是「每年 $20,000（2025 年 12 月 31 日之前上限為 $10,000）」。Publication 970 尚未針對 2026 年更新。本文查閱的 IRS 資料沒有說明擴大的 K-12 費用與證照費用在 2025 年從哪一天開始符合資格，所以如果你在 2025 年用 529 的錢支付這些新增的費用，請向你的計畫或稅務專業人士確認。
        </p>

        <h2>與教育抵稅額的協調</h2>
        <p>
          你可以在 529 免稅提領的同一年申請美國機會抵稅額（American Opportunity Credit）或終身學習抵稅額（Lifetime Learning Credit），但<strong>不能用同一筆費用</strong>。用來計算抵稅額的費用，會減少使 529 提領免稅的費用。請見<a href="/zh-tw/library/individual/education-tax-credits/">教育抵稅額</a>。
        </p>
        <p>
          <strong>2026 年新規定：</strong>Publication 970（2025）表示，從 2026 年起，申請這兩種抵稅額的人，必須有在報稅截止日前核發、可用於工作的社會安全號碼（SSN）；如果申請抵稅額的人不是學生本人，學生也需要有效的 SSN。這項規定適用於抵稅額，不適用於 529 提領。
        </p>

        <h2>非合格的提領</h2>
        <p>
          如果提領金額超過受益人調整後的合格教育費用，收益部分要課稅（列為其他收入），而且應稅金額一般要加徵 <strong>10% 附加稅</strong>，在 Form 5329 上計算。10% 附加稅的例外包括受益人過世或失能、免稅獎學金或某些其他免稅補助、就讀美國軍事學院，以及只因費用已用於教育抵稅額而變成應稅的金額。
        </p>

        <h2>轉存</h2>
        <ul>
          <li><strong>轉到另一個 529 計畫或 ABLE 帳戶：</strong>在 60 天內完成一般免稅，但同一受益人的轉存次數有限制。</li>
          <li><strong>更換受益人</strong>為原受益人的家庭成員，不用課稅。</li>
          <li><strong>轉到 Roth IRA：</strong>只限同一受益人，必須是從開立超過 15 年的 529 帳戶直接由受託人轉給受託人，金額限於 5 年以前的提撥（及其收益），並受 Roth IRA 年度提撥上限與 Publication 970 中其他限制的約束。</li>
        </ul>

        <h2>範例（示意）</h2>
        <p>
          <strong>K-12（2025 年）：</strong>Grace 用女兒的 529 計畫支付 $6,000 私立國中學費，以及 $1,500 由無親屬關係、具教師執照的老師提供的家教費。兩者都列在 Publication 970（2025）的合格 K-12 費用中，合計也在 2025 年 $10,000 的上限以內。
        </p>
        <p>
          <strong>K-12（2026 年）：</strong>2026 年，Grace 從 529 計畫支付 $14,000 私立高中學費與 $3,000 課程教材費。合計 $17,000，在 2026 年 <strong>$20,000</strong> 的上限以內。同樣的 $17,000 如果發生在 2025 年，就會超過當年 $10,000 的上限。
        </p>
        <p>
          <strong>證照：</strong>30 歲的 Marco 用 529 計畫支付一個課程的學費與必要的考試費，這個課程是為了取得州核發的職業執照。依 Publication 970（2025），這些是合格的高等教育後證照費用。
        </p>
        <p>
          <strong>大學加上抵稅額：</strong>Amy 的大學學費是 $10,000。她的父母用其中 $4,000 申請美國機會抵稅額，另外 $6,000 從 529 計畫支付。只有這 $6,000 可以算作免稅提領 — 同一筆 $4,000 不能用兩次。
        </p>
        <p>
          <strong>非合格用途：</strong>Ben 提領 $5,000 拿去買車。如果提領中有 $1,000 是收益，這 $1,000 要課稅，10% 附加稅一般是 $100。
        </p>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「529 的錢只能用在大學。」</strong>也可以用於合格的 K-12 費用、註冊學徒計畫、某些學生貸款還款，以及依 Publication 970（2025）受認可的證照課程。</li>
          <li><strong>「提撥可以減少聯邦稅。」</strong>提撥在聯邦稅表上不能扣除。</li>
          <li><strong>「同一筆學費可以同時用在抵稅額和 529 免稅提領。」</strong>同一筆費用不能兩者都用。</li>
          <li><strong>「所有 K-12 費用都沒有上限。」</strong>K-12 提領每年有上限：2025 年 $10,000，2026 年起 $20,000，以每位受益人所有的 529 計畫合併計算。</li>
          <li><strong>「$20,000 的 K-12 上限在 2025 年就適用。」</strong>它從 2026 年開始；2025 年的上限是 $10,000。</li>
          <li><strong>「我住的州對 529 提領的處理方式一樣。」</strong>州的規定可能不同，包括 K-12 與其他擴大的費用。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 指引仍在更新中</div>
          <p>2026 年 $20,000 的 K-12 上限來自 IRS Tax Topic 313（2026 年 9 月更新）。Publication 970 與其他一些 IRS 關於 529 計畫的網頁尚未針對 2026 年更新。本文查閱的 IRS 資料沒有說明擴大的 K-12 費用與證照費用從哪一天開始適用。本文不涵蓋州的稅務處理。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

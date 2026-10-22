import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/foreign-tax-credit.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-tax-credit',
  sourceHash:      'da270735306c',
  id:            '91',
  title:         '外國稅額抵免（Form 1116）：避免台灣與其他海外所得被雙重課稅',
  titleEn:       'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'organizing',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 514（2025）、2025 年 Form 1116 填寫說明、2026 年 Form 1116 填寫說明草案、2025 年 Form 1040 填寫說明、IRS 外國稅額抵免網頁，以及 IRS 美國所得稅協定清單，說明 2025 與 2026 稅務年度個人的外國稅額抵免。本文不判定某一項外國稅是否可以抵免，也不涵蓋企業、受控外國公司或州稅',
  persona:       ['在台灣的利息、股利或租金上繳稅的美國居民', '有海外工資但不使用排除額的人', 'Form 1099-DIV 或 1099-INT 上有外國稅的投資人', '出售海外房產並繳了外國稅的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '確認每一筆外國稅都是加諸於你的所得稅，每年決定所有符合資格的外國稅要全部抵免還是全部扣除，並在 Form 1116 上按所得類別計算抵免上限；如果符合資格，也可以直接在 Schedule 3 上申報抵免。',
  sources: [
    { label: 'IRS — Publication 514（2025），個人的外國稅額抵免', url: 'https://www.irs.gov/publications/p514' },
    { label: 'IRS — 2025 年 Form 1116 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1116.pdf' },
    { label: 'IRS — 2026 年 Form 1116 填寫說明（草案）', url: 'https://www.irs.gov/pub/irs-dft/i1116--dft.pdf' },
    { label: 'IRS — 符合外國稅額抵免資格的外國稅（Foreign taxes that qualify for the foreign tax credit）', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-taxes-that-qualify-for-the-foreign-tax-credit' },
    { label: 'IRS — 外國稅額抵免：如何計算抵免額', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit-how-to-figure-the-credit' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 美國所得稅協定 A 到 Z（United States income tax treaties A to Z）', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: '所有台灣的稅都可以抵免嗎？',
    a: '不是。一般只有加諸於你、而且是你在法律上實際應負擔的外國所得稅（或代替所得稅的稅）才符合資格。Publication 514 指出，其他稅，例如外國的不動產稅與動產稅，不符合資格。某一項台灣的稅是否符合資格要看那項稅本身，申請抵免前請先確認。',
  },
  {
    q: '我應該選抵免還是扣除？',
    a: 'Publication 514 建議兩種方式都算算看。抵免可以直接減少你的美國稅額（有上限）；扣除則是減少應稅所得，而且要採用分項扣除。每一年的選擇適用於你所有符合資格的外國稅。',
  },
  {
    q: '什麼時候可以不填 Form 1116？',
    a: '依 2025 年 Form 1040 填寫說明，如果你所有的海外所得都是 1099 或 Schedule K-3 上申報的利息與股利，外國稅不超過 $300（夫妻合併申報為 $600），而且符合其他列出的條件，就可以直接在 Schedule 3 第 1 行申報抵免。使用這個例外時，未用完的外國稅不能轉到其他年度。',
  },
  {
    q: '今年用不完的外國稅怎麼辦？',
    a: '某一類別超過上限的外國稅，一般可以往前結轉 1 年，再往後結轉 10 年，從最早的年度開始適用，而且在每一個年度只能用到同一類別尚未用完的上限。某筆金額一旦在往前或往後結轉的年度用掉，就不能再用，所以同一筆稅不會被抵免兩次。',
  },
  {
    q: '用海外工作所得排除額排除的所得，可以申請抵免嗎？',
    a: '不可以。你不能對已排除所得的外國稅申請抵免或扣除。如果只排除部分所得，可分攤到被排除部分的外國稅就不能抵免。',
  },
  {
    q: '外國稅額抵免可以減少淨投資所得稅嗎？',
    a: '不可以。IRS 指出，只能用來抵減一般所得稅的抵稅額（例如外國稅額抵免），不能減少 3.8% 的淨投資所得稅。',
  },
]

const RELATED = [
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: '海外收入：美國稅務居民要申報全球所得嗎？',
    desc:  '為什麼一開始就要申報海外所得。',
  },
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: '海外工作所得排除額（Form 2555）：2025 與 2026 年規定',
    desc:  '避免海外工資被雙重課稅的另一種主要方式。',
  },
  {
    href: '/library/rental/foreign-rental-property',
    cat:  'Real Estate & Airbnb',
    title: '海外出租房產與美國稅務',
    desc:  '申報海外房產的租金。',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: '淨投資所得稅（NIIT）：2025 與 2026 年誰要繳 3.8% 的稅',
    desc:  '外國稅額抵免無法減少的稅。',
  },
]

export default function ForeignTaxCreditZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '外國稅額抵免（Form 1116）：避免台灣與其他海外所得被雙重課稅 | AskLinTax 繁體中文',
      description: '外國稅額抵免說明：哪些外國稅符合資格、抵免與扣除、Form 1116 上限與所得類別、結轉、$300/$600 例外、租金與投資所得，以及與海外工作所得排除額和 NIIT 的關係。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你是美國公民或居民，你要申報全球所得，所以來自台灣或其他國家的所得可能被兩個國家課稅。<strong>外國稅額抵免</strong>讓你用已繳納、符合資格的外國<strong>所得稅</strong>減少美國稅額，但有上限。你通常在 <strong>Form 1116</strong> 上計算。你也可以選擇不抵免，而把這些稅列為分項扣除額。
        </p>

        <h2>哪些外國稅符合資格</h2>
        <p>
          IRS 列出四項條件。一般來說，這項稅必須：
        </p>
        <ul>
          <li><strong>加諸於你</strong>，例如從你的工資或利息中預扣的稅；</li>
          <li>由你<strong>已繳納或應計</strong>；</li>
          <li>是你<strong>法律上實際應負擔</strong>的外國稅，不是可以退回的金額，也不一定等於預扣的金額；</li>
          <li>是<strong>所得稅</strong>，或代替所得稅的稅。</li>
        </ul>
        <p>
          Publication 514 指出，其他稅，例如<strong>外國的不動產稅與動產稅，不符合資格</strong>，不過如果屬於營業或產生所得（例如出租房產）的費用，可能可以扣除。不要以為你在台灣繳的每一種稅都可以抵免，請先確認是哪一種稅。
        </p>

        <h2>抵免或扣除</h2>
        <ul>
          <li><strong>抵免：</strong>直接減少你的美國稅額，但受下面說明的上限限制。</li>
          <li><strong>扣除：</strong>在 Schedule A 上列為分項扣除額，只有在你採用分項扣除時才有幫助。</li>
          <li><strong>每年全部擇一：</strong>如果你某一年對任何符合資格的外國稅申請抵免，就必須對該年所有符合資格的外國稅申請抵免；如果選擇扣除，就全部扣除。其他年度可以做不同的選擇。</li>
        </ul>

        <h2>海外來源所得與上限</h2>
        <p>
          抵免額不能超過<strong>你的美國稅額乘以一個比例</strong>：來自美國境外的應稅所得，除以你的應稅所得總額。上限要按每一個<strong>所得類別</strong>分別計算。
        </p>
        <ArticleTable
          head={['所得', '來源一般依據', '通常的類別']}
          rows={[
            ['工資', '提供勞務的地點', '一般類（general）'],
            ['利息', '付款人的居住地', '被動類（passive）'],
            ['股利', '公司是美國公司還是外國公司', '被動類'],
            ['租金', '房產所在地', '被動類，主動營業的租金除外'],
            ['出售不動產的獲利', '房產所在地', '被動類（投資用房產）'],
            ['出售股票等動產的獲利', '賣方的稅務住所，有例外', '視事實而定'],
          ]}
        />
        <p>
          有兩點對許多讀者很重要。第一，因為出售股票的獲利一般依你的稅務住所判定來源，美國居民出售外國股票的獲利，即使另一個國家也課稅，仍可能屬於美國來源所得，這會限制抵免額。Publication 514 說明了例外情況。第二，在海外被課以超過美國最高稅率的被動所得，可能被視為高稅負所得（high-taxed income），而移出被動類別。
        </p>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Lin</strong> 是單身的美國居民。Lin 的應稅所得是 $80,000，抵免前的美國所得稅是 $12,000。應稅所得中有 $10,000 是海外來源的被動所得，即扣除可分攤費用後的台灣利息與租金淨額；Lin 就這筆所得繳了 $2,000 符合四項條件的台灣所得稅。
        </p>
        <ArticleTable
          head={['步驟', '金額']}
          rows={[
            ['上限：$12,000 ×（$10,000 ÷ $80,000）', '$1,500'],
            ['已繳的合格台灣所得稅', '$2,000'],
            ['外國稅額抵免（較小的金額）', '$1,500'],
            ['2025 年未用完的外國稅（如有尚未用完的上限，可以往前或往後結轉）', '$500'],
          ]}
        />
        <p>
          這個範例經過簡化：在 Form 1116 上，海外來源應稅所得要在分配與分攤扣除額之後計算，實際稅表也可能涉及不只一個類別。這裡的台灣稅是所得的 20%，低於美國最高稅率，所以這筆所得仍屬被動類別，不會被視為高稅負所得。
        </p>
        <p>
          <strong>那 $500 怎麼處理。</strong>這筆未用完的外國稅產生於 2025 年。Publication 514 與 2025 年 Form 1116 填寫說明允許你把它視為在其他年度繳納，但只能用到<strong>同一類別</strong>（這裡是被動類別）的<strong>超額上限</strong>（該年度上限超過合格外國稅的金額），並依下列順序：
        </p>
        <ul>
          <li><strong>先用於 2024 年</strong>（往前結轉的 1 年），以 Lin 2024 年被動類別尚未用完的上限為限；要用 Form 1040-X 與修正後的 Form 1116 修正 2024 年稅表申請；</li>
          <li><strong>再用於 2026 年到 2035 年</strong>，從最早的年度開始：只有 2024 年沒有用掉的部分才會往後結轉，而且每一年只能用到該年被動類別尚未用完的上限；</li>
          <li><strong>一旦用掉就沒了</strong>：同一筆稅不能在超過一個年度抵免，往前與往後結轉的期間也不能延長。</li>
        </ul>
        <p>
          <strong>不保證用得完。</strong>如果 Lin 在這些年度沒有被動類別尚未用完的上限，這 $500 可能有一部分或全部永遠用不到，並在 2035 年後失效。
        </p>
        <p>
          <strong>選擇扣除而不是抵免的年度：</strong>
        </p>
        <ul>
          <li>如果 Lin 2025 年選擇扣除外國稅，2025 年就不會有結轉金額。</li>
          <li>在 Lin 選擇扣除外國稅的結轉年度，結轉金額不能扣除，也不能抵免。Lin 仍然要把該年度的上限當作申請抵免來計算，而結轉金額會視為已用到該年度的超額上限，即使 Lin 當年沒有因此得到任何好處，也會減少之後年度剩下的金額。</li>
          <li>只有在 Lin 也對該年度的外國稅申請抵免的年度，才能抵免結轉金額。</li>
        </ul>
        <p>
          使用 Schedule 3 的 $300/$600 選擇的年度，不能往前或往後結轉。
        </p>

        <h2>什麼時候不需要 Form 1116</h2>
        <p>
          依 2025 年 Form 1040 填寫說明，如果下列全部符合，你可以不填 Form 1116，直接在 <strong>Schedule 3 第 1 行</strong>申報抵免：
        </p>
        <ul>
          <li>你所有的海外來源總所得都是利息與股利，而且這些所得與外國稅都申報在你收到的 Form 1099-INT、Form 1099-DIV 或 Schedule K-3 上；</li>
          <li>你的外國稅總額不超過 <strong>$300</strong>（夫妻合併申報為 <strong>$600</strong>）；</li>
          <li>你持有該股票或債券至少 16 天，而且沒有義務把這些金額付給別人；</li>
          <li>你沒有申報 Form 4563，也沒有排除來自波多黎各的所得；而且</li>
          <li>這些外國稅是依法應繳、不能依稅務協定退稅或適用較低稅率，並且是繳給美國承認、不支持恐怖主義的國家。</li>
        </ul>

        <h2>海外的租金與投資所得</h2>
        <ul>
          <li><strong>海外租金：</strong>以美元申報所有租金與費用；租金的外國所得稅可能可以在被動類別中抵免。請參考<a href="/zh-tw/library/rental/foreign-rental-property/">海外出租房產與美國稅務</a>。</li>
          <li><strong>海外利息與股利：</strong>預扣的外國稅可能可以抵免；Form 1099-INT 第 6 欄或 Form 1099-DIV 第 7 欄上的稅，可能適用 Schedule 3 的例外。請參考 <a href="/zh-tw/library/investment/form-1099-div-1099-int-boxes/">Form 1099-DIV 與 1099-INT 逐欄解說</a>。</li>
          <li><strong>出售海外房產：</strong>請參考<a href="/zh-tw/library/investment/sold-foreign-property-transfer/">海外賣房後把錢匯到美國，要申報什麼？</a></li>
        </ul>

        <h2>排除額與 NIIT</h2>
        <ul>
          <li><strong>海外工作所得排除額：</strong>你不能對已排除所得的外國稅申請抵免或扣除。請參考<a href="/zh-tw/library/individual/foreign-earned-income-exclusion/">海外工作所得排除額指南</a>。</li>
          <li><strong>淨投資所得稅：</strong>外國稅額抵免不能減少 3.8% 的 NIIT。請參考 <a href="/zh-tw/library/investment/net-investment-income-tax/">NIIT 指南</a>。</li>
        </ul>

        <h2>台灣：IRS 稅務協定清單上沒有所得稅協定</h2>
        <p>
          截至本文 2026 年 10 月的檢視，台灣沒有出現在 IRS 的美國所得稅協定清單上。我們無法從本次檢視可取得的美國政府來源確認，任何美台雙重課稅救濟立法是否已經通過，所以本文不依賴任何這類救濟。目前，美國納稅人避免雙重課稅一般要靠美國的規定，例如外國稅額抵免與海外工作所得排除額。
        </p>

        <h2>2025 與 2026 年的說明</h2>
        <ul>
          <li><strong>2025 年（正式填寫說明）：</strong>P.L. 119-21 為 65 歲以上的人新增 2025 至 2028 年的 $6,000 扣除額；Form 1116 填寫說明指出，計算抵免上限時，要把這筆扣除額從應稅所得中移除。</li>
          <li><strong>2026 年（填寫說明草案）：</strong>Form 1116 填寫說明草案指出，P.L. 119-21 對分項扣除額的限制，可能會減少 Form 1116 上使用的扣除額。報稅前請查看正式的 2026 年填寫說明。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>對不動產稅或其他非所得稅申請抵免。</strong></li>
          <li><strong>以預扣的金額申請抵免</strong>，但其中一部分可以退回。</li>
          <li><strong>同一年有些外國稅抵免、有些扣除。</strong></li>
          <li><strong>忽略上限與所得類別</strong>，或忘了追蹤結轉金額。</li>
          <li><strong>對用海外工作所得排除額排除的所得申請抵免。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>某一項外國稅是否可以抵免、外國股票獲利的來源判定、扣除額的分攤，以及營業或受控外國公司所得的外國稅，都可能很複雜。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

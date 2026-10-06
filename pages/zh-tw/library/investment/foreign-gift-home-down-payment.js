import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gift-home-down-payment.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gift-home-down-payment',
  sourceHash:      '6e45a89b5cb3',
  id:            '33',
  title:         '海外父母幫我付美國房屋頭期款，要申報嗎？',
  titleEn:       'Parents overseas helped with my U.S. home down payment — is it a foreign gift?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋美國公民與居民外國人從非居民外國人父母收到、用於購買美國房屋的款項。父母借款、父母成為共同持有人、來自外國公司或信託的資金，以及房貸機構的要求，不在本指南範圍內',
  persona:       ['父母在海外的首購族', '有家人資助買房的夫妻', '父母在台灣或中國的綠卡持有人與美國公民', '被貸款機構要求說明海外資金來源的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '先判斷這筆錢到底是什麼：贈與、借款，還是父母買下房子的一部分。如果是贈與，就把它和今年非居民父母及其親屬給你的其他贈與加總。合計超過 $100,000，就要申報 Form 3520 Part IV。不論如何，都要保留匯款紀錄與書面的贈與聲明。',
  sources: [
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Publication 551 — 資產的成本基礎（Basis of Assets）', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: '我父母把錢直接匯給 escrow 公司，沒有經過我。這樣就不用報 Form 3520 了嗎？',
    a: '光是這樣不能下結論。我們查閱的 IRS 海外贈與指引，並沒有特別討論直接付給 escrow 的情況。指引所描述的直接付款例外，涵蓋的是合格的學費與醫療費用 — 並不是一般性的房屋例外。直接付給 escrow 的款項是否算是要申報的給你的贈與，取決於實質內容：這筆錢是為誰付的、房子歸誰所有，以及實際發生了什麼。如果金額很大，在決定不申報之前，請先找專業人士檢視事實。',
  },
  {
    q: '頭期款的錢算我的應稅收入嗎？',
    a: '如果是真正的贈與，通常不算。贈與與遺產一般不計入受贈人的所得。如果需要申報 Form 3520，那是和所得稅分開的事。',
  },
  {
    q: '貸款機構要我提供「gift letter」，那是 IRS 的表格嗎？',
    a: '不是。gift letter（贈與證明信）是房貸機構為了了解你頭期款的來源而可能要求的文件。它不是稅務表格，也不能取代 Form 3520。但它仍然可以作為這筆錢是贈與的有用紀錄。',
  },
  {
    q: '我父母希望我之後慢慢還錢，這樣還算贈與嗎？',
    a: '真正的借款 — 也就是有還款的預期 — 不是贈與，所以不會在 Form 3520 Part IV 當作贈與申報。家人之間的借款有自己的問題（例如利息）。如果還款方式很隨意，或之後可能不用還，在決定當作借款或贈與之前，請先找專業人士檢視這個安排。',
  },
  {
    q: '用贈與的錢買房，會影響房子的稅務成本基礎（basis）嗎？',
    a: '你用現金贈與買房，這筆錢就是你購屋價款的一部分，所以你的成本基礎從購買成本開始算。如果父母贈與或留給你的是房產本身（而不是現金），適用不同的成本基礎規則。請保留過戶文件。',
  },
  {
    q: '我和配偶一起買房，這筆贈與算誰的？',
    a: '要看實際上是誰收到這筆贈與。匯給其中一位配偶、匯給兩人，或匯進聯名帳戶，分析方式可能不同，而答案會影響這筆錢算進誰的 $100,000 合計。請見我們給夫妻的指南。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於海外贈與、是否要繳稅與 Form 3520 的基礎指南。',
  },
  {
    href: '/library/investment/form-3520-married-couples',
    cat:  'Investments & Foreign Accounts',
    title: '夫妻收到海外父母贈與，Form 3520 怎麼判斷？',
    desc:  '和配偶一起買房？為什麼「誰收到贈與」很重要。',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    desc:  '頭期款加上當年其他的經濟支援：全部怎麼加總。',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: '台灣或海外銀行帳戶需要申報嗎？',
    desc:  '如果贈與的錢先放在你自己的海外帳戶，可能適用 FBAR 與 Form 8938。',
  },
]

export default function ForeignGiftHomeDownPaymentZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外父母幫忙付美國房屋頭期款：海外贈與怎麼申報 | AskLinTax 繁體中文',
      description: '父母從海外出錢幫你付美國房屋頭期款：要不要繳稅、什麼時候要報 Form 3520、贈與與借款與共同持有的差別、直接付給 escrow，以及要保留哪些紀錄。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          如果你的父母是非居民外國人，他們出錢幫你買美國的房子，這就是給你的<strong>海外贈與</strong>（Foreign Gift）。它通常<strong>不是應稅收入</strong>。是否需要<strong>申報</strong>，要看總額：如果這個稅務年度來自父母以及與他們有親屬關係的外國人的贈與合計超過 <strong>$100,000</strong>，你就要申報 <strong>Form 3520 Part IV</strong>。
        </p>
        <p>
          買房不會產生特別的類別。頭期款要和同一個家庭當年給你的其他贈與一起計算。
        </p>

        <h2>第一個問題：這筆錢實際上是什麼？</h2>
        <p>
          家人幫忙買房的方式有很多種。稅務處理看的是實際發生的事，而不是這筆錢被叫做什麼。
        </p>
        <ArticleTable
          head={['安排方式', '通常屬於', '要報 Form 3520 Part IV 嗎？']}
          rows={[
            ['父母給你錢，不期待你償還', '給你的贈與', '計入 $100,000 的親屬合計'],
            ['父母直接把錢付給 escrow 或賣方，用來買你的房子', '直接付給 escrow 本身，並不會讓它不屬於海外贈與申報；實質內容與產權歸屬很重要', '需要依事實檢視，特別是大額款項'],
            ['父母借錢給你，你之後會還', '借款，不是贈與', '不當作贈與申報；適用借款規則'],
            ['父母把自己的名字登記在產權上，成為共同持有人', '是他們自己的投資，該部分不是贈與', '需要專業人士檢視'],
            ['錢來自父母的公司或信託', '不是一般的個人贈與', '規則不同 — 請尋求專業協助'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 直接付款的例外沒有「房屋版」</div>
          <p>IRS 海外贈與指引所指出的直接付款例外，針對的是代你支付的合格學費與醫療費用，並不是一般性的房屋例外。我們查閱的 IRS 指引，沒有特別討論父母把錢付給 escrow 公司、賣方或房貸機構的情況，所以直接付給 escrow，本身並不能證明這筆錢不屬於海外贈與申報。實際受益人是誰、房子歸誰所有，以及交易的實際事實，都很重要。大額直接付給 escrow 的安排，請尋求個別的專業檢視。</p>
        </div>

        <h2>申報與繳稅：分開來看</h2>
        <ul>
          <li><strong>所得稅：</strong>真正的贈與通常不計入你的所得。你不會因為父母幫你買房而要繳美國所得稅。</li>
          <li><strong>申報：</strong>當你這一年的親屬合計超過 $100,000，就要申報 Form 3520 Part IV。這是一份資訊申報表，與你的 Form 1040 分開申報。</li>
          <li><strong>之後的收入：</strong>如果你把房子出租，租金要繳稅。出售時，利得是從你的成本基礎計算 — 通常就是你的購買成本，包括用贈與的錢支付的部分。</li>
        </ul>

        <h2>實際例子</h2>
        <p>
          Lin 和她先生都是美國公民，2025 年在聖荷西買房。Lin 住在台中的父母不是美國公民也不是美國居民，4 月匯了 <strong>$150,000</strong> 到 Lin 的美國帳戶作為頭期款。12 月又匯了 $10,000 當作年節禮物。
        </p>
        <ul>
          <li>這筆錢是給 Lin 的贈與，不是應稅收入。</li>
          <li>Lin 知道她的爸爸和媽媽彼此有親屬關係，所以依照合併計算規則，她把兩人的贈與加總：2025 年共 $160,000 — 超過 $100,000 — 所以 <strong>Lin</strong> 要申報 2025 年的 Form 3520 Part IV，列出兩筆贈與（每一筆都超過 $5,000）。</li>
          <li>如果父母改成匯 $80,000 給 Lin、$80,000 給她先生，就需要更仔細分析誰收到什麼，以及其中一位配偶是否其實是在替另一位收錢。請見<a href="/zh-tw/library/investment/form-3520-married-couples/">我們給夫妻的指南</a>。</li>
        </ul>

        <h2>文件與資金來源</h2>
        <p>
          可能有兩方想知道你的頭期款從哪裡來，理由各不相同：
        </p>
        <ul>
          <li><strong>你的房貸機構</strong>可能要求 gift letter、銀行對帳單或電匯紀錄，以證明資金來源。那是貸款的要求，不是向 IRS 申報。</li>
          <li><strong>IRS</strong> 關心的是這筆錢是不是贈與，以及當你的親屬合計超過 $100,000 時，你有沒有申報 Form 3520。如果海外贈與沒有申報，IRS 可能自行判定這筆錢本身的所得稅後果。</li>
        </ul>
        <p>
          同一套文件兩邊都用得上。趁買房的資料還很齊全時整理好：
        </p>
        <ul>
          <li>電匯確認單，顯示日期、金額、匯款人與收款帳戶</li>
          <li>父母簽名的聲明，表示這筆錢是贈與、不期待償還</li>
          <li>換算成美元時使用的匯率</li>
          <li>過戶結算單（closing statement），顯示資金如何使用</li>
          <li>如果錢先經過你自己的海外帳戶，該帳戶的對帳單</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 錢先停在海外的情況</div>
          <p>如果父母先把錢存進你名下的海外帳戶，再由你匯回美國，這個帳戶就是你的海外金融帳戶。如果你所有海外帳戶在這一年中任何時候合計超過 $10,000，就必須申報 FBAR，也可能需要申報 Form 8938。請見<a href="/zh-tw/library/investment/foreign-bank-account/">台灣或海外銀行帳戶需要申報嗎？</a></p>
        </div>

        <h2>常見錯誤</h2>
        <ul>
          <li>以為貸款機構的 gift letter 已經處理好 IRS 那一邊</li>
          <li>只算頭期款，忘了同一個家庭當年給的其他贈與</li>
          <li>沒有事實根據，就把贈與說成「借款」（或把借款說成「贈與」）</li>
          <li>以為錢是付給 escrow 而不是給你，就自動不需要申報 Form 3520</li>
          <li>因為 Form 3520 不在報稅人員處理的 Form 1040 裡，所以漏報</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          如果父母會列在產權上、這筆錢是借款或部分是借款、資金來自家族公司或信託、贈與以某種組合給了你和配偶，或你已經錯過 Form 3520 的截止日（請見<a href="/zh-tw/library/investment/late-form-3520/">Form 3520 忘記報或晚報，現在怎麼辦？</a>），請找 CPA 或稅務律師。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

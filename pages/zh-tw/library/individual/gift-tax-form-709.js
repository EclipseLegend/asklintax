import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/gift-tax-form-709.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'gift-tax-form-709',
  sourceHash:      '5bbcbcd94927',
  id:            '97',
  title:         '贈與稅與 Form 709：美國贈與人 2025 與 2026 年何時要申報',
  titleEn:       'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 709 填寫說明、Rev. Proc. 2024-40（2025 年金額）、Rev. Proc. 2025-32（2026 年金額）、Publication 551 與 525，以及 IRS 贈與稅常見問題，說明美國公民與居民在 2025 與 2026 年所做贈與的聯邦贈與稅。本文不涵蓋非美國公民且非居民的贈與人、信託、隔代移轉稅、企業權益的估價、遺產稅或州稅',
  persona:       ['幫孩子付房屋頭期款的父母', '幫孫子女付學費或醫療費的祖父母', '考慮分割贈與的夫妻', '配偶不是美國公民的美國公民', '贈與股票或其他增值財產的人'],
  relatedJourney: ['準備報稅', '跨境財務'],
  actionRequired: '把你在該日曆年度給每一個人的贈與加總，扣除年度免稅額，以及直接付給學校或醫療提供者的學費或醫療費；如果符合申報規定，就在次年 4 月 15 日之前申報 Form 709——即使不用繳贈與稅也一樣。',
  sources: [
    { label: 'IRS — 2025 年 Form 709 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i709.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Publication 551，資產的成本基礎', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — Publication 525（2025），應稅與非應稅所得', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — 贈與稅常見問題（Frequently asked questions on gift taxes）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes' },
  ],
}

const FAQS = [
  {
    q: '收到贈與的人要繳稅嗎？',
    a: '一般不用。2025 年 Form 709 填寫說明指出，贈與稅由贈與人負責繳納；只有在贈與人沒有繳納時，受贈人才可能要繳。Publication 525 也指出，收到的贈與財產一般不計入受贈人的所得，但這些財產之後產生的所得，例如利息或股利，要課稅。',
  },
  {
    q: '申報 Form 709 就代表要繳贈與稅嗎？',
    a: '通常不是。超過年度免稅額的贈與是要申報的應稅贈與，但一般只有在你一生的應稅贈與用完依基本免稅額（2025 年 $13,990,000、2026 年 $15,000,000）計算的抵免額之後，才需要繳贈與稅。大多數申報人只是用掉其中一部分。',
  },
  {
    q: '我和配偶可以一起申報一份 Form 709 嗎？',
    a: '不行。夫妻不能合併申報贈與稅表。需要申報的每位配偶各自申報一份 Form 709。如果你們分割贈與，IRS 建議兩份一起寄出。',
  },
  {
    q: '幫孫子女付學費要申報嗎？',
    a: '如果是直接付給符合資格的學校作為學費，就不用。這筆付款在 Form 709 上不算贈與。書本、用品、食宿費用，以及存入 529 計畫的款項，都不適用這項排除。',
  },
  {
    q: 'Form 709 和 Form 3520 一樣嗎？',
    a: '不一樣。Form 709 由做出贈與的美國公民或居民申報。Form 3520 由收到外國人大額贈與的美國人申報——例如一年內從非居民外國人個人收到超過 $100,000。收到海外贈與不需要申報 Form 709。',
  },
  {
    q: 'Form 709 什麼時候到期？可以延期嗎？',
    a: '一般是贈與次年的 4 月 15 日——2025 年的贈與為 2026 年 4 月 15 日。所得稅申報的延期（Form 4868 或 Form 2350）也會延長 Form 709 的申報期限；否則可以使用 Form 8892。兩者都不會延長繳納贈與稅的期限。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '收到海外贈與時的規定。',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 計畫：擴大的 K-12 與職業證照費用說明',
    desc:  '存入 529 計畫的贈與與 5 年選擇。',
  },
  {
    href: '/library/investment/foreign-gift-home-down-payment',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母幫我付美國房屋頭期款，要申報嗎？',
    desc:  '頭期款來自海外家人的情況。',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: '兒童稅（Kiddie Tax）：孩子的投資所得何時按父母稅率課稅',
    desc:  '贈與孩子的股票配發股利時會怎樣。',
  },
]

export default function GiftTaxForm709ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '贈與稅與 Form 709：美國贈與人 2025 與 2026 年何時要申報 | AskLinTax 繁體中文',
      description: '美國贈與人的聯邦贈與稅：2025 與 2026 年年度免稅額、終身免稅額、何時申報 Form 709、分割贈與、非美國公民配偶、學費與醫療費、贈與股票，以及 Form 709 與 Form 3520 的差別。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          如果你是美國公民或居民，<strong>2025</strong> 與 <strong>2026</strong> 年每人最多可以送 <strong>$19,000</strong> 而不用申報。一個日曆年度內給同一人（配偶以外）超過這個金額，一般就必須申報 <strong>Form 709</strong>。申報<strong>通常不</strong>代表要繳稅：超過的部分會從終身額度中扣除——2025 年為 <strong>$13,990,000</strong>、2026 年為 <strong>$15,000,000</strong>——一般要等這個額度用完才需要繳贈與稅。
        </p>

        <h2>四個不同的問題</h2>
        <ArticleTable
          head={['問題', '由什麼決定']}
          rows={[
            ['我要申報 Form 709 嗎？', '下面的申報規定——例如給同一人超過 $19,000、任何未來權益的贈與，或分割贈與'],
            ['每年有多少可以排除？', '每位受贈人 $19,000 的年度免稅額（2025 與 2026），加上直接支付的學費與醫療費'],
            ['我用掉多少終身免稅額？', '你的應稅贈與——超過排除額的部分——會減少基本免稅額的剩餘金額'],
            ['我真的要繳贈與稅嗎？', '只有在你一生的應稅贈與超過基本免稅額、抵免額不再足以抵銷稅額時才要繳'],
          ]}
        />

        <h2>主要金額</h2>
        <ArticleTable
          head={['金額', '2025', '2026']}
          rows={[
            ['年度免稅額，每位受贈人', '$19,000', '$19,000'],
            ['贈與非美國公民配偶的年度免稅額', '$190,000', '$194,000'],
            ['基本免稅額（終身）', '$13,990,000', '$15,000,000'],
          ]}
        />
        <p>
          2026 年金額來自 Rev. Proc. 2025-32。2026 年 $15,000,000 的基本免稅額由 P.L. 119-21 訂定，同時用於遺產稅抵免與贈與稅抵免。贈與美國公民配偶一般沒有上限。
        </p>

        <h2>什麼時候必須申報 Form 709</h2>
        <ul>
          <li>你在一年內給任何一人（配偶以外）<strong>超過 $19,000</strong>。</li>
          <li>你做了<strong>未來權益</strong>的贈與（例如許多信託形式的贈與），即使低於 $19,000。</li>
          <li>你和配偶想要<strong>分割贈與</strong>，不論金額多少。</li>
          <li>你給非美國公民配偶的現時權益贈與超過 <strong>$190,000</strong>（2025）或 <strong>$194,000</strong>（2026），或做了任何未來權益的贈與。</li>
          <li>以共同財產或與配偶共有的財產做贈與，視為由兩位配偶各自贈與，所以兩人可能都要申報。</li>
        </ul>
        <p>
          如果你所有的贈與都是每人 $19,000 以下的現時權益，而且沒有贈與配偶——或者對美國公民配偶只有直接贈與——就<strong>不</strong>需要申報。完全可作為慈善捐贈扣除的贈與，一般也不需要申報。
        </p>

        <h2>直接支付的學費與醫療費</h2>
        <p>
          符合下列排除條件的付款在 Form 709 上不算贈與，所以不會用到 $19,000 的年度免稅額，也不用申報：
        </p>
        <ul>
          <li><strong>直接</strong>付給符合資格的美國或外國學校的<strong>學費</strong>。書本、用品與食宿不適用，存入 529 計畫的款項也不適用這項排除。</li>
          <li><strong>直接</strong>付給醫療提供者的<strong>醫療費用</strong>，包括幫別人付的醫療保險費，但不包括受贈人保險會理賠的金額。</li>
        </ul>
        <p>
          把錢給本人、再由本人付給學校或醫生，就是一般的贈與。存入 529 計畫超過 $19,000 時，你可以在 Form 709 上選擇把最多 $95,000（2025）分攤到 5 年。
        </p>

        <h2>夫妻分割贈與</h2>
        <p>
          如果兩位配偶都同意，你們任何一方當年給其他人的所有贈與，都視為各贈與一半——所以夫妻在 2025 或 2026 年可以給同一人 $38,000 而不用到任何終身額度。分割贈與的條件：
        </p>
        <ul>
          <li>贈與時你們必須是夫妻，而且任何一方都不能是非美國公民的非居民；</li>
          <li>同意適用於當年給第三人的<strong>所有</strong>贈與，不只一筆；</li>
          <li>兩位配偶一般都要各自申報 Form 709，除非符合有限的例外（例如只有一方做了贈與、給任何一人都不超過 $38,000，而且全部是現時權益）；以及</li>
          <li>當年每位配偶都要對另一方的贈與稅負連帶責任。</li>
        </ul>

        <h2>範例（說明用，2025 年）</h2>
        <p>
          <strong>Mei</strong> 是美國公民，2025 年給兒子 $50,000 作為房屋頭期款。那一年她沒有再給兒子其他贈與。
        </p>
        <ArticleTable
          head={['', '不分割贈與', '分割贈與']}
          rows={[
            ['視為每位配偶各自的贈與', '$50,000（只有 Mei）', '各 $25,000'],
            ['年度免稅額', '$19,000', '各 $19,000'],
            ['在 Form 709 上申報的應稅贈與', '$31,000', '各 $6,000'],
            ['誰要在 2026 年 4 月 15 日前申報 Form 709', 'Mei', 'Mei 與她的先生（各自申報）'],
            ['應繳贈與稅（假設先前沒有接近上限的應稅贈與）', '無——用掉她 $13,990,000 基本免稅額中的 $31,000', '無——各自用掉自己額度中的 $6,000'],
          ]}
        />
        <p>
          因為贈與超過 $38,000，同意分割的配偶也必須申報。貸款機構可能會要求頭期款的贈與信（gift letter）；這是房貸的要求，不是 IRS 的表格。如果頭期款來自海外家人，規定不一樣——請參考<a href="/zh-tw/library/investment/foreign-gift-home-down-payment/">海外父母幫我付美國房屋頭期款</a>。
        </p>

        <h2>贈與非美國公民配偶</h2>
        <p>
          贈與美國公民配偶一般適用無上限的婚姻扣除。贈與<strong>非</strong>美國公民的配偶則改為適用較高的年度免稅額——2025 年 <strong>$190,000</strong>、2026 年 <strong>$194,000</strong>——適用於現時權益的贈與。超過這個金額，或做了未來權益的贈與，就要申報 Form 709。如果任何一方是非美國公民的非居民，就不能分割贈與。所得稅報稅問題請參考<a href="/zh-tw/library/individual/nonresident-spouse/">非居民配偶</a>。
        </p>

        <h2>贈與股票與其他增值財產</h2>
        <ul>
          <li><strong>Form 709 上的價值：</strong>贈與當天財產的公平市價。</li>
          <li><strong>受贈人的成本基礎：</strong>依 Publication 551，受贈人計算收益時一般沿用贈與人的調整後成本基礎（某些情況下加上已繳的部分贈與稅）。如果贈與時的價值低於贈與人的成本基礎，計算損失時的成本基礎就是那個較低的價值。</li>
          <li><strong>這代表什麼：</strong>贈與增值股票並不會讓內含的收益消失——受贈人出售時一般要為它繳稅。把股票送給孩子也可能涉及兒童稅；請參考<a href="/zh-tw/library/individual/kiddie-tax/">兒童稅指南</a>。</li>
        </ul>

        <h2>Form 709 與 Form 3520</h2>
        <ArticleTable
          head={['', 'Form 709', 'Form 3520（Part IV）']}
          rows={[
            ['誰申報', '做出贈與的美國公民或居民', '收到外國人贈與的美國人'],
            ['主要申報條件', '給同一人超過 $19,000（2025 與 2026），以及上面的其他規定', '例如一年內從非居民外國人個人或外國遺產收到超過 $100,000'],
            ['要繳稅嗎？', '只有在一生的應稅贈與用完抵免額之後', '這是資訊申報；贈與本身一般不會對受贈人課稅'],
          ]}
        />
        <p>
          匯錢給孩子的美國父母是<strong>贈與人</strong>，要看 Form 709。收到海外父母匯款的美國子女則要看 Form 3520。請參考<a href="/zh-tw/library/investment/foreign-gifts/">海外贈與與 Form 3520</a>。
        </p>

        <h2>截止日</h2>
        <p>
          Form 709 是年度申報表，在贈與次年的 <strong>4 月 15 日</strong>之前申報（如果 4 月 15 日是週末或假日，順延到下一個工作日）。所得稅申報的延期（Form 4868 或 Form 2350）也會延長 Form 709 的申報期限；否則可以使用 Form 8892。<strong>兩者都不會延長繳納</strong>贈與稅的期限。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為申報就要繳稅。</strong>大多數 Form 709 申報人不用繳贈與稅。</li>
          <li><strong>以為受贈人要在所得稅表上申報贈與。</strong></li>
          <li><strong>透過學生本人付學費</strong>，而不是直接付給學校。</li>
          <li><strong>只分割部分贈與</strong>——同意適用於當年給第三人的所有贈與。</li>
          <li><strong>涉及海外家人時把 Form 709 和 Form 3520 搞混。</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>信託形式的贈與、需要估價的企業權益或不動產贈與、給孫子女的贈與（隔代移轉稅）、非美國公民或居民所做的贈與，以及遺產規劃，都超出本文範圍。本文不涵蓋州的贈與稅或繼承稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

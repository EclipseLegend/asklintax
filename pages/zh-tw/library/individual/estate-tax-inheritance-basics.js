import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/estate-tax-inheritance-basics.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'estate-tax-inheritance-basics',
  sourceHash:      'ffbdc483a260',
  id:            '109',
  title:         '遺產稅與繼承基本概念：2025 與 2026 年免稅額、Form 706 與非居民',
  titleEn:       'Estate Tax and Inheritance Basics: 2025 and 2026 Exclusions, Form 706, and Nonresidents',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 706 說明（2026 年 7 月版）、Form 706-NA 說明（2025 年 8 月版）、Publication 559（2025）、Publication 551、Publication 525，以及 Rev. Proc. 2024-40 與 2025-32，說明 2025 與 2026 年過世者的聯邦遺產稅，以及繼承財產的所得稅處理。本文不涵蓋遺產規劃、信託、隔代移轉稅、估價方法，也不詳細說明各國的遺產稅條約，並且不列出各州的遺產稅或繼承稅規定',
  persona:       ['繼承人與受益人', '家人遺產的遺囑執行人', '一方不是美國公民的已婚夫妻', '擁有美國股票或房地產的海外父母', '綠卡持有人'],
  relatedJourney: ['跨境財務', '金錢與福利'],
  actionRequired: '先確認過世者是美國公民、在美國有住所（domicile），還是非居民非公民；這決定適用 Form 706 還是 Form 706-NA。保留繼承財產在過世當天價值的紀錄。',
  sources: [
    { label: 'IRS — Form 706 說明（2026 年 7 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i706.pdf' },
    { label: 'IRS — Form 706-NA 說明（2025 年 8 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i706na.pdf' },
    { label: 'IRS — Publication 559（2025），遺屬、遺囑執行人與遺產管理人', url: 'https://www.irs.gov/publications/p559' },
    { label: 'IRS — Publication 551，資產成本基礎', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — Publication 525，應稅與不課稅所得', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '我繼承的錢要繳聯邦所得稅嗎？',
    a: '通常不用。Publication 525 指出，你以贈與、遺贈或繼承取得的財產不計入你的所得。但你取得之後財產產生的收入 — 利息、股利、租金 — 要由你課稅，而從繼承的 IRA 或 401(k) 提領的款項通常也要課稅。',
  },
  {
    q: '聯邦遺產稅由誰繳 — 遺產還是繼承人？',
    a: '由遺產繳。遺囑執行人申報 Form 706 或 Form 706-NA，並在分配財產前從遺產支付稅款。聯邦沒有對繼承人課的繼承稅；有些州有自己的遺產稅或繼承稅。',
  },
  {
    q: '我的父母住在海外，擁有美國股票。$15,000,000 的免稅額適用嗎？',
    a: '不適用。基本免稅額是給美國公民和在美國有住所的人的遺產。對非居民非公民，如果美國境內資產加上特定生前贈與超過 $60,000，通常就必須申報 Form 706-NA，而且統一抵稅額通常只有 $13,000，除非遺產稅條約提供更多。',
  },
  {
    q: '我有綠卡。就遺產稅而言，我是非居民嗎？',
    a: '不一定。遺產稅看的是住所（domicile）— 住在某地且目前沒有明確日後搬走的打算 — 而不是所得稅的居民測試。Form 706-NA 說明指出，過世者可能在所得稅上是美國居民，但在遺產稅上被視為非居民。綠卡是相關的事實，但不是遺產稅住所的決定性證明；關鍵是此人實際住在哪裡，以及是否打算留在那裡。',
  },
  {
    q: '什麼是可攜性（portability）？',
    a: '可攜性讓在世配偶可以使用過世配偶未用完的免稅額（DSUE 金額）。遺囑執行人必須在按時申報的 Form 706 上選擇，即使原本不需要申報。Rev. Proc. 2022-32 讓原本不需要申報的遺產，最晚可以在過世滿五週年前補做選擇。非居民非公民的遺產不能選擇可攜性。',
  },
  {
    q: '我從海外親戚那裡繼承了財產，需要申報嗎？',
    a: '它不是所得，但如果你是美國人，一年內從非居民外國人個人或外國遺產收到超過 $100,000，可能需要申報 Form 3520。請參考我們關於海外贈與和繼承的指南。',
  },
]

const RELATED = [
  {
    href: '/library/individual/gift-tax-form-709',
    cat:  'Individuals & Families',
    title: '贈與稅與 Form 709：美國贈與人 2025 與 2026 年何時要申報',
    desc:  '生前贈與和遺產共用同一個免稅額。',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與和海外遺產，在美國申報有什麼不同？',
    desc:  '從海外繼承時的 Form 3520。',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: '退休帳戶提領與 RMD：稅、10% 罰款與期限',
    desc:  '繼承的 IRA 與 401(k) 的規定。',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: '非居民配偶：我們可以合併報稅嗎？',
    desc:  '配偶不是美國公民時的所得稅規定。',
  },
]

export default function EstateTaxInheritancePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '遺產稅與繼承基本概念：2025 與 2026 年免稅額、Form 706 與非居民 | AskLinTax 繁體中文',
      description: '聯邦遺產稅與繼承說明：$13,990,000（2025）與 $15,000,000（2026）免稅額、Form 706、可攜性、成本基礎調整、繼承的退休帳戶、非公民配偶，以及非居民非公民的 Form 706-NA。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          聯邦<strong>遺產稅</strong>是對過世者的遺產課的稅，不是對繼承人課的稅。對美國公民和在美國有住所的人，<strong>2025</strong> 年過世的基本免稅額是 <strong>$13,990,000</strong>，<strong>2026</strong> 年過世是 <strong>$15,000,000</strong>，所以大多數遺產不用繳稅。繼承人通常不需要為繼承的財產繳聯邦所得稅，而且繼承財產的成本基礎通常是過世時的價值。重要的例外是擁有美國資產的<strong>非居民非公民</strong>：他們的遺產只要超過 <strong>$60,000</strong>，就可能必須申報 <strong>Form 706-NA</strong>。
        </p>

        <h2>遺產稅、繼承稅與贈與稅</h2>
        <ArticleTable
          head={['稅', '對誰課', '聯邦有嗎？']}
          rows={[
            ['遺產稅', '過世者的遺產，由遺囑執行人申報', '有 — Form 706 或 Form 706-NA'],
            ['繼承稅', '收到財產的人', '聯邦沒有繼承稅；有些州有'],
            ['贈與稅', '生前贈與的贈與人', '有 — Form 709；和遺產稅使用同一個終身免稅額'],
          ]}
        />
        <p>
          生前的應稅贈與會減少過世時剩下的免稅額，這就是 Form 706 要求填寫「調整後應稅贈與」的原因。在年度免稅額以內的贈與不算。
        </p>

        <h2>適用哪一種遺產稅規定：三種情況</h2>
        <ArticleTable
          head={['過世者', '申報表', '課稅範圍', '免稅額或抵稅額']}
          rows={[
            ['美國公民（不論住在哪裡）', 'Form 706', '全球遺產', '$13,990,000（2025）；$15,000,000（2026）'],
            ['在美國有住所的非公民', 'Form 706', '全球遺產', '$13,990,000（2025）；$15,000,000（2026）'],
            ['非居民非公民（NRNC）', 'Form 706-NA', '只有位於美國的資產', '統一抵稅額通常為 $13,000，除非條約提供更多'],
          ]}
        />
        <ul>
          <li><strong>住所（domicile）：</strong>就遺產稅而言，只要你住在某地，即使時間很短，而且目前沒有明確日後搬走的打算，你就在那裡取得住所。</li>
          <li><strong>所得稅居民身分不一樣。</strong>綠卡測試和實際居住天數測試決定所得稅的居民身分。Form 706-NA 說明指出，過世者可能在所得稅上是美國居民，但在遺產稅上是非居民。</li>
          <li><strong>美國屬地：</strong>只因為與美國屬地的關係而成為公民的人，在這些規定中不被視為美國公民。</li>
        </ul>

        <h2>公民與在美國有住所者的 Form 706</h2>
        <ul>
          <li><strong>誰必須申報：</strong>如果總遺產加上調整後應稅贈與與任何特定免稅額，超過過世年度的基本免稅額，遺囑執行人就必須申報 — 或是為了選擇可攜性而申報。</li>
          <li><strong>截止日：</strong>過世後 9 個月；可以用 Form 4768 申請 6 個月延期。</li>
          <li><strong>2026 年金額：</strong>基本免稅額 $15,000,000，基本抵稅額 $5,945,800（Form 706 說明，2026 年 7 月版）。最高稅率為 40%。</li>
          <li><strong>可攜性：</strong>遺囑執行人可以按時申報 Form 706，把未用完的免稅額轉給在世配偶；依 Rev. Proc. 2022-32，原本不需要申報的遺產最晚可以在過世滿五週年前補做選擇。</li>
        </ul>

        <h2>在世配偶不是美國公民時</h2>
        <ul>
          <li><strong>配偶扣除額：</strong>留給美國公民配偶的財產通常可以無上限扣除。對不是美國公民的配偶，只有在財產轉入<strong>合格國內信託（QDOT）</strong>，或在申報前轉入 QDOT，而且遺囑執行人選擇 QDOT 身分時，才能扣除。</li>
          <li><strong>QDOT 的稅：</strong>遺產稅之後會在信託分配款項時課徵。</li>
          <li><strong>生前贈與：</strong>贈與非公民配偶的年度免稅額，2025 年為 $190,000，2026 年為 $194,000。</li>
        </ul>

        <h2>非居民非公民與 Form 706-NA</h2>
        <ul>
          <li><strong>申報門檻：</strong>如果位於美國的資產在過世當天的價值，加上贈與稅特定免稅額（用於 1976 年 9 月 9 日到 12 月 31 日的贈與）以及 1976 年以後的調整後應稅贈與，超過 <strong>$60,000</strong>，遺囑執行人就必須申報。</li>
          <li><strong>要申報不等於要繳稅。</strong>$60,000 的測試用的是美國資產的總額。允許的扣除額、統一抵稅額（通常為 $13,000）以及任何條約優惠，可以減少稅額，有時甚至減到零，但仍然必須申報。</li>
          <li><strong>截止日：</strong>過世後 9 個月；延期請用 Form 4768。</li>
          <li><strong>沒有可攜性</strong>，而且除非條約另有規定，配偶扣除額只適用於美國公民配偶或 QDOT。</li>
        </ul>
        <ArticleTable
          head={['非居民非公民擁有的資產', '是否位於美國？']}
          rows={[
            ['實際位於美國的房地產或有形財產', '是'],
            ['美國公司的股票，不論股票憑證放在哪裡', '是'],
            ['外國公司的股票', '否'],
            ['和美國事業無關的美國銀行存款', '否'],
            ['以過世者為被保險人的壽險理賠金', '否'],
          ]}
        />
        <p>
          <strong>條約：</strong>Form 706-NA 說明列出的遺產稅或死亡稅條約國家有：澳洲、奧地利、加拿大（透過所得稅條約）、丹麥、芬蘭、法國、德國、希臘、愛爾蘭、義大利、日本、荷蘭、南非、瑞士和英國。條約可能改變資產所在地規定、抵稅額或配偶扣除額；採用條約立場時必須揭露。台灣和中國都不在這份名單上。
        </p>

        <h2>繼承人需要知道的所得稅規定</h2>
        <ul>
          <li><strong>繼承的現金或財產：</strong>不是你的所得（Publication 525）。</li>
          <li><strong>成本基礎：</strong>你繼承財產的成本基礎，通常是過世當天的公平市價；如果遺囑執行人選擇替代估價日，則是替代估價日的價值（Publication 551 與 559；可能適用特別規定，例如特殊用途估價）。如果你很快就賣掉，通常沒有多少利得。</li>
          <li><strong>過世者的應得所得（IRD）：</strong>過世者有權取得但還沒收到的收入 — 例如過世時已賺取但未支付的工資，或繼承的傳統 IRA 中應稅的餘額 — 由收到的人課稅（Publication 559），即使它也已計入遺產。</li>
          <li><strong>IRD 的遺產稅：</strong>如果遺產為 IRD 繳了聯邦遺產稅，收到的人可能可以把相關的稅額作為逐項扣除額扣除。</li>
          <li><strong>繼承的退休帳戶：</strong>有提領時間的規定；請參考我們的退休帳戶提領指南。</li>
        </ul>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Grace', '吳先生', 'Daniel']}
          rows={[
            ['過世時的身分', '美國公民，2026 年過世', '住在台灣，不是美國公民，從未在美國居住；2026 年過世', '住在加州的綠卡持有人，沒有離開的打算；2026 年過世'],
            ['資產', '全球 $4,000,000', '美國股票 $300,000，美國銀行帳戶 $200,000', '$2,000,000，留給不是美國公民的妻子'],
            ['申報表', '不需要申報，但她的遺囑執行人申報 Form 706，為她丈夫選擇可攜性', 'Form 706-NA：位於美國的資產為 $300,000（存款不計入），超過 $60,000', '以在美國有住所者身分適用 Form 706；低於 $15,000,000 不需要申報'],
            ['聯邦遺產稅', '無', '$300,000 的暫定稅額 $87,800，減去 $13,000 抵稅額 = $74,800（扣除額之前）', '無；遺產低於免稅額，所以不需要妻子的配偶扣除額'],
          ]}
        />
        <p>
          吳先生的數字使用 Form 706 說明中的 Table A，並假設沒有生前贈與、沒有扣除額、沒有州的死亡稅，而且銀行存款和美國事業無關；台灣不在條約名單上。他的繼承人對美國股票的成本基礎，通常是他過世時的價值。Daniel 的住所是依據他住在哪裡以及打算留下的意圖，而不是只看綠卡；如果他的遺產超過免稅額，他的妻子需要 QDOT 才能適用配偶扣除額。三個範例都已簡化。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為 $15,000,000 免稅額適用於海外父母</strong>擁有的美國股票或房地產。</li>
          <li><strong>把所得稅居民身分當成遺產稅住所。</strong></li>
          <li><strong>第一位配偶過世時沒有選擇可攜性</strong>，失去未用完的免稅額。</li>
          <li><strong>把繼承的財產當成所得申報</strong>，或忘了從繼承的 IRA 提領要課稅。</li>
          <li><strong>用原始購買價格</strong>而不是過世當天的價值作為成本基礎。</li>
          <li><strong>忽略州的遺產稅或繼承稅</strong>，它們的適用金額可能低很多。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請尋求專業協助</div>
          <p>遺產稅申報、QDOT、條約主張、估價和海外遺囑認證都很複雜，逾期或錯誤申報的罰款可能很高。可能需要申報 Form 706 或 Form 706-NA 的遺產，應由遺產律師或稅務專業人士審閱。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

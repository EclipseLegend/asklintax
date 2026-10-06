import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gift-vs-inheritance.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gift-vs-inheritance',
  sourceHash:      'dc43a4acb87e',
  id:            '39',
  title:         '海外贈與和海外遺產，在美國申報有什麼不同？',
  titleEn:       'Foreign gift vs. foreign inheritance: what U.S. taxpayers need to report',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '比較美國公民與居民外國人從非居民外國人個人與海外遺產收到的贈與與遺產。外國的遺產稅與繼承稅、遺產本身在美國的申報、繼承的海外退休帳戶、海外信託，以及適用對象放棄國籍者（Covered Expatriate），需要專業人士檢視',
  persona:       ['父母或祖父母住在海外的繼承人', '生前收到海外家人贈與的人', '正在考慮如何接受海外家族資產的人', '在美國協助處理遺產的家屬'],
  relatedJourney: ['跨境財務'],
  actionRequired: '當年來自有親屬關係外國人的合計超過 $100,000 時，海外贈與與遺產要一起在 Form 3520 Part IV 申報。兩者在收到時通常都不算收入 — 但資產之後產生的收入要繳稅，而且日後出售時，遺產與贈與的成本基礎不同。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Publication 525 — 應稅與免稅所得（贈與與遺產）', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Publication 551 — 資產的成本基礎（Basis of Assets）', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: '我爸爸在台灣留給我的遺產，在美國算我的應稅收入嗎？',
    a: '大多數情況下，你繼承的財產不計入你的所得。但這些財產之後產生的收入（利息、股利、租金）要繳稅，而某些繼承項目 — 例如繼承的退休金或 IRA — 在你領取時可能包含應稅的部分。請看清楚遺產實際包含哪些東西。',
  },
  {
    q: '遺產在 Form 3520 上的申報方式，和贈與一樣嗎？',
    a: '一樣。Part IV 涵蓋來自非居民外國人與海外遺產的贈與與遺產（gifts and bequests）。判斷是否超過 $100,000 時，遺產要和來自有親屬關係外國人的贈與一起計算，每一筆超過 $5,000 的項目都要列在第 54 行。',
  },
  {
    q: '遺產要算在哪一年 — 我媽媽過世那年，還是我實際收到錢的那年？',
    a: 'Part IV 問的是你在該稅務年度收到的贈與與遺產。遺產可能需要一段時間才能處理完，所以你收到財產的年度可能比過世的年度晚。如果時間點不清楚，請找人檢視。',
  },
  {
    q: '我的父親是住在海外的美國公民，他的遺產算海外遺產嗎？',
    a: '通常不算。海外遺產（foreign bequest）來自非居民外國人個人或海外遺產（foreign estate）。來自美國公民或居民的遺產，不在 Form 3520 Part IV 申報，不過遺產本身可能有自己在美國的申報問題。',
  },
  {
    q: '父母是把公寓送給我，還是留給我，為什麼有差？',
    a: '因為成本基礎（basis）。繼承的財產，成本基礎通常是死亡日的公平市價。受贈的財產，成本基礎通常沿用贈與人的調整後成本基礎。對於大幅增值的資產，你日後要繳稅的利得可能差很多。',
  },
  {
    q: '我繼承了一個仍在我名下的台灣銀行帳戶，還有其他要申報的嗎？',
    a: '可能有。帳戶變成你的之後，就是你的海外金融帳戶：利息要繳稅，達到門檻時也適用 FBAR 與 Form 8938。你直接持有的海外繼承財產（例如一間公寓），本身不在 FBAR 或 Form 8938 上申報。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於海外贈與與 Form 3520 的基礎指南。',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: '海外房產：美國納稅人需要知道的事',
    desc:  '繼承了海外的房子？持有、出租與出售。',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: '海外賣房後把錢匯到美國，要申報什麼？',
    desc:  '成本基礎、匯率與外國稅如何影響繼承房產的出售。',
  },
  {
    href: '/library/investment/foreign-gift-vs-foreign-trust',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？',
    desc:  '如果遺產是透過信託給你的，就是另一個類別。',
  },
]

export default function ForeignGiftVsInheritanceZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外贈與與海外遺產：美國稅務與 Form 3520 申報的差別 | AskLinTax 繁體中文',
      description: '比較來自海外家人的贈與與遺產：Form 3520 Part IV 申報、為什麼兩者通常都不算收入、哪些仍然要繳稅，以及日後出售時成本基礎有什麼不同。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          從美國受贈人的角度來看，來自非居民外國人的<strong>贈與</strong>，和來自非居民外國人或海外遺產的<strong>遺產</strong>（bequest），在你收到的那一刻處理方式相同：
        </p>
        <ul>
          <li>通常<strong>不是</strong>你的<strong>應稅收入</strong>。</li>
          <li>當你這一年來自有親屬關係外國人的合計超過 <strong>$100,000</strong>，要一起在 <strong>Form 3520 Part IV</strong> 申報。</li>
        </ul>
        <p>
          差別出現在<strong>之後</strong>：你出售時的成本基礎、遺產實際包含哪些東西，以及還有誰（遺產本身）可能有申報義務。
        </p>

        <ArticleTable
          head={['', '非居民外國人生前的贈與', '來自非居民外國人或海外遺產的遺產']}
          rows={[
            ['收到時算你的收入嗎？', '通常不算', '通常不算 — 但某些繼承項目可能包含應稅金額'],
            ['要報 Form 3520 Part IV 嗎？', '當年親屬合計 > $100,000 時', '同樣的測試，與贈與一起計算'],
            ['算在哪一年', '你收到的那一年', '你收到的那一年（遺產處理可能需要時間）'],
            ['日後出售的成本基礎', '通常沿用贈與人的調整後成本基礎', '通常是死亡日的公平市價'],
            ['資產之後產生的收入', '要繳稅', '要繳稅'],
          ]}
        />

        <h2>申報：同一個 Part IV、同一個門檻</h2>
        <p>
          Form 3520 第 54 行問的是：你是否從非居民外國人或海外遺產收到超過 $100,000、並當作<strong>贈與或遺產</strong>處理的款項。你父親生前給你的贈與，和他過世後遺產給你的遺贈，如果在同一年收到，要和其他有親屬關係外國人的贈與一起計算。每一筆超過 $5,000 的項目，都要列出日期、說明與公平市價。
        </p>
        <p>
          來自<strong>美國公民或居民</strong>的贈與或遺產，即使對方住在海外，也不是海外贈與或海外遺產。
        </p>

        <h2>「不算收入」是有限度的</h2>
        <p>
          IRS Publication 525 指出，大多數情況下，你以贈與、遺贈或繼承方式收到的財產，不計入你的所得。它也說明了限度：
        </p>
        <ul>
          <li>如果財產之後產生收入 — 利息、股利、租金 — 這些收入要由你繳稅。</li>
          <li>如果贈與或遺產<strong>本身就是財產的收入</strong>（例如財產賺到的收益），這些收入要由你繳稅。</li>
          <li>如果你繼承的是退休金或 IRA，可能需要把其中一部分計入你的所得。</li>
        </ul>
        <p>
          所以「遺產都免稅」這句話太簡化了。請看清楚你實際收到的是什麼 — 現金、不動產、股票、帳戶、退休計畫 — 以及它會如何產生收入。
        </p>

        <h2>成本基礎：之後最大的差別</h2>
        <p>
          IRS Publication 551 說明了一般的成本基礎規則：
        </p>
        <ul>
          <li><strong>繼承的財產：</strong>通常是死亡日的公平市價（或遺產選擇的替代評價日的價值）。</li>
          <li><strong>受贈的財產：</strong>通常沿用贈與人的調整後成本基礎。如果贈與時的價值低於贈與人的成本基礎，計算損失時使用不同的成本基礎。</li>
        </ul>

        <h3>例子</h3>
        <p>
          Lily 的媽媽當年以約 10 萬美元買下高雄的一間公寓，現在價值 40 萬美元。
        </p>
        <ul>
          <li>如果媽媽現在把公寓<strong>送給</strong> Lily，Lily 的成本基礎通常是媽媽的調整後成本基礎 — 大約 10 萬美元。日後以 40 萬美元出售，會有很大的美國利得。</li>
          <li>如果 Lily 在公寓價值 40 萬美元時<strong>繼承</strong>，她的成本基礎通常是 40 萬美元。不久後以這個價格出售，美國利得很少或沒有。</li>
        </ul>
        <p>
          不論哪一種，如果她媽媽是非居民外國人，而這間公寓的價值加上當年其他有親屬關係者的贈與超過 $100,000，Lily 都要在收到的那一年，以公平市價在 Form 3520 Part IV 申報這間公寓。（以美元簡化說明；匯率與外國稅會增加細節。）
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 這不是規劃建議</div>
          <p>家族資產應該現在贈與、還是留作遺產，取決於的遠不只是美國的成本基礎 — 還包括另一個國家的贈與稅、遺產稅與移轉稅，以及家庭的整體情況。在調整任何安排之前，請先尋求跨國稅務建議。</p>
        </div>

        <h2>其他值得知道的差別</h2>
        <ul>
          <li><strong>時間點。</strong>贈與在移轉時就收到。遺產可能在過世後一年或更久，遺產處理完畢時才收到。請在你收到的那一年申報。</li>
          <li><strong>文件。</strong>贈與要保留證明它是贈與的紀錄。遺產要保留死亡證明、遺產或遺囑認證文件，以及死亡日的估價。</li>
          <li><strong>信託。</strong>如果遺產是透過海外信託給你的，那是信託分配，不是 Part IV 的遺產。請見<a href="/zh-tw/library/investment/foreign-gift-vs-foreign-trust/">海外父母贈與 vs. Foreign Trust Distribution，為什麼不能搞混？</a></li>
          <li><strong>適用對象放棄國籍者。</strong>如果贈與人或過世的人是被視為「適用對象放棄國籍者」（Covered Expatriate）的前美國公民或前長期綠卡持有人，美國受贈人可能要繳一種特別的稅。</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          大多數來自海外的遺產都值得找專業人士。特別是遺產包含不動產、股票、退休金或退休帳戶，或一個事業；透過信託給付；遺產花了好幾年才處理完；或你正在決定要保留、出售或移轉什麼。要出售繼承的房產？請見<a href="/zh-tw/library/investment/sold-foreign-property-transfer/">海外賣房後把錢匯到美國，要申報什麼？</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

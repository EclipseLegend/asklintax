import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/pfic-form-8621.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'pfic-form-8621',
  sourceHash:      '97b9194aa5f0',
  id:            '93',
  title:         '海外共同基金與 ETF：PFIC 規定與 Form 8621',
  titleEn:       'Foreign Mutual Funds and ETFs: PFIC Rules and Form 8621',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Form 8621 及其填寫說明（2025 年 12 月修訂版）、Form 8938 填寫說明、Publication 514（2025），以及第 1298(f) 條正式法規的前言（T.D. 9806，Internal Revenue Bulletin 2017-4），說明 2025 與 2026 稅務年度個人的被動外國投資公司（PFIC）規定與 Form 8621 申報。本文不判定任何特定基金是否為 PFIC，不計算第 1291 條的稅額與利息，也不詳細涵蓋透過合夥、信託或其他 PFIC 持有的情況，不涵蓋州稅',
  persona:       ['持有台灣或其他非美國共同基金或 ETF 的人', '有海外證券或銀行投資帳戶的美國居民', '搬來美國前買了海外基金的新美國居民', '收到海外基金分配或賣出海外基金股份的人'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '利用基金本身的資料並請專業人士協助，找出你持有的每一檔海外基金或公司是否為 PFIC。如果是，每年確認是否需要 Form 8621、是否適用申報例外、是否可以做 QEF 或按市價計值選擇，並在需要時隨稅表申報 Form 8621。',
  sources: [
    { label: 'IRS — Form 8621 填寫說明（2025 年 12 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf' },
    { label: 'IRS — Form 8621（2025 年 12 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/f8621.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2017-4，T.D. 9806（第 1298(f) 條正式法規）', url: 'https://www.irs.gov/pub/irs-irbs/irb17-04.pdf' },
    { label: 'IRS — Notice 2014-51（第 1298(f) 條申報）', url: 'https://www.irs.gov/pub/irs-drop/n-14-51.pdf' },
    { label: 'IRS — Form 8938 填寫說明', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — Publication 514（2025），個人的外國稅額抵免', url: 'https://www.irs.gov/publications/p514' },
  ],
}

const FAQS = [
  {
    q: '每一檔台灣 ETF 或共同基金都是 PFIC 嗎？',
    a: '不一定。依 Form 8621 填寫說明，外國公司符合所得測試或資產測試就是 PFIC。許多海外集合型基金可能符合這些測試，但某一檔基金是不是 PFIC，甚至在美國稅法上是不是公司，取決於它的結構與實際情況。IRS 沒有公布名單。',
  },
  {
    q: '如果我沒有收到分配、也沒有賣出，還需要申報 Form 8621 嗎？',
    a: '有可能。五種申報情形之一是第 1298(f) 條要求的年度申報。Form 8621 填寫說明提供有限的例外，例如某些第 1291 條基金的 $25,000（合併申報 $50,000）例外，但只適用於你沒有收到超額分配、也沒有認列獲利的情況。',
  },
  {
    q: '$25,000 規定是一般性的豁免嗎？',
    a: '不是。它只是第 1291 條基金不必填 Part I 的狹窄例外。它計算你所有 PFIC 股票的價值，只在你沒有從該基金收到超額分配、也沒有認列獲利時適用，而且不會改變所得的課稅方式。如果你有 QEF 或按市價計值的選擇要申報，也不適用。',
  },
  {
    q: '如果我沒有申報必須申報的 Form 8621，會怎樣？',
    a: '如果必須申報 Form 8621，正式法規的前言（T.D. 9806）說明，IRS 對相關稅表核定稅額的期間，要到資料申報後三年才結束。如果未申報是基於合理原因而非故意疏忽，延長只適用於與 PFIC 相關的項目。如果該年度不需要申報 Form 8621，Notice 2014-51 說不申報不會延長期間。',
  },
  {
    q: '我可以避免超額分配的規定嗎？',
    a: '有時可以。如果可以使用並及時做出，合格選擇基金（QEF）選擇或按市價計值選擇，會改變這項投資的課稅方式。QEF 選擇需要基金每年提供資訊報表。按市價計值只適用於可流通股票（marketable stock）。',
  },
  {
    q: '這檔基金也要申報在 Form 8938 上嗎？',
    a: '如果你為這項資產按時申報了 Form 8621，Form 8938 填寫說明將其視為重複申報：你不必在 Form 8938 上再次申報這項資產，但要在 Form 8938 上註明你申報了 Form 8621。FBAR 申報則是另一項要求。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-brokerage-account',
    cat:  'Investments & Foreign Accounts',
    title: '海外股票與證券帳戶怎麼申報？',
    desc:  '海外投資帳戶的 FBAR 與 Form 8938 申報。',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR 與 Form 8938 有什麼不同？',
    desc:  '比較兩種海外帳戶申報。',
  },
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: '外國稅額抵免（Form 1116）：避免台灣與其他海外所得被雙重課稅',
    desc:  '基金所得的外國稅與抵免。',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: '住在台灣或海外：美國報稅清單',
    desc:  'PFIC 在其他申報步驟中的位置。',
  },
]

export default function PficForm8621ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外共同基金與 ETF：PFIC 規定與 Form 8621 | AskLinTax 繁體中文',
      description: 'PFIC 規定說明：所得與資產測試、海外共同基金與 ETF、Form 8621 申報情形與狹窄例外、超額分配、QEF 與按市價計值選擇，以及核定期間。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>被動外國投資公司（PFIC）</strong>是所得或資產大多屬於被動性質的外國公司。許多海外共同基金與 ETF 可能落入這個類別。如果你持有 PFIC 股份，在收到某些分配或賣出時可能適用特別的稅務規定，而且你可能每年都要申報 <strong>Form 8621</strong>。基金是不是 PFIC、需不需要 Form 8621、所得怎麼課稅，是三個不同的問題。
        </p>

        <h2>什麼是 PFIC</h2>
        <p>
          依 Form 8621 填寫說明，外國公司在其稅務年度符合下列任一測試就是 PFIC：
        </p>
        <ul>
          <li><strong>所得測試：</strong>總所得中 75% 以上是被動所得。</li>
          <li><strong>資產測試：</strong>資產中（平均）至少 50% 產生被動所得，或為產生被動所得而持有。</li>
        </ul>
        <p>
          <strong>海外共同基金與 ETF：</strong>投資股票或債券的基金，通常賺取股利、利息與資本利得等被動所得。但不要以為每一檔台灣或其他海外基金都是 PFIC：答案取決於基金如何設立、在美國稅法上如何分類，以及它實際的所得與資產。請利用基金本身的文件並諮詢專業人士。
        </p>

        <h2>什麼時候需要 Form 8621</h2>
        <p>
          一般來說，身為 PFIC 直接或間接股東的美國人，在下列任一情形的每個稅務年度，都要申報 Form 8621：
        </p>
        <ol>
          <li>收到 PFIC 某些直接或間接的分配；</li>
          <li>直接或間接處分 PFIC 股票而認列獲利；</li>
          <li>申報合格選擇基金（QEF）或按市價計值選擇的資訊；</li>
          <li>做出在表格 Part II 申報的選擇；或</li>
          <li>依第 1298(f) 條必須提出年度申報。</li>
        </ol>
        <p>
          Form 8621 附在你的稅表上，在稅表截止日（包括延期）前申報。如果你不需要申報稅表，填寫說明指示直接把 Form 8621 寄到猶他州 Ogden 的 IRS。
        </p>

        <h2>申報與課稅不同</h2>
        <p>
          申報 Form 8621 和要不要繳稅是兩回事。你可能在基金沒有產生應稅所得的年度仍須申報（例如第 1298(f) 條的年度申報）。如果做了 QEF 選擇，即使沒有收到分配，你也可能要就你分攤的基金盈餘繳稅。而適用申報例外時，也不會改變分配或出售的課稅方式。
        </p>

        <h2>狹窄的申報例外</h2>
        <ul>
          <li><strong>$25,000 / $50,000 例外：</strong>如果在稅務年度最後一天，你<strong>所有</strong> PFIC 股票的價值（依填寫說明的方式計算）在 $25,000 以下（合併申報為 $50,000 以下），而且你沒有從某一檔第 1291 條基金收到超額分配，也沒有就該基金認列獲利，就不必為該基金填 Part I。這不是一般性的豁免。</li>
          <li><strong>$5,000 間接持有例外：</strong>某些價值在 $5,000 以下的間接持有，在相同條件下也有類似的例外。</li>
        </ul>
        <p>
          填寫說明與 Regulations section 1.1298-1 還有其他例外與限制，請依你的情況確認。
        </p>

        <h2>預設規定：超額分配與出售</h2>
        <p>
          如果你沒有做 QEF 或按市價計值選擇，這檔基金對你而言一般是<strong>第 1291 條基金</strong>：
        </p>
        <ul>
          <li><strong>超額分配</strong>是本年度分配中，超過你在前 3 個稅務年度（或較短的持有期間）平均分配 125% 的部分。持有第一年的分配不是超額分配。</li>
          <li>出售第 1291 條基金股份的<strong>全部獲利</strong>都視為超額分配。</li>
          <li>超額分配要分攤到你持有期間的每一天。分攤到本年度，以及該公司成為 PFIC 之前年度的金額，按<strong>一般所得</strong>課稅。分攤到更早的 PFIC 年度的金額，要依第 1291(c) 條另外課<strong>稅並加計利息</strong>。</li>
        </ul>
        <p>
          這些計算在 Form 8621 Part V 進行。本文不以數字示範，因為結果取決於你的持有期間與歷史。
        </p>

        <h2>選擇</h2>
        <ArticleTable
          head={['', 'QEF 選擇', '按市價計值選擇']}
          rows={[
            ['可用條件', '基金必須提供 PFIC 年度資訊報表（PFIC Annual Information Statement）', '只適用於可流通股票，例如在合格交易所定期交易的股票'],
            ['每年計入的金額', '你分攤的基金一般盈餘（一般所得）與資本利得淨額（長期資本利得）', '價值超過調整後成本基礎的增加額，作為一般所得'],
            ['損失', '依 QEF 規定處理', '價值減少可作為一般損失扣除，但以先前按市價計值計入的金額為限'],
            ['成本基礎', '加上計入的金額，減去已課稅金額的分配', '加上計入的金額，減去准予扣除的金額'],
          ]}
        />
        <p>
          如果沒有在持有的第一年做選擇，可能適用特別規定，例如視同出售選擇（deemed sale election）。時機很重要，所以請在買進前或盡早諮詢。
        </p>

        <h2>核定期間（statute of limitations）</h2>
        <p>
          依正式法規前言（T.D. 9806）與 Notice 2014-51 的說明，第 6501(c)(8) 條可能在必須申報的 PFIC 資料沒有申報時，讓 IRS 核定稅額的期間保持開啟。適用方式視情況而定：
        </p>
        <ul>
          <li><strong>必須申報 Form 8621 卻沒有申報：</strong>與該資料相關的任何稅表、事件或期間，核定期間要到<strong>資料申報後三年</strong>才結束。這不是無限期：申報必要的 Form 8621 後，三年期間就開始計算。</li>
          <li><strong>不需要申報 Form 8621：</strong>Notice 2014-51 說，如果依法規你某一年不適用第 1298(f) 條的申報要求，不申報 Form 8621 不會延長該年度的期間。</li>
          <li><strong>合理原因：</strong>如果未申報是基於合理原因而非故意疏忽，延長只適用於與該未申報相關的項目，也就是應該申報的 PFIC 項目。</li>
          <li><strong>其他情況的範圍：</strong>沒有合理原因時，延長不限於 PFIC 項目；T.D. 9806 提到的是股東整份稅表的核定期間。</li>
        </ul>
        <p>
          Form 8621 填寫說明（2025 年 12 月修訂版）規定了什麼時候需要申報；某一年度的期間是否仍開啟，取決於這些規定與你的實際情況。
        </p>

        <h2>其他申報</h2>
        <ul>
          <li><strong>Form 8938：</strong>你按時以 Form 8621 申報的 PFIC，不必在 Form 8938 上再申報，但要在 Form 8938 上註明你申報了 Form 8621。</li>
          <li><strong>FBAR：</strong>持有這檔基金的帳戶，可能是需要在 FBAR 上申報的海外金融帳戶，這與 Form 8621 是分開的。請參考<a href="/zh-tw/library/investment/foreign-brokerage-account/">海外股票與證券帳戶怎麼申報？</a></li>
          <li><strong>外國稅：</strong>基金所得的外國稅可能可以申請<a href="/zh-tw/library/individual/foreign-tax-credit/">外國稅額抵免</a>。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>以為海外基金的課稅方式和美國共同基金一樣。</strong></li>
          <li><strong>把 $25,000 例外當成</strong>完全不適用 PFIC 規定。</li>
          <li><strong>等到賣出時</strong>才考慮選擇。</li>
          <li><strong>沒有確認結構就認定</strong>每一檔海外基金都是 PFIC。</li>
          <li><strong>因為不用繳稅就不申報</strong>，讓核定期間一直開著。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 請尋求專業協助</div>
          <p>PFIC 的判定、第 1291 條的稅額與利息、逾期選擇，以及透過合夥、信託或其他 PFIC 持有的情況都很複雜。本文不判定任何特定基金是否為 PFIC。本文不涵蓋州稅。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

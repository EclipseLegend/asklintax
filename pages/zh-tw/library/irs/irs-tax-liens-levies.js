import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-tax-liens-levies.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-tax-liens-levies',
  sourceHash:      '80c6a3aaaf4f',
  id:            '117',
  title:         'IRS 稅務留置權、扣押與催收上訴',
  titleEn:       'IRS Tax Liens, Levies, and Collection Appeals',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 594（2026 年 1 月版）、Publication 1660（2020 年 1 月版）、Publication 1450（2018 年 7 月版）與 IRS 護照認證網頁（2026 年 7 月審閱），說明聯邦稅務留置權、扣押、催收正當程序聽證與催收上訴計畫。2025 與 2026 年的護照門檻來自 Rev. Proc. 2024-40 與 Rev. Proc. 2025-32。本文不詳細說明州稅留置權、破產或企業財產查封',
  persona:       ['收到扣押意向通知或留置權通知的人', '面臨薪資扣押的上班族', '銀行帳戶被扣押的人', '有大筆聯邦欠稅的人'],
  relatedJourney: ['處理稅務問題', '收到 IRS 的信'],
  actionRequired: '收到任何留置權或扣押通知，請立刻看清楚日期。催收正當程序（CDP）聽證通常必須在 30 天內用 Form 12153 申請 — 扣押通知從通知日起算，留置權通知則以通知上的日期為準。如果你付得出來，分期付款可以阻止許多催收行動；如果付不出來，請在扣押生效前聯絡 IRS。',
  sources: [
    { label: 'IRS — Publication 594（2026 年 1 月版），IRS 催收流程', url: 'https://www.irs.gov/pub/irs-pdf/p594.pdf' },
    { label: 'IRS — Publication 1660（2020 年 1 月版），催收上訴權利', url: 'https://www.irs.gov/pub/irs-pdf/p1660.pdf' },
    { label: 'IRS — Publication 1450（2018 年 7 月版），申請聯邦稅務留置權解除證明的說明', url: 'https://www.irs.gov/pub/irs-pdf/p1450.pdf' },
    { label: 'IRS — Form 12153，申請催收正當程序或同等聽證', url: 'https://www.irs.gov/pub/irs-pdf/f12153.pdf' },
    { label: 'IRS — Form 9423，催收上訴申請', url: 'https://www.irs.gov/pub/irs-pdf/f9423.pdf' },
    { label: 'IRS — 特定欠稅案件的護照撤銷或拒發', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/revocation-or-denial-of-passport-in-cases-of-certain-unpaid-taxes' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '稅務留置權和扣押有什麼不同？',
    a: '留置權是對你財產的法律主張，用來保障政府的權益 — 當你沒有繳第一張帳單時，依法自動產生。扣押則是真的拿走你的財產，例如銀行帳戶裡的錢或部分薪資，用來抵債。',
  },
  {
    q: '撤回留置權通知和解除留置權一樣嗎？',
    a: '不一樣。解除（release）是讓留置權結束，例如債務已全額付清或催收期間已經結束。撤回（withdrawal）是移除公開的聯邦稅務留置權通知，但你仍然欠稅。撤回要用 Form 12277 申請。',
  },
  {
    q: 'IRS 可以催收稅款多久？',
    a: '通常是從核定稅額之日起最多 10 年。這段期間可能因多種原因暫停計算，包括催收正當程序聽證期間、IRS 審核分期付款或和解提議（offer in compromise）期間、破產自動停止期間，以及某些情況下你住在美國境外的期間。',
  },
  {
    q: 'IRS 可以拿走我整份薪水嗎？',
    a: '薪資扣押只送達一次，會持續到債務付清、做了其他安排、催收期間結束，或扣押被解除。如果 IRS 認定扣押造成經濟困難，讓你無法支付基本、合理的生活開銷，就必須解除扣押。',
  },
  {
    q: '欠稅會影響我的護照嗎？',
    a: '會，如果 IRS 向國務院認證你有嚴重拖欠的稅款。2025 年的門檻是合計超過 $64,000；2026 年是超過 $66,000，包含罰款與利息。而且必須已經申報留置權通知且行政救濟期限已過或已用盡，或已經發出扣押。依分期付款協議或已核准的和解提議按時繳款的欠稅不會被認證。',
  },
  {
    q: '催收上訴可以上法院嗎？',
    a: '只有催收正當程序（CDP）的決定可以：Appeals 做出決定後，你有 30 天可以向美國稅務法院提出申請。催收上訴計畫（CAP）的決定不能上法院。',
  },
]

const RELATED = [
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '分期付款、和解提議與困難狀態。',
  },
  {
    href: '/library/irs/irs-appeals-process',
    cat:  'IRS & Tax Issues',
    title: 'IRS 上訴：如何對查帳或 IRS 決定提出異議',
    desc:  '對查帳調整提出上訴，以及向稅務法院提出申請。',
  },
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: '受損配偶與無辜配偶救濟：Form 8379 與 Form 8857',
    desc:  '當債務其實是配偶的時候。',
  },
  {
    href: '/library/irs/taxpayer-advocate-service',
    cat:  'IRS & Tax Issues',
    title: '納稅人權益服務（TAS）：何時與如何求助',
    desc:  '催收造成經濟困難時的協助。',
  },
]

export default function IrsTaxLiensLeviesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 稅務留置權、扣押與催收上訴 | AskLinTax 繁體中文',
      description: '聯邦稅務留置權與扣押的差別、薪資與銀行帳戶扣押、催收正當程序聽證（Form 12153）、催收上訴計畫（Form 9423）、留置權解除與撤回、10 年催收期間，以及 2025/2026 年護照門檻。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>留置權（lien）</strong>是政府對你財產的法律主張；<strong>扣押（levy）</strong>則是真的拿走財產。在大多數扣押之前，IRS 必須寄出最後通知，給你申請<strong>催收正當程序（Collection Due Process，CDP）</strong>聽證的權利，通常要在 30 天內用 Form 12153 申請。另一條比較快的途徑 — <strong>催收上訴計畫（Collection Appeals Program，CAP）</strong>— 涵蓋留置權、扣押、查封與分期付款的決定，但不能上法院。
        </p>

        <h2>留置權和扣押不一樣</h2>
        <ArticleTable
          head={['', '聯邦稅務留置權', '扣押']}
          rows={[
            ['是什麼', '對你現在與未來所有財產及財產權利的法律主張', '依法查封，拿走你的財產來抵債'],
            ['如何開始', '你沒有繳第一張帳單時依法產生；IRS 之後可能申報公開的聯邦稅務留置權通知', '通常是 IRS 核定稅額並寄出帳單、你沒有繳，而且 IRS 至少在扣押前 30 天寄出「最後扣押意向通知與聽證權利通知」之後（有一些例外）'],
            ['例子', '你的房子、車子，以及薪資、銀行帳戶等未來的權利', '薪資、銀行帳戶、退休帳戶、某些聯邦給付與其他財產'],
            ['主要上訴途徑', '第一次留置權通知後的 CDP 聽證；CAP', '扣押通知後的 CDP 聽證；CAP'],
          ]}
        />

        <h2>聯邦稅務留置權通知</h2>
        <ul>
          <li><strong>公開通知：</strong>向地方或州政府機關申報，例如郡的契據登記處，以確立政府優先於其他債權人的地位。雇主、房東等人可能會看到。</li>
          <li><strong>你的聽證權利：</strong>某筆債務第一次申報後 5 個工作天內，IRS 會寄出通知，告知你有權申請 CDP 聽證，並寫明申請的截止日期。</li>
          <li><strong>財產免除與順位退讓：</strong>財產免除（discharge）是把特定財產從留置權中移除，例如正在出售的財產（Publication 783）；順位退讓（subordination）是讓另一個債權人排在 IRS 前面，例如重新貸款時（Publication 784）。</li>
        </ul>

        <h2>留置權解除與撤回</h2>
        <ArticleTable
          head={['', '解除（Release）', '撤回（Withdrawal）']}
          rows={[
            ['作用', '留置權結束', '移除公開通知；你仍然欠稅'],
            ['何時', '債務全額付清、已核准的和解提議條件已履行、以保證金擔保付款，或催收期間已經結束（自動解除）', '例如你已經簽了分期付款協議（除非協議另有規定）、撤回有助你更快繳清、IRS 沒有遵守程序，或撤回符合你與政府雙方的最佳利益'],
            ['時間或表格', '依法，債務全額付清或在法律上無法執行、或接受保證金後 30 天內，IRS 必須解除留置權（Publication 1450）', '用 Form 12277 申請'],
          ]}
        />

        <h2>扣押：薪資、銀行帳戶與其他財產</h2>
        <ul>
          <li><strong>薪資扣押：</strong>只送達一次，不是每次發薪都送。會持續到債務付清、做了其他安排、催收期間結束，或扣押被解除。</li>
          <li><strong>銀行帳戶扣押：</strong>涵蓋送達當天可提領的資金，最多到扣押金額。銀行會先保留這筆錢 21 天再交給 IRS，讓你處理任何爭議。</li>
          <li><strong>聯邦給付：</strong>聯邦給付扣押計畫通常可以扣押某些聯邦給付最多 15%。</li>
          <li><strong>不得扣押的財產</strong>包括失業給付、某些年金與退休金給付、必要的課本與衣物、尚未投遞的郵件，以及一定金額內的家用物品與職業工具。</li>
          <li><strong>IRS 必須解除扣押的情況</strong>，例如你已經付清債務、催收期間在扣押發出前已經結束、你簽了不允許扣押繼續的分期付款協議，或扣押造成經濟困難。</li>
        </ul>

        <h2>催收正當程序與催收上訴計畫</h2>
        <ArticleTable
          head={['', '催收正當程序（CDP）', '催收上訴計畫（CAP）']}
          rows={[
            ['表格', 'Form 12153', 'Form 9423（留置權與扣押案件，先和催收主管開會之後）'],
            ['期限', '留置權：在留置權通知上的日期前（5 個工作天之後的 30 天）。扣押：扣押意向通知日起 30 天內', '和主管開會後 2 個工作天內告知催收部門；Form 9423 必須在 3 個工作天內送達或郵戳為憑。房子、車子或其他財產被查封：在收到查封通知後 10 個工作天內申請和主管開會'],
            ['逾期申請', '同等聽證（equivalent hearing）：通常在扣押通知日後 1 年內，或留置權申報後 1 年又 5 個工作天內 — 不能由稅務法院審查，而且 10 年催收期間會繼續計算', '不適用'],
            ['可以爭執稅額本身嗎？', '只有在你沒有收到欠稅通知、或沒有其他機會爭執時才可以', '不可以'],
            ['法院審查', '決定做出後 30 天內向稅務法院提出申請', '沒有 — Appeals 的決定是最終決定'],
          ]}
        />
        <p>
          及時申請 CDP 聽證，通常可以暫停作為聽證主題的扣押，並暫停 10 年催收期間的計算。每個稅務期間或每筆核定稅額，你只能有一次 CDP 留置權聽證和一次扣押聽證。某些扣押 — 例如危急扣押（jeopardy levy）或扣押州稅退稅 — 可以在聽證之前發出。
        </p>

        <h2>護照認證：2025 與 2026 年門檻</h2>
        <ArticleTable
          head={['年度', '嚴重拖欠的稅款', '來源']}
          rows={[
            ['2025', '超過 $64,000', 'Rev. Proc. 2024-40；IRS 護照網頁'],
            ['2026', '超過 $66,000', 'Rev. Proc. 2025-32；Publication 594（2026 年 1 月版）；IRS 護照網頁'],
          ]}
        />
        <ul>
          <li>債務包含罰款與利息，而且必須已經申報聯邦稅務留置權通知且所有行政救濟期限已過或已用盡，或已經發出扣押。</li>
          <li>不會被認證的包括：依分期付款協議或已核准的和解提議按時繳款的債務、FBAR 罰款、已及時申請 CDP 扣押聽證的債務，以及因申請無辜配偶救濟而暫停的債務等。</li>
          <li>認證之後，國務院通常不會核發或換發護照，也可能撤銷護照。IRS 認證時會寄出 CP508C 通知，並在債務解決後 30 天內撤銷認證。</li>
        </ul>

        <h2>停止或預防催收的方法</h2>
        <ul>
          <li><strong>全額繳清</strong>，或申請<strong>分期付款</strong>。如果在催收期間結束前無法全額繳清，可能可以申請部分付款分期協議（Partial Payment Installment Agreement）。請參閱<a href="/zh-tw/library/irs/cant-pay-tax-bill/">繳不出稅款怎麼辦？有哪些選擇？</a>。</li>
          <li>如果繳稅會讓你無法支付基本生活開銷，<strong>詢問困難狀態</strong>。</li>
          <li><strong>及時申請 CDP 聽證</strong>，並提出替代的催收方案。</li>
          <li>向納稅人權益服務（TAS）或低收入納稅人診所<strong>尋求協助</strong>。</li>
        </ul>

        <h2>你的權利</h2>
        <ul>
          <li>納稅人權利法案包括對 IRS 立場提出異議並被聽取的權利，以及在獨立機構對 IRS 決定提出上訴的權利。</li>
          <li>如果 IRS 扣押了屬於別人的財產，那個人可以提出錯誤扣押索賠，或透過 CAP 上訴。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 不要忽視最後通知</div>
          <p>CDP 的 30 天期限很短，一旦過了，你對那份通知的稅務法院權利通常就沒有了。收到留置權或扣押通知時，即使付不出來，也請盡快聯絡 IRS 或合格的代理人。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

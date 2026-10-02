import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/llc-vs-scorp.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'llc-vs-scorp',
  sourceHash:      'bad3105fad7f',
  id:            '03',
  title:         'LLC 與 S-Corp：哪種適合你的企業？',
  titleEn:       'LLC vs S-Corp: which is right for your business?',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — S 型公司（S corporations）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations' },
    { label: 'IRS — Form 2553 填寫說明（Instructions for Form 2553）', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Form 1120-S 填寫說明（Instructions for Form 1120-S）', url: 'https://www.irs.gov/instructions/i1120s' },
    { label: 'IRS — S 型公司薪酬與醫療保險問題（S corporation compensation and medical insurance issues）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues' },
    { label: 'IRS — 自雇稅（Self-employment tax：社會安全稅與聯邦醫療保險稅）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '一般原則普遍適用；個人能省下多少稅，取決於你的收入水準、薪資與所在州。選擇 S-Corp 之前，請先諮詢 CPA。',
  persona:       ['自雇人士', '接案者', '小型企業老闆', '考慮稅務規劃的 LLC 負責人'],
  relatedJourney: ['創業或經營小型企業', '擴展現有事業'],
  actionRequired: '比較你現在繳的自雇稅，和以合理 S-Corp 薪資計算、扣掉薪資作業與另外申報企業稅表的額外成本之後要繳的稅。如果這項選擇看起來值得，在申報 Form 2553 之前，請先和稅務專業人士依你的具體情況試算。',
}

const FAQS = [
  {
    q: '我的 LLC 可以用 S-Corp 方式課稅嗎？',
    a: '可以。LLC 可以向 IRS 申報 Form 2553，選擇以 S-Corp 方式課稅。在法律上 LLC 仍然是 LLC — 你保留同樣的營運協議與州政府登記，只有課稅方式改變。這是獲利的小型企業最常見的稅務策略之一。',
  },
  {
    q: '什麼時候該做 S-Corp 選擇？',
    a: '要讓這項選擇適用於當年度，一般必須在該稅務年度開始後 2 個月又 15 天內（或在前一個稅務年度的任何時候）申報 Form 2553。新成立的 LLC，第一個稅務年度從它開始有股東、取得資產或開始營業（以最早者為準）時起算。如果錯過這個期限，選擇一般會從下一年開始適用。某些情況下也可以申請逾期選擇 — CPA 可以協助。',
  },
  {
    q: '身為 S-Corp 擁有人，我需要付自己多少薪水？',
    a: 'IRS 要求身兼員工的 S-Corp 擁有人，付給自己「合理薪資」（Reasonable Salary）— 也就是和你請別人做同樣工作要付的薪資相當。沒有固定的數字，但必須站得住腳。企業賺 $200,000，卻只付自己 $10,000，就是警訊。IRS 會考量的因素包括你的訓練與經驗、職責、投入事業的時間，以及同類企業為類似服務支付的薪資。',
  },
  {
    q: 'S-Corp 需要更多文書作業嗎？',
    a: '是的，多很多。S-Corp 必須另外申報企業稅表（Form 1120-S）、為身兼員工的擁有人跑薪資（Payroll）、每季申報薪資稅表，並開立 W-2。你幾乎一定需要會計師或薪資服務。請把這些成本納入你的省稅計算。',
  },
  {
    q: '取得 S-Corp 身分有哪些資格要求？',
    a: '要選擇 S-Corp 身分，你的企業必須：股東不超過 100 人、只有一種股份、只有合格股東 — 一般是美國公民或美國稅務居民個人、遺產與某些信託（不能是合夥事業、公司或非居民外國人），而且是美國國內公司，或可以選擇以公司方式課稅的實體（例如 LLC）。大多數小型企業都能輕鬆符合這些要求。',
  },
  {
    q: '非美國公民或綠卡持有人可以擁有 S-Corp 嗎？',
    a: '這項規則看的是稅務居民身分，而不是移民身分：S-Corp 不能有非居民外國人股東。美國公民與居民外國人 — 綠卡持有人，以及符合實質居留測試的簽證持有人 — 都可以持有 S-Corp 股份。如果你在稅務上是非居民外國人，就不能成為 S-Corp 股東，你的稅務規劃選項會因此受限。居民身分每年可能不同，所以選擇前請先確認。請諮詢了解國際稅務規則的 CPA。',
  },
  {
    q: '對小型企業來說，S-Corp 比 C-Corp 好嗎？',
    a: '對大多數小型企業來說，是的。C-Corp 會被雙重課稅 — 公司先就利潤繳稅，股東拿到股利時再繳一次稅。S-Corp 把所得直接轉到擁有人的個人稅表上，避免了這種情況。C-Corp 比較適合尋求創投資金、計畫上市，或要把大量利潤保留在公司內的企業。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation',
    title: '什麼是 LLC？我需要成立嗎？',
    desc:  '比較 LLC 與 S-Corp 之前，先確認你了解什麼是 LLC，以及你到底需不需要。',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business',
    title: '季度預估稅：誰要繳？怎麼算？',
    desc:  'LLC 與 S-Corp 擁有人都要繳季度預估稅。這裡說明怎麼計算。',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation',
    title: '如何申請 EIN：逐步指南',
    desc:  '以 S-Corp 身分跑薪資之前，你需要 EIN。這裡說明如何免費向 IRS 線上申請。',
  },
]

export default function LLCvsSCorpZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'LLC 與 S-Corp：哪種適合你的企業？ | AskLinTax 繁體中文',
      description: '清楚比較 LLC 與 S-Corp 的課稅方式 — 附實際試算範例，以及決定 S-Corp 選擇是否划算的因素。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>首先：LLC 與 S-Corp 不是同一類東西</h2>
        <p>
          比較兩者之前，先了解 LLC 與 S-Corp 是在兩個不同層次上運作：
        </p>
        <ul>
          <li><strong>LLC</strong> 是一種<em>法律結構</em> — 是你的企業在州政府的登記方式。</li>
          <li><strong>S-Corp</strong> 是一種<em>稅務選擇</em> — 是 IRS 對你營業所得的課稅方式。</li>
        </ul>
        <p>
          這代表兩者並不互斥。事實上，獲利的小型企業最常見的做法就是：<strong>LLC 選擇以 S-Corp 方式課稅</strong>。你同時擁有 LLC 在法律上的簡便，以及 S-Corp 課稅的稅務優勢。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 最重要的觀念</div>
          <p>當有人問「我應該成立 LLC 還是 S-Corp？」，他們真正想問的通常是：「我的 LLC 應該選擇 S-Corp 課稅嗎？」因為 LLC 的結構本身不變 — 只有課稅方式改變。</p>
        </div>

        <h2>兩者各自怎麼課稅 — 以及為什麼重要</h2>

        <h3>LLC 預設課稅（沒有 S-Corp 選擇）</h3>
        <p>
          預設情況下，如果你是 LLC 唯一的擁有人，IRS 會把你所有的營業利潤當作你的個人所得。每一塊錢的淨利都要繳：
        </p>
        <ul>
          <li>自雇稅：<strong>15.3%</strong>（涵蓋社會安全與聯邦醫療保險）</li>
          <li>聯邦所得稅：依你的總收入級距</li>
          <li>州所得稅：各州不同</li>
        </ul>
        <p>
          自雇稅適用於你<em>全部</em>的淨利。在 LLC 預設課稅下，沒有辦法避開。
        </p>

        <h3>S-Corp 課稅（選擇 S-Corp 身分後）</h3>
        <p>
          選擇 S-Corp 之後，你的所得會分成兩部分：
        </p>
        <ul>
          <li><strong>你的薪資</strong> — 要繳薪資稅（Payroll Tax，與自雇稅相同），以 W-2 申報</li>
          <li><strong>擁有人分配款</strong>（Distributions）— 剩下轉給你的利潤，<em>不用</em>繳自雇稅</li>
        </ul>
        <p>
          省稅來自第二個部分。分配款完全不用繳 15.3% 的自雇稅。你以分配款而不是薪資拿走的利潤越多，省得越多 — 但 IRS 要求你的薪資必須「合理」，所以能做到的程度有限。
        </p>

        <h2>實際的數字範例</h2>
        <p>
          假設你的 LLC 今年淨利 <strong>$100,000</strong>。
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LLC 預設課稅</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>LLC 以 S-Corp 課稅</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['淨利', '$100,000', '$100,000'],
                ['擁有人薪資', '不適用', '$60,000'],
                ['分配款', '不適用', '$40,000'],
                ['自雇稅／薪資稅', '$14,130（$100K 的 92.35% × 15.3%）', '$9,180（$60K 薪資的 15.3% — 雇主與員工負擔部分合計）'],
                ['估計省下的自雇稅', '—', '每年約 $4,950'],
                ['S-Corp 額外成本（薪資作業、稅表）— 本範例的假設', '—', '每年約 $1,500–$3,000'],
                ['大約淨省下', '—', '每年約 $1,950–$3,450'],
              ].map(([label, llc, scorp], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 6 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{label}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{llc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: i === 6 ? 'var(--green)' : 'inherit', fontWeight: i === 6 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{scorp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 這些是估算，不是保證</div>
          <p>實際能省多少，取決於你的薪資金額、州稅，以及薪資作業與申報 S-Corp 稅表的實際成本。做出選擇之前，請務必與 CPA 依你的情況試算。</p>
        </div>

        <h2>什麼時候選擇 S-Corp 比較合理？</h2>
        <p>
          IRS 對選擇 S-Corp 身分沒有收入門檻。是否能省錢，取決於付給自己合理薪資之後還剩下多少利潤、你所在州的稅與規費，以及薪資作業與另外申報企業稅表的額外成本。申報 Form 2553 之前，請依你自己的情況比較這些數字 — 最好與稅務專業人士一起。
        </p>

        <h2>經營 S-Corp 的實際成本</h2>
        <p>
          省稅是真的 — 但額外的成本與要求也是真的。選擇 S-Corp 身分之前，先了解你要承擔什麼：
        </p>
        <ul>
          <li><strong>另外申報企業稅表（Form 1120-S）</strong> — 稅務年度結束後第 3 個月的 15 日到期（2025 曆年制為 2026 年 3 月 16 日，因為 3 月 15 日是星期日）。比 Schedule C 複雜，許多擁有人會請稅務專業人士代為準備。</li>
          <li><strong>設定薪資與每季申報</strong> — 你必須以員工身分為自己跑薪資、每季申報薪資稅表（Form 941），並在年底開 W-2 給自己。許多擁有人會使用薪資服務，這會增加成本。</li>
          <li><strong>更多會計工作</strong> — 有了薪資、每季申報與另外的企業稅表，你的記帳會更繁重。請相應地把 CPA 費用考慮進去。</li>
          <li><strong>合理薪資的審查</strong> — IRS 會注意那些為了把分配款最大化、而付給自己不合理低薪的 S-Corp 擁有人。處理不當可能引來查帳與罰款。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️「合理薪資」的要求是認真的</div>
          <p>IRS 曾成功挑戰那些為了逃避薪資稅、付給自己低於市場薪資的 S-Corp 擁有人。你的薪資必須與你請員工做同樣工作要付的薪資相當。CPA 可以協助你依你的行業與收入水準，訂出站得住腳的薪資。</p>
        </div>

        <h2>並列比較</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>項目</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>LLC 預設課稅</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>選擇 S-Corp 的 LLC</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['自雇稅', '全部淨利', '只有薪資部分'],
                ['需要跑薪資', '不需要', '需要 — 擁有人必須列入薪資名冊'],
                ['另外申報企業稅表', '不需要（在個人稅表上申報 Schedule C）', '需要 — Form 1120-S（年度結束後第 3 個月的 15 日到期）'],
                ['複雜度', '低', '中到高'],
                ['每年合規成本', '較低', '較高（薪資作業與另外的企業稅表）'],
                ['資格限制', '無（任何擁有人）', '不能有非居民外國人股東；股東最多 100 人；只有一種股份'],
                ['適合', '偏好簡單，或省下的稅不足以支付額外成本的擁有人', '利潤一直明顯高於合理薪資、願意處理額外合規工作的擁有人'],
              ].map(([feat, llc, scorp], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{llc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{scorp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>如何做出 S-Corp 選擇</h2>
        <p>
          如果你已經判斷 S-Corp 選擇是合理的，以下是需要做的事：
        </p>
        <ol>
          <li><strong>向 IRS 申報 Form 2553</strong> — 這是正式的 S-Corp 選擇表格。要適用於當年度，一般必須在稅務年度開始後 2 個月又 15 天內申報（新成立的 LLC，從它開始有股東、取得資產或開始營業時起算）。</li>
          <li><strong>設定薪資</strong> — 使用薪資服務（Gusto、ADP、QuickBooks Payroll）以員工身分支付你的薪資。這會處理預扣、每季申報與 W-2 的產生。</li>
          <li><strong>與 CPA 合作</strong> — 由於複雜度高，S-Corp 很少適合自己處理。CPA 可以判斷你的合理薪資、申報 Form 1120-S，並協助你年復一年保持合規。</li>
        </ol>

        <div className="callout callout-action">
          <div className="callout-title">✅ 結論</div>
          <p>如果你的 LLC 利潤一直明顯高於你這份工作的合理薪資，而且你打算繼續成長，選擇 S-Corp 值得和 CPA 談一談。省稅是真的 — 但要求也是真的。不要只根據一篇一般性的文章做這個決定；正確的答案取決於你的收入、薪資與所在州。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/llc-basics.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'llc-basics',
  sourceHash:      '09a2a6b6c6cc',
  id:            '02',
  title:         '什麼是 LLC？我需要成立嗎？',
  titleEn:       'What is an LLC, and do I need one?',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — 有限責任公司（Limited liability company, LLC）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc' },
    { label: 'IRS — S 型公司（S corporations）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations' },
    { label: '加州稅務局（California Franchise Tax Board）— 有限責任公司（Limited liability company）', url: 'https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html' },
    { label: '懷俄明州州務卿（Wyoming Secretary of State）— 企業申請費用（Business filing fees）', url: 'https://sos.wyo.gov/Business/Docs/BusinessFees.pdf' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '一般原則適用於大多數州；加州與紐約州另有額外的費用與要求',
  persona:       ['自雇人士', '接案者', '小型企業老闆', '新創業者'],
  relatedJourney: ['創業或經營小型企業', '第一次當老闆'],
  actionRequired: '用下方的決策表評估 LLC 是否適合你的情況。如果適合，接下來的兩個步驟是：選擇企業名稱，並確認你所在州的申請費用。',
}

const FAQS = [
  { q: '成立 LLC 要花多少錢？', a: '各州的申請費差異很大 — 例如，懷俄明州申請成立章程（Articles of Organization）的費用是 $100。加州還要求每一家在加州營業或在加州成立的 LLC，不論收入多少，每年都要繳 $800 的年度稅。決定在哪一州成立之前，請務必先查看該州州務卿（Secretary of State）的網站。' },
  { q: '非美國公民或綠卡持有人可以成立 LLC 嗎？', a: '可以。在美國成立 LLC 沒有國籍要求，非居民也可以成立美國 LLC。不過，非居民擁有人的稅務處理比較複雜 — 你可能會面臨預扣要求與額外的申報義務。請諮詢專精國際稅務的 CPA。' },
  { q: '如果我剛起步、收入不多，需要成立 LLC 嗎？', a: '不一定。以獨資方式經營比較簡單，也不用花錢。等事業成長後，隨時都可以再成立 LLC。關鍵問題是：在你所在的州，責任保護現在是否值得每年的費用與合規工作。' },
  { q: '單一成員 LLC 和多成員 LLC 有什麼不同？', a: '單一成員 LLC（Single-Member LLC）只有一位擁有人，預設以獨資方式課稅 — 收入與費用列在你的個人稅表上（Schedule C）。多成員 LLC（Multi-Member LLC）有兩位以上擁有人，預設以合夥方式課稅，需要另外申報 Form 1065。兩者都可以選擇 S-Corp 課稅。' },
  { q: '成立 LLC 之後，還要繳自雇稅嗎？', a: '要。預設情況下，在事業中工作的 LLC 擁有人，要就全部淨利繳自雇稅（15.3%）— 和獨資經營者一樣。要減少自雇稅，你需要選擇 S-Corp 課稅。是否能省錢，取決於你的利潤、你這份工作的合理薪資，以及薪資作業與另外報稅的額外成本 — IRS 沒有收入門檻。' },
  { q: '如果我的事業被告，LLC 能保護我的住家與存款嗎？', a: '一般可以 — 這是 LLC 的主要目的。兩個重要的例外：(1) 如果你個人為企業貸款作保，你要為這筆債務負個人責任；(2) 如果你把個人與企業的財務混在一起，法院可能「揭穿公司面紗」（Pierce the Corporate Veil），不承認這項保護。請務必使用分開的銀行帳戶。' },
  { q: '我經營 Airbnb，應該把它放進 LLC 嗎？', a: '要看情況。如果房客受傷，LLC 可以保護個人資產。不過在加州，把有房貸的房產移轉到 LLC，可能觸發房貸的「出售即到期」（Due on Sale）條款。LLC 也不會改變 Airbnb 收入的課稅方式。把房產移轉到 LLC 之前，請先諮詢 CPA 與不動產律師。' },
]

const RELATED = [
  { href: '/library/business-formation/llc-vs-scorp', cat: 'Business Formation', title: 'LLC 與 S-Corp：哪種適合你的企業？', desc: '有了 LLC 之後，下一個決定是要不要選擇 S-Corp 課稅。這裡有清楚的比較。' },
  { href: '/library/business-formation/ein', cat: 'Business Formation', title: '如何申請 EIN：逐步指南', desc: 'EIN 是你企業的稅籍號碼。開立企業銀行帳戶與雇用員工都需要它。' },
  { href: '/library/small-business/quarterly-taxes', cat: 'Small Business', title: '季度預估稅：誰要繳？怎麼算？', desc: 'LLC 擁有人一年要繳四次預估稅。這裡說明你要繳多少，以及如何避免罰款。' },
]

export default function LLCBasicsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{ title: '什麼是 LLC？我需要成立嗎？ | AskLinTax 繁體中文', description: '用白話說明什麼是 LLC、它提供什麼保護，以及是否適合你的情況。附決策指南與費用說明。' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>用白話說，什麼是 LLC？</h2>
        <p>LLC 是 <strong>Limited Liability Company</strong>（有限責任公司）的縮寫。它是一種向州政府登記的企業結構，主要只做一件事：在法律上把你個人和你的事業分開。</p>
        <p>在 LLC 出現之前，如果你的事業出了問題 — 被告、還不出的債務 — 你的個人資產（住家、存款、車子）都可能有風險。LLC 限制了這種風險。大多數情況下，如果你的事業被告，有風險的只有企業的資產，不是你個人的資產。這就是「有限責任」的由來。</p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 最簡單的理解方式</div>
          <p>LLC 是你事業的一個法律「容器」。容器裡發生的事 — 訴訟、債務、合約 — 都留在容器裡，不會溢到你個人身上。前提是你真的把 LLC 當作與你分開的實體來對待。</p>
        </div>

        <h2>LLC 實際上能給你什麼？</h2>

        <h3>1. 個人責任保護</h3>
        <p>如果你的事業被告，你的個人資產一般會受到保護。被告的是 LLC，不是你。如果你的行業可能因錯誤或意外引發大額求償 — 例如承包商、餐廳老闆、房東、顧問 — 這一點特別重要。</p>
        <p>重要提醒：這項保護有限度。如果你個人為貸款作保，或把個人與企業的財務混在一起，保護可能被削弱，甚至完全失去。</p>

        <h3>2. 獨立且專業的企業身分</h3>
        <p>LLC 讓你可以用公司名義開立企業銀行帳戶、以企業身分簽約，並以更正式的形象面對客戶。許多大企業客戶與商業房東，也要求廠商以法律實體身分營運，才願意合作。</p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ LLC 預設「不會」做的事</div>
          <p>LLC 不會自動減少你的稅。預設情況下，單一擁有人的 LLC 課稅方式和獨資經營者完全一樣 — 所有營業收入都列在你的個人稅表上，並要繳自雇稅。要省稅，需要另外做一個決定：選擇 S-Corp 課稅。請參閱 <a href="/zh-tw/library/business-formation/llc-vs-scorp/">LLC 與 S-Corp →</a></p>
        </div>

        <h2>LLC 怎麼課稅？</h2>
        <p>LLC 是一種法律結構，不是一種稅務類別。IRS 依擁有人的人數，以及是否做了特別的選擇，來決定 LLC 的課稅方式：</p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>LLC 類型</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>預設課稅方式</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>可以選擇的課稅方式</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['單一成員 LLC（1 位擁有人）', '獨資 — 在你的個人稅表上申報 Schedule C', 'S-Corp 或 C-Corp'],
                ['多成員 LLC（2 位以上擁有人）', '合夥 — 需要另外申報 Form 1065', 'S-Corp 或 C-Corp'],
              ].map(([type, def, elect], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{type}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{def}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{elect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>對大多數小型企業老闆來說，實際的意義是：<strong>LLC 本身不會改變你的稅單</strong>。你仍然要就淨利繳自雇稅。主要的好處是法律保護。</p>

        <h2>你需要 LLC 嗎？</h2>
        <p>沒有一體適用的答案。這個決策架構涵蓋大多數情況：</p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>你的情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>建議</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['剛起步、還在測試想法、收入很少', '⏳ 等一等 — 先以獨資開始，事業成長後再成立 LLC'],
                ['有穩定客戶的接案者或顧問', '✅ 大概需要 — 責任保護值得每年的費用'],
                ['實體店面事業（餐廳、零售、承包商）', '✅ 需要 — 比較容易發生意外與糾紛'],
                ['房東或 Airbnb 房東', '🤔 先諮詢 CPA 與不動產律師 — 移轉房產有複雜之處'],
                ['與合夥人一起經營（2 人以上）', '✅ 需要 — 清楚界定所有權，並保護每一位合夥人'],
                ['利潤一直很穩健的事業', '✅ 需要 — 也可以考慮選擇 S-Corp，可能省稅'],
              ].map(([sit, rec], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{sit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>如何成立 LLC？</h2>
        <p>成立 LLC 比大多數人想的簡單。基本流程：</p>
        <ol>
          <li><strong>選擇企業名稱</strong> — 必須包含「LLC」或「Limited Liability Company」，而且不能與你所在州現有的企業名稱重複。</li>
          <li><strong>選擇州別</strong> — 大多數小型企業在營運所在的州成立。如果你在加州營運，不論在哪裡成立，都要繳加州的費用。</li>
          <li><strong>申請成立章程（Articles of Organization）</strong> — 這是向你所在州的州務卿提交的正式表格，通常可以線上申請。各州的申請費不同。</li>
          <li><strong>建立營運協議（Operating Agreement）</strong> — 法律上不一定必要，但強烈建議。它界定持股比例，以及合夥人退出時怎麼處理。</li>
          <li><strong>申請 EIN</strong> — 你企業的稅籍號碼，在 IRS.gov 免費申請，開立企業銀行帳戶時需要。<a href="/zh-tw/library/business-formation/ein/">完整指南 →</a></li>
          <li><strong>開立獨立的企業銀行帳戶</strong> — 這一點非常重要。把個人與企業的錢混在一起，是失去責任保護最快的方式。</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 加州特有：$800 最低特許經營稅</div>
          <p>加州 LLC 每年最少要繳 $800 給州政府 — 即使事業完全沒有收入。只要 LLC 存在，每年都要繳。決定要立刻成立，還是等有收入再成立時，請把這一點考慮進去。</p>
        </div>

        <h2>最常見的 LLC 錯誤</h2>
        <ul>
          <li><strong>把個人與企業的錢混在一起</strong> — 這是最大的錯誤。營業收入存進企業帳戶，私人開銷絕不從企業帳戶支付。如果界線模糊，即使有 LLC，法院也可能要你負個人責任。</li>
          <li><strong>忘了年度申報要求</strong> — 大多數州都要求提交年度報告並繳費。漏掉可能導致你的 LLC 被解散，失去所有保護。</li>
          <li><strong>沒有營運協議</strong> — 即使只有一位擁有人，營運協議也能記錄你的事業如何運作。如果將來加入合夥人或發生糾紛，這非常重要。</li>
          <li><strong>以為 LLC 會幫你處理稅務</strong> — 你仍然需要記錄收入與費用、繳納季度預估稅，並申報正確的表格。LLC 結構不會自動幫你做這些事。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

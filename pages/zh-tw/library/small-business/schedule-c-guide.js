import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/small-business/schedule-c-guide.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'schedule-c-guide',
  sourceHash:      '0c37ec7fa003',
  id:            '79',
  title:         'Schedule C 說明：如何申報自雇收入與費用',
  titleEn:       'Schedule C Explained: Self-Employment Income and Expenses',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Schedule C 及其填寫說明、Publication 334（2025）、2025 年 Form 461 填寫說明、IRS Notice 2026-10 與 Announcement 2026-11（2026 年標準里程費率），以及 Revenue Procedure 2024-40 與 2025-32，說明 2025 與 2026 稅務年度的 Schedule C（Form 1040）。撰寫本文時，2026 年 Schedule C 及其填寫說明仍是草稿。本文不涵蓋農業（Schedule F）、法定員工的細節，以及州稅表',
  persona:       ['自由業者與獨立承包人', '零工工作者與網路賣家', '單一成員 LLC 擁有人', '第一次申報 Schedule C 的人'],
  relatedJourney: ['準備報稅', '自雇的第一年'],
  actionRequired: '在 Schedule C 上申報你所有的事業收入 — 包括沒有收到 Form 1099 的收入 — 減去可扣除的事業費用，並把淨利轉到 Schedule 1 與 Schedule SE。每一筆費用都要保留證明紀錄。',
  sources: [
    { label: 'IRS — Schedule C（Form 1040）（2025），事業損益（Profit or Loss From Business）', url: 'https://www.irs.gov/pub/irs-pdf/f1040sc.pdf' },
    { label: 'IRS — Schedule C（Form 1040）填寫說明（2025）', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Publication 334（2025），小型企業稅務指南（Tax Guide for Small Business）', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — 2025 年 Form 461 填寫說明，事業損失限制', url: 'https://www.irs.gov/pub/irs-pdf/i461.pdf' },
    { label: 'IRS — 標準里程費率（Notice 2026-10 與 Announcement 2026-11）', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS — Internal Revenue Bulletin 2026-29（Announcement 2026-11，修訂後的 2026 年里程費率）', url: 'https://www.irs.gov/pub/irs-irbs/irb26-29.pdf' },
    { label: 'IRS — Revenue Procedure 2024-40（2025 稅務年度通膨調整，第 2.32 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整，第 4.24 與 4.31 節）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '如果我沒有收到 Form 1099，還需要申報 Schedule C 嗎？',
    a: '如果你有事業收入，就需要。不論有沒有人寄 Form 1099-NEC、1099-MISC 或 1099-K 給你，你都必須申報所有事業收入。',
  },
  {
    q: '我有兩個不同的事業，可以合併申報嗎？',
    a: '不行。Schedule C 填寫說明表示，如果你擁有一個以上的事業，每個事業都要填一份單獨的 Schedule C。',
  },
  {
    q: '家庭辦公室要填在哪裡？',
    a: '只能填在第 30 行。不要把家庭辦公室費用填在其他任何一行。用 Form 8829 或簡易計算法計算金額。',
  },
  {
    q: '我要用哪個里程費率？',
    a: '2025 年是每英里 70 美分。2026 年，1 月 1 日至 6 月 30 日開的業務里程是每英里 72.5 美分（Notice 2026-10），7 月 1 日至 12 月 31 日是每英里 76 美分（Announcement 2026-11）。你也必須填寫 Part IV 的車輛資訊。',
  },
  {
    q: '如果我的 Form 1099-NEC 加起來比我在第 1 行申報的還多怎麼辦？',
    a: '填寫說明表示，如果你所有 Form 1099-NEC 的 box 1 合計超過你在第 1 行申報的金額，要附上一份說明差異的聲明。',
  },
  {
    q: '如果我的事業有虧損怎麼辦？',
    a: '在第 32 行勾選說明你投資狀況的方框。如果不是你所有的投資都有風險（at risk），必須附上 Form 6198，你的虧損可能會受到限制。很大的虧損也可能受到 Form 461 的超額事業損失規定限制。',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business',
    title: '小型企業老闆可以扣除哪些費用？',
    desc:  '哪些費用屬於 Schedule C。',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business',
    title: '什麼是自雇稅？怎麼計算？',
    desc:  '你的 Schedule C 利潤到了 Schedule SE 會怎樣。',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: '收到 PayPal、Venmo 或 eBay 的 1099-K，要繳稅嗎？',
    desc:  '支付平台的報表如何算進你的總收入。',
  },
]

export default function ScheduleCGuideZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Schedule C 說明：如何申報自雇收入與費用 | AskLinTax 繁體中文',
      description: '如何看懂與填寫 2025 與 2026 年的 Schedule C：總收入與 Form 1099、銷貨成本、費用欄位、家庭辦公室、里程費率、淨利與虧損。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>Schedule C（Form 1040）</strong>是獨資經營者 — 包括維持預設稅務處理方式的單一成員 LLC 擁有人 — 申報事業收入與費用的地方。結果，也就是第 31 行的<strong>淨利或淨損</strong>，會轉到 <strong>Schedule 1（Form 1040）第 3 行</strong>計算所得稅，並轉到 <strong>Schedule SE 第 2 行</strong>計算自雇稅。
        </p>

        <h2>誰要申報 Schedule C</h2>
        <ul>
          <li>有事業收入的自由業者、獨立承包人與零工工作者。</li>
          <li>獨資經營者，以及沒有選擇以公司方式課稅的單一成員 LLC 的個人擁有人。請見<a href="/zh-tw/library/business-formation/single-member-llc-taxes/">單一成員 LLC 的稅務</a>。</li>
          <li>經營事業的網路賣家。</li>
          <li>你擁有的每個事業都要填一份單獨的 Schedule C。</li>
        </ul>

        <h2>表格的結構</h2>
        <ArticleTable
          head={['部分', '填寫內容']}
          rows={[
            ['上方（A–J 行）', '事業說明與代碼、會計方法、是否實質參與、是否今年開始經營，以及是否支付了需要申報 Form 1099 的款項'],
            ['Part I — 收入（第 1–7 行）', '總收入、退貨與折讓、銷貨成本（來自 Part III），以及其他事業收入'],
            ['Part II — 費用（第 8–27b 行）', '廣告、汽車與卡車、外包勞務、折舊與第 179 條、保險、法律與專業服務、辦公室、租金、修繕、用品、稅捐與執照、差旅與餐費、水電、工資與其他費用'],
            ['第 28–31 行', '費用總額、暫定利潤、家庭辦公室（第 30 行），以及淨利或淨損（第 31 行）'],
            ['Part III — 銷貨成本', '銷售商品的事業：期初存貨、進貨、人工、材料與期末存貨'],
            ['Part IV — 車輛資訊', '如果你在第 9 行申報汽車或卡車費用，而且不需要申報 Form 4562，就要填寫'],
            ['Part V — 其他費用', '列出第 8–27a 行或第 30 行以外的費用；合計填到第 27b 行'],
          ]}
        />
        <p>
          <strong>2025 年新規定：</strong>節能商業建築扣除額改填在第 27a 行，其他費用（來自第 48 行）改填在第 27b 行。
        </p>

        <h2>收入：第 1 行與 Form 1099</h2>
        <ul>
          <li>申報事業的<strong>所有</strong>總收入，不論你有沒有收到 Form 1099。</li>
          <li>確認第 1 行包含 Form 1099-NEC 上正確列出的金額。如果這些金額合計比你申報的多，要附上說明原因的聲明。</li>
          <li>Form 1099-K 上的金額可能包含不是收入的款項（例如退款或個人轉帳）。請見<a href="/zh-tw/library/individual/form-1099-k/">Form 1099-K</a>。</li>
          <li><strong>申報門檻改變：</strong>2025 年之後支付的應申報款項，付款人的一般資訊申報門檻提高到 <strong>$2,000</strong>（Publication 334）。即使低於門檻，你仍然要申報所有收入。</li>
        </ul>

        <h2>費用：2025 與 2026 年的重要規定</h2>
        <ArticleTable
          head={['項目', '2025', '2026']}
          rows={[
            ['標準里程費率（第 9 行）', '每英里 70 美分', '1 月 1 日至 6 月 30 日每英里 72.5 美分（Notice 2026-10）；7 月 1 日至 12 月 31 日每英里 76 美分（Announcement 2026-11）'],
            ['業務餐費（第 24b 行）', '一般可扣除 50%', '一般可扣除 50%'],
            ['第 179 條與加速折舊（第 13 行，透過 Form 4562）', '第 179 條最多 $2,500,000；2025 年 1 月 19 日之後取得的合格財產可適用 100% 加速折舊', '第 179 條最多 $2,560,000；請見折舊指南'],
            ['家庭辦公室（第 30 行）', 'Form 8829 或簡易計算法（每平方英尺 $5，最多 300 平方英尺）', '相同'],
          ]}
        />
        <p>
          2026 年年中的里程費率調高，是在 Announcement 2026-11（Internal Revenue Bulletin 2026-29，2026 年 7 月 13 日）中公布，理由是近期燃料價格上漲。請依你開車的期間使用對應的費率。扣除規定的細節，請見<a href="/zh-tw/library/small-business/business-deductions/">企業費用扣除</a>與<a href="/zh-tw/library/small-business/section-179-bonus-depreciation/">第 179 條與加速折舊</a>。
        </p>

        <h2>範例（示意，2025 年）</h2>
        <p>
          <strong>Nina</strong> 是自由接案攝影師，沒有員工，也沒有存貨。
        </p>
        <ArticleTable
          head={['行次', '項目', '金額']}
          rows={[
            ['1 / 7', '總收入（包括 Form 1099-NEC 與 1099-K 上的款項）', '$90,000'],
            ['8', '廣告', '$2,000'],
            ['9', '汽車與卡車：5,000 業務英里 × 70 美分', '$3,500'],
            ['22', '用品', '$1,500'],
            ['27b', '其他費用：修圖軟體訂閱', '$1,200'],
            ['28 / 29', '費用總額，然後是暫定利潤', '$8,200 / $81,800'],
            ['30', '家庭辦公室，簡易計算法：200 平方英尺 × $5', '$1,000'],
            ['31', '淨利', '$80,800'],
          ]}
        />
        <p>
          Nina 把 $80,800 填在 Schedule 1 第 3 行，以及 Schedule SE 第 2 行。她的自雇稅大約是 $11,417（$80,800 × 92.35% × 15.3%），這筆利潤也可能適用 <a href="/zh-tw/library/small-business/qbi-deduction/">QBI 扣除額</a>。
        </p>

        <h2>虧損</h2>
        <ul>
          <li><strong>風險規定（at-risk）：</strong>在第 32 行確認你所有的投資是否都有風險。如果不是，要附上 Form 6198；你的虧損可能會受到限制。</li>
          <li><strong>被動活動規定：</strong>如果你沒有實質參與（G 行），你的虧損可能會受到限制。</li>
          <li><strong>超額事業損失：</strong>整體事業損失很大時，可能會受到 Form 461 的限制 — 請見下一節。</li>
        </ul>

        <h2>超額事業損失門檻（Form 461）</h2>
        <ArticleTable
          head={['稅務年度', '其他所有稅表（包括單身）', '合併申報', 'IRS 來源']}
          rows={[
            ['2025', '$313,000', '$626,000', 'Rev. Proc. 2024-40 第 2.32 節'],
            ['2026', '$256,000', '$512,000', 'Rev. Proc. 2025-32 第 4.31 節'],
          ]}
        />
        <p>
          這些是在 <strong>Form 461</strong> 上計算的<strong>超額事業損失限制</strong>門檻。它們<strong>不是</strong>你在 Schedule C 上可以申報的費用或扣除額上限。只有當你所有事業的損失總額，比你的事業收入與利得總額多出超過門檻時，這項限制才有影響。超過的部分當年不能扣除：要列為 Schedule 1 第 8p 行的收入，並當作淨營業損失（NOL）往後結轉。2025 年稅法（P.L. 119-21）讓這項限制成為永久性。本文查閱的 IRS 資料沒有說明為什麼 2026 年的金額比 2025 年低，因此本文不提供原因。
        </p>
        <p>
          <strong>其他損失限制也可能適用，</strong>包括風險規定（Form 6198）、被動活動規定，以及合夥人與 S 公司股東的稅基限制。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>因為沒收到 Form 1099 就漏報收入。</strong></li>
          <li><strong>同一筆款項同時出現在 Form 1099-NEC 與 Form 1099-K 上時重複計算</strong> — 要保留顯示你如何核對的紀錄。</li>
          <li><strong>扣除個人費用，</strong>或混合用途費用中的個人部分。</li>
          <li><strong>把家庭辦公室費用填在第 30 行以外的地方。</strong></li>
          <li><strong>沒有里程紀錄就申報里程，</strong>或在 2026 年用錯期間的費率。</li>
          <li><strong>把兩個事業合併在一份 Schedule C 上。</strong></li>
          <li><strong>自雇淨收入達到 $400 以上，卻忘了 Schedule SE。</strong></li>
        </ul>

        <h2>搭配 Schedule C 的表格</h2>
        <ArticleTable
          head={['表格', '可能需要的原因']}
          rows={[
            ['Schedule SE', '就你的淨利計算自雇稅'],
            ['Schedule 1（Form 1040）', '把淨利或淨損轉到你的 Form 1040'],
            ['Form 4562', '折舊、第 179 條與列舉財產（listed property）'],
            ['Form 8829', '家庭辦公室，一般計算法'],
            ['Form 6198', '虧損的風險限制'],
            ['Form 461', '超額事業損失限制'],
            ['Form 8995 或 8995-A', '合格事業所得扣除額'],
            ['Form 1040-ES', '年中繳預估稅'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 關於 2026 年表格</div>
          <p>撰寫本文時，2026 年 Schedule C 及其填寫說明仍是草稿。上面的 2026 年費率與上限來自正式 IRS 指引（Notice 2026-10、Announcement 2026-11 與 Revenue Procedure 2025-32）。本文不涵蓋州稅表。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

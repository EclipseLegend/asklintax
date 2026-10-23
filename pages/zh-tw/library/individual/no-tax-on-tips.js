import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/no-tax-on-tips.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'no-tax-on-tips',
  sourceHash:      'f9f5ba80fcc8',
  id:            '67',
  title:         '小費免稅？誰符合小費扣除資格？',
  titleEn:       'No Tax on Tips: Who Qualifies for the Deduction?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 表格、填寫說明、列出小費職業的最終法規（final regulations）與 IRS 通知，說明 2025 與 2026 稅務年度的聯邦合格小費所得稅扣除額。本文不涵蓋州所得稅、雇主的薪資稅規定，或每一種特殊情況，例如在一個以上職業收到小費',
  persona:       ['餐廳、酒吧與旅館業工作者', '髮型師、共乘司機等收小費的工作者', '收到小費的自雇人士', '夫妻都有小費收入的家庭'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '確認你的職業在 IRS 的小費職業清單上，把合格小費和服務費分開，並保留你申報小費的紀錄。在 Schedule 1-A 上申請扣除；已婚者必須夫妻合併申報。',
  sources: [
    { label: 'IRS — 「小費免稅」扣除額對你的意義（What the "No Tax on Tips" deduction means for you）', url: 'https://www.irs.gov/newsroom/what-the-no-tax-on-tips-deduction-means-for-you' },
    { label: 'IRS — Working Families Tax Cuts：個人與工作者相關條款（provisions for individuals and workers）', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A（Form 1040）（2025），額外扣除額（Additional Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（含 Schedule 1-A 說明）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2024 年 12 月 31 日或之前通常且經常收到小費的職業（Occupations that customarily and regularly received tips）', url: 'https://www.irs.gov/forms-pubs/occupations-that-customarily-and-regularly-received-tips-on-or-before-dec-31-2024' },
    { label: 'IRS — IR-2026-49，列出收小費職業的最終法規', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-final-regulations-listing-occupations-where-workers-customarily-and-regularly-receive-tips-under-the-one-big-beautiful-bill' },
    { label: 'IRS — Notice 2025-69，給 2025 年收到合格小費或加班費者的指引', url: 'https://www.irs.gov/pub/irs-drop/n-25-69.pdf' },
    { label: 'IRS — IR-2025-114，給 2025 稅務年度收到小費或加班費者的指引', url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-for-individuals-who-received-tips-or-overtime-during-tax-year-2025' },
    { label: 'IRS — Form W-2 與 W-3 一般填寫說明（2026）（General Instructions for Forms W-2 and W-3）', url: 'https://www.irs.gov/instructions/iw2w3' },
  ],
}

const FAQS = [
  {
    q: '我的小費現在免稅了嗎？',
    a: '沒有。小費仍然是收入，也仍然要繳社會安全稅與聯邦醫療保險稅（Medicare）。2025 年至 2028 年，符合資格的工作者可以在聯邦所得稅上扣除合格小費，每年最高 $25,000，收入較高時會遞減。',
  },
  {
    q: '大型聚餐自動加收的 18% 服務費算合格小費嗎？',
    a: '一般不算。服務費、自動加收的小費，以及其他加在帳單上的強制金額都不是合格小費，除非明確讓顧客可以取消或修改，而且不會有任何後果。小費必須是自願支付、不經協商，而且金額由顧客決定。',
  },
  {
    q: '要分項扣除才能申請嗎？',
    a: '不用。不論你使用標準扣除額或分項扣除，都在 Schedule 1-A 上申請這項扣除額。',
  },
  {
    q: '我們是夫妻，兩人都有小費收入，可以各扣 $25,000 嗎？',
    a: '不行。$25,000 上限是以每份稅表計算。夫妻合併申報時，上限適用於兩人合計的合格小費，不是每人各自的上限。已婚者必須夫妻合併申報才能申請。',
  },
  {
    q: '我的 2025 年 W-2 沒有分開列出小費，還能申請扣除嗎？',
    a: '可以，只要你符合資格。2025 年的 Form W-2 與 1099 沒有更新為分開列出合格小費，所以 Schedule 1-A 填寫說明與 Notice 2025-69 說明了如何決定金額 — 例如依你向雇主申報的小費，或你在 Form 4137 上申報的小費。請保留你所依據的紀錄。',
  },
  {
    q: '我住的州也有這項扣除嗎？',
    a: '不一定。州所得稅規定可能和聯邦法律不同。本文只說明聯邦規定。',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '逐年整理所有主要改變。',
  },
  {
    href: '/library/individual/no-tax-on-overtime',
    cat:  'Individuals & Families',
    title: '加班費免稅？加班費扣除額如何計算？',
    desc:  '另一項給工作者的新扣除額。',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: '什麼是 W-2？該怎麼看？',
    desc:  '你的薪資與申報的小費會出現在哪裡。',
  },
]

export default function NoTaxOnTipsZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '小費免稅？誰符合小費扣除資格 | AskLinTax 繁體中文',
      description: '聯邦合格小費扣除額：適用職業、$25,000 上限、依收入遞減、服務費的處理，以及 2025 與 2026 年申報方式的差別。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          「小費免稅」（no tax on tips）是一項新的<strong>聯邦所得稅扣除額</strong>的通俗名稱。<strong>2025 年至 2028 年</strong>，在 IRS 小費職業清單上的職業中收到<strong>合格小費</strong>的員工與自雇人士，每年最多可以扣除 <strong>$25,000</strong>。修正後調整總收入（MAGI）超過 <strong>$150,000</strong>（夫妻合併申報 $300,000）時，扣除額會減少。
        </p>
        <p>
          你的小費<strong>並沒有</strong>免稅。小費仍然計入收入，也仍然要繳<strong>社會安全稅與聯邦醫療保險稅（Medicare）</strong>。這項扣除額只會減少要繳聯邦所得稅的收入。
        </p>

        <h2>誰符合資格</h2>
        <ul>
          <li>你（或合併申報時的配偶）在這一年以員工或自雇身分收到了<strong>合格小費</strong>。</li>
          <li>小費是在財政部與 IRS 列出、<strong>2024 年 12 月 31 日或之前通常且經常收到小費</strong>的職業中收到的。</li>
          <li>收到小費的人有<strong>可用於工作的社會安全號碼（SSN）</strong>，並且在稅表截止日（含延期）前核發。</li>
          <li>如果你已婚，必須<strong>夫妻合併申報</strong>。夫妻分開申報不能申請。</li>
          <li>使用標準扣除額或分項扣除都可以。</li>
        </ul>

        <h2>哪些職業適用</h2>
        <p>
          財政部與 IRS 在 2026 年 4 月發布了<strong>最終法規</strong>，列出 70 多種職業，每一種都有財政部小費職業代碼（Treasury Tipped Occupation Code, TTOC）。清單分成八大類：餐飲服務；娛樂與活動；旅館與賓客服務；居家服務；個人服務；個人儀容與健康；休閒與教學；交通與外送。例如調酒師、餐廳服務生、旅館房務人員、髮型師與理髮師、美甲師、導遊、停車與代客泊車人員，以及計程車與共乘司機。請在 IRS 清單上查詢你確切的職業。
        </p>
        <p>
          受雇於<strong>特定服務業</strong>（specified service trade or business，定義與合格營業收入扣除相同）的雇主，或以自雇身分從事這類業務時收到的小費，不是合格小費。依 Notice 2025-69 的過渡期寬免，在這方面的最終法規生效之前，IRS 會把從事小費職業清單上職業的工作者，視為不是在這類業務中收到小費。為依適用法律屬於重罪或輕罪的服務所收到的小費，也不符合資格。
        </p>

        <h2>什麼算合格小費</h2>
        <ArticleTable
          head={['一般符合資格', '一般不符合資格']}
          rows={[
            ['顧客自願支付的小費', '自動加收的小費，以及顧客不能更改的強制服務費'],
            ['以現金、支票、信用卡或簽帳卡、禮物卡或支付 App 支付的小費', '非現金項目，例如活動門票、餐點或服務'],
            ['你從小費池（tip pool）或小費分配中分到的部分', '事先協商、作為價格一部分的金額'],
            ['在 Form W-2、Form 1099、其他對帳單上申報，或你自己在 Form 4137 上申報的小費', '不在 IRS 清單上的職業所收到的小費'],
          ]}
        />
        <p>
          加在帳單上的費用，如果<strong>明確讓顧客可以選擇</strong>取消或修改，而且不會有任何後果，仍然可以是合格小費。
        </p>

        <h2>上限與依收入遞減</h2>
        <ArticleTable
          head={['規定', '金額']}
          rows={[
            ['最高扣除額', '每份稅表 $25,000（夫妻合併申報時合計）'],
            ['自雇人士的限制', '不能超過收到小費的那項業務的淨收入'],
            ['開始遞減', 'MAGI 超過 $150,000（單身、戶長、符合資格的未亡配偶）或 $300,000（夫妻合併申報）'],
            ['遞減方式', 'MAGI 每超過門檻整數 $1,000，扣除額減少 $100'],
            ['適用年度', '2025 年至 2028 年'],
          ]}
        />

        <h2>範例（示意，2025 稅務年度）</h2>
        <p>
          <strong>Mia</strong> 是單身的餐廳服務生，2025 年收入 $46,000，其中包括她向雇主申報的 $12,000 合格小費。她的 MAGI 低於 $150,000，所以可以在 Schedule 1-A 上扣除全部 <strong>$12,000</strong>。這些小費仍然要繳社會安全稅與聯邦醫療保險稅。
        </p>
        <p>
          <strong>Daniel</strong> 是單身的調酒師，有 $30,000 合格小費，MAGI 為 $170,000。他的扣除額從最高 $25,000 開始計算。他的 MAGI 超過 $150,000 共 $20,000，所以扣除額減少 20 × $100 = $2,000。他可以扣除 <strong>$23,000</strong>。
        </p>
        <p>
          <strong>自動加收的小費：</strong>一家餐廳對六人以上的團體一律加收 18%，而且沒有明確讓顧客可以選擇更改。即使餐廳把這筆錢分給服務生，IRS 填寫說明也表示它<strong>不是</strong>合格小費。
        </p>

        <h2>2025 年與 2026 年：如何找到金額</h2>
        <ArticleTable
          head={['稅務年度', '要注意什麼']}
          rows={[
            ['2025', 'Form W-2、1099-NEC、1099-MISC 與 1099-K 沒有更新為分開列出合格小費。Schedule 1-A 填寫說明與 Notice 2025-69 說明了如何決定金額，例如依你向雇主申報的小費，或你在 Form 4137 上申報的小費。請保留你所依據的紀錄。'],
            ['2026', '雇主在 Form W-2 box 12 以代碼 TP 申報現金小費，並在 box 14b 填寫財政部小費職業代碼。扣除額的規定與上限繼續適用；IRS 公布 2026 年 Schedule 1-A 填寫說明後，請再確認。'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 預扣稅</div>
          <p>雇主仍然會對申報的小費預扣稅款。如果你預期會有較大的扣除額，可以在 Form W-4 上用 Step 4(b) 扣除額工作表考慮進去 — 請見<a href="/zh-tw/library/individual/owe-taxes-withholding-w4/">為什麼報稅時要補稅</a>。</p>
        </div>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「所有小費現在都免稅了。」</strong>小費仍然是應稅收入，也要繳社會安全稅與聯邦醫療保險稅；扣除額有上限，也會遞減。</li>
          <li><strong>「收到小費的人都符合資格。」</strong>只有清單上職業的小費才算，而且特定服務業中的小費不算。</li>
          <li><strong>「服務費也算。」</strong>顧客不能更改的強制費用不是合格小費。</li>
          <li><strong>「夫妻每人各有 $25,000。」</strong>$25,000 上限是以每份稅表計算，夫妻合併申報時合計。</li>
          <li><strong>「不用申報小費也能扣除。」</strong>小費必須申報 — 在 Form W-2、Form 1099、其他對帳單上，或由你自己在 Form 4137 上申報。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只說明聯邦規定</div>
          <p>州所得稅規定可能和聯邦法律不同。請不要假設你所在的州也允許這項扣除。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

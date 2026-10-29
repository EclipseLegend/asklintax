import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/medical-expense-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'medical-expense-deduction',
  sourceHash:      '4c1a98fb5ee0',
  id:            '124',
  title:         '醫療費用扣除：7.5% 門檻與哪些人的費用可以算',
  titleEn:       'Medical Expense Deduction: The 7.5% Rule and Whose Expenses Count',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 502（2025）與 Publication 969（2025），說明醫療與牙科費用的分項扣除。2026 年長期照護保費上限來自 Rev. Proc. 2025-32，2026 年醫療里程費率來自 IRS 標準里程費率網頁（2026 年 7 月審閱）；尚未有 2026 年版的 Publication 502。本文不涵蓋所有可能的費用、不詳細說明自雇者健康保險扣除，也不涵蓋州的規定',
  persona:       ['醫療或牙科費用很高的家庭', '替父母支付照護費用的人', '有長期照護費用的退休人士', '正在決定是否分項扣除的人'],
  relatedJourney: ['有受扶養人的報稅', '準備報稅'],
  actionRequired: '把你當年為自己、配偶與受扶養人支付、且沒有獲得補償的醫療與牙科費用加總。只有超過 AGI 7.5% 的部分才算，而且必須在 Schedule A 上分項扣除。把父母或其他親屬的帳單算進來之前，先確認對方符合公民或居住要求。',
  sources: [
    { label: 'IRS — Publication 502（2025），醫療與牙科費用', url: 'https://www.irs.gov/pub/irs-pdf/p502.pdf' },
    { label: 'IRS — Publication 969（2025），健康儲蓄帳戶與其他享稅務優惠的健康計畫', url: 'https://www.irs.gov/pub/irs-pdf/p969.pdf' },
    { label: 'IRS — 標準里程費率', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '醫療費用可以扣除多少？',
    a: '只有沒有獲得補償的醫療與牙科費用中，超過調整後總收入（AGI）7.5% 的部分，而且必須在 Schedule A 上分項扣除。如果你的 AGI 是 $80,000，最前面的 $6,000 費用不會產生任何扣除。',
  },
  {
    q: '可以把父母的醫療帳單算進來嗎？',
    a: '可以，前提是在接受照護或你付款時，父母是你的受扶養人 — 而且父母是美國公民或美國國民，或是美國、加拿大或墨西哥的居民。合格親屬一般而言總收入必須低於 $5,200（2025 年）或 $5,300（2026 年）。僅就醫療扣除而言，如果父母不符合受扶養人規定，只是因為這項總收入測試、申報了合併稅表，或你可以被別人申報為受扶養人，你仍然可以把費用算進來；其他測試，例如扶養與公民或居住測試，仍然適用。住在台灣或中國、不是美國公民、國民或居民的父母，通常不符合。',
  },
  {
    q: '健康保險保費可以扣除嗎？',
    a: '用稅後的錢支付的醫療保險保費通常可以算。透過稅前薪資扣款支付的保費不行。長期照護保險保費只能在依年齡而定的上限內計入。如果你是自雇者，可能改適用另一項健康保險扣除。',
  },
  {
    q: '在國外買的藥可以扣除嗎？',
    a: '一般而言，從其他國家帶入或寄來的處方藥不能計入，除非是合法進口的。你在另一個國家購買並在當地使用的處方藥，如果在該國與美國都合法，可以計入。非處方藥（胰島素除外）不能計入。',
  },
  {
    q: '用 HSA 或 FSA 支付，或保險已經補償的費用呢？',
    a: '等於 HSA 免稅提領金額的費用不能扣除，由你以稅前薪資存款支應的彈性支出帳戶（FSA）補償的費用，以及由保險或健康補償安排（HRA）補償的費用，也不能扣除。只有你自己支付、沒有獲得補償的金額才算。',
  },
  {
    q: '費用要算在哪一年？',
    a: '通常是付款的那一年，而不是接受照護的那一年。用信用卡支付的費用，算在刷卡的那一年，即使你之後才繳卡費。',
  },
]

const RELATED = [
  {
    href: '/library/individual/claim-parent-as-dependent',
    cat:  'Individuals & Families',
    title: '父母住在海外，可以申報為受扶養人嗎？',
    desc:  '父母的受扶養人與居住測試。',
  },
  {
    href: '/library/individual/health-savings-account-hsa',
    cat:  'Individuals & Families',
    title: '健康儲蓄帳戶（HSA）：2025 與 2026 年上限與 2026 年新規定',
    desc:  '以免稅方式支付醫療費用。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '為什麼分項扣除不一定對每個人都有幫助。',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: '州稅與地方稅（SALT）扣除額：上限、收入限制與實例',
    desc:  '另一項可以比較的分項扣除。',
  },
]

export default function MedicalExpenseDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '醫療費用扣除：7.5% 門檻與哪些人的費用可以算 | AskLinTax 繁體中文',
      description: '醫療費用扣除怎麼運作：AGI 7.5% 的門檻、在 Schedule A 上分項扣除、哪些費用可以算、保險與長期照護保費、2025 與 2026 年醫療里程，以及哪些人的費用可以算 — 包括住在海外的父母。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          沒有獲得補償的醫療與牙科費用，只有超過 <strong>AGI 7.5%</strong> 的部分可以扣除，而且你必須在 Schedule A 上<strong>分項扣除</strong>，而不是使用標準扣除額。費用可以是為你自己、你的配偶與你的<strong>受扶養人</strong>支付的 — 但受扶養人通常必須是美國公民或美國國民，或是美國、加拿大或墨西哥的居民。
        </p>

        <h2>7.5% 門檻怎麼運作</h2>
        <ArticleTable
          head={['', '範例']}
          rows={[
            ['AGI', '$80,000'],
            ['7.5% 門檻', '$6,000'],
            ['已支付且沒有獲得補償的醫療與牙科費用', '$9,500'],
            ['Schedule A 上的金額', '$3,500'],
            ['有幫助嗎？', '只有在你的分項扣除總額超過標準扣除額時'],
          ]}
        />

        <h2>哪些算、哪些不算</h2>
        <ArticleTable
          head={['通常可以算', '通常不能算']}
          rows={[
            ['支付給醫師、牙醫與其他醫療從業人員的費用；住院照護', '整形美容手術，除非是為了矯正先天異常、意外或毀容性疾病造成的畸形'],
            ['處方藥與胰島素', '非處方藥（胰島素除外）'],
            ['用稅後的錢支付的醫療保險保費', '透過稅前薪資扣款支付的保費'],
            ['合格的長期照護保費，在依年齡而定的上限內', '健身房、健身俱樂部或水療會館的會費（即使是為了一般健康）'],
            ['主要為了且為醫療照護所必需的交通費用', '由保險、HRA 或稅前 FSA 補償，或用 HSA 免稅資金支付的費用'],
          ]}
        />
        <p>
          醫療費用是指為了診斷、治癒、減輕、治療或預防疾病，以及為了影響身體任何部位或功能而支出的費用。Publication 502 列出許多具體項目。
        </p>

        <h2>2025 與 2026 年金額</h2>
        <ArticleTable
          head={['項目', '2025', '2026']}
          rows={[
            ['醫療里程費率', '每英里 21 美分', '20.5 美分（1 月 1 日 – 6 月 30 日）；23.5 美分（7 月 1 日 – 12 月 31 日）'],
            ['長期照護保費上限 — 40 歲以下', '$480', '$500'],
            ['41 至 50 歲', '$900', '$930'],
            ['51 至 60 歲', '$1,800', '$1,860'],
            ['61 至 70 歲', '$4,810', '$4,960'],
            ['71 歲以上', '$6,020', '$6,200'],
          ]}
        />
        <p>
          2025 年數字來自 Publication 502（2025）。2026 年長期照護上限來自 Rev. Proc. 2025-32，2026 年里程費率來自 IRS 標準里程費率網頁。停車費與過路費，不論使用里程費率或實際車輛費用，都可以加上。
        </p>

        <h2>哪些人的費用可以算</h2>
        <ul>
          <li><strong>你自己與你的配偶。</strong></li>
          <li><strong>你的受扶養人</strong> — 在接受照護時或你付款時是你受扶養人的合格子女或合格親屬。</li>
          <li><strong>公民或居住要求：</strong>這個人必須是美國公民或美國國民，或是美國、加拿大或墨西哥的居民。美國公民或國民的養子女，如果當年以家庭成員身分與你同住，屬於例外。</li>
          <li><strong>總收入測試：</strong>一般而言，要成為合格親屬，此人的總收入必須低於 $5,200（2025 年）或 $5,300（2026 年，依 Rev. Proc. 2025-32）。</li>
          <li><strong>醫療扣除的特別規定：</strong>如果某人原本會是你的受扶養人，只是因為總收入達到或超過該金額、申報了合併稅表，或你（或你的配偶）可以被別人申報為受扶養人，你仍可以把他的費用算進來。此人仍必須符合其他受扶養人測試，例如親屬關係或同住、扶養，以及公民或居住測試。</li>
          <li><strong>離婚或分居的父母：</strong>符合特定監護與扶養條件時，就這項扣除而言，子女可以同時被視為雙方父母的受扶養人。</li>
          <li><strong>多方扶養協議：</strong>如果兄弟姊妹依這種協議共同扶養父母，只有被視為申報該父母的人可以計入醫療費用，而且只限他自己支付且沒有被償還的金額。</li>
        </ul>

        <h2>範例：從海外來探親的父母</h2>
        <p>
          Lin 的母親是台灣公民與居民，2025 年來美國探親三個月。Lin 為母親支付了 $12,000 的住院費用。因為 Lin 的母親不是美國公民、國民，也不是美國、加拿大或墨西哥的居民，不符合公民或居住要求，所以即使是 Lin 付的錢，Lin 通常也不能把這 $12,000 算進來。如果 Lin 的母親已經成為美國的稅務居民，結果可能不同；請見<a href="/zh-tw/library/individual/claim-parent-as-dependent/">父母可以申報為受扶養人嗎</a>。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 保留收據與付款證明</div>
          <p>請保留帳單、收據、顯示保險補償金額的保險明細，以及醫療行程的里程紀錄。只有你實際支付、且沒有獲得補償的費用才算。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

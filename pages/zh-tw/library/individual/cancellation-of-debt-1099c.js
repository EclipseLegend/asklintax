import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/cancellation-of-debt-1099c.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'cancellation-of-debt-1099c',
  sourceHash:      '98bf48c121a5',
  id:            '114',
  title:         '債務免除與 Form 1099-C：被免除的債務何時要課稅',
  titleEn:       'Canceled Debt and Form 1099-C: When Forgiven Debt Is Taxable',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 4681（2025）、Form 982 說明（2021 年 12 月版），以及 Form 1099-A 與 1099-C 說明（2025 年 4 月版），說明 2025 與 2026 稅務年度債務免除的聯邦稅務處理。本次審閱時尚無 2026 年版 Publication 4681。本文不涵蓋企業債務重組、農業債務，也不詳細說明稅務屬性減少的規定',
  persona:       ['收到 Form 1099-C 的人', '經歷法拍、短售或貸款修改的屋主', '學生貸款被免除的借款人', '和解信用卡債務的人'],
  relatedJourney: ['處理稅務問題', '金錢與福利'],
  actionRequired: '不要忽略 Form 1099-C。確認是否適用例外或排除規定 — 特別是無力清償 — 並申報任何應稅金額；如果要排除，請在稅表附上 Form 982。',
  sources: [
    { label: 'IRS — Publication 4681（2025），債務免除、法拍、收回與放棄', url: 'https://www.irs.gov/publications/p4681' },
    { label: 'IRS — Form 982 說明（2021 年 12 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i982.pdf' },
    { label: 'IRS — Form 1099-A 與 1099-C 說明（2025 年 4 月版）', url: 'https://www.irs.gov/pub/irs-pdf/i1099ac.pdf' },
  ],
}

const FAQS = [
  {
    q: '我以低於欠款的金額和解信用卡債務，差額要課稅嗎？',
    a: '通常要，除非適用例外或排除規定。被免除的非營業債務申報在 Schedule 1（Form 1040）第 8c 行。最常見的方法是無力清償排除：在債務免除前一刻，你的總負債超過總資產公平市價的部分，可以排除。',
  },
  {
    q: '我沒收到 Form 1099-C，還要申報被免除的債務嗎？',
    a: '如果要課稅，通常還是要申報。貸款機構免除 $600 以上的債務且發生可辨識事件時，必須申報 Form 1099-C，但即使沒有表格，這筆收入仍可能要課稅。有些不課稅的學生貸款免除根本不會申報在 Form 1099-C 上。',
  },
  {
    q: '我的房貸在短售中被免除。2026 年還能排除嗎？',
    a: '合格主要住所債務排除適用於 2026 年 1 月 1 日之前免除的債務，或依 2026 年 1 月 1 日之前訂立並有書面證明的安排而免除的債務。沒有這種書面安排，2026 年的免除就不符合資格，但仍可能適用無力清償或破產。',
  },
  {
    q: '從 2026 年開始，所有學生貸款免除都要課稅嗎？',
    a: '不是。只有 2021 到 2025 年免除的廣泛排除規定到期。Publication 4681 仍列出其他獨立的排除規定：因在特定職業為特定雇主工作而免除、特定醫療專業貸款償還計畫，以及因學生死亡或完全永久失能而免除。2025 年以後因死亡或失能免除的，你需要在報稅截止日前核發、可用於工作的 SSN。',
  },
  {
    q: '什麼是 Form 982？',
    a: 'Form 982 是申請大多數排除規定的表格，例如無力清償、破產與合格主要住所債務。排除被免除的債務通常需要減少某些稅務屬性，例如你的財產成本基礎。',
  },
  {
    q: '以贈與或遺產方式免除的債務要課稅嗎？',
    a: '通常不用。Publication 4681 指出，如果債務是以贈與、遺贈或繼承方式免除，你通常沒有債務免除所得。',
  },
]

const RELATED = [
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: '我賣了房子，獲利要繳稅嗎？',
    desc:  '出售的利得和被免除的房貸是不同的項目。',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: '繳不出稅款怎麼辦？有哪些選擇？',
    desc:  '如果債務免除讓你欠了繳不出的稅。',
  },
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: '教育抵稅額：AOTC 與 Lifetime Learning Credit 怎麼選？',
    desc:  '其他聯邦教育稅務規定。',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: '收到 PayPal、Venmo 或 eBay 的 1099-K，要繳稅嗎？',
    desc:  '另一種不代表最終稅額的資訊申報表。',
  },
]

export default function CancellationOfDebtPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '債務免除與 Form 1099-C：被免除的債務何時要課稅 | AskLinTax 繁體中文',
      description: '被免除的債務何時要課稅：Form 1099-C、Schedule 1 第 8c 行、無力清償、破產、主要住所排除與 2026 年書面安排規定、2025 年以後的學生貸款免除、法拍，以及 Form 982。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          當貸款機構取消、免除或以低於欠款的金額和解一筆債務時，被免除的金額通常是<strong>應稅所得</strong>。你可能會收到 <strong>Form 1099-C</strong>。但有幾項<strong>例外與排除規定</strong>可以讓部分或全部金額不用課稅 — 最常見的是<strong>無力清償</strong>。2025 年以後有兩項排除規定縮小：被免除的<strong>主要住所房貸</strong>排除，以及<strong>學生貸款</strong>免除的廣泛排除。
        </p>

        <h2>Form 1099-C 與申報位置</h2>
        <ul>
          <li><strong>誰會寄：</strong>金融機構、信用合作社、聯邦機構與某些其他貸款機構，在免除 $600 以上的債務且發生可辨識事件時，會申報 Form 1099-C。</li>
          <li><strong>第 6 欄</strong>顯示可辨識事件代碼，說明開立表格的原因。</li>
          <li><strong>應稅債務免除的申報位置：</strong>非營業債務申報在 Schedule 1（Form 1040）第 8c 行；獨資事業申報在 Schedule C；出租不動產申報在 Schedule E。</li>
          <li><strong>沒有表格不代表沒有所得。</strong>即使沒有 1099-C，應稅的債務免除仍必須申報。</li>
        </ul>

        <h2>例外：根本不算所得</h2>
        <ul>
          <li><strong>贈與、遺贈與繼承。</strong></li>
          <li><strong>可扣除的債務：</strong>採現金收付制的納稅人，如果支付這筆債務原本可以扣除。</li>
          <li><strong>購買後降價：</strong>在你沒有無力清償或破產時，賣方減少你購買其財產所欠的債務；你要改為降低該財產的成本基礎。</li>
          <li><strong>某些學生貸款</strong> — 見下文。</li>
        </ul>

        <h2>排除規定：用 Form 982 申請</h2>
        <ArticleTable
          head={['排除規定', '重點']}
          rows={[
            ['破產', '在第 11 章（title 11）破產案件中免除的債務可以排除'],
            ['無力清償', '在債務免除前一刻，總負債超過總資產公平市價的部分可以排除'],
            ['合格主要住所債務', '主要住所的房貸；最高 $750,000（已婚分開申報 $375,000）；適用於 2026 年以前的免除，或依 2026 年以前訂立的書面安排而免除'],
            ['合格農業債務', '某些農業債務'],
            ['合格營業用不動產債務', '以營業用不動產為擔保的債務，需選擇適用'],
          ]}
        />
        <p>
          被排除的金額通常會減少稅務屬性，例如你保留的財產的成本基礎。破產優先適用；如果你無力清償，可以選擇用無力清償排除取代主要住所排除。
        </p>

        <h2>主要住所房貸：2026 年的變化</h2>
        <ul>
          <li><strong>符合資格的債務：</strong>為購買、建造或大幅改善主要住所而借、並以該住所擔保的債務，以及重新貸款中不超過原房貸餘額的部分。</li>
          <li><strong>時間：</strong>Form 982 說明指出，這項排除適用於 <strong>2026 年 1 月 1 日之前免除</strong>的債務，或依 <strong>2026 年 1 月 1 日之前訂立並有書面證明</strong>的安排而免除的債務。</li>
          <li><strong>不包括：</strong>因為你為貸款機構提供服務，或因與房屋價值下跌或你的財務狀況沒有直接關係的原因而免除的債務。</li>
          <li><strong>成本基礎：</strong>如果你保留房屋，要用被排除的金額降低房屋的成本基礎。</li>
        </ul>

        <h2>學生貸款：逐項看每一項排除規定</h2>
        <ArticleTable
          head={['排除規定', '2025 年以後的狀態']}
          rows={[
            ['2021 到 2025 年免除的廣泛排除（高等教育貸款、私人教育貸款與某些其他貸款）', '2025 年 12 月 31 日以後的免除不再適用'],
            ['在特定期間、特定職業、為廣泛類別的雇主工作而免除合格貸款', 'Publication 4681（2025）列出時沒有結束日期'],
            ['國家衛生服務團（National Health Service Corps）、公共衛生服務法下的州計畫，以及某些州醫療專業計畫提供的還款協助', 'Publication 4681（2025）列出時沒有結束日期'],
            ['因學生死亡或完全永久失能而免除', '繼續適用；2025 年以後的免除，你需要在報稅截止日前核發、可用於工作的 SSN'],
          ]}
        />
        <p>
          工作條件排除有自己的條件：貸款必須來自合格貸款機構、用於就讀合格教育機構，而且因為替學校或免稅貸款機構本身提供服務而免除的，不符合資格。2020 年以後不課稅的學生貸款免除，不會申報在 Form 1099-C 上。
        </p>

        <h2>法拍、收回與放棄</h2>
        <ul>
          <li><strong>有追索權債務</strong>（你個人要負責）：如果債務超過財產價值，你可能同時有財產的利得或損失，以及另外的債務免除所得。</li>
          <li><strong>無追索權債務：</strong>全部債務視為處分財產的實現金額 — 是利得或損失，不是債務免除所得。</li>
          <li><strong>Form 1099-A</strong> 可能會申報取得或放棄；同一年免除 $600 以上債務的貸款機構可以只申報 Form 1099-C。</li>
        </ul>

        <h2>範例</h2>
        <p>
          2025 年，Leo 的信用卡公司接受 $4,000 和解 $10,000 的欠款，並寄給他一份 $6,000 的 Form 1099-C。在和解前一刻，他的總負債是 $50,000，總資產價值 $47,000，所以他無力清償的金額是 $3,000。他可以在 Form 982 上排除 $3,000，其餘 $3,000 申報在 Schedule 1 第 8c 行。這些數字只是說明；Publication 4681 有無力清償工作表。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>忽略 Form 1099-C</strong> — IRS 也會收到副本。</li>
          <li><strong>沒有算清楚所有資產與負債</strong>，錯過無力清償排除。</li>
          <li><strong>2026 年的免除沒有 2026 年以前訂立的書面安排</strong>，卻申請主要住所排除。</li>
          <li><strong>以為 2025 年以後所有學生貸款免除都要課稅</strong>，或以為全部都免稅。</li>
          <li><strong>忘記 Form 982</strong> 或必要的成本基礎調降。</li>
          <li><strong>把出售房屋的利得</strong>和被免除的房貸混為一談 — 它們是不同的項目。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>破產、營業或出租債務、部分無力清償，以及稅務屬性減少都可能很複雜。如果金額很大，請由稅務專業人士審閱你的 Form 982。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

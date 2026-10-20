import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/senior-deduction.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'senior-deduction',
  sourceHash:      '49893af3bf7b',
  id:            '69',
  title:         '65 歲以上新增 $6,000 扣除額：資格與收入限制',
  titleEn:       'The New $6,000 Senior Deduction: Eligibility and Income Limits',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS 表格、填寫說明與指引，說明 2025 與 2026 稅務年度的聯邦長者加強扣除額，以及它和 65 歲以上原有額外標準扣除額的差別。本文不涵蓋非居民外國人、州所得稅，也不詳細說明社會安全福利有多少要課稅',
  persona:       ['65 歲以上的納稅人', '有社會安全福利與其他收入的退休人士', '一方或雙方 65 歲以上的夫妻', '協助父母報稅的成年子女'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '如果你（或你的配偶）在稅務年度結束前年滿 65 歲，並有有效的社會安全號碼，請在 Schedule 1-A 第 V 部分計算這項扣除額。它是加在你的標準扣除額或分項扣除之外的。已婚者必須夫妻合併申報。',
  sources: [
    { label: 'IRS — 確認你是否符合新的長者加強扣除額（Check your eligibility for the new enhanced deduction for seniors）', url: 'https://www.irs.gov/newsroom/check-your-eligibility-for-the-new-enhanced-deduction-for-seniors' },
    { label: 'IRS — Tax Tip 2026-14，給長者的 2026 報稅季更新與資源', url: 'https://www.irs.gov/newsroom/2026-filing-season-updates-and-resources-for-seniors' },
    { label: 'IRS — Working Families Tax Cuts：個人與工作者相關條款（provisions for individuals and workers）', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A（Form 1040）（2025），額外扣除額（Additional Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（Schedule 1-A 說明、標準扣除額與社會安全福利工作表）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — IR-2026-28，新的 Schedule 1-A 與 Form 1040 填寫說明', url: 'https://www.irs.gov/newsroom/irs-published-schedule-taxpayers-will-use-to-claim-deductions-on-no-tax-on-tips-no-tax-on-overtime-no-tax-on-car-loans-no-tax-on-seniors' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '這和 65 歲以上的額外標準扣除額一樣嗎？',
    a: '不一樣。65 歲以上的額外標準扣除額原本就存在，是標準扣除額的一部分。新的長者加強扣除額是另一項扣除額，每位符合資格的人最高 $6,000，在 Schedule 1-A 上申報，而且是加在原有金額之外的。',
  },
  {
    q: '這會讓我的社會安全福利免稅嗎？',
    a: '不會。社會安全福利有多少要課稅，仍然是用 Form 1040 填寫說明中的社會安全福利工作表（Social Security Benefits Worksheet）計算，而這張工作表不會用到這項扣除額。長者扣除額是在之後才扣除，所以可以降低你全部應稅所得的稅額，但不會改變福利中要課稅的部分。',
  },
  {
    q: '分項扣除的人也可以申請嗎？',
    a: '可以。不論你使用標準扣除額或分項扣除都可以申請。',
  },
  {
    q: '我配偶 67 歲、我 60 歲，可以申請嗎？',
    a: '可以，但只能為你的配偶申請，條件是你們夫妻合併申報，而且你的配偶有有效的社會安全號碼。這項扣除額是每位符合資格的人最高 $6,000，所以你們的合併稅表最多可以申請 $6,000，並適用收入遞減。',
  },
  {
    q: '新的扣除額會改變我是否需要報稅嗎？',
    a: 'Form 1040 填寫說明中的報稅門檻是根據標準扣除額，包括 65 歲以上原有的額外金額。新的長者扣除額不屬於標準扣除額，所以不會提高這些門檻。',
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
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '報稅門檻，包括 65 歲以上的情況。',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '扣除額如何降低你的稅。',
  },
]

export default function SeniorDeductionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '65 歲以上新增 $6,000 扣除額：誰符合資格 | AskLinTax 繁體中文',
      description: '2025–2028 年的聯邦長者加強扣除額：誰符合資格、$6,000 的金額、依收入遞減，以及它和 65 歲以上額外扣除額的差別。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>2025 年至 2028 年</strong>，<strong>65 歲以上</strong>的人每人最多可以申請一項新的聯邦扣除額 <strong>$6,000</strong>（夫妻合併申報且兩人都符合資格時為 $12,000）。IRS 稱它為<strong>長者加強扣除額</strong>（enhanced deduction for seniors）。不論你使用標準扣除額或分項扣除，都在 Schedule 1-A 第 V 部分申報。
        </p>
        <p>
          它是<strong>加在</strong> 65 歲以上原本就有的額外標準扣除額<strong>之外</strong>的。修正後調整總收入（MAGI）超過 <strong>$75,000</strong>（夫妻合併申報 $150,000）時，扣除額會減少。
        </p>

        <h2>誰符合資格</h2>
        <ul>
          <li>你（或合併申報時的配偶）在<strong>稅務年度最後一天前年滿 65 歲</strong>。以 2025 年來說，就是 1961 年 1 月 2 日之前出生。</li>
          <li>申請的每個人都有<strong>可用於工作的社會安全號碼（SSN）</strong>。</li>
          <li>如果你已婚，必須<strong>夫妻合併申報</strong>。</li>
          <li>使用標準扣除額或分項扣除都可以。</li>
        </ul>
        <p>
          在 1961 年 1 月 2 日之前出生、但在 2025 年未滿 65 歲就過世的納稅人不符合資格。Schedule 1-A 填寫說明把一個人在 65 歲生日的前一天視為年滿 65 歲。
        </p>

        <h2>新的長者扣除額 vs. 原有的額外標準扣除額</h2>
        <ArticleTable
          head={['', '額外標準扣除額（原有規定）', '長者加強扣除額（新）']}
          rows={[
            ['2025 稅務年度金額', '單身或戶長 $2,000；已婚或符合資格的未亡配偶，每位符合資格者 $1,600', '每位符合資格者最高 $6,000'],
            ['2026 稅務年度金額', '單身或戶長 $2,050；已婚或符合資格的未亡配偶，每位符合資格者 $1,650', '每位符合資格者最高 $6,000'],
            ['適用對象', '65 歲以上或失明', '65 歲以上（與失明無關）'],
            ['收入限制', '無', 'MAGI 超過 $75,000（合併申報 $150,000）時遞減'],
            ['分項扣除時', '不能使用 — 它是標準扣除額的一部分', '仍然可以使用'],
            ['申報位置', 'Form 1040 上標準扣除額的一部分', 'Schedule 1-A 第 V 部分'],
            ['適用年度', '持續適用', '2025 年至 2028 年'],
          ]}
        />

        <h2>收入遞減怎麼算</h2>
        <p>
          每位符合資格的人從 $6,000 開始，減去 MAGI 超過 $75,000（夫妻合併申報 $150,000）部分的 <strong>6%</strong>。單身申報者在 MAGI 達到 $175,000 時扣除額歸零；夫妻合併申報則是 $250,000。
        </p>

        <h2>範例（示意，2025 稅務年度）</h2>
        <p>
          <strong>Helen</strong> 70 歲、單身，使用標準扣除額，MAGI 為 $60,000。她的 MAGI 低於 $75,000，所以可以拿到全部 $6,000。她的扣除額總計為 $15,750 標準扣除額，加上 65 歲的 $2,000 額外標準扣除額，再加上 $6,000 長者扣除額 — 共 <strong>$23,750</strong>。
        </p>
        <p>
          <strong>Robert</strong> 68 歲、單身，MAGI 為 $90,000。他的 MAGI 超過 $75,000 共 $15,000，$15,000 的 6% 是 $900。他的長者扣除額是 $6,000 − $900 = <strong>$5,100</strong>。
        </p>
        <p>
          <strong>Mei 和 Wen</strong> 兩人都是 67 歲，夫妻合併申報，MAGI 為 $170,000。他們的 MAGI 超過 $150,000 共 $20,000，$20,000 的 6% 是 $1,200。每人的扣除額是 $6,000 − $1,200 = $4,800，合計 <strong>$9,600</strong>。
        </p>

        <h2>2025 年與 2026 年</h2>
        <ArticleTable
          head={['稅務年度', '適用規定']}
          rows={[
            ['2025', '1961 年 1 月 2 日之前出生者每人最高 $6,000；MAGI 超過 $75,000 / $150,000 時遞減；額外標準扣除額 $2,000（單身或戶長）或 $1,600（已婚或符合資格的未亡配偶，每位符合資格者）'],
            ['2026', 'IRS 說明 2025 年至 2028 年對年底前年滿 65 歲者適用相同的 $6,000 扣除額與遞減規定；額外標準扣除額提高為 $2,050（單身或戶長）或 $1,650（已婚或符合資格的未亡配偶，每位符合資格者）'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ 社會安全福利並不會自動免稅</div>
          <p>社會安全福利中要課稅的部分，仍然是用 Form 1040 填寫說明中的社會安全福利工作表計算，而這張工作表不包括這項扣除額。長者扣除額是在之後才扣除，填在 Form 1040 第 13b 行。它可以降低你全部應稅所得的稅額，但不會改變福利中要課稅的金額。</p>
        </div>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「它取代了 65 歲以上的額外標準扣除額。」</strong>它是加在那項金額之外的。</li>
          <li><strong>「社會安全福利不再課稅了。」</strong>福利中要課稅的部分，計算方式和以前一樣。</li>
          <li><strong>「分項扣除就不能用。」</strong>不論你分項扣除或使用標準扣除額都可以申請。</li>
          <li><strong>「65 歲以上的人都可以拿到 $6,000。」</strong>MAGI 超過 $75,000（合併申報 $150,000）時會遞減，需要有效的社會安全號碼，而且已婚者必須夫妻合併申報。</li>
          <li><strong>「它會改變我的報稅義務。」</strong>報稅門檻是根據標準扣除額，不包括這項扣除額。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只說明聯邦規定</div>
          <p>州所得稅規定可能和聯邦法律不同。請不要假設你所在的州也允許這項扣除。非居民外國人請查看 Schedule 1-A 填寫說明與 Publication 519。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

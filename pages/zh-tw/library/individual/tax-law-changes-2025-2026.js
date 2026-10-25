import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/tax-law-changes-2025-2026.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'tax-law-changes-2025-2026',
  sourceHash:      'e10c867995c5',
  id:            '66',
  title:         '美國新稅法：2025 與 2026 年報稅有哪些改變？',
  titleEn:       'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '概要說明 Public Law 119-21（2025 年 7 月 4 日生效，IRS 現在也稱為 Working Families Tax Cuts）對個人的主要聯邦稅務改變。本文為摘要並連結到詳細指南；不涵蓋所有條款、企業相關條款，或可能與聯邦法律不同的州稅規定',
  persona:       ['申報 2025 年稅表的人', '有小費或加班費收入的工作者', '65 歲以上的納稅人', '採用分項扣除的屋主與高稅率州居民'],
  relatedJourney: ['準備報稅', '了解新稅務規定'],
  actionRequired: '逐一確認每個稅務年度有哪些改變適用於你。幾項新扣除額從 2025 年稅表開始適用，並在新的 Schedule 1-A 上申報；其他改變則從 2026 年開始。規定與上限請見詳細指南。',
  sources: [
    { label: 'IRS — Working Families Tax Cuts：個人與工作者相關條款（provisions for individuals and workers）', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Working Families Tax Cuts（One, Big, Beautiful Bill 相關條款）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Schedule 1-A（Form 1040）（2025），額外扣除額（Additional Deductions）', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 年 Form 1040 填寫說明（含 Schedule 1-A 說明）', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — IR-2026-28，新的 Schedule 1-A 與 Form 1040 填寫說明', url: 'https://www.irs.gov/newsroom/irs-published-schedule-taxpayers-will-use-to-claim-deductions-on-no-tax-on-tips-no-tax-on-overtime-no-tax-on-car-loans-no-tax-on-seniors' },
    { label: 'IRS — IR-2025-103，2026 稅務年度通膨調整', url: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill' },
    { label: 'IRS — Revenue Procedure 2025-32（2026 稅務年度通膨調整）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Publication 505（2026），預扣稅與預估稅（Tax Withholding and Estimated Tax）', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — Form W-2 與 W-3 一般填寫說明（2026）（General Instructions for Forms W-2 and W-3）', url: 'https://www.irs.gov/instructions/iw2w3' },
    { label: 'IRS — Form 1099-MISC 與 1099-NEC 填寫說明（Instructions for Forms 1099-MISC and 1099-NEC）', url: 'https://www.irs.gov/instructions/i1099mec' },
  ],
}

const FAQS = [
  {
    q: '新稅法是從 2025 年還是 2026 年開始？',
    a: '兩者都有。這項法律在 2025 年 7 月 4 日生效，許多改變適用於 2025 年稅表 — 包括較高的標準扣除額、$2,200 的兒童抵稅額、較高的 SALT 上限，以及小費、加班費、汽車貸款利息與長者的新扣除額。有些改變，例如不分項扣除者的慈善捐款扣除，以及較高的兒童與受扶養人照顧抵稅額比率，則從 2026 年才開始適用。',
  },
  {
    q: '「小費免稅」或「加班費免稅」是不是代表這些收入不用繳稅？',
    a: '不是。這些是聯邦所得稅的扣除額，有上限、資格規定，也會依收入遞減。小費與加班費仍然計入收入，也仍然要繳社會安全稅與聯邦醫療保險稅（Medicare）。',
  },
  {
    q: '要分項扣除才能申請新的扣除額嗎？',
    a: '不用。合格小費、合格加班費、合格汽車貸款利息扣除額，以及長者加強扣除額，不論你使用標準扣除額或分項扣除，都在 Schedule 1-A 上申報。SALT 扣除額不同：只有分項扣除（Schedule A）時才有幫助。',
  },
  {
    q: 'Schedule 1-A 的新扣除額會適用多久？',
    a: 'IRS 說明，小費、加班費、汽車貸款利息與長者扣除額適用於 2025 年至 2028 年。',
  },
  {
    q: '我住的州會跟著這些聯邦改變嗎？',
    a: '不一定。州所得稅規定可能和聯邦法律不同。本文只說明聯邦規定；請查看你所在州稅務機關的說明。',
  },
]

const RELATED = [
  {
    href: '/library/individual/no-tax-on-tips',
    cat:  'Individuals & Families',
    title: '小費免稅？誰符合小費扣除資格？',
    desc:  '合格小費、適用職業、上限與收入遞減。',
  },
  {
    href: '/library/individual/no-tax-on-overtime',
    cat:  'Individuals & Families',
    title: '加班費免稅？加班費扣除額如何計算？',
    desc:  '只有加班溢價可以扣除 — 以及 2026 年的申報方式。',
  },
  {
    href: '/library/individual/senior-deduction',
    cat:  'Individuals & Families',
    title: '65 歲以上新增 $6,000 扣除額：資格與收入限制',
    desc:  '65 歲以上長者的另一項扣除額。',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: '州稅與地方稅（SALT）扣除額：上限、收入限制與實例',
    desc:  '2025 年 $40,000 上限與高收入時的遞減。',
  },
  {
    href: '/library/individual/premium-tax-credit-form-8962',
    cat:  'Individuals & Families',
    title: '保費抵稅額與 Form 8962：2025 與 2026 年的 Marketplace 健康保險',
    desc:  'Marketplace 健康保險、Form 8962 與預付款的償還。',
  },
  {
    href: '/library/individual/adoption-tax-credit',
    cat:  'Individuals & Families',
    title: '收養抵稅額：2025 與 2026 年上限與新的可退還部分',
    desc:  '收養費用的抵稅額，現在部分可退還。',
  },
]

export default function TaxLawChanges20252026ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '美國新稅法：2025 與 2026 年報稅有哪些改變 | AskLinTax 繁體中文',
      description: '逐年整理 2025 年聯邦新稅法對個人的影響：小費、加班費、汽車貸款與長者的新扣除額、SALT 上限，以及 2026 年開始的改變。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          一項在 <strong>2025 年 7 月 4 日</strong>生效的聯邦稅法（Public Law 119-21，IRS 現在也稱為 <strong>Working Families Tax Cuts</strong>）改變了多項個人稅務規定。許多改變從你的 <strong>2025 年稅表</strong>就開始適用，而不是 2026 年；其他改變則從 <strong>2026 年</strong>才開始。本文把兩者分開整理，並連結到主要改變的詳細指南。
        </p>
        <p>
          四項新扣除額 — 合格小費、合格加班費、汽車貸款利息與長者扣除額 — 在新的表格 <strong>Schedule 1-A</strong> 上申報。不論你使用標準扣除額或分項扣除都可以申請，IRS 說明它們適用於 <strong>2025 年至 2028 年</strong>。它們是有上限、會依收入遞減的扣除額，不是全面免稅。
        </p>

        <h2>從 2025 年稅表開始的改變</h2>
        <ArticleTable
          head={['改變', '2025 年的意義', '詳細說明']}
          rows={[
            ['標準扣除額', '單身或夫妻分開申報 $15,750；夫妻合併申報 $31,500；戶長 $23,625', '我需要報稅嗎？'],
            ['兒童抵稅額', '每名符合資格子女最高 $2,200；最多 $1,700 可退還；適用社會安全號碼規定', '兒童抵稅額指南'],
            ['合格小費扣除額', '最高 $25,000；修正後調整總收入（MAGI）超過 $150,000（合併申報 $300,000）時遞減', '小費免稅？'],
            ['合格加班費扣除額', '加班溢價最高 $12,500（合併申報 $25,000）；收入遞減門檻與小費相同', '加班費免稅？'],
            ['長者加強扣除額', '每位 65 歲以上的人最高 $6,000；MAGI 超過 $75,000（合併申報 $150,000）時遞減', '長者扣除額'],
            ['汽車貸款利息扣除額', '合格乘用車貸款利息最高 $10,000；MAGI 超過 $100,000（合併申報 $200,000）時遞減', '請見下方'],
            ['州稅與地方稅（SALT）上限', '分項扣除者 $40,000（夫妻分開申報 $20,000）；收入較高時遞減', 'SALT 扣除額'],
            ['Form 1099-K 申報', '支付平台與線上市集在付款超過 $20,000 且交易超過 200 筆時申報', 'Form 1099-K 指南'],
            ['領養抵稅額', '抵稅額中最多 $5,000 可以退還', 'IRS 領養抵稅額資訊'],
          ]}
        />
        <p>
          延伸閱讀：<a href="/zh-tw/library/individual/do-i-need-to-file/">我需要報稅嗎？</a> · <a href="/zh-tw/library/individual/child-tax-credit/">兒童抵稅額</a> · <a href="/zh-tw/library/individual/no-tax-on-tips/">小費免稅？</a> · <a href="/zh-tw/library/individual/no-tax-on-overtime/">加班費免稅？</a> · <a href="/zh-tw/library/individual/senior-deduction/">新的長者扣除額</a> · <a href="/zh-tw/library/individual/salt-deduction/">SALT 扣除額</a> · <a href="/zh-tw/library/individual/form-1099-k/">Form 1099-K</a>
        </p>

        <h2>從 2026 年才開始適用的改變</h2>
        <ArticleTable
          head={['改變', '2026 年的意義']}
          rows={[
            ['通膨調整', '標準扣除額：單身 $16,100；夫妻合併申報 $32,200；戶長 $24,150。兒童抵稅額仍為每名子女 $2,200，最多 $1,700 可退還。勞動所得抵稅額（EITC）最高 $8,231'],
            ['不分項扣除者的慈善捐款扣除', '捐給合格慈善機構的現金最多可扣除 $1,000（夫妻合併申報 $2,000）。有些捐款不適用，例如捐給捐贈人建議基金（donor-advised funds）'],
            ['兒童與受扶養人照顧抵稅額', '最高抵稅比率從合格費用的 35% 提高到 50%；費用上限仍為 $3,000（一人）與 $6,000（兩人以上）'],
            ['州稅與地方稅（SALT）上限', '分項扣除者：$40,400（夫妻分開申報 $20,200）；MAGI 超過 $505,000（夫妻分開申報 $252,500）時遞減，但不低於 $10,000（$5,000）'],
            ['1099-NEC 與 1099-MISC 申報', '許多付款的最低申報門檻從 $600 提高到 $2,000；有些付款（例如權利金）仍適用其他門檻'],
            ['Form W-2 新代碼', '雇主申報現金小費（box 12，代碼 TP）、合格加班費（box 12，代碼 TT），以及 Trump 帳戶提撥（box 12，代碼 TA）'],
            ['Trump 帳戶（Trump Accounts）', '提撥從 2026 年 7 月 4 日開始；IRS 說明每名符合資格的子女可獲得一次 $1,000 的聯邦提撥，每年提撥上限為 $5,000'],
          ]}
        />
        <p>
          小費、加班費、汽車貸款利息與長者的新扣除額在 2026 年繼續適用。2026 年的小費與加班費由雇主在 Form W-2 上申報，這會改變你找到金額的方式 — 請見小費與加班費指南。IRS 尚未公布最終版的 2026 年 Schedule 1-A 填寫說明。詳細說明：<a href="/zh-tw/library/individual/charitable-deduction-2026/">2026 年慈善捐款</a> · <a href="/zh-tw/library/individual/child-dependent-care-credit/">兒童與受扶養人照顧抵稅額</a> · <a href="/zh-tw/library/individual/trump-accounts/">Trump 帳戶</a>
        </p>

        <h2>四項新扣除額怎麼運作</h2>
        <p>
          四項扣除額都在 <strong>Schedule 1-A</strong> 上計算，並填入 Form 1040 第 13b 行。它們是在調整後總收入之後扣除，加在你的標準扣除額或分項扣除之外。每一項都從 Schedule 1-A 第 I 部分的修正後調整總收入（MAGI）開始計算。申請小費、加班費與長者扣除額時，已婚者必須夫妻合併申報，而且收到小費或加班費的人，或申請長者扣除額的人，需要有可用於工作的社會安全號碼（SSN）。汽車貸款利息扣除額的條件不同 — 請見下方。
        </p>
        <ArticleTable
          head={['扣除額', '上限', '開始遞減的門檻（MAGI）', '遞減方式']}
          rows={[
            ['合格小費', '每份稅表 $25,000', '$150,000（合併申報 $300,000）', '每超過整數 $1,000 減少 $100'],
            ['合格加班費', '$12,500（合併申報 $25,000）', '$150,000（合併申報 $300,000）', '每超過整數 $1,000 減少 $100'],
            ['汽車貸款利息', '$10,000', '$100,000（合併申報 $200,000）', '每超過 $1,000 或不足 $1,000 的部分減少 $200'],
            ['長者（65 歲以上）', '每位符合資格者 $6,000', '$75,000（合併申報 $150,000）', '超過門檻部分的 6%'],
          ]}
        />

        <h2>汽車貸款利息扣除額</h2>
        <p>
          你每年最多可以扣除 <strong>$10,000</strong> 用來購買<strong>個人使用</strong>合格車輛的貸款利息。根據 IRS，貸款必須在 2024 年 12 月 31 日之後成立、以車輛設定第一順位擔保（first lien），並用來購買由你首次使用的車輛。車輛必須是總重量評等低於 14,000 磅的轎車、廂型休旅車、廂型車、SUV、皮卡或機車，並在<strong>美國完成最終組裝</strong>。租賃付款不適用，你也必須在稅表上填寫車輛識別號碼（VIN）。詳細說明請見<a href="/zh-tw/library/individual/car-loan-interest-deduction/">汽車貸款利息扣除額指南</a>。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 只說明聯邦規定</div>
          <p>本文只說明聯邦所得稅。州稅規定可能與聯邦法律不同，請不要假設你所在的州也允許相同的扣除額。請查看你所在州稅務機關的說明。</p>
        </div>

        <h2>常見誤解</h2>
        <ul>
          <li><strong>「全部都從 2026 年開始。」</strong>許多改變，包括 Schedule 1-A 的四項扣除額與較高的 SALT 上限，都適用於 2025 年稅表。</li>
          <li><strong>「小費和加班費現在免稅了。」</strong>它們仍然是要繳社會安全稅與聯邦醫療保險稅的應稅收入；扣除額有上限，收入較高時也會遞減。</li>
          <li><strong>「要分項扣除才能申請新的扣除額。」</strong>Schedule 1-A 的扣除額在使用標準扣除額時也可以申請。只有 SALT 扣除額需要分項扣除。</li>
          <li><strong>「長者扣除額取代了 65 歲的額外標準扣除額。」</strong>它是加在原有額外標準扣除額之外的。</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/premium-tax-credit-form-8962.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'premium-tax-credit-form-8962',
  sourceHash:      '80003718ea08',
  id:            '106',
  title:         '保費抵稅額與 Form 8962：2025 與 2026 年的 Marketplace 健康保險',
  titleEn:       'Premium Tax Credit and Form 8962: Marketplace Health Insurance in 2025 and 2026',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2025 年 Form 8962 說明、Publication 974、IRS 說明 FS-2025-10 與 Rev. Proc. 2025-25，說明 2025 與 2026 稅務年度的聯邦保費抵稅額。本次審閱時，2026 年 Form 8962 及其說明仍是草稿，而財政部 2026 年 10 月關於移民資格與驗證的法規是擬議法規，尚未定案。本次無法直接審閱 P.L. 119-21 的條文，因此移民相關細節僅限於 IRS 出版品的說明。本文不涵蓋州的健康保險補助、雇主保險可負擔性測試的細節，也不涵蓋離婚與共用保單的保單分配規定',
  persona:       ['透過 Marketplace（HealthCare.gov 或州的交易所）投保的人', '自己買保險的自雇者與零工工作者', '年度中收入有變動的家庭', '合法居留的移民'],
  relatedJourney: ['金錢與福利', '準備報稅'],
  actionRequired: '如果你或家人透過 Marketplace 投保，請等收到 Form 1095-A，即使你原本不需要報稅，也要報稅並附上 Form 8962；年度中收入有變動時要通知 Marketplace — 2026 年溢領的預付款沒有償還上限。',
  sources: [
    { label: 'IRS — Form 8962 說明（2025）', url: 'https://www.irs.gov/instructions/i8962' },
    { label: 'IRS — Publication 974，保費抵稅額（PTC）', url: 'https://www.irs.gov/publications/p974' },
    { label: 'IRS — FS-2025-10，保費抵稅額問答（2025 年 12 月）', url: 'https://www.irs.gov/pub/taxpros/fs-2025-10.pdf' },
    { label: 'IRS — 保費抵稅額（PTC）概覽', url: 'https://www.irs.gov/credits-deductions/premium-tax-credit-ptc-overview' },
    { label: 'IRS — One, Big, Beautiful Bill 條文（保費抵稅額，第 71301–71305 條）', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Rev. Proc. 2025-25（2026 年適用百分比表）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-25.pdf' },
    { label: 'IRS — 2026 年 Form 8962 草稿（不可用於申報）', url: 'https://www.irs.gov/pub/irs-dft/f8962--dft.pdf' },
    { label: 'IRS — IR-2026-121，擬議的保費抵稅額法規（2026 年 10 月 14 日）', url: 'https://www.irs.gov/newsroom/treasury-and-irs-move-to-protect-health-care-benefits-for-eligible-americans' },
  ],
}

const FAQS = [
  {
    q: '如果我領過預付款，一定要報稅嗎？',
    a: '是的。如果你或你稅務家庭中的任何人領過保費抵稅額預付款（APTC），即使你的收入低於一般的報稅門檻，也必須申報聯邦稅表並附上 Form 8962。如果沒有申報，之後的年度可能無法再領 APTC。',
  },
  {
    q: 'Form 8962 的數字要從哪裡找？',
    a: '從 Form 1095-A，Marketplace 會在 2 月初之前寄出。上面列出每月投保保費、適用於你的次低價銀級保險（SLCSP）保費，以及已支付的 APTC。如果 SLCSP 金額空白或錯誤，Form 8962 說明會告訴你如何向 Marketplace 取得正確數字。',
  },
  {
    q: '我是直接向保險公司買保險，不是透過 Marketplace。可以申請這個抵稅額嗎？',
    a: '不行。這個抵稅額只適用於透過健康保險 Marketplace（HealthCare.gov 或州的交易所）投保的合格健康保險計畫。在 Marketplace 以外購買的保險，你不會收到 Form 1095-A。',
  },
  {
    q: '已婚分開申報，可以申請這個抵稅額嗎？',
    a: '通常不行。已婚者必須合併申報才能申請。例外是符合 Form 8962 說明條件的家庭暴力或配偶遺棄受害者；他們可以用已婚分開申報身分單獨報稅並申請。',
  },
  {
    q: '加強版保費抵稅額有延長到 2026 年嗎？',
    a: '本次審閱時可取得的 IRS 指引中沒有。FS-2025-10（2025 年 12 月）、IRS 的 PTC 概覽頁面（2026 年 7 月 28 日審閱）以及 2026 年 Form 8962 草稿，對 2026 年都適用 400% 的收入上限，並要求全額償還溢領的 APTC。如果國會修改法律，2026 年 Form 8962 的正式說明會反映。',
  },
  {
    q: '如果我還不起溢領的預付款怎麼辦？',
    a: '償還金額會加到你的稅款中，和其他欠稅一樣處理。FS-2025-10 指引你使用 IRS 的付款方式，例如分期付款計畫。按時報稅仍然很重要，因為逾期申報的罰款通常比逾期繳納的罰款高。',
  },
]

const RELATED = [
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '領過 APTC，即使收入低也必須報稅。',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: '美國新稅法：2025 與 2026 年報稅有哪些改變？',
    desc:  '2026 年變化背後的 2025 年新法。',
  },
  {
    href: '/library/individual/health-savings-account-hsa',
    cat:  'Individuals & Families',
    title: '健康儲蓄帳戶（HSA）：2025 與 2026 年上限與 2026 年新規定',
    desc:  '2026 年部分 Marketplace 保險可以搭配 HSA。',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: '報稅身分與戶長身分：2025 與 2026 年規定',
    desc:  '為什麼已婚者通常必須合併申報才能申請這個抵稅額。',
  },
]

export default function PremiumTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '保費抵稅額與 Form 8962：2025 與 2026 年的 Marketplace 健康保險 | AskLinTax 繁體中文',
      description: '保費抵稅額說明：Marketplace 保險、Form 1095-A、Form 8962、預付款、家庭收入、聯邦貧窮線、2025 年償還上限、2026 年全額償還與 400% 上限，以及移民資格。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>保費抵稅額（PTC）</strong>是可退還的聯邦抵稅額，幫助支付透過<strong>健康保險 Marketplace</strong> 購買的保險。大多數人是預先領取：Marketplace 依照你預估的收入，每月把<strong>預付款（APTC）</strong>直接付給保險公司。年度結束後，你用 <strong>Form 1095-A</strong>，在 <strong>Form 8962</strong> 上比較預付款和你實際符合的抵稅額。<strong>2025</strong> 年沒有收入上限，而且大多數人溢領的 APTC 有償還上限。<strong>2026</strong> 年，收入超過聯邦貧窮線 <strong>400%</strong> 就不能申請，而且<strong>沒有償還上限</strong>。
        </p>

        <h2>誰可以申請（2025）</h2>
        <p>2025 年 Form 8962 說明指出，必須以下條件全部符合才能申請：</p>
        <ul>
          <li><strong>Marketplace 保險：</strong>你或你稅務家庭中的成員，至少有一個月透過 Marketplace 投保合格健康保險計畫，而且保費在期限前已付清。</li>
          <li><strong>沒有其他保險可用：</strong>該月份此人不符合其他最低基本保障的資格，例如 Medicare、大多數 Medicaid，或可負擔的雇主保險。</li>
          <li><strong>不是受扶養人：</strong>沒有人可以把你列為受扶養人。</li>
          <li><strong>適用納稅人：</strong>家庭收入至少達到聯邦貧窮線的 100%（低於 100% 時有少數例外）；如果已婚，必須合併申報，除非適用家庭暴力或遺棄的例外。</li>
          <li><strong>合法居留：</strong>任何人不合法居留美國的期間，都不能申請抵稅額。</li>
        </ul>
        <p>
          低於貧窮線 100% 時，2025 年說明允許兩種情況申請：Marketplace 在投保時預估你的收入至少達到 100% 而且有支付 APTC；或是投保的人合法居留，並且因為移民身分而不符合 Medicaid 資格。
        </p>

        <h2>家庭收入、家庭人數與貧窮線</h2>
        <ul>
          <li><strong>稅務家庭人數：</strong>你、合併申報時的配偶，以及你申報的每一位受扶養人。</li>
          <li><strong>家庭收入：</strong>你的修正後 AGI，加上配偶以及每位必須報稅的受扶養人的修正後 AGI。</li>
          <li><strong>修正後 AGI：</strong>AGI 加上排除的海外勞務所得與住房金額、免稅利息，以及不課稅的社會安全福利。</li>
          <li><strong>聯邦貧窮線：</strong>2025 年 Form 8962 使用下表（本土 48 州與華盛頓特區；阿拉斯加和夏威夷的表比較高）。</li>
        </ul>
        <ArticleTable
          head={['家庭人數', '1', '2', '3', '4', '5', '6', '7', '8']}
          rows={[
            ['貧窮線，2025 年 Form 8962', '$15,060', '$20,440', '$25,820', '$31,200', '$36,580', '$41,960', '$47,340', '$52,720'],
          ]}
        />
        <p>
          超過 8 人時，每多一人加 $5,380。家庭收入除以這個金額，就是 Form 8962 第 5 行的百分比，用來決定你應自付的金額。
        </p>

        <h2>Form 8962 怎麼運作</h2>
        <ul>
          <li><strong>步驟 1 — 自付額：</strong>你的適用係數（從說明中的表格查）乘以家庭收入，就是你被預期要為基準保險支付的金額。</li>
          <li><strong>步驟 2 — 抵稅額：</strong>抵稅額是你實際保費，與 SLCSP 保費減去自付額，兩者中較小的金額，可按全年或逐月計算。</li>
          <li><strong>步驟 3 — 對帳：</strong>如果抵稅額大於 APTC，差額就是你可以拿到的淨抵稅額。如果 APTC 比較多，就有溢領的 APTC 要償還。</li>
        </ul>

        <h2>2025 與 2026 的比較</h2>
        <ArticleTable
          head={['規定', '2025（已定案）', '2026']}
          rows={[
            ['收入超過貧窮線 400%', '可以符合資格；自付額上限為收入的 8.5%', '不符合資格（FS-2025-10；2026 年 Form 8962 草稿第 6 行）'],
            ['最低自付比例', '貧窮線 150% 以下為收入的 0%', '低於 133% 為收入的 2.10%（Rev. Proc. 2025-25）'],
            ['最高自付比例', '收入的 8.5%', '300% 到 400% 為收入的 9.96%（Rev. Proc. 2025-25）'],
            ['溢領 APTC 的償還', '400% 以下有上限（見下表）', '沒有上限 — 全額償還溢領金額（FS-2025-10）'],
            ['貧窮線表與適用係數表', '已在 2025 年說明中公布', '尚未公布；2026 年說明尚未定案'],
          ]}
        />
        <p>
          2026 年那一欄來自兩項不同的變化。取消 400% 上限的暫時擴大措施只適用於 2021 到 2025 年，在本次審閱時可取得的 IRS 指引中沒有延長（IRS PTC 概覽）。另外，2025 年的稅法對 2025 年 12 月 31 日以後開始的稅務年度取消了償還上限（IRS「One, Big, Beautiful Bill」條文頁面；FS-2025-10）。2026 年 Form 8962 草稿在第 6 行詢問你是否在第 5 行填了 401% — 如果是，就不符合資格 — 並且把 2025 年表格上用來套用償還上限的第 28–29 行標為「保留供未來使用」。這些是草稿表格的細節，在正式表格發布前可能會改變。
        </p>

        <h2>償還溢領的預付款</h2>
        <ArticleTable
          head={['2025 年家庭收入（貧窮線的百分比）', '單身', '其他報稅身分']}
          rows={[
            ['低於 200%', '$375', '$750'],
            ['至少 200% 但低於 300%', '$975', '$1,950'],
            ['至少 300% 但低於 400%', '$1,625', '$3,250'],
            ['400% 以上', '沒有上限', '沒有上限'],
          ]}
        />
        <p>
          這些上限只適用於 2025 年（2025 年 Form 8962 說明的 Table 5）。對 2026 年及以後的年度，FS-2025-10 指出你必須全額償還 APTC 超過抵稅額的部分。償還金額會加到 Schedule 2 的稅款中。
        </p>

        <h2>移民與 2026–2027 年的資格</h2>
        <ul>
          <li><strong>2025：</strong>合法居留的人可以符合資格，包括收入低於貧窮線 100%、因移民身分而不能申請 Medicaid 的人。</li>
          <li><strong>2026：</strong>本次審閱時尚無 2026 年 Form 8962 的正式說明，本文不說明 2026 年收入低於貧窮線 100% 的合法居留者適用的規定。依賴 2025 年的規定之前，請先查看 2026 年的正式說明。</li>
          <li><strong>2027 年及以後（擬議）：</strong>IRS 新聞稿 IR-2026-121（2026 年 10 月 14 日）表示，擬議規定從 2027 年開始，會把抵稅額限於美國公民、美國國民和特定合法居留的非公民，並對 APTC 增加驗證要求。</li>
        </ul>
        <p>
          IRS 表示這些擬議規定是在實施 2025 年的稅法（第 71301–71305 條涵蓋保費抵稅額）。本文無法直接審閱法條全文，因此不提供法條確切的生效日期，也不列出哪些移民身分類別會符合資格。2026 年 10 月的法規是<strong>擬議法規，尚未定案</strong>，在公眾意見後可能修改。
        </p>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Maya（2025）', 'Ken（2026）']}
          rows={[
            ['報稅身分與家庭人數', '單身，1 人', '單身，1 人'],
            ['家庭收入', '$45,180（$15,060 的 300%）', '超過 2026 年貧窮線的 400%'],
            ['適用係數／自付額', '0.0600 × $45,180 = $2,711', '不符合資格'],
            ['全年 SLCSP 保費（Form 1095-A）', '$7,200', '—'],
            ['全年投保保費', '$6,000', '—'],
            ['保費抵稅額', '$6,000 與 $7,200 − $2,711 = $4,489 中較小者', '$0'],
            ['年度中已支付的 APTC', '$5,000', '$3,000'],
            ['溢領 APTC／償還金額', '$511（低於 $1,625 上限）', '$3,000（2026 年沒有上限）'],
          ]}
        />
        <p>
          Maya 的數字使用 2025 年的貧窮線與 2025 年說明的 Table 2。Ken 的範例沒有使用 2026 年貧窮線的金額，因為本次審閱時 2026 年的表尚未公布；重點是收入超過 400% 時，$3,000 必須全部償還。兩個範例都只是說明，並假設全年投保、沒有其他保險可用，也沒有共用保單。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>因為收入低就不報稅</strong> — 領過 APTC 就必須報稅並附上 Form 8962。</li>
          <li><strong>還沒收到 Form 1095-A 就報稅</strong>，或用錯 SLCSP 金額。</li>
          <li><strong>漏掉計入修正後 AGI 的收入</strong>，例如不課稅的社會安全福利，或必須報稅的受扶養人的收入。</li>
          <li><strong>年度中加薪或換新工作沒有通知</strong> Marketplace — 2026 年每一元溢領的 APTC 都必須償還。</li>
          <li><strong>已婚卻分開申報</strong>，而且不符合家庭暴力或遺棄的例外。</li>
          <li><strong>以為 2025 年的規定會延續到 2026 年</strong>，尤其是償還上限和沒有收入上限這兩點。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>共用保單、年度中離婚或結婚、自雇健康保險扣除、雇主提供的保險，以及混合身分的移民家庭，都可能改變計算方式。州的補助是另外的制度，本文不涵蓋。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

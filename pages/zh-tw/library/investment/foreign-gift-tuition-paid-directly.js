import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/foreign-gift-tuition-paid-directly.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'foreign-gift-tuition-paid-directly',
  sourceHash:      '67141895e89f',
  id:            '34',
  title:         '海外父母直接付我的學費，要報 Form 3520 嗎？',
  titleEn:       'My parents paid my tuition directly — do I report a foreign gift?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋父母為非居民外國人、由父母支付學校費用的美國公民與居民外國人。說明合格學費與醫療費用在 Form 3520 Part IV 上如何處理。不涵蓋教育抵稅額、獎學金、529 計畫，或贈與人所在國家的稅務規定',
  persona:       ['父母在海外的大學生與研究生', '已成為美國稅務居民的學生', '子女是美國稅務居民、在美國讀書的家長', '替在美國的家人支付醫療費用的家庭'],
  relatedJourney: ['跨境財務', '剛到美國'],
  actionRequired: '把父母直接付給學校的學費，和其他所有款項（匯給你的錢、住宿、書籍、生活費）分開。只有直接付給合格學校的學費，才不計入 Form 3520。其他所有款項都要和你當年收到的其他贈與加總，再與 $100,000 比較。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 709 填寫說明（2025），教育與醫療排除', url: 'https://www.irs.gov/instructions/i709' },
  ],
}

const FAQS = [
  {
    q: '學費先匯進我自己的銀行帳戶，我當天就付給學校了。這樣可以排除嗎？',
    a: '不行。例外只適用於代你直接付給學校的款項。匯給你的錢就是給你的贈與，即使你馬上拿去繳學費也一樣。這筆錢要計入你當年的 $100,000 親屬合計。',
  },
  {
    q: '我父母也把宿舍費和餐費直接付給大學，這也可以排除嗎？',
    a: '不行。只有學費符合資格。依照 Form 3520 所援引的教育排除規定，書籍、文具、住宿與餐費（room and board）及類似費用都不在範圍內，即使是付給學校也一樣。這些款項都是給你的贈與。',
  },
  {
    q: '語言學校、高中或程式設計訓練營也適用嗎？',
    a: '款項必須付給合格的教育機構 — 也就是通常有固定的師資與課程，並且在其進行教學活動的地點通常有固定註冊學生的機構。很多學校都符合，但有些課程可能不符合。不確定時，請找人確認。',
  },
  {
    q: '醫療費用也一樣嗎？',
    a: '是的，同樣範圍很窄。直接付給提供醫療照護的人或機構的款項（以及支付醫療保險的款項），可以是合格移轉（qualified transfer）。匯給你、再由你支付醫療費用的錢，是給你的贈與。之後由保險理賠的部分，在理賠金額範圍內不適用。',
  },
  {
    q: '學費既然排除了，還需要申報什麼嗎？',
    a: '直接付給學校的合格學費，在 Form 3520 上不算海外贈與，所以不計入也不列在 Part IV。但還是要保留學校的付款紀錄 — 它們可以說明你為什麼沒有把這筆錢算進去。',
  },
  {
    q: '我是國際學生，也是非居民外國人。這些規定適用於我嗎？',
    a: 'Form 3520 Part IV 由美國人（U.S. person）申報。如果你整年都是非居民外國人，Part IV 通常不適用於你。很多學生在幾年後會成為稅務居民，所以每年都要確認你的身分。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '關於海外贈與、是否要繳稅與 Form 3520 的基礎指南。',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    desc:  '生活費、房租與其他經濟支援：一年下來怎麼加總。',
  },
  {
    href: '/library/individual/substantial-presence-test',
    cat:  'Individuals & Families',
    title: '實質居留測試：如何計算你在美國的天數',
    desc:  '學生與豁免個人的規定：你什麼時候成為美國稅務居民？',
  },
  {
    href: '/library/investment/foreign-gift-over-100000',
    cat:  'Investments & Foreign Accounts',
    title: '海外父母匯超過 10 萬美元給我，要報 Form 3520 嗎？',
    desc:  '總支援金額超過 $100,000 時的直接答案。',
  },
]

export default function ForeignGiftTuitionZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '海外父母直接付學費，算海外贈與嗎？ | AskLinTax 繁體中文',
      description: '海外父母直接付給學校的學費，在 Form 3520 上不算海外贈與；但匯給你的錢、住宿餐費與書籍都算。說明這個範圍很窄的學費與醫療例外。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          如果你身為非居民外國人的父母把<strong>學費直接付給合格的學校</strong>，這筆款項在 Form 3520 上<strong>不算海外贈與</strong>。你不需要把它計入 $100,000 門檻，也不需要在 Part IV 列出。
        </p>
        <p>
          這個例外範圍很窄。它<strong>不包括</strong>：
        </p>
        <ul>
          <li>父母匯<strong>給你</strong>的錢，即使你拿去繳學費</li>
          <li>書籍、文具、住宿與餐費，以及類似的非學費支出 — 即使是付給學校（依同樣的規則，房租與一般生活費也不是學費）</li>
          <li>付給教育機構本身以外任何人的款項</li>
        </ul>
        <p>
          例外以外的所有款項，都是給你的贈與，要和你當年的其他贈與加總。
        </p>

        <h2>這條規定從哪裡來</h2>
        <p>
          Form 3520 填寫說明指出，給美國人的贈與不包括<strong>代該美國人支付的合格學費或醫療費用</strong>。在稅法中，海外贈與申報規定（section 6039F）借用了贈與稅規定（section 2503(e)）中「合格移轉」（qualified transfer）的定義。IRS 的贈與稅填寫說明這樣解釋這個定義：
        </p>
        <ul>
          <li>款項必須<strong>直接付給合格的教育機構</strong>，而且必須是<strong>學費</strong>。</li>
          <li><strong>書籍、文具、住宿與餐費</strong>，以及其他不屬於直接學費的類似費用，不適用排除。</li>
          <li>合格的教育機構，是通常有固定的師資與課程，並且在其進行教學活動的地點通常有固定註冊學生的機構。</li>
        </ul>

        <ArticleTable
          head={['父母付了什麼', '在 Form 3520 上算海外贈與嗎？']}
          rows={[
            ['學費，直接電匯給你的美國大學', '不算 — 合格學費'],
            ['學費匯給你，再由你付給學校', '算 — 給你的贈與'],
            ['宿舍與餐費，直接付給大學', '算 — 住宿與餐費不是學費'],
            ['教科書與筆電', '算 — 書籍與文具不在排除範圍內（把筆電視為同類，是我們依該規則所做的判斷）'],
            ['你的公寓房租，付給房東', '算 — 這是我們依規則所做的判斷：房租不是學費，也不是付給學校'],
            ['醫院帳單，直接付給醫院', '不算 — 合格醫療費用（保險理賠的部分除外）'],
          ]}
        />

        <h2>實際例子</h2>
        <p>
          Chen 是美國稅務居民，在波士頓念研究所。2025 年，她在廣州的父母：
        </p>
        <ul>
          <li>直接電匯 <strong>$55,000</strong> 給她的大學作為學費，</li>
          <li>付給大學 <strong>$18,000</strong> 作為校內住宿與餐費，</li>
          <li>匯 <strong>$40,000</strong> 到 Chen 的美國帳戶作為生活費。</li>
        </ul>
        <p>
          $55,000 的學費排除。住宿費與匯給 Chen 的錢是贈與：$18,000 + $40,000 = <strong>$58,000</strong>。沒有超過 $100,000，所以 Chen 不用申報 2025 年的 Form 3520 — 除非父母或其親屬給的其他贈與讓總額超過門檻。
        </p>
        <p>
          現在改一個事實：她的父母把全部 $113,000 都匯給 Chen，由她自己付給學校。每一塊錢都是給她的贈與，親屬合計超過 $100,000，需要申報 Form 3520 Part IV。同一個家庭、同一間學校，申報結果卻不同 — 差別只在於錢付給了<strong>誰</strong>。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 如果父母能直接付給學校，紀錄會更清楚</div>
          <p>學費直接付給學校，就不會計入 Form 3520 的總額，也會留下清楚的紀錄。可以問學校的出納處（bursar office）國際電匯如何入帳到你的學生帳戶，並保留收據。</p>
        </div>

        <h2>不要把例外擴大解釋</h2>
        <p>
          IRS 指引並沒有逐一列出以下情況。它們是我們依照上面兩條規則 — 直接付給學校、而且只限學費 — 所做的判斷：
        </p>
        <ul>
          <li><strong>不是所有「教育費用」。</strong>只有學費符合資格。和學費一起收取的其他費用，可能需要仔細確認。</li>
          <li><strong>不包括補償。</strong>把你已經付掉的學費還給你，是給你的贈與。</li>
          <li><strong>不包括你能自由使用的預付帳戶。</strong>存進你自己帳戶、或你可以自由動用的帳戶的錢，是給你的贈與。</li>
          <li><strong>醫療也一樣窄。</strong>款項必須付給醫療提供者（或用於醫療保險）。之後由保險理賠的金額，在理賠範圍內不適用。</li>
        </ul>

        <h2>學費不會改變繳稅的答案 — 只影響申報的計算</h2>
        <p>
          不論是直接支付或匯給你，父母的真正贈與通常都不是你的應稅收入。學費例外影響的是<strong>申報</strong>：它讓直接支付的學費不計入 Form 3520 的總額。教育抵稅額、獎學金與其他學校相關的稅務規定，是另外的主題。
        </p>

        <h2>要保留的紀錄</h2>
        <ul>
          <li>學校的對帳單或收據，顯示款項來自你的父母並用於學費</li>
          <li>把學費和住宿、餐費、其他費用分開的明細</li>
          <li>父母匯給你的每一筆款項的電匯紀錄</li>
          <li>以美元計算的、學費以外贈與的年度合計</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          如果學校把學費和其他費用合併收取、某個課程可能不是合格的教育機構、款項來自公司或信託，或你不確定自己當年是不是美國居民（請見<a href="/zh-tw/library/individual/tax-residency/">我是美國稅務居民嗎？</a>），請諮詢稅務專業人士。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

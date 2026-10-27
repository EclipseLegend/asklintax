import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/scholarship-fellowship-tax.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'scholarship-fellowship-tax',
  sourceHash:      '2cc7cc1ea7cf',
  id:            '119',
  title:         '獎學金與研究補助：哪些要課稅',
  titleEn:       'Scholarships and Fellowships: What Is Taxable',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 970（2025）、Publication 519（2025）與 2025 年 Form 1040 說明，說明獎學金與研究補助何時免稅、何時要課稅、何時屬於服務報酬，以及 2025 年如何申報。行號是 2025 年稅表的行號。本文不涵蓋合格學費減免、海外留學規定（Publication 54），也不詳細說明個別稅務協定',
  persona:       ['領獎學金的大學生與研究生', '研究生助教與研究助理', '受扶養學生的父母', '持 F、J、M 或 Q 簽證的國際學生'],
  relatedJourney: ['支付大學學費', '剛到美國'],
  actionRequired: '把你當年的獎學金或研究補助，和學費、必要費用與課程必要教材做比較。用在食宿、交通或其他非合格費用的金額 — 以及任何教學或研究的報酬 — 通常要課稅。即使沒有收到 Form W-2，也要申報。',
  sources: [
    { label: 'IRS — Publication 970（2025），教育稅務優惠，第 1 章', url: 'https://www.irs.gov/pub/irs-pdf/p970.pdf' },
    { label: 'IRS — Publication 519（2025），外國人美國稅務指南', url: 'https://www.irs.gov/pub/irs-pdf/p519.pdf' },
    { label: 'IRS — 2025 年 Form 1040 說明', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
  ],
}

const FAQS = [
  {
    q: '我的獎學金要課稅嗎？',
    a: '只有當你是合格教育機構的學位候選人（degree candidate），而且只在用於學費與必要費用、以及課程要求的書籍、用品與設備的範圍內，才免稅。用在食宿、交通或其他費用的金額要課稅，作為教學、研究或其他必要服務報酬的部分也要課稅。',
  },
  {
    q: '我是研究生助教，津貼要課稅嗎？',
    a: '要。作為獲得補助條件的必要教學或研究報酬部分，通常要課稅，即使每個學位候選人都必須做同樣的工作也一樣。這部分通常會列在 Form W-2 上。只有少數計畫例外，例如國家衛生服務團獎學金計畫（National Health Service Corps Scholarship Program）與軍隊醫療專業獎學金計畫（Armed Forces Health Professions Scholarship Program）。',
  },
  {
    q: '要課稅的獎學金要申報在哪裡？',
    a: '2025 年 Form 1040：Form W-2 第 1 欄列出的應稅金額包含在第 1a 行，其他應稅金額申報在 Schedule 1 第 8r 行。Form 1040-NR：應稅金額申報在 Schedule 1 第 8r 行；通常申報 Form 1042-S 第 2 欄的金額。',
  },
  {
    q: '如果獎學金完全免稅，我需要報稅嗎？',
    a: '如果你唯一的收入是完全免稅的獎學金或研究補助，就不需要報稅，也不用申報。如果有任何部分要課稅，請確認報稅門檻 — 對受扶養人來說，應稅部分算作勞動所得（earned income）。',
  },
  {
    q: '可以把部分獎學金算進收入，來拿更多教育抵稅額嗎？',
    a: '有時可以。Publication 970 說明，學生可以選擇把原本免稅的獎學金或 Pell 助學金計入收入，視為支付食宿等非合格費用。這樣可以把學費留給美國機會抵稅額（AOTC）使用，但多出來的收入也可能增加稅額或減少其他抵稅額，所以兩種做法都要比較。',
  },
  {
    q: '我是國際學生，我的獎學金怎麼課稅？',
    a: '同樣適用學位候選人與合格費用的規定。對持 F、J、M 或 Q 簽證的非居民外國人來說，美國來源獎學金中不屬於服務報酬的應稅部分，通常按 14%（或較低的協定稅率）預扣，並列在 Form 1042-S 上。其他情況的稅率不同 — 例如某些非學位補助按 30%（或較低的協定稅率），服務報酬則像薪資一樣預扣。有些稅務協定免除獎學金的稅。在美國境外進行活動的補助，不屬於美國來源所得。',
  },
]

const RELATED = [
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: '教育抵稅額：AOTC 與 Lifetime Learning Credit 怎麼選？',
    desc:  '獎學金如何影響教育抵稅額。',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: '我是美國稅務居民嗎？',
    desc:  '你是以居民還是非居民外國人身分報稅。',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '學生與受扶養人的報稅門檻。',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: '兒童稅（Kiddie Tax）：孩子的投資所得何時按父母稅率課稅',
    desc:  '兒童與年輕學生的其他稅務規定。',
  },
]

export default function ScholarshipFellowshipTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '獎學金與研究補助：哪些要課稅 | AskLinTax 繁體中文',
      description: '獎學金與研究補助何時免稅、何時要課稅、何時屬於服務報酬：合格費用、食宿、助教與研究助理津貼、Form W-2、1098-T 與 1042-S、教育抵稅額，以及國際學生。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          獎學金或研究補助只有在你是<strong>學位候選人</strong>、而且只在<strong>合格教育費用</strong>的範圍內 — 學費、必要費用與課程必要教材 — 才<strong>免稅</strong>。用在<strong>食宿或交通</strong>的錢屬於<strong>應稅獎學金收入</strong>。作為<strong>教學、研究或其他必要服務</strong>報酬的錢屬於<strong>服務報酬</strong>，即使是學程規定的工作，通常也要課稅。
        </p>

        <h2>三種獎學金的錢</h2>
        <ArticleTable
          head={['', '免稅獎學金', '應稅獎學金收入', '服務報酬']}
          rows={[
            ['用來支付什麼', '註冊或就讀所需的學費與費用；課程中所有學生都必須具備的書籍、用品與設備', '食宿、交通、研究、文書協助，以及註冊或就讀不需要的設備', '作為獲得補助條件的教學、研究或其他服務'],
            ['誰可以排除在收入外', '合格教育機構的學位候選人', '沒有人 — 而且非學位候選人必須把整筆獎學金計入收入', '通常沒有人，即使所有學位候選人都必須提供這些服務'],
            ['通常如何通報給你', '學校的 Form 1098-T', '常常沒有 Form W-2；你仍然要申報', 'Form W-2（部分非居民是 Form 1042-S）'],
          ]}
        />

        <h2>誰是學位候選人</h2>
        <ul>
          <li>就讀中小學，或在大學攻讀學位的學生。</li>
          <li>就讀經認證機構的學生，該機構提供可完整抵免學士以上學位學分的課程，或為特定職業就業做準備的訓練。</li>
          <li>如果你<strong>不是</strong>學位候選人，整筆獎學金或研究補助都要課稅。</li>
        </ul>

        <h2>免稅的其他條件</h2>
        <ul>
          <li>補助不能指定用於其他用途，例如食宿，條款也不能限制你不得用於合格費用。</li>
          <li>國家衛生服務團獎學金計畫、軍隊醫療專業獎學金與財務協助計畫，以及工讀學院（work college）的綜合學生工讀服務計畫所發的金額，不適用服務報酬的規定。</li>
          <li>要求未來提供服務、不履行會有重大處罰的獎學金，可能在收到的年度全額作為服務報酬課稅。</li>
          <li>Pell 助學金與其他 Title IV 需求型助學金視為獎學金；Fulbright 補助通常視為獎學金或研究補助。</li>
          <li>退伍軍人事務部（VA）的教育福利免稅，不用申報為收入。</li>
        </ul>

        <h2>2025 年如何申報</h2>
        <ArticleTable
          head={['稅表', 'Form W-2 第 1 欄的應稅金額', '其他應稅金額']}
          rows={[
            ['Form 1040 或 1040-SR', '包含在第 1a 行', 'Schedule 1 第 8r 行'],
            ['Form 1040-NR', 'Schedule 1 第 8r 行', 'Schedule 1 第 8r 行 — 通常是 Form 1042-S 第 2 欄的金額'],
          ]}
        />
        <ul>
          <li>不論有沒有收到 Form W-2，都必須申報應稅金額。</li>
          <li>Form 1098-T 列的是學校的金額，可能和你實際支付或可以使用的金額不同。請用 Publication 970 的 Worksheet 1-1 計算免稅與應稅部分。</li>
          <li>就受扶養人的報稅門檻與標準扣除額而言，應稅的獎學金與研究補助算作勞動所得。</li>
        </ul>

        <h2>教育抵稅額與受扶養學生</h2>
        <ul>
          <li><strong>不能重複享受：</strong>免稅獎學金會減少你可以用來計算美國機會抵稅額或終身學習抵稅額的費用。</li>
          <li><strong>選擇計入收入：</strong>學生可以把部分原本免稅的獎學金計入收入，視為支付食宿。Publication 970 說，只有在合格費用減去獎學金後少於 $4,000 時，這樣才可能增加美國機會抵稅額，而且多出來的收入也可能讓你多繳的比省下的還多。</li>
          <li><strong>誰申報抵稅額：</strong>如果父母把學生列為受扶養人，只有父母可以就這名學生的費用申報美國機會抵稅額 — 但如果有應稅的獎學金收入，那是學生的收入。</li>
        </ul>

        <h2>國際學生與非居民外國人</h2>
        <ul>
          <li><strong>相同的排除規定：</strong>學位候選人可以把來自美國來源的合格獎學金排除在收入外。</li>
          <li><strong>預扣稅：</strong>持 F、J、M 或 Q 簽證者，美國來源獎學金中不屬於服務報酬的應稅部分，通常按 14%（或較低的協定稅率）預扣；非學位候選人且補助不符合某些條件時，按 30%（或較低的協定稅率）預扣。服務報酬則像薪資一樣預扣。</li>
          <li><strong>Form 1042-S</strong> 列出應稅總額、稅率與預扣稅額。用它來申報 Form 1040-NR。</li>
          <li><strong>來源：</strong>獎學金通常依付款人的居住地判斷來源；在美國境外進行活動的補助，不屬於美國來源所得。</li>
          <li><strong>稅務協定</strong>可能免除獎學金或研究補助的稅，但有條件與年限。請參閱 Publication 901 與 IRS 稅務協定表。</li>
          <li><strong>教育抵稅額：</strong>年度中任何期間是非居民外國人，通常不能申報，只有少數例外，例如選擇和美國公民或居民配偶合併申報。</li>
        </ul>

        <h2>範例（2025 年）</h2>
        <ArticleTable
          head={['', 'Maya', 'Daniel', 'Lin']}
          rows={[
            ['情況', '大學部學位候選人；獎學金 $20,000；學費與必要費用 $14,000，必要書籍 $1,000，食宿 $5,000', '博士候選人；擔任助教的必要教學報酬 $10,000，另外有一筆沒有服務要求的生活津貼 $12,000', '持 F-1 簽證的研究生，非居民外國人；美國大學的獎學金支付學費與住宿'],
            ['免稅', '$15,000', '這些金額都不免稅（本例不含學費）', '用於學費與必要費用的部分，如果 Lin 是學位候選人'],
            ['應稅', '用於食宿的 $5,000 — Schedule 1 第 8r 行', '$10,000 為薪資（Form W-2，第 1a 行）；$12,000 津貼 — Schedule 1 第 8r 行', '住宿部分，依 Form 1042-S 申報在 Form 1040-NR 上，除非稅務協定免稅'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 看清楚你自己的補助條款</div>
          <p>某筆金額是否免稅，取決於補助的條款和錢實際怎麼用。請保留補助通知書、Form 1098-T 與必要書籍及用品的收據；如果補助同時包含服務與助學金，請詢問學校或稅務專業人士。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

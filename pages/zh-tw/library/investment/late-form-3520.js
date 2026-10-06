import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/late-form-3520.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'late-form-3520',
  sourceHash:      '315848ff520c',
  id:            '37',
  title:         'Form 3520 忘記報或晚報，現在怎麼辦？',
  titleEn:       'I filed Form 3520 late — what should I do now?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '涵蓋漏報或晚報 Form 3520 Part IV（來自外國人的贈與或遺產）的美國公民與居民外國人。海外信託申報、有未申報收入的年度，以及已在 IRS 查核中的案件，需要個別的專業建議。本指南不預測是否會被罰款或獲得免罰',
  persona:       ['最近才知道有 Form 3520 的人', '以前年度收到海外大額贈與或遺產的人', '收到 IRS 關於 Form 3520 罰款通知的人', '協助家人補報的家屬'],
  relatedJourney: ['跨境財務'],
  actionRequired: '不要忽視漏報的 Form 3520。找出每一個有應申報海外贈與的年度、整理紀錄，並考慮補報時附上書面的合理原因（reasonable cause）說明。如果 IRS 已經就此聯絡你，或同時有未申報的收入，請在申報前先尋求專業協助。',
  sources: [
    { label: 'IRS — Form 3520 填寫說明（Rev. December 2025），罰款與合理原因', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — 逾期國際資訊申報表補交程序（Delinquent international information return submission procedures）', url: 'https://www.irs.gov/individuals/international-taxpayers/delinquent-international-information-return-submission-procedures' },
    { label: 'IRS — 來自外國人的贈與（Gifts from foreign person）', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Internal Revenue Manual 20.1.9 — 國際罰款（International Penalties）', url: 'https://www.irs.gov/irm/part20/irm_20-001-009' },
  ],
}

const FAQS = [
  {
    q: '晚報 Form 3520，一定會被罰款嗎？',
    a: '不一定，而且沒有人能保證結果。漏報海外贈與的罰款，可能是每月罰贈與金額的 5%，最高 25%；但如果未申報是出於合理原因、而非故意疏忽，就不罰。你的情況是否構成合理原因，由 IRS 依事實與情況判斷。',
  },
  {
    q: '「我不知道有 Form 3520」算合理原因嗎？',
    a: '這是很常見的說明，但不會自動被接受 — 合理原因是依事實與情況判斷。作為實務建議（不是 IRS 的清單），說明你為遵循規定做了什麼、是否依賴專業人士，以及知道問題後多快修正，會有幫助。請如實寫下實際發生的事。',
  },
  {
    q: '我可以把舊的贈與放進今年的 Form 3520，以前年度就不提嗎？',
    a: '不行。每一個有應申報海外贈與的年度，都需要該年度自己的 Form 3520。把舊贈與併入今年的表格，會讓兩個年度的資料都不正確。',
  },
  {
    q: '我收到 IRS 的通知，說要對 Form 3520 罰款。現在怎麼辦？',
    a: '仔細閱讀通知、記下回覆期限，並盡快找稅務專業人士討論。一旦 IRS 已經就逾期表格聯絡你，本指南說明的逾期補交方式通常就不再適用，你的回覆選項取決於通知內容。',
  },
  {
    q: '這筆贈與明明免稅，為什麼罰款這麼高？',
    a: '因為罰款是依未申報的贈與金額計算，而不是依應繳的稅。所以即使贈與本身通常不算收入，大額贈與晚報 Form 3520 仍然需要謹慎處理。',
  },
  {
    q: '合理原因說明需要特定的寫法嗎？',
    a: 'IRS 表示，合理原因說明必須是書面的，並包含以「Under penalties of perjury, I declare…」（在偽證罰則下，我聲明……）開頭的聲明。IRS 也要求附上說明時，在 Form 3520 第一頁最上方寫上「Reasonable Cause Statement attached」。',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '海外贈與：父母從海外匯來的錢要繳稅嗎？',
    desc:  '基礎指南：什麼算海外贈與、什麼時候需要申報。',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520：申報大額海外贈與',
    desc:  '如何填寫 Part IV，以及要寄到哪裡。',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: '父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？',
    desc:  '補報之前，先確認哪些年度真的超過 $100,000。',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如果罰款通知已經寄來，先從看懂通知開始。',
  },
]

export default function LateForm3520ZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'Form 3520 漏報或晚報：海外贈與現在該怎麼辦 | AskLinTax 繁體中文',
      description: '忘了為海外贈與或遺產申報 Form 3520？說明逾期罰款怎麼算、合理原因（reasonable cause）的意思、IRS 逾期補交程序如何運作，以及什麼時候該找專業協助。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>直接的答案</h2>
        <p>
          如果你收到應申報的海外贈與或遺產，卻漏報了 Form 3520，<strong>不要置之不理</strong>。對於 IRS 尚未聯絡的人，常見的做法是透過一般申報程序，為每個漏報的年度<strong>補報 Form 3520</strong>，並附上書面的<strong>合理原因說明</strong>（reasonable cause statement），解釋為什麼晚報。
        </p>
        <p>
          可能會被罰款，也可能不會。沒有人能事先保證免罰 — 但不補報，問題就一直存在。
        </p>

        <h2>首先，確認是不是真的需要申報</h2>
        <p>
          在擔心罰款之前，先逐年確認：
        </p>
        <ul>
          <li>那一年你是<strong>美國公民或居民</strong>嗎？</li>
          <li>那一年來自某位非居民外國人或海外遺產的贈與與遺產，<strong>加上</strong>與他們有親屬關係的外國人給的部分，合計是否<strong>超過 $100,000</strong>？（或者，來自外國公司的所謂贈與，是否超過低很多的公司門檻？）</li>
          <li>這真的是贈與嗎 — 不是借款、不是你自己的錢、不是直接付給學校的學費？</li>
        </ul>
        <p>
          很多人發現自己其實沒有超過門檻，或有些匯款根本不計入。請見<a href="/zh-tw/library/investment/form-3520-multiple-gifts/">父母分多次匯款，Form 3520 的 10 萬美元門檻怎麼算？</a>
        </p>

        <h2>罰款怎麼算</h2>
        <ArticleTable
          head={['Form 3520 的哪一部分', '未按時申報的罰款（依 Form 3520 填寫說明）']}
          rows={[
            ['Part IV — 海外贈與與遺產', '未申報期間每月罰海外贈與金額的 5%，合計最高 25%'],
            ['Part III — 海外信託分配', '$10,000 或分配總價值的 35%，取較高者'],
          ]}
        />
        <p>
          就海外贈與而言，IRS 也可能自行<strong>判定這筆錢的所得稅後果</strong> — 換句話說，可能不接受它是贈與。兩個部分都一樣：如果未申報是出於合理原因、而非故意疏忽，<strong>就不罰</strong>。（填寫說明在討論海外信託罰款時另外指出，外國法律對揭露資訊的處罰不算合理原因；本指南不把這一點延伸適用到海外贈與的罰款。）
        </p>

        <h2>「合理原因」是什麼意思 — 謹慎地說</h2>
        <p>
          合理原因是依每個案件的事實與情況判斷。IRS 指引要求說明必須是書面的，並積極、完整地陳述你所依據的所有事實。以下是實務建議（不是 IRS 的規定）：沒有什麼神奇的用語，而只寫「我不知道」本身可能不夠。
        </p>
        <p>
          實務建議，不是 IRS 的清單 — 有用的說明通常會就事實交代：
        </p>
        <ul>
          <li>你收到了什麼、來自誰、什麼時候</li>
          <li>為什麼沒有申報（例如你當時的理解，以及是否依賴報稅人員）</li>
          <li>你什麼時候、怎麼知道這項申報義務</li>
          <li>知道之後你做了什麼、多快採取行動</li>
        </ul>

        <h2>IRS 尚未聯絡你時如何補報</h2>
        <p>
          IRS 的<strong>逾期國際資訊申報表補交程序</strong>（delinquent international information return submission procedures），說明了未在民事查核或刑事調查中、且 IRS 尚未就這些逾期申報表聯絡過的納稅人可以採取的做法：
        </p>
        <ol>
          <li>透過一般申報程序，為每個漏報的年度補報 Form 3520（Form 3520 與稅表分開申報）。</li>
          <li>為每一份主張合理原因的逾期表格，附上合理原因說明。</li>
          <li>在說明中加入「Under penalties of perjury, I declare…」的聲明。</li>
          <li>在 Form 3520 第一頁最上方寫上<strong>「Reasonable Cause Statement attached」</strong>。</li>
        </ol>
        <p>
          IRS 表示，附在 Form 3520 與 3520-A 上的合理原因說明，會在核定罰款之前納入考量。這是審查，不是免罰的保證。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 這個簡單做法不夠用的時候</div>
          <p>如果 IRS 已經聯絡你、你正在接受查核、涉及海外信託，或同時有<strong>未申報的收入</strong>（例如贈與的錢放在海外產生的利息從未申報），情況就不同了。在申報任何東西之前，請先找 CPA 或稅務律師討論。</p>
        </div>

        <h2>實際例子</h2>
        <p>
          2023 年，美國公民 Jason 從住在香港、身為非居民外國人的父母那裡收到 $250,000。他不知道有 Form 3520。2026 年，朋友提起這件事。Jason 確認 2023 年超過 $100,000，2024 和 2025 年則沒有。這筆錢一直放在他的美國帳戶，利息每年都有申報。他還沒有收到 IRS 的任何聯絡。
        </p>
        <p>
          Jason 可能的做法：準備 2023 年的 Form 3520 Part IV 列出這些贈與，附上一份陳述事實、包含偽證罰則聲明的合理原因說明，依上述方式在第一頁標註，寄出並保留郵寄證明。因為 $250,000 的潛在罰款最高可達 $62,500（25%），他請專業人士先看過說明。是否罰款由 IRS 決定。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li>等 IRS 自己發現</li>
          <li>把舊的贈與報在今年的表格，而不是收到的那一年</li>
          <li>補報時沒有附合理原因說明</li>
          <li>在說明中誇大或編造事實 — 它是在偽證罰則下簽署的</li>
          <li>補了 Form 3520，卻忽略同一年度相關的 FBAR 或未申報的利息</li>
        </ul>

        <h2>要整理的紀錄</h2>
        <ul>
          <li>每一筆贈與的銀行與電匯紀錄，按年度整理</li>
          <li>證明這筆錢是贈與的證據（贈與人的訊息或信件）</li>
          <li>贈與人身分的證明（不是美國公民或居民）</li>
          <li>相關年度的稅表</li>
          <li>任何能顯示你何時、如何得知 Form 3520 的資料</li>
        </ul>

        <h2>什麼時候該找專業人士</h2>
        <p>
          晚報 Form 3520，幾乎都值得找專業人士。罰款是依贈與金額計算，金額可能很高，而一份有充分紀錄支持的合理原因說明很重要。尤其是涉及多個年度、金額龐大、海外信託、已經收到 IRS 通知，或有任何未申報收入時，更需要專業協助。
        </p>

      </KnowledgePage>
    </Layout>
  )
}

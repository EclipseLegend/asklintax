import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-identity-theft-ip-pin.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-identity-theft-ip-pin',
  sourceHash:      '94f7e1e952f7',
  id:            '105',
  title:         'IRS 身分盜用與 IP PIN：如何保護你的報稅',
  titleEn:       'IRS Identity Theft and the IP PIN: How to Protect Your Tax Return',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2026 年審閱的 IRS IP PIN 網頁與 IP PIN 常見問題、IRS 個人身分盜用指南，以及 IRS 關於詐騙和 IRS 如何聯絡納稅人的網頁，說明與報稅相關的身分盜用和 IRS 身分保護 PIN（IP PIN）計畫。IRS 的程序、電話號碼與收入上限會變動，採取行動前請先查看 IRS 網頁。本文不涵蓋企業身分盜用、信用凍結或州稅務機關',
  persona:       ['想防止別人用自己名義報稅的人', '電子申報被退回的人', '擔心孩子的 SSN 被盜用的父母', '接到可疑稅務電話、簡訊或信件的人'],
  relatedJourney: ['收到 IRS 的信', '剛到美國'],
  actionRequired: '透過 IRS 線上帳戶（或 Form 15227 或親自前往）取得 IP PIN，在當年申報的每一份聯邦 Form 1040 系列稅表上填寫；如果懷疑發生與報稅相關的身分盜用，在申報 Form 14039 之前，先依照 IRS 信件中的指示處理。',
  sources: [
    { label: 'IRS — 取得身分保護 PIN（Get an identity protection PIN）', url: 'https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin' },
    { label: 'IRS — IP PIN 常見問題', url: 'https://www.irs.gov/identity-theft-fraud-scams/frequently-asked-questions-about-the-identity-protection-personal-identification-number-ip-pin' },
    { label: 'IRS — 個人身分盜用指南（Identity theft guide for individuals）', url: 'https://www.irs.gov/identity-theft-central/identity-theft-guide-for-individuals' },
    { label: 'IRS — 如何確認是 IRS（How to know it\'s the IRS）', url: 'https://www.irs.gov/help/how-to-know-its-the-irs' },
    { label: 'IRS — 認識稅務詐騙（Recognize tax scams and fraud）', url: 'https://www.irs.gov/help/tax-scams/recognize-tax-scams-and-fraud' },
    { label: 'IRS — Form 14039（Rev. 2-2026），身分盜用宣誓書', url: 'https://www.irs.gov/pub/irs-pdf/f14039.pdf' },
  ],
}

const FAQS = [
  {
    q: 'IP PIN 能阻止所有身分盜用嗎？',
    a: '不能。IRS 指出，IP PIN 可以防止別人用你的 SSN 或 ITIN 申報聯邦稅表。它不能保護你的銀行或信用帳戶、你的 IRS 線上帳戶密碼、你的州稅表，或在資料外洩中的個人資訊。這些都要另外保護。',
  },
  {
    q: '每年都需要新的 IP PIN 嗎？',
    a: '是的。IRS 每年會產生新的 IP PIN。如果你是透過線上選擇加入，就不會收到郵寄的 CP01A 通知；你要從 1 月初開始到線上帳戶取得新的 IP PIN。',
  },
  {
    q: '我們合併申報，要用誰的 IP PIN？',
    a: '每一位有 IP PIN 的納稅人都必須在稅表上填寫自己的 IP PIN。如果只有一方配偶有，就只有那一方填寫。',
  },
  {
    q: '我把 IP PIN 弄丟了，怎麼辦？',
    a: '到你的 IRS 線上帳戶取回。如果無法取回，IRS 常見問題指出你可以撥打 800-908-4490；確認身分後，IRS 會在 21 天內把 IP PIN 寄到你登記的地址。你需要它才能電子申報。',
  },
  {
    q: '可以把 IP PIN 給我的報稅代理人嗎？',
    a: '可以，如果他們在幫你準備稅表；他們需要它才能申報。除此之外請保密。IRS 常見問題也指出，你打電話或親自前往 IRS 時，IP PIN 不被接受作為身分證明。',
  },
  {
    q: '加入後可以退出嗎？',
    a: '如果你是自願加入，而且沒有成為報稅身分盜用的受害者，你可能可以在線上帳戶中退出。如果你選擇的是一次性加入，該日曆年度結束時會自動退出。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '如何閱讀真正的 IRS 通知並確認真偽。',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  '意外的所得通知可能是身分盜用的徵兆。',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: '什麼是 ITIN？如何申請？',
    desc:  '持有 ITIN 也可以取得 IP PIN。',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '安全地申報你的第一份美國稅表。',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS 稅務記錄（transcript）：種類、如何取得，以及和報稅表副本的差別',
    desc:  '用免費的稅務記錄確認 IRS 檔案中的資料。',
  },
]

export default function IrsIdentityTheftIpPinZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 身分盜用與 IP PIN：如何保護你的報稅 | AskLinTax 繁體中文',
      description: '報稅身分盜用與 IRS 身分保護 PIN：誰可以申請、線上帳戶、Form 15227 與親自申請、受扶養人、合併申報、遺失 IP PIN、被退回的稅表、Form 14039、IRS 信件，以及詐騙。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>與報稅相關的身分盜用</strong>，是指有人用你的社會安全號碼或 ITIN 申報假稅表來領退稅，或申報你的受扶養人。IRS 的<strong>身分保護 PIN（IP PIN）</strong>是只有你和 IRS 知道的<strong>六位數</strong>號碼，任何用你的 SSN 或 ITIN 申報的聯邦稅表都必須填寫它——所以沒有這個號碼的盜用者無法以你的名義申報。任何有 SSN 或 ITIN、能夠確認身分的人都可以申請，即使不需要報稅也可以。它保護的是你的稅表，而不是你所有的帳戶。
        </p>

        <h2>警訊</h2>
        <p>IRS 列出的徵兆包括：</p>
        <ul>
          <li>你的電子申報被退回，因為已經有人用你的 SSN 申報；</li>
          <li>收到你沒有任職過的雇主寄來的 Form W-2 或 1099，或收到你沒有申請過的失業給付 Form 1099-G；</li>
          <li>你沒有申請過的 EIN，或收到不是你的所得的未申報所得通知，例如 CP2000；</li>
          <li>IRS 線上帳戶出現你沒有進行的活動、密碼重設或登入提醒；以及</li>
          <li>社會安全紀錄顯示你沒有賺過的工資。</li>
        </ul>
        <p>
          這些不一定代表身分被盜用，但都要處理。
        </p>

        <h2>如何取得 IP PIN</h2>
        <ArticleTable
          head={['方式', '誰可以使用', '如何收到 IP PIN']}
          rows={[
            ['IRS 線上帳戶（最快）', '任何能在線上確認身分的人', '顯示在個人資料頁的 IP PIN 區塊'],
            ['Form 15227（線上申請）', '如果你上一份稅表的 AGI 低於 $84,000（單身）或 $168,000（夫妻合併申報），而且無法使用線上帳戶；你需要有效的 SSN 或 ITIN 以及電話', 'IRS 會打電話確認你的身分，然後郵寄 IP PIN，通常在 4 到 6 週內'],
            ['親自前往納稅人協助中心（Taxpayer Assistance Center）', '無法使用前兩種方式時；攜帶一份附照片的身分證件與另一份身分文件', '郵寄，通常在三週內，之後每年郵寄'],
          ]}
        />
        <p>
          線上加入時，你可以選擇<strong>持續</strong>加入（今年與往後年度）或<strong>一次性</strong>加入（只有本日曆年度）。如果 IRS 紀錄顯示你曾是報稅身分盜用的受害者，IRS 會自動讓你加入。
        </p>

        <h2>受扶養人與孩子</h2>
        <ul>
          <li><strong>18 歲以上</strong>的受扶養人可以透過自己的線上帳戶申請 IP PIN。</li>
          <li>對於<strong>未滿 18 歲</strong>或無法在線上確認身分的受扶養人，你可以使用 Form 15227 或預約親自前往；親自申請時，要攜帶你自己的身分證件，以及受扶養人的兩份文件，例如出生證明、社會安全卡或護照。</li>
          <li>在<strong>電子申報</strong>的稅表上，依規定把每位受扶養人的 IP PIN 填在 Form 1040、Form 2441 與 Schedule EIC 上；<strong>紙本</strong>稅表則不用填寫受扶養人的 IP PIN。</li>
          <li>如果已經有人申報了你的受扶養人，IRS 指出，只要主要納稅人填寫有效的 IP PIN，現在會接受含有重複受扶養人的電子申報稅表。</li>
        </ul>

        <h2>使用 IP PIN 報稅</h2>
        <ul>
          <li><strong>用在哪裡：</strong>只用於聯邦 Forms 1040、1040-NR、1040-PR、1040-SR、1040-SS 與 1040-X——包括在該日曆年度申報的以前年度稅表與修正稅表。不用於 Form 4868 或州稅表。</li>
          <li><strong>合併申報：</strong>每一位有 IP PIN 的配偶都要填寫自己的。</li>
          <li><strong>IP PIN 錯誤或漏填：</strong>電子申報的稅表會被退回，直到你填寫正確的 IP PIN；紙本稅表則需要較長的處理時間。</li>
          <li><strong>因需要 IP PIN 而被退回：</strong>查看退回代碼，確認需要的是誰的 IP PIN，取回後再重新送出。</li>
          <li><strong>不會加快退稅：</strong>IRS 指出，有 IP PIN 的稅表會和其他稅表經過相同的檢查。</li>
        </ul>

        <h2>如果你收到 IRS 關於身分的信</h2>
        <ul>
          <li><strong>確認信件真的來自 IRS</strong>，並依照指示處理。如果信件要求，請使用 IRS 的<strong>身分與稅表驗證服務（Identity and Tax Return Verification Service）</strong>。</li>
          <li>如果你使用這項服務、IRS 已經就此事寄信給你，或身分盜用與報稅無關，<strong>就不要申報 Form 14039</strong>。</li>
          <li><strong>只在下列情況申報 Form 14039（身分盜用宣誓書）：</strong>IRS 要求你申報、你無法使用驗證服務，或你想通報 IRS 尚不知道的可能報稅身分盜用，例如資料外洩。你可以為自己、受扶養人或已故者申報，但同一事件已經通報過就不要再申報。如果因為你（或配偶、受扶養人）的 SSN 或 ITIN 被盜用而無法電子申報，表格說明指出要把它附在紙本稅表的背面，寄到你平常報稅的地點。</li>
          <li><strong>照常報稅與繳稅</strong>，同時處理這件事。</li>
        </ul>

        <h2>範例（說明用）</h2>
        <p>
          <strong>Mina</strong> 在 2026 年 3 月嘗試電子申報她 2025 年的稅表，卻因為已經有人用她的 SSN 申報而被退回。她沒有收到 IRS 的信。因為 IRS 還沒有聯絡她，而且她以前沒有通報過，她依照 Form 14039 說明，填好 Form 14039，附在紙本稅表的背面，寄到她平常報稅的 IRS 地點，並保留所有副本。如果她先收到 IRS 的信，她就會改為依照信中的指示處理——例如使用身分與稅表驗證服務，而不是申報 Form 14039。案件解決後，她用強而獨特的密碼建立 IRS 線上帳戶，並選擇持續加入 IP PIN 保護，讓以後的稅表都需要她的 IP PIN。
        </p>

        <h2>冒充 IRS 的詐騙</h2>
        <ArticleTable
          head={['真正的 IRS', '詐騙的徵兆']}
          rows={[
            ['通常第一次會用美國郵政寄信聯絡你', '突如其來的電話、電子郵件或簡訊'],
            ['只有在你選擇加入時才寄電子郵件；從不透過社群媒體私訊', '催你馬上行動，或威脅要逮捕或遣返'],
            ['會說明你如何對欠稅金額提出疑問或上訴', '要求立刻付款、禮品卡，或索取個人與財務資料'],
          ]}
        />
        <p>
          有些合法的信件來自 IRS 委託的民間催收機構。要確認一份通知，請搜尋 IRS 的通知與信件網頁，並向 IRS 通報可疑的聯絡。
        </p>

        <h2>身分保護與帳戶安全</h2>
        <ul>
          <li><strong>IP PIN：</strong>阻擋沒有 PIN、卻用你的 SSN 或 ITIN 申報的稅表。</li>
          <li><strong>線上帳戶安全：</strong>複雜且獨特的密碼可以保護你的 IRS 帳戶，那裡有你的 IP PIN 與稅務紀錄。</li>
          <li><strong>其他一切：</strong>信用報告、銀行帳戶與州稅務機關都需要各自的保護；IRS 建議受害者到 IdentityTheft.gov 了解復原步驟。</li>
        </ul>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>使用去年的 IP PIN。</strong>它每年都會改變。</li>
          <li><strong>在 IRS 信件已經要求使用驗證服務時，還申報 Form 14039。</strong></li>
          <li><strong>把個人資料告訴自稱是 IRS 的來電者。</strong></li>
          <li><strong>電子申報時忘了填受扶養人的 IP PIN。</strong></li>
          <li><strong>以為 IP PIN 能保護州稅表</strong>或銀行帳戶。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>涉及就業、已故者、多個稅務年度或企業的身分盜用，可能需要更長時間才能解決。如果案件造成經濟困難，IRS 納稅人權益服務處（Taxpayer Advocate Service）可以提供協助。本文不涵蓋信用凍結與州稅務機關。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/irs/irs-tax-transcripts.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'irs-tax-transcripts',
  sourceHash:      '43b612adcdbb',
  id:            '108',
  title:         'IRS 稅務記錄（transcript）：種類、如何取得，以及和報稅表副本的差別',
  titleEn:       'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 2026 年審閱的 IRS 稅務記錄頁面、稅務記錄服務常見問題，以及 2025 年 4 月版的 Form 4506-T 與 Form 4506，說明個人可取得的 IRS 稅務記錄種類與申請方式。處理時間與線上可取得的年度是 IRS 的估計，可能會改變。本文不解釋帳戶記錄上個別的交易代碼，也不涵蓋企業稅務記錄或貸款機構使用的 IVES 計畫',
  persona:       ['申請房貸與貸款的人', '申請助學金的學生', '遺失報稅表副本的人', '想確認 IRS 檔案內容的納稅人', '需要未報稅證明的新居民'],
  relatedJourney: ['處理稅務問題', '準備報稅'],
  actionRequired: '用 IRS 個人線上帳戶最快取得稅務記錄；如果無法在線上驗證身分，請用郵寄申請或撥打 800-908-9946；只有在需要報稅表的實際副本時才申請 Form 4506。',
  sources: [
    { label: 'IRS — 個人稅務記錄種類與申請方式', url: 'https://www.irs.gov/individuals/transcript-types-for-individuals-and-ways-to-order-them' },
    { label: 'IRS — 取得你的稅務資料與稅務記錄', url: 'https://www.irs.gov/individuals/get-transcript' },
    { label: 'IRS — 稅務記錄何時可取得', url: 'https://www.irs.gov/individuals/transcript-availability' },
    { label: 'IRS — 個人稅務記錄服務常見問題', url: 'https://www.irs.gov/individuals/transcript-services-for-individuals-faqs' },
    { label: 'IRS — Form 4506-T，申請稅務記錄（2025 年 4 月版）', url: 'https://www.irs.gov/pub/irs-pdf/f4506t.pdf' },
    { label: 'IRS — Form 4506，申請報稅表副本（2025 年 4 月版）', url: 'https://www.irs.gov/pub/irs-pdf/f4506.pdf' },
  ],
}

const FAQS = [
  {
    q: '稅務記錄要收費嗎？',
    a: '不用。所有稅務記錄都是免費的，無論是線上、郵寄、電話或用 Form 4506-T 申請。只有用 Form 4506 申請報稅表的實際副本才要付費：每份報稅表 $30。',
  },
  {
    q: '稅務記錄可以告訴我退稅什麼時候到嗎？',
    a: '不太可靠。IRS 表示，稅務記錄主要用來為貸款確認過去的收入和報稅身分，以及協助準備報稅。查詢退稅請使用 Where\'s My Refund?。',
  },
  {
    q: 'IRS 可以把稅務記錄寄給我的貸款機構嗎？',
    a: '不行。Form 4506-T 指出，IRS 從 2019 年 7 月起停止把稅務記錄寄給第三方；稅務記錄只會寄到 IRS 檔案上的地址。你可以從線上帳戶下載後交給貸款機構，或由貸款機構使用 IRS 的 Income Verification Express Service。',
  },
  {
    q: '我搬家了，為什麼沒收到郵寄的稅務記錄？',
    a: '郵寄的稅務記錄會寄到 IRS 檔案上的地址，而且不會轉寄。請先用 Form 8822 變更地址 — IRS 表示通常需要四到六週處理 — 再申請稅務記錄。',
  },
  {
    q: '我的工資與收入記錄顯示「No record of return filed」，是什麼意思？',
    a: '對當年度來說，通常表示資訊申報表的資料還沒有出現在稅務記錄上。IRS 建議 2 月初再查看。這份記錄只顯示已向 IRS 申報的表格，所以可能沒有列出你收到的每一份表格。',
  },
  {
    q: '帳戶記錄上的代碼是什麼意思？',
    a: '帳戶記錄會列出交易的代碼、日期與金額。本文不解釋個別代碼。如果某筆交易不清楚，或記錄上出現你不認得的資訊，請撥打 IRS 800-829-1040，或詢問稅務專業人士。',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: '我收到 IRS 的信，該怎麼辦？',
    desc:  '稅務記錄可以幫你核對通知。',
  },
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 通知：代表什麼？該如何回覆？',
    desc:  '和你的工資與收入記錄比較。',
  },
  {
    href: '/library/irs/irs-identity-theft-ip-pin',
    cat:  'IRS & Tax Issues',
    title: 'IRS 身分盜用與 IP PIN：如何保護你的報稅',
    desc:  '記錄上出現你沒有申報的稅表時該怎麼辦。',
  },
  {
    href: '/library/irs/amend-tax-return',
    cat:  'IRS & Tax Issues',
    title: '報稅表填錯了，要怎麼修改？',
    desc:  '核對稅務記錄後修正報稅表。',
  },
]

export default function IrsTaxTranscriptsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: 'IRS 稅務記錄（transcript）：種類、如何取得，以及和報稅表副本的差別 | AskLinTax 繁體中文',
      description: 'IRS 稅務記錄說明：五種記錄種類、各自顯示什麼、如何在線上、郵寄、電話或用 Form 4506-T 取得、何時可以取得，以及稅務記錄和用 Form 4506 申請的報稅表副本有什麼不同。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          <strong>IRS 稅務記錄（transcript）</strong>是 IRS 檔案中你稅務資料的免費摘要。個人有五種。最快的取得方式是你的 <strong>IRS 個人線上帳戶</strong>。如果你無法在線上驗證身分，可以用郵寄或撥打 <strong>800-908-9946</strong> 取得報稅表記錄或稅務帳戶記錄，或用 <strong>Form 4506-T</strong> 申請任何種類。稅務記錄<strong>不是</strong>你報稅表的<strong>影本</strong>；如果需要實際副本，請申請 <strong>Form 4506</strong>，每份報稅表 <strong>$30</strong>。
        </p>

        <h2>五種稅務記錄</h2>
        <ArticleTable
          head={['記錄種類', '顯示內容', '可取得的年度']}
          rows={[
            ['報稅表記錄（tax return transcript）', '你原始 Form 1040 申報時的大部分項目，以及附表；不含之後的變更', '當年度與前 3 年'],
            ['稅務帳戶記錄（tax account transcript）', '報稅身分、應稅所得、付款等基本資料，以及申報後的變更', '線上為當年度與前 9 年；郵寄或電話為當年度與前 3 年'],
            ['帳戶完整記錄（record of account transcript）', '報稅表記錄與稅務帳戶記錄的合併', '當年度與前 3 年'],
            ['工資與收入記錄（wage and income transcript）', 'Form W-2、1098、1099、5498 等資訊申報表的資料', '當年度與前 9 年'],
            ['未報稅證明信（verification of non-filing letter）', 'IRS 在申請當天沒有處理過的 Form 1040 報稅記錄', '當年度在 6 月 15 日之後；前 3 年隨時可取得'],
          ]}
        />
        <p>
          報稅表記錄通常可以滿足房貸機構的需求。如果你修改過報稅表或 IRS 調整過，請申請帳戶完整記錄，因為報稅表記錄只顯示原始報稅表。更早的年度可以用 Form 4506-T 申請。
        </p>

        <h2>常見用途</h2>
        <ul>
          <li><strong>貸款與房貸：</strong>證明收入和報稅身分。</li>
          <li><strong>助學金：</strong>IRS 另有一個頁面說明申請學生助學金時的稅務資料。</li>
          <li><strong>準備報稅：</strong>查詢去年的 AGI，或確認申報了哪些 W-2 和 1099。</li>
          <li><strong>核對通知：</strong>把 IRS 的信和 IRS 檔案中的資料比較。</li>
          <li><strong>證明你沒有報稅：</strong>未報稅證明信。它不會說明你是否有義務報稅。</li>
        </ul>

        <h2>如何取得稅務記錄</h2>
        <ArticleTable
          head={['方式', '記錄種類', '取得方式']}
          rows={[
            ['個人線上帳戶', '全部五種', '立即查看、列印或下載'],
            ['郵寄申請（Get Transcript by Mail 線上表單）', '報稅表記錄或稅務帳戶記錄', '5 到 10 個日曆天寄到檔案上的地址'],
            ['自動電話服務，800-908-9946', '報稅表記錄或稅務帳戶記錄', '5 到 10 個日曆天寄到檔案上的地址'],
            ['Form 4506-T', '任何種類，包括較早的年度', '大多數申請在 10 個工作天內處理'],
          ]}
        />
        <ul>
          <li><strong>身分驗證：</strong>使用線上帳戶要透過 ID.me 註冊；IRS 表示新使用者應準備好有照片的身分證件。如果無法驗證，請用郵寄、電話或 Form 4506-T。</li>
          <li><strong>地址必須相符：</strong>郵寄和電話申請時，請使用你最近一份報稅表上的完整地址。</li>
          <li><strong>Form 4506-T</strong> 必須簽名，並在簽名日起 120 天內送達 IRS。合併申報的報稅表只需要一位配偶簽名。</li>
          <li><strong>住在海外：</strong>仍然可以使用線上帳戶，或用郵寄或電話申請。</li>
          <li><strong>合併申報者：</strong>列在第二位的配偶也可以申請任何可取得的記錄。</li>
        </ul>

        <h2>今年的稅務記錄什麼時候可以取得</h2>
        <ArticleTable
          head={['你的原始報稅表', '電子申報', '紙本申報']}
          rows={[
            ['有退稅或沒有欠稅', '送出後 2–3 週', '寄出後 6–8 週'],
            ['有欠稅，並隨報稅表全額付清', '送出後 2–3 週', '6 月處理；6 月中下旬可以申請'],
            ['有欠稅，之後才全額付清', '全額付清後 3–4 週', '6 月處理；6 月中下旬可以申請'],
            ['有欠稅，沒有全額付清', '5 月中處理；5 月下旬前可以申請', '6 月處理；6 月中下旬可以申請'],
          ]}
        />
        <p>
          這些是 IRS 對 4 月截止日前申報的報稅表的估計。上一年度的工資與收入資料，通常在 2 月第一週出現。
        </p>

        <h2>稅務記錄與報稅表副本的比較</h2>
        <ArticleTable
          head={['', '稅務記錄', '報稅表副本（Form 4506）']}
          rows={[
            ['你會拿到什麼', 'IRS 資料的電腦摘要', '你申報的報稅表影本，附有 W-2 等附件'],
            ['費用', '免費', '每份報稅表 $30'],
            ['處理時間', '線上立即取得；郵寄需數天', '最多 75 個日曆天'],
            ['可回溯年度', '依種類通常為前 3 年或前 9 年', '通常為申報後 7 年'],
            ['個人資料', '部分遮蔽；財務資料完整顯示', '照申報時顯示'],
          ]}
        />

        <h2>需要知道的限制</h2>
        <ul>
          <li><strong>遮蔽：</strong>稅務記錄會部分遮蔽你的個人身分資料。財務數字則完整顯示。</li>
          <li><strong>工資與收入記錄</strong>只顯示已向 IRS 申報的表格，而且大約以 85 份文件為限；超過時線上無法產生，你需要用 Form 4506-T。</li>
          <li><strong>「per return」與「per computer」：</strong>如果 IRS 在處理時更正了數字，報稅表記錄會同時顯示兩者。</li>
          <li><strong>身分盜用：</strong>你仍然可以使用稅務記錄服務。如果因為身分盜用而無法處理申請，IRS 會寄出說明。</li>
          <li><strong>語言：</strong>稅務記錄是英文的，但從 2025 年 4 月 30 日起，可以透過線上帳戶取得西班牙文的稅務記錄。</li>
        </ul>

        <h2>範例</h2>
        <ArticleTable
          head={['', 'Priya', 'Marcus', 'Sofia']}
          rows={[
            ['需求', '房貸機構要 2024 和 2025 年的收入', '遺失了 2022 年的報稅表，移民案件需要完整副本', '2025 年來美，2024 年不需要報稅；學校要求證明'],
            ['最佳選擇', '從線上帳戶取得報稅表記錄', '用 Form 4506 申請 2022 年報稅表，附上 $30', '2024 年的未報稅證明信'],
            ['時間', '每份報稅表處理完成後立即可取得', '最多 75 個日曆天', '前一年度現在就可以取得'],
          ]}
        />
        <p>
          如果 Priya 修改過 2024 年的報稅表，她的貸款機構需要帳戶完整記錄才能看到變更。Sofia 的證明信只顯示沒有處理過報稅表，不表示她是否有義務報稅。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 小心詐騙</div>
          <p>IRS 不會主動用電子郵件、簡訊或社群媒體要求你提供個人或財務資料。請只從 IRS.gov、IRS 寄來的郵件，或官方電話取得稅務記錄。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

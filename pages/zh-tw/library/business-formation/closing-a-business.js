import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/business-formation/closing-a-business.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'closing-a-business',
  sourceHash:      '250454ea7fa7',
  id:            '128',
  title:         '結束營業：最終稅務申報、薪資稅與 IRS 帳戶關閉',
  titleEn:       'Closing a Business: Final Tax Returns, Payroll, and IRS Account Closure',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 IRS「結束營業」網頁（2026 年 7 月更新）、IRS「如果你不再需要 EIN」網頁（2025 年 11 月更新）、Form 941 說明（2026 年 3 月修訂版）、Form 966（2016 年 10 月修訂版）、Publication 541（2025 年 12 月修訂版）、Form 1120 說明（2025），以及 Publication 583，說明結束營業的聯邦稅務步驟。本文不詳細說明州的解散程序、州稅帳戶關閉、破產，或出售企業',
  persona:       ['正在收掉生意的獨資經營者', '解散公司的 LLC 成員', '結束營業的 S 公司與 C 公司老闆', '已停止營運但從未正式結束的老闆'],
  relatedJourney: ['經營小型企業', '剛成立 LLC'],
  actionRequired: '依你的企業類型申報最終所得稅申報書；如果你有員工，申報最終薪資稅申報書與 W-2 表，並申報最後一年的 1099 表；繳清所有稅款；然後以書面要求 IRS 關閉企業帳戶。另外，依照你所在州的程序解散或註銷法律實體，並關閉州稅帳戶。',
  sources: [
    { label: 'IRS — 結束營業', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/closing-a-business' },
    { label: 'IRS — 如果你不再需要 EIN', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/if-you-no-longer-need-your-ein' },
    { label: 'IRS — Form 941 說明（2026 年 3 月修訂版）', url: 'https://www.irs.gov/pub/irs-pdf/i941.pdf' },
    { label: 'IRS — Form 966，公司解散或清算', url: 'https://www.irs.gov/pub/irs-pdf/f966.pdf' },
    { label: 'IRS — Publication 541（2025 年 12 月修訂版），合夥企業', url: 'https://www.irs.gov/pub/irs-pdf/p541.pdf' },
    { label: 'IRS — Publication 583，創業與保存紀錄', url: 'https://www.irs.gov/pub/irs-pdf/p583.pdf' },
  ],
}

const FAQS = [
  {
    q: '結束營業時，IRS 會註銷我的 EIN 嗎？',
    a: '不會。IRS 表示 EIN 一經指派就無法註銷；它會成為該實體永久的聯邦納稅人識別號碼。你可以要求的是關閉企業帳戶（IRS 也稱為停用 EIN）。這個 EIN 仍然與該實體相連。',
  },
  {
    q: '如果 IRS 關閉了我的企業帳戶，我的 LLC 或公司就解散了嗎？',
    a: '沒有。關閉 IRS 帳戶只是聯邦稅務上的步驟。LLC 或公司依州法存在，直到你向州政府提交解散或註銷文件為止，而州稅務機關也有自己的最終申報與帳戶關閉規定。向州政府辦理解散，本身也不能滿足你的聯邦申報義務。',
  },
  {
    q: 'IRS 什麼時候會關閉我的企業帳戶？',
    a: '只有在你申報了所有必要的申報書並繳清所有稅款之後。如果還有未申報的申報書或應繳餘額，IRS 表示無法關閉帳戶。',
  },
  {
    q: 'Form 966 是什麼？誰要申報？',
    a: 'Form 966 由通過解散決議或計畫、或清算任何股票的公司（包括 S 公司）申報。期限是在決議或計畫通過後 30 天內。合夥企業、獨資經營者，以及以合夥企業或被忽略實體課稅的 LLC 不需要申報；免稅組織與合格的 S 子公司也不應申報。',
  },
  {
    q: '最後一年還是要申報 1099 表嗎？',
    a: '是的，只要你在當年的營業過程中有應申報的付款。門檻取決於付款年度 — 非員工報酬一般是 2025 年的付款 $600、2026 年的付款 $2,000。',
  },
  {
    q: '結束營業後，紀錄要保存多久？',
    a: '就業稅紀錄要在稅款到期日或繳納日（以較晚者為準）之後保存至少 4 年。財產紀錄要保存到你處分該財產那一年的時效期間屆滿為止；收入與費用紀錄要保存到該申報書的時效期間屆滿為止。',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: '多成員 LLC 與合夥企業稅務：Form 1065 與 Schedule K-1',
    desc:  '最終合夥企業申報書與 K-1 如何處理。',
  },
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: '經營 S 公司：合理薪資、Form 1120-S 與 Schedule K-1',
    desc:  '你最後一次申報的 S 公司申報書。',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: '雇主薪資稅：Form 941、Form 940、稅款繳存與信託基金追繳罰款',
    desc:  '最終的薪資稅繳存與申報。',
  },
  {
    href: '/library/small-business/issuing-form-1099-nec',
    cat:  'Small Business & Self-Employment',
    title: '開立 Form 1099-NEC 與 1099-MISC：申報門檻、期限與罰款',
    desc:  '最後一年的資訊申報表。',
  },
]

export default function ClosingABusinessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '結束營業：最終稅務申報、薪資稅與 IRS 帳戶關閉 | AskLinTax 繁體中文',
      description: '結束營業的聯邦稅務步驟：獨資經營、合夥企業、LLC、S 公司與 C 公司的最終申報、Form 966、最終的 941 與 940 表、W-2 與 1099 表、出售資產、關閉 IRS 企業帳戶、EIN 會怎麼樣，以及紀錄保存。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          結束營業包含好幾個不會自動一起發生的程序：申報<strong>最終聯邦所得稅申報書</strong>、申報<strong>最終薪資稅申報書</strong>與<strong>資訊申報表</strong>、繳清應繳稅款、要求 IRS <strong>關閉你的企業帳戶</strong>，以及 — 對 LLC 或公司而言 — <strong>依州法解散實體</strong>。你的 <strong>EIN 不會被註銷</strong>；它仍然是該實體永久的聯邦納稅人識別號碼。
        </p>

        <h2>六件要分開處理的事</h2>
        <ArticleTable
          head={['步驟', '是什麼', '不會做到什麼']}
          rows={[
            ['最終聯邦所得稅申報書', '你的企業類型的最後一份申報書，表格上有「最終申報」方框的話要勾選', '不會關閉你的 IRS 帳戶，也不會解散實體'],
            ['最終薪資稅申報書', '你最後一次發薪期間的最終 Form 941（或 944）與 Form 940', '不涵蓋所得稅或資訊申報表'],
            ['最終資訊申報表', '員工的 W-2 與 W-3 表，以及最後一年應申報付款的 1099 表', '不能由最終所得稅申報書取代'],
            ['關閉 IRS 企業帳戶', '在所有申報與繳稅完成後，以書面要求 IRS 關閉帳戶', '不會依州法解散實體'],
            ['EIN', '該實體永久的聯邦納稅人識別號碼', '不會被註銷，也不會重新指派給其他企業'],
            ['州的解散程序', '向州政府提交的解散或註銷，加上州稅帳戶的關閉', '不能滿足聯邦申報要求'],
          ]}
        />

        <h2>依企業類型的最終所得稅申報書</h2>
        <ArticleTable
          head={['企業類型', '最終聯邦申報書', '另外注意']}
          rows={[
            ['獨資經營', '結束營業那一年，隨 Form 1040 申報的 Schedule C', '淨收入 $400 以上時要申報 Schedule SE'],
            ['合夥企業（包括以合夥企業課稅的多成員 LLC）', 'Form 1065，勾選「final return」（最終申報）方框；在每一份 Schedule K-1 上勾選「final K-1」方框', '課稅年度在合夥企業完成清理結算的日期結束；短期申報書的期限是該日期後第 3 個月的 15 日'],
            ['單一成員 LLC（被忽略實體）', '申報在所有人的申報書上 — 個人所有人是 Schedule C', '如果有員工，要以 LLC 的 EIN 申報最終薪資稅申報書'],
            ['S 公司（包括選擇 S 公司地位的 LLC）', 'Form 1120-S，勾選「final return」方框；在每一份 Schedule K-1 上勾選「final K-1」方框', '如果通過解散決議或計畫，要申報 Form 966'],
            ['C 公司（包括選擇公司地位的 LLC）', 'Form 1120，勾選「final return」方框', '一般在解散日期後第 4 個月的 15 日前申報；如果通過解散決議或計畫，要申報 Form 966'],
          ]}
        />
        <p>
          LLC 依它的聯邦稅務分類申報：被忽略實體、合夥企業或公司。當合夥企業的任何業務都不再由任何合夥人以合夥方式繼續經營時，合夥企業在稅務上就終止了；請見<a href="/zh-tw/library/business-formation/partnership-llc-taxes/">合夥企業與 LLC 稅務</a>。
        </p>

        <h2>出售或處分營業資產</h2>
        <ul>
          <li><strong>Form 4797</strong> 申報營業用財產的出售或交換。出售時，你之前申報的折舊可能要以一般所得回收（recapture）。</li>
          <li>IRS 也表示，如果結束營業讓第 179 條財產的營業使用比例降到 <strong>50% 以下</strong>，也要申報 Form 4797，這可能觸發回收。</li>
          <li><strong>Form 8594</strong>（資產取得聲明）在你出售企業時申報。</li>
        </ul>

        <h2>如果你有員工</h2>
        <ul>
          <li>支付最後的工資、完成最後的聯邦稅款繳存，並申報你最後一次發薪那一季的最終 <strong>Form 941</strong>（或 Form 944）。勾選 Form 941 第 17 行的方框，並填入最後發薪日期。</li>
          <li>附上一份聲明，寫明<strong>保管薪資紀錄的人的姓名</strong>，以及紀錄保存的地址。</li>
          <li>為你最後發薪的日曆年度申報最終 <strong>Form 940</strong>，在申報類型（Type of Return）部分勾選 <strong>d</strong> 方框。</li>
          <li>在最終 Form 941 的期限前，提供 <strong>Form W-2</strong> 給每位員工，並隨 Form W-3 申報 A 聯。企業終止時適用較早的申報日期，請見 Form W-2 與 W-3 的說明。</li>
          <li>如果員工有收小費，要申報最終的 Form 8027。退休與健康福利計畫有它們自己的終止規定。</li>
        </ul>
        <p>
          未繳的預扣稅款不會因為企業結束而消失；負責人可能被課徵信託基金追繳罰款。請見<a href="/zh-tw/library/small-business/payroll-taxes-941-940/">雇主薪資稅</a>。
        </p>

        <h2>公司：Form 966</h2>
        <p>
          通過解散決議或計畫、或清算任何股票的公司，必須在通過後 <strong>30 天內申報 Form 966</strong>，並附上決議或計畫的認證副本。如果計畫有修訂，要在修訂後 30 天內再申報一份 Form 966。Form 966 是通知 IRS 這項計畫；它不是最終申報書，也不會依州法解散公司。
        </p>

        <h2>關閉 IRS 企業帳戶</h2>
        <p>
          所有申報書都申報完、所有稅款都繳清後，寄一封信給 IRS，寫明企業的完整法定名稱、EIN、營業地址，以及你要關閉帳戶的原因；如果你還保留 EIN 指派通知，也附上副本。只要還有缺漏的申報書或應繳餘額，IRS 就不會關閉帳戶。
        </p>
        <p>
          關閉帳戶不等於註銷 EIN。IRS 表示它<strong>無法註銷</strong> EIN：EIN 一經指派，即使帳戶關閉了，仍然是該實體永久的聯邦納稅人識別號碼（IRS 也稱為停用 EIN）。寄信之前，請先在 IRS.gov 查看最新的 IRS 說明，確認要寄到哪裡。
        </p>

        <h2>州的解散是另一個步驟</h2>
        <p>
          關閉 IRS 帳戶並不會結束 LLC 或公司。在你向成立所在州，以及任何登記營業的州，提交該州要求的解散、註銷或撤回文件之前，實體一般仍依州法存在 — 而且可能繼續積欠州的規費或稅款。州稅務機關也有自己的最終申報與帳戶關閉規定。在認定實體已經結束之前，請先向每個州確認。另請見 <a href="/zh-tw/library/business-formation/llc-basics/">LLC 基本概念</a>。
        </p>

        <h2>保存紀錄</h2>
        <ul>
          <li><strong>就業稅紀錄：</strong>稅款到期日或繳納日（以較晚者為準）之後至少 4 年。</li>
          <li><strong>財產紀錄：</strong>保存到你處分該財產那一年的時效期間屆滿為止。</li>
          <li><strong>收入與費用紀錄：</strong>保存到該申報書的時效期間屆滿為止。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 停止營運不等於結束營業</div>
          <p>如果你只是停止營業，卻沒有申報最終申報書，IRS 可能會繼續等你申報 — 特別是每季的 941 表 — 並可能寄送通知或課徵罰款。請申報最終申報書、勾選最終申報方框，並在一切申報與繳清後要求關閉帳戶。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

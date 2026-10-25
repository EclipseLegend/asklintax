import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import ArticleTable from '../../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/individual/filing-status-head-of-household.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'filing-status-head-of-household',
  sourceHash:      '72334bb56bf4',
  id:            '107',
  title:         '報稅身分與戶長身分：2025 與 2026 年規定',
  titleEn:       'Filing Status and Head of Household: 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '依據 Publication 501（2025）、Rev. Proc. 2024-40 與 Rev. Proc. 2025-32（2026 年標準扣除額），說明 2025 與 2026 稅務年度的五種聯邦報稅身分。本次審閱時尚無 2026 年版 Publication 501，因此 2026 年的規定應以該版本確認。本文不詳細說明雙重身分年度、夫妻共同財產的分配，也不涵蓋州的報稅身分規定',
  persona:       ['單親父母', '年度中分居或離婚的人', '扶養父母的成年人', '配偶是非居民外國人的人', '喪偶者'],
  relatedJourney: ['準備報稅', '有受扶養人的報稅'],
  actionRequired: '先確定你在 12 月 31 日的婚姻狀況，再確認是否符合戶長或合格喪偶者的每一項條件，然後選擇讓你稅最低的報稅身分。',
  sources: [
    { label: 'IRS — Publication 501（2025），受扶養人、標準扣除額與報稅資訊', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — Rev. Proc. 2024-40（2025 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32（2026 年通膨調整金額）', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: '我在 12 月 31 日結婚，整年都算已婚嗎？',
    a: '是的。Publication 501 指出，你在年度最後一天的婚姻狀況決定你整年的報稅身分。如果你在 12 月 31 日結婚，那一年就算已婚，要選擇已婚合併申報或已婚分開申報。',
  },
  {
    q: '我的離婚還沒判決，可以用單身身分報稅嗎？',
    a: '不行。在年度最後一天之前，法院還沒有作出最終離婚判決或分居扶養判決，你就仍然算已婚。如果你符合「視為未婚」的全部五項條件，仍然可能可以用戶長身分申報。',
  },
  {
    q: '沒有小孩可以用戶長身分報稅嗎？',
    a: '可以，只要有其他合格人士。最常見的是受扶養的父母：父母不必和你同住，但你必須可以把父母列為受扶養人，而且整年支付父母主要住所一半以上的費用。其他親屬通常必須和你同住超過半年。',
  },
  {
    q: '兩個人可以用同一個孩子申報戶長身分嗎？',
    a: '不行。一個人在一年中只能讓一位納稅人符合戶長身分。',
  },
  {
    q: '非居民外國人配偶算合格人士嗎？',
    a: '不算。如果你的配偶在年度中任何時間是非居民外國人，而你沒有選擇把配偶視為居民，那麼就戶長身分而言你被視為未婚，但你的配偶不是合格人士。你需要另一位合格人士（例如你的孩子），並且符合其他條件。',
  },
  {
    q: '用戶長身分，其他抵稅額也會把我當成未婚嗎？',
    a: '不一定。Publication 501 指出，你可能在戶長身分方面被視為未婚，但在其他方面（例如勞動所得抵稅額）則不是。每一項稅務優惠都有自己的條件。',
  },
]

const RELATED = [
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: '非居民配偶：我們可以合併報稅嗎？',
    desc:  '把非居民配偶視為居民的選擇。',
  },
  {
    href: '/library/individual/claim-parent-as-dependent',
    cat:  'Individuals & Families',
    title: '父母住在海外，可以申報為受扶養人嗎？',
    desc:  '父母規定背後的受扶養人條件。',
  },
  {
    href: '/library/individual/earned-income-tax-credit',
    cat:  'Individuals & Families',
    title: '勞動所得抵稅額（EITC）：2025 與 2026 年收入上限與規定',
    desc:  '分居已婚者有它自己的規定。',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: '在美國第一次報稅：完整步驟指南',
    desc:  '報稅身分在你第一份稅表中的位置。',
  },
  {
    href: '/library/individual/divorce-alimony-taxes',
    cat:  'Individuals & Families',
    title: '離婚與稅務：贍養費、子女撫養費、財產與退休帳戶',
    desc:  '離婚時的贍養費、子女撫養費與財產分配。',
  },
]

export default function FilingStatusPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '報稅身分與戶長身分：2025 與 2026 年規定 | AskLinTax 繁體中文',
      description: '五種報稅身分說明：12 月 31 日的婚姻狀況、戶長身分條件、視為未婚、合格人士、受扶養父母規定、非居民外國人配偶、合格喪偶者，以及 2025 與 2026 年標準扣除額。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>簡短的答案</h2>
        <p>
          你的<strong>報稅身分</strong>決定你的稅率級距、標準扣除額，以及能否申請多項抵稅額。它主要取決於你在 <strong>12 月 31 日</strong>是否已婚，以及誰和你同住。未婚、並為<strong>合格人士</strong>支付住所一半以上費用的人，通常可以用<strong>戶長身分</strong>申報，稅率比單身低，標準扣除額也比較高。如果符合不只一種身分，Publication 501 建議選擇讓你稅最低的那一種。
        </p>

        <h2>五種報稅身分</h2>
        <ArticleTable
          head={['身分', '誰可以使用']}
          rows={[
            ['單身', '12 月 31 日時未婚、已離婚或依法分居，而且不適用其他身分'],
            ['已婚合併申報', '12 月 31 日時已婚（或配偶在年度中過世），而且雙方同意一起申報'],
            ['已婚分開申報', '已婚，每位配偶只申報自己的收入與扣除額'],
            ['戶長', '未婚或「視為未婚」，支付住所一半以上的費用，並且有合格人士'],
            ['合格喪偶者', '配偶在前 2 年之一過世、沒有再婚，而且有受扶養的子女整年和你同住'],
          ]}
        />

        <h2>婚姻狀況以 12 月 31 日決定</h2>
        <ul>
          <li><strong>整年算未婚：</strong>如果在年度最後一天你未婚，或依離婚或分居扶養判決依法分居。是否依法分居由州法決定。</li>
          <li><strong>12 月 31 日前已離婚</strong>且判決已確定：整年算未婚。</li>
          <li><strong>配偶在年度中過世：</strong>那一年你被視為已婚，可以合併申報。</li>
          <li><strong>在外國結婚</strong>：只要至少一個美國州或屬地會承認這段婚姻，就會被承認。依州法不算婚姻的註冊同居伴侶與民事結合，在聯邦稅法上不算婚姻。</li>
        </ul>

        <h2>戶長身分：三項條件</h2>
        <ul>
          <li><strong>在年度最後一天未婚或視為未婚。</strong></li>
          <li><strong>你支付了當年維持住所一半以上的費用。</strong></li>
          <li><strong>有合格人士和你同住</strong>超過半年，因上學等原因暫時不在不影響。受扶養的父母是例外 — 見下文。</li>
        </ul>

        <h2>仍然已婚時的「視為未婚」</h2>
        <p>已婚者必須符合以下全部五項條件，才會在戶長身分方面被視為未婚：</p>
        <ul>
          <li>你單獨申報稅表。</li>
          <li>你支付了當年維持住所一半以上的費用。</li>
          <li>你的配偶在年度最後 6 個月沒有住在你的住所。</li>
          <li>你的住所是你的子女、繼子女或寄養子女超過半年的主要住所。</li>
          <li>你可以把這個孩子列為受扶養人；或是只因為非監護父母依離婚或分居父母的規定申報這個孩子，你才不能列報。</li>
        </ul>
        <p>
          <strong>非居民外國人配偶：</strong>如果你的配偶在年度中任何時間是非居民外國人，而你沒有選擇把配偶視為居民，你在戶長身分方面也被視為未婚。但你的配偶不是合格人士，所以你仍然需要另一位合格人士。
        </p>

        <h2>誰是合格人士</h2>
        <ArticleTable
          head={['對象', '是戶長身分的合格人士嗎？']}
          rows={[
            ['你的合格子女，而且是單身', '是'],
            ['你的合格子女，但已婚', '只有在你可以把子女列為受扶養人時才是'],
            ['你的父母', '只有在你可以把父母列為受扶養人時才是；父母不必和你同住'],
            ['其他親屬，例如祖父母或兄弟姊妹', '只有在他們和你同住超過半年、屬於列出的親屬關係，而且你可以列報他們時才是'],
            ['只能依多人扶養協議列報的人', '不是'],
            ['朋友或沒有親屬關係的家庭成員', '不是'],
          ]}
        />
        <p>
          <strong>受扶養父母規定：</strong>你必須支付父母主要住所<strong>整年</strong>一半以上的維持費用。支付養老院或安養機構一半以上的費用也算。
        </p>

        <h2>哪些算維持住所的費用</h2>
        <ArticleTable
          head={['包括', '不包括']}
          rows={[
            ['房租、房貸利息、房地產稅', '衣服、教育、醫療'],
            ['房屋保險與修繕', '度假、人壽保險、交通'],
            ['水電瓦斯等公用事業費，以及在家中吃的食物', '你自己或家庭成員提供服務的價值'],
          ]}
        />

        <h2>合格喪偶者</h2>
        <ul>
          <li><strong>過世那一年：</strong>你通常可以和過世的配偶合併申報。</li>
          <li><strong>之後 2 年：</strong>2025 年，如果你的配偶在 <strong>2023 或 2024</strong> 年過世、你在 2025 年底前沒有再婚、你在配偶過世那年可以合併申報，而且你支付了住所一半以上的費用，而你可以列為受扶養人（有少數例外）的子女或繼子女（不包括寄養子女）整年住在那裡（暫時不在不影響），你就可以使用合格喪偶者身分。</li>
          <li><strong>好處：</strong>適用合併申報的稅率和合併申報的標準扣除額。但它不會讓你能夠合併申報。</li>
        </ul>

        <h2>各報稅身分的標準扣除額</h2>
        <ArticleTable
          head={['報稅身分', '2025', '2026']}
          rows={[
            ['單身或已婚分開申報', '$15,750', '$16,100'],
            ['已婚合併申報或合格喪偶者', '$31,500', '$32,200'],
            ['戶長', '$23,625', '$24,150'],
          ]}
        />
        <p>
          2025 年金額來自 Publication 501（2025）；2026 年金額來自 Rev. Proc. 2025-32。65 歲以上或失明者有額外金額。如果你已婚分開申報，而你的配偶選擇逐項扣除，你就不能使用標準扣除額。
        </p>

        <h2>範例（2025）</h2>
        <ArticleTable
          head={['', 'Lena', 'Ana', 'Raj', 'Tom']}
          rows={[
            ['情況', '12 月 15 日離婚判決確定；兒子整年和她同住', '單身；整年支付受扶養母親公寓一半以上的房租', '已婚；配偶是整年在海外的非居民外國人；沒有做選擇；沒有其他人和他同住', '配偶在 2024 年過世；沒有再婚；受扶養的女兒整年和他同住'],
            ['報稅身分', '戶長', '戶長', '已婚分開申報', '合格喪偶者'],
            ['標準扣除額', '$23,625', '$23,625', '$15,750', '$31,500'],
          ]}
        />
        <p>
          Raj 在戶長身分方面被視為未婚，但他的非居民配偶不是合格人士，他也沒有其他合格人士，所以不能用戶長身分。如果他選擇把配偶視為居民，他們就可以改為合併申報。範例假設其他條件都符合，包括 Lena 支付了住所一半以上的費用。
        </p>

        <h2>常見錯誤</h2>
        <ul>
          <li><strong>12 月 31 日時仍然已婚</strong>，因為離婚還沒確定，卻用單身身分申報。</li>
          <li><strong>申報戶長身分</strong>，但配偶在年度最後 6 個月中曾和你同住。</li>
          <li><strong>把朋友或非居民配偶</strong>當成合格人士。</li>
          <li><strong>用不能列為受扶養人的父母</strong>，或沒有整年負擔其住所費用。</li>
          <li><strong>在配偶過世那年之後超過 2 年</strong>仍使用合格喪偶者身分。</li>
          <li><strong>以為合併申報一定比較好</strong> — 請比較各種身分，尤其是一方有高額醫療費用或稅務問題時。</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 複雜情況請尋求協助</div>
          <p>雙重身分年度、夫妻共同財產州、婚姻無效、孩子被綁架，以及共同監護的父母，都有特別規定。州的報稅身分規定可能不同。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

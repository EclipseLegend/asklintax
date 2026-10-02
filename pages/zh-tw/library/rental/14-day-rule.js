import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/rental/14-day-rule.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: '14-day-rule',
  sourceHash:      '217a0779ca93',
  id:            '12',
  title:         '14 天規則：Airbnb 收入何時完全免稅',
  titleEn:       'The 14-day rule: when Airbnb income is completely tax-free',
  category:      'Airbnb & Rental Income',
  categoryHref:  '/library/rental',
  userEmotion:   'organizing',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS Publication 527 — 住宅出租房產（Residential Rental Property，第 5 章）', url: 'https://www.irs.gov/publications/p527' },
    { label: 'IRS — Topic no. 415，出租住宅與度假房產（Renting residential and vacation property）', url: 'https://www.irs.gov/taxtopics/tc415' },
    { label: 'IRS — 了解你的 Form 1099-K（Understanding your Form 1099-K）', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    '14 天規則在美國國稅法（IRC）Section 280A 中有明確規定。主要的複雜之處在於正確計算自用天數 — 自用的定義比大多數人以為的更廣。',
  persona:       ['偶爾出租的 Airbnb 房東', '考慮短租的屋主', '一年出租自家住宅幾週的人'],
  relatedJourney: ['Airbnb 與租金收入', '房產帶來的副業收入'],
  actionRequired: '計算你這一年的出租天數。如果是 14 天以內，確認你也符合自用要求 — 並在決定不申報這筆收入之前，先確認你了解什麼算是「自用天數」。',
}

const FAQS = [
  {
    q: '14 天規則適用於我家的一個房間，還是只適用於整個房產？',
    a: '14 天規則適用於你的整個住家（或居住單位，Dwelling Unit），而不是個別房間。如果你只出租家裡的一個房間，出租那個房間的天數會計入你整個住家的 14 天門檻。不過，如果你出租的是房產上一棟完全獨立的建築（例如獨立的客房小屋），那棟建築會被視為另一個居住單位，有自己的 14 天計算。',
  },
  {
    q: '到底什麼算是「自用天數」？',
    a: '自用天數是指房產被以下任何人使用的日子：你或你的共同擁有人、你的家人（即使他們支付公平市場租金 — 除非這位家人把它當作主要住所並支付公平租金）、以低於公平市場租金使用的任何人，或依互換安排、讓你也能使用他們房產的任何人。重要的是，你待在房產進行修繕或維護的日子，不算自用天數 — 即使你睡在那裡。房產空置的日子也不算。',
  },
  {
    q: '我只出租了 10 天，需要告訴 IRS 任何事嗎？',
    a: '依 14 天規則，你不需要申報這筆租金收入。不過，如果你收到 Airbnb 的 1099-K（一般只在總收款超過 $20,000、而且超過 200 筆交易時才需要寄出），IRS 也收到了同一份表格。你應該保留出租天數、自用天數與 1099-K 的紀錄，作為你決定不申報的依據。如果 IRS 詢問，你就能證明你符合這項排除規定。',
  },
  {
    q: '使用 14 天規則，還能扣除房貸利息和房屋稅嗎？',
    a: '可以 — 但只能作為 Schedule A 上的個人分項扣除額，不能作為出租費用。如果你採用分項扣除，不論是否出租房產，房貸利息與房屋稅都照常在 Schedule A 上申報。在 14 天規則下，你失去的是扣除出租專屬費用的能力，例如清潔費、用品或折舊。取捨就是：免稅收入，換取不能扣除出租費用。',
  },
  {
    q: '如果超過 14 天呢？是全有或全無嗎？',
    a: '是的，就是二選一。一旦出租到第 15 天，這一整年就不再適用 14 天規則 — 你必須申報所有租金收入（不只是第 15 天以後的收入）。不過，你也同時可以按比例扣除出租費用。對大多數出租 15–30 天的房東來說，扣除額往往能大幅抵銷收入，讓淨應稅金額相對較小。',
  },
  {
    q: '我和配偶共同擁有房產，我們每人各有 14 天嗎？',
    a: '沒有。14 天規則適用於居住單位，而不是每一位擁有人。你要把所有擁有人的出租天數合併計算。如果你和配偶各出租 8 天（合計 16 天），即使你們各自只安排了 8 天的出租，也已經超過 14 天門檻。',
  },
  {
    q: '14 天規則適用於我沒有住的度假屋或投資房產嗎？',
    a: '不適用。14 天規則只適用於你自己也使用超過 14 天，或超過以公平市場租金出租天數 10%（以較多者為準）的房產。你從來沒有自己住過的純投資房產，不符合 14 天免稅排除 — 不論出租多少天，所有租金收入都必須申報。',
  },
]

const RELATED = [
  {
    href:  '/library/rental/airbnb-tax-guide',
    cat:   'Airbnb & Rental',
    title: 'Airbnb 房東報稅指南：要申報什麼、可以扣除什麼',
    desc:  '如果出租超過 14 天，這份完整指南涵蓋你需要申報與扣除的一切。',
  },
  {
    href:  '/library/individual/do-i-need-to-file',
    cat:   'Individuals & Families',
    title: '我需要申報美國聯邦稅表嗎？',
    desc:  '依 14 天規則免稅的租金收入不計入你的申報門檻 — 了解你所有的收入如何合在一起看。',
  },
  {
    href:  '/library/individual/tax-credit-vs-deduction',
    cat:   'Individuals & Families',
    title: '抵稅額（tax credit）與扣除額（deduction）有什麼不同？',
    desc:  '了解扣除額怎麼運作，可以幫你在決定出租天數時評估其中的取捨。',
  },
]

export default function FourteenDayRuleZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  const SCENARIOS = [
    { days: 0,    type: 'none',    label: '沒有出租',         rule: '不適用 14 天規則', income: '沒有收入',       deduct: '房貸利息與房屋稅列在 Schedule A', color: 'var(--muted)' },
    { days: 10,   type: 'safe',    label: '出租 10 天',     rule: '✅ 適用 14 天規則', income: '免稅 — 不用申報', deduct: '房貸利息與房屋稅只能列在 Schedule A', color: 'var(--green)' },
    { days: 14,   type: 'safe',    label: '出租 14 天',     rule: '✅ 適用 14 天規則', income: '免稅 — 不用申報', deduct: '房貸利息與房屋稅只能列在 Schedule A', color: 'var(--green)' },
    { days: 15,   type: 'crossed', label: '出租 15 天 ⚠️',  rule: '❌ 必須申報所有收入', income: '所有租金收入都要課稅', deduct: '出租費用按比例扣除（Schedule E）', color: '#F59E0B' },
    { days: 60,   type: 'crossed', label: '出租 60 天',     rule: '❌ 必須申報所有收入', income: '所有租金收入都要課稅', deduct: '出租費用按比例扣除（Schedule E）', color: 'var(--navy)' },
  ]

  return (
    <Layout t={t} locale="zh-tw" meta={{
      title: '14 天規則：Airbnb 收入何時免稅 | AskLinTax 繁體中文',
      description: '如果你一年出租自家住宅 14 天以內，這筆收入完全免稅，也不需要申報。這裡說明規則到底怎麼運作、什麼算出租天數，以及其中的取捨。',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>用白話說明這項規則</h2>
        <p>
          依美國稅法（IRC Section 280A），如果你在一個曆年中出租你的住家 — 或你自己也使用的度假房產 — <strong>14 天以內</strong>，這筆租金收入會完全排除在你的應稅所得之外。你不用申報，也不用繳稅。
        </p>
        <p>
          這有時被稱為「名人賽例外」（Master's exception）或「奧古斯塔規則」（Augusta rule），因為喬治亞州奧古斯塔的屋主每年春天在名人賽高爾夫球賽期間出租房子，讓這項規則廣為人知。
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 其中的取捨</div>
          <p>免稅收入是有代價的：在 14 天規則下，你不能扣除任何出租費用。不能扣清潔費、用品、折舊，也不能分攤水電費。取捨就是：免稅收入，換取不能扣除出租費用。對大多數短租房東來說，這仍然是很划算的交易。</p>
        </div>

        <h2>兩個條件必須同時成立</h2>
        <p>
          14 天規則有兩項要求，兩項都必須符合：
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: 'var(--green-soft)', border: '2px solid var(--green)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '12px' }}>條件 1</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px', lineHeight: '1.35' }}>你出租 14 天以內</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>
              這一曆年中，你以公平市場租金出租給付費房客的總天數必須在 14 天以內。第 15 天就會打破這項規則 — 而且是整年都不適用。
            </p>
          </div>
          <div style={{ background: 'var(--green-soft)', border: '2px solid var(--green)', borderRadius: '12px', padding: '22px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--green)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '12px' }}>條件 2</div>
            <h4 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px', lineHeight: '1.35' }}>你自己也使用這個房產</h4>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: 0 }}>
              你自己使用這個房產的天數必須超過 14 天，或超過以公平市場租金出租天數的 10% — 以較多者為準。你從來沒有自己使用的純投資房產不符合資格。
            </p>
          </div>
        </div>

        <h2>什麼算是出租天數？</h2>
        <p>
          出租天數是指付費房客以公平市場租金入住的任何一天。不滿一天以一整天計算。房產有刊登但沒有人入住的日子不算。
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 低於市價的出租不算出租天數</div>
          <p>如果你以低於公平市場租金的價格租給家人或朋友，那些日子算是<em>自用天數</em>，而不是出租天數。這同時影響 14 天門檻與費用分攤。為了幫家人而用折扣價出租，還以為這樣能壓低出租天數，是很常見的誤解。</p>
        </div>

        <h2>什麼算是自用天數？</h2>
        <p>
          很多人在這裡出錯。自用天數不只是你自己睡在那裡的日子：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>算自用天數嗎？</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>原因</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['✅ 算', '你為了任何私人目的使用這個房產', '直接自用'],
                ['✅ 算', '你的配偶、子女、父母或兄弟姊妹使用（即使他們支付全額租金），除非那是他們的主要住所', '家人使用'],
                ['✅ 算', '任何人以低於公平市場租金使用', '低於市價使用'],
                ['✅ 算', '你依互換安排使用（例如與另一位屋主交換）', '互惠交換'],
                ['❌ 不算', '你待在那裡進行修繕或維護的日子', '即使睡在那裡，維護的日子也排除'],
                ['❌ 不算', '房產空置的日子（沒有房客、也沒有自用）', '既不是出租也不是自用'],
                ['❌ 不算', '家人把它當作主要住所承租，並支付公平租金的日子', '視為付費房客'],
              ].map(([counts, situation, why], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: counts.startsWith('✅') ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{counts}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{situation}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>不同情況下規則如何運作</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '24px 0' }}>
          {SCENARIOS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ minWidth: '140px', padding: '14px 16px', background: s.color + (s.type === 'safe' ? '15' : s.type === 'crossed' ? '10' : '05'), borderRight: '1px solid var(--border-l)' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: s.color }}>{s.label}</div>
                <div style={{ fontSize: '12px', color: s.color, marginTop: '3px', opacity: 0.8 }}>{s.rule}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
                <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border-l)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>收入</div>
                  <div style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>{s.income}</div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>扣除</div>
                  <div style={{ fontSize: '14px', color: 'var(--mid)' }}>{s.deduct}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>策略上的決定：維持在 14 天以內，還是超過？</h2>
        <p>
          對出租天數有彈性的屋主來說，14 天門檻是一個規劃的機會。可以這樣思考：
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>策略</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>最適合的情況</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>需要注意</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['維持在 ≤14 天', '你只要幾個高需求的晚上就能賺到可觀收入（例如大型活動期間）', '你放棄所有出租費用扣除 — 確認免稅收入比你能扣除的金額更有價值'],
                ['超過 14 天', '你有大量出租相關費用（翻修、清潔、折舊），可以產生有用的扣除', '你必須從第一天起申報所有收入，而不只是第 15 天以後的收入'],
                ['剛好維持在門檻以下', '你位在每晚房價很高的觀光區 — 幾個晚上就能產生可觀的免稅收入', '仔細記錄天數 — 多一筆訂房就可能讓整個免稅資格消失'],
              ].map(([strategy, best, watch], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: 'var(--navy)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{strategy}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{best}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ 如果你收到 1099-K，又使用 14 天規則</div>
          <p>
            Airbnb 一般只有在你收到的總款項超過 $20,000、而且超過 200 筆交易時，才需要寄 1099-K 給你（以及 IRS）。如果你符合 14 天排除規定而沒有申報這筆收入，IRS 可能會寄通知詢問這項差異。請保留文件：記錄出租天數與自用天數的行事曆，以及你的 1099-K。如果被詢問，這些就足以證明你符合排除規定。
          </p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

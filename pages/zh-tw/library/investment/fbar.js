import { useState } from 'react'
import Layout from '../../../../components/Layout'
import KnowledgePage from '../../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../../lib/i18n'
import TAX_CONFIG from '../../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

// Traditional Chinese translation of pages/library/investment/fbar.js (the English master).
// sourceHash records the English master version this translation matches (checked by scripts/validate-articles.js).
const META = {
  locale:          'zh-tw',
  sourceArticleId: 'fbar',
  sourceHash:      '38efd8834094',
  id: '20',
  title: 'FBAR：我需要申報海外銀行帳戶嗎？',
  titleEn: 'FBAR: do I need to report my foreign bank accounts?',
  category: 'Investments & Foreign Accounts',
  categoryHref: '/library/investment',
  userEmotion: 'learning',
  difficulty: 'Intermediate',
  readTime: '6 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'FinCEN — 申報海外銀行與金融帳戶（Report Foreign Bank and Financial Accounts）', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — 海外銀行與金融帳戶申報（Report of Foreign Bank and Financial Accounts, FBAR）', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Form 8938 與 FBAR 申報要求比較（Comparison of Form 8938 and FBAR requirements）', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS Publication 519 — 外國人美國稅務指南（U.S. Tax Guide for Aliens）', url: 'https://www.irs.gov/publications/p519' },
  ],
  updatedDate: TAX_CONFIG.lastReviewed,
  taxYear: String(TAX_CONFIG.currentTaxYear),
  confidence: 'FBAR 規則依《銀行保密法》（Bank Secrecy Act）已相當明確。FATCA（Form 8938）是另一項相關但門檻不同的要求 — 兩者可能同時適用。',
  persona: ['在台灣或中國有帳戶的新移民', '綠卡持有人', '有海外帳戶的美國公民', '在美國境外有銀行帳戶的人'],
  relatedJourney: ['剛到美國', '跨境財務'],
  actionRequired: '確認你的海外金融帳戶合計價值，是否在這一曆年中任何時候超過 $10,000。如果是，你必須在 4 月 15 日前申報 FinCEN Form 114（FBAR），並自動延期至 10 月 15 日。請在 BSA E-Filing System（bsaefiling.fincen.treas.gov）申報 — 它與你的稅表是分開的。',
}

const FAQS = [
  { q: '如果我的海外帳戶沒有產生利息，還需要申報 FBAR 嗎？', a: '需要。FBAR 申報義務只看帳戶餘額 — 與帳戶是否產生收入無關。如果你的海外帳戶合計在這一年中任何時候超過 $10,000，不論帳戶是否產生收入或報酬，你都必須申報。' },
  { q: '$10,000 門檻是每個帳戶分開算，還是所有帳戶合計？', a: '合計。測試是你擁有或有簽名權的所有海外金融帳戶，合計價值（Aggregate Value）在這一年中任何時候是否超過 $10,000。如果超過，所有帳戶都必須申報 — 包括個別從未超過 $10,000 的帳戶。' },
  { q: '我台灣的父母把我的名字加到他們的銀行帳戶上，我需要申報嗎？', a: '需要，如果你對這個帳戶有簽名權或財務權益。名列帳戶持有人 — 即使只是為了方便的簽名人 — 在達到合計門檻時，通常就會產生 FBAR 申報義務。即使你從未使用這個帳戶或從中獲益，也應該在 FBAR 上申報。' },
  { q: '沒有申報 FBAR 的罰款是多少？', a: '罰款可能很重。美國法典 Title 31 規定了非故意與故意違規的民事罰款（故意違規的罰款高得多），也可能有刑事處罰。民事罰款上限每年依通膨調整 — 網路上常見的數字，例如非故意違規 $10,000，或故意違規為 $100,000 與帳戶餘額 50% 兩者中較高者，是 2016 年 8 月 1 日以前核定罰款的上限，而不是現在的金額。IRS 是否核定罰款，取決於具體事實與情況。IRS 為逾期申報者提供自願揭露（Voluntary Disclosure）計畫，可以大幅降低罰款 — 如果你有未申報的 FBAR，請諮詢稅務專業人士。' },
  { q: 'FBAR 和 FATCA（Form 8938）有什麼不同？', a: '兩者都要求申報海外帳戶，但是不同的要求，門檻也不同。FBAR（FinCEN 114）：門檻 $10,000，另外向 FinCEN（不是 IRS）申報。FATCA／Form 8938：門檻較高（單身申報人 $50,000，夫妻合併申報 $100,000），隨稅表向 IRS 申報。許多有海外帳戶的人兩者都必須申報。兩者不能互相取代 — 申報其中一項，不代表另一項也完成了。' },
  { q: '我的微信支付或支付寶餘額需要申報嗎？', a: 'IRS 對微信支付、支付寶這類數位支付帳戶的具體指引有限。一般原則是，如果它們被視為外國金融機構的「金融帳戶」，大額餘額可能需要申報。由於指引仍在發展中，如果你在這些平台上有大額餘額，請諮詢熟悉國際稅務申報的 CPA。' },
  { q: '我以前幾年漏報了 FBAR，該怎麼辦？', a: '不要置之不理。IRS 為逾期申報 FBAR 的人提供兩個主要計畫：簡易申報程序（Streamlined Filing Procedures，適用非故意違規 — 罰款降低，住在海外者可能免罰），以及逾期 FBAR 提交程序（Delinquent FBAR Submission Procedures，適用沒有其他問題的逾期申報者）。主動出面幾乎總是比被查到的結果好。補報逾期 FBAR 之前，請先諮詢稅務律師或 CPA。' },
]

const RELATED = [
  { href: '/library/investment/fbar-10000-rule', cat: 'Investments & Foreign Accounts', title: '海外帳戶超過 $10,000 就要報 FBAR 嗎？', desc: '進一步說明 $10,000 合計門檻，並以多個小額帳戶舉例。' },
  { href: '/library/individual/new-immigrant', cat: 'Individuals & Families', title: '剛來美國？新移民完整報稅指南', desc: '對來自中國與台灣的新移民來說，FBAR 是最常被遺漏的義務之一。' },
  { href: '/library/investment/crypto-tax', cat: 'Investments & Crypto', title: '加密貨幣稅務說明：什麼時候要繳稅？', desc: '存放在海外交易所的加密貨幣，也可能需要申報 FBAR。兩項義務都要了解。' },
  { href: '/library/individual/tax-residency', cat: 'Individuals & Families', title: '我是美國稅務居民嗎？', desc: 'FBAR 適用於美國人 — 公民、綠卡持有人，以及通過實質居留測試的居民外國人。' },
]

export default function FBARZhTwPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} locale="zh-tw" meta={{ title: 'FBAR：我需要申報海外銀行帳戶嗎？ | AskLinTax 繁體中文', description: 'FBAR（海外銀行帳戶申報）完整說明 — $10,000 門檻、誰必須申報、如何申報 FinCEN Form 114、未申報的罰款，以及 FBAR 與 FATCA 的差異。' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED} locale="zh-tw">

        <h2>什麼是 FBAR？</h2>
        <p>FBAR 是 <strong>Foreign Bank Account Report</strong>（海外銀行帳戶申報）的縮寫 — 正式名稱是 FinCEN Form 114。這是依《銀行保密法》訂定的揭露要求：如果海外金融帳戶的合計最高價值在<strong>這一曆年中任何時候超過 $10,000</strong>，美國人（U.S. Person）就必須申報。</p>
        <p>FBAR 不是稅 — 申報時不用繳任何錢。它是一份揭露，告訴美國政府你在海外有帳戶。但未申報的罰款很重，而許多在台灣或中國有帳戶的華人移民家庭，並不知道這項要求適用於自己。</p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 這讓大多數來自中國與台灣的新移民很意外</div>
          <p>如果你搬到美國後，在台灣或中國仍有銀行帳戶、投資帳戶或其他金融帳戶 — 而且這些帳戶合計在這一年中任何時候超過 $10,000 — 你就必須申報 FBAR。即使帳戶沒有產生收入，即使你不必為這些帳戶繳任何美國稅，這項要求仍然適用。</p>
        </div>

        <h2>誰必須申報 FBAR？</h2>
        <p>擁有超過門檻的海外金融帳戶的「美國人」必須申報。美國人包括：</p>
        <ul>
          <li>美國公民（包括雙重國籍者）</li>
          <li>綠卡持有人（永久居民）</li>
          <li>居民外國人（通過實質居留測試的人）</li>
          <li>美國的公司、合夥事業、LLC、信託與遺產</li>
        </ul>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>你的身分</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>必須申報 FBAR 嗎？</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>說明</th>
            </tr></thead>
            <tbody>{[
              ['美國公民', '✅ 是（如果達到門檻）', '不論你住在哪裡'],
              ['綠卡持有人', '✅ 是（如果達到門檻）', '即使這一年大部分時間在海外'],
              ['居民外國人（通過實質居留測試）', '✅ 是（如果達到門檻）', '包括在美國待了足夠時間的多數 H-1B 持有人'],
              ['非居民外國人（F-1 前 5 年）', '❌ 一般不用', '在 FBAR 上不是美國人'],
              ['J-1 教師或受訓人員（一般為前 2 年）', '❌ 一般不用', '在 FBAR 上不是美國人'],
            ].map(([status, must, note], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{status}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '600', color: must.startsWith('✅') ? 'var(--red)' : 'var(--green)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{must}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <h2>$10,000 門檻怎麼算</h2>
        <p>門檻是一年中任何一個時間點，<strong>所有海外帳戶合計 $10,000</strong> — 不是年底餘額，也不是平均餘額。</p>
        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '22px', margin: '24px 0' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '14px' }}>例子：</div>
          {[
            { example: '6 月 30 日當天，帳戶 A（台灣銀行）有 $8,000，帳戶 B（中國券商）有 $4,000 — 同一天合計 $12,000。', result: '✅ 必須申報 FBAR — 兩個帳戶都要申報', color: 'var(--red)' },
            { example: '一個台灣銀行帳戶，任何時候的最高餘額：$9,500。', result: '❌ 不需要申報 FBAR — 從未超過 $10,000', color: 'var(--green)' },
            { example: '帳戶餘額 1 月是 $12,000，之後一整年降到 $3,000。', result: '✅ 必須申報 FBAR — 1 月的 $12,000 超過門檻', color: 'var(--red)' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '14px' : '0', padding: '14px 16px', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border-l)' }}>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '8px', lineHeight: '1.65' }}>{item.example}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>{item.result}</div>
            </div>
          ))}
        </div>

        <h2>哪些帳戶必須申報？</h2>
        <p>FBAR 涵蓋範圍很廣的海外金融帳戶：</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '24px 0' }}>
          {[
            { title: '必須申報 ✅', color: 'var(--red)', items: ['銀行帳戶（活存、支票、定存）', '券商與投資帳戶', '共同基金帳戶', '退休金與退休帳戶', '有現金價值的壽險保單', '你有簽名權的帳戶（即使不是你的錢）'] },
            { title: '一般不用申報 ❌', color: 'var(--green)', items: ['直接持有的不動產（不是透過外國實體）', '直接持有的貴金屬', '個人持有的外幣（不在帳戶中）', '社會保險計畫（例如台灣的勞保）', '借給外國人的無擔保借款'] },
          ].map((section, i) => (
            <div key={i} style={{ background: i === 0 ? 'var(--red-soft)' : 'var(--green-soft)', border: `1.5px solid ${section.color}25`, borderRadius: '12px', padding: '18px 16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: section.color, marginBottom: '12px' }}>{section.title}</h4>
              {section.items.map((item, j) => (
                <div key={j} style={{ fontSize: '14px', color: 'var(--mid)', padding: '4px 0', display: 'flex', gap: '8px' }}>
                  <span style={{ color: section.color, flexShrink: 0 }}>·</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <h2>如何申報 FBAR</h2>
        <ol>
          <li><strong>以電子方式申報</strong>：在 BSA E-Filing System：<strong>bsaefiling.fincen.treas.gov</strong>。這和 IRS.gov 是分開的 — FBAR 不隨稅表申報。</li>
          <li><strong>截止日：</strong>4 月 15 日，並<strong>自動延期至 10 月 15 日</strong>。不需要申請延期 — 是自動的。</li>
          <li><strong>申報內容：</strong>每一個海外帳戶的銀行名稱與地址、帳號、帳戶類型、這一年中的最高價值（用 12 月 31 日的匯率或財政部匯率換算成美元）。</li>
          <li><strong>不用繳稅：</strong>FBAR 只是揭露。申報時不用繳任何錢。</li>
        </ol>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead><tr style={{ background: 'var(--navy)', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>FBAR（FinCEN 114）</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>FATCA（Form 8938）</th>
            </tr></thead>
            <tbody>{[
              ['申報對象', 'FinCEN（bsaefiling.fincen.treas.gov）', 'IRS（隨你的稅表）'],
              ['門檻 — 單身', '任何時候合計 $10,000', '年底 $50,000 或任何時候 $75,000'],
              ['門檻 — 夫妻合併申報', '任何時候合計 $10,000', '年底 $100,000 或任何時候 $150,000'],
              ['截止日', '4 月 15 日（自動延期至 10 月 15 日）', '稅表截止日（4 月 15 日 + 延期）'],
              ['如果兩者都適用', '申報 FBAR', '也要申報 Form 8938 — 兩者不能互相取代'],
            ].map(([feat, fbar, fatca], i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{fbar}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{fatca}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="callout callout-action">
          <div className="callout-title">✅ 如果你以前幾年漏報了 FBAR</div>
          <p>不要置之不理。IRS 的簡易申報程序（Streamlined Filing Procedures）讓非故意的逾期申報者主動出面，罰款可以大幅降低 — 住在海外的納稅人有時可以免罰。主動揭露的結果，幾乎總是比被發現好。補報逾期 FBAR 之前，請先諮詢有國際稅務合規經驗的稅務律師或 CPA。</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

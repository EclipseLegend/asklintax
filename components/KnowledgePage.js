import Link from 'next/link'
import { CATEGORIES } from '../lib/categories'
import { CATEGORIES_ZH_TW } from '../lib/library-zh-tw'
import { localePath } from '../lib/locale-routes'
import { formatMonthYear } from '../lib/library-i18n'
import styles from './KnowledgePage.module.css'

// Official category for a Library URL ("/library/<category>" or "/library/<category>/<slug>").
function categoryFor(href = '') {
  const segment = href.split('/')[2]
  return CATEGORIES.find(c => c.path === `/library/${segment}/`)
}

// Trailing-slash form of an internal page URL (matches next.config.js trailingSlash: true).
const withSlash = href => (href && !href.endsWith('/') && !/[?#]/.test(href) ? `${href}/` : href)

// Interface text. English is the master; 'zh-tw' is used by the Traditional Chinese
// translations in pages/zh-tw/library/ (each one translates its English master guide).
const UI = {
  en: {
    home: 'Home',
    library: 'Knowledge Library',
    emotions: {
      anxious:  { emoji: '😨', label: 'For anxious readers — action steps first' },
      deciding: { emoji: '🤔', label: 'For readers making a decision' },
      learning: { emoji: '📚', label: 'For readers building their knowledge' },
      reminder: { emoji: '⏰', label: 'Action or deadline required' },
      opportunity: { emoji: '😊', label: 'You may qualify for a benefit' },
    },
    foundation: 'Foundation',
    difficulty: d => d,
    readTime: t => t,
    verified: 'Official Sources Verified',
    updated: 'Updated',
    taxYear: y => `Tax Year ${y}`,
    actionRequired: 'Action required: ',
    quickFacts: 'Quick facts',
    factDifficulty: 'Difficulty',
    factTaxYear: 'Tax Year',
    factWho: 'Who this is for',
    factConfidence: 'Confidence',
    afterReading: 'After reading this',
    lifeSituation: 'Life situation',
    cpaTitle: 'When to consult a CPA',
    cpaNote: 'This article provides general educational information. Your specific situation — especially if you have multiple business owners, foreign income, or are a non-resident — may require professional advice before making decisions.',
    cpaLink: 'Learn about our standards →',
    faq: 'Frequently asked questions',
    sources: 'Official sources',
    sourcesIntro: y => `AskLinTax checked this guide against the following official government sources for the ${y} tax year. Listing a source does not mean that agency reviewed or endorses AskLinTax.`,
    trustVerified: 'Official Sources Verified — checked by AskLinTax against the official government sources listed above',
    trustDraft: 'Draft — not yet verified against official sources',
    trustMeta: (id, date, y) => `Foundation ${id} · Last reviewed ${date} · Applies to ${y} tax year`,
    disclaimer: c => `${c}. This article is for general educational purposes and does not constitute tax advice. Consult a qualified tax professional for your specific situation.`,
    related: 'Related guides',
  },
  'zh-tw': {
    home: '首頁',
    library: '稅務知識庫',
    emotions: {
      anxious:  { emoji: '😨', label: '給正在擔心的讀者 — 先看行動步驟' },
      deciding: { emoji: '🤔', label: '給正在做決定的讀者' },
      learning: { emoji: '📚', label: '給想建立基礎觀念的讀者' },
      reminder: { emoji: '⏰', label: '需要採取行動或注意截止日' },
      opportunity: { emoji: '😊', label: '你可能符合某項福利資格' },
    },
    foundation: '基礎指南',
    difficulty: d => ({ Beginner: '入門', Intermediate: '進階', Advanced: '深入' }[d] || d),
    readTime: t => { const m = /(\d+)/.exec(t); return m ? `${m[1]} 分鐘閱讀` : t },
    verified: '官方來源查核',
    updated: '更新於',
    taxYear: y => `${y} 稅務年度`,
    actionRequired: '需要採取行動：',
    quickFacts: '重點摘要',
    factDifficulty: '難度',
    factTaxYear: '稅務年度',
    factWho: '適合對象',
    factConfidence: '適用範圍',
    afterReading: '讀完之後',
    lifeSituation: '生活情境',
    cpaTitle: '什麼時候該找會計師（CPA）？',
    cpaNote: '本文提供一般教育資訊。你的具體情況 — 特別是有多位企業負責人、有海外收入，或你是非居民 — 在做決定前可能需要專業意見。',
    cpaLink: '了解我們的標準（英文）→',
    faq: '常見問題',
    sources: '官方來源',
    sourcesIntro: y => `AskLinTax 已依下列官方政府來源，查核本指南的英文原文（${y} 稅務年度）。列出來源不代表該機關審核或背書 AskLinTax。`,
    trustVerified: '官方來源查核 — 本指南的英文原文已由 AskLinTax 依上列官方政府來源查核',
    trustDraft: '草稿 — 尚未依官方來源查核',
    trustMeta: (id, date, y) => `基礎指南 ${id} · 最後審閱：${date} · 適用 ${y} 稅務年度`,
    disclaimer: c => `${c.replace(/[。.]$/, '')}。本文僅供一般教育用途，不構成稅務建議。請就你的具體情況諮詢合格的稅務專業人士。`,
    translationNote: '本指南依據 AskLinTax 已完成官方來源查核的英文原文翻譯整理。重要稅務名詞保留英文，方便你對照 IRS 表格與官方資料。若翻譯內容與英文原文或官方來源有差異，以英文原文及官方來源為準。',
    related: '相關指南',
  },
}

/**
 * KnowledgePage — Gold Standard Template for Foundation guides
 *
 * Props:
 *   meta          — Knowledge Object metadata (id, title, category, etc.)
 *                   Traditional Chinese translations also set titleEn (the English master title).
 *   faqs          — Array of { q, a }
 *   openFaq       — State object from parent
 *   toggleFaq     — Function from parent
 *   relatedArticles — Array of { href, cat, title, desc } (English hrefs; localized automatically)
 *   locale        — 'en' (default) or 'zh-tw'
 *   children      — Main article content (JSX)
 */
export default function KnowledgePage({
  meta,
  faqs = [],
  openFaq = {},
  toggleFaq,
  relatedArticles = [],
  locale = 'en',
  children,
}) {
  const zh = locale === 'zh-tw'
  const T = UI[locale] || UI.en
  const L = path => localePath(path, locale)
  const emotion = T.emotions[meta.userEmotion] || T.emotions.learning
  // Publication status: every published guide is 'official-sources-verified' (see lib/articles.js).
  const verified = meta.verification === 'official-sources-verified'
  const updatedDate = formatMonthYear(meta.updatedDate, locale)

  // Structural labels come from the official taxonomy (lib/categories.js); META text is the fallback.
  const categoryName = href => {
    const c = categoryFor(href)
    if (!c) return null
    return zh ? (CATEGORIES_ZH_TW[c.key] || {}).name || c.name : c.name
  }
  const category = categoryFor(meta.categoryHref)
  const catName = categoryName(meta.categoryHref) || meta.category
  const categoryHref = L(category ? category.path : withSlash(meta.categoryHref))

  return (
    <div className={styles.wrap}>

      {/* ── PAGE HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <nav className={styles.breadcrumb}>
            <Link href={L('/')}>{T.home}</Link>
            <span>›</span>
            <Link href={L('/library/')}>{T.library}</Link>
            <span>›</span>
            <Link href={categoryHref}>{catName}</Link>
            <span>›</span>
            <span>{meta.title}</span>
          </nav>

          <div className={styles.heroMeta}>
            <span className={`tag tag-navy ${styles.catTag}`}>{catName}</span>
            <span className={styles.emotionTag}>{emotion.emoji} {emotion.label}</span>
          </div>

          <h1 className={styles.heroTitle}>{meta.title}</h1>
          {zh && meta.titleEn && <p className={styles.heroTitleEn} lang="en">{meta.titleEn}</p>}
          <p className={styles.heroId}>{T.foundation} {meta.id} · {T.difficulty(meta.difficulty)}</p>

          <div className={styles.heroStats}>
            <span>⏱ {T.readTime(meta.readTime)}</span>
            <span className={styles.statDivider}>·</span>
            {verified && (
              <span className={styles.cpaBadge}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                {T.verified}
              </span>
            )}
            {verified && <span className={styles.statDivider}>·</span>}
            <span>{T.updated} {updatedDate}</span>
            <span className={styles.statDivider}>·</span>
            <span>{T.taxYear(meta.taxYear)}</span>
          </div>
        </div>
      </section>

      {/* ── ACTION REQUIRED BANNER (anxious/reminder only) ── */}
      {(meta.userEmotion === 'anxious' || meta.userEmotion === 'reminder') && meta.actionRequired && (
        <div className={styles.actionBanner}>
          <div className="container">
            <div className={styles.actionBannerInner}>
              <span className={styles.actionBannerIcon}>⚡</span>
              <div>
                <strong>{T.actionRequired}</strong>
                <span>{meta.actionRequired}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className={`${styles.main} container`}>
        <div className={styles.layout}>

          {/* ── ARTICLE ── */}
          <article className={`${styles.article} article-body`}>
            {children}
          </article>

          {/* ── SIDEBAR ── */}
          <aside className={styles.sidebar}>

            {/* Quick Facts */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>{T.quickFacts}</h3>
              <dl className={styles.factList}>
                <div className={styles.factRow}>
                  <dt>{T.factDifficulty}</dt>
                  <dd>{T.difficulty(meta.difficulty)}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>{T.factTaxYear}</dt>
                  <dd>{meta.taxYear}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>{T.factWho}</dt>
                  <dd>{meta.persona.join(zh ? '、' : ', ')}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>{T.factConfidence}</dt>
                  <dd className={styles.confidenceNote}>{meta.confidence}</dd>
                </div>
              </dl>
            </div>

            {/* Action Required (deciding / learning) */}
            {(meta.userEmotion === 'deciding' || meta.userEmotion === 'learning') && meta.actionRequired && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>{T.afterReading}</h3>
                <p className={styles.actionNote}>{meta.actionRequired}</p>
              </div>
            )}

            {/* Related Journey */}
            {meta.relatedJourney && meta.relatedJourney.length > 0 && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>{T.lifeSituation}</h3>
                <div className={styles.journeyList}>
                  {meta.relatedJourney.map(j => (
                    <Link key={j} href={zh ? '/zh-tw/start/' : `/start#${j.toLowerCase().replace(/ /g, '-')}`} className={styles.journeyItem}>
                      → {j}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CPA Note */}
            <div className={`${styles.sideCard} ${styles.sideCardDark}`}>
              <h3 className={`${styles.sideTitle} ${styles.sideTitleLight}`}>{T.cpaTitle}</h3>
              <p className={styles.cpaNote}>{T.cpaNote}</p>
              <Link href="/about" className={styles.cpaLink} {...(zh ? { hrefLang: 'en' } : {})}>{T.cpaLink}</Link>
            </div>

          </aside>
        </div>

        {/* ── FAQ SECTION ── */}
        {faqs.length > 0 && (
          <section className={styles.faqSection}>
            <h2 className={styles.sectionHeading}>{T.faq}</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => {
                const isOpen = !!openFaq[i]
                return (
                  <div key={i} className="faq-item" data-open={isOpen}>
                    <button className="faq-q" onClick={() => toggleFaq && toggleFaq(i)}>
                      {faq.q}
                      <span className={styles.faqIcon} style={{
                        background: isOpen ? 'var(--navy)' : 'var(--slate)',
                        color: isOpen ? '#fff' : 'var(--navy)',
                      }}>
                        {isOpen ? '×' : '+'}
                      </span>
                    </button>
                    <div className="faq-a">{faq.a}</div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── OFFICIAL SOURCES (meta.sources: [{ label, url }] — official government sources only) ── */}
        {meta.sources && meta.sources.length > 0 && (
          <section className={styles.sourcesSection} data-official-sources="">
            <h2 className={styles.sectionHeading}>{T.sources}</h2>
            <p className={styles.sourcesIntro}>{T.sourcesIntro(meta.taxYear)}</p>
            <ul className={styles.sourcesList}>
              {meta.sources.map(s => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── TRUST FOOTER ── */}
        <div className={styles.trustFooter}>
          {verified ? (
            <div className={styles.trustBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
              {T.trustVerified}
            </div>
          ) : (
            <div className={`${styles.trustBadge} ${styles.trustBadgePending}`}>
              {T.trustDraft}
            </div>
          )}
          <span className={styles.trustMeta}>
            {T.trustMeta(meta.id, updatedDate, meta.taxYear)}
          </span>
          {zh && (
            <p className={styles.trustDisclaimer} data-translation-note="">{T.translationNote}</p>
          )}
          <p className={styles.trustDisclaimer}>
            {T.disclaimer(meta.confidence)}
          </p>
        </div>

        {/* ── RELATED ARTICLES ── */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionHeading}>{T.related}</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map(article => (
                <Link key={article.href} href={L(withSlash(article.href))} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{categoryName(article.href) || article.cat}</span>
                  <h4 className={styles.relatedTitle}>{article.title}</h4>
                  <p className={styles.relatedDesc}>{article.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

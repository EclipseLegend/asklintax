import Link from 'next/link'
import { CATEGORIES } from '../lib/categories'
import styles from './KnowledgePage.module.css'

// Official category for a Library URL ("/library/<category>" or "/library/<category>/<slug>").
function categoryFor(href = '') {
  const segment = href.split('/')[2]
  return CATEGORIES.find(c => c.path === `/library/${segment}/`)
}

// Trailing-slash form of an internal page URL (matches next.config.js trailingSlash: true).
const withSlash = href => (href && !href.endsWith('/') && !/[?#]/.test(href) ? `${href}/` : href)

/**
 * KnowledgePage — Gold Standard Template for Foundation 20
 *
 * Props:
 *   meta          — Knowledge Object metadata (id, title, category, etc.)
 *   faqs          — Array of { q, a }
 *   openFaq       — State object from parent
 *   toggleFaq     — Function from parent
 *   relatedArticles — Array of { href, cat, title, desc }
 *   children      — Main article content (JSX)
 */
export default function KnowledgePage({
  meta,
  faqs = [],
  openFaq = {},
  toggleFaq,
  relatedArticles = [],
  children,
}) {
  const emotionConfig = {
    anxious:  { emoji: '😨', label: 'For anxious readers — action steps first' },
    deciding: { emoji: '🤔', label: 'For readers making a decision' },
    learning: { emoji: '📚', label: 'For readers building their knowledge' },
    reminder: { emoji: '⏰', label: 'Action or deadline required' },
    opportunity: { emoji: '😊', label: 'You may qualify for a benefit' },
  }
  const emotion = emotionConfig[meta.userEmotion] || emotionConfig.learning
  // Publication status: every published guide is 'official-sources-verified' (see lib/articles.js).
  const verified = meta.verification === 'official-sources-verified'

  // Structural labels come from the official taxonomy (lib/categories.js); META text is the fallback.
  const category = categoryFor(meta.categoryHref)
  const categoryName = category ? category.name : meta.category
  const categoryHref = category ? category.path : withSlash(meta.categoryHref)

  return (
    <div className={styles.wrap}>

      {/* ── PAGE HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/library/">Knowledge Library</Link>
            <span>›</span>
            <Link href={categoryHref}>{categoryName}</Link>
            <span>›</span>
            <span>{meta.title}</span>
          </nav>

          <div className={styles.heroMeta}>
            <span className={`tag tag-navy ${styles.catTag}`}>{categoryName}</span>
            <span className={styles.emotionTag}>{emotion.emoji} {emotion.label}</span>
          </div>

          <h1 className={styles.heroTitle}>{meta.title}</h1>
          <p className={styles.heroId}>Foundation {meta.id} · {meta.difficulty}</p>

          <div className={styles.heroStats}>
            <span>⏱ {meta.readTime}</span>
            <span className={styles.statDivider}>·</span>
            {verified && (
              <span className={styles.cpaBadge}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                Official Sources Verified
              </span>
            )}
            {verified && <span className={styles.statDivider}>·</span>}
            <span>Updated {meta.updatedDate}</span>
            <span className={styles.statDivider}>·</span>
            <span>Tax Year {meta.taxYear}</span>
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
                <strong>Action required: </strong>
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
              <h3 className={styles.sideTitle}>Quick facts</h3>
              <dl className={styles.factList}>
                <div className={styles.factRow}>
                  <dt>Difficulty</dt>
                  <dd>{meta.difficulty}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>Tax Year</dt>
                  <dd>{meta.taxYear}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>Who this is for</dt>
                  <dd>{meta.persona.join(', ')}</dd>
                </div>
                <div className={styles.factRow}>
                  <dt>Confidence</dt>
                  <dd className={styles.confidenceNote}>{meta.confidence}</dd>
                </div>
              </dl>
            </div>

            {/* Action Required (deciding / learning) */}
            {(meta.userEmotion === 'deciding' || meta.userEmotion === 'learning') && meta.actionRequired && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>After reading this</h3>
                <p className={styles.actionNote}>{meta.actionRequired}</p>
              </div>
            )}

            {/* Related Journey */}
            {meta.relatedJourney && meta.relatedJourney.length > 0 && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Life situation</h3>
                <div className={styles.journeyList}>
                  {meta.relatedJourney.map(j => (
                    <Link key={j} href={`/start#${j.toLowerCase().replace(/ /g, '-')}`} className={styles.journeyItem}>
                      → {j}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CPA Note */}
            <div className={`${styles.sideCard} ${styles.sideCardDark}`}>
              <h3 className={`${styles.sideTitle} ${styles.sideTitleLight}`}>When to consult a CPA</h3>
              <p className={styles.cpaNote}>
                This article provides general educational information. Your specific situation — especially if you have multiple business owners, foreign income, or are a non-resident — may require professional advice before making decisions.
              </p>
              <Link href="/about" className={styles.cpaLink}>Learn about our standards →</Link>
            </div>

          </aside>
        </div>

        {/* ── FAQ SECTION ── */}
        {faqs.length > 0 && (
          <section className={styles.faqSection}>
            <h2 className={styles.sectionHeading}>Frequently asked questions</h2>
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
            <h2 className={styles.sectionHeading}>Official sources</h2>
            <p className={styles.sourcesIntro}>
              AskLinTax checked this guide against the following official government sources for the {meta.taxYear} tax year. Listing a source does not mean that agency reviewed or endorses AskLinTax.
            </p>
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
              Official Sources Verified — checked by AskLinTax against the official government sources listed above
            </div>
          ) : (
            <div className={`${styles.trustBadge} ${styles.trustBadgePending}`}>
              Draft — not yet verified against official sources
            </div>
          )}
          <span className={styles.trustMeta}>
            Foundation {meta.id} · Last reviewed {meta.updatedDate} · Applies to {meta.taxYear} tax year
          </span>
          <p className={styles.trustDisclaimer}>
            {meta.confidence}. This article is for general educational purposes and does not constitute tax advice. Consult a qualified tax professional for your specific situation.
          </p>
        </div>

        {/* ── RELATED ARTICLES ── */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionHeading}>Related guides</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map(article => (
                <Link key={article.href} href={withSlash(article.href)} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{categoryFor(article.href)?.name || article.cat}</span>
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

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../Layout'
import ArticleCard from './ArticleCard'
import { useTranslation } from '../../lib/i18n'
import { ARTICLES } from '../../lib/articles'
import { LIBRARY_ESSENTIALS, LIBRARY_SITUATIONS } from '../../lib/categories'
import { getCategories, getArticle, formatMonthYear } from '../../lib/library-i18n'
import { localePath } from '../../lib/locale-routes'
import { searchArticles } from '../../lib/search'
import TAX_CONFIG from '../../lib/tax-config'
import styles from './library.module.css'

/**
 * Knowledge Library landing page (/library/).
 * All content comes from lib/articles.js, lib/categories.js, TAX_CONFIG, and locales/<lang>/library.json.
 *
 * Search (lib/search.js) runs in the browser over the published article index.
 * The URL (/library/?q=...) is the source of truth: submitting or choosing an example
 * updates ?q= with a shallow route change; loading /library/?q=... shows the same results.
 * The static HTML never contains results, and the canonical stays /library/.
 */
export default function LibraryHome({ translations, locale = 'en' }) {
  const { t } = useTranslation(translations.common)
  const { t: tl } = useTranslation(translations.library)
  const router = useRouter()
  const L = path => localePath(path, locale)
  const isEn = locale === 'en'
  const CATEGORIES = getCategories(locale)

  const byCategory = key => ARTICLES.filter(a => a.category === key)
  const guideCount = n => tl(n === 1 ? 'category.guideCountOne' : 'category.guideCountOther').replace('{count}', n)
  const examples = tl('home.examples')

  // ── Search state ──
  const rawQuery = router.isReady && typeof router.query.q === 'string' ? router.query.q : ''
  const query = rawQuery.trim().replace(/\s+/g, ' ')
  const results = useMemo(() => (query ? searchArticles(query, { locale }) : []), [query, locale])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const resultsHeadingRef = useRef(null)
  const focusResultsNext = useRef(false)

  // Keep the field in sync with the URL (direct links, back/forward).
  useEffect(() => { if (router.isReady) setInput(query) }, [router.isReady, query])

  // After a user-initiated search, move focus to the results heading.
  useEffect(() => {
    if (focusResultsNext.current && query) {
      focusResultsNext.current = false
      resultsHeadingRef.current?.focus()
    }
  }, [query])

  function runSearch(value) {
    const q = value.trim().replace(/\s+/g, ' ')
    if (!q) return clearSearch()
    setInput(q)
    if (q === query) return resultsHeadingRef.current?.focus()
    focusResultsNext.current = true
    const url = { pathname: router.pathname, query: { q } }
    // First search adds one history entry; later searches replace it.
    if (query) router.replace(url, undefined, { shallow: true, scroll: false })
    else router.push(url, undefined, { shallow: true, scroll: false })
  }

  function clearSearch() {
    setInput('')
    if (query) router.replace({ pathname: router.pathname }, undefined, { shallow: true, scroll: false })
    inputRef.current?.focus()
  }

  const resultCount = tl(results.length === 1 ? 'search.countOne' : 'search.countOther').replace('{count}', results.length)
  const statusText = !query ? '' : results.length
    ? (isEn
      ? `${tl('search.resultsFor').replace('{query}', query)}. ${resultCount}.`
      : `${tl('search.resultsFor').replace('{query}', query)}。${resultCount}。`)
    : tl('search.noResultsTitle').replace('{query}', query)

  return (
    <Layout t={t} locale={locale} meta={{ title: tl('home.seoTitle'), description: tl('home.seoDescription') }}>

      {/* ── HERO + SEARCH ── */}
      <section className={styles.libHero}>
        <div className={`${styles.heroInner} container`}>
          <nav className={styles.breadcrumb} aria-label={isEn ? 'Breadcrumb' : '導覽路徑'}>
            <Link href={L('/')}>{tl('breadcrumb.home')}</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{tl('breadcrumb.library')}</span>
          </nav>

          <h1 className={styles.libHeroTitle}>
            {tl('home.titleBefore')} <em>{tl('home.titleAccent')}</em>
          </h1>
          <p className={styles.libHeroSub}>{tl('home.sub')}</p>

          {/* Without JavaScript this still works as a normal GET to /library/?q=... */}
          <form
            className={styles.search}
            role="search"
            action={L('/library/')}
            method="get"
            aria-label={tl('home.searchLabel')}
            onSubmit={e => { e.preventDefault(); runSearch(input) }}
          >
            <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <label htmlFor="library-search" className={styles.visuallyHidden}>{tl('home.searchLabel')}</label>
            <input
              ref={inputRef}
              id="library-search"
              type="search"
              name="q"
              autoComplete="off"
              placeholder={tl('home.searchPlaceholder')}
              className={styles.searchInput}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>{tl('home.searchButton')}</button>
          </form>

          <div className={styles.examples}>
            <span className={styles.examplesLabel}>{tl('home.examplesLabel')}</span>
            {Array.isArray(examples) && examples.map(q => (
              <button key={q} type="button" className={styles.exampleChip} onClick={() => runSearch(q)}>{q}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Announces result counts to screen readers */}
      <p className={styles.visuallyHidden} role="status" aria-live="polite">{statusText}</p>

      {/* ── SEARCH RESULTS (only when ?q= is present) ── */}
      {query && (
        <section className={styles.resultsSection} aria-labelledby="search-results-title">
          <div className="container">
            <div className={styles.resultsHead}>
              <div>
                <span className="section-label">{tl('search.label')}</span>
                <h2 id="search-results-title" ref={resultsHeadingRef} tabIndex={-1} className={`${styles.sectionTitle} ${styles.resultsTitle}`}>
                  {results.length
                    ? tl('search.resultsFor').replace('{query}', query)
                    : tl('search.noResultsTitle').replace('{query}', query)}
                </h2>
                <p className={styles.sectionSub}>{results.length ? resultCount : tl('search.noResultsSub')}</p>
              </div>
              <button type="button" className={styles.clearSearch} onClick={clearSearch}>
                <span aria-hidden="true">×</span> {tl('search.clear')}
              </button>
            </div>

            {results.length > 0 ? (
              <div className={styles.cardGrid}>
                {results.map(a => <ArticleCard key={a.id} id={a.id} showCategory t={tl} locale={locale} />)}
              </div>
            ) : (
              <div className={styles.noResultsLinks}>
                <a href="#topics" className="btn-outline">{tl('search.browseTopics')} ↓</a>
                <Link href={L('/start/')} className="btn-outline">{tl('search.goToStart')} →</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── BROWSE BY TOPIC ── */}
      <section id="topics" className={`${styles.libSection} container`} aria-labelledby="topics-title">
        <div className={styles.sectionHead}>
          <span className="section-label">{tl('home.topicsLabel')}</span>
          <h2 id="topics-title" className={styles.sectionTitle}>{tl('home.topicsTitle')}</h2>
          <p className={styles.sectionSub}>{tl('home.topicsSub')}</p>
        </div>
        <div className={styles.topicGrid}>
          {CATEGORIES.map(c => (
            <Link key={c.key} href={c.path} className={styles.topic}>
              <span className={styles.topicCount}>{guideCount(byCategory(c.key).length)}</span>
              <h3 className={styles.topicName}>{c.name}</h3>
              <p className={styles.topicSummary}>{c.summary}</p>
              <ul className={styles.topicExamples}>
                {c.questions.slice(0, 2).map(item => <li key={item.q}>{item.q}</li>)}
              </ul>
              <span className={styles.topicCta}>{tl('home.topicsCta')} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ESSENTIALS ── */}
      <section className={styles.essentialsBand} aria-labelledby="essentials-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">{tl('home.essentialsLabel')}</span>
            <h2 id="essentials-title" className={styles.sectionTitle}>{tl('home.essentialsTitle')}</h2>
            <p className={styles.sectionSub}>{tl('home.essentialsSub')}</p>
          </div>
          <div className={styles.essentialGrid}>
            {LIBRARY_ESSENTIALS.map((id, i) => <ArticleCard key={id} id={id} variant="essential" number={i + 1} t={tl} locale={locale} />)}
          </div>
        </div>
      </section>

      {/* ── POPULAR SITUATIONS ── */}
      <section className={styles.situationsBand} aria-labelledby="situations-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={`section-label ${styles.labelOnDark}`}>{tl('home.situationsLabel')}</span>
            <h2 id="situations-title" className={`${styles.sectionTitle} ${styles.titleOnDark}`}>{tl('home.situationsTitle')}</h2>
          </div>
          <ul className={styles.situationList}>
            {LIBRARY_SITUATIONS.map(id => (
              <li key={id}>
                <Link href={L(`/start/#${id}`)} className={styles.situation}>
                  <span>
                    <span className={styles.situationTitle}>{tl(`situations.${id}.title`)}</span>
                    <span className={styles.situationDesc}>{tl(`situations.${id}.desc`)}</span>
                  </span>
                  <span className={styles.situationArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={L('/start/')} className={styles.situationsCta}>{tl('home.situationsCta')} →</Link>
        </div>
      </section>

      {/* ── ALL GUIDES ── */}
      <section id="all-guides" className={`${styles.libSection} container`} aria-labelledby="all-guides-title">
        <div className={styles.sectionHead}>
          <span className="section-label">{tl('home.allGuidesLabel')}</span>
          <h2 id="all-guides-title" className={styles.sectionTitle}>{tl('home.allGuidesTitle')}</h2>
          <p className={styles.sectionSub}>{tl('home.allGuidesSub').replace('{count}', ARTICLES.length)}</p>
        </div>
        <div className={styles.directory}>
          {CATEGORIES.map(c => {
            const guides = byCategory(c.key)
            return (
              <div key={c.key} className={styles.directoryGroup}>
                <h3 className={styles.directoryHeading}>
                  <Link href={c.path}>{c.name}</Link>
                  <span className={styles.directoryCount}>{guides.length}</span>
                </h3>
                <ul className={styles.directoryList}>
                  {guides.map(a => {
                    const display = getArticle(a.id, locale)
                    return (
                      <li key={a.id}>
                        {isEn ? (
                          <Link href={a.path}>{a.title}</Link>
                        ) : (
                          <Link href={a.path} hrefLang="en">
                            {display.title}
                            <span className={styles.englishTagInline}>{tl('card.englishGuide')}</span>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        {/* ── REVIEW / TRUST STATUS ── */}
        <div className={styles.trustStatus}>
          <p className={styles.trustLine}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span>{tl('home.trustOfficial')}</span>
            <span aria-hidden="true">·</span>
            <span>{tl('category.taxYear').replace('{year}', TAX_CONFIG.currentTaxYear)}</span>
            <span aria-hidden="true">·</span>
            <span>{tl('category.lastReviewed').replace('{date}', formatMonthYear(TAX_CONFIG.lastReviewed, locale))}</span>
            {!isEn && (
              <>
                <span aria-hidden="true">·</span>
                <span>{tl('home.trustTranslation')}</span>
              </>
            )}
          </p>
          <p className={styles.disclaimer}>{tl('category.disclaimer')}</p>
        </div>
      </section>

    </Layout>
  )
}

import Link from 'next/link'
import Layout from '../Layout'
import ArticleCard from './ArticleCard'
import { useTranslation } from '../../lib/i18n'
import { ARTICLES } from '../../lib/articles'
import { getCategory, formatMonthYear } from '../../lib/library-i18n'
import { localePath } from '../../lib/locale-routes'
import TAX_CONFIG from '../../lib/tax-config'
import styles from './library.module.css'

const articleById = new Map(ARTICLES.map(a => [a.id, a]))

/**
 * Shared template for every Knowledge Library category page (English and /zh-tw/).
 * Everything is derived from `categoryKey` via lib/categories.js and lib/articles.js
 * (plus lib/library-zh-tw.js display metadata when locale is 'zh-tw').
 */
export default function CategoryPage({ categoryKey, translations, locale = 'en' }) {
  const { t } = useTranslation(translations.common)
  const { t: tl } = useTranslation(translations.library)
  const L = path => localePath(path, locale)
  const isEn = locale === 'en'

  const category = getCategory(categoryKey, locale)
  const articles = ARTICLES.filter(a => a.category === categoryKey)
  const startHere = category.startHere.filter(id => articleById.has(id))
  const related = (category.related || []).filter(id => articleById.has(id))
  const questions = category.questions.filter(item => articleById.has(item.id))

  // If every guide is already featured, a separate "All guides" list would only repeat it.
  const everyGuideFeatured = articles.every(a => startHere.includes(a.id))

  const count = articles.length
  const guideCount = tl(count === 1 ? 'category.guideCountOne' : 'category.guideCountOther').replace('{count}', count)

  return (
    <Layout t={t} locale={locale} meta={{ title: category.seoTitle, description: category.seoDescription }}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <nav className={styles.breadcrumb} aria-label={isEn ? 'Breadcrumb' : '導覽路徑'}>
            <Link href={L('/')}>{tl('breadcrumb.home')}</Link>
            <span aria-hidden="true">›</span>
            <Link href={L('/library/')}>{tl('breadcrumb.library')}</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{category.name}</span>
          </nav>
          <h1 className={styles.heroTitle}>{category.name}</h1>
          <p className={styles.heroIntro}>{category.intro}</p>
          <p className={styles.heroMeta}>
            <span className={styles.heroCount}>{guideCount}</span>
            <span aria-hidden="true">·</span>
            <span>{tl('category.taxYear').replace('{year}', TAX_CONFIG.currentTaxYear)}</span>
            <span aria-hidden="true">·</span>
            <span>{tl('category.lastReviewed').replace('{date}', formatMonthYear(TAX_CONFIG.lastReviewed, locale))}</span>
          </p>
        </div>
      </section>

      <div className={`${styles.main} container`}>

        {/* ── START HERE ── */}
        {startHere.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className="section-label">{tl('category.startHereLabel')}</span>
              <h2 className={styles.sectionTitle}>
                {everyGuideFeatured && count > 1 ? tl('category.startHereAllTitle') : tl('category.startHereTitle')}
              </h2>
              {everyGuideFeatured && count > 1 && (
                <p className={styles.sectionSub}>{category.startHereNote || tl('category.startHereAllSub')}</p>
              )}
            </div>
            <div className={`${styles.featuredGrid} ${startHere.length === 1 ? styles.featuredSingle : ''}`}>
              {startHere.map(id => <ArticleCard key={id} id={id} variant="featured" t={tl} locale={locale} />)}
            </div>
          </section>
        )}

        {/* ── QUESTIONS ── */}
        {questions.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className="section-label">{tl('category.questionsLabel')}</span>
              <h2 className={styles.sectionTitle}>{tl('category.questionsTitle')}</h2>
            </div>
            <ul className={styles.questionList}>
              {questions.map(item => (
                <li key={item.q}>
                  <Link href={articleById.get(item.id).path} className={styles.question} {...(isEn ? {} : { hrefLang: 'en' })}>
                    <span>
                      {item.q}
                      {!isEn && <span className={styles.englishTagInline}>{tl('card.englishGuide')}</span>}
                    </span>
                    <span className={styles.questionArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── ALL GUIDES ── */}
        {!everyGuideFeatured && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className="section-label">{tl('category.allGuidesLabel')}</span>
              <h2 className={styles.sectionTitle}>{tl('category.allGuidesTitle')}</h2>
            </div>
            <div className={styles.cardGrid}>
              {articles.map(a => (
                <ArticleCard key={a.id} id={a.id} marker={startHere.includes(a.id)} t={tl} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <section className={`${styles.section} ${styles.sectionSecondary}`}>
            <h2 className={styles.sectionTitleSmall}>{tl('category.relatedLabel')}</h2>
            <div className={styles.relatedGrid}>
              {related.map(id => <ArticleCard key={id} id={id} variant="related" t={tl} locale={locale} />)}
            </div>
          </section>
        )}

        {/* ── CLOSING ── */}
        <aside className={styles.closing}>
          <div>
            <p className={styles.closingTitle}>{tl('category.closingTitle')}</p>
            <p className={styles.closingSub}>{tl('category.closingSub')}</p>
          </div>
          <Link href={L('/start/')} className="btn-outline">{tl('category.closingCta')} →</Link>
        </aside>
        <p className={styles.disclaimer}>{tl('category.disclaimer')}</p>

      </div>
    </Layout>
  )
}

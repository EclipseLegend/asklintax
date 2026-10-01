import Link from 'next/link'
import { ARTICLES } from '../../lib/articles'
import { CATEGORIES } from '../../lib/categories'
import styles from './library.module.css'

const articleById = new Map(ARTICLES.map(a => [a.id, a]))
const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]))

/**
 * One card for every Library context. All content comes from lib/articles.js.
 *
 * variant:
 *   'default'  — All Guides grid: title, summary, difficulty, read time
 *   'featured' — Start Here: larger, with summary and call to action
 *   'related'  — secondary: category label, title, read time (no summary)
 *   'essential' — Library homepage Essentials: numbered editorial row
 * marker: show a small "Start here" label on a default card (used in All Guides for featured articles)
 * number: position shown by the 'essential' variant
 * showCategory: show the category name on a default card (used by search results)
 * t:      translation function for locales/<lang>/library.json
 */
export default function ArticleCard({ id, variant = 'default', marker = false, number, showCategory = false, t }) {
  const article = articleById.get(id)
  if (!article) return null // validator guarantees ids exist; never render a broken link

  const readTime = t('card.readTime').replace('{minutes}', article.readMinutes)
  const difficultyClass = article.difficulty === 'Beginner' ? styles.levelBeginner : styles.levelAdvanced

  if (variant === 'essential') {
    return (
      <Link href={article.path} className={styles.essential}>
        <span className={styles.essentialNumber} aria-hidden="true">{String(number).padStart(2, '0')}</span>
        <div className={styles.essentialBody}>
          <span className={styles.cardContext}>{categoryByKey.get(article.category)?.name}</span>
          <h3 className={styles.essentialTitle}>{article.title}</h3>
          <p className={styles.essentialSummary}>{article.summary}</p>
          <span className={styles.cardMetaText}>{article.difficulty} · {readTime}</span>
        </div>
        <span className={styles.essentialArrow} aria-hidden="true">→</span>
      </Link>
    )
  }

  if (variant === 'related') {
    return (
      <Link href={article.path} className={`${styles.card} ${styles.cardRelated}`}>
        <span className={styles.cardContext}>{categoryByKey.get(article.category)?.name}</span>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <span className={styles.cardMetaText}>{article.difficulty} · {readTime}</span>
      </Link>
    )
  }

  const featured = variant === 'featured'

  return (
    <Link href={article.path} className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      {marker && !featured && <span className={styles.cardMarker}>{t('card.startHereMarker')}</span>}
      {showCategory && <span className={styles.cardContext}>{categoryByKey.get(article.category)?.name}</span>}
      <h3 className={styles.cardTitle}>{article.title}</h3>
      <p className={styles.cardSummary}>{article.summary}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardMeta}>
          <span className={`${styles.level} ${difficultyClass}`}>{article.difficulty}</span>
          <span className={styles.cardMetaText}>{readTime}</span>
        </span>
        <span className={styles.cardCta} aria-hidden="true">
          {featured ? `${t('card.readGuide')} →` : '→'}
        </span>
      </div>
    </Link>
  )
}

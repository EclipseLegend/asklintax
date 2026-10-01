import Link from 'next/link'
import { getArticle, getCategory } from '../../lib/library-i18n'
import styles from './library.module.css'

/**
 * One card for every Library context. All content comes from lib/articles.js
 * (plus lib/library-zh-tw.js display metadata on Traditional Chinese pages).
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
 * locale: 'en' (default) or 'zh-tw'. On Chinese pages every article is English-only, so the
 *         card keeps the English URL and shows a small "English guide" label.
 */
export default function ArticleCard({ id, variant = 'default', marker = false, number, showCategory = false, t, locale = 'en' }) {
  const article = getArticle(id, locale)
  if (!article) return null // validator guarantees ids exist; never render a broken link

  const categoryName = getCategory(article.category, locale)?.name
  const readTime = t('card.readTime').replace('{minutes}', article.readMinutes)
  const difficultyClass = article.difficulty === 'Beginner' ? styles.levelBeginner : styles.levelAdvanced
  const level = locale === 'en' ? article.difficulty : t(`difficulty.${article.difficulty}`)
  const englishNote = article.englishOnly ? ` · ${t('card.englishGuide')}` : ''
  const linkLang = article.englishOnly ? { hrefLang: 'en' } : {}

  if (variant === 'essential') {
    return (
      <Link href={article.path} className={styles.essential} {...linkLang}>
        <span className={styles.essentialNumber} aria-hidden="true">{String(number).padStart(2, '0')}</span>
        <div className={styles.essentialBody}>
          <span className={styles.cardContext}>{categoryName}</span>
          <h3 className={styles.essentialTitle}>{article.title}</h3>
          <p className={styles.essentialSummary}>{article.summary}</p>
          <span className={styles.cardMetaText}>{level} · {readTime}{englishNote}</span>
        </div>
        <span className={styles.essentialArrow} aria-hidden="true">→</span>
      </Link>
    )
  }

  if (variant === 'related') {
    return (
      <Link href={article.path} className={`${styles.card} ${styles.cardRelated}`} {...linkLang}>
        <span className={styles.cardContext}>{categoryName}</span>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <span className={styles.cardMetaText}>{level} · {readTime}{englishNote}</span>
      </Link>
    )
  }

  const featured = variant === 'featured'

  return (
    <Link href={article.path} className={`${styles.card} ${featured ? styles.cardFeatured : ''}`} {...linkLang}>
      {marker && !featured && <span className={styles.cardMarker}>{t('card.startHereMarker')}</span>}
      {showCategory && <span className={styles.cardContext}>{categoryName}</span>}
      <h3 className={styles.cardTitle}>{article.title}</h3>
      <p className={styles.cardSummary}>{article.summary}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardMeta}>
          <span className={`${styles.level} ${difficultyClass}`}>{level}</span>
          <span className={styles.cardMetaText}>{readTime}</span>
          {article.englishOnly && <span className={styles.englishTag}>{t('card.englishGuide')}</span>}
        </span>
        <span className={styles.cardCta} aria-hidden="true">
          {featured ? `${t('card.readGuide')} →` : '→'}
        </span>
      </div>
    </Link>
  )
}

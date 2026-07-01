import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer({ t, locale = 'en' }) {
  const prefix = locale === 'zh' ? '/zh' : ''

  const knowledge = [
    { href: `${prefix}/library/individual`,         label: t('footer.links.individual') },
    { href: `${prefix}/library/small-business`,     label: t('footer.links.smallBusiness') },
    { href: `${prefix}/library/rental`,             label: t('footer.links.rental') },
    { href: `${prefix}/library/investments`,        label: t('footer.links.investments') },
    { href: `${prefix}/library/irs`,                label: t('footer.links.irs') },
    { href: `${prefix}/library/business-formation`, label: t('footer.links.formation') },
  ]
  const explore = [
    { href: `${prefix}/start`,     label: t('footer.links.startHere') },
    { href: `${prefix}/updates`,   label: t('footer.links.updates') },
    { href: `${prefix}/learn`,     label: t('footer.links.youtube') },
    { href: `${prefix}/checklist`, label: t('footer.links.checklist') },
    { href: `${prefix}/glossary`,  label: t('footer.links.glossary') },
    { href: `${prefix}/about`,     label: t('footer.links.about') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <Link href={prefix || '/'} className={styles.logo}>
            Ask <span>Lin</span> Tax
          </Link>
          <p>{t('footer.tagline')}</p>
          <p className={styles.bilingual}>{t('footer.bilingual')}</p>
        </div>
        <div className={styles.col}>
          <h4>{t('footer.knowledge')}</h4>
          {knowledge.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
        <div className={styles.col}>
          <h4>{t('footer.explore')}</h4>
          {explore.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
      </div>
      <div className={`${styles.bottom} container`}>
        <p><strong>Disclaimer:</strong> {t('footer.disclaimer')}</p>
        <p className={styles.copy}>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

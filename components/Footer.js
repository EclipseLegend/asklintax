import Link from 'next/link'
import { localePath } from '../lib/locale-routes'
import { YOUTUBE_URL } from './Header'
import styles from './Footer.module.css'

export default function Footer({ t, locale = 'en' }) {
  // localePath() returns the /zh-tw/ version only where that page exists; English-only
  // destinations (Tax Updates, About) keep their English URL and are labeled in the copy.
  const L = path => localePath(path, locale)

  const knowledge = [
    { href: L('/library/individual'),         label: t('footer.links.individual') },
    { href: L('/library/small-business'),     label: t('footer.links.smallBusiness') },
    { href: L('/library/business-formation'), label: t('footer.links.formation') },
    { href: L('/library/rental'),             label: t('footer.links.rental') },
    { href: L('/library/investment'),         label: t('footer.links.investments') },
    { href: L('/library/irs'),                label: t('footer.links.irs') },
  ]
  // `planned: true` = page not built yet; hidden until it exists (no links to 404s).
  const explore = [
    { href: L('/start'),     label: t('footer.links.startHere') },
    { href: '/updates',      label: t('footer.links.updates') },
    { href: YOUTUBE_URL,     label: t('footer.links.youtube'), external: true },
    { href: '/checklist',    label: t('footer.links.checklist'), planned: true },
    { href: '/glossary',     label: t('footer.links.glossary'), planned: true },
    { href: '/about',        label: t('footer.links.about') },
  ].filter(l => !l.planned)

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <Link href={L('/')} className={styles.logo}>
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
          {explore.map(l => l.external
            ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            : <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
      </div>
      <div className={`${styles.bottom} container`}>
        <p><strong>{t('footer.disclaimerLabel')}</strong> {t('footer.disclaimer')}</p>
        <p className={styles.copy}>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

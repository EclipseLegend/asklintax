import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getZhPath, getEnPath, LANGUAGE_SWITCHER_ENABLED } from '../lib/i18n'
import styles from './Header.module.css'

export default function Header({ t, locale = 'en' }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [showLangTip, setShowLangTip] = useState(false)
  const { pathname } = useRouter()

  const isZh = locale === 'zh'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // No translated pages exist yet, so nav always points to the real English pages
  // (a /zh prefix produced 404s such as /zh/library/ from the /zh/ placeholder).
  const prefix = ''
  // `planned: true` = page not built yet; hidden until it exists (no links to 404s).
  const navLinks = [
    { href: `${prefix}/start`,   label: t('nav.startHere') },
    { href: `${prefix}/library`, label: t('nav.library') },
    { href: `${prefix}/updates`, label: t('nav.updates') },
    { href: `${prefix}/learn`,   label: t('nav.youtube'), planned: true },
    { href: `${prefix}/about`,   label: t('nav.about') },
  ].filter(l => !l.planned)

  // For EN pages: clicking 中文 goes to /zh/ (coming soon page)
  // For ZH page: clicking EN goes back to English
  const switchHref  = isZh ? getEnPath(pathname) : '/zh/'
  const switchLabel = isZh ? 'EN' : '中文'
  const showLangSwitch = isZh || LANGUAGE_SWITCHER_ENABLED

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Link href={isZh ? '/zh/' : '/'} className={styles.logo}>
        Ask <span>Lin</span> Tax
      </Link>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          )
        })}

        {/* Language switcher — clearly marked as "coming soon" for EN users */}
        {showLangSwitch && (
        <div className={styles.langWrap}>
          <Link
            href={switchHref}
            className={`${styles.langSwitch} ${!isZh ? styles.langSwitchComing : ''}`}
            title={isZh ? 'Switch to English' : 'Chinese version coming soon'}
            onMouseEnter={() => !isZh && setShowLangTip(true)}
            onMouseLeave={() => setShowLangTip(false)}
          >
            {switchLabel}
            {!isZh && <span className={styles.langDot} />}
          </Link>
          {showLangTip && !isZh && (
            <div className={styles.langTooltip}>
              Chinese version<br />
              <span>Coming soon</span>
            </div>
          )}
        </div>
        )}
      </nav>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </header>
  )
}

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getZhPath, getEnPath } from '../lib/i18n'
import styles from './Header.module.css'

export default function Header({ t, locale = 'en' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useRouter()

  const isZh = locale === 'zh'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Build nav links based on current locale prefix
  const prefix = isZh ? '/zh' : ''
  const navLinks = [
    { href: `${prefix}/start`,   label: t('nav.startHere') },
    { href: `${prefix}/library`, label: t('nav.library') },
    { href: `${prefix}/updates`, label: t('nav.updates') },
    { href: `${prefix}/learn`,   label: t('nav.youtube') },
    { href: `${prefix}/about`,   label: t('nav.about') },
  ]

  // Language switcher target
  const switchHref = isZh
    ? getEnPath(pathname)            // zh → en
    : getZhPath(pathname)            // en → zh

  const switchLabel = isZh ? 'EN' : '中文'
  const switchTitle = isZh
    ? 'Switch to English'
    : '切換中文 (Coming soon)'

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

        {/* Language switcher */}
        <Link
          href={switchHref}
          className={styles.langSwitch}
          title={switchTitle}
        >
          {switchLabel}
        </Link>
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

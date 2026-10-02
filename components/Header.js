import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { localePath, alternates } from '../lib/locale-routes'
import styles from './Header.module.css'

// Official channel (external; opens in a new tab). Also used by the Footer.
export const YOUTUBE_URL = 'https://www.youtube.com/@AskLinTax'

export default function Header({ t, locale = 'en' }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname } = useRouter()

  const isZhTw = locale === 'zh-tw'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Chinese pages link to their /zh-tw/ equivalents only where those pages exist;
  // English-only destinations (Tax Updates, About) keep their English URL and are labeled.
  // `planned: true` = page not built yet; hidden until it exists (no links to 404s).
  const navLinks = [
    { href: localePath('/start', locale),   label: t('nav.startHere') },
    { href: localePath('/library', locale), label: t('nav.library') },
    { href: '/updates',                     label: t('nav.updates') },
    { href: YOUTUBE_URL,                    label: t('nav.youtube'), external: true },
    { href: '/about',                       label: t('nav.about') },
  ].filter(l => !l.planned)

  const alt = alternates(pathname)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Link href={isZhTw ? '/zh-tw/' : '/'} className={styles.logo}>
        Ask <span>Lin</span> Tax
      </Link>

      <div className={styles.actions}>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(({ href, label, external }) => {
            if (external) {
              return (
                <a key={href} href={href} className={styles.navLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              )
            }
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
          {/* Opens the existing Ask Lin chat panel (components/AskLin.js) — no page or route. */}
          <button
            type="button"
            className={`${styles.navLink} ${styles.askAi}`}
            aria-label={t('nav.askAiLabel')}
            onClick={() => {
              setMenuOpen(false)
              window.dispatchEvent(new Event('asklin:open'))
            }}
          >
            {t('nav.askAi')}
          </button>
        </nav>

        {/* Language switch — always visible (desktop and mobile) */}
        <div className={styles.langSwitch} role="group" aria-label={isZhTw ? '語言 / Language' : 'Language / 語言'}>
          {isZhTw ? (
            <Link href={alt.en} className={styles.langOption} lang="en" hrefLang="en" aria-label="English">EN</Link>
          ) : (
            <span className={`${styles.langOption} ${styles.langCurrent}`} lang="en" aria-current="true" aria-label="English (current language)">EN</span>
          )}
          <span className={styles.langDivider} aria-hidden="true">|</span>
          {isZhTw ? (
            <span className={`${styles.langOption} ${styles.langCurrent}`} lang="zh-Hant" aria-current="true" aria-label="繁體中文（目前語言）">繁中</span>
          ) : (
            <Link href={alt.zhTw} className={styles.langOption} lang="zh-Hant" hrefLang="zh-Hant" aria-label="繁體中文">繁中</Link>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={t('nav.menu')}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

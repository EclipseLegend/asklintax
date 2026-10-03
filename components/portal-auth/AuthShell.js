import { createContext, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { STRINGS } from '../../lib/portal-auth/strings'
import { createPortalAuth } from '../../lib/portal-auth/adapter'
import styles from './auth.module.css'

/**
 * Shared frame for the Phase 2B-4 portal auth screens: noindex head, header with EN/繁中 toggle,
 * and the auth adapter + session snapshot for the page. Not linked from the public site.
 */
const AuthContext = createContext(null)
export const useAuthPage = () => useContext(AuthContext)
export { styles }

export default function AuthShell({ titleEn, area = 'client', children }) {
  const [lang, setLang] = useState('en')
  const [snapshot, setSnapshot] = useState(null) // null = still loading
  const auth = createPortalAuth()
  const t = STRINGS[lang]

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('lang') === 'zh-tw') setLang('zh-tw')
    let live = true
    const load = () => auth.getSnapshot().then(s => { if (live) setSnapshot(s) })
    load()
    const off = auth.onChange(load)
    return () => { live = false; off() }
  }, [auth])
  useEffect(() => { document.documentElement.lang = lang === 'zh-tw' ? 'zh-Hant' : 'en' }, [lang])

  const refresh = () => auth.getSnapshot().then(setSnapshot)
  return (
    <>
      <Head>
        <title>{`${titleEn} | AskLinTax`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.page} lang={lang === 'zh-tw' ? 'zh-Hant' : 'en'}>
        <header className={styles.topbar}>
          <a href="/" className={styles.brand}>Ask <span>Lin</span> Tax</a>
          <span className={styles.areaLabel}>{area === 'staff' ? t.staffLabel : t.portalLabel}</span>
          <div className={styles.topActions}>
            <div className={styles.langSwitch} role="group" aria-label={t.langLabel}>
              <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'} lang="en">EN</button>
              <button type="button" onClick={() => setLang('zh-tw')} aria-pressed={lang === 'zh-tw'} lang="zh-Hant">繁中</button>
            </div>
            <a href="/" className={styles.homeLink}>{t.backHome}</a>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.card}>
            {snapshot && !snapshot.available && <p className={styles.notice} role="note">{t.unavailable}</p>}
            <AuthContext.Provider value={{ t, lang, auth, snapshot, refresh }}>{children}</AuthContext.Provider>
          </div>
        </main>
      </div>
    </>
  )
}

/** Error message box; key is a message key from flow.authErrorKey / validators. */
export function ErrorBox({ errorKey, id }) {
  const { t } = useAuthPage()
  if (!errorKey) return null
  return <p className={styles.error} role="alert" id={id}>{t.errors[errorKey] || t.errors.generic}</p>
}

/** Redirect helper for client-side routing decisions (never authorization). */
export function go(path) {
  if (typeof window !== 'undefined') window.location.replace(path)
}

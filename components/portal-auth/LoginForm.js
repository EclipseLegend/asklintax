import { useEffect, useState } from 'react'
import { useAuthPage, ErrorBox, go, styles } from './AuthShell'
import { ROUTES, decideClient, decideStaff, sanitizeNext, validateEmail, authErrorKey } from '../../lib/portal-auth/flow'

/**
 * Email + password sign-in for the client area or the staff area.
 * After sign-in the browser only decides the next SCREEN (client home, or staff MFA / staff home).
 * Whether the account is really a client or staff member is decided by the database, not here.
 */
export default function LoginForm({ area }) {
  const { t, auth, snapshot, refresh } = useAuthPage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorKey, setErrorKey] = useState(null)
  const [busy, setBusy] = useState(false)
  const copy = area === 'staff' ? t.staffLogin : t.login
  const decide = area === 'staff' ? decideStaff : decideClient

  function nextTarget() {
    const fallback = area === 'staff' ? ROUTES.staffHome : ROUTES.clientHome
    return sanitizeNext(new URLSearchParams(window.location.search).get('next'), fallback)
  }
  function route(s) {
    const d = decide(s)
    if (d.screen === 'client-home' || d.screen === 'staff-home') go(nextTarget())
    else if (d.redirect && d.redirect !== window.location.pathname) go(d.redirect)
  }

  // already signed in → move on
  useEffect(() => { if (snapshot && snapshot.session) route(snapshot) }, [snapshot]) // eslint-disable-line react-hooks/exhaustive-deps

  async function submit(e) {
    e.preventDefault()
    const v = validateEmail(email) || (password ? null : 'signin_failed')
    if (v) { setErrorKey(v); return }
    setBusy(true); setErrorKey(null)
    const { error } = await auth.signInWithPassword(email.trim(), password)
    setPassword('')
    if (error) { setErrorKey(authErrorKey(error, 'signin')); setBusy(false); return }
    route(await auth.getSnapshot())
    await refresh()
    setBusy(false)
  }

  return (
    <>
      <h1 className={styles.title}>{copy.title}</h1>
      <p className={styles.intro}>{copy.intro}</p>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.label}>
          {t.email}
          <input className={styles.input} type="email" autoComplete="username" value={email}
            onChange={e => setEmail(e.target.value)} aria-invalid={errorKey === 'email_invalid'} aria-describedby="login-error" required />
        </label>
        <label className={styles.label}>
          {t.password}
          <input className={styles.input} type="password" autoComplete="current-password" value={password}
            onChange={e => setPassword(e.target.value)} aria-describedby="login-error" required />
        </label>
        <ErrorBox errorKey={errorKey} id="login-error" />
        <button className={styles.primary} type="submit" disabled={busy}>{busy ? t.working : copy.submit}</button>
      </form>
      <div className={styles.links}>
        <a href={ROUTES.forgotPassword}>{t.login.forgot}</a>
        {area === 'staff'
          ? <a href={ROUTES.clientLogin}>{t.staffLogin.clientLink}</a>
          : <a href={ROUTES.staffLogin}>{t.login.staffLink}</a>}
      </div>
      {area !== 'staff' && <p className={styles.fine}>{t.login.noAccount}</p>}
    </>
  )
}

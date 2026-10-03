import { useState } from 'react'
import AuthShell, { useAuthPage, ErrorBox, styles } from '../../../components/portal-auth/AuthShell'
import { ROUTES, validateEmail, authErrorKey } from '../../../lib/portal-auth/flow'

/**
 * /portal/forgot-password/ — request a recovery email.
 * The confirmation is identical whether or not the address has an account (no account enumeration).
 */
function ForgotForm() {
  const { t, auth } = useAuthPage()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [errorKey, setErrorKey] = useState(null)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const v = validateEmail(email)
    if (v) { setErrorKey(v); return }
    setBusy(true); setErrorKey(null)
    const redirectTo = `${window.location.origin}${ROUTES.callback}`
    const { error } = await auth.requestPasswordReset(email.trim(), redirectTo)
    const key = authErrorKey(error, 'forgot')
    // only operational errors are shown; "unknown email" is never distinguishable from success
    if (key === 'not_configured' || key === 'rate_limited' || key === 'network') setErrorKey(key)
    else setSent(true)
    setBusy(false)
  }

  return (
    <>
      <h1 className={styles.title}>{t.forgot.title}</h1>
      {sent ? <p className={styles.success} role="status">{t.forgot.sent}</p> : (
        <>
          <p className={styles.intro}>{t.forgot.intro}</p>
          <form className={styles.form} onSubmit={submit} noValidate>
            <label className={styles.label}>
              {t.email}
              <input className={styles.input} type="email" autoComplete="username" value={email}
                onChange={e => setEmail(e.target.value)} aria-invalid={errorKey === 'email_invalid'} aria-describedby="forgot-error" />
            </label>
            <ErrorBox errorKey={errorKey} id="forgot-error" />
            <button className={styles.primary} type="submit" disabled={busy}>{busy ? t.working : t.forgot.submit}</button>
          </form>
        </>
      )}
      <div className={styles.links}><a href={ROUTES.clientLogin}>{t.forgot.back}</a></div>
    </>
  )
}

export default function ForgotPasswordPage() {
  return <AuthShell titleEn="Reset Password"><ForgotForm /></AuthShell>
}

import { useState } from 'react'
import AuthShell, { useAuthPage, ErrorBox, styles } from '../../../components/portal-auth/AuthShell'
import { ROUTES, validateNewPassword, authErrorKey } from '../../../lib/portal-auth/flow'

/**
 * /portal/reset-password/ — choose a password inside the context the callback just created:
 *   recovery (PKCE exchangeCodeForSession)  or  invite (TokenHash verifyOtp type invite).
 * An ordinary signed-in session cannot use this page. After saving, the context ends and the session is
 * signed out locally, so the user signs in again normally (and staff go through MFA again).
 */
function ResetForm() {
  const { t, auth, snapshot } = useAuthPage()
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errorKey, setErrorKey] = useState(null)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const v = validateNewPassword(pw, confirm)
    if (v) { setErrorKey(v); return }
    setBusy(true); setErrorKey(null)
    const { error } = await auth.updatePassword(pw)
    setPw(''); setConfirm('')
    if (error) { setErrorKey(authErrorKey(error, 'reset')); setBusy(false); return }
    await auth.completePasswordSetup() // ends the context and signs out locally (no stale session)
    setDone(true); setBusy(false)
  }

  if (done) {
    return (
      <>
        <h1 className={styles.title}>{t.reset.title}</h1>
        <p className={styles.success} role="status">{t.reset.done}</p>
        <div className={styles.links}><a href={ROUTES.clientLogin}>{t.reset.toLogin}</a></div>
      </>
    )
  }
  const ctx = snapshot && snapshot.available && snapshot.session ? auth.passwordContext() : null
  const recovery = Boolean(ctx)
  const blocked = Boolean(snapshot && snapshot.available && !ctx)
  const invite = ctx === 'invite'
  return (
    <>
      <h1 className={styles.title}>{invite ? t.reset.inviteTitle : t.reset.title}</h1>
      <p className={styles.intro}>{invite ? t.reset.inviteIntro : t.reset.intro}</p>
      {blocked && <p className={styles.notice}>{t.reset.noSession}</p>}
      {recovery && snapshot.session.email && (
        <p className={styles.fine}>{t.reset.account} <strong>{snapshot.session.email}</strong><br />{t.reset.notYou}</p>
      )}
      <form className={styles.form} onSubmit={submit} noValidate>
        <label className={styles.label}>
          {t.reset.newPassword}
          <input className={styles.input} type="password" autoComplete="new-password" value={pw}
            onChange={e => setPw(e.target.value)} aria-describedby="reset-error" minLength={12} maxLength={128} />
        </label>
        <label className={styles.label}>
          {t.reset.confirm}
          <input className={styles.input} type="password" autoComplete="new-password" value={confirm}
            onChange={e => setConfirm(e.target.value)} aria-describedby="reset-error" aria-invalid={errorKey === 'password_mismatch'} />
        </label>
        <ErrorBox errorKey={errorKey} id="reset-error" />
        <button className={styles.primary} type="submit" disabled={busy || blocked}>{busy ? t.working : t.reset.submit}</button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return <AuthShell titleEn="Choose a New Password"><ResetForm /></AuthShell>
}

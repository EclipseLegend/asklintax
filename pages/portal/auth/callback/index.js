import { useEffect, useState } from 'react'
import AuthShell, { useAuthPage, go, styles } from '../../../../components/portal-auth/AuthShell'
import { ROUTES, decideCallback } from '../../../../lib/portal-auth/flow'

/**
 * /portal/auth/callback/ — landing page for the two Supabase email links the portal accepts:
 *   PASSWORD RECOVERY (PKCE):  ?code=<uuid>  → official exchangeCodeForSession(), using the verifier
 *                              stored in this browser when the reset was requested.
 *   ADMIN INVITE (TokenHash):  ?token_hash=<hash>&type=invite → official verifyOtp({ type: 'invite' }).
 * Every other shape (tokens in the URL, extra / repeated parameters, fragments, malformed values) is
 * refused before any request. The URL is scrubbed immediately and the next screen is a fixed portal
 * route — nothing in the link can choose a destination, role or identity.
 */
function Callback() {
  const { t, auth, snapshot } = useAuthPage()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!snapshot) return
    let live = true
    const where = { search: window.location.search, hash: window.location.hash }
    // remove the code (or any tokens) from the address bar and history before anything else
    window.history.replaceState(null, '', ROUTES.callback)
    auth.exchangeCallback(where).then(({ params, error }) => {
      if (!live) return
      const d = decideCallback(error ? { error } : params)
      if (d.screen === 'callback-error') { setFailed(true); return }
      go(d.redirect)
    })
    return () => { live = false }
  }, [snapshot]) // eslint-disable-line react-hooks/exhaustive-deps

  return failed ? (
    <>
      <p className={styles.error} role="alert">{t.callback.error}</p>
      <div className={styles.links}><a href={ROUTES.forgotPassword}>{t.callback.toForgot}</a></div>
    </>
  ) : <p className={styles.intro} role="status">{t.callback.checking}</p>
}

export default function AuthCallbackPage() {
  return <AuthShell titleEn="Checking Link"><Callback /></AuthShell>
}

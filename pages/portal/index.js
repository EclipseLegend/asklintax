import { useEffect } from 'react'
import AuthShell, { useAuthPage, go, styles } from '../../components/portal-auth/AuthShell'
import { ROUTES, decideClient } from '../../lib/portal-auth/flow'

/**
 * /portal/ — signed-in client landing (placeholder until the backend is connected in a later phase).
 * A browser session alone grants nothing: client data will only come from the client_get_* database
 * functions, which resolve the client from auth.uid() through the server boundary (deferred).
 */
function ClientHome() {
  const { t, auth, snapshot } = useAuthPage()
  const d = snapshot ? decideClient(snapshot) : null

  useEffect(() => { if (d && d.screen === 'login') go(ROUTES.clientLogin) }, [d && d.screen]) // eslint-disable-line react-hooks/exhaustive-deps

  if (d && d.screen === 'unavailable') return null // the shell already shows the 'not available yet' notice
  if (!d || d.screen !== 'client-home') return <p className={styles.intro} role="status">{t.working}</p>
  return (
    <>
      <h1 className={styles.title}>{t.clientHome.title}</h1>
      <p className={styles.intro}>{t.clientHome.body}</p>
      <button className={styles.secondary} type="button" onClick={async () => { await auth.signOut(); go(ROUTES.clientLogin) }}>{t.signOut}</button>
    </>
  )
}

export default function ClientHomePage() {
  return <AuthShell titleEn="Client Portal"><ClientHome /></AuthShell>
}

import { useEffect } from 'react'
import AuthShell, { useAuthPage, go, styles } from '../../../components/portal-auth/AuthShell'
import { ROUTES, decideStaff, staffUiAllowed } from '../../../lib/portal-auth/flow'

/**
 * /portal/staff/ — staff landing. Renders ONLY at aal2; anything less is sent to login / MFA.
 * This is UI gating (defense in depth). Staff data access is enforced by the database
 * (staff_profiles + assignment / organization + aal2), never by this page.
 */
function StaffHome() {
  const { t, auth, snapshot } = useAuthPage()
  const allowed = snapshot ? staffUiAllowed(snapshot) : false

  useEffect(() => {
    if (!snapshot || allowed) return
    const d = decideStaff(snapshot)
    if (d.redirect) go(d.redirect)
  }, [snapshot, allowed])

  if (snapshot && !snapshot.available) return null // fail closed: nothing staff-related renders
  if (!allowed) return <p className={styles.intro} role="status">{t.working}</p>
  return (
    <>
      <h1 className={styles.title}>{t.staffHome.title}</h1>
      <p className={styles.intro}>{t.staffHome.body}</p>
      <p className={styles.fine}>{t.staffHome.note}</p>
      <button className={styles.secondary} type="button" onClick={async () => { await auth.signOut(); go(ROUTES.staffLogin) }}>{t.signOut}</button>
    </>
  )
}

export default function StaffHomePage() {
  return <AuthShell titleEn="Staff Portal" area="staff"><StaffHome /></AuthShell>
}

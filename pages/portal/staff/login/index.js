import AuthShell from '../../../../components/portal-auth/AuthShell'
import LoginForm from '../../../../components/portal-auth/LoginForm'

/** /portal/staff/login/ — staff sign-in. Always continues to TOTP MFA (AAL2). noindex. */
export default function StaffLoginPage() {
  return (
    <AuthShell titleEn="Staff Sign-in" area="staff">
      <LoginForm area="staff" />
    </AuthShell>
  )
}

import AuthShell from '../../../components/portal-auth/AuthShell'
import LoginForm from '../../../components/portal-auth/LoginForm'

/** /portal/login/ — client sign-in (invite-only accounts). noindex; not linked from the public site. */
export default function ClientLoginPage() {
  return (
    <AuthShell titleEn="Client Portal Sign-in" area="client">
      <LoginForm area="client" />
    </AuthShell>
  )
}

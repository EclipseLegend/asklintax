import StartPage from '../components/start/StartPage'
import START_EN from '../lib/content/start-en'
import { loadTranslations } from '../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

export default function StartHerePage({ translations }) {
  return <StartPage translations={translations} content={START_EN} locale="en" />
}

import HomePage from '../components/home/HomePage'
import HOME_EN from '../lib/content/home-en'
import { loadTranslations } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  return {
    props: {
      translations: loadTranslations(locale, ['common', 'home']),
    },
  }
}

export default function Home({ translations }) {
  return <HomePage translations={translations} content={HOME_EN} locale="en" />
}

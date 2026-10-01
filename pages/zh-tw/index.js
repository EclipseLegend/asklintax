import HomePage from '../../components/home/HomePage'
import HOME_ZH_TW from '../../lib/content/home-zh-tw'
import { loadTranslations } from '../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

export default function HomeZhTw({ translations }) {
  return <HomePage translations={translations} content={HOME_ZH_TW} locale="zh-tw" />
}

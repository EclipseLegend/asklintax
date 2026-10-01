import StartPage from '../../components/start/StartPage'
import START_ZH_TW from '../../lib/content/start-zh-tw'
import { loadTranslations } from '../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common']) } }
}

export default function StartHereZhTw({ translations }) {
  return <StartPage translations={translations} content={START_ZH_TW} locale="zh-tw" />
}

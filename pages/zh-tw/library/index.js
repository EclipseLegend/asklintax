import LibraryHome from '../../../components/library/LibraryHome'
import { loadTranslations } from '../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function LibraryZhTw({ translations }) {
  return <LibraryHome translations={translations} locale="zh-tw" />
}

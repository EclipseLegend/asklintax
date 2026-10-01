import LibraryHome from '../../components/library/LibraryHome'
import { loadTranslations } from '../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common', 'library']) } }
}

export default function LibraryPage({ translations }) {
  return <LibraryHome translations={translations} />
}

import CategoryPage from '../../../components/library/CategoryPage'
import { loadTranslations } from '../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common', 'library']) } }
}

export default function IndividualCategoryPage({ translations }) {
  return <CategoryPage categoryKey="individual" translations={translations} />
}

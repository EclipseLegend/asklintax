import CategoryPage from '../../../components/library/CategoryPage'
import { loadTranslations } from '../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common', 'library']) } }
}

export default function SmallBusinessCategoryPage({ translations }) {
  return <CategoryPage categoryKey="small-business" translations={translations} />
}

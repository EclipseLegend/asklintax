import CategoryPage from '../../../../components/library/CategoryPage'
import { loadTranslations } from '../../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function RentalCategoryZhTw({ translations }) {
  return <CategoryPage categoryKey="rental" translations={translations} locale="zh-tw" />
}

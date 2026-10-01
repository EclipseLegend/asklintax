import CategoryPage from '../../../../components/library/CategoryPage'
import { loadTranslations } from '../../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function IndividualCategoryZhTw({ translations }) {
  return <CategoryPage categoryKey="individual" translations={translations} locale="zh-tw" />
}

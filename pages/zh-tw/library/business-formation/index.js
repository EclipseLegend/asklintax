import CategoryPage from '../../../../components/library/CategoryPage'
import { loadTranslations } from '../../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function BusinessFormationCategoryZhTw({ translations }) {
  return <CategoryPage categoryKey="business-formation" translations={translations} locale="zh-tw" />
}

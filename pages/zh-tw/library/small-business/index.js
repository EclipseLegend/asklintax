import CategoryPage from '../../../../components/library/CategoryPage'
import { loadTranslations } from '../../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function SmallBusinessCategoryZhTw({ translations }) {
  return <CategoryPage categoryKey="small-business" translations={translations} locale="zh-tw" />
}

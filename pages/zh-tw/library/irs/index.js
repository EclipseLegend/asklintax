import CategoryPage from '../../../../components/library/CategoryPage'
import { loadTranslations } from '../../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh-TW', ['common', 'library']) } }
}

export default function IrsCategoryZhTw({ translations }) {
  return <CategoryPage categoryKey="irs" translations={translations} locale="zh-tw" />
}

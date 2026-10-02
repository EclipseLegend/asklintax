import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import AskLin from './AskLin'
import { ARTICLES } from '../lib/articles'
import { ZH_TW_PREFIX, hasZhTw } from '../lib/locale-routes'

const SITE_URL = 'https://asklintax.com'
const ARTICLE_PATHS = new Set(ARTICLES.map(a => a.path))

// Reciprocal hreflang for Knowledge Library guides that exist in both English and
// Traditional Chinese. Other pages get none (hreflang only for genuine translated pairs).
function articleAlternates(pathname) {
  const en = `${pathname.startsWith(`${ZH_TW_PREFIX}/`) ? pathname.slice(ZH_TW_PREFIX.length) : pathname}/`
  if (!ARTICLE_PATHS.has(en) || !hasZhTw(en)) return null
  return { en: `${SITE_URL}${en}`, zhTw: `${SITE_URL}${ZH_TW_PREFIX}${en}` }
}

export default function Layout({ children, t, meta = {}, locale = 'en' }) {
  const { pathname } = useRouter()
  const alternates = articleAlternates(pathname)
  const {
    title = 'AskLinTax | U.S. Tax Knowledge for Chinese Families & Small Businesses',
    description = 'AskLinTax is the trusted U.S. tax knowledge platform for Chinese families and small businesses. Search any tax question in plain language.',
    // Self-referencing by default; trailing slash matches next.config.js (trailingSlash: true)
    canonical = pathname === '/' ? '/' : `${pathname}/`,
  } = meta

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${SITE_URL}${canonical}`} />
        {alternates && <link rel="alternate" hrefLang="en" href={alternates.en} />}
        {alternates && <link rel="alternate" hrefLang="zh-TW" href={alternates.zhTw} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header t={t} locale={locale} />
      <main style={{ paddingTop: '64px' }}>
        {children}
      </main>
      <Footer t={t} locale={locale} />
      <AskLin locale={locale} />
    </>
  )
}

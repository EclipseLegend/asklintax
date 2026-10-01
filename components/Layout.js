import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import AskLin from './AskLin'

const SITE_URL = 'https://asklintax.com'

export default function Layout({ children, t, meta = {}, locale = 'en' }) {
  const { pathname } = useRouter()
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
        {/* hreflang intentionally omitted until translated pages exist */}
        <link rel="canonical" href={`${SITE_URL}${canonical}`} />
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

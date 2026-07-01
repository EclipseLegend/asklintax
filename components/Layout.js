import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, t, meta = {}, locale = 'en' }) {
  const {
    title = 'AskLinTax | U.S. Tax Knowledge for Chinese Families & Small Businesses',
    description = 'AskLinTax is the trusted U.S. tax knowledge platform for Chinese families and small businesses. Search any tax question in plain language.',
    canonical,
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
        {/* hreflang for SEO — tells Google about language versions */}
        <link rel="alternate" hrefLang="en" href={`https://asklintax.com${canonical || '/'}`} />
        <link rel="alternate" hrefLang="zh-TW" href={`https://asklintax.com/zh${canonical || '/'}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://asklintax.com${canonical || '/'}`} />
        {canonical && <link rel="canonical" href={`https://asklintax.com${canonical}`} />}
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
    </>
  )
}

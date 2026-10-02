import Head from 'next/head'
import PortalApp from '../../components/portal/PortalApp'

/**
 * /portal-demo/ — AskLinTax Client Portal, Phase 1 static workflow prototype.
 * Fictional demo data only. noindex (the sitemap generator skips noindex pages).
 * Not linked from the public site.
 */
export default function PortalDemoPage() {
  return (
    <>
      <Head>
        <title>Client Portal Demo | AskLinTax</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Prototype of the AskLinTax client portal workflow using fictional demo data." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <PortalApp />
    </>
  )
}

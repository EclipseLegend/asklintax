import { Html, Head, Main, NextScript } from 'next/document'

export default function Document({ __NEXT_DATA__ }) {
  // English is the site default; the /zh/ placeholder page is Traditional Chinese
  const lang = __NEXT_DATA__.page.startsWith('/zh') ? 'zh-Hant' : 'en'

  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

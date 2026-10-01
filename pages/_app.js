import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  // _document sets <html lang> only for the first server-rendered page. Keep it in sync after
  // client-side navigation (e.g. the EN | 繁中 switch) using the same rule as _document.js.
  useEffect(() => {
    document.documentElement.lang = pathname.startsWith('/zh-tw') ? 'zh-Hant' : 'en'
  }, [pathname])

  return <Component {...pageProps} />
}

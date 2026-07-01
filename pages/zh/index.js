import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { loadTranslations, useTranslation } from '../../lib/i18n'
import Layout from '../../components/Layout'
import styles from './zh.module.css'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('zh', ['common']) } }
}

export default function ZhHomePage({ translations }) {
  const { t } = useTranslation(translations.common)

  return (
    <Layout
      t={t}
      locale="zh"
      meta={{
        title: 'AskLinTax | 美國稅務知識平台',
        description: '專為美國華人家庭與小型企業打造的稅務知識平台。中文版即將推出。',
        canonical: '/zh/',
      }}
    >
      <Head>
        {/* Don't index the coming-soon page */}
        <meta name="robots" content="noindex, follow" />
      </Head>

      <section className={styles.comingSoon}>
        <div className={styles.inner}>
          <div className={styles.badge}>繁體中文</div>
          <h1 className={styles.title}>中文版即將推出</h1>
          <p className={styles.sub}>
            AskLinTax 的完整繁體中文版目前正在製作中。
            我們正在建立英文版的 Foundation 20 核心知識庫，
            完成後將進行人工校對的繁體中文翻譯。
          </p>
          <p className={styles.sub2}>
            Traditional Chinese content is coming soon.
            We are completing our English Foundation 20 knowledge base first,
            followed by professionally reviewed Traditional Chinese translations.
          </p>
          <div className={styles.actions}>
            <a href="/" className={styles.btnPrimary}>
              閱讀英文版 Read in English →
            </a>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressLabel}>Foundation 20 進度</div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '15%' }} />
            </div>
            <div className={styles.progressText}>3 / 20 篇已完成</div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

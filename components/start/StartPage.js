import { useState } from 'react'
import Layout from '../Layout'
import { useTranslation } from '../../lib/i18n'
import styles from '../../pages/start.module.css'

/**
 * Start Here — shared by English (/start/) and Traditional Chinese (/zh-tw/start/).
 * All copy and data come from `content` (lib/content/start-en.js, start-zh-tw.js).
 */
export default function StartPage({ translations, content, locale = 'en' }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  const c = content

  function toggleFaq(situationId, faqIndex) {
    const key = `${situationId}-${faqIndex}`
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Layout t={t} locale={locale} meta={c.meta}>

      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <span className={styles.pageHeroEyebrow}>{c.hero.eyebrow}</span>
          <h1 className={styles.pageHeroTitle}>{c.hero.title}</h1>
          <p className={styles.pageHeroSub}>{c.hero.sub}</p>
        </div>
      </section>

      {/* QUICK NAV */}
      <div className={styles.quickNav}>
        <div className="container">
          <div className={styles.quickNavInner}>
            {c.situations.map(s => (
              <a key={s.id} href={`#${s.id}`} className={styles.quickNavItem}>
                <span>{s.emoji}</span>
                <span>{s.subtitle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SITUATION SECTIONS */}
      <div className={styles.situationsWrap}>
        {c.situations.map((s, idx) => (
          <section
            key={s.id}
            id={s.id}
            className={`${styles.situation} ${idx % 2 === 1 ? styles.situationAlt : ''}`}
          >
            <div className="container">
              {/* Header */}
              <div className={styles.situationHeader}>
                <div className={styles.situationEmoji}>{s.emoji}</div>
                <div>
                  <span className="section-label">{s.subtitle}</span>
                  <h2 className={styles.situationTitle}>{s.title}</h2>
                  <p className={styles.situationDesc}>{s.desc}</p>
                  <span className={styles.emotionTag}>{s.emotion}</span>
                </div>
              </div>

              {/* Guides */}
              <div className={styles.guidesGrid}>
                {s.guides.filter(g => !g.planned).map(guide => (
                  <a key={guide.href} href={guide.href} className={styles.guideCard}>
                    <h3 className={styles.guideCardTitle}>{guide.title}</h3>
                    <p className={styles.guideCardDesc}>{guide.desc}</p>
                    <span className={styles.guideCardCta}>{c.readGuide}</span>
                  </a>
                ))}
              </div>

              {/* FAQs */}
              <div className={styles.faqWrap}>
                <h3 className={styles.faqHeading}>{c.faqHeading}</h3>
                <div className="faq-list">
                  {s.faqs.map((faq, fi) => {
                    const key = `${s.id}-${fi}`
                    const isOpen = !!openFaq[key]
                    return (
                      <div key={fi} className="faq-item" data-open={isOpen}>
                        <button className="faq-q" onClick={() => toggleFaq(s.id, fi)}>
                          {faq.q}
                          <span style={{ fontSize: '20px', color: isOpen ? '#fff' : 'var(--navy)', background: isOpen ? 'var(--navy)' : 'var(--slate)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                            {isOpen ? '×' : '+'}
                          </span>
                        </button>
                        <div className="faq-a">{faq.a}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <section className={styles.bottomCta}>
        <div className="container">
          <h2 className={styles.bottomCtaTitle}>{c.bottom.title}</h2>
          <p className={styles.bottomCtaSub}>{c.bottom.sub}</p>
          <a href={c.bottom.href} className="btn-primary">{c.bottom.cta}</a>
        </div>
      </section>

    </Layout>
  )
}

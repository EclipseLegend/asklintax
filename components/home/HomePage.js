import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../Layout'
import { useTranslation } from '../../lib/i18n'
import { localePath } from '../../lib/locale-routes'
import { SOCIAL_LINKS, SocialIcon, SocialLink } from '../SocialLinks'
import styles from '../../pages/index.module.css'

const youtube = SOCIAL_LINKS.find(l => l.id === 'youtube')
const otherSocial = SOCIAL_LINKS.filter(l => l.id !== 'youtube')

/**
 * Homepage — shared by English (/) and Traditional Chinese (/zh-tw/).
 * All copy and data come from `content` (lib/content/home-en.js, home-zh-tw.js).
 */

// ── INLINE SVG ICONS ──────────────────────────────────────
function IconDoc()    { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h4"/></svg> }
function IconMail()   { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function IconHome()   { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function IconBuild()  { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> }
function IconChart()  { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> }
function IconGlobe()  { return <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" fill="none" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function IconPeople() { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function IconDollar() { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }
function IconPin()    { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function IconGrad()   { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> }
function IconHouse()  { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function IconCard()   { return <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gold-l)" fill="none" strokeWidth="1.7"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> }
function IconSearch() { return <svg viewBox="0 0 24 24" width="18" height="18" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> }
function ClockIcon()  { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> }

const ICONS = {
  doc: IconDoc, mail: IconMail, home: IconHome, build: IconBuild, chart: IconChart, globe: IconGlobe,
  people: IconPeople, dollar: IconDollar, pin: IconPin, grad: IconGrad, house: IconHouse, card: IconCard,
}
const Icon = ({ name }) => { const C = ICONS[name]; return C ? <C /> : null }

// ── PAGE ──────────────────────────────────────────────────
export default function HomePage({ translations, content, locale = 'en' }) {
  const { t } = useTranslation(translations.common)
  const router = useRouter()
  const c = content
  // Guide links go to the /zh-tw/ translation on Chinese pages (English-only pages keep their URL).
  const L = href => localePath(href, locale)

  const [guideFilter,   setGuideFilter]   = useState('all')
  const [updateTab,     setUpdateTab]     = useState('federal')
  const [benefitFilter, setBenefitFilter] = useState('all')
  const [searchQuery,   setSearchQuery]   = useState('')

  function doSearch() {
    if (searchQuery.trim()) router.push(`${c.searchPath}?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const visibleGuides   = c.guideCards.filter(g => guideFilter === 'all' || g.cat === guideFilter)
  const publishedBenefits = c.benefitCards.filter(b => !b.planned)
  const visibleBenefits = publishedBenefits.filter(b => benefitFilter === 'all' || b.cat === benefitFilter)
  const currentUpdates  = c.updateData[updateTab] || c.updateData.federal

  const UPDATE_DOTS = { federal: styles.dotFed, california: styles.dotCa, irs: styles.dotIrs, credits: styles.dotCredit, deadlines: styles.dotDeadline }
  // Only show filter tabs that have at least one published card.
  const BENEFIT_TABS = ['all', 'family', 'california', 'business', 'immigrant']
    .filter(key => key === 'all' || publishedBenefits.some(b => b.cat === key))

  return (
    <Layout t={t} locale={locale} meta={c.meta} footerSocial={false}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{c.hero.eyebrow}</span>
          <h1 className={styles.heroH1}>
            {c.hero.titleLine1}<br />{c.hero.titleLine2}<em>{c.hero.titleEm}</em>
          </h1>
          <p className={styles.heroSub}>
            {c.hero.sub}
          </p>
          <div className={styles.searchWrap}>
            <IconSearch />
            <input
              type="text"
              placeholder={c.hero.placeholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              className={styles.searchInput}
            />
            <button onClick={doSearch} className={styles.searchBtn}>{c.hero.searchButton}</button>
          </div>
          <div className={styles.heroPills}>
            {c.hero.pills.map(p => (
              <a key={p.href} href={L(p.href)} className={styles.heroPill}>{p.label}</a>
            ))}
          </div>
        </div>
        <div className={styles.trustStrip}>
          <div className={`${styles.trustInner} container`}>
            {[t('trust.officialSources'), t('trust.bilingual'), t('trust.plainLanguage'), t('trust.free')].map(item => (
              <div key={item} className={styles.trustItem}>
                <span className={styles.trustDot} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── START HERE ── */}
      <section className={styles.startSection}>
        <div className="container">
          <span className="section-label">{c.start.label}</span>
          <h2 className="section-title">{c.start.title}</h2>
          <p className="section-sub">{c.start.sub}</p>
          <div className={styles.startGrid}>
            {c.startCards.map(card => (
              <div key={card.id} className={styles.startCard}>
                <div className={styles.startIcon}><Icon name={card.icon} /></div>
                <h3 className={styles.startCardTitle}>
                  {/* Stretched link: covers the whole card without nesting <a> tags */}
                  <a href={L(card.href)} className={styles.startCardLink}>{card.title}</a>
                </h3>
                <p className={styles.startCardDesc}>{card.desc}</p>
                <div className={styles.startLinks}>
                  {card.links.filter(l => !l.planned).map(l => (
                    <a key={l.href} href={L(l.href)} className={styles.startLink}>{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR GUIDES ── */}
      <section className={styles.guidesSection}>
        <div className="container">
          <span className="section-label">{c.guides.label}</span>
          <h2 className="section-title">{c.guides.title}</h2>
          <p className="section-sub">{c.guides.sub}</p>
          <div className={styles.guidesTabs}>
            {c.guides.tabs.map(tab => (
              <button key={tab.key} className={`${styles.guidesTab} ${guideFilter === tab.key ? styles.activeTab : ''}`} onClick={() => setGuideFilter(tab.key)}>{tab.label}</button>
            ))}
          </div>
          <div className={styles.guidesGrid}>
            {visibleGuides.map(card => (
              <a key={card.href} href={L(card.href)} className={styles.guideCard}>
                <div className={`${styles.guideCardTop} ${styles['top_' + card.topColor]}`} />
                <div className={styles.guideCardBody}>
                  <span className={`tag ${card.tagCls}`}>{card.tagLabel}</span>
                  <h4 className={styles.guideCardTitle}>{card.title}</h4>
                  <p className={styles.guideCardDesc}>{card.desc}</p>
                  <div className={styles.guideMeta}>
                    <span className={styles.guideRead}><ClockIcon /> {card.read}</span>
                    <span className={styles.guideEmotion}>{card.emotion}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className={styles.guidesFooter}>
            <a href={L(c.guides.browseHref)} className="btn-outline">{c.guides.browseCta}</a>
          </div>
        </div>
      </section>

      {/* ── TAX UPDATES ── */}
      <section className={styles.updatesSection}>
        <div className="container">
          <span className="section-label">{c.updates.label}</span>
          <h2 className="section-title">{c.updates.title}</h2>
          <p className="section-sub">{c.updates.sub}</p>
          <div className={styles.updatesInner}>
            <div className={styles.updatesTabs}>
              {c.updates.tabs.map(tab => (
                <button key={tab.key} className={`${styles.updateTab} ${updateTab === tab.key ? styles.activeUpdateTab : ''}`} onClick={() => setUpdateTab(tab.key)}>
                  <span className={`${styles.dot} ${UPDATE_DOTS[tab.key]}`} />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.updatesFeed}>
              {currentUpdates.map((item, i) => (
                <a key={i} href={L(item.href)} className={styles.updateItem}>
                  <div className={styles.updateItemHead}>
                    {item.tags.map(tag => <span key={tag.text} className={`tag ${tag.cls}`}>{tag.text}</span>)}
                  </div>
                  <h4 className={styles.updateItemTitle}>{item.title}</h4>
                  <p className={styles.updateItemDesc}>{item.desc}</p>
                  <div className={styles.updateDate}>{item.date}</div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a href={L(c.updates.seeAllHref)} className="btn-outline">{c.updates.seeAllCta}</a>
          </div>
        </div>
      </section>

      {/* ── MONEY & BENEFITS ── */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold-l)' }}>{c.benefits.label}</span>
          <h2 className="section-title" style={{ color: '#fff' }}>{c.benefits.title}</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.benefits.sub}</p>
          <div className={styles.benefitsFilter}>
            {BENEFIT_TABS.map(key => (
              <button key={key} className={`${styles.benefitsBtn} ${benefitFilter === key ? styles.activeBenefitBtn : ''}`} onClick={() => setBenefitFilter(key)}>
                {c.benefits.tabLabels[key]}
              </button>
            ))}
          </div>
          <div className={styles.benefitsGrid}>
            {visibleBenefits.map(card => (
              <a key={card.href} href={L(card.href)} className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}><Icon name={card.icon} /></div>
                <h4 className={styles.benefitCardTitle}>{card.title}</h4>
                <p className={styles.benefitCardDesc}>{card.desc}</p>
                <div className={styles.benefitAmount}>{card.amount}</div>
                <div className={styles.benefitArrow}>{card.cta}</div>
              </a>
            ))}
          </div>
          <p className={styles.benefitsNote}>{c.benefits.note}</p>
        </div>
      </section>

      {/* ── FOLLOW ASKLINTAX ── YouTube first, other official accounts below (links only, no embeds) */}
      <section className={styles.followSection}>
        <div className={`${styles.followInner} container`}>
          <div>
            <h2 className={styles.followTitle}>{t('social.title')}</h2>
            <p className={styles.followSub}>{t('social.sub')}</p>
          </div>
          <a href={youtube.href} target="_blank" rel="noopener noreferrer" className={styles.followYoutube}
            aria-label={t('social.youtubeAriaLabel')}>
            <SocialIcon id="youtube" />
            <span>{t('social.watchOnYoutube')}</span>
          </a>
          <div className={styles.followMore}>
            <span className={styles.followMoreLabel}>{t('social.alsoOn')}</span>
            <ul className={styles.followList}>
              {otherSocial.map(link => (
                <li key={link.id}><SocialLink link={link} t={t} className={styles.followChip} /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── KEEP LEARNING ── (hidden until at least two of these resources are published) */}
      {c.learnCards.filter(card => !card.planned).length >= 2 && (
      <section className={styles.learnSection}>
        <div className="container">
          <span className="section-label">{c.learn.label}</span>
          <h2 className="section-title">{c.learn.title}</h2>
          <p className="section-sub">{c.learn.sub}</p>
          <div className={styles.learnGrid}>
            {c.learnCards.filter(card => !card.planned).map(card => (
              <a key={card.href} href={L(card.href)} className={styles.learnCard}>
                <div className={styles.learnCardIcon} style={{ background: card.iconBg, color: card.iconColor, fontSize: '22px' }}>
                  {card.icon}
                </div>
                <h4 className={styles.learnCardTitle}>{card.title}</h4>
                <p className={styles.learnCardDesc}>{card.desc}</p>
                <span className={styles.learnCta}>{card.cta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

    </Layout>
  )
}

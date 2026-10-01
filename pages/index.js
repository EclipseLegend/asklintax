import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { loadTranslations, useTranslation } from '../lib/i18n'
import styles from './index.module.css'

export async function getStaticProps({ locale }) {
  return {
    props: {
      translations: loadTranslations(locale, ['common', 'home']),
    },
  }
}

// ── DATA — dates sourced from lib/tax-config.js ──────────
// Update lib/tax-config.js each filing season
const UPDATE_DATA = {
  federal: [
    { title: 'Standard deduction increases for Tax Year 2025', desc: 'After the 2025 federal tax law, the standard deduction is $15,750 for single filers, $31,500 for married filing jointly, and $23,625 for head of household.', tags: [{ text: 'Federal', cls: 'tag-blue' }, { text: '2025 Tax Year', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#standard-deduction' },
    { title: '1099-K threshold restored to $20,000 and 200 transactions', desc: 'A 2025 federal law retroactively restored the higher reporting threshold for payment apps and online marketplaces. Card payments have no minimum, and income is still taxable without a 1099-K.', tags: [{ text: 'Federal', cls: 'tag-blue' }], date: 'Updated October 2026', href: '/updates/#form-1099-k' },
    { title: 'IRS Free File for 2025 returns: AGI of $89,000 or less', desc: 'For 2025 returns, IRS Free File offers guided tax software at no cost to taxpayers with adjusted gross income of $89,000 or less.', tags: [{ text: 'Federal', cls: 'tag-blue' }, { text: '2025 Tax Year', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#direct-file' },
  ],
  california: [
    { title: 'CalEITC for Tax Year 2025: up to $3,756', desc: "California's Earned Income Tax Credit is worth up to $3,756 for tax year 2025 for working families and individuals earning up to $32,900.", tags: [{ text: 'California', cls: 'tag-green' }, { text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#caleitc' },
  ],
  irs: [
    { title: 'Check if your ITIN has expired', desc: 'If an ITIN isn\'t used on a federal tax return for 3 consecutive tax years, it expires on December 31 after the third year. Renew it before you include it on a tax return.', tags: [{ text: 'IRS Notice', cls: 'tag-red' }, { text: 'Action Required', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/library/individual/itin/' },
  ],
  credits: [
    { title: 'Child Tax Credit: $2,200 per child for Tax Year 2025', desc: 'The 2025 federal tax law raised the CTC to $2,200 per qualifying child under 17; up to $1,700 is refundable. The claimant (or spouse, if filing jointly) and each child need SSNs valid for employment.', tags: [{ text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#child-tax-credit' },
    { title: 'EITC maximum rises to $8,046 for Tax Year 2025', desc: "The Earned Income Tax Credit maximum increased. Many low-to-moderate income families qualify — don't leave this unclaimed.", tags: [{ text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#eitc' },
  ],
  deadlines: [
    { title: 'Extended 2025 returns due October 15, 2026', desc: 'If you have an automatic 6-month extension for your 2025 return, file Form 1040 or 1040-SR by October 15, 2026 and pay any tax, interest, and penalties due.', tags: [{ text: 'Deadline', cls: 'tag-red' }], date: 'Updated October 2026', href: '/updates/#calendar' },
    { title: 'FBAR extended deadline: October 15, 2026', desc: 'Foreign bank account reports (FinCEN Form 114) for 2025 have an automatic extension to October 15, 2026.', tags: [{ text: 'Deadline', cls: 'tag-red' }, { text: 'FBAR', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#calendar' },
    { title: 'Final 2026 estimated tax payment due January 15, 2027', desc: 'Self-employed individuals and business owners: the fourth 2026 estimated tax payment is due January 15, 2027 — or file your 2026 return and pay in full by February 1, 2027.', tags: [{ text: 'Deadline', cls: 'tag-red' }, { text: 'Estimated Tax', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#calendar' },
  ],
}

const GUIDE_CARDS = [
  { href: '/library/irs/irs-notice',               cat: 'irs',        topColor: 'gold',   tagCls: 'tag-gold',  tagLabel: 'IRS & Tax Issues',       title: 'I received an IRS letter — what do I do?',                           desc: 'Most IRS notices are routine. Here\'s how to read the letter and figure out your next step without panicking.', read: '4 min read', emotion: '😨 Feeling anxious?' },
  { href: '/library/business-formation/llc-basics', cat: 'business',   topColor: 'navy',   tagCls: 'tag-navy',  tagLabel: 'Business Formation',      title: 'What is an LLC and do I actually need one?',                          desc: 'LLC is one of the most searched terms in small business taxes. Here\'s what it means in plain language.',       read: '5 min read', emotion: '🤔 Deciding?' },
  { href: '/library/individual/new-immigrant',      cat: 'individual', topColor: 'forest', tagCls: 'tag-green', tagLabel: 'Individuals & Families',   title: 'New to the U.S.? What you need to know about taxes',                  desc: 'Your first tax year in America doesn\'t need to be confusing. A complete, plain-language guide.',              read: '6 min read', emotion: '📚 Just learning' },
  { href: '/library/rental/airbnb-tax-guide',       cat: 'rental',     topColor: 'blue',   tagCls: 'tag-blue',  tagLabel: 'Real Estate & Airbnb',    title: 'Airbnb host? Here\'s what you need to report on your taxes',          desc: 'Short-term rental income has its own rules. What counts, what\'s deductible, and the 14-day rule.',            read: '5 min read', emotion: '📋 Getting organized' },
  { href: '/library/business-formation/llc-vs-scorp', cat: 'business', topColor: 'navy',  tagCls: 'tag-navy',  tagLabel: 'Business Formation',      title: 'LLC vs S-Corp: which structure is right for your business?',          desc: 'One of the most important — and confusing — decisions for small business owners. A clear comparison.',          read: '7 min read', emotion: '🤔 Comparing options' },
  { href: '/library/investment/fbar',              cat: 'individual', topColor: 'red',    tagCls: 'tag-red',   tagLabel: 'Investments & Foreign Accounts',  title: 'Do you have accounts outside the U.S.? You may need to file FBAR',   desc: 'Many Chinese families don\'t know they\'re required to report foreign bank accounts.',                          read: '5 min read', emotion: '⚠️ Check if this applies' },
]

const START_CARDS = [
  { id: 'first-time', href: '/start#first-time', icon: <IconDoc />,     title: 'I\'m filing U.S. taxes for the first time', desc: 'Never filed a U.S. tax return before. Not sure where to start or what documents you need.', links: [{ href: '/library/individual/first-time-filer', label: '→ First-Time Filer Complete Guide' }, { href: '/library/individual/tax-residency', label: '→ Am I a U.S. tax resident?' }] },
  { id: 'irs',        href: '/start#irs',         icon: <IconMail />,    title: 'I received a letter from the IRS', desc: 'Got a letter in the mail from the IRS. Not sure what it means or what to do.',             links: [{ href: '/library/irs/irs-notice', label: '→ What to do with an IRS letter' }, { href: '/library/irs/cp2000', label: '→ CP2000 Notice explained' }] },
  { id: 'airbnb',     href: '/start#airbnb',      icon: <IconHome />,    title: 'I have Airbnb or rental income', desc: 'You rent out a property or room on Airbnb. Need to understand what to report and what\'s deductible.', links: [{ href: '/library/rental/airbnb-tax-guide', label: '→ Airbnb Tax Complete Guide' }, { href: '/library/rental/14-day-rule', label: '→ The 14-day rule explained' }] },
  { id: 'llc',        href: '/start#llc',         icon: <IconBuild />,   title: 'I\'m starting or running a small business', desc: 'Self-employed, freelancer, or thinking about starting an LLC. Where do you begin?',           links: [{ href: '/library/business-formation/llc-basics', label: '→ What is an LLC?' }, { href: '/library/business-formation/llc-vs-scorp', label: '→ LLC vs S-Corp: which is better?' }] },
  { id: 'crypto',     href: '/start#crypto',      icon: <IconChart />,   title: 'I have crypto or investment income', desc: 'Crypto, stocks, or foreign accounts. Unsure about capital gains, 1099-B, or FBAR requirements.', links: [{ href: '/library/investment/crypto-tax', label: '→ Crypto taxes explained' }, { href: '/library/investment/fbar', label: '→ Do I need to file FBAR?' }] },
  { id: 'immigrant',  href: '/start#immigrant',   icon: <IconGlobe />,   title: 'I\'m a new immigrant or have cross-border tax questions', desc: 'New immigrant, dual-status, or have income or accounts outside the U.S. You have special obligations.', links: [{ href: '/library/individual/new-immigrant', label: '→ New immigrant tax guide' }, { href: '/library/individual/dual-status', label: '→ Dual-status filer explained', planned: true }] },
]

// `planned: true` = article/page not published yet. Kept for the roadmap, hidden from the UI
// so the homepage never links to a 404. Remove the flag once the page exists.
const LEARN_CARDS = [
  { href: '/learn',     icon: '▶', iconBg: '#FFF0F0', iconColor: '#DC2626', title: 'YouTube Learning Center', desc: 'Short, clear videos on the tax topics that matter most. No jargon, no sales pitch — just answers.', cta: 'Watch on YouTube →', planned: true },
  { href: '/checklist', icon: '☑', iconBg: 'var(--gold-pale)', iconColor: 'var(--gold)', title: 'Document Checklist', desc: 'Know exactly what documents to gather before tax season. Customized by situation — individual, business, or Airbnb host.', cta: 'Get the checklist →', planned: true },
  { href: '/glossary',  icon: '📖', iconBg: 'var(--blue-soft)', iconColor: 'var(--blue)', title: 'Tax Glossary', desc: 'See a term you don\'t understand? Every entry is explained in plain language first — technical definition comes second.', cta: 'Browse glossary →', planned: true },
  { href: '/updates/#calendar', icon: '📅', iconBg: 'var(--green-soft)', iconColor: 'var(--green)', title: 'U.S. Tax Calendar', desc: 'Never miss a deadline for the 2026 filing season. Key dates for individuals, businesses, and quarterly filers.', cta: 'View tax calendar →' },
]

const BENEFIT_CARDS = [
  { cat: 'family',     href: '/library/individual/child-tax-credit',     icon: <IconPeople />, title: 'Child Tax Credit',              desc: 'Up to $2,200 per qualifying child under 17. Many immigrant families don\'t claim this — even when eligible.', amount: 'Up to $2,200 per child',           cta: 'Check if you qualify →' },
  { cat: 'family',     href: '/library/individual/earned-income-credit',  icon: <IconDollar />, title: 'Earned Income Tax Credit (EITC)', desc: 'A refundable credit for low-to-moderate income workers. One of the most underclaimed benefits in America.',    amount: 'Up to $8,046 (Tax Year 2025)',              cta: 'See if you\'re eligible →', planned: true },
  { cat: 'california', href: '/library/individual/caleitc',               icon: <IconPin />,    title: 'California EITC (CalEITC)',     desc: 'California\'s own version of the EITC — stackable with the federal credit. Many Californians miss this entirely.', amount: 'Up to $3,756 (Tax Year 2025)',             cta: 'California residents only →', planned: true },
  { cat: 'family',     href: '/library/individual/education-credits',     icon: <IconGrad />,   title: 'Education Tax Credits',         desc: 'The American Opportunity Credit and Lifetime Learning Credit can reduce your tax bill.',                        amount: 'Up to $2,500 per student',         cta: 'See education credits →', planned: true },
  { cat: 'business',   href: '/library/small-business/business-deductions/', icon: <IconHouse />,  title: 'Home Office Deduction',         desc: 'If you work from home and have a dedicated workspace, you can deduct a portion of your rent or mortgage.',     amount: 'Deduct up to $1,500 (simplified)', cta: 'Read about the deduction →' },
  { cat: 'immigrant',  href: '/library/individual/itin/',                 icon: <IconCard />,   title: 'ITIN Holders Can Still Get Refunds', desc: 'Many new immigrants with ITINs don\'t realize they can still receive federal tax refunds and certain credits.', amount: 'Potential refunds available',      cta: 'Learn about ITIN filing →' },
]

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

// ── PAGE ──────────────────────────────────────────────────
export default function HomePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const router = useRouter()

  const [guideFilter,   setGuideFilter]   = useState('all')
  const [updateTab,     setUpdateTab]     = useState('federal')
  const [benefitFilter, setBenefitFilter] = useState('all')
  const [searchQuery,   setSearchQuery]   = useState('')

  function doSearch() {
    if (searchQuery.trim()) router.push(`/library?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const visibleGuides   = GUIDE_CARDS.filter(g => guideFilter === 'all' || g.cat === guideFilter)
  const publishedBenefits = BENEFIT_CARDS.filter(b => !b.planned)
  const visibleBenefits = publishedBenefits.filter(b => benefitFilter === 'all' || b.cat === benefitFilter)
  const currentUpdates  = UPDATE_DATA[updateTab] || UPDATE_DATA.federal

  const GUIDE_TABS = [
    { key: 'all',        label: 'All Topics' },
    { key: 'individual', label: 'Individuals & Families' },
    { key: 'business',   label: 'Business Formation' },
    { key: 'rental',     label: 'Real Estate & Airbnb' },
    { key: 'irs',        label: 'IRS & Tax Issues' },
  ]
  const UPDATE_TABS = [
    { key: 'federal',    label: 'Federal',         dot: styles.dotFed },
    { key: 'california', label: 'California',      dot: styles.dotCa },
    { key: 'irs',        label: 'IRS Notices',     dot: styles.dotIrs },
    { key: 'credits',    label: 'Credits & Rebates', dot: styles.dotCredit },
    { key: 'deadlines',  label: 'Deadlines',       dot: styles.dotDeadline },
  ]
  // Only show filter tabs that have at least one published card.
  const BENEFIT_TABS = ['all', 'family', 'california', 'business', 'immigrant']
    .filter(key => key === 'all' || publishedBenefits.some(b => b.cat === key))
  const BENEFIT_TAB_LABELS = { all: 'All', family: 'Families', california: 'California', business: 'Small Business', immigrant: 'New Immigrants' }

  return (
    <Layout t={t} meta={{ title: 'AskLinTax | U.S. Tax Knowledge for Chinese Families & Small Businesses' }}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Trusted Tax Knowledge for Chinese Families in North America</span>
          <h1 className={styles.heroH1}>
            U.S. taxes, explained<br />for <em>Chinese families.</em>
          </h1>
          <p className={styles.heroSub}>
            Search any tax question — in plain language, no jargon. Built for Chinese families and small businesses navigating the U.S. tax system.
          </p>
          <div className={styles.searchWrap}>
            <IconSearch />
            <input
              type="text"
              placeholder='Search e.g. "What is an LLC?" or "Airbnb taxes"'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              className={styles.searchInput}
            />
            <button onClick={doSearch} className={styles.searchBtn}>Search</button>
          </div>
          <div className={styles.heroPills}>
            {[
              { href: '/start#first-time', label: '🗂 First-time filer' },
              { href: '/start#irs',        label: '📬 Got an IRS letter' },
              { href: '/start#airbnb',     label: '🏠 Airbnb income' },
              { href: '/start#llc',        label: '🏪 Start an LLC' },
              { href: '/start#crypto',     label: '📈 Crypto taxes' },
              { href: '/start#immigrant',  label: '✈️ New immigrant' },
            ].map(p => (
              <a key={p.href} href={p.href} className={styles.heroPill}>{p.label}</a>
            ))}
          </div>
        </div>
        <div className={styles.trustStrip}>
          <div className={`${styles.trustInner} container`}>
            {[t('trust.cpaReviewed'), t('trust.bilingual'), t('trust.plainLanguage'), t('trust.free')].map(item => (
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
          <span className="section-label">Start Here</span>
          <h2 className="section-title">What brings you here today?</h2>
          <p className="section-sub">Start with your situation — we'll guide you to exactly what you need, without the confusing tax jargon.</p>
          <div className={styles.startGrid}>
            {START_CARDS.map(card => (
              <div key={card.id} className={styles.startCard}>
                <div className={styles.startIcon}>{card.icon}</div>
                <h3 className={styles.startCardTitle}>
                  {/* Stretched link: covers the whole card without nesting <a> tags */}
                  <a href={card.href} className={styles.startCardLink}>{card.title}</a>
                </h3>
                <p className={styles.startCardDesc}>{card.desc}</p>
                <div className={styles.startLinks}>
                  {card.links.filter(l => !l.planned).map(l => (
                    <a key={l.href} href={l.href} className={styles.startLink}>{l.label}</a>
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
          <span className="section-label">Popular Guides</span>
          <h2 className="section-title">Most helpful right now</h2>
          <p className="section-sub">The questions Chinese families and small business owners ask us most — answered clearly.</p>
          <div className={styles.guidesTabs}>
            {GUIDE_TABS.map(tab => (
              <button key={tab.key} className={`${styles.guidesTab} ${guideFilter === tab.key ? styles.activeTab : ''}`} onClick={() => setGuideFilter(tab.key)}>{tab.label}</button>
            ))}
          </div>
          <div className={styles.guidesGrid}>
            {visibleGuides.map(card => (
              <a key={card.href} href={card.href} className={styles.guideCard}>
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
            <a href="/library" className="btn-outline">Browse Full Knowledge Library →</a>
          </div>
        </div>
      </section>

      {/* ── TAX UPDATES ── */}
      <section className={styles.updatesSection}>
        <div className="container">
          <span className="section-label">Tax Updates</span>
          <h2 className="section-title">What's changed recently</h2>
          <p className="section-sub">Tax laws change every year. We track the updates that matter most to Chinese families and small businesses.</p>
          <div className={styles.updatesInner}>
            <div className={styles.updatesTabs}>
              {UPDATE_TABS.map(tab => (
                <button key={tab.key} className={`${styles.updateTab} ${updateTab === tab.key ? styles.activeUpdateTab : ''}`} onClick={() => setUpdateTab(tab.key)}>
                  <span className={`${styles.dot} ${tab.dot}`} />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.updatesFeed}>
              {currentUpdates.map((item, i) => (
                <a key={i} href={item.href} className={styles.updateItem}>
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
            <a href="/updates" className="btn-outline">See All Tax Updates →</a>
          </div>
        </div>
      </section>

      {/* ── MONEY & BENEFITS ── */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold-l)' }}>Money & Benefits</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Benefits you may not know you qualify for</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>Many Chinese families miss out on tax credits and government benefits due to language barriers. This is money you may already be entitled to.</p>
          <div className={styles.benefitsFilter}>
            {BENEFIT_TABS.map(key => (
              <button key={key} className={`${styles.benefitsBtn} ${benefitFilter === key ? styles.activeBenefitBtn : ''}`} onClick={() => setBenefitFilter(key)}>
                {BENEFIT_TAB_LABELS[key]}
              </button>
            ))}
          </div>
          <div className={styles.benefitsGrid}>
            {visibleBenefits.map(card => (
              <a key={card.href} href={card.href} className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>{card.icon}</div>
                <h4 className={styles.benefitCardTitle}>{card.title}</h4>
                <p className={styles.benefitCardDesc}>{card.desc}</p>
                <div className={styles.benefitAmount}>{card.amount}</div>
                <div className={styles.benefitArrow}>{card.cta}</div>
              </a>
            ))}
          </div>
          <p className={styles.benefitsNote}>Information is for general educational purposes. Eligibility depends on individual circumstances — always verify with a qualified tax professional.</p>
        </div>
      </section>

      {/* ── KEEP LEARNING ── (hidden until at least two of these resources are published) */}
      {LEARN_CARDS.filter(c => !c.planned).length >= 2 && (
      <section className={styles.learnSection}>
        <div className="container">
          <span className="section-label">Keep Learning</span>
          <h2 className="section-title">More ways to explore</h2>
          <p className="section-sub">Short videos, checklists, and quick references — all designed for Chinese families navigating U.S. taxes.</p>
          <div className={styles.learnGrid}>
            {LEARN_CARDS.filter(c => !c.planned).map(card => (
              <a key={card.href} href={card.href} className={styles.learnCard}>
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

import { useState } from 'react'
import Layout from '../components/Layout'
import { loadTranslations, useTranslation } from '../lib/i18n'
import styles from './start.module.css'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const SITUATIONS = [
  {
    id: 'first-time',
    emoji: '🗂',
    title: '我第一次在美國報稅',
    subtitle: 'First-Time Filer',
    desc: 'You\'ve never filed a U.S. tax return before — or you\'re not sure if you need to. This is the most common starting point for new immigrants and international students.',
    emotion: '📚 Learning',
    guides: [
      { href: '/library/individual/first-time-filer', title: 'First-Time Filer: A Complete Guide', desc: 'Step-by-step walkthrough of your first U.S. tax return — what forms you need, what to expect, and common mistakes to avoid.' },
      { href: '/library/individual/tax-residency', title: 'Am I a U.S. Tax Resident?', desc: 'Your tax status depends on how long you\'ve been in the U.S. This guide explains the Substantial Presence Test in plain language.' },
      { href: '/library/individual/itin', title: 'What is an ITIN and Do I Need One?', desc: 'If you don\'t have a Social Security Number, you may need an ITIN to file. Here\'s how to apply.' },
    ],
    faqs: [
      { q: 'Do I need to file taxes if I just arrived in the U.S.?', a: 'It depends on how long you\'ve been here and what income you earned. In general, if you earned income in the U.S. — from a job, freelance work, or investments — you likely need to file. Use the Substantial Presence Test to determine your filing status.' },
      { q: 'What\'s the deadline for filing my first tax return?', a: 'The standard federal deadline is April 15. If that date falls on a weekend or holiday, it shifts to the next business day. You can request an automatic 6-month extension by filing Form 4868, which gives you until October 15.' },
      { q: 'What happens if I miss the deadline?', a: 'If you owe taxes, you\'ll be charged a late filing penalty and interest. If you\'re owed a refund, there\'s no penalty — but you won\'t get your refund until you file. It\'s always better to file late than never.' },
    ],
  },
  {
    id: 'irs',
    emoji: '📬',
    title: '我收到 IRS 的信',
    subtitle: 'IRS Notice',
    desc: 'Getting a letter from the IRS is stressful — but most notices are routine and don\'t require immediate panic. The key is to read carefully, understand what the IRS is asking, and respond within the deadline.',
    emotion: '😨 Anxious',
    guides: [
      { href: '/library/irs/irs-notice', title: 'I Received an IRS Letter — What Do I Do?', desc: 'Don\'t panic. Most IRS notices are routine. This guide helps you read the letter, identify the notice type, and decide your next step.' },
      { href: '/library/irs/cp2000', title: 'CP2000 Notice Explained', desc: 'The CP2000 is one of the most common IRS notices. It means the IRS found a discrepancy between your return and what was reported by employers or banks.' },
      { href: '/library/irs/audit', title: 'What to Do If You\'re Being Audited', desc: 'An audit is a review of your tax return. Learn what triggers audits, what to expect, and when you need professional help.' },
    ],
    faqs: [
      { q: 'Does an IRS letter mean I\'m in trouble?', a: 'Not necessarily. The IRS sends letters for many routine reasons — confirming your identity, asking for a missing document, or notifying you of a small adjustment. Always read the letter carefully before assuming the worst.' },
      { q: 'How long do I have to respond to an IRS notice?', a: 'Most notices give you 30–60 days to respond. The deadline is clearly stated in the letter. Missing the deadline can result in additional penalties, so mark the date on your calendar as soon as you receive it.' },
      { q: 'Should I call the IRS directly?', a: 'You can, but IRS wait times can be very long. For most notices, responding in writing (by mail or online) with the requested information is more effective. If the notice involves a large amount or legal action, consult a CPA or tax attorney first.' },
    ],
  },
  {
    id: 'airbnb',
    emoji: '🏠',
    title: '我有 Airbnb 或出租收入',
    subtitle: 'Rental Income',
    desc: 'Rental income — whether from Airbnb, a long-term tenant, or a room in your home — is taxable income. But you can also deduct many expenses, which can significantly reduce what you owe.',
    emotion: '📋 Organizing',
    guides: [
      { href: '/library/rental/airbnb-tax-guide', title: 'Airbnb Host Tax Complete Guide', desc: 'Everything you need to know about reporting Airbnb income: what counts, what\'s deductible, and how the 14-day rule can change everything.' },
      { href: '/library/rental/14-day-rule', title: 'The 14-Day Rule Explained', desc: 'If you rent your home for fewer than 15 days a year, you may not need to report that income at all. Here\'s how the rule works.' },
      { href: '/library/rental/rental-deductions', title: 'What Can Airbnb Hosts Deduct?', desc: 'Cleaning fees, supplies, furniture, insurance, depreciation — a complete list of what you can and can\'t deduct as an Airbnb host.' },
    ],
    faqs: [
      { q: 'Do I need to report Airbnb income on my taxes?', a: 'Yes, in almost all cases. Airbnb is required to send you a 1099-K if you earn more than $600 in a year. But even if you don\'t receive a 1099-K, the income is still taxable and should be reported.' },
      { q: 'What is the 14-day rule?', a: 'If you rent your primary home (or a vacation home) for fewer than 15 days in a year, you don\'t need to report that rental income. But you also can\'t deduct rental expenses. This rule only applies to personal residences — not investment properties.' },
      { q: 'Can I deduct the cost of furniture and appliances?', a: 'Yes. Items used for your rental can generally be deducted — either all at once (if under the de minimis threshold) or depreciated over several years. Keep all receipts.' },
    ],
  },
  {
    id: 'llc',
    emoji: '🏪',
    title: '我想開公司或已有小生意',
    subtitle: 'Small Business & LLC',
    desc: 'Starting a business in the U.S. involves more than just having a great idea. You\'ll need to understand business structures, tax obligations, quarterly payments, and what you can deduct.',
    emotion: '🤔 Deciding',
    guides: [
      { href: '/library/business-formation/llc-basics', title: 'What is an LLC and Do I Need One?', desc: 'A plain-language explanation of what an LLC is, what protection it offers, and whether it\'s right for your situation.' },
      { href: '/library/business-formation/llc-vs-scorp', title: 'LLC vs S-Corp: Which Is Better for You?', desc: 'The most important business structure decision you\'ll make. Here\'s a clear comparison — with real scenarios — to help you decide.' },
      { href: '/library/small-business/quarterly-taxes', title: 'Quarterly Estimated Tax Payments Explained', desc: 'If you\'re self-employed, you\'re expected to pay taxes four times a year. Here\'s how to calculate and pay them without penalties.' },
    ],
    faqs: [
      { q: 'Do I need an LLC to start a business?', a: 'No — you can operate as a sole proprietor without forming an LLC. But an LLC provides personal liability protection, which means your personal assets (home, savings) are generally protected if your business faces legal issues. Many small business owners find the protection worth the cost.' },
      { q: 'How much does it cost to form an LLC?', a: 'State filing fees vary widely — from about $50 in some states to over $500 in others. California, for example, has an $800 annual minimum franchise tax regardless of income. Always check your state\'s specific requirements.' },
      { q: 'What\'s the difference between an LLC and S-Corp for taxes?', a: 'By default, a single-member LLC is taxed like a sole proprietor — all profits are subject to self-employment tax. An S-Corp allows you to split income into salary and distributions, which can reduce self-employment taxes at higher income levels. But S-Corps have more compliance requirements.' },
    ],
  },
  {
    id: 'crypto',
    emoji: '📈',
    title: '我有加密貨幣或投資收益',
    subtitle: 'Investments & Crypto',
    desc: 'Every time you sell crypto, trade one coin for another, or use crypto to buy something, it\'s a taxable event. Stocks, dividends, and foreign accounts also have specific reporting requirements.',
    emotion: '⚠️ Check this',
    guides: [
      { href: '/library/investments/crypto-tax', title: 'Crypto Taxes Explained', desc: 'When is crypto taxable? How do you calculate gains and losses? What counts as a taxable event? Everything explained in plain language.' },
      { href: '/library/investments/fbar', title: 'Do I Need to File FBAR?', desc: 'If you have more than $10,000 in foreign bank accounts at any point in the year, you\'re required to file an FBAR. Many Chinese families don\'t know this requirement applies to them.' },
      { href: '/library/investments/capital-gains', title: 'Capital Gains Tax: Short-Term vs Long-Term', desc: 'How long you hold an investment dramatically affects your tax rate. Here\'s how short-term and long-term capital gains are taxed differently.' },
    ],
    faqs: [
      { q: 'Do I need to report crypto even if I didn\'t sell anything?', a: 'If you only held crypto and didn\'t sell, trade, or use it, you generally don\'t have a taxable event. But you must still answer the crypto question on your tax return honestly. Mining, staking rewards, and airdrops are also taxable even without selling.' },
      { q: 'I have bank accounts in Taiwan/China. Do I need to report them?', a: 'Yes, if the combined balance exceeded $10,000 USD at any point during the year, you\'re required to file an FBAR (FinCEN 114). Failure to file can result in significant penalties — even if you owe no tax.' },
      { q: 'What if I lost money on crypto — do I still need to report it?', a: 'Yes, you need to report all disposals (sales, trades, purchases using crypto). But capital losses can offset capital gains, and up to $3,000 of net losses can offset ordinary income each year. Keep records of every transaction.' },
    ],
  },
  {
    id: 'immigrant',
    emoji: '✈️',
    title: '我剛移民或有跨境稅務問題',
    subtitle: 'New Immigrant & Cross-Border',
    desc: 'Moving to the U.S. creates a unique tax situation. Your first year may be a "dual-status" year. You may have foreign income, foreign accounts, and foreign assets — all of which have U.S. reporting requirements.',
    emotion: '📚 Learning',
    guides: [
      { href: '/library/individual/new-immigrant', title: 'New Immigrant Tax Guide', desc: 'Everything you need to know about your first tax year in the U.S. — filing status, what income to report, ITIN vs SSN, and key deadlines.' },
      { href: '/library/individual/dual-status', title: 'Dual-Status Filer Explained', desc: 'In your year of arrival, you may be a "dual-status alien" — part non-resident, part resident. This creates a more complex return.' },
      { href: '/library/investments/fbar', title: 'FBAR: Reporting Foreign Bank Accounts', desc: 'If you have accounts in Taiwan, China, or anywhere outside the U.S. with more than $10,000, you must file an FBAR every year.' },
    ],
    faqs: [
      { q: 'Do I need to report income I earned before moving to the U.S.?', a: 'It depends on your residency status. If you\'re a "resident alien" for tax purposes, you\'re taxed on worldwide income for the entire year. If you arrived mid-year, you may be a "dual-status alien" and only owe tax on U.S.-source income for the period before your residency began.' },
      { q: 'My parents sent me money from Taiwan. Is that taxable?', a: 'Gifts from foreign individuals are generally not taxable income for the recipient. However, if you received more than $100,000 in gifts from foreign individuals in a year, you must report it on Form 3520 — even though you don\'t owe tax on it.' },
      { q: 'I have an account in China/Taiwan with more than $10,000. What do I do?', a: 'You\'re required to file an FBAR (FinCEN 114) annually by April 15. This is separate from your tax return and filed directly with FinCEN. Penalties for non-filing can be severe — up to $10,000 per violation for non-willful violations.' },
    ],
  },
]

export default function StartHerePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})

  function toggleFaq(situationId, faqIndex) {
    const key = `${situationId}-${faqIndex}`
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Layout t={t} meta={{ title: 'Start Here | AskLinTax', description: 'Find your tax situation and get guided to exactly what you need.' }}>

      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <span className={styles.pageHeroEyebrow}>Start Here</span>
          <h1 className={styles.pageHeroTitle}>What brings you here today?</h1>
          <p className={styles.pageHeroSub}>Choose your situation below. We'll show you exactly what you need to know — in plain language, without the jargon.</p>
        </div>
      </section>

      {/* QUICK NAV */}
      <div className={styles.quickNav}>
        <div className="container">
          <div className={styles.quickNavInner}>
            {SITUATIONS.map(s => (
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
        {SITUATIONS.map((s, idx) => (
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
                {s.guides.map(guide => (
                  <a key={guide.href} href={guide.href} className={styles.guideCard}>
                    <h3 className={styles.guideCardTitle}>{guide.title}</h3>
                    <p className={styles.guideCardDesc}>{guide.desc}</p>
                    <span className={styles.guideCardCta}>Read guide →</span>
                  </a>
                ))}
              </div>

              {/* FAQs */}
              <div className={styles.faqWrap}>
                <h3 className={styles.faqHeading}>Common questions</h3>
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
          <h2 className={styles.bottomCtaTitle}>Ready to explore the full library?</h2>
          <p className={styles.bottomCtaSub}>Browse all 6 knowledge categories — from individual taxes to IRS notices, Airbnb income, and business formation.</p>
          <a href="/library" className="btn-primary">Browse Knowledge Library →</a>
        </div>
      </section>

    </Layout>
  )
}

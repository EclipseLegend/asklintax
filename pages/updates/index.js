import Link from 'next/link'
import Layout from '../../components/Layout'
import { loadTranslations, useTranslation } from '../../lib/i18n'
import lib from '../../components/library/library.module.css'
import styles from './updates.module.css'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

// Every item below was checked against the official source linked with it.
// Update REVIEWED_ON whenever this page is re-verified.
const REVIEWED_ON = 'October 1, 2026'

const IRS_2025_CHANGES = 'https://www.irs.gov/forms-pubs/how-to-update-withholding-to-account-for-tax-law-changes-for-2025'

const TAX_YEAR_2025 = [
  {
    id: 'standard-deduction',
    title: 'Standard deduction increased for 2025',
    body: 'After the 2025 federal tax law, the 2025 standard deduction is $15,750 for single filers and married filing separately, $31,500 for married filing jointly and qualifying surviving spouses, and $23,625 for head of household.',
    sources: [{ label: 'IRS — Tax law changes for 2025', url: IRS_2025_CHANGES }],
    related: { href: '/library/individual/do-i-need-to-file/', label: 'Do I need to file a U.S. tax return?' },
  },
  {
    id: 'child-tax-credit',
    title: 'Child Tax Credit is $2,200 per child',
    body: 'The maximum Child Tax Credit for 2025 is $2,200 per qualifying child under 17, with up to $1,700 refundable. You (or your spouse, if married filing jointly) and each qualifying child must have a Social Security number valid for employment, issued before the return’s due date (including extensions).',
    sources: [{ label: 'IRS — Child Tax Credit', url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit' }],
    related: { href: '/library/individual/child-tax-credit/', label: 'Child Tax Credit: who qualifies and how to claim it' },
  },
  {
    id: 'salt',
    title: 'State and local tax (SALT) deduction limit raised',
    body: 'If you itemize, you can deduct up to $40,000 ($20,000 if married filing separately) of state and local taxes for 2025. The limit is reduced if your modified adjusted gross income is over $500,000 ($250,000 if married filing separately).',
    sources: [{ label: 'IRS — Tax law changes for 2025', url: IRS_2025_CHANGES }],
    related: { href: '/library/individual/first-time-filer/', label: 'First-time filer: standard vs. itemized deductions' },
  },
  {
    id: 'form-1099-k',
    title: 'Form 1099-K threshold restored to $20,000 and 200 transactions',
    date: 'IRS announcement: October 23, 2025 (IR-2025-107)',
    body: 'Payment apps and online marketplaces must file Form 1099-K only when a payee’s gross payments exceed $20,000 and there are more than 200 transactions. The 2025 law reinstated this threshold retroactively. Payment card transactions have no minimum. All income is taxable even if you don’t receive a Form 1099-K.',
    sources: [
      { label: 'IRS — IR-2025-107', url: 'https://www.irs.gov/newsroom/irs-issues-faqs-on-form-1099-k-threshold-under-the-one-big-beautiful-bill-dollar-limit-reverts-to-20000' },
      { label: 'IRS — Form 1099-K FAQs', url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-general-information' },
    ],
    related: { href: '/library/rental/airbnb-tax-guide/', label: 'Airbnb host tax guide' },
  },
  {
    id: 'eitc',
    title: 'Earned Income Tax Credit maximums for 2025',
    body: 'The maximum 2025 EITC is $649 with no qualifying children, $4,328 with one, $7,152 with two, and $8,046 with three or more.',
    sources: [{ label: 'IRS — EITC tables', url: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/earned-income-and-earned-income-tax-credit-eitc-tables' }],
    related: { href: '/library/individual/tax-credit-vs-deduction/', label: 'Tax credit vs. tax deduction' },
  },
  {
    id: 'caleitc',
    title: 'California EITC (CalEITC) for 2025',
    body: 'California’s Earned Income Tax Credit is worth up to $3,756 for tax year 2025 for working families and individuals earning up to $32,900. Claim it on the 2025 FTB 3514 with your California return.',
    sources: [{ label: 'California FTB — CalEITC', url: 'https://www.ftb.ca.gov/file/personal/credits/california-earned-income-Tax-credit.html' }],
  },
  {
    id: 'direct-file',
    title: 'IRS Direct File suspended; Free File remains',
    date: 'Treasury report: October 2, 2025',
    body: 'In a report to Congress, the Treasury Department stated that the IRS will suspend the Direct File program and focus on free filing through programs such as IRS Free File. For 2025 returns, IRS Free File offers guided tax software at no cost to taxpayers with adjusted gross income of $89,000 or less.',
    sources: [
      { label: 'Treasury — Report on the Replacement of Direct File', url: 'https://home.treasury.gov/system/files/131/Report-Replacement-of-Direct-File-2025.pdf' },
      { label: 'IRS — Tax Tip 2026-08 (Free File)', url: 'https://www.irs.gov/newsroom/2026-tax-filing-season-opens-with-several-free-filing-options-available' },
    ],
    related: { href: '/library/individual/first-time-filer/', label: 'First-time filer: how to file' },
  },
]

const TAX_YEAR_2026 = [
  {
    id: 'form-1099-nec',
    title: '1099-NEC and 1099-MISC reporting threshold rises to $2,000',
    body: 'For tax years beginning after 2025, the minimum threshold for reporting certain payments on Forms 1099-NEC and 1099-MISC increased to $2,000. It may be adjusted for inflation beginning in 2027.',
    sources: [{ label: 'IRS — Instructions for Forms 1099-MISC and 1099-NEC', url: 'https://www.irs.gov/instructions/i1099mec' }],
    related: { href: '/library/individual/w2-vs-1099/', label: 'W-2 vs 1099: what’s the difference' },
  },
  {
    id: 'mileage-2026',
    title: 'Business mileage rates for 2026',
    body: 'The standard mileage rate for business use is 72.5 cents per mile from January 1 to June 30, 2026, and 76 cents per mile from July 1 to December 31, 2026.',
    sources: [{ label: 'IRS — Standard mileage rates', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' }],
    related: { href: '/library/small-business/business-deductions/', label: 'What can I deduct as a small business owner?' },
  },
]

// Upcoming as of REVIEWED_ON.
const CALENDAR = [
  { date: 'October 15, 2026', title: 'Extended 2025 individual returns due', detail: 'If you have an automatic 6-month extension, file Form 1040 or 1040-SR and pay any tax, interest, and penalties due.', source: { label: 'IRS Pub. 509 (2026)', url: 'https://www.irs.gov/publications/p509' } },
  { date: 'October 15, 2026', title: 'FBAR extended deadline for 2025', detail: 'FinCEN Form 114 has an automatic 6-month extension from April 15 to October 15.', source: { label: 'IRS — Form 8938 vs. FBAR', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' } },
  { date: 'January 15, 2027', title: 'Fourth 2026 estimated tax payment due', detail: 'Last quarterly payment for 2026 income.', source: { label: 'IRS Form 1040-ES (2026)', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' } },
  { date: 'February 1, 2027', title: 'Skip the January payment by filing early', detail: 'You don’t have to make the January 15 payment if you file your 2026 return by February 1, 2027 and pay the entire balance due.', source: { label: 'IRS Form 1040-ES (2026)', url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf' } },
]

function UpdateItem({ item, taxYear }) {
  return (
    <article id={item.id} className={styles.item}>
      <div className={styles.itemMeta}>
        <span className="tag tag-navy">{taxYear}</span>
        {item.date && <span className={styles.itemDate}>{item.date}</span>}
      </div>
      <h3 className={styles.itemTitle}>{item.title}</h3>
      <p className={styles.itemBody}>{item.body}</p>
      <p className={styles.itemLinks}>
        <span className={styles.sourceLabel}>Source:</span>{' '}
        {item.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ' · '}
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </span>
        ))}
        {item.related && (
          <>
            <span className={styles.linkDivider} aria-hidden="true">|</span>
            <Link href={item.related.href}>{item.related.label} →</Link>
          </>
        )}
      </p>
    </article>
  )
}

export default function TaxUpdatesPage({ translations }) {
  const { t } = useTranslation(translations.common)

  return (
    <Layout t={t} meta={{
      title: 'Tax Updates: Verified Federal Tax Changes and Deadlines | AskLinTax',
      description: 'Recent federal tax changes for 2025 and 2026 — standard deduction, Child Tax Credit, Form 1099-K, SALT, EITC — and upcoming deadlines, each checked against official IRS and Treasury sources.',
    }}>
      <section className={lib.hero}>
        <div className={`${lib.heroInner} container`}>
          <nav className={lib.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Tax Updates</span>
          </nav>
          <h1 className={lib.heroTitle}>Tax Updates</h1>
          <p className={lib.heroIntro}>
            Recent changes that affect your federal return, explained in plain language. Every update links to the official IRS or Treasury source it comes from.
          </p>
          <p className={lib.heroMeta}>
            <span className={lib.heroCount}>Last reviewed {REVIEWED_ON}</span>
          </p>
        </div>
      </section>

      <div className={`${lib.main} container`}>
        <section className={lib.section} aria-labelledby="ty2025-title">
          <div className={lib.sectionHead}>
            <span className="section-label">For 2025 returns</span>
            <h2 id="ty2025-title" className={lib.sectionTitle}>What changed for Tax Year 2025</h2>
            <p className={lib.sectionSub}>Most of these changes come from the federal tax law enacted in 2025 and apply to the returns filed in 2026.</p>
          </div>
          <div className={styles.list}>
            {TAX_YEAR_2025.map(item => <UpdateItem key={item.id} item={item} taxYear="Tax Year 2025" />)}
          </div>
        </section>

        <section className={lib.section} aria-labelledby="ty2026-title">
          <div className={lib.sectionHead}>
            <span className="section-label">Looking ahead</span>
            <h2 id="ty2026-title" className={lib.sectionTitle}>Changes for Tax Year 2026</h2>
          </div>
          <div className={styles.list}>
            {TAX_YEAR_2026.map(item => <UpdateItem key={item.id} item={item} taxYear="Tax Year 2026" />)}
          </div>
        </section>

        <section id="calendar" className={`${lib.section} ${styles.calendarSection}`} aria-labelledby="calendar-title">
          <div className={lib.sectionHead}>
            <span className="section-label">Tax calendar</span>
            <h2 id="calendar-title" className={lib.sectionTitle}>Upcoming federal deadlines</h2>
            <p className={lib.sectionSub}>As of {REVIEWED_ON}. If a deadline falls on a weekend or legal holiday, it moves to the next business day.</p>
          </div>
          <ol className={styles.calendar}>
            {CALENDAR.map(d => (
              <li key={d.date + d.title} className={styles.calendarRow}>
                <span className={styles.calendarDate}>{d.date}</span>
                <span className={styles.calendarText}>
                  <strong>{d.title}</strong>
                  <span>{d.detail}</span>
                  <a href={d.source.url} target="_blank" rel="noopener noreferrer" className={styles.calendarSource}>{d.source.label}</a>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <p className={lib.disclaimer}>
          AskLinTax updates are written for general education and are not tax, legal, or financial advice for your specific situation. Always confirm current rules with the official source or a qualified tax professional.
        </p>
      </div>
    </Layout>
  )
}

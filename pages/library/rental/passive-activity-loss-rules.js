import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import ArticleTable from '../../../components/ArticleTable'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '121',
  title:         'Rental Losses and the Passive Activity Rules: The $25,000 Allowance and Real Estate Professionals',
  category:      'Real Estate & Airbnb',
  categoryHref:  '/library/rental',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the passive activity loss rules for individuals with rental property, based on Publication 925 (2025) and the 2025 Instructions for Form 8582, the latest final IRS sources available when this guide was written. The dollar amounts are set by statute and are not adjusted for inflation, so they apply to 2025 and 2026 alike. It does not cover the at-risk rules in detail, grouping elections, credits, or estates and trusts',
  persona:       ['Landlords with a rental loss', 'Short-term rental (Airbnb) hosts', 'People who work in real estate', 'Higher-income owners whose rental loss was suspended'],
  relatedJourney: ['Side income from property', 'Airbnb & rental income'],
  actionRequired: 'If your rental shows a loss, check three things before deducting it against wages: whether the activity is a "rental activity" for tax purposes, whether you actively or materially participated, and your modified AGI. Losses you cannot use this year are not lost — they carry forward on Form 8582.',
  sources: [
    { label: 'IRS — Publication 925 (2025), Passive Activity and At-Risk Rules', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
    { label: 'IRS — Instructions for Form 8582 (2025), Passive Activity Loss Limitations', url: 'https://www.irs.gov/pub/irs-pdf/i8582.pdf' },
    { label: 'IRS — Publication 527 (2025), Residential Rental Property', url: 'https://www.irs.gov/pub/irs-pdf/p527.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Can my rental loss offset my W-2 wages?',
    a: 'Only in limited cases. Rental activities are generally passive, and passive losses can generally offset only passive income. The main exceptions are the $25,000 special allowance for owners who actively participate (reduced when modified AGI is over $100,000 and gone at $150,000), and real estate professional status combined with material participation in the rental.',
  },
  {
    q: 'What is the difference between active participation and material participation?',
    a: 'Active participation is the easier standard and applies to the $25,000 allowance — for example, approving tenants, setting rent, and approving expenses, with at least a 10% ownership interest. Material participation is stricter and is met only by one of seven IRS tests, such as working more than 500 hours in the activity during the year.',
  },
  {
    q: 'My Airbnb guests stay 7 days or less on average. Can I deduct the loss against my salary?',
    a: 'Not automatically. When the average stay is 7 days or less, the activity is not a "rental activity" under the passive rules, so the $25,000 rental allowance does not apply. The activity is then passive unless you materially participate under one of the seven tests. Only a loss from an activity in which you materially participate is nonpassive.',
  },
  {
    q: 'If I am a real estate professional, are all my rental losses nonpassive?',
    a: 'No. Qualifying as a real estate professional is only the first step. Each rental activity is still passive unless you also materially participate in it. Each interest in rental real estate is generally a separate activity unless you elect to treat all of them as one activity.',
  },
  {
    q: 'What happens to a rental loss I cannot deduct?',
    a: 'It is suspended and carried forward to the next year on Form 8582. Suspended losses can offset future passive income, and they are generally allowed in full when you dispose of your entire interest in the activity in a fully taxable sale to an unrelated person.',
  },
  {
    q: 'Do I need to file Form 8582?',
    a: 'Generally yes if you have passive activity deductions. You do not have to file it if your only passive activities were rental real estate with active participation, your total loss was $25,000 or less ($12,500 if married filing separately and living apart), you have no prior-year unallowed losses or credits, and your modified AGI was $100,000 or less ($50,000 if married filing separately).',
  },
]

const RELATED = [
  {
    href: '/library/rental/rental-property-income',
    cat:  'Real Estate & Airbnb',
    title: 'Renting out a house or apartment — how is rental income taxed?',
    desc:  'The basics of rental income and deductions.',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb host tax guide: what to report and what to deduct',
    desc:  'Short-term rental reporting.',
  },
  {
    href: '/library/rental/selling-rental-property',
    cat:  'Real Estate & Airbnb',
    title: 'Selling a Rental Property: Depreciation Recapture and the 25% Rate',
    desc:  'A sale can release suspended losses.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'Passive rental income can also be subject to NIIT.',
  },
]

export default function PassiveActivityLossRulesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Rental Losses and the Passive Activity Rules | AskLinTax',
      description: 'When a rental loss can offset wages: rental vs. passive activities, active vs. material participation, the $25,000 allowance and its $100,000–$150,000 phaseout, real estate professionals, short-term rentals, and suspended losses on Form 8582.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A loss from renting out property is usually a <strong>passive loss</strong>, and passive losses can generally offset only passive income — not your wages or business income. Two main exceptions exist: the <strong>$25,000 special allowance</strong> for owners who <strong>actively participate</strong>, which phases out between $100,000 and $150,000 of modified AGI, and <strong>real estate professional</strong> status combined with <strong>material participation</strong>. Losses you cannot use are carried forward, not lost.
        </p>

        <h2>Four questions, in order</h2>
        <ArticleTable
          head={['Question', 'Why it matters']}
          rows={[
            ['1. Is it a "rental activity" under the passive rules?', 'Long-term rentals usually are. An average customer stay of 7 days or less (or 30 days or less with significant personal services) is not a rental activity — it is tested like a business instead'],
            ['2. Is the activity passive?', 'A rental activity is passive even if you work hard at it, unless you are a real estate professional who materially participates. A non-rental activity is passive unless you materially participate'],
            ['3. Does an exception let you deduct a passive rental loss?', 'The $25,000 special allowance for active participation in rental real estate, subject to the modified AGI phaseout'],
            ['4. What happens to the rest?', 'It is suspended and carried forward on Form 8582'],
          ]}
        />

        <h2>Active participation vs. material participation</h2>
        <ArticleTable
          head={['', 'Active participation', 'Material participation']}
          rows={[
            ['Used for', 'The $25,000 special allowance for rental real estate', 'Making a trade or business activity nonpassive, and making a real estate professional\'s rental nonpassive'],
            ['Standard', 'Less strict: making management decisions in a significant and bona fide sense, such as approving tenants, setting rental terms, and approving expenditures', 'Strict: you must meet one of seven tests'],
            ['Ownership', 'You (with your spouse) must own at least 10% of the activity by value all year', 'No minimum ownership percentage in the tests'],
          ]}
        />
        <p>The seven material participation tests in Publication 925 include:</p>
        <ul>
          <li>More than 500 hours of participation during the year.</li>
          <li>Your participation was substantially all of the participation of all individuals, including non-owners.</li>
          <li>More than 100 hours, and at least as much as any other individual.</li>
          <li>Significant participation activities (more than 100 hours each) totaling more than 500 hours.</li>
          <li>Material participation in any 5 of the 10 immediately preceding years.</li>
          <li>A personal service activity in which you materially participated in any 3 preceding years.</li>
          <li>Regular, continuous, and substantial participation based on all the facts — not available if you participated 100 hours or less, and with limits on counting management work.</li>
        </ul>

        <h2>The $25,000 special allowance and the phaseout</h2>
        <ArticleTable
          head={['Filing status', 'Maximum allowance', 'Phaseout begins (modified AGI)', 'Fully phased out']}
          rows={[
            ['Single, head of household, married filing jointly', '$25,000', 'Over $100,000', '$150,000 or more'],
            ['Married filing separately, lived apart all year', '$12,500', 'Over $50,000', '$75,000 or more'],
            ['Married filing separately, lived together at any time', 'None', '—', '—'],
          ]}
        />
        <ul>
          <li>The allowance is reduced by 50% of modified AGI over the threshold. For example, at $120,000 of modified AGI, the maximum allowance is $15,000.</li>
          <li>Modified AGI here is figured without certain items, including taxable Social Security benefits, deductible IRA contributions, and passive activity income or loss.</li>
          <li>These amounts are set by statute and are not adjusted for inflation; they are the same for 2025 and 2026.</li>
        </ul>

        <h2>Real estate professionals</h2>
        <ul>
          <li><strong>Two tests for the year:</strong> more than half of all your personal services in all trades or businesses were in real property trades or businesses in which you materially participated, and you performed more than 750 hours of services in those real property trades or businesses.</li>
          <li><strong>Employee hours</strong> in real estate do not count unless you own more than 5% of the employer.</li>
          <li><strong>Joint returns:</strong> one spouse must meet both tests alone, although the other spouse's work can count toward material participation.</li>
          <li><strong>Not automatic:</strong> even after qualifying, each rental is nonpassive only if you materially participate in it. Each interest in rental real estate is a separate activity unless you elect to treat all interests as one activity (see the Instructions for Schedule E).</li>
        </ul>

        <h2>Short-term rentals</h2>
        <p>
          If the average customer stay is <strong>7 days or less</strong>, or <strong>30 days or less</strong> and you provide significant personal services, the activity is not a rental activity under the passive rules. That removes it from the "rental is always passive" rule, but it does <strong>not</strong> make the loss nonpassive by itself. The activity is passive unless you materially participate under one of the seven tests, and the $25,000 rental allowance does not apply to it. A separate rule applies if you also used the home personally for more than the greater of 14 days or 10% of the days it was rented at a fair price — see <a href="/library/rental/14-day-rule/">the 14-day rule</a>.
        </p>

        <h2>Suspended losses</h2>
        <ul>
          <li>Disallowed passive losses carry forward to the next year and can offset passive income then.</li>
          <li>When you dispose of your <strong>entire interest</strong> in the activity in a fully taxable transaction to an unrelated person, suspended losses from it are generally allowed in full.</li>
          <li>Keep your Forms 8582 and worksheets each year so you can track the carryforward.</li>
        </ul>

        <h2>Examples (2025)</h2>
        <ArticleTable
          head={['', 'Grace', 'David', 'Mei']}
          rows={[
            ['Facts', 'Single, $90,000 wages, $12,000 loss on a long-term rental she manages herself', 'Married filing jointly, $135,000 modified AGI, $20,000 rental loss, actively participates', 'Single, $180,000 wages, $18,000 loss on a short-term rental with a 4-night average stay; she works 60 hours, while a property manager and cleaners work more'],
            ['Result', 'Deducts all $12,000 — under the $25,000 allowance and below the phaseout', 'Allowance reduced to $7,500 ($25,000 − 50% × $35,000); $12,500 is suspended', 'Not a rental activity, but no material participation test is met, so the loss is passive and suspended'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep a time log</div>
          <p>Material participation and real estate professional status depend on hours you can prove. Keep a contemporaneous log of dates, hours, and tasks. Claiming nonpassive treatment without records is a common audit issue.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '67',
  title:         'No Tax on Tips: Who Qualifies for the Deduction?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal income tax deduction for qualified tips for tax years 2025 and 2026, based on IRS forms, instructions, final regulations listing tipped occupations, and IRS notices. It does not cover state income tax, payroll tax rules for employers, or every special situation, such as tips earned in more than one occupation',
  persona:       ['Restaurant, bar, and hospitality workers', 'Hair stylists, rideshare drivers, and other tipped workers', 'Self-employed workers who receive tips', 'Married couples who both receive tips'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Check that your occupation is on the IRS list of tipped occupations, separate qualified tips from service charges, and keep records of the tips you report. Claim the deduction on Schedule 1-A; if you are married, you must file jointly.',
  sources: [
    { label: 'IRS — What the "No Tax on Tips" deduction means for you', url: 'https://www.irs.gov/newsroom/what-the-no-tax-on-tips-deduction-means-for-you' },
    { label: 'IRS — Working Families Tax Cuts: provisions for individuals and workers', url: 'https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers' },
    { label: 'IRS — Schedule 1-A (Form 1040) (2025), Additional Deductions', url: 'https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 (including Schedule 1-A instructions)', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — Occupations that customarily and regularly received tips on or before Dec. 31, 2024', url: 'https://www.irs.gov/forms-pubs/occupations-that-customarily-and-regularly-received-tips-on-or-before-dec-31-2024' },
    { label: 'IRS — IR-2026-49, Final regulations listing occupations that receive tips', url: 'https://www.irs.gov/newsroom/treasury-irs-issue-final-regulations-listing-occupations-where-workers-customarily-and-regularly-receive-tips-under-the-one-big-beautiful-bill' },
    { label: 'IRS — Notice 2025-69, Guidance for individuals who received qualified tips or overtime in 2025', url: 'https://www.irs.gov/pub/irs-drop/n-25-69.pdf' },
    { label: 'IRS — IR-2025-114, Guidance for individuals who received tips or overtime during tax year 2025', url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-for-individuals-who-received-tips-or-overtime-during-tax-year-2025' },
    { label: 'IRS — General Instructions for Forms W-2 and W-3 (2026)', url: 'https://www.irs.gov/instructions/iw2w3' },
  ],
}

const FAQS = [
  {
    q: 'Are my tips now tax-free?',
    a: 'No. Tips are still income, and they are still subject to Social Security and Medicare taxes. For 2025 through 2028, eligible workers may deduct qualified tips for federal income tax purposes, up to $25,000 a year, with a phaseout at higher incomes.',
  },
  {
    q: 'Is an automatic 18% gratuity on a large party a qualified tip?',
    a: 'Generally no. Service charges, automatic gratuities, and other mandatory amounts added to the bill are not qualified tips unless the customer is expressly given the option to remove or change them without consequence. A tip must be paid voluntarily, not negotiated, and the amount must be determined by the customer.',
  },
  {
    q: 'Do I have to itemize to claim it?',
    a: 'No. You claim the deduction on Schedule 1-A whether you take the standard deduction or itemize.',
  },
  {
    q: 'We are married and both receive tips. Do we each get $25,000?',
    a: 'No. The $25,000 maximum applies per return. On a joint return, it applies to your combined qualified tips; it is not a per-spouse limit. Married couples must file jointly to claim the deduction.',
  },
  {
    q: 'My 2025 W-2 does not show my tips separately. Can I still claim the deduction?',
    a: 'Yes, if you qualify. For 2025, Forms W-2 and 1099 were not updated to separately identify qualified tips, so the Schedule 1-A instructions and Notice 2025-69 explain how to determine the amount — for example, from tips reported to your employer or on Form 4137. Keep the records you relied on.',
  },
  {
    q: 'Does my state follow this deduction?',
    a: 'Not necessarily. State income tax rules can differ from federal law. This guide covers federal rules only.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/no-tax-on-overtime',
    cat:  'Individuals & Families',
    title: 'No Tax on Overtime: How the Deduction Really Works',
    desc:  'The other new deduction for workers.',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'Where your wages and reported tips appear.',
  },
]

export default function NoTaxOnTipsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'No Tax on Tips: Who Qualifies for the Tips Deduction? | AskLinTax',
      description: 'The federal deduction for qualified tips: eligible occupations, the $25,000 limit, the income phaseout, service charges, and 2025 vs. 2026 reporting.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          "No tax on tips" is the popular name for a new <strong>federal income tax deduction</strong>. For <strong>2025 through 2028</strong>, employees and self-employed people who receive <strong>qualified tips</strong> in an occupation on the IRS list of tipped occupations may deduct up to <strong>$25,000</strong> a year. The deduction shrinks when modified adjusted gross income (MAGI) is over <strong>$150,000</strong> ($300,000 on a joint return).
        </p>
        <p>
          Your tips are <strong>not</strong> tax-free. They are still included in income and are still subject to <strong>Social Security and Medicare taxes</strong>. The deduction lowers the income subject to federal income tax.
        </p>

        <h2>Who qualifies</h2>
        <ul>
          <li>You (or your spouse, on a joint return) received <strong>qualified tips</strong> during the year, as an employee or from self-employment.</li>
          <li>The tips were received in an occupation that <strong>customarily and regularly received tips on or before December 31, 2024</strong>, as listed by Treasury and the IRS.</li>
          <li>The person who received the tips has a <strong>Social Security number valid for employment</strong>, issued before the due date of the return (including extensions).</li>
          <li>If you are married, you <strong>file a joint return</strong>. Married filing separately cannot claim it.</li>
          <li>You can take the standard deduction or itemize — either way works.</li>
        </ul>

        <h2>Which occupations count</h2>
        <p>
          Treasury and the IRS issued <strong>final regulations</strong> in April 2026 listing more than 70 occupations, each with a Treasury Tipped Occupation Code (TTOC). The list is grouped into eight categories: beverage and food service; entertainment and events; hospitality and guest services; home services; personal services; personal appearance and wellness; recreation and instruction; and transportation and delivery. Examples include bartenders, wait staff, hotel housekeepers, hairstylists and barbers, manicurists, tour guides, parking and valet attendants, and taxi and rideshare drivers. Check the IRS list for your exact occupation.
        </p>
        <p>
          Tips received while working for an employer in a <strong>specified service trade or business</strong> (as defined for the qualified business income deduction), or while self-employed in one, are not qualified tips. Under transition relief in Notice 2025-69, until final regulations on this point take effect, the IRS treats a worker in an occupation on the tipped-occupation list as not receiving tips in such a business. Tips received for a service that is a felony or misdemeanor under applicable law also do not qualify.
        </p>

        <h2>What counts as a qualified tip</h2>
        <ArticleTable
          head={['Generally qualifies', 'Generally does not qualify']}
          rows={[
            ['Tips paid voluntarily by customers', 'Automatic gratuities and mandatory service charges the customer cannot change'],
            ['Tips paid in cash, by check, credit or debit card, gift card, or a payment app', 'Non-cash items such as event tickets, meals, or services'],
            ['Your share of a tip pool or tip-sharing arrangement', 'Amounts negotiated in advance as part of the price'],
            ['Tips reported on Form W-2, Form 1099, another statement, or by you on Form 4137', 'Tips earned in an occupation that is not on the IRS list'],
          ]}
        />
        <p>
          A charge added to the bill can still be a qualified tip if the customer is <strong>expressly given the option</strong> to remove or change it without consequence.
        </p>

        <h2>The limit and the income phaseout</h2>
        <ArticleTable
          head={['Rule', 'Amount']}
          rows={[
            ['Maximum deduction', '$25,000 per return (combined on a joint return)'],
            ['Self-employed limit', 'Not more than the net income of the business where the tips were earned'],
            ['Phaseout starts', 'MAGI over $150,000 (single, head of household, qualifying surviving spouse) or $300,000 (married filing jointly)'],
            ['How it phases out', 'The deduction drops by $100 for each full $1,000 of MAGI over the threshold'],
            ['Years', '2025 through 2028'],
          ]}
        />

        <h2>Examples (illustrative, tax year 2025)</h2>
        <p>
          <strong>Mia</strong>, a single server, earned $46,000 in 2025, including $12,000 of qualified tips she reported to her employer. Her MAGI is under $150,000, so she can deduct the full <strong>$12,000</strong> on Schedule 1-A. She still owes Social Security and Medicare tax on those tips.
        </p>
        <p>
          <strong>Daniel</strong>, a single bartender, has $30,000 of qualified tips and MAGI of $170,000. His deduction starts at the $25,000 maximum. His MAGI is $20,000 over $150,000, so the deduction is reduced by 20 × $100 = $2,000. He can deduct <strong>$23,000</strong>.
        </p>
        <p>
          <strong>An automatic gratuity:</strong> a restaurant adds an 18% charge to every party of six or more, and the customer has no express option to change it. Even if the restaurant shares it with the servers, the IRS instructions say it is <strong>not</strong> a qualified tip.
        </p>

        <h2>2025 vs. 2026: how you find the amount</h2>
        <ArticleTable
          head={['Tax year', 'What to expect']}
          rows={[
            ['2025', 'Forms W-2, 1099-NEC, 1099-MISC, and 1099-K were not updated to show qualified tips separately. The Schedule 1-A instructions and Notice 2025-69 explain how to determine the amount, for example from tips you reported to your employer or on Form 4137. Keep the records you used.'],
            ['2026', 'Employers report cash tips in Form W-2, box 12, code TP, and the Treasury Tipped Occupation Code in box 14b. The deduction rules and limits continue; check the 2026 Schedule 1-A instructions when the IRS publishes them.'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Withholding</div>
          <p>Your employer still withholds taxes on reported tips. If you expect a large deduction, you can account for it on Form W-4 using the Step 4(b) Deductions Worksheet — see <a href="/library/individual/owe-taxes-withholding-w4/">why you may owe at tax time</a>.</p>
        </div>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"All tips are tax-free now."</strong> Tips remain taxable income and subject to Social Security and Medicare taxes; the deduction is limited and phases out.</li>
          <li><strong>"Any worker who gets tips qualifies."</strong> Only tips in a listed occupation count, and not tips in a specified service trade or business.</li>
          <li><strong>"Service charges count."</strong> Mandatory charges the customer cannot change are not qualified tips.</li>
          <li><strong>"Each spouse gets $25,000."</strong> The $25,000 limit is per return, combined on a joint return.</li>
          <li><strong>"I don't need to report my tips to get the deduction."</strong> Tips must be reported — on Form W-2, Form 1099, another statement, or by you on Form 4137.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Federal rules only</div>
          <p>State income tax rules can differ from federal law. Do not assume your state allows this deduction.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

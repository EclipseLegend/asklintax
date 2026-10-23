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
  id:            '74',
  title:         'Child and Dependent Care Credit: 2025 and 2026 Rules and Examples',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal Child and Dependent Care Credit (Form 2441) for tax years 2025 and 2026, based on the 2025 Form 2441 and instructions, Publication 503 (2025), Publication 15-B (2026), and the IRS Working Families Tax Cuts page. The detailed 2026 percentage schedule comes from the draft 2026 Form 2441 instructions (August 2026), which may change. It does not cover state credits',
  persona:       ['Working parents who pay for child care', 'Families caring for a disabled spouse or dependent', 'Employees with a dependent care FSA', 'Parents comparing the 2025 and 2026 rules'],
  relatedJourney: ['Preparing to file', 'Planning for a child'],
  actionRequired: 'Keep records of care expenses and each provider\'s name, address, and taxpayer identification number. Figure the credit on Form 2441. If your employer offers a dependent care FSA, coordinate it with the credit — excluded benefits reduce the expenses you can use.',
  sources: [
    { label: 'IRS — Publication 503 (2025), Child and Dependent Care Expenses', url: 'https://www.irs.gov/pub/irs-pdf/p503.pdf' },
    { label: 'IRS — 2025 Instructions for Form 2441', url: 'https://www.irs.gov/pub/irs-pdf/i2441.pdf' },
    { label: 'IRS — Form 2441 (2025), Child and Dependent Care Expenses', url: 'https://www.irs.gov/pub/irs-pdf/f2441.pdf' },
    { label: 'IRS — Draft 2026 Instructions for Form 2441 (August 2026, not final)', url: 'https://www.irs.gov/pub/irs-dft/i2441--dft.pdf' },
    { label: 'IRS — Working Families Tax Cuts (Child and Dependent Care Credit enhancement)', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Publication 15-B (2026), Employer\'s Tax Guide to Fringe Benefits', url: 'https://www.irs.gov/pub/irs-pdf/p15b.pdf' },
    { label: 'IRS — Topic no. 602, Child and dependent care credit', url: 'https://www.irs.gov/taxtopics/tc602' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is the credit refundable?',
    a: 'No. The Child and Dependent Care Credit can reduce your federal income tax to zero, but any part that is more than your tax is not refunded.',
  },
  {
    q: 'What changes in 2026?',
    a: 'Beginning in 2026, the maximum credit rate rises from 35% to 50% of qualifying expenses, and the income levels at which the rate drops are higher. The expense limits stay at $3,000 for one qualifying person and $6,000 for two or more. The detailed 2026 rate schedule is in draft IRS instructions and may change.',
  },
  {
    q: 'Does summer camp count?',
    a: 'Day camp can count as a care expense, even if it focuses on an activity such as soccer or computers. Overnight camp does not.',
  },
  {
    q: 'Can I pay my mother to watch my child and claim the credit?',
    a: 'Possibly. Payments to a relative can qualify, but not payments to your spouse, the child\'s parent, someone you can claim as a dependent, or your own child who is under 19 at the end of the year. You must report the provider\'s identifying information.',
  },
  {
    q: 'I used my dependent care FSA. Can I also take the credit?',
    a: 'Only for the part of the expense limit that the FSA benefits did not use. Excluded employer benefits reduce the $3,000 or $6,000 limit. For 2026, if you excluded the full $7,500, you generally cannot take the credit for 2026 expenses.',
  },
  {
    q: 'Can married couples filing separately claim it?',
    a: 'Generally no — married people must file jointly. A spouse filing separately can be treated as unmarried for this credit only in limited situations, such as living apart from the other spouse for the last six months of the year and meeting the household requirements.',
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
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'A different credit for children under 17.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Refundable and nonrefundable credits explained.',
  },
]

export default function ChildDependentCareCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Child and Dependent Care Credit: 2025 vs. 2026 Rules | AskLinTax',
      description: 'The Child and Dependent Care Credit: who qualifies, eligible care expenses, the $3,000 and $6,000 limits, 2025 vs. 2026 credit rates, FSA interaction, and examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you pay for care for a child under 13 (or a spouse or dependent who cannot care for themselves) so that you can work or look for work, you may be able to claim the <strong>Child and Dependent Care Credit</strong> on <strong>Form 2441</strong>. The credit is a percentage of up to <strong>$3,000</strong> of care expenses for one qualifying person, or <strong>$6,000</strong> for two or more.
        </p>
        <ul>
          <li><strong>2025:</strong> the percentage is <strong>35%</strong> at lower incomes and drops to <strong>20%</strong> once adjusted gross income (AGI) is over $43,000.</li>
          <li><strong>2026:</strong> the maximum percentage rises to <strong>50%</strong> (confirmed by the IRS). Under the <strong>draft</strong> 2026 Form 2441 instructions, the higher percentages also extend to much higher incomes, and the rate still bottoms out at 20%.</li>
          <li>The credit is <strong>nonrefundable</strong>: it can reduce your tax to zero, but not create a refund.</li>
        </ul>

        <h2>Who qualifies</h2>
        <ul>
          <li><strong>Qualifying person:</strong> your qualifying child under age 13 whom you can claim as a dependent; your spouse who is physically or mentally unable to care for themselves and lived with you more than half the year; or a person unable to care for themselves who lived with you more than half the year and whom you could claim as a dependent (or could except that their gross income was $5,200 or more for 2025, or $5,300 or more for 2026).</li>
          <li><strong>Work-related:</strong> the care must allow you (and your spouse, if married) to work or look for work.</li>
          <li><strong>Earned income:</strong> your expenses cannot be more than your earned income — or, if married, the smaller of your and your spouse's earned income. A spouse who is a full-time student or unable to care for themselves is treated as earning $250 a month ($500 with two or more qualifying persons).</li>
          <li><strong>Filing status:</strong> single, head of household, qualifying surviving spouse, or married filing jointly. Married people generally must file jointly.</li>
          <li><strong>Provider:</strong> not your spouse, the child's parent, a person you can claim as a dependent, or your child who is under 19 at the end of the year. You must report the provider's name, address, and taxpayer identification number (you can use Form W-10 to request it).</li>
        </ul>

        <h2>What expenses count</h2>
        <ArticleTable
          head={['Generally qualifies', 'Generally does not qualify']}
          rows={[
            ['Day care, babysitters, and nannies', 'Kindergarten or higher-grade tuition'],
            ['Preschool or nursery school below kindergarten', 'Overnight camp'],
            ['Before- and after-school care', 'Summer school and tutoring programs'],
            ['Day camp, including specialty day camps', 'Food, clothing, education, or entertainment costs'],
            ['Household services partly for the qualifying person\'s care', 'Chauffeurs, bartenders, or gardeners; child support payments'],
          ]}
        />

        <h2>The credit rate: 2025 vs. 2026</h2>
        <ArticleTable
          head={['Adjusted gross income', '2025 (all filing statuses)', '2026 (draft schedule)']}
          rows={[
            ['$15,000 or less', '35%', '50%'],
            ['Over $15,000', 'Drops 1 point for each $2,000 (or part)', 'Drops 1 point for each $2,000 (or part), down to 35% at over $43,000'],
            ['Over $43,000', '20%', '35% until $150,000 (married filing jointly) or $75,000 (other filers)'],
            ['Higher incomes', '20%', 'Drops 1 point for each $4,000 (joint) or $2,000 (other filers) above those levels'],
            ['Minimum rate', '20% (AGI over $43,000)', '20% (AGI over $206,000 joint, or over $103,000 other filers)'],
          ]}
        />
        <p>
          The 50% maximum and the unchanged $3,000 / $6,000 expense limits for 2026 are confirmed on the IRS Working Families Tax Cuts page. The step-by-step 2026 schedule above comes from the <strong>draft</strong> 2026 Form 2441 instructions (August 2026) and may change in the final version. For 2026, the draft Form 2441 tells you to look up your percentage in the instructions instead of printing a table on the form.
        </p>

        <h2>Dependent care FSAs and employer benefits</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['Maximum employer dependent care benefits you can exclude from income', '$5,000 ($2,500 married filing separately)', '$7,500 ($3,750 married filing separately)'],
          ]}
        />
        <p>
          Benefits you exclude through an employer dependent care assistance program (often a dependent care FSA) <strong>reduce</strong> the $3,000 or $6,000 limit for the credit. For 2026, the draft Form 2441 instructions note that the $7,500 limit applies only if your employer's plan allows it; if the plan still allows $5,000, use $5,000. If you exclude the full $7,500, you generally cannot claim the credit for 2026 expenses, because $7,500 is more than either limit.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>2025 — two children:</strong> Lin and David file jointly with AGI of $100,000 and pay $8,000 for after-school care for two children under 13. Their expense limit is $6,000 and their rate is 20%, so their credit is <strong>$1,200</strong> (if they have at least that much tax).
        </p>
        <p>
          <strong>Same family in 2026:</strong> with AGI of $100,000 on a joint return, the draft 2026 schedule gives a 35% rate. Their credit would be $6,000 × 35% = <strong>$2,100</strong>.
        </p>
        <p>
          <strong>Higher income in 2026:</strong> a married couple filing jointly with AGI of $250,000 and the same expenses is above $206,000, so under the draft 2026 schedule the rate is 20% and the credit is <strong>$1,200</strong> — the same as in 2025.
        </p>
        <p>
          <strong>FSA plus the credit (2026):</strong> a single parent with two children under 13 excludes $5,000 through a dependent care FSA and pays $10,000 of care. The $6,000 limit is reduced by the $5,000, so only <strong>$1,000</strong> of expenses can be used for the credit.
        </p>
        <p>
          <strong>Low income:</strong> a head-of-household parent with AGI of $14,000 in 2025 would have a 35% rate, but if the standard deduction reduces taxable income to zero, there is no tax for this nonrefundable credit to reduce.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"It's the same as the Child Tax Credit."</strong> They are separate credits with different rules; you may qualify for both.</li>
          <li><strong>"I get a refund even if I owe no tax."</strong> This credit is nonrefundable.</li>
          <li><strong>"School tuition counts."</strong> Kindergarten and higher-grade tuition do not count as care expenses.</li>
          <li><strong>"I can use my FSA money and the full credit."</strong> Excluded benefits reduce the expense limit for the credit.</li>
          <li><strong>"The 50% rate applied to 2025."</strong> The higher rates start in 2026; 2025 uses the 35%-to-20% schedule.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 2026 details are from draft instructions</div>
          <p>The 50% maximum rate, the $7,500 exclusion, and the $5,300 gross income amount for 2026 are confirmed in final IRS sources (the Working Families Tax Cuts page, Publication 15-B, and Revenue Procedure 2025-32). The detailed 2026 rate schedule is from draft Form 2441 instructions and may change. State credits are not covered here.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

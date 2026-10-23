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
  id:            '96',
  title:         'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains contributions to traditional and Roth IRAs for tax years 2025 and 2026, based on Publication 590-A (2025), IRS Notice 2024-80 (2025 limits), and IRS Notice 2025-67 (2026 limits). It does not cover withdrawals, rollovers, conversions, SEP or SIMPLE IRAs, or state tax',
  persona:       ['Employees deciding between a traditional and a Roth IRA', 'People covered by a 401(k) who want to know if an IRA is deductible', 'Married couples where one spouse has little or no income', 'U.S. taxpayers living abroad who exclude their foreign wages'],
  relatedJourney: ['Preparing to file', 'Cross-border finances'],
  actionRequired: 'Confirm you have taxable compensation, check whether you or your spouse is covered by a workplace plan, compare your modified AGI with the phase-out ranges for your tax year and filing status, and make the contribution by the return due date (without extensions).',
  sources: [
    { label: 'IRS — Publication 590-A (2025), Contributions to Individual Retirement Arrangements (IRAs)', url: 'https://www.irs.gov/publications/p590a' },
    { label: 'IRS — Notice 2024-80, 2025 retirement plan and IRA limits', url: 'https://www.irs.gov/pub/irs-drop/n-24-80.pdf' },
    { label: 'IRS — Notice 2025-67, 2026 retirement plan and IRA limits', url: 'https://www.irs.gov/pub/irs-drop/n-25-67.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Can I contribute to both a traditional IRA and a Roth IRA in the same year?',
    a: 'Yes, but the annual limit is shared. For 2025 the combined total for all your traditional and Roth IRAs is $7,000 ($8,000 if you are 50 or older); for 2026 it is $7,500 ($8,600 if you are 50 or older), and never more than your taxable compensation.',
  },
  {
    q: 'I have a 401(k) at work. Can I still contribute to an IRA?',
    a: 'Yes. Being covered by a workplace plan does not stop you from contributing. It only affects whether your traditional IRA contribution is deductible, which depends on your modified AGI and filing status. Roth IRA eligibility depends on income, not on workplace plan coverage.',
  },
  {
    q: 'Is there an age limit for contributing?',
    a: 'No. Publication 590-A says there is no age limit for making traditional IRA contributions for 2020 and later years, and Roth IRA contributions have never had an age limit. You still need taxable compensation.',
  },
  {
    q: 'When is the deadline for my 2025 IRA contribution?',
    a: 'Contributions for 2025 must be made by the due date of your 2025 return, not including extensions — generally April 15, 2026. A filing extension does not give you more time to contribute.',
  },
  {
    q: 'What if I contributed too much?',
    a: 'An excess contribution is subject to a 6% tax for each year it stays in the account. You can generally avoid the tax by withdrawing the excess and any earnings on it by the due date of your return, including extensions.',
  },
  {
    q: 'I live abroad and exclude my wages with Form 2555. Can I contribute?',
    a: 'Publication 590-A says compensation for IRA purposes does not include amounts you exclude from income, such as foreign earned income and housing costs. If all of your wages are excluded and you have no other compensation, you generally cannot contribute for that year.',
  },
]

const RELATED = [
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'What happens when the money comes out.',
  },
  {
    href: '/library/individual/foreign-earned-income-exclusion',
    cat:  'Individuals & Families',
    title: 'Foreign Earned Income Exclusion (Form 2555): 2025 and 2026 Rules',
    desc:  'Excluded wages do not count as IRA compensation.',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'The “Retirement plan” box shows workplace plan coverage.',
  },
  {
    href: '/library/investment/foreign-pension-retirement-accounts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign Pensions and Retirement Accounts: What U.S. Taxpayers Must Report',
    desc:  'Retirement accounts outside the United States.',
  },
]

export default function IraRothIraContributionsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules | AskLinTax',
      description: 'IRA contributions explained: 2025 and 2026 limits and catch-up amounts, deductible and Roth income phase-outs, workplace plan coverage, spousal IRAs, deadlines, excess contributions, and IRAs vs. 401(k)s.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you have taxable compensation, you can generally put up to <strong>$7,000</strong> into IRAs for <strong>2025</strong> and <strong>$7,500</strong> for <strong>2026</strong>, plus a catch-up amount if you are 50 or older. A <strong>traditional IRA</strong> contribution may be deductible now and is taxed when withdrawn; a <strong>Roth IRA</strong> contribution is not deductible, but qualified withdrawals are tax-free. Income limits decide whether a traditional IRA contribution is deductible (if you or your spouse is covered by a workplace plan) and whether you can contribute to a Roth IRA at all.
        </p>

        <h2>Traditional vs. Roth IRA</h2>
        <ArticleTable
          head={['', 'Traditional IRA', 'Roth IRA']}
          rows={[
            ['Deduction for contributions', 'May be deductible, depending on workplace plan coverage and income', 'Never deductible'],
            ['Who can contribute', 'Anyone with taxable compensation', 'Anyone with taxable compensation whose modified AGI is under the limit'],
            ['Withdrawals', 'Generally taxable, except for nondeductible contributions', 'Qualified distributions are tax-free'],
            ['Required minimum distributions', 'Yes, starting at the required age', 'Not while the original owner is alive'],
          ]}
        />

        <h2>Contribution limits</h2>
        <ArticleTable
          head={['Limit', '2025', '2026']}
          rows={[
            ['Annual IRA limit (traditional and Roth combined)', '$7,000', '$7,500'],
            ['Catch-up, age 50 or older', '$1,000 (total $8,000)', '$1,100 (total $8,600)'],
          ]}
        />
        <p>
          The limit is the <strong>smaller</strong> of the amount above or your taxable compensation for the year. Compensation includes wages, salaries, tips, commissions, and net self-employment earnings. It does not include interest, dividends, rental income, pensions, or amounts you exclude from income, such as foreign earned income excluded on Form 2555.
        </p>

        <h2>Is my traditional IRA contribution deductible?</h2>
        <p>
          If <strong>neither you nor your spouse</strong> was covered by a retirement plan at work during the year, your traditional IRA contribution is fully deductible, whatever your income. If you or your spouse <strong>was</strong> covered, the deduction is reduced or eliminated over these modified AGI ranges:
        </p>
        <ArticleTable
          head={['Situation', '2025 phase-out', '2026 phase-out']}
          rows={[
            ['Single or head of household, covered at work', '$79,000–$89,000', '$81,000–$91,000'],
            ['Married filing jointly, contributor covered at work', '$126,000–$146,000', '$129,000–$149,000'],
            ['Married filing jointly, contributor not covered but spouse covered', '$236,000–$246,000', '$242,000–$252,000'],
            ['Married filing separately (lived with spouse at any time during the year), either spouse covered', '$0–$10,000', '$0–$10,000'],
          ]}
        />
        <p>
          If you file separately and did not live with your spouse at any time during the year, Publication 590-A treats you as single for this table. The “Retirement plan” box on your Form W-2 should be checked if you were covered. If you cannot deduct all of your contribution, you can still make a <strong>nondeductible</strong> traditional IRA contribution and report it on <strong>Form 8606</strong>, so that part is not taxed again when withdrawn.
        </p>

        <h2>Can I contribute to a Roth IRA?</h2>
        <p>
          Roth IRA eligibility depends on modified AGI, not on workplace plan coverage. The amount you can contribute is reduced over these ranges and is zero above them:
        </p>
        <ArticleTable
          head={['Filing status', '2025 phase-out', '2026 phase-out']}
          rows={[
            ['Married filing jointly', '$236,000–$246,000', '$242,000–$252,000'],
            ['Single or head of household', '$150,000–$165,000', '$153,000–$168,000'],
            ['Married filing separately (lived with spouse at any time during the year)', '$0–$10,000', '$0–$10,000'],
          ]}
        />
        <p>
          The Roth limit is also reduced by any traditional IRA contributions you make for the same year.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Ana</strong>, age 40, is single, is covered by a 401(k) at work, and has modified AGI of $84,000 for 2025. Her income is inside the $79,000–$89,000 range, so her traditional IRA deduction is partly reduced.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Top of the 2025 range minus her modified AGI: $89,000 − $84,000', '$5,000'],
            ['Deductible limit: $5,000 × 70% (the Publication 590-A worksheet factor for a $7,000 limit)', '$3,500'],
            ['Rest of her $7,000 annual limit', '$3,500'],
          ]}
        />
        <p>
          Ana can deduct a $3,500 traditional IRA contribution. For the other $3,500, her income is below the $150,000 Roth range, so she could contribute it to a Roth IRA instead, or make it as a nondeductible traditional IRA contribution reported on Form 8606. Her combined IRA contributions for 2025 cannot exceed $7,000.
        </p>

        <h2>Spousal IRA</h2>
        <p>
          If you file a <strong>joint return</strong> and one spouse has little or no compensation, that spouse can still contribute based on the couple's combined compensation (the Kay Bailey Hutchison spousal IRA rule). For 2025, a couple can contribute up to $14,000 in total ($15,000 if one spouse is 50 or older, $16,000 if both are), as long as their combined taxable compensation covers it. Apart from this rule, each spouse figures their own limit using their own compensation, even in community property states.
        </p>

        <h2>Deadlines</h2>
        <ul>
          <li><strong>Due date:</strong> contributions for a year must be made by the due date of that year's return, <strong>not including extensions</strong> — April 15, 2026 for 2025 contributions.</li>
          <li><strong>Designate the year:</strong> if you contribute between January 1 and April 15, tell the IRA provider which year the contribution is for. Otherwise the provider can treat and report it as a contribution for the year it was received.</li>
        </ul>

        <h2>Excess contributions</h2>
        <p>
          Contributing more than your limit — or contributing to a Roth IRA when your income is too high — creates an <strong>excess contribution</strong>. It is subject to a <strong>6% tax</strong> each year it remains, reported on Form 5329. You can generally avoid the tax by withdrawing the excess and the earnings on it by the due date of your return, <strong>including extensions</strong>. The earnings are taxable.
        </p>

        <h2>IRA vs. 401(k)</h2>
        <ArticleTable
          head={['Limit', '2025', '2026']}
          rows={[
            ['401(k) elective deferral limit', '$23,500', '$24,500'],
            ['401(k) catch-up, age 50 or older', '$7,500', '$8,000'],
            ['401(k) catch-up, age 60 through 63, instead of the age-50 amount (if the plan allows)', '$11,250', '$11,250'],
            ['IRA limit', '$7,000', '$7,500'],
          ]}
        />
        <p>
          The 401(k) and IRA limits are separate: contributing to one does not use up the other. The only link is that 401(k) coverage can limit your traditional IRA <strong>deduction</strong>. The 401(k) amounts are limits on what you defer through your employer; IRA catch-up contributions are a separate $1,000 (2025) or $1,100 (2026). For 2026, Notice 2025-67 also sets a <strong>$150,000</strong> Roth catch-up wage threshold, based on 2025 wages, used to decide whether a person's 2026 401(k) catch-up contributions must be designated Roth contributions.
        </p>

        <h2>Living abroad</h2>
        <p>
          If you claim the foreign earned income exclusion or foreign housing exclusion, the excluded amounts are not compensation for IRA purposes. If you exclude all of your wages and have no other compensation, you generally cannot contribute for that year. Wages you do not exclude — for example, if you claim the foreign tax credit instead — can count. See <a href="/library/individual/foreign-earned-income-exclusion/">the FEIE guide</a>. Retirement accounts held outside the United States follow different rules; see <a href="/library/investment/foreign-pension-retirement-accounts/">Foreign pensions and retirement accounts</a>.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming a 401(k) means you cannot contribute.</strong> It only affects the deduction.</li>
          <li><strong>Counting the limit per account.</strong> It is one limit across all your traditional and Roth IRAs.</li>
          <li><strong>Contributing with no compensation</strong>, or with only investment income or excluded foreign wages.</li>
          <li><strong>Missing Form 8606</strong> for a nondeductible contribution.</li>
          <li><strong>Waiting for an extension</strong> to make the contribution.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Roth conversions, backdoor strategies, recharacterizations, inherited IRAs, and IRAs combined with Social Security benefits (which require special worksheets in Publication 590-A) can be complex. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

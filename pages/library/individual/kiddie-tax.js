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
  id:            '99',
  title:         'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the kiddie tax for tax years 2025 and 2026, based on the 2025 Instructions for Form 8615, the 2025 Form 8814 and its instructions, Rev. Proc. 2024-40 (2025 amounts), Rev. Proc. 2025-32 (2026 amounts), and the 2026 draft Forms 8615 and 8814 and their draft instructions. The 2026 figures in the draft forms are not final and should be confirmed against the final 2026 forms. It does not cover trusts, the alternative minimum tax, or state tax',
  persona:       ['Parents whose child has dividends, interest, or capital gains', 'Grandparents who gave stock to a grandchild', 'Families with a custodial investment account for a child', 'College students age 19 to 23 with investment income'],
  relatedJourney: ['Preparing to file', 'Investments & crypto'],
  actionRequired: 'Total your child\'s unearned income for the year; if it is over $2,700 and the age test is met, figure the child\'s tax on Form 8615, or check whether you can report the child\'s interest and dividends on your own return with Form 8814 instead.',
  sources: [
    { label: 'IRS — 2025 Instructions for Form 8615, Tax for Certain Children Who Have Unearned Income', url: 'https://www.irs.gov/pub/irs-pdf/i8615.pdf' },
    { label: 'IRS — 2025 Form 8814, Parents\' Election To Report Child\'s Interest and Dividends', url: 'https://www.irs.gov/pub/irs-pdf/f8814.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8814', url: 'https://www.irs.gov/pub/irs-pdf/i8814.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — 2026 Instructions for Form 8615 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i8615--dft.pdf' },
    { label: 'IRS — 2026 Instructions for Form 8814 (draft)', url: 'https://www.irs.gov/pub/irs-dft/i8814--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does the kiddie tax apply to my child\'s summer job?',
    a: 'No. The kiddie tax applies only to unearned income, such as interest, dividends, and capital gains. Wages, tips, and other pay for work the child actually performed are earned income and are taxed at the child\'s own rates.',
  },
  {
    q: 'At what age does the kiddie tax stop?',
    a: 'Under the 2025 Form 8615 instructions, it applies to a child under 18 at the end of the year; a child who is 18 and whose earned income was not more than half of their support; and a full-time student age 19 through 23 whose earned income was not more than half of their support. At least one parent must be alive at year end, and the child must not file a joint return.',
  },
  {
    q: 'Does it matter who gave the child the stock?',
    a: 'No. The Form 8615 instructions say the child\'s unearned income includes all income produced by property belonging to the child, regardless of when or by whom the property was transferred. Dividends on stock a grandparent gave the child count.',
  },
  {
    q: 'Can I just put my child\'s income on my return?',
    a: 'Sometimes. Form 8814 lets a qualifying parent report the child\'s interest and dividends (including capital gain distributions) on the parent\'s return if the child\'s gross income was more than $1,350 and less than $13,500 and the other conditions are met. The child then does not file. It can cost more tax, so compare both methods.',
  },
  {
    q: 'Does the child pay the tax, or the parent?',
    a: 'With Form 8615, the tax is figured using the parent\'s rate, but it is the child\'s tax, reported on the child\'s own return. With the Form 8814 election, the income and tax are on the parent\'s return.',
  },
]

const RELATED = [
  {
    href: '/library/individual/gift-tax-form-709',
    cat:  'Individuals & Families',
    title: 'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026',
    desc:  'Giving stock or cash to a child or grandchild.',
  },
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I have to report bank interest and dividends?',
    desc:  'How interest and dividend income is taxed.',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 Plans: Expanded K-12 and Credential Expenses Explained',
    desc:  'Another way families save for a child.',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Filing requirements, including for dependents.',
  },
]

export default function KiddieTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate | AskLinTax',
      description: 'The kiddie tax for 2025 and 2026: the $2,700 threshold, earned vs. unearned income, the age and student tests, Form 8615 vs. the Form 8814 parent election, gifted stock, custodial accounts, and capital gains.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>kiddie tax</strong> stops families from shifting investment income to children to use the children's lower tax rates. For <strong>2025</strong>, if a child under the age limit has more than <strong>$2,700</strong> of <strong>unearned income</strong> — interest, dividends, capital gains, and similar income — the amount over $2,700 is taxed at the <strong>parent's</strong> rate if that is higher. The child's tax is figured on <strong>Form 8615</strong>. Not all of a child's income is affected: <strong>wages and other earned income</strong> are still taxed at the child's own rates.
        </p>

        <h2>Who it applies to (2025)</h2>
        <p>Form 8615 must be filed for a child who meets <strong>all</strong> of these conditions:</p>
        <ul>
          <li>the child had <strong>more than $2,700</strong> of unearned income;</li>
          <li>the child is <strong>required to file</strong> a tax return;</li>
          <li>the child was <strong>under 18</strong> at the end of the year, <strong>or 18</strong> and their earned income was not more than half of their support, <strong>or a full-time student age 19 through 23</strong> and their earned income was not more than half of their support;</li>
          <li>at least one of the child's parents was alive at the end of the year; and</li>
          <li>the child does not file a joint return.</li>
        </ul>
        <p>
          These rules apply whether or not the child is claimed as a dependent, and "child" includes an adopted child and a stepchild.
        </p>

        <h2>Earned vs. unearned income</h2>
        <ArticleTable
          head={['Unearned income (can be subject to the kiddie tax)', 'Earned income (taxed at the child\'s rates)']}
          rows={[
            ['Taxable interest and dividends', 'Wages and salaries'],
            ['Capital gains, including capital gain distributions', 'Tips'],
            ['Rents and royalties', 'Other pay for work the child actually performed'],
            ['Taxable scholarships not reported on Form W-2', 'Certain self-employment income from the child\'s own services'],
            ['Unemployment compensation, taxable pensions, and trust income', ''],
          ]}
        />

        <h2>Key amounts</h2>
        <ArticleTable
          head={['Amount', '2025', '2026']}
          rows={[
            ['Unearned income above which Form 8615 applies', '$2,700', '$2,700 in the draft 2026 Form 8615 and instructions (not final)'],
            ['Base amount (the Form 8615 threshold is twice this amount)', '$1,350', '$1,350'],
            ['Form 8814 election: child\'s gross income must be', 'More than $1,350 and less than $13,500', 'More than $1,350 and less than $13,500'],
          ]}
        />
        <p>
          Rev. Proc. 2025-32 keeps the $1,350 amount and the $13,500 Form 8814 limit for 2026. The $2,700 Form 8615 threshold is twice the $1,350 amount, and the 2026 draft Form 8615 and its draft instructions use $2,700 and the same age tests. Drafts can change, so confirm the figures on the final 2026 forms before filing.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Sam</strong>, age 15, owns shares his grandparents gave him. In 2025 he receives $5,000 of qualified dividends and has no earned income. He is claimed as a dependent and does not itemize.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Unearned income (Form 8615, line 1)', '$5,000'],
            ['Amount not taxed at the parent\'s rate (line 2)', '$2,700'],
            ['Net unearned income taxed at the parent\'s rate (line 3)', '$2,300'],
          ]}
        />
        <p>
          Of the $2,700, the first $1,350 is generally covered by Sam's standard deduction as a dependent, and the next $1,350 is taxed at Sam's own rates. The remaining $2,300 is taxed at his parent's rates; because it is qualified dividends, the tax is figured with the Qualified Dividends and Capital Gain Tax Worksheet, as the Form 8615 instructions require. Sam files his own return with Form 8615. If he also had a $3,000 summer job, the wages would be taxed at his rates, not the parent's.
        </p>

        <h2>Form 8814: reporting the child's income on the parent's return</h2>
        <p>
          Instead of the child filing, a parent may elect to report the child's income on the parent's return if <strong>all</strong> of these apply (2025):
        </p>
        <ul>
          <li>the child was under 19 (or under 24 if a full-time student) at the end of the year;</li>
          <li>the child's <strong>only</strong> income was interest and dividends, including capital gain distributions and Alaska Permanent Fund dividends;</li>
          <li>the child's gross income was <strong>less than $13,500</strong> (and, under Rev. Proc. 2024-40, more than $1,350);</li>
          <li>the child is required to file, does not file a joint return, and had no estimated tax payments and no federal income tax withheld; and</li>
          <li>the parent qualifies — for example, files jointly with the child's other parent, or is the custodial parent if unmarried.</li>
        </ul>
        <p>
          <strong>It can cost more.</strong> The Form 8814 instructions say the election taxes the child's income between $1,350 and $2,700 at 10%. If the child had qualified dividends or capital gain distributions, that can mean up to <strong>$135</strong> more tax than a separate return, where those amounts could be taxed as low as 0%. Adding the income to your return also raises your AGI, which can affect other deductions and credits. Figure it both ways.
        </p>

        <h2>Gifts of stock and custodial accounts</h2>
        <ul>
          <li><strong>Gifted stock:</strong> income from property belonging to the child is the child's unearned income, no matter who gave the property or when.</li>
          <li><strong>Custodial accounts:</strong> if the account and its investments belong to the child, the interest, dividends, and gains are the child's income and can trigger the kiddie tax.</li>
          <li><strong>Selling gifted stock:</strong> the child generally uses the giver's basis to figure the gain, so a large built-in gain can push the child over $2,700. See <a href="/library/individual/gift-tax-form-709/">the gift tax guide</a> for basis and Form 709.</li>
        </ul>

        <h2>When the child must file</h2>
        <p>
          Form 8615 is filed with the child's own return, and only if the child is required to file. Filing requirements for dependents depend on the child's earned income, unearned income, and gross income; see <a href="/library/individual/do-i-need-to-file/">Do I need to file a tax return?</a>
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Applying the kiddie tax to wages.</strong> It covers unearned income only.</li>
          <li><strong>Forgetting older students.</strong> Full-time students age 19 through 23 can be covered.</li>
          <li><strong>Assuming gifted stock is the giver's income.</strong> Once the child owns it, the income is the child's.</li>
          <li><strong>Choosing Form 8814 without comparing</strong> the tax both ways.</li>
          <li><strong>Treating draft 2026 figures as final</strong> without checking the final 2026 forms.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Children with income from trusts, several children whose income must be combined on the parent's rate, divorced or separated parents, the alternative minimum tax, and children who are not U.S. citizens or residents can make the kiddie tax complex. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

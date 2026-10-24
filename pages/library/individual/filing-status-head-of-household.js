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
  id:            '107',
  title:         'Filing Status and Head of Household: 2025 and 2026 Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the five federal filing statuses for tax years 2025 and 2026, based on Publication 501 (2025), Rev. Proc. 2024-40, and Rev. Proc. 2025-32 (2026 standard deductions). The 2026 edition of Publication 501 was not available for this review, so the 2026 rules should be confirmed against it. It does not cover dual-status years in detail, community property allocation, or state filing status rules',
  persona:       ['Single parents', 'People separated or divorced during the year', 'Adults supporting a parent', 'People married to a nonresident alien', 'Widows and widowers'],
  relatedJourney: ['Preparing to file', 'Filing with dependents'],
  actionRequired: 'Decide your marital status as of December 31, then check whether you meet every head of household or qualifying surviving spouse test before choosing the status that gives you the lowest tax.',
  sources: [
    { label: 'IRS — Publication 501 (2025), Dependents, Standard Deduction, and Filing Information', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'I got married on December 31. Am I married for the whole year?',
    a: 'Yes. Publication 501 says your marital status on the last day of the year decides your filing status for the whole year. If you married on December 31, you are married for that year and choose married filing jointly or married filing separately.',
  },
  {
    q: 'My divorce is still pending. Can I file as single?',
    a: 'No. You are considered married until a final decree of divorce or separate maintenance is entered by the last day of the year. You may still qualify for head of household if you meet all five "considered unmarried" tests.',
  },
  {
    q: 'Can I file as head of household with no children?',
    a: 'Yes, if another qualifying person qualifies you. The most common case is a dependent parent: the parent does not have to live with you, but you must be able to claim the parent as a dependent and pay more than half the cost of the parent\'s main home for the entire year. Other relatives generally must live with you for more than half the year.',
  },
  {
    q: 'Can two people use the same child to file as head of household?',
    a: 'No. A person can qualify only one taxpayer for head of household status for the year.',
  },
  {
    q: 'Is a nonresident alien spouse a qualifying person?',
    a: 'No. You are considered unmarried for head of household purposes if your spouse was a nonresident alien at any time during the year and you do not choose to treat your spouse as a resident, but your spouse is not a qualifying person. You need another qualifying person, such as your child, and must meet the other tests.',
  },
  {
    q: 'Does head of household status also make me unmarried for other credits?',
    a: 'Not necessarily. Publication 501 says you may be considered unmarried for head of household purposes but not for other purposes, such as the earned income credit. Each benefit has its own tests.',
  },
]

const RELATED = [
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: 'Nonresident spouse: can we file jointly?',
    desc:  'The election to treat a nonresident spouse as a resident.',
  },
  {
    href: '/library/individual/claim-parent-as-dependent',
    cat:  'Individuals & Families',
    title: 'Can I claim my parents as dependents if they live abroad?',
    desc:  'The dependency tests behind the parent rule.',
  },
  {
    href: '/library/individual/earned-income-tax-credit',
    cat:  'Individuals & Families',
    title: 'Earned Income Tax Credit (EITC): 2025 and 2026 Income Limits and Rules',
    desc:  'Its own rules for married people who live apart.',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: 'First-time filer in the U.S.: a complete step-by-step guide',
    desc:  'Where filing status fits in your first return.',
  },
]

export default function FilingStatusPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Filing Status and Head of Household: 2025 and 2026 Rules | AskLinTax',
      description: 'The five filing statuses explained: marital status on December 31, head of household tests, considered unmarried, qualifying persons, the dependent parent rule, nonresident alien spouses, qualifying surviving spouse, and 2025 and 2026 standard deductions.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Your <strong>filing status</strong> sets your tax brackets, your standard deduction, and whether you can claim several credits. It depends mainly on whether you are married on <strong>December 31</strong> and who lives with you. Unmarried people who pay more than half the cost of a home for a <strong>qualifying person</strong> can often file as <strong>head of household</strong>, which has lower rates and a larger standard deduction than single. If more than one status fits, Publication 501 says to choose the one that gives you the lowest tax.
        </p>

        <h2>The five filing statuses</h2>
        <ArticleTable
          head={['Status', 'Who can use it']}
          rows={[
            ['Single', 'Unmarried, divorced, or legally separated on December 31, and no other status applies'],
            ['Married filing jointly', 'Married on December 31 (or spouse died during the year) and both spouses agree to file together'],
            ['Married filing separately', 'Married and each spouse reports only their own income and deductions'],
            ['Head of household', 'Unmarried or "considered unmarried," paid more than half the cost of a home, and had a qualifying person'],
            ['Qualifying surviving spouse', 'Spouse died in one of the 2 prior years, not remarried, and a dependent child lived with you all year'],
          ]}
        />

        <h2>Marital status is decided on December 31</h2>
        <ul>
          <li><strong>Unmarried for the whole year</strong> if, on the last day of the year, you are unmarried or legally separated under a divorce or separate maintenance decree. State law decides whether you are legally separated.</li>
          <li><strong>Divorced by December 31</strong> under a final decree: unmarried for the whole year.</li>
          <li><strong>Spouse died during the year:</strong> you are considered married for that year and can file jointly.</li>
          <li><strong>Foreign marriages</strong> are recognized if the marriage would be recognized in at least one U.S. state or territory. Registered domestic partnerships and civil unions that are not marriages under state law are not marriages for federal tax purposes.</li>
        </ul>

        <h2>Head of household: the three tests</h2>
        <ul>
          <li><strong>Unmarried or considered unmarried</strong> on the last day of the year.</li>
          <li><strong>You paid more than half the cost of keeping up a home</strong> for the year.</li>
          <li><strong>A qualifying person lived with you</strong> in the home for more than half the year, apart from temporary absences such as school. A dependent parent is the exception — see below.</li>
        </ul>

        <h2>"Considered unmarried" if you are still married</h2>
        <p>A married person is considered unmarried for head of household purposes only if all five tests are met:</p>
        <ul>
          <li>You file a separate return.</li>
          <li>You paid more than half the cost of keeping up your home for the year.</li>
          <li>Your spouse did not live in your home during the last 6 months of the year.</li>
          <li>Your home was the main home of your child, stepchild, or foster child for more than half the year.</li>
          <li>You can claim that child as a dependent, or could except that the noncustodial parent claims the child under the rules for divorced or separated parents.</li>
        </ul>
        <p>
          <strong>Nonresident alien spouse:</strong> you are also considered unmarried for head of household purposes if your spouse was a nonresident alien at any time during the year and you do not choose to treat your spouse as a resident. Your spouse is not a qualifying person, so you still need another qualifying person.
        </p>

        <h2>Who is a qualifying person</h2>
        <ArticleTable
          head={['Person', 'Qualifying person for head of household?']}
          rows={[
            ['Your qualifying child who is single', 'Yes'],
            ['Your qualifying child who is married', 'Only if you can claim the child as a dependent'],
            ['Your parent', 'Only if you can claim the parent as a dependent; the parent does not have to live with you'],
            ['Another relative, such as a grandparent or sibling', 'Only if they lived with you more than half the year, are related in a listed way, and you can claim them'],
            ['Someone you can claim only under a multiple support agreement', 'No'],
            ['A friend or unrelated member of your household', 'No'],
          ]}
        />
        <p>
          <strong>Dependent parent rule:</strong> you must pay more than half the cost of keeping up a home that was your parent's main home for the <strong>entire year</strong>. Paying more than half the cost of a rest home or home for the elderly counts.
        </p>

        <h2>What counts as the cost of keeping up a home</h2>
        <ArticleTable
          head={['Include', 'Do not include']}
          rows={[
            ['Rent, mortgage interest, real estate taxes', 'Clothing, education, medical treatment'],
            ['Home insurance and repairs', 'Vacations, life insurance, transportation'],
            ['Utilities and food eaten in the home', 'The value of your own services or a household member\'s'],
          ]}
        />

        <h2>Qualifying surviving spouse</h2>
        <ul>
          <li><strong>Year of death:</strong> you can generally file jointly with your deceased spouse.</li>
          <li><strong>Next 2 years:</strong> for 2025, you may use qualifying surviving spouse if your spouse died in <strong>2023 or 2024</strong>, you did not remarry before the end of 2025, you could have filed jointly in the year of death, and you paid more than half the cost of a home where your child or stepchild (not a foster child) whom you can claim as a dependent (with limited exceptions) lived all year, apart from temporary absences.</li>
          <li><strong>What it gives you:</strong> joint-return tax rates and the joint standard deduction. It does not let you file a joint return.</li>
        </ul>

        <h2>Standard deduction by filing status</h2>
        <ArticleTable
          head={['Filing status', '2025', '2026']}
          rows={[
            ['Single or married filing separately', '$15,750', '$16,100'],
            ['Married filing jointly or qualifying surviving spouse', '$31,500', '$32,200'],
            ['Head of household', '$23,625', '$24,150'],
          ]}
        />
        <p>
          The 2025 amounts are from Publication 501 (2025); the 2026 amounts are from Rev. Proc. 2025-32. Additional amounts apply if you are 65 or older or blind. If you are married filing separately and your spouse itemizes, you cannot take the standard deduction.
        </p>

        <h2>Examples (2025)</h2>
        <ArticleTable
          head={['', 'Lena', 'Ana', 'Raj', 'Tom']}
          rows={[
            ['Situation', 'Divorce final December 15; son lived with her all year', 'Single; pays more than half the rent for her dependent mother\'s apartment all year', 'Married; spouse is a nonresident alien abroad all year; no election; no one else lives with him', 'Spouse died in 2024; not remarried; dependent daughter lived with him all year'],
            ['Filing status', 'Head of household', 'Head of household', 'Married filing separately', 'Qualifying surviving spouse'],
            ['Standard deduction', '$23,625', '$23,625', '$15,750', '$31,500'],
          ]}
        />
        <p>
          Raj is considered unmarried for head of household purposes, but his nonresident spouse is not a qualifying person and he has no other one, so head of household is not available. If he chose to treat his spouse as a resident, they could file jointly instead. The examples assume every other test is met, including that Lena paid more than half the cost of her home.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Filing as single while still married</strong> on December 31 because the divorce was not final.</li>
          <li><strong>Claiming head of household</strong> when your spouse lived with you at any time in the last 6 months of the year.</li>
          <li><strong>Counting a friend or a nonresident spouse</strong> as a qualifying person.</li>
          <li><strong>Using a parent</strong> you cannot claim as a dependent, or whose home you did not support for the whole year.</li>
          <li><strong>Keeping qualifying surviving spouse</strong> for more than 2 years after the year of death.</li>
          <li><strong>Assuming a joint return is always better</strong> — compare statuses, especially when one spouse has large medical expenses or tax problems.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Dual-status years, community property states, annulments, kidnapped children, and parents who share custody have special rules. State filing status rules can differ.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

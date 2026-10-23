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
  id:            '101',
  title:         'Earned Income Tax Credit (EITC): 2025 and 2026 Income Limits and Rules',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal earned income tax credit for tax years 2025 and 2026, based on Publication 596 (2025), Rev. Proc. 2024-40 (2025 amounts), and Rev. Proc. 2025-32 (2026 amounts). The 2026 edition of Publication 596 was not available for this review, so the 2026 eligibility rules should be confirmed against it. It does not cover state earned income credits, U.S. territories, or exact credit amounts from the IRS EIC Table',
  persona:       ['Working parents with low to moderate income', 'Workers age 25 to 64 without children', 'Married couples who live apart', 'New immigrants with an SSN or an ITIN'],
  relatedJourney: ['Filing with dependents', 'Money & Benefits'],
  actionRequired: 'Check that you, your spouse, and any qualifying child have SSNs valid for employment by the return due date, that your investment income and AGI are under the limits for your tax year, and attach Schedule EIC if you have a qualifying child.',
  sources: [
    { label: 'IRS — Publication 596 (2025), Earned Income Credit (EIC)', url: 'https://www.irs.gov/publications/p596' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Can I get the EITC if I owe no tax?',
    a: 'Yes. The EITC is a refundable credit: if it is more than the tax you owe, the IRS pays you the difference as a refund. You must file a return to claim it, even if you are not otherwise required to file.',
  },
  {
    q: 'Can I claim the EITC with an ITIN?',
    a: 'No. Publication 596 says you (and your spouse on a joint return) must have a valid SSN issued by the due date of the return, including extensions. You cannot claim the EITC if you have an ITIN instead of an SSN. An SSN issued only to receive a federally funded benefit, such as Medicaid, and not valid for work does not count.',
  },
  {
    q: 'My child does not have an SSN. Can I still claim anything?',
    a: 'You cannot claim the higher credit for that child. But if you otherwise qualify, Publication 596 says you may be able to claim the smaller credit for workers without a qualifying child (a "self-only" EITC). Attach Schedule EIC and follow its instructions for a child without a valid SSN.',
  },
  {
    q: 'Can I claim the EITC if I am married but file separately?',
    a: 'Usually married people must file jointly. Under the special rule for separated spouses, you can claim the EITC without filing jointly if a qualifying child lived with you for more than half the year and you either lived apart from your spouse for the last 6 months of the year or were legally separated and did not live in the same household at year end.',
  },
  {
    q: 'I live abroad and exclude my wages on Form 2555. Can I claim the EITC?',
    a: 'No. You cannot claim the EITC if you file Form 2555. Separately, your main home must have been in the United States (the 50 states and D.C.) for more than half the year.',
  },
  {
    q: 'Why is my refund late if I claimed the EITC?',
    a: 'By law, the IRS cannot issue refunds before mid-February for returns that claim the EITC or the additional child tax credit. This applies to the whole refund, not just the credit.',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'The other major credit for families with children.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Why refundable credits matter.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'What you can and cannot claim with an ITIN.',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: 'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate',
    desc:  'Another rule that depends on investment income.',
  },
]

export default function EarnedIncomeTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Earned Income Tax Credit (EITC): 2025 and 2026 Income Limits and Rules | AskLinTax',
      description: 'The EITC explained: 2025 and 2026 maximum credits and income limits, earned income, qualifying children, valid SSNs and ITINs, the investment income limit, separated spouses, Form 2555, Schedule EIC, and refund timing.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>earned income tax credit (EITC)</strong> is a federal credit for people who work and have low to moderate income. It is <strong>refundable</strong>, so it can give you a refund even if you owe no tax. For <strong>2025</strong>, the maximum credit ranges from <strong>$649</strong> with no qualifying child to <strong>$8,046</strong> with three or more; for <strong>2026</strong>, from <strong>$664</strong> to <strong>$8,231</strong>. You need earned income, a valid SSN, investment income under the limit, and income under the phase-out limit for your family size.
        </p>

        <h2>Who can claim it: rules for everyone</h2>
        <p>Publication 596 (2025) lists rules that every claimant must meet:</p>
        <ul>
          <li><strong>Valid SSN:</strong> you (and your spouse on a joint return) must have an SSN valid for employment, issued by the return due date including extensions. An ITIN does not qualify.</li>
          <li><strong>Filing status:</strong> married people generally must file jointly, unless the special rule for separated spouses applies.</li>
          <li><strong>Citizen or resident all year:</strong> if you were a nonresident alien for any part of the year, you can claim it only on a joint return with a U.S. citizen or resident spouse, after choosing to be treated as a U.S. resident.</li>
          <li><strong>No Form 2555:</strong> you cannot claim it if you exclude foreign earned income or a foreign housing amount.</li>
          <li><strong>Investment income limit:</strong> no more than <strong>$11,950</strong> for 2025 or <strong>$12,200</strong> for 2026.</li>
          <li><strong>Earned income:</strong> you must have it, and your AGI and earned income must be below the limits below.</li>
        </ul>

        <h2>What counts as earned income</h2>
        <ArticleTable
          head={['Counts as earned income', 'Does not count']}
          rows={[
            ['Taxable wages, salaries, and tips', 'Interest, dividends, and capital gains'],
            ['Net earnings from self-employment', 'Social Security and pensions'],
            ['Gross income as a statutory employee', 'Unemployment compensation and child support'],
            ['Household employee wages and unreported tips', 'Nontaxable pay such as certain dependent care benefits'],
          ]}
        />
        <p>
          Nontaxable combat pay is an exception: you can choose to include it. Investment income does not help you qualify and, above the limit, disqualifies you.
        </p>

        <h2>2025 and 2026 amounts</h2>
        <ArticleTable
          head={['2025', 'No qualifying child', '1 child', '2 children', '3 or more']}
          rows={[
            ['Maximum credit', '$649', '$4,328', '$7,152', '$8,046'],
            ['Earned income needed for the maximum', '$8,490', '$12,730', '$17,880', '$17,880'],
            ['Phase-out begins (married filing jointly)', '$17,730', '$30,470', '$30,470', '$30,470'],
            ['No credit at or above (married filing jointly)', '$26,214', '$57,554', '$64,430', '$68,675'],
            ['Phase-out begins (all other filers)', '$10,620', '$23,350', '$23,350', '$23,350'],
            ['No credit at or above (all other filers)', '$19,104', '$50,434', '$57,310', '$61,555'],
          ]}
        />
        <ArticleTable
          head={['2026', 'No qualifying child', '1 child', '2 children', '3 or more']}
          rows={[
            ['Maximum credit', '$664', '$4,427', '$7,316', '$8,231'],
            ['Earned income needed for the maximum', '$8,680', '$13,020', '$18,290', '$18,290'],
            ['Phase-out begins (married filing jointly)', '$18,140', '$31,160', '$31,160', '$31,160'],
            ['No credit at or above (married filing jointly)', '$26,820', '$58,863', '$65,899', '$70,244'],
            ['Phase-out begins (all other filers)', '$10,860', '$23,890', '$23,890', '$23,890'],
            ['No credit at or above (all other filers)', '$19,540', '$51,593', '$58,629', '$62,974'],
          ]}
        />
        <p>
          These amounts come from Rev. Proc. 2024-40 and Rev. Proc. 2025-32. The phase-out is measured by your AGI or, if greater, your earned income. The "all other filers" column also applies to married people who file separately under the separated-spouse rule. Your exact credit comes from the EIC Table in the Form 1040 instructions.
        </p>

        <h2>Qualifying children</h2>
        <p>A qualifying child must meet four tests:</p>
        <ul>
          <li><strong>Relationship:</strong> your son, daughter, stepchild, foster child, or a descendant of any of them; or your brother, sister, half-sibling, step-sibling, or a descendant of any of them.</li>
          <li><strong>Age:</strong> under 19 at year end and younger than you (or your spouse if filing jointly); under 24 if a full-time student and younger than you; or any age if permanently and totally disabled.</li>
          <li><strong>Residency:</strong> lived with you in the United States for more than half the year.</li>
          <li><strong>Joint return:</strong> the child generally cannot file a joint return for the year.</li>
        </ul>
        <p>
          The child also needs a valid SSN by the return due date for you to claim the larger credit. Only one person can claim a given child; the tie-breaker rules in Publication 596 decide who.
        </p>

        <h2>Workers without a qualifying child</h2>
        <ul>
          <li><strong>Age:</strong> for 2025, at least 25 but under 65 at year end (on a joint return, either spouse can meet this test).</li>
          <li><strong>Not a dependent</strong> and not a qualifying child of another person.</li>
          <li><strong>U.S. home:</strong> your main home was in the United States for more than half the year.</li>
        </ul>

        <h2>Examples (illustrative, 2025)</h2>
        <ArticleTable
          head={['', 'Rosa', 'Dan', 'Lee family']}
          rows={[
            ['Filing status', 'Head of household', 'Single', 'Married filing jointly'],
            ['Qualifying children', '2', 'None (age 30)', '1'],
            ['Earned income and AGI', '$20,000', '$9,000', '$60,000'],
            ['Investment income', '$0', '$0', '$300'],
            ['Where the income falls', 'Above $17,880 and below the $23,350 phase-out start', 'Above $8,490 and below the $10,620 phase-out start', 'Above the $57,554 limit'],
            ['2025 EITC', '$7,152 (the maximum)', '$649 (the maximum)', 'None'],
          ]}
        />
        <p>
          If Rosa also had <strong>$12,000</strong> of interest income, she would get no EITC for 2025, because her investment income would exceed $11,950 — that test alone rules her out, even before the interest raises her AGI to $32,000. The examples assume all earned income is wages, everyone has a valid SSN, Dan is not anyone's dependent and lived in the United States all year, each child meets all four qualifying-child tests, and all other rules are met.
        </p>

        <h2>Schedule EIC and filing</h2>
        <ul>
          <li><strong>Schedule EIC:</strong> attach it to Form 1040 if you have a child who meets the qualifying-child conditions, even if that child does not have a valid SSN.</li>
          <li><strong>No SSN yet:</strong> if you do not have a valid SSN by the due date (including extensions), you cannot claim the EITC on the original or an amended return for that year. Publication 596 notes that a Form 4868 extension can give you more time to get one.</li>
          <li><strong>Refund timing:</strong> refunds on returns claiming the EITC cannot be issued before mid-February.</li>
          <li><strong>Earlier denial:</strong> if your EITC was denied or reduced in an earlier year for reasons other than a math or clerical error, you may need to file Form 8862 before claiming it again.</li>
        </ul>

        <h2>2026 notes</h2>
        <p>
          The 2026 dollar amounts above are final (Rev. Proc. 2025-32). The other rules in this guide are from Publication 596 for 2025; check the 2026 edition when it is published.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Not filing</strong> because income is below the filing threshold — you must file to get the credit.</li>
          <li><strong>Claiming a child</strong> who did not live with you in the United States for more than half the year.</li>
          <li><strong>Two people claiming the same child.</strong></li>
          <li><strong>Leaving out investment income</strong> such as interest, dividends, or capital gains.</li>
          <li><strong>Filing separately while living together</strong> — that generally rules out the credit.</li>
          <li><strong>Claiming with an ITIN</strong> or with an SSN not valid for work.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Self-employment income, children claimed by more than one relative, recertification after a denial, and the rules for clergy, military, and disability income can be complex. State earned income credits are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '100',
  title:         'Is My Social Security Taxable? The 50% and 85% Rules Explained',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how much of your Social Security retirement, survivor, and disability benefits is subject to federal income tax, based on Publication 915 (2025) and the IRS guidance on the enhanced deduction for seniors. The amounts shown are from Publication 915 (2025); confirm them against the 2026 edition when it is published. It does not cover railroad retirement tier 2 benefits, lump-sum election calculations, or state tax',
  persona:       ['Retirees receiving Social Security', 'People receiving Social Security disability benefits', 'Married couples deciding how to file', 'Nonresident aliens receiving U.S. Social Security'],
  relatedJourney: ['Preparing to file'],
  actionRequired: 'Use box 5 of your Form SSA-1099 and the Social Security Benefits Worksheet in the Form 1040 instructions (or Publication 915) to figure the taxable part, and consider Form W-4V withholding or estimated payments if part of your benefits will be taxable.',
  sources: [
    { label: 'IRS — Publication 915 (2025), Social Security and Equivalent Railroad Retirement Benefits', url: 'https://www.irs.gov/publications/p915' },
    { label: 'IRS — Check your eligibility for the new enhanced deduction for seniors', url: 'https://www.irs.gov/newsroom/check-your-eligibility-for-the-new-enhanced-deduction-for-seniors' },
  ],
}

const FAQS = [
  {
    q: 'Does "85% taxable" mean I pay 85% tax?',
    a: 'No. It means at most 85% of your benefits is included in taxable income. That amount is then taxed at your ordinary income tax rates, along with your other income. Many people have none or only part of their benefits included.',
  },
  {
    q: 'Are Social Security disability benefits taxed the same way?',
    a: 'Yes. Publication 915 says Social Security benefits include monthly retirement, survivor, and disability benefits, and the same worksheet applies. Supplemental Security Income (SSI) is not Social Security benefits and is not taxable.',
  },
  {
    q: 'Does the new $6,000 senior deduction make my Social Security tax-free?',
    a: 'No. The taxable part of your benefits is still figured with the Social Security Benefits Worksheet, which does not use the senior deduction. The senior deduction, for 2025 through 2028, is subtracted later and can reduce the tax on your total taxable income, but it does not change how much of your benefits is taxable.',
  },
  {
    q: 'Is tax-exempt interest counted?',
    a: 'Yes. Tax-exempt interest, such as municipal bond interest, is added to your other income when you compare it with the base amount, even though the interest itself is not taxed.',
  },
  {
    q: 'I only receive Social Security. Do I need to file?',
    a: 'Publication 915 says that if your only income was Social Security benefits, they generally are not taxable and you probably do not have to file. If you have other income, you may have to file even if none of your benefits is taxable.',
  },
  {
    q: 'How do I have tax withheld from my benefits?',
    a: 'Give the Social Security Administration Form W-4V, Voluntary Withholding Request. Otherwise you may need to increase withholding on other income or make estimated tax payments.',
  },
]

const RELATED = [
  {
    href: '/library/individual/senior-deduction',
    cat:  'Individuals & Families',
    title: 'The New $6,000 Senior Deduction: Eligibility and Income Limits',
    desc:  'A separate deduction for people 65 or older.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'IRA and 401(k) withdrawals count as other income.',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: 'Why do I owe taxes this year? Understanding your W-4 and withholding',
    desc:  'Withholding and estimated tax.',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Nonresident aliens follow different Social Security rules.',
  },
]

export default function SocialSecurityBenefitsTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Is My Social Security Taxable? The 50% and 85% Rules Explained | AskLinTax',
      description: 'How much of your Social Security is taxable: combined income, the $25,000 and $32,000 base amounts, the 50% and 85% tiers, married filing separately, Form SSA-1099, the senior deduction, and nonresident aliens.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Your Social Security benefits may be partly taxable, depending on your other income. Add <strong>half of your benefits</strong> to <strong>all your other income, including tax-exempt interest</strong>. If the total is not more than <strong>$25,000</strong> (<strong>$32,000</strong> if married filing jointly), none of your benefits is taxable. Above that, generally up to <strong>50%</strong> of your benefits is taxable, and at higher incomes up to <strong>85%</strong>. "Up to 85% taxable" means up to 85% of the benefits is counted as income — <strong>not an 85% tax rate</strong>.
        </p>

        <h2>What counts as Social Security benefits</h2>
        <ul>
          <li><strong>Included:</strong> monthly retirement, survivor, and disability benefits, and the Social Security equivalent part of tier 1 railroad retirement benefits.</li>
          <li><strong>Not included:</strong> Supplemental Security Income (SSI), which is not taxable.</li>
          <li><strong>Your form:</strong> Form SSA-1099. Box 3 shows gross benefits, box 4 repayments, and <strong>box 5</strong> net benefits — the amount used in the calculation.</li>
          <li><strong>Who is taxed:</strong> the person who has the legal right to the benefits. A child's benefits are the child's, even if the check is in a parent's name.</li>
        </ul>

        <h2>Step 1: combined income vs. the base amount</h2>
        <p>
          Publication 915 compares your base amount with the total of <strong>one-half of your benefits</strong> plus <strong>all your other income, including tax-exempt interest</strong>. Do not reduce your other income by exclusions such as the foreign earned income exclusion or foreign housing exclusion.
        </p>
        <ArticleTable
          head={['Filing status', 'Base amount', 'Up to 85% can be taxable above']}
          rows={[
            ['Single, head of household, or qualifying surviving spouse', '$25,000', '$34,000'],
            ['Married filing separately, lived apart from your spouse all year', '$25,000', '$34,000'],
            ['Married filing jointly', '$32,000', '$44,000'],
            ['Married filing separately, lived with your spouse at any time during the year', '$0', 'Up to 85% can be taxable from the first dollar'],
          ]}
        />
        <p>
          On a joint return, you combine both spouses' incomes and benefits, even if only one spouse received benefits. These are the amounts in Publication 915 (2025); check the edition for your tax year.
        </p>

        <h2>Step 2: how much is taxable</h2>
        <ul>
          <li><strong>At or below the base amount:</strong> none of your benefits is taxable.</li>
          <li><strong>Between the base amount and $34,000 ($44,000 joint):</strong> the taxable amount is generally the smaller of half your benefits or half of the amount over the base.</li>
          <li><strong>Above $34,000 ($44,000 joint):</strong> 85% of the amount over that level is added, but the taxable amount can never be more than <strong>85% of your benefits</strong>.</li>
          <li><strong>Married filing separately and lived together:</strong> the worksheet skips the base amounts and generally includes 85% of the combined income figure, up to 85% of your benefits.</li>
        </ul>
        <p>
          Use the Social Security Benefits Worksheet in the Form 1040 instructions or Worksheet 1 in Publication 915. If you made a traditional IRA contribution while you or your spouse was covered by a workplace plan, Publication 915 says to use the special worksheets in Publication 590-A instead.
        </p>

        <h2>Examples (illustrative, 2025, single filer)</h2>
        <ArticleTable
          head={['', 'Grace', 'Henry']}
          rows={[
            ['Social Security benefits (SSA-1099 box 5)', '$24,000', '$30,000'],
            ['Other income (pension, IRA withdrawals, interest)', '$20,000', '$40,000'],
            ['Tax-exempt interest', '$1,000', '$0'],
            ['Half of benefits + other income + tax-exempt interest', '$33,000', '$55,000'],
            ['Amount over the $25,000 base', '$8,000', '$30,000'],
            ['50% tier: half of the amount over the base, up to $9,000 × 50% ($4,500), and not more than half of the benefits', '$4,000', '$4,500'],
            ['85% tier: 85% of the amount over $34,000', '$0', '$17,850 (85% × $21,000)'],
            ['Total, capped at 85% of benefits', '$4,000', '$22,350 (cap is $25,500)'],
            ['Share of benefits that is taxable', 'About 17%', 'About 75%'],
          ]}
        />
        <p>
          The taxable amount is added to Grace's and Henry's other income and taxed at their ordinary rates. The examples assume no adjustments to income; your worksheet may differ.
        </p>

        <h2>How other income affects the result</h2>
        <ul>
          <li><strong>IRA and 401(k) withdrawals, including RMDs</strong>, pensions, wages, interest, dividends, and capital gains all count as other income. A large withdrawal can make more of your benefits taxable. See <a href="/library/individual/retirement-withdrawals-rmd/">the retirement withdrawals guide</a>.</li>
          <li><strong>Tax-exempt interest</strong> is added in, even though it is not taxed.</li>
          <li><strong>Excluded foreign income</strong> is added back for this calculation.</li>
        </ul>

        <h2>The senior deduction does not make benefits tax-free</h2>
        <p>
          For 2025 through 2028, people 65 or older may claim the enhanced deduction for seniors of up to $6,000 each, subject to an income phase-out. It is <strong>not</strong> used in the Social Security Benefits Worksheet, so it does not change how much of your benefits is taxable. It is subtracted later, which can lower the tax on your total taxable income. Because taxable benefits are part of your adjusted gross income, they can also affect the income used for the senior deduction phase-out. See <a href="/library/individual/senior-deduction/">the senior deduction guide</a>.
        </p>

        <h2>Nonresident aliens</h2>
        <p>
          If you are a <strong>nonresident alien</strong>, the rules above do not apply. Instead, <strong>85% of your benefits is taxed at a flat 30%</strong>, unless a tax treaty exempts them or sets a lower rate. You receive Form SSA-1042S instead of Form SSA-1099. Publication 915 lists treaty countries whose residents are exempt (Canada, Egypt, Germany, Ireland, Israel, Italy, Japan, Romania, and the United Kingdom), a limited rule for India, and a 15% rate for residents of Switzerland. Taiwan is not on the list. Green card holders are resident aliens and are not subject to the 30% withholding. To check your status, see <a href="/library/individual/tax-residency/">tax residency</a>.
        </p>

        <h2>Other points</h2>
        <ul>
          <li><strong>Back payments:</strong> if you received a lump-sum payment for earlier years, you may be able to use the lump-sum election in Publication 915 to limit the taxable amount.</li>
          <li><strong>Reporting:</strong> report net benefits on Form 1040, line 6a, and the taxable part on line 6b. If you are married filing separately and lived apart all year, check the box on line 6d.</li>
          <li><strong>Withholding:</strong> to have tax withheld, give the SSA Form W-4V.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Reading "85%" as a tax rate.</strong></li>
          <li><strong>Leaving out tax-exempt interest</strong> or excluded foreign income.</li>
          <li><strong>Filing separately while living together</strong> without realizing the base amount is $0.</li>
          <li><strong>Assuming the senior deduction removes tax on benefits.</strong></li>
          <li><strong>Counting SSI</strong> as taxable benefits.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Lump-sum back payments, repayments larger than benefits, railroad retirement benefits, IRA contributions combined with benefits, and benefits from foreign social security systems can be complex. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

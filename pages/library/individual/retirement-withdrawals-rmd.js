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
  id:            '98',
  title:         'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how withdrawals from traditional IRAs, Roth IRAs, and 401(k)-type plans are taxed, the 10% additional tax and its main exceptions, and required minimum distributions, for tax years 2025 and 2026, based on Publication 590-B (2025), Publication 575, the 2025 Instructions for Form 5329, IRS Tax Topics 557 and 558, the IRS required minimum distribution FAQs, and the 2024 final required minimum distribution regulations (T.D. 10001) and proposed regulations (REG-103529-23) in Internal Revenue Bulletin 2024-33. The applicable age for people born in 1959 rests on proposed regulations that are not final. It does not calculate RMD amounts, cover annuities, pensions, rollovers in detail, or state tax',
  persona:       ['People thinking about taking money out of an IRA or 401(k) before 59½', 'Retirees approaching their first required minimum distribution', 'Anyone who missed an RMD', 'Beneficiaries who inherited a retirement account'],
  relatedJourney: ['Preparing to file'],
  actionRequired: 'Before withdrawing, check whether the money is taxable, whether you are under 59½ and an exception applies, and how much will be withheld; once you reach the required age, take each RMD by its deadline, and file Form 5329 when an exception, a missed RMD, or another additional tax applies.',
  sources: [
    { label: 'IRS — Publication 590-B (2025), Distributions from Individual Retirement Arrangements (IRAs)', url: 'https://www.irs.gov/publications/p590b' },
    { label: 'IRS — Publication 575, Pension and Annuity Income', url: 'https://www.irs.gov/publications/p575' },
    { label: 'IRS — 2025 Instructions for Form 5329', url: 'https://www.irs.gov/pub/irs-pdf/i5329.pdf' },
    { label: 'IRS — Topic no. 557, Additional tax on early distributions from traditional and Roth IRAs', url: 'https://www.irs.gov/taxtopics/tc557' },
    { label: 'IRS — Topic no. 558, Additional tax on early distributions from retirement plans other than IRAs', url: 'https://www.irs.gov/taxtopics/tc558' },
    { label: 'IRS — Retirement plan and IRA required minimum distributions FAQs', url: 'https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs' },
    { label: 'IRS — Internal Revenue Bulletin 2024-33 (T.D. 10001 final RMD regulations and REG-103529-23 proposed regulations)', url: 'https://www.irs.gov/pub/irs-irbs/irb24-33.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is the 10% penalty the only tax on an early withdrawal?',
    a: 'No. The 10% additional tax is on top of regular income tax. It applies to the part of the distribution you must include in income, so a fully taxable early withdrawal from a traditional IRA is taxed as ordinary income and then charged the extra 10% unless an exception applies.',
  },
  {
    q: 'Can I take out my Roth IRA contributions without tax?',
    a: 'Generally yes. Under Publication 590-B, distributions from a Roth IRA come out in a set order: your regular contributions first, then conversion and rollover contributions, then earnings. A return of your regular contributions is not included in income. Earnings taken out in a non-qualified distribution can be taxable and may be subject to the 10% additional tax.',
  },
  {
    q: 'Does the age-55 rule apply to my IRA?',
    a: 'No. The exception for leaving your job in or after the year you reach 55 is listed by the IRS only for qualified employer plans, such as a 401(k). It does not apply to IRAs.',
  },
  {
    q: 'When is my first required minimum distribution due?',
    a: 'It depends on your birth year. Under the 2024 final regulations, the applicable age is 73 if you were born from 1951 through 1958 and 75 if you were born on or after January 1, 1960. For people born in 1959 the statute gives both ages; proposed regulations would set 73, but they are not final. For an IRA, the first RMD can be delayed until April 1 of the year after you reach your applicable age; each later RMD is due by December 31, so delaying the first means two RMDs in one year.',
  },
  {
    q: 'I missed an RMD. What now?',
    a: 'Take the missed amount as soon as you can. The shortfall is subject to a 25% additional tax on Form 5329, reduced to 10% if, during the correction window, you take the missed amount and file a return reflecting the tax. The window generally ends on the last day of the second tax year after the year the tax is imposed, or earlier if the IRS mails a deficiency notice or assesses the tax. The IRS may waive the tax if the shortfall was due to reasonable error and you are fixing it; attach an explanation to Form 5329.',
  },
  {
    q: 'Do I have to take RMDs from my Roth IRA?',
    a: 'Not while you, the original owner, are alive. The IRS FAQs also say designated Roth accounts in 401(k) and 403(b) plans no longer require RMDs while the owner is alive. Beneficiaries who inherit a Roth account do have distribution rules.',
  },
]

const RELATED = [
  {
    href: '/library/individual/ira-roth-ira-contributions',
    cat:  'Individuals & Families',
    title: 'Traditional and Roth IRA Contributions: 2025 and 2026 Limits and Income Rules',
    desc:  'How money goes into an IRA in the first place.',
  },
  {
    href: '/library/individual/social-security-benefits-tax',
    cat:  'Individuals & Families',
    title: 'Is My Social Security Taxable? The 50% and 85% Rules Explained',
    desc:  'Retirement account withdrawals can make more of your benefits taxable.',
  },
  {
    href: '/library/individual/owe-taxes-withholding-w4',
    cat:  'Individuals & Families',
    title: 'Why do I owe taxes this year? Understanding your W-4 and withholding',
    desc:  'Withholding and estimated tax on retirement income.',
  },
  {
    href: '/library/investment/net-investment-income-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Net Investment Income Tax (NIIT): Who Pays the 3.8% Tax in 2025 and 2026',
    desc:  'IRA and plan distributions are not net investment income.',
  },
]

export default function RetirementWithdrawalsRmdPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines | AskLinTax',
      description: 'How IRA and 401(k) withdrawals are taxed: traditional vs. Roth, the 10% additional tax before 59½ and its exceptions, Form 5329, required minimum distribution ages (73 or 75 by birth year), missed RMDs, and inherited accounts.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Money you take out of a <strong>traditional IRA or 401(k)</strong> is generally taxed as ordinary income, except for any after-tax (nondeductible) amounts. <strong>Qualified</strong> distributions from a <strong>Roth IRA</strong> are tax-free. If you are <strong>under 59½</strong>, the taxable part may also be charged a <strong>10% additional tax</strong> unless an exception applies. Once you reach your <strong>applicable age</strong> — <strong>73</strong> or <strong>75</strong>, depending on your birth year — you generally must take <strong>required minimum distributions (RMDs)</strong> from traditional IRAs and employer plans each year.
        </p>

        <h2>Is the withdrawal taxable?</h2>
        <ArticleTable
          head={['Account', 'Generally taxable', 'Generally not taxable']}
          rows={[
            ['Traditional IRA', 'Deductible contributions and all earnings', 'Your nondeductible contributions (basis), figured on Form 8606'],
            ['401(k), 403(b), other employer plans (pre-tax)', 'Pre-tax contributions, employer contributions, and earnings', 'After-tax contributions'],
            ['Roth IRA, qualified distribution', 'Nothing', 'The whole distribution'],
            ['Roth IRA, non-qualified distribution', 'Earnings, after contributions and conversions come out first', 'A return of your regular contributions'],
            ['Any account, rolled over properly', 'Nothing', 'The amount rolled over'],
          ]}
        />
        <p>
          A Roth IRA distribution is <strong>qualified</strong> if it is made after the 5-year period that begins with the first year a contribution was made to any Roth IRA for you, <strong>and</strong> you are 59½ or older, disabled, the distribution is to a beneficiary after your death, or it is a first-time home purchase (up to $10,000 lifetime).
        </p>

        <h2>The 10% additional tax before 59½</h2>
        <p>
          For distributions before age 59½, the IRS charges an additional <strong>10%</strong> on the part you must include in income. It is reported on <strong>Form 5329</strong> and Schedule 2. If your Form 1099-R shows <strong>code 1</strong> in box 7 and no exception applies, you can enter the tax directly on Schedule 2 without Form 5329. If an exception applies but box 7 does not show it, file Form 5329 to claim it.
        </p>

        <h2>Main exceptions</h2>
        <ArticleTable
          head={['Exception', 'IRA', '401(k) or other qualified plan']}
          rows={[
            ['Total and permanent disability, or terminal illness', 'Yes', 'Yes'],
            ['Paid to a beneficiary or estate after the owner\'s death', 'Yes', 'Yes'],
            ['Series of substantially equal periodic payments', 'Yes', 'Yes, after separation from service'],
            ['Unreimbursed medical expenses above 7.5% of AGI', 'Yes', 'Yes'],
            ['Separation from service in or after the year you reach 55', 'No', 'Yes'],
            ['Qualified higher education expenses', 'Yes', 'No'],
            ['First-time home purchase, up to $10,000', 'Yes', 'No'],
            ['Health insurance premiums while unemployed', 'Yes', 'No'],
            ['Qualified birth or adoption, up to $5,000', 'Yes', 'Yes'],
            ['Emergency personal expense, domestic abuse victim, or qualified disaster', 'Yes', 'Yes'],
            ['IRS levy; qualified reservist distribution', 'Yes', 'Yes'],
            ['Payments to an ex-spouse under a QDRO', 'No', 'Yes'],
          ]}
        />
        <p>
          Each exception has its own conditions and dollar limits, explained in Publication 590-B, Publication 575, and the Form 5329 instructions. An exception removes only the 10% additional tax — <strong>the withdrawal can still be taxable income</strong>.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Leo</strong>, age 45, takes $20,000 from his traditional IRA in 2025 to pay off a credit card. All of his past contributions were deducted, so the full amount is taxable, and no exception applies.
        </p>
        <ArticleTable
          head={['Item', 'Amount']}
          rows={[
            ['Added to taxable income for 2025', '$20,000'],
            ['10% additional tax (10% × $20,000), reported on Schedule 2', '$2,000'],
            ['Regular income tax on the $20,000', 'At Leo\'s ordinary income tax rates'],
          ]}
        />
        <p>
          If Leo had instead used the money for qualified higher education expenses, the 10% additional tax might not apply — but the $20,000 would still be taxable income.
        </p>

        <h2>Withholding</h2>
        <ul>
          <li><strong>Employer plans:</strong> if an eligible rollover distribution from a plan is paid to you rather than rolled over directly, the payer generally must withhold <strong>20%</strong> for income tax.</li>
          <li><strong>IRAs:</strong> federal income tax withholding applies unless you elect out. If you elect out, you may need to make estimated tax payments.</li>
          <li>Withholding is a prepayment, not the final tax. The 10% additional tax and your actual tax rate are settled on your return.</li>
        </ul>

        <h2>Required minimum distributions (RMDs)</h2>
        <p>
          RMDs begin with the year you reach your <strong>applicable age</strong>. SECURE 2.0 raised the age, and the 2024 final regulations (T.D. 10001) set it by date of birth:
        </p>
        <ArticleTable
          head={['Date of birth', 'Applicable age', 'Status']}
          rows={[
            ['Before July 1, 1949', '70½', 'Final regulations (earlier law)'],
            ['July 1, 1949, through December 31, 1950', '72', 'Final regulations (earlier law)'],
            ['1951 through 1958', '73', 'Final regulations'],
            ['1959', '73 under proposed regulations', 'The statute describes this group under both age 73 and age 75; proposed regulations (REG-103529-23) would set 73 but are not final'],
            ['January 1, 1960, or later', '75', 'Final regulations'],
          ]}
        />
        <ArticleTable
          head={['Account', 'RMDs while the owner is alive?', 'First RMD deadline']}
          rows={[
            ['Traditional, SEP, and SIMPLE IRAs', 'Yes, from the applicable age, even if you are still working', 'April 1 of the year after you reach the applicable age'],
            ['401(k), 403(b), and other employer plans', 'Yes, but generally not until you retire from that employer, unless you are a 5% owner', 'April 1 of the year after the later of the year you reach the applicable age or the year you retire (5% owners: the applicable-age year)'],
            ['Roth IRA', 'No', 'None while the original owner is alive'],
            ['Designated Roth account in a 401(k) or 403(b)', 'No, according to the IRS FAQs', 'None while the owner is alive'],
            ['Inherited account (traditional or Roth)', 'Beneficiary rules apply instead', 'Depends on the beneficiary and the 10-year rule (see below)'],
          ]}
        />
        <ul>
          <li><strong>Later RMDs:</strong> every RMD after the first is due by <strong>December 31</strong> of its year.</li>
          <li><strong>Several IRAs:</strong> figure the RMD for each IRA separately, but you can withdraw the total from one or more of them. RMDs from 401(k) plans must be taken from each plan separately.</li>
          <li><strong>You are responsible:</strong> the custodian may calculate the amount, but the owner is responsible for taking the correct RMD.</li>
        </ul>
        <p>
          <strong>Example:</strong> if you were born in 1952 and own a traditional IRA, you reach your applicable age of 73 in 2025. Your first RMD is for 2025 and can be taken as late as April 1, 2026. Your 2026 RMD is then due by December 31, 2026 — so if you wait, both are taxable in 2026.
        </p>

        <h2>Missed RMDs</h2>
        <p>
          The amount you should have withdrawn but did not (the shortfall) is subject to a <strong>25%</strong> additional tax, reported on Form 5329 for the tax year that includes the RMD deadline. It drops to <strong>10%</strong> if, during the <strong>correction window</strong>, you take the missed amount and file a return reflecting the tax. The window ends on the earliest of the date the IRS mails a deficiency notice for the tax, the date the tax is assessed, or the last day of the second tax year after the year the tax is imposed. The IRS may waive the tax if the shortfall was due to reasonable error and you are taking reasonable steps to fix it; to ask, file Form 5329 and attach a letter of explanation.
        </p>

        <h2>Inherited accounts (high level)</h2>
        <ul>
          <li><strong>The 10% additional tax</strong> does not apply to distributions to a beneficiary after the owner's death, but traditional account distributions are still taxable.</li>
          <li><strong>10-year rule:</strong> for owners who died after 2019, the SECURE Act generally requires the entire account to be distributed by December 31 of the year containing the 10th anniversary of the death — by the end of 2035 for a 2025 death.</li>
          <li><strong>Exceptions</strong> to the 10-year rule apply to a surviving spouse, a child of the owner who has not reached the age of majority, a disabled or chronically ill person, and a person not more than 10 years younger than the owner.</li>
          <li><strong>During the 10 years:</strong> if the owner died before their required beginning date and the 10-year rule applies, Publication 590-B says no distribution is required before the 10th year. Other situations can require yearly distributions. Inherited accounts are complex; see Publication 590-B or a tax professional.</li>
        </ul>

        <h2>Other things to know</h2>
        <ul>
          <li><strong>Social Security:</strong> taxable withdrawals and RMDs raise the income used to figure how much of your Social Security benefits is taxable. See <a href="/library/individual/social-security-benefits-tax/">the Social Security guide</a>.</li>
          <li><strong>NIIT:</strong> distributions from IRAs and qualified plans are not net investment income, although they can raise MAGI. See <a href="/library/investment/net-investment-income-tax/">the NIIT guide</a>.</li>
          <li><strong>Foreign retirement accounts</strong> follow different rules; see <a href="/library/investment/foreign-pension-retirement-accounts/">Foreign pensions and retirement accounts</a>.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Thinking an exception makes the withdrawal tax-free.</strong> It only removes the 10%.</li>
          <li><strong>Using the age-55 rule for an IRA.</strong> It applies only to employer plans.</li>
          <li><strong>Assuming withholding covers the full tax.</strong></li>
          <li><strong>Assuming everyone starts RMDs at 73.</strong> People born in 1960 or later start at 75.</li>
          <li><strong>Delaying the first RMD</strong> without planning for two taxable RMDs in one year.</li>
          <li><strong>Ignoring a missed RMD</strong> instead of correcting it and filing Form 5329.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>RMD calculations, inherited accounts, substantially equal periodic payments, Roth conversions, rollovers that missed the 60-day window, and plan loans can be complex. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

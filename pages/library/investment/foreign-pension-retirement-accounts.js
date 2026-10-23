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
  id:            '94',
  title:         'Foreign Pensions and Retirement Accounts: What U.S. Taxpayers Must Report',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Advanced',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains U.S. information reporting for interests in foreign pension and retirement arrangements for tax years 2025 and 2026, based on the Instructions for Form 8938, the Instructions for Form 3520 (Rev. December 2025), Rev. Proc. 2020-17, the IRS FBAR page, and Internal Revenue Manual 4.26.16. FinCEN\'s regulations could not be accessed for this review. It does not decide whether any specific Taiwan plan is a financial account, a foreign trust, or a tax-favored foreign retirement trust, and it does not determine the U.S. income tax treatment of contributions, earnings, or distributions',
  persona:       ['U.S. residents with a Taiwan employer pension or labor pension account', 'People who moved to the U.S. with retirement savings abroad', 'U.S. citizens working abroad who join a foreign plan', 'Anyone unsure whether a foreign pension goes on FBAR or Form 8938'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Collect the plan documents and statements for each foreign pension or retirement arrangement. Check Form 8938, FBAR, and Forms 3520 and 3520-A separately — each has its own rules — and get professional advice on how the plan is classified and taxed.',
  sources: [
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — Internal Revenue Manual 4.26.16, Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/irm/part4/irm_04-026-016' },
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i3520.pdf' },
    { label: 'IRS — Rev. Proc. 2020-17 (tax-favored foreign trusts)', url: 'https://www.irs.gov/pub/irs-drop/rp-20-17.pdf' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — United States income tax treaties A to Z', url: 'https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z' },
  ],
}

const FAQS = [
  {
    q: 'Does my Taiwan pension go on Form 8938?',
    a: 'If you must file Form 8938, the instructions say to report your interest in a foreign pension plan or foreign deferred compensation plan (not the plan\'s separate assets). They also say foreign social security, social insurance, or similar government programs are not reportable. Which category a particular Taiwan arrangement falls into depends on the program.',
  },
  {
    q: 'Does my Taiwan pension go on the FBAR?',
    a: 'It depends on the arrangement. The FBAR exception for retirement plans applies to IRAs and U.S. tax-qualified plans; the Internal Revenue Manual says foreign plans are normally reportable if they are foreign financial accounts. Whether a specific Taiwan plan is a foreign financial account in which you have a financial interest is a plan-specific question.',
  },
  {
    q: 'Does Rev. Proc. 2020-17 mean I never need Form 3520 for my foreign pension?',
    a: 'No. It exempts only eligible individuals and only tax-favored foreign retirement trusts that meet all of its conditions under the laws of the plan\'s country. Do not assume a Taiwan plan qualifies. It also does not change FBAR or Form 8938 requirements.',
  },
  {
    q: 'Is my foreign pension taxable in the U.S. before I receive it?',
    a: 'Possibly. As a U.S. resident you are taxed on worldwide income, and U.S. treatment of contributions, earnings, and distributions can differ from the other country\'s. We found no IRS guidance specific to Taiwan plans, and Taiwan is not on the IRS list of income tax treaties, so get professional advice.',
  },
  {
    q: 'What if I already failed to report a foreign pension?',
    a: 'Penalties can apply for missing Form 8938, FBAR, or Form 3520 filings. Rev. Proc. 2020-17 also describes how eligible individuals can request relief from certain Form 3520 penalties already paid. Get professional help before filing late returns. See "I forgot to file an FBAR — what should I do?"',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Thresholds and deadlines for the two reports.',
  },
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'Who must file FinCEN Form 114.',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'The form also used for foreign trusts.',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: 'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist',
    desc:  'Other filing steps for people with ties abroad.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat: 'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc: 'How U.S. IRA and 401(k) withdrawals are taxed.',
  },
]

export default function ForeignPensionRetirementAccountsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Pensions and Retirement Accounts: What U.S. Taxpayers Must Report | AskLinTax',
      description: 'Foreign pensions and U.S. reporting: Form 8938, FBAR, Forms 3520 and 3520-A, Rev. Proc. 2020-17, foreign social security programs, Taiwan labor pension questions, and unresolved income tax issues.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A pension or retirement account in Taiwan or another country can trigger <strong>three separate U.S. reporting questions</strong> — Form 8938, the FBAR, and Forms 3520 and 3520-A — plus a separate question about <strong>U.S. income tax</strong>. Each has its own rules, and the answer can differ by plan. This guide explains what U.S. rules confirm, which questions depend on the specific plan, and where the treatment of Taiwan plans remains unresolved.
        </p>

        <h2>Confirmed rules, plan-specific questions, and open issues</h2>
        <ArticleTable
          head={['Question', 'What official sources confirm', 'What depends on the plan or is unresolved']}
          rows={[
            ['Form 8938', 'Report your interest in a foreign pension or deferred compensation plan; foreign social security and similar government programs are not reportable', 'Whether a Taiwan program is a pension plan or a social security–type program'],
            ['FBAR', 'The retirement plan exception covers IRAs and U.S. tax-qualified plans only; foreign plans are normally reportable (IRM 4.26.16.3.3)', 'Whether a specific plan is a foreign financial account in which you have a financial interest'],
            ['Forms 3520 and 3520-A', 'A foreign retirement arrangement may be a foreign trust; Rev. Proc. 2020-17 exempts certain tax-favored foreign retirement trusts', 'Whether the plan is a foreign trust and whether it meets every Rev. Proc. 2020-17 condition'],
            ['U.S. income tax', 'U.S. citizens and residents report worldwide income', 'How contributions, earnings, and distributions of Taiwan plans are taxed — no IRS guidance specific to Taiwan plans was found'],
          ]}
        />

        <h2>Form 8938</h2>
        <ul>
          <li><strong>What to report:</strong> if you are required to file Form 8938, report your <strong>interest</strong> in a foreign pension plan or foreign deferred compensation plan in Part VI. Do not separately report the assets the plan holds.</li>
          <li><strong>Value:</strong> generally the fair market value of your beneficial interest at year end. If you do not know it and cannot readily find it, the instructions use the value of cash and property distributed to you during the year.</li>
          <li><strong>Not reportable:</strong> U.S. social security, social insurance benefits, or similar programs of a foreign government. The instructions add that this does not include an interest in a foreign pension plan.</li>
          <li><strong>Penalties:</strong> a $10,000 penalty for failing to file a required Form 8938, and a 40% penalty on an underpayment related to an undisclosed asset — the instructions' examples include a foreign pension distribution left off the return.</li>
          <li><strong>Thresholds:</strong> see <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
        </ul>

        <h2>FBAR</h2>
        <p>
          The IRS FBAR page lists an exception for accounts held in an IRA or in a retirement plan of which you are a participant or beneficiary. The Internal Revenue Manual (IRM 4.26.16.3.3) explains that this exception is for participants in <strong>U.S.</strong> tax-qualified retirement plans and IRAs, and cautions: "This exception is for U.S. plans only. Foreign plans, such as a Canadian Registered Retirement Savings Plan (RRSP) and accounts managed by Mexico's Administrators of Retirement Funds (AFORES), are normally reportable on an FBAR."
        </p>
        <p>
          That does not answer whether a particular Taiwan arrangement must be reported. The FBAR applies to foreign <strong>financial accounts</strong> in which you have a financial interest or signature authority. The IRM (4.26.16.2.2) describes reportable financial accounts as bank accounts, securities accounts, and "other financial accounts" such as an insurance or annuity policy with a cash value or a publicly available pooled fund. Its list of accounts that are not reportable refers to accounts of U.S. federal, state, tribal, and territorial governments and their instrumentalities — so do not assume a foreign government–run arrangement is excluded for that reason. Whether a given plan is a financial account, and whether you have a financial interest in it, depends on how it is structured and held. FinCEN's regulations could not be accessed for this guide, so check FinCEN's guidance or get professional advice for your plan.
        </p>

        <h2>Forms 3520 and 3520-A and Rev. Proc. 2020-17</h2>
        <p>
          Some foreign retirement arrangements are foreign trusts for U.S. tax purposes, which can require Form 3520 and Form 3520-A. Rev. Proc. 2020-17 exempts <strong>eligible individuals</strong> — generally U.S. citizens and residents who are compliant with their U.S. filing and income-reporting obligations for the plan — from these forms for a <strong>tax-favored foreign retirement trust</strong> that meets all of these conditions under the laws of its country:
        </p>
        <ul>
          <li>it is generally exempt from income tax or otherwise tax-favored;</li>
          <li>annual information reporting is provided or available to that country's tax authorities;</li>
          <li>only contributions from income earned by performing personal services are permitted;</li>
          <li>contributions are limited — by a percentage of earned income, to $50,000 or less a year, or to $1,000,000 or less over a lifetime;</li>
          <li>withdrawals are conditioned on reaching retirement age, disability, or death, or penalties apply to earlier withdrawals; and</li>
          <li>for employer-maintained plans, the plan meets nondiscrimination requirements.</li>
        </ul>
        <p>
          The Form 3520 instructions (Rev. December 2025) also describe separate exceptions for certain Canadian plans and allow reliance on proposed regulations for certain tax-favored foreign trusts. Rev. Proc. 2020-17 does not change FBAR or Form 8938 obligations. Do not assume a Taiwan plan meets these conditions.
        </p>

        <h2>Foreign social security and employer plans</h2>
        <ul>
          <li><strong>Government social insurance programs:</strong> not reportable on Form 8938, as noted above. Their benefits are also not foreign earned income for the foreign earned income exclusion.</li>
          <li><strong>Employer-sponsored foreign plans:</strong> generally reportable on Form 8938 as an interest in a foreign pension plan if you must file; FBAR and Form 3520 treatment depends on the plan.</li>
        </ul>

        <h2>Taiwan examples: questions to answer</h2>
        <p>
          Readers often ask about the following Taiwan arrangements. This guide does not classify them; these are the questions to resolve for each one with the plan documents and a professional.
        </p>
        <ArticleTable
          head={['Arrangement', 'Questions to answer']}
          rows={[
            ['Labor Pension Act individual account (勞工退休金個人專戶)', 'Is it a pension plan interest for Form 8938? Is it a foreign financial account for the FBAR? Is it a foreign trust, and does it meet Rev. Proc. 2020-17?'],
            ['Labor Insurance old-age benefits (勞保老年給付)', 'Is it a foreign government social insurance program (not reportable on Form 8938) or something else?'],
            ['Employer-sponsored or private retirement plans', 'How is the plan structured, who holds the assets, and does it meet Rev. Proc. 2020-17?'],
          ]}
        />

        <h2>U.S. income tax issues</h2>
        <p>
          As a U.S. citizen or resident, you report worldwide income. The U.S. may tax contributions, investment growth, or distributions of a foreign plan differently from the other country. Taiwan is not on the IRS list of U.S. income tax treaties, and we found no IRS guidance specific to Taiwan plans. Foreign income tax paid on distributions may support a <a href="/library/individual/foreign-tax-credit/">foreign tax credit</a>. Because the answer depends on the plan, get professional advice before you file.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming the IRA exception covers foreign plans</strong> for the FBAR.</li>
          <li><strong>Assuming every foreign plan qualifies</strong> under Rev. Proc. 2020-17.</li>
          <li><strong>Leaving a foreign pension off Form 8938</strong> when you are required to file.</li>
          <li><strong>Treating reporting and taxation as the same question.</strong></li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Limits of this guide</div>
          <p>FinCEN's regulations could not be accessed for this review, and no IRS guidance specific to Taiwan pension plans was found. This guide does not classify any specific plan or determine its income tax treatment. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

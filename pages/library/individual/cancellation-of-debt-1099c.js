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
  id:            '114',
  title:         'Canceled Debt and Form 1099-C: When Forgiven Debt Is Taxable',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal tax treatment of canceled debt for tax years 2025 and 2026, based on Publication 4681 (2025), the Instructions for Form 982 (Rev. December 2021), and the Instructions for Forms 1099-A and 1099-C (Rev. April 2025). The 2026 edition of Publication 4681 was not available for this review. It does not cover business debt workouts, farm debt, or the tax attribute reduction rules in detail',
  persona:       ['People who received a Form 1099-C', 'Homeowners after a foreclosure, short sale, or loan modification', 'Borrowers whose student loans were forgiven', 'People who settled credit card debt'],
  relatedJourney: ['Dealing with a tax problem', 'Money & Benefits'],
  actionRequired: 'Do not ignore a Form 1099-C. Check whether an exception or exclusion applies — especially insolvency — and report any taxable amount; if you exclude it, attach Form 982 to your return.',
  sources: [
    { label: 'IRS — Publication 4681 (2025), Canceled Debts, Foreclosures, Repossessions, and Abandonments', url: 'https://www.irs.gov/publications/p4681' },
    { label: 'IRS — Instructions for Form 982 (Rev. December 2021)', url: 'https://www.irs.gov/pub/irs-pdf/i982.pdf' },
    { label: 'IRS — Instructions for Forms 1099-A and 1099-C (Rev. April 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i1099ac.pdf' },
  ],
}

const FAQS = [
  {
    q: 'I settled a credit card debt for less than I owed. Is the difference taxable?',
    a: 'Generally yes, unless an exception or exclusion applies. Canceled nonbusiness debt is reported on Schedule 1 (Form 1040), line 8c. The most common way out is the insolvency exclusion: you can exclude canceled debt to the extent your total liabilities exceeded the fair market value of your total assets immediately before the cancellation.',
  },
  {
    q: 'I did not receive a Form 1099-C. Do I still have to report the canceled debt?',
    a: 'Generally yes, if it is taxable. A lender must file Form 1099-C when it cancels $600 or more of debt and an identifiable event occurs, but the income can be taxable even without a form. Some nontaxable student loan discharges are not reported on Form 1099-C at all.',
  },
  {
    q: 'My mortgage was forgiven in a short sale. Is it still excludable in 2026?',
    a: 'The qualified principal residence indebtedness exclusion applies to debt discharged before January 1, 2026, or discharged under an arrangement that was entered into and evidenced in writing before January 1, 2026. Without such a written arrangement, a 2026 discharge does not qualify, but insolvency or bankruptcy may still apply.',
  },
  {
    q: 'Are all student loan discharges taxable starting in 2026?',
    a: 'No. Only the broad exclusion for discharges from 2021 through 2025 ends. Separate exclusions continue to be listed in Publication 4681 for cancellation because you worked in certain professions for certain employers, for certain health-profession loan repayment programs, and for discharges because of the student\'s death or total and permanent disability. For a death or disability discharge after 2025, you need an SSN valid for employment, issued by the due date of the return.',
  },
  {
    q: 'What is Form 982?',
    a: 'Form 982 is how you claim most exclusions, such as insolvency, bankruptcy, and qualified principal residence indebtedness. Excluding canceled debt usually requires you to reduce certain tax attributes, such as the basis of your property.',
  },
  {
    q: 'Is a gift or inheritance of debt forgiveness taxable?',
    a: 'Generally no. Publication 4681 says you usually do not have canceled-debt income if a debt is canceled as a gift, bequest, devise, or inheritance.',
  },
]

const RELATED = [
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: 'I sold my house — do I have to pay tax on the profit?',
    desc:  'Gain on a sale is separate from canceled mortgage debt.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'If canceled debt leaves you with a tax bill you cannot pay.',
  },
  {
    href: '/library/individual/education-tax-credits',
    cat:  'Individuals & Families',
    title: 'Education tax credits: AOTC vs. Lifetime Learning Credit',
    desc:  'Other federal education tax rules.',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: 'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
    desc:  'Another information return that is not the final word on tax.',
  },
]

export default function CancellationOfDebtPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Canceled Debt and Form 1099-C: When Forgiven Debt Is Taxable | AskLinTax',
      description: 'When forgiven debt is taxable: Form 1099-C, Schedule 1 line 8c, insolvency, bankruptcy, the principal residence exclusion and its 2026 written-arrangement rule, student loan discharges after 2025, foreclosures, and Form 982.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When a lender cancels, forgives, or settles a debt for less than you owe, the canceled amount is generally <strong>taxable income</strong>. You may receive a <strong>Form 1099-C</strong>. But several <strong>exceptions and exclusions</strong> can make some or all of it nontaxable — most often <strong>insolvency</strong>. Two exclusions narrowed after 2025: the exclusion for forgiven <strong>main-home mortgage debt</strong> and the broad exclusion for <strong>student loan</strong> discharges.
        </p>

        <h2>Form 1099-C and where to report</h2>
        <ul>
          <li><strong>Who sends it:</strong> financial institutions, credit unions, federal agencies, and certain other lenders file Form 1099-C when they cancel $600 or more of debt and an identifiable event has occurred.</li>
          <li><strong>Box 6</strong> shows an identifiable event code explaining why the form was issued.</li>
          <li><strong>Where to report taxable canceled debt:</strong> Schedule 1 (Form 1040), line 8c for nonbusiness debt; Schedule C for a sole proprietorship; Schedule E for rental real estate.</li>
          <li><strong>No form does not mean no income.</strong> Taxable canceled debt must be reported even without a 1099-C.</li>
        </ul>

        <h2>Exceptions: not income at all</h2>
        <ul>
          <li><strong>Gifts, bequests, devises, and inheritances.</strong></li>
          <li><strong>Deductible debt:</strong> for cash-method taxpayers, if paying the debt would have been deductible.</li>
          <li><strong>Price reduced after purchase:</strong> the seller reduces debt you owe for property you bought from them, while you are not insolvent or in bankruptcy; you reduce your basis in the property instead.</li>
          <li><strong>Certain student loans</strong> — see below.</li>
        </ul>

        <h2>Exclusions: claimed on Form 982</h2>
        <ArticleTable
          head={['Exclusion', 'Key rule']}
          rows={[
            ['Bankruptcy', 'Debt canceled in a title 11 bankruptcy case is excluded'],
            ['Insolvency', 'Excluded to the extent your total liabilities exceeded the fair market value of your total assets immediately before the cancellation'],
            ['Qualified principal residence indebtedness', 'Mortgage debt on your main home; up to $750,000 ($375,000 married filing separately); for discharges before 2026 or under a written arrangement entered into before 2026'],
            ['Qualified farm indebtedness', 'Certain farm debt'],
            ['Qualified real property business indebtedness', 'Debt secured by real property used in a trade or business, if you elect it'],
          ]}
        />
        <p>
          Excluded amounts generally reduce tax attributes, such as the basis of property you keep. Bankruptcy applies first; if you were insolvent, you can choose the insolvency exclusion instead of the principal residence exclusion.
        </p>

        <h2>Main-home mortgage debt: the 2026 change</h2>
        <ul>
          <li><strong>What qualifies:</strong> debt to buy, build, or substantially improve your main home, secured by that home, plus a refinance up to the old mortgage balance.</li>
          <li><strong>Timing:</strong> the Form 982 instructions say the exclusion applies to debt <strong>discharged before January 1, 2026</strong>, or discharged under an arrangement <strong>entered into and evidenced in writing before January 1, 2026</strong>.</li>
          <li><strong>Not covered:</strong> cancellation for services performed for the lender, or for any reason not directly related to a decline in the home's value or your financial condition.</li>
          <li><strong>Basis:</strong> if you keep the home, you reduce its basis by the excluded amount.</li>
        </ul>

        <h2>Student loans: each exclusion separately</h2>
        <ArticleTable
          head={['Exclusion', 'Status after 2025']}
          rows={[
            ['Broad exclusion for discharges from 2021 through 2025 (postsecondary education loans, private education loans, and certain others)', 'Ends for discharges after December 31, 2025'],
            ['Cancellation for working for a certain period, in certain professions, for a broad class of employers, on a qualifying loan', 'Listed in Publication 4681 (2025) without an end date'],
            ['Repayment assistance from the National Health Service Corps, state programs under the Public Health Service Act, and certain state health-profession programs', 'Listed in Publication 4681 (2025) without an end date'],
            ['Discharge because of the student\'s death or total and permanent disability', 'Continues; for discharges after 2025, you need an SSN valid for employment issued by the return due date'],
          ]}
        />
        <p>
          The work-requirement exclusion has its own conditions: the loan must come from a qualified lender for attendance at an eligible educational organization, and cancellation for services performed for the school or a tax-exempt lender itself does not qualify. Nontaxable student loan discharges after 2020 are not reported on Form 1099-C.
        </p>

        <h2>Foreclosures, repossessions, and abandonments</h2>
        <ul>
          <li><strong>Recourse debt</strong> (you are personally liable): you may have both a gain or loss on the property and separate canceled-debt income if the debt exceeds the property's value.</li>
          <li><strong>Nonrecourse debt:</strong> the full debt is treated as the amount realized on disposing of the property — a gain or loss, not canceled-debt income.</li>
          <li><strong>Form 1099-A</strong> may report an acquisition or abandonment; a lender that cancels $600 or more in the same year may file only Form 1099-C.</li>
        </ul>

        <h2>Example</h2>
        <p>
          In 2025, Leo's credit card company accepted $4,000 to settle a $10,000 balance and sent him a Form 1099-C for $6,000. Immediately before the settlement, his total liabilities were $50,000 and his total assets were worth $47,000, so he was insolvent by $3,000. He can exclude $3,000 on Form 982 and reports the other $3,000 on Schedule 1, line 8c. The figures are illustrative; Publication 4681 has an insolvency worksheet.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Ignoring a Form 1099-C</strong> — the IRS receives a copy.</li>
          <li><strong>Missing the insolvency exclusion</strong> because you did not add up all assets and liabilities.</li>
          <li><strong>Claiming the principal residence exclusion</strong> for a 2026 discharge without a written arrangement entered into before 2026.</li>
          <li><strong>Assuming every student loan discharge is taxable after 2025</strong>, or that every one is tax-free.</li>
          <li><strong>Forgetting Form 982</strong> or the required basis reduction.</li>
          <li><strong>Confusing a home sale gain</strong> with canceled mortgage debt — they are separate items.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Bankruptcy, business or rental debt, partial insolvency, and attribute reduction can be complex. If a large amount is involved, have a tax professional review your Form 982.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

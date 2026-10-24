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
  id:            '106',
  title:         'Premium Tax Credit and Form 8962: Marketplace Health Insurance in 2025 and 2026',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal premium tax credit for tax years 2025 and 2026, based on the 2025 Instructions for Form 8962, Publication 974, IRS Fact Sheet FS-2025-10, and Rev. Proc. 2025-25. The 2026 Form 8962 and its instructions were still drafts at the time of this review, and Treasury\'s October 2026 regulations on immigrant eligibility and verification are proposed, not final. The text of P.L. 119-21 could not be reviewed directly, so immigration details are limited to what IRS publications state. It does not cover state health subsidies, employer coverage affordability tests in detail, or the policy-allocation rules for divorce and shared policies',
  persona:       ['People with Marketplace (HealthCare.gov or state exchange) coverage', 'Self-employed and gig workers who buy their own insurance', 'Families whose income changed during the year', 'Lawfully present immigrants'],
  relatedJourney: ['Money & Benefits', 'Preparing to file'],
  actionRequired: 'If you or a family member had Marketplace coverage, wait for Form 1095-A, file a return with Form 8962 even if you are not otherwise required to file, and report income changes to the Marketplace during the year — for 2026 there is no cap on repaying excess advance payments.',
  sources: [
    { label: 'IRS — Instructions for Form 8962 (2025)', url: 'https://www.irs.gov/instructions/i8962' },
    { label: 'IRS — Publication 974, Premium Tax Credit (PTC)', url: 'https://www.irs.gov/publications/p974' },
    { label: 'IRS — FS-2025-10, Questions and Answers about the Premium Tax Credit (December 2025)', url: 'https://www.irs.gov/pub/taxpros/fs-2025-10.pdf' },
    { label: 'IRS — Premium Tax Credit (PTC) overview', url: 'https://www.irs.gov/credits-deductions/premium-tax-credit-ptc-overview' },
    { label: 'IRS — One, Big, Beautiful Bill provisions (Premium Tax Credit, sections 71301–71305)', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Rev. Proc. 2025-25 (2026 applicable percentage table)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-25.pdf' },
    { label: 'IRS — Draft 2026 Form 8962 (not for filing)', url: 'https://www.irs.gov/pub/irs-dft/f8962--dft.pdf' },
    { label: 'IRS — IR-2026-121, proposed Premium Tax Credit regulations (October 14, 2026)', url: 'https://www.irs.gov/newsroom/treasury-and-irs-move-to-protect-health-care-benefits-for-eligible-americans' },
  ],
}

const FAQS = [
  {
    q: 'Do I have to file a tax return if I received advance payments?',
    a: 'Yes. If advance payments of the premium tax credit (APTC) were made for you or anyone in your tax family, you must file a federal return and attach Form 8962, even if your income is below the normal filing threshold. If you do not, you may not be able to get APTC in a later year.',
  },
  {
    q: 'Where do I find the numbers for Form 8962?',
    a: 'From Form 1095-A, which the Marketplace sends by early February. It shows the monthly enrollment premium, the premium of the second-lowest-cost silver plan (SLCSP) that applies to you, and the APTC paid. If the SLCSP amount is missing or wrong, the Form 8962 instructions explain how to get the correct figure from the Marketplace.',
  },
  {
    q: 'I bought insurance directly from an insurer, not through the Marketplace. Can I claim the credit?',
    a: 'No. The credit is only for a qualified health plan enrolled in through a Health Insurance Marketplace (HealthCare.gov or a state exchange). You will not receive a Form 1095-A for coverage bought outside the Marketplace.',
  },
  {
    q: 'Can I claim the credit if I am married filing separately?',
    a: 'Generally no. Married people must file jointly to claim it. The exception is for victims of domestic abuse or spousal abandonment who meet the conditions in the Form 8962 instructions; they may claim it on a separate return using the married filing separately status.',
  },
  {
    q: 'Was the enhanced premium tax credit extended for 2026?',
    a: 'Not in the IRS guidance available for this review. FS-2025-10 (December 2025), the IRS PTC overview page (reviewed July 28, 2026), and the draft 2026 Form 8962 all apply the 400% income limit and full repayment of excess APTC for 2026. If Congress changes the law, the final 2026 Form 8962 instructions will reflect it.',
  },
  {
    q: 'What if I cannot pay back excess advance payments?',
    a: 'The repayment is added to your tax and treated like any other balance due. FS-2025-10 points you to the IRS payment options, such as a payment plan. Filing on time still matters, because the failure-to-file penalty is usually larger than the failure-to-pay penalty.',
  },
]

const RELATED = [
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'APTC makes filing mandatory even at low income.',
  },
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'The wider 2025 law behind the 2026 changes.',
  },
  {
    href: '/library/individual/health-savings-account-hsa',
    cat:  'Individuals & Families',
    title: 'Health Savings Accounts (HSA): 2025 and 2026 Limits and the New 2026 Rules',
    desc:  'Some Marketplace plans can pair with an HSA in 2026.',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: 'Filing Status and Head of Household: 2025 and 2026 Rules',
    desc:  'Why married people generally must file jointly to claim the credit.',
  },
]

export default function PremiumTaxCreditPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Premium Tax Credit and Form 8962: Marketplace Health Insurance in 2025 and 2026 | AskLinTax',
      description: 'The premium tax credit explained: Marketplace coverage, Form 1095-A, Form 8962, advance payments, household income, the federal poverty line, repayment caps for 2025, full repayment and the 400% limit for 2026, and immigrant eligibility.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>premium tax credit (PTC)</strong> is a refundable federal credit that helps pay for health insurance bought through a <strong>Health Insurance Marketplace</strong>. Most people take it in advance: the Marketplace sends <strong>advance payments (APTC)</strong> to the insurer each month based on an estimate of your income. After the year ends, you compare that advance with the credit you actually qualify for on <strong>Form 8962</strong>, using <strong>Form 1095-A</strong>. For <strong>2025</strong>, there is no upper income limit and repayment of excess APTC is capped for most people. For <strong>2026</strong>, the credit is not available above <strong>400%</strong> of the federal poverty line and there is <strong>no repayment cap</strong>.
        </p>

        <h2>Who can claim it (2025)</h2>
        <p>The 2025 Instructions for Form 8962 say you can take the credit only if all of these are true:</p>
        <ul>
          <li><strong>Marketplace coverage:</strong> you or a member of your tax family enrolled in a qualified health plan through a Marketplace for at least one month, and the premium was paid by the due date.</li>
          <li><strong>No other coverage available:</strong> the person was not eligible for other minimum essential coverage, such as Medicare, most Medicaid, or affordable employer coverage, for that month.</li>
          <li><strong>Not a dependent:</strong> no one can claim you as a dependent.</li>
          <li><strong>Applicable taxpayer:</strong> household income at least 100% of the federal poverty line (with limited exceptions below 100%), and if married, you file jointly unless the domestic abuse or abandonment exception applies.</li>
          <li><strong>Lawful presence:</strong> no credit is allowed for any period an individual is not lawfully present in the United States.</li>
        </ul>
        <p>
          Below 100% of the poverty line, the 2025 instructions allow the credit in two cases: the Marketplace estimated at enrollment that your income would be at least 100% and APTC was paid, or the enrolled person was lawfully present and not eligible for Medicaid because of immigration status.
        </p>

        <h2>Household income, family size, and the poverty line</h2>
        <ul>
          <li><strong>Tax family size:</strong> you, your spouse if filing jointly, and every dependent you claim.</li>
          <li><strong>Household income:</strong> your modified AGI plus the modified AGI of your spouse and any dependent who is required to file a return.</li>
          <li><strong>Modified AGI:</strong> AGI plus excluded foreign earned income and housing, tax-exempt interest, and Social Security benefits that are not taxable.</li>
          <li><strong>Federal poverty line:</strong> the 2025 Form 8962 uses the table below (48 states and D.C.; Alaska and Hawaii have higher tables).</li>
        </ul>
        <ArticleTable
          head={['Family size', '1', '2', '3', '4', '5', '6', '7', '8']}
          rows={[
            ['Poverty line, 2025 Form 8962', '$15,060', '$20,440', '$25,820', '$31,200', '$36,580', '$41,960', '$47,340', '$52,720'],
          ]}
        />
        <p>
          For each person over 8, add $5,380. Your household income divided by this amount gives the percentage on Form 8962, line 5, which sets your expected contribution.
        </p>

        <h2>How Form 8962 works</h2>
        <ul>
          <li><strong>Step 1 — contribution:</strong> your applicable figure (from the table in the instructions) times household income is the amount you are expected to pay toward the benchmark plan.</li>
          <li><strong>Step 2 — credit:</strong> the credit is the smaller of your actual premium or the SLCSP premium minus your contribution, figured annually or month by month.</li>
          <li><strong>Step 3 — reconcile:</strong> if the credit is more than the APTC, you get the difference as a net credit. If the APTC is more, you have excess APTC to repay.</li>
        </ul>

        <h2>2025 versus 2026</h2>
        <ArticleTable
          head={['Rule', '2025 (final)', '2026']}
          rows={[
            ['Income above 400% of the poverty line', 'Can qualify; contribution capped at 8.5% of income', 'Not eligible (FS-2025-10; draft 2026 Form 8962, line 6)'],
            ['Lowest contribution', '0% of income up to 150% of the poverty line', '2.10% of income below 133% (Rev. Proc. 2025-25)'],
            ['Highest contribution', '8.5% of income', '9.96% of income, 300% to 400% (Rev. Proc. 2025-25)'],
            ['Repayment of excess APTC', 'Capped below 400% (table below)', 'No cap — repay the full excess (FS-2025-10)'],
            ['Poverty-line table and applicable-figure table', 'Published in the 2025 instructions', 'Not yet published; the 2026 instructions were not final'],
          ]}
        />
        <p>
          Two separate changes explain the 2026 column. The temporary expansion that removed the 400% limit applied only for 2021 through 2025 and was not extended in the IRS guidance available for this review (IRS PTC overview). Separately, the 2025 tax law removed the repayment cap for tax years beginning after December 31, 2025 (IRS One, Big, Beautiful Bill provisions page; FS-2025-10). The draft 2026 Form 8962 asks on line 6 whether you entered 401% on line 5 — if yes, you are not eligible — and marks lines 28–29, which applied the repayment limitation on the 2025 form, as "Reserved for future use." Those are draft-form details and could change before the final form.
        </p>

        <h2>Repaying excess advance payments</h2>
        <ArticleTable
          head={['2025 household income (% of poverty line)', 'Single', 'Any other filing status']}
          rows={[
            ['Less than 200%', '$375', '$750'],
            ['At least 200% but less than 300%', '$975', '$1,950'],
            ['At least 300% but less than 400%', '$1,625', '$3,250'],
            ['400% or more', 'No cap', 'No cap'],
          ]}
        />
        <p>
          These caps apply to 2025 only (Table 5, 2025 Form 8962 instructions). For 2026 and later years, FS-2025-10 says you must repay the full amount by which APTC exceeds your credit. The repayment is added to your tax on Schedule 2.
        </p>

        <h2>Immigrants and 2026–2027 eligibility</h2>
        <ul>
          <li><strong>2025:</strong> lawfully present individuals can qualify, including those under 100% of the poverty line who cannot get Medicaid because of immigration status.</li>
          <li><strong>2026:</strong> the final 2026 Form 8962 instructions were not available for this review, and this guide does not state the 2026 rule for lawfully present individuals below 100% of the poverty line. Check the final 2026 instructions before relying on the 2025 rule.</li>
          <li><strong>2027 and later (proposed):</strong> IRS news release IR-2026-121 (October 14, 2026) says the proposed rules would, beginning in 2027, restrict the credit to U.S. citizens, U.S. nationals, and certain lawfully present noncitizens, and add verification requirements for APTC.</li>
        </ul>
        <p>
          The IRS describes these proposed rules as implementing the 2025 tax law (sections 71301–71305 cover the premium tax credit). The statute text itself could not be reviewed for this guide, so it does not give the statute's exact effective dates or list which immigration categories will qualify. The October 2026 regulations are <strong>proposed, not final</strong>, and could change after public comments.
        </p>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Maya (2025)', 'Ken (2026)']}
          rows={[
            ['Filing status and family size', 'Single, 1', 'Single, 1'],
            ['Household income', '$45,180 (300% of $15,060)', 'More than 400% of the 2026 poverty line'],
            ['Applicable figure / contribution', '0.0600 × $45,180 = $2,711', 'Not eligible'],
            ['Annual SLCSP premium (Form 1095-A)', '$7,200', '—'],
            ['Annual enrollment premium', '$6,000', '—'],
            ['Premium tax credit', 'Smaller of $6,000 or $7,200 − $2,711 = $4,489', '$0'],
            ['APTC paid during the year', '$5,000', '$3,000'],
            ['Excess APTC / amount repaid', '$511 (under the $1,625 cap)', '$3,000 (no cap for 2026)'],
          ]}
        />
        <p>
          Maya's figures use the 2025 poverty line and Table 2 of the 2025 instructions. Ken's example uses no 2026 poverty-line dollar figures because the 2026 table had not been published at the time of this review; the point is that above 400% the whole $3,000 is repaid. Both examples are illustrations and assume a full year of coverage, no other coverage available, and no shared policies.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Not filing</strong> because income is low — APTC requires a return with Form 8962.</li>
          <li><strong>Filing before Form 1095-A arrives</strong>, or using the wrong SLCSP amount.</li>
          <li><strong>Leaving out income</strong> that counts in modified AGI, such as nontaxable Social Security or a dependent's required-to-file income.</li>
          <li><strong>Not reporting raises or new jobs</strong> to the Marketplace during the year — for 2026 every dollar of excess APTC must be repaid.</li>
          <li><strong>Filing separately when married</strong> without meeting the domestic abuse or abandonment exception.</li>
          <li><strong>Assuming 2025 rules carry into 2026</strong>, especially the repayment caps and the lack of an income ceiling.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Shared policies, divorce or marriage during the year, self-employed health insurance deductions, employer coverage offers, and mixed-status immigrant families can change the calculation. State subsidies are separate and not covered here.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

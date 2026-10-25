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
  id:            '113',
  title:         'Divorce and Taxes: Alimony, Child Support, Property, and Retirement Accounts',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal income tax rules for divorced and separated people, based on Publication 504 (2025), Divorced or Separated Individuals. It does not give legal advice on state family law, custody, or how property is divided, and it summarizes community property rules only briefly; see Publication 555 for those',
  persona:       ['People going through a divorce or separation', 'Parents sharing custody', 'Anyone paying or receiving alimony', 'Spouses dividing retirement accounts or a home'],
  relatedJourney: ['Filing with dependents', 'Preparing to file'],
  actionRequired: 'Check the date your divorce or separation instrument was executed or modified, decide who is the custodial parent for each child, and make sure any retirement account division uses a QDRO or a transfer incident to the divorce.',
  sources: [
    { label: 'IRS — Publication 504 (2025), Divorced or Separated Individuals', url: 'https://www.irs.gov/publications/p504' },
    { label: 'IRS — Publication 501 (2025), Dependents, Standard Deduction, and Filing Information', url: 'https://www.irs.gov/publications/p501' },
    { label: 'IRS — Form 8332, Release/Revocation of Release of Claim to Exemption for Child by Custodial Parent', url: 'https://www.irs.gov/forms-pubs/about-form-8332' },
    { label: 'IRS — Publication 555, Community Property', url: 'https://www.irs.gov/publications/p555' },
  ],
}

const FAQS = [
  {
    q: 'Is alimony I receive taxable?',
    a: 'It depends on when your divorce or separation instrument was executed. Under an instrument executed after 2018, alimony is not taxable to you and not deductible by the payer. Under an instrument executed before 2019, it is generally taxable to you and deductible by the payer — unless the instrument was modified after 2018 and the modification expressly says the new rules apply.',
  },
  {
    q: 'Is child support taxable or deductible?',
    a: 'No. A payment specifically designated as child support in the divorce or separation instrument is not alimony. It is not deductible by the payer and not taxable to the recipient. If the payer pays less than the total required for both, the payments apply first to child support and then to alimony.',
  },
  {
    q: 'Who claims the children?',
    a: 'Generally the custodial parent — the parent the child lived with for the greater number of nights during the year. The custodial parent can sign Form 8332 (or a similar statement) to let the noncustodial parent claim the child tax credit, additional child tax credit, and credit for other dependents. Form 8332 does not transfer head of household status, the earned income credit, or the dependent care credit.',
  },
  {
    q: 'My divorce was final on December 30. Can we file jointly for that year?',
    a: 'No. If you are divorced under a final decree by the last day of the year, you are considered unmarried for the whole year. You file as single, or as head of household if you qualify.',
  },
  {
    q: 'Do I owe tax when my ex-spouse transfers the house to me?',
    a: 'Generally no. No gain or loss is recognized on a transfer between spouses, or between former spouses if the transfer is incident to the divorce. You take over the transferor\'s basis, which matters when you sell later. The rule does not apply if your spouse or former spouse is a nonresident alien.',
  },
  {
    q: 'Can I still deduct IRA contributions for my former spouse?',
    a: 'No. If you have a final decree of divorce or separate maintenance by the end of your tax year, you cannot deduct contributions to your former spouse\'s traditional IRA.',
  },
]

const RELATED = [
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: 'Filing Status and Head of Household: 2025 and 2026 Rules',
    desc:  'Filing status after a divorce or separation.',
  },
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'Rules for the parent who claims the child.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'Withdrawals after a retirement account is divided.',
  },
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: 'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857',
    desc:  'Relief from a former spouse\'s tax debts on a joint return.',
  },
]

export default function DivorceAlimonyTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Divorce and Taxes: Alimony, Child Support, Property, and Retirement Accounts | AskLinTax',
      description: 'How divorce affects your federal taxes: alimony under pre-2019 and post-2018 agreements, child support, filing status, which parent claims the children and Form 8332, property transfers, QDROs, and IRAs.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Divorce changes your taxes in several ways. <strong>Alimony</strong> is treated differently depending on whether your divorce or separation instrument was executed <strong>before 2019 or after 2018</strong>. <strong>Child support</strong> is never deductible or taxable. Your <strong>filing status</strong> depends on whether you are divorced by December 31. The <strong>custodial parent</strong> generally claims the children. Property transferred between spouses because of the divorce is generally <strong>not taxable</strong>, and retirement accounts can be divided without tax if it is done correctly.
        </p>

        <h2>Federal tax rules vs. state family law</h2>
        <p>
          State law decides whether you are married, divorced, or legally separated, and how property and support are divided. Federal tax law then decides how those payments and transfers are taxed. This guide covers only the federal tax side.
        </p>

        <h2>Alimony: the date of your instrument matters</h2>
        <ArticleTable
          head={['Divorce or separation instrument', 'Payer', 'Recipient']}
          rows={[
            ['Executed after 2018', 'Not deductible', 'Not taxable'],
            ['Executed before 2019 and not modified (or modified without adopting the new rules)', 'Generally deductible', 'Generally taxable'],
            ['Executed before 2019 and modified after 2018, with the modification expressly saying the new rules apply', 'Not deductible', 'Not taxable'],
          ]}
        />
        <p>
          Alimony is a payment to or for a spouse or former spouse under a divorce or separation instrument; voluntary payments outside an instrument are not alimony. Simply modifying a pre-2019 instrument — for example, increasing the payment — does not switch it to the new rules unless the modification expressly says so. Under a pre-2019 instrument, taxable alimony received also counts as compensation for IRA contribution purposes.
        </p>

        <h2>Child support</h2>
        <ul>
          <li>A payment specifically designated as child support, or treated as designated, is not alimony.</li>
          <li>It is not deductible by the payer and not included in the recipient's income.</li>
          <li>If both are required and the payer pays less than the total, the payments apply first to child support.</li>
        </ul>

        <h2>Filing status after divorce or separation</h2>
        <ul>
          <li><strong>Divorced by December 31:</strong> considered unmarried for the whole year — file as single or head of household.</li>
          <li><strong>Still married on December 31:</strong> married filing jointly or married filing separately, unless you meet all the "considered unmarried" tests for head of household.</li>
          <li><strong>Legally separated</strong> under a decree of separate maintenance by year end: treated as unmarried.</li>
        </ul>

        <h2>Who claims the children</h2>
        <ul>
          <li><strong>Custodial parent:</strong> the parent the child lived with for the greater number of nights during the year.</li>
          <li><strong>Form 8332:</strong> the custodial parent can release the claim to the noncustodial parent, for 1 year, specified years, or all future years. The noncustodial parent attaches it each year. This lets the noncustodial parent claim the child tax credit, additional child tax credit, and credit for other dependents.</li>
          <li><strong>Not transferable:</strong> head of household status, the earned income credit, and the dependent care credit stay with the custodial parent.</li>
          <li><strong>Revoking:</strong> the custodial parent can revoke a release using Part III of Form 8332.</li>
        </ul>

        <h2>Property, the home, and retirement accounts</h2>
        <ArticleTable
          head={['Transfer', 'Federal tax treatment']}
          rows={[
            ['Property to a spouse, or to a former spouse incident to the divorce', 'No gain or loss recognized; the recipient takes the transferor\'s basis. Does not apply if the recipient is a nonresident alien.'],
            ['IRA transferred under a divorce decree or written instrument incident to it', 'Not a taxable transfer; it becomes the recipient\'s IRA from the date of transfer'],
            ['Employer plan benefits paid to a spouse or former spouse under a QDRO', 'Taxable to the recipient spouse or former spouse, who may be able to roll them over tax-free'],
            ['QDRO benefits paid to a child or other dependent', 'Treated as paid to the plan participant'],
          ]}
        />
        <p>
          A <strong>qualified domestic relations order (QDRO)</strong> is a court order under state domestic relations law that gives a spouse, former spouse, child, or other dependent the right to receive benefits from a qualified retirement plan. Withdrawing from an IRA instead of transferring it under the decree can trigger tax and penalties.
        </p>

        <h2>Community property states</h2>
        <p>
          If you lived in a community property state — Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, or Wisconsin — special rules can apply to how income is split between spouses before the divorce. See Publication 555.
        </p>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Kim', 'Jordan', 'Priya and Sam']}
          rows={[
            ['Situation', 'Divorce decree executed in 2016; pays $2,000 a month in alimony; decree modified in 2025 to increase payments, with no statement about the new rules', 'Divorce decree executed in 2020; receives $1,500 a month in alimony and $800 in child support', 'Divorced in 2025; their son lived with Priya 220 nights and with Sam 145 nights'],
            ['Result', 'Kim can still deduct the alimony; the recipient reports it as income', 'Nothing is taxable to Jordan or deductible by the payer', 'Priya is the custodial parent. She can sign Form 8332 so Sam claims the child tax credit, but Priya keeps head of household status and the earned income credit if she qualifies'],
          ]}
        />

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Deducting alimony</strong> under an agreement executed after 2018.</li>
          <li><strong>Treating child support as alimony.</strong></li>
          <li><strong>Both parents claiming the same child</strong>, or the noncustodial parent claiming head of household.</li>
          <li><strong>Forgetting to attach Form 8332</strong> each year.</li>
          <li><strong>Cashing out a spouse's share of a retirement account</strong> instead of using a QDRO or a direct transfer.</li>
          <li><strong>Filing jointly</strong> after the divorce became final.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get professional help</div>
          <p>Divorce agreements involve both state family law and federal tax law. Have a family law attorney and a tax professional review support terms, property division, and retirement account orders before you sign.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

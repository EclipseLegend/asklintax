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
  id:            '51',
  title:         'I can\'t pay my tax bill — what are my options?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who owe a federal income tax balance they cannot pay in full. Eligibility limits and fees are the IRS figures for online payment plans at the time of review and can change; business balances, payroll taxes, and state taxes are outside this guide',
  persona:       ['Taxpayers who owe more than they can pay by the deadline', 'Freelancers with a larger-than-expected balance due', 'People who received an IRS balance-due notice', 'Anyone deciding between a payment plan and other options'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'File your return on time even if you cannot pay in full, pay as much as you can, and then choose a payment option. Check the IRS payment-plan pages for current eligibility and fees before you apply.',
  sources: [
    { label: 'IRS — Payment plans; installment agreements', url: 'https://www.irs.gov/payments/payment-plans-installment-agreements' },
    { label: 'IRS — If you\'ve filed but haven\'t paid', url: 'https://www.irs.gov/newsroom/if-youve-filed-but-havent-paid' },
    { label: 'IRS — Topic no. 202, Tax payment options', url: 'https://www.irs.gov/taxtopics/tc202' },
    { label: 'IRS — Online payment agreement application', url: 'https://www.irs.gov/payments/online-payment-agreement-application' },
    { label: 'IRS — Offer in compromise', url: 'https://www.irs.gov/payments/offer-in-compromise' },
    { label: 'IRS — Temporarily delay the collection process', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/temporarily-delay-the-collection-process' },
  ],
}

const FAQS = [
  {
    q: 'Should I wait to file until I have the money?',
    a: 'No. Filing and paying are separate obligations. The IRS advises filing on time even if you cannot pay in full, because the penalty for not filing is generally much larger than the penalty for not paying. If your return is already late, see "I missed the tax deadline — what happens now?"',
  },
  {
    q: 'Does a payment plan stop interest and penalties?',
    a: 'No. Interest and applicable penalties generally continue to accrue on the unpaid balance until it is paid in full, even while you are on a payment plan. Paying more, sooner, reduces what accrues.',
  },
  {
    q: 'Do I qualify for an online payment plan?',
    a: 'Under the IRS\'s current online guidance for individuals, a short-term plan is generally available if you owe less than $100,000 in combined tax, penalties, and interest and can pay within 180 days. A long-term online installment agreement is generally available if you owe $50,000 or less in combined tax, penalties, and interest and have filed all required returns. Not everyone qualifies, and the limits can change — check the IRS payment-plan page.',
  },
  {
    q: 'Can the IRS just reduce what I owe?',
    a: 'An Offer in Compromise lets some taxpayers settle for less than the full amount, but it is not automatic and many applicants do not qualify. The IRS looks at your ability to pay, income, expenses, and assets. Review the IRS requirements carefully before relying on it.',
  },
  {
    q: 'Are there fees for a payment plan?',
    a: 'Setup fees depend on the type of plan, how you apply, and how you pay, and the IRS updates them. Check the current fee table on the IRS payment-plan page rather than relying on a fixed number.',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: 'I missed the tax deadline — what happens now?',
    desc:  'If your return itself has not been filed yet, start here.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read a balance-due notice and decide your next step.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Avoid a large balance next year by paying during the year.',
  },
]

export default function CantPayTaxBillPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Can\'t Pay Your Tax Bill? IRS Payment Plans and Options | AskLinTax',
      description: 'Owe the IRS more than you can pay? Why you should still file on time, how short-term and long-term payment plans work, and when other IRS options may apply.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you cannot pay your federal tax bill in full, you still have options — but the order matters. <strong>File your return on time anyway</strong>, <strong>pay as much as you can</strong>, and then set up a way to pay the rest. The IRS offers payment plans, and in some situations other collection alternatives. Interest and penalties generally keep running on whatever remains unpaid, so the sooner the balance goes down, the less it grows.
        </p>
        <p>
          This guide is for a balance you already know about — usually on a return you have filed. If you have not filed the return itself, read <a href="/library/irs/missed-tax-deadline/">I missed the tax deadline — what happens now?</a> first.
        </p>

        <h2>Filing and paying are two separate obligations</h2>
        <p>
          Not being able to pay is not a reason to skip filing. The two have separate penalties: one for filing late and one for paying late. The IRS generally recommends filing on time even if you cannot pay, because the failure-to-file penalty is usually much larger than the failure-to-pay penalty. Filing on time keeps the problem limited to the unpaid balance.
        </p>

        <h2>Step 1: pay what you can now</h2>
        <p>
          Any amount you pay by the due date reduces the balance that interest and penalties are figured on. Even a partial payment helps. You can pay through IRS online payment options, such as a direct payment from your bank account.
        </p>

        <h2>Step 2: choose a payment option for the rest</h2>
        <ArticleTable
          head={['Option', 'Who it may fit', 'What to know']}
          rows={[
            ['Pay in full', 'You can pay the whole balance now', 'Stops further interest and penalties on that balance'],
            ['Short-term payment plan', 'Individuals who owe less than $100,000 in combined tax, penalties, and interest (current IRS online guidance)', 'Pay the balance within 180 days; interest and penalties continue until paid'],
            ['Long-term installment agreement', 'Individuals who owe $50,000 or less in combined tax, penalties, and interest and have filed all required returns (current IRS online guidance)', 'Monthly payments; setup fees may apply; interest and penalties continue until paid'],
            ['Other collection alternatives', 'People who cannot pay through a plan', 'For example, an Offer in Compromise or a temporary delay of collection — each has its own requirements'],
          ]}
        />
        <p>
          The dollar limits above are the IRS's current eligibility guidance for applying <strong>online</strong>. If you owe more, or do not qualify online, you may still be able to request a plan by other means — see the IRS payment-plan page.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Fees and limits change</div>
          <p>Payment-plan setup fees depend on the plan type, how you apply, and how you pay, and the IRS updates them. Check the IRS payment-plan page for the current figures before you apply.</p>
        </div>

        <h2>Other options, in appropriate cases</h2>
        <ul>
          <li><strong>Offer in Compromise.</strong> An agreement to settle a tax debt for less than the full amount. It is not automatic: the IRS considers your ability to pay, income, expenses, and asset equity, and many applications are not accepted.</li>
          <li><strong>Temporary delay of collection.</strong> If paying would cause financial hardship, the IRS may temporarily delay collection. The debt is not forgiven, and penalties and interest continue to accrue.</li>
        </ul>

        <h2>What a payment plan does not do</h2>
        <ul>
          <li>It does <strong>not</strong> stop interest. Interest and applicable penalties generally continue until the balance is paid in full.</li>
          <li>It does <strong>not</strong> mean everyone qualifies. Eligibility depends on the amount owed, your filing history, and other conditions.</li>
          <li>It does <strong>not</strong> replace filing. Future returns still need to be filed and paid on time.</li>
        </ul>

        <h2>Example</h2>
        <p>
          Dana files her return on time in April and owes $6,000 she cannot pay at once. She pays $1,500 with the return and applies online for a payment plan for the remaining $4,500. Because her balance is under the online limits, she may be able to set up a plan online if she meets the other conditions; interest and the failure-to-pay penalty continue on the unpaid part until it is paid off, so she pays it down as fast as her budget allows.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Prevent next year's bill</div>
          <p>If you owe because no tax was withheld from your income — for example, freelance or 1099 work — estimated tax payments during the year can keep the balance from building up. See <a href="/library/small-business/quarterly-taxes/">Quarterly estimated taxes</a>.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who owe a federal income tax balance they cannot pay in full. Eligibility limits, setup fees, and the Offer in Compromise fee are the figures on the IRS payment-plan, online payment agreement, and Offer in Compromise pages reviewed in October 2026; the IRS can change them. Business balances, payroll taxes, and state taxes are outside this guide',
  persona:       ['Taxpayers who owe more than they can pay by the deadline', 'Freelancers with a larger-than-expected balance due', 'People who received an IRS balance-due notice', 'Anyone deciding between a payment plan and other options'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'File your return on time even if you cannot pay in full, pay as much as you can, and then apply for a payment plan — online if you qualify, because online setup fees are lower. Choose direct debit for a long-term plan to get the lowest fee.',
  sources: [
    { label: 'IRS — Payment plans; installment agreements', url: 'https://www.irs.gov/payments/payment-plans-installment-agreements' },
    { label: 'IRS — If you\'ve filed but haven\'t paid', url: 'https://www.irs.gov/newsroom/if-youve-filed-but-havent-paid' },
    { label: 'IRS — Topic no. 202, Tax payment options', url: 'https://www.irs.gov/taxtopics/tc202' },
    { label: 'IRS — Online payment agreement application', url: 'https://www.irs.gov/payments/online-payment-agreement-application' },
    { label: 'IRS — Offer in compromise', url: 'https://www.irs.gov/payments/offer-in-compromise' },
    { label: 'IRS — Temporarily delay the collection process', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/temporarily-delay-the-collection-process' },
    { label: 'IRS — Failure to pay penalty', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
  ],
}

const FAQS = [
  {
    q: 'Should I wait to file until I have the money?',
    a: 'No. Filing and paying are separate obligations. The IRS advises filing on time even if you cannot pay in full, because the penalty for not filing is generally much larger than the penalty for not paying. If your return is already late, see "I missed the tax deadline — what happens now?"',
  },
  {
    q: 'Does a payment plan stop interest and penalties?',
    a: 'No. Interest and the failure-to-pay penalty continue on the unpaid balance until it is paid in full. The penalty rate does drop: if you filed on time and have an approved payment plan, the IRS failure-to-pay page says the penalty is reduced from 0.5% to 0.25% per month while the plan is in effect.',
  },
  {
    q: 'Do I qualify for an online payment plan?',
    a: 'The IRS online payment agreement page says you may qualify to apply online for a short-term plan (180 days or less) if you owe less than $100,000 in combined tax, penalties, and interest, and for a long-term plan if you owe $50,000 or less and have filed all required returns. If you owe more or cannot apply online, you can still request a plan by phone, by mail with Form 9465, or in person.',
  },
  {
    q: 'Can the IRS just reduce what I owe?',
    a: 'An Offer in Compromise lets some taxpayers settle for less than the full amount, but the IRS generally will not accept one if you can pay in full through a payment plan or your asset equity. Each application requires a $205 fee and a first payment unless you meet the low-income qualifications. Use the IRS Pre-Qualifier tool before applying.',
  },
  {
    q: 'Are there fees for a payment plan?',
    a: 'A short-term plan has no setup fee. A long-term plan costs $29 online or $107 by phone, mail, or in person if you pay by direct debit, and $69 online or $178 otherwise. Low-income taxpayers pay no fee for a direct debit plan and $43 otherwise, which may be reimbursed. These are the IRS figures at the time of review.',
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
  {
    href: '/library/irs/irs-penalty-relief',
    cat: 'IRS & Tax Issues',
    title: 'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
    desc: 'Relief from late filing and payment penalties.',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS Power of Attorney: Form 2848 vs. Form 8821',
    desc:  'Authorize a representative or share your IRS information.',
  },
  {
    href: '/library/individual/cancellation-of-debt-1099c',
    cat:  'Individuals & Families',
    title: 'Canceled Debt and Form 1099-C: When Forgiven Debt Is Taxable',
    desc:  'When forgiven debt becomes taxable income.',
  },
]

export default function CantPayTaxBillPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Can\'t Pay Your Tax Bill? IRS Payment Plans and Options | AskLinTax',
      description: 'Owe the IRS more than you can pay? Why you should still file on time, IRS payment plan eligibility and setup fees, the reduced failure-to-pay penalty during a plan, the Offer in Compromise, and Currently Not Collectible status.',
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
          head={['Option', 'Online eligibility (individuals)', 'What to know']}
          rows={[
            ['Pay in full', 'Anyone', 'No setup fee; stops further interest and penalties on that balance'],
            ['Short-term payment plan', 'Owe less than $100,000 in combined tax, penalties, and interest', 'Pay within 180 days or less; no setup fee; interest and penalties continue until paid'],
            ['Long-term payment plan (installment agreement)', 'Owe $50,000 or less in combined tax, penalties, and interest and have filed all required returns', 'Monthly payments; setup fee (table below); interest and penalties continue until paid'],
            ['Other collection alternatives', 'People who cannot pay through a plan', 'An Offer in Compromise or Currently Not Collectible status — each has its own requirements'],
          ]}
        />
        <p>
          These are the limits for applying <strong>online</strong>, from the IRS online payment agreement page. If you owe more, or cannot apply online, you can still request a plan by phone, by mail with Form 9465, or in person. A representative with a power of attorney can also apply for you.
        </p>

        <h2>Setup fees</h2>
        <ArticleTable
          head={['Plan', 'Apply online', 'Apply by phone, mail, or in person', 'Low-income taxpayers']}
          rows={[
            ['Short-term plan (180 days or less)', '$0', '$0', '$0'],
            ['Long-term plan paid by direct debit', '$29', '$107', 'Fee waived'],
            ['Long-term plan paid another way', '$69', '$178', '$43 (may be reimbursed)'],
            ['Revise a plan or reinstate after default', '$6', '$89', '$6 online or $43 otherwise (may be reimbursed)'],
          ]}
        />
        <p>
          The fee is added to your balance if the plan is approved. Changes to an existing direct debit plan have no fee. Card payments carry processor fees. These figures are from the IRS payment-plan page reviewed in October 2026; check it before you apply, because the IRS can change them.
        </p>

        <h2>Penalties and interest while you pay</h2>
        <ul>
          <li><strong>Failure-to-pay penalty:</strong> 0.5% of the unpaid tax for each month or part of a month it remains unpaid, up to 25%.</li>
          <li><strong>Reduced rate during a plan:</strong> if you filed on time and have an approved payment plan, the rate drops to 0.25% per month while the plan is in effect.</li>
          <li><strong>Higher rate after a levy notice:</strong> if you do not pay within 10 days after an IRS notice of intent to levy, the rate rises to 1% per month.</li>
          <li><strong>Interest:</strong> charged on unpaid tax and penalties until the balance is paid in full.</li>
          <li><strong>Collection while a request is pending:</strong> the IRS payment-plan page says the IRS is generally prohibited from levying while a plan request is pending, with certain exceptions, and the time it has to collect is suspended or extended.</li>
        </ul>

        <h2>Other options, in appropriate cases</h2>
        <ul>
          <li><strong>Offer in Compromise.</strong> An agreement to settle a tax debt for less than the full amount. The IRS considers your income, expenses, and asset equity, and generally will not accept an offer if you can pay in full through a payment plan or equity in assets. You must have filed all required returns, made required estimated payments, and not be in an open bankruptcy. Each application requires a $205 fee and a first payment (20% of the offer for a lump-sum offer) unless you meet the low-income qualifications.</li>
          <li><strong>Currently Not Collectible status.</strong> If you cannot pay because of financial hardship, the IRS may temporarily suspend most collection. You still owe the full amount, penalties and interest continue, the IRS may still file a Notice of Federal Tax Lien, and it will apply future refunds to the debt. You may need to provide a collection information statement such as Form 433-F or Form 433-A.</li>
        </ul>

        <h2>What a payment plan does not do</h2>
        <ul>
          <li>It does <strong>not</strong> stop interest. Interest and the failure-to-pay penalty continue until the balance is paid in full, though the penalty rate is lower during an approved plan.</li>
          <li>It does <strong>not</strong> mean everyone qualifies. Eligibility depends on the amount owed, your filing history, and other conditions.</li>
          <li>It does <strong>not</strong> replace filing. Future returns still need to be filed and paid on time; missed payments can put the plan in default.</li>
        </ul>

        <h2>Example</h2>
        <p>
          Dana files her return on time in April and owes $6,000 she cannot pay at once. She pays $1,500 with the return and applies online for a long-term plan for the remaining $4,500, with direct debit payments. She qualifies online because she owes less than $50,000 and has filed all her returns, so her setup fee is $29. Because she filed on time and her plan is approved, the failure-to-pay penalty on her unpaid balance is 0.25% per month instead of 0.5% while the plan is in effect; interest still accrues, so she pays it down as fast as her budget allows.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Prevent next year's bill</div>
          <p>If you owe because no tax was withheld from your income — for example, freelance or 1099 work — estimated tax payments during the year can keep the balance from building up. See <a href="/library/small-business/quarterly-taxes/">Quarterly estimated taxes</a>.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

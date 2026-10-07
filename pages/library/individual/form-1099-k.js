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
  id:            '55',
  title:         'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals who received Form 1099-K from a payment app or online marketplace. It explains the reporting threshold and what the form means; it is not a complete guide to reporting business income or selling investments',
  persona:       ['People who sold used items online', 'Side-gig sellers and service providers paid through apps', 'Anyone who received a 1099-K they did not expect', 'Friends and family who split costs through payment apps'],
  relatedJourney: ['Side income', 'First-time filer'],
  actionRequired: 'Do not assume the full 1099-K amount is taxable — or that money without a 1099-K is tax-free. Sort the payments into business or service income, personal items sold at a loss, personal items sold at a gain, and gifts or shared-cost reimbursements, then report each correctly.',
  sources: [
    { label: 'IRS — Understanding your Form 1099-K', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' },
    { label: 'IRS — Form 1099-K FAQs: General information', url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-general-information' },
    { label: 'IRS — Form 1099-K FAQs: What to do if you receive a Form 1099-K', url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-what-to-do-if-you-receive-a-form-1099-k' },
    { label: 'IRS — IRS issues FAQs on Form 1099-K threshold under the One, Big, Beautiful Bill; dollar limit reverts to $20,000', url: 'https://www.irs.gov/newsroom/irs-issues-faqs-on-form-1099-k-threshold-under-the-one-big-beautiful-bill-dollar-limit-reverts-to-20000' },
    { label: 'IRS — Instructions for Form 8949', url: 'https://www.irs.gov/instructions/i8949' },
  ],
}

const FAQS = [
  {
    q: 'When does a payment app have to send me a 1099-K?',
    a: 'Under current IRS guidance, a payment app or online marketplace generally must send Form 1099-K when your payments for goods or services exceed $20,000 and there are more than 200 transactions. It may still send you one for lower amounts.',
  },
  {
    q: 'I never got a 1099-K. Is my side-gig income tax-free?',
    a: 'No. The 1099-K threshold is a reporting rule for the platform, not a tax threshold for you. If income is taxable, you must report it whether or not you receive a form.',
  },
  {
    q: 'I sold my old couch for less than I paid. Do I owe tax on the 1099-K amount?',
    a: 'Generally no. A personal item sold for less than its cost does not produce taxable gain, and the personal loss generally is not deductible. But you should not simply treat the gross 1099-K amount as taxable income — the IRS explains how to report the sale so the amount is accounted for.',
  },
  {
    q: 'My roommate paid me back for rent through Venmo. Is that income?',
    a: 'No. Gifts and reimbursements for shared personal costs are not payments for goods or services just because the money moved through an app. They are not taxable income and should not be reported on Form 1099-K.',
  },
  {
    q: 'The 1099-K I received is wrong. What should I do?',
    a: 'Contact the payer named on the form — the payment app or marketplace — and ask for a corrected form. The IRS explains how to handle an incorrect form if you cannot get it corrected before you file.',
  },
]

const RELATED = [
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference and why it matters',
    desc:  'If your app payments are freelance income, how 1099 work is taxed.',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: 'What is self-employment tax and how does it work?',
    desc:  'Business income from an app can also bring self-employment tax.',
  },
  {
    href: '/library/rental/airbnb-tax-guide',
    cat:  'Real Estate & Airbnb',
    title: 'Airbnb host tax guide: what to report and what to deduct',
    desc:  'Hosts who receive a 1099-K from a rental platform.',
  },
]

export default function Form1099KPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Got a 1099-K From PayPal, Venmo, or eBay? Is It Taxable? | AskLinTax',
      description: 'A 1099-K reports gross payments, not profit. The current $20,000 / 200-transaction reporting threshold, why personal sales at a loss are not taxable income, gifts and shared costs, and what to do if the form is wrong.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Not automatically. <strong>Form 1099-K</strong> reports the <strong>gross payments</strong> you received through a payment app, online marketplace, or payment card — not your profit, and not a decision that the money is taxable. Whether you owe tax depends on <strong>what the payments were for</strong>: business or service income, personal items sold at a gain, personal items sold at a loss, or money that was never income at all.
        </p>

        <h2>The current reporting threshold</h2>
        <p>
          For payment apps and online marketplaces (third-party settlement organizations), current IRS guidance says Form 1099-K is generally required when your payments for goods or services exceed <strong>$20,000</strong> <em>and</em> there are <strong>more than 200 transactions</strong>. This threshold was restored retroactively after legislation changed the earlier framework, so older information you may have seen about a $600 threshold does not describe the current federal rule. Platforms may still send you a 1099-K below the threshold.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A reporting threshold is not a tax threshold</div>
          <p>The $20,000 / 200-transaction test decides whether the platform must send a form. It does not decide whether you owe tax. Receiving a 1099-K does not make the full amount taxable, and not receiving one does not make taxable income tax-free.</p>
        </div>

        <h2>Sort the payments by what they were for</h2>
        <ArticleTable
          head={['What the payments were', 'Generally']}
          rows={[
            ['Business or service income (selling goods you make or buy to resell, freelance work)', 'Taxable income; allowable business expenses are handled separately'],
            ['A personal item sold for more than you paid', 'The gain is generally taxable'],
            ['A personal item sold for less than you paid', 'No taxable gain; the personal loss generally is not deductible'],
            ['Gifts, or friends paying you back for shared personal costs', 'Not payments for goods or services, and not taxable income'],
          ]}
        />

        <h2>Business or service income</h2>
        <p>
          If the payments were for a business or for services you provided, report the income. Because the 1099-K shows gross payments, your allowable business expenses are reported separately to arrive at your profit — the form itself does not subtract them. This income may also be subject to self-employment tax; see <a href="/library/small-business/self-employment-tax/">What is self-employment tax?</a>
        </p>

        <h2>Selling your own personal items</h2>
        <p>
          Most people who sell used clothes, furniture, or electronics sell them for less than they paid. That does not create taxable gain, and the personal loss generally is not deductible — but you should not simply report the gross 1099-K amount as income. If you sold a personal item for <strong>more</strong> than you paid, the gain is generally taxable. The IRS Form 1099-K FAQs and the Form 8949 instructions explain how to report these sales.
        </p>

        <h2>Gifts and shared costs</h2>
        <p>
          A gift from a friend, or a roommate paying you back for their share of rent or a dinner, is not a payment for goods or services just because it moved through an app. These amounts are not taxable income and should not be reported on Form 1099-K.
        </p>

        <h2>If the form is wrong</h2>
        <p>
          If your 1099-K includes payments that should not be there — such as personal reimbursements — or shows the wrong amount, contact the payer listed on the form and ask for a correction. Keep records that show what each payment was for.
        </p>

        <h2>Example</h2>
        <p>
          Ana receives a 1099-K showing $24,000 from an online marketplace. Of that, $20,000 is from handmade jewelry she sells as a side business, and $4,000 is from selling her own used furniture for less than she paid. She reports the jewelry business income and its allowable expenses, and handles the furniture sales so that they are not taxed as income, following the IRS guidance for personal items sold at a loss.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

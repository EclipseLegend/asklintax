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
  id:            '135',
  title:         'S Corporation Shareholder Basis: Stock Basis, Debt Basis, and Form 7203',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how S corporation shareholders track stock and debt basis, based on the Instructions for Form 7203 (Rev. December 2022, the latest revision on IRS.gov when reviewed; the IRS About Form 7203 page was updated June 2026), the IRS S corporation stock and debt basis page (updated June 2026), Publication 925 (2025), and the 2025 Instructions for Form 461. It does not cover basis for stock received in a section 351 transfer with liabilities, the section 1.1367-1(g) election in detail, at-risk calculations, or the character of gain on repayment of reduced-basis debt',
  persona:       ['S corporation owners whose company had a loss', 'Shareholders who lent money to their S corporation', 'Owners who personally guaranteed a bank loan for their company', 'Shareholders taking distributions'],
  relatedJourney: ['Running a small business', 'Just formed an LLC'],
  actionRequired: 'Track your stock basis and debt basis separately every year, starting with what you paid or contributed. File Form 7203 with your return when you claim a loss, receive a non-dividend distribution, dispose of stock, or receive a loan repayment from the corporation. Remember that a loan guarantee alone does not give you debt basis.',
  sources: [
    { label: 'IRS — Instructions for Form 7203 (Rev. December 2022)', url: 'https://www.irs.gov/pub/irs-pdf/i7203.pdf' },
    { label: 'IRS — About Form 7203, S Corporation Shareholder Stock and Debt Basis Limitations', url: 'https://www.irs.gov/forms-pubs/about-form-7203' },
    { label: 'IRS — S corporation stock and debt basis', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-stock-and-debt-basis' },
    { label: 'IRS — Publication 925 (2025), Passive Activity and At-Risk Rules', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the difference between stock basis and debt basis?',
    a: 'Stock basis starts with what you paid for your shares or contributed to the corporation and changes every year with your share of income, losses, and distributions. Debt basis comes only from money you personally lent directly to the S corporation. The two are figured separately on Form 7203: losses reduce stock basis first and then debt basis, and only stock basis determines whether a distribution is tax-free.',
  },
  {
    q: 'I personally guaranteed the company\'s bank loan. Does that give me debt basis?',
    a: 'No. The IRS says a loan guarantee is not enough to give a shareholder debt basis, and loans a shareholder guarantees or co-signs are not part of loan basis. You obtain basis from a guarantee only to the extent you actually make a payment under it.',
  },
  {
    q: 'What happens to a loss I cannot deduct because of basis?',
    a: 'It is suspended. Losses and deductions not allowed because of the basis limit keep their character, are treated as incurred in the next tax year, and carry forward indefinitely until you have enough stock or debt basis to absorb them — or until you dispose of all of your stock.',
  },
  {
    q: 'If I sell my shares, can I use my suspended losses?',
    a: 'Not the ones limited by basis. The IRS says that once a shareholder disposes of all of their stock, losses suspended because of basis limitations are lost and cannot be deducted. Losses that passed the basis limit but were held back by another rule, such as the passive activity rules, follow that rule\'s own treatment instead.',
  },
  {
    q: 'When do I have to file Form 7203?',
    a: 'When you claim a deduction for your share of an aggregate S corporation loss (including a loss carried over from an earlier year because of basis), receive a non-dividend distribution, dispose of S corporation stock, or receive a loan repayment from the corporation. The IRS suggests completing and keeping it even in years it is not required.',
  },
  {
    q: 'Are distributions above my basis taxable?',
    a: 'Yes. A non-dividend distribution is tax-free to the extent of your stock basis. Any excess is generally taxed as capital gain — long-term if you held the stock for more than a year. Debt basis does not count for this purpose.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: 'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
    desc:  'Salary, distributions, and the Schedule K-1.',
  },
  {
    href: '/library/small-business/business-losses-nol',
    cat:  'Small Business & Self-Employment',
    title: 'Business Losses: Basis, At-Risk, Passive Activity, Excess Business Loss, and NOL Rules',
    desc:  'The limits that apply after basis.',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation & Structure',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'Choosing S corporation status.',
  },
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: 'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1',
    desc:  'How partner basis differs from S corporation basis.',
  },
]

export default function SCorpShareholderBasisPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'S Corporation Shareholder Basis: Stock Basis, Debt Basis, and Form 7203 | AskLinTax',
      description: 'How S corporation shareholders figure stock basis and debt basis: annual adjustments, distributions, losses, suspended losses, direct shareholder loans vs. loan guarantees, repayment of reduced-basis debt, Form 7203 filing triggers, and the later loss limits — with a worked example.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          As an S corporation shareholder, you can deduct your share of the company's losses only up to your <strong>basis</strong>, and you can receive distributions tax-free only up to your <strong>stock basis</strong>. Basis comes in two separate kinds: <strong>stock basis</strong>, from what you paid or contributed plus your share of income, and <strong>debt basis</strong>, from money you <strong>personally lent directly</strong> to the corporation. The corporation does not track this for you — the IRS says it is the shareholder's responsibility, and <strong>Form 7203</strong> is where you figure it.
        </p>

        <h2>Stock basis: what moves it each year</h2>
        <ArticleTable
          head={['Order', 'Adjustment', 'Effect on stock basis']}
          rows={[
            ['Start', 'What you paid for the stock or contributed to the corporation (initial basis), plus later contributions', 'Sets the starting point'],
            ['1', 'Your share of all income, including tax-exempt income (and certain excess depletion)', 'Increases'],
            ['2', 'Non-dividend distributions (including cash), to the extent of basis', 'Decreases, but not below zero'],
            ['3', 'Nondeductible expenses (and certain oil and gas depletion)', 'Decreases, but not below zero'],
            ['4', 'Your share of losses and deductions', 'Decreases, but not below zero'],
          ]}
        />
        <p>
          You may elect to apply losses and deductions (step 4) before nondeductible expenses (step 3); once made, the election applies to that year and all later years for that S corporation unless the IRS agrees to revoke it. Stock basis can never go below zero.
        </p>

        <h2>Debt basis: direct loans only</h2>
        <ArticleTable
          head={['Arrangement', 'Creates debt basis?']}
          rows={[
            ['You lend your own money directly to the S corporation', 'Yes — generally the balance the corporation owes you, adjusted for reductions and restorations'],
            ['The S corporation borrows from a bank', 'No — that is the corporation\'s debt, not a loan from you'],
            ['You guarantee or co-sign the corporation\'s bank loan', 'No — only to the extent you actually make a payment under the guarantee'],
          ]}
        />
        <ul>
          <li>Losses and nondeductible expenses that exceed your stock basis then reduce your <strong>debt basis</strong>, but not below zero.</li>
          <li>Distributions do <strong>not</strong> reduce debt basis, and debt basis does not make a distribution tax-free.</li>
          <li>If the corporation <strong>repays a loan whose basis has been reduced</strong>, part or all of the repayment can be taxable to you. Form 7203 is required in the year you receive a loan repayment.</li>
          <li>The IRS says that when a shareholder claims to have contributed or lent substantial funds, it may consider whether the shareholder had the financial means to do so.</li>
        </ul>

        <h2>Example: a contribution, a loss, and a guarantee</h2>
        <p>
          Grace is the only shareholder of an S corporation. She contributes <strong>$30,000</strong> for her stock. In its first year, the corporation has a <strong>$50,000</strong> ordinary loss, which passes through to her. She has personally guaranteed a <strong>$100,000</strong> bank loan to the corporation but has made <strong>no payment</strong> under the guarantee. There are no other items.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Stock basis from her contribution', '$30,000'],
            ['Debt basis from the $100,000 guarantee', '$0 — no payment has been made'],
            ['Loss passed through to Grace', '$50,000'],
            ['Loss that passes the basis limit (not yet a final deduction)', '$30,000 (stock basis is reduced to $0)'],
            ['Loss suspended by the basis limit', '$20,000, carried forward indefinitely until Grace has enough stock or debt basis'],
          ]}
        />
        <p>
          Passing the basis limit does not automatically mean Grace deducts $30,000 on her personal return. The $30,000 must still pass the <strong>at-risk</strong>, <strong>passive activity</strong>, and <strong>excess business loss</strong> rules, in that order, and the amount she can actually deduct this year may be smaller. The guarantee does not create $100,000 of debt basis.
        </p>
        <p>
          <strong>The next year:</strong> if Grace lends the corporation <strong>$15,000</strong> of her own money and the corporation has no other items, she has $15,000 of debt basis. She can then use $15,000 of the suspended loss (subject to the later limits), reducing her debt basis to $0; $5,000 stays suspended. If she had instead paid $10,000 to the bank under the guarantee, she would generally have debt basis only to the extent of that $10,000 payment.
        </p>

        <h2>Suspended losses and selling your stock</h2>
        <ul>
          <li><strong>Basis-limited losses</strong> carry forward indefinitely and are allowed when stock or debt basis is increased or restored. If you dispose of <strong>all</strong> of your stock, the IRS says losses suspended because of basis are <strong>lost</strong>, and gain on the sale does not increase your basis to free them.</li>
          <li><strong>Losses that passed the basis limit</strong> but were held back by a later rule follow that rule. For example, suspended passive activity losses are generally allowed when you dispose of your entire interest in a fully taxable transaction to an unrelated person, and a disallowed excess business loss becomes a net operating loss carryover. Do not assume every kind of suspended loss is treated the same way.</li>
        </ul>

        <h2>Form 7203 and the later loss limits</h2>
        <p>
          File <strong>Form 7203</strong> if you claim a deduction for your share of an aggregate loss (including a basis-limited loss carried over from an earlier year), receive a non-dividend distribution, dispose of stock, or receive a loan repayment from the corporation. The IRS suggests completing and keeping it every year so your basis stays consistent. After basis, losses must also pass the at-risk rules (Form 6198), the passive activity rules (Form 8582), and the excess business loss limit (Form 461); see <a href="/library/small-business/business-losses-nol/">business losses</a>.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A Schedule K-1 loss is not automatically deductible</div>
          <p>The IRS says receiving a K-1 that shows a loss does not mean you are entitled to claim it. Keep records of every contribution, loan, repayment, and distribution from the start — reconstructing years of basis later is difficult. See also <a href="/library/business-formation/s-corp-reasonable-salary/">running an S-Corp</a>.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

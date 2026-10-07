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
  id:            '57',
  title:         'What is self-employment tax and how does it work?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers how self-employment tax works for individual freelancers, independent contractors, and sole proprietors. The Social Security wage base changes each year, and the Additional Medicare Tax, church employees, and nonresident aliens have rules not covered here',
  persona:       ['Freelancers and independent contractors', 'Gig workers paid on a 1099', 'Sole proprietors with a side business', 'Anyone surprised by a tax bill on 1099 income'],
  relatedJourney: ['Starting a small business', 'First year of self-employment'],
  actionRequired: 'If your net earnings from self-employment are $400 or more, figure self-employment tax on Schedule SE, in addition to income tax. Plan for it during the year with estimated tax payments.',
  sources: [
    { label: 'IRS — Self-employment tax (Social Security and Medicare taxes)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
    { label: 'IRS — Topic no. 554, Self-employment tax', url: 'https://www.irs.gov/taxtopics/tc554' },
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Instructions for Schedule SE (Form 1040)', url: 'https://www.irs.gov/instructions/i1040sse' },
  ],
}

const FAQS = [
  {
    q: 'Is self-employment tax the same as income tax?',
    a: 'No. Self-employment tax is mainly Social Security and Medicare tax for people who work for themselves. It is figured separately, on Schedule SE, and is owed in addition to federal income tax.',
  },
  {
    q: 'I only made a little from freelancing. Do I owe it?',
    a: 'You generally must pay self-employment tax if your net earnings from self-employment are $400 or more.',
  },
  {
    q: 'Is the 15.3% applied to everything I was paid?',
    a: 'No. It is generally figured on 92.35% of your net earnings from self-employment — after your business expenses — not on your gross receipts. The Social Security portion also stops at an annual wage base that changes each year.',
  },
  {
    q: 'Do business expenses lower my self-employment tax?',
    a: 'Indirectly. Allowable business expenses reduce your Schedule C profit, which reduces your net earnings from self-employment. They do not change the self-employment tax rate itself.',
  },
  {
    q: 'Can I deduct any of the self-employment tax?',
    a: 'Yes. You can generally deduct the employer-equivalent portion of your self-employment tax in figuring your adjusted gross income. It reduces income tax, not the self-employment tax itself.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'How to pay self-employment tax during the year.',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'Expenses that reduce your profit — and your net earnings.',
  },
  {
    href: '/library/individual/w2-vs-1099',
    cat:  'Individuals & Families',
    title: 'W-2 vs 1099: what\'s the difference and why it matters',
    desc:  'Why employees and contractors pay these taxes differently.',
  },
]

export default function SelfEmploymentTaxPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Self-Employment Tax Explained: 15.3%, Schedule SE & the $400 Rule | AskLinTax',
      description: 'Why freelancers and contractors owe Social Security and Medicare tax on top of income tax: the $400 threshold, the 15.3% rate, the 92.35% calculation, Schedule SE, and the deduction for part of the tax.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          <strong>Self-employment tax</strong> is the Social Security and Medicare tax for people who work for themselves. When you are an employee, these taxes are withheld from your pay and your employer pays a matching share. When you are self-employed, you generally pay both shares yourself — figured on <strong>Schedule SE</strong> and owed <strong>in addition to</strong> federal income tax.
        </p>

        <h2>Who owes it</h2>
        <p>
          You generally must pay self-employment tax if your <strong>net earnings from self-employment are $400 or more</strong>. That includes freelancers, independent contractors, and sole proprietors. If you are not sure whether your work is self-employment, see <a href="/library/individual/w2-vs-1099/">W-2 vs 1099</a>.
        </p>

        <h2>How it is calculated</h2>
        <ArticleTable
          head={['Piece', 'General rule']}
          rows={[
            ['Social Security', '12.4%'],
            ['Medicare', '2.9%'],
            ['Total self-employment tax rate', '15.3%'],
            ['Amount the rate is generally applied to', '92.35% of net earnings from self-employment'],
            ['Social Security limit', 'Applies only up to an annual wage base that changes each year'],
          ]}
        />
        <p>
          At higher income levels, an <strong>Additional Medicare Tax</strong> can also apply. Its details are outside this guide; the Schedule SE instructions and Topic 554 point to the rules.
        </p>

        <h2>Example (illustrative)</h2>
        <p>
          Mia is a freelance designer with no W-2 job. Her 2025 Schedule C shows $40,000 of net profit after business expenses — well below the Social Security wage base. Generally:
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Net profit from Schedule C', '$40,000'],
            ['× 92.35%', '$36,940'],
            ['× 15.3% self-employment tax', 'about $5,652'],
          ]}
        />
        <p>
          That is in addition to any income tax on her profit. She can also deduct the employer-equivalent portion of the self-employment tax in figuring her adjusted gross income, which lowers her income tax.
        </p>

        <h2>What lowers it — and what does not</h2>
        <ul>
          <li><strong>Business expenses</strong> reduce your Schedule C profit, so they reduce your net earnings from self-employment. They do not change the 15.3% rate. See <a href="/library/small-business/business-deductions/">What can I deduct as a small business owner?</a></li>
          <li><strong>The deduction for part of the tax</strong> — the employer-equivalent portion — reduces your adjusted gross income for income tax purposes. It does not reduce the self-employment tax itself.</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Plan for it during the year</div>
          <p>No one withholds self-employment tax from 1099 income. Estimated tax payments during the year can keep you from owing a large amount — and possibly an underpayment penalty — at filing time. See <a href="/library/small-business/quarterly-taxes/">Quarterly estimated taxes</a>.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

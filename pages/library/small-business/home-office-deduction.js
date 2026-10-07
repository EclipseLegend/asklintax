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
  id:            '58',
  title:         'Home office deduction — do I qualify?',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the federal home office deduction for self-employed people and others using part of a home for business. It does not cover W-2 employees working remotely, state rules, or the detailed actual-expense and depreciation calculations on Form 8829',
  persona:       ['Freelancers who work from home', 'Sole proprietors with a home-based business', 'Sellers who store inventory at home', 'Home daycare providers'],
  relatedJourney: ['Starting a small business', 'First year of self-employment'],
  actionRequired: 'Check whether part of your home is used regularly — and generally exclusively — for your business, and whether it is your principal place of business or meets another qualifying rule. If it qualifies, choose either the simplified option or the actual-expense method.',
  sources: [
    { label: 'IRS — Publication 587 (2025), Business Use of Your Home', url: 'https://www.irs.gov/publications/p587' },
    { label: 'IRS — Simplified option for home office deduction', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/simplified-option-for-home-office-deduction' },
    { label: 'IRS — Instructions for Form 8829', url: 'https://www.irs.gov/instructions/i8829' },
  ],
}

const FAQS = [
  {
    q: 'I\'m a W-2 employee working remotely. Can I take the home office deduction?',
    a: 'This guide does not apply the deduction to ordinary W-2 employees working from home. Under current federal rules it is primarily available for self-employed and business use — do not assume remote work as an employee creates a federal deduction.',
  },
  {
    q: 'Do I need a separate room?',
    a: 'Not necessarily. A dedicated, separately identifiable portion of a room can qualify if it meets the requirements. What matters is regular and generally exclusive business use, plus the principal-place-of-business or another qualifying test.',
  },
  {
    q: 'I use my office for work and my kids do homework there. Does it count?',
    a: 'Generally not. The space usually must be used exclusively for business. There are specific exceptions — for example, certain storage of inventory or product samples, certain daycare use, and certain rental use — but family use of the space generally fails the exclusive-use test.',
  },
  {
    q: 'What is the most I can deduct with the simplified option?',
    a: 'The simplified option is $5 per square foot of qualifying space, up to 300 square feet — so the simplified calculation is capped at $1,500.',
  },
  {
    q: 'Does the simplified option make it easier to qualify?',
    a: 'No. It only simplifies the calculation. The same eligibility requirements apply under both methods.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'The general overview of business deductions.',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: 'What is self-employment tax and how does it work?',
    desc:  'Deductions reduce profit, which reduces net earnings.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Paying tax on home-business income during the year.',
  },
]

export default function HomeOfficeDeductionPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Home Office Deduction: Do You Qualify? Simplified vs. Actual Method | AskLinTax',
      description: 'Who qualifies for the home office deduction: regular and exclusive business use, principal place of business, the exceptions, and how the simplified $5-per-square-foot option compares with the actual-expense method.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          You may qualify if you use part of your home <strong>regularly</strong> and, generally, <strong>exclusively</strong> for your business, and that space is your <strong>principal place of business</strong> or meets another qualifying business-use rule. If you qualify, you can figure the deduction with either the <strong>simplified option</strong> or the <strong>actual-expense method</strong>.
        </p>
        <p>
          This guide is about self-employed and other business use. It does not tell W-2 employees that working remotely creates a federal home office deduction.
        </p>

        <h2>The qualifying tests</h2>
        <ArticleTable
          head={['Test', 'What it generally means']}
          rows={[
            ['Regular use', 'You use the space for business on a continuing basis, not occasionally'],
            ['Exclusive use (generally)', 'The space is used only for business — with specific exceptions'],
            ['Principal place of business, or another qualifying rule', 'For example, it is where you conduct your business, or it meets another business-use rule in Publication 587'],
          ]}
        />

        <h2>You do not always need a separate room</h2>
        <p>
          A common myth is that you must have a whole room set aside. A <strong>dedicated, separately identifiable portion of a room</strong> can qualify if it meets the requirements. What matters is how the space is used, not whether it has walls and a door.
        </p>

        <h2>Exceptions to the exclusive-use rule</h2>
        <p>
          Publication 587 describes situations where the exclusive-use requirement does not apply in the usual way, including certain:
        </p>
        <ul>
          <li><strong>Storage of inventory or product samples</strong></li>
          <li><strong>Daycare</strong> use</li>
          <li><strong>Rental</strong> use</li>
        </ul>
        <p>
          Each exception has its own conditions — check Publication 587 before relying on one.
        </p>

        <h2>Two ways to figure the deduction</h2>
        <ArticleTable
          head={['', 'Simplified option', 'Actual-expense (regular) method']}
          rows={[
            ['How it works', '$5 per square foot of qualifying space', 'Allocate actual home expenses to the business portion'],
            ['Limit', 'Up to 300 square feet — so at most $1,500', 'Depends on your actual expenses and the limits in Publication 587'],
            ['Home depreciation', 'None taken for the home office under this method', 'Can include depreciation of the business portion'],
            ['Later depreciation recapture', 'None from this method, because no depreciation was claimed through it', 'Depreciation claimed can matter when you sell'],
            ['Eligibility', 'Same requirements', 'Same requirements'],
          ]}
        />
        <p>
          The actual-expense method uses Form 8829 for many self-employed filers. The simplified option does <strong>not</strong> change who qualifies — it only changes the calculation.
        </p>

        <h2>Example</h2>
        <p>
          Wei is a self-employed translator. She uses a 150-square-foot area of her living room only for her work, every working day, and it is where she runs her business. Her family does not use that area. Under the simplified option, her calculation is 150 × $5 = $750. If she instead used part of the room as a guest space on weekends, the area would generally fail the exclusive-use test.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Keep it in context</div>
          <p>The home office deduction is one part of your business deductions. For the full picture, see <a href="/library/small-business/business-deductions/">What can I deduct as a small business owner?</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

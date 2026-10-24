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
  id:            '79',
  title:         'Schedule C Explained: Self-Employment Income and Expenses',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   null,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains Schedule C (Form 1040) for tax years 2025 and 2026, based on the 2025 Schedule C and its instructions, Publication 334 (2025), the 2025 Instructions for Form 461, IRS Notice 2026-10 and Announcement 2026-11 (2026 standard mileage rates), and Revenue Procedures 2024-40 and 2025-32. The 2026 Schedule C and its instructions were drafts when this guide was written. It does not cover farming (Schedule F), statutory employees in detail, or state returns',
  persona:       ['Freelancers and independent contractors', 'Gig workers and online sellers', 'Single-member LLC owners', 'Anyone filing their first Schedule C'],
  relatedJourney: ['Preparing to file', 'First year of self-employment'],
  actionRequired: 'Report all of your business income on Schedule C — including income that was not reported to you on a Form 1099 — subtract your allowable business expenses, and carry the net profit to Schedule 1 and Schedule SE. Keep records that support every expense.',
  sources: [
    { label: 'IRS — Schedule C (Form 1040) (2025), Profit or Loss From Business', url: 'https://www.irs.gov/pub/irs-pdf/f1040sc.pdf' },
    { label: 'IRS — Instructions for Schedule C (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — 2025 Instructions for Form 461, Limitation on Business Losses', url: 'https://www.irs.gov/pub/irs-pdf/i461.pdf' },
    { label: 'IRS — Standard mileage rates (Notice 2026-10 and Announcement 2026-11)', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
    { label: 'IRS — Internal Revenue Bulletin 2026-29 (Announcement 2026-11, revised 2026 mileage rates)', url: 'https://www.irs.gov/pub/irs-irbs/irb26-29.pdf' },
    { label: 'IRS — Revenue Procedure 2024-40 (tax year 2025 inflation adjustments, section 2.32)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Revenue Procedure 2025-32 (tax year 2026 inflation adjustments, sections 4.24 and 4.31)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do I need to file Schedule C if I did not get a Form 1099?',
    a: 'Yes, if you had business income. You must report all business income, whether or not anyone sent you a Form 1099-NEC, 1099-MISC, or 1099-K.',
  },
  {
    q: 'I have two different businesses. Do I combine them?',
    a: 'No. The Schedule C instructions say that if you owned more than one business, you complete a separate Schedule C for each one.',
  },
  {
    q: 'Where do I put my home office?',
    a: 'Only on line 30. Do not include home office expenses on any other line. Figure the amount on Form 8829 or with the simplified method.',
  },
  {
    q: 'What mileage rate do I use?',
    a: 'For 2025, 70 cents a mile. For 2026, 72.5 cents a mile for business miles driven January 1 through June 30 (Notice 2026-10) and 76 cents a mile from July 1 through December 31 (Announcement 2026-11). You must also complete Part IV with vehicle information.',
  },
  {
    q: 'What if my Forms 1099-NEC add up to more than I reported on line 1?',
    a: 'The instructions say to attach a statement explaining the difference if the total of box 1 of your Forms 1099-NEC is more than the amount you report on line 1.',
  },
  {
    q: 'What happens if my business has a loss?',
    a: 'Check the box on line 32 that describes your investment. If not all of your investment is at risk, you must attach Form 6198 and your loss may be limited. Very large losses can also be limited by the excess business loss rules on Form 461.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business',
    title: 'What can I deduct as a small business owner?',
    desc:  'Which expenses belong on Schedule C.',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business',
    title: 'What is self-employment tax and how does it work?',
    desc:  'What happens to your Schedule C profit on Schedule SE.',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: 'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
    desc:  'How payment app reports fit into your gross receipts.',
  },
  {
    href: '/library/small-business/hobby-vs-business-income',
    cat:  'Small Business & Self-Employment',
    title: 'Hobby or Business? How Side Income Is Taxed in 2025 and 2026',
    desc:  'Whether your side activity is a hobby or a business.',
  },
]

export default function ScheduleCGuidePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Schedule C Explained: Self-Employment Income & Expenses | AskLinTax',
      description: 'How to read and fill out Schedule C for 2025 and 2026: gross receipts and Forms 1099, cost of goods sold, expense lines, home office, mileage rates, net profit, and losses.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          <strong>Schedule C (Form 1040)</strong> is where a sole proprietor — including a single-member LLC owner with default tax treatment — reports business income and expenses. The result, your <strong>net profit or loss</strong> on line 31, goes to <strong>Schedule 1 (Form 1040), line 3</strong> for income tax and to <strong>Schedule SE, line 2</strong> for self-employment tax.
        </p>

        <h2>Who files Schedule C</h2>
        <ul>
          <li>Freelancers, independent contractors, and gig workers with business income.</li>
          <li>Sole proprietors and individual owners of single-member LLCs that have not elected corporate treatment. See <a href="/library/business-formation/single-member-llc-taxes/">single-member LLC taxes</a>.</li>
          <li>Online sellers running a business.</li>
          <li>A separate Schedule C is required for each business you own.</li>
        </ul>

        <h2>How the form is organized</h2>
        <ArticleTable
          head={['Part', 'What goes there']}
          rows={[
            ['Top (lines A–J)', 'Business description and code, accounting method, whether you materially participated, whether you started the business this year, and whether you made payments that required you to file Forms 1099'],
            ['Part I — Income (lines 1–7)', 'Gross receipts, returns and allowances, cost of goods sold (from Part III), and other business income'],
            ['Part II — Expenses (lines 8–27b)', 'Advertising, car and truck, contract labor, depreciation and section 179, insurance, legal and professional, office, rent, repairs, supplies, taxes and licenses, travel and meals, utilities, wages, and other expenses'],
            ['Lines 28–31', 'Total expenses, tentative profit, home office (line 30), and net profit or loss (line 31)'],
            ['Part III — Cost of goods sold', 'For businesses that sell products: beginning inventory, purchases, labor, materials, and ending inventory'],
            ['Part IV — Vehicle information', 'Required if you claim car or truck expenses on line 9 and are not required to file Form 4562'],
            ['Part V — Other expenses', 'Itemized list of expenses not on lines 8–27a or line 30; the total goes to line 27b'],
          ]}
        />
        <p>
          <strong>New for 2025:</strong> the energy efficient commercial buildings deduction is reported on line 27a, and other expenses (from line 48) are reported on line 27b.
        </p>

        <h2>Income: line 1 and Forms 1099</h2>
        <ul>
          <li>Report <strong>all</strong> gross receipts from the business, whether or not you received a Form 1099.</li>
          <li>Make sure line 1 includes amounts properly shown on Forms 1099-NEC. If those amounts add up to more than you report, attach a statement explaining why.</li>
          <li>Payments reported on Form 1099-K may include amounts that are not income (for example, refunds or personal transfers). See <a href="/library/individual/form-1099-k/">Form 1099-K</a>.</li>
          <li><strong>Reporting thresholds changed:</strong> for reportable payments made after 2025, the general information-reporting threshold for payers rises to <strong>$2,000</strong> (Publication 334). You still report all income, even below a threshold.</li>
        </ul>

        <h2>Expenses: key rules for 2025 and 2026</h2>
        <ArticleTable
          head={['Item', '2025', '2026']}
          rows={[
            ['Standard mileage rate (line 9)', '70 cents per mile', '72.5 cents per mile January 1 – June 30 (Notice 2026-10); 76 cents per mile July 1 – December 31 (Announcement 2026-11)'],
            ['Business meals (line 24b)', 'Generally 50% deductible', 'Generally 50% deductible'],
            ['Section 179 and bonus depreciation (line 13, through Form 4562)', 'Section 179 up to $2,500,000; 100% bonus for qualified property acquired after January 19, 2025', 'Section 179 up to $2,560,000; see the depreciation guide'],
            ['Home office (line 30)', 'Form 8829 or the simplified method ($5 per square foot, up to 300 square feet)', 'Same'],
          ]}
        />
        <p>
          The mid-2026 mileage increase was announced in Announcement 2026-11 (Internal Revenue Bulletin 2026-29, July 13, 2026), which cites recent increases in fuel prices. Use the rate for the period in which you drove the miles. For deduction rules in detail, see <a href="/library/small-business/business-deductions/">business deductions</a> and <a href="/library/small-business/section-179-bonus-depreciation/">Section 179 and bonus depreciation</a>.
        </p>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Nina</strong> is a freelance photographer with no employees and no inventory.
        </p>
        <ArticleTable
          head={['Line', 'Item', 'Amount']}
          rows={[
            ['1 / 7', 'Gross receipts (including payments reported on Forms 1099-NEC and 1099-K)', '$90,000'],
            ['8', 'Advertising', '$2,000'],
            ['9', 'Car and truck: 5,000 business miles × 70 cents', '$3,500'],
            ['22', 'Supplies', '$1,500'],
            ['27b', 'Other expenses: editing software subscriptions', '$1,200'],
            ['28 / 29', 'Total expenses, then tentative profit', '$8,200 / $81,800'],
            ['30', 'Home office, simplified method: 200 square feet × $5', '$1,000'],
            ['31', 'Net profit', '$80,800'],
          ]}
        />
        <p>
          Nina enters $80,800 on Schedule 1, line 3, and on Schedule SE, line 2. Her self-employment tax is about $11,417 ($80,800 × 92.35% × 15.3%), and the profit may also qualify for the <a href="/library/small-business/qbi-deduction/">QBI deduction</a>.
        </p>

        <h2>Losses</h2>
        <ul>
          <li><strong>At-risk rules:</strong> on line 32, check whether all of your investment is at risk. If not, attach Form 6198; your loss may be limited.</li>
          <li><strong>Passive activity rules:</strong> if you did not materially participate (line G), your loss may be limited.</li>
          <li><strong>Excess business loss:</strong> very large overall business losses can be limited on Form 461 — see the next section.</li>
        </ul>

        <h2>Excess business loss thresholds (Form 461)</h2>
        <ArticleTable
          head={['Tax year', 'All other returns (including single)', 'Joint returns', 'IRS source']}
          rows={[
            ['2025', '$313,000', '$626,000', 'Rev. Proc. 2024-40, section 2.32'],
            ['2026', '$256,000', '$512,000', 'Rev. Proc. 2025-32, section 4.31'],
          ]}
        />
        <p>
          These are the thresholds for the <strong>excess business loss limitation</strong>, figured on <strong>Form 461</strong>. They are <strong>not</strong> limits on the expenses or deductions you can claim on Schedule C. The limitation matters only if your total losses from all of your trades or businesses exceed your total business income and gains by more than the threshold. The excess is not deductible for the year: it is included as income on Schedule 1, line 8p, and treated as a net operating loss carryforward. The 2025 tax law (P.L. 119-21) made this limitation permanent. The IRS sources reviewed for this guide do not explain why the 2026 amount is lower than the 2025 amount, so this guide does not offer a reason.
        </p>
        <p>
          <strong>Other loss limits may also apply,</strong> including the at-risk rules (Form 6198), the passive activity rules, and basis limits for partners and S corporation shareholders.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Leaving out income because no Form 1099 arrived.</strong></li>
          <li><strong>Counting the same payment twice</strong> when it appears on both a Form 1099-NEC and a Form 1099-K — keep records that show how you reconciled them.</li>
          <li><strong>Deducting personal expenses,</strong> or the personal part of mixed-use expenses.</li>
          <li><strong>Putting home office costs on other lines</strong> instead of line 30.</li>
          <li><strong>Claiming mileage without a log,</strong> or using the wrong 2026 rate for the period.</li>
          <li><strong>Combining two businesses</strong> on one Schedule C.</li>
          <li><strong>Forgetting Schedule SE</strong> when net earnings from self-employment are $400 or more.</li>
        </ul>

        <h2>Forms that work with Schedule C</h2>
        <ArticleTable
          head={['Form', 'Why you might need it']}
          rows={[
            ['Schedule SE', 'Self-employment tax on your net profit'],
            ['Schedule 1 (Form 1040)', 'Carries the net profit or loss to your Form 1040'],
            ['Form 4562', 'Depreciation, section 179, and listed property'],
            ['Form 8829', 'Home office, regular method'],
            ['Form 6198', 'At-risk limitation on losses'],
            ['Form 461', 'Excess business loss limitation'],
            ['Form 8995 or 8995-A', 'Qualified business income deduction'],
            ['Form 1040-ES', 'Estimated tax payments during the year'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ About the 2026 form</div>
          <p>The 2026 Schedule C and its instructions were still drafts when this guide was written. The 2026 rates and limits above come from final IRS guidance (Notice 2026-10, Announcement 2026-11, and Revenue Procedure 2025-32). State returns are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

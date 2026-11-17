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
  id:            '133',
  title:         'Inventory and Cost of Goods Sold: Schedule C and Small Business Exceptions',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains inventory and cost of goods sold for sole proprietors, based on the 2025 Instructions for Schedule C, the final regulations in T.D. 9942 (Treas. Reg. 1.471-1(b)(4), published in Internal Revenue Bulletin 2021-03), Publication 334 (2025), Publication 538 (Rev. January 2022, for the definition of inventory cost), Rev. Proc. 2024-40 (2025 gross receipts amount), Rev. Proc. 2025-32 (2026 gross receipts amount), and the IRS FAQs on the section 448(c)(2) aggregation rules (updated December 2025). The 2026 Schedule C instructions were not final when this guide was reviewed. It does not cover inventory valuation methods such as LIFO, uniform capitalization calculations, or accounting method change procedures in detail',
  persona:       ['Online sellers and resellers', 'Retail shop owners', 'Makers who sell products they produce', 'Anyone filling out Schedule C Part III for the first time'],
  relatedJourney: ['Running a small business', 'Starting a small business'],
  actionRequired: 'Decide which inventory method your business uses and keep using it consistently. If you keep an inventory, count and value it at the start and end of every year. If you are a small business taxpayer using the non-incidental materials and supplies method, deduct inventory costs in the year you provide the goods to customers or the year you pay for or incur the cost, whichever is later — not automatically in the year you buy them.',
  sources: [
    { label: 'IRS — 2025 Instructions for Schedule C (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sc.pdf' },
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/pub/irs-pdf/p334.pdf' },
    { label: 'IRS — Publication 538 (Rev. January 2022), Accounting Periods and Methods', url: 'https://www.irs.gov/pub/irs-pdf/p538.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2021-03, T.D. 9942 (final regulations, including Treas. Reg. 1.471-1(b)(4))', url: 'https://www.irs.gov/irb/2021-03_IRB' },
    { label: 'IRS — FAQs regarding the aggregation rules under section 448(c)(2)', url: 'https://www.irs.gov/newsroom/faqs-regarding-the-aggregation-rules-under-section-448c2-that-apply-to-the-section-163j-small-business-exemption' },
  ],
}

const FAQS = [
  {
    q: 'Can I deduct inventory in the year I buy it?',
    a: 'Not automatically. If you keep an inventory, you deduct the cost of goods when they are sold, through cost of goods sold. A small business taxpayer can choose instead to treat inventory as non-incidental materials and supplies, but the regulations say those costs are recovered only in the year the items are used or consumed — the year you provide the inventory to your customers — or the year you pay for or incur the cost, whichever is later. They are not deducted simply because you paid for them.',
  },
  {
    q: 'Who is a small business taxpayer?',
    a: 'A taxpayer whose average annual gross receipts for the 3 prior tax years do not exceed the inflation-adjusted limit and that is not a tax shelter as defined in section 448(d)(3). The limit is $31 million for 2025 and $32 million for 2026. If the business has existed for less than 3 years, use the period it has existed; include a predecessor\'s gross receipts.',
  },
  {
    q: 'Do I have to use the accrual method if I have inventory?',
    a: 'Generally, if you must account for inventory, you must use an accrual method for purchases and sales of merchandise. Small business taxpayers are an exception: they can use the cash method and can choose not to keep an inventory, as long as their inventory method clearly reflects income.',
  },
  {
    q: 'Is inventory the same as a business expense?',
    a: 'No. Inventory costs are recovered through cost of goods sold on Schedule C Part III. Ordinary operating expenses such as advertising, rent, and software go in Part II. Equipment and other property with a useful life of more than a year is generally capitalized and depreciated, or deducted under section 179 or bonus depreciation if eligible.',
  },
  {
    q: 'Do I need Form 3115?',
    a: 'Form 3115 is for changing an accounting method, including your method for inventory. You choose your accounting method when you file your first return that includes Schedule C for the business. After that, you generally need IRS approval to change it.',
  },
  {
    q: 'What goes into the cost of the goods I buy?',
    a: 'For merchandise purchased during the year, Publication 538 says cost is the invoice price minus appropriate discounts plus transportation or other charges incurred in acquiring the goods. Subtract purchase returns and allowances, and remove the cost of anything you take out of inventory for personal use.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'Where Part III fits on Schedule C.',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'Operating expenses that are not inventory.',
  },
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: 'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
    desc:  'Gross sales on Form 1099-K are not profit.',
  },
  {
    href: '/library/small-business/section-179-bonus-depreciation',
    cat:  'Small Business & Self-Employment',
    title: 'Section 179 and Bonus Depreciation: 2025 and 2026 Rules',
    desc:  'Equipment is capitalized, not inventory.',
  },
]

export default function InventoryCostOfGoodsSoldPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Inventory and Cost of Goods Sold: Schedule C and Small Business Exceptions | AskLinTax',
      description: 'How inventory and cost of goods sold work on Schedule C Part III: beginning and ending inventory, purchases, returns, freight-in, the small business taxpayer exception ($31 million for 2025, $32 million for 2026), the three permitted inventory methods, and Form 3115 — with a worked example.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you sell products, you do not deduct what you paid for them as an ordinary expense. You subtract the <strong>cost of goods sold (COGS)</strong> from your sales on Schedule C. COGS is generally your <strong>beginning inventory</strong>, plus what you <strong>bought or produced</strong> during the year, minus your <strong>ending inventory</strong>. A <strong>small business taxpayer</strong> may use a simpler inventory method, but that does not automatically make inventory deductible in the year you buy it.
        </p>

        <h2>How cost of goods sold is figured (Schedule C Part III)</h2>
        <ArticleTable
          head={['Schedule C line', 'What goes there']}
          rows={[
            ['Line 35', 'Inventory at the beginning of the year — usually the same as last year\'s ending inventory; explain any difference'],
            ['Line 36', 'Purchases, minus purchase returns and allowances and the cost of items withdrawn for personal use'],
            ['Line 37', 'Cost of labor (not including amounts paid to yourself)'],
            ['Line 38', 'Materials and supplies'],
            ['Line 39', 'Other costs'],
            ['Line 40', 'Total of lines 35 through 39'],
            ['Line 41', 'Inventory at the end of the year'],
            ['Line 42', 'Cost of goods sold: line 40 minus line 41, carried to line 4'],
          ]}
        />
        <p>
          For goods you buy, Publication 538 says cost is the invoice price minus appropriate discounts plus <strong>transportation or other charges incurred in acquiring the goods</strong> (freight-in). Use the price you actually pay after trade discounts.
        </p>

        <h2>Example</h2>
        <p>
          Mei runs an online shop. She keeps an inventory and had <strong>$60,000</strong> of net sales in 2025.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Beginning inventory (January 1)', '$8,000'],
            ['Purchases of merchandise', '+$40,000'],
            ['Purchase returns to suppliers', '−$2,000'],
            ['Freight-in paid to receive the goods', '+$1,000'],
            ['Items taken for personal use', '−$500'],
            ['Goods available for sale', '$46,500'],
            ['Ending inventory (December 31)', '−$10,000'],
            ['Cost of goods sold', '$36,500'],
            ['Gross profit ($60,000 − $36,500)', '$23,500'],
          ]}
        />
        <p>
          Even though Mei spent $40,000 on merchandise, only the cost of what she sold reduces her 2025 income. The $10,000 still on hand becomes her beginning inventory for 2026. Her other business expenses, such as advertising and platform fees, are deducted separately in Part II.
        </p>

        <h2>The small business taxpayer exception</h2>
        <ArticleTable
          head={['', '2025', '2026']}
          rows={[
            ['Average annual gross receipts limit (3 prior tax years)', '$31 million', '$32 million'],
            ['Source', 'Rev. Proc. 2024-40; 2025 Schedule C instructions', 'Rev. Proc. 2025-32 (section 448(c) amount)'],
          ]}
        />
        <p>
          You are a small business taxpayer if your average annual gross receipts for the 3 prior tax years are at or below that limit <strong>and</strong> you are not a <strong>tax shelter</strong> as defined in section 448(d)(3). A tax shelter cannot qualify no matter how small it is. If the business has existed for less than 3 years, use the period it has existed, include any predecessor's gross receipts, and annualize short tax years.
        </p>
        <p>
          The test looks back, not at this year's sales. For a calendar-year business, eligibility for 2026 depends on the <strong>average</strong> of its gross receipts for 2023, 2024, and 2025 — so having 2026 revenue under $32 million does not by itself show that you qualify, and one large year can raise the average. Related businesses can also count together: under the section 448(c)(2) aggregation rules, gross receipts of businesses treated as a single employer under the controlled group rules of section 52(a) or 52(b), or the affiliated service group rules of section 414(m) or 414(o), are combined. If you own more than one business, check these rules before relying on the exception.
        </p>

        <h2>Three permitted methods for a small business taxpayer</h2>
        <ArticleTable
          head={['Method', 'When inventory costs are deducted']}
          rows={[
            ['Keep an inventory', 'Through cost of goods sold as goods are sold; you must generally use an accrual method for purchases and sales and value the inventory each year'],
            ['Treat inventory as non-incidental materials and supplies', 'Only in the year the items are used or consumed — the year you provide the inventory to your customers — or the year you pay for or incur the cost under your accounting method, whichever is later'],
            ['Follow your financial accounting treatment', 'The method used in your applicable financial statement, or, if you have none, in your books and records prepared under your accounting procedures'],
          ]}
        />
        <p>
          The two simpler methods are available only to small business taxpayers, and your method must still <strong>clearly reflect income</strong>. Under the materials-and-supplies method, inventory costs are recovered in the later of the year the goods are provided to customers or the year the cost is paid or incurred, so paying for inventory does not by itself create a deduction. The financial-accounting method follows how your applicable financial statement or your books treat inventory, so the timing depends on those records; get professional advice before relying on it for an earlier deduction. Small business taxpayers are also exempt from the uniform capitalization rules, which otherwise require some direct and indirect costs to be included in inventory.
        </p>
        <p>
          <strong>Example:</strong> a seller using the non-incidental materials and supplies method pays $5,000 for goods in December 2025 and ships them to customers in February 2026. The cost is deducted in 2026, the year the goods are provided to customers. If instead the seller, using the cash method, shipped the goods to customers in December 2025 but did not pay for them until January 2026, the cost would also be deducted in 2026 — the later of the two years.
        </p>

        <h2>Inventory, operating expenses, and capital purchases</h2>
        <ArticleTable
          head={['Type of cost', 'Examples', 'How it is recovered']}
          rows={[
            ['Inventory', 'Goods bought for resale, raw materials, items you produce for sale', 'Cost of goods sold (Part III) under your inventory method'],
            ['Ordinary operating expenses', 'Advertising, rent, platform fees, software subscriptions', 'Deducted in Part II'],
            ['Capital expenditures', 'Equipment, vehicles, furniture with a useful life of more than a year', 'Depreciation, or section 179 or bonus depreciation if eligible'],
          ]}
        />

        <h2>Accounting methods and Form 3115</h2>
        <ul>
          <li>You choose your accounting method when you file your first return that includes Schedule C for the business; no Form 3115 is needed for that first choice.</li>
          <li>After that, changing your method — including your method for inventory — generally requires IRS approval, usually by filing <strong>Form 3115</strong>.</li>
          <li>If your gross receipts grow past the limit, you may no longer qualify for the small business exceptions, which can require a change in method.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A year-end buying spree does not create a deduction</div>
          <p>Buying extra stock in December does not lower your taxes for that year if the goods are still on hand. If you keep an inventory or use the materials-and-supplies method, goods still on hand at year end generally are not deducted until they are sold or provided to customers. Count your ending inventory carefully and keep purchase records.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '72',
  title:         'Charitable Donations in 2026: The New Deduction If You Don\'t Itemize',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal charitable contribution deductions for tax years 2025 and 2026 — the new deduction for people who do not itemize (starting 2026) and the 2026 changes for itemizers — based on the IRS Working Families Tax Cuts page, Publication 505 (2026), Publication 526 (2025), and the 2026 Form W-4. 2026 form line numbers come from draft forms. It does not cover noncash gift valuation, business giving, or state rules',
  persona:       ['People who take the standard deduction and give to charity', 'Itemizers who make large charitable gifts', 'Families planning year-end giving', 'Donors to religious organizations'],
  relatedJourney: ['Preparing to file', 'Understanding new tax rules'],
  actionRequired: 'Keep a bank record or written receipt for every cash gift, and get a written acknowledgment for gifts of $250 or more. Starting with 2026, if you take the standard deduction, track cash gifts to eligible charities — up to $1,000 ($2,000 married filing jointly) can be deducted.',
  sources: [
    { label: 'IRS — Working Families Tax Cuts (deduction for charitable cash contributions by individuals who do not itemize)', url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions' },
    { label: 'IRS — Publication 505 (2026), Tax Withholding and Estimated Tax', url: 'https://www.irs.gov/pub/irs-pdf/p505.pdf' },
    { label: 'IRS — Publication 526 (2025), Charitable Contributions', url: 'https://www.irs.gov/pub/irs-pdf/p526.pdf' },
    { label: 'IRS — Form W-4 (2026), Step 4(b) Deductions Worksheet', url: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf' },
    { label: 'IRS — Draft 2026 Form 1040 (not final)', url: 'https://www.irs.gov/pub/irs-dft/f1040--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: 'I take the standard deduction. Can I deduct my donations for 2025?',
    a: 'No. For 2025, you generally must itemize on Schedule A to deduct charitable contributions. The new deduction for people who do not itemize begins with tax year 2026.',
  },
  {
    q: 'How much can I deduct in 2026 without itemizing?',
    a: 'Up to $1,000 of cash contributions to eligible charitable organizations, or up to $2,000 if married filing jointly. Publication 505 says to add this amount to your standard deduction.',
  },
  {
    q: 'Does donating clothes or stock count?',
    a: 'Not for the non-itemizer deduction. Noncash contributions, such as clothing, stock, or other property, do not qualify. Itemizers may still deduct qualifying noncash gifts under the usual rules.',
  },
  {
    q: 'Can I give to my donor-advised fund and take the new deduction?',
    a: 'No. The IRS says contributions to donor-advised funds and supporting organizations do not qualify for the non-itemizer deduction.',
  },
  {
    q: 'What changes in 2026 if I itemize?',
    a: 'Beginning in 2026, itemizers can deduct charitable contributions only to the extent they are more than 0.5% of adjusted gross income. In addition, total itemized deductions may be reduced for people with taxable income above $640,600 (single or head of household), $768,700 (married filing jointly or qualifying surviving spouse), or $384,350 (married filing separately).',
  },
  {
    q: 'Does my state follow these rules?',
    a: 'Not necessarily. State income tax rules can differ from federal law. This guide covers federal rules only.',
  },
]

const RELATED = [
  {
    href: '/library/individual/tax-law-changes-2025-2026',
    cat:  'Individuals & Families',
    title: 'The 2025 Tax Law: What Changed for Your 2025 and 2026 Returns',
    desc:  'All the major changes, year by year.',
  },
  {
    href: '/library/individual/salt-deduction',
    cat:  'Individuals & Families',
    title: 'SALT Deduction: Limits, Income Rules, and Examples',
    desc:  'Another itemized deduction — and when itemizing helps.',
  },
  {
    href: '/library/individual/tax-credit-vs-deduction',
    cat:  'Individuals & Families',
    title: 'Tax credit vs. tax deduction: what\'s the difference?',
    desc:  'Standard vs. itemized deductions explained.',
  },
]

export default function CharitableDeduction2026Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Charitable Donations in 2026: Deduction Without Itemizing | AskLinTax',
      description: 'Starting in 2026, people who do not itemize can deduct up to $1,000 ($2,000 joint) of cash gifts to charity. What qualifies, what does not, and the new 0.5% floor for itemizers.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <ul>
          <li><strong>2025:</strong> you generally must <strong>itemize</strong> on Schedule A to deduct charitable contributions.</li>
          <li><strong>Starting in 2026:</strong> if you take the <strong>standard deduction</strong>, you can also deduct up to <strong>$1,000</strong> of <strong>cash</strong> contributions to eligible charities (<strong>$2,000</strong> if married filing jointly). The IRS describes this deduction as permanent.</li>
          <li><strong>Itemizers in 2026:</strong> charitable contributions count only to the extent they are more than <strong>0.5% of adjusted gross income (AGI)</strong>, and total itemized deductions may be reduced at very high incomes.</li>
        </ul>

        <h2>The new deduction for people who do not itemize (2026)</h2>
        <ArticleTable
          head={['Rule', 'Details']}
          rows={[
            ['Starts', 'Tax year 2026'],
            ['Amount', 'Up to $1,000; up to $2,000 for married filing jointly'],
            ['Who', 'People who take the standard deduction'],
            ['What counts', 'Cash contributions (including by check) made during the year to eligible charitable organizations — generally organizations that are religious, charitable, educational, scientific, or literary in purpose'],
            ['Does not count', 'Gifts to donor-advised funds or supporting organizations; noncash gifts such as clothing, stock, or other property; carryovers from earlier years'],
            ['How it is claimed', 'Added to your standard deduction; the draft 2026 Form 1040 has a separate line (12f) for it — check the final form'],
          ]}
        />

        <h2>If you itemize: 2025 vs. 2026</h2>
        <ArticleTable
          head={['Rule', '2025', '2026']}
          rows={[
            ['Where claimed', 'Schedule A', 'Schedule A'],
            ['0.5% floor', 'No floor', 'Only contributions above 0.5% of AGI can be deducted'],
            ['Cash gifts to most public charities', 'Generally limited to 60% of AGI', 'This guide does not state a 2026 percentage limit; check the 2026 Schedule A instructions'],
            ['Overall limit on itemized deductions', 'Not covered here', 'Total itemized deductions may be reduced if taxable income is over $640,600 (single or head of household), $768,700 (married filing jointly or qualifying surviving spouse), or $384,350 (married filing separately)'],
          ]}
        />
        <p>
          Publication 505 (2026) says amounts under the 0.5% floor cannot be deducted in 2026. It does not say whether they carry forward to later years.
        </p>

        <h2>Records you need (both years)</h2>
        <ul>
          <li><strong>Any cash gift:</strong> keep a bank record (such as a canceled check or bank or credit card statement) or a written communication from the charity showing its name, the date, and the amount.</li>
          <li><strong>$250 or more:</strong> you need a contemporaneous written acknowledgment from the charity (or certain payroll records) for each separate contribution of $250 or more. Separate gifts are not added together for this rule.</li>
        </ul>
        <p>
          These recordkeeping rules come from Publication 526 (2025). The IRS has not published separate documentation rules for the 2026 non-itemizer deduction in the sources reviewed for this guide.
        </p>

        <h2>Examples (illustrative, 2026)</h2>
        <p>
          <strong>Anna</strong> is single and takes the standard deduction. She gives $600 in cash to her church and donates $300 of used clothing to a thrift store run by a charity. She can deduct <strong>$600</strong> — the clothing is a noncash gift and does not count for the non-itemizer deduction.
        </p>
        <p>
          <strong>Tom and Lisa</strong> file jointly, take the standard deduction, and give $3,000 in cash to qualifying charities. They can deduct <strong>$2,000</strong>, the maximum for a joint return.
        </p>
        <p>
          <strong>Kevin</strong> takes the standard deduction and puts $1,000 into his donor-advised fund. That contribution does <strong>not</strong> qualify for the non-itemizer deduction.
        </p>
        <p>
          <strong>Mei</strong> itemizes, has AGI of $100,000, and gives $5,000 in cash to charity. The 0.5% floor is $500, so she can include <strong>$4,500</strong> on Schedule A, subject to the other limits.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"I can deduct donations without itemizing on my 2025 return."</strong> The non-itemizer deduction starts with 2026.</li>
          <li><strong>"All donations count."</strong> The non-itemizer deduction is for cash gifts to eligible charities only — not donor-advised funds, supporting organizations, or property.</li>
          <li><strong>"Itemizers can deduct every dollar in 2026."</strong> Starting in 2026, only gifts above 0.5% of AGI count, and other limits may apply.</li>
          <li><strong>"Small gifts don't need records."</strong> Every cash gift needs a bank record or written receipt.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 2026 forms are still drafts</div>
          <p>The 2026 Form 1040 and Schedule A were available only as drafts when this guide was reviewed, and the 2026 Publication 526 had not been published. Check the final forms and instructions. State income tax rules can differ from federal law.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

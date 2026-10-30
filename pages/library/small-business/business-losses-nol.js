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
  id:            '130',
  title:         'Business Losses: Basis, At-Risk, Passive Activity, Excess Business Loss, and NOL Rules',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'learning',
  difficulty:    'Advanced',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Introduces the federal limits on deducting business losses, based on the Instructions for Form 461 (2025), the Instructions for Form 172 (Rev. December 2024), the Instructions for Form 1045 (2025), the Instructions for Form 1120 (2025), the Instructions for Form 7203, Publication 925 (2025), Rev. Proc. 2024-40 (2025 amounts), and Rev. Proc. 2025-32 (2026 amounts). Publication 536 is no longer revised. It does not cover section 382 limits, consolidated returns, farming loss carryback computations, or partner basis calculations in detail',
  persona:       ['Business owners with a loss year', 'S corporation shareholders and LLC members receiving loss K-1s', 'Investors in businesses they do not run', 'High-income taxpayers with large business losses'],
  relatedJourney: ['Running a small business', 'Understanding new tax rules'],
  actionRequired: 'Before deducting a business loss, apply the limits in order: basis (for partners and S corporation shareholders), at-risk, passive activity, and — for individuals, estates, and trusts — the excess business loss limit. Track every amount that is suspended or carried forward, because those amounts can be used in later years only if you keep records of them.',
  sources: [
    { label: 'IRS — Instructions for Form 461 (2025), Limitation on Business Losses', url: 'https://www.irs.gov/pub/irs-pdf/i461.pdf' },
    { label: 'IRS — Instructions for Form 172 (Rev. December 2024), Net Operating Losses for Individuals, Estates, and Trusts', url: 'https://www.irs.gov/pub/irs-pdf/i172.pdf' },
    { label: 'IRS — Instructions for Form 1045 (2025), Application for Tentative Refund', url: 'https://www.irs.gov/pub/irs-pdf/i1045.pdf' },
    { label: 'IRS — Instructions for Form 1120 (2025)', url: 'https://www.irs.gov/pub/irs-pdf/i1120.pdf' },
    { label: 'IRS — Instructions for Form 7203, S Corporation Shareholder Stock and Debt Basis Limitations', url: 'https://www.irs.gov/pub/irs-pdf/i7203.pdf' },
    { label: 'IRS — Publication 925 (2025), Passive Activity and At-Risk Rules', url: 'https://www.irs.gov/pub/irs-pdf/p925.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'In what order do the loss limits apply?',
    a: 'Basis first (for partners and S corporation shareholders), then the at-risk rules, then the passive activity rules, and then the excess business loss limit for noncorporate taxpayers. Only what is left after those limits can contribute to a net operating loss (NOL).',
  },
  {
    q: 'Is the excess business loss limit the same as the NOL deduction?',
    a: 'No. The excess business loss limit caps how much net business loss an individual, estate, or trust can deduct in the loss year — for 2026, $256,000 ($512,000 on a joint return). The disallowed excess is then treated as an NOL carryover to later years. The NOL deduction is the separate rule for using that carryover in a later year, generally limited to 80% of taxable income.',
  },
  {
    q: 'Can I carry a business loss back to get a refund of earlier taxes?',
    a: 'Generally no. NOLs arising in tax years after 2020 can generally only be carried forward. The main exceptions are farming losses and certain insurance company losses, which can be carried back 2 years. Individuals, estates, and trusts can use Form 1045 for a quick refund of a carryback; corporations use Form 1139.',
  },
  {
    q: 'Does every business loss become an NOL?',
    a: 'No. Losses suspended by the basis, at-risk, or passive activity rules are not NOLs; they stay suspended until those rules allow them. Capital losses in excess of capital gains, nonbusiness deductions in excess of nonbusiness income, the NOL deduction itself, and the qualified business income deduction are also not allowed when figuring an individual\'s NOL.',
  },
  {
    q: 'Do C corporations have an excess business loss limit?',
    a: 'No. The excess business loss limit applies to noncorporate taxpayers. A C corporation can have an NOL, which it generally carries forward and deducts subject to the 80% of taxable income limit. Some closely held C corporations and personal service corporations are subject to the at-risk or passive activity rules.',
  },
  {
    q: 'When are suspended losses released?',
    a: 'Losses limited by basis are carried forward indefinitely and can be deducted when you have enough basis. Losses limited by the at-risk rules are treated as a deduction from the same activity in the next year. Suspended passive losses are generally allowed in full when you dispose of your entire interest in the activity in a fully taxable transaction to an unrelated person.',
  },
]

const RELATED = [
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'Where a sole proprietor\'s loss starts.',
  },
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: 'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1',
    desc:  'Partner basis and loss limits on a K-1.',
  },
  {
    href: '/library/rental/passive-activity-loss-rules',
    cat:  'Real Estate & Airbnb',
    title: 'Rental Losses and the Passive Activity Rules: The $25,000 Allowance and Real Estate Professionals',
    desc:  'How the passive activity rules work in detail.',
  },
  {
    href: '/library/individual/alternative-minimum-tax',
    cat:  'Individuals & Families',
    title: 'Alternative Minimum Tax (AMT): 2025 and 2026 Rules',
    desc:  'Carrying back an NOL can create AMT for the earlier year.',
  },
]

export default function BusinessLossesNolPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Business Losses: Basis, At-Risk, Passive Activity, Excess Business Loss, and NOL Rules | AskLinTax',
      description: 'An introduction to the federal limits on business losses: basis, at-risk and passive activity rules, the excess business loss limit ($313,000 for 2025 and $256,000 for 2026), net operating losses, the 80% limit, carryforwards, and the farming carryback exception.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A business loss is not always deductible in full in the year it happens. Up to four limits can apply <strong>in order</strong>: <strong>basis</strong>, <strong>at-risk</strong>, <strong>passive activity</strong>, and — for individuals, estates, and trusts — the <strong>excess business loss</strong> limit. Which ones apply depends on the taxpayer and on how the business is organized; not every business owner is subject to all four. Amounts those limits disallow are suspended or carried forward. Separately, a net loss that remains for the year can create a <strong>net operating loss (NOL)</strong>. The NOL rules are not another limit on the loss year: they govern how that loss is carried to other years, where the deduction is generally limited to <strong>80% of taxable income</strong>.
        </p>

        <h2>The order of the limits and NOL treatment</h2>
        <ArticleTable
          head={['Step', 'Rule', 'Who it applies to', 'Form', 'What happens next']}
          rows={[
            ['1', 'Basis', 'Partners and S corporation shareholders', 'Form 7203 (S corporation shareholders)', 'Carried forward indefinitely until you have enough basis'],
            ['2', 'At-risk', 'Individuals, estates, trusts, and certain closely held corporations', 'Form 6198', 'Treated as a deduction from the same activity in the next year'],
            ['3', 'Passive activity', 'Individuals, estates, trusts, personal service corporations, and closely held corporations', 'Form 8582', 'Suspended until you have passive income or dispose of your entire interest'],
            ['4', 'Excess business loss', 'Noncorporate taxpayers only', 'Form 461', 'Treated as an NOL carryover to later years'],
            ['After the limits', 'NOL treatment (not a fifth limit on the loss year)', 'Individuals, estates, trusts, and C corporations; partnerships and S corporations generally cannot use an NOL, but their owners use their shares', 'Form 172 (individuals, estates, and trusts)', 'The NOL is carried to other years and deducted there, generally subject to the 80% limit'],
          ]}
        />
        <p>
          The IRS instructions for Forms 7203 and 461, and Publication 925, describe this order: basis, then at-risk, then passive activity, then excess business loss.
        </p>

        <h2>Which rules apply to which business</h2>
        <ArticleTable
          head={['Business type', 'Basis limit', 'At-risk and passive activity', 'Excess business loss', 'NOL']}
          rows={[
            ['Sole proprietorship (Schedule C)', 'No separate partner or shareholder basis limit; the owner reports the business directly', 'Apply to the owner', 'Applies to the owner', 'Figured on the owner\'s individual return (Form 172)'],
            ['Partnership or multi-member LLC', 'Applies to each partner (basis in the partnership interest)', 'Apply to each partner, not to the partnership itself', 'Applies to noncorporate partners; the trade or business determination is made at the partnership level', 'The partnership generally cannot use an NOL; partners use their shares'],
            ['S corporation', 'Applies to each shareholder (stock and debt basis, Form 7203)', 'Apply to each shareholder, not to the corporation itself', 'Applies to noncorporate shareholders; the trade or business determination is made at the corporation level', 'The S corporation generally cannot use an NOL; shareholders use their shares'],
            ['C corporation', 'No pass-through to owners; losses stay in the corporation', 'At-risk: only certain closely held corporations. Passive activity: only closely held corporations and personal service corporations', 'Does not apply', 'The corporation has its own NOL (Form 1120), generally subject to the 80% limit'],
          ]}
        />

        <h2>Basis: partners and S corporation shareholders</h2>
        <ul>
          <li><strong>S corporation shareholders</strong> can deduct their share of losses only up to the basis of their stock and of loans they made directly to the corporation. Form 7203 tracks this basis.</li>
          <li><strong>Partners and LLC members</strong> taxed as partners can deduct losses only up to the basis of their partnership interest; see <a href="/library/business-formation/partnership-llc-taxes/">partnership and LLC taxes</a>.</li>
          <li>Losses limited by basis are carried forward indefinitely and deducted in a later year when basis allows.</li>
        </ul>

        <h2>At-risk and passive activity limits</h2>
        <ul>
          <li><strong>At-risk:</strong> you are generally at risk for the money and the adjusted basis of property you put into the activity, and for amounts you borrowed for it if you are personally liable for repayment. Special rules can treat qualified nonrecourse financing secured by real property as at risk.</li>
          <li><strong>Passive activity:</strong> losses from a trade or business in which you do not materially participate, and generally from rental activities, can offset only passive income. Rental real estate has special exceptions; see <a href="/library/rental/passive-activity-loss-rules/">passive activity loss rules</a>.</li>
        </ul>

        <h2>The excess business loss limit</h2>
        <ArticleTable
          head={['Tax year', 'Threshold (single and other filers)', 'Threshold (joint return)', 'Source']}
          rows={[
            ['2025', '$313,000', '$626,000', 'Rev. Proc. 2024-40'],
            ['2026', '$256,000', '$512,000', 'Rev. Proc. 2025-32'],
          ]}
        />
        <p>
          The limit applies to individuals, estates, and trusts — not C corporations. Your net loss from all trades or businesses, after the earlier limits, is allowed only up to the threshold; the excess is an <strong>excess business loss</strong>. Wages from working as an employee are not counted as business income for this calculation. The One Big Beautiful Bill Act made this limit permanent. The disallowed amount is <strong>not lost</strong>: it is treated as an NOL carryover to later years.
        </p>

        <h2>Net operating losses</h2>
        <ul>
          <li><strong>Figuring the NOL:</strong> individuals, estates, and trusts use Form 172. Not every deduction counts — for example, capital losses in excess of capital gains, nonbusiness deductions in excess of nonbusiness income, and the qualified business income deduction are not allowed when figuring an NOL.</li>
          <li><strong>Carryforward:</strong> NOLs arising in tax years after 2020 generally can only be carried forward, and they can be carried forward until used up.</li>
          <li><strong>80% limit:</strong> for tax years beginning after 2020, the deduction for NOLs arising after 2017 is generally limited to 80% of taxable income figured without the NOL deduction (and, for individuals, without the qualified business income deduction). NOLs from tax years beginning before 2018 are not subject to the 80% limit.</li>
          <li><strong>Carryback exceptions:</strong> farming losses — and losses of certain insurance companies other than life insurance companies — can be carried back 2 years. You can elect to waive the carryback with a statement attached to a timely filed return (including extensions); the election is generally irrevocable.</li>
          <li><strong>Quick refunds:</strong> individuals, estates, and trusts can use Form 1045, generally filed within 1 year after the end of the loss year, or Form 1040-X; corporations use Form 1139. A carryback can create alternative minimum tax for the earlier year; see <a href="/library/individual/alternative-minimum-tax/">the AMT</a>.</li>
        </ul>

        <h2>Example (2026, joint return)</h2>
        <p>
          A married couple filing jointly has $900,000 of wages and a $700,000 loss from a business in which one spouse materially participates, with enough basis and amount at risk. The loss is not passive.
        </p>
        <ArticleTable
          head={['Step', 'Amount']}
          rows={[
            ['Net business loss after basis, at-risk, and passive limits', '$700,000'],
            ['2026 excess business loss threshold (joint return)', '$512,000'],
            ['Loss allowed in 2026', '$512,000'],
            ['Excess business loss — carried forward as an NOL', '$188,000'],
          ]}
        />
        <p>
          In 2027, if their taxable income figured without the NOL deduction and the qualified business income deduction is $150,000, the NOL deduction is generally limited to 80% of that amount, or $120,000. The remaining $68,000 carries forward to 2028.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep a running record of every suspended amount</div>
          <p>Suspended basis, at-risk, and passive losses and NOL carryforwards each follow different rules for when they can be used. Keep Forms 7203, 6198, 8582, 461, and 172 — or equivalent worksheets — from every year. The IRS says to keep records for an NOL year for 3 years after you have used the carryback or carryforward, or 3 years after the carryforward expires.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

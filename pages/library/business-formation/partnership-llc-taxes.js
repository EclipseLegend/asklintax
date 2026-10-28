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
  id:            '123',
  title:         'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'An introduction to how a domestic multi-member LLC taxed as a partnership is taxed, based on the 2025 Instructions for Form 1065, the 2025 Partner\'s Instructions for Schedule K-1, Publication 541 (Rev. December 2025), Publication 3402 (Rev. March 2020), the Instructions for Form 7004 (Rev. December 2025), and Rev. Procs. 2024-40 and 2025-32 for penalty amounts. It does not cover partnership audits, elections such as section 754, capital account maintenance, foreign partners, Schedules K-2 and K-3, or state LLC taxes and fees',
  persona:       ['Friends or family starting a business together', 'Co-owners of a rental property LLC', 'Married couples who own a business together', 'Members who received a Schedule K-1'],
  relatedJourney: ['Just formed an LLC', 'Starting a small business'],
  actionRequired: 'If your LLC has two or more members and has not elected to be taxed as a corporation, it generally must file Form 1065 by the 15th day of the 3rd month after its tax year ends (March 16, 2026 for calendar year 2025) and give each member a Schedule K-1. File Form 7004 by that date if you need more time. Members report their shares on their own returns whether or not cash was distributed.',
  sources: [
    { label: 'IRS — Instructions for Form 1065 (2025), U.S. Return of Partnership Income', url: 'https://www.irs.gov/pub/irs-pdf/i1065.pdf' },
    { label: 'IRS — Partner\'s Instructions for Schedule K-1 (Form 1065) (2025)', url: 'https://www.irs.gov/pub/irs-pdf/i1065sk1.pdf' },
    { label: 'IRS — Publication 541 (Rev. December 2025), Partnerships', url: 'https://www.irs.gov/pub/irs-pdf/p541.pdf' },
    { label: 'IRS — Publication 3402 (Rev. March 2020), Taxation of Limited Liability Companies', url: 'https://www.irs.gov/pub/irs-pdf/p3402.pdf' },
    { label: 'IRS — Instructions for Form 7004 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i7004.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (amounts for 2026 filings)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (amounts for 2027 filings)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'How is a multi-member LLC taxed?',
    a: 'An LLC is a state-law legal entity, not a federal tax category. By default, a domestic LLC with at least two members is classified as a partnership for federal tax purposes unless it elects to be treated as a corporation on Form 8832. As a partnership, it files Form 1065 but generally pays no federal income tax itself; each member pays tax on their share.',
  },
  {
    q: 'Do I pay tax on partnership income I did not receive in cash?',
    a: 'Yes. The Schedule K-1 instructions say you may be liable for tax on your share of the partnership income, whether or not it is distributed. Distributions and taxable income are different things.',
  },
  {
    q: 'What are guaranteed payments?',
    a: 'Payments to a partner for services or for the use of capital that are determined without regard to the partnership\'s income — similar to a salary. The partnership generally deducts them, and the partner reports them as ordinary income. They are not subject to income tax withholding, and a partner reports the full amount even if the partnership has a loss.',
  },
  {
    q: 'Do LLC members pay self-employment tax?',
    a: 'It depends on the member\'s role. For general partners, the share of ordinary business income and guaranteed payments are generally net earnings from self-employment. For limited partners, generally only guaranteed payments for services count. Whether an LLC member is treated as a limited partner for this purpose depends on section 1402(a)(13), which can require professional judgment.',
  },
  {
    q: 'When is Form 1065 due, and can I extend it?',
    a: 'By the 15th day of the 3rd month after the tax year ends. For calendar year 2025, that is March 16, 2026, because March 15 fell on a weekend. Form 7004, filed by the original due date, generally gives an automatic 6-month extension of time to file. It does not extend each partner\'s own tax payment deadline.',
  },
  {
    q: 'My spouse and I own an LLC together. Must we file Form 1065?',
    a: 'Generally, a business co-owned and operated by spouses is a partnership. The qualified joint venture election that lets spouses skip Form 1065 is not available if the business is held in a state-law entity such as an LLC. A separate rule lets spouses who wholly own an entity as community property — under the laws of a community property state, foreign country, or U.S. possession — choose partnership or disregarded-entity treatment. Get advice before relying on either.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation & Structure',
    title: 'What is an LLC, and do I need one?',
    desc:  'LLC basics before you choose a tax treatment.',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation & Structure',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'When a corporate tax election may make sense.',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business & Self-Employment',
    title: 'The QBI Deduction: 2025 and 2026 Rules',
    desc:  'Partners may qualify for the QBI deduction.',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation & Structure',
    title: 'How to apply for an EIN: a step-by-step guide',
    desc:  'A partnership needs its own EIN.',
  },
]

export default function PartnershipLlcTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1 | AskLinTax',
      description: 'How a multi-member LLC is taxed as a partnership: default classification, Form 1065 and Schedule K-1, distributive shares, guaranteed payments, self-employment tax, due dates and Form 7004 extensions, 2026 and 2027 penalties, basis limits, and spouse-owned LLCs.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A domestic LLC with two or more members is, by default, taxed as a <strong>partnership</strong>. The LLC files an information return, <strong>Form 1065</strong>, and gives each member a <strong>Schedule K-1</strong> showing their share of income, deductions, and credits. The partnership generally pays no federal income tax; the members do, on their <strong>distributive shares</strong>, whether or not they took the money out.
        </p>

        <h2>Legal structure vs. tax classification</h2>
        <ArticleTable
          head={['Layer', 'What it means']}
          rows={[
            ['LLC (state law)', 'A legal entity formed under state law that can limit owners\' liability; it is not itself a federal tax classification'],
            ['Default federal classification', 'Two or more members: partnership. One member: disregarded entity'],
            ['Partnership taxation', 'Form 1065 and Schedules K-1; income passes through to members'],
            ['Corporate election', 'An LLC can elect on Form 8832 to be taxed as a corporation, and then may elect S corporation status'],
          ]}
        />
        <p>
          If membership drops to one, a partnership LLC becomes a disregarded entity; if a single-member LLC adds a member, it becomes a partnership, unless it has elected corporate treatment. For the corporate option, see <a href="/library/business-formation/llc-vs-scorp/">LLC vs. S-Corp</a>.
        </p>

        <h2>How income flows to members</h2>
        <ul>
          <li><strong>Distributive share:</strong> each member's share of income, gain, loss, deduction, and credit, generally under the partnership agreement, reported on Schedule K-1.</li>
          <li><strong>Taxed whether or not distributed:</strong> cash distributions are not the same as taxable income.</li>
          <li><strong>Separately stated items:</strong> rental income and portfolio income, such as interest, dividends, and capital gains, are reported separately from the partnership's trade or business income.</li>
          <li><strong>Guaranteed payments:</strong> fixed payments for services or capital, determined without regard to partnership income; deductible by the partnership and ordinary income to the member, with no income tax withholding.</li>
        </ul>

        <h2>Self-employment tax: depends on the member</h2>
        <ArticleTable
          head={['Member', 'Generally included in net earnings from self-employment']}
          rows={[
            ['General partner', 'Share of ordinary business income plus guaranteed payments'],
            ['Limited partner', 'Generally only guaranteed payments for services'],
            ['LLC member', 'Depends on whether the member is treated as a limited partner under section 1402(a)(13) — not settled by LLC status alone'],
          ]}
        />
        <p>Rental real estate income is generally not net earnings from self-employment.</p>

        <h2>Deadlines and extensions</h2>
        <ArticleTable
          head={['Item', 'Calendar year 2025 partnership']}
          rows={[
            ['Form 1065 due', 'The 15th day of the 3rd month after year-end: March 16, 2026 (March 15 fell on a weekend)'],
            ['Extension', 'Form 7004 filed by the original due date — generally an automatic 6-month extension of time to file'],
            ['Schedule K-1', 'Attached to Form 1065 and furnished to each partner when due'],
            ['Partners\' own returns', 'Their individual deadlines and tax payments are separate; the partnership extension does not extend them'],
          ]}
        />

        <h2>Penalties: two different kinds</h2>
        <ArticleTable
          head={['Penalty', 'Returns or statements due in 2026', 'Due in 2027']}
          rows={[
            ['Late or incomplete Form 1065 (section 6698)', '$255 per partner per month, up to 12 months', '$260 per partner per month, up to 12 months'],
            ['Late, missing, or incorrect Schedule K-1 to a partner (section 6722)', '$340 per Schedule K-1, with annual caps', '$340 per Schedule K-1, with higher annual caps'],
          ]}
        />
        <p>
          The return penalty multiplies by the number of partners, so even a small LLC with three members that files three months late on a 2025 return faces $255 × 3 × 3 = $2,295, unless the failure is due to reasonable cause.
        </p>

        <h2>Basic limits on deducting losses</h2>
        <ul>
          <li><strong>Basis first:</strong> a partner can deduct a share of partnership losses only up to their adjusted basis in the partnership at year-end; unused losses carry forward.</li>
          <li><strong>Basis includes</strong> contributions, the partner's share of income, and generally a share of partnership liabilities, reduced by distributions and losses.</li>
          <li><strong>Then</strong> the at-risk rules, passive activity rules, and excess business loss limitation apply, in that order.</li>
        </ul>

        <h2>Spouse-owned businesses</h2>
        <ul>
          <li><strong>General rule:</strong> spouses who jointly own and operate an unincorporated business and share profits and losses are partners and must file Form 1065.</li>
          <li><strong>Qualified joint venture:</strong> spouses filing jointly who both materially participate can elect out of partnership treatment — but not if the business is held in a state-law entity such as an LLC.</li>
          <li><strong>Community property:</strong> if spouses wholly own an entity as community property under the laws of a state, foreign country, or U.S. possession, no one else is an owner, and it is not treated as a corporation, they can choose to treat it as a partnership or as a disregarded entity. A change in reporting position is treated as a conversion of the entity.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Put it in writing</div>
          <p>A written operating agreement that sets out how profits, losses, distributions, and guaranteed payments are shared makes the K-1s easier to prepare and defend. Partnership tax can become complex quickly — consider a tax professional for the first year's return.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

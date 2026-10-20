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
  id:            '76',
  title:         'Single-Member LLC Taxes: Disregarded Entity, Schedule C, EIN and W-9 Rules',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how the IRS taxes a single-member LLC for tax years 2025 and 2026, based on the IRS single-member LLC guidance, Publication 334 (2025), the Instructions for Schedule C and Schedule SE (2025), Form W-9 and its instructions, and the Instructions for Forms 2553 and 5472. It covers federal rules only; state LLC taxes and fees are not verified here',
  persona:       ['One-owner LLCs', 'Freelancers who formed an LLC', 'New LLC owners filing for the first time', 'Married couples who own an LLC together'],
  relatedJourney: ['Starting a small business', 'First year of self-employment'],
  actionRequired: 'If your LLC has one owner and has not elected corporate tax treatment, report its business income on your own return (usually Schedule C) and pay self-employment tax on Schedule SE. Get an EIN for the LLC if it will have employees or owe certain excise taxes, and give clients a Form W-9 with your own taxpayer identification number.',
  sources: [
    { label: 'IRS — Single member limited liability companies', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies' },
    { label: 'IRS — Limited liability company (LLC)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc' },
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Instructions for Schedule C (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sc' },
    { label: 'IRS — Instructions for Schedule SE (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sse' },
    { label: 'IRS — Form W-9 (Rev. March 2024), Request for Taxpayer Identification Number and Certification', url: 'https://www.irs.gov/pub/irs-pdf/fw9.pdf' },
    { label: 'IRS — Instructions for Form 2553 (Rev. December 2020)', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Instructions for Form 5472', url: 'https://www.irs.gov/instructions/i5472' },
    { label: 'IRS — Publication 15 (2026), Employer\'s Tax Guide', url: 'https://www.irs.gov/pub/irs-pdf/p15.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does my single-member LLC file its own tax return?',
    a: 'Not for federal income tax, unless it elects to be taxed as a corporation. A single-member LLC is a "disregarded entity" by default, so its income and expenses go on the owner\'s return — usually Schedule C if the owner is an individual running a business.',
  },
  {
    q: 'Does forming an LLC lower my taxes?',
    a: 'Not by itself. An individual owner of a single-member LLC that runs a business pays self-employment tax in the same way as a sole proprietor. Tax treatment changes only if the LLC elects to be taxed as a corporation, such as an S corporation.',
  },
  {
    q: 'Do I need an EIN for my single-member LLC?',
    a: 'The IRS says a disregarded single-member LLC needs its own EIN if it has employees or must file certain excise tax returns. If it has neither, it can use the owner\'s name and taxpayer identification number for federal tax purposes, but it may still get an EIN — for example, to open a bank account or if state law requires one.',
  },
  {
    q: 'Which number goes on the Form W-9 a client asks me for?',
    a: 'For a disregarded LLC with a U.S. owner, the Form W-9 should show the owner\'s Social Security number or EIN — not the LLC\'s EIN. The owner\'s name goes on line 1 and the LLC\'s name on line 2, and the box on line 3a is the owner\'s tax classification (for example, individual/sole proprietor).',
  },
  {
    q: 'My spouse and I own the LLC together. Is it still a single-member LLC?',
    a: 'Generally no. An LLC owned by a married couple in a non-community-property state should file as a partnership. In a community property state, if the spouses own it as community property and no one else is an owner, the IRS will accept treating it as either a disregarded entity or a partnership under Rev. Proc. 2002-69.',
  },
  {
    q: 'I am not a U.S. person and I own a U.S. single-member LLC. Is there anything extra?',
    a: 'Yes. A U.S. disregarded entity wholly owned by a foreign person must generally file Form 5472 attached to a pro forma Form 1120 if it had reportable transactions with related parties, and the IRS can assess a $25,000 penalty for failing to file. Get professional help with this situation.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation',
    title: 'What is an LLC, and do I need one?',
    desc:  'What an LLC is and what it does — and does not — do for you.',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'Where a single-member LLC\'s business income usually goes.',
  },
  {
    href: '/library/business-formation/llc-vs-scorp',
    cat:  'Business Formation',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'When electing S-Corp treatment for your LLC may make sense.',
  },
]

export default function SingleMemberLlcTaxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Single-Member LLC Taxes: Disregarded Entity, Schedule C & EIN | AskLinTax',
      description: 'How the IRS taxes a single-member LLC: disregarded entity status, Schedule C and self-employment tax, when the LLC needs an EIN, and how to fill out Form W-9.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>single-member LLC</strong> is an LLC with one owner. For federal income tax, the IRS treats it as a <strong>"disregarded entity"</strong> — as if the LLC were not separate from its owner — unless the LLC elects to be taxed as a corporation. If you are an individual and the LLC runs a business, you generally report its income and expenses on <strong>Schedule C</strong> of your own Form 1040 and pay <strong>self-employment tax</strong> on <strong>Schedule SE</strong>, just like a sole proprietor.
        </p>
        <p>
          The LLC is <strong>not</strong> disregarded for every purpose, though. For <strong>employment taxes</strong> and certain <strong>excise taxes</strong>, the IRS treats a single-member LLC as a separate entity that uses its own name and EIN.
        </p>

        <h2>How the IRS classifies an LLC</h2>
        <ArticleTable
          head={['LLC', 'Default federal income tax treatment', 'Can elect']}
          rows={[
            ['One member', 'Disregarded entity — reported on the owner\'s return', 'Corporation (Form 8832) or S corporation (Form 2553)'],
            ['Two or more members', 'Partnership — files Form 1065', 'Corporation (Form 8832) or S corporation (Form 2553)'],
          ]}
        />
        <p>
          An LLC that is eligible to be treated as a corporation and files a timely Form 2553 is treated as a corporation from the S election's effective date and does not also need to file Form 8832. This guide covers single-member LLCs that keep the default treatment.
        </p>

        <h2>Where the income goes on your return</h2>
        <ArticleTable
          head={['What the LLC does', 'Where an individual owner usually reports it']}
          rows={[
            ['Runs a business (consulting, design, online store)', 'Schedule C, Profit or Loss From Business'],
            ['Holds rental real estate', 'Schedule E, Supplemental Income and Loss'],
            ['Farms', 'Schedule F, Profit or Loss From Farming'],
          ]}
        />
        <p>
          If the owner is a corporation or partnership instead of an individual, the LLC is reported on the owner's return as a division of that owner.
        </p>

        <h2>Self-employment tax</h2>
        <p>
          The IRS says an individual owner of a single-member LLC that operates a trade or business is subject to self-employment tax in the same way as a sole proprietor. Self-employment tax is generally figured on 92.35% of net earnings from self-employment when those earnings are $400 or more. The Social Security part (12.4%) applies only up to the annual wage base — <strong>$176,100 for 2025</strong> and <strong>$184,500 for 2026</strong> — while the Medicare part (2.9%) has no limit. See <a href="/library/small-business/self-employment-tax/">self-employment tax</a>.
        </p>

        <h2>EIN or Social Security number?</h2>
        <ArticleTable
          head={['Purpose', 'Which name and number to use']}
          rows={[
            ['Income tax returns and information returns (for example, a Form 1099 a client sends you)', 'The owner\'s name and SSN or EIN'],
            ['Form W-9 you give to clients', 'Line 1: owner\'s name. Line 2: the LLC\'s name. Line 3a: the owner\'s classification (for example, individual/sole proprietor). TIN: the owner\'s SSN or EIN — not the LLC\'s EIN'],
            ['Employment taxes (wages paid after January 1, 2009)', 'The LLC\'s own name and EIN'],
            ['Certain excise taxes (Forms 720, 730, 2290, 11-C, and registration on Form 637)', 'The LLC\'s own name and EIN'],
          ]}
        />
        <p>
          According to the IRS, a single-member LLC needs its own EIN if it has <strong>employees</strong> or must file certain <strong>excise tax</strong> forms, and most new single-member LLCs will need one. If it has neither, it can use the owner's name and TIN, but it can still get an EIN if a bank or state law requires one. See <a href="/library/business-formation/ein/">how to apply for an EIN</a>.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>Lily</strong> owns a one-member design LLC and has not made any election. In 2025 the LLC's net profit is $60,000. She reports it on Schedule C of her own return. Her self-employment tax is about <strong>$8,478</strong> ($60,000 × 92.35% × 15.3%), plus regular income tax on the profit. The LLC files no separate federal income tax return.
        </p>
        <p>
          <strong>Omar</strong> owns a one-member LLC and hires his first employee in 2026. The LLC must use its own name and EIN to report and pay employment taxes for that employee, even though Omar still reports the LLC's profit on his own Schedule C.
        </p>
        <p>
          <strong>Grace and Tom</strong> are married and own an LLC together in a state that is not a community property state. The IRS says their LLC should file as a partnership (Form 1065), not as a single-member LLC.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Putting the LLC's EIN on a Form W-9.</strong> For a disregarded LLC with a U.S. owner, use the owner's TIN.</li>
          <li><strong>Assuming the LLC files its own Form 1120 or 1065.</strong> A one-member LLC with default treatment does not — its activity goes on the owner's return.</li>
          <li><strong>Forgetting employment tax rules once you hire.</strong> Payroll taxes are reported under the LLC's own name and EIN.</li>
          <li><strong>Expecting the LLC to cut self-employment tax.</strong> Default treatment gives the same self-employment tax as a sole proprietorship.</li>
          <li><strong>Treating a married couple's LLC as single-member</strong> without checking the community property rules.</li>
          <li><strong>Skipping estimated tax payments.</strong> No one withholds tax from LLC profits. See <a href="/library/small-business/quarterly-taxes/">quarterly estimated taxes</a>.</li>
        </ul>

        <h2>IRS forms you may need</h2>
        <ArticleTable
          head={['Form', 'What it is for']}
          rows={[
            ['Schedule C (or E or F)', 'Report the LLC\'s income and expenses on your Form 1040'],
            ['Schedule SE', 'Figure self-employment tax'],
            ['Form 1040-ES', 'Make quarterly estimated tax payments'],
            ['Form SS-4', 'Apply for an EIN (also available online)'],
            ['Form W-9', 'Give your taxpayer identification number to clients'],
            ['Forms 941 and 940', 'Employment tax returns, if the LLC has employees'],
            ['Form 8832 or Form 2553', 'Elect to be taxed as a corporation or as an S corporation'],
            ['Form 5472 with a pro forma Form 1120', 'Required in many cases if the LLC is wholly owned by a foreign person'],
          ]}
        />

        <h2>California considerations</h2>
        <p>
          States can tax LLCs differently from the federal rules, and California has its own LLC tax, fee, and return requirements. AskLinTax has not verified the current California amounts and filing rules against Franchise Tax Board sources for this guide, so this guide does not state them. Check the California Franchise Tax Board before relying on any specific amount.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Federal rules only</div>
          <p>This guide explains federal tax treatment for tax years 2025 and 2026. Your state may require its own LLC return, tax, or fee even when the LLC is disregarded for federal income tax.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

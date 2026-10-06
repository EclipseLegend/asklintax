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
  id:            '40',
  title:         'Foreign gift from your parents vs. foreign trust distribution — why the difference matters',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Advanced',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains, at a high level, why a gift from a nonresident individual and a distribution from a foreign trust are different reporting categories on Form 3520 for U.S. citizens and resident aliens. It does not explain how to calculate the tax on a foreign trust distribution, or the trust\'s own filings — foreign trust situations need professional review',
  persona:       ['Beneficiaries of a family trust set up abroad', 'Anyone receiving money from a parent\'s trust, foundation, or similar arrangement overseas', 'Heirs whose inheritance passes through a trust', 'Tax preparers checking which part of Form 3520 applies'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Find out exactly who sent the money: your parent personally, or a trust (or trust-like arrangement) abroad. A distribution from a foreign trust is reported in Part III of Form 3520, not Part IV, has a much larger penalty if missed, and may be taxable. If a foreign trust is involved, get professional help before you file.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Parts III and IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 (Rev. December 2023)', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — Instructions for Form 3520-A (Rev. December 2025)', url: 'https://www.irs.gov/instructions/i3520a' },
  ],
}

const FAQS = [
  {
    q: 'My father says the money is a gift, but it came from his family trust. Is it a gift?',
    a: 'For Form 3520, an amount you receive from a foreign trust is reported as a distribution in Part III — not as a gift in Part IV — even if the family thinks of it as a gift. If an amount would otherwise be reportable in both Parts III and IV, the IRS says to report it only in Part III.',
  },
  {
    q: 'Is a foreign trust distribution taxable?',
    a: 'It may be. It depends on the type of trust and what the distribution carries out. For example, if you receive a complete Foreign Grantor Trust Beneficiary Statement, the instructions say to treat the distribution as if it came directly from the trust\'s owner — so a distribution that is a gift from the owner is not included in your gross income. Other distributions can be taxable, sometimes under special rules. This needs professional analysis.',
  },
  {
    q: 'Is there a $100,000 threshold for trust distributions like there is for gifts?',
    a: 'No. The more-than-$100,000 test is the Part IV rule for gifts and bequests from nonresident aliens and foreign estates. Part III is completed by a U.S. person who received a distribution from a foreign trust during the year — the gift threshold does not apply.',
  },
  {
    q: 'What is the penalty if I don\'t report a foreign trust distribution?',
    a: 'Under the Form 3520 instructions, the initial penalty for failing to report a distribution from a foreign trust is the greater of $10,000 or 35% of the gross value of the distributions. Reasonable cause can prevent a penalty, but it is decided on the facts.',
  },
  {
    q: 'My parents used a bank or an investment company abroad to send the money. Does that make it a trust?',
    a: 'Not by itself. A bank or brokerage simply moving your parents\' money is usually not a trust. But arrangements described as a trust, foundation, or similar structure that holds assets for beneficiaries can be. If you are not sure what the arrangement is, ask for its documents and have them reviewed.',
  },
  {
    q: 'Can a U.S. trust be treated as a "foreign person" for gifts?',
    a: 'In one case, yes: the IRS includes a domestic trust treated as owned by a foreign person in its list of foreign persons for gift reporting. Trust classification is technical — another reason trust situations need professional review.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to ordinary foreign gifts from family.',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gift vs. foreign inheritance: what U.S. taxpayers need to report',
    desc:  'Gifts and bequests from individuals and estates — the Part IV side.',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'The mechanics of Part IV, due dates, and where to file.',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'I filed Form 3520 late — what should I do now?',
    desc:  'Penalties and reasonable cause for missed forms.',
  },
]

export default function ForeignGiftVsForeignTrustPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Gift From Parents vs. Foreign Trust Distribution: Form 3520 Part III vs. Part IV | AskLinTax',
      description: 'A gift from a parent abroad and a distribution from a foreign trust are different on Form 3520: Part IV vs. Part III, different thresholds, different penalties, and different tax results. Why it matters and when to get help.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          Money "from your parents" can reach you in two very different ways, and Form 3520 treats them as different categories:
        </p>
        <ul>
          <li><strong>A gift from your parent personally</strong> (a nonresident alien individual) is a foreign gift, reported in <strong>Part IV</strong> only if your related total for the year is more than $100,000. It is generally not taxable income.</li>
          <li><strong>A distribution from a foreign trust</strong> — even a family trust your parent created — is reported in <strong>Part III</strong>, has no $100,000 threshold, carries a much larger penalty if missed, and <strong>may be taxable</strong>.</li>
        </ul>
        <p>
          Calling a trust distribution a "gift" does not move it into Part IV. If a foreign trust is involved at all, <strong>get professional help</strong>.
        </p>

        <ArticleTable
          head={['', 'Gift from a nonresident individual', 'Distribution from a foreign trust']}
          rows={[
            ['Form 3520 part', 'Part IV', 'Part III'],
            ['Reporting threshold', 'More than $100,000 for the year from related foreign persons', 'No gift threshold — Part III applies to distributions received'],
            ['Income tax', 'Generally not income to you', 'May be taxable, depending on the trust and the distribution'],
            ['Penalty for not reporting (per the instructions)', '5% of the gift per month, up to 25%', 'Greater of $10,000 or 35% of the gross value of the distributions'],
            ['Complexity', 'Usually manageable', 'High — professional review strongly recommended'],
          ]}
        />

        <h2>Why the IRS separates them</h2>
        <p>
          A gift is a transfer from a person. A trust is an arrangement that holds assets for beneficiaries, and its distributions can carry out income the trust earned — sometimes income accumulated over many years. The tax code has special rules so that U.S. beneficiaries cannot receive a foreign trust's income tax-free just because it is paid out as a "gift." That is why:
        </p>
        <ul>
          <li>The IRS's foreign gift guidance says distributions from a foreign trust are reported in Part III, and that if an amount would be reportable in both Parts III and IV, you report it only in Part III.</li>
          <li>The tax code's definition of a foreign gift excludes distributions properly disclosed as foreign trust distributions.</li>
          <li>Part III asks for more information — including, for some trusts, figures for distributions from earlier years.</li>
        </ul>

        <h2>How the tax result can differ</h2>
        <p>
          This guide does not explain how to calculate the tax on a foreign trust distribution. At a high level, the Form 3520 instructions show that the answer depends on the trust's type and the information the trust provides:
        </p>
        <ul>
          <li><strong>Foreign grantor trust:</strong> if you receive a complete <em>Foreign Grantor Trust Beneficiary Statement</em> (part of Form 3520-A), the instructions say you treat the distribution for income tax purposes as if it came directly from the trust's owner. For example, if the distribution is a gift from the owner, you do not include it in gross income. You attach the statement.</li>
          <li><strong>Foreign nongrantor trust:</strong> Part III asks whether you received a <em>Foreign Nongrantor Trust Beneficiary Statement</em>. Without adequate information from the trust, a default calculation based on distributions in prior years can apply, and part of a distribution may be treated as an accumulation distribution with special tax consequences.</li>
        </ul>
        <p>
          These are exactly the questions a tax professional experienced with foreign trusts should answer.
        </p>

        <h2>How to tell which one you have</h2>
        <ul>
          <li><strong>Whose account did the money come from?</strong> A parent's personal account points to a gift. An account in the name of a trust, foundation, trustee, or similar structure points to a trust distribution.</li>
          <li><strong>Are there trust documents?</strong> A trust deed, a list of beneficiaries, or a trustee (often a bank or trust company) are strong signs.</li>
          <li><strong>Did anyone send you a beneficiary statement?</strong> That is a clear sign you are dealing with a foreign trust.</li>
          <li><strong>Did the money come through an estate or a trust after a death?</strong> A bequest from a foreign estate is Part IV; a distribution from a trust is Part III.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Strongly recommended: professional review</div>
          <p>Foreign trust reporting involves classification questions, information you must obtain from the trust, possible tax on distributions, and penalties that start at $10,000. Don't file Part III — or decide that Part IV covers a trust payment — without help from a CPA or tax attorney experienced with foreign trusts.</p>
        </div>

        <h2>A worked example</h2>
        <p>
          Sophia, a U.S. citizen, receives two transfers in 2025:
        </p>
        <ul>
          <li><strong>$60,000 from her mother's personal account</strong> in Hong Kong. Her mother is a nonresident alien. This is a foreign gift. Because it is not more than $100,000 (and there are no other related gifts), Part IV is not required for it, and it is generally not income.</li>
          <li><strong>$60,000 from a family trust</strong> her grandfather set up in Singapore, paid by the trustee. This is a foreign trust distribution. It goes in <strong>Part III</strong> of Form 3520 regardless of the $100,000 gift threshold, and whether any of it is taxable depends on the trust. Sophia gets professional help.</li>
        </ul>
        <p>
          Same amount, same family, two completely different answers.
        </p>

        <h2>Records to request and keep</h2>
        <ul>
          <li>The source account name for every transfer</li>
          <li>Trust documents and the trustee's contact information</li>
          <li>Any Foreign Grantor or Nongrantor Trust Beneficiary Statement</li>
          <li>A history of distributions you received in earlier years</li>
          <li>For ordinary gifts, evidence that the money came from the individual personally</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

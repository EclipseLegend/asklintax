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
  id:            '109',
  title:         'Estate Tax and Inheritance Basics: 2025 and 2026 Exclusions, Form 706, and Nonresidents',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal estate tax and the income tax treatment of inheritances for deaths in 2025 and 2026, based on the Instructions for Form 706 (Rev. July 2026), the Instructions for Form 706-NA (Rev. August 2025), Publication 559 (2025), Publication 551, Publication 525, and Rev. Procs. 2024-40 and 2025-32. It does not cover estate planning, trusts, the generation-skipping transfer tax, valuation methods, or each country\'s death tax treaty in detail, and it does not list state estate or inheritance tax rules',
  persona:       ['Heirs and beneficiaries', 'Executors of a family member\'s estate', 'Married couples where one spouse is not a U.S. citizen', 'Foreign parents who own U.S. stocks or real estate', 'Green card holders'],
  relatedJourney: ['Cross-border finances', 'Money & Benefits'],
  actionRequired: 'Find out whether the person who died was a U.S. citizen, domiciled in the United States, or a nonresident non-citizen; that decides whether Form 706 or Form 706-NA applies. Keep records of date-of-death values for inherited property.',
  sources: [
    { label: 'IRS — Instructions for Form 706 (Rev. July 2026)', url: 'https://www.irs.gov/pub/irs-pdf/i706.pdf' },
    { label: 'IRS — Instructions for Form 706-NA (Rev. August 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i706na.pdf' },
    { label: 'IRS — Publication 559 (2025), Survivors, Executors, and Administrators', url: 'https://www.irs.gov/publications/p559' },
    { label: 'IRS — Publication 551, Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — Publication 525, Taxable and Nontaxable Income', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do I pay federal income tax on money I inherit?',
    a: 'Generally no. Publication 525 says property you receive as a gift, bequest, or inheritance is not included in your income. But income the property produces after you receive it — interest, dividends, rent — is taxable to you, and withdrawals from an inherited IRA or 401(k) are generally taxable.',
  },
  {
    q: 'Who pays the federal estate tax — the estate or the heirs?',
    a: 'The estate. The executor files Form 706 or Form 706-NA and pays any tax from the estate before property is distributed. There is no federal inheritance tax on heirs; some states have their own estate or inheritance taxes.',
  },
  {
    q: 'My parents live abroad and own U.S. stocks. Does the $15,000,000 exclusion apply to them?',
    a: 'No. The basic exclusion amount is for estates of U.S. citizens and people domiciled in the United States. For a nonresident non-citizen, Form 706-NA must generally be filed if U.S.-situated assets plus certain lifetime gifts exceed $60,000, and the unified credit is generally only $13,000 unless a death tax treaty provides more.',
  },
  {
    q: 'I have a green card. Am I a nonresident for estate tax purposes?',
    a: 'Not automatically either way. Estate tax uses domicile — living somewhere with no definite present intention of later moving — not the income tax residency tests. The Form 706-NA instructions note that a decedent may be a U.S. resident for income tax purposes yet a nonresident for estate tax purposes. A green card is a relevant fact but not conclusive proof of estate tax domicile; what matters is where the person actually lived and whether they intended to remain there.',
  },
  {
    q: 'What is portability?',
    a: 'Portability lets a surviving spouse use the deceased spouse\'s unused exclusion (the DSUE amount). The executor must elect it on a timely filed Form 706, even if no tax return is otherwise required. Rev. Proc. 2022-32 allows a late election up to the fifth anniversary of death for estates not otherwise required to file. Estates of nonresident non-citizens cannot elect portability.',
  },
  {
    q: 'I received an inheritance from a relative overseas. Do I have to report it?',
    a: 'It is not income, but if you are a U.S. person and receive more than $100,000 from a nonresident alien individual or foreign estate in a year, you may need to file Form 3520. See our guide on foreign gifts and inheritances.',
  },
]

const RELATED = [
  {
    href: '/library/individual/gift-tax-form-709',
    cat:  'Individuals & Families',
    title: 'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026',
    desc:  'Lifetime gifts share the same exclusion.',
  },
  {
    href: '/library/investment/foreign-gift-vs-inheritance',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gift vs. foreign inheritance: what U.S. taxpayers need to report',
    desc:  'Form 3520 for inheritances from abroad.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'Rules for inherited IRAs and 401(k)s.',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: 'Nonresident spouse: can we file jointly?',
    desc:  'Income tax rules when a spouse is not a U.S. citizen.',
  },
]

export default function EstateTaxInheritancePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Estate Tax and Inheritance Basics: 2025 and 2026 Exclusions, Form 706, and Nonresidents | AskLinTax',
      description: 'Federal estate tax and inheritances explained: the $13,990,000 (2025) and $15,000,000 (2026) exclusions, Form 706, portability, stepped-up basis, inherited retirement accounts, non-citizen spouses, and Form 706-NA for nonresident non-citizens.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The federal <strong>estate tax</strong> is a tax on the estate of the person who died, not on the heirs. For U.S. citizens and U.S. domiciliaries, the basic exclusion amount is <strong>$13,990,000</strong> for deaths in <strong>2025</strong> and <strong>$15,000,000</strong> for deaths in <strong>2026</strong>, so most estates owe nothing. Heirs generally do not pay federal income tax on what they inherit, and inherited property usually takes a basis equal to its value at death. The big exception is <strong>nonresident non-citizens</strong> who own U.S. assets: their estates can have to file <strong>Form 706-NA</strong> above just <strong>$60,000</strong>.
        </p>

        <h2>Estate tax, inheritance tax, and gift tax</h2>
        <ArticleTable
          head={['Tax', 'Who it is on', 'Federal?']}
          rows={[
            ['Estate tax', 'The estate of the person who died, filed by the executor', 'Yes — Form 706 or Form 706-NA'],
            ['Inheritance tax', 'The person who receives property', 'No federal inheritance tax; some states have one'],
            ['Gift tax', 'The giver of lifetime gifts', 'Yes — Form 709; uses the same lifetime exclusion as the estate tax'],
          ]}
        />
        <p>
          Lifetime taxable gifts reduce the exclusion left at death, which is why Form 706 asks for "adjusted taxable gifts." Gifts within the annual exclusion do not count.
        </p>

        <h2>Which estate tax rules apply: three groups</h2>
        <ArticleTable
          head={['Person who died', 'Return', 'What is taxed', 'Exclusion or credit']}
          rows={[
            ['U.S. citizen (wherever they lived)', 'Form 706', 'Worldwide estate', '$13,990,000 (2025); $15,000,000 (2026)'],
            ['Non-citizen domiciled in the United States', 'Form 706', 'Worldwide estate', '$13,990,000 (2025); $15,000,000 (2026)'],
            ['Nonresident non-citizen (NRNC)', 'Form 706-NA', 'Only U.S.-situated assets', 'Unified credit generally $13,000, unless a treaty provides more'],
          ]}
        />
        <ul>
          <li><strong>Domicile:</strong> for estate tax, you acquire domicile in a place by living there, even briefly, with no definite present intention of later moving.</li>
          <li><strong>Income tax residency is different.</strong> The green card test and the substantial presence test decide income tax residency. The Form 706-NA instructions say a decedent may be a U.S. resident for income tax purposes yet a nonresident for estate tax purposes.</li>
          <li><strong>Territories:</strong> someone who is a citizen only because of a connection to a U.S. territory is not treated as a U.S. citizen for these rules.</li>
        </ul>

        <h2>Form 706 for citizens and domiciliaries</h2>
        <ul>
          <li><strong>Who must file:</strong> the executor, if the gross estate plus adjusted taxable gifts and any specific exemption is more than the basic exclusion for the year of death — or to elect portability.</li>
          <li><strong>Due date:</strong> 9 months after the date of death; a 6-month extension is available on Form 4768.</li>
          <li><strong>2026 amounts:</strong> basic exclusion $15,000,000, basic credit $5,945,800 (Form 706 instructions, Rev. July 2026). The top rate is 40%.</li>
          <li><strong>Portability:</strong> the executor can pass the unused exclusion to a surviving spouse by filing a timely Form 706, with a late election available up to the fifth anniversary of death under Rev. Proc. 2022-32 for estates not otherwise required to file.</li>
        </ul>

        <h2>When the surviving spouse is not a U.S. citizen</h2>
        <ul>
          <li><strong>Marital deduction:</strong> property left to a U.S. citizen spouse is generally deductible without limit. For a spouse who is not a U.S. citizen, the deduction is allowed only if the property passes to a <strong>qualified domestic trust (QDOT)</strong>, or is transferred to one before the return is filed, and the executor elects QDOT status.</li>
          <li><strong>QDOT tax:</strong> estate tax is then imposed later, as distributions are made from the trust.</li>
          <li><strong>Lifetime gifts:</strong> the annual exclusion for gifts to a non-citizen spouse is $190,000 for 2025 and $194,000 for 2026.</li>
        </ul>

        <h2>Nonresident non-citizens and Form 706-NA</h2>
        <ul>
          <li><strong>Filing threshold:</strong> the executor must file if the date-of-death value of U.S.-situated assets, plus the gift tax specific exemption (for gifts from September 9 to December 31, 1976) and adjusted taxable gifts after 1976, exceeds <strong>$60,000</strong>.</li>
          <li><strong>Filing is not the same as owing tax.</strong> The $60,000 test uses gross U.S. assets. Allowed deductions, the unified credit (generally $13,000), and any treaty benefits can reduce the tax, sometimes to zero, but the return is still required.</li>
          <li><strong>Due date:</strong> 9 months after death; Form 4768 for an extension.</li>
          <li><strong>No portability</strong> for an NRNC estate, and the marital deduction is available only for a U.S. citizen spouse or a QDOT unless a treaty allows otherwise.</li>
        </ul>
        <ArticleTable
          head={['Asset owned by an NRNC', 'U.S.-situated?']}
          rows={[
            ['Real estate or tangible property physically in the United States', 'Yes'],
            ['Stock of a U.S. corporation, wherever the certificates are', 'Yes'],
            ['Stock of a foreign corporation', 'No'],
            ['U.S. bank deposits not connected with a U.S. business', 'No'],
            ['Life insurance proceeds on the decedent\'s life', 'No'],
          ]}
        />
        <p>
          <strong>Treaties:</strong> the Form 706-NA instructions list estate or death tax treaties with Australia, Austria, Canada (through the income tax treaty), Denmark, Finland, France, Germany, Greece, Ireland, Italy, Japan, the Netherlands, South Africa, Switzerland, and the United Kingdom. A treaty can change the situs rules, the credit, or the marital deduction; a treaty-based position must be disclosed. Taiwan and China are not on that list.
        </p>

        <h2>What heirs need to know about income tax</h2>
        <ul>
          <li><strong>Inherited cash or property:</strong> not income to you (Publication 525).</li>
          <li><strong>Basis:</strong> your basis in inherited property is generally its fair market value on the date of death, or the alternate valuation date if the executor elected it (Publications 551 and 559; special rules, such as special-use valuation, can apply). If you sell soon after, there is often little gain.</li>
          <li><strong>Income in respect of a decedent (IRD):</strong> income the person had a right to but had not received — such as wages earned but unpaid at death, or the taxable balance of an inherited traditional IRA — is taxable to whoever receives it (Publication 559), even though it is also included in the estate.</li>
          <li><strong>Estate tax on IRD:</strong> if the estate paid federal estate tax on IRD, the recipient may be able to deduct the part of that tax as an itemized deduction.</li>
          <li><strong>Inherited retirement accounts:</strong> distribution timing rules apply; see our retirement withdrawals guide.</li>
        </ul>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Grace', 'Mr. Wu', 'Daniel']}
          rows={[
            ['Status at death', 'U.S. citizen, died 2026', 'Lived in Taiwan, not a U.S. citizen, never lived in the U.S.; died 2026', 'Green card holder living in California with no plan to leave; died 2026'],
            ['Assets', '$4,000,000 worldwide', '$300,000 of U.S. stocks and $200,000 in a U.S. bank account', '$2,000,000, left to his wife, who is not a U.S. citizen'],
            ['Return', 'Not required, but her executor files Form 706 to elect portability for her husband', 'Form 706-NA: U.S.-situated assets are $300,000 (the deposit is not counted), above $60,000', 'Form 706 as a U.S. domiciliary; not required below $15,000,000'],
            ['Federal estate tax', 'None', 'Tentative tax on $300,000 is $87,800, minus the $13,000 credit = $74,800 before deductions', 'None; the marital deduction for his wife is not needed because the estate is under the exclusion'],
          ]}
        />
        <p>
          Mr. Wu's figure uses Table A in the Form 706 instructions and assumes no prior gifts, no deductions, no state death tax, and that the bank deposit is not connected with a U.S. business; Taiwan is not on the treaty list. His heirs' basis in the U.S. stocks is generally their value at his death. Daniel's domicile rests on where he lived and his intent to stay, not on the green card alone; if his estate were above the exclusion, his wife would need a QDOT for a marital deduction. All three examples are simplified.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming the $15,000,000 exclusion applies to foreign parents</strong> who own U.S. stock or real estate.</li>
          <li><strong>Treating income tax residency as estate tax domicile.</strong></li>
          <li><strong>Not electing portability</strong> when the first spouse dies, losing the unused exclusion.</li>
          <li><strong>Reporting an inheritance as income</strong>, or forgetting that inherited IRA withdrawals are taxable.</li>
          <li><strong>Using the original purchase price</strong> instead of the date-of-death value as basis.</li>
          <li><strong>Ignoring state estate or inheritance taxes</strong>, which can apply at much lower amounts.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get professional help</div>
          <p>Estate returns, QDOTs, treaty claims, valuation, and foreign probate are complex, and penalties for late or incorrect returns can be large. An estate attorney or tax professional should review any estate that may need Form 706 or Form 706-NA.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

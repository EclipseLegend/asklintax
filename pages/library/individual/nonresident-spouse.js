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
  id:            '27',
  title:         'Nonresident spouse: can we file jointly?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers the election to treat a nonresident spouse as a U.S. resident and the main alternatives. Treaty positions, Social Security and Medicare tax, and state returns are outside the scope of this guide',
  persona:       ['U.S. citizens or residents married to someone living in Taiwan or China', 'H-1B and green card holders whose spouse has not moved yet', 'Newly married couples', 'Spouses arriving partway through the year'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Before you file, compare your U.S. tax two ways: married filing separately (or head of household, if you qualify) versus a joint return with the election to treat your spouse as a U.S. resident. The election brings your spouse\'s worldwide income into the U.S. return and can only be made once in a lifetime if later ended.',
  sources: [
    { label: 'IRS — Nonresident spouse', url: 'https://www.irs.gov/individuals/international-taxpayers/nonresident-spouse' },
    { label: 'IRS Publication 519 — U.S. Tax Guide for Aliens (Nonresident Spouse Treated as a Resident; Choosing Resident Alien Status)', url: 'https://www.irs.gov/publications/p519' },
    { label: 'IRS — Taxation of dual-status individuals', url: 'https://www.irs.gov/individuals/international-taxpayers/taxation-of-dual-status-individuals' },
    { label: 'IRS — Instructions for Form 8938 (specified individuals)', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Foreign tax credit', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit' },
  ],
}

const FAQS = [
  {
    q: 'My wife lives in Taiwan and has never been to the U.S. Can we file jointly?',
    a: 'Yes, if at the end of the tax year one spouse is a U.S. citizen or resident and the other is not, you can choose to treat the nonresident spouse as a U.S. resident and file a joint return. In exchange, her worldwide income — including her Taiwan salary — is reported on the joint U.S. return.',
  },
  {
    q: 'Does my nonresident spouse need an SSN or ITIN?',
    a: 'Yes. If your spouse is a nonresident and you file either a joint or a separate return, your spouse must have a Social Security Number or an Individual Taxpayer Identification Number. If your spouse is not eligible for an SSN, apply for an ITIN with Form W-7.',
  },
  {
    q: 'Can I file as head of household instead?',
    a: 'Possibly. If you do not make the election, you may be able to use head of household if you pay more than half the cost of keeping up a home for certain dependents or relatives — your nonresident spouse does not count as the qualifying person.',
  },
  {
    q: 'Do we have to file jointly every year after we make the election?',
    a: 'No. You must file a joint return for the first year of the election. In later years you can file joint or separate returns — but both of you continue to be treated as U.S. residents and report worldwide income until the election is suspended or ended.',
  },
  {
    q: 'Can we undo the election?',
    a: 'Either spouse can revoke it by the due date of the return for the year it should end, by attaching a signed revocation statement. But once the election ends — by revocation, death, legal separation, or the IRS ending it for inadequate records — neither of you can make it again in any later year, even if married to someone else.',
  },
  {
    q: 'We missed the election when we filed. Can we still make it?',
    a: 'You can make it on a joint amended return (Form 1040-X) within 3 years from the date you filed the original return or 2 years from the date you paid the tax for that year, whichever is later. If you do, you must also amend any returns filed for later years.',
  },
  {
    q: 'Does the election affect our foreign account reporting?',
    a: 'It can. The Form 8938 instructions list a nonresident alien who elects to be treated as a resident for a joint return as a "specified individual," so your spouse\'s foreign financial assets can become part of Form 8938 reporting. Ask a professional how the FBAR rules apply to your spouse.',
  },
]

const RELATED = [
  {
    href: '/library/individual/dual-status',
    cat:  'Individuals & Families',
    title: 'Dual-status tax returns: your year of arrival or departure',
    desc:  'If your spouse moves to the U.S. partway through the year, the dual-status rules and a second election come into play.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Making the election means your spouse\'s foreign income is reported in the U.S. — here is how that works.',
  },
  {
    href: '/library/individual/tax-residency',
    cat:  'Individuals & Families',
    title: 'Am I a U.S. tax resident?',
    desc:  'Confirm your own residency status first — the election requires one spouse to be a citizen or resident.',
  },
  {
    href: '/library/individual/itin',
    cat:  'Individuals & Families',
    title: 'What is an ITIN and how do I apply?',
    desc:  'A nonresident spouse who cannot get an SSN needs an ITIN for a joint or separate return.',
  },
]

export default function NonresidentSpousePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Nonresident Alien Spouse: Can You File Jointly? Electing Resident Status | AskLinTax',
      description: 'Married to someone who is not a U.S. resident? Compare married filing separately, head of household, and the election to treat your spouse as a resident — including worldwide income, ITIN, and how to make or end the choice.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The situation</h2>
        <p>
          You are a U.S. citizen or U.S. tax resident — maybe on an H-1B, maybe a green card holder — and your spouse lives in Taiwan, China, or elsewhere and is <strong>not</strong> a U.S. tax resident. Married couples normally choose between filing jointly or separately, but a nonresident spouse changes the options.
        </p>
        <p>
          The IRS gives you a choice: treat your spouse as a <strong>U.S. resident</strong> for tax purposes and file a joint return, or don't — and file without them.
        </p>

        <h2>Your three main options</h2>
        <ArticleTable
          head={['Option', 'How it works', 'Key trade-off']}
          rows={[
            ['Married filing separately', 'You file your own return; your spouse is not included', 'Married filing separately tax rates and rules apply; your spouse\'s foreign income stays off your U.S. return'],
            ['Head of household', 'Possible if you pay more than half the cost of a home for a qualifying dependent or relative — not your spouse', 'Better rates than separate, but only if you have a qualifying person'],
            ['Joint return with the election', 'You choose to treat your nonresident spouse as a U.S. resident and file jointly', 'Joint rates and deductions, but your spouse\'s worldwide income is taxed by the U.S.'],
          ]}
        />

        <h2>The election: treating your spouse as a U.S. resident</h2>
        <p>
          If, at the end of the tax year, one spouse is a U.S. citizen or resident and the other is not, you can choose to treat the nonresident spouse as a U.S. resident. In this guide we call it <strong>the election</strong>. If you make it:
        </p>
        <ul>
          <li>Both of you are treated as U.S. residents for federal income tax purposes for every year the election is in effect.</li>
          <li>You <strong>must file a joint return</strong> for the year you make the election. In later years you may file jointly or separately.</li>
          <li><strong>Each spouse reports their entire worldwide income</strong> for that year and all later years, unless the election is suspended or ended.</li>
          <li>Generally, neither of you can claim tax treaty benefits as a resident of a foreign country while the election is in effect.</li>
          <li>For Social Security and Medicare tax withholding, the nonresident spouse may still be treated as a nonresident.</li>
        </ul>

        <h3>How to make the election</h3>
        <p>Attach a statement, signed by <strong>both spouses</strong>, to your joint return for the first year. It must include:</p>
        <ul>
          <li>A declaration that on the last day of the tax year one spouse was not a U.S. citizen or resident and the other was, and that you choose to be treated as U.S. residents for the entire year</li>
          <li>The name, address, and identification number (SSN or ITIN) of each spouse</li>
        </ul>
        <p>
          You can also make the election later on a <strong>joint amended return</strong> (Form 1040-X), within 3 years from the date you filed the original return or 2 years from the date you paid the tax, whichever is later.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ It is a once-in-a-lifetime choice</div>
          <p>The election continues until it is suspended or ended. It ends if either spouse revokes it, either spouse dies, you legally separate, or the IRS ends it because records are inadequate. Once it ends, neither of you can ever make it again — even if married to a different person.</p>
        </div>

        <h3>When the election is suspended</h3>
        <p>
          The election does not apply to a later year in which <strong>neither</strong> of you is a U.S. citizen or resident at any time — for example, if you both live outside the U.S. all year. It comes back into effect if one of you becomes a U.S. resident again.
        </p>

        <h2>Should you make the election? A worked comparison</h2>
        <p>
          Kevin is a U.S. resident on an H-1B visa earning a U.S. salary. His wife Amy lives in Taiwan, is a nonresident alien, and earns a Taiwan salary.
        </p>
        <ArticleTable
          head={['', 'Kevin files married filing separately', 'Joint return with the election']}
          rows={[
            ['Amy\'s Taiwan salary on the U.S. return', 'No', 'Yes — converted to U.S. dollars'],
            ['Tax rates and standard deduction', 'Married filing separately', 'Married filing jointly'],
            ['Taiwan income tax Amy paid', 'Not relevant', 'May qualify for a foreign tax credit'],
            ['Amy\'s Taiwan accounts', 'Not on Kevin\'s Form 8938', 'Amy becomes a specified individual for Form 8938'],
            ['Amy needs an SSN or ITIN', 'Yes', 'Yes'],
          ]}
        />
        <p>
          Which option costs less depends on both spouses' income, deductions, and any foreign tax credit — a joint return brings joint rates and deductions, but also adds Amy's worldwide income to the U.S. return. The only way to know is to <strong>calculate both ways</strong> before filing.
        </p>

        <h2>If your spouse moves to the U.S. during the year</h2>
        <p>
          A spouse who arrives partway through the year and is a U.S. resident at year end is usually a <strong>dual-status</strong> taxpayer for that year. A related election lets a dual-status spouse who is married to a U.S. citizen or resident at year end be treated as a resident for the <strong>entire</strong> year and file jointly. See <a href="/library/individual/dual-status/">Dual-status tax returns</a>.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>Because the election is long-lasting and can only be made once if ended, have a tax professional run the numbers if your spouse has significant foreign income, investments, or accounts — or if either of you might rely on a tax treaty.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

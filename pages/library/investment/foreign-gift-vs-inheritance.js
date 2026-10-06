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
  id:            '39',
  title:         'Foreign gift vs. foreign inheritance: what U.S. taxpayers need to report',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Compares gifts and bequests that U.S. citizens and resident aliens receive from nonresident alien individuals and foreign estates. Foreign estate and inheritance taxes, the estate\'s own U.S. filings, inherited foreign retirement accounts, foreign trusts, and covered expatriates need professional review',
  persona:       ['Heirs of parents or grandparents who lived abroad', 'People receiving lifetime gifts from family overseas', 'Anyone deciding how to accept family assets from abroad', 'Executors\' family members in the U.S.'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Gifts and bequests from foreign persons are reported together on Form 3520 Part IV when the year\'s related total is more than $100,000. Neither is generally income when received — but income the assets earn afterward is taxable, and your basis for a later sale is different for an inheritance than for a gift.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Publication 551 — Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: 'Is an inheritance from my father in Taiwan taxable income to me in the U.S.?',
    a: 'In most cases, property you receive as an inheritance is not included in your income. But income the property produces afterward (interest, dividends, rent) is taxable, and some inherited items — for example, an inherited pension or IRA — may include amounts that are taxable when you receive them. Look at what the inheritance actually consists of.',
  },
  {
    q: 'Do I report an inheritance on Form 3520 the same way as a gift?',
    a: 'Yes. Part IV covers gifts and bequests from nonresident aliens and foreign estates. Bequests are counted together with gifts from related foreign persons for the more-than-$100,000 test, and each item over $5,000 is listed on line 54.',
  },
  {
    q: 'When do I count an inheritance — when my mother died, or when I received the money?',
    a: 'Part IV asks about gifts and bequests you received during the tax year. Estates can take time to settle, so the year you receive the property may be later than the year of death. If the timing is unclear, have it reviewed.',
  },
  {
    q: 'My parent was a U.S. citizen living abroad. Is the inheritance a foreign bequest?',
    a: 'Generally not. A foreign bequest comes from a nonresident alien individual or a foreign estate. An inheritance from a U.S. citizen or resident is not reported on Form 3520 Part IV, though the estate may have its own U.S. filing questions.',
  },
  {
    q: 'Why does it matter whether my parents gave me the apartment or left it to me?',
    a: 'Basis. Inherited property generally takes a basis equal to its fair market value at the date of death. Property received as a gift generally takes the giver\'s adjusted basis. For an asset that has gone up in value a lot, the difference in your future taxable gain can be large.',
  },
  {
    q: 'I inherited a bank account in Taiwan that is still in my name. Anything else to report?',
    a: 'Yes, possibly. Once the account is yours, it is your foreign financial account: interest is taxable, and the FBAR and Form 8938 rules apply if their thresholds are met. Inherited property abroad that you hold directly, like an apartment, is not itself reported on the FBAR or Form 8938.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to foreign gifts and Form 3520.',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Inherited a home abroad? Owning, renting, and selling it.',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold property overseas and moved the money to the U.S. — what must I report?',
    desc:  'How basis, currency, and foreign tax affect the sale of inherited property.',
  },
  {
    href: '/library/investment/foreign-gift-vs-foreign-trust',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gift from your parents vs. foreign trust distribution — why the difference matters',
    desc:  'If the inheritance comes through a trust, it is a different category.',
  },
]

export default function ForeignGiftVsInheritancePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Gift vs. Foreign Inheritance: U.S. Tax and Form 3520 Reporting | AskLinTax',
      description: 'Gifts and inheritances from family abroad compared: Form 3520 Part IV reporting, why neither is generally income, what is still taxable, and how basis differs when you later sell.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          From a U.S. recipient's point of view, a <strong>gift</strong> from a nonresident alien and an <strong>inheritance</strong> (bequest) from a nonresident alien or foreign estate are handled the same way at the moment you receive them:
        </p>
        <ul>
          <li>Generally <strong>not taxable income</strong> to you.</li>
          <li>Reported together on <strong>Form 3520 Part IV</strong> when your total from related foreign persons is more than <strong>$100,000</strong> for the year.</li>
        </ul>
        <p>
          The differences show up <strong>later</strong>: in your basis when you sell, in what the inheritance actually contains, and in who else (the estate) may have filing obligations.
        </p>

        <ArticleTable
          head={['', 'Lifetime gift from a nonresident alien', 'Inheritance from a nonresident alien or foreign estate']}
          rows={[
            ['Income to you when received?', 'Generally no', 'Generally no — but some inherited items can include taxable amounts'],
            ['Form 3520 Part IV?', 'If related total for the year > $100,000', 'Same test, counted together with gifts'],
            ['Year it counts', 'The year you receive it', 'The year you receive it (estates can take time)'],
            ['Basis for a later sale', 'Generally the giver\'s adjusted basis', 'Generally fair market value at date of death'],
            ['Income the asset earns afterward', 'Taxable to you', 'Taxable to you'],
          ]}
        />

        <h2>Reporting: one Part IV, one threshold</h2>
        <p>
          Line 54 of Form 3520 asks whether you received more than $100,000 that you treated as <strong>gifts or bequests</strong> from a nonresident alien or a foreign estate. Gifts from your father during his lifetime and the bequest from his estate after he dies are counted together if received in the same year, along with gifts from other related foreign persons. Each item over $5,000 is listed with its date, a description, and its fair market value.
        </p>
        <p>
          A gift or inheritance from a <strong>U.S. citizen or resident</strong> is not a foreign gift or foreign bequest, even if that person lived abroad.
        </p>

        <h2>"Not income" has limits</h2>
        <p>
          IRS Publication 525 says that in most cases, property you receive as a gift, bequest, or inheritance isn't included in your income. It also gives the limits:
        </p>
        <ul>
          <li>If the property later produces income — interest, dividends, rent — that income is taxable to you.</li>
          <li>If the gift or inheritance <strong>is itself income</strong> from property (for example, income the property earned), that income is taxable to you.</li>
          <li>If you inherited a pension or an IRA, you may have to include part of it in your income.</li>
        </ul>
        <p>
          So "inheritances are tax-free" is too simple. Look at what you actually received — cash, real estate, shares, an account, a retirement plan — and how it will produce income.
        </p>

        <h2>Basis: the big later difference</h2>
        <p>
          IRS Publication 551 sets out the general basis rules:
        </p>
        <ul>
          <li><strong>Inherited property:</strong> generally the fair market value at the date of death (or on the alternate valuation date, if chosen for the estate).</li>
          <li><strong>Gifted property:</strong> generally the giver's adjusted basis. If the value at the time of the gift was below the giver's basis, a different basis is used for figuring a loss.</li>
        </ul>

        <h3>Example</h3>
        <p>
          Lily's mother bought an apartment in Kaohsiung for the equivalent of US$100,000. It is worth US$400,000 today.
        </p>
        <ul>
          <li>If her mother <strong>gives</strong> Lily the apartment now, Lily's basis is generally her mother's adjusted basis — about US$100,000. A later sale at US$400,000 means a large U.S. gain.</li>
          <li>If Lily <strong>inherits</strong> it when it is worth US$400,000, her basis is generally US$400,000. A sale soon after at that price means little or no U.S. gain.</li>
        </ul>
        <p>
          Either way, if her mother is a nonresident alien and the value plus other related gifts that year is over $100,000, Lily reports the apartment on Form 3520 Part IV for the year she receives it, at fair market value. (Simplified, in U.S. dollars; exchange rates and foreign taxes add detail.)
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Not a planning recommendation</div>
          <p>Whether family assets should be given now or left as an inheritance depends on far more than U.S. basis — including the other country's gift, estate, and transfer taxes and the family's circumstances. Get cross-border advice before restructuring anything.</p>
        </div>

        <h2>Other differences worth knowing</h2>
        <ul>
          <li><strong>Timing.</strong> A gift is received when it is transferred. An inheritance may be received a year or more after the death, when the estate is settled. Report it for the year you receive it.</li>
          <li><strong>Documentation.</strong> For a gift, keep evidence it was a gift. For an inheritance, keep the death certificate, estate or probate documents, and a date-of-death valuation.</li>
          <li><strong>Trusts.</strong> If the inheritance passes through a foreign trust, it is a trust distribution, not a Part IV bequest. See <a href="/library/investment/foreign-gift-vs-foreign-trust/">Foreign gift vs. foreign trust distribution</a>.</li>
          <li><strong>Covered expatriates.</strong> If the giver or decedent was a former U.S. citizen or long-term green card holder treated as a covered expatriate, a special tax can apply to the U.S. recipient.</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          For most inheritances from abroad. Especially if it includes real estate, shares, retirement or pension accounts, or a business; if it came through a trust; if the estate took years to settle; or if you are deciding what to keep, sell, or move. Selling inherited property? See <a href="/library/investment/sold-foreign-property-transfer/">I sold property overseas and moved the money to the U.S.</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

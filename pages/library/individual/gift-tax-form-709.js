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
  id:            '97',
  title:         'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal gift tax for gifts made by U.S. citizens and residents in 2025 and 2026, based on the 2025 Instructions for Form 709, Rev. Proc. 2024-40 (2025 amounts), Rev. Proc. 2025-32 (2026 amounts), Publications 551 and 525, and the IRS gift tax FAQs. It does not cover gifts made by nonresident non-citizens, trusts, generation-skipping transfer tax, valuation of business interests, estate tax, or state tax',
  persona:       ['Parents helping a child with a home down payment', 'Grandparents paying tuition or medical bills', 'Married couples thinking about gift splitting', 'U.S. citizens married to a non-citizen spouse', 'Anyone giving stock or other appreciated property'],
  relatedJourney: ['Preparing to file', 'Cross-border finances'],
  actionRequired: 'Add up the gifts you made to each person during the calendar year, subtract the annual exclusion and any tuition or medical payments made directly to the school or provider, and file Form 709 by April 15 of the following year if a filing rule applies — even when no gift tax is due.',
  sources: [
    { label: 'IRS — 2025 Instructions for Form 709', url: 'https://www.irs.gov/pub/irs-pdf/i709.pdf' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation-adjusted amounts)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
    { label: 'IRS — Publication 551, Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
    { label: 'IRS — Publication 525 (2025), Taxable and Nontaxable Income', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Frequently asked questions on gift taxes', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes' },
  ],
}

const FAQS = [
  {
    q: 'Does the person who receives the gift pay tax?',
    a: 'Generally no. The 2025 Form 709 instructions say the donor is responsible for paying any gift tax; only if the donor does not pay may the recipient have to. Publication 525 adds that property received as a gift generally is not included in the recipient\'s income, although income it later produces, such as interest or dividends, is taxable.',
  },
  {
    q: 'If I file Form 709, do I owe gift tax?',
    a: 'Usually not. Gifts above the annual exclusion are taxable gifts that must be reported, but gift tax is generally owed only after your lifetime taxable gifts use up the credit based on the basic exclusion amount ($13,990,000 for 2025 and $15,000,000 for 2026). Most filers simply use part of that amount.',
  },
  {
    q: 'Can my spouse and I file one Form 709 together?',
    a: 'No. Married couples cannot file a joint gift tax return. Each spouse who must file files a separate Form 709. If you split gifts, the IRS asks that you file both returns together.',
  },
  {
    q: 'Do I report paying my grandchild\'s tuition?',
    a: 'Not if you paid it directly to a qualifying school as tuition. That payment is not a gift for Form 709 purposes. Books, supplies, room and board, and contributions to a 529 plan do not qualify for this exclusion.',
  },
  {
    q: 'Is Form 709 the same as Form 3520?',
    a: 'No. Form 709 is filed by a U.S. citizen or resident who makes a gift. Form 3520 is filed by a U.S. person who receives a large gift from a foreign person — for example, more than $100,000 from a nonresident alien individual during the year. Receiving a foreign gift does not require Form 709.',
  },
  {
    q: 'When is Form 709 due, and can I extend it?',
    a: 'Generally April 15 of the year after the gift — April 15, 2026 for 2025 gifts. An extension of your income tax return (Form 4868 or Form 2350) also extends the time to file Form 709; otherwise you can use Form 8892. Neither extends the time to pay any gift tax.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The rules when you receive a gift from abroad.',
  },
  {
    href: '/library/individual/529-plans',
    cat:  'Individuals & Families',
    title: '529 Plans: Expanded K-12 and Credential Expenses Explained',
    desc:  'Gifts to a 529 plan and the 5-year election.',
  },
  {
    href: '/library/investment/foreign-gift-home-down-payment',
    cat:  'Investments & Foreign Accounts',
    title: 'Parents overseas helped with my U.S. home down payment — is it a foreign gift?',
    desc:  'When the down payment comes from family abroad.',
  },
  {
    href: '/library/individual/kiddie-tax',
    cat:  'Individuals & Families',
    title: 'Kiddie Tax: When a Child\'s Investment Income Is Taxed at the Parent\'s Rate',
    desc:  'What happens when gifted stock pays dividends to a child.',
  },
]

export default function GiftTaxForm709Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Gift Tax and Form 709: When U.S. Givers Must File in 2025 and 2026 | AskLinTax',
      description: 'The federal gift tax for U.S. givers: the 2025 and 2026 annual exclusion, the lifetime exemption, when to file Form 709, gift splitting, non-citizen spouses, tuition and medical payments, gifted stock, and Form 709 vs. Form 3520.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you are a U.S. citizen or resident, you can give up to <strong>$19,000</strong> per person in <strong>2025</strong> and in <strong>2026</strong> without reporting it. Give more than that to one person (other than your spouse) in a calendar year, and you generally must file <strong>Form 709</strong>. Filing does <strong>not</strong> usually mean you owe tax: the excess is subtracted from a lifetime amount — <strong>$13,990,000</strong> for 2025 and <strong>$15,000,000</strong> for 2026 — and gift tax is generally due only after that is used up.
        </p>

        <h2>Four separate questions</h2>
        <ArticleTable
          head={['Question', 'What decides it']}
          rows={[
            ['Must I file Form 709?', 'The filing rules below — for example, more than $19,000 to one person, any future-interest gift, or gift splitting'],
            ['How much is excluded each year?', 'The annual exclusion of $19,000 per recipient (2025 and 2026), plus tuition and medical payments made directly'],
            ['How much lifetime exemption do I use?', 'Your taxable gifts — the part above the exclusions — reduce the amount left of your basic exclusion'],
            ['Do I actually owe gift tax?', 'Only when your lifetime taxable gifts are more than the basic exclusion amount, so the applicable credit no longer covers the tax'],
          ]}
        />

        <h2>Key amounts</h2>
        <ArticleTable
          head={['Amount', '2025', '2026']}
          rows={[
            ['Annual exclusion, per recipient', '$19,000', '$19,000'],
            ['Annual exclusion for gifts to a spouse who is not a U.S. citizen', '$190,000', '$194,000'],
            ['Basic exclusion amount (lifetime)', '$13,990,000', '$15,000,000'],
          ]}
        />
        <p>
          The 2026 amounts come from Rev. Proc. 2025-32. The $15,000,000 basic exclusion amount for 2026 was set by P.L. 119-21 and is used for both the estate tax credit and the gift tax credit. Gifts to a spouse who is a U.S. citizen generally have no limit.
        </p>

        <h2>When you must file Form 709</h2>
        <ul>
          <li>You gave <strong>more than $19,000</strong> to any one person (other than your spouse) during the year.</li>
          <li>You made a gift of a <strong>future interest</strong> (for example, many gifts in trust), even under $19,000.</li>
          <li>You and your spouse want to <strong>split gifts</strong>, whatever the amount.</li>
          <li>You gave a non-citizen spouse more than <strong>$190,000</strong> (2025) or <strong>$194,000</strong> (2026) of present-interest gifts, or any future-interest gift.</li>
          <li>A gift of community property, or of property held jointly with your spouse, counts as made by each spouse, so each may need to file.</li>
        </ul>
        <p>
          You do <strong>not</strong> need to file if all of your gifts were present interests of $19,000 or less per person and you made no gifts to your spouse — or, for a U.S.-citizen spouse, only outright gifts. Gifts that are fully deductible as gifts to charities generally do not require a return either.
        </p>

        <h2>Tuition and medical bills paid directly</h2>
        <p>
          Payments that meet these exclusions are not gifts for Form 709, so they do not use the $19,000 annual exclusion and are not reported:
        </p>
        <ul>
          <li><strong>Tuition</strong> paid <strong>directly</strong> to a qualifying U.S. or foreign school. Books, supplies, and room and board do not qualify, and contributions to a 529 plan do not qualify for this exclusion.</li>
          <li><strong>Medical care</strong> paid <strong>directly</strong> to the provider, including medical insurance paid for someone, but not amounts the recipient's insurance reimburses.</li>
        </ul>
        <p>
          Money given to the person, who then pays the school or doctor, is an ordinary gift. For a 529 contribution above $19,000, you may elect on Form 709 to spread up to $95,000 (2025) over 5 years.
        </p>

        <h2>Gift splitting for married couples</h2>
        <p>
          If both spouses consent, all gifts either of you make to other people during the year are treated as made one-half by each — so a couple can give $38,000 to one person in 2025 or 2026 without using any lifetime amount. To split gifts:
        </p>
        <ul>
          <li>you must be married to each other at the time of the gift, and neither of you can be a nonresident who is not a U.S. citizen;</li>
          <li>the consent applies to <strong>all</strong> gifts to third parties that year, not just one;</li>
          <li>both spouses generally file their own Form 709, unless a limited exception applies (for example, only one spouse made gifts, none over $38,000 to any person, all present interests); and</li>
          <li>each spouse becomes jointly and severally liable for the other's gift tax for that year.</li>
        </ul>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Mei</strong>, a U.S. citizen, gives her son $50,000 in 2025 toward a home down payment. She makes no other gifts to him that year.
        </p>
        <ArticleTable
          head={['', 'Without gift splitting', 'With gift splitting']}
          rows={[
            ['Gift treated as made by each spouse', '$50,000 (Mei only)', '$25,000 each'],
            ['Annual exclusion', '$19,000', '$19,000 each'],
            ['Taxable gift reported on Form 709', '$31,000', '$6,000 each'],
            ['Who files Form 709 by April 15, 2026', 'Mei', 'Mei and her husband (each files a return)'],
            ['Gift tax due (assuming no earlier taxable gifts near the limit)', 'None — uses $31,000 of her $13,990,000 basic exclusion amount', 'None — each uses $6,000 of their own amount'],
          ]}
        />
        <p>
          Because the gift is over $38,000, the consenting spouse must also file. Lenders may ask for a gift letter for a down payment; that is a mortgage requirement, not an IRS form. If the down payment money comes from family abroad, the rules are different — see <a href="/library/investment/foreign-gift-home-down-payment/">Foreign gift for a home down payment</a>.
        </p>

        <h2>Gifts to a non-citizen spouse</h2>
        <p>
          Gifts to a U.S.-citizen spouse generally qualify for an unlimited marital deduction. Gifts to a spouse who is <strong>not</strong> a U.S. citizen instead get a higher annual exclusion — <strong>$190,000</strong> for 2025 and <strong>$194,000</strong> for 2026 — for present-interest gifts. Above that, or for future-interest gifts, you file Form 709. Gift splitting is not available if either spouse is a nonresident non-citizen. See <a href="/library/individual/nonresident-spouse/">Nonresident spouse</a> for income tax filing questions.
        </p>

        <h2>Gifts of stock and other appreciated property</h2>
        <ul>
          <li><strong>Value for Form 709:</strong> the property's fair market value on the date of the gift.</li>
          <li><strong>Recipient's basis:</strong> under Publication 551, the recipient generally takes the donor's adjusted basis (plus some gift tax paid in certain cases) for figuring gain. If the value at the time of the gift was less than the donor's basis, the basis for figuring a loss is that lower value.</li>
          <li><strong>What this means:</strong> giving appreciated stock does not erase the built-in gain — the recipient generally pays tax on it when they sell. Giving stock to a child can also bring the kiddie tax into play; see <a href="/library/individual/kiddie-tax/">the kiddie tax guide</a>.</li>
        </ul>

        <h2>Form 709 vs. Form 3520</h2>
        <ArticleTable
          head={['', 'Form 709', 'Form 3520 (Part IV)']}
          rows={[
            ['Who files', 'A U.S. citizen or resident who makes a gift', 'A U.S. person who receives a gift from a foreign person'],
            ['Main trigger', 'Gifts over $19,000 to one person (2025 and 2026), and the other rules above', 'For example, more than $100,000 from a nonresident alien individual or foreign estate during the year'],
            ['Is tax due?', 'Only after lifetime taxable gifts use up the credit', 'It is an information return; the gift itself is generally not taxed to the recipient'],
          ]}
        />
        <p>
          A U.S. parent who sends money to a child is the <strong>donor</strong> and looks at Form 709. A U.S. child who receives money from parents abroad looks at Form 3520 instead. See <a href="/library/investment/foreign-gifts/">Foreign gifts and Form 3520</a>.
        </p>

        <h2>Deadline</h2>
        <p>
          Form 709 is an annual return, due by <strong>April 15</strong> of the year after the gift (the next business day if April 15 falls on a weekend or holiday). An extension of your income tax return (Form 4868 or Form 2350) also extends the time to file Form 709; otherwise you can use Form 8892. <strong>Neither extends the time to pay</strong> any gift tax.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Thinking filing means paying.</strong> Most Form 709 filers owe no gift tax.</li>
          <li><strong>Thinking the recipient reports the gift</strong> on their income tax return.</li>
          <li><strong>Paying tuition through the student</strong> instead of directly to the school.</li>
          <li><strong>Splitting only some gifts</strong> — consent covers all gifts to third parties for the year.</li>
          <li><strong>Confusing Form 709 with Form 3520</strong> when family abroad is involved.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Gifts in trust, gifts of business interests or real estate that need appraisals, gifts to grandchildren (generation-skipping transfer tax), gifts made by people who are not U.S. citizens or residents, and estate planning are beyond this guide. State gift or inheritance taxes are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

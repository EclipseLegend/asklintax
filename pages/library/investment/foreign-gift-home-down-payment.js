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
  id:            '33',
  title:         'Parents overseas helped with my U.S. home down payment — is it a foreign gift?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens who receive money from nonresident alien parents toward buying a U.S. home. Loans from parents, parents who become co-owners, money from foreign companies or trusts, and mortgage-lender requirements are outside the scope of this guide',
  persona:       ['First-time home buyers with parents abroad', 'Couples buying a home with family help', 'Green card holders and U.S. citizens with parents in Taiwan or China', 'Anyone asked by a lender to document funds from overseas'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Decide what the money really is: a gift, a loan, or your parents buying a share of the home. If it is a gift, add it to everything else your nonresident parents and their relatives gave you this year. If the total is more than $100,000, file Form 3520 Part IV. Keep the transfer records and a written gift statement either way.',
  sources: [
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Publication 551 — Basis of Assets', url: 'https://www.irs.gov/publications/p551' },
  ],
}

const FAQS = [
  {
    q: 'My parents wired the money straight to the escrow company, not to me. Does that keep it out of Form 3520?',
    a: 'Not by itself. The IRS foreign-gift guidance we reviewed does not specifically address payments to escrow. The direct-payment exception it does describe covers qualified tuition and medical payments — it is not a general housing exception. Whether a direct-to-escrow payment is a reportable gift to you depends on the substance: who the payment was for, who will own the home, and what actually happened. For a large payment, get the facts reviewed before deciding not to report it.',
  },
  {
    q: 'Is the down payment money taxable income to me?',
    a: 'If it is a true gift, generally no. Gifts and inheritances are generally not included in the recipient\'s income. Reporting on Form 3520, if required, is separate from income tax.',
  },
  {
    q: 'The lender asked for a "gift letter." Is that an IRS form?',
    a: 'No. A gift letter is something your mortgage lender may ask for to understand where your down payment came from. It is not a tax form and it does not replace Form 3520. It can still be a useful record that the money was a gift.',
  },
  {
    q: 'My parents want me to pay them back over time. Is it still a gift?',
    a: 'A real loan — with an expectation of repayment — is not a gift, so it is not reported on Form 3520 Part IV as a gift. Loans between family members raise their own questions (for example, interest). If repayment is informal or may be forgiven later, have the arrangement reviewed before you treat it as a loan or a gift.',
  },
  {
    q: 'Does a gift for my home change my home\'s tax basis?',
    a: 'A cash gift that you use to buy a home is part of what you paid for the home, so your basis starts with your purchase cost. Different basis rules apply when the property itself, rather than cash, is given or inherited. Keep your closing documents.',
  },
  {
    q: 'My spouse and I are buying the home together. Whose gift is it?',
    a: 'It depends on who actually received the gift. A transfer to one spouse, to both spouses, or to a joint account can be analyzed differently, and the answer affects whose $100,000 total it counts toward. See our guide for married couples.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to foreign gifts, taxability, and Form 3520.',
  },
  {
    href: '/library/investment/form-3520-married-couples',
    cat:  'Investments & Foreign Accounts',
    title: 'My spouse and I received money from overseas parents — how does Form 3520 work?',
    desc:  'Buying with a spouse? Why it matters who received the gift.',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
    desc:  'Down payment plus other support during the year: how it all adds up.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'If gift money sits in your own account abroad first, FBAR and Form 8938 may apply.',
  },
]

export default function ForeignGiftHomeDownPaymentPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Parents Abroad Helped With My Home Down Payment: Foreign Gift Rules | AskLinTax',
      description: 'Money from parents overseas for a U.S. home down payment: is it taxable, when Form 3520 applies, gift vs. loan vs. co-ownership, payments to escrow, and what records to keep.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          If your parents are nonresident aliens and they give you money toward your U.S. home, it is a <strong>foreign gift</strong> to you. It is generally <strong>not taxable income</strong>. Whether you must <strong>report</strong> it depends on the total: if gifts from your parents and foreign persons related to them come to more than <strong>$100,000</strong> in the tax year, you file <strong>Form 3520 Part IV</strong>.
        </p>
        <p>
          Buying a home doesn't create a special category. The down payment is counted with every other gift from the same family that year.
        </p>

        <h2>First question: what is the money, really?</h2>
        <p>
          Families often help with a home in different ways. The tax treatment follows what actually happened, not what the transfer is called.
        </p>
        <ArticleTable
          head={['Arrangement', 'What it usually is', 'Form 3520 Part IV?']}
          rows={[
            ['Parents give you money with no expectation of repayment', 'A gift to you', 'Counts toward the $100,000 related total'],
            ['Parents pay the escrow or seller directly for your home', 'Paying escrow directly does not by itself take it outside foreign-gift reporting; substance and ownership matter', 'Needs a fact-based review, especially for large amounts'],
            ['Parents lend you money and you will repay it', 'A loan, not a gift', 'Not reported as a gift; loan rules apply'],
            ['Parents put their own name on the title as co-owners', 'Their own investment, not a gift of that share', 'Needs professional review'],
            ['Money comes from a parent\'s company or a trust', 'Not an ordinary individual gift', 'Different rules — get professional help'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ There is no housing version of the direct-payment exception</div>
          <p>The direct-payment exception identified in the IRS foreign-gift guidance concerns qualified tuition and medical payments made on your behalf. It is not a general exception for housing. The IRS guidance we reviewed does not specifically address parents paying an escrow company, a seller, or a mortgage lender, so paying escrow directly does not by itself establish that the money falls outside foreign-gift reporting. The intended beneficiary, who owns the home, and the actual transaction facts matter. For a large direct-to-escrow arrangement, get individualized review.</p>
        </div>

        <h2>Reporting vs. tax: keep them apart</h2>
        <ul>
          <li><strong>Income tax:</strong> a true gift is generally not included in your income. You do not pay U.S. income tax because your parents helped you buy a home.</li>
          <li><strong>Reporting:</strong> Form 3520 Part IV is an information return, filed separately from your Form 1040, when your related total is more than $100,000 for the year.</li>
          <li><strong>Later income:</strong> if you rent the home out, the rent is taxable. When you sell, any gain is figured from your basis — generally your purchase cost, including the part paid with gift money.</li>
        </ul>

        <h2>A worked example</h2>
        <p>
          Lin and her husband, both U.S. citizens, buy a home in San Jose in 2025. Lin's parents, who live in Taichung and are not U.S. citizens or residents, wire <strong>$150,000</strong> to Lin's U.S. account in April for the down payment. In December they send another $10,000 as a holiday gift.
        </p>
        <ul>
          <li>The money is a gift to Lin; it is not taxable income.</li>
          <li>Lin knows her mother and father are related to each other, so under the aggregation rule she adds their gifts together: $160,000 for 2025 — more than $100,000 — so <strong>Lin</strong> files Form 3520 Part IV for 2025, listing both gifts (each is over $5,000).</li>
          <li>If the parents had instead sent $80,000 to Lin and $80,000 to her husband, the analysis of who received what — and whether one spouse was really receiving for the other — would need a closer look. See <a href="/library/investment/form-3520-married-couples/">our guide for married couples</a>.</li>
        </ul>

        <h2>Documentation and source of funds</h2>
        <p>
          Two different parties may want to see where your down payment came from, for two different reasons:
        </p>
        <ul>
          <li><strong>Your mortgage lender</strong> may ask for a gift letter, bank statements, or wire records to document the source of your funds. That is a lending requirement, not an IRS filing.</li>
          <li><strong>The IRS</strong> cares whether the money was a gift and, if your related total is over $100,000, whether you filed Form 3520. If a foreign gift is not reported, the IRS may decide the income tax consequences of the money itself.</li>
        </ul>
        <p>
          The same documents help with both. Gather them while the purchase is fresh:
        </p>
        <ul>
          <li>Wire confirmations showing the date, amount, sender, and receiving account</li>
          <li>A signed statement from your parents that the money is a gift with no repayment expected</li>
          <li>The exchange rate used to convert the amount to U.S. dollars</li>
          <li>Your closing statement showing how the funds were applied</li>
          <li>If the money passed through your own foreign account first, that account's statements</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Money that waits abroad first</div>
          <p>If your parents move the money into an account in your name outside the U.S. before you bring it over, that account is your foreign financial account. If your foreign accounts together exceed $10,000 at any time during the year, an FBAR is required, and Form 8938 may also apply. See <a href="/library/investment/foreign-bank-account/">Do I need to report a Taiwan or foreign bank account?</a></p>
        </div>

        <h2>Common mistakes</h2>
        <ul>
          <li>Assuming the lender's gift letter takes care of the IRS side</li>
          <li>Counting only the down payment and forgetting other gifts from the same family that year</li>
          <li>Calling a gift a "loan" (or a loan a "gift") without the facts to support it</li>
          <li>Assuming that because the money went to escrow instead of to you, it automatically falls outside Form 3520</li>
          <li>Missing Form 3520 because it is not part of the Form 1040 your preparer files</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Talk with a CPA or tax attorney if your parents will be on the title, if the help is a loan or partly a loan, if money comes from a family company or trust, if the gift went to you and your spouse in some combination, or if you already missed a Form 3520 deadline (see <a href="/library/investment/late-form-3520/">I filed Form 3520 late — what should I do now?</a>).
        </p>

      </KnowledgePage>
    </Layout>
  )
}

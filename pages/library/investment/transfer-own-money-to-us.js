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
  id:            '35',
  title:         'I transferred my own money from overseas to the U.S. — is it taxable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens moving their own funds from a foreign account to the U.S. It explains which questions depend on the transfer and which depend on where the money came from. Money held through a foreign company or trust, foreign-currency debt, and years with unreported income need professional review',
  persona:       ['New immigrants bringing savings to the U.S.', 'People closing a bank account in Taiwan or China', 'Green card holders with savings abroad', 'Anyone who sold an asset abroad and is moving the proceeds'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Moving your own money is not by itself income. Instead, ask where the money came from and whether that income was reported when it was earned, and check whether your foreign accounts require an FBAR or Form 8938 for any year they existed.',
  sources: [
    { label: 'IRS — Resident aliens (worldwide income)', url: 'https://www.irs.gov/individuals/international-taxpayers/resident-aliens' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Schedule B (Form 1040), Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — Foreign currency and currency exchange rates', url: 'https://www.irs.gov/individuals/international-taxpayers/foreign-currency-and-currency-exchange-rates' },
  ],
}

const FAQS = [
  {
    q: 'Do I need to tell the IRS when I wire my savings from Taiwan to the U.S.?',
    a: 'There is no tax return entry for the transfer itself. What you report are the things that already exist: income the money earned, your foreign accounts (on the FBAR and possibly Form 8938, and the foreign-account questions on Schedule B), and any gain if you sold something to raise the money.',
  },
  {
    q: 'Is moving my own money a gift that goes on Form 3520?',
    a: 'No. You cannot give a gift to yourself. Form 3520 Part IV covers gifts and bequests received from foreign persons. Moving your own savings between your own accounts is not reported there.',
  },
  {
    q: 'I saved this money from my salary in Taiwan before I moved to the U.S. Is it taxed now?',
    a: 'Moving it does not make it taxable. Whether the salary was ever subject to U.S. tax depends on your U.S. tax status when you earned it — for example, income earned before you became a U.S. resident is generally treated differently from income earned while you were one. Your year of arrival can be a dual-status year.',
  },
  {
    q: 'I closed my foreign account after the transfer. Do I still need to file an FBAR?',
    a: 'The FBAR looks at the whole calendar year. If your foreign accounts together were over $10,000 at any time during the year — including before you emptied and closed the account — an FBAR is required for that year.',
  },
  {
    q: 'Can moving money to the U.S. fix taxes I should have paid earlier?',
    a: 'No. Transferring money does not change whether income was taxable when it was earned, and it does not replace missed FBARs or other filings. If earlier years have unreported income or missing forms, talk to a tax professional about how to correct them.',
  },
  {
    q: 'My bank in the U.S. asked where the money came from. Is that the IRS?',
    a: 'No. Banks may ask about the source of large or international transfers for their own compliance reasons. Answer them accurately, and keep your own records of where the money came from — they help on the tax side too.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'The three questions every foreign account raises: interest, FBAR, and Form 8938.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Why the source of the money matters more than where it sits.',
  },
  {
    href: '/library/investment/sold-foreign-property-transfer',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold property overseas and moved the money to the U.S. — what must I report?',
    desc:  'If the money came from selling a home or apartment abroad.',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'If the money was actually a gift from family, different rules apply.',
  },
]

export default function TransferOwnMoneyPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Moving Your Own Money From Overseas to the U.S.: Is It Taxable? | AskLinTax',
      description: 'Transferring your own savings from Taiwan, China, or abroad to the U.S. is not income by itself. What actually matters: where the money came from, foreign account reporting (FBAR, Form 8938), and records.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          Moving <strong>your own money</strong> from your account abroad to your account in the U.S. is <strong>not by itself income</strong>, and it is not a gift. The wire transfer is not what decides your U.S. tax.
        </p>
        <p>
          What decides it is the <strong>history of the money</strong>: how you earned it, what it earned while it sat abroad, and whether you had to report the accounts it sat in. A transfer neither creates tax that wasn't there nor cures tax or reporting that was missed.
        </p>

        <ArticleTable
          head={['Question', 'Depends on the transfer?', 'What actually decides it']}
          rows={[
            ['Is the transfer itself income?', '—', 'No. Moving your own funds is not income.'],
            ['Was the original money taxable?', 'No', 'Your U.S. tax status and the type of income when it was earned'],
            ['Is interest earned abroad taxable?', 'No', 'U.S. citizens and residents report worldwide income, including foreign interest'],
            ['Do I need an FBAR?', 'No', 'Whether your foreign accounts together exceeded $10,000 at any time during the year'],
            ['Do I need Form 8938?', 'No', 'Whether your specified foreign financial assets exceeded your filing threshold'],
            ['Did I sell something to raise the money?', 'No', 'A sale can create a reportable gain, whenever or wherever the money moves'],
          ]}
        />

        <h2>Separate the transfer from the source</h2>
        <p>
          Think of the money in layers. Each layer has its own rule:
        </p>
        <ol>
          <li><strong>Where the principal came from.</strong> Salary, business income, an inheritance, a gift, or a sale. If it was income while you were a U.S. citizen or resident, it was reportable in the year you earned it. If it was earned before you became a U.S. resident, it is generally treated differently — see <a href="/library/individual/dual-status/">Dual-status tax returns</a>.</li>
          <li><strong>What it earned while abroad.</strong> Interest, dividends, and gains on foreign accounts are part of a U.S. resident's worldwide income, in the year they are earned — whether or not you ever bring the money home.</li>
          <li><strong>Where it sat.</strong> Foreign financial accounts have their own reporting: the FBAR (FinCEN Form 114), possibly Form 8938, and the foreign-account questions in Part III of Schedule B.</li>
          <li><strong>The transfer.</strong> Moving the money is the least important layer. It does not create income.</li>
        </ol>

        <h2>Foreign account reporting still applies to the year the account existed</h2>
        <p>
          Emptying a foreign account and closing it does not erase the year's reporting. The FBAR asks whether your foreign accounts together exceeded <strong>$10,000 at any time</strong> during the calendar year. If you moved $60,000 from Taiwan to the U.S. in June and closed the account, the account still had more than $10,000 earlier that year, so an FBAR is required for that year. Form 8938 has separate, higher thresholds. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.
        </p>

        <h2>Worked examples</h2>
        <h3>Savings from before moving</h3>
        <p>
          Hao worked in Taipei for ten years and moved to the U.S. on a green card in 2024. In 2025 he wires NT$3,000,000 of savings to his U.S. account and closes his Taiwan account. The transfer is not income. For 2025 he reports the interest the Taiwan account earned during 2025 (in U.S. dollars), answers the Schedule B foreign-account questions, and files an FBAR because the account was over $10,000 during the year. Whether his 2024 return also needed foreign interest or account reporting depends on his 2024 status, which may be dual-status.
        </p>
        <h3>Proceeds from a sale</h3>
        <p>
          Mei sells shares in a Taiwan brokerage account and moves the cash to the U.S. The transfer is not taxable, but the sale may be: as a U.S. resident, she reports the gain or loss in U.S. dollars for the year of the sale. If the money came from selling a home or apartment, see <a href="/library/investment/sold-foreign-property-transfer/">I sold property overseas and moved the money to the U.S.</a>
        </p>
        <h3>Money that was really from parents</h3>
        <p>
          If your parents put money into an account in their name and then send it to you, that is not your own money — it is a gift from them, and the Form 3520 rules for foreign gifts apply. See <a href="/library/investment/foreign-gifts/">Foreign gifts: is money from parents overseas taxable?</a>
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A transfer doesn't fix the past</div>
          <p>Bringing money to the U.S. doesn't make previously unreported income disappear, and it doesn't satisfy a missed FBAR or Form 8938. If you realize earlier years were incomplete, get professional advice on correcting them rather than hoping the transfer goes unnoticed.</p>
        </div>

        <h2>Currency and amounts in U.S. dollars</h2>
        <p>
          Everything on a U.S. return is in U.S. dollars. Interest and other income from abroad are translated using the IRS rules for foreign currency, and a sale's cost and proceeds are generally translated at the rates when you paid and received them. Converting foreign currency into dollars can, in some situations, produce a currency gain or loss of its own, and foreign-currency loans add another layer. If you are converting a large amount, or repaying or holding foreign-currency debt, have the currency side reviewed.
        </p>

        <h2>Records to keep</h2>
        <ul>
          <li>Foreign account statements for each year the account existed, including the highest balance</li>
          <li>Wire confirmations showing the transfer was between your own accounts</li>
          <li>Records showing where the money came from (pay slips, sale contracts, inheritance documents)</li>
          <li>The exchange rates you used</li>
          <li>Copies of FBARs and tax returns for the years involved</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Get help if the money was held through a foreign company, trust, or insurance product; if earlier years may have unreported foreign income or missing FBARs; if you are not sure when you became a U.S. resident; or if large amounts came from selling property or investments abroad.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

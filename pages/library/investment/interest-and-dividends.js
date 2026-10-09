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
  id:            '63',
  title:         'Do I have to report bank interest and dividends?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. bank interest and investment dividends received by individuals, and how they are reported on the federal income tax return. Foreign account reporting (FBAR, Form 8938), savings bond and original issue discount details, and state tax treatment are outside this guide',
  persona:       ['Anyone with a savings account or CD', 'People who received Form 1099-INT or 1099-DIV', 'New investors receiving dividends', 'People who earned a small amount of interest with no form'],
  relatedJourney: ['Investments & crypto', 'First-time filer'],
  actionRequired: 'Report all taxable interest and dividends on your return, even small amounts and even without a form. Use Forms 1099-INT and 1099-DIV, separate qualified from ordinary dividends, and file Schedule B if your taxable interest or ordinary dividends are over $1,500.',
  sources: [
    { label: 'IRS — Topic no. 403, Interest received', url: 'https://www.irs.gov/taxtopics/tc403' },
    { label: 'IRS — Topic no. 404, Dividends and other corporate distributions', url: 'https://www.irs.gov/taxtopics/tc404' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Instructions for Schedule B (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sb' },
    { label: 'IRS — Instructions for Forms 1099-INT and 1099-OID', url: 'https://www.irs.gov/instructions/i1099int' },
    { label: 'IRS — Instructions for Form 1099-DIV', url: 'https://www.irs.gov/instructions/i1099div' },
    { label: 'IRS — Topic no. 559, Net investment income tax', url: 'https://www.irs.gov/taxtopics/tc559' },
  ],
}

const FAQS = [
  {
    q: 'My bank paid me $6 of interest and didn\'t send a 1099. Do I report it?',
    a: 'Yes. A bank generally sends Form 1099-INT when interest is $10 or more, but that is the bank\'s reporting threshold, not yours. You must report all taxable interest, even without a form.',
  },
  {
    q: 'Why is Box 1b on my 1099-DIV smaller than Box 1a?',
    a: 'Box 1a shows your total ordinary dividends. Box 1b shows the part that counts as qualified dividends, which can be taxed at the lower 0%, 15%, or 20% capital gain rates. The rest of Box 1a is taxed at ordinary income rates.',
  },
  {
    q: 'Do I report tax-exempt interest, like municipal bond interest?',
    a: 'Yes, as information. Tax-exempt interest is reported on your return, but reporting it does not make it taxable.',
  },
  {
    q: 'My dividends are automatically reinvested. Do I still report them?',
    a: 'Generally yes. Publication 550 says dividends used to buy more shares through a dividend reinvestment plan are still dividend income that you report, even though you never received the cash. They also count toward the $1,500 Schedule B threshold. The reinvested amount becomes part of your cost basis in the new shares.',
  },
  {
    q: 'Do I need to file Schedule B?',
    a: 'You generally must file Schedule B if your taxable interest or ordinary dividends are over $1,500, and in certain other situations — including if you had a foreign financial account.',
  },
  {
    q: 'I have interest from a bank account in Taiwan. Is that different?',
    a: 'The income tax rule is the same: U.S. citizens and residents report worldwide interest. A foreign account can also raise separate FBAR and Form 8938 questions — see "Do I need to report a Taiwan or foreign bank account?"',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'Interest from abroad, plus FBAR and Form 8938.',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'The rates that also apply to qualified dividends.',
  },
  {
    href: '/library/individual/first-time-filer',
    cat:  'Individuals & Families',
    title: 'First-time filer in the U.S.: a complete step-by-step guide',
    desc:  'Where interest and dividends fit on your first return.',
  },
]

export default function InterestAndDividendsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Bank Interest and Dividends: Do You Have to Report Them? | AskLinTax',
      description: 'Forms 1099-INT and 1099-DIV explained: why all taxable interest must be reported, tax-exempt interest, ordinary vs. qualified dividends, and when Schedule B is required.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Yes. <strong>Taxable interest</strong> from banks, CDs, and similar accounts, and <strong>dividends</strong> from stocks and funds, are income you report on your federal tax return — even small amounts, and even if you never received a form. Interest is generally taxed at ordinary income rates. Dividends are split into <strong>ordinary</strong> dividends (ordinary rates) and <strong>qualified</strong> dividends (the lower capital gain rates). Not all dividends are taxed the same way.
        </p>

        <h2>Interest and Form 1099-INT</h2>
        <ul>
          <li>Most interest is taxable in the year it becomes available to you.</li>
          <li>A payer generally sends <strong>Form 1099-INT</strong> when interest is <strong>$10 or more</strong>. That is the payer's reporting threshold — you report all taxable interest, with or without a form.</li>
          <li><strong>Tax-exempt interest</strong> (for example, from many municipal bonds) is reported as information only. Reporting it does not make it taxable.</li>
        </ul>

        <h2>Dividends and Form 1099-DIV</h2>
        <ArticleTable
          head={['1099-DIV box', 'What it shows', 'How it is generally taxed']}
          rows={[
            ['Box 1a — total ordinary dividends', 'All ordinary dividends paid to you', 'At ordinary income rates, except the qualified part'],
            ['Box 1b — qualified dividends', 'The part of Box 1a that qualifies', 'At the 0%, 15%, or 20% capital gain rates'],
          ]}
        />
        <p>
          To be qualified, you generally must have held the stock for <strong>more than 60 days</strong> during the <strong>121-day period</strong> that begins 60 days before the ex-dividend date (preferred stock has a longer test). Some dividends never qualify, so rely on Box 1b rather than assuming. For the capital gain rate thresholds by year, see <a href="/library/investment/stock-sale-capital-gains/">I sold stock — how are capital gains taxed?</a>
        </p>

        <p>
          <strong>Reinvested dividends count too.</strong> If your dividends are automatically reinvested through a dividend reinvestment plan, they are generally still dividend income you report, even though you never received the cash. Publication 550 also counts reinvested dividends toward the $1,500 Schedule B threshold.
        </p>

        <h2>When Schedule B is required</h2>
        <p>
          You generally must file <strong>Schedule B</strong> if your taxable interest or ordinary dividends are <strong>over $1,500</strong>. Other situations also require it, such as receiving interest or dividends as a nominee, or having a financial account in a foreign country (Part III asks about foreign accounts).
        </p>

        <h2>Example (illustrative)</h2>
        <p>
          In 2025, Ray received a 1099-INT showing $420 of savings interest and a 1099-DIV showing $900 in Box 1a, of which $700 is in Box 1b. He also earned $8 of interest at another bank that sent no form. Ray reports $428 of interest and $900 of ordinary dividends; $700 of the dividends is taxed at the qualified dividend rates. Because neither total is over $1,500, Schedule B is not required for that reason alone.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Income tax reporting is not FBAR reporting</div>
          <p>Reporting interest on your tax return is separate from reporting a foreign account on the FBAR or Form 8938. Interest from a foreign bank is still income; the account itself may have its own reporting. See <a href="/library/investment/foreign-bank-account/">Do I need to report a Taiwan or foreign bank account?</a></p>
        </div>

        <h2>At higher incomes</h2>
        <p>
          Interest and dividends are investment income for the separate 3.8% net investment income tax, which can apply when modified adjusted gross income exceeds $200,000 (single or head of household), $250,000 (married filing jointly), or $125,000 (married filing separately).
        </p>

      </KnowledgePage>
    </Layout>
  )
}

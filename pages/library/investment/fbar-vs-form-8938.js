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
  id:            '23',
  title:         'FBAR vs. Form 8938: what\'s the difference?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers FBAR (FinCEN Form 114) and Form 8938 for individuals. Thresholds for specified domestic entities, U.S. territories, and dual-resident treaty filers are only summarized',
  persona:       ['Anyone with bank or investment accounts outside the U.S.', 'New immigrants', 'Green card holders', 'Families with accounts in Taiwan or China'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Check both tests separately: FBAR if your foreign accounts together exceeded $10,000 at any time in 2025, and Form 8938 if your specified foreign financial assets exceeded your Form 8938 threshold. Filing one never satisfies the other.',
  sources: [
    { label: 'IRS — Comparison of Form 8938 and FBAR requirements', url: 'https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/instructions/i8938' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
    { label: 'IRS — Instructions for Schedule B (Form 1040), Part III', url: 'https://www.irs.gov/instructions/i1040sb' },
  ],
}

const FAQS = [
  {
    q: 'If I file Form 8938, do I still need to file an FBAR?',
    a: 'Yes, if you meet the FBAR requirement. The IRS states that the Form 8938 requirement does not replace or otherwise affect your obligation to file an FBAR. They are separate filings with separate thresholds sent to different agencies.',
  },
  {
    q: 'I don\'t have to file a U.S. income tax return. Do I need Form 8938?',
    a: 'No. If you do not have to file an income tax return for the year, you do not have to file Form 8938, even if your foreign assets are above the threshold. The FBAR is different — it can still be required.',
  },
  {
    q: 'Does a house I own in Taiwan count for FBAR or Form 8938?',
    a: 'Foreign real estate you own directly is not reported on either form. If you hold it through a foreign company, the company interest may be a specified foreign financial asset for Form 8938.',
  },
  {
    q: 'My Taiwan account is at the overseas branch of a U.S. bank. Which form applies?',
    a: 'According to the IRS comparison table, an account at a foreign branch of a U.S. financial institution is reported on the FBAR, but not on Form 8938.',
  },
  {
    q: 'What exchange rate do I use?',
    a: 'For both forms, the IRS comparison says to determine the maximum value and convert it to U.S. dollars using the exchange rate at the end of the year. Use the same approach consistently for every account.',
  },
  {
    q: 'What are the penalties?',
    a: 'For Form 8938: up to $10,000 for failure to file, plus up to $10,000 for each 30 days of continued failure after an IRS notice, up to a $60,000 maximum; criminal penalties may also apply. FBAR civil penalty maximums are set in Title 31 and adjusted for inflation each year, and criminal penalties may also apply.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'The full FBAR guide: who must file, how the $10,000 threshold works, and how to file through BSA E-Filing.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'A step-by-step check of income tax, FBAR, and Form 8938 for one account abroad.',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Why real estate abroad is treated differently from foreign accounts.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'FBAR and Form 8938 are disclosure forms. Income from those accounts is reported on your tax return.',
  },
]

export default function FbarVsForm8938Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'FBAR vs. Form 8938 (FATCA): Thresholds, Deadlines & Differences | AskLinTax',
      description: 'FBAR and Form 8938 are separate requirements. Compare thresholds, who files, what assets count, deadlines, and where each form is filed — with examples for Taiwan and China accounts.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>Two forms, two agencies, two thresholds</h2>
        <p>
          If you have money outside the United States, you will hear about two reporting requirements: the <strong>FBAR</strong> (FinCEN Form 114) and <strong>Form 8938</strong> (Statement of Specified Foreign Financial Assets, the form created under FATCA). They ask similar questions, so people often assume one replaces the other. It doesn't.
        </p>
        <ul>
          <li>The <strong>FBAR</strong> is filed electronically with FinCEN, a bureau of the Treasury Department — <em>not</em> with the IRS and not with your tax return.</li>
          <li><strong>Form 8938</strong> is attached to your income tax return and filed with the IRS.</li>
        </ul>
        <p>
          You must check each requirement on its own. Many people with foreign accounts file both; some file only an FBAR; some file neither.
        </p>

        <h2>Side-by-side comparison</h2>
        <ArticleTable
          head={['', 'FBAR (FinCEN Form 114)', 'Form 8938']}
          rows={[
            ['Who files', 'U.S. persons: citizens, resident aliens, and domestic entities, trusts, and estates', 'Specified individuals (U.S. citizens, resident aliens, and certain nonresident aliens) and specified domestic entities'],
            ['Threshold', 'Foreign financial accounts total more than $10,000 at any time during the calendar year', 'Depends on filing status and where you live — see the next table'],
            ['What is reported', 'Maximum value of financial accounts at institutions located in a foreign country', 'Maximum value of specified foreign financial assets — foreign accounts plus certain non-account investments'],
            ['Filed with', 'FinCEN, through the BSA E-Filing System', 'The IRS, attached to your income tax return'],
            ['Due date', 'April 15, with an automatic extension to October 15', 'The due date of your income tax return, including extensions'],
            ['If no income tax return is required', 'Still may be required', 'Not required'],
          ]}
        />

        <h2>Form 8938 thresholds</h2>
        <p>Form 8938 is required when the total value of your specified foreign financial assets is more than the threshold for your situation:</p>
        <ArticleTable
          head={['Your situation', 'Last day of the tax year — more than', 'Any time during the year — more than']}
          rows={[
            ['Living in the U.S. — unmarried or married filing separately', '$50,000', '$75,000'],
            ['Living in the U.S. — married filing jointly', '$100,000', '$150,000'],
            ['Living outside the U.S. — unmarried or married filing separately', '$200,000', '$300,000'],
            ['Living outside the U.S. — married filing jointly', '$400,000', '$600,000'],
          ]}
        />
        <p>
          You meet the threshold if <em>either</em> test is exceeded. The FBAR threshold, by contrast, is a single test: more than <strong>$10,000 combined at any time</strong>, regardless of filing status.
        </p>

        <h2>What counts for each form</h2>
        <ArticleTable
          head={['Type of foreign asset', 'FBAR', 'Form 8938']}
          rows={[
            ['Deposit and custodial accounts at foreign financial institutions', 'Yes', 'Yes'],
            ['Account at a foreign branch of a U.S. financial institution', 'Yes', 'No'],
            ['Account at a U.S. branch of a foreign financial institution', 'No', 'No'],
            ['Foreign account you only have signature authority over', 'Yes, subject to exceptions', 'No, unless you also have an interest in it'],
            ['Foreign stock or securities held in a foreign financial account', 'The account is reported', 'The account is reported'],
            ['Foreign stock or securities not held in an account', 'No', 'Yes'],
            ['Foreign mutual funds', 'Yes', 'Yes'],
            ['Foreign-issued life insurance or annuity with a cash value', 'Yes', 'Yes'],
            ['Foreign real estate held directly', 'No', 'No'],
            ['Foreign currency or precious metals held directly', 'No', 'No'],
            ['Foreign government social security-type benefits', 'No', 'No'],
          ]}
        />
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Summarized from the IRS comparison table. Check the instructions for each form for complete rules.</p>

        <h2>Four common situations</h2>
        <ArticleTable
          head={['Situation (living in the U.S.)', 'FBAR?', 'Form 8938?']}
          rows={[
            ['Single; one Taiwan savings account; highest balance $30,000', 'Yes — over $10,000', 'No — under $50,000 at year end and $75,000 at any time'],
            ['Single; Taiwan accounts worth $120,000 at year end', 'Yes', 'Yes — over $50,000 at year end'],
            ['Married filing jointly; combined foreign accounts peaked at $90,000', 'Yes', 'No — under the $100,000 / $150,000 joint thresholds'],
            ['Single; owns an apartment in Taiwan directly, no foreign accounts', 'No', 'No — real estate held directly is not reported'],
          ]}
        />

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Don't forget Schedule B</div>
          <p>Separately from both forms, Part III of Schedule B (Form 1040) asks whether at any time during 2025 you had a financial interest in or signature authority over a financial account in a foreign country. The instructions say to check "Yes" even if you are not required to file an FBAR.</p>
        </div>

        <h2>Values and exchange rates</h2>
        <p>
          Both forms report the <strong>maximum value</strong> of each account or asset during the year, in U.S. dollars. For both, the IRS comparison says to convert using the exchange rate for the <strong>last day of the year</strong>. For an FBAR, use your periodic account statements to find the maximum value in the account's own currency first.
        </p>

        <h2>Reporting is not the same as tax</h2>
        <p>
          Neither form is a tax. They are disclosure forms. The <strong>income</strong> your foreign accounts earn — interest, dividends, gains — is reported separately on your income tax return if you are a U.S. citizen or resident. See <a href="/library/individual/worldwide-income/">Foreign income: do U.S. tax residents report worldwide income?</a>
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Penalties are serious on both</div>
          <p>Form 8938: up to $10,000 for failing to file, plus up to $10,000 for each 30 days of continued failure after IRS notice (up to $60,000), and criminal penalties may apply. FBAR: civil penalty maximums are adjusted for inflation each year, and criminal penalties may apply. If you have missed either form in past years, talk to a tax professional before filing late.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

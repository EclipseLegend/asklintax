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
  id:            '48',
  title:         'I forgot to file an FBAR — what should I do?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Describes, at a high level, the IRS compliance options for individuals who missed FBARs. It does not predict penalties or decide which option fits a particular case; willfulness, unreported income, and open IRS examinations change the analysis and need professional advice',
  persona:       ['People who just learned about the FBAR', 'New immigrants who missed FBARs for earlier years', 'Anyone named on a parent\'s foreign account who never reported it', 'Taxpayers who received an IRS letter about foreign accounts'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Don\'t ignore a missed FBAR. First sort out two facts: whether the IRS has already contacted you, and whether all income from the foreign accounts was reported and taxed. Those facts decide which IRS procedure may fit. If there is unreported income or any IRS contact, get professional advice before filing.',
  sources: [
    { label: 'IRS — Delinquent FBAR submission procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/delinquent-fbar-submission-procedures' },
    { label: 'IRS — Options available for U.S. taxpayers with undisclosed foreign financial assets', url: 'https://www.irs.gov/individuals/international-taxpayers/options-available-for-us-taxpayers-with-undisclosed-foreign-financial-assets' },
    { label: 'IRS — Streamlined filing compliance procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures' },
    { label: 'IRS — Criminal Investigation Voluntary Disclosure Practice', url: 'https://www.irs.gov/compliance/criminal-investigation/irs-criminal-investigation-voluntary-disclosure-practice' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'FinCEN — Report Foreign Bank and Financial Accounts', url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts' },
  ],
}

const FAQS = [
  {
    q: 'If I just file the late FBAR now, is everything fixed?',
    a: 'Not necessarily. Filing late FBARs is one part of the picture. Whether a penalty may apply, and which IRS procedure fits, depends on facts such as whether all income from the accounts was reported and taxed and whether the IRS has already contacted you.',
  },
  {
    q: 'All the interest from my Taiwan account was on my tax returns. I just didn\'t file FBARs. What applies?',
    a: 'The IRS\'s delinquent FBAR submission procedures are aimed at this situation: you are not under a civil examination or criminal investigation, the IRS has not already contacted you about the delinquent FBARs, and you properly reported and paid tax on the income from the accounts. The IRS says it will not impose a penalty for the failure to file in that case, subject to its stated conditions — read them carefully or have a professional confirm you qualify.',
  },
  {
    q: 'I never reported the interest either. What then?',
    a: 'Then the delinquent FBAR procedures are not the right fit by themselves, because there is also unreported income. The IRS describes other options, such as the streamlined filing compliance procedures for non-willful conduct and the Criminal Investigation Voluntary Disclosure Practice for willful conduct. Which applies is a serious decision — talk to a tax professional.',
  },
  {
    q: 'How do I file a late FBAR?',
    a: 'Electronically through FinCEN\'s BSA E-Filing System, like a regular FBAR. The IRS delinquent procedures say to include a statement explaining why you are filing late, and the e-filing form lets you select a reason for filing late.',
  },
  {
    q: 'Can my FBAR be audited after I file late?',
    a: 'The IRS says FBARs filed under the delinquent procedures will not be automatically subject to audit, but they may be selected through the existing audit selection processes.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR: do I need to report my foreign bank accounts?',
    desc:  'Who must file, what counts, and how to file through BSA E-Filing.',
  },
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'Before filing late, confirm which years actually required an FBAR.',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'I filed Form 3520 late — what should I do now?',
    desc:  'Missed a foreign gift report too? A separate procedure applies.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'If the IRS has already contacted you, start here.',
  },
]

export default function LateFbarPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Forgot to File an FBAR? IRS Options for Late FBARs | AskLinTax',
      description: 'Missed an FBAR for your foreign accounts? How the IRS delinquent FBAR procedures, streamlined procedures, and voluntary disclosure differ, why unreported income and IRS contact matter, and when to get help.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Don't ignore it, and don't assume one fix fits everyone. The IRS describes <strong>different options</strong> for people who missed FBARs, and which one may apply depends mainly on two facts:
        </p>
        <ol>
          <li><strong>Has the IRS already contacted you</strong> — or are you under a civil examination or criminal investigation?</li>
          <li><strong>Was all income from the foreign accounts reported</strong> on your U.S. tax returns, with the tax paid?</li>
        </ol>
        <p>
          FBAR penalties can be serious, and they depend on the facts — including whether a failure was willful. Nobody can promise "no penalty" in advance. For anything beyond the simplest case, get individual professional advice.
        </p>

        <h2>Match your situation to the IRS options</h2>
        <ArticleTable
          head={['Your situation', 'Option the IRS describes', 'Notes']}
          rows={[
            ['Not under examination or investigation, not contacted by the IRS about the FBARs, and all account income was reported and taxed', 'Delinquent FBAR submission procedures', 'File the late FBARs with a statement explaining why they are late'],
            ['Account income was not fully reported, and the conduct was non-willful', 'Streamlined filing compliance procedures', 'Requires a certification of non-willful conduct signed under penalties of perjury; see the IRS page for the returns and FBARs involved'],
            ['Conduct was willful, with potential criminal exposure', 'IRS Criminal Investigation Voluntary Disclosure Practice', 'Get a tax attorney before taking any step'],
            ['Already under examination, or the IRS has contacted you', 'The procedures above may not be available', 'Respond to the IRS with professional help'],
          ]}
        />

        <h2>The delinquent FBAR submission procedures</h2>
        <p>
          The IRS says taxpayers who have not filed a required FBAR, are <strong>not</strong> under a civil examination or criminal investigation, and have <strong>not</strong> already been contacted by the IRS about the delinquent FBARs should file the delinquent FBARs according to the FBAR instructions, including a statement explaining why they are filing late. FBARs are filed electronically through FinCEN's BSA E-Filing System, where you can select a reason for filing late.
        </p>
        <p>
          The IRS states that it will not impose a penalty for the failure to file the delinquent FBARs if you properly reported on your U.S. tax returns, and paid all tax on, the income from the foreign financial accounts reported on the delinquent FBARs, and you have not previously been contacted regarding an income tax examination or a request for delinquent returns for those years. Read the IRS conditions carefully — they are specific.
        </p>

        <h2>If there is unreported income</h2>
        <p>
          If interest, dividends, or other income from your foreign accounts was not reported, filing late FBARs alone does not address the tax side. The IRS describes the <strong>streamlined filing compliance procedures</strong> for taxpayers whose failures were non-willful, and the <strong>Criminal Investigation Voluntary Disclosure Practice</strong> for taxpayers with willful conduct and potential criminal exposure. Choosing between them requires judgment about your facts — get professional help.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ What not to do</div>
          <p>Don't simply start filing FBARs going forward and hope earlier years go unnoticed, and don't overstate or invent facts in a late-filing statement. If the IRS has already contacted you, don't choose a procedure on your own — respond with professional help.</p>
        </div>

        <h2>Example</h2>
        <p>
          Jun, a U.S. resident since 2021, kept a Taiwan account above $10,000 every year and reported its interest on each tax return, but never filed an FBAR. The IRS has not contacted him. His facts line up with the delinquent FBAR submission procedures, so — after confirming the conditions — he files the missed FBARs through BSA E-Filing with a statement explaining why they are late. If he had also left the interest off his returns, he would need to look at other options with a professional.
        </p>

        <h2>Before you file anything</h2>
        <ul>
          <li>Confirm which years actually required an FBAR — see <a href="/library/investment/fbar-10000-rule/">How the $10,000 rule really works</a>.</li>
          <li>Gather statements to find each account's maximum value — see <a href="/library/investment/fbar-maximum-account-value/">maximum account value</a>.</li>
          <li>Check whether the account income was reported on each year's return.</li>
          <li>Check whether Form 8938 was also required for those years.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

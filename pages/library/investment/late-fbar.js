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
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Describes, at a high level, the IRS compliance options for individuals who missed FBARs, as shown on IRS.gov when rechecked in October 2026: the IRS FBAR page (reviewed July 2026), the options page (reviewed June 2026), and the streamlined and voluntary disclosure pages. The former delinquent FBAR submission procedures page no longer appears on IRS.gov, and no official IRS explanation of its removal was found. It does not predict penalties or decide which option fits a particular case; willfulness, unreported income, and open IRS examinations change the analysis and need professional advice',
  persona:       ['People who just learned about the FBAR', 'New immigrants who missed FBARs for earlier years', 'Anyone named on a parent\'s foreign account who never reported it', 'Taxpayers who received an IRS letter about foreign accounts'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Don\'t ignore a missed FBAR. First sort out two facts: whether the IRS has already contacted you, and whether all income from the foreign accounts was reported and taxed. Those facts decide which IRS procedure may fit. If there is unreported income or any IRS contact, get professional advice before filing.',
  sources: [
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
    a: 'If the IRS has not contacted you about the late FBARs and you are not under civil or criminal investigation, the IRS FBAR page says to file the late FBARs as soon as possible, explaining your reason for filing late, to keep potential penalties to a minimum. Filing late is still a violation that may bring penalties. The IRS used to describe separate delinquent FBAR submission procedures that said no penalty would be imposed in this situation, but that page is no longer on IRS.gov and the procedure is not among the options the IRS currently lists. Do not count on automatic penalty relief — consider professional advice.',
  },
  {
    q: 'I never reported the interest either. What then?',
    a: 'Then filing late FBARs alone does not fix the problem, because there is also unreported income. The IRS describes other options, such as the streamlined filing compliance procedures for non-willful conduct and the Criminal Investigation Voluntary Disclosure Practice for willful conduct. Which applies is a serious decision — talk to a tax professional.',
  },
  {
    q: 'How do I file a late FBAR?',
    a: 'Electronically through FinCEN\'s BSA E-Filing System, like a regular FBAR. The IRS FBAR page says to follow FinCEN\'s instructions to explain your reason for filing late. If you use a compliance option such as the streamlined procedures, follow that option\'s own instructions instead.',
  },
  {
    q: 'What happened to the delinquent FBAR submission procedures?',
    a: 'The IRS page for that procedure now returns an error, and the IRS options page (reviewed June 30, 2026) lists only the Criminal Investigation Voluntary Disclosure Practice, the streamlined filing compliance procedures, and the delinquent international information return procedures — which concern IRS information returns such as Form 3520 and do not mention FBARs. We did not find an official IRS announcement explaining the change. Filing late FBARs with an explanation is still described on the IRS FBAR page, but without any promise of no penalty.',
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
      description: 'Missed an FBAR for your foreign accounts? How filing late FBARs with an explanation, the streamlined procedures, and voluntary disclosure differ, what happened to the delinquent FBAR procedures, why unreported income and IRS contact matter, and when to get help.',
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
            ['Not under examination or investigation, not contacted by the IRS about the FBARs, and all account income was reported and taxed', 'File the late FBARs as soon as possible, explaining your reason for filing late (IRS FBAR page)', 'Penalties may still apply; the IRS no longer lists a separate no-penalty procedure for this situation'],
            ['Account income was not fully reported, and the conduct was non-willful', 'Streamlined filing compliance procedures', 'Requires a certification of non-willful conduct signed under penalties of perjury; see the IRS page for the returns and FBARs involved'],
            ['Conduct was willful, with potential criminal exposure', 'IRS Criminal Investigation Voluntary Disclosure Practice', 'Get a tax attorney before taking any step'],
            ['Already under examination, or the IRS has contacted you', 'The procedures above may not be available', 'Respond to the IRS with professional help'],
          ]}
        />

        <h2>Filing late FBARs when all income was reported</h2>
        <p>
          The IRS FBAR page (reviewed July 30, 2026) says that filing an FBAR late or not at all is a violation and may subject you to penalties. If the IRS has <strong>not</strong> contacted you about a late FBAR and you are <strong>not</strong> under civil or criminal investigation, it says to file the late FBARs <strong>as soon as possible to keep potential penalties to a minimum</strong>, following FinCEN's instructions to explain your reason for filing late. FBARs are filed electronically through FinCEN's BSA E-Filing System.
        </p>
        <p>
          The IRS once described separate <strong>delinquent FBAR submission procedures</strong> for this situation, with a statement that it would not impose a penalty if the account income had been properly reported and taxed. That page no longer appears on IRS.gov, and the IRS options page now lists only the voluntary disclosure practice, the streamlined procedures, and the delinquent international information return procedures (which concern IRS information returns such as Form 3520 and do not mention FBARs). We found no official IRS notice explaining the change. Because of that uncertainty, do not rely on older descriptions of a guaranteed no-penalty result — explain your reasons accurately and consider professional advice.
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
          Jun, a U.S. resident since 2021, kept a Taiwan account above $10,000 every year and reported its interest on each tax return, but never filed an FBAR. The IRS has not contacted him. Following the IRS FBAR page, he files the missed FBARs through BSA E-Filing as soon as possible and explains why they are late. Penalties may still apply, so he considers professional advice, especially if the balances were large. If he had also left the interest off his returns, he would need to look at the streamlined procedures or other options with a professional.
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

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
  id:            '93',
  title:         'Foreign Mutual Funds and ETFs: PFIC Rules and Form 8621',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the passive foreign investment company (PFIC) rules and Form 8621 filing for individuals for tax years 2025 and 2026, based on Form 8621 and its instructions (Rev. December 2025), the Instructions for Form 8938, Publication 514 (2025), and the preamble to the final section 1298(f) regulations (T.D. 9806, Internal Revenue Bulletin 2017-4). It does not determine whether any particular fund is a PFIC, does not compute the section 1291 tax and interest charge, and does not cover PFICs owned through partnerships, trusts, or other PFICs in detail, or state tax',
  persona:       ['People holding Taiwan or other non-U.S. mutual funds or ETFs', 'U.S. residents with a foreign brokerage or bank investment account', 'New U.S. residents who bought foreign funds before moving', 'Anyone who received a foreign fund distribution or sold foreign fund shares'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Find out whether each foreign fund or company you own is a PFIC, using the fund\'s own information and professional help. If it is, check each year whether Form 8621 is required, whether a filing exception applies, and whether a QEF or mark-to-market election is available, and file Form 8621 with your return when required.',
  sources: [
    { label: 'IRS — Instructions for Form 8621 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf' },
    { label: 'IRS — Form 8621 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/f8621.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2017-4, T.D. 9806 (section 1298(f) final regulations)', url: 'https://www.irs.gov/pub/irs-irbs/irb17-04.pdf' },
    { label: 'IRS — Notice 2014-51 (section 1298(f) reporting)', url: 'https://www.irs.gov/pub/irs-drop/n-14-51.pdf' },
    { label: 'IRS — Instructions for Form 8938', url: 'https://www.irs.gov/pub/irs-pdf/i8938.pdf' },
    { label: 'IRS — Publication 514 (2025), Foreign Tax Credit for Individuals', url: 'https://www.irs.gov/publications/p514' },
  ],
}

const FAQS = [
  {
    q: 'Is every Taiwan ETF or mutual fund a PFIC?',
    a: 'Not automatically. A foreign corporation is a PFIC if it meets the income test or the asset test in the Form 8621 instructions. Many foreign pooled funds can meet those tests, but whether a particular fund is a PFIC — and whether it is even a corporation for U.S. tax purposes — depends on its structure and facts. The IRS does not publish a list.',
  },
  {
    q: 'Do I have to file Form 8621 if I received no distributions and sold nothing?',
    a: 'Possibly. One of the five filing triggers is the annual report required under section 1298(f). The Form 8621 instructions provide limited exceptions, such as the $25,000 ($50,000 joint) exception for certain section 1291 funds, but only when you received no excess distribution and recognized no gain.',
  },
  {
    q: 'Is the $25,000 rule a general exemption?',
    a: 'No. It is a narrow exception to completing Part I for a section 1291 fund. It counts the value of all your PFIC stock, applies only if you received no excess distribution and recognized no gain on that fund, and does not change how the income is taxed. It also does not apply if you have a QEF or mark-to-market election to report.',
  },
  {
    q: 'What happens if I don\'t file a required Form 8621?',
    a: 'If Form 8621 was required, the final regulations\' preamble (T.D. 9806) explains that the period for the IRS to assess tax for the related return does not end until three years after the information is reported. If the failure is due to reasonable cause and not willful neglect, the extension applies only to items related to the PFIC. If Form 8621 was not required for the year, Notice 2014-51 says not filing does not extend the period.',
  },
  {
    q: 'Can I avoid the excess distribution rules?',
    a: 'Sometimes. A qualified electing fund (QEF) election or a mark-to-market election, if available and timely, changes how the investment is taxed. A QEF election requires an annual information statement from the fund. Mark-to-market is available only for marketable stock.',
  },
  {
    q: 'Do I also report the fund on Form 8938?',
    a: 'If you timely file Form 8621 for the asset, the Form 8938 instructions treat it as duplicative reporting: you do not report the asset again on Form 8938, but you identify on Form 8938 that you filed Form 8621. FBAR reporting is a separate requirement.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-brokerage-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign brokerage accounts and stocks: what goes on FBAR and Form 8938?',
    desc:  'FBAR and Form 8938 reporting for foreign investment accounts.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'The two foreign account reports compared.',
  },
  {
    href: '/library/individual/foreign-tax-credit',
    cat:  'Individuals & Families',
    title: 'Foreign Tax Credit (Form 1116): Avoiding Double Tax on Taiwan and Other Foreign Income',
    desc:  'Foreign tax on fund income and the credit.',
  },
  {
    href: '/library/individual/us-taxpayer-living-abroad',
    cat:  'Individuals & Families',
    title: 'Living in Taiwan or Abroad: Your U.S. Tax Filing Checklist',
    desc:  'Where PFICs fit among other filing steps.',
  },
]

export default function PficForm8621Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Foreign Mutual Funds and ETFs: PFIC Rules and Form 8621 | AskLinTax',
      description: 'PFIC rules explained: the income and asset tests, foreign mutual funds and ETFs, Form 8621 filing triggers and narrow exceptions, excess distributions, QEF and mark-to-market elections, and the statute of limitations.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>passive foreign investment company (PFIC)</strong> is a foreign corporation whose income or assets are mostly passive. Many foreign mutual funds and ETFs can fall into this category. If you own PFIC shares, special tax rules can apply when you receive certain distributions or sell, and you may have to file <strong>Form 8621</strong> each year. Whether a fund is a PFIC, whether Form 8621 is required, and how the income is taxed are three separate questions.
        </p>

        <h2>What is a PFIC</h2>
        <p>
          Under the Form 8621 instructions, a foreign corporation is a PFIC if it meets either test for its tax year:
        </p>
        <ul>
          <li><strong>Income test:</strong> 75% or more of its gross income is passive income.</li>
          <li><strong>Asset test:</strong> at least 50% of its assets (on average) produce passive income or are held to produce passive income.</li>
        </ul>
        <p>
          <strong>Foreign mutual funds and ETFs:</strong> a fund that invests in stocks or bonds typically earns passive income such as dividends, interest, and gains. But do not assume every Taiwan or other foreign fund is a PFIC: the answer depends on how the fund is organized and classified for U.S. tax purposes and on its actual income and assets. Use the fund's own documentation and professional advice.
        </p>

        <h2>When Form 8621 is required</h2>
        <p>
          Generally, a U.S. person who is a direct or indirect PFIC shareholder must file Form 8621 for each tax year in which the person:
        </p>
        <ol>
          <li>receives certain direct or indirect distributions from a PFIC;</li>
          <li>recognizes gain on a direct or indirect disposition of PFIC stock;</li>
          <li>is reporting information for a qualified electing fund (QEF) or mark-to-market election;</li>
          <li>is making an election reported in Part II of the form; or</li>
          <li>is required to file an annual report under section 1298(f).</li>
        </ol>
        <p>
          Form 8621 is attached to your tax return and filed by its due date, including extensions. If you are not required to file a return, the instructions say to file Form 8621 directly with the IRS in Ogden, Utah.
        </p>

        <h2>Filing versus taxation</h2>
        <p>
          Filing Form 8621 and owing tax are different. You may have to file in a year with no taxable income from the fund (for example, the annual section 1298(f) report). With a QEF election, you may owe tax on your share of the fund's earnings even without a distribution. And a filing exception, where one applies, does not change how a distribution or sale is taxed.
        </p>

        <h2>Narrow filing exceptions</h2>
        <ul>
          <li><strong>$25,000 / $50,000 exception:</strong> you do not have to complete Part I for a specific section 1291 fund if, on the last day of your tax year, the value of <strong>all</strong> your PFIC stock (counted as the instructions describe) is $25,000 or less ($50,000 or less on a joint return), and you did not receive an excess distribution from or recognize gain on that fund. It is not a blanket exemption.</li>
          <li><strong>$5,000 indirect exception:</strong> a similar exception applies to certain indirect holdings of $5,000 or less, under the same conditions.</li>
        </ul>
        <p>
          The instructions and Regulations section 1.1298-1 contain other exceptions and limits; check them for your situation.
        </p>

        <h2>The default rules: excess distributions and sales</h2>
        <p>
          If you made no QEF or mark-to-market election, the fund is generally a <strong>section 1291 fund</strong> for you:
        </p>
        <ul>
          <li>An <strong>excess distribution</strong> is the part of this year's distributions that is more than 125% of the average distributions you received in the 3 preceding tax years (or your shorter holding period). Distributions in your first year of holding are not excess distributions.</li>
          <li>The <strong>entire gain</strong> on selling section 1291 fund shares is treated as an excess distribution.</li>
          <li>The excess distribution is allocated to each day of your holding period. Amounts allocated to the current year and to years before the company was a PFIC are taxed as <strong>ordinary income</strong>. Amounts allocated to earlier PFIC years are subject to a <strong>separate tax and an interest charge</strong> under section 1291(c).</li>
        </ul>
        <p>
          These calculations are done on Form 8621, Part V. This guide does not illustrate them with numbers, because the result depends on your holding period and history.
        </p>

        <h2>The elections</h2>
        <ArticleTable
          head={['', 'QEF election', 'Mark-to-market election']}
          rows={[
            ['Availability', 'Requires the fund to provide a PFIC Annual Information Statement', 'Only for marketable stock, such as stock regularly traded on a qualifying exchange'],
            ['What you include each year', 'Your share of the fund\'s ordinary earnings (as ordinary income) and net capital gain (as long-term capital gain)', 'Any increase in value over your adjusted basis, as ordinary income'],
            ['Losses', 'Follow the QEF rules', 'Decreases deductible as ordinary loss, but only up to prior mark-to-market inclusions'],
            ['Basis', 'Increased by amounts included, decreased by distributions of previously taxed amounts', 'Increased by amounts included, decreased by deductions allowed'],
          ]}
        />
        <p>
          If an election is not made for the first year you held the shares, special rules — such as a deemed sale election — may apply. Timing matters, so get advice before you buy or as early as possible.
        </p>

        <h2>Statute of limitations</h2>
        <p>
          Section 6501(c)(8), as described in the preamble to the final regulations (T.D. 9806) and in Notice 2014-51, can keep the IRS's time to assess tax open when required PFIC information is not reported. How it applies depends on the situation:
        </p>
        <ul>
          <li><strong>Form 8621 was required and not filed:</strong> the assessment period for any tax return, event, or period to which the information relates does not end until <strong>three years after the information is reported</strong>. It is not an unlimited period: filing the required Form 8621 starts the three years.</li>
          <li><strong>Form 8621 was not required:</strong> Notice 2014-51 says that if you are not subject to the section 1298(f) reporting requirement for a year under the regulations, not filing Form 8621 does not extend the period for that year.</li>
          <li><strong>Reasonable cause:</strong> if the failure was due to reasonable cause and not willful neglect, the extension applies only to items related to the failure — the PFIC items that should have been reported.</li>
          <li><strong>Scope otherwise:</strong> without reasonable cause, the extension is not limited to the PFIC items; T.D. 9806 refers to the assessment period for the shareholder's entire return.</li>
        </ul>
        <p>
          The Form 8621 instructions (Rev. December 2025) set out when the form is required; whether a particular year's period is open depends on those rules and your facts.
        </p>

        <h2>Other reporting</h2>
        <ul>
          <li><strong>Form 8938:</strong> a PFIC you report on a timely filed Form 8621 is not reported again on Form 8938, but you identify the Form 8621 filing on Form 8938.</li>
          <li><strong>FBAR:</strong> an account holding the fund may be a foreign financial account reportable on the FBAR, separately from Form 8621. See <a href="/library/investment/foreign-brokerage-account/">Foreign brokerage accounts and stocks</a>.</li>
          <li><strong>Foreign tax:</strong> foreign tax on fund income may support a <a href="/library/individual/foreign-tax-credit/">foreign tax credit</a>.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming a foreign fund is taxed like a U.S. mutual fund.</strong></li>
          <li><strong>Treating the $25,000 exception as a full exemption</strong> from PFIC rules.</li>
          <li><strong>Waiting until a sale</strong> to think about elections.</li>
          <li><strong>Assuming every foreign fund is a PFIC</strong> without checking its structure.</li>
          <li><strong>Not filing because no tax was due</strong>, leaving the assessment period open.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get professional help</div>
          <p>PFIC determinations, the section 1291 tax and interest charge, late elections, and holdings through partnerships, trusts, or other PFICs are complex. This guide does not determine whether any specific fund is a PFIC. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

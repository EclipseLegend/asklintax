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
  id:            '129',
  title:         'Disaster Tax Relief: Postponed Deadlines and Casualty Losses',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal disaster tax relief, based on Publication 547 (2025), the IRS Tax relief in disaster situations page (reviewed October 2026), and the IRS FAQs for disaster victims (updated July 2026), which describe the Filing Relief for Natural Disasters Act (P.L. 119-29) and the Disaster Related Extension of Deadlines Act (P.L. 119-64). Casualty loss rules are stated for tax year 2025; the 2026 Form 4684 and its instructions were available only as drafts when this guide was reviewed, so 2026 casualty loss rules are not stated. It does not cover state tax relief, wildfire relief payments, or business interruption issues in detail',
  persona:       ['People living in an area hit by a hurricane, wildfire, flood, or storm', 'Business owners whose records or offices were in a disaster area', 'Anyone with a deadline coming up after a disaster', 'Homeowners with uninsured damage'],
  relatedJourney: ['Dealing with a tax problem', 'Preparing to file'],
  actionRequired: 'Look up the IRS relief announcement for your specific disaster on IRS.gov/DisasterTaxRelief and check the covered area, incident dates, which deadlines are postponed, and the new due date. For damage to personal property, check whether the loss is attributable to a federally declared disaster before claiming it on Form 4684.',
  sources: [
    { label: 'IRS — Publication 547 (2025), Casualties, Disasters, and Thefts', url: 'https://www.irs.gov/pub/irs-pdf/p547.pdf' },
    { label: 'IRS — Tax relief in disaster situations', url: 'https://www.irs.gov/newsroom/tax-relief-in-disaster-situations' },
    { label: 'IRS — FAQs for disaster victims', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/faqs-for-disaster-victims' },
    { label: 'IRS — Around the nation (disaster relief by state)', url: 'https://www.irs.gov/newsroom/around-the-nation' },
  ],
}

const FAQS = [
  {
    q: 'Does every disaster declared by my state qualify for IRS relief?',
    a: 'No. Under the Filing Relief for Natural Disasters Act, a qualified state-declared disaster is a natural catastrophe, or a fire, flood, or explosion, that the governor (or the mayor of the District of Columbia) determines caused damage severe enough to warrant relief. The IRS may then grant deadline relief after a written request from the governor and consultation with FEMA. Relief applies only if the IRS actually grants it, and only to the areas, dates, and deadlines in its announcement.',
  },
  {
    q: 'How do I find out whether my deadline was postponed?',
    a: 'Go to IRS.gov/DisasterTaxRelief and the IRS Around the nation page, which list each disaster relief announcement by state and date. Each announcement names the covered localities, the incident dates, the deadlines that are postponed, and the new due date.',
  },
  {
    q: 'I live outside the disaster area, but my records or my tax preparer are in it. Can I get relief?',
    a: 'Possibly. Taxpayers whose records needed to meet a postponed deadline are located in the covered area can be affected taxpayers. The IRS FAQs say people outside the area should call the IRS disaster hotline at 866-562-5227 to self-identify, explain that their records are in the covered area, and provide the FEMA disaster number.',
  },
  {
    q: 'Does a postponement also give me more time to claim a refund?',
    a: 'Yes. The IRS says that if you have additional time to file and pay because of a federally declared disaster, the additional time also extends the time to claim a refund. Under the Disaster Related Extension of Deadlines Act, enacted December 26, 2025, disaster postponements are treated as extensions of time to file for the refund lookback period; this applies to claims filed after December 26, 2025.',
  },
  {
    q: 'Can I deduct damage to my home that insurance did not cover?',
    a: 'For tax year 2025, a casualty loss of personal-use property, such as your home, is generally deductible only if it is attributable to a federally declared disaster (an exception applies if you have personal casualty gains). The loss is reduced by insurance and other reimbursements, by $100 per casualty, and by 10% of your adjusted gross income, unless it is a qualified disaster loss. It is figured on Form 4684.',
  },
  {
    q: 'Can I claim the loss on last year\'s return to get money sooner?',
    a: 'For a loss attributable to a federally declared disaster in an area FEMA identified for public or individual assistance, you can elect to deduct it on the return or amended return for the year immediately before the disaster year, using Form 4684, Section D. The election is due by 6 months after the regular due date (without extensions) of the original return for the disaster year.',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: 'I missed the tax deadline — what happens now?',
    desc:  'If no disaster postponement applies to you.',
  },
  {
    href: '/library/irs/irs-penalty-relief',
    cat:  'IRS & Tax Issues',
    title: 'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
    desc:  'Other ways to ask for penalties to be removed.',
  },
  {
    href: '/library/irs/amend-tax-return',
    cat:  'IRS & Tax Issues',
    title: 'I made a mistake on my tax return — how do I amend it?',
    desc:  'How to file Form 1040-X to claim a prior-year loss.',
  },
  {
    href: '/library/individual/retirement-withdrawals-rmd',
    cat:  'Individuals & Families',
    title: 'Retirement Account Withdrawals and RMDs: Taxes, the 10% Penalty, and Deadlines',
    desc:  'Rules for taking money out of retirement accounts.',
  },
]

export default function DisasterTaxReliefPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Disaster Tax Relief: Postponed Deadlines and Casualty Losses | AskLinTax',
      description: 'Federal disaster tax relief: federally declared and qualified state-declared disasters, the mandatory 120-day postponement, how to find the IRS announcement for your disaster, refund deadlines, and 2025 casualty loss rules on Form 4684.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          After a disaster, the IRS may <strong>postpone</strong> certain tax deadlines for people and businesses in the covered area. That is different from a <strong>casualty loss deduction</strong>, which lets you deduct some uninsured damage. Relief is not automatic for every disaster: it depends on the <strong>type of declaration</strong> and on the <strong>specific IRS announcement</strong> for that disaster, which lists the covered area, the deadlines that are postponed, and the new due date.
        </p>

        <h2>Three different kinds of relief</h2>
        <ArticleTable
          head={['Relief', 'What it does', 'Where it comes from']}
          rows={[
            ['Filing postponement', 'Gives more time to file returns whose deadlines fall within the postponement period', 'The IRS announcement for the disaster'],
            ['Payment postponement', 'Gives more time to pay taxes due within the period; the IRS may abate interest and penalties for the length of the postponement', 'The IRS announcement for the disaster'],
            ['Casualty loss deduction', 'Lets you deduct qualifying uninsured damage or loss on Form 4684', 'The tax law for the year of the loss, not the deadline announcement'],
          ]}
        />
        <p>
          A postponement does not by itself give you a deduction, and a deductible casualty loss does not change your deadlines.
        </p>

        <h2>Federally declared and state-declared disasters</h2>
        <ul>
          <li><strong>Federally declared disasters.</strong> The IRS may postpone certain deadlines for up to 1 year for taxpayers affected by a federally declared disaster, including deadlines for filing and paying income, excise, and employment taxes and for making contributions to a traditional or Roth IRA.</li>
          <li><strong>Qualified state-declared disasters.</strong> The Filing Relief for Natural Disasters Act allows the same kind of relief for disasters declared by a state's governor (or the mayor of the District of Columbia) that the governor determines are severe enough to warrant relief. The IRS acts on a written request from the governor after consulting FEMA. A state declaration alone does not guarantee federal tax relief. These state-declared provisions concern deadline postponements; for 2025, the personal casualty loss deduction still requires a federally declared disaster.</li>
          <li><strong>Mandatory 120-day postponement.</strong> For federally declared disasters and qualified state-declared disasters <strong>after July 24, 2025</strong>, qualifying affected taxpayers may be eligible for a mandatory postponement of certain deadlines of <strong>120 days</strong> (previously 60 days). The IRS announcement for a disaster can provide a longer postponement, up to 1 year. The period starts on the earliest incident date in the declaration and ends 120 days after the later of the earliest incident date or the declaration date.</li>
        </ul>

        <h2>How to check the relief for your disaster</h2>
        <ul>
          <li>Go to <strong>IRS.gov/DisasterTaxRelief</strong> (Tax relief in disaster situations) and the IRS <strong>Around the nation</strong> page, which list announcements by state and by date — for example, an announcement numbered by state and year, such as TX-2026-05.</li>
          <li>In the announcement, check the <strong>covered counties or localities</strong>, the <strong>incident dates</strong>, <strong>which deadlines</strong> are postponed, and the <strong>new due date</strong>.</li>
          <li>Eligible taxpayers include individuals whose main home, and businesses whose principal place of business, is in the covered area; relief workers assisting there; taxpayers whose necessary records are kept there; and the spouse on a joint return with an eligible taxpayer.</li>
          <li>If you are outside the covered area but your records or your tax preparer are in it, call the IRS disaster hotline at <strong>866-562-5227</strong> to self-identify.</li>
        </ul>

        <h2>More time to claim a refund</h2>
        <p>
          Under the Disaster Related Extension of Deadlines Act, enacted December 26, 2025, disaster postponements are treated as extensions of time to file for purposes of the refund lookback period. This applies to claims filed after December 26, 2025. In practice, the extra time to file and pay because of a disaster also extends the time to claim a refund.
        </p>

        <h2>Casualty losses (tax year 2025)</h2>
        <ArticleTable
          head={['Loss', '2025 treatment']}
          rows={[
            ['Personal-use property (your home, car, belongings)', 'Generally deductible only if attributable to a federally declared disaster; reduced by reimbursements, $100 per casualty, and 10% of AGI; claimed as an itemized deduction'],
            ['Qualified disaster loss', 'Reduced by $500 instead of $100, with no 10% of AGI reduction, and can be deducted without itemizing'],
            ['Business or income-producing property', 'Not subject to the federally declared disaster limit for personal-use property; reported on Form 4684 and other business forms'],
          ]}
        />
        <p>
          A <strong>qualified disaster loss</strong> for 2025 includes losses from a major disaster declared by the President between <strong>January 1, 2020, and September 2, 2025</strong>, with an incident period that began on or after December 28, 2019, and on or before July 4, 2025, and ended no later than August 3, 2025 (excluding disasters declared only because of COVID-19). The One Big Beautiful Bill Act extended these rules.
        </p>
        <p>
          For a loss attributable to a federally declared disaster in an area FEMA identified for public or individual assistance, you may elect to deduct it in the <strong>year before</strong> the disaster year, on an original or amended return, using Form 4684, Section D. Make the election by 6 months after the regular due date (without extensions) of the original return for the disaster year. See <a href="/library/irs/amend-tax-return/">how to amend a return</a>.
        </p>
        <p>
          <strong>2026 losses:</strong> when this guide was reviewed, the 2026 Form 4684 and its instructions were available only as drafts. Check the final 2026 Form 4684 instructions and Publication 547 before claiming a 2026 casualty loss; this guide does not state the 2026 rules.
        </p>

        <h2>Other help</h2>
        <ul>
          <li>The IRS disaster hotline (866-562-5227) can explain the relief granted, help with casualty loss reporting, process address changes, and help with copies of tax returns.</li>
          <li>Certain retirement plan distributions related to a qualified disaster are an exception to the 10% additional tax on early distributions; see <a href="/library/individual/retirement-withdrawals-rmd/">retirement withdrawals</a>.</li>
          <li>If no postponement applies, penalty relief may still be available; see <a href="/library/irs/irs-penalty-relief/">IRS penalty relief</a>.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Check the announcement, not the news headline</div>
          <p>Postponement periods, covered counties, and covered deadlines differ from one disaster to the next. Before you skip a deadline, find the IRS announcement for your disaster and confirm that your area, your dates, and your specific deadline are included.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

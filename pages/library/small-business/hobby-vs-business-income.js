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
  id:            '110',
  title:         'Hobby or Business? How Side Income Is Taxed in 2025 and 2026',
  category:      'Small Business & Self-Employment',
  categoryHref:  '/library/small-business',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal hobby loss rules for tax years 2025 and 2026, based on Publication 334 (2025), Publication 525 (2025), Publication 529 (Rev. December 2020), Publication 535 (2022, the most recent edition), the 2025 Form 1040 and Schedule A instructions, Form 5213, and IRS Tax Tip 2023-61. The statement that hobby expenses stay nondeductible for 2026 comes from IRS draft 2026 instructions that cite P.L. 119-21, section 70110; confirm it against the final 2026 instructions. The statute texts (sections 67 and 183 and P.L. 119-21) could not be reviewed directly; this guide relies on IRS publications that apply them. It does not cover state rules, farming in detail, or the horse-activity rules beyond the presumption',
  persona:       ['Crafters and online sellers', 'Content creators and gig workers', 'Collectors who sell items', 'People with a side activity that loses money'],
  relatedJourney: ['Side income', 'First year of self-employment'],
  actionRequired: 'Decide honestly whether you run the activity to make a profit, keep business-style records either way, and report all income — on Schedule C if it is a business, or on Schedule 1 if it is a hobby.',
  sources: [
    { label: 'IRS — Publication 334 (2025), Tax Guide for Small Business', url: 'https://www.irs.gov/publications/p334' },
    { label: 'IRS — Publication 525 (2025), Taxable and Nontaxable Income', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Publication 529 (Rev. December 2020), Miscellaneous Deductions', url: 'https://www.irs.gov/pub/irs-pdf/p529.pdf' },
    { label: 'IRS — Publication 535 (2022), Business Expenses: Not-for-Profit Activities', url: 'https://www.irs.gov/pub/irs-prior/p535--2022.pdf' },
    { label: 'IRS — 2025 Instructions for Form 1040 and Schedule 1', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule A (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sca.pdf' },
    { label: 'IRS — Form 5213, Election To Postpone Determination (Rev. February 2006)', url: 'https://www.irs.gov/pub/irs-pdf/f5213.pdf' },
    { label: 'IRS — Tax Tip 2023-61, Hobby or business: here\'s what to know about that side hustle', url: 'https://www.irs.gov/newsroom/hobby-or-business-heres-what-to-know-about-that-side-hustle' },
    { label: 'IRS — Draft 2026 Instructions for Form 8960 (not for filing)', url: 'https://www.irs.gov/pub/irs-dft/i8960--dft.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is hobby income taxable?',
    a: 'Yes. Publication 525 says you must include income from an activity even if you do not expect to make a profit. For 2025 it goes on Schedule 1 (Form 1040), line 8j, "Activity not engaged in for profit income."',
  },
  {
    q: 'Can I deduct my hobby expenses?',
    a: 'Most of them, no. For 2025, the ordinary expenses of a hobby are miscellaneous itemized deductions, which are suspended (Publication 529), and they are not on the list of deductions allowed on Schedule A, line 16 in the 2025 Schedule A instructions. Two things still count: if you sell goods, you can figure hobby gross income by subtracting the cost of goods sold, and deductions you could take anyway — such as home mortgage interest, taxes, and qualifying casualty losses — are still allowed on Schedule A (Publication 535). For 2026, IRS draft instructions say P.L. 119-21 made the suspension permanent. Publication 525 (2025) still says hobby expenses can be deducted up to hobby income if you itemize; that sentence describes the pre-2018 rule and conflicts with the other IRS sources.',
  },
  {
    q: 'Do I owe self-employment tax on hobby income?',
    a: 'Not if the activity really is a hobby: the 2025 Form 1040 instructions treat hobby income as income that is not self-employment income. But the label does not decide it. If the activity is actually a business, its net earnings are subject to self-employment tax even if you reported the income on Schedule 1 or received a Form 1099-K instead of a 1099-NEC.',
  },
  {
    q: 'I sold some of my own things online at a loss. Is that hobby income?',
    a: 'No. Selling personal items for less than you paid is not income and not a hobby. Losses on personal items are not deductible. If you sell collectibles from a hobby at a gain, Publication 525 says the gain is taxable as a capital gain.',
  },
  {
    q: 'Will I get a Form 1099-K for my hobby?',
    a: 'Possibly. A payment app or marketplace generally must send one when payments for goods or services exceed $20,000 and there are more than 200 transactions, and it may send one for less. The form reports gross payments; you still decide whether the activity is a hobby or a business. (IRS Tax Tip 2023-61 mentions a $600 threshold; that figure is out of date.)',
  },
  {
    q: 'Should I file Form 5213?',
    a: 'Only after thinking it through. Form 5213 postpones the IRS decision on the profit presumption until the end of the fifth year (seventh for horses), which can help a new activity with early losses. But filing it generally extends the time the IRS has to assess tax attributable to the activity, until 2 years after the due date of the return for the last year of the presumption period.',
  },
]

const RELATED = [
  {
    href: '/library/individual/form-1099-k',
    cat:  'Individuals & Families',
    title: 'I got a 1099-K from PayPal, Venmo, or eBay — is it taxable?',
    desc:  'What the form reports and the current threshold.',
  },
  {
    href: '/library/small-business/schedule-c-guide',
    cat:  'Small Business & Self-Employment',
    title: 'Schedule C Explained: Self-Employment Income and Expenses',
    desc:  'How a business reports income and expenses.',
  },
  {
    href: '/library/small-business/self-employment-tax',
    cat:  'Small Business & Self-Employment',
    title: 'What is self-employment tax and how does it work?',
    desc:  'The 15.3% tax a real business pays.',
  },
  {
    href: '/library/small-business/business-deductions',
    cat:  'Small Business & Self-Employment',
    title: 'What can I deduct as a small business owner?',
    desc:  'Deductions available once it is a business.',
  },
]

export default function HobbyVsBusinessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Hobby or Business? How Side Income Is Taxed in 2025 and 2026 | AskLinTax',
      description: 'Hobby vs. business for tax: the profit-motive factors, the 3-of-5-year presumption and the horse rule, Form 5213, Schedule C vs. Schedule 1, self-employment tax, why most hobby expenses are not deductible in 2025 or 2026, cost of goods sold, and Form 1099-K.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you carry on an activity to make a <strong>profit</strong>, it is a <strong>business</strong>: you report it on <strong>Schedule C</strong>, deduct ordinary and necessary expenses, can use a loss against other income, and generally owe <strong>self-employment tax</strong> on net earnings of $400 or more. If it is a <strong>hobby</strong>, you still report all the income — on <strong>Schedule 1</strong> — and for <strong>2025</strong> you cannot deduct the activity's ordinary expenses, although cost of goods sold can reduce gross income and deductions you could take anyway are still allowed. IRS draft instructions say the same rule continues for <strong>2026</strong>. What decides it is your profit motive, not the form you receive or the line you use.
        </p>

        <h2>How the IRS tells a hobby from a business</h2>
        <p>No single factor decides it. IRS Tax Tip 2023-61 lists these questions:</p>
        <ul>
          <li>Do you carry on the activity in a businesslike manner, with complete and accurate books and records?</li>
          <li>Does the time and effort you put in show you intend to make a profit?</li>
          <li>Does the activity make a profit in some years, and how much?</li>
          <li>Can you expect a future profit from the appreciation of assets used in the activity?</li>
          <li>Do you depend on the income for your livelihood?</li>
          <li>Are losses due to circumstances beyond your control, or normal for the startup phase?</li>
          <li>Do you change your methods to improve profitability?</li>
          <li>Do you and your advisors have the knowledge to run it as a successful business?</li>
        </ul>
        <p>
          Publication 334 adds that activities done as a hobby, or mainly for sport or recreation, come under the not-for-profit limits.
        </p>

        <h2>The profit presumption and Form 5213</h2>
        <ArticleTable
          head={['Activity', 'Presumed to be for profit if', 'Form 5213 postpones the decision until']}
          rows={[
            ['Most activities', 'Gross income exceeds deductions in 3 or more of 5 consecutive years', 'The end of the 4th year after the first year'],
            ['Mainly breeding, training, showing, or racing horses', 'Gross income exceeds deductions in 2 or more of 7 consecutive years', 'The end of the 6th year after the first year'],
          ]}
        />
        <ul>
          <li><strong>The presumption helps but is not required.</strong> An activity that fails it can still be a business under the factors above.</li>
          <li><strong>When to file Form 5213:</strong> within 3 years after the due date (without extensions) of the return for the first year of the activity, or within 60 days after an IRS notice proposing to disallow deductions, whichever applies. It cannot be used if you have been in the activity more than 5 years (7 for horses).</li>
          <li><strong>Joint returns:</strong> both spouses must sign the election, even if only one runs the activity.</li>
          <li><strong>Trade-off:</strong> filing the election generally extends the IRS's time to assess tax attributable to the activity until 2 years after the due date of the return for the last year of the presumption period.</li>
        </ul>

        <h2>Business vs. hobby: how each is reported</h2>
        <ArticleTable
          head={['', 'Business', 'Hobby']}
          rows={[
            ['Where income goes', 'Schedule C (Form 1040)', 'Schedule 1 (Form 1040), line 8j for 2025'],
            ['Cost of goods sold', 'Subtracted on Schedule C', 'Can be subtracted from gross receipts to figure gross income, if done consistently'],
            ['Other expenses', 'Ordinary and necessary business expenses deducted on Schedule C', 'Not deductible for 2025; IRS draft guidance says not deductible for 2026'],
            ['Loss', 'Can generally offset other income', 'Not allowed; you are taxed on the activity\'s gross income'],
            ['Self-employment tax', 'Generally due on net earnings of $400 or more', 'Not self-employment income if it is truly a hobby'],
          ]}
        />

        <h2>Hobby expenses in 2025 and 2026: what the IRS sources say</h2>
        <ul>
          <li><strong>2025:</strong> Publication 529 says hobby expenses are miscellaneous itemized deductions and "can no longer be deducted." The 2025 Schedule A instructions say only listed expenses can be deducted on line 16, and hobby expenses are not on the list.</li>
          <li><strong>2026 and later:</strong> the IRS draft 2026 Instructions for Form 8960 say section 70110 of P.L. 119-21 indefinitely suspended miscellaneous itemized deductions. Because hobby expenses are miscellaneous itemized deductions, they remain nondeductible. That statement is from a draft, so confirm it in the final 2026 instructions.</li>
          <li><strong>What is still allowed:</strong> Publication 535 says gross income from a not-for-profit activity can be figured by subtracting the cost of goods sold from gross receipts, consistently and under generally accepted accounting methods. It also says deductions you can take for personal as well as business activities — such as home mortgage interest, taxes, and casualty losses — are allowed in full on Schedule A, subject to their own limits.</li>
          <li><strong>The conflicting sentence:</strong> Publication 525 (2025) says hobby deductions "can't total more than the income you report from the activity and can be taken only if you itemize." That was the rule before 2018. It conflicts with Publication 529 and the Schedule A instructions, and this guide follows those more specific sources.</li>
        </ul>

        <h2>Self-employment tax: the label does not decide it</h2>
        <p>
          The 2025 Form 1040 instructions say not to report self-employment income on Schedule 1, lines 8a–8z, and treat hobby income as income that is not self-employment income. But calling an activity a hobby, or reporting the income on Schedule 1, does not make it one. If the facts show a profit motive, the activity is a business and its net earnings are subject to self-employment tax. The type of form you receive — 1099-K, 1099-NEC, or none — does not change that either.
        </p>

        <h2>Examples (2025)</h2>
        <ArticleTable
          head={['', 'Nina', 'Omar', 'Jae']}
          rows={[
            ['Activity', 'Knits scarves for fun and sells a few at craft fairs', 'Sells refurbished bikes online, keeps books, advertises, works 20 hours a week', 'Sells his own used furniture before moving'],
            ['Income and expenses', '$1,200 of sales; $400 of yarn used in the scarves she sold; $1,100 of booth fees and other supplies', '$30,000 of sales; $18,000 of costs', '$900 received; originally paid $4,000'],
            ['Treatment', 'Hobby: $800 ($1,200 − $400 cost of goods sold) on Schedule 1, line 8j; the $1,100 is not deductible', 'Business: Schedule C net profit $12,000; self-employment tax applies', 'Personal sale at a loss: no income to report, loss not deductible'],
          ]}
        />
        <p>
          Nina pays tax on $800 even though she spent more than she earned. Subtracting the $400 assumes she figures cost of goods sold consistently from her records. If she started running the activity like a business, with records and a plan to make a profit, the answer could change. Omar's self-employment tax is figured on Schedule SE. All three examples are simplified.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Not reporting hobby income</strong> because the activity lost money.</li>
          <li><strong>Deducting hobby expenses</strong> on Schedule A under the old pre-2018 rule — or, the opposite mistake, forgetting cost of goods sold and deductions you could take anyway.</li>
          <li><strong>Calling a business a hobby</strong> to avoid self-employment tax.</li>
          <li><strong>Calling a hobby a business</strong> to deduct years of losses without a real profit motive.</li>
          <li><strong>Treating a Form 1099-K as proof of income</strong> — it reports gross payments, including personal sales.</li>
          <li><strong>Relying on old IRS tips</strong> that mention a $600 Form 1099-K threshold.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with borderline cases</div>
          <p>Long-running activities with repeated losses, horse and farm activities, and creative work that is starting to earn money often need a careful look at the facts. State rules may differ.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '128',
  title:         'Closing a Business: Final Tax Returns, Payroll, and IRS Account Closure',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the federal tax steps for closing a business, based on the IRS Closing a business page (updated July 2026), the IRS page If you no longer need your EIN (updated November 2025), the Instructions for Form 941 (Rev. March 2026), Form 966 (Rev. October 2016), Publication 541 (Rev. December 2025), the Instructions for Form 1120 (2025), and Publication 583. It does not cover state dissolution procedures, state tax account closures, bankruptcy, or the sale of a business in detail',
  persona:       ['Sole proprietors winding down', 'LLC members dissolving their company', 'S corporation and C corporation owners closing the business', 'Owners who stopped operating but never formally closed'],
  relatedJourney: ['Running a small business', 'Just formed an LLC'],
  actionRequired: 'File the final income tax return for your business type, final payroll returns and Forms W-2 if you had employees, and any Forms 1099 for the final year; pay all tax owed; then ask the IRS in writing to close the business account. Separately, follow your state\'s procedures to dissolve or cancel the legal entity and close state tax accounts.',
  sources: [
    { label: 'IRS — Closing a business', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/closing-a-business' },
    { label: 'IRS — If you no longer need your EIN', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/if-you-no-longer-need-your-ein' },
    { label: 'IRS — Instructions for Form 941 (Rev. March 2026)', url: 'https://www.irs.gov/pub/irs-pdf/i941.pdf' },
    { label: 'IRS — Form 966, Corporate Dissolution or Liquidation', url: 'https://www.irs.gov/pub/irs-pdf/f966.pdf' },
    { label: 'IRS — Publication 541 (Rev. December 2025), Partnerships', url: 'https://www.irs.gov/pub/irs-pdf/p541.pdf' },
    { label: 'IRS — Publication 583, Starting a Business and Keeping Records', url: 'https://www.irs.gov/pub/irs-pdf/p583.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Does the IRS cancel my EIN when I close my business?',
    a: 'No. The IRS says it cannot cancel an EIN once assigned; it becomes the entity\'s permanent federal taxpayer identification number. What you can ask for is to close the business account (the IRS also calls this deactivating the EIN). The EIN stays associated with that entity.',
  },
  {
    q: 'If the IRS closes my business account, is my LLC or corporation dissolved?',
    a: 'No. Closing the IRS account is a federal tax step only. An LLC or corporation exists under state law until you file the state\'s dissolution or cancellation documents, and state tax agencies have their own final return and account-closing requirements. Dissolving with the state also does not, by itself, satisfy your federal filing obligations.',
  },
  {
    q: 'When will the IRS close my business account?',
    a: 'Only after you have filed all necessary returns and paid all taxes owed. If returns are outstanding or a balance is due, the IRS says it cannot close the account.',
  },
  {
    q: 'What is Form 966 and who files it?',
    a: 'Form 966 is filed by a corporation — including an S corporation — that adopts a resolution or plan to dissolve or to liquidate any of its stock. It is due within 30 days after the resolution or plan is adopted. It is not filed by partnerships, sole proprietors, or LLCs taxed as partnerships or disregarded entities; exempt organizations and qualified subchapter S subsidiaries should not file it either.',
  },
  {
    q: 'Do I still have to file Forms 1099 for my final year?',
    a: 'Yes, if you made reportable payments in the course of your business during that year. The threshold depends on the year paid — generally $600 for 2025 payments and $2,000 for 2026 payments for nonemployee compensation.',
  },
  {
    q: 'How long should I keep records after closing?',
    a: 'Keep employment tax records for at least 4 years after the tax is due or paid, whichever is later. Keep records for property until the period of limitations expires for the year you dispose of it, and keep income and expense records until the period of limitations for that return runs out.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/partnership-llc-taxes',
    cat:  'Business Formation & Structure',
    title: 'Multi-Member LLC and Partnership Taxes: Form 1065 and Schedule K-1',
    desc:  'How the final partnership return and K-1s work.',
  },
  {
    href: '/library/business-formation/s-corp-reasonable-salary',
    cat:  'Business Formation & Structure',
    title: 'Running an S-Corp: Reasonable Salary, Form 1120-S and Schedule K-1',
    desc:  'The S corporation return you will file one last time.',
  },
  {
    href: '/library/small-business/payroll-taxes-941-940',
    cat:  'Small Business & Self-Employment',
    title: 'Payroll Taxes for Employers: Forms 941 and 940, Deposits, and the Trust Fund Recovery Penalty',
    desc:  'Final payroll deposits and returns.',
  },
  {
    href: '/library/small-business/issuing-form-1099-nec',
    cat:  'Small Business & Self-Employment',
    title: 'Issuing Forms 1099-NEC and 1099-MISC: Thresholds, Deadlines, and Penalties',
    desc:  'Information returns for your final year.',
  },
]

export default function ClosingABusinessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Closing a Business: Final Tax Returns, Payroll, and IRS Account Closure | AskLinTax',
      description: 'The federal tax steps for closing a business: final returns for sole proprietors, partnerships, LLCs, S corporations and C corporations, Form 966, final Forms 941 and 940, W-2s and 1099s, asset sales, closing the IRS business account, what happens to the EIN, and record retention.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Closing a business involves several separate procedures that do not happen automatically together: filing the <strong>final federal income tax return</strong>, filing <strong>final payroll returns</strong> and <strong>information returns</strong>, paying what you owe, asking the IRS to <strong>close your business account</strong>, and — for an LLC or corporation — <strong>dissolving the entity under state law</strong>. Your <strong>EIN is not cancelled</strong>; it remains that entity's permanent federal taxpayer identification number.
        </p>

        <h2>Six things to keep separate</h2>
        <ArticleTable
          head={['Step', 'What it is', 'What it does not do']}
          rows={[
            ['Final federal income tax return', 'The last return for your business type, with the final return box checked where the form has one', 'Does not close your IRS account or dissolve the entity'],
            ['Final payroll returns', 'Final Form 941 (or 944) and Form 940 for the period you last paid wages', 'Does not cover income tax or information returns'],
            ['Final information returns', 'Forms W-2 and W-3 for employees, and Forms 1099 for reportable payments in the final year', 'Not replaced by the final income tax return'],
            ['IRS business account closure', 'A written request asking the IRS to close the account after everything is filed and paid', 'Does not dissolve the entity under state law'],
            ['The EIN', 'The entity\'s permanent federal taxpayer ID number', 'Is not cancelled or reassigned to another business'],
            ['State dissolution', 'Dissolution or cancellation filed with the state, plus state tax account closures', 'Does not satisfy federal filing requirements'],
          ]}
        />

        <h2>Final income tax return by business type</h2>
        <ArticleTable
          head={['Business type', 'Final federal return', 'Also note']}
          rows={[
            ['Sole proprietorship', 'Schedule C with your Form 1040 for the year you close', 'Schedule SE if net earnings are $400 or more'],
            ['Partnership (including a multi-member LLC taxed as a partnership)', 'Form 1065, checking the "final return" box; check the "final K-1" box on each Schedule K-1', 'The tax year ends on the date the partnership completes winding up; a short-year return is due by the 15th day of the 3rd month after that date'],
            ['Single-member LLC (disregarded entity)', 'Reported on the owner\'s return — for an individual owner, Schedule C', 'Final payroll returns under the LLC\'s EIN if it had employees'],
            ['S corporation (including an LLC electing S status)', 'Form 1120-S, checking the "final return" box; check the "final K-1" box on each Schedule K-1', 'Form 966 if a resolution or plan to dissolve is adopted'],
            ['C corporation (including an LLC electing corporate status)', 'Form 1120, checking the "final return" box', 'Generally due by the 15th day of the 4th month after the date it dissolved; Form 966 if a resolution or plan to dissolve is adopted'],
          ]}
        />
        <p>
          An LLC follows its federal tax classification: it files as a disregarded entity, a partnership, or a corporation. A partnership terminates for tax purposes when no part of its business continues to be carried on by any of its partners in a partnership; see <a href="/library/business-formation/partnership-llc-taxes/">partnership and LLC taxes</a>.
        </p>

        <h2>Selling or disposing of business assets</h2>
        <ul>
          <li><strong>Form 4797</strong> reports sales or exchanges of property used in the business. Depreciation you claimed earlier can be recaptured as ordinary income when you sell.</li>
          <li>The IRS also says to file Form 4797 if closing the business causes the business use of section 179 property to drop to <strong>50% or less</strong>, which can trigger recapture.</li>
          <li><strong>Form 8594</strong> (Asset Acquisition Statement) is filed if you sell your business.</li>
        </ul>

        <h2>If you had employees</h2>
        <ul>
          <li>Pay final wages, make final federal tax deposits, and file the final <strong>Form 941</strong> (or Form 944) for the quarter you made final wage payments. Check the box on line 17 of Form 941 and enter the final date you paid wages.</li>
          <li>Attach a statement with the <strong>name of the person keeping the payroll records</strong> and the address where they will be kept.</li>
          <li>File a final <strong>Form 940</strong> for the calendar year you paid final wages, checking box <strong>d</strong> in the Type of Return section.</li>
          <li>Give each employee a <strong>Form W-2</strong> by the due date of your final Form 941, and file Copy A with Form W-3. See the Form W-2 and W-3 instructions for the earlier filing dates that apply when a business terminates.</li>
          <li>If employees received tips, file a final Form 8027. Retirement and health benefit plans have their own termination rules.</li>
        </ul>
        <p>
          Unpaid withheld taxes do not go away when a business closes; the Trust Fund Recovery Penalty may apply to responsible persons. See <a href="/library/small-business/payroll-taxes-941-940/">payroll taxes for employers</a>.
        </p>

        <h2>Corporations: Form 966</h2>
        <p>
          A corporation that adopts a resolution or plan to dissolve, or to liquidate any of its stock, must file <strong>Form 966 within 30 days</strong> after adopting it, with a certified copy of the resolution or plan. If the plan is amended, another Form 966 is due within 30 days of the amendment. Form 966 tells the IRS about the plan; it is not the final return and does not dissolve the corporation under state law.
        </p>

        <h2>Closing the IRS business account</h2>
        <p>
          Once all returns are filed and all taxes are paid, send the IRS a letter that includes the business's complete legal name, EIN, business address, and the reason you want to close the account, with a copy of the EIN assignment notice if you kept it. The IRS will not close the account while returns are missing or a balance is due.
        </p>
        <p>
          Closing the account is not the same as cancelling the EIN. The IRS states that it <strong>cannot cancel</strong> an EIN: once assigned, it remains the entity's permanent federal taxpayer ID number, even after the account is closed (the IRS also calls this deactivating the EIN). Before you mail the letter, check the current IRS instructions on IRS.gov for where to send it.
        </p>

        <h2>State dissolution is a separate step</h2>
        <p>
          Closing the IRS account does not end an LLC or corporation. The entity generally continues to exist under state law — and may continue to owe state fees or taxes — until you file the dissolution, cancellation, or withdrawal documents required by the state where it was formed and any state where it registered to do business. State tax agencies also have their own final return and account-closing rules. Check with each state before you assume the entity is closed. See also <a href="/library/business-formation/llc-basics/">LLC basics</a>.
        </p>

        <h2>Keep your records</h2>
        <ul>
          <li><strong>Employment tax records:</strong> at least 4 years after the tax becomes due or is paid, whichever is later.</li>
          <li><strong>Property records:</strong> until the period of limitations expires for the year in which you dispose of the property.</li>
          <li><strong>Income and expense records:</strong> until the period of limitations for that return runs out.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Stopping operations is not the same as closing</div>
          <p>If you simply stop doing business without filing final returns, the IRS may keep expecting returns — especially quarterly Forms 941 — and may send notices or assess penalties. File the final returns, check the final return boxes, and request account closure once everything is filed and paid.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

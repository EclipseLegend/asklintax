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
  id:            '117',
  title:         'IRS Tax Liens, Levies, and Collection Appeals',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '10 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal tax liens, levies, Collection Due Process hearings, and the Collection Appeals Program, based on Publication 594 (Rev. January 2026), Publication 1660 (Rev. January 2020), Publication 1450 (Rev. July 2018), and the IRS passport certification page (reviewed July 2026). The 2025 and 2026 passport thresholds are from Rev. Proc. 2024-40 and Rev. Proc. 2025-32. It does not cover state tax liens, bankruptcy, or business seizures in detail',
  persona:       ['People who received a notice of intent to levy or a lien notice', 'Workers facing wage garnishment', 'People whose bank account was levied', 'Anyone with a large unpaid federal tax balance'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'Check the date on any lien or levy notice right away. A Collection Due Process hearing must generally be requested within 30 days — from the date of a levy notice, or by the date shown on a lien notice — using Form 12153. If you can pay, a payment plan can stop many collection actions; if you cannot, contact the IRS before the levy takes effect.',
  sources: [
    { label: 'IRS — Publication 594 (Rev. January 2026), The IRS Collection Process', url: 'https://www.irs.gov/pub/irs-pdf/p594.pdf' },
    { label: 'IRS — Publication 1660 (Rev. January 2020), Collection Appeal Rights', url: 'https://www.irs.gov/pub/irs-pdf/p1660.pdf' },
    { label: 'IRS — Publication 1450 (Rev. July 2018), Instructions for Requesting a Certificate of Release of Federal Tax Lien', url: 'https://www.irs.gov/pub/irs-pdf/p1450.pdf' },
    { label: 'IRS — Form 12153, Request for a Collection Due Process or Equivalent Hearing', url: 'https://www.irs.gov/pub/irs-pdf/f12153.pdf' },
    { label: 'IRS — Internal Revenue Manual 5.11.2, Serving Levies, Releasing Levies and Returning Property', url: 'https://www.irs.gov/irm/part5/irm_05-011-002' },
    { label: 'IRS — Publication 4528 (Rev. March 2018), Making an Administrative Wrongful Levy Claim', url: 'https://www.irs.gov/pub/irs-pdf/p4528.pdf' },
    { label: 'IRS — Publication 5149 (Rev. May 2018), Making an Administrative Return of Property Claim Under IRC Section 6343(d)', url: 'https://www.irs.gov/pub/irs-pdf/p5149.pdf' },
    { label: 'IRS — Form 9423, Collection Appeal Request', url: 'https://www.irs.gov/pub/irs-pdf/f9423.pdf' },
    { label: 'IRS — Revocation or denial of passport in cases of certain unpaid taxes', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/revocation-or-denial-of-passport-in-cases-of-certain-unpaid-taxes' },
    { label: 'IRS — Rev. Proc. 2024-40 (2025 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
    { label: 'IRS — Rev. Proc. 2025-32 (2026 inflation adjustments)', url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the difference between a tax lien and a levy?',
    a: 'A lien is a legal claim against your property that secures the government\'s interest — it arises by law when you do not pay your first bill. A levy actually takes your property, such as money in a bank account or part of your wages, to pay the debt.',
  },
  {
    q: 'Is lien withdrawal the same as lien release?',
    a: 'No. A release ends the lien, for example when the debt is fully paid or the collection period ends. A withdrawal removes the public Notice of Federal Tax Lien, but you still owe the tax. Withdrawal is requested on Form 12277.',
  },
  {
    q: 'How long can the IRS collect a tax debt?',
    a: 'Generally up to 10 years from the date the tax was assessed. The period can be suspended for several reasons, including during a Collection Due Process hearing, while a payment plan or offer in compromise is being considered, during a bankruptcy automatic stay, and in some cases while you live outside the U.S.',
  },
  {
    q: 'Can the IRS take my whole paycheck?',
    a: 'A wage levy is served once and continues until the debt is paid, other arrangements are made, the collection period ends, or the levy is released. The IRS must release a levy if it determines that the levy creates an economic hardship that prevents you from meeting basic, reasonable living expenses.',
  },
  {
    q: 'Can my passport be affected by unpaid taxes?',
    a: 'Yes, if the IRS certifies a seriously delinquent tax debt to the State Department. For 2025 the debt must total more than $64,000; for 2026, more than $66,000, including penalties and interest. A lien must have been filed with administrative remedies lapsed or exhausted, or a levy issued. Debts being paid on time under an installment agreement or accepted offer in compromise are not certified.',
  },
  {
    q: 'Can I take a collection appeal to court?',
    a: 'Only a Collection Due Process determination: you have 30 days after Appeals makes its determination to petition the U.S. Tax Court. A Collection Appeals Program decision cannot be taken to court.',
  },
]

const RELATED = [
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'Payment plans, offers in compromise, and hardship status.',
  },
  {
    href: '/library/irs/irs-appeals-process',
    cat:  'IRS & Tax Issues',
    title: 'IRS Appeals: How to Dispute an Audit or IRS Decision',
    desc:  'Appealing audit changes and Tax Court petitions.',
  },
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: 'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857',
    desc:  'Relief when the debt belongs to your spouse.',
  },
  {
    href: '/library/irs/taxpayer-advocate-service',
    cat:  'IRS & Tax Issues',
    title: 'Taxpayer Advocate Service: When and How to Get Help',
    desc:  'Help when collection is causing financial hardship.',
  },
]

export default function IrsTaxLiensLeviesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Tax Liens, Levies, and Collection Appeals | AskLinTax',
      description: 'Federal tax liens vs. levies, wage garnishment and bank levies, Collection Due Process hearings (Form 12153), the Collection Appeals Program (Form 9423), lien release vs. withdrawal, the 10-year collection period, and 2025/2026 passport thresholds.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A <strong>lien</strong> is the government's legal claim against your property; a <strong>levy</strong> actually takes it. Before most levies, the IRS must send a final notice that gives you the right to a <strong>Collection Due Process (CDP)</strong> hearing, generally requested within 30 days on Form 12153. A separate, faster route — the <strong>Collection Appeals Program (CAP)</strong> — covers liens, levies, seizures, and payment plan decisions but cannot be taken to court.
        </p>

        <h2>Liens and levies are different</h2>
        <ArticleTable
          head={['', 'Federal tax lien', 'Levy']}
          rows={[
            ['What it is', 'A legal claim against all your current and future property and rights to property', 'A legal seizure that takes your property to pay the debt'],
            ['How it starts', 'Arises by law when you do not pay your first bill; the IRS may then file a public Notice of Federal Tax Lien', 'Usually after the IRS assesses the tax and sends a bill, you do not pay, and it sends a Final Notice of Intent to Levy and Notice of Your Right to a Hearing at least 30 days before the levy (with some exceptions)'],
            ['Examples', 'Your home, car, and future rights such as wages and bank accounts', 'Wages, bank accounts, retirement accounts, certain federal payments, and other property'],
            ['Main appeal', 'CDP hearing after the first lien notice; CAP', 'CDP hearing after the levy notice; CAP'],
          ]}
        />

        <h2>The Notice of Federal Tax Lien</h2>
        <ul>
          <li><strong>Public notice:</strong> filed with local or state offices, such as a county recorder, to establish the government's priority over other creditors. Employers, landlords, and others may see it.</li>
          <li><strong>Your hearing right:</strong> within five business days after the first filing for a debt, the IRS sends a notice of your right to a CDP hearing, with a date by which to request it.</li>
          <li><strong>Discharge and subordination:</strong> a discharge removes specific property from the lien, such as property being sold (Publication 783); a subordination lets another creditor move ahead of the IRS, such as for a refinance (Publication 784).</li>
        </ul>

        <h2>Lien release vs. withdrawal</h2>
        <ArticleTable
          head={['', 'Release', 'Withdrawal']}
          rows={[
            ['What it does', 'Ends the lien', 'Removes the public notice; you still owe the tax'],
            ['When', 'Debt fully paid, accepted offer in compromise terms met, payment guaranteed by a bond, or the collection period ended (automatic)', 'For example, you entered into a payment plan (unless it provides otherwise), withdrawal will help you pay faster, the IRS did not follow its procedures, or it is in both your and the government\'s best interest'],
            ['Timing or form', 'By law the IRS must release the lien within 30 days after the debt is fully paid or becomes legally unenforceable, or a bond is accepted (Publication 1450)', 'Apply on Form 12277'],
          ]}
        />

        <h2>Levies: wages, bank accounts, and other property</h2>
        <ul>
          <li><strong>Wage levy (garnishment):</strong> served once, not each payday. It continues until the debt is paid, other arrangements are made, the collection period ends, or the levy is released.</li>
          <li><strong>Bank levy:</strong> reaches funds available for withdrawal up to the levy amount on the day it is served. The bank holds the funds for 21 days before sending them to the IRS, so you can resolve any dispute.</li>
          <li><strong>Federal payments:</strong> the Federal Payment Levy Program can generally take up to 15% of certain federal payments.</li>
          <li><strong>Exempt property</strong> includes unemployment benefits, certain annuity and pension payments, necessary schoolbooks and clothing, undelivered mail, and limited amounts of household items and tools of a trade.</li>
          <li><strong>The IRS must release a levy</strong> if, for example, you paid the debt, the collection period ended before it was issued, you entered into a payment plan that does not allow it to continue, or it creates an economic hardship.</li>
        </ul>

        <h2>Getting levied property or money back</h2>
        <p>
          These are separate remedies with separate time limits. Do not apply one deadline to another, and act promptly.
        </p>
        <ArticleTable
          head={['Who and what', 'Remedy', 'Deadline (levies or notices on or after March 23, 2017)', 'Source']}
          rows={[
            ['You (the taxpayer): levied property, other than money, still held by the IRS and not sold', 'Written return of property claim (IRC 6343(d))', 'Any time before the IRS sells the property', 'Publication 5149; IRM 5.11.2'],
            ['You: levied property that the IRS has sold', 'Written claim for the sale proceeds (IRC 6343(d))', '2 years from the date of the levy', 'Publication 5149'],
            ['You: money turned over to the IRS, such as from a bank or wage levy', 'Written claim for return of the money (IRC 6343(d))', '2 years from the date shown on the levy form', 'Publication 5149; Publication 1660; IRM 5.11.2'],
            ['Someone else whose property the IRS levied for your debt (wrongful levy)', 'Administrative wrongful levy claim (IRC 6343(b))', 'Seized property not yet sold: any time. Sold property: 2 years from the date the notice of seizure was given. Money turned over: 2 years from the date the notice of levy was delivered', 'Publication 4528; IRM 5.11.2'],
            ['Same third party', 'Lawsuit in federal district court (IRC 7426)', '2 years from the date the notice of seizure or levy was delivered; if a timely administrative claim is filed, extended by the shorter of 12 months from filing it or 6 months from the IRS\'s notice of disallowance', 'Publication 4528'],
          ]}
        />
        <p>
          For levies and notices on or before March 22, 2017, these periods were 9 months instead of 2 years, and those deadlines have now passed. Only the taxpayer can make a return of property claim; a third party uses the wrongful levy rules. If the IRS denies a taxpayer's claim, the denial can be appealed under the Collection Appeals Program.
        </p>
        <p>
          The IRS returns property or money under IRC 6343(d) only when it determines that a ground applies — for example, the levy was premature or not made under IRS procedures, a later payment plan allows return, return will help collect the tax, or return is in the best interest of both you and the government. Publication 594 (Rev. January 2026) still says "generally up to 9 months" for returning seized money; that matches only the old rule for levies on or before March 22, 2017, while Publication 1660, Publication 5149, and the Internal Revenue Manual (reviewed April 2026) give 2 years for later levies. A refund claim for tax you believe you did not owe follows different rules that this guide does not cover.
        </p>

        <h2>Collection Due Process vs. the Collection Appeals Program</h2>
        <ArticleTable
          head={['', 'Collection Due Process (CDP)', 'Collection Appeals Program (CAP)']}
          rows={[
            ['Form', 'Form 12153', 'Form 9423 (after a conference with the collection manager, for lien and levy actions)'],
            ['Deadline', 'Lien: by the date on the lien notice (30 days after the 5-business-day period). Levy: within 30 days from the date of the notice of intent to levy', 'Tell Collection within 2 business days after the manager conference; Form 9423 must be received or postmarked within 3 business days. Seizure of a house, car, or other property: request the manager conference within 10 business days after the Notice of Seizure'],
            ['Late request', 'Equivalent hearing generally within 1 year after the levy notice date, or 1 year plus 5 business days after the lien filing — no Tax Court review, and the 10-year collection period keeps running', 'Not applicable'],
            ['Can you dispute the tax itself?', 'Only if you did not receive a notice of deficiency or otherwise have a chance to dispute it', 'No'],
            ['Court review', 'Petition the Tax Court within 30 days after the determination', 'None — the Appeals decision is final'],
          ]}
        />
        <p>
          A timely CDP hearing request generally stops a levy that is the subject of the hearing and suspends the 10-year collection period. You get only one CDP lien hearing and one levy hearing for each tax period or assessment. Some levies — such as a jeopardy levy or a levy on a state tax refund — can be issued before the hearing.
        </p>

        <h2>Passport certification: 2025 and 2026 thresholds</h2>
        <ArticleTable
          head={['Year', 'Seriously delinquent tax debt', 'Source']}
          rows={[
            ['2025', 'More than $64,000', 'Rev. Proc. 2024-40; IRS passport page'],
            ['2026', 'More than $66,000', 'Rev. Proc. 2025-32; Publication 594 (Rev. January 2026); IRS passport page'],
          ]}
        />
        <ul>
          <li>The debt includes penalties and interest, and a Notice of Federal Tax Lien must have been filed with all administrative remedies lapsed or exhausted, or a levy issued.</li>
          <li>Not certified: debts being paid on time under an installment agreement or accepted offer in compromise, FBAR penalties, debts with a timely CDP levy hearing request, and debts suspended for an innocent spouse request, among others.</li>
          <li>The State Department generally will not issue or renew, and may revoke, a passport after certification. The IRS sends notice CP508C when it certifies and reverses certification within 30 days after the debt is resolved.</li>
        </ul>

        <h2>Ways to stop or prevent collection</h2>
        <ul>
          <li><strong>Pay in full</strong>, or set up a <strong>payment plan</strong>. A Partial Payment Installment Agreement may be available if you cannot pay in full before the collection period ends. See <a href="/library/irs/cant-pay-tax-bill/">I can't pay my tax bill</a>.</li>
          <li><strong>Ask about hardship status</strong> if paying would prevent you from meeting basic living expenses.</li>
          <li><strong>Request a CDP hearing</strong> on time and propose a collection alternative.</li>
          <li><strong>Get help</strong> from the Taxpayer Advocate Service or a Low Income Taxpayer Clinic.</li>
        </ul>

        <h2>Your rights</h2>
        <ul>
          <li>The Taxpayer Bill of Rights includes the right to challenge the IRS's position and be heard, and the right to appeal an IRS decision in an independent forum.</li>
          <li>If the IRS levies property that belongs to someone else, that person may file a wrongful levy claim or appeal under CAP.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Do not ignore a final notice</div>
          <p>The 30-day CDP window is short, and once it passes your Tax Court rights for that notice are generally lost. Contact the IRS or a qualified representative as soon as you receive a lien or levy notice, even if you cannot pay.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '131',
  title:         'Refund Offsets: When the IRS or Treasury Takes Your Refund',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'November 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains why a federal tax refund can be smaller than expected, based on the IRS Reduced refund page (updated June 2026), the IRS Injured spouse relief page (updated November 2025), the Instructions for Form 8379 (Rev. November 2024), and the IRS refund frequently asked questions (updated October 2026). The Bureau of the Fiscal Service website could not be accessed for this review, so Treasury Offset Program details are limited to what IRS guidance states. It does not cover state tax refund offsets, bankruptcy, or how to dispute a specific non-tax debt with the agency that is owed',
  persona:       ['Anyone whose refund was smaller than expected', 'Married couples whose joint refund was taken for one spouse\'s debt', 'People with past-due student loans, child support, or state tax debts', 'Taxpayers who still owe tax for an earlier year'],
  relatedJourney: ['Got an IRS letter', 'Dealing with a tax problem'],
  actionRequired: 'Read the notice you received to see who reduced your refund: an IRS notice means an IRS adjustment or a prior federal tax balance; a Bureau of the Fiscal Service notice means a Treasury Offset Program debt. Contact the agency named on that notice to dispute the debt. If it was your spouse\'s debt on a joint return, consider Form 8379.',
  sources: [
    { label: 'IRS — Reduced refund', url: 'https://www.irs.gov/refunds/reduced-refund' },
    { label: 'IRS — Injured spouse relief', url: 'https://www.irs.gov/individuals/injured-spouse-relief' },
    { label: 'IRS — Instructions for Form 8379 (Rev. November 2024), Injured Spouse Allocation', url: 'https://www.irs.gov/pub/irs-pdf/i8379.pdf' },
    { label: 'IRS — Tax season refund frequently asked questions', url: 'https://www.irs.gov/refunds/tax-season-refund-frequently-asked-questions' },
  ],
}

const FAQS = [
  {
    q: 'Why is my refund smaller than the amount on my return?',
    a: 'The IRS lists two main reasons. The most common is an adjustment to your return, such as a math error, a credit or deduction you did not qualify for, a balance you owe for an earlier year, or an estimated tax difference. The other is a debt offset, where part or all of the refund is applied to a past-due debt such as child support, a federal agency non-tax debt, a state income tax obligation, or certain state unemployment compensation debt.',
  },
  {
    q: 'Who takes my refund for a non-tax debt — the IRS or the Treasury?',
    a: 'Offsets for child support, federal non-tax debts, state income tax, and certain state unemployment compensation debts are conducted by the Treasury Department\'s Bureau of the Fiscal Service (BFS) through the Treasury Offset Program. The BFS mails the notice, which shows the original refund, the amount offset, and the agency receiving the payment. The IRS says it does not receive the details of these offsets.',
  },
  {
    q: 'Can the IRS fix a Treasury Offset Program offset?',
    a: 'Generally no. If you disagree with the debt, follow the instructions on the notice and contact the agency that received the payment. The IRS says to contact it only if the refund amount on the BFS notice is different from the refund amount on your tax return.',
  },
  {
    q: 'I never received an offset notice. Who do I contact?',
    a: 'The IRS says to contact the Bureau of the Fiscal Service Treasury Offset Program call center at 800-304-3107, Monday through Friday, 7:30 a.m. to 5 p.m. Central time. The BFS can also tell you whether a debt other than federal tax can be taken from your refund.',
  },
  {
    q: 'My refund was taken for my spouse\'s debt. Can I get my share back?',
    a: 'Possibly. If you filed a joint return, you were not responsible for the debt, and your share of the refund was applied to your spouse\'s past-due federal tax, state income tax, state unemployment compensation debt, child support, or federal non-tax debt, you may be an injured spouse. File Form 8379, Injured Spouse Allocation. Community property states have special allocation rules.',
  },
  {
    q: 'Is injured spouse relief the same as innocent spouse relief?',
    a: 'No. Injured spouse relief (Form 8379) asks for your share of a joint refund that was applied to your spouse\'s separate debt. Innocent spouse relief (Form 8857) asks to be relieved of tax, interest, and penalties on a joint return that your spouse or former spouse should pay. The Form 8379 instructions say not to file Form 8379 if you are claiming innocent spouse relief.',
  },
]

const RELATED = [
  {
    href: '/library/irs/injured-innocent-spouse-relief',
    cat:  'IRS & Tax Issues',
    title: 'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857',
    desc:  'Form 8379 and Form 8857 in detail.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read an IRS notice and verify that it is real.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'Options if you still owe tax after an offset.',
  },
  {
    href: '/library/irs/irs-tax-transcripts',
    cat:  'IRS & Tax Issues',
    title: 'IRS Tax Transcripts: Types, How to Get One, and Transcript vs. Tax Return Copy',
    desc:  'An account transcript shows how a refund was applied.',
  },
]

export default function RefundOffsetsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Refund Offsets: When the IRS or Treasury Takes Your Refund | AskLinTax',
      description: 'Why your federal refund was reduced: IRS adjustments, offsets for federal tax debts, and Treasury Offset Program offsets for child support, federal non-tax debts, and state debts — plus who to contact, Form 8379 injured spouse relief, and refund traces.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A refund can shrink for three different reasons, and each is handled by a different office. The IRS may <strong>adjust your return</strong>. The IRS may apply the refund to <strong>federal tax you owe</strong> for another year. Or the Treasury Department's <strong>Bureau of the Fiscal Service (BFS)</strong> may take part of it through the <strong>Treasury Offset Program (TOP)</strong> for certain non-tax debts. The notice you receive tells you which one happened — and who you need to contact.
        </p>

        <h2>Three ways a refund gets reduced</h2>
        <ArticleTable
          head={['What happened', 'Examples', 'Who sends the notice', 'Who to contact if you disagree']}
          rows={[
            ['IRS adjustment to your return', 'Math error, a credit or deduction you did not qualify for, an estimated tax difference', 'IRS', 'The IRS, following the notice'],
            ['Offset for a federal tax debt', 'A balance you still owe for an earlier tax year', 'IRS', 'The IRS, following the notice'],
            ['Treasury Offset Program offset', 'Past-due child support, federal agency non-tax debts (such as a student loan), state income tax obligations, certain state unemployment compensation debts', 'Bureau of the Fiscal Service', 'The agency named on the notice as receiving the payment'],
          ]}
        />
        <p>
          The IRS says the BFS notice shows the original refund amount, the offset amount, and the agency receiving the payment, and that the details of the offset are not provided to the IRS. Contact the IRS about a TOP offset only if the refund amount on the BFS notice differs from the refund amount on your return.
        </p>

        <h2>What you can and cannot change</h2>
        <ul>
          <li><strong>If you agree,</strong> no action is needed.</li>
          <li><strong>If you disagree with an IRS adjustment,</strong> follow the instructions on the IRS notice. You may need to send documents or file an amended return.</li>
          <li><strong>If you disagree with a TOP debt,</strong> follow the instructions on the BFS notice and contact the agency that received the payment. The IRS says it does not receive the details of these offsets, so the agency that is owed is the place to resolve the debt itself.</li>
          <li><strong>Not every debt can be taken.</strong> The IRS says not all debts can legally be taken out of a tax refund; the BFS TOP call center (800-304-3107) can tell you whether a debt other than federal tax is subject to offset.</li>
          <li><strong>A valid offset is not reversed</strong> just because it was unexpected. Getting money back generally requires showing the debt was wrong, or that you qualify as an injured spouse.</li>
        </ul>

        <h2>Joint returns: injured spouse relief (Form 8379)</h2>
        <p>
          On a joint return, a refund can be applied to <strong>one spouse's</strong> separate past-due debt. The other spouse may be an <strong>injured spouse</strong> if they filed jointly, were not responsible for the debt, and their share of the refund was applied to the spouse's past-due federal tax, state income tax, state unemployment compensation debt, child support, or federal non-tax debt.
        </p>
        <ArticleTable
          head={['', 'Form 8379 rule']}
          rows={[
            ['When to file', 'When you learn your share was, or will be, applied to your spouse\'s debt — with the joint return, with an amended joint return claiming a joint refund, or by itself afterward'],
            ['Deadline', 'Within 3 years from the due date of the original return (including extensions) or 2 years from the date you paid the tax that was later offset, whichever is later. The instructions note that certain circumstances described in section 6511 may extend this period, so the deadline is not the same in every case'],
            ['Each year', 'A separate Form 8379 for each year you want your share back'],
            ['Processing time', 'About 11 weeks with an e-filed joint return, about 14 weeks with a paper joint return, about 8 weeks if filed by itself after the return was processed'],
            ['Community property states', 'Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin — the IRS follows state law to divide the refund'],
          ]}
        />
        <p>
          The Form 8379 instructions warn that filing Form 8379 when no past-due obligation exists will delay your refund. Injured spouse relief is different from <strong>innocent spouse relief</strong> (Form 8857), which relieves you of tax on a joint return; see <a href="/library/irs/injured-innocent-spouse-relief/">injured spouse vs. innocent spouse relief</a>.
        </p>

        <h2>Offset or lost refund? Refund traces are different</h2>
        <p>
          An offset means the refund was applied to a debt. A <strong>refund trace</strong> is for a refund that was issued but never arrived, or a check that was lost or stolen. The IRS refund FAQs say to wait until the full processing time has passed — a refund check should arrive within 4 weeks of the date the IRS issues it — before requesting a trace through the refund tracker, by phone, or with <strong>Form 3911</strong>. If your notice shows an offset, a refund trace will not return the money.
        </p>

        <h2>Examples</h2>
        <ArticleTable
          head={['Situation', 'What it means']}
          rows={[
            ['Lin expected a $2,400 refund and received $1,600 with an IRS notice saying $800 was applied to her balance for an earlier year', 'An IRS offset for a federal tax debt. Questions go to the IRS.'],
            ['Marco expected $1,500 and received nothing; a BFS notice says $1,500 went to a federal student loan agency', 'A Treasury Offset Program offset. If he disputes the loan, he contacts the agency named on the notice.'],
            ['Ana and David filed jointly expecting $3,000; $2,000 went to David\'s past-due child support from before they married', 'Ana may be an injured spouse and can file Form 8379 to ask for her share. The IRS figures her share based on the instructions and, in community property states, state law.'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Read the notice before you call</div>
          <p>Whether the IRS or the Bureau of the Fiscal Service sent the notice decides who can help you. Calling the wrong office wastes time — and filing Form 8379 when your spouse has no past-due debt only delays your refund.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

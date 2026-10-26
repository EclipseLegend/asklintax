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
  id:            '116',
  title:         'IRS Appeals: How to Dispute an Audit or IRS Decision',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains administrative appeals of examination (audit) changes and how they differ from a U.S. Tax Court petition, based on Publication 5 (Rev. April 2021) and Form 12203 (Rev. August 2022). Collection appeals are only introduced here. Employment tax, tax-exempt, retirement plan, and partnership (BBA) appeals follow special procedures that this guide does not cover',
  persona:       ['Taxpayers who disagree with audit changes', 'People who received a 30-day letter or a notice of deficiency', 'People whose penalty relief or other request was denied', 'Anyone deciding between Appeals and Tax Court'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'Read the letter you received to find which appeal right it gives you and its deadline. An administrative appeal must be requested within the time limit stated in the letter. A Tax Court petition must be filed within the period stated in a notice of deficiency — usually 90 days, or 150 days if the notice is addressed to a person outside the United States — and that period cannot be extended.',
  sources: [
    { label: 'IRS — Publication 5 (Rev. April 2021), Your Appeal Rights and How to Prepare a Protest if You Disagree', url: 'https://www.irs.gov/pub/irs-pdf/p5.pdf' },
    { label: 'IRS — Form 12203 (Rev. August 2022), Request for Appeals Review', url: 'https://www.irs.gov/pub/irs-pdf/f12203.pdf' },
    { label: 'IRS — Publication 1660 (Rev. January 2020), Collection Appeal Rights', url: 'https://www.irs.gov/pub/irs-pdf/p1660.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the IRS Independent Office of Appeals?',
    a: 'Appeals is a part of the IRS that is separate from the office that proposed the change, such as the examiner who audited your return. It is the only level of administrative appeal within the IRS. Appeals conferences are informal, and Publication 5 says most disputes can be settled at the Appeals level without going to court.',
  },
  {
    q: 'Do I need a formal written protest, or is a small case request enough?',
    a: 'If the total tax and penalties for each tax period in your letter is $25,000 or less, you may make a small case request — a brief written statement, the appeal form included with your letter, or Form 12203. If any period is over $25,000, a formal written protest is required for all periods. Partnership, S corporation, employee plan, and exempt organization cases need a formal protest regardless of the amount.',
  },
  {
    q: 'How long do I have to request an appeal?',
    a: 'It depends on the letter. An administrative appeal must be sent within the time limit stated in the letter you received. A Tax Court petition has a separate deadline set by law in the notice of deficiency — usually 90 days, or 150 days if the notice is addressed to a person outside the United States. Do not assume one deadline applies to every appeal.',
  },
  {
    q: 'Does talking with Appeals extend my Tax Court deadline?',
    a: 'No. Publication 5 says you have only the time specified in the notice to petition the Tax Court, even if you continue to talk to IRS examiners or Appeals. The IRS and the Tax Court cannot change that period.',
  },
  {
    q: 'Do I have to pay before going to court?',
    a: 'Not for the U.S. Tax Court, which is generally a prepayment forum: you can petition before paying, but only if you received a notice that gives you that right. A U.S. District Court or the U.S. Court of Federal Claims generally requires that you first pay in full and file a timely refund claim.',
  },
  {
    q: 'Can someone represent me at Appeals?',
    a: 'Yes. You may represent yourself or appoint an attorney, certified public accountant, or enrolled agent. If your representative will speak with Appeals without you, file Form 2848. A Low Income Taxpayer Clinic may be able to represent you if you qualify.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-audit',
    cat:  'IRS & Tax Issues',
    title: 'I\'m being audited by the IRS — what happens next?',
    desc:  'How an audit works before you reach Appeals.',
  },
  {
    href: '/library/irs/irs-tax-liens-levies',
    cat:  'IRS & Tax Issues',
    title: 'IRS Tax Liens, Levies, and Collection Appeals',
    desc:  'Collection Due Process and the Collection Appeals Program.',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS Power of Attorney: Form 2848 vs. Form 8821',
    desc:  'Authorizing a representative for your appeal.',
  },
  {
    href: '/library/irs/taxpayer-advocate-service',
    cat:  'IRS & Tax Issues',
    title: 'Taxpayer Advocate Service: When and How to Get Help',
    desc:  'Free help when an IRS problem is causing hardship.',
  },
]

export default function IrsAppealsProcessPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Appeals: How to Dispute an Audit or IRS Decision | AskLinTax',
      description: 'How to appeal IRS audit changes: the Independent Office of Appeals, small case requests and Form 12203, formal written protests, appeal deadlines, and how a Tax Court petition after a notice of deficiency differs.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you disagree with changes the IRS proposes after an audit, you usually have two separate paths. You can ask for an <strong>administrative appeal</strong> with the IRS Independent Office of Appeals, within the time limit in your letter. And once the IRS issues a <strong>notice of deficiency</strong>, you can petition the <strong>U.S. Tax Court</strong> within the period in that notice — usually 90 days, or 150 days if it is addressed to a person outside the United States. These are different steps with different deadlines.
        </p>

        <h2>Before you appeal</h2>
        <ul>
          <li><strong>Send what was asked for.</strong> Give the IRS employee handling your case every document and explanation they requested, within the time limit. New information raised for the first time at Appeals may be sent back to the examiner, which delays your case.</li>
          <li><strong>Talk to the examiner, then a supervisor.</strong> If you still disagree, you may ask for Fast Track Settlement, if your case qualifies, or an administrative appeal.</li>
          <li><strong>Read your letter.</strong> It says which appeal rights you have, how to request an appeal, and what happens if you do nothing.</li>
        </ul>

        <h2>Small case request or formal written protest</h2>
        <ArticleTable
          head={['', 'Small case request', 'Formal written protest']}
          rows={[
            ['When it can be used', 'Total tax and penalties for each tax period in the letter is $25,000 or less', 'Required if any tax period is over $25,000 — then for all periods; also for partnership, S corporation, employee plan, and exempt organization cases regardless of amount'],
            ['How to make it', 'A brief written statement of the disputed issues and why you disagree, the appeal form included with your letter, or Form 12203', 'A written protest stating that you want to appeal, with the required contents listed below'],
            ['Where to send it', 'To the address in the letter, within the time limit in the letter', 'To the address in the letter, within the time limit in the letter'],
          ]}
        />
        <p>A formal written protest must include:</p>
        <ul>
          <li>A statement that you want to appeal the IRS's proposed changes, and your name, address, and daytime telephone number.</li>
          <li>All disputed issues, the tax periods or years involved, the proposed changes, and why you disagree with each issue.</li>
          <li>The facts, and any law or authority, supporting your position on each disputed issue.</li>
          <li>A signed penalties of perjury statement. A representative who submits the protest uses a different statement depending on whether they have personal knowledge of the facts.</li>
        </ul>

        <h2>What happens at Appeals</h2>
        <ul>
          <li><strong>An informal conference.</strong> Appeals contacts you or your representative to schedule it.</li>
          <li><strong>Tax-law arguments only.</strong> Appeals cannot consider arguments based only on moral, religious, political, constitutional, conscientious, or similar objections.</li>
          <li><strong>Assessment deadline.</strong> The IRS may ask you to extend the time it has to assess tax. Publication 5 says Appeals will not accept a case if you choose not to extend when more time is needed.</li>
          <li><strong>No agreement.</strong> For income tax cases, Appeals sends a notice of deficiency, which gives you the right to go to Tax Court.</li>
        </ul>

        <h2>Administrative appeal vs. Tax Court petition</h2>
        <ArticleTable
          head={['', 'Administrative appeal (IRS Appeals)', 'U.S. Tax Court petition']}
          rows={[
            ['What starts it', 'A letter proposing changes, such as an audit report', 'A notice of deficiency (also called a 90-day letter) or another notice giving Tax Court rights'],
            ['Deadline', 'The time limit stated in your letter', 'The period in the notice: usually 90 days, or 150 days if addressed to a person outside the U.S.; set by law and cannot be extended'],
            ['Who decides', 'An Appeals employee, independent of the examiner', 'A court that is independent of the IRS'],
            ['Payment first?', 'No', 'No — the Tax Court is generally a prepayment forum; a filing fee applies but may be waived if you qualify'],
          ]}
        />
        <p>
          If you petition the Tax Court without having gone to Appeals first, you will normally have a chance to settle with Appeals while waiting for trial. Other courts — a U.S. District Court or the U.S. Court of Federal Claims — generally require that you first pay the tax in full and file a timely refund claim.
        </p>

        <h2>Collection appeals are different</h2>
        <p>
          Disputes over a lien, levy, seizure, or payment plan follow their own procedures — mainly Collection Due Process hearings (Form 12153) and the Collection Appeals Program (Form 9423) — with much shorter deadlines. See <a href="/library/irs/irs-tax-liens-levies/">IRS Tax Liens, Levies, and Collection Appeals</a>.
        </p>

        <h2>Representation</h2>
        <ul>
          <li>You may represent yourself, or appoint an attorney, certified public accountant, or enrolled agent.</li>
          <li>File <strong>Form 2848</strong> if your representative will talk to Appeals without you. A person who is not qualified to practice may attend as a witness but cannot represent you.</li>
          <li>A <strong>Low Income Taxpayer Clinic</strong> may be able to represent you if you qualify.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Waiting for Appeals</strong> while the 90-day (or 150-day) Tax Court period runs out.</li>
          <li><strong>Assuming every appeal has the same deadline</strong> — the letter controls the administrative appeal, and the notice of deficiency controls the Tax Court petition.</li>
          <li><strong>Sending a small case request</strong> when a period is over $25,000.</li>
          <li><strong>Holding back documents</strong> until Appeals, which can send the case back to the examiner.</li>
          <li><strong>Arguing only that a tax is unfair or unconstitutional</strong>, which Appeals cannot consider.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Deadlines are strict</div>
          <p>No one can extend the Tax Court period. If you do not petition in time, the IRS will send you a bill, and the other courts generally require you to pay first. If you are close to a deadline or the amount is large, consider getting help from a qualified tax professional or a Low Income Taxpayer Clinic.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

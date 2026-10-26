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
  id:            '104',
  title:         'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains IRS relief from failure-to-file, failure-to-pay, and failure-to-deposit penalties, including the Automatic Exemption from Penalty (AEP) that began in 2026, First Time Abate, and reasonable cause, based on the IRS penalty, administrative relief, reasonable cause, and penalty appeal pages and IRS fact sheet FS-2026-12. It does not cover accuracy-related, information return, or international information return penalties in detail, or state penalties',
  persona:       ['People who filed or paid late and received a penalty notice', 'Taxpayers with a clean filing history and one late year', 'People whose illness or a disaster caused a late return', 'Household and small business employers who deposited late'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'Read the notice to see which penalty was charged and for which year; check whether automatic relief already applied; if not, call the number on the notice to request First Time Abate or reasonable cause relief, or send Form 843 with your explanation and documents.',
  sources: [
    { label: 'IRS — Administrative penalty relief (First Time Abate and Automatic Exemption from Penalty)', url: 'https://www.irs.gov/payments/administrative-penalty-relief' },
    { label: 'IRS — FS-2026-12, Automatic Exemption from Penalty: What taxpayers should know', url: 'https://www.irs.gov/newsroom/automatic-exemption-from-penalty-what-taxpayers-should-know' },
    { label: 'IRS — Penalty relief for reasonable cause', url: 'https://www.irs.gov/payments/penalty-relief-for-reasonable-cause' },
    { label: 'IRS — Failure to file penalty', url: 'https://www.irs.gov/payments/failure-to-file-penalty' },
    { label: 'IRS — Failure to pay penalty', url: 'https://www.irs.gov/payments/failure-to-pay-penalty' },
    { label: 'IRS — Failure to deposit penalty', url: 'https://www.irs.gov/payments/failure-to-deposit-penalty' },
    { label: 'IRS — Penalty appeal', url: 'https://www.irs.gov/appeals/penalty-appeal' },
    { label: 'IRS — About Form 843, Claim for Refund and Request for Abatement', url: 'https://www.irs.gov/forms-pubs/about-form-843' },
  ],
}

const FAQS = [
  {
    q: 'Do I need to apply for the Automatic Exemption from Penalty?',
    a: 'No. The IRS applies AEP during processing of an eligible original return when you meet the requirements, including three prior years (or 12 consecutive quarters) of timely compliance. If it applies, you receive a notice saying the penalty was not assessed. If you think you qualified but were charged a penalty, contact the IRS.',
  },
  {
    q: 'Is First Time Abate going away?',
    a: 'It is being replaced in stages. The IRS says First Time Abate remains available for certain returns during the transition, and that for original returns with due dates of January 1, 2027, or later, it will no longer be available and will be replaced by AEP.',
  },
  {
    q: 'Will penalty relief remove the interest too?',
    a: 'Relief removes the penalty and the interest charged on that penalty; the IRS says it automatically reduces or removes related interest when it reduces or removes a penalty. It does not remove the tax you owe or the interest on that tax.',
  },
  {
    q: 'My tax preparer filed late. Is that reasonable cause?',
    a: 'Generally not. The IRS says you are generally responsible for complying with the law even if someone else handles your taxes, and that lack of knowledge, mistakes, and lack of funds by themselves are generally not reasonable cause for filing or paying late.',
  },
  {
    q: 'Can I get relief from the estimated tax penalty?',
    a: 'Not through reasonable cause or these administrative waivers. The IRS says reasonable cause does not apply to certain penalties such as the estimated tax penalty; that penalty has its own waiver rules on Form 2210. AEP also does not cover accuracy-related or information return penalties.',
  },
  {
    q: 'The IRS denied my request. What can I do?',
    a: 'If you sent a written request and received a letter denying it with appeal rights, you can generally ask for an IRS Independent Office of Appeals conference within 30 days of the date of the letter. Check the letter for your deadline.',
  },
]

const RELATED = [
  {
    href: '/library/irs/missed-tax-deadline',
    cat:  'IRS & Tax Issues',
    title: 'I missed the tax deadline — what happens now?',
    desc:  'What to do first if you have not filed yet.',
  },
  {
    href: '/library/irs/cant-pay-tax-bill',
    cat:  'IRS & Tax Issues',
    title: 'I can\'t pay my tax bill — what are my options?',
    desc:  'Payment plans also lower the failure-to-pay penalty rate.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read and verify an IRS notice.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business & Self-Employment',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'The estimated tax penalty works differently.',
  },
  {
    href: '/library/irs/irs-appeals-process',
    cat:  'IRS & Tax Issues',
    title: 'IRS Appeals: How to Dispute an Audit or IRS Decision',
    desc:  'How to appeal audit changes and when to go to Tax Court.',
  },
]

export default function IrsPenaltyReliefPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'IRS Penalty Relief: Automatic Exemption, First Time Abate, and Reasonable Cause | AskLinTax',
      description: 'How to get IRS penalties removed: failure-to-file, failure-to-pay, and failure-to-deposit penalties, the 2026 Automatic Exemption from Penalty, First Time Abate, reasonable cause, Form 843, interest, and appeals.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The IRS can remove — or, under a new program, never assess — certain penalties for filing, paying, or depositing late. There are three main routes: the <strong>Automatic Exemption from Penalty (AEP)</strong>, which began in summer 2026 and needs no request; <strong>First Time Abate (FTA)</strong>, which you must request; and <strong>reasonable cause</strong>, which depends on your facts. Relief covers penalties, not the tax itself, and not every penalty qualifies. If you have not filed yet, start with <a href="/library/irs/missed-tax-deadline/">I missed the tax deadline</a>.
        </p>

        <h2>The penalties these rules cover</h2>
        <ArticleTable
          head={['Penalty', 'How it is figured']}
          rows={[
            ['Failure to file', '5% of the unpaid tax for each month or part of a month the return is late, up to 25%. If more than 60 days late, a minimum applies: the smaller of 100% of the tax due or $525 (returns due after December 31, 2025) or $510 (returns due in 2025)'],
            ['Failure to pay', '0.5% of the unpaid tax per month or part of a month, up to 25%; 0.25% during an approved payment plan if you filed on time; 1% if unpaid 10 days after a notice of intent to levy'],
            ['Both in the same month', 'The failure-to-file penalty is reduced by the failure-to-pay penalty for that month (for example, 4.5% plus 0.5%)'],
            ['Failure to deposit (employers)', '2% (1–5 days late), 5% (6–15 days), 10% (more than 15 days), or 15% after certain IRS notices'],
          ]}
        />

        <h2>Three kinds of relief</h2>
        <ArticleTable
          head={['', 'Automatic Exemption from Penalty (AEP)', 'First Time Abate (FTA)', 'Reasonable cause']}
          rows={[
            ['Do you have to ask?', 'No — applied during original return processing', 'Yes — by phone or in writing', 'Yes — by phone or in writing'],
            ['Main requirement', 'Timely compliance for the 3 prior years (or 12 quarters)', 'Timely compliance for the 3 prior years (or 12 quarters)', 'You used ordinary care and prudence but could not comply because of circumstances such as illness or disaster'],
            ['Years', '2025 tax-year returns and 2026 quarterly returns onward', 'Earlier periods, and returns not considered for AEP during the transition; not available for original returns due January 1, 2027, or later', 'Any year, case by case'],
            ['Penalty assessed first?', 'No — the penalty is not assessed, and the failure-to-pay penalty does not accrue', 'Yes — assessed, then removed; failure-to-pay can keep accruing until paid', 'Yes — assessed, then removed'],
          ]}
        />

        <p>
          <strong>Not every late return qualifies.</strong> FS-2026-12 says AEP is not available to everyone who files late: it applies only to eligible returns and penalties when all of its requirements are met. If you do not qualify, penalties can still be assessed, and you may still ask for First Time Abate (where it remains available) or reasonable cause relief.
        </p>

        <h2>Clean compliance history</h2>
        <p>For both AEP and FTA, the IRS looks for:</p>
        <ul>
          <li>the same type of return filed on time for the <strong>prior three years</strong> (or 12 consecutive quarters for quarterly returns); and</li>
          <li><strong>no penalties</strong> in that period, except an estimated tax penalty — or a penalty that was later removed for reasonable cause or IRS error.</li>
        </ul>
        <p>
          Businesses must also not have had the failure-to-deposit penalty waived four or more times in that period, or a deposit penalty for avoiding EFTPS.
        </p>

        <h2>What is not eligible</h2>
        <ul>
          <li><strong>AEP and FTA</strong> cover only failure-to-file, failure-to-pay, and failure-to-deposit penalties. Eligible AEP returns are Forms 1040, 1065, 1120, 940, 941, 943, 944, 945, and CT-1.</li>
          <li>They do not apply to returns filed once or infrequently (event-based filing), the daily delinquency penalty, or information reporting that depends on another filing. FS-2026-12 adds that AEP does not apply to accuracy-related or information return penalties.</li>
          <li><strong>Reasonable cause</strong> does not apply to some penalties, such as the estimated tax penalty.</li>
        </ul>

        <h2>Reasonable cause</h2>
        <p>The IRS decides reasonable cause case by case. For filing or paying late, examples it gives include:</p>
        <ul>
          <li>fires, natural disasters, or civil disturbances;</li>
          <li>inability to get records;</li>
          <li>death, serious illness, or unavoidable absence of the taxpayer or immediate family; and</li>
          <li>system issues that delayed a timely electronic filing or payment.</li>
        </ul>
        <p>
          Generally <strong>not</strong> enough on their own: relying on a tax professional, not knowing the rules, mistakes or oversights, and lack of funds.
        </p>

        <h2>How to ask for relief</h2>
        <ul>
          <li><strong>By phone:</strong> call the toll-free number on your notice. Have the notice, the penalty you want removed, and your reasons ready. If you ask for reasonable cause but qualify for FTA, the IRS applies FTA.</li>
          <li><strong>In writing:</strong> if relief is not approved by phone, or you prefer, send <strong>Form 843</strong> or a written statement to the address in the Form 843 instructions.</li>
          <li><strong>What to explain:</strong> what happened and when, how it prevented you from filing or paying, and what you did to try to comply.</li>
          <li><strong>Documents:</strong> for example, hospital records or a doctor's letter with dates, disaster documentation, and copies of letters or receipts.</li>
        </ul>

        <h2>Example: responding to a penalty notice (illustrative)</h2>
        <p>
          <strong>Jordan</strong> filed a 2025 Form 1040 on June 10, 2026 — less than two months late, with no extension — and paid the $4,000 balance with the return.
        </p>
        <ArticleTable
          head={['Situation', 'What happens']}
          rows={[
            ['Jordan filed and paid on time for 2022, 2023, and 2024 with no penalties', 'AEP should apply automatically when the 2025 return is processed: no failure-to-file or failure-to-pay penalty is assessed, and Jordan receives a notice explaining why. Interest on the late-paid tax still applies'],
            ['Jordan had a failure-to-file penalty for 2023 that was not removed', 'AEP and FTA do not apply. The penalties would be about $360 (2 months × 4.5% × $4,000) for filing late and $40 (2 months × 0.5% × $4,000) for paying late, plus interest'],
            ['Jordan was hospitalized from March through May 2026', 'Jordan calls the number on the notice and asks for reasonable cause relief, with hospital records showing the dates. If denied, Jordan can send Form 843 and, after a written denial, request an appeal'],
          ]}
        />
        <p>
          The minimum failure-to-file penalty does not apply here because the return was not more than 60 days late.
        </p>

        <h2>If your request is denied</h2>
        <p>
          You can appeal a denied <strong>written</strong> request for removal of a failure-to-file or failure-to-pay penalty to the IRS Independent Office of Appeals, generally within <strong>30 days</strong> of the denial letter (check the letter for your deadline). Publication 4576 gives an overview. You can also get help from a Low Income Taxpayer Clinic or the Taxpayer Advocate Service.
        </p>

        <h2>Common misconceptions</h2>
        <ul>
          <li><strong>"Relief removes what I owe."</strong> It removes penalties, not the tax or the interest on the tax.</li>
          <li><strong>"Every penalty can be waived."</strong> Many penalties, including the estimated tax penalty, have different rules.</li>
          <li><strong>"AEP means I can file late."</strong> The IRS says AEP does not eliminate penalties under the law.</li>
          <li><strong>"I have to name First Time Abate."</strong> You do not need to specify FTA; the IRS checks whether you qualify.</li>
          <li><strong>"Paying first ruins my request."</strong> You can request relief after paying; paying stops the failure-to-pay penalty and interest from growing.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Get help with complex cases</div>
          <p>Multiple years of penalties, accuracy-related penalties, international information return penalties (such as for Forms 3520 or 5471), business deposit penalties, and appeals can be complex. State penalties are not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

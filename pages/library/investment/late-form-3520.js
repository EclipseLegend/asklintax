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
  id:            '37',
  title:         'I filed Form 3520 late — what should I do now?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens who missed, or filed late, a Form 3520 Part IV for gifts or bequests from foreign persons. Foreign trust reporting, years with unreported income, and cases already under IRS examination need individual professional advice. This guide does not predict whether any penalty will be assessed or waived',
  persona:       ['People who just learned about Form 3520', 'Anyone who received a large gift or inheritance from abroad in an earlier year', 'Taxpayers who received an IRS penalty notice for Form 3520', 'Family members helping a relative catch up'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Do not ignore a missed Form 3520. Identify every year with a reportable foreign gift, gather the records, and consider filing the late forms with a written reasonable-cause statement. If the IRS has already contacted you about it, or if any income was also unreported, get professional help before you file.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), penalties and reasonable cause', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Delinquent international information return submission procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/delinquent-international-information-return-submission-procedures' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Internal Revenue Manual 20.1.9 — International Penalties', url: 'https://www.irs.gov/irm/part20/irm_20-001-009' },
  ],
}

const FAQS = [
  {
    q: 'Will I definitely be penalized if I file Form 3520 late?',
    a: 'Not necessarily, and no one can promise either way. The penalty for an unreported foreign gift can be 5% of the gift per month, up to 25%, but no penalty applies if the failure was due to reasonable cause and not willful neglect. Whether your facts amount to reasonable cause is decided by the IRS on the facts and circumstances.',
  },
  {
    q: 'Is "I didn\'t know about Form 3520" reasonable cause?',
    a: 'It is a common explanation, but it is not automatically accepted — reasonable cause is decided on the facts and circumstances. As practical guidance (not an IRS checklist), it helps to explain what you did to comply, whether you relied on a professional, and how quickly you fixed the problem once you learned about it. Write down the actual facts honestly.',
  },
  {
    q: 'Should I just report the gift on this year\'s Form 3520 and say nothing about earlier years?',
    a: 'No. Each year with a reportable foreign gift needs its own Form 3520 for that year. Folding an old gift into a current-year form misstates both years.',
  },
  {
    q: 'I received an IRS notice assessing a Form 3520 penalty. What now?',
    a: 'Read the notice carefully, note the response deadline, and talk with a tax professional promptly. Once the IRS has contacted you about the late forms, the delinquent-submission approach described in this guide is generally no longer the path, and your response options depend on the notice.',
  },
  {
    q: 'The gift was tax-free. Why is the penalty so big?',
    a: 'Because the penalty is based on the amount of the unreported gift, not on any tax owed. That is why a late Form 3520 on a large gift deserves careful attention even though the gift itself was generally not income.',
  },
  {
    q: 'Does a reasonable-cause statement need special wording?',
    a: 'The IRS says reasonable-cause statements must be in writing and include a declaration that begins "Under penalties of perjury, I declare…". The IRS also asks you to write "Reasonable Cause Statement attached" at the top of the first page of Form 3520 when you attach one.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide: what counts as a foreign gift and when it is reportable.',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'How to complete Part IV and where to mail it.',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
    desc:  'Before you file late, confirm which years actually crossed $100,000.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'If a penalty notice has already arrived, start with how to read it.',
  },
]

export default function LateForm3520Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Missed or Late Form 3520 for a Foreign Gift: What to Do Now | AskLinTax',
      description: 'Forgot to file Form 3520 for a gift or inheritance from abroad? How the late-filing penalty works, what reasonable cause means, how the IRS delinquent-submission procedure works, and when to get professional help.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          If you received a reportable foreign gift or inheritance and missed Form 3520, <strong>don't ignore it</strong>. The usual path for someone the IRS has not yet contacted is to <strong>file the late Form 3520</strong> for each missed year through normal filing procedures, with a written <strong>reasonable-cause statement</strong> explaining why it was late.
        </p>
        <p>
          A penalty may or may not apply. Nobody can promise relief in advance — but leaving the form unfiled keeps the problem open.
        </p>

        <h2>First, confirm a form was actually required</h2>
        <p>
          Before you worry about penalties, check each year:
        </p>
        <ul>
          <li>Were you a <strong>U.S. citizen or resident</strong> that year?</li>
          <li>Did gifts and bequests from a nonresident alien or foreign estate, <strong>plus</strong> those from foreign persons related to them, total <strong>more than $100,000</strong> that year? (Or did purported gifts from a foreign company exceed the much lower corporate threshold?)</li>
          <li>Was it really a gift — not a loan, not your own money, not tuition paid directly to a school?</li>
        </ul>
        <p>
          Many people discover they were under the threshold, or that some transfers don't count. See <a href="/library/investment/form-3520-multiple-gifts/">Multiple foreign gifts: how does the $100,000 threshold work?</a>
        </p>

        <h2>How the penalty works</h2>
        <ArticleTable
          head={['Part of Form 3520', 'Penalty for failing to report on time (per the Form 3520 instructions)']}
          rows={[
            ['Part IV — foreign gifts and bequests', '5% of the amount of the foreign gift for each month the failure continues, up to 25% in total'],
            ['Part III — distributions from a foreign trust', 'The greater of $10,000 or 35% of the gross value of the distributions'],
          ]}
        />
        <p>
          For foreign gifts, the IRS may also <strong>determine the income tax consequences</strong> of the money — in other words, it may not accept that it was a gift. For both parts, <strong>no penalty applies</strong> if the failure was due to reasonable cause and not willful neglect. (In its discussion of the foreign-trust penalty, the instructions add that a foreign country's penalty for disclosing the information is not reasonable cause; this guide does not extend that statement to the foreign-gift penalty.)
        </p>

        <h2>What "reasonable cause" means — carefully</h2>
        <p>
          Reasonable cause is decided on the facts and circumstances of each case. IRS guidance calls for the explanation to be in writing, with an affirmative showing of all the facts you are relying on. As practical guidance (not an IRS rule): there is no magic phrase, and a statement that simply says "I didn't know" may not be enough by itself.
        </p>
        <p>
          Practical guidance, not an IRS checklist — a useful statement usually explains, factually:
        </p>
        <ul>
          <li>what you received, from whom, and when</li>
          <li>why the form wasn't filed (for example, what you understood at the time and whether you relied on a preparer)</li>
          <li>when and how you learned about the requirement</li>
          <li>what you did once you learned about it, and how quickly</li>
        </ul>

        <h2>Filing late if the IRS hasn't contacted you</h2>
        <p>
          The IRS's <strong>delinquent international information return submission procedures</strong> describe the approach for taxpayers who are not under a civil examination or criminal investigation and who have not already been contacted by the IRS about the delinquent returns:
        </p>
        <ol>
          <li>File the late Form 3520 for each missed year through normal filing procedures (Form 3520 is filed separately from your tax return).</li>
          <li>Attach a reasonable-cause statement to each late form for which you are asserting reasonable cause.</li>
          <li>Include the declaration "Under penalties of perjury, I declare…" in the statement.</li>
          <li>Write <strong>"Reasonable Cause Statement attached"</strong> at the top of the first page of the Form 3520.</li>
        </ol>
        <p>
          The IRS says reasonable-cause statements attached to Forms 3520 and 3520-A will be considered before a penalty is assessed. That is a review, not a guarantee of relief.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ When this simple path is not enough</div>
          <p>If the IRS has already contacted you, if you are under examination, if a foreign trust is involved, or if there is also <strong>unreported income</strong> (for example, interest on gift money held abroad that was never reported), the situation is different. Talk with a CPA or tax attorney before filing anything.</p>
        </div>

        <h2>A worked example</h2>
        <p>
          In 2023, Jason, a U.S. citizen, received $250,000 from his parents in Hong Kong, who are nonresident aliens. He didn't know about Form 3520. In 2026 a friend mentions it. Jason confirms he was over $100,000 in 2023 and under it in 2024 and 2025. The money was always in his U.S. account and its interest was reported each year. He hasn't heard from the IRS.
        </p>
        <p>
          Jason's likely path: prepare a 2023 Form 3520 Part IV listing the gifts, attach a factual reasonable-cause statement with the penalties-of-perjury declaration, mark the first page as described above, mail it, and keep proof of mailing. Because the potential penalty on $250,000 could reach $62,500 (25%), he has a professional review the statement first. Whether a penalty is assessed is up to the IRS.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Waiting for the IRS to find it</li>
          <li>Reporting an old gift on the current year's form instead of the year it was received</li>
          <li>Filing without a reasonable-cause statement</li>
          <li>Overstating or inventing facts in the statement — it is signed under penalties of perjury</li>
          <li>Fixing Form 3520 but ignoring related FBARs or unreported interest for the same years</li>
        </ul>

        <h2>Records to gather</h2>
        <ul>
          <li>Bank and wire records for every gift, by year</li>
          <li>Evidence the money was a gift (messages or letters from the givers)</li>
          <li>Proof of the givers' status (not U.S. citizens or residents)</li>
          <li>Your tax returns for the years involved</li>
          <li>Anything showing when and how you learned about Form 3520</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          For a late Form 3520, almost always. The penalty is based on the size of the gift, so the stakes can be high, and a well-documented reasonable-cause statement matters. Professional help is especially important for multiple years, large amounts, foreign trusts, IRS notices already received, or any unreported income.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

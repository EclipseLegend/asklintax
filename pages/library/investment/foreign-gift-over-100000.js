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
  id:            '31',
  title:         'Parents overseas sent me more than $100,000 — do I need Form 3520?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers U.S. citizens and resident aliens who receive gifts or bequests from parents or other relatives who are nonresident aliens, or from a foreign estate. Gifts from foreign companies, foreign trusts, covered expatriates, and money that is really a loan or payment follow different rules',
  persona:       ['Children of parents living in Taiwan, China, or Hong Kong', 'Green card holders receiving family support', 'Young professionals buying a first home', 'Heirs of parents who lived abroad'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Add up every gift and bequest you received during the calendar year from each nonresident alien or foreign estate, combining gifts from donors you know, or have reason to know, are related to each other or acting for one another. If a combined total is more than $100,000, file Form 3520 Part IV separately from your tax return. Filing the form does not by itself mean you owe tax on the gift.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Part IV', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 (Rev. December 2023)', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
  ],
}

const FAQS = [
  {
    q: 'My parents sent me exactly $100,000. Do I file Form 3520?',
    a: 'The threshold is "more than $100,000." A related total of exactly $100,000 does not cross it. But count carefully: gifts from donors you know, or have reason to know, are related to each other (or acting for one another) go into the same total for the year, and a small extra transfer can push you over.',
  },
  {
    q: 'Is the $100,000 measured per calendar year or per transfer?',
    a: 'Per tax year. For most individuals that is the calendar year, January 1 to December 31. Transfers in different years are counted in their own years.',
  },
  {
    q: 'Do I owe income tax because I filed Form 3520?',
    a: 'No. Form 3520 is an information return. A true gift or inheritance is generally not included in your income whether or not you file the form. What the form protects you from is a penalty for failing to report.',
  },
  {
    q: 'My parents are U.S. green card holders but live in Taiwan most of the year. Is their gift a foreign gift?',
    a: 'Probably not. Part IV covers gifts from foreign persons, such as nonresident alien individuals. A lawful permanent resident is generally a U.S. resident for tax purposes, so a gift from them is usually not a foreign gift. If their green card status or residency is uncertain, have it reviewed.',
  },
  {
    q: 'I am on an F-1 visa and still a nonresident alien. Do I file Form 3520?',
    a: 'Part IV is filed by U.S. persons — U.S. citizens and resident aliens. If you are a nonresident alien for the whole year, Part IV generally does not apply to you. Your status can change from year to year, so check it each year.',
  },
  {
    q: 'What if some of the money was a loan I have to repay?',
    a: 'A loan is not a gift, so it is not reported as a gift on Form 3520 Part IV. Calling a transfer a loan does not make it one, though. If there is no real expectation of repayment, it may be a gift. Mixed or unclear arrangements should be reviewed by a tax professional.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide: what a foreign gift is, when it is taxable, and when it must be reported.',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
    desc:  'Several transfers, two parents, grandparents, or a family company: what gets added together.',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'Line-by-line Part IV, due dates and extensions, and the mailing address.',
  },
  {
    href: '/library/investment/late-form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'I filed Form 3520 late — what should I do now?',
    desc:  'If you only just learned about Form 3520, start here.',
  },
]

export default function ForeignGiftOver100000Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Parents Overseas Sent Over $100,000: Do I Need Form 3520? | AskLinTax',
      description: 'Received more than $100,000 from parents abroad? How the Form 3520 Part IV threshold works, why reporting is not the same as owing tax, what to list, and common mistakes.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          Probably yes, if you are a U.S. citizen or U.S. tax resident and the money was a gift (or inheritance) from parents who are <strong>nonresident aliens</strong>. When the gifts and bequests you receive during the tax year from a nonresident alien individual or a foreign estate, <strong>plus</strong> those from foreign persons related to them, total <strong>more than $100,000</strong>, you must file <strong>Form 3520, Part IV</strong>.
        </p>
        <p>
          Two things are true at the same time:
        </p>
        <ul>
          <li><strong>Tax:</strong> a true gift or inheritance is generally <strong>not</strong> taxable income to you, no matter how large.</li>
          <li><strong>Reporting:</strong> a large foreign gift still has to be <strong>reported</strong>. Form 3520 is filed separately from your Form 1040, and the penalty for skipping it is based on the size of the gift.</li>
        </ul>

        <ArticleTable
          head={['Your situation (2025 tax year)', 'Form 3520 Part IV?']}
          rows={[
            ['Parents (nonresident aliens) gave $80,000 in total', 'No — not more than $100,000'],
            ['Parents gave $120,000 in total', 'Yes'],
            ['Mother gave $60,000, father gave $50,000, and you know they are related to each other', 'Yes — gifts from related donors are added together ($110,000)'],
            ['Parents are U.S. citizens living in Taiwan and gave $150,000', 'No — not a gift from a foreign person'],
            ['You were a nonresident alien all year', 'Generally no — Part IV is filed by U.S. persons'],
          ]}
        />

        <h2>Who this applies to</h2>
        <p>
          Three facts decide whether this rule is yours:
        </p>
        <ol>
          <li><strong>You are a U.S. person.</strong> U.S. citizens and resident aliens (green card holders and people who meet the substantial presence test) file Part IV. See <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a></li>
          <li><strong>The giver is a foreign person.</strong> For this threshold, that means a nonresident alien individual or a foreign estate. A parent who is a U.S. citizen or green card holder is not a foreign person, even if they live abroad.</li>
          <li><strong>It is really a gift or bequest.</strong> A loan you must repay, payment for work, or a business distribution is not a gift and follows different rules.</li>
        </ol>

        <h2>How the $100,000 is counted</h2>
        <p>
          The threshold is not "per person" or "per transfer." You add together, for the tax year:
        </p>
        <ul>
          <li>every gift and bequest from the same nonresident alien or foreign estate, and</li>
          <li>gifts from other nonresident aliens and foreign estates that you know, or have reason to know, are <strong>related</strong> to that person — or that one is acting as a nominee or intermediary for another.</li>
        </ul>
        <p>
          This is how the Form 3520 instructions put it: to calculate the $100,000 threshold, you aggregate gifts from different nonresident aliens and foreign estates if you know, or have reason to know, that those persons are related to each other or that one is acting as a nominee or intermediary for the other. The instructions' own example: $75,000 from one nonresident alien and $40,000 from a related nonresident alien total $115,000, so both gifts are reported. If you are not sure whether particular relatives count as related to each other for this rule, have it reviewed rather than assume their gifts are separate. For more on multiple transfers and donors, see <a href="/library/investment/form-3520-multiple-gifts/">Multiple foreign gifts: how does the $100,000 threshold work?</a>
        </p>

        <h3>What does not count toward the $100,000</h3>
        <ul>
          <li><strong>Qualified tuition or medical payments</strong> made on your behalf — for example, tuition paid directly to your university. See <a href="/library/investment/foreign-gift-tuition-paid-directly/">My parents paid my tuition directly — do I report a foreign gift?</a></li>
          <li><strong>Gifts from U.S. citizens or U.S. tax residents</strong>, even if they live abroad.</li>
          <li><strong>Distributions from a foreign trust.</strong> These are reported in Part III of Form 3520, not Part IV. See <a href="/library/investment/foreign-gift-vs-foreign-trust/">Foreign gift from your parents vs. foreign trust distribution</a>.</li>
          <li><strong>Your own money</strong> moved from your own foreign account. That is not a gift at all. See <a href="/library/investment/transfer-own-money-to-us/">I transferred my own money from overseas to the U.S. — is it taxable?</a></li>
        </ul>

        <h2>A worked example</h2>
        <p>
          Ming is a U.S. citizen living in California. His parents are Taiwanese citizens who live in Taipei and have never lived in the U.S. During 2025:
        </p>
        <ArticleTable
          head={['Date', 'From', 'Purpose', 'Amount (USD)']}
          rows={[
            ['March 2025', 'Father', 'Help with living costs', '$30,000'],
            ['July 2025', 'Mother', 'Wedding gift', '$50,000'],
            ['December 2025', 'Father', 'Year-end gift', '$25,000'],
            ['Related total', '', '', '$105,000'],
          ]}
        />
        <p>
          Result: none of this is taxable income to Ming. Ming knows his mother and father are related to each other, so under the aggregation rule he adds their gifts together. His related total is more than $100,000, so he must file <strong>Form 3520 Part IV</strong> for 2025. On line 54 he lists each gift over $5,000 with the date, a description, and its fair market value in U.S. dollars. If his parents had stopped at $95,000, there would be nothing to file.
        </p>

        <h2>What filing looks like (high level)</h2>
        <ul>
          <li><strong>Form:</strong> Form 3520, page 1 identifying information and Part IV (line 54 for nonresident alien individuals and foreign estates).</li>
          <li><strong>What to list:</strong> each gift or bequest over $5,000. If none of the individual gifts was over $5,000 but the total is over $100,000, you still answer "Yes" and write "No gifts or bequests exceed $5,000" instead of listing them.</li>
          <li><strong>Not attached to your Form 1040.</strong> It is a separate filing. For 2025 gifts, it is due by the due date of your income tax return, including extensions, and it cannot be extended past October 15, 2026 for calendar-year filers.</li>
        </ul>
        <p>
          The due dates, extension box, and mailing address are covered in <a href="/library/investment/form-3520/">Form 3520: reporting large foreign gifts</a>.
        </p>

        <h2>Common misunderstandings</h2>
        <ul>
          <li><strong>"It's tax-free, so I don't need to report it."</strong> Not taxable and not reportable are different questions. A $300,000 gift can be tax-free and still require Form 3520.</li>
          <li><strong>"My accountant files my 1040, so it's covered."</strong> Form 3520 is separate. Ask your preparer directly whether it is being filed.</li>
          <li><strong>"Each parent gave under $100,000."</strong> Gifts from donors you know, or have reason to know, are related to each other are added together — they are not tested one donor at a time.</li>
          <li><strong>"The money went into my U.S. account, so the IRS already knows."</strong> A bank receiving a wire is not the same as you filing Form 3520.</li>
          <li><strong>"The gift itself is taxable because it is so large."</strong> Generally not. What becomes taxable is the income the money earns afterward — interest, dividends, rent, and gains.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The cost of missing it</div>
          <p>If a reportable foreign gift is not reported on time, the penalty can be 5% of the gift for each month it goes unreported, up to 25%, unless the failure was due to reasonable cause and not willful neglect. The IRS may also decide the income tax treatment of the money itself. If a deadline has already passed, read <a href="/library/investment/late-form-3520/">I filed Form 3520 late — what should I do now?</a></p>
        </div>

        <h2>Records to keep</h2>
        <ul>
          <li>Wire confirmations or bank statements showing the date, amount, and sender of each transfer</li>
          <li>The exchange rate you used to convert each transfer into U.S. dollars</li>
          <li>A note, message, or letter from your parents showing the money was a gift (not a loan)</li>
          <li>Proof of your parents' status if relevant (for example, that they are not U.S. citizens or green card holders)</li>
          <li>A copy of the Form 3520 you filed and proof of mailing</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Get help from a CPA or tax attorney if the money might be a loan or payment rather than a gift, if any of it came from a family company or a trust, if a parent gave up U.S. citizenship or a green card, if the gift was property rather than cash, or if you missed an earlier year's Form 3520.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

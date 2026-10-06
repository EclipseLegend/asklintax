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
  id:            '21',
  title:         'Foreign gifts: is money from parents overseas taxable?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers gifts and bequests that U.S. citizens and resident aliens receive from nonresident alien individuals, foreign estates, and foreign companies. Loans, payments for work, foreign trusts, and gifts from covered expatriates follow different rules',
  persona:       ['Children of parents living in Taiwan or China', 'New immigrants receiving family support', 'Students and young professionals', 'Anyone receiving money from relatives abroad'],
  relatedJourney: ['New to the U.S.', 'Cross-border finances'],
  actionRequired: 'Add up everything you received during the year from your nonresident parents and other related foreign relatives. A true gift is generally not taxable income to you — but if the related total is more than $100,000, you must report it on Form 3520, filed separately from your tax return.',
  sources: [
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Instructions for Form 3520 (Part IV)', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 inflation adjustments (section 6039F threshold)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
  ],
}

const FAQS = [
  {
    q: 'My parents in Taiwan sent me $80,000 this year. Do I owe U.S. tax on it?',
    a: 'If it was a true gift, generally no. Gifts and inheritances are generally not included in the recipient\'s income. And because $80,000 is not more than $100,000, you do not need to file Form 3520 for it — as long as you did not receive other gifts from your parents or other related nonresident aliens that push the related total over $100,000 for the year.',
  },
  {
    q: 'My mother sent $60,000 and my father sent $50,000. Do I count them separately?',
    a: 'No. For the $100,000 Form 3520 threshold, you must add together gifts from nonresident aliens you know (or have reason to know) are related to each other. Your parents are related, so the total is $110,000 — more than $100,000 — and you must file Form 3520 Part IV. The gift itself is still generally not taxable income.',
  },
  {
    q: 'I put the gift money in a savings account. Is the interest taxable?',
    a: 'Yes. The gift itself is generally not income, but what the money earns afterward — interest, dividends, rent, or gains — is taxable to you like any other investment income.',
  },
  {
    q: 'My parents paid my university tuition directly to the school. Is that a foreign gift I must report?',
    a: 'Amounts paid on your behalf for qualified tuition or medical payments are not treated as foreign gifts for Form 3520 purposes. Money sent to you that you then use for tuition is different — that is a gift to you and counts toward the threshold.',
  },
  {
    q: 'My father is a U.S. green card holder living in Taiwan. Is his gift a "foreign gift"?',
    a: 'No. A foreign gift is one from a foreign person, such as a nonresident alien individual. A lawful permanent resident is generally a U.S. resident for tax purposes, so a gift from him is not reported on Form 3520 Part IV. Whether he has any gift tax filing of his own depends on his situation.',
  },
  {
    q: 'Does the money I receive from overseas affect my FBAR?',
    a: 'Receiving a gift does not by itself create an FBAR filing. But if the money is kept in a bank account outside the United States and your foreign accounts together exceed $10,000 at any time during the year, an FBAR is required for those accounts.',
  },
  {
    q: 'I didn\'t know about Form 3520 and received a large gift two years ago. What should I do?',
    a: 'Don\'t ignore it. The penalty for not reporting a foreign gift can be 5% of the gift for each month it goes unreported, up to 25%, unless you can show reasonable cause. A tax professional can help you file the late form with an explanation of reasonable cause.',
  },
]

const RELATED = [
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'How to complete Part IV, when it is due, where to mail it, and how to avoid the late-filing penalty.',
  },
  {
    href: '/library/investment/foreign-bank-account',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to report a Taiwan or foreign bank account?',
    desc:  'If gift money stays in an account abroad, FBAR and Form 8938 may apply even though the gift is not taxable.',
  },
  {
    href: '/library/individual/new-immigrant',
    cat:  'Individuals & Families',
    title: 'New to the U.S.? A complete tax guide for new immigrants',
    desc:  'Family support from abroad is common in your first years in the U.S. — here is everything else you need to know.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Gifts are not income, but interest, rent, and salary from abroad are. See what U.S. residents must report.',
  },
]

export default function ForeignGiftsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Is Money From Parents Overseas Taxable? Foreign Gifts Explained | AskLinTax',
      description: 'Money from parents in Taiwan or China is generally not taxable income — but gifts over $100,000 must be reported on Form 3520. Plain-language guide to foreign gifts for 2025.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If your parents (or other relatives) living outside the U.S. send you money as a <strong>gift</strong>, it is generally <strong>not taxable income to you</strong>. The IRS treats gifts and inheritances you receive as excluded from your income.
        </p>
        <p>
          But "not taxable" is not the same as "nothing to report." Large gifts from foreign persons come with a separate <strong>reporting</strong> requirement — and missing it can be expensive.
        </p>

        <ArticleTable
          head={['Question', 'Answer for a true gift from nonresident parents']}
          rows={[
            ['Is the gift taxable income to me?', 'Generally no'],
            ['Is income the gift money earns later taxable?', 'Yes — interest, dividends, rent, and gains are taxable'],
            ['Do I report it on Form 3520?', 'Only if gifts from related nonresident aliens total more than $100,000 in the year'],
            ['Is Form 3520 part of my tax return?', 'No — it is filed separately with the IRS'],
          ]}
        />

        <h2>What counts as a "foreign gift"?</h2>
        <p>
          For IRS purposes, a foreign gift is money or property you receive from a <strong>foreign person</strong> that you treat as a gift (or inheritance) and exclude from your income. A foreign person includes:
        </p>
        <ul>
          <li>A nonresident alien individual — for example, parents who live in Taiwan and are not U.S. citizens or U.S. tax residents</li>
          <li>A foreign estate (for example, an inheritance from a parent who lived abroad)</li>
          <li>A foreign corporation or foreign partnership</li>
        </ul>
        <p>
          A gift from someone who is a U.S. citizen or U.S. tax resident — even if they live abroad — is <strong>not</strong> a foreign gift for these rules.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A gift has to really be a gift</div>
          <p>These rules apply to amounts that are truly gifts. Money that is actually a loan you must repay, payment for work you did, or a business distribution is not a gift, and different tax rules apply. If the money is not clearly a gift, talk to a tax professional before deciding how to treat it.</p>
        </div>

        <h2>The reporting rule: Form 3520 and the $100,000 threshold</h2>
        <p>
          You must report foreign gifts on <strong>Form 3520, Part IV</strong> when they exceed these thresholds during the tax year:
        </p>

        <ArticleTable
          head={['Gift from', 'Report on Form 3520 if the year\'s total is…', 'What to list']}
          rows={[
            ['Nonresident alien individuals or foreign estates', 'More than $100,000 (adding together gifts from related persons)', 'Each gift over $5,000'],
            ['Foreign corporations or foreign partnerships', 'More than $20,116 for 2025 ($20,573 for 2026) — adjusted for inflation each year', 'Each gift and the donor\'s identity'],
          ]}
        />

        <p>
          The most important detail for families: you must <strong>add together</strong> gifts from people you know (or have reason to know) are related to each other. Gifts from your mother and father count as one total, not two. For several transfers, grandparents, or money routed through a relative, see <a href="/library/investment/form-3520-multiple-gifts/">Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?</a>
        </p>

        <h3>A worked example</h3>
        <p>During 2025, Wen, a U.S. resident, receives these transfers from her parents in Taiwan:</p>
        <ArticleTable
          head={['Date', 'From', 'Amount (USD)']}
          rows={[
            ['February 2025', 'Mother', '$40,000'],
            ['June 2025', 'Father', '$35,000'],
            ['November 2025', 'Mother', '$30,000'],
            ['Total from related nonresident aliens', '', '$105,000'],
          ]}
        />
        <p>
          Result: the gifts are generally <strong>not taxable income</strong> to Wen, but the related total is more than $100,000, so she must file <strong>Form 3520 Part IV</strong> for 2025 and list each gift over $5,000. If her parents had sent $95,000 in total, no Form 3520 would be required.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Tuition and medical bills paid directly</div>
          <p>Amounts a foreign person pays on your behalf for qualified tuition or medical payments are not treated as foreign gifts for Form 3520. This applies to payments made for you — money sent to you that you later spend on tuition is a gift to you. See <a href="/library/investment/foreign-gift-tuition-paid-directly/">My parents paid my tuition directly — do I report a foreign gift?</a></p>
        </div>

        <h2>When the gift money starts earning income</h2>
        <p>
          The gift itself is not income, but anything it earns after you receive it is. If you deposit the money in a savings account, buy stocks, or buy a rental property, the interest, dividends, rent, and gains are taxable to you as a U.S. tax resident — whether the account or property is in the U.S. or abroad.
        </p>

        <h2>What happens if you don't report?</h2>
        <p>
          If you fail to file Form 3520 on time for a reportable foreign gift — or file it with incomplete or incorrect information — two things can happen:
        </p>
        <ul>
          <li><strong>A penalty</strong> of 5% of the value of the gift for each month it is not reported, up to a maximum of 25% of the gift, unless the failure was due to reasonable cause.</li>
          <li>The IRS may <strong>determine the income tax consequences</strong> of the money itself — in other words, it may not accept that the money was a gift.</li>
        </ul>
        <p>
          Because the penalty is based on the size of the gift, a missed Form 3520 on a large transfer can be very costly even though no income tax was owed on the gift. If a deadline has already passed, see <a href="/library/investment/late-form-3520/">I filed Form 3520 late — what should I do now?</a>
        </p>

        <h2>Special situations</h2>
        <h3>Gifts from covered expatriates</h3>
        <p>
          If the giver is a former U.S. citizen or former long-term green card holder who is treated as a "covered expatriate," a different rule applies: the U.S. recipient may owe a special transfer tax on the gift. This is rare, but if your relative gave up U.S. citizenship or a green card, ask a tax professional before assuming the gift is tax-free.
        </p>
        <h3>Distributions from a foreign trust</h3>
        <p>
          Money you receive from a foreign trust is not reported as a gift in Part IV. It is reported as a trust distribution in a different part of Form 3520, and it may be taxable. Trust situations need professional help. See <a href="/library/investment/foreign-gift-vs-foreign-trust/">Foreign gift from your parents vs. foreign trust distribution</a>.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Keep a simple gift record</div>
          <p>For every transfer from family abroad, keep the date, the amount in U.S. dollars, who sent it, and a short note that it was a gift (for example, a message or letter from your parents). These records make Form 3520 straightforward and help show the money was a gift if the IRS ever asks.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

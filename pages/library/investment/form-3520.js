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
  id:            '22',
  title:         'Form 3520: reporting large foreign gifts',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'reminder',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers Part IV of Form 3520 (gifts and bequests from foreign persons) for individual U.S. citizens and resident aliens. Foreign trust reporting (Parts I–III) is outside the scope of this guide',
  persona:       ['Anyone who received more than $100,000 from family abroad', 'Heirs of parents who lived outside the U.S.', 'New immigrants', 'Tax preparers helping family members'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'If gifts or inheritances from related nonresident aliens totaled more than $100,000 in 2025, complete Form 3520 Part IV and mail it to the IRS in Ogden, Utah, by April 15, 2026 — or by October 15, 2026 if you extended your income tax return. It is not attached to your tax return.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. 12/2025)', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Form 3520 (Rev. December 2023), Part IV', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS Revenue Procedure 2024-40 — 2025 inflation adjustments (section 6039F threshold)', url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Do I owe tax when I file Form 3520 for a gift?',
    a: 'Filing Part IV for a gift does not by itself create tax. Gifts and inheritances are generally not taxable income to the person who receives them. Form 3520 is an information return that tells the IRS about the gift.',
  },
  {
    q: 'Can I attach Form 3520 to my Form 1040?',
    a: 'No. Form 3520 is filed separately from your income tax return. Under the current instructions, you send it to the Internal Revenue Service Center, P.O. Box 409101, Ogden, UT 84409.',
  },
  {
    q: 'I filed an extension for my tax return. Is my Form 3520 extended too?',
    a: 'Yes, but only up to October 15 for calendar-year filers. If you extended your income tax return, check box 1k on Form 3520 and enter the form number of the return you extended, so the IRS does not treat the Form 3520 as late. Even if you live abroad and receive the extra discretionary extension of your tax return to December 15, Form 3520 is still due by October 15.',
  },
  {
    q: 'I inherited money from my mother, who lived in Taiwan. Is that reported on Form 3520?',
    a: 'Yes, if it is more than $100,000 for the year (counting gifts and bequests from related foreign persons together). Bequests from a nonresident alien or a foreign estate are reported in Part IV the same way as gifts.',
  },
  {
    q: 'Each of my gifts was under $5,000, but the total was over $100,000. What do I list?',
    a: 'You still answer "Yes" on line 54, but you do not complete the individual gift columns. Instead, you enter "No gifts or bequests exceed $5,000" in column (b) of the first line.',
  },
  {
    q: 'What is the penalty for filing Form 3520 late?',
    a: 'For unreported foreign gifts, the penalty is 5% of the value of the gift for each month it is not reported, up to 25%. No penalty applies if you can show the failure was due to reasonable cause and not willful neglect. The IRS may also decide the income tax treatment of the money.',
  },
  {
    q: 'Can I file Form 3520 electronically?',
    a: 'The current IRS instructions direct individuals to mail Form 3520 to the IRS service center in Ogden, Utah. Check IRS.gov/Form3520 for any updates before you file, and keep proof of mailing.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'Start here if you are not sure whether the money you received is a gift, taxable, or reportable.',
  },
  {
    href: '/library/investment/fbar-vs-form-8938',
    cat:  'Investments & Foreign Accounts',
    title: 'FBAR vs. Form 8938: what\'s the difference?',
    desc:  'Form 3520 is one of several international information returns. See how FBAR and Form 8938 differ.',
  },
  {
    href: '/library/investment/foreign-property',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign property: what U.S. taxpayers need to know',
    desc:  'Inheriting a home abroad can trigger Form 3520 — and later, rental or sale reporting.',
  },
]

export default function Form3520Page({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Form 3520 for Foreign Gifts: Thresholds, Due Dates & Penalties | AskLinTax',
      description: 'Who must file Form 3520 Part IV, the $100,000 foreign gift threshold, the 2025 foreign company threshold, due dates, where to mail it, and the late-filing penalty.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What Form 3520 is for</h2>
        <p>
          Form 3520, <em>Annual Return to Report Transactions with Foreign Trusts and Receipt of Certain Foreign Gifts</em>, is an IRS <strong>information return</strong>. U.S. persons use it to report three kinds of things: certain transactions with foreign trusts, ownership of foreign trusts, and the receipt of certain <strong>large gifts or bequests from foreign persons</strong>.
        </p>
        <p>
          This guide covers the part most families need: <strong>Part IV</strong>, for gifts and inheritances received from foreign persons. If you are dealing with a foreign trust, get professional help — those parts of the form are far more complex.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Reporting ≠ owing tax</div>
          <p>A gift from family abroad is generally not taxable income to you. Form 3520 exists so the IRS knows about large transfers from foreign persons. The cost of getting it wrong comes from penalties, not from tax on the gift itself. See <a href="/library/investment/foreign-gifts/">Foreign gifts: is money from parents overseas taxable?</a></p>
        </div>

        <h2>Who must file Part IV</h2>
        <p>You must complete Part IV if you are a U.S. person — a U.S. citizen or a U.S. tax resident (see <a href="/library/individual/tax-residency/">Am I a U.S. tax resident?</a>) — and during the tax year you received:</p>

        <ArticleTable
          head={['From', 'Threshold for the year', 'Form 3520 line']}
          rows={[
            ['Nonresident alien individuals or foreign estates (gifts or bequests)', 'More than $100,000 in total, including gifts from foreign persons related to them', 'Line 54'],
            ['Foreign corporations or foreign partnerships (purported gifts)', 'More than $20,116 for 2025 ($20,573 for 2026)', 'Line 55'],
          ]}
        />

        <h3>The aggregation rule</h3>
        <p>
          To decide whether you passed $100,000, add together gifts from different nonresident aliens and foreign estates if you know — or have reason to know — that they are related to each other, or that one is acting for another. The IRS instructions give this example: a $75,000 gift from one nonresident alien and a $40,000 gift from a related nonresident alien total $115,000, so you must report both.
        </p>

        <h3>What is not a foreign gift</h3>
        <ul>
          <li>Amounts paid on your behalf for <strong>qualified tuition or medical payments</strong></li>
          <li>Gifts from U.S. citizens or U.S. tax residents</li>
          <li>Distributions from a <strong>foreign trust</strong> — these go in Part III, not Part IV (see <a href="/library/investment/foreign-gift-vs-foreign-trust/">Foreign gift from your parents vs. foreign trust distribution</a>)</li>
        </ul>

        <h2>How to complete Part IV</h2>
        <ArticleTable
          head={['Line', 'What it asks', 'What to do']}
          rows={[
            ['Line 54', 'Did you receive more than $100,000 from nonresident aliens or foreign estates?', 'Check "Yes" and list each gift or bequest over $5,000: the date, a description, and its fair market value. If none was over $5,000, write "No gifts or bequests exceed $5,000" in column (b) of the first line.'],
            ['Line 55', 'Did you receive more than the section 6039F threshold from foreign corporations or partnerships?', 'Check "Yes" and list each gift and the donor\'s identity. The IRS may recharacterize these "gifts" as taxable income.'],
            ['Line 56', 'Was a foreign donor acting as a nominee or intermediary for someone else?', 'Check "Yes" if you have reason to believe so, and explain.'],
          ]}
        />
        <p>
          You also complete the identifying information on page 1 (your name, address, and taxpayer identification number). Gifts are reported in U.S. dollars; keep a record of the exchange rate you used for transfers made in another currency.
        </p>

        <h2>When and where to file</h2>
        <ArticleTable
          head={['Your situation (calendar-year individual)', 'Form 3520 due for 2025 gifts']}
          rows={[
            ['Standard', 'April 15, 2026'],
            ['U.S. citizen or resident living and working outside the U.S. and Puerto Rico (or on military duty abroad) on the return due date', 'June 15, 2026 — attach a statement showing you qualify'],
            ['You extended your income tax return (Form 4868)', 'October 15, 2026 — check box 1k and enter the form number of the extended return'],
          ]}
        />
        <p>
          Form 3520 is <strong>not</strong> attached to your Form 1040. Under the current instructions, mail it to:
        </p>
        <p style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '12px', padding: '16px 20px', fontFamily: 'monospace', fontSize: '15px', lineHeight: '1.7' }}>
          Internal Revenue Service Center<br />P.O. Box 409101<br />Ogden, UT 84409
        </p>
        <p>
          Only a <strong>complete</strong> Form 3520, including required attachments, is considered timely filed. If the due date falls on a weekend or legal holiday, file by the next business day.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ October 15 is the outer limit</div>
          <p>Form 3520 cannot be extended past October 15 for calendar-year filers. U.S. citizens and residents abroad who get the extra discretionary extension of their income tax return to December 15 still must file Form 3520 by October 15.</p>
        </div>

        <h2>Penalties</h2>
        <p>
          If you do not report a foreign gift on time, or the information is incomplete or incorrect:
        </p>
        <ul>
          <li>The penalty is <strong>5% of the amount of the foreign gift for each month</strong> it is not reported, up to <strong>25%</strong>.</li>
          <li>The IRS may determine the <strong>income tax consequences</strong> of the money — it may not accept that it was a gift.</li>
          <li>No penalty applies if you can show the failure was due to <strong>reasonable cause</strong> and not willful neglect.</li>
        </ul>
        <p>
          Example: a $200,000 gift reported more than five months late could face a penalty of up to $50,000 (25%) — even though the gift itself was never taxable.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When to get professional help</div>
          <p>Get help from a CPA or tax attorney if your Form 3520 is late, if a "gift" came from a company or might be a loan or payment, if a foreign trust is involved, or if the giver was a former U.S. citizen or green card holder. Late filings should include a reasonable-cause explanation — see <a href="/library/investment/late-form-3520/">I filed Form 3520 late — what should I do now?</a></p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

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
  id:            '38',
  title:         'My spouse and I received money from overseas parents — how does Form 3520 work?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains how Form 3520 Part IV applies when a married couple receives gifts from nonresident parents. For married U.S. persons filing a joint income tax return, IRS-published proposed regulations state that the $100,000 threshold applies separately to each spouse. Which spouse received a particular gift — especially gifts to both spouses or to a joint account — depends on the facts and may need individual review',
  persona:       ['Married couples receiving help from either set of parents abroad', 'Couples where one spouse is a nonresident alien', 'Couples buying a home with family money from overseas', 'Tax preparers handling a joint return'],
  relatedJourney: ['Cross-border finances', 'New to the U.S.'],
  actionRequired: 'Test the $100,000 threshold separately for each U.S. spouse — filing jointly does not combine you into one threshold. For each transfer, write down who sent it, which spouse (or joint account) received it, and who the gift was really for. Any spouse whose own total is more than $100,000 has a Form 3520 Part IV question. If transfers went to both of you or a joint account, get the facts reviewed.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Who Must File, Part IV, and joint returns', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 (Rev. December 2023)', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS Publication 525 — Taxable and Nontaxable Income (gifts and inheritances)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Internal Revenue Bulletin 2024-24, proposed regulations: proposed §1.6039F-1(c)(2)(iv), "Joint returns"', url: 'https://www.irs.gov/pub/irs-irbs/irb24-24.pdf' },
  ],
}

const FAQS = [
  {
    q: 'We file a joint tax return. Does that mean our gifts are combined for the $100,000 threshold?',
    a: 'No. For married U.S. persons who file a joint income tax return, IRS-published proposed regulations (proposed §1.6039F-1(c)(2)(iv), "Joint returns," in Internal Revenue Bulletin 2024-24) state that the $100,000 reporting threshold applies separately to each spouse. Filing jointly does not combine you into one $100,000 threshold. What still depends on the facts is which spouse actually received each gift, and whether one spouse was really receiving for the other.',
  },
  {
    q: 'Can we file one joint Form 3520?',
    a: 'That is a separate question from the threshold. Even when each spouse\'s threshold is tested separately, you may wonder whether a couple can submit one form. The Form 3520 instructions describe joint Form 3520 filing for spouses who file a joint income tax return, with the box on line 1i, and set out how names and TINs are listed — but they frame it around spouses who are both involved with the same foreign trust. We did not find the current instructions directly addressing a joint Form 3520 for gifts only, so confirm with a tax professional before filing one form for both of you.',
  },
  {
    q: 'My spouse is a nonresident alien. Do they file Form 3520 for gifts from their own parents?',
    a: 'Part IV is filed by U.S. persons. A spouse who is a nonresident alien for the year generally does not file Part IV. If the couple elects to treat the nonresident spouse as a U.S. resident for the year, their status for that year changes — have that combination reviewed.',
  },
  {
    q: 'One $80,000 transfer went to me and another $80,000 to my husband, both from my parents. Is each of us under $100,000?',
    a: 'Possibly, but don\'t assume it. If the money sent to your husband was really meant for you — for example, he was acting as a nominee or intermediary — it may need to be counted as yours. If it was a genuine gift to him, it counts toward his total. The facts and your records decide.',
  },
  {
    q: 'Are my parents and my in-laws "related" for the threshold?',
    a: 'The $100,000 count combines gifts from donors who are related to each other or acting for each other. Your mother and father are related to each other, and so are your spouse\'s parents. Whether gifts from both sets of parents must be combined for one recipient depends on whether those donors are related to each other or acting together — a question for individual review.',
  },
  {
    q: 'Is the gift taxable to either of us?',
    a: 'A true gift is generally not taxable income to the person who receives it. Income the money earns afterward — interest, dividends, rent — is taxable, and on a joint return it is reported together.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to foreign gifts and Form 3520.',
  },
  {
    href: '/library/investment/form-3520-multiple-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
    desc:  'Related donors, intermediaries, and how the annual total is built.',
  },
  {
    href: '/library/investment/foreign-gift-home-down-payment',
    cat:  'Investments & Foreign Accounts',
    title: 'Parents overseas helped with my U.S. home down payment — is it a foreign gift?',
    desc:  'The most common reason couples receive large gifts from abroad.',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: 'Nonresident spouse: can we file jointly?',
    desc:  'If one spouse is not a U.S. resident, start with filing status.',
  },
]

export default function Form3520MarriedCouplesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Married Couples and Gifts From Parents Abroad: How Form 3520 Works | AskLinTax',
      description: 'When a married couple receives money from parents overseas, Form 3520 depends on who received each gift, who the donors are, and whether a spouse acted for the other. Scenarios, joint returns, and when to get advice.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          Start with the rule: for married U.S. persons who file a joint income tax return, the IRS-published proposed regulations on foreign-gift reporting — proposed §1.6039F-1(c)(2)(iv), "Joint returns," in Internal Revenue Bulletin 2024-24 — state that the <strong>$100,000 reporting threshold applies separately to each spouse</strong>. This comes from those proposed regulations, not from the current Form 3520 instructions. Filing jointly does <strong>not</strong> combine you into one $100,000 threshold. Each U.S. spouse looks at the gifts and bequests <strong>that spouse received</strong> during the year from nonresident aliens or foreign estates (counting foreign persons related to them).
        </p>
        <p>
          What still takes judgment is deciding which spouse received a particular gift. That turns on four facts:
        </p>
        <ol>
          <li><strong>Who received each gift</strong> — you, your spouse, or both of you (for example, through a joint account)?</li>
          <li><strong>Who the gift was really for</strong> — was one spouse just receiving money meant for the other?</li>
          <li><strong>Who the donors are</strong> — and whether they are related to each other or acting together.</li>
          <li><strong>Each spouse's status</strong> — a U.S. citizen or resident files Part IV; a nonresident alien spouse generally does not.</li>
        </ol>
        <p>
          Filing a joint income tax return does not merge the two thresholds, and it does not decide which spouse received a particular gift.
        </p>

        <h2>Scenarios</h2>
        <p>All amounts are for one tax year, from parents who are nonresident aliens. Both spouses are U.S. citizens unless stated otherwise.</p>

        <ArticleTable
          head={['What happened', 'Likely starting point', 'Why it may need review']}
          rows={[
            ['Your parents send $150,000 to your own account', 'Your gift; your related total is over $100,000; you file Part IV', 'Usually straightforward'],
            ['Your parents send $60,000 to you and $60,000 to your spouse, as genuine gifts to each of you', 'Each spouse has $60,000 from related donors; neither is over $100,000 from this', 'Whether the money sent to your spouse was really for you'],
            ['Your parents send $120,000 to a joint account "for both of you"', 'Who received what is the key question', 'No 50/50 or other split rule in the IRS sources reviewed — get individual review'],
            ['Your parents send $120,000 to your spouse, but it is really your gift', 'If your spouse was acting as a nominee or intermediary, it may count as yours', 'Depends on documented intent and facts'],
            ['Your parents give you $70,000; your spouse\'s parents give your spouse $70,000', 'Each spouse has $70,000 from their own parents', 'Whether any donors are related or acting together'],
            ['Your spouse is a nonresident alien and receives $200,000 from their parents', 'Part IV is generally not filed by a nonresident alien', 'Changes if the spouse is treated as a U.S. resident for the year'],
          ]}
        />

        <h2>Why "who received it" matters so much</h2>
        <p>
          Because the threshold applies separately to each spouse, the key question is which spouse received each gift. A transfer to your spouse is not automatically your gift — and a transfer you received is not automatically shared.
        </p>
        <p>
          At the same time, the rules look through arrangements. When one person is acting as a <strong>nominee or intermediary</strong> for another, gifts are combined, and line 56 of Form 3520 asks whether you have reason to believe a donor acted as one. If money passes through your spouse only because your parents wanted it to reach you, treat it as a question to analyze, not a way to split the total.
        </p>

        <h2>Joint accounts and gifts "to both of us"</h2>
        <p>
          Many parents send money to a couple's joint account, or describe it as a gift to both. The IRS sources reviewed for this guide do not give a rule for splitting such a gift between spouses for Part IV — so don't assume an automatic 50/50 split, and don't assume it all belongs to one of you. Treat these cases as needing individual review. Useful facts to document:
        </p>
        <ul>
          <li>what your parents said, in writing, about who the gift was for</li>
          <li>which account received it and who owns that account</li>
          <li>how the money was used (for example, a home titled to both of you)</li>
          <li>whether similar gifts were made separately to each spouse</li>
        </ul>

        <h2>Two different questions: separate thresholds vs. one joint Form 3520</h2>
        <p>
          Keep two questions apart. <strong>(a) The threshold:</strong> for spouses filing jointly, the IRS-published proposed regulations say it applies separately to each spouse, as described above. <strong>(b) The form:</strong> whether spouses can submit one joint Form 3520 is a different question. The Form 3520 instructions describe a joint Form 3520 for spouses who file a joint income tax return, with the line 1i box checked and both names and TINs in the same order as on their Form 1040. The instructions present this in the setting of spouses who are both transferors, grantors, or beneficiaries of the same foreign trust. We did not find the current instructions directly addressing a joint Form 3520 for gift-only (Part IV) situations, so this guide does not assume it is allowed. Confirm with a tax professional whether one joint Form 3520 or a separate form for each recipient spouse fits your facts. Either way, Form 3520 is filed separately from your Form 1040.
        </p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ Tax vs. reporting, again</div>
          <p>Whichever spouse received the gift, a true gift is generally not taxable income. The questions in this guide are about <strong>reporting</strong>. Income the money earns later — interest, dividends, rent — is taxable and goes on your return as usual.</p>
        </div>

        <h2>A worked example</h2>
        <p>
          Anna and Ben are U.S. citizens who file jointly. In 2025, Anna's parents in Taipei (nonresident aliens) send $90,000 to Anna's own account in March and $30,000 to the couple's joint account in October with a message: "for your new home, for both of you." Ben's parents in Seoul send Ben $20,000.
        </p>
        <ul>
          <li>Anna's and Ben's thresholds are tested separately. Anna's own-account gift is $90,000. Whether some or all of the $30,000 joint-account gift is also hers decides whether Anna is over $100,000.</li>
          <li>Ben's $20,000 from his parents is far under the threshold on its own.</li>
          <li>Because the joint-account gift can change the answer, Anna and Ben have the facts reviewed. If in doubt, a professional may recommend reporting rather than risking a penalty based on the size of the gift.</li>
        </ul>

        <h2>Records to keep</h2>
        <ul>
          <li>Wire records showing sender, receiving account, and account owner(s)</li>
          <li>Written messages from the givers about who each gift was for</li>
          <li>Each spouse's U.S. tax status for the year</li>
          <li>A year-end table per spouse: date, donor, amount in U.S. dollars, account</li>
        </ul>

        <h2>When professional review makes sense</h2>
        <p>
          Whenever gifts went to a joint account or to "both of you," when one spouse may have received money meant for the other, when a spouse is a nonresident alien (see <a href="/library/individual/nonresident-spouse/">Nonresident spouse: can we file jointly?</a>), or when either spouse's total is close to $100,000. If a deadline has already passed, see <a href="/library/investment/late-form-3520/">I filed Form 3520 late — what should I do now?</a>
        </p>

      </KnowledgePage>
    </Layout>
  )
}

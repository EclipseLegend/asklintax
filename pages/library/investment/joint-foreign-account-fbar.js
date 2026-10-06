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
  id:            '49',
  title:         'Joint foreign accounts: how do married couples file FBAR?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '4 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers FBAR reporting of foreign accounts owned jointly by married U.S. persons, including the spouse filing exception. Form 8938 has its own married-couple rules, which this guide does not apply to the FBAR',
  persona:       ['Married couples with a joint account in Taiwan, China, or elsewhere', 'Couples where only one spouse is a U.S. person', 'Couples where one spouse also has a separate foreign account', 'Spouses with signature authority over each other\'s accounts'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'Each U.S. person spouse with a financial interest in a joint foreign account generally reports the entire value of the account. If all of a spouse\'s reportable accounts are jointly owned with the other spouse, the couple may use the spouse filing exception — one spouse files, and both sign FinCEN Form 114a, which is kept, not submitted.',
  sources: [
    { label: 'FinCEN — Reporting Jointly Held Accounts', url: 'https://www.fincen.gov/reporting-jointly-held-accounts' },
    { label: 'FinCEN — Filing for Spouse', url: 'https://www.fincen.gov/filing-spouse' },
    { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
    { label: 'IRS — International Practice Unit: FinCEN Form 114 (FBAR) (U.S. resident determination)', url: 'https://www.irs.gov/pub/fatca/int_practice_units/fincen-form114-fbar.pdf' },
    { label: 'FinCEN — Reporting Maximum Account Value', url: 'https://www.fincen.gov/reporting-maximum-account-value' },
  ],
}

const FAQS = [
  {
    q: 'Our joint Taiwan account had $16,000. Does each of us report $8,000?',
    a: 'No. FinCEN\'s guidance is that each joint owner reports the entire value of the account. There is no 50/50 split for the FBAR.',
  },
  {
    q: 'Can just one of us file?',
    a: 'Yes, if the spouse filing exception applies: all of the non-filing spouse\'s reportable foreign financial accounts are jointly owned with the filing spouse, the filing spouse reports all of those jointly owned accounts on a timely filed FBAR, and both spouses complete and sign FinCEN Form 114a. You keep Form 114a in your records; it is not submitted with the FBAR.',
  },
  {
    q: 'I also have my own account in Taiwan that my spouse is not on. Can we still file one FBAR?',
    a: 'Not under the spouse exception for you, because not all of your reportable accounts are jointly owned with your spouse. In that case each spouse files a separate FBAR, and each reports the entire value of the jointly owned accounts.',
  },
  {
    q: 'We file a joint income tax return. Does that let us file one FBAR?',
    a: 'Your income tax filing status is not the test. The spouse filing exception depends on the account ownership conditions above. Don\'t assume Form 8938\'s married-filing rules apply to the FBAR either.',
  },
  {
    q: 'My husband is a nonresident alien but we elected to file jointly. Is he a U.S. person for the FBAR?',
    a: 'IRS guidance says the election to treat a nonresident spouse as a resident does not make that spouse a resident for FBAR purposes. Whether he has an FBAR obligation depends on his own status — have it reviewed.',
  },
]

const RELATED = [
  {
    href: '/library/investment/fbar-10000-rule',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I need to file an FBAR? How the $10,000 rule really works',
    desc:  'Each spouse counts the full value of joint accounts toward the $10,000 test.',
  },
  {
    href: '/library/investment/fbar-maximum-account-value',
    cat:  'Investments & Foreign Accounts',
    title: 'What is the maximum value of a foreign account for FBAR?',
    desc:  'How to value the joint account you report.',
  },
  {
    href: '/library/individual/nonresident-spouse',
    cat:  'Individuals & Families',
    title: 'Nonresident spouse: can we file jointly?',
    desc:  'Filing status options when one spouse is not a U.S. resident.',
  },
]

export default function JointForeignAccountFbarPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Joint Foreign Bank Accounts and FBAR for Married Couples | AskLinTax',
      description: 'Married couples with a joint account in Taiwan or abroad: each joint owner reports the full account value, when one spouse can file for both with FinCEN Form 114a, and common mistakes.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When two people jointly own a foreign financial account, <strong>each</strong> has a financial interest in it, and each U.S. person owner reports the <strong>entire value</strong> of the account on an FBAR. Married couples have one shortcut: the <strong>spouse filing exception</strong>, which lets one spouse file a single FBAR for both — but only when its conditions are met.
        </p>

        <h2>Rule 1: each joint owner counts the full value</h2>
        <p>
          FinCEN's guidance is that if two persons jointly own a foreign financial account, each person has a financial interest in that account and each must report the entire value of the account. That full value also counts toward each spouse's own $10,000 aggregate test. Do not split a joint account 50/50 for the FBAR.
        </p>

        <h2>Rule 2: the spouse filing exception</h2>
        <p>
          Spouses do not need to file separate FBARs if:
        </p>
        <ol>
          <li><strong>all</strong> of the non-filing spouse's reportable foreign financial accounts are jointly owned with the filing spouse;</li>
          <li>the filing spouse reports all accounts jointly owned with the non-filing spouse on a <strong>timely</strong> FBAR; and</li>
          <li>both spouses complete and sign <strong>FinCEN Form 114a</strong>, Record of Authorization to Electronically File FBARs.</li>
        </ol>
        <p>
          Form 114a is kept with your records — it is not submitted with the FBAR. If the exception does not apply, both spouses file separate FBARs, and each reports the entire value of the jointly owned accounts.
        </p>

        <ArticleTable
          head={['Situation (both spouses U.S. persons)', 'How the FBAR works']}
          rows={[
            ['All foreign accounts are joint between the spouses', 'One spouse can file for both under the spouse exception, with a signed Form 114a'],
            ['One spouse also has an account the other is not on', 'That spouse cannot use the exception; each spouse files and reports the full value of the joint accounts'],
            ['One spouse only has signature authority over the other\'s separate account', 'Signature authority is its own basis for FBAR reporting; check each spouse\'s accounts carefully'],
          ]}
        />

        <h2>Example</h2>
        <p>
          Ming and Yu, both U.S. residents, have one joint Taiwan savings account with a 2025 maximum value of $16,000 and no other foreign accounts. Each has a financial interest, and each would report $16,000. Because all of each spouse's accounts are joint with the other, they use the spouse filing exception: Ming files one timely FBAR reporting the joint account, and both sign Form 114a, which they keep.
        </p>
        <p>
          If Yu also had her own Taiwan account, the exception would no longer cover her: they would file two FBARs, each reporting the joint account at its full $16,000, and Yu would also report her own account.
        </p>

        <h2>Don't borrow other rules</h2>
        <ul>
          <li><strong>Income tax filing status is not the test.</strong> Filing a joint income tax return does not by itself let you file one FBAR.</li>
          <li><strong>Form 8938 is different.</strong> It has its own married-couple thresholds and rules. Don't assume they apply to the FBAR. See <a href="/library/investment/fbar-vs-form-8938/">FBAR vs. Form 8938</a>.</li>
          <li><strong>No 50/50 split.</strong> Neither community-property ideas nor an equal-ownership assumption changes the FBAR rule that each joint owner reports the entire value.</li>
          <li><strong>A nonresident spouse.</strong> IRS guidance says the election to treat a nonresident spouse as a resident does not change FBAR residency. A spouse who is not a U.S. person does not become one for the FBAR because of that election.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

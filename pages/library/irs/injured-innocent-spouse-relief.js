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
  id:            '115',
  title:         'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '8 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains injured spouse allocation and the four types of innocent spouse relief, based on the Instructions for Form 8379 (Rev. November 2024), the Instructions for Form 8857 (Rev. June 2021), and Publication 971 (Rev. December 2021). It summarizes community property rules only briefly and does not cover Tax Court procedure in detail',
  persona:       ['Spouses whose joint refund was taken for the other spouse\'s debt', 'Divorced or separated people facing a bill from a joint return', 'People who did not know about a spouse\'s unreported income', 'Married couples in community property states'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'If your share of a joint refund was taken for your spouse\'s past-due debt, file Form 8379. If you are being held liable for tax your spouse or former spouse should pay, file Form 8857 as soon as possible — generally no later than 2 years after the IRS first tries to collect from you.',
  sources: [
    { label: 'IRS — Instructions for Form 8379 (Rev. November 2024), Injured Spouse Allocation', url: 'https://www.irs.gov/pub/irs-pdf/i8379.pdf' },
    { label: 'IRS — Instructions for Form 8857 (Rev. June 2021), Request for Innocent Spouse Relief', url: 'https://www.irs.gov/pub/irs-pdf/i8857.pdf' },
    { label: 'IRS — Publication 971 (Rev. December 2021), Innocent Spouse Relief', url: 'https://www.irs.gov/pub/irs-pdf/p971.pdf' },
  ],
}

const FAQS = [
  {
    q: 'What is the difference between an injured spouse and an innocent spouse?',
    a: 'An injured spouse wants back their share of a joint refund that was applied to the other spouse\'s separate past-due debt, such as child support or a student loan. An innocent spouse wants to be relieved of tax, interest, and penalties on a joint return that the other spouse should pay. They use different forms: Form 8379 and Form 8857.',
  },
  {
    q: 'Can I file Form 8379 with my tax return?',
    a: 'Yes. You can attach it to your joint return or an amended joint return, or file it later by itself. Write "Injured Spouse" in the upper left corner of page 1 of the joint return if you attach it. If you file it separately, attach copies of all Forms W-2, W-2G, and 1099 showing federal tax withholding for both spouses.',
  },
  {
    q: 'How long does Form 8379 take?',
    a: 'The instructions estimate about 11 weeks if filed electronically with a joint return, about 14 weeks on paper, and about 8 weeks if filed by itself after the joint return was processed.',
  },
  {
    q: 'Will my former spouse find out I asked for innocent spouse relief?',
    a: 'Yes. By law, the IRS must contact your spouse or former spouse and let them participate. There are no exceptions, even for victims of abuse. The IRS will not disclose your personal information such as your new address or employer, but other information you provide could be disclosed.',
  },
  {
    q: 'Our joint return showed tax we never paid. Can I get innocent spouse relief?',
    a: 'Only equitable relief can cover an unpaid tax — an amount correctly shown on the return but not paid. Innocent spouse relief and separation of liability relief apply only to an understated tax, where the IRS later found that the correct tax was higher.',
  },
  {
    q: 'When is it too late to request innocent spouse relief?',
    a: 'For innocent spouse relief and separation of liability relief, generally 2 years after the IRS first tried to collect the tax from you. Equitable relief has longer deadlines: generally the 10-year collection period for an unpaid balance, or the refund deadline for amounts already paid.',
  },
]

const RELATED = [
  {
    href: '/library/individual/divorce-alimony-taxes',
    cat:  'Individuals & Families',
    title: 'Divorce and Taxes: Alimony, Child Support, Property, and Retirement Accounts',
    desc:  'Other tax issues when a marriage ends.',
  },
  {
    href: '/library/individual/filing-status-head-of-household',
    cat:  'Individuals & Families',
    title: 'Filing Status and Head of Household: 2025 and 2026 Rules',
    desc:  'Filing separately to avoid joint liability.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'An IRS notice can start the clock for relief.',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS Power of Attorney: Form 2848 vs. Form 8821',
    desc:  'Authorizing a representative to help with your request.',
  },
]

export default function InjuredInnocentSpousePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Injured Spouse vs. Innocent Spouse Relief: Forms 8379 and 8857 | AskLinTax',
      description: 'Injured spouse vs. innocent spouse: Form 8379 to recover your share of a joint refund taken for a spouse\'s debt, and Form 8857 for innocent spouse, separation of liability, equitable, and community property relief — with deadlines and examples.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          When you file a joint return, both spouses are generally responsible for the full tax, interest, and penalties. Two different kinds of help exist. An <strong>injured spouse</strong> files <strong>Form 8379</strong> to get back their share of a joint refund that was taken to pay the other spouse's separate debt. An <strong>innocent spouse</strong> files <strong>Form 8857</strong> to be relieved of tax on a joint return that only the other spouse should owe. Choosing the wrong form delays your case.
        </p>

        <h2>Which one applies to you</h2>
        <ArticleTable
          head={['', 'Injured spouse (Form 8379)', 'Innocent spouse relief (Form 8857)']}
          rows={[
            ['The problem', 'Your share of a joint refund was, or will be, applied to your spouse\'s past-due debt', 'You are liable for tax on a joint return that your spouse or former spouse should pay'],
            ['Typical debts or items', 'Your spouse\'s past-due federal tax, state income tax, state unemployment debt, child support, or federal nontax debt such as a student loan', 'Unreported income or false deductions or credits by your spouse, or tax shown but not paid'],
            ['Marital status needed', 'None — you can still be married', 'Depends on the type of relief'],
            ['How to file', 'With the joint return, with an amended joint return, or later by itself', 'By itself, by mail or fax to the IRS — not with your return'],
            ['Deadline', 'Within 3 years of the original due date (with extensions) or 2 years after paying the tax that was offset, whichever is later', 'Generally 2 years after the IRS first tries to collect from you; longer for equitable relief'],
          ]}
        />

        <h2>Injured spouse allocation: Form 8379</h2>
        <ul>
          <li><strong>Who qualifies:</strong> you filed a joint return, and all or part of your portion of the overpayment was, or is expected to be, offset against your spouse's legally enforceable past-due obligations.</li>
          <li><strong>Who sends the offset notice:</strong> the IRS for federal tax debts; the Treasury Department's Bureau of the Fiscal Service for state tax, unemployment, child support, and federal nontax debts.</li>
          <li><strong>Each year:</strong> file Form 8379 for every year you want your portion of an offset refunded.</li>
          <li><strong>Community property states:</strong> Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin have special allocation rules, and the IRS follows state law.</li>
        </ul>

        <h2>The four types of relief on Form 8857</h2>
        <ArticleTable
          head={['Type', 'Main requirements']}
          rows={[
            ['Innocent spouse relief', 'Joint return with an understated tax caused by your spouse\'s erroneous items; you did not know and had no reason to know of it when you signed; it would be unfair to hold you liable'],
            ['Separation of liability relief', 'Understated tax on a joint return; you are divorced, legally separated, widowed, or have lived apart for the entire 12 months before filing Form 8857; the understated tax is allocated between you and your spouse'],
            ['Equitable relief', 'An understated or unpaid tax, and it would be unfair to hold you liable given all the facts; the only relief for an unpaid tax'],
            ['Community income relief', 'For married people in community property states who did not file jointly, relief from tax on an item of community income'],
          ]}
        />
        <p>
          <strong>Partial relief:</strong> if you knew about an erroneous item but not its full extent, you may get relief for the part you did not know about. Separation of liability relief does not refund amounts already paid, and it is not available for any part of an understatement you actually knew about when you signed.
        </p>

        <h2>Deadlines for Form 8857</h2>
        <ul>
          <li><strong>Innocent spouse and separation of liability relief:</strong> no later than 2 years after the IRS first attempted to collect the tax from you — for example, by offsetting your refund for another year and telling you about your right to file, or by issuing a notice of intent to levy.</li>
          <li><strong>Equitable relief:</strong> for an unpaid balance, generally within the IRS's collection period (usually 10 years from assessment); for a refund, within 3 years after the return was filed or 2 years after the tax was paid, whichever is later.</li>
          <li><strong>Community income relief:</strong> no later than 6 months before the assessment period against your spouse expires, or 30 days after the IRS first contacts you about an examination that starts during that 6-month period.</li>
          <li><strong>Tax Court notice:</strong> if you received a notice of deficiency, also file a Tax Court petition within the 90-day period and raise innocent spouse relief there.</li>
        </ul>

        <h2>When not to file Form 8857</h2>
        <ul>
          <li>A court already decided the question in a final decision, or you meaningfully took part in a court proceeding where you could have asked for relief.</li>
          <li>You entered into an offer in compromise or a closing agreement covering the same liability.</li>
        </ul>

        <h2>Examples</h2>
        <ArticleTable
          head={['', 'Rosa', 'Kevin', 'Hana']}
          rows={[
            ['Situation', 'Joint refund of $3,000 was taken for her husband\'s past-due child support from a prior relationship; most of the withholding was hers', 'Divorced; the IRS later found his former wife\'s unreported consulting income on their joint return', 'Joint return showed $8,000 of tax that her former husband promised to pay but did not'],
            ['Form', 'Form 8379, to recover her share of the refund', 'Form 8857 — innocent spouse or separation of liability relief', 'Form 8857 — equitable relief only, because the tax was unpaid, not understated'],
          ]}
        />

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Filing Form 8379</strong> when you really need relief from a joint tax liability, or the reverse.</li>
          <li><strong>Waiting for all your documents</strong> and missing the 2-year deadline.</li>
          <li><strong>Attaching Form 8857 to your tax return</strong> instead of mailing or faxing it separately.</li>
          <li><strong>Assuming a divorce decree</strong> that assigns the tax to your former spouse binds the IRS — it does not by itself.</li>
          <li><strong>Leaving out the other spouse's W-2s</strong> when filing Form 8379 by itself.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Safety and help</div>
          <p>The IRS must notify your spouse or former spouse about a Form 8857 request. If you have safety concerns, consider getting help from a Low Income Taxpayer Clinic or a tax professional before filing, and black out personal information you do not want shared.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

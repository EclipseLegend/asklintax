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
  id:            '90',
  title:         'Form 1099-DIV and 1099-INT Explained Box by Box',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'organizing',
  difficulty:    'Intermediate',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains the recipient boxes on Forms 1099-DIV and 1099-INT (Rev. January 2024, used for tax years 2025 and 2026) and where each amount generally goes on a 2025 Form 1040, based on the forms\' recipient instructions, the Instructions for Forms 1099-DIV and 1099-INT, Publication 550 (2025), the 2025 Instructions for Form 1040, Schedule B, and Schedule D. Liquidation distributions, section 897 amounts for foreign persons, market discount, REMICs, and state tax are not covered in detail',
  persona:       ['Mutual fund and ETF investors', 'People holding Treasury bills, notes, or savings bonds', 'Bond investors who paid a premium', 'Anyone with boxes beyond 1a and 1b filled in'],
  relatedJourney: ['Investments & crypto', 'Preparing to file'],
  actionRequired: 'Go through each box on every Form 1099-DIV and 1099-INT. Report ordinary and qualified dividends, capital gain distributions, and taxable and tax-exempt interest on the right lines, reduce basis for return-of-capital amounts, and claim withholding, foreign tax, and early withdrawal penalties.',
  sources: [
    { label: 'IRS — Form 1099-DIV (Rev. January 2024), including Instructions for Recipient', url: 'https://www.irs.gov/pub/irs-pdf/f1099div.pdf' },
    { label: 'IRS — Form 1099-INT (Rev. January 2024), including Instructions for Recipient', url: 'https://www.irs.gov/pub/irs-pdf/f1099int.pdf' },
    { label: 'IRS — Instructions for Form 1099-DIV', url: 'https://www.irs.gov/pub/irs-pdf/i1099div.pdf' },
    { label: 'IRS — Instructions for Forms 1099-INT and 1099-OID', url: 'https://www.irs.gov/pub/irs-pdf/i1099int.pdf' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — 2025 Instructions for Form 1040', url: 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule B (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sb.pdf' },
    { label: 'IRS — 2025 Instructions for Schedule D (Form 1040)', url: 'https://www.irs.gov/pub/irs-pdf/i1040sd.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Is a capital gain distribution short-term if I bought the fund recently?',
    a: 'No. Publication 550 says capital gain distributions in box 2a are reported as long-term capital gains, regardless of how long you owned your fund shares.',
  },
  {
    q: 'Do I pay tax on the return of capital in box 3?',
    a: 'Not at first. A nondividend distribution reduces your basis in the shares and is not taxed until your basis reaches zero. Any amount after that is capital gain.',
  },
  {
    q: 'Can I claim the foreign tax in box 7 without Form 1116?',
    a: 'Often. The Form 1040 instructions let you claim the credit without Form 1116 if, among other conditions, all your foreign income was interest and dividends reported on a 1099 or Schedule K-3 and your foreign taxes were not more than $300 ($600 if married filing jointly).',
  },
  {
    q: 'Is Treasury interest in box 3 of Form 1099-INT taxable?',
    a: 'Interest on Treasury bills, notes, and bonds is subject to federal income tax but exempt from state and local income taxes. Savings bond interest in box 3 may or may not all be taxable; see Publication 550.',
  },
  {
    q: 'I broke a CD early. Do I report the full interest?',
    a: 'Yes. Report all the interest in box 1, then deduct the early withdrawal penalty from box 2 on Schedule 1 (Form 1040), line 18.',
  },
  {
    q: 'Does tax-exempt interest affect my return?',
    a: 'It is reported on Form 1040, line 2a, but it is not taxed. Amounts in box 9 of Form 1099-INT or box 13 of Form 1099-DIV may matter for the alternative minimum tax.',
  },
]

const RELATED = [
  {
    href: '/library/investment/interest-and-dividends',
    cat:  'Investments & Foreign Accounts',
    title: 'Do I have to report bank interest and dividends?',
    desc:  'The beginner guide: basic reporting and when Schedule B is required.',
  },
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'The rates for qualified dividends and capital gain distributions.',
  },
  {
    href: '/library/small-business/qbi-deduction',
    cat:  'Small Business & Self-Employment',
    title: 'The QBI Deduction: 2025 and 2026 Rules',
    desc:  'The deduction that box 5 section 199A dividends may qualify for.',
  },
  {
    href: '/library/individual/worldwide-income',
    cat:  'Individuals & Families',
    title: 'Foreign income: do U.S. tax residents report worldwide income?',
    desc:  'Foreign income and the foreign tax credit.',
  },
]

export default function Form1099Div1099IntBoxesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Form 1099-DIV and 1099-INT Explained Box by Box | AskLinTax',
      description: 'Every box on Forms 1099-DIV and 1099-INT explained: qualified dividends, capital gain distributions, return of capital, section 199A dividends, foreign tax, Treasury and savings bond interest, OID, and bond premium.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          <strong>Form 1099-DIV</strong> reports dividends and fund distributions; <strong>Form 1099-INT</strong> reports interest. Boxes 1a and 1 are only the start: other boxes change how an amount is taxed, where it goes on your return, or whether it is taxed at all. This guide covers each box on the current forms (Rev. January 2024, used for 2025 and 2026). For the basics — whether to report small amounts and when Schedule B is required — see <a href="/library/investment/interest-and-dividends/">Do I have to report bank interest and dividends?</a>
        </p>

        <h2>Form 1099-DIV, box by box</h2>
        <ArticleTable
          head={['Box', 'What it shows', 'What you generally do']}
          rows={[
            ['1a — Total ordinary dividends', 'Taxable ordinary dividends', 'Form 1040, line 3b; also Schedule B if required'],
            ['1b — Qualified dividends', 'Part of box 1a that may get the 0%, 15%, or 20% rates', 'Form 1040, line 3a, if you meet the holding period'],
            ['2a — Total capital gain distributions', 'Capital gain distributions from a fund or REIT', 'Long-term capital gain: Schedule D line 13, or Form 1040 line 7a if Schedule D is not required'],
            ['2b — Unrecaptured section 1250 gain', 'Part of box 2a from depreciable real property', 'Unrecaptured Section 1250 Gain Worksheet (25% maximum rate)'],
            ['2c — Section 1202 gain', 'Part of box 2a from small business stock', 'See the Schedule D instructions for the exclusion'],
            ['2d — Collectibles (28%) gain', 'Part of box 2a from collectibles', '28% Rate Gain Worksheet, line 4'],
            ['2e and 2f — Section 897 amounts', 'Gain from U.S. real property interests', 'Apply only to foreign persons and entities'],
            ['3 — Nondividend distributions', 'Return of capital', 'Not taxed; reduces basis. Any excess over basis is capital gain'],
            ['4 — Federal income tax withheld', 'Backup withholding', 'Claim as tax withheld on your return'],
            ['5 — Section 199A dividends', 'Part of box 1a', 'May qualify for the qualified business income deduction (Form 8995 or 8995-A)'],
            ['6 — Investment expenses', 'Your share of a nonpublicly offered fund\'s expenses', 'Included in box 1a'],
            ['7 — Foreign tax paid; 8 — country', 'Foreign tax on the dividends', 'May be claimed as a credit or a deduction'],
            ['9 and 10 — Liquidation distributions', 'Cash and noncash liquidation distributions', 'At least in part a return of capital; see Publication 550'],
            ['12 — Exempt-interest dividends', 'Tax-exempt dividends from a fund', 'Form 1040, line 2a (not taxed)'],
            ['13 — Specified private activity bond interest dividends', 'Part of box 12', 'May be an AMT item; see the Form 6251 instructions'],
          ]}
        />

        <h2>Notes on the dividend boxes</h2>
        <ul>
          <li><strong>Qualified dividends:</strong> for common stock you generally must have held the shares more than 60 days during the 121-day period that begins 60 days before the ex-dividend date. For preferred stock with dividends due to periods totaling more than 366 days, the test is more than 90 days during the 181-day period that begins 90 days before the ex-dividend date. Some dividends are never qualified, even if they appear in box 1b.</li>
          <li><strong>Capital gain distributions without Schedule D:</strong> under the Form 1040 instructions, you can report box 2a directly on line 7a and skip Form 8949 and Schedule D if you have no capital losses, your only capital gains are capital gain distributions, and none of your Forms 1099-DIV show amounts in boxes 2b, 2c, or 2d.</li>
          <li><strong>Return of capital:</strong> if you bought shares in different lots and cannot identify which shares a nondividend distribution relates to, reduce the basis of the earliest purchases first.</li>
        </ul>

        <h2>Form 1099-INT, box by box</h2>
        <ArticleTable
          head={['Box', 'What it shows', 'What you generally do']}
          rows={[
            ['1 — Interest income', 'Taxable interest (not including box 3)', 'Form 1040, line 2b; also Schedule B if required'],
            ['2 — Early withdrawal penalty', 'Interest or principal forfeited on an early withdrawal', 'Report all of box 1, then deduct this on Schedule 1, line 18'],
            ['3 — U.S. savings bonds and Treasury obligations', 'Interest on savings bonds and Treasury bills, notes, and bonds', 'Federally taxable (savings bond interest may not all be taxable); exempt from state and local income tax'],
            ['4 — Federal income tax withheld', 'Backup withholding', 'Claim as tax withheld on your return'],
            ['5 — Investment expenses', 'Share of a single-class REMIC\'s expenses', 'Included in box 1; not deductible'],
            ['6 — Foreign tax paid; 7 — country', 'Foreign tax on the interest', 'May be claimed as a credit or a deduction'],
            ['8 — Tax-exempt interest', 'Tax-exempt interest, such as municipal bonds', 'Form 1040, line 2a (not taxed)'],
            ['9 — Specified private activity bond interest', 'Part of box 8', 'Generally reported on Form 6251, line 2g'],
            ['10 — Market discount', 'Accrued market discount if you made the election', 'See Publication 550'],
            ['11 — Bond premium', 'Premium amortization on a taxable bond', 'Reduces taxable interest if you amortize'],
            ['12 — Bond premium on Treasury obligations', 'Premium amortization on Treasury securities', 'Reduces box 3 interest if you amortize'],
            ['13 — Bond premium on tax-exempt bond', 'Premium amortization on a tax-exempt bond', 'Report only the net tax-exempt interest on line 2a'],
            ['14 — CUSIP number; 15–17 — state', 'Identification and state withholding', 'For your records and state return'],
          ]}
        />

        <h2>Savings bonds, OID, and bond premium</h2>
        <ul>
          <li><strong>Savings bonds:</strong> if you use the cash method, as most individuals do, you generally report savings bond interest when you receive it, although Publication 550 describes other reporting options. If you cashed Series EE or I bonds issued after 1989 and paid qualified higher education expenses, you may be able to exclude some interest on Form 8815 (Schedule B, line 3).</li>
          <li><strong>Original issue discount (OID):</strong> OID is a form of interest that you generally include in income as it accrues, even if you receive no payment, and it is reported on Form 1099-OID. A small "de minimis" discount can be treated as zero. If you report less OID than the form shows, follow the Schedule B instructions and label the difference "OID Adjustment."</li>
          <li><strong>Bond premium:</strong> for a taxable bond you can choose to amortize the premium, which reduces your taxable interest and your basis. For a tax-exempt bond you must amortize it, but the amortization is not deductible. If the form shows gross interest and premium separately, subtract it on Schedule B as an "ABP Adjustment." If the payer already reported net interest, no further reduction is allowed.</li>
        </ul>

        <h2>Example (illustrative, 2025)</h2>
        <p>
          <strong>Kai</strong> is single. Kai's fund sends a Form 1099-DIV, and a bank and Treasury account send Forms 1099-INT:
        </p>
        <ArticleTable
          head={['Form and box', 'Amount', 'Where it goes']}
          rows={[
            ['1099-DIV box 1a', '$2,400', 'Form 1040 line 3b and Schedule B (over $1,500)'],
            ['1099-DIV box 1b', '$1,800', 'Form 1040 line 3a (holding period met)'],
            ['1099-DIV box 2a', '$600', 'Long-term capital gain (line 7a if Schedule D is not required)'],
            ['1099-DIV box 3', '$300', 'Not taxed; reduces basis in the fund shares'],
            ['1099-DIV box 5', '$200', 'Part of the $2,400; may qualify for the QBI deduction'],
            ['1099-DIV box 7', '$45', 'Foreign tax credit on Schedule 3 without Form 1116, if all conditions are met'],
            ['1099-DIV box 12', '$500', 'Form 1040 line 2a (tax-exempt)'],
            ['1099-INT box 1 and box 3', '$1,200 and $900', 'Taxable interest of $2,100 on line 2b and Schedule B; the $900 is exempt from state tax'],
            ['1099-INT box 2', '$80', 'Deduct on Schedule 1, line 18'],
          ]}
        />

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Adding box 1b to box 1a</strong> — qualified dividends are already part of box 1a.</li>
          <li><strong>Treating box 3 of Form 1099-DIV as income</strong> instead of a basis reduction.</li>
          <li><strong>Forgetting box 3 of Form 1099-INT</strong>, because it is not included in box 1.</li>
          <li><strong>Netting the early withdrawal penalty</strong> against interest instead of deducting it on Schedule 1.</li>
          <li><strong>Claiming a QBI deduction on all dividends</strong> rather than only the box 5 amount that qualifies.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Check your form version</div>
          <p>Box numbers here follow the January 2024 revisions of Forms 1099-DIV and 1099-INT. Line numbers follow the 2025 Form 1040 and may differ in later years. Liquidation distributions, market discount, section 897 amounts for foreign persons, and state tax are not covered in detail.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

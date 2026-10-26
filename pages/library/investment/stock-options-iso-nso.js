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
  id:            '83',
  title:         'Stock Options: ISOs vs. NSOs, Form 3921 and the AMT',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'deciding',
  difficulty:    'Advanced',
  readTime:      '9 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains federal income tax treatment of employee stock options — incentive stock options (ISOs) and nonstatutory stock options (NSOs) — for tax years 2025 and 2026, based on Publication 525 (2025), IRS Topic no. 427, the Instructions for Form 3921 (Rev. April 2025), the 2025 Instructions for Form 6251, and the 2025 Instructions for Form 8949. Alternative minimum tax (AMT) is explained conceptually only; whether you owe AMT requires the full Form 6251 calculation. It does not cover options with a readily determinable value in detail, early exercise, or state tax',
  persona:       ['Startup and tech employees with stock options', 'People who received Form 3921', 'Employees deciding when to exercise or sell', 'Anyone surprised by AMT after exercising ISOs'],
  relatedJourney: ['Preparing to file', 'Money & Benefits'],
  actionRequired: 'Find out whether your options are ISOs or NSOs. Before exercising ISOs, consider the AMT effect for the year you exercise and the holding period for a qualifying sale. Keep Form 3921 and track both your regular tax basis and your AMT basis.',
  sources: [
    { label: 'IRS — Publication 525 (2025), Taxable and Nontaxable Income (stock options)', url: 'https://www.irs.gov/publications/p525' },
    { label: 'IRS — Topic no. 427, Stock options', url: 'https://www.irs.gov/taxtopics/tc427' },
    { label: 'IRS — Instructions for Forms 3921 and 3922 (Rev. April 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i3921.pdf' },
    { label: 'IRS — 2025 Instructions for Form 6251, Alternative Minimum Tax — Individuals', url: 'https://www.irs.gov/pub/irs-pdf/i6251.pdf' },
    { label: 'IRS — 2025 Instructions for Form 8949', url: 'https://www.irs.gov/pub/irs-pdf/i8949.pdf' },
  ],
}

const FAQS = [
  {
    q: 'Am I taxed when my options are granted?',
    a: 'Usually not. You have no income when an ISO is granted. For an NSO, you have income at grant only if the option has a readily determinable fair market value — for example, if it is actively traded — which most employee options do not.',
  },
  {
    q: 'What happens when I exercise an NSO?',
    a: 'For the usual NSO without a readily determinable value, the spread — the stock\'s value minus the exercise price — is compensation income. Your employer should report it in box 12 of Form W-2 with code V and include it in your wages. Your basis in the shares is the price you paid plus that income.',
  },
  {
    q: 'What happens when I exercise an ISO?',
    a: 'For regular income tax, nothing is included in income at exercise. For the AMT, the spread is generally an adjustment on Form 6251, line 2i, in the year your rights in the shares become transferable or no longer subject to a substantial risk of forfeiture — unless you sell the shares in the same year.',
  },
  {
    q: 'What is the ISO holding period?',
    a: 'To get capital gain treatment on all of your ISO gain, you must not sell until after the later of 2 years after the grant date or 1 year after the shares were transferred to you. Selling earlier is a disqualifying disposition.',
  },
  {
    q: 'What is a disqualifying disposition of ISO stock?',
    a: 'If you sell before meeting the holding period and have a gain, the gain is ordinary income up to the stock\'s value at exercise minus the exercise price; any extra gain is capital gain. If you sell at a loss, it is a capital loss with no ordinary income.',
  },
  {
    q: 'Why do I need two different bases?',
    a: 'For ISOs, your regular tax basis is the exercise price, but your AMT basis is increased by the AMT adjustment. Publication 525 says to keep records of both so you can figure gain or loss for the regular tax and for the AMT.',
  },
]

const RELATED = [
  {
    href: '/library/investment/espp-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'ESPP Taxes: Qualifying vs. Disqualifying Dispositions and Form 3922',
    desc:  'The other kind of statutory option.',
  },
  {
    href: '/library/investment/rsu-taxes',
    cat:  'Investments & Foreign Accounts',
    title: 'RSU Taxes: Vesting, W-2 Income and Cost Basis When You Sell',
    desc:  'How restricted stock units differ from options.',
  },
  {
    href: '/library/investment/cost-basis-form-1099-b',
    cat:  'Investments & Foreign Accounts',
    title: 'Cost Basis and Form 1099-B: Covered Shares, Adjustments and Form 8949',
    desc:  'Correcting option basis on Form 8949.',
  },
  {
    href: '/library/individual/alternative-minimum-tax',
    cat:  'Individuals & Families',
    title: 'Alternative Minimum Tax (AMT): 2025 and 2026 Rules',
    desc:  'How the AMT works, with 2025 and 2026 figures.',
  },
]

export default function StockOptionsIsoNsoPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Stock Options: ISOs vs. NSOs, Form 3921 and the AMT | AskLinTax',
      description: 'How employee stock options are taxed: NSO income at exercise, ISO holding periods, qualifying and disqualifying dispositions, AMT adjustments, Form 3921, and regular vs. AMT basis.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          A stock option lets you buy company stock at a set price (the <strong>exercise price</strong>). The tax depends on the type of option:
        </p>
        <ul>
          <li><strong>Nonstatutory stock options (NSOs, also called nonqualified options):</strong> usually taxed as <strong>wages when you exercise</strong>, on the spread between the stock's value and the exercise price.</li>
          <li><strong>Incentive stock options (ISOs):</strong> <strong>no regular income tax at exercise</strong>, but the spread can trigger the <strong>alternative minimum tax (AMT)</strong>. If you meet the holding period, your whole gain on sale is capital gain.</li>
        </ul>

        <h2>ISO vs. NSO at a glance</h2>
        <ArticleTable
          head={['Stage', 'NSO (no readily determinable value)', 'ISO']}
          rows={[
            ['Grant', 'No income', 'No income'],
            ['Exercise — regular tax', 'Spread is compensation income, reported on Form W-2 (box 12, code V)', 'No income'],
            ['Exercise — AMT', 'No separate adjustment (already taxed as wages)', 'Spread is generally an AMT adjustment on Form 6251, line 2i, unless you sell in the same year'],
            ['Regular tax basis', 'Exercise price + income included', 'Exercise price (plus any ordinary income from a disqualifying disposition)'],
            ['AMT basis', 'Same as regular basis', 'Exercise price + AMT adjustment'],
            ['Sale', 'Capital gain or loss from your basis', 'Qualifying: all capital gain or loss. Disqualifying: part may be ordinary income'],
            ['Form from your employer', 'Form W-2', 'Form 3921'],
          ]}
        />

        <h2>ISO holding period and disqualifying dispositions</h2>
        <p>
          You meet the ISO holding period if you don't sell until after the later of <strong>2 years after the grant date</strong> or <strong>1 year after the shares were transferred to you</strong>. You must also have been an employee of the company (or a related company) from the grant date until 3 months before exercise (1 year if you are disabled). In a <strong>disqualifying disposition</strong> with a gain, the gain is ordinary income up to the stock's value at exercise minus the exercise price, and the rest is capital gain. A loss is a capital loss with no ordinary income.
        </p>

        <h2>Examples (illustrative)</h2>
        <p>
          <strong>NSO:</strong> Ben has an NSO for 1,000 shares at $10. He exercises in April 2025 when the stock is worth $25. He has <strong>$15,000</strong> of compensation income ($25 − $10, × 1,000) in his 2025 W-2 wages. His basis is $25,000 ($10,000 paid + $15,000 income). He sells in February 2026 for $30 a share ($30,000), less than a year after exercise, for a <strong>$5,000 short-term capital gain</strong>.
        </p>
        <p>
          <strong>ISO, qualifying sale:</strong> Kim is granted an ISO on February 1, 2024, for 100 shares at $20. She exercises on March 3, 2025, when the stock is worth $50, and the shares are freely transferable. She sells on June 1, 2026, for $70 a share — after February 1, 2026 (2 years after grant) and March 3, 2026 (1 year after transfer).
        </p>
        <ArticleTable
          head={['', 'Regular tax', 'AMT (concept)']}
          rows={[
            ['2025 (exercise year)', 'No income', 'Adjustment of $3,000 (($50 − $20) × 100) on Form 6251, line 2i'],
            ['Basis in the shares', '$2,000', '$5,000 ($2,000 + $3,000)'],
            ['2026 sale for $7,000', 'Long-term capital gain of $5,000', 'Gain figured from the $5,000 AMT basis is $2,000'],
          ]}
        />
        <p>
          Whether the $3,000 adjustment actually creates AMT for 2025 depends on Kim's whole return and the full Form 6251 calculation, which this guide does not perform.
        </p>
        <p>
          <strong>ISO, disqualifying sale:</strong> if Kim instead sold all 100 shares on December 1, 2025, for $70, she would have $3,000 of ordinary income (the $50 value at exercise minus $20, × 100), reported as wages, and a $2,000 short-term capital gain from her $5,000 basis. Because she sold in the same year she exercised, no AMT adjustment is required for those shares.
        </p>

        <h2>Form 3921 and Form 1099-B</h2>
        <p>
          After you exercise an ISO, your employer should give you <strong>Form 3921</strong> by January 31 of the next year. It shows the grant date (box 1), exercise date (box 2), exercise price per share (box 3), value per share on the exercise date (box 4), and number of shares (box 5). For options granted after 2013, the basis on Form 1099-B won't include any amount you reported as income, so you may need to adjust it on Form 8949 with code B. See <a href="/library/investment/cost-basis-form-1099-b/">cost basis and Form 1099-B</a>.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Ignoring the AMT</strong> in the year you exercise ISOs and hold the shares.</li>
          <li><strong>Keeping only one basis</strong> for ISO shares. You need both the regular tax basis and the AMT basis.</li>
          <li><strong>Counting the holding period from the vesting date</strong> instead of the grant and exercise dates.</li>
          <li><strong>Reporting NSO income twice</strong> — once in W-2 wages and again as capital gain because the basis was not adjusted.</li>
          <li><strong>Assuming every option is an ISO.</strong> If the employment or transfer rules are not met, the option is an NSO.</li>
        </ul>

        <h2>Forms you will see</h2>
        <ArticleTable
          head={['Form', 'Use']}
          rows={[
            ['Form W-2', 'NSO exercise income (box 12, code V) and ISO disqualifying-disposition income'],
            ['Form 3921', 'ISO exercise information'],
            ['Form 6251', 'Alternative minimum tax, including the ISO adjustment (line 2i)'],
            ['Form 1099-B, Form 8949 and Schedule D', 'Sale of the shares and any basis correction'],
            ['Schedule 1 (Form 1040), line 8k', 'Option income not included on your W-2'],
          ]}
        />

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ AMT is complex</div>
          <p>The AMT examples above show concepts only. Whether you owe AMT depends on your full return and the Form 6251 calculation. Consider professional help before exercising a large number of ISOs. State tax treatment is not covered.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

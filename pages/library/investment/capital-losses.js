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
  id:            '62',
  title:         'I lost money on stocks — can I deduct it?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'anxious',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers individuals with capital losses from selling stocks or similar securities in a taxable account. Worthless securities, section 1256 contracts, losses inside retirement accounts, and dealer or trader rules are outside this guide',
  persona:       ['Investors who sold shares at a loss', 'People with a loss carryover from an earlier year', 'Anyone who sold and bought back the same stock', 'Couples deciding how losses apply on separate returns'],
  relatedJourney: ['Investments & crypto', 'Side income from investments'],
  actionRequired: 'Net your realized losses against your gains on Schedule D. If losses are larger, you can generally deduct up to $3,000 ($1,500 if married filing separately) against other income this year and carry the rest forward. Check for wash sales before counting any loss.',
  sources: [
    { label: 'IRS — Topic no. 409, Capital gains and losses', url: 'https://www.irs.gov/taxtopics/tc409' },
    { label: 'IRS — Publication 550 (2025), Investment Income and Expenses', url: 'https://www.irs.gov/publications/p550' },
    { label: 'IRS — Instructions for Schedule D (Form 1040) (2025)', url: 'https://www.irs.gov/instructions/i1040sd' },
    { label: 'IRS — Instructions for Form 8949 (2025)', url: 'https://www.irs.gov/instructions/i8949' },
    { label: 'IRS — Rev. Rul. 2008-5, wash sales and IRAs', url: 'https://www.irs.gov/pub/irs-drop/rr-08-05.pdf' },
    { label: 'IRS — Publication 544 (2025), Sales and Other Dispositions of Assets', url: 'https://www.irs.gov/publications/p544' },
  ],
}

const FAQS = [
  {
    q: 'My stocks are down, but I haven\'t sold. Can I deduct the loss?',
    a: 'No. Only realized losses — from an actual sale or other disposition — are reported. A paper loss on shares you still hold is not deductible.',
  },
  {
    q: 'I lost $10,000 this year and had no gains. How much can I deduct?',
    a: 'Generally $3,000 against your other income this year ($1,500 if married filing separately). The remaining $7,000 is a capital loss carryover you can use in later years, figured with the Capital Loss Carryover Worksheet.',
  },
  {
    q: 'I sold at a loss and bought the same stock back two weeks later. Is that a problem?',
    a: 'Yes — that is generally a wash sale. Buying substantially identical stock within 30 days before or after the loss sale disallows the loss for now. In a taxable account, the disallowed loss is added to the basis of the new shares, so it is postponed rather than lost.',
  },
  {
    q: 'What if my IRA bought the shares back?',
    a: 'That is still a wash sale, and the result is worse: under IRS Rev. Rul. 2008-5, the loss is disallowed and is not added to your basis in the IRA or Roth IRA, so you generally cannot recover it later.',
  },
  {
    q: 'Can I deduct a loss on selling my car or my home?',
    a: 'No. Losses on personal-use property, such as your car or the home you live in, are not deductible. Some of these sales still have to be reported — for example, if you received a Form 1099-S or Form 1099-K.',
  },
]

const RELATED = [
  {
    href: '/library/investment/stock-sale-capital-gains',
    cat:  'Investments & Foreign Accounts',
    title: 'I sold stock — how are capital gains taxed?',
    desc:  'Short-term vs. long-term, rates, and Form 8949.',
  },
  {
    href: '/library/investment/crypto-tax',
    cat:  'Investments & Foreign Accounts',
    title: 'Crypto taxes explained: when is crypto taxable?',
    desc:  'Crypto losses are capital losses too.',
  },
  {
    href: '/library/rental/selling-your-home',
    cat:  'Real Estate & Airbnb',
    title: 'I sold my house — do I have to pay tax on the profit?',
    desc:  'Why a loss on your main home is not deductible.',
  },
]

export default function CapitalLossesPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Stock Losses: Can You Deduct Them? $3,000 Limit, Carryovers & Wash Sales | AskLinTax',
      description: 'Sold stock at a loss? How losses offset gains, the $3,000 ($1,500 married filing separately) annual limit, carrying losses forward, wash sales — including IRA purchases — and personal-use losses.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Often, yes — but not all at once and not in every case. A <strong>realized</strong> capital loss first offsets your capital gains. If your losses are larger than your gains, you can generally deduct up to <strong>$3,000</strong> of the excess against other income each year (<strong>$1,500</strong> if married filing separately) and <strong>carry the rest forward</strong> to later years. A loss can be disallowed if it is a <strong>wash sale</strong>, and losses on personal-use property are not deductible at all.
        </p>

        <h2>Only realized losses count</h2>
        <p>
          A loss is reported when you sell or otherwise dispose of the investment. If your shares are worth less than you paid but you still hold them, there is nothing to deduct yet.
        </p>

        <h2>How losses are netted</h2>
        <ol>
          <li>Short-term losses offset short-term gains, and long-term losses offset long-term gains.</li>
          <li>A net loss in one category then offsets a net gain in the other.</li>
          <li>If the overall result is still a loss, the annual limit below applies.</li>
        </ol>

        <h2>The annual limit and carryovers</h2>
        <ArticleTable
          head={['Filing status', 'Net capital loss you can deduct against other income each year']}
          rows={[
            ['Most filers (including married filing jointly)', 'The lesser of $3,000 or your total net loss'],
            ['Married filing separately', 'The lesser of $1,500 or your total net loss'],
          ]}
        />
        <p>
          Any loss above the limit is a <strong>capital loss carryover</strong> to later years. Publication 550 and the Schedule D instructions include a Capital Loss Carryover Worksheet; it uses short-term losses first. If spouses filed jointly and later file separately, a carryover from the joint return can be deducted only by the spouse who actually had the loss.
        </p>

        <h2>Example (illustrative)</h2>
        <p>
          Jordan, a single filer, had a $2,000 long-term gain and a $12,000 short-term loss in 2025. The loss first wipes out the $2,000 gain, leaving a $10,000 net loss. Jordan deducts $3,000 against other income for 2025 and carries the remaining $7,000 forward.
        </p>

        <h2>Wash sales: when a loss is disallowed</h2>
        <p>
          You generally have a <strong>wash sale</strong> if you sell stock or securities at a loss and, within <strong>30 days before or after</strong> the sale, you buy substantially identical stock or securities — or acquire them in a fully taxable trade, acquire a contract or option to buy them, or acquire them for your <strong>IRA or Roth IRA</strong>. A purchase by your spouse or by a corporation you control can also trigger a wash sale.
        </p>
        <ArticleTable
          head={['Who bought the replacement shares', 'What happens to the loss']}
          rows={[
            ['You, in a taxable account', 'Disallowed now, but added to the basis of the new shares — the loss is postponed, not lost'],
            ['Your IRA or Roth IRA', 'Disallowed, and not added to your IRA or Roth IRA basis — the loss is generally lost for good (IRS Rev. Rul. 2008-5)'],
          ]}
        />
        <p>
          A wash sale applies even if it does not appear on your Form 1099-B.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Losses that are not deductible</div>
          <p>A loss on <strong>personal-use property</strong> — such as your car or the home you live in — is not deductible. Some of these sales still have to be reported, for example when you receive a Form 1099-S or Form 1099-K. See <a href="/library/rental/selling-your-home/">I sold my house</a> and <a href="/library/individual/form-1099-k/">I got a 1099-K</a>.</p>
        </div>

        <h2>How to report</h2>
        <p>
          Report each sale on <strong>Form 8949</strong> (short-term in Part I, long-term in Part II), including any wash sale adjustment, and carry the totals to <strong>Schedule D</strong>. For how gains themselves are taxed, see <a href="/library/investment/stock-sale-capital-gains/">I sold stock — how are capital gains taxed?</a> Crypto losses are also capital losses that go through the same netting and annual limit — see <a href="/library/investment/crypto-tax/">Crypto taxes explained</a>.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

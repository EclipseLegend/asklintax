import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '03',
  title:         'LLC vs S-Corp: which is right for your business?',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '7 min read',
  verification:  'official-sources-verified',
  sources: [
    { label: 'IRS — S corporations', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations' },
    { label: 'IRS — Instructions for Form 2553', url: 'https://www.irs.gov/instructions/i2553' },
    { label: 'IRS — Instructions for Form 1120-S', url: 'https://www.irs.gov/instructions/i1120s' },
    { label: 'IRS — S corporation compensation and medical insurance issues', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues' },
    { label: 'IRS — Self-employment tax (Social Security and Medicare taxes)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
  ],
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'General principles apply broadly; individual tax savings depend on your specific income level, salary, and state. Consult a CPA before making an S-Corp election.',
  persona:       ['Self-employed', 'Freelancer', 'Small business owner', 'LLC owner considering tax optimization'],
  relatedJourney: ['Starting a small business', 'Growing an existing business'],
  actionRequired: 'Compare the self-employment tax you pay now with what you would pay on a reasonable S-Corp salary, after the added cost of payroll and a separate business return. If the election looks worthwhile, run the numbers for your specific situation with a tax professional before filing Form 2553.',
}

const FAQS = [
  {
    q: 'Can my LLC be taxed as an S-Corp?',
    a: 'Yes. An LLC can elect to be taxed as an S-Corp by filing Form 2553 with the IRS. The LLC remains an LLC legally — you keep the same operating agreement and state registration. Only the tax treatment changes. This is one of the most common tax strategies for profitable small businesses.',
  },
  {
    q: 'When should I make the S-Corp election?',
    a: 'For the election to apply to the current tax year, you generally must file Form 2553 no more than 2 months and 15 days after the beginning of that tax year (or at any time during the preceding tax year). For a new LLC, the first tax year begins when it has shareholders, acquires assets, or begins doing business, whichever comes first. If you miss that window, the election generally applies to the following year. You can also file a late election in some circumstances — a CPA can help with this.',
  },
  {
    q: 'What salary do I need to pay myself as an S-Corp owner?',
    a: 'The IRS requires S-Corp owner-employees to pay themselves a "reasonable salary" — meaning comparable to what you\'d pay someone else to do your job. There\'s no fixed number, but it must be defensible. Paying yourself $10,000 when the business earns $200,000 is a red flag. The IRS looks at factors such as your training and experience, duties, time devoted to the business, and what comparable businesses pay for similar services.',
  },
  {
    q: 'Does an S-Corp require more paperwork?',
    a: 'Yes, significantly more. S-Corps must file a separate business tax return (Form 1120-S), run payroll for the owner-employee, file quarterly payroll tax returns, and issue W-2s. You\'ll almost certainly need an accountant or payroll service. Factor these costs into your savings calculation.',
  },
  {
    q: 'What are the eligibility requirements for S-Corp status?',
    a: 'To elect S-Corp status, your business must: have no more than 100 shareholders, have only one class of stock, have only eligible shareholders — generally individuals who are U.S. citizens or U.S. residents for tax purposes, estates, and certain trusts (not partnerships, corporations, or nonresident aliens), and be a domestic corporation or an entity eligible to elect corporate treatment, such as an LLC. Most small businesses easily meet these requirements.',
  },
  {
    q: 'Can a non-U.S. citizen or green card holder own an S-Corp?',
    a: 'The rule is about tax residency, not immigration status: an S-Corp can have no nonresident alien shareholders. U.S. citizens and resident aliens — green card holders, and visa holders who meet the substantial presence test — can own S-Corp shares. If you are a nonresident alien for tax purposes, you can\'t be an S-Corp shareholder, which limits your tax planning options. Residency can change from year to year, so confirm it before electing. Consult a CPA who understands international tax rules.',
  },
  {
    q: 'Is an S-Corp better than a C-Corp for a small business?',
    a: 'For most small businesses, yes. C-Corps face double taxation — the corporation pays tax on profits, then shareholders pay tax again on dividends. S-Corps avoid this by passing income through to owners\' personal returns. C-Corps make more sense for businesses seeking venture capital, planning to go public, or retaining large amounts of profit inside the company.',
  },
]

const RELATED = [
  {
    href: '/library/business-formation/llc-basics',
    cat:  'Business Formation',
    title: 'What is an LLC and do I need one?',
    desc:  'Before comparing LLC and S-Corp, make sure you understand what an LLC is and whether you need one at all.',
  },
  {
    href: '/library/small-business/quarterly-taxes',
    cat:  'Small Business',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'Both LLC and S-Corp owners pay quarterly estimated taxes. Here\'s how the calculation works.',
  },
  {
    href: '/library/business-formation/ein',
    cat:  'Business Formation',
    title: 'How to apply for an EIN (step-by-step)',
    desc:  'You\'ll need an EIN before you can run payroll as an S-Corp. Here\'s how to get one in 5 minutes.',
  },
]

export default function LLCvsSCorpPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'LLC vs S-Corp: Which Is Right for Your Business? | AskLinTax',
      description: 'A clear comparison of LLC and S-Corp tax treatment — with a worked example and the factors that decide whether an S-Corp election makes sense.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>First: LLC and S-Corp are not the same type of thing</h2>
        <p>
          Before comparing them, it helps to understand that LLC and S-Corp operate on two different levels:
        </p>
        <ul>
          <li><strong>LLC</strong> is a <em>legal structure</em> — it's how your business is registered with your state.</li>
          <li><strong>S-Corp</strong> is a <em>tax election</em> — it's how the IRS taxes your business income.</li>
        </ul>
        <p>
          This means they're not mutually exclusive. In fact, the most common setup for profitable small businesses is: <strong>an LLC that elects to be taxed as an S-Corp</strong>. You get the legal simplicity of an LLC combined with the tax advantages of S-Corp treatment.
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The most important thing to understand</div>
          <p>When people say "should I be an LLC or an S-Corp," they're usually really asking: "should my LLC elect S-Corp tax treatment?" Because the LLC structure itself stays the same — only the tax treatment changes.</p>
        </div>

        <h2>How each is taxed — and why it matters</h2>

        <h3>Default LLC taxation (no S-Corp election)</h3>
        <p>
          By default, if you're the only owner of an LLC, the IRS treats all your business profit as your personal income. Every dollar of net profit is subject to:
        </p>
        <ul>
          <li>Self-employment tax: <strong>15.3%</strong> (covers Social Security and Medicare)</li>
          <li>Federal income tax: based on your total income bracket</li>
          <li>State income tax: varies by state</li>
        </ul>
        <p>
          The self-employment tax applies to <em>all</em> your net profit. There's no way around it under default LLC taxation.
        </p>

        <h3>S-Corp taxation (after electing S-Corp status)</h3>
        <p>
          With an S-Corp election, your income is split into two parts:
        </p>
        <ul>
          <li><strong>Your salary</strong> — subject to payroll taxes (same as self-employment tax), reported on a W-2</li>
          <li><strong>Owner distributions</strong> — the remaining profit passed through to you, <em>not</em> subject to self-employment tax</li>
        </ul>
        <p>
          The tax saving comes from that second category. Distributions avoid the 15.3% self-employment tax entirely. The more profit you take as distributions rather than salary, the more you save — but the IRS requires your salary to be "reasonable," so there's a limit to how far you can take this.
        </p>

        <h2>A real example with numbers</h2>
        <p>
          Let's say your LLC nets <strong>$100,000 in profit</strong> this year.
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}></th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Default LLC</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>LLC taxed as S-Corp</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Net profit', '$100,000', '$100,000'],
                ['Owner salary', 'N/A', '$60,000'],
                ['Distributions', 'N/A', '$40,000'],
                ['Self-employment / payroll tax', '$14,130 (15.3% of 92.35% of $100K)', '$9,180 (15.3% of the $60K salary — employer and employee shares)'],
                ['Estimated SE tax savings', '—', '~$4,950/year'],
                ['Additional S-Corp costs (payroll, tax return) — assumed for this example', '—', '~$1,500–$3,000/year'],
                ['Approximate net savings', '—', '~$1,950–$3,450/year'],
              ].map(([label, llc, scorp], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 6 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{label}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{llc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: i === 6 ? 'var(--green)' : 'inherit', fontWeight: i === 6 ? '600' : '400', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{scorp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ These are estimates, not guarantees</div>
          <p>The actual savings depend on your salary amount, state taxes, and the specific costs of running payroll and filing an S-Corp return. Always run the numbers with a CPA for your situation before making the election.</p>
        </div>

        <h2>When does an S-Corp make sense?</h2>
        <p>
          There is no IRS income threshold for electing S-Corp status. Whether it saves money depends on how much of your profit is left after paying yourself a reasonable salary, your state's taxes and fees, and the added cost of payroll and a separate business return. Compare those numbers for your own situation — ideally with a tax professional — before filing Form 2553.
        </p>

        <h2>The real costs of running an S-Corp</h2>
        <p>
          The tax savings are real — but so are the additional costs and requirements. Before electing S-Corp status, understand what you're taking on:
        </p>
        <ul>
          <li><strong>Separate business tax return (Form 1120-S)</strong> — Due by the 15th day of the 3rd month after the tax year ends (March 16, 2026 for calendar-year 2025, because March 15 falls on a Sunday). More complex than a Schedule C, and many owners pay a tax professional to prepare it.</li>
          <li><strong>Payroll setup and quarterly filings</strong> — You must run payroll for yourself as an employee, file quarterly payroll tax returns (Form 941), and issue yourself a W-2 at year end. Many owners use a payroll service, which adds cost.</li>
          <li><strong>More accounting work</strong> — With payroll, quarterly filings, and a separate business return, your bookkeeping becomes more demanding. Factor in CPA costs accordingly.</li>
          <li><strong>Reasonable salary scrutiny</strong> — The IRS watches for S-Corp owners who pay themselves unreasonably low salaries to maximize distributions. Getting this wrong can trigger audits and penalties.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The "reasonable salary" requirement is serious</div>
          <p>The IRS has successfully challenged S-Corp owners who paid themselves below-market salaries to avoid payroll taxes. Your salary must be comparable to what you'd pay an employee to do the same work. A CPA can help you establish a defensible salary for your industry and income level.</p>
        </div>

        <h2>Side-by-side comparison</h2>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Feature</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Default LLC</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>LLC with S-Corp election</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Self-employment tax', 'On all net profit', 'Only on salary portion'],
                ['Payroll required', 'No', 'Yes — owner must be on payroll'],
                ['Separate business tax return', 'No (Schedule C on personal return)', 'Yes — Form 1120-S (due the 15th day of the 3rd month after year end)'],
                ['Complexity', 'Low', 'Medium to high'],
                ['Annual compliance cost', 'Lower', 'Higher (payroll and a separate business return)'],
                ['Eligibility restriction', 'None (any owner)', 'No nonresident alien shareholders; max 100 shareholders; one class of stock'],
                ['Best for', 'Owners who prefer simplicity, or whose savings wouldn\'t cover the added costs', 'Owners whose profit is consistently well above a reasonable salary, willing to handle added compliance'],
              ].map(([feat, llc, scorp], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{feat}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{llc}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{scorp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How to make the S-Corp election</h2>
        <p>
          If you've decided an S-Corp election makes sense, here's what's involved:
        </p>
        <ol>
          <li><strong>File Form 2553</strong> with the IRS — this is the official S-Corp election form. To apply to the current year, it generally must be filed no more than 2 months and 15 days after the beginning of the tax year (for a new LLC, after it first has shareholders, acquires assets, or begins doing business).</li>
          <li><strong>Set up payroll</strong> — use a payroll service (Gusto, ADP, QuickBooks Payroll) to run your salary as an employee. This handles withholding, quarterly filings, and W-2 generation.</li>
          <li><strong>Work with a CPA</strong> — given the complexity, an S-Corp is rarely a DIY situation. A CPA can determine your reasonable salary, file Form 1120-S, and help you stay compliant year after year.</li>
        </ol>

        <div className="callout callout-action">
          <div className="callout-title">✅ The bottom line</div>
          <p>If your LLC is consistently netting more than $50,000 per year and you're planning to keep growing, an S-Corp election is worth a conversation with a CPA. The savings are real — but so are the requirements. Don't make this decision based on a general article alone; the right answer depends on your specific income, salary, and state.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

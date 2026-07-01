import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '02',
  title:         'What is an LLC, and do I need one?',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'deciding',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  cpaReviewed:   true,
  updatedDate:   'June 2026',
  taxYear:       '2025',
  confidence:    'General principles apply in most states; California and New York have additional fees and requirements',
  persona:       ['Self-employed', 'Freelancer', 'Small business owner', 'New entrepreneur'],
  relatedJourney: ['Starting a small business', 'First-time business owner'],
  actionRequired: 'Use the decision table below to assess if an LLC fits your situation. If yes, your two next steps are: choose a business name and confirm your state filing fee.',
}

const FAQS = [
  { q: 'How much does it cost to form an LLC?', a: 'State filing fees vary widely — from about $50 in Wyoming or New Mexico to $500+ in Massachusetts. California charges a $70 filing fee but also has an $800 annual minimum franchise tax, due every year regardless of income. Always check your state\'s Secretary of State website before deciding where to form.' },
  { q: 'Can a non-U.S. citizen or green card holder form an LLC?', a: 'Yes. There\'s no citizenship requirement to form an LLC in the U.S. Non-residents can also form a U.S. LLC. However, tax treatment for non-resident owners is more complex — you may face withholding requirements and additional filing obligations. Consult a CPA who specializes in international taxation.' },
  { q: 'Do I need an LLC if I\'m just starting out and not making much money?', a: 'Not necessarily. Operating as a sole proprietor is simpler and costs nothing. You can always form an LLC later when the business grows. The key question is whether the liability protection is worth the annual fees and compliance in your state right now.' },
  { q: 'What\'s the difference between a single-member LLC and a multi-member LLC?', a: 'A single-member LLC has one owner and is taxed as a sole proprietorship by default — income and expenses go on your personal return (Schedule C). A multi-member LLC has two or more owners and is taxed as a partnership by default, requiring a separate Form 1065. Both can elect S-Corp taxation.' },
  { q: 'If I form an LLC, do I still pay self-employment tax?', a: 'Yes. By default, LLC owners who work in the business pay self-employment tax (15.3%) on all net profits — the same as a sole proprietor. To reduce self-employment taxes, you would need to elect S-Corp taxation, which is generally worth considering once profits exceed roughly $40,000–$50,000 per year.' },
  { q: 'Does an LLC protect my personal home and savings if my business is sued?', a: 'Generally yes — that\'s the main purpose of an LLC. Two important exceptions: (1) if you personally guarantee a business loan, you\'re personally liable for that obligation; (2) if you mix personal and business finances, a court may "pierce the corporate veil" and disregard the protection. Keep separate bank accounts always.' },
  { q: 'I run an Airbnb. Should I put it in an LLC?', a: 'It depends. An LLC can protect personal assets if a guest is injured. However, in California, transferring a mortgaged property into an LLC can trigger a "due on sale" clause in your mortgage. An LLC also doesn\'t change how Airbnb income is taxed. Talk to a CPA and a real estate attorney before transferring property to an LLC.' },
]

const RELATED = [
  { href: '/library/business-formation/llc-vs-scorp', cat: 'Business Formation', title: 'LLC vs S-Corp: which is right for your business?', desc: 'Once you have an LLC, the next decision is whether to elect S-Corp taxation. Here\'s a clear comparison.' },
  { href: '/library/business-formation/ein', cat: 'Business Formation', title: 'How to apply for an EIN (step-by-step)', desc: 'An EIN is your business\'s tax ID number. You\'ll need it to open a business bank account and hire employees.' },
  { href: '/library/small-business/quarterly-taxes', cat: 'Small Business', title: 'Quarterly estimated taxes: who pays and how to calculate', desc: 'LLC owners pay estimated taxes four times a year. Here\'s what you owe and how to avoid penalties.' },
]

export default function LLCBasicsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{ title: 'What is an LLC and Do I Need One? | AskLinTax', description: 'A plain-language explanation of what an LLC is, what protection it offers, and whether it\'s right for your situation. Includes a decision guide and cost breakdown.' }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is an LLC, in plain language?</h2>
        <p>LLC stands for <strong>Limited Liability Company</strong>. It's a type of business structure you register with your state government that does one main thing: it creates a legal separation between you as a person and your business.</p>
        <p>Before the LLC existed, if something went wrong with your business — a lawsuit, a debt you couldn't pay — your personal assets (your home, savings, car) could be at risk. An LLC limits that risk. In most cases, if your business is sued, only the business's assets are at stake, not yours personally. That's where "limited liability" comes from.</p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 The simplest way to think about it</div>
          <p>An LLC is a legal "container" for your business. What happens inside the container — lawsuits, debts, contracts — stays inside and doesn't spill over onto you personally. As long as you treat the LLC as a genuinely separate entity from yourself.</p>
        </div>

        <h2>What does an LLC actually give you?</h2>

        <h3>1. Personal liability protection</h3>
        <p>If your business is sued, your personal assets are generally protected. The lawsuit is against the LLC, not you. This matters most if you're in a business where mistakes or accidents could lead to large claims: contractors, restaurant owners, landlords, consultants.</p>
        <p>Important caveat: this protection has limits. If you personally guarantee a loan, or if you mix personal and business finances, the protection can be weakened or lost entirely.</p>

        <h3>2. A separate, professional business identity</h3>
        <p>An LLC lets you open a business bank account in the company's name, sign contracts as the business, and present yourself more formally to clients. Many corporate clients and commercial landlords also require vendors to operate as a legal entity before working with them.</p>

        <div className="callout callout-info">
          <div className="callout-title">ℹ️ What an LLC does NOT do by default</div>
          <p>An LLC does not automatically reduce your taxes. By default, a single-owner LLC is taxed exactly like a sole proprietor — all business income is on your personal return and subject to self-employment tax. Tax savings require a separate decision: electing S-Corp taxation. That's covered in <a href="/library/business-formation/llc-vs-scorp">LLC vs S-Corp →</a></p>
        </div>

        <h2>How is an LLC taxed?</h2>
        <p>The LLC is a legal structure, not a tax category. The IRS treats LLCs based on how many owners they have and whether any special elections are made:</p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>LLC type</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Default tax treatment</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Can elect to be taxed as</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Single-member LLC (1 owner)', 'Sole proprietorship — Schedule C on your personal return', 'S-Corp or C-Corp'],
                ['Multi-member LLC (2+ owners)', 'Partnership — separate Form 1065 required', 'S-Corp or C-Corp'],
              ].map(([type, def, elect], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{type}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{def}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{elect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>For most small business owners, the practical implication is: <strong>an LLC doesn't change your tax bill on its own</strong>. You'll still pay self-employment tax on net profit. The main benefit is legal protection.</p>

        <h2>Do you need an LLC?</h2>
        <p>There's no universal answer. Here's a decision framework that covers most situations:</p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Your situation</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Just started, testing an idea, minimal income', '⏳ Wait — start as sole proprietor, form LLC when things grow'],
                ['Freelancer or consultant with steady clients', '✅ Probably yes — liability protection worth the annual fees'],
                ['Physical business (restaurant, retail, contractor)', '✅ Yes — accidents and disputes are more likely'],
                ['Landlord or Airbnb host', '🤔 Consult a CPA and real estate attorney first — property transfer has complications'],
                ['Business with a partner (2+ people)', '✅ Yes — clearly defines ownership and protects each partner'],
                ['High-revenue business (>$50K/year profit)', '✅ Yes — also consider S-Corp election for potential tax savings'],
              ].map(([sit, rec], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{sit}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How do you form an LLC?</h2>
        <p>Forming an LLC is simpler than most people expect. The basic process:</p>
        <ol>
          <li><strong>Choose a business name</strong> — must include "LLC" or "Limited Liability Company," and can't duplicate an existing business name in your state.</li>
          <li><strong>Choose your state</strong> — most small businesses form in the state where they operate. If you operate in California, you'll pay California fees regardless of where you form.</li>
          <li><strong>File Articles of Organization</strong> — the official form submitted to your state's Secretary of State, usually online. Fees range from $50–$500.</li>
          <li><strong>Create an Operating Agreement</strong> — not always legally required, but strongly recommended. It defines ownership percentages and what happens if a partner leaves.</li>
          <li><strong>Apply for an EIN</strong> — your business's tax ID number, free at IRS.gov, needed for a business bank account. <a href="/library/business-formation/ein">Full guide →</a></li>
          <li><strong>Open a separate business bank account</strong> — this is essential. Mixing personal and business money is the fastest way to lose your liability protection.</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ California-specific: the $800 minimum franchise tax</div>
          <p>California LLCs owe a minimum of $800 per year to the state — even if the business earned nothing. This fee is due every year you're in existence. Factor this into your decision about whether to form right away or wait until you have revenue.</p>
        </div>

        <h2>The most common LLC mistakes</h2>
        <ul>
          <li><strong>Mixing personal and business money</strong> — The single biggest mistake. Business income goes into the business account. Personal expenses never come from it. If you blur this line, a court can hold you personally liable despite the LLC.</li>
          <li><strong>Forgetting annual filing requirements</strong> — Most states require an annual report and fee. Missing this can get your LLC dissolved and remove all your protection.</li>
          <li><strong>No Operating Agreement</strong> — Even with one owner, an Operating Agreement documents how your business works. Essential if you ever add a partner or face a dispute.</li>
          <li><strong>Assuming the LLC handles your taxes</strong> — You still need to track income and expenses, pay quarterly estimated taxes, and file the correct forms. The LLC structure doesn't do this automatically.</li>
        </ul>

      </KnowledgePage>
    </Layout>
  )
}

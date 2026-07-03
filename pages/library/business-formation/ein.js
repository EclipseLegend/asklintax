import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'
import TAX_CONFIG from '../../../lib/tax-config'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '15',
  title:         'How to apply for an EIN: a step-by-step guide',
  category:      'Business Formation & Structure',
  categoryHref:  '/library/business-formation',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '4 min read',
  cpaReviewed:   true,
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'EIN application process is straightforward and well-documented by the IRS. International applicants (no SSN/ITIN) must apply by phone or fax rather than online.',
  persona:       ['New business owner', 'LLC owner', 'Freelancer opening a business account', 'Anyone starting a small business'],
  relatedJourney: ['Starting a small business', 'Just formed an LLC'],
  actionRequired: 'If you need an EIN, apply online at IRS.gov/ein right now — it takes about 15 minutes and your EIN is issued instantly. Have your SSN or ITIN and your entity type ready before you start.',
}

const FAQS = [
  {
    q: 'Is there a fee to apply for an EIN?',
    a: 'No. Applying for an EIN directly through the IRS is completely free at IRS.gov/ein. Be careful of third-party websites that charge fees to "help" you apply — they are not affiliated with the IRS and you do not need their services. The IRS application is straightforward and takes about 15 minutes.',
  },
  {
    q: 'Can I apply for an EIN without a Social Security Number?',
    a: 'Yes, but not online. International applicants and ITIN holders cannot use the online application. You can apply by phone by calling 267-941-1099 (not toll-free) Monday through Friday, 6am to 11pm Eastern time. Have your ITIN or foreign tax ID ready. You\'ll receive your EIN at the end of the call. Alternatively, you can apply by fax (Form SS-4) or mail, which takes longer.',
  },
  {
    q: 'I\'m a sole proprietor with no employees. Do I need an EIN?',
    a: 'Not always. Sole proprietors with no employees and no retirement plan can use their SSN as their tax ID. However, many business owners prefer to get an EIN anyway to: keep business and personal finances separate, avoid sharing their SSN with clients and vendors, open a business bank account (some banks require an EIN), and build a professional business identity. An EIN is free and takes 15 minutes — there\'s little reason not to get one.',
  },
  {
    q: 'I lost my EIN. How do I find it?',
    a: 'Check these places first: your original IRS confirmation letter (CP 575), any prior year business tax return, your business bank account paperwork, or any 1099 forms you\'ve received that show your EIN. If you can\'t find it, call the IRS Business & Specialty Tax Line at 800-829-4933 Monday–Friday 7am–7pm local time. They can look it up after verifying your identity.',
  },
  {
    q: 'Do I need a new EIN if I change my business name or address?',
    a: 'No. A name or address change does not require a new EIN. You can update your business name by checking the appropriate box on your next tax return, or by writing a letter to the IRS. Address changes can be made online at IRS.gov or on your next return. You only need a new EIN if your business structure fundamentally changes — for example, converting from a sole proprietorship to a corporation, or taking on new partners in a partnership.',
  },
  {
    q: 'Can I apply for an EIN for a business I haven\'t started yet?',
    a: 'Yes. You can apply for an EIN for a business that is not yet operating. Many people get their EIN when forming their LLC — even before they\'ve started making any money — so they can open a business bank account. You\'ll be asked what date you started or expect to start the business; you can enter a future date.',
  },
  {
    q: 'I have multiple businesses. Do I need a separate EIN for each?',
    a: 'It depends on the structure. Each separate legal entity (each LLC, each corporation) needs its own EIN. If you operate multiple businesses as a sole proprietor under your own name, you may be able to use a single EIN. However, if you have separate LLCs for different businesses, each LLC needs its own EIN. This is one reason why business structure decisions matter from the start.',
  },
]

const RELATED = [
  {
    href:  '/library/business-formation/llc-basics',
    cat:   'Business Formation',
    title: 'What is an LLC and do I need one?',
    desc:  'An EIN is one of the first things you need after forming an LLC. Start here if you haven\'t formed your LLC yet.',
  },
  {
    href:  '/library/business-formation/llc-vs-scorp',
    cat:   'Business Formation',
    title: 'LLC vs S-Corp: which is right for your business?',
    desc:  'Once you have your EIN, the next business structure decision is whether to elect S-Corp taxation.',
  },
  {
    href:  '/library/small-business/quarterly-taxes',
    cat:   'Small Business',
    title: 'Quarterly estimated taxes: who pays and how to calculate',
    desc:  'After getting your EIN and opening your business account, set up your quarterly tax payment system.',
  },
]

const STEPS = [
  {
    num:    '01',
    title:  'Go to the official IRS EIN application',
    detail: 'Navigate to IRS.gov/ein. This is the only official, free application. Do not use any other website — third-party sites charge fees for a service that is free directly from the IRS.',
    tip:    'Bookmark: https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
    color:  'var(--navy)',
  },
  {
    num:    '02',
    title:  'Click "Apply Online Now"',
    detail: 'The online application is available Monday–Friday, 7am to 10pm Eastern time. You must complete the entire application in one session — it cannot be saved and resumed. Set aside 15–20 minutes of uninterrupted time.',
    tip:    'The session times out after 15 minutes of inactivity, which would require starting over.',
    color:  'var(--navy)',
  },
  {
    num:    '03',
    title:  'Select your entity type',
    detail: 'Choose the type of business you\'re applying for. Most common options: Sole Proprietor (you personally, no LLC), LLC (if you\'ve already formed one), Corporation, Partnership. If you have an LLC, select "Limited Liability Company" even if it\'s a single-member LLC.',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '04',
    title:  'Answer questions about your business',
    detail: 'You\'ll be asked: why you\'re applying for an EIN (started a new business, opened a bank account, hired employees, etc.), the state where your business is located, whether you\'ve had an EIN before, and the date your business started or will start.',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '05',
    title:  'Enter your personal information',
    detail: 'You must provide the responsible party\'s name and Social Security Number or ITIN. The "responsible party" is the person who controls the entity — typically the sole owner for a single-member LLC. The IRS requires this to verify identity and prevent fraud.',
    tip:    'If you don\'t have an SSN or ITIN, you cannot use the online application. Call 267-941-1099 instead.',
    color:  '#DC2626',
  },
  {
    num:    '06',
    title:  'Review and submit',
    detail: 'Review all your information carefully. Once submitted, some information (like entity type) cannot easily be changed. Confirm your business name spelling matches your LLC formation documents exactly.',
    tip:    null,
    color:  'var(--navy)',
  },
  {
    num:    '07',
    title:  'Receive your EIN instantly',
    detail: 'After submitting, your EIN is issued immediately on screen. Download and save the confirmation page (CP 575) as a PDF. This is your official EIN assignment letter — you\'ll need it to open a business bank account, and it may be requested by clients, vendors, and financial institutions.',
    tip:    'Save the CP 575 PDF somewhere safe. If you lose it, recovery requires a phone call to the IRS.',
    color:  'var(--green)',
  },
]

const NEED_EIN = [
  { need: true,  situation: 'You formed an LLC or corporation' },
  { need: true,  situation: 'You want to open a business bank account' },
  { need: true,  situation: 'You have or plan to hire employees' },
  { need: true,  situation: 'You have a Keogh plan or solo 401(k)' },
  { need: true,  situation: 'You want to avoid sharing your SSN with clients' },
  { need: true,  situation: 'You have a partnership (multiple owners)' },
  { need: false, situation: 'Sole proprietor with no employees, no retirement plan, don\'t mind using your SSN' },
  { need: false, situation: 'You\'re getting a second EIN for the same entity (you only need one per entity)' },
]

export default function EINPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'How to Apply for an EIN: Step-by-Step Guide | AskLinTax',
      description: 'Apply for an EIN (Employer Identification Number) free in 15 minutes at IRS.gov. This guide walks through every step of the online application, who needs one, and what to do if you don\'t have an SSN.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>What is an EIN?</h2>
        <p>
          An EIN — Employer Identification Number — is a nine-digit number the IRS assigns to identify your business for tax purposes. Think of it as a Social Security Number for your business.
        </p>
        <p>
          Despite the name, you don't need employees to get an EIN. Single-person businesses, solo LLCs, and freelancers all commonly use EINs — primarily to open a business bank account, avoid sharing their personal SSN, and establish a separate business identity.
        </p>

        <div style={{ background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', margin: '28px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', fontWeight: '500' }}>Social Security Number</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'monospace', letterSpacing: '.05em' }}>XXX-XX-1234</div>
              <div style={{ fontSize: '13px', color: 'var(--light)', marginTop: '6px' }}>Identifies you as a person</div>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'var(--gold)', fontWeight: '400' }}>→</div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', fontWeight: '500' }}>Employer Identification Number</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'monospace', letterSpacing: '.05em' }}>XX-XXXXXXX</div>
              <div style={{ fontSize: '13px', color: 'var(--light)', marginTop: '6px' }}>Identifies your business entity</div>
            </div>
          </div>
        </div>

        <h2>Do you need an EIN?</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '24px 0' }}>
          {NEED_EIN.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 18px', background: item.need ? 'var(--green-soft)' : 'var(--cream)', border: `1px solid ${item.need ? 'rgba(22,163,74,.2)' : 'var(--border-l)'}`, borderRadius: '10px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.need ? '✅' : '⏭'}</span>
              <span style={{ fontSize: '15.5px', color: 'var(--mid)' }}>{item.situation}</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '600', color: item.need ? 'var(--green)' : 'var(--muted)', flexShrink: 0 }}>{item.need ? 'Get an EIN' : 'Optional'}</span>
            </div>
          ))}
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 When in doubt, just get one</div>
          <p>An EIN is free and takes 15 minutes. Even if you technically don't need one today, getting an EIN now means you won't have to do it later when you're also trying to open a bank account or sign a contract. There's no reason not to have one.</p>
        </div>

        <h2>Step-by-step: how to apply online</h2>
        <p>
          The online application at IRS.gov is the fastest and simplest method. You'll receive your EIN immediately upon completion.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '28px 0', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0', borderBottom: i < STEPS.length - 1 ? '1px solid var(--border-l)' : 'none', background: i === STEPS.length - 1 ? 'var(--green-soft)' : i % 2 === 0 ? 'var(--white)' : 'var(--cream)' }}>
              {/* Number */}
              <div style={{ minWidth: '64px', padding: '18px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', borderRight: '1px solid var(--border-l)', paddingTop: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{step.num}</span>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: step.color === 'var(--green)' ? 'var(--green)' : 'var(--navy)', marginBottom: '6px' }}>{step.title}</div>
                <div style={{ fontSize: '14.5px', color: 'var(--mid)', lineHeight: '1.72', marginBottom: step.tip ? '10px' : '0' }}>{step.detail}</div>
                {step.tip && (
                  <div style={{ fontSize: '13.5px', color: step.color === '#DC2626' ? '#991b1b' : 'var(--muted)', background: step.color === '#DC2626' ? 'var(--red-soft)' : 'rgba(27,45,79,.05)', padding: '8px 12px', borderRadius: '8px', borderLeft: `3px solid ${step.color}` }}>
                    {step.color === '#DC2626' ? '⚠️ ' : '💡 '}{step.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2>Alternative application methods</h2>
        <p>
          If you can't use the online application (no SSN, browser issues, or preference), two other methods are available:
        </p>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Method</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>How</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Processing time</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Online (recommended)', 'IRS.gov/ein — Monday–Friday 7am–10pm ET', 'Instant', 'U.S. residents with SSN or ITIN'],
                ['Phone', 'Call 267-941-1099 — Monday–Friday 6am–11pm ET', 'Instant (EIN given on call)', 'International applicants without SSN/ITIN'],
                ['Fax', 'Complete Form SS-4, fax to your state\'s IRS fax number', '4 business days', 'Those who prefer paper'],
                ['Mail', 'Complete Form SS-4, mail to the IRS address for your state', '4–5 weeks', 'Last resort only'],
              ].map(([method, how, time, best], i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: '500', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{method}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{how}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', fontWeight: i === 0 ? '600' : '400', color: i === 0 ? 'var(--green)' : 'var(--mid)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{time}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-l)', color: 'var(--muted)', background: i % 2 === 1 ? 'var(--cream)' : 'white' }}>{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>What to do after you get your EIN</h2>
        <ol>
          <li><strong>Save your CP 575 letter</strong> — Download and keep the PDF confirmation. This is your official EIN assignment from the IRS. Banks, vendors, and government agencies may ask to see it.</li>
          <li><strong>Open a business bank account</strong> — Bring your EIN, your LLC formation documents (if applicable), and a government-issued ID. Most major banks can open a business account the same day.</li>
          <li><strong>Update your W-9 if you're a contractor</strong> — Your W-9 form for clients should use your EIN rather than your personal SSN. This protects your SSN from being shared unnecessarily.</li>
          <li><strong>Set up accounting software</strong> — Enter your EIN into QuickBooks, FreshBooks, or whichever software you use. It will appear on invoices and tax documents.</li>
        </ol>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Beware of EIN scam websites</div>
          <p>Many websites charge $50–$300 to "help" you apply for an EIN. These websites are not affiliated with the IRS. The IRS application is free at IRS.gov/ein and takes 15 minutes. If you're on a website asking for payment to apply for an EIN, you're on the wrong site.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

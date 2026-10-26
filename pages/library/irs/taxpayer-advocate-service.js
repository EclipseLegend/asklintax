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
  id:            '118',
  title:         'Taxpayer Advocate Service: When and How to Get Help',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   'October 2026',
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Explains who the Taxpayer Advocate Service (TAS) helps and how to ask for help, based on Form 911 and its instructions (Rev. June 2026), Publication 1546 (Rev. June 2022), Publication 1 (Taxpayer Bill of Rights), and IRM 13.1.20 on Taxpayer Assistance Orders. The TAS website itself could not be checked for this guide, so office locations and the online qualifier tool are not described',
  persona:       ['People whose IRS problem is causing financial hardship', 'Taxpayers whose refund or case has been stuck for a long time', 'People facing an immediate IRS collection action', 'Anyone who cannot get a response from the IRS'],
  relatedJourney: ['Dealing with a tax problem', 'Got an IRS letter'],
  actionRequired: 'Try to resolve the issue with the IRS first. If the problem is causing financial difficulty, an immediate threat of adverse action, or repeated IRS delays, submit Form 911 or call TAS at 877-777-4778. Keep meeting every IRS deadline — a Form 911 request does not suspend Tax Court or Collection Due Process deadlines.',
  sources: [
    { label: 'IRS — Form 911 (Rev. June 2026), Request for Taxpayer Advocate Service Assistance (and Application for Taxpayer Assistance Order)', url: 'https://www.irs.gov/pub/irs-pdf/f911.pdf' },
    { label: 'IRS — Publication 1546 (Rev. June 2022), The Taxpayer Advocate Service Is Your Voice at the IRS', url: 'https://www.irs.gov/pub/irs-pdf/p1546.pdf' },
    { label: 'IRS — Publication 1, Your Rights as a Taxpayer', url: 'https://www.irs.gov/pub/irs-pdf/p1.pdf' },
    { label: 'IRS — Internal Revenue Manual 13.1.20, Taxpayer Assistance Orders', url: 'https://www.irs.gov/irm/part13/irm_13-001-020' },
  ],
}

const FAQS = [
  {
    q: 'What is the Taxpayer Advocate Service?',
    a: 'TAS is an independent organization within the IRS that helps taxpayers resolve problems they have not been able to solve with the IRS on their own, protects taxpayer rights, and recommends administrative and legislative changes. Each local office keeps its own phone, fax, and mailing address separate from other IRS offices.',
  },
  {
    q: 'Does TAS cost anything?',
    a: 'No. Form 911 says that if you qualify for TAS assistance, it is always free.',
  },
  {
    q: 'Will TAS accept every request?',
    a: 'No. TAS generally helps when the problem is causing financial difficulty, you face an immediate threat of adverse action, the IRS has not responded after repeated contacts or by the promised date, or an IRS process is not working as intended. TAS will let you know whether your request has been accepted.',
  },
  {
    q: 'Does filing Form 911 stop IRS deadlines?',
    a: 'No. The Form 911 instructions say the request does not suspend any applicable periods, such as the time to petition the Tax Court after a notice of deficiency or to request a Collection Due Process hearing. File those on time even while TAS is helping you.',
  },
  {
    q: 'What if I hear nothing after sending Form 911?',
    a: 'If you do not receive a response within 30 days, email the same TAS Form 911 address listed below, with "No Response" in the subject line. Do not send multiple Forms 911 for the same issue — that can delay processing.',
  },
  {
    q: 'Can TAS decide how much tax I owe?',
    a: 'No. TAS works with the IRS on your behalf, but even a Taxpayer Assistance Order cannot make a substantive determination of your tax liability. If you want someone to represent you in a dispute, you can use an attorney, CPA, or enrolled agent, or a Low Income Taxpayer Clinic if you qualify.',
  },
]

const RELATED = [
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'First steps after any IRS notice.',
  },
  {
    href: '/library/irs/irs-power-of-attorney-2848-8821',
    cat:  'IRS & Tax Issues',
    title: 'IRS Power of Attorney: Form 2848 vs. Form 8821',
    desc:  'Letting someone deal with TAS or the IRS for you.',
  },
  {
    href: '/library/irs/irs-tax-liens-levies',
    cat:  'IRS & Tax Issues',
    title: 'IRS Tax Liens, Levies, and Collection Appeals',
    desc:  'Collection actions and your appeal rights.',
  },
  {
    href: '/library/irs/irs-appeals-process',
    cat:  'IRS & Tax Issues',
    title: 'IRS Appeals: How to Dispute an Audit or IRS Decision',
    desc:  'When you disagree with the IRS on the tax itself.',
  },
]

export default function TaxpayerAdvocateServicePage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Taxpayer Advocate Service: When and How to Get Help | AskLinTax',
      description: 'When the Taxpayer Advocate Service can help: financial hardship, immediate threats, IRS delays, and broken processes. How to submit Form 911, what a Taxpayer Assistance Order is, and why TAS does not pause IRS deadlines.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          The <strong>Taxpayer Advocate Service (TAS)</strong> is an independent office inside the IRS that helps people whose tax problems have not been solved through normal IRS channels. Its help is free if you qualify. You ask for help with <strong>Form 911</strong> or by calling <strong>877-777-4778</strong>. TAS does not accept every request, and asking for help <strong>does not pause any IRS deadline</strong>.
        </p>

        <h2>Who TAS generally helps</h2>
        <ArticleTable
          head={['Situation', 'Example']}
          rows={[
            ['Financial difficulty', 'An IRS problem is causing financial difficulty for you, your family, or your business'],
            ['Immediate threat of adverse action', 'You or your business face an imminent IRS action, such as a levy'],
            ['No response or delay', 'You have repeatedly contacted the IRS and no one responded, or the IRS did not respond by the date it promised'],
            ['A process not working', 'An IRS process, system, or procedure is not operating as intended, so the IRS fails to respond or resolve your issue on time'],
          ]}
        />
        <p>
          TAS helps individuals, businesses, and exempt organizations, as well as their representatives. Meeting one of these situations does not guarantee that TAS will take your case.
        </p>

        <h2>How to ask for help with Form 911</h2>
        <ul>
          <li><strong>Describe the problem</strong> and any hardship it causes, what the IRS has done or not done, and the relief you want. If the IRS has delayed more than 30 days, give the date you first contacted it.</li>
          <li><strong>Attach documents</strong> that may help — this can speed up resolution.</li>
          <li><strong>Send it</strong> by email to <span style={{ overflowWrap: 'anywhere' }}>tas.form.911.request.for.assistance@irs.gov</span>, by fax to (855) 828-2723 (from overseas, 1-304-707-9793), or by mail to 7940 Kentucky Dr, MS 11 G, Florence, KY 41042. Email submissions are not encrypted.</li>
          <li><strong>Joint requests</strong> must be signed by both spouses. A representative attaches Form 2848, Form 8821, or another power of attorney and signs instead of the taxpayer.</li>
          <li><strong>Wait 30 days</strong> before following up by email with "No Response" in the subject line; do not file a second Form 911 for the same issue.</li>
        </ul>

        <h2>What happens next</h2>
        <ul>
          <li>TAS tells you whether your request has been accepted.</li>
          <li>If accepted, a case advocate works with the IRS on your behalf, gives you timeframes and updates, and stays with you until the problem is resolved.</li>
          <li>To help you, TAS may need to share your information with IRS employees.</li>
        </ul>

        <h2>Taxpayer Assistance Orders</h2>
        <p>
          Form 911 is also an application for a <strong>Taxpayer Assistance Order (TAO)</strong>. Under the Internal Revenue Manual, TAS may issue a TAO when you are suffering or about to suffer a significant hardship because of how the IRS is administering the tax law, the facts and the law support relief, and the IRS refuses or fails to take the action needed. A TAO can order the IRS to take an action allowed by law, stop or refrain from an action, expedite your case, reconsider a determination, or review it at a higher level. It cannot decide the amount of tax you owe.
        </p>

        <h2>Systemic problems</h2>
        <p>
          If an IRS problem affects many taxpayers, you can report it to TAS at IRS.gov/sams. Do not include personal information in a systemic report — it is not a request for help with your own case.
        </p>

        <h2>Other help</h2>
        <ul>
          <li><strong>Low Income Taxpayer Clinics (LITCs)</strong> are independent from the IRS and may be able to represent you in a dispute with the IRS if you qualify, and help people who speak English as a second language. See Publication 4134.</li>
          <li><strong>The Taxpayer Bill of Rights</strong> (Publication 1) lists ten rights, including the right to be informed, the right to quality service, the right to challenge the IRS's position and be heard, and the right to appeal an IRS decision in an independent forum.</li>
        </ul>

        <h2>What TAS cannot do</h2>
        <ul>
          <li><strong>Pause deadlines:</strong> a Form 911 request does not extend the time to petition the Tax Court, request a Collection Due Process hearing, or take any other required step.</li>
          <li><strong>Guarantee acceptance or a result:</strong> TAS decides whether you qualify, and the IRS still applies the tax law.</li>
          <li><strong>Decide your tax liability</strong> — even a Taxpayer Assistance Order cannot do that.</li>
          <li><strong>Consider frivolous arguments</strong> — raising them on Form 911 can bring a $5,000 penalty.</li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Keep your own deadlines</div>
          <p>If you have a notice of deficiency, a levy notice, or a lien notice, file your Tax Court petition or hearing request on time even if TAS is already helping you. TAS assistance runs alongside those rights; it does not replace them.</p>
        </div>

      </KnowledgePage>
    </Layout>
  )
}

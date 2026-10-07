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
  id:            '52',
  title:         'I made a mistake on my tax return — how do I amend it?',
  category:      'IRS & Tax Issues',
  categoryHref:  '/library/irs',
  userEmotion:   'anxious',
  difficulty:    'Beginner',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers correcting a previously filed federal individual return (Form 1040, 1040-SR, or 1040-NR) with Form 1040-X. Special refund-claim rules, state returns, and changes made in response to an IRS examination are outside this guide',
  persona:       ['People who found a mistake after filing', 'Taxpayers who received a corrected or late W-2 or 1099', 'Anyone who forgot a credit or a dependent', 'People who chose the wrong filing status'],
  relatedJourney: ['Dealing with a tax problem', 'First-time filer'],
  actionRequired: 'Decide whether the mistake actually changes your return. If it changes your filing status, income, deductions, credits, dependents, or tax, file Form 1040-X — one for each tax year you are correcting — and watch the time limit if you are claiming a refund.',
  sources: [
    { label: 'IRS — Instructions for Form 1040-X', url: 'https://www.irs.gov/instructions/i1040x' },
    { label: 'IRS — File an amended return', url: 'https://www.irs.gov/filing/file-an-amended-return' },
    { label: 'IRS — Amended return frequently asked questions', url: 'https://www.irs.gov/filing/amended-return-frequently-asked-questions' },
    { label: 'IRS — About Form 1040-X, Amended U.S. Individual Income Tax Return', url: 'https://www.irs.gov/forms-pubs/about-form-1040x' },
    { label: 'IRS — Where\'s My Amended Return?', url: 'https://www.irs.gov/filing/wheres-my-amended-return' },
  ],
}

const FAQS = [
  {
    q: 'I made a math error. Do I need to amend?',
    a: 'Often not. The IRS may correct math errors when it processes your return, and if a required form or schedule is missing it may ask you for it. An amended return is for changes such as your filing status, income, deductions, credits, dependents, or tax liability.',
  },
  {
    q: 'I need to fix two different years. Can I use one form?',
    a: 'No. File a separate Form 1040-X for each tax year you are amending.',
  },
  {
    q: 'How long do I have to amend for a refund?',
    a: 'To claim a credit or refund, you generally must file Form 1040-X within 3 years after the date you filed your original return or within 2 years after the date you paid the tax, whichever is later. Special rules and exceptions can apply, so check the Form 1040-X instructions for your situation.',
  },
  {
    q: 'Will amending mean I owe more?',
    a: 'It depends on the correction. An amended return can result in an additional refund, additional tax due, or no change in tax. If you owe more, paying it promptly limits further interest and penalties.',
  },
  {
    q: 'I received a CP2000 notice. Should I file a 1040-X instead of responding?',
    a: 'A CP2000 has its own response process. Follow the instructions in the notice rather than assuming an amended return is the right answer. See "CP2000 notice: what it means and how to respond."',
  },
]

const RELATED = [
  {
    href: '/library/irs/cp2000',
    cat:  'IRS & Tax Issues',
    title: 'CP2000 notice: what it means and how to respond',
    desc:  'If the IRS has already found a mismatch, respond to the notice.',
  },
  {
    href: '/library/irs/irs-notice',
    cat:  'IRS & Tax Issues',
    title: 'I received an IRS letter. What do I do?',
    desc:  'How to read any IRS letter before deciding what to file.',
  },
  {
    href: '/library/individual/what-is-w2',
    cat:  'Individuals & Families',
    title: 'What is a W-2 and how do I read it?',
    desc:  'A corrected or late W-2 is a common reason to amend.',
  },
]

export default function AmendTaxReturnPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'How to Amend a Tax Return: Form 1040-X Explained | AskLinTax',
      description: 'Found a mistake after filing? When you need Form 1040-X, which mistakes the IRS may fix on its own, the time limit for refund claims, and what happens next.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          If you already filed your federal return and later find a mistake that changes it, you generally correct it with <strong>Form 1040-X</strong>, Amended U.S. Individual Income Tax Return. Form 1040-X is used to amend a previously filed Form 1040, 1040-SR, or 1040-NR. Not every mistake needs one, and an amended return can mean a bigger refund, more tax due, or no change at all.
        </p>

        <h2>When an amended return is usually needed</h2>
        <p>
          Common reasons to file Form 1040-X are changes to your:
        </p>
        <ul>
          <li><strong>Filing status</strong> — for example, you filed as single but qualified for a different status</li>
          <li><strong>Income</strong> — for example, a corrected or late W-2 or 1099 arrived after you filed</li>
          <li><strong>Deductions</strong> you claimed or missed</li>
          <li><strong>Credits</strong> — for example, a credit you forgot to claim</li>
          <li><strong>Dependents</strong> you added or removed</li>
          <li><strong>Tax liability</strong> in general</li>
        </ul>

        <h2>When you may not need to amend</h2>
        <p>
          The IRS may correct some errors itself. A simple <strong>math error</strong> is often fixed when the return is processed, and if a required form or schedule was left out, the IRS may contact you to ask for it. In those cases, wait for the IRS rather than filing an amended return for the same issue.
        </p>

        <ArticleTable
          head={['Situation', 'Usual next step']}
          rows={[
            ['Addition or other math error', 'The IRS may correct it during processing'],
            ['Missing schedule or form', 'The IRS may ask you for it separately'],
            ['Wrong filing status, missed income, deduction, credit, or dependent', 'File Form 1040-X'],
            ['You received an IRS notice proposing changes', 'Follow the notice instructions first'],
          ]}
        />

        <h2>How to amend</h2>
        <ol>
          <li><strong>Gather the original return</strong> and the documents behind the correction.</li>
          <li><strong>Complete Form 1040-X</strong>, showing the original amounts, the changes, and the corrected amounts, with an explanation of each change. Attach any forms or schedules the instructions require.</li>
          <li><strong>One form per year.</strong> If you are correcting more than one tax year, file a separate Form 1040-X for each year.</li>
          <li><strong>File it</strong> electronically with tax software where available, or on paper as the instructions describe.</li>
          <li><strong>Pay any additional tax</strong> as soon as you can to limit interest and penalties.</li>
          <li><strong>Track it</strong> with the IRS Where's My Amended Return? tool.</li>
        </ol>

        <h2>The time limit for refund claims</h2>
        <p>
          If the amended return claims a <strong>credit or refund</strong>, there is a deadline. Generally, you must file Form 1040-X within <strong>3 years</strong> after the date you filed the original return or within <strong>2 years</strong> after the date you paid the tax, <strong>whichever is later</strong>. Special rules and exceptions can apply to certain situations — check the Form 1040-X instructions.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Don't wait if you owe more</div>
          <p>If your correction increases your tax, the time limit above is not a reason to delay. Interest can accrue on unpaid tax, so amending and paying sooner keeps the cost down.</p>
        </div>

        <h2>Example</h2>
        <p>
          After filing his 2025 return, Leo receives a second 1099 for $1,200 of freelance income he forgot to include. That changes his income, so he files a Form 1040-X for 2025 showing the added income and the resulting change in tax, and pays the additional amount. If he had also found an error on his 2024 return, he would file a separate Form 1040-X for 2024.
        </p>

        <h2>Amending is not the same as responding to the IRS</h2>
        <p>
          If the IRS has already sent you a notice about the same issue — such as a <a href="/library/irs/cp2000/">CP2000</a> — follow the notice's instructions. For any other letter, start with <a href="/library/irs/irs-notice/">I received an IRS letter</a>.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

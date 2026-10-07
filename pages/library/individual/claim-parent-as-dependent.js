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
  id:            '59',
  title:         'Can I claim my parents as dependents if they live abroad?',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'deciding',
  difficulty:    'Intermediate',
  readTime:      '5 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers whether a U.S. taxpayer can claim a parent as a qualifying relative, with a focus on parents living outside the U.S. The gross income figure is for tax year 2025. Head of household status and dependent-related credits have separate rules that this guide does not decide',
  persona:       ['Adult children who send money to parents in Taiwan or China', 'People whose parents live with them in the U.S. part of the year', 'Siblings who share the cost of supporting a parent', 'Immigrants supporting family abroad'],
  relatedJourney: ['Filing with dependents', 'Cross-border finances'],
  actionRequired: 'Check the citizen or resident test first. A parent who is not a U.S. citizen, U.S. resident alien, or U.S. national — and not a resident of Canada or Mexico — generally cannot be claimed, no matter how much support you provide. Only if that test is met do the support, income, and other qualifying-relative tests matter.',
  sources: [
    { label: 'IRS — Publication 501 (2025), Dependents, Standard Deduction, and Filing Information', url: 'https://www.irs.gov/publications/p501' },
  ],
}

const FAQS = [
  {
    q: 'I send my parents in Taiwan more than half of what they live on. Can I claim them?',
    a: 'Not on that basis alone. Support is only one test. A dependent generally must be a U.S. citizen, U.S. resident alien, U.S. national, or a resident of Canada or Mexico. A parent living in Taiwan who is none of these generally fails that test, however much you send.',
  },
  {
    q: 'Does my parent have to live with me?',
    a: 'No. A parent can be a qualifying relative without living in your household, because a parent meets the relationship test. But every other test — including the citizen or resident test — still has to be met.',
  },
  {
    q: 'My parent is a U.S. green card holder living with me. What else is required?',
    a: 'If your parent meets the citizen or resident test, the qualifying-relative tests still apply. For tax year 2025, Publication 501 says the person\'s gross income generally must be less than $5,200, and you generally must provide more than half of their total support for the year. The other dependency tests also apply.',
  },
  {
    q: 'My siblings and I share the cost of supporting our mother. Who claims her?',
    a: 'If no one person provides more than half of her support but the group does, a multiple support agreement may allow one of you to claim her, if the conditions in Publication 501 are met.',
  },
  {
    q: 'If I can claim my parent, do I automatically get head of household status or a credit?',
    a: 'No. Head of household status has its own tests, and each dependent-related credit has its own eligibility rules. Being able to claim someone as a dependent does not by itself guarantee either.',
  },
]

const RELATED = [
  {
    href: '/library/individual/child-tax-credit',
    cat:  'Individuals & Families',
    title: 'Child Tax Credit: who qualifies and how to claim it',
    desc:  'Rules for children — a different set of tests.',
  },
  {
    href: '/library/individual/do-i-need-to-file',
    cat:  'Individuals & Families',
    title: 'Do I need to file a U.S. tax return?',
    desc:  'Filing status and dependents both affect your return.',
  },
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'Money moving between you and parents abroad has its own rules.',
  },
]

export default function ClaimParentAsDependentPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Can I Claim My Parents as Dependents If They Live Abroad? | AskLinTax',
      description: 'Supporting parents in Taiwan, China, or elsewhere? Why the citizen or resident test usually decides the answer, and the qualifying-relative tests — support, gross income, and more — when it is met.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The short answer</h2>
        <p>
          Usually <strong>not</strong>, if your parent lives abroad and is not a U.S. citizen, U.S. resident alien, or U.S. national. A parent <em>can</em> be a qualifying relative — and does not have to live with you just because they are your parent — but there is a separate <strong>citizen or resident test</strong>. Supporting a parent who lives in Taiwan, China, or another country does <strong>not</strong>, by itself, make that parent your U.S. dependent.
        </p>

        <h2>Test 1: the citizen or resident test comes first</h2>
        <p>
          Under Publication 501, you generally cannot claim a person as a dependent unless that person is:
        </p>
        <ul>
          <li>a U.S. citizen,</li>
          <li>a U.S. resident alien,</li>
          <li>a U.S. national, or</li>
          <li>a resident of Canada or Mexico,</li>
        </ul>
        <p>
          subject to the IRS rules and exceptions in Publication 501. A parent living in Taiwan who is not a U.S. citizen, U.S. resident alien, or U.S. national generally fails this test — even if you provide all of their support.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Support alone does not make someone a dependent</div>
          <p>"I pay more than half of my parents' living expenses, so I can claim them" is a common mistake. Support is only one of several tests, and it does not matter if the citizen or resident test is not met.</p>
        </div>

        <h2>Test 2: if that test is met, the qualifying-relative tests apply</h2>
        <ArticleTable
          head={['Test', 'For a parent (tax year 2025, per Publication 501)']}
          rows={[
            ['Relationship', 'A parent meets it — they do not have to live with you'],
            ['Not a qualifying child', 'The parent cannot be your (or anyone else\'s) qualifying child'],
            ['Gross income', 'Generally less than $5,200 for 2025'],
            ['Support', 'You generally must provide more than half of their total support for the year'],
            ['Joint return', 'Generally, the person cannot file a joint return, with limited exceptions'],
          ]}
        />
        <p>
          The other general dependency rules in Publication 501 also apply.
        </p>

        <h2>When several people share the support</h2>
        <p>
          If no single person provides more than half of a parent's support, but a group — such as siblings — does together, a <strong>multiple support agreement</strong> may allow one member of the group to claim the parent, if the conditions in Publication 501 are met.
        </p>

        <h2>Three separate questions</h2>
        <ArticleTable
          head={['Question', 'Why it is separate']}
          rows={[
            ['Can I claim my parent as a dependent?', 'Decided by the dependency tests above'],
            ['Do I qualify for head of household?', 'Head of household has its own tests; a dependent parent does not automatically qualify you'],
            ['Do I get a credit?', 'Each dependent-related credit has its own eligibility rules; dependency alone does not guarantee one'],
          ]}
        />

        <h2>Examples</h2>
        <p>
          <strong>Parent abroad.</strong> Jie sends his mother in Taipei money every month that covers most of her living costs. His mother is a Taiwan citizen who has never lived in the U.S. She is not a U.S. citizen, resident alien, or national, and not a resident of Canada or Mexico, so she generally fails the citizen or resident test — Jie generally cannot claim her, regardless of how much support he provides.
        </p>
        <p>
          <strong>Parent who is a U.S. resident.</strong> Lan's father is a green card holder living in the U.S. with little income. Because he can meet the citizen or resident test, Lan then checks the qualifying-relative tests for 2025 — including whether his gross income was under $5,200 and whether she provided more than half of his support.
        </p>

        <p>
          Money you send to family abroad is a separate topic from dependency. For gifts between family members across borders, see <a href="/library/investment/foreign-gifts/">Foreign gifts</a>.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

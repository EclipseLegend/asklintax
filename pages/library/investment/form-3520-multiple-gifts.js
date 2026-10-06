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
  id:            '32',
  title:         'Multiple foreign gifts: how does the $100,000 Form 3520 threshold work?',
  category:      'Investments & Foreign Accounts',
  categoryHref:  '/library/investment',
  userEmotion:   'learning',
  difficulty:    'Intermediate',
  readTime:      '6 min read',
  verification:  'official-sources-verified',
  updatedDate:   TAX_CONFIG.lastReviewed,
  taxYear:       String(TAX_CONFIG.currentTaxYear),
  confidence:    'Covers how U.S. citizens and resident aliens add up gifts and bequests from nonresident alien individuals and foreign estates for the Form 3520 Part IV threshold. Gifts from foreign corporations or partnerships use a separate, lower threshold, and foreign trust distributions are reported elsewhere on the form',
  persona:       ['People receiving several transfers a year from family abroad', 'Anyone receiving money from both parents, grandparents, or siblings overseas', 'People whose parents send money through a relative or a company', 'Tax preparers checking a client\'s Form 3520 requirement'],
  relatedJourney: ['Cross-border finances'],
  actionRequired: 'List every gift and bequest you received this year from foreign persons, group together the donors who are related to each other (or acting for each other), and add up each group. If any group totals more than $100,000, Form 3520 Part IV is required.',
  sources: [
    { label: 'IRS — Instructions for Form 3520 (Rev. December 2025), Part IV and the $100,000 aggregation rule', url: 'https://www.irs.gov/instructions/i3520' },
    { label: 'IRS — Gifts from foreign person', url: 'https://www.irs.gov/businesses/gifts-from-foreign-person' },
    { label: 'IRS — Form 3520 (Rev. December 2023)', url: 'https://www.irs.gov/pub/irs-pdf/f3520.pdf' },
    { label: 'IRS — Internal Revenue Bulletin 2024-24, proposed regulations: proposed §1.6039F-1(c)(2)(i)(B) (aggregation of gifts from related persons)', url: 'https://www.irs.gov/pub/irs-irbs/irb24-24.pdf' },
  ],
}

const FAQS = [
  {
    q: 'My parents send me $9,000 every month. None of the transfers is large. Do I still need Form 3520?',
    a: 'Yes, if the transfers come from one parent, or from parents you know are related to each other: 12 × $9,000 is $108,000 — more than $100,000 in one year. The size of each transfer does not matter for the threshold. And because each $9,000 transfer is over $5,000, each one is listed separately on line 54.',
  },
  {
    q: 'If I ask my parents to send $99,000 this year and the rest next year, is that allowed?',
    a: 'Gifts are counted in the year you receive them, so genuinely receiving money in two different years is counted in two different years. What does not work is splitting one year\'s money among relatives or intermediaries: gifts from related persons and from someone acting for another are added together. Plan around real timing, not around disguising who the gift is from.',
  },
  {
    q: 'My grandmother and my uncle each sent me $60,000. Are they added together?',
    a: 'The IRS rule asks whether you know, or have reason to know, that the donors are related to each other (or that one is acting for the other). If you know your uncle is your grandmother\'s son, the careful approach is to treat them as related donors and combine their gifts ($120,000). If you are unsure whether particular relatives count as related for this rule, have it reviewed.',
  },
  {
    q: 'Two unrelated family friends abroad each gave me $70,000. Do I file?',
    a: 'Gifts from foreign persons who are not related to each other, and are not acting for each other, are not combined. If neither friend\'s own total is over $100,000, Part IV is not triggered by these gifts. Keep records of why you believe they are unrelated and independent.',
  },
  {
    q: 'My father sent part of the money through his Taiwan company. How is that counted?',
    a: 'A purported gift from a foreign corporation or foreign partnership has its own, much lower annual threshold and is reported on line 55, not line 54. The IRS may also treat such a "gift" as taxable income. What you know about who owns the company also matters for how the gifts are counted. Get professional advice for any gift that comes from a business.',
  },
  {
    q: 'Do gifts in kind, like jewelry or shares, count toward the $100,000?',
    a: 'Yes. Gifts of property count at their fair market value. Line 54 asks for a description and the fair market value of each gift over $5,000.',
  },
]

const RELATED = [
  {
    href: '/library/investment/foreign-gifts',
    cat:  'Investments & Foreign Accounts',
    title: 'Foreign gifts: is money from parents overseas taxable?',
    desc:  'The foundation guide to foreign gifts, taxability, and Form 3520.',
  },
  {
    href: '/library/investment/foreign-gift-over-100000',
    cat:  'Investments & Foreign Accounts',
    title: 'Parents overseas sent me more than $100,000 — do I need Form 3520?',
    desc:  'The direct answer for a single large gift from parents abroad.',
  },
  {
    href: '/library/investment/form-3520-married-couples',
    cat:  'Investments & Foreign Accounts',
    title: 'My spouse and I received money from overseas parents — how does Form 3520 work?',
    desc:  'When gifts go to a married couple, whose gift is it?',
  },
  {
    href: '/library/investment/form-3520',
    cat:  'Investments & Foreign Accounts',
    title: 'Form 3520: reporting large foreign gifts',
    desc:  'How to complete Part IV, the due dates, and where to file.',
  },
]

export default function Form3520MultipleGiftsPage({ translations }) {
  const { t } = useTranslation(translations.common)
  const [openFaq, setOpenFaq] = useState({})
  function toggleFaq(i) { setOpenFaq(p => ({ ...p, [i]: !p[i] })) }

  return (
    <Layout t={t} meta={{
      title: 'Multiple Foreign Gifts and the $100,000 Form 3520 Threshold | AskLinTax',
      description: 'Several transfers from parents, grandparents, or relatives abroad? How gifts are added up for Form 3520 Part IV: annual totals, related donors, intermediaries, and why splitting transfers does not avoid reporting.',
    }}>
      <KnowledgePage meta={META} faqs={FAQS} openFaq={openFaq} toggleFaq={toggleFaq} relatedArticles={RELATED}>

        <h2>The direct answer</h2>
        <p>
          The $100,000 Form 3520 threshold is an <strong>annual total</strong>, not a per-transfer limit. For each tax year, you add up every gift and bequest you received from a nonresident alien individual or foreign estate, <strong>together with</strong> gifts from foreign persons related to them. If that combined amount is more than $100,000, you file Form 3520 Part IV.
        </p>
        <p>
          That means many small transfers can add up to a reporting requirement, and splitting money between givers who are related to each other — or routing it through another relative acting for them — does not, by itself, keep you under the threshold.
        </p>

        <h2>The three counting rules</h2>
        <ArticleTable
          head={['Rule', 'What it means in practice']}
          rows={[
            ['1. Count by tax year', 'Add every gift received from January 1 to December 31 (calendar-year individuals). Each transfer counts in the year you receive it.'],
            ['2. Combine related donors', 'Add gifts from nonresident aliens and foreign estates you know, or have reason to know, are related to each other. The IRS example: $75,000 from one nonresident alien plus $40,000 from a related nonresident alien is $115,000, so both are reported.'],
            ['3. Combine nominees and intermediaries', 'If one person is acting as a nominee or intermediary for another, their gifts are combined, related or not.'],
          ]}
        />

        <h3>The IRS wording</h3>
        <p>
          The Form 3520 instructions say that to calculate the $100,000 threshold, you aggregate gifts from different nonresident aliens and foreign estates if you know, or have reason to know, that those persons are <strong>related to each other</strong> or that one is acting as a nominee or intermediary for the other. The question is about the <strong>donors</strong> and their relationship to one another. The IRS-published proposed regulations on foreign-gift reporting (proposed §1.6039F-1(c)(2)(i)(B), in Internal Revenue Bulletin 2024-24) describe this aggregation using a related-person standard that refers to §1.643(i)-1(d)(9). The Form 3520 instructions also contain a separate definition of persons related to <em>you</em>; this guide does not treat that definition as a complete test of whether two donors are related to each other. If you are unsure whether particular relatives count as related for this rule, have it reviewed rather than assume their gifts are separate.
        </p>

        <h3>"Know, or have reason to know"</h3>
        <p>
          You are expected to combine gifts when you know the donors are related or acting for each other, or when the facts give you reason to know. The instructions illustrate this with a recipient who receives gifts from both a foreign corporation and a nonresident alien and knows the corporation is wholly owned by that individual — that knowledge matters for how the gifts are counted. Ignoring obvious family or ownership links does not help.
        </p>

        <h2>Worked examples (2025 tax year)</h2>

        <h3>Example 1: Monthly support</h3>
        <p>
          Jia's parents in Shanghai send her $9,000 every month during 2025, for a total of $108,000. Jia knows her parents are related to each other, so their transfers are added together. Each transfer is modest, but the related total is more than $100,000. Jia files Form 3520 Part IV and, because every transfer was over $5,000, lists each one.
        </p>

        <h3>Example 2: Two parents, two accounts</h3>
        <p>
          Kevin's mother sends $60,000 from her account and his father sends $45,000 from a different account. Kevin knows his mother and father are related to each other, so the total is $105,000 and Part IV is required. Using separate accounts changes nothing.
        </p>

        <h3>Example 3: Two years</h3>
        <p>
          Amy receives $70,000 from her parents in November 2025 and another $70,000 in February 2026. Each year's related total is $70,000, so neither year crosses the threshold — as long as there are no other gifts from related foreign persons in those years.
        </p>

        <h3>Example 4: Through a relative</h3>
        <p>
          David's parents want to give him $150,000. They send $90,000 themselves and ask his aunt to send $60,000 of their money. His aunt is sending his parents' money for them — acting as their intermediary — so all $150,000 is counted together, and Part IV is required. Line 56 also asks whether you have reason to believe a donor was acting as a nominee or intermediary.
        </p>

        <h3>Example 5: Unrelated donors</h3>
        <p>
          Grace receives $80,000 from her parents and a $40,000 graduation gift from a family friend in Singapore who is not related to her parents and is acting on his own. The related totals are $80,000 and $40,000. Neither group is over $100,000, so these gifts do not require Part IV.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Splitting transfers is not a plan</div>
          <p>Breaking one gift into many wires, using several family accounts, or routing money through a relative does not reduce the reportable total when the donors are related or acting for each other. And a missed Form 3520 can cost 5% of the gift for each month it goes unreported, up to 25%, unless there is reasonable cause. Report the real picture.</p>
        </div>

        <h2>What is listed once you cross the threshold</h2>
        <ul>
          <li><strong>Line 54</strong> (nonresident alien individuals and foreign estates): list each gift or bequest over $5,000 — the date, a description, and the fair market value.</li>
          <li>If no single gift was over $5,000, write "No gifts or bequests exceed $5,000" instead of listing them.</li>
          <li><strong>Line 55</strong> is a separate question for purported gifts from foreign corporations and foreign partnerships, which have a much lower annual threshold. See <a href="/library/investment/form-3520/">Form 3520: reporting large foreign gifts</a>.</li>
          <li><strong>Line 56</strong> asks whether you have reason to believe any donor was acting as a nominee or intermediary.</li>
        </ul>

        <h2>Common mistakes</h2>
        <ul>
          <li>Comparing each wire to $100,000 instead of adding the year's total</li>
          <li>Testing each giver separately when you know, or have reason to know, the givers are related to each other</li>
          <li>Forgetting gifts of property (jewelry, shares, a car) because no money was wired</li>
          <li>Leaving out a bequest from a parent's foreign estate in the same year as lifetime gifts — bequests are counted with gifts</li>
          <li>Counting tuition paid directly to your school, which is not a foreign gift (see <a href="/library/investment/foreign-gift-tuition-paid-directly/">tuition paid directly</a>)</li>
          <li>Counting your own money moved from your own foreign account, which is not a gift at all</li>
        </ul>

        <h2>A simple tracking method</h2>
        <p>
          Keep one list for the year with these columns: date received, sender, sender's relationship to the other senders, purpose, amount in the foreign currency, exchange rate, amount in U.S. dollars. At year-end, group the senders who are related or acting for each other and total each group. If any group is over $100,000, you have your Form 3520 list ready.
        </p>

        <h2>When professional review makes sense</h2>
        <p>
          Ask a tax professional if money came through a company, a trust, or an unrelated person who may have been acting for your family; if you received property rather than cash; or if a total is close to $100,000 and you are not sure how to value or date a transfer.
        </p>

      </KnowledgePage>
    </Layout>
  )
}

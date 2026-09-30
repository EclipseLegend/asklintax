/**
 * AskLinTax — Knowledge Library categories
 *
 * Canonical category names, URLs, and curation for the Library and category pages.
 * Articles belong to a category via `category` in lib/articles.js; this file only curates.
 *
 * Every article id used here (startHere, related, questions, LIBRARY_ESSENTIALS) must exist
 * in lib/articles.js — scripts/validate-articles.js fails the build otherwise.
 * Never list planned or unpublished topics here.
 *
 * Fields:
 *   key            Stable identifier, used by articles' `category`.
 *   path           Category page URL (trailing slash). Permanent — do not rename.
 *   name           Canonical display name.
 *   seoTitle       <title> for the category page.
 *   seoDescription Meta description for the category page.
 *   intro          Opening paragraph on the category page.
 *   startHere      Article ids featured first (must belong to this category).
 *   startHereNote  Optional line under the Start Here heading when every guide is featured.
 *   related        Article ids from OTHER categories worth surfacing here.
 *   questions      Plain-language questions, each answered by a published article id.
 */

const CATEGORIES = [
  {
    key: 'individual',
    path: '/library/individual/',
    name: 'Individuals & Families',
    seoTitle: 'Individual & Family Taxes: Filing, Residency & Credits | AskLinTax',
    seoDescription: 'Plain-language guides for individuals and families: whether you need to file, tax residency, W-2 and 1099 forms, ITINs, and credits like the Child Tax Credit.',
    intro: 'Whether you are filing for the first time, new to the U.S., or trying to understand your forms, these guides explain your personal tax situation step by step, in plain language.',
    startHere: ['do-i-need-to-file', 'first-time-filer'],
    related: ['fbar', 'quarterly-taxes'],
    questions: [
      { q: 'Do I need to file a tax return this year?', id: 'do-i-need-to-file' },
      { q: 'Am I a U.S. tax resident or a nonresident?', id: 'tax-residency' },
      { q: 'How do I read my W-2?', id: 'what-is-w2' },
      { q: 'How do I get an ITIN if I don\'t have an SSN?', id: 'itin' },
      { q: 'Does my child qualify for the Child Tax Credit?', id: 'child-tax-credit' },
    ],
  },
  {
    key: 'small-business',
    path: '/library/small-business/',
    name: 'Small Business & Self-Employment',
    seoTitle: 'Small Business & Self-Employment Taxes | AskLinTax',
    seoDescription: 'Guides for freelancers, contractors, and small business owners: quarterly estimated taxes, business deductions, and what self-employment means for your taxes.',
    intro: 'Running your own business or working for yourself changes how you pay tax. These guides cover estimated payments, deductions, and the records you need to keep.',
    startHere: ['quarterly-taxes'],
    related: ['w2-vs-1099', 'ein', 'llc-basics'],
    questions: [
      { q: 'Do I need to pay quarterly estimated taxes?', id: 'quarterly-taxes' },
      { q: 'What can I deduct as a small business owner?', id: 'business-deductions' },
      { q: 'Am I an employee or an independent contractor?', id: 'w2-vs-1099' },
    ],
  },
  {
    key: 'business-formation',
    path: '/library/business-formation/',
    name: 'Business Formation',
    seoTitle: 'Business Formation: LLC, S-Corp & EIN Guides | AskLinTax',
    seoDescription: 'Choosing and setting up a business structure: what an LLC is, when an S-Corp makes sense, and how to get an EIN from the IRS.',
    intro: 'Starting a business means choosing a structure and setting it up correctly. These guides explain LLCs, S-Corps, and EINs in plain language, with real numbers.',
    startHere: ['llc-basics'],
    related: ['quarterly-taxes', 'business-deductions'],
    questions: [
      { q: 'Do I need an LLC?', id: 'llc-basics' },
      { q: 'Should my business be an LLC or an S-Corp?', id: 'llc-vs-scorp' },
      { q: 'How do I apply for an EIN?', id: 'ein' },
    ],
  },
  {
    key: 'rental',
    path: '/library/rental/',
    name: 'Real Estate & Airbnb',
    seoTitle: 'Airbnb & Rental Property Taxes | AskLinTax',
    seoDescription: 'Tax guides for Airbnb hosts and rental property owners: what income to report, what you can deduct, and when the 14-day rule makes rental income tax-free.',
    intro: 'Renting out a room, a home, or a vacation property creates tax questions. These guides explain what to report, what you can deduct, and when rental income is tax-free.',
    startHere: ['airbnb-tax-guide'],
    related: ['business-deductions', 'quarterly-taxes'],
    questions: [
      { q: 'How do I report Airbnb income?', id: 'airbnb-tax-guide' },
      { q: 'When is rental income tax-free?', id: '14-day-rule' },
    ],
  },
  {
    key: 'investment',
    path: '/library/investment/',
    name: 'Investments & Foreign Accounts',
    seoTitle: 'Crypto, Investment & Foreign Account Taxes (FBAR) | AskLinTax',
    seoDescription: 'Guides to crypto taxes and foreign account reporting: which crypto transactions are taxable, and who must file an FBAR for accounts outside the U.S.',
    intro: 'Crypto, investments, and bank accounts outside the U.S. come with their own tax and reporting rules. These guides explain what is taxable and what must be reported.',
    startHere: ['fbar', 'crypto-tax'],
    startHereNote: 'Each guide covers a different part of investment and foreign account reporting. Choose the one that matches your situation.',
    related: ['new-immigrant', 'tax-residency'],
    questions: [
      { q: 'Do I need to report my bank accounts in Taiwan or China?', id: 'fbar' },
      { q: 'Is selling or trading crypto taxable?', id: 'crypto-tax' },
    ],
  },
  {
    key: 'irs',
    path: '/library/irs/',
    name: 'IRS & Tax Issues',
    seoTitle: 'IRS Letters & Notices: What They Mean and How to Respond | AskLinTax',
    seoDescription: 'Received a letter from the IRS? Learn how to read it, what common notices like the CP2000 mean, and how to respond calmly and on time.',
    intro: 'A letter from the IRS can be stressful, but most notices are routine. These guides help you understand what the IRS is asking and how to respond on time.',
    startHere: ['irs-notice'],
    related: ['do-i-need-to-file'],
    questions: [
      { q: 'I received a letter from the IRS. What should I do?', id: 'irs-notice' },
      { q: 'What does a CP2000 notice mean?', id: 'cp2000' },
    ],
  },
]

// Library homepage "Start with the essentials" — one foundational guide per category.
const LIBRARY_ESSENTIALS = [
  'do-i-need-to-file',
  'irs-notice',
  'llc-basics',
  'quarterly-taxes',
  'airbnb-tax-guide',
  'fbar',
]

module.exports = { CATEGORIES, LIBRARY_ESSENTIALS }

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
 *   summary        One-line description for Library topic cards.
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
    summary: 'Filing basics, residency, W-2 and 1099 forms, ITINs, nonresident spouses, and worldwide income.',
    seoTitle: 'Individual & Family Taxes: Filing, Residency & Credits | AskLinTax',
    seoDescription: 'Plain-language guides for individuals and families: whether you need to file, tax residency and the substantial presence test, dual-status years, nonresident spouses, worldwide income, ITINs, and family credits.',
    intro: 'Whether you are filing for the first time, new to the U.S., or trying to understand your forms, these guides explain your personal tax situation step by step, in plain language.',
    startHere: ['do-i-need-to-file', 'first-time-filer'],
    related: ['foreign-bank-account', 'foreign-gifts', 'quarterly-taxes'],
    questions: [
      { q: 'Do I need to file a tax return this year?', id: 'do-i-need-to-file' },
      { q: 'Am I a U.S. tax resident or a nonresident?', id: 'tax-residency' },
      { q: 'How do I count my days for the substantial presence test?', id: 'substantial-presence-test' },
      { q: 'My spouse is not a U.S. resident. Can we file jointly?', id: 'nonresident-spouse' },
      { q: 'Do I report income I earn in Taiwan or China?', id: 'worldwide-income' },
      { q: 'How do I read my W-2?', id: 'what-is-w2' },
      { q: 'How do I get an ITIN if I don\'t have an SSN?', id: 'itin' },
      { q: 'Does my child qualify for the Child Tax Credit?', id: 'child-tax-credit' },
    ],
  },
  {
    key: 'small-business',
    path: '/library/small-business/',
    name: 'Small Business & Self-Employment',
    summary: 'Estimated taxes, deductions, and what working for yourself means at tax time.',
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
    summary: 'Choosing and setting up a structure: LLCs, S-Corps, and EINs.',
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
    summary: 'Airbnb and rental income — including property abroad: what to report, what to deduct, and what is tax-free.',
    seoTitle: 'Airbnb & Rental Property Taxes | AskLinTax',
    seoDescription: 'Tax guides for Airbnb hosts and rental property owners, including property abroad: what income to report, what you can deduct, and when the 14-day rule makes rental income tax-free.',
    intro: 'Renting out a room, a home, or a vacation property creates tax questions. These guides explain what to report, what you can deduct, and when rental income is tax-free.',
    startHere: ['airbnb-tax-guide'],
    related: ['foreign-property', 'business-deductions', 'quarterly-taxes'],
    questions: [
      { q: 'How do I report Airbnb income?', id: 'airbnb-tax-guide' },
      { q: 'When is rental income tax-free?', id: '14-day-rule' },
      { q: 'How do I report rent from an apartment in Taiwan?', id: 'foreign-rental-property' },
    ],
  },
  {
    key: 'investment',
    path: '/library/investment/',
    name: 'Investments & Foreign Accounts',
    summary: 'Foreign bank accounts, gifts from abroad, property overseas, and crypto: what is taxable and what must be reported.',
    seoTitle: 'Foreign Accounts, Foreign Gifts & Crypto Taxes (FBAR, Form 3520) | AskLinTax',
    seoDescription: 'Guides to foreign accounts and assets: FBAR and Form 8938, money from parents overseas and Form 3520, property abroad, and which crypto transactions are taxable.',
    intro: 'Bank accounts abroad, gifts from family overseas, property in another country, and crypto each come with their own tax and reporting rules. These guides separate what is taxable from what only needs to be reported.',
    startHere: ['foreign-bank-account', 'foreign-gifts', 'fbar-vs-form-8938'],
    startHereNote: 'Each guide covers a different part of investment and foreign account reporting. Choose the one that matches your situation.',
    related: ['worldwide-income', 'foreign-rental-property', 'new-immigrant', 'tax-residency'],
    questions: [
      { q: 'Do I need to report my bank accounts in Taiwan or China?', id: 'foreign-bank-account' },
      { q: 'Do I need to file an FBAR?', id: 'fbar' },
      { q: 'What is the difference between the FBAR and Form 8938?', id: 'fbar-vs-form-8938' },
      { q: 'My parents sent me money from overseas. Is it taxable?', id: 'foreign-gifts' },
      { q: 'When do I need to file Form 3520?', id: 'form-3520' },
      { q: 'My parents paid my tuition directly. Is that a foreign gift?', id: 'foreign-gift-tuition-paid-directly' },
      { q: 'I missed Form 3520 for a gift. What should I do now?', id: 'late-form-3520' },
      { q: 'I sold property abroad and moved the money to the U.S. What do I report?', id: 'sold-foreign-property-transfer' },
      { q: 'Do I have to report a house I own abroad?', id: 'foreign-property' },
      { q: 'Is selling or trading crypto taxable?', id: 'crypto-tax' },
    ],
  },
  {
    key: 'irs',
    path: '/library/irs/',
    name: 'IRS & Tax Issues',
    summary: 'Understanding IRS letters and notices, and how to respond on time.',
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

// Library homepage "Popular situations" — section ids on the Start Here page (/start/#<id>).
// Labels live in locales/<lang>/library.json. The validator checks each id exists on /start/.
const LIBRARY_SITUATIONS = ['first-time', 'irs', 'airbnb', 'llc', 'crypto', 'immigrant']

module.exports = { CATEGORIES, LIBRARY_ESSENTIALS, LIBRARY_SITUATIONS }

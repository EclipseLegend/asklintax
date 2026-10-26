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
      { q: 'How does the foreign tax credit avoid double tax on Taiwan income?', id: 'foreign-tax-credit' },
      { q: 'Can I exclude the wages I earn working abroad?', id: 'foreign-earned-income-exclusion' },
      { q: 'I live in Taiwan or abroad. What U.S. tax filings do I need?', id: 'us-taxpayer-living-abroad' },
      { q: 'How do I read my W-2?', id: 'what-is-w2' },
      { q: 'How do I get an ITIN if I don\'t have an SSN?', id: 'itin' },
      { q: 'Does my child qualify for the Child Tax Credit?', id: 'child-tax-credit' },
      { q: 'I got a 1099-K from PayPal or Venmo. Is it taxable?', id: 'form-1099-k' },
      { q: 'Can I claim my parents as dependents if they live abroad?', id: 'claim-parent-as-dependent' },
      { q: 'Which education tax credit can I use for college?', id: 'education-tax-credits' },
      { q: 'Taxes come out of my paycheck. Why do I still owe?', id: 'owe-taxes-withholding-w4' },
      { q: 'What changed under the 2025 tax law for my 2025 and 2026 returns?', id: 'tax-law-changes-2025-2026' },
      { q: 'Can I deduct my tips?', id: 'no-tax-on-tips' },
      { q: 'How does the overtime deduction work?', id: 'no-tax-on-overtime' },
      { q: 'I\'m 65 or older. Do I qualify for the new $6,000 senior deduction?', id: 'senior-deduction' },
      { q: 'How much state and local tax (SALT) can I deduct?', id: 'salt-deduction' },
      { q: 'Can I deduct interest on my car loan?', id: 'car-loan-interest-deduction' },
      { q: 'Can I deduct charitable donations if I don\'t itemize?', id: 'charitable-deduction-2026' },
      { q: 'What is a Trump account, and does my child get $1,000?', id: 'trump-accounts' },
      { q: 'Can I get a tax credit for child care costs?', id: 'child-dependent-care-credit' },
      { q: 'What can I pay for with a 529 plan?', id: '529-plans' },
      { q: 'How much can I put in a traditional or Roth IRA?', id: 'ira-roth-ira-contributions' },
      { q: 'I gave my child money. Do I need to file a gift tax return?', id: 'gift-tax-form-709' },
      { q: 'How are IRA and 401(k) withdrawals and RMDs taxed?', id: 'retirement-withdrawals-rmd' },
      { q: 'Is my child\'s investment income taxed at my rate?', id: 'kiddie-tax' },
      { q: 'Is my Social Security taxable?', id: 'social-security-benefits-tax' },
      { q: 'Do I qualify for the Earned Income Tax Credit?', id: 'earned-income-tax-credit' },
      { q: 'How much can I put in a health savings account (HSA)?', id: 'health-savings-account-hsa' },
      { q: 'I pay a nanny or caregiver. Do I owe household employment taxes?', id: 'household-employees-schedule-h' },
      { q: 'Do I have to pay back my Marketplace premium tax credit?', id: 'premium-tax-credit-form-8962' },
      { q: 'Can I file as head of household?', id: 'filing-status-head-of-household' },
      { q: 'Do I owe tax on an inheritance, and when does estate tax apply?', id: 'estate-tax-inheritance-basics' },
      { q: 'How does the adoption tax credit work?', id: 'adoption-tax-credit' },
      { q: 'How are alimony and child support taxed after a divorce?', id: 'divorce-alimony-taxes' },
      { q: 'I received a Form 1099-C. Is forgiven debt taxable?', id: 'cancellation-of-debt-1099c' },
      { q: 'Is my scholarship or fellowship taxable?', id: 'scholarship-fellowship-tax' },
      { q: 'What is the alternative minimum tax, and will I owe it?', id: 'alternative-minimum-tax' },
    ],
  },
  {
    key: 'small-business',
    path: '/library/small-business/',
    name: 'Small Business & Self-Employment',
    summary: 'Estimated taxes, self-employment tax, deductions including the home office, and what working for yourself means at tax time.',
    seoTitle: 'Small Business & Self-Employment Taxes | AskLinTax',
    seoDescription: 'Guides for freelancers, contractors, and small business owners: quarterly estimated taxes, self-employment tax, business deductions, the home office deduction, and what self-employment means for your taxes.',
    intro: 'Running your own business or working for yourself changes how you pay tax. These guides cover estimated payments, self-employment tax, deductions, and the records you need to keep.',
    startHere: ['quarterly-taxes'],
    related: ['w2-vs-1099', 'ein', 'llc-basics'],
    questions: [
      { q: 'Do I need to pay quarterly estimated taxes?', id: 'quarterly-taxes' },
      { q: 'What can I deduct as a small business owner?', id: 'business-deductions' },
      { q: 'Am I an employee or an independent contractor?', id: 'w2-vs-1099' },
      { q: 'What is self-employment tax and how is it calculated?', id: 'self-employment-tax' },
      { q: 'Do I qualify for the home office deduction?', id: 'home-office-deduction' },
      { q: 'How do I fill out Schedule C?', id: 'schedule-c-guide' },
      { q: 'Can I take the 20% QBI deduction?', id: 'qbi-deduction' },
      { q: 'Can I deduct equipment in the first year with Section 179 or bonus depreciation?', id: 'section-179-bonus-depreciation' },
      { q: 'Is my side activity a hobby or a business?', id: 'hobby-vs-business-income' },
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
      { q: 'How is a single-member LLC taxed?', id: 'single-member-llc-taxes' },
      { q: 'How much salary should I pay myself from my S-Corp?', id: 's-corp-reasonable-salary' },
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
      { q: 'How is rental income from a U.S. house or apartment taxed?', id: 'rental-property-income' },
      { q: 'I sold my home. Do I pay tax on the profit?', id: 'selling-your-home' },
      { q: 'I sold a rental property. How is the gain taxed?', id: 'selling-rental-property' },
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
      { q: 'Each of my foreign accounts is under $10,000. Do I still need an FBAR?', id: 'fbar-10000-rule' },
      { q: 'Do I report my Taiwan time deposit (CD)?', id: 'foreign-time-deposit-cd' },
      { q: 'I forgot to file an FBAR. What should I do?', id: 'late-fbar' },
      { q: 'Is selling or trading crypto taxable?', id: 'crypto-tax' },
      { q: 'How are capital gains taxed when I sell stock?', id: 'stock-sale-capital-gains' },
      { q: 'Can I deduct losses from selling stock?', id: 'capital-losses' },
      { q: 'Do I have to report bank interest and dividends?', id: 'interest-and-dividends' },
      { q: 'How are my RSUs taxed when they vest and when I sell?', id: 'rsu-taxes' },
      { q: 'How are ESPP shares taxed when I sell them?', id: 'espp-taxes' },
      { q: 'What is the difference between ISOs and NSOs for taxes?', id: 'stock-options-iso-nso' },
      { q: 'What does Form 1099-DA report for my crypto?', id: 'form-1099-da' },
      { q: 'My Form 1099-B shows the wrong cost basis. What do I do?', id: 'cost-basis-form-1099-b' },
      { q: 'Do I owe the 3.8% net investment income tax?', id: 'net-investment-income-tax' },
      { q: 'Can I deduct margin interest?', id: 'investment-interest-expense' },
      { q: 'How are gold, silver, coins, and art taxed when I sell?', id: 'collectibles-tax' },
      { q: 'What do the boxes on my Form 1099-DIV and 1099-INT mean?', id: 'form-1099-div-1099-int-boxes' },
      { q: 'Are my Taiwan or other foreign funds and ETFs PFICs?', id: 'pfic-form-8621' },
      { q: 'Do I report my foreign pension or retirement account?', id: 'foreign-pension-retirement-accounts' },
    ],
  },
  {
    key: 'irs',
    path: '/library/irs/',
    name: 'IRS & Tax Issues',
    summary: 'IRS letters and notices, tax bills you can\'t pay, amended returns, and missed filing deadlines.',
    seoTitle: 'IRS Letters & Notices: What They Mean and How to Respond | AskLinTax',
    seoDescription: 'Received a letter from the IRS, owe more than you can pay, need to fix a filed return, or missed the deadline? Plain-language guides to IRS notices like the CP2000, payment options, Form 1040-X, and late filing.',
    intro: 'A letter from the IRS, a bill you can\'t pay, a mistake on a filed return, or a missed deadline can be stressful, but each has a clear next step. These guides explain what the IRS expects and how to respond.',
    startHere: ['irs-notice'],
    related: ['do-i-need-to-file'],
    questions: [
      { q: 'I received a letter from the IRS. What should I do?', id: 'irs-notice' },
      { q: 'What does a CP2000 notice mean?', id: 'cp2000' },
      { q: 'I can\'t pay my tax bill. What are my options?', id: 'cant-pay-tax-bill' },
      { q: 'I made a mistake on my return. How do I amend it?', id: 'amend-tax-return' },
      { q: 'I missed the tax deadline. What happens now?', id: 'missed-tax-deadline' },
      { q: 'I\'m being audited by the IRS. What happens next?', id: 'irs-audit' },
      { q: 'Can the IRS remove my late filing or late payment penalty?', id: 'irs-penalty-relief' },
      { q: 'How do I get an IRS IP PIN to protect my tax return?', id: 'irs-identity-theft-ip-pin' },
      { q: 'How do I get an IRS tax transcript?', id: 'irs-tax-transcripts' },
      { q: 'How do I authorize someone to talk to the IRS for me?', id: 'irs-power-of-attorney-2848-8821' },
      { q: 'My spouse\'s debt took our refund, or I owe tax my spouse caused. What can I do?', id: 'injured-innocent-spouse-relief' },
      { q: 'I disagree with my audit results. How do I appeal?', id: 'irs-appeals-process' },
      { q: 'The IRS filed a lien or is threatening to levy my wages or bank account. What can I do?', id: 'irs-tax-liens-levies' },
      { q: 'My IRS problem is causing hardship and I can\'t get it resolved. Who can help?', id: 'taxpayer-advocate-service' },
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

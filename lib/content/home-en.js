/**
 * English homepage content (master/source copy).
 * Moved verbatim from pages/index.js so the same HomePage component can render
 * English and Traditional Chinese. Icons are referenced by key (see components/home/HomePage.js).
 */

// ── DATA — dates sourced from lib/tax-config.js ──────────
// Update lib/tax-config.js each filing season
const UPDATE_DATA = {
  federal: [
    { title: 'Standard deduction increases for Tax Year 2025', desc: 'After the 2025 federal tax law, the standard deduction is $15,750 for single filers, $31,500 for married filing jointly, and $23,625 for head of household.', tags: [{ text: 'Federal', cls: 'tag-blue' }, { text: '2025 Tax Year', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#standard-deduction' },
    { title: '1099-K threshold restored to $20,000 and 200 transactions', desc: 'A 2025 federal law retroactively restored the higher reporting threshold for payment apps and online marketplaces. Card payments have no minimum, and income is still taxable without a 1099-K.', tags: [{ text: 'Federal', cls: 'tag-blue' }], date: 'Updated October 2026', href: '/updates/#form-1099-k' },
    { title: 'IRS Free File for 2025 returns: AGI of $89,000 or less', desc: 'For 2025 returns, IRS Free File offers guided tax software at no cost to taxpayers with adjusted gross income of $89,000 or less.', tags: [{ text: 'Federal', cls: 'tag-blue' }, { text: '2025 Tax Year', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#direct-file' },
  ],
  california: [
    { title: 'CalEITC for Tax Year 2025: up to $3,756', desc: "California's Earned Income Tax Credit is worth up to $3,756 for tax year 2025 for working families and individuals earning up to $32,900.", tags: [{ text: 'California', cls: 'tag-green' }, { text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#caleitc' },
  ],
  irs: [
    { title: 'Check if your ITIN has expired', desc: 'If an ITIN isn\'t used on a federal tax return for 3 consecutive tax years, it expires on December 31 after the third year. Renew it before you include it on a tax return.', tags: [{ text: 'IRS Notice', cls: 'tag-red' }, { text: 'Action Required', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/library/individual/itin/' },
  ],
  credits: [
    { title: 'Child Tax Credit: $2,200 per child for Tax Year 2025', desc: 'The 2025 federal tax law raised the CTC to $2,200 per qualifying child under 17; up to $1,700 is refundable. The claimant (or spouse, if filing jointly) and each child need SSNs valid for employment.', tags: [{ text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#child-tax-credit' },
    { title: 'EITC maximum rises to $8,046 for Tax Year 2025', desc: "The Earned Income Tax Credit maximum increased. Many low-to-moderate income families qualify — don't leave this unclaimed.", tags: [{ text: 'Credits', cls: 'tag-gold' }], date: 'Updated October 2026', href: '/updates/#eitc' },
  ],
  deadlines: [
    { title: 'Extended 2025 returns due October 15, 2026', desc: 'If you have an automatic 6-month extension for your 2025 return, file Form 1040 or 1040-SR by October 15, 2026 and pay any tax, interest, and penalties due.', tags: [{ text: 'Deadline', cls: 'tag-red' }], date: 'Updated October 2026', href: '/updates/#calendar' },
    { title: 'FBAR extended deadline: October 15, 2026', desc: 'Foreign bank account reports (FinCEN Form 114) for 2025 have an automatic extension to October 15, 2026.', tags: [{ text: 'Deadline', cls: 'tag-red' }, { text: 'FBAR', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#calendar' },
    { title: 'Final 2026 estimated tax payment due January 15, 2027', desc: 'Self-employed individuals and business owners: the fourth 2026 estimated tax payment is due January 15, 2027 — or file your 2026 return and pay in full by February 1, 2027.', tags: [{ text: 'Deadline', cls: 'tag-red' }, { text: 'Estimated Tax', cls: 'tag-navy' }], date: 'Updated October 2026', href: '/updates/#calendar' },
  ],
}

const GUIDE_CARDS = [
  { href: '/library/irs/irs-notice',               cat: 'irs',        topColor: 'gold',   tagCls: 'tag-gold',  tagLabel: 'IRS & Tax Issues',       title: 'I received an IRS letter — what do I do?',                           desc: 'Most IRS notices are routine. Here\'s how to read the letter and figure out your next step without panicking.', read: '4 min read', emotion: '😨 Feeling anxious?' },
  { href: '/library/business-formation/llc-basics', cat: 'business',   topColor: 'navy',   tagCls: 'tag-navy',  tagLabel: 'Business Formation',      title: 'What is an LLC and do I actually need one?',                          desc: 'LLC is one of the most searched terms in small business taxes. Here\'s what it means in plain language.',       read: '5 min read', emotion: '🤔 Deciding?' },
  { href: '/library/individual/new-immigrant',      cat: 'individual', topColor: 'forest', tagCls: 'tag-green', tagLabel: 'Individuals & Families',   title: 'New to the U.S.? What you need to know about taxes',                  desc: 'Your first tax year in America doesn\'t need to be confusing. A complete, plain-language guide.',              read: '6 min read', emotion: '📚 Just learning' },
  { href: '/library/rental/airbnb-tax-guide',       cat: 'rental',     topColor: 'blue',   tagCls: 'tag-blue',  tagLabel: 'Real Estate & Airbnb',    title: 'Airbnb host? Here\'s what you need to report on your taxes',          desc: 'Short-term rental income has its own rules. What counts, what\'s deductible, and the 14-day rule.',            read: '5 min read', emotion: '📋 Getting organized' },
  { href: '/library/business-formation/llc-vs-scorp', cat: 'business', topColor: 'navy',  tagCls: 'tag-navy',  tagLabel: 'Business Formation',      title: 'LLC vs S-Corp: which structure is right for your business?',          desc: 'One of the most important — and confusing — decisions for small business owners. A clear comparison.',          read: '7 min read', emotion: '🤔 Comparing options' },
  { href: '/library/investment/fbar',              cat: 'individual', topColor: 'red',    tagCls: 'tag-red',   tagLabel: 'Investments & Foreign Accounts',  title: 'Do you have accounts outside the U.S.? You may need to file FBAR',   desc: 'Many Chinese families don\'t know they\'re required to report foreign bank accounts.',                          read: '5 min read', emotion: '⚠️ Check if this applies' },
]

const START_CARDS = [
  { id: 'first-time', href: '/start#first-time', icon: 'doc',     title: 'I\'m filing U.S. taxes for the first time', desc: 'Never filed a U.S. tax return before. Not sure where to start or what documents you need.', links: [{ href: '/library/individual/first-time-filer', label: '→ First-Time Filer Complete Guide' }, { href: '/library/individual/tax-residency', label: '→ Am I a U.S. tax resident?' }] },
  { id: 'irs',        href: '/start#irs',         icon: 'mail',    title: 'I received a letter from the IRS', desc: 'Got a letter in the mail from the IRS. Not sure what it means or what to do.',             links: [{ href: '/library/irs/irs-notice', label: '→ What to do with an IRS letter' }, { href: '/library/irs/cp2000', label: '→ CP2000 Notice explained' }] },
  { id: 'airbnb',     href: '/start#airbnb',      icon: 'home',    title: 'I have Airbnb or rental income', desc: 'You rent out a property or room on Airbnb. Need to understand what to report and what\'s deductible.', links: [{ href: '/library/rental/airbnb-tax-guide', label: '→ Airbnb Tax Complete Guide' }, { href: '/library/rental/14-day-rule', label: '→ The 14-day rule explained' }] },
  { id: 'llc',        href: '/start#llc',         icon: 'build',   title: 'I\'m starting or running a small business', desc: 'Self-employed, freelancer, or thinking about starting an LLC. Where do you begin?',           links: [{ href: '/library/business-formation/llc-basics', label: '→ What is an LLC?' }, { href: '/library/business-formation/llc-vs-scorp', label: '→ LLC vs S-Corp: which is better?' }] },
  { id: 'crypto',     href: '/start#crypto',      icon: 'chart',   title: 'I have crypto or investment income', desc: 'Crypto, stocks, or foreign accounts. Unsure about capital gains, 1099-B, or FBAR requirements.', links: [{ href: '/library/investment/crypto-tax', label: '→ Crypto taxes explained' }, { href: '/library/investment/fbar', label: '→ Do I need to file FBAR?' }] },
  { id: 'immigrant',  href: '/start#immigrant',   icon: 'globe',   title: 'I\'m a new immigrant or have cross-border tax questions', desc: 'New immigrant, dual-status, or have income or accounts outside the U.S. You have special obligations.', links: [{ href: '/library/individual/new-immigrant', label: '→ New immigrant tax guide' }, { href: '/library/individual/dual-status', label: '→ Dual-status filer explained' }] },
]

// `planned: true` = article/page not published yet. Kept for the roadmap, hidden from the UI
// so the homepage never links to a 404. Remove the flag once the page exists.
const LEARN_CARDS = [
  { href: '/learn',     icon: '▶', iconBg: '#FFF0F0', iconColor: '#DC2626', title: 'YouTube Learning Center', desc: 'Short, clear videos on the tax topics that matter most. No jargon, no sales pitch — just answers.', cta: 'Watch on YouTube →', planned: true },
  { href: '/checklist', icon: '☑', iconBg: 'var(--gold-pale)', iconColor: 'var(--gold)', title: 'Document Checklist', desc: 'Know exactly what documents to gather before tax season. Customized by situation — individual, business, or Airbnb host.', cta: 'Get the checklist →', planned: true },
  { href: '/glossary',  icon: '📖', iconBg: 'var(--blue-soft)', iconColor: 'var(--blue)', title: 'Tax Glossary', desc: 'See a term you don\'t understand? Every entry is explained in plain language first — technical definition comes second.', cta: 'Browse glossary →', planned: true },
  { href: '/updates/#calendar', icon: '📅', iconBg: 'var(--green-soft)', iconColor: 'var(--green)', title: 'U.S. Tax Calendar', desc: 'Never miss a deadline for the 2026 filing season. Key dates for individuals, businesses, and quarterly filers.', cta: 'View tax calendar →' },
]

const BENEFIT_CARDS = [
  { cat: 'family',     href: '/library/individual/child-tax-credit',     icon: 'people', title: 'Child Tax Credit',              desc: 'Up to $2,200 per qualifying child under 17. Many immigrant families don\'t claim this — even when eligible.', amount: 'Up to $2,200 per child',           cta: 'Check if you qualify →' },
  { cat: 'family',     href: '/library/individual/earned-income-credit',  icon: 'dollar', title: 'Earned Income Tax Credit (EITC)', desc: 'A refundable credit for low-to-moderate income workers. One of the most underclaimed benefits in America.',    amount: 'Up to $8,046 (Tax Year 2025)',              cta: 'See if you\'re eligible →', planned: true },
  { cat: 'california', href: '/library/individual/caleitc',               icon: 'pin',    title: 'California EITC (CalEITC)',     desc: 'California\'s own version of the EITC — stackable with the federal credit. Many Californians miss this entirely.', amount: 'Up to $3,756 (Tax Year 2025)',             cta: 'California residents only →', planned: true },
  { cat: 'family',     href: '/library/individual/education-credits',     icon: 'grad',   title: 'Education Tax Credits',         desc: 'The American Opportunity Credit and Lifetime Learning Credit can reduce your tax bill.',                        amount: 'Up to $2,500 per student',         cta: 'See education credits →', planned: true },
  { cat: 'business',   href: '/library/small-business/business-deductions/', icon: 'house',  title: 'Home Office Deduction',         desc: 'If you work from home and have a dedicated workspace, you can deduct a portion of your rent or mortgage.',     amount: 'Deduct up to $1,500 (simplified)', cta: 'Read about the deduction →' },
  { cat: 'immigrant',  href: '/library/individual/itin/',                 icon: 'card',   title: 'ITIN Holders Can Still Get Refunds', desc: 'Many new immigrants with ITINs don\'t realize they can still receive federal tax refunds and certain credits.', amount: 'Potential refunds available',      cta: 'Learn about ITIN filing →' },
]

const HOME_EN = {
  meta: { title: 'AskLinTax | U.S. Tax Knowledge for Chinese Families & Small Businesses' },
  searchPath: '/library',
  hero: {
    eyebrow: 'Trusted Tax Knowledge for Chinese Families in North America',
    titleLine1: 'U.S. taxes, explained',
    titleLine2: 'for ',
    titleEm: 'Chinese families.',
    sub: 'Search any tax question — in plain language, no jargon. Built for Chinese families and small businesses navigating the U.S. tax system.',
    placeholder: 'Search e.g. "What is an LLC?" or "Airbnb taxes"',
    searchButton: 'Search',
    pills: [
      { href: '/start#first-time', label: '🗂 First-time filer' },
      { href: '/start#irs',        label: '📬 Got an IRS letter' },
      { href: '/start#airbnb',     label: '🏠 Airbnb income' },
      { href: '/start#llc',        label: '🏪 Start an LLC' },
      { href: '/start#crypto',     label: '📈 Crypto taxes' },
      { href: '/start#immigrant',  label: '✈️ New immigrant' },
    ],
  },
  start: {
    label: 'Start Here',
    title: 'What brings you here today?',
    sub: "Start with your situation — we'll guide you to exactly what you need, without the confusing tax jargon.",
  },
  guides: {
    label: 'Popular Guides',
    title: 'Most helpful right now',
    sub: 'The questions Chinese families and small business owners ask us most — answered clearly.',
    tabs: [
      { key: 'all',        label: 'All Topics' },
      { key: 'individual', label: 'Individuals & Families' },
      { key: 'business',   label: 'Business Formation' },
      { key: 'rental',     label: 'Real Estate & Airbnb' },
      { key: 'irs',        label: 'IRS & Tax Issues' },
    ],
    browseHref: '/library',
    browseCta: 'Browse Full Knowledge Library →',
  },
  updates: {
    label: 'Tax Updates',
    title: "What's changed recently",
    sub: 'Tax laws change every year. We track the updates that matter most to Chinese families and small businesses.',
    tabs: [
      { key: 'federal',    label: 'Federal' },
      { key: 'california', label: 'California' },
      { key: 'irs',        label: 'IRS Notices' },
      { key: 'credits',    label: 'Credits & Rebates' },
      { key: 'deadlines',  label: 'Deadlines' },
    ],
    seeAllHref: '/updates',
    seeAllCta: 'See All Tax Updates →',
  },
  benefits: {
    label: 'Money & Benefits',
    title: 'Benefits you may not know you qualify for',
    sub: 'Many Chinese families miss out on tax credits and government benefits due to language barriers. This is money you may already be entitled to.',
    tabLabels: { all: 'All', family: 'Families', california: 'California', business: 'Small Business', immigrant: 'New Immigrants' },
    note: 'Information is for general educational purposes. Eligibility depends on individual circumstances — always verify with a qualified tax professional.',
  },
  learn: {
    label: 'Keep Learning',
    title: 'More ways to explore',
    sub: 'Short videos, checklists, and quick references — all designed for Chinese families navigating U.S. taxes.',
  },
  updateData: UPDATE_DATA,
  guideCards: GUIDE_CARDS,
  startCards: START_CARDS,
  learnCards: LEARN_CARDS,
  benefitCards: BENEFIT_CARDS,
}

export default HOME_EN

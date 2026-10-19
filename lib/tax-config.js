/**
 * AskLinTax — Site Configuration
 *
 * All year-sensitive values live here.
 * To update for a new tax season, change this file only.
 *
 * TAX YEAR vs FILING SEASON:
 *   Tax Year 2025 = income earned Jan–Dec 2025
 *   Filing Season 2026 = when you FILE that return (spring 2026)
 */

const TAX_CONFIG = {
  // The tax year whose return is currently being filed
  currentTaxYear: 2025,

  // The calendar year in which filing happens
  filingSeasonYear: 2026,

  // Key federal deadlines (filing season)
  // Sources: IRS Form 1040-ES (2026) for the estimated payments; IRS Pub. 509 (2026) for March 16, 2026.
  deadlines: {
    federal:       'April 15, 2026',
    extension:     'October 15, 2026',
    q1Estimated:   'April 15, 2026',
    q2Estimated:   'June 15, 2026',
    q3Estimated:   'September 15, 2026',
    q4Estimated:   'January 15, 2027',
    fbar:          'April 15, 2026',
    fbarExtension: 'October 15, 2026',
    corporateReturn: 'March 16, 2026', // calendar-year S corporation (Form 1120-S) and partnership (Form 1065) returns
  },

  // Standard deduction amounts for currentTaxYear (2025, as amended by the 2025 federal tax law, P.L. 119-21)
  // Source: IRS IR-2025-103 (Rev. Proc. 2025-32)
  standardDeduction: {
    single:              15750,
    marriedFilingJointly: 31500,
    headOfHousehold:     23625,
  },

  // Key credit amounts for currentTaxYear (2025)
  // Sources: IRS Child Tax Credit page and Rev. Proc. 2025-32 (CTC $2,200 for 2025; refundable up to $1,700);
  // Rev. Proc. 2024-40 (EITC maximum $8,046); IRS Pub. 970 (AOTC up to $2,500).
  credits: {
    childTaxCredit:         2200,
    childTaxCreditRefundable: 1700,
    eitcMax:                8046,
    // CalEITC maximum for tax year 2025 (3+ qualifying children; earned income up to $32,900).
    // Source: California FTB (verified by the site owner):
    // https://www.ftb.ca.gov/file/personal/credits/caleitc/eligibility-and-credit-information.html
    calEitcMax:             3756,
    educationMax:           2500,
  },

  // FBAR threshold (rarely changes)
  fbarThreshold: 10000,

  // Content freshness label (update when content is reviewed)
  lastReviewed: 'June 2026',

  // Label helpers
  label: {
    taxYear:       '2025 Tax Year',
    filingSeason:  '2026 Filing Season',
    calendarTitle: 'U.S. Tax Calendar',        // ← no hardcoded year
    calendarSub:   '2026 Filing Season Deadlines',
    updatesTitle:  'What\'s changed recently',
  },
}

module.exports = TAX_CONFIG

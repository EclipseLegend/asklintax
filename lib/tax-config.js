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
  deadlines: {
    federal:       'April 15, 2026',
    extension:     'October 15, 2026',
    q1Estimated:   'April 15, 2026',
    q2Estimated:   'June 16, 2026',
    q3Estimated:   'September 15, 2026',
    q4Estimated:   'January 15, 2027',
    fbar:          'April 15, 2026',
    fbarExtension: 'October 15, 2026',
    corporateReturn: 'March 17, 2026',
  },

  // Standard deduction amounts for currentTaxYear
  standardDeduction: {
    single:              15000,
    marriedFilingJointly: 30000,
    headOfHousehold:     22500,
  },

  // Key credit amounts for currentTaxYear
  credits: {
    childTaxCredit:         2000,
    childTaxCreditRefundable: 1700,
    eitcMax:                7830,
    calEitcMax:             3529,
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

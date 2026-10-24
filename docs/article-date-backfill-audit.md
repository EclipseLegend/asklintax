# Article date backfill audit

This audit supports the per-article review dates (`META.updatedDate`) introduced in Batch 10. It covers the 80 older Knowledge Library articles (foundations 1–80) that predate per-article dates.

**Status: nothing in this table is a confirmed review date.** Candidate months come from git commit history at baseline `main@18e0e7c`. A commit date shows when a file changed, not that a substantive content or tax-accuracy review took place. Each candidate must be confirmed by a person before it is applied.

## How the date system uses this audit

- Every English and Traditional Chinese article page sets `META.updatedDate` to a month (`'Month YYYY'`) or `null`.
- `null` is allowed only for articles listed in `lib/article-date-backfill.js`. Those pages show **no** article-level date line. The library-wide review date (`TAX_CONFIG.lastReviewed`) appears only on the Library home and category pages.
- To confirm a date: verify that the commit was a substantive content or tax-accuracy review, set the same month on the English and Chinese pages, and remove the slug from `lib/article-date-backfill.js`. `scripts/validate-articles.js` (run by `npm run build`) enforces the format, rejects future dates, and requires English and Chinese to match.
- Link-only, styling, and unrelated code edits must not change an article's date.

## Columns

- **ID**: foundation number in `lib/articles.js`.
- **Current date status**: the value in both pages today.
- **Candidate month**: the month of the most recent English-page commit classified as substantive or as the page's creation.
- **Supporting commits**: the most recent English-page commits (newest first), each with its classification.
- **Classification** (automatic heuristic): `created` = the commit added the file; `link-only` = every changed line contains `href`; `substantive (content lines changed)` = other lines changed. The heuristic does not tell a tax-accuracy review apart from a wording, metadata, or translation-related edit, so a person must check each commit.
- **Verification status**: `Unverified — candidate only` until a person confirms it.

## Audit

| ID | English slug | Current date status | Candidate review month | Supporting commits (EN page, newest first) | Most recent commit type | Verification status |
|---|---|---|---|---|---|---|
| 1 | `irs-notice` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (substantive (content lines changed)); `2a2988e` 2026-09-29 (created); `1793783` 2026-07-02 (substantive (content lines changed)); `28bb728` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 2 | `llc-basics` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `8554050` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 3 | `llc-vs-scorp` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (substantive (content lines changed)); `50926b6` 2026-10-19 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 4 | `new-immigrant` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (link-only); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +2 older | link-only | Unverified — candidate only |
| 5 | `tax-residency` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); `8554050` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 6 | `do-i-need-to-file` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 7 | `first-time-filer` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 8 | `tax-credit-vs-deduction` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (substantive (content lines changed)); `50926b6` 2026-10-19 (substantive (content lines changed)); `5541cd7` 2026-10-18 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); +3 older | substantive (content lines changed) | Unverified — candidate only |
| 9 | `what-is-w2` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (substantive (content lines changed)); `50926b6` 2026-10-19 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `8554050` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 10 | `w2-vs-1099` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 11 | `airbnb-tax-guide` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); `2a2988e` 2026-09-29 (created) | substantive (content lines changed) | Unverified — candidate only |
| 12 | `14-day-rule` | `null` — no date shown (pending) | 2026-10 | `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); `e24afdb` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 13 | `quarterly-taxes` | `null` — no date shown (pending) | 2026-10 | `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); `2a2988e` 2026-09-29 (created) | substantive (content lines changed) | Unverified — candidate only |
| 14 | `business-deductions` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (substantive (content lines changed)); `50926b6` 2026-10-19 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 15 | `ein` | `null` — no date shown (pending) | 2026-10 | `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `76aafab` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 16 | `cp2000` | `null` — no date shown (pending) | 2026-10 | `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); `586429f` 2026-07-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 17 | `child-tax-credit` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `5541cd7` 2026-10-18 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `e04c49b` 2026-10-01 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 18 | `itin` | `'October 2026'` — confirmed (Batch 12 Child Tax Credit SSN correction, verified against the 2025 Schedule 8812 instructions) | 2026-10 | `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `d6be21b` 2026-07-02 (created) | substantive (content lines changed) | Confirmed — October 2026 |
| 19 | `crypto-tax` | `null` — no date shown (pending) | 2026-10 | `e661464` 2026-10-21 (substantive (content lines changed)); `3ab2c13` 2026-10-02 (substantive (content lines changed)); `76da9c5` 2026-10-02 (substantive (content lines changed)); `eb0bde6` 2026-09-29 (substantive (content lines changed)); +1 older | substantive (content lines changed) | Unverified — candidate only |
| 20 | `fbar` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (link-only); `76da9c5` 2026-10-02 (substantive (content lines changed)); `eb0bde6` 2026-09-29 (substantive (content lines changed)); `2a2988e` 2026-09-29 (created) | link-only | Unverified — candidate only |
| 21 | `foreign-gifts` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 22 | `form-3520` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `14ef5b7` 2026-10-06 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 23 | `fbar-vs-form-8938` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 24 | `foreign-bank-account` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 25 | `foreign-property` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `14ef5b7` 2026-10-06 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 26 | `foreign-rental-property` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 27 | `nonresident-spouse` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (created) | created | Unverified — candidate only |
| 28 | `dual-status` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (created) | created | Unverified — candidate only |
| 29 | `substantial-presence-test` | `null` — no date shown (pending) | 2026-10 | `76da9c5` 2026-10-02 (created) | created | Unverified — candidate only |
| 30 | `worldwide-income` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `76da9c5` 2026-10-02 (created) | substantive (content lines changed) | Unverified — candidate only |
| 31 | `foreign-gift-over-100000` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 32 | `form-3520-multiple-gifts` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 33 | `foreign-gift-home-down-payment` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 34 | `foreign-gift-tuition-paid-directly` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 35 | `transfer-own-money-to-us` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (substantive (content lines changed)); `14ef5b7` 2026-10-06 (created) | substantive (content lines changed) | Unverified — candidate only |
| 36 | `sold-foreign-property-transfer` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `14ef5b7` 2026-10-06 (created) | substantive (content lines changed) | Unverified — candidate only |
| 37 | `late-form-3520` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 38 | `form-3520-married-couples` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 39 | `foreign-gift-vs-inheritance` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 40 | `foreign-gift-vs-foreign-trust` | `null` — no date shown (pending) | 2026-10 | `14ef5b7` 2026-10-06 (created) | created | Unverified — candidate only |
| 41 | `fbar-10000-rule` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 42 | `fbar-maximum-account-value` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 43 | `new-us-resident-foreign-accounts` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 44 | `foreign-account-no-interest` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 45 | `foreign-time-deposit-cd` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 46 | `foreign-brokerage-account` | `null` — no date shown (pending) | 2026-10 | `18e0e7c` 2026-10-22 (substantive (content lines changed)); `0bff968` 2026-10-06 (created) | substantive (content lines changed) | Unverified — candidate only |
| 47 | `foreign-life-insurance-cash-value` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 48 | `late-fbar` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 49 | `joint-foreign-account-fbar` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 50 | `pre-immigration-savings` | `null` — no date shown (pending) | 2026-10 | `0bff968` 2026-10-06 (created) | created | Unverified — candidate only |
| 51 | `cant-pay-tax-bill` | `null` — no date shown (pending) | 2026-10 | `9d6f9b3` 2026-10-07 (created) | created | Unverified — candidate only |
| 52 | `amend-tax-return` | `null` — no date shown (pending) | 2026-10 | `9d6f9b3` 2026-10-07 (created) | created | Unverified — candidate only |
| 53 | `missed-tax-deadline` | `null` — no date shown (pending) | 2026-10 | `9d6f9b3` 2026-10-07 (created) | created | Unverified — candidate only |
| 54 | `selling-your-home` | `null` — no date shown (pending) | 2026-10 | `5193881` 2026-10-21 (link-only); `9d6f9b3` 2026-10-07 (created) | link-only | Unverified — candidate only |
| 55 | `form-1099-k` | `null` — no date shown (pending) | 2026-10 | `9d6f9b3` 2026-10-07 (created) | created | Unverified — candidate only |
| 56 | `rental-property-income` | `null` — no date shown (pending) | 2026-10 | `5193881` 2026-10-21 (substantive (content lines changed)); `9d6f9b3` 2026-10-07 (created) | substantive (content lines changed) | Unverified — candidate only |
| 57 | `self-employment-tax` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (substantive (content lines changed)); `9d6f9b3` 2026-10-07 (created) | substantive (content lines changed) | Unverified — candidate only |
| 58 | `home-office-deduction` | `null` — no date shown (pending) | 2026-10 | `9d6f9b3` 2026-10-07 (created) | created | Unverified — candidate only |
| 59 | `claim-parent-as-dependent` | `null` — no date shown (pending) | 2026-10 | `50926b6` 2026-10-19 (substantive (content lines changed)); `9d6f9b3` 2026-10-07 (created) | substantive (content lines changed) | Unverified — candidate only |
| 60 | `education-tax-credits` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (substantive (content lines changed)); `9d6f9b3` 2026-10-07 (created) | substantive (content lines changed) | Unverified — candidate only |
| 61 | `stock-sale-capital-gains` | `null` — no date shown (pending) | 2026-10 | `5193881` 2026-10-21 (substantive (content lines changed)); `e661464` 2026-10-21 (substantive (content lines changed)); `429e88b` 2026-10-19 (created) | substantive (content lines changed) | Unverified — candidate only |
| 62 | `capital-losses` | `null` — no date shown (pending) | 2026-10 | `e661464` 2026-10-21 (substantive (content lines changed)); `429e88b` 2026-10-19 (created) | substantive (content lines changed) | Unverified — candidate only |
| 63 | `interest-and-dividends` | `null` — no date shown (pending) | 2026-10 | `5193881` 2026-10-21 (substantive (content lines changed)); `429e88b` 2026-10-19 (created) | substantive (content lines changed) | Unverified — candidate only |
| 64 | `irs-audit` | `null` — no date shown (pending) | 2026-10 | `429e88b` 2026-10-19 (created) | created | Unverified — candidate only |
| 65 | `owe-taxes-withholding-w4` | `null` — no date shown (pending) | 2026-10 | `57ad7a6` 2026-10-20 (substantive (content lines changed)); `429e88b` 2026-10-19 (created) | substantive (content lines changed) | Unverified — candidate only |
| 66 | `tax-law-changes-2025-2026` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (substantive (content lines changed)); `57ad7a6` 2026-10-20 (created) | substantive (content lines changed) | Unverified — candidate only |
| 67 | `no-tax-on-tips` | `null` — no date shown (pending) | 2026-10 | `57ad7a6` 2026-10-20 (created) | created | Unverified — candidate only |
| 68 | `no-tax-on-overtime` | `null` — no date shown (pending) | 2026-10 | `57ad7a6` 2026-10-20 (created) | created | Unverified — candidate only |
| 69 | `senior-deduction` | `null` — no date shown (pending) | 2026-10 | `57ad7a6` 2026-10-20 (created) | created | Unverified — candidate only |
| 70 | `salt-deduction` | `null` — no date shown (pending) | 2026-10 | `57ad7a6` 2026-10-20 (created) | created | Unverified — candidate only |
| 71 | `car-loan-interest-deduction` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (created) | created | Unverified — candidate only |
| 72 | `charitable-deduction-2026` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (created) | created | Unverified — candidate only |
| 73 | `trump-accounts` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (created) | created | Unverified — candidate only |
| 74 | `child-dependent-care-credit` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (created) | created | Unverified — candidate only |
| 75 | `529-plans` | `null` — no date shown (pending) | 2026-10 | `b1021bd` 2026-10-20 (created) | created | Unverified — candidate only |
| 76 | `single-member-llc-taxes` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (created) | created | Unverified — candidate only |
| 77 | `s-corp-reasonable-salary` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (created) | created | Unverified — candidate only |
| 78 | `qbi-deduction` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (created) | created | Unverified — candidate only |
| 79 | `schedule-c-guide` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (created) | created | Unverified — candidate only |
| 80 | `section-179-bonus-depreciation` | `null` — no date shown (pending) | 2026-10 | `a2efc2d` 2026-10-20 (created) | created | Unverified — candidate only |

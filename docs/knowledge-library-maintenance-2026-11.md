# Knowledge Library Maintenance — November 2026 (Batch 01)

Record of the November 2026 accuracy audit (Phase 1) and the corrections made in
Maintenance Batch 01. All verification dates below are **November 19, 2026** unless
another date is given.

## 1. Baseline

| Item | Value |
|---|---|
| Base commit (`origin/main`) | `0d56995f86bc94ad90f736ed55911bed1c4426ba` |
| Published guides | 135 English + 135 Traditional Chinese (270 article pages) |
| Sitemap URLs | 290 |
| Articles pending a review date (`lib/article-date-backfill.js`) | 77 |
| Categories (guides) | 48 / 41 / 17 / 13 / 8 / 8 |
| Branch for this batch | `content-maintenance-2026-batch01` |

## 2. Audit coverage (what was and was not reviewed)

The Phase 1 audit did **not** read all 135 guides line by line.

- **Run across the whole library:**
  - a link check of all 399 cited source URLs;
  - a scan for draft-form dependencies;
  - a full English/Chinese parity scan;
  - a cross-check of core 2025/2026 figures against the IRS revenue procedures.
- **Read in full:** 10 priority guides.
- **Spot-checked:** other high-risk figures.
- **Not re-read line by line:** the 44 "group D" pending-date guides (section 9). "No issue found" there is not a full re-verification.

## 3. Findings

### Confirmed (corrected in this batch)

| ID | Guide(s) | Finding |
|---|---|---|
| P1-1 | `quarterly-taxes` | EFTPS was described as still usable by current individual users. The IRS says it stopped taking individual payments on November 12, 2026. |
| P2-1 | `what-is-w2` | The guide was missing the 2026 box 12 codes TP, TT and TA and the 2026 box 14a/14b split. Box 4 gave only the 2025 maximum. Box 6 mixed up the employer's withholding threshold with the filing-status liability thresholds. |
| P2-2 | `business-deductions` | The start-up and organizational cost guidance omitted the phase-out above $50,000 and combined the §195, §248 and §709 categories. |
| P2-3 | `payroll-taxes-941-940` | The guide said the 2026 FUTA credit-reduction list had not been announced. IRS drafts now name California (see section 6). |
| P2-5 | `education-tax-credits` | A cited IRS source returned 404. |
| P3-1 | `foreign-earned-income-exclusion`, `schedule-c-guide` | "Still drafts" wording was outdated for the forms that are now final. |
| P3-2 | 28 guides | Source URLs had been redirected by IRS.gov (section 7). |
| — | `irs-notice` | The CP504 row did not explain how CP504 relates to levy and Collection Due Process (CDP) rights. This was a clarification; the existing wording was not wrong. |

### Suspected or unresolved (not changed)

| ID | Guide(s) | Issue | Status |
|---|---|---|---|
| P2-4 | `issuing-form-1099-nec`, `w2-vs-1099`, `first-time-filer`, `tax-law-changes-2025-2026`, `worker-classification` | These guides say the $2,000 information-return threshold will be inflation-adjusted beginning in 2027. Rev. Proc. 2026-35 §3.52 gives **$2,100 for payments made in 2027** under **§6041(a)**. No IRS source found applies that figure to Form 1099-NEC or §6041A payments. | **Deferred** (section 6) |
| — | `first-time-filer` | The guide says IRS Free File for 2025 returns is available at AGI of $89,000 or less. The current IRS Free File page (updated October 21, 2026) shows **$95,000** and doesn't state a tax year; the program is closed until January 2027. | **Not changed.** Recheck when Free File opens for 2026 returns. |
| — | `pages/updates/index.js` (not a library article) | Cites the redirected child tax credit URL. | Out of scope and not changed |

## 4. Corrections completed (English and Chinese)

- **`quarterly-taxes`** (FAQ and payment-methods list):
  - EFTPS can no longer be used for individual payments as of November 12, 2026.
  - Payments scheduled earlier can be cancelled up to two business days before their date.
  - Alternatives: IRS Online Account or Direct Pay.
  - EFTPS remains a business payment system.
  - Other EFTPS mentions (`irs-penalty-relief`, `payroll-taxes-941-940`) concern business deposits only and are unchanged.
- **`what-is-w2`:**
  - Box 4: 2025 = $10,918.20 (6.2% × $176,100); 2026 = $11,439 (6.2% × $184,500), per employer.
  - Box 6: the employer withholds the 0.9% Additional Medicare Tax on wages above $200,000 regardless of filing status. Liability thresholds are $250,000 MFJ, $125,000 MFS and $200,000 for all others. Form 8959.
  - Box 12: added codes TP, TT and TA, both in the box row and in the code table.
  - Box 14: 14a (Other) and 14b (up to two Treasury Tipped Occupation Codes; "000" for a nonqualifying occupation).
- **`business-deductions`:**
  - $5,000 deduction, reduced dollar for dollar above $50,000 and zero at $55,000.
  - The remainder is amortized over 180 months, starting with the month the active business begins.
  - §195 start-up costs, §248 corporate organizational costs and §709 partnership organizational costs are kept as separate categories. Syndication costs are not deductible or amortizable.
  - Example: $52,000 of start-up costs → $3,000 deduction, with $49,000 amortized over 180 months.
- **`irs-notice`:** the CP504 row now covers:
  - the CP504 notice of intent to levy, including state tax refund levies;
  - the Final Notice of Intent to Levy and Notice of Your Right to a Hearing (LT11 / Letter 1058), usually sent at least 30 days before most other levies;
  - CDP hearing rights and exceptions (for example a state tax refund levy, with hearing rights afterward).
  - The localized Chinese-only row is preserved.
- **`education-tax-credits`:** the 404 source was replaced with IRS "Qualified education expenses".
- **`foreign-earned-income-exclusion`:** the final 2026 Form 2555 and instructions replace the draft source and wording; the amounts are unchanged.
- **`schedule-c-guide`:** the final 2026 Schedule C form is noted. The 2026 instructions are still not final and are not called final.
- **`payroll-taxes-941-940`:** the IRS **draft** 2026 Form 940 instructions and **draft** 2026 Schedule A are cited, explicitly labeled draft (section 6).
- **Redirected sources:** 28 guide pairs (section 7).
- **Review dates:**
  - `foreign-earned-income-exclusion` and `payroll-taxes-941-940` moved from October 2026 to November 2026, per the convention in `lib/article-date-backfill.js` (month of the most recent substantive content update).
  - No pending date was backfilled; 77 remain pending.
  - Link-only changes did not change any date.

## 5. Sources consulted

Each was checked on November 19, 2026; IRS update or revision dates are shown where given.

- IRS — EFTPS (updated November 10, 2026): https://www.irs.gov/payments/eftps-the-electronic-federal-tax-payment-system
- IRS — 2026 General Instructions for Forms W-2 and W-3: https://www.irs.gov/pub/irs-pdf/iw2w3.pdf
- IRS — Publication 15 (2026): https://www.irs.gov/publications/p15
- IRS — Topic no. 560, Additional Medicare Tax (November 9, 2026): https://www.irs.gov/taxtopics/tc560
- IRS — Publication 583 (Rev. December 2024): https://www.irs.gov/publications/p583
- IRS — 2025 Instructions for Form 4562: https://www.irs.gov/pub/irs-pdf/i4562.pdf
- IRS — 2025 Instructions for Form 1065, for syndication costs
- IRS — Publication 594 (Rev. January 2026): https://www.irs.gov/pub/irs-pdf/p594.pdf
- IRS — Understanding your CP504 notice (December 2025)
- IRS — Understanding your LT11 notice or Letter 1058 (January 30, 2026)
- IRS — Qualified education expenses (November 18, 2026): https://www.irs.gov/credits-deductions/individuals/qualified-education-expenses
- IRS — final 2026 Form 2555 and instructions (posted November 5, 2026): https://www.irs.gov/pub/irs-pdf/i2555.pdf
- IRS — final 2026 Schedule C (posted October 29, 2026). The posted `i1040sc.pdf` is still the 2025 edition.
- IRS — Rev. Proc. 2026-35, §3.52: https://www.irs.gov/pub/irs-drop/rp-26-35.pdf
- IRS — December 2026 Instructions for Forms 1099-MISC and 1099-NEC
- IRS — draft 2026 Form 940 instructions (November 18, 2026) and draft 2026 Schedule A (Form 940) (November 19, 2026)

Federal statutes (§§195, 248, 709, 6330, 6331, 6041, 6041A) could not be fetched here because Congress.gov and eCFR are blocked. The corrections rely on the IRS publications and instructions above.

## 6. Deferred items and draft dependencies

- **2027 §6041(a) threshold of $2,100 (P2-4): deferred.**
  - Rev. Proc. 2026-35 §3.52 covers §6041(a) only. The IRS PDF still carries "[Release Date, 2026]" placeholders.
  - No IRS source applies the figure to 1099-NEC or §6041A, and the December 2026 1099-MISC/NEC instructions tie attorneys' fees to §6041A(a)(1).
  - **Trigger:** the 2027 Form 1099-NEC instructions, Internal Revenue Bulletin publication of Rev. Proc. 2026-35, or other IRS guidance on §6041A.
- **FUTA 2026 California rate: draft only.**
  - The draft 2026 i940 (November 18) says California is the only 2026 credit-reduction state.
  - The draft 2026 Schedule A (November 19) gives California 0.015 (1.5%).
  - The posted final Schedule A is still the 2025 edition. The DOL site is blocked here. Secondary sources were not relied on.
  - The guide labels the figure as draft.
  - **Trigger:** the final 2026 Schedule A (Form 940) or the DOL determination. Then replace the draft wording and sources.
- **Draft-dependent guides (18):**
  - `adoption-tax-credit`, `alternative-minimum-tax`, `car-loan-interest-deduction`, `charitable-deduction-2026`, `child-dependent-care-credit`, `foreign-earned-income-exclusion` (now final)
  - `foreign-tax-credit`, `kiddie-tax`, `premium-tax-credit-form-8962`, `trump-accounts`, `investment-interest-expense`, `net-investment-income-tax`
  - `disaster-tax-relief`, `business-deductions`, `hobby-vs-business-income`, `payroll-taxes-941-940`, `qbi-deduction`, `schedule-c-guide` (form final, instructions not)
  - Most final 2026 forms are expected December 2026 – January 2027.

## 7. Redirected source URLs replaced

Each destination is on IRS.gov, returned 200, and was checked to support the claim it is cited for.

| Old URL (IRS.gov) | New URL | Guides (EN+ZH) |
|---|---|---|
| `/businesses/small-businesses-self-employed/do-you-need-a-new-ein` | `/businesses/small-businesses-self-employed/when-to-get-a-new-ein` | ein |
| `/newsroom/one-big-beautiful-bill-provisions` | `/newsroom/working-families-tax-cuts` | 529-plans, charitable-deduction-2026, child-dependent-care-credit, child-tax-credit, premium-tax-credit-form-8962, tax-law-changes-2025-2026 |
| `/taxtopics/tc607` | `/credits-deductions/individuals/adoption-credit` | adoption-tax-credit |
| `/credits-deductions/individuals/child-tax-credit` | `/credits-deductions/individuals/child-tax-credit-and-credit-for-other-dependents` | child-tax-credit, tax-credit-vs-deduction |
| `/filing/irs-free-file-do-your-taxes-for-free` | `/e-file-do-your-taxes-for-free` | first-time-filer (see the AGI note in section 3) |
| `/individuals/individual-taxpayer-identification-number` | `/tin/itin/individual-taxpayer-identification-number-itin` | itin, new-immigrant |
| `/individuals/international-taxpayers/resident-aliens` | `/individuals/international-taxpayers/us-residents` | 12 guides (worldwide income; green card and substantial presence tests) |
| `/retirement-plans/plan-participant-employee/retirement-savings-contributions-savers-credit` | `/retirement-plans/plan-participant-employee/retirement-savings-contributions-credit-savers-credit` | tax-credit-vs-deduction |
| `/businesses/small-businesses-self-employed/digital-assets` | `/filing/digital-assets` | form-1099-da |
| `/identity-theft-fraud-scams/identity-and-tax-return-verification-service` | `/identity-theft-fraud-scams/verify-your-return` | irs-identity-verification-letters |
| `/privacy-disclosure/report-phishing` | `/help/report-fraud/report-fake-irs-treasury-or-tax-related-emails-and-messages` | irs-notice |
| `/refunds/tax-season-refund-frequently-asked-questions` | `/refunds` (contains the refund-trace / Form 3911 guidance) | refund-offsets |

Source labels were updated where the IRS page title changed. No historical-year document was replaced.

## 8. Inaccessible sources (not verified, not removed, not assumed broken)

These hosts are blocked from the audit environment. The links were neither changed nor treated as broken.

- `https://www.fincen.gov/report-foreign-bank-and-financial-accounts`
- `https://www.fincen.gov/reporting-maximum-account-value`
- `https://www.fincen.gov/reporting-jointly-held-accounts`
- `https://www.fincen.gov/filing-spouse`
- `https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.350`
- `https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html`
- `https://fiscaldata.treasury.gov/datasets/treasury-reporting-rates-exchange/`

Also unreachable as primary sources: Congress.gov, the Federal Register, govinfo and the DOL (FUTA credit-reduction determinations).

## 9. Review-date backlog (77 entries, unchanged)

No date was backfilled. The grouping from the Phase 1 audit:

- **A — verified current in the audit (18):**
  - `irs-notice`, `llc-vs-scorp`, `do-i-need-to-file`, `crypto-tax`, `airbnb-tax-guide`, `tax-credit-vs-deduction`
  - `child-tax-credit`, `self-employment-tax`, `stock-sale-capital-gains`, `section-179-bonus-depreciation`, `form-3520`, `foreign-gift-over-100000`
  - `form-3520-multiple-gifts`, `form-3520-married-couples`, `14-day-rule`, `selling-your-home`, `home-office-deduction`, `capital-losses`
- **B — needed substantive correction (4), corrected in this batch:** `quarterly-taxes`, `what-is-w2`, `business-deductions`, `education-tax-credits`
- **C — depend on draft or proposed guidance (11):**
  - `trump-accounts`, `charitable-deduction-2026`, `child-dependent-care-credit`, `qbi-deduction`
  - `car-loan-interest-deduction`, `no-tax-on-tips`, `no-tax-on-overtime`
  - `senior-deduction`, `salt-deduction`, `tax-law-changes-2025-2026`, `schedule-c-guide`
- **D — date metadata only; not re-verified line by line (44):** the remaining entries in `lib/article-date-backfill.js`, including the 24 FBAR, foreign-account and foreign-gift guides whose FinCEN sources are unreachable here.

**Recommended policy (requires approval; not implemented):**
- A may receive the audit month.
- B may receive a date after its correction is released.
- C may receive a date after the final 2026 forms are checked.
- D may receive a date only after a recorded line-by-line review.
- Never use a git commit date as evidence of a legal review.

## 10. Next review triggers

- Final 2026 Schedule A (Form 940) or the DOL determination → `payroll-taxes-941-940`.
- 2027 Form 1099-NEC instructions, or IRS guidance on §6041A → the five P2-4 guides.
- Final 2026 instructions for Schedule C and for Forms 1040, 6251, 8962, 1116, 2441, 8615, 8814, 8995, 8960 and 5329 (expected December 2026 – January 2027) → the draft-dependent guides.
- IRS Free File opening for 2026 returns (January 2027) → `first-time-filer` AGI figure.
- Internal Revenue Bulletin publication of Rev. Proc. 2026-35.
- Any further IRS change to EFTPS or the individual payment options → `quarterly-taxes`.

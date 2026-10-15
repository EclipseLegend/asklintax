# Lina v2 Layer 2: proposed source approval (Phase 4.1, after the retrieval and applicability round)

> **Status update (Phase 4.1 staging-only activation):** all five hashes below are now recorded in `review.json` as `approved_staging` ("Approved for staging evaluation only." — technical approval for testing, not professional tax verification, not production approval). Reviewer: Effie (Phase 4.1 staging-only activation). There is no production approval (`approvedHash` is not set). The production index (`npm run build`) stays empty. The staging index (`LINA_OFFICIAL_INDEX=staging node scripts/build-lina-official.js` → `official-knowledge.staging.json`) serves the 22 reviewed excerpts; `ira-limit-2026` is still held. Chinese terms were updated to 個人醫療保險保障, 家庭醫療保險保障, 夫妻合併申報, 夫妻分開申報, 符合資格的尚存配偶 and 符合 IRA 供款規定的應稅工作所得.

**Original proposal (kept for the record; see the status update above).** At proposal time no snapshot was approved and the runtime index was empty. A source is served only after a person approves its exact hash with `scripts/lina-official/review.js` (`--approve-staging` for staging evaluation, `--approve` for production). Only the excerpts listed here are served; held excerpts are never served.

The machine-readable version, with excerpt boundaries, condition terms and applicability, is `proposed-approval.json`.

## 1. Sources, hashes, excerpts and applicability

| Source | Content hash (latest snapshot, pending) | Served excerpts | Held | Applicability |
|---|---|---|---|---|
| `irs-p969-2025` (Pub 969 (2025)) | `3a7dc8aa172d0df370e5ae6cc2a10119b3769f98f99713feacdde33674436c1b` | 9 | 0 | Tax year 2025 only (year-specific) |
| `irs-rp-2025-19` (Rev. Proc. 2025-19) | `9192eeda7ee1e4df66a5158dfd6cfab728f8b443fcd56417251727b34982b4e6` | 2 | 0 | Calendar year 2026 only |
| `irs-p590a-2025` (Pub 590-A (2025)) | `b7690c58aadf3c471addb59a25761ddb684cc2f8d8a2deaf9eb011cee52d0037` | 3 | 0 | Tax year 2025 only |
| `irs-n-2025-67` (Notice 2025-67) | `3c9cba4467b23bd4f24638b50b0fcf64027fe956ffc6e21084c3677c0ba9c4f1` | 1 (`roth-2026`) | 1 (`ira-limit-2026`) | 2026 only |
| `irs-i3520-2025-12` (Instructions for Form 3520, Rev. December 2025) | `594d05c8fa73ef7b92259c55b71ffdf4f9dee699b36ee2a85099928191bcb609` | 7 | 0 | Tax year 2025 onward, until a superseding revision (`effectiveFrom: 2025`, taken from the document's own continuous-use statement) |

### Changes since the previous proposal

- **Decision 3:** I removed Pub 969 `hdhp-2026` and `limit-2026`. The 2026 HSA and HDHP figures now come only from Rev. Proc. 2025-19 (`hsa-2026-amounts`). Pub 969 keeps 2025 eligibility, contribution rules and context.
- **Decision 1:** Notice `ira-limit-2026` ($7,500, plus $1,100 at age 50 or older) is now **held**, with reason `needs_supporting_authority` (see section 4).
- **Decision 2:** the 2026 single/HOH range ($153,000–$168,000) can't be applied to married filing separately. This is checked by the nearest label and by the clause (`noneOf`). For example, "MFS and did not live with your spouse, treated like a single filer, $153,000" is rejected.
- **Catch-up excerpt:** `catch-up-55` now starts at its "Additional contribution." heading. The text and conditions are otherwise unchanged.
- **Chinese terms:** the condition terms were reviewed (section 3).

The excerpt list is otherwise as in the earlier proposal. Pub 969 has eligibility, the 2025 HDHP table, coverage definitions, the 2025 limit, the partial-year and last-month rule, catch-up, multiple HSAs and married rules, employer contributions, and Medicare. Rev. Proc. has the 2026 amounts and effective date. Pub 590-A has 2025 Roth eligibility, the Roth-only limit and Table 2-1. The Notice has 2026 Roth. Form 3520 has the due date, continuous use, who must file for gifts, the §6039F penalty, U.S. person, Part IV reporting and the $5,000 rule. Exclusions and their reasons are unchanged and listed in the JSON.

## 2. Year-specific figures vs continuing rules (design)

- **A. Year-specific (default).** A `tax_year` source or excerpt applies only to its own tax year. A 2025 publication is never assumed valid for 2026.
  - Retrieval doesn't offer it for any other year.
  - The validator rejects it for another year (`tax_year_mismatch`).
- **B1. Effective period.** An `effective_period` source must state a verified `effectiveFrom`, and may state `effectiveThrough`. It applies to every year in that period.
  - For Form 3520 the period is 2025 onward, from "Use these instructions for tax year 2025 and subsequent years until a superseding revision is issued."
  - Tested: a 2026 question is accepted; a 2024 question is rejected.
- **B2. Continuing rule excerpt.** A `tax_year` excerpt can carry `continuing: { years, basis, verifiedBy }`.
  - All three fields are required.
  - The build refuses a continuing excerpt that contains a dollar amount or a rate (`continuing_rule_has_figures`), so a year-specific figure can't ride on it.
  - Tested with a fixture: rule text with continuing metadata answers 2026; the same text without it is rejected.
- **Pilot data marks no excerpt as continuing.** None of the 2025 rule excerpts has primary-source verification for 2026 yet. For example, Pub 969 (2025) itself notes that Public Law 119-21 amended §223. Whether any HSA eligibility rules change for 2026 has to be checked before marking them continuing.

## 3. Traditional Chinese terminology (condition terms, prompt and leftover-English polish)

| Concept | Terms used | Notes |
|---|---|---|
| Self-only coverage | 個人保障 (primary), 僅本人, 僅限本人, 本人保障, 單人保障, 個人投保 | Bare 本人 is not used (too common) |
| Family coverage | 家庭保障 (primary), 家庭投保, 家庭方案, 家庭計畫, 全家 | Bare 家庭 removed (too broad) |
| Married filing jointly | 夫妻合併申報 (primary); 合併申報 matches | QSS: 符合資格的尚存配偶 / 符合資格的未亡配偶 (**needs review**: which one matches IRS Chinese usage) |
| Married filing separately | 夫妻分開申報 (primary); 分開申報, 分別申報 | 分別申報 is also added to the filing-status list the validator uses |
| Lived with spouse | 與配偶同住, 和配偶同住, 跟配偶同住 | |
| Did not live with spouse | 未與配偶同住 (primary), 沒有與／和／跟配偶同住, 不與配偶同住, 未和配偶同住 | A term inside a longer term is ignored, so 未與配偶同住 never satisfies "lived with spouse" (tested) |
| Nonresident alien individual | 非居民外國人 | Existing site term |
| Foreign corporation / partnership | 外國公司, 外國企業, 海外公司 / 外國合夥（企業） | |
| Foreign trust | 外國信託, 海外信託 | |
| Foreign estate | 外國遺產 | |
| Taxable compensation | 應稅報酬 (primary), 報酬, 薪資, 工作收入 | |
| Reporting vs paying tax | 申報 (report/file) vs 繳稅 (pay tax) | Prompt rule 9 says filing Form 3520 is not paying tax, and the model must never say tax is owed unless a source does |

## 4. Missing official authority

### `ira-limit-2026` ($7,500 and $1,100), held

The Notice states "the deductible amount under section 219(b)(5)(A) … is increased from $7,000 to $7,500", plus $1,100 for individuals who attained age 50 before the end of the taxable year. Before this can be used as the 2026 IRA or Roth IRA contribution limit, the following must be verified. The descriptions say what to check; I haven't verified them and they aren't served.

1. IRC §219(b)(1): the limit is the lesser of the §219(b)(5)(A) amount or compensation includible in gross income.
2. IRC §408A(c)(2): the Roth IRA limit is tied to §219(b)(1), reduced by contributions to other IRAs and subject to the §408A(c)(3) phase-out.
3. An approved IRS 2026 source that states the IRA and Roth IRA contribution limit together with its compensation condition. Candidates are an IRS 2026 cost-of-living news release or Pub 590-A (2026) when it's published.

No URL has been fetched or added. The candidate URLs need your approval.

### Other gaps

- **2026 MFS who did not live with their spouse:** no 2026 source supports applying the single/HOH range, so Lina rejects that use (decision 2).
- **HSA rules for 2026:** the $1,000 catch-up, the married rules and the eligibility rules are 2025-only until a 2026 source, or verified continuing metadata, is approved.

## 5. Source-conflict classification (unchanged)

None of these is an actual contradiction:

- Different tax years: Pub 969 / Pub 590-A (2025) vs Rev. Proc. / Notice (2026).
- Prior-year "increased from" values in the Notice, which are not citable.
- A document typo in Pub 590-A "What's New for 2026" ("$252,0000"), which is excluded.
- An extraction error (fixed earlier; the Notice was re-fetched and its text is identical).
- Different applicability: §6039F gift penalty vs §6677 trust penalty; $100,000 for individuals and estates vs the §6039F threshold for corporations and partnerships.

## 6. Remaining risks

- The retrieval concepts are hand-written. A paraphrase outside the tested set can still miss, which fails safe: no official evidence, and the library or "insufficient" answers instead. A broad question can also pull in a related-but-unneeded excerpt (e.g. the §6039F penalty for "Do I need to report?"). That's harmless to figures, because the validator still enforces each figure's conditions.
- A domestic question such as "gift from my U.S. citizen father" still retrieves Form 3520 excerpts (U.S. person and reporting scope). It's relevant context, not a figure risk.
- The nearest-label check works within a clause. Writing that merges two statuses into one clause is rejected (conservative), and some correct answers may be refused.
- The Chinese condition terms need a native-speaker tax review, especially the QSS term and 個人保障.

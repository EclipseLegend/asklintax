# AskLinTax Project Instructions

- The production primary domain is https://asklintax.com.
- www.asklintax.com is currently redirected to the primary domain by Netlify Domain Management. Do not change domain or redirect behavior without explicit approval.
- RESOLVED URL DECISION: /library/investment/ (singular) is the permanent canonical structure. Never change it to /library/investments/ (plural). The plural /library/investments/* 301-redirects to /library/investment/* via netlify.toml; keep that rule above the catch-all 404 rule. Details are in README.md.
- Every published Knowledge Library article must be registered exactly once in lib/articles.js (categories and curation live in lib/categories.js). Never add planned/unpublished articles or link to nonexistent URLs. The build runs scripts/validate-articles.js and fails on any mismatch — fix the index, never bypass the validator.
- English is currently the master/source language.
- Do not publish hreflang URLs for translations that do not actually exist.
- Preserve existing public URLs and SEO whenever possible.
- Do not begin a major multilingual, MDX, dynamic-routing, or content-architecture refactor without explicit approval.
- Do not commit or push unless explicitly asked.

## Overnight Workflow

These rules apply to unattended/overnight tasks unless the task explicitly says otherwise. The project rules above always apply.

### 1. Default permissions
Overnight work may: inspect and audit the repository; research within the sources the task permits; edit files within the explicitly approved scope; run builds and validators; test links, canonicals, sitemap and console behavior; generate screenshots; review git diffs; and fix low-risk implementation problems clearly within the approved scope.

Do not stop for minor implementation questions when a conservative solution exists within scope. If one item needs a decision, record it and continue any independent work it does not block.

### 2. Git safety
Default: **edit allowed · commit not allowed · push not allowed.** Commit or push only when the task explicitly grants it. Never force push, amend an existing commit, change Git identity, or create/switch branches unless explicitly instructed.

### 3. Changes that require explicit approval
Do not independently make any of the following — record them as **DECISION REQUIRED** instead:
- public URL, canonical URL, or redirect architecture changes
- category/taxonomy architecture changes
- deleting published articles
- major Next.js, content, or multilingual architecture changes (see project rules above)
- new dependencies or external services
- authentication/client-portal or AI architecture changes
- destructive data changes
- broad redesigns outside the task scope

### 4. Tax accuracy
Never change tax-law facts, thresholds, deadlines, dollar amounts, tax-year rules, or filing requirements based on model memory alone.
- Federal: verify against primary sources — IRS, Congress.gov / enacted federal law, and official Treasury/regulatory material when relevant.
- California: verify against the Franchise Tax Board or other directly relevant official California government sources.
- Secondary sources may flag an issue but must not be the sole authority for a correction.
- If sources conflict, the issue is ambiguous, or interpretation is required: do not guess — document the evidence and mark **DECISION REQUIRED**.
- Keep the tax year attached to every claim. Never silently replace a 2025 rule with a 2026 rule, or vice versa.

### 5. SEO and Knowledge Library safety
In addition to the URL, investment-path, hreflang, and English-source rules above: never create fake or placeholder pages just to eliminate dead links.

### 6. Scope discipline
Do not turn a narrow task into general cleanup or fix unrelated issues because they were discovered — list them under Findings in the report instead. Normal prose that resembles a taxonomy label is not a taxonomy error.

### 7. End-of-run verification
After application or content changes, run the checks that apply: production build, `scripts/validate-articles.js` (runs in `npm run build`), sitemap count, dead-link scan, canonical verification, console/hydration check, `git diff`, `git status`. Compare important counts against the task's stated baseline — never assume a changed count is correct.

### 8. Morning report
Finish with a concise report, then stop (do not begin another phase):

```
ASKLINTAX OVERNIGHT REPORT
Baseline
Completed
Findings
Changes
Evidence / authoritative sources (when applicable)
Verification
Screenshots (only when useful)
Needs Effie Decision
Git status
```

End with exactly one readiness state: `READY FOR REVIEW` or `NOT READY — [brief reason]`.

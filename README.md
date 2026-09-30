# AskLinTax

The trusted U.S. tax knowledge platform for Chinese families and small businesses.

---

## ✅ RESOLVED — Investment category URL (was: "INVESTMENT CATEGORY URL DECISION REQUIRED")

> **Status: RESOLVED (2026-09-29). Do not change this structure.**

- **Permanent structure:** `/library/investment/` (singular). The folder is `pages/library/investment/`:
  - `/library/investment/crypto-tax/`
  - `/library/investment/fbar/`
- **Legacy/plural structure:** `/library/investments/*` **redirects permanently (301) to** `/library/investment/*`,
  preserving the rest of the path. The rule is in `netlify.toml`, above the catch-all 404 rule.
- All internal links, `categoryHref` values, and the Footer use `/library/investment`.
- **Decision basis (Google Search Console, checked before the change):**
  - `/library/investment/crypto-tax/`: "Discovered – currently not indexed", found via `sitemap.xml`
  - `/library/investments/crypto-tax/`: "URL is unknown to Google"
- **Follow-up:** re-check Google Search Console after deployment.
- **Do not** create pages under `/library/investments/` or switch links back to the plural form.

---

## Tech Stack

- **Framework:** Next.js 14 (Pages Router, static export)
- **Deployment:** Netlify (auto-deploy via GitHub)
- **Styling:** CSS Modules + global CSS variables

## Project Structure

```
asklintax/
├── components/          # Shared components (Header, Footer, Layout, KnowledgePage)
├── content/             # Content suites for Foundation 20 (YouTube scripts, Shorts, 小紅書)
├── lib/                 # Utilities (useTranslation hook)
├── locales/             # i18n strings (en, zh-TW)
│   ├── en/
│   └── zh-TW/
├── pages/               # All routes
│   ├── index.js         # Homepage
│   ├── start.js         # Start Here
│   ├── about.js         # About
│   └── library/
│       ├── irs/
│       │   └── irs-notice.js        # F-01
│       └── business-formation/
│           ├── llc-basics.js        # F-02
│           └── llc-vs-scorp.js      # F-03
├── styles/
│   └── globals.css      # Design tokens + shared utility classes
├── next.config.js
├── netlify.toml
└── package.json
```

## Foundation 20 Progress

| # | Title | Status |
|---|---|---|
| F-01 | I received an IRS letter — what do I do? | ✅ Live |
| F-02 | What is an LLC and do I need one? | ✅ Live |
| F-03 | LLC vs S-Corp: which is right for your business? | ✅ Live |
| F-04 | New immigrant complete tax guide | ⬜ Pending |
| F-05 | Am I a U.S. tax resident? | ⬜ Pending |
| F-06 | Do I need to file a tax return? | ⬜ Pending |
| F-07 | First-time filer complete guide | ⬜ Pending |
| F-08 | Tax credit vs tax deduction | ⬜ Pending |
| F-09 | What is a W-2 and how do I read it? | ⬜ Pending |
| F-10 | W-2 vs 1099: what's the difference? | ⬜ Pending |
| F-11 | Airbnb host tax guide | ⬜ Pending |
| F-12 | The 14-day rule explained | ⬜ Pending |
| F-13 | Quarterly estimated taxes explained | ⬜ Pending |
| F-14 | What can I deduct as a small business owner? | ⬜ Pending |
| F-15 | How to apply for an EIN | ⬜ Pending |
| F-16 | CP2000 notice explained | ⬜ Pending |
| F-17 | Child Tax Credit: who qualifies | ⬜ Pending |
| F-18 | ITIN: what it is and how to apply | ⬜ Pending |
| F-19 | Crypto taxes explained | ⬜ Pending |
| F-20 | FBAR: do I need to file? | ⬜ Pending |

## Knowledge Library article index (required)

**Every published Knowledge Library article must be registered in `lib/articles.js`** — exactly once,
with its real path, title, difficulty, and read time. Categories, category curation, and the Library
Essentials live in `lib/categories.js`. The Library, category pages, and search read only from these files.

- Never add planned or unpublished articles to the index, and never link to URLs that don't exist.
- Tax year and review date come from `lib/tax-config.js`, not from the index.
- `npm run build` runs `scripts/validate-articles.js` after `next build`. It **fails the build** if the
  index and the real pages disagree (unregistered article, missing page, title/difficulty/read-time
  mismatch, duplicate id or path, unknown category, or a curated id that doesn't exist).

**Adding a new article:** create the page under `pages/library/<category>/<slug>.js`, add its entry to
`lib/articles.js`, then run `npm run build` and fix anything the validator reports.

## Development

```bash
npm install
npm run dev      # localhost:3000
npm run build    # next build → out/, then postbuild: validate-articles → generate-sitemap
```

## Deployment

Push to `main` branch → Netlify auto-builds and deploys.

Build command: `npm run build`
Publish directory: `out`

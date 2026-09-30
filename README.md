# AskLinTax

The trusted U.S. tax knowledge platform for Chinese families and small businesses.

---

## ⚠️ OPEN SEO TODO — INVESTMENT CATEGORY URL DECISION REQUIRED

> **Status: UNRESOLVED. Do not rename, redirect, or canonicalize anything below until this decision is made by the site owner.**

**Current situation**
- Actual pages currently use **`/library/investment/`** (singular) — the folder is `pages/library/investment/`:
  - `/library/investment/crypto-tax/`
  - `/library/investment/fbar/`
- Some internal links use **`/library/investments/`** (plural), which currently returns 404. They come from:
  - `pages/index.js` (Popular Guides, Start Here cards)
  - `pages/start.js`
  - `pages/library/investment/crypto-tax.js` and `fbar.js` (`categoryHref`, Related guides)
  - `pages/library/individual/new-immigrant.js` (Related guides)
  - `components/Footer.js` (Investments & Crypto link)
- The generated sitemap lists the singular URLs, because those are the pages that actually exist.

**Before changing this:**
1. Check Google Search Console for both URL patterns.
2. Determine whether either version has been indexed or received impressions/clicks.
3. Choose one permanent URL structure.
4. Update all internal links to the chosen structure.
5. Add 301 redirects from the losing structure to the chosen structure.
6. Update sitemap generation if necessary.
7. Verify canonical tags.
8. Re-check Google Search Console after deployment.

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

## Development

```bash
npm install
npm run dev      # localhost:3000
npm run build    # generates out/ folder
```

## Deployment

Push to `main` branch → Netlify auto-builds and deploys.

Build command: `npm run build`
Publish directory: `out`

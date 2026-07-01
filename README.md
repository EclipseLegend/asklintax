# AskLinTax

The trusted U.S. tax knowledge platform for Chinese families and small businesses.

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

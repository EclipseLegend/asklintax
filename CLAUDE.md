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

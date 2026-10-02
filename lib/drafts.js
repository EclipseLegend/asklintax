/**
 * AskLinTax — DRAFT Knowledge Library guides (not published).
 *
 * Publication standard:  DRAFT → official primary-source verification → OFFICIAL-SOURCE VERIFIED → PUBLISHED
 *
 * A draft guide is kept out of every public surface until it has been verified against the
 * applicable official government sources:
 *   - its page file lives in drafts/library/<category>/<slug>.js (outside pages/, so Next.js builds
 *     no route — imports work unchanged because the folder depth matches pages/library/), and
 *   - its metadata lives here, not in lib/articles.js — so it is not in Library or category listings,
 *     search, Start Here, the sitemap, or Lina's knowledge index.
 * scripts/validate-articles.js enforces this on every build.
 *
 * To publish a draft once its official-source verification is complete:
 *   1. In the page file, keep META.sources (official government sources only) and set
 *      META.verification to 'official-sources-verified'. Move the file from drafts/library/... to
 *      pages/library/... (same relative path).
 *   2. Move its entry from DRAFT_ARTICLES to lib/articles.js with status: 'official-sources-verified'
 *      (drop draftFile), and its entry from DRAFT_ARTICLES_ZH_TW to ARTICLES_ZH_TW in lib/library-zh-tw.js.
 *   3. Add category curation (lib/categories.js) and cross-links as appropriate, then build.
 *
 * Fields are the same as lib/articles.js, plus:
 *   status     'draft'
 *   draftFile  Repo path of the draft page file.
 */

const DRAFT_ARTICLES = []

// Traditional Chinese display metadata for drafts (moves to lib/library-zh-tw.js on publication).
const DRAFT_ARTICLES_ZH_TW = {}

module.exports = { DRAFT_ARTICLES, DRAFT_ARTICLES_ZH_TW }

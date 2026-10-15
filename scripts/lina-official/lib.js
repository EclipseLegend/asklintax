/**
 * Lina v2 — Layer 2 (curated official sources): shared OFFLINE workflow logic.
 *
 * Used by the development scripts only (fetch.js, review.js, ../build-lina-official.js) and the offline tests.
 * Nothing here runs in the Netlify Function: Lina reads only the built, review-approved index.
 *
 * Trust model
 *   1. data/lina-official/sources.json is the ONLY list of URLs that may be fetched, and only entries marked
 *      urlApproved:true (approved by a person) are fetched.
 *   2. Fetching: https only, approved hosts only (pilot: www.irs.gov), every redirect hop re-checked (max 3),
 *      timeout, size cap, content type must match the manifest (html | pdf).
 *   3. Extracted text is UNTRUSTED DATA: it is stored verbatim (quotes must match it) and is never executed or
 *      followed; the runtime wraps it in delimiters it cannot forge.
 *   4. Every snapshot is content-hashed. review.json records which hash a person approved. A new or changed
 *      snapshot is "pending" and is NOT served until a person approves that exact hash.
 */

const crypto = require('crypto')
const { execFile } = require('child_process')

// Pilot: only these hosts may be fetched (narrower than the runtime OFFICIAL_DOMAINS allowlist).
const FETCH_HOSTS = ['www.irs.gov', 'irs.gov']
const MAX_REDIRECTS = 3
const TIMEOUT_MS = 15000
const MAX_BYTES = 5 * 1024 * 1024
const MAX_PASSAGE = 3500
const YEAR_SCOPES = ['tax_year', 'effective_period', 'stable']
const REVIEW_STATUSES = ['pending', 'approved', 'approved_staging', 'changed', 'rejected', 'superseded']
// Build targets. "production" serves only full approvals ("approved"). "staging" also serves "approved_staging"
// (Phase 4.1: "Approved for staging evaluation only" — technical approval for testing, not professional tax
// verification and not approval for production). A staging approval can never reach a production build.
const TARGETS = ['production', 'staging']
const STAGING_NOTE = 'Approved for staging evaluation only.'

// ── URL checks ───────────────────────────────────────────

function fetchableUrl(url, hosts = FETCH_HOSTS) {
  let u
  try { u = new URL(String(url)) } catch { return null }
  if (u.protocol !== 'https:' || u.username || u.password || u.port) return null
  if (!hosts.includes(u.hostname.toLowerCase())) return null
  u.hash = ''
  return u
}

// ── Fetch with manual, re-validated redirects ────────────

async function readLimited(res, maxBytes) {
  const declared = Number(res.headers.get('content-length') || 0)
  if (declared > maxBytes) throw new Error('too_large')
  if (!res.body || !res.body.getReader) {
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length > maxBytes) throw new Error('too_large')
    return buf
  }
  const reader = res.body.getReader()
  const chunks = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.length
    if (total > maxBytes) { try { await reader.cancel() } catch {} throw new Error('too_large') }
    chunks.push(Buffer.from(value))
  }
  return Buffer.concat(chunks)
}

/**
 * Fetches one manifest URL. Returns { finalUrl, contentType, body: Buffer, lastModified, redirects: [] }.
 * Throws Error(code) with code in: url_not_allowed | redirect_not_allowed | too_many_redirects | http_<status> |
 * timeout | too_large | content_type_mismatch | network_error.
 */
async function safeFetch(url, { format, fetchImpl = fetch, hosts = FETCH_HOSTS, timeoutMs = TIMEOUT_MS, maxBytes = MAX_BYTES } = {}) {
  let current = fetchableUrl(url, hosts)
  if (!current) throw new Error('url_not_allowed')
  const redirects = []
  for (let hop = 0; ; hop++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let res
    try {
      res = await fetchImpl(current.href, { redirect: 'manual', signal: controller.signal, headers: { 'User-Agent': 'AskLinTax-Lina-official-source-review/1.0 (offline)', Accept: format === 'pdf' ? 'application/pdf' : 'text/html' } })
    } catch (err) {
      clearTimeout(timer)
      throw new Error(err && err.name === 'AbortError' ? 'timeout' : 'network_error')
    }
    try {
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location')
        let next = null
        try { next = loc ? new URL(loc, current) : null } catch { next = null }
        const ok = next && fetchableUrl(next.href, hosts)
        if (!ok) throw new Error('redirect_not_allowed')
        if (hop + 1 > MAX_REDIRECTS) throw new Error('too_many_redirects')
        redirects.push(ok.href)
        current = ok
        continue
      }
      if (res.status !== 200) throw new Error(`http_${res.status}`)
      const contentType = String(res.headers.get('content-type') || '').toLowerCase()
      const want = format === 'pdf' ? /^application\/pdf\b/ : /^text\/html\b/
      if (!want.test(contentType)) throw new Error('content_type_mismatch')
      const body = await readLimited(res, maxBytes)
      return { finalUrl: current.href, contentType, body, lastModified: res.headers.get('last-modified') || '', redirects }
    } catch (err) {
      if (err && err.name === 'AbortError') throw new Error('timeout')
      throw err
    } finally {
      clearTimeout(timer)
    }
  }
}

// ── Text extraction ──────────────────────────────────────

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“').replace(/&amp;/g, '&')
}

// "Page Last Reviewed or Updated: 12-Jan-2026" (IRS pages) → "2026-01-12"
function pageReviewedDate(text) {
  const m = /Page Last Reviewed or Updated:\s*(\d{1,2})-([A-Za-z]{3})-(\d{4})/.exec(text)
  if (!m) return ''
  const mon = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(m[2].toLowerCase())
  return mon < 0 ? '' : `${m[3]}-${String(mon + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`
}

/**
 * HTML → { title, reviewedDate, passages: [{ location, text }] }. Scripts, styles, navigation, header/footer and
 * forms are dropped; the main content is used when it can be found. Headings (h2–h4) start passages and give each
 * its location; table rows become "cell | cell" lines (so table logic in verify.js applies); long sections are split
 * on line boundaries.
 */
function extractHtml(html) {
  const raw = String(html)
  const title = decode((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(raw) || [])[1] || '').replace(/\s+/g, ' ').replace(/\s*\|\s*Internal Revenue Service\s*$/i, '').trim()
  let body = raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|template|svg|iframe|form|nav|header|footer|aside|button|select)\b[\s\S]*?<\/\1>/gi, '')
  const main = /<main\b[\s\S]*?<\/main>/i.exec(body)
  if (main) body = main[0]
  // Line breaks in the HTML SOURCE are formatting, not text structure: only tags decide where lines break.
  body = body.replace(/\s+/g, ' ')
  // Tables become one line per row, "cell | cell | cell". A cell spanning several rows (rowspan) is repeated on each
  // row it covers, so every row names its own filing status / category (IRS tables group rows this way).
  body = body.replace(/<table\b[\s\S]*?<\/table>/gi, tableToLines)
  // Table of contents: list items that are only an in-page link ("#…"), possibly followed by a nested list. Links
  // inside sentences (cross-references) are kept.
  body = body.replace(/<li\b[^>]*>\s*<a\b[^>]*href="#[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '<li>')
  const reviewedDate = pageReviewedDate(decode(raw.replace(/<[^>]+>/g, ' ')))
  // Heading level: IRS publication pages mark the real structure with classes role-hd1/2/3 (usually on <h4>);
  // otherwise the tag level is used. "Caution:" / "Tip:" / "Note:" headings are inline callout labels, not sections.
  const marked = body
    .replace(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, tag, attrs, inner) => {
      const text = decode(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
      if (!text) return '\n'
      const role = /role-hd(\d)/.exec(attrs)
      // A short heading ending in ":" without a structural role ("Caution:", "Tip:", "Recordkeeping:") is a label.
      if (!role && /:$/.test(text) && text.split(' ').length <= 3) return `\n${text}\n`
      const level = role ? Math.min(6, Number(role[1]) + 2) : Math.max(2, Number(tag))
      return `\n\u0001${level}${text}\n`
    })
    .replace(/<\/(td|th)>/gi, ' | ')
    .replace(/<\/(p|li|tr|h1|div|dt|dd|table|section|blockquote|pre)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
  const lines = decode(marked).split('\n').map(l => l.replace(/[ \t ]+/g, ' ').replace(/\s*\|\s*$/, '').trim()).filter(Boolean)
  const passages = []
  const path = []
  let buf = []
  const flush = () => {
    const text = buf.join('\n').trim()
    buf = []
    if (!text) return
    const location = path.filter(Boolean).join(' › ') || '(top)'
    for (const part of splitLong(text)) passages.push({ location, text: part })
  }
  for (const line of lines) {
    if (line.startsWith('\u0001')) {
      flush()
      const level = Number(line[1])
      path.length = Math.max(0, level - 2)
      path[level - 2] = line.slice(2)
      continue
    }
    if (/^Page Last Reviewed or Updated:/i.test(line)) continue
    buf.push(line)
  }
  flush()
  // Number repeated locations "(part 1)", "(part 2)" … — counted before any label is changed.
  const total = new Map(), seen = new Map()
  for (const p of passages) total.set(p.location, (total.get(p.location) || 0) + 1)
  for (const p of passages) {
    if (total.get(p.location) < 2) continue
    const n = (seen.get(p.location) || 0) + 1
    seen.set(p.location, n)
    p.location = `${p.location} (part ${n})`
  }
  return { title, reviewedDate, passages }
}

function tableToLines(table) {
  const cellText = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
  const carry = [] // per column: { text, left } from a rowspan cell above
  const lines = []
  for (const tr of table.match(/<tr\b[\s\S]*?<\/tr>/gi) || []) {
    const cells = [...tr.matchAll(/<t([dh])\b([^>]*)>([\s\S]*?)<\/t\1>/gi)].map(m => ({ text: cellText(m[3]), span: Math.min(50, Math.max(1, parseInt((/rowspan="?(\d+)/i.exec(m[2]) || [])[1] || '1', 10))) }))
    const row = []
    let col = 0
    const take = () => { while (carry[col] && carry[col].left > 0) { row.push(carry[col].text); carry[col].left--; col++ } }
    for (const c of cells) {
      take()
      row.push(c.text)
      carry[col] = c.span > 1 ? { text: c.text, left: c.span - 1 } : null
      col++
    }
    take()
    const line = row.filter((x, i) => x || i < row.length - 1).join(' | ').replace(/(\s*\|\s*)+$/, '')
    if (line.replace(/[|\s]/g, '')) lines.push(line)
  }
  return lines.map(l => `<p>${l.replace(/</g, '&lt;')}</p>`).join('')
}

function splitLong(text, max = MAX_PASSAGE) {
  if (text.length <= max) return [text]
  const out = []
  let cur = ''
  for (const line of text.split('\n')) {
    if (cur && (cur.length + line.length + 1) > max) { out.push(cur); cur = '' }
    cur = cur ? `${cur}\n${line}` : line
    while (cur.length > max) { out.push(cur.slice(0, max)); cur = cur.slice(max) }
  }
  if (cur) out.push(cur)
  return out
}

// Group PDF lines ({ page, l }) into passages of at most MAX_PASSAGE characters, cut at sentence ends where possible.
function pdfPassages(lines, max = MAX_PASSAGE) {
  const passages = []
  let cur = []
  const size = () => cur.reduce((a, x) => a + x.l.length + 1, 0)
  const flush = () => {
    if (!cur.length) return
    const a = cur[0].page, b = cur[cur.length - 1].page
    passages.push({ location: a === b ? `page ${a}` : `pages ${a}–${b}`, text: cur.map(x => x.l).join('\n') })
    cur = []
  }
  for (const x of lines) {
    // Flush BEFORE a line that would push the passage over the limit (Phase 4.1 review: a 3,508-character passage
    // was produced when the line crossing the limit was kept), then prefer cutting at a sentence end.
    if (cur.length && size() + x.l.length > max) flush()
    cur.push(x)
    if (size() >= max * 0.85 && /[.:;]$/.test(x.l)) flush()
  }
  flush()
  return passages
}

/**
 * PDF → passages by page, using the system `pdftotext` (poppler) if installed. Offline workflow only; no npm
 * dependency. Runs without a shell, with a timeout and an output cap.
 */
function extractPdf(buffer, { timeoutMs = 30000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = execFile('pdftotext', ['-enc', 'UTF-8', '-layout', '-', '-'], { timeout: timeoutMs, maxBuffer: 20 * 1024 * 1024 }, (err, stdout) => {
      if (err) return reject(new Error(err.code === 'ENOENT' ? 'pdf_extractor_unavailable' : 'pdf_extract_failed'))
      // Pages are joined (a sentence may cross a page break); lines that are only a page number ("2", "-2-") are
      // dropped; passages are cut at sentence ends and labelled with the pages they span.
      const lines = []
      String(stdout).split('\f').forEach((page, i) => {
        for (const raw of page.split('\n')) {
          const l = raw.replace(/\s+/g, ' ').trim()
          if (!l || /^-?\s*\d{1,3}\s*-?$/.test(l)) continue
          lines.push({ page: i + 1, l })
        }
      })
      const passages = pdfPassages(lines)
      resolve({ title: '', reviewedDate: '', passages })
    })
    child.stdin.end(buffer)
  })
}

// ── Hashing, metadata validation ─────────────────────────

const excerptHash = text => crypto.createHash('sha256').update(String(text)).digest('hex')
const contentHash = passages => crypto.createHash('sha256').update(JSON.stringify(passages.map(p => [p.location, p.text]))).digest('hex')

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/
const ISO_MONTH_OR_DATE = /^\d{4}-\d{2}(-\d{2})?$/ // a revision may be known only to the month ("Revised: 12/2025")

// Returns a list of problems ([] = valid). A source with any problem is never built into the index.
function validateManifestEntry(e) {
  const p = []
  if (!e || typeof e !== 'object') return ['not_an_object']
  if (!/^[a-z0-9][a-z0-9-]{2,60}$/.test(String(e.id || ''))) p.push('bad_id')
  if (!fetchableUrl(e.url)) p.push('url_not_allowed')
  if (!['html', 'pdf'].includes(e.format)) p.push('bad_format')
  if (typeof e.title !== 'string' || !e.title.trim()) p.push('missing_title')
  if (typeof e.publisher !== 'string' || !e.publisher.trim()) p.push('missing_publisher')
  if (!YEAR_SCOPES.includes(e.yearScope)) p.push('bad_year_scope')
  if (e.yearScope === 'tax_year' && !/^(19|20)\d\d$/.test(String(e.taxYear || ''))) p.push('missing_tax_year')
  if (e.yearScope === 'effective_period' && (typeof e.effectivePeriod !== 'string' || !e.effectivePeriod.trim())) p.push('missing_effective_period')
  if (e.revisionDate && !ISO_MONTH_OR_DATE.test(e.revisionDate)) p.push('bad_revision_date')
  // A continuing (effective-period) source must state its verified first year; a last year is optional (open period).
  if (e.yearScope === 'effective_period' && !/^(19|20)\d\d$/.test(String(e.effectiveFrom || ''))) p.push('missing_effective_from')
  if (e.effectiveThrough !== undefined && (!/^(19|20)\d\d$/.test(String(e.effectiveThrough)) || Number(e.effectiveThrough) < Number(e.effectiveFrom))) p.push('bad_effective_through')
  if (e.selections !== undefined) {
    if (!Array.isArray(e.selections) || !e.selections.length) p.push('bad_selections')
    else for (const x of e.selections) {
      if (!x || !/^[a-z0-9][a-z0-9-]{1,40}$/.test(String(x.id || '')) || typeof x.location !== 'string' || typeof x.start !== 'string' || !x.start.trim() || typeof x.end !== 'string' || !x.end.trim()) { p.push(`bad_selection:${x && x.id}`); continue }
      if (x.requires !== undefined && (!Array.isArray(x.requires) || x.requires.some(t => typeof t !== 'string' || !t.trim()))) p.push(`bad_requires:${x.id}`)
      if (x.taxYear !== undefined && !/^(19|20)\d\d$/.test(String(x.taxYear))) p.push(`bad_selection_year:${x.id}`)
      if (x.hold !== undefined && (!x.hold || typeof x.hold.reason !== 'string' || !x.hold.reason.trim())) p.push(`bad_hold:${x.id}`)
      // A continuing rule needs explicit, reviewed applicability: years, the basis (where the authority says so) and who verified it.
      if (x.continuing !== undefined && (e.yearScope !== 'tax_year' || !x.continuing || !Array.isArray(x.continuing.years) || !x.continuing.years.length ||
        x.continuing.years.some(y => !/^(19|20)\d\d$/.test(String(y))) || typeof x.continuing.basis !== 'string' || !x.continuing.basis.trim() ||
        typeof x.continuing.verifiedBy !== 'string' || !x.continuing.verifiedBy.trim())) p.push(`bad_continuing:${x.id}`)
      if (x.conditions !== undefined && (!Array.isArray(x.conditions) || x.conditions.some(c => !c || typeof c.figure !== 'string' || !c.figure.trim() || ['anyOf', 'noneOf', 'exclusiveWith'].some(k => c[k] !== undefined && (!Array.isArray(c[k]) || c[k].some(t => typeof t !== 'string' || !t.trim()))) || (c.exclusiveWith && !(c.anyOf || []).length)))) p.push(`bad_conditions:${x.id}`)
    }
  }
  if (typeof e.topic !== 'string' || !e.topic.trim()) p.push('missing_topic')
  if (e.sections !== undefined && (!Array.isArray(e.sections) || e.sections.some(x => typeof x !== 'string' || !x.trim()))) p.push('bad_sections')
  return p
}

function validateSnapshot(s, entry) {
  const p = []
  if (!s || typeof s !== 'object') return ['not_an_object']
  if (s.sourceId !== entry.id) p.push('source_mismatch')
  if (!fetchableUrl(s.finalUrl)) p.push('final_url_not_allowed')
  if (!ISO_DATE.test(String(s.retrievedAt || ''))) p.push('bad_retrieved_at')
  if (!Array.isArray(s.passages) || !s.passages.length) p.push('no_passages')
  else if (s.passages.some(x => !x || typeof x.text !== 'string' || !x.text.trim() || x.text.length > MAX_PASSAGE || typeof x.location !== 'string' || !x.location)) p.push('bad_passage')
  if (!p.length && contentHash(s.passages) !== s.contentHash) p.push('hash_mismatch')
  return p
}

/**
 * Pure build step: (manifest, review state, loadSnapshot(id, hash)) → { passages, report }.
 * A source is served only if: its manifest entry is valid; review status is "approved"; the approved hash is the
 * latest fetched hash (a changed page is withheld until re-approved); it is not superseded or rejected; and the
 * approved snapshot exists, is valid and matches its hash.
 */
function buildIndex(manifest, review, loadSnapshot, { target = 'production' } = {}) {
  const passages = []
  const report = []
  if (!TARGETS.includes(target)) throw new Error('bad_target')
  for (const entry of (manifest.sources || [])) {
    const r = (review.sources || {})[entry && entry.id] || {}
    const problems = validateManifestEntry(entry)
    const status = r.status || 'not_fetched'
    if (problems.length) { report.push({ id: entry && entry.id, served: false, reason: `invalid_metadata:${problems.join(',')}` }); continue }
    // Which approval this build may use: production → only "approved"; staging → "approved" or "approved_staging".
    const staging = status === 'approved_staging'
    if (staging && target !== 'staging') { report.push({ id: entry.id, served: false, reason: 'staging_only_approval' }); continue }
    if (status !== 'approved' && !staging) { report.push({ id: entry.id, served: false, reason: status === 'changed' ? 'changed_pending_review' : status }); continue }
    const okHash = staging ? r.stagingApprovedHash : r.approvedHash
    if (!okHash || r.latestHash !== okHash) { report.push({ id: entry.id, served: false, reason: 'changed_pending_review' }); continue }
    let snap = null
    try { snap = loadSnapshot(entry.id, okHash) } catch { snap = null }
    const sp = snap ? validateSnapshot(snap, entry) : ['snapshot_missing']
    if (sp.length || (snap && snap.contentHash !== okHash)) { report.push({ id: entry.id, served: false, reason: `invalid_snapshot:${sp.join(',') || 'hash_not_approved'}` }); continue }
    const scope = staging ? 'staging' : 'production'
    // A staging approval lists the exact excerpts reviewed (selection id → sha256 of the excerpt text): an excerpt is
    // served only if it is in that list with the same text, so a later manifest edit cannot change what is served.
    const reviewed = staging ? (r.stagingExcerpts || {}) : null
    // Optional manifest "selections" (Phase 4.1 review): exact reviewed EXCERPTS are served instead of whole passages.
    if (Array.isArray(entry.selections) && entry.selections.length) {
      let servedCount = 0
      for (const sel of entry.selections) {
        // A held selection is reviewed but not usable yet (e.g. a figure whose conditions need further authority).
        if (sel.hold) { report.push({ id: `${entry.id}#${sel.id}`, served: false, reason: `held:${sel.hold.reason}` }); continue }
        const r2 = applySelection(entry, snap, sel)
        if (r2.passage && reviewed && reviewed[sel.id] !== excerptHash(r2.passage.text)) { report.push({ id: `${entry.id}#${sel.id}`, served: false, reason: reviewed[sel.id] ? 'excerpt_changed_since_review' : 'excerpt_not_reviewed' }); continue }
        if (r2.passage) { passages.push({ ...r2.passage, approvalScope: scope }); servedCount++ } else report.push({ id: `${entry.id}#${sel.id}`, served: false, reason: r2.reason })
      }
      report.push({ id: entry.id, served: servedCount > 0, passages: servedCount, selections: entry.selections.length })
      continue
    }
    // A staging approval covers reviewed excerpts only: a source without selections is never served from it.
    if (staging) { report.push({ id: entry.id, served: false, reason: 'staging_requires_selections' }); continue }
    // Optional manifest "sections": only passages under these section paths are served (the snapshot keeps the whole
    // document for review and change detection).
    const sections = Array.isArray(entry.sections) && entry.sections.length ? entry.sections : null
    const inScope = p => !sections || sections.some(sec => p.location === sec || p.location.startsWith(`${sec} ›`) || p.location.startsWith(`${sec} (part`))
    snap.passages.forEach((p, i) => inScope(p) && passages.push({
      id: `${entry.id}#${i + 1}`, sourceId: entry.id, url: snap.finalUrl, title: entry.title, publisher: entry.publisher, topic: entry.topic,
      yearScope: entry.yearScope, taxYear: entry.yearScope === 'tax_year' ? String(entry.taxYear) : '', effectivePeriod: entry.effectivePeriod || '',
      ...applicability(entry), revisionDate: entry.revisionDate || snap.reviewedDate || '', retrievedAt: snap.retrievedAt, contentHash: snap.contentHash, location: p.location, text: p.text,
      approvalScope: scope,
    }))
    report.push({ id: entry.id, served: true, passages: snap.passages.filter(inScope).length })
  }
  return { passages, report }
}

// ── Reviewed excerpts ────────────────────────────────────
// A selection names one passage (exact location) and an excerpt inside it from a START anchor (must occur exactly
// once) to the first END anchor after it; whitespace in anchors matches any whitespace. Checks, each excluding the
// selection on failure:
//   - the whole source passage has no malformed figure (e.g. an IRS typo such as "$252,0000");
//   - every "requires" phrase (a material condition) is inside the excerpt;
//   - a selection-level taxYear appears in the excerpt itself (so mixed-year passages are split correctly);
//   - every figure named in "conditions" is inside the excerpt.
// In a tax-year excerpt, the FROM value of "increased from $X to $Y" / "from between $X and $Y" is the PRIOR year's
// figure: it is recorded as not citable from this excerpt.
const { extractNumbers } = require('../../netlify/functions/lina/verify.js')
const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')
const squash = t => String(t).replace(/\s+/g, ' ').toLowerCase()

const applicability = entry => (entry.yearScope === 'effective_period'
  ? { effectiveFrom: String(entry.effectiveFrom), ...(entry.effectiveThrough ? { effectiveThrough: String(entry.effectiveThrough) } : {}) } : {})

function applySelection(entry, snap, sel) {
  const found = snap.passages.filter(p => p.location === sel.location)
  if (found.length !== 1) return { reason: found.length ? 'location_ambiguous' : 'location_not_found' }
  const text = found[0].text
  if (extractNumbers(text).some(n => !n.valid)) return { reason: 'malformed_figure_in_passage' }
  const startRe = new RegExp(esc(sel.start), 'g')
  const starts = [...text.matchAll(startRe)]
  if (starts.length !== 1) return { reason: starts.length ? 'start_anchor_not_unique' : 'start_anchor_not_found' }
  const from = starts[0].index
  const endRe = new RegExp(esc(sel.end), 'g')
  endRe.lastIndex = from
  const end = endRe.exec(text)
  if (!end) return { reason: 'end_anchor_not_found' }
  const excerpt = text.slice(from, end.index + end[0].length)
  if (excerpt.length > MAX_PASSAGE) return { reason: 'excerpt_too_long' }
  for (const req of sel.requires || []) if (!squash(excerpt).includes(squash(req))) return { reason: `missing_condition:${req}` }
  const taxYear = sel.taxYear ? String(sel.taxYear) : entry.yearScope === 'tax_year' ? String(entry.taxYear) : ''
  if (sel.taxYear && !new RegExp(`\\b${sel.taxYear}\\b`).test(excerpt)) return { reason: 'selection_year_not_in_excerpt' }
  const nums = extractNumbers(excerpt)
  for (const c of sel.conditions || []) {
    const f = extractNumbers(c.figure)[0]
    if (!f || !nums.some(n => n.valid && n.value === f.value && n.percent === f.percent)) return { reason: `condition_figure_missing:${c.figure}` }
  }
  // A continuing excerpt carries rule text only: a dollar amount or a rate in it is year-specific by default.
  const yearLike = n => !n.currency && !n.percent && Number.isInteger(n.value) && n.value >= 1900 && n.value <= 2099
  if (sel.continuing && nums.some(n => n.valid && !yearLike(n) && (n.currency || n.percent || n.value >= 1000))) return { reason: 'continuing_rule_has_figures' }
  const notCitable = []
  if (taxYear) {
    for (const m of excerpt.matchAll(/from\s+between\s+(\$[\d,]+)\s+and\s+(\$[\d,]+)|from\s+(\$[\d,]+)\s+to\s+\$[\d,]+/gi)) {
      for (const raw of [m[1], m[2], m[3]].filter(Boolean)) notCitable.push(raw)
    }
  }
  return {
    passage: {
      id: `${entry.id}#${sel.id}`, sourceId: entry.id, selectionId: sel.id, url: snap.finalUrl, title: entry.title, publisher: entry.publisher, topic: entry.topic,
      yearScope: sel.taxYear ? 'tax_year' : entry.yearScope, taxYear, effectivePeriod: entry.effectivePeriod || '',
      revisionDate: entry.revisionDate || snap.reviewedDate || '', retrievedAt: snap.retrievedAt, contentHash: snap.contentHash,
      location: sel.location, text: excerpt, figureConditions: sel.conditions || [], notCitable: [...new Set(notCitable)], ...applicability(entry),
      ...(sel.continuing ? { continuingYears: sel.continuing.years.map(String), continuingBasis: sel.continuing.basis } : {}),
    },
  }
}

/**
 * Review-state transition after a fetch: a new source or a new hash becomes "pending" (first time) or "changed"
 * (an approved source whose content differs). The previously approved hash is kept for the record but is not
 * served while the source is "changed" (see buildIndex).
 */
function recordFetch(review, id, newHash, at) {
  const sources = review.sources || (review.sources = {})
  const r = sources[id] || (sources[id] = { status: 'pending', history: [] })
  if (r.latestHash === newHash) return r
  r.history = r.history || []
  r.history.push({ at, event: 'fetched', hash: newHash })
  r.latestHash = newHash
  if (['approved', 'approved_staging', 'changed'].includes(r.status)) {
    r.status = r.approvedHash === newHash ? 'approved' : r.stagingApprovedHash === newHash ? 'approved_staging' : 'changed'
  }
  else if (r.status !== 'superseded' && r.status !== 'rejected') r.status = 'pending'
  return r
}

function applyReview(review, id, { action, hash, reviewer, note, supersededBy, at, excerpts }) {
  const r = (review.sources || {})[id]
  if (!r) throw new Error('unknown_source')
  if (!reviewer || !String(reviewer).trim()) throw new Error('reviewer_required')
  if (action === 'approve') {
    if (!hash || hash !== r.latestHash) throw new Error('hash_must_match_latest_fetch')
    r.status = 'approved'; r.approvedHash = hash
  } else if (action === 'approve_staging') {
    // Staging evaluation only: never sets approvedHash, so production builds keep withholding the source.
    if (!hash || hash !== r.latestHash) throw new Error('hash_must_match_latest_fetch')
    if (!excerpts || typeof excerpts !== 'object' || !Object.keys(excerpts).length || Object.values(excerpts).some(h => !/^[0-9a-f]{64}$/.test(h))) throw new Error('reviewed_excerpts_required')
    r.status = 'approved_staging'; r.stagingApprovedHash = hash; r.stagingExcerpts = { ...excerpts }; r.approvalScope = 'staging_evaluation_only'
    note = [STAGING_NOTE, note].filter(Boolean).join(' ')
  } else if (action === 'reject') r.status = 'rejected'
  else if (action === 'supersede') { if (!supersededBy) throw new Error('superseded_by_required'); r.status = 'superseded'; r.supersededBy = supersededBy }
  else throw new Error('bad_action')
  r.history.push({ at, event: action, hash: hash || r.latestHash, reviewer: String(reviewer).slice(0, 80), note: String(note || '').slice(0, 300), ...(supersededBy ? { supersededBy } : {}), ...(action === 'approve_staging' ? { excerpts: Object.keys(excerpts).length } : {}) })
  return r
}

module.exports = {
  FETCH_HOSTS, MAX_REDIRECTS, TIMEOUT_MS, MAX_BYTES, MAX_PASSAGE, YEAR_SCOPES, REVIEW_STATUSES,
  fetchableUrl, safeFetch, extractHtml, extractPdf, pageReviewedDate, contentHash,
  validateManifestEntry, validateSnapshot, buildIndex, applySelection, recordFetch, applyReview, pdfPassages, excerptHash, TARGETS, STAGING_NOTE,
}

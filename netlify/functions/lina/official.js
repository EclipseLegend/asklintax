/**
 * Lina v2 — official-source research interface (Layer 3: on-demand official US tax guidance).
 *
 * Phase 1: research is OFF. There is a mock provider for offline tests; the OpenAI web_search provider is
 * declared here so the interface is fixed, but it is deliberately not implemented and cannot be turned on
 * from the environment.
 *
 * Contract for every provider: research(question, { lang }) resolves to
 *   { status: 'ok' | 'disabled' | 'not_enabled' | 'no_results' | 'error', sources: OfficialSource[] }
 * where OfficialSource = { url, title, publisher, taxYear, retrievedAt, text }.
 * The SERVER supplies the source text (Phase 3: fetched from the allowlisted URL). The model may only cite a
 * source by the id the server gives it, and every quote it uses is checked against `text` — an allowlisted
 * domain alone never makes a citation valid.
 */

// Official US government tax sources (subdomains included, e.g. apps.irs.gov, taxpayeradvocate.irs.gov).
const OFFICIAL_DOMAINS = [
  'irs.gov', 'treasury.gov', 'fincen.gov', 'ssa.gov', 'ftb.ca.gov',
  'ecfr.gov', 'govinfo.gov', 'congress.gov', 'federalregister.gov', 'uscode.house.gov',
]

function isOfficialUrl(url) {
  let u
  try { u = new URL(String(url)) } catch { return false }
  if (u.protocol !== 'https:' || u.username || u.password || u.port) return false
  const host = u.hostname.toLowerCase()
  return OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d))
}

// Keep only well-formed sources from allowlisted official domains, with bounded text.
function normalizeOfficialSources(list, { maxSources = 4, maxChars = 4000 } = {}) {
  if (!Array.isArray(list)) return []
  return list
    .filter(s => s && isOfficialUrl(s.url) && typeof s.title === 'string' && s.title.trim() && typeof s.text === 'string' && s.text.trim())
    .slice(0, maxSources)
    .map(s => ({
      url: String(s.url),
      title: s.title.trim().slice(0, 200),
      publisher: typeof s.publisher === 'string' ? s.publisher.slice(0, 80) : '',
      taxYear: /^(19|20)\d\d$/.test(String(s.taxYear || '')) ? String(s.taxYear) : '',
      retrievedAt: typeof s.retrievedAt === 'string' ? s.retrievedAt.slice(0, 40) : '',
      text: s.text.trim().slice(0, maxChars),
    }))
}

// Phase 3 (not used yet): the Responses API tool definition for official-domain web search.
function webSearchToolConfig() {
  return { type: 'web_search', filters: { allowed_domains: OFFICIAL_DOMAINS } }
}

/**
 * @param {object} opts
 *   mode: 'off' (default) | 'mock' | 'openai_web_search' (declared, not enabled in Phase 1)
 *   fixtures (mock only): [{ match: RegExp | (question) => boolean, sources: OfficialSource[] }]
 */
function createOfficialResearch({ mode = 'off', fixtures = [] } = {}) {
  if (mode === 'mock') {
    return {
      mode, enabled: true,
      async research(question) {
        const hit = fixtures.find(f => (typeof f.match === 'function' ? f.match(question) : f.match.test(question)))
        if (!hit) return { status: 'no_results', sources: [] }
        const sources = normalizeOfficialSources(hit.sources)
        return { status: sources.length ? 'ok' : 'no_results', sources }
      },
    }
  }
  if (mode === 'openai_web_search') {
    // Intentionally inert until Phase 3 is approved: no API call, no fetch.
    return { mode, enabled: false, async research() { return { status: 'not_enabled', sources: [] } } }
  }
  return { mode: 'off', enabled: false, async research() { return { status: 'disabled', sources: [] } } }
}

module.exports = { OFFICIAL_DOMAINS, isOfficialUrl, normalizeOfficialSources, webSearchToolConfig, createOfficialResearch }

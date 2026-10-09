/**
 * Ask Lin / Lina — client boundary. The UI (components/AskLin.js) only ever calls askLin().
 *
 * Sends the question to POST /api/lina (Netlify Function, netlify/functions/lina). The OpenAI
 * key lives only in Netlify environment variables; this file contains nothing secret and the
 * browser never calls OpenAI directly.
 *
 * Reply shape:
 *   { kind: 'answer' | 'clarify' | 'not_tax' | 'insufficient' | 'unavailable' | 'rate_limited' | 'error' | 'sensitive',
 *     locale: 'en' | 'zh-tw', paragraphs: string[], guides: string[] (published article ids),
 *     officialSources: { url, title, taxYear }[], handoff: boolean }
 * 'clarify' and 'not_tax' (and officialSources) come only from Lina v2 (LINA_MODE=v2); v1 replies are unchanged.
 *
 * Follow-up: after a 'clarify' reply, the UI passes followUp = { previousQuestion, clarifyingQuestion, round }
 * with the user's next message. The server keeps no conversation; this is the only context sent.
 */

const { ARTICLES } = require('../articles')

const ENDPOINT = '/api/lina'
const TIMEOUT_MS = 30000

const PUBLISHED = new Set(ARTICLES.map(a => a.id))
const CJK = /[㐀-鿿豈-﫿]/
const REPLY_KINDS = ['answer', 'insufficient', 'clarify', 'not_tax']
// Official sources are validated on the server; links are re-checked here so only https links to these
// government domains are ever rendered (keep in sync with netlify/functions/lina/official.js).
const OFFICIAL_DOMAINS = ['irs.gov', 'treasury.gov', 'fincen.gov', 'ssa.gov', 'ftb.ca.gov', 'ecfr.gov', 'govinfo.gov', 'congress.gov', 'federalregister.gov', 'uscode.house.gov']
function officialLink(s) {
  if (!s || typeof s.url !== 'string' || typeof s.title !== 'string') return null
  let u
  try { u = new URL(s.url) } catch { return null }
  const host = u.hostname.toLowerCase()
  if (u.protocol !== 'https:' || u.username || u.password || !OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d))) return null
  return { url: u.href, title: s.title.slice(0, 200), taxYear: /^(19|20)\d\d$/.test(String(s.taxYear || '')) ? String(s.taxYear) : '' }
}

// Reply in Chinese if the question contains Chinese, or if the visitor is on a /zh-tw/ page.
function replyLocale(question, pageLocale) {
  return CJK.test(question) || pageLocale === 'zh-tw' ? 'zh-tw' : 'en'
}

const MESSAGES = {
  en: {
    unavailable: 'Lina is unavailable right now. Please try again in a few minutes, or browse the Knowledge Library.',
    rate_limited: 'You’ve asked several questions in a short time. Please wait a minute and try again.',
    error: 'Sorry — something went wrong while preparing the answer. Please try asking again, or browse the Knowledge Library.',
    sensitive: 'For your privacy, please remove Social Security numbers, ITINs, bank or account numbers and other personal identifiers, then ask again.',
  },
  'zh-tw': {
    unavailable: 'Lina 目前無法使用，請稍後再試，或先瀏覽稅務知識庫。',
    rate_limited: '你在短時間內問了好幾個問題，請稍候一分鐘再試。',
    error: '抱歉，準備回答時發生問題。請再問一次，或先瀏覽稅務知識庫。',
    sensitive: '為了保護你的隱私，請先移除社會安全號碼（SSN）、ITIN、銀行或帳戶號碼等個人識別資料，再重新提問。',
  },
}

const status = (kind, lang) => ({ kind, locale: lang, paragraphs: [MESSAGES[lang][kind]], guides: [], handoff: false })

async function askLin({ question, locale = 'en', followUp = null }) {
  const lang = replyLocale(followUp ? `${followUp.previousQuestion} ${question}` : question, locale)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(followUp ? { question, locale, followUp } : { question, locale }),
      signal: controller.signal,
      credentials: 'same-origin',
    })
  } catch {
    return status('unavailable', lang)
  } finally {
    clearTimeout(timer)
  }

  if (res.status === 429) return status('rate_limited', lang)
  if (res.status === 422) return status('sensitive', lang)
  if (res.status === 502) return status('error', lang)
  if (!res.ok) return status('unavailable', lang)

  let data
  try { data = await res.json() } catch { return status('error', lang) }
  if (!data || !REPLY_KINDS.includes(data.kind) || !Array.isArray(data.paragraphs)) return status('error', lang)
  return {
    kind: data.kind,
    locale: data.locale === 'zh-tw' ? 'zh-tw' : 'en',
    paragraphs: data.paragraphs.filter(p => typeof p === 'string'),
    // The server already validated citations; check again so only published guides are ever linked.
    guides: (Array.isArray(data.guides) ? data.guides : []).filter(id => PUBLISHED.has(id)).slice(0, 3),
    // Cited guides published as Official Sources Verified (the guide links are labeled in the UI).
    sourceVerified: (Array.isArray(data.sourceVerified) ? data.sourceVerified : []).filter(id => PUBLISHED.has(id)),
    officialSources: data.kind === 'answer' && Array.isArray(data.officialSources) ? data.officialSources.map(officialLink).filter(Boolean).slice(0, 4) : [],
    handoff: data.handoff === true,
  }
}

module.exports = { askLin, replyLocale }

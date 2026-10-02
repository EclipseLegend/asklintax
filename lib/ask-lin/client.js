/**
 * Ask Lin / Lina — client boundary. The UI (components/AskLin.js) only ever calls askLin().
 *
 * Sends the question to POST /api/lina (Netlify Function, netlify/functions/lina). The OpenAI
 * key lives only in Netlify environment variables; this file contains nothing secret and the
 * browser never calls OpenAI directly.
 *
 * Reply shape:
 *   { kind: 'answer' | 'insufficient' | 'unavailable' | 'rate_limited' | 'error' | 'sensitive',
 *     locale: 'en' | 'zh-tw', paragraphs: string[], guides: string[] (published article ids), handoff: boolean }
 */

const { ARTICLES } = require('../articles')

const ENDPOINT = '/api/lina'
const TIMEOUT_MS = 30000

const PUBLISHED = new Set(ARTICLES.map(a => a.id))
const CJK = /[㐀-鿿豈-﫿]/

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

async function askLin({ question, locale = 'en' }) {
  const lang = replyLocale(question, locale)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, locale }),
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
  if (!data || !['answer', 'insufficient'].includes(data.kind) || !Array.isArray(data.paragraphs)) return status('error', lang)
  return {
    kind: data.kind,
    locale: data.locale === 'zh-tw' ? 'zh-tw' : 'en',
    paragraphs: data.paragraphs.filter(p => typeof p === 'string'),
    // The server already validated citations; check again so only published guides are ever linked.
    guides: (Array.isArray(data.guides) ? data.guides : []).filter(id => PUBLISHED.has(id)).slice(0, 3),
    // Cited guides published as Official Sources Verified (the guide links are labeled in the UI).
    sourceVerified: (Array.isArray(data.sourceVerified) ? data.sourceVerified : []).filter(id => PUBLISHED.has(id)),
    handoff: data.handoff === true,
  }
}

module.exports = { askLin, replyLocale }

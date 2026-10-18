// Lina v2 private staging function (staging Netlify site only), served at /api/lina-staging.
// All logic is in ../../lib/handler.js. Secrets are read from Netlify environment variables at runtime and are
// never sent to the browser. CONTEXT (a build-time variable) is not used. Identity is SITE_ID + the runtime deploy
// context (Netlify Functions API: context.deploy.context, must be "production") + LINA_STAGING_ENABLED.
import handlerLib from '../../lib/handler.js'

const handle = handlerLib.createStagingHandler()
const NAMES = ['LINA_STAGING_ENABLED', 'OPENAI_API_KEY', 'LINA_STAGING_OPENAI_API_KEY', 'LINA_STAGING_SUPABASE_URL', 'LINA_STAGING_SUPABASE_PUBLISHABLE_KEY', 'SITE_ID']

export default async (request, context = {}) => {
  const vars = Object.fromEntries(NAMES.map(n => [n, Netlify.env.get(n)]))
  // The site id from the runtime context and from SITE_ID must not disagree.
  const fromContext = (context.site && context.site.id) || ''
  const siteId = fromContext && vars.SITE_ID && fromContext !== vars.SITE_ID ? '' : (fromContext || vars.SITE_ID || '')
  const deployContext = (context.deploy && typeof context.deploy.context === 'string' && context.deploy.context) || ''
  return handle(request, { vars, siteId, deployContext, ip: context.ip || request.headers.get('x-nf-client-connection-ip') || '' })
}

export const config = {
  path: '/api/lina-staging',
  method: ['GET', 'POST'],
  // Netlify code-based rate limit (per IP, per domain); core-v2.js adds its own in-memory limit.
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
}

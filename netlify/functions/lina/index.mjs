// Lina — Netlify Function (served at /api/lina). The site itself stays a static export.
// OPENAI_API_KEY is read from Netlify environment variables at runtime; it never reaches the browser.
import core from './core.js'

export default async (request, context) => {
  const { status, body } = await core.handleLina(request, {
    env: {
      OPENAI_API_KEY: Netlify.env.get('OPENAI_API_KEY'),
      LINA_MODEL: Netlify.env.get('LINA_MODEL'),
      LINA_ALLOWED_ORIGINS: Netlify.env.get('LINA_ALLOWED_ORIGINS'),
    },
    ip: context.ip || request.headers.get('x-nf-client-connection-ip') || '',
  })
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  })
}

export const config = {
  path: '/api/lina',
  method: 'POST',
  // Netlify code-based rate limit (per IP, per domain). core.js adds a best-effort in-memory limit.
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
}

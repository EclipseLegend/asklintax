/*
 * Lina v2 staging test page. No framework, no third-party scripts.
 * - Sign-in uses the separate STAGING Supabase project's Auth REST API (password, then TOTP → aal2).
 *   The tokens are kept in sessionStorage (cleared when the tab closes) and sent only to this site's
 *   /api/lina-staging and to the staging Supabase project.
 * - Questions and answers are kept only in this page's memory; nothing is stored on the server.
 * - Every piece of text from the server is inserted with textContent (never as HTML).
 */
(function () {
  'use strict'
  var API = '/api/lina-staging'
  var AUTH_KEY = 'lina-staging-auth'
  var SESSION_KEY = 'lina-staging-session'
  var OFFICIAL_DOMAINS = ['irs.gov', 'treasury.gov', 'fincen.gov', 'ssa.gov', 'ftb.ca.gov', 'ecfr.gov', 'govinfo.gov', 'congress.gov', 'federalregister.gov', 'uscode.house.gov']

  var T = {
    en: {
      loading: 'Loading…', offTitle: 'Staging is not available', offBody: 'This test environment is switched off or not configured.',
      signinTitle: 'Tester sign-in', email: 'Email', password: 'Password', signin: 'Sign in',
      mfaTitle: 'Authenticator code', enrollBody: 'Scan this QR code with your authenticator app, then enter the 6-digit code.',
      secret: 'Setup key:', code: '6-digit code', verify: 'Verify', signout: 'Sign out',
      diagnostics: 'Developer diagnostics', send: 'Ask Lina', newSession: 'New session',
      followupHint: 'Your next message answers Lina’s clarifying question.',
      placeholder: 'Ask a U.S. tax question (synthetic facts only)…',
      kinds: { answer: 'Answer', clarify: 'Clarifying question', insufficient: 'Cannot answer safely', not_tax: 'Not a tax question', error: 'Error' },
      guides: 'AskLinTax guides', official: 'Official sources',
      calls: 'Calls', session: 'Session', total: 'Total',
      errors: {
        unauthenticated: 'Please sign in again.', mfa_required: 'Authenticator verification is required.', forbidden: 'This account is not an authorized tester.',
        disabled: 'Testing is disabled (emergency switch or budget reached).', bad_session: 'This test session is no longer valid. Start a new session.',
        session_calls: 'This session reached its 20-call limit. Start a new session.', session_cost: 'This session reached its $0.25 limit. Start a new session.',
        total_cost: 'The total $5 testing budget is used up.', ledger_unavailable: 'The budget service is unavailable, so no question was sent.',
        rate_limited: 'Too many requests. Wait a minute.', sensitive_data: 'Remove SSNs, ITINs and account numbers first.',
        factor_not_approved: 'This authenticator is not approved for staging. Ask the administrator to approve it (a newly added or second authenticator is never approved automatically).',
        token_expiring: 'Your sign-in was about to expire. Please send the question again.',
        pricing_unconfirmed: 'Model calls are switched off until the model pricing is confirmed by the administrator.',
        model_anomaly: 'The model service returned something unexpected (model, tier or usage). Testing has been switched off for safety.',
        time_budget: 'The request took too long before reaching Lina, so no question was sent. Please try again.',
        signin: 'Sign-in failed. Check the email and password.', code: 'The code was not accepted.', generic: 'Something went wrong. Nothing was charged unless a model call was made.',
      },
    },
    'zh-tw': {
      loading: '載入中…', offTitle: '測試環境目前無法使用', offBody: '此測試環境已關閉或尚未設定。',
      signinTitle: '測試人員登入', email: '電子郵件', password: '密碼', signin: '登入',
      mfaTitle: '驗證器代碼', enrollBody: '請用驗證器 App 掃描此 QR code，再輸入 6 位數代碼。',
      secret: '設定金鑰：', code: '6 位數代碼', verify: '驗證', signout: '登出',
      diagnostics: '開發者診斷資訊', send: '詢問 Lina', newSession: '開新測試工作階段',
      followupHint: '你的下一則訊息會回覆 Lina 的釐清問題。',
      placeholder: '輸入美國稅務問題（請只使用虛構情境）…',
      kinds: { answer: '回答', clarify: '釐清問題', insufficient: '無法安全回答', not_tax: '非稅務問題', error: '錯誤' },
      guides: 'AskLinTax 指南', official: '官方資料來源',
      calls: '次數', session: '本次', total: '總計',
      errors: {
        unauthenticated: '請重新登入。', mfa_required: '需要完成驗證器驗證。', forbidden: '此帳號不是授權的測試人員。',
        disabled: '測試已停用（緊急開關或預算已用完）。', bad_session: '此測試工作階段已失效，請開新的工作階段。',
        session_calls: '本工作階段已達 20 次上限，請開新的工作階段。', session_cost: '本工作階段已達 $0.25 上限，請開新的工作階段。',
        total_cost: '總測試預算 $5 已用完。', ledger_unavailable: '預算服務暫時無法使用，問題未送出。',
        rate_limited: '請求太頻繁，請稍候一分鐘。', sensitive_data: '請先移除 SSN、ITIN 與帳戶號碼。',
        factor_not_approved: '此驗證器尚未獲准用於測試環境。請聯絡管理者核准（新加入或第二個驗證器不會自動獲准）。',
        token_expiring: '你的登入即將到期，請再送出一次問題。',
        pricing_unconfirmed: '在管理者確認模型價格之前，模型呼叫已關閉。',
        model_anomaly: '模型服務回傳了非預期的內容（模型、服務等級或用量），已為安全起見關閉測試。',
        time_budget: '請求在送達 Lina 前耗時過久，問題未送出。請再試一次。',
        signin: '登入失敗，請確認電子郵件與密碼。', code: '代碼未通過驗證。', generic: '發生錯誤。除非已呼叫模型，否則不會計費。',
      },
    },
  }

  var state = { lang: 'en', cfg: null, auth: null, session: null, followUp: null, busy: false, factorId: null }
  var $ = function (id) { return document.getElementById(id) }
  var t = function (k) { return T[state.lang][k] }
  var err = function (k) { return T[state.lang].errors[k] || T[state.lang].errors.generic }

  function store(key, value) { try { value === null ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(value)) } catch (e) { /* storage blocked: memory only */ } }
  function load(key) { try { return JSON.parse(sessionStorage.getItem(key) || 'null') } catch (e) { return null } }

  function show(name) {
    ['loading', 'off', 'signin', 'mfa', 'chat'].forEach(function (s) { $('screen-' + s).hidden = s !== name })
  }
  function applyLang() {
    document.documentElement.lang = state.lang === 'zh-tw' ? 'zh-Hant' : 'en'
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')) })
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-lang') === state.lang) })
    $('question').placeholder = t('placeholder')
  }

  // ── Supabase Auth (REST) ───────────────────────────────────
  function authFetch(path, opts) {
    opts = opts || {}
    var headers = { apikey: state.cfg.publishableKey, 'Content-Type': 'application/json' }
    if (opts.token) headers.Authorization = 'Bearer ' + opts.token
    return fetch(state.cfg.supabaseUrl + '/auth/v1' + path, { method: opts.method || 'POST', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined, credentials: 'omit' })
      .then(function (r) { return r.json().catch(function () { return {} }).then(function (d) { return { ok: r.ok, data: d } }) })
  }
  function claims(jwt) {
    try { return JSON.parse(atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) } catch (e) { return {} }
  }
  function saveAuth(d) {
    if (!d || !d.access_token || !d.refresh_token) return false
    state.auth = { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: (claims(d.access_token).exp || 0) * 1000 }
    store(AUTH_KEY, state.auth)
    return true
  }
  function freshToken() {
    if (!state.auth) return Promise.resolve(null)
    if (Date.now() < state.auth.expires_at - 300000) return Promise.resolve(state.auth.access_token) // refresh 5 min early (the server refuses tokens with < 2 min left)
    return authFetch('/token?grant_type=refresh_token', { body: { refresh_token: state.auth.refresh_token } })
      .then(function (r) { return r.ok && saveAuth(r.data) ? state.auth.access_token : (signOutLocal(), null) })
  }
  function signOutLocal() { state.auth = null; state.session = null; state.followUp = null; store(AUTH_KEY, null); store(SESSION_KEY, null) }

  // ── Staging API ────────────────────────────────────────────
  function api(body) {
    return freshToken().then(function (token) {
      if (!token) return { status: 401, data: { error: 'unauthenticated' } }
      return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(body), credentials: 'same-origin' })
        .then(function (r) { return r.json().catch(function () { return {} }).then(function (d) { return { status: r.status, data: d } }) })
    }).catch(function () { return { status: 0, data: { error: 'generic' } } })
  }

  function renderBudget(b) {
    var el = $('budget')
    el.textContent = ''
    if (!b) return
    var parts = [
      t('calls') + ' ' + b.sessionCalls + '/' + b.sessionMaxCalls,
      t('session') + ' $' + (b.sessionSpentUsd + b.sessionReservedUsd).toFixed(4) + '/$' + Number(b.sessionMaxUsd).toFixed(2),
      t('total') + ' $' + (b.totalSpentUsd + b.totalReservedUsd).toFixed(4) + '/$' + Number(b.totalMaxUsd).toFixed(2),
    ]
    parts.forEach(function (p) { var s = document.createElement('span'); s.textContent = p; el.appendChild(s) })
  }

  function addText(parent, tag, text, cls) {
    var el = document.createElement(tag)
    if (cls) el.className = cls
    el.textContent = text
    parent.appendChild(el)
    return el
  }
  function officialLink(s) {
    try {
      var u = new URL(s.url)
      var host = u.hostname.toLowerCase()
      if (u.protocol !== 'https:' || u.username || u.password) return null
      if (!OFFICIAL_DOMAINS.some(function (d) { return host === d || host.slice(-(d.length + 1)) === '.' + d })) return null
      return u.href
    } catch (e) { return null }
  }
  function addLink(parent, href, text, year) {
    var a = document.createElement('a')
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = text
    if (year) addText(a, 'span', year, 'yr')
    parent.appendChild(a)
  }

  function renderReply(data) {
    var li = document.createElement('li')
    li.className = 'msg lin'
    var r = data.reply
    var kind = r ? r.kind : 'error'
    li.lang = r && r.locale === 'zh-tw' ? 'zh-Hant' : 'en'
    addText(li, 'span', T[state.lang].kinds[kind] || kind, 'kind ' + kind)
    if (r) {
      (r.paragraphs || []).forEach(function (p) { addText(li, 'p', p) })
      var guides = r.guideLinks || []
      var official = (r.officialSources || []).filter(officialLink)
      if (guides.length || (kind === 'answer' && official.length)) {
        var c = document.createElement('div'); c.className = 'cites'
        if (guides.length) { addText(c, 'h3', t('guides')); guides.forEach(function (g) { if (/^https:\/\/asklintax\.com\//.test(g.href)) addLink(c, g.href, g.title) }) }
        if (kind === 'answer' && official.length) { addText(c, 'h3', t('official')); official.forEach(function (s) { addLink(c, officialLink(s), s.title, s.taxYear) }) }
        li.appendChild(c)
      }
    } else {
      addText(li, 'p', err(data.error))
    }
    if (data.diagnostics) {
      var d = document.createElement('details'); d.className = 'diag'
      addText(d, 'summary', t('diagnostics') + ' — ' + (data.diagnostics.reasonCodes.length ? data.diagnostics.reasonCodes.join(', ') : 'accepted'))
      addText(d, 'pre', JSON.stringify(data.diagnostics, null, 2))
      li.appendChild(d)
    }
    $('messages').appendChild(li)
    li.scrollIntoView({ block: 'nearest' })
  }

  // ── Flows ──────────────────────────────────────────────────
  function startSession() {
    return api({ action: 'start' }).then(function (r) {
      if (r.status === 200 && r.data.session) { state.session = r.data.session; store(SESSION_KEY, state.session); renderBudget(r.data.budget); return true }
      return handleAuthError(r)
    })
  }
  function handleAuthError(r) {
    var code = r.data && r.data.error
    if (code === 'unauthenticated') { signOutLocal(); show('signin'); return false }
    if (code === 'mfa_required') { beginMfa(); return false }
    addText($('messages'), 'li', err(code), 'msg error')
    return false
  }
  function enterChat() {
    show('chat')
    state.session = load(SESSION_KEY)
    var p = state.session ? api({ action: 'status', session: state.session }).then(function (r) {
      if (r.status === 200) { renderBudget(r.data.budget); return true }
      if (r.data && (r.data.error === 'bad_session' || r.data.error === 'session_calls')) return startSession()
      return handleAuthError(r)
    }) : startSession()
    return p
  }

  function beginMfa() {
    show('mfa')
    freshToken().then(function (token) {
      if (!token) { show('signin'); return }
      return authFetch('/user', { method: 'GET', token: token }).then(function (u) {
        var verified = ((u.data && u.data.factors) || []).filter(function (f) { return f.factor_type === 'totp' && f.status === 'verified' })
        if (verified.length) { state.factorId = verified[0].id; $('enroll').hidden = true; return }
        return authFetch('/factors', { token: token, body: { factor_type: 'totp', friendly_name: 'Lina staging ' + new Date().toISOString() } }).then(function (e) {
          if (!e.ok || !e.data.id) { $('mfa-error').hidden = false; $('mfa-error').textContent = err('generic'); return }
          state.factorId = e.data.id
          var qr = e.data.totp && e.data.totp.qr_code
          if (typeof qr === 'string' && qr.indexOf('data:image/svg+xml') === 0) $('qr').src = qr
          $('secret').textContent = (e.data.totp && e.data.totp.secret) || ''
          $('enroll').hidden = false
        })
      })
    })
  }

  function boot() {
    applyLang()
    fetch(API, { method: 'GET', credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) { show('off'); return null }
      return r.json()
    }).then(function (cfg) {
      if (!cfg) return
      if (!/^https:\/\//.test(cfg.supabaseUrl || '')) { show('off'); return }
      state.cfg = cfg
      state.auth = load(AUTH_KEY)
      if (!state.auth) { show('signin'); return }
      freshToken().then(function (token) {
        if (!token) { show('signin'); return }
        if (claims(token).aal === 'aal2') enterChat(); else beginMfa()
      })
    }).catch(function () { show('off') })
  }

  // ── Events ─────────────────────────────────────────────────
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { state.lang = b.getAttribute('data-lang'); applyLang() })
  })
  $('signin-form').addEventListener('submit', function (e) {
    e.preventDefault()
    $('signin-error').hidden = true
    authFetch('/token?grant_type=password', { body: { email: $('email').value.trim(), password: $('password').value } }).then(function (r) {
      $('password').value = ''
      if (!r.ok || !saveAuth(r.data)) { $('signin-error').textContent = err('signin'); $('signin-error').hidden = false; return }
      if (claims(state.auth.access_token).aal === 'aal2') enterChat(); else beginMfa()
    })
  })
  $('mfa-form').addEventListener('submit', function (e) {
    e.preventDefault()
    $('mfa-error').hidden = true
    var code = $('code').value.trim()
    freshToken().then(function (token) {
      if (!token || !state.factorId) { show('signin'); return }
      return authFetch('/factors/' + encodeURIComponent(state.factorId) + '/challenge', { token: token }).then(function (c) {
        if (!c.ok || !c.data.id) throw new Error('challenge')
        return authFetch('/factors/' + encodeURIComponent(state.factorId) + '/verify', { token: token, body: { challenge_id: c.data.id, code: code } })
      }).then(function (v) {
        $('code').value = ''
        if (!v.ok || !saveAuth(v.data) || claims(state.auth.access_token).aal !== 'aal2') throw new Error('verify')
        $('enroll').hidden = true
        enterChat()
      })
    }).catch(function () { $('mfa-error').textContent = err('code'); $('mfa-error').hidden = false })
  })
  function signOut() {
    var token = state.auth && state.auth.access_token
    if (token) authFetch('/logout', { token: token }).catch(function () {})
    signOutLocal(); $('messages').textContent = ''; renderBudget(null); show('signin')
  }
  $('signout').addEventListener('click', signOut)
  $('mfa-signout').addEventListener('click', signOut)
  $('new-session').addEventListener('click', function () { state.followUp = null; $('followup').hidden = true; $('messages').textContent = ''; startSession() })

  $('ask-form').addEventListener('submit', function (e) {
    e.preventDefault()
    var question = $('question').value.trim()
    if (!question || state.busy || !state.session) return
    state.busy = true; $('send').disabled = true
    addText($('messages'), 'li', question, 'msg user')
    $('question').value = ''
    var context = state.followUp
    var body = { action: 'ask', session: state.session, question: question, locale: state.lang, diagnostics: $('diag').checked }
    if (context) body.followUp = context
    api(body).then(function (r) {
      if (r.data && r.data.budget) renderBudget(r.data.budget)
      if (r.status === 200 && r.data.reply) {
        renderReply(r.data)
        var round = (context ? context.round : 0) + 1
        state.followUp = r.data.reply.kind === 'clarify' && round <= 2 ? {
          previousQuestion: (context ? context.previousQuestion + ' / ' + question : question).slice(0, 600),
          clarifyingQuestion: String(r.data.reply.paragraphs[0] || '').slice(0, 400),
          round: round,
        } : null
      } else if (r.status === 401 || (r.data && r.data.error === 'mfa_required')) {
        handleAuthError(r)
      } else {
        renderReply({ reply: null, error: r.data && r.data.error, diagnostics: r.data && r.data.diagnostics })
        state.followUp = null
      }
      $('followup').hidden = !state.followUp
    }).then(function () { state.busy = false; $('send').disabled = false })
  })

  boot()
})()

/**
 * Lina v2 Phase 4.2 — automated checks and human-review report for the official42 evaluation set
 * (used by scripts/lina-v2-eval.js --set official42). No network; pure functions over the run records.
 *
 * Citation presence alone never counts as support: an answer must also contain each required fact, keep figures
 * that its claims state inside the quoted text, state the tax year when the figure is year-specific, avoid every
 * forbidden claim (wrong-year figures, misapplied thresholds, "tax is owed" when the sources only require
 * reporting), and cite only excerpts that apply to the case. Every check is a hint for the reviewer, not a verdict.
 */
const { extractNumbers } = require('../netlify/functions/lina/verify.js')

const ZH_SIMPLIFIED = /[这为说们税个对时会应于发经过还没让从关体问题]/
// Reporting is not paying tax: none of the approved excerpts says a gift recipient owes tax on the gift.
const OWES_TAX = /(?:you|they) (?:will )?(?:owe|must pay|have to pay|need to pay) (?:gift |income )?tax on (?:the|this|that) gift|(?:(?<![不無免需])要|(?<![不無免])需要|(?<![不無免])必須|(?<![不無免])得)[^。，,；;]{0,12}繳(?:交)?(?:贈與|所得)?稅|(?<![不無免])應繳(?:贈與)?稅/i
const HELD_OR_EXCLUDED = /\$7,500|\$1,100|\$252,0000|Abby|Xander|Example 1\.|\$2,650|\$2,200|section 25B|401\(k\)|For 2026, if you have self-only|HDHPs for 2026|Section 6677/
const status = ok => (ok === null ? 'n/a' : ok ? 'pass' : 'fail')
const norm = t => String(t).normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ')

function checkRecord(spec, final, first, approved) {
  const text = norm([...(final.reply || [])].join(' '))
  const answered = final.kind === 'answer'
  const official = rec => rec.evidence.filter(e => e.official)
  const evFirst = official(first)
  const allEvidence = [...official(first), ...(final === first ? [] : official(final))]
  const cited = (final.claims || []).filter(c => c.official)
  const c = {}
  c.decision = status(spec.decisions.includes(final.kind))
  c.firstTurn = spec.firstTurn ? status(spec.firstTurn.includes(first.kind)) : 'n/a'
  c.retrieval = spec.officialEvidence.length ? status(spec.officialEvidence.some(x => evFirst.some(e => e.official === x))) : 'n/a'
  c.noForbiddenEvidence = status(!allEvidence.some(e => spec.forbiddenEvidence.some(p => e.official.startsWith(p))))
  c.approvedExcerptsOnly = status(allEvidence.every(e => approved.has(e.official) && e.approvalScope === 'staging' && !HELD_OR_EXCLUDED.test(e.excerpt)))
  c.citationsApplicable = answered && cited.length ? status(cited.every(x => spec.allowedSources.some(p => x.official.startsWith(p)))) : 'n/a'
  c.quotesFound = answered && (final.claims || []).length ? status(final.claims.every(x => x.quoteFound)) : 'n/a'
  // A figure a claim states must be inside that claim's own quote (the citation must actually support it).
  c.claimFiguresInQuote = answered && (final.claims || []).length ? status(final.claims.every(x => {
    const q = extractNumbers(x.quote || '').filter(n => n.valid).map(n => n.value)
    return extractNumbers(x.text || '').filter(n => n.valid && !(n.value >= 1900 && n.value <= 2099)).every(n => q.includes(n.value) || (final.question || '').includes(n.raw))
  })) : 'n/a'
  c.requiredFacts = answered && spec.requiredFacts.length ? status(spec.requiredFacts.every(group => group.some(alt => text.includes(norm(alt))))) : 'n/a'
  c.taxYearStated = answered && spec.yearStated && spec.taxYear ? status(text.includes(spec.taxYear)) : 'n/a'
  const forbidden = spec.forbiddenClaims.filter(rx => new RegExp(rx, 'i').test(text))
  c.forbiddenClaims = ['answer', 'clarify'].includes(final.kind) ? status(!forbidden.length) : 'n/a'
  c.reportingVsTax = /^(gift|f3520|trust)/.test(spec.id) && ['answer', 'clarify'].includes(final.kind) ? status(!OWES_TAX.test(text)) : 'n/a'
  c.overRefusal = spec.answerable === true ? status(final.kind !== 'insufficient') : 'n/a'
  c.abstention = spec.abstain ? status(final.kind !== 'answer') : 'n/a'
  c.chinese = spec.lang === 'zh' && answered ? status(/[㐀-鿿]/.test(text) && !ZH_SIMPLIFIED.test(text)) : 'n/a'
  c.chineseTerms = spec.lang === 'zh' && answered && spec.zhTerms ? (spec.zhTerms.some(t => text.includes(norm(t))) ? 'pass' : 'warn') : 'n/a'
  const fails = Object.entries(c).filter(([, v]) => v === 'fail').map(([k]) => k)
  return { checks: c, fails, forbiddenMatched: forbidden, verdict: fails.length ? 'FLAG' : 'ok' }
}

function score(cases, records, adversarial, approved) {
  const rows = []
  for (const c of cases) {
    const spec = c.spec
    for (const run of [...new Set(records.filter(r => r.caseId === c.id).map(r => r.run))]) {
      const rs = records.filter(r => r.caseId === c.id && r.run === run)
      rows.push({ id: c.id, run, spec, first: rs[0], final: rs[rs.length - 1], ...checkRecord(spec, rs[rs.length - 1], rs[0], approved) })
    }
  }
  const adv = adversarial.map(r => {
    const c = cases.find(x => x.id === r.caseId)
    const res = checkRecord(c.spec, r, r, approved)
    const bm = c.spec.badMock
    // Caught = refused at runtime by the validator, or (if it got through) flagged by the expected evaluation check.
    const caught = r.kind !== 'answer' || (bm.expectFlag ? res.fails.includes(bm.expectFlag) : res.fails.length > 0)
    if (r.mockNote) return { id: r.caseId, note: bm.note, kind: r.kind, codes: r.reasonCodes, fails: [], caughtBy: `not tested (${r.mockNote})`, caught: null }
    return { id: r.caseId, note: bm.note, kind: r.kind, codes: r.reasonCodes, fails: res.fails, caughtBy: r.kind !== 'answer' ? `validator (${r.reasonCodes.join(',')})` : res.fails.length ? `evaluation checks (${res.fails.join(',')})` : 'NOT CAUGHT', caught }
  })
  const keys = rows.length ? Object.keys(rows[0].checks) : []
  const tally = Object.fromEntries(keys.map(k => [k, ['pass', 'fail', 'warn', 'n/a'].map(v => rows.filter(r => r.checks[k] === v).length)]))
  return { rows, adv, tally }
}

const cell = v => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
function reviewMarkdown({ rows, adv, tally }, meta) {
  const out = [`# Lina v2 Phase 4.2 — official-source evaluation review (${meta.mode})`, '',
    `Generated ${meta.generated}. Index: staging (${meta.excerpts} reviewed IRS excerpts, "Approved for staging evaluation only" — not professional tax verification). Model calls ${meta.calls}; estimated cost $${meta.cost}.`,
    meta.mode === 'dry-run' ? '\n> DRY RUN: answers below are SCRIPTED mock replies, not model output. They test retrieval, the validator and these checks; they say nothing about model quality.\n' : '',
    '## Automated checks (hints for the reviewer, not verdicts)', '', '| check | pass | fail | warn | n/a |', '|---|---|---|---|---|',
    ...Object.entries(tally).map(([k, v]) => `| ${k} | ${v.join(' | ')} |`), '',
    '| case | lang | topic | expected | final | flags |', '|---|---|---|---|---|---|',
    ...rows.map(r => `| ${r.id}${r.run > 1 ? ` (run ${r.run})` : ''} | ${r.spec.lang} | ${cell(r.spec.topic)} | ${cell(r.spec.decisions.join('/'))} | ${r.final.kind}${r.final.mockNote ? ` (${r.final.mockNote})` : ''} | ${r.fails.join(', ') || '—'} |`), '']
  if (adv.length) out.push('## Adversarial replies (dry-run only)', '', '| case | bad reply | result | caught by |', '|---|---|---|---|',
    ...adv.map(a => `| ${a.id} | ${cell(a.note)} | ${a.kind} ${a.codes.join(',')} ${a.fails.join(',')} | ${a.caughtBy} |`), '')
  out.push('## Per-question review', '')
  for (const r of rows) {
    const s = r.spec
    out.push(`### ${r.id} — ${s.topic} (${s.lang})${r.run > 1 ? ` run ${r.run}` : ''}`, '',
      `**Question:** ${s.turns.map(t => cell(t)).join(' → ')}`, '',
      `**Expected:** ${cell(s.behavior)} · tax year ${s.taxYear || 'n/a'} · ${cell(s.applicability)} · clarification required: ${s.clarificationRequired ? 'yes' : 'no'} · abstain: ${s.abstain ? 'yes' : 'no'}`, '',
      `**Conditions that must be kept:** ${cell(s.conditions)}`, '',
      `**Forbidden claims:** ${s.forbiddenClaims.length ? s.forbiddenClaims.map(x => `\`${x}\``).join(', ') : '—'}`, '',
      `**Retrieved official evidence:** ${r.first.evidence.filter(e => e.official).map(e => `${e.id} ${e.official}`).join('; ') || '(none)'}`, '',
      `**Library evidence:** ${[...new Set(r.first.evidence.filter(e => !e.official).map(e => e.articleId))].join(', ') || '(none)'}`, '',
      `**Lina's reply (${r.final.kind}):** ${cell((r.final.reply || []).join(' / ')) || '—'}`, '',
      ...(r.final.draft ? [`**Model draft (${r.final.draft.decision}) was rejected or replaced:** validator ${r.final.draft.validator ? `${r.final.draft.validator.reason || (r.final.draft.validator.ok ? 'ok' : 'failed')} ${r.final.draft.validator.detail || ''}`.trim() : '—'} · draft text: ${cell((r.final.draft.paragraphs || []).join(' / ')) || '—'}`, ''] : []),
      `**${r.final.kind === 'answer' ? 'Citations' : 'Citations in the model draft (not shown to the user)'}:** ${(r.final.claims || []).map(c => `${c.source_id}${c.official ? ` (${c.official})` : ''}: “${cell(c.quote)}”${c.quoteFound ? '' : ' [QUOTE NOT FOUND]'}`).join('<br>') || '—'}`, '',
      `**Automated flags:** ${r.fails.join(', ') || 'none'}${r.forbiddenMatched.length ? ` (matched: ${r.forbiddenMatched.join(', ')})` : ''}`, '',
      '**Reviewer judgment:**', '',
      '| item | judgment (pass / minor / fail) | notes |', '|---|---|---|',
      '| Factually accurate (per the cited IRS text) | | |', '| Each claim supported by its quote (not just cited) | | |', '| Tax year correct | | |',
      '| Filing status / coverage / donor type applied correctly | | |', '| No unsupported legal conclusion | | |', '| Reporting vs tax liability correct | | |',
      '| Clarification appropriate (not too much, not missing) | | |', '| Over-refusal? | | |', ...(s.lang === 'zh' ? ['| Traditional Chinese quality and terminology | | |'] : []),
      '| **Overall** | | |', '')
  }
  return out.join('\n') + '\n'
}

function reviewCsv({ rows }) {
  const head = ['case', 'run', 'lang', 'topic', 'question', 'expected', 'tax_year', 'applicability', 'retrieved_official', 'final_kind', 'reply', 'citations', 'auto_flags',
    'accurate?', 'claims_supported?', 'tax_year_ok?', 'applicability_ok?', 'no_unsupported_conclusion?', 'reporting_vs_tax_ok?', 'clarification_ok?', 'over_refusal?', 'chinese_ok?', 'overall', 'notes']
  const lines = rows.map(r => [r.id, r.run, r.spec.lang, r.spec.topic, r.spec.turns.join(' → '), r.spec.behavior, r.spec.taxYear || '', r.spec.applicability,
    r.first.evidence.filter(e => e.official).map(e => e.official).join(' '), r.final.kind, (r.final.reply || []).join(' / '),
    (r.final.claims || []).map(c => `${c.official || c.source_id}: ${c.quote}`).join(' | '), r.fails.join(' '), '', '', '', '', '', '', '', '', '', '', ''])
  return '﻿' + [head, ...lines].map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n') + '\n'
}

module.exports = { checkRecord, score, reviewMarkdown, reviewCsv, OWES_TAX, HELD_OR_EXCLUDED }

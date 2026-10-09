// LINA_MODE selects the Lina implementation. Only an explicit "v2" turns on Lina v2;
// unset, empty or any other value keeps Lina v1 (core.js), the production default.
function resolveLinaMode(value) {
  return String(value || '').trim().toLowerCase() === 'v2' ? 'v2' : 'v1'
}

module.exports = { resolveLinaMode }

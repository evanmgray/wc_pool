const ENDPOINT = '/.netlify/functions/results'

// Read the shared results map ({ matchId: winnerCode }). Returns {} on any failure so
// the UI still renders (useful when running plain `vite` without `netlify dev`).
export async function getResults() {
  try {
    const res = await fetch(ENDPOINT, { method: 'GET' })
    if (!res.ok) return {}
    const data = await res.json()
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

// Save the full results map. Pin is verified server-side. Throws on failure.
export async function saveResults(pin, results) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin, results }),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(msg || `Save failed (${res.status})`)
  }
  return res.json()
}

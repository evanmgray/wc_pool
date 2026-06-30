// Kickoffs are stored as UTC instants (see bracketStructure.js). These helpers render
// them in the viewer's own local timezone and always show the tz abbreviation next to
// the time (e.g. "Jun 29 · 4:30 PM EDT") so there's never any ambiguity.

function tzAbbr(date) {
  const part = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName')
  return part?.value ?? ''
}

// "Jun 29 · 4:30 PM EDT"
export function formatKickoff(iso) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const date = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time} ${tzAbbr(d)}`.trim()
}

// True while a match is "active": now is at or after kickoff and within `windowHours`
// (default 3h) of it. Used to show a live indicator.
export function isLive(iso, windowHours = 3) {
  if (!iso) return false
  const start = new Date(iso).getTime()
  if (Number.isNaN(start)) return false
  const now = Date.now()
  return now >= start && now < start + windowHours * 60 * 60 * 1000
}

// "4:30 PM EDT" — when the date is shown elsewhere.
export function formatKickoffTime(iso) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${time} ${tzAbbr(d)}`.trim()
}

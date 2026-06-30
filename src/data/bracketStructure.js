// The full knockout bracket as 31 matches. Each match either has fixed `teams`
// (Round of 32) or `feeders` (winners of two earlier matches). Order in MATCHES is
// R32 -> R16 -> QF -> SF -> Final so a single forward pass can resolve participants.
//
// `kickoff` is the normalized UTC instant of the match (stored timezone-independent;
// the UI renders it in each viewer's local timezone). Source schedule was in BST
// (UTC+1), so UTC = BST - 1h. See src/lib/datetime.js for formatting.

export const ROUNDS = {
  r32: { key: 'r32', name: 'Round of 32', points: 20 },
  r16: { key: 'r16', name: 'Round of 16', points: 40 },
  qf: { key: 'qf', name: 'Quarter-finals', points: 80 },
  sf: { key: 'sf', name: 'Semi-finals', points: 160 },
  final: { key: 'final', name: 'Final', points: 320 },
}

export const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'final']

export const MATCHES = [
  // ---- Round of 32 ---- (kickoff = BST time minus 1h)
  { id: 'r32-1', round: 'r32', teams: ['GER', 'PAR'], venue: 'Boston', kickoff: '2026-06-29T20:30:00Z' },
  { id: 'r32-2', round: 'r32', teams: ['FRA', 'SWE'], venue: 'New York', kickoff: '2026-06-30T21:00:00Z' },
  { id: 'r32-3', round: 'r32', teams: ['RSA', 'CAN'], venue: 'Los Angeles', kickoff: '2026-06-28T19:00:00Z' },
  { id: 'r32-4', round: 'r32', teams: ['NED', 'MAR'], venue: 'Monterrey', kickoff: '2026-06-30T01:00:00Z' },
  { id: 'r32-5', round: 'r32', teams: ['POR', 'CRO'], venue: 'Toronto', kickoff: '2026-07-02T23:00:00Z' },
  { id: 'r32-6', round: 'r32', teams: ['ESP', 'AUT'], venue: 'Los Angeles', kickoff: '2026-07-02T19:00:00Z' },
  { id: 'r32-7', round: 'r32', teams: ['USA', 'BIH'], venue: 'San Francisco Bay Area', kickoff: '2026-07-02T00:00:00Z' },
  { id: 'r32-8', round: 'r32', teams: ['BEL', 'SEN'], venue: 'Seattle', kickoff: '2026-07-01T20:00:00Z' },
  { id: 'r32-9', round: 'r32', teams: ['BRA', 'JPN'], venue: 'Houston', kickoff: '2026-06-29T17:00:00Z' },
  { id: 'r32-10', round: 'r32', teams: ['CIV', 'NOR'], venue: 'Dallas', kickoff: '2026-06-30T17:00:00Z' },
  { id: 'r32-11', round: 'r32', teams: ['MEX', 'ECU'], venue: 'Mexico City', kickoff: '2026-07-01T01:00:00Z' },
  { id: 'r32-12', round: 'r32', teams: ['ENG', 'COD'], venue: 'Atlanta', kickoff: '2026-07-01T16:00:00Z' },
  { id: 'r32-13', round: 'r32', teams: ['ARG', 'CPV'], venue: 'Miami', kickoff: '2026-07-03T22:00:00Z' },
  { id: 'r32-14', round: 'r32', teams: ['AUD', 'EGY'], venue: 'Dallas', kickoff: '2026-07-03T18:00:00Z' },
  { id: 'r32-15', round: 'r32', teams: ['SUI', 'ALG'], venue: 'Vancouver', kickoff: '2026-07-03T03:00:00Z' },
  { id: 'r32-16', round: 'r32', teams: ['COL', 'GHA'], venue: 'Kansas City', kickoff: '2026-07-04T01:30:00Z' },

  // ---- Round of 16 ----
  { id: 'r16-1', round: 'r16', feeders: ['r32-1', 'r32-2'], venue: 'Philadelphia', kickoff: '2026-07-04T21:00:00Z' },
  { id: 'r16-2', round: 'r16', feeders: ['r32-3', 'r32-4'], venue: 'Houston', kickoff: '2026-07-04T17:00:00Z' },
  { id: 'r16-3', round: 'r16', feeders: ['r32-5', 'r32-6'], venue: 'Dallas', kickoff: '2026-07-06T19:00:00Z' },
  { id: 'r16-4', round: 'r16', feeders: ['r32-7', 'r32-8'], venue: 'Seattle', kickoff: '2026-07-07T00:00:00Z' },
  { id: 'r16-5', round: 'r16', feeders: ['r32-9', 'r32-10'], venue: 'New York', kickoff: '2026-07-05T20:00:00Z' },
  { id: 'r16-6', round: 'r16', feeders: ['r32-11', 'r32-12'], venue: 'Mexico City', kickoff: '2026-07-06T00:00:00Z' },
  { id: 'r16-7', round: 'r16', feeders: ['r32-13', 'r32-14'], venue: 'Atlanta', kickoff: '2026-07-07T16:00:00Z' },
  { id: 'r16-8', round: 'r16', feeders: ['r32-15', 'r32-16'], venue: 'Vancouver', kickoff: '2026-07-07T20:00:00Z' },

  // ---- Quarter-finals ----
  // NOTE: the source schedule labels these QF1=Boston, QF2=Los Angeles, QF3=Miami,
  // QF4=Kansas City. Our IDs are qf-2=Miami / qf-3=Los Angeles (swapped vs the source),
  // so kickoffs are matched here by venue, not by the source's numeric label.
  { id: 'qf-1', round: 'qf', feeders: ['r16-1', 'r16-2'], venue: 'Boston', kickoff: '2026-07-09T20:00:00Z' },
  { id: 'qf-2', round: 'qf', feeders: ['r16-5', 'r16-6'], venue: 'Miami', kickoff: '2026-07-11T21:00:00Z' },
  { id: 'qf-3', round: 'qf', feeders: ['r16-3', 'r16-4'], venue: 'Los Angeles', kickoff: '2026-07-10T19:00:00Z' },
  { id: 'qf-4', round: 'qf', feeders: ['r16-7', 'r16-8'], venue: 'Kansas City', kickoff: '2026-07-12T01:00:00Z' },

  // ---- Semi-finals ----
  // Left half (Boston qf-1 + Los Angeles qf-3) meet in Dallas; right half
  // (Miami qf-2 + Kansas City qf-4) meet in Atlanta. Confirmed against FIFA brackets.
  { id: 'sf-1', round: 'sf', feeders: ['qf-1', 'qf-3'], venue: 'Dallas', kickoff: '2026-07-14T19:00:00Z' },
  { id: 'sf-2', round: 'sf', feeders: ['qf-2', 'qf-4'], venue: 'Atlanta', kickoff: '2026-07-15T19:00:00Z' },

  // ---- Final ----
  { id: 'final', round: 'final', feeders: ['sf-1', 'sf-2'], venue: 'New York', kickoff: '2026-07-19T19:00:00Z' },
]

export const MATCH_BY_ID = Object.fromEntries(MATCHES.map((m) => [m.id, m]))

// childMatchId -> the next-round match it feeds into (its two feeders are a "pair").
export const NEXT_MATCH = (() => {
  const map = {}
  for (const m of MATCHES) {
    if (m.feeders) for (const f of m.feeders) map[f] = m.id
  }
  return map
})()

export const MAX_POINTS = MATCHES.reduce((sum, m) => sum + ROUNDS[m.round].points, 0)

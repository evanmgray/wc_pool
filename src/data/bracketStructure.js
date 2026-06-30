// The full knockout bracket as 31 matches. Each match either has fixed `teams`
// (Round of 32) or `feeders` (winners of two earlier matches). Order in MATCHES is
// R32 -> R16 -> QF -> SF -> Final so a single forward pass can resolve participants.

export const ROUNDS = {
  r32: { key: 'r32', name: 'Round of 32', points: 20 },
  r16: { key: 'r16', name: 'Round of 16', points: 40 },
  qf: { key: 'qf', name: 'Quarter-finals', points: 80 },
  sf: { key: 'sf', name: 'Semi-finals', points: 160 },
  final: { key: 'final', name: 'Final', points: 320 },
}

export const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'final']

export const MATCHES = [
  // ---- Round of 32 ----
  { id: 'r32-1', round: 'r32', teams: ['GER', 'PAR'], date: 'Jun 29' },
  { id: 'r32-2', round: 'r32', teams: ['FRA', 'SWE'], date: 'Jun 30' },
  { id: 'r32-3', round: 'r32', teams: ['RSA', 'CAN'], date: 'Jun 28' },
  { id: 'r32-4', round: 'r32', teams: ['NED', 'MAR'], date: 'Jun 29' },
  { id: 'r32-5', round: 'r32', teams: ['POR', 'CRO'], date: 'Jul 2' },
  { id: 'r32-6', round: 'r32', teams: ['ESP', 'AUT'], date: 'Jul 2' },
  { id: 'r32-7', round: 'r32', teams: ['USA', 'BIH'], date: 'Jul 1' },
  { id: 'r32-8', round: 'r32', teams: ['BEL', 'SEN'], date: 'Jul 1' },
  { id: 'r32-9', round: 'r32', teams: ['BRA', 'JPN'], date: 'Jun 29' },
  { id: 'r32-10', round: 'r32', teams: ['CIV', 'NOR'], date: 'Jun 30' },
  { id: 'r32-11', round: 'r32', teams: ['MEX', 'ECU'], date: 'Jun 30' },
  { id: 'r32-12', round: 'r32', teams: ['ENG', 'COD'], date: 'Jul 1' },
  { id: 'r32-13', round: 'r32', teams: ['ARG', 'CPV'], date: 'Jul 3' },
  { id: 'r32-14', round: 'r32', teams: ['AUD', 'EGY'], date: 'Jul 3' },
  { id: 'r32-15', round: 'r32', teams: ['SUI', 'ALG'], date: 'Jul 2' },
  { id: 'r32-16', round: 'r32', teams: ['COL', 'GHA'], date: 'Jul 3' },

  // ---- Round of 16 ----
  { id: 'r16-1', round: 'r16', feeders: ['r32-1', 'r32-2'], venue: 'Philadelphia', date: 'Jul 4' },
  { id: 'r16-2', round: 'r16', feeders: ['r32-3', 'r32-4'], venue: 'Houston', date: 'Jul 4' },
  { id: 'r16-3', round: 'r16', feeders: ['r32-5', 'r32-6'], venue: 'Dallas', date: 'Jul 6' },
  { id: 'r16-4', round: 'r16', feeders: ['r32-7', 'r32-8'], venue: 'Seattle', date: 'Jul 6' },
  { id: 'r16-5', round: 'r16', feeders: ['r32-9', 'r32-10'], venue: 'New York', date: 'Jul 5' },
  { id: 'r16-6', round: 'r16', feeders: ['r32-11', 'r32-12'], venue: 'Mexico City', date: 'Jul 5' },
  { id: 'r16-7', round: 'r16', feeders: ['r32-13', 'r32-14'], venue: 'Atlanta', date: 'Jul 7' },
  { id: 'r16-8', round: 'r16', feeders: ['r32-15', 'r32-16'], venue: 'Vancouver', date: 'Jul 7' },

  // ---- Quarter-finals ----
  { id: 'qf-1', round: 'qf', feeders: ['r16-1', 'r16-2'], venue: 'Boston', date: 'Jul 9' },
  { id: 'qf-2', round: 'qf', feeders: ['r16-5', 'r16-6'], venue: 'Miami', date: 'Jul 11' },
  { id: 'qf-3', round: 'qf', feeders: ['r16-3', 'r16-4'], venue: 'Los Angeles', date: 'Jul 10' },
  { id: 'qf-4', round: 'qf', feeders: ['r16-7', 'r16-8'], venue: 'Kansas City', date: 'Jul 11' },

  // ---- Semi-finals ----
  { id: 'sf-1', round: 'sf', feeders: ['qf-1', 'qf-2'], date: 'Jul 14' },
  { id: 'sf-2', round: 'sf', feeders: ['qf-3', 'qf-4'], date: 'Jul 15' },

  // ---- Final ----
  { id: 'final', round: 'final', feeders: ['sf-1', 'sf-2'], date: 'Jul 19' },
]

export const MATCH_BY_ID = Object.fromEntries(MATCHES.map((m) => [m.id, m]))

export const MAX_POINTS = MATCHES.reduce((sum, m) => sum + ROUNDS[m.round].points, 0)

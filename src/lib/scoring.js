import { MATCHES, MATCH_BY_ID, ROUNDS } from '../data/bracketStructure.js'

// Resolve the two real participants of every match given the actual results so far.
// R32 teams are fixed; later matches inherit the winners of their feeder matches.
// Returns { [matchId]: [teamA|null, teamB|null] }.
export function resolveActualTeams(results) {
  const teams = {}
  for (const m of MATCHES) {
    if (m.teams) {
      teams[m.id] = [...m.teams]
    } else {
      const [f1, f2] = m.feeders
      teams[m.id] = [results[f1] ?? null, results[f2] ?? null]
    }
  }
  return teams
}

// Any team that lost a decided match is eliminated. The loser is the participant of
// that match who isn't the recorded winner.
export function eliminatedTeams(results) {
  const actual = resolveActualTeams(results)
  const out = new Set()
  for (const m of MATCHES) {
    const winner = results[m.id]
    if (!winner) continue
    for (const t of actual[m.id]) {
      if (t && t !== winner) out.add(t)
    }
  }
  return out
}

// Score one bracket against the current results.
// - totalPoints: sum of points for matches whose recorded winner matches the pick.
// - pointsRemaining: sum over undecided matches whose picked team is still alive.
// - matches: per-match detail for the bracket view.
export function scoreBracket(bracket, results) {
  const picks = bracket.picks || {}
  const eliminated = eliminatedTeams(results)
  const actual = resolveActualTeams(results)

  let totalPoints = 0
  let pointsRemaining = 0
  const matches = MATCHES.map((m) => {
    const points = ROUNDS[m.round].points
    const pick = picks[m.id] ?? null
    const winner = results[m.id] ?? null
    const decided = Boolean(winner)

    let status // 'correct' | 'incorrect' | 'pending'
    let earned = 0
    if (decided) {
      if (pick && pick === winner) {
        status = 'correct'
        earned = points
        totalPoints += points
      } else {
        status = 'incorrect'
      }
    } else {
      status = 'pending'
      // Still earnable if the picked team hasn't been knocked out yet.
      if (pick && !eliminated.has(pick)) pointsRemaining += points
    }

    return {
      id: m.id,
      round: m.round,
      roundName: ROUNDS[m.round].name,
      venue: m.venue || null,
      kickoff: m.kickoff || null,
      points,
      pick,
      winner,
      actualTeams: actual[m.id],
      decided,
      status,
      earned,
      pickAlive: pick ? !eliminated.has(pick) : false,
    }
  })

  return {
    name: bracket.name,
    id: bracket.id,
    champion: picks.final ?? null,
    totalPoints,
    pointsRemaining,
    maxPossible: totalPoints + pointsRemaining,
    matches,
  }
}

// Score every bracket and rank: total points desc, then points remaining desc.
export function buildLeaderboard(brackets, results) {
  return brackets
    .map((b) => scoreBracket(b, results))
    .sort((a, b) => b.totalPoints - a.totalPoints || b.pointsRemaining - a.pointsRemaining)
}

export { MATCH_BY_ID }

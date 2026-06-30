import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MATCHES, ROUND_ORDER, ROUNDS } from '../data/bracketStructure.js'
import { resolveActualTeams } from '../lib/scoring.js'
import { isLive, formatKickoff } from '../lib/datetime.js'
import { teamFlag, teamName } from '../data/teams.js'
import { BRACKETS } from '../lib/loadBrackets.js'

// Points riding on this live game for someone backing `team`: this match's points plus
// every later round where they keep picking the same team (all lost if the team loses now).
function pointsOnLine(picks, round, team) {
  const start = ROUND_ORDER.indexOf(round)
  let total = 0
  for (const m of MATCHES) {
    if (ROUND_ORDER.indexOf(m.round) < start) continue
    if (picks[m.id] === team) total += ROUNDS[m.round].points
  }
  return total
}

export default function LiveGames({ results }) {
  // Re-render every minute so games appear/disappear as their 3h window passes.
  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60 * 1000)
    return () => clearInterval(t)
  }, [])

  // Live = within the kickoff window AND no result entered yet. Entering the score in
  // admin ends "live" immediately; otherwise it drops on its own after the 3h window.
  const live = MATCHES.filter((m) => isLive(m.kickoff) && !results[m.id])
  if (live.length === 0) return null

  const actual = resolveActualTeams(results)

  return (
    <div className="live-section">
      {live.map((m) => {
        const teams = actual[m.id].filter(Boolean)
        const groups = teams.map((team) => ({
          team,
          people: BRACKETS.filter((b) => b.picks[m.id] === team),
        }))
        // Anyone whose pick for this match isn't one of the two teams playing.
        const noPick = BRACKETS.filter((b) => !teams.includes(b.picks[m.id]))

        return (
          <div className="card live-card" key={m.id}>
            <div className="live-card-head">
              <span className="live-badge">
                <span className="live-dot" />
                Live
              </span>
              <span className="live-meta">
                {[ROUNDS[m.round].name, m.venue, formatKickoff(m.kickoff)]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </div>

            <div className="live-teams">
              {groups.map((g) => (
                <div className="live-team" key={g.team}>
                  <div className="live-team-head">
                    <span className="flag">{teamFlag(g.team)}</span>
                    <span className="live-team-name">{teamName(g.team)}</span>
                  </div>
                  <div className="live-people">
                    {g.people.length ? (
                      g.people.map((p) => (
                        <Link to={`/u/${p.id}`} className="live-person" key={p.id}>
                          {p.name}
                          <span className="live-pts">
                            ({pointsOnLine(p.picks, m.round, g.team)})
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span className="live-empty">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {noPick.length > 0 && (
              <div className="live-nopick">
                <div className="live-nopick-head">No Pick</div>
                <div className="live-people">
                  {noPick.map((p) => (
                    <Link to={`/u/${p.id}`} className="live-person muted" key={p.id}>
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

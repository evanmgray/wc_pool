import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import LiveGames from '../components/LiveGames.jsx'
import { useResults } from '../context/ResultsContext.jsx'
import { BRACKETS } from '../lib/loadBrackets.js'
import { buildLeaderboard } from '../lib/scoring.js'
import { teamFlag, teamName } from '../data/teams.js'

export default function Leaderboard() {
  const { results, loading } = useResults()
  const sorted = buildLeaderboard(BRACKETS, results)

  // Tied players (same total points AND same points remaining) share a rank; the next
  // distinct score skips ahead ("1224" competition ranking).
  let rank = 0
  const rows = sorted.map((r, i) => {
    const prev = sorted[i - 1]
    if (!prev || r.totalPoints !== prev.totalPoints || r.pointsRemaining !== prev.pointsRemaining) {
      rank = i + 1
    }
    return { ...r, rank }
  })

  return (
    <>
      <Header subtitle="Elimination Round Bracket" />

      <LiveGames results={results} />

      {BRACKETS.length === 0 ? (
        <div className="empty">No brackets uploaded yet</div>
      ) : (
        <>
          <div className="lb-head">
            <span>#</span>
            <span>Player</span>
            <span className="col-r">Pts</span>
            <span className="col-r">Left</span>
          </div>
          <div className="card">
            {rows.map((r) => (
              <Link
                to={`/u/${r.id}`}
                key={r.id}
                className={`lb-row${r.rank <= 3 ? ` top-${r.rank}` : ''}`}
              >
                <span className="lb-rank">{r.rank}</span>
                <span>
                  <span className="lb-name">{r.name}</span>
                  <span className="lb-champ">
                    {r.champion ? (
                      <>
                        <span className="flag">{teamFlag(r.champion)}</span>
                        {teamName(r.champion)}
                      </>
                    ) : (
                      'No champion pick'
                    )}
                  </span>
                </span>
                <span className="lb-points">{r.totalPoints}</span>
                <span className="lb-remaining">{r.pointsRemaining}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <p className="note">
        Ranked by total points, then points still available. Tap a player to see their full
        bracket. {loading && 'Loading live results…'}
      </p>
    </>
  )
}

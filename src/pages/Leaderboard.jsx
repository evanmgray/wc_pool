import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useResults } from '../context/ResultsContext.jsx'
import { BRACKETS } from '../lib/loadBrackets.js'
import { buildLeaderboard } from '../lib/scoring.js'
import { teamFlag, teamName } from '../data/teams.js'

export default function Leaderboard() {
  const { results, loading } = useResults()
  const rows = buildLeaderboard(BRACKETS, results)

  return (
    <>
      <Header subtitle="Round of 16 Bracket" />

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
            {rows.map((r, i) => (
              <Link
                to={`/u/${r.id}`}
                key={r.id}
                className={`lb-row${i < 3 ? ` top-${i + 1}` : ''}`}
              >
                <span className="lb-rank">{i + 1}</span>
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

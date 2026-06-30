import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useResults } from '../context/ResultsContext.jsx'
import { getBracket } from '../lib/loadBrackets.js'
import { scoreBracket } from '../lib/scoring.js'
import { ROUND_ORDER, ROUNDS } from '../data/bracketStructure.js'
import { teamFlag, teamName } from '../data/teams.js'
import { formatKickoff, isLive } from '../lib/datetime.js'

function matchup(actualTeams) {
  const [a, b] = actualTeams
  if (a && b) return `${a} vs ${b}`
  if (a || b) return `${a || b} vs TBD`
  return 'TBD vs TBD'
}

function MatchScore({ m }) {
  if (m.status === 'correct') return <span className="badge correct">+{m.earned}</span>
  if (m.status === 'incorrect') return <span className="badge incorrect">0</span>
  // pending
  const cls = m.pickAlive ? 'badge pending' : 'badge pending dead'
  return <span className={cls}>{m.pickAlive ? 'Open' : 'Out'}</span>
}

export default function UserBracket() {
  const { id } = useParams()
  const { results } = useResults()
  const bracket = getBracket(id)

  // Re-render every minute so the live indicator turns on/off without a refresh.
  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60 * 1000)
    return () => clearInterval(t)
  }, [])

  if (!bracket) {
    return (
      <>
        <Link to="/" className="back-link">
          ← Leaderboard
        </Link>
        <div className="empty">Player not found</div>
      </>
    )
  }

  const scored = scoreBracket(bracket, results)

  return (
    <>
      <Link to="/" className="back-link">
        ← Leaderboard
      </Link>
      <h1 className="detail-name">{scored.name}</h1>

      <div className="stat-row">
        <div className="stat points">
          <span className="v">{scored.totalPoints}</span>
          <span className="l">Points</span>
        </div>
        <div className="stat remaining">
          <span className="v">{scored.pointsRemaining}</span>
          <span className="l">Available</span>
        </div>
        <div className="stat champ">
          <span className="v">{scored.champion ? teamFlag(scored.champion) : '—'}</span>
          <span className="l">Champion</span>
        </div>
      </div>

      {ROUND_ORDER.map((roundKey) => {
        const roundMatches = scored.matches
          .filter((m) => m.round === roundKey)
          .sort((a, b) => {
            // ascending kickoff time; matches without a time sort last
            if (!a.kickoff) return 1
            if (!b.kickoff) return -1
            return new Date(a.kickoff) - new Date(b.kickoff)
          })
        return (
          <div key={roundKey}>
            <div className="section-label">
              {ROUNDS[roundKey].name} · {ROUNDS[roundKey].points} pts
            </div>
            <div className="card">
              {roundMatches.map((m) => (
                <div className={`match ${m.status}`} key={m.id}>
                  <div className="match-info">
                    <div className="match-meta">
                      {isLive(m.kickoff) && (
                        <span className="live-badge">
                          <span className="live-dot" />
                          Live
                        </span>
                      )}
                      {[m.venue, formatKickoff(m.kickoff)].filter(Boolean).join(' · ') ||
                        m.roundName}
                    </div>
                    <div className="matchup">{matchup(m.actualTeams)}</div>
                    <div className="pick-line">
                      {m.pick ? (
                        <>
                          <span className="flag">{teamFlag(m.pick)}</span>
                          {teamName(m.pick)}
                        </>
                      ) : (
                        'No pick'
                      )}
                    </div>
                  </div>
                  <div className="match-score">
                    <MatchScore m={m} />
                    <span className="match-worth">{m.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <p className="note">
        Green = correct pick · Pink = eliminated · “Open” = still in play · “Out” = your pick
        was knocked out.
      </p>
    </>
  )
}

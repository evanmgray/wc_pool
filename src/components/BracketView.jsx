import { useRef, useState } from 'react'
import { MATCH_BY_ID, ROUND_ORDER, ROUNDS } from '../data/bracketStructure.js'
import { teamFlag, teamName } from '../data/teams.js'
import { formatKickoff, isLive } from '../lib/datetime.js'

const SHORT = { r32: 'R32', r16: 'R16', qf: 'QF', sf: 'SF', final: 'Final' }

// The matchup as the player predicted it: R32 uses the fixed teams, later rounds use
// the player's own feeder winners — so every cell always has two named teams.
function predictedTeams(matchId, picks) {
  const m = MATCH_BY_ID[matchId]
  if (m.teams) return m.teams
  return m.feeders.map((f) => picks[f] ?? null)
}

function TeamRow({ code, m }) {
  const picked = code && code === m.pick
  const isWinner = code && m.decided && code === m.winner
  const cls = [
    'brow',
    picked && 'picked',
    picked && m.decided && m.status === 'correct' && 'correct',
    picked && m.decided && m.status === 'incorrect' && 'wrong',
    isWinner && 'winner',
  ]
    .filter(Boolean)
    .join(' ')

  let tag = null
  if (picked) {
    if (m.decided) tag = m.status === 'correct' ? `+${m.earned}` : '0'
    else tag = `${m.points} pts`
  }

  return (
    <div className={cls}>
      <span className="flag">{code ? teamFlag(code) : ''}</span>
      <span className="brow-name">{code ? teamName(code) : 'TBD'}</span>
      {isWinner && !picked && <span className="brow-check">✓</span>}
      {tag && <span className="brow-tag">{tag}</span>}
    </div>
  )
}

function BracketCell({ m, picks }) {
  const [t1, t2] = predictedTeams(m.id, picks)
  // If the player mispredicted who'd be here, show who actually advanced.
  const surprise = m.decided && m.winner && m.winner !== t1 && m.winner !== t2

  return (
    <div className={`bcell ${m.status}`}>
      <div className="bcell-meta">
        {isLive(m.kickoff) && !m.decided && (
          <span className="live-badge">
            <span className="live-dot" />
            Live
          </span>
        )}
        {[m.venue, formatKickoff(m.kickoff)].filter(Boolean).join(' · ') || m.roundName}
      </div>
      <div className="bcell-teams">
        <TeamRow code={t1} m={m} />
        <TeamRow code={t2} m={m} />
      </div>
      {surprise && (
        <div className="bcell-result">
          Won: <span className="flag">{teamFlag(m.winner)}</span> {teamName(m.winner)}
        </div>
      )}
    </div>
  )
}

export default function BracketView({ matches, picks }) {
  const [idx, setIdx] = useState(0)
  const startX = useRef(null)
  const last = ROUND_ORDER.length - 1
  const go = (n) => setIdx(Math.min(last, Math.max(0, n)))

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (startX.current == null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx < -50) go(idx + 1)
    else if (dx > 50) go(idx - 1)
    startX.current = null
  }

  const roundKey = ROUND_ORDER[idx]
  const roundMatches = matches
    .filter((m) => m.round === roundKey)
    .sort((a, b) => {
      if (!a.kickoff) return 1
      if (!b.kickoff) return -1
      return new Date(a.kickoff) - new Date(b.kickoff)
    })

  return (
    <div className="bracket-view">
      <div className="round-tabs">
        {ROUND_ORDER.map((rk, i) => (
          <button
            key={rk}
            className={`round-tab${i === idx ? ' active' : ''}`}
            onClick={() => setIdx(i)}
          >
            {SHORT[rk]}
          </button>
        ))}
      </div>

      <div className="round-nav">
        <button className="nav-arrow" onClick={() => go(idx - 1)} disabled={idx === 0}>
          ‹
        </button>
        <span className="round-title">
          {ROUNDS[roundKey].name} · {ROUNDS[roundKey].points} pts
        </span>
        <button className="nav-arrow" onClick={() => go(idx + 1)} disabled={idx === last}>
          ›
        </button>
      </div>

      <div className="round-panel" key={roundKey} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {roundMatches.map((m) => (
          <BracketCell key={m.id} m={m} picks={picks} />
        ))}
      </div>

      <div className="round-dots">
        {ROUND_ORDER.map((rk, i) => (
          <span key={rk} className={`dot${i === idx ? ' active' : ''}`} />
        ))}
      </div>

      <p className="note">Swipe left / right (or tap a round) to move between rounds.</p>
    </div>
  )
}

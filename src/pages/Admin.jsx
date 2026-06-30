import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import { useResults } from '../context/ResultsContext.jsx'
import { saveResults } from '../lib/api.js'
import { MATCHES, ROUND_ORDER, ROUNDS } from '../data/bracketStructure.js'
import { resolveActualTeams } from '../lib/scoring.js'
import { teamFlag } from '../data/teams.js'

const PIN = '425299'

export default function Admin() {
  const { results, refresh, setResults } = useResults()
  const [unlocked, setUnlocked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [draft, setDraft] = useState({})
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null) // {type, msg}

  // Seed the editable draft from the live results once unlocked / when they change.
  useEffect(() => {
    if (unlocked) setDraft({ ...results })
  }, [unlocked, results])

  const actual = useMemo(() => resolveActualTeams(draft), [draft])
  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(results),
    [draft, results],
  )

  function tryUnlock(e) {
    e.preventDefault()
    if (pinInput === PIN) {
      setUnlocked(true)
      setStatus(null)
    } else {
      setStatus({ type: 'err', msg: 'Wrong pin' })
    }
  }

  // Setting a winner clears any downstream picks that depended on the old winner.
  function pick(matchId, team) {
    setDraft((prev) => {
      const next = { ...prev }
      if (next[matchId] === team) {
        delete next[matchId]
      } else {
        next[matchId] = team
      }
      // Cascade: invalidate later matches whose participants are no longer valid.
      let changed = true
      while (changed) {
        changed = false
        for (const m of MATCHES) {
          if (!m.feeders || !next[m.id]) continue
          const live = m.feeders.map((f) => next[f])
          if (!live.includes(next[m.id])) {
            delete next[m.id]
            changed = true
          }
        }
      }
      return next
    })
    setStatus(null)
  }

  async function save() {
    setSaving(true)
    setStatus(null)
    try {
      const saved = await saveResults(PIN, draft)
      setResults(saved)
      setDraft(saved)
      setStatus({ type: 'ok', msg: 'Saved · leaderboard updated' })
      refresh()
    } catch (err) {
      setStatus({ type: 'err', msg: err.message || 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  if (!unlocked) {
    return (
      <>
        <Header subtitle="Admin" />
        <form className="admin-lock" onSubmit={tryUnlock}>
          <h2>Enter Pin</h2>
          <input
            className="pin-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="••••••"
          />
          <div style={{ marginTop: 18 }}>
            <button className="btn" type="submit">
              Unlock
            </button>
          </div>
          {status?.type === 'err' && (
            <p className="admin-status err" style={{ marginTop: 14 }}>
              {status.msg}
            </p>
          )}
        </form>
      </>
    )
  }

  return (
    <>
      <Header subtitle="Admin · Enter Results" />

      <div className="admin-bar">
        <button className="btn" onClick={save} disabled={saving || !dirty}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          className="btn danger"
          onClick={() => setDraft({})}
          disabled={Object.keys(draft).length === 0}
        >
          Clear all
        </button>
        {status && <span className={`admin-status ${status.type}`}>{status.msg}</span>}
      </div>

      {ROUND_ORDER.map((roundKey) => {
        const roundMatches = MATCHES.filter((m) => m.round === roundKey)
        return (
          <div key={roundKey}>
            <div className="section-label">
              {ROUNDS[roundKey].name} · {ROUNDS[roundKey].points} pts
            </div>
            <div className="card">
              {roundMatches.map((m) => {
                const [a, b] = actual[m.id]
                return (
                  <div className="admin-match" key={m.id}>
                    <div className="am-meta">
                      <span>{[m.venue, m.date].filter(Boolean).join(' · ') || m.id}</span>
                      <span>{m.id}</span>
                    </div>
                    <div className="am-options">
                      {[a, b].map((team, idx) =>
                        team ? (
                          <button
                            key={team}
                            className={`am-opt${draft[m.id] === team ? ' selected' : ''}`}
                            onClick={() => pick(m.id, team)}
                          >
                            <span className="flag">{teamFlag(team)}</span>
                            {team}
                          </button>
                        ) : (
                          <button key={`tbd-${idx}`} className="am-opt tbd" disabled>
                            TBD
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <p className="note">
        Tap the winner of each match. Picking a winner unlocks the next round. Changing an
        earlier result clears any now-invalid later results. Press Save to publish to
        everyone.
      </p>
    </>
  )
}

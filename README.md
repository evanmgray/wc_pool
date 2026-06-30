# ⚽ World Cup Bracket Pool

The official FIFA Bracket Challenge website is rough for running a **second-chance
(elimination-only) bracket pool** — the kind where everyone fills out the knockout bracket
from the Round of 32 onward and competes for points. It's hard to compare friends'
brackets, there's no shared leaderboard for a private group, times are confusing, and you
can't see who's still alive at a glance.

So we built this: a small, mobile-first web app for running our own World Cup knockout pool.

## What it does

- **Leaderboard** ranked by total points, then points still available. Shows each player's
  champion pick. Tied players share a rank.
- **Live games panel** — while a match is in progress, see who picked each team, how many
  points each person has riding on it (e.g. `(60)` = 20 + 40 across the rounds they have
  that team advancing), and who has no pick left in the game.
- **Per-player bracket**, two ways:
  - **List view** — every match grouped by round, sorted by kickoff, with correct/eliminated/pending picks and points.
  - **Bracket view** — swipeable round-by-round, with feeder pairs grouped and a "winners meet in ___" connector showing who plays who next.
- **Elimination cascade** — once a team is knocked out, every remaining pick of that team is
  crossed out (in both views), so dead brackets are obvious.
- **Live indicator** on any match within 3 hours of kickoff (clears as soon as a result is
  entered).
- **Local times** — every kickoff is stored in UTC and shown in each viewer's own timezone,
  with the timezone label next to it.
- **Admin panel** (pin-locked) to enter match results; the leaderboard and brackets update
  for everyone via Netlify Blobs. Players can't edit brackets on the site.
- **Scoring**: 20 (R32) · 40 (R16) · 80 (QF) · 160 (SF) · 320 (Champion). Max = 1600.

## Brackets

Each player's bracket is a JSON file in `src/data/brackets/`. To add someone, drop in a new
file and redeploy — see [`src/data/brackets/README.md`](src/data/brackets/README.md) for the
format.

## Run / deploy

```bash
npm install
npm run dev      # UI only
netlify dev      # UI + results function (Netlify Blobs)
```

Deploys to **Netlify** as-is (config in `netlify.toml`; Blobs needs no setup). Admin pin
lives in `netlify/functions/results.mjs` and `src/pages/Admin.jsx`.

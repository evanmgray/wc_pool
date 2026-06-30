# ⚽ World Cup Bracket Pool

A mobile-native React app for running a World Cup knockout-bracket prediction pool.
Neon theme, read-only brackets uploaded as JSON, and a pin-locked admin panel that
publishes live results to everyone via Netlify Blobs.

## Features
- **Leaderboard** (home) ranked by total points, then points still available; shows each
  player's name and champion pick. Tap a player to open their bracket.
- **Player bracket view** — mobile-friendly, grouped by round, with correct (green) /
  eliminated (pink) / in-play picks and points earned per match.
- **Admin panel** — locked by pin `425299`. Tap the winner of each match; saving publishes
  results to all visitors. Players can't edit brackets on the site.
- **Scoring**: 20 (R32) · 40 (R16) · 80 (QF) · 160 (SF) · 320 (Champion). Max = 1600.

## Run locally
```bash
npm install
npm run dev          # UI only — results read returns empty without the function
# OR, to also run the results function + Blobs locally:
npm i -g netlify-cli
netlify dev
```

## Add players
Drop a JSON file in `src/data/brackets/` and redeploy. See
[`src/data/brackets/README.md`](src/data/brackets/README.md) for the format. The included
`alphabetical-andy.json` is an example that picks the alphabetically-first team every match.

## Enter results (admin)
Go to **Admin**, enter pin `425299`, tap each match winner, then **Save**. The pin is also
verified server-side in the function. Changing an earlier round clears any now-invalid later
picks automatically.

## Deploy to Netlify
1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import from Git**. Build settings are auto-detected from
   `netlify.toml` (build `npm run build`, publish `dist`, functions `netlify/functions`).
3. Netlify Blobs works automatically once deployed — no extra config or env vars needed.

To change the admin pin, edit `ADMIN_PIN` in `netlify/functions/results.mjs` and `PIN` in
`src/pages/Admin.jsx`.

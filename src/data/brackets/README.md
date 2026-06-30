# Bracket uploads

Each file in this directory is one player's bracket. To add a player, drop a new
`their-name.json` file here and redeploy — it's picked up automatically (no code changes).
The file name (minus `.json`) becomes the player's URL id; the `name` field is what shows
on the leaderboard.

## Format

```json
{
  "name": "Display Name",
  "picks": {
    "r32-1": "GER",
    "...": "...",
    "final": "ARG"
  }
}
```

- A pick is the **3-letter team code** the player predicts to **win** that match.
- `picks.final` is the player's **champion** pick.
- Match ids (31 total): `r32-1`..`r32-16`, `r16-1`..`r16-8`, `qf-1`..`qf-4`, `sf-1`, `sf-2`, `final`.

## Match map

| id | matchup / feeds from |
| --- | --- |
| r32-1 | GER vs PAR | r32-2 | FRA vs SWE | r32-3 | RSA vs CAN | r32-4 | NED vs MAR |
| r32-5 | POR vs CRO | r32-6 | ESP vs AUT | r32-7 | USA vs BIH | r32-8 | BEL vs SEN |
| r32-9 | BRA vs JPN | r32-10 | CIV vs NOR | r32-11 | MEX vs ECU | r32-12 | ENG vs COD |
| r32-13 | ARG vs CPV | r32-14 | AUD vs EGY | r32-15 | SUI vs ALG | r32-16 | COL vs GHA |

| id | feeders | venue |
| --- | --- | --- |
| r16-1 | r32-1 / r32-2 | Philadelphia |
| r16-2 | r32-3 / r32-4 | Houston |
| r16-3 | r32-5 / r32-6 | Dallas |
| r16-4 | r32-7 / r32-8 | Seattle |
| r16-5 | r32-9 / r32-10 | New York |
| r16-6 | r32-11 / r32-12 | Mexico City |
| r16-7 | r32-13 / r32-14 | Atlanta |
| r16-8 | r32-15 / r32-16 | Vancouver |
| qf-1 | r16-1 / r16-2 | Boston |
| qf-2 | r16-5 / r16-6 | Miami |
| qf-3 | r16-3 / r16-4 | Los Angeles |
| qf-4 | r16-7 / r16-8 | Kansas City |
| sf-1 | qf-1 / qf-2 | — |
| sf-2 | qf-3 / qf-4 | — |
| final | sf-1 / sf-2 | — |

## Scoring
20 (R32) · 40 (R16) · 80 (QF) · 160 (SF) · 320 (Champion). Max possible = 1600.

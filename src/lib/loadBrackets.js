// Auto-import every bracket JSON in src/data/brackets at build time. To add a user,
// drop a `<name>.json` file in that directory and redeploy — no code changes needed.
const modules = import.meta.glob('../data/brackets/*.json', { eager: true })

export const BRACKETS = Object.entries(modules)
  .map(([path, mod]) => {
    const data = mod.default ?? mod
    const id = path.split('/').pop().replace(/\.json$/, '')
    return { id, name: data.name ?? id, picks: data.picks ?? {} }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export function getBracket(id) {
  return BRACKETS.find((b) => b.id === id) ?? null
}

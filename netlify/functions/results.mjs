import { getStore } from '@netlify/blobs'

const ADMIN_PIN = '425299'
const STORE = 'wc-results'
const KEY = 'results'

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export default async function handler(req) {
  const store = getStore(STORE)

  if (req.method === 'GET') {
    const data = (await store.get(KEY, { type: 'json' })) || {}
    return json(200, data)
  }

  if (req.method === 'POST') {
    let body
    try {
      body = await req.json()
    } catch {
      return json(400, { error: 'Invalid JSON' })
    }

    if (body?.pin !== ADMIN_PIN) {
      return json(401, { error: 'Invalid pin' })
    }

    const results = body?.results
    if (!results || typeof results !== 'object' || Array.isArray(results)) {
      return json(400, { error: 'results must be an object' })
    }

    // Keep only string winners (drop cleared picks).
    const clean = {}
    for (const [k, v] of Object.entries(results)) {
      if (typeof v === 'string' && v.trim()) clean[k] = v.trim()
    }

    await store.setJSON(KEY, clean)
    return json(200, clean)
  }

  return json(405, { error: 'Method not allowed' })
}

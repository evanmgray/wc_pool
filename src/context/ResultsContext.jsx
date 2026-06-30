import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getResults } from '../lib/api.js'

const ResultsContext = createContext({ results: {}, loading: true, refresh: () => {} })

export function ResultsProvider({ children }) {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const data = await getResults()
    setResults(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <ResultsContext.Provider value={{ results, loading, refresh, setResults }}>
      {children}
    </ResultsContext.Provider>
  )
}

export function useResults() {
  return useContext(ResultsContext)
}

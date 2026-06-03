import { useEffect, useMemo, useState } from 'react'
import { getPerformances } from '../../../entities/performance/api/performanceApi.js'

export function usePagedPerformances({ page, size, searchKeyword, selectedRealm }) {
  const [response, setResponse] = useState({
    performances: [],
    realms: ['all'],
    page: 1,
    size,
    totalCount: 0,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchPerformances() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const nextResponse = await getPerformances({
          page,
          size,
          keyword: searchKeyword,
          realm: selectedRealm,
          signal: abortController.signal,
        })

        setResponse({
          performances: nextResponse.performances ?? [],
          realms: ['all', ...(nextResponse.realms ?? [])],
          page: nextResponse.page ?? page,
          size: nextResponse.size ?? size,
          totalCount: nextResponse.totalCount ?? 0,
          totalPages: nextResponse.totalPages ?? 0,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage(error.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchPerformances()

    return () => {
      abortController.abort()
    }
  }, [page, searchKeyword, selectedRealm, size])

  const visibleCountLabel = useMemo(() => {
    if (response.totalCount === 0) {
      return '0'
    }

    const start = (response.page - 1) * response.size + 1
    const end = Math.min(response.page * response.size, response.totalCount)

    return `${start}-${end}`
  }, [response.page, response.size, response.totalCount])

  return {
    performances: response.performances,
    realms: response.realms,
    page: response.page,
    totalCount: response.totalCount,
    totalPages: response.totalPages,
    visibleCountLabel,
    isLoading,
    errorMessage,
  }
}

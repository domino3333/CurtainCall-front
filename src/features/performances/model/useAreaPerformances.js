import { useEffect, useMemo, useState } from 'react'
import { getAreaPerformances } from '../../../entities/performance/api/performanceApi.js'

function matchesKeyword(performance, keyword) {
  const searchableText = [
    performance.title,
    performance.place,
    performance.area,
    performance.sigungu,
    performance.realmName,
  ]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(keyword)
}

function matchesRealm(performance, selectedRealm) {
  if (selectedRealm === 'all') {
    return true
  }

  return [performance.serviceName, performance.realmName].includes(selectedRealm)
}

export function useAreaPerformances({ searchKeyword, selectedRealm }) {
  const [performances, setPerformances] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchPerformances() {
      try {
        const items = await getAreaPerformances()

        if (isMounted) {
          setPerformances(items)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPerformances()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredPerformances = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase()

    if (!keyword) {
      return performances
    }

    return performances.filter(
      (performance) =>
        matchesKeyword(performance, keyword) && matchesRealm(performance, selectedRealm),
    )
  }, [performances, searchKeyword, selectedRealm])

  const realms = useMemo(() => {
    const uniqueRealms = new Set()

    performances.forEach((performance) => {
      if (performance.serviceName) {
        uniqueRealms.add(performance.serviceName)
      }
      if (performance.realmName) {
        uniqueRealms.add(performance.realmName)
      }
    })

    return ['all', ...uniqueRealms]
  }, [performances])

  return {
    performances: filteredPerformances,
    totalCount: performances.length,
    realms,
    isLoading,
    errorMessage,
  }
}

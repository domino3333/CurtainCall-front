import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import { HomeEntry } from '../../features/performances/ui/HomeEntry.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function HomePage() {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')

  function handleSelectMode(mode) {
    if (mode === 'guide') {
      navigate(ROUTE_PATHS.guide)
      return
    }

    navigate(ROUTE_PATHS.performances)
  }

  function handleEntrySearchSubmit(event) {
    event.preventDefault()

    const keyword = searchKeyword.trim()
    const queryString = keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''

    navigate(`${ROUTE_PATHS.performances}${queryString}`)
  }

  return (
    <HomeEntry
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
      onSearchSubmit={handleEntrySearchSubmit}
      onSelectMode={handleSelectMode}
    />
  )
}

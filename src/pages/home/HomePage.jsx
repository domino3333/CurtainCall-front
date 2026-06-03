import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import { HomeEntry } from '../../features/performances/ui/HomeEntry.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function HomePage() {
  const navigate = useNavigate()

  function handleSelectMode(mode) {
    if (mode === 'guide') {
      navigate(ROUTE_PATHS.guide)
      return
    }

    navigate(ROUTE_PATHS.performances)
  }

  return <HomeEntry onSelectMode={handleSelectMode} />
}

import { PerformanceCard } from './PerformanceCard.jsx'
import { Link } from 'react-router-dom'

export function PerformanceList({ performances, isLoading, errorMessage }) {
  if (isLoading) {
    return <p className="state-message">공연정보를 불러오는 중입니다.</p>
  }

  if (errorMessage) {
    return <p className="state-message error">{errorMessage}</p>
  }

  if (performances.length === 0) {
    return <p className="state-message">조건에 맞는 공연정보가 없습니다.</p>
  }

  return (
    <div className="performance-grid">
      {performances.map((performance) => (
        <Link
          className="performance-card-link"
          to={`/performances/${performance.seq}`}
          key={performance.seq}
        >
          <PerformanceCard performance={performance} />
        </Link>
      ))}
    </div>
  )
}

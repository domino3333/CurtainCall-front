import { formatCompactDate } from '../../../shared/lib/formatDate.js'

export function PerformanceCard({ performance }) {
  const status = getPerformanceStatus(performance)

  return (
    <article className="performance-card">
      <div className="poster-frame">
        {performance.thumbnail ? <img src={performance.thumbnail} alt="" /> : <span>NO IMAGE</span>}
        <span className={`performance-status ${status.type}`}>{status.label}</span>
      </div>
      <div className="performance-info">
        <div className="meta-row">
          <span>{performance.serviceName}</span>
          <span>{performance.realmName}</span>
        </div>
        <h2>{performance.title}</h2>
        <p className="venue">{performance.place}</p>
        <p className="location">
          {performance.area} {performance.sigungu}
        </p>
        <p className="date-range">
          {formatCompactDate(performance.startDate)} - {formatCompactDate(performance.endDate)}
        </p>
      </div>
    </article>
  )
}

function getPerformanceStatus(performance) {
  const today = new Date()
  const startDate = new Date(performance.startDate)
  const endDate = new Date(performance.endDate)

  if (!Number.isNaN(endDate.getTime()) && endDate < startOfDay(today)) {
    return { label: '종료', type: 'closed' }
  }

  if (!Number.isNaN(startDate.getTime()) && startDate > startOfDay(today)) {
    return { label: '예정', type: 'upcoming' }
  }

  return { label: '진행중', type: 'open' }
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

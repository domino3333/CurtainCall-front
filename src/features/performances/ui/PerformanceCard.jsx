import { formatCompactDate } from '../../../shared/lib/formatDate.js'

export function PerformanceCard({ performance }) {
  return (
    <article className="performance-card">
      <div className="poster-frame">
        {performance.thumbnail ? <img src={performance.thumbnail} alt="" /> : <span>NO IMAGE</span>}
      </div>
      <div className="performance-info">
        <div className="meta-row">
          <span>{performance.serviceName}</span>
          <span>{performance.realmName}</span>
        </div>
        <h2>{performance.title}</h2>
        <p>{performance.place}</p>
        <p>
          {performance.area} {performance.sigungu}
        </p>
        <p className="date-range">
          {formatCompactDate(performance.startDate)} - {formatCompactDate(performance.endDate)}
        </p>
      </div>
    </article>
  )
}

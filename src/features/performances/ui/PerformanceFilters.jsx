const FILTER_LABELS = {
  all: '전체',
}

export function PerformanceFilters({ realms, selectedRealm, onSelectRealm }) {
  return (
    <div className="filter-row" aria-label="공연 분류 필터">
      {realms.map((realm) => (
        <button
          className="filter-chip"
          data-active={selectedRealm === realm}
          key={realm}
          type="button"
          onClick={() => onSelectRealm(realm)}
        >
          {FILTER_LABELS[realm] ?? realm}
        </button>
      ))}
    </div>
  )
}

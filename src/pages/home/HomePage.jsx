import { useState } from 'react'
import { useAreaPerformances } from '../../features/performances/model/useAreaPerformances.js'
import { PerformanceFilters } from '../../features/performances/ui/PerformanceFilters.jsx'
import { PerformanceList } from '../../features/performances/ui/PerformanceList.jsx'
import { PerformanceSearch } from '../../features/performances/ui/PerformanceSearch.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedRealm, setSelectedRealm] = useState('all')
  const { performances, totalCount, realms, isLoading, errorMessage } = useAreaPerformances({
    searchKeyword,
    selectedRealm,
  })

  return (
    <>
      <PerformanceSearch value={searchKeyword} onChange={setSearchKeyword} />

      <section className="performance-section" aria-label="공연정보 목록">
        <div className="summary-strip">
          <div>
            <span className="summary-label">public data synced</span>
            <strong>{totalCount}</strong>
            <span>개의 문화정보</span>
          </div>
          <div>
            <span className="summary-label">curated search</span>
            <strong>{performances.length}</strong>
            <span>개 표시 중</span>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <span className="eyebrow">regional performance</span>
            <h1>공연정보</h1>
          </div>
          <span>{performances.length}개</span>
        </div>

        <PerformanceFilters
          realms={realms}
          selectedRealm={selectedRealm}
          onSelectRealm={setSelectedRealm}
        />

        <PerformanceList
          performances={performances}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </section>
    </>
  )
}

import { useState } from 'react'
import { useAreaPerformances } from '../../features/performances/model/useAreaPerformances.js'
import { PerformanceList } from '../../features/performances/ui/PerformanceList.jsx'
import { PerformanceSearch } from '../../features/performances/ui/PerformanceSearch.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const { performances, isLoading, errorMessage } = useAreaPerformances(searchKeyword)

  return (
    <>
      <PerformanceSearch value={searchKeyword} onChange={setSearchKeyword} />

      <section className="performance-section" aria-label="공연정보 목록">
        <div className="section-heading">
          <h1>공연정보</h1>
          <span>{performances.length}개</span>
        </div>

        <PerformanceList
          performances={performances}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </section>
    </>
  )
}

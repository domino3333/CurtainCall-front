import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAreaPerformances } from '../../features/performances/model/useAreaPerformances.js'
import { ModeHeader } from '../../features/performances/ui/ModeHeader.jsx'
import { PerformanceFilters } from '../../features/performances/ui/PerformanceFilters.jsx'
import { PerformanceList } from '../../features/performances/ui/PerformanceList.jsx'
import { PerformanceSearch } from '../../features/performances/ui/PerformanceSearch.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function PerformancesPage() {
  const [searchParams] = useSearchParams()
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') ?? '')
  const [selectedRealm, setSelectedRealm] = useState('all')
  const { performances, totalCount, realms, isLoading, errorMessage } = useAreaPerformances({
    searchKeyword,
    selectedRealm,
  })

  return (
    <>
      <ModeHeader
        title="모든 공연 보기"
        description="검색과 분류 필터로 전체 공연 정보를 직접 둘러보세요."
      />

      <PerformanceSearch value={searchKeyword} onChange={setSearchKeyword} />

      <section className="performance-section" aria-label="공연정보 목록">
        <div className="summary-strip">
          <div>
            <span className="summary-label">public data synced</span>
            <strong>{totalCount}</strong>
            <span>개의 문화정보를 불러왔어요</span>
          </div>
          <div>
            <span className="summary-label">browse mode</span>
            <strong>{performances.length}</strong>
            <span>개의 결과가 표시 중이에요</span>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <span className="eyebrow">all performances</span>
            <h2>전체 공연 탐색</h2>
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

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePagedPerformances } from '../../features/performances/model/usePagedPerformances.js'
import { ModeHeader } from '../../features/performances/ui/ModeHeader.jsx'
import { PerformanceFilters } from '../../features/performances/ui/PerformanceFilters.jsx'
import { PerformanceList } from '../../features/performances/ui/PerformanceList.jsx'
import { PerformancePagination } from '../../features/performances/ui/PerformancePagination.jsx'
import { PerformanceSearch } from '../../features/performances/ui/PerformanceSearch.jsx'
import '../../features/performances/ui/PerformanceSection.css'

const PAGE_SIZE = 12

export function PerformancesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKeyword = searchParams.get('keyword') ?? ''
  const [searchInput, setSearchInput] = useState(searchKeyword)
  const selectedRealm = searchParams.get('realm') ?? 'all'
  const currentPage = Math.max(Number(searchParams.get('page') ?? '1'), 1)
  const {
    performances,
    totalCount,
    totalPages,
    realms,
    isLoading,
    errorMessage,
  } = usePagedPerformances({
    page: currentPage,
    size: PAGE_SIZE,
    searchKeyword,
    selectedRealm,
  })

  function updateSearchParams(nextValues) {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(nextValues).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || value === 'all') {
        nextParams.delete(key)
      } else {
        nextParams.set(key, String(value))
      }
    })

    setSearchParams(nextParams)
  }

  function handleSearchChange(nextKeyword) {
    setSearchInput(nextKeyword)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    updateSearchParams({ keyword: searchInput, page: 1 })
  }

  function handleRealmChange(nextRealm) {
    updateSearchParams({ realm: nextRealm, page: 1 })
  }

  function handlePageChange(nextPage) {
    updateSearchParams({ page: nextPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <ModeHeader
        title="모든 공연 보기"
        description="저장된 공연 정보를 검색하고 분야별로 살펴볼 수 있어요."
      />

      <PerformanceSearch
        value={searchInput}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <section className="performance-section" aria-label="공연정보 목록">
        <div className="section-heading">
          <div>
            <span className="eyebrow">공연 목록</span>
            <h2>전체 공연 탐색</h2>
          </div>
          <span>총 {totalCount}개</span>
        </div>

        <PerformanceFilters
          realms={realms}
          selectedRealm={selectedRealm}
          onSelectRealm={handleRealmChange}
        />

        <PerformanceList
          performances={performances}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <PerformancePagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  )
}

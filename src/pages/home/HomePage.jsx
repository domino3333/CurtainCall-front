import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import {
  INITIAL_GUIDE_STATE,
  recommendPerformances,
} from '../../features/performances/model/recommendationRules.js'
import { useAreaPerformances } from '../../features/performances/model/useAreaPerformances.js'
import { GuidedRecommendation } from '../../features/performances/ui/GuidedRecommendation.jsx'
import { HomeEntry } from '../../features/performances/ui/HomeEntry.jsx'
import { PerformanceFilters } from '../../features/performances/ui/PerformanceFilters.jsx'
import { PerformanceList } from '../../features/performances/ui/PerformanceList.jsx'
import { PerformanceSearch } from '../../features/performances/ui/PerformanceSearch.jsx'
import '../../features/performances/ui/PerformanceSection.css'

function ModeHeader({ title, description, onBack }) {
  return (
    <header className="mode-header">
      <button className="text-button" type="button" onClick={onBack}>
        처음으로
      </button>
      <div>
        <span className="eyebrow">curtaincall</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Link className="mode-login-button" to={ROUTE_PATHS.login}>
        로그인
      </Link>
    </header>
  )
}

export function HomePage() {
  const [homeMode, setHomeMode] = useState('entry')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedRealm, setSelectedRealm] = useState('all')
  const [guideSelections, setGuideSelections] = useState(INITIAL_GUIDE_STATE)
  const { performances, allPerformances, totalCount, realms, isLoading, errorMessage } =
    useAreaPerformances({
      searchKeyword,
      selectedRealm,
    })

  const recommendations = useMemo(
    () => recommendPerformances(allPerformances, guideSelections),
    [allPerformances, guideSelections],
  )

  function handleGuideSelect(key, value) {
    setGuideSelections((currentSelections) => ({
      ...currentSelections,
      [key]: value,
    }))
  }

  function handleEntrySearchSubmit(event) {
    event.preventDefault()
    setHomeMode('all')
  }

  if (homeMode === 'entry') {
    return (
      <HomeEntry
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        onSearchSubmit={handleEntrySearchSubmit}
        onSelectMode={setHomeMode}
      />
    )
  }

  if (homeMode === 'guide') {
    return (
      <>
        <ModeHeader
          title="조건에 따라 검색하기"
          description="날씨, 동행, 분위기를 고르면 어울리는 공연과 전시를 먼저 추려드려요."
          onBack={() => setHomeMode('entry')}
        />
        <GuidedRecommendation
          selections={guideSelections}
          onSelect={handleGuideSelect}
          onReset={() => setGuideSelections(INITIAL_GUIDE_STATE)}
          recommendations={recommendations}
          totalCount={totalCount}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </>
    )
  }

  return (
    <>
      <ModeHeader
        title="모든 공연 보기"
        description="검색과 분류 필터로 전체 공연 정보를 직접 둘러보세요."
        onBack={() => setHomeMode('entry')}
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

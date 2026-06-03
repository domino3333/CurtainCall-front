import { useMemo, useState } from 'react'
import {
  INITIAL_GUIDE_STATE,
  recommendPerformances,
} from '../../features/performances/model/recommendationRules.js'
import { usePagedPerformances } from '../../features/performances/model/usePagedPerformances.js'
import { GuidedRecommendation } from '../../features/performances/ui/GuidedRecommendation.jsx'
import { ModeHeader } from '../../features/performances/ui/ModeHeader.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function GuidePage() {
  const [guideSelections, setGuideSelections] = useState(INITIAL_GUIDE_STATE)
  const { performances, totalCount, isLoading, errorMessage } = usePagedPerformances({
    page: 1,
    size: 120,
    searchKeyword: '',
    selectedRealm: 'all',
  })

  const recommendations = useMemo(
    () => recommendPerformances(performances, guideSelections),
    [performances, guideSelections],
  )

  function handleGuideSelect(key, value) {
    setGuideSelections((currentSelections) => ({
      ...currentSelections,
      [key]: value,
    }))
  }

  return (
    <>
      <ModeHeader
        title="조건에 따라 검색하기"
        description="몇 가지 조건만 고르면 지금 보기 좋은 공연을 추려드려요."
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

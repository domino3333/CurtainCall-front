import { useMemo, useState } from 'react'
import {
  INITIAL_GUIDE_STATE,
  recommendPerformances,
} from '../../features/performances/model/recommendationRules.js'
import { useAreaPerformances } from '../../features/performances/model/useAreaPerformances.js'
import { GuidedRecommendation } from '../../features/performances/ui/GuidedRecommendation.jsx'
import { ModeHeader } from '../../features/performances/ui/ModeHeader.jsx'
import '../../features/performances/ui/PerformanceSection.css'

export function GuidePage() {
  const [guideSelections, setGuideSelections] = useState(INITIAL_GUIDE_STATE)
  const { allPerformances, totalCount, isLoading, errorMessage } = useAreaPerformances({
    searchKeyword: '',
    selectedRealm: 'all',
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

  return (
    <>
      <ModeHeader
        title="조건에 따라 검색하기"
        description="날씨, 동행, 분위기를 고르면 어울리는 공연과 전시를 먼저 추려드려요."
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

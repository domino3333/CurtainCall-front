import { Link } from 'react-router-dom'
import { formatCompactDate } from '../../../shared/lib/formatDate.js'
import { GUIDE_STEPS } from '../model/recommendationRules.js'

function getSelectedLabel(step, value) {
  return step.options.find((option) => option.value === value)?.label ?? '상관없음'
}

function RecommendationCard({ result, rank }) {
  const { performance, reasons } = result

  return (
    <Link className="recommendation-card" to={`/performances/${performance.seq}`}>
      <div className="recommendation-rank">추천 {rank}</div>
      <div className="recommendation-poster">
        {performance.thumbnail ? (
          <img src={performance.thumbnail} alt="" />
        ) : (
          <span>이미지 준비중</span>
        )}
      </div>
      <div className="recommendation-content">
        <div className="meta-row">
          <span>{performance.serviceName || '문화정보'}</span>
          <span>{performance.realmName || '분야 미정'}</span>
        </div>
        <h3>{performance.title}</h3>
        <p className="venue">{performance.place}</p>
        <p className="location">
          {performance.area} {performance.sigungu}
        </p>
        <p className="date-range">
          {formatCompactDate(performance.startDate)} - {formatCompactDate(performance.endDate)}
        </p>
        <ul className="reason-list">
          {reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export function GuidedRecommendation({
  selections,
  onSelect,
  onReset,
  recommendations,
  totalCount,
  isLoading,
  errorMessage,
}) {
  const selectedSummary = GUIDE_STEPS.filter((step) => selections[step.key] !== 'any').map((step) => ({
    key: step.key,
    label: getSelectedLabel(step, selections[step.key]),
  }))
  const pickedCount = Object.values(selections).filter((value) => value !== 'any').length

  return (
    <section className="guide-section" aria-label="취향 기반 공연 추천">
      <div className="guide-intro">
        <span className="eyebrow">추천 검색</span>
        <h1>선택이 어려울 때 쓰는 빠른 추천</h1>
        <p>
          장르 이름을 정확히 몰라도 괜찮아요. 날씨, 동행, 분위기만 골라서 후보를 좁혀보세요.
        </p>
      </div>

      <div className="guide-workspace">
        <div className="guide-panel">
          <div className="guide-panel-heading">
            <div>
              <span className="summary-label">조건 선택</span>
              <h2>오늘의 선택</h2>
            </div>
            <button className="text-button" type="button" onClick={onReset}>
              초기화
            </button>
          </div>

          <div className="selection-summary" aria-label="현재 선택한 조건">
            {selectedSummary.length === 0 ? (
              <span>조건을 선택하면 여기에 표시됩니다</span>
            ) : (
              selectedSummary.map((item) => <span key={item.key}>{item.label}</span>)
            )}
          </div>

          <div className="guide-steps">
            {GUIDE_STEPS.map((step) => (
              <fieldset className="guide-step" key={step.key}>
                <legend>
                  <strong>{step.title}</strong>
                  <span>{step.description}</span>
                </legend>
                <div className="choice-row">
                  {step.options.map((option) => (
                    <button
                      className="choice-chip"
                      data-active={selections[step.key] === option.value}
                      key={option.value}
                      type="button"
                      aria-pressed={selections[step.key] === option.value}
                      onClick={() => onSelect(step.key, option.value)}
                    >
                      <span>{option.label}</span>
                      <small>{option.helper}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <aside className="recommendation-panel" aria-label="추천 결과">
          <div className="recommendation-heading">
            <div>
              <span className="summary-label">추천 결과</span>
              <h2>지금 추천</h2>
            </div>
            <span className="picked-count">{pickedCount}개 조건 선택</span>
          </div>

          <p className="recommendation-note">
            저장된 공연 {totalCount}개 중 현재 조건과 가까운 항목을 먼저 보여줍니다.
          </p>

          {isLoading && <p className="state-message">공연정보를 불러오는 중입니다.</p>}
          {errorMessage && <p className="state-message error">{errorMessage}</p>}

          {!isLoading && !errorMessage && recommendations.length === 0 && (
            <p className="state-message">조건에 맞는 추천 결과가 아직 없습니다.</p>
          )}

          {!isLoading && !errorMessage && recommendations.length > 0 && (
            <div className="recommendation-list">
              {recommendations.map((result, index) => (
                <RecommendationCard
                  result={result}
                  rank={index + 1}
                  key={result.performance.seq}
                />
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

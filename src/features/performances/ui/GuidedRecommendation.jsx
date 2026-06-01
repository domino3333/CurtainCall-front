import { formatCompactDate } from '../../../shared/lib/formatDate.js'
import { GUIDE_STEPS } from '../model/recommendationRules.js'

function getSelectedLabel(step, value) {
  return step.options.find((option) => option.value === value)?.label ?? '상관없음'
}

function RecommendationCard({ result, rank }) {
  const { performance, reasons } = result

  return (
    <article className="recommendation-card">
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
    </article>
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
  const selectedSummary = GUIDE_STEPS.map((step) => getSelectedLabel(step, selections[step.key]))
  const pickedCount = Object.values(selections).filter((value) => value !== 'any').length

  return (
    <section className="guide-section" aria-label="취향 기반 공연 추천">
      <div className="guide-intro">
        <span className="eyebrow">guided pick</span>
        <h1>뭘 볼지 몰라도 괜찮아요.</h1>
        <p>
          몇 번만 눌러보면 지금 고르기 좋은 공연과 전시를 먼저 추려드릴게요. 검색은
          나중에 해도 됩니다.
        </p>
      </div>

      <div className="guide-workspace">
        <div className="guide-panel">
          <div className="guide-panel-heading">
            <div>
              <span className="summary-label">curtaincall selector</span>
              <h2>오늘의 선택</h2>
            </div>
            <button className="text-button" type="button" onClick={onReset}>
              초기화
            </button>
          </div>

          <div className="selection-summary" aria-label="현재 선택한 조건">
            {selectedSummary.map((label) => (
              <span key={label}>{label}</span>
            ))}
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
              <span className="summary-label">top picks</span>
              <h2>지금 추천</h2>
            </div>
            <span className="picked-count">{pickedCount}개 조건 선택</span>
          </div>

          <p className="recommendation-note">
            현재는 공공데이터 {totalCount}개를 프론트 룰로 점수화해서 보여줘요. DB 저장이
            끝나면 이 로직은 백엔드 추천 API로 옮기면 됩니다.
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

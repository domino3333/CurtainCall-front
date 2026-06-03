import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import { getPerformance } from '../../entities/performance/api/performanceApi.js'
import { formatCompactDate } from '../../shared/lib/formatDate.js'
import '../../features/performances/ui/PerformanceSection.css'

export function PerformanceDetailPage() {
  const { seq } = useParams()
  const navigate = useNavigate()
  const [performance, setPerformance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchPerformance() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const detail = await getPerformance(seq, abortController.signal)
        setPerformance(detail)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage(error.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchPerformance()

    return () => {
      abortController.abort()
    }
  }, [seq])

  if (isLoading) {
    return <p className="state-message">공연정보를 불러오는 중입니다.</p>
  }

  if (errorMessage) {
    return (
      <main className="detail-page">
        <p className="state-message error">{errorMessage}</p>
        <button className="text-button" type="button" onClick={() => navigate(-1)}>
          이전으로
        </button>
      </main>
    )
  }

  if (!performance) {
    return null
  }

  const imageUrl = performance.imgUrl || performance.thumbnail
  const location = [performance.area, performance.sigungu].filter(Boolean).join(' ')

  return (
    <main className="detail-page">
      <div className="detail-actions">
        <button className="text-button" type="button" onClick={() => navigate(-1)}>
          이전으로
        </button>
        <Link className="text-button" to={ROUTE_PATHS.performances}>
          전체보기
        </Link>
      </div>

      <article className="detail-shell">
        <div className="detail-poster">
          {imageUrl ? <img src={imageUrl} alt="" /> : <span>이미지 준비중</span>}
        </div>

        <section className="detail-content">
          <div className="meta-row">
            <span>{performance.serviceName || '문화정보'}</span>
            <span>{performance.realmName || '분야 미정'}</span>
          </div>
          <h1>{performance.title}</h1>

          <dl className="detail-info-grid">
            <div>
              <dt>기간</dt>
              <dd>
                {formatCompactDate(performance.startDate)} -{' '}
                {formatCompactDate(performance.endDate)}
              </dd>
            </div>
            <div>
              <dt>장소</dt>
              <dd>{performance.place || '장소 미정'}</dd>
            </div>
            <div>
              <dt>지역</dt>
              <dd>{location || '지역 미정'}</dd>
            </div>
            <div>
              <dt>가격</dt>
              <dd>{performance.price || '정보 없음'}</dd>
            </div>
            <div>
              <dt>문의</dt>
              <dd>{performance.phone || '정보 없음'}</dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>{performance.placeAddr || '정보 없음'}</dd>
            </div>
          </dl>

          {performance.contents && (
            <div className="detail-description">
              <h2>소개</h2>
              <p>{performance.contents}</p>
            </div>
          )}

          <div className="detail-link-row">
            {performance.url && (
              <a href={performance.url} target="_blank" rel="noreferrer">
                공연 정보 보기
              </a>
            )}
            {performance.placeUrl && (
              <a href={performance.placeUrl} target="_blank" rel="noreferrer">
                장소 정보 보기
              </a>
            )}
          </div>
        </section>
      </article>
    </main>
  )
}

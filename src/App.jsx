import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = '/api/performance/test'

function getXmlText(parent, tagName) {
  return parent.querySelector(tagName)?.textContent?.trim() ?? ''
}

function normalizeXmlResponse(xmlText) {
  const document = new DOMParser().parseFromString(xmlText, 'application/xml')
  const parserError = document.querySelector('parsererror')

  if (parserError) {
    throw new Error('공연정보 XML을 읽지 못했습니다.')
  }

  return [...document.querySelectorAll('item')].map((item) => ({
    seq: getXmlText(item, 'seq'),
    serviceName: getXmlText(item, 'serviceName'),
    title: getXmlText(item, 'title'),
    startDate: getXmlText(item, 'startDate'),
    endDate: getXmlText(item, 'endDate'),
    place: getXmlText(item, 'place'),
    realmName: getXmlText(item, 'realmName'),
    area: getXmlText(item, 'area'),
    sigungu: getXmlText(item, 'sigungu'),
    thumbnail: getXmlText(item, 'thumbnail'),
  }))
}

function normalizeJsonResponse(data) {
  const rawItems = data?.body?.items?.item ?? []
  const items = Array.isArray(rawItems) ? rawItems : [rawItems]

  return items.map((item) => ({
    seq: item.seq,
    serviceName: item.serviceName,
    title: item.title,
    startDate: item.startDate,
    endDate: item.endDate,
    place: item.place,
    realmName: item.realmName,
    area: item.area,
    sigungu: item.sigungu,
    thumbnail: item.thumbnail,
  }))
}

function formatDate(value) {
  if (!value || value.length !== 8) {
    return value
  }

  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`
}

function App() {
  const [performances, setPerformances] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchPerformances() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`공연정보를 불러오지 못했습니다. (${response.status})`)
        }

        const contentType = response.headers.get('content-type') ?? ''
        const text = await response.text()
        const items = contentType.includes('application/json')
          ? normalizeJsonResponse(JSON.parse(text))
          : normalizeXmlResponse(text)

        setPerformances(items)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPerformances()
  }, [])

  const filteredPerformances = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase()

    if (!keyword) {
      return performances
    }

    return performances.filter((performance) => {
      const searchableText = [
        performance.title,
        performance.place,
        performance.area,
        performance.sigungu,
        performance.realmName,
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(keyword)
    })
  }, [performances, searchKeyword])

  return (
    <main className="app-shell">
      <header className="site-header">
        <button type="button" className="login-button">
          로그인
        </button>
        <div className="brand-banner">커튼콜</div>
      </header>

      <section className="search-section">
        <input
          className="search-input"
          type="search"
          placeholder="공연명, 장소, 지역으로 검색"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </section>

      <section className="performance-section" aria-label="공연정보 목록">
        <div className="section-heading">
          <h1>공연정보</h1>
          <span>{filteredPerformances.length}개</span>
        </div>

        {isLoading && <p className="state-message">공연정보를 불러오는 중입니다.</p>}
        {errorMessage && <p className="state-message error">{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <div className="performance-grid">
            {filteredPerformances.map((performance) => (
              <article className="performance-card" key={performance.seq}>
                <div className="poster-frame">
                  {performance.thumbnail ? (
                    <img src={performance.thumbnail} alt="" />
                  ) : (
                    <span>NO IMAGE</span>
                  )}
                </div>
                <div className="performance-info">
                  <div className="meta-row">
                    <span>{performance.serviceName}</span>
                    <span>{performance.realmName}</span>
                  </div>
                  <h2>{performance.title}</h2>
                  <p>{performance.place}</p>
                  <p>
                    {performance.area} {performance.sigungu}
                  </p>
                  <p className="date-range">
                    {formatDate(performance.startDate)} - {formatDate(performance.endDate)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App

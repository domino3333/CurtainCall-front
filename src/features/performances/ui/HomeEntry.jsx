import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../app/router/routePaths.js'

export function HomeEntry({ onSelectMode }) {
  return (
    <main className="home-entry">
      <div className="entry-ambience" aria-hidden="true">
        <div className="curtain-panel curtain-left" />
        <div className="curtain-panel curtain-right" />
        <div className="spotlight spotlight-left" />
        <div className="spotlight spotlight-right" />
        <div className="floating-ticket ticket-one" />
        <div className="floating-ticket ticket-two" />
        <div className="floating-ticket ticket-three" />
        <div className="ticket-mascot">
          <div className="mascot-arm" />
          <div className="mascot-face">
            <span />
            <span />
          </div>
        </div>
      </div>

      <header className="entry-header">
        <Link className="entry-login-button" to={ROUTE_PATHS.login}>
          로그인
        </Link>
        <div className="entry-brand">
          <span>공연 정보 탐색</span>
          <h1>커튼콜</h1>
        </div>
      </header>

      <section className="entry-choice-grid" aria-label="공연 탐색 방식 선택">
        <button className="entry-choice-card guide" type="button" onClick={() => onSelectMode('guide')}>
          <span>추천 검색</span>
          <strong>조건에 따라 검색하기</strong>
          <p>날씨, 동행, 분위기를 고르면 지금 보기 좋은 공연을 먼저 추천해드려요.</p>
          <em>추천 받기</em>
        </button>

        <button className="entry-choice-card browse" type="button" onClick={() => onSelectMode('all')}>
          <span>전체 목록</span>
          <strong>모든 공연 보기</strong>
          <p>공공데이터에서 불러온 공연과 전시를 목록으로 훑어보고 직접 골라요.</p>
          <em>목록 보기</em>
        </button>
      </section>
    </main>
  )
}

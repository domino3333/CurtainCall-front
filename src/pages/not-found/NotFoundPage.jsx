import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link to={ROUTE_PATHS.home}>홈으로 돌아가기</Link>
    </main>
  )
}

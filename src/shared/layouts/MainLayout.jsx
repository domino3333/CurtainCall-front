import { Link, Outlet } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/routePaths.js'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="login-button" to={ROUTE_PATHS.login}>
          로그인
        </Link>
        <Link className="brand-banner" to={ROUTE_PATHS.home}>
          커튼콜
        </Link>
      </header>
      <Outlet />
    </div>
  )
}

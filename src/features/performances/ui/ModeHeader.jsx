import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../app/router/routePaths.js'

export function ModeHeader({ title, description }) {
  return (
    <header className="mode-header">
      <Link className="text-button mode-home-link" to={ROUTE_PATHS.home}>
        처음으로
      </Link>
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

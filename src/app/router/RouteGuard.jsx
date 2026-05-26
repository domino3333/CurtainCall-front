import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths.js'
import { authStorage } from '../../shared/lib/authStorage.js'

export function RouteGuard({ access }) {
  const location = useLocation()
  const isAuthenticated = authStorage.isAuthenticated()

  if (access === 'authOnly' && !isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.login} state={{ from: location }} replace />
  }

  if (access === 'publicOnly' && isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.home} replace />
  }

  return <Outlet />
}

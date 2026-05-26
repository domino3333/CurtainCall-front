import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { LoginPage } from '../../pages/login/LoginPage.jsx'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage.jsx'
import { MainLayout } from '../../shared/layouts/MainLayout.jsx'
import { ROUTE_PATHS } from './routePaths.js'
import { RouteGuard } from './RouteGuard.jsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route element={<RouteGuard access="publicOnly" />}>
            <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
          </Route>

          <Route element={<RouteGuard access="authOnly" />}>
            <Route path={ROUTE_PATHS.myPage} element={<Navigate to={ROUTE_PATHS.home} replace />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

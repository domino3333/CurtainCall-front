import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GuidePage } from '../../pages/guide/GuidePage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { LoginPage } from '../../pages/login/LoginPage.jsx'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage.jsx'
import { PerformanceDetailPage } from '../../pages/performance-detail/PerformanceDetailPage.jsx'
import { PerformancesPage } from '../../pages/performances/PerformancesPage.jsx'
import { MainLayout } from '../../shared/layouts/MainLayout.jsx'
import { ROUTE_PATHS } from './routePaths.js'
import { RouteGuard } from './RouteGuard.jsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTE_PATHS.guide} element={<GuidePage />} />
          <Route path={ROUTE_PATHS.performances} element={<PerformancesPage />} />
          <Route path={ROUTE_PATHS.performanceDetail} element={<PerformanceDetailPage />} />

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

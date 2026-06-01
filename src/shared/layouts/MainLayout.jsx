import { Outlet } from 'react-router-dom'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  )
}

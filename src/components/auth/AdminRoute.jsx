import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminRoute() {
  const { user, profile, isLoading } = useAuth()

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF8FC]">Loading admin...</div>
  }

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

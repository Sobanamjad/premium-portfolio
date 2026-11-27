import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '')

  const handleLogin  = (t) => setToken(t)
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setToken('')
  }

  if (!token) return <AdminLogin onLogin={handleLogin} />
  return <AdminDashboard token={token} onLogout={handleLogout} />
}

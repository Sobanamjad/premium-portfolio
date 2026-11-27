import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminCursor from '../components/AdminCursor'

export default function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '')

  const handleLogin  = (t) => setToken(t)
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setToken('')
  }

  return (
    <>
      <AdminCursor />
      {token ? <AdminDashboard token={token} onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />}
    </>
  )
}

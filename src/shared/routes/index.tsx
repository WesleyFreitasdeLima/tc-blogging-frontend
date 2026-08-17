import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'

import { AuthPage } from '@/view/pages/auth'

export function Router() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  )
}
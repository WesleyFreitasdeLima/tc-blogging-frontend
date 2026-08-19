import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'

// import { AuthPage } from '@/view/pages/auth'
import { HomePage } from '@/view/pages/home'
import { MainLayout } from '@/view/layouts/main-layout'
import { PostPage } from '@/view/pages/post'
import { AuthPage } from '@/view/pages/auth'

export function Router() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/post/:id" element={<PostPage />} />

        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  )
}

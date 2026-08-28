import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router'

import { HomePage } from '@/view/pages/home'
import { MainLayout } from '@/view/layouts/main-layout'
import { PostPage } from '@/view/pages/post'
import { AuthPage } from '@/view/pages/auth'
import { NewPostPage } from '@/view/pages/new-post'
import { AdminPostsPage } from '@/view/pages/admin'
import { AdminUsersPage } from '@/view/pages/user'
import { authService } from '../services/auth/auth.service'
import { NewUserPage } from '@/view/pages/user/components/new-user'
import { UpdateUserPage } from '@/view/pages/user/components/edit-user-modal'

function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function AdminRoute() {
  const isAuthenticated = authService.isAuthenticated()
  const isAdmin = authService.isAdmin()

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function Router() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<HomePage />} />

        {/* Público */}
        <Route path="posts/:id" element={<PostPage />} />

        <Route path="auth" element={<AuthPage />} />

        {/* Autenticado */}
        <Route element={<ProtectedRoute />}>
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="admin/posts" element={<AdminPostsPage />} />
          <Route path="admin/users/:id" element={<UpdateUserPage />} />

          {/* Apenas ADMIN */}
          <Route element={<AdminRoute />}>
            <Route path="admin/users" element={<AdminUsersPage />} />
            <Route path="admin/users/new" element={<NewUserPage />} />
          </Route>
        </Route>

        {/* Rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

import { BrowserRouter } from 'react-router'
import { Router } from './shared/routes'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/config/query-client'

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

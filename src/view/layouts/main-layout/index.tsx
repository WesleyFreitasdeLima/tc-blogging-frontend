import { Outlet } from 'react-router'
import { Header } from './components/header'

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span className="text-foreground">Conhecimento em movimento</span>
          <span>Uma publicação da comunidade universitária</span>
        </div>
      </footer>
    </>
  )
}

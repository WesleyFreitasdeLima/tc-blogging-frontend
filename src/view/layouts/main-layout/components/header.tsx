import { authService } from '@/shared/services/auth/auth.service'
import { Button } from '@/view/components/ui/button'
import { BookOpen, LogIn, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin'
}
interface MenuLink {
  link: string
  label: string
}
export function Header() {
  const navigate = useNavigate()
  const [user] = useState<User | null>(null)
  const [open, setOpen] = useState(false)

  const isAuthenticated = authService.isAuthenticated()

  let menuLinks: MenuLink[] = []

  if (isAuthenticated) {
    menuLinks = [
      /* { link: '/', label: 'Posts' },
    { link: '/posts/new', label: 'Escrever' }, */
      { link: '/admin/posts', label: 'Administração' },
      { link: '/admin/users', label: 'Usuários' },
    ]
  }

  function logout() {
    authService.logout()

    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen data-icon="inline-start" />
            </span>
          </Link>

          <div className="bg-border w-px h-6" />

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            {menuLinks.map((link) => (
              <NavLink
                key={link.label}
                className={({ isActive }) =>
                  isActive
                    ? 'text-foreground'
                    : 'text-foreground/80 hover:text-foreground transition'
                }
                to={link.link}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 border-l border-border pl-4 text-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  SA
                </span>
                <span className="max-w-32 truncate">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sair"
                onClick={logout}
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="flex items-center gap-2"
                    title="Loout do sistema."
                  >
                    <LogOut />
                    <span>Sair</span>
                  </Button>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/auth">
                    <LogIn className="mr-1" data-icon="inline-start" />
                    Entrar
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-border bg-background px-5 py-5 md:hidden">
          {menuLinks.map((link) => (
            <Link to={link.link}>{link.label}</Link>
          ))}

          {user ? (
            <Button
              variant="ghost"
              onClick={logout}
              className="flex items-center gap-2"
              title="Loout do sistema."
            >
              <LogOut />
              <span>Sair</span>
            </Button>
          ) : (
            <Link to="/auth" title="Login no sistema">
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

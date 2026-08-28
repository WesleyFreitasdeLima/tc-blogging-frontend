import { Button } from '@/view/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { useController } from './use-controller'

export function AdminUsersPage() {
  const {
    isLoading,
    navigate,
    query,
    setQuery,
    filtered,

    loadMore,
    hasNextPage,
    isLoadingMore,
  } = useController()

  if (isLoading) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Carregando painel...
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div
          data-aos="fade-up"
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Usuários
            </p>

            <h1 className="mt-2 text-5xl">Administração</h1>
          </div>

          <Button onClick={() => navigate('/admin/users/new')}>
            <Plus data-icon="inline-start" />
            Novo usuário
          </Button>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 rounded-lg border border-input px-3 py-2 md:w-80">
              <Search className="text-muted-foreground" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar publicações"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">ID</th>

                  <th className="px-5 py-4">Login</th>

                  <th className="px-5 py-4">Nome</th>

                  <th className="px-5 py-4">E-mail</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filtered.map((user) => (
                  <tr key={user.id}>
                    <td className="min-w-64 px-5 py-4">
                      <span className="font-semibold hover:text-primary">
                        {user.id}
                      </span>
                    </td>
                    <td className="min-w-64 px-5 py-4">
                      <span className="font-semibold hover:text-primary">
                        {user.username}
                      </span>
                    </td>
                    <td className="min-w-64 px-5 py-4">
                      <span className="font-semibold hover:text-primary">
                        {user.name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {user.email}
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-12 text-center text-muted-foreground"
                    >
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Carregar mais */}
          {hasNextPage && (
            <div className="flex justify-center border-t border-border py-6">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

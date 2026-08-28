import { Button } from '@/view/components/ui/button'
import { Edit3, Plus, Search, Trash2 } from 'lucide-react'
import { useController } from './use-controller'
import { DeletePostModal } from './components/delete-post-modal'
import { EditPostModal } from './components/edit-post-modal'

export function AdminPostsPage() {
  const {
    isLoading,
    navigate,
    query,
    setQuery,
    filtered,

    loadMore,
    hasNextPage,
    isLoadingMore,

    postSelected,
    toggleDeletePostModal,
    deletePostModalIsOpen,
    toggleEditPostModal,
    editPostModalIsOpen,
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
        {/* Cabeçalho */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Painel editorial
            </p>

            <h1 className="mt-2 text-5xl">Administração</h1>

            <p className="mt-3 text-muted-foreground">
              Acompanhe e organize as publicações da comunidade.
            </p>
          </div>

          <Button onClick={() => navigate('/posts/new')}>
            <Plus data-icon="inline-start" />
            Nova publicação
          </Button>
        </div>

        {/* Listagem */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="rounded-2xl border border-border bg-card shadow-sm"
        >
          {/* Busca */}
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

            {/* Quantidade encontrada */}
            <p className="text-sm text-muted-foreground">
              {filtered.length === 1
                ? '1 publicação encontrada'
                : `${filtered.length} publicações encontradas`}
            </p>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Publicação</th>
                  <th className="px-5 py-4">Autor</th>
                  <th className="px-5 py-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filtered.map((post) => (
                  <tr key={post.id}>
                    <td className="min-w-64 px-5 py-4">
                      <span className="font-semibold hover:text-primary">
                        {post.title}
                      </span>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString('pt-BR')} ·{' '}
                        {post.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {post.createdBy.name}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Editar"
                          onClick={() => toggleEditPostModal(null, post)}
                        >
                          <Edit3 />
                        </Button>

                        <Button
                          variant="destructive"
                          size="icon"
                          aria-label="Excluir"
                          onClick={() => toggleDeletePostModal(null, post)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-12 text-center text-muted-foreground"
                    >
                      Nenhuma publicação encontrada.
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

      <DeletePostModal
        onOpenChange={(state) => toggleDeletePostModal(state, null)}
        post={postSelected}
        open={deletePostModalIsOpen}
      />

      <EditPostModal
        onOpenChange={(state) => toggleEditPostModal(state, null)}
        post={postSelected}
        open={editPostModalIsOpen}
      />
    </>
  )
}

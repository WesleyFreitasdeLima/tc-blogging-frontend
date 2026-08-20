import { Button } from '@/view/components/ui/button'
import {
  Edit3,
  Eye,
  FileText,
  PenLine,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import { useController } from './use-controller'
import { Metric } from './components/metric'
import { DeletePostModal } from './components/delete-post-modal'
import { EditPostModal } from './components/edit-post-modal'

export function AdminPostsPage() {
  const {
    isLoading,
    navigate,
    posts,
    query,
    setQuery,
    filtered,
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
            <Plus data-icon="inline-start" /> Nova publicação
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Metric
            icon={<FileText />}
            label="Total de posts"
            value={posts.length}
          />

          <Metric icon={<Eye />} label="Total de posts" value={posts.length} />

          <Metric
            icon={<PenLine />}
            label="Total de posts"
            value={posts.length}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
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
                        {post.createdAt} · {post.id}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {post.author}
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
              </tbody>
            </table>
          </div>
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

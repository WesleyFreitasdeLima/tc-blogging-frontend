import type { Post } from '@/shared/models/posts'
import { PostCard } from './post-card'
import { FileText } from 'lucide-react'

interface PostsListProps {
  isLoading: boolean
  posts: Post[]
}

export function PostsList({ isLoading, posts }: PostsListProps) {
  return (
    <section className="py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary uppercase">posts</p>
          <h2 className="mt-1 text-3xl">Publicações recentes</h2>
        </div>
        <div className="flex flex-wrap gap-2"></div>
      </div>
      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-72 animate-pulse rounded-2xl bg-secondary"
            />
          ))}
        </div>
      ) : posts.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <FileText className="mx-auto text-muted-foreground" />
          <p className="mt-4 font-medium">Nenhuma publicação encontrada</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tente ajustar sua busca ou categoria.
          </p>
        </div>
      )}
    </section>
  )
}

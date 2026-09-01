import type { Post } from '@/shared/models/posts'
import { PostCard } from './post-card'
import { FileText } from 'lucide-react'
import { Button } from '@/view/components/ui/button'

interface PostsListProps {
  isLoading: boolean
  loadMore: () => void
  isLoadingMore: boolean
  hasNextPage: boolean
  posts: Post[]
}

export function PostsList({
  isLoading,
  posts,
  loadMore,
  hasNextPage,
  isLoadingMore,
}: PostsListProps) {
  return (
    <section className="py-10">
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-primary uppercase">posts</p>
          <h2 className="mt-1 text-3xl">Publicações recentes</h2>
        </div>
        <div className="flex flex-wrap gap-2"></div>
      </div>
      {isLoading ? (
        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-duration="400"
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-72 animate-pulse rounded-2xl bg-secondary"
            />
          ))}
        </div>
      ) : posts.length ? (
        <>
          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            data-aos="zoom-in"
            data-aos-delay="800"
            data-aos-duration="600"
          >
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center py-8">
              <Button
                variant="outline"
                onClick={() => loadMore()}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <FileText className="mx-auto text-muted-foreground" />
          <p className="mt-4 font-medium text-sm text-muted-foreground">
            Nenhuma publicação encontrada
          </p>
        </div>
      )}
    </section>
  )
}

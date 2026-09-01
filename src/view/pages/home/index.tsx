import { Search } from 'lucide-react'
import { PostsList } from './components/posts-list'
import { useController } from './use-controller'

export function HomePage() {
  const {
    isLoading,
    posts,
    query,
    setQuery,
    loadMore,
    hasNextPage,
    isLoadingMore,
  } = useController()

  return (
    <div>
      <section className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">{`// ${'Ideias que atravessam'}`}</p>
          <h1
            data-aos="fade-up"
            className="max-w-3xl text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl"
          >
            Pensar junto muda o que{' '}
            <span className="text-primary">podemos fazer.</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground"
          >
            Textos, perguntas e descobertas de quem faz da universidade um lugar
            de encontro com o mundo.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm lg:max-w-sm">
            <Search className="text-muted-foreground" />
            <input
              aria-label="Buscar posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título ou conteúdo"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {!isLoading
                ? `${posts.length ?? 0} publica${posts.length > 1 ? 'ções' : 'ção'} encontra${posts.length > 1 ? 'das' : 'da'}`
                : 'Carregando publicações...'}
            </p>
          </div>
        </div>
      </section>

      <PostsList
        isLoading={isLoading}
        posts={posts}
        loadMore={loadMore}
        hasNextPage={hasNextPage}
        isLoadingMore={isLoadingMore}
      />
    </div>
  )
}

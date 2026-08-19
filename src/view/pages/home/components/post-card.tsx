import type { Post } from '@/shared/models/posts'
import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex min-h-72 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="mb-8 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="flex items-center gap-1 font-normal normal-case tracking-normal text-muted-foreground">
            <Clock3 /> {post.readTime} min de leitura
          </span>
        </div>
        <Link to={`/post/${post.id}`}>
          <h3 className="text-2xl leading-tight group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {post.content}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="text-muted-foreground">{post.author}</span>
        <Link
          to={`/post/${post.id}`}
          aria-label={`Ler ${post.title}`}
          className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground transition group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <ArrowRight />
        </Link>
      </div>
    </article>
  )
}

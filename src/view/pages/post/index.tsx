import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { useController } from './use-controller'
import { Empty } from './components/empty'

export function PostPage() {
  const { post } = useController()

  if (!post) return <Empty title="Publicação não encontrada" />

  return (
    <div className="mx-auto">
      <Link
        to="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft /> Voltar para publicações
      </Link>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Publicação
      </p>
      <h1 className="mt-4 md:max-w-10/12 text-5xl leading-tight tracking-tight md:text-6xl">
        {post.title}
      </h1>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.createdAt}</span>
        <span>·</span>
        <span>{post.readTime} min de leitura</span>
      </div>
      <div className="my-12 h-px bg-border" />
      <div className="whitespace-pre-line text-lg leading-8 text-foreground/85">
        {post.content}
      </div>
      <div className="mt-14 rounded-2xl bg-primary p-7 text-primary-foreground">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
          Continue a conversa
        </p>
        <p className="mt-2 text-2xl">
          Conhecimento se move quando encontra outras pessoas.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
        >
          Ver todas as publicações <ArrowRight />
        </Link>
      </div>
    </div>
  )
}

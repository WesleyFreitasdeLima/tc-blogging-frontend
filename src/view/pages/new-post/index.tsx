import { Button } from '@/view/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router'
import { useController } from './use-controller'

export function NewPostPage() {
  const { errors, handleSubmit, onSubmitNewPost, register } = useController()

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/">
        <span className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft /> Cancelar
        </span>
      </Link>

      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Nova publicação
      </p>
      <h1 data-aos="fade-up" className="mt-3 text-5xl">
        O que você quer colocar em movimento?
      </h1>

      <form
        data-aos="fade-up"
        data-aos-delay="300"
        onSubmit={handleSubmit(onSubmitNewPost)}
        className="mt-10 flex flex-col gap-6"
      >
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Título
            <input
              className="rounded-xl border border-input bg-card px-4 py-3 text-lg font-normal outline-none ring-primary focus:ring-2"
              placeholder="Um título que desperte curiosidade"
              {...register('title')}
            />
          </label>

          {errors.title?.message && (
            <p className="text-sm text-destructive">{errors.title?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Conteúdo
            <textarea
              className="min-h-64 resize-y rounded-xl border border-input bg-card px-4 py-3 font-normal leading-7 outline-none ring-primary focus:ring-2"
              placeholder="Escreva a sua reflexão..."
              {...register('content')}
            />
          </label>

          {errors.content?.message && (
            <p className="text-sm text-destructive">
              {errors.content?.message}
            </p>
          )}
        </div>

        <div
          className="flex justify-end gap-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Button type="button" variant="outline" asChild>
            <Link to="/">Cancelar</Link>
          </Button>
          <Button type="submit">
            <Check data-icon="inline-start" /> Salvar publicação
          </Button>
        </div>
      </form>
    </div>
  )
}

import { Button } from '@/view/components/ui/button'
import { ArrowRight, BookOpen, Eye, EyeClosed } from 'lucide-react'
import { useController } from './use-controller'

export function AuthPage() {
  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    onSubmitAuth,
    handleViewPassword,
    passwordView,
  } = useController()
  return (
    <div className="h-full mx-auto grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-2">
      <div className="bg-white/10 p-8 text-primary-foreground md:p-12 flex flex-col justify-between">
        <BookOpen className="size-10" />

        <div>
          <h1 className="mt-20 text-4xl">Entre na conversa.</h1>
          <p className="mt-4 leading-7 text-primary-foreground/75">
            Publique suas ideias, acompanhe a comunidade e mantenha o
            conhecimento em movimento.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitAuth)}
        className="flex flex-col gap-5 p-8 md:p-12 lg:p-28"
      >
        <div>
          <p className="text-sm font-semibold text-primary">
            Acesso da comunidade
          </p>
          <h2 className="mt-2 text-3xl">Bem-vindo(a) de volta.</h2>
        </div>

        <div className="space-y-2">
          {errors.root?.serverError && (
            <div className="text-red-500">
              {errors.root.serverError.message}
            </div>
          )}

          <label className="flex flex-col gap-2 text-sm font-semibold">
            Login
            <input
              type="text"
              className="rounded-lg border border-input bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              placeholder="login"
              {...register('login', {
                onChange: () => clearErrors('root.serverError'),
              })}
            />
          </label>

          {errors.login?.message && (
            <p className="text-sm text-destructive">{errors.login?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Senha
            <div className="relative">
              <input
                type={passwordView ? 'password' : 'text'}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                placeholder="••••••••"
                {...register('password', {
                  onChange: () => clearErrors('root.serverError'),
                })}
              />

              <Button
                size="sm"
                type="button"
                variant="outline"
                className="absolute top-2 right-3 h-7"
                onClick={handleViewPassword}
              >
                {passwordView ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
          </label>
        </div>
        <Button type="submit" className="mt-2">
          Entrar <ArrowRight data-icon="inline-end" />
        </Button>
      </form>
    </div>
  )
}

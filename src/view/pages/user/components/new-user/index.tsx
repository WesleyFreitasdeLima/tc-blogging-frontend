import { Button } from '@/view/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router'
import { useController } from './use-controller'
import { UserRoleEnum } from '@/shared/models/user'

export function NewUserPage() {
  const { errors, handleSubmit, onSubmitNewUser, clearErrors, register } =
    useController()

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/users">
        <span className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft /> Cancelar
        </span>
      </Link>

      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Novo usuário
      </p>

      <form
        data-aos="fade-up"
        data-aos-delay="300"
        onSubmit={handleSubmit(onSubmitNewUser)}
        className="mt-10 flex flex-col gap-6"
      >
        <div className="space-y-2">
          {errors.root?.serverError && (
            <div className="text-red-500">
              {errors.root.serverError.message}
            </div>
          )}
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Login
            <input
              className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              placeholder="Nome do usuário"
              {...register('username', {
                onChange: () => clearErrors('root.serverError'),
              })}
            />
          </label>

          {errors.username?.message && (
            <p className="text-sm text-destructive">
              {errors.username?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Nome
            <input
              className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              placeholder="Nome do usuário"
              {...register('name', {
                onChange: () => clearErrors('root.serverError'),
              })}
            />
          </label>

          {errors.name?.message && (
            <p className="text-sm text-destructive">{errors.name?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            E-mail
            <input
              className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              placeholder="teste@teste.com"
              type="email"
              {...register('email', {
                onChange: () => clearErrors('root.serverError'),
              })}
            />
          </label>

          {errors.email?.message && (
            <p className="text-sm text-destructive">{errors.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Permissão
            <select
              className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              {...register('role')}
            >
              <option value={UserRoleEnum.TEACHER}>Professor</option>

              <option value={UserRoleEnum.ADMIN}>Administrador</option>
            </select>
          </label>

          {errors.role?.message && (
            <p className="text-sm text-destructive">{errors.role?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Senha
            <input
              type="password"
              placeholder="*****"
              className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
              {...register('password', {
                onChange: () => clearErrors('root.serverError'),
              })}
            />
          </label>

          {errors.password?.message && (
            <p className="text-sm text-destructive">
              {errors.password.message}
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

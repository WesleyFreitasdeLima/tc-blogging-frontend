import { UserRoleEnum } from '@/shared/models/user'
import { Button } from '@/view/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router'
import { useController } from './use-controller'

export function UpdateUserPage() {
  const {
    user,
    register,
    handleSubmit,
    clearErrors,
    errors,
    onSubmitEditUser,
    saveButtonIsDisabled,
    isLoading,
    isSaving,
  } = useController()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center text-muted-foreground">
        Carregando usuário...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center">
        <p className="text-muted-foreground">Usuário não encontrado.</p>

        <Button className="mt-5" asChild>
          <Link to="/admin/users">Voltar para usuários</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/users">
        <span className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft />
          Voltar
        </span>
      </Link>

      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Administração
      </p>

      <h1 className="mt-2 text-5xl">Editar usuário</h1>

      <p className="mt-3 text-muted-foreground">
        Altere os dados e as permissões do usuário.
      </p>

      <form
        data-aos="fade-up"
        data-aos-delay="300"
        onSubmit={handleSubmit(onSubmitEditUser)}
        className="mt-10 flex flex-col gap-6"
      >
        {errors.root?.serverError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {errors.root.serverError.message}
          </div>
        )}

        {/* LOGIN */}
        <div className="space-y-2">
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
              {errors.username.message}
            </p>
          )}
        </div>

        {/* NOME */}
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
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
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
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* PERMISSÃO */}
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
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>

        {/* SENHA */}
        <div className="space-y-2">
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Nova senha
            <input
              type="password"
              placeholder="Deixe vazio para não alterar"
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

          <p className="text-xs text-muted-foreground">
            Deixe em branco caso não queira alterar a senha.
          </p>
        </div>

        {/* BOTÕES */}
        <div
          className="flex justify-end gap-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Button type="button" variant="outline" asChild>
            <Link to="/admin/users">Cancelar</Link>
          </Button>

          <Button type="submit" disabled={saveButtonIsDisabled || isSaving}>
            <Check data-icon="inline-start" />

            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </form>
    </div>
  )
}
